import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, FileText, Plus, Network, Tags, Search,
  Star, Activity, Settings, User, Trash2, HelpCircle, Sparkles,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";

const main = [
  { title: "Dashboard", url: "/app/dashboard", icon: LayoutDashboard },
  { title: "Notes", url: "/app/notes", icon: FileText },
  { title: "New Note", url: "/app/notes/new", icon: Plus },
  { title: "Mind Map", url: "/app/mindmap", icon: Network },
  { title: "Tags", url: "/app/tags", icon: Tags },
  { title: "Search", url: "/app/search", icon: Search },
];

const personal = [
  { title: "Favorites", url: "/app/favorites", icon: Star },
  { title: "Activity", url: "/app/activity", icon: Activity },
  { title: "Profile", url: "/app/profile", icon: User },
];

const system = [
  { title: "Settings", url: "/app/settings", icon: Settings },
  { title: "Trash", url: "/app/trash", icon: Trash2 },
  { title: "Help", url: "/app/help", icon: HelpCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const path = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (u: string) => path === u;

  const renderGroup = (label: string, items: typeof main) => (
    <SidebarGroup>
      {!collapsed && <SidebarGroupLabel className="text-[11px] uppercase tracking-widest text-muted-foreground/70">{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild isActive={isActive(item.url)} className="data-[active=true]:bg-primary/15 data-[active=true]:text-foreground data-[active=true]:shadow-[inset_2px_0_0_var(--primary)] hover:bg-accent/50">
                <Link to={item.url} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="text-sm">{item.title}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/app/dashboard" className="flex items-center gap-2 px-2 py-2">
          <div className="relative grid h-8 w-8 place-items-center rounded-lg gradient-bg glow-sm">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="text-sm font-semibold">Vault</div>
              <div className="text-[10px] text-muted-foreground">Second Brain</div>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {renderGroup("Workspace", main)}
        {renderGroup("Personal", personal)}
        {renderGroup("System", system)}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        {!collapsed ? (
          <div className="glass rounded-xl p-3">
            <div className="text-xs font-semibold gradient-text">Pro Plan</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">Unlimited notes & links</div>
          </div>
        ) : (
          <div className="grid h-8 w-8 place-items-center rounded-lg gradient-bg glow-sm mx-auto">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
