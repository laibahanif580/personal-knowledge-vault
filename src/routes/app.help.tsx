import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { FilePlus, Tag, Link2, Network, ArrowRight, BookOpen, Keyboard } from "lucide-react";

export const Route = createFileRoute("/app/help")({
  head: () => ({ meta: [{ title: "Help — Vault" }] }),
  component: Help,
});

const steps = [
  { icon: FilePlus, title: "Create your first note", desc: "Hit ⌘N or open the New Note page. Don't overthink it — just capture.", color: "neon-blue" },
  { icon: Tag, title: "Add tags", desc: "Use 2–4 lowercase tags per note. They group ideas without forcing a folder.", color: "neon-purple" },
  { icon: Link2, title: "Connect ideas", desc: "Reference other notes inside your writing. Connections compound over time.", color: "neon-pink" },
  { icon: Network, title: "Explore the Mind Map", desc: "Open the graph view to see clusters, gaps and bridges between ideas.", color: "neon-green" },
];

function Help() {
  return (
    <AppShell title="Help & Onboarding" subtitle="Four steps to a thriving second brain">
      <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-10">
        <div className="rounded-2xl glass p-8 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative">
            <div className="text-xs uppercase tracking-widest text-primary">Getting started</div>
            <h2 className="text-3xl font-bold mt-2">Welcome to Vault.<br /><span className="gradient-text">Let's build your brain.</span></h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-xl">A second brain isn't software — it's a practice. These four habits compound into something remarkable.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {steps.map((s, i) => (
            <div key={s.title} className="group rounded-2xl bg-card border border-border p-6 card-hover hover:-translate-y-0.5 hover:border-primary/40 relative overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="absolute top-4 right-4 text-5xl font-bold text-muted/30 group-hover:text-primary/20 transition">{String(i + 1).padStart(2, "0")}</div>
              <div className="grid h-12 w-12 place-items-center rounded-xl border" style={{ background: `color-mix(in oklch, var(--${s.color}) 15%, transparent)`, borderColor: `color-mix(in oklch, var(--${s.color}) 30%, transparent)`, color: `var(--${s.color})`, boxShadow: `0 0 18px color-mix(in oklch, var(--${s.color}) 30%, transparent)` }}>
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-card border border-border p-6">
            <div className="flex items-center gap-2 font-semibold mb-4"><Keyboard className="h-4 w-4 text-primary" /> Shortcuts</div>
            <div className="space-y-2 text-sm">
              {[
                ["New note", "⌘ N"],
                ["Search", "⌘ K"],
                ["Mind map", "⌘ M"],
                ["Favorites", "⌘ F"],
                ["Toggle sidebar", "⌘ \\"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-1.5">
                  <span className="text-muted-foreground">{k}</span>
                  <kbd className="text-[11px] px-2 py-0.5 rounded bg-muted border border-border">{v}</kbd>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-card border border-border p-6">
            <div className="flex items-center gap-2 font-semibold mb-4"><BookOpen className="h-4 w-4 text-primary" /> Resources</div>
            <div className="space-y-3">
              {[
                "Getting started guide",
                "Atomic note principles",
                "Mind map deep dive",
                "Keyboard mastery",
              ].map(r => (
                <a key={r} className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border hover:border-primary/40 transition cursor-pointer">
                  <span className="text-sm">{r}</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link to="/app/notes/new" className="inline-flex items-center gap-2 px-6 h-12 rounded-xl gradient-bg text-white font-medium glow hover:scale-[1.02] transition">
            Create your first note <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
