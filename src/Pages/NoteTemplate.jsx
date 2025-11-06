
import "/src/Css/noteTemplate.css"
function NoteTemplate(){
    return (
        <>
            <div className="user-note">
                <div className="nav-note">
                    <div className="tools">
                        <span>B</span>
                        <span>/</span>
                        <span>. List</span>
                        <span>1. List</span>
                        <span>Quote</span>
                        <span>L</span>
                    </div>
                    <div className="badge">
                        <span>Ctrl + K - Link</span>
                    </div>

                </div>
                <div className="main-content-note">
                    <h1 className="title">Note Title</h1>
                    <p className="introduction">Introduction to the topic. Use <mark>highlights</mark> , short code snippets, and
                        links.</p>

                    <h2>CheckList(Today)</h2>
                    <ul className="checklist" id="todo">
                        <li><span className="box" role="checkbox" aria-checked="false"></span><p>Sprawdzić maile
                            projektowe</p></li>
                        <li className="done"><span className="box" role="checkbox" aria-checked="true"></span>
                            <p>Aktualizacja statusu w Tree Work</p></li>
                        <li><span className="box" role="checkbox" aria-checked="false"></span>
                            <p>Krótki <em>stand-up</em> z zespołem</p></li>
                    </ul>
                    <h2>Tasks List</h2>
                    <ul className="dot-list">
                        <li>jeden</li>
                    </ul>

                    <ol className="number-list">
                        <li>jeden</li>
                    </ol>

                    <blockquote>
                        Super Projekt
                    </blockquote>
                    <h3>Code example</h3>
                    <pre><code>
                        print("Hello World")
                    </code></pre>

                    <table className="table">
                        <thead>
                        <tr>
                            <th>Task</th>
                            <th>Status</th>
                            <th>Priority</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>View model</td>
                            <td>In progress</td>
                            <td>Average</td>
                        </tr>
                        <tr>
                            <td>Calendar integration</td>
                            <td>To do</td>
                            <td>High</td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr className="add-row">
                            <td colSpan="3">
                                <div className="add-task">
                                    <i className="bx bxs-book-add"></i>
                                    <span>Add new task</span>
                                </div>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                    <div className="meta">
                        <span className="tag">#Projekt</span>
                        <time className="date">06.11.2025</time>
                    </div>

                </div>
            </div>

        </>
    );
}

export default NoteTemplate;