"""
Implement pixel-accurate Received Chemicals screen & GS CHEM ORDERS CREATE form matching user screenshots
across js/views/preprocessingView.js, standalone.html, and miledeep-devi-fisheries.html.
"""

import re
import sys

TARGET_FILES = [
    'js/views/preprocessingView.js',
    'standalone.html',
    'miledeep-devi-fisheries.html'
]

RECEIVED_CHEMICALS_CODE = '''  renderReceivedChemicals(container) {
    if (!this.receivedChemicalsList || this.receivedChemicalsList.length === 0 || !this.receivedChemicalsList.some(x => x.poNo === 'DFL/CFB/2627/003')) {
      this.receivedChemicalsList = [
        { id: "RC-01", sNo: 1, poNo: "DFL/CFB/2627/003", chemical: "CARNAL 659 S ADVANCED (STPP)", blNo: "", containerNo: "", receivedBags: 800, receivedQty: 20000, boeNo: "", boeDate: "04-09-2026", clearedDate: "04-09-2026", balanceBags: 4000, balanceQty: 100000, status: "PENDING", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "RC-02", sNo: 2, poNo: "DFL/CFB/2627/002", chemical: "CARNAL 659 S ADVANCED (STPP)", blNo: "", containerNo: "", receivedBags: 800, receivedQty: 20000, boeNo: "", boeDate: "23-08-2026", clearedDate: "23-08-2026", balanceBags: 1600, balanceQty: 40000, status: "PENDING", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "RC-03", sNo: 3, poNo: "DFL/KPL/2627/004", chemical: "ALTESA NEO S100 (NP)", blNo: "BL-2026-991", containerNo: "TGCU8812301", receivedBags: 320, receivedQty: 8000, boeNo: "BOE-84721", boeDate: "06-10-2026", clearedDate: "08-10-2026", balanceBags: 0, balanceQty: 0, status: "CLEARED", plant: "KKD-DFL UNIT-2 (KKD)", year: "2026-27" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">RECEIVED CHEMICALS</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Inward Orders & Dock Clearance</span>
        </div>

        <!-- Upper Card: Filters Card (Matching Screenshot 1) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form id="rc-filter-form" class="space-y-4">
            <!-- Row 1: 3 Dropdowns -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT</label>
                <select id="rc-filter-plant" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="" selected>Select</option>
                  <option value="VSP-DFL UNIT-1 (VSP)">VSP-DFL UNIT-1 (VSP)</option>
                  <option value="KKD-DFL UNIT-2 (KKD)">KKD-DFL UNIT-2 (KKD)</option>
                  <option value="PSP-DFL UNIT-3 (PSP)">PSP-DFL UNIT-3 (PSP)</option>
                  <option value="JPT-DFL UNIT-5 (JPT)">JPT-DFL UNIT-5 (JPT)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">STATUS</label>
                <select id="rc-filter-status" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="PENDING" selected>Pending</option>
                  <option value="CLEARED">Cleared</option>
                  <option value="ALL">All</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="rc-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="2026-27" selected>2026-27</option>
                  <option value="2025-26">2025-26</option>
                  <option value="2024-25">2024-25</option>
                </select>
              </div>
            </div>

            <!-- Centered Action Buttons (Matching Screenshot 1) -->
            <div class="flex items-center justify-center gap-3 pt-2">
              <button type="button" id="rc-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <span>Search</span>
                <span>&rarr;</span>
              </button>
              <button type="button" id="rc-btn-add-order" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                <span>+ Add Order</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Create/Edit Form Card: GS CHEM ORDERS CREATE (Matching Screenshot 2) -->
        <div id="rc-create-card" class="hidden bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all animate-fade-in">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#E2E8F0]">
            <h3 id="rc-create-title" class="text-xs md:text-sm font-bold text-[#1E293B] uppercase tracking-wide">GS CHEM ORDERS CREATE</h3>
            <button type="button" id="rc-card-close-x" class="text-[#64748B] hover:text-[#1E293B] text-lg font-bold cursor-pointer transition-colors">&times;</button>
          </div>
          <form id="rc-create-form" class="space-y-4">
            <input type="hidden" id="rc-edit-id" value="">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PROCESSING PLANT <span class="text-red-500 font-bold">*</span></label>
                <select id="rc-create-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All">All</option>
                  <option value="VSP-DFL UNIT-1 (VSP)" selected>VSP-DFL UNIT-1 (VSP)</option>
                  <option value="KKD-DFL UNIT-2 (KKD)">KKD-DFL UNIT-2 (KKD)</option>
                  <option value="PSP-DFL UNIT-3 (PSP)">PSP-DFL UNIT-3 (PSP)</option>
                  <option value="JPT-DFL UNIT-5 (JPT)">JPT-DFL UNIT-5 (JPT)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PONO <span class="text-red-500 font-bold">*</span></label>
                <select id="rc-create-pono" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All">All</option>
                  <option value="DFL/CFB/2627/003" selected>DFL/CFB/2627/003</option>
                  <option value="DFL/CFB/2627/002">DFL/CFB/2627/002</option>
                  <option value="DFL/KPL/2627/004">DFL/KPL/2627/004</option>
                  <option value="DFL/2627/003">DFL/2627/003</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CHEMICAL <span class="text-red-500 font-bold">*</span></label>
                <select id="rc-create-chem" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="CARNAL 659 S ADVANCED (STPP)" selected>CARNAL 659 S ADVANCED (STPP)</option>
                  <option value="ALTESA NEO S100 (NP)">ALTESA NEO S100 (NP)</option>
                  <option value="CARFOSEL B 940 (STPP)">CARFOSEL B 940 (STPP)</option>
                  <option value="BEKAPLUS FS (BLEND)">BEKAPLUS FS (BLEND)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BL NO</label>
                <input type="text" id="rc-create-blno" placeholder="Enter BL No" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Row 2: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CONTAINER NO</label>
                <input type="text" id="rc-create-containerno" placeholder="Enter Container No" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">RECEIVED BAGS <span class="text-red-500 font-bold">*</span></label>
                <input type="number" id="rc-create-bags" placeholder="Enter Received Bags" required value="800" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">RECEIVED QTY IN KGS <span class="text-red-500 font-bold">*</span></label>
                <input type="number" id="rc-create-qty" placeholder="Enter Quantity Received" required value="20000" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BILL OF ENTRY NO</label>
                <input type="text" id="rc-create-boeno" placeholder="Enter Bill of Entry No" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Row 3: 4 Columns (First 2 occupied) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BILL OF ENTRY DATE</label>
                <input type="date" id="rc-create-boedate" value="2026-09-04" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CLEARED DATE</label>
                <input type="date" id="rc-create-cleardate" value="2026-09-04" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Centered Buttons: Close & Save (Matching Screenshot 2) -->
            <div class="flex items-center justify-center gap-3 pt-2">
              <button type="button" id="rc-btn-close-form" class="px-6 py-2 bg-[#F43F5E] hover:bg-[#E11D48] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Close
              </button>
              <button type="submit" id="rc-btn-save-form" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Save
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Register Table with Toolbar (Matching Screenshot 1) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="flex items-center flex-wrap gap-2.5 w-full sm:w-auto">
              <!-- Search Input with Magnifier -->
              <div class="relative w-full sm:w-64">
                <input type="text" id="rc-table-search" placeholder="Search..." class="w-full pl-9 pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <!-- More Search Button -->
              <button type="button" id="rc-btn-more-search" class="px-3 py-1.5 bg-white border border-[#10B981] text-[#10B981] hover:bg-[#F0FDF4] text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition-all cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>More Search</span>
              </button>
              <!-- Load All Button -->
              <button type="button" id="rc-btn-load-all" class="px-3 py-1.5 bg-white border border-[#0284C7] text-[#0284C7] hover:bg-[#F0F9FF] text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition-all cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
            <!-- Download Excel Button -->
            <button type="button" id="rc-btn-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
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
                  <th class="py-2.5 px-3">BL No &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Container No &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Received Bags &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Received Quantity &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Bill of Entry No &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Bill of Entry Date &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Cleared Date &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Balance Bags &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Balance Quantity &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-center">Status &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-center">Actions &uarr;&darr;</th>
                </tr>
              </thead>
              <tbody id="rc-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>

          <!-- Table Footer: Entries count & Pagination (Matching Screenshot 1) -->
          <div class="flex items-center justify-between pt-4 text-xs text-[#64748B]">
            <div id="rc-pagination-info">Showing 1 to 2 out of 2 entries</div>
            <div class="flex items-center gap-1">
              <span class="w-6 h-6 flex items-center justify-center rounded-full bg-[#3B82F6] text-white text-xs font-bold shadow-xs">1</span>
            </div>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('rc-table-body');
    const tableSearch = document.getElementById('rc-table-search');
    const createCard = document.getElementById('rc-create-card');
    const createForm = document.getElementById('rc-create-form');
    const createTitle = document.getElementById('rc-create-title');
    const editIdInput = document.getElementById('rc-edit-id');
    const btnAddOrder = document.getElementById('rc-btn-add-order');
    const btnCloseForm = document.getElementById('rc-btn-close-form');
    const btnCloseX = document.getElementById('rc-card-close-x');
    const btnSearch = document.getElementById('rc-btn-search');
    const btnLoadAll = document.getElementById('rc-btn-load-all');
    const btnMoreSearch = document.getElementById('rc-btn-more-search');
    const btnExportExcel = document.getElementById('rc-btn-export-excel');
    const paginationInfo = document.getElementById('rc-pagination-info');

    const filterPlant = document.getElementById('rc-filter-plant');
    const filterStatus = document.getElementById('rc-filter-status');
    const filterYear = document.getElementById('rc-filter-year');

    // Auto-calculate Received Qty in KGs when Received Bags changes (default 25 kg/bag)
    const bagsInput = document.getElementById('rc-create-bags');
    const qtyInput = document.getElementById('rc-create-qty');
    bagsInput?.addEventListener('input', () => {
      const b = parseInt(bagsInput.value) || 0;
      qtyInput.value = b * 25;
    });

    const renderTable = (query = '', overrideFilter = null) => {
      const q = (query || '').toLowerCase().trim();
      const plantVal = overrideFilter ? '' : (filterPlant?.value || '');
      const statusVal = overrideFilter ? 'ALL' : (filterStatus?.value || 'PENDING');
      const yearVal = overrideFilter ? '' : (filterYear?.value || '2026-27');

      const filtered = this.receivedChemicalsList.filter(r => {
        if (plantVal && r.plant && !r.plant.includes(plantVal)) return false;
        if (statusVal !== 'ALL' && (r.status || '').toUpperCase() !== statusVal.toUpperCase()) return false;
        if (yearVal && r.year && r.year !== yearVal) return false;

        if (!q) return true;
        const text = `${r.poNo || ''} ${r.chemical || ''} ${r.blNo || ''} ${r.containerNo || ''} ${r.boeNo || ''} ${r.status || ''}`.toLowerCase();
        return text.includes(q);
      });

      if (paginationInfo) {
        paginationInfo.textContent = `Showing 1 to ${filtered.length} out of ${filtered.length} entries`;
      }

      if (filtered.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="14" class="py-8 text-center text-xs text-[#64748B]">
              No inward chemical orders match the selected criteria.
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = filtered.map((r, i) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#E2E8F0]">
          <td class="py-2.5 px-3 font-semibold text-[#64748B]">${i + 1}</td>
          <td class="py-2.5 px-3 font-mono font-medium text-[#1E293B]">${r.poNo || ''}</td>
          <td class="py-2.5 px-3 text-[#1E293B] font-medium">${r.chemical || ''}</td>
          <td class="py-2.5 px-3 text-[#64748B]">${r.blNo || ''}</td>
          <td class="py-2.5 px-3 text-[#64748B]">${r.containerNo || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.receivedBags || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.receivedQty || ''}</td>
          <td class="py-2.5 px-3 text-[#64748B]">${r.boeNo || ''}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.boeDate || ''}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.clearedDate || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.balanceBags || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.balanceQuantity || r.balanceQty || ''}</td>
          <td class="py-2.5 px-3 text-center">
            ${(r.status || '').toUpperCase() === 'PENDING'
              ? '<span class="px-3 py-0.5 bg-[#EF4444] text-white rounded-full text-[10px] font-bold tracking-wider uppercase inline-block">PENDING</span>'
              : '<span class="px-3 py-0.5 bg-[#10B981] text-white rounded-full text-[10px] font-bold tracking-wider uppercase inline-block">CLEARED</span>'}
          </td>
          <td class="py-2.5 px-3 text-center">
            <button type="button" title="Edit Order" class="rc-action-edit p-1 text-[#0284C7] hover:text-[#02a8b5] hover:bg-[#F0F9FF] rounded transition-colors cursor-pointer" data-id="${r.id}">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            </button>
          </td>
        </tr>
      `).join('');

      // Attach row action handlers
      tbody.querySelectorAll('.rc-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.receivedChemicalsList.find(x => x.id === id);
          if (!rec) return;
          createTitle.textContent = `GS CHEM ORDERS EDIT - ${rec.poNo}`;
          editIdInput.value = rec.id;
          document.getElementById('rc-create-plant').value = rec.plant || 'VSP-DFL UNIT-1 (VSP)';
          document.getElementById('rc-create-pono').value = rec.poNo || 'All';
          document.getElementById('rc-create-chem').value = rec.chemical || '';
          document.getElementById('rc-create-blno').value = rec.blNo || '';
          document.getElementById('rc-create-containerno').value = rec.containerNo || '';
          document.getElementById('rc-create-bags').value = rec.receivedBags || '';
          document.getElementById('rc-create-qty').value = rec.receivedQty || '';
          document.getElementById('rc-create-boeno').value = rec.boeNo || '';

          // Format date to yyyy-mm-dd for input[type=date]
          if (rec.boeDate && rec.boeDate.includes('-')) {
            const parts = rec.boeDate.split('-');
            if (parts[0].length === 2) {
              document.getElementById('rc-create-boedate').value = `${parts[2]}-${parts[1]}-${parts[0]}`;
            } else {
              document.getElementById('rc-create-boedate').value = rec.boeDate;
            }
          }
          if (rec.clearedDate && rec.clearedDate.includes('-')) {
            const parts = rec.clearedDate.split('-');
            if (parts[0].length === 2) {
              document.getElementById('rc-create-cleardate').value = `${parts[2]}-${parts[1]}-${parts[0]}`;
            } else {
              document.getElementById('rc-create-cleardate').value = rec.clearedDate;
            }
          }

          createCard.classList.remove('hidden');
          createCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      });
    };

    // Initial render
    renderTable();

    // Table live search
    tableSearch?.addEventListener('input', (e) => renderTable(e.target.value));

    // Top Filter Search button
    btnSearch?.addEventListener('click', () => {
      renderTable(tableSearch?.value || '');
      if (window.Toast) window.Toast.show('Applied inward chemical filters', 'info');
    });

    // Load All button
    btnLoadAll?.addEventListener('click', () => {
      if (filterPlant) filterPlant.value = '';
      if (filterStatus) filterStatus.value = 'ALL';
      if (tableSearch) tableSearch.value = '';
      renderTable('', true);
      if (window.Toast) window.Toast.show('Loaded all received chemical records', 'info');
    });

    // More Search toggle
    btnMoreSearch?.addEventListener('click', () => {
      if (window.Toast) window.Toast.show('Additional search parameters active', 'info');
    });

    // Toggle GS CHEM ORDERS CREATE card
    btnAddOrder?.addEventListener('click', () => {
      createTitle.textContent = 'GS CHEM ORDERS CREATE';
      editIdInput.value = '';
      createForm.reset();
      document.getElementById('rc-create-boedate').value = '2026-09-04';
      document.getElementById('rc-create-cleardate').value = '2026-09-04';
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

    // Save GS CHEM ORDERS CREATE form
    createForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = editIdInput.value;
      const plant = document.getElementById('rc-create-plant').value;
      const pono = document.getElementById('rc-create-pono').value;
      const chem = document.getElementById('rc-create-chem').value;
      const blno = document.getElementById('rc-create-blno').value;
      const containerno = document.getElementById('rc-create-containerno').value;
      const bags = parseInt(document.getElementById('rc-create-bags').value) || 0;
      const qty = parseInt(document.getElementById('rc-create-qty').value) || (bags * 25);
      const boeno = document.getElementById('rc-create-boeno').value;
      const boedateRaw = document.getElementById('rc-create-boedate').value;
      const cleardateRaw = document.getElementById('rc-create-cleardate').value;

      const fmtDate = (d) => {
        if (!d) return '';
        const parts = d.split('-');
        if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
        return d;
      };

      if (editId) {
        const idx = this.receivedChemicalsList.findIndex(x => x.id === editId);
        if (idx !== -1) {
          this.receivedChemicalsList[idx] = {
            ...this.receivedChemicalsList[idx],
            plant: plant,
            poNo: pono,
            chemical: chem,
            blNo: blno,
            containerNo: containerno,
            receivedBags: bags,
            receivedQty: qty,
            boeNo: boeno,
            boeDate: fmtDate(boedateRaw),
            clearedDate: fmtDate(cleardateRaw)
          };
          if (window.Toast) window.Toast.show(`Inward order ${pono} updated successfully`, 'success');
        }
      } else {
        const newRecord = {
          id: 'RC-' + String(Date.now()).slice(-6),
          sNo: this.receivedChemicalsList.length + 1,
          plant: plant,
          poNo: pono,
          chemical: chem,
          blNo: blno,
          containerNo: containerno,
          receivedBags: bags,
          receivedQty: qty,
          boeNo: boeno,
          boeDate: fmtDate(boedateRaw),
          clearedDate: fmtDate(cleardateRaw),
          balanceBags: bags,
          balanceQuantity: qty,
          status: 'PENDING',
          year: '2026-27'
        };
        this.receivedChemicalsList.unshift(newRecord);
        if (window.Toast) window.Toast.show(`New chemical inward order ${pono} recorded`, 'success');
      }

      hideCreateCard();
      renderTable(tableSearch?.value || '');
    });

    // Excel Export
    btnExportExcel?.addEventListener('click', () => {
      const headers = ["S.NO", "PoNo", "Chemical", "BL No", "Container No", "Received Bags", "Received Quantity", "Bill of Entry No", "Bill of Entry Date", "Cleared Date", "Balance Bags", "Balance Quantity", "Status"];
      const rows = this.receivedChemicalsList.map((r, i) => [
        i + 1,
        `"${r.poNo || ''}"`,
        `"${r.chemical || ''}"`,
        `"${r.blNo || ''}"`,
        `"${r.containerNo || ''}"`,
        `"${r.receivedBags || ''}"`,
        `"${r.receivedQty || ''}"`,
        `"${r.boeNo || ''}"`,
        `"${r.boeDate || ''}"`,
        `"${r.clearedDate || ''}"`,
        `"${r.balanceBags || ''}"`,
        `"${r.balanceQuantity || r.balanceQty || ''}"`,
        `"${r.status || ''}"`
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `received_chemicals_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (window.Toast) window.Toast.show('Received chemicals report exported to CSV', 'success');
    });
  },'''

def update_file(filepath):
    print(f"Updating {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern matches from renderReceivedChemicals(container) { to renderChemicalsConsumption(container)
    pattern = r'  renderReceivedChemicals\(container\)\s*\{[\s\S]*?\n  \},\s*\n\s*renderChemicalsConsumption\(container\)'
    
    replacement = RECEIVED_CHEMICALS_CODE + '\n\n  renderChemicalsConsumption(container)'
    
    new_content, count = re.subn(pattern, replacement, content, count=1)
    if count == 0:
        print(f"  ❌ Failed to replace renderReceivedChemicals in {filepath}")
        sys.exit(1)
    else:
        print(f"  ✓ Successfully replaced renderReceivedChemicals in {filepath}")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

def main():
    for f in TARGET_FILES:
        update_file(f)
    print("\nAll files successfully updated with pixel-accurate Received Chemicals implementation!")

if __name__ == '__main__':
    main()
