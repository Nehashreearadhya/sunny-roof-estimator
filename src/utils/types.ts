
// Shared type definitions

export interface SolarParams {
  area: number;                 // in square meters
  electricityRate: number;      // in currency per kWh
  systemCost: number;           // in currency per kW
  subsidyPercentage: number;    // percentage as integer (e.g., 30 for 30%)
  subsidyMaxAmount: number;     // maximum subsidy amount
  latitude?: number;            // optional - defaults to average India
}

export interface SolarResult {
  monthlyEnergy: number[];
  annualEnergy: number;
  monthlySavings: number[];
  annualSavings: number;
  co2Offset: number;
  treesEquivalent: number;
  bulbsEquivalent: number;
  paybackPeriod: number;
}

export interface LocationInfo {
  state: string;
  district: string;
  stateId: number;
  districtId: number;
}
