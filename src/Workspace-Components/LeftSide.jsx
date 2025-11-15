import { useState } from "react";

function LeftSide({ settingsOpen }) {
    const [toggleMine, setToggleMine] = useState(false);
    const [toggleHide, setToggleHide] = useState(false);

    return (
        <div className={`left-side ${settingsOpen ? "shifted" : ""}`}>
            <h3>Settings</h3>

            <div className="settings">
                <div className="setting">
                    <div className="text">
                        <h4>Show only mine</h4>
                        <p>displays only your points to do</p>
                    </div>
                    <div
                        className={`tw-simple-toggle ${toggleMine ? "active" : ""}`}
                        onClick={() => setToggleMine((prev) => !prev)}
                    >
                        <div className="toggle-btn"></div>
                    </div>
                </div>

                <div className="setting">
                    <div className="text">
                        <h4>Hide sub-points</h4>
                        <p>hides sub-points under points</p>
                    </div>
                    <div
                        className={`tw-simple-toggle ${toggleHide ? "active" : ""}`}
                        onClick={() => setToggleHide((prev) => !prev)}
                    >
                        <div className="toggle-btn"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftSide;
