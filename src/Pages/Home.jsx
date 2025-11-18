import "/src/Css/home.css"
import {Link} from "react-router-dom";
import MiniCalendar from "../Components/MiniCalendar.jsx";
function Home(){
    return (
        <>
            <div className="home-nav">
                <div className="text">
                    <h2>Welcome <span>Tiside</span>!</h2>
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
                                <div className="user-pfp"></div>
                                <div className="user-info">
                                    <h2>Stanislav Bazhan</h2>
                                    <h3>Tiside</h3>
                                    <p>Web Developer</p>
                                </div>
                            </div>

                            <div className="user-social">
                                <i className='bx bxl-linkedin'></i>
                                <i className='bx bxl-instagram'></i>
                                <i className='bx bxl-facebook'></i>
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
                            <div className="pv-file-card">
                                <div className="pv-file-icon">
                                    <i className="bx bxs-file-blank"></i>
                                </div>
                                <div className="pv-file-text">
                                    <span className="pv-file-name">workspace-spec-v1.pdf</span>
                                    <span className="pv-file-meta">2.3 MB · Last updated today</span>
                                </div>
                                <div className="pv-file-actions">
                                    <Link to="/cloud">
                                    <button className="pv-file-btn secondary">
                                        <i className='bx bx-dots-horizontal-rounded' ></i>
                                    </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="pv-file-card">
                                <div className="pv-file-icon">
                                    <i className="bx bxs-file-blank"></i>
                                </div>
                                <div className="pv-file-text">
                                    <span className="pv-file-name">workspace-spec-v1.pdf</span>
                                    <span className="pv-file-meta">2.3 MB · Last updated today</span>
                                </div>
                                <div className="pv-file-actions">
                                    <Link to="/cloud">
                                        <button className="pv-file-btn secondary">
                                            <i className='bx bx-dots-horizontal-rounded' ></i>
                                        </button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="right-side-content">
                        <div className="stats">

                            <div className="stat-card">
                                <div className="stat-header">
                                    <h4>Current events</h4>
                                    <span className="icon bx bx-calendar-event"></span>
                                </div>

                                <p className="stat-number">4</p>
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