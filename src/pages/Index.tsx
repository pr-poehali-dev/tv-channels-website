import { useState } from "react";
import { type Page } from "@/data/tvData";
import { AppHeader } from "@/components/tv/AppHeader";
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

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const renderPage = () => {
    switch (page) {
      case "home":     return <HomePage onNavigate={setPage} favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case "catalog":  return <CatalogPage favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case "schedule": return <SchedulePage />;
      case "favorites": return <FavoritesPage favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case "search":   return <SearchPage />;
      case "profile":  return <ProfilePage />;
      case "contacts": return <ContactsPage />;
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
