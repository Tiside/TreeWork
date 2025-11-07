import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";


function Sidebar() {
    const [addonsOpen, setAddonsOpen] = useState(false);
    const navigate = useNavigate(); // 👈 dostęp do historii przeglądania

    const handleBack = () => {
        navigate(-1); // ⬅️ cofa użytkownika o jedną stronę w historii
    };

    const handleForward = () => {
        navigate(1); // ➡️ przechodzi do następnej strony, jeśli taka istnieje
    };

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
                    <Link to="/"><i className="bx bxs-home"></i></Link>

                    <Link to={"/notes"}><i className="bx bxs-notepad"></i></Link>
                    <Link to={"/calendar"}><i className="bx bxs-calendar"></i></Link>
                    <i className="bx bx-briefcase"></i>
                </div>

                <div className="move-icons">
                    <i className="bx bx-chevron-left" onClick={handleBack}></i>
                    <i className="bx bx-chevron-right" onClick={handleForward}></i>
                </div>
            </div>
        </>
    );
}

export default Sidebar;