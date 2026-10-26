"""
Implement pixel-accurate Chemicals Consumption screen & GS CHEM CONSUMPTION CREATE form matching user screenshots
across js/views/preprocessingView.js, standalone.html, and miledeep-devi-fisheries.html.
"""

import re
import sys

TARGET_FILES = [
    'js/views/preprocessingView.js',
    'standalone.html',
    'miledeep-devi-fisheries.html'
]

CHEMICALS_CONSUMPTION_CODE = '''  renderChemicalsConsumption(container) {
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
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">CHEMICALS CONSUMPTION</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Daily Running Inventory Ledger</span>
        </div>

        <!-- Upper Card: Filters Card (Matching Screenshot 1) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
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

            <!-- Centered Action Buttons (Matching Screenshot 1) -->
            <div class="flex items-center justify-center gap-3 pt-2">
              <button type="button" id="cc-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <span>Search</span>
                <span>&rarr;</span>
              </button>
              <button type="button" id="cc-btn-add-consumption" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                <span>+ Add Consumption</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Create/Edit Form Card: GS CHEM CONSUMPTION CREATE (Matching Screenshot 2) -->
        <div id="cc-create-card" class="hidden bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all animate-fade-in">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#E2E8F0]">
            <div>
              <div class="text-[11px] text-[#64748B] font-medium">Chemical Screens &gt; Chemicals Consumption &gt; <span class="text-[#02a8b5]">Gs Chem Consumption Create</span></div>
              <h3 id="cc-create-title" class="text-xs md:text-sm font-bold text-[#1E293B] uppercase tracking-wide mt-0.5">GS CHEM CONSUMPTION CREATE</h3>
            </div>
            <button type="button" id="cc-card-close-x" class="text-[#64748B] hover:text-[#1E293B] text-lg font-bold cursor-pointer transition-colors">&times;</button>
          </div>
          <form id="cc-create-form" class="space-y-4">
            <input type="hidden" id="cc-edit-id" value="">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT NAME <span class="text-red-500 font-bold">*</span></label>
                <select id="cc-create-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All">All</option>
                  <option value="DFL UNIT-5 (JPT)" selected>DFL UNIT-5 (JPT)</option>
                  <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                  <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                  <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">USAGE TYPE <span class="text-red-500 font-bold">*</span></label>
                <select id="cc-create-usage" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="Consumption" selected>Consumption</option>
                  <option value="Transfer Out">Transfer Out</option>
                  <option value="Transfer In">Transfer In</option>
                  <option value="Loss / Adjustment">Loss / Adjustment</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CHEMICAL NAME <span class="text-red-500 font-bold">*</span></label>
                <select id="cc-create-chem" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All">All</option>
                  <option value="CARNAL 659 S ADVANCED (STPP)" selected>CARNAL 659 S ADVANCED (STPP)</option>
                  <option value="ALTESA NEO S100 (NP)">ALTESA NEO S100 (NP)</option>
                  <option value="CARFOSEL B 940 (STPP)">CARFOSEL B 940 (STPP)</option>
                  <option value="BEKAPLUS FS (BLEND)">BEKAPLUS FS (BLEND)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BAGS QUANTITY <span class="text-red-500 font-bold">*</span></label>
                <input type="number" id="cc-create-bags" placeholder="Enter Chemical Bags Quantity" required value="10" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Row 2: 3 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">QUANTITY IN KGS <span class="text-red-500 font-bold">*</span></label>
                <input type="number" id="cc-create-qty" placeholder="Enter Chemical Quantity in KGs" required value="250" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="cc-create-date" required value="2025-04-10" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SEND TO <span class="text-red-500 font-bold">*</span></label>
                <select id="cc-create-sendto" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="Processing Line 1" selected>Processing Line 1</option>
                  <option value="Processing Line 2">Processing Line 2</option>
                  <option value="Deheading Bath">Deheading Bath</option>
                  <option value="Soaking Bath">Soaking Bath</option>
                  <option value="VSP-DFL UNIT-1 (VSP)">VSP-DFL UNIT-1 (VSP)</option>
                  <option value="KKD-DFL UNIT-2 (KKD)">KKD-DFL UNIT-2 (KKD)</option>
                  <option value="PSP-DFL UNIT-3 (PSP)">PSP-DFL UNIT-3 (PSP)</option>
                </select>
              </div>
            </div>

            <!-- Centered Buttons: Close & Save (Matching Screenshot 2) -->
            <div class="flex items-center justify-center gap-3 pt-2">
              <button type="button" id="cc-btn-close-form" class="px-6 py-2 bg-[#F43F5E] hover:bg-[#E11D48] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Close
              </button>
              <button type="submit" id="cc-btn-save-form" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Save
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Register Table with Search & Excel Export (Matching Screenshot 1) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
              <input type="text" id="cc-table-search" placeholder="Search..." class="w-full pl-9 pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
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
      createForm.reset();
      document.getElementById('cc-create-date').value = new Date().toISOString().slice(0, 10);
      createCard.classList.remove('hidden');
      createCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
  },'''

def update_file(filepath):
    print(f"Updating {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern matches from renderChemicalsConsumption(container) { to renderChemicalReceivedReport(container)
    pattern = r'  renderChemicalsConsumption\(container\)\s*\{[\s\S]*?\n  \},\s*\n\s*renderChemicalReceivedReport\(container\)'
    
    replacement = CHEMICALS_CONSUMPTION_CODE + '\n\n  renderChemicalReceivedReport(container)'
    
    new_content, count = re.subn(pattern, replacement, content, count=1)
    if count == 0:
        print(f"  ❌ Failed to replace renderChemicalsConsumption in {filepath}")
        sys.exit(1)
    else:
        print(f"  ✓ Successfully replaced renderChemicalsConsumption in {filepath}")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

def main():
    for f in TARGET_FILES:
        update_file(f)
    print("\nAll files successfully updated with pixel-accurate Chemicals Consumption implementation!")

if __name__ == '__main__':
    main()
