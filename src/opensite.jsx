import React, { useState } from "react";
import "./Css/opensite.css";

export default function OverlayIntro() {
    const [expand, setExpand] = useState(false);
    const [hidden, setHidden] = useState(false);

    const handleClick = () => {
        setExpand(true);
        setTimeout(() => setHidden(true), 1500);
    };

    if (hidden) return null;

    return (
        <div className={`overlay ${expand ? "expanded" : ""}`}>
            <button className="circle-btn" onClick={handleClick}>
                <i className='bx bx-door-open'></i>
            </button>
        </div>
    );
}
