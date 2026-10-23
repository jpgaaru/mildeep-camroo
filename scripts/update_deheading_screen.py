#!/usr/bin/env python3
"""
Updates the Deheading screen implementation in:
1. js/views/preprocessingView.js
2. standalone.html
3. miledeep-devi-fisheries.html

Features:
- Pixel-accurate Form matching user screenshots:
  - Row 1: ARRIVAL DATE, ARRIVAL/LOT CODE *, PRODUCTION PLANT *, DE HEADING STATION *
  - Row 2: DE HEADING DATE *, SELECT SHIFT *, SUPERVISOR *, HEADON COUNT AFTER CHECKING ( COUNT-2 ) *
  - Row 3: SAMPLE YIELD(%), ICE CONSUMPTION, REMARKS, (empty)
  - Row 4: HON QUANTITY(KGS) *, HL COUNT (PER KG) *, HL QUANTITY(KGS) *, HON COUNT (PER KG)
  - Centered + New button and Save button (#02a8b5 text-white)
- Lower Card matching user screenshots:
  - Search input with search icon
  - Download Excel button (#02a8b5 text-white with icon)
  - Table columns: S.No, Arrival Code, Production Plant, Center, De Heading Date, Shift, Supervisor,
                   Checking Count-2, HL Count, HON Count, HON Quantity(Kgs), HL Quantity(Kgs),
                   Count Net Yield(%), Yield(%), Ice Consumption, Actions
  - Functional live calculations, Add/Create, Edit, Delete, Excel Export, Search filter, LocalStorage persistence.
"""

import os
import re

DEHEADING_DATA_DEF = '''  deheadingLogsList: [
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
  ],'''

RENDER_DEHEADING_METHOD = '''  initDeheadingStorage() {
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
  },'''

def update_file(filepath):
    print(f"Updating {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update deheadingLogsList
    dh_list_pattern = r'  deheadingLogsList:\s*\[[\s\S]*?\],\n\n  gradingLogsList:'
    if re.search(dh_list_pattern, content):
        content = re.sub(dh_list_pattern, DEHEADING_DATA_DEF + '\n\n  gradingLogsList:', content)
        print("  ✓ Updated deheadingLogsList dataset")
    else:
        print("  ! deheadingLogsList pattern not matched directly, checking fallback")

    # 2. Update renderDeheading
    render_dh_pattern = r'  renderDeheading\(container\)\s*\{[\s\S]*?\n  \},\n\n  renderGrading\(container\)'
    if re.search(render_dh_pattern, content):
        content = re.sub(render_dh_pattern, RENDER_DEHEADING_METHOD + '\n\n  renderGrading(container)', content)
        print("  ✓ Replaced renderDeheading method")
    else:
        print("  ! renderDeheading pattern not matched directly, checking fallback")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    files = [
        'js/views/preprocessingView.js',
        'standalone.html',
        'miledeep-devi-fisheries.html'
    ]
    for fp in files:
        if os.path.exists(fp):
            update_file(fp)

    print("\nDeheading screen update complete!")

if __name__ == '__main__':
    main()
