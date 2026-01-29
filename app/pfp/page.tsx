"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MemeBackground from "../components/MemeBackground";
import PfpGenerator from "../components/PfpGenerator";

export default function PfpPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <main className="min-h-screen md:h-screen bg-transparent relative overflow-y-auto md:overflow-hidden">
      {/* Background Music */}
      <audio ref={audioRef} src="/song.mp3" loop />

      {/* Meme Wall Background */}
      <MemeBackground />

      {/* Grid Overlay */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none z-[2]"
        style={{
          backgroundImage: `
            linear-gradient(#00008B 1px, transparent 1px),
            linear-gradient(90deg, #00008B 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      {/* RETURN TO THE ENGINE ZONE */}
      <Link
        href="/"
        className="
          absolute md:fixed top-4 left-4 z-50
          flex items-center gap-2
          bg-[#00008B] text-[#FFD700]
          px-3 py-2
          border-2 border-[#FFD700]
          shadow-[4px_4px_0px_#000000]
          hover:shadow-[2px_2px_0px_#000000] hover:translate-y-[2px]
          transition-all duration-150
          font-display text-xs font-bold tracking-wider
        "
      >
        <ArrowLeft className="w-4 h-4" />
        RETURN TO THE ENGINE ZONE
      </Link>

      {/* Centered Generator */}
      <div className="relative z-10 flex items-center justify-center min-h-screen md:h-full px-4 py-14 md:py-4">
        <PfpGenerator />
      </div>
    </main>
  );
}
