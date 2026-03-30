import { useState } from "react";
import { type Page, type Channel, CHANNELS } from "@/data/tvData";
import { AppHeader } from "@/components/tv/AppHeader";
import { VideoPlayer } from "@/components/tv/VideoPlayer";
import {
  HomePage,
  CatalogPage,
  SchedulePage,
  FavoritesPage,
  SearchPage,
  ProfilePage,
  ContactsPage,
} from "@/components/tv/TvPages";

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [favorites, setFavorites] = useState<number[]>([1, 9]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const openPlayer = (channelId: number) => {
    const ch = CHANNELS.find(c => c.id === channelId);
    if (ch) {
      setSelectedChannel(ch);
      setPage("player");
    }
  };

  const closePlayer = () => {
    setSelectedChannel(null);
    setPage("catalog");
  };

  const renderPage = () => {
    switch (page) {
      case "home":      return <HomePage onNavigate={setPage} favorites={favorites} onToggleFavorite={toggleFavorite} onPlay={openPlayer} />;
      case "catalog":   return <CatalogPage favorites={favorites} onToggleFavorite={toggleFavorite} onPlay={openPlayer} />;
      case "schedule":  return <SchedulePage />;
      case "favorites": return <FavoritesPage favorites={favorites} onToggleFavorite={toggleFavorite} onPlay={openPlayer} />;
      case "search":    return <SearchPage onPlay={openPlayer} />;
      case "profile":   return <ProfilePage />;
      case "contacts":  return <ContactsPage />;
      case "player":    return selectedChannel ? <VideoPlayer channel={selectedChannel} onClose={closePlayer} /> : null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader page={page} onNavigate={setPage} />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {renderPage()}
      </main>
      <div className="md:hidden h-20" />
    </div>
  );
}
