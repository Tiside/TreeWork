import "/src/Css/noteForm.css"
import {useState} from "react";

function NoteForm() {
    const [activePill, setActivePill] = useState("");

    return (
        <>
            <form action="" className="note-form">
                <div className="field">
                    <label htmlFor="tittle">Tittle</label>
                    <input type="text" id="tittle" className="input" placeholder="Short and specific"/>
                </div>
                <div className="field">
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" className="input"
                           placeholder="Add a short description about your note"/>
                </div>
                <div className="attributes">
                    <label>Attributes</label>

                    <div className="pills">

                        <div
                            className={`pill important ${activePill === "important" ? "active" : ""}`}
                            onClick={() => setActivePill("important")}
                        >
                            <p>Important</p>
                        </div>

                        <div
                            className={`pill very-important ${activePill === "very-important" ? "active" : ""}`}
                            onClick={() => setActivePill("very-important")}
                        >
                            <p>Very Important</p>
                        </div>

                        <div
                            className={`pill personal ${activePill === "personal" ? "active" : ""}`}
                            onClick={() => setActivePill("personal")}
                        >
                            <p>Personal</p>
                        </div>

                        <div
                            className={`pill work ${activePill === "work" ? "active" : ""}`}
                            onClick={() => setActivePill("work")}
                        >
                            <p>Work</p>
                        </div>

                    </div>
                </div>
                <div className="field">
                    <label htmlFor="tags">Tags (optional, max 3)</label>
                    <input type="text" id="tags" className="input" placeholder="text # and Enter"/>
                    <div className="tags-wrap">
                        <div className="tags">
                            <div className="tag">
                                #tree
                            </div>
                        </div>
                        <div className="tags-count" id="tagCount">1/3</div>
                    </div>

                </div>
                <div className="buttons">
                    <button className="clear-btn">Clear</button>
                    <button type="submit" className="save-btn">
                        <i className='bx bx-save'></i>
                        <span>Save note</span>
                    </button>
                </div>
            </form>
        </>
    );
}

export default NoteForm;