import { useRef, useState } from "react";
import "/src/Css/workspace.css";
import {Link} from "react-router-dom";

const initialNodes = [
    {
        id: 1,
        title: "New user trigger",
        text: "When a new user is created, notify workspace.",
        x: 420,
        y: 140,
        progress: 35,
    },
    {
        id: 2,
        title: "Item update",
        text: "When an item is updated, send info to channel.",
        x: 700,
        y: 260,
        progress: 60,
    },
    {
        id: 3,
        title: "Error handler",
        text: "When data fails, send alert to owner.",
        x: 220,
        y: 360,
        progress: 15,
    },
];

// связи между нодами
const connections = [
    { id: "c1", from: 1, to: 2, status: "ok" },
    { id: "c2", from: 2, to: 3, status: "warning" },
    { id: "c3", from: 2, to: 3, status: "error" },
];

const NODE_WIDTH = 260;
const NODE_HEIGHT = 130;

function Workspace() {
    const [nodes, setNodes] = useState(initialNodes);

    const [draggingId, setDraggingId] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const panStartRef = useRef({ x: 0, y: 0 });

    const canvasRef = useRef(null);

    const handleNodeMouseDown = (e, id) => {
        e.preventDefault();
        e.stopPropagation();

        const canvasRect = canvasRef.current.getBoundingClientRect();
        const node = nodes.find((n) => n.id === id);
        if (!node) return;

        const mouseX = e.clientX - canvasRect.left;
        const mouseY = e.clientY - canvasRect.top;

        setDragOffset({
            x: mouseX - node.x,
            y: mouseY - node.y,
        });
        setDraggingId(id);
    };

    const handleCanvasMouseDown = (e) => {
        if (e.button !== 0) return;
        setIsPanning(true);
        panStartRef.current = {
            x: e.clientX - pan.x,
            y: e.clientY - pan.y,
        };
    };

    const handleMouseMove = (e) => {
        if (isPanning) {
            setPan({
                x: e.clientX - panStartRef.current.x,
                y: e.clientY - panStartRef.current.y,
            });
            return;
        }

        if (!draggingId) return;
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const mouseX = e.clientX - canvasRect.left;
        const mouseY = e.clientY - canvasRect.top;

        const newX = mouseX - dragOffset.x;
        const newY = mouseY - dragOffset.y;

        setNodes((prev) =>
            prev.map((n) =>
                n.id === draggingId ? { ...n, x: newX, y: newY } : n
            )
        );
    };

    const stopAllDrag = () => {
        setDraggingId(null);
        setIsPanning(false);
    };

    // для быстрого доступа по id
    const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));

    return (
        <div
            className="workspace-grid"
            ref={canvasRef}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopAllDrag}
            onMouseLeave={stopAllDrag}
        >
            <div
                className="workspace-inner"
                style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}
            >
                <svg className="ws-connections">
                    {connections.map((c) => {
                        const from = nodeById[c.from];
                        const to = nodeById[c.to];
                        if (!from || !to) return null;

                        // нижний центр from → верхний центр to
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
                            />
                        );
                    })}
                </svg>

                {nodes.map((node) => (
                    <div
                        key={node.id}
                        className={`ws-node ${draggingId === node.id ? "dragging" : ""}`}
                        style={{
                            left: `${node.x}px`,
                            top: `${node.y}px`,
                            width: NODE_WIDTH,
                        }}
                        onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                    >
                        <div className="ws-node-header">
                            <div className="text">
                                <h4>Point Name</h4>
                                <p className="user-to-point">Maciej</p>
                            </div>
                            <div className="icons">
                                <i className="bx bx-dots-horizontal-rounded"></i>
                                <i className="bx bx-check"></i>
                            </div>
                        </div>
                        <h4>{node.title}</h4>
                        <p>{node.text}</p>

                        <div className="ws-node-progress">
                            <div
                                className="ws-node-progress-fill"
                                style={{ width: `${node.progress ?? 50}%` }}
                            />
                        </div>
                        <div className="footer">
                            <div className="date">
                                <span>19.11.2025</span>
                            </div>
                            <Link to="/workspace/pointView">
                            <div className="open-point">
                                <i className='bx bxs-folder-open'></i>
                            </div>
                        </Link>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Workspace;
