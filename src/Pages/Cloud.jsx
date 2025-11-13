
import "/src/Css/cloud.css"
function Cloud(){
    return (
        <>
            <div className="cloud-wrap">
                <div className="cloud-header">
                    <div className="cloud-title">
                        <i className="bx bxs-cloud"></i>
                        <div>
                            <h3>Cloud Files</h3>
                            <span>Store & manage your files</span>
                        </div>
                    </div>

                    <div className="cloud-header-right">
                        <div className="cloud-space">
                            <span>Storage</span>
                            <div className="cloud-space-bar">
                                <div className="cloud-space-fill"></div>
                            </div>
                            <span className="cloud-space-info">18.4 GB / 50 GB</span>
                        </div>

                        <label className="cloud-upload-btn">
                            <i className="bx bx-upload"></i>
                            <span>Upload file</span>
                            <input type="file" multiple/>
                        </label>
                    </div>
                </div>

                <div className="cloud-body">
                    <div className="cloud-dropzone">
                        <div className="cloud-drop-icon">
                            <i className="bx bxs-cloud-upload"></i>
                        </div>
                        <h4>Drag & drop files here</h4>
                        <p>or click the button above to choose files from your device</p>
                        <div className="cloud-drop-hint">
                            <span>Supported: .jpg, .png, .pdf, .zip</span>
                        </div>
                    </div>

                    <div className="cloud-files">
                        <div className="cloud-files-header">
                            <span className="cf-name">Name</span>
                            <span className="cf-size">Size</span>
                            <span className="cf-date">Modified</span>
                            <span className="cf-type">Type</span>
                            <span className="cf-actions">•••</span>
                        </div>

                        <div className="cloud-files-list">
                            <div className="cloud-file-row">
                                <div className="cf-main">
                                    <div className="cf-icon image">
                                        <i className="bx bxs-image"></i>
                                    </div>
                                    <div className="cf-text">
                                        <span className="cf-title">dashboard-preview.png</span>
                                        <span className="cf-sub">In: /UI concepts</span>
                                    </div>
                                </div>
                                <span className="cf-size">2.1 MB</span>
                                <span className="cf-date">07 May 2025</span>
                                <span className="cf-type">Image</span>
                                <div className="cf-actions">
                                    <i className="bx bx-download"></i>
                                    <i className="bx bx-dots-horizontal-rounded"></i>
                                </div>
                            </div>

                            <div className="cloud-file-row">
                                <div className="cf-main">
                                    <div className="cf-icon doc">
                                        <i className="bx bxs-file-txt"></i>
                                    </div>
                                    <div className="cf-text">
                                        <span className="cf-title">TreeWork-notes.md</span>
                                        <span className="cf-sub">In: /Notes</span>
                                    </div>
                                </div>
                                <span className="cf-size">480 KB</span>
                                <span className="cf-date">03 May 2025</span>
                                <span className="cf-type">Document</span>
                                <div className="cf-actions">
                                    <i className="bx bx-download"></i>
                                    <i className="bx bx-dots-horizontal-rounded"></i>
                                </div>
                            </div>

                            <div className="cloud-file-row">
                                <div className="cf-main">
                                    <div className="cf-icon zip">
                                        <i className="bx bxs-file-archive"></i>
                                    </div>
                                    <div className="cf-text">
                                        <span className="cf-title">assets-pack.zip</span>
                                        <span className="cf-sub">In: /Resources</span>
                                    </div>
                                </div>
                                <span className="cf-size">120 MB</span>
                                <span className="cf-date">28 Apr 2025</span>
                                <span className="cf-type">Archive</span>
                                <div className="cf-actions">
                                    <i className="bx bx-download"></i>
                                    <i className="bx bx-dots-horizontal-rounded"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Cloud