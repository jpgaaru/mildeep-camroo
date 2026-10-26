"""
Implement pixel-accurate Tabs 4, 5, 6, and 7 of Chemical Screens matching user screenshots
across js/views/preprocessingView.js, standalone.html, and miledeep-devi-fisheries.html.
"""

import re
import sys

TARGET_FILES = [
    'js/views/preprocessingView.js',
    'standalone.html',
    'miledeep-devi-fisheries.html'
]

REMAINING_SCREENS_CODE = '''  // ============================================
  // TAB 4: CHEMICAL RECEIVED REPORT (Matching Screenshot 1)
  // ============================================
  renderChemicalReceivedReport(container) {
    if (!this.chemicalReceivedReportList || this.chemicalReceivedReportList.length === 0 || !this.chemicalReceivedReportList.some(x => x.poNo === 'DFL/KPL/2627/002')) {
      this.chemicalReceivedReportList = [
        { id: "CRR-01", sNo: 1, poNo: "DFL/KPL/2627/002", chemical: "ALTESA NEO S100 (NP)", receivedBags: 300, receivedQty: 6000, balanceBags: 0, balanceQuantity: 0, status: "ORDER RECEIVED", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "CRR-02", sNo: 2, poNo: "DFL/KPL/2627/003", chemical: "ALTESA NEO S100 (NP)", receivedBags: 240, receivedQty: 4800, balanceBags: 0, balanceQuantity: 0, status: "ORDER RECEIVED", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "CRR-03", sNo: 3, poNo: "DFL/PT/2627/014", chemical: "SALT", receivedBags: 640, receivedQty: 32000, balanceBags: 0, balanceQuantity: 0, status: "ORDER RECEIVED", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "CRR-04", sNo: 4, poNo: "DFL/CFB/2627/003", chemical: "CARNAL 659 S ADVANCED (STPP)", receivedBags: 800, receivedQty: 20000, balanceBags: 4000, balanceQuantity: 100000, status: "PENDING", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "CRR-05", sNo: 5, poNo: "DFL/PT/2627/013", chemical: "SALT", receivedBags: 620, receivedQty: 31000, balanceBags: 0, balanceQuantity: 0, status: "ORDER RECEIVED", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "CRR-06", sNo: 6, poNo: "DFL/CFB/2627/002", chemical: "CARNAL 659 S ADVANCED (STPP)", receivedBags: 800, receivedQty: 20000, balanceBags: 1600, balanceQuantity: 40000, status: "PENDING", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "CRR-07", sNo: 7, poNo: "DFL/PT/2627/011", chemical: "SALT", receivedBags: 300, receivedQty: 15000, balanceBags: 0, balanceQuantity: 0, status: "ORDER RECEIVED", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "CRR-08", sNo: 8, poNo: "DFL/PT/2627/012", chemical: "SALT", receivedBags: 320, receivedQty: 16000, balanceBags: 0, balanceQuantity: 0, status: "ORDER RECEIVED", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "CRR-09", sNo: 9, poNo: "DFL/GOI/2627/003", chemical: "CRUSTECH-NP-100", receivedBags: 60, receivedQty: 1500, balanceBags: 0, balanceQuantity: 0, status: "ORDER RECEIVED", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "CRR-10", sNo: 10, poNo: "DFL/PT/2627/010", chemical: "SALT", receivedBags: 620, receivedQty: 31000, balanceBags: 0, balanceQuantity: 0, status: "ORDER RECEIVED", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">CHEMICAL RECEIVED REPORT</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Intake vs Pending Fulfillment</span>
        </div>

        <!-- Upper Card: Filters Card (Matching Screenshot 1) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form id="crr-filter-form" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT</label>
                <select id="crr-filter-plant" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="" selected>Select</option>
                  <option value="VSP-DFL UNIT-1 (VSP)">VSP-DFL UNIT-1 (VSP)</option>
                  <option value="KKD-DFL UNIT-2 (KKD)">KKD-DFL UNIT-2 (KKD)</option>
                  <option value="PSP-DFL UNIT-3 (PSP)">PSP-DFL UNIT-3 (PSP)</option>
                  <option value="JPT-DFL UNIT-5 (JPT)">JPT-DFL UNIT-5 (JPT)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="crr-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="2026-27" selected>2026-27</option>
                  <option value="2025-26">2025-26</option>
                  <option value="2024-25">2024-25</option>
                </select>
              </div>
            </div>

            <!-- Centered Action Button -->
            <div class="flex items-center justify-center pt-2">
              <button type="button" id="crr-btn-search" class="px-7 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <span>Search</span>
                <span>&rarr;</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Table with Toolbar -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="flex items-center flex-wrap gap-2.5 w-full sm:w-auto">
              <div class="relative w-full sm:w-64">
                <input type="text" id="crr-table-search" placeholder="Search..." class="w-full pl-9 pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <button type="button" id="crr-btn-more-search" class="px-3 py-1.5 bg-white border border-[#10B981] text-[#10B981] hover:bg-[#F0FDF4] text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition-all cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>More Search</span>
              </button>
              <button type="button" id="crr-btn-load-all" class="px-3 py-1.5 bg-white border border-[#0284C7] text-[#0284C7] hover:bg-[#F0F9FF] text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition-all cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
            <button type="button" id="crr-btn-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.NO &uarr;&darr;</th>
                  <th class="py-2.5 px-3">PoNo &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Chemical &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Received Bags &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Received Quantity &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Balance Bags &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Balance Quantity &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-center">Status &uarr;&darr;</th>
                </tr>
              </thead>
              <tbody id="crr-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('crr-table-body');
    const tableSearch = document.getElementById('crr-table-search');
    const btnSearch = document.getElementById('crr-btn-search');
    const btnLoadAll = document.getElementById('crr-btn-load-all');
    const btnMoreSearch = document.getElementById('crr-btn-more-search');
    const btnExportExcel = document.getElementById('crr-btn-export-excel');
    const filterPlant = document.getElementById('crr-filter-plant');
    const filterYear = document.getElementById('crr-filter-year');

    const renderTable = (query = '', override = false) => {
      const q = (query || '').toLowerCase().trim();
      const pVal = override ? '' : (filterPlant?.value || '');
      const yVal = override ? '' : (filterYear?.value || '2026-27');

      const filtered = this.chemicalReceivedReportList.filter(r => {
        if (pVal && r.plant && !r.plant.includes(pVal)) return false;
        if (yVal && r.year && r.year !== yVal) return false;
        if (!q) return true;
        return `${r.poNo || ''} ${r.chemical || ''} ${r.status || ''}`.toLowerCase().includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="py-8 text-center text-xs text-[#64748B]">No records found.</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map((r, i) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#E2E8F0]">
          <td class="py-2.5 px-3 font-semibold text-[#64748B]">${i + 1}</td>
          <td class="py-2.5 px-3 font-mono font-medium text-[#1E293B]">${r.poNo || ''}</td>
          <td class="py-2.5 px-3 text-[#1E293B] font-medium">${r.chemical || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.receivedBags || 0}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.receivedQty || 0}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.balanceBags || 0}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.balanceQuantity || 0}</td>
          <td class="py-2.5 px-3 text-center">
            ${r.status === 'ORDER RECEIVED'
              ? '<span class="px-3 py-0.5 bg-[#064E3B] text-white rounded-full text-[10px] font-bold tracking-wider uppercase inline-block">ORDER RECEIVED</span>'
              : '<span class="px-3 py-0.5 bg-[#EF4444] text-white rounded-full text-[10px] font-bold tracking-wider uppercase inline-block">PENDING</span>'}
          </td>
        </tr>
      `).join('');
    };

    renderTable();

    tableSearch?.addEventListener('input', (e) => renderTable(e.target.value));
    btnSearch?.addEventListener('click', () => {
      renderTable(tableSearch?.value || '');
      if (window.Toast) window.Toast.show('Applied report filters', 'info');
    });
    btnLoadAll?.addEventListener('click', () => {
      if (filterPlant) filterPlant.value = '';
      if (tableSearch) tableSearch.value = '';
      renderTable('', true);
      if (window.Toast) window.Toast.show('Loaded all received report records', 'info');
    });
    btnMoreSearch?.addEventListener('click', () => {
      if (window.Toast) window.Toast.show('More search parameters active', 'info');
    });
    btnExportExcel?.addEventListener('click', () => {
      const headers = ["S.NO", "PoNo", "Chemical", "Received Bags", "Received Quantity", "Balance Bags", "Balance Quantity", "Status"];
      const rows = this.chemicalReceivedReportList.map((r, i) => [
        i + 1,
        `"${r.poNo || ''}"`,
        `"${r.chemical || ''}"`,
        r.receivedBags || 0,
        r.receivedQty || 0,
        r.balanceBags || 0,
        r.balanceQuantity || 0,
        `"${r.status || ''}"`
      ]);
      const csv = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const a = document.createElement("a");
      a.href = encodeURI(csv);
      a.download = `chemical_received_report_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      if (window.Toast) window.Toast.show('Chemical received report exported to CSV', 'success');
    });
  },

  // ============================================
  // TAB 5: CHEMICAL OPENING BALANCE REPORT (Matching Screenshot 2)
  // ============================================
  renderChemicalOpeningBalance(container) {
    if (!this.chemicalOpeningBalanceList || this.chemicalOpeningBalanceList.length === 0 || !this.chemicalOpeningBalanceList.some(x => x.chemical.includes('CARNAL'))) {
      this.chemicalOpeningBalanceList = [
        { id: "COB-01", sNo: 1, chemical: "CARNAL 659 S ADVANCED (STPP)", kgsPerBag: 25, totalBags: 1909, totalKgs: 47725, plant: "DFL UNIT-5 (JPT)", date: "2025-10-26" },
        { id: "COB-02", sNo: 2, chemical: "CARFOSEL B 940 (STPP)", kgsPerBag: 25, totalBags: 876, totalKgs: 21900, plant: "DFL UNIT-5 (JPT)", date: "2025-10-26" },
        { id: "COB-03", sNo: 3, chemical: "ALTESA BT2 (NP)", kgsPerBag: 20, totalBags: 161, totalKgs: 3220, plant: "DFL UNIT-5 (JPT)", date: "2025-10-26" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">CHEMICAL OPENING BALANCE REPORT</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Point-in-time Stock Balance</span>
        </div>

        <!-- Upper Card: Filters Card (Matching Screenshot 2) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form id="cob-filter-form" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT</label>
                <select id="cob-filter-plant" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="DFL UNIT-5 (JPT)" selected>DFL UNIT-5 (JPT)</option>
                  <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                  <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                  <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                  <option value="">All Plants</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CHEMICAL</label>
                <select id="cob-filter-chem" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All" selected>All</option>
                  <option value="CARNAL 659 S ADVANCED (STPP)">CARNAL 659 S ADVANCED (STPP)</option>
                  <option value="CARFOSEL B 940 (STPP)">CARFOSEL B 940 (STPP)</option>
                  <option value="ALTESA BT2 (NP)">ALTESA BT2 (NP)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BILL DATE</label>
                <input type="date" id="cob-filter-date" value="2025-10-26" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Centered Action Button -->
            <div class="flex items-center justify-center pt-2">
              <button type="button" id="cob-btn-search" class="px-7 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <span>Search</span>
                <span>&rarr;</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Table with Toolbar -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
              <input type="text" id="cob-table-search" placeholder="Search..." class="w-full pl-9 pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <button type="button" id="cob-btn-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.NO</th>
                  <th class="py-2.5 px-3">Chemical</th>
                  <th class="py-2.5 px-3 text-right">KGs per Bag</th>
                  <th class="py-2.5 px-3 text-right">Total Bags</th>
                  <th class="py-2.5 px-3 text-right">Total KGs</th>
                </tr>
              </thead>
              <tbody id="cob-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('cob-table-body');
    const tableSearch = document.getElementById('cob-table-search');
    const btnSearch = document.getElementById('cob-btn-search');
    const btnExportExcel = document.getElementById('cob-btn-export-excel');
    const filterPlant = document.getElementById('cob-filter-plant');
    const filterChem = document.getElementById('cob-filter-chem');

    const renderTable = (query = '') => {
      const q = (query || '').toLowerCase().trim();
      const pVal = filterPlant?.value || '';
      const cVal = filterChem?.value || 'All';

      const filtered = this.chemicalOpeningBalanceList.filter(r => {
        if (pVal && r.plant && r.plant !== pVal) return false;
        if (cVal !== 'All' && r.chemical !== cVal) return false;
        if (!q) return true;
        return (r.chemical || '').toLowerCase().includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="py-8 text-center text-xs text-[#64748B]">No opening balance records found.</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map((r, i) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#E2E8F0]">
          <td class="py-2.5 px-3 font-semibold text-[#64748B]">${i + 1}</td>
          <td class="py-2.5 px-3 text-[#1E293B] font-medium">${r.chemical || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.kgsPerBag || 0}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.totalBags || 0}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#1E293B]">${r.totalKgs || 0}</td>
        </tr>
      `).join('');
    };

    renderTable();

    tableSearch?.addEventListener('input', (e) => renderTable(e.target.value));
    btnSearch?.addEventListener('click', () => {
      renderTable(tableSearch?.value || '');
      if (window.Toast) window.Toast.show('Applied opening balance filters', 'info');
    });
    btnExportExcel?.addEventListener('click', () => {
      const headers = ["S.NO", "Chemical", "KGs per Bag", "Total Bags", "Total KGs"];
      const rows = this.chemicalOpeningBalanceList.map((r, i) => [
        i + 1,
        `"${r.chemical || ''}"`,
        r.kgsPerBag || 0,
        r.totalBags || 0,
        r.totalKgs || 0
      ]);
      const csv = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const a = document.createElement("a");
      a.href = encodeURI(csv);
      a.download = `chemical_opening_balance_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      if (window.Toast) window.Toast.show('Chemical opening balance exported to CSV', 'success');
    });
  },

  // ============================================
  // TAB 6: CHEMICAL BALANCE REPORT (Matching Screenshot 3)
  // ============================================
  renderChemicalBalanceReport(container) {
    if (!this.chemicalBalanceReportList || this.chemicalBalanceReportList.length === 0 || !this.chemicalBalanceReportList.some(x => x.chemical.includes('CARNAL'))) {
      this.chemicalBalanceReportList = [
        { id: "CBR-01", sNo: 1, chemical: "CARNAL 659 S ADVANCED (STPP)", openingKgs: 0, totalPurchaseKgs: 56000, totalConsumptionKgs: 10250, kgsSentToOtherPlant: 24700, closingKgs: 21050, plant: "DFL UNIT-3 (PSP)", fromDate: "2024-04-01", toDate: "2025-03-31", period: "April-2024 to March-2025" },
        { id: "CBR-02", sNo: 2, chemical: "ALTESA BT2 (NP)", openingKgs: 0, totalPurchaseKgs: 17400, totalConsumptionKgs: 300, kgsSentToOtherPlant: 12500, closingKgs: 4600, plant: "DFL UNIT-3 (PSP)", fromDate: "2024-04-01", toDate: "2025-03-31", period: "April-2024 to March-2025" },
        { id: "CBR-03", sNo: 3, chemical: "ALTESA NEO S700 (NC)", openingKgs: 0, totalPurchaseKgs: 8600, totalConsumptionKgs: 1320, kgsSentToOtherPlant: 5600, closingKgs: 1680, plant: "DFL UNIT-3 (PSP)", fromDate: "2024-04-01", toDate: "2025-03-31", period: "April-2024 to March-2025" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">CHEMICAL BALANCE REPORT</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Period Stock Reconciliation</span>
        </div>

        <!-- Upper Card: Filters Card (Matching Screenshot 3) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form id="cbr-filter-form" class="space-y-4">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT</label>
                <select id="cbr-filter-plant" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="DFL UNIT-3 (PSP)" selected>DFL UNIT-3 (PSP)</option>
                  <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                  <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                  <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                  <option value="">All Plants</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CHEMICAL</label>
                <select id="cbr-filter-chem" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All" selected>All</option>
                  <option value="CARNAL 659 S ADVANCED (STPP)">CARNAL 659 S ADVANCED (STPP)</option>
                  <option value="ALTESA BT2 (NP)">ALTESA BT2 (NP)</option>
                  <option value="ALTESA NEO S700 (NC)">ALTESA NEO S700 (NC)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">FROM DATE</label>
                <input type="date" id="cbr-filter-from-date" value="2024-04-01" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TO DATE</label>
                <input type="date" id="cbr-filter-to-date" value="2025-03-31" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Row 2: 2 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="cbr-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="2024-25" selected>2024-25</option>
                  <option value="2025-26">2025-26</option>
                  <option value="2026-27">2026-27</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT MONTH</label>
                <select id="cbr-filter-month" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="" selected>Select</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                </select>
              </div>
            </div>

            <!-- Centered Action Button -->
            <div class="flex items-center justify-center pt-2">
              <button type="button" id="cbr-btn-search" class="px-7 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <span>Search</span>
                <span>&rarr;</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Table with Toolbar -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex items-center justify-between gap-3 mb-4">
            <h3 class="text-xs md:text-sm font-bold text-[#1E293B]">April-2024 to March-2025</h3>
            <button type="button" id="cbr-btn-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.NO</th>
                  <th class="py-2.5 px-3">Chemical</th>
                  <th class="py-2.5 px-3 text-right">Opening KGs</th>
                  <th class="py-2.5 px-3 text-right">Total Purchase KGs</th>
                  <th class="py-2.5 px-3 text-right">Total Consumption KGs</th>
                  <th class="py-2.5 px-3 text-right">KGs Sent to Other Plant</th>
                  <th class="py-2.5 px-3 text-right font-extrabold text-[#006644]">Closing KGs</th>
                </tr>
              </thead>
              <tbody id="cbr-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('cbr-table-body');
    const btnSearch = document.getElementById('cbr-btn-search');
    const btnExportExcel = document.getElementById('cbr-btn-export-excel');
    const filterPlant = document.getElementById('cbr-filter-plant');
    const filterChem = document.getElementById('cbr-filter-chem');

    const renderTable = () => {
      const pVal = filterPlant?.value || '';
      const cVal = filterChem?.value || 'All';

      const filtered = this.chemicalBalanceReportList.filter(r => {
        if (pVal && r.plant && r.plant !== pVal) return false;
        if (cVal !== 'All' && r.chemical !== cVal) return false;
        return true;
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="py-8 text-center text-xs text-[#64748B]">No reconciliation balance records found.</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map((r, i) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#E2E8F0]">
          <td class="py-2.5 px-3 font-semibold text-[#64748B]">${i + 1}</td>
          <td class="py-2.5 px-3 text-[#1E293B] font-medium">${r.chemical || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.openingKgs || 0}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.totalPurchaseKgs || 0}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.totalConsumptionKgs || 0}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.kgsSentToOtherPlant || 0}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#006644]">${r.closingKgs || 0}</td>
        </tr>
      `).join('');
    };

    renderTable();

    btnSearch?.addEventListener('click', () => {
      renderTable();
      if (window.Toast) window.Toast.show('Applied period balance filters', 'info');
    });
    btnExportExcel?.addEventListener('click', () => {
      const headers = ["S.NO", "Chemical", "Opening KGs", "Total Purchase KGs", "Total Consumption KGs", "KGs Sent to Other Plant", "Closing KGs"];
      const rows = this.chemicalBalanceReportList.map((r, i) => [
        i + 1,
        `"${r.chemical || ''}"`,
        r.openingKgs || 0,
        r.totalPurchaseKgs || 0,
        r.totalConsumptionKgs || 0,
        r.kgsSentToOtherPlant || 0,
        r.closingKgs || 0
      ]);
      const csv = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const a = document.createElement("a");
      a.href = encodeURI(csv);
      a.download = `chemical_balance_report_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      if (window.Toast) window.Toast.show('Chemical balance report exported to CSV', 'success');
    });
  },

  // ============================================
  // TAB 7: CHEMICAL PAYMENTS LIST & GS CHEM PO PAYMENT CREATE (Matching Screenshots 4 & 5)
  // ============================================
  renderChemicalPaymentsList(container) {
    if (!this.chemicalPaymentsList || this.chemicalPaymentsList.length === 0 || !this.chemicalPaymentsList.some(x => x.poNo === 'DFL/KPL/2627/004')) {
      this.chemicalPaymentsList = [
        { id: "CP-01", sNo: 1, poNo: "DFL/KPL/2627/004", chemicalName: "ALTESA NEO S100 (NP)", partyName: "KPL INTERNATIONAL LTD", receivedQty: 6400, amount: 1152000, paidAmount: 1152000, bankRefNo: "HDFC-RTGS-98214", paymentDate: "2025-10-24", remarks: "Full settlement against delivery", status: "Paid", supplier: "KPL INTERNATIONAL LTD", year: "2025-26" },
        { id: "CP-02", sNo: 2, poNo: "DFL/CFB/2627/003", chemicalName: "CARNAL 659 S ADVANCED (STPP)", partyName: "ADWIK IMPEX,", receivedQty: 20000, amount: 868800, paidAmount: 500000, bankRefNo: "SBI-NEFT-44102", paymentDate: "2025-10-20", remarks: "Part payment milestone 1", status: "Partially Paid", supplier: "ADWIK IMPEX,", year: "2025-26" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">CHEMICAL PAYMENTS LIST</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Supplier Payments & Settlement</span>
        </div>

        <!-- Upper Card: Filters Card (Matching Screenshot 4) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form id="cp-filter-form" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SUPPLIER</label>
                <select id="cp-filter-supplier" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All" selected>All</option>
                  <option value="KPL INTERNATIONAL LTD">KPL INTERNATIONAL LTD</option>
                  <option value="ADWIK IMPEX,">ADWIK IMPEX,</option>
                  <option value="PRAYON PHOSPHATES">PRAYON PHOSPHATES</option>
                  <option value="ICL FOOD SPECIALTIES">ICL FOOD SPECIALTIES</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="cp-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="2025-26" selected>2025-26</option>
                  <option value="2026-27">2026-27</option>
                  <option value="2024-25">2024-25</option>
                </select>
              </div>
            </div>

            <!-- Centered Action Buttons (Matching Screenshot 4) -->
            <div class="flex items-center justify-center gap-3 pt-2">
              <button type="button" id="cp-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <span>Search</span>
                <span>&rarr;</span>
              </button>
              <button type="button" id="cp-btn-add-payment" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                <span>+ Add Payment</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Create/Edit Form Card: GS CHEM PO PAYMENT CREATE (Matching Screenshot 5) -->
        <div id="cp-create-card" class="hidden bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all animate-fade-in">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#E2E8F0]">
            <h3 id="cp-create-title" class="text-xs md:text-sm font-bold text-[#1E293B] uppercase tracking-wide">GS CHEM PO PAYMENT CREATE</h3>
            <button type="button" id="cp-card-close-x" class="text-[#64748B] hover:text-[#1E293B] text-lg font-bold cursor-pointer transition-colors">&times;</button>
          </div>
          <form id="cp-create-form" class="space-y-4">
            <input type="hidden" id="cp-edit-id" value="">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PONO <span class="text-red-500 font-bold">*</span></label>
                <select id="cp-create-pono" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All">All</option>
                  <option value="DFL/KPL/2627/004" selected>DFL/KPL/2627/004</option>
                  <option value="DFL/CFB/2627/003">DFL/CFB/2627/003</option>
                  <option value="DFL/CFB/2627/002">DFL/CFB/2627/002</option>
                  <option value="DFL/PT/2627/014">DFL/PT/2627/014</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CHEMICAL NAME <span class="text-red-500 font-bold">*</span></label>
                <input type="text" id="cp-create-chem" placeholder="Enter Chemical Name" required value="ALTESA NEO S100 (NP)" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PARTY NAME <span class="text-red-500 font-bold">*</span></label>
                <input type="text" id="cp-create-party" placeholder="Enter Party Name" required value="KPL INTERNATIONAL LTD" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">RECIEVED QUANTITY <span class="text-red-500 font-bold">*</span></label>
                <input type="number" id="cp-create-qty" placeholder="Enter Quantity" required value="6400" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Row 2: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">AMOUNT <span class="text-red-500 font-bold">*</span></label>
                <input type="number" id="cp-create-amount" placeholder="Enter Amount" required value="1152000" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BANK REFERENCE NO <span class="text-red-500 font-bold">*</span></label>
                <input type="text" id="cp-create-bankref" placeholder="Enter Invoice No" required value="HDFC-RTGS-98214" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PAYMENT DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="cp-create-date" required value="2025-10-24" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REMARKS</label>
                <input type="text" id="cp-create-remarks" placeholder="Enter Remarks" value="Full settlement against delivery" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Centered Buttons: Close & Save (Matching Screenshot 5) -->
            <div class="flex items-center justify-center gap-3 pt-2">
              <button type="button" id="cp-btn-close-form" class="px-6 py-2 bg-[#F43F5E] hover:bg-[#E11D48] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Close
              </button>
              <button type="submit" id="cp-btn-save-form" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Save
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Table with Toolbar (Matching Screenshot 4) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="flex items-center flex-wrap gap-2.5 w-full sm:w-auto">
              <div class="relative w-full sm:w-64">
                <input type="text" id="cp-table-search" placeholder="Search..." class="w-full pl-9 pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <button type="button" id="cp-btn-more-search" class="px-3 py-1.5 bg-white border border-[#10B981] text-[#10B981] hover:bg-[#F0FDF4] text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition-all cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>More Search</span>
              </button>
              <button type="button" id="cp-btn-load-all" class="px-3 py-1.5 bg-white border border-[#0284C7] text-[#0284C7] hover:bg-[#F0F9FF] text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition-all cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
            <button type="button" id="cp-btn-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.NO &uarr;&darr;</th>
                  <th class="py-2.5 px-3">PoNo &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Chemical Name &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Party Name &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Recieved Quantity (Kgs) &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Amount (Rupees) &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Paid Amount (Rupees) &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Bank Reference No &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Payment Date &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Remarks &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-center">Status &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-center">Actions &uarr;&darr;</th>
                </tr>
              </thead>
              <tbody id="cp-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('cp-table-body');
    const tableSearch = document.getElementById('cp-table-search');
    const createCard = document.getElementById('cp-create-card');
    const createForm = document.getElementById('cp-create-form');
    const createTitle = document.getElementById('cp-create-title');
    const editIdInput = document.getElementById('cp-edit-id');
    const btnAddPayment = document.getElementById('cp-btn-add-payment');
    const btnCloseForm = document.getElementById('cp-btn-close-form');
    const btnCloseX = document.getElementById('cp-card-close-x');
    const btnSearch = document.getElementById('cp-btn-search');
    const btnLoadAll = document.getElementById('cp-btn-load-all');
    const btnMoreSearch = document.getElementById('cp-btn-more-search');
    const btnExportExcel = document.getElementById('cp-btn-export-excel');
    const filterSupplier = document.getElementById('cp-filter-supplier');
    const filterYear = document.getElementById('cp-filter-year');

    const renderTable = (query = '', override = false) => {
      const q = (query || '').toLowerCase().trim();
      const sVal = override ? 'All' : (filterSupplier?.value || 'All');
      const yVal = override ? '' : (filterYear?.value || '2025-26');

      const filtered = this.chemicalPaymentsList.filter(r => {
        if (sVal !== 'All' && r.supplier && r.supplier !== sVal) return false;
        if (yVal && r.year && r.year !== yVal) return false;
        if (!q) return true;
        return `${r.poNo || ''} ${r.chemicalName || ''} ${r.partyName || ''} ${r.bankRefNo || ''}`.toLowerCase().includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="12" class="py-8 text-center text-xs text-[#64748B]">No chemical payment records available in table.</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map((r, i) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#E2E8F0]">
          <td class="py-2.5 px-3 font-semibold text-[#64748B]">${i + 1}</td>
          <td class="py-2.5 px-3 font-mono font-medium text-[#1E293B]">${r.poNo || ''}</td>
          <td class="py-2.5 px-3 text-[#1E293B] font-medium">${r.chemicalName || ''}</td>
          <td class="py-2.5 px-3 text-[#1E293B]">${r.partyName || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.receivedQty || 0}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">₹ ${(r.amount || 0).toLocaleString()}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#006644]">₹ ${(r.paidAmount || 0).toLocaleString()}</td>
          <td class="py-2.5 px-3 font-mono text-[#334155]">${r.bankRefNo || ''}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.paymentDate || ''}</td>
          <td class="py-2.5 px-3 text-[#64748B]">${r.remarks || ''}</td>
          <td class="py-2.5 px-3 text-center">
            <span class="px-3 py-0.5 ${r.status === 'Paid' ? 'bg-[#10B981]' : 'bg-[#F59E0B]'} text-white rounded-full text-[10px] font-bold tracking-wider uppercase inline-block">${r.status || 'Paid'}</span>
          </td>
          <td class="py-2.5 px-3 text-center">
            <button type="button" title="Edit Payment" class="cp-action-edit p-1 text-[#0284C7] hover:text-[#02a8b5] hover:bg-[#F0F9FF] rounded transition-colors cursor-pointer" data-id="${r.id}">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            </button>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.cp-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.chemicalPaymentsList.find(x => x.id === id);
          if (!rec) return;
          createTitle.textContent = `GS CHEM PO PAYMENT EDIT - ${rec.poNo}`;
          editIdInput.value = rec.id;
          document.getElementById('cp-create-pono').value = rec.poNo || 'All';
          document.getElementById('cp-create-chem').value = rec.chemicalName || '';
          document.getElementById('cp-create-party').value = rec.partyName || '';
          document.getElementById('cp-create-qty').value = rec.receivedQty || '';
          document.getElementById('cp-create-amount').value = rec.amount || '';
          document.getElementById('cp-create-bankref').value = rec.bankRefNo || '';
          document.getElementById('cp-create-date').value = rec.paymentDate || '2025-10-24';
          document.getElementById('cp-create-remarks').value = rec.remarks || '';
          createCard.classList.remove('hidden');
          createCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      });
    };

    renderTable();

    tableSearch?.addEventListener('input', (e) => renderTable(e.target.value));
    btnSearch?.addEventListener('click', () => {
      renderTable(tableSearch?.value || '');
      if (window.Toast) window.Toast.show('Applied payment filters', 'info');
    });
    btnLoadAll?.addEventListener('click', () => {
      if (filterSupplier) filterSupplier.value = 'All';
      if (tableSearch) tableSearch.value = '';
      renderTable('', true);
      if (window.Toast) window.Toast.show('Loaded all payment records', 'info');
    });
    btnMoreSearch?.addEventListener('click', () => {
      if (window.Toast) window.Toast.show('More search options active', 'info');
    });

    btnAddPayment?.addEventListener('click', () => {
      createTitle.textContent = 'GS CHEM PO PAYMENT CREATE';
      editIdInput.value = '';
      createForm.reset();
      document.getElementById('cp-create-date').value = new Date().toISOString().slice(0, 10);
      createCard.classList.remove('hidden');
      createCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    const hideCreateCard = () => {
      createCard.classList.add('hidden');
      createForm.reset();
      editIdInput.value = '';
    };

    btnCloseForm?.addEventListener('click', hideCreateCard);
    btnCloseX?.addEventListener('click', hideCreateCard);

    createForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = editIdInput.value;
      const pono = document.getElementById('cp-create-pono').value;
      const chem = document.getElementById('cp-create-chem').value;
      const party = document.getElementById('cp-create-party').value;
      const qty = parseInt(document.getElementById('cp-create-qty').value) || 0;
      const amt = parseFloat(document.getElementById('cp-create-amount').value) || 0;
      const bankref = document.getElementById('cp-create-bankref').value;
      const dateVal = document.getElementById('cp-create-date').value;
      const remarks = document.getElementById('cp-create-remarks').value;

      if (editId) {
        const idx = this.chemicalPaymentsList.findIndex(x => x.id === editId);
        if (idx !== -1) {
          this.chemicalPaymentsList[idx] = {
            ...this.chemicalPaymentsList[idx],
            poNo: pono,
            chemicalName: chem,
            partyName: party,
            receivedQty: qty,
            amount: amt,
            paidAmount: amt,
            bankRefNo: bankref,
            paymentDate: dateVal,
            remarks: remarks,
            supplier: party
          };
          if (window.Toast) window.Toast.show(`Payment record ${pono} updated`, 'success');
        }
      } else {
        const newRecord = {
          id: 'CP-' + String(Date.now()).slice(-6),
          sNo: this.chemicalPaymentsList.length + 1,
          poNo: pono,
          chemicalName: chem,
          partyName: party,
          receivedQty: qty,
          amount: amt,
          paidAmount: amt,
          bankRefNo: bankref,
          paymentDate: dateVal,
          remarks: remarks,
          status: 'Paid',
          supplier: party,
          year: '2025-26'
        };
        this.chemicalPaymentsList.unshift(newRecord);
        if (window.Toast) window.Toast.show(`Payment recorded for ${pono}`, 'success');
      }

      hideCreateCard();
      renderTable(tableSearch?.value || '');
    });

    btnExportExcel?.addEventListener('click', () => {
      const headers = ["S.NO", "PoNo", "Chemical Name", "Party Name", "Recieved Quantity (Kgs)", "Amount (Rupees)", "Paid Amount (Rupees)", "Bank Reference No", "Payment Date", "Remarks", "Status"];
      const rows = this.chemicalPaymentsList.map((r, i) => [
        i + 1,
        `"${r.poNo || ''}"`,
        `"${r.chemicalName || ''}"`,
        `"${r.partyName || ''}"`,
        r.receivedQty || 0,
        r.amount || 0,
        r.paidAmount || 0,
        `"${r.bankRefNo || ''}"`,
        `"${r.paymentDate || ''}"`,
        `"${(r.remarks || '').replace(/"/g, '""')}"`,
        `"${r.status || ''}"`
      ]);
      const csv = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const a = document.createElement("a");
      a.href = encodeURI(csv);
      a.download = `chemical_payments_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      if (window.Toast) window.Toast.show('Chemical payments exported to CSV', 'success');
    });
  },'''

def update_file(filepath):
    print(f"Updating {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern matches from renderChemicalReceivedReport(container) to FLOOR OPERATIONS & LOGS comment
    pattern = r'  renderChemicalReceivedReport\(container\)\s*\{[\s\S]*?\n  \},\s*\n\s*// =+\s*\n\s*// 3\. FLOOR OPERATIONS & LOGS'
    
    replacement = REMAINING_SCREENS_CODE + '\n\n  // ============================================\n  // 3. FLOOR OPERATIONS & LOGS'
    
    new_content, count = re.subn(pattern, replacement, content, count=1)
    if count == 0:
        print(f"  ❌ Failed to replace in {filepath}")
        sys.exit(1)
    else:
        print(f"  ✓ Successfully replaced in {filepath}")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

def main():
    for f in TARGET_FILES:
        update_file(f)
    print("\nAll files successfully updated with pixel-accurate implementation for Tabs 4, 5, 6, and 7!")

if __name__ == '__main__':
    main()
