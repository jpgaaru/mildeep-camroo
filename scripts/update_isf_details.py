#!/usr/bin/env python3
"""
scripts/update_isf_details.py
Updates the ISF Details screen in Sales Orders:
- Tab bar navigation: isf-details active
- Clean Page Title: "ISF 10+2 DETAILS" (no extra buttons or clutter)
- Base Design System Top Filter Card: SELECT YEAR, SELECT EXPORTER :, SELECT BUYER :, CARRIER :, FILING STATUS :, Search
  (NO empty circle button or any circular outline on the top-right)
- Table Toolbar: Search input (36px padding), More Search, Load All
- Table: SNO, CONTAINER NO, SEAL NO, CARRIER, BL NO, CUSTOM INV, HOLDING TEMP, ISF TRANSACTION NO, STATUS, ACTIONS
- 8 realistic records matching Devi Fisheries operations
- Solid badges: green for Completed, red for Pending
- 3 clean blue action icons: Download, View, Print
- Reconciled Totals Summary card
- Filter, search, load all, sort, view modal, download, and print handlers
"""

import os

ISF_IMPLEMENTATION = '''  // ==========================================
  // ISF 10+2 DETAILS REGISTER
  // ==========================================
  isfDataset: [
    {
      sNo: 1,
      id: 'ISF-901',
      containerNo: 'MSCU7397679',
      sealNo: 'MSC-SL-901844',
      carrier: 'MSC',
      shippingLineFull: 'Mediterranean Shipping Company (MSC)',
      blNo: 'MEDUAPX2609918',
      customInv: 'DFL/JPT/2627/314',
      poNo: 'DF/DF-5616',
      buyer: 'DEVI FISHERIES INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-20.0°C',
      isfTransactionNo: 'ISF-2026-USCBP-98214',
      status: 'Completed'
    },
    {
      sNo: 2,
      id: 'ISF-902',
      containerNo: 'MSKU4109823',
      sealNo: 'MSK-992144',
      carrier: 'Maersk Line',
      shippingLineFull: 'Maersk Line A/S',
      blNo: 'MAEU9821034',
      customInv: 'DFL/JPT/2627/313',
      poNo: 'PO1004191',
      buyer: 'STANLEY PEARLMAN ENTERPRISES, INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-19.5°C',
      isfTransactionNo: 'ISF-2026-USCBP-98215',
      status: 'Completed'
    },
    {
      sNo: 3,
      id: 'ISF-903',
      containerNo: 'HLCU8821945',
      sealNo: 'HL-882140',
      carrier: 'Hapag-Lloyd',
      shippingLineFull: 'Hapag-Lloyd AG',
      blNo: 'HLCU9920145',
      customInv: 'DFL/JPT/2627/312',
      poNo: '1102650547',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-21.0°C',
      isfTransactionNo: 'ISF-2026-USCBP-98216',
      status: 'Completed'
    },
    {
      sNo: 4,
      id: 'ISF-904',
      containerNo: 'CMAU9102482',
      sealNo: 'CMA-551029',
      carrier: 'CMA CGM',
      shippingLineFull: 'CMA CGM Group',
      blNo: 'CMAU7710294',
      customInv: 'DFL/JPT/2627/311',
      poNo: '1102650877',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-18.5°C',
      isfTransactionNo: 'ISF-2026-USCBP-98217',
      status: 'Completed'
    },
    {
      sNo: 5,
      id: 'ISF-905',
      containerNo: 'MSCU8810294',
      sealNo: 'MSC-SL-902100',
      carrier: 'MSC',
      shippingLineFull: 'Mediterranean Shipping Company (MSC)',
      blNo: 'MEDUAPX2609920',
      customInv: 'DFL/JPT/2627/310',
      poNo: '60150DEV010C',
      buyer: 'CRUSTA C SAS',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-20.5°C',
      isfTransactionNo: 'ISF-2026-USCBP-98218',
      status: 'Completed'
    },
    {
      sNo: 6,
      id: 'ISF-906',
      containerNo: 'ONEY4410928',
      sealNo: 'ONE-338192',
      carrier: 'ONE Line',
      shippingLineFull: 'Ocean Network Express (ONE)',
      blNo: 'ONEY9920144',
      customInv: 'DFL/JPT/2627/309',
      poNo: '1102650475',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-19.0°C',
      isfTransactionNo: 'ISF-2026-USCBP-98219',
      status: 'Completed'
    },
    {
      sNo: 7,
      id: 'ISF-907',
      containerNo: 'MSKU7720194',
      sealNo: 'MSK-881023',
      carrier: 'Maersk Line',
      shippingLineFull: 'Maersk Line A/S',
      blNo: 'MAEU9821040',
      customInv: 'DFL/JPT/2627/308',
      poNo: 'DF/DF-5611',
      buyer: 'DEVI FISHERIES INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-20.0°C',
      isfTransactionNo: 'Pending Filing',
      status: 'Pending'
    },
    {
      sNo: 8,
      id: 'ISF-908',
      containerNo: 'HLCU3319028',
      sealNo: 'HL-992014',
      carrier: 'Hapag-Lloyd',
      shippingLineFull: 'Hapag-Lloyd AG',
      blNo: 'HLCU9920150',
      customInv: 'DFL/JPT/2627/307',
      poNo: 'DF/DF-5612',
      buyer: 'DEVI FISHERIES INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-18.0°C',
      isfTransactionNo: 'Pending Filing',
      status: 'Pending'
    }
  ],

  renderIsfDetails(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#172B4D]">
        <!-- 1. Orders Tab Bar Navigation -->
        ${this.renderOrdersTabBar('isf-details')}

        <!-- 2. Page Title Header (Clean - No extra buttons or clutter) -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">ISF 10+2 DETAILS</h1>
        </div>

        <!-- 3. Top Filter Card (Base Design System with AquaPulse Colors, NO empty circle on top right) -->
        <div id="sales-isf-filter-card" class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT YEAR</label>
              <select id="sales-isf-year-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT EXPORTER :</label>
              <select id="sales-isf-exporter-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT BUYER :</label>
              <select id="sales-isf-buyer-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="DEVI FISHERIES INC.">DEVI FISHERIES INC.</option>
                <option value="STANLEY PEARLMAN ENTERPRISES, INC.">STANLEY PEARLMAN ENTERPRISES, INC.</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="CRUSTA C SAS">CRUSTA C SAS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">CARRIER :</label>
              <select id="sales-isf-carrier-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="MSC">MSC</option>
                <option value="Maersk Line">Maersk Line</option>
                <option value="Hapag-Lloyd">Hapag-Lloyd</option>
                <option value="CMA CGM">CMA CGM</option>
                <option value="ONE Line">ONE Line</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">FILING STATUS :</label>
              <select id="sales-isf-status-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All">All</option>
                <option value="Completed" selected>Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div>
              <button id="btn-isf-search" class="px-6 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterIsfDetails()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 4. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-isf-search-input" 
                placeholder="Search container, seal, carrier, BL, invoice..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchIsfDetails(this.value)"
              />
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.toggleMoreIsfSearch()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.loadAllIsfDetails()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortIsfDetails('sNo')">
                    <span class="inline-flex items-center gap-1">SNO <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">CONTAINER NO</th>
                  <th class="py-3 px-3">SEAL NO</th>
                  <th class="py-3 px-3">CARRIER</th>
                  <th class="py-3 px-3">BL NO</th>
                  <th class="py-3 px-3">CUSTOM INV</th>
                  <th class="py-3 px-3">HOLDING TEMP</th>
                  <th class="py-3 px-3">ISF TRANSACTION NO</th>
                  <th class="py-3 px-3 text-center">STATUS</th>
                  <th class="py-3 px-3 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody id="sales-isf-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card (Base Design System) -->
          <div id="sales-isf-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderIsfRows(this.isfDataset);
    this.renderIsfTotals(this.isfDataset);
  },

  renderIsfRows(list) {
    const tbody = document.getElementById('sales-isf-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="10" class="py-8 text-center text-[#64748B] text-xs">
            No ISF 10+2 records found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => {
      const isPending = (r.status || '').toLowerCase() === 'pending';
      const badgeHtml = isPending
        ? `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#EF4444] shadow-xs">Pending</span>`
        : `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#16A34A] shadow-xs">Completed</span>`;

      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
          <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
          <td class="py-3 px-3 font-mono font-bold text-[#0F172A] hover:text-[#006C7A] cursor-pointer" onclick="SalesView.viewIsfDetails('${r.id}')">${r.containerNo}</td>
          <td class="py-3 px-3 font-mono text-[#475569]">${r.sealNo}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.carrier}</td>
          <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.viewIsfDetails('${r.id}')">${r.blNo}</td>
          <td class="py-3 px-3 text-[#0F172A] font-medium">${r.customInv}</td>
          <td class="py-3 px-3 font-mono font-bold text-[#0284C7]">${r.tempRecord}</td>
          <td class="py-3 px-3 font-mono text-[#475569]">${r.isfTransactionNo}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">${badgeHtml}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">
            <div class="inline-flex items-center gap-2 justify-center text-[#2563EB]">
              <button class="p-1 hover:text-[#1D4ED8] cursor-pointer transition-colors" title="Download ISF Filing" onclick="SalesView.downloadIsfDetails('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              </button>
              <button class="p-1 hover:text-[#1D4ED8] cursor-pointer transition-colors" title="View ISF Details" onclick="SalesView.viewIsfDetails('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
              <button class="p-1 hover:text-[#1D4ED8] cursor-pointer transition-colors" title="Print ISF Summary" onclick="SalesView.printIsfDetails('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderIsfTotals(list) {
    const el = document.getElementById('sales-isf-totals');
    if (!el) return;

    const count = list.length;
    const completed = list.filter(x => (x.status || '').toLowerCase() === 'completed').length;
    const pending = count - completed;

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Containers</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Containers</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Completed ISF</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${completed} <span class="text-xs font-semibold text-[#006644]">Filed</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Filing</div>
          <div class="text-lg font-black text-[#991B1B] mt-0.5">${pending} <span class="text-xs font-semibold text-[#991B1B]">Pending</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">CBP Compliance Rate</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">${count > 0 ? Math.round((completed / count) * 100) : 100}% <span class="text-[11px] font-semibold text-[#64748B]">(24h Manifest)</span></div>
        </div>
      </div>
    `;
  },

  filterIsfDetails() {
    const year = document.getElementById('sales-isf-year-select')?.value || 'All';
    const exporter = document.getElementById('sales-isf-exporter-select')?.value || 'All';
    const buyer = document.getElementById('sales-isf-buyer-select')?.value || 'All';
    const carrier = document.getElementById('sales-isf-carrier-select')?.value || 'All';
    const status = document.getElementById('sales-isf-status-select')?.value || 'All';

    const filtered = this.isfDataset.filter(r => {
      const matchYear = year === 'All' || r.year === year;
      const matchExporter = exporter === 'All' || r.exporter === exporter;
      const matchBuyer = buyer === 'All' || r.buyer === buyer;
      const matchCarrier = carrier === 'All' || r.carrier.toLowerCase().includes(carrier.toLowerCase());
      const matchStatus = status === 'All' || r.status === status;
      return matchYear && matchExporter && matchBuyer && matchCarrier && matchStatus;
    });

    this.renderIsfRows(filtered);
    this.renderIsfTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered: Found ${filtered.length} ISF records`, 'info');
    }
  },

  searchIsfDetails(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.renderIsfRows(this.isfDataset);
      this.renderIsfTotals(this.isfDataset);
      return;
    }

    const filtered = this.isfDataset.filter(r => {
      return (r.containerNo && r.containerNo.toLowerCase().includes(q)) ||
        (r.sealNo && r.sealNo.toLowerCase().includes(q)) ||
        (r.carrier && r.carrier.toLowerCase().includes(q)) ||
        (r.blNo && r.blNo.toLowerCase().includes(q)) ||
        (r.customInv && r.customInv.toLowerCase().includes(q)) ||
        (r.isfTransactionNo && r.isfTransactionNo.toLowerCase().includes(q)) ||
        (r.buyer && r.buyer.toLowerCase().includes(q));
    });

    this.renderIsfRows(filtered);
    this.renderIsfTotals(filtered);
  },

  loadAllIsfDetails() {
    const yearEl = document.getElementById('sales-isf-year-select');
    const exporterEl = document.getElementById('sales-isf-exporter-select');
    const buyerEl = document.getElementById('sales-isf-buyer-select');
    const carrierEl = document.getElementById('sales-isf-carrier-select');
    const statusEl = document.getElementById('sales-isf-status-select');
    const searchEl = document.getElementById('sales-isf-search-input');

    if (yearEl) yearEl.value = '2026-2027';
    if (exporterEl) exporterEl.value = 'DEVI FISHERIES LIMITED';
    if (buyerEl) buyerEl.value = 'All';
    if (carrierEl) carrierEl.value = 'All';
    if (statusEl) statusEl.value = 'All';
    if (searchEl) searchEl.value = '';

    this.renderIsfRows(this.isfDataset);
    this.renderIsfTotals(this.isfDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Loaded all ${this.isfDataset.length} ISF records`, 'success');
    }
  },

  toggleMoreIsfSearch() {
    const card = document.getElementById('sales-isf-filter-card');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      card.classList.add('ring-2', 'ring-[#006C7A]');
      setTimeout(() => card.classList.remove('ring-2', 'ring-[#006C7A]'), 1200);
    }
  },

  sortIsfDetails(key) {
    this.isfDataset.reverse();
    this.renderIsfRows(this.isfDataset);
  },

  viewIsfDetails(id) {
    const record = this.isfDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal !== 'undefined' && Modal.open) {
      Modal.open({
        title: `ISF 10+2 Details - ${record.containerNo}`,
        size: 'md',
        content: `
          <div class="space-y-4 text-xs text-[#0F172A]">
            <div class="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3">
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div><span class="text-[#64748B]">Container No:</span> <span class="font-mono font-bold text-[#0F172A]">${record.containerNo}</span></div>
                <div><span class="text-[#64748B]">Seal No:</span> <span class="font-mono font-bold text-[#0F172A]">${record.sealNo}</span></div>
                <div><span class="text-[#64748B]">Carrier:</span> <span class="font-semibold text-[#0F172A]">${record.shippingLineFull || record.carrier}</span></div>
                <div><span class="text-[#64748B]">BL Number:</span> <span class="font-bold text-[#006C7A]">${record.blNo}</span></div>
                <div><span class="text-[#64748B]">Custom Invoice:</span> <span class="font-semibold text-[#0F172A]">${record.customInv}</span></div>
                <div><span class="text-[#64748B]">PO Number:</span> <span class="font-semibold text-[#0F172A]">${record.poNo}</span></div>
                <div><span class="text-[#64748B]">Buyer:</span> <span class="font-bold text-[#0F172A]">${record.buyer}</span></div>
                <div><span class="text-[#64748B]">Exporter:</span> <span class="font-semibold text-[#0F172A]">${record.exporter}</span></div>
                <div><span class="text-[#64748B]">Reefer Temp:</span> <span class="font-mono font-bold text-[#0284C7]">${record.tempRecord}</span></div>
                <div><span class="text-[#64748B]">ISF Txn No:</span> <span class="font-mono font-bold text-[#0F172A]">${record.isfTransactionNo}</span></div>
                <div><span class="text-[#64748B]">Filing Status:</span> <span class="font-bold ${record.status === 'Completed' ? 'text-[#16A34A]' : 'text-[#DC2626]'}">${record.status}</span></div>
              </div>
            </div>
            <div class="p-2.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg text-[11px] text-[#166534]">
              US Customs and Border Protection (CBP) 10+2 Importer Security Filing verified and compliant with vessel stowage plans.
            </div>
          </div>
        `,
        footerButtons: [{ label: 'Close', type: 'secondary', onClick: (m) => m.close() }]
      });
    } else if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Viewing ISF for ${record.containerNo}`, 'info');
    }
  },

  downloadIsfDetails(id) {
    const record = this.isfDataset.find(x => x.id === id);
    const num = record ? record.containerNo : id;
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Downloading ISF Manifest for container ${num}...`, 'success');
    }
  },

  printIsfDetails(id) {
    const record = this.isfDataset.find(x => x.id === id);
    const num = record ? record.containerNo : id;
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Sending ISF filing ${num} to printer...`, 'info');
    }
  },'''

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    idx_start = content.find('renderIsfDetails(container) {')
    idx_end = content.find('renderShippingBill(container) {', idx_start)

    if idx_start == -1 or idx_end == -1:
        print(f"  ❌ Could not find boundaries in {filepath}")
        return False

    new_content = content[:idx_start] + ISF_IMPLEMENTATION + '\n\n  ' + content[idx_end:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"  ✓ Successfully updated ISF Details in {filepath}")
    return True

def main():
    targets = [
        'js/views/salesView.js',
        'scripts/sales_view_code.py',
        'miledeep-devi-fisheries.html',
        'standalone.html'
    ]
    for p in targets:
        if os.path.exists(p):
            print(f"Processing {p}...")
            update_file(p)
        else:
            print(f"Skipping missing {p}")

if __name__ == '__main__':
    main()
