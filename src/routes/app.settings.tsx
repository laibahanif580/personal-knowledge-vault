import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Moon, Sun, Type, Layout, Zap, Bell, Lock, Download } from "lucide-react";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — Vault" }] }),
  component: Settings,
});

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.classList.toggle("light", !dark);
  try { localStorage.setItem("vault-theme", dark ? "dark" : "light"); } catch {}
}

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={`relative h-6 w-11 rounded-full transition ${on ? "gradient-bg glow-sm" : "bg-surface border border-border"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[1.4rem]" : "left-0.5"}`} />
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-6">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Row({ icon: Icon, label, desc, right }: { icon: any; label: string; desc?: string; right: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary border border-primary/20"><Icon className="h-4 w-4" /></div>
        <div>
          <div className="text-sm font-medium">{label}</div>
          {desc && <div className="text-xs text-muted-foreground">{desc}</div>}
        </div>
      </div>
      {right}
    </div>
  );
}

function Settings() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return true;
    return (localStorage.getItem("vault-theme") ?? "dark") !== "light";
  });
  const [anim, setAnim] = useState(true);
  const [notif, setNotif] = useState(true);
  const [font, setFont] = useState("md");
  const [density, setDensity] = useState("comfy");

  useEffect(() => { applyTheme(dark); }, [dark]);

  return (
    <AppShell title="Settings" subtitle="Tune your vault to fit your mind">
      <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-5">
        <Section title="Appearance">
          <Row icon={dark ? Moon : Sun} label="Theme" desc="Dark theme is always recommended" right={
            <div className="flex gap-1 rounded-lg bg-surface border border-border p-1">
              <button onClick={() => setDark(true)} className={`text-xs px-3 py-1 rounded ${dark?"gradient-bg text-white":"text-muted-foreground"}`}>Dark</button>
              <button onClick={() => setDark(false)} className={`text-xs px-3 py-1 rounded ${!dark?"bg-foreground text-background":"text-muted-foreground"}`}>Light</button>
            </div>
          } />
          <Row icon={Type} label="Font size" desc="Reading comfort" right={
            <div className="flex gap-1 rounded-lg bg-surface border border-border p-1">
              {["sm","md","lg"].map(s => (
                <button key={s} onClick={() => setFont(s)} className={`text-xs px-3 py-1 rounded ${font===s?"gradient-bg text-white":"text-muted-foreground"}`}>{s.toUpperCase()}</button>
              ))}
            </div>
          } />
          <Row icon={Layout} label="Layout density" desc="Spacing between items" right={
            <div className="flex gap-1 rounded-lg bg-surface border border-border p-1">
              {["compact","comfy","spacious"].map(s => (
                <button key={s} onClick={() => setDensity(s)} className={`text-xs px-3 py-1 rounded capitalize ${density===s?"gradient-bg text-white":"text-muted-foreground"}`}>{s}</button>
              ))}
            </div>
          } />
          <Row icon={Zap} label="Animations" desc="Glow and motion effects" right={<Toggle on={anim} onChange={() => setAnim(!anim)} />} />
        </Section>

        <Section title="Notifications">
          <Row icon={Bell} label="Daily review reminder" desc="Nudge me at 9pm" right={<Toggle on={notif} onChange={() => setNotif(!notif)} />} />
        </Section>

        <Section title="Data">
          <Row icon={Lock} label="End-to-end encryption" desc="Your notes are private by default" right={<span className="text-xs text-neon-green font-medium">Active</span>} />
          <Row icon={Download} label="Export vault" desc="Download all notes as Markdown" right={
            <button className="text-xs px-3 py-1.5 rounded-lg bg-surface border border-border hover:border-primary/40 transition">Export</button>
          } />
        </Section>
      </div>
    </AppShell>
  );
}
