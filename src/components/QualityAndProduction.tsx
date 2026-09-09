import React from 'react';
import { 
  Flame, 
  Warehouse, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Scale, 
  Layers, 
  Activity,
  ArrowRight
} from 'lucide-react';

export const QualityAndProduction: React.FC = () => {
  const qualityChecks = [
    {
      title: 'Exothermic Reaction Verification',
      desc: 'Every production batch undergoes burn tests to verify ignition kinetics, reaction intensity, and calorific plateau duration.',
      icon: Flame,
      stat: '1,450°C - 1,550°C'
    },
    {
      title: 'Insulation & Heat Retention',
      desc: 'Post-combustion matrix thermal conductivity is strictly tested to prevent premature neck freeze and open-air chilling.',
      icon: Layers,
      stat: 'k < 0.28 W/m·K'
    },
    {
      title: 'High Mechanical Integrity',
      desc: 'Formulated with organic-inorganic binders to withstand severe pneumatic squeezing and high-pressure automated molding (DISA).',
      icon: ShieldCheck,
      stat: '> 18 kg/cm²'
    },
    {
      title: 'Casting Yield Maximization',
      desc: 'Engineered feeding geometry designed to reduce riser volume by 50% to 70%, yielding more finished parts per induction heat.',
      icon: Scale,
      stat: 'Up to 85% Yield'
    },
    {
      title: 'Total Shrinkage Defect Control',
      desc: 'Enforces steep directional temperature gradient, eliminating macro-voids, dendritic micro-porosity, and hot spot tearing.',
      icon: Activity,
      stat: 'Zero Cavity Risk'
    },
    {
      title: 'Batch Dimensional Repeatability',
      desc: 'Automated mold compaction ensures precise inner/outer diameters, matching pattern breaker core pins within ±0.5mm.',
      icon: Award,
      stat: '±0.5 mm Tolerance'
    }
  ];

  return (
    <section id="quality" className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold mb-3">
          <Award className="w-4 h-4" />
          <span>Foundry Readiness & Verification</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Performance You Can See
        </h2>
        <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
          Navexo sleeves are tested on the foundry floor. From vigorous exothermic ignition checks to large heat-dried rack inventories in Ludhiana, we guarantee consistent metallurgical feeding.
        </p>
      </div>

      {/* Production Highlights Grid (Inspired by PDF Page 5 Photos) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Card 1: Exothermic Burn Test */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group">
          <div className="p-6 bg-gradient-to-b from-neutral-950 to-neutral-900 border-b border-neutral-800">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono uppercase text-amber-500 font-semibold flex items-center gap-1.5">
                <Flame className="w-4 h-4" />
                Live Thermal Ignition Check
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Batch Quality Gate
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Burning / Exothermic Reaction Test
            </h3>
          </div>

          <div className="p-6 space-y-4">
            {/* Visual Representation of the fiery test from PDF page 5 */}
            <div className="h-48 rounded-xl bg-gradient-to-br from-neutral-950 via-amber-950/40 to-neutral-950 border border-amber-500/30 p-5 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between z-10">
                <span className="text-xs font-mono text-amber-400 font-bold bg-neutral-900/80 px-2.5 py-1 rounded-md border border-neutral-800">
                  Combustion Temp: 1,480°C Verified
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 bg-neutral-900/80 px-2.5 py-1 rounded-md border border-neutral-800">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                </span>
              </div>

              <div className="space-y-1 z-10">
                <div className="text-xs font-mono text-neutral-300">
                  Aluminothermic formulation generates sustained thermal head.
                </div>
                <div className="text-[11px] text-neutral-400">
                  Ensures liquid metal remains molten 3x longer than molding sand.
                </div>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Reaction intensity and heat output are calibrated for iron and steel foundry temperatures. The vigorous burn keeps the feeder crown liquid, eliminating secondary piping and cold-chilling defects.
            </p>
          </div>
        </div>

        {/* Card 2: Heat-Dried Ready Stock */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group">
          <div className="p-6 bg-gradient-to-b from-neutral-950 to-neutral-900 border-b border-neutral-800">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono uppercase text-amber-500 font-semibold flex items-center gap-1.5">
                <Warehouse className="w-4 h-4" />
                Ludhiana Facility Inventory
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Ready for Dispatch
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Heat-Dried Ready Stock & Capacity
            </h3>
          </div>

          <div className="p-6 space-y-4">
            {/* Visual representation of the inventory racks from PDF page 5 & 7 */}
            <div className="h-48 rounded-xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800 p-5 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white font-bold bg-neutral-900/80 px-2.5 py-1 rounded-md border border-neutral-800">
                  Controlled Humidity Curing
                </span>
                <span className="text-xs font-mono text-amber-400 bg-neutral-900/80 px-2.5 py-1 rounded-md border border-neutral-800">
                  Moisture Content &lt; 0.5%
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="bg-neutral-900/80 p-2 rounded-lg border border-neutral-800 text-center">
                  <span className="text-[10px] text-neutral-500 block font-mono">Stock Rack</span>
                  <span className="text-xs font-bold text-white font-mono">100K+ Sleeves</span>
                </div>
                <div className="bg-neutral-900/80 p-2 rounded-lg border border-neutral-800 text-center">
                  <span className="text-[10px] text-neutral-500 block font-mono">Turnaround</span>
                  <span className="text-xs font-bold text-amber-400 font-mono">24-48 Hours</span>
                </div>
                <div className="bg-neutral-900/80 p-2 rounded-lg border border-neutral-800 text-center">
                  <span className="text-[10px] text-neutral-500 block font-mono">Logistics</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">Pan-India</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Every sleeve is thoroughly heat-cured in temperature-controlled drying chambers to completely drive out free and chemically bound moisture, eliminating mold hydrogen gas and porosity risks.
            </p>
          </div>
        </div>
      </div>

      {/* 6 Performance Parameters Table / Grid from PDF */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {qualityChecks.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {item.stat}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5">{item.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
