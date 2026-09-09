import React, { useState } from 'react';
import { 
  Flame, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Linkedin, 
  Instagram, 
  Github, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [showDeploymentGuide, setShowDeploymentGuide] = useState<boolean>(false);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  const deployCommand = 
`# Step 1: Install dependencies and build static assets
npm install
npm run build

# Step 2: Push the generated dist/ directory to your GitHub Pages branch
# Option A: Using gh-pages CLI
npx gh-pages -d dist

# Option B: Manual git push to gh-pages branch
cd dist
git init
git add -A
git commit -m "Deploy Navexo to GitHub Pages"
git branch -M gh-pages
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin gh-pages --force`;

  const copyDeployScript = () => {
    navigator.clipboard.writeText(deployCommand);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  return (
    <footer className="w-full bg-neutral-950 border-t border-neutral-800 pt-16 pb-12 text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
                <Flame className="w-5 h-5 fill-amber-200 text-amber-100" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white font-display">
                  NAV<span className="text-amber-500">EXO</span>
                </span>
                <span className="text-[10px] block font-mono text-neutral-400">
                  Navya Enterprises • Ludhiana
                </span>
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Dedicated foundry solutions brand of Navya Enterprises. Manufacturing premium exothermic and insulating riser sleeves, blind risers, neck-down sleeves, and feeding consumables for iron, steel, and alloy castings.
            </p>

            <div className="pt-1 flex items-center gap-3 text-neutral-400">
              <a 
                href="https://wa.me/918288875986" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
                title="WhatsApp Chat"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a 
                href="mailto:navyaexo@gmail.com" 
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                title="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
              <div 
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400"
                title="Navya Enterprises LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </div>
              <div 
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400"
                title="IndiaMART Verified"
              >
                <Globe className="w-4 h-4" />
              </div>
              <div 
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400"
                title="Instagram @Navexo_ind"
              >
                <Instagram className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Product Solutions
            </h4>
            <ul className="space-y-2">
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">Exothermic Open Sleeves</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">Neck-Down Sleeves</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">Blind Atmospheric Sleeves</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">Oval Sleeves</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">High-Thermal Insulating</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">Direct Pour Sleeves</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">APC Powder (25KG)</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">Exothermic Powder (25KG)</a></li>
            </ul>
          </div>

          {/* Foundry Engineering Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Foundry Tools
            </h4>
            <ul className="space-y-2">
              <li><a href="#3d-studio" className="hover:text-amber-400 transition-colors">3D Sleeve CAD Studio</a></li>
              <li><a href="#yield-calculator" className="hover:text-amber-400 transition-colors">Modulus & Yield Estimator</a></li>
              <li><a href="#thermal-science" className="hover:text-amber-400 transition-colors">Chvorinov's Rule Guide</a></li>
              <li><a href="#thermal-science" className="hover:text-amber-400 transition-colors">Shrinkage Defect Guide</a></li>
              <li><a href="#quality" className="hover:text-amber-400 transition-colors">Burn Test Verification</a></li>
              <li><a href="#request-quote" className="hover:text-amber-400 transition-colors">Instant WhatsApp RFQ</a></li>
            </ul>
          </div>

          {/* Ludhiana Plant Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Manufacturing Works
            </h4>
            <div className="space-y-2.5 text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Vill. Nichi Mangli, Premier Complex, Near Isher Kanda, Chandigarh Road, Ludhiana, Punjab, India</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="tel:+918288875986" className="hover:text-white">+91 82888 75986</a>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="tel:+919988155383" className="hover:text-white">+91 99881 55383</a>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:navyaexo@gmail.com" className="hover:text-white">navyaexo@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* GitHub Pages Deployment Accordion (Requested by user) */}
        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
          <button
            onClick={() => setShowDeploymentGuide(!showDeploymentGuide)}
            className="w-full flex items-center justify-between text-left text-xs font-mono text-neutral-300 hover:text-white"
          >
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4 text-white" />
              <span className="font-bold text-white">GitHub Pages Deployment Instructions</span>
              <span className="text-[10px] bg-neutral-800 text-amber-400 px-2 py-0.5 rounded">Ready: base="./" configured</span>
            </div>
            {showDeploymentGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showDeploymentGuide && (
            <div className="pt-2 border-t border-neutral-800 space-y-3">
              <p className="text-xs text-neutral-300">
                This project is configured with relative base paths (<code className="text-amber-400">base: './'</code> in <code className="text-neutral-200">vite.config.ts</code>), making it fully compatible with GitHub Pages sub-path hosting without 404 broken asset errors.
              </p>

              <div className="relative">
                <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-neutral-300 overflow-x-auto">
                  {deployCommand}
                </pre>
                <button
                  onClick={copyDeployScript}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white flex items-center gap-1 text-[10px] font-mono cursor-pointer"
                >
                  {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedScript ? 'Copied!' : 'Copy Script'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div>
            © {new Date().getFullYear()} NAVEXO (A Brand of Navya Enterprises, Ludhiana). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Engineered Exothermic Riser Sleeves</span>
            <span>•</span>
            <span>Zero Shrinkage Defects</span>
          </div>
        </div>

        {/* Creator Attribution - Centered at the very end of the website */}
        <div className="pt-6 pb-2 text-center text-xs text-neutral-400 flex items-center justify-center gap-1.5 font-sans">
          <span>Made with</span>
          <span className="text-red-500 inline-block animate-pulse" role="img" aria-label="love">❤️</span>
          <span>by</span>
          <a
            href="https://in.linkedin.com/in/tejindergahir19"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 font-semibold hover:underline underline-offset-4 transition-colors"
          >
            Tejinder Singh
          </a>
        </div>
      </div>
    </footer>
  );
};
