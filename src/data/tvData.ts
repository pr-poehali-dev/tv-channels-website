export const CHANNELS = [
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

export const SCHEDULE = [
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

export const CATEGORIES = ["Все", "Новости", "Развлечения", "Спорт", "Кино", "Детский", "Музыка", "Культура"];

export const RECOMMENDATIONS = [
  { title: "Футбол. Лига чемпионов", channel: "Матч ТВ", time: "21:00", tag: "Спорт", hot: true },
  { title: "Следствие вели...", channel: "НТВ", time: "15:00", tag: "Детектив", hot: false },
  { title: "Орёл и решка", channel: "Пятница!", time: "16:00", tag: "Путешествия", hot: true },
  { title: "Универ. Новая общага", channel: "ТНТ", time: "13:00", tag: "Сериал", hot: false },
];

export type Page = "home" | "catalog" | "schedule" | "favorites" | "search" | "profile" | "contacts";
export type Channel = typeof CHANNELS[0];
