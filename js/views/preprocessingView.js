// Pre-Processing Module Views — AquaOps Enterprise Design System
// Fully integrated with Devi Fisheries Limited multi-unit floor operations

import { ERP_DATA } from '../data/mockData.js';
import { DataTable } from '../components/table.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';
import { TabBar } from '../components/tabBar.js';

export const PreprocessingView = {
  // -------------------------------------------------------------
  // 1. DATA STORES (Devi Fisheries Limited Industrial Specs)
  // -------------------------------------------------------------
  rmReceivedList: [
    { id: 'RM-01', trackCode: 'VM-VSP-AVN-034', date: '2026-10-14', vehicleNo: 'AP 37 TE 9011', sealNo: 'SL-44921', farmSource: 'Akividu Cluster Pond 4B', variety: 'Vannamei (VM)', billCount: 42, recvCount: 40, countDiff: -2, billWt: 4200, recvWt: 4180, status: 'VERIFIED', supervisor: 'K. Somaraju' },
    { id: 'RM-02', trackCode: 'VM-KKD-SGR-089', date: '2026-10-14', vehicleNo: 'AP 05 TX 9102', sealNo: 'SL-44922', farmSource: 'Kakinada Bay Block 12', variety: 'Vannamei (VM)', billCount: 38, recvCount: 38, countDiff: 0, billWt: 3800, recvWt: 3820, status: 'VERIFIED', supervisor: 'M. Srinu' },
    { id: 'RM-03', trackCode: 'BT-PSP-NLR-012', date: '2026-10-14', vehicleNo: 'AP 26 TV 1104', sealNo: 'SL-44923', farmSource: 'Nellore Coastal Basin A', variety: 'Black Tiger (BT)', billCount: 22, recvCount: 24, countDiff: +2, billWt: 5100, recvWt: 5050, status: 'PENDING_QC', supervisor: 'B. Venkatesh' },
    { id: 'RM-04', trackCode: 'VM-JPT-GOD-055', date: '2026-10-13', vehicleNo: 'AP 16 TZ 3390', sealNo: 'SL-44919', farmSource: 'Godavari Delta Pond 9', variety: 'Vannamei (VM)', billCount: 50, recvCount: 48, countDiff: -2, billWt: 2900, recvWt: 2910, status: 'VERIFIED', supervisor: 'G. Suribabu' },
    { id: 'RM-05', trackCode: 'VM-VSP-KNS-104', date: '2026-10-13', vehicleNo: 'AP 04 TT 5619', sealNo: 'SL-44918', farmSource: 'Konaseema Marine Farm', variety: 'Vannamei (VM)', billCount: 60, recvCount: 59, countDiff: -1, billWt: 3400, recvWt: 3390, status: 'VERIFIED', supervisor: 'K. Somaraju' }
  ],

  deheadingRuns: [
    { id: 'DH-01', date: '2026-10-14', shift: 'Shift A (Morning)', lineNo: 'Deheading Line #1', supervisor: 'K. Somaraju', variety: 'VM-HEAD ON', honQty: 4180, hlQty: 2905, yieldPercent: 69.50, hlCount: '31/40', iceUsedKg: 850, status: 'APPROVED' },
    { id: 'DH-02', date: '2026-10-14', shift: 'Shift A (Morning)', lineNo: 'Deheading Line #2', supervisor: 'P. Appa Rao', variety: 'VM-HEAD ON', honQty: 3820, hlQty: 2662, yieldPercent: 69.68, hlCount: '26/30', iceUsedKg: 780, status: 'APPROVED' },
    { id: 'DH-03', date: '2026-10-14', shift: 'Shift B (Afternoon)', lineNo: 'Deheading Line #3', supervisor: 'B. Venkatesh', variety: 'BT-HEAD ON', honQty: 5050, hlQty: 3485, yieldPercent: 69.01, hlCount: '16/20', iceUsedKg: 1020, status: 'IN_PROGRESS' },
    { id: 'DH-04', date: '2026-10-13', shift: 'Shift B (Afternoon)', lineNo: 'Deheading Line #1', supervisor: 'G. Suribabu', variety: 'VM-HEAD ON', honQty: 2910, hlQty: 2013, yieldPercent: 69.17, hlCount: '41/50', iceUsedKg: 600, status: 'APPROVED' },
    { id: 'DH-05', date: '2026-10-13', shift: 'Shift C (Night)', lineNo: 'Deheading Line #2', supervisor: 'M. Srinu', variety: 'VM-HEAD ON', honQty: 3390, hlQty: 2362, yieldPercent: 69.67, hlCount: '51/60', iceUsedKg: 700, status: 'APPROVED' }
  ],

  gradingRuns: [
    { id: 'GR-01', date: '2026-10-14', shift: 'Shift A', machine: 'Roller Grader #1 (Baader)', variety: 'VM-HLSO', gradeBand: '26/30 pcs/lb', gradedWt: 1250, crates: 62, runtimeHours: 3.5, supervisor: 'R. Krishna', status: 'ACTIVE' },
    { id: 'GR-02', date: '2026-10-14', shift: 'Shift A', machine: 'Roller Grader #1 (Baader)', variety: 'VM-HLSO', gradeBand: '31/40 pcs/lb', gradedWt: 1412, crates: 70, runtimeHours: 3.5, supervisor: 'R. Krishna', status: 'ACTIVE' },
    { id: 'GR-03', date: '2026-10-14', shift: 'Shift A', machine: 'Roller Grader #2 (Carnitech)', variety: 'VM-HLSO', gradeBand: '21/25 pcs/lb', gradedWt: 1100, crates: 55, runtimeHours: 2.8, supervisor: 'P. Appa Rao', status: 'COMPLETED' },
    { id: 'GR-04', date: '2026-10-14', shift: 'Shift B', machine: 'Roller Grader #3', variety: 'BT-HLSO', gradeBand: '16/20 pcs/lb', gradedWt: 1980, crates: 99, runtimeHours: 4.0, supervisor: 'B. Venkatesh', status: 'ACTIVE' },
    { id: 'GR-05', date: '2026-10-13', shift: 'Shift C', machine: 'Roller Grader #2 (Carnitech)', variety: 'VM-HLSO', gradeBand: '41/50 pcs/lb', gradedWt: 1350, crates: 68, runtimeHours: 3.2, supervisor: 'G. Suribabu', status: 'COMPLETED' }
  ],

  valueAdditionRuns: [
    { id: 'VA-01', date: '2026-10-14', trackId: 'VM-VSP-AVN-034', productStyle: 'RPD (Raw Peeled & Deveined)', inputHlQty: 1412, vaOutQty: 1158, rejectionKg: 28, yieldPercent: 82.01, crates: 58, supervisor: 'S. Kameshwari', status: 'IN_PROCESS' },
    { id: 'VA-02', date: '2026-10-14', trackId: 'VM-KKD-SGR-089', productStyle: 'PVPD (Pull-Vein Peeled & Deveined)', inputHlQty: 1100, vaOutQty: 915, rejectionKg: 18, yieldPercent: 83.18, crates: 46, supervisor: 'Laxmi Narayana', status: 'IN_PROCESS' },
    { id: 'VA-03', date: '2026-10-13', trackId: 'VM-JPT-GOD-055', productStyle: 'RPDTO (Peeled Deveined Tail-On)', inputHlQty: 1250, vaOutQty: 1060, rejectionKg: 15, yieldPercent: 84.80, crates: 53, supervisor: 'M. Srinu', status: 'COMPLETED' },
    { id: 'VA-04', date: '2026-10-13', trackId: 'BT-PSP-NLR-012', productStyle: 'RPD (Raw Peeled & Deveined)', inputHlQty: 1500, vaOutQty: 1225, rejectionKg: 22, yieldPercent: 81.67, crates: 61, supervisor: 'B. Venkatesh', status: 'COMPLETED' }
  ],

  transfersList: [
    { id: 'TR-2026-101', date: '2026-10-14', fromPlant: 'DFL Unit-2 (KKD)', toPlant: 'DFL Unit-1 (VSP)', variety: 'Vannamei (VM)', productStyle: 'RPD Chilled Totes', dispatchQty: 4200, crates: 210, sealNo: 'TR-SL-8812', vehicleNo: 'AP 05 TX 9102', status: 'IN_TRANSIT' },
    { id: 'TR-2026-102', date: '2026-10-14', fromPlant: 'DFL Unit-2 (KKD)', toPlant: 'DFL Unit-3 (PSP)', variety: 'Vannamei (VM)', productStyle: 'HLSO Chilled Crates', dispatchQty: 4220, crates: 211, sealNo: 'TR-SL-8813', vehicleNo: 'AP 37 TE 9011', status: 'IN_TRANSIT' },
    { id: 'TR-2026-098', date: '2026-10-13', fromPlant: 'DFL Unit-4 (PND)', toPlant: 'DFL Unit-1 (VSP)', variety: 'Black Tiger (BT)', productStyle: 'RPDTO Semi-Processed', dispatchQty: 3100, crates: 155, sealNo: 'TR-SL-8790', vehicleNo: 'AP 16 TZ 3390', status: 'RECEIVED' }
  ],

  chemicalStock: [
    { code: 'CH-STPP-01', name: 'Carnal 659S (STPP)', category: 'Phosphate Blend', openingBags: 24, inwardBags: 10, consumedBags: 16, closingBags: 18, netKg: 450, bufferAlert: 20, status: 'LOW_STOCK' },
    { code: 'CH-STPP-02', name: 'Carfosel B940', category: 'Phosphate Additive', openingBags: 45, inwardBags: 20, consumedBags: 15, closingBags: 50, netKg: 1250, bufferAlert: 25, status: 'OPTIMAL' },
    { code: 'CH-NPT-01', name: 'Altesa Neo S100', category: 'Non-Phosphate Blend', openingBags: 32, inwardBags: 15, consumedBags: 12, closingBags: 35, netKg: 875, bufferAlert: 20, status: 'OPTIMAL' },
    { code: 'CH-NPT-02', name: 'Altesa Neo S700', category: 'Non-Phosphate Premium', openingBags: 28, inwardBags: 0, consumedBags: 6, closingBags: 22, netKg: 550, bufferAlert: 15, status: 'OPTIMAL' },
    { code: 'CH-SALT-01', name: 'Pure Vacuum Dried Salt (PVD)', category: 'Processing Salt', openingBags: 120, inwardBags: 50, consumedBags: 60, closingBags: 110, netKg: 5500, bufferAlert: 50, status: 'OPTIMAL' }
  ],

  chemicalUsageLogs: [
    { id: 'LOG-701', date: '2026-10-14', shift: 'Shift A', trackId: 'VM-VSP-AVN-034', chemical: 'Carnal 659S (STPP)', bathId: 'Soaking Tank #1', dosageKg: 15.0, soakedQtyKg: 1250, waterTempC: 3.2, durationMin: 45, supervisor: 'K. Somaraju', status: 'VERIFIED' },
    { id: 'LOG-702', date: '2026-10-14', shift: 'Shift A', trackId: 'VM-KKD-SGR-089', chemical: 'Altesa Neo S100', bathId: 'Soaking Tank #3', dosageKg: 12.5, soakedQtyKg: 1100, waterTempC: 2.8, durationMin: 50, supervisor: 'M. Srinu', status: 'VERIFIED' },
    { id: 'LOG-703', date: '2026-10-13', shift: 'Shift B', trackId: 'VM-JPT-GOD-055', chemical: 'Carfosel B940', bathId: 'Soaking Tank #2', dosageKg: 14.0, soakedQtyKg: 1060, waterTempC: 3.0, durationMin: 40, supervisor: 'G. Suribabu', status: 'VERIFIED' },
    { id: 'LOG-704', date: '2026-10-13', shift: 'Shift C', trackId: 'BT-PSP-NLR-012', chemical: 'Pure Vacuum Dried Salt', bathId: 'Brine Chiller #1', dosageKg: 25.0, soakedQtyKg: 1500, waterTempC: 1.5, durationMin: 30, supervisor: 'B. Venkatesh', status: 'VERIFIED' }
  ],

  chemicalPOs: [
    { poNo: 'PO-CH-2026-041', date: '2026-10-08', supplier: 'Budenheim India Pvt Ltd', chemical: 'Carnal 659S (STPP)', bags: 100, unitPrice: 4200, totalAmount: 420000, terms: 'High Seas Sale (HSS)', port: 'Paradip Port', boeNo: 'BOE-6691024', status: 'RECEIVED' },
    { poNo: 'PO-CH-2026-042', date: '2026-10-10', supplier: 'ICL Specialty Additives', chemical: 'Carfosel B940', bags: 80, unitPrice: 4600, totalAmount: 368000, terms: 'In-Bond Warehousing', port: 'Kakinada Port', boeNo: 'BOE-6712098', status: 'RECEIVED' },
    { poNo: 'PO-CH-2026-045', date: '2026-10-12', supplier: 'Barentz Ingredients India', chemical: 'Altesa Neo S100', bags: 60, unitPrice: 5800, totalAmount: 348000, terms: 'High Seas Sale (HSS)', port: 'Chennai Sea Dock', boeNo: 'BOE-6744190', status: 'PENDING_CLEARANCE' }
  ],

  chemicalPayments: [
    { voucherNo: 'VCH-CH-901', date: '2026-10-11', supplier: 'Budenheim India Pvt Ltd', invNo: 'INV-BDH-2026-88', gross: 420000, tds: 4200, netPaid: 415800, utrNo: 'SBIN2262849102', mode: 'RTGS Electronic', status: 'SETTLED' },
    { voucherNo: 'VCH-CH-902', date: '2026-10-12', supplier: 'ICL Specialty Additives', invNo: 'INV-ICL-9011', gross: 368000, tds: 3680, netPaid: 364320, utrNo: 'HDFC0091823719', mode: 'NEFT Online', status: 'SETTLED' }
  ],

  traceabilityMaster: [
    { trackCode: 'VM-VSP-AVN-034', pondSource: 'Akividu Pond 4B (Farmer: Godavari Coastal)', arrivalDate: '2026-10-14', billCount: 42, recvWt: 4180, deheadWt: 2905, deheadYield: 69.50, gradedWt: 2662, soakingBatch: 'S1-STPP-45M', freezingTunnel: 'IQF Tunnel #1', status: 'COMPLIANT' },
    { trackCode: 'VM-KKD-SGR-089', pondSource: 'Kakinada Block 12 (Farmer: Sagar Marine)', arrivalDate: '2026-10-14', billCount: 38, recvWt: 3820, deheadWt: 2662, deheadYield: 69.68, gradedWt: 2450, soakingBatch: 'S1-NPT-50M', freezingTunnel: 'IQF Tunnel #2', status: 'COMPLIANT' },
    { trackCode: 'BT-PSP-NLR-012', pondSource: 'Nellore Coastal Basin A (Brackish Cultivators)', arrivalDate: '2026-10-14', billCount: 22, recvWt: 5050, deheadWt: 3485, deheadYield: 69.01, gradedWt: 3200, soakingBatch: 'S1-SALT-30M', freezingTunnel: 'Blast Freezer #1', status: 'COMPLIANT' },
    { trackCode: 'VM-JPT-GOD-055', pondSource: 'Godavari Delta Pond 9 (Krishna Delta Harvesters)', arrivalDate: '2026-10-13', billCount: 50, recvWt: 2910, deheadWt: 2013, deheadYield: 69.17, gradedWt: 1850, soakingBatch: 'S1-STPP-40M', freezingTunnel: 'IQF Tunnel #1', status: 'COMPLIANT' },
    { trackCode: 'VM-VSP-KNS-104', pondSource: 'Konaseema Farm #3 (Konaseema Marine Harvesters)', arrivalDate: '2026-10-13', billCount: 60, recvWt: 3390, deheadWt: 2362, deheadYield: 69.67, gradedWt: 2180, soakingBatch: 'S1-UNT-0M', freezingTunnel: 'IQF Tunnel #2', status: 'COMPLIANT' }
  ],

  floorBalance: [
    { id: 'FB-01', variety: 'Vannamei (VM)', gradeBand: '26/30 pcs/lb', treatment: 'STPP (Carnal 659S)', crates: 62, wipKg: 1250, floorZone: 'Chilled Staging Bay A', hoursOnFloor: 2.5, status: 'ACTIVE_WIP' },
    { id: 'FB-02', variety: 'Vannamei (VM)', gradeBand: '31/40 pcs/lb', treatment: 'STPP (Carnal 659S)', crates: 70, wipKg: 1412, floorZone: 'Peeling Table #1 & #2', hoursOnFloor: 3.0, status: 'ACTIVE_WIP' },
    { id: 'FB-03', variety: 'Vannamei (VM)', gradeBand: '21/25 pcs/lb', treatment: 'NPT (Altesa Neo S100)', crates: 22, wipKg: 441, floorZone: 'Soaking Tank #3', hoursOnFloor: 1.2, status: 'IN_SOAKING' },
    { id: 'FB-04', variety: 'Black Tiger (BT)', gradeBand: '16/20 pcs/lb', treatment: 'UNT (Untreated Natural)', crates: 40, wipKg: 800, floorZone: 'Inspection Table #4', hoursOnFloor: 1.8, status: 'ACTIVE_WIP' }
  ],

  assumedReports: [
    { lotTrackId: 'VM-VSP-AVN-034', rmCostPerKg: 425, billCount: 42, gradedValuation: 1948750, realizedRatePerKg: 466.2, grossMarginPct: 9.69, realizationIndex: 1.097 },
    { lotTrackId: 'VM-KKD-SGR-089', rmCostPerKg: 440, billCount: 38, gradedValuation: 1813000, realizedRatePerKg: 474.6, grossMarginPct: 7.86, realizationIndex: 1.078 },
    { lotTrackId: 'BT-PSP-NLR-012', rmCostPerKg: 610, billCount: 22, gradedValuation: 3379500, realizedRatePerKg: 669.2, grossMarginPct: 9.70, realizationIndex: 1.097 },
    { lotTrackId: 'VM-JPT-GOD-055', rmCostPerKg: 380, billCount: 50, gradedValuation: 1205100, realizedRatePerKg: 414.1, grossMarginPct: 8.97, realizationIndex: 1.089 }
  ],

  consolidationReports: [
    { id: 'CS-01', date: '2026-10-14', variety: 'VM-HLSO', style: 'Raw Peeled Deveined (RPD)', packSize: '4x2.5 LBS (IQF)', gradedInputKg: 1158, masterCartonsKg: 1135, glazePct: 8.0, varianceKg: -23, compliance: 'PASS' },
    { id: 'CS-02', date: '2026-10-14', variety: 'VM-HLSO', style: 'Easy Peel (EZP)', packSize: '5x2 LBS (Block)', gradedInputKg: 915, masterCartonsKg: 898, glazePct: 10.0, varianceKg: -17, compliance: 'PASS' },
    { id: 'CS-03', date: '2026-10-13', variety: 'BT-HLSO', style: 'Headless Shell-On (HLSO)', packSize: '10x2 LBS (Block)', gradedInputKg: 1225, masterCartonsKg: 1208, glazePct: 7.5, varianceKg: -17, compliance: 'PASS' }
  ],

  // -------------------------------------------------------------
  // 2. HEADER ACTION BUTTON DISPATCHER (AquaOps SaaS Standard)
  // -------------------------------------------------------------
  updateHeaderAction(tabName) {
    const actionContainer = document.getElementById('section-action-btn-container');
    if (!actionContainer) return;

    switch (tabName) {
      case 'floor-overview':
        actionContainer.innerHTML = `
          <button id="btn-quick-intake" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Receive RM Batch</span>
          </button>
        `;
        document.getElementById('btn-quick-intake')?.addEventListener('click', () => this.openReceiveRMModal());
        break;

      case 'receiving-sorting':
        actionContainer.innerHTML = `
          <button id="btn-create-rm-intake" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Receive RM Batch</span>
          </button>
        `;
        document.getElementById('btn-create-rm-intake')?.addEventListener('click', () => this.openReceiveRMModal());
        break;

      case 'deheading':
        actionContainer.innerHTML = `
          <button id="btn-log-deheading" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Log Deheading Run</span>
          </button>
        `;
        document.getElementById('btn-log-deheading')?.addEventListener('click', () => this.openDeheadingModal());
        break;

      case 'grading':
        actionContainer.innerHTML = `
          <button id="btn-record-grading" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Record Grading Run</span>
          </button>
        `;
        document.getElementById('btn-record-grading')?.addEventListener('click', () => this.openGradingModal());
        break;

      case 'value-addition':
        actionContainer.innerHTML = `
          <button id="btn-new-va" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>New VA Batch</span>
          </button>
        `;
        document.getElementById('btn-new-va')?.addEventListener('click', () => this.openValueAdditionModal());
        break;

      case 'transfers':
        actionContainer.innerHTML = `
          <button id="btn-create-transfer" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Create Plant Transfer</span>
          </button>
        `;
        document.getElementById('btn-create-transfer')?.addEventListener('click', () => this.openTransferModal());
        break;

      case 'chemical-stock':
        actionContainer.innerHTML = `
          <button id="btn-adjust-chem-stock" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Adjust Stock</span>
          </button>
        `;
        document.getElementById('btn-adjust-chem-stock')?.addEventListener('click', () => this.openStockAdjustmentModal());
        break;

      case 'usage-logs':
        actionContainer.innerHTML = `
          <button id="btn-log-chem-usage" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Log Soaking Usage</span>
          </button>
        `;
        document.getElementById('btn-log-chem-usage')?.addEventListener('click', () => this.openChemicalUsageModal());
        break;

      case 'chemical-pos':
        actionContainer.innerHTML = `
          <button id="btn-create-chem-po" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Create Chemical PO</span>
          </button>
        `;
        document.getElementById('btn-create-chem-po')?.addEventListener('click', () => this.openChemicalPOModal());
        break;

      case 'payments':
        actionContainer.innerHTML = `
          <button id="btn-record-chem-pay" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Record Payment</span>
          </button>
        `;
        document.getElementById('btn-record-chem-pay')?.addEventListener('click', () => this.openChemicalPaymentModal());
        break;

      case 'batch-traceability':
        actionContainer.innerHTML = `
          <button id="btn-search-trackcode" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <span>Track Code Inspector</span>
          </button>
        `;
        document.getElementById('btn-search-trackcode')?.addEventListener('click', () => this.openTrackCodeInspectorModal());
        break;

      case 'floor-balance':
      case 'assumed-reports':
      case 'consolidation':
        actionContainer.innerHTML = `
          <button id="btn-export-reconciliation" class="bg-white border border-[#CBD5E1] text-[#0F172A] hover:bg-[#F8FAFC] px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            <span>Export Report</span>
          </button>
        `;
        document.getElementById('btn-export-reconciliation')?.addEventListener('click', () => {
          Toast.show('Generating export file (XLSX / PDF)...', 'info');
        });
        break;

      default:
        actionContainer.innerHTML = '';
        break;
    }
  },

  // -------------------------------------------------------------
  // 3. MASTER ROUTE RENDERER
  // -------------------------------------------------------------
  render(containerId, subPage = 'floor-overview', activeHash = '#/preprocessing/dashboard/floor-overview') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Update Header Primary Action Button to strictly match the active tab
    this.updateHeaderAction(subPage);

    switch (subPage) {
      // Dashboard
      case 'floor-overview':
        this.renderFloorOverview(container);
        break;

      // Operations
      case 'receiving-sorting':
        this.renderRMReceived(container);
        break;
      case 'deheading':
        this.renderDeheading(container);
        break;
      case 'grading':
        this.renderGrading(container);
        break;
      case 'value-addition':
        this.renderValueAddition(container);
        break;
      case 'transfers':
        this.renderTransfers(container);
        break;

      // Chemicals
      case 'chemical-stock':
        this.renderChemicalStock(container);
        break;
      case 'usage-logs':
        this.renderChemicalUsageLogs(container);
        break;
      case 'chemical-pos':
        this.renderChemicalPOs(container);
        break;
      case 'payments':
        this.renderChemicalPayments(container);
        break;

      // Traceability
      case 'batch-traceability':
        this.renderBatchTraceability(container);
        break;
      case 'floor-balance':
        this.renderFloorBalance(container);
        break;
      case 'assumed-reports':
        this.renderAssumedReports(container);
        break;
      case 'consolidation':
        this.renderConsolidation(container);
        break;

      default:
        this.renderFloorOverview(container);
        break;
    }
  },

  // -------------------------------------------------------------
  // 4. SCREEN IMPLEMENTATIONS
  // -------------------------------------------------------------

  // --- SCREEN: Floor Overview (Dashboard) ---
  renderFloorOverview(container) {
    container.innerHTML = `
      <div class="space-y-5">
        <!-- 8 Real-World Operational KPI Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <div class="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-[#008292]"></div>
            <div class="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Today's RM Intake</div>
            <div class="text-2xl font-extrabold text-[#0F172A] mt-1">42,650 <span class="text-sm font-medium text-[#64748B]">kg</span></div>
            <div class="text-[11px] text-[#006644] font-medium mt-1 flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
              <span>+6.2% vs yesterday (7 Trucks)</span>
            </div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-[#10B981]"></div>
            <div class="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Avg Deheading Yield</div>
            <div class="text-2xl font-extrabold text-[#0F172A] mt-1">69.45%</div>
            <div class="text-[11px] text-[#006644] font-medium mt-1 flex items-center gap-1">
              <span>Benchmark Target: 68.50% (+0.95%)</span>
            </div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-[#F59E0B]"></div>
            <div class="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Chemical Buffer Stock</div>
            <div class="text-2xl font-extrabold text-[#D97706] mt-1">18 <span class="text-sm font-medium text-[#64748B]">Bags</span></div>
            <div class="text-[11px] text-[#D97706] font-medium mt-1">STPP Carnal 659S Buffer Warning</div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-[#0284C7]"></div>
            <div class="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Floor WIP on Tables</div>
            <div class="text-2xl font-extrabold text-[#0F172A] mt-1">3,103 <span class="text-sm font-medium text-[#64748B]">kg</span></div>
            <div class="text-[11px] text-[#64748B] font-medium mt-1">194 Crates across 4 Lines</div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-[#8B5CF6]"></div>
            <div class="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Inter-Plant In-Transit</div>
            <div class="text-2xl font-extrabold text-[#0F172A] mt-1">8,420 <span class="text-sm font-medium text-[#64748B]">kg</span></div>
            <div class="text-[11px] text-[#64748B] font-medium mt-1">2 Chilled Reefer Convoys</div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-[#64748B]"></div>
            <div class="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Count Variance Index</div>
            <div class="text-2xl font-extrabold text-[#0F172A] mt-1">-19.6 <span class="text-sm font-medium text-[#64748B]">pcs</span></div>
            <div class="text-[11px] text-[#006644] font-medium mt-1">Within ±2 count tolerance</div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-[#008292]"></div>
            <div class="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Active Floor Batches</div>
            <div class="text-2xl font-extrabold text-[#0F172A] mt-1">7 <span class="text-sm font-medium text-[#64748B]">Batches</span></div>
            <div class="text-[11px] text-[#64748B] font-medium mt-1">Unit-1 VSP & Unit-2 KKD</div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-[#10B981]"></div>
            <div class="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">QC & Audit Clearance</div>
            <div class="text-2xl font-extrabold text-[#006644] mt-1">100%</div>
            <div class="text-[11px] text-[#006644] font-medium mt-1">Antibiotic & BoE Clean</div>
          </div>
        </div>

        <!-- Telemetry Charts & Alert Stream Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <!-- Main Chart: 7-Day Production Throughput & Yield -->
          <div class="lg:col-span-2 bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-2xs">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-sm font-bold text-[#0F172A]">Production Throughput & Deheading Yield Realization</h3>
                <p class="text-xs text-[#64748B]">Daily Head-On intake vs Head-Less recovery yield benchmark</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1.5 text-xs text-[#64748B] font-medium">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#008292]"></span> Intake (kg)
                </span>
                <span class="inline-flex items-center gap-1.5 text-xs text-[#64748B] font-medium">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span> Yield %
                </span>
              </div>
            </div>

            <!-- Modern SVG Telemetry Visualizer -->
            <div class="h-64 w-full bg-[#FAFBFC] rounded-lg border border-[#F1F5F9] p-3 flex flex-col justify-between">
              <div class="h-44 flex items-end justify-between gap-3 px-2 pt-4 border-b border-[#E2E8F0]">
                ${[
                  { day: '08 Oct', intake: 34000, yield: 69.1 },
                  { day: '09 Oct', intake: 38500, yield: 68.8 },
                  { day: '10 Oct', intake: 41200, yield: 69.4 },
                  { day: '11 Oct', intake: 36000, yield: 69.2 },
                  { day: '12 Oct', intake: 44000, yield: 69.8 },
                  { day: '13 Oct', intake: 39500, yield: 69.3 },
                  { day: '14 Oct', intake: 42650, yield: 69.5 }
                ].map(item => {
                  const barHeight = Math.round((item.intake / 50000) * 100);
                  return `
                    <div class="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer">
                      <div class="text-[10px] font-bold text-[#006644] opacity-0 group-hover:opacity-100 transition-opacity">${item.yield}%</div>
                      <div class="w-full bg-[#008292] hover:bg-[#006C7A] rounded-t-sm transition-all" style="height: ${barHeight}%;"></div>
                      <div class="text-[10px] font-semibold text-[#64748B] mt-1">${item.day}</div>
                    </div>
                  `;
                }).join('')}
              </div>
              <div class="flex items-center justify-between text-xs text-[#64748B] px-2 pt-1 font-medium">
                <span>Intake Range: 30,000 - 50,000 kg/day</span>
                <span>Average Weekly Recovery: <strong class="text-[#0F172A]">69.30%</strong></span>
              </div>
            </div>
          </div>

          <!-- Alert Stream & Quick Diagnostics -->
          <div class="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-2xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse"></span>
                  Floor Telemetry Alerts
                </h3>
                <span class="text-[11px] font-semibold text-[#008292] cursor-pointer hover:underline">Clear All</span>
              </div>

              <div class="space-y-2.5 text-xs">
                <div class="p-2.5 bg-[#FFFBEB] border-l-3 border-[#F59E0B] rounded-r-md">
                  <div class="font-bold text-[#92400E] flex items-center justify-between">
                    <span>Chemical Buffer Alert</span>
                    <span class="text-[10px] font-normal text-[#B45309]">12m ago</span>
                  </div>
                  <p class="text-[#78350F] mt-0.5">Carnal 659S (STPP) inventory at 18 Bags. Minimum safety buffer is 20 Bags.</p>
                </div>

                <div class="p-2.5 bg-[#F0FDF4] border-l-3 border-[#10B981] rounded-r-md">
                  <div class="font-bold text-[#166534] flex items-center justify-between">
                    <span>Dock Seal Authenticated</span>
                    <span class="text-[10px] font-normal text-[#15803D]">35m ago</span>
                  </div>
                  <p class="text-[#14532D] mt-0.5">Truck AP 37 TE 9011 seal #SL-44921 verified intact. Raw batch cleared for deheading.</p>
                </div>

                <div class="p-2.5 bg-[#EFF6FF] border-l-3 border-[#3B82F6] rounded-r-md">
                  <div class="font-bold text-[#1E40AF] flex items-center justify-between">
                    <span>Inter-Plant Convoy En Route</span>
                    <span class="text-[10px] font-normal text-[#2563EB]">1h ago</span>
                  </div>
                  <p class="text-[#1E3A8A] mt-0.5">Transfer TR-2026-101 departed DFL Unit-2 KKD with 4,200 kg chilled RPD totes.</p>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
              <span class="text-xs text-[#64748B]">Pre-Processing Floor Status:</span>
              <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#E3FCEF] text-[#006644]">
                <span class="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span> Optimal
              </span>
            </div>
          </div>
        </div>

        <!-- Grade Distribution & Chemical Soaking Mix -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-2xs">
            <h3 class="text-sm font-bold text-[#0F172A] mb-3">Live Graded Size Distribution (WIP Crates)</h3>
            <div class="space-y-2 text-xs">
              ${[
                { grade: '16/20 Count (Jumbo)', pct: 18, kg: '7,680 kg', color: 'bg-[#008292]' },
                { grade: '21/25 Count (Extra Large)', pct: 24, kg: '10,240 kg', color: 'bg-[#10B981]' },
                { grade: '26/30 Count (Large)', pct: 28, kg: '11,940 kg', color: 'bg-[#3B82F6]' },
                { grade: '31/40 Count (Medium)', pct: 20, kg: '8,530 kg', color: 'bg-[#F59E0B]' },
                { grade: '41/50 Count (Small)', pct: 10, kg: '4,260 kg', color: 'bg-[#8B5CF6]' }
              ].map(g => `
                <div>
                  <div class="flex items-center justify-between font-semibold text-[#0F172A] mb-1">
                    <span>${g.grade}</span>
                    <span class="text-[#64748B]">${g.kg} (${g.pct}%)</span>
                  </div>
                  <div class="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
                    <div class="${g.color} h-full rounded-full" style="width: ${g.pct}%;"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-2xs">
            <h3 class="text-sm font-bold text-[#0F172A] mb-3">Chemical Treatment & Soaking Additive Mix</h3>
            <div class="space-y-2 text-xs">
              ${[
                { treatment: 'STPP Treated (Carnal 659S / Carfosel)', pct: 58, kg: '24,740 kg', color: 'bg-[#008292]' },
                { treatment: 'Non-Phosphate Treated (Altesa Neo S100/700)', pct: 26, kg: '11,090 kg', color: 'bg-[#10B981]' },
                { treatment: 'Pure Vacuum Salt Chilled Brine', pct: 10, kg: '4,260 kg', color: 'bg-[#3B82F6]' },
                { treatment: 'Untreated Natural (Chemical-Free)', pct: 6, kg: '2,560 kg', color: 'bg-[#F59E0B]' }
              ].map(t => `
                <div>
                  <div class="flex items-center justify-between font-semibold text-[#0F172A] mb-1">
                    <span>${t.treatment}</span>
                    <span class="text-[#64748B]">${t.kg} (${t.pct}%)</span>
                  </div>
                  <div class="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
                    <div class="${t.color} h-full rounded-full" style="width: ${t.pct}%;"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // --- SCREEN: RM Received (Track ID Intake) ---
  renderRMReceived(container) {
    container.innerHTML = `
      <div class="space-y-4">
        <!-- Search & Filter Bar -->
        <div class="bg-white p-3.5 rounded-xl border border-[#E2E8F0] shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2 flex-1 min-w-[280px]">
            <div class="relative w-full max-w-sm">
              <input 
                type="text" 
                id="search-rm-received" 
                placeholder="Search Track Code, Vehicle, Seal, Farm..." 
                class="w-full text-xs pl-8 pr-3 py-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#008292]"
              />
              <svg class="w-4 h-4 text-[#64748B] absolute left-2.5 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <select id="filter-rm-species" class="text-xs px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:outline-none">
              <option value="">All Varieties</option>
              <option value="Vannamei">Vannamei (VM)</option>
              <option value="Black Tiger">Black Tiger (BT)</option>
            </select>
          </div>
          <div class="flex items-center gap-2 text-xs">
            <span class="text-[#64748B]">Showing <strong class="text-[#0F172A]">${this.rmReceivedList.length}</strong> dock batches</span>
            <button id="btn-reset-rm-filter" class="px-2.5 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] rounded-lg font-medium transition-all">Reset</button>
          </div>
        </div>

        <!-- RM Intake Table -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                  <th class="py-3 px-3.5">Track Code</th>
                  <th class="py-3 px-3.5">Arrival Date</th>
                  <th class="py-3 px-3.5">Vehicle & Seal No</th>
                  <th class="py-3 px-3.5">Farm Origin</th>
                  <th class="py-3 px-3.5">Variety</th>
                  <th class="py-3 px-3.5 text-center">Bill Count</th>
                  <th class="py-3 px-3.5 text-center">Recv Count</th>
                  <th class="py-3 px-3.5 text-center">Count Diff</th>
                  <th class="py-3 px-3.5 text-right">Recv Wt (kg)</th>
                  <th class="py-3 px-3.5">Status</th>
                  <th class="py-3 px-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] font-medium text-[#0F172A]">
                ${this.rmReceivedList.map(item => `
                  <tr class="hover:bg-[#F8FAFC] transition-colors">
                    <td class="py-3 px-3.5 font-bold text-[#008292]">
                      <a href="javascript:void(0)" class="hover:underline flex items-center gap-1">
                        ${item.trackCode}
                      </a>
                    </td>
                    <td class="py-3 px-3.5 text-[#64748B]">${item.date}</td>
                    <td class="py-3 px-3.5">
                      <div>${item.vehicleNo}</div>
                      <div class="text-[10px] text-[#64748B] font-mono">${item.sealNo}</div>
                    </td>
                    <td class="py-3 px-3.5 text-[#334155]">${item.farmSource}</td>
                    <td class="py-3 px-3.5"><span class="px-2 py-0.5 rounded bg-[#F1F5F9] font-semibold">${item.variety}</span></td>
                    <td class="py-3 px-3.5 text-center text-[#64748B]">${item.billCount}</td>
                    <td class="py-3 px-3.5 text-center font-bold">${item.recvCount}</td>
                    <td class="py-3 px-3.5 text-center">
                      <span class="px-1.5 py-0.5 rounded text-[11px] font-bold ${item.countDiff <= 0 ? 'bg-[#E3FCEF] text-[#006644]' : 'bg-[#FFF0B3] text-[#8F4D00]'}">
                        ${item.countDiff > 0 ? '+' : ''}${item.countDiff}
                      </span>
                    </td>
                    <td class="py-3 px-3.5 text-right font-mono font-bold">${item.recvWt.toLocaleString()} kg</td>
                    <td class="py-3 px-3.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${item.status === 'VERIFIED' ? 'bg-[#E3FCEF] text-[#006644]' : 'bg-[#FFFBEB] text-[#B45309]'}">
                        ${item.status}
                      </span>
                    </td>
                    <td class="py-3 px-3.5 text-center">
                      <button class="text-[#008292] hover:text-[#005662] font-semibold hover:underline" onclick="alert('Viewing Batch Dossier: ${item.trackCode}')">Details</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // --- SCREEN: Deheading Operations ---
  renderDeheading(container) {
    container.innerHTML = `
      <div class="space-y-4">
        <!-- Deheading Benchmark Card -->
        <div class="bg-white p-3.5 rounded-xl border border-[#E2E8F0] shadow-2xs flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center font-bold text-lg">✂️</div>
            <div>
              <div class="text-xs font-bold text-[#0F172A]">Head-On (HON) to Head-Less (HL) Conversion Standards</div>
              <div class="text-[11px] text-[#64748B]">Benchmark Yield: 68.00% – 71.50% • Yield Formula = (Sample HL Qty / Sample HO Qty) × 100</div>
            </div>
          </div>
          <div class="text-right">
            <span class="text-xs font-medium text-[#64748B]">Active Deheading Lines:</span>
            <span class="text-xs font-bold text-[#008292] ml-1">3 Factory Tables</span>
          </div>
        </div>

        <!-- Deheading Table -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                  <th class="py-3 px-3.5">Run ID</th>
                  <th class="py-3 px-3.5">Date & Shift</th>
                  <th class="py-3 px-3.5">Line / Table</th>
                  <th class="py-3 px-3.5">Supervisor</th>
                  <th class="py-3 px-3.5">Variety</th>
                  <th class="py-3 px-3.5 text-right">HON Qty (kg)</th>
                  <th class="py-3 px-3.5 text-right">HL Qty (kg)</th>
                  <th class="py-3 px-3.5 text-center">Yield %</th>
                  <th class="py-3 px-3.5 text-center">HL Count</th>
                  <th class="py-3 px-3.5 text-right">Ice (kg)</th>
                  <th class="py-3 px-3.5">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] font-medium text-[#0F172A]">
                ${this.deheadingRuns.map(run => `
                  <tr class="hover:bg-[#F8FAFC] transition-colors">
                    <td class="py-3 px-3.5 font-bold font-mono text-[#008292]">${run.id}</td>
                    <td class="py-3 px-3.5">
                      <div>${run.date}</div>
                      <div class="text-[10px] text-[#64748B]">${run.shift}</div>
                    </td>
                    <td class="py-3 px-3.5 font-medium">${run.lineNo}</td>
                    <td class="py-3 px-3.5 text-[#334155]">${run.supervisor}</td>
                    <td class="py-3 px-3.5"><span class="px-2 py-0.5 rounded bg-[#F1F5F9] font-semibold">${run.variety}</span></td>
                    <td class="py-3 px-3.5 text-right font-mono">${run.honQty.toLocaleString()} kg</td>
                    <td class="py-3 px-3.5 text-right font-mono font-bold">${run.hlQty.toLocaleString()} kg</td>
                    <td class="py-3 px-3.5 text-center font-bold">
                      <span class="px-2 py-0.5 rounded ${run.yieldPercent >= 69.0 ? 'bg-[#E3FCEF] text-[#006644]' : 'bg-[#FFFBEB] text-[#B45309]'}">
                        ${run.yieldPercent.toFixed(2)}%
                      </span>
                    </td>
                    <td class="py-3 px-3.5 text-center font-mono">${run.hlCount}</td>
                    <td class="py-3 px-3.5 text-right text-[#64748B]">${run.iceUsedKg} kg</td>
                    <td class="py-3 px-3.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${run.status === 'APPROVED' ? 'bg-[#E3FCEF] text-[#006644]' : 'bg-[#EFF6FF] text-[#1E40AF]'}">
                        ${run.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // --- SCREEN: Grading Lines ---
  renderGrading(container) {
    container.innerHTML = `
      <div class="space-y-4">
        <!-- Mechanical Roller Sizing Table -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
          <div class="p-3.5 border-b border-[#E2E8F0] flex items-center justify-between">
            <div class="font-bold text-sm text-[#0F172A]">Mechanical Roller Grader Operations</div>
            <div class="text-xs text-[#64748B]">Baader & Carnitech High-Speed Sizers</div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                  <th class="py-3 px-3.5">Run Code</th>
                  <th class="py-3 px-3.5">Date & Shift</th>
                  <th class="py-3 px-3.5">Grader Machine</th>
                  <th class="py-3 px-3.5">Variety</th>
                  <th class="py-3 px-3.5">Count per Lb</th>
                  <th class="py-3 px-3.5 text-right">Graded Wt (kg)</th>
                  <th class="py-3 px-3.5 text-center">Crates</th>
                  <th class="py-3 px-3.5 text-center">Runtime (hrs)</th>
                  <th class="py-3 px-3.5">Supervisor</th>
                  <th class="py-3 px-3.5">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] font-medium text-[#0F172A]">
                ${this.gradingRuns.map(run => `
                  <tr class="hover:bg-[#F8FAFC] transition-colors">
                    <td class="py-3 px-3.5 font-bold font-mono text-[#008292]">${run.id}</td>
                    <td class="py-3 px-3.5">${run.date} (${run.shift})</td>
                    <td class="py-3 px-3.5 font-semibold">${run.machine}</td>
                    <td class="py-3 px-3.5"><span class="px-2 py-0.5 rounded bg-[#F1F5F9] font-semibold">${run.variety}</span></td>
                    <td class="py-3 px-3.5 font-bold font-mono text-[#0F172A]">${run.gradeBand}</td>
                    <td class="py-3 px-3.5 text-right font-mono font-bold">${run.gradedWt.toLocaleString()} kg</td>
                    <td class="py-3 px-3.5 text-center font-bold text-[#008292]">${run.crates}</td>
                    <td class="py-3 px-3.5 text-center text-[#64748B]">${run.runtimeHours} hrs</td>
                    <td class="py-3 px-3.5 text-[#334155]">${run.supervisor}</td>
                    <td class="py-3 px-3.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${run.status === 'ACTIVE' ? 'bg-[#EFF6FF] text-[#1E40AF]' : 'bg-[#E3FCEF] text-[#006644]'}">
                        ${run.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // --- SCREEN: Value Addition (VA) ---
  renderValueAddition(container) {
    container.innerHTML = `
      <div class="space-y-4">
        <!-- VA Operational Table -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
          <div class="p-3.5 border-b border-[#E2E8F0] flex items-center justify-between">
            <div class="font-bold text-sm text-[#0F172A]">Peeling, Deveining & Tail-On Value Addition (VA)</div>
            <div class="text-xs text-[#64748B]">Styles: RPD, PVPD, RPDTO (Tail-On)</div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                  <th class="py-3 px-3.5">VA Batch</th>
                  <th class="py-3 px-3.5">Track ID</th>
                  <th class="py-3 px-3.5">Product Style</th>
                  <th class="py-3 px-3.5 text-right">Input HL (kg)</th>
                  <th class="py-3 px-3.5 text-right">VA Output (kg)</th>
                  <th class="py-3 px-3.5 text-right">Rejection (kg)</th>
                  <th class="py-3 px-3.5 text-center">VA Yield %</th>
                  <th class="py-3 px-3.5 text-center">Crates</th>
                  <th class="py-3 px-3.5">Supervisor</th>
                  <th class="py-3 px-3.5">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] font-medium text-[#0F172A]">
                ${this.valueAdditionRuns.map(run => `
                  <tr class="hover:bg-[#F8FAFC] transition-colors">
                    <td class="py-3 px-3.5 font-bold font-mono text-[#008292]">${run.id}</td>
                    <td class="py-3 px-3.5 font-mono text-[#334155]">${run.trackId}</td>
                    <td class="py-3 px-3.5 font-semibold">${run.productStyle}</td>
                    <td class="py-3 px-3.5 text-right font-mono">${run.inputHlQty.toLocaleString()} kg</td>
                    <td class="py-3 px-3.5 text-right font-mono font-bold text-[#008292]">${run.vaOutQty.toLocaleString()} kg</td>
                    <td class="py-3 px-3.5 text-right font-mono text-[#EF4444]">${run.rejectionKg} kg</td>
                    <td class="py-3 px-3.5 text-center font-bold">
                      <span class="px-2 py-0.5 rounded bg-[#E3FCEF] text-[#006644]">${run.yieldPercent.toFixed(2)}%</span>
                    </td>
                    <td class="py-3 px-3.5 text-center font-bold">${run.crates}</td>
                    <td class="py-3 px-3.5 text-[#334155]">${run.supervisor}</td>
                    <td class="py-3 px-3.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${run.status === 'COMPLETED' ? 'bg-[#E3FCEF] text-[#006644]' : 'bg-[#EFF6FF] text-[#1E40AF]'}">
                        ${run.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // --- SCREEN: VA Transfers (Inter-Plant Logistics) ---
  renderTransfers(container) {
    container.innerHTML = `
      <div class="space-y-4">
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
          <div class="p-3.5 border-b border-[#E2E8F0] flex items-center justify-between">
            <div class="font-bold text-sm text-[#0F172A]">Chilled Post-VA Inter-Plant Transfers</div>
            <div class="text-xs text-[#64748B]">Multi-unit transfer gate passes & cold-chain seals</div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                  <th class="py-3 px-3.5">Gate Pass No</th>
                  <th class="py-3 px-3.5">Date</th>
                  <th class="py-3 px-3.5">Source Plant</th>
                  <th class="py-3 px-3.5">Destination Plant</th>
                  <th class="py-3 px-3.5">Style / Material</th>
                  <th class="py-3 px-3.5 text-right">Dispatch Qty (kg)</th>
                  <th class="py-3 px-3.5 text-center">Crates</th>
                  <th class="py-3 px-3.5">Vehicle & Seal No</th>
                  <th class="py-3 px-3.5">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] font-medium text-[#0F172A]">
                ${this.transfersList.map(item => `
                  <tr class="hover:bg-[#F8FAFC] transition-colors">
                    <td class="py-3 px-3.5 font-bold font-mono text-[#008292]">${item.id}</td>
                    <td class="py-3 px-3.5 text-[#64748B]">${item.date}</td>
                    <td class="py-3 px-3.5 font-semibold text-[#0F172A]">${item.fromPlant}</td>
                    <td class="py-3 px-3.5 font-semibold text-[#008292]">${item.toPlant}</td>
                    <td class="py-3 px-3.5">${item.productStyle}</td>
                    <td class="py-3 px-3.5 text-right font-mono font-bold">${item.dispatchQty.toLocaleString()} kg</td>
                    <td class="py-3 px-3.5 text-center font-bold">${item.crates}</td>
                    <td class="py-3 px-3.5">
                      <div>${item.vehicleNo}</div>
                      <div class="text-[10px] text-[#64748B] font-mono">${item.sealNo}</div>
                    </td>
                    <td class="py-3 px-3.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${item.status === 'RECEIVED' ? 'bg-[#E3FCEF] text-[#006644]' : 'bg-[#FFFBEB] text-[#B45309]'}">
                        ${item.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // --- SCREEN: Chemical Stock Ledger ---
  renderChemicalStock(container) {
    container.innerHTML = `
      <div class="space-y-4">
        <!-- Stock Ledger Table -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
          <div class="p-3.5 border-b border-[#E2E8F0] flex items-center justify-between">
            <div class="font-bold text-sm text-[#0F172A]">Food-Grade Additive & Soaking Chemical Ledger</div>
            <div class="text-xs text-[#64748B]">STPP, Carfosel, Non-Phosphate (Altesa), PVD Salt</div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                  <th class="py-3 px-3.5">Chemical Code</th>
                  <th class="py-3 px-3.5">Chemical Brand Name</th>
                  <th class="py-3 px-3.5">Category</th>
                  <th class="py-3 px-3.5 text-center">Opening (Bags)</th>
                  <th class="py-3 px-3.5 text-center">Inward (Bags)</th>
                  <th class="py-3 px-3.5 text-center">Consumed (Bags)</th>
                  <th class="py-3 px-3.5 text-center">Closing (Bags)</th>
                  <th class="py-3 px-3.5 text-right">Net Stock (kg)</th>
                  <th class="py-3 px-3.5 text-center">Buffer Level</th>
                  <th class="py-3 px-3.5">Stock Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] font-medium text-[#0F172A]">
                ${this.chemicalStock.map(chem => `
                  <tr class="hover:bg-[#F8FAFC] transition-colors">
                    <td class="py-3 px-3.5 font-bold font-mono text-[#008292]">${chem.code}</td>
                    <td class="py-3 px-3.5 font-bold text-[#0F172A]">${chem.name}</td>
                    <td class="py-3 px-3.5 text-[#64748B]">${chem.category}</td>
                    <td class="py-3 px-3.5 text-center text-[#64748B]">${chem.openingBags}</td>
                    <td class="py-3 px-3.5 text-center text-[#006644] font-bold">+${chem.inwardBags}</td>
                    <td class="py-3 px-3.5 text-center text-[#BF2600] font-bold">-${chem.consumedBags}</td>
                    <td class="py-3 px-3.5 text-center font-extrabold text-[#0F172A]">${chem.closingBags}</td>
                    <td class="py-3 px-3.5 text-right font-mono font-bold">${chem.netKg.toLocaleString()} kg</td>
                    <td class="py-3 px-3.5 text-center text-[#64748B]">${chem.bufferAlert} Bags</td>
                    <td class="py-3 px-3.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${chem.status === 'OPTIMAL' ? 'bg-[#E3FCEF] text-[#006644]' : 'bg-[#FFFBEB] text-[#B45309]'}">
                        ${chem.status === 'LOW_STOCK' ? '⚠️ Low Buffer' : 'Optimal Stock'}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // --- SCREEN: Usage Logs (Soaking Baths) ---
  renderChemicalUsageLogs(container) {
    container.innerHTML = `
      <div class="space-y-4">
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
          <div class="p-3.5 border-b border-[#E2E8F0] flex items-center justify-between">
            <div class="font-bold text-sm text-[#0F172A]">Chilled Soaking Bath & Chemical Dosage Logs</div>
            <div class="text-xs text-[#64748B]">HACCP Temperature & Immersion Time Audit</div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                  <th class="py-3 px-3.5">Log ID</th>
                  <th class="py-3 px-3.5">Date & Shift</th>
                  <th class="py-3 px-3.5">Track ID</th>
                  <th class="py-3 px-3.5">Chemical Name</th>
                  <th class="py-3 px-3.5">Soaking Tank</th>
                  <th class="py-3 px-3.5 text-right">Dosage (kg)</th>
                  <th class="py-3 px-3.5 text-right">Soaked Qty (kg)</th>
                  <th class="py-3 px-3.5 text-center">Water Temp</th>
                  <th class="py-3 px-3.5 text-center">Duration</th>
                  <th class="py-3 px-3.5">Supervisor</th>
                  <th class="py-3 px-3.5">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] font-medium text-[#0F172A]">
                ${this.chemicalUsageLogs.map(log => `
                  <tr class="hover:bg-[#F8FAFC] transition-colors">
                    <td class="py-3 px-3.5 font-bold font-mono text-[#008292]">${log.id}</td>
                    <td class="py-3 px-3.5">${log.date} (${log.shift})</td>
                    <td class="py-3 px-3.5 font-mono text-[#334155]">${log.trackId}</td>
                    <td class="py-3 px-3.5 font-semibold text-[#0F172A]">${log.chemical}</td>
                    <td class="py-3 px-3.5 text-[#008292]">${log.bathId}</td>
                    <td class="py-3 px-3.5 text-right font-mono">${log.dosageKg} kg</td>
                    <td class="py-3 px-3.5 text-right font-mono font-bold">${log.soakedQtyKg.toLocaleString()} kg</td>
                    <td class="py-3 px-3.5 text-center font-bold text-[#006644]">${log.waterTempC}°C</td>
                    <td class="py-3 px-3.5 text-center text-[#64748B]">${log.durationMin} mins</td>
                    <td class="py-3 px-3.5 text-[#334155]">${log.supervisor}</td>
                    <td class="py-3 px-3.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E3FCEF] text-[#006644]">
                        ${log.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // --- SCREEN: Chemical POs & Customs ---
  renderChemicalPOs(container) {
    container.innerHTML = `
      <div class="space-y-4">
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
          <div class="p-3.5 border-b border-[#E2E8F0] flex items-center justify-between">
            <div class="font-bold text-sm text-[#0F172A]">Chemical Purchase Orders & Import Customs Clearances</div>
            <div class="text-xs text-[#64748B]">High Seas Sale (HSS) & In-Bond Warehousing Entries</div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                  <th class="py-3 px-3.5">PO Number</th>
                  <th class="py-3 px-3.5">PO Date</th>
                  <th class="py-3 px-3.5">Supplier</th>
                  <th class="py-3 px-3.5">Chemical Name</th>
                  <th class="py-3 px-3.5 text-center">Bags</th>
                  <th class="py-3 px-3.5 text-right">Unit Price</th>
                  <th class="py-3 px-3.5 text-right">Total Amount</th>
                  <th class="py-3 px-3.5">Terms & Port</th>
                  <th class="py-3 px-3.5">Bill of Entry (BoE)</th>
                  <th class="py-3 px-3.5">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] font-medium text-[#0F172A]">
                ${this.chemicalPOs.map(po => `
                  <tr class="hover:bg-[#F8FAFC] transition-colors">
                    <td class="py-3 px-3.5 font-bold font-mono text-[#008292]">${po.poNo}</td>
                    <td class="py-3 px-3.5 text-[#64748B]">${po.date}</td>
                    <td class="py-3 px-3.5 font-semibold text-[#0F172A]">${po.supplier}</td>
                    <td class="py-3 px-3.5">${po.chemical}</td>
                    <td class="py-3 px-3.5 text-center font-bold">${po.bags}</td>
                    <td class="py-3 px-3.5 text-right font-mono">₹${po.unitPrice.toLocaleString()}</td>
                    <td class="py-3 px-3.5 text-right font-mono font-bold text-[#008292]">₹${po.totalAmount.toLocaleString()}</td>
                    <td class="py-3 px-3.5">
                      <div>${po.terms}</div>
                      <div class="text-[10px] text-[#64748B]">${po.port}</div>
                    </td>
                    <td class="py-3 px-3.5 font-mono text-[#334155]">${po.boeNo}</td>
                    <td class="py-3 px-3.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${po.status === 'RECEIVED' ? 'bg-[#E3FCEF] text-[#006644]' : 'bg-[#FFFBEB] text-[#B45309]'}">
                        ${po.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // --- SCREEN: Vendor Payments (Chemical AP) ---
  renderChemicalPayments(container) {
    container.innerHTML = `
      <div class="space-y-4">
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
          <div class="p-3.5 border-b border-[#E2E8F0] flex items-center justify-between">
            <div class="font-bold text-sm text-[#0F172A]">Chemical Supplier Accounts Payable & Disbursement Register</div>
            <div class="text-xs text-[#64748B]">Settled banking transactions & TDS compliance</div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                  <th class="py-3 px-3.5">Voucher No</th>
                  <th class="py-3 px-3.5">Payment Date</th>
                  <th class="py-3 px-3.5">Supplier Name</th>
                  <th class="py-3 px-3.5">Invoice Ref</th>
                  <th class="py-3 px-3.5 text-right">Gross Amount</th>
                  <th class="py-3 px-3.5 text-right">TDS (1%)</th>
                  <th class="py-3 px-3.5 text-right">Net Paid</th>
                  <th class="py-3 px-3.5">Bank UTR / Ref</th>
                  <th class="py-3 px-3.5">Mode</th>
                  <th class="py-3 px-3.5">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] font-medium text-[#0F172A]">
                ${this.chemicalPayments.map(pay => `
                  <tr class="hover:bg-[#F8FAFC] transition-colors">
                    <td class="py-3 px-3.5 font-bold font-mono text-[#008292]">${pay.voucherNo}</td>
                    <td class="py-3 px-3.5 text-[#64748B]">${pay.date}</td>
                    <td class="py-3 px-3.5 font-semibold text-[#0F172A]">${pay.supplier}</td>
                    <td class="py-3 px-3.5 font-mono text-[#64748B]">${pay.invNo}</td>
                    <td class="py-3 px-3.5 text-right font-mono">₹${pay.gross.toLocaleString()}</td>
                    <td class="py-3 px-3.5 text-right font-mono text-[#BF2600]">₹${pay.tds.toLocaleString()}</td>
                    <td class="py-3 px-3.5 text-right font-mono font-bold text-[#006644]">₹${pay.netPaid.toLocaleString()}</td>
                    <td class="py-3 px-3.5 font-mono text-[#334155]">${pay.utrNo}</td>
                    <td class="py-3 px-3.5 text-[#64748B]">${pay.mode}</td>
                    <td class="py-3 px-3.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E3FCEF] text-[#006644]">
                        ${pay.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // --- SCREEN: Pond-to-Pack Traceability Master ---
  renderBatchTraceability(container) {
    container.innerHTML = `
      <div class="space-y-4">
        <!-- USFDA/EU Compliance Banner -->
        <div class="bg-[#F0FDF4] p-3.5 rounded-xl border border-[#BBF7D0] flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="text-xl">🛡️</span>
            <div>
              <div class="text-xs font-bold text-[#166534]">USFDA 21 CFR & BRCGS Global Standard Food Safety Lineage</div>
              <div class="text-[11px] text-[#15803D]">Every Track Code connects Farm Harvest Pond $\\rightarrow$ Weighbridge $\\rightarrow$ Deheading Table $\\rightarrow$ Roller Grader $\\rightarrow$ Freezing Tunnel.</div>
            </div>
          </div>
          <div class="text-xs font-bold text-[#166534] bg-white px-3 py-1.5 rounded-lg border border-[#BBF7D0] shadow-2xs">
            100% Traceability Audit Ready
          </div>
        </div>

        <!-- Master Lineage Table -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                  <th class="py-3 px-3.5">Track Code</th>
                  <th class="py-3 px-3.5">Pond Origin & Farmer</th>
                  <th class="py-3 px-3.5">Arrival Date</th>
                  <th class="py-3 px-3.5 text-center">Count</th>
                  <th class="py-3 px-3.5 text-right">Recv Wt (kg)</th>
                  <th class="py-3 px-3.5 text-right">Dehead Wt (kg)</th>
                  <th class="py-3 px-3.5 text-center">Yield %</th>
                  <th class="py-3 px-3.5 text-right">Graded (kg)</th>
                  <th class="py-3 px-3.5">Soaking Batch</th>
                  <th class="py-3 px-3.5">Freezer Line</th>
                  <th class="py-3 px-3.5 text-center">Audit</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] font-medium text-[#0F172A]">
                ${this.traceabilityMaster.map(item => `
                  <tr class="hover:bg-[#F8FAFC] transition-colors">
                    <td class="py-3 px-3.5 font-bold font-mono text-[#008292]">
                      <button class="hover:underline flex items-center gap-1 font-bold" onclick="alert('Viewing Complete Pond-to-Pack Dossier: ${item.trackCode}')">
                        ${item.trackCode}
                      </button>
                    </td>
                    <td class="py-3 px-3.5 text-[#334155]">${item.pondSource}</td>
                    <td class="py-3 px-3.5 text-[#64748B]">${item.arrivalDate}</td>
                    <td class="py-3 px-3.5 text-center font-bold">${item.billCount}</td>
                    <td class="py-3 px-3.5 text-right font-mono">${item.recvWt.toLocaleString()} kg</td>
                    <td class="py-3 px-3.5 text-right font-mono">${item.deheadWt.toLocaleString()} kg</td>
                    <td class="py-3 px-3.5 text-center font-bold text-[#006644]">${item.deheadYield.toFixed(2)}%</td>
                    <td class="py-3 px-3.5 text-right font-mono font-bold text-[#008292]">${item.gradedWt.toLocaleString()} kg</td>
                    <td class="py-3 px-3.5 font-mono text-[11px] text-[#64748B]">${item.soakingBatch}</td>
                    <td class="py-3 px-3.5 font-medium">${item.freezingTunnel}</td>
                    <td class="py-3 px-3.5 text-center">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E3FCEF] text-[#006644]">
                        PASS
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // --- SCREEN: Floor Balance Matrix ---
  renderFloorBalance(container) {
    container.innerHTML = `
      <div class="space-y-4">
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
          <div class="p-3.5 border-b border-[#E2E8F0] flex items-center justify-between">
            <div class="font-bold text-sm text-[#0F172A]">Real-Time Factory Floor WIP Balance Matrix</div>
            <div class="text-xs text-[#64748B]">Cross-tabulation: Variety × Size Grade × Treatment Formula</div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                  <th class="py-3 px-3.5">Variety</th>
                  <th class="py-3 px-3.5">Size Grade Band</th>
                  <th class="py-3 px-3.5">Chemical Treatment</th>
                  <th class="py-3 px-3.5 text-center">Active Crates</th>
                  <th class="py-3 px-3.5 text-right">Floor WIP (kg)</th>
                  <th class="py-3 px-3.5">Factory Floor Zone</th>
                  <th class="py-3 px-3.5 text-center">Aging on Floor</th>
                  <th class="py-3 px-3.5">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] font-medium text-[#0F172A]">
                ${this.floorBalance.map(fb => `
                  <tr class="hover:bg-[#F8FAFC] transition-colors">
                    <td class="py-3 px-3.5 font-bold">${fb.variety}</td>
                    <td class="py-3 px-3.5 font-mono font-bold text-[#008292]">${fb.gradeBand}</td>
                    <td class="py-3 px-3.5 font-medium">${fb.treatment}</td>
                    <td class="py-3 px-3.5 text-center font-bold">${fb.crates}</td>
                    <td class="py-3 px-3.5 text-right font-mono font-extrabold text-[#0F172A]">${fb.wipKg.toLocaleString()} kg</td>
                    <td class="py-3 px-3.5 text-[#334155]">${fb.floorZone}</td>
                    <td class="py-3 px-3.5 text-center font-medium ${fb.hoursOnFloor > 2.5 ? 'text-[#D97706]' : 'text-[#006644]'}">${fb.hoursOnFloor} hrs</td>
                    <td class="py-3 px-3.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EFF6FF] text-[#1E40AF]">
                        ${fb.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // --- SCREEN: Assumed Yield Reports (Financial Audit) ---
  renderAssumedReports(container) {
    container.innerHTML = `
      <div class="space-y-4">
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
          <div class="p-3.5 border-b border-[#E2E8F0] flex items-center justify-between">
            <div class="font-bold text-sm text-[#0F172A]">Assumed Financial Yield & Realization Analysis</div>
            <div class="text-xs text-[#64748B]">Procurement Purchase Rate vs Graded Value Recovery</div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                  <th class="py-3 px-3.5">Lot Track ID</th>
                  <th class="py-3 px-3.5 text-right">RM Rate (₹/kg)</th>
                  <th class="py-3 px-3.5 text-center">Bill Count</th>
                  <th class="py-3 px-3.5 text-right">Graded Valuation</th>
                  <th class="py-3 px-3.5 text-right">Realized Rate (₹/kg)</th>
                  <th class="py-3 px-3.5 text-center">Gross Margin %</th>
                  <th class="py-3 px-3.5 text-center">Realization Multiplier</th>
                  <th class="py-3 px-3.5">Commercial Rating</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] font-medium text-[#0F172A]">
                ${this.assumedReports.map(item => `
                  <tr class="hover:bg-[#F8FAFC] transition-colors">
                    <td class="py-3 px-3.5 font-bold font-mono text-[#008292]">${item.lotTrackId}</td>
                    <td class="py-3 px-3.5 text-right font-mono">₹${item.rmCostPerKg}</td>
                    <td class="py-3 px-3.5 text-center font-bold">${item.billCount}</td>
                    <td class="py-3 px-3.5 text-right font-mono font-bold text-[#008292]">₹${item.gradedValuation.toLocaleString()}</td>
                    <td class="py-3 px-3.5 text-right font-mono font-bold text-[#006644]">₹${item.realizedRatePerKg.toFixed(1)}</td>
                    <td class="py-3 px-3.5 text-center font-extrabold text-[#006644]">${item.grossMarginPct.toFixed(2)}%</td>
                    <td class="py-3 px-3.5 text-center font-mono font-bold">${item.realizationIndex}x</td>
                    <td class="py-3 px-3.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E3FCEF] text-[#006644]">
                        HIGH RECOVERY
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // --- SCREEN: Consolidation Reports (Packaging Reconciliation) ---
  renderConsolidation(container) {
    container.innerHTML = `
      <div class="space-y-4">
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
          <div class="p-3.5 border-b border-[#E2E8F0] flex items-center justify-between">
            <div class="font-bold text-sm text-[#0F172A]">Daily & Monthly Master Packaging Consolidation</div>
            <div class="text-xs text-[#64748B]">Glaze Percentage, Thawing Variance & Master Carton Balancing</div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                  <th class="py-3 px-3.5">Consolidation ID</th>
                  <th class="py-3 px-3.5">Date</th>
                  <th class="py-3 px-3.5">Variety & Style</th>
                  <th class="py-3 px-3.5">Packaging Size</th>
                  <th class="py-3 px-3.5 text-right">Graded Input (kg)</th>
                  <th class="py-3 px-3.5 text-right">Master Cartons (kg)</th>
                  <th class="py-3 px-3.5 text-center">Glaze %</th>
                  <th class="py-3 px-3.5 text-center">Packaging Variance</th>
                  <th class="py-3 px-3.5">Audit Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] font-medium text-[#0F172A]">
                ${this.consolidationReports.map(item => `
                  <tr class="hover:bg-[#F8FAFC] transition-colors">
                    <td class="py-3 px-3.5 font-bold font-mono text-[#008292]">${item.id}</td>
                    <td class="py-3 px-3.5 text-[#64748B]">${item.date}</td>
                    <td class="py-3 px-3.5 font-semibold text-[#0F172A]">${item.variety} • ${item.style}</td>
                    <td class="py-3 px-3.5 font-mono text-[#334155]">${item.packSize}</td>
                    <td class="py-3 px-3.5 text-right font-mono">${item.gradedInputKg.toLocaleString()} kg</td>
                    <td class="py-3 px-3.5 text-right font-mono font-bold text-[#008292]">${item.masterCartonsKg.toLocaleString()} kg</td>
                    <td class="py-3 px-3.5 text-center font-bold text-[#006644]">${item.glazePct}%</td>
                    <td class="py-3 px-3.5 text-center font-mono font-bold ${item.varianceKg < 0 ? 'text-[#64748B]' : 'text-[#BF2600]'}">${item.varianceKg} kg</td>
                    <td class="py-3 px-3.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E3FCEF] text-[#006644]">
                        ${item.compliance}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // -------------------------------------------------------------
  // 5. INTERACTIVE OPERATIONAL MODALS
  // -------------------------------------------------------------

  // Modal: Receive RM Batch
  openReceiveRMModal() {
    Modal.open({
      title: 'Receive Raw Material Intake (Generate Track Code)',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs">
          <div class="p-3 bg-[#F0FAFC] border border-[#B2ECF3] rounded-lg text-[#006C7A]">
            Generates USFDA/EU Pond-to-Pack batch tracking lineage. Dock weighbridge and seal verification must be confirmed.
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Track Code Format</label>
              <input type="text" id="rm-track-code" value="VM-VSP-LOT-${Math.floor(100 + Math.random() * 900)}" class="w-full p-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md font-mono font-bold text-[#008292]" readonly />
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Arrival Date</label>
              <input type="date" id="rm-date" value="2026-10-14" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Vehicle Number</label>
              <input type="text" id="rm-vehicle" placeholder="e.g. AP 37 TE 9011" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md uppercase" />
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Seal Number</label>
              <input type="text" id="rm-seal" placeholder="e.g. SL-44925" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md uppercase" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Species / Variety</label>
              <select id="rm-variety" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md">
                <option value="Vannamei (VM)">Vannamei Shrimp (VM)</option>
                <option value="Black Tiger (BT)">Black Tiger Shrimp (BT)</option>
                <option value="Scampi">Freshwater Scampi</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Farm / Supplier</label>
              <input type="text" id="rm-farm" placeholder="Farm pond origin or supplier name" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Bill Count (pcs/kg)</label>
              <input type="number" id="rm-bill-count" value="40" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Received Count</label>
              <input type="number" id="rm-recv-count" value="40" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Received Weight (kg)</label>
              <input type="number" id="rm-recv-wt" placeholder="e.g. 3500" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Verify & Intake Batch',
          type: 'primary',
          onClick: (m) => {
            const trackCode = document.getElementById('rm-track-code').value;
            const vehicle = document.getElementById('rm-vehicle').value || 'AP 37 TE 9011';
            const seal = document.getElementById('rm-seal').value || 'SL-44929';
            const variety = document.getElementById('rm-variety').value;
            const farm = document.getElementById('rm-farm').value || 'Godavari Coastal Aquaculture';
            const billCount = parseInt(document.getElementById('rm-bill-count').value, 10) || 40;
            const recvCount = parseInt(document.getElementById('rm-recv-count').value, 10) || 40;
            const recvWt = parseInt(document.getElementById('rm-recv-wt').value, 10) || 3500;

            this.rmReceivedList.unshift({
              id: `RM-${Date.now().toString().slice(-4)}`,
              trackCode,
              date: '2026-10-14',
              vehicleNo: vehicle,
              sealNo: seal,
              farmSource: farm,
              variety,
              billCount,
              recvCount,
              countDiff: recvCount - billCount,
              billWt: recvWt,
              recvWt,
              status: 'VERIFIED',
              supervisor: 'K. Somaraju'
            });

            m.close();
            Toast.show(`Track Code ${trackCode} successfully authenticated at dock!`, 'success');
            this.render('main-content-container', 'receiving-sorting');
          }
        }
      ]
    });
  },

  // Modal: Log Deheading Run
  openDeheadingModal() {
    Modal.open({
      title: 'Log Deheading Operation & Sample Yield Recovery',
      size: 'md',
      content: `
        <div class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold text-[#0F172A] mb-1">Deheading Line / Table</label>
            <select id="dh-line" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md">
              <option value="Deheading Line #1">Deheading Line #1 (Table A)</option>
              <option value="Deheading Line #2">Deheading Line #2 (Table B)</option>
              <option value="Deheading Line #3">Deheading Line #3 (Table C)</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Shift</label>
              <select id="dh-shift" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md">
                <option value="Shift A (Morning)">Shift A (Morning)</option>
                <option value="Shift B (Afternoon)">Shift B (Afternoon)</option>
                <option value="Shift C (Night)">Shift C (Night)</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Line Supervisor</label>
              <input type="text" id="dh-sup" value="K. Somaraju" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Head-On (HON) Input (kg)</label>
              <input type="number" id="dh-hon-qty" value="4000" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Head-Less (HL) Output (kg)</label>
              <input type="number" id="dh-hl-qty" value="2780" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
          </div>

          <div class="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
            <div class="flex items-center justify-between font-bold">
              <span>Calculated Yield Recovery:</span>
              <span id="dh-calc-yield" class="text-[#008292] text-sm">69.50%</span>
            </div>
            <p class="text-[10px] text-[#64748B] mt-0.5">Benchmark Target: 68.0% - 71.5%</p>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Approve & Save Run',
          type: 'primary',
          onClick: (m) => {
            const lineNo = document.getElementById('dh-line').value;
            const shift = document.getElementById('dh-shift').value;
            const supervisor = document.getElementById('dh-sup').value;
            const honQty = parseFloat(document.getElementById('dh-hon-qty').value) || 4000;
            const hlQty = parseFloat(document.getElementById('dh-hl-qty').value) || 2780;
            const yieldPercent = (hlQty / honQty) * 100;

            this.deheadingRuns.unshift({
              id: `DH-0${this.deheadingRuns.length + 1}`,
              date: '2026-10-14',
              shift,
              lineNo,
              supervisor,
              variety: 'VM-HEAD ON',
              honQty,
              hlQty,
              yieldPercent,
              hlCount: '31/40',
              iceUsedKg: 800,
              status: 'APPROVED'
            });

            m.close();
            Toast.show(`Deheading run logged! Yield: ${yieldPercent.toFixed(2)}%`, 'success');
            this.render('main-content-container', 'deheading');
          }
        }
      ]
    });

    // Wire live yield calculation on input
    const honInput = document.getElementById('dh-hon-qty');
    const hlInput = document.getElementById('dh-hl-qty');
    const yieldDisplay = document.getElementById('dh-calc-yield');
    const updateYield = () => {
      const h = parseFloat(honInput?.value) || 1;
      const l = parseFloat(hlInput?.value) || 0;
      if (yieldDisplay) yieldDisplay.innerText = `${((l / h) * 100).toFixed(2)}%`;
    };
    honInput?.addEventListener('input', updateYield);
    hlInput?.addEventListener('input', updateYield);
  },

  // Modal: Record Grading Run
  openGradingModal() {
    Modal.open({
      title: 'Record Roller Grader Sizing Output',
      size: 'md',
      content: `
        <div class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold text-[#0F172A] mb-1">Roller Grader Machine</label>
            <select id="gr-machine" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md">
              <option value="Roller Grader #1 (Baader)">Roller Grader #1 (Baader)</option>
              <option value="Roller Grader #2 (Carnitech)">Roller Grader #2 (Carnitech)</option>
              <option value="Roller Grader #3">Roller Grader #3</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Grade Band (pcs/lb)</label>
              <select id="gr-band" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md font-mono font-bold">
                <option value="16/20 pcs/lb">16/20 pcs/lb (Jumbo)</option>
                <option value="21/25 pcs/lb">21/25 pcs/lb (Extra Large)</option>
                <option value="26/30 pcs/lb">26/30 pcs/lb (Large)</option>
                <option value="31/40 pcs/lb">31/40 pcs/lb (Medium)</option>
                <option value="41/50 pcs/lb">41/50 pcs/lb (Small)</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Graded Weight (kg)</label>
              <input type="number" id="gr-wt" value="1350" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Chilled Crates Count</label>
              <input type="number" id="gr-crates" value="68" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Supervisor</label>
              <input type="text" id="gr-sup" value="R. Krishna" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Record Output',
          type: 'primary',
          onClick: (m) => {
            const machine = document.getElementById('gr-machine').value;
            const gradeBand = document.getElementById('gr-band').value;
            const gradedWt = parseFloat(document.getElementById('gr-wt').value) || 1350;
            const crates = parseInt(document.getElementById('gr-crates').value, 10) || 68;
            const supervisor = document.getElementById('gr-sup').value;

            this.gradingRuns.unshift({
              id: `GR-0${this.gradingRuns.length + 1}`,
              date: '2026-10-14',
              shift: 'Shift A',
              machine,
              variety: 'VM-HLSO',
              gradeBand,
              gradedWt,
              crates,
              runtimeHours: 3.5,
              supervisor,
              status: 'ACTIVE'
            });

            m.close();
            Toast.show(`Grading output recorded for ${gradeBand}!`, 'success');
            this.render('main-content-container', 'grading');
          }
        }
      ]
    });
  },

  // Modal: New VA Batch
  openValueAdditionModal() {
    Modal.open({
      title: 'Allocate Value Addition (Peeling / Deveining)',
      size: 'md',
      content: `
        <div class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold text-[#0F172A] mb-1">Associated Track ID</label>
            <select id="va-track" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md font-mono">
              ${this.rmReceivedList.map(r => `<option value="${r.trackCode}">${r.trackCode} (${r.farmSource})</option>`).join('')}
            </select>
          </div>

          <div>
            <label class="block font-semibold text-[#0F172A] mb-1">Product Value Addition Style</label>
            <select id="va-style" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md font-semibold">
              <option value="RPD (Raw Peeled & Deveined)">RPD (Raw Peeled & Deveined)</option>
              <option value="PVPD (Pull-Vein Peeled & Deveined)">PVPD (Pull-Vein Peeled & Deveined)</option>
              <option value="RPDTO (Peeled Deveined Tail-On)">RPDTO (Peeled Deveined Tail-On)</option>
              <option value="EZP (Easy Peel Shell-On)">EZP (Easy Peel Shell-On)</option>
            </select>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Input HL (kg)</label>
              <input type="number" id="va-input" value="1200" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">VA Output (kg)</label>
              <input type="number" id="va-output" value="985" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Rejection (kg)</label>
              <input type="number" id="va-rej" value="20" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Allocate VA Batch',
          type: 'primary',
          onClick: (m) => {
            const trackId = document.getElementById('va-track').value;
            const productStyle = document.getElementById('va-style').value;
            const inputHlQty = parseFloat(document.getElementById('va-input').value) || 1200;
            const vaOutQty = parseFloat(document.getElementById('va-output').value) || 985;
            const rejectionKg = parseFloat(document.getElementById('va-rej').value) || 20;
            const yieldPercent = (vaOutQty / inputHlQty) * 100;

            this.valueAdditionRuns.unshift({
              id: `VA-0${this.valueAdditionRuns.length + 1}`,
              date: '2026-10-14',
              trackId,
              productStyle,
              inputHlQty,
              vaOutQty,
              rejectionKg,
              yieldPercent,
              crates: Math.round(vaOutQty / 20),
              supervisor: 'S. Kameshwari',
              status: 'IN_PROCESS'
            });

            m.close();
            Toast.show(`Value addition batch allocated for ${productStyle}!`, 'success');
            this.render('main-content-container', 'value-addition');
          }
        }
      ]
    });
  },

  // Modal: Create Plant Transfer
  openTransferModal() {
    Modal.open({
      title: 'Generate Inter-Plant Transfer Gate Pass',
      size: 'md',
      content: `
        <div class="space-y-4 text-xs">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Source Plant</label>
              <select id="tr-from" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md">
                <option value="DFL Unit-2 (KKD)">DFL Unit-2 (Kakinada)</option>
                <option value="DFL Unit-1 (VSP)">DFL Unit-1 (Visakhapatnam)</option>
                <option value="DFL Unit-4 (PND)">DFL Unit-4 (Penumdam)</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Destination Plant</label>
              <select id="tr-to" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md">
                <option value="DFL Unit-1 (VSP)">DFL Unit-1 (Visakhapatnam Freezing)</option>
                <option value="DFL Unit-3 (PSP)">DFL Unit-3 (Pydibhimavaram)</option>
                <option value="DFL Unit-5 (JPT)">DFL Unit-5 (Juvvalapalem)</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Dispatch Quantity (kg)</label>
              <input type="number" id="tr-qty" value="3800" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Vehicle Number</label>
              <input type="text" id="tr-veh" value="AP 05 TX 9102" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md uppercase" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Seal Number</label>
              <input type="text" id="tr-seal" value="TR-SL-8815" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md uppercase" />
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Chilled Crates Count</label>
              <input type="number" id="tr-crates" value="190" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Issue Gate Pass',
          type: 'primary',
          onClick: (m) => {
            const fromPlant = document.getElementById('tr-from').value;
            const toPlant = document.getElementById('tr-to').value;
            const dispatchQty = parseFloat(document.getElementById('tr-qty').value) || 3800;
            const vehicleNo = document.getElementById('tr-veh').value;
            const sealNo = document.getElementById('tr-seal').value;
            const crates = parseInt(document.getElementById('tr-crates').value, 10) || 190;

            this.transfersList.unshift({
              id: `TR-2026-${Math.floor(100 + Math.random() * 900)}`,
              date: '2026-10-14',
              fromPlant,
              toPlant,
              variety: 'Vannamei (VM)',
              productStyle: 'RPD Chilled Totes',
              dispatchQty,
              crates,
              sealNo,
              vehicleNo,
              status: 'IN_TRANSIT'
            });

            m.close();
            Toast.show(`Transfer gate pass issued for ${dispatchQty.toLocaleString()} kg!`, 'success');
            this.render('main-content-container', 'transfers');
          }
        }
      ]
    });
  },

  // Modal: Adjust Chemical Stock
  openStockAdjustmentModal() {
    Modal.open({
      title: 'Chemical Stock Adjustment & Physical Audit',
      size: 'md',
      content: `
        <div class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold text-[#0F172A] mb-1">Select Chemical</label>
            <select id="adj-chem" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md">
              ${this.chemicalStock.map(c => `<option value="${c.code}">${c.name} (Current: ${c.closingBags} Bags)</option>`).join('')}
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Adjustment Type</label>
              <select id="adj-type" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md">
                <option value="INWARD">Stock Receipt (+ Bags)</option>
                <option value="CONSUMED">Internal Floor Issue (- Bags)</option>
                <option value="AUDIT">Physical Audit Count</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Number of Bags (25 kg/bag)</label>
              <input type="number" id="adj-bags" value="10" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Apply Stock Update',
          type: 'primary',
          onClick: (m) => {
            const chemCode = document.getElementById('adj-chem').value;
            const adjType = document.getElementById('adj-type').value;
            const bags = parseInt(document.getElementById('adj-bags').value, 10) || 0;

            const item = this.chemicalStock.find(c => c.code === chemCode);
            if (item) {
              if (adjType === 'INWARD') {
                item.inwardBags += bags;
                item.closingBags += bags;
              } else if (adjType === 'CONSUMED') {
                item.consumedBags += bags;
                item.closingBags -= bags;
              } else {
                item.closingBags = bags;
              }
              item.netKg = item.closingBags * 25;
              item.status = item.closingBags <= item.bufferAlert ? 'LOW_STOCK' : 'OPTIMAL';
            }

            m.close();
            Toast.show('Chemical ledger successfully balanced!', 'success');
            this.render('main-content-container', 'chemical-stock');
          }
        }
      ]
    });
  },

  // Modal: Log Chemical Usage
  openChemicalUsageModal() {
    Modal.open({
      title: 'Log Chilled Chemical Soaking Dosage',
      size: 'md',
      content: `
        <div class="space-y-4 text-xs">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Associated Track ID</label>
              <select id="log-track" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md font-mono">
                ${this.rmReceivedList.map(r => `<option value="${r.trackCode}">${r.trackCode}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Chemical Brand</label>
              <select id="log-chem" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md">
                <option value="Carnal 659S (STPP)">Carnal 659S (STPP Phosphate)</option>
                <option value="Carfosel B940">Carfosel B940 (Phosphate)</option>
                <option value="Altesa Neo S100">Altesa Neo S100 (Non-Phosphate)</option>
                <option value="Pure Vacuum Dried Salt">Pure Vacuum Dried Salt (PVD)</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Dosage (kg)</label>
              <input type="number" id="log-dosage" value="12.5" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Soaked Qty (kg)</label>
              <input type="number" id="log-qty" value="1100" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Water Temp (°C)</label>
              <input type="number" id="log-temp" value="2.5" step="0.1" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Submit Soaking Log',
          type: 'primary',
          onClick: (m) => {
            const trackId = document.getElementById('log-track').value;
            const chemical = document.getElementById('log-chem').value;
            const dosageKg = parseFloat(document.getElementById('log-dosage').value) || 12.5;
            const soakedQtyKg = parseFloat(document.getElementById('log-qty').value) || 1100;
            const waterTempC = parseFloat(document.getElementById('log-temp').value) || 2.5;

            this.chemicalUsageLogs.unshift({
              id: `LOG-${Math.floor(700 + Math.random() * 200)}`,
              date: '2026-10-14',
              shift: 'Shift A',
              trackId,
              chemical,
              bathId: 'Soaking Tank #1',
              dosageKg,
              soakedQtyKg,
              waterTempC,
              durationMin: 45,
              supervisor: 'K. Somaraju',
              status: 'VERIFIED'
            });

            m.close();
            Toast.show('Soaking bath dosage verified & logged!', 'success');
            this.render('main-content-container', 'usage-logs');
          }
        }
      ]
    });
  },

  // Modal: Create Chemical PO
  openChemicalPOModal() {
    Modal.open({
      title: 'Issue Food-Grade Chemical Purchase Order (PO)',
      size: 'md',
      content: `
        <div class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold text-[#0F172A] mb-1">Supplier Name</label>
            <input type="text" id="po-supplier" value="Budenheim India Pvt Ltd" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Chemical Name</label>
              <select id="po-chem" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md">
                <option value="Carnal 659S (STPP)">Carnal 659S (STPP)</option>
                <option value="Carfosel B940">Carfosel B940</option>
                <option value="Altesa Neo S100">Altesa Neo S100</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Number of Bags (25 kg)</label>
              <input type="number" id="po-bags" value="100" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Unit Price (₹/bag)</label>
              <input type="number" id="po-price" value="4200" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Import Port / Terms</label>
              <input type="text" id="po-port" value="Paradip Port (HSS)" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Issue PO',
          type: 'primary',
          onClick: (m) => {
            const supplier = document.getElementById('po-supplier').value;
            const chemical = document.getElementById('po-chem').value;
            const bags = parseInt(document.getElementById('po-bags').value, 10) || 100;
            const unitPrice = parseFloat(document.getElementById('po-price').value) || 4200;

            this.chemicalPOs.unshift({
              poNo: `PO-CH-2026-0${this.chemicalPOs.length + 45}`,
              date: '2026-10-14',
              supplier,
              chemical,
              bags,
              unitPrice,
              totalAmount: bags * unitPrice,
              terms: 'High Seas Sale (HSS)',
              port: 'Paradip Port',
              boeNo: `BOE-${Math.floor(6700000 + Math.random() * 99999)}`,
              status: 'RECEIVED'
            });

            m.close();
            Toast.show('Chemical PO created successfully!', 'success');
            this.render('main-content-container', 'chemical-pos');
          }
        }
      ]
    });
  },

  // Modal: Record Chemical Payment
  openChemicalPaymentModal() {
    Modal.open({
      title: 'Disburse Chemical Vendor Payment',
      size: 'md',
      content: `
        <div class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold text-[#0F172A] mb-1">Vendor / Beneficiary</label>
            <input type="text" id="pay-supp" value="Budenheim India Pvt Ltd" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Invoice Reference</label>
              <input type="text" id="pay-inv" value="INV-BDH-2026-95" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
            <div>
              <label class="block font-semibold text-[#0F172A] mb-1">Disbursed Amount (₹)</label>
              <input type="number" id="pay-amount" value="415800" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md" />
            </div>
          </div>

          <div>
            <label class="block font-semibold text-[#0F172A] mb-1">Bank UTR / Transaction Reference</label>
            <input type="text" id="pay-utr" value="SBIN2262${Math.floor(100000 + Math.random() * 900000)}" class="w-full p-2 bg-white border border-[#CBD5E1] rounded-md font-mono" />
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Confirm Payment',
          type: 'primary',
          onClick: (m) => {
            const supplier = document.getElementById('pay-supp').value;
            const invNo = document.getElementById('pay-inv').value;
            const netPaid = parseFloat(document.getElementById('pay-amount').value) || 415800;
            const utrNo = document.getElementById('pay-utr').value;

            this.chemicalPayments.unshift({
              voucherNo: `VCH-CH-${Math.floor(900 + Math.random() * 100)}`,
              date: '2026-10-14',
              supplier,
              invNo,
              gross: netPaid + (netPaid * 0.01),
              tds: netPaid * 0.01,
              netPaid,
              utrNo,
              mode: 'RTGS Electronic',
              status: 'SETTLED'
            });

            m.close();
            Toast.show('Vendor payment voucher recorded & settled!', 'success');
            this.render('main-content-container', 'payments');
          }
        }
      ]
    });
  },

  // Modal: Track Code Inspector
  openTrackCodeInspectorModal() {
    Modal.open({
      title: 'USFDA / EU Pond-to-Pack Track Code Dossier',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs">
          <div class="p-3 bg-[#F0FAFC] border border-[#B2ECF3] rounded-lg">
            <span class="font-bold text-[#006C7A]">Genealogical Audit Trace:</span>
            <span class="text-[#004D57]"> Verified pond water testing, dock receiving, deheading line, roller grader, chemical soaking bath, and freezing tunnel ID.</span>
          </div>

          <div class="relative pl-6 space-y-4 border-l-2 border-[#008292]">
            <div class="relative">
              <span class="absolute -left-8 top-0 w-4 h-4 rounded-full bg-[#008292] text-white flex items-center justify-center text-[9px] font-bold">1</span>
              <div class="font-bold text-[#0F172A]">Farm Origin & Harvest Gate</div>
              <div class="text-[#64748B]">Akividu Cluster Pond 4B • Farmer: Godavari Coastal Aqua • Harvested: 2026-10-14 04:30 AM</div>
            </div>

            <div class="relative">
              <span class="absolute -left-8 top-0 w-4 h-4 rounded-full bg-[#008292] text-white flex items-center justify-center text-[9px] font-bold">2</span>
              <div class="font-bold text-[#0F172A]">Factory Dock Weighment & Seal Check</div>
              <div class="text-[#64748B]">Truck AP 37 TE 9011 • Seal #SL-44921 Verified Intact • Weight: 4,180 kg</div>
            </div>

            <div class="relative">
              <span class="absolute -left-8 top-0 w-4 h-4 rounded-full bg-[#008292] text-white flex items-center justify-center text-[9px] font-bold">3</span>
              <div class="font-bold text-[#0F172A]">Deheading Floor Recovery</div>
              <div class="text-[#64748B]">Line #1 (Supervisor: K. Somaraju) • Output: 2,905 kg HLSO (69.50% Yield)</div>
            </div>

            <div class="relative">
              <span class="absolute -left-8 top-0 w-4 h-4 rounded-full bg-[#008292] text-white flex items-center justify-center text-[9px] font-bold">4</span>
              <div class="font-bold text-[#0F172A]">Grading & Value Addition</div>
              <div class="text-[#64748B]">Roller Grader #1 (Baader) • Grade: 26/30 & 31/40 • Style: RPD Peeled</div>
            </div>

            <div class="relative">
              <span class="absolute -left-8 top-0 w-4 h-4 rounded-full bg-[#10B981] text-white flex items-center justify-center text-[9px] font-bold">5</span>
              <div class="font-bold text-[#006644]">Chemical Treatment & IQF Tunnel</div>
              <div class="text-[#15803D]">Soaking Bath #1 (STPP Carnal 659S at 2.8°C) • Transferred to IQF Tunnel #1</div>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Close', type: 'secondary', onClick: (m) => m.close() },
        { label: 'Download USFDA Dossier PDF', type: 'primary', onClick: () => Toast.show('Exporting Certificate...', 'info') }
      ]
    });
  }
};
