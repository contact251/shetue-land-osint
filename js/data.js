/**
 * SHETUE LAND OSINT TOOLKIT - SEED DATA & STORAGE MANAGER
 * Authoritative master records synced with localStorage
 */

const SEED_DATA = {
  parcels: [
    {
      id: "PRC-001",
      mouza: "Badda",
      jlNo: 4,
      thana: "Badda",
      district: "Dhaka",
      plotCS: "402",
      plotSA: "402",
      plotRS: "851",
      plotBS: "1204",
      khatianCS: "112",
      khatianSA: "245",
      khatianRS: "512",
      khatianBS: "1084",
      areaDecimal: 14.50,
      areaKatha: 8.78,
      areaAcre: 0.1450,
      landClass: "Nal (Agricultural)",
      owner: "Abdul Karim",
      possessor: "Abdul Karim",
      mutationCase: "MUT-2021-984",
      mutationKhatian: "845",
      taxYear: "1432 BS",
      status: "CLEAR",
      lat: 23.784512,
      lng: 90.426715,
      coordinates: [
        [23.784400, 90.426500],
        [23.784400, 90.426900],
        [23.784650, 90.426900],
        [23.784650, 90.426500]
      ],
      remarks: "Title clear and verified against RS & BS. Fortified with 10-foot boundary wall."
    },
    {
      id: "PRC-002",
      mouza: "Badda",
      jlNo: 4,
      thana: "Badda",
      district: "Dhaka",
      plotCS: "403",
      plotSA: "403",
      plotRS: "852",
      plotBS: "1205",
      khatianCS: "112",
      khatianSA: "245",
      khatianRS: "512",
      khatianBS: "1085",
      areaDecimal: 25.00,
      areaKatha: 15.13,
      areaAcre: 0.2500,
      landClass: "Viti (Homestead)",
      owner: "Mohammad Hossain",
      possessor: "Rafiqul Islam",
      mutationCase: "MUT-2018-312",
      mutationKhatian: "612",
      taxYear: "1431 BS",
      status: "DISPUTE_FLAGGED",
      lat: 23.784910,
      lng: 90.427100,
      coordinates: [
        [23.784700, 90.426900],
        [23.784700, 90.427350],
        [23.785100, 90.427350],
        [23.785100, 90.426900]
      ],
      disputedOverlapCoords: [
        [23.784950, 90.426900],
        [23.784950, 90.427350],
        [23.785100, 90.427350],
        [23.785100, 90.426900]
      ],
      remarks: "Boundary overlap claim of 2.5 decimals on northern line. Title Suit No. 142/2024 pending."
    },
    {
      id: "PRC-003",
      mouza: "Tejgaon",
      jlNo: 11,
      thana: "Tejgaon",
      district: "Dhaka",
      plotCS: "105",
      plotSA: "105",
      plotRS: "210",
      plotBS: "405",
      khatianCS: "89",
      khatianSA: "142",
      khatianRS: "330",
      khatianBS: "710",
      areaDecimal: 10.00,
      areaKatha: 6.05,
      areaAcre: 0.1000,
      landClass: "Commercial",
      owner: "Green Assets Ltd",
      possessor: "Green Assets Ltd",
      mutationCase: "MUT-2023-110",
      mutationKhatian: "405",
      taxYear: "1432 BS",
      status: "CLEAR",
      lat: 23.761200,
      lng: 90.395400,
      coordinates: [
        [23.761000, 90.395200],
        [23.761000, 90.395650],
        [23.761400, 90.395650],
        [23.761400, 90.395200]
      ],
      remarks: "Commercial title verified. Full frontage along primary 60ft municipal thoroughfare."
    }
  ],

  khatians: [
    { id: "KH-CS-001", survey: "CS", khatianNo: "112", mouza: "Badda", jl: 4, plots: "401, 402, 403", owners: "Kazi Nesaruddin (8A); Azimullah (8A)", area: "120.00 Dec", verified: "VERIFIED", scan: "CS_112_Badda.pdf" },
    { id: "KH-SA-001", survey: "SA", khatianNo: "245", mouza: "Badda", jl: 4, plots: "402, 403", owners: "Azimullah (16 Annas)", area: "65.00 Dec", verified: "VERIFIED", scan: "SA_245_Badda.pdf" },
    { id: "KH-RS-001", survey: "RS", khatianNo: "512", mouza: "Badda", jl: 4, plots: "851, 852", owners: "Rafiqullah (Son of Azimullah)", area: "65.00 Dec", verified: "VERIFIED", scan: "RS_512_Badda.pdf" },
    { id: "KH-BS-001", survey: "BS", khatianNo: "1084", mouza: "Badda", jl: 4, plots: "1204", owners: "Abdul Karim", area: "14.50 Dec", verified: "VERIFIED", scan: "BS_1084_Badda.pdf" },
    { id: "KH-BS-002", survey: "BS", khatianNo: "1085", mouza: "Badda", jl: 4, plots: "1205", owners: "Mohammad Hossain", area: "25.00 Dec", verified: "UNDER_REVIEW", scan: "BS_1085_Badda.pdf" }
  ],

  deeds: [
    { id: "D-1982-104", deedNo: "1842", year: 1982, sro: "Gulshan Sub-Registry", type: "Saf Kabala", vendor: "Rafiqullah", purchaser: "Nurul Islam", area: 30.00, consideration: 150000, volume: "12", pages: "145-152", status: "LINKED_TO_RS_512" },
    { id: "D-2001-209", deedNo: "3105", year: 2001, sro: "Badda Sub-Registry", type: "Bonton (Partition)", vendor: "Nurul Islam & Heirs", purchaser: "Mohammad Hossain & Abdul Karim", area: 30.00, consideration: 0, volume: "18", pages: "89-98", status: "CONTINUOUS" },
    { id: "D-2015-452", deedNo: "4521", year: 2015, sro: "Badda Sub-Registry", type: "Saf Kabala", vendor: "Mohammad Hossain", purchaser: "Abdul Karim", area: 14.50, consideration: 4500000, volume: "24", pages: "201-210", status: "CONTINUOUS" }
  ],

  mutations: [
    { caseId: "MUT-2021-001", caseNo: "984/2021", circle: "Badda Circle", applicant: "Abdul Karim", deedRef: "Deed 4521/2015", plotBS: "1204", appliedArea: 14.50, approvedArea: 14.50, orderDate: "2021-05-02", khatianNo: "845", dcrNo: "DCR-882194", status: "APPROVED_AND_OPENED" },
    { caseId: "MUT-2023-002", caseNo: "110/2023", circle: "Tejgaon Circle", applicant: "Green Assets Ltd", deedRef: "Deed 1102/2022", plotBS: "405", appliedArea: 10.00, approvedArea: 10.00, orderDate: "2023-04-12", khatianNo: "405", dcrNo: "DCR-991204", status: "APPROVED_AND_OPENED" },
    { caseId: "MUT-2026-003", caseNo: "312/2026", circle: "Badda Circle", applicant: "Mohammad Hossain", deedRef: "Deed 3105/2001", plotBS: "1205", appliedArea: 25.00, approvedArea: 22.50, orderDate: "2026-08-01", khatianNo: "612", dcrNo: "Pending", status: "PARTIALLY_APPROVED" }
  ],

  taxes: [
    { receiptId: "TAX-2024-001", holdingNo: "845", mouza: "Badda", khatian: "845", plot: "1204", payer: "Abdul Karim", bengaliYear: "1431 BS", gregYear: 2024, receiptNo: "REC-771829", amount: 1450.00, status: "CLEARED" },
    { receiptId: "TAX-2025-002", holdingNo: "845", mouza: "Badda", khatian: "845", plot: "1204", payer: "Abdul Karim", bengaliYear: "1432 BS", gregYear: 2025, receiptNo: "REC-889102", amount: 1450.00, status: "CLEARED" },
    { receiptId: "TAX-2025-004", holdingNo: "405", mouza: "Tejgaon", khatian: "405", plot: "405", payer: "Green Assets Ltd", bengaliYear: "1432 BS", gregYear: 2025, receiptNo: "REC-991823", amount: 12500.00, status: "CLEARED" },
    { receiptId: "TAX-2025-005", holdingNo: "612", mouza: "Badda", khatian: "612", plot: "1205", payer: "Mohammad Hossain", bengaliYear: "1432 BS", gregYear: 2025, receiptNo: "PENDING", amount: 0.00, status: "OVERDUE" }
  ],

  disputes: [
    {
      id: "DSP-2024-01",
      parcelId: "PRC-002",
      caseNo: "Title Suit No. 142/2024",
      court: "2nd Senior Assistant Judge Court Dhaka",
      caseType: "Title & Permanent Injunction",
      plaintiff: "Rafiqul Islam",
      defendant: "Mohammad Hossain",
      counsel: "Adv. A. Rahman (01711-XXXXXX)",
      injunction: "TEMPORARY_INJUNCTION_ACTIVE",
      stage: "Framing of Issues",
      nextDate: "2026-10-14",
      subject: "Disputed boundary overlap of 2.5 decimals on northern line"
    },
    {
      id: "DSP-2025-02",
      parcelId: "PRC-002",
      caseNo: "Misc Case No. 89/2025",
      court: "Court of Additional District Magistrate Dhaka",
      caseType: "Section 144 CrPC",
      plaintiff: "Mohammad Hossain",
      defendant: "Rafiqul Islam",
      counsel: "Adv. K. Alam (01819-XXXXXX)",
      injunction: "STATUS_QUO_ORDERED",
      stage: "Police Report Submitted",
      nextDate: "2026-09-25",
      subject: "Restraining construction of temporary tin shed structure"
    }
  ],

  evidence: [
    { id: "EV-2026-001", desc: "Certified True Copy of BS Khatian 1084", source: "DC Office Record Room", date: "2024-01-15", custodian: "Lead Counsel", sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", state: "SEALED_ORIGINAL" },
    { id: "EV-2026-002", desc: "Certified Volume Copy of Deed 4521/2015", source: "Badda Sub-Registry Office", date: "2022-04-10", custodian: "Lead Counsel", sha256: "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e", state: "SEALED_ORIGINAL" },
    { id: "EV-2026-003", desc: "Maxar WorldView-3 Satellite Capture", source: "European Space Agency / Maxar", date: "2025-02-18", custodian: "GIS Analyst", sha256: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9", state: "DIGITAL_VERIFIED" },
    { id: "EV-2026-004", desc: "DGPS RTK Raw Coordinate Log File", source: "Field Survey Team", date: "2026-08-15", custodian: "Senior Surveyor", sha256: "7d793037a0760186574b0282f2f435e70f16100e3248962425164493b93a577f", state: "DIGITAL_VERIFIED" }
  ],

  waypoints: [
    { name: "CP-01", lat: 23.784400, lng: 90.426500, ele: 8.5, desc: "South-West Boundary Pillar (RCC Monument)" },
    { name: "CP-02", lat: 23.784400, lng: 90.426900, ele: 8.6, desc: "South-East Boundary Pillar (RCC Monument at Road)" },
    { name: "CP-03", lat: 23.784650, lng: 90.426900, ele: 8.7, desc: "North-East Boundary Pillar (Shared wall junction)" },
    { name: "CP-04", lat: 23.784650, lng: 90.426500, ele: 8.6, desc: "North-West Boundary Pillar (Rear perimeter wall)" }
  ],

  measurements: [
    { id: "MB-01", stationFrom: "CP-01", stationTo: "CP-02", distanceFt: 135.20, links: 204.85, bearing: 90.0, feature: "Southern Road Frontage" },
    { id: "MB-02", stationFrom: "CP-02", stationTo: "CP-03", distanceFt: 46.75, links: 70.83, bearing: 0.0, feature: "Eastern Boundary Wall" },
    { id: "MB-03", stationFrom: "CP-03", stationTo: "CP-04", distanceFt: 135.15, links: 204.77, bearing: 270.0, feature: "Northern Rear Boundary" },
    { id: "MB-04", stationFrom: "CP-04", stationTo: "CP-01", distanceFt: 46.80, links: 70.91, bearing: 180.0, feature: "Western Boundary Wall" },
    { id: "MB-05", stationFrom: "CP-01", stationTo: "CP-03", distanceFt: 143.05, links: 216.74, bearing: 69.5, feature: "Cross Diagonal Tie-Line" }
  ],

  chronology: [
    { year: "1925", type: "Survey", event: "CS published. Dag 402 recorded under CS Khatian 112 in the name of Kazi Nesaruddin & Azimullah.", weight: "Conclusive Root of Title" },
    { year: "1958", type: "Survey", event: "SA Survey published under SA Khatian 245. Entire 65 decimals in sole ownership of Azimullah.", weight: "Presumption of Correctness" },
    { year: "1978", type: "Devolution", event: "Death of Azimullah; devolved onto his sole son Rafiqullah under Islamic law.", weight: "Uncontested Succession" },
    { year: "1980", type: "Survey", event: "RS finalized. SA Dag 402 renumbered as RS Dag 851 & 852 in RS Khatian 512 for Rafiqullah.", weight: "Govt ROR Presumption" },
    { year: "1982", type: "Deed", event: "Rafiqullah executed Saf Kabala Deed 1842 transferring 30 decimals to Nurul Islam.", weight: "Registered Title Transfer" },
    { year: "2001", type: "Deed", event: "Partition Deed 3105 between heirs of Nurul Islam; 15 decimals allotted to Abdul Karim.", weight: "Registered Partition" },
    { year: "2015", type: "Deed", event: "Abdul Karim purchased remaining 14.50 decimals via Saf Kabala Deed 4521.", weight: "Immediate Vendor Title" },
    { year: "2021", type: "Mutation", event: "AC Land Badda Circle sanctioned Mutation Case 984/2021. Mutated Khatian 845 issued.", weight: "Revenue Recognition" },
    { year: "2022", type: "Ground", event: "10-foot RCC brick boundary wall constructed around entire perimeter.", weight: "Peaceful Possession" },
    { year: "2024", type: "Survey", event: "BS finalized; BS Dag 1204 recorded cleanly in BS Khatian 1084.", weight: "Current Official ROR" },
    { year: "2026", type: "Audit", event: "DGPS RTK ground survey completed; net possession 14.50 decimals verified.", weight: "Engineering Certification" }
  ]
};

const STORAGE_KEY = "shetue_land_osint_data_v1";

class DataManager {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Could not load from localStorage, using seed data:", e);
    }
    this.saveData(SEED_DATA);
    return JSON.parse(JSON.stringify(SEED_DATA));
  }

  saveData(customData = null) {
    const toSave = customData || this.data;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  }

  getParcels() { return this.data.parcels; }
  getKhatians() { return this.data.khatians; }
  getDeeds() { return this.data.deeds; }
  getMutations() { return this.data.mutations; }
  getTaxes() { return this.data.taxes; }
  getDisputes() { return this.data.disputes; }
  getEvidence() { return this.data.evidence; }
  getWaypoints() { return this.data.waypoints; }
  getMeasurements() { return this.data.measurements; }
  getChronology() { return this.data.chronology; }

  addParcel(parcel) {
    this.data.parcels.push(parcel);
    this.saveData();
  }

  updateParcel(updatedParcel) {
    const index = this.data.parcels.findIndex(p => p.id === updatedParcel.id);
    if (index !== -1) {
      this.data.parcels[index] = updatedParcel;
      this.saveData();
    }
  }

  deleteParcel(id) {
    this.data.parcels = this.data.parcels.filter(p => p.id !== id);
    this.saveData();
  }

  resetDefaults() {
    this.data = JSON.parse(JSON.stringify(SEED_DATA));
    this.saveData();
  }

  exportJSON() {
    return JSON.stringify(this.data, null, 2);
  }

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.parcels && Array.isArray(parsed.parcels)) {
        this.data = parsed;
        this.saveData();
        return true;
      }
    } catch (e) {
      console.error("Invalid JSON:", e);
    }
    return false;
  }
}

// Global singleton instance
window.dataManager = new DataManager();
