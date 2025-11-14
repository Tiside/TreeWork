// cloud.js (ES module)
import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4001;
const UPLOAD_DIR = path.join(__dirname, "uploads");

// Ensure uploads dir
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Helper: human readable size
function humanSize(bytes) {
    if (!bytes) return "0 B";
    const thresh = 1024;
    const units = ["B", "KB", "MB", "GB", "TB"];
    let u = 0;
    let val = bytes;
    while (val >= thresh && u < units.length - 1) {
        val = val / thresh;
        u++;
    }
    const decimals = val < 10 && u > 0 ? 1 : 0;
    return `${val.toFixed(decimals)} ${units[u]}`;
}

function friendlyTypeFromExt(ext) {
    ext = ext.toLowerCase();
    if ([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"].includes(ext)) return "Image";
    if ([".md", ".txt", ".doc", ".docx", ".pdf"].includes(ext)) return "Document";
    if ([".zip", ".rar", ".7z", ".tar"].includes(ext)) return "Archive";
    if ([".mp4", ".mov", ".avi", ".mkv"].includes(ext)) return "Video";
    return "Other";
}

// Simple in-memory index that we persist to disk (db.json)
const DB_PATH = path.join(__dirname, "db.json");
let db = { files: [] };

// Load DB if exists
try {
    if (fs.existsSync(DB_PATH)) {
        const raw = fs.readFileSync(DB_PATH, "utf8");
        db = JSON.parse(raw || '{"files":[]}');
    }
} catch (err) {
    console.error("Failed to read db.json:", err);
    db = { files: [] };
}

// Helper: persist DB
function persistDB() {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf8");
    } catch (err) {
        console.error("Failed to write db.json:", err);
    }
}

// Ensure initial example files exist (3 examples)
function ensureSampleFiles() {
    const samples = [
        {
            originalName: "dashboard-preview.png",
            storageSuffix: "dashboard-preview.png",
            sizeTextGuess: "2.1 MB",
            modifiedAt: new Date("2025-05-07T12:00:00Z"),
        },
        {
            originalName: "TreeWork-notes.md",
            storageSuffix: "TreeWork-notes.md",
            sizeTextGuess: "480 KB",
            modifiedAt: new Date("2025-05-03T12:00:00Z"),
        },
        {
            originalName: "assets-pack.zip",
            storageSuffix: "assets-pack.zip",
            sizeTextGuess: "120 MB",
            modifiedAt: new Date("2025-04-28T12:00:00Z"),
        },
    ];

    for (const s of samples) {
        const target = path.join(UPLOAD_DIR, s.storageSuffix);
        if (!fs.existsSync(target)) {
            const content = `Sample placeholder for ${s.originalName}${os.EOL}`;
            fs.writeFileSync(target, content, "utf8");
            const mtime = s.modifiedAt;
            try { fs.utimesSync(target, mtime, mtime); } catch (err) {}
        }

        const already = db.files.find((f) => f.storageName === s.storageSuffix);
        const stat = fs.statSync(path.join(UPLOAD_DIR, s.storageSuffix));
        if (!already) {
            const item = {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
                originalName: s.originalName,
                storageName: s.storageSuffix,
                sizeBytes: stat.size,
                size: humanSize(stat.size),
                mimeType: null,
                type: friendlyTypeFromExt(path.extname(s.storageSuffix)),
                modified: stat.mtime.toISOString(),
                url: `/uploads/${encodeURIComponent(s.storageSuffix)}`,
            };
            db.files.push(item);
        } else {
            already.sizeBytes = stat.size;
            already.size = humanSize(stat.size);
            already.modified = stat.mtime.toISOString();
            already.url = `/uploads/${encodeURIComponent(s.storageSuffix)}`;
        }
    }

    persistDB();
}

ensureSampleFiles();

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_DIR),
    filename: (req, file, cb) => {
        const safeName = file.originalname.replace(/\s+/g, "-");
        const filename = `${Date.now()}-${safeName}`;
        cb(null, filename);
    },
});
const upload = multer({ storage });

// Routes remain unchanged
app.get("/files", (req, res) => {
    try {
        const diskFiles = fs.readdirSync(UPLOAD_DIR);
        const merged = [];
        const dbIndex = {};
        for (const f of db.files) dbIndex[f.storageName] = f;

        for (const fname of diskFiles) {
            const fp = path.join(UPLOAD_DIR, fname);
            const stat = fs.statSync(fp);
            const storageName = fname;
            const existing = dbIndex[storageName];

            if (existing) {
                existing.sizeBytes = stat.size;
                existing.size = humanSize(stat.size);
                existing.modified = stat.mtime.toISOString();
                existing.url = `/uploads/${encodeURIComponent(storageName)}`;
                merged.push(existing);
            } else {
                const item = {
                    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
                    originalName: storageName.split("-").slice(1).join("-") || storageName,
                    storageName,
                    sizeBytes: stat.size,
                    size: humanSize(stat.size),
                    mimeType: null,
                    type: friendlyTypeFromExt(path.extname(storageName)),
                    modified: stat.mtime.toISOString(),
                    url: `/uploads/${encodeURIComponent(storageName)}`,
                };
                merged.push(item);
                db.files.push(item);
            }
        }

        db.files = merged.sort((a, b) => new Date(b.modified) - new Date(a.modified));
        persistDB();
        res.json(db.files);
    } catch (err) {
        console.error("Failed to list files:", err);
        res.status(500).json({ error: "Failed to list files" });
    }
});

app.post("/upload", upload.array("files", 50), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "No files uploaded" });
        }

        const added = [];

        for (const f of req.files) {
            const stat = fs.statSync(path.join(UPLOAD_DIR, f.filename));
            const item = {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
                originalName: f.originalname,
                storageName: f.filename,
                sizeBytes: stat.size,
                size: humanSize(stat.size),
                mimeType: f.mimetype || null,
                type: friendlyTypeFromExt(path.extname(f.filename)),
                modified: stat.mtime.toISOString(),
                url: `/uploads/${encodeURIComponent(f.filename)}`,
            };
            db.files.push(item);
            added.push(item);
        }

        db.files.sort((a, b) => new Date(b.modified) - new Date(a.modified));
        persistDB();

        return res.status(201).json({ success: true, added });
    } catch (err) {
        console.error("Upload failed:", err);
        return res.status(500).json({ success: false, message: "Upload failed" });
    }
});

app.get("/files/:id/download", (req, res) => {
    const id = req.params.id;
    const file = db.files.find((f) => f.id === id);
    if (!file) return res.status(404).json({ success: false, message: "Not found" });
    const fp = path.join(UPLOAD_DIR, file.storageName);
    if (!fs.existsSync(fp)) return res.status(404).json({ success: false, message: "Missing on disk" });
    res.download(fp, file.originalName);
});

app.delete("/files/:id", (req, res) => {
    const id = req.params.id;
    const idx = db.files.findIndex((f) => f.id === id);
    if (idx === -1) return res.status(404).json({ success: false, message: "Not found" });
    const file = db.files[idx];
    const fp = path.join(UPLOAD_DIR, file.storageName);
    try {
        if (fs.existsSync(fp)) fs.unlinkSync(fp);
    } catch (err) {
        console.warn("Failed to delete file:", err);
    }
    db.files.splice(idx, 1);
    persistDB();
    res.json({ success: true });
});

app.use("/uploads", express.static(UPLOAD_DIR));

app.get("/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
    console.log(`Backend running -> http://localhost:${PORT}`);
});
