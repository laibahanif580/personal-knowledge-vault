import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { mockTags } from "@/lib/mock-data";
import { Bold, Italic, List, ListOrdered, Quote, Code, Link as LinkIcon, Image as ImageIcon, Save, Check, X, Heading1, Heading2, Underline as UnderlineIcon } from "lucide-react";

export const Route = createFileRoute("/app/notes/new")({
  head: () => ({ meta: [{ title: "New Note — Vault" }] }),
  component: NewNote,
});

function NewNote() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>(["ideas"]);
  const [stats, setStats] = useState({ chars: 0, words: 0 });
  const editorRef = useRef<HTMLDivElement>(null);

  const toggle = (t: string) =>
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const updateStats = () => {
    const text = editorRef.current?.innerText ?? "";
    setStats({
      chars: text.length,
      words: text.trim().split(/\s+/).filter(Boolean).length,
    });
  };

  useEffect(() => {
    updateStats();
  }, []);

  const exec = (command: string, value?: string) => {
    editorRef.current?.focus();
    // execCommand is deprecated but still the simplest cross-browser way
    // to power a lightweight rich-text editor in a frontend-only demo.
    document.execCommand(command, false, value);
    updateStats();
  };

  const insertLink = () => {
    const url = window.prompt("Enter URL");
    if (url) exec("createLink", url);
  };

  const insertImage = () => {
    const url = window.prompt("Image URL");
    if (url) exec("insertImage", url);
  };

  const tools: { icon: typeof Bold; label: string; action: () => void }[] = [
    { icon: Bold, label: "Bold (Ctrl+B)", action: () => exec("bold") },
    { icon: Italic, label: "Italic (Ctrl+I)", action: () => exec("italic") },
    { icon: UnderlineIcon, label: "Underline (Ctrl+U)", action: () => exec("underline") },
    { icon: Heading1, label: "Heading 1", action: () => exec("formatBlock", "<h1>") },
    { icon: Heading2, label: "Heading 2", action: () => exec("formatBlock", "<h2>") },
    { icon: List, label: "Bulleted list", action: () => exec("insertUnorderedList") },
    { icon: ListOrdered, label: "Numbered list", action: () => exec("insertOrderedList") },
    { icon: Quote, label: "Quote", action: () => exec("formatBlock", "<blockquote>") },
    { icon: Code, label: "Code block", action: () => exec("formatBlock", "<pre>") },
    { icon: LinkIcon, label: "Insert link", action: insertLink },
    { icon: ImageIcon, label: "Insert image", action: insertImage },
  ];

  return (
    <AppShell title="New Note" subtitle="Capture an idea before it fades">
      <div className="p-6 lg:p-10 max-w-4xl mx-auto">
        <div className="rounded-2xl glass overflow-hidden">
          {/* toolbar */}
          <div className="flex items-center justify-between px-3 h-12 border-b border-border bg-surface/50 overflow-x-auto">
            <div className="flex items-center gap-1">
              {tools.map(({ icon: Icon, label, action }, i) => (
                <button
                  key={i}
                  type="button"
                  title={label}
                  aria-label={label}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={action}
                  className="h-8 w-8 grid place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition shrink-0"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-muted-foreground pl-2">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-green animate-pulse" /> Auto-saved
              </span>
            </div>
          </div>

          <div className="p-6 lg:p-8 space-y-6">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled note"
              className="w-full bg-transparent text-3xl font-bold tracking-tight placeholder:text-muted-foreground/40 focus:outline-none border-b border-transparent focus:border-primary/60 pb-2 transition"
            />

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">Tags:</span>
              {mockTags.map((t) => {
                const active = tags.includes(t.name);
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => toggle(t.name)}
                    className={`text-xs px-3 py-1 rounded-full border transition ${
                      active
                        ? "bg-primary/20 border-primary/60 text-foreground glow-sm"
                        : "bg-surface border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    #{t.name}
                  </button>
                );
              })}
            </div>

            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={updateStats}
              data-placeholder="Start writing… ideas, quotes, snippets — anything goes. Press Enter for a new line."
              className="note-editor min-h-[320px] w-full bg-transparent text-base leading-relaxed focus:outline-none whitespace-pre-wrap"
            />
          </div>

          <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border bg-surface/30 flex-wrap">
            <div className="text-xs text-muted-foreground">
              {stats.chars} characters · {stats.words} words
            </div>
            <div className="flex gap-2">
              <Link
                to="/app/notes"
                className="inline-flex items-center gap-2 px-4 h-9 rounded-lg bg-surface border border-border text-sm hover:border-border text-muted-foreground hover:text-foreground transition"
              >
                <X className="h-4 w-4" /> Cancel
              </Link>
              <Link
                to="/app/notes"
                className="inline-flex items-center gap-2 px-4 h-9 rounded-lg gradient-bg text-white text-sm font-medium glow-sm hover:opacity-90 transition"
              >
                <Save className="h-4 w-4" /> Save note
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
          <Check className="h-3 w-3 text-neon-green" /> Saved 2 seconds ago to your local vault.
        </div>
      </div>
    </AppShell>
  );
}
