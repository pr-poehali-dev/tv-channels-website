import { useState } from "react";
import Icon from "@/components/ui/icon";
import { type Channel } from "@/data/tvData";

export function LiveBadge() {
  return (
    <span className="live-badge text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-widest">
      LIVE
    </span>
  );
}

export function ChannelCard({ channel, isFavorite, onToggleFavorite, onPlay }: {
  channel: Channel;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onPlay?: (id: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="glow-card rounded-xl bg-card p-4 relative overflow-hidden cursor-pointer animate-fade-in"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPlay?.(channel.id)}
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
        <div className="flex items-center justify-between">
          <div
            className="text-xs px-2 py-1 rounded-full inline-block font-medium"
            style={{ background: `${channel.color}22`, color: channel.color }}
          >
            {channel.category}
          </div>
          {hovered && (
            <div className="flex items-center gap-1 text-neon-blue text-xs font-medium animate-fade-in">
              <Icon name="Play" size={12} />
              Смотреть
            </div>
          )}
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
