import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Building2, 
  MapPin, 
  User, 
  Phone, 
  Package, 
  Cpu, 
  Scale, 
  Copy, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { RFQFormData } from '../types';

interface WhatsAppRequestFormProps {
  prefilledProduct?: string;
  prefilledSize?: string;
}

export const WhatsAppRequestForm: React.FC<WhatsAppRequestFormProps> = ({
  prefilledProduct = 'Exothermic Open Sleeves',
  prefilledSize = ''
}) => {
  const [formData, setFormData] = useState<RFQFormData>({
    fullName: '',
    companyName: '',
    city: '',
    phone: '',
    productType: prefilledProduct,
    metalGrade: 'Ductile / SG Iron (SG400/500)',
    sizeOrModulus: prefilledSize || '60/90 or Modulus ~1.5 cm',
    estimatedQuantity: 'Trial Batch (200 - 500 pcs)',
    notes: '',
    contactNumber: '8288875986', // Default to primary contact from PDF
  });

  const [copied, setCopied] = useState<boolean>(false);
  const [lastSubmittedTime, setLastSubmittedTime] = useState<string | null>(null);

  // Generate structured WhatsApp message
  const constructWhatsAppMessage = () => {
    return (
      `*NAVEXO FOUNDRY ENQUIRY & RFQ*\n` +
      `-----------------------------------------\n` +
      `*Client:* ${formData.fullName || 'Foundry Engineer'}\n` +
      `*Foundry / Company:* ${formData.companyName || 'Not specified'}\n` +
      `*Location:* ${formData.city || 'India'}\n` +
      `*Contact Phone:* ${formData.phone || 'Direct WhatsApp'}\n\n` +
      `*REQUIREMENTS:*\n` +
      `• *Product:* ${formData.productType}\n` +
      `• *Metal Grade:* ${formData.metalGrade}\n` +
      `• *Sleeve Size / Modulus:* ${formData.sizeOrModulus || 'Standard'}\n` +
      `• *Estimated Volume:* ${formData.estimatedQuantity}\n` +
      (formData.notes ? `• *Special Notes / Drawing Ref:* ${formData.notes}\n` : '') +
      `-----------------------------------------\n` +
      `Please provide quotation with FOB / Ex-Works Ludhiana dispatch timeline and technical datasheet.`
    );
  };

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const rawPhone = formData.contactNumber === '8288875986' ? '918288875986' : '919988155383';
    const message = constructWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(message)}`;
    
    setLastSubmittedTime(new Date().toLocaleTimeString());
    window.open(whatsappUrl, '_blank');
  };

  const copyMessageToClipboard = () => {
    navigator.clipboard.writeText(constructWhatsAppMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div id="request-quote" className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Informational & Contact Highlights */}
        <div className="lg:col-span-5 p-8 bg-gradient-to-br from-neutral-950 via-neutral-900 to-amber-950/30 border-b lg:border-b-0 lg:border-r border-neutral-800 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium mb-3">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Instant WhatsApp Dispatch Desk</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                Request a Custom Foundry Quotation
              </h3>
              <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                Submit your casting feeding requirements. Upon clicking, this form immediately generates a detailed technical inquiry directly to <strong className="text-white">Navya Enterprises</strong> via WhatsApp.
              </p>
            </div>

            {/* Direct Phone Numbers from Catalog */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                Direct Contact Lines (Ludhiana Works)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://wa.me/918288875986"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-emerald-500/60 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-neutral-400 block">Primary WhatsApp</span>
                    <span className="text-xs font-mono font-bold text-white">+91 82888-75986</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/919988155383"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-emerald-500/60 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-neutral-400 block">Secondary Line</span>
                    <span className="text-xs font-mono font-bold text-white">+91 99881-55383</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Quality Commitments */}
            <div className="space-y-2.5 pt-4 border-t border-neutral-800 text-xs text-neutral-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Samples available for foundry trial molds</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Custom sleeve tooling and breaker core geometries</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Ex-stock dispatch from Ludhiana, Punjab facility</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Official email: <strong className="text-white ml-1">navyaexo@gmail.com</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Area */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-neutral-950 flex flex-col justify-between">
          <form onSubmit={handleWhatsAppRedirect} className="space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Foundry Enquiry Details
              </span>
              <span className="text-[11px] text-neutral-400 font-mono">
                Opens directly in WhatsApp
              </span>
            </div>

            {/* Name and Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-neutral-400" />
                  Your Name / Designation *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Kumar (Foundry Manager)"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                  Foundry / Company Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Castings Pvt Ltd"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            {/* City & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  City, State / Country *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ludhiana, Punjab / Rajkot / Coimbatore"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-neutral-400" />
                  Your Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            {/* Product & Metal Grade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-neutral-400" />
                  Product of Interest *
                </label>
                <select
                  value={formData.productType}
                  onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {PRODUCTS.map(p => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                  <option value="Custom Sleeves / Tailored Foundry Tooling">Custom Sleeves / Tooling</option>
                  <option value="Complete Feeding Package (Sleeves + APC Powder)">Complete Feeding Package</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-neutral-400" />
                  Metal / Alloy Grade
                </label>
                <select
                  value={formData.metalGrade}
                  onChange={(e) => setFormData({ ...formData, metalGrade: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="Ductile / SG Iron (SG400/500/600)">Ductile / SG Iron (SG400/500/600)</option>
                  <option value="Grey Cast Iron (FG 200 - FG 300)">Grey Cast Iron (FG 200 - FG 300)</option>
                  <option value="Plain Carbon Steel (WCB / LCB)">Plain Carbon Steel (WCB / LCB)</option>
                  <option value="Alloy Steel / Stainless Steel">Alloy Steel / Stainless Steel</option>
                  <option value="Manganese Steel / High Chrome">Manganese Steel / High Chrome</option>
                  <option value="Non-Ferrous (Bronze / Aluminum)">Non-Ferrous (Bronze / Aluminum)</option>
                </select>
              </div>
            </div>

            {/* Size & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-neutral-400" />
                  Sleeve Size / Modulus (Mf)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 70/100, 80/110 or Modulus 1.8 cm"
                  value={formData.sizeOrModulus}
                  onChange={(e) => setFormData({ ...formData, sizeOrModulus: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Estimated Quantity / Requirement
                </label>
                <select
                  value={formData.estimatedQuantity}
                  onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="Trial Batch (100 - 300 pcs)">Trial Batch (100 - 300 pcs)</option>
                  <option value="Monthly 500 - 1,500 pcs">Monthly 500 - 1,500 pcs</option>
                  <option value="Monthly 2,000 - 5,000 pcs">Monthly 2,000 - 5,000 pcs</option>
                  <option value="Bulk Order (> 10,000 pcs)">Bulk Order (&gt; 10,000 pcs)</option>
                  <option value="Powder: 10 - 50 Bags (25KG each)">Powder: 10 - 50 Bags (25KG each)</option>
                  <option value="Powder: 100+ Bags (Full Truckload)">Powder: 100+ Bags (Full Truckload)</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Casting Notes, Weight, or Shrinkage Problem (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Mention casting weight, isolated hot spots, current scrap rate, or specific dimensional tolerances..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors resize-none"
              />
            </div>

            {/* Target Contact Number Radio Selection */}
            <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
              <span className="text-xs font-mono text-neutral-400 block mb-2">
                Route Request to WhatsApp Number:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className={`flex items-center gap-2.5 p-2 rounded-lg border cursor-pointer transition-colors ${
                  formData.contactNumber === '8288875986'
                    ? 'bg-amber-500/10 border-amber-500/50 text-white'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                }`}>
                  <input
                    type="radio"
                    name="contactNumber"
                    value="8288875986"
                    checked={formData.contactNumber === '8288875986'}
                    onChange={() => setFormData({ ...formData, contactNumber: '8288875986' })}
                    className="accent-amber-500"
                  />
                  <div className="text-xs">
                    <span className="font-semibold block">+91 82888-75986</span>
                    <span className="text-[10px] text-neutral-400">Sales & Dispatch Desk</span>
                  </div>
                </label>

                <label className={`flex items-center gap-2.5 p-2 rounded-lg border cursor-pointer transition-colors ${
                  formData.contactNumber === '9988155383'
                    ? 'bg-amber-500/10 border-amber-500/50 text-white'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                }`}>
                  <input
                    type="radio"
                    name="contactNumber"
                    value="9988155383"
                    checked={formData.contactNumber === '9988155383'}
                    onChange={() => setFormData({ ...formData, contactNumber: '9988155383' })}
                    className="accent-amber-500"
                  />
                  <div className="text-xs">
                    <span className="font-semibold block">+91 99881-55383</span>
                    <span className="text-[10px] text-neutral-400">Foundry Technical Works</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                id="submit-whatsapp-rfq-btn"
                className="flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950 transition-all cursor-pointer hover:shadow-emerald-900/40"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Send Request via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={copyMessageToClipboard}
                className="py-3 px-4 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Copy formatted message text"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
              </button>
            </div>

            {lastSubmittedTime && (
              <p className="text-xs text-center text-emerald-400 font-mono">
                Redirected to wa.me/{formData.contactNumber === '8288875986' ? '918288875986' : '919988155383'} at {lastSubmittedTime}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
