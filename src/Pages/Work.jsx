import { useState, useEffect } from "react";
import "/src/Css/work.css";
import { Link } from "react-router-dom";

function Work() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch("http://localhost:3000/api/projects", {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Błąd przy pobieraniu projektów:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading projects...</p>;

    return (
        <>
            <div className="work-flow-nav">
                <div className="text">
                    <h2>Your Work Flow</h2>
                    <p>Create and manage projects</p>
                </div>
                <div className="project-activity">
                    <Link to="/projectForm">
                        <button className="active">Create</button>
                    </Link>
                </div>
            </div>

            <div className="work-folders-content">
                {projects.length === 0 ? (
                    <p>No projects yet.</p>
                ) : (
                    projects.map(project => (
                        <Link to={`/workspace/${project.id}`} key={project.id}>
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
                                            <h6>{project.name}</h6>
                                            <span>{project.description || "No description"}</span>
                                        </div>
                                        <div className="icons">
                                            <i className="bx bx-dots-vertical-rounded"></i>
                                            <i className="bx bxs-cog"></i>
                                        </div>
                                    </div>
                                    <div className="count">
                                        Progress <span className="work-progres">50%</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </>
    );
}

export default Work;
