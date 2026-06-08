import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { mockNotes, mockTags } from "@/lib/mock-data";
import { Search, FileText, Tags, Network } from "lucide-react";

export const Route = createFileRoute("/app/search")({
  head: () => ({ meta: [{ title: "Search — Vault" }] }),
  component: SearchPage,
});

function highlight(text: string, q: string) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return <>
    {text.slice(0, i)}
    <mark className="bg-primary/30 text-foreground rounded px-0.5">{text.slice(i, i + q.length)}</mark>
    {text.slice(i + q.length)}
  </>;
}

function SearchPage() {
  const [q, setQ] = useState("note");

  const notes = q ? mockNotes.filter(n => n.title.toLowerCase().includes(q.toLowerCase()) || n.preview.toLowerCase().includes(q.toLowerCase())) : [];
  const tags = q ? mockTags.filter(t => t.name.toLowerCase().includes(q.toLowerCase())) : [];
  const connections = q ? mockNotes.flatMap(n => n.linked.map(l => ({ from: n, to: mockNotes.find(m => m.id === l)! }))).filter(c => c.to && (c.from.title.toLowerCase().includes(q.toLowerCase()) || c.to.title.toLowerCase().includes(q.toLowerCase()))) : [];

  return (
    <AppShell title="Search" subtitle="Find anything across your vault">
      <div className="p-6 lg:p-10 max-w-4xl mx-auto">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            autoFocus value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search notes, tags, connections…"
            className="w-full h-16 pl-14 pr-5 rounded-2xl glass text-lg placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 transition glow-sm"
          />
        </div>

        <div className="mt-8 space-y-8">
          {/* Notes */}
          <section>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-3">
              <FileText className="h-3.5 w-3.5" /> Notes <span className="text-primary">({notes.length})</span>
            </div>
            <div className="rounded-2xl bg-card border border-border divide-y divide-border">
              {notes.map(n => (
                <Link key={n.id} to="/app/notes/$id" params={{ id: n.id }} className="block p-4 hover:bg-accent/30 transition">
                  <div className="font-medium text-sm">{highlight(n.title, q)}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{highlight(n.preview, q)}</div>
                </Link>
              ))}
              {notes.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">No notes found.</div>}
            </div>
          </section>

          {/* Tags */}
          <section>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-3">
              <Tags className="h-3.5 w-3.5" /> Tags <span className="text-primary">({tags.length})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.length === 0 && <div className="text-sm text-muted-foreground">No tags found.</div>}
              {tags.map(t => (
                <span key={t.id} className="text-xs px-3 py-1.5 rounded-full" style={{ background: `color-mix(in oklch, var(--${t.color}) 15%, transparent)`, color: `var(--${t.color})`, border: `1px solid color-mix(in oklch, var(--${t.color}) 30%, transparent)` }}>
                  #{highlight(t.name, q)} <span className="opacity-60">· {t.count}</span>
                </span>
              ))}
            </div>
          </section>

          {/* Connections */}
          <section>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-3">
              <Network className="h-3.5 w-3.5" /> Connections <span className="text-primary">({connections.length})</span>
            </div>
            <div className="rounded-2xl bg-card border border-border divide-y divide-border">
              {connections.slice(0, 6).map((c, i) => (
                <div key={i} className="p-4 flex items-center gap-3 text-sm">
                  <span>{highlight(c.from.title, q)}</span>
                  <span className="text-primary">→</span>
                  <span>{highlight(c.to.title, q)}</span>
                </div>
              ))}
              {connections.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">No connections found.</div>}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
