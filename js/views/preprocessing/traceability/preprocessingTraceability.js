// Pre-processing Module — Traceability & Reconciliation
export const preprocessingTraceability = {
  // ============================================
  // 4. TRACEABILITY & RECONCILIATION
  // ============================================
  renderTrackCodeReport(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Batch Genealogy & End-to-End Traceability Report')}
        <div id="trace-table-container"></div>
      </div>
    `;
    new DataTable({
      containerId: 'trace-table-container',
      data: this.traceReportsList,
      keyField: 'id',
      tableTitle: 'Farm-to-Freezer Aquaculture Traceability Ledger',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'batchCode', header: 'Batch Code', render: (v) => `<span class="font-mono font-bold text-[#006C7A] bg-[#E6FCFF] px-2 py-0.5 rounded">${v}</span>` },
        { field: 'farmerName', header: 'Farmer / Cluster', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'pondNo', header: 'Pond', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'harvestDate', header: 'Harvest Date', render: (v) => `<span class="text-[#172B4D]">${v}</span>` },
        { field: 'intakeWeight', header: 'Intake (KG)', render: (v) => `<span class="text-[#5E6C84]">${v.toLocaleString()}</span>` },
        { field: 'deheadedWeight', header: 'Deheaded', render: (v) => `<span class="text-[#5E6C84]">${v.toLocaleString()}</span>` },
        { field: 'gradedWeight', header: 'Graded', render: (v) => `<span class="text-[#5E6C84]">${v.toLocaleString()}</span>` },
        { field: 'packedWeight', header: 'Packed (KG)', render: (v) => `<span class="font-extrabold text-[#006644]">${v.toLocaleString()} KG</span>` },
        { field: 'totalYieldPct', header: 'Net Yield %', render: (v) => `<span class="font-mono font-bold text-[#172B4D]">${v}%</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
  },

  renderVaFloorBalance(container) {
    this.renderFloorOverview(container);
  },

  renderVaTransfer(container) {
    this.renderHonQtyTransfer(container);
  },

  renderAssumedReports(container) {
    this.renderChemicalReceivedReport(container);
  },

  renderConsolidationDaily(container) {
    this.renderFloorOverview(container);
  },

  renderFileUpload(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Batch File Upload & Data Ingestion')}
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-6 shadow-xs text-center">
          <div class="w-12 h-12 rounded-full bg-[#F0F9FF] text-[#0284C7] flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
          </div>
          <h3 class="text-sm font-bold text-[#172B4D]">Drag and drop your spreadsheet here</h3>
          <p class="text-xs text-[#5E6C84] mt-1">Accepts .CSV, .XLSX files up to 25MB (Grading runs, intake scales, chemical orders)</p>
          <div class="mt-4 flex items-center justify-center gap-3">
            <button class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.toastSuccess('Upload triggered')">Browse Files</button>
            <button class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.toastInfo('Downloading CSV template')">Download Template</button>
          </div>
        </div>
      </div>
    `;
  },

  calcDiff() {},
  calcDeheadYield() {
    const qty = parseFloat(document.getElementById('dh-hon-qty')?.value) || 0;
    const yieldEl = document.getElementById('dh-yield');
    if (yieldEl && qty > 0) {
      yieldEl.value = (66.5 + (qty % 3) * 0.5).toFixed(1);
    }
  },

  toastSuccess(msg) { if (typeof Toast !== 'undefined') Toast.show(msg, 'success'); },
  toastInfo(msg) { if (typeof Toast !== 'undefined') Toast.show(msg, 'info'); },
  toastError(msg) { if (typeof Toast !== 'undefined') Toast.show(msg, 'error'); },

  

};
