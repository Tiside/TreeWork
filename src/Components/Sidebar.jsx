import {useEffect, useState} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
    const [addonsOpen, setAddonsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const currentPath = location.pathname;

    const handleBack = () => navigate(-1);
    const handleForward = () => navigate(1);


    const [links, setLinks] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;

        const loadLinks = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/links", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) return;
                const data = await res.json();
                setLinks(data);          // тот же формат, что и в Settings
            } catch (err) {
                console.error("addons links error:", err);
            }
        };

        loadLinks();
    }, [token]);

    return (
        <div className="side-bar">

            <div className={`addons ${addonsOpen ? "open" : ""}`}>
                <i
                    className="bx bx-list-ul"
                    onClick={() => setAddonsOpen(!addonsOpen)}
                ></i>

                <div className="images-link">
                    {[0, 1, 2].map((idx) => {
                        const item = links[idx];

                        const src = item?.image_url
                            ? `http://localhost:3000${item.image_url}`
                            : "/IMG/link-alt-regular-24.png";

                        const img = (
                            <img
                                key={idx}
                                src={src}
                                alt=""
                                className={item?.link ? "addon-img active" : "addon-img"}
                            />
                        );
                        if (!item?.link) {
                            return img;
                        }
                        return (
                            <a
                                key={idx}
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {img}
                            </a>
                        );
                    })}
                </div>
            </div>


            <div className="main-icons">
                <Link to={"/home"}>
                    <i className={`bx bxs-home ${currentPath === "/home" ? "active" : ""}`}></i>
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
