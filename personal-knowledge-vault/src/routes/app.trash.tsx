import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { mockTrash } from "@/lib/mock-data";
import { RotateCcw, Trash2, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/app/trash")({
  head: () => ({ meta: [{ title: "Trash — Vault" }] }),
  component: Trash,
});

function Trash() {
  return (
    <AppShell title="Trash" subtitle="Notes auto-purge after 30 days">
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="rounded-xl glass p-4 mb-6 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-neon-pink shrink-0" />
          <div className="text-sm">
            <span className="font-medium">{mockTrash.length} deleted notes</span>
            <span className="text-muted-foreground"> · Restore or delete forever before they're gone.</span>
          </div>
          <button className="ml-auto text-xs px-3 py-1.5 rounded-lg bg-destructive/15 text-destructive border border-destructive/30 hover:bg-destructive/25 transition">Empty trash</button>
        </div>
        <div className="rounded-2xl bg-card border border-border divide-y divide-border overflow-hidden">
          {mockTrash.map(n => (
            <div key={n.id} className="p-4 flex items-center justify-between gap-4 hover:bg-accent/20 transition">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm line-through decoration-muted-foreground/40">{n.title}</div>
                <div className="text-xs text-muted-foreground truncate">{n.preview}</div>
                <div className="text-[11px] text-muted-foreground/70 mt-1">{n.updatedAt}</div>
              </div>
              <div className="flex gap-2">
                <button className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-neon-green/10 text-neon-green border border-neon-green/30 hover:bg-neon-green/20 transition" style={{ boxShadow: "0 0 14px color-mix(in oklch, var(--neon-green) 25%, transparent)" }}>
                  <RotateCcw className="h-3.5 w-3.5" /> Restore
                </button>
                <button className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive/20 transition" style={{ boxShadow: "0 0 14px color-mix(in oklch, var(--destructive) 25%, transparent)" }}>
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
