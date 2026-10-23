#!/usr/bin/env python3
"""
scripts/add_delayed_shipments_tab.py

Adds the new 'Delayed Shipments' tab menu under Sales > Orders:
1. Updates js/components/sidebar.js (NAV_HIERARCHY under orders)
2. Updates js/views/salesView.js (renderOrdersTabBar and renderDelayedShipments implementation)
3. Updates scripts/sales_view_code.py
4. Updates miledeep-devi-fisheries.html
5. Updates standalone.html
"""

import os
import re

DELAYED_SHIPMENTS_JS = r'''  // ==========================================
  // 4. DELAYED SHIPMENTS REGISTER
  // ==========================================
  delayedShipmentsDataset: [
    {
      sNo: 1,
      id: '4376',
      poNo: 'MFSFRSHR.25.023RU',
      poDate: '08-04-2025',
      prodStartDate: '-',
      country: 'RUSSIA',
      buyer: 'METRO CASH & CARRY OOO',
      actualShipByDate: '26-03-2026',
      stockOutDate: '05-05-2026',
      status: 'Delivered',
      daysDelayed: -41,
      month: 'Apr',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 2,
      id: '4377',
      poNo: 'MFSFRSHR.25.024RU',
      poDate: '08-04-2025',
      prodStartDate: '-',
      country: 'RUSSIA',
      buyer: 'METRO CASH & CARRY OOO',
      actualShipByDate: '26-03-2026',
      stockOutDate: '25-06-2026',
      status: 'Shipped',
      daysDelayed: -92,
      month: 'Apr',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 3,
      id: '4378',
      poNo: 'MFSFRSHR.25.025RU',
      poDate: '08-04-2025',
      prodStartDate: '-',
      country: 'RUSSIA',
      buyer: 'METRO CASH & CARRY OOO',
      actualShipByDate: '26-04-2026',
      stockOutDate: '16-07-2026',
      status: 'Shipped',
      daysDelayed: -82,
      month: 'Apr',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 4,
      id: '4379',
      poNo: 'MFSFRSHR.25.026RU',
      poDate: '08-04-2025',
      prodStartDate: '-',
      country: 'RUSSIA',
      buyer: 'METRO CASH & CARRY OOO',
      actualShipByDate: '26-04-2026',
      stockOutDate: '05-08-2026',
      status: 'Shipped',
      daysDelayed: -102,
      month: 'Apr',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 5,
      id: '4565',
      poNo: '1102550490',
      poDate: '18-04-2025',
      prodStartDate: '-',
      country: 'U.S.A.',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      actualShipByDate: '20-08-2025',
      stockOutDate: '06-04-2026',
      status: 'Delivered',
      daysDelayed: -230,
      month: 'Apr',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 6,
      id: '4566',
      poNo: '1102550491',
      poDate: '18-04-2025',
      prodStartDate: '-',
      country: 'U.S.A.',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      actualShipByDate: '25-08-2025',
      stockOutDate: '20-04-2026',
      status: 'Delivered',
      daysDelayed: -239,
      month: 'Apr',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 7,
      id: '4798',
      poNo: 'VM-DF-ASC-25003',
      poDate: '01-07-2025',
      prodStartDate: '-',
      country: 'BELGIUM',
      buyer: 'SEAFOOD CONNECTION B.V.',
      actualShipByDate: '20-03-2026',
      stockOutDate: '07-04-2026',
      status: 'Delivered',
      daysDelayed: -19,
      month: 'Jul',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 8,
      id: '4799',
      poNo: 'PL/DF/ASC/25004 & PL/DF/ASC/25004-1',
      poDate: '01-07-2025',
      prodStartDate: '-',
      country: 'BELGIUM',
      buyer: 'UMIOS FOOD EUROPE B.V.',
      actualShipByDate: '15-06-2026',
      stockOutDate: '30-06-2026',
      status: 'Delivered',
      daysDelayed: -16,
      month: 'Jul',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 9,
      id: '4942',
      poNo: 'DEV_26/008',
      poDate: '18-07-2025',
      prodStartDate: '-',
      country: 'BELGIUM',
      buyer: 'NORDIC SEAFOOD A/S.',
      actualShipByDate: '10-03-2026',
      stockOutDate: '16-04-2026',
      status: 'Delivered',
      daysDelayed: -38,
      month: 'Jul',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 10,
      id: '4943',
      poNo: 'DEV_26/009',
      poDate: '11-07-2025',
      prodStartDate: '-',
      country: 'BELGIUM',
      buyer: 'NORDIC SEAFOOD A/S.',
      actualShipByDate: '30-03-2026',
      stockOutDate: '16-06-2026',
      status: 'Delivered',
      daysDelayed: -79,
      month: 'Jul',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 11,
      id: '4944',
      poNo: 'DEV_26/010',
      poDate: '18-07-2025',
      prodStartDate: '-',
      country: 'BELGIUM',
      buyer: 'NORDIC SEAFOOD A/S.',
      actualShipByDate: '10-07-2026',
      stockOutDate: '25-07-2026',
      status: 'Shipped',
      daysDelayed: -16,
      month: 'Jul',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 12,
      id: '4945',
      poNo: 'DEV_26/011',
      poDate: '18-07-2025',
      prodStartDate: '-',
      country: 'BELGIUM',
      buyer: 'NORDIC SEAFOOD A/S.',
      actualShipByDate: '10-07-2026',
      stockOutDate: '24-08-2026',
      status: 'Shipped',
      daysDelayed: -46,
      month: 'Jul',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    }
  ],

  renderDelayedShipments(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">DELAYED SHIPMENTS</h2>
        </div>

        <!-- 2. Clean Search & Filters Card (Exact Match to Design System, No Empty Circles) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-4">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">MONTH</label>
              <select id="sales-delay-month" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>Select</option>
                <option value="Jan">January</option>
                <option value="Feb">February</option>
                <option value="Mar">March</option>
                <option value="Apr">April</option>
                <option value="May">May</option>
                <option value="Jun">June</option>
                <option value="Jul">July</option>
                <option value="Aug">August</option>
                <option value="Sep">September</option>
                <option value="Oct">October</option>
                <option value="Nov">November</option>
                <option value="Dec">December</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT YEAR</label>
              <select id="sales-delay-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT EXPORTER :</label>
              <select id="sales-delay-exporter" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUATECH PVT LTD">DEVI AQUATECH PVT LTD</option>
                <option value="SATYA SEAFOODS">SATYA SEAFOODS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT CONSIGNEE :</label>
              <select id="sales-delay-consignee" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="METRO CASH & CARRY OOO">METRO CASH & CARRY OOO</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="SEAFOOD CONNECTION B.V.">SEAFOOD CONNECTION B.V.</option>
                <option value="UMIOS FOOD EUROPE B.V.">UMIOS FOOD EUROPE B.V.</option>
                <option value="NORDIC SEAFOOD A/S.">NORDIC SEAFOOD A/S.</option>
              </select>
            </div>
          </div>

          <div class="flex justify-center pt-1">
            <button id="btn-delay-search" class="px-7 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterDelayedShipments()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>

        <!-- 3. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="flex items-center gap-2 flex-1 max-w-xl">
              <div class="relative flex-1 max-w-md">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
                <input 
                  type="text" 
                  id="sales-delay-search-input" 
                  placeholder="Search delayed shipments..." 
                  class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                  style="padding-left: 36px !important;"
                  oninput="SalesView.searchDelayedShipments(this.value)"
                />
              </div>

              <button class="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.toggleMoreDelaySearch()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.loadAllDelayedShipments()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#006C7A] hover:text-[#005662] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadDelayedShipmentsExcel()">
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
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortDelayedShipments('sNo')">
                    <span class="inline-flex items-center gap-1">SNO <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortDelayedShipments('id')">
                    <span class="inline-flex items-center gap-1">ID <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">Po No</th>
                  <th class="py-3 px-3">Po Date</th>
                  <th class="py-3 px-3">Production Start Date</th>
                  <th class="py-3 px-3">Country</th>
                  <th class="py-3 px-3">Buyer</th>
                  <th class="py-3 px-3">Actual Ship By Date</th>
                  <th class="py-3 px-3">Stock Out Date</th>
                  <th class="py-3 px-3 text-center">Status</th>
                  <th class="py-3 px-3 text-right">Days Rem/Delayed</th>
                </tr>
              </thead>
              <tbody id="sales-delay-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-delay-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderDelayedShipmentsRows(this.delayedShipmentsDataset);
    this.renderDelayedShipmentsTotals(this.delayedShipmentsDataset);
  },

  renderDelayedShipmentsRows(list) {
    const tbody = document.getElementById('sales-delay-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="11" class="py-8 text-center text-[#64748B] text-xs">
            No delayed shipment records found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => {
      const isDelivered = (r.status || '').toLowerCase() === 'delivered';
      const statusBadge = isDelivered
        ? `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">Delivered</span>`
        : `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]">Shipped</span>`;

      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
          <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
          <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openDelayedShipmentModal('${r.id}')">${r.id}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A] hover:text-[#006C7A] cursor-pointer" onclick="SalesView.openDelayedShipmentModal('${r.id}')">${r.poNo}</td>
          <td class="py-3 px-3 text-[#475569] font-medium whitespace-nowrap">${r.poDate}</td>
          <td class="py-3 px-3 text-[#64748B] text-center">${r.prodStartDate || '-'}</td>
          <td class="py-3 px-3 font-bold text-[#475569] uppercase">${r.country}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A]">${r.buyer}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A] whitespace-nowrap">${r.actualShipByDate}</td>
          <td class="py-3 px-3 font-semibold text-[#475569] whitespace-nowrap">${r.stockOutDate}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">${statusBadge}</td>
          <td class="py-3 px-3 text-right font-bold text-[#E11D48] font-mono">${r.daysDelayed}</td>
        </tr>
      `;
    }).join('');
  },

  renderDelayedShipmentsTotals(list) {
    const el = document.getElementById('sales-delay-totals');
    if (!el) return;

    const count = list.length;
    const delivered = list.filter(x => (x.status || '').toLowerCase() === 'delivered').length;
    const shipped = count - delivered;
    const avgDelay = count > 0 
      ? Math.round(list.reduce((acc, x) => acc + (x.daysDelayed || 0), 0) / count)
      : 0;

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Delayed POs</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Orders</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Average Delay</div>
          <div class="text-lg font-black text-[#E11D48] mt-0.5">${avgDelay} <span class="text-xs font-semibold text-[#E11D48]">Days</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Post-Delay Delivered</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${delivered} <span class="text-xs font-semibold text-[#006644]">Delivered</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Still In-Transit</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">${shipped} <span class="text-xs font-semibold text-[#006C7A]">Shipped</span></div>
        </div>
      </div>
    `;
  },

  filterDelayedShipments() {
    const month = document.getElementById('sales-delay-month')?.value || 'All';
    const consignee = document.getElementById('sales-delay-consignee')?.value || 'All';

    const filtered = this.delayedShipmentsDataset.filter(r => {
      const matchMonth = month === 'All' || r.month === month;
      const matchConsignee = consignee === 'All' || r.buyer === consignee;
      return matchMonth && matchConsignee;
    });

    this.renderDelayedShipmentsRows(filtered);
    this.renderDelayedShipmentsTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} delayed shipment records`, 'info');
    }
  },

  searchDelayedShipments(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderDelayedShipmentsRows(this.delayedShipmentsDataset);
      this.renderDelayedShipmentsTotals(this.delayedShipmentsDataset);
      return;
    }

    const filtered = this.delayedShipmentsDataset.filter(r => 
      (r.poNo || '').toLowerCase().includes(q) ||
      (r.id || '').toLowerCase().includes(q) ||
      (r.buyer || '').toLowerCase().includes(q) ||
      (r.country || '').toLowerCase().includes(q) ||
      (r.status || '').toLowerCase().includes(q)
    );

    this.renderDelayedShipmentsRows(filtered);
    this.renderDelayedShipmentsTotals(filtered);
  },

  toggleMoreDelaySearch() {
    const el = document.getElementById('sales-delay-month');
    if (el) {
      el.focus();
      if (typeof Toast !== 'undefined' && Toast.show) {
        Toast.show('Advanced parameter filters active in top card', 'info');
      }
    }
  },

  loadAllDelayedShipments() {
    const input = document.getElementById('sales-delay-search-input');
    if (input) input.value = '';
    const m = document.getElementById('sales-delay-month');
    if (m) m.value = 'All';
    const c = document.getElementById('sales-delay-consignee');
    if (c) c.value = 'All';

    this.renderDelayedShipmentsRows(this.delayedShipmentsDataset);
    this.renderDelayedShipmentsTotals(this.delayedShipmentsDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Loaded all 12 delayed shipment records', 'success');
    }
  },

  sortDelayedShipments(key) {
    this.delayedShipmentsDataset.reverse();
    this.renderDelayedShipmentsRows(this.delayedShipmentsDataset);
  },

  downloadDelayedShipmentsExcel() {
    const headers = ['SNO', 'ID', 'Po No', 'Po Date', 'Production Start Date', 'Country', 'Buyer', 'Actual Ship By Date', 'Stock Out Date', 'Status', 'Days Rem/Delayed'];
    const rows = this.delayedShipmentsDataset.map(r => [r.sNo, r.id, `"${r.poNo}"`, r.poDate, r.prodStartDate, r.country, `"${r.buyer}"`, r.actualShipByDate, r.stockOutDate, r.status, r.daysDelayed].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));


    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `delayed_shipments_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported delayed shipments register to Excel/CSV', 'success');
    }
  },

  openDelayedShipmentModal(id) {
    const record = this.delayedShipmentsDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Delayed PO: ${record.poNo} | Buyer: ${record.buyer} | Delay: ${record.daysDelayed} days`);
      return;
    }

    Modal.open({
      title: 'DELAYED SHIPMENT ROOT-CAUSE & REMEDIATION',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Orders &nbsp;&gt;&nbsp; Delayed Shipments &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">PO #${record.poNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PO Number</label>
                <input type="text" value="${record.poNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#006C7A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Buyer / Consignee</label>
                <input type="text" value="${record.buyer}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Country</label>
                <input type="text" value="${record.country}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#475569] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Actual Ship By Date</label>
                <input type="text" value="${record.actualShipByDate}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Stock Out Date</label>
                <input type="text" value="${record.stockOutDate}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Days Delayed</label>
                <input type="text" value="${record.daysDelayed} Days" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#FECDD3] bg-[#FFF1F2] font-black text-xs text-[#E11D48] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Delay Root Cause <span class="text-[#EF4444]">*</span></label>
                <select id="delay-modal-cause" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Liner Blank Sailing / Vessel Rollover" selected>Liner Blank Sailing / Vessel Rollover</option>
                  <option value="Cold Storage Gate-in Dwell Time">Cold Storage Gate-in Dwell Time</option>
                  <option value="Raw Material Landing & Sizing Wait">Raw Material Landing & Sizing Wait</option>
                  <option value="Customer Label Revision & Re-packing">Customer Label Revision & Re-packing</option>
                  <option value="Port Congestion / Feeder Connecting Delay">Port Congestion / Feeder Connecting Delay</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Current Fulfillment Status</label>
                <select id="delay-modal-status" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Delivered" ${record.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                  <option value="Shipped" ${record.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Expedited Action & Mitigation Notes</label>
              <textarea id="delay-modal-notes" rows="2" class="w-full p-2 rounded-lg border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">Customer notified with updated carrier vessel telemetry. Priority customs clearance arranged with clearing broker upon port discharge.</textarea>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Close',
          type: 'danger',
          onClick: (m) => m.close()
        },
        {
          label: 'Save Changes',
          type: 'primary',
          onClick: (m) => SalesView.saveDelayedShipment(record.id)
        }
      ]
    });
  },

  saveDelayedShipment(id) {
    const record = this.delayedShipmentsDataset.find(x => x.id === id);
    if (!record) return;

    const newStatus = document.getElementById('delay-modal-status')?.value;
    if (newStatus) {
      record.status = newStatus;
    }

    this.renderDelayedShipmentsRows(this.delayedShipmentsDataset);
    this.renderDelayedShipmentsTotals(this.delayedShipmentsDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Updated remediation notes for PO #${record.poNo}`, 'success');
    }
  },
'''

def update_file(path):
    print(f"Updating {path}...")
    if not os.path.exists(path):
        print(f"  [ERROR] File not found: {path}")
        return False
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update NAV_HIERARCHY if present
    # Check specifically if clearing-agent is the last item before closing bracket ]
    clearing_agent_sidebar_pattern = '          { id: "clearing-agent", label: "Clearing Agent", hash: "#/sales/orders/clearing-agent" }\n        ]'
    clearing_agent_sidebar_new = '''          { id: "clearing-agent", label: "Clearing Agent", hash: "#/sales/orders/clearing-agent" },
          { id: "delayed-shipments", label: "Delayed Shipments", hash: "#/sales/orders/delayed-shipments" }
        ]'''

    if clearing_agent_sidebar_pattern in content:
        content = content.replace(clearing_agent_sidebar_pattern, clearing_agent_sidebar_new)
        print("  ✓ Added delayed-shipments to NAV_HIERARCHY")


    # In renderOrdersTabBar:
    clearing_agent_tabbar_old = "{ id: 'clearing-agent', label: 'Clearing Agent', hash: '#/sales/orders/clearing-agent' }"
    clearing_agent_tabbar_new = '''{ id: 'clearing-agent', label: 'Clearing Agent', hash: '#/sales/orders/clearing-agent' },
      { id: 'delayed-shipments', label: 'Delayed Shipments', hash: '#/sales/orders/delayed-shipments' }'''

    if clearing_agent_tabbar_old in content:
        # Check if already followed by delayed-shipments
        if "{ id: 'delayed-shipments'" not in content:
            content = content.replace(clearing_agent_tabbar_old, clearing_agent_tabbar_new)
            print("  ✓ Added delayed-shipments to renderOrdersTabBar")

    # 2. Replace renderDelayedShipments placeholder
    placeholder = '''  renderDelayedShipments(container) {
    this.renderEtaStatus(container);
  },'''
    if placeholder in content:
        content = content.replace(placeholder, DELAYED_SHIPMENTS_JS)
        print("  ✓ Replaced renderDelayedShipments placeholder with full implementation")
    elif 'delayedShipmentsDataset' in content:
        print("  ✓ delayedShipmentsDataset already present")
    else:
        print("  [WARN] delayed shipments block not found")



    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  ✓ Saved {path}")
    return True

def main():
    target_files = [
        'js/components/sidebar.js',
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
            assert 'delayed-shipments' in c, f"delayed-shipments missing in {f}"
            if 'salesView.js' in f or 'html' in f or 'sales_view_code' in f:
                assert 'delayedShipmentsDataset' in c, f"delayedShipmentsDataset missing in {f}"
                assert 'sales-delay-tbody' in c, f"sales-delay-tbody missing in {f}"
        print(f"  ✓ {f} fully verified!")

if __name__ == '__main__':
    main()
