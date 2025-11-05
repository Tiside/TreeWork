import {useEffect, useState} from "react";


function Navigation() {

    const [isDark, setIsDark] = useState(false);
    const [userOpen, setUserOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

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
                    <div className={`search-bar ${searchOpen ? "open" : ""}`}>
                        <i
                            className="bx bx-search-alt-2"
                            onClick={() => setSearchOpen(!searchOpen)}
                        ></i>
                        <input type="text" placeholder="Search..." />
                    </div>
                    <div className="message">
                        <span className="count">0</span>
                        <i className="bx bxs-bell"></i>
                    </div>
                    <i className="bx bxs-cloud"></i>

                    <div className="user" onClick={() => setUserOpen(v => !v)}>
                        <div className="user-ui">
                            <i className={`bx bxs-cog ${userOpen ? "show" : ""}`}></i>
                            <i className={`bx bxs-user-circle ${userOpen ? "show" : ""}`}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navigation;