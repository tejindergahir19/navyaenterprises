export interface SleeveProduct {
  id: string;
  name: string;
  category: 'exothermic' | 'insulating' | 'powder';
  tagline: string;
  description: string;
  features: string[];
  specs: {
    modulusRange: string;
    maxPouringTemp: string;
    ignitionTemp: string;
    heatOutput: string;
    bulkDensity: string;
    metalSuitability: string[];
  };
  sizes: {
    code: string;
    innerDiameter: number; // mm
    outerDiameter: number; // mm
    height: number; // mm
    modulus: number; // cm
    volumeDm3: number;
  }[];
  modelType: 'open' | 'neckdown' | 'blind' | 'oval' | 'insulating' | 'directpour' | 'powder_apc' | 'powder_exo';
  pdfPage: number;
  benefits: string[];
}

export interface CalculationInput {
  metalType: 'grey_iron' | 'ductile_iron' | 'steel' | 'alloy_steel';
  castingWeight: number; // kg
  castingModulus: number; // cm
  castingQuantity: number;
  currentRiserType: 'sand' | 'insulating';
}

export interface CalculationResult {
  requiredModulus: number;
  recommendedSleeve: string;
  sleeveModulus: number;
  sandRiserWeight: number; // kg
  navexoRiserWeight: number; // kg
  metalSavedPerCasting: number; // kg
  totalMetalSavedTons: number; // tons
  yieldIncreasePercent: number; // %
  costSavingsEstimatedINR: number; // INR
}

export interface RFQFormData {
  fullName: string;
  companyName: string;
  city: string;
  phone: string;
  productType: string;
  metalGrade: string;
  sizeOrModulus: string;
  estimatedQuantity: string;
  notes: string;
  contactNumber: '8288875986' | '9988155383';
}
