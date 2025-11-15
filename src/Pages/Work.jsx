import "/src/Css/work.css";
import {Link} from "react-router-dom";

function Work() {
    return (
        <>
        <div className="work-flow-nav">
            <div className="text">
                <h2>Your Work Flow</h2>
                <p>Create and manage projects</p>
            </div>

            <div className="project-activity">
                <Link to="/projectForm">
                    <button className="active">
                        Create
                    </button>
                </Link>

            </div>
        </div>
        <div className="work-folders-content">
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
                        <div className="icons">
                            <i className="bx bx-dots-vertical-rounded"></i>
                            <i className="bx bxs-cog"></i>
                        </div>
                    </div>
                    <div className="count">Progress <span className="work-progres">50%</span></div>
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
                            <div className="icons">
                                <i className="bx bx-dots-vertical-rounded"></i>
                                <i className="bx bxs-cog"></i>
                            </div>
                        </div>
                        <div className="count">Progress <span className="work-progres">50%</span></div>
                    </div>
                </div>
            </Link>
        </div>
        </>
    );
}

export default Work;
