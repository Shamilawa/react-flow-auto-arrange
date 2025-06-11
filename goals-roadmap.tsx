"use client";

import { useCallback } from "react";
import ReactFlow, {
    type Node,
    type Edge,
    addEdge,
    Background,
    type Connection,
    ConnectionMode,
    Controls,
    useNodesState,
    useEdgesState,
    MiniMap,
    BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes: Node[] = [
    {
        id: "start",
        type: "input",
        data: { label: "🎯 Current State\nDefine Starting Point" },
        position: { x: 250, y: 0 },
        style: {
            background: "#e3f2fd",
            border: "2px solid #1976d2",
            borderRadius: "10px",
            fontSize: "12px",
            textAlign: "center",
            width: 180,
            height: 80,
        },
    },
    {
        id: "goal1",
        data: { label: "📚 Learn Fundamentals\n(Month 1-2)" },
        position: { x: 100, y: 150 },
        style: {
            background: "#f3e5f5",
            border: "2px solid #7b1fa2",
            borderRadius: "10px",
            fontSize: "12px",
            textAlign: "center",
            width: 160,
            height: 70,
        },
    },
    {
        id: "goal2",
        data: { label: "🛠️ Build First Project\n(Month 3-4)" },
        position: { x: 400, y: 150 },
        style: {
            background: "#e8f5e8",
            border: "2px solid #388e3c",
            borderRadius: "10px",
            fontSize: "12px",
            textAlign: "center",
            width: 160,
            height: 70,
        },
    },
    {
        id: "goal3",
        data: { label: "🤝 Network & Collaborate\n(Month 4-6)" },
        position: { x: 50, y: 300 },
        style: {
            background: "#fff3e0",
            border: "2px solid #f57c00",
            borderRadius: "10px",
            fontSize: "12px",
            textAlign: "center",
            width: 160,
            height: 70,
        },
    },
    {
        id: "goal4",
        data: { label: "🚀 Advanced Skills\n(Month 6-9)" },
        position: { x: 250, y: 300 },
        style: {
            background: "#fce4ec",
            border: "2px solid #c2185b",
            borderRadius: "10px",
            fontSize: "12px",
            textAlign: "center",
            width: 160,
            height: 70,
        },
    },
    {
        id: "goal5",
        data: { label: "💼 Portfolio & Resume\n(Month 9-10)" },
        position: { x: 450, y: 300 },
        style: {
            background: "#e0f2f1",
            border: "2px solid #00695c",
            borderRadius: "10px",
            fontSize: "12px",
            textAlign: "center",
            width: 160,
            height: 70,
        },
    },
    {
        id: "milestone",
        data: { label: "🎉 Major Milestone\nJob/Certification" },
        position: { x: 250, y: 450 },
        style: {
            background: "#fff8e1",
            border: "3px solid #ff8f00",
            borderRadius: "15px",
            fontSize: "12px",
            textAlign: "center",
            width: 180,
            height: 80,
            fontWeight: "bold",
        },
    },
    {
        id: "final",
        type: "output",
        data: { label: "🏆 Ultimate Goal\nCareer Success" },
        position: { x: 250, y: 600 },
        style: {
            background: "#f1f8e9",
            border: "3px solid #558b2f",
            borderRadius: "15px",
            fontSize: "12px",
            textAlign: "center",
            width: 180,
            height: 80,
            fontWeight: "bold",
        },
    },
];

const initialEdges: Edge[] = [
    {
        id: "e-start-goal1",
        source: "start",
        target: "goal1",
        animated: true,
        style: { stroke: "#1976d2", strokeWidth: 2 },
    },
    {
        id: "e-start-goal2",
        source: "start",
        target: "goal2",
        animated: true,
        style: { stroke: "#1976d2", strokeWidth: 2 },
    },
    {
        id: "e-goal1-goal3",
        source: "goal1",
        target: "goal3",
        animated: true,
        style: { stroke: "#7b1fa2", strokeWidth: 2 },
    },
    {
        id: "e-goal1-goal4",
        source: "goal1",
        target: "goal4",
        animated: true,
        style: { stroke: "#7b1fa2", strokeWidth: 2 },
    },
    {
        id: "e-goal2-goal4",
        source: "goal2",
        target: "goal4",
        animated: true,
        style: { stroke: "#388e3c", strokeWidth: 2 },
    },
    {
        id: "e-goal2-goal5",
        source: "goal2",
        target: "goal5",
        animated: true,
        style: { stroke: "#388e3c", strokeWidth: 2 },
    },
    {
        id: "e-goal3-milestone",
        source: "goal3",
        target: "milestone",
        animated: true,
        style: { stroke: "#f57c00", strokeWidth: 2 },
    },
    {
        id: "e-goal4-milestone",
        source: "goal4",
        target: "milestone",
        animated: true,
        style: { stroke: "#c2185b", strokeWidth: 2 },
    },
    {
        id: "e-goal5-milestone",
        source: "goal5",
        target: "milestone",
        animated: true,
        style: { stroke: "#00695c", strokeWidth: 2 },
    },
    {
        id: "e-milestone-final",
        source: "milestone",
        target: "final",
        animated: true,
        style: { stroke: "#ff8f00", strokeWidth: 3 },
    },
];

export default function GoalsRoadmap() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <div className="w-full h-screen bg-gray-50">
            <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                    🗺️ Goals Roadmap
                </h2>
                <p className="text-sm text-gray-600">
                    Interactive career development journey
                </p>
            </div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                connectionMode={ConnectionMode.Loose}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                minZoom={0.5}
                maxZoom={1.5}
            >
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={20}
                    size={1}
                    color="#e0e0e0"
                />
                <Controls />
                <MiniMap
                    nodeColor={(node) => {
                        if (node.type === "input") return "#1976d2";
                        if (node.type === "output") return "#558b2f";
                        return "#666";
                    }}
                    nodeStrokeWidth={3}
                    pannable
                    zoomable
                />
            </ReactFlow>
        </div>
    );
}
