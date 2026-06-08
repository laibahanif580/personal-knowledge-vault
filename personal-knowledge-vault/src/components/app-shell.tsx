import type { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Bell, Search } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function AppShell({ children, title, subtitle, actions }: { children: ReactNode; title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-30 h-14 flex items-center gap-3 px-4 border-b border-border bg-background/70 backdrop-blur-xl">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-semibold truncate">{title}</h1>
              {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
            </div>
            <Link to="/app/search" className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-lg bg-surface border border-border text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors w-64">
              <Search className="h-3.5 w-3.5" />
              <span>Search vault…</span>
              <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-muted">⌘K</kbd>
            </Link>
            <button className="grid h-9 w-9 place-items-center rounded-lg bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
              <Bell className="h-4 w-4" />
            </button>
            {actions}
            <div className="h-9 w-9 rounded-full gradient-bg grid place-items-center text-xs font-semibold text-white ring-2 ring-primary/30">AS</div>
          </header>
          <main className="flex-1 animate-fade-in">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
