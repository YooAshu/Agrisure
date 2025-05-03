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
    sumInsured: 2023, // 50000 / 2.471
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
    sumInsured: 1214, // 30000 / 2.471
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
    sumInsured: 3034, // 75000 / 2.471
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
    sumInsured: 2427, // 60000 / 2.471
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
    sumInsured: 2225, // 55000 / 2.471
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
    sumInsured: 3238, // 80000 / 2.471
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


export const AgrisureInfo = `AgriSure - Blockchain-Powered Crop Insurance

Objective:
- Instant & Automated Payouts – Smart contracts eliminate delays.
- Transparency – Blockchain records every transaction & decision.
- Farmer-Friendly Process – Less paperwork via web.

Major Societal Benefit / Target Community:
- Financial security & transparency in crop insurance for farmers.
- Empowering small farmers – Instant payouts reduce debt and distress.

Other Application Areas:
- AI agent answers farmer queries on insurance, claims & payouts in local languages.
- Automated claim guidance – Assists with policy details, claim status & next steps.
- Risk alerts & advisory – Notifies farmers of crop risks based on AI weather predictions.

Market / Literature Survey:

Technology Comparison:
- Traditional Insurance: Manual paperwork, slow claims, centralized.
- AgriSure: Smart contracts, AI risk analysis, automated claims.

Feature Comparison:
- AgriSure: Instant, transparent, fraud-proof payouts using blockchain & AI.
- Traditional: Slow, opaque, complex.

Product Comparison:
- AgriSure: Affordable, instant AI-verified payouts, no middlemen.
- Govt(PMFBY): Slow. Private: Costly & limited reach.

Novelty:
- Predictive Risk Mitigation – AgriSure uses AI to warn about crop threats in advance.
- Paperless Claims – AI & blockchain handle verification, no manual work.

Architecture:
- Data Flow Diagram (Level-2)

Technologies Used in AgriSure:
- Frontend: Tailwind CSS
- Backend: Web3.js
- Smart Contracts: Solidity
- Blockchain: Polygon / Ethereum via Hardhat
- Database: Not specified
- Transactions: Smart contracts
- Security: Blockchain-based validation

Key Features:
- Instant payouts via smart contracts
- Blockchain-based transparency
- No paperwork – automated claim process
- AI-based crop risk prediction using weather & satellite data
- UPI integration for premium payments and claim disbursement
- 24/7 AI assistant for local language help
- Farmer-friendly interface
`;
