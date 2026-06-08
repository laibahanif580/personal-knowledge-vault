import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { NoteCard } from "@/components/note-card";
import { mockNotes, mockTags } from "@/lib/mock-data";
import { Search, Plus, SlidersHorizontal, LayoutGrid, List } from "lucide-react";

export const Route = createFileRoute("/app/notes/")({
  head: () => ({ meta: [{ title: "Notes — Vault" }] }),
  component: Notes,
});

function Notes() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilter, setShowFilter] = useState(false);
  const [favOnly, setFavOnly] = useState(false);
  const [sort, setSort] = useState<"recent" | "az" | "linked">("recent");

  const filtered = mockNotes
    .filter(n =>
      (!q || n.title.toLowerCase().includes(q.toLowerCase()) || n.preview.toLowerCase().includes(q.toLowerCase())) &&
      (!tag || n.tags.includes(tag)) &&
      (!favOnly || n.favorite)
    )
    .sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "linked") return b.linked.length - a.linked.length;
      return 0;
    });

  return (
    <AppShell title="Notes" subtitle={`${filtered.length} notes in your vault`}>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search notes…"
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface border border-border text-sm focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition"
            />
          </div>
          <div className="relative">
            <button onClick={() => setShowFilter(s => !s)} className={`inline-flex items-center gap-2 h-10 px-3 rounded-xl bg-surface border text-sm transition ${showFilter || favOnly || sort !== "recent" ? "border-primary/60 text-foreground" : "border-border hover:border-primary/40"}`}>
              <SlidersHorizontal className="h-4 w-4" /> Filter
              {(favOnly || sort !== "recent") && <span className="h-1.5 w-1.5 rounded-full bg-primary glow-sm" />}
            </button>
            {showFilter && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowFilter(false)} />
                <div className="absolute right-0 mt-2 w-64 z-40 rounded-xl bg-card border border-border shadow-2xl p-4 space-y-4 animate-fade-in">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Show</div>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" checked={favOnly} onChange={(e) => setFavOnly(e.target.checked)} className="accent-primary" />
                      Favorites only
                    </label>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Sort by</div>
                    <div className="space-y-1">
                      {([["recent","Recent"],["az","Title A–Z"],["linked","Most linked"]] as const).map(([k,l]) => (
                        <button key={k} onClick={() => setSort(k)} className={`w-full text-left text-sm px-2 py-1.5 rounded-lg transition ${sort===k ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-accent/40"}`}>{l}</button>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => { setFavOnly(false); setSort("recent"); }} className="w-full text-xs text-muted-foreground hover:text-foreground transition">Reset</button>
                </div>
              </>
            )}
          </div>
          <div className="flex rounded-xl bg-surface border border-border overflow-hidden">
            <button onClick={() => setView("grid")} className={`h-10 w-10 grid place-items-center ${view==="grid"?"text-primary bg-primary/10":"text-muted-foreground"}`}><LayoutGrid className="h-4 w-4" /></button>
            <button onClick={() => setView("list")} className={`h-10 w-10 grid place-items-center ${view==="list"?"text-primary bg-primary/10":"text-muted-foreground"}`}><List className="h-4 w-4" /></button>
          </div>
          <Link to="/app/notes/new" className="inline-flex items-center gap-2 h-10 px-4 rounded-xl gradient-bg text-white text-sm font-medium glow-sm hover:opacity-90 transition">
            <Plus className="h-4 w-4" /> New
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setTag(null)} className={`text-xs px-3 py-1.5 rounded-full border transition ${!tag ? "bg-primary/15 border-primary/40 text-foreground" : "bg-surface border-border text-muted-foreground hover:text-foreground"}`}>All</button>
          {mockTags.map(t => (
            <button key={t.id} onClick={() => setTag(t.name)} className={`text-xs px-3 py-1.5 rounded-full border transition ${tag===t.name ? "bg-primary/15 border-primary/40 text-foreground" : "bg-surface border-border text-muted-foreground hover:text-foreground"}`}>
              #{t.name} <span className="opacity-60 ml-1">{t.count}</span>
            </button>
          ))}
        </div>

        {view === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(n => <NoteCard key={n.id} note={n} />)}
          </div>
        ) : (
          <div className="rounded-2xl bg-card border border-border divide-y divide-border overflow-hidden">
            {filtered.map(n => (
              <Link key={n.id} to="/app/notes/$id" params={{ id: n.id }} className="flex items-center gap-4 p-4 hover:bg-accent/30 transition">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{n.title}</div>
                  <div className="text-xs text-muted-foreground truncate">{n.preview}</div>
                </div>
                <div className="flex gap-1">{n.tags.slice(0,2).map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">#{t}</span>)}</div>
                <div className="text-[11px] text-muted-foreground w-20 text-right">{n.updatedAt}</div>
              </Link>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm">No notes match your search.</div>
        )}
      </div>
    </AppShell>
  );
}
