// Sales & Export Operations Data Store
// Aligned with Devi Fisheries Limited Enterprise Seafood Processing & Export Standards
// Full support for environment segregation (Sitemap 01 isolated persistence vs Sitemap 02 canonical baseline)

import { Environment } from '../framework/Environment.js';

const SALES_STORAGE_KEY_S01 = 'dfl_sales_store_s01';
const SALES_STORAGE_KEY_S02 = 'dfl_sales_store_s02';

export const INITIAL_SALES_DATA = {
  // 1. PRODUCT MANAGEMENT (Master Data)
  products: [
    { id: "PROD-01", code: "VM", name: "Vannamei Shrimp", description: "Pacific White Shrimp (Litopenaeus vannamei)", active: true },
    { id: "PROD-02", code: "BT", name: "Black Tiger Prawns", description: "Giant Tiger Prawn (Penaeus monodon)", active: true },
    { id: "PROD-03", code: "FW", name: "Freshwater Scampi", description: "Macrobrachium rosenbergii", active: true },
    { id: "PROD-04", code: "SQ", name: "Indian Ocean Squid", description: "Loligo duvauceli", active: true },
    { id: "PROD-05", code: "CT", name: "Cuttlefish Whole & Fillet", description: "Sepia pharaonis", active: false }
  ],

  preparations: [
    { id: "PREP-01", name: "HLSO", description: "Headless Shell-On", shortCode: "HLSO", hsCode: "0306.17", qcCode: "QC-249", gstRate: 5, fromDate: "2024-04-01" },
    { id: "PREP-02", name: "PDTO", description: "Peeled & Deveined Tail-On", shortCode: "PDTO", hsCode: "0306.17", qcCode: "QC-250", gstRate: 5, fromDate: "2024-04-01" },
    { id: "PREP-03", name: "PD", description: "Peeled & Deveined Tail-Off", shortCode: "PD", hsCode: "0306.17", qcCode: "QC-251", gstRate: 5, fromDate: "2024-04-01" },
    { id: "PREP-04", name: "PUD", description: "Peeled Undeveined", shortCode: "PUD", hsCode: "0306.17", qcCode: "QC-252", gstRate: 5, fromDate: "2024-04-01" },
    { id: "PREP-05", name: "EZ PEEL", description: "Easy Peel Split Back Shell-On", shortCode: "EZP", hsCode: "0306.17", qcCode: "QC-253", gstRate: 5, fromDate: "2024-04-01" },
    { id: "PREP-06", name: "BUTTERFLY", description: "Tail-On Butterfly Cut", shortCode: "BTF", hsCode: "0306.17", qcCode: "QC-254", gstRate: 5, fromDate: "2024-04-01" }
  ],

  speciesMaster: [
    { id: "SP-01", name: "Vannamei", shortCode: "VM", qcSpeciesCode: "QC-VM-01", description: "Litopenaeus vannamei, brackish water farmed" },
    { id: "SP-02", name: "Black Tiger", shortCode: "BT", qcSpeciesCode: "QC-BT-02", description: "Penaeus monodon, coastal wild/farmed" },
    { id: "SP-03", name: "Scampi", shortCode: "SC", qcSpeciesCode: "QC-SC-03", description: "Macrobrachium rosenbergii, inland freshwater" },
    { id: "SP-04", name: "Sea White", shortCode: "SW", qcSpeciesCode: "QC-SW-04", description: "Penaeus indicus, deep sea trawl" }
  ],

  grades: [
    { id: "GRD-01", type: "Count", group: "U/10", value: "Colossal", shortCode: "U10", description: "Under 10 pieces per lb" },
    { id: "GRD-02", type: "Count", group: "16/20", value: "Jumbo", shortCode: "1620", description: "16 to 20 pieces per lb" },
    { id: "GRD-03", type: "Count", group: "21/25", value: "Extra Large", shortCode: "2125", description: "21 to 25 pieces per lb" },
    { id: "GRD-04", type: "Count", group: "26/30", value: "Large", shortCode: "2630", description: "26 to 30 pieces per lb" },
    { id: "GRD-05", type: "Count", group: "31/40", value: "Medium", shortCode: "3140", description: "31 to 40 pieces per lb" },
    { id: "GRD-06", type: "Count", group: "41/50", value: "Small", shortCode: "4150", description: "41 to 50 pieces per lb" },
    { id: "GRD-07", type: "Count", group: "51/60", value: "Extra Small", shortCode: "5160", description: "51 to 60 pieces per lb" }
  ],

  packingStyles: [
    { id: "PK-01", totalSlabs: 10, slabWeight: 1, uom: "KGS", tareWeight: 1.0, grossWeight: 11.0, name: "10 X 1 KGS" },
    { id: "PK-02", totalSlabs: 10, slabWeight: 2, uom: "LBS", tareWeight: 2.0, grossWeight: 22.0, name: "10 X 2 LBS" },
    { id: "PK-03", totalSlabs: 1, slabWeight: 10, uom: "KGS", tareWeight: 1.0, grossWeight: 11.0, name: "1 X 10 KGS" },
    { id: "PK-04", totalSlabs: 5, slabWeight: 2, uom: "KGS", tareWeight: 1.2, grossWeight: 11.2, name: "5 X 2 KGS" },
    { id: "PK-05", totalSlabs: 6, slabWeight: 1.8, uom: "KGS", tareWeight: 1.0, grossWeight: 11.8, name: "6 X 1.8 KGS" }
  ],

  varieties: [
    {
      id: "VAR-001",
      supc: "1186",
      buyerSupc: "SYS-VAN-1186",
      species: "Vannamei",
      productForm: "HLSO",
      freezingType: "Block",
      productType: "Raw",
      preparation: "HLSO",
      glazeStatus: "Yes",
      glazePct: 10,
      glazeType: "Water",
      treatment: "None",
      brand: "Devi Gold",
      grade: "16/20",
      packingStyle: "10 X 1 KGS",
      description: "Vannamei HLSO 16/20 Block 10% Glaze",
      buyerDescription: "Frozen Farm-Raised HLSO White Shrimp 16/20 Block 10x1kg",
      active: true
    },
    {
      id: "VAR-002",
      supc: "2836",
      buyerSupc: "SYS-VAN-2836",
      species: "Vannamei",
      productForm: "PDTO",
      freezingType: "IQF/SIQF",
      productType: "Value Added",
      preparation: "PDTO",
      glazeStatus: "Yes",
      glazePct: 15,
      glazeType: "Water",
      treatment: "STPP",
      brand: "Bay Gourmet",
      grade: "21/25",
      packingStyle: "10 X 2 LBS",
      description: "Vannamei PDTO 21/25 IQF 15% Glaze STPP",
      buyerDescription: "Premium IQF Tail-On Peeled White Shrimp 21/25 10x2lb Bags",
      active: true
    },
    {
      id: "VAR-003",
      supc: "3001",
      buyerSupc: "MAR-CK-3001",
      species: "Vannamei",
      productForm: "PD",
      freezingType: "Cooked",
      productType: "Cooked",
      preparation: "PD",
      glazeStatus: "No",
      glazePct: 0,
      glazeType: "None",
      treatment: "Natural",
      brand: "AquaStar Premium",
      grade: "26/30",
      packingStyle: "10 X 1 KGS",
      description: "Vannamei Cooked PD 26/30 IQF Natural",
      buyerDescription: "Fully Cooked Cocktail Shrimp 26/30 10x1kg",
      active: true
    },
    {
      id: "VAR-004",
      supc: "4001",
      buyerSupc: "EU-BL-4001",
      species: "Black Tiger",
      productForm: "HLSO",
      freezingType: "Blanched",
      productType: "Value Added",
      preparation: "HLSO",
      glazeStatus: "Yes",
      glazePct: 10,
      glazeType: "Water",
      treatment: "None",
      brand: "Devi Diamond",
      grade: "U/10",
      packingStyle: "1 X 10 KGS",
      description: "Black Tiger Blanched HLSO U/10 10% Glaze",
      buyerDescription: "Blanched Colossal Black Tiger Prawns U/10 Bulk 10kg Master",
      active: true
    }
  ],

  // 2. BUYER MANAGEMENT
  buyers: [
    {
      id: "BYR-001",
      name: "Apex Seafoods USA Inc.",
      code: "APX-USA",
      country: "USA",
      address: "1028 Harborview Boulevard, Suite 400, Baltimore, MD 21202",
      email: "procurement@apexseafoods-usa.com",
      contactPerson: "David Henderson",
      phone: "+1 (410) 555-0192",
      irsNumber: "52-1984729",
      state: "Maryland",
      zipcode: "21202",
      iftpCode: "IFTP-USA-8942",
      creditLimitDays: 30,
      status: "Active"
    },
    {
      id: "BYR-002",
      name: "Maritime Gourmet Corp",
      code: "MGC-USA",
      country: "USA",
      address: "740 Pacific Gateway Highway, Long Beach, CA 90802",
      email: "imports@maritimegourmet.com",
      contactPerson: "Sarah Jenkins",
      phone: "+1 (562) 555-8834",
      irsNumber: "95-4482012",
      state: "California",
      zipcode: "90802",
      iftpCode: "IFTP-USA-3109",
      creditLimitDays: 45,
      status: "Active"
    },
    {
      id: "BYR-003",
      name: "Shanghai Ocean Wealth Trade Ltd",
      code: "SOW-CHN",
      country: "China",
      address: "Tower B, Pudong New Area Marine Trade Hub, Shanghai 200120",
      email: "trade@oceanwealth-sh.cn",
      contactPerson: "Li Wei Chen",
      phone: "+86 21 6888 2900",
      usciCode: "91310000MA1FL4P29X",
      iftpCode: "IFTP-CHN-4481",
      creditLimitDays: 60,
      status: "Active"
    },
    {
      id: "BYR-004",
      name: "Nippon Suisan Haigo KK",
      code: "NSH-JPN",
      country: "Japan",
      address: "3-4-12 Toyosu, Koto-ku, Tokyo 135-0061",
      email: "import@nippon-suisan.co.jp",
      contactPerson: "Kenji Takahashi",
      phone: "+81 3 5552 1100",
      iftpCode: "IFTP-JPN-0021",
      creditLimitDays: 21,
      status: "Active"
    }
  ],

  consignees: [
    {
      id: "CSG-001",
      name: "Americold Cold Storage Logistics - Baltimore Dock",
      code: "AMC-BAL",
      country: "USA",
      address: "Dock 14, 2100 Broening Hwy, Baltimore, MD 21224",
      email: "receiving.baltimore@americold.com",
      contactPerson: "Marcus Vance",
      phone: "+1 (410) 555-7382",
      irsNumber: "52-9981241",
      state: "Maryland",
      zipcode: "21224"
    },
    {
      id: "CSG-002",
      name: "Lineage Logistics Terminal 4 - Long Beach Port",
      code: "LNG-LGB",
      country: "USA",
      address: "1250 Pier F Ave, Long Beach, CA 90802",
      email: "inbound@lineagelogistics-lb.com",
      contactPerson: "Carlos Rivera",
      phone: "+1 (562) 555-9011",
      irsNumber: "95-7762109",
      state: "California",
      zipcode: "90802"
    },
    {
      id: "CSG-003",
      name: "Shanghai Yangshan Deepwater Logistics Depot",
      code: "YSN-SH",
      country: "China",
      address: "Area 3, Yangshan Bonded Port, Shanghai 201308",
      email: "colddepot@yangshanport.com",
      contactPerson: "Zhang Ming",
      phone: "+86 21 5822 4000",
      usciCode: "91310000MA1FL4P29X"
    }
  ],

  notifyParties: [
    {
      id: "NOT-001",
      name: "Expeditors International Customs Brokerage",
      country: "USA",
      address: "400 Continental Blvd, El Segundo, CA 90245",
      email: "brokerage.ocean@expeditors.com",
      contactPerson: "Emily Watson",
      phone: "+1 (310) 555-4300",
      scacCode: "EXPD"
    },
    {
      id: "NOT-002",
      name: "Kuehne + Nagel Customs & Logistics USA",
      country: "USA",
      address: "10 exchange place, 19th Floor, Jersey City, NJ 07302",
      email: "us.seafood@kuehne-nagel.com",
      contactPerson: "Robert Sterling",
      phone: "+1 (201) 555-7700",
      scacCode: "KHNN"
    }
  ],

  applicants: [
    { id: "APP-01", buyerName: "Apex Seafoods USA Inc.", applicantName: "Apex Global Holdings LLC", country: "USA", address: "1028 Harborview Blvd, Baltimore, MD" },
    { id: "APP-02", buyerName: "Maritime Gourmet Corp", applicantName: "Maritime Pacific Trade Ltd", country: "USA", address: "740 Pacific Gateway Hwy, Long Beach, CA" }
  ],

  brands: [
    { id: "BRD-01", buyer: "Apex Seafoods USA Inc.", brandName: "Devi Gold", brandType: "Both", printStatus: "Approved for Print", remarks: "Flagship USFDA compliant retail brand" },
    { id: "BRD-02", buyer: "Maritime Gourmet Corp", brandName: "Bay Gourmet", brandType: "Sale", printStatus: "Approved for Print", remarks: "Private label customer brand" },
    { id: "BRD-03", buyer: "Devi Fisheries Corporate", brandName: "Devi Diamond", brandType: "Store", printStatus: "Approved for Print", remarks: "Internal premium house reserve brand" },
    { id: "BRD-04", buyer: "Shanghai Ocean Wealth", brandName: "Eastern Dragon", brandType: "Sale", printStatus: "Pending Approval", remarks: "Awaiting packaging artwork signoff" }
  ],

  // 3. ORDERS (Sales Execution)
  proformaInvoices: [
    {
      id: "PI-01",
      piNumber: "DFL/PI/1313/26-27",
      piDate: "2026-10-02",
      poNumber: "PO-APX-2026-881",
      poDate: "2026-10-01",
      exporter: "Devi Fisheries Limited Unit-1",
      processor: "DFL Unit-1 Visakhapatnam",
      buyer: "Apex Seafoods USA Inc.",
      consignee: "Americold Cold Storage Logistics - Baltimore Dock",
      importerOfRecord: "Apex Seafoods USA Inc. (IRS 52-1984729)",
      portOfLoading: "Visakhapatnam (INVTZ1)",
      destinationCountry: "USA",
      portOfDischarge: "Baltimore Port (USBMI)",
      finalDestination: "Baltimore, MD",
      shipByDate: "2026-11-15",
      shipByWindow: "10th Nov to 15th Nov 2026",
      paymentTerms: "LC at Sight 60 Days",
      shipmentTerms: "CIF Baltimore",
      currency: "USD",
      containersCount: 2,
      totalCartons: 3600,
      netWeightKg: 36000,
      totalAmountUsd: 342000,
      freightUsd: 14000,
      insuranceUsd: 1850,
      productionPlant: "DFL Unit-1 Visakhapatnam",
      status: "Approved",
      customInvoiceGenerated: true
    },
    {
      id: "PI-02",
      piNumber: "DFL/PI/1314/26-27",
      piDate: "2026-10-08",
      poNumber: "PO-MGC-2026-402",
      poDate: "2026-10-06",
      exporter: "Devi Fisheries Limited Unit-2",
      processor: "DFL Unit-2 Kakinada Port",
      buyer: "Maritime Gourmet Corp",
      consignee: "Lineage Logistics Terminal 4 - Long Beach Port",
      importerOfRecord: "Maritime Gourmet Corp (IRS 95-4482012)",
      portOfLoading: "Visakhapatnam (INVTZ1)",
      destinationCountry: "USA",
      portOfDischarge: "Long Beach Port (USLGB)",
      finalDestination: "Long Beach, CA",
      shipByDate: "2026-11-28",
      shipByWindow: "25th Nov to 28th Nov 2026",
      paymentTerms: "TT 30 Days from BL",
      shipmentTerms: "FOB Visakhapatnam",
      currency: "USD",
      containersCount: 1,
      totalCartons: 1800,
      netWeightKg: 18144,
      totalAmountUsd: 185200,
      freightUsd: 0,
      insuranceUsd: 950,
      productionPlant: "DFL Unit-2 Kakinada",
      status: "Po Received",
      customInvoiceGenerated: false
    },
    {
      id: "PI-03",
      piNumber: "DFL/PI/1315/26-27",
      piDate: "2026-10-12",
      poNumber: "PO-SOW-2026-919",
      poDate: "2026-10-10",
      exporter: "Devi Fisheries Limited Unit-1",
      processor: "DFL Unit-1 Visakhapatnam",
      buyer: "Shanghai Ocean Wealth Trade Ltd",
      consignee: "Shanghai Yangshan Deepwater Logistics Depot",
      importerOfRecord: "Shanghai Ocean Wealth Trade Ltd",
      portOfLoading: "Visakhapatnam (INVTZ1)",
      destinationCountry: "China",
      portOfDischarge: "Shanghai Yangshan (CNSHA)",
      finalDestination: "Shanghai, China",
      shipByDate: "2026-12-05",
      shipByWindow: "1st Dec to 5th Dec 2026",
      paymentTerms: "LC at Sight 100%",
      shipmentTerms: "CIF Shanghai",
      currency: "USD",
      containersCount: 3,
      totalCartons: 5400,
      netWeightKg: 54000,
      totalAmountUsd: 486000,
      freightUsd: 18000,
      insuranceUsd: 2400,
      productionPlant: "DFL Unit-1 Visakhapatnam",
      status: "PI-Pending",
      customInvoiceGenerated: false
    }
  ],

  customInvoices: [
    {
      id: "CINV-01",
      invoiceNo: "DFL/EXP/2026-27/084",
      invoiceDate: "2026-10-09",
      piNumber: "DFL/PI/1313/26-27",
      poNumber: "PO-APX-2026-881",
      buyer: "Apex Seafoods USA Inc.",
      consignee: "Americold Cold Storage Logistics - Baltimore Dock",
      totalCartons: 3600,
      netWeightKg: 36000,
      grossWeightKg: 39600,
      invoiceValueUsd: 342000,
      stockOutDate: "2026-10-12",
      status: "Completed",
      requiresAttention: false
    },
    {
      id: "CINV-02",
      invoiceNo: "DFL/EXP/2026-27/085",
      invoiceDate: "2026-10-14",
      piNumber: "DFL/PI/1314/26-27",
      poNumber: "PO-MGC-2026-402",
      buyer: "Maritime Gourmet Corp",
      consignee: "Lineage Logistics Terminal 4 - Long Beach Port",
      totalCartons: 1800,
      netWeightKg: 18144,
      grossWeightKg: 19958,
      invoiceValueUsd: 185200,
      stockOutDate: null,
      status: "Pending",
      requiresAttention: true
    }
  ],

  isfDetails: [
    {
      id: "ISF-01",
      customInvoiceNo: "DFL/EXP/2026-27/084",
      piNumber: "DFL/PI/1313/26-27",
      poNumber: "PO-APX-2026-881",
      buyer: "Apex Seafoods USA Inc.",
      shippingLine: "Mediterranean Shipping Company (MSC)",
      containerNumber: "MSCU7397679",
      linerSealNumber: "MSC-SL-901844",
      blNumber: "MEDUAPX2609918",
      blDate: "2026-10-14",
      shippingOnboardDate: "2026-10-15",
      stuffingLocation: "DFL Unit-1 VSP(853)",
      sizeType: "40 FT HC REEFER",
      tempRecord: "-20 DEGREES CELSIUS",
      isfTransactionNo: "ISF-2026-USCBP-98214",
      status: "Completed"
    },
    {
      id: "ISF-02",
      customInvoiceNo: "DFL/EXP/2026-27/085",
      piNumber: "DFL/PI/1314/26-27",
      poNumber: "PO-MGC-2026-402",
      buyer: "Maritime Gourmet Corp",
      shippingLine: "Maersk Line",
      containerNumber: "MSKU4109823",
      linerSealNumber: "MSK-992144",
      blNumber: "Pending",
      blDate: "2026-10-20",
      shippingOnboardDate: "2026-10-22",
      stuffingLocation: "DFL Unit-2 KKD(412)",
      sizeType: "40 FT HC REEFER",
      tempRecord: "-21 DEGREES CELSIUS",
      isfTransactionNo: "Pending",
      status: "Pending"
    }
  ],

  shippingBills: [
    {
      id: "SB-01",
      invoiceNo: "DFL/EXP/2026-27/084",
      shippingBillNo: "SB-9844210",
      shippingDate: "2026-10-14",
      leoDate: "2026-10-14",
      poNumber: "PO-APX-2026-881",
      consignee: "Americold Cold Storage Logistics - Baltimore Dock",
      invoiceValueUsd: 342000,
      freightUsd: 14000,
      otherDeductionsUsd: 1200,
      exchangeRate: 83.85,
      fobInr: 27402180, // (342000 - 14000 - 1200) * 83.85
      sbFobUsd: 326800,
      sbFobInr: 27402180,
      status: "Completed"
    }
  ],

  commercialInvoices: [
    {
      id: "COMM-01",
      invoiceNo: "DFL/EXP/2026-27/084",
      invoiceDate: "2026-10-14",
      piNumber: "DFL/PI/1313/26-27",
      poNumber: "PO-APX-2026-881",
      buyer: "Apex Seafoods USA Inc.",
      consignee: "Americold Cold Storage Logistics - Baltimore Dock",
      paymentTerms: "LC at Sight 60 Days",
      shipmentTerms: "CIF Baltimore",
      currency: "USD",
      invoiceValue: 342000,
      exchangeRate: 83.85,
      blNumber: "MEDUAPX2609918",
      blDate: "2026-10-14",
      containerNumber: "MSCU7397679",
      tempLoggerId: "LOG-SENSITECH-8841",
      status: "Generated"
    }
  ],

  etaStatus: [
    {
      id: "ETA-01",
      invoiceNo: "DFL/EXP/2026-27/084",
      buyer: "Apex Seafoods USA Inc.",
      poNumber: "PO-APX-2026-881",
      product: "Vannamei HLSO 16/20 Block",
      brand: "Devi Gold",
      cartons: 3600,
      blNumber: "MEDUAPX2609918",
      containerNumber: "MSCU7397679",
      finalDestination: "Baltimore, MD",
      onBoardDate: "2026-10-15",
      actualEta: "2026-11-20",
      etaFd: "2026-11-22",
      gateOutDate: null,
      entryNumber: "CBP-BAL-26-88910",
      liner: "MSC",
      deliveryTerms: "CIF Baltimore",
      transitDays: 36,
      transitDaysPerLiner: 36,
      isFda: "Yes",
      status: "On Water"
    }
  ],

  fdaStatus: [
    {
      id: "FDA-01",
      invoiceNo: "DFL/EXP/2026-27/084",
      poNumber: "PO-APX-2026-881",
      buyer: "Apex Seafoods USA Inc.",
      shippingBillNo: "SB-9844210",
      containerNumber: "MSCU7397679",
      blNumber: "MEDUAPX2609918",
      cartons: 3600,
      netWeightKg: 36000,
      fdaEntryNumber: "FDA-2026-88190-BAL",
      fdaEntryDate: "2026-10-16",
      fdaExam: "Under Document Review",
      noticeDate1: "2026-10-16",
      noticeDate2: null,
      noticeDate3: null,
      noticeDate4: null,
      sampleCollectionDate: null,
      sampleReceivedDate: null,
      status: "Pending",
      remarks: "Prior Notice filed and acknowledged by USFDA Port Director"
    }
  ],

  clearingAgents: [
    {
      id: "CLR-01",
      invoiceNo: "DFL/EXP/2026-27/084",
      buyer: "Apex Seafoods USA Inc.",
      blNumber: "MEDUAPX2609918",
      portOfDischarge: "Baltimore Port",
      notifyPartyName: "Expeditors International Customs Brokerage",
      agentName: "Expeditors USA (Agent: John Gallagher)",
      contactPhone: "+1 (410) 555-1200",
      status: "Assigned"
    }
  ],

  // 4. PAYMENTS & FINANCIALS
  forwardContracts: [
    {
      id: "FC-01",
      contractNumber: "FC-2026-1089",
      bookedDate: "2026-09-15",
      company: "Devi Fisheries Limited Unit-1",
      bookedValueUsd: 1000000,
      utilizedValueUsd: 684000,
      balanceValueUsd: 316000,
      spotRate: 83.65,
      premiumRate: 0.60,
      branchMargin: 0.15,
      totalRate: 84.10, // 83.65 + 0.60 - 0.15
      startDate: "2026-10-01",
      endDate: "2026-12-31",
      month: "December 2026",
      status: "Active"
    },
    {
      id: "FC-02",
      contractNumber: "FC-2026-1090",
      bookedDate: "2026-10-01",
      company: "Devi Fisheries Limited Unit-1",
      bookedValueUsd: 500000,
      utilizedValueUsd: 185200,
      balanceValueUsd: 314800,
      spotRate: 83.80,
      premiumRate: 0.55,
      branchMargin: 0.15,
      totalRate: 84.20,
      startDate: "2026-11-01",
      endDate: "2027-01-31",
      month: "January 2027",
      status: "Active"
    }
  ],

  collections: [
    {
      id: "COL-01",
      invoiceNo: "DFL/EXP/2026-27/082",
      poNumber: "PO-APX-2026-779",
      buyer: "Apex Seafoods USA Inc.",
      consigneeName: "Americold Cold Storage - Baltimore",
      invoiceValueUsd: 285000,
      utilizedValueUsd: 285000,
      balanceUsd: 0,
      collectionRate: 83.95,
      bankChargesUsd: 450,
      deductionsUsd: 800,
      extraAmountUsd: 0,
      valueInr: 23820812.5, // (285000 - 450 - 800 + 0) * 83.95
      bankRefNo: "HDFC/TT/EX/99210",
      collectionDate: "2026-10-05",
      paymentMode: "TT Remittance",
      forwardContractNo: "FC-2026-1089",
      status: "Fully Collected"
    },
    {
      id: "COL-02",
      invoiceNo: "DFL/EXP/2026-27/084",
      poNumber: "PO-APX-2026-881",
      buyer: "Apex Seafoods USA Inc.",
      consigneeName: "Americold Cold Storage - Baltimore",
      invoiceValueUsd: 342000,
      utilizedValueUsd: 0,
      balanceUsd: 342000,
      collectionRate: 84.10,
      bankChargesUsd: 0,
      deductionsUsd: 0,
      extraAmountUsd: 0,
      valueInr: 0,
      bankRefNo: "Pending",
      collectionDate: null,
      paymentMode: "LC at Sight",
      forwardContractNo: "FC-2026-1089",
      status: "Pending"
    }
  ],

  negotiations: [
    {
      id: "NEG-01",
      invoiceNo: "DFL/EXP/2026-27/084",
      poNumber: "PO-APX-2026-881",
      consigneeName: "Americold Cold Storage - Baltimore",
      bankRefNo: "SBI-IFB-LC-8819",
      submissionDate: "2026-10-15",
      docType: "LC Document Set (Full Clean Onboard BL, CO, Lab Cert, Health Cert)",
      status: "Negotiated"
    }
  ],

  realizations: [
    {
      id: "RLZ-01",
      invoiceNo: "DFL/EXP/2026-27/082",
      salesInvoiceDate: "2026-09-10",
      consignee: "Americold Cold Storage - Baltimore",
      transactionType: "Export Direct Bill Discounting",
      totalInvoiceValueUsd: 285000,
      realisedValueUsd: 285000,
      dateOfDiscounting: "2026-09-14",
      bankRefNo: "HDFC/TT/EX/99210",
      dateOfReceipt: "2026-10-05",
      amountInr: 23820812.5,
      status: "Realized"
    }
  ],

  // 5. INSURANCE
  marineInsurancePending: [
    {
      id: "INS-P-01",
      invoiceNo: "DFL/EXP/2026-27/084",
      vesselName: "MSC CLEA / Voy 268E",
      shippingOnboardDate: "2026-10-15",
      containerNo: "MSCU7397679",
      portOfLoading: "Visakhapatnam",
      portOfDischarge: "Baltimore Port",
      destinationCountry: "USA",
      totalInvoiceValueUsd: 342000,
      cargoSumInsuredUsd: 376200, // 110% CIF
      underwriter: "The New India Assurance Co. Ltd",
      status: "Pending Policy"
    },
    {
      id: "INS-P-02",
      invoiceNo: "DFL/EXP/2026-27/085",
      vesselName: "MAERSK MC-KINNEY / Voy 110W",
      shippingOnboardDate: "2026-10-22",
      containerNo: "MSKU4109823",
      portOfLoading: "Visakhapatnam",
      portOfDischarge: "Long Beach Port",
      destinationCountry: "USA",
      totalInvoiceValueUsd: 185200,
      cargoSumInsuredUsd: 203720,
      underwriter: "United India Insurance Co.",
      status: "Pending Policy"
    }
  ],

  insurancePolicies: [
    {
      id: "POL-01",
      policyNumber: "POL-NIA-MAR-2026-9081",
      generatedOn: "2026-10-08",
      invoicesCount: 4,
      totalSumInsuredUsd: 1140000,
      premiumPaidInr: 285000,
      status: "Active Policy"
    }
  ],

  insurancePayments: [
    {
      id: "INSP-01",
      insNo: "INS-PAY-2026-01",
      paymentDate: "2026-10-09",
      invoicesList: ["DFL/EXP/2026-27/079", "DFL/EXP/2026-27/080", "DFL/EXP/2026-27/081", "DFL/EXP/2026-27/082"],
      invoicesCount: 4,
      totalPremiumInr: 285000,
      underwriter: "The New India Assurance",
      chequeRef: "CHQ-HDFC-991823"
    }
  ],

  // 6. DASHBOARD KPIs & METRICS
  dashboardKpis: {
    pendingContracts: { count: 8, trend: "+12.5%", label: "Active Orders" },
    onWaterShipments: { count: 5, containers: 11, label: "Containers En Route" },
    deliveredShipments: { count: 24, tons: 432, label: "Delivered YTD" },
    ordersQueue: { count: 14, tons: 252, label: "Processing & Staging" },
    pendingPaymentsUsd: { amount: 527200, inrEquivalent: 44205720, label: "Outstanding Receivables" },
    paymentsRealizedMonth: { amount: 842000, inrEquivalent: 70601700, label: "Realized This Month" }
  },

  // 7. REPORTS & ANALYTICS
  delayedShipments: [
    {
      id: "DSH-01",
      orderNo: "PO-APX-2026-780",
      invoiceNo: "DFL/EXP/2026-27/083",
      buyer: "Apex Seafoods USA Inc.",
      destinationPort: "Long Beach Port, CA",
      scheduledShipDate: "2026-10-10",
      currentEta: "2026-10-24",
      daysDelayed: 6,
      liner: "Maersk Line",
      delayReason: "Vessel blank sailing / feeder connection delay at Colombo",
      status: "Rescheduled"
    },
    {
      id: "DSH-02",
      orderNo: "PO-NIP-2026-192",
      invoiceNo: "DFL/EXP/2026-27/081",
      buyer: "Nippon Suisan Kaisha Ltd.",
      destinationPort: "Yokohama Port, Japan",
      scheduledShipDate: "2026-10-12",
      currentEta: "2026-10-20",
      daysDelayed: 4,
      liner: "Ocean Network Express (ONE)",
      delayReason: "Reefer container staging delay during typhoon advisory",
      status: "In Transit"
    }
  ],

  salesSummaries: [
    {
      id: "SS-01",
      region: "North America (USA)",
      destinationPorts: "Baltimore, Long Beach, Newark",
      ordersCount: 38,
      containersCount: 52,
      volumeMt: 936,
      fobUsd: 8424000,
      realizedInr: 706017000,
      realizationPct: 94.2
    },
    {
      id: "SS-02",
      region: "East Asia (Japan)",
      destinationPorts: "Tokyo, Yokohama, Kobe",
      ordersCount: 16,
      containersCount: 22,
      volumeMt: 396,
      fobUsd: 3762000,
      realizedInr: 315631800,
      realizationPct: 96.5
    },
    {
      id: "SS-03",
      region: "European Union (EU)",
      destinationPorts: "Rotterdam, Antwerp, Hamburg",
      ordersCount: 12,
      containersCount: 16,
      volumeMt: 288,
      fobUsd: 2592000,
      realizedInr: 217209600,
      realizationPct: 91.0
    }
  ],

  // 8. PRODUCT CONSUMPTION LEDGER
  consumptionLedger: [
    {
      id: "CSL-01",
      batchNo: "BATCH-2026-0881",
      date: "2026-10-14",
      species: "Vannamei (Litopenaeus vannamei)",
      gradeIntake: "30-40 Count",
      rawMaterialIntakeKg: 12500,
      peeledLossKg: 4250,
      finishedProductForm: "HLSO 16/20 Block",
      packOutCartons: 750,
      finishedOutputKg: 7500,
      actualYieldPct: 60.0,
      standardYieldPct: 59.5,
      variancePct: "+0.5%",
      status: "Verified"
    },
    {
      id: "CSL-02",
      batchNo: "BATCH-2026-0882",
      date: "2026-10-15",
      species: "Black Tiger (Penaeus monodon)",
      gradeIntake: "U/10 Jumbo",
      rawMaterialIntakeKg: 8400,
      peeledLossKg: 2940,
      finishedProductForm: "PDTO IQF 10x2 LBS",
      packOutCartons: 500,
      finishedOutputKg: 5000,
      actualYieldPct: 59.52,
      standardYieldPct: 59.0,
      variancePct: "+0.52%",
      status: "Verified"
    },
    {
      id: "CSL-03",
      batchNo: "BATCH-2026-0883",
      date: "2026-10-16",
      species: "Vannamei (Litopenaeus vannamei)",
      gradeIntake: "41-50 Small",
      rawMaterialIntakeKg: 15200,
      peeledLossKg: 6384,
      finishedProductForm: "Cooked PUD IQF",
      packOutCartons: 880,
      finishedOutputKg: 8800,
      actualYieldPct: 57.89,
      standardYieldPct: 58.0,
      variancePct: "-0.11%",
      status: "In Progress"
    }
  ]
};

export const SalesDataStore = {
  getStoreKey() {
    return Environment.isSitemap01() ? SALES_STORAGE_KEY_S01 : SALES_STORAGE_KEY_S02;
  },

  getAll() {
    const key = this.getStoreKey();
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Failed to load sales store from localStorage:", e);
    }
    // Return deep cloned baseline
    const fresh = JSON.parse(JSON.stringify(INITIAL_SALES_DATA));
    this.saveAll(fresh);
    return fresh;
  },

  saveAll(data) {
    const key = this.getStoreKey();
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to persist sales data to localStorage:", e);
    }
  },

  getCollection(collName) {
    const data = this.getAll();
    return data[collName] || [];
  },

  addItem(collName, item) {
    const data = this.getAll();
    if (!data[collName]) data[collName] = [];
    data[collName].unshift(item);
    this.saveAll(data);
    return item;
  },

  updateItem(collName, id, updates) {
    const data = this.getAll();
    if (!data[collName]) return null;
    const idx = data[collName].findIndex(x => x.id === id);
    if (idx !== -1) {
      data[collName][idx] = { ...data[collName][idx], ...updates };
      this.saveAll(data);
      return data[collName][idx];
    }
    return null;
  },

  deleteItem(collName, id) {
    const data = this.getAll();
    if (!data[collName]) return false;
    data[collName] = data[collName].filter(x => x.id !== id);
    this.saveAll(data);
    return true;
  },

  // Formula & Calculation Utilities
  calculateGrossWeight(totalSlabs, slabWeight, tareWeight) {
    const slabs = parseFloat(totalSlabs) || 0;
    const weight = parseFloat(slabWeight) || 0;
    const tare = parseFloat(tareWeight) || 0;
    return Number(((slabs * weight) + tare).toFixed(2));
  },

  generatePackingStyleName(totalSlabs, slabWeight, uom) {
    return `${totalSlabs || 0} X ${slabWeight || 0} ${uom || 'KGS'}`.trim();
  },

  generateSupc(freezingType, existingVarieties = []) {
    // SUPC Generation Rules:
    // Block: 1001-1999, 11000+
    // IQF/SIQF: 2001-2999, 21000+
    // Cooked: 3001-3999, 31000+
    // Blanched: 4001-4999, 41000+
    let prefix = 1;
    const ft = (freezingType || '').toUpperCase();
    if (ft.includes('IQF')) prefix = 2;
    else if (ft.includes('COOKED')) prefix = 3;
    else if (ft.includes('BLANCHED')) prefix = 4;
    else prefix = 1;

    const baseMin = prefix * 1000;
    const baseMax = baseMin + 999;
    const existingSupcs = (existingVarieties || [])
      .map(v => parseInt(v.supc, 10))
      .filter(n => !isNaN(n) && n >= baseMin && n <= baseMax);

    if (existingSupcs.length === 0) {
      return String(baseMin + 1);
    }
    const maxSupc = Math.max(...existingSupcs);
    return String(maxSupc + 1);
  },

  calculateForwardContractRate(spotRate, premiumRate, branchMargin) {
    const spot = parseFloat(spotRate) || 0;
    const prem = parseFloat(premiumRate) || 0;
    const margin = parseFloat(branchMargin) || 0;
    return Number((spot + prem - margin).toFixed(4));
  },

  calculateDaysOverdue(endDateStr) {
    if (!endDateStr) return 0;
    const end = new Date(endDateStr);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },

  calculateFobInr(invoiceValueUsd, freightUsd, deductionsUsd, exchangeRate) {
    const inv = parseFloat(invoiceValueUsd) || 0;
    const frt = parseFloat(freightUsd) || 0;
    const ded = parseFloat(deductionsUsd) || 0;
    const ex = parseFloat(exchangeRate) || 1;
    return Number(((inv - frt - ded) * ex).toFixed(2));
  },

  calculateCollectionValueInr(invoiceValueUsd, bankChargesUsd, deductionsUsd, extraAmountUsd, collectionRate) {
    const inv = parseFloat(invoiceValueUsd) || 0;
    const chg = parseFloat(bankChargesUsd) || 0;
    const ded = parseFloat(deductionsUsd) || 0;
    const extra = parseFloat(extraAmountUsd) || 0;
    const rate = parseFloat(collectionRate) || 1;
    return Number(((inv - chg - ded + extra) * rate).toFixed(2));
  }
};
