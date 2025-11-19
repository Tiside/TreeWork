import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "/src/Css/workspace.css";

const NODE_WIDTH = 260;
const NODE_HEIGHT = 130;

function Workspace() {
    const { projectId } = useParams();
    const [nodes, setNodes] = useState([]);
    const [connections, setConnections] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [draggingId, setDraggingId] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const panStartRef = useRef({ x: 0, y: 0 });
    const canvasRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`http://localhost:3000/api/projects`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(projects => {
                const project = projects.find(p => p.id === parseInt(projectId));
                if (!project) return;

                const loadedNodes = [];
                const loadedConnections = [];
                let idCounter = 1;
                const taskIdMap = {};

                project.tasks?.forEach((task, tIdx) => {
                    if (!task.parentId) {
                        const nodeId = idCounter++;
                        loadedNodes.push({
                            id: nodeId,
                            originalId: task.id,
                            title: task.title,
                            text: task.description || "",
                            progress: task.progress || 0,
                            x: 100 + tIdx * 300,
                            y: 100,
                            parentId: null,
                        });
                        taskIdMap[task.id] = nodeId;
                    }
                });

                project.tasks?.forEach((task) => {
                    if (task.parentId) {
                        const parentNodeId = taskIdMap[task.parentId];
                        if (!parentNodeId) return;

                        const nodeId = idCounter++;
                        loadedNodes.push({
                            id: nodeId,
                            originalId: task.id,
                            title: task.title,
                            text: task.description || "",
                            progress: task.progress || 0,
                            x: taskIdMap[task.parentId] ? loadedNodes.find(n => n.id === parentNodeId).x + 0 : 100,
                            y: taskIdMap[task.parentId] ? loadedNodes.find(n => n.id === parentNodeId).y + 150 : 250,
                            parentId: parentNodeId,
                        });

                        loadedConnections.push({
                            id: `c-${parentNodeId}-${nodeId}`,
                            from: parentNodeId,
                            to: nodeId,
                            status: "ok",
                        });
                    }
                });

                let prevNodeId = null;
                loadedNodes.filter(n => n.parentId === null).forEach((n) => {
                    if (prevNodeId !== null) {
                        loadedConnections.push({
                            id: `c-${prevNodeId}-${n.id}`,
                            from: prevNodeId,
                            to: n.id,
                            status: "ok",
                        });
                    }
                    prevNodeId = n.id;
                });

                setNodes(loadedNodes);
                setConnections(loadedConnections);
            })
            .catch(err => console.error("Błąd przy pobieraniu tasków projektu:", err));
    }, [projectId]);


    // Drag & pan
    const handleNodeMouseDown = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const node = nodes.find(n => n.id === id);
        if (!node) return;

        const mouseX = e.clientX - canvasRect.left;
        const mouseY = e.clientY - canvasRect.top;

        setDragOffset({ x: mouseX - node.x, y: mouseY - node.y });
        setDraggingId(id);
    };

    const handleCanvasMouseDown = (e) => {
        if (e.button !== 0) return;
        setIsPanning(true);
        panStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    };

    const handleMouseMove = (e) => {
        if (isPanning) {
            setPan({ x: e.clientX - panStartRef.current.x, y: e.clientY - panStartRef.current.y });
            return;
        }
        if (!draggingId) return;
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const mouseX = e.clientX - canvasRect.left;
        const mouseY = e.clientY - canvasRect.top;

        const newX = mouseX - dragOffset.x;
        const newY = mouseY - dragOffset.y;

        setNodes(prev => prev.map(n => (n.id === draggingId ? { ...n, x: newX, y: newY } : n)));
    };

    const stopAllDrag = () => {
        setDraggingId(null);
        setIsPanning(false);
    };

    const nodeById = Object.fromEntries(nodes.map(n => [n.id, n]));

    return (
        <div className="workspace-container">
            <div
                className="workspace-grid"
                ref={canvasRef}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={stopAllDrag}
                onMouseLeave={stopAllDrag}
            >
                <div className="workspace-inner" style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}>
                    <svg className="ws-connections">
                        {connections.map(c => {
                            const from = nodeById[c.from];
                            const to = nodeById[c.to];
                            if (!from || !to) return null;

                            const x1 = from.x + NODE_WIDTH / 2;
                            const y1 = from.y + NODE_HEIGHT;
                            const x2 = to.x + NODE_WIDTH / 2;
                            const y2 = to.y;
                            const midY = (y1 + y2) / 2;
                            const d = `M ${x1} ${y1} C ${x1} ${midY} ${x2} ${midY} ${x2} ${y2}`;

                            return (
                                <path
                                    key={c.id}
                                    d={d}
                                    className={`ws-connection ws-connection--${c.status}`}
                                    strokeWidth={3}
                                    fill="none"
                                    stroke={c.status === "ok" ? "#4caf50" : "#f44336"}
                                />
                            );
                        })}
                    </svg>

                    {nodes.map(node => (
                        <div
                            key={node.id}
                            className={`ws-node ${draggingId === node.id ? "dragging" : ""}`}
                            style={{
                                left: `${node.x}px`,
                                top: `${node.y}px`,
                                width: NODE_WIDTH,
                                cursor: "pointer",
                            }}
                            onMouseDown={e => handleNodeMouseDown(e, node.id)}
                            onClick={() => setSelectedNode(node)}
                        >
                            <div className="ws-node-header">
                                <div className="text">
                                    <h4>Task</h4>
                                </div>
                                <div className="icons">
                                    <i className="bx bx-dots-horizontal-rounded"></i>
                                </div>
                            </div>
                            <h4>{node.title}</h4>
                            <p>{node.text}</p>
                            <div className="ws-node-progress">
                                <div className="ws-node-progress-fill" style={{ width: `${node.progress}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedNode && (
                <div className="node-details-panel">
                    <button onClick={() => setSelectedNode(null)}>Close</button>
                    <h3>{selectedNode.title}</h3>
                    <p>{selectedNode.text}</p>
                    <p>Progress: {selectedNode.progress}%</p>
                </div>
            )}
        </div>
    );
}

export default Workspace;
