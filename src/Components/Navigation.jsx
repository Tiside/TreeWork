import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


function Navigation({ openSearchExternally }) {

    const [isDark, setIsDark] = useState(false);
    const [userOpen, setUserOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);;
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);

        if (value.length > 0) {
            setSearchOpen(true);
        }
    };

    const toggleNotificationsContent = () => {
        setShowNotifications(prev => !prev);
    };

    const toggleNotificationIcon = () => {
        setNotificationsEnabled(prev => !prev);
    };


    useEffect(() => {
        if (isExpanded) {
            document.body.classList.add("expanded");
        } else {
            document.body.classList.remove("expanded");
        }
        return () => document.body.classList.remove("expanded");
    }, [isExpanded]);

    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;

        if (isDark) {
            root.classList.remove("dark");
            root.classList.add("light");
            body.classList.add("light");
        } else {
            root.classList.remove("light");
            root.classList.add("dark");
            body.classList.remove("light");
        }
    }, [isDark]);

    useEffect(() => {
        if (openSearchExternally) {
            setSearchOpen(true);
        }
    }, [openSearchExternally]);



    return (
        <>
            <div className="navigation">
                <div className="expand">
                    <i
                        className={`bx ${isExpanded ? "bx-exit-fullscreen" : "bx-fullscreen"} ${isExpanded ? "active" : ""}`}
                        onClick={() => setIsExpanded(!isExpanded)}
                    ></i>
                </div>

                <div className="logo-name">
                    <img src="/logo2.png" alt=""/>
                    <h3>Tree Work</h3>
                </div>

                <div className="theme">
                    <div className="theme-change">
                        <div className="dark">
                            <i
                                className={`bx bx-sun ${isDark ? "active" : ""}`}
                                onClick={() => setIsDark(true)}
                            />
                        </div>
                        <div className="light">
                            <i
                                className={`bx bx-moon ${!isDark ? "active" : ""}`}
                                onClick={() => setIsDark(false)}
                            />
                        </div>
                    </div>
                </div>

                <div className="user-info">

                    <div className="search-wrapper">
                        <div className={`search-bar ${searchOpen ? "open" : ""}`}>
                            <i
                                className="bx bx-search-alt-2"
                                onClick={() => setSearchOpen(!searchOpen)}
                            ></i>

                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchValue}
                                onChange={handleSearchChange}
                            />
                        </div>

                        {(searchOpen || searchValue.length > 0) && (
                            <div className="search-results">

                                <div className="search-results-header">
                                    <span>Results</span>
                                    <span className="search-results-count">3 found</span>
                                </div>

                                <ul className="search-results-list">
                                    <li className="search-result-item">
                                        <i className="bx bxs-user"></i>
                                        <div className="search-result-text">
                                            <span className="search-result-title">Profile: Stanislav Bazhan</span>
                                            <span className="search-result-subtitle">Open your profile details</span>
                                        </div>
                                        <span className="search-result-tag">Profile</span>
                                    </li>

                                    <li className="search-result-item">
                                        <i className="bx bxs-folder-open"></i>
                                        <div className="search-result-text">
                                            <span className="search-result-title">Project: Tree Work</span>
                                            <span className="search-result-subtitle">Main dashboard section</span>
                                        </div>
                                        <span className="search-result-tag">Project</span>
                                    </li>

                                    <li className="search-result-item">
                                        <i className="bx bxs-calendar-event"></i>
                                        <div className="search-result-text">
                                            <span className="search-result-title">Today tasks</span>
                                            <span className="search-result-subtitle">3 planned events</span>
                                        </div>
                                        <span className="search-result-tag">Calendar</span>
                                    </li>
                                </ul>

                                <button className="search-view-all">View all</button>

                            </div>
                        )}
                    </div>


                    <div className="message">
                        <span className="count">0</span>

                        {notificationsEnabled ? (
                            <i
                                className="bx bxs-bell"
                                onClick={toggleNotificationsContent}
                                style={{cursor: "pointer"}}
                            ></i>
                        ) : (
                            <i
                                className="bx bxs-bell-off"
                                onClick={toggleNotificationsContent}
                                style={{cursor: "pointer"}}
                            ></i>
                        )}

                        <div
                            className="notifications-content"
                            style={{display: showNotifications ? "block" : "none"}}
                        >
                            <div className="notifications-header">
                                <div className="text">
                                    <h3>Notifications</h3>
                                    <p>You have <span className="blue-notifaction">0 Notifications</span> today</p>
                                </div>

                                {/* ВКЛЮЧЕНО */}
                                {notificationsEnabled && (
                                    <i
                                        className='bx bxs-notification'
                                        style={{cursor: "pointer"}}
                                        onClick={toggleNotificationIcon}
                                    ></i>
                                )}

                                {/* ВЫКЛЮЧЕНО */}
                                {!notificationsEnabled && (
                                    <i
                                        className='bx bxs-notification-off'
                                        style={{cursor: "pointer"}}
                                        onClick={toggleNotificationIcon}
                                    ></i>
                                )}

                            </div>

                            <div className="notifications">
                                <div className="notification">
                                    <h4>Projekt</h4>
                                    <div className="notification-content">
                                        <i className='bx bxs-folder-open'></i>
                                        <p>Zrobionio nowy punkt</p>
                                        <div className="sign"></div>
                                    </div>
                                </div>

                                <div className="notification">
                                    <h4>Projekt</h4>
                                    <div className="notification-content">
                                        <i className='bx bxs-folder-open'></i>
                                        <p>Zrobionio nowy projekt</p>
                                        <div className="sign"></div>
                                    </div>
                                </div>

                                <div className="notification">
                                    <h4>Projekt</h4>
                                    <div className="notification-content">
                                        <i className='bx bxs-folder-open'></i>
                                        <p>Zrobionio</p>
                                        <div className="sign"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link to="/cloud"><i className="bx bxs-cloud"></i></Link>


                    <div className="user">
                        <div className="user-pfp" onClick={() => setUserOpen(v => !v)}></div>
                        <div className="user-ui">
                            <Link to="/settings"><i className={`bx bxs-cog ${userOpen ? "show" : ""}`}></i></Link>
                            <Link to="/profile"><i
                                className={`bx bxs-user-circle ${userOpen ? "show" : ""}`}></i></Link>
                        </div>
                        <div className="activity active"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navigation;