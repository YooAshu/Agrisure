export const farmerData = {
    "farmer_name": "Ramesh kumar",
    "aadhaar_number": "123456789012",
    "Address": "123 Green Field, Village X, District Y, State Z",
    "crop_name": "Wheat",
    "sum_insured": "16000",
    "premium_paid": 1600,
    "is_insured": true,
    "insurance_date": "2025-04-15T10:30:00",
    "trans_hash": "0xabc123def456ghi789jkl012mno345pqr678stu901vwx234yz567890ab123cd4",
    "contract_add": "0x9fbd2a173c4bcd874e56a3c8fd2b8719b8397b1c",
    "claim_sts": "Not Claimed",
    "policy_num": "AGRI2025POL123",
    "preferred_language": "Hindi",
    "upi_id": "rajesh.kumar@upi",
    "phone_number": "9876543210",
};

export const landData = {
  "aadhaar_number": "123456789012",
  "coordinates": {
    "type": "Polygon",
    "coordinates": [
      [[77.5946, 12.9716], [77.5950, 12.9720], [77.5952, 12.9714], [77.5946, 12.9716]]
    ]
  },
  "area_hec": 2.5,
  "crop_type": "Rice",
  "sowing_date": "2025-06-01",
  "exp_yield": 3.2,
  "soil_type": "Loamy"
};



export const blockchainInData = {
  "aadhaar_number": "123456789012",
  "Address": "Plot 47, Village Pathari, Block Zeta, Bihar, India",
  "crop_name": "Rice",
  "sum_insured": "60000",
  "premium_paid": 300,
  "is_insured": true,
  "insurance_date": "2025-05-02T11:15:00",
  "trans_hash": "0xdeadbeef1234567890abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd",
  "contract_add": "0x1234abcd5678ef901234567890abcdef12345678",
  "claim_sts": "Not Claimed",
  "policy_num": "AGRI2025POL456"
};

export const insuranceSchemes = [
  {
    id: "LIC-AG-2025-01",
    name: "Pradhan Mantri Fasal Bima Yojana",
    description:
      "Covers crop losses due to natural calamities, pests, and diseases.",
    premiumRate: "2%",
    sumInsured: 20230, // 50000 / 2.471
    eligibility: "All farmers growing notified crops in notified areas",
    duration: "Kharif & Rabi seasons",
    coverage: ["Drought", "Flood", "Hailstorm", "Pest attack"],
  },
  {
    id: "LIC-FS-2025-02",
    name: "Weather-Based Crop Insurance Scheme",
    description:
      "Provides insurance against adverse weather conditions affecting crops.",
    premiumRate: "1.5%",
    sumInsured: 12140, // 30000 / 2.471
    eligibility: "Farmers with weather-sensitive crops",
    duration: "Seasonal (Kharif/Rabi)",
    coverage: [
      "Excess rainfall",
      "Heat waves",
      "Cold waves",
      "Unseasonal rains",
    ],
  },
  {
    id: "LIC-HS-2025-03",
    name: "Horticulture Crop Insurance",
    description:
      "Covers fruit and vegetable crops against natural calamities and pest attacks.",
    premiumRate: "5%",
    sumInsured: 30340, // 75000 / 2.471
    eligibility: "Horticulture farmers",
    duration: "Per season",
    coverage: ["Flood", "Pest", "Disease", "Storms"],
  },
  {
    id: "LIC-CC-2025-04",
    name: "Unified Package Insurance Scheme",
    description:
      "Covers crop losses along with additional benefits like personal accident and life insurance for farmers.",
    premiumRate: "2.5%",
    sumInsured: 24270, // 60000 / 2.471
    eligibility: "Farmers growing notified crops in notified areas",
    duration: "Kharif & Rabi seasons",
    coverage: ["Drought", "Flood", "Cyclone", "Pest attack"],
  },
  {
    id: "LIC-AT-2025-05",
    name: "Comprehensive Crop Insurance Scheme",
    description:
      "Provides comprehensive coverage for crop losses due to natural calamities and pest attacks.",
    premiumRate: "3%",
    sumInsured: 22250, // 55000 / 2.471
    eligibility: "All farmers with insured crops",
    duration: "Seasonal (Kharif/Rabi)",
    coverage: ["Drought", "Flood", "Hailstorm", "Pest attack"],
  },
  {
    id: "LIC-Ak-2025-07",
    name: "National Horticulture Insurance Scheme",
    description:
      "Specialized insurance for horticulture crops against natural calamities and diseases.",
    premiumRate: "4%",
    sumInsured: 32380, // 80000 / 2.471
    eligibility: "Horticulture farmers",
    duration: "Per season",
    coverage: ["Flood", "Pest", "Disease", "Storms"],
  },
  // {
  //   id: "LIC-AT-2025-05",
  //   name: "Rainfall Index-Based Insurance Scheme",
  //   description:
  //     "Provides insurance based on rainfall index to protect farmers from losses due to insufficient or excess rainfall.",
  //   premiumRate: "1.8%",
  //   sumInsured: 14160, // 35000 / 2.471
  //   eligibility: "Farmers in rainfall-sensitive areas",
  //   duration: "Seasonal (Kharif/Rabi)",
  //   coverage: ["Excess rainfall", "Deficient rainfall", "Unseasonal rains"],
  // },
  // {
  //   id: "sch009",
  //   name: "Organic Crop Insurance Scheme",
  //   description:
  //     "Covers losses for farmers practicing organic farming due to natural calamities and pest attacks.",
  //   premiumRate: "2.2%",
  //   sumInsured: 28330,
  //   eligibility: "Certified organic farmers",
  //   duration: "Seasonal (Kharif/Rabi)",
  //   coverage: ["Drought", "Flood", "Pest attack", "Disease"],
  // }
];
