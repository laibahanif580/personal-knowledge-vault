import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { mockNotes } from "@/lib/mock-data";
import { ZoomIn, ZoomOut, Maximize2, Plus, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/app/mindmap")({
  head: () => ({ meta: [{ title: "Mind Map — Vault" }] }),
  component: MindMap,
});

type Node = { id: string; title: string; x: number; y: number; color: string; size: number };

const colors = ["primary", "neon-blue", "neon-purple", "neon-pink", "neon-green"];

const initialNodes: Node[] = mockNotes.map((n, i) => {
  const angle = (i / mockNotes.length) * Math.PI * 2;
  const ring = 1 + (i % 3) * 0.4;
  return {
    id: n.id,
    title: n.title,
    x: 50 + Math.cos(angle) * 28 * ring * 0.7,
    y: 50 + Math.sin(angle) * 28 * ring * 0.7,
    color: colors[i % colors.length],
    size: 16 + (n.linked.length * 6),
  };
});

const edges = mockNotes.flatMap(n => n.linked.map(l => ({ from: n.id, to: l })));

function MindMap() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [zoom, setZoom] = useState(1);
  const [hover, setHover] = useState<string | null>(null);
  const draggingRef = useRef<{ id: string; startX: number; startY: number; nx: number; ny: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent, n: Node) => {
    e.preventDefault();
    draggingRef.current = { id: n.id, startX: e.clientX, startY: e.clientY, nx: n.x, ny: n.y };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const d = draggingRef.current;
    if (!d || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const dx = ((e.clientX - d.startX) / rect.width) * 100 / zoom;
    const dy = ((e.clientY - d.startY) / rect.height) * 100 / zoom;
    setNodes(prev => prev.map(n => n.id === d.id ? { ...n, x: d.nx + dx, y: d.ny + dy } : n));
  };
  const onMouseUp = () => { draggingRef.current = null; };

  const nodeById = (id: string) => nodes.find(n => n.id === id);

  return (
    <AppShell title="Mind Map" subtitle={`${nodes.length} nodes · ${edges.length} connections`}>
      <div className="relative h-[calc(100vh-3.5rem)] overflow-hidden bg-background">
        <div
          ref={canvasRef}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          className="absolute inset-0 grid-bg cursor-grab active:cursor-grabbing"
          style={{ animation: "grid-move 60s linear infinite" }}
        >
          <div className="absolute inset-0" style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}>
            {/* Edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.72 0.18 240)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="oklch(0.68 0.22 295)" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              {edges.map((e, i) => {
                const a = nodeById(e.from); const b = nodeById(e.to);
                if (!a || !b) return null;
                const active = hover && (hover === e.from || hover === e.to);
                return (
                  <line key={i} x1={`${a.x}%`} y1={`${a.y}%`} x2={`${b.x}%`} y2={`${b.y}%`}
                    stroke="url(#edge)" strokeWidth={active ? 2 : 1} strokeOpacity={active ? 1 : 0.5}
                    style={{ filter: active ? "drop-shadow(0 0 6px oklch(0.68 0.20 280))" : "none" }} />
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map(n => {
              const h = hover === n.id;
              return (
                <div
                  key={n.id}
                  onMouseDown={(e) => onMouseDown(e, n)}
                  onMouseEnter={() => setHover(n.id)}
                  onMouseLeave={() => setHover(null)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 select-none cursor-grab active:cursor-grabbing group"
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <div
                    className="rounded-full transition-transform group-hover:scale-110"
                    style={{
                      width: n.size, height: n.size,
                      background: `var(--${n.color})`,
                      boxShadow: `0 0 ${h ? 30 : 15}px var(--${n.color}), 0 0 ${h ? 60 : 30}px color-mix(in oklch, var(--${n.color}) 50%, transparent)`,
                    }}
                  />
                  <div className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[11px] px-2 py-1 rounded-md glass transition-opacity ${h ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                    {n.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button onClick={() => setZoom(z => Math.min(z + 0.2, 2))} className="h-10 w-10 grid place-items-center rounded-xl glass hover:border-primary/40 transition"><ZoomIn className="h-4 w-4" /></button>
          <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="h-10 w-10 grid place-items-center rounded-xl glass hover:border-primary/40 transition"><ZoomOut className="h-4 w-4" /></button>
          <button onClick={() => { setZoom(1); setNodes(initialNodes); }} className="h-10 w-10 grid place-items-center rounded-xl glass hover:border-primary/40 transition"><RotateCcw className="h-4 w-4" /></button>
          <button className="h-10 w-10 grid place-items-center rounded-xl glass hover:border-primary/40 transition"><Maximize2 className="h-4 w-4" /></button>
        </div>

        <div className="absolute top-4 left-4 rounded-xl glass px-4 py-3 max-w-xs">
          <div className="text-xs font-semibold gradient-text mb-1">Knowledge Graph</div>
          <div className="text-[11px] text-muted-foreground leading-relaxed">Drag nodes to rearrange. Hover to highlight connections.</div>
        </div>

        <button className="absolute bottom-6 right-6 inline-flex items-center gap-2 px-4 h-11 rounded-xl gradient-bg text-white text-sm font-medium glow hover:opacity-90 transition">
          <Plus className="h-4 w-4" /> Add node
        </button>
      </div>
    </AppShell>
  );
}
