import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { mockNotes } from "@/lib/mock-data";
import { Star, Edit3, Share2, MoreHorizontal, Network, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/app/notes/$id")({
  head: () => ({ meta: [{ title: "Note — Vault" }] }),
  component: NoteDetail,
});

function NoteDetail() {
  const { id } = useParams({ from: "/app/notes/$id" });
  const note = mockNotes.find(n => n.id === id) ?? mockNotes[0];
  const linked = note.linked.map(lid => mockNotes.find(n => n.id === lid)).filter(Boolean) as typeof mockNotes;

  return (
    <AppShell title={note.title} subtitle={`Last edited ${note.updatedAt}`}>
      <div className="p-6 lg:p-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/app/notes" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition"><ArrowLeft className="h-3.5 w-3.5" /> Back to notes</Link>
          <div className="flex items-center gap-2">
            <button className="h-9 w-9 grid place-items-center rounded-lg bg-surface border border-border text-muted-foreground hover:text-neon-pink hover:border-neon-pink/40 transition"><Star className={`h-4 w-4 ${note.favorite ? "fill-neon-pink text-neon-pink" : ""}`} /></button>
            <button className="h-9 w-9 grid place-items-center rounded-lg bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition"><Edit3 className="h-4 w-4" /></button>
            <button className="h-9 w-9 grid place-items-center rounded-lg bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition"><Share2 className="h-4 w-4" /></button>
            <button className="h-9 w-9 grid place-items-center rounded-lg bg-surface border border-border text-muted-foreground hover:text-foreground transition"><MoreHorizontal className="h-4 w-4" /></button>
          </div>
        </div>

        <article className="rounded-2xl glass p-8 lg:p-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {note.tags.map(t => (
              <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">#{t}</span>
            ))}
          </div>
          <h1 className="text-4xl font-bold tracking-tight leading-tight">{note.title}</h1>
          <p className="mt-3 text-base text-muted-foreground italic border-l-2 border-primary/60 pl-4">{note.preview}</p>

          <div className="mt-8 prose-invert text-foreground/90 leading-relaxed space-y-5 max-w-none">
            <p>{note.content}</p>
            <p>
              The most powerful insights come from <mark className="bg-primary/20 text-foreground px-1 rounded">unexpected adjacencies</mark> — two notes that had no business being neighbors suddenly clicking into a third idea you'd never have reached alone.
            </p>
            <blockquote className="border-l-2 border-neon-blue/60 pl-4 italic text-muted-foreground">
              "We are what we repeatedly capture. Excellence, then, is not an act but a habit of noticing." — paraphrased
            </blockquote>
            <p>
              Treat this vault as a garden. Prune. Re-link. Re-read old notes with fresh eyes — they will surprise you.
            </p>
          </div>
        </article>

        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><Network className="h-4 w-4 text-primary" /> Linked notes</h3>
            <span className="text-xs text-muted-foreground">{linked.length} connections</span>
          </div>
          {linked.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {linked.map(l => (
                <Link key={l.id} to="/app/notes/$id" params={{ id: l.id }} className="group rounded-xl bg-card border border-border p-4 card-hover hover:border-primary/40 hover:-translate-y-0.5">
                  <div className="text-xs text-primary mb-1">→ Linked</div>
                  <div className="font-medium text-sm">{l.title}</div>
                  <div className="text-xs text-muted-foreground line-clamp-2 mt-1">{l.preview}</div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-sm text-muted-foreground rounded-xl border border-dashed border-border">No linked notes yet.</div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
