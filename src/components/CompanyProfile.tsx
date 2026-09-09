import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ExternalLink, 
  CheckCircle2, 
  Award, 
  Factory, 
  Share2,
  Instagram,
  Linkedin
} from 'lucide-react';

export const CompanyProfile: React.FC = () => {
  return (
    <section id="about" className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Company Story & Mission */}
          <div className="lg:col-span-7 p-8 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold mb-3">
                  <Factory className="w-3.5 h-3.5" />
                  <span>Foundry Solutions Leader</span>
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                  Built for Better Feedings. Designed for Foundries.
                </h2>
                <h3 className="text-sm font-semibold text-amber-500 mt-1 uppercase tracking-wider font-mono">
                  NAVEXO • A Brand of Navya Enterprises, Ludhiana
                </h3>
              </div>

              <p className="text-neutral-300 text-sm leading-relaxed">
                <strong className="text-white">NAVEXO</strong> is the dedicated foundry solutions brand of <strong className="text-white">Navya Enterprises</strong>, Ludhiana. We manufacture and supply high-performance exothermic riser sleeves, insulating sleeves, blind sleeves, direct-pour systems, and feeding consumables developed to support controlled solidification, dependable feeding, and maximized casting yield.
              </p>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
                  <span className="text-xs font-mono uppercase text-amber-500 font-bold block">Our Focus</span>
                  <p className="text-xs text-neutral-300">
                    Consistent sleeve geometry, dependable thermal performance, and practical configurations for iron, steel, and alloy casting applications.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
                  <span className="text-xs font-mono uppercase text-emerald-400 font-bold block">Why Foundries Choose Us</span>
                  <p className="text-xs text-neutral-300">
                    Proven riser volume reduction, lower fettling costs, zero shrinkage rejections, and direct technical engineering support.
                  </p>
                </div>
              </div>

              {/* Bullet Advantages from PDF */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  The Navexo Advantage
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Improved feeding efficiency (up to 65%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Reduced riser metal weight</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Higher finished casting yield</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Eliminates shrinkage & porosity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Custom pattern sizes & neck profiles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Foundry-focused on-site support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details & Official Profiles */}
          <div className="lg:col-span-5 p-8 sm:p-10 bg-neutral-950 border-t lg:border-t-0 lg:border-l border-neutral-800 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-500 block">
                  Get In Touch
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Let's Build Better Castings Together
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  For product selection, custom sizes, technical consultation, and commercial inquiries.
                </p>
              </div>

              {/* Direct Info list */}
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-neutral-500 font-mono block">Plant & Office Address</span>
                    <span className="text-white font-medium block mt-0.5">
                      Navya Enterprises, Vill. Nichi Mangli, Premier Complex, Near Isher Kanda, Chandigarh Road, Ludhiana, Punjab, India
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-neutral-500 font-mono block">Direct Phone & WhatsApp</span>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-0.5 font-mono">
                      <a href="tel:+918288875986" className="text-white hover:text-amber-400 transition-colors">
                        +91 82888-75986
                      </a>
                      <a href="tel:+919988155383" className="text-white hover:text-amber-400 transition-colors">
                        +91 99881-55383
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-neutral-500 font-mono block">Official Email</span>
                    <a href="mailto:navyaexo@gmail.com" className="text-white font-mono hover:text-amber-400 transition-colors block mt-0.5">
                      navyaexo@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Verified Digital Profiles */}
              <div className="pt-4 border-t border-neutral-800">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
                  Verified Industry Channels
                </span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                    <div className="flex items-center gap-2.5">
                      <Linkedin className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-white font-medium">LinkedIn</span>
                    </div>
                    <span className="text-xs font-mono text-neutral-400">Navya Enterprises</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-white font-medium">IndiaMART Verified</span>
                    </div>
                    <span className="text-xs font-mono text-neutral-400">Navya Enterprises</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                    <div className="flex items-center gap-2.5">
                      <Instagram className="w-4 h-4 text-pink-400" />
                      <span className="text-xs text-white font-medium">Instagram</span>
                    </div>
                    <span className="text-xs font-mono text-neutral-400">@Navexo_ind</span>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/918288875986?text=Hello%20Navya%20Enterprises%2C%20I%20would%20like%20to%20visit%20your%20Ludhiana%20works%20or%20request%20samples."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>Connect with Works on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
