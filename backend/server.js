// backend/server.js
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import db from "./db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ================== __dirname / __filename для ES-модулей ==================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================== НАСТРОЙКА АВАТАРОК / ЛИНКОВ ==================
const AVATAR_DIR = path.join(__dirname, "avatars");
if (!fs.existsSync(AVATAR_DIR)) {
    fs.mkdirSync(AVATAR_DIR, { recursive: true });
}

const LINKS_DIR = path.join(__dirname, "links");
if (!fs.existsSync(LINKS_DIR)) {
    fs.mkdirSync(LINKS_DIR, { recursive: true });
}

const linksStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, LINKS_DIR),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) || ".png";
        cb(null, `${req.user.id}-${Date.now()}${ext}`);
    },
});

const uploadLinkIcon = multer({
    storage: linksStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
});

app.use("/links", express.static(LINKS_DIR));

const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, AVATAR_DIR),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) || ".png";
        cb(null, `${req.user.id}${ext}`); // имя файла = id_юзера.ext
    },
});

const uploadAvatar = multer({
    storage: avatarStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
});

app.use("/avatars", express.static(AVATAR_DIR));

// ================== MIDDLEWARE JWT ==================
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Brak tokena" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Nieprawidłowy token" });
        req.user = user; // { id, name, email }
        next();
    });
}

// ================== SEARCH ==================
app.get("/api/search", authenticateToken, (req, res) => {
    const q = (req.query.q || "").trim();
    const userId = req.user.id;

    if (!q) {
        return res.json({
            users: [],
            notes: [],
            events: [],
        });
    }

    const like = `%${q}%`;

    const usersSql = `
        SELECT id, name_and_surname, nickname, email
        FROM users
        WHERE name_and_surname LIKE ?
           OR nickname LIKE ?
           OR email LIKE ?
            LIMIT 10
    `;

    const notesSql = `
        SELECT id, title, text
        FROM notes
        WHERE user_id = ?
          AND (title LIKE ? OR text LIKE ?)
            LIMIT 10
    `;

    const eventsSql = `
        SELECT id, text, date, hour_form, hour_to
        FROM calendar
        WHERE user_id = ?
          AND text LIKE ?
            LIMIT 10
    `;

    db.query(usersSql, [like, like, like], (err, users) => {
        if (err) {
            console.error("search users error:", err);
            return res.status(500).json({ error: "Server error" });
        }

        db.query(notesSql, [userId, like, like], (err2, notes) => {
            if (err2) {
                console.error("search notes error:", err2);
                return res.status(500).json({ error: "Server error" });
            }

            db.query(eventsSql, [userId, like], (err3, events) => {
                if (err3) {
                    console.error("search events error:", err3);
                    return res.status(500).json({ error: "Server error" });
                }

                res.json({ users, notes, events });
            });
        });
    });
});

// ================== REGISTER ==================
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    const hashed = bcrypt.hashSync(password, 10);

    const sql =
        "INSERT INTO users (name_and_surname, email, PASSWORD) VALUES (?, ?, ?)";

    db.query(sql, [name, email, hashed], (err) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(400).json({ error: "Email już istnieje!" });
            }
            return res.status(500).json({ error: "Błąd serwera" });
        }

        res.json({ message: "Rejestracja udana!" });
    });
});

// ================== LOGIN ==================
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).json({ error: "Błąd serwera" });

        if (results.length === 0) {
            return res.status(400).json({ error: "Niepoprawny email lub hasło" });
        }

        const user = results[0];

        const valid = bcrypt.compareSync(password, user.PASSWORD);
        if (!valid) {
            return res.status(400).json({ error: "Niepoprawny email lub hasło" });
        }

        const token = jwt.sign(
            { id: user.id, name: user.name_and_surname, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Zalogowano pomyślnie!",
            user: {
                id: user.id,
                name: user.name_and_surname,
                email: user.email,
            },
            token,
        });
    });
});

// ================== LINKS ==================
app.get("/api/links", authenticateToken, (req, res) => {
    const userId = req.user.id;

    const sql = `
        SELECT id, link, image_url
        FROM links
        WHERE user_id = ?
        ORDER BY id DESC
    `;

    db.query(sql, [userId], (err, rows) => {
        if (err) {
            console.error("GET /api/links error:", err);
            return res.status(500).json({ error: "Błąd serwera" });
        }
        res.json(rows);
    });
});

app.post(
    "/api/links",
    authenticateToken,
    uploadLinkIcon.single("image"),
    (req, res) => {
        const userId = req.user.id;
        const { id, link } = req.body;
        const imageUrl = req.file ? `/links/${req.file.filename}` : null;

        if (!link) {
            return res.status(400).json({ error: "Brakuje linku" });
        }

        if (id) {
            // UPDATE
            const sql = `
                UPDATE links
                SET link = ?, image_url = COALESCE(?, image_url)
                WHERE id = ? AND user_id = ?
            `;
            db.query(sql, [link, imageUrl, id, userId], (err) => {
                if (err) {
                    console.error("UPDATE link error:", err);
                    return res.status(500).json({ error: "Błąd serwera" });
                }
                res.json({ success: true });
            });
        } else {
            // INSERT
            const sql = `
                INSERT INTO links (link, user_id, image_url)
                VALUES (?, ?, ?)
            `;
            db.query(sql, [link, userId, imageUrl], (err, result) => {
                if (err) {
                    console.error("INSERT link error:", err);
                    return res.status(500).json({ error: "Błąd serwera" });
                }
                res.status(201).json({
                    success: true,
                    id: result.insertId,
                    link,
                    image_url: imageUrl,
                });
            });
        }
    }
);

// ================== PROFILE: GET ==================
app.get("/api/profile", authenticateToken, (req, res) => {
    const userId = req.user.id;

    const sql = `
        SELECT
            id,
            name_and_surname,
            nickname,
            country,
            city,
            profesion AS profession,
            POSITION AS position,
            email,
            phone_number,
            linkedin_url,
            instagram_url,
            facebook_url,
            profile_picture
        FROM users
        WHERE id = ?
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("GET /api/profile error:", err);
            return res.status(500).json({ error: "Błąd serwera" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = results[0];

        if (user.profile_picture) {
            user.profile_picture = user.profile_picture.toString();
        }

        res.json(user);
    });
});

// ================== PROFILE: UPDATE (общий) ==================
app.put("/api/profile", authenticateToken, (req, res) => {
    const userId = req.user.id;

    const {
        name_and_surname,
        nickname,
        country,
        city,
        profession,
        position,
        linkedin_url,
        instagram_url,
        facebook_url,
    } = req.body;

    const sql = `
        UPDATE users
        SET
            name_and_surname = ?,
            nickname         = ?,
            country          = ?,
            city             = ?,
            profesion        = ?,
            POSITION         = ?,
            linkedin_url     = ?,
            instagram_url    = ?,
            facebook_url     = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            name_and_surname,
            nickname,
            country,
            city,
            profession,
            position,
            linkedin_url,
            instagram_url,
            facebook_url,
            userId,
        ],
        (err) => {
            if (err) {
                console.error("PUT /api/profile error:", err);
                return res.status(500).json({ error: "Błąd serwera" });
            }

            res.json({ success: true });
        }
    );
});

// ================== USER BY ID (чужой профиль) ==================
app.get("/api/users/:id", authenticateToken, (req, res) => {
    const userId = req.params.id;

    const sql = `
        SELECT
            id,
            name_and_surname,
            nickname,
            country,
            city,
            profesion    AS profession,
            POSITION     AS position,
            email,
            profile_picture,
            linkedin_url,
            instagram_url,
            facebook_url
        FROM users
        WHERE id = ?
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("GET /api/users/:id error:", err);
            return res.status(500).json({ error: "Błąd serwera" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(results[0]);
    });
});

// =============== SETTINGS: SOCIALS ===============
app.put("/api/settings/socials", authenticateToken, (req, res) => {
    const userId = req.user.id;
    const { linkedin_url, instagram_url, facebook_url } = req.body;

    const sql = `
        UPDATE users
        SET
            linkedin_url  = ?,
            instagram_url = ?,
            facebook_url  = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [linkedin_url || null, instagram_url || null, facebook_url || null, userId],
        (err) => {
            if (err) {
                console.error("update socials error:", err);
                return res.status(500).json({ error: "Błąd serwera" });
            }

            res.json({ success: true });
        }
    );
});

// =============== SETTINGS: EMAIL + PHONE ===============
app.put("/api/settings/contact", authenticateToken, (req, res) => {
    const userId = req.user.id;
    const { email, phone_number } = req.body;

    if (!email && !phone_number) {
        return res.status(400).json({ error: "Brak danych do aktualizacji" });
    }

    const checkSql = "SELECT id FROM users WHERE email = ? AND id <> ?";
    db.query(checkSql, [email, userId], (err, rows) => {
        if (err) {
            console.error("check email error:", err);
            return res.status(500).json({ error: "Błąd serwera" });
        }

        if (rows.length > 0) {
            return res
                .status(409)
                .json({ error: "Email jest już używany przez innego użytkownika" });
        }

        const updateSql =
            "UPDATE users SET email = ?, phone_number = ? WHERE id = ?";

        db.query(updateSql, [email, phone_number, userId], (err2) => {
            if (err2) {
                console.error("update contact error:", err2);
                return res.status(500).json({ error: "Błąd serwera" });
            }

            res.json({ success: true });
        });
    });
});

// =============== SETTINGS: PASSWORD CHANGE ===============
app.put("/api/settings/password", authenticateToken, (req, res) => {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res
            .status(400)
            .json({ error: "Stare i nowe hasło są wymagane" });
    }

    const sql = "SELECT PASSWORD FROM users WHERE id = ?";

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("password select error:", err);
            return res.status(500).json({ error: "Błąd serwera" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = results[0];

        const valid = bcrypt.compareSync(oldPassword, user.PASSWORD);
        if (!valid) {
            return res.status(400).json({ error: "Niepoprawne stare hasło" });
        }

        const hashed = bcrypt.hashSync(newPassword, 10);

        const updateSql = "UPDATE users SET PASSWORD = ? WHERE id = ?";

        db.query(updateSql, [hashed, userId], (err2) => {
            if (err2) {
                console.error("password update error:", err2);
                return res.status(500).json({ error: "Błąd serwera" });
            }

            res.json({ success: true });
        });
    });
});

// ================== PROFILE AVATAR UPLOAD ==================
app.post(
    "/api/profile/avatar",
    authenticateToken,
    uploadAvatar.single("avatar"),
    (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const userId = req.user.id;
        const relativePath = `/avatars/${req.file.filename}`;

        const sql = "UPDATE users SET profile_picture = ? WHERE id = ?";

        db.query(sql, [relativePath, userId], (err) => {
            if (err) {
                console.error("UPDATE profile_picture error:", err);
                return res.status(500).json({ error: "Błąd serwera" });
            }

            res.json({ success: true, profile_picture: relativePath });
        });
    }
);

// ================== CALENDAR (из файла друга, но через authenticateToken) ==================

// Получить события текущего пользователя
app.get("/calendar", authenticateToken, (req, res) => {
    const sql = `
        SELECT id, text, date, hour_form, hour_to
        FROM calendar
        WHERE user_id = ?
        ORDER BY date, hour_form
    `;
    db.query(sql, [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Добавить новое событие
app.post("/calendar", authenticateToken, (req, res) => {
    const { text, date, hour_form, hour_to } = req.body;
    const sql = `
        INSERT INTO calendar (text, date, hour_form, hour_to, user_id)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(
        sql,
        [text, date, hour_form, hour_to, req.user.id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ success: true, id: result.insertId });
        }
    );
});

// Удалить событие пользователя
app.delete("/calendar/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM calendar WHERE user_id = ? AND id = ?";
    db.query(sql, [req.user.id, id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true });
    });
});

// ================== START SERVER ==================
app.listen(3000, () => {
    console.log("Backend działa na http://localhost:3000");
});
