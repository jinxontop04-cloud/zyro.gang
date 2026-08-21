"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Save, Link as LinkIcon, Video, User as UserIcon, Plus, Trash2, ExternalLink } from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  const [username, setUsername] = useState("vortex");
  const [displayName, setDisplayName] = useState("Vortex FX");
  const [bio, setBio] = useState("Full-stack dev & dark aesthetic creator.");
  const [bgUrl, setBgUrl] = useState("https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-40748-large.mp4");
  const [audioUrl, setAudioUrl] = useState("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
  const [links, setLinks] = useState([
    { id: "1", title: "Discord Server", url: "https://discord.gg" },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleAddLink = () => {
    if (!newTitle || !newUrl) return;
    setLinks([...links, { id: Date.now().toString(), title: newTitle, url: newUrl }]);
    setNewTitle("");
    setNewUrl("");
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter((l) => l.id !== id));
  };

  if (status === "loading") {
    return <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">Se încarcă...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl flex justify-between items-center mb-8 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-black">Dashboard Configurare</h1>
          <p className="text-xs text-zinc-400">Editează datele profilului tău</p>
        </div>
        <a
          href={`/${username}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 text-sm font-semibold"
        >
          <span>Vezi Profilul</span>
          <ExternalLink size={16} />
        </a>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4 bg-zinc-900/50 p-6 rounded-3xl border border-white/5">
          <h2 className="text-lg font-bold flex items-center gap-2 text-purple-400">
            <UserIcon size={18} /> Profil & Design
          </h2>

          <input
            type="text"
            placeholder="Username URL"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm"
          />
          <input
            type="text"
            placeholder="Nume Afișat"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm"
          />
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm h-20"
          />

          <h2 className="text-lg font-bold flex items-center gap-2 text-purple-400 mt-2">
            <Video size={18} /> Fundal Video & MP3
          </h2>
          <input
            type="text"
            placeholder="URL Video MP4"
            value={bgUrl}
            onChange={(e) => setBgUrl(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm"
          />
          <input
            type="text"
            placeholder="URL Melodie MP3"
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm"
          />

          <button className="w-full py-3 rounded-xl bg-purple-600 font-bold flex items-center justify-center gap-2 mt-2">
            <Save size={18} /> Salvează Modificările
          </button>
        </div>

        <div className="flex flex-col gap-4 bg-zinc-900/50 p-6 rounded-3xl border border-white/5">
          <h2 className="text-lg font-bold flex items-center gap-2 text-purple-400">
            <LinkIcon size={18} /> Adaugă Link-uri
          </h2>

          <input
            type="text"
            placeholder="Titlu Link"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm"
          />
          <input
            type="text"
            placeholder="URL Link"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm"
          />
          <button onClick={handleAddLink} className="py-2.5 rounded-xl bg-white/10 font-semibold text-sm flex items-center justify-center gap-2">
            <Plus size={16} /> Adaugă
          </button>

          <div className="flex flex-col gap-2 mt-4">
            {links.map((l) => (
              <div key={l.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-sm font-semibold">{l.title}</span>
                <button onClick={() => handleDeleteLink(l.id)} className="text-red-400 p-1">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
