import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Flame, 
  Scale, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  IndianRupee
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const YieldCalculator: React.FC = () => {
  const [castingWeight, setCastingWeight] = useState<number>(45); // kg
  const [dailyQuantity, setDailyQuantity] = useState<number>(30); // parts per day
  const [metalType, setMetalType] = useState<'ductile' | 'grey' | 'steel'>('ductile');

  // Business calculations
  // Sand riser typically adds 65%-80% of casting weight as riser scrap
  const sandRiserWeightPerPiece = castingWeight * 0.70;
  // Navexo sleeve reduces riser metal down to ~22% of casting weight
  const navexoRiserWeightPerPiece = castingWeight * 0.24;

  const metalSavedPerPiece = sandRiserWeightPerPiece - navexoRiserWeightPerPiece;
  const dailyMetalSavedKg = metalSavedPerPiece * dailyQuantity;
  const monthlyMetalSavedTons = (dailyMetalSavedKg * 26) / 1000;

  // Power melting cost saved: approx ₹7.5 per kg of liquid metal melted
  const powerCostSavedPerKg = metalType === 'steel' ? 9.5 : (metalType === 'ductile' ? 7.8 : 6.8);
  const monthlyRupeeSavings = Math.round(dailyMetalSavedKg * 26 * powerCostSavedPerKg);

  // Yield percentages
  const sandYield = Math.round((castingWeight / (castingWeight + sandRiserWeightPerPiece)) * 100);
  const navexoYield = Math.round((castingWeight / (castingWeight + navexoRiserWeightPerPiece)) * 100);

  const handleSendCalculationToWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Navexo (Navya Enterprises),\n` +
      `I used your Foundry Savings Calculator:\n` +
      `- Casting Weight: ${castingWeight} kg (${metalType.toUpperCase()})\n` +
      `- Daily Production: ${dailyQuantity} pcs/day\n` +
      `- Estimated Monthly Scrap Metal Saved: ${monthlyMetalSavedTons.toFixed(1)} Tons\n` +
      `- Estimated Monthly Power Savings: ₹${monthlyRupeeSavings.toLocaleString('en-IN')}\n` +
      `Please recommend suitable Navexo sleeve sizes and quote bulk factory prices.`
    );
    window.open(`https://wa.me/918288875986?text=${text}`, '_blank');
  };

  return (
    <div id="yield-calculator" className="w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Instant Profit Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            How Much Money Can Your Foundry Save?
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            See how much scrap metal and electricity cost you save by switching to Navexo sleeves.
          </p>
        </div>

        <div className="flex items-center gap-2 p-1.5 bg-neutral-950 rounded-xl border border-neutral-800 text-xs font-bold">
          {(['ductile', 'grey', 'steel'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMetalType(m)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                metalType === m
                  ? 'bg-amber-500 text-neutral-950 font-extrabold shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {m === 'ductile' ? 'Ductile Iron' : m === 'grey' ? 'Grey Iron' : 'Cast Steel'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Input Sliders (Left 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Slider 1: Casting Weight */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="text-neutral-300 font-semibold">Single Casting Weight (Finished):</label>
              <span className="font-mono text-amber-400 font-bold text-sm bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800">
                {castingWeight} kg
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={300}
              step={5}
              value={castingWeight}
              onChange={(e) => setCastingWeight(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
              <span>5 kg (Small Part)</span>
              <span>150 kg</span>
              <span>300 kg (Heavy Casting)</span>
            </div>
          </div>

          {/* Slider 2: Daily Production */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="text-neutral-300 font-semibold">Castings Poured Per Day:</label>
              <span className="font-mono text-emerald-400 font-bold text-sm bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800">
                {dailyQuantity} pcs / day
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={200}
              step={5}
              value={dailyQuantity}
              onChange={(e) => setDailyQuantity(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
              <span>5 pcs</span>
              <span>100 pcs</span>
              <span>200 pcs</span>
            </div>
          </div>

          {/* Quick Riser Weight Comparison Pill */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">Old Sand Riser Weight:</span>
              <span className="font-mono text-red-400 font-bold">~{sandRiserWeightPerPiece.toFixed(1)} kg / piece</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">Navexo Sleeve Riser:</span>
              <span className="font-mono text-emerald-400 font-bold">~{navexoRiserWeightPerPiece.toFixed(1)} kg / piece</span>
            </div>
            <div className="pt-2 border-t border-neutral-900 flex justify-between text-xs font-bold">
              <span className="text-white">Direct Metal Saved:</span>
              <span className="text-amber-400 font-mono">{metalSavedPerPiece.toFixed(1)} kg / piece (65% Cut)</span>
            </div>
          </div>
        </div>

        {/* Results Showcase (Right 7 cols) */}
        <div className="lg:col-span-7 bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-500 font-bold block">
            Your Monthly Foundry Savings
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Metric 1 */}
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[11px] text-neutral-400 block mb-1">Monthly Scrap Saved</span>
              <div className="text-2xl font-black text-white font-mono">
                {monthlyMetalSavedTons.toFixed(1)} <span className="text-sm font-normal text-neutral-400">Tons</span>
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">Less metal to re-melt</span>
            </div>

            {/* Metric 2 */}
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[11px] text-neutral-400 block mb-1">Melting Power Saved</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                ₹{(monthlyRupeeSavings / 1000).toFixed(0)}k
              </div>
              <span className="text-[10px] text-neutral-400 mt-1 block">Per month in electricity</span>
            </div>

            {/* Metric 3 */}
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[11px] text-neutral-400 block mb-1">Casting Yield Jump</span>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {sandYield}% → {navexoYield}%
              </div>
              <span className="text-[10px] text-amber-300 mt-1 block">+{navexoYield - sandYield}% Yield Gain</span>
            </div>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed">
            By switching your pattern equipment to Navexo sleeves, you stop burning high electricity units to re-melt dead feeder scrap. Your foundry pours more profitable castings every heat.
          </p>

          <button
            onClick={handleSendCalculationToWhatsApp}
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-emerald-950 cursor-pointer transition-all hover:scale-101 active:scale-99"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
            <span>Send These Figures to Factory on WhatsApp (+91 82888 75986)</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
