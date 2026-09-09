import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  ArrowRight, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  PackageCheck, 
  Truck, 
  Bot 
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface Tagline {
  prefix: string;
  highlight: string;
}

const TAGLINES: Tagline[] = [
  {
    prefix: "Cut Riser Scrap by 60%.",
    highlight: "Stop Shrinkage Rejections."
  },
  {
    prefix: "Built for Better Feedings.",
    highlight: "Designed for Foundries."
  },
  {
    prefix: "Boost Casting Yield.",
    highlight: "Cut Melting Power Bills."
  },
  {
    prefix: "Engineered Feeding Solutions.",
    highlight: "For Demanding Castings."
  },
  {
    prefix: "Consistent Sleeve Geometry.",
    highlight: "1500°C Thermal Retention."
  }
];

interface HeroProps {
  onExplore3D: () => void;
  onOpenRFQ: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore3D, onOpenRFQ }) => {
  const [taglineIndex, setTaglineIndex] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(TAGLINES[0].prefix.length + 1 + TAGLINES[0].highlight.length);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const currentTagline = TAGLINES[taglineIndex];
  const fullText = `${currentTagline.prefix} ${currentTagline.highlight}`;

  // Smooth Typewriter Loop
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charCount < fullText.length) {
      // Typing forward
      timeout = setTimeout(() => {
        setCharCount((prev) => prev + 1);
      }, 45);
    } else if (!isDeleting && charCount === fullText.length) {
      // Completed full sentence, pause so the user can read
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2400);
    } else if (isDeleting && charCount > 0) {
      // Erasing backward (faster than typing)
      timeout = setTimeout(() => {
        setCharCount((prev) => prev - 1);
      }, 22);
    } else if (isDeleting && charCount === 0) {
      // Switch to next tagline
      setIsDeleting(false);
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
      timeout = setTimeout(() => {}, 300);
    }

    return () => clearTimeout(timeout);
  }, [charCount, isDeleting, fullText.length]);

  // Compute text splits for styling prefix in white and highlight in fire gradient
  const prefixLength = currentTagline.prefix.length;
  let displayedPrefix = "";
  let displayedHighlight = "";

  if (charCount <= prefixLength) {
    displayedPrefix = currentTagline.prefix.slice(0, charCount);
    displayedHighlight = "";
  } else {
    displayedPrefix = currentTagline.prefix + " ";
    displayedHighlight = currentTagline.highlight.slice(0, charCount - prefixLength - 1);
  }

  return (
    <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-radial-molten blur-3xl -z-10 pointer-events-none" />

      <div className="text-center max-w-4xl mx-auto space-y-6">
        {/* Plant Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-neutral-400">Direct Manufacturer:</span>
          <span className="font-bold text-amber-400 font-mono">NAVEXO • Navya Enterprises</span>
          <span className="hidden sm:inline text-neutral-600">|</span>
          <span className="hidden sm:inline text-neutral-300">Ludhiana Works</span>
        </div>

        {/* Animated Typing Headline with Fixed Height Container to prevent layout shift */}
        <div className="min-h-[110px] sm:min-h-[135px] lg:min-h-[155px] flex items-center justify-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.18] font-display">
            <span>{displayedPrefix}</span>
            {displayedHighlight && (
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                {displayedHighlight}
              </span>
            )}
            {/* Blinking Typewriter Cursor */}
            <span className="inline-block w-1 h-7 sm:w-1.5 sm:h-10 lg:h-12 bg-amber-400 ml-1.5 align-middle animate-pulse shadow-[0_0_8px_#f59e0b]" />
          </h1>
        </div>

        {/* Clear, plain-language business pitch */}
        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          High-performance exothermic and insulating riser sleeves for iron, steel, and alloy castings. Lower melting power bills, easy breaker-neck knock-off, and zero internal porosity.
        </p>

        {/* 2 Primary CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href="https://wa.me/918288875986?text=Hello%20Navexo%2C%20I%20want%20to%20inquire%20about%20exothermic%20sleeves%20for%20our%20foundry."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-3.5 px-7 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-950 transition-all cursor-pointer hover:scale-102 active:scale-98 whitespace-nowrap"
          >
            <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
            <span>Order on WhatsApp (+91 82888 75986)</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </a>

          <button
            id="hero-3d-button"
            onClick={onExplore3D}
            className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 font-bold text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer hover:scale-102 active:scale-98"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Inspect 3D Sleeves (360°)</span>
          </button>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-foundry-chatbot'))}
            className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-amber-300 hover:text-amber-200 border border-amber-500/30 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-102 active:scale-98"
          >
            <Bot className="w-4 h-4 text-amber-400" />
            <span>Ask Foundry AI</span>
          </button>
        </div>

        {/* 4 Commercial Proof Points (Trust factors) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-8 text-left">
          <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-2">
              <Flame className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase font-mono">1,500°C Thermal Head</h4>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Feeds molten metal 3x longer than sand.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-2">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase font-mono">+20% Casting Yield</h4>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Pour more finished parts per induction heat.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-2">
              <PackageCheck className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase font-mono">100K+ Stock in Hand</h4>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Heat-dried ready stock in Ludhiana plant.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-2">
              <Truck className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase font-mono">Same-Day Dispatch</h4>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Fast, reliable delivery across all states in India.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
