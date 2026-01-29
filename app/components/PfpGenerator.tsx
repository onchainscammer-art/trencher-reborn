"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Download, Shuffle, X } from "lucide-react";

// ── Asset Arrays ──────────────────────────────────────────────
const makeAssets = (folder: string, names: string[]) =>
  names.map((n) => ({ name: n, src: `/pfp/${folder}/${n}.png` }));

const LAYERS = {
  BG: makeAssets("BG", [
    "BeamIt", "Casino", "City", "Coral", "Engine", "FAHHH", "Gake...",
    "Himothy", "HomeSweetHome", "LittleSomalia", "NietzscheanEngine",
    "NukeIt", "OhWord", "PaidTask", "TakingDat", "TheEngineDillema", "TheYard",
  ]),
  BODIES: makeAssets("BODIES", [
    "Aliengine", "ChillEngine", "EngineJohnson", "Engitardio",
    "Please...", "Sad", "Smirk", "TiredOfTs",
  ]),
  CLOTHES: makeAssets("CLOTHES", [
    "BlackPuffer", "Bron", "Epstein", "Farmacology", "Farmer", "FatSuit",
    "Jazz", "OrangeVest", "PatagoniaVest", "Polo", "PumpHoodie", "QuarterZip",
    "Spaceman", "Suit", "TrencherPJs", "TrenchJacket", "TWIY", "UhOh",
    "WhiteTee", "WifeBeater",
  ]),
  HATS: makeAssets("HATS", [
    "BagSecured", "Baller", "Beanie", "Durag", "EEEP", "Helmet",
    "OnDaPlaneBrr", "peaky", "Propeller", "Rice", "TismProtector", "Yanks",
  ]),
  GLASSES: makeAssets("GLASSES", [
    "3D", "Aviators", "Bans", "Clout", "Clubmasters",
    "MOG", "Nerd", "Prada", "Shades", "TheCage",
  ]),
  COSTUMES: makeAssets("COSTUMES", [
    "Engabba", "EngineZone", "GakeSuit", "TheLittleTrencher", "YNEngine",
  ]),
  ACCESSORY: makeAssets("ACCESSORY", [
    "Diddy", "DiddyAgain", "Engussy", "Fuck", "FuckAgain",
    "Matcha", "MiniMe", "Motion", "Pitchfork", "Purp",
  ]),
} as const;

type Category = keyof typeof LAYERS;

const CATEGORIES: Category[] = ["BG", "BODIES", "CLOTHES", "HATS", "GLASSES", "ACCESSORY", "COSTUMES"];

type Selected = {
  bg: string | null;
  body: string | null;
  clothes: string | null;
  hat: string | null;
  glasses: string | null;
  accessory: string | null;
  costume: string | null;
};

const CATEGORY_TO_KEY: Record<Category, keyof Selected> = {
  BG: "bg",
  BODIES: "body",
  CLOTHES: "clothes",
  HATS: "hat",
  GLASSES: "glasses",
  ACCESSORY: "accessory",
  COSTUMES: "costume",
};

const CANVAS_SIZE = 500;

// ── Component ─────────────────────────────────────────────────
export default function PfpGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState<Category>("BG");
  const [selected, setSelected] = useState<Selected>({
    bg: null,
    body: null,
    clothes: null,
    hat: null,
    glasses: null,
    accessory: null,
    costume: null,
  });

  const isCostumeMode = selected.costume !== null;

  // ── Selection Logic ───────────────────────────────────────
  const handleSelect = (category: Category, src: string) => {
    const key = CATEGORY_TO_KEY[category];

    setSelected((prev) => {
      // Toggle off if already selected
      if (prev[key] === src) {
        // Deselecting a costume → add a random body
        if (category === "COSTUMES") {
          const randomBody = LAYERS.BODIES[Math.floor(Math.random() * LAYERS.BODIES.length)].src;
          return { ...prev, costume: null, body: randomBody };
        }
        return { ...prev, [key]: null };
      }

      // Costume override: clear body, clothes, hat, accessory
      if (category === "COSTUMES") {
        return { ...prev, costume: src, body: null, clothes: null, hat: null, accessory: null };
      }

      // If selecting body/clothes/hat/accessory while in costume mode, clear costume
      if (isCostumeMode && (key === "body" || key === "clothes" || key === "hat" || key === "accessory")) {
        return { ...prev, [key]: src, costume: null };
      }

      return { ...prev, [key]: src };
    });
  };

  // ── Randomize ─────────────────────────────────────────────
  const handleRandomize = () => {
    const pick = (arr: readonly { src: string }[]) =>
      arr[Math.floor(Math.random() * arr.length)].src;

    const useCostume = Math.random() < 0.25; // 25% chance of costume

    const useAccessory = Math.random() < 0.3; // 30% chance of accessory

    if (useCostume) {
      setSelected({
        bg: pick(LAYERS.BG),
        body: null,
        clothes: null,
        hat: null,
        glasses: pick(LAYERS.GLASSES),
        accessory: useAccessory ? pick(LAYERS.ACCESSORY) : null,
        costume: pick(LAYERS.COSTUMES),
      });
    } else {
      setSelected({
        bg: pick(LAYERS.BG),
        body: pick(LAYERS.BODIES),
        clothes: pick(LAYERS.CLOTHES),
        hat: pick(LAYERS.HATS),
        glasses: pick(LAYERS.GLASSES),
        accessory: useAccessory ? pick(LAYERS.ACCESSORY) : null,
        costume: null,
      });
    }
  };

  // ── Auto-randomize on mount ────────────────────────────────
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      // Standard layers only on first load — no costume
      const pick = (arr: readonly { src: string }[]) =>
        arr[Math.floor(Math.random() * arr.length)].src;
      setSelected({
        bg: pick(LAYERS.BG),
        body: pick(LAYERS.BODIES),
        clothes: pick(LAYERS.CLOTHES),
        hat: pick(LAYERS.HATS),
        glasses: pick(LAYERS.GLASSES),
        accessory: null,
        costume: null,
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Canvas Rendering ──────────────────────────────────────
  const drawCanvas = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Build layer stack based on mode
    const layers: string[] = [];

    if (selected.bg) layers.push(selected.bg);

    if (isCostumeMode) {
      if (selected.costume) layers.push(selected.costume);
    } else {
      if (selected.body) layers.push(selected.body);
      if (selected.clothes) layers.push(selected.clothes);
      if (selected.hat) layers.push(selected.hat);
    }

    if (selected.glasses) layers.push(selected.glasses);
    if (selected.accessory) layers.push(selected.accessory);

    // Draw each layer sequentially
    for (const src of layers) {
      await new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          ctx.drawImage(img, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
          resolve();
        };
        img.onerror = () => reject(new Error(`Failed to load: ${src}`));
        img.src = src;
      });
    }
  }, [selected, isCostumeMode]);

  useEffect(() => {
    drawCanvas().catch(console.error);
  }, [drawCanvas]);

  // ── Download ──────────────────────────────────────────────
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "trencher-pfp.png";
    a.click();
  };

  // ── Clear All ─────────────────────────────────────────────
  const handleClear = () => {
    setSelected({
      bg: null,
      body: null,
      clothes: null,
      hat: null,
      glasses: null,
      accessory: null,
      costume: null,
    });
  };

  // ── Render ────────────────────────────────────────────────
  const currentItems = LAYERS[activeTab];
  const currentKey = CATEGORY_TO_KEY[activeTab];
  const isDisabled =
    isCostumeMode && (activeTab === "BODIES" || activeTab === "CLOTHES" || activeTab === "HATS" || activeTab === "ACCESSORY");

  return (
    <div
      className="
        bg-[#00008B] border-2 border-[#FFD700]
        shadow-[8px_8px_0px_#000000]
        p-3 md:p-4
        w-[95vw] max-w-4xl
      "
    >
      {/* Header */}
      <h2
        className="text-center text-lg md:text-xl font-display text-[#FFD700] mb-3 tracking-widest"
        style={{ textShadow: "2px 2px 0 #000" }}
      >
        NFT GENERATOR
      </h2>

      {/* Main Layout: Canvas + Controls */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Canvas Preview */}
        <div className="flex-shrink-0 flex flex-col items-start md:items-center gap-2">
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="
              w-full max-w-[300px] md:max-w-[350px]
              aspect-square
              border-2 border-dashed border-[#FFD700]
              bg-black
            "
          />

          {/* Action Buttons */}
          <div className="flex gap-2 w-full max-w-[300px] md:max-w-[350px]">
            <button
              onClick={handleRandomize}
              className="
                flex-1 flex items-center justify-center gap-1.5
                bg-[#FFD700] text-black
                border-2 border-black
                shadow-[3px_3px_0px_#000]
                hover:shadow-[1px_1px_0px_#000] hover:translate-y-[2px]
                transition-all duration-150
                px-3 py-2 font-display text-xs font-bold
                cursor-pointer
              "
            >
              <Shuffle className="w-4 h-4" />
              RANDOMIZE
            </button>
            <button
              onClick={handleDownload}
              className="
                flex-1 flex items-center justify-center gap-1.5
                bg-[#89CFF0] text-black
                border-2 border-[#00008B]
                shadow-[3px_3px_0px_#000]
                hover:shadow-[1px_1px_0px_#000] hover:translate-y-[2px]
                transition-all duration-150
                px-3 py-2 font-display text-xs font-bold
                cursor-pointer
              "
            >
              <Download className="w-4 h-4" />
              DOWNLOAD
            </button>
            <button
              onClick={handleClear}
              className="
                flex items-center justify-center
                bg-black text-[#FFD700]
                border-2 border-[#FFD700]
                shadow-[3px_3px_0px_#FFD700]
                hover:shadow-[1px_1px_0px_#FFD700] hover:translate-y-[2px]
                transition-all duration-150
                px-3 py-2 font-display text-xs font-bold
                cursor-pointer
              "
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Costume Mode Indicator */}
          {isCostumeMode && (
            <div className="text-[10px] font-mono text-[#89CFF0] text-center animate-blink">
              COSTUME MODE ACTIVE — BODY/CLOTHES/HAT/ACCESSORY LOCKED
            </div>
          )}
        </div>

        {/* Controls Panel */}
        <div className="flex-1 min-w-0">
          {/* Tab Bar */}
          <div className="flex flex-wrap gap-1 mb-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat;
              const isLocked =
                isCostumeMode && (cat === "BODIES" || cat === "CLOTHES" || cat === "HATS" || cat === "ACCESSORY");

              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`
                    px-2 py-1 text-[10px] md:text-xs font-mono font-bold
                    border transition-all duration-150 cursor-pointer
                    ${
                      isActive
                        ? "bg-[#FFD700] text-black border-[#FFD700]"
                        : "bg-transparent text-[#FFD700] border-[#FFD700] hover:bg-[#FFD700]/20"
                    }
                    ${isLocked ? "opacity-40 line-through" : ""}
                  `}
                >
                  {cat}
                  {selected[CATEGORY_TO_KEY[cat]] !== null && !isLocked ? " *" : ""}
                </button>
              );
            })}
          </div>

          {/* Disabled notice */}
          {isDisabled && (
            <div className="text-[10px] font-mono text-[#FFD700] mb-2 px-1">
              LOCKED BY COSTUME — DESELECT COSTUME TO UNLOCK
            </div>
          )}

          {/* Item Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
            {currentItems.map((item) => {
              const isSelected = selected[currentKey] === item.src;

              return (
                <button
                  key={item.name}
                  onClick={() => !isDisabled && handleSelect(activeTab, item.src)}
                  disabled={isDisabled}
                  className={`
                    px-2 py-2 text-[10px] md:text-xs font-mono font-bold
                    border-2 transition-all duration-150
                    truncate
                    ${isDisabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
                    ${
                      isSelected
                        ? "bg-[#FFD700] text-black border-[#FFD700] shadow-[2px_2px_0px_#000]"
                        : "bg-transparent text-[#FFD700] border-[#FFD700] hover:bg-[#FFD700]/20"
                    }
                  `}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
