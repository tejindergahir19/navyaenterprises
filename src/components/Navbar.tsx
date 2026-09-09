import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Phone, 
  Menu, 
  X, 
  ArrowRight,
  Layers,
  Calculator,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface NavbarProps {
  onOpenWhatsAppRFQ: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWhatsAppRFQ }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '3D Sleeve CAD', href: '#3d-studio' },
    { label: 'Products', href: '#catalog' },
    { label: 'Thermal Science', href: '#thermal-science' },
    { label: 'Yield Calculator', href: '#yield-calculator' },
    { label: 'Quality & Testing', href: '#quality' },
    { label: 'About Us', href: '#about' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 shadow-2xl py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Tag */}
        <a 
          href="#" 
          className="flex items-center gap-3 group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          {/* Flame mark inspired by PDF header */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-red-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 fill-amber-200 text-amber-100" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white font-display">
                NAV<span className="text-amber-500">EXO</span>
              </span>
              <span className="text-[10px] font-mono uppercase bg-neutral-800 text-amber-400 px-1.5 py-0.5 rounded font-bold">
                Foundry
              </span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400 block tracking-wider uppercase">
              Navya Enterprises • Ludhiana
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-neutral-900/60 p-1.5 rounded-full border border-neutral-800/80 backdrop-blur-sm">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition-all cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:+918288875986"
            className="flex items-center gap-1.5 text-xs font-mono text-neutral-300 hover:text-white px-3 py-2 rounded-lg bg-neutral-900/80 border border-neutral-800 transition-colors"
            title="Call Navya Enterprises Ludhiana"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>+91 82888-75986</span>
          </a>

          <button
            onClick={onOpenWhatsAppRFQ}
            className="flex items-center gap-2 py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950 transition-all cursor-pointer hover:shadow-emerald-900/40 whitespace-nowrap"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-white shrink-0" />
            <span>WhatsApp RFQ</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/95 border-b border-neutral-800 px-6 py-5 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left py-2 text-sm font-medium text-neutral-200 hover:text-amber-400 border-b border-neutral-900 transition-colors"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <a
                href="tel:+918288875986"
                className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-center text-white flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call +91 82888-75986</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenWhatsAppRFQ();
                }}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                <span>Submit RFQ on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
