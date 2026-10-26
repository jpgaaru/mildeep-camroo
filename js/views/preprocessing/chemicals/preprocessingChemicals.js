// Pre-processing Module — Chemical Inventory & Reports
export const preprocessingChemicals = {
  // ============================================
  // 2. CHEMICAL INVENTORY & USAGE (FIXES IMAGE 1)
  // ============================================
  renderChemicalPos(container) {
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
        <!-- Page Title Header with Right-Aligned Action Button -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">CHEMICAL POS</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Purchase Order Tracking</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="cpo-btn-add-po" onclick="(window.PreprocessingView || PreprocessingView).openChemPOModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add PO</span>
            </button>
          </div>
        </div>

        <!-- Upper Card: Filters Card with SEARCH & FILTERS Header -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
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

            <!-- Bottom-Right Search Button -->
            <div class="flex justify-end pt-1">
              <button type="button" id="cpo-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        

        <!-- Lower Card: Register Table with Search & Excel Export (Matching Screenshot 1) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </div>
  <input type="text" id="cpo-table-search" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
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
          if (typeof this !== 'undefined' && this.openChemPOModal) {
            this.openChemPOModal(rec);
          } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemPOModal) {
            PreprocessingView.openChemPOModal(rec);
          } else if (window.PreprocessingView && window.PreprocessingView.openChemPOModal) {
            window.PreprocessingView.openChemPOModal(rec);
          }
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
      if (typeof this !== 'undefined' && this.openChemPOModal) {
        this.openChemPOModal();
      } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemPOModal) {
        PreprocessingView.openChemPOModal();
      } else if (window.PreprocessingView && window.PreprocessingView.openChemPOModal) {
        window.PreprocessingView.openChemPOModal();
      }
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
  },

  renderReceivedChemicals(container) {
    if (!this.receivedChemicalsList || this.receivedChemicalsList.length === 0 || !this.receivedChemicalsList.some(x => x.poNo === 'DFL/CFB/2627/003')) {
      this.receivedChemicalsList = [
        { id: "RC-01", sNo: 1, poNo: "DFL/CFB/2627/003", chemical: "CARNAL 659 S ADVANCED (STPP)", blNo: "", containerNo: "", receivedBags: 800, receivedQty: 20000, boeNo: "", boeDate: "04-09-2026", clearedDate: "04-09-2026", balanceBags: 4000, balanceQty: 100000, status: "PENDING", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "RC-02", sNo: 2, poNo: "DFL/CFB/2627/002", chemical: "CARNAL 659 S ADVANCED (STPP)", blNo: "", containerNo: "", receivedBags: 800, receivedQty: 20000, boeNo: "", boeDate: "23-08-2026", clearedDate: "23-08-2026", balanceBags: 1600, balanceQty: 40000, status: "PENDING", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "RC-03", sNo: 3, poNo: "DFL/KPL/2627/004", chemical: "ALTESA NEO S100 (NP)", blNo: "BL-2026-991", containerNo: "TGCU8812301", receivedBags: 320, receivedQty: 8000, boeNo: "BOE-84721", boeDate: "06-10-2026", clearedDate: "08-10-2026", balanceBags: 0, balanceQty: 0, status: "CLEARED", plant: "KKD-DFL UNIT-2 (KKD)", year: "2026-27" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title Header with Right-Aligned Action Button -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">RECEIVED CHEMICALS</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Inward Orders & Dock Clearance</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="rc-btn-add-order" onclick="(window.PreprocessingView || PreprocessingView).openChemOrderModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Order</span>
            </button>
          </div>
        </div>

        <!-- Upper Card: Filters Card with SEARCH & FILTERS Header -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
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

            <!-- Bottom-Right Action Buttons -->
            <div class="flex justify-end items-center gap-2 pt-1">
              <button type="button" id="rc-btn-more-search" class="px-4 py-2 border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#475569] text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer">More Search</button>
              <button type="button" id="rc-btn-load-all" class="px-4 py-2 border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#475569] text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer">Load All</button>
              <button type="button" id="rc-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
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
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </div>
  <input type="text" id="rc-table-search" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
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
          if (typeof this !== 'undefined' && this.openChemOrderModal) {
            this.openChemOrderModal(rec);
          } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemOrderModal) {
            PreprocessingView.openChemOrderModal(rec);
          } else if (window.PreprocessingView && window.PreprocessingView.openChemOrderModal) {
            window.PreprocessingView.openChemOrderModal(rec);
          }
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
      if (typeof this !== 'undefined' && this.openChemOrderModal) {
        this.openChemOrderModal();
      } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemOrderModal) {
        PreprocessingView.openChemOrderModal();
      } else if (window.PreprocessingView && window.PreprocessingView.openChemOrderModal) {
        window.PreprocessingView.openChemOrderModal();
      }
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
  },

  renderChemicalsConsumption(container) {
    if (!this.chemicalsConsumptionList || this.chemicalsConsumptionList.length === 0 || !this.chemicalsConsumptionList.some(x => x.openingBags === 2751)) {
      this.chemicalsConsumptionList = [
        { id: "CC-01", sNo: 1, date: "01-04-2025", chemical: "CARNAL 659 S ADVANCED (STPP)", plant: "DFL UNIT-5 (JPT)", receivedFrom: "", receivedBags: "", receivedKgs: "", sendedTo: "", sendedBags: "", sendedKgs: "", usedBags: "", usedKgs: "", openingBags: 2751, openingKgs: 68775, closingBags: 2751, closingKgs: 68775 },
        { id: "CC-02", sNo: 2, date: "02-04-2025", chemical: "CARNAL 659 S ADVANCED (STPP)", plant: "DFL UNIT-5 (JPT)", receivedFrom: "", receivedBags: "", receivedKgs: "", sendedTo: "", sendedBags: "", sendedKgs: "", usedBags: 10, usedKgs: 250, openingBags: 2751, openingKgs: 68775, closingBags: 2741, closingKgs: 68525 },
        { id: "CC-03", sNo: 3, date: "03-04-2025", chemical: "CARNAL 659 S ADVANCED (STPP)", plant: "DFL UNIT-5 (JPT)", receivedFrom: "", receivedBags: "", receivedKgs: "", sendedTo: "", sendedBags: "", sendedKgs: "", usedBags: 25, usedKgs: 625, openingBags: 2741, openingKgs: 68525, closingBags: 2716, closingKgs: 67900 },
        { id: "CC-04", sNo: 4, date: "04-04-2025", chemical: "CARNAL 659 S ADVANCED (STPP)", plant: "DFL UNIT-5 (JPT)", receivedFrom: "", receivedBags: "", receivedKgs: "", sendedTo: "", sendedBags: "", sendedKgs: "", usedBags: "", usedKgs: "", openingBags: 2716, openingKgs: 67900, closingBags: 2716, closingKgs: 67900 },
        { id: "CC-05", sNo: 5, date: "05-04-2025", chemical: "CARNAL 659 S ADVANCED (STPP)", plant: "DFL UNIT-5 (JPT)", receivedFrom: "", receivedBags: "", receivedKgs: "", sendedTo: "", sendedBags: "", sendedKgs: "", usedBags: 10, usedKgs: 250, openingBags: 2716, openingKgs: 67900, closingBags: 2706, closingKgs: 67650 },
        { id: "CC-06", sNo: 6, date: "06-04-2025", chemical: "CARNAL 659 S ADVANCED (STPP)", plant: "DFL UNIT-5 (JPT)", receivedFrom: "", receivedBags: "", receivedKgs: "", sendedTo: "", sendedBags: "", sendedKgs: "", usedBags: 10, usedKgs: 250, openingBags: 2706, openingKgs: 67650, closingBags: 2696, closingKgs: 67400 },
        { id: "CC-07", sNo: 7, date: "07-04-2025", chemical: "CARNAL 659 S ADVANCED (STPP)", plant: "DFL UNIT-5 (JPT)", receivedFrom: "", receivedBags: "", receivedKgs: "", sendedTo: "", sendedBags: "", sendedKgs: "", usedBags: 12, usedKgs: 300, openingBags: 2696, openingKgs: 67400, closingBags: 2684, closingKgs: 67100 },
        { id: "CC-08", sNo: 8, date: "08-04-2025", chemical: "CARNAL 659 S ADVANCED (STPP)", plant: "DFL UNIT-5 (JPT)", receivedFrom: "", receivedBags: "", receivedKgs: "", sendedTo: "", sendedBags: "", sendedKgs: "", usedBags: 15, usedKgs: 375, openingBags: 2684, openingKgs: 67100, closingBags: 2669, closingKgs: 66725 },
        { id: "CC-09", sNo: 9, date: "09-04-2025", chemical: "CARNAL 659 S ADVANCED (STPP)", plant: "DFL UNIT-5 (JPT)", receivedFrom: "", receivedBags: "", receivedKgs: "", sendedTo: "", sendedBags: "", sendedKgs: "", usedBags: 20, usedKgs: 500, openingBags: 2669, openingKgs: 66725, closingBags: 2649, closingKgs: 66225 }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title Header with Right-Aligned Action Button -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">CHEMICALS CONSUMPTION</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Floor Usage & Transfer Register</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="cc-btn-add-consumption" onclick="(window.PreprocessingView || PreprocessingView).openChemConsumptionModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Consumption</span>
            </button>
          </div>
        </div>

        <!-- Upper Card: Filters Card with SEARCH & FILTERS Header -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="cc-filter-form" class="space-y-4">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT</label>
                <select id="cc-filter-plant" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="DFL UNIT-5 (JPT)" selected>DFL UNIT-5 (JPT)</option>
                  <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                  <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                  <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                  <option value="">All Plants</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CHEMICAL</label>
                <select id="cc-filter-chem" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="CARNAL 659 S ADVANCED (STPP)" selected>CARNAL 659 S ADVANCED (STPP)</option>
                  <option value="ALTESA NEO S100 (NP)">ALTESA NEO S100 (NP)</option>
                  <option value="CARFOSEL B 940 (STPP)">CARFOSEL B 940 (STPP)</option>
                  <option value="BEKAPLUS FS (BLEND)">BEKAPLUS FS (BLEND)</option>
                  <option value="">All Chemicals</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">FROM DATE</label>
                <input type="date" id="cc-filter-from-date" value="2025-04-01" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TO DATE</label>
                <input type="date" id="cc-filter-to-date" value="2025-05-31" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Bottom-Right Search Button -->
            <div class="flex justify-end pt-1">
              <button type="button" id="cc-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        

        <!-- Lower Card: Register Table with Search & Excel Export (Matching Screenshot 1) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </div>
  <input type="text" id="cc-table-search" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
</div>
            <button type="button" id="cc-btn-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.NO</th>
                  <th class="py-2.5 px-3">Date</th>
                  <th class="py-2.5 px-3">Chemical</th>
                  <th class="py-2.5 px-3">Received From</th>
                  <th class="py-2.5 px-3 text-right">Received Qty In bags</th>
                  <th class="py-2.5 px-3 text-right">Received Qty In Kgs</th>
                  <th class="py-2.5 px-3">Sended To</th>
                  <th class="py-2.5 px-3 text-right">Sended In Bags</th>
                  <th class="py-2.5 px-3 text-right">Sended In Kgs</th>
                  <th class="py-2.5 px-3 text-right">Used In Bags</th>
                  <th class="py-2.5 px-3 text-right">Used In KGs</th>
                  <th class="py-2.5 px-3 text-right font-extrabold text-[#02a8b5]">Opening In Bags</th>
                  <th class="py-2.5 px-3 text-right font-extrabold text-[#02a8b5]">Opening In Kgs</th>
                  <th class="py-2.5 px-3 text-right font-extrabold text-[#006644]">Closing in Bags</th>
                  <th class="py-2.5 px-3 text-right font-extrabold text-[#006644]">Closing in KGs</th>
                </tr>
              </thead>
              <tbody id="cc-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('cc-table-body');
    const tableSearch = document.getElementById('cc-table-search');
    const createCard = document.getElementById('cc-create-card');
    const createForm = document.getElementById('cc-create-form');
    const btnAddConsumption = document.getElementById('cc-btn-add-consumption');
    const btnCloseForm = document.getElementById('cc-btn-close-form');
    const btnCloseX = document.getElementById('cc-card-close-x');
    const btnSearch = document.getElementById('cc-btn-search');
    const btnExportExcel = document.getElementById('cc-btn-export-excel');

    const filterPlant = document.getElementById('cc-filter-plant');
    const filterChem = document.getElementById('cc-filter-chem');
    const filterFrom = document.getElementById('cc-filter-from-date');
    const filterTo = document.getElementById('cc-filter-to-date');

    // Auto-calculate KGs from Bags
    const bagsInput = document.getElementById('cc-create-bags');
    const qtyInput = document.getElementById('cc-create-qty');
    bagsInput?.addEventListener('input', () => {
      const b = parseInt(bagsInput.value) || 0;
      qtyInput.value = b * 25;
    });

    const renderTable = (query = '') => {
      const q = (query || '').toLowerCase().trim();
      const pVal = filterPlant?.value || '';
      const cVal = filterChem?.value || '';

      const filtered = this.chemicalsConsumptionList.filter(r => {
        if (pVal && r.plant && r.plant !== pVal) return false;
        if (cVal && r.chemical && r.chemical !== cVal) return false;

        if (!q) return true;
        const text = `${r.date || ''} ${r.chemical || ''} ${r.receivedFrom || ''} ${r.sendedTo || ''}`.toLowerCase();
        return text.includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="15" class="py-8 text-center text-xs text-[#64748B]">
              No consumption ledger entries match the selected criteria.
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = filtered.map((r, i) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#E2E8F0]">
          <td class="py-2.5 px-3 font-semibold text-[#64748B]">${i + 1}</td>
          <td class="py-2.5 px-3 font-medium text-[#1E293B]">${r.date || ''}</td>
          <td class="py-2.5 px-3 text-[#1E293B] font-medium">${r.chemical || ''}</td>
          <td class="py-2.5 px-3 text-[#64748B]">${r.receivedFrom || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.receivedBags || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.receivedKgs || ''}</td>
          <td class="py-2.5 px-3 text-[#64748B]">${r.sendedTo || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.sendedBags || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.sendedKgs || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.usedBags || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.usedKgs || ''}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#1E293B]">${r.openingBags !== undefined && r.openingBags !== '' ? r.openingBags : ''}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#1E293B]">${r.openingKgs !== undefined && r.openingKgs !== '' ? r.openingKgs : ''}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#1E293B]">${r.closingBags !== undefined && r.closingBags !== '' ? r.closingBags : ''}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#1E293B]">${r.closingKgs !== undefined && r.closingKgs !== '' ? r.closingKgs : ''}</td>
        </tr>
      `).join('');
    };

    // Initial render
    renderTable();

    // Live search
    tableSearch?.addEventListener('input', (e) => renderTable(e.target.value));

    // Filter Search
    btnSearch?.addEventListener('click', () => {
      renderTable(tableSearch?.value || '');
      if (window.Toast) window.Toast.show('Applied consumption filters', 'info');
    });

    // Toggle Create Card
    btnAddConsumption?.addEventListener('click', () => {
      if (typeof this !== 'undefined' && this.openChemConsumptionModal) {
        this.openChemConsumptionModal();
      } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemConsumptionModal) {
        PreprocessingView.openChemConsumptionModal();
      } else if (window.PreprocessingView && window.PreprocessingView.openChemConsumptionModal) {
        window.PreprocessingView.openChemConsumptionModal();
      }
    });

    const hideCreateCard = () => {
      createCard.classList.add('hidden');
      createForm.reset();
    };

    btnCloseForm?.addEventListener('click', hideCreateCard);
    btnCloseX?.addEventListener('click', hideCreateCard);

    // Save Consumption
    createForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const plant = document.getElementById('cc-create-plant').value;
      const usageType = document.getElementById('cc-create-usage').value;
      const chem = document.getElementById('cc-create-chem').value;
      const bags = parseInt(document.getElementById('cc-create-bags').value) || 0;
      const qty = parseInt(document.getElementById('cc-create-qty').value) || (bags * 25);
      const dateRaw = document.getElementById('cc-create-date').value;
      const sendTo = document.getElementById('cc-create-sendto').value;

      const fmtDate = (d) => {
        if (!d) return '';
        const parts = d.split('-');
        if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
        return d;
      };

      // Calculate new opening and closing based on last record
      const lastRec = this.chemicalsConsumptionList[this.chemicalsConsumptionList.length - 1];
      const prevClosingBags = lastRec ? (lastRec.closingBags || 2649) : 2649;
      const prevClosingKgs = lastRec ? (lastRec.closingKgs || 66225) : 66225;

      const newOpeningBags = prevClosingBags;
      const newOpeningKgs = prevClosingKgs;
      const newClosingBags = Math.max(0, newOpeningBags - bags);
      const newClosingKgs = Math.max(0, newOpeningKgs - qty);

      const newRecord = {
        id: 'CC-' + String(Date.now()).slice(-6),
        sNo: this.chemicalsConsumptionList.length + 1,
        date: fmtDate(dateRaw),
        chemical: chem,
        plant: plant,
        receivedFrom: usageType === 'Transfer In' ? sendTo : '',
        receivedBags: usageType === 'Transfer In' ? bags : '',
        receivedKgs: usageType === 'Transfer In' ? qty : '',
        sendedTo: usageType === 'Transfer Out' ? sendTo : '',
        sendedBags: usageType === 'Transfer Out' ? bags : '',
        sendedKgs: usageType === 'Transfer Out' ? qty : '',
        usedBags: usageType === 'Consumption' ? bags : '',
        usedKgs: usageType === 'Consumption' ? qty : '',
        openingBags: newOpeningBags,
        openingKgs: newOpeningKgs,
        closingBags: newClosingBags,
        closingKgs: newClosingKgs
      };

      this.chemicalsConsumptionList.push(newRecord);
      if (window.Toast) window.Toast.show(`Chemical consumption logged for ${fmtDate(dateRaw)}`, 'success');
      hideCreateCard();
      renderTable(tableSearch?.value || '');
    });

    // Excel Export
    btnExportExcel?.addEventListener('click', () => {
      const headers = ["S.NO", "Date", "Chemical", "Received From", "Received Qty In bags", "Received Qty In Kgs", "Sended To", "Sended In Bags", "Sended In Kgs", "Used In Bags", "Used In KGs", "Opening In Bags", "Opening In Kgs", "Closing in Bags", "Closing in KGs"];
      const rows = this.chemicalsConsumptionList.map((r, i) => [
        i + 1,
        `"${r.date || ''}"`,
        `"${r.chemical || ''}"`,
        `"${r.receivedFrom || ''}"`,
        `"${r.receivedBags || ''}"`,
        `"${r.receivedKgs || ''}"`,
        `"${r.sendedTo || ''}"`,
        `"${r.sendedBags || ''}"`,
        `"${r.sendedKgs || ''}"`,
        `"${r.usedBags || ''}"`,
        `"${r.usedKgs || ''}"`,
        `"${r.openingBags !== undefined ? r.openingBags : ''}"`,
        `"${r.openingKgs !== undefined ? r.openingKgs : ''}"`,
        `"${r.closingBags !== undefined ? r.closingBags : ''}"`,
        `"${r.closingKgs !== undefined ? r.closingKgs : ''}"`
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `chemicals_consumption_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (window.Toast) window.Toast.show('Chemicals consumption ledger exported to CSV', 'success');
    });
  },

  // ============================================
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
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">RECEIVED REPORT</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Intake vs Pending Fulfillment</span>
        </div>

        <!-- Upper Card: Filters Card (Matching Screenshot 1) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
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

            <div class="flex justify-end pt-1">
              <button type="button" id="crr-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Table with Toolbar -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="flex items-center flex-wrap gap-2.5 w-full sm:w-auto">
              <div class="relative w-full sm:w-64">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </div>
  <input type="text" id="crr-table-search" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
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
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">OPENING BALANCE REPORT</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Point-in-time Stock Balance</span>
        </div>

        <!-- Upper Card: Filters Card (Matching Screenshot 2) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
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

            <div class="flex justify-end pt-1">
              <button type="button" id="cob-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Table with Toolbar -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </div>
  <input type="text" id="cob-table-search" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
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
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">BALANCE REPORT</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Period Stock Reconciliation</span>
        </div>

        <!-- Upper Card: Filters Card (Matching Screenshot 3) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
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

            <div class="flex justify-end pt-1">
              <button type="button" id="cbr-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
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
        <!-- Page Title Header with Right-Aligned Action Button -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">PAYMENTS LIST</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Vendor Disbursals & Clearance Register</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="cp-btn-add-payment" onclick="(window.PreprocessingView || PreprocessingView).openChemPaymentModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Payment</span>
            </button>
          </div>
        </div>

        <!-- Upper Card: Filters Card with SEARCH & FILTERS Header -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
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

            <!-- Bottom-Right Action Buttons -->
            <div class="flex justify-end items-center gap-2 pt-1">
              <button type="button" id="cp-btn-more-search" class="px-4 py-2 border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#475569] text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer">More Search</button>
              <button type="button" id="cp-btn-load-all" class="px-4 py-2 border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#475569] text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer">Load All</button>
              <button type="button" id="cp-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        

        <!-- Lower Card: Table with Toolbar (Matching Screenshot 4) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="flex items-center flex-wrap gap-2.5 w-full sm:w-auto">
              <div class="relative w-full sm:w-64">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </div>
  <input type="text" id="cp-table-search" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
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
          if (typeof this !== 'undefined' && this.openChemPaymentModal) {
            this.openChemPaymentModal(rec);
          } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemPaymentModal) {
            PreprocessingView.openChemPaymentModal(rec);
          } else if (window.PreprocessingView && window.PreprocessingView.openChemPaymentModal) {
            window.PreprocessingView.openChemPaymentModal(rec);
          }
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
      if (typeof this !== 'undefined' && this.openChemPaymentModal) {
        this.openChemPaymentModal();
      } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemPaymentModal) {
        PreprocessingView.openChemPaymentModal();
      } else if (window.PreprocessingView && window.PreprocessingView.openChemPaymentModal) {
        window.PreprocessingView.openChemPaymentModal();
      }
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
  },


};
