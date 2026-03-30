import { useState } from "react";
import Icon from "@/components/ui/icon";
import { LiveBadge } from "@/components/tv/ChannelCard";
import { type Page } from "@/data/tvData";

function NavItem({ icon, label, active, onClick }: { icon: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
        active
          ? "text-neon-blue bg-neon-blue/10"
          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
      }`}
    >
      <Icon name={icon} size={20} className={active ? "text-neon-blue" : ""} />
      <span className="text-[10px] font-medium leading-none">{label}</span>
    </button>
  );
}

const NAV_ITEMS: { icon: string; label: string; page: Page }[] = [
  { icon: "Home", label: "Главная", page: "home" },
  { icon: "Tv", label: "Каналы", page: "catalog" },
  { icon: "Calendar", label: "Расписание", page: "schedule" },
  { icon: "Star", label: "Избранное", page: "favorites" },
  { icon: "Search", label: "Поиск", page: "search" },
  { icon: "User", label: "Кабинет", page: "profile" },
  { icon: "HelpCircle", label: "Поддержка", page: "contacts" },
];

export function AppHeader({ page, onNavigate }: { page: Page; onNavigate: (p: Page) => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-neon-blue flex items-center justify-center">
            <Icon name="Tv" size={14} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg tracking-wide">
            <span className="neon-text-blue">ТВ</span>
            <span className="text-foreground">ПОРТАЛ</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <NavItem key={item.page} icon={item.icon} label={item.label} active={page === item.page} onClick={() => onNavigate(item.page)} />
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <LiveBadge />
          <span className="text-xs text-muted-foreground">Эфир онлайн</span>
        </div>

        <button className="md:hidden text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-xl animate-fade-in">
          <div className="grid grid-cols-4 gap-1 p-3">
            {NAV_ITEMS.map(item => (
              <button
                key={item.page}
                onClick={() => { onNavigate(item.page); setMobileMenuOpen(false); }}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                  page === item.page ? "bg-neon-blue/15 text-neon-blue" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border">
        <div className="grid grid-cols-5 py-2 px-2">
          {NAV_ITEMS.slice(0, 5).map(item => (
            <NavItem key={item.page} icon={item.icon} label={item.label} active={page === item.page} onClick={() => onNavigate(item.page)} />
          ))}
        </div>
      </nav>
    </header>
  );
}
