import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — Vault" }] }),
  component: Auth,
});

function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Brand side */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden border-r border-border">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full gradient-bg opacity-30 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-neon-blue opacity-20 blur-3xl" />
        <Link to="/" className="relative flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg gradient-bg glow-sm">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold">Vault</span>
        </Link>
        <div className="relative max-w-md">
          <h2 className="text-4xl font-bold tracking-tight">Think deeper.<br /><span className="gradient-text">Remember everything.</span></h2>
          <p className="mt-4 text-muted-foreground">Join thousands of researchers, founders and writers building their second brain.</p>
          <div className="mt-8 flex items-center gap-3">
            {[1,2,3,4].map(i => <div key={i} className="h-9 w-9 rounded-full gradient-bg ring-2 ring-background -ml-2 first:ml-0" />)}
            <span className="ml-3 text-xs text-muted-foreground">12,400+ thinkers</span>
          </div>
        </div>
        <div className="relative text-xs text-muted-foreground">© 2026 Vault. Crafted with care.</div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg gradient-bg glow-sm"><Sparkles className="h-4 w-4 text-white" /></div>
              <span className="font-semibold">Vault</span>
            </Link>
          </div>
          <div className="rounded-2xl glass p-8 animate-fade-in">
            <div className="flex p-1 rounded-xl bg-surface mb-6 border border-border">
              {(["login","signup"] as const).map(m => (
                <button key={m} onClick={() => setMode(m)} className={`flex-1 text-sm py-2 rounded-lg transition ${mode===m ? "gradient-bg text-white glow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                  {m === "login" ? "Sign in" : "Sign up"}
                </button>
              ))}
            </div>
            <h1 className="text-2xl font-bold">{mode === "login" ? "Welcome back" : "Create your vault"}</h1>
            <p className="text-sm text-muted-foreground mt-1">{mode === "login" ? "Enter your credentials to continue." : "Start your knowledge journey today."}</p>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-2 h-10 rounded-lg bg-surface border border-border text-sm hover:border-primary/40 transition">
                <Chrome className="h-4 w-4" /> Google
              </button>
              <button className="flex items-center justify-center gap-2 h-10 rounded-lg bg-surface border border-border text-sm hover:border-primary/40 transition">
                <Github className="h-4 w-4" /> GitHub
              </button>
            </div>

            <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-widest text-muted-foreground">
              <div className="flex-1 h-px bg-border" /> or <div className="flex-1 h-px bg-border" />
            </div>

            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Field icon={Mail} type="email" placeholder="you@vault.app" label="Email" />
              <Field icon={Lock} type="password" placeholder="••••••••" label="Password" />
              {mode === "login" && (
                <div className="text-right">
                  <a className="text-xs text-primary hover:underline">Forgot password?</a>
                </div>
              )}
              <Link to="/app/dashboard" className="mt-2 group flex items-center justify-center gap-2 w-full h-11 rounded-lg gradient-bg text-white font-medium glow-sm hover:opacity-90 transition">
                {mode === "login" ? "Sign in" : "Create account"}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
              </Link>
            </form>
            <p className="mt-5 text-xs text-center text-muted-foreground">
              By continuing you agree to our <a className="text-foreground hover:underline">Terms</a> and <a className="text-foreground hover:underline">Privacy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, ...rest }: { icon: any; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="mt-1 relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input {...rest} className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface border border-border text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition" />
      </div>
    </label>
  );
}
