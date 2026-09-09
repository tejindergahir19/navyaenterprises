import React from 'react';
import { 
  Flame, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  XCircle, 
  ArrowRight, 
  MessageSquare,
  Sparkles,
  Zap,
  Scale
} from 'lucide-react';

export const ThermalScience: React.FC = () => {
  const handleSampleRequest = () => {
    const text = encodeURIComponent(
      `Hello Navexo (Navya Enterprises),\n` +
      `I would like to request a *Free Trial Sample Batch* of Navexo exothermic sleeves for our foundry pattern trials.\n` +
      `Our foundry pours: Ductile / Grey Iron / Steel Castings.`
    );
    window.open(`https://wa.me/918288875986?text=${text}`, '_blank');
  };

  return (
    <section id="thermal-science" className="w-full py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span>Foundry Problem Solver</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          How Navexo Saves Your Foundry Money
        </h2>
        <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
          No complex theory needed. Here is why iron, steel, and alloy foundries across India switch from conventional sand risers to Navexo sleeves:
        </p>
      </div>

      {/* Visual Before & After Comparison Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 mb-10 shadow-2xl overflow-hidden relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* WITHOUT NAVEXO (Sand Riser) */}
          <div className="p-6 rounded-2xl bg-neutral-950/80 border border-red-900/40 space-y-4">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <XCircle className="w-5 h-5 shrink-0" />
              <span>WITHOUT NAVEXO: Heavy Sand Riser</span>
            </div>
            
            <div className="h-36 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center p-4 relative overflow-hidden">
              <svg viewBox="0 0 200 120" className="w-full h-full max-h-32" fill="none">
                {/* Sand Riser big block */}
                <rect x="40" y="20" width="120" height="50" fill="#3f3f46" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                <text x="100" y="38" textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="sans-serif" fontWeight="bold">HEAVY SAND RISER</text>
                <text x="100" y="50" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontFamily="sans-serif">Chills too fast</text>
                {/* Deep Shrinkage Cavity extending into casting */}
                <path d="M 80 40 Q 100 85 120 40 Z" fill="#09090b" stroke="#dc2626" strokeWidth="1.5" />
                <text x="100" y="78" textAnchor="middle" fill="#f87171" fontSize="8" fontFamily="sans-serif" fontWeight="bold">SHRINKAGE PIPE IN CASTING</text>
                {/* Casting body */}
                <rect x="25" y="70" width="150" height="40" fill="#27272a" stroke="#52525b" strokeWidth="1" />
                <text x="100" y="100" textAnchor="middle" fill="#e4e4e7" fontSize="10" fontFamily="sans-serif">Finished Casting (REJECTED)</text>
              </svg>
            </div>

            <ul className="space-y-2 text-xs text-neutral-400">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>Metal freezes too fast, creating deep shrinkage holes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>You melt huge risers (wasting furnace electricity & metal).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>Thick riser contact takes hours to cut and grind.</span>
              </li>
            </ul>
          </div>

          {/* WITH NAVEXO EXOTHERMIC SLEEVE */}
          <div className="p-6 rounded-2xl bg-neutral-950/80 border border-emerald-500/40 space-y-4 shadow-lg shadow-emerald-950/30">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>WITH NAVEXO: Exothermic Sleeve</span>
            </div>

            <div className="h-36 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-amber-500/5 pointer-events-none" />
              <svg viewBox="0 0 200 120" className="w-full h-full max-h-32" fill="none">
                {/* Compact Sleeve */}
                <rect x="70" y="20" width="60" height="48" rx="3" fill="#b8a086" stroke="#f59e0b" strokeWidth="2" />
                <text x="100" y="36" textAnchor="middle" fill="#78350f" fontSize="9" fontFamily="sans-serif" fontWeight="bold">NAVEXO SLEEVE</text>
                <text x="100" y="47" textAnchor="middle" fill="#ea580c" fontSize="8" fontFamily="sans-serif" fontWeight="bold">Stays Molten 1500°C</text>
                {/* Shrinkage contained safely up inside the sleeve */}
                <path d="M 85 30 Q 100 48 115 30 Z" fill="#09090b" stroke="#f97316" strokeWidth="1.5" />
                <text x="100" y="58" textAnchor="middle" fill="#047857" fontSize="7" fontFamily="sans-serif" fontWeight="bold">Pipe isolated in sleeve</text>
                {/* Breaker neck contact */}
                <rect x="88" y="68" width="24" height="4" fill="#f59e0b" />
                {/* Clean 100% Solid Casting */}
                <rect x="25" y="72" width="150" height="40" fill="#15803d" stroke="#10b981" strokeWidth="1" opacity="0.9" />
                <text x="100" y="96" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="sans-serif" fontWeight="bold">100% Sound Casting (PASSED)</text>
              </svg>
            </div>

            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Exothermic heat feeds molten metal right until end of freeze.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Riser size is reduced by 60% — you pour more castings per heat.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Breaker neck knocks off easily with a single hammer hit.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4 Core Commercial Advantages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Save Furnace Electricity</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            By eliminating heavy 50kg sand risers, you stop paying electricity to melt scrap metal that gets cut off anyway.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Boost Casting Yield (+20%)</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            More saleable castings per ton of molten metal poured. Directly increases your foundry's monthly bottom-line revenue.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">70% Less Grinding Labor</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Navexo neck-down sleeves snap off cleanly at the breaker line. Eliminates torch gouging and saves expensive grinding discs.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Zero Radiography Rejection</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Continuous directional heat flow keeps feeder pipes isolated in the sleeve crown, keeping critical casting walls 100% solid.
          </p>
        </div>
      </div>

      {/* Direct WhatsApp Sample Trial Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/60 via-neutral-900 to-neutral-950 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Want to test Navexo on your foundry floor?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300">
            Request a trial sample batch customized to your casting pattern pins.
          </p>
        </div>

        <button
          onClick={handleSampleRequest}
          className="py-3.5 px-7 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-xl shadow-emerald-950 cursor-pointer transition-all hover:scale-105 active:scale-95 shrink-0"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span>Request Trial Samples on WhatsApp</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
