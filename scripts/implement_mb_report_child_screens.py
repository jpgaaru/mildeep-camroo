import re

print("Preparing In-House Microbiology (MB) Child Screens implementation...")

NEW_MB_METHODS = '''
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
                <input type="text" id="mb-from-date" value="${this.mbFromDate}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT TO DATE</label>
                <input type="text" id="mb-to-date" value="${this.mbToDate}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
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
      size: 'xl',
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
      size: '2xl',
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
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
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
                <input type="date" id="modal-param-date" value="${todayStr}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
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
      size: 'xl',
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
'''

TARGET_REGEX = re.compile(r'  // ==========================================\s*\n\s*// 4\. MB REPORT \(IN HOUSE MICROBIOLOGY\)[\s\S]*?(?=  // ==========================================\s*\n\s*// 5\. LAB REPORT \(IN HOUSE LAB REPORTS\))', re.MULTILINE)

for filepath in ['js/views/qcView.js', 'miledeep-devi-fisheries.html', 'standalone.html']:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    match = TARGET_REGEX.search(content)
    if not match:
        print(f"ERROR: Could not find MB Report section in {filepath}")
        continue

    new_content = TARGET_REGEX.sub(NEW_MB_METHODS + '\n', content)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"✓ Updated MB Report child screens & modals in {filepath}")

