"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Volume2, VolumeX, Eye, CheckCircle2, ExternalLink, Play, Pause, Sparkles, Music2 } from "lucide-react";

export default function PublicBiolinkPage() {
  const [entered, setEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const profile = {
    username: "vortex",
    displayName: "Vortex FX",
    bio: "Digital Creator & Dark Aesthetic Developer.",
    avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400",
    bgUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-40748-large.mp4",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    audioTitle: "Nightcall Synthwave",
    views: 14200,
    badges: ["VIP", "DEV", "OG"],
    links: [
      { id: "1", title: "Join Discord Community", url: "https://discord.gg" },
      { id: "2", title: "GitHub Projects", url: "https://github.com" },
    ],
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleEnter = () => {
    setEntered(true);
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-black text-white overflow-hidden flex items-center justify-center font-sans select-none"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-35 blur-sm scale-105"
        src={profile.bgUrl}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      <audio ref={audioRef} src={profile.audioUrl} loop />

      <AnimatePresence>
        {!entered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleEnter}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 cursor-pointer backdrop-blur-xl"
          >
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="flex flex-col items-center gap-3">
              <div className="p-4 rounded-full bg-purple-500/20 text-purple-400">
                <Sparkles size={28} />
              </div>
              <p className="text-lg font-black tracking-[0.3em] uppercase">[ Click to Enter ]</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={entered ? { scale: 1, opacity: 1 } : {}}
        className="relative z-10 w-full max-w-md mx-4 p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-2xl flex flex-col items-center"
      >
        <div className="w-full flex justify-between items-center mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-zinc-400">
            <Eye size={12} />
            <span>{profile.views.toLocaleString()}</span>
          </div>
          <button onClick={togglePlay} className="p-2 rounded-full bg-white/10">
            {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>

        <img src={profile.avatarUrl} alt={profile.username} className="w-24 h-24 rounded-full object-cover border-2 border-white/20 mb-4" />

        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-black">{profile.displayName}</h1>
          <CheckCircle2 size={18} className="text-purple-400" />
        </div>
        <p className="text-xs text-zinc-400 mb-4">@{profile.username}</p>

        <div className="flex gap-2 mb-5">
          {profile.badges.map((b) => (
            <span key={b} className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {b}
            </span>
          ))}
        </div>

        <p className="text-sm text-center text-zinc-300 mb-6">{profile.bio}</p>

        <div className="w-full mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Music2 size={18} className={isPlaying ? "animate-spin text-purple-400" : "text-zinc-400"} />
            <span className="text-xs font-bold">{profile.audioTitle}</span>
          </div>
          <button onClick={togglePlay} className="p-2 rounded-xl bg-white/10">
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>

        <div className="w-full flex flex-col gap-3">
          {profile.links.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="w-full py-3.5 px-5 rounded-2xl bg-white/10 border border-white/10 flex justify-between items-center text-sm font-medium">
              <span>{link.title}</span>
              <ExternalLink size={16} />
            </a>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
