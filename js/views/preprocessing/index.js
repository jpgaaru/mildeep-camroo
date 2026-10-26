// Pre-processing Module — Master Domain Controller & Orchestrator
import './base/preprocessingBase.js';
import { preprocessingOverview } from './overview/preprocessingOverview.js';
import { preprocessingChemicals } from './chemicals/preprocessingChemicals.js';
import { preprocessingOperations } from './operations/preprocessingOperations.js';
import { preprocessingTraceability } from './traceability/preprocessingTraceability.js';
import { preprocessingModals } from './modals/preprocessingModals.js';

export const PreprocessingView = {
  // Baseline Preprocessing Store Data
  chemicalPosList: [
    { id: "CPO-01", sNo: 1, supplierName: "KPL INTERNATIONAL LTD", poNo: "DFL/KPL/2627/004", poDate: "06-10-2026", chemicals: "ALTESA NEO S100 (NP)", portName: "INPRT - PARADIP GARH", modeOfImport: "HSS", qtyBags: 320, qtyKgs: 6400, totalAmount: 1152000, etdDate: "15-10-2026", etaDate: "28-10-2026", remarks: "Bonded clearance required", status: "Approved" },
    { id: "CPO-02", sNo: 2, supplierName: "ADWIK IMPEX", poNo: "DFL//2627/003", poDate: "25-09-2026", chemicals: "CARNAL 659 S ADVANCED (STPP)", portName: "INKAK1 - KAKINADA", modeOfImport: "HSS", qtyBags: 240, qtyKgs: 4800, totalAmount: 868800, etdDate: "30-09-2026", etaDate: "29-10-2026", remarks: "Sea shipment in transit", status: "In Transit" },
    { id: "CPO-03", sNo: 3, supplierName: "KPL INTERNATIONAL LTD", poNo: "DFL/KPL/2627/003", poDate: "07-09-2026", chemicals: "ALTESA NEO S100 (NP)", portName: "INKAK1 - KAKINADA", modeOfImport: "HSS_BOND", qtyBags: 240, qtyKgs: 4800, totalAmount: 868800, etdDate: "10-09-2026", etaDate: "25-09-2026", remarks: "Cleared at port warehouse", status: "Received" },
    { id: "CPO-04", sNo: 4, supplierName: "PRAYON PHOSPHATES", poNo: "DFL/PP/2627/002", poDate: "18-08-2026", chemicals: "CARFOSEL B 940 (STPP)", portName: "INVTZ1 - VISAKHAPATNAM", modeOfImport: "DIRECT", qtyBags: 400, qtyKgs: 10000, totalAmount: 1650000, etdDate: "25-08-2026", etaDate: "15-09-2026", remarks: "Standard quality approved", status: "Received" },
    { id: "CPO-05", sNo: 5, supplierName: "ICL FOOD SPECIALTIES", poNo: "DFL/ICL/2627/001", poDate: "02-08-2026", chemicals: "BEKAPLUS FS (BLEND)", portName: "INKAK1 - KAKINADA", modeOfImport: "HSS_BOND", qtyBags: 180, qtyKgs: 4500, totalAmount: 945000, etdDate: "08-08-2026", etaDate: "22-08-2026", remarks: "Stored in temp-controlled store", status: "Received" }
  ],

  receivedChemicalsList: [
    { id: "RC-01", sNo: 1, poNo: "DFL/BC/2526/008", chemical: "CARFOSEL B 940 (STPP)", blNo: "DFL/BC/2526/02", containerNo: "DFL/BC/2526/02", receivedBags: 787, receivedQty: 19675, boeNo: "DFL/BC/2526/02", boeDate: "02-08-2025", clearedDate: "02-08-2025", balanceBags: 13, balanceQty: 325, status: "Pending" },
    { id: "RC-02", sNo: 2, poNo: "DFL/KPL/2526/003", chemical: "ALTESA BT2 (NP)", blNo: "2195420", containerNo: "2195420", receivedBags: 1080, receivedQty: 21600, boeNo: "2195420", boeDate: "21-05-2025", clearedDate: "23-05-2025", balanceBags: 800, balanceQty: 20000, status: "Pending" },
    { id: "RC-03", sNo: 3, poNo: "DFL/CFB/2425/003", chemical: "CARNAL 659 S ADVANCED (STPP)", blNo: "250506660011", containerNo: "CARNAL1-9, TGCU2314437", receivedBags: 3200, receivedQty: 80000, boeNo: "2141353", boeDate: "19-05-2025", clearedDate: "27-05-2025", balanceBags: 1600, balanceQty: 40000, status: "Pending" },
    { id: "RC-04", sNo: 4, poNo: "DFL/ICL/2627/001", chemical: "BEKAPLUS FS (BLEND)", blNo: "ICL-984421", containerNo: "MSCU8812903", receivedBags: 180, receivedQty: 4500, boeNo: "BOE-778210", boeDate: "14-08-2026", clearedDate: "20-08-2026", balanceBags: 0, balanceQty: 0, status: "Completed" }
  ],

  chemicalsConsumptionList: [
    { id: "CC-01", sNo: 1, date: "2026-10-14", plant: "DFL UNIT-5 (JPT)", chemical: "CARNAL 659 S ADVANCED (STPP)", openingBags: 1720, openingKgs: 43000, receivedBags: 50, receivedKgs: 1250, consumedBags: 49, consumedKgs: 1225, closingBags: 1721, closingKgs: 43025, batchCode: "VM-JPT-089", supervisor: "K. Venkata Vinay", status: "Verified" },
    { id: "CC-02", sNo: 2, date: "2026-10-14", plant: "DFL UNIT-1 (VSP)", chemical: "ALTESA NEO S100 (NP)", openingBags: 890, openingKgs: 17800, receivedBags: 0, receivedKgs: 0, consumedBags: 30, consumedKgs: 600, closingBags: 860, closingKgs: 17200, batchCode: "VM-VSP-112", supervisor: "T. Venkatesh", status: "Verified" },
    { id: "CC-03", sNo: 3, date: "2026-10-13", plant: "DFL UNIT-2 (KKD)", chemical: "CARFOSEL B 940 (STPP)", openingBags: 640, openingKgs: 16000, receivedBags: 100, receivedKgs: 2500, consumedBags: 62, consumedKgs: 1550, closingBags: 678, closingKgs: 16950, batchCode: "BT-KKD-044", supervisor: "D. Surya Narayana", status: "Verified" }
  ],

  chemicalReceivedReportsList: [
    { id: "CRR-01", sNo: 1, month: "October 2026", plant: "DFL UNIT-1 (VSP)", chemical: "ALTESA NEO S100 (NP)", totalBags: 240, totalKgs: 4800, avgRatePerKg: 181, totalCostInr: 868800, supplier: "KPL INTERNATIONAL LTD" },
    { id: "CRR-02", sNo: 2, month: "October 2026", plant: "DFL UNIT-5 (JPT)", chemical: "CARNAL 659 S ADVANCED (STPP)", totalBags: 320, totalKgs: 8000, avgRatePerKg: 195, totalCostInr: 1560000, supplier: "ADWIK IMPEX" },
    { id: "CRR-03", sNo: 3, month: "September 2026", plant: "DFL UNIT-2 (KKD)", chemical: "CARFOSEL B 940 (STPP)", totalBags: 400, totalKgs: 10000, avgRatePerKg: 165, totalCostInr: 1650000, supplier: "PRAYON PHOSPHATES" }
  ],

  chemicalOpeningBalancesList: [
    { id: "COB-01", sNo: 1, plant: "DFL UNIT-1 (VSP)", chemical: "ALTESA NEO S100 (NP)", uom: "KGS", openingBags: 890, openingKgs: 17800, valuationRate: 181, totalValuation: 3221800, auditDate: "2026-10-01" },
    { id: "COB-02", sNo: 2, plant: "DFL UNIT-2 (KKD)", chemical: "CARFOSEL B 940 (STPP)", uom: "KGS", openingBags: 640, openingKgs: 16000, valuationRate: 165, totalValuation: 2640000, auditDate: "2026-10-01" },
    { id: "COB-03", sNo: 3, plant: "DFL UNIT-5 (JPT)", chemical: "CARNAL 659 S ADVANCED (STPP)", uom: "KGS", openingBags: 1720, openingKgs: 43000, valuationRate: 195, totalValuation: 8385000, auditDate: "2026-10-01" }
  ],

  chemicalBalanceReportsList: [
    { id: "CBR-01", sNo: 1, plant: "DFL UNIT-1 (VSP)", chemical: "ALTESA NEO S100 (NP)", openingStock: 17800, receipts: 4800, consumption: 5400, transferOut: 0, closingStock: 17200, reorderLevel: 5000, stockStatus: "Adequate" },
    { id: "CBR-02", sNo: 2, plant: "DFL UNIT-5 (JPT)", chemical: "CARNAL 659 S ADVANCED (STPP)", openingStock: 43000, receipts: 8000, consumption: 7975, transferOut: 0, closingStock: 43025, reorderLevel: 10000, stockStatus: "Adequate" },
    { id: "CBR-03", sNo: 3, plant: "DFL UNIT-2 (KKD)", chemical: "CARFOSEL B 940 (STPP)", openingStock: 16000, receipts: 2500, consumption: 1550, transferOut: 0, closingStock: 16950, reorderLevel: 4000, stockStatus: "Adequate" }
  ],

  chemicalPaymentsList: [
    { id: "CPAY-01", sNo: 1, voucherNo: "CH-PAY-26-081", supplierName: "KPL INTERNATIONAL LTD", invoiceNo: "INV-KPL-8819", poNo: "DFL/KPL/2627/003", invoiceAmount: 868800, tdsAmount: 868, netPaid: 867932, paymentDate: "2026-10-05", bankAccount: "HDFC Bank - 0021 (Main)", paymentMode: "RTGS", status: "Settled" },
    { id: "CPAY-02", sNo: 2, voucherNo: "CH-PAY-26-082", supplierName: "ADWIK IMPEX", invoiceNo: "INV-ADW-4421", poNo: "DFL//2627/003", invoiceAmount: 868800, tdsAmount: 868, netPaid: 867932, paymentDate: "2026-10-10", bankAccount: "SBI Bank - 9940 (Commercial)", paymentMode: "NEFT", status: "Settled" },
    { id: "CPAY-03", sNo: 3, voucherNo: "CH-PAY-26-083", supplierName: "PRAYON PHOSPHATES", invoiceNo: "INV-PP-1092", poNo: "DFL/PP/2627/002", invoiceAmount: 1650000, tdsAmount: 1650, netPaid: 1648350, paymentDate: "2026-09-28", bankAccount: "Axis Bank - 4410 (Export)", paymentMode: "RTGS", status: "Settled" }
  ],

  rmReceivedList: [
    { id: "RMR-01", sNo: 1, inwardNo: "INW-2026-1089", arrivalDate: "2026-10-14", lotCode: "VM-VSP-AMP-056", plant: "DFL UNIT-1 (VSP)", species: "Vannamei Shrimp", receivedWeight: 4250, crates: 170, tempC: 1.2, grader: "B. Venkatesh", status: "Accepted" },
    { id: "RMR-02", sNo: 2, inwardNo: "INW-2026-1090", arrivalDate: "2026-10-14", lotCode: "BT-KKD-MKP-043", plant: "DFL UNIT-2 (KKD)", species: "Black Tiger Shrimp", receivedWeight: 3180, crates: 128, tempC: 0.9, grader: "K. Ramu", status: "Accepted" },
    { id: "RMR-03", sNo: 3, inwardNo: "INW-2026-1091", arrivalDate: "2026-10-14", lotCode: "VM-PSP-BVR-078", plant: "DFL UNIT-3 (PSP)", species: "Vannamei Shrimp", receivedWeight: 5600, crates: 224, tempC: 1.5, grader: "M. Nagesh", status: "Accepted" }
  ],

  deheadingLogsList: [
    {
      id: "DH-01",
      sNo: 1,
      arrivalDate: "2026-10-23",
      lotCode: "VM-VSP-AMP-056",
      plant: "DFL UNIT-1 (VSP)",
      center: "Own Center",
      station: "Own Center",
      deheadingDate: "2026-10-23",
      date: "2026-10-23",
      shift: "A SHIFT",
      supervisor: "K VENKATA VINAY",
      checkingCount2: 48,
      hlCount: 32,
      honCount: 48,
      honQty: 4250,
      headonWeight: 4250,
      hlQty: 2847.5,
      deheadedWeight: 2847.5,
      countNetYield: 66.8,
      yieldPct: 67.0,
      iceConsumption: 450,
      iceKgs: 450,
      sampleYield: 67.2,
      remarks: "Batch processed within HACCP temp specs",
      status: "Completed"
    },
    {
      id: "DH-02",
      sNo: 2,
      arrivalDate: "2026-10-23",
      lotCode: "BT-KKD-MKP-043",
      plant: "DFL UNIT-2 (KKD)",
      center: "Center 2",
      station: "Center 2",
      deheadingDate: "2026-10-23",
      date: "2026-10-23",
      shift: "B SHIFT",
      supervisor: "T.VENKATESH",
      checkingCount2: 52,
      hlCount: 36,
      honCount: 52,
      honQty: 3180,
      headonWeight: 3180,
      hlQty: 2067.0,
      deheadedWeight: 2067.0,
      countNetYield: 64.9,
      yieldPct: 65.0,
      iceConsumption: 320,
      iceKgs: 320,
      sampleYield: 65.5,
      remarks: "Cold-chain maintained at 1.8C",
      status: "Completed"
    },
    {
      id: "DH-03",
      sNo: 3,
      arrivalDate: "2026-10-22",
      lotCode: "VM-PSP-BVR-078",
      plant: "DFL UNIT-3 (PSP)",
      center: "Outside Center",
      station: "Outside Center",
      deheadingDate: "2026-10-23",
      date: "2026-10-23",
      shift: "A SHIFT",
      supervisor: "D.SURYA NARAYANA",
      checkingCount2: 44,
      hlCount: 28,
      honCount: 44,
      honQty: 5600,
      headonWeight: 5600,
      hlQty: 3808.0,
      deheadedWeight: 3808.0,
      countNetYield: 67.9,
      yieldPct: 68.0,
      iceConsumption: 600,
      iceKgs: 600,
      sampleYield: 68.2,
      remarks: "High grade HLSO yield",
      status: "Completed"
    }
  ],

  gradingLogsList: [
    {
      id: "GR-01",
      sNo: 1,
      transactionDate: "23-03-2025",
      date: "2025-03-23",
      arrivalDate: "2025-03-23",
      lotCode: "SKM/2425/1755",
      plant: "DFL UNIT-6 [JPT-II]",
      center: "",
      station: "Own Center",
      gradingMachine: "Unit -6 Laitram Grading Machine",
      startTime: "",
      endTime: "",
      breakTime: "",
      variety: "VM-HLSO",
      hlCount: "18.00",
      dominantCount: "18.00",
      hlWeight: "1.00",
      gradedWeight: 1.00,
      noOfCrates: 1,
      remarks: "",
      status: "Approved"
    },
    {
      id: "GR-02",
      sNo: 2,
      transactionDate: "23-03-2025",
      date: "2025-03-23",
      arrivalDate: "2025-03-23",
      lotCode: "SKM/2425/1755",
      plant: "DFL UNIT-6 [JPT-II]",
      center: "",
      station: "Own Center",
      gradingMachine: "Unit -6 Laitram Grading Machine",
      startTime: "",
      endTime: "",
      breakTime: "",
      variety: "VM-HLSO",
      hlCount: "23.00",
      dominantCount: "23.00",
      hlWeight: "347.00",
      gradedWeight: 347.00,
      noOfCrates: 13,
      remarks: "",
      status: "Approved"
    },
    {
      id: "GR-03",
      sNo: 3,
      transactionDate: "23-03-2025",
      date: "2025-03-23",
      arrivalDate: "2025-03-23",
      lotCode: "SKM/2425/1755",
      plant: "DFL UNIT-6 [JPT-II]",
      center: "",
      station: "Own Center",
      gradingMachine: "Unit -6 Laitram Grading Machine",
      startTime: "",
      endTime: "",
      breakTime: "",
      variety: "VM-HLSO",
      hlCount: "28.00",
      dominantCount: "28.00",
      hlWeight: "989.00",
      gradedWeight: 989.00,
      noOfCrates: 37,
      remarks: "",
      status: "Approved"
    },
    {
      id: "GR-04",
      sNo: 4,
      transactionDate: "23-03-2025",
      date: "2025-03-23",
      arrivalDate: "2025-03-23",
      lotCode: "SKM/2425/1755",
      plant: "DFL UNIT-6 [JPT-II]",
      center: "",
      station: "Own Center",
      gradingMachine: "Unit -6 Laitram Grading Machine",
      startTime: "",
      endTime: "",
      breakTime: "",
      variety: "VM-HLSO",
      hlCount: "34.00",
      dominantCount: "34.00",
      hlWeight: "694.00",
      gradedWeight: 694.00,
      noOfCrates: 26,
      remarks: "",
      status: "Approved"
    }
  ],

  valueAdditionList: [
    { id: "VA-01", sNo: 1, date: "2026-10-14", plant: "DFL UNIT-1 (VSP)", processType: "P&D (Peeled & Deveined)", batchCode: "VA-VM-098", inputWeight: 1500, outputWeight: 1230, recoveryPct: 82.0, supervisor: "K. Venkata Vinay", status: "Passed QC" },
    { id: "VA-02", sNo: 2, date: "2026-10-14", plant: "DFL UNIT-2 (KKD)", processType: "PTO (Peeled Tail On)", batchCode: "VA-BT-044", inputWeight: 1200, outputWeight: 1044, recoveryPct: 87.0, supervisor: "T. Venkatesh", status: "Passed QC" },
    { id: "VA-03", sNo: 3, date: "2026-10-13", plant: "DFL UNIT-5 (JPT)", processType: "Cooked Tail-On", batchCode: "VA-CK-012", inputWeight: 2000, outputWeight: 1780, recoveryPct: 89.0, supervisor: "D. Surya Narayana", status: "Passed QC" }
  ],

  honTransferList: [
    { id: "HT-01", sNo: 1, transferId: "HT-2026-041", date: "2026-10-14", fromPlant: "DFL UNIT-1 (VSP)", toPlant: "DFL UNIT-3 (PSP)", variety: "Vannamei Shrimp", weightKg: 2400, vehicleNo: "AP31TT4177", driverName: "R. Apparao", status: "In Transit" },
    { id: "HT-02", sNo: 2, transferId: "HT-2026-042", date: "2026-10-13", fromPlant: "DFL UNIT-2 (KKD)", toPlant: "DFL UNIT-5 (JPT)", variety: "Black Tiger Shrimp", weightKg: 1800, vehicleNo: "AP05X9921", driverName: "K. Simhachalam", status: "Delivered" }
  ],

  traceReportsList: [
    { id: "TR-01", sNo: 1, batchCode: "VM-VSP-AMP-056", farmerName: "K. Srinivasa Rao", pondNo: "Pond 4A", harvestDate: "2026-10-14", intakeWeight: 4250, deheadedWeight: 2847.5, gradedWeight: 2840, packedWeight: 2800, totalYieldPct: 65.88, status: "Traceable" },
    { id: "TR-02", sNo: 2, batchCode: "BT-KKD-MKP-043", farmerName: "G. Venkateswarlu", pondNo: "Pond 12", harvestDate: "2026-10-14", intakeWeight: 3180, deheadedWeight: 2067.0, gradedWeight: 2060, packedWeight: 2020, totalYieldPct: 63.52, status: "Traceable" },
    { id: "TR-03", sNo: 3, batchCode: "VM-PSP-BVR-078", farmerName: "M. Satyanarayana", pondNo: "Pond 2B", harvestDate: "2026-10-13", intakeWeight: 5600, deheadedWeight: 3808.0, gradedWeight: 3795, packedWeight: 3740, totalYieldPct: 66.78, status: "Traceable" }
  ],

  render(containerId, subPage = 'overview', activeHash = '#/preprocessing/dashboard/overview') {
    const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!container) return;

    this.updateHeaderAction(subPage);

    container.innerHTML = `
      <div id="preprocessing-tab-bar-container"></div>
      <div id="preproc-subpage-content" class="w-full"></div>
    `;

    if (typeof TabBar !== 'undefined' && typeof TabBar.render === 'function') {
      TabBar.render('preprocessing-tab-bar-container', activeHash);
    }
    const subContainer = document.getElementById('preproc-subpage-content');
    if (!subContainer) return;

    switch (subPage) {
      // 1. Dashboard
      case 'overview':
      case 'floor-overview':
        this.renderFloorOverview(subContainer);
        break;

      // 2. Floor Operations
      case 'rm-received':
        this.renderRmReceived(subContainer);
        break;
      case 'deheading':
        this.renderDeheading(subContainer);
        break;
      case 'grading':
        this.renderGrading(subContainer);
        break;
      case 'deheading-trackid':
        this.renderDeheadingTrackid(subContainer);
        break;
      case 'grading-trackid':
        this.renderGradingTrackid(subContainer);
        break;
      case 'value-addition':
        this.renderValueAddition(subContainer);
        break;
      case 'hon-qty-transfer':
        this.renderHonQtyTransfer(subContainer);
        break;

      // 3. Chemical Inventory & Usage
      case 'chemical-pos':
        this.renderChemicalPos(subContainer);
        break;
      case 'received-chemicals':
        this.renderReceivedChemicals(subContainer);
        break;
      case 'chemicals-consumption':
        this.renderChemicalsConsumption(subContainer);
        break;
      case 'chemical-received-report':
        this.renderChemicalReceivedReport(subContainer);
        break;
      case 'chemical-opening-balance':
        this.renderChemicalOpeningBalance(subContainer);
        break;
      case 'chemical-balance-report':
        this.renderChemicalBalanceReport(subContainer);
        break;
      case 'chemical-payments-list':
        this.renderChemicalPaymentsList(subContainer);
        break;

      // 4. Traceability & Reconciliation
      case 'track-code-report':
        this.renderTrackCodeReport(subContainer);
        break;
      case 'va-floor-balance':
        this.renderVaFloorBalance(subContainer);
        break;
      case 'va-transfer':
        this.renderVaTransfer(subContainer);
        break;
      case 'assumed-reports':
        this.renderAssumedReports(subContainer);
        break;
      case 'consolidation-daily':
        this.renderConsolidationDaily(subContainer);
        break;
      case 'file-upload':
        this.renderFileUpload(subContainer);
        break;

      default:
        this.renderFloorOverview(subContainer);
        break;
    }

    CamarooControls.upgrade(subContainer);
    if (typeof window !== 'undefined' && window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  },

  updateHeaderAction(subPage) {
    const actionContainer = document.getElementById('section-action-btn-container');
    if (actionContainer) actionContainer.innerHTML = '';
  },


};

// Compose all feature domain submodules into unified PreprocessingView
Object.assign(
  PreprocessingView,
  preprocessingOverview,
  preprocessingChemicals,
  preprocessingOperations,
  preprocessingTraceability,
  preprocessingModals
);

if (typeof window !== 'undefined') {
  window.PreprocessingView = PreprocessingView;
}
