
// Solar energy calculation utilities

interface SolarResult {
  monthlyEnergy: number[];
  annualEnergy: number;
  monthlySavings: number[];
  annualSavings: number;
  co2Offset: number;
  treesEquivalent: number;
  bulbsEquivalent: number;
  paybackPeriod: number;
}

interface SolarParams {
  area: number;                 // in square meters
  electricityRate: number;      // in currency per kWh
  systemCost: number;           // in currency per kW
  subsidyPercentage: number;    // percentage as integer (e.g., 30 for 30%)
  subsidyMaxAmount: number;     // maximum subsidy amount
  latitude?: number;            // optional - defaults to average India
}

// Monthly solar insolation factors for India (average, would be better with actual location data)
const monthlyInsolationFactors = [
  1.05,  // January
  1.12,  // February
  1.24,  // March
  1.30,  // April
  1.33,  // May
  1.22,  // June
  1.10,  // July
  1.08,  // August
  1.15,  // September
  1.20,  // October
  1.10,  // November
  1.00   // December
];

// Calculate solar energy potential based on roof area and location
export const calculateSolarPotential = (params: SolarParams): SolarResult => {
  const { 
    area, 
    electricityRate, 
    systemCost, 
    subsidyPercentage, 
    subsidyMaxAmount
  } = params;
  
  // Constants
  const efficiencyFactor = 0.18;                         // 18% panel efficiency
  const systemLosses = 0.20;                             // 20% system losses
  const averageAnnualInsolation = 5.5;                   // kWh/m²/day (India average)
  const co2PerKwh = 0.82;                                // kg CO2 per kWh (India grid)
  const treesPerTonCO2 = 45;                             // Trees needed to absorb 1 ton of CO2
  const bulbsPerKwh = 10;                                // Number of 10W LED bulbs powered for 1 hour with 1 kWh
  const kWPerSqMeter = 0.15;                             // kW per square meter of solar panels
  
  // Calculate system size in kW
  const systemSize = area * kWPerSqMeter;
  
  // Monthly energy generation (kWh)
  const monthlyEnergy = monthlyInsolationFactors.map(factor => {
    return Math.round(systemSize * factor * averageAnnualInsolation * 30 * (1 - systemLosses));
  });
  
  // Annual energy generation (kWh)
  const annualEnergy = monthlyEnergy.reduce((sum, month) => sum + month, 0);
  
  // Monthly financial savings
  const monthlySavings = monthlyEnergy.map(energy => Math.round(energy * electricityRate));
  
  // Annual financial savings
  const annualSavings = monthlySavings.reduce((sum, month) => sum + month, 0);
  
  // CO2 emissions avoided annually (kg)
  const co2Offset = annualEnergy * co2PerKwh;
  
  // Environmental equivalents
  const treesEquivalent = Math.round((co2Offset / 1000) * treesPerTonCO2);
  const bulbsEquivalent = Math.round(annualEnergy * bulbsPerKwh);
  
  // Calculate payback period
  const totalSystemCost = systemSize * systemCost;
  const subsidyAmount = Math.min(totalSystemCost * (subsidyPercentage / 100), subsidyMaxAmount);
  const netSystemCost = totalSystemCost - subsidyAmount;
  const paybackPeriod = netSystemCost / annualSavings;
  
  return {
    monthlyEnergy,
    annualEnergy,
    monthlySavings,
    annualSavings,
    co2Offset,
    treesEquivalent,
    bulbsEquivalent,
    paybackPeriod
  };
};

// Get month name from index
export const getMonthName = (index: number): string => {
  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  return months[index];
};

// Format currency (Indian Rupees)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
