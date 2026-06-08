import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { mockStats, mockActivity } from "@/lib/mock-data";
import { Mail, Calendar, Award, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/app/profile")({
  head: () => ({ meta: [{ title: "Profile — Vault" }] }),
  component: Profile,
});

function Profile() {
  return (
    <AppShell title="Profile" subtitle="Your knowledge journey">
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div className="rounded-2xl glass p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full gradient-bg opacity-20 blur-3xl" />
          <div className="relative flex flex-wrap items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full gradient-bg grid place-items-center text-2xl font-bold text-white ring-4 ring-primary/30 animate-glow-pulse">AS</div>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold">Alex Stone</h2>
              <p className="text-sm text-muted-foreground mt-1">Researcher · Writer · Note-taker since 2023</p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> alex@vault.app</span>
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Joined March 2023</span>
              </div>
            </div>
            <Link to="/app/profile/edit" className="px-4 h-10 grid place-items-center rounded-xl gradient-bg text-white text-sm font-medium glow-sm hover:opacity-90 transition w-full sm:w-auto">Edit profile</Link>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Notes written", value: mockStats.totalNotes, icon: Award },
            { label: "Connections", value: mockStats.connections, icon: TrendingUp },
            { label: "Day streak", value: 42, icon: Calendar },
            { label: "Tags created", value: mockStats.totalTags, icon: Award },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-card border border-border p-5 card-hover hover:border-primary/40 hover:-translate-y-0.5">
              <s.icon className="h-5 w-5 text-primary" />
              <div className="mt-3 text-3xl font-bold gradient-text">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-card border border-border p-6">
            <h3 className="font-semibold mb-4">Recent activity</h3>
            <div className="space-y-3">
              {mockActivity.slice(0, 5).map(a => (
                <div key={a.id} className="flex items-start gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary glow-sm mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate"><span className="text-muted-foreground capitalize">{a.type}</span> · {a.noteTitle}</div>
                    <div className="text-[11px] text-muted-foreground">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-card border border-border p-6">
            <h3 className="font-semibold mb-4">This week</h3>
            <div className="flex items-end gap-2 h-32">
              {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full rounded-t-md gradient-bg opacity-80 transition-all hover:opacity-100" style={{ height: `${h}%` }} />
                  <span className="text-[10px] text-muted-foreground">{["M","T","W","T","F","S","S"][i]}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-muted-foreground">12 notes this week · <span className="text-neon-green">+20%</span> vs last week</div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
