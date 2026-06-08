import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { NoteCard } from "@/components/note-card";
import { mockNotes, mockStats, mockActivity } from "@/lib/mock-data";
import { FileText, Tags, Network, Activity as ActIcon, Plus, ArrowUpRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Vault" }] }),
  component: Dashboard,
});

const stats = [
  { label: "Total Notes", value: mockStats.totalNotes, icon: FileText, color: "neon-blue", trend: "+12%" },
  { label: "Tags", value: mockStats.totalTags, icon: Tags, color: "neon-purple", trend: "+3" },
  { label: "Connections", value: mockStats.connections, icon: Network, color: "neon-pink", trend: "+8" },
  { label: "Activity", value: mockStats.activity, icon: ActIcon, color: "neon-green", trend: "Today" },
];

function Dashboard() {
  return (
    <AppShell title="Dashboard" subtitle="Welcome back, Alex">
      <div className="relative p-6 lg:p-8">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto space-y-8">
          {/* Hero greeting */}
          <div className="rounded-2xl glass p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs text-muted-foreground">Sunday, June 7</div>
              <h2 className="text-2xl font-bold mt-1">Good evening, <span className="gradient-text">Alex</span></h2>
              <p className="text-sm text-muted-foreground mt-1">You have 3 unfiled captures from today.</p>
            </div>
            <div className="flex gap-2">
              <Link to="/app/notes/new" className="inline-flex items-center gap-2 px-4 h-10 rounded-lg gradient-bg text-white text-sm font-medium glow-sm hover:opacity-90 transition">
                <Plus className="h-4 w-4" /> New Note
              </Link>
              <Link to="/app/mindmap" className="inline-flex items-center gap-2 px-4 h-10 rounded-lg bg-surface border border-border text-sm hover:border-primary/40 transition">
                <Network className="h-4 w-4" /> Mind Map
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="group rounded-2xl bg-card border border-border p-5 card-hover hover:border-primary/40 hover:-translate-y-0.5">
                <div className="flex items-start justify-between">
                  <div className={`grid h-10 w-10 place-items-center rounded-xl border`} style={{ backgroundColor: `var(--${s.color})`, opacity: 1, borderColor: "transparent" }}>
                    <s.icon className="h-5 w-5 text-background" />
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-green/10 text-neon-green border border-neon-green/20">{s.trend}</span>
                </div>
                <div className="mt-4 text-3xl font-bold tracking-tight">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent notes */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent notes</h3>
                <Link to="/app/notes" className="text-xs text-primary hover:underline inline-flex items-center gap-1">View all <ArrowUpRight className="h-3 w-3" /></Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {mockNotes.slice(0, 4).map(n => <NoteCard key={n.id} note={n} />)}
              </div>
            </div>

            {/* Activity */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Activity</h3>
                <Link to="/app/activity" className="text-xs text-primary hover:underline">All</Link>
              </div>
              <div className="rounded-2xl bg-card border border-border p-4 space-y-3">
                {mockActivity.slice(0, 6).map((a) => (
                  <div key={a.id} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-primary glow-sm shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-foreground/90 truncate">
                        <span className="text-muted-foreground capitalize">{a.type}</span> · {a.noteTitle}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl glass p-4">
                <div className="flex items-center gap-2 text-xs text-primary mb-2"><Sparkles className="h-3.5 w-3.5" /> Tip</div>
                <p className="text-sm">Try linking two unrelated notes — that's where the best ideas live.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
