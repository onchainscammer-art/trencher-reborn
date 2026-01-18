"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Twitter } from "lucide-react";
import Image from "next/image";

const CONTRACT_ADDRESS = "tAjP8NfsUJDp4LcqmAPMRzhhD9BRpesGvuosSXypump";
const X_LINK = "https://x.com/engineonsol";

// 7 images + 1 video = 8 total assets
// Mobile: close to center | Desktop (md:): PUSHED TO FAR EDGES
const scatteredAssets = [
  { type: "video", src: "/evidence/enginememe_video.mp4", position: "top-16 left-2 md:top-12 md:left-4 lg:left-8", rotation: "-rotate-6" },
  { type: "image", src: "/evidence/enginememe2.jpg", position: "top-16 right-2 md:top-12 md:right-4 lg:right-8", rotation: "rotate-6" },
  { type: "image", src: "/evidence/enginememe3.jpg", position: "top-1/3 left-1 md:top-1/4 md:left-2 lg:left-4", rotation: "-rotate-12" },
  { type: "image", src: "/evidence/enginememe4.jpg", position: "top-1/3 right-1 md:top-1/4 md:right-2 lg:right-4", rotation: "rotate-10" },
  { type: "image", src: "/evidence/enginememe5.jpg", position: "bottom-28 left-2 md:bottom-12 md:left-4 lg:left-8", rotation: "rotate-8" },
  { type: "image", src: "/evidence/enginememe6.jpg", position: "bottom-24 right-2 md:bottom-12 md:right-4 lg:right-8", rotation: "-rotate-6" },
  { type: "image", src: "/evidence/enginememe7.jpg", position: "bottom-40 left-1/4 hidden md:block md:bottom-1/4 md:left-2 lg:left-6", rotation: "-rotate-3" },
  { type: "image", src: "/evidence/enginememe8.jpg", position: "bottom-36 right-1/4 hidden md:block md:bottom-1/4 md:right-2 lg:right-6", rotation: "rotate-4" },
];

// TOP MARQUEE - "The Prophecy" (scrolls LEFT)
const topMarqueeText = "ZERO IS PROMISED /// $ENGINE /// WHAT WOULD WHITE WHALE DO? /// I'VE SEEN THIS CANDLE BEFORE /// $ENGINE /// ";

// BOTTOM MARQUEE - "The Trenches" (scrolls RIGHT)
const bottomMarqueeText = "GRAB A PITCHFORK /// IT'S A FARMERS MARKET /// PASS ME THE .01 /// $ENGINE /// ZERO IS PROMISED /// ";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <main className="h-screen bg-[#0a0a0a] relative overflow-hidden flex flex-col">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(#0000FF 1px, transparent 1px),
            linear-gradient(90deg, #0000FF 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />

      {/* TOP MARQUEE - "The Prophecy" (scrolls LEFT) */}
      <div className="absolute top-0 left-0 right-0 bg-[#FF0000] border-b-2 border-black py-1 overflow-hidden z-40">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-sm md:text-base font-display text-white font-bold px-2 drop-shadow-[1px_1px_0px_#000]">
              {topMarqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* Scattered Assets - THE EVIDENCE PILE */}
      {scatteredAssets.map((asset, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.08, duration: 0.3 }}
          className={`absolute ${asset.position} ${asset.rotation} z-10`}
        >
          <div className="
            w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
            border-4 border-dashed border-[#FF0000]
            shadow-[3px_3px_0px_#0000FF,-3px_-3px_0px_#FFFF00]
            bg-black p-1
            hover:scale-110 hover:z-50
            transition-transform cursor-pointer
            group
          ">
            {asset.type === "video" ? (
              <video
                src={asset.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:invert group-active:invert"
              />
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={asset.src}
                  alt="evidence"
                  fill
                  className="object-cover group-hover:invert group-active:invert"
                />
              </div>
            )}
          </div>
        </motion.div>
      ))}

      {/* MAIN CONTENT - CENTER STAGE */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-20 pointer-events-none px-4">

        {/* Header - THE LITTLE TRENCHER */}
        <motion.div
          animate={{
            x: [0, -2, 2, -1, 0],
            y: [0, 1, -1, 1, 0],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="text-center mb-2"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black font-display text-outline leading-none">
            <span className="text-[#FF0000]">THE LITTLE</span>{" "}
            <span className="text-[#FFFF00]">TRENCHER</span>{" "}
            <span className="text-[#0000FF]">THAT COULDN&apos;T</span>
          </h1>
        </motion.div>

        {/* Sub-header - just farm it */}
        <motion.p
          initial={{ rotate: 0 }}
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-display text-[#00FF00] mb-3 md:mb-4"
          style={{ textShadow: '2px 2px 0 #000, -2px -2px 0 #FF0000' }}
        >
          JUST FARM IT 😂✌️
        </motion.p>

        {/* CONTRACT ADDRESS - THE CENTERPIECE (CARD on Desktop) */}
        <motion.button
          onClick={copyToClipboard}
          whileTap={{ scale: 0.95 }}
          className={`
            pointer-events-auto
            px-4 py-3 md:px-6 md:py-4
            ${copied ? 'bg-[#00FF00]' : 'bg-[#0000FF]'}
            border-4 border-[#FFFF00]
            shadow-[6px_6px_0px_#FF0000]
            transition-all duration-150
            cursor-pointer
            w-full max-w-[95vw] md:max-w-3xl md:mx-auto
          `}
        >
          <p className={`
            text-lg sm:text-xl md:text-2xl lg:text-3xl
            font-mono font-bold
            break-all leading-tight
            ${copied ? 'text-black' : 'text-white'}
          `}
          style={{ textShadow: copied ? 'none' : '2px 2px 0 #000' }}
          >
            {copied ? "COPIED" : CONTRACT_ADDRESS}
          </p>
        </motion.button>

        {/* X Link */}
        <a
          href={X_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="
            pointer-events-auto
            inline-flex items-center gap-2
            bg-[#FF0000] text-black
            px-4 py-2 mt-3
            border-2 border-black
            shadow-[3px_3px_0px_#0000FF]
            hover:bg-[#FFFF00]
            transition-colors
            font-bold text-sm md:text-base font-display
          "
        >
          <Twitter className="w-4 h-4" />
          @ENGINEONSOL
        </a>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-2 text-[#00FF00] text-[8px] md:text-[10px] font-mono opacity-50 z-30">
        <p>[LIVE]</p>
      </div>
      <div className="absolute top-8 right-2 text-[#FF0000] text-[8px] md:text-[10px] font-mono opacity-50 z-30 animate-blink">
        REC
      </div>
      <div className="absolute bottom-8 left-2 text-[#FFFF00] text-[8px] md:text-[10px] font-mono opacity-40 z-30">
        <p>$ENGINE</p>
      </div>
      <div className="absolute bottom-8 right-2 text-[#0000FF] text-[8px] md:text-[10px] font-mono opacity-40 z-30">
        <p>ENGINE JOHNSON</p>
      </div>

      {/* BOTTOM MARQUEE - "The Trenches" (scrolls RIGHT) */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#0000FF] border-t-2 border-[#FFFF00] py-1 overflow-hidden z-40">
        <div className="animate-marquee-reverse whitespace-nowrap flex">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-sm md:text-base font-display text-[#00FF00] font-bold px-2 drop-shadow-[1px_1px_0px_#000]">
              {bottomMarqueeText}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
