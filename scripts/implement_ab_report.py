#!/usr/bin/env python3
"""
scripts/implement_ab_report.py
Implements the second Lab tab menu: AB Report and Daily Lab AB Report creation form under Quality Control > Lab.
1. Updates QCView.render() branching to support 'ab-report'.
2. Appends AB Report state, list view, table rendering, breakdown modal, and the complete 21-field Daily Lab AB Report creation form.
3. Updates miledeep-devi-fisheries.html, standalone.html, and js/views/qcView.js.
"""

import sys

ab_report_code = """
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
      <div class="space-y-6 w-full animate-fade-in pb-12">
        <!-- Top Antibiotic Reports List Filter Card -->
        <div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
          <div class="mb-4">
            <h2 class="text-xs font-extrabold text-[#0F172A] uppercase tracking-wider">ANTIBIOTIC REPORTS LIST</h2>
          </div>
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <!-- Select Year -->
            <div class="w-full sm:flex-1">
              <label class="block text-[11px] font-bold text-slate-600 mb-1">Select Year</label>
              <div class="relative">
                <select id="ab-filter-year" class="w-full h-11 text-xs font-semibold text-slate-700 bg-white border border-[#3B82F6] rounded-xl px-4 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
                  ${['2026', '2025', '2024', '2023', '2022'].map(y => `<option value="${y}" ${this.abSelectedYear === y ? 'selected' : ''}>${y}</option>`).join('')}
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>
            </div>

            <!-- Select Month -->
            <div class="w-full sm:flex-1">
              <label class="block text-[11px] font-bold text-slate-600 mb-1">Select Month</label>
              <div class="relative">
                <select id="ab-filter-month" class="w-full h-11 text-xs font-semibold text-slate-700 bg-white border border-[#3B82F6] rounded-xl px-4 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
                  ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => `<option value="${m}" ${this.abSelectedMonth === m ? 'selected' : ''}>${m}</option>`).join('')}
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>
            </div>

            <!-- Plant -->
            <div class="w-full sm:flex-1">
              <label class="block text-[11px] font-bold text-slate-600 mb-1">Plant</label>
              <div class="relative">
                <select id="ab-filter-plant" class="w-full h-11 text-xs font-semibold text-slate-700 bg-white border border-[#3B82F6] rounded-xl px-4 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
                  <option value="DEVI FISHERIES LIMITED (UNIT-5)" selected>DEVI FISHERIES LIMITED (UNIT-5)</option>
                  <option value="DEVI FISHERIES LIMITED (UNIT-1)">DEVI FISHERIES LIMITED (UNIT-1)</option>
                  <option value="DEVI FISHERIES LIMITED (UNIT-2)">DEVI FISHERIES LIMITED (UNIT-2)</option>
                  <option value="DEVI FISHERIES LIMITED (UNIT-3)">DEVI FISHERIES LIMITED (UNIT-3)</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Buttons Row -->
          <div class="mt-5 flex items-center justify-center gap-3">
            <button type="button" id="ab-btn-search" class="px-6 py-2.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <button type="button" id="ab-btn-create-report" onclick="QCView.openCreateDailyABReport()" class="px-6 py-2.5 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-xs font-semibold rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Create Report</span>
            </button>
          </div>
        </div>

        <!-- Main Data Card & Table -->
        <div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
          <div class="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="relative w-full max-w-sm">
              <input
                type="text"
                id="ab-search-input"
                placeholder="Search..."
                value="${this.abSearchQuery}"
                class="w-full text-xs pl-9 pr-4 py-2.5 bg-[#FAFBFC] border border-[#CBD5E1] rounded-xl focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 text-slate-700"
              />
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span id="ab-row-count-badge" class="text-xs font-semibold text-slate-500"></span>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto rounded-xl border border-slate-100">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-700 uppercase tracking-wider select-none">
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
                  <th class="py-3 px-4 text-center">
                    <div class="flex items-center justify-center gap-1.5"><span>Actions</span><span class="text-slate-400">⇅</span></div>
                  </th>
                </tr>
              </thead>
              <tbody id="ab-reports-tbody" class="divide-y divide-slate-100 text-slate-700 font-medium"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.bindABListEvents();
    this.renderABTableRows();
  },

  bindABListEvents() {
    const yearSel = document.getElementById('ab-filter-year');
    if (yearSel) {
      yearSel.addEventListener('change', (e) => {
        this.abSelectedYear = e.target.value;
      });
    }

    const monthSel = document.getElementById('ab-filter-month');
    if (monthSel) {
      monthSel.addEventListener('change', (e) => {
        this.abSelectedMonth = e.target.value;
      });
    }

    const plantSel = document.getElementById('ab-filter-plant');
    if (plantSel) {
      plantSel.addEventListener('change', (e) => {
        this.abSelectedPlant = e.target.value;
      });
    }

    const searchBtn = document.getElementById('ab-btn-search');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        this.renderABTableRows();
      });
    }

    const searchInput = document.getElementById('ab-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.abSearchQuery = e.target.value.trim();
        this.renderABTableRows();
      });
    }
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

    // Filter by query
    if (this.abSearchQuery) {
      const q = this.abSearchQuery.toLowerCase();
      rows = rows.filter(r => 
        r.reportId.toLowerCase().includes(q) ||
        r.analysisDate.toLowerCase().includes(q) ||
        r.reportDate.toLowerCase().includes(q) ||
        r.plant.toLowerCase().includes(q)
      );
    }

    // Sort rows
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
          <td colspan="7" class="py-12 text-center text-slate-400">
            No data available in table
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = rows.map((r, idx) => {
      return `
        <tr class="hover:bg-slate-50/70 transition-colors ${idx % 2 === 1 ? 'bg-slate-50/30' : ''}">
          <td class="py-3 px-4 font-bold text-slate-900">${r.reportId}</td>
          <td class="py-3 px-4 text-slate-600 whitespace-nowrap">${r.analysisDate}</td>
          <td class="py-3 px-4 text-slate-600 whitespace-nowrap">${r.reportDate}</td>
          <td class="py-3 px-4 text-right font-bold text-slate-800">${r.totalReports}</td>
          <td class="py-3 px-4 text-right font-medium text-slate-700">${r.dayTotal}</td>
          <td class="py-3 px-4 text-right font-medium text-slate-700">${r.nightTotal}</td>
          <td class="py-3 px-4 text-center">
            <button 
              type="button" 
              onclick="QCView.openABReportDetailModal('${r.reportId}')" 
              class="p-1.5 text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center" 
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
        <div class="space-y-4 text-xs text-slate-700">
          <div class="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Daily Summary Batch</div>
              <div class="text-sm font-extrabold text-slate-900">${report.reportId} • ${report.analysisDate}</div>
            </div>
            <div class="flex items-center gap-4 text-right">
              <div>
                <span class="text-slate-400 text-[10px] uppercase font-bold block">Day Shift</span>
                <span class="font-bold text-slate-900 text-xs">${report.dayTotal} Tests</span>
              </div>
              <div>
                <span class="text-slate-400 text-[10px] uppercase font-bold block">Night Shift</span>
                <span class="font-bold text-slate-900 text-xs">${report.nightTotal} Tests</span>
              </div>
              <div>
                <span class="text-slate-400 text-[10px] uppercase font-bold block">Total Tests</span>
                <span class="font-bold text-emerald-700 text-xs">${report.totalReports} Samples</span>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-100/80 text-[11px] font-bold text-slate-700 uppercase">
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
              <tbody class="divide-y divide-slate-100">
                ${lines.length > 0 ? lines.map(l => `
                  <tr class="hover:bg-slate-50">
                    <td class="py-2 px-3 font-bold text-slate-900">${l.lotNo}</td>
                    <td class="py-2 px-3">${l.sampleType}</td>
                    <td class="py-2 px-3 font-semibold">${l.shift}</td>
                    <td class="py-2 px-3 font-medium">${Number(l.count).toFixed(2)}</td>
                    <td class="py-2 px-3 font-medium">${Number(l.quantity).toFixed(2)}</td>
                    <td class="py-2 px-3 font-mono text-[11px]">${l.aoz}</td>
                    <td class="py-2 px-3 font-mono text-[11px]">${l.sem}</td>
                    <td class="py-2 px-3 font-mono text-[11px]">${l.cap}</td>
                    <td class="py-2 px-3">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${l.result.includes('Positive') ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}">
                        ${l.result}
                      </span>
                    </td>
                  </tr>
                `).join('') : `
                  <tr>
                    <td colspan="9" class="py-6 text-center text-slate-400">All samples in this batch passed rapid standard screen.</td>
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
      <div class="space-y-6 w-full animate-fade-in pb-12">
        <!-- Breadcrumbs Navigation -->
        <div class="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>Lab</span>
          <span>&gt;</span>
          <button type="button" onclick="QCView.closeCreateDailyABReport()" class="hover:text-[#02a8b5] cursor-pointer">AB Report</button>
          <span>&gt;</span>
          <span class="text-[#3B82F6] font-bold">Daily Lab AB Report</span>
        </div>

        <!-- Form Card -->
        <div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
          <div class="mb-6 pb-2 border-b border-slate-100">
            <h2 class="text-xs font-extrabold text-[#0F172A] uppercase tracking-wider">DAILY LAB AB REPORT</h2>
          </div>

          <form id="daily-ab-report-form" class="space-y-5" onsubmit="event.preventDefault(); QCView.handleDailyABSubmit();">
            <!-- Row 1: LOT NO, ANALYSIS DATE, REPORT DATE, SAMPLE TYPE -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">LOT NO</label>
                <div class="relative">
                  <select id="form-ab-lot" required class="w-full h-10 text-xs font-medium text-slate-800 bg-white border border-[#3B82F6] rounded-xl px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
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
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">ANALYSIS DATE</label>
                <div class="relative">
                  <input type="text" id="form-ab-analysis-date" value="26/10/2026" required class="w-full h-10 text-xs font-medium text-slate-800 bg-white border border-[#3B82F6] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">REPORT DATE</label>
                <div class="relative">
                  <input type="text" id="form-ab-report-date" value="27/10/2026" required class="w-full h-10 text-xs font-medium text-slate-800 bg-white border border-[#3B82F6] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">SAMPLE TYPE</label>
                <div class="relative">
                  <select id="form-ab-sample-type" class="w-full h-10 text-xs font-medium text-slate-800 bg-white border border-[#3B82F6] rounded-xl px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
                    <option value="Harvest" selected>Harvest</option>
                    <option value="Pre-Harvest">Pre-Harvest</option>
                    <option value="Plant Receiving">Plant Receiving</option>
                    <option value="Finished Goods">Finished Goods</option>
                    <option value="Water">Water</option>
                    <option value="Ice">Ice</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Row 2: SAMPLE DETAILS, COUNT, QUANTITY, PARAMETER -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">SAMPLE DETAILS</label>
                <input type="text" id="form-ab-sample-details" placeholder="Enter Sample Details" class="w-full h-10 text-xs font-medium text-slate-800 bg-white border border-[#3B82F6] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">COUNT</label>
                <input type="number" step="0.01" id="form-ab-count" placeholder="Enter Count" class="w-full h-10 text-xs font-medium text-slate-800 bg-white border border-[#3B82F6] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">QUANTITY</label>
                <input type="number" step="0.01" id="form-ab-quantity" placeholder="Enter Quantity" class="w-full h-10 text-xs font-medium text-slate-800 bg-white border border-[#3B82F6] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">PARAMETER</label>
                <div class="relative">
                  <select id="form-ab-parameter" class="w-full h-10 text-xs font-medium text-slate-800 bg-white border border-[#CBD5E1] rounded-xl px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
                    <option value="NA" selected>NA</option>
                    <option value="Rapid ELISA">Rapid ELISA</option>
                    <option value="LC-MS/MS">LC-MS/MS</option>
                    <option value="Rapid Strip">Rapid Strip</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Row 3: LOADING STATUS, SHIFT, TESTED BY, VERIFIED BY -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">LOADING STATUS</label>
                <div class="relative">
                  <select id="form-ab-loading-status" class="w-full h-10 text-xs font-medium text-slate-800 bg-white border border-[#3B82F6] rounded-xl px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
                    <option value="">Select</option>
                    <option value="Loaded">Loaded</option>
                    <option value="Pending">Pending</option>
                    <option value="Direct To Plant">Direct To Plant</option>
                    <option value="Hold">Hold</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">SHIFT</label>
                <div class="relative">
                  <select id="form-ab-shift" class="w-full h-10 text-xs font-medium text-slate-800 bg-white border border-[#3B82F6] rounded-xl px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
                    <option value="DAY" selected>DAY</option>
                    <option value="NIGHT">NIGHT</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">TESTED BY</label>
                <div class="relative">
                  <select id="form-ab-tested-by" class="w-full h-10 text-xs font-medium text-slate-800 bg-white border border-[#3B82F6] rounded-xl px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
                    <option value="CH.SWATHI PADMA" selected>CH.SWATHI PADMA</option>
                    <option value="Dr. Rajesh K. Varma">Dr. Rajesh K. Varma</option>
                    <option value="K. Srinivas">K. Srinivas</option>
                    <option value="M. S. Prasad">M. S. Prasad</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">VERIFIED BY</label>
                <div class="relative">
                  <select id="form-ab-verified-by" class="w-full h-10 text-xs font-medium text-slate-800 bg-white border border-[#3B82F6] rounded-xl px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
                    <option value="CH.SWATHI PADMA" selected>CH.SWATHI PADMA</option>
                    <option value="Dr. Rajesh K. Varma">Dr. Rajesh K. Varma</option>
                    <option value="Dr. Y.S. Prasad">Dr. Y.S. Prasad</option>
                    <option value="Plant QC Head">Plant QC Head</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Row 4: PLANT, SULPHITE, REMARKS -->
            <div class="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div class="sm:col-span-3">
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">PLANT</label>
                <div class="relative">
                  <select id="form-ab-plant" class="w-full h-10 text-xs font-medium text-slate-700 bg-slate-50 border border-[#CBD5E1] rounded-xl px-3 py-2 appearance-none focus:outline-none">
                    <option value="DEVI FISHERIES LIMITED (UNIT-5)" selected>DEVI FISHERIES LIMITED (UNIT-5)</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </div>
              </div>

              <div class="sm:col-span-3">
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">SULPHITE</label>
                <input type="text" id="form-ab-sulphite" placeholder="Enter Quantity" class="w-full h-10 text-xs font-medium text-slate-800 bg-white border border-[#3B82F6] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
              </div>

              <div class="sm:col-span-6">
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">REMARKS</label>
                <input type="text" id="form-ab-remarks" placeholder="Enter Remarks" class="w-full h-10 text-xs font-medium text-slate-800 bg-white border border-[#CBD5E1] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
              </div>
            </div>

            <!-- Row 5: AOZ, SEM, CAP, AHD, AMOZ, RESULT -->
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
              <div>
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">AOZ</label>
                <input type="text" id="form-ab-aoz" placeholder="Enter AOZ" class="w-full h-10 text-xs font-medium text-slate-800 bg-white border border-[#3B82F6] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">SEM</label>
                <input type="text" id="form-ab-sem" placeholder="Enter SEM" class="w-full h-10 text-xs font-medium text-slate-800 bg-white border border-[#3B82F6] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">CAP</label>
                <input type="text" id="form-ab-cap" placeholder="Enter CAP" class="w-full h-10 text-xs font-medium text-slate-800 bg-white border border-[#3B82F6] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">AHD</label>
                <input type="text" id="form-ab-ahd" placeholder="Enter AHD" class="w-full h-10 text-xs font-medium text-slate-800 bg-white border border-[#3B82F6] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">AMOZ</label>
                <input type="text" id="form-ab-amoz" placeholder="Enter AMOZ" class="w-full h-10 text-xs font-medium text-slate-800 bg-white border border-[#3B82F6] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-slate-600 mb-1.5">RESULT</label>
                <input type="text" id="form-ab-result" placeholder="Enter Result" class="w-full h-10 text-xs font-medium text-slate-800 bg-white border border-[#3B82F6] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
              </div>
            </div>

            <!-- Action Buttons Row -->
            <div class="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
              <button type="button" onclick="QCView.closeCreateDailyABReport()" class="px-6 py-2.5 bg-[#F43F5E] hover:bg-[#E11D48] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer">
                Close
              </button>
              <button type="submit" class="px-7 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer">
                Submit
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

    // 1. Generate Report ID based on date
    const dateParts = analysisDate.split('/');
    const dateKey = dateParts.length === 3 ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}` : '2026-10-26';
    const reportId = `AB-${dateKey}`;

    // 2. Add test line
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

    // 3. Update or add report batch
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
  },
"""

def update_qc_file(filepath):
    print(f"Updating {filepath}...")
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update QCView.render() branching to support ab-report
    old_subpage_branch = """    } else if (subPage === 'lots-list' || subPage === 'incoming-lots' || subPage === 'lotslist') {
      this.renderLotsList(subContainer, activeHash);
    } else {"""

    new_subpage_branch = """    } else if (subPage === 'lots-list' || subPage === 'incoming-lots' || subPage === 'lotslist') {
      this.renderLotsList(subContainer, activeHash);
    } else if (subPage === 'ab-report' || subPage === 'antibiotic-testing') {
      this.renderABReport(subContainer, activeHash);
    } else {"""

    if old_subpage_branch in content:
        content = content.replace(old_subpage_branch, new_subpage_branch, 1)
        print("  ✓ Added 'ab-report' routing branch into QCView.render()")
    else:
        print("  ⚠ old_subpage_branch not found")

    # 2. Append ab_report_code right before the end of QCView
    # In both HTML files and qcView.js:
    # Target:
    target_end = """        {
          label: 'Print Lab Certificate',
          type: 'primary',
          onClick: (modal) => {
            window.print();
          }
        }
      ]
    });
  },

};"""

    if target_end in content:
        content = content.replace(target_end, target_end[:-3] + ab_report_code + "\n};", 1)
        print("  ✓ Appended AB Report methods into QCView")
    else:
        # Check without double blank line
        target_end_2 = """        {
          label: 'Print Lab Certificate',
          type: 'primary',
          onClick: (modal) => {
            window.print();
          }
        }
      ]
    });
  }
};"""
        if target_end_2 in content:
            content = content.replace(target_end_2, target_end_2[:-3] + ",\n" + ab_report_code + "\n};", 1)
            print("  ✓ Appended AB Report methods into QCView (variant 2)")
        else:
            print("  ⚠ QCView target_end needle not found")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Saved {filepath}.\n")

def main():
    update_qc_file("miledeep-devi-fisheries.html")
    update_qc_file("standalone.html")
    update_qc_file("js/views/qcView.js")

if __name__ == "__main__":
    main()
