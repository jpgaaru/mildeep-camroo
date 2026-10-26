// Sales Module — Payments, Realizations & Marine Insurance
export const salesFinancials = {
  // ==========================================
  // 3. PAYMENTS & FINANCIALS
  // ==========================================
  // ==========================================
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
            <button id="btn-fc-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterForwardContracts()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <button id="btn-new-fc" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.openForwardContractModal(null)">
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
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#02a8b5] hover:text-[#008f9a] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadForwardContractsExcel()">
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
      size: '4xl',
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


  // ==========================================
  // 6. COLLECTIONS REGISTER (IMAGE 1)
  // ==========================================
  collectionsDataset: [
    {
      sNo: 357,
      id: '7196',
      invNo: 'DFL/SNM/2627/145',
      poNo: 'DF 1580',
      consigneeName: 'MARK FOODS LLC',
      bankRefNo: '-',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      invoiceAmount: 125000.00
    },
    {
      sNo: 353,
      id: '7183',
      invNo: 'DFL/SNM/2627/143',
      poNo: 'C10894',
      consigneeName: 'SEA PORT PRODUCTS CORPORATION',
      bankRefNo: '-',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      invoiceAmount: 110500.00
    },
    {
      sNo: 8,
      id: '7173',
      invNo: 'DFL/KKD/2627/151',
      poNo: 'QL150-2026Y37-315',
      consigneeName: 'Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.',
      bankRefNo: '-',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      invoiceAmount: 95256.00
    },
    {
      sNo: 7,
      id: '7172',
      invNo: 'DFL/KKD/2627/152',
      poNo: 'QL150-2026Y37-314',
      consigneeName: 'Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.',
      bankRefNo: '-',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      invoiceAmount: 98172.00
    },
    {
      sNo: 4,
      id: '7171',
      invNo: 'DFL/KKD/2627/155',
      poNo: 'QL150-2026Y37-313',
      consigneeName: 'Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.',
      bankRefNo: '-',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      invoiceAmount: 98172.00
    }
  ],

  renderCollections(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">COLLECTIONS LIST</h2>
        </div>

        <!-- 2. Clean Search & Filters Card (Exact to Image 1) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Year:</label>
              <select id="sales-col-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Exporter:</label>
              <select id="sales-col-exporter" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUATECH PVT LTD">DEVI AQUATECH PVT LTD</option>
                <option value="SATYA SEAFOODS">SATYA SEAFOODS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Buyer:</label>
              <select id="sales-col-buyer" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="MARK FOODS LLC">MARK FOODS LLC</option>
                <option value="SEA PORT PRODUCTS CORPORATION">SEA PORT PRODUCTS CORPORATION</option>
                <option value="Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.">Quanlian Aquatic Products Collection</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Country:</label>
              <select id="sales-col-country" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="U.S.A.">U.S.A.</option>
                <option value="CHINA">CHINA</option>
                <option value="BELGIUM">BELGIUM</option>
                <option value="RUSSIA">RUSSIA</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Status</label>
              <select id="sales-col-status" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="Pending" selected>Pending</option>
                <option value="Lodged">Lodged</option>
                <option value="All">All</option>
              </select>
            </div>
          </div>

          <div class="flex justify-center pt-1">
            <button id="btn-col-search" class="px-7 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterCollections()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
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
                id="sales-col-search-input" 
                placeholder="Search collections..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchCollections(this.value)"
              />
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#02a8b5] hover:text-[#008f9a] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadCollectionsExcel()">
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
                  <th class="py-3 px-3">S.No</th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">InvNo</th>
                  <th class="py-3 px-3">Po No.</th>
                  <th class="py-3 px-3">Consignee Name</th>
                  <th class="py-3 px-3">Bank Ref No</th>
                  <th class="py-3 px-3 text-center">Status</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-col-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-col-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderCollectionsRows(this.collectionsDataset);
    this.renderCollectionsTotals(this.collectionsDataset);
  },

  renderCollectionsRows(list) {
    const tbody = document.getElementById('sales-col-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="py-8 text-center text-[#64748B] text-xs">
            No collection records found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo}</td>
        <td class="py-3 px-3 font-mono font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openCollectionModal('${r.id}')">${r.id}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A] hover:text-[#006C7A] cursor-pointer" onclick="SalesView.openCollectionModal('${r.id}')">${r.invNo}</td>
        <td class="py-3 px-3 font-semibold text-[#475569]">${r.poNo}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A]">${r.consigneeName}</td>
        <td class="py-3 px-3 font-mono text-[#64748B]">${r.bankRefNo || '-'}</td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#FEE2E2] text-[#DC2626] border border-[#FECDD3]">${r.status}</span>
        </td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <button 
            type="button" 
            class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
            title="Record Bank Lodgement" 
            onclick="SalesView.openCollectionModal('${r.id}')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderCollectionsTotals(list) {
    const el = document.getElementById('sales-col-totals');
    if (!el) return;

    const count = list.length;
    const pending = list.filter(x => x.status === 'Pending').length;
    const totalVal = list.reduce((sum, r) => sum + (Number(r.invoiceAmount) || 0), 0);

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Bills in Collection</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Invoices</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Bank Lodgement</div>
          <div class="text-lg font-black text-[#DC2626] mt-0.5">${pending} <span class="text-xs font-semibold text-[#DC2626]">Pending</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Ledger Value</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">$${totalVal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Collecting Bank Entity</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">SBI Commercial <span class="text-[11px] font-semibold text-[#64748B]">(IFSC: SBIN0004130)</span></div>
        </div>
      </div>
    `;
  },

  filterCollections() {
    const buyer = document.getElementById('sales-col-buyer')?.value || 'All';
    const country = document.getElementById('sales-col-country')?.value || 'All';
    const status = document.getElementById('sales-col-status')?.value || 'All';

    const filtered = this.collectionsDataset.filter(r => {
      const matchBuyer = buyer === 'All' || r.consigneeName === buyer;
      const matchCountry = country === 'All' || r.country === country;
      const matchStatus = status === 'All' || r.status === status;
      return matchBuyer && matchCountry && matchStatus;
    });

    this.renderCollectionsRows(filtered);
    this.renderCollectionsTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} collection records`, 'info');
    }
  },

  searchCollections(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderCollectionsRows(this.collectionsDataset);
      this.renderCollectionsTotals(this.collectionsDataset);
      return;
    }

    const filtered = this.collectionsDataset.filter(r => 
      (r.invNo || '').toLowerCase().includes(q) ||
      (r.id || '').toLowerCase().includes(q) ||
      (r.poNo || '').toLowerCase().includes(q) ||
      (r.consigneeName || '').toLowerCase().includes(q)
    );

    this.renderCollectionsRows(filtered);
    this.renderCollectionsTotals(filtered);
  },

  downloadCollectionsExcel() {
    const headers = ['S.No', 'ID', 'InvNo', 'Po No.', 'Consignee Name', 'Bank Ref No', 'Status', 'Invoice Amount'];
    const rows = this.collectionsDataset.map(r => [
      r.sNo,
      r.id,
      `"${r.invNo}"`,
      `"${r.poNo}"`,
      `"${r.consigneeName}"`,
      `"${r.bankRefNo}"`,
      r.status,
      r.invoiceAmount
    ].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `collections_register_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported collections register to Excel/CSV', 'success');
    }
  },

  openCollectionModal(id) {
    const record = this.collectionsDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Collection Invoice: ${record.invNo}`);
      return;
    }

    Modal.open({
      title: 'BANK LODGEMENT & COLLECTION ENTRY',
      size: '4xl',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Payments &nbsp;&gt;&nbsp; Collections &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">${record.invNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Invoice Number</label>
                <input type="text" value="${record.invNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#006C7A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PO Number</label>
                <input type="text" value="${record.poNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Consignee</label>
                <input type="text" value="${record.consigneeName}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#0F172A] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Lodgement Bank <span class="text-[#EF4444]">*</span></label>
                <select id="col-modal-bank" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="State Bank of India (Commercial Br)" selected>State Bank of India (Commercial Br)</option>
                  <option value="HDFC Bank Limited">HDFC Bank Limited</option>
                  <option value="Canara Bank Foreign Exchange">Canara Bank Foreign Exchange</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Bank Reference No <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="col-modal-bank-ref" value="${record.bankRefNo === '-' ? ('1440726TP0B00' + Math.floor(420 + Math.random() * 50)) : record.bankRefNo}" placeholder="Enter Bank Ref No" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-mono font-bold text-xs text-[#006C7A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Lodgement Status</label>
                <select id="col-modal-status" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Lodged" selected>Lodged With Bank</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Courier AWB / Tracking Reference</label>
              <input type="text" id="col-modal-courier" value="DHL Express #8491029314" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
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
          label: 'Save Lodgement',
          type: 'primary',
          onClick: (m) => SalesView.saveCollection(record.id)
        }
      ]
    });
  },

  saveCollection(id) {
    const record = this.collectionsDataset.find(x => x.id === id);
    if (!record) return;

    const bankRef = document.getElementById('col-modal-bank-ref')?.value;
    const status = document.getElementById('col-modal-status')?.value;

    if (bankRef) record.bankRefNo = bankRef;
    if (status) record.status = status;

    this.renderCollectionsRows(this.collectionsDataset);
    this.renderCollectionsTotals(this.collectionsDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Saved bank lodgement for ${record.invNo}`, 'success');
    }
  },

  // ==========================================
  // 7. NEGOTIATIONS REGISTER (IMAGE 2)
  // ==========================================
  negotiationsDataset: [
    {
      sNo: 1,
      id: '6228',
      invNo: 'DFL/JPT/2627/163',
      poNo: '1102650572',
      consigneeName: 'C.P. FOOD PRODUCTS, INC.',
      bankRefNo: '-',
      invoiceStatus: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      negotiatedValue: 142000.00
    },
    {
      sNo: 2,
      id: '6229',
      invNo: 'DFL/JPT/2627/164',
      poNo: '1102650573',
      consigneeName: 'C.P. FOOD PRODUCTS, INC.',
      bankRefNo: '1440726TP0B00421',
      invoiceStatus: 'Negotiated',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      negotiatedValue: 138500.00
    },
    {
      sNo: 3,
      id: '6230',
      invNo: 'DFL/KKD/2627/165',
      poNo: 'DF-1590',
      consigneeName: 'MARK FOODS LLC',
      bankRefNo: '-',
      invoiceStatus: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      negotiatedValue: 121000.00
    }
  ],

  renderNegotiations(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">NEGOTIATIONS LIST</h2>
        </div>

        <!-- 2. Clean Search & Filters Card (Exact to Image 2) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Year:</label>
              <select id="sales-neg-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Exporter:</label>
              <select id="sales-neg-exporter" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUATECH PVT LTD">DEVI AQUATECH PVT LTD</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Consignee:</label>
              <select id="sales-neg-consignee" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="MARK FOODS LLC">MARK FOODS LLC</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Country:</label>
              <select id="sales-neg-country" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="U.S.A.">U.S.A.</option>
                <option value="CHINA">CHINA</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Invoice Status</label>
              <select id="sales-neg-status" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="Pending" selected>Pending</option>
                <option value="Negotiated">Negotiated</option>
                <option value="All">All</option>
              </select>
            </div>
          </div>

          <div class="flex justify-center pt-1">
            <button id="btn-neg-search" class="px-7 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterNegotiations()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
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
                id="sales-neg-search-input" 
                placeholder="Search negotiations..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchNegotiations(this.value)"
              />
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#02a8b5] hover:text-[#008f9a] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadNegotiationsExcel()">
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
                  <th class="py-3 px-3">S.No</th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">InvNo</th>
                  <th class="py-3 px-3">Po No.</th>
                  <th class="py-3 px-3">Consignee Name</th>
                  <th class="py-3 px-3">Bank Ref No</th>
                  <th class="py-3 px-3 text-center">Invoice Status</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-neg-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-neg-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderNegotiationsRows(this.negotiationsDataset);
    this.renderNegotiationsTotals(this.negotiationsDataset);
  },

  renderNegotiationsRows(list) {
    const tbody = document.getElementById('sales-neg-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="py-8 text-center text-[#64748B] text-xs">
            No negotiation records found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => {
      const isNegotiated = r.invoiceStatus === 'Negotiated';
      const statusBadge = isNegotiated
        ? `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">Negotiated</span>`
        : `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#FEE2E2] text-[#DC2626] border border-[#FECDD3]">Pending</span>`;

      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
          <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo}</td>
          <td class="py-3 px-3 font-mono font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openNegotiationModal('${r.id}')">${r.id}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A] hover:text-[#006C7A] cursor-pointer" onclick="SalesView.openNegotiationModal('${r.id}')">${r.invNo}</td>
          <td class="py-3 px-3 font-semibold text-[#475569]">${r.poNo}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A]">${r.consigneeName}</td>
          <td class="py-3 px-3 font-mono text-[#64748B]">${r.bankRefNo || '-'}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">${statusBadge}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">
            <div class="flex items-center justify-center gap-1.5">
              <button 
                type="button" 
                class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
                title="Record LC Negotiation / Discounting" 
                onclick="SalesView.openNegotiationModal('${r.id}')"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
              </button>
              <button 
                type="button" 
                class="w-6 h-6 inline-flex items-center justify-center text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded cursor-pointer transition-colors" 
                title="View Details" 
                onclick="SalesView.openNegotiationModal('${r.id}')"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderNegotiationsTotals(list) {
    const el = document.getElementById('sales-neg-totals');
    if (!el) return;

    const count = list.length;
    const completed = list.filter(x => x.invoiceStatus === 'Negotiated').length;
    const pending = count - completed;

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total LC Negotiations</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Bills</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Discounted / Negotiated</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${completed} <span class="text-xs font-semibold text-[#006644]">Done</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Discounting</div>
          <div class="text-lg font-black text-[#DC2626] mt-0.5">${pending} <span class="text-xs font-semibold text-[#DC2626]">Pending</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Negotiating Bank Entity</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">Standard Chartered <span class="text-[11px] font-semibold text-[#64748B]">(Foreign Dept)</span></div>
        </div>
      </div>
    `;
  },

  filterNegotiations() {
    const consignee = document.getElementById('sales-neg-consignee')?.value || 'All';
    const status = document.getElementById('sales-neg-status')?.value || 'All';

    const filtered = this.negotiationsDataset.filter(r => {
      const matchConsignee = consignee === 'All' || r.consigneeName === consignee;
      const matchStatus = status === 'All' || r.invoiceStatus === status;
      return matchConsignee && matchStatus;
    });

    this.renderNegotiationsRows(filtered);
    this.renderNegotiationsTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} negotiation records`, 'info');
    }
  },

  searchNegotiations(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderNegotiationsRows(this.negotiationsDataset);
      this.renderNegotiationsTotals(this.negotiationsDataset);
      return;
    }

    const filtered = this.negotiationsDataset.filter(r => 
      (r.invNo || '').toLowerCase().includes(q) ||
      (r.id || '').toLowerCase().includes(q) ||
      (r.poNo || '').toLowerCase().includes(q) ||
      (r.consigneeName || '').toLowerCase().includes(q)
    );

    this.renderNegotiationsRows(filtered);
    this.renderNegotiationsTotals(filtered);
  },

  downloadNegotiationsExcel() {
    const headers = ['S.No', 'ID', 'InvNo', 'Po No.', 'Consignee Name', 'Bank Ref No', 'Invoice Status'];
    const rows = this.negotiationsDataset.map(r => [
      r.sNo,
      r.id,
      `"${r.invNo}"`,
      `"${r.poNo}"`,
      `"${r.consigneeName}"`,
      `"${r.bankRefNo}"`,
      r.invoiceStatus
    ].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `negotiations_register_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported negotiations register to Excel/CSV', 'success');
    }
  },

  openNegotiationModal(id) {
    const record = this.negotiationsDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Negotiation Invoice: ${record.invNo}`);
      return;
    }

    Modal.open({
      title: 'DOCUMENT NEGOTIATION & LC DISCOUNTING',
      size: '4xl',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Payments &nbsp;&gt;&nbsp; Negotiations &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">${record.invNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Invoice Number</label>
                <input type="text" value="${record.invNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#006C7A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Buyer / Consignee</label>
                <input type="text" value="${record.consigneeName}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PO Reference</label>
                <input type="text" value="${record.poNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#475569] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Negotiating Bank Entity <span class="text-[#EF4444]">*</span></label>
                <select id="neg-modal-bank" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Standard Chartered Bank" selected>Standard Chartered Bank</option>
                  <option value="State Bank of India">State Bank of India</option>
                  <option value="Citibank N.A.">Citibank N.A.</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Bank Reference No <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="neg-modal-bank-ref" value="${record.bankRefNo === '-' ? ('1440726TP0B00' + Math.floor(430 + Math.random() * 50)) : record.bankRefNo}" placeholder="Enter Bank Ref No" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-mono font-bold text-xs text-[#006C7A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Negotiation Status</label>
                <select id="neg-modal-status" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Negotiated" selected>Negotiated / Discounted</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Interest & Discounting Terms</label>
              <textarea id="neg-modal-notes" rows="2" class="w-full p-2 rounded-lg border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">SOFR + 1.25% margin applied. Clean document set negotiated under irrevocable documentary letter of credit.</textarea>
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
          label: 'Save Negotiation',
          type: 'primary',
          onClick: (m) => SalesView.saveNegotiation(record.id)
        }
      ]
    });
  },

  saveNegotiation(id) {
    const record = this.negotiationsDataset.find(x => x.id === id);
    if (!record) return;

    const bankRef = document.getElementById('neg-modal-bank-ref')?.value;
    const status = document.getElementById('neg-modal-status')?.value;

    if (bankRef) record.bankRefNo = bankRef;
    if (status) record.invoiceStatus = status;

    this.renderNegotiationsRows(this.negotiationsDataset);
    this.renderNegotiationsTotals(this.negotiationsDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Saved negotiation for ${record.invNo}`, 'success');
    }
  },

  // ==========================================
  // 8. REALIZATION REGISTER (IMAGE 3)
  // ==========================================
  realizationDataset: [
    {
      sNo: 1,
      invoiceNo: 'DFL/SNM/2627/145',
      invoiceDate: '12-08-2026',
      transactionType: 'Collections',
      consigneeName: 'MARK FOODS LLC',
      bankRef: '1440726TP0B00425',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      valueUsd: 125000.00
    },
    {
      sNo: 2,
      invoiceNo: 'DFL/SNM/2627/143',
      invoiceDate: '10-08-2026',
      transactionType: 'Collections',
      consigneeName: 'SEA PORT PRODUCTS CORPORATION',
      bankRef: '1440726TP0B00426',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      valueUsd: 110500.00
    },
    {
      sNo: 3,
      invoiceNo: 'DFL/JPT/2627/163',
      invoiceDate: '05-08-2026',
      transactionType: 'Negotiations',
      consigneeName: 'C.P. FOOD PRODUCTS, INC.',
      bankRef: '1440726TP0B00427',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      valueUsd: 142000.00
    }
  ],

  renderRealization(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">REALIZATION</h2>
        </div>

        <!-- 2. Clean Search & Filters Card (Exact to Image 3) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Year:</label>
              <select id="sales-real-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Exporter:</label>
              <select id="sales-real-exporter" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUATECH PVT LTD">DEVI AQUATECH PVT LTD</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Consignee:</label>
              <select id="sales-real-consignee" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="MARK FOODS LLC">MARK FOODS LLC</option>
                <option value="SEA PORT PRODUCTS CORPORATION">SEA PORT PRODUCTS CORPORATION</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Country:</label>
              <select id="sales-real-country" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="U.S.A.">U.S.A.</option>
                <option value="CHINA">CHINA</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Invoice Status</label>
              <select id="sales-real-status" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="Pending" selected>Pending</option>
                <option value="Realized">Realized</option>
                <option value="All">All</option>
              </select>
            </div>
          </div>

          <div class="flex justify-center pt-1">
            <button id="btn-real-search" class="px-7 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterRealization()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
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
                id="sales-real-search-input" 
                placeholder="Search realization..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchRealization(this.value)"
              />
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#02a8b5] hover:text-[#008f9a] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadRealizationExcel()">
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
                  <th class="py-3 px-3">S.No</th>
                  <th class="py-3 px-3">Invoice No.</th>
                  <th class="py-3 px-3">Invoice Date</th>
                  <th class="py-3 px-3">Transaction Type</th>
                  <th class="py-3 px-3">Consignee Name</th>
                  <th class="py-3 px-3">Bank Ref</th>
                  <th class="py-3 px-3 text-center">Status</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-real-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-real-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderRealizationRows(this.realizationDataset);
    this.renderRealizationTotals(this.realizationDataset);
  },

  renderRealizationRows(list) {
    const tbody = document.getElementById('sales-real-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="py-8 text-center text-[#64748B] text-xs font-semibold">
            No data available in table
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
        <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openRealizationModal('${r.invoiceNo}')">${r.invoiceNo}</td>
        <td class="py-3 px-3 text-[#475569] whitespace-nowrap">${r.invoiceDate}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.transactionType}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A]">${r.consigneeName}</td>
        <td class="py-3 px-3 font-mono font-semibold text-[#006C7A]">${r.bankRef}</td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#FEE2E2] text-[#DC2626] border border-[#FECDD3]">${r.status}</span>
        </td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <button 
            type="button" 
            class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
            title="Record e-BRC / Inward Remittance" 
            onclick="SalesView.openRealizationModal('${r.invoiceNo}')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderRealizationTotals(list) {
    const el = document.getElementById('sales-real-totals');
    if (!el) return;

    const count = list.length;
    const totalVal = list.reduce((sum, r) => sum + (Number(r.valueUsd) || 0), 0);

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Awaiting Inward Remittance</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Invoices</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Unrealized Export Value</div>
          <div class="text-lg font-black text-[#DC2626] mt-0.5">$${totalVal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">RBI EDPMS Limit Threshold</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">270 Days <span class="text-xs font-semibold text-[#006644]">Compliant</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">AD Code Entity</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">0290048 <span class="text-[11px] font-semibold text-[#64748B]">(SBI Overseas)</span></div>
        </div>
      </div>
    `;
  },

  filterRealization() {
    const consignee = document.getElementById('sales-real-consignee')?.value || 'All';
    const status = document.getElementById('sales-real-status')?.value || 'Pending';

    const filtered = this.realizationDataset.filter(r => {
      const matchConsignee = consignee === 'All' || r.consigneeName === consignee;
      const matchStatus = status === 'All' || r.status === status;
      return matchConsignee && matchStatus;
    });

    this.renderRealizationRows(filtered);
    this.renderRealizationTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} realization records`, 'info');
    }
  },

  searchRealization(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderRealizationRows(this.realizationDataset);
      this.renderRealizationTotals(this.realizationDataset);
      return;
    }

    const filtered = this.realizationDataset.filter(r => 
      (r.invoiceNo || '').toLowerCase().includes(q) ||
      (r.consigneeName || '').toLowerCase().includes(q) ||
      (r.bankRef || '').toLowerCase().includes(q)
    );

    this.renderRealizationRows(filtered);
    this.renderRealizationTotals(filtered);
  },

  downloadRealizationExcel() {
    const headers = ['S.No', 'Invoice No.', 'Invoice Date', 'Transaction Type', 'Consignee Name', 'Bank Ref', 'Status', 'Value USD'];
    const rows = this.realizationDataset.map(r => [
      r.sNo,
      `"${r.invoiceNo}"`,
      `"${r.invoiceDate}"`,
      `"${r.transactionType}"`,
      `"${r.consigneeName}"`,
      `"${r.bankRef}"`,
      r.status,
      r.valueUsd
    ].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `realization_register_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported realization register to Excel/CSV', 'success');
    }
  },

  openRealizationModal(invoiceNo) {
    const record = this.realizationDataset.find(x => x.invoiceNo === invoiceNo);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Realization for: ${record.invoiceNo}`);
      return;
    }

    Modal.open({
      title: 'RECORD STATUTORY REALIZATION & e-BRC',
      size: '4xl',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Payments &nbsp;&gt;&nbsp; Realization &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">${record.invoiceNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Invoice Number</label>
                <input type="text" value="${record.invoiceNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#006C7A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Buyer / Consignee</label>
                <input type="text" value="${record.consigneeName}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Transaction Type</label>
                <input type="text" value="${record.transactionType}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#475569] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Bank Reference No</label>
                <input type="text" value="${record.bankRef}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-mono font-bold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Realized Amount (USD) <span class="text-[#EF4444]">*</span></label>
                <input type="number" id="real-modal-usd" value="${record.valueUsd}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-extrabold text-xs text-[#006644] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">e-BRC Certificate Number <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="real-modal-brc" value="BRC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-mono font-bold text-xs text-[#006C7A] outline-none focus:border-[#006C7A]">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Date of Remittance Receipt <span class="text-[#EF4444]">*</span></label>
                <input type="date" id="real-modal-date" value="${new Date().toISOString().slice(0, 10)}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">EDPMS Status</label>
                <select id="real-modal-status" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Realized" selected>Realized & Closed in EDPMS</option>
                  <option value="Pending">Pending</option>
                </select>
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
          label: 'Save Realization',
          type: 'primary',
          onClick: (m) => SalesView.saveRealization(record.invoiceNo)
        }
      ]
    });
  },

  saveRealization(invoiceNo) {
    const record = this.realizationDataset.find(x => x.invoiceNo === invoiceNo);
    if (!record) return;

    const brc = document.getElementById('real-modal-brc')?.value;
    const dateOfReceipt = document.getElementById('real-modal-date')?.value || '23-10-2026';
    const realizedVal = parseFloat(document.getElementById('real-modal-usd')?.value) || record.valueUsd;

    // Move to Realization Done
    const doneItem = {
      slNo: this.realizationDoneDataset.length + 1,
      invoiceNo: record.invoiceNo,
      consignee: record.consigneeName,
      salesInvoiceDate: record.invoiceDate,
      transactionType: record.transactionType,
      totalInvoiceValue: record.valueUsd,
      realisedValue: realizedVal,
      dateOfDiscounting: '-',
      bankRefNo: record.bankRef,
      dateOfReceipt: dateOfReceipt,
      year: record.year || '2026-2027',
      exporter: record.exporter || 'DEVI FISHERIES LIMITED',
      country: record.country || 'U.S.A.',
      billsType: record.transactionType
    };

    this.realizationDoneDataset.unshift(doneItem);
    this.realizationDoneDataset.forEach((r, idx) => r.slNo = idx + 1);

    // Remove from pending realization
    this.realizationDataset = this.realizationDataset.filter(x => x.invoiceNo !== invoiceNo);

    this.renderRealizationRows(this.realizationDataset);
    this.renderRealizationTotals(this.realizationDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Successfully recorded e-BRC ${brc} for ${record.invoiceNo}`, 'success');
    }
  },

  // ==========================================
  // 9. REALIZATION DONE REGISTER (IMAGE 4)
  // ==========================================
  realizationDoneDataset: [
    {
      slNo: 1,
      invoiceNo: 'DFL/VSP/2627/004',
      consignee: 'ZHEJIANG YIWU CHINA COMMODITY CITY IMPORT AND EXPORT CO.,LTD',
      salesInvoiceDate: '28-07-2026',
      transactionType: 'Collections',
      totalInvoiceValue: 101865.60,
      realisedValue: 101865.60,
      dateOfDiscounting: '-',
      bankRefNo: '1440726TP0B00419',
      dateOfReceipt: '29-07-2026',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      billsType: 'Collections'
    },
    {
      slNo: 2,
      invoiceNo: 'DFL/VSP/2627/003',
      consignee: 'ZHEJIANG YIWU CHINA COMMODITY CITY IMPORT AND EXPORT CO.,LTD',
      salesInvoiceDate: '28-07-2026',
      transactionType: 'Collections',
      totalInvoiceValue: 101865.60,
      realisedValue: 101865.60,
      dateOfDiscounting: '-',
      bankRefNo: '1440726TP0B00419',
      dateOfReceipt: '29-07-2026',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      billsType: 'Collections'
    },
    {
      slNo: 3,
      invoiceNo: 'DFL/KKD/2627/134',
      consignee: 'ZHANJIANG ZHANXIN AQUATIC PRODUCT CO., LTD',
      salesInvoiceDate: '17-08-2026',
      transactionType: 'Collections',
      totalInvoiceValue: 95256.00,
      realisedValue: 95256.00,
      dateOfDiscounting: '-',
      bankRefNo: '1440726DU0B03805',
      dateOfReceipt: '10-09-2026',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      billsType: 'Collections'
    },
    {
      slNo: 4,
      invoiceNo: 'DFL/KKD/2627/130',
      consignee: 'ZHANJIANG ZHANXIN AQUATIC PRODUCT CO., LTD',
      salesInvoiceDate: '07-08-2026',
      transactionType: 'Collections',
      totalInvoiceValue: 98172.00,
      realisedValue: 98172.00,
      dateOfDiscounting: '-',
      bankRefNo: '1440726DU0B03806',
      dateOfReceipt: '07-09-2026',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      billsType: 'Collections'
    },
    {
      slNo: 5,
      invoiceNo: 'DFL/KKD/2627/124',
      consignee: 'ZHANJIANG ZHANXIN AQUATIC PRODUCT CO., LTD',
      salesInvoiceDate: '24-07-2026',
      transactionType: 'Collections',
      totalInvoiceValue: 98172.00,
      realisedValue: 98172.00,
      dateOfDiscounting: '-',
      bankRefNo: '1440726DU0B03535',
      dateOfReceipt: '03-09-2026',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      billsType: 'Collections'
    }
  ],

  renderRealizationDone(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">REALIZATION DONE</h2>
        </div>

        <!-- 2. Clean Search & Filters Card (Exact to Image 4) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-4">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT YEAR</label>
              <select id="sales-rd-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT EXPORTER :</label>
              <select id="sales-rd-exporter" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUATECH PVT LTD">DEVI AQUATECH PVT LTD</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT COUNTRY:</label>
              <select id="sales-rd-country" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="CHINA">CHINA</option>
                <option value="U.S.A.">U.S.A.</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">BILLS TYPE:</label>
              <select id="sales-rd-bills-type" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="Collections">Collections</option>
                <option value="Negotiations">Negotiations</option>
              </select>
            </div>
          </div>

          <div class="flex justify-start pt-1">
            <button id="btn-rd-search" class="px-7 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterRealizationDone()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
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
                id="sales-rd-search-input" 
                placeholder="Search realized payments..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchRealizationDone(this.value)"
              />
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#02a8b5] hover:text-[#008f9a] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadRealizationDoneExcel()">
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
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortRealizationDone('slNo')">
                    <span class="inline-flex items-center gap-1">Sl.No. <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">Invoice NO</th>
                  <th class="py-3 px-3">Consignee</th>
                  <th class="py-3 px-3">Sales Invoice Date</th>
                  <th class="py-3 px-3">Transaction Type</th>
                  <th class="py-3 px-3 text-right">Total Invoice Value$</th>
                  <th class="py-3 px-3 text-right">Realised Value$</th>
                  <th class="py-3 px-3 text-center">Date Of Discounting With Bank</th>
                  <th class="py-3 px-3">Bank Ref No</th>
                  <th class="py-3 px-3">Date Of Receipt Of Payment-1</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-rd-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-rd-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderRealizationDoneRows(this.realizationDoneDataset);
    this.renderRealizationDoneTotals(this.realizationDoneDataset);
  },

  renderRealizationDoneRows(list) {
    const tbody = document.getElementById('sales-rd-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="11" class="py-8 text-center text-[#64748B] text-xs">
            No realized payment records found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.slNo || (idx + 1)}</td>
        <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openRealizationDoneModal('${r.invoiceNo}')">${r.invoiceNo}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A]">${r.consignee}</td>
        <td class="py-3 px-3 font-semibold text-[#475569] whitespace-nowrap">${r.salesInvoiceDate}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.transactionType}</td>
        <td class="py-3 px-3 font-extrabold text-[#006644] text-right">$${(r.totalInvoiceValue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td class="py-3 px-3 font-extrabold text-[#006644] text-right">$${(r.realisedValue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td class="py-3 px-3 text-[#64748B] text-center font-medium">${r.dateOfDiscounting || '-'}</td>
        <td class="py-3 px-3 font-mono font-semibold text-[#006C7A] whitespace-nowrap">${r.bankRefNo}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A] whitespace-nowrap">${r.dateOfReceipt}</td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <button 
            type="button" 
            class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
            title="View Realization Breakdown" 
            onclick="SalesView.openRealizationDoneModal('${r.invoiceNo}')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderRealizationDoneTotals(list) {
    const el = document.getElementById('sales-rd-totals');
    if (!el) return;

    const count = list.length;
    const totalVal = list.reduce((sum, r) => sum + (Number(r.totalInvoiceValue) || 0), 0);
    const totalRealised = list.reduce((sum, r) => sum + (Number(r.realisedValue) || 0), 0);

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Realized Invoices</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Paid In Full</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Realized USD</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">$${totalRealised.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Foreign Inward BRC Status</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">100% <span class="text-xs font-semibold text-[#006C7A]">Certified</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Key Clearing Bank Entity</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">SBI Commercial <span class="text-[11px] font-semibold text-[#64748B]">(FIRC Settled)</span></div>
        </div>
      </div>
    `;
  },

  filterRealizationDone() {
    const country = document.getElementById('sales-rd-country')?.value || 'All';
    const billsType = document.getElementById('sales-rd-bills-type')?.value || 'All';

    const filtered = this.realizationDoneDataset.filter(r => {
      const matchCountry = country === 'All' || r.country === country;
      const matchType = billsType === 'All' || r.billsType === billsType;
      return matchCountry && matchType;
    });

    this.renderRealizationDoneRows(filtered);
    this.renderRealizationDoneTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} completed realization records`, 'info');
    }
  },

  searchRealizationDone(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderRealizationDoneRows(this.realizationDoneDataset);
      this.renderRealizationDoneTotals(this.realizationDoneDataset);
      return;
    }

    const filtered = this.realizationDoneDataset.filter(r => 
      (r.invoiceNo || '').toLowerCase().includes(q) ||
      (r.consignee || '').toLowerCase().includes(q) ||
      (r.bankRefNo || '').toLowerCase().includes(q)
    );

    this.renderRealizationDoneRows(filtered);
    this.renderRealizationDoneTotals(filtered);
  },

  sortRealizationDone(key) {
    this.realizationDoneDataset.reverse();
    this.renderRealizationDoneRows(this.realizationDoneDataset);
  },

  downloadRealizationDoneExcel() {
    const headers = ['Sl.No.', 'Invoice NO', 'Consignee', 'Sales Invoice Date', 'Transaction Type', 'Total Invoice Value$', 'Realised Value$', 'Date Of Discounting With Bank', 'Bank Ref No', 'Date Of Receipt Of Payment-1'];
    const rows = this.realizationDoneDataset.map(r => [
      r.slNo,
      `"${r.invoiceNo}"`,
      `"${r.consignee}"`,
      `"${r.salesInvoiceDate}"`,
      `"${r.transactionType}"`,
      r.totalInvoiceValue,
      r.realisedValue,
      `"${r.dateOfDiscounting}"`,
      `"${r.bankRefNo}"`,
      `"${r.dateOfReceipt}"`
    ].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `realization_done_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported realized register to Excel/CSV', 'success');
    }
  },

  openRealizationDoneModal(invoiceNo) {
    const record = this.realizationDoneDataset.find(x => x.invoiceNo === invoiceNo);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Realized Invoice: ${record.invoiceNo}`);
      return;
    }

    Modal.open({
      title: 'FOREIGN INWARD REMITTANCE & e-BRC CERTIFICATE',
      size: '4xl',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Payments &nbsp;&gt;&nbsp; Realization Done &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">${record.invoiceNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Invoice Number</label>
                <input type="text" value="${record.invoiceNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#006C7A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Consignee</label>
                <input type="text" value="${record.consignee}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Bank Reference No</label>
                <input type="text" value="${record.bankRefNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-mono font-bold text-xs text-[#006C7A] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Total Invoice Value (USD)</label>
                <input type="text" value="$${record.totalInvoiceValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Realised Value (USD)</label>
                <input type="text" value="$${record.realisedValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#DCFCE7] font-extrabold text-xs text-[#15803D] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Date of Receipt</label>
                <input type="text" value="${record.dateOfReceipt}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
            </div>

            <div class="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <div class="flex items-center gap-2 text-[#006644] font-bold text-xs mb-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>DGFT EDPMS Export Discharge Certificate Validated</span>
              </div>
              <p class="text-[11px] text-[#64748B]">All statutory bank realizations reported to Reserve Bank of India EDPMS portal under Authorized Dealer code 0290048. Shipping Bill matching reconciled.</p>
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


  // ==========================================
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
            <button id="btn-pins-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterPendingInsurance()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <button id="btn-pins-save" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.generateInsuranceTemplateFromSelection()">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Save</span>
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
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#02a8b5] hover:text-[#008f9a] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadPendingInsuranceExcel()">
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
      size: '4xl',
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
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#02a8b5] hover:text-[#008f9a] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadInsuranceTemplatesExcel()">
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
      size: '4xl',
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
              <button id="btn-inspay-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterInsurancePayments()">
                <span>Search</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
              <button id="btn-inspay-save" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.settleInsurancePaymentSelection()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                <span>Save</span>
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
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#02a8b5] hover:text-[#008f9a] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadInsurancePaymentsExcel()">
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
      size: '4xl',
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



};
