import React, { useState } from 'react';
import { X, Phone, ArrowUpRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const QuickWhatsAppFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenWhatsApp = (phoneNum: string) => {
    const text = encodeURIComponent(
      `Hello Navexo (Navya Enterprises),\n` +
      `I am visiting your website and would like to inquire about exothermic riser sleeves and feeding solutions for our foundry.`
    );
    window.open(`https://wa.me/${phoneNum}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 sm:gap-3">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-4 shadow-2xl w-[calc(100vw-2rem)] sm:w-72 max-w-xs backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-white">Foundry Support Online</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-neutral-300 mb-3 leading-relaxed">
            Need sleeve size recommendations or custom quotation for your casting patterns? Chat directly with our Ludhiana engineering desk:
          </p>

          <div className="space-y-2">
            <button
              onClick={() => handleOpenWhatsApp('918288875986')}
              className="w-full p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-between transition-colors shadow-md cursor-pointer whitespace-nowrap"
            >
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                <span>+91 82888-75986 (Sales)</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </button>

            <button
              onClick={() => handleOpenWhatsApp('919988155383')}
              className="w-full p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium flex items-center justify-between transition-colors cursor-pointer whitespace-nowrap"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 99881-55383 (Works)</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            </button>
          </div>
        </div>
      )}

      {/* Trigger Floating Action Button - Compact on mobile, spacious on tablet/PC */}
      <button
        id="quick-whatsapp-float-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 sm:h-14 px-3 sm:px-5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm flex items-center gap-2 sm:gap-2.5 shadow-2xl shadow-emerald-950/80 border border-emerald-300/40 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap group"
        aria-label="Chat with Navexo on WhatsApp"
      >
        <WhatsAppIcon className="w-4.5 h-4.5 sm:w-6 sm:h-6 fill-white shrink-0 group-hover:scale-110 transition-transform" />
        <span className="font-bold text-xs sm:text-sm text-white tracking-normal whitespace-nowrap">
          <span className="inline sm:hidden">WhatsApp</span>
          <span className="hidden sm:inline">Chat on WhatsApp</span>
        </span>
        <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0 hidden sm:inline-block" />
      </button>
    </div>
  );
};
