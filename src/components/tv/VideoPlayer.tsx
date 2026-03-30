import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import Icon from "@/components/ui/icon";
import { type Channel } from "@/data/tvData";
import { LiveBadge } from "@/components/tv/ChannelCard";

export function VideoPlayer({ channel, onClose }: { channel: Channel; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [status, setStatus] = useState<"loading" | "playing" | "error">("loading");
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const url = channel.stream;

    if (channel.streamType === "dash") {
      setStatus("error");
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        xhrSetup: (xhr) => {
          xhr.withCredentials = false;
        },
      });
      hlsRef.current = hls;

      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().then(() => setStatus("playing")).catch(() => {
          video.muted = true;
          setMuted(true);
          video.play().then(() => setStatus("playing")).catch(() => setStatus("error"));
        });
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
            hls.startLoad();
          } else {
            setStatus("error");
          }
        }
      });

      return () => {
        hls.destroy();
        hlsRef.current = null;
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      video.addEventListener("loadedmetadata", () => {
        video.play().then(() => setStatus("playing")).catch(() => setStatus("error"));
      });
      video.addEventListener("error", () => setStatus("error"));
    } else {
      setStatus("error");
    }
  }, [channel.stream, channel.streamType]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(!muted);
    }
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
      setFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setFullscreen(false);
    }
  };

  useEffect(() => {
    const handler = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onClose} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <Icon name="ArrowLeft" size={18} />
          <span className="text-sm">Назад к каналам</span>
        </button>
        <div className="flex items-center gap-2">
          <LiveBadge />
          <span className="text-xs text-muted-foreground">Прямой эфир</span>
        </div>
      </div>

      <div ref={containerRef} className="relative rounded-2xl overflow-hidden bg-black aspect-video group">
        {status === "loading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
            <div className="w-10 h-10 border-2 border-neon-blue border-t-transparent rounded-full animate-spin mb-3" />
            <span className="text-muted-foreground text-sm">Подключение к эфиру...</span>
          </div>
        )}

        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
              <Icon name="WifiOff" size={28} className="text-muted-foreground" />
            </div>
            <p className="text-foreground font-semibold mb-1">Поток недоступен</p>
            <p className="text-muted-foreground text-sm text-center max-w-xs mb-4">
              {channel.streamType === "dash"
                ? "Этот канал использует формат DASH. Поддержка HLS-потоков."
                : "Не удалось подключиться к трансляции. Возможно, поток заблокирован в вашем регионе."}
            </p>
            <button
              onClick={() => {
                setStatus("loading");
                const video = videoRef.current;
                if (video && hlsRef.current) {
                  hlsRef.current.startLoad();
                }
              }}
              className="bg-neon-blue hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
            >
              <Icon name="RotateCcw" size={14} />
              Попробовать снова
            </button>
          </div>
        )}

        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          muted={muted}
          playsInline
          autoPlay
        />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: `${channel.color}33` }}
              >
                {channel.emoji}
              </div>
              <div>
                <div className="text-white text-sm font-semibold">{channel.name}</div>
                <div className="text-white/60 text-xs">{channel.category}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Icon name={muted ? "VolumeX" : "Volume2"} size={16} className="text-white" />
              </button>
              <button onClick={toggleFullscreen} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Icon name={fullscreen ? "Minimize" : "Maximize"} size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 glow-card bg-card rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: `${channel.color}22`, border: `1px solid ${channel.color}44` }}
          >
            {channel.emoji}
          </div>
          <div className="flex-1">
            <h2 className="font-display text-lg font-bold">{channel.name}</h2>
            <p className="text-muted-foreground text-sm">{channel.description}</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: `${channel.color}22`, color: channel.color }}>
            CH {String(channel.number).padStart(2, '0')}
          </span>
        </div>
        {channel.programs.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="text-xs text-muted-foreground mb-2">Популярные программы</div>
            <div className="flex flex-wrap gap-2">
              {channel.programs.map((p, i) => (
                <span key={i} className="text-xs bg-white/5 text-muted-foreground px-2 py-1 rounded-lg">{p}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
