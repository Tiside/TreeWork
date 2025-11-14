import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import db from "./db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    const hashed = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO users (name_and_surname, email, PASSWORD) VALUES (?, ?, ?)";

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
            { id: user.id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Zalogowano pomyślnie!",
            user: {
                id: user.id,
                name: user.name_and_surname,
                email: user.email
            }, token
        });
    });
});

app.listen(3000, () => console.log("Backend działa na http://localhost:3000"));