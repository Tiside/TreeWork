import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
    const [addonsOpen, setAddonsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const currentPath = location.pathname;

    const handleBack = () => navigate(-1);
    const handleForward = () => navigate(1);

    return (
        <div className="side-bar">

            <div className={`addons ${addonsOpen ? "open" : ""}`}>
                <i
                    className="bx bx-list-ul"
                    onClick={() => setAddonsOpen(!addonsOpen)}
                ></i>
                <div className="images-link">
                    <img src="/IMG/link-alt-regular-24.png" alt="" />
                    <img src="/IMG/link-alt-regular-24.png" alt="" />
                    <img src="/IMG/link-alt-regular-24.png" alt="" />
                </div>
            </div>

            <div className="main-icons">
                <Link to={"/"}>
                    <i className={`bx bxs-home ${currentPath === "/" ? "active" : ""}`}></i>
                </Link>

                <Link to={"/notes"}>
                    <i className={`bx bxs-notepad ${currentPath === "/notes" ? "active" : ""}`}></i>
                </Link>

                <Link to={"/calendar"}>
                    <i className={`bx bxs-calendar ${currentPath === "/calendar" ? "active" : ""}`}></i>
                </Link>

                <Link to={"/work"}>
                    <i className={`bx bx-briefcase ${currentPath === "/work" ? "active" : ""}`}></i>
                </Link>
            </div>

            <div className="move-icons">
                <i className="bx bx-chevron-left" onClick={handleBack}></i>
                <i className="bx bx-chevron-right" onClick={handleForward}></i>
            </div>
        </div>
    );
}

export default Sidebar;
