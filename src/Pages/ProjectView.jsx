import "/src/Css/projectView.css";

function ProjectView() {
    return (
        <>
            <div className="project-view-container">

            <div className="project-view-nav">
                <div className="text">
                    <h2>Project Name</h2>
                    <p>description about project</p>
                </div>

                <div className="project-activity">
                    <div className="active">
                        <span>Active</span>
                    </div>
                    <div className="workspace-tag">
                        <span>Workspace</span>
                    </div>
                </div>
            </div>
        <div className="project-view-clean">

            <div className="pv-clean-left">
                <h3>Participants</h3>

                <div className="pv-clean-participant">
                    <div className="pv-avatar">SB</div>
                    <div className="pv-clean-user">
                        <b>Stanislav Bazhan</b>
                        <span>Owner</span>
                    </div>
                    <span className="pv-tag">You</span>
                </div>

                <div className="pv-clean-participant">
                    <div className="pv-avatar">OS</div>
                    <div className="pv-clean-user">
                        <b>Olivier Szahblowski</b>
                        <span>Backend </span>
                    </div>
                    <span className="pv-tag">Design</span>
                </div>

                <div className="pv-clean-participant">
                    <div className="pv-avatar">SB</div>
                    <div className="pv-clean-user">
                        <b>Stanislav Bazhan</b>
                        <span>Frontend</span>
                    </div>
                    <span className="pv-tag">Dev</span>
                </div>

                <div className="pv-clean-participant">
                    <div className="pv-avatar">MP</div>
                    <div className="pv-clean-user">
                        <b>Maciej Piskozub</b>
                        <span>Backend</span>
                    </div>
                    <span className="pv-tag">QA</span>
                </div>
            </div>

            <div className="pv-clean-right">
                <h3>Project structure</h3>

                <div className="pv-timeline">


                    <div className="pv-item">
                        <div className="pv-dot"></div>
                        <div className="pv-content">
                            <h4>Workspace layout</h4>
                            <p>Main structure for Tree Work workspace view.</p>

                            <ul>
                                <li>Top navigation & search bar</li>
                                <li>Nodes canvas basic grid</li>
                                <li>Left integrations panel</li>
                            </ul>
                        </div>
                    </div>


                    <div className="pv-item">
                        <div className="pv-dot"></div>
                        <div className="pv-content">
                            <h4>Project creation flow</h4>
                            <p>Multi-step form for creating a new project.</p>

                            <ul>
                                <li>Step 1 — project info</li>
                                <li>Step 2 — tasks & deadlines</li>
                                <li>Step 3 — subtasks & review</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pv-item">
                        <div className="pv-dot"></div>
                        <div className="pv-content">
                            <h4>Integrations presets</h4>
                            <p>Static integrations cards for workspace preview.</p>

                            <ul>
                                <li>Design integration cards</li>
                                <li>States: hover / active</li>
                                <li>Preview connections on canvas</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

        </div>
            </div>
        </>
    );
}

export default ProjectView;
