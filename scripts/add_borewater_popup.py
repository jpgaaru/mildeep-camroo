import re

print("Preparing BoreWater Analysis modal update...")

NEW_BOREWATER_METHODS = '''
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
                <input type="text" value="${this.labFromDate}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TO DATE</label>
                <input type="text" value="${this.labToDate}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
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
      size: '2xl',
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
                <input type="date" id="borewater-sampling-date" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
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
      size: 'xl',
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
'''

TARGET_REGEX = re.compile(r'  // ==========================================\s*\n\s*// 5\. LAB REPORT \(IN HOUSE LAB REPORTS\)[\s\S]*?(?=  // ==========================================\s*\n\s*// 6\. EXTERNAL LAB REPORT)', re.MULTILINE)

for filepath in ['js/views/qcView.js', 'miledeep-devi-fisheries.html', 'standalone.html']:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    match = TARGET_REGEX.search(content)
    if not match:
        print(f"ERROR: Could not find Lab Report section in {filepath}")
        continue

    new_content = TARGET_REGEX.sub(NEW_BOREWATER_METHODS + '\n', content)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"✓ Updated Lab Report & Add Borewater modal in {filepath}")

