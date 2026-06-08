import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { ArrowLeft, Camera, Save } from "lucide-react";

export const Route = createFileRoute("/app/profile/edit")({
  head: () => ({ meta: [{ title: "Edit Profile — Vault" }] }),
  component: EditProfile,
});

function EditProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "Alex Stone",
    email: "alex@vault.app",
    bio: "Researcher · Writer · Note-taker since 2023",
    role: "Researcher",
    location: "Berlin, DE",
    website: "https://vault.app/alex",
  });
  const [saved, setSaved] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => navigate({ to: "/app/profile" }), 800);
  };

  return (
    <AppShell title="Edit Profile" subtitle="Update your public details">
      <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
        <Link to="/app/profile" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-4 transition">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to profile
        </Link>

        <form onSubmit={onSave} className="rounded-2xl bg-card border border-border p-5 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="relative mx-auto sm:mx-0">
              <div className="h-20 w-20 rounded-full gradient-bg grid place-items-center text-xl font-bold text-white ring-4 ring-primary/30">AS</div>
              <button type="button" className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-surface border border-border hover:border-primary/40 transition">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-sm font-semibold">Profile photo</div>
              <div className="text-xs text-muted-foreground mt-1">PNG or JPG, square, max 2MB</div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full name"><input value={form.name} onChange={update("name")} className={inputCls} /></Field>
            <Field label="Email"><input type="email" value={form.email} onChange={update("email")} className={inputCls} /></Field>
            <Field label="Role"><input value={form.role} onChange={update("role")} className={inputCls} /></Field>
            <Field label="Location"><input value={form.location} onChange={update("location")} className={inputCls} /></Field>
            <Field label="Website" className="sm:col-span-2"><input value={form.website} onChange={update("website")} className={inputCls} /></Field>
            <Field label="Bio" className="sm:col-span-2">
              <textarea value={form.bio} onChange={update("bio")} rows={3} className={`${inputCls} resize-none`} />
            </Field>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-2 border-t border-border">
            <Link to="/app/profile" className="h-10 px-4 grid place-items-center rounded-xl bg-surface border border-border text-sm hover:border-primary/40 transition">Cancel</Link>
            <button type="submit" className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl gradient-bg text-white text-sm font-medium glow-sm hover:opacity-90 transition">
              <Save className="h-4 w-4" /> {saved ? "Saved!" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}

const inputCls = "w-full h-10 px-3 rounded-xl bg-surface border border-border text-sm focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition";

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}
