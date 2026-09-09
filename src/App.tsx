import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Sleeve3DViewer } from './components/Sleeve3DViewer';
import { ProductCatalog } from './components/ProductCatalog';
import { ThermalScience } from './components/ThermalScience';
import { YieldCalculator } from './components/YieldCalculator';
import { QualityAndProduction } from './components/QualityAndProduction';
import { WhatsAppRequestForm } from './components/WhatsAppRequestForm';
import { CompanyProfile } from './components/CompanyProfile';
import { Footer } from './components/Footer';
import { QuickWhatsAppFloat } from './components/QuickWhatsAppFloat';
import { FoundryChatbot } from './components/FoundryChatbot';
import { SleeveProduct } from './types';

export default function App() {
  const [active3DProductId, setActive3DProductId] = useState<string>('open-sleeves');
  const [rfqPrefill, setRfqPrefill] = useState<{ product: string; size: string }>({
    product: 'Exothermic Open Sleeves',
    size: '60/90 (Mf: 1.52 cm)',
  });

  const handleSelectFor3D = (productId: string) => {
    setActive3DProductId(productId);
  };

  const handleSelectForQuote = (product: SleeveProduct, sizeCode?: string) => {
    setRfqPrefill({
      product: product.name,
      size: sizeCode || (product.sizes.length > 0 ? product.sizes[0].code : ''),
    });
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-neutral-100 selection:bg-amber-500 selection:text-neutral-950 flex flex-col font-sans bg-foundry-grid">
      {/* Navigation */}
      <Navbar 
        onOpenWhatsAppRFQ={() => scrollToSection('request-quote')} 
      />

      {/* Main Page Sections */}
      <main className="flex-grow space-y-8 sm:space-y-16">
        {/* 1. Hero Section */}
        <Hero 
          onExplore3D={() => scrollToSection('3d-studio')}
          onOpenRFQ={() => scrollToSection('request-quote')}
        />

        {/* 2. Interactive 3D CAD Sleeve Studio */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Sleeve3DViewer 
            initialProductId={active3DProductId}
            onSelectForQuote={handleSelectForQuote}
          />
        </section>

        {/* 3. Official Product Lineup */}
        <ProductCatalog 
          onSelectFor3D={handleSelectFor3D}
          onSelectForQuote={handleSelectForQuote}
        />

        {/* 4. Deep Thermal Science & Metallurgy */}
        <ThermalScience />

        {/* 5. Interactive Casting Yield & Modulus Estimator */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <YieldCalculator />
        </section>

        {/* 6. Performance & Quality Testing (from PDF) */}
        <QualityAndProduction />

        {/* 7. Dedicated WhatsApp RFQ Form */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WhatsAppRequestForm 
            prefilledProduct={rfqPrefill.product}
            prefilledSize={rfqPrefill.size}
          />
        </section>

        {/* 8. Company Profile & Ludhiana Works */}
        <CompanyProfile />
      </main>

      {/* Footer with GitHub Pages Deployment instructions */}
      <Footer />

      {/* Floating Instant WhatsApp Button */}
      <QuickWhatsAppFloat />

      {/* Floating Technical Formula & Sales Assistant Chatbot */}
      <FoundryChatbot />
    </div>
  );
}
