#!/usr/bin/env python3
"""
Updates the Grading screen implementation in:
1. js/views/preprocessingView.js
2. standalone.html
3. miledeep-devi-fisheries.html

Features:
- Pixel-accurate Form matching user screenshot:
  - Row 1: ARRIVAL DATE *, ARRIVAL/LOT CODE *, PRODUCTION PLANT *, GRADING STATION *
  - Row 2: GRADING DATE *, GRADING MACHINE *, START TIME *, END TIME *
  - Row 3: BREAK TIME(MINUTES) *, REMARKS, (empty), (empty)
  - Row 4: SELECT VARIETY *, HL COUNT(PER LB), HL WEIGHT(KGS), NO OF CRATES
  - Centered Action buttons: + New, Save, Delete (#02a8b5 text-white for New/Save, red text-white for Delete)
- Lower Card matching user screenshot:
  - Live search input with search icon
  - Download Excel button (#02a8b5 text-white with icon)
  - Table columns: S.No, Transaction Date, Arrival Code, Production Plant, Center, Grading Machine,
                   Start Time, End Time, Break Time(Minutes), HL Count, HL Weight, No Of Crates, Remarks, Actions
  - Live calculations, Add/Create, Edit, Delete, Excel Export, Search filter, LocalStorage persistence.
"""

import os
import re

GRADING_DATA_DEF = '''  gradingLogsList: [
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
  ],'''

RENDER_GRADING_METHOD = '''  initGradingStorage() {
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
  },'''

def update_file(filepath):
    print(f"Updating {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update gradingLogsList
    gr_list_pattern = r'  gradingLogsList:\s*\[[\s\S]*?\],\n\n  valueAdditionList:'
    if re.search(gr_list_pattern, content):
        content = re.sub(gr_list_pattern, GRADING_DATA_DEF + '\n\n  valueAdditionList:', content)
        print("  ✓ Updated gradingLogsList dataset")
    else:
        print("  ! gradingLogsList pattern not matched directly")

    # 2. Update renderGrading
    render_gr_pattern = r'  renderGrading\(container\)\s*\{[\s\S]*?\n  \},\n\n  renderDeheadingTrackid\(container\)'
    if re.search(render_gr_pattern, content):
        content = re.sub(render_gr_pattern, RENDER_GRADING_METHOD + '\n\n  renderDeheadingTrackid(container)', content)
        print("  ✓ Replaced renderGrading method")
    else:
        print("  ! renderGrading pattern not matched directly")

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

    print("\nGrading screen update complete!")

if __name__ == '__main__':
    main()
