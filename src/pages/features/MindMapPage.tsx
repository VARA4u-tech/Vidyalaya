import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { GitBranch, Plus, Trash2, Move } from "lucide-react";

interface Node {
  id: number;
  label: string;
  x: number;
  y: number;
  color: string;
}
interface Edge {
  from: number;
  to: number;
}

const COLORS = [
  "hsl(9,70%,54%)",
  "hsl(185,48%,50%)",
  "hsl(265,60%,60%)",
  "hsl(142,60%,50%)",
  "hsl(34,60%,55%)",
];

const initialNodes: Node[] = [
  { id: 1, label: "Photosynthesis", x: 280, y: 180, color: "hsl(142,60%,50%)" },
  {
    id: 2,
    label: "Light Reactions",
    x: 120,
    y: 300,
    color: "hsl(185,48%,50%)",
  },
  { id: 3, label: "Calvin Cycle", x: 440, y: 300, color: "hsl(9,70%,54%)" },
  { id: 4, label: "Chlorophyll", x: 60, y: 430, color: "hsl(34,60%,55%)" },
  { id: 5, label: "ATP / NADPH", x: 200, y: 430, color: "hsl(265,60%,60%)" },
  { id: 6, label: "Glucose", x: 440, y: 430, color: "hsl(185,48%,50%)" },
];

const initialEdges: Edge[] = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
  { from: 3, to: 6 },
];

const MindMapPage = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges] = useState<Edge[]>(initialEdges);
  const [dragging, setDragging] = useState<number | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [newLabel, setNewLabel] = useState("");
  const svgRef = useRef<SVGSVGElement>(null);

  const addNode = () => {
    if (!newLabel.trim()) return;
    setNodes((n) => [
      ...n,
      {
        id: Date.now(),
        label: newLabel,
        x: 280 + Math.random() * 100 - 50,
        y: 520,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      },
    ]);
    setNewLabel("");
  };

  const deleteNode = (id: number) =>
    setNodes((n) => n.filter((nd) => nd.id !== id));

  const onMouseDown = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    const node = nodes.find((n) => n.id === id);
    if (!node) return;
    const rect = svgRef.current!.getBoundingClientRect();
    setDragging(id);
    setOffset({
      x: e.clientX - rect.left - node.x,
      y: e.clientY - rect.top - node.y,
    });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (dragging === null) return;
    const rect = svgRef.current!.getBoundingClientRect();
    setNodes((n) =>
      n.map((nd) =>
        nd.id === dragging
          ? {
              ...nd,
              x: e.clientX - rect.left - offset.x,
              y: e.clientY - rect.top - offset.y,
            }
          : nd,
      ),
    );
  };

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif font-bold text-[hsl(36,28%,93%)] text-2xl md:text-3xl mb-1">
            Mind Map Visualizer
          </h1>
          <p className="text-[hsl(36,15%,58%)] text-sm">
            Drag nodes to rearrange. Add new concepts dynamically.
          </p>
        </div>
      </div>

      {/* Add node */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNode()}
          placeholder="Add new concept…"
          className="flex-1 min-w-0 px-4 py-2.5 rounded-xl bg-[hsla(210,50%,24%,0.5)] text-[hsl(36,25%,88%)] border border-[hsla(36,25%,90%,0.08)] placeholder-[hsl(36,15%,40%)] text-sm outline-none focus:border-[hsl(185,48%,50%)]"
        />
        <button
          onClick={addNode}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white"
          style={{ backgroundColor: "hsl(185,48%,50%)" }}
        >
          <Plus size={14} /> Add Node
        </button>
      </div>

      {/* SVG Canvas */}
      <div
        className="rounded-2xl overflow-hidden border border-[hsla(36,25%,90%,0.08)] relative"
        style={{ backgroundColor: "hsla(210,50%,18%,0.6)" }}
      >
        <svg
          ref={svgRef}
          width="100%"
          height={560}
          onMouseMove={onMouseMove}
          onMouseUp={() => setDragging(null)}
          onMouseLeave={() => setDragging(null)}
        >
          {/* Grid */}
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="hsla(36,25%,90%,0.04)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Edges */}
          {edges.map((e, i) => {
            const from = nodeMap[e.from];
            const to = nodeMap[e.to];
            if (!from || !to) return null;
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="hsla(36,25%,90%,0.15)"
                strokeWidth={1.5}
                strokeDasharray="5 3"
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => (
            <g
              key={node.id}
              transform={`translate(${node.x},${node.y})`}
              onMouseDown={(e) => onMouseDown(e, node.id)}
              style={{ cursor: dragging === node.id ? "grabbing" : "grab" }}
            >
              <circle
                r={42}
                fill={node.color + "22"}
                stroke={node.color}
                strokeWidth={2}
              />
              <foreignObject
                x={-36}
                y={-18}
                width={72}
                height={36}
                style={{ pointerEvents: "none" }}
              >
                <div className="h-full flex items-center justify-center text-center">
                  <span
                    style={{
                      color: node.color,
                      fontSize: "11px",
                      fontWeight: 600,
                      lineHeight: "1.2",
                    }}
                  >
                    {node.label}
                  </span>
                </div>
              </foreignObject>
              <circle
                cx={30}
                cy={-30}
                r={10}
                fill="hsla(9,70%,54%,0.8)"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNode(node.id);
                }}
                style={{ cursor: "pointer", opacity: 0 }}
                className="hover:opacity-100 transition-opacity"
              ></circle>
            </g>
          ))}
        </svg>

        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[hsla(210,50%,18%,0.8)] text-[hsl(36,15%,48%)] text-xs">
          <Move size={11} /> Drag nodes to rearrange
        </div>
      </div>

      {/* Node list */}
      <div className="mt-4 flex flex-wrap gap-2">
        {nodes.map((n) => (
          <div
            key={n.id}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
            style={{
              backgroundColor: n.color + "18",
              color: n.color,
              borderColor: n.color + "40",
            }}
          >
            {n.label}
            <button
              onClick={() => deleteNode(n.id)}
              className="opacity-60 hover:opacity-100 ml-1"
            >
              <Trash2 size={10} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MindMapPage;
