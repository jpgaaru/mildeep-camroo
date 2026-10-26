import re

print("Implementing Documentation tab in QC Operations and removing Add button from External Lab Report...")

# 1. Update js/components/sidebar.js to make documentation the first/default tab under qc-operations
with open('js/components/sidebar.js', 'r', encoding='utf-8') as f:
    sidebar_content = f.read()

# Check qc-operations in sidebar
old_qc_ops = '''      {
        id: "qc-operations",
        title: "QC Operations",
        defaultTab: "qc-orders",
        tabs: [
          { id: "qc-orders", label: "QC Orders", hash: "#/quality/qc-operations/qc-orders" },
          { id: "documentation", label: "Documentation", hash: "#/quality/qc-operations/documentation" }
        ]
      },'''

new_qc_ops = '''      {
        id: "qc-operations",
        title: "QC Operations",
        defaultTab: "documentation",
        tabs: [
          { id: "documentation", label: "Documentation", hash: "#/quality/qc-operations/documentation" },
          { id: "qc-orders", label: "QC Orders", hash: "#/quality/qc-operations/qc-orders" }
        ]
      },'''

if old_qc_ops in sidebar_content:
    sidebar_content = sidebar_content.replace(old_qc_ops, new_qc_ops)
    with open('js/components/sidebar.js', 'w', encoding='utf-8') as f:
        f.write(sidebar_content)
    print("✓ Updated sidebar.js qc-operations defaultTab to documentation")

# 2. Update QCView.render() branching to include documentation and qc-orders
NEW_BRANCHING = '''    } else if (subPage === 'external-lab-report' || subPage === 'external-lab') {
      this.renderExternalLabReport(subContainer, activeHash);
    } else if (subPage === 'documentation' || subPage === 'qc-documentation' || subPage === 'qc-operations') {
      this.renderDocumentation(subContainer, activeHash);
    } else if (subPage === 'qc-orders' || subPage === 'orders') {
      this.renderQCOrders(subContainer, activeHash);'''

DOCUMENTATION_METHODS = '''
  // ==========================================
  // 7. QC OPERATIONS: DOCUMENTATION
  // ==========================================
  docSelectedYear: '2026-2027',
  docSelectedExporter: 'DEVI FISHERIES LIMITED',
  docSelectedConsignee: 'All',
  docSelectedCountry: 'All',
  docBillsType: 'Completed',
  docSearchQuery: '',

  documentationList: [
    {
      sNo: 1,
      id: 104,
      invoiceNo: 'DFL/KKD/2627/157',
      invoiceDate: '21-10-2026',
      poNo: 'DF/DF-2786',
      buyer: 'DEVI FISHERIES INC.',
      country: 'U.S.A.',
      internalLotNo: 'LOT-2627-0891',
      status: 'Completed',
      certHealth: 'EIA/2026/10492',
      certCoa: 'COA-DFL-2627-157',
      certOrigin: 'COO-IN-2026-8812',
      eiaStatus: 'Approved & Stamped'
    },
    {
      sNo: 2,
      id: 6513,
      invoiceNo: 'DFL/PT/2627/313',
      invoiceDate: '19-09-2026',
      poNo: 'PO1004191',
      buyer: 'STANLEY PEARLMAN ENTERPRISES, INC.',
      country: 'U.S.A.',
      internalLotNo: 'LOT-2627-0842',
      status: 'Completed',
      certHealth: 'EIA/2026/09841',
      certCoa: 'COA-DFL-2627-313',
      certOrigin: 'COO-IN-2026-7731',
      eiaStatus: 'Approved & Stamped'
    },
    {
      sNo: 3,
      id: 6203,
      invoiceNo: 'DFL/PT/2627/312',
      invoiceDate: '19-09-2026',
      poNo: '1102650547',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      country: 'U.S.A.',
      internalLotNo: 'LOT-2627-0839',
      status: 'Completed',
      certHealth: 'EIA/2026/09840',
      certCoa: 'COA-DFL-2627-312',
      certOrigin: 'COO-IN-2026-7729',
      eiaStatus: 'Approved & Stamped'
    },
    {
      sNo: 4,
      id: 6302,
      invoiceNo: 'DFL/PT/2627/311',
      invoiceDate: '19-09-2026',
      poNo: '1102650877',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      country: 'U.S.A.',
      internalLotNo: 'LOT-2627-0835',
      status: 'Completed',
      certHealth: 'EIA/2026/09838',
      certCoa: 'COA-DFL-2627-311',
      certOrigin: 'COO-IN-2026-7725',
      eiaStatus: 'Approved & Stamped'
    },
    {
      sNo: 5,
      id: 5743,
      invoiceNo: 'DFL/PT/2627/310',
      invoiceDate: '18-09-2026',
      poNo: '60150DEV010C',
      buyer: 'CRUSTA C SAS',
      country: 'FRANCE',
      internalLotNo: 'LOT-2627-0812',
      status: 'Completed',
      certHealth: 'EIA/2026/09714 (EU Format)',
      certCoa: 'COA-DFL-2627-310',
      certOrigin: 'COO-IN-2026-7681',
      eiaStatus: 'Approved & Stamped'
    },
    {
      sNo: 6,
      id: 6131,
      invoiceNo: 'DFL/PT/2627/309',
      invoiceDate: '18-09-2026',
      poNo: '1102650475',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      country: 'U.S.A.',
      internalLotNo: 'LOT-2627-0808',
      status: 'Completed',
      certHealth: 'EIA/2026/09712',
      certCoa: 'COA-DFL-2627-309',
      certOrigin: 'COO-IN-2026-7678',
      eiaStatus: 'Approved & Stamped'
    },
    {
      sNo: 7,
      id: 7050,
      invoiceNo: 'DFL/PT/2627/308',
      invoiceDate: '18-09-2026',
      poNo: 'DF/DF-5611',
      buyer: 'DEVI FISHERIES INC.',
      country: 'U.S.A.',
      internalLotNo: 'LOT-2627-0795',
      status: 'Completed',
      certHealth: 'EIA/2026/09710',
      certCoa: 'COA-DFL-2627-308',
      certOrigin: 'COO-IN-2026-7675',
      eiaStatus: 'Approved & Stamped'
    }
  ],

  renderDocumentation(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <!-- Page Header -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">DOCUMENTATION</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">QC Operations &bull; Export Shipment Documentation, Health Certificates &amp; Consignee Register</span>
          </div>
        </div>

        <!-- Upper Search & Filter Card -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="doc-filter-form" class="space-y-4" onsubmit="event.preventDefault(); QCView.handleDocFilter();">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT YEAR</label>
                <select id="doc-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['2026-2027', '2025-2026', '2024-2025', '2023-2024'].map(y => `<option value="${y}" ${this.docSelectedYear === y ? 'selected' : ''}>${y}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT EXPORTER :</label>
                <select id="doc-filter-exporter" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                  <option value="DEVI AQUA FEEDS PRIVATE LIMITED">DEVI AQUA FEEDS PRIVATE LIMITED</option>
                  <option value="DEVI SEAFOODS PVT LTD">DEVI SEAFOODS PVT LTD</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT CONSIGNEE :</label>
                <select id="doc-filter-consignee" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All" selected>All</option>
                  <option value="DEVI FISHERIES INC.">DEVI FISHERIES INC.</option>
                  <option value="STANLEY PEARLMAN ENTERPRISES, INC.">STANLEY PEARLMAN ENTERPRISES, INC.</option>
                  <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                  <option value="CRUSTA C SAS">CRUSTA C SAS</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT COUNTRY:</label>
                <select id="doc-filter-country" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All" selected>All</option>
                  <option value="U.S.A.">U.S.A.</option>
                  <option value="FRANCE">FRANCE</option>
                  <option value="JAPAN">JAPAN</option>
                  <option value="BELGIUM">BELGIUM</option>
                  <option value="U.K.">U.K.</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BILLS TYPE:</label>
                <select id="doc-filter-bills-type" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="Completed" selected>Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="All">All</option>
                </select>
              </div>
            </div>

            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="button" onclick="QCView.resetDocFilter()" class="px-4 py-2 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
                Reset
              </button>
              <button type="submit" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Data Table Card -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <!-- Table Toolbar -->
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="flex items-center gap-3 flex-1 max-w-md">
              <div class="relative w-full">
                <input type="text" id="doc-search-input" onkeyup="QCView.handleDocSearch(this.value)" placeholder="Search by Invoice, PO, Buyer, Country..." class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all"/>
                <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" onclick="QCView.toggleDocMoreSearch()" class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#006C7A] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button type="button" onclick="QCView.loadAllDocRecords()" class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#006C7A] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
              <span id="doc-counter" class="text-xs font-semibold text-[#64748B] ml-2">Showing ${this.documentationList.length} records</span>
            </div>
          </div>

          <!-- Table Content -->
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4">SNO</th>
                  <th class="py-3 px-4">ID</th>
                  <th class="py-3 px-4">Invoice No</th>
                  <th class="py-3 px-4">Invoice Date</th>
                  <th class="py-3 px-4">Po No</th>
                  <th class="py-3 px-4">Buyer</th>
                  <th class="py-3 px-4">Country</th>
                  <th class="py-3 px-4">Internal Lot No</th>
                  <th class="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="doc-table-body" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.renderDocTableRows();
  },

  renderDocTableRows(data) {
    const list = data || this.documentationList;
    const tbody = document.getElementById('doc-table-body');
    if (!tbody) return;

    const counter = document.getElementById('doc-counter');
    if (counter) counter.innerText = `Showing ${list.length} records`;

    tbody.innerHTML = list.map((r, i) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${i % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 text-[#475569] font-medium">${r.id}</td>
        <td class="py-3 px-4 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="QCView.openDocumentationModal(${r.id})">${r.invoiceNo}</td>
        <td class="py-3 px-4 text-[#64748B] whitespace-nowrap">${r.invoiceDate}</td>
        <td class="py-3 px-4 font-semibold text-[#1E293B]">${r.poNo}</td>
        <td class="py-3 px-4 text-[#334155] font-medium">${r.buyer}</td>
        <td class="py-3 px-4">
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-[#334155]">${r.country}</span>
        </td>
        <td class="py-3 px-4 text-[#64748B] font-mono text-[11px]">${r.internalLotNo || '-'}</td>
        <td class="py-3 px-4 text-center">
          <button type="button" onclick="QCView.openDocumentationModal(${r.id})" class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center" title="Edit / View Documentation">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  handleDocSearch(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.renderDocTableRows(this.documentationList);
      return;
    }
    const filtered = this.documentationList.filter(r => 
      r.invoiceNo.toLowerCase().includes(q) ||
      r.poNo.toLowerCase().includes(q) ||
      r.buyer.toLowerCase().includes(q) ||
      r.country.toLowerCase().includes(q) ||
      r.invoiceDate.toLowerCase().includes(q) ||
      String(r.id).includes(q) ||
      (r.internalLotNo && r.internalLotNo.toLowerCase().includes(q))
    );
    this.renderDocTableRows(filtered);
  },

  handleDocFilter() {
    const year = document.getElementById('doc-filter-year')?.value || 'All';
    const consignee = document.getElementById('doc-filter-consignee')?.value || 'All';
    const country = document.getElementById('doc-filter-country')?.value || 'All';

    let list = this.documentationList;
    if (consignee !== 'All') {
      list = list.filter(r => r.buyer.toLowerCase() === consignee.toLowerCase());
    }
    if (country !== 'All') {
      list = list.filter(r => r.country.toLowerCase() === country.toLowerCase());
    }
    this.renderDocTableRows(list);
  },

  resetDocFilter() {
    const y = document.getElementById('doc-filter-year');
    const c = document.getElementById('doc-filter-consignee');
    const ct = document.getElementById('doc-filter-country');
    const s = document.getElementById('doc-search-input');
    if (y) y.value = '2026-2027';
    if (c) c.value = 'All';
    if (ct) ct.value = 'All';
    if (s) s.value = '';
    this.renderDocTableRows(this.documentationList);
  },

  toggleDocMoreSearch() {
    const form = document.getElementById('doc-filter-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const input = document.getElementById('doc-filter-consignee');
      if (input) input.focus();
    }
  },

  loadAllDocRecords() {
    this.resetDocFilter();
  },

  openDocumentationModal(id) {
    const doc = this.documentationList.find(d => d.id === id);
    if (!doc) return;

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: `QC SHIPMENT DOCUMENTATION: ${doc.invoiceNo}`,
      size: 'xl',
      content: `
        <div class="space-y-4 text-xs text-[#1E293B]">
          <!-- Consignment Overview -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">INVOICE NO</span>
              <span class="font-bold text-xs text-[#006C7A] block mt-0.5">${doc.invoiceNo}</span>
            </div>
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">INVOICE DATE</span>
              <span class="font-bold text-xs text-[#1E293B] block mt-0.5">${doc.invoiceDate}</span>
            </div>
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">PO NUMBER</span>
              <span class="font-bold text-xs text-[#1E293B] block mt-0.5">${doc.poNo}</span>
            </div>
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">DESTINATION</span>
              <span class="font-bold text-xs text-[#1E293B] block mt-0.5">${doc.country}</span>
            </div>
          </div>

          <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3 flex items-center justify-between">
            <div>
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">CONSIGNEE / BUYER</span>
              <span class="font-bold text-xs text-[#1E293B] block mt-0.5">${doc.buyer}</span>
            </div>
            <span class="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Bills Status: ${doc.status}
            </span>
          </div>

          <!-- Documentation Verification Checklist -->
          <div class="border border-[#CBD5E1] rounded-lg overflow-hidden">
            <div class="bg-[#F8FAFC] px-3.5 py-2.5 border-b border-[#E2E8F0] flex items-center justify-between">
              <span class="text-[11px] font-bold text-[#475569] uppercase tracking-wider">QC &amp; Export Regulatory Document Checklist</span>
              <span class="text-[10px] text-[#02a8b5] font-bold">100% Verified</span>
            </div>
            <table class="w-full text-left border-collapse text-xs">
              <tbody class="divide-y divide-[#F1F5F9]">
                <tr>
                  <td class="py-2.5 px-3 font-semibold text-[#1E293B]">Health Certificate (EIA / MPEDA)</td>
                  <td class="py-2.5 px-3 font-mono text-[#006C7A]">${doc.certHealth || 'EIA/2026/10492'}</td>
                  <td class="py-2.5 px-3 text-right"><span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">Attached &amp; Stamped</span></td>
                </tr>
                <tr class="bg-slate-50/40">
                  <td class="py-2.5 px-3 font-semibold text-[#1E293B]">Certificate of Analysis (COA)</td>
                  <td class="py-2.5 px-3 font-mono text-[#006C7A]">${doc.certCoa || 'COA-DFL-2627'}</td>
                  <td class="py-2.5 px-3 text-right"><span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">Lab Approved</span></td>
                </tr>
                <tr>
                  <td class="py-2.5 px-3 font-semibold text-[#1E293B]">Certificate of Origin (COO)</td>
                  <td class="py-2.5 px-3 font-mono text-[#006C7A]">${doc.certOrigin || 'COO-IN-2026'}</td>
                  <td class="py-2.5 px-3 text-right"><span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">Issued</span></td>
                </tr>
                <tr class="bg-slate-50/40">
                  <td class="py-2.5 px-3 font-semibold text-[#1E293B]">Reefer Temperature &amp; Data Logger Log</td>
                  <td class="py-2.5 px-3 text-[#64748B]">-18.0 &deg;C Maintained Continuous</td>
                  <td class="py-2.5 px-3 text-right"><span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">Compliant</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Edit Internal Lot No -->
          <div class="bg-white border border-[#CBD5E1] rounded-lg p-3.5 space-y-2">
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider">INTERNAL LOT NO</label>
            <div class="flex items-center gap-2">
              <input type="text" id="modal-edit-lot-no" value="${doc.internalLotNo || ''}" placeholder="Enter internal lot reference (e.g. LOT-2627-0891)" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
              <button type="button" onclick="QCView.saveDocLotNo(${doc.id})" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs transition-all whitespace-nowrap cursor-pointer">
                Update Lot
              </button>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="flex items-center justify-end gap-3 pt-2">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if (m && m.close) m.close();" class="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
              Close
            </button>
          </div>
        </div>
      `
    });
  },

  saveDocLotNo(id) {
    const input = document.getElementById('modal-edit-lot-no');
    if (!input) return;
    const val = input.value.trim();
    const doc = this.documentationList.find(d => d.id === id);
    if (doc) {
      doc.internalLotNo = val;
      this.renderDocTableRows();
      if (typeof Toast !== 'undefined' && Toast.show) {
        Toast.show(`Internal Lot No updated for ${doc.invoiceNo}`, 'success');
      }
    }
    const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal;
    if (m && m.close) m.close();
  },

  // QC Orders Tab
  renderQCOrders(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">QC ORDERS &amp; CLEARANCE REGISTER</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">QC Operations &bull; Production Order Clearances &amp; Pre-Shipment Inspection Status</span>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ORDER STATUS</label>
              <select class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="All" selected>All Orders</option>
                <option value="QC Cleared">QC Cleared</option>
                <option value="Under Inspection">Under Inspection</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BUYER</label>
              <select class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="All" selected>All Buyers</option>
                <option value="DEVI FISHERIES INC.">DEVI FISHERIES INC.</option>
                <option value="STANLEY PEARLMAN ENTERPRISES">STANLEY PEARLMAN ENTERPRISES</option>
              </select>
            </div>
            <div class="flex items-end">
              <button type="button" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter Orders</span>
              </button>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4">Order ID</th>
                  <th class="py-3 px-4">PO No</th>
                  <th class="py-3 px-4">Buyer</th>
                  <th class="py-3 px-4">Product / Grade</th>
                  <th class="py-3 px-4 text-right">Quantity (Kg)</th>
                  <th class="py-3 px-4 text-center">QC Status</th>
                  <th class="py-3 px-4 text-center">Release Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]">
                <tr class="hover:bg-[#F8FAFC]">
                  <td class="py-3 px-4 font-bold text-[#006C7A]">ORD-2026-8801</td>
                  <td class="py-3 px-4 font-semibold text-[#1E293B]">DF/DF-2786</td>
                  <td class="py-3 px-4 text-[#334155]">DEVI FISHERIES INC.</td>
                  <td class="py-3 px-4 text-[#475569]">Vannamei HLSO 16/20 IQF</td>
                  <td class="py-3 px-4 text-right font-bold text-[#1E293B]">18,500.00</td>
                  <td class="py-3 px-4 text-center"><span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">QC Passed</span></td>
                  <td class="py-3 px-4 text-center"><span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">Released</span></td>
                </tr>
                <tr class="hover:bg-[#F8FAFC] bg-slate-50/40">
                  <td class="py-3 px-4 font-bold text-[#006C7A]">ORD-2026-8802</td>
                  <td class="py-3 px-4 font-semibold text-[#1E293B]">PO1004191</td>
                  <td class="py-3 px-4 text-[#334155]">STANLEY PEARLMAN ENTERPRISES</td>
                  <td class="py-3 px-4 text-[#475569]">Black Tiger PDTO 21/25 Block</td>
                  <td class="py-3 px-4 text-right font-bold text-[#1E293B]">12,000.00</td>
                  <td class="py-3 px-4 text-center"><span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">QC Passed</span></td>
                  <td class="py-3 px-4 text-center"><span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">Released</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
'''

for filepath in ['js/views/qcView.js', 'miledeep-devi-fisheries.html', 'standalone.html']:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove the "Add External Report" button from renderExternalLabReport
    # Look for button in renderExternalLabReport
    btn_regex = re.compile(r'<div class="flex items-center gap-2">\s*<button type="button" class="px-5 py-2 bg-\[#02a8b5\][^"]*"[^>]*>\s*<svg[^>]*>[\s\S]*?</svg>\s*<span>Add External Report</span>\s*</button>\s*</div>')
    if btn_regex.search(content):
        content = btn_regex.sub('<!-- No add button as per user instruction -->', content)
        print(f"✓ Removed Add External Report button in {filepath}")

    # 2. Update QCView.render() branching
    old_ext_branch = '''    } else if (subPage === 'external-lab-report' || subPage === 'external-lab') {
      this.renderExternalLabReport(subContainer, activeHash);'''
    if old_ext_branch in content and 'renderDocumentation' not in content:
        content = content.replace(old_ext_branch, NEW_BRANCHING)
        print(f"✓ Updated QCView.render branching in {filepath}")

    # 3. Append Documentation & QC Orders methods before the end of QCView object
    # Find the end of renderExternalLabReport
    end_marker = '''    `;
  }

};'''
    if end_marker in content and 'renderDocumentation' not in content:
        replacement = '''    `;
  },
''' + DOCUMENTATION_METHODS + '''

};'''
        content = content.replace(end_marker, replacement, 1)
        print(f"✓ Added renderDocumentation & renderQCOrders methods in {filepath}")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done updating files!")
