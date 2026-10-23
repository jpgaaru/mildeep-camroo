"""
Implement pixel-accurate Chemical Pos screen & GS CHEM PO CREATE form matching user screenshots
across js/views/preprocessingView.js, standalone.html, and miledeep-devi-fisheries.html.
"""

import re
import sys

TARGET_FILES = [
    'js/views/preprocessingView.js',
    'standalone.html',
    'miledeep-devi-fisheries.html'
]

CHEMICAL_POS_CODE = '''  renderChemicalPos(container) {
    if (!this.chemicalPosList || this.chemicalPosList.length === 0 || !this.chemicalPosList.some(x => x.poNo === 'DFL/KPL/2627/004')) {
      this.chemicalPosList = [
        { id: "CPO-01", sNo: 1, supplierName: "KPL INTERNATIONAL LTD", poNo: "DFL/KPL/2627/004", poDate: "06-10-2026", chemicals: "", portName: "INPRT - PARADIP GARH", modeOfImport: "HSS", qtyBags: "", qtyKgs: "", totalAmount: "", etdDate: "", etaDate: "", remarks: "" },
        { id: "CPO-02", sNo: 2, supplierName: "ADWIK IMPEX,", poNo: "DFL/2627/003", poDate: "25-09-2026", chemicals: "", portName: "INKAK1 - KAKINADA", modeOfImport: "HSS", qtyBags: "", qtyKgs: "", totalAmount: "", etdDate: "30-09-2026", etaDate: "29-10-2026", remarks: "no" },
        { id: "CPO-03", sNo: 3, supplierName: "KPL INTERNATIONAL LTD", poNo: "DFL/KPL/2627/003", poDate: "07-09-2026", chemicals: "ALTESA NEO S100 (NP)", portName: "", modeOfImport: "HSS_BOND", qtyBags: "240", qtyKgs: "4800", totalAmount: "868800", etdDate: "", etaDate: "", remarks: "" },
        { id: "CPO-04", sNo: 4, supplierName: "PRAYON PHOSPHATES", poNo: "DFL/PP/2627/002", poDate: "18-08-2026", chemicals: "CARFOSEL B 940 (STPP)", portName: "INVTZ1 - VISAKHAPATNAM", modeOfImport: "DIRECT IMPORT", qtyBags: "400", qtyKgs: "10000", totalAmount: "1650000", etdDate: "25-08-2026", etaDate: "15-09-2026", remarks: "Standard pass" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">CHEMICAL POS</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Purchase Order Tracking</span>
        </div>

        <!-- Upper Card: Filters Card (Matching Screenshot 1) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form id="cpo-filter-form" class="space-y-4">
            <!-- Row 1: 4 Dropdowns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SUPPLIER</label>
                <select id="cpo-filter-supplier" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All" selected>All</option>
                  <option value="KPL INTERNATIONAL LTD">KPL INTERNATIONAL LTD</option>
                  <option value="ADWIK IMPEX,">ADWIK IMPEX,</option>
                  <option value="PRAYON PHOSPHATES">PRAYON PHOSPHATES</option>
                  <option value="ICL FOOD SPECIALTIES">ICL FOOD SPECIALTIES</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PO NO</label>
                <select id="cpo-filter-pono" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All" selected>All</option>
                  <option value="DFL/KPL/2627/004">DFL/KPL/2627/004</option>
                  <option value="DFL/2627/003">DFL/2627/003</option>
                  <option value="DFL/KPL/2627/003">DFL/KPL/2627/003</option>
                  <option value="DFL/PP/2627/002">DFL/PP/2627/002</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CHEMICAL</label>
                <select id="cpo-filter-chemical" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All" selected>All</option>
                  <option value="ALTESA NEO S100 (NP)">ALTESA NEO S100 (NP)</option>
                  <option value="CARNAL 659 S ADVANCED (STPP)">CARNAL 659 S ADVANCED (STPP)</option>
                  <option value="CARFOSEL B 940 (STPP)">CARFOSEL B 940 (STPP)</option>
                  <option value="BEKAPLUS FS (BLEND)">BEKAPLUS FS (BLEND)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PORT</label>
                <select id="cpo-filter-port" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All" selected>All</option>
                  <option value="INPRT - PARADIP GARH">INPRT - PARADIP GARH</option>
                  <option value="INKAK1 - KAKINADA">INKAK1 - KAKINADA</option>
                  <option value="INVTZ1 - VISAKHAPATNAM">INVTZ1 - VISAKHAPATNAM</option>
                  <option value="INMAA1 - CHENNAI">INMAA1 - CHENNAI</option>
                </select>
              </div>
            </div>

            <!-- Row 2: 4 Columns (YEAR) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="cpo-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="2026-27" selected>2026-27</option>
                  <option value="2025-26">2025-26</option>
                  <option value="2024-25">2024-25</option>
                </select>
              </div>
            </div>

            <!-- Centered Action Buttons (Matching Screenshot 1) -->
            <div class="flex items-center justify-center gap-3 pt-2">
              <button type="button" id="cpo-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <span>Search</span>
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
              <button type="button" id="cpo-btn-add-po" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                <span>+ Add PO</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Create/Edit Form Card: GS CHEM PO CREATE (Matching Screenshot 2) -->
        <div id="cpo-create-card" class="hidden bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all animate-fade-in">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#E2E8F0]">
            <h3 id="cpo-create-title" class="text-xs md:text-sm font-bold text-[#1E293B] uppercase tracking-wide">GS CHEM PO CREATE</h3>
            <button type="button" id="cpo-card-close-x" class="text-[#64748B] hover:text-[#1E293B] text-lg font-bold cursor-pointer transition-colors">&times;</button>
          </div>
          <form id="cpo-create-form" class="space-y-4">
            <input type="hidden" id="cpo-edit-id" value="">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SUPPLIER <span class="text-red-500 font-bold">*</span></label>
                <select id="cpo-create-supplier" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All">All</option>
                  <option value="KPL INTERNATIONAL LTD" selected>KPL INTERNATIONAL LTD</option>
                  <option value="ADWIK IMPEX,">ADWIK IMPEX,</option>
                  <option value="PRAYON PHOSPHATES">PRAYON PHOSPHATES</option>
                  <option value="ICL FOOD SPECIALTIES">ICL FOOD SPECIALTIES</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PORT NAME</label>
                <select id="cpo-create-port" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="INPRT - PARADIP GARH" selected>INPRT - PARADIP GARH</option>
                  <option value="INKAK1 - KAKINADA">INKAK1 - KAKINADA</option>
                  <option value="INVTZ1 - VISAKHAPATNAM">INVTZ1 - VISAKHAPATNAM</option>
                  <option value="INMAA1 - CHENNAI">INMAA1 - CHENNAI</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">MODE OF IMPORT <span class="text-red-500 font-bold">*</span></label>
                <select id="cpo-create-mode" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="HSS" selected>HSS</option>
                  <option value="HSS_BOND">HSS_BOND</option>
                  <option value="DIRECT IMPORT">DIRECT IMPORT</option>
                  <option value="BOND TRANSFER">BOND TRANSFER</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PO NO <span class="text-red-500 font-bold">*</span></label>
                <input type="text" id="cpo-create-pono" placeholder="Enter Po NO" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Row 2: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PO DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="cpo-create-podate" required value="2026-10-23" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ETA DATE</label>
                <input type="date" id="cpo-create-etadate" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ETD DATE</label>
                <input type="date" id="cpo-create-etddate" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REMARKS</label>
                <input type="text" id="cpo-create-remarks" placeholder="Enter Remarks" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Centered Buttons: Close & Save (Matching Screenshot 2) -->
            <div class="flex items-center justify-center gap-3 pt-2">
              <button type="button" id="cpo-btn-close-form" class="px-6 py-2 bg-[#F43F5E] hover:bg-[#E11D48] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Close
              </button>
              <button type="submit" id="cpo-btn-save-form" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Save
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Register Table with Search & Excel Export (Matching Screenshot 1) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
              <input type="text" id="cpo-table-search" placeholder="Search..." class="w-full pl-9 pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <button type="button" id="cpo-btn-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.NO</th>
                  <th class="py-2.5 px-3">Supplier Name</th>
                  <th class="py-2.5 px-3">PoNo</th>
                  <th class="py-2.5 px-3">PO Date</th>
                  <th class="py-2.5 px-3">Chemicals</th>
                  <th class="py-2.5 px-3">Port Name</th>
                  <th class="py-2.5 px-3">Mode of Import</th>
                  <th class="py-2.5 px-3 text-right">Quantity(Bags)</th>
                  <th class="py-2.5 px-3 text-right">Quantity(KGs)</th>
                  <th class="py-2.5 px-3 text-right">Total Amount</th>
                  <th class="py-2.5 px-3">ETD Date</th>
                  <th class="py-2.5 px-3">ETA Date</th>
                  <th class="py-2.5 px-3">Remarks</th>
                  <th class="py-2.5 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="cpo-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>

        <!-- Add Chemical Line Modal -->
        <div id="cpo-line-modal" class="hidden fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div class="bg-white rounded-xl shadow-xl border border-[#CBD5E1] w-full max-w-md p-5 space-y-4 animate-fade-in">
            <div class="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <h4 class="text-xs font-bold text-[#1E293B] uppercase">Add / Update Chemical Specification</h4>
              <button type="button" id="cpo-line-close" class="text-[#64748B] hover:text-[#1E293B] text-lg font-bold cursor-pointer">&times;</button>
            </div>
            <form id="cpo-line-form" class="space-y-3">
              <input type="hidden" id="cpo-line-target-id" value="">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">Chemical Specification</label>
                <select id="cpo-line-chem" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  <option value="ALTESA NEO S100 (NP)">ALTESA NEO S100 (NP)</option>
                  <option value="CARNAL 659 S ADVANCED (STPP)">CARNAL 659 S ADVANCED (STPP)</option>
                  <option value="CARFOSEL B 940 (STPP)">CARFOSEL B 940 (STPP)</option>
                  <option value="BEKAPLUS FS (BLEND)">BEKAPLUS FS (BLEND)</option>
                </select>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">Quantity (Bags)</label>
                  <input type="number" id="cpo-line-bags" value="240" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">Quantity (KGs)</label>
                  <input type="number" id="cpo-line-kgs" value="4800" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                </div>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">Total Amount (INR)</label>
                <input type="number" id="cpo-line-amount" value="868800" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              </div>
              <div class="flex items-center justify-end gap-2 pt-2">
                <button type="button" id="cpo-line-cancel" class="px-4 py-1.5 bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#334155] text-xs font-semibold rounded-lg cursor-pointer">Cancel</button>
                <button type="submit" class="px-5 py-1.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg cursor-pointer">Save Line</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('cpo-table-body');
    const tableSearch = document.getElementById('cpo-table-search');
    const createCard = document.getElementById('cpo-create-card');
    const createForm = document.getElementById('cpo-create-form');
    const createTitle = document.getElementById('cpo-create-title');
    const editIdInput = document.getElementById('cpo-edit-id');
    const btnAddPo = document.getElementById('cpo-btn-add-po');
    const btnCloseForm = document.getElementById('cpo-btn-close-form');
    const btnCloseX = document.getElementById('cpo-card-close-x');
    const btnSearch = document.getElementById('cpo-btn-search');
    const btnExportExcel = document.getElementById('cpo-btn-export-excel');

    const filterSupplier = document.getElementById('cpo-filter-supplier');
    const filterPono = document.getElementById('cpo-filter-pono');
    const filterChemical = document.getElementById('cpo-filter-chemical');
    const filterPort = document.getElementById('cpo-filter-port');

    // Line modal elements
    const lineModal = document.getElementById('cpo-line-modal');
    const lineForm = document.getElementById('cpo-line-form');
    const lineTargetId = document.getElementById('cpo-line-target-id');
    const lineClose = document.getElementById('cpo-line-close');
    const lineCancel = document.getElementById('cpo-line-cancel');

    const renderTable = (query = '') => {
      const q = (query || '').toLowerCase().trim();
      const supFilter = filterSupplier?.value || 'All';
      const poFilter = filterPono?.value || 'All';
      const chemFilter = filterChemical?.value || 'All';
      const portFilter = filterPort?.value || 'All';

      const filtered = this.chemicalPosList.filter(r => {
        if (supFilter !== 'All' && r.supplierName !== supFilter) return false;
        if (poFilter !== 'All' && r.poNo !== poFilter) return false;
        if (chemFilter !== 'All' && r.chemicals !== chemFilter) return false;
        if (portFilter !== 'All' && r.portName !== portFilter) return false;

        if (!q) return true;
        const text = `${r.supplierName || ''} ${r.poNo || ''} ${r.chemicals || ''} ${r.portName || ''} ${r.modeOfImport || ''} ${r.remarks || ''}`.toLowerCase();
        return text.includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="14" class="py-8 text-center text-xs text-[#64748B]">
              No chemical purchase orders match the selected filters.
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = filtered.map((r, i) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#E2E8F0]">
          <td class="py-2.5 px-3 font-semibold text-[#64748B]">${i + 1}</td>
          <td class="py-2.5 px-3 font-medium text-[#1E293B]">${r.supplierName || ''}</td>
          <td class="py-2.5 px-3 font-mono font-medium text-[#1E293B]">${r.poNo || ''}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.poDate || ''}</td>
          <td class="py-2.5 px-3 text-[#1E293B] font-medium">${r.chemicals || ''}</td>
          <td class="py-2.5 px-3 text-[#475569]">${r.portName || ''}</td>
          <td class="py-2.5 px-3 font-semibold text-[#1E293B]">${r.modeOfImport || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.qtyBags || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.qtyKgs || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.totalAmount || ''}</td>
          <td class="py-2.5 px-3 text-[#475569]">${r.etdDate || ''}</td>
          <td class="py-2.5 px-3 text-[#475569]">${r.etaDate || ''}</td>
          <td class="py-2.5 px-3 text-[#475569]">${r.remarks || ''}</td>
          <td class="py-2.5 px-3 text-center">
            <div class="inline-flex items-center justify-center gap-1.5">
              <!-- Edit Icon (Pencil) -->
              <button type="button" title="Edit PO" class="cpo-action-edit p-1 text-[#0284C7] hover:text-[#02a8b5] hover:bg-[#F0F9FF] rounded transition-colors cursor-pointer" data-id="${r.id}">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
              </button>
              <!-- Plus Icon (Add Chemical Line) -->
              <button type="button" title="Add Line Items" class="cpo-action-addline p-1 text-[#0284C7] hover:text-[#02a8b5] hover:bg-[#F0F9FF] rounded transition-colors cursor-pointer" data-id="${r.id}">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              </button>
              <!-- Print Icon (Printer) -->
              <button type="button" title="Print PO" class="cpo-action-print p-1 text-[#0284C7] hover:text-[#02a8b5] hover:bg-[#F0F9FF] rounded transition-colors cursor-pointer" data-id="${r.id}">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              </button>
              <!-- Document Icon -->
              <button type="button" title="View Document" class="cpo-action-doc p-1 text-[#0284C7] hover:text-[#02a8b5] hover:bg-[#F0F9FF] rounded transition-colors cursor-pointer" data-id="${r.id}">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('');

      // Attach row action handlers
      tbody.querySelectorAll('.cpo-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.chemicalPosList.find(x => x.id === id);
          if (!rec) return;
          createTitle.textContent = `GS CHEM PO EDIT - ${rec.poNo}`;
          editIdInput.value = rec.id;
          document.getElementById('cpo-create-supplier').value = rec.supplierName || 'All';
          document.getElementById('cpo-create-port').value = rec.portName || '';
          document.getElementById('cpo-create-mode').value = rec.modeOfImport || 'HSS';
          document.getElementById('cpo-create-pono').value = rec.poNo || '';
          document.getElementById('cpo-create-remarks').value = rec.remarks || '';
          
          // Format date to yyyy-mm-dd for input[type=date]
          if (rec.poDate && rec.poDate.includes('-')) {
            const parts = rec.poDate.split('-');
            if (parts[0].length === 2) {
              document.getElementById('cpo-create-podate').value = `${parts[2]}-${parts[1]}-${parts[0]}`;
            } else {
              document.getElementById('cpo-create-podate').value = rec.poDate;
            }
          }
          if (rec.etaDate && rec.etaDate.includes('-')) {
            const parts = rec.etaDate.split('-');
            if (parts[0].length === 2) {
              document.getElementById('cpo-create-etadate').value = `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
          }
          if (rec.etdDate && rec.etdDate.includes('-')) {
            const parts = rec.etdDate.split('-');
            if (parts[0].length === 2) {
              document.getElementById('cpo-create-etddate').value = `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
          }

          createCard.classList.remove('hidden');
          createCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      });

      tbody.querySelectorAll('.cpo-action-addline').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.chemicalPosList.find(x => x.id === id);
          if (!rec) return;
          lineTargetId.value = rec.id;
          if (rec.chemicals) document.getElementById('cpo-line-chem').value = rec.chemicals;
          if (rec.qtyBags) document.getElementById('cpo-line-bags').value = rec.qtyBags;
          if (rec.qtyKgs) document.getElementById('cpo-line-kgs').value = rec.qtyKgs;
          if (rec.totalAmount) document.getElementById('cpo-line-amount').value = rec.totalAmount;
          lineModal.classList.remove('hidden');
        });
      });

      tbody.querySelectorAll('.cpo-action-print').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.chemicalPosList.find(x => x.id === id);
          if (window.Toast) window.Toast.show(`Printing Purchase Order ${rec?.poNo || ''}...`, 'info');
        });
      });

      tbody.querySelectorAll('.cpo-action-doc').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.chemicalPosList.find(x => x.id === id);
          if (window.Toast) window.Toast.show(`Viewing Order Document for ${rec?.poNo || ''}`, 'info');
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
      if (window.Toast) window.Toast.show('Applied chemical PO filters', 'info');
    });

    // Toggle GS CHEM PO CREATE card
    btnAddPo?.addEventListener('click', () => {
      createTitle.textContent = 'GS CHEM PO CREATE';
      editIdInput.value = '';
      createForm.reset();
      document.getElementById('cpo-create-podate').value = new Date().toISOString().slice(0, 10);
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

    // Save GS CHEM PO CREATE form
    createForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = editIdInput.value;
      const supplier = document.getElementById('cpo-create-supplier').value;
      const port = document.getElementById('cpo-create-port').value;
      const mode = document.getElementById('cpo-create-mode').value;
      const pono = document.getElementById('cpo-create-pono').value;
      const podateRaw = document.getElementById('cpo-create-podate').value;
      const etadateRaw = document.getElementById('cpo-create-etadate').value;
      const etddateRaw = document.getElementById('cpo-create-etddate').value;
      const remarks = document.getElementById('cpo-create-remarks').value;

      const fmtDate = (d) => {
        if (!d) return '';
        const parts = d.split('-');
        if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
        return d;
      };

      if (editId) {
        const idx = this.chemicalPosList.findIndex(x => x.id === editId);
        if (idx !== -1) {
          this.chemicalPosList[idx] = {
            ...this.chemicalPosList[idx],
            supplierName: supplier,
            portName: port,
            modeOfImport: mode,
            poNo: pono,
            poDate: fmtDate(podateRaw),
            etaDate: fmtDate(etadateRaw),
            etdDate: fmtDate(etddateRaw),
            remarks: remarks
          };
          if (window.Toast) window.Toast.show(`Chemical PO ${pono} updated successfully`, 'success');
        }
      } else {
        const newRecord = {
          id: 'CPO-' + String(Date.now()).slice(-6),
          sNo: this.chemicalPosList.length + 1,
          supplierName: supplier,
          poNo: pono,
          poDate: fmtDate(podateRaw),
          chemicals: '',
          portName: port,
          modeOfImport: mode,
          qtyBags: '',
          qtyKgs: '',
          totalAmount: '',
          etdDate: fmtDate(etddateRaw),
          etaDate: fmtDate(etadateRaw),
          remarks: remarks
        };
        this.chemicalPosList.unshift(newRecord);
        if (window.Toast) window.Toast.show(`New Chemical PO ${pono} created successfully`, 'success');
      }

      hideCreateCard();
      renderTable(tableSearch?.value || '');
    });

    // Line modal actions
    lineClose?.addEventListener('click', () => lineModal.classList.add('hidden'));
    lineCancel?.addEventListener('click', () => lineModal.classList.add('hidden'));
    lineForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const targetId = lineTargetId.value;
      const rec = this.chemicalPosList.find(x => x.id === targetId);
      if (rec) {
        rec.chemicals = document.getElementById('cpo-line-chem').value;
        rec.qtyBags = document.getElementById('cpo-line-bags').value;
        rec.qtyKgs = document.getElementById('cpo-line-kgs').value;
        rec.totalAmount = document.getElementById('cpo-line-amount').value;
        lineModal.classList.add('hidden');
        renderTable(tableSearch?.value || '');
        if (window.Toast) window.Toast.show(`Chemical line added to ${rec.poNo}`, 'success');
      }
    });

    // Excel Export
    btnExportExcel?.addEventListener('click', () => {
      const headers = ["S.NO", "Supplier Name", "PoNo", "PO Date", "Chemicals", "Port Name", "Mode of Import", "Quantity(Bags)", "Quantity(KGs)", "Total Amount", "ETD Date", "ETA Date", "Remarks"];
      const rows = this.chemicalPosList.map((r, i) => [
        i + 1,
        `"${r.supplierName || ''}"`,
        `"${r.poNo || ''}"`,
        `"${r.poDate || ''}"`,
        `"${r.chemicals || ''}"`,
        `"${r.portName || ''}"`,
        `"${r.modeOfImport || ''}"`,
        `"${r.qtyBags || ''}"`,
        `"${r.qtyKgs || ''}"`,
        `"${r.totalAmount || ''}"`,
        `"${r.etdDate || ''}"`,
        `"${r.etaDate || ''}"`,
        `"${(r.remarks || '').replace(/"/g, '""')}"`
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `chemical_pos_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (window.Toast) window.Toast.show('Chemical POs report exported to CSV', 'success');
    });
  },'''

def update_file(filepath):
    print(f"Updating {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern matches from renderChemicalPos(container) { to renderReceivedChemicals(container)
    pattern = r'  renderChemicalPos\(container\)\s*\{[\s\S]*?\n  \},\s*\n\s*renderReceivedChemicals\(container\)'
    
    replacement = CHEMICAL_POS_CODE + '\n\n  renderReceivedChemicals(container)'
    
    new_content, count = re.subn(pattern, replacement, content, count=1)
    if count == 0:
        print(f"  ❌ Failed to replace renderChemicalPos in {filepath}")
        sys.exit(1)
    else:
        print(f"  ✓ Successfully replaced renderChemicalPos in {filepath}")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

def main():
    for f in TARGET_FILES:
        update_file(f)
    print("\nAll files successfully updated with pixel-accurate Chemical Pos implementation!")

if __name__ == '__main__':
    main()
