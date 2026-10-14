// Pre-Processing Module Mock & Operational Data Store
// Aligned with Camaroo ERP & Industrial Seafood Processing Standards (Devi Fisheries Limited)

export const PREPROCESSING_DATA = {
  kpis: {
    todayArrivalsKg: 42650,
    arrivalsTrendPct: '+12.4%',
    avgDeheadingYieldPct: 69.45,
    yieldBenchmarkPct: 68.50,
    chemicalStppBags: 18,
    chemicalBufferThreshold: 25,
    floorWipKg: 3103,
    pendingTransfersKg: 8420,
    countDiscrepancy: -19.6,
    activeBatchesCount: 7,
    clearedBatchesCount: 14
  },

  alerts: [
    {
      id: "ALT-PRE-01",
      severity: "danger",
      title: "Low Chemical Stock: STPP (Carnal 659S)",
      desc: "Current plant floor inventory at 18 Bags (Threshold: 25 Bags). Reorder required for Night Shift soaking tanks.",
      timestamp: "10 mins ago"
    },
    {
      id: "ALT-PRE-02",
      severity: "warning",
      title: "Count Variance on Batch VM-VSP-AVN-034",
      desc: "Received piece count varies by -19.6 pcs/kg vs Pond Bill Count from Godavari Delta Lot #14.",
      timestamp: "32 mins ago"
    },
    {
      id: "ALT-PRE-03",
      severity: "info",
      title: "Inter-Plant Transfer Dispatched from Unit-2 (KKD)",
      desc: "Vehicle AP 05 TX 9102 carrying 4,200 kg Chilled RHLSO in transit to DFL Unit-1 VSP. Temp: -1.4°C.",
      timestamp: "1 hour ago"
    }
  ],

  activeBatches: [
    {
      batchId: "BAT-PRE-2026-081",
      trackCode: "VM-VSP-AVN-034",
      species: "Vannamei (VM)",
      stage: "DEHEADING",
      lineTable: "Deheading Table #2",
      supervisor: "Laxmi Narayana",
      inputKg: 4200,
      outputKg: 2920,
      yieldPct: 69.52,
      targetYieldPct: 68.50,
      status: "IN PROGRESS",
      startTime: "08:30 IST",
      progressPct: 75
    },
    {
      batchId: "BAT-PRE-2026-082",
      trackCode: "VM-VSP-AKV-089",
      species: "Vannamei (VM)",
      stage: "GRADING",
      lineTable: "Roller Grader Line #1",
      supervisor: "B. Venkatesh",
      inputKg: 3800,
      outputKg: 3740,
      yieldPct: 98.42,
      targetYieldPct: 98.00,
      status: "IN PROGRESS",
      startTime: "09:15 IST",
      progressPct: 60
    },
    {
      batchId: "BAT-PRE-2026-083",
      trackCode: "BT-KKD-BAY-012",
      species: "Black Tiger (BT)",
      stage: "PEELING (VA)",
      lineTable: "Peeling Station #3 (RPD)",
      supervisor: "K. Ramu",
      inputKg: 2500,
      outputKg: 1810,
      yieldPct: 72.40,
      targetYieldPct: 71.80,
      status: "IN PROGRESS",
      startTime: "10:00 IST",
      progressPct: 45
    },
    {
      batchId: "BAT-PRE-2026-084",
      trackCode: "VM-PSP-MCH-045",
      species: "Vannamei (VM)",
      stage: "SOAKING",
      lineTable: "Chilled Bath Tank S-2",
      supervisor: "M. Nagesh",
      inputKg: 3100,
      outputKg: 3224,
      yieldPct: 104.00,
      targetYieldPct: 104.50,
      status: "IN PROGRESS",
      startTime: "11:20 IST",
      progressPct: 30
    },
    {
      batchId: "BAT-PRE-2026-079",
      trackCode: "VM-VSP-KNS-019",
      species: "Vannamei (VM)",
      stage: "DEHEADING",
      lineTable: "Deheading Table #1",
      supervisor: "G. Suribabu",
      inputKg: 4600,
      outputKg: 3197,
      yieldPct: 69.50,
      targetYieldPct: 68.50,
      status: "COMPLETED",
      startTime: "06:00 IST",
      progressPct: 100
    }
  ],

  dockIntakes: [
    {
      id: "INT-2026-091",
      trackCode: "VM-VSP-AVN-034",
      date: "2026-10-14",
      vehicleNo: "AP 37 TE 4821",
      sealNo: "SL-99412",
      pondSource: "Pond #4B & 5A, Akividu",
      supplier: "Godavari Coastal Aqua Farms",
      billCount: 42.0,
      dockCount: 61.6,
      countDiff: -19.6,
      billWeightKg: 4200,
      dockWeightKg: 4180,
      weightDiffKg: -20,
      variety: "VM-HEAD ON",
      gradeExpected: "41/50 pcs/lb",
      status: "VERIFIED"
    },
    {
      id: "INT-2026-092",
      trackCode: "VM-VSP-AKV-089",
      date: "2026-10-14",
      vehicleNo: "AP 16 TZ 3390",
      sealNo: "SL-99418",
      pondSource: "Krishna Delta Cluster #9",
      supplier: "Krishna Delta Prawn Harvesters",
      billCount: 50.0,
      dockCount: 49.8,
      countDiff: +0.2,
      billWeightKg: 3800,
      dockWeightKg: 3810,
      weightDiffKg: +10,
      variety: "VM-HEAD ON",
      gradeExpected: "51/60 pcs/lb",
      status: "VERIFIED"
    },
    {
      id: "INT-2026-093",
      trackCode: "BT-KKD-BAY-012",
      date: "2026-10-14",
      vehicleNo: "AP 05 TX 9102",
      sealNo: "SL-99425",
      pondSource: "Kakinada Bay Cage 1",
      supplier: "Sagar Marine Hatcheries",
      billCount: 20.0,
      dockCount: 20.2,
      countDiff: -0.2,
      billWeightKg: 2500,
      dockWeightKg: 2495,
      weightDiffKg: -5,
      variety: "BT-HEAD ON",
      gradeExpected: "16/20 pcs/lb",
      status: "VERIFIED"
    },
    {
      id: "INT-2026-094",
      trackCode: "VM-PSP-MCH-045",
      date: "2026-10-14",
      vehicleNo: "AP 37 TE 8812",
      sealNo: "SL-99430",
      pondSource: "Pond #14, Undi Road",
      supplier: "Delta Seafood Associates",
      billCount: 30.0,
      dockCount: 31.4,
      countDiff: -1.4,
      billWeightKg: 3100,
      dockWeightKg: 3090,
      weightDiffKg: -10,
      variety: "VM-HEAD ON",
      gradeExpected: "31/40 pcs/lb",
      status: "IN PROGRESS"
    },
    {
      id: "INT-2026-095",
      trackCode: "VM-VSP-KNS-019",
      date: "2026-10-14",
      vehicleNo: "AP 04 TT 5619",
      sealNo: "SL-99436",
      pondSource: "Konaseema Coastal Pond #3",
      supplier: "Konaseema Marine Harvesters",
      billCount: 45.0,
      dockCount: 44.5,
      countDiff: +0.5,
      billWeightKg: 4600,
      dockWeightKg: 4600,
      weightDiffKg: 0,
      variety: "VM-HEAD ON",
      gradeExpected: "41/50 pcs/lb",
      status: "VERIFIED"
    }
  ],

  rollerGraderRuns: [
    {
      id: "GRD-LINE-01",
      graderNo: "Roller Grader #1 (Baader)",
      variety: "VM-HLSO",
      targetGrade: "26/30 pcs/lb",
      actualCountLb: 28.2,
      crateCount: 142,
      netWeightKg: 3550,
      startTime: "08:00 IST",
      endTime: "11:30 IST",
      breakMinutes: 15,
      supervisor: "B. Venkatesh",
      status: "COMPLETED"
    },
    {
      id: "GRD-LINE-02",
      graderNo: "Roller Grader #2 (Meyn)",
      variety: "VM-HLSO",
      targetGrade: "31/40 pcs/lb",
      actualCountLb: 36.4,
      crateCount: 118,
      netWeightKg: 2950,
      startTime: "09:30 IST",
      endTime: "In Run",
      breakMinutes: 10,
      supervisor: "M. Nagesh",
      status: "IN PROGRESS"
    },
    {
      id: "GRD-LINE-03",
      graderNo: "Roller Grader #3 (Precision)",
      variety: "BT-HEAD ON",
      targetGrade: "16/20 pcs/lb",
      actualCountLb: 18.1,
      crateCount: 96,
      netWeightKg: 2400,
      startTime: "10:15 IST",
      endTime: "In Run",
      breakMinutes: 0,
      supervisor: "K. Ramu",
      status: "IN PROGRESS"
    }
  ],

  deheadingShifts: [
    {
      id: "DH-SFT-01",
      date: "2026-10-14",
      shift: "Shift A (Morning)",
      supervisor: "Laxmi Narayana",
      variety: "VM-HEAD ON",
      grossHonKg: 12450,
      recoveredHlKg: 8652,
      yieldPct: 69.49,
      targetYieldPct: 68.50,
      countPerLb: 38.5,
      iceConsumptionKg: 3800,
      operatorsCount: 48,
      status: "APPROVED"
    },
    {
      id: "DH-SFT-02",
      date: "2026-10-14",
      shift: "Shift B (Afternoon)",
      supervisor: "Mallesh",
      variety: "VM-HEAD ON",
      grossHonKg: 9800,
      recoveredHlKg: 6811,
      yieldPct: 69.50,
      targetYieldPct: 68.50,
      countPerLb: 44.0,
      iceConsumptionKg: 3000,
      operatorsCount: 42,
      status: "IN PROGRESS"
    },
    {
      id: "DH-SFT-03",
      date: "2026-10-13",
      shift: "Shift C (Night)",
      supervisor: "G. Suribabu",
      variety: "VM-HEAD ON",
      grossHonKg: 11200,
      recoveredHlKg: 7761,
      yieldPct: 69.30,
      targetYieldPct: 68.50,
      countPerLb: 34.2,
      iceConsumptionKg: 3400,
      operatorsCount: 40,
      status: "APPROVED"
    }
  ],

  valueAdditionRuns: [
    {
      id: "VA-RUN-01",
      trackCode: "VM-VSP-AVN-034",
      productStyle: "RPD (Raw Peeled & Deveined)",
      inputHlKg: 2920,
      outputVaKg: 2423,
      peelingLossKg: 462,
      rejectionKg: 35,
      recoveryYieldPct: 83.0,
      cratesCount: 97,
      supervisor: "Laxmi Narayana",
      status: "IN PROGRESS"
    },
    {
      id: "VA-RUN-02",
      trackCode: "BT-KKD-BAY-012",
      productStyle: "RPDTO (Tail-On Butterfly)",
      inputHlKg: 2200,
      outputVaKg: 1914,
      peelingLossKg: 264,
      rejectionKg: 22,
      recoveryYieldPct: 87.0,
      cratesCount: 76,
      supervisor: "K. Ramu",
      status: "IN PROGRESS"
    },
    {
      id: "VA-RUN-03",
      trackCode: "VM-PSP-MCH-045",
      productStyle: "PVPD (Pull-Vein Peeled)",
      inputHlKg: 3000,
      outputVaKg: 2580,
      peelingLossKg: 388,
      rejectionKg: 32,
      recoveryYieldPct: 86.0,
      cratesCount: 103,
      supervisor: "M. Nagesh",
      status: "COMPLETED"
    }
  ],

  interplantTransfers: [
    {
      manifestNo: "TRF-DFL-2026-041",
      date: "2026-10-14",
      fromPlant: "DFL Unit-2 (Kakinada)",
      toPlant: "DFL Unit-1 (Visakhapatnam)",
      varietyStyle: "Chilled RHLSO (Vannamei)",
      gradeBand: "31/40 Count",
      dispatchKg: 4200,
      receivedKg: 4195,
      vehicleNo: "AP 05 TX 9102",
      driverName: "M. Srinu",
      dockTempCelsius: -1.4,
      iceCrates: 168,
      transitStatus: "IN TRANSIT",
      eta: "14:30 IST"
    },
    {
      manifestNo: "TRF-DFL-2026-039",
      date: "2026-10-13",
      fromPlant: "DFL Unit-3 (Pydibhimavaram)",
      toPlant: "DFL Unit-1 (Visakhapatnam)",
      varietyStyle: "RPD Peeled Shrimp",
      gradeBand: "26/30 Count",
      dispatchKg: 3500,
      receivedKg: 3500,
      vehicleNo: "AP 31 TH 7741",
      driverName: "P. Appa Rao",
      dockTempCelsius: -1.8,
      iceCrates: 140,
      transitStatus: "RECEIVED",
      eta: "Completed"
    }
  ],

  chemicalInventory: [
    {
      code: "CHEM-STPP-01",
      name: "Sodium Tripolyphosphate (STPP) - Carnal 659S",
      supplier: "Prayon S.A. / BK Giulini",
      category: "Food Grade Moisture Retainer",
      openingBags: 22,
      receivedBags: 0,
      issuedBags: 4,
      closingBags: 18,
      kgPerBag: 25,
      closingKg: 450,
      bufferBags: 25,
      status: "LOW_STOCK"
    },
    {
      code: "CHEM-NPT-01",
      name: "Non-Phosphate Blend (Altesa Neo S100)",
      supplier: "New Tech Bio-Solutions",
      category: "Non-Phosphate Moisture Enhancer",
      openingBags: 45,
      receivedBags: 20,
      issuedBags: 8,
      closingBags: 57,
      kgPerBag: 25,
      closingKg: 1425,
      bufferBags: 30,
      status: "ADEQUATE"
    },
    {
      code: "CHEM-SALT-01",
      name: "Pure Vacuum Dried Salt (PVD)",
      supplier: "Tata Chemicals Limited",
      category: "Food Grade Salt",
      openingBags: 80,
      receivedBags: 50,
      issuedBags: 15,
      closingBags: 115,
      kgPerBag: 50,
      closingKg: 5750,
      bufferBags: 40,
      status: "ADEQUATE"
    },
    {
      code: "CHEM-STPP-02",
      name: "Carfosel B940 Premium STPP",
      supplier: "CFS Specialties India",
      category: "EU Grade Moisture Retention",
      openingBags: 30,
      receivedBags: 0,
      issuedBags: 6,
      closingBags: 24,
      kgPerBag: 25,
      closingKg: 600,
      bufferBags: 20,
      status: "ADEQUATE"
    }
  ],

  chemicalPOs: [
    {
      poNo: "PO-CHM-2026-018",
      date: "2026-10-02",
      supplier: "Prayon S.A. / Global Chem Impex",
      item: "STPP Carnal 659S (25kg bags)",
      importType: "High Seas Sale (HSS)",
      portOfEntry: "Kakinada Port",
      boeNo: "BOE-993821",
      blNo: "BL-MEDU882190",
      orderedBags: 400,
      receivedBags: 400,
      balanceBags: 0,
      valueUsd: 18400,
      status: "CLEARED"
    },
    {
      poNo: "PO-CHM-2026-022",
      date: "2026-10-08",
      supplier: "New Tech Bio-Solutions",
      item: "Altesa Neo S100 (25kg bags)",
      importType: "In-Bond (HSS_BOND)",
      portOfEntry: "Paradip Port",
      boeNo: "BOE-994102",
      blNo: "BL-MSCU441092",
      orderedBags: 300,
      receivedBags: 200,
      balanceBags: 100,
      valueUsd: 21500,
      status: "IN_CUSTOMS"
    }
  ],

  dailyUsageLogs: [
    {
      id: "USG-2026-104",
      date: "2026-10-14",
      shift: "Shift A",
      chemicalName: "STPP Carnal 659S",
      tankId: "Soaking Tank #1 & #2",
      targetVariety: "VM-HLSO 31/40",
      openingBags: 22,
      bagsUsed: 4,
      kgUsed: 100,
      bathConcentrationPct: 2.5,
      dipDurationMins: 45,
      waterTempCelsius: 1.2,
      operator: "M. Nagesh",
      status: "VERIFIED"
    },
    {
      id: "USG-2026-103",
      date: "2026-10-14",
      shift: "Shift A",
      chemicalName: "Altesa Neo S100 (Non-Phosphate)",
      tankId: "Soaking Tank #3",
      targetVariety: "VM-RPD 26/30",
      openingBags: 65,
      bagsUsed: 8,
      kgUsed: 200,
      bathConcentrationPct: 3.0,
      dipDurationMins: 60,
      waterTempCelsius: 1.0,
      operator: "K. Ramu",
      status: "VERIFIED"
    }
  ],

  supplierSettlements: [
    {
      voucherNo: "VCH-CHM-2026-044",
      vendor: "Prayon S.A. / Global Chem Impex",
      invoiceNo: "INV-GC-8812",
      invoiceAmountInr: 1545600,
      paymentDate: "2026-10-10",
      bankUtr: "HDFCR520261010091244",
      paymentMode: "RTGS Bank Transfer",
      status: "SETTLED"
    },
    {
      voucherNo: "VCH-CHM-2026-048",
      vendor: "Tata Chemicals Limited",
      invoiceNo: "TCL-PVD-9011",
      invoiceAmountInr: 287500,
      paymentDate: "2026-10-12",
      bankUtr: "SBINR520261012884102",
      paymentMode: "NEFT Bank Transfer",
      status: "SETTLED"
    },
    {
      voucherNo: "VCH-CHM-2026-051",
      vendor: "New Tech Bio-Solutions",
      invoiceNo: "NTB-2026-441",
      invoiceAmountInr: 960000,
      paymentDate: "2026-10-18",
      bankUtr: "Pending UTR",
      paymentMode: "Scheduled RTGS",
      status: "PENDING_APPROVAL"
    }
  ],

  batchTraceability: [
    {
      trackCode: "VM-VSP-AVN-034",
      arrivalDate: "2026-10-14",
      pondSource: "Akividu Pond 4B & 5A",
      billCount: 42.0,
      recvWeightKg: 4180,
      deheadingWeightKg: 2905,
      gradingWeightKg: 2890,
      gradingYieldPct: 69.14,
      soakingRunId: "SOAK-S1-04",
      freezerTunnelId: "IQF-Tunnel #1 (OctoFrost)",
      exportCartonLot: "EXP-US-2026-904",
      complianceCert: "USFDA / EIA-0458",
      status: "CLEARED"
    },
    {
      trackCode: "VM-VSP-AKV-089",
      arrivalDate: "2026-10-14",
      pondSource: "Krishna Delta Cluster #9",
      billCount: 50.0,
      recvWeightKg: 3810,
      deheadingWeightKg: 2650,
      gradingWeightKg: 2640,
      gradingYieldPct: 69.29,
      soakingRunId: "SOAK-S2-09",
      freezerTunnelId: "Contact Plate Freezer #2",
      exportCartonLot: "EXP-EU-2026-118",
      complianceCert: "BRCGS Food v9 / ASC",
      status: "CLEARED"
    },
    {
      trackCode: "BT-KKD-BAY-012",
      arrivalDate: "2026-10-14",
      pondSource: "Kakinada Bay Cage 1",
      billCount: 20.0,
      recvWeightKg: 2495,
      deheadingWeightKg: 1740,
      gradingWeightKg: 1735,
      gradingYieldPct: 69.54,
      soakingRunId: "SOAK-UNT-01",
      freezerTunnelId: "IQF-Tunnel #2 (Air-Blast)",
      exportCartonLot: "EXP-JP-2026-042",
      complianceCert: "BAP 4-Star Certified",
      status: "CLEARED"
    }
  ],

  vaFloorBalance: [
    {
      lineStation: "Table 1 - RHLSO",
      variety: "VM-HLSO",
      grade: "26/30 pcs/lb",
      treatment: "STPP Treated (2.5%)",
      crates: 48,
      netWeightKg: 1200,
      coreTempCelsius: 0.8,
      status: "ACTIVE_WIP"
    },
    {
      lineStation: "Table 2 - RPD Peeling",
      variety: "VM-RPD",
      grade: "31/40 pcs/lb",
      treatment: "Non-Phosphate Treated",
      crates: 36,
      netWeightKg: 900,
      coreTempCelsius: 1.0,
      status: "ACTIVE_WIP"
    },
    {
      lineStation: "Table 3 - Tail-On Butterfly",
      variety: "BT-RPDTO",
      grade: "16/20 pcs/lb",
      treatment: "Untreated (UNT Natural)",
      crates: 28,
      netWeightKg: 700,
      coreTempCelsius: 0.5,
      status: "ACTIVE_WIP"
    },
    {
      lineStation: "Chilled Buffer Holding Tank #1",
      variety: "VM-HOSO",
      grade: "41/50 pcs/lb",
      treatment: "Iced Brine (UNT)",
      crates: 12,
      netWeightKg: 303,
      coreTempCelsius: -0.2,
      status: "STAGED"
    }
  ],

  yieldReconciliations: [
    {
      lotNo: "LOT-2026-128",
      trackCode: "VM-VSP-AVN-034",
      purchaseCostPerKg: 380,
      gradedRealizedKg: 2890,
      realizedValueInr: 1473900,
      costMarginPct: 23.4,
      glazeVariancePct: +1.2,
      packagingLossPct: 0.8,
      auditResult: "APPROVED"
    },
    {
      lotNo: "LOT-2026-127",
      trackCode: "VM-VSP-AKV-089",
      purchaseCostPerKg: 340,
      gradedRealizedKg: 2640,
      realizedValueInr: 1293600,
      costMarginPct: 21.8,
      glazeVariancePct: +0.9,
      packagingLossPct: 0.6,
      auditResult: "APPROVED"
    },
    {
      lotNo: "LOT-2026-125",
      trackCode: "BT-KKD-BAY-012",
      purchaseCostPerKg: 580,
      gradedRealizedKg: 1735,
      realizedValueInr: 1388000,
      costMarginPct: 27.5,
      glazeVariancePct: +1.5,
      packagingLossPct: 0.4,
      auditResult: "APPROVED"
    }
  ]
};
