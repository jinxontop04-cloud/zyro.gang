"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Sparkles, Zap, ArrowRight, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="relative min-h-screen w-full bg-zinc-950 text-white overflow-hidden flex flex-col justify-between font-sans">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />

      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-black text-xl tracking-wider">
          <div className="p-2 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-400">
            <Zap size={20} />
          </div>
          <span>zyro.lol<span className="text-purple-500">.WTF</span></span>
        </div>

        <div>
          {session ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-medium transition"
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition shadow-lg"
            >
              <span>Conectează-te cu Google</span>
            </button>
          )}
        </div>
      </header>

      <section className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center my-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 text-xs font-semibold mb-6"
        >
          <Sparkles size={14} />
          <span>Platform zyro.lol</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6">
          Aesthetic Biolinks for <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
            Creators & Gamers
          </span>
        </h1>

        <p className="text-zinc-400 text-lg max-w-2xl mb-10">
          Fundal mp4 video for desing 
        </p>

        {session ? (
          <Link
            href="/dashboard"
            className="px-8 py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 font-bold transition flex items-center gap-2 shadow-lg"
          >
            <span>go to dashboard</span>
            <ArrowRight size={18} />
          </Link>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="px-8 py-4 rounded-2xl bg-white hover:bg-zinc-200 text-black font-bold transition flex items-center gap-3 shadow-xl"
          >
            <span>Autentificare cu Google</span>
          </button>
        )}
      </section>

      <footer className="relative z-10 text-center py-6 text-xs text-zinc-600 border-t border-white/5">
        © 2026 zyro.lol
      </footer>
    </main>
  );
}
