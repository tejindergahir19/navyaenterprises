export interface DefectExplanation {
  name: string;
  cause: string;
  consequence: string;
  navexoSolution: string;
  severity: 'Critical' | 'High' | 'Moderate';
}

export interface ComparisonMetric {
  parameter: string;
  greenSandRiser: string;
  insulatingSleeve: string;
  navexoExothermicSleeve: string;
  advantage: string;
}

export const THERMAL_SCIENCE = {
  title: 'Thermal Dynamics & Shrinkage Defect Prevention in Metal Casting',
  subtitle: 'Understanding the Metallurgy, Heat Transfer, and Modulus Calculations Behind Riser Sleeves',
  
  chvorinovRule: {
    formula: 't_s = C_m \\cdot \\left(\\frac{V}{A}\\right)^2 = C_m \\cdot M^2',
    explanation: "Formulated by Nicolas Chvorinov, this law dictates that the solidification time (t_s) of any metal volume is directly proportional to the square of its Modulus (M = Volume / Surface Cooling Area). For a riser to feed successfully, its solidification time must be strictly longer than that of the casting section it feeds (M_riser >= 1.2 x M_casting).",
    problemWithSand: "In conventional green sand molds, sand has high thermal conductivity. The riser loses heat rapidly in all directions. To keep the feeder liquid longer than the casting, foundries are forced to make the sand riser enormous—often 40% to 60% of the total poured weight, crippling casting yield.",
    exothermicBreakthrough: "Navexo Exothermic Sleeves introduce supplemental heat through an engineered aluminothermic reaction upon contact with molten metal (1200°C - 1450°C). This dramatically delays solidification, giving the feeder an 'apparent modulus' 1.4x to 1.6x greater than its geometric modulus, cutting required feeder volume by up to 70%."
  },

  thermalProperties: [
    {
      title: 'Controlled Exothermic Ignition & Peak Temperature',
      metric: 'Peak Heat: 1,450°C - 1,550°C',
      description: 'Upon contact with liquid metal, high-purity aluminum and tailored oxidizers ignite in a controlled reaction. Rather than flash-burning, Navexo sleeves deliver a sustained exothermic plateau lasting 3 to 12 minutes depending on sleeve diameter, preventing premature neck freezing.'
    },
    {
      title: 'Post-Combustion Refractory Insulation',
      metric: 'Thermal Conductivity k < 0.28 W/m·K',
      description: 'After the exothermic charge is expended, the sleeve matrix transitions into a micro-cellular porous refractory barrier. This insulating layer blocks outward conductive and convective heat transfer into the surrounding molding sand.'
    },
    {
      title: 'High Refractoriness & Ferrostatic Strength',
      metric: 'Refractoriness > 1,650°C',
      description: 'Sleeves retain rigid geometric integrity under severe hydrostatic and ferrostatic metallostatic pressures during pouring. Zero wall deformation, spalling, or refractory erosion ensures clean metal free of sand wash defects.'
    },
    {
      title: 'Low Gas Evolution & Smoke Emissions',
      metric: 'Gas Volume < 12 ml/g',
      description: 'Special organic-inorganic dual binder formulation ensures minimal gas evolution during combustion, preventing blowholes, pinholes, or mold dilation.'
    }
  ],

  directionalSolidification: {
    concept: 'Directional Solidification (The Feeding Gradient)',
    description: 'Liquid metals contract by 3.5% to 7.0% during cooling and phase transformation from liquid to solid. If a heavy casting section freezes with no access to liquid feed metal, an internal vacuum-shrinkage void is created. Navexo sleeves create a steep temperature gradient: the casting freezes first, pulling molten metal from the sleeve reservoir, ensuring all shrinkage cavities remain isolated inside the disposable sleeve head.'
  },

  defectsPrevented: [
    {
      name: 'Primary & Secondary Pipe (Macro-Shrinkage)',
      cause: 'Liquid-to-solid volumetric contraction (~4-6%) occurring without supplementary liquid metal feeding.',
      consequence: 'Deep funnel-shaped cavities extending from the riser into the usable casting body, resulting in scrap or structural rejection on radiography.',
      navexoSolution: 'High thermal heat release maintains a flat, shallow liquid meniscus, keeping the shrinkage pipe completely inside the sleeve cavity.',
      severity: 'Critical'
    },
    {
      name: 'Centerline Spongy Porosity (Micro-Shrinkage)',
      cause: 'Premature neck freezing or insufficient temperature gradient along thick plate or hub junctions.',
      consequence: 'Interdendritic micro-voids causing pressure test leaks, catastrophic fatigue failure, and reduced tensile strength.',
      navexoSolution: 'Extended exothermic feeding incubation keeps feed channels open until dendritic growth is complete.',
      severity: 'Critical'
    },
    {
      name: 'Isolated Hot Spot Cavities (T & L Junctions)',
      cause: 'Intersections where geometry prevents heat dissipation, remaining liquid long after adjacent walls have frozen.',
      consequence: 'Sub-surface hollow pockets discovered only after expensive CNC machining, causing customer rejections.',
      navexoSolution: 'Neck-down and blind exothermic sleeves placed directly above or adjacent to hot spots deliver direct hydrostatic feed pressure.',
      severity: 'High'
    },
    {
      name: 'Riser Contact Tear & Grinding Burns',
      cause: 'Huge conventional sand riser contact pads requiring oxy-acetylene torch cutting and heavy abrasive grinding.',
      consequence: 'Thermal cracking, metallurgical stress zones, excessive grinding wheel wear, and high labor costs.',
      navexoSolution: 'Neck-down sleeves reduce the contact footprint by up to 60%, allowing clean, low-stress breaker core knock-off.',
      severity: 'Moderate'
    }
  ] as DefectExplanation[],

  comparisonTable: [
    {
      parameter: 'Feeder Modulus Multiplication Factor (f_M)',
      greenSandRiser: '1.0x (Geometric only)',
      insulatingSleeve: '1.25x - 1.35x',
      navexoExothermicSleeve: '1.45x - 1.65x (Highest)',
      advantage: 'Up to 65% smaller sleeve diameter needed'
    },
    {
      parameter: 'Feeding Efficiency (% metal utilized)',
      greenSandRiser: '10% - 14%',
      insulatingSleeve: '25% - 35%',
      navexoExothermicSleeve: '45% - 65% (3x - 4x better)',
      advantage: 'Drastically less scrap metal poured'
    },
    {
      parameter: 'Typical Foundry Casting Yield',
      greenSandRiser: '45% - 55%',
      insulatingSleeve: '60% - 70%',
      navexoExothermicSleeve: '72% - 85%+',
      advantage: 'Pour more castings per induction melt batch'
    },
    {
      parameter: 'Melting Power & Energy Cost',
      greenSandRiser: 'High (wastes melt energy on huge risers)',
      insulatingSleeve: 'Moderate reduction',
      navexoExothermicSleeve: 'Lowest (saves 150-250 kWh per ton)',
      advantage: 'Massive recurring electricity bill savings'
    },
    {
      parameter: 'Fettling & Grinding Labor',
      greenSandRiser: 'Heavy cutting / gouging / grinding',
      insulatingSleeve: 'Standard cutting required',
      navexoExothermicSleeve: 'Easy sledgehammer or wedge knock-off',
      advantage: 'Saves 60% of finishing room time'
    },
    {
      parameter: 'Risk of Carbon Contamination',
      greenSandRiser: 'Low',
      insulatingSleeve: 'Zero (mineral fiber)',
      navexoExothermicSleeve: 'Zero (clean low-carbon formulation)',
      advantage: 'Safe for ductile iron and alloy steel'
    }
  ] as ComparisonMetric[]
};
