import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Note } from "@/lib/mock-data";

export function NoteCard({ note }: { note: Note }) {
  return (
    <Link
      to="/app/notes/$id"
      params={{ id: note.id }}
      className="group relative block rounded-2xl border border-border bg-card p-5 card-hover hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-10px_oklch(0.68_0.20_280_/_0.35)] overflow-hidden"
    >
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-sm leading-snug line-clamp-2">{note.title}</h3>
        {note.favorite && <Star className="h-4 w-4 text-neon-pink shrink-0 fill-current" />}
      </div>
      <p className="mt-2 text-xs text-muted-foreground line-clamp-3 leading-relaxed">{note.preview}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {note.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">#{t}</span>
          ))}
        </div>
        <span className="text-[10px] text-muted-foreground">{note.updatedAt}</span>
      </div>
    </Link>
  );
}
