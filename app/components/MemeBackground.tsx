"use client";

import Image from "next/image";

// Assumes images are renamed 1.jpg to 40.jpg in /public/bg-memes/
const MEME_COUNT = 40;
const memes = Array.from({ length: MEME_COUNT }, (_, i) => `/bg-memes/${i + 1}.jpg`);

export default function MemeBackground() {
  return (
    <div className="fixed inset-0 z-[-50] w-screen h-screen bg-black">
      {/* THE PERFECT GRID
         - w-full h-full: Forces the grid to take exactly the screen size.
         - Mobile: grid-cols-4 (width) x grid-rows-10 (height) = 40 cells
         - Desktop: grid-cols-8 (width) x grid-rows-5 (height) = 40 cells
      */}
      <div className="grid w-full h-full grid-cols-4 grid-rows-10 md:grid-cols-8 md:grid-rows-5">
        {memes.map((src, index) => (
          <div key={index} className="relative w-full h-full border-[0.5px] border-black/20">
            <Image
              src={src}
              alt={`Evidence ${index + 1}`}
              fill
              className="object-cover opacity-60 grayscale-[30%]"
              sizes="15vw"
              priority={index < 10}
            />
          </div>
        ))}
      </div>

      {/* THE OVERLAY
         Reduced from bg-black/70 to bg-black/40 so you can see the memes clearly.
      */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </div>
  );
}
