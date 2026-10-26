#!/usr/bin/env python3
"""
scripts/implement_qc_lots_list.py
Implements the first Lab tab menu: LotsList under Quality Control > Lab.
1. Updates the 6 tab menu items under Quality Control > Lab in NAV_HIERARCHY:
   - LotsList
   - AB Report
   - RM Report
   - MB Report
   - Lab Report
   - External Lab Report
2. Implements the LotsList view in QCView:
   - PURCHASE DETAILS filter card (Station, Month, Year, Search button)
   - Live search input
   - Full 10-column interactive data table with sortable columns
   - Exact records matching the screenshot
   - Interactive Eye action modal with lot test parameters
   - CSV export capability
3. Updates miledeep-devi-fisheries.html, standalone.html, js/components/sidebar.js, and js/views/qcView.js.
"""

import sys

def update_file(filepath):
    print(f"Updating {filepath}...")
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update lab tabs in NAV_HIERARCHY
    old_lab_nav = """      {
        id: "lab",
        title: "Lab",
        defaultTab: "incoming-lots",
        tabs: [
          { id: "incoming-lots", label: "Incoming Lots", hash: "#/quality/lab/incoming-lots" },
          { id: "antibiotic-testing", label: "Antibiotic Testing", hash: "#/quality/lab/antibiotic-testing" },
          { id: "rm-testing", label: "Raw Material Testing", hash: "#/quality/lab/rm-testing" },
          { id: "microbiology", label: "Microbiology Testing", hash: "#/quality/lab/microbiology" },
          { id: "in-house-lab", label: "In-House Lab", hash: "#/quality/lab/in-house-lab" },
          { id: "external-lab", label: "External Lab", hash: "#/quality/lab/external-lab" }
        ]
      },"""

    new_lab_nav = """      {
        id: "lab",
        title: "Lab",
        defaultTab: "lots-list",
        tabs: [
          { id: "lots-list", label: "LotsList", hash: "#/quality/lab/lots-list" },
          { id: "ab-report", label: "AB Report", hash: "#/quality/lab/ab-report" },
          { id: "rm-report", label: "RM Report", hash: "#/quality/lab/rm-report" },
          { id: "mb-report", label: "MB Report", hash: "#/quality/lab/mb-report" },
          { id: "lab-report", label: "Lab Report", hash: "#/quality/lab/lab-report" },
          { id: "external-lab-report", label: "External Lab Report", hash: "#/quality/lab/external-lab-report" }
        ]
      },"""

    if old_lab_nav in content:
        content = content.replace(old_lab_nav, new_lab_nav, 1)
        print("  ✓ Updated lab tabs in NAV_HIERARCHY")
    else:
        print("  ⚠ old_lab_nav not matched directly")

    return content

# Let's write the complete QCView additions
qc_lots_list_methods = """
  // LotsList Filter & Sorting State
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
      <div class="space-y-6 w-full animate-fade-in pb-12">
        <!-- Top Purchase Details Filter Card -->
        <div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
          <div class="mb-4">
            <h2 class="text-xs font-extrabold text-[#0F172A] uppercase tracking-wider">PURCHASE DETAILS</h2>
          </div>
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <!-- Purchase Station Dropdown -->
            <div class="w-full sm:flex-1">
              <div class="relative">
                <select id="lots-station-select" class="w-full h-11 text-xs font-semibold text-slate-700 bg-white border border-[#3B82F6] rounded-xl px-4 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
                  <option value="All Purchase Station" ${this.lotsStationFilter === 'All Purchase Station' ? 'selected' : ''}>All Purchase Station</option>
                  <option value="Bhimavaram (BVRM)" ${this.lotsStationFilter === 'Bhimavaram (BVRM)' ? 'selected' : ''}>Bhimavaram (BVRM)</option>
                  <option value="Kakinada (KKD)" ${this.lotsStationFilter === 'Kakinada (KKD)' ? 'selected' : ''}>Kakinada (KKD)</option>
                  <option value="Visakhapatnam (VSKP)" ${this.lotsStationFilter === 'Visakhapatnam (VSKP)' ? 'selected' : ''}>Visakhapatnam (VSKP)</option>
                  <option value="Amalapuram (ADP)" ${this.lotsStationFilter === 'Amalapuram (ADP)' ? 'selected' : ''}>Amalapuram (ADP)</option>
                  <option value="Nellore (NLR)" ${this.lotsStationFilter === 'Nellore (NLR)' ? 'selected' : ''}>Nellore (NLR)</option>
                  <option value="Balsore (BLS)" ${this.lotsStationFilter === 'Balsore (BLS)' ? 'selected' : ''}>Balsore (BLS)</option>
                  <option value="Annavaram (AVN)" ${this.lotsStationFilter === 'Annavaram (AVN)' ? 'selected' : ''}>Annavaram (AVN)</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>
            </div>

            <!-- Month Dropdown -->
            <div class="w-full sm:flex-1">
              <div class="relative">
                <select id="lots-month-select" class="w-full h-11 text-xs font-semibold text-slate-700 bg-white border border-[#3B82F6] rounded-xl px-4 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
                  ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => `
                    <option value="${m}" ${this.lotsMonthFilter === m ? 'selected' : ''}>${m}</option>
                  `).join('')}
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>
            </div>

            <!-- Year Dropdown -->
            <div class="w-full sm:flex-1">
              <div class="relative">
                <select id="lots-year-select" class="w-full h-11 text-xs font-semibold text-slate-700 bg-white border border-[#3B82F6] rounded-xl px-4 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
                  ${['2027', '2026', '2025', '2024', '2023', '2022'].map(y => `
                    <option value="${y}" ${this.lotsYearFilter === y ? 'selected' : ''}>${y}</option>
                  `).join('')}
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Search Button -->
          <div class="mt-4 flex justify-center">
            <button type="button" id="lots-btn-search" class="px-7 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>

        <!-- Main Data Card & Table -->
        <div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
          <!-- Search Bar -->
          <div class="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="relative w-full max-w-sm">
              <input
                type="text"
                id="lots-search-input"
                placeholder="Search..."
                value="${this.lotsSearchQuery}"
                class="w-full text-xs pl-9 pr-4 py-2.5 bg-[#FAFBFC] border border-[#CBD5E1] rounded-xl focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 text-slate-700"
              />
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span id="lots-row-count-badge" class="text-xs font-semibold text-slate-500"></span>
              <button type="button" id="lots-btn-export" class="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#02a8b5] hover:bg-[#00929e] shadow-xs flex items-center gap-1.5 transition-all cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-xl border border-slate-100">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-700 uppercase tracking-wider select-none">
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
                  <th class="py-3 px-4 text-center">
                    <div class="flex items-center justify-center gap-1.5"><span>Actions</span><span class="text-slate-400">⇅</span></div>
                  </th>
                </tr>
              </thead>
              <tbody id="lots-table-tbody" class="divide-y divide-slate-100 text-slate-700 font-medium"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.bindLotsEvents();
    this.renderLotsTableRows();
  },

  bindLotsEvents() {
    const stationSel = document.getElementById('lots-station-select');
    if (stationSel) {
      stationSel.addEventListener('change', (e) => {
        this.lotsStationFilter = e.target.value;
      });
    }

    const monthSel = document.getElementById('lots-month-select');
    if (monthSel) {
      monthSel.addEventListener('change', (e) => {
        this.lotsMonthFilter = e.target.value;
      });
    }

    const yearSel = document.getElementById('lots-year-select');
    if (yearSel) {
      yearSel.addEventListener('change', (e) => {
        this.lotsYearFilter = e.target.value;
      });
    }

    const searchBtn = document.getElementById('lots-btn-search');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        this.renderLotsTableRows();
      });
    }

    const searchInput = document.getElementById('lots-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.lotsSearchQuery = e.target.value.trim();
        this.renderLotsTableRows();
      });
    }

    const exportBtn = document.getElementById('lots-btn-export');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
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
    }
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

    // Filter by station
    if (this.lotsStationFilter && this.lotsStationFilter !== 'All Purchase Station') {
      rows = rows.filter(r => r.station === this.lotsStationFilter);
    }

    // Filter by search query
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

    // Sort rows
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
          <td colspan="10" class="py-12 text-center text-slate-400">
            <svg class="w-10 h-10 mx-auto text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            No matching Lots found for the selected station and search criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = rows.map((lot, idx) => {
      return `
        <tr class="hover:bg-slate-50/70 transition-colors ${idx % 2 === 1 ? 'bg-slate-50/30' : ''}">
          <td class="py-3 px-4 font-bold text-slate-900">${lot.id}</td>
          <td class="py-3 px-4 font-bold text-slate-900">${lot.lot}</td>
          <td class="py-3 px-4 text-slate-600 whitespace-nowrap">${lot.rmDate}</td>
          <td class="py-3 px-4 text-slate-600">${lot.type}</td>
          <td class="py-3 px-4 text-slate-700">${lot.grader}</td>
          <td class="py-3 px-4 text-slate-700">${lot.agent}</td>
          <td class="py-3 px-4 text-right font-medium text-slate-800">${Number(lot.count).toFixed(2)}</td>
          <td class="py-3 px-4 text-right font-medium text-slate-800">${Number(lot.weight).toFixed(2)}</td>
          <td class="py-3 px-4 text-center">
            <span class="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-semibold bg-[#00c08b] text-white shadow-2xs">
              ${lot.abStatus}
            </span>
          </td>
          <td class="py-3 px-4 text-center">
            <button 
              type="button" 
              onclick="QCView.openLotDetailModal('${lot.id}')" 
              class="p-1.5 text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center" 
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
        <div class="space-y-5 text-xs text-slate-700">
          <!-- Summary Header Banner -->
          <div class="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Lot Identifier</div>
              <div class="text-base font-extrabold text-slate-900">${lot.lot} <span class="text-xs font-semibold text-slate-500">(ID: ${lot.id})</span></div>
            </div>
            <div class="text-right">
              <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Antibiotic Status</div>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#00c08b] text-white">
                ${lot.abStatus}
              </span>
            </div>
          </div>

          <!-- 2-Column Info Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-4 bg-white border border-slate-200 rounded-xl space-y-2.5">
              <div class="text-[11px] font-bold uppercase tracking-wider text-[#006C7A] pb-1 border-b border-slate-100">
                Purchase & Receiving Details
              </div>
              <div class="flex justify-between py-1 border-b border-slate-50">
                <span class="text-slate-500">RM Receiving Date:</span>
                <span class="font-semibold text-slate-900">${lot.rmDate}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-50">
                <span class="text-slate-500">Weighment Station:</span>
                <span class="font-semibold text-slate-900">${lot.station}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-50">
                <span class="text-slate-500">Purchase Type:</span>
                <span class="font-semibold text-slate-900">${lot.type}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-50">
                <span class="text-slate-500">Grader Name:</span>
                <span class="font-semibold text-slate-900">${lot.grader}</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-slate-500">Agent / Farmer:</span>
                <span class="font-semibold text-slate-900">${lot.agent}</span>
              </div>
            </div>

            <div class="p-4 bg-white border border-slate-200 rounded-xl space-y-2.5">
              <div class="text-[11px] font-bold uppercase tracking-wider text-[#006C7A] pb-1 border-b border-slate-100">
                Quantity & Lab Testing Protocol
              </div>
              <div class="flex justify-between py-1 border-b border-slate-50">
                <span class="text-slate-500">Pcs / Count:</span>
                <span class="font-bold text-slate-900">${Number(lot.count).toFixed(2)}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-50">
                <span class="text-slate-500">Total Weight:</span>
                <span class="font-bold text-slate-900">${Number(lot.weight).toFixed(2)} Kg</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-50">
                <span class="text-slate-500">Testing Method:</span>
                <span class="font-semibold text-slate-900">${lot.testDetails.method}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-50">
                <span class="text-slate-500">Lab & Technician:</span>
                <span class="font-semibold text-slate-900">${lot.testDetails.lab} (${lot.testDetails.collectedBy})</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-slate-500">Sampling Timestamp:</span>
                <span class="font-semibold text-slate-900">${lot.testDetails.testTime}</span>
              </div>
            </div>
          </div>

          <!-- Antibiotic Test Breakdown -->
          <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2">
              Antibiotic Residue Screening Summary
            </div>
            <p class="text-xs text-slate-700 leading-relaxed">
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
"""

def update_qc_render_in_content(content):
    # In QCView.render, add lots-list route handling
    old_subpage_branch = """    if (subPage === 'qc-overview' || subPage === 'overview' || !subPage) {
      this.renderQCOverview(subContainer);
    } else if (subPage === 'daily-qc-ops') {
      this.renderDailyQCOps(subContainer);
    } else {"""

    new_subpage_branch = """    if (subPage === 'qc-overview' || subPage === 'overview' || !subPage) {
      this.renderQCOverview(subContainer);
    } else if (subPage === 'daily-qc-ops') {
      this.renderDailyQCOps(subContainer);
    } else if (subPage === 'lots-list' || subPage === 'incoming-lots' || subPage === 'lotslist') {
      this.renderLotsList(subContainer, activeHash);
    } else {"""

    if old_subpage_branch in content:
        content = content.replace(old_subpage_branch, new_subpage_branch, 1)
        print("  ✓ Updated QCView.render() branching to support lots-list")
    else:
        print("  ⚠ old_subpage_branch not found")

    # Now insert qc_lots_list_methods right before `};` of QCView
    # In miledeep-devi-fisheries.html: `if (typeof window !== 'undefined') { window.QCView = QCView; }` comes after QCView
    target_needle = """      document.getElementById('qc-btn-download-po-excel')?.addEventListener('click', () => {
        exportExcel('PO_Grade_Lab_Availability_2026.csv', this.getPOData());
      });
    });
  }
};"""

    if target_needle in content:
        content = content.replace(target_needle, target_needle[:-3] + qc_lots_list_methods + "\n};", 1)
        print("  ✓ Appended LotsList methods into QCView")
    else:
        # Check alternative ending without the outer DOMContentLoaded
        target_needle_2 = """    document.getElementById('qc-btn-download-po-excel')?.addEventListener('click', () => {
      exportExcel('PO_Grade_Lab_Availability_2026.csv', this.getPOData());
    });
  }
};"""
        if target_needle_2 in content:
            content = content.replace(target_needle_2, target_needle_2[:-3] + qc_lots_list_methods + "\n};", 1)
            print("  ✓ Appended LotsList methods into QCView (variant 2)")
        else:
            print("  ⚠ QCView closing needle not found")

    return content

def main():
    # Update miledeep-devi-fisheries.html
    f1 = "miledeep-devi-fisheries.html"
    c1 = update_file(f1)
    c1 = update_qc_render_in_content(c1)
    with open(f1, "w", encoding="utf-8") as f:
        f.write(c1)
    print(f"Saved {f1}.\n")

    # Update standalone.html
    f2 = "standalone.html"
    c2 = update_file(f2)
    c2 = update_qc_render_in_content(c2)
    with open(f2, "w", encoding="utf-8") as f:
        f.write(c2)
    print(f"Saved {f2}.\n")

    # Update js/components/sidebar.js
    f3 = "js/components/sidebar.js"
    c3 = update_file(f3)
    with open(f3, "w", encoding="utf-8") as f:
        f.write(c3)
    print(f"Saved {f3}.\n")

    # Update js/views/qcView.js
    f4 = "js/views/qcView.js"
    with open(f4, "r", encoding="utf-8") as f:
        c4 = f.read()
    c4 = update_qc_render_in_content(c4)
    with open(f4, "w", encoding="utf-8") as f:
        f.write(c4)
    print(f"Saved {f4}.\n")

if __name__ == "__main__":
    main()
