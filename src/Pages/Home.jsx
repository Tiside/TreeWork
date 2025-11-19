import "/src/Css/home.css"
import {Link} from "react-router-dom";
import MiniCalendar from "../Components/MiniCalendar.jsx";
import { useEffect, useState } from "react";

function Home(){
    const [latestFiles, setLatestFiles] = useState([]);
    const [profile, setProfile] = useState({});
    const token = localStorage.getItem("token");
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch("http://localhost:4001/files");
                const data = await res.json();

                setLatestFiles(data.slice(0, 2));
            } catch (err) {
                console.error("Failed to load latest files:", err);
            }
        };

        load();
    }, []);

    useEffect(() => {
        if (!token) return;

        const loadProfile = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) return;

                const data = await res.json();
                setProfile(data);
            } catch (err) {
                console.error("Home profile load error:", err);
            }
        };

        loadProfile();
    }, [token]);

    useEffect(() => {
        if (!token) return;

        const loadEvents = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/events", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) return;

                const data = await res.json();
                setEvents(data);
            } catch (err) {
                console.error("Failed to load events:", err);
            }
        };

        loadEvents();
    }, [token]);

    return (
        <>
            <div className="home-nav">
                <div className="text">
                    <h2>Welcome <span>{profile.name_and_surname}</span>!</h2>
                    <p>Let's work together</p>
                </div>

                <div className="stats">
                </div>
            </div>

            <div className="home-content">
                <div className="home-top-content">
                    <div className="left-side-content">
                        <div className="user">
                            <div className="user-info-content">
                                <div className="user-pfp"
                                     style={{
                                         backgroundImage: `url(${localStorage.getItem("avatarUrl") || "/user.jpg"})`
                                     }}
                                ></div>
                                <div className="user-info">
                                    <h2>{profile.name_and_surname}</h2>
                                    <h3>{profile.nickname}</h3>
                                    <p>{profile.profession}</p>
                                </div>
                            </div>

                            <div className="user-social">
                                {profile.linkedin_url && (
                                    <a
                                        href={profile.linkedin_url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="bx bxl-linkedin"></i>
                                    </a>
                                )}

                                {profile.instagram_url && (
                                    <a
                                        href={profile.instagram_url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="bx bxl-instagram"></i>
                                    </a>
                                )}
                                {profile.facebook_url && (
                                    <a
                                        href={profile.facebook_url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="bx bxl-facebook"></i>
                                    </a>
                                )}
                            </div>
                            <hr/>
                            <div className="user-stats">
                                <div className="project-stats-created">
                                    <p>Created projects</p>
                                    <span>25</span>
                                </div>
                                <div className="project-stats-joined">
                                    <p>Joined projects</p>
                                    <span>10</span>
                                </div>
                            </div>
                        </div>

                        <div className="files">
                            <h3>Last Modified Files</h3>
                            {latestFiles.map((file) => (
                                <div className="pv-file-card" key={file.id}>
                                    <div className="pv-file-icon">
                                        <i className="bx bxs-file-blank"></i>
                                    </div>

                                    <div className="pv-file-text">
                                        <span className="pv-file-name">{file.originalName}</span>
                                        <span className="pv-file-meta">
                {file.size} · {new Date(file.modified).toLocaleDateString("en-GB")}
            </span>
                                    </div>

                                    <div className="pv-file-actions">
                                        <Link to="/cloud">
                                            <button className="pv-file-btn secondary">
                                                <i className="bx bx-dots-horizontal-rounded"></i>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="right-side-content">
                        <div className="stats">

                            <div className="stat-card">
                                <div className="stat-header">
                                    <h4>Current events</h4>
                                    <span className="icon bx bx-calendar-event"></span>
                                </div>

                                <p className="stat-number">{events.length}</p>
                                <p className="stat-desc">Active tasks planned for this week.</p>
                            </div>

                            <div className="stat-card">
                                <div className="stat-header">
                                    <h4>Created notes</h4>
                                    <span className="icon bx bx-notepad"></span>
                                </div>

                                <p className="stat-number">5</p>
                                <p className="stat-desc">Your recently added ideas and reminders.</p>
                            </div>

                        </div>


                        <div className="mini-calendar">
                            <MiniCalendar />
                        </div>
                    </div>
                </div>
                <div className="folders">
                    <div className="nav-projects">
                        <h2>Projects</h2>
                        <Link to="/work">
                            <button>Show all</button>
                        </Link>
                    </div>
                    <div className="folders-content">
                        <Link to="/workspace">
                            <div className="folder">
                                <div className="back"></div>
                                <div className="files">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>

                                <div className="front">
                                    <div className="info">
                                        <div className="names">
                                            <h6>Project Name</h6>
                                            <span>description</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/workspace">
                            <div className="folder">
                                <div className="back"></div>
                                <div className="files">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>

                                <div className="front">
                                    <div className="info">
                                        <div className="names">
                                            <h6>Project Name</h6>
                                            <span>description</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/workspace">
                            <div className="folder">
                                <div className="back"></div>
                                <div className="files">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>

                                <div className="front">
                                    <div className="info">
                                        <div className="names">
                                            <h6>Project Name</h6>
                                            <span>description</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/workspace">
                            <div className="folder">
                                <div className="back"></div>
                                <div className="files">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>

                                <div className="front">
                                    <div className="info">
                                        <div className="names">
                                            <h6>Project Name</h6>
                                            <span>description</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/workspace">
                            <div className="folder">
                                <div className="back"></div>
                                <div className="files">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>

                                <div className="front">
                                    <div className="info">
                                        <div className="names">
                                            <h6>Project Name</h6>
                                            <span>description</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="home-notes">
                    <div className="nav-notes">
                        <h2>Notes</h2>
                        <Link to="/notes">
                            <button>Show all</button>
                        </Link>

                    </div>

                    <div className="notes-content">
                        <div className="note-card">
                            <p className="note-title">Daily ideas</p>
                            <p className="note-text">
                                Refactor calendar mini view, add quick filters for events…
                            </p>
                            <span className="note-meta">Updated 2h ago</span>
                        </div>

                        <div className="note-card">
                            <p className="note-title">UI tweaks</p>
                            <p className="note-text">
                                Smaller folders on Home, unify gradients and spacing.
                            </p>
                            <span className="note-meta">Updated yesterday</span>
                        </div>

                        <div className="note-card">
                            <p className="note-title">Learning</p>
                            <p className="note-text">
                                Finish JS module, try T3 stack demo and write notes.
                            </p>
                            <span className="note-meta">Pinned</span>
                        </div>

                        <div className="note-card">
                            <p className="note-title">Random</p>
                            <p className="note-text">
                                Idea for TreeWork home dashboard with widgets.
                            </p>
                            <span className="note-meta">3 days ago</span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home;