import React, { useState } from 'react';
import { 
  Package, 
  Eye, 
  FileText, 
  Check, 
  X,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { PRODUCTS } from '../data/products';
import { SleeveProduct } from '../types';
import { ProductVisual } from './ProductVisual';

interface ProductCatalogProps {
  onSelectFor3D: (productId: string) => void;
  onSelectForQuote: (product: SleeveProduct, sizeCode?: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ 
  onSelectFor3D, 
  onSelectForQuote 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'exothermic' | 'insulating' | 'powder'>('all');
  const [detailModalProduct, setDetailModalProduct] = useState<SleeveProduct | null>(null);

  const filteredProducts = PRODUCTS.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const handleWhatsAppQuickOrder = (product: SleeveProduct) => {
    const text = encodeURIComponent(
      `Hello Navexo (Navya Enterprises),\n` +
      `I would like to order / get best factory price for:\n` +
      `*${product.name}*\n` +
      `Category: ${product.category}\n` +
      `Please share rates, minimum order quantity, and sample trial delivery to our foundry.`
    );
    window.open(`https://wa.me/918288875986?text=${text}`, '_blank');
  };

  return (
    <section id="catalog" className="w-full py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold mb-2.5">
            <Package className="w-3.5 h-3.5" />
            <span>Navya Enterprises Manufacturing Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Products
          </h2>
          <p className="text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed">
            High-efficiency riser sleeves and foundry consumables in stock at Ludhiana. Choose a product to inspect in 3D or order directly on WhatsApp.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-neutral-900 border border-neutral-800 rounded-2xl">
          {(['all', 'exothermic', 'insulating', 'powder'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-neutral-950 shadow-md font-extrabold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {cat === 'all' ? 'All Products (8)' : cat === 'exothermic' ? 'Exothermic Sleeves' : cat === 'insulating' ? 'Insulating Sleeves' : 'Covering Powders'}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid with ProductVisual SVGs on Every Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const isPowder = product.category === 'powder';
          return (
            <div
              key={product.id}
              className="bg-neutral-900/80 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-2xl"
            >
              <div>
                {/* Visual Product Shape Illustration / 3D Canvas Mock */}
                <div className="p-4 bg-neutral-950 border-b border-neutral-800">
                  <ProductVisual modelType={product.modelType} />
                </div>

                {/* Card Information */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                      product.category === 'exothermic'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : product.category === 'insulating'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {product.category}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">
                      Catalog Page {product.pdfPage}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-xs text-amber-500/90 font-medium">
                    {product.tagline}
                  </p>

                  <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  {/* Bullet Benefits */}
                  <div className="space-y-1.5 text-xs text-neutral-300 pt-2 border-t border-neutral-800/80">
                    {product.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Actions - Clean, Non-Overflowing, Sales Focused */}
              <div className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center gap-1.5 sm:gap-2">
                {!isPowder && (
                  <button
                    onClick={() => {
                      onSelectFor3D(product.id);
                      const el = document.getElementById('studio-3d');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 py-2 px-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap min-w-0"
                    title="View 3D Model (360°)"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">View 3D</span>
                  </button>
                )}

                <button
                  onClick={() => setDetailModalProduct(product)}
                  className={`${isPowder ? 'flex-1' : ''} py-2 px-3 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0`}
                  title="View Sizes & Technical Specs"
                >
                  <FileText className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                  <span>Sizes</span>
                </button>

                <button
                  onClick={() => handleWhatsAppQuickOrder(product)}
                  className="flex-1 py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md whitespace-nowrap min-w-0"
                  title="Inquire or Order on WhatsApp"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 fill-white" />
                  <span className="truncate">WhatsApp</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technical Size Chart & Spec Sheet Modal */}
      {detailModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-amber-400 font-semibold">
                  Standard Production Sizes
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {detailModalProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setDetailModalProduct(null)}
                className="p-2 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 overflow-y-auto space-y-4">
              <p className="text-xs text-neutral-300 leading-relaxed">
                {detailModalProduct.description}
              </p>

              {/* Standard Dimensions Table */}
              {detailModalProduct.sizes.length > 0 && detailModalProduct.sizes[0].innerDiameter > 0 ? (
                <div>
                  <h4 className="text-xs font-mono uppercase text-neutral-400 mb-2 font-bold">Standard Size Table (mm)</h4>
                  <div className="overflow-x-auto border border-neutral-800 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-950 text-neutral-400 font-mono text-[11px] uppercase border-b border-neutral-800">
                        <tr>
                          <th className="p-2.5">Code</th>
                          <th className="p-2.5">Inner Ø (mm)</th>
                          <th className="p-2.5">Outer Ø (mm)</th>
                          <th className="p-2.5">Height (mm)</th>
                          <th className="p-2.5 text-amber-400">Modulus (cm)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800 font-mono text-neutral-300">
                        {detailModalProduct.sizes.map((s, idx) => (
                          <tr key={idx} className="hover:bg-neutral-800/40">
                            <td className="p-2.5 font-bold text-white">{s.code}</td>
                            <td className="p-2.5">{s.innerDiameter}</td>
                            <td className="p-2.5">{s.outerDiameter}</td>
                            <td className="p-2.5">{s.height}</td>
                            <td className="p-2.5 text-amber-400 font-bold">{s.modulus}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300">
                  Standard packaging: <strong>25 KG moisture-proof laminated bags</strong>. Ready for palletized dispatch from Ludhiana plant.
                </div>
              )}
            </div>

            {/* Modal Footer CTA */}
            <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between gap-3">
              <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
                Custom sizes manufactured to pattern pins
              </span>

              <button
                onClick={() => {
                  const prod = detailModalProduct;
                  setDetailModalProduct(null);
                  handleWhatsAppQuickOrder(prod);
                }}
                className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                <span>Get Price on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
