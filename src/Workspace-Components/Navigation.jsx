import { Link } from "react-router-dom";
import {useEffect, useState} from "react";

function NavigationWork({ settingsOpen, setSettingsOpen }) {
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (isExpanded) {
            document.body.classList.add("expanded");
        } else {
            document.body.classList.remove("expanded");
        }
        return () => document.body.classList.remove("expanded");
    }, [isExpanded]);
    return (
<>
        <div className="expand">
            <i
                className={`bx ${isExpanded ? "bx-exit-fullscreen" : "bx-fullscreen"} ${isExpanded ? "active" : ""}`}
                onClick={() => setIsExpanded(!isExpanded)}
            ></i>
        </div>


    <div className="navigation">


            <div className="logo-name">
                <Link to="/home">
                    <img src="/logo2.png" alt="worktree" />
                </Link>
                <h3>Tree Work</h3>
            </div>

            <div className="nav">
                <ul>
                    <Link to="/workspace/projectView">
                        <li>
                            <i className="bx bxs-user-detail"></i> <span>Leads</span>
                        </li>
                    </Link>
                    <Link to="/workspace/projectView">
                    <li>
                        <i className="bx bxs-file"></i> <span>Project View</span>
                    </li>
                    </Link>
                    <Link to="/workspace/projectDocumentation">
                        <li>
                            <i className="bx bxs-folder"></i> <span>Documentation</span>
                        </li>
                    </Link>

                    <li onClick={() => setSettingsOpen((prev) => !prev)}>
                        <i className="bx bx-cog"></i>
                        <span>Settings</span>
                    </li>
                </ul>
            </div>

            <Link to="/profile">
                <div className="user">
                    <div className="user-pfp"
                         style={{
                             backgroundImage: `url(${localStorage.getItem("avatarUrl") || "/user.jpg"})`
                         }}
                    ></div>
                </div>
            </Link>
        </div>
</>
    );
}

export default NavigationWork;
