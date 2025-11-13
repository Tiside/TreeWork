
import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import "./App.css";
import "./main.css";
import "./Css/login.css";

import Navigation from "./Components/Navigation.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Login from "./Pages/Login.jsx";
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
    const navigate = useNavigate();
    const [externalSearchTrigger, setExternalSearchTrigger] = useState(false);
    useEffect(() => {
        if (!showIntro) {
            document.body.classList.add("no-bg");
            navigate("/login", { replace: true });
        }
    }, [showIntro, navigate]);

    return (
        <>
            <OverlayIntro/>
            {/*{showIntro && <Intro onFinish={() => setShowIntro(false)}/>}*/}

            {/*<div className="background">*/}
            {/*    <video autoPlay loop muted playsInline id="bg-video">*/}
            {/*        <source src="/VIDEO/background-classic.mp4" type="video/mp4"/>*/}
            {/*        Your browser does not support the video tag.*/}
            {/*    </video>*/}
            {/*</div>*/}
            <div className="application">
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
                <div className="main">
                    <Navigation openSearchExternally={externalSearchTrigger} />
                    <div className="content">
                        <Sidebar/>
                        <div className="app">
                            <Routes>
                                <Route path="/notes" element={
                                    <Notes setExternalSearchTrigger={setExternalSearchTrigger} />
                                } />
                                <Route path="/calendar" element={<Calendar/>}/>
                                <Route path="/noteName" element={<NoteTemplate/>}/>
                                <Route path="/noteForm" element={<NoteForm/>}/>
                                <Route path="/profile" element={<Profile/>}/>
                                <Route path="/settings" element={<Settings/>}/>
                                <Route path="/cloud" element={<Cloud/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;