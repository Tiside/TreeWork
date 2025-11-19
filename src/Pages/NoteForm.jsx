import "/src/Css/noteForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NoteForm() {
    const [activePill, setActivePill] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tagsInput, setTagsInput] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Brak tokena – zaloguj się ponownie.");
            return;
        }

        // Подготовка тегов (до 3)
        const rawTags = tagsInput
            .split("#")
            .map((t) => t.trim())
            .filter((t) => t.length > 0)
            .slice(0, 3);

        const tagsString = rawTags.length > 0 ? rawTags.join(",") : null;

        try {
            const res = await fetch("http://localhost:3000/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: title.trim(),
                    text: description.trim(),
                    attributes: activePill ? activePill.trim() : null,
                    tags: tagsString,
                }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                console.error("Save note error:", data);
                alert(data.error || "Błąd serwera");
                return;
            }

            // Очистка формы
            setTitle("");
            setDescription("");
            setTagsInput("");
            setActivePill("");

            // Переход к списку заметок
            navigate("/notes");

        } catch (err) {
            console.error("Save note error (network):", err);
            alert("Błąd połączenia z serwerem");
        }
    };

    const handleClear = (e) => {
        e.preventDefault();
        setTitle("");
        setDescription("");
        setTagsInput("");
        setActivePill("");
    };
    return (
        <form className="note-form" onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="tittle">Tittle</label>
                <input
                    type="text"
                    id="tittle"
                    className="input"
                    placeholder="Short and specific"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="field">
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    id="description"
                    className="input"
                    placeholder="Add a short description about your note"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="attributes">
                <label>Attributes</label>
                <div className="pills">
                    <div
                        className={`pill important ${
                            activePill === "important" ? "active" : ""
                        }`}
                        onClick={() => setActivePill("important")}
                    >
                        <p>Important</p>
                    </div>
                    <div
                        className={`pill very-important ${
                            activePill === "very-important" ? "active" : ""
                        }`}
                        onClick={() => setActivePill("very-important")}
                    >
                        <p>Very Important</p>
                    </div>
                    <div
                        className={`pill personal ${
                            activePill === "personal" ? "active" : ""
                        }`}
                        onClick={() => setActivePill("personal")}
                    >
                        <p>Personal</p>
                    </div>
                    <div
                        className={`pill work ${
                            activePill === "work" ? "active" : ""
                        }`}
                        onClick={() => setActivePill("work")}
                    >
                        <p>Work</p>
                    </div>
                </div>
            </div>

            <div className="field">
                <label htmlFor="tags">Tags (optional, max 3)</label>
                <input
                    type="text"
                    id="tags"
                    className="input"
                    placeholder="text # and Enter"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                />
                <div className="tags-wrap">
                    <div className="tags">
                        {rawTagsPreview(tagsInput).map((tag, idx) => (
                            <div className="tag" key={idx}>
                                #{tag}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="buttons">
                <button className="clear-btn" onClick={handleClear}>
                    Clear
                </button>
                <button type="submit" className="save-btn">
                    <i className="bx bx-save"></i>
                    <span>Save note</span>
                </button>
            </div>
        </form>
    );
}

function rawTagsPreview(tagsInput) {
    return tagsInput
        .split("#")
        .map((t) => t.trim())
        .filter((t) => t.length > 0)
        .slice(0, 3);
}

export default NoteForm;
