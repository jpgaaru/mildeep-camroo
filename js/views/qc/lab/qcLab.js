// Quality Control — QC Lab Submodule
export const qcLab = {
  // 1. LOTS LIST
  // ==========================================
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
      { id: '153944', lot: 'KKD/2627/0312', rmDate: '07-10-2026', type: 'Site Weightment', grader: 'S. RAMA RAO', agent: 'SRI KRISHNA FISHERIES', count: 650.00, weight: 850.00, abStatus: 'NEGATIVE', station: 'Kakinada (KKD)', testDetails: { method: 'LC-MS/MS & Rapid ELISA', collectedBy: 'K. Varma', lab: 'Kakinada Quality Center', testTime: '07-10-2026 09:10 AM', antibiotics: 'All Tested Antibiotics Below Detection Limit (<0.1 ppb)', statusBadge: 'negative' } }
    ];
  },

  renderLotsList(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">LOTS LIST REGISTER</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Lab Operations &bull; Raw Material Incoming Lots &amp; Testing Status</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="lots-btn-export" class="px-3.5 py-2 bg-white hover:bg-slate-50 text-[#1E293B] border border-[#CBD5E1] text-xs font-bold rounded-lg shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="lots-filter-form" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">MONTH</label>
                <select id="lots-month-select" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => `<option value="${m}" ${this.lotsMonthFilter === m ? 'selected' : ''}>${m}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="lots-year-select" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['2027', '2026', '2025', '2024', '2023', '2022'].map(y => `<option value="${y}" ${this.lotsYearFilter === y ? 'selected' : ''}>${y}</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="button" id="lots-btn-reset" class="px-4 py-2 bg-white hover:bg-slate-50 text-[#64748B] text-xs font-bold rounded-lg border border-[#CBD5E1] transition-all cursor-pointer">Reset</button>
              <button type="button" id="lots-btn-search" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input type="text" id="lots-search-input" placeholder="Search by Lot No, Grader, Agent, ID..." value="${this.lotsSearchQuery}" class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all"/>
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <div class="flex items-center gap-2">
              <span id="lots-row-count-badge" class="text-xs font-semibold text-[#64748B]"></span>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('id')"><div class="flex items-center gap-1.5"><span>ID</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('lot')"><div class="flex items-center gap-1.5"><span>LOT</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('rmDate')"><div class="flex items-center gap-1.5"><span>Rm Date</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('type')"><div class="flex items-center gap-1.5"><span>Type</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('grader')"><div class="flex items-center gap-1.5"><span>Grader</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('agent')"><div class="flex items-center gap-1.5"><span>Agent</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-right cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('count')"><div class="flex items-center justify-end gap-1.5"><span>Count</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-right cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('weight')"><div class="flex items-center justify-end gap-1.5"><span>Weight</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-center cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('abStatus')"><div class="flex items-center justify-center gap-1.5"><span>AB Status</span><span class="text-slate-400">⇅</span></div></th>
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
    document.getElementById('lots-station-select')?.addEventListener('change', (e) => { this.lotsStationFilter = e.target.value; });
    document.getElementById('lots-month-select')?.addEventListener('change', (e) => { this.lotsMonthFilter = e.target.value; });
    document.getElementById('lots-year-select')?.addEventListener('change', (e) => { this.lotsYearFilter = e.target.value; });
    document.getElementById('lots-btn-reset')?.addEventListener('click', () => {
      this.lotsStationFilter = 'All Purchase Station';
      this.lotsMonthFilter = 'October';
      this.lotsYearFilter = '2026';
      this.lotsSearchQuery = '';
      const st = document.getElementById('lots-station-select'); if (st) st.value = 'All Purchase Station';
      const m = document.getElementById('lots-month-select'); if (m) m.value = 'October';
      const y = document.getElementById('lots-year-select'); if (y) y.value = '2026';
      const s = document.getElementById('lots-search-input'); if (s) s.value = '';
      this.renderLotsTableRows();
    });
    document.getElementById('lots-btn-search')?.addEventListener('click', () => { this.renderLotsTableRows(); });
    document.getElementById('lots-search-input')?.addEventListener('input', (e) => {
      this.lotsSearchQuery = e.target.value.trim();
      this.renderLotsTableRows();
    });
    document.getElementById('lots-btn-export')?.addEventListener('click', () => {
      const data = this.getLotsData();
      const headers = ["ID", "LOT", "Rm Date", "Type", "Grader", "Agent", "Count", "Weight", "AB Status", "Station"];
      const rows = data.map(l => [l.id, l.lot, l.rmDate, l.type, l.grader, l.agent, l.count, l.weight, l.abStatus, l.station]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.map(v => `"${v}"`).join(','))].join('\n');
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
    if (this.lotsSortField === field) { this.lotsSortAsc = !this.lotsSortAsc; }
    else { this.lotsSortField = field; this.lotsSortAsc = true; }
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
      rows = rows.filter(r => r.id.toLowerCase().includes(q) || r.lot.toLowerCase().includes(q) || r.rmDate.toLowerCase().includes(q) || r.type.toLowerCase().includes(q) || r.grader.toLowerCase().includes(q) || r.agent.toLowerCase().includes(q) || r.abStatus.toLowerCase().includes(q));
    }
    rows.sort((a, b) => {
      let va = a[this.lotsSortField]; let vb = b[this.lotsSortField];
      if (typeof va === 'number' && typeof vb === 'number') return this.lotsSortAsc ? va - vb : vb - va;
      va = (va || '').toString().toLowerCase(); vb = (vb || '').toString().toLowerCase();
      return this.lotsSortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
    });

    const badgeEl = document.getElementById('lots-row-count-badge');
    if (badgeEl) badgeEl.textContent = `Showing ${rows.length} lots`;

    if (rows.length === 0) {
      tbody.innerHTML = `<tr><td colspan="10" class="py-12 text-center text-[#94A3B8]">No matching Lots found for the selected station and criteria.</td></tr>`;
      return;
    }

    tbody.innerHTML = rows.map((lot, idx) => {
      let statusBadgeClass = 'bg-[#006C7A]/10 text-[#006C7A] border border-[#00A4B7]/30';
      if (lot.abStatus === 'POSITIVE') statusBadgeClass = 'bg-rose-50 text-rose-700 border border-rose-200';
      else if (lot.abStatus === 'NEGATIVE') statusBadgeClass = 'bg-emerald-50 text-emerald-700 border border-emerald-200';

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
            <button type="button" onclick="QCView.openLotDetailModal('${lot.id}')" class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center" title="View Lot & Lab Details">
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
      size: '3xl',
      content: `
        <div class="space-y-4 text-xs text-[#1E293B]">
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
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-4 bg-white border border-[#CBD5E1] rounded-xl space-y-2.5">
              <div class="text-[11px] font-bold uppercase tracking-wider text-[#006C7A] pb-1 border-b border-[#F1F5F9]">Purchase & Receiving Details</div>
              <div class="flex justify-between py-1 border-b border-slate-50"><span class="text-[#64748B]">RM Receiving Date:</span><span class="font-semibold text-[#1E293B]">${lot.rmDate}</span></div>
              <div class="flex justify-between py-1 border-b border-slate-50"><span class="text-[#64748B]">Weighment Station:</span><span class="font-semibold text-[#1E293B]">${lot.station}</span></div>
              <div class="flex justify-between py-1 border-b border-slate-50"><span class="text-[#64748B]">Purchase Type:</span><span class="font-semibold text-[#1E293B]">${lot.type}</span></div>
              <div class="flex justify-between py-1 border-b border-slate-50"><span class="text-[#64748B]">Grader Name:</span><span class="font-semibold text-[#1E293B]">${lot.grader}</span></div>
              <div class="flex justify-between py-1"><span class="text-[#64748B]">Agent / Farmer:</span><span class="font-semibold text-[#1E293B]">${lot.agent}</span></div>
            </div>
            <div class="p-4 bg-white border border-[#CBD5E1] rounded-xl space-y-2.5">
              <div class="text-[11px] font-bold uppercase tracking-wider text-[#006C7A] pb-1 border-b border-[#F1F5F9]">Quantity & Lab Testing Protocol</div>
              <div class="flex justify-between py-1 border-b border-slate-50"><span class="text-[#64748B]">Pcs / Count:</span><span class="font-bold text-[#1E293B]">${Number(lot.count).toFixed(2)}</span></div>
              <div class="flex justify-between py-1 border-b border-slate-50"><span class="text-[#64748B]">Total Weight:</span><span class="font-bold text-[#1E293B]">${Number(lot.weight).toFixed(2)} Kg</span></div>
              <div class="flex justify-between py-1 border-b border-slate-50"><span class="text-[#64748B]">Testing Method:</span><span class="font-semibold text-[#1E293B]">${lot.testDetails.method}</span></div>
              <div class="flex justify-between py-1 border-b border-slate-50"><span class="text-[#64748B]">Lab & Technician:</span><span class="font-semibold text-[#1E293B]">${lot.testDetails.lab} (${lot.testDetails.collectedBy})</span></div>
              <div class="flex justify-between py-1"><span class="text-[#64748B]">Sampling Timestamp:</span><span class="font-semibold text-[#1E293B]">${lot.testDetails.testTime}</span></div>
            </div>
          </div>
          <div class="p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl">
            <div class="text-[11px] font-bold uppercase tracking-wider text-[#006C7A] mb-1.5">Antibiotic Residue Screening Summary</div>
            <p class="text-xs text-[#334155] leading-relaxed">${lot.testDetails.antibiotics}. Testing conducted strictly according to MPEDA & EIC export standards.</p>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Close', type: 'secondary', onClick: (modal) => modal.close() },
        { label: 'Print Certificate', type: 'primary', onClick: () => window.print() }
      ]
    });
  },

  // ==========================================
  // 2. ANTIBIOTIC (AB) REPORT (WITH POPUP MODAL)
  // ==========================================
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
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">ANTIBIOTIC REPORTS LIST</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Lab Operations &bull; Daily Antibiotic (AB) Testing Register</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="ab-btn-create-report" onclick="QCView.openDailyABModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Report</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="ab-filter-form" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="ab-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['2026', '2025', '2024', '2023', '2022'].map(y => `<option value="${y}" ${this.abSelectedYear === y ? 'selected' : ''}>${y}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">MONTH</label>
                <select id="ab-filter-month" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => `<option value="${m}" ${this.abSelectedMonth === m ? 'selected' : ''}>${m}</option>`).join('')}
                </select>
              </div>
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
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="button" id="ab-btn-reset" class="px-4 py-2 bg-white hover:bg-slate-50 text-[#64748B] text-xs font-bold rounded-lg border border-[#CBD5E1] transition-all cursor-pointer">Reset</button>
              <button type="button" id="ab-btn-search" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input type="text" id="ab-search-input" placeholder="Search by Report ID, date, plant..." value="${this.abSearchQuery}" class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all"/>
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
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortABReports('reportId')"><div class="flex items-center gap-1.5"><span>Report ID</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortABReports('analysisDate')"><div class="flex items-center gap-1.5"><span>Analysis Date</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortABReports('reportDate')"><div class="flex items-center gap-1.5"><span>Report Date</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-right cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortABReports('totalReports')"><div class="flex items-center justify-end gap-1.5"><span>Total Reports</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-right cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortABReports('dayTotal')"><div class="flex items-center justify-end gap-1.5"><span>Day Total</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-right cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortABReports('nightTotal')"><div class="flex items-center justify-end gap-1.5"><span>Night Total</span><span class="text-slate-400">⇅</span></div></th>
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
    document.getElementById('ab-filter-year')?.addEventListener('change', (e) => { this.abSelectedYear = e.target.value; });
    document.getElementById('ab-filter-month')?.addEventListener('change', (e) => { this.abSelectedMonth = e.target.value; });
    document.getElementById('ab-filter-plant')?.addEventListener('change', (e) => { this.abSelectedPlant = e.target.value; });
    document.getElementById('ab-btn-reset')?.addEventListener('click', () => {
      this.abSelectedYear = '2026'; this.abSelectedMonth = 'October'; this.abSelectedPlant = 'DEVI FISHERIES LIMITED (UNIT-5)'; this.abSearchQuery = '';
      const y = document.getElementById('ab-filter-year'); if (y) y.value = '2026';
      const m = document.getElementById('ab-filter-month'); if (m) m.value = 'October';
      const p = document.getElementById('ab-filter-plant'); if (p) p.value = 'DEVI FISHERIES LIMITED (UNIT-5)';
      const s = document.getElementById('ab-search-input'); if (s) s.value = '';
      this.renderABTableRows();
    });
    document.getElementById('ab-btn-search')?.addEventListener('click', () => { this.renderABTableRows(); });
    document.getElementById('ab-search-input')?.addEventListener('input', (e) => {
      this.abSearchQuery = e.target.value.trim();
      this.renderABTableRows();
    });
    document.getElementById('ab-btn-export-csv')?.addEventListener('click', () => {
      const headers = ["Report ID", "Analysis Date", "Report Date", "Total Reports", "Day Total", "Night Total", "Plant"];
      const rows = this.abReportsData.map(r => [r.reportId, r.analysisDate, r.reportDate, r.totalReports, r.dayTotal, r.nightTotal, r.plant]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.map(v => `"${v}"`).join(','))].join('\n');
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
    if (this.abSortField === field) { this.abSortAsc = !this.abSortAsc; }
    else { this.abSortField = field; this.abSortAsc = true; }
    this.renderABTableRows();
  },

  renderABTableRows() {
    const tbody = document.getElementById('ab-reports-tbody');
    if (!tbody) return;
    let rows = [...this.abReportsData];
    if (this.abSearchQuery) {
      const q = this.abSearchQuery.toLowerCase();
      rows = rows.filter(r => r.reportId.toLowerCase().includes(q) || r.analysisDate.toLowerCase().includes(q) || r.reportDate.toLowerCase().includes(q) || r.plant.toLowerCase().includes(q));
    }
    rows.sort((a, b) => {
      let va = a[this.abSortField]; let vb = b[this.abSortField];
      if (typeof va === 'number' && typeof vb === 'number') return this.abSortAsc ? va - vb : vb - va;
      va = (va || '').toString().toLowerCase(); vb = (vb || '').toString().toLowerCase();
      return this.abSortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
    });

    const badgeEl = document.getElementById('ab-row-count-badge');
    if (badgeEl) badgeEl.textContent = `Showing ${rows.length} reports`;

    if (rows.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="py-12 text-center text-[#94A3B8]">No data available in table</td></tr>`;
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
            <button type="button" onclick="QCView.openABReportDetailModal('${r.reportId}')" class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center" title="View Daily Breakdown">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  // Open Daily AB Report Modal Popup
  openDailyABModal() {
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: 'DAILY LAB AB REPORT',
      size: '6xl',
      content: `
        <div class="space-y-4 text-xs text-[#1E293B]">
          <form id="modal-daily-ab-form" class="space-y-4" onsubmit="event.preventDefault(); QCView.handleModalDailyABSubmit();">
            <!-- Row 1: Lot No, Analysis Date, Report Date, Sample Type -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">LOT NO <span class="text-rose-500">*</span></label>
                <select id="modal-ab-lot" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
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
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">ANALYSIS DATE <span class="text-rose-500">*</span></label>
                <div class="erp-date-wrapper">
                  <input type="text" readonly inputmode="none" id="modal-ab-analysis-date" value="2026-10-26" data-calendar="true" required class="erp-date-input w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] cursor-pointer">
                </div>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">REPORT DATE <span class="text-rose-500">*</span></label>
                <div class="erp-date-wrapper">
                  <input type="text" readonly inputmode="none" id="modal-ab-report-date" value="2026-10-27" data-calendar="true" required class="erp-date-input w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] cursor-pointer">
                </div>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">SAMPLE TYPE</label>
                <select id="modal-ab-sample-type" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
                  <option value="Harvest" selected>Harvest</option>
                  <option value="Pre-Harvest">Pre-Harvest</option>
                  <option value="Plant Receiving">Plant Receiving</option>
                  <option value="Finished Goods">Finished Goods</option>
                </select>
              </div>
            </div>

            <!-- Row 2: Sample Details, Count, Quantity, Parameter -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">SAMPLE DETAILS</label>
                <input type="text" id="modal-ab-sample-details" placeholder="Enter Sample Details" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">COUNT</label>
                <input type="number" step="0.01" id="modal-ab-count" placeholder="Enter Count" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">QUANTITY (KG)</label>
                <input type="number" step="0.01" id="modal-ab-quantity" placeholder="Enter Quantity" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">PARAMETER</label>
                <select id="modal-ab-parameter" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
                  <option value="NA" selected>NA</option>
                  <option value="Rapid ELISA">Rapid ELISA</option>
                  <option value="LC-MS/MS">LC-MS/MS</option>
                </select>
              </div>
            </div>

            <!-- Row 3: Loading Status, Shift, Tested By, Verified By -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">LOADING STATUS</label>
                <select id="modal-ab-loading-status" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
                  <option value="Loaded" selected>Loaded</option>
                  <option value="Pending">Pending</option>
                  <option value="Direct To Plant">Direct To Plant</option>
                  <option value="Hold">Hold</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">SHIFT</label>
                <select id="modal-ab-shift" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
                  <option value="DAY" selected>DAY</option>
                  <option value="NIGHT">NIGHT</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">TESTED BY</label>
                <select id="modal-ab-tested-by" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
                  <option value="CH.SWATHI PADMA" selected>CH.SWATHI PADMA</option>
                  <option value="Dr. Rajesh K. Varma">Dr. Rajesh K. Varma</option>
                  <option value="K. Srinivas">K. Srinivas</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">VERIFIED BY</label>
                <select id="modal-ab-verified-by" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
                  <option value="CH.SWATHI PADMA" selected>CH.SWATHI PADMA</option>
                  <option value="Dr. Rajesh K. Varma">Dr. Rajesh K. Varma</option>
                  <option value="Dr. Y.S. Prasad">Dr. Y.S. Prasad</option>
                </select>
              </div>
            </div>

            <!-- Row 4: Plant, Sulphite, Remarks -->
            <div class="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div class="sm:col-span-3">
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">PLANT</label>
                <select id="modal-ab-plant" class="w-full px-3 py-2 bg-slate-50 border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none">
                  <option value="DEVI FISHERIES LIMITED (UNIT-5)" selected>DEVI FISHERIES LIMITED (UNIT-5)</option>
                </select>
              </div>
              <div class="sm:col-span-3">
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">SULPHITE (PPM)</label>
                <input type="text" id="modal-ab-sulphite" placeholder="Enter Sulphite Quantity" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
              </div>
              <div class="sm:col-span-6">
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">REMARKS</label>
                <input type="text" id="modal-ab-remarks" placeholder="Enter Remarks" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
              </div>
            </div>

            <!-- Row 5: Antibiotic Parameters -->
            <div class="pt-2 border-t border-[#F1F5F9]">
              <div class="text-[11px] font-bold text-[#006C7A] uppercase tracking-wider mb-2">ANTIBIOTIC RESIDUE SCREENING (PPB / RESULT)</div>
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                <div><label class="block text-[10px] font-bold text-[#334155] uppercase mb-1">AOZ</label><input type="text" id="modal-ab-aoz" placeholder="ND (<0.1)" class="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded text-xs"></div>
                <div><label class="block text-[10px] font-bold text-[#334155] uppercase mb-1">SEM</label><input type="text" id="modal-ab-sem" placeholder="ND (<0.1)" class="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded text-xs"></div>
                <div><label class="block text-[10px] font-bold text-[#334155] uppercase mb-1">CAP</label><input type="text" id="modal-ab-cap" placeholder="ND (<0.1)" class="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded text-xs"></div>
                <div><label class="block text-[10px] font-bold text-[#334155] uppercase mb-1">AHD</label><input type="text" id="modal-ab-ahd" placeholder="ND (<0.1)" class="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded text-xs"></div>
                <div><label class="block text-[10px] font-bold text-[#334155] uppercase mb-1">AMOZ</label><input type="text" id="modal-ab-amoz" placeholder="ND (<0.1)" class="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded text-xs"></div>
                <div><label class="block text-[10px] font-bold text-[#334155] uppercase mb-1">RESULT</label><input type="text" id="modal-ab-result" placeholder="Negative" class="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded text-xs"></div>
              </div>
            </div>
          </form>
        </div>
      `,
      footerButtons: [
        { label: 'Close', type: 'secondary', onClick: (modal) => modal.close() },
        { label: 'Submit Daily Report', type: 'primary', onClick: () => QCView.handleModalDailyABSubmit() }
      ]
    });

    setTimeout(() => {
      if (typeof window !== 'undefined' && window.CamarooControls && typeof window.CamarooControls.upgrade === 'function') {
        window.CamarooControls.upgrade(document.getElementById('erp-modal-root'));
      }
    }, 20);
  },

  handleModalDailyABSubmit() {
    const lotNo = document.getElementById('modal-ab-lot')?.value;
    if (!lotNo) {
      alert('Please select a Lot No.');
      return;
    }
    let analysisDate = document.getElementById('modal-ab-analysis-date')?.value || '2026-10-26';
    let reportDate = document.getElementById('modal-ab-report-date')?.value || '2026-10-27';
    const sampleType = document.getElementById('modal-ab-sample-type')?.value || 'Harvest';
    const sampleDetails = document.getElementById('modal-ab-sample-details')?.value || '';
    const count = parseFloat(document.getElementById('modal-ab-count')?.value || '0');
    const quantity = parseFloat(document.getElementById('modal-ab-quantity')?.value || '0');
    const shift = document.getElementById('modal-ab-shift')?.value || 'DAY';
    const plant = document.getElementById('modal-ab-plant')?.value || 'DEVI FISHERIES LIMITED (UNIT-5)';

    let dateKey = '2026-10-26';
    if (analysisDate.includes('-')) {
      dateKey = analysisDate;
      const parts = analysisDate.split('-');
      analysisDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    } else if (analysisDate.includes('/')) {
      const parts = analysisDate.split('/');
      dateKey = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    if (reportDate.includes('-')) {
      const parts = reportDate.split('-');
      reportDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    const reportId = `AB-${dateKey}`;

    const existing = this.abReportsData.find(r => r.reportId === reportId);
    if (existing) {
      existing.totalReports += 1;
      if (shift === 'DAY') existing.dayTotal += 1; else existing.nightTotal += 1;
    } else {
      this.abReportsData.unshift({
        reportId, analysisDate, reportDate, totalReports: 1, dayTotal: shift === 'DAY' ? 1 : 0, nightTotal: shift === 'NIGHT' ? 1 : 0, plant, status: 'Submitted'
      });
    }

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal) ? window.Modal : null;
    if (m && m.close) m.close();

    this.renderABTableRows();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Daily Lab AB Report submitted for Lot ${lotNo}!`, 'success');
    }
  },

  openABReportDetailModal(reportId) {
    const report = this.abReportsData.find(r => r.reportId === reportId);
    if (!report) return;
    const lines = this.abTestLines.filter(l => l.reportId === reportId);
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;
    m.open({
      title: `DAILY ANTIBIOTIC TEST BREAKDOWN — ${report.reportId}`,
      size: '4xl',
      content: `
        <div class="space-y-4 text-xs text-[#1E293B]">
          <div class="flex items-center justify-between p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl">
            <div>
              <div class="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Daily Summary Batch</div>
              <div class="text-sm font-extrabold text-[#1E293B]">${report.reportId} • ${report.analysisDate}</div>
            </div>
            <div class="flex items-center gap-4 text-right">
              <div><span class="text-[#64748B] text-[10px] uppercase font-bold block">Day Shift</span><span class="font-bold text-[#1E293B] text-xs">${report.dayTotal} Tests</span></div>
              <div><span class="text-[#64748B] text-[10px] uppercase font-bold block">Night Shift</span><span class="font-bold text-[#1E293B] text-xs">${report.nightTotal} Tests</span></div>
              <div><span class="text-[#64748B] text-[10px] uppercase font-bold block">Total Tests</span><span class="font-bold text-[#006C7A] text-xs">${report.totalReports} Samples</span></div>
            </div>
          </div>
          <div class="overflow-x-auto rounded-xl border border-[#CBD5E1]">
            <table class="w-full text-left text-xs">
              <thead class="bg-[#F8FAFC] border-b border-[#CBD5E1] text-[11px] font-bold text-[#475569] uppercase">
                <tr>
                  <th class="py-2.5 px-3">Lot No</th><th class="py-2.5 px-3">Sample Type</th><th class="py-2.5 px-3">Shift</th><th class="py-2.5 px-3">Count</th><th class="py-2.5 px-3">Qty (Kg)</th><th class="py-2.5 px-3">AOZ</th><th class="py-2.5 px-3">SEM</th><th class="py-2.5 px-3">CAP</th><th class="py-2.5 px-3">Result</th>
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
                `).join('') : `<tr><td colspan="9" class="py-6 text-center text-[#94A3B8]">All samples in this batch passed rapid standard screen.</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Close', type: 'secondary', onClick: (modal) => modal.close() },
        { label: 'Print Batch Certificate', type: 'primary', onClick: () => window.print() }
      ]
    });
  },

  // ==========================================
  // 3. RM REPORT (RM ANALYSIS REPORTS)
  // ==========================================
  rmSelectedYear: '2026',
  rmSelectedMonth: 'October',
  rmSearchQuery: '',
  rmSortField: 'id',
  rmSortAsc: true,

  rmAnalysisData: [
    { id: '86111', lot: 'MKP/2425/1166', purchaseDate: '01-10-2026', rmDate: '02-10-2026 09:59:44', purchaseType: 'Site Weightment', count: 60.00, weight: 1027.00, abStatus: 'Test Pending', status: 'Report Pending', reason: '—' },
    { id: '86112', lot: 'MKP/2425/1166', purchaseDate: '01-10-2026', rmDate: '02-10-2026 10:00:03', purchaseType: 'Site Weightment', count: 70.00, weight: 4378.00, abStatus: 'Test Pending', status: 'Report Pending', reason: '—' },
    { id: '86113', lot: 'MKP/2425/1168', purchaseDate: '01-10-2026', rmDate: '02-10-2026 10:02:18', purchaseType: 'Site Weightment', count: 50.50, weight: 1176.00, abStatus: 'Test Pending', status: 'Report Pending', reason: '—' },
    { id: '86114', lot: 'MKP/2425/1168', purchaseDate: '01-10-2026', rmDate: '02-10-2026 10:02:37', purchaseType: 'Site Weightment', count: 62.00, weight: 775.00, abStatus: 'Test Pending', status: 'Report Pending', reason: '—' },
    { id: '86115', lot: 'MKP/2425/1168', purchaseDate: '01-10-2026', rmDate: '02-10-2026 10:03:31', purchaseType: 'Site Weightment', count: 65.50, weight: 776.00, abStatus: 'Test Pending', status: 'Report Pending', reason: '—' },
    { id: '86116', lot: 'BLS/2627/0143', purchaseDate: '01-10-2026', rmDate: '02-10-2026 11:15:00', purchaseType: 'Site Weightment', count: 400.00, weight: 400.00, abStatus: 'Negative', status: 'Approved', reason: 'Passed Organoleptic' },
    { id: '86117', lot: 'AVN/2627/1234', purchaseDate: '04-10-2026', rmDate: '04-10-2026 14:20:10', purchaseType: 'Site Weightment', count: 10.00, weight: 50.00, abStatus: 'Negative', status: 'Approved', reason: 'Passed Inspection' }
  ],

  renderRMReport(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">RM ANALYSIS REPORTS</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Lab Operations &bull; Raw Material Physical &amp; Defect Analysis</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="rm-btn-export" class="px-3.5 py-2 bg-white hover:bg-slate-50 text-[#1E293B] border border-[#CBD5E1] text-xs font-bold rounded-lg shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="rm-filter-form" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="rm-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['2026', '2025', '2024', '2023', '2022'].map(y => `<option value="${y}" ${this.rmSelectedYear === y ? 'selected' : ''}>${y}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">MONTH</label>
                <select id="rm-filter-month" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => `<option value="${m}" ${this.rmSelectedMonth === m ? 'selected' : ''}>${m}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">STATUS</label>
                <select id="rm-filter-status" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All" selected>All Statuses</option>
                  <option value="Report Pending">Report Pending</option>
                  <option value="Approved">Approved</option>
                </select>
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="button" id="rm-btn-reset" class="px-4 py-2 bg-white hover:bg-slate-50 text-[#64748B] text-xs font-bold rounded-lg border border-[#CBD5E1] transition-all cursor-pointer">Reset</button>
              <button type="button" id="rm-btn-search" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input type="text" id="rm-search-input" placeholder="Search by Lot Number, ID, Type..." value="${this.rmSearchQuery}" class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all"/>
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <div class="flex items-center gap-2">
              <span id="rm-row-count-badge" class="text-xs font-semibold text-[#64748B]"></span>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortRM('id')"><div class="flex items-center gap-1.5"><span>ID</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortRM('lot')"><div class="flex items-center gap-1.5"><span>Lot Number</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortRM('purchaseDate')"><div class="flex items-center gap-1.5"><span>Purchase Date</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortRM('rmDate')"><div class="flex items-center gap-1.5"><span>Rm Date</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortRM('purchaseType')"><div class="flex items-center gap-1.5"><span>Purchase Type</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-right cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortRM('count')"><div class="flex items-center justify-end gap-1.5"><span>Count</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-right cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortRM('weight')"><div class="flex items-center justify-end gap-1.5"><span>Weight(KGS)</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-center cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortRM('abStatus')"><div class="flex items-center justify-center gap-1.5"><span>AB Status</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-center cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortRM('status')"><div class="flex items-center justify-center gap-1.5"><span>Status</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4">Reason</th>
                  <th class="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="rm-table-tbody" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.bindRMEvents();
    this.renderRMTableRows();
  },

  bindRMEvents() {
    document.getElementById('rm-btn-reset')?.addEventListener('click', () => {
      this.rmSearchQuery = '';
      const s = document.getElementById('rm-search-input'); if (s) s.value = '';
      this.renderRMTableRows();
    });
    document.getElementById('rm-btn-search')?.addEventListener('click', () => { this.renderRMTableRows(); });
    document.getElementById('rm-search-input')?.addEventListener('input', (e) => {
      this.rmSearchQuery = e.target.value.trim();
      this.renderRMTableRows();
    });
    document.getElementById('rm-btn-export')?.addEventListener('click', () => {
      const headers = ["ID", "Lot Number", "Purchase Date", "RM Date", "Purchase Type", "Count", "Weight(KGS)", "AB Status", "Status", "Reason"];
      const rows = this.rmAnalysisData.map(r => [r.id, r.lot, r.purchaseDate, r.rmDate, r.purchaseType, r.count, r.weight, r.abStatus, r.status, r.reason]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.map(v => `"${v}"`).join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `RM_Analysis_Report_${this.rmSelectedMonth}_${this.rmSelectedYear}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  },

  sortRM(field) {
    if (this.rmSortField === field) { this.rmSortAsc = !this.rmSortAsc; }
    else { this.rmSortField = field; this.rmSortAsc = true; }
    this.renderRMTableRows();
  },

  renderRMTableRows() {
    const tbody = document.getElementById('rm-table-tbody');
    if (!tbody) return;
    let rows = [...this.rmAnalysisData];
    if (this.rmSearchQuery) {
      const q = this.rmSearchQuery.toLowerCase();
      rows = rows.filter(r => r.id.toLowerCase().includes(q) || r.lot.toLowerCase().includes(q) || r.purchaseType.toLowerCase().includes(q) || r.status.toLowerCase().includes(q));
    }
    rows.sort((a, b) => {
      let va = a[this.rmSortField]; let vb = b[this.rmSortField];
      if (typeof va === 'number' && typeof vb === 'number') return this.rmSortAsc ? va - vb : vb - va;
      va = (va || '').toString().toLowerCase(); vb = (vb || '').toString().toLowerCase();
      return this.rmSortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
    });

    const badgeEl = document.getElementById('rm-row-count-badge');
    if (badgeEl) badgeEl.textContent = `Showing ${rows.length} lots`;

    tbody.innerHTML = rows.map((r, idx) => {
      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors ${idx % 2 === 1 ? 'bg-slate-50/40' : ''}">
          <td class="py-3 px-4 font-bold text-[#1E293B]">${r.id}</td>
          <td class="py-3 px-4 font-bold text-[#006C7A]">${r.lot}</td>
          <td class="py-3 px-4 text-[#64748B] whitespace-nowrap">${r.purchaseDate}</td>
          <td class="py-3 px-4 text-[#64748B] whitespace-nowrap">${r.rmDate}</td>
          <td class="py-3 px-4 text-[#334155]">${r.purchaseType}</td>
          <td class="py-3 px-4 text-right font-medium text-[#1E293B]">${Number(r.count).toFixed(2)}</td>
          <td class="py-3 px-4 text-right font-medium text-[#1E293B]">${Number(r.weight).toFixed(2)}</td>
          <td class="py-3 px-4 text-center">
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">${r.abStatus}</span>
          </td>
          <td class="py-3 px-4 text-center">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${r.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}">${r.status}</span>
          </td>
          <td class="py-3 px-4 text-[#64748B]">${r.reason}</td>
          <td class="py-3 px-4 text-center">
            <button type="button" class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer" title="Record Analysis">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },


  // ==========================================
  // 4. MB REPORT (IN HOUSE MICROBIOLOGY)
  // ==========================================
  mbFromDate: '08/10/2026',
  mbToDate: '26/10/2026',
  mbSearchQuery: '',

  mbPOCatalog: [
    { poNo: 'PO-2026-US-8901', buyer: 'PACIFIC SEAFOODS CORP' },
    { poNo: 'PO-2026-EU-4412', buyer: 'EUROFISH N.V. (BELGIUM)' },
    { poNo: 'PO-2026-JP-1120', buyer: 'MARUHA NICHIRO CORP' },
    { poNo: 'PO-2026-US-8945', buyer: 'AQUASTAR USA' },
    { poNo: 'PO-2026-UK-3310', buyer: 'LYONS SEAFOODS UK' },
    { poNo: 'PO-2026-AE-7702', buyer: 'TRUEBELL MARKETING LLC' }
  ],

  mbParametersList: [
    'Total Plate Count (TPC)',
    'E. coli',
    'Coliforms',
    'Salmonella',
    'Vibrio cholerae',
    'Vibrio parahaemolyticus',
    'Staphylococcus aureus',
    'Listeria monocytogenes',
    'Yeast & Mould'
  ],

  mbDraftReport: {
    unitName: 'UNIT-1',
    analysedBy: 'CH.SWATHI PADMA',
    verifiedBy: 'CH.SWATHI PADMA',
    items: []
  },

  mbReportsData: [
    { 
      sNo: 1, 
      poNo: 'PO-2026-US-8901', 
      buyerName: 'PACIFIC SEAFOODS CORP', 
      unitName: 'UNIT-1',
      reportDate: '02/10/2026', 
      analyst: 'CH.SWATHI PADMA',
      verifiedBy: 'CH.SWATHI PADMA',
      tpc: '<100 CFU/g', 
      pathogen: 'Negative / Absent', 
      status: 'Compliant',
      items: [
        { sNo: 1, poNo: 'PO-2026-US-8901', buyerName: 'PACIFIC SEAFOODS CORP', parameter: 'Total Plate Count (TPC)', analysisDate: '02/10/2026', result: '<100 CFU/g' },
        { sNo: 2, poNo: 'PO-2026-US-8901', buyerName: 'PACIFIC SEAFOODS CORP', parameter: 'E. coli', analysisDate: '02/10/2026', result: 'Absent / 25g' },
        { sNo: 3, poNo: 'PO-2026-US-8901', buyerName: 'PACIFIC SEAFOODS CORP', parameter: 'Salmonella', analysisDate: '02/10/2026', result: 'Negative' }
      ]
    },
    { 
      sNo: 2, 
      poNo: 'PO-2026-EU-4412', 
      buyerName: 'EUROFISH N.V. (BELGIUM)', 
      unitName: 'UNIT-1',
      reportDate: '05/10/2026', 
      analyst: 'CH.SWATHI PADMA',
      verifiedBy: 'Dr. Rajesh K. Varma',
      tpc: '<50 CFU/g', 
      pathogen: 'Negative / Absent', 
      status: 'Compliant',
      items: [
        { sNo: 1, poNo: 'PO-2026-EU-4412', buyerName: 'EUROFISH N.V. (BELGIUM)', parameter: 'Total Plate Count (TPC)', analysisDate: '05/10/2026', result: '<50 CFU/g' },
        { sNo: 2, poNo: 'PO-2026-EU-4412', buyerName: 'EUROFISH N.V. (BELGIUM)', parameter: 'Vibrio cholerae', analysisDate: '05/10/2026', result: 'Absent / 25g' }
      ]
    },
    { 
      sNo: 3, 
      poNo: 'PO-2026-JP-1120', 
      buyerName: 'MARUHA NICHIRO CORP', 
      unitName: 'UNIT-2',
      reportDate: '08/10/2026', 
      analyst: 'K. Srinivas',
      verifiedBy: 'CH.SWATHI PADMA',
      tpc: '<200 CFU/g', 
      pathogen: 'Negative / Absent', 
      status: 'Compliant',
      items: [
        { sNo: 1, poNo: 'PO-2026-JP-1120', buyerName: 'MARUHA NICHIRO CORP', parameter: 'Total Plate Count (TPC)', analysisDate: '08/10/2026', result: '<200 CFU/g' },
        { sNo: 2, poNo: 'PO-2026-JP-1120', buyerName: 'MARUHA NICHIRO CORP', parameter: 'Coliforms', analysisDate: '08/10/2026', result: '< 3 MPN/g' }
      ]
    },
    { 
      sNo: 4, 
      poNo: 'PO-2026-US-8945', 
      buyerName: 'AQUASTAR USA', 
      unitName: 'UNIT-5',
      reportDate: '12/10/2026', 
      analyst: 'Dr. Rajesh K. Varma',
      verifiedBy: 'CH.SWATHI PADMA',
      tpc: '<150 CFU/g', 
      pathogen: 'Negative / Absent', 
      status: 'Compliant',
      items: [
        { sNo: 1, poNo: 'PO-2026-US-8945', buyerName: 'AQUASTAR USA', parameter: 'Total Plate Count (TPC)', analysisDate: '12/10/2026', result: '<150 CFU/g' },
        { sNo: 2, poNo: 'PO-2026-US-8945', buyerName: 'AQUASTAR USA', parameter: 'Listeria monocytogenes', analysisDate: '12/10/2026', result: 'Absent / 25g' }
      ]
    }
  ],

  renderMBReport(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">IN HOUSE MICROBIOLOGY LAB REPORTS</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Lab Operations &bull; Microbial Analysis (TPC, E. Coli, Salmonella, Vibrio)</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="mb-btn-create-report" onclick="QCView.openAddMBReportModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add MB Report</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT FROM DATE</label>
                <input type="text" id="mb-from-date" value="${this.mbFromDate}" data-calendar="true" class="erp-date-input w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all cursor-pointer">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT TO DATE</label>
                <input type="text" id="mb-to-date" value="${this.mbToDate}" data-calendar="true" class="erp-date-input w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all cursor-pointer">
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="button" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input type="text" id="mb-search-input" onkeyup="QCView.handleMBSearch(this.value)" placeholder="Search PO, Buyer, Date..." class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all"/>
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <span id="mb-records-counter" class="text-xs font-semibold text-[#64748B]">Showing ${this.mbReportsData.length} records</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4">S.NO</th>
                  <th class="py-3 px-4">PO No</th>
                  <th class="py-3 px-4">Buyer Name</th>
                  <th class="py-3 px-4">Report Date</th>
                  <th class="py-3 px-4">TPC</th>
                  <th class="py-3 px-4">Pathogens</th>
                  <th class="py-3 px-4 text-center">Status</th>
                  <th class="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="mb-report-table-body" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.renderMBReportTableRows();
  },

  renderMBReportTableRows(data) {
    const list = data || this.mbReportsData;
    const tbody = document.getElementById('mb-report-table-body');
    if (!tbody) return;

    const counter = document.getElementById('mb-records-counter');
    if (counter) counter.innerText = `Showing ${list.length} records`;

    tbody.innerHTML = list.map((r, i) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${i % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="QCView.openMBReportDetailModal(${r.sNo})">${r.poNo}</td>
        <td class="py-3 px-4 text-[#334155] font-medium">${r.buyerName}</td>
        <td class="py-3 px-4 text-[#64748B] whitespace-nowrap">${r.reportDate}</td>
        <td class="py-3 px-4 font-semibold text-[#1E293B]">${r.tpc}</td>
        <td class="py-3 px-4 font-medium text-[#334155]">${r.pathogen}</td>
        <td class="py-3 px-4 text-center">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${r.status}</span>
        </td>
        <td class="py-3 px-4 text-center">
          <button type="button" onclick="QCView.openMBReportDetailModal(${r.sNo})" class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center" title="View Lab Certificate">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  handleMBSearch(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.renderMBReportTableRows(this.mbReportsData);
      return;
    }
    const filtered = this.mbReportsData.filter(r => 
      r.poNo.toLowerCase().includes(q) ||
      r.buyerName.toLowerCase().includes(q) ||
      r.reportDate.toLowerCase().includes(q) ||
      (r.tpc && r.tpc.toLowerCase().includes(q)) ||
      (r.pathogen && r.pathogen.toLowerCase().includes(q))
    );
    this.renderMBReportTableRows(filtered);
  },

  // -------------------------------------------------------------
  // STEP 1 MODAL: IN HOUSE MICROBIOLOGY TEST REPORT SETUP
  // -------------------------------------------------------------
  openAddMBReportModal() {
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    // Reset draft session
    this.mbDraftReport = {
      unitName: 'UNIT-1',
      analysedBy: 'CH.SWATHI PADMA',
      verifiedBy: 'CH.SWATHI PADMA',
      items: []
    };

    m.open({
      title: 'IN HOUSE MICROBIOLOGY TEST REPORT',
      size: '3xl',
      content: `
        <div class="space-y-5 text-xs text-[#1E293B]">
          <div class="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#02a8b5] text-white text-[10px] font-bold">1</span>
              <span class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">Step 1: Setup &amp; Personnel Assignment</span>
            </div>
            <span class="text-[11px] text-[#64748B] font-medium">Step 1 of 2</span>
          </div>

          <form id="modal-mb-step1-form" class="space-y-4" onsubmit="event.preventDefault(); QCView.proceedToMBStep2();">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">UNIT NAME <span class="text-rose-500">*</span></label>
                <select id="modal-mb-unit" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="UNIT-1" selected>UNIT-1</option>
                  <option value="UNIT-2">UNIT-2</option>
                  <option value="UNIT-5">UNIT-5 (Main Processing Plant)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ANALYSED BY <span class="text-rose-500">*</span></label>
                <select id="modal-mb-analyst" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="CH.SWATHI PADMA" selected>CH.SWATHI PADMA</option>
                  <option value="Dr. Rajesh K. Varma">Dr. Rajesh K. Varma</option>
                  <option value="P. Ramanjaneyulu">P. Ramanjaneyulu</option>
                  <option value="K. Srinivas">K. Srinivas</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">VERIFIED BY <span class="text-rose-500">*</span></label>
                <select id="modal-mb-verifier" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="CH.SWATHI PADMA" selected>CH.SWATHI PADMA</option>
                  <option value="Dr. Rajesh K. Varma">Dr. Rajesh K. Varma</option>
                </select>
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
              <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if (m && m.close) m.close();" class="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
                Cancel
              </button>
              <button type="submit" class="px-6 py-2.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <span>Submit</span>
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </form>
        </div>
      `
    });

    setTimeout(() => {
      if (typeof window !== 'undefined' && window.CamarooControls && typeof window.CamarooControls.upgrade === 'function') {
        window.CamarooControls.upgrade(document.getElementById('erp-modal-root'));
      }
    }, 20);
  },

  // -------------------------------------------------------------
  // STEP 2 MODAL: PO SAMPLE TESTING & PARAMETER ENTRY
  // -------------------------------------------------------------
  proceedToMBStep2() {
    const unit = document.getElementById('modal-mb-unit')?.value || 'UNIT-1';
    const analyst = document.getElementById('modal-mb-analyst')?.value || 'CH.SWATHI PADMA';
    const verifier = document.getElementById('modal-mb-verifier')?.value || 'CH.SWATHI PADMA';

    this.mbDraftReport.unitName = unit;
    this.mbDraftReport.analysedBy = analyst;
    this.mbDraftReport.verifiedBy = verifier;

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    const todayStr = new Date().toISOString().split('T')[0];

    m.open({
      title: 'IN HOUSE MICROBIOLOGY TEST REPORT',
      size: '6xl',
      content: `
        <div class="space-y-4 text-xs text-[#1E293B]">
          <!-- Active Context Header Banner -->
          <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3 flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-4 flex-wrap">
              <div>
                <span class="text-[10px] text-[#64748B] font-bold uppercase tracking-wider block">UNIT</span>
                <span class="font-bold text-[#1E293B]">${this.mbDraftReport.unitName}</span>
              </div>
              <div class="h-6 w-px bg-[#CBD5E1] hidden sm:block"></div>
              <div>
                <span class="text-[10px] text-[#64748B] font-bold uppercase tracking-wider block">ANALYSED BY</span>
                <span class="font-bold text-[#006C7A]">${this.mbDraftReport.analysedBy}</span>
              </div>
              <div class="h-6 w-px bg-[#CBD5E1] hidden sm:block"></div>
              <div>
                <span class="text-[10px] text-[#64748B] font-bold uppercase tracking-wider block">VERIFIED BY</span>
                <span class="font-bold text-[#1E293B]">${this.mbDraftReport.verifiedBy}</span>
              </div>
            </div>
            <button type="button" onclick="QCView.openAddMBReportModal()" class="text-xs font-semibold text-[#02a8b5] hover:underline cursor-pointer">
              &larr; Change Setup
            </button>
          </div>

          <!-- Parameter Entry Form -->
          <div class="bg-white border border-[#CBD5E1] rounded-xl p-4 shadow-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PO NUMBER <span class="text-rose-500">*</span></label>
                <select id="modal-param-po" onchange="QCView.handleMBPOSelect(this.value)" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
                  <option value="">Select PO</option>
                  ${this.mbPOCatalog.map(p => `<option value="${p.poNo}">${p.poNo} (${p.buyer})</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PARAMETER <span class="text-rose-500">*</span></label>
                <select id="modal-param-name" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
                  <option value="">Select Parameter</option>
                  ${this.mbParametersList.map(p => `<option value="${p}">${p}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ANALYSIS DATE <span class="text-rose-500">*</span></label>
                <div class="erp-date-wrapper">
                  <input type="text" readonly inputmode="none" id="modal-param-date" value="${todayStr}" data-calendar="true" class="erp-date-input w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] cursor-pointer">
                </div>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">RESULT <span class="text-rose-500">*</span></label>
                <input type="text" id="modal-param-result" placeholder="Enter Result" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
              </div>
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-[#F1F5F9]">
              <div id="modal-buyer-preview" class="text-xs text-[#64748B] font-medium">
                <span class="text-[#94A3B8]">Buyer:</span> <span class="font-bold text-[#1E293B]" id="modal-buyer-preview-text">Please select a PO</span>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" onclick="QCView.addMBParameterItem()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                  <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Dynamic Line Items Table -->
          <div class="border border-[#CBD5E1] rounded-xl overflow-hidden shadow-xs">
            <div class="overflow-x-auto max-h-56">
              <table class="w-full text-left border-collapse text-xs">
                <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase sticky top-0 z-10">
                  <tr>
                    <th class="py-2.5 px-3">S.No</th>
                    <th class="py-2.5 px-3">PO No</th>
                    <th class="py-2.5 px-3">Buyer Name</th>
                    <th class="py-2.5 px-3">Parameter</th>
                    <th class="py-2.5 px-3">Analysis Date</th>
                    <th class="py-2.5 px-3">Result</th>
                    <th class="py-2.5 px-3 text-center">Remove</th>
                  </tr>
                </thead>
                <tbody id="modal-mb-draft-tbody" class="divide-y divide-[#F1F5F9]">
                </tbody>
              </table>
            </div>
          </div>

          <!-- Final Actions Footer -->
          <div class="flex items-center justify-between pt-3 border-t border-[#F1F5F9]">
            <span id="modal-mb-items-counter" class="text-xs text-[#64748B] font-semibold">0 parameter(s) added</span>
            <div class="flex items-center gap-2">
              <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if (m && m.close) m.close();" class="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
                Cancel
              </button>
              <button type="button" onclick="QCView.submitFinalMBReport()" class="px-6 py-2.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>SUBMIT RESULT</span>
              </button>
            </div>
          </div>
        </div>
      `
    });

    setTimeout(() => {
      if (typeof window !== 'undefined' && window.CamarooControls && typeof window.CamarooControls.upgrade === 'function') {
        window.CamarooControls.upgrade(document.getElementById('erp-modal-root'));
      }
    }, 20);

    this.renderMBDraftTableRows();
  },

  handleMBPOSelect(poNo) {
    const preview = document.getElementById('modal-buyer-preview-text');
    if (!preview) return;
    const found = this.mbPOCatalog.find(p => p.poNo === poNo);
    preview.innerText = found ? found.buyer : 'Please select a PO';
  },

  addMBParameterItem() {
    const poSelect = document.getElementById('modal-param-po');
    const paramSelect = document.getElementById('modal-param-name');
    const dateInput = document.getElementById('modal-param-date');
    const resultInput = document.getElementById('modal-param-result');

    const poNo = poSelect ? poSelect.value : '';
    const parameter = paramSelect ? paramSelect.value : '';
    const dateVal = dateInput ? dateInput.value : '';
    const result = resultInput ? resultInput.value.trim() : '';

    if (!poNo) {
      alert('Please select a PO Number');
      return;
    }
    if (!parameter) {
      alert('Please select a Parameter');
      return;
    }
    if (!result) {
      alert('Please enter Result');
      return;
    }

    const foundPO = this.mbPOCatalog.find(p => p.poNo === poNo);
    const buyerName = foundPO ? foundPO.buyer : '-';

    let formattedDate = dateVal;
    if (dateVal && dateVal.includes('-')) {
      const parts = dateVal.split('-');
      formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    this.mbDraftReport.items.push({
      sNo: this.mbDraftReport.items.length + 1,
      poNo: poNo,
      buyerName: buyerName,
      parameter: parameter,
      analysisDate: formattedDate || '26/10/2026',
      result: result
    });

    if (resultInput) resultInput.value = '';
    this.renderMBDraftTableRows();
  },

  removeMBParameterItem(idx) {
    this.mbDraftReport.items.splice(idx, 1);
    this.mbDraftReport.items.forEach((item, i) => item.sNo = i + 1);
    this.renderMBDraftTableRows();
  },

  renderMBDraftTableRows() {
    const tbody = document.getElementById('modal-mb-draft-tbody');
    const counter = document.getElementById('modal-mb-items-counter');
    if (counter) counter.innerText = `${this.mbDraftReport.items.length} parameter(s) added`;

    if (!tbody) return;

    if (this.mbDraftReport.items.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="py-6 text-center text-[#94A3B8]">
            No parameters added yet. Select PO, Parameter, and enter Result above, then tap Save.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = this.mbDraftReport.items.map((item, idx) => `
      <tr class="hover:bg-[#F8FAFC]">
        <td class="py-2.5 px-3 font-bold text-[#1E293B]">${item.sNo}</td>
        <td class="py-2.5 px-3 font-bold text-[#006C7A]">${item.poNo}</td>
        <td class="py-2.5 px-3 text-[#334155] font-medium">${item.buyerName}</td>
        <td class="py-2.5 px-3 text-[#1E293B]">${item.parameter}</td>
        <td class="py-2.5 px-3 text-[#64748B]">${item.analysisDate}</td>
        <td class="py-2.5 px-3 font-bold text-emerald-700">${item.result}</td>
        <td class="py-2.5 px-3 text-center">
          <button type="button" onclick="QCView.removeMBParameterItem(${idx})" class="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors cursor-pointer" title="Remove">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  submitFinalMBReport() {
    if (this.mbDraftReport.items.length === 0) {
      alert('Please add at least one parameter item before submitting.');
      return;
    }

    // Group items by PO Number or add as unique reports
    const uniquePOs = [...new Set(this.mbDraftReport.items.map(i => i.poNo))];
    uniquePOs.forEach(po => {
      const poItems = this.mbDraftReport.items.filter(i => i.poNo === po);
      const first = poItems[0];
      const tpcItem = poItems.find(i => i.parameter.toLowerCase().includes('tpc'));
      const pathogenItems = poItems.filter(i => !i.parameter.toLowerCase().includes('tpc'));

      this.mbReportsData.unshift({
        sNo: this.mbReportsData.length + 1,
        poNo: po,
        buyerName: first.buyerName,
        unitName: this.mbDraftReport.unitName,
        reportDate: first.analysisDate || '26/10/2026',
        analyst: this.mbDraftReport.analysedBy,
        verifiedBy: this.mbDraftReport.verifiedBy,
        tpc: tpcItem ? tpcItem.result : '< 100 CFU/g',
        pathogen: pathogenItems.length > 0 ? pathogenItems.map(p => `${p.parameter}: ${p.result}`).join(', ') : 'Negative / Absent',
        status: 'Compliant',
        items: poItems
      });
    });

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal) ? window.Modal : null;
    if (m && m.close) m.close();

    this.renderMBReportTableRows();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('In-House Microbiology Test Report submitted successfully!', 'success');
    }
  },

  openMBReportDetailModal(sNo) {
    const report = this.mbReportsData.find(r => r.sNo === sNo);
    if (!report) return;

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: `MICROBIOLOGY CERTIFICATE: ${report.poNo}`,
      size: '4xl',
      content: `
        <div class="space-y-4 text-xs text-[#1E293B]">
          <!-- Summary Cards -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">PO NUMBER</span>
              <span class="font-bold text-xs text-[#006C7A] block mt-0.5">${report.poNo}</span>
            </div>
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">BUYER NAME</span>
              <span class="font-bold text-xs text-[#1E293B] block mt-0.5">${report.buyerName}</span>
            </div>
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">ANALYSED BY</span>
              <span class="font-bold text-xs text-[#1E293B] block mt-0.5">${report.analyst}</span>
            </div>
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">VERIFIED BY</span>
              <span class="font-bold text-xs text-[#1E293B] block mt-0.5">${report.verifiedBy || report.analyst}</span>
            </div>
          </div>

          <!-- Parameters Breakdown -->
          <div class="border border-[#CBD5E1] rounded-lg overflow-hidden">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase">
                <tr>
                  <th class="py-2.5 px-3">S.No</th>
                  <th class="py-2.5 px-3">Microbiological Parameter</th>
                  <th class="py-2.5 px-3">Test Date</th>
                  <th class="py-2.5 px-3">Observed Result</th>
                  <th class="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9]">
                ${(report.items || [
                  { sNo: 1, parameter: 'Total Plate Count (TPC)', analysisDate: report.reportDate, result: report.tpc },
                  { sNo: 2, parameter: 'Pathogen Screen (E. coli, Salmonella, Vibrio)', analysisDate: report.reportDate, result: report.pathogen }
                ]).map((item, idx) => `
                  <tr class="${idx % 2 === 1 ? 'bg-slate-50/40' : ''}">
                    <td class="py-2.5 px-3 font-bold text-[#1E293B]">${idx + 1}</td>
                    <td class="py-2.5 px-3 font-semibold text-[#1E293B]">${item.parameter}</td>
                    <td class="py-2.5 px-3 text-[#64748B]">${item.analysisDate || report.reportDate}</td>
                    <td class="py-2.5 px-3 font-bold text-[#006C7A]">${item.result}</td>
                    <td class="py-2.5 px-3 text-center">
                      <span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Compliant</span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="flex items-center justify-end pt-2">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if (m && m.close) m.close();" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer">
              Close
            </button>
          </div>
        </div>
      `
    });
  },

  // ==========================================
  // 5. LAB REPORT (IN HOUSE LAB REPORTS)
  // ==========================================
  labFromDate: '22/01/2026',
  labToDate: '26/10/2026',
  labSelectedReport: 'BoreWater Analysis Report',

  labReportsList: [
    { sNo: 1, reportType: 'BoreWater Analysis Report', source: 'Borewell #03 (Processing Line)', sampleTime: '10:30 AM', analysisDate: '01/10/2026', reportDate: '02/10/2026', analyst: 'CH.SWATHI PADMA', verifiedBy: 'CH.SWATHI PADMA', ph: '7.20', temp: '26.5 °C', salinity: '0.45 ppt', hardness: '135 ppm', chlorine: 'Nil (<0.02 ppm)', tds: '420 ppm', status: 'Compliant' },
    { sNo: 2, reportType: 'Chlorine & Ice Water Test', source: 'Flake Ice Plant #02', sampleTime: '11:15 AM', analysisDate: '03/10/2026', reportDate: '04/10/2026', analyst: 'K. Srinivas', verifiedBy: 'CH.SWATHI PADMA', ph: '7.10', temp: '0.8 °C', salinity: '0.02 ppt', hardness: '80 ppm', chlorine: '1.8 ppm', tds: '190 ppm', status: 'Compliant' },
    { sNo: 3, reportType: 'Equipment Swab Hygiene Test', source: 'Grading Belt Conveyor Line #1', sampleTime: '02:00 PM', analysisDate: '06/10/2026', reportDate: '07/10/2026', analyst: 'M. S. Prasad', verifiedBy: 'Dr. Rajesh K. Varma', ph: '7.00', temp: '24.0 °C', salinity: '0.10 ppt', hardness: '110 ppm', chlorine: '0.5 ppm', tds: '280 ppm', status: 'Compliant' },
    { sNo: 4, reportType: 'Finished Product Chemical Screen', source: 'Unit-5 Master Freezing Carton', sampleTime: '04:30 PM', analysisDate: '08/10/2026', reportDate: '09/10/2026', analyst: 'Dr. Rajesh K. Varma', verifiedBy: 'CH.SWATHI PADMA', ph: '6.85', temp: '-18.2 °C', salinity: '0.80 ppt', hardness: '120 ppm', chlorine: 'Nil', tds: '350 ppm', status: 'Compliant' }
  ],

  renderLabReport(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">IN HOUSE (IH) LAB REPORTS</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Lab Operations &bull; BoreWater, Ice, Chlorine &amp; Hygiene Tests</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="lab-report-btn-create" onclick="QCView.openAddLabReportModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Report</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">FROM DATE</label>
                <input type="text" id="lab-from-date" value="${this.labFromDate}" data-calendar="true" class="erp-date-input w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all cursor-pointer">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TO DATE</label>
                <input type="text" id="lab-to-date" value="${this.labToDate}" data-calendar="true" class="erp-date-input w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all cursor-pointer">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REPORT TYPE</label>
                <select class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="BoreWater Analysis Report" selected>BoreWater Analysis Report</option>
                  <option value="Chlorine & Ice Water Test">Chlorine & Ice Water Test</option>
                  <option value="Equipment Swab Hygiene Test">Equipment Swab Hygiene Test</option>
                  <option value="Finished Product Chemical Screen">Finished Product Chemical Screen</option>
                </select>
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="button" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4">S.NO</th>
                  <th class="py-3 px-4">Report Type</th>
                  <th class="py-3 px-4">Sample Source</th>
                  <th class="py-3 px-4">Sample Time</th>
                  <th class="py-3 px-4">Sampling Date</th>
                  <th class="py-3 px-4">Tested By</th>
                  <th class="py-3 px-4">Verified By</th>
                  <th class="py-3 px-4 text-center">Status</th>
                  <th class="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="lab-report-table-body" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.renderLabReportTableRows();
  },

  renderLabReportTableRows() {
    const tbody = document.getElementById('lab-report-table-body');
    if (!tbody) return;

    tbody.innerHTML = this.labReportsList.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${idx % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="QCView.openLabReportDetailModal(${r.sNo})">${r.reportType}</td>
        <td class="py-3 px-4 text-[#334155]">${r.source}</td>
        <td class="py-3 px-4 text-[#64748B]">${r.sampleTime || '--:--'}</td>
        <td class="py-3 px-4 text-[#64748B]">${r.analysisDate}</td>
        <td class="py-3 px-4 text-[#334155]">${r.analyst}</td>
        <td class="py-3 px-4 text-[#64748B]">${r.verifiedBy || r.analyst}</td>
        <td class="py-3 px-4 text-center">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${r.status}</span>
        </td>
        <td class="py-3 px-4 text-center">
          <button type="button" onclick="QCView.openLabReportDetailModal(${r.sNo})" class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center" title="View Report">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  // Open Add Borewater Analysis Report Modal Popup
  openAddLabReportModal() {
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const currentTimeStr = new Date().toTimeString().slice(0, 5);

    m.open({
      title: 'ADD BOREWATER ANALYSIS REPORT',
      size: '6xl',
      content: `
        <div class="space-y-5 text-xs text-[#1E293B]">
          <form id="modal-borewater-form" class="space-y-5" onsubmit="event.preventDefault(); QCView.handleModalAddLabReportSubmit();">
            <!-- Sample & Verification Details -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SAMPLE COLLECTION TIME <span class="text-rose-500">*</span></label>
                <input type="time" id="borewater-sample-time" value="${currentTimeStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">DATE OF SAMPLING <span class="text-rose-500">*</span></label>
                <div class="erp-date-wrapper">
                  <input type="text" readonly inputmode="none" id="borewater-sampling-date" value="${todayStr}" data-calendar="true" required class="erp-date-input w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all cursor-pointer">
                </div>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">VERIFIED BY <span class="text-rose-500">*</span></label>
                <select id="borewater-verified-by" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select Verified By</option>
                  <option value="CH.SWATHI PADMA" selected>CH.SWATHI PADMA (QC Manager)</option>
                  <option value="Dr. Rajesh K. Varma">Dr. Rajesh K. Varma (Lab Head)</option>
                  <option value="P. Ramanjaneyulu">P. Ramanjaneyulu (QC Lead)</option>
                  <option value="K. Srinivas">K. Srinivas (Sr. Chemist)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TESTED BY <span class="text-rose-500">*</span></label>
                <select id="borewater-tested-by" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select Tested By</option>
                  <option value="CH.SWATHI PADMA" selected>CH.SWATHI PADMA</option>
                  <option value="K. Srinivas">K. Srinivas</option>
                  <option value="M. S. Prasad">M. S. Prasad</option>
                  <option value="V. Lakshmi">V. Lakshmi</option>
                </select>
              </div>
            </div>

            <!-- Parameter Values Section -->
            <div class="pt-3 border-t border-[#F1F5F9]">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                <h3 class="text-xs font-bold text-[#006C7A] uppercase tracking-wider">Parameter Values</h3>
                <span class="text-[10px] text-[#64748B] font-medium ml-auto">Potable Water Quality Standards (IS 10500)</span>
              </div>

              <!-- Parameter Grid Row 1 -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PH VALUE <span class="text-rose-500">*</span></label>
                  <input type="number" step="0.01" min="0" max="14" id="borewater-ph" placeholder="Enter PH VALUE" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <span class="text-[10px] text-[#64748B] mt-1 block">Permissible: 6.50 - 8.50</span>
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TEMPERATURE <span class="text-rose-500">*</span></label>
                  <input type="number" step="0.1" id="borewater-temp" placeholder="Enter Temperature" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <span class="text-[10px] text-[#64748B] mt-1 block">Unit: &deg;C</span>
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SALINITY <span class="text-rose-500">*</span></label>
                  <input type="number" step="0.01" id="borewater-salinity" placeholder="Enter Salinity" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <span class="text-[10px] text-[#64748B] mt-1 block">Unit: ppt (&lt; 0.50 ppt)</span>
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HARDNESS <span class="text-rose-500">*</span></label>
                  <input type="number" step="1" id="borewater-hardness" placeholder="Enter HARDNESS" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <span class="text-[10px] text-[#64748B] mt-1 block">Unit: ppm CaCO3 (Max: 200)</span>
                </div>
              </div>

              <!-- Parameter Grid Row 2 -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CHLORINE <span class="text-rose-500">*</span></label>
                  <input type="text" id="borewater-chlorine" placeholder="Enter CHLORINE" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <span class="text-[10px] text-[#64748B] mt-1 block">Unit: ppm (e.g. Nil / 0.2 ppm)</span>
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TOTAL DISSOLVED SOLIDS <span class="text-rose-500">*</span></label>
                  <input type="number" step="1" id="borewater-tds" placeholder="Enter TDS" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <span class="text-[10px] text-[#64748B] mt-1 block">Unit: ppm (Max: 500 ppm)</span>
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SAMPLE SOURCE</label>
                  <select id="borewater-source" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                    <option value="Borewell #03 (Processing Line)" selected>Borewell #03 (Processing Line)</option>
                    <option value="Borewell #01 (Raw Intake)">Borewell #01 (Raw Intake)</option>
                    <option value="Borewell #02 (Flake Ice Plant)">Borewell #02 (Flake Ice Plant)</option>
                    <option value="Overhead Storage Tank #01">Overhead Storage Tank #01</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">COMPLIANCE REMARKS</label>
                  <input type="text" id="borewater-remarks" placeholder="Optional notes" value="Meets IS 10500 standards" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                </div>
              </div>
            </div>

            <!-- Modal Footer Buttons -->
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
              <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if (m && m.close) m.close();" class="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
                Close
              </button>
              <button type="submit" class="px-6 py-2.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>Submit</span>
              </button>
            </div>
          </form>
        </div>
      `
    });

    setTimeout(() => {
      if (typeof window !== 'undefined' && window.CamarooControls && typeof window.CamarooControls.upgrade === 'function') {
        window.CamarooControls.upgrade(document.getElementById('erp-modal-root'));
      }
    }, 20);
  },

  handleModalAddLabReportSubmit() {
    const sampleTime = document.getElementById('borewater-sample-time')?.value || '--:--';
    const sampleDate = document.getElementById('borewater-sampling-date')?.value || '';
    const verifiedBy = document.getElementById('borewater-verified-by')?.value || 'CH.SWATHI PADMA';
    const testedBy = document.getElementById('borewater-tested-by')?.value || 'CH.SWATHI PADMA';
    const ph = document.getElementById('borewater-ph')?.value || '7.15';
    const temp = document.getElementById('borewater-temp')?.value || '25.0';
    const salinity = document.getElementById('borewater-salinity')?.value || '0.20';
    const hardness = document.getElementById('borewater-hardness')?.value || '120';
    const chlorine = document.getElementById('borewater-chlorine')?.value || 'Nil';
    const tds = document.getElementById('borewater-tds')?.value || '380';
    const source = document.getElementById('borewater-source')?.value || 'Borewell #03 (Processing Line)';
    const remarks = document.getElementById('borewater-remarks')?.value || 'Meets IS 10500 standards';

    let formattedDate = sampleDate;
    if (sampleDate && sampleDate.includes('-')) {
      const parts = sampleDate.split('-');
      formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    const newReport = {
      sNo: this.labReportsList.length + 1,
      reportType: 'BoreWater Analysis Report',
      source: source,
      sampleTime: sampleTime,
      analysisDate: formattedDate || '26/10/2026',
      reportDate: formattedDate || '26/10/2026',
      analyst: testedBy,
      verifiedBy: verifiedBy,
      ph: ph,
      temp: temp + ' °C',
      salinity: salinity + ' ppt',
      hardness: hardness + ' ppm',
      chlorine: chlorine,
      tds: tds + ' ppm',
      status: 'Compliant',
      remarks: remarks
    };

    this.labReportsList.unshift(newReport);

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal) ? window.Modal : null;
    if (m && m.close) m.close();

    this.renderLabReportTableRows();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('BoreWater Analysis Report created successfully!', 'success');
    }
  },

  openLabReportDetailModal(sNo) {
    const report = this.labReportsList.find(r => r.sNo === sNo);
    if (!report) return;

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: `${report.reportType.toUpperCase()} DETAILS`,
      size: '4xl',
      content: `
        <div class="space-y-4 text-xs text-[#1E293B]">
          <!-- Summary Cards -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">SOURCE</span>
              <span class="font-bold text-xs text-[#1E293B] block mt-0.5">${report.source}</span>
            </div>
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">SAMPLE TIME</span>
              <span class="font-bold text-xs text-[#1E293B] block mt-0.5">${report.sampleTime || '10:30 AM'}</span>
            </div>
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">TESTED BY</span>
              <span class="font-bold text-xs text-[#006C7A] block mt-0.5">${report.analyst}</span>
            </div>
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">VERIFIED BY</span>
              <span class="font-bold text-xs text-[#1E293B] block mt-0.5">${report.verifiedBy || report.analyst}</span>
            </div>
          </div>

          <!-- Parameter Values Table -->
          <div class="border border-[#CBD5E1] rounded-lg overflow-hidden">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase">
                <tr>
                  <th class="py-2.5 px-3">Parameter</th>
                  <th class="py-2.5 px-3">Observed Value</th>
                  <th class="py-2.5 px-3">Standard Limit</th>
                  <th class="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9]">
                <tr>
                  <td class="py-2.5 px-3 font-semibold text-[#1E293B]">pH Value</td>
                  <td class="py-2.5 px-3 font-bold text-[#006C7A]">${report.ph || '7.20'}</td>
                  <td class="py-2.5 px-3 text-[#64748B]">6.50 - 8.50</td>
                  <td class="py-2.5 px-3 text-center"><span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">Pass</span></td>
                </tr>
                <tr class="bg-slate-50/50">
                  <td class="py-2.5 px-3 font-semibold text-[#1E293B]">Temperature</td>
                  <td class="py-2.5 px-3 font-bold text-[#006C7A]">${report.temp || '26.5 °C'}</td>
                  <td class="py-2.5 px-3 text-[#64748B]">&lt; 28.0 °C</td>
                  <td class="py-2.5 px-3 text-center"><span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">Pass</span></td>
                </tr>
                <tr>
                  <td class="py-2.5 px-3 font-semibold text-[#1E293B]">Salinity</td>
                  <td class="py-2.5 px-3 font-bold text-[#006C7A]">${report.salinity || '0.45 ppt'}</td>
                  <td class="py-2.5 px-3 text-[#64748B]">&lt; 0.50 ppt</td>
                  <td class="py-2.5 px-3 text-center"><span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">Pass</span></td>
                </tr>
                <tr class="bg-slate-50/50">
                  <td class="py-2.5 px-3 font-semibold text-[#1E293B]">Hardness</td>
                  <td class="py-2.5 px-3 font-bold text-[#006C7A]">${report.hardness || '135 ppm'}</td>
                  <td class="py-2.5 px-3 text-[#64748B]">&le; 200 ppm CaCO3</td>
                  <td class="py-2.5 px-3 text-center"><span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">Pass</span></td>
                </tr>
                <tr>
                  <td class="py-2.5 px-3 font-semibold text-[#1E293B]">Chlorine (Free Residual)</td>
                  <td class="py-2.5 px-3 font-bold text-[#006C7A]">${report.chlorine || 'Nil'}</td>
                  <td class="py-2.5 px-3 text-[#64748B]">Nil to 0.20 ppm</td>
                  <td class="py-2.5 px-3 text-center"><span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">Pass</span></td>
                </tr>
                <tr class="bg-slate-50/50">
                  <td class="py-2.5 px-3 font-semibold text-[#1E293B]">Total Dissolved Solids (TDS)</td>
                  <td class="py-2.5 px-3 font-bold text-[#006C7A]">${report.tds || '420 ppm'}</td>
                  <td class="py-2.5 px-3 text-[#64748B]">&le; 500 ppm</td>
                  <td class="py-2.5 px-3 text-center"><span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">Pass</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex items-center justify-end pt-2">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if (m && m.close) m.close();" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer">
              Close
            </button>
          </div>
        </div>
      `
    });
  },

  // ==========================================
  // 6. EXTERNAL LAB REPORT
  // ==========================================
  extExporter: 'DEVI FISHERIES LIMITED - 853',
  extYear: '2026',
  extMonth: 'October',

  extLabReports: [
    { sNo: 1, certNo: 'MPEDA/BVR/2026/8912', labName: 'MPEDA QC Lab (Bhimavaram)', sample: 'Black Tiger / HLSO (Grade 16/20)', dispatchDate: '02/10/2026', resultDate: '06/10/2026', status: 'Cleared (EU Standard)' },
    { sNo: 2, certNo: 'EIC/VSKP/QC-4019', labName: 'Export Inspection Council (EIC) Central Lab', sample: 'Vannamei PDTO (Grade 31/40)', dispatchDate: '04/10/2026', resultDate: '08/10/2026', status: 'Cleared (US FDA)' },
    { sNo: 3, certNo: 'SGS/HYD/2026/1129', labName: 'SGS India Testing Center', sample: 'Pre-Harvest Aquaculture Water Screen', dispatchDate: '06/10/2026', resultDate: '10/10/2026', status: 'Certified Zero Residue' },
    { sNo: 4, certNo: 'EUR/BLR/2026/7781', labName: 'Eurofins Analytical Services', sample: 'Finished Shrimp Feed Mill Residue', dispatchDate: '08/10/2026', resultDate: '13/10/2026', status: 'Compliant' }
  ],

  renderExternalLabReport(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">EXTERNAL LAB ANALYSIS REPORTS</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Lab Operations &bull; MPEDA, EIC, SGS &amp; Eurofins External Clearances</span>
          </div>
          <!-- No add button as per user instruction -->
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">EXPORTER</label>
                <select class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="DEVI FISHERIES LIMITED - 853" selected>DEVI FISHERIES LIMITED - 853</option>
                  <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
                  <option value="DEVI SEAFOODS PVT LTD">DEVI SEAFOODS PVT LTD</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['2026', '2025', '2024', '2023'].map(y => `<option value="${y}" ${this.extYear === y ? 'selected' : ''}>${y}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">MONTH</label>
                <select class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => `<option value="${m}" ${this.extMonth === m ? 'selected' : ''}>${m}</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="button" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                <span>Print Register</span>
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4">S.NO</th>
                  <th class="py-3 px-4">Certificate / Reg No</th>
                  <th class="py-3 px-4">External Lab Name</th>
                  <th class="py-3 px-4">Sample Description</th>
                  <th class="py-3 px-4">Dispatch Date</th>
                  <th class="py-3 px-4">Result Date</th>
                  <th class="py-3 px-4 text-center">Status</th>
                  <th class="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]">
                ${this.extLabReports.map(r => `
                  <tr class="hover:bg-[#F8FAFC]">
                    <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
                    <td class="py-3 px-4 font-bold text-[#006C7A]">${r.certNo}</td>
                    <td class="py-3 px-4 text-[#334155]">${r.labName}</td>
                    <td class="py-3 px-4 text-[#334155]">${r.sample}</td>
                    <td class="py-3 px-4 text-[#64748B]">${r.dispatchDate}</td>
                    <td class="py-3 px-4 text-[#64748B]">${r.resultDate}</td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${r.status}</span>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <button type="button" class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer" title="View Certificate Details">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // ==========================================

};
