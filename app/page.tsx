"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Twitter, Pill, Warehouse, Play, Paintbrush } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MemeBackground from "./components/MemeBackground";

// COLOR PALETTE - STRICT 5 COLORS ONLY
// Yellow: #FFD700
// Dark Blue: #00008B
// Baby Blue: #89CFF0
// White: #FFFFFF
// Black: #000000

const CONTRACT_ADDRESS = "tAjP8NfsUJDp4LcqmAPMRzhhD9BRpesGvuosSXypump";

const LINKS = {
  x: "https://x.com/engineonsol",
  pump: "https://pump.fun/coin/tAjP8NfsUJDp4LcqmAPMRzhhD9BRpesGvuosSXypump",
  depot: "https://memedepot.com/d/cnlgya-my-depot",
};

// 7 images + 1 video = 8 total assets
const scatteredAssets = [
  // --- TOP ROW ---
  {
    type: "video",
    src: "/evidence/enginememe_video.mp4",
    position: "top-2 left-0 md:top-4 md:left-0 lg:left-2",
    rotation: "-rotate-3",
    size: "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
  },
  {
    type: "image",
    src: "/evidence/enginememe2.jpg",
    position: "top-36 left-0 md:top-6 md:left-[18%] lg:left-[20%]",
    rotation: "rotate-2",
    size: "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
  },
  {
    type: "video",
    src: "/evidence/newvideo1.mp4",
    position: "top-36 right-0 md:top-6 md:right-[18%] lg:right-[20%]",
    rotation: "-rotate-2",
    size: "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
  },
  {
    type: "image",
    src: "/evidence/enginememe4.jpg",
    position: "top-2 right-0 md:top-4 md:right-0 lg:right-2",
    rotation: "rotate-4",
    size: "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
  },

  // --- BOTTOM ROW ---
  {
    type: "image",
    src: "/evidence/enginememe5.png",
    position: "bottom-2 left-0 md:bottom-4 md:left-0 lg:left-2",
    rotation: "rotate-3",
    size: "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
  },
  {
    type: "image",
    src: "/evidence/enginememe6.jpg",
    position: "bottom-36 left-0 md:bottom-6 md:left-[18%] lg:left-[20%]",
    rotation: "-rotate-3",
    size: "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
  },
  {
    type: "video",
    src: "/evidence/newvideo2.mp4",
    position: "bottom-36 right-0 md:bottom-6 md:right-[18%] lg:right-[20%]",
    rotation: "rotate-2",
    size: "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
  },
  {
    type: "image",
    src: "/evidence/enginememe8.jpg",
    position: "bottom-2 right-0 md:bottom-4 md:right-0 lg:right-2",
    rotation: "-rotate-4",
    size: "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
  },
];

const topMarqueeText = "ZERO IS PROMISED /// $ENGINE /// WHAT WOULD WHITE WHALE DO? /// I'VE SEEN THIS CANDLE BEFORE /// $ENGINE /// ";
const bottomMarqueeText = "GRAB A PITCHFORK /// IT'S A FARMERS MARKET /// PASS ME THE .01 /// $ENGINE /// ZERO IS PROMISED /// ";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [activeAsset, setActiveAsset] = useState<number | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleAssetTap = (index: number) => {
    setActiveAsset(activeAsset === index ? null : index);
  };

  const handleEnter = () => {
    setHasEntered(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.log("Audio playback failed:", e));
    }
  };

  return (
    <main className="h-screen bg-transparent relative overflow-hidden">
      {/* BACKGROUND MUSIC */}
      <audio ref={audioRef} src="/song.mp3" loop />

      {/* ENTER SCREEN OVERLAY */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            onClick={handleEnter}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="text-[#FFD700] font-mono text-center space-y-4 animate-pulse px-4">
              {/* UPDATED TITLE TEXT: Gengine Legend */}
              <div className="text-3xl sm:text-4xl md:text-6xl font-bold font-glitch tracking-widest">
                Gengine Legend
              </div>
              <p className="text-sm md:text-lg text-white font-display">
                [ CLICK TO ENTER ]
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wall of Evidence - 40 memes in a grid */}
      <MemeBackground />

      {/* Faint Grid Overlay - Dark Blue */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none z-[2]"
        style={{
          backgroundImage: `
            linear-gradient(#00008B 1px, transparent 1px),
            linear-gradient(90deg, #00008B 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />

      {/* TOP MARQUEE */}
      <div className="absolute top-0 left-0 right-0 bg-[#00008B] border-b-2 border-[#FFD700] py-0.5 overflow-hidden z-40">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-xs md:text-sm font-display text-[#FFD700] font-bold px-2">
              {topMarqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* THE MURAL */}
      {scatteredAssets.map((asset, index) => {
        const isActive = activeAsset === index;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: hasEntered ? 1 : 0, // Only show after entering
              scale: isActive ? 1.1 : 1,
              zIndex: isActive ? 60 : 10
            }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.1, zIndex: 60 }}
            onClick={() => handleAssetTap(index)}
            className={`absolute ${asset.position} ${asset.rotation} cursor-pointer`}
          >
            <div className={`
              ${asset.size}
              border-4 border-dashed
              ${isActive ? 'border-[#89CFF0]' : 'border-[#FFD700]'}
              shadow-[4px_4px_0px_#00008B,-4px_-4px_0px_#89CFF0]
              bg-transparent p-1
              hover:border-[#89CFF0]
              ${isActive ? 'animate-violent-shake' : ''}
              hover:animate-violent-shake
              group
            `}>
              {asset.type === "video" ? (
                <video
                  src={asset.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={`w-full h-full object-cover group-hover:invert group-hover:brightness-125 ${isActive ? 'invert brightness-125' : ''}`}
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={asset.src}
                    alt="evidence"
                    fill
                    className={`object-cover group-hover:invert group-hover:brightness-125 ${isActive ? 'invert brightness-125' : ''}`}
                  />
                </div>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* CENTER OVERLAY */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasEntered ? 1 : 0 }}
        transition={{ delay: 0.5 }}
        className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
      >
        {/* NFT Generator Button — absolute so card stays centered */}
        <Link href="/pfp" className="absolute top-[22%] md:top-auto md:bottom-[74%] left-1/2 -translate-x-1/2 w-[26%] md:w-[225px] block group overflow-hidden z-[60] pointer-events-auto">
          <div className="relative w-full h-7 md:h-12 bg-[#00008B] border-2 border-[#FFD700] hover:border-[#89CFF0] shadow-[4px_4px_0px_#000000] hover:shadow-[2px_2px_0px_#000000] hover:translate-y-[2px] transition-all duration-150 flex items-center justify-center text-center overflow-hidden cursor-pointer">
            {/* Industrial Marquee Background */}
            <div className="absolute inset-0 opacity-20 flex items-center pointer-events-none select-none">
              <div className="animate-marquee whitespace-nowrap text-[6px] md:text-[10px] font-mono text-[#FFD700]">
                IDENTITY REQUIRED /// NO FACE NO CASE /// MINT PFP /// IDENTITY REQUIRED /// NO FACE NO CASE /// MINT PFP ///
              </div>
            </div>
            {/* Foreground */}
            <div className="relative z-10 flex items-center gap-1 md:gap-3">
              <Paintbrush className="w-2.5 h-2.5 md:w-5 md:h-5 text-[#FFD700] group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-display font-black tracking-wider md:tracking-widest text-[7px] md:text-sm text-white group-hover:text-[#FFD700] group-hover:animate-subtle-shake">
                NFT GENERATOR
              </span>
            </div>
            {/* Scanline Sweep */}
            <div className="absolute inset-0 bg-[#FFD700] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out opacity-20 pointer-events-none" />
          </div>
        </Link>

        <div className="
          bg-black/40
          backdrop-blur-none
          border-2 border-[#FFD700]
          shadow-[4px_4px_0px_#00008B]
          px-4 py-3 md:px-6 md:py-4
          max-w-sm md:max-w-md
          text-center
          pointer-events-auto
        ">
          <h1
            className="text-lg sm:text-xl md:text-2xl font-black font-glitch leading-tight mb-1 animate-rgb-glitch"
            style={{ WebkitTextStroke: '2px white', paintOrder: 'stroke fill' }}
          >
            <span className="md:hidden">
              <span className="text-[#FFD700]">THE LITTLE TRENCHER</span>
              <br />
              <span className="text-[#00008B]">THAT COULDN&apos;T</span>
            </span>
            <span className="hidden md:inline">
              <span className="text-[#FFD700]">THE LITTLE</span>
              <br />
              <span className="text-[#00008B]">TRENCHER THAT COULDN&apos;T</span>
            </span>
          </h1>

          <p
            className="text-sm md:text-base font-display text-[#FFD700] mb-2 animate-seesaw inline-block"
            style={{ WebkitTextStroke: '1px white', paintOrder: 'stroke fill' }}
          >
            just farm it 😂✌️
          </p>

          <button
            onClick={copyToClipboard}
            className={`
              w-full px-2 py-1.5 mb-2
              ${copied ? 'bg-[#89CFF0]' : 'bg-[#00008B]'}
              border-2 border-dashed border-[#FFD700]
              transition-all duration-150
              cursor-pointer
            `}
          >
            <p className={`
              text-xs md:text-sm font-mono font-bold break-all
              ${copied ? 'text-black' : 'text-white'}
            `}>
              {copied ? "COPIED!" : CONTRACT_ADDRESS}
            </p>
          </button>

          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <a href={LINKS.pump} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-[#00008B] text-[#FFD700] px-2 py-1 border-2 border-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-colors font-bold text-[10px] md:text-xs font-display">
              <Pill className="w-3 h-3" />
              PUMP
            </a>
            <a href={LINKS.depot} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-[#FFD700] text-[#00008B] px-2 py-1 border-2 border-[#00008B] hover:bg-[#89CFF0] hover:text-black transition-colors font-bold text-[10px] md:text-xs font-display">
              <Warehouse className="w-3 h-3" />
              DEPOT
            </a>
            <a href={LINKS.x} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-[#89CFF0] text-black px-2 py-1 border-2 border-[#00008B] hover:bg-[#FFD700] transition-colors font-bold text-[10px] md:text-xs font-display">
              <Twitter className="w-3 h-3" />
              X
            </a>
          </div>
        </div>
      </motion.div>

      {/* Corner tags */}
      <div className="absolute top-7 left-2 text-[#89CFF0] text-[8px] font-mono opacity-80 z-30">[LIVE]</div>
      <div className="absolute top-7 right-2 text-[#FFD700] text-[8px] font-mono opacity-80 z-30 animate-blink">REC</div>

      {/* BOTTOM MARQUEE */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#FFD700] border-t-2 border-[#00008B] py-0.5 overflow-hidden z-40">
        <div className="animate-marquee-reverse whitespace-nowrap flex">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-xs md:text-sm font-display text-[#00008B] font-bold px-2">
              {bottomMarqueeText}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
