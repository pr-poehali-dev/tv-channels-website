import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";
import { ChannelCard, LiveBadge } from "@/components/tv/ChannelCard";
import { CHANNELS, SCHEDULE, CATEGORIES, RECOMMENDATIONS, type Page } from "@/data/tvData";

// ===== HOME PAGE =====
export function HomePage({ onNavigate, favorites, onToggleFavorite, onPlay }: {
  onNavigate: (p: Page) => void;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onPlay?: (id: number) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="relative rounded-2xl overflow-hidden min-h-[280px] flex items-end">
        <img
          src="https://cdn.poehali.dev/projects/9d102451-cce4-45b2-93a3-3df5f8f6af5f/files/40a55c29-61dd-43aa-8d6b-6403a930ca15.jpg"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        <div className="relative z-10 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <LiveBadge />
            <span className="text-muted-foreground text-sm">20 каналов в прямом эфире</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
            СМОТРИ <span className="neon-text-blue">РОССИЮ</span><br />В ПРЯМОМ ЭФИРЕ
          </h1>
          <p className="text-muted-foreground max-w-md mb-5">
            Все главные каналы, расписание программ и умные рекомендации — в одном месте
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => onNavigate("catalog")}
              className="bg-neon-blue hover:bg-blue-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-500/25"
            >
              <Icon name="Play" size={16} />
              Смотреть эфир
            </button>
            <button
              onClick={() => onNavigate("schedule")}
              className="bg-white/10 hover:bg-white/20 backdrop-blur text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 border border-white/10"
            >
              <Icon name="Calendar" size={16} />
              Расписание
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Каналов", value: "20", icon: "Tv", color: "#1a90ff" },
          { label: "Программ сегодня", value: "340+", icon: "List", color: "#ff2d55" },
          { label: "В избранном", value: favorites.length.toString(), icon: "Star", color: "#ff9f0a" },
        ].map((stat, i) => (
          <div key={i} className="glow-card rounded-xl bg-card p-4 text-center">
            <Icon name={stat.icon} size={20} className="mx-auto mb-1" style={{ color: stat.color } as React.CSSProperties} />
            <div className="font-display text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-muted-foreground text-xs">{stat.label}</div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
            <Icon name="Sparkles" size={18} className="text-neon-blue" />
            Рекомендации для вас
          </h2>
          <span className="text-xs bg-neon-blue/10 text-neon-blue px-2 py-1 rounded-full">На основе просмотров</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {RECOMMENDATIONS.map((rec, i) => (
            <div key={i} className={`glow-card rounded-xl bg-card p-4 flex items-center gap-4 stagger-${i + 1} animate-fade-in`}>
              <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Play" size={20} className="text-neon-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-foreground truncate">{rec.title}</span>
                  {rec.hot && <span className="text-neon-red text-xs">🔥</span>}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{rec.channel}</span>
                  <span>·</span>
                  <span>{rec.time}</span>
                </div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-muted-foreground flex-shrink-0">{rec.tag}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold">Популярные каналы</h2>
          <button onClick={() => onNavigate("catalog")} className="text-neon-blue text-sm hover:underline flex items-center gap-1">
            Все каналы <Icon name="ArrowRight" size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {CHANNELS.slice(0, 8).map((ch, i) => (
            <div key={ch.id} className={`stagger-${Math.min(i + 1, 6)}`}>
              <ChannelCard channel={ch} isFavorite={favorites.includes(ch.id)} onToggleFavorite={onToggleFavorite} onPlay={onPlay} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== CATALOG PAGE =====
export function CatalogPage({ favorites, onToggleFavorite, onPlay }: { favorites: number[]; onToggleFavorite: (id: number) => void; onPlay?: (id: number) => void }) {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [searchQ, setSearchQ] = useState("");

  const filtered = useMemo(() => {
    let list = CHANNELS;
    if (activeCategory !== "Все") list = list.filter(c => c.category === activeCategory);
    if (searchQ) list = list.filter(c => c.name.toLowerCase().includes(searchQ.toLowerCase()));
    return list;
  }, [activeCategory, searchQ]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold mb-1">Каталог каналов</h1>
        <p className="text-muted-foreground">20 российских телеканалов</p>
      </div>
      <div className="relative mb-4">
        <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={searchQ}
          onChange={e => setSearchQ(e.target.value)}
          placeholder="Найти канал..."
          className="w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-neon-blue/50 transition-colors"
        />
      </div>
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? "bg-neon-blue text-white shadow-lg shadow-blue-500/25"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-neon-blue/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filtered.map((ch, i) => (
          <div key={ch.id} className={`stagger-${Math.min(i + 1, 6)}`}>
            <ChannelCard channel={ch} isFavorite={favorites.includes(ch.id)} onToggleFavorite={onToggleFavorite} onPlay={onPlay} />
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-muted-foreground">
            <Icon name="Tv" size={40} className="mx-auto mb-3 opacity-30" />
            <p>Каналы не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ===== SCHEDULE PAGE =====
export function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState(0);
  const days = ["Сегодня", "Завтра", "Послезавтра"];
  const categoryColors: Record<string, string> = {
    "Новости": "#1a90ff", "Спорт": "#30d158", "Сериал": "#bf5af2",
    "Ток-шоу": "#ff9f0a", "Документальный": "#ff2d55", "Путешествия": "#30d158",
    "Утреннее шоу": "#ff9f0a", "Реалити-шоу": "#ff2d55", "Кино": "#bf5af2",
  };
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold mb-1">Расписание программ</h1>
        <p className="text-muted-foreground">Актуальная программа передач</p>
      </div>
      <div className="flex gap-2 mb-6">
        {days.map((d, i) => (
          <button
            key={d}
            onClick={() => setSelectedDay(i)}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              selectedDay === i ? "bg-neon-blue text-white" : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {SCHEDULE.map((item, i) => {
          const color = categoryColors[item.category] || "#1a90ff";
          return (
            <div key={i} className={`glow-card bg-card rounded-xl p-4 flex items-center gap-4 stagger-${Math.min(i + 1, 6)} animate-fade-in`}>
              <div className="text-center w-14 flex-shrink-0">
                <div className="font-display text-lg font-bold text-foreground">{item.time}</div>
              </div>
              <div className="w-px h-10 bg-border flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-foreground">{item.program}</div>
                <div className="text-muted-foreground text-xs mt-0.5">{item.channel} · {item.duration} мин</div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full font-medium flex-shrink-0" style={{ background: `${color}22`, color }}>
                {item.category}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===== FAVORITES PAGE =====
export function FavoritesPage({ favorites, onToggleFavorite, onPlay }: { favorites: number[]; onToggleFavorite: (id: number) => void; onPlay?: (id: number) => void }) {
  const favChannels = CHANNELS.filter(c => favorites.includes(c.id));
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold mb-1">Избранные каналы</h1>
        <p className="text-muted-foreground">{favChannels.length} сохранённых каналов</p>
      </div>
      {favChannels.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-6xl mb-4 animate-float">⭐</div>
          <h2 className="font-display text-xl font-semibold mb-2">Пока пусто</h2>
          <p className="text-muted-foreground text-sm">Добавляйте каналы в избранное, нажимая на звёздочку в карточке канала</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {favChannels.map((ch, i) => (
            <div key={ch.id} className={`stagger-${Math.min(i + 1, 6)}`}>
              <ChannelCard channel={ch} isFavorite={true} onToggleFavorite={onToggleFavorite} onPlay={onPlay} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== SEARCH PAGE =====
export function SearchPage({ onPlay }: { onPlay?: (id: number) => void }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return {
      channels: CHANNELS.filter(c =>
        c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.programs.some(p => p.toLowerCase().includes(q))
      ),
      schedule: SCHEDULE.filter(s => s.program.toLowerCase().includes(q) || s.channel.toLowerCase().includes(q)),
    };
  }, [query]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold mb-1">Поиск</h1>
        <p className="text-muted-foreground">Программы, фильмы и каналы</p>
      </div>
      <div className="relative mb-6">
        <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Введите название программы или канала..."
          className="w-full bg-card border border-border rounded-2xl pl-12 pr-4 py-4 text-foreground placeholder:text-muted-foreground outline-none focus:border-neon-blue/50 transition-colors text-base"
          autoFocus
        />
      </div>
      {!query && (
        <div className="text-center py-16 text-muted-foreground">
          <Icon name="Search" size={48} className="mx-auto mb-4 opacity-20" />
          <p>Начните вводить запрос</p>
        </div>
      )}
      {results && (
        <div className="space-y-6">
          {results.channels.length > 0 && (
            <div>
              <h2 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                <Icon name="Tv" size={16} className="text-neon-blue" /> Каналы ({results.channels.length})
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {results.channels.map(ch => (
                  <div key={ch.id} className="glow-card bg-card rounded-xl p-3 flex items-center gap-3 cursor-pointer" onClick={() => onPlay?.(ch.id)}>
                    <span className="text-2xl">{ch.emoji}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{ch.name}</div>
                      <div className="text-xs text-muted-foreground">{ch.category}</div>
                    </div>
                    <Icon name="Play" size={14} className="text-neon-blue" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {results.schedule.length > 0 && (
            <div>
              <h2 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                <Icon name="Calendar" size={16} className="text-neon-blue" /> Программы ({results.schedule.length})
              </h2>
              <div className="space-y-2">
                {results.schedule.map((item, i) => (
                  <div key={i} className="glow-card bg-card rounded-xl p-3 flex items-center gap-4">
                    <span className="font-display font-bold text-neon-blue w-12">{item.time}</span>
                    <div>
                      <div className="font-semibold text-sm">{item.program}</div>
                      <div className="text-xs text-muted-foreground">{item.channel}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {results.channels.length === 0 && results.schedule.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-30" />
              <p>Ничего не найдено по запросу «{query}»</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ===== PROFILE PAGE =====
export function ProfilePage() {
  const [name, setName] = useState("Иван Петров");
  const [email, setEmail] = useState("ivan@example.com");
  const [editing, setEditing] = useState(false);
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold mb-1">Личный кабинет</h1>
        <p className="text-muted-foreground">Управление профилем и настройки</p>
      </div>
      <div className="glow-card bg-card rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 border border-neon-blue/30 flex items-center justify-center text-3xl">
            👤
          </div>
          <div>
            <div className="font-display text-xl font-bold">{name}</div>
            <div className="text-muted-foreground text-sm">{email}</div>
            <span className="text-xs bg-neon-blue/10 text-neon-blue px-2 py-0.5 rounded-full mt-1 inline-block">Премиум</span>
          </div>
        </div>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="w-full bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue border border-neon-blue/20 font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Icon name="Pencil" size={16} />
            Редактировать профиль
          </button>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Имя</label>
              <input value={name} onChange={e => setName(e.target.value)} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground outline-none focus:border-neon-blue/50 text-sm" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground outline-none focus:border-neon-blue/50 text-sm" />
            </div>
            <button onClick={() => setEditing(false)} className="w-full bg-neon-blue hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl transition-colors">
              Сохранить
            </button>
          </div>
        )}
      </div>
      <div className="glow-card bg-card rounded-2xl p-6">
        <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
          <Icon name="Settings" size={16} className="text-neon-blue" />
          Настройки
        </h3>
        <div className="space-y-1">
          {["Уведомления о начале программ", "Рекомендации на основе просмотров", "Email-дайджест расписания"].map((setting, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <span className="text-sm text-foreground">{setting}</span>
              <div className="w-10 h-5 bg-neon-blue/30 border border-neon-blue/40 rounded-full relative cursor-pointer">
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-neon-blue rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== CONTACTS PAGE =====
export function ContactsPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold mb-1">Контакты и поддержка</h1>
        <p className="text-muted-foreground">Мы готовы помочь</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {[
          { icon: "Mail", label: "Email", value: "support@tvportal.ru", color: "#1a90ff" },
          { icon: "Phone", label: "Телефон", value: "+7 800 123-45-67", color: "#30d158" },
          { icon: "MessageCircle", label: "Telegram", value: "@tvportal_ru", color: "#bf5af2" },
        ].map((c, i) => (
          <div key={i} className="glow-card bg-card rounded-xl p-4 text-center">
            <Icon name={c.icon} size={24} className="mx-auto mb-2" style={{ color: c.color } as React.CSSProperties} />
            <div className="text-xs text-muted-foreground mb-1">{c.label}</div>
            <div className="text-sm font-medium text-foreground">{c.value}</div>
          </div>
        ))}
      </div>
      {!sent ? (
        <div className="glow-card bg-card rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4">Написать нам</h3>
          <div className="space-y-3">
            <input placeholder="Ваше имя" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground outline-none focus:border-neon-blue/50 text-sm transition-colors" />
            <input placeholder="Email для ответа" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground outline-none focus:border-neon-blue/50 text-sm transition-colors" />
            <textarea rows={4} placeholder="Опишите ваш вопрос..." className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground outline-none focus:border-neon-blue/50 text-sm resize-none transition-colors" />
            <button
              onClick={() => setSent(true)}
              className="w-full bg-neon-blue hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="Send" size={16} />
              Отправить сообщение
            </button>
          </div>
        </div>
      ) : (
        <div className="glow-card bg-card rounded-2xl p-8 text-center animate-scale-in">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="font-display text-xl font-semibold mb-2">Сообщение отправлено!</h3>
          <p className="text-muted-foreground text-sm">Мы ответим вам в течение 24 часов</p>
          <button onClick={() => setSent(false)} className="mt-4 text-neon-blue text-sm hover:underline">Написать ещё</button>
        </div>
      )}
    </div>
  );
}