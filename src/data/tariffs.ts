
export interface TariffData {
  state_id: number;
  district_id: number;
  rate_per_kwh: number;
  subsidy_percentage: number;
  subsidy_max_amount: number;
}

export const tariffData: TariffData[] = [
  // Andhra Pradesh
  { state_id: 1, district_id: 101, rate_per_kwh: 8.5, subsidy_percentage: 30, subsidy_max_amount: 60000 },
  { state_id: 1, district_id: 102, rate_per_kwh: 8.3, subsidy_percentage: 30, subsidy_max_amount: 60000 },
  { state_id: 1, district_id: 103, rate_per_kwh: 8.3, subsidy_percentage: 30, subsidy_max_amount: 60000 },
  { state_id: 1, district_id: 104, rate_per_kwh: 8.4, subsidy_percentage: 30, subsidy_max_amount: 60000 },
  { state_id: 1, district_id: 105, rate_per_kwh: 8.4, subsidy_percentage: 30, subsidy_max_amount: 60000 },
  { state_id: 1, district_id: 106, rate_per_kwh: 8.5, subsidy_percentage: 30, subsidy_max_amount: 60000 },
  { state_id: 1, district_id: 107, rate_per_kwh: 8.4, subsidy_percentage: 30, subsidy_max_amount: 60000 },
  { state_id: 1, district_id: 108, rate_per_kwh: 8.3, subsidy_percentage: 30, subsidy_max_amount: 60000 },
  { state_id: 1, district_id: 109, rate_per_kwh: 8.3, subsidy_percentage: 30, subsidy_max_amount: 60000 },
  { state_id: 1, district_id: 110, rate_per_kwh: 8.3, subsidy_percentage: 30, subsidy_max_amount: 60000 },
  { state_id: 1, district_id: 111, rate_per_kwh: 8.3, subsidy_percentage: 30, subsidy_max_amount: 60000 },
  { state_id: 1, district_id: 112, rate_per_kwh: 8.5, subsidy_percentage: 30, subsidy_max_amount: 60000 },

  // Karnataka
  { state_id: 2, district_id: 201, rate_per_kwh: 9.2, subsidy_percentage: 20, subsidy_max_amount: 50000 },
  { state_id: 2, district_id: 202, rate_per_kwh: 9.0, subsidy_percentage: 20, subsidy_max_amount: 50000 },
  { state_id: 2, district_id: 203, rate_per_kwh: 8.8, subsidy_percentage: 20, subsidy_max_amount: 50000 },
  { state_id: 2, district_id: 204, rate_per_kwh: 8.8, subsidy_percentage: 20, subsidy_max_amount: 50000 },
  { state_id: 2, district_id: 205, rate_per_kwh: 8.7, subsidy_percentage: 20, subsidy_max_amount: 50000 },
  { state_id: 2, district_id: 206, rate_per_kwh: 8.7, subsidy_percentage: 20, subsidy_max_amount: 50000 },
  { state_id: 2, district_id: 207, rate_per_kwh: 8.8, subsidy_percentage: 20, subsidy_max_amount: 50000 },
  { state_id: 2, district_id: 208, rate_per_kwh: 8.9, subsidy_percentage: 20, subsidy_max_amount: 50000 },
  { state_id: 2, district_id: 209, rate_per_kwh: 8.9, subsidy_percentage: 20, subsidy_max_amount: 50000 },
  { state_id: 2, district_id: 210, rate_per_kwh: 8.8, subsidy_percentage: 20, subsidy_max_amount: 50000 },
  { state_id: 2, district_id: 211, rate_per_kwh: 9.0, subsidy_percentage: 20, subsidy_max_amount: 50000 },
  { state_id: 2, district_id: 212, rate_per_kwh: 8.9, subsidy_percentage: 20, subsidy_max_amount: 50000 },

  // Tamil Nadu
  { state_id: 3, district_id: 301, rate_per_kwh: 8.0, subsidy_percentage: 40, subsidy_max_amount: 70000 },
  { state_id: 3, district_id: 302, rate_per_kwh: 7.8, subsidy_percentage: 40, subsidy_max_amount: 70000 },
  { state_id: 3, district_id: 303, rate_per_kwh: 7.7, subsidy_percentage: 40, subsidy_max_amount: 70000 },
  { state_id: 3, district_id: 304, rate_per_kwh: 7.7, subsidy_percentage: 40, subsidy_max_amount: 70000 },
  { state_id: 3, district_id: 305, rate_per_kwh: 7.7, subsidy_percentage: 40, subsidy_max_amount: 70000 },
  { state_id: 3, district_id: 306, rate_per_kwh: 7.8, subsidy_percentage: 40, subsidy_max_amount: 70000 },
  { state_id: 3, district_id: 307, rate_per_kwh: 8.0, subsidy_percentage: 40, subsidy_max_amount: 70000 },
  { state_id: 3, district_id: 308, rate_per_kwh: 7.9, subsidy_percentage: 40, subsidy_max_amount: 70000 },
  { state_id: 3, district_id: 309, rate_per_kwh: 7.8, subsidy_percentage: 40, subsidy_max_amount: 70000 },
  { state_id: 3, district_id: 310, rate_per_kwh: 7.7, subsidy_percentage: 40, subsidy_max_amount: 70000 },
  { state_id: 3, district_id: 311, rate_per_kwh: 7.9, subsidy_percentage: 40, subsidy_max_amount: 70000 },

  // Maharashtra
  { state_id: 4, district_id: 401, rate_per_kwh: 11.0, subsidy_percentage: 25, subsidy_max_amount: 55000 },
  { state_id: 4, district_id: 402, rate_per_kwh: 11.0, subsidy_percentage: 25, subsidy_max_amount: 55000 },
  { state_id: 4, district_id: 403, rate_per_kwh: 10.8, subsidy_percentage: 25, subsidy_max_amount: 55000 },
  { state_id: 4, district_id: 404, rate_per_kwh: 10.5, subsidy_percentage: 25, subsidy_max_amount: 55000 },
  { state_id: 4, district_id: 405, rate_per_kwh: 10.0, subsidy_percentage: 25, subsidy_max_amount: 55000 },
  { state_id: 4, district_id: 406, rate_per_kwh: 9.8, subsidy_percentage: 25, subsidy_max_amount: 55000 },
  { state_id: 4, district_id: 407, rate_per_kwh: 9.7, subsidy_percentage: 25, subsidy_max_amount: 55000 },
  { state_id: 4, district_id: 408, rate_per_kwh: 9.7, subsidy_percentage: 25, subsidy_max_amount: 55000 },
  { state_id: 4, district_id: 409, rate_per_kwh: 9.8, subsidy_percentage: 25, subsidy_max_amount: 55000 },
  { state_id: 4, district_id: 410, rate_per_kwh: 9.6, subsidy_percentage: 25, subsidy_max_amount: 55000 },

  // Delhi
  { state_id: 5, district_id: 501, rate_per_kwh: 9.5, subsidy_percentage: 35, subsidy_max_amount: 65000 },
  { state_id: 5, district_id: 502, rate_per_kwh: 9.5, subsidy_percentage: 35, subsidy_max_amount: 65000 },
  { state_id: 5, district_id: 503, rate_per_kwh: 9.5, subsidy_percentage: 35, subsidy_max_amount: 65000 },
  { state_id: 5, district_id: 504, rate_per_kwh: 9.5, subsidy_percentage: 35, subsidy_max_amount: 65000 },
  { state_id: 5, district_id: 505, rate_per_kwh: 9.5, subsidy_percentage: 35, subsidy_max_amount: 65000 },
  { state_id: 5, district_id: 506, rate_per_kwh: 9.5, subsidy_percentage: 35, subsidy_max_amount: 65000 },
  { state_id: 5, district_id: 507, rate_per_kwh: 9.5, subsidy_percentage: 35, subsidy_max_amount: 65000 },
  { state_id: 5, district_id: 508, rate_per_kwh: 9.5, subsidy_percentage: 35, subsidy_max_amount: 65000 },
  { state_id: 5, district_id: 509, rate_per_kwh: 9.5, subsidy_percentage: 35, subsidy_max_amount: 65000 },
  { state_id: 5, district_id: 510, rate_per_kwh: 9.5, subsidy_percentage: 35, subsidy_max_amount: 65000 },

  // Gujarat
  { state_id: 6, district_id: 601, rate_per_kwh: 7.5, subsidy_percentage: 30, subsidy_max_amount: 60000 },
  { state_id: 6, district_id: 602, rate_per_kwh: 7.3, subsidy_percentage: 30, subsidy_max_amount: 60000 },
  { state_id: 6, district_id: 603, rate_per_kwh: 7.3, subsidy_percentage: 30, subsidy_max_amount: 60000 },
  { state_id: 6, district_id: 604, rate_per_kwh: 7.2, subsidy_percentage: 30, subsidy_max_amount: 60000 },
  { state_id: 6, district_id: 605, rate_per_kwh: 7.2, subsidy_percentage: 30, subsidy_max_amount: 60000 },
  { state_id: 6, district_id: 606, rate_per_kwh: 7.3, subsidy_percentage: 30, subsidy_max_amount: 60000 },
  { state_id: 6, district_id: 607, rate_per_kwh: 7.4, subsidy_percentage: 30, subsidy_max_amount: 60000 },
  { state_id: 6, district_id: 608, rate_per_kwh: 7.3, subsidy_percentage: 30, subsidy_max_amount: 60000 },
  { state_id: 6, district_id: 609, rate_per_kwh: 7.2, subsidy_percentage: 30, subsidy_max_amount: 60000 },
  { state_id: 6, district_id: 610, rate_per_kwh: 7.2, subsidy_percentage: 30, subsidy_max_amount: 60000 }
];

// Helper function to get tariff data for a specific location
export const getTariffData = (stateId: number, districtId: number): TariffData | undefined => {
  return tariffData.find(
    tariff => tariff.state_id === stateId && tariff.district_id === districtId
  );
};

// Default tariff values if no location is selected
export const defaultTariff: TariffData = {
  state_id: 0,
  district_id: 0,
  rate_per_kwh: 9.0,
  subsidy_percentage: 30,
  subsidy_max_amount: 60000
};
