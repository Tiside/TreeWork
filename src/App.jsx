import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import "./main.css";
import "./Css/login.css";

import Navigation from "./Components/Navigation.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Login from "./Pages/login.jsx";
import Intro from "./intro.jsx";
import OverlayIntro from "./opensite.jsx";
import Notes from "./Pages/Notes.jsx";
import Calendar from "./Pages/Calendar.jsx";
import NoteTemplate from "./Pages/NoteTemplate.jsx";
import NoteForm from "./Pages/NoteForm.jsx";
import Profile from "./Pages/Profile.jsx";
import Settings from "./Pages/Settings.jsx";
import Cloud from "./Pages/Cloud.jsx";

function App() {
    const [showIntro, setShowIntro] = useState(true);
    const [externalSearchTrigger, setExternalSearchTrigger] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token"));


    useEffect(() => {
        if (!showIntro) {
            document.body.classList.add("no-bg");
        }
    }, [showIntro]);

    return (
        <>
            <OverlayIntro />
            {showIntro && <Intro onFinish={() => setShowIntro(false)} />}
            {/*<OverlayIntro />*/}
            {/*{showIntro && <Intro onFinish={() => setShowIntro(false)} />}*/}

            {/*<div className="background">*/}
            {/*    <video autoPlay loop muted playsInline id="bg-video">*/}
            {/*        <source src="/VIDEO/background-classic.mp4" type="video/mp4"/>*/}
            {/*        Your browser does not support the video tag.*/}
            {/*    </video>*/}
            {/*</div>*/}
            <div className="application">
                {!token ? (
                    <Routes>
                        <Route path="*" element={<Login setToken={setToken} />} />
                    </Routes>
                ) : (
                    <div className="main">
                        <Navigation openSearchExternally={externalSearchTrigger} />
                        <div className="content">
                            <Sidebar />
                            <div className="app">
                                <Routes>
                                    <Route path="/notes" element={<Notes setExternalSearchTrigger={setExternalSearchTrigger} />} />
                                    <Route path="/calendar" element={<Calendar />} />
                                    <Route path="/noteName" element={<NoteTemplate />} />
                                    <Route path="/noteForm" element={<NoteForm />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/settings" element={<Settings />} />
                                    <Route path="/cloud" element={<Cloud />} />
                                    <Route path="*" element={<Navigate to="/notes" replace />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
