import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { NoteCard } from "@/components/note-card";
import { mockNotes } from "@/lib/mock-data";
import { Star, ArrowDownUp } from "lucide-react";

export const Route = createFileRoute("/app/favorites")({
  head: () => ({ meta: [{ title: "Favorites — Vault" }] }),
  component: Favorites,
});

function Favorites() {
  const [sort, setSort] = useState<"recent" | "az">("recent");
  const favs = mockNotes.filter(n => n.favorite);
  const sorted = [...favs].sort((a, b) => sort === "az" ? a.title.localeCompare(b.title) : 0);
  return (
    <AppShell title="Favorites" subtitle={`${favs.length} starred notes`}>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 text-neon-pink fill-current" />
            <span className="text-muted-foreground">Your starred ideas glow brightest</span>
          </div>
          <div className="flex items-center gap-1 rounded-xl bg-surface border border-border p-1">
            <ArrowDownUp className="h-4 w-4 text-muted-foreground mx-2" />
            {(["recent","az"] as const).map(s => (
              <button key={s} onClick={() => setSort(s)} className={`text-xs px-3 py-1.5 rounded-lg transition ${sort===s?"bg-primary/15 text-foreground":"text-muted-foreground hover:text-foreground"}`}>
                {s === "recent" ? "Recent" : "A–Z"}
              </button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map(n => <NoteCard key={n.id} note={n} />)}
        </div>
      </div>
    </AppShell>
  );
}
