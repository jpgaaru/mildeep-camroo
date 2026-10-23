#!/usr/bin/env python3
"""
Implements the 5 remaining Pre-Processing Operations tabs matching the user's screenshots:
1. Rm Received trackid (rm-received)
2. De-Heading trackid (deheading-trackid)
3. Grading trackid (grading-trackid) - with editable tabular grid and + Add Line
4. Value Addition trackid (value-addition)
5. Hon Qty Transfer After VA (hon-qty-transfer)

Updates:
- js/views/preprocessingView.js
- standalone.html
- miledeep-devi-fisheries.html
"""

import re
import os

RM_RECEIVED_CODE = '''  renderRmReceived(container) {
    if (!this.rmReceivedList || this.rmReceivedList.length === 0) {
      this.rmReceivedList = [
        { id: "RMR-01", sNo: 1, billNo: "SKM/2425/1753", variety: "VM-HEAD ON", count: 88.0, headonWeight: 3373.0, recvCount: 85.0, recvWeight: 3373.0, sampleHoQty: 5.0, noOfPcs: 425, plant: "VSP - DFL UNIT-1 (VSP)", arrivalDate: "2025-03-23", vehicleNo: "AP39TH4246 - VM-VSP-SKM-056", trackCode: "VM-VSP-SKM-056", sealNo: "43475", supervisor: "T.VENKATESH", remarks: "" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">RM RECEIVED TRACKID</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Operations &bull; Raw Material Inward Verification</span>
        </div>

        <!-- Upper Card: Entry Form -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form id="rm-received-form" class="space-y-4">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-red-500 font-bold">*</span></label>
                <select id="rm-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="VSP - DFL UNIT-1 (VSP)" selected>VSP - DFL UNIT-1 (VSP)</option>
                  <option value="KKD - DFL UNIT-2 (KKD)">KKD - DFL UNIT-2 (KKD)</option>
                  <option value="PSP - DFL UNIT-3 (PSP)">PSP - DFL UNIT-3 (PSP)</option>
                  <option value="JPT - DFL UNIT-5 (JPT)">JPT - DFL UNIT-5 (JPT)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL DATE</label>
                <input type="date" id="rm-arrival-date" value="2025-03-23" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">VEHICLE NUMBER <span class="text-red-500 font-bold">*</span></label>
                <select id="rm-vehicle" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="AP39TH4246 - VM-VSP-SKM-056" selected>AP39TH4246 - VM-VSP-SKM-056</option>
                  <option value="AP05X9921 - BT-KKD-MKP-043">AP05X9921 - BT-KKD-MKP-043</option>
                  <option value="AP31TT4177 - VM-PSP-BVR-078">AP31TT4177 - VM-PSP-BVR-078</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TRACK CODE FORMAT <span class="text-red-500 font-bold">*</span></label>
                <input type="text" id="rm-track-code" value="VM-VSP-SKM-056" readonly class="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#475569] font-mono focus:outline-none">
              </div>
            </div>

            <!-- Row 2: 3 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SEAL NUMBER <span class="text-red-500 font-bold">*</span></label>
                <input type="text" id="rm-seal" value="43475" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SUPERVISOR <span class="text-red-500 font-bold">*</span></label>
                <select id="rm-supervisor" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="T.VENKATESH" selected>T.VENKATESH</option>
                  <option value="K VENKATA VINAY">K VENKATA VINAY</option>
                  <option value="S.BALA KRISHNA">S.BALA KRISHNA</option>
                  <option value="D.SURYA NARAYANA">D.SURYA NARAYANA</option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REMARKS</label>
                <input type="text" id="rm-remarks" placeholder="Enter Remarks" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Action Button -->
            <div class="flex items-center justify-center pt-2">
              <button type="submit" class="px-7 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Save
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Register Table with In-Table Editable Inputs -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
              <input type="text" id="rm-search" placeholder="Search..." class="w-full pl-9 pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <button type="button" id="rm-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.No</th>
                  <th class="py-2.5 px-3">Bill No</th>
                  <th class="py-2.5 px-3">Variety</th>
                  <th class="py-2.5 px-3 text-right">Count</th>
                  <th class="py-2.5 px-3 text-right">Head on Weight</th>
                  <th class="py-2.5 px-3 text-right">Recv Count</th>
                  <th class="py-2.5 px-3 text-right">Recv Weight</th>
                  <th class="py-2.5 px-3 text-right">Sample HO Qty</th>
                  <th class="py-2.5 px-3 text-right">No Of Pcs</th>
                  <th class="py-2.5 px-3 text-right">Count Diff</th>
                  <th class="py-2.5 px-3 text-right">Qty Diff</th>
                  <th class="py-2.5 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="rm-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('rm-table-body');
    const searchInput = document.getElementById('rm-search');
    const form = document.getElementById('rm-received-form');
    const exportBtn = document.getElementById('rm-export-excel');

    const renderRows = (query = '') => {
      const q = query.toLowerCase().trim();
      const filtered = this.rmReceivedList.filter(r => {
        if (!q) return true;
        return `${r.billNo || ''} ${r.variety || ''} ${r.plant || ''} ${r.vehicleNo || ''}`.toLowerCase().includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="12" class="text-center py-8 text-[#94A3B8] text-xs font-medium">No data available in table</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map((r, idx) => {
        const countDiff = Number((r.recvCount || 0) - (r.count || 0)).toFixed(0);
        const qtyDiff = Number((r.recvWeight || 0) - (r.headonWeight || 0)).toFixed(0);

        return `
          <tr class="hover:bg-[#F8FAFC] transition-colors" data-id="${r.id}">
            <td class="py-2 px-3 font-bold text-[#64748B]">${idx + 1}</td>
            <td class="py-2 px-3 font-bold text-[#0F172A]">${r.billNo || '-'}</td>
            <td class="py-2 px-3 text-[#334155]">${r.variety || '-'}</td>
            <td class="py-2 px-3 text-right">
              <input type="number" step="0.001" value="${Number(r.count || 0).toFixed(3)}" readonly class="w-24 text-right px-2 py-1 bg-[#F1F5F9] border border-[#CBD5E1] rounded text-xs text-[#334155] focus:outline-none">
            </td>
            <td class="py-2 px-3 text-right">
              <input type="number" step="0.001" value="${Number(r.headonWeight || 0).toFixed(3)}" readonly class="w-28 text-right px-2 py-1 bg-[#F1F5F9] border border-[#CBD5E1] rounded text-xs text-[#334155] focus:outline-none">
            </td>
            <td class="py-2 px-3 text-right">
              <input type="number" step="0.001" value="${Number(r.recvCount || 0).toFixed(3)}" data-field="recvCount" data-id="${r.id}" class="rm-inline-input w-24 text-right px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] outline-none font-semibold">
            </td>
            <td class="py-2 px-3 text-right">
              <input type="number" step="0.001" value="${Number(r.recvWeight || 0).toFixed(0)}" data-field="recvWeight" data-id="${r.id}" class="rm-inline-input w-24 text-right px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] outline-none font-semibold">
            </td>
            <td class="py-2 px-3 text-right">
              <input type="number" step="0.001" value="${Number(r.sampleHoQty || 0).toFixed(3)}" data-field="sampleHoQty" data-id="${r.id}" class="rm-inline-input w-24 text-right px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] outline-none">
            </td>
            <td class="py-2 px-3 text-right">
              <input type="number" value="${Number(r.noOfPcs || 0)}" data-field="noOfPcs" data-id="${r.id}" class="rm-inline-input w-20 text-right px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] outline-none">
            </td>
            <td class="py-2 px-3 text-right font-mono font-bold ${Number(countDiff) < 0 ? 'text-red-500' : 'text-emerald-600'}">${countDiff}</td>
            <td class="py-2 px-3 text-right font-mono font-bold ${Number(qtyDiff) < 0 ? 'text-red-500' : 'text-emerald-600'}">${qtyDiff}</td>
            <td class="py-2 px-3 text-center">
              <button type="button" data-del-id="${r.id}" class="rm-row-del p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer" title="Delete Row">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </td>
          </tr>
        `;
      }).join('');

      tbody.querySelectorAll('.rm-inline-input').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const id = e.target.getAttribute('data-id');
          const field = e.target.getAttribute('data-field');
          const val = parseFloat(e.target.value) || 0;
          const rec = this.rmReceivedList.find(x => x.id === id);
          if (rec) {
            rec[field] = val;
            const tr = e.target.closest('tr');
            if (tr) {
              const cDiff = Number((rec.recvCount || 0) - (rec.count || 0)).toFixed(0);
              const qDiff = Number((rec.recvWeight || 0) - (rec.headonWeight || 0)).toFixed(0);
              const tds = tr.querySelectorAll('td');
              if (tds[9]) {
                tds[9].textContent = cDiff;
                tds[9].className = `py-2 px-3 text-right font-mono font-bold ${Number(cDiff) < 0 ? 'text-red-500' : 'text-emerald-600'}`;
              }
              if (tds[10]) {
                tds[10].textContent = qDiff;
                tds[10].className = `py-2 px-3 text-right font-mono font-bold ${Number(qDiff) < 0 ? 'text-red-500' : 'text-emerald-600'}`;
              }
            }
          }
        });
      });

      tbody.querySelectorAll('.rm-row-del').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = btn.getAttribute('data-del-id');
          if (confirm('Delete this RM Inward record?')) {
            this.rmReceivedList = this.rmReceivedList.filter(x => x.id !== id);
            renderRows(searchInput?.value || '');
            if (window.Toast) window.Toast.show('RM Inward line removed', 'info');
          }
        });
      });
    };

    renderRows();

    searchInput?.addEventListener('input', (e) => renderRows(e.target.value));

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (window.Toast) window.Toast.show('RM Received Track ID batch saved successfully!', 'success');
    });

    exportBtn?.addEventListener('click', () => {
      const headers = ["S.No", "Bill No", "Variety", "Billed Count", "Head on Weight", "Recv Count", "Recv Weight", "Sample HO Qty", "No Of Pcs", "Count Diff", "Qty Diff"];
      const rows = this.rmReceivedList.map((r, i) => [
        i + 1,
        `"${r.billNo || ''}"`,
        `"${r.variety || ''}"`,
        r.count || 0,
        r.headonWeight || 0,
        r.recvCount || 0,
        r.recvWeight || 0,
        r.sampleHoQty || 0,
        r.noOfPcs || 0,
        Number((r.recvCount || 0) - (r.count || 0)).toFixed(0),
        Number((r.recvWeight || 0) - (r.headonWeight || 0)).toFixed(0)
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `rm_received_trackid_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (window.Toast) window.Toast.show('RM Received report exported to CSV', 'success');
    });
  },'''

DEHEADING_TRACKID_CODE = '''  renderDeheadingTrackid(container) {
    if (!this.deheadingTrackidList || this.deheadingTrackidList.length === 0) {
      this.deheadingTrackidList = [
        { id: "DHT-01", sNo: 1, plant: "VSP-DFL UNIT-1 (VSP)", arrivalDate: "2026-10-23", trackId: "VM-VSP-AMP-056", deheadingDate: "2026-10-23", shift: "A SHIFT", supervisor: "K VENKATA VINAY", remarks: "Floor processing regular batch", status: "Active" },
        { id: "DHT-02", sNo: 2, plant: "KKD-DFL UNIT-2 (KKD)", arrivalDate: "2026-10-23", trackId: "BT-KKD-MKP-043", deheadingDate: "2026-10-23", shift: "B SHIFT", supervisor: "T.VENKATESH", remarks: "Chilled temp pass", status: "Active" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">DE-HEADING TRACKID</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Operations &bull; Track ID Assignment</span>
        </div>

        <!-- Upper Card: Entry Form -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form id="dht-form" class="space-y-4">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-red-500 font-bold">*</span></label>
                <select id="dht-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="VSP-DFL UNIT-1 (VSP)" selected>VSP-DFL UNIT-1 (VSP)</option>
                  <option value="KKD-DFL UNIT-2 (KKD)">KKD-DFL UNIT-2 (KKD)</option>
                  <option value="PSP-DFL UNIT-3 (PSP)">PSP-DFL UNIT-3 (PSP)</option>
                  <option value="JPT-DFL UNIT-5 (JPT)">JPT-DFL UNIT-5 (JPT)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="dht-arrival-date" value="2026-10-23" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TRACK ID <span class="text-red-500 font-bold">*</span></label>
                <select id="dht-track-id" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="VM-VSP-AMP-056" selected>VM-VSP-AMP-056</option>
                  <option value="BT-KKD-MKP-043">BT-KKD-MKP-043</option>
                  <option value="VM-PSP-BVR-078">VM-PSP-BVR-078</option>
                  <option value="LOT-2026-OCT-095">LOT-2026-OCT-095</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">DE HEADING DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="dht-dh-date" value="2026-10-23" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Row 2: 3 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SHIFT <span class="text-red-500 font-bold">*</span></label>
                <select id="dht-shift" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="A SHIFT" selected>A SHIFT</option>
                  <option value="B SHIFT">B SHIFT</option>
                  <option value="C SHIFT">C SHIFT</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SUPERVISOR <span class="text-red-500 font-bold">*</span></label>
                <select id="dht-supervisor" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="K VENKATA VINAY" selected>K VENKATA VINAY</option>
                  <option value="T.VENKATESH">T.VENKATESH</option>
                  <option value="D.SURYA NARAYANA">D.SURYA NARAYANA</option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REMARKS</label>
                <input type="text" id="dht-remarks" placeholder="Enter Remarks(Optional)" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Action Button -->
            <div class="flex items-center justify-center pt-2">
              <button type="submit" class="px-7 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Save
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Register Table -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
              <input type="text" id="dht-search" placeholder="Search..." class="w-full pl-9 pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <button type="button" id="dht-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.No</th>
                  <th class="py-2.5 px-3">Production Plant</th>
                  <th class="py-2.5 px-3">Arrival Date</th>
                  <th class="py-2.5 px-3">Track ID</th>
                  <th class="py-2.5 px-3">De Heading Date</th>
                  <th class="py-2.5 px-3">Shift</th>
                  <th class="py-2.5 px-3">Supervisor</th>
                  <th class="py-2.5 px-3">Remarks</th>
                  <th class="py-2.5 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="dht-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('dht-table-body');
    const searchInput = document.getElementById('dht-search');
    const form = document.getElementById('dht-form');
    const exportBtn = document.getElementById('dht-export-excel');

    const renderTable = (query = '') => {
      const q = query.toLowerCase().trim();
      const filtered = this.deheadingTrackidList.filter(r => {
        if (!q) return true;
        return `${r.plant || ''} ${r.trackId || ''} ${r.shift || ''} ${r.supervisor || ''}`.toLowerCase().includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" class="text-center py-8 text-[#94A3B8] text-xs font-medium">No data available in table</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map((r, idx) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors">
          <td class="py-2.5 px-3 font-bold text-[#64748B]">${idx + 1}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.plant || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.arrivalDate || '-'}</td>
          <td class="py-2.5 px-3 font-bold text-[#0F172A]">${r.trackId || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.deheadingDate || '-'}</td>
          <td class="py-2.5 px-3 font-medium text-[#1E293B]">${r.shift || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.supervisor || '-'}</td>
          <td class="py-2.5 px-3 text-[#64748B]">${r.remarks || ''}</td>
          <td class="py-2.5 px-3 text-center">
            <button type="button" data-del-id="${r.id}" class="dht-del p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer" title="Delete Entry">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.dht-del').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-del-id');
          if (confirm('Delete this De-Heading Track ID record?')) {
            this.deheadingTrackidList = this.deheadingTrackidList.filter(x => x.id !== id);
            renderTable(searchInput?.value || '');
            if (window.Toast) window.Toast.show('Record deleted', 'info');
          }
        });
      });
    };

    renderTable();

    searchInput?.addEventListener('input', (e) => renderTable(e.target.value));

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const newRec = {
        id: 'DHT-' + String(Date.now()).slice(-6),
        sNo: this.deheadingTrackidList.length + 1,
        plant: document.getElementById('dht-plant').value,
        arrivalDate: document.getElementById('dht-arrival-date').value,
        trackId: document.getElementById('dht-track-id').value,
        deheadingDate: document.getElementById('dht-dh-date').value,
        shift: document.getElementById('dht-shift').value,
        supervisor: document.getElementById('dht-supervisor').value,
        remarks: document.getElementById('dht-remarks').value,
        status: 'Active'
      };
      this.deheadingTrackidList.unshift(newRec);
      renderTable(searchInput?.value || '');
      form.reset();
      document.getElementById('dht-arrival-date').value = '2026-10-23';
      document.getElementById('dht-dh-date').value = '2026-10-23';
      if (window.Toast) window.Toast.show(`De-heading track ID ${newRec.trackId} saved`, 'success');
    });

    exportBtn?.addEventListener('click', () => {
      const headers = ["S.No", "Production Plant", "Arrival Date", "Track ID", "De Heading Date", "Shift", "Supervisor", "Remarks"];
      const rows = this.deheadingTrackidList.map((r, i) => [
        i + 1,
        `"${r.plant || ''}"`,
        `"${r.arrivalDate || ''}"`,
        `"${r.trackId || ''}"`,
        `"${r.deheadingDate || ''}"`,
        `"${r.shift || ''}"`,
        `"${r.supervisor || ''}"`,
        `"${(r.remarks || '').replace(/"/g, '""')}"`
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `deheading_trackid_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (window.Toast) window.Toast.show('De-heading Track ID report exported to CSV', 'success');
    });
  },'''

GRADING_TRACKID_CODE = '''  renderGradingTrackid(container) {
    if (!this.gradingTrackLines || this.gradingTrackLines.length === 0) {
      this.gradingTrackLines = [
        { id: "GTL-01", sNo: 1, variety: "VM-PVPD", hlCount: "55.00", grade: "51/60", treatment: "UNT", freezing: "BLOCK", crates: 1, gradingQty: "2.00", tubWeight: "" },
        { id: "GTL-02", sNo: 2, variety: "VM-HLSO-CHINA", hlCount: "67.00", grade: "61/70", treatment: "UNT", freezing: "BLOCK", crates: 9, gradingQty: "233.00", tubWeight: "" },
        { id: "GTL-03", sNo: 3, variety: "VM-RPD", hlCount: "68.00", grade: "61/70", treatment: "CTPD", freezing: "IQF", crates: 1, gradingQty: "15.00", tubWeight: "" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">GRADING TRACKID</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Operations &bull; Track-Level Grading with Dynamic Tabular Grid</span>
        </div>

        <!-- Upper Card: Entry Form with Multi-Lot Breakdown Box -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form id="gr-track-form" class="space-y-4">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-red-500 font-bold">*</span></label>
                <select id="gt-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="USHA-DFL UNIT-2 (KKD)" selected>USHA-DFL UNIT-2 (KKD)</option>
                  <option value="VSP-DFL UNIT-1 (VSP)">VSP-DFL UNIT-1 (VSP)</option>
                  <option value="PSP-DFL UNIT-3 (PSP)">PSP-DFL UNIT-3 (PSP)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="gt-arrival-date" value="2025-02-20" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TRACK ID <span class="text-red-500 font-bold">*</span></label>
                <select id="gt-track-id" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="VM-KKD-AMP-071" selected>VM-KKD-AMP-071</option>
                  <option value="VM-VSP-AMP-056">VM-VSP-AMP-056</option>
                  <option value="BT-KKD-MKP-043">BT-KKD-MKP-043</option>
                </select>
              </div>
              <div class="row-span-2">
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">RECEIVING COUNT <span class="text-red-500 font-bold">*</span></label>
                <div class="w-full h-[118px] overflow-y-auto px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-[11px] font-mono text-[#334155] space-y-1">
                  <div>AMP/2425/4044 (121.000 - 713.000)</div>
                  <div>AMP/2425/4044 (119.000 - 696.800)</div>
                  <div>AMP/2425/4044 (136.000 - 622.600)</div>
                  <div>AMP/2425/4044 (122.000 - 735.000)</div>
                  <div>AMP/2425/4044 (130.000 - 801.000)</div>
                  <div>AMP/2425/4044 (115.000 - 729.000)</div>
                  <div>AMP/2425/4044 (140.000 - 307.600)</div>
                  <div>AMP/2425/4044 (142.000 - 818.000)</div>
                </div>
              </div>

              <!-- Row 2 (Columns 1 to 3) -->
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">GRADING DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="gt-grading-date" value="2025-02-20" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">GRADING MACHINE <span class="text-red-500 font-bold">*</span></label>
                <select id="gt-machine" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="Unit -2 Roller Grading Machine" selected>Unit -2 Roller Grading Machine</option>
                  <option value="Unit -6 Laitram Machine">Unit -6 Laitram Machine</option>
                </select>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">START TIME</label>
                  <input type="text" id="gt-start-time" value="09:00 AM" class="w-full px-2 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">END TIME</label>
                  <input type="text" id="gt-end-time" value="11:40 AM" class="w-full px-2 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                </div>
              </div>
            </div>

            <!-- Row 3: 3 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BREAK TIME(MINUTES)</label>
                <input type="number" id="gt-break-time" placeholder="Enter Break Time" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SUPERVISOR <span class="text-red-500 font-bold">*</span></label>
                <select id="gt-supervisor" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="K VENKATA VINAY" selected>K VENKATA VINAY</option>
                  <option value="T.VENKATESH">T.VENKATESH</option>
                  <option value="S.BALA KRISHNA">S.BALA KRISHNA</option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REMARKS</label>
                <input type="text" id="gt-remarks" value="Good" placeholder="Enter Remarks" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Action Buttons: Save Grading, + Add Line, Delete -->
            <div class="flex items-center justify-center gap-3 pt-2">
              <button type="submit" id="gt-btn-save" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Save Grading
              </button>
              <button type="button" id="gt-btn-add-line" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
                Add Line
              </button>
              <button type="button" id="gt-btn-delete" class="px-5 py-2 bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                Delete
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Fully Editable Tabular Grid -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
              <input type="text" id="gt-search" placeholder="Search..." class="w-full pl-9 pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <button type="button" id="gt-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">SNO</th>
                  <th class="py-2.5 px-3">Variety</th>
                  <th class="py-2.5 px-3">HL_Count (Per Lb)</th>
                  <th class="py-2.5 px-3">Grade</th>
                  <th class="py-2.5 px-3">Treatment</th>
                  <th class="py-2.5 px-3">Freezing</th>
                  <th class="py-2.5 px-3 text-right">No Of Crates</th>
                  <th class="py-2.5 px-3 text-right">Grading Qty</th>
                  <th class="py-2.5 px-3">HL/Tub Weight</th>
                  <th class="py-2.5 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="gt-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('gt-table-body');
    const searchInput = document.getElementById('gt-search');
    const addLineBtn = document.getElementById('gt-btn-add-line');
    const deleteBtn = document.getElementById('gt-btn-delete');
    const exportBtn = document.getElementById('gt-export-excel');
    const form = document.getElementById('gr-track-form');

    const varieties = ["VM-PVPD", "VM-HLSO-CHINA", "VM-RPD", "VM-HLSO", "BT-HLSO"];
    const grades = ["51/60", "61/70", "71/90", "91/110", "110/130", "16/20", "21/25", "26/30", "31/40"];
    const treatments = ["UNT", "TRT", "CTPD"];
    const freezings = ["BLOCK", "IQF", "SIQF"];

    const renderGrid = (query = '') => {
      const q = query.toLowerCase().trim();
      const filtered = this.gradingTrackLines.filter(r => {
        if (!q) return true;
        return `${r.variety || ''} ${r.grade || ''} ${r.treatment || ''} ${r.freezing || ''}`.toLowerCase().includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10" class="text-center py-8 text-[#94A3B8] text-xs font-medium">No data available in table</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map((r, idx) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors" data-id="${r.id}">
          <td class="py-2 px-3 font-bold text-[#64748B]">${idx + 1}</td>
          <td class="py-2 px-3">
            <select data-field="variety" data-id="${r.id}" class="gt-inline px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] outline-none">
              ${varieties.map(v => `<option value="${v}" ${r.variety === v ? 'selected' : ''}>${v}</option>`).join('')}
            </select>
          </td>
          <td class="py-2 px-3">
            <input type="number" step="0.01" value="${r.hlCount || ''}" data-field="hlCount" data-id="${r.id}" class="gt-inline w-24 px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] outline-none font-semibold">
          </td>
          <td class="py-2 px-3">
            <select data-field="grade" data-id="${r.id}" class="gt-inline px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] outline-none font-mono">
              ${grades.map(g => `<option value="${g}" ${r.grade === g ? 'selected' : ''}>${g}</option>`).join('')}
            </select>
          </td>
          <td class="py-2 px-3">
            <select data-field="treatment" data-id="${r.id}" class="gt-inline px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] outline-none">
              ${treatments.map(t => `<option value="${t}" ${r.treatment === t ? 'selected' : ''}>${t}</option>`).join('')}
            </select>
          </td>
          <td class="py-2 px-3">
            <select data-field="freezing" data-id="${r.id}" class="gt-inline px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] outline-none">
              ${freezings.map(f => `<option value="${f}" ${r.freezing === f ? 'selected' : ''}>${f}</option>`).join('')}
            </select>
          </td>
          <td class="py-2 px-3 text-right">
            <input type="number" value="${r.crates || ''}" data-field="crates" data-id="${r.id}" class="gt-inline w-20 text-right px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] outline-none">
          </td>
          <td class="py-2 px-3 text-right">
            <input type="number" step="0.01" value="${r.gradingQty || ''}" data-field="gradingQty" data-id="${r.id}" class="gt-inline w-24 text-right px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs font-bold text-[#006644] focus:border-[#02a8b5] outline-none">
          </td>
          <td class="py-2 px-3">
            <input type="text" placeholder="Enter Crate Qty" value="${r.tubWeight || ''}" data-field="tubWeight" data-id="${r.id}" class="gt-inline w-28 px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] outline-none">
          </td>
          <td class="py-2 px-3 text-center">
            <div class="flex items-center justify-center gap-1.5">
              <button type="button" data-save-id="${r.id}" class="gt-save-row p-1 text-[#0284C7] hover:bg-[#F0F9FF] rounded cursor-pointer" title="Lock / Save Line">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>
              </button>
              <button type="button" data-del-id="${r.id}" class="gt-del-row p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer" title="Delete Line">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.gt-inline').forEach(el => {
        el.addEventListener('change', (e) => {
          const id = e.target.getAttribute('data-id');
          const field = e.target.getAttribute('data-field');
          const rec = this.gradingTrackLines.find(x => x.id === id);
          if (rec) {
            rec[field] = e.target.value;
          }
        });
      });

      tbody.querySelectorAll('.gt-save-row').forEach(btn => {
        btn.addEventListener('click', () => {
          if (window.Toast) window.Toast.show('Grading line locked & saved', 'success');
        });
      });

      tbody.querySelectorAll('.gt-del-row').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-del-id');
          if (confirm('Delete this grading size line?')) {
            this.gradingTrackLines = this.gradingTrackLines.filter(x => x.id !== id);
            renderGrid(searchInput?.value || '');
            if (window.Toast) window.Toast.show('Grading size line deleted', 'info');
          }
        });
      });
    };

    renderGrid();

    // + Add Line button
    addLineBtn?.addEventListener('click', () => {
      const newLine = {
        id: 'GTL-' + String(Date.now()).slice(-6),
        sNo: this.gradingTrackLines.length + 1,
        variety: "VM-PVPD",
        hlCount: "60.00",
        grade: "51/60",
        treatment: "UNT",
        freezing: "BLOCK",
        crates: 1,
        gradingQty: "0.00",
        tubWeight: ""
      };
      this.gradingTrackLines.push(newLine);
      renderGrid(searchInput?.value || '');
      if (window.Toast) window.Toast.show('New editable line added to grading table', 'info');
    });

    // Delete Last Line
    deleteBtn?.addEventListener('click', () => {
      if (this.gradingTrackLines.length === 0) return;
      if (confirm('Delete the last grading line?')) {
        this.gradingTrackLines.pop();
        renderGrid(searchInput?.value || '');
        if (window.Toast) window.Toast.show('Line removed', 'info');
      }
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (window.Toast) window.Toast.show('Grading Track ID batch recorded successfully!', 'success');
    });

    searchInput?.addEventListener('input', (e) => renderGrid(e.target.value));

    exportBtn?.addEventListener('click', () => {
      const headers = ["SNO", "Variety", "HL_Count (Per Lb)", "Grade", "Treatment", "Freezing", "No Of Crates", "Grading Qty", "HL/Tub Weight"];
      const rows = this.gradingTrackLines.map((r, i) => [
        i + 1,
        `"${r.variety || ''}"`,
        r.hlCount || '',
        `"${r.grade || ''}"`,
        `"${r.treatment || ''}"`,
        `"${r.freezing || ''}"`,
        r.crates || 0,
        r.gradingQty || 0,
        `"${r.tubWeight || ''}"`
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `grading_trackid_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (window.Toast) window.Toast.show('Grading Track report exported to CSV', 'success');
    });
  },'''

VALUE_ADDITION_CODE = '''  renderValueAddition(container) {
    if (!this.valueAdditionList || this.valueAdditionList.length === 0) {
      this.valueAdditionList = [
        { id: "VA-01", sNo: 1, arrivalCode: "AMP/2425/4078", plant: "DFL UNIT-1 (VSP)", soakingPlant: "DFL UNIT-2 (KKD)", date: "24-02-2025", shift: "A SHIFT", variety: "VM RPD", hlWeight: 2.400, hlCount: 37.00, crates: 1, vaOutQty: 2.000, rejectionWt: 0.000, yieldPct: 83.33 },
        { id: "VA-02", sNo: 2, arrivalCode: "AMP/2425/4078", plant: "DFL UNIT-1 (VSP)", soakingPlant: "DFL UNIT-2 (KKD)", date: "24-02-2025", shift: "A SHIFT", variety: "VM RPD FULL CUT", hlWeight: 8.400, hlCount: 46.00, crates: 1, vaOutQty: 7.000, rejectionWt: 0.000, yieldPct: 83.33 }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">VALUE ADDITION TRACKID</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Operations &bull; Value Added Processing & Yield</span>
        </div>

        <!-- Upper Card: Entry Form -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form id="va-form" class="space-y-4">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-red-500 font-bold">*</span></label>
                <select id="va-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="VSP-DFL UNIT-1 (VSP)" selected>VSP-DFL UNIT-1 (VSP)</option>
                  <option value="KKD-DFL UNIT-2 (KKD)">KKD-DFL UNIT-2 (KKD)</option>
                  <option value="PSP-DFL UNIT-3 (PSP)">PSP-DFL UNIT-3 (PSP)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="va-arrival-date" value="2025-02-23" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TRACK ID <span class="text-red-500 font-bold">*</span></label>
                <select id="va-track-id" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="VM-VSP-AMP-056" selected>VM-VSP-AMP-056</option>
                  <option value="BT-KKD-MKP-043">BT-KKD-MKP-043</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">VALUE ADDITION DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="va-date" value="2025-02-24" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Row 2: 3 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SHIFT <span class="text-red-500 font-bold">*</span></label>
                <select id="va-shift" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="A SHIFT" selected>A SHIFT</option>
                  <option value="B SHIFT">B SHIFT</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SUPERVISOR <span class="text-red-500 font-bold">*</span></label>
                <select id="va-supervisor" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="S.BALA KRISHNA" selected>S.BALA KRISHNA</option>
                  <option value="T.VENKATESH">T.VENKATESH</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HL COUNT <span class="text-red-500 font-bold">*</span></label>
                <select id="va-hl-count" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="37.00" selected>37.00 - 46.00 Count</option>
                  <option value="46.00">46.00 - 55.00 Count</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TOTALS () <span class="text-red-500 font-bold">*</span></label>
                <input type="text" value="Balance" readonly class="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#64748B] focus:outline-none">
              </div>
            </div>

            <!-- Row 3: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">VARIETY <span class="text-red-500 font-bold">*</span></label>
                <select id="va-variety" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="VM RPD" selected>VM RPD</option>
                  <option value="VM RPD FULL CUT">VM RPD FULL CUT</option>
                  <option value="EZ-PEEL">EZ-PEEL</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HL WT (KGS) <span class="text-red-500 font-bold">*</span></label>
                <input type="number" step="0.01" id="va-hl-wt" value="27" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all font-semibold">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CRATES <span class="text-red-500 font-bold">*</span></label>
                <input type="number" id="va-crates" placeholder="Enter Crates" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">VAOUTQUANTITY</label>
                <input type="number" step="0.01" id="va-out-qty" placeholder="Enter VAOutQuantity" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Action Buttons: Save, Cancel, Transfer to Another Plant -->
            <div class="flex items-center justify-center gap-3 pt-2">
              <button type="submit" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Save
              </button>
              <button type="button" id="va-btn-cancel" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer">
                Cancel
              </button>
              <button type="button" id="va-btn-transfer" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                Transfer to Another Plant
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Register Table -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
              <input type="text" id="va-search" placeholder="Search..." class="w-full pl-9 pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <button type="button" id="va-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3 w-8"><input type="checkbox" id="va-check-all" class="rounded"></th>
                  <th class="py-2.5 px-3">S.No</th>
                  <th class="py-2.5 px-3">Arrival Code</th>
                  <th class="py-2.5 px-3">Production Plant</th>
                  <th class="py-2.5 px-3">Soaking Plant</th>
                  <th class="py-2.5 px-3">Transaction Date</th>
                  <th class="py-2.5 px-3">Shift</th>
                  <th class="py-2.5 px-3">Variety</th>
                  <th class="py-2.5 px-3 text-right">HL Wt(Kgs)</th>
                  <th class="py-2.5 px-3 text-right">HL Count</th>
                  <th class="py-2.5 px-3 text-right">No of Crates</th>
                  <th class="py-2.5 px-3 text-right">VA Out Quantity</th>
                  <th class="py-2.5 px-3 text-right">Rejection Weight</th>
                  <th class="py-2.5 px-3 text-right">Yield</th>
                  <th class="py-2.5 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="va-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('va-table-body');
    const searchInput = document.getElementById('va-search');
    const form = document.getElementById('va-form');
    const exportBtn = document.getElementById('va-export-excel');
    const cancelBtn = document.getElementById('va-btn-cancel');
    const transferBtn = document.getElementById('va-btn-transfer');

    const renderTable = (query = '') => {
      const q = query.toLowerCase().trim();
      const filtered = this.valueAdditionList.filter(r => {
        if (!q) return true;
        return `${r.arrivalCode || ''} ${r.plant || ''} ${r.soakingPlant || ''} ${r.variety || ''}`.toLowerCase().includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="15" class="text-center py-8 text-[#94A3B8] text-xs font-medium">No data available in table</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map((r, idx) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors">
          <td class="py-2.5 px-3"><input type="checkbox" class="rounded"></td>
          <td class="py-2.5 px-3 font-bold text-[#64748B]">${idx + 1}</td>
          <td class="py-2.5 px-3 font-bold text-[#0F172A]">${r.arrivalCode || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.plant || '-'}</td>
          <td class="py-2.5 px-3 text-red-500 font-semibold">${r.soakingPlant || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.date || '-'}</td>
          <td class="py-2.5 px-3 font-medium text-[#1E293B]">${r.shift || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155] font-semibold">${r.variety || '-'}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#334155]">${Number(r.hlWeight || 0).toFixed(3)}</td>
          <td class="py-2.5 px-3 text-right text-[#334155]">${Number(r.hlCount || 0).toFixed(2)}</td>
          <td class="py-2.5 px-3 text-right text-[#334155]">${r.crates || 1}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#006644]">${Number(r.vaOutQty || 0).toFixed(3)}</td>
          <td class="py-2.5 px-3 text-right text-[#64748B]">${Number(r.rejectionWt || 0).toFixed(3)}</td>
          <td class="py-2.5 px-3 text-right font-mono font-bold text-[#006644]">${Number(r.yieldPct || 0).toFixed(2)}%</td>
          <td class="py-2.5 px-3 text-center">
            <div class="flex items-center justify-center gap-1.5">
              <button type="button" data-edit-id="${r.id}" class="va-edit p-1 text-[#0284C7] hover:bg-[#F0F9FF] rounded cursor-pointer" title="Edit">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>
              <button type="button" data-del-id="${r.id}" class="va-del p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer" title="Delete">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.va-del').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-del-id');
          if (confirm('Delete this Value Addition line?')) {
            this.valueAdditionList = this.valueAdditionList.filter(x => x.id !== id);
            renderTable(searchInput?.value || '');
            if (window.Toast) window.Toast.show('Value addition record deleted', 'info');
          }
        });
      });
    };

    renderTable();

    searchInput?.addEventListener('input', (e) => renderTable(e.target.value));

    cancelBtn?.addEventListener('click', () => {
      form.reset();
      if (window.Toast) window.Toast.show('Form reset', 'info');
    });

    transferBtn?.addEventListener('click', () => {
      if (window.Toast) window.Toast.show('Initiating transfer workflow to destination plant', 'info');
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const hlWt = parseFloat(document.getElementById('va-hl-wt').value) || 0;
      const vaOut = parseFloat(document.getElementById('va-out-qty').value) || (hlWt * 0.8333);
      const yieldPct = hlWt > 0 ? (vaOut / hlWt) * 100 : 0;
      const newRec = {
        id: 'VA-' + String(Date.now()).slice(-6),
        sNo: this.valueAdditionList.length + 1,
        arrivalCode: document.getElementById('va-track-id').value,
        plant: document.getElementById('va-plant').value,
        soakingPlant: "DFL UNIT-2 (KKD)",
        date: document.getElementById('va-date').value,
        shift: document.getElementById('va-shift').value,
        variety: document.getElementById('va-variety').value,
        hlWeight: hlWt,
        hlCount: 37.00,
        crates: parseInt(document.getElementById('va-crates').value, 10) || 1,
        vaOutQty: vaOut,
        rejectionWt: 0.000,
        yieldPct: yieldPct
      };
      this.valueAdditionList.unshift(newRec);
      renderTable(searchInput?.value || '');
      form.reset();
      if (window.Toast) window.Toast.show('Value Addition record saved', 'success');
    });

    exportBtn?.addEventListener('click', () => {
      const headers = ["S.No", "Arrival Code", "Production Plant", "Soaking Plant", "Transaction Date", "Shift", "Variety", "HL Wt(Kgs)", "HL Count", "No of Crates", "VA Out Quantity", "Rejection Weight", "Yield"];
      const rows = this.valueAdditionList.map((r, i) => [
        i + 1,
        `"${r.arrivalCode || ''}"`,
        `"${r.plant || ''}"`,
        `"${r.soakingPlant || ''}"`,
        `"${r.date || ''}"`,
        `"${r.shift || ''}"`,
        `"${r.variety || ''}"`,
        r.hlWeight || 0,
        r.hlCount || 0,
        r.crates || 1,
        r.vaOutQty || 0,
        r.rejectionWt || 0,
        (r.yieldPct || 0).toFixed(2)
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `value_addition_trackid_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (window.Toast) window.Toast.show('Value Addition report exported to CSV', 'success');
    });
  },'''

HON_QTY_TRANSFER_CODE = '''  renderHonQtyTransfer(container) {
    if (!this.honTransferList || this.honTransferList.length === 0) {
      this.honTransferList = [
        { id: "HT-01", sNo: 1, arrivalDate: "20-02-2025", billDate: "19-02-2025", billNumber: "MKP/2425/2346", plant: "DFL UNIT-1 (VSP)", purchaseCount: "60.000", purchaseWeight: "1591.000", rmPlant: "DFL UNIT-1 (VSP)", transferDate: "23-10-2026", vaWeightQty: "23.000" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">HON QTY TRANSFER AFTER VA</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Operations &bull; Head-On Quantity Inter-Plant Requisition</span>
        </div>

        <!-- Upper Card: Entry Form -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form id="ht-form" class="space-y-4">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-red-500 font-bold">*</span></label>
                <select id="ht-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="VSP-DFL UNIT-1 (VSP)" selected>VSP-DFL UNIT-1 (VSP)</option>
                  <option value="KKD-DFL UNIT-2 (KKD)">KKD-DFL UNIT-2 (KKD)</option>
                  <option value="PSP-DFL UNIT-3 (PSP)">PSP-DFL UNIT-3 (PSP)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="ht-arrival-date" value="2025-02-20" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TRACK ID <span class="text-red-500 font-bold">*</span></label>
                <select id="ht-track-id" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="VM-VSP-MKP-049" selected>VM-VSP-MKP-049</option>
                  <option value="VM-VSP-AMP-056">VM-VSP-AMP-056</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL CODE <span class="text-red-500 font-bold">*</span></label>
                <select id="ht-arrival-code" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="MKP/2425/2346" selected>MKP/2425/2346, MKP/2425/2347 Mix (60.00, 105.00...)</option>
                </select>
              </div>
            </div>

            <!-- Row 2: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HON COUNT <span class="text-red-500 font-bold">*</span></label>
                <select id="ht-hon-count" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="60.00C - 1591.00KGs - MKP/2425/2346" selected>60.00C - 1591.00KGs - MKP/2425/2346</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HON WEIGHT (TOTAL : 1591 KGS) <span class="text-red-500 font-bold">*</span></label>
                <input type="text" value="Balance : 1568 KGs" readonly class="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#64748B] font-semibold focus:outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">WEIGHT <span class="text-red-500 font-bold">*</span></label>
                <input type="number" step="0.01" id="ht-weight" placeholder="Enter Weight" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all font-semibold">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TRANSFER PLANT <span class="text-red-500 font-bold">*</span></label>
                <select id="ht-transfer-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="DFL UNIT-2 (KKD)" selected>DFL UNIT-2 (KKD)</option>
                  <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                  <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                </select>
              </div>
            </div>

            <!-- Row 3: 1 Column -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TRANSFER DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="ht-transfer-date" value="2026-10-23" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Action Buttons: Close, Submit -->
            <div class="flex items-center justify-center gap-3 pt-2">
              <button type="button" id="ht-btn-close" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer">
                Close
              </button>
              <button type="submit" class="px-7 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Submit
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Register Table -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
              <input type="text" id="ht-search" placeholder="Search..." class="w-full pl-9 pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <button type="button" id="ht-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.No</th>
                  <th class="py-2.5 px-3">Arrival Date</th>
                  <th class="py-2.5 px-3">Bill Date</th>
                  <th class="py-2.5 px-3">Bill Number</th>
                  <th class="py-2.5 px-3">Production Plant</th>
                  <th class="py-2.5 px-3 text-right">Purchase Count</th>
                  <th class="py-2.5 px-3 text-right">Purchase Weight</th>
                  <th class="py-2.5 px-3">Rm Production plant</th>
                  <th class="py-2.5 px-3">Transfer Date</th>
                  <th class="py-2.5 px-3 text-right">VA Weight Qty</th>
                  <th class="py-2.5 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="ht-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('ht-table-body');
    const searchInput = document.getElementById('ht-search');
    const form = document.getElementById('ht-form');
    const exportBtn = document.getElementById('ht-export-excel');
    const closeBtn = document.getElementById('ht-btn-close');

    const renderTable = (query = '') => {
      const q = query.toLowerCase().trim();
      const filtered = this.honTransferList.filter(r => {
        if (!q) return true;
        return `${r.billNumber || ''} ${r.plant || ''} ${r.rmPlant || ''}`.toLowerCase().includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="11" class="text-center py-8 text-[#94A3B8] text-xs font-medium">No data available in table</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map((r, idx) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors">
          <td class="py-2.5 px-3 font-bold text-[#64748B]">${idx + 1}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.arrivalDate || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.billDate || '-'}</td>
          <td class="py-2.5 px-3 font-bold text-[#0F172A]">${r.billNumber || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.plant || '-'}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#334155]">${Number(r.purchaseCount || 0).toFixed(3)}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#0F172A]">${Number(r.purchaseWeight || 0).toFixed(3)}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.rmPlant || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.transferDate || '-'}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#006644]">${Number(r.vaWeightQty || 0).toFixed(3)}</td>
          <td class="py-2.5 px-3 text-center">
            <button type="button" data-del-id="${r.id}" class="ht-del p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer" title="Delete Transfer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.ht-del').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-del-id');
          if (confirm('Delete this transfer manifest?')) {
            this.honTransferList = this.honTransferList.filter(x => x.id !== id);
            renderTable(searchInput?.value || '');
            if (window.Toast) window.Toast.show('Transfer record deleted', 'info');
          }
        });
      });
    };

    renderTable();

    searchInput?.addEventListener('input', (e) => renderTable(e.target.value));

    closeBtn?.addEventListener('click', () => {
      form.reset();
      if (window.Toast) window.Toast.show('Transfer form closed', 'info');
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const wt = parseFloat(document.getElementById('ht-weight').value) || 0;
      const newRec = {
        id: 'HT-' + String(Date.now()).slice(-6),
        sNo: this.honTransferList.length + 1,
        arrivalDate: document.getElementById('ht-arrival-date').value.split('-').reverse().join('-'),
        billDate: "19-02-2025",
        billNumber: "MKP/2425/2346",
        plant: document.getElementById('ht-plant').value,
        purchaseCount: "60.000",
        purchaseWeight: "1591.000",
        rmPlant: document.getElementById('ht-plant').value,
        transferDate: document.getElementById('ht-transfer-date').value,
        vaWeightQty: wt.toFixed(3)
      };
      this.honTransferList.unshift(newRec);
      renderTable(searchInput?.value || '');
      form.reset();
      if (window.Toast) window.Toast.show('HON transfer manifest submitted successfully!', 'success');
    });

    exportBtn?.addEventListener('click', () => {
      const headers = ["S.No", "Arrival Date", "Bill Date", "Bill Number", "Production Plant", "Purchase Count", "Purchase Weight", "Rm Production plant", "Transfer Date", "VA Weight Qty"];
      const rows = this.honTransferList.map((r, i) => [
        i + 1,
        `"${r.arrivalDate || ''}"`,
        `"${r.billDate || ''}"`,
        `"${r.billNumber || ''}"`,
        `"${r.plant || ''}"`,
        r.purchaseCount || 0,
        r.purchaseWeight || 0,
        `"${r.rmPlant || ''}"`,
        `"${r.transferDate || ''}"`,
        r.vaWeightQty || 0
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `hon_qty_transfer_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (window.Toast) window.Toast.show('HON Transfer report exported to CSV', 'success');
    });
  },'''

def update_file(filepath):
    print(f"Updating {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Clean double initDeheadingStorage if present
    content = content.replace('''  initDeheadingStorage() {
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

  initDeheadingStorage() {''', '''  initDeheadingStorage() {''')

    # 1. Replace renderRmReceived
    # From '  renderRmReceived(container) {' to 'renderDeheading(container)'
    rm_pattern = r'  renderRmReceived\(container\)\s*\{[\s\S]*?\n  \},\n\n  initDeheadingStorage'
    if re.search(rm_pattern, content):
        content = re.sub(rm_pattern, RM_RECEIVED_CODE + '\n\n  initDeheadingStorage', content)
        print("  ✓ Replaced renderRmReceived")
    else:
        print("  ! renderRmReceived pattern not matched")

    # 2. Replace renderDeheadingTrackid through renderHonQtyTransfer
    # Matches from renderDeheadingTrackid to renderTrackCodeReport
    rest_pattern = r'  renderDeheadingTrackid\(container\)\s*\{[\s\S]*?\n  \},\n\n  // =+\n  // 4\. TRACEABILITY & RECONCILIATION'
    replacement_rest = DEHEADING_TRACKID_CODE + '\n\n' + GRADING_TRACKID_CODE + '\n\n' + VALUE_ADDITION_CODE + '\n\n' + HON_QTY_TRANSFER_CODE + '\n\n  // ============================================\n  // 4. TRACEABILITY & RECONCILIATION'

    if re.search(rest_pattern, content):
        content = re.sub(rest_pattern, replacement_rest, content)
        print("  ✓ Replaced renderDeheadingTrackid, renderGradingTrackid, renderValueAddition, renderHonQtyTransfer")
    else:
        print("  ! rest_pattern not matched")

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

    print("\nAll 5 operations screens updated successfully!")

if __name__ == '__main__':
    main()
