#!/usr/bin/env python3
"""
scripts/update_insurance_tabs.py

Standardizes the 3 Insurance tab menus under Sales > Insurance to the Base Design System:
1. PENDING INSURANCE (media_1792750894317_f2cd225b.png)
   - Title: PENDING INSURANCE
   - Search Card: Select Year:, Select Exporter:, Select Consignee:, Select Country:, Search ->, + Save
   - Table: Checkbox, S.No, ID, Inv No, Vessel Name, Shipping Onboard Dt, Container No, Port of Loading, Port Of Discharge, Destination Country, Total Invoice Value, Action (eye)
   - Realistic records from Image 1
   - Modal on Action eye: Marine Cargo Insurance Policy Cover Details
   - Checkbox selection & batch template generation
   - Reconciled Totals Card at bottom

2. INSURANCE TEMPLATES (media_1792750904119_7037549c.png)
   - Title: INSURANCE TEMPLATE
   - Table: S.No, Invoice Template No, Generated On, Actions (Download, Eye, Trash)
   - Records: TRANSIT242, REJECT168, TRANSIT239, TRANSIT238, REJECT167, TRANSIT237, REJECT166, TRANSIT236
   - Actions: download declaration, view breakdown modal, delete
   - Reconciled Totals Card at bottom

3. INSURANCE PAYMENTS (media_1792750913712_d017d3b0.png)
   - Top Header: INSURANCE TEMPLATE with Select Year:, Search ->, + Save
   - Bottom Header: INSURANCE PAYMENTS
   - Table: Checkbox, S.No., INS No, Invoices
   - Records: TRANSIT242, REJECT168, TRANSIT239, TRANSIT238, REJECT167
   - Modal on INS No: Premium Payment & Debit Note Settlement Details
   - Reconciled Totals Card at bottom
"""

import os

INSURANCE_IMPLEMENTATION_JS = r'''  // ==========================================
  // 10. MARINE CARGO INSURANCE REGISTERS
  // ==========================================
  pendingInsuranceDataset: [
    {
      sNo: 1,
      id: '3325',
      invNo: 'DFL/PSP/2425/333',
      vesselName: 'SNL ZHANGJIAGANG2410E',
      shippingOnboardDt: '30-12-2024',
      containerNo: 'TLLU1128564',
      portOfLoading: 'VISAKHAPATNAM',
      portOfDischarge: 'VLADIVOSTOK',
      destinationCountry: 'RUSSIA',
      totalInvoiceValue: 12481326.05,
      year: '2024-2025',
      exporter: 'DEVI FISHERIES LIMITED',
      consignee: 'METRO CASH & CARRY OOO',
      selected: false
    },
    {
      sNo: 2,
      id: '2332',
      invNo: 'DFL/PSP/2425/132',
      vesselName: 'MSC PATNAREE IIISV433R',
      shippingOnboardDt: '21-08-2024',
      containerNo: 'MEDU9897406',
      portOfLoading: 'VISAKHAPATNAM',
      portOfDischarge: 'ST PETERSBURG',
      destinationCountry: 'RUSSIA',
      totalInvoiceValue: 171600.00,
      year: '2024-2025',
      exporter: 'DEVI FISHERIES LIMITED',
      consignee: 'METRO CASH & CARRY OOO',
      selected: false
    },
    {
      sNo: 3,
      id: '2333',
      invNo: 'DFL/PSP/2425/133',
      vesselName: 'MAERSK MC-KINNEY MOLLER',
      shippingOnboardDt: '15-09-2024',
      containerNo: 'MSKU8291045',
      portOfLoading: 'VISAKHAPATNAM',
      portOfDischarge: 'ROTTERDAM',
      destinationCountry: 'NETHERLANDS',
      totalInvoiceValue: 189450.00,
      year: '2024-2025',
      exporter: 'DEVI FISHERIES LIMITED',
      consignee: 'SEAFOOD CONNECTION B.V.',
      selected: false
    },
    {
      sNo: 4,
      id: '2334',
      invNo: 'DFL/JPT/2425/150',
      vesselName: 'CMA CGM MARCO POLO',
      shippingOnboardDt: '22-09-2024',
      containerNo: 'CMAU4921087',
      portOfLoading: 'VISAKHAPATNAM',
      portOfDischarge: 'LOS ANGELES',
      destinationCountry: 'U.S.A.',
      totalInvoiceValue: 245800.00,
      year: '2024-2025',
      exporter: 'DEVI FISHERIES LIMITED',
      consignee: 'C.P. FOOD PRODUCTS, INC.',
      selected: false
    }
  ],

  insuranceTemplatesDataset: [
    { sNo: 1, templateNo: 'TRANSIT242', generatedOn: '21-10-2026 18:38:40', invoicesCount: 77, status: 'Active' },
    { sNo: 2, templateNo: 'REJECT168', generatedOn: '01-09-2026 15:55:40', invoicesCount: 3, status: 'Rejected' },
    { sNo: 3, templateNo: 'TRANSIT239', generatedOn: '01-09-2026 15:54:20', invoicesCount: 30, status: 'Active' },
    { sNo: 4, templateNo: 'TRANSIT238', generatedOn: '27-08-2026 15:02:12', invoicesCount: 27, status: 'Active' },
    { sNo: 5, templateNo: 'REJECT167', generatedOn: '24-08-2026 17:33:36', invoicesCount: 2, status: 'Rejected' },
    { sNo: 6, templateNo: 'TRANSIT237', generatedOn: '24-08-2026 17:32:26', invoicesCount: 24, status: 'Active' },
    { sNo: 7, templateNo: 'REJECT166', generatedOn: '13-08-2026 16:25:00', invoicesCount: 4, status: 'Rejected' },
    { sNo: 8, templateNo: 'TRANSIT236', generatedOn: '13-08-2026 16:06:38', invoicesCount: 22, status: 'Active' }
  ],

  insurancePaymentsDataset: [
    {
      sNo: 1,
      insNo: 'TRANSIT242',
      invoices: 'DFL/PSP/2627/031 , DFL/PSP/2627/067 , DFL/PSP/2627/088 , DFL/PSP/2627/107 , DFL/PSP/2627/132 , DFL/PSP/2627/022 , DFL/PSP/2627/087 , DFL/JPT/2627/310 , DFL/PND/2627/209 , DFL/PSP/2627/144 , DFL/PSP/2627/041 , DFL/PSP/2627/050 , DFL/PND/2627/208 , DFL/JPT/2627/309 , DFL/JPT/2627/299 , DFL/JPT/2627/306 , DFL/PND/2627/205 , DFL/JPT/2627/298 , DFL/JPT/2627/312 , DFL/PSP/2627/147 , DFL/SNM/2627/139 , DFL/JPT/2627/295 , DFL/JPT/2627/300 , DFL/JPT/2627/305 , DFL/JPT/2627/311 , DFL/SNM/2627/049 , DFL/SNM/2627/051 , DFL/SNM/2627/084 , DFL/SNM/2627/099 , DFL/SNM/2627/071 , DFL/JPT/2627/302 , DFL/PND/2627/203 , DFL/JPT/2627/301 , DFL/JPT/2627/296 , DFL/JPT/2627/297 , DFL/JPT/2627/313 , DFL/PSP/2627/141 , DFL/PSP/2627/142 , DFL/PSP/2627/145 , DFL/JPT/2627/304 , DFL/PSP/2627/111 , DFL/PSP/2627/096 , DFL/PSP/2627/116 , DFL/PSP/2627/095 , DFL/PSP/2627/146 , DFL/PND/2627/206 , DFL/PND/2627/210 , DFL/PSP/2627/133 , DFL/SNM/2627/137 , DFL/PND/2627/204 , DFL/PSP/2627/115 , DFL/PSP/2627/127 , DFL/PSP/2627/128 , DFL/JPT/2627/303 , DFL/SNM/2627/138 , DFL/SNM/2627/142 , DFL/PND/2627/211 , DFL/JPT/2627/289 , DFL/PND/2627/212 , DFL/JPT/2627/308 , DFL/JPT/2627/307 , DFL/SNM/2627/140 , DFL/PSP/2627/138 , DFL/PSP/2627/139 , DFL/SNM/2627/144 , DFL/SNM/2627/141 , DFL/PND/2627/207 , DFL/PSP/2627/143 , DFL/KKD/2627/150 , DFL/KKD/2627/148 , DFL/KKD/2627/154 , DFL/KKD/2627/153 , DFL/KKD/2627/155 , DFL/KKD/2627/152 , DFL/KKD/2627/151 , DFL/SNM/2627/143 , DFL/SNM/2627/145',
      year: '2026-2027',
      premiumUsd: 14250.00,
      selected: false
    },
    {
      sNo: 2,
      insNo: 'REJECT168',
      invoices: 'DFL/PSP/2627/123 , DFL/KKD/2627/135 , DFL/PSP/2627/120',
      year: '2026-2027',
      premiumUsd: 850.00,
      selected: false
    },
    {
      sNo: 3,
      insNo: 'TRANSIT239',
      invoices: 'DFL/PND/2627/174 , DFL/PND/2627/175 , DFL/JPT/2627/263 , DFL/PND/2627/172 , DFL/PND/2627/165 , DFL/JPT/2627/264 , DFL/SNM/2627/119 , DFL/SNM/2627/113 , DFL/JPT/2627/274 , DFL/PND/2627/173 , DFL/JPT/2627/256 , DFL/PND/2627/178 , DFL/PND/2627/171 , DFL/JPT/2627/259 , DFL/JPT/2627/275 , DFL/PND/2627/177 , DFL/JPT/2627/257 , DFL/JPT/2627/270 , DFL/JPT/2627/273 , DFL/JPT/2627/271 , DFL/JPT/2627/272 , DFL/PSP/2627/122 , DFL/PND/2627/179 , DFL/PND/2627/166 , DFL/PSP/2627/121 , DFL/PND/2627/176 , DFL/PSP/2627/113 , DFL/PSP/2627/110 , DFL/PSP/2627/119 , DFL/PSP/2627/118',
      year: '2026-2027',
      premiumUsd: 6200.00,
      selected: false
    },
    {
      sNo: 4,
      insNo: 'TRANSIT238',
      invoices: 'DFL/JPT/2627/247 , DFL/PSP/2627/114 , DFL/JPT/2627/245 , DFL/JPT/2627/251 , DFL/JPT/2627/250 , DFL/JPT/2627/258 , DFL/SNM/2627/118 , DFL/PND/2627/170 , DFL/PSP/2627/112 , DFL/PSP/2627/117 , DFL/JPT/2627/246 , DFL/JPT/2627/253 , DFL/JPT/2627/267 , DFL/JPT/2627/265 , DFL/JPT/2627/260 , DFL/JPT/2627/248 , DFL/PND/2627/164 , DFL/PND/2627/167 , DFL/PND/2627/168 , DFL/JPT/2627/268 , DFL/JPT/2627/261 , DFL/KKD/2627/134 , DFL/JPT/2627/266 , DFL/JPT/2627/262 , DFL/JPT/2627/249 , DFL/JPT/2627/269 , DFL/SNM/2627/115',
      year: '2026-2027',
      premiumUsd: 5800.00,
      selected: false
    },
    {
      sNo: 5,
      insNo: 'REJECT167',
      invoices: 'DFL/PSP/2627/105 , DFL/SNM/2627/100',
      year: '2026-2027',
      premiumUsd: 450.00,
      selected: false
    }
  ],

  // ------------------------------------------
  // 10.1 PENDING INSURANCE (IMAGE 1)
  // ------------------------------------------
  renderPendingInsurance(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">PENDING INSURANCE</h2>
        </div>

        <!-- 2. Clean Search & Filters Card (Exact to Image 1, No Empty Circles) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-4">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Year:</label>
              <select id="sales-pins-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2024-2025" selected>2024-2025</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2026-2027">2026-2027</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Exporter:</label>
              <select id="sales-pins-exporter" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUATECH PVT LTD">DEVI AQUATECH PVT LTD</option>
                <option value="SATYA SEAFOODS">SATYA SEAFOODS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Consignee:</label>
              <select id="sales-pins-consignee" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="METRO CASH & CARRY OOO">METRO CASH & CARRY OOO</option>
                <option value="SEAFOOD CONNECTION B.V.">SEAFOOD CONNECTION B.V.</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Country:</label>
              <select id="sales-pins-country" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="RUSSIA">RUSSIA</option>
                <option value="NETHERLANDS">NETHERLANDS</option>
                <option value="U.S.A.">U.S.A.</option>
              </select>
            </div>
          </div>

          <div class="flex items-center justify-center gap-3 pt-1">
            <button id="btn-pins-search" class="px-6 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterPendingInsurance()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <button id="btn-pins-save" class="px-5 py-2 bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.generateInsuranceTemplateFromSelection()">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>+ Save</span>
            </button>
          </div>
        </div>

        <!-- 3. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-pins-search-input" 
                placeholder="Search pending insurance..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchPendingInsurance(this.value)"
              />
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#006C7A] hover:text-[#005662] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadPendingInsuranceExcel()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Download Excel</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider whitespace-nowrap">
                  <th class="py-3 px-3 text-center w-8">
                    <input type="checkbox" id="pins-check-all" class="rounded border-[#CBD5E1] text-[#006C7A] focus:ring-[#006C7A] cursor-pointer" onchange="SalesView.toggleAllPendingInsurance(this.checked)">
                  </th>
                  <th class="py-3 px-3">S.No</th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">Inv No</th>
                  <th class="py-3 px-3">Vessel Name</th>
                  <th class="py-3 px-3">Shipping Onboard Dt</th>
                  <th class="py-3 px-3">Container No</th>
                  <th class="py-3 px-3">Port of Loading</th>
                  <th class="py-3 px-3">Port Of Discharge</th>
                  <th class="py-3 px-3">Destination Country</th>
                  <th class="py-3 px-3 text-right">Total Invoice Value</th>
                  <th class="py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody id="sales-pins-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-pins-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderPendingInsuranceRows(this.pendingInsuranceDataset);
    this.renderPendingInsuranceTotals(this.pendingInsuranceDataset);
  },

  renderPendingInsuranceRows(list) {
    const tbody = document.getElementById('sales-pins-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="12" class="py-8 text-center text-[#64748B] text-xs">
            No pending insurance consignments found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 text-center">
          <input type="checkbox" value="${r.id}" ${r.selected ? 'checked' : ''} class="pins-row-check rounded border-[#CBD5E1] text-[#006C7A] focus:ring-[#006C7A] cursor-pointer" onchange="SalesView.togglePendingInsuranceRow('${r.id}', this.checked)">
        </td>
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
        <td class="py-3 px-3 font-mono font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openPendingInsuranceModal('${r.id}')">${r.id}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A] hover:text-[#006C7A] cursor-pointer" onclick="SalesView.openPendingInsuranceModal('${r.id}')">${r.invNo}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.vesselName}</td>
        <td class="py-3 px-3 text-[#475569] whitespace-nowrap">${r.shippingOnboardDt}</td>
        <td class="py-3 px-3 font-mono text-[#006C7A] font-semibold">${r.containerNo}</td>
        <td class="py-3 px-3 text-[#475569]">${r.portOfLoading}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A]">${r.portOfDischarge}</td>
        <td class="py-3 px-3 font-bold text-[#475569] uppercase">${r.destinationCountry}</td>
        <td class="py-3 px-3 font-extrabold text-[#006644] text-right">$${(r.totalInvoiceValue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <button 
            type="button" 
            class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
            title="View Marine Insurance Endorsement" 
            onclick="SalesView.openPendingInsuranceModal('${r.id}')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderPendingInsuranceTotals(list) {
    const el = document.getElementById('sales-pins-totals');
    if (!el) return;

    const count = list.length;
    const totalVal = list.reduce((sum, r) => sum + (Number(r.totalInvoiceValue) || 0), 0);
    const selectedCount = list.filter(r => r.selected).length;

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Declarations</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Shipments</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Selected for Batch</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">${selectedCount} <span class="text-xs font-semibold text-[#006C7A]">Invoices</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Declared Value</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">$${totalVal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Marine Cargo Cover</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">ICC (A) <span class="text-[11px] font-semibold text-[#64748B]">All Risks 110%</span></div>
        </div>
      </div>
    `;
  },

  toggleAllPendingInsurance(checked) {
    this.pendingInsuranceDataset.forEach(r => r.selected = checked);
    this.renderPendingInsuranceRows(this.pendingInsuranceDataset);
    this.renderPendingInsuranceTotals(this.pendingInsuranceDataset);
  },

  togglePendingInsuranceRow(id, checked) {
    const record = this.pendingInsuranceDataset.find(x => x.id === id);
    if (record) record.selected = checked;
    this.renderPendingInsuranceTotals(this.pendingInsuranceDataset);
  },

  filterPendingInsurance() {
    const consignee = document.getElementById('sales-pins-consignee')?.value || 'All';
    const country = document.getElementById('sales-pins-country')?.value || 'All';

    const filtered = this.pendingInsuranceDataset.filter(r => {
      const matchConsignee = consignee === 'All' || r.consignee === consignee;
      const matchCountry = country === 'All' || r.destinationCountry === country;
      return matchConsignee && matchCountry;
    });

    this.renderPendingInsuranceRows(filtered);
    this.renderPendingInsuranceTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} pending insurance shipments`, 'info');
    }
  },

  searchPendingInsurance(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderPendingInsuranceRows(this.pendingInsuranceDataset);
      this.renderPendingInsuranceTotals(this.pendingInsuranceDataset);
      return;
    }

    const filtered = this.pendingInsuranceDataset.filter(r => 
      (r.invNo || '').toLowerCase().includes(q) ||
      (r.vesselName || '').toLowerCase().includes(q) ||
      (r.containerNo || '').toLowerCase().includes(q) ||
      (r.destinationCountry || '').toLowerCase().includes(q)
    );

    this.renderPendingInsuranceRows(filtered);
    this.renderPendingInsuranceTotals(filtered);
  },

  downloadPendingInsuranceExcel() {
    const headers = ['S.No', 'ID', 'Inv No', 'Vessel Name', 'Shipping Onboard Dt', 'Container No', 'Port of Loading', 'Port Of Discharge', 'Destination Country', 'Total Invoice Value'];
    const rows = this.pendingInsuranceDataset.map(r => [
      r.sNo,
      r.id,
      `"${r.invNo}"`,
      `"${r.vesselName}"`,
      `"${r.shippingOnboardDt}"`,
      `"${r.containerNo}"`,
      `"${r.portOfLoading}"`,
      `"${r.portOfDischarge}"`,
      `"${r.destinationCountry}"`,
      r.totalInvoiceValue
    ].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `pending_insurance_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported pending insurance to Excel/CSV', 'success');
    }
  },

  generateInsuranceTemplateFromSelection() {
    const selectedRows = this.pendingInsuranceDataset.filter(r => r.selected);
    const count = selectedRows.length > 0 ? selectedRows.length : this.pendingInsuranceDataset.length;
    const targets = selectedRows.length > 0 ? selectedRows : this.pendingInsuranceDataset;

    const newTemplateNo = 'TRANSIT' + (243 + this.insuranceTemplatesDataset.length);
    const invoiceListStr = targets.map(r => r.invNo).join(' , ');

    // Add to Templates dataset
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 8);
    this.insuranceTemplatesDataset.unshift({
      sNo: this.insuranceTemplatesDataset.length + 1,
      templateNo: newTemplateNo,
      generatedOn: dateStr,
      invoicesCount: count,
      status: 'Active'
    });
    this.insuranceTemplatesDataset.forEach((r, idx) => r.sNo = idx + 1);

    // Add to Payments dataset
    this.insurancePaymentsDataset.unshift({
      sNo: this.insurancePaymentsDataset.length + 1,
      insNo: newTemplateNo,
      invoices: invoiceListStr,
      year: '2026-2027',
      premiumUsd: count * 185.00,
      selected: false
    });
    this.insurancePaymentsDataset.forEach((r, idx) => r.sNo = idx + 1);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Generated Insurance Template #${newTemplateNo} with ${count} invoices`, 'success');
    }
  },

  openPendingInsuranceModal(id) {
    const record = this.pendingInsuranceDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Insurance Endorsement: ${record.invNo}`);
      return;
    }

    Modal.open({
      title: 'MARINE CARGO INSURANCE POLICY ENDORSEMENT',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Insurance &nbsp;&gt;&nbsp; Pending Insurance &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">${record.invNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Invoice Number</label>
                <input type="text" value="${record.invNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#006C7A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Vessel / Voyage</label>
                <input type="text" value="${record.vesselName}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Container Number</label>
                <input type="text" value="${record.containerNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-mono font-bold text-xs text-[#0F172A] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Port of Loading</label>
                <input type="text" value="${record.portOfLoading}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#475569] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Port of Discharge</label>
                <input type="text" value="${record.portOfDischarge}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Destination Country</label>
                <input type="text" value="${record.destinationCountry}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#0F172A] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Total Insured Value (CIF 110%)</label>
                <input type="text" value="$${record.totalInvoiceValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#DCFCE7] font-extrabold text-xs text-[#15803D] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Open Marine Cover Policy Number</label>
                <input type="text" value="OG-27-1801-9630-00000042 (United India Insurance)" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-mono font-semibold text-xs text-[#006C7A] outline-none">
              </div>
            </div>

            <div class="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <div class="flex items-center gap-2 text-[#006644] font-bold text-xs mb-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                <span>Institute Frozen Food Clauses (A) - 24 Hours Breakdown Covered</span>
              </div>
              <p class="text-[11px] text-[#64748B]">All-risk transit marine insurance covering reefer temperature variations, voyage deviation, general average, and jettison. Certificates generated on batch closure.</p>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Close',
          type: 'danger',
          onClick: (m) => m.close()
        }
      ]
    });
  },

  // ------------------------------------------
  // 10.2 INSURANCE TEMPLATES (IMAGE 2)
  // ------------------------------------------
  renderInsuranceTemplates(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">INSURANCE TEMPLATE</h2>
        </div>

        <!-- 2. Table Card (Exact to Image 2) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-inst-search-input" 
                placeholder="Search templates..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchInsuranceTemplates(this.value)"
              />
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#006C7A] hover:text-[#005662] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadInsuranceTemplatesExcel()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Download Excel</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider whitespace-nowrap">
                  <th class="py-3 px-3">S.No</th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortInsuranceTemplates('templateNo')">
                    <span class="inline-flex items-center gap-1">Invoice Template No <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortInsuranceTemplates('generatedOn')">
                    <span class="inline-flex items-center gap-1">Generated On <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-inst-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-inst-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderInsuranceTemplatesRows(this.insuranceTemplatesDataset);
    this.renderInsuranceTemplatesTotals(this.insuranceTemplatesDataset);
  },

  renderInsuranceTemplatesRows(list) {
    const tbody = document.getElementById('sales-inst-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" class="py-8 text-center text-[#64748B] text-xs">
            No insurance templates found.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
        <td class="py-3 px-3 font-mono font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openInsuranceTemplateModal('${r.templateNo}')">${r.templateNo}</td>
        <td class="py-3 px-3 text-[#0F172A] font-semibold whitespace-nowrap">${r.generatedOn}</td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <div class="flex items-center justify-center gap-2">
            <button 
              type="button" 
              class="w-6 h-6 inline-flex items-center justify-center text-[#059669] hover:text-[#047857] hover:bg-[#ECFDF5] rounded cursor-pointer transition-colors" 
              title="Download Declaration Template" 
              onclick="SalesView.downloadSingleInsuranceTemplate('${r.templateNo}')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            </button>
            <button 
              type="button" 
              class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
              title="View Invoice Inclusions" 
              onclick="SalesView.openInsuranceTemplateModal('${r.templateNo}')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </button>
            <button 
              type="button" 
              class="w-6 h-6 inline-flex items-center justify-center text-[#E11D48] hover:text-[#BE123C] hover:bg-[#FFF1F2] rounded cursor-pointer transition-colors" 
              title="Delete Template" 
              onclick="SalesView.deleteInsuranceTemplate('${r.templateNo}')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  renderInsuranceTemplatesTotals(list) {
    const el = document.getElementById('sales-inst-totals');
    if (!el) return;

    const count = list.length;
    const active = list.filter(r => r.status === 'Active').length;

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Generated Batches</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Templates</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Active Underwriter Filings</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${active} <span class="text-xs font-semibold text-[#006644]">Declared</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Latest Declaration Batch</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">${list[0]?.templateNo || 'TRANSIT242'}</div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Filing Status</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">Automated <span class="text-[11px] font-semibold text-[#64748B]">(API / EDI)</span></div>
        </div>
      </div>
    `;
  },

  searchInsuranceTemplates(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderInsuranceTemplatesRows(this.insuranceTemplatesDataset);
      this.renderInsuranceTemplatesTotals(this.insuranceTemplatesDataset);
      return;
    }

    const filtered = this.insuranceTemplatesDataset.filter(r => 
      (r.templateNo || '').toLowerCase().includes(q) ||
      (r.generatedOn || '').toLowerCase().includes(q)
    );

    this.renderInsuranceTemplatesRows(filtered);
    this.renderInsuranceTemplatesTotals(filtered);
  },

  sortInsuranceTemplates(key) {
    this.insuranceTemplatesDataset.reverse();
    this.renderInsuranceTemplatesRows(this.insuranceTemplatesDataset);
  },

  downloadInsuranceTemplatesExcel() {
    const headers = ['S.No', 'Invoice Template No', 'Generated On', 'Status'];
    const rows = this.insuranceTemplatesDataset.map(r => [
      r.sNo,
      `"${r.templateNo}"`,
      `"${r.generatedOn}"`,
      r.status
    ].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `insurance_templates_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported insurance templates register to Excel/CSV', 'success');
    }
  },

  downloadSingleInsuranceTemplate(templateNo) {
    const rec = this.insurancePaymentsDataset.find(x => x.insNo === templateNo);
    const invoices = rec ? rec.invoices.split(' , ') : ['DFL/PSP/2627/031', 'DFL/PSP/2627/067'];
    
    let csv = `Insurance Template,${templateNo}\nGenerated Date,${new Date().toISOString()}\nUnderwriter,United India Insurance Co. Ltd\n\nS.No,Invoice Number\n`;
    invoices.forEach((inv, i) => {
      csv += `${i + 1},"${inv}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `declaration_${templateNo}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Downloaded declaration manifest for #${templateNo}`, 'success');
    }
  },

  openInsuranceTemplateModal(templateNo) {
    const rec = this.insurancePaymentsDataset.find(x => x.insNo === templateNo);
    const invoices = rec ? rec.invoices.split(' , ') : ['DFL/PSP/2627/031', 'DFL/PSP/2627/067', 'DFL/PSP/2627/088'];

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Insurance Template: ${templateNo}`);
      return;
    }

    Modal.open({
      title: 'INSURANCE DECLARATION TEMPLATE BREAKDOWN',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Insurance &nbsp;&gt;&nbsp; Insurance Templates &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">${templateNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <div>
                <span class="text-[10px] font-bold text-[#64748B] uppercase">Template Identifier</span>
                <div class="text-base font-black text-[#006C7A]">${templateNo}</div>
              </div>
              <div class="text-right">
                <span class="text-[10px] font-bold text-[#64748B] uppercase">Invoices Attached</span>
                <div class="text-base font-black text-[#0F172A]">${invoices.length} Invoices</div>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-2">Declared Invoice Consignments</label>
              <div class="max-h-60 overflow-y-auto p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg flex flex-wrap gap-1.5">
                ${invoices.map(inv => `<span class="px-2 py-1 rounded text-[11px] font-mono font-semibold bg-white border border-[#CBD5E1] text-[#0F172A] shadow-2xs">${inv.trim()}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Close',
          type: 'danger',
          onClick: (m) => m.close()
        }
      ]
    });
  },

  deleteInsuranceTemplate(templateNo) {
    if (confirm(`Are you sure you want to delete insurance template #${templateNo}?`)) {
      this.insuranceTemplatesDataset = this.insuranceTemplatesDataset.filter(x => x.templateNo !== templateNo);
      this.insuranceTemplatesDataset.forEach((r, idx) => r.sNo = idx + 1);
      this.renderInsuranceTemplatesRows(this.insuranceTemplatesDataset);
      this.renderInsuranceTemplatesTotals(this.insuranceTemplatesDataset);
      if (typeof Toast !== 'undefined' && Toast.show) {
        Toast.show(`Deleted template #${templateNo}`, 'info');
      }
    }
  },

  // ------------------------------------------
  // 10.3 INSURANCE PAYMENTS (IMAGE 3)
  // ------------------------------------------
  renderInsurancePayments(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- Top Section Header -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">INSURANCE TEMPLATE</h2>
        </div>

        <!-- Top Filter Card (Exact to Image 3) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="flex flex-wrap items-end gap-4 mb-2">
            <div class="w-64">
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Year:</label>
              <select id="sales-inspay-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
              </select>
            </div>

            <div class="flex items-center gap-3">
              <button id="btn-inspay-search" class="px-6 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterInsurancePayments()">
                <span>Search</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
              <button id="btn-inspay-save" class="px-5 py-2 bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.settleInsurancePaymentSelection()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                <span>+ Save</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Bottom Section Header -->
        <div class="mt-6 mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">INSURANCE PAYMENTS</h2>
        </div>

        <!-- Bottom Table Card (Exact to Image 3) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-inspay-search-input" 
                placeholder="Search insurance declarations and invoices..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchInsurancePayments(this.value)"
              />
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#006C7A] hover:text-[#005662] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadInsurancePaymentsExcel()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Download Excel</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-3 text-center w-8">
                    <input type="checkbox" id="inspay-check-all" class="rounded border-[#CBD5E1] text-[#006C7A] focus:ring-[#006C7A] cursor-pointer" onchange="SalesView.toggleAllInsurancePayments(this.checked)">
                  </th>
                  <th class="py-3 px-3">S.No.</th>
                  <th class="py-3 px-3">INS No</th>
                  <th class="py-3 px-3">Invoices</th>
                </tr>
              </thead>
              <tbody id="sales-inspay-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-inspay-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderInsurancePaymentsRows(this.insurancePaymentsDataset);
    this.renderInsurancePaymentsTotals(this.insurancePaymentsDataset);
  },

  renderInsurancePaymentsRows(list) {
    const tbody = document.getElementById('sales-inspay-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" class="py-8 text-center text-[#64748B] text-xs">
            No insurance payment declarations found.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 text-center">
          <input type="checkbox" value="${r.insNo}" ${r.selected ? 'checked' : ''} class="inspay-row-check rounded border-[#CBD5E1] text-[#006C7A] focus:ring-[#006C7A] cursor-pointer" onchange="SalesView.toggleInsurancePaymentRow('${r.insNo}', this.checked)">
        </td>
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
        <td class="py-3 px-3 font-mono font-bold text-[#006C7A] hover:underline cursor-pointer whitespace-nowrap" onclick="SalesView.openInsurancePaymentModal('${r.insNo}')">${r.insNo}</td>
        <td class="py-3 px-3 font-medium text-[#334155] leading-relaxed break-words">${r.invoices}</td>
      </tr>
    `).join('');
  },

  renderInsurancePaymentsTotals(list) {
    const el = document.getElementById('sales-inspay-totals');
    if (!el) return;

    const count = list.length;
    const totalPremium = list.reduce((sum, r) => sum + (Number(r.premiumUsd) || 0), 0);

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Declaration Batches</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Declarations</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Settled Premium (USD)</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">$${totalPremium.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Underwriter Master Policy</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">OG-27-1801 <span class="text-[11px] font-semibold text-[#64748B]">(United India)</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Policy Premium Status</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">Active Paid <span class="text-[11px] font-semibold text-[#006644]">(Valid Till 2027)</span></div>
        </div>
      </div>
    `;
  },

  toggleAllInsurancePayments(checked) {
    this.insurancePaymentsDataset.forEach(r => r.selected = checked);
    this.renderInsurancePaymentsRows(this.insurancePaymentsDataset);
    this.renderInsurancePaymentsTotals(this.insurancePaymentsDataset);
  },

  toggleInsurancePaymentRow(insNo, checked) {
    const record = this.insurancePaymentsDataset.find(x => x.insNo === insNo);
    if (record) record.selected = checked;
    this.renderInsurancePaymentsTotals(this.insurancePaymentsDataset);
  },

  filterInsurancePayments() {
    const year = document.getElementById('sales-inspay-year')?.value || '2026-2027';
    const filtered = this.insurancePaymentsDataset.filter(r => !year || r.year === year);
    this.renderInsurancePaymentsRows(filtered);
    this.renderInsurancePaymentsTotals(filtered);
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} insurance declarations`, 'info');
    }
  },

  searchInsurancePayments(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderInsurancePaymentsRows(this.insurancePaymentsDataset);
      this.renderInsurancePaymentsTotals(this.insurancePaymentsDataset);
      return;
    }

    const filtered = this.insurancePaymentsDataset.filter(r => 
      (r.insNo || '').toLowerCase().includes(q) ||
      (r.invoices || '').toLowerCase().includes(q)
    );

    this.renderInsurancePaymentsRows(filtered);
    this.renderInsurancePaymentsTotals(filtered);
  },

  settleInsurancePaymentSelection() {
    const selected = this.insurancePaymentsDataset.filter(r => r.selected);
    const count = selected.length > 0 ? selected.length : 1;
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Settled insurance debit notes for ${count} declaration batch(es)`, 'success');
    }
  },

  downloadInsurancePaymentsExcel() {
    const headers = ['S.No.', 'INS No', 'Invoices', 'Year', 'Premium USD'];
    const rows = this.insurancePaymentsDataset.map(r => [
      r.sNo,
      `"${r.insNo}"`,
      `"${r.invoices.replace(/"/g, '""')}"`,
      r.year,
      r.premiumUsd
    ].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `insurance_payments_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported insurance payments register to Excel/CSV', 'success');
    }
  },

  openInsurancePaymentModal(insNo) {
    const record = this.insurancePaymentsDataset.find(x => x.insNo === insNo);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Declaration Payment: ${record.insNo}`);
      return;
    }

    Modal.open({
      title: 'INSURANCE PREMIUM SETTLEMENT & DEBIT NOTE DETAILS',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Insurance &nbsp;&gt;&nbsp; Insurance Payments &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">${record.insNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Declaration Identifier</label>
                <input type="text" value="${record.insNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-mono font-bold text-xs text-[#006C7A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Financial Period</label>
                <input type="text" value="${record.year}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Premium Amount (USD)</label>
                <input type="text" value="$${record.premiumUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#DCFCE7] font-extrabold text-xs text-[#15803D] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Underwriter Entity</label>
                <input type="text" value="United India Insurance Co. Ltd (Divisional Office)" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Debit Note / Endorsement Number</label>
                <input type="text" value="DN-2026-${record.insNo}-901" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-mono font-bold text-xs text-[#006C7A] outline-none">
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Invoices Consolidated Under This Certificate</label>
              <textarea rows="3" readonly class="w-full p-2 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] font-medium text-xs text-[#334155] outline-none">${record.invoices}</textarea>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Close',
          type: 'danger',
          onClick: (m) => m.close()
        }
      ]
    });
  },
'''

TARGET_BLOCK = '''  // ==========================================
  // 4. MARINE CARGO INSURANCE
  // ==========================================
  renderPendingInsurance(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Marine Cargo Insurance Pending Declarations')}
        <div class="p-8 bg-white rounded-xl border border-[#DFE1E6] text-center">
          <p class="text-xs text-[#5E6C84]">All marine insurance policy endorsements for FY 2026-27 are currently active with United India Insurance.</p>
        </div>
      </div>
    `;
  },

  renderInsuranceTemplates(container) {
    this.renderPendingInsurance(container);
  },

  renderInsurancePayments(container) {
    this.renderPendingInsurance(container);
  },'''

def update_file(path):
    print(f"Updating {path}...")
    if not os.path.exists(path):
        print(f"  [ERROR] File not found: {path}")
        return False

    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    if TARGET_BLOCK in content:
        content = content.replace(TARGET_BLOCK, INSURANCE_IMPLEMENTATION_JS)
        print("  ✓ Replaced placeholder insurance methods with full implementations")
    elif 'pendingInsuranceDataset:' in content:
        print("  ✓ pendingInsuranceDataset already present")
    else:
        print("  [WARN] TARGET_BLOCK not found in exact form")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  ✓ Saved {path}")
    return True

def main():
    target_files = [
        'js/views/salesView.js',
        'scripts/sales_view_code.py',
        'miledeep-devi-fisheries.html',
        'standalone.html'
    ]

    for f in target_files:
        update_file(f)

    print("\nVerifying files...")
    for f in target_files:
        with open(f, 'r', encoding='utf-8') as handle:
            c = handle.read()
            assert 'pendingInsuranceDataset:' in c, f"pendingInsuranceDataset missing in {f}"
            assert 'insuranceTemplatesDataset:' in c, f"insuranceTemplatesDataset missing in {f}"
            assert 'insurancePaymentsDataset:' in c, f"insurancePaymentsDataset missing in {f}"
            assert 'sales-pins-tbody' in c, f"sales-pins-tbody missing in {f}"
            assert 'sales-inst-tbody' in c, f"sales-inst-tbody missing in {f}"
            assert 'sales-inspay-tbody' in c, f"sales-inspay-tbody missing in {f}"
        print(f"  ✓ {f} fully verified!")

if __name__ == '__main__':
    main()
