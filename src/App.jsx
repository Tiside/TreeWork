import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

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
import Workspace from "./Pages/Workspace.jsx";
import ProjectForm from "./Pages/ProjectForm.jsx";
import Work from "./Pages/Work.jsx";
import ProjectView from "./Pages/ProjectView.jsx";
import ProjectDocumentation from "./Pages/WorkDocumentation.jsx";
import NavigationWork from "./Workspace-Components/Navigation.jsx";
import RightSide from "./Workspace-Components/RightSide.jsx";
import LeftSide from "./Workspace-Components/LeftSide.jsx";
import PointView from "./Pages/PointView.jsx";
import Home from "./Pages/Home.jsx";

function App() {
    const [settingsOpen, setSettingsOpen] = useState(false);   // ← тут главное
    const [showIntro, setShowIntro] = useState(true);
    const navigate = useNavigate();
    const [externalSearchTrigger, setExternalSearchTrigger] = useState(false);
    const location = useLocation();


    const isWorkspaceRoute = location.pathname.startsWith("/workspace");
    const isProjectFormRoute = location.pathname.startsWith("/projectForm");
    const isSpecialFullScreen = isWorkspaceRoute || isProjectFormRoute;

    useEffect(() => {
        if (!showIntro) {
            document.body.classList.add("no-bg");
            navigate("/login", { replace: true });
        }
    }, [showIntro, navigate]);

    return (
        <>
            {isWorkspaceRoute && (
                <div className="workspace-container">
                    <div className="workspace-content">
                        <NavigationWork
                            settingsOpen={settingsOpen}
                            setSettingsOpen={setSettingsOpen}
                        />
                        <div className="workspace-app">
                            <div className="sides">
                                <RightSide />
                            </div>

                            <div className="content">
                                <Routes>
                                    <Route path="/workspace/projectView" element={<ProjectView />} />
                                    <Route path="/workspace/projectDocumentation" element={<ProjectDocumentation />} />
                                    <Route path="/workspace/pointView" element={< PointView/>} />
                                </Routes>
                            </div>

                            <LeftSide settingsOpen={settingsOpen} />
                        </div>
                        <Routes>
                            <Route path="/workspace" element={<Workspace />} />
                        </Routes>
                    </div>


                </div>
            )}

            {isProjectFormRoute && (
                <div className="form-container">
                    <div className="projectform-page">
                        <ProjectForm />
                    </div>
                </div>

            )}

            {!isWorkspaceRoute && !isProjectFormRoute && (
                <div className="application">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                    </Routes>

                    <div className="main">
                        <Navigation openSearchExternally={externalSearchTrigger} />
                        <div className="content">
                            <Sidebar />
                            <div className="app">
                                <Routes>
                                    <Route path="/home" element={<Home />} />
                                    <Route path="/notes" element={<Notes setExternalSearchTrigger={setExternalSearchTrigger} />} />
                                    <Route path="/calendar" element={<Calendar />} />
                                    <Route path="/noteName" element={<NoteTemplate />} />
                                    <Route path="/noteForm" element={<NoteForm />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/settings" element={<Settings />} />
                                    <Route path="/cloud" element={<Cloud />} />
                                    <Route path="/work" element={<Work />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
}

export default App;
