import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";

// ===== DATA =====
const CHANNELS = [
  { id: 1, name: "Первый канал", category: "Новости", number: 1, color: "#1a90ff", emoji: "📺", description: "Главный федеральный канал России", programs: ["Новости", "Время", "Поле чудес", "Голос"] },
  { id: 2, name: "Россия 1", category: "Новости", number: 2, color: "#ff2d55", emoji: "🎙️", description: "Крупнейший государственный телеканал", programs: ["Вести", "60 минут", "Прямой эфир", "Танцы со звёздами"] },
  { id: 3, name: "НТВ", category: "Новости", number: 3, color: "#ff9f0a", emoji: "📡", description: "Общенациональный информационный канал", programs: ["Сегодня", "Следствие вели", "Мороз по коже"] },
  { id: 4, name: "Рен ТВ", category: "Кино", number: 4, color: "#bf5af2", emoji: "🎬", description: "Развлекательный и информационный", programs: ["Добров в эфире", "Военная тайна", "Документальный спецпроект"] },
  { id: 5, name: "СТС", category: "Развлечения", number: 5, color: "#30d158", emoji: "🎭", description: "Семейный развлекательный канал", programs: ["Сватьи", "Молодежка", "Американские сериалы"] },
  { id: 6, name: "ТНТ", category: "Развлечения", number: 6, color: "#ff9f0a", emoji: "😄", description: "Молодёжный развлекательный канал", programs: ["Универ", "Физрук", "Битва экстрасенсов", "Дом 2"] },
  { id: 7, name: "Пятый канал", category: "Новости", number: 7, color: "#1a90ff", emoji: "📰", description: "Новости и аналитика", programs: ["Сейчас", "Место происшествия", "Детективы"] },
  { id: 8, name: "ТВЦ", category: "Новости", number: 8, color: "#ff2d55", emoji: "🏙️", description: "Московский городской канал", programs: ["События", "Право голоса", "Москва. Инструкция"] },
  { id: 9, name: "Матч ТВ", category: "Спорт", number: 9, color: "#30d158", emoji: "⚽", description: "Главный спортивный канал России", programs: ["Футбол России", "Хоккей", "UFC", "Формула 1"] },
  { id: 10, name: "Россия 24", category: "Новости", number: 10, color: "#1a90ff", emoji: "🌍", description: "Круглосуточный новостной канал", programs: ["Вести в 20:00", "Специальный репортаж", "Картина мира"] },
  { id: 11, name: "Карусель", category: "Детский", number: 11, color: "#ff9f0a", emoji: "🎠", description: "Детский образовательный канал", programs: ["Маша и Медведь", "Смешарики", "Лунтик", "Фиксики"] },
  { id: 12, name: "2×2", category: "Развлечения", number: 12, color: "#bf5af2", emoji: "✌️", description: "Канал анимации и молодёжного контента", programs: ["Симпсоны", "Футурама", "Американский папаша"] },
  { id: 13, name: "Культура", category: "Культура", number: 13, color: "#bf5af2", emoji: "🎨", description: "Телеканал о культуре и искусстве", programs: ["Новости культуры", "Театр на экране", "Документальное кино"] },
  { id: 14, name: "ОТР", category: "Новости", number: 14, color: "#30d158", emoji: "📻", description: "Общественное телевидение России", programs: ["Отражение", "Малые города России", "Большая страна"] },
  { id: 15, name: "ТВ-3", category: "Кино", number: 15, color: "#ff2d55", emoji: "🔮", description: "Мистика, фантастика и приключения", programs: ["Сверхъестественное", "Зеркало", "Загадки человечества"] },
  { id: 16, name: "Муз-ТВ", category: "Музыка", number: 16, color: "#ff9f0a", emoji: "🎵", description: "Музыкальный развлекательный канал", programs: ["Топ-клипы", "Фактор А", "Суперстар"] },
  { id: 17, name: "RU.TV", category: "Музыка", number: 17, color: "#1a90ff", emoji: "🎤", description: "Канал русской музыки", programs: ["Хит-парад", "Золотые хиты", "Живой концерт"] },
  { id: 18, name: "Пятница!", category: "Развлечения", number: 18, color: "#ff2d55", emoji: "🎉", description: "Развлечения, путешествия и лайфстайл", programs: ["Орёл и решка", "Ревизорро", "Секретный миллионер"] },
  { id: 19, name: "Disney", category: "Детский", number: 19, color: "#1a90ff", emoji: "🏰", description: "Детский развлекательный канал", programs: ["Микки Маус", "Монстр Хай", "Violetta"] },
  { id: 20, name: "МИР", category: "Новости", number: 20, color: "#30d158", emoji: "🌐", description: "Межгосударственная телерадиокомпания", programs: ["Мир. События недели", "Большая страна", "Мир кино"] },
];

const SCHEDULE = [
  { time: "08:00", channel: "Первый канал", program: "Доброе утро", category: "Утреннее шоу", duration: 180 },
  { time: "09:00", channel: "НТВ", program: "Сегодня утром", category: "Новости", duration: 60 },
  { time: "10:00", channel: "Россия 1", program: "Россия. Утро", category: "Утреннее шоу", duration: 120 },
  { time: "11:00", channel: "СТС", program: "Молодёжка", category: "Сериал", duration: 60 },
  { time: "12:00", channel: "Матч ТВ", program: "Футбол России. Обзор", category: "Спорт", duration: 90 },
  { time: "13:00", channel: "ТНТ", program: "Универ. Новая общага", category: "Сериал", duration: 60 },
  { time: "14:00", channel: "Первый канал", program: "Время покажет", category: "Ток-шоу", duration: 120 },
  { time: "15:00", channel: "НТВ", program: "Следствие вели...", category: "Документальный", duration: 60 },
  { time: "16:00", channel: "Пятница!", program: "Орёл и решка", category: "Путешествия", duration: 60 },
  { time: "17:00", channel: "Культура", program: "Новости культуры", category: "Новости", duration: 30 },
  { time: "18:00", channel: "Россия 1", program: "60 минут", category: "Ток-шоу", duration: 60 },
  { time: "19:00", channel: "Первый канал", program: "Вечерние новости", category: "Новости", duration: 30 },
  { time: "20:00", channel: "НТВ", program: "Центральное телевидение", category: "Новости", duration: 90 },
  { time: "21:00", channel: "Матч ТВ", program: "РФПЛ. Прямой эфир", category: "Спорт", duration: 120 },
  { time: "22:00", channel: "СТС", program: "Кино. Российская премьера", category: "Кино", duration: 120 },
  { time: "23:00", channel: "ТНТ", program: "Дом 2", category: "Реалити-шоу", duration: 60 },
  { time: "00:00", channel: "Первый канал", program: "Ночные новости", category: "Новости", duration: 30 },
];

const CATEGORIES = ["Все", "Новости", "Развлечения", "Спорт", "Кино", "Детский", "Музыка", "Культура"];

const RECOMMENDATIONS = [
  { title: "Футбол. Лига чемпионов", channel: "Матч ТВ", time: "21:00", tag: "Спорт", hot: true },
  { title: "Следствие вели...", channel: "НТВ", time: "15:00", tag: "Детектив", hot: false },
  { title: "Орёл и решка", channel: "Пятница!", time: "16:00", tag: "Путешествия", hot: true },
  { title: "Универ. Новая общага", channel: "ТНТ", time: "13:00", tag: "Сериал", hot: false },
];

type Page = "home" | "catalog" | "schedule" | "favorites" | "search" | "profile" | "contacts";

// ===== COMPONENTS =====
function LiveBadge() {
  return (
    <span className="live-badge text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-widest">
      LIVE
    </span>
  );
}

function ChannelCard({ channel, isFavorite, onToggleFavorite }: {
  channel: typeof CHANNELS[0];
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="glow-card rounded-xl bg-card p-4 relative overflow-hidden cursor-pointer animate-fade-in"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 opacity-5 rounded-xl"
        style={{ background: `radial-gradient(circle at top left, ${channel.color}, transparent 70%)` }}
      />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: `${channel.color}22`, border: `1px solid ${channel.color}44` }}
            >
              {channel.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs font-mono">CH {String(channel.number).padStart(2, '0')}</span>
                {channel.id <= 3 && <LiveBadge />}
              </div>
              <h3 className="font-display font-semibold text-sm text-foreground leading-tight">{channel.name}</h3>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(channel.id); }}
            className="text-muted-foreground hover:text-yellow-400 transition-colors"
          >
            <Icon name={isFavorite ? "Star" : "StarOff"} size={16} className={isFavorite ? "text-yellow-400" : ""} />
          </button>
        </div>
        <p className="text-muted-foreground text-xs mb-3 line-clamp-1">{channel.description}</p>
        <div
          className="text-xs px-2 py-1 rounded-full inline-block font-medium"
          style={{ background: `${channel.color}22`, color: channel.color }}
        >
          {channel.category}
        </div>
        {hovered && (
          <div className="mt-3 space-y-1 animate-fade-in">
            {channel.programs.slice(0, 2).map((p, i) => (
              <div key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-neon-blue flex-shrink-0" />
                {p}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

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

// ===== PAGES =====
function HomePage({ onNavigate, favorites, onToggleFavorite }: {
  onNavigate: (p: Page) => void;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
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
              <ChannelCard channel={ch} isFavorite={favorites.includes(ch.id)} onToggleFavorite={onToggleFavorite} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CatalogPage({ favorites, onToggleFavorite }: { favorites: number[]; onToggleFavorite: (id: number) => void }) {
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
            <ChannelCard channel={ch} isFavorite={favorites.includes(ch.id)} onToggleFavorite={onToggleFavorite} />
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

function SchedulePage() {
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

function FavoritesPage({ favorites, onToggleFavorite }: { favorites: number[]; onToggleFavorite: (id: number) => void }) {
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
              <ChannelCard channel={ch} isFavorite={true} onToggleFavorite={onToggleFavorite} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SearchPage() {
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
                  <div key={ch.id} className="glow-card bg-card rounded-xl p-3 flex items-center gap-3">
                    <span className="text-2xl">{ch.emoji}</span>
                    <div>
                      <div className="font-semibold text-sm">{ch.name}</div>
                      <div className="text-xs text-muted-foreground">{ch.category}</div>
                    </div>
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

function ProfilePage() {
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

function ContactsPage() {
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

// ===== MAIN =====
export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [favorites, setFavorites] = useState<number[]>([1, 9]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const navItems: { icon: string; label: string; page: Page }[] = [
    { icon: "Home", label: "Главная", page: "home" },
    { icon: "Tv", label: "Каналы", page: "catalog" },
    { icon: "Calendar", label: "Расписание", page: "schedule" },
    { icon: "Star", label: "Избранное", page: "favorites" },
    { icon: "Search", label: "Поиск", page: "search" },
    { icon: "User", label: "Кабинет", page: "profile" },
    { icon: "HelpCircle", label: "Поддержка", page: "contacts" },
  ];

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage onNavigate={setPage} favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case "catalog": return <CatalogPage favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case "schedule": return <SchedulePage />;
      case "favorites": return <FavoritesPage favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case "search": return <SearchPage />;
      case "profile": return <ProfilePage />;
      case "contacts": return <ContactsPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => setPage("home")} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-neon-blue flex items-center justify-center">
              <Icon name="Tv" size={14} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-wide">
              <span className="neon-text-blue">ТВ</span>
              <span className="text-foreground">ПОРТАЛ</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <NavItem key={item.page} icon={item.icon} label={item.label} active={page === item.page} onClick={() => setPage(item.page)} />
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
              {navItems.map(item => (
                <button
                  key={item.page}
                  onClick={() => { setPage(item.page); setMobileMenuOpen(false); }}
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
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {renderPage()}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border">
        <div className="grid grid-cols-5 py-2 px-2">
          {navItems.slice(0, 5).map(item => (
            <NavItem key={item.page} icon={item.icon} label={item.label} active={page === item.page} onClick={() => setPage(item.page)} />
          ))}
        </div>
      </nav>

      <div className="md:hidden h-20" />
    </div>
  );
}
