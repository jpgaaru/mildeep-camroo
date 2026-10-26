import re

print("Starting clean implementation of Chemical Screening child screens & QC views...")

SIDEBAR_REPLACEMENT_QC_OPS = '''      {
        id: "qc-operations",
        title: "QC Operations",
        defaultTab: "documentation",
        tabs: [
          { id: "documentation", label: "Documentation", hash: "#/quality/qc-operations/documentation" },
          { id: "qc-orders", label: "QC Orders", hash: "#/quality/qc-operations/qc-orders" }
        ]
      },
      {
        id: "chemical-screening",
        title: "Chemical Screening",
        defaultTab: "food-social-audit",
        tabs: [
          { id: "food-social-audit", label: "Food & Social Audit", hash: "#/quality/chemical-screening/food-social-audit" },
          { id: "farm-mill-hatchery-audit", label: "Farm/Mill/Hatchery Audit", hash: "#/quality/chemical-screening/farm-mill-hatchery-audit" },
          { id: "hatchery-list", label: "Hatchery List", hash: "#/quality/chemical-screening/hatchery-list" }
        ]
      },'''

# 1. Update js/components/sidebar.js
with open('js/components/sidebar.js', 'r', encoding='utf-8') as f:
    s_content = f.read()

s_regex = re.compile(r'\{\s*id:\s*"qc-operations"[\s\S]*?id:\s*"chemical-screening"[\s\S]*?\}\s*\]\s*\},', re.MULTILINE)
if s_regex.search(s_content):
    s_content = s_regex.sub(SIDEBAR_REPLACEMENT_QC_OPS, s_content)
    with open('js/components/sidebar.js', 'w', encoding='utf-8') as f:
        f.write(s_content)
    print("✓ Updated sidebar.js with qc-operations and chemical-screening tabs")

# 2. Complete clean methods for QC Operations and Chemical Screening
FULL_ADDITIONAL_CODE = '''
  // ==========================================
  // 7. QC OPERATIONS: DOCUMENTATION
  // ==========================================
  docSelectedYear: '2026-2027',
  docSelectedExporter: 'DEVI FISHERIES LIMITED',
  docSelectedConsignee: 'All',
  docSelectedCountry: 'All',
  docBillsType: 'Completed',

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
      certOrigin: 'COO-IN-2026-8812'
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
      certOrigin: 'COO-IN-2026-7731'
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
      certOrigin: 'COO-IN-2026-7729'
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
      certOrigin: 'COO-IN-2026-7725'
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
      certOrigin: 'COO-IN-2026-7681'
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
      certOrigin: 'COO-IN-2026-7678'
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
      certOrigin: 'COO-IN-2026-7675'
    }
  ],

  renderDocumentation(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">DOCUMENTATION</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">QC Operations &bull; Export Shipment Documentation, Health Certificates &amp; Consignee Register</span>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="doc-filter-form" class="space-y-4" onsubmit="event.preventDefault(); QCView.handleDocFilter();">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT YEAR</label>
                <select id="doc-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  ${['2026-2027', '2025-2026', '2024-2025'].map(y => `<option value="${y}" ${this.docSelectedYear === y ? 'selected' : ''}>${y}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT EXPORTER :</label>
                <select id="doc-filter-exporter" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                  <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT CONSIGNEE :</label>
                <select id="doc-filter-consignee" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  <option value="All" selected>All</option>
                  <option value="DEVI FISHERIES INC.">DEVI FISHERIES INC.</option>
                  <option value="STANLEY PEARLMAN ENTERPRISES, INC.">STANLEY PEARLMAN ENTERPRISES, INC.</option>
                  <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                  <option value="CRUSTA C SAS">CRUSTA C SAS</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT COUNTRY:</label>
                <select id="doc-filter-country" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  <option value="All" selected>All</option>
                  <option value="U.S.A.">U.S.A.</option>
                  <option value="FRANCE">FRANCE</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BILLS TYPE:</label>
                <select id="doc-filter-bills-type" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  <option value="Completed" selected>Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="All">All</option>
                </select>
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="submit" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <span>Search</span>
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input type="text" id="doc-search-input" onkeyup="QCView.handleDocSearch(this.value)" placeholder="Search by Invoice, PO, Buyer, Country..." class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] transition-all"/>
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" onclick="const s = document.getElementById('doc-search-input'); if(s) s.focus();" class="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#006C7A] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button type="button" onclick="QCView.renderDocTableRows(QCView.documentationList)" class="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#006C7A] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
              <span id="doc-counter" class="text-xs font-semibold text-[#64748B] ml-2">Showing ${this.documentationList.length} records</span>
            </div>
          </div>
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

    tbody.innerHTML = list.map((r, i) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${i % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 text-[#475569] font-medium">${r.id}</td>
        <td class="py-3 px-4 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="QCView.openDocumentationModal(${r.id})">${r.invoiceNo}</td>
        <td class="py-3 px-4 text-[#64748B] whitespace-nowrap">${r.invoiceDate}</td>
        <td class="py-3 px-4 font-semibold text-[#1E293B]">${r.poNo}</td>
        <td class="py-3 px-4 text-[#334155] font-medium">${r.buyer}</td>
        <td class="py-3 px-4"><span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-[#334155]">${r.country}</span></td>
        <td class="py-3 px-4 text-[#64748B] font-mono text-[11px]">${r.internalLotNo || '-'}</td>
        <td class="py-3 px-4 text-center">
          <button type="button" onclick="QCView.openDocumentationModal(${r.id})" class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center" title="Edit Documentation">
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
      r.country.toLowerCase().includes(q)
    );
    this.renderDocTableRows(filtered);
  },

  handleDocFilter() {
    const consignee = document.getElementById('doc-filter-consignee')?.value || 'All';
    let list = this.documentationList;
    if (consignee !== 'All') {
      list = list.filter(r => r.buyer.toLowerCase() === consignee.toLowerCase());
    }
    this.renderDocTableRows(list);
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
          <div class="flex items-center justify-end pt-2">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if(m && m.close) m.close();" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer">
              Close
            </button>
          </div>
        </div>
      `
    });
  },

  renderQCOrders(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">QC ORDERS &amp; CLEARANCE REGISTER</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">QC Operations &bull; Production Order Clearances &amp; Pre-Shipment Inspection Status</span>
          </div>
        </div>
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-6 text-center text-xs text-[#64748B]">
          QC Orders Register loaded and active.
        </div>
      </div>
    `;
  },

  // ==========================================
  // 8. CHEMICAL SCREENING: TAB 1 - FOOD & SOCIAL AUDIT
  // ==========================================
  foodSocialAuditList: [
    {
      sNo: 1,
      auditType: 'Hatchery',
      farmName: 'DeviFishires Hatchry-2',
      farmerName: 'TADIPUDI VENKATA RAMA RAJU',
      hatcheryLocation: 'Uppada',
      certifiedBody: 'AOC',
      associatedFactory: 'DFL UNIT-5 (JPT)',
      govAuthority: 'MPEDA',
      govRegNumber: '3423',
      bapNumber: '6756',
      tonnagePerAnnum: '50',
      waterSpreadArea: '20',
      auditDate: '08-01-2024'
    },
    {
      sNo: 2,
      auditType: 'Farm',
      farmName: 'DeviFishires Hatchry-1',
      farmerName: 'KANTHETI BALARAMA RAJU',
      hatcheryLocation: 'Kakinada',
      certifiedBody: 'BAP',
      associatedFactory: 'DFL UNIT-5 (JPT)',
      govAuthority: 'MPEDA',
      govRegNumber: '1222555',
      bapNumber: '122555',
      tonnagePerAnnum: '12551',
      waterSpreadArea: '1325',
      auditDate: '01-10-2026'
    },
    {
      sNo: 3,
      auditType: 'Feed Mill',
      farmName: 'DeviFishires Hatchry-1',
      farmerName: 'TADIPUDI VENKATA RAMA RAJU',
      hatcheryLocation: 'Kakinada',
      certifiedBody: 'AOC',
      associatedFactory: 'DFL UNIT-3 (PSP)',
      govAuthority: 'MPEDA',
      govRegNumber: '1222555',
      bapNumber: '122555',
      tonnagePerAnnum: '12551',
      waterSpreadArea: '1325',
      auditDate: '09-10-2026'
    }
  ],

  renderFoodSocialAudit(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">FOOD &amp; SOCIAL AUDIT</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screening &bull; Farm, Hatchery &amp; Feed Mill Compliance Audit Register</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="QCView.openAddMillModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Mill</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form class="space-y-4" onsubmit="event.preventDefault(); QCView.handleFoodAuditFilter();">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">AUDIT TYPE</label>
                <select id="food-audit-filter-type" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  <option value="All" selected>All</option>
                  <option value="Hatchery">Hatchery</option>
                  <option value="Farm">Farm</option>
                  <option value="Feed Mill">Feed Mill</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="food-audit-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  <option value="2026-27" selected>2026-27</option>
                  <option value="2025-26">2025-26</option>
                </select>
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="submit" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <span>Search</span>
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input type="text" id="food-audit-search-input" onkeyup="QCView.handleFoodAuditSearch(this.value)" placeholder="Search audits, farms, farmers..." class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] transition-all"/>
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <span id="food-audit-counter" class="text-xs font-semibold text-[#64748B]">Showing 1 to 3 out of 3 entries</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none whitespace-nowrap">
                  <th class="py-3 px-4">S.NO</th>
                  <th class="py-3 px-4">Audit Type</th>
                  <th class="py-3 px-4">Farm Name</th>
                  <th class="py-3 px-4">Farmer Name</th>
                  <th class="py-3 px-4">Hatchry Location</th>
                  <th class="py-3 px-4">Certified Body</th>
                  <th class="py-3 px-4">Associated Factory</th>
                  <th class="py-3 px-4">Government Authority</th>
                  <th class="py-3 px-4">Gov Registration Number</th>
                  <th class="py-3 px-4">BAP Number</th>
                  <th class="py-3 px-4 text-right">Tonnage/Annum</th>
                  <th class="py-3 px-4 text-right">Water Spread Area</th>
                  <th class="py-3 px-4 text-center">Audit Date</th>
                </tr>
              </thead>
              <tbody id="food-audit-tbody" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B] whitespace-nowrap">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.renderFoodAuditTableRows();
  },

  renderFoodAuditTableRows(data) {
    const list = data || this.foodSocialAuditList;
    const tbody = document.getElementById('food-audit-tbody');
    if (!tbody) return;

    tbody.innerHTML = list.map((r, i) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${i % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 font-semibold text-[#006C7A]">${r.auditType}</td>
        <td class="py-3 px-4 text-[#334155] font-medium">${r.farmName}</td>
        <td class="py-3 px-4 text-[#1E293B] font-semibold">${r.farmerName}</td>
        <td class="py-3 px-4 text-[#64748B]">${r.hatcheryLocation}</td>
        <td class="py-3 px-4"><span class="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-[#334155]">${r.certifiedBody}</span></td>
        <td class="py-3 px-4 text-[#334155] font-medium">${r.associatedFactory}</td>
        <td class="py-3 px-4 text-[#64748B]">${r.govAuthority}</td>
        <td class="py-3 px-4 font-mono text-[#475569]">${r.govRegNumber}</td>
        <td class="py-3 px-4 font-mono text-[#006C7A] font-semibold">${r.bapNumber}</td>
        <td class="py-3 px-4 text-right font-bold text-[#1E293B]">${r.tonnagePerAnnum}</td>
        <td class="py-3 px-4 text-right font-medium text-[#475569]">${r.waterSpreadArea}</td>
        <td class="py-3 px-4 text-center text-[#64748B] font-mono">${r.auditDate}</td>
      </tr>
    `).join('');
  },

  handleFoodAuditSearch(q) {
    const query = (q || '').toLowerCase().trim();
    if (!query) {
      this.renderFoodAuditTableRows(this.foodSocialAuditList);
      return;
    }
    const filtered = this.foodSocialAuditList.filter(r =>
      r.auditType.toLowerCase().includes(query) ||
      r.farmName.toLowerCase().includes(query) ||
      r.farmerName.toLowerCase().includes(query) ||
      r.hatcheryLocation.toLowerCase().includes(query)
    );
    this.renderFoodAuditTableRows(filtered);
  },

  handleFoodAuditFilter() {
    const type = document.getElementById('food-audit-filter-type')?.value || 'All';
    let list = this.foodSocialAuditList;
    if (type !== 'All') {
      list = list.filter(r => r.auditType.toLowerCase() === type.toLowerCase());
    }
    this.renderFoodAuditTableRows(list);
  },

  // EXACT CHILD SCREEN 1: FS AUDIT MILL CREATE
  openAddMillModal() {
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    const todayStr = new Date().toISOString().split('T')[0];

    m.open({
      title: 'FS AUDIT MILL CREATE',
      size: '2xl',
      content: `
        <form class="space-y-4 text-xs text-[#1E293B]" onsubmit="event.preventDefault(); QCView.handleFSAuditMillSubmit();">
          <!-- Row 1: AUDIT TYPE, FARMER NAME, HATCHERY NAME, CERTIFIED BODY -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT TYPE <span class="text-rose-500">*</span></label>
              <select id="fs-audit-type" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="Hatchery">Hatchery</option>
                <option value="Farm">Farm</option>
                <option value="Feed Mill" selected>Feed Mill</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">FARMER NAME <span class="text-rose-500">*</span></label>
              <select id="fs-farmer-name" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="TADIPUDI VENKATA RAMA RAJU" selected>TADIPUDI VENKATA RAMA RAJU</option>
                <option value="KANTHETI BALARAMA RAJU">KANTHETI BALARAMA RAJU</option>
                <option value="D. V. SUBBA RAJU">D. V. SUBBA RAJU</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">HATCHERY NAME <span class="text-rose-500">*</span></label>
              <select id="fs-hatchery-name" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="DeviFishires Hatchry-1" selected>DeviFishires Hatchry-1</option>
                <option value="DeviFishires Hatchry-2">DeviFishires Hatchry-2</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">CERTIFIED BODY <span class="text-rose-500">*</span></label>
              <select id="fs-certified-body" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="AOC" selected>AOC</option>
                <option value="BAP">BAP</option>
                <option value="ASC">ASC</option>
              </select>
            </div>
          </div>

          <!-- Row 2: ASSOCIATED FACTORY, GOVERNMENT AUTHORITY, GOV REG NUMBER, BAP NUMBER -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">ASSOCIATED FACTORY <span class="text-rose-500">*</span></label>
              <select id="fs-associated-factory" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="DFL UNIT-5 (JPT)" selected>DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                <option value="DFL UNIT-1">DFL UNIT-1</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">GOVERNMENT AUTHORITY <span class="text-rose-500">*</span></label>
              <select id="fs-gov-authority" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="MPEDA" selected>MPEDA</option>
                <option value="CAA">CAA</option>
                <option value="EIA">EIA</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">GOV REGISTRATION NUMBER <span class="text-rose-500">*</span></label>
              <input type="text" id="fs-gov-reg-no" placeholder="Enter Registration Number" value="1222555" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">BAP NUMBER <span class="text-rose-500">*</span></label>
              <input type="text" id="fs-bap-number" placeholder="Enter BAP Number" value="122555" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>

          <!-- Row 3: TONNAGE/ANNUM, WATER SPREAD AREA, AUDIT DATE, ISSUED ON DATE -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">TONNAGE/ANNUM <span class="text-rose-500">*</span></label>
              <input type="text" id="fs-tonnage" placeholder="Enter Tonnage/Annum Number" value="12551" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">WATER SPREAD AREA <span class="text-rose-500">*</span></label>
              <input type="text" id="fs-water-area" placeholder="Enter Water Spread Area" value="1325" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT DATE <span class="text-rose-500">*</span></label>
              <input type="date" id="fs-audit-date" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">ISSUED ON DATE <span class="text-rose-500">*</span></label>
              <input type="date" id="fs-issued-date" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>

          <!-- Row 4: VALID UPTO, STATUS -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">VALID UPTO <span class="text-rose-500">*</span></label>
              <input type="date" id="fs-valid-upto" value="2027-10-26" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">STATUS <span class="text-rose-500">*</span></label>
              <select id="fs-status" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="Active" selected>Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if(m && m.close) m.close();" class="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
              Close
            </button>
            <button type="submit" class="px-6 py-2.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <span>Save</span>
            </button>
          </div>
        </form>
      `
    });
  },

  handleFSAuditMillSubmit() {
    const type = document.getElementById('fs-audit-type')?.value || 'Feed Mill';
    const farmer = document.getElementById('fs-farmer-name')?.value || 'Owner';
    const hatchery = document.getElementById('fs-hatchery-name')?.value || 'DeviFishires Hatchry-1';
    const body = document.getElementById('fs-certified-body')?.value || 'AOC';
    const factory = document.getElementById('fs-associated-factory')?.value || 'DFL UNIT-5 (JPT)';
    const auth = document.getElementById('fs-gov-authority')?.value || 'MPEDA';
    const reg = document.getElementById('fs-gov-reg-no')?.value || '12345';
    const bap = document.getElementById('fs-bap-number')?.value || '6789';
    const tonnage = document.getElementById('fs-tonnage')?.value || '1000';
    const area = document.getElementById('fs-water-area')?.value || '100';

    this.foodSocialAuditList.unshift({
      sNo: this.foodSocialAuditList.length + 1,
      auditType: type,
      farmName: hatchery,
      farmerName: farmer,
      hatcheryLocation: 'Kakinada',
      certifiedBody: body,
      associatedFactory: factory,
      govAuthority: auth,
      govRegNumber: reg,
      bapNumber: bap,
      tonnagePerAnnum: tonnage,
      waterSpreadArea: area,
      auditDate: new Date().toLocaleDateString('en-GB').replace(/\\//g, '-')
    });

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : window.Modal;
    if (m && m.close) m.close();

    this.renderFoodAuditTableRows();
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('FS Audit Mill record saved successfully!', 'success');
    }
  },

  // ==========================================
  // 9. CHEMICAL SCREENING: TAB 2 - FARM/MILL/HATCHERY AUDIT
  // ==========================================
  farmMillAuditList: [
    {
      sNo: 1,
      plantName: 'DFL UNIT-5 (JPT)',
      auditName: 'APCB',
      auditType: 'SOCIAL',
      certAuthority: 'Authority1',
      regNumber: '89765',
      certNumber: '3456',
      startDate: '12-01-2024',
      endDate: '14-01-2024',
      program: 'Announced',
      issuedOn: '14-01-2023',
      validUpto: '15-01-2024',
      renewalDate: '16-01-2024',
      grade: 'GradeA'
    },
    {
      sNo: 2,
      plantName: 'DFL UNIT-3 (PSP)',
      auditName: 'APCB',
      auditType: 'FOOD',
      certAuthority: 'Authority1',
      regNumber: '12345',
      certNumber: '67890',
      startDate: '19-03-2024',
      endDate: '20-03-2024',
      program: 'Announced',
      issuedOn: '20-03-2024',
      validUpto: '22-03-2024',
      renewalDate: '23-03-2024',
      grade: 'GradeA'
    }
  ],

  renderFarmMillHatcheryAudit(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">FARM/MILL/HATCHERY AUDIT</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screening &bull; Plant Certifications, APCB &amp; External Verification Registry</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="QCView.openAddFarmAuditModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Audit</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form class="space-y-4" onsubmit="event.preventDefault(); QCView.handleFarmAuditFilter();">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT</label>
                <select id="farm-audit-filter-plant" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  <option value="Select" selected>Select Plant</option>
                  <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                  <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                  <option value="DFL UNIT-1">DFL UNIT-1</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="farm-audit-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  <option value="2026-27" selected>2026-27</option>
                  <option value="2025-26">2025-26</option>
                </select>
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="submit" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <span>Search</span>
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input type="text" id="farm-audit-search-input" onkeyup="QCView.handleFarmAuditSearch(this.value)" placeholder="Search audits, plant names..." class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] transition-all"/>
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <span id="farm-audit-counter" class="text-xs font-semibold text-[#64748B]">Showing ${this.farmMillAuditList.length} records</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none whitespace-nowrap">
                  <th class="py-3 px-4">S.NO</th>
                  <th class="py-3 px-4">Plant Name</th>
                  <th class="py-3 px-4">Audit Name</th>
                  <th class="py-3 px-4">Audit Type</th>
                  <th class="py-3 px-4">Certification Authority</th>
                  <th class="py-3 px-4">Registration Number</th>
                  <th class="py-3 px-4">Certification Number</th>
                  <th class="py-3 px-4">Audit Start Date</th>
                  <th class="py-3 px-4">Audit End Date</th>
                  <th class="py-3 px-4">Audit Program</th>
                  <th class="py-3 px-4">Issued On</th>
                  <th class="py-3 px-4">Valid Upto</th>
                  <th class="py-3 px-4">Renewal Date</th>
                  <th class="py-3 px-4 text-center">Audit Grade</th>
                </tr>
              </thead>
              <tbody id="farm-audit-tbody" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B] whitespace-nowrap">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.renderFarmAuditTableRows();
  },

  renderFarmAuditTableRows(data) {
    const list = data || this.farmMillAuditList;
    const tbody = document.getElementById('farm-audit-tbody');
    if (!tbody) return;

    tbody.innerHTML = list.map((r, i) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${i % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 font-bold text-[#006C7A]">${r.plantName}</td>
        <td class="py-3 px-4 text-[#334155] font-semibold">${r.auditName}</td>
        <td class="py-3 px-4"><span class="inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${r.auditType === 'FOOD' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}">${r.auditType}</span></td>
        <td class="py-3 px-4 text-[#475569] font-medium">${r.certAuthority}</td>
        <td class="py-3 px-4 font-mono text-[#334155]">${r.regNumber}</td>
        <td class="py-3 px-4 font-mono text-[#006C7A] font-semibold">${r.certNumber}</td>
        <td class="py-3 px-4 text-[#64748B] font-mono">${r.startDate}</td>
        <td class="py-3 px-4 text-[#64748B] font-mono">${r.endDate}</td>
        <td class="py-3 px-4 text-[#334155] font-medium">${r.program}</td>
        <td class="py-3 px-4 text-[#64748B] font-mono">${r.issuedOn}</td>
        <td class="py-3 px-4 text-[#64748B] font-mono">${r.validUpto}</td>
        <td class="py-3 px-4 text-[#64748B] font-mono">${r.renewalDate}</td>
        <td class="py-3 px-4 text-center">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${r.grade}</span>
        </td>
      </tr>
    `).join('');
  },

  handleFarmAuditSearch(q) {
    const query = (q || '').toLowerCase().trim();
    if (!query) {
      this.renderFarmAuditTableRows(this.farmMillAuditList);
      return;
    }
    const filtered = this.farmMillAuditList.filter(r =>
      r.plantName.toLowerCase().includes(query) ||
      r.auditName.toLowerCase().includes(query) ||
      r.certNumber.toLowerCase().includes(query)
    );
    this.renderFarmAuditTableRows(filtered);
  },

  handleFarmAuditFilter() {
    const plant = document.getElementById('farm-audit-filter-plant')?.value || 'Select';
    let list = this.farmMillAuditList;
    if (plant !== 'Select') {
      list = list.filter(r => r.plantName.toLowerCase().includes(plant.toLowerCase()));
    }
    this.renderFarmAuditTableRows(list);
  },

  // EXACT CHILD SCREEN 2: FS AUDIT CREATE
  openAddFarmAuditModal() {
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    const todayStr = new Date().toISOString().split('T')[0];

    m.open({
      title: 'FS AUDIT CREATE',
      size: '2xl',
      content: `
        <form class="space-y-4 text-xs text-[#1E293B]" onsubmit="event.preventDefault(); QCView.handleFSAuditCreateSubmit();">
          <!-- Row 1: PLANT NAME, AUDIT NAME, AUDIT TYPE, CERTIFICATE AUTHORITY -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">PLANT NAME <span class="text-rose-500">*</span></label>
              <select id="fs-plant-name" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="DFL UNIT-5 (JPT)" selected>DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                <option value="DFL UNIT-1">DFL UNIT-1</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT NAME <span class="text-rose-500">*</span></label>
              <select id="fs-audit-name" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="APCB" selected>APCB</option>
                <option value="BAP">BAP</option>
                <option value="BRCGS">BRCGS</option>
                <option value="HACCP">HACCP</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT TYPE <span class="text-rose-500">*</span></label>
              <select id="fs-create-audit-type" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="SOCIAL" selected>SOCIAL</option>
                <option value="FOOD">FOOD</option>
                <option value="ENVIRONMENTAL">ENVIRONMENTAL</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">CERTIFICATE AUTHORITY <span class="text-rose-500">*</span></label>
              <select id="fs-cert-authority" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="Authority1" selected>Authority1</option>
                <option value="MPEDA">MPEDA</option>
                <option value="APPCB">APPCB</option>
              </select>
            </div>
          </div>

          <!-- Row 2: REGISTRATION NUMBER, CERTIFICATE NUMBER, AUDIT START DATE, AUDIT END DATE -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">REGISTRATION NUMBER <span class="text-rose-500">*</span></label>
              <input type="text" id="fs-reg-number" placeholder="Enter Registration Number" value="89765" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">CERTIFICATE NUMBER <span class="text-rose-500">*</span></label>
              <input type="text" id="fs-cert-number" placeholder="Enter Certificate Number" value="3456" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT START DATE <span class="text-rose-500">*</span></label>
              <input type="date" id="fs-start-date" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT END DATE <span class="text-rose-500">*</span></label>
              <input type="date" id="fs-end-date" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>

          <!-- Row 3: AUDIT PROGRAM, ISSUED ON, VALID UPTO, RENEWAL DATE -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT PROGRAM <span class="text-rose-500">*</span></label>
              <select id="fs-audit-program" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="Announced" selected>Announced</option>
                <option value="Unannounced">Unannounced</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">ISSUED ON <span class="text-rose-500">*</span></label>
              <input type="date" id="fs-cert-issued-on" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">VALID UPTO <span class="text-rose-500">*</span></label>
              <input type="date" id="fs-cert-valid-upto" value="2027-10-26" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">RENEWAL DATE <span class="text-rose-500">*</span></label>
              <input type="date" id="fs-cert-renewal-date" value="2027-10-27" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>

          <!-- Row 4: AUDIT GRADE, STATUS -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT GRADE <span class="text-rose-500">*</span></label>
              <select id="fs-audit-grade" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="GradeA" selected>GradeA</option>
                <option value="GradeA+">GradeA+</option>
                <option value="GradeB">GradeB</option>
                <option value="Pass">Pass</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">STATUS <span class="text-rose-500">*</span></label>
              <select id="fs-create-status" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="Active" selected>Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if(m && m.close) m.close();" class="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
              Close
            </button>
            <button type="submit" class="px-6 py-2.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <span>Save</span>
            </button>
          </div>
        </form>
      `
    });
  },

  handleFSAuditCreateSubmit() {
    const plant = document.getElementById('fs-plant-name')?.value || 'DFL UNIT-5 (JPT)';
    const name = document.getElementById('fs-audit-name')?.value || 'APCB';
    const type = document.getElementById('fs-create-audit-type')?.value || 'SOCIAL';
    const auth = document.getElementById('fs-cert-authority')?.value || 'Authority1';
    const reg = document.getElementById('fs-reg-number')?.value || '12345';
    const cert = document.getElementById('fs-cert-number')?.value || '67890';
    const grade = document.getElementById('fs-audit-grade')?.value || 'GradeA';

    this.farmMillAuditList.unshift({
      sNo: this.farmMillAuditList.length + 1,
      plantName: plant,
      auditName: name,
      auditType: type,
      certAuthority: auth,
      regNumber: reg,
      certNumber: cert,
      startDate: '26-10-2026',
      endDate: '28-10-2026',
      program: 'Announced',
      issuedOn: '26-10-2026',
      validUpto: '26-10-2027',
      renewalDate: '27-10-2027',
      grade: grade
    });

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : window.Modal;
    if (m && m.close) m.close();

    this.renderFarmAuditTableRows();
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('FS Audit record saved successfully!', 'success');
    }
  },

  // ==========================================
  // 10. CHEMICAL SCREENING: TAB 3 - HATCHERY LIST
  // ==========================================
  hatcheryListData: [
    { sNo: 1, name: 'DeviFishires Hatchry-1', location: 'Kakinada', capacity: '5 Tonnes' },
    { sNo: 2, name: 'DeviFishires Hatchry-2', location: 'Uppada', capacity: '3 Tonnes' }
  ],

  renderHatcheryList(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">HATCHERY LIST</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screening &bull; Registered Aquaculture Hatchery Sources &amp; Capacities</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="QCView.openAddHatcheryModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Hatchery</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input type="text" id="hatchery-search-input" onkeyup="QCView.handleHatcherySearch(this.value)" placeholder="Search hatchery by name, location..." class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] transition-all"/>
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" onclick="const s = document.getElementById('hatchery-search-input'); if(s) s.focus();" class="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#006C7A] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button type="button" onclick="QCView.renderHatcheryTableRows(QCView.hatcheryListData)" class="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#006C7A] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4">S.No</th>
                  <th class="py-3 px-4">Hatchery Name</th>
                  <th class="py-3 px-4">Hatchery Location</th>
                  <th class="py-3 px-4">Hatchery Capacity</th>
                  <th class="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="hatchery-table-body" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.renderHatcheryTableRows();
  },

  renderHatcheryTableRows(data) {
    const list = data || this.hatcheryListData;
    const tbody = document.getElementById('hatchery-table-body');
    if (!tbody) return;

    tbody.innerHTML = list.map((r, i) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${i % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="QCView.openEditHatcheryModal(${r.sNo})">${r.name}</td>
        <td class="py-3 px-4 text-[#334155] font-medium">${r.location}</td>
        <td class="py-3 px-4 text-[#475569] font-semibold">${r.capacity}</td>
        <td class="py-3 px-4 text-center">
          <button type="button" onclick="QCView.openEditHatcheryModal(${r.sNo})" class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center" title="Edit Hatchery">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  handleHatcherySearch(q) {
    const query = (q || '').toLowerCase().trim();
    if (!query) {
      this.renderHatcheryTableRows(this.hatcheryListData);
      return;
    }
    const filtered = this.hatcheryListData.filter(r =>
      r.name.toLowerCase().includes(query) ||
      r.location.toLowerCase().includes(query) ||
      r.capacity.toLowerCase().includes(query)
    );
    this.renderHatcheryTableRows(filtered);
  },

  // EXACT CHILD SCREEN 3: HATCHERY CREATE
  openAddHatcheryModal() {
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: 'HATCHERY CREATE',
      size: 'lg',
      content: `
        <form class="space-y-4 text-xs text-[#1E293B]" onsubmit="event.preventDefault(); QCView.handleAddHatcherySubmit();">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">HATCHERY NAME <span class="text-rose-500">*</span></label>
              <input type="text" id="create-hatchery-name" placeholder="Enter Hatchery Name" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">HATCHERY LOCATION <span class="text-rose-500">*</span></label>
              <input type="text" id="create-hatchery-location" placeholder="Enter Hatchery Location" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">HATCHERY CAPACITY <span class="text-rose-500">*</span></label>
              <input type="text" id="create-hatchery-capacity" placeholder="Enter Hatchery Capacity" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="flex items-center justify-end gap-3 pt-3 border-t border-[#F1F5F9]">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if(m && m.close) m.close();" class="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
              Close
            </button>
            <button type="submit" class="px-6 py-2.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <span>Save</span>
            </button>
          </div>
        </form>
      `
    });
  },

  handleAddHatcherySubmit() {
    const name = document.getElementById('create-hatchery-name')?.value || 'New Hatchery';
    const loc = document.getElementById('create-hatchery-location')?.value || 'Kakinada';
    const cap = document.getElementById('create-hatchery-capacity')?.value || '3 Tonnes';

    this.hatcheryListData.push({
      sNo: this.hatcheryListData.length + 1,
      name: name,
      location: loc,
      capacity: cap
    });

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : window.Modal;
    if (m && m.close) m.close();

    this.renderHatcheryTableRows();
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Hatchery created successfully!', 'success');
    }
  },

  openEditHatcheryModal(sNo) {
    const h = this.hatcheryListData.find(item => item.sNo === sNo);
    if (!h) return;

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: `EDIT HATCHERY: ${h.name}`,
      size: 'lg',
      content: `
        <form class="space-y-4 text-xs text-[#1E293B]" onsubmit="event.preventDefault(); QCView.handleEditHatcherySubmit(${h.sNo});">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">HATCHERY NAME</label>
              <input type="text" id="modal-edit-hatchery-name" value="${h.name}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">HATCHERY LOCATION</label>
              <input type="text" id="modal-edit-hatchery-location" value="${h.location}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">HATCHERY CAPACITY</label>
              <input type="text" id="modal-edit-hatchery-capacity" value="${h.capacity}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
          </div>
          <div class="flex items-center justify-end gap-3 pt-3 border-t border-[#F1F5F9]">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if(m && m.close) m.close();" class="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
              Close
            </button>
            <button type="submit" class="px-6 py-2.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <span>Save</span>
            </button>
          </div>
        </form>
      `
    });
  },

  handleEditHatcherySubmit(sNo) {
    const h = this.hatcheryListData.find(item => item.sNo === sNo);
    if (!h) return;
    h.name = document.getElementById('modal-edit-hatchery-name')?.value || h.name;
    h.location = document.getElementById('modal-edit-hatchery-location')?.value || h.location;
    h.capacity = document.getElementById('modal-edit-hatchery-capacity')?.value || h.capacity;

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : window.Modal;
    if (m && m.close) m.close();

    this.renderHatcheryTableRows();
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Hatchery details updated successfully!', 'success');
    }
  }
'''

BRANCHING_COMPLETE = '''    } else if (subPage === 'documentation' || subPage === 'qc-documentation' || subPage === 'qc-operations') {
      this.renderDocumentation(subContainer, activeHash);
    } else if (subPage === 'qc-orders' || subPage === 'orders') {
      this.renderQCOrders(subContainer, activeHash);
    } else if (subPage === 'food-social-audit' || subPage === 'chemical-screening' || subPage === 'screening-records') {
      this.renderFoodSocialAudit(subContainer, activeHash);
    } else if (subPage === 'farm-mill-hatchery-audit' || subPage === 'farm-mill-audit') {
      this.renderFarmMillHatcheryAudit(subContainer, activeHash);
    } else if (subPage === 'hatchery-list' || subPage === 'hatcheries') {
      this.renderHatcheryList(subContainer, activeHash);'''

for filepath in ['js/views/qcView.js', 'miledeep-devi-fisheries.html', 'standalone.html']:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update sidebar navigation in HTML files
    if filepath != 'js/views/qcView.js':
        if s_regex.search(content):
            content = s_regex.sub(SIDEBAR_REPLACEMENT_QC_OPS, content)
            print(f"✓ Updated sidebar in {filepath}")

    # Update branching in render
    branch_regex = re.compile(r'\}\s*else\s*if\s*\(\s*subPage\s*===\s*[\'"]documentation[\'"][\s\S]*?(?=\}\s*else\s*\{)', re.MULTILINE)
    if branch_regex.search(content):
        content = branch_regex.sub(BRANCHING_COMPLETE + '\n    ', content)
        print(f"✓ Updated branching in {filepath}")

    # Remove any previous partial addition
    split_marker = '  // ==========================================\n  // 7. QC OPERATIONS: DOCUMENTATION'
    if split_marker in content:
        # Cut off everything from split_marker to the end of QCView
        prefix = content.split(split_marker)[0]
        # find the end of QCView
        end_idx = content.rfind('};')
        if end_idx != -1:
            suffix = content[end_idx:]
            content = prefix + split_marker + FULL_ADDITIONAL_CODE + '\n\n' + suffix
            print(f"✓ Replaced complete QC Operations & Chemical Screening code in {filepath}")
    else:
        # Insert before the end of QCView
        last_marker = '  }\n\n};'
        if last_marker in content:
            content = content.replace(last_marker, '  },\n' + FULL_ADDITIONAL_CODE + '\n\n};', 1)
            print(f"✓ Appended complete QC Operations & Chemical Screening code in {filepath}")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Finished deploying child screens!")
