// Pre-processing Operations View (Standardized with Purchase Base Design System)
import { Toast } from '../components/toast.js';
import { Modal } from '../components/modal.js';

// =========================================================================
// AQUAPULSE / DEVI FISHERIES BASE DESIGN SYSTEM (STANDARDIZED FROM PURCHASE)
// =========================================================================
const UIBase = {
  renderHeader(title, actionBtnHtml = '') {
    return `
      <div class="flex flex-wrap items-center justify-between gap-3 mb-2 animate-fade-in">
        <div>
          <h1 class="text-xl font-extrabold text-[#172B4D]">${title}</h1>
        </div>
        ${actionBtnHtml ? `<div class="flex items-center gap-2">${actionBtnHtml}</div>` : ''}
      </div>
    `;
  },

  renderFilterCard(opts) {
    const { idPrefix, title = 'Search & Filters', fields = [], searchBtnText = 'Search' } = opts;
    return `
      <div class="dt-top-filter-card bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs mb-3 transition-all duration-200" style="margin-bottom: 12px !important;">
        <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#F1F5F9]">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#0F172A] uppercase tracking-wider">${title}</h3>
          </div>
        </div>

        <div id="${idPrefix}-filter-body" class="dt-top-filter-body grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-xs items-end">
          ${fields.map(f => `
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">${f.label}</label>
              ${f.html}
            </div>
          `).join('')}

          <div class="flex items-center gap-2 pt-2">
            <button type="button" id="${idPrefix}-search-btn" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <span>${searchBtnText}</span>
            </button>
            <button type="button" id="${idPrefix}-reset-btn" class="px-4 py-2 bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1 shadow-xs hover:shadow transition-all cursor-pointer" title="Reset all filters">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  bindFilter(idPrefix, onSearch, onReset) {
    const toggleBtn = document.getElementById(`${idPrefix}-toggle-btn`);
    const filterBody = document.getElementById(`${idPrefix}-filter-body`);
    const toggleIcon = document.getElementById(`${idPrefix}-toggle-icon`);
    const resetBtn = document.getElementById(`${idPrefix}-reset-btn`);
    const searchBtn = document.getElementById(`${idPrefix}-search-btn`);

    if (toggleBtn && filterBody) {
      let isCollapsed = false;
      toggleBtn.onclick = () => {
        isCollapsed = !isCollapsed;
        if (isCollapsed) {
          filterBody.classList.add('hidden');
          if (toggleIcon) toggleIcon.classList.add('-rotate-90');
          toggleBtn.title = 'Show Filter';
        } else {
          filterBody.classList.remove('hidden');
          if (toggleIcon) toggleIcon.classList.remove('-rotate-90');
          toggleBtn.title = 'Hide Filter';
        }
      };
    }

    if (resetBtn && onReset) {
      resetBtn.onclick = onReset;
    }

    if (searchBtn && onSearch) {
      searchBtn.onclick = onSearch;
    }
  },

  renderTotals(title, count, countUnit, metrics) {
    return `
      <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs mt-4 animate-fade-in">
        <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#EBECF0]">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-[#006644]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            <h3 class="text-xs font-bold text-[#172B4D]">${title}</h3>
          </div>
          <span class="text-xs text-[#5E6C84]">Showing totals for <strong class="text-[#172B4D]">${count}</strong> ${countUnit}</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
          ${metrics.map(m => `
            <div class="p-3 bg-[#FAFBFC] rounded-lg border border-[#EBECF0]">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">${m.label}</span>
              <div class="flex items-baseline justify-between">
                <span class="text-lg font-extrabold ${m.color || 'text-[#172B4D]'}">${m.value}</span>
                ${m.badge ? `<span class="text-[10px] ${m.badgeColor || 'text-[#0284C7] bg-[#F0F9FF]'} font-semibold px-1.5 py-0.5 rounded">${m.badge}</span>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderBadge(text, type = 'default') {
    const map = {
      default: 'bg-[#F4F5F7] text-[#172B4D] border-[#DFE1E6]',
      success: 'bg-[#E3FCEF] text-[#006644] border-[#ABF5D1]',
      warning: 'bg-[#FFF0B3] text-[#8F4D00] border-[#FFE380]',
      danger: 'bg-[#FFEBE6] text-[#BF2600] border-[#FFBDAD]',
      info: 'bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]'
    };
    const cls = map[type] || map.default;
    return `<span class="font-medium px-2 py-0.5 rounded text-[11px] border ${cls}">${text}</span>`;
  },

  renderActionButtons(opts = {}) {
    const { onView, onEdit, onDownload, onDelete } = opts;
    return `
      <div class="flex items-center gap-1">
        ${onView ? `<button onclick="${onView}" class="p-1 rounded text-[#0284C7] hover:bg-[#F0F9FF]" title="View Details"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg></button>` : ''}
        ${onEdit ? `<button onclick="${onEdit}" class="p-1 rounded text-[#006644] hover:bg-[#E3FCEF]" title="Edit"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>` : ''}
        ${onDownload ? `<button onclick="${onDownload}" class="p-1 rounded text-[#0284C7] hover:bg-[#F0F9FF]" title="Download Document"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg></button>` : ''}
        ${onDelete ? `<button onclick="${onDelete}" class="p-1 rounded text-[#FF5150] hover:bg-[#FEF2F2]" title="Delete"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>` : ''}
      </div>
    `;
  }
};

// =========================================================================
// PRE-PROCESSING MODULE (STANDARDIZED WITH PURCHASE BASE DESIGN SYSTEM)
// =========================================================================
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

    if (typeof window !== 'undefined' && window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  },

  updateHeaderAction(subPage) {
    const actionContainer = document.getElementById('section-action-btn-container');
    if (actionContainer) actionContainer.innerHTML = '';
  },

  // ============================================
  // 1. FLOOR OVERVIEW & COMPREHENSIVE TELEMETRY DASHBOARD
  // ============================================
  renderFloorOverview(container) {
    let fPlant = '';
    let fPeriod = 'Today';
    let fSpecies = '';

    const updateDashboard = () => {
      // Calculate dynamic telemetry
      const multiplier = fPeriod === 'This Week' ? 6.2 : fPeriod === 'Month to Date' ? 24.5 : 1.0;
      const baseIntake = 13030.0 * multiplier;
      const baseDeheaded = 8722.5 * multiplier;
      const baseGraded = 8695.0 * multiplier;
      const baseVa = 5840.0 * multiplier;
      const baseHonTransfer = 4200.0 * multiplier;
      const baseChemValue = (1.42 * (fPeriod === 'Today' ? 1.0 : 1.15)).toFixed(2);
      const yieldPct = ((baseDeheaded / baseIntake) * 100).toFixed(1);

      const kpiContainer = document.getElementById('preproc-kpi-grid');
      if (kpiContainer) {
        kpiContainer.innerHTML = `
          <!-- 1. RM Intake -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">Today RM Intake</span>
              <span class="text-[10px] text-[#02a8b5] font-bold bg-[#F0FAFC] px-1.5 py-0.5 rounded">3 Plants</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0F172A]">${baseIntake.toLocaleString('en-IN', { maximumFractionDigits: 1 })} <span class="text-xs font-semibold text-[#64748B]">KG</span></span>
              <span class="text-[11px] font-bold text-[#006644] flex items-center gap-0.5">↑ 12.4%</span>
            </div>
            <span class="text-[11px] text-[#64748B] mt-1 block">Live intake across VSP, KKD & PSP docks</span>
          </div>

          <!-- 2. Deheaded Weight -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">Deheaded Recovery</span>
              <span class="text-[10px] text-[#006644] font-bold bg-[#E3FCEF] px-1.5 py-0.5 rounded">${yieldPct}% Yield</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#006644]">${baseDeheaded.toLocaleString('en-IN', { maximumFractionDigits: 1 })} <span class="text-xs font-semibold text-[#64748B]">KG</span></span>
              <span class="text-[11px] font-bold text-[#006644]">Benchmark ≥ 65%</span>
            </div>
            <span class="text-[11px] text-[#64748B] mt-1 block">33.1% head waste recovered for byproduct meal</span>
          </div>

          <!-- 3. Graded Output -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">Graded HLSO</span>
              <span class="text-[10px] text-[#0284C7] font-bold bg-[#F0F9FF] px-1.5 py-0.5 rounded">16/20 Dominant</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0284C7]">${baseGraded.toLocaleString('en-IN', { maximumFractionDigits: 1 })} <span class="text-xs font-semibold text-[#64748B]">KG</span></span>
              <span class="text-[11px] font-bold text-[#0284C7]">99.7% Sized</span>
            </div>
            <span class="text-[11px] text-[#64748B] mt-1 block">Roller grader lines active in Unit-1 and Unit-2</span>
          </div>

          <!-- 4. Value Addition -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">Value Addition Output</span>
              <span class="text-[10px] text-[#8F4D00] font-bold bg-[#FFF0B3] px-1.5 py-0.5 rounded">Nobashi / EZ</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0F172A]">${baseVa.toLocaleString('en-IN', { maximumFractionDigits: 1 })} <span class="text-xs font-semibold text-[#64748B]">KG</span></span>
              <span class="text-[11px] font-bold text-[#8F4D00]">67.2% Direct</span>
            </div>
            <span class="text-[11px] text-[#64748B] mt-1 block">Skewer, Nobashi, and EZ-peel specialty lines</span>
          </div>

          <!-- 5. HON Qty Transfer -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">HON Transfer After VA</span>
              <span class="text-[10px] text-[#02a8b5] font-bold bg-[#F0FAFC] px-1.5 py-0.5 rounded">To Freezers</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0F172A]">${baseHonTransfer.toLocaleString('en-IN', { maximumFractionDigits: 1 })} <span class="text-xs font-semibold text-[#64748B]">KG</span></span>
              <span class="text-[11px] font-bold text-[#02a8b5]">Dispatched</span>
            </div>
            <span class="text-[11px] text-[#64748B] mt-1 block">Transferred to Contact plate & IQF tunnels</span>
          </div>

          <!-- 6. Chemical Inventory -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">Chemical Inventory</span>
              <span class="text-[10px] text-[#006644] font-bold bg-[#E3FCEF] px-1.5 py-0.5 rounded">Stock Stable</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0F172A]">₹ ${baseChemValue} <span class="text-xs font-semibold text-[#64748B]">Cr</span></span>
              <span class="text-[11px] font-bold text-[#006644]">342.5 KG Today</span>
            </div>
            <span class="text-[11px] text-[#64748B] mt-1 block">30,500 KG bonded & floor chemical balance</span>
          </div>
        `;
      }
    };

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- 1. Header with Title & Action Controls -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-1">
          <div>
            <h1 class="text-xl font-extrabold text-[#172B4D] tracking-tight">Pre-Processing Floor Intelligence & Executive Dashboard</h1>
            <p class="text-xs text-[#5E6C84] mt-0.5 font-medium">Real-time floor summary, recovery telemetry, multi-plant sizing metrics & chemical balances</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.openChemPOModal()">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Create Chemical PO</span>
            </button>
            <button class="px-3.5 py-2 bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.Toast.show('Exporting Pre-Processing Summary Report to Excel...', 'info')">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              <span>Export Report</span>
            </button>
          </div>
        </div>

        <!-- 2. Quick Filter Bar -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-3.5 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-end">
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Plant Location</label>
              <select id="preproc-dash-plant" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded-lg font-semibold text-[#0F172A] focus:outline-none focus:border-[#02a8b5]">
                <option value="">All Processing Units</option>
                <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Date Period</label>
              <select id="preproc-dash-period" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded-lg font-semibold text-[#0F172A] focus:outline-none focus:border-[#02a8b5]">
                <option value="Today" selected>Today (Shift A/B)</option>
                <option value="This Week">This Week (Mon-Sun)</option>
                <option value="Month to Date">Month to Date (October 2026)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Species Filter</label>
              <select id="preproc-dash-species" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded-lg font-semibold text-[#0F172A] focus:outline-none focus:border-[#02a8b5]">
                <option value="">All Raw Materials</option>
                <option value="LITOPENAEUS VANNAMEI">LITOPENAEUS VANNAMEI</option>
                <option value="PENAEUS MONODON">PENAEUS MONODON</option>
                <option value="COD">COD</option>
              </select>
            </div>
            <div class="flex items-center gap-2">
              <button id="preproc-dash-apply-btn" class="flex-1 py-1.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter</span>
              </button>
              <button id="preproc-dash-reset-btn" class="px-3.5 py-1.5 bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer">
                ↺
              </button>
            </div>
          </div>
        </div>

        <!-- 3. 6 KPI Metric Cards Grid -->
        <div id="preproc-kpi-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3"></div>

        <!-- 4. Data Visualizations Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Chart 1: Volume & Throughput Trend -->
          <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#02a8b5]"></span>
                <h3 class="text-xs font-bold text-[#172B4D]">Weekly Pre-Processing Throughput Trend (KG)</h3>
              </div>
              <span class="text-[11px] font-bold text-[#006644] bg-[#E3FCEF] px-2 py-0.5 rounded">Target: 12,000 KG / Day</span>
            </div>
            <div class="h-60 relative">
              <canvas id="productionChart" class="w-full h-full"></canvas>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-[#F1F5F9] text-[11px] text-[#64748B]">
              <span>Highest Peak: <strong>14,200 KG (Fri)</strong></span>
              <span>Average Daily Run: <strong>12,575 KG</strong></span>
            </div>
          </div>

          <!-- Chart 2: Yield Recovery by Size Grade -->
          <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#0284C7]"></span>
                <h3 class="text-xs font-bold text-[#172B4D]">Recovery Yield Breakdown by Grade (%)</h3>
              </div>
              <span class="text-[11px] font-bold text-[#006644] bg-[#E3FCEF] px-2 py-0.5 rounded">Benchmark ≥ 65%</span>
            </div>
            <div class="h-60 relative">
              <canvas id="yieldChart" class="w-full h-full"></canvas>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-[#F1F5F9] text-[11px] text-[#64748B]">
              <span>Optimal Yield: <strong>16/20 @ 68.5%</strong></span>
              <span>Weighted Floor Avg: <strong>66.9%</strong></span>
            </div>
          </div>
        </div>

        <!-- 5. Secondary Data Cards: Stage Flow Telemetry & Chemical Inventory Matrix -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Flow Telemetry Card -->
          <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <h3 class="text-xs font-bold text-[#172B4D]">Floor Flow & Process Stage Conversion</h3>
              <span class="text-[11px] text-[#5E6C84]">Shift A Telemetry</span>
            </div>
            <div class="space-y-3">
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-[#0F172A]">1. Raw Intake Received</span>
                  <span class="text-[#02a8b5]">13,030 KG (100%)</span>
                </div>
                <div class="w-full bg-[#F1F5F9] rounded-full h-2">
                  <div class="bg-[#02a8b5] h-2 rounded-full" style="width: 100%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-[#0F172A]">2. Deheaded Meat Output</span>
                  <span class="text-[#006644]">8,722.5 KG (66.9% Recovery)</span>
                </div>
                <div class="w-full bg-[#F1F5F9] rounded-full h-2">
                  <div class="bg-[#006644] h-2 rounded-full" style="width: 66.9%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-[#0F172A]">3. Roller Graded & Sized</span>
                  <span class="text-[#0284C7]">8,695 KG (99.7% Sizing Accuracy)</span>
                </div>
                <div class="w-full bg-[#F1F5F9] rounded-full h-2">
                  <div class="bg-[#0284C7] h-2 rounded-full" style="width: 66.7%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-[#0F172A]">4. Value Addition Allocated</span>
                  <span class="text-[#8F4D00]">5,840 KG (67.2% Direct VA)</span>
                </div>
                <div class="w-full bg-[#F1F5F9] rounded-full h-2">
                  <div class="bg-[#8F4D00] h-2 rounded-full" style="width: 44.8%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-[#0F172A]">5. HON Freezer Transfer Dispatched</span>
                  <span class="text-[#02a8b5]">4,200 KG (Packed & Dispatched)</span>
                </div>
                <div class="w-full bg-[#F1F5F9] rounded-full h-2">
                  <div class="bg-[#02a8b5] h-2 rounded-full" style="width: 32.2%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Chemical Bath Matrix Card -->
          <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <h3 class="text-xs font-bold text-[#172B4D]">Active Chemical Bath Dosage & Stock Balance</h3>
              <a href="#/preprocessing/chemical-screens/chemical-pos" class="text-[11px] font-bold text-[#02a8b5] hover:underline">View Chemical Pos →</a>
            </div>
            <div class="space-y-3">
              <div class="p-2.5 bg-[#FAFBFC] rounded-lg border border-[#EBECF0] flex items-center justify-between">
                <div>
                  <span class="text-xs font-bold text-[#0F172A]">ALTESA NEO S100 (NP)</span>
                  <span class="text-[11px] text-[#64748B] block">Non-phosphate treatment bath · Unit-1 (VSP)</span>
                </div>
                <div class="text-right">
                  <span class="text-xs font-extrabold text-[#0F172A]">1,250 KG Stock</span>
                  <span class="text-[11px] text-[#006644] font-semibold block">Dosed: 85 KG</span>
                </div>
              </div>
              <div class="p-2.5 bg-[#FAFBFC] rounded-lg border border-[#EBECF0] flex items-center justify-between">
                <div>
                  <span class="text-xs font-bold text-[#0F172A]">CARNAL 659 S ADVANCED (STPP)</span>
                  <span class="text-[11px] text-[#64748B] block">Standard moisture retention · Unit-5 (JPT)</span>
                </div>
                <div class="text-right">
                  <span class="text-xs font-extrabold text-[#0F172A]">920 KG Stock</span>
                  <span class="text-[11px] text-[#006644] font-semibold block">Dosed: 120 KG</span>
                </div>
              </div>
              <div class="p-2.5 bg-[#FAFBFC] rounded-lg border border-[#EBECF0] flex items-center justify-between">
                <div>
                  <span class="text-xs font-bold text-[#0F172A]">CARFOSEL B 940 (STPP)</span>
                  <span class="text-[11px] text-[#64748B] block">Export grade soaking line · Unit-2 (KKD)</span>
                </div>
                <div class="text-right">
                  <span class="text-xs font-extrabold text-[#0F172A]">1,580 KG Stock</span>
                  <span class="text-[11px] text-[#006644] font-semibold block">Dosed: 95 KG</span>
                </div>
              </div>
              <div class="p-2.5 bg-[#FAFBFC] rounded-lg border border-[#EBECF0] flex items-center justify-between">
                <div>
                  <span class="text-xs font-bold text-[#0F172A]">BEKAPLUS FS (BLEND)</span>
                  <span class="text-[11px] text-[#64748B] block">Specialty glaze preservation · Temp Controlled</span>
                </div>
                <div class="text-right">
                  <span class="text-xs font-extrabold text-[#0F172A]">640 KG Stock</span>
                  <span class="text-[11px] text-[#006644] font-semibold block">Dosed: 42.5 KG</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 6. Active Plant-Wise Pre-Processing Floor Telemetry Table -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#EBECF0]">
            <div>
              <h3 class="text-xs font-bold text-[#172B4D]">Plant-Wise Floor Operations & Intake Batch Telemetry</h3>
              <p class="text-[11px] text-[#5E6C84]">Active lines across Visakhapatnam, Kakinada, and Pasarlapudi facilities</p>
            </div>
            <span class="text-xs font-bold text-[#02a8b5] bg-[#F0FAFC] px-2.5 py-1 rounded-lg border border-[#02a8b5]/20">3 Plants Active</span>
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th class="px-4 py-3">Plant Facility</th>
                  <th class="px-4 py-3">Raw Intake (KG)</th>
                  <th class="px-4 py-3">Deheaded Output (KG)</th>
                  <th class="px-4 py-3">Recovery Yield (%)</th>
                  <th class="px-4 py-3">Graded Output (KG)</th>
                  <th class="px-4 py-3">Value Addition (KG)</th>
                  <th class="px-4 py-3">Chemical Bath</th>
                  <th class="px-4 py-3">Line Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9]">
                <tr class="hover:bg-[#F8FAFC] transition-colors">
                  <td class="px-4 py-3 font-bold text-[#0F172A]">DFL UNIT-1 (VSP)</td>
                  <td class="px-4 py-3 font-semibold text-[#0F172A]">4,800.0</td>
                  <td class="px-4 py-3 font-semibold text-[#006644]">3,216.0</td>
                  <td class="px-4 py-3 font-bold text-[#006644]">67.0%</td>
                  <td class="px-4 py-3 text-[#0F172A]">3,205.0</td>
                  <td class="px-4 py-3 text-[#0F172A]">2,150.0</td>
                  <td class="px-4 py-3 text-[#64748B]">ALTESA NEO S100</td>
                  <td class="px-4 py-3"><span class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#E3FCEF] text-[#006644]">Running</span></td>
                </tr>
                <tr class="hover:bg-[#F8FAFC] transition-colors">
                  <td class="px-4 py-3 font-bold text-[#0F172A]">DFL UNIT-2 (KKD)</td>
                  <td class="px-4 py-3 font-semibold text-[#0F172A]">5,230.0</td>
                  <td class="px-4 py-3 font-semibold text-[#006644]">3,498.9</td>
                  <td class="px-4 py-3 font-bold text-[#006644]">66.9%</td>
                  <td class="px-4 py-3 text-[#0F172A]">3,490.0</td>
                  <td class="px-4 py-3 text-[#0F172A]">2,340.0</td>
                  <td class="px-4 py-3 text-[#64748B]">CARFOSEL B 940</td>
                  <td class="px-4 py-3"><span class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#E3FCEF] text-[#006644]">Running</span></td>
                </tr>
                <tr class="hover:bg-[#F8FAFC] transition-colors">
                  <td class="px-4 py-3 font-bold text-[#0F172A]">DFL UNIT-3 (PSP)</td>
                  <td class="px-4 py-3 font-semibold text-[#0F172A]">3,000.0</td>
                  <td class="px-4 py-3 font-semibold text-[#006644]">2,007.6</td>
                  <td class="px-4 py-3 font-bold text-[#006644]">66.9%</td>
                  <td class="px-4 py-3 text-[#0F172A]">2,000.0</td>
                  <td class="px-4 py-3 text-[#0F172A]">1,350.0</td>
                  <td class="px-4 py-3 text-[#64748B]">CARNAL 659 S</td>
                  <td class="px-4 py-3"><span class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#F0F9FF] text-[#0284C7]">Completed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('preproc-dash-apply-btn')?.addEventListener('click', () => {
      fPlant = document.getElementById('preproc-dash-plant')?.value || '';
      fPeriod = document.getElementById('preproc-dash-period')?.value || 'Today';
      fSpecies = document.getElementById('preproc-dash-species')?.value || '';
      updateDashboard();
      this.drawDashboardCharts();
      if (window.Toast) window.Toast.show(`Telemetry filtered for ${fPeriod} (${fPlant || 'All Plants'})`, 'info');
    });

    document.getElementById('preproc-dash-reset-btn')?.addEventListener('click', () => {
      const p = document.getElementById('preproc-dash-plant');
      const pr = document.getElementById('preproc-dash-period');
      const s = document.getElementById('preproc-dash-species');
      if (p) p.value = '';
      if (pr) pr.value = 'Today';
      if (s) s.value = '';
      fPlant = ''; fPeriod = 'Today'; fSpecies = '';
      updateDashboard();
      this.drawDashboardCharts();
      if (window.Toast) window.Toast.show('Dashboard filters reset.', 'info');
    });

    updateDashboard();

    setTimeout(() => {
      this.drawDashboardCharts();
    }, 60);
  },

  drawDashboardCharts() {
    const c1 = document.getElementById('productionChart');
    if (c1 && c1.parentElement) {
      const dpr = window.devicePixelRatio || 1;
      const rect = c1.parentElement.getBoundingClientRect();
      c1.width = (rect.width || 400) * dpr;
      c1.height = (rect.height || 240) * dpr;
      const ctx = c1.getContext('2d');
      ctx.scale(dpr, dpr);
      const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const data = [11200, 12400, 10800, 13030, 14200, 12800, 13600];
      const maxVal = 16000;
      const padLeft = 45, padRight = 20, padTop = 20, padBottom = 25;
      const chartW = rect.width - padLeft - padRight;
      const chartH = rect.height - padTop - padBottom;
      
      // Grid lines
      ctx.strokeStyle = '#F1F5F9';
      ctx.lineWidth = 1;
      ctx.fillStyle = '#64748B';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'right';
      for (let i = 0; i <= 4; i++) {
        const yVal = Math.round((maxVal / 4) * i);
        const y = padTop + chartH - (i / 4) * chartH;
        ctx.beginPath();
        ctx.moveTo(padLeft, y);
        ctx.lineTo(rect.width - padRight, y);
        ctx.stroke();
        ctx.fillText(yVal.toLocaleString(), padLeft - 6, y + 3);
      }

      // Benchmark Target line (12,000)
      const targetY = padTop + chartH - (12000 / maxVal) * chartH;
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 1.2;
      ctx.moveTo(padLeft, targetY);
      ctx.lineTo(rect.width - padRight, targetY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Fill area under curve
      const grad = ctx.createLinearGradient(0, padTop, 0, padTop + chartH);
      grad.addColorStop(0, 'rgba(2, 168, 181, 0.25)');
      grad.addColorStop(1, 'rgba(2, 168, 181, 0.00)');
      
      ctx.beginPath();
      data.forEach((val, idx) => {
        const x = padLeft + (idx / (data.length - 1)) * chartW;
        const y = padTop + chartH - (val / maxVal) * chartH;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.lineTo(padLeft + chartW, padTop + chartH);
      ctx.lineTo(padLeft, padTop + chartH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Line stroke
      ctx.beginPath();
      ctx.strokeStyle = '#02a8b5';
      ctx.lineWidth = 2.5;
      data.forEach((val, idx) => {
        const x = padLeft + (idx / (data.length - 1)) * chartW;
        const y = padTop + chartH - (val / maxVal) * chartH;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Data dots
      data.forEach((val, idx) => {
        const x = padLeft + (idx / (data.length - 1)) * chartW;
        const y = padTop + chartH - (val / maxVal) * chartH;
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#02a8b5';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Labels
      ctx.fillStyle = '#475569';
      ctx.textAlign = 'center';
      labels.forEach((lbl, idx) => {
        const x = padLeft + (idx / (labels.length - 1)) * chartW;
        ctx.fillText(lbl, x, rect.height - 8);
      });
    }

    const c2 = document.getElementById('yieldChart');
    if (c2 && c2.parentElement) {
      const dpr = window.devicePixelRatio || 1;
      const rect = c2.parentElement.getBoundingClientRect();
      c2.width = (rect.width || 400) * dpr;
      c2.height = (rect.height || 240) * dpr;
      const ctx = c2.getContext('2d');
      ctx.scale(dpr, dpr);
      const grades = ['16/20', '21/25', '26/30', '31/40', '41/50'];
      const yields = [68.5, 67.2, 66.0, 64.8, 63.5];
      const padLeft = 45, padRight = 20, padTop = 20, padBottom = 25;
      const chartW = rect.width - padLeft - padRight;
      const chartH = rect.height - padTop - padBottom;
      const barW = chartW / (grades.length * 2);

      // Y-axis
      ctx.fillStyle = '#64748B';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'right';
      for (let i = 0; i <= 4; i++) {
        const yVal = 50 + i * 5;
        const y = padTop + chartH - (i / 4) * chartH;
        ctx.beginPath();
        ctx.strokeStyle = '#F1F5F9';
        ctx.lineWidth = 1;
        ctx.moveTo(padLeft, y);
        ctx.lineTo(rect.width - padRight, y);
        ctx.stroke();
        ctx.fillText(yVal + '%', padLeft - 6, y + 3);
      }

      // Benchmark 65% line
      const benchY = padTop + chartH - ((65 - 50) / 20) * chartH;
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#056A38';
      ctx.lineWidth = 1.2;
      ctx.moveTo(padLeft, benchY);
      ctx.lineTo(rect.width - padRight, benchY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw bars
      grades.forEach((g, idx) => {
        const x = padLeft + idx * (barW * 2) + barW / 2;
        const h = ((yields[idx] - 50) / 20) * chartH;
        const y = padTop + chartH - h;
        
        ctx.fillStyle = idx === 0 ? '#02a8b5' : idx === 1 ? '#008f9a' : '#38bdf8';
        ctx.beginPath();
        ctx.roundRect(x, y, barW, h, [4, 4, 0, 0]);
        ctx.fill();

        // Value text
        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 9.5px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(yields[idx] + '%', x + barW / 2, y - 4);

        // Grade label
        ctx.fillStyle = '#475569';
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText(g, x + barW / 2, rect.height - 8);
      });
    }
  },

  // ============================================
  // 2. CHEMICAL INVENTORY & USAGE (FIXES IMAGE 1)
  // ============================================
  renderChemicalPos(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader(
          'Chemical Purchase Orders (PO Register)',
          `<button id="btn-add-chem-po" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.openChemPOModal()">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Create Chemical PO</span>
          </button>`
        )}

        ${UIBase.renderFilterCard({
          idPrefix: 'chem-po-filter',
          title: 'Search & Filters',
          fields: [
            {
              label: 'SUPPLIER NAME',
              html: `
                <select id="chem-po-supplier-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="ALL">All Suppliers (Select)</option>
                  <option value="KPL INTERNATIONAL LTD">KPL INTERNATIONAL LTD</option>
                  <option value="ADWIK IMPEX">ADWIK IMPEX</option>
                  <option value="PRAYON PHOSPHATES">PRAYON PHOSPHATES</option>
                  <option value="ICL FOOD SPECIALTIES">ICL FOOD SPECIALTIES</option>
                </select>
              `
            },
            {
              label: 'CHEMICAL SPECIFICATION',
              html: `
                <select id="chem-po-chem-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="ALL">All Chemicals (Select)</option>
                  <option value="ALTESA NEO S100 (NP)">ALTESA NEO S100 (NP)</option>
                  <option value="CARNAL 659 S ADVANCED (STPP)">CARNAL 659 S ADVANCED (STPP)</option>
                  <option value="CARFOSEL B 940 (STPP)">CARFOSEL B 940 (STPP)</option>
                  <option value="BEKAPLUS FS (BLEND)">BEKAPLUS FS (BLEND)</option>
                </select>
              `
            },
            {
              label: 'PORT OF ARRIVAL',
              html: `
                <select id="chem-po-port-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="ALL">All Ports (Select)</option>
                  <option value="INKAK1 - KAKINADA">INKAK1 - KAKINADA</option>
                  <option value="INPRT - PARADIP GARH">INPRT - PARADIP GARH</option>
                  <option value="INVTZ1 - VISAKHAPATNAM">INVTZ1 - VISAKHAPATNAM</option>
                </select>
              `
            },
            {
              label: 'FINANCIAL YEAR',
              html: `
                <select id="chem-po-year-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="2026-27">FY 2026-27</option>
                  <option value="2025-26">FY 2025-26</option>
                </select>
              `
            }
          ]
        })}

        <div id="chem-po-table-container"></div>
        <div id="chem-po-totals-container" class="mt-4"></div>
      </div>
    `;

    const renderTotals = (list) => {
      const count = list.length;
      const totalBags = list.reduce((s, x) => s + (parseInt(x.qtyBags) || 0), 0);
      const totalKgs = list.reduce((s, x) => s + (parseFloat(x.qtyKgs) || 0), 0);
      const totalAmt = list.reduce((s, x) => s + (parseFloat(x.totalAmount) || 0), 0);

      const el = document.getElementById('chem-po-totals-container');
      if (el) {
        el.innerHTML = UIBase.renderTotals(
          'Chemical Purchase Orders Metrics Abstract',
          count,
          count === 1 ? 'PO Record' : 'PO Records',
          [
            { label: 'TOTAL POs', value: `${count} Orders`, badge: 'Active Filings', badgeColor: 'text-[#0284C7] bg-[#F0F9FF]' },
            { label: 'COMMITTED BAGS', value: `${totalBags.toLocaleString()} Bags`, badge: 'Import Volume', badgeColor: 'text-[#006644] bg-[#E3FCEF]' },
            { label: 'TOTAL WEIGHT', value: `${totalKgs.toLocaleString()} KG`, badge: 'Gross Mass', badgeColor: 'text-[#0284C7] bg-[#F0F9FF]' },
            { label: 'TOTAL COMMITMENT', value: `₹ ${Math.round(totalAmt).toLocaleString()}`, badge: 'INR Valuation', badgeColor: 'text-[#006644] bg-[#E3FCEF]', color: 'text-[#006644]' }
          ]
        );
      }
    };

    const table = new DataTable({
      containerId: 'chem-po-table-container',
      data: this.chemicalPosList,
      keyField: 'id',
      tableTitle: 'Chemical Purchase Orders Register',
      searchable: false,
      hideTopFilterBar: true,
      showCopy: false,
      onDataChange: (d) => renderTotals(d),
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx !== undefined ? idx + 1 : 1}</span>` },
        { field: 'supplierName', header: 'Supplier Name', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'poNo', header: 'PO Number', render: (v) => `<span class="font-mono font-bold text-[#006C7A] bg-[#E6FCFF] px-2 py-0.5 rounded text-[11px]">${v}</span>` },
        { field: 'poDate', header: 'PO Date', render: (v) => `<span class="text-[#172B4D] font-medium">${v}</span>` },
        { field: 'chemicals', header: 'Chemicals', render: (v) => `<span class="font-semibold text-[#172B4D]">${v}</span>` },
        { field: 'portName', header: 'Port Name', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'modeOfImport', header: 'Mode', render: (v) => `<span class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#F4F5F7] border border-[#DFE1E6] text-[#172B4D]">${v}</span>` },
        { field: 'qtyBags', header: 'Qty (Bags)', render: (v) => `<span class="font-bold text-[#172B4D]">${(v || 0).toLocaleString()}</span>` },
        { field: 'qtyKgs', header: 'Qty (KGs)', render: (v) => `<span class="font-extrabold text-[#006644]">${(v || 0).toLocaleString()} KG</span>` },
        { field: 'totalAmount', header: 'Total (INR)', render: (v) => `<span class="font-bold text-[#172B4D]">₹ ${(v || 0).toLocaleString()}</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, v === 'Approved' || v === 'Received' ? 'success' : 'warning') },
        {
          field: 'actions',
          header: 'Actions',
          render: (v, r) => UIBase.renderActionButtons({
            onView: `window.PreprocessingView.toastInfo('Viewing PO ${r.poNo}')`,
            onDownload: `window.PreprocessingView.toastInfo('Exporting PDF for ${r.poNo}')`,
            onDelete: `if(confirm('Delete chemical PO ${r.poNo}?')) { window.PreprocessingView.chemicalPosList = window.PreprocessingView.chemicalPosList.filter(x => x.id !== '${r.id}'); window.PreprocessingView.renderChemicalPos(document.getElementById('preproc-subpage-content')); Toast.show('PO removed', 'error'); }`
          })
        }
      ]
    });

    renderTotals(this.chemicalPosList);

    UIBase.bindFilter('chem-po-filter', () => {
      const sVal = document.getElementById('chem-po-supplier-select')?.value || 'ALL';
      const cVal = document.getElementById('chem-po-chem-select')?.value || 'ALL';
      const pVal = document.getElementById('chem-po-port-select')?.value || 'ALL';
      let filtered = this.chemicalPosList;
      if (sVal !== 'ALL') filtered = filtered.filter(x => x.supplierName === sVal);
      if (cVal !== 'ALL') filtered = filtered.filter(x => x.chemicals === cVal);
      if (pVal !== 'ALL') filtered = filtered.filter(x => x.portName === pVal);
      table.setData(filtered);
      renderTotals(filtered);
      Toast.show(`Filtered ${filtered.length} Chemical POs`, 'info');
    }, () => {
      if (document.getElementById('chem-po-supplier-select')) document.getElementById('chem-po-supplier-select').value = 'ALL';
      if (document.getElementById('chem-po-chem-select')) document.getElementById('chem-po-chem-select').value = 'ALL';
      if (document.getElementById('chem-po-port-select')) document.getElementById('chem-po-port-select').value = 'ALL';
      table.setData(this.chemicalPosList);
      renderTotals(this.chemicalPosList);
      Toast.show('Filters reset', 'info');
    });
  },

  renderReceivedChemicals(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader(
          'Received Chemicals (Dock Intake Register)',
          `<button class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.openChemOrderModal()">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Record Dock Intake</span>
          </button>`
        )}

        ${UIBase.renderFilterCard({
          idPrefix: 'chem-rc-filter',
          title: 'Search & Filters',
          fields: [
            {
              label: 'CHEMICAL NAME',
              html: `
                <select id="chem-rc-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="ALL">All Chemicals (Select)</option>
                  <option value="CARFOSEL B 940 (STPP)">CARFOSEL B 940 (STPP)</option>
                  <option value="ALTESA BT2 (NP)">ALTESA BT2 (NP)</option>
                  <option value="CARNAL 659 S ADVANCED (STPP)">CARNAL 659 S ADVANCED (STPP)</option>
                  <option value="BEKAPLUS FS (BLEND)">BEKAPLUS FS (BLEND)</option>
                </select>
              `
            },
            {
              label: 'CLEARANCE STATUS',
              html: `
                <select id="chem-rc-status-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="ALL">All Statuses (Select)</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending Clearance</option>
                </select>
              `
            }
          ]
        })}

        <div id="chem-rc-table-container"></div>
        <div id="chem-rc-totals-container" class="mt-4"></div>
      </div>
    `;

    const renderTotals = (list) => {
      const count = list.length;
      const totalBags = list.reduce((s, x) => s + (parseInt(x.receivedBags) || 0), 0);
      const totalKgs = list.reduce((s, x) => s + (parseFloat(x.receivedQty) || 0), 0);
      const balanceBags = list.reduce((s, x) => s + (parseInt(x.balanceBags) || 0), 0);

      const el = document.getElementById('chem-rc-totals-container');
      if (el) {
        el.innerHTML = UIBase.renderTotals(
          'Dock Intake Volume Abstract',
          count,
          count === 1 ? 'Shipment' : 'Shipments',
          [
            { label: 'TOTAL INTAKES', value: `${count} Consignments`, badge: 'Port Cleared', badgeColor: 'text-[#0284C7] bg-[#F0F9FF]' },
            { label: 'RECEIVED BAGS', value: `${totalBags.toLocaleString()} Bags`, badge: 'Gross Bags', badgeColor: 'text-[#006644] bg-[#E3FCEF]' },
            { label: 'RECEIVED MASS', value: `${totalKgs.toLocaleString()} KG`, badge: 'Verified Weight', badgeColor: 'text-[#0284C7] bg-[#F0F9FF]' },
            { label: 'BALANCE PENDING', value: `${balanceBags.toLocaleString()} Bags`, badge: 'Bonded Warehouse', badgeColor: 'text-[#8F4D00] bg-[#FFF0B3]' }
          ]
        );
      }
    };

    const table = new DataTable({
      containerId: 'chem-rc-table-container',
      data: this.receivedChemicalsList,
      keyField: 'id',
      tableTitle: 'Received Chemicals Intake Ledger',
      searchable: false,
      hideTopFilterBar: true,
      showCopy: false,
      onDataChange: (d) => renderTotals(d),
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx !== undefined ? idx + 1 : 1}</span>` },
        { field: 'poNo', header: 'PoNo', render: (v) => `<span class="font-mono font-bold text-[#006C7A]">${v}</span>` },
        { field: 'chemical', header: 'Chemical', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'blNo', header: 'BL No', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'containerNo', header: 'Container No', render: (v) => `<span class="font-mono font-semibold text-[#172B4D]">${v}</span>` },
        { field: 'receivedBags', header: 'Received Bags', render: (v) => `<span class="font-bold text-[#172B4D]">${v.toLocaleString()}</span>` },
        { field: 'receivedQty', header: 'Received Qty', render: (v) => `<span class="font-extrabold text-[#006644]">${v.toLocaleString()} KG</span>` },
        { field: 'boeNo', header: 'Bill of Entry No', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'clearedDate', header: 'Cleared Date', render: (v) => `<span class="text-[#172B4D]">${v}</span>` },
        { field: 'balanceBags', header: 'Balance Bags', render: (v) => `<span class="font-bold text-[#BF2600]">${v}</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, v === 'Completed' ? 'success' : 'warning') },
        {
          field: 'actions',
          header: 'Actions',
          render: (v, r) => UIBase.renderActionButtons({
            onView: `window.PreprocessingView.toastInfo('Viewing Intake ${r.poNo}')`,
            onDownload: `window.PreprocessingView.toastInfo('Exporting Intake ${r.poNo}')`,
            onDelete: `if(confirm('Delete intake entry?')) { window.PreprocessingView.receivedChemicalsList = window.PreprocessingView.receivedChemicalsList.filter(x => x.id !== '${r.id}'); window.PreprocessingView.renderReceivedChemicals(document.getElementById('preproc-subpage-content')); Toast.show('Intake removed', 'error'); }`
          })
        }
      ]
    });

    renderTotals(this.receivedChemicalsList);

    UIBase.bindFilter('chem-rc-filter', () => {
      const cVal = document.getElementById('chem-rc-select')?.value || 'ALL';
      const sVal = document.getElementById('chem-rc-status-select')?.value || 'ALL';
      let filtered = this.receivedChemicalsList;
      if (cVal !== 'ALL') filtered = filtered.filter(x => x.chemical === cVal);
      if (sVal !== 'ALL') filtered = filtered.filter(x => x.status === sVal);
      table.setData(filtered);
      renderTotals(filtered);
    }, () => {
      if (document.getElementById('chem-rc-select')) document.getElementById('chem-rc-select').value = 'ALL';
      if (document.getElementById('chem-rc-status-select')) document.getElementById('chem-rc-status-select').value = 'ALL';
      table.setData(this.receivedChemicalsList);
      renderTotals(this.receivedChemicalsList);
    });
  },

  renderChemicalsConsumption(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader(
          'Chemicals Daily Floor Consumption',
          `<button class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.openChemConsumptionModal()">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Log Daily Consumption</span>
          </button>`
        )}

        ${UIBase.renderFilterCard({
          idPrefix: 'chem-cons-filter',
          title: 'Search & Filters',
          fields: [
            {
              label: 'PRODUCTION PLANT',
              html: `
                <select id="chem-cons-plant-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="ALL">All Plants (Select)</option>
                  <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                  <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                  <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                </select>
              `
            },
            {
              label: 'CHEMICAL NAME',
              html: `
                <select id="chem-cons-chem-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="ALL">All Chemicals (Select)</option>
                  <option value="CARNAL 659 S ADVANCED (STPP)">CARNAL 659 S ADVANCED (STPP)</option>
                  <option value="ALTESA NEO S100 (NP)">ALTESA NEO S100 (NP)</option>
                  <option value="CARFOSEL B 940 (STPP)">CARFOSEL B 940 (STPP)</option>
                </select>
              `
            }
          ]
        })}

        <div id="chem-cons-table-container"></div>
        <div id="chem-cons-totals-container" class="mt-4"></div>
      </div>
    `;

    const renderTotals = (list) => {
      const count = list.length;
      const consumedBags = list.reduce((s, x) => s + (parseInt(x.consumedBags) || 0), 0);
      const consumedKgs = list.reduce((s, x) => s + (parseFloat(x.consumedKgs) || 0), 0);
      const closingKgs = list.reduce((s, x) => s + (parseFloat(x.closingKgs) || 0), 0);

      const el = document.getElementById('chem-cons-totals-container');
      if (el) {
        el.innerHTML = UIBase.renderTotals(
          'Daily Floor Chemical Usage Summary',
          count,
          count === 1 ? 'Batch Log' : 'Batch Logs',
          [
            { label: 'TOTAL CONSUMPTION', value: `${consumedKgs.toLocaleString()} KG`, badge: 'Floor Usage', badgeColor: 'text-[#006644] bg-[#E3FCEF]', color: 'text-[#006644]' },
            { label: 'CONSUMED BAGS', value: `${consumedBags.toLocaleString()} Bags`, badge: 'Units Used', badgeColor: 'text-[#0284C7] bg-[#F0F9FF]' },
            { label: 'CLOSING FLOOR STOCK', value: `${closingKgs.toLocaleString()} KG`, badge: 'Plant Safe Level', badgeColor: 'text-[#0284C7] bg-[#F0F9FF]' },
            { label: 'LOGGED ENTRIES', value: `${count} Batches`, badge: 'Shift Audited', badgeColor: 'text-[#006644] bg-[#E3FCEF]' }
          ]
        );
      }
    };

    const table = new DataTable({
      containerId: 'chem-cons-table-container',
      data: this.chemicalsConsumptionList,
      keyField: 'id',
      tableTitle: 'Floor Chemical Consumption Ledger',
      searchable: false,
      hideTopFilterBar: true,
      showCopy: false,
      onDataChange: (d) => renderTotals(d),
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx !== undefined ? idx + 1 : 1}</span>` },
        { field: 'date', header: 'Date', render: (v) => `<span class="text-[#172B4D] font-medium">${v}</span>` },
        { field: 'plant', header: 'Plant', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'chemical', header: 'Chemical', render: (v) => `<span class="font-semibold text-[#172B4D]">${v}</span>` },
        { field: 'openingKgs', header: 'Opening (KG)', render: (v) => `<span class="text-[#5E6C84]">${v.toLocaleString()}</span>` },
        { field: 'consumedBags', header: 'Used (Bags)', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'consumedKgs', header: 'Consumed (KG)', render: (v) => `<span class="font-extrabold text-[#006644]">${v.toLocaleString()} KG</span>` },
        { field: 'closingKgs', header: 'Closing (KG)', render: (v) => `<span class="font-bold text-[#172B4D]">${v.toLocaleString()} KG</span>` },
        { field: 'batchCode', header: 'Batch Code', render: (v) => `<span class="font-mono text-[#006C7A] bg-[#E6FCFF] px-2 py-0.5 rounded text-[11px]">${v}</span>` },
        { field: 'supervisor', header: 'Supervisor', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') },
        {
          field: 'actions',
          header: 'Actions',
          render: (v, r) => UIBase.renderActionButtons({
            onView: `window.PreprocessingView.toastInfo('Viewing consumption for ${r.batchCode}')`,
            onDownload: `window.PreprocessingView.toastInfo('Downloading sheet')`,
            onDelete: `if(confirm('Delete consumption record?')) { window.PreprocessingView.chemicalsConsumptionList = window.PreprocessingView.chemicalsConsumptionList.filter(x => x.id !== '${r.id}'); window.PreprocessingView.renderChemicalsConsumption(document.getElementById('preproc-subpage-content')); Toast.show('Record deleted', 'error'); }`
          })
        }
      ]
    });

    renderTotals(this.chemicalsConsumptionList);

    UIBase.bindFilter('chem-cons-filter', () => {
      const pVal = document.getElementById('chem-cons-plant-select')?.value || 'ALL';
      const cVal = document.getElementById('chem-cons-chem-select')?.value || 'ALL';
      let filtered = this.chemicalsConsumptionList;
      if (pVal !== 'ALL') filtered = filtered.filter(x => x.plant === pVal);
      if (cVal !== 'ALL') filtered = filtered.filter(x => x.chemical === cVal);
      table.setData(filtered);
      renderTotals(filtered);
    }, () => {
      if (document.getElementById('chem-cons-plant-select')) document.getElementById('chem-cons-plant-select').value = 'ALL';
      if (document.getElementById('chem-cons-chem-select')) document.getElementById('chem-cons-chem-select').value = 'ALL';
      table.setData(this.chemicalsConsumptionList);
      renderTotals(this.chemicalsConsumptionList);
    });
  },

  renderChemicalReceivedReport(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Chemicals Received Periodic Summary')}
        <div id="chem-rec-rpt-table-container"></div>
        <div id="chem-rec-rpt-totals-container" class="mt-4"></div>
      </div>
    `;
    const renderTotals = (list) => {
      const count = list.length;
      const totalKgs = list.reduce((s, x) => s + (parseFloat(x.totalKgs) || 0), 0);
      const totalSpend = list.reduce((s, x) => s + (parseFloat(x.totalCostInr) || 0), 0);
      const el = document.getElementById('chem-rec-rpt-totals-container');
      if (el) {
        el.innerHTML = UIBase.renderTotals(
          'Chemicals Intake Summary Statistics',
          count, 'Entries',
          [
            { label: 'TOTAL INTAKE MASS', value: `${totalKgs.toLocaleString()} KG`, badge: 'Gross Weight', badgeColor: 'text-[#006644] bg-[#E3FCEF]', color: 'text-[#006644]' },
            { label: 'TOTAL EXPENDITURE', value: `₹ ${Math.round(totalSpend).toLocaleString()}`, badge: 'Procurement Cost', badgeColor: 'text-[#0284C7] bg-[#F0F9FF]' },
            { label: 'AVERAGE RATE', value: `₹ ${(totalKgs > 0 ? totalSpend / totalKgs : 0).toFixed(2)} / KG`, badge: 'Weighted Rate', badgeColor: 'text-[#006644] bg-[#E3FCEF]' },
            { label: 'REPORT LINES', value: `${count} Lines`, badge: 'Summary', badgeColor: 'text-[#5E6C84] bg-[#F4F5F7]' }
          ]
        );
      }
    };
    new DataTable({
      containerId: 'chem-rec-rpt-table-container',
      data: this.chemicalReceivedReportsList,
      keyField: 'id',
      tableTitle: 'Monthly Chemical Intake Ledger',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'month', header: 'Month', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'plant', header: 'Plant', render: (v) => `<span class="text-[#172B4D]">${v}</span>` },
        { field: 'chemical', header: 'Chemical', render: (v) => `<span class="font-semibold text-[#172B4D]">${v}</span>` },
        { field: 'totalBags', header: 'Total Bags', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'totalKgs', header: 'Total (KG)', render: (v) => `<span class="font-extrabold text-[#006644]">${v.toLocaleString()} KG</span>` },
        { field: 'avgRatePerKg', header: 'Rate/KG', render: (v) => `<span class="text-[#172B4D]">₹ ${v}</span>` },
        { field: 'totalCostInr', header: 'Total (INR)', render: (v) => `<span class="font-extrabold text-[#172B4D]">₹ ${v.toLocaleString()}</span>` },
        { field: 'supplier', header: 'Supplier', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` }
      ]
    });
    renderTotals(this.chemicalReceivedReportsList);
  },

  renderChemicalOpeningBalance(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Chemical Inventory Opening Balance')}
        <div id="chem-op-bal-table-container"></div>
        <div id="chem-op-bal-totals-container" class="mt-4"></div>
      </div>
    `;
    const renderTotals = (list) => {
      const count = list.length;
      const totalKgs = list.reduce((s, x) => s + (parseFloat(x.openingKgs) || 0), 0);
      const totalVal = list.reduce((s, x) => s + (parseFloat(x.totalValuation) || 0), 0);
      const el = document.getElementById('chem-op-bal-totals-container');
      if (el) {
        el.innerHTML = UIBase.renderTotals(
          'Opening Balance Valuation Summary',
          count, 'Lines',
          [
            { label: 'OPENING STOCK', value: `${totalKgs.toLocaleString()} KG`, badge: 'Baseline Volume', badgeColor: 'text-[#0284C7] bg-[#F0F9FF]' },
            { label: 'INVENTORY VALUATION', value: `₹ ${Math.round(totalVal).toLocaleString()}`, badge: 'Book Value', badgeColor: 'text-[#006644] bg-[#E3FCEF]', color: 'text-[#006644]' },
            { label: 'AUDITED PLANTS', value: '3 Plants', badge: 'Certified', badgeColor: 'text-[#006644] bg-[#E3FCEF]' },
            { label: 'ACTIVE RECORDS', value: `${count} Items`, badge: 'Verified', badgeColor: 'text-[#5E6C84] bg-[#F4F5F7]' }
          ]
        );
      }
    };
    new DataTable({
      containerId: 'chem-op-bal-table-container',
      data: this.chemicalOpeningBalancesList,
      keyField: 'id',
      tableTitle: 'Audited Opening Stock Register',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'plant', header: 'Plant', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'chemical', header: 'Chemical', render: (v) => `<span class="font-semibold text-[#172B4D]">${v}</span>` },
        { field: 'openingBags', header: 'Opening Bags', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'openingKgs', header: 'Opening KGs', render: (v) => `<span class="font-extrabold text-[#006644]">${v.toLocaleString()} KG</span>` },
        { field: 'valuationRate', header: 'Rate (INR)', render: (v) => `<span class="text-[#172B4D]">₹ ${v}</span>` },
        { field: 'totalValuation', header: 'Total Valuation', render: (v) => `<span class="font-extrabold text-[#172B4D]">₹ ${v.toLocaleString()}</span>` },
        { field: 'auditDate', header: 'Audit Date', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` }
      ]
    });
    renderTotals(this.chemicalOpeningBalancesList);
  },

  renderChemicalBalanceReport(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Chemical Floor & Warehouse Reconciliation Ledger')}
        <div id="chem-bal-rpt-table-container"></div>
      </div>
    `;
    new DataTable({
      containerId: 'chem-bal-rpt-table-container',
      data: this.chemicalBalanceReportsList,
      keyField: 'id',
      tableTitle: 'Monthly Material Balance (Opening + Intake − Usage = Closing)',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'plant', header: 'Plant', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'chemical', header: 'Chemical', render: (v) => `<span class="font-semibold text-[#172B4D]">${v}</span>` },
        { field: 'openingStock', header: 'Opening (KG)', render: (v) => `<span class="text-[#5E6C84]">${v.toLocaleString()}</span>` },
        { field: 'receipts', header: 'Intake (KG)', render: (v) => `<span class="font-bold text-[#006644]">+${v.toLocaleString()}</span>` },
        { field: 'consumption', header: 'Consumption', render: (v) => `<span class="font-bold text-[#BF2600]">-${v.toLocaleString()}</span>` },
        { field: 'closingStock', header: 'Closing (KG)', render: (v) => `<span class="font-extrabold text-[#172B4D]">${v.toLocaleString()} KG</span>` },
        { field: 'stockStatus', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
  },

  renderChemicalPaymentsList(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader(
          'Chemical Vendor Payments Ledger',
          `<button class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.openChemPaymentModal()">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Record Vendor Payment</span>
          </button>`
        )}
        <div id="chem-pay-table-container"></div>
        <div id="chem-pay-totals-container" class="mt-4"></div>
      </div>
    `;
    const renderTotals = (list) => {
      const count = list.length;
      const totalPaid = list.reduce((s, x) => s + (parseFloat(x.netPaid) || 0), 0);
      const totalTds = list.reduce((s, x) => s + (parseFloat(x.tdsAmount) || 0), 0);
      const el = document.getElementById('chem-pay-totals-container');
      if (el) {
        el.innerHTML = UIBase.renderTotals(
          'Vendor Disbursals & Compliance Abstract',
          count, 'Vouchers',
          [
            { label: 'TOTAL DISBURSED', value: `₹ ${Math.round(totalPaid).toLocaleString()}`, badge: 'Bank Settled', badgeColor: 'text-[#006644] bg-[#E3FCEF]', color: 'text-[#006644]' },
            { label: 'TDS DEDUCTED', value: `₹ ${Math.round(totalTds).toLocaleString()}`, badge: '1% IT Act', badgeColor: 'text-[#0284C7] bg-[#F0F9FF]' },
            { label: 'SETTLED VOUCHERS', value: `${count} Payments`, badge: 'RTGS / NEFT', badgeColor: 'text-[#006644] bg-[#E3FCEF]' },
            { label: 'PENDING LIABILITIES', value: '₹ 0.00', badge: 'All Cleared', badgeColor: 'text-[#5E6C84] bg-[#F4F5F7]' }
          ]
        );
      }
    };
    new DataTable({
      containerId: 'chem-pay-table-container',
      data: this.chemicalPaymentsList,
      keyField: 'id',
      tableTitle: 'Vendor Chemical Disbursals Register',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'voucherNo', header: 'Voucher No', render: (v) => `<span class="font-mono font-bold text-[#006C7A]">${v}</span>` },
        { field: 'supplierName', header: 'Supplier Name', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'invoiceNo', header: 'Invoice No', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'invoiceAmount', header: 'Invoice Amt', render: (v) => `<span class="font-bold text-[#172B4D]">₹ ${v.toLocaleString()}</span>` },
        { field: 'tdsAmount', header: 'TDS (1%)', render: (v) => `<span class="text-[#5E6C84]">₹ ${v.toLocaleString()}</span>` },
        { field: 'netPaid', header: 'Net Paid', render: (v) => `<span class="font-extrabold text-[#006644]">₹ ${v.toLocaleString()}</span>` },
        { field: 'paymentDate', header: 'Payment Date', render: (v) => `<span class="text-[#172B4D]">${v}</span>` },
        { field: 'paymentMode', header: 'Mode', render: (v) => `<span class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#F4F5F7] border border-[#DFE1E6]">${v}</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
    renderTotals(this.chemicalPaymentsList);
  },

  // ============================================
  // 3. FLOOR OPERATIONS & LOGS
  // ============================================
  renderRmReceived(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader(
          'Raw Material Received Register',
          `<button class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.toastInfo('Create Inward batch modal')">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Log RM Intake</span>
          </button>`
        )}
        <div id="rm-rec-table-container"></div>
        <div id="rm-rec-totals-container" class="mt-4"></div>
      </div>
    `;
    const renderTotals = (list) => {
      const count = list.length;
      const totalWt = list.reduce((s, x) => s + (parseFloat(x.receivedWeight) || 0), 0);
      const totalCrates = list.reduce((s, x) => s + (parseInt(x.crates) || 0), 0);
      const el = document.getElementById('rm-rec-totals-container');
      if (el) {
        el.innerHTML = UIBase.renderTotals(
          'Raw Material Intake Volume Summary',
          count, 'Intakes',
          [
            { label: 'TOTAL INWARD WEIGHT', value: `${totalWt.toLocaleString()} KG`, badge: 'Floor Mass', badgeColor: 'text-[#006644] bg-[#E3FCEF]', color: 'text-[#006644]' },
            { label: 'TOTAL CRATES', value: `${totalCrates.toLocaleString()} Crates`, badge: 'Cold Transport', badgeColor: 'text-[#0284C7] bg-[#F0F9FF]' },
            { label: 'AVG HOLDING TEMP', value: '1.2 °C', badge: 'Chilled Pass', badgeColor: 'text-[#006644] bg-[#E3FCEF]' },
            { label: 'ACTIVE BATCHES', value: `${count} Batches`, badge: 'Inspected', badgeColor: 'text-[#5E6C84] bg-[#F4F5F7]' }
          ]
        );
      }
    };
    new DataTable({
      containerId: 'rm-rec-table-container',
      data: this.rmReceivedList,
      keyField: 'id',
      tableTitle: 'Floor RM Inward Intake Ledger',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'inwardNo', header: 'Inward No', render: (v) => `<span class="font-mono font-bold text-[#006C7A]">${v}</span>` },
        { field: 'arrivalDate', header: 'Arrival Date', render: (v) => `<span class="text-[#172B4D]">${v}</span>` },
        { field: 'lotCode', header: 'Lot Code', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'plant', header: 'Plant', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'species', header: 'Species', render: (v) => `<span class="font-semibold text-[#172B4D]">${v}</span>` },
        { field: 'receivedWeight', header: 'Weight (KG)', render: (v) => `<span class="font-extrabold text-[#006644]">${v.toLocaleString()} KG</span>` },
        { field: 'crates', header: 'Crates', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'tempC', header: 'Temp (°C)', render: (v) => `<span class="font-mono font-bold text-[#0284C7]">${v} °C</span>` },
        { field: 'grader', header: 'Grader', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
    renderTotals(this.rmReceivedList);
  },

  initDeheadingStorage() {
    try {
      const stored = localStorage.getItem('dfl_deheading_logs');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.deheadingLogsList = parsed;
        }
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }
  },

  initDeheadingStorage() {
    try {
      const stored = localStorage.getItem('dfl_deheading_logs');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.deheadingLogsList = parsed;
        }
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }
  },

  renderDeheading(container) {
    this.initDeheadingStorage();
    let editRecordId = null;

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">DEHEADING</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Operations &bull; Daily Floor Log & Recovery Entry</span>
        </div>

        <!-- Upper Card: Entry Form -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form id="deheading-form" class="space-y-4">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL DATE</label>
                <input type="date" id="dh-arrival-date" value="2026-10-23" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL/LOT CODE <span class="text-red-500 font-bold">*</span></label>
                <select id="dh-lot-code" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="VM-VSP-AMP-056">VM-VSP-AMP-056 (Vannamei - Pond 4A)</option>
                  <option value="BT-KKD-MKP-043">BT-KKD-MKP-043 (Black Tiger - Pond 12)</option>
                  <option value="VM-PSP-BVR-078">VM-PSP-BVR-078 (Vannamei - Pond 2B)</option>
                  <option value="LOT-2026-OCT-095">LOT-2026-OCT-095 (Fresh Harvest)</option>
                  <option value="LOT-2026-OCT-099">LOT-2026-OCT-099 (Premium Lot)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-red-500 font-bold">*</span></label>
                <select id="dh-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                  <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                  <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                  <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">DE HEADING STATION <span class="text-red-500 font-bold">*</span></label>
                <select id="dh-station" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="Own Center">Own Center</option>
                  <option value="Outside Center">Outside Center</option>
                  <option value="Center 1">Center 1</option>
                  <option value="Center 2">Center 2</option>
                  <option value="Station 1">Station 1</option>
                  <option value="Station 2">Station 2</option>
                </select>
              </div>
            </div>

            <!-- Row 2: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">DE HEADING DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="dh-deheading-date" value="2026-10-23" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT SHIFT <span class="text-red-500 font-bold">*</span></label>
                <select id="dh-shift" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="A SHIFT">A SHIFT</option>
                  <option value="B SHIFT">B SHIFT</option>
                  <option value="C SHIFT">C SHIFT</option>
                  <option value="Day Shift">Day Shift</option>
                  <option value="Night Shift">Night Shift</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SUPERVISOR <span class="text-red-500 font-bold">*</span></label>
                <select id="dh-supervisor" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="K VENKATA VINAY">K VENKATA VINAY</option>
                  <option value="T.VENKATESH">T.VENKATESH</option>
                  <option value="D.SURYA NARAYANA">D.SURYA NARAYANA</option>
                  <option value="M. NAGESH">M. NAGESH</option>
                  <option value="B. VENKATESH">B. VENKATESH</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HEADON COUNT AFTER CHECKING ( COUNT-2 ) <span class="text-red-500 font-bold">*</span></label>
                <input type="number" step="0.1" id="dh-checking-count-2" placeholder="e.g. 48" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Row 3: 4 Columns (4th empty) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SAMPLE YIELD(%)</label>
                <input type="number" step="0.01" id="dh-sample-yield" placeholder="e.g. 67.2" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ICE CONSUMPTION</label>
                <input type="number" step="0.1" id="dh-ice-consumption" placeholder="e.g. 450" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REMARKS</label>
                <input type="text" id="dh-remarks" placeholder="Enter Remarks(Optional)" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div class="hidden lg:block"></div>
            </div>

            <!-- Row 4: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HON QUANTITY(KGS) <span class="text-red-500 font-bold">*</span></label>
                <input type="number" step="0.01" id="dh-hon-qty" placeholder="e.g. 4250" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HL COUNT (PER KG) <span class="text-red-500 font-bold">*</span></label>
                <input type="number" step="0.1" id="dh-hl-count" placeholder="e.g. 32" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HL QUANTITY(KGS) <span class="text-red-500 font-bold">*</span></label>
                <input type="number" step="0.01" id="dh-hl-qty" placeholder="e.g. 2847.5" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HON COUNT (PER KG)</label>
                <input type="number" step="0.1" id="dh-hon-count" placeholder="e.g. 48" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center justify-center gap-3 pt-3">
              <button type="button" id="dh-btn-new" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
                New
              </button>
              <button type="submit" id="dh-btn-save" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Save
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Register Table -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <!-- Filter & Export Toolbar -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
              <input type="text" id="dh-table-search" placeholder="Search..." class="w-full pl-9 pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <button type="button" id="dh-btn-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <!-- Table Container with Horizontal Scroll -->
          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.No</th>
                  <th class="py-2.5 px-3">Arrival Code</th>
                  <th class="py-2.5 px-3">Production Plant</th>
                  <th class="py-2.5 px-3">Center</th>
                  <th class="py-2.5 px-3">De Heading Date</th>
                  <th class="py-2.5 px-3">Shift</th>
                  <th class="py-2.5 px-3">Supervisor</th>
                  <th class="py-2.5 px-3 text-right">Checking Count-2</th>
                  <th class="py-2.5 px-3 text-right">HL Count</th>
                  <th class="py-2.5 px-3 text-right">HON Count</th>
                  <th class="py-2.5 px-3 text-right">HON Quantity(Kgs)</th>
                  <th class="py-2.5 px-3 text-right">HL Quantity(Kgs)</th>
                  <th class="py-2.5 px-3 text-right">Count Net Yield(%)</th>
                  <th class="py-2.5 px-3 text-right">Yield(%)</th>
                  <th class="py-2.5 px-3 text-right">Ice Consumption</th>
                  <th class="py-2.5 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="dh-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>

          <!-- Quick Totals Bar -->
          <div id="dh-table-totals" class="mt-4 pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 text-xs text-[#64748B]">
          </div>
        </div>
      </div>
    `;

    const form = document.getElementById('deheading-form');
    const tbody = document.getElementById('dh-table-body');
    const totalsEl = document.getElementById('dh-table-totals');
    const searchInput = document.getElementById('dh-table-search');
    const saveBtn = document.getElementById('dh-btn-save');
    const newBtn = document.getElementById('dh-btn-new');
    const exportBtn = document.getElementById('dh-btn-export-excel');

    // Auto-calculate sample yield when HON & HL Qty entered
    const honQtyInput = document.getElementById('dh-hon-qty');
    const hlQtyInput = document.getElementById('dh-hl-qty');
    const sampleYieldInput = document.getElementById('dh-sample-yield');

    const updateYieldCalculation = () => {
      const hon = parseFloat(honQtyInput.value) || 0;
      const hl = parseFloat(hlQtyInput.value) || 0;
      if (hon > 0 && hl > 0) {
        const y = ((hl / hon) * 100).toFixed(2);
        if (!sampleYieldInput.value || parseFloat(sampleYieldInput.value) === 0) {
          sampleYieldInput.value = y;
        }
      }
    };

    honQtyInput?.addEventListener('input', updateYieldCalculation);
    hlQtyInput?.addEventListener('input', updateYieldCalculation);

    // Render Table Rows
    const renderTable = (query = '') => {
      const q = query.toLowerCase().trim();
      const filtered = this.deheadingLogsList.filter(r => {
        if (!q) return true;
        const text = `${r.lotCode || ''} ${r.plant || ''} ${r.center || r.station || ''} ${r.shift || ''} ${r.supervisor || ''} ${r.deheadingDate || r.date || ''}`.toLowerCase();
        return text.includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="16" class="text-center py-8 text-[#94A3B8] text-xs font-medium">No data available in table</td>
          </tr>
        `;
        totalsEl.innerHTML = `<span>Showing 0 records</span>`;
        return;
      }

      let totalHon = 0;
      let totalHl = 0;
      let totalIce = 0;

      tbody.innerHTML = filtered.map((r, idx) => {
        const hon = parseFloat(r.honQty || r.headonWeight || 0);
        const hl = parseFloat(r.hlQty || r.deheadedWeight || 0);
        const ice = parseFloat(r.iceConsumption || r.iceKgs || 0);
        const y = parseFloat(r.yieldPct || (hon > 0 ? (hl / hon) * 100 : 0));
        const cny = parseFloat(r.countNetYield || y);

        totalHon += hon;
        totalHl += hl;
        totalIce += ice;

        return `
          <tr class="hover:bg-[#F8FAFC] transition-colors">
            <td class="py-2.5 px-3 font-bold text-[#64748B]">${idx + 1}</td>
            <td class="py-2.5 px-3 font-bold text-[#0F172A]">${r.lotCode || '-'}</td>
            <td class="py-2.5 px-3 text-[#334155]">${r.plant || '-'}</td>
            <td class="py-2.5 px-3 text-[#334155]">${r.center || r.station || '-'}</td>
            <td class="py-2.5 px-3 text-[#334155]">${r.deheadingDate || r.date || '-'}</td>
            <td class="py-2.5 px-3 font-medium text-[#1E293B]">${r.shift || '-'}</td>
            <td class="py-2.5 px-3 text-[#334155]">${r.supervisor || '-'}</td>
            <td class="py-2.5 px-3 text-right font-medium text-[#334155]">${r.checkingCount2 || '-'}</td>
            <td class="py-2.5 px-3 text-right font-medium text-[#334155]">${r.hlCount || '-'}</td>
            <td class="py-2.5 px-3 text-right font-medium text-[#334155]">${r.honCount || '-'}</td>
            <td class="py-2.5 px-3 text-right font-bold text-[#0F172A]">${hon.toLocaleString()}</td>
            <td class="py-2.5 px-3 text-right font-bold text-[#006644]">${hl.toLocaleString()}</td>
            <td class="py-2.5 px-3 text-right font-mono font-medium text-[#006C7A]">${cny.toFixed(2)}%</td>
            <td class="py-2.5 px-3 text-right">
              <span class="px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-[#E3FCEF] text-[#006644]">${y.toFixed(2)}%</span>
            </td>
            <td class="py-2.5 px-3 text-right text-[#334155]">${ice.toLocaleString()}</td>
            <td class="py-2.5 px-3 text-center">
              <div class="flex items-center justify-center gap-1.5">
                <button type="button" data-edit-id="${r.id}" class="dh-row-edit p-1 text-[#02a8b5] hover:text-[#008f9a] hover:bg-[#F0FDFA] rounded cursor-pointer" title="Edit Entry">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </button>
                <button type="button" data-del-id="${r.id}" class="dh-row-del p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer" title="Delete Entry">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      const avgYield = totalHon > 0 ? (totalHl / totalHon) * 100 : 0;
      totalsEl.innerHTML = `
        <div class="flex items-center gap-4 flex-wrap">
          <span>Total Records: <strong class="text-[#0F172A]">${filtered.length}</strong></span>
          <span>Total HON: <strong class="text-[#0F172A]">${totalHon.toLocaleString()} KGS</strong></span>
          <span>Total HLSO: <strong class="text-[#006644]">${totalHl.toLocaleString()} KGS</strong></span>
          <span>Floor Yield: <strong class="text-[#006644]">${avgYield.toFixed(2)}%</strong></span>
          <span>Total Ice: <strong class="text-[#0F172A]">${totalIce.toLocaleString()} KGS</strong></span>
        </div>
        <div class="text-[11px] text-[#94A3B8]">DFL Pre-Processing Unit &bull; Live Telemetry</div>
      `;

      // Attach edit / delete listeners
      tbody.querySelectorAll('.dh-row-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = btn.getAttribute('data-edit-id');
          const rec = this.deheadingLogsList.find(x => x.id === id);
          if (rec) {
            editRecordId = rec.id;
            document.getElementById('dh-arrival-date').value = rec.arrivalDate || rec.date || '2026-10-23';
            document.getElementById('dh-lot-code').value = rec.lotCode || '';
            document.getElementById('dh-plant').value = rec.plant || '';
            document.getElementById('dh-station').value = rec.center || rec.station || '';
            document.getElementById('dh-deheading-date').value = rec.deheadingDate || rec.date || '2026-10-23';
            document.getElementById('dh-shift').value = rec.shift || '';
            document.getElementById('dh-supervisor').value = rec.supervisor || '';
            document.getElementById('dh-checking-count-2').value = rec.checkingCount2 || '';
            document.getElementById('dh-sample-yield').value = rec.sampleYield || rec.yieldPct || '';
            document.getElementById('dh-ice-consumption').value = rec.iceConsumption || rec.iceKgs || '';
            document.getElementById('dh-remarks').value = rec.remarks || '';
            document.getElementById('dh-hon-qty').value = rec.honQty || rec.headonWeight || '';
            document.getElementById('dh-hl-count').value = rec.hlCount || '';
            document.getElementById('dh-hl-qty').value = rec.hlQty || rec.deheadedWeight || '';
            document.getElementById('dh-hon-count').value = rec.honCount || '';

            saveBtn.textContent = 'Update Entry';
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            if (window.Toast) window.Toast.show(`Loaded record for ${rec.lotCode}`, 'info');
          }
        });
      });

      tbody.querySelectorAll('.dh-row-del').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = btn.getAttribute('data-del-id');
          if (confirm('Are you sure you want to delete this deheading operation record?')) {
            this.deheadingLogsList = this.deheadingLogsList.filter(x => x.id !== id);
            try {
              localStorage.setItem('dfl_deheading_logs', JSON.stringify(this.deheadingLogsList));
            } catch (err) {}
            renderTable(searchInput?.value || '');
            if (window.Toast) window.Toast.show('Deheading record deleted', 'info');
          }
        });
      });
    };

    renderTable();

    // Search Filter
    searchInput?.addEventListener('input', (e) => {
      renderTable(e.target.value);
    });

    // Reset / + New button
    newBtn?.addEventListener('click', () => {
      form.reset();
      editRecordId = null;
      document.getElementById('dh-arrival-date').value = '2026-10-23';
      document.getElementById('dh-deheading-date').value = '2026-10-23';
      saveBtn.textContent = 'Save';
      if (window.Toast) window.Toast.show('Ready to create new deheading entry', 'info');
    });

    // Form Submission: Save / Update
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const honQty = parseFloat(document.getElementById('dh-hon-qty').value) || 0;
      const hlQty = parseFloat(document.getElementById('dh-hl-qty').value) || 0;
      const yieldPct = honQty > 0 ? Number(((hlQty / honQty) * 100).toFixed(2)) : 0;
      const honCount = parseFloat(document.getElementById('dh-hon-count').value) || 0;
      const hlCount = parseFloat(document.getElementById('dh-hl-count').value) || 0;
      const sampleYield = parseFloat(document.getElementById('dh-sample-yield').value) || yieldPct;
      const countNetYield = Number((yieldPct * (honCount && hlCount ? (honCount / hlCount) * 0.98 : 1)).toFixed(2));

      if (editRecordId) {
        const item = this.deheadingLogsList.find(x => x.id === editRecordId);
        if (item) {
          item.arrivalDate = document.getElementById('dh-arrival-date').value;
          item.lotCode = document.getElementById('dh-lot-code').value;
          item.plant = document.getElementById('dh-plant').value;
          item.center = document.getElementById('dh-station').value;
          item.station = document.getElementById('dh-station').value;
          item.deheadingDate = document.getElementById('dh-deheading-date').value;
          item.date = document.getElementById('dh-deheading-date').value;
          item.shift = document.getElementById('dh-shift').value;
          item.supervisor = document.getElementById('dh-supervisor').value;
          item.checkingCount2 = document.getElementById('dh-checking-count-2').value;
          item.sampleYield = sampleYield;
          item.iceConsumption = parseFloat(document.getElementById('dh-ice-consumption').value) || 0;
          item.iceKgs = item.iceConsumption;
          item.remarks = document.getElementById('dh-remarks').value;
          item.honQty = honQty;
          item.headonWeight = honQty;
          item.hlCount = hlCount;
          item.hlQty = hlQty;
          item.deheadedWeight = hlQty;
          item.honCount = honCount;
          item.countNetYield = countNetYield;
          item.yieldPct = yieldPct;
        }
        editRecordId = null;
        saveBtn.textContent = 'Save';
        if (window.Toast) window.Toast.show('Deheading entry updated successfully!', 'success');
      } else {
        const newRecord = {
          id: 'DH-' + String(Date.now()).slice(-6),
          sNo: this.deheadingLogsList.length + 1,
          arrivalDate: document.getElementById('dh-arrival-date').value,
          lotCode: document.getElementById('dh-lot-code').value,
          plant: document.getElementById('dh-plant').value,
          center: document.getElementById('dh-station').value,
          station: document.getElementById('dh-station').value,
          deheadingDate: document.getElementById('dh-deheading-date').value,
          date: document.getElementById('dh-deheading-date').value,
          shift: document.getElementById('dh-shift').value,
          supervisor: document.getElementById('dh-supervisor').value,
          checkingCount2: document.getElementById('dh-checking-count-2').value,
          sampleYield: sampleYield,
          iceConsumption: parseFloat(document.getElementById('dh-ice-consumption').value) || 0,
          iceKgs: parseFloat(document.getElementById('dh-ice-consumption').value) || 0,
          remarks: document.getElementById('dh-remarks').value,
          honQty: honQty,
          headonWeight: honQty,
          hlCount: hlCount,
          hlQty: hlQty,
          deheadedWeight: hlQty,
          honCount: honCount,
          countNetYield: countNetYield,
          yieldPct: yieldPct,
          status: 'Completed'
        };
        this.deheadingLogsList.unshift(newRecord);
        if (window.Toast) window.Toast.show(`Deheading entry for ${newRecord.lotCode} saved successfully!`, 'success');
      }

      try {
        localStorage.setItem('dfl_deheading_logs', JSON.stringify(this.deheadingLogsList));
      } catch (err) {}

      form.reset();
      document.getElementById('dh-arrival-date').value = '2026-10-23';
      document.getElementById('dh-deheading-date').value = '2026-10-23';
      renderTable(searchInput?.value || '');
    });

    // Excel Export
    exportBtn?.addEventListener('click', () => {
      const headers = [
        "S.No", "Arrival Code", "Production Plant", "Center", "De Heading Date", "Shift",
        "Supervisor", "Checking Count-2", "HL Count", "HON Count", "HON Quantity(Kgs)",
        "HL Quantity(Kgs)", "Count Net Yield(%)", "Yield(%)", "Ice Consumption", "Remarks"
      ];
      const rows = this.deheadingLogsList.map((r, i) => [
        i + 1,
        `"${r.lotCode || ''}"`,
        `"${r.plant || ''}"`,
        `"${r.center || r.station || ''}"`,
        `"${r.deheadingDate || r.date || ''}"`,
        `"${r.shift || ''}"`,
        `"${r.supervisor || ''}"`,
        `"${r.checkingCount2 || ''}"`,
        `"${r.hlCount || ''}"`,
        `"${r.honCount || ''}"`,
        r.honQty || r.headonWeight || 0,
        r.hlQty || r.deheadedWeight || 0,
        (r.countNetYield || r.yieldPct || 0).toFixed(2),
        (r.yieldPct || 0).toFixed(2),
        r.iceConsumption || r.iceKgs || 0,
        `"${(r.remarks || '').replace(/"/g, '""')}"`
      ]);

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `deheading_operations_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (window.Toast) window.Toast.show('Excel CSV export downloaded!', 'success');
    });
  },

  initGradingStorage() {
    try {
      const stored = localStorage.getItem('dfl_grading_logs');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.gradingLogsList = parsed;
        }
      }
    } catch (e) {
      console.warn('Grading storage read error:', e);
    }
  },

  renderGrading(container) {
    this.initGradingStorage();
    let selectedRecordId = null;

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">GRADING</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Operations &bull; Grading Machine Run Log</span>
        </div>

        <!-- Upper Card: Entry Form -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form id="grading-form" class="space-y-4">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="gr-arrival-date" value="2025-03-23" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL/LOT CODE <span class="text-red-500 font-bold">*</span></label>
                <div class="relative">
                  <select id="gr-lot-code" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                    <option value="SKM/2425/1755">SKM/2425/1755 - 47.00 - 87.000</option>
                    <option value="VM-VSP-AMP-056">VM-VSP-AMP-056 - 48.00 - 67.000</option>
                    <option value="BT-KKD-MKP-043">BT-KKD-MKP-043 - 52.00 - 65.000</option>
                    <option value="VM-PSP-BVR-078">VM-PSP-BVR-078 - 44.00 - 68.000</option>
                    <option value="LOT-2026-OCT-095">LOT-2026-OCT-095 - Fresh Harvest</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-red-500 font-bold">*</span></label>
                <select id="gr-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="DFL UNIT-6 [JPT-II]" selected>JPT-II</option>
                  <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                  <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                  <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                  <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">GRADING STATION <span class="text-red-500 font-bold">*</span></label>
                <select id="gr-station" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="Own Center" selected>Own Center</option>
                  <option value="Outside Center">Outside Center</option>
                  <option value="Station 1">Station 1</option>
                  <option value="Station 2">Station 2</option>
                </select>
              </div>
            </div>

            <!-- Row 2: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">GRADING DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="gr-grading-date" value="2025-03-23" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">GRADING MACHINE <span class="text-red-500 font-bold">*</span></label>
                <select id="gr-machine" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="Unit -6 Laitram Grading Machine" selected>Unit -6 Laitram Grading Machine</option>
                  <option value="Unit -1 Sort-Rite Machine">Unit -1 Sort-Rite Machine</option>
                  <option value="Unit -2 Key Tech Grader">Unit -2 Key Tech Grader</option>
                  <option value="Station Grader 03">Station Grader 03</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">START TIME <span class="text-red-500 font-bold">*</span></label>
                <input type="time" id="gr-start-time" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">END TIME <span class="text-red-500 font-bold">*</span></label>
                <input type="time" id="gr-end-time" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Row 3: 4 Columns (Columns 3 & 4 empty) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BREAK TIME(MINUTES) <span class="text-red-500 font-bold">*</span></label>
                <input type="number" id="gr-break-time" placeholder="Enter Break Time" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REMARKS</label>
                <input type="text" id="gr-remarks" placeholder="Enter Remarks(Optional)" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div class="hidden lg:block"></div>
              <div class="hidden lg:block"></div>
            </div>

            <!-- Row 4: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT VARIETY <span class="text-red-500 font-bold">*</span></label>
                <select id="gr-variety" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="VM-HLSO" selected>VM-HLSO</option>
                  <option value="BT-HLSO">BT-HLSO</option>
                  <option value="SEA-HLSO">SEA-HLSO</option>
                  <option value="HOSO-GRADE">HOSO-GRADE</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HL COUNT(PER LB)</label>
                <input type="number" step="0.01" id="gr-hl-count" placeholder="Enter HL Count" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HL WEIGHT(KGS)</label>
                <input type="number" step="0.01" id="gr-hl-weight" placeholder="Enter HL Weight(Kgs)" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">NO OF CRATES</label>
                <input type="number" id="gr-no-crates" placeholder="Enter No Of Crates" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Action Buttons: + New, Save, Delete -->
            <div class="flex items-center justify-center gap-3 pt-3">
              <button type="button" id="gr-btn-new" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
                New
              </button>
              <button type="submit" id="gr-btn-save" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Save
              </button>
              <button type="button" id="gr-btn-delete" class="px-5 py-2 bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                Delete
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Register Table -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <!-- Filter & Export Toolbar -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
              <input type="text" id="gr-table-search" placeholder="Search..." class="w-full pl-9 pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <button type="button" id="gr-btn-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <!-- Table Container with Horizontal Scroll -->
          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.No</th>
                  <th class="py-2.5 px-3">Transaction Date</th>
                  <th class="py-2.5 px-3">Arrival Code</th>
                  <th class="py-2.5 px-3">Production Plant</th>
                  <th class="py-2.5 px-3">Center</th>
                  <th class="py-2.5 px-3">Grading Machine</th>
                  <th class="py-2.5 px-3">Start Time</th>
                  <th class="py-2.5 px-3">End Time</th>
                  <th class="py-2.5 px-3 text-right">Break Time(Minutes)</th>
                  <th class="py-2.5 px-3 text-right">HL Count</th>
                  <th class="py-2.5 px-3 text-right">HL Weight</th>
                  <th class="py-2.5 px-3 text-right">No Of Crates</th>
                  <th class="py-2.5 px-3">Remarks</th>
                  <th class="py-2.5 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="gr-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>

          <!-- Quick Totals Bar -->
          <div id="gr-table-totals" class="mt-4 pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 text-xs text-[#64748B]">
          </div>
        </div>
      </div>
    `;

    const form = document.getElementById('grading-form');
    const tbody = document.getElementById('gr-table-body');
    const totalsEl = document.getElementById('gr-table-totals');
    const searchInput = document.getElementById('gr-table-search');
    const saveBtn = document.getElementById('gr-btn-save');
    const newBtn = document.getElementById('gr-btn-new');
    const deleteBtn = document.getElementById('gr-btn-delete');
    const exportBtn = document.getElementById('gr-btn-export-excel');

    // Render Table Rows
    const renderTable = (query = '') => {
      const q = query.toLowerCase().trim();
      const filtered = this.gradingLogsList.filter(r => {
        if (!q) return true;
        const text = `${r.lotCode || ''} ${r.plant || ''} ${r.center || r.station || ''} ${r.gradingMachine || ''} ${r.transactionDate || r.date || ''} ${r.remarks || ''}`.toLowerCase();
        return text.includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="14" class="text-center py-8 text-[#94A3B8] text-xs font-medium">No data available in table</td>
          </tr>
        `;
        totalsEl.innerHTML = `<span>Showing 0 records</span>`;
        return;
      }

      let totalWeight = 0;
      let totalCrates = 0;

      tbody.innerHTML = filtered.map((r, idx) => {
        const wt = parseFloat(r.hlWeight || r.gradedWeight || 0);
        const crates = parseInt(r.noOfCrates || 0, 10);
        totalWeight += wt;
        totalCrates += crates;

        return `
          <tr class="hover:bg-[#F8FAFC] transition-colors cursor-pointer gr-table-row ${selectedRecordId === r.id ? 'bg-[#F0FDFA]' : ''}" data-id="${r.id}">
            <td class="py-2.5 px-3 font-bold text-[#64748B]">${idx + 1}</td>
            <td class="py-2.5 px-3 text-[#334155]">${r.transactionDate || r.date || '23-03-2025'}</td>
            <td class="py-2.5 px-3 font-bold text-[#0F172A]">${r.lotCode || '-'}</td>
            <td class="py-2.5 px-3 text-[#334155]">${r.plant || '-'}</td>
            <td class="py-2.5 px-3 text-[#334155]">${r.center || ''}</td>
            <td class="py-2.5 px-3 text-[#334155]">${r.gradingMachine || '-'}</td>
            <td class="py-2.5 px-3 text-[#64748B]">${r.startTime || ''}</td>
            <td class="py-2.5 px-3 text-[#64748B]">${r.endTime || ''}</td>
            <td class="py-2.5 px-3 text-right text-[#64748B]">${r.breakTime || ''}</td>
            <td class="py-2.5 px-3 text-right font-medium text-[#334155]">${Number(r.hlCount || 0).toFixed(2)}</td>
            <td class="py-2.5 px-3 text-right font-bold text-[#006644]">${wt.toFixed(2)}</td>
            <td class="py-2.5 px-3 text-right font-medium text-[#334155]">${crates}</td>
            <td class="py-2.5 px-3 text-[#64748B]">${r.remarks || ''}</td>
            <td class="py-2.5 px-3 text-center">
              <button type="button" data-del-id="${r.id}" class="gr-row-del p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer" title="Delete Row">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </td>
          </tr>
        `;
      }).join('');

      totalsEl.innerHTML = `
        <div class="flex items-center gap-4 flex-wrap">
          <span>Total Records: <strong class="text-[#0F172A]">${filtered.length}</strong></span>
          <span>Total HL Weight: <strong class="text-[#006644]">${totalWeight.toFixed(2)} KGS</strong></span>
          <span>Total Crates: <strong class="text-[#0F172A]">${totalCrates}</strong></span>
        </div>
        <div class="text-[11px] text-[#94A3B8]">DFL Pre-Processing Unit &bull; Laitram Sizing Line</div>
      `;

      // Row Click -> Load into Form
      tbody.querySelectorAll('.gr-table-row').forEach(tr => {
        tr.addEventListener('click', (e) => {
          if (e.target.closest('.gr-row-del')) return;
          const id = tr.getAttribute('data-id');
          const rec = this.gradingLogsList.find(x => x.id === id);
          if (rec) {
            selectedRecordId = rec.id;
            document.getElementById('gr-arrival-date').value = rec.arrivalDate || '2025-03-23';
            document.getElementById('gr-lot-code').value = rec.lotCode || '';
            document.getElementById('gr-plant').value = rec.plant || 'DFL UNIT-6 [JPT-II]';
            document.getElementById('gr-station').value = rec.station || 'Own Center';
            document.getElementById('gr-grading-date').value = rec.date || '2025-03-23';
            document.getElementById('gr-machine').value = rec.gradingMachine || 'Unit -6 Laitram Grading Machine';
            document.getElementById('gr-start-time').value = rec.startTime || '';
            document.getElementById('gr-end-time').value = rec.endTime || '';
            document.getElementById('gr-break-time').value = rec.breakTime || '';
            document.getElementById('gr-remarks').value = rec.remarks || '';
            document.getElementById('gr-variety').value = rec.variety || 'VM-HLSO';
            document.getElementById('gr-hl-count').value = rec.hlCount || '';
            document.getElementById('gr-hl-weight').value = rec.hlWeight || rec.gradedWeight || '';
            document.getElementById('gr-no-crates').value = rec.noOfCrates || '';

            saveBtn.textContent = 'Update Entry';
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            renderTable(searchInput?.value || '');
            if (window.Toast) window.Toast.show(`Loaded grading log #${rec.sNo}`, 'info');
          }
        });
      });

      // Row Delete
      tbody.querySelectorAll('.gr-row-del').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-del-id');
          if (confirm('Are you sure you want to delete this grading record?')) {
            this.gradingLogsList = this.gradingLogsList.filter(x => x.id !== id);
            try {
              localStorage.setItem('dfl_grading_logs', JSON.stringify(this.gradingLogsList));
            } catch (err) {}
            if (selectedRecordId === id) {
              selectedRecordId = null;
              form.reset();
              saveBtn.textContent = 'Save';
            }
            renderTable(searchInput?.value || '');
            if (window.Toast) window.Toast.show('Grading entry deleted', 'info');
          }
        });
      });
    };

    renderTable();

    // Search Filter
    searchInput?.addEventListener('input', (e) => {
      renderTable(e.target.value);
    });

    // Reset / + New button
    newBtn?.addEventListener('click', () => {
      form.reset();
      selectedRecordId = null;
      document.getElementById('gr-arrival-date').value = '2025-03-23';
      document.getElementById('gr-grading-date').value = '2025-03-23';
      document.getElementById('gr-plant').value = 'DFL UNIT-6 [JPT-II]';
      document.getElementById('gr-station').value = 'Own Center';
      document.getElementById('gr-machine').value = 'Unit -6 Laitram Grading Machine';
      document.getElementById('gr-variety').value = 'VM-HLSO';
      saveBtn.textContent = 'Save';
      renderTable(searchInput?.value || '');
      if (window.Toast) window.Toast.show('Ready to create new grading run', 'info');
    });

    // Delete button in Form
    deleteBtn?.addEventListener('click', () => {
      if (!selectedRecordId) {
        if (window.Toast) window.Toast.show('Please select a row from the table to delete', 'warning');
        return;
      }
      if (confirm('Are you sure you want to delete the selected grading record?')) {
        this.gradingLogsList = this.gradingLogsList.filter(x => x.id !== selectedRecordId);
        try {
          localStorage.setItem('dfl_grading_logs', JSON.stringify(this.gradingLogsList));
        } catch (err) {}
        selectedRecordId = null;
        form.reset();
        saveBtn.textContent = 'Save';
        renderTable(searchInput?.value || '');
        if (window.Toast) window.Toast.show('Grading entry deleted', 'info');
      }
    });

    // Form Submission: Save / Update
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const hlCount = parseFloat(document.getElementById('gr-hl-count').value) || 0;
      const hlWeight = parseFloat(document.getElementById('gr-hl-weight').value) || 0;
      const noOfCrates = parseInt(document.getElementById('gr-no-crates').value, 10) || 0;
      const breakTime = document.getElementById('gr-break-time').value;
      const remarks = document.getElementById('gr-remarks').value;
      const startTime = document.getElementById('gr-start-time').value;
      const endTime = document.getElementById('gr-end-time').value;

      if (selectedRecordId) {
        const item = this.gradingLogsList.find(x => x.id === selectedRecordId);
        if (item) {
          item.arrivalDate = document.getElementById('gr-arrival-date').value;
          item.transactionDate = item.arrivalDate.split('-').reverse().join('-');
          item.lotCode = document.getElementById('gr-lot-code').value;
          item.plant = document.getElementById('gr-plant').value;
          item.station = document.getElementById('gr-station').value;
          item.date = document.getElementById('gr-grading-date').value;
          item.gradingMachine = document.getElementById('gr-machine').value;
          item.startTime = startTime;
          item.endTime = endTime;
          item.breakTime = breakTime;
          item.variety = document.getElementById('gr-variety').value;
          item.hlCount = hlCount.toFixed(2);
          item.dominantCount = item.hlCount;
          item.hlWeight = hlWeight.toFixed(2);
          item.gradedWeight = hlWeight;
          item.noOfCrates = noOfCrates;
          item.remarks = remarks;
        }
        selectedRecordId = null;
        saveBtn.textContent = 'Save';
        if (window.Toast) window.Toast.show('Grading entry updated successfully!', 'success');
      } else {
        const rawDate = document.getElementById('gr-grading-date').value || '2025-03-23';
        const formattedDate = rawDate.split('-').reverse().join('-');
        const newRecord = {
          id: 'GR-' + String(Date.now()).slice(-6),
          sNo: this.gradingLogsList.length + 1,
          transactionDate: formattedDate,
          date: rawDate,
          arrivalDate: document.getElementById('gr-arrival-date').value,
          lotCode: document.getElementById('gr-lot-code').value,
          plant: document.getElementById('gr-plant').value,
          center: '',
          station: document.getElementById('gr-station').value,
          gradingMachine: document.getElementById('gr-machine').value,
          startTime: startTime,
          endTime: endTime,
          breakTime: breakTime,
          variety: document.getElementById('gr-variety').value,
          hlCount: hlCount.toFixed(2),
          dominantCount: hlCount.toFixed(2),
          hlWeight: hlWeight.toFixed(2),
          gradedWeight: hlWeight,
          noOfCrates: noOfCrates,
          remarks: remarks,
          status: 'Approved'
        };
        this.gradingLogsList.push(newRecord);
        if (window.Toast) window.Toast.show(`Grading entry for ${newRecord.lotCode} saved successfully!`, 'success');
      }

      try {
        localStorage.setItem('dfl_grading_logs', JSON.stringify(this.gradingLogsList));
      } catch (err) {}

      form.reset();
      document.getElementById('gr-arrival-date').value = '2025-03-23';
      document.getElementById('gr-grading-date').value = '2025-03-23';
      document.getElementById('gr-plant').value = 'DFL UNIT-6 [JPT-II]';
      document.getElementById('gr-station').value = 'Own Center';
      document.getElementById('gr-machine').value = 'Unit -6 Laitram Grading Machine';
      document.getElementById('gr-variety').value = 'VM-HLSO';
      renderTable(searchInput?.value || '');
    });

    // Excel Export
    exportBtn?.addEventListener('click', () => {
      const headers = [
        "S.No", "Transaction Date", "Arrival Code", "Production Plant", "Center",
        "Grading Machine", "Start Time", "End Time", "Break Time(Minutes)", "HL Count",
        "HL Weight", "No Of Crates", "Remarks"
      ];
      const rows = this.gradingLogsList.map((r, i) => [
        i + 1,
        `"${r.transactionDate || r.date || ''}"`,
        `"${r.lotCode || ''}"`,
        `"${r.plant || ''}"`,
        `"${r.center || ''}"`,
        `"${r.gradingMachine || ''}"`,
        `"${r.startTime || ''}"`,
        `"${r.endTime || ''}"`,
        `"${r.breakTime || ''}"`,
        `"${r.hlCount || ''}"`,
        `"${r.hlWeight || r.gradedWeight || ''}"`,
        `"${r.noOfCrates || ''}"`,
        `"${(r.remarks || '').replace(/"/g, '""')}"`
      ]);

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `grading_operations_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (window.Toast) window.Toast.show('Excel CSV export downloaded!', 'success');
    });
  },

  renderDeheadingTrackid(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Track ID-wise Deheading Analysis')}
        <div id="dh-track-table-container"></div>
      </div>
    `;
    new DataTable({
      containerId: 'dh-track-table-container',
      data: this.deheadingLogsList,
      keyField: 'id',
      tableTitle: 'Track ID Deheading Yield Performance',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'lotCode', header: 'Track Lot Code', render: (v) => `<span class="font-bold text-[#006C7A]">${v}</span>` },
        { field: 'date', header: 'Date', render: (v) => `<span class="text-[#172B4D]">${v}</span>` },
        { field: 'plant', header: 'Plant', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'headonWeight', header: 'HON Mass (KG)', render: (v) => `<span class="font-bold text-[#172B4D]">${v.toLocaleString()}</span>` },
        { field: 'deheadedWeight', header: 'HLSO Mass (KG)', render: (v) => `<span class="font-extrabold text-[#006644]">${v.toLocaleString()} KG</span>` },
        { field: 'yieldPct', header: 'Actual Recovery', render: (v) => `<span class="font-mono font-bold text-[#172B4D]">${v}%</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
  },

  renderGradingTrackid(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Track ID-wise Grading Distribution')}
        <div id="gr-track-table-container"></div>
      </div>
    `;
    new DataTable({
      containerId: 'gr-track-table-container',
      data: this.gradingLogsList,
      keyField: 'id',
      tableTitle: 'Track ID Sizing & Size Classification',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'lotCode', header: 'Track Lot Code', render: (v) => `<span class="font-bold text-[#006C7A]">${v}</span>` },
        { field: 'date', header: 'Date', render: (v) => `<span class="text-[#172B4D]">${v}</span>` },
        { field: 'plant', header: 'Plant', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'variety', header: 'Variety', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'primaryGrade', header: 'Grade', render: (v) => `<span class="font-mono font-bold bg-[#F4F5F7] px-2 py-0.5 rounded text-[#172B4D]">${v}</span>` },
        { field: 'gradedWeight', header: 'Weight (KG)', render: (v) => `<span class="font-extrabold text-[#006644]">${v.toLocaleString()} KG</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
  },

  renderValueAddition(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader(
          'Value Addition Floor Processing Log',
          `<button class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.toastInfo('Log Value Addition Run')">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Log Value Addition</span>
          </button>`
        )}
        <div id="va-table-container"></div>
      </div>
    `;
    new DataTable({
      containerId: 'va-table-container',
      data: this.valueAdditionList,
      keyField: 'id',
      tableTitle: 'Value Added Finished Floor Production',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'date', header: 'Date', render: (v) => `<span class="text-[#172B4D]">${v}</span>` },
        { field: 'plant', header: 'Plant', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'processType', header: 'Process Type', render: (v) => `<span class="font-bold text-[#006C7A]">${v}</span>` },
        { field: 'batchCode', header: 'Batch Code', render: (v) => `<span class="font-mono font-bold bg-[#E6FCFF] px-2 py-0.5 rounded text-[11px]">${v}</span>` },
        { field: 'inputWeight', header: 'Input (KG)', render: (v) => `<span class="text-[#5E6C84]">${v.toLocaleString()}</span>` },
        { field: 'outputWeight', header: 'Finished (KG)', render: (v) => `<span class="font-extrabold text-[#006644]">${v.toLocaleString()} KG</span>` },
        { field: 'recoveryPct', header: 'Recovery', render: (v) => `<span class="font-mono font-bold text-[#172B4D]">${v}%</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
  },

  renderHonQtyTransfer(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader(
          'Head-On Quantity Inter-Plant Transfer Register',
          `<button class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.toastInfo('Create Transfer Manifest')">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Dispatch HON Transfer</span>
          </button>`
        )}
        <div id="ht-table-container"></div>
      </div>
    `;
    new DataTable({
      containerId: 'ht-table-container',
      data: this.honTransferList,
      keyField: 'id',
      tableTitle: 'Head-On Shifting & Inter-Unit Dispatches',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'transferId', header: 'Transfer ID', render: (v) => `<span class="font-mono font-bold text-[#006C7A]">${v}</span>` },
        { field: 'date', header: 'Date', render: (v) => `<span class="text-[#172B4D]">${v}</span>` },
        { field: 'fromPlant', header: 'Origin Plant', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'toPlant', header: 'Destination', render: (v) => `<span class="font-bold text-[#006644]">${v}</span>` },
        { field: 'weightKg', header: 'Weight (KG)', render: (v) => `<span class="font-extrabold text-[#172B4D]">${v.toLocaleString()} KG</span>` },
        { field: 'vehicleNo', header: 'Vehicle No', render: (v) => `<span class="font-mono text-[#5E6C84]">${v}</span>` },
        { field: 'driverName', header: 'Driver', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, v === 'Delivered' ? 'success' : 'info') }
      ]
    });
  },

  // ============================================
  // 4. TRACEABILITY & RECONCILIATION
  // ============================================
  renderTrackCodeReport(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Batch Genealogy & End-to-End Traceability Report')}
        <div id="trace-table-container"></div>
      </div>
    `;
    new DataTable({
      containerId: 'trace-table-container',
      data: this.traceReportsList,
      keyField: 'id',
      tableTitle: 'Farm-to-Freezer Aquaculture Traceability Ledger',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'batchCode', header: 'Batch Code', render: (v) => `<span class="font-mono font-bold text-[#006C7A] bg-[#E6FCFF] px-2 py-0.5 rounded">${v}</span>` },
        { field: 'farmerName', header: 'Farmer / Cluster', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'pondNo', header: 'Pond', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'harvestDate', header: 'Harvest Date', render: (v) => `<span class="text-[#172B4D]">${v}</span>` },
        { field: 'intakeWeight', header: 'Intake (KG)', render: (v) => `<span class="text-[#5E6C84]">${v.toLocaleString()}</span>` },
        { field: 'deheadedWeight', header: 'Deheaded', render: (v) => `<span class="text-[#5E6C84]">${v.toLocaleString()}</span>` },
        { field: 'gradedWeight', header: 'Graded', render: (v) => `<span class="text-[#5E6C84]">${v.toLocaleString()}</span>` },
        { field: 'packedWeight', header: 'Packed (KG)', render: (v) => `<span class="font-extrabold text-[#006644]">${v.toLocaleString()} KG</span>` },
        { field: 'totalYieldPct', header: 'Net Yield %', render: (v) => `<span class="font-mono font-bold text-[#172B4D]">${v}%</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
  },

  renderVaFloorBalance(container) {
    this.renderFloorOverview(container);
  },

  renderVaTransfer(container) {
    this.renderHonQtyTransfer(container);
  },

  renderAssumedReports(container) {
    this.renderChemicalReceivedReport(container);
  },

  renderConsolidationDaily(container) {
    this.renderFloorOverview(container);
  },

  renderFileUpload(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Batch File Upload & Data Ingestion')}
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-6 shadow-xs text-center">
          <div class="w-12 h-12 rounded-full bg-[#F0F9FF] text-[#0284C7] flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
          </div>
          <h3 class="text-sm font-bold text-[#172B4D]">Drag and drop your spreadsheet here</h3>
          <p class="text-xs text-[#5E6C84] mt-1">Accepts .CSV, .XLSX files up to 25MB (Grading runs, intake scales, chemical orders)</p>
          <div class="mt-4 flex items-center justify-center gap-3">
            <button class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.toastSuccess('Upload triggered')">Browse Files</button>
            <button class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.toastInfo('Downloading CSV template')">Download Template</button>
          </div>
        </div>
      </div>
    `;
  },

  calcDiff() {},
  calcDeheadYield() {
    const qty = parseFloat(document.getElementById('dh-hon-qty')?.value) || 0;
    const yieldEl = document.getElementById('dh-yield');
    if (yieldEl && qty > 0) {
      yieldEl.value = (66.5 + (qty % 3) * 0.5).toFixed(1);
    }
  },

  toastSuccess(msg) { if (typeof Toast !== 'undefined') Toast.show(msg, 'success'); },
  toastInfo(msg) { if (typeof Toast !== 'undefined') Toast.show(msg, 'info'); },
  toastError(msg) { if (typeof Toast !== 'undefined') Toast.show(msg, 'error'); },

  openChemPOModal() { this.toastInfo('Opening Chemical Purchase Order Modal'); },
  openChemOrderModal() { this.toastInfo('Opening Dock Intake Modal'); },
  openChemConsumptionModal() { this.toastInfo('Opening Daily Floor Consumption Modal'); },
  openChemPaymentModal() { this.toastInfo('Opening Vendor Payment Modal'); }
};
