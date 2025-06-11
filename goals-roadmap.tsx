"use client";
import React, { useEffect } from "react";
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    type Node,
    type Edge,
} from "@xyflow/react";
import dagre from "dagre";

// Import the stylesheet from the CDN
import "@xyflow/react/dist/style.css";

// --- Custom Hook for Auto Layout ---
// This hook uses the Dagre library to automatically layout nodes.

const nodeWidth = 172;
const nodeHeight = 36;

// Create a new graph instance for each layout calculation
const getLayoutedElements = (
    nodes: Node[],
    edges: Edge[],
    direction = "TB"
) => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);

        // The layout algorithm gives us the center of the node,
        // so we need to offset it to get the top-left corner for React Flow.
        const newPosition = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };

        return { ...node, position: newPosition };
    });

    return layoutedNodes;
};

type UseAutoLayoutArgs = {
    nodes: Node[];
    edges: Edge[];
    setNodes: (nodes: Node[]) => void;
    direction?: "TB" | "LR"; // Layout direction: Top-to-Bottom or Left-to-Right
};

const useAutoLayout = ({
    nodes,
    edges,
    setNodes,
    direction = "TB",
}: UseAutoLayoutArgs) => {
    useEffect(() => {
        // We only want to run this when the number of nodes or edges changes.
        if (nodes.length === 0) {
            return;
        }

        const layoutedNodes = getLayoutedElements(nodes, edges, direction);
        setNodes(layoutedNodes as Node[]);

        // We run this effect only when the number of nodes or the edges array changes.
        // Using nodes.length ensures it runs on add/remove but not on drag.
    }, [nodes.length, edges, setNodes, direction]);
};

// --- Sample Data ---
// The initial positions are (0,0) because the useAutoLayout hook will override them.
export const sampleNodes: Node[] = [
    {
        id: "1",
        type: "input",
        data: { label: "Start" },
        position: { x: 0, y: 120 },
    },
    { id: "2", data: { label: "Step 1" }, position: { x: 0, y: 0 } },
    { id: "3", data: { label: "Step 2" }, position: { x: 0, y: 0 } },
    {
        id: "4",
        type: "output",
        data: { label: "Finish" },
        position: { x: 50, y: 127 },
    },
];

export const sampleEdges: Edge[] = [
    {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: true,
        type: "smoothstep",
    },
    {
        id: "e2-3",
        source: "2",
        target: "3",
        animated: true,
        type: "smoothstep",
    },
    {
        id: "e3-4",
        source: "3",
        target: "4",
        animated: true,
        type: "smoothstep",
    },
];

// --- Main Component ---

export default function GoalsRoadmap() {
    const [nodes, setNodes, onNodesChange] = useNodesState(sampleNodes);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [edges, setEdges, onEdgesChange] = useEdgesState(sampleEdges);

    // Use the custom hook to automatically layout the nodes.
    useAutoLayout({ nodes, edges, setNodes, direction: "LR" });

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                backgroundColor: "#f0f2f5",
            }}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                proOptions={{ hideAttribution: true }} // Hides the React Flow attribution for a cleaner look
                className="bg-gray-100"
            ></ReactFlow>
        </div>
    );
}
