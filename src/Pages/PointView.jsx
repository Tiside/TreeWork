
import "/src/Css/pointView.css";

function PointView() {
    return (
        <div className="point-view-page">
            <div className="point-view-card">
                <div className="pv-header">
                    <div>
                        <span className="pv-tag">Point</span>
                        <h2>Workspace layout – Node #1</h2>
                        <p>Detailed view of point, subtasks, code and attachments.</p>
                    </div>
                    <div className="pv-meta">
                        <span className="pv-pill pv-pill-green">Active</span>
                        <span className="pv-pill">Owner: Stanislav</span>
                        <span className="pv-pill pv-pill-gray">Due: 15.05.2026</span>
                    </div>
                </div>

                <div className="pv-layout">
                    <section className="pv-timeline">
                        <h3>Subpoints</h3>

                        <div className="timeline">
                            {/* 1 */}
                            <div className="tl-item">
                                <div className="tl-time">08:30</div>
                                <div className="tl-dot tl-dot-blue">
                                    <i className="bx bx-layout"></i>
                                </div>
                                <div className="tl-card">
                                    <h4>Setup grid</h4>
                                    <p>Prepare base workspace grid and snapping.</p>
                                </div>
                            </div>

                            {/* 2 */}
                            <div className="tl-item">
                                <div className="tl-time">09:05</div>
                                <div className="tl-dot tl-dot-green">
                                    <i className="bx bx-network-chart"></i>
                                </div>
                                <div className="tl-card">
                                    <h4>Nodes positions</h4>
                                    <p>Define default nodes and their starting positions.</p>
                                </div>
                            </div>

                            {/* 3 */}
                            <div className="tl-item">
                                <div className="tl-time">10:10</div>
                                <div className="tl-dot tl-dot-yellow">
                                    <i className="bx bx-git-branch"></i>
                                </div>
                                <div className="tl-card">
                                    <h4>Connections preview</h4>
                                    <p>Draw simple preview lines between nodes on hover.</p>
                                </div>
                            </div>
                            <button className="tl-add">
                                <span className="plus">+</span>
                                Add subpoint
                            </button>
                        </div>
                    </section>

                    <section className="pv-detail">
                        {/* CODE */}
                        <div className="pv-code-block">
                            <div className="pv-section-header">
                                <div>
                                    <h3>Code snippet</h3>
                                    <p>Paste implementation or pseudo-code for this point.</p>
                                </div>
                                <span className="pv-chip">JavaScript</span>
                            </div>
                            <div className="code-wrapper">
                                <textarea
                                    className="code-editor"
                                    spellCheck="false"
                                    placeholder={`// Paste your code here...
function handleDrag(node) {
    // update position
}`}
                                />
                            </div>
                        </div>

                        {/* IMAGES */}
                        <div className="pv-images">
                            <div className="pv-section-header">
                                <h3>Images</h3>
                                <button className="pv-ghost-btn">
                                    <i className="bx bx-image-add"></i>
                                    Add image
                                </button>
                            </div>
                            <div className="pv-image-grid">
                                <div className="pv-image-slot preview" />
                                <div className="pv-image-slot preview second" />
                                <div className="pv-image-slot empty">
                                    <i className="bx bx-plus"></i>
                                    <span>Drop or browse</span>
                                </div>
                            </div>
                        </div>

                        {/* NOTE */}
                        <div className="pv-note">
                            <div className="pv-section-header">
                                <h3>Note</h3>
                            </div>
                            <textarea
                                className="note-editor"
                                placeholder="Write context, decisions or reminders related to this point..."
                            />
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
                                <button className="pv-file-btn">Upload</button>
                                <button className="pv-file-btn secondary">Download</button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default PointView;
