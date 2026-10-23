#!/usr/bin/env python3
"""
scripts/update_forward_contracts.py

Standardizes the 'Forward Contracts' screen and 'Forward Contract Details' modal
under Sales > Payments to the Base Design System based on user uploaded screenshots:
- Image 1 (media_1792749513519_8465cc3a.png):
  - Title: FORWARD CONTRACT
  - Filter Card: Select Year:, Select Exporter:, Type dropdowns, Search ->, + New Forward Contract
  - Table: S.No, Booked Date, Spot Rate, Forward Contract No, Current Date, Diff, Start Date, End Date, Month, Booked Rate, Booked Value, Utilisation, Balance US$, Actions (pencil)
  - Toolbar: Search input, Download Forward Contract button
  - Reconciled Totals Card at bottom
- Image 2 (media_1792749525785_8b0c9890.png):
  - Forward Contract Details Modal (Breadcrumb, Select Company, Booking Date, Forward Contract Number, Value, Period, Month, Start Date, End Date, Spot Rate, Premium Rate, Branch Margin, Total Rate, Balance Value, Utilized Value)
  - Auto-calculation: Total Rate = Spot Rate + Premium Rate + Branch Margin
  - Base Design System buttons: Close (danger), Add / Save (primary #006C7A)
"""

import os

FC_IMPLEMENTATION_JS = r'''  // ==========================================
  // 5. PAYMENTS & FORWARD CONTRACTS
  // ==========================================
  forwardContractsDataset: [
    {
      sNo: 1,
      id: 'FC-340',
      bookedDate: '28-08-2026',
      spotRate: 95.5600,
      contractNumber: '1440726FP0B00340',
      currentDate: '23-10-2026',
      diff: 21,
      startDate: '15-10-2026',
      endDate: '13-11-2026',
      month: 'October',
      bookedRate: 95.8375,
      premiumRate: 0.2775,
      branchMargin: 0.0000,
      bookedValue: 1000000.00,
      utilisation: '-',
      balanceUsd: 1000000.00,
      company: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      type: 'Available'
    },
    {
      sNo: 2,
      id: 'FC-341',
      bookedDate: '28-08-2026',
      spotRate: 95.5600,
      contractNumber: '1440726FP0B00341',
      currentDate: '23-10-2026',
      diff: 53,
      startDate: '16-11-2026',
      endDate: '15-12-2026',
      month: 'November',
      bookedRate: 96.0800,
      premiumRate: 0.5200,
      branchMargin: 0.0000,
      bookedValue: 1000000.00,
      utilisation: '-',
      balanceUsd: 1000000.00,
      company: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      type: 'Available'
    },
    {
      sNo: 3,
      id: 'FC-339',
      bookedDate: '21-08-2026',
      spotRate: 95.7350,
      contractNumber: '1440726FP0B00339',
      currentDate: '23-10-2026',
      diff: 68,
      startDate: '01-12-2026',
      endDate: '30-12-2026',
      month: 'December',
      bookedRate: 96.4350,
      premiumRate: 0.7000,
      branchMargin: 0.0000,
      bookedValue: 1000000.00,
      utilisation: '-',
      balanceUsd: 1000000.00,
      company: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      type: 'Available'
    },
    {
      sNo: 4,
      id: 'FC-338',
      bookedDate: '21-08-2026',
      spotRate: 95.7350,
      contractNumber: '1440726FP0B00338',
      currentDate: '23-10-2026',
      diff: 53,
      startDate: '16-11-2026',
      endDate: '15-12-2026',
      month: 'November',
      bookedRate: 96.3225,
      premiumRate: 0.5875,
      branchMargin: 0.0000,
      bookedValue: 1000000.00,
      utilisation: '-',
      balanceUsd: 1000000.00,
      company: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      type: 'Available'
    },
    {
      sNo: 5,
      id: 'FC-337',
      bookedDate: '20-08-2026',
      spotRate: 95.6900,
      contractNumber: '1440726FP0B00337',
      currentDate: '23-10-2026',
      diff: 53,
      startDate: '16-11-2026',
      endDate: '15-12-2026',
      month: 'November',
      bookedRate: 96.2825,
      premiumRate: 0.5925,
      branchMargin: 0.0000,
      bookedValue: 1000000.00,
      utilisation: '-',
      balanceUsd: 1000000.00,
      company: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      type: 'Available'
    }
  ],

  renderForwardContracts(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">FORWARD CONTRACT</h2>
        </div>

        <!-- 2. Clean Search & Filters Card (Exact Match to Design System, No Empty Circles) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end mb-4">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Year:</label>
              <select id="sales-fc-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Exporter:</label>
              <select id="sales-fc-exporter" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUATECH PVT LTD">DEVI AQUATECH PVT LTD</option>
                <option value="SATYA SEAFOODS">SATYA SEAFOODS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Type</label>
              <select id="sales-fc-type" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="Available" selected>Available</option>
                <option value="Utilized">Utilized</option>
                <option value="Expired">Expired</option>
                <option value="All">All</option>
              </select>
            </div>
          </div>

          <div class="flex items-center justify-center gap-3 pt-1">
            <button id="btn-fc-search" class="px-6 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterForwardContracts()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <button id="btn-new-fc" class="px-5 py-2 bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.openForwardContractModal(null)">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>New Forward Contract</span>
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
                id="sales-fc-search-input" 
                placeholder="Search forward contracts..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchForwardContracts(this.value)"
              />
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#006C7A] hover:text-[#005662] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadForwardContractsExcel()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Download Forward Contract</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider whitespace-nowrap">
                  <th class="py-3 px-3">S.No</th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortForwardContracts('bookedDate')">
                    <span class="inline-flex items-center gap-1">Booked Date <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortForwardContracts('spotRate')">
                    <span class="inline-flex items-center gap-1">Spot Rate <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortForwardContracts('contractNumber')">
                    <span class="inline-flex items-center gap-1">Forward Contract No <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">Current Date</th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortForwardContracts('diff')">
                    <span class="inline-flex items-center gap-1">Diff <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortForwardContracts('startDate')">
                    <span class="inline-flex items-center gap-1">Start Date <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortForwardContracts('endDate')">
                    <span class="inline-flex items-center gap-1">End Date <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortForwardContracts('month')">
                    <span class="inline-flex items-center gap-1">Month <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortForwardContracts('bookedRate')">
                    <span class="inline-flex items-center gap-1">Booked Rate <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 cursor-pointer text-right" onclick="SalesView.sortForwardContracts('bookedValue')">
                    <span class="inline-flex items-center gap-1 justify-end">Booked Value <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 text-center">Utilisation</th>
                  <th class="py-3 px-3 text-right">Balance US$</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-fc-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-fc-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderForwardContractsRows(this.forwardContractsDataset);
    this.renderForwardContractsTotals(this.forwardContractsDataset);
  },

  renderForwardContractsRows(list) {
    const tbody = document.getElementById('sales-fc-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="14" class="py-8 text-center text-[#64748B] text-xs">
            No forward contracts found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A] whitespace-nowrap">${r.bookedDate}</td>
        <td class="py-3 px-3 font-mono font-bold text-[#475569]">${(r.spotRate || 0).toFixed(4)}</td>
        <td class="py-3 px-3 font-mono font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openForwardContractModal('${r.id}')">${r.contractNumber}</td>
        <td class="py-3 px-3 text-[#64748B] whitespace-nowrap">${r.currentDate}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A] text-center">${r.diff}</td>
        <td class="py-3 px-3 font-semibold text-[#475569] whitespace-nowrap">${r.startDate}</td>
        <td class="py-3 px-3 font-semibold text-[#475569] whitespace-nowrap">${r.endDate}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A]">${r.month}</td>
        <td class="py-3 px-3 font-mono font-black text-[#006C7A]">${(r.bookedRate || 0).toFixed(4)}</td>
        <td class="py-3 px-3 font-extrabold text-[#006644] text-right">$${(r.bookedValue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td class="py-3 px-3 text-[#64748B] text-center font-medium">${r.utilisation || '-'}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A] text-right">$${(r.balanceUsd || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <button 
            type="button" 
            class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
            title="Edit Forward Contract" 
            onclick="SalesView.openForwardContractModal('${r.id}')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderForwardContractsTotals(list) {
    const el = document.getElementById('sales-fc-totals');
    if (!el) return;

    const count = list.length;
    const totalBooked = list.reduce((sum, r) => sum + (Number(r.bookedValue) || 0), 0);
    const totalBalance = list.reduce((sum, r) => sum + (Number(r.balanceUsd) || 0), 0);
    const avgHedgeRate = count > 0 
      ? (list.reduce((sum, r) => sum + (Number(r.bookedRate) || 0), 0) / count).toFixed(4)
      : '0.0000';

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Active Contracts</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Contracts</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Booked Value</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">$${totalBooked.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Available Balance (USD)</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">$${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Avg Hedge Rate</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">₹ ${avgHedgeRate} <span class="text-[11px] font-semibold text-[#64748B]">INR/USD</span></div>
        </div>
      </div>
    `;
  },

  filterForwardContracts() {
    const year = document.getElementById('sales-fc-year')?.value || '2026-2027';
    const type = document.getElementById('sales-fc-type')?.value || 'Available';

    const filtered = this.forwardContractsDataset.filter(r => {
      const matchYear = !year || r.year === year;
      const matchType = type === 'All' || r.type === type;
      return matchYear && matchType;
    });

    this.renderForwardContractsRows(filtered);
    this.renderForwardContractsTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} forward contract positions`, 'info');
    }
  },

  searchForwardContracts(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderForwardContractsRows(this.forwardContractsDataset);
      this.renderForwardContractsTotals(this.forwardContractsDataset);
      return;
    }

    const filtered = this.forwardContractsDataset.filter(r => 
      (r.contractNumber || '').toLowerCase().includes(q) ||
      (r.month || '').toLowerCase().includes(q) ||
      (r.bookedDate || '').toLowerCase().includes(q) ||
      (r.company || '').toLowerCase().includes(q)
    );

    this.renderForwardContractsRows(filtered);
    this.renderForwardContractsTotals(filtered);
  },

  sortForwardContracts(key) {
    this.forwardContractsDataset.reverse();
    this.renderForwardContractsRows(this.forwardContractsDataset);
  },

  downloadForwardContractsExcel() {
    const headers = ['S.No', 'Booked Date', 'Spot Rate', 'Forward Contract No', 'Current Date', 'Diff', 'Start Date', 'End Date', 'Month', 'Booked Rate', 'Booked Value', 'Utilisation', 'Balance US$'];
    const rows = this.forwardContractsDataset.map(r => [
      r.sNo,
      `"${r.bookedDate}"`,
      r.spotRate,
      `"${r.contractNumber}"`,
      `"${r.currentDate}"`,
      r.diff,
      `"${r.startDate}"`,
      `"${r.endDate}"`,
      `"${r.month}"`,
      r.bookedRate,
      r.bookedValue,
      `"${r.utilisation}"`,
      r.balanceUsd
    ].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `forward_contracts_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported forward contracts register to Excel/CSV', 'success');
    }
  },

  recalculateFcRates() {
    const spot = parseFloat(document.getElementById('fc-input-spot-rate')?.value) || 0;
    const premium = parseFloat(document.getElementById('fc-input-premium-rate')?.value) || 0;
    const margin = parseFloat(document.getElementById('fc-input-branch-margin')?.value) || 0;
    const total = spot + premium + margin;
    const totalEl = document.getElementById('fc-input-total-rate');
    if (totalEl) {
      totalEl.value = total.toFixed(4);
    }
  },

  recalculateFcValues() {
    const val = parseFloat(document.getElementById('fc-input-value')?.value) || 0;
    const balanceEl = document.getElementById('fc-input-balance-value');
    if (balanceEl) {
      balanceEl.value = val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
  },

  openForwardContractModal(id) {
    const isEdit = Boolean(id);
    const record = isEdit 
      ? (this.forwardContractsDataset.find(x => x.id === id) || this.forwardContractsDataset[0])
      : {
          id: 'FC-' + Math.floor(100 + Math.random() * 900),
          company: 'DEVI FISHERIES LIMITED',
          bookedDate: new Date().toISOString().slice(0, 10),
          contractNumber: '1440726FP0B00' + Math.floor(342 + Math.random() * 50),
          bookedValue: 1000000.00,
          period: '2026-2027',
          month: 'November',
          startDate: '2026-11-16',
          endDate: '2026-12-15',
          spotRate: 95.5600,
          premiumRate: 0.5200,
          branchMargin: 0.0000,
          bookedRate: 96.0800,
          balanceUsd: 1000000.00,
          utilisation: '-'
        };

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Forward Contract: ${record.contractNumber}`);
      return;
    }

    Modal.open({
      title: 'FORWARD CONTRACT DETAILS',
      size: '2xl',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <!-- Breadcrumb (Matching Image 2) -->
          <div class="text-[11px] font-medium text-[#64748B]">
            Payments &nbsp;&gt;&nbsp; Forward Contracts &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">${isEdit ? 'Edit Contract' : 'Forward Contract Details'}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <!-- Row 1: Select Company, Booking Date, Forward Contract Number, Value -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">SELECT COMPANY <span class="text-[#EF4444]">*</span></label>
                <select id="fc-input-company" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="DEVI FISHERIES LIMITED" ${record.company === 'DEVI FISHERIES LIMITED' ? 'selected' : ''}>DEVI FISHERIES LIMITED</option>
                  <option value="DEVI AQUATECH PVT LTD" ${record.company === 'DEVI AQUATECH PVT LTD' ? 'selected' : ''}>DEVI AQUATECH PVT LTD</option>
                  <option value="SATYA SEAFOODS" ${record.company === 'SATYA SEAFOODS' ? 'selected' : ''}>SATYA SEAFOODS</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">BOOKING DATE <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="fc-input-booking-date" value="${record.bookedDate}" placeholder="dd/mm/yyyy" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">FORWARD CONTRACT NUMBER <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="fc-input-number" value="${record.contractNumber}" placeholder="Enter Forward Contract Number" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-mono font-bold text-xs text-[#006C7A] outline-none focus:border-[#006C7A]">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">VALUE <span class="text-[#EF4444]">*</span></label>
                <input type="number" id="fc-input-value" value="${record.bookedValue}" placeholder="Enter Value" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-extrabold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]" oninput="SalesView.recalculateFcValues()">
              </div>
            </div>

            <!-- Row 2: Period, Month, Start Date, End Date -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PERIOD</label>
                <select id="fc-input-period" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="2026-2027" ${record.year === '2026-2027' ? 'selected' : ''}>2026-2027</option>
                  <option value="2025-2026" ${record.year === '2025-2026' ? 'selected' : ''}>2025-2026</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">MONTH</label>
                <select id="fc-input-month" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="March" ${record.month === 'March' ? 'selected' : ''}>March</option>
                  <option value="April" ${record.month === 'April' ? 'selected' : ''}>April</option>
                  <option value="May" ${record.month === 'May' ? 'selected' : ''}>May</option>
                  <option value="June" ${record.month === 'June' ? 'selected' : ''}>June</option>
                  <option value="July" ${record.month === 'July' ? 'selected' : ''}>July</option>
                  <option value="August" ${record.month === 'August' ? 'selected' : ''}>August</option>
                  <option value="September" ${record.month === 'September' ? 'selected' : ''}>September</option>
                  <option value="October" ${record.month === 'October' ? 'selected' : ''}>October</option>
                  <option value="November" ${record.month === 'November' ? 'selected' : ''}>November</option>
                  <option value="December" ${record.month === 'December' ? 'selected' : ''}>December</option>
                  <option value="January" ${record.month === 'January' ? 'selected' : ''}>January</option>
                  <option value="February" ${record.month === 'February' ? 'selected' : ''}>February</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">START DATE <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="fc-input-start-date" value="${record.startDate}" placeholder="dd/mm/yyyy" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">END DATE <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="fc-input-end-date" value="${record.endDate}" placeholder="dd/mm/yyyy" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
            </div>

            <!-- Row 3: Spot Rate, Premium Rate, Branch Margin, Total Rate -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">SPOT RATE <span class="text-[#EF4444]">*</span></label>
                <input type="number" step="0.0001" id="fc-input-spot-rate" value="${record.spotRate || 95.56}" placeholder="Rate" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-mono font-bold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]" oninput="SalesView.recalculateFcRates()">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PREMIUM RATE</label>
                <input type="number" step="0.0001" id="fc-input-premium-rate" value="${record.premiumRate || 0.2775}" placeholder="PremiumRate" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-mono font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]" oninput="SalesView.recalculateFcRates()">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">BRANCH MARGIN <span class="text-[#EF4444]">*</span></label>
                <input type="number" step="0.0001" id="fc-input-branch-margin" value="${record.branchMargin || 0.0000}" placeholder="Enter Branch Margin" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-mono font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]" oninput="SalesView.recalculateFcRates()">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">TOTAL RATE <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="fc-input-total-rate" value="${(record.bookedRate || 95.8375).toFixed(4)}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-mono font-black text-xs text-[#006C7A] outline-none">
              </div>
            </div>

            <!-- Row 4: Balance Value, Utilized Value -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">BALANCE VALUE</label>
                <input type="text" id="fc-input-balance-value" value="${(record.balanceUsd || 1000000).toLocaleString(undefined, { minimumFractionDigits: 2 })}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-extrabold text-xs text-[#0F172A] outline-none">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">UTILIZED VALUE</label>
                <input type="text" id="fc-input-utilized-value" value="${record.utilisation === '-' ? '0.00' : record.utilisation}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#64748B] outline-none">
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
        },
        {
          label: isEdit ? 'Save Changes' : 'Add',
          type: 'primary',
          onClick: (m) => SalesView.saveForwardContract(record.id, isEdit)
        }
      ]
    });
  },

  saveForwardContract(id, isEdit) {
    const company = document.getElementById('fc-input-company')?.value || 'DEVI FISHERIES LIMITED';
    const bookedDate = document.getElementById('fc-input-booking-date')?.value || '23-10-2026';
    const contractNumber = document.getElementById('fc-input-number')?.value || '1440726FP0B00342';
    const bookedValue = parseFloat(document.getElementById('fc-input-value')?.value) || 1000000;
    const period = document.getElementById('fc-input-period')?.value || '2026-2027';
    const month = document.getElementById('fc-input-month')?.value || 'November';
    const startDate = document.getElementById('fc-input-start-date')?.value || '16-11-2026';
    const endDate = document.getElementById('fc-input-end-date')?.value || '15-12-2026';
    const spotRate = parseFloat(document.getElementById('fc-input-spot-rate')?.value) || 95.56;
    const premiumRate = parseFloat(document.getElementById('fc-input-premium-rate')?.value) || 0.52;
    const branchMargin = parseFloat(document.getElementById('fc-input-branch-margin')?.value) || 0.0;
    const bookedRate = spotRate + premiumRate + branchMargin;

    if (isEdit) {
      const rec = this.forwardContractsDataset.find(x => x.id === id);
      if (rec) {
        rec.company = company;
        rec.bookedDate = bookedDate;
        rec.contractNumber = contractNumber;
        rec.bookedValue = bookedValue;
        rec.period = period;
        rec.month = month;
        rec.startDate = startDate;
        rec.endDate = endDate;
        rec.spotRate = spotRate;
        rec.premiumRate = premiumRate;
        rec.branchMargin = branchMargin;
        rec.bookedRate = bookedRate;
        rec.balanceUsd = bookedValue;
      }
    } else {
      const newRec = {
        sNo: this.forwardContractsDataset.length + 1,
        id: id || ('FC-' + (340 + this.forwardContractsDataset.length)),
        bookedDate: bookedDate,
        spotRate: spotRate,
        contractNumber: contractNumber,
        currentDate: '23-10-2026',
        diff: 30,
        startDate: startDate,
        endDate: endDate,
        month: month,
        bookedRate: bookedRate,
        premiumRate: premiumRate,
        branchMargin: branchMargin,
        bookedValue: bookedValue,
        utilisation: '-',
        balanceUsd: bookedValue,
        company: company,
        year: period,
        type: 'Available'
      };
      this.forwardContractsDataset.unshift(newRec);
      // re-index sNo
      this.forwardContractsDataset.forEach((r, idx) => r.sNo = idx + 1);
    }

    this.renderForwardContractsRows(this.forwardContractsDataset);
    this.renderForwardContractsTotals(this.forwardContractsDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(isEdit ? `Updated Forward Contract #${contractNumber}` : `Added New Forward Contract #${contractNumber}`, 'success');
    }
  },
'''

TARGET_BLOCK = '''  renderForwardContracts(container) {
    const fcs = SalesDataStore.getCollection('forwardContracts');

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader(
          'FX Forward Contracts & Currency Hedging Register',
          `<button class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer" onclick="Toast.show('Book forward contract modal', 'info')">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Book Forward Contract</span>
          </button>`
        )}
        <div id="sales-fc-table-container"></div>
      </div>
    `;

    new DataTable({
      containerId: 'sales-fc-table-container',
      data: fcs,
      keyField: 'id',
      tableTitle: 'Active Currency Hedging Positions (USD/INR)',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'contractNumber', header: 'Contract No', render: (v) => `<span class="font-mono font-bold text-[#006C7A]">${v}</span>` },
        { field: 'bankName', header: 'Bank Entity', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'bookedValueUsd', header: 'Value (USD)', render: (v) => `<span class="font-extrabold text-[#006644]">$${(v || 0).toLocaleString()}</span>` },
        { field: 'bookedRate', header: 'Hedge Rate', render: (v) => `<span class="font-mono font-bold">₹ ${v}</span>` },
        { field: 'utilizedAmountUsd', header: 'Utilized (USD)', render: (v) => `<span class="text-[#5E6C84]">$${(v || 0).toLocaleString()}</span>` },
        { field: 'balanceAmountUsd', header: 'Balance (USD)', render: (v) => `<span class="font-bold text-[#172B4D]">$${(v || 0).toLocaleString()}</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
  },'''

def update_file(path):
    print(f"Updating {path}...")
    if not os.path.exists(path):
        print(f"  [ERROR] File not found: {path}")
        return False

    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    if TARGET_BLOCK in content:
        content = content.replace(TARGET_BLOCK, FC_IMPLEMENTATION_JS)
        print("  ✓ Replaced renderForwardContracts with full implementation")
    elif 'forwardContractsDataset:' in content:
        print("  ✓ forwardContractsDataset already present")
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
            assert 'forwardContractsDataset:' in c, f"forwardContractsDataset missing in {f}"
            assert 'sales-fc-tbody' in c, f"sales-fc-tbody missing in {f}"
            assert 'openForwardContractModal' in c, f"openForwardContractModal missing in {f}"
        print(f"  ✓ {f} fully verified!")

if __name__ == '__main__':
    main()
