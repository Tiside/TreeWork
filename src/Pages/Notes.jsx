import "/src/Css/notes.css"
import {useEffect} from "react";
import {Link} from "react-router-dom";

function Notes() {
    useEffect(() => {
        const buttons = document.querySelectorAll(".notes-nav .filters .text-icon");

        const handleClick = (e) => {
            e.stopPropagation();

            const parent = e.currentTarget.parentElement;
            const filtered = parent.querySelector(".filtered");

            filtered.classList.toggle("show");

            const items = filtered.querySelectorAll("p");
            items.forEach(p => p.classList.toggle("show"));

            const icon = e.currentTarget.querySelector("i");
            if (icon) {
                icon.style.transition = "transform 0.3s ease";
                icon.style.transform = filtered.classList.contains("show")
                    ? "rotate(180deg)"
                    : "rotate(0deg)";
            }
        };

        buttons.forEach(btn => btn.addEventListener("click", handleClick));

        const closeAll = (e) => {
            if (!e.target.closest(".notes-nav .filters")) {
                document.querySelectorAll(".filtered.show").forEach(f => f.classList.remove("show"));
                document.querySelectorAll(".filtered p.show").forEach(p => p.classList.remove("show"));
                document.querySelectorAll(".notes-nav .filters .text-icon i")
                    .forEach(i => (i.style.transform = "rotate(0deg)"));
            }
        };
        document.addEventListener("click", closeAll);

        return () => {
            buttons.forEach(btn => btn.removeEventListener("click", handleClick));
            document.removeEventListener("click", closeAll);
        };
    }, []);
    return (
        <>
            <div className="notes-keybinds">
                <div className="binds">
                    <div className="bind">
                        <div className="key">
                            N
                        </div>
                        <p> Nowa notatka</p>
                    </div>
                    <div className="bind">
                        <div className="key">
                            /
                        </div>
                        <p>Szukaj</p>
                    </div>
                </div>
            </div>
            <div className="notes-nav">
                <div className="create">
                    <Link to="/noteForm">
                        <div className="create-nav">
                            <i className='bx bx-message-alt-add'></i>
                            <p>Create new</p>
                        </div>
                    </Link>
                    {/*<div className="notes-to-create">*/}
                    {/*    <div className="select-to-create important">*/}
                    {/*        <i className='bx bxs-notepad'></i>*/}
                    {/*        <p>Important</p>*/}
                    {/*    </div>*/}
                    {/*    <div className="select-to-create very-important">*/}
                    {/*        <i className='bx bxs-notepad'></i>*/}
                    {/*        <p>Very Important</p>*/}
                    {/*    </div>*/}
                    {/*    <div className="select-to-create personal">*/}
                    {/*        <i className='bx bxs-notepad'></i>*/}
                    {/*        <p>personal</p>*/}
                    {/*    </div>*/}
                    {/*    <div className="select-to-create work">*/}
                    {/*        <i className='bx bxs-notepad'></i>*/}
                    {/*        <p>work</p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div className="filters">
                    <div className="validity">
                        <div className="text-icon">
                            <p>Validity</p>
                            <i className="bx bx-chevron-down"></i>
                        </div>
                        <div className="filtered">
                            <p>important</p>
                            <p>very important</p>
                            <p>personal</p>
                            <p>work</p>
                        </div>
                    </div>

                    <div className="date">
                        <div className="text-icon">
                            <p>Date</p>
                            <i className="bx bx-chevron-down"></i>
                        </div>
                        <div className="filtered">
                            <p>last modified</p>
                            <p>yesterday</p>
                            <p>last month</p>
                            <p>last year</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="notes-content">
                <div className="notes-main">
                    <Link to="/noteName" className="note-link">
                        <div className="note">
                            <div className="nav-note">
                                <h3>Tree Work Project</h3>
                                <div className="validity-note validity-note-green"></div>
                            </div>
                            <div className="description">
                                <p>Zrobienie notatek na stronie
                                    dasdadadadasda
                                </p>
                            </div>
                            <div className="info-note">
                                <div className="tags">
                                    <div className="tag">#work</div>
                                    <div className="tag">#important</div>
                                </div>

                                <p>06.11.2025</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/noteName">
                        <div className="note">
                            <div className="nav-note">
                                <h3>Tree Work Project</h3>
                                <div className="validity-note validity-note-blue"></div>
                            </div>
                            <div className="description">
                                <p>Zrobienie notatek na stronie
                                    dasda</p>
                            </div>
                            <div className="info-note">
                                <div className="tag"></div>
                                <p>06.11.2025</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/noteName">
                        <div className="note">
                            <div className="nav-note">
                                <h3>Tree Work Project</h3>
                                <div className="validity-note validity-note-red"></div>
                            </div>
                            <div className="description">
                                <p>Zrobienie notatek na stronie</p>
                            </div>
                            <div className="info-note">
                                <div className="tag"></div>
                                <p>06.11.2025</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/noteName">
                        <div className="note">
                            <div className="nav-note">
                                <h3>Tree Work Project</h3>
                                <div className="validity-note validity-note-gray"></div>
                            </div>
                            <div className="description">
                                <p>Zrobienie notatek na stronie</p>
                            </div>
                            <div className="info-note">
                                <div className="tag"></div>
                                <p>06.11.2025</p>
                            </div>
                        </div>
                    </Link>


                </div>
                <div className="notes-side">
                    {/*<h3 className="header">Last Modified</h3>*/}
                    {/*<div className="side-note">*/}
                    {/*    <h3 className="notes-name">Tree Work Project</h3>*/}
                    {/*    <p className="description">Zrobienie notatek na stronie</p>*/}
                    {/*</div>*/}
                    <h3 className="header">Pinned Notes</h3>
                    <div className="side-note">
                        <h3 className="notes-name">Tree Work Project</h3>
                        <p className="description">Zrobienie notatek na stronie</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notes;