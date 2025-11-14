import React, { useEffect, useRef, useState } from "react";
import "/src/Css/cloud.css";

function Cloud() {
    const [files, setFiles] = useState([]);
    const dropRef = useRef(null);

    // =========================================================================
    // LOAD FILES
    // =========================================================================
    const loadFiles = async () => {
        try {
            const res = await fetch("http://localhost:4001/files");
            if (!res.ok) throw new Error("Failed to fetch files");
            const data = await res.json();
            setFiles(data || []);
        } catch (err) {
            console.error("loadFiles error:", err);
        }
    };

    useEffect(() => {
        loadFiles();
    }, []);

    // =========================================================================
    // UPLOAD FILES
    // =========================================================================
    const uploadFiles = async (fileList) => {
        if (!fileList || fileList.length === 0) return;

        const fd = new FormData();
        for (const f of fileList) fd.append("files", f);

        try {
            await fetch("http://localhost:4001/upload", {
                method: "POST",
                body: fd,
            });
        } catch (err) {
            console.error("Upload error:", err);
        }

        // WAŻNE — backend potrzebuje chwilki, aby zapisać pliki
        setTimeout(() => {
            loadFiles();
        }, 200);
    };

    // =========================================================================
    // INPUT FILE HANDLER
    // =========================================================================
    const handleFileInput = (e) => {
        uploadFiles(e.target.files);
        e.target.value = "";
    };

    // =========================================================================
    // DRAG & DROP HANDLING
    // =========================================================================
    useEffect(() => {
        const dropArea = dropRef.current;
        if (!dropArea) return;

        const preventDefaults = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        const highlight = () => dropArea.classList.add("drag-over");
        const unhighlight = () => dropArea.classList.remove("drag-over");

        const handleDrop = (e) => {
            preventDefaults(e);
            unhighlight();
            const dt = e.dataTransfer;
            if (dt && dt.files.length > 0) {
                uploadFiles(dt.files);
            }
        };

        ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) =>
            dropArea.addEventListener(eventName, preventDefaults, false)
        );

        dropArea.addEventListener("dragover", highlight);
        dropArea.addEventListener("dragenter", highlight);
        dropArea.addEventListener("dragleave", unhighlight);
        dropArea.addEventListener("drop", handleDrop);

        return () => {
            ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) =>
                dropArea.removeEventListener(eventName, preventDefaults)
            );
            dropArea.removeEventListener("dragover", highlight);
            dropArea.removeEventListener("dragenter", highlight);
            dropArea.removeEventListener("dragleave", unhighlight);
            dropArea.removeEventListener("drop", handleDrop);
        };
    }, []);

    // =========================================================================
    // FORMAT DATE
    // =========================================================================
    const fmtDate = (iso) =>
        new Date(iso).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    // =========================================================================
    // JSX
    // =========================================================================
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
                                <div className="cloud-space-fill" style={{ width: "36%" }}></div>
                            </div>
                            <span className="cloud-space-info">18.4 GB / 50 GB</span>
                        </div>

                        <label className="cloud-upload-btn">
                            <i className="bx bx-upload"></i>
                            <span>Upload file</span>
                            <input type="file" multiple onChange={handleFileInput} />
                        </label>
                    </div>
                </div>

                <div className="cloud-body">
                    {/* DROP AREA */}
                    <div className="cloud-dropzone" ref={dropRef}>
                        <div className="cloud-drop-icon">
                            <i className="bx bxs-cloud-upload"></i>
                        </div>
                        <h4>Drag & drop files here</h4>
                        <p>or click the button above to choose files from your device</p>
                        <div className="cloud-drop-hint">
                            <span>Supported: .jpg, .png, .pdf, .zip</span>
                        </div>
                    </div>

                    {/* FILE LIST */}
                    <div className="cloud-files">
                        <div className="cloud-files-header">
                            <span className="cf-name">Name</span>
                            <span className="cf-size">Size</span>
                            <span className="cf-date">Modified</span>
                            <span className="cf-type">Type</span>
                            <span className="cf-actions">•••</span>
                        </div>

                        <div className="cloud-files-list">
                            {files.map((file) => (
                                <div className="cloud-file-row" key={file.id || file.storageName}>
                                    <div className="cf-main">
                                        <div className={`cf-icon ${file.type?.toLowerCase()}`}>
                                            <i
                                                className={
                                                    file.type === "Image"
                                                        ? "bx bxs-image"
                                                        : file.type === "Document"
                                                            ? "bx bxs-file-txt"
                                                            : file.type === "Archive"
                                                                ? "bx bxs-file-archive"
                                                                : "bx bxs-file"
                                                }
                                            ></i>
                                        </div>

                                        <div className="cf-text">
                                            <span className="cf-title">{file.originalName}</span>
                                            <span className="cf-sub">In: /</span>
                                        </div>
                                    </div>

                                    <span className="cf-size">{file.size}</span>
                                    <span className="cf-date">{fmtDate(file.modified)}</span>
                                    <span className="cf-type">{file.type}</span>

                                    <div className="cf-actions">
                                        <a
                                            href={`http://localhost:4001${file.url}`}
                                            download={file.originalName}
                                        >
                                            <i className="bx bx-download"></i>
                                        </a>
                                    </div>
                                </div>
                            ))}

                            {files.length === 0 && (
                                <div className="cloud-file-row empty">
                                    <div style={{ padding: "20px", textAlign: "center", width: "100%" }}>
                                        No files yet.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cloud;
