import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { mockTags, mockNotes } from "@/lib/mock-data";
import { Plus, X, Tags as TagsIcon } from "lucide-react";

export const Route = createFileRoute("/app/tags")({
  head: () => ({ meta: [{ title: "Tags — Vault" }] }),
  component: TagsPage,
});

function TagsPage() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const filtered = active ? mockNotes.filter(n => n.tags.includes(active)) : [];

  return (
    <AppShell title="Tags" subtitle={`${mockTags.length} tags organize ${mockNotes.length} notes`}>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">All tags</h2>
          <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 px-4 h-10 rounded-xl gradient-bg text-white text-sm font-medium glow-sm hover:opacity-90 transition">
            <Plus className="h-4 w-4" /> New tag
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockTags.map(t => {
            const isActive = active === t.name;
            return (
              <button key={t.id} onClick={() => setActive(isActive ? null : t.name)} className={`group text-left rounded-2xl bg-card border p-5 card-hover hover:-translate-y-0.5 ${isActive ? "border-primary/60 glow-sm" : "border-border hover:border-primary/40"}`}>
                <div className="flex items-center justify-between">
                  <div className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: `color-mix(in oklch, var(--${t.color}) 15%, transparent)`, color: `var(--${t.color})`, border: `1px solid color-mix(in oklch, var(--${t.color}) 30%, transparent)`, boxShadow: `0 0 12px color-mix(in oklch, var(--${t.color}) 30%, transparent)` }}>
                    #{t.name}
                  </div>
                  <TagsIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-5 text-3xl font-bold">{t.count}</div>
                <div className="text-xs text-muted-foreground mt-1">notes tagged</div>
              </button>
            );
          })}
        </div>

        {active && (
          <div className="mt-10">
            <h3 className="font-semibold mb-3">Notes tagged <span className="text-primary">#{active}</span></h3>
            <div className="rounded-2xl bg-card border border-border divide-y divide-border">
              {filtered.map(n => (
                <div key={n.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-medium text-sm">{n.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{n.preview}</div>
                  </div>
                  <span className="text-[11px] text-muted-foreground">{n.updatedAt}</span>
                </div>
              ))}
              {filtered.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">No notes with this tag.</div>}
            </div>
          </div>
        )}
      </div>

      {open && (
        <div onClick={() => setOpen(false)} className="fixed inset-0 z-50 grid place-items-center bg-background/70 backdrop-blur-md p-4 animate-fade-in">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl glass p-6 relative">
            <button onClick={() => setOpen(false)} className="absolute right-3 top-3 h-8 w-8 grid place-items-center rounded-lg text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
            <h3 className="text-lg font-semibold">Create new tag</h3>
            <p className="text-sm text-muted-foreground mt-1">Tags help organize and connect related notes.</p>
            <div className="mt-5 space-y-3">
              <input placeholder="Tag name…" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition" />
              <div>
                <div className="text-xs text-muted-foreground mb-2">Color</div>
                <div className="flex gap-2">
                  {["neon-blue","neon-purple","neon-pink","neon-green"].map(c => (
                    <button key={c} className="h-9 w-9 rounded-lg" style={{ background: `var(--${c})`, boxShadow: `0 0 14px var(--${c})` }} />
                  ))}
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="w-full h-10 rounded-lg gradient-bg text-white text-sm font-medium glow-sm hover:opacity-90 transition">Create tag</button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
