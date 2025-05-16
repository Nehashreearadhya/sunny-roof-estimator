
// Indian states and districts data
export interface District {
  id: number;
  name: string;
  state_id: number;
}

export interface State {
  id: number;
  name: string;
  districts: District[];
}

export const indianStates: State[] = [
  {
    id: 1,
    name: "Andhra Pradesh",
    districts: [
      { id: 101, name: "Anantapur", state_id: 1 },
      { id: 102, name: "Chittoor", state_id: 1 },
      { id: 103, name: "East Godavari", state_id: 1 },
      { id: 104, name: "Guntur", state_id: 1 },
      { id: 105, name: "Krishna", state_id: 1 },
      { id: 106, name: "Kurnool", state_id: 1 },
      { id: 107, name: "Prakasam", state_id: 1 },
      { id: 108, name: "Srikakulam", state_id: 1 },
      { id: 109, name: "Visakhapatnam", state_id: 1 },
      { id: 110, name: "Vizianagaram", state_id: 1 },
      { id: 111, name: "West Godavari", state_id: 1 },
      { id: 112, name: "YSR Kadapa", state_id: 1 }
    ]
  },
  {
    id: 2,
    name: "Karnataka",
    districts: [
      { id: 201, name: "Bengaluru Urban", state_id: 2 },
      { id: 202, name: "Bengaluru Rural", state_id: 2 },
      { id: 203, name: "Belagavi", state_id: 2 },
      { id: 204, name: "Bellary", state_id: 2 },
      { id: 205, name: "Bidar", state_id: 2 },
      { id: 206, name: "Vijayapura", state_id: 2 },
      { id: 207, name: "Chamarajanagar", state_id: 2 },
      { id: 208, name: "Chikkaballapur", state_id: 2 },
      { id: 209, name: "Chikkamagaluru", state_id: 2 },
      { id: 210, name: "Chitradurga", state_id: 2 },
      { id: 211, name: "Dakshina Kannada", state_id: 2 },
      { id: 212, name: "Davanagere", state_id: 2 }
    ]
  },
  {
    id: 3,
    name: "Tamil Nadu",
    districts: [
      { id: 301, name: "Chennai", state_id: 3 },
      { id: 302, name: "Coimbatore", state_id: 3 },
      { id: 303, name: "Cuddalore", state_id: 3 },
      { id: 304, name: "Dharmapuri", state_id: 3 },
      { id: 305, name: "Dindigul", state_id: 3 },
      { id: 306, name: "Erode", state_id: 3 },
      { id: 307, name: "Kanchipuram", state_id: 3 },
      { id: 308, name: "Kanyakumari", state_id: 3 },
      { id: 309, name: "Karur", state_id: 3 },
      { id: 310, name: "Krishnagiri", state_id: 3 },
      { id: 311, name: "Madurai", state_id: 3 }
    ]
  },
  {
    id: 4,
    name: "Maharashtra",
    districts: [
      { id: 401, name: "Mumbai City", state_id: 4 },
      { id: 402, name: "Mumbai Suburban", state_id: 4 },
      { id: 403, name: "Thane", state_id: 4 },
      { id: 404, name: "Pune", state_id: 4 },
      { id: 405, name: "Nagpur", state_id: 4 },
      { id: 406, name: "Ahmednagar", state_id: 4 },
      { id: 407, name: "Akola", state_id: 4 },
      { id: 408, name: "Amravati", state_id: 4 },
      { id: 409, name: "Aurangabad", state_id: 4 },
      { id: 410, name: "Beed", state_id: 4 }
    ]
  },
  {
    id: 5,
    name: "Delhi",
    districts: [
      { id: 501, name: "Central Delhi", state_id: 5 },
      { id: 502, name: "East Delhi", state_id: 5 },
      { id: 503, name: "New Delhi", state_id: 5 },
      { id: 504, name: "North Delhi", state_id: 5 },
      { id: 505, name: "North East Delhi", state_id: 5 },
      { id: 506, name: "North West Delhi", state_id: 5 },
      { id: 507, name: "South Delhi", state_id: 5 },
      { id: 508, name: "South East Delhi", state_id: 5 },
      { id: 509, name: "South West Delhi", state_id: 5 },
      { id: 510, name: "West Delhi", state_id: 5 }
    ]
  },
  {
    id: 6,
    name: "Gujarat",
    districts: [
      { id: 601, name: "Ahmedabad", state_id: 6 },
      { id: 602, name: "Amreli", state_id: 6 },
      { id: 603, name: "Anand", state_id: 6 },
      { id: 604, name: "Aravalli", state_id: 6 },
      { id: 605, name: "Banaskantha", state_id: 6 },
      { id: 606, name: "Bharuch", state_id: 6 },
      { id: 607, name: "Bhavnagar", state_id: 6 },
      { id: 608, name: "Botad", state_id: 6 },
      { id: 609, name: "Chhota Udaipur", state_id: 6 },
      { id: 610, name: "Dahod", state_id: 6 }
    ]
  }
];
