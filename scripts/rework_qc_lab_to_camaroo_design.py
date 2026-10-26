#!/usr/bin/env python3
"""
scripts/rework_qc_lab_to_camaroo_design.py
Restyles LotsList and AB Report (including Daily Lab AB Report create form)
to strictly follow the Devi Fisheries Camaroo / Preprocessing Design System:
- Brand teal #02a8b5 / #008f9a accents and icons
- Standardized SEARCH & FILTERS card with funnel icon and #CBD5E1 borders
- Standardized Data Table cards with #F8FAFC headers and #FAFBFC search toolbars
- High-quality Preprocessing-style form controls, labels, and action buttons
- Zero raw prototype styling (removes all #3B82F6, #4F46E5, #6366F1, #F43F5E)
"""

import sys

new_lots_and_ab_code = """  // LotsList Filter & Sorting State
  lotsStationFilter: 'All Purchase Station',
  lotsMonthFilter: 'October',
  lotsYearFilter: '2026',
  lotsSearchQuery: '',
  lotsSortField: 'id',
  lotsSortAsc: true,

  getLotsData() {
    return [
      { id: '153934', lot: 'BLS/2627/0143', rmDate: '01-10-2026', type: 'Site Weightment', grader: '—', agent: '—', count: 400.00, weight: 400.00, abStatus: 'Test Pending', station: 'Balsore (BLS)', testDetails: { method: 'Rapid ELISA Kit', collectedBy: 'R. K. Patnaik', lab: 'In-House Lab #1', testTime: '01-10-2026 11:30 AM', antibiotics: 'Nitrofurans (AOZ, AMOZ, AHD, SEM), Chloramphenicol', statusBadge: 'pending' } },
      { id: '153935', lot: 'NLR/2627/0256', rmDate: '01-10-2026', type: 'Site Weightment', grader: '—', agent: '—', count: 4000.00, weight: 40000.00, abStatus: 'POSITIVE', station: 'Nellore (NLR)', testDetails: { method: 'LC-MS/MS Quantitative Screening', collectedBy: 'Dr. Y. V. Rao', lab: 'Nellore Regional Lab', testTime: '01-10-2026 02:15 PM', antibiotics: 'Nitrofurazone SEM detected (0.45 ppb) - Non-Compliant with Export Standard', statusBadge: 'positive' } },
      { id: '153938', lot: 'AVN/2627/1234', rmDate: '04-10-2026', type: 'Site Weightment', grader: 'A.ANNAVARAM', agent: 'ADITYA AQUA FARMS', count: 10.00, weight: 50.00, abStatus: 'Test Pending', station: 'Annavaram (AVN)', testDetails: { method: 'Rapid Nitrofurans Screening Kit', collectedBy: 'S. Naidu', lab: 'In-House Lab #2', testTime: '04-10-2026 09:00 AM', antibiotics: 'Screening in process, incubation underway', statusBadge: 'pending' } },
      { id: '153939', lot: 'ADP/2627/0019', rmDate: '05-10-2026', type: 'Site Weightment', grader: '—', agent: '—', count: 12.00, weight: 500.00, abStatus: 'Test Pending', station: 'Amalapuram (ADP)', testDetails: { method: 'Rapid ELISA Kit', collectedBy: 'M. S. Prasad', lab: 'In-House Lab #1', testTime: '05-10-2026 10:15 AM', antibiotics: 'Screening in process', statusBadge: 'pending' } },
      { id: '153940', lot: 'ADP/2627/0020', rmDate: '05-10-2026', type: 'Site Weightment', grader: '—', agent: '—', count: 100.00, weight: 150.00, abStatus: 'Test Pending', station: 'Amalapuram (ADP)', testDetails: { method: 'Rapid ELISA Kit', collectedBy: 'M. S. Prasad', lab: 'In-House Lab #1', testTime: '05-10-2026 11:00 AM', antibiotics: 'Screening in process', statusBadge: 'pending' } },
      { id: '153941', lot: 'ADP/2627/0021', rmDate: '05-10-2026', type: 'Site Weightment', grader: '—', agent: '—', count: 350.00, weight: 350.00, abStatus: 'Test Pending', station: 'Amalapuram (ADP)', testDetails: { method: 'Rapid ELISA Kit', collectedBy: 'M. S. Prasad', lab: 'In-House Lab #1', testTime: '05-10-2026 12:45 PM', antibiotics: 'Screening in process', statusBadge: 'pending' } },
      { id: '153942', lot: 'AVN/2627/1235', rmDate: '05-10-2026', type: 'Site Weightment', grader: 'D.V.K.VARMA', agent: 'ADITYA AQUA FARMS', count: 1000.00, weight: 150.00, abStatus: 'Test Pending', station: 'Annavaram (AVN)', testDetails: { method: 'Rapid Nitrofurans Screening Kit', collectedBy: 'S. Naidu', lab: 'In-House Lab #2', testTime: '05-10-2026 03:20 PM', antibiotics: 'Screening in process', statusBadge: 'pending' } },
      { id: '153943', lot: 'BLS/2627/0145', rmDate: '06-10-2026', type: 'By Yield', grader: 'LAKSHMI', agent: 'ADITYA AQUA FARMS', count: 2000.00, weight: 15.00, abStatus: 'Test Pending', station: 'Balsore (BLS)', testDetails: { method: 'Rapid ELISA Kit', collectedBy: 'R. K. Patnaik', lab: 'In-House Lab #1', testTime: '06-10-2026 08:30 AM', antibiotics: 'Screening in process', statusBadge: 'pending' } },
      { id: '153944', lot: 'KKD/2627/0312', rmDate: '07-10-2026', type: 'Site Weightment', grader: 'S. RAMA RAO', agent: 'SRI KRISHNA FISHERIES', count: 650.00, weight: 850.00, abStatus: 'NEGATIVE', station: 'Kakinada (KKD)', testDetails: { method: 'LC-MS/MS & Rapid ELISA', collectedBy: 'K. Varma', lab: 'Kakinada Quality Center', testTime: '07-10-2026 09:10 AM', antibiotics: 'All Tested Antibiotics Below Level of Detection (<0.1 ppb) - Compliant', statusBadge: 'negative' } },
      { id: '153945', lot: 'BVR/2627/0488', rmDate: '08-10-2026', type: 'Plant Weightment', grader: 'K. MOHAN', agent: 'GODAVARI AQUATICS', count: 520.00, weight: 620.00, abStatus: 'Test Pending', station: 'Bhimavaram (BVRM)', testDetails: { method: 'Rapid ELISA Kit', collectedBy: 'Ch. Srinivas', lab: 'Main Processing Plant Lab', testTime: '08-10-2026 10:00 AM', antibiotics: 'Sample undergoing incubation', statusBadge: 'pending' } },
      { id: '153946', lot: 'VSK/2627/0199', rmDate: '09-10-2026', type: 'Site Weightment', grader: 'P. CHENNA', agent: 'EAST COAST SEAFOOD', count: 800.00, weight: 950.00, abStatus: 'NEGATIVE', station: 'Visakhapatnam (VSKP)', testDetails: { method: 'LC-MS/MS Full Screen', collectedBy: 'Dr. Ramesh Kumar', lab: 'Central MPEDA Lab', testTime: '09-10-2026 01:40 PM', antibiotics: 'Zero Detected (Compliant for US FDA & EU)', statusBadge: 'negative' } },
      { id: '153947', lot: 'NLR/2627/0259', rmDate: '10-10-2026', type: 'By Yield', grader: '—', agent: 'VENKATESWARA HATCHERIES', count: 310.00, weight: 420.00, abStatus: 'Test Pending', station: 'Nellore (NLR)', testDetails: { method: 'Rapid Nitrofurans Screening Kit', collectedBy: 'Dr. Y. V. Rao', lab: 'Nellore Regional Lab', testTime: '10-10-2026 04:15 PM', antibiotics: 'Sample registered and logged', statusBadge: 'pending' } }
    ];
  },

  renderLotsList(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <!-- Page Title Header -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">LOTS LIST REGISTER</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Lab Operations &bull; Raw Material Incoming Lots &amp; AB Status</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="lots-btn-export" class="px-3.5 py-2 bg-white hover:bg-slate-50 text-[#1E293B] border border-[#CBD5E1] text-xs font-bold rounded-lg shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <span>Export CSV</span>
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
          <form id="lots-filter-form" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Purchase Station Dropdown -->
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PURCHASE STATION</label>
                <select id="lots-station-select" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All Purchase Station" ${this.lotsStationFilter === 'All Purchase Station' ? 'selected' : ''}>All Purchase Station</option>
                  <option value="Bhimavaram (BVRM)" ${this.lotsStationFilter === 'Bhimavaram (BVRM)' ? 'selected' : ''}>Bhimavaram (BVRM)</option>
                  <option value="Kakinada (KKD)" ${this.lotsStationFilter === 'Kakinada (KKD)' ? 'selected' : ''}>Kakinada (KKD)</option>
                  <option value="Visakhapatnam (VSKP)" ${this.lotsStationFilter === 'Visakhapatnam (VSKP)' ? 'selected' : ''}>Visakhapatnam (VSKP)</option>
                  <option value="Amalapuram (ADP)" ${this.lotsStationFilter === 'Amalapuram (ADP)' ? 'selected' : ''}>Amalapuram (ADP)</option>
                  <option value="Nellore (NLR)" ${this.lotsStationFilter === 'Nellore (NLR)' ? 'selected' : ''}>Nellore (NLR)</option>
                  <option value="Balsore (BLS)" ${this.lotsStationFilter === 'Balsore (BLS)' ? 'selected' : ''}>Balsore (BLS)</option>
                  <option value="Annavaram (AVN)" ${this.lotsStationFilter === 'Annavaram (AVN)' ? 'selected' : ''}>Annavaram (AVN)</option>
                </select>
              </div>

              <!-- Month Dropdown -->
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">MONTH</label>
                <select id="lots-month-select" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => `
                    <option value="${m}" ${this.lotsMonthFilter === m ? 'selected' : ''}>${m}</option>
                  `).join('')}
                </select>
              </div>

              <!-- Year Dropdown -->
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="lots-year-select" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['2027', '2026', '2025', '2024', '2023', '2022'].map(y => `
                    <option value="${y}" ${this.lotsYearFilter === y ? 'selected' : ''}>${y}</option>
                  `).join('')}
                </select>
              </div>
            </div>

            <!-- Buttons Row -->
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="button" id="lots-btn-reset" class="px-4 py-2 bg-white hover:bg-slate-50 text-[#64748B] text-xs font-bold rounded-lg border border-[#CBD5E1] transition-all cursor-pointer">
                Reset
              </button>
              <button type="button" id="lots-btn-search" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Main Data Card & Table -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <!-- Table Toolbar -->
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input
                type="text"
                id="lots-search-input"
                placeholder="Search by Lot No, Grader, Agent, ID..."
                value="${this.lotsSearchQuery}"
                class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all"
              />
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <div class="flex items-center gap-2">
              <span id="lots-row-count-badge" class="text-xs font-semibold text-[#64748B]"></span>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('id')">
                    <div class="flex items-center gap-1.5"><span>ID</span><span class="text-slate-400">⇅</span></div>
                  </th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('lot')">
                    <div class="flex items-center gap-1.5"><span>LOT</span><span class="text-slate-400">⇅</span></div>
                  </th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('rmDate')">
                    <div class="flex items-center gap-1.5"><span>Rm Date</span><span class="text-slate-400">⇅</span></div>
                  </th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('type')">
                    <div class="flex items-center gap-1.5"><span>Type</span><span class="text-slate-400">⇅</span></div>
                  </th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('grader')">
                    <div class="flex items-center gap-1.5"><span>Grader</span><span class="text-slate-400">⇅</span></div>
                  </th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('agent')">
                    <div class="flex items-center gap-1.5"><span>Agent</span><span class="text-slate-400">⇅</span></div>
                  </th>
                  <th class="py-3 px-4 text-right cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('count')">
                    <div class="flex items-center justify-end gap-1.5"><span>Count</span><span class="text-slate-400">⇅</span></div>
                  </th>
                  <th class="py-3 px-4 text-right cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('weight')">
                    <div class="flex items-center justify-end gap-1.5"><span>Weight</span><span class="text-slate-400">⇅</span></div>
                  </th>
                  <th class="py-3 px-4 text-center cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('abStatus')">
                    <div class="flex items-center justify-center gap-1.5"><span>AB Status</span><span class="text-slate-400">⇅</span></div>
                  </th>
                  <th class="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="lots-table-tbody" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.bindLotsEvents();
    this.renderLotsTableRows();
  },

  bindLotsEvents() {
    document.getElementById('lots-station-select')?.addEventListener('change', (e) => {
      this.lotsStationFilter = e.target.value;
    });

    document.getElementById('lots-month-select')?.addEventListener('change', (e) => {
      this.lotsMonthFilter = e.target.value;
    });

    document.getElementById('lots-year-select')?.addEventListener('change', (e) => {
      this.lotsYearFilter = e.target.value;
    });

    document.getElementById('lots-btn-reset')?.addEventListener('click', () => {
      this.lotsStationFilter = 'All Purchase Station';
      this.lotsMonthFilter = 'October';
      this.lotsYearFilter = '2026';
      this.lotsSearchQuery = '';
      const st = document.getElementById('lots-station-select');
      if (st) st.value = 'All Purchase Station';
      const m = document.getElementById('lots-month-select');
      if (m) m.value = 'October';
      const y = document.getElementById('lots-year-select');
      if (y) y.value = '2026';
      const s = document.getElementById('lots-search-input');
      if (s) s.value = '';
      this.renderLotsTableRows();
    });

    document.getElementById('lots-btn-search')?.addEventListener('click', () => {
      this.renderLotsTableRows();
    });

    document.getElementById('lots-search-input')?.addEventListener('input', (e) => {
      this.lotsSearchQuery = e.target.value.trim();
      this.renderLotsTableRows();
    });

    document.getElementById('lots-btn-export')?.addEventListener('click', () => {
      const data = this.getLotsData();
      const headers = ["ID", "LOT", "Rm Date", "Type", "Grader", "Agent", "Count", "Weight", "AB Status", "Station"];
      const rows = data.map(l => [l.id, l.lot, l.rmDate, l.type, l.grader, l.agent, l.count, l.weight, l.abStatus, l.station]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.map(v => `"${v}"`).join(','))].join('\\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `LotsList_${this.lotsMonthFilter}_${this.lotsYearFilter}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  },

  sortLots(field) {
    if (this.lotsSortField === field) {
      this.lotsSortAsc = !this.lotsSortAsc;
    } else {
      this.lotsSortField = field;
      this.lotsSortAsc = true;
    }
    this.renderLotsTableRows();
  },

  renderLotsTableRows() {
    const tbody = document.getElementById('lots-table-tbody');
    if (!tbody) return;

    let rows = this.getLotsData();

    if (this.lotsStationFilter && this.lotsStationFilter !== 'All Purchase Station') {
      rows = rows.filter(r => r.station === this.lotsStationFilter);
    }

    if (this.lotsSearchQuery) {
      const q = this.lotsSearchQuery.toLowerCase();
      rows = rows.filter(r => 
        r.id.toLowerCase().includes(q) ||
        r.lot.toLowerCase().includes(q) ||
        r.rmDate.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.grader.toLowerCase().includes(q) ||
        r.agent.toLowerCase().includes(q) ||
        r.abStatus.toLowerCase().includes(q)
      );
    }

    rows.sort((a, b) => {
      let va = a[this.lotsSortField];
      let vb = b[this.lotsSortField];
      if (typeof va === 'number' && typeof vb === 'number') {
        return this.lotsSortAsc ? va - vb : vb - va;
      }
      va = (va || '').toString().toLowerCase();
      vb = (vb || '').toString().toLowerCase();
      return this.lotsSortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
    });

    const badgeEl = document.getElementById('lots-row-count-badge');
    if (badgeEl) badgeEl.textContent = `Showing ${rows.length} lots`;

    if (rows.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="10" class="py-12 text-center text-[#94A3B8]">
            <svg class="w-10 h-10 mx-auto text-[#CBD5E1] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            No matching Lots found for the selected station and criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = rows.map((lot, idx) => {
      let statusBadgeClass = 'bg-[#006C7A]/10 text-[#006C7A] border border-[#00A4B7]/30';
      if (lot.abStatus === 'POSITIVE') {
        statusBadgeClass = 'bg-rose-50 text-rose-700 border border-rose-200';
      } else if (lot.abStatus === 'NEGATIVE') {
        statusBadgeClass = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      }

      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors ${idx % 2 === 1 ? 'bg-slate-50/40' : ''}">
          <td class="py-3 px-4 font-bold text-[#1E293B]">${lot.id}</td>
          <td class="py-3 px-4 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="QCView.openLotDetailModal('${lot.id}')">${lot.lot}</td>
          <td class="py-3 px-4 text-[#64748B] whitespace-nowrap">${lot.rmDate}</td>
          <td class="py-3 px-4 text-[#334155]">${lot.type}</td>
          <td class="py-3 px-4 text-[#334155]">${lot.grader}</td>
          <td class="py-3 px-4 text-[#334155]">${lot.agent}</td>
          <td class="py-3 px-4 text-right font-medium text-[#1E293B]">${Number(lot.count).toFixed(2)}</td>
          <td class="py-3 px-4 text-right font-medium text-[#1E293B]">${Number(lot.weight).toFixed(2)}</td>
          <td class="py-3 px-4 text-center">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${statusBadgeClass}">
              ${lot.abStatus}
            </span>
          </td>
          <td class="py-3 px-4 text-center">
            <button 
              type="button" 
              onclick="QCView.openLotDetailModal('${lot.id}')" 
              class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center" 
              title="View Lot & Lab Details"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  openLotDetailModal(lotId) {
    const lot = this.getLotsData().find(l => l.id === lotId);
    if (!lot) return;

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: `LOT LAB & TESTING RECORD — ${lot.lot}`,
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs text-[#1E293B]">
          <!-- Summary Header Banner -->
          <div class="flex items-center justify-between p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl">
            <div>
              <div class="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Lot Identifier</div>
              <div class="text-base font-extrabold text-[#1E293B]">${lot.lot} <span class="text-xs font-semibold text-[#64748B]">(ID: ${lot.id})</span></div>
            </div>
            <div class="text-right">
              <div class="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Antibiotic Status</div>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${lot.abStatus === 'POSITIVE' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-[#006C7A]/10 text-[#006C7A] border border-[#00A4B7]/30'}">
                ${lot.abStatus}
              </span>
            </div>
          </div>

          <!-- 2-Column Info Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-4 bg-white border border-[#CBD5E1] rounded-xl space-y-2.5">
              <div class="text-[11px] font-bold uppercase tracking-wider text-[#006C7A] pb-1 border-b border-[#F1F5F9]">
                Purchase & Receiving Details
              </div>
              <div class="flex justify-between py-1 border-b border-slate-50">
                <span class="text-[#64748B]">RM Receiving Date:</span>
                <span class="font-semibold text-[#1E293B]">${lot.rmDate}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-50">
                <span class="text-[#64748B]">Weighment Station:</span>
                <span class="font-semibold text-[#1E293B]">${lot.station}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-50">
                <span class="text-[#64748B]">Purchase Type:</span>
                <span class="font-semibold text-[#1E293B]">${lot.type}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-50">
                <span class="text-[#64748B]">Grader Name:</span>
                <span class="font-semibold text-[#1E293B]">${lot.grader}</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-[#64748B]">Agent / Farmer:</span>
                <span class="font-semibold text-[#1E293B]">${lot.agent}</span>
              </div>
            </div>

            <div class="p-4 bg-white border border-[#CBD5E1] rounded-xl space-y-2.5">
              <div class="text-[11px] font-bold uppercase tracking-wider text-[#006C7A] pb-1 border-b border-[#F1F5F9]">
                Quantity & Lab Testing Protocol
              </div>
              <div class="flex justify-between py-1 border-b border-slate-50">
                <span class="text-[#64748B]">Pcs / Count:</span>
                <span class="font-bold text-[#1E293B]">${Number(lot.count).toFixed(2)}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-50">
                <span class="text-[#64748B]">Total Weight:</span>
                <span class="font-bold text-[#1E293B]">${Number(lot.weight).toFixed(2)} Kg</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-50">
                <span class="text-[#64748B]">Testing Method:</span>
                <span class="font-semibold text-[#1E293B]">${lot.testDetails.method}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-50">
                <span class="text-[#64748B]">Lab & Technician:</span>
                <span class="font-semibold text-[#1E293B]">${lot.testDetails.lab} (${lot.testDetails.collectedBy})</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-[#64748B]">Sampling Timestamp:</span>
                <span class="font-semibold text-[#1E293B]">${lot.testDetails.testTime}</span>
              </div>
            </div>
          </div>

          <!-- Antibiotic Test Breakdown -->
          <div class="p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl">
            <div class="text-[11px] font-bold uppercase tracking-wider text-[#006C7A] mb-1.5">
              Antibiotic Residue Screening Summary
            </div>
            <p class="text-xs text-[#334155] leading-relaxed">
              ${lot.testDetails.antibiotics}. Testing conducted strictly according to MPEDA & EIC export standards.
            </p>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Close',
          type: 'secondary',
          onClick: (modal) => modal.close()
        },
        {
          label: 'Print Lab Certificate',
          type: 'primary',
          onClick: (modal) => {
            window.print();
          }
        }
      ]
    });
  },

  // ==========================================
  // 2. ANTIBIOTIC (AB) REPORT & DAILY FORM
  // ==========================================
  abViewMode: 'list', // 'list' | 'create'
  abSelectedYear: '2026',
  abSelectedMonth: 'October',
  abSelectedPlant: 'DEVI FISHERIES LIMITED (UNIT-5)',
  abSearchQuery: '',
  abSortField: 'reportId',
  abSortAsc: false,

  abReportsData: [
    { reportId: 'AB-2026-10-01', analysisDate: '01/10/2026', reportDate: '02/10/2026', totalReports: 12, dayTotal: 8, nightTotal: 4, plant: 'DEVI FISHERIES LIMITED (UNIT-5)', status: 'Approved' },
    { reportId: 'AB-2026-10-02', analysisDate: '02/10/2026', reportDate: '03/10/2026', totalReports: 15, dayTotal: 10, nightTotal: 5, plant: 'DEVI FISHERIES LIMITED (UNIT-5)', status: 'Approved' },
    { reportId: 'AB-2026-10-04', analysisDate: '04/10/2026', reportDate: '05/10/2026', totalReports: 9, dayTotal: 6, nightTotal: 3, plant: 'DEVI FISHERIES LIMITED (UNIT-5)', status: 'Approved' },
    { reportId: 'AB-2026-10-05', analysisDate: '05/10/2026', reportDate: '06/10/2026', totalReports: 14, dayTotal: 9, nightTotal: 5, plant: 'DEVI FISHERIES LIMITED (UNIT-5)', status: 'Approved' },
    { reportId: 'AB-2026-10-06', analysisDate: '06/10/2026', reportDate: '07/10/2026', totalReports: 11, dayTotal: 7, nightTotal: 4, plant: 'DEVI FISHERIES LIMITED (UNIT-5)', status: 'Approved' },
    { reportId: 'AB-2026-10-07', analysisDate: '07/10/2026', reportDate: '08/10/2026', totalReports: 13, dayTotal: 8, nightTotal: 5, plant: 'DEVI FISHERIES LIMITED (UNIT-5)', status: 'Approved' },
    { reportId: 'AB-2026-10-08', analysisDate: '08/10/2026', reportDate: '09/10/2026', totalReports: 16, dayTotal: 11, nightTotal: 5, plant: 'DEVI FISHERIES LIMITED (UNIT-5)', status: 'Approved' }
  ],

  abTestLines: [
    { id: 'TL-101', reportId: 'AB-2026-10-01', lotNo: 'BLS/2627/0143', analysisDate: '01/10/2026', reportDate: '02/10/2026', sampleType: 'Harvest', sampleDetails: 'Vannamei Pond #12', count: 400.00, quantity: 400.00, parameter: 'Rapid ELISA', loadingStatus: 'Loaded', shift: 'DAY', testedBy: 'CH.SWATHI PADMA', verifiedBy: 'CH.SWATHI PADMA', plant: 'DEVI FISHERIES LIMITED (UNIT-5)', sulphite: '10.2 ppm', remarks: 'Clear and compliant', aoz: 'ND (<0.1)', sem: 'ND (<0.1)', cap: 'ND (<0.1)', ahd: 'ND (<0.1)', amoz: 'ND (<0.1)', result: 'Negative (Pass)' },
    { id: 'TL-102', reportId: 'AB-2026-10-01', lotNo: 'NLR/2627/0256', analysisDate: '01/10/2026', reportDate: '02/10/2026', sampleType: 'Pre-Harvest', sampleDetails: 'Vannamei Pond #04', count: 4000.00, quantity: 40000.00, parameter: 'LC-MS/MS', loadingStatus: 'Hold', shift: 'NIGHT', testedBy: 'Dr. Y. V. Rao', verifiedBy: 'CH.SWATHI PADMA', plant: 'DEVI FISHERIES LIMITED (UNIT-5)', sulphite: '14.0 ppm', remarks: 'SEM residue detected above EU MRL', aoz: 'ND (<0.1)', sem: '0.45 ppb', cap: 'ND (<0.1)', ahd: 'ND (<0.1)', amoz: 'ND (<0.1)', result: 'Positive (Fail)' }
  ],

  renderABReport(container, activeHash) {
    if (this.abViewMode === 'create') {
      this.renderCreateDailyABReport(container, activeHash);
    } else {
      this.renderABReportList(container, activeHash);
    }
  },

  openCreateDailyABReport() {
    this.abViewMode = 'create';
    const subContainer = document.getElementById('qc-subpage-content');
    if (subContainer) {
      this.renderCreateDailyABReport(subContainer);
    }
  },

  closeCreateDailyABReport() {
    this.abViewMode = 'list';
    const subContainer = document.getElementById('qc-subpage-content');
    if (subContainer) {
      this.renderABReportList(subContainer);
    }
  },

  renderABReportList(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <!-- Page Title Header with Right-Aligned Action Button -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">ANTIBIOTIC REPORTS LIST</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Lab Operations &bull; Daily Antibiotic (AB) Testing Register</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="ab-btn-create-report" onclick="QCView.openCreateDailyABReport()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Report</span>
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
          <form id="ab-filter-form" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Select Year -->
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="ab-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['2026', '2025', '2024', '2023', '2022'].map(y => `<option value="${y}" ${this.abSelectedYear === y ? 'selected' : ''}>${y}</option>`).join('')}
                </select>
              </div>

              <!-- Select Month -->
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">MONTH</label>
                <select id="ab-filter-month" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => `<option value="${m}" ${this.abSelectedMonth === m ? 'selected' : ''}>${m}</option>`).join('')}
                </select>
              </div>

              <!-- Plant -->
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT</label>
                <select id="ab-filter-plant" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="DEVI FISHERIES LIMITED (UNIT-5)" selected>DEVI FISHERIES LIMITED (UNIT-5)</option>
                  <option value="DEVI FISHERIES LIMITED (UNIT-1)">DEVI FISHERIES LIMITED (UNIT-1)</option>
                  <option value="DEVI FISHERIES LIMITED (UNIT-2)">DEVI FISHERIES LIMITED (UNIT-2)</option>
                  <option value="DEVI FISHERIES LIMITED (UNIT-3)">DEVI FISHERIES LIMITED (UNIT-3)</option>
                </select>
              </div>
            </div>

            <!-- Filter Card Footer Buttons -->
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="button" id="ab-btn-reset" class="px-4 py-2 bg-white hover:bg-slate-50 text-[#64748B] text-xs font-bold rounded-lg border border-[#CBD5E1] transition-all cursor-pointer">
                Reset
              </button>
              <button type="button" id="ab-btn-search" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Main Data Card & Table -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <!-- Table Toolbar -->
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input
                type="text"
                id="ab-search-input"
                placeholder="Search by Report ID, date, plant..."
                value="${this.abSearchQuery}"
                class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all"
              />
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <div class="flex items-center gap-2">
              <span id="ab-row-count-badge" class="text-xs font-semibold text-[#64748B]"></span>
              <button type="button" id="ab-btn-export-csv" class="px-3.5 py-2 bg-white hover:bg-slate-50 text-[#1E293B] border border-[#CBD5E1] text-xs font-bold rounded-lg shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Export</span>
              </button>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortABReports('reportId')">
                    <div class="flex items-center gap-1.5"><span>Report ID</span><span class="text-slate-400">⇅</span></div>
                  </th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortABReports('analysisDate')">
                    <div class="flex items-center gap-1.5"><span>Analysis Date</span><span class="text-slate-400">⇅</span></div>
                  </th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortABReports('reportDate')">
                    <div class="flex items-center gap-1.5"><span>Report Date</span><span class="text-slate-400">⇅</span></div>
                  </th>
                  <th class="py-3 px-4 text-right cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortABReports('totalReports')">
                    <div class="flex items-center justify-end gap-1.5"><span>Total Reports</span><span class="text-slate-400">⇅</span></div>
                  </th>
                  <th class="py-3 px-4 text-right cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortABReports('dayTotal')">
                    <div class="flex items-center justify-end gap-1.5"><span>Day Total</span><span class="text-slate-400">⇅</span></div>
                  </th>
                  <th class="py-3 px-4 text-right cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortABReports('nightTotal')">
                    <div class="flex items-center justify-end gap-1.5"><span>Night Total</span><span class="text-slate-400">⇅</span></div>
                  </th>
                  <th class="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="ab-reports-tbody" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.bindABListEvents();
    this.renderABTableRows();
  },

  bindABListEvents() {
    document.getElementById('ab-filter-year')?.addEventListener('change', (e) => {
      this.abSelectedYear = e.target.value;
    });

    document.getElementById('ab-filter-month')?.addEventListener('change', (e) => {
      this.abSelectedMonth = e.target.value;
    });

    document.getElementById('ab-filter-plant')?.addEventListener('change', (e) => {
      this.abSelectedPlant = e.target.value;
    });

    document.getElementById('ab-btn-reset')?.addEventListener('click', () => {
      this.abSelectedYear = '2026';
      this.abSelectedMonth = 'October';
      this.abSelectedPlant = 'DEVI FISHERIES LIMITED (UNIT-5)';
      this.abSearchQuery = '';
      const y = document.getElementById('ab-filter-year');
      if (y) y.value = '2026';
      const m = document.getElementById('ab-filter-month');
      if (m) m.value = 'October';
      const p = document.getElementById('ab-filter-plant');
      if (p) p.value = 'DEVI FISHERIES LIMITED (UNIT-5)';
      const s = document.getElementById('ab-search-input');
      if (s) s.value = '';
      this.renderABTableRows();
    });

    document.getElementById('ab-btn-search')?.addEventListener('click', () => {
      this.renderABTableRows();
    });

    document.getElementById('ab-search-input')?.addEventListener('input', (e) => {
      this.abSearchQuery = e.target.value.trim();
      this.renderABTableRows();
    });

    document.getElementById('ab-btn-export-csv')?.addEventListener('click', () => {
      const headers = ["Report ID", "Analysis Date", "Report Date", "Total Reports", "Day Total", "Night Total", "Plant"];
      const rows = this.abReportsData.map(r => [r.reportId, r.analysisDate, r.reportDate, r.totalReports, r.dayTotal, r.nightTotal, r.plant]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.map(v => `"${v}"`).join(','))].join('\\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Antibiotic_Reports_${this.abSelectedMonth}_${this.abSelectedYear}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  },

  sortABReports(field) {
    if (this.abSortField === field) {
      this.abSortAsc = !this.abSortAsc;
    } else {
      this.abSortField = field;
      this.abSortAsc = true;
    }
    this.renderABTableRows();
  },

  renderABTableRows() {
    const tbody = document.getElementById('ab-reports-tbody');
    if (!tbody) return;

    let rows = [...this.abReportsData];

    if (this.abSearchQuery) {
      const q = this.abSearchQuery.toLowerCase();
      rows = rows.filter(r => 
        r.reportId.toLowerCase().includes(q) ||
        r.analysisDate.toLowerCase().includes(q) ||
        r.reportDate.toLowerCase().includes(q) ||
        r.plant.toLowerCase().includes(q)
      );
    }

    rows.sort((a, b) => {
      let va = a[this.abSortField];
      let vb = b[this.abSortField];
      if (typeof va === 'number' && typeof vb === 'number') {
        return this.abSortAsc ? va - vb : vb - va;
      }
      va = (va || '').toString().toLowerCase();
      vb = (vb || '').toString().toLowerCase();
      return this.abSortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
    });

    const badgeEl = document.getElementById('ab-row-count-badge');
    if (badgeEl) badgeEl.textContent = `Showing ${rows.length} reports`;

    if (rows.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="py-12 text-center text-[#94A3B8]">
            <svg class="w-10 h-10 mx-auto text-[#CBD5E1] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            No data available in table
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = rows.map((r, idx) => {
      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors ${idx % 2 === 1 ? 'bg-slate-50/40' : ''}">
          <td class="py-3 px-4 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="QCView.openABReportDetailModal('${r.reportId}')">${r.reportId}</td>
          <td class="py-3 px-4 text-[#64748B] whitespace-nowrap">${r.analysisDate}</td>
          <td class="py-3 px-4 text-[#64748B] whitespace-nowrap">${r.reportDate}</td>
          <td class="py-3 px-4 text-right font-bold text-[#1E293B]">${r.totalReports}</td>
          <td class="py-3 px-4 text-right font-medium text-[#334155]">${r.dayTotal}</td>
          <td class="py-3 px-4 text-right font-medium text-[#334155]">${r.nightTotal}</td>
          <td class="py-3 px-4 text-center">
            <button 
              type="button" 
              onclick="QCView.openABReportDetailModal('${r.reportId}')" 
              class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center" 
              title="View Daily Breakdown"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  openABReportDetailModal(reportId) {
    const report = this.abReportsData.find(r => r.reportId === reportId);
    if (!report) return;

    const lines = this.abTestLines.filter(l => l.reportId === reportId);

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: `DAILY ANTIBIOTIC TEST BREAKDOWN — ${report.reportId}`,
      size: 'xl',
      content: `
        <div class="space-y-4 text-xs text-[#1E293B]">
          <div class="flex items-center justify-between p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl">
            <div>
              <div class="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Daily Summary Batch</div>
              <div class="text-sm font-extrabold text-[#1E293B]">${report.reportId} • ${report.analysisDate}</div>
            </div>
            <div class="flex items-center gap-4 text-right">
              <div>
                <span class="text-[#64748B] text-[10px] uppercase font-bold block">Day Shift</span>
                <span class="font-bold text-[#1E293B] text-xs">${report.dayTotal} Tests</span>
              </div>
              <div>
                <span class="text-[#64748B] text-[10px] uppercase font-bold block">Night Shift</span>
                <span class="font-bold text-[#1E293B] text-xs">${report.nightTotal} Tests</span>
              </div>
              <div>
                <span class="text-[#64748B] text-[10px] uppercase font-bold block">Total Tests</span>
                <span class="font-bold text-[#006C7A] text-xs">${report.totalReports} Samples</span>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto rounded-xl border border-[#CBD5E1]">
            <table class="w-full text-left text-xs">
              <thead class="bg-[#F8FAFC] border-b border-[#CBD5E1] text-[11px] font-bold text-[#475569] uppercase">
                <tr>
                  <th class="py-2.5 px-3">Lot No</th>
                  <th class="py-2.5 px-3">Sample Type</th>
                  <th class="py-2.5 px-3">Shift</th>
                  <th class="py-2.5 px-3">Count</th>
                  <th class="py-2.5 px-3">Qty (Kg)</th>
                  <th class="py-2.5 px-3">AOZ</th>
                  <th class="py-2.5 px-3">SEM</th>
                  <th class="py-2.5 px-3">CAP</th>
                  <th class="py-2.5 px-3">Result</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9]">
                ${lines.length > 0 ? lines.map(l => `
                  <tr class="hover:bg-[#F8FAFC]">
                    <td class="py-2 px-3 font-bold text-[#1E293B]">${l.lotNo}</td>
                    <td class="py-2 px-3 text-[#334155]">${l.sampleType}</td>
                    <td class="py-2 px-3 font-semibold text-[#1E293B]">${l.shift}</td>
                    <td class="py-2 px-3 font-medium text-[#1E293B]">${Number(l.count).toFixed(2)}</td>
                    <td class="py-2 px-3 font-medium text-[#1E293B]">${Number(l.quantity).toFixed(2)}</td>
                    <td class="py-2 px-3 font-mono text-[11px] text-[#334155]">${l.aoz}</td>
                    <td class="py-2 px-3 font-mono text-[11px] text-[#334155]">${l.sem}</td>
                    <td class="py-2 px-3 font-mono text-[11px] text-[#334155]">${l.cap}</td>
                    <td class="py-2 px-3">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${l.result.includes('Positive') ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}">
                        ${l.result}
                      </span>
                    </td>
                  </tr>
                `).join('') : `
                  <tr>
                    <td colspan="9" class="py-6 text-center text-[#94A3B8]">All samples in this batch passed rapid standard screen.</td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Close',
          type: 'secondary',
          onClick: (modal) => modal.close()
        },
        {
          label: 'Print Batch Certificate',
          type: 'primary',
          onClick: (modal) => {
            window.print();
          }
        }
      ]
    });
  },

  renderCreateDailyABReport(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <!-- Top Navigation & Action Header -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <div class="flex items-center gap-1.5 text-xs text-[#64748B] mb-1">
              <span>Lab</span>
              <span>&bull;</span>
              <button type="button" onclick="QCView.closeCreateDailyABReport()" class="hover:text-[#02a8b5] font-medium cursor-pointer">AB Report</button>
              <span>&bull;</span>
              <span class="text-[#02a8b5] font-bold">Daily Lab AB Report</span>
            </div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">DAILY LAB AB REPORT</h2>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="QCView.closeCreateDailyABReport()" class="px-4 py-2 border border-[#CBD5E1] bg-white hover:bg-slate-50 text-[#64748B] text-xs font-bold rounded-lg transition-all cursor-pointer">
              Cancel
            </button>
            <button type="button" onclick="document.getElementById('daily-ab-report-form').requestSubmit()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Save Report</span>
            </button>
          </div>
        </div>

        <!-- Form Card in Camaroo Preprocessing Style -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-4 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SAMPLE REGISTRATION &amp; TEST METRICS</h3>
          </div>

          <form id="daily-ab-report-form" class="space-y-4" onsubmit="event.preventDefault(); QCView.handleDailyABSubmit();">
            <!-- Row 1: LOT NO, ANALYSIS DATE, REPORT DATE, SAMPLE TYPE -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">LOT NO <span class="text-rose-500">*</span></label>
                <select id="form-ab-lot" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select Lot</option>
                  <option value="BLS/2627/0143">BLS/2627/0143 (Balsore - 400 Kg)</option>
                  <option value="NLR/2627/0256">NLR/2627/0256 (Nellore - 40000 Kg)</option>
                  <option value="AVN/2627/1234">AVN/2627/1234 (Annavaram - 50 Kg)</option>
                  <option value="ADP/2627/0019">ADP/2627/0019 (Amalapuram - 500 Kg)</option>
                  <option value="ADP/2627/0020">ADP/2627/0020 (Amalapuram - 150 Kg)</option>
                  <option value="ADP/2627/0021">ADP/2627/0021 (Amalapuram - 350 Kg)</option>
                  <option value="AVN/2627/1235">AVN/2627/1235 (Annavaram - 150 Kg)</option>
                  <option value="BLS/2627/0145">BLS/2627/0145 (Balsore - 15 Kg)</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ANALYSIS DATE <span class="text-rose-500">*</span></label>
                <input type="text" id="form-ab-analysis-date" value="26/10/2026" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>

              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REPORT DATE <span class="text-rose-500">*</span></label>
                <input type="text" id="form-ab-report-date" value="27/10/2026" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>

              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SAMPLE TYPE</label>
                <select id="form-ab-sample-type" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="Harvest" selected>Harvest</option>
                  <option value="Pre-Harvest">Pre-Harvest</option>
                  <option value="Plant Receiving">Plant Receiving</option>
                  <option value="Finished Goods">Finished Goods</option>
                  <option value="Water">Water</option>
                  <option value="Ice">Ice</option>
                </select>
              </div>
            </div>

            <!-- Row 2: SAMPLE DETAILS, COUNT, QUANTITY, PARAMETER -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SAMPLE DETAILS</label>
                <input type="text" id="form-ab-sample-details" placeholder="Enter Sample Details" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">COUNT</label>
                <input type="number" step="0.01" id="form-ab-count" placeholder="Enter Count" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">QUANTITY (KG)</label>
                <input type="number" step="0.01" id="form-ab-quantity" placeholder="Enter Quantity" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PARAMETER</label>
                <select id="form-ab-parameter" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="NA" selected>NA</option>
                  <option value="Rapid ELISA">Rapid ELISA</option>
                  <option value="LC-MS/MS">LC-MS/MS</option>
                  <option value="Rapid Strip">Rapid Strip</option>
                </select>
              </div>
            </div>

            <!-- Row 3: LOADING STATUS, SHIFT, TESTED BY, VERIFIED BY -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">LOADING STATUS</label>
                <select id="form-ab-loading-status" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="Loaded" selected>Loaded</option>
                  <option value="Pending">Pending</option>
                  <option value="Direct To Plant">Direct To Plant</option>
                  <option value="Hold">Hold</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SHIFT</label>
                <select id="form-ab-shift" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="DAY" selected>DAY</option>
                  <option value="NIGHT">NIGHT</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TESTED BY</label>
                <select id="form-ab-tested-by" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="CH.SWATHI PADMA" selected>CH.SWATHI PADMA</option>
                  <option value="Dr. Rajesh K. Varma">Dr. Rajesh K. Varma</option>
                  <option value="K. Srinivas">K. Srinivas</option>
                  <option value="M. S. Prasad">M. S. Prasad</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">VERIFIED BY</label>
                <select id="form-ab-verified-by" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="CH.SWATHI PADMA" selected>CH.SWATHI PADMA</option>
                  <option value="Dr. Rajesh K. Varma">Dr. Rajesh K. Varma</option>
                  <option value="Dr. Y.S. Prasad">Dr. Y.S. Prasad</option>
                  <option value="Plant QC Head">Plant QC Head</option>
                </select>
              </div>
            </div>

            <!-- Row 4: PLANT, SULPHITE, REMARKS -->
            <div class="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div class="sm:col-span-3">
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT</label>
                <select id="form-ab-plant" class="w-full px-3 py-2 bg-slate-50 border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none">
                  <option value="DEVI FISHERIES LIMITED (UNIT-5)" selected>DEVI FISHERIES LIMITED (UNIT-5)</option>
                </select>
              </div>

              <div class="sm:col-span-3">
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SULPHITE (PPM)</label>
                <input type="text" id="form-ab-sulphite" placeholder="Enter Sulphite Quantity" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>

              <div class="sm:col-span-6">
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REMARKS</label>
                <input type="text" id="form-ab-remarks" placeholder="Enter Remarks" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Row 5: Antibiotic Residue Parameters -->
            <div class="pt-3 border-t border-[#F1F5F9]">
              <div class="text-[11px] font-bold text-[#006C7A] uppercase tracking-wider mb-2.5">
                ANTIBIOTIC RESIDUE SCREENING (PPB / RESULT)
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">AOZ</label>
                  <input type="text" id="form-ab-aoz" placeholder="e.g. ND (<0.1)" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SEM</label>
                  <input type="text" id="form-ab-sem" placeholder="e.g. ND (<0.1)" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CAP</label>
                  <input type="text" id="form-ab-cap" placeholder="e.g. ND (<0.1)" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">AHD</label>
                  <input type="text" id="form-ab-ahd" placeholder="e.g. ND (<0.1)" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">AMOZ</label>
                  <input type="text" id="form-ab-amoz" placeholder="e.g. ND (<0.1)" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">RESULT</label>
                  <input type="text" id="form-ab-result" placeholder="e.g. Negative (Pass)" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="pt-4 flex items-center justify-end gap-2 border-t border-[#F1F5F9]">
              <button type="button" onclick="QCView.closeCreateDailyABReport()" class="px-5 py-2 border border-[#CBD5E1] bg-white hover:bg-slate-50 text-[#64748B] text-xs font-bold rounded-lg transition-all cursor-pointer">
                Close
              </button>
              <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>Submit Daily Report</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  handleDailyABSubmit() {
    const lotNo = document.getElementById('form-ab-lot')?.value;
    if (!lotNo) {
      alert('Please select a Lot No.');
      return;
    }

    const analysisDate = document.getElementById('form-ab-analysis-date')?.value || '26/10/2026';
    const reportDate = document.getElementById('form-ab-report-date')?.value || '27/10/2026';
    const sampleType = document.getElementById('form-ab-sample-type')?.value || 'Harvest';
    const sampleDetails = document.getElementById('form-ab-sample-details')?.value || '';
    const count = parseFloat(document.getElementById('form-ab-count')?.value || '0');
    const quantity = parseFloat(document.getElementById('form-ab-quantity')?.value || '0');
    const parameter = document.getElementById('form-ab-parameter')?.value || 'NA';
    const loadingStatus = document.getElementById('form-ab-loading-status')?.value || 'Loaded';
    const shift = document.getElementById('form-ab-shift')?.value || 'DAY';
    const testedBy = document.getElementById('form-ab-tested-by')?.value || 'CH.SWATHI PADMA';
    const verifiedBy = document.getElementById('form-ab-verified-by')?.value || 'CH.SWATHI PADMA';
    const plant = document.getElementById('form-ab-plant')?.value || 'DEVI FISHERIES LIMITED (UNIT-5)';
    const sulphite = document.getElementById('form-ab-sulphite')?.value || '';
    const remarks = document.getElementById('form-ab-remarks')?.value || '';
    const aoz = document.getElementById('form-ab-aoz')?.value || 'ND (<0.1)';
    const sem = document.getElementById('form-ab-sem')?.value || 'ND (<0.1)';
    const cap = document.getElementById('form-ab-cap')?.value || 'ND (<0.1)';
    const ahd = document.getElementById('form-ab-ahd')?.value || 'ND (<0.1)';
    const amoz = document.getElementById('form-ab-amoz')?.value || 'ND (<0.1)';
    const result = document.getElementById('form-ab-result')?.value || 'Negative (Pass)';

    const dateParts = analysisDate.split('/');
    const dateKey = dateParts.length === 3 ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}` : '2026-10-26';
    const reportId = `AB-${dateKey}`;

    this.abTestLines.unshift({
      id: `TL-${Date.now()}`,
      reportId,
      lotNo,
      analysisDate,
      reportDate,
      sampleType,
      sampleDetails,
      count,
      quantity,
      parameter,
      loadingStatus,
      shift,
      testedBy,
      verifiedBy,
      plant,
      sulphite,
      remarks,
      aoz,
      sem,
      cap,
      ahd,
      amoz,
      result
    });

    const existing = this.abReportsData.find(r => r.reportId === reportId);
    if (existing) {
      existing.totalReports += 1;
      if (shift === 'DAY') existing.dayTotal += 1;
      else existing.nightTotal += 1;
    } else {
      this.abReportsData.unshift({
        reportId,
        analysisDate,
        reportDate,
        totalReports: 1,
        dayTotal: shift === 'DAY' ? 1 : 0,
        nightTotal: shift === 'NIGHT' ? 1 : 0,
        plant,
        status: 'Submitted'
      });
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Daily Lab AB Report submitted successfully for Lot ${lotNo}!`, 'success');
    } else {
      alert(`Daily Lab AB Report submitted successfully for Lot ${lotNo}!`);
    }

    this.closeCreateDailyABReport();
  }
"""

def update_file(path):
    print(f"Reworking {path} to Devi Fisheries Camaroo Design System...")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find the starting point of lotsStationFilter in QCView
    start_marker = "  // LotsList Filter & Sorting State"
    # Find the end of QCView
    # In both files, QCView ends before `\n};\n\nif (typeof window !== 'undefined') { window.QCView = QCView; }`
    end_marker = "\n};\n\nif (typeof window !== 'undefined') { window.QCView = QCView; }"

    idx_start = content.find(start_marker)
    if idx_start == -1:
        print(f"  ⚠ start_marker not found in {path}")
        return

    idx_end = content.find(end_marker, idx_start)
    if idx_end == -1:
        # Check alternative ending without extra newline
        end_marker = "\n};\nif (typeof window !== 'undefined') { window.QCView = QCView; }"
        idx_end = content.find(end_marker, idx_start)
        if idx_end == -1:
            print(f"  ⚠ end_marker not found in {path}")
            return

    new_content = content[:idx_start] + new_lots_and_ab_code + content[idx_end:]

    with open(path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"  ✓ Successfully reworked {path}!\n")

def main():
    update_file("miledeep-devi-fisheries.html")
    update_file("standalone.html")
    update_file("js/views/qcView.js")

if __name__ == "__main__":
    main()
