import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { mockActivity } from "@/lib/mock-data";
import { FilePlus, Edit3, Link2, Tag, Star } from "lucide-react";

const iconMap = { created: FilePlus, edited: Edit3, linked: Link2, tagged: Tag, favorited: Star };
const colorMap = { created: "neon-green", edited: "neon-blue", linked: "neon-purple", tagged: "neon-pink", favorited: "neon-pink" };

export const Route = createFileRoute("/app/activity")({
  head: () => ({ meta: [{ title: "Activity — Vault" }] }),
  component: ActivityPage,
});

function ActivityPage() {
  return (
    <AppShell title="Activity" subtitle="A timeline of your thinking">
      <div className="p-6 lg:p-10 max-w-3xl mx-auto">
        <div className="relative pl-8">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-neon-blue/40 to-transparent" />
          {mockActivity.map((a, i) => {
            const Icon = iconMap[a.type];
            const c = colorMap[a.type];
            return (
              <div key={a.id} className="relative mb-6 animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="absolute -left-[1.65rem] top-1 grid h-6 w-6 place-items-center rounded-full border-2 border-background" style={{ background: `var(--${c})`, boxShadow: `0 0 14px var(--${c})` }}>
                  <Icon className="h-3 w-3 text-background" />
                </div>
                <div className="rounded-2xl bg-card border border-border p-4 hover:border-primary/40 transition card-hover">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-widest" style={{ color: `var(--${c})` }}>{a.type}</div>
                    <span className="text-[11px] text-muted-foreground">{a.time}</span>
                  </div>
                  <div className="mt-1.5 text-sm font-medium">{a.noteTitle}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
