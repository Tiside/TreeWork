import {useState} from "react";


function Sidebar() {
    const [addonsOpen, setAddonsOpen] = useState(false);
    return (
        <>
            <div className="side-bar">
                <div className={`addons ${addonsOpen ? "open" : ""}`}>
                    <i
                        className="bx bx-list-ul"
                        onClick={() => setAddonsOpen(!addonsOpen)}
                    ></i>

                    <i className="bx bx-link-alt"></i>
                    <i className="bx bx-link-alt"></i>
                    <i className="bx bx-link-alt"></i>
                </div>

                <div className="main-icons">
                    <i className="bx bxs-home"></i>
                    <i className="bx bxs-calendar"></i>
                    <i className="bx bxs-notepad"></i>
                    <i className="bx bx-briefcase"></i>
                </div>

                <div className="move-icons">
                    <i className="bx bx-chevron-left"></i>
                    <i className="bx bx-chevron-right"></i>
                </div>
            </div>
        </>
    );
}

export default Sidebar;