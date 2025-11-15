import { useState } from "react";
import "/src/Css/projectForm.css";

function ProjectForm() {
    const [step, setStep] = useState(1);

    const [projectName, setProjectName] = useState("");
    const [projectTime, setProjectTime] = useState("");
    const [projectOwner, setProjectOwner] = useState("");
    const [projectDescription, setProjectDescription] = useState("");

    const [tasks, setTasks] = useState([
        { id: Date.now(), title: "", dueDate: "", assignee: "", subTasks: [] },
    ]);

    const handleAddTask = () => {
        setTasks(prev => [
            ...prev,
            { id: Date.now() + Math.random(), title: "", dueDate: "", assignee: "", subTasks: [] },
        ]);
    };

    const handleTaskChange = (id, field, value) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, [field]: value } : task
            )
        );
    };

    const handleRemoveTask = (id) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const handleAddSubTask = (taskId) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === taskId
                    ? {
                        ...task,
                        subTasks: [
                            ...task.subTasks,
                            { id: Date.now() + Math.random(), title: "", assignee: "", dueDate: "" },
                        ],
                    }
                    : task
            )
        );
    };

    const handleSubTaskChange = (taskId, subId, field, value) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === taskId
                    ? {
                        ...task,
                        subTasks: task.subTasks.map(sub =>
                            sub.id === subId ? { ...sub, [field]: value } : sub
                        ),
                    }
                    : task
            )
        );
    };

    const handleRemoveSubTask = (taskId, subId) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === taskId
                    ? {
                        ...task,
                        subTasks: task.subTasks.filter(sub => sub.id !== subId),
                    }
                    : task
            )
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name: projectName,
            owner: projectOwner,
            estimatedTime: projectTime,
            description: projectDescription,
            tasks,
        };

        console.log("Project created:", payload);
        // сюда потом добавишь запрос на бек или сохранение в state
    };

    const canGoNextStep1 = projectName.trim().length > 0;
    const canGoNextStep2 = tasks.some(t => t.title.trim().length > 0);

    return (
        <>
        <div className="project-form-wrap">
            <div className="pf-card">
                {/* STEPPER */}
                <div className="pf-steps">
                    <div className={`pf-step ${step === 1 ? "active" : ""}`}>
                        <span className="dot">1</span>
                        <span className="label">Project</span>
                    </div>
                    <div className={`pf-step ${step === 2 ? "active" : ""}`}>
                        <span className="dot">2</span>
                        <span className="label">Tasks</span>
                    </div>
                    <div className={`pf-step ${step === 3 ? "active" : ""}`}>
                        <span className="dot">3</span>
                        <span className="label">Subtasks & Review</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* STEP 1 */}
                    {step === 1 && (
                        <div className="pf-panel">
                            <h2>New project</h2>
                            <p className="pf-subtitle">
                                Give your project a clear name and basic info.
                            </p>

                            <div className="pf-grid">
                                <div className="pf-field full">
                                    <label>Project name <span>*</span></label>
                                    <input
                                        type="text"
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                        placeholder="Tree Work – UI revamp"
                                    />
                                </div>

                                <div className="pf-field">
                                    <label>Owner / main user</label>
                                    <input
                                        type="text"
                                        value={projectOwner}
                                        onChange={(e) => setProjectOwner(e.target.value)}
                                        placeholder="Stanislav Bazhan"
                                    />
                                </div>

                                <div className="pf-field">
                                    <label>Estimated time for project (hours)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={projectTime}
                                        onChange={(e) => setProjectTime(e.target.value)}
                                        placeholder="e.g. 24"
                                    />
                                </div>

                                <div className="pf-field full">
                                    <label>Description (optional)</label>
                                    <textarea
                                        value={projectDescription}
                                        onChange={(e) => setProjectDescription(e.target.value)}
                                        rows={3}
                                        placeholder="Short description of goals, scope, etc."
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <div className="pf-panel">
                            <h2>Project tasks</h2>
                            <p className="pf-subtitle">
                                Create main points of the project. You can add subtasks later.
                            </p>

                            <div className="pf-tasks-list">
                                {tasks.map((task, index) => (
                                    <div className="pf-task-row" key={task.id}>
                                        <div className="pf-task-header">
                                            <span className="badge">#{index + 1}</span>
                                            <button
                                                type="button"
                                                className="pf-mini-btn"
                                                onClick={() => handleAddSubTask(task.id)}
                                            >
                                                + Add subtask
                                            </button>
                                            {tasks.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="pf-mini-btn danger"
                                                    onClick={() => handleRemoveTask(task.id)}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>

                                        <div className="pf-task-grid">
                                            <div className="pf-field full">
                                                <label>Task title</label>
                                                <input
                                                    type="text"
                                                    value={task.title}
                                                    onChange={(e) =>
                                                        handleTaskChange(task.id, "title", e.target.value)
                                                    }
                                                    placeholder="Design workspace layout"
                                                />
                                            </div>

                                            <div className="pf-field">
                                                <label>Due date (optional)</label>
                                                <input
                                                    type="date"
                                                    value={task.dueDate}
                                                    onChange={(e) =>
                                                        handleTaskChange(task.id, "dueDate", e.target.value)
                                                    }
                                                />
                                            </div>

                                            <div className="pf-field">
                                                <label>Assigned user (optional)</label>
                                                <input
                                                    type="text"
                                                    value={task.assignee}
                                                    onChange={(e) =>
                                                        handleTaskChange(task.id, "assignee", e.target.value)
                                                    }
                                                    placeholder="@user"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="pf-add-task-btn"
                                onClick={handleAddTask}
                            >
                                <i className="bx bx-plus"></i> Add task
                            </button>
                        </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <div className="pf-panel">
                            <h2>Subtasks & review</h2>
                            <p className="pf-subtitle">
                                Add optional subtasks to each task and check project structure.
                            </p>

                            <div className="pf-review">
                                {tasks.map((task, index) => (
                                    <div className="pf-review-task" key={task.id}>
                                        <div className="pf-review-task-header">
                                            <span className="badge">#{index + 1}</span>
                                            <div>
                                                <h3>{task.title || "Untitled task"}</h3>
                                                <div className="pf-review-meta">
                                                    {task.dueDate && <span>Due: {task.dueDate}</span>}
                                                    {task.assignee && <span>Assigned: {task.assignee}</span>}
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className="pf-mini-btn"
                                                onClick={() => handleAddSubTask(task.id)}
                                            >
                                                + Subtask
                                            </button>
                                        </div>

                                        {task.subTasks.length > 0 && (
                                            <div className="pf-subtasks">
                                                {task.subTasks.map((sub) => (
                                                    <div className="pf-subtask-row" key={sub.id}>
                                                        <div className="pf-field full">
                                                            <label>Subtask title</label>
                                                            <input
                                                                type="text"
                                                                value={sub.title}
                                                                onChange={(e) =>
                                                                    handleSubTaskChange(
                                                                        task.id,
                                                                        sub.id,
                                                                        "title",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                placeholder="Prepare components list"
                                                            />
                                                        </div>

                                                        <div className="pf-field">
                                                            <label>Due (optional)</label>
                                                            <input
                                                                type="date"
                                                                value={sub.dueDate}
                                                                onChange={(e) =>
                                                                    handleSubTaskChange(
                                                                        task.id,
                                                                        sub.id,
                                                                        "dueDate",
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </div>

                                                        <div className="pf-field">
                                                            <label>User (optional)</label>
                                                            <input
                                                                type="text"
                                                                value={sub.assignee}
                                                                onChange={(e) =>
                                                                    handleSubTaskChange(
                                                                        task.id,
                                                                        sub.id,
                                                                        "assignee",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                placeholder="@user"
                                                            />
                                                        </div>

                                                        <button
                                                            type="button"
                                                            className="pf-mini-btn danger"
                                                            onClick={() =>
                                                                handleRemoveSubTask(task.id, sub.id)
                                                            }
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FOOTER BUTTONS */}
                    <div className="pf-footer">
                        {step > 1 && (
                            <button
                                type="button"
                                className="pf-secondary-btn"
                                onClick={() => setStep(step - 1)}
                            >
                                Back
                            </button>
                        )}

                        {step < 3 && (
                            <button
                                type="button"
                                className="pf-primary-btn"
                                disabled={(step === 1 && !canGoNextStep1) || (step === 2 && !canGoNextStep2)}
                                onClick={() => setStep(step + 1)}
                            >
                                Next
                            </button>
                        )}

                        {step === 3 && (
                            <button type="submit" className="pf-primary-btn">
                                Create project
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default ProjectForm;
