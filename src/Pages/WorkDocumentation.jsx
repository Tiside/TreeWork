import "/src/Css/workDocumentation.css"

function ProjectDocumentation() {
    return (
        <div className="project-docs-page">
            <div className="project-docs-card">
                <div className="project-docs-header">
                    <div>
                        <h2>Tree Work – Workspace project</h2>
                        <p>Light documentation for structure, goals and workflow.</p>
                    </div>
                    <div className="project-docs-meta">
                        <span className="pd-pill pd-pill-green">Active</span>
                        <span className="pd-pill pd-pill-gray">Documentation</span>
                    </div>
                </div>

                <div className="project-docs-layout">
                    <aside className="pd-summary">
                        <h3>Project summary</h3>
                        <div className="pd-summary-card">
                            <div className="pd-row">
                                <span className="label">Owner</span>
                                <span className="value">Stanislav Bazhan</span>
                            </div>
                            <div className="pd-row">
                                <span className="label">Workspace</span>
                                <span className="value">Tree Work</span>
                            </div>
                            <div className="pd-row">
                                <span className="label">Current phase</span>
                                <span className="value">Workspace layout & flows</span>
                            </div>
                            <div className="pd-row">
                                <span className="label">Last update</span>
                                <span className="value">07.11.2025</span>
                            </div>
                        </div>

                        <h4 className="pd-subtitle">Key modules</h4>
                        <ul className="pd-tags">
                            <li>Workspace canvas</li>
                            <li>Notes & projects</li>
                            <li>Integrations panel</li>
                            <li>User profile</li>
                        </ul>
                    </aside>

                    <section className="pd-content">
                        <section className="pd-block">
                            <h3>1. Purpose</h3>
                            <p>
                                Tree Work Workspace is a central view for managing projects,
                                notes and integrations in one place. The goal is to keep
                                everyday work in a single, clean layout and reduce context switching
                                between tools.
                            </p>
                        </section>

                        <section className="pd-block">
                            <h3>2. Scope</h3>
                            <ul>
                                <li>Interactive workspace layout with nodes for projects and tasks.</li>
                                <li>Basic navigation: top bar, search, left sidebar, profile entry.</li>
                                <li>Project view with participants, structure and subtasks.</li>
                                <li>Static integrations cards (Stats, Notes, Files, Analyse).</li>
                            </ul>
                        </section>

                        <section className="pd-block pd-columns">
                            <div>
                                <h3>3. UX principles</h3>
                                <ul>
                                    <li>Everything important visible on the first screen.</li>
                                    <li>Dark, calm background with strong focus cards.</li>
                                    <li>Small, readable typography – no noisy elements.</li>
                                    <li>Consistent pills, tags and icons across pages.</li>
                                </ul>
                            </div>
                            <div>
                                <h3>4. Technical notes</h3>
                                <ul>
                                    <li>Frontend: React + React Router, CSS modules / global CSS.</li>
                                    <li>Layout: flex + grid, responsive down to tablet width.</li>
                                    <li>State: local state per view, no external store yet.</li>
                                    <li>Planned: API layer for real projects and notes.</li>
                                </ul>
                            </div>
                        </section>

                        <section className="pd-block">
                            <h3>5. Workspace flows</h3>
                            <div className="pd-flow">
                                <div className="step">
                                    <span className="bullet" />
                                    <div className="text">
                                        <h4>Open workspace</h4>
                                        <p>
                                            User enters Workspace from sidebar or project cards.
                                            Navigation, search and integrations are available
                                            immediately.
                                        </p>
                                    </div>
                                </div>
                                <div className="step">
                                    <span className="bullet" />
                                    <div className="text">
                                        <h4>Create / open project</h4>
                                        <p>
                                            From workspace or notes, user opens project view,
                                            sees participants and structure, then jumps back
                                            to workspace.
                                        </p>
                                    </div>
                                </div>
                                <div className="step">
                                    <span className="bullet" />
                                    <div className="text">
                                        <h4>Attach integrations</h4>
                                        <p>
                                            Integrations are shown as static cards for now,
                                            used mainly as visual presets and future entry points
                                            for real service connections.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="pd-block pd-notes">
                            <h3>6. Open questions</h3>
                            <ul>
                                <li>How deep should project subtasks go on the canvas?</li>
                                <li>Do we sync notes between Notes view and Workspace nodes?</li>
                                <li>Which integrations should become interactive first?</li>
                            </ul>
                        </section>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default ProjectDocumentation;
