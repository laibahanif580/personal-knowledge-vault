import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, Brain, Network, Search, Star, Zap, Lock, FileText, Tags } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vault — Your Personal Second Brain" },
      { name: "description", content: "Capture, connect and visualize ideas in a beautiful dark knowledge vault." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Nav */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg gradient-bg glow-sm">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">Vault</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#showcase" className="hover:text-foreground transition">Showcase</a>
            <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground transition">Sign in</Link>
            <Link to="/app/dashboard" className="text-sm px-4 py-2 rounded-lg gradient-bg text-white font-medium hover:opacity-90 transition glow-sm">Open App</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 pt-24 pb-32">
        <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted-foreground mb-6 animate-fade-in">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-green animate-pulse" />
            Now in public beta — v1.0
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] animate-fade-in">
            Your ideas, <span className="gradient-text">connected</span><br />in a single dark vault.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            A premium second brain for thinkers. Capture notes, link concepts, and watch your knowledge graph come alive.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-in">
            <Link to="/app/dashboard" className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-medium glow hover:scale-[1.02] transition">
              Get Started <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
            </Link>
            <Link to="/app/mindmap" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-foreground font-medium hover:border-primary/40 transition">
              View Demo
            </Link>
          </div>
          <div className="mt-6 text-xs text-muted-foreground">No credit card · Free forever tier</div>
        </div>

        {/* App preview mock */}
        <div className="relative max-w-6xl mx-auto mt-20 animate-fade-in">
          <div className="absolute -inset-4 gradient-bg opacity-20 blur-3xl rounded-3xl" />
          <div className="relative rounded-2xl glass overflow-hidden border border-border shadow-2xl">
            <div className="flex h-9 items-center gap-1.5 px-4 border-b border-border bg-surface">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-neon-blue/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-neon-green/60" />
              <span className="ml-3 text-[11px] text-muted-foreground">vault.app/dashboard</span>
            </div>
            <div className="grid grid-cols-12 min-h-[420px]">
              <aside className="col-span-3 border-r border-border p-4 space-y-2 bg-sidebar">
                {["Dashboard","Notes","Mind Map","Tags","Favorites"].map((s, i) => (
                  <div key={s} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs ${i===0?"bg-primary/20 text-foreground":"text-muted-foreground"}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {s}
                  </div>
                ))}
              </aside>
              <div className="col-span-9 p-6 grid-bg">
                <div className="grid grid-cols-4 gap-3">
                  {["48 Notes","12 Tags","87 Links","Today"].map((t, i) => (
                    <div key={i} className="rounded-xl glass p-3">
                      <div className="text-[10px] text-muted-foreground">{t.split(" ")[1] ?? "Stats"}</div>
                      <div className="text-lg font-semibold mt-1 gradient-text">{t.split(" ")[0]}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="rounded-xl bg-card border border-border p-3 animate-float" style={{animationDelay: `${i*0.3}s`}}>
                      <div className="h-2 w-2/3 rounded bg-muted" />
                      <div className="mt-2 h-1.5 w-full rounded bg-muted/50" />
                      <div className="mt-1 h-1.5 w-4/5 rounded bg-muted/50" />
                      <div className="mt-3 flex gap-1">
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">#idea</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-neon-blue/10 text-neon-blue">#ml</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-widest text-primary mb-3">Features</div>
            <h2 className="text-4xl font-bold tracking-tight">Built for deep thinking</h2>
            <p className="mt-4 text-muted-foreground">Every detail tuned for focus, every interaction designed to feel alive.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Brain, title: "Atomic Notes", desc: "One idea per note. Compose them into emergent structures." },
              { icon: Network, title: "Mind Map", desc: "See your knowledge as a living, glowing graph." },
              { icon: Search, title: "Instant Search", desc: "Find anything across notes, tags and links in milliseconds." },
              { icon: Tags, title: "Smart Tags", desc: "Color-coded taxonomy that scales with your library." },
              { icon: Zap, title: "Lightning Fast", desc: "Local-first storage. Zero lag, anywhere." },
              { icon: Lock, title: "Yours Forever", desc: "End-to-end encrypted. Export anytime, no lock-in." },
            ].map((f) => (
              <div key={f.title} className="group rounded-2xl bg-card border border-border p-6 card-hover hover:border-primary/40 hover:-translate-y-1">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:glow-sm transition">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section id="showcase" className="px-6 py-24 border-t border-border">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary mb-3">Mind Map</div>
            <h2 className="text-4xl font-bold tracking-tight">A graph of your<br />own mind.</h2>
            <p className="mt-4 text-muted-foreground">Notes become glowing nodes. Connections become neon arcs. Zoom out and watch patterns emerge from years of thinking.</p>
            <Link to="/app/mindmap" className="mt-6 inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all">
              Try the mind map <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative h-80 rounded-2xl glass overflow-hidden grid-bg">
            {[
              {x:50, y:50, size:14, c:"primary"},
              {x:20, y:30, size:8, c:"neon-blue"},
              {x:75, y:25, size:10, c:"neon-pink"},
              {x:80, y:70, size:9, c:"neon-green"},
              {x:25, y:75, size:11, c:"neon-purple"},
            ].map((n, i) => (
              <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full animate-glow-pulse"
                style={{ left:`${n.x}%`, top:`${n.y}%`, width:n.size*3, height:n.size*3, background:`var(--${n.c})`, animationDelay:`${i*0.4}s` }} />
            ))}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <line x1="50%" y1="50%" x2="20%" y2="30%" stroke="url(#g)" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="url(#g)" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="80%" y2="70%" stroke="url(#g)" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="url(#g)" strokeWidth="1" />
              <defs><linearGradient id="g"><stop offset="0%" stopColor="oklch(0.72 0.18 240)"/><stop offset="100%" stopColor="oklch(0.68 0.22 295)"/></linearGradient></defs>
            </svg>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="px-6 py-24 border-t border-border">
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="absolute inset-0 gradient-bg opacity-20 blur-3xl rounded-full" />
          <div className="relative">
            <h2 className="text-5xl font-bold tracking-tight">Start building your<br /><span className="gradient-text">second brain</span> today.</h2>
            <p className="mt-4 text-muted-foreground">Free forever. Pro at $8/mo when you need more.</p>
            <Link to="/app/dashboard" className="mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-xl gradient-bg text-white font-medium glow hover:scale-[1.02] transition">
              Open the Vault <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary" /> Vault © 2026</div>
          <div className="flex gap-6"><a href="#" className="hover:text-foreground">Privacy</a><a href="#" className="hover:text-foreground">Terms</a><a href="#" className="hover:text-foreground">Twitter</a></div>
        </div>
      </footer>
    </div>
  );
}
