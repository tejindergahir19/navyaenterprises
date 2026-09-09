import React from 'react';

interface ProductVisualProps {
  modelType: string;
  className?: string;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({ modelType, className = "w-full h-44" }) => {
  switch (modelType) {
    case 'open':
      return (
        <div className={`${className} bg-neutral-950/80 rounded-xl flex items-center justify-center p-3 relative overflow-hidden border border-neutral-800 group-hover:border-amber-500/40 transition-colors`}>
          <div className="absolute inset-0 bg-radial-molten opacity-20 pointer-events-none" />
          <svg viewBox="0 0 220 180" className="w-full h-full max-h-40 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="openSleeveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9a8166" />
                <stop offset="25%" stopColor="#c8b49b" />
                <stop offset="50%" stopColor="#dfd2be" />
                <stop offset="75%" stopColor="#ab947b" />
                <stop offset="100%" stopColor="#7a644e" />
              </linearGradient>
              <linearGradient id="openCoreGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e1e24" />
                <stop offset="100%" stopColor="#0d0e12" />
              </linearGradient>
              <linearGradient id="moltenCoreGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#9a3412" />
              </linearGradient>
            </defs>
            {/* Outer sleeve cylinder */}
            <rect x="45" y="45" width="130" height="105" rx="6" fill="url(#openSleeveGrad)" />
            {/* Cylinder 3D Top Rim Outer */}
            <ellipse cx="110" cy="45" rx="65" ry="18" fill="#cbb79e" stroke="#8b735b" strokeWidth="2" />
            {/* Cylinder 3D Top Rim Inner (Core) */}
            <ellipse cx="110" cy="45" rx="42" ry="11" fill="url(#openCoreGrad)" stroke="#6b553e" strokeWidth="1.5" />
            {/* Inner bore cavity depth */}
            <path d="M 68 45 L 68 125 A 42 11 0 0 0 152 125 L 152 45 Z" fill="url(#openCoreGrad)" opacity="0.9" />
            {/* Cylinder 3D Bottom Curved base */}
            <ellipse cx="110" cy="150" rx="65" ry="18" fill="#7a644e" />
            <path d="M 45 150 A 65 18 0 0 0 175 150 L 175 145 A 65 18 0 0 1 45 145 Z" fill="#604c38" />
            {/* Refractory grain dots & texture */}
            <circle cx="85" cy="80" r="1.5" fill="#544332" opacity="0.6" />
            <circle cx="135" cy="95" r="2" fill="#544332" opacity="0.6" />
            <circle cx="95" cy="115" r="1.5" fill="#544332" opacity="0.6" />
            <circle cx="150" cy="75" r="1.5" fill="#544332" opacity="0.6" />
            {/* Callout Badge */}
            <rect x="10" y="10" width="70" height="20" rx="4" fill="#18181b" stroke="#3f3f46" />
            <text x="45" y="24" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="monospace" fontWeight="bold">OPEN ENDS</text>
          </svg>
        </div>
      );

    case 'neckdown':
      return (
        <div className={`${className} bg-neutral-950/80 rounded-xl flex items-center justify-center p-3 relative overflow-hidden border border-neutral-800 group-hover:border-amber-500/40 transition-colors`}>
          <div className="absolute inset-0 bg-radial-molten opacity-20 pointer-events-none" />
          <svg viewBox="0 0 220 180" className="w-full h-full max-h-40 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="neckSleeveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9a8166" />
                <stop offset="30%" stopColor="#d1c0a9" />
                <stop offset="70%" stopColor="#a89279" />
                <stop offset="100%" stopColor="#6e5843" />
              </linearGradient>
            </defs>
            {/* Main sleeve body */}
            <path d="M 45 42 L 175 42 L 175 110 L 145 145 L 75 145 L 45 110 Z" fill="url(#neckSleeveGrad)" />
            {/* Top Rim */}
            <ellipse cx="110" cy="42" rx="65" ry="17" fill="#d1c0a9" stroke="#8b735b" strokeWidth="2" />
            <ellipse cx="110" cy="42" rx="42" ry="10" fill="#18181b" stroke="#5a4530" strokeWidth="1.5" />
            {/* Neck-down reduced contact base */}
            <ellipse cx="110" cy="145" rx="35" ry="10" fill="#5a4530" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
            <ellipse cx="110" cy="145" rx="22" ry="6" fill="#09090b" />
            {/* Knock-off breaker core indicator */}
            <path d="M 85 130 L 135 130" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="110" y="125" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace" fontWeight="bold">BREAKER NOTCH</text>
            {/* Callout Badge */}
            <rect x="10" y="10" width="85" height="20" rx="4" fill="#18181b" stroke="#3f3f46" />
            <text x="52" y="24" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="monospace" fontWeight="bold">EASY KNOCK-OFF</text>
          </svg>
        </div>
      );

    case 'blind':
      return (
        <div className={`${className} bg-neutral-950/80 rounded-xl flex items-center justify-center p-3 relative overflow-hidden border border-neutral-800 group-hover:border-amber-500/40 transition-colors`}>
          <div className="absolute inset-0 bg-radial-molten opacity-20 pointer-events-none" />
          <svg viewBox="0 0 220 180" className="w-full h-full max-h-40 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="blindSleeveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8d765d" />
                <stop offset="35%" stopColor="#c5b29b" />
                <stop offset="70%" stopColor="#9a836a" />
                <stop offset="100%" stopColor="#634f3c" />
              </linearGradient>
            </defs>
            {/* Body */}
            <rect x="48" y="60" width="124" height="85" fill="url(#blindSleeveGrad)" />
            {/* Closed Dome Top */}
            <path d="M 48 60 C 48 20, 172 20, 172 60 Z" fill="url(#blindSleeveGrad)" stroke="#7a644f" strokeWidth="2" />
            {/* Atmospheric Williams Air Breather Pin */}
            <rect x="106" y="14" width="8" height="28" rx="2" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
            <path d="M 110 14 L 110 5" stroke="#f59e0b" strokeWidth="2" strokeDasharray="2 2" />
            <text x="110" y="52" textAnchor="middle" fill="#fef3c7" fontSize="8" fontFamily="monospace">AIR RELIEF CORE</text>
            {/* Bottom Open Rim */}
            <ellipse cx="110" cy="145" rx="62" ry="16" fill="#4d3c2c" />
            <ellipse cx="110" cy="145" rx="42" ry="10" fill="#18181b" />
            {/* Callout Badge */}
            <rect x="10" y="10" width="85" height="20" rx="4" fill="#18181b" stroke="#3f3f46" />
            <text x="52" y="24" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">CLOSED TOP DOME</text>
          </svg>
        </div>
      );

    case 'oval':
      return (
        <div className={`${className} bg-neutral-950/80 rounded-xl flex items-center justify-center p-3 relative overflow-hidden border border-neutral-800 group-hover:border-amber-500/40 transition-colors`}>
          <div className="absolute inset-0 bg-radial-molten opacity-20 pointer-events-none" />
          <svg viewBox="0 0 220 180" className="w-full h-full max-h-40 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ovalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9a8166" />
                <stop offset="40%" stopColor="#cdbda7" />
                <stop offset="80%" stopColor="#9b856e" />
                <stop offset="100%" stopColor="#675340" />
              </linearGradient>
            </defs>
            {/* Oval Body */}
            <rect x="35" y="48" width="150" height="95" rx="10" fill="url(#ovalGrad)" />
            {/* Top Ellipse Rim */}
            <ellipse cx="110" cy="48" rx="75" ry="18" fill="#cdbda7" stroke="#7e6750" strokeWidth="2" />
            <ellipse cx="110" cy="48" rx="52" ry="10" fill="#18181b" />
            {/* Bottom Ellipse */}
            <ellipse cx="110" cy="143" rx="75" ry="18" fill="#5e4c3b" />
            {/* Major/Minor Axis indicator lines */}
            <line x1="60" y1="48" x2="160" y2="48" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
            <text x="110" y="44" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="monospace">ELONGATED AXIS</text>
            {/* Callout Badge */}
            <rect x="10" y="10" width="85" height="20" rx="4" fill="#18181b" stroke="#3f3f46" />
            <text x="52" y="24" textAnchor="middle" fill="#a855f7" fontSize="9" fontFamily="monospace" fontWeight="bold">NARROW SPACES</text>
          </svg>
        </div>
      );

    case 'insulating':
      return (
        <div className={`${className} bg-neutral-950/80 rounded-xl flex items-center justify-center p-3 relative overflow-hidden border border-neutral-800 group-hover:border-blue-500/40 transition-colors`}>
          <svg viewBox="0 0 220 180" className="w-full h-full max-h-40 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="insulGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cfd3da" />
                <stop offset="40%" stopColor="#f3f4f6" />
                <stop offset="80%" stopColor="#d1d5db" />
                <stop offset="100%" stopColor="#9ca3af" />
              </linearGradient>
            </defs>
            {/* Lightweight ceramic fiber body */}
            <rect x="52" y="44" width="116" height="105" rx="5" fill="url(#insulGrad)" />
            {/* Top Rim */}
            <ellipse cx="110" cy="44" rx="58" ry="16" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2" />
            <ellipse cx="110" cy="44" rx="38" ry="10" fill="#1e293b" />
            {/* Bottom Rim */}
            <ellipse cx="110" cy="149" rx="58" ry="16" fill="#9ca3af" />
            {/* Ceramic fiber texture waves */}
            <path d="M 65 75 Q 85 70 110 75 T 155 75" stroke="#94a3b8" strokeWidth="1" opacity="0.6" fill="none" />
            <path d="M 65 105 Q 85 100 110 105 T 155 105" stroke="#94a3b8" strokeWidth="1" opacity="0.6" fill="none" />
            {/* Callout Badge */}
            <rect x="10" y="10" width="85" height="20" rx="4" fill="#18181b" stroke="#3f3f46" />
            <text x="52" y="24" textAnchor="middle" fill="#60a5fa" fontSize="9" fontFamily="monospace" fontWeight="bold">NON-EXOTHERMIC</text>
          </svg>
        </div>
      );

    case 'directpour':
      return (
        <div className={`${className} bg-neutral-950/80 rounded-xl flex items-center justify-center p-3 relative overflow-hidden border border-neutral-800 group-hover:border-amber-500/40 transition-colors`}>
          <div className="absolute inset-0 bg-radial-molten opacity-20 pointer-events-none" />
          <svg viewBox="0 0 220 180" className="w-full h-full max-h-40 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="dpGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9a8166" />
                <stop offset="30%" stopColor="#d1c0a9" />
                <stop offset="70%" stopColor="#9a8166" />
                <stop offset="100%" stopColor="#675340" />
              </linearGradient>
            </defs>
            {/* Top Pouring Funnel Cup */}
            <path d="M 30 35 L 190 35 L 155 75 L 65 75 Z" fill="url(#dpGrad)" stroke="#7e6750" strokeWidth="1.5" />
            <ellipse cx="110" cy="35" rx="80" ry="18" fill="#d1c0a9" stroke="#7e6750" strokeWidth="2" />
            <ellipse cx="110" cy="35" rx="55" ry="11" fill="#18181b" />
            {/* Ceramic Foam Filter Seat Grid */}
            <rect x="75" y="74" width="70" height="12" rx="2" fill="#52525b" stroke="#f59e0b" strokeWidth="1.5" />
            <line x1="85" y1="74" x2="85" y2="86" stroke="#f59e0b" strokeWidth="1" />
            <line x1="95" y1="74" x2="95" y2="86" stroke="#f59e0b" strokeWidth="1" />
            <line x1="105" y1="74" x2="105" y2="86" stroke="#f59e0b" strokeWidth="1" />
            <line x1="115" y1="74" x2="115" y2="86" stroke="#f59e0b" strokeWidth="1" />
            <line x1="125" y1="74" x2="125" y2="86" stroke="#f59e0b" strokeWidth="1" />
            <line x1="135" y1="74" x2="135" y2="86" stroke="#f59e0b" strokeWidth="1" />
            <text x="110" y="83" textAnchor="middle" fill="#fef08a" fontSize="7" fontFamily="monospace" fontWeight="bold">FILTER SEAT</text>
            {/* Lower Sleeve Tube */}
            <rect x="65" y="86" width="90" height="60" fill="url(#dpGrad)" />
            <ellipse cx="110" cy="146" rx="45" ry="12" fill="#503f30" />
            {/* Callout Badge */}
            <rect x="10" y="10" width="85" height="20" rx="4" fill="#18181b" stroke="#3f3f46" />
            <text x="52" y="24" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="monospace" fontWeight="bold">POUR + FEED</text>
          </svg>
        </div>
      );

    case 'powder_apc':
      return (
        <div className={`${className} bg-neutral-950/80 rounded-xl flex items-center justify-center p-3 relative overflow-hidden border border-neutral-800 group-hover:border-emerald-500/40 transition-colors`}>
          <svg viewBox="0 0 220 180" className="w-full h-full max-h-40 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bagGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="35%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#f3f4f6" />
                <stop offset="100%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            {/* Bag Shape */}
            <path d="M 60 30 L 160 30 L 168 150 L 52 150 Z" fill="url(#bagGrad)" stroke="#9ca3af" strokeWidth="2" />
            {/* Stitched Top Seal */}
            <rect x="58" y="26" width="104" height="8" rx="2" fill="#d97706" />
            <line x1="60" y1="30" x2="160" y2="30" stroke="#fef3c7" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Printed Brand Label on Bag (from PDF Page 6) */}
            <text x="110" y="62" textAnchor="middle" fill="#111827" fontSize="16" fontFamily="sans-serif" fontWeight="900">NAVEXO</text>
            <rect x="68" y="75" width="84" height="28" rx="4" fill="#1f2937" />
            <text x="110" y="93" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="sans-serif" fontWeight="bold">APC POWDER</text>
            <text x="110" y="125" textAnchor="middle" fill="#dc2626" fontSize="15" fontFamily="sans-serif" fontWeight="900">25 KG</text>
            <text x="110" y="142" textAnchor="middle" fill="#4b5563" fontSize="8" fontFamily="monospace">ANTI-PIPING COMPOUND</text>
          </svg>
        </div>
      );

    case 'powder_exo':
      return (
        <div className={`${className} bg-neutral-950/80 rounded-xl flex items-center justify-center p-3 relative overflow-hidden border border-neutral-800 group-hover:border-red-500/40 transition-colors`}>
          <div className="absolute inset-0 bg-radial-molten opacity-20 pointer-events-none" />
          <svg viewBox="0 0 220 180" className="w-full h-full max-h-40 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bagExoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="35%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#f3f4f6" />
                <stop offset="100%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            {/* Bag Shape */}
            <path d="M 60 30 L 160 30 L 168 150 L 52 150 Z" fill="url(#bagExoGrad)" stroke="#9ca3af" strokeWidth="2" />
            {/* Stitched Top Seal */}
            <rect x="58" y="26" width="104" height="8" rx="2" fill="#ea580c" />
            <line x1="60" y1="30" x2="160" y2="30" stroke="#ffedd5" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Printed Brand Label on Bag (from PDF Page 6) */}
            <text x="110" y="62" textAnchor="middle" fill="#111827" fontSize="16" fontFamily="sans-serif" fontWeight="900">NAVEXO</text>
            <rect x="65" y="75" width="90" height="30" rx="4" fill="#ea580c" />
            <text x="110" y="87" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="sans-serif" fontWeight="bold">EXOTHERMIC</text>
            <text x="110" y="99" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="sans-serif" fontWeight="bold">POWDER</text>
            <text x="110" y="125" textAnchor="middle" fill="#111827" fontSize="15" fontFamily="sans-serif" fontWeight="900">25 KG</text>
            <text x="110" y="142" textAnchor="middle" fill="#b91c1c" fontSize="8" fontFamily="monospace">HIGH HEAT RISER COVER</text>
          </svg>
        </div>
      );

    default:
      return null;
  }
};
