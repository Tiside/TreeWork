import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


function Navigation({ openSearchExternally, logout}) {

    const [isDark, setIsDark] = useState(false);
    const [userOpen, setUserOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);;
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [avatar, setAvatar] = useState(
        localStorage.getItem("avatarUrl") || "/user.jpg"
    );
    const token = localStorage.getItem("token");
    const [searchResults, setSearchResults] = useState({
        users: [],
        notes: [],
        events: [],
    });
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState("");
    const [searchTimer, setSearchTimer] = useState(null);



    useEffect(() => {
        if (!token) return;

        const loadProfile = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) {
                    console.error("Navigation profile load error:", res.status);
                    return;
                }

                const data = await res.json();

                if (data.profile_picture) {
                    // с бэка приходит "/avatars/1.png" → делаем полный URL
                    const fullUrl = `http://localhost:3000${data.profile_picture}`;
                    setAvatar(fullUrl);
                    localStorage.setItem("avatarUrl", fullUrl); // чтобы помнить между перезапусками
                } else {
                    setAvatar("/user.jpg");
                    localStorage.removeItem("avatarUrl");
                }
            } catch (err) {
                console.error("Navigation avatar error:", err);
            }
        };

        loadProfile();
    }, [token]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);

        if (value.length > 0) {
            setSearchOpen(true);
        } else {
            setSearchResults({ users: [], notes: [], events: [] });
            setSearchError("");
        }

        // простой debounce
        if (searchTimer) clearTimeout(searchTimer);

        const t = setTimeout(() => {
            runSearch(value);
        }, 400); // 400ms задержка

        setSearchTimer(t);
    };

    const runSearch = async (query) => {
        if (!query || query.trim().length < 2) {
            setSearchResults({ users: [], notes: [], events: [] });
            setSearchError("");
            return;
        }
        if (!token) return;

        try {
            setSearchLoading(true);
            setSearchError("");

            const res = await fetch(
                `http://localhost:3000/api/search?q=${encodeURIComponent(query)}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                setSearchError(data.error || "Search error");
                setSearchResults({ users: [], notes: [], events: [] });
                return;
            }

            const data = await res.json();
            setSearchResults(data);
        } catch (err) {
            console.error("search error:", err);
            setSearchError("Search error");
            setSearchResults({ users: [], notes: [], events: [] });
        } finally {
            setSearchLoading(false);
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

    const handleResultClick = () => {
        setSearchOpen(false);
        setSearchValue("");
        setSearchResults({ users: [], notes: [], events: [] });
    };

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
                    <Link to={"/home"}>
                    <img src="/logo2.png" alt=""/>
                    </Link>
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

                        {searchOpen && searchValue.length > 0 && (
                            <div className="search-results">
                                <div className="search-results-header">
                                    <span>Results</span>
                                    <span className="search-results-count">
                {searchLoading
                    ? "Searching..."
                    : `${searchResults.users.length +
                    searchResults.notes.length +
                    searchResults.events.length} found`}
            </span>
                                </div>

                                {searchError && (
                                    <div className="search-error">{searchError}</div>
                                )}

                                {!searchLoading && !searchError && (
                                    <ul className="search-results-list">
                                        {/* USERS */}

                                        {/* NOTES */}
                                        {searchResults.users.map((u) => (
                                            <li className="search-result-item" key={`user-${u.id}`}>
                                                <Link
                                                    to={`/user/${u.id}`}
                                                    className="search-result-link"
                                                    onClick={handleResultClick}  // чтоб закрыть дропдаун
                                                >
                                                    <i className="bx bxs-user"></i>
                                                    <div className="search-result-text">
                <span className="search-result-title">
                    {u.name_and_surname}
                    {u.nickname ? ` (${u.nickname})` : ""}
                </span>
                                                        <span className="search-result-subtitle">
                    {u.email}
                </span>
                                                    </div>
                                                    <span className="search-result-tag">User</span>
                                                </Link>
                                            </li>
                                        ))}

                                        {/* EVENTS */}
                                        {searchResults.events.map((e) => (
                                            <li className="search-result-item" key={`event-${e.id}`}>
                                                <i className="bx bxs-calendar-event"></i>
                                                <div className="search-result-text">
                            <span className="search-result-title">
                                {e.text}
                            </span>
                                                    <span className="search-result-subtitle">
                                {e.date} {e.hour_form}–{e.hour_to}
                            </span>
                                                </div>
                                                <span className="search-result-tag">Calendar</span>
                                            </li>
                                        ))}

                                        {searchResults.users.length === 0 &&
                                            searchResults.notes.length === 0 &&
                                            searchResults.events.length === 0 &&
                                            !searchLoading && (
                                                <li className="search-result-item empty">
                                                    <span>No results</span>
                                                </li>
                                            )}
                                    </ul>
                                )}

                                {/* потом можно сделать реальную страницу «View all» */}
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
                                {notificationsEnabled && (
                                    <i
                                        className='bx bxs-notification'
                                        style={{cursor: "pointer"}}
                                        onClick={toggleNotificationIcon}
                                    ></i>
                                )}
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
                        <div
                            className="user-pfp"
                            style={avatar ? { backgroundImage: `url(${avatar})` } : {}}
                            onClick={() => setUserOpen(v => !v)}
                        ></div>


                        <div className="user-ui">

                            <Link to="/settings"><i className={`bx bxs-cog ${userOpen ? "show" : ""}`}></i></Link>
                            <Link to="/profile"><i
                                className={`bx bxs-user-circle ${userOpen ? "show" : ""}`}></i></Link>
                            <i className={`bx bxs-door-open ${userOpen ? "show" : ""}`} onClick={logout}></i>
                        </div>
                        <div className="activity active"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navigation;