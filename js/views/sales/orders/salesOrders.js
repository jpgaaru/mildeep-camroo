// Sales Module — Orders Execution & Registers (Shipping Bills & Commercial Invoices)
export const salesOrders = {
  // ==========================================
  // ORDERS SUB-MENU ON-SCREEN TAB BAR
  // ==========================================
  renderOrdersTabBar(activeTab = 'proforma-list') {
    const tabs = [
      { id: 'proforma-list', label: 'Proforma List', hash: '#/sales/orders/proforma-list' },
      { id: 'custom-invoices', label: 'Custom Invoices', hash: '#/sales/orders/custom-invoices' },
      { id: 'isf-details', label: 'ISF Details', hash: '#/sales/orders/isf-details' },
      { id: 'shipping-bill', label: 'Shipping Bill', hash: '#/sales/orders/shipping-bill' },
      { id: 'commercial-invoice', label: 'Commercial Invoice', hash: '#/sales/orders/commercial-invoice' },
      { id: 'eta-status', label: 'ETA Status', hash: '#/sales/orders/eta-status' },
      { id: 'fda-status', label: 'FDA Status', hash: '#/sales/orders/fda-status' },
      { id: 'clearing-agent', label: 'Clearing Agent', hash: '#/sales/orders/clearing-agent' },
      { id: 'delayed-shipments', label: 'Delayed Shipments', hash: '#/sales/orders/delayed-shipments' }
    ];

    return `
      <div class="mb-4 select-none">
        <div class="flex items-center gap-6 border-b border-[#E2E8F0] pt-1 pb-0 select-none overflow-x-auto">
          ${tabs.map(t => {
            const isActive = t.id === activeTab;
            return `
              <a 
                href="${t.hash}"
                class="select-none px-1 py-2 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 border-b-2 -mb-[1px] outline-none ${
                  isActive 
                    ? 'tab-active border-[#02a8b5] text-[#02a8b5] font-bold bg-transparent' 
                    : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] bg-transparent'
                }"
              >
                ${t.label}
              </a>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  // ==========================================
  // 2. ORDERS EXECUTION: PROFORMA INVOICES LIST
  // ==========================================
  proformaDataset: [
    { sNo: 1, id: '7393', processor: '857', piNumber: 'DFL/PI/1315/26-27', piDate: '21-10-2026', poNo: '111', buyer: 'EASTERN FISH COMPANY LLC', productionPlant: 'USHA', shipByDate: '--', status: 'Pi-Pending', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', cartons: 1800, totalAmountUsd: 189000 },
    { sNo: 2, id: '7392', processor: '853', piNumber: 'DFL/PI/1314/26-27', piDate: '19-10-2026', poNo: 'test19', buyer: 'EASTERN FISH COMPANY LLC', productionPlant: 'VSP', shipByDate: '--', status: 'Po Received', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', cartons: 1800, totalAmountUsd: 194500 },
    { sNo: 3, id: '7391', processor: '853', piNumber: 'DFL/PI/1313/26-27', piDate: '14-10-2026', poNo: '111', buyer: 'EASTERN FISH COMPANY LLC', productionPlant: 'VSP', shipByDate: '--', status: 'Po Received', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', cartons: 1800, totalAmountUsd: 191200 },
    { sNo: 4, id: '7390', processor: '853', piNumber: 'DFL/PI/1312/26-27', piDate: '12-10-2026', poNo: '1234', buyer: 'PACIFIC SEAFOOD GROUP,', productionPlant: 'SATYA,VSP', shipByDate: '13-10-2026', status: 'Po Received', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', cartons: 3600, totalAmountUsd: 382000 },
    { sNo: 5, id: '7389', processor: '1888', piNumber: 'DFL/PI/1311/26-27', piDate: '09-10-2026', poNo: 'DF/DF-567test', buyer: 'EASTERN FISH COMPANY LLC', productionPlant: 'JPT', shipByDate: '--', status: 'Po Received', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', cartons: 1800, totalAmountUsd: 188500 },
    { sNo: 6, id: '7388', processor: '24234236', piNumber: 'DFL/PI/1310/26-27', piDate: '06-10-2026', poNo: '500', buyer: 'ARISTA INDUSTRIES INC', productionPlant: 'JPT', shipByDate: '--', status: 'Pi-Pending', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', cartons: 1800, totalAmountUsd: 178000 },
    { sNo: 7, id: '7387', processor: '853', piNumber: 'DFL/PI/1309/26-27', piDate: '05-10-2026', poNo: '568', buyer: 'EASTERN FISH COMPANY LLC', productionPlant: 'VSP', shipByDate: '--', status: 'Po Received', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', cartons: 1800, totalAmountUsd: 193400 },
    { sNo: 8, id: '7386', processor: '853', piNumber: 'DFL/PI/1308/26-27', piDate: '05-10-2026', poNo: '897', buyer: 'PACIFIC SEAFOOD GROUP,', productionPlant: 'VSP', shipByDate: '--', status: 'Po Received', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', cartons: 3600, totalAmountUsd: 379000 }
  ],

  renderProformaList(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#172B4D]">

                                <!-- 2. Page Title Header -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">Proforma Invoices</h1>
          <div class="flex items-center gap-2">
            <button class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.openNewPi()">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>New PI</span>
            </button>
            <button class="px-4 py-2 border border-[#02a8b5] bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#02a8b5] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer transition-all" onclick="SalesView.bulkApprovePis()">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>Bulk Approval</span>
            </button>
          </div>
        </div>

                <!-- 3. Top Filter Card (Base Design System with AquaPulse Colors) -->
        <div id="sales-pi-filter-card" class="sales-pi-filter bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="flex items-center gap-2 pb-2 mb-3 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Search & Filters</h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-4">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT EXPORTER :</label>
              <select id="sales-pi-exporter-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT CONSIGNEE :</label>
              <select id="sales-pi-consignee-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="ALL" selected>All Consignees</option>
                <option value="EASTERN FISH COMPANY LLC">EASTERN FISH COMPANY LLC</option>
                <option value="PACIFIC SEAFOOD GROUP,">PACIFIC SEAFOOD GROUP,</option>
                <option value="ARISTA INDUSTRIES INC">ARISTA INDUSTRIES INC</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT COUNTRY:</label>
              <select id="sales-pi-country-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="ALL" selected>All Countries</option>
                <option value="USA">U.S.A.</option>
                <option value="CHINA">CHINA</option>
                <option value="BELGIUM">BELGIUM</option>
                <option value="RUSSIA">RUSSIA</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">STATUS:</label>
              <select id="sales-pi-status-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="ALL" selected>All Statuses</option>
                <option value="Pi-Pending">Pi-Pending</option>
                <option value="Po Received">Po Received</option>
                <option value="Approved">Approved</option>
              </select>
            </div>
          </div>

          <!-- Buttons using Base Design System colors -->
          <div class="flex items-center justify-end gap-3 pt-2 border-t border-[#F1F5F9]">
            <button id="btn-pi-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterProformaList()">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <span>Search</span>
            </button>
          </div>
        </div>

        <!-- 4. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-pi-search-input" 
                placeholder="Search by PI, PO, Buyer, Plant..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchProformaList(this.value)"
              />
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3.5 py-1.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.toggleMoreSearch()">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-[#02a8b5] hover:bg-[#02a8b5] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.loadAllProformaList()">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div id="sales-pi-table-container" class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#DFE1E6] text-[#5E6C84]">
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider select-none">S.No ▲</th>
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider select-none">ID</th>
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider select-none">Processor</th>
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider select-none">PInv Number</th>
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider select-none">PInv Date</th>
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider select-none">Po No</th>
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider select-none">Buyer</th>
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider select-none">Production Plant</th>
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider select-none">ShipBy Date</th>
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider text-center select-none">Status</th>
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider text-center select-none">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-pi-table-body" class="divide-y divide-[#EBECF0]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Pagination & Totals Abstract -->
          <div id="sales-pi-totals-container" class="mt-4"></div>
        </div>
      </div>
    `;

    this.renderProformaRows(this.proformaDataset);
    this.renderProformaTotals(this.proformaDataset);
  },

  renderProformaRows(list) {
    const tbody = document.getElementById('sales-pi-table-body');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="11" class="py-8 text-center text-xs text-[#5E6C84]">
            No Proforma Invoices found matching your search filters.
          </td>
        </tr>
      `;
      return;
    }

                tbody.innerHTML = list.map((r, idx) => {
      const isPending = (r.status || '').toLowerCase().includes('pending');
      const isRejected = (r.status || '').toLowerCase().includes('reject');
      
      let badgeHtml = '';
      if (isPending) {
        badgeHtml = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold text-[#475569] bg-[#F1F5F9] border border-[#CBD5E1]">Pi-Pending</span>`;
      } else if (isRejected) {
        badgeHtml = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold text-[#991B1B] bg-[#FEF2F2] border border-[#FECACA]">Rejected</span>`;
      } else {
        badgeHtml = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0]">Po Received</span>`;
      }

      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
          <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.id}</td>
          <td class="py-3 px-3 text-[#0F172A]">${r.processor}</td>
          <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.viewPiDetails('${r.id}')">${r.piNumber}</td>
          <td class="py-3 px-3 text-[#0F172A] whitespace-nowrap">${r.piDate}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.poNo || r.poNumber}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A]">${r.buyer}</td>
          <td class="py-3 px-3 text-[#64748B] font-medium">${r.productionPlant}</td>
          <td class="py-3 px-3 text-[#64748B] whitespace-nowrap">${r.shipByDate || '--'}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">${badgeHtml}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">
            <div class="inline-flex items-center gap-1.5 justify-center">
              <button class="p-1 rounded text-[#006644] hover:bg-[#E3FCEF] cursor-pointer transition-colors" title="Edit" onclick="SalesView.editPi('${r.id}')">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
              </button>
              <button class="p-1 rounded text-[#02a8b5] hover:bg-[#F0FAFC] cursor-pointer transition-colors" title="Print" onclick="SalesView.printPi('${r.id}')">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              </button>
              <button class="p-1 rounded text-[#02a8b5] hover:bg-[#F0FAFC] cursor-pointer transition-colors" title="Copy" onclick="SalesView.copyPi('${r.id}')">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              </button>
              <button class="p-1 rounded text-[#FF5150] hover:bg-[#FEF2F2] cursor-pointer transition-colors" title="Delete" onclick="SalesView.deletePi('${r.id}')">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderProformaTotals(list) {
    const containerEl = document.getElementById('sales-pi-totals-container');
    if (!containerEl) return;

    const count = list.length;
    const totalAmount = list.reduce((sum, x) => sum + (parseFloat(x.totalAmountUsd) || 190000), 0);
    const totalCartons = list.reduce((sum, x) => sum + (parseInt(x.cartons) || 1800), 0);
    const avgValue = count > 0 ? totalAmount / count : 0;

    containerEl.innerHTML = UIBase.renderTotals(
      'Proforma Invoices Volume & Commercial Abstract',
      count,
      count === 1 ? 'PI Record' : 'PI Records',
      [
        { label: 'TOTAL INVOICES', value: `${count} Orders`, badge: 'Active PIs', badgeColor: 'text-[#0284C7] bg-[#F0F9FF]' },
        { label: 'TOTAL EXPORT VALUE', value: `$${Math.round(totalAmount).toLocaleString()}`, badge: 'USD Target', badgeColor: 'text-[#006644] bg-[#E3FCEF]', color: 'text-[#006644]' },
        { label: 'TOTAL CARTONS ALLOCATED', value: `${totalCartons.toLocaleString()} Ctns`, badge: 'Master Pack', badgeColor: 'text-[#0284C7] bg-[#F0F9FF]' },
        { label: 'AVERAGE PI SIZE', value: `$${Math.round(avgValue).toLocaleString()}`, badge: 'Mean Order', badgeColor: 'text-[#006644] bg-[#E3FCEF]' }
      ]
    );
  },

  searchProformaList(term) {
    const q = (term || '').toLowerCase().trim();
    if (!q) {
      this.renderProformaRows(this.proformaDataset);
      this.renderProformaTotals(this.proformaDataset);
      return;
    }

    const filtered = this.proformaDataset.filter(r => 
      (r.id || '').toLowerCase().includes(q) ||
      (r.piNumber || '').toLowerCase().includes(q) ||
      (r.poNo || '').toLowerCase().includes(q) ||
      (r.buyer || '').toLowerCase().includes(q) ||
      (r.productionPlant || '').toLowerCase().includes(q) ||
      (r.processor || '').toLowerCase().includes(q) ||
      (r.status || '').toLowerCase().includes(q)
    );

    this.renderProformaRows(filtered);
    this.renderProformaTotals(filtered);
  },

  filterProformaList() {
    const consignee = document.getElementById('sales-pi-consignee-select')?.value || 'ALL';
    const country = document.getElementById('sales-pi-country-select')?.value || 'ALL';
    const status = document.getElementById('sales-pi-status-select')?.value || 'ALL';

    const filtered = this.proformaDataset.filter(r => {
      const matchConsignee = consignee === 'ALL' || r.buyer === consignee;
      const matchCountry = country === 'ALL' || r.country === country;
      const matchStatus = status === 'ALL' || (r.status || '').toLowerCase() === status.toLowerCase();
      return matchConsignee && matchCountry && matchStatus;
    });

    this.renderProformaRows(filtered);
    this.renderProformaTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered Proforma List: ${filtered.length} records found`, 'info');
    }
  },

  loadAllProformaList() {
    const searchInput = document.getElementById('sales-pi-search-input');
    if (searchInput) searchInput.value = '';
    const consigneeSel = document.getElementById('sales-pi-consignee-select');
    if (consigneeSel) consigneeSel.value = 'ALL';
    const countrySel = document.getElementById('sales-pi-country-select');
    if (countrySel) countrySel.value = 'ALL';
    const statusSel = document.getElementById('sales-pi-status-select');
    if (statusSel) statusSel.value = 'ALL';

    this.renderProformaRows(this.proformaDataset);
    this.renderProformaTotals(this.proformaDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Loaded all 8 Proforma Invoices', 'info');
    }
  },

  toggleMoreSearch() {
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Advanced date & processor search filters active', 'info');
    }
  },

  bulkApprovePis() {
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Initiated Bulk Approval workflow for pending Proforma Invoices', 'info');
    }
  },

  viewPiDetails(id) {
    const item = this.proformaDataset.find(x => x.id === id) || { piNumber: id, buyer: 'EASTERN FISH COMPANY LLC' };
    if (typeof Modal !== 'undefined' && Modal.open) {
      Modal.open({
        title: `Proforma Invoice Details: ${item.piNumber}`,
        size: 'lg',
        content: `
          <div class="space-y-4 text-xs text-[#172B4D]">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] p-3 rounded-lg border border-[#DFE1E6]">
              <div><span class="text-[#5E6C84] block font-bold text-[10px] uppercase">PI Number</span><span class="font-extrabold text-[#006C7A] text-sm">${item.piNumber}</span></div>
              <div><span class="text-[#5E6C84] block font-bold text-[10px] uppercase">PO Number</span><span class="font-bold">${item.poNo || item.poNumber}</span></div>
              <div><span class="text-[#5E6C84] block font-bold text-[10px] uppercase">PI Date</span><span class="font-medium">${item.piDate}</span></div>
              <div><span class="text-[#5E6C84] block font-bold text-[10px] uppercase">Status</span><span class="font-bold text-[#006644]">${item.status}</span></div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="p-3 bg-white rounded border border-[#DFE1E6]">
                <span class="text-[#5E6C84] block font-bold text-[10px] uppercase mb-1">Buyer Details</span>
                <p class="font-bold text-[#172B4D]">${item.buyer}</p>
                <p class="text-[#5E6C84] mt-1">Country: ${item.country || 'USA'}</p>
                <p class="text-[#5E6C84]">Processor ID: ${item.processor}</p>
              </div>
              <div class="p-3 bg-white rounded border border-[#DFE1E6]">
                <span class="text-[#5E6C84] block font-bold text-[10px] uppercase mb-1">Manufacturing & Logistics</span>
                <p class="font-semibold text-[#172B4D]">Plant: ${item.productionPlant}</p>
                <p class="text-[#5E6C84] mt-1">ShipBy Date: ${item.shipByDate || '--'}</p>
                <p class="text-[#5E6C84]">Cartons: ${(item.cartons || 1800).toLocaleString()} Ctns</p>
              </div>
            </div>
          </div>
        `
      });
    }
  },

  editPi(id) {
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Opening Editor for PI ID #${id}...`, 'info');
    }
  },

  printPi(id) {
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Generating Printable Export Format for PI #${id}...`, 'info');
    }
  },

  copyPi(id) {
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Duplicated PI #${id} as new draft`, 'info');
    }
  },

  deletePi(id) {
    if (confirm(`Are you sure you want to delete Proforma Invoice #${id}?`)) {
      this.proformaDataset = this.proformaDataset.filter(x => x.id !== id);
      this.renderProformaRows(this.proformaDataset);
      this.renderProformaTotals(this.proformaDataset);
      if (typeof Toast !== 'undefined' && Toast.show) {
        Toast.show(`Proforma Invoice #${id} removed successfully`, 'info');
      }
    }
  },

    // ==========================================
  // CUSTOM INVOICES REGISTER (IMAGE REFERENCE)
  // ==========================================
  customInvoiceDataset: [
    { sNo: 1, id: '104', invoiceNo: 'DFL/KKD/2627/157', invoiceDate: '21-10-2026', poNo: 'DF/DF-2786', buyer: 'DEVI FISHERIES INC.', piNumber: 'DFL/PI/125/23-24', stockStatus: 'Pending', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', year: '2026-2027', billsType: 'Pending', cartons: 1800, valueUsd: 189000 },
    { sNo: 2, id: '6513', invoiceNo: 'DFL/JPT/2627/313', invoiceDate: '19-09-2026', poNo: 'PO1004191', buyer: 'STANLEY PEARLMAN ENTERPRISES, INC.', piNumber: 'DFL/PI/442/26-27', stockStatus: '09-10-2026', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', year: '2026-2027', billsType: 'Completed', cartons: 1800, valueUsd: 194500 },
    { sNo: 3, id: '6203', invoiceNo: 'DFL/JPT/2627/312', invoiceDate: '19-09-2026', poNo: '1102650547', buyer: 'C.P. FOOD PRODUCTS, INC.', piNumber: 'DFL/PI/134/26-27', stockStatus: '19-09-2026', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', year: '2026-2027', billsType: 'Completed', cartons: 1800, valueUsd: 191200 },
    { sNo: 4, id: '6302', invoiceNo: 'DFL/JPT/2627/311', invoiceDate: '19-09-2026', poNo: '1102650877', buyer: 'C.P. FOOD PRODUCTS, INC.', piNumber: 'DFL/PI/233/26-27', stockStatus: '19-09-2026', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', year: '2026-2027', billsType: 'Completed', cartons: 3600, valueUsd: 382000 },
    { sNo: 5, id: '5743', invoiceNo: 'DFL/JPT/2627/310', invoiceDate: '18-09-2026', poNo: '60150DEV010C', buyer: 'CRUSTA C SAS', piNumber: 'DFL/PI/1725/25-26', stockStatus: '18-09-2026', exporter: 'DEVI FISHERIES LIMITED', country: 'FRANCE', year: '2026-2027', billsType: 'Completed', cartons: 1800, valueUsd: 188500 },
    { sNo: 6, id: '6131', invoiceNo: 'DFL/JPT/2627/309', invoiceDate: '18-09-2026', poNo: '1102650475', buyer: 'C.P. FOOD PRODUCTS, INC.', piNumber: 'DFL/PI/062/26-27', stockStatus: '18-09-2026', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', year: '2026-2027', billsType: 'Completed', cartons: 1800, valueUsd: 178000 },
    { sNo: 7, id: '7050', invoiceNo: 'DFL/JPT/2627/308', invoiceDate: '18-09-2026', poNo: 'DF/DF-5611', buyer: 'DEVI FISHERIES INC.', piNumber: 'DFL/PI/968/26-27', stockStatus: '18-09-2026', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', year: '2026-2027', billsType: 'Completed', cartons: 1800, valueUsd: 193400 },
    { sNo: 8, id: '7051', invoiceNo: 'DFL/JPT/2627/307', invoiceDate: '18-09-2026', poNo: 'DF/DF-5612', buyer: 'DEVI FISHERIES INC.', piNumber: 'DFL/PI/969/26-27', stockStatus: '18-09-2026', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', year: '2026-2027', billsType: 'Completed', cartons: 3600, valueUsd: 379000 }
  ],

    renderCustomInvoices(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#172B4D]">
        <!-- 2. Page Title Header -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">CUSTOM INVOICES</h1>
        </div>

        <!-- 3. Top Filter Card (Base Design System with AquaPulse Colors) -->
        <div id="sales-cinv-filter-card" class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT YEAR</label>
              <select id="sales-cinv-year-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT EXPORTER :</label>
              <select id="sales-cinv-exporter-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT CONSIGNEE :</label>
              <select id="sales-cinv-consignee-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="DEVI FISHERIES INC.">DEVI FISHERIES INC.</option>
                <option value="STANLEY PEARLMAN ENTERPRISES, INC.">STANLEY PEARLMAN ENTERPRISES, INC.</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="CRUSTA C SAS">CRUSTA C SAS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT COUNTRY:</label>
              <select id="sales-cinv-country-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="USA">U.S.A.</option>
                <option value="FRANCE">FRANCE</option>
                <option value="CHINA">CHINA</option>
                <option value="BELGIUM">BELGIUM</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">BILLS TYPE:</label>
              <select id="sales-cinv-type-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All">All</option>
                <option value="Completed" selected>Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div>
              <button id="btn-cinv-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterCustomInvoices()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 4. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-cinv-search-input" 
                placeholder="Search..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchCustomInvoices(this.value)"
              />
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3.5 py-1.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.toggleMoreSearch()">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-[#02a8b5] hover:bg-[#02a8b5] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.loadAllCustomInvoices()">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortCustomInvoices('sNo')">
                    <span class="inline-flex items-center gap-1">SNO <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">Invoice No</th>
                  <th class="py-3 px-3">Invoice Date</th>
                  <th class="py-3 px-3">Po No</th>
                  <th class="py-3 px-3">Buyer</th>
                  <th class="py-3 px-3">PInvoice No</th>
                  <th class="py-3 px-3 text-center">Stock Status</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-cinv-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card (Base Design System) -->
          <div id="sales-cinv-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderCustomInvoiceRows(this.customInvoiceDataset);
    this.renderCustomInvoiceTotals(this.customInvoiceDataset);
  },

  renderCustomInvoiceRows(list) {
    const tbody = document.getElementById('sales-cinv-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="py-8 text-center text-[#64748B] text-xs">
            No custom invoices found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => {
      const isPending = (r.stockStatus || '').toLowerCase() === 'pending';
      const badgeHtml = isPending
        ? `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#EF4444] shadow-xs">Pending</span>`
        : `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#16A34A] shadow-xs">${r.stockStatus}</span>`;

      const rowHighlight = r.id === '6302' ? 'bg-[#FEF9C3]' : 'hover:bg-[#F8FAFC]';

      return `
        <tr class="${rowHighlight} transition-colors border-b border-[#EBECF0]">
          <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.id}</td>
          <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.viewCustomInvoice('${r.id}')">${r.invoiceNo}</td>
          <td class="py-3 px-3 text-[#0F172A] whitespace-nowrap">${r.invoiceDate}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.poNo}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A]">${r.buyer}</td>
          <td class="py-3 px-3 text-[#64748B]">${r.piNumber}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">${badgeHtml}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">
            <div class="inline-flex items-center gap-1.5 justify-center">
              <button class="p-1 rounded text-[#02a8b5] hover:bg-[#F0FAFC] cursor-pointer transition-colors" title="Download" onclick="SalesView.downloadCustomInvoice('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              </button>
              <button class="p-1 rounded text-[#006644] hover:bg-[#E3FCEF] cursor-pointer transition-colors" title="Edit" onclick="SalesView.editCustomInvoice('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
              </button>
              <button class="p-1 rounded text-[#02a8b5] hover:bg-[#F0FAFC] cursor-pointer transition-colors" title="Copy" onclick="SalesView.copyCustomInvoice('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              </button>
              <button class="p-1 rounded text-[#0284C7] hover:bg-[#F0F9FF] cursor-pointer transition-colors" title="View" onclick="SalesView.viewCustomInvoice('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
              <button class="p-1 rounded text-[#02a8b5] hover:bg-[#F0FAFC] cursor-pointer transition-colors" title="Print" onclick="SalesView.printCustomInvoice('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderCustomInvoiceTotals(list) {
    const el = document.getElementById('sales-cinv-totals');
    if (!el) return;

    const count = list.length;
    const cleared = list.filter(x => (x.stockStatus || '').toLowerCase() !== 'pending').length;
    const pending = count - cleared;
    const totalCartons = list.reduce((sum, r) => sum + (r.cartons || 1800), 0);
    const totalVal = list.reduce((sum, r) => sum + (r.valueUsd || 190000), 0);

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Invoices</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Invoices</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Cleared Stock</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${cleared} <span class="text-xs font-semibold text-[#006644]">Cleared</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Stock</div>
          <div class="text-lg font-black text-[#991B1B] mt-0.5">${pending} <span class="text-xs font-semibold text-[#991B1B]">Pending</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Commercial Value</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">$${totalVal.toLocaleString()} <span class="text-[11px] font-semibold text-[#64748B]">(${totalCartons.toLocaleString()} Ctns)</span></div>
        </div>
      </div>
    `;
  },

  filterCustomInvoices() {
    const year = document.getElementById('sales-cinv-year-select')?.value || 'All';
    const exporter = document.getElementById('sales-cinv-exporter-select')?.value || 'All';
    const consignee = document.getElementById('sales-cinv-consignee-select')?.value || 'All';
    const country = document.getElementById('sales-cinv-country-select')?.value || 'All';
    const billsType = document.getElementById('sales-cinv-type-select')?.value || 'All';

    const filtered = this.customInvoiceDataset.filter(r => {
      const matchYear = year === 'All' || r.year === year;
      const matchExporter = exporter === 'All' || r.exporter === exporter;
      const matchConsignee = consignee === 'All' || r.buyer === consignee;
      const matchCountry = country === 'All' || r.country === country;
      const matchType = billsType === 'All' || r.billsType === billsType || (billsType === 'Pending' && (r.stockStatus || '').toLowerCase() === 'pending');
      return matchYear && matchExporter && matchConsignee && matchCountry && matchType;
    });

    this.renderCustomInvoiceRows(filtered);
    this.renderCustomInvoiceTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered: ${filtered.length} Custom Invoice(s) found`, 'info');
    }
  },

  searchCustomInvoices(term) {
    const q = (term || '').trim().toLowerCase();
    if (!q) {
      this.renderCustomInvoiceRows(this.customInvoiceDataset);
      this.renderCustomInvoiceTotals(this.customInvoiceDataset);
      return;
    }

    const filtered = this.customInvoiceDataset.filter(r => {
      return (r.invoiceNo || '').toLowerCase().includes(q) ||
             (r.poNo || '').toLowerCase().includes(q) ||
             (r.buyer || '').toLowerCase().includes(q) ||
             (r.piNumber || '').toLowerCase().includes(q) ||
             (r.id || '').toLowerCase().includes(q);
    });

    this.renderCustomInvoiceRows(filtered);
    this.renderCustomInvoiceTotals(filtered);
  },

  loadAllCustomInvoices() {
    const yearEl = document.getElementById('sales-cinv-year-select');
    const exporterEl = document.getElementById('sales-cinv-exporter-select');
    const consigneeEl = document.getElementById('sales-cinv-consignee-select');
    const countryEl = document.getElementById('sales-cinv-country-select');
    const typeEl = document.getElementById('sales-cinv-type-select');
    const searchEl = document.getElementById('sales-cinv-search-input');

    if (yearEl) yearEl.value = '2026-2027';
    if (exporterEl) exporterEl.value = 'DEVI FISHERIES LIMITED';
    if (consigneeEl) consigneeEl.value = 'All';
    if (countryEl) countryEl.value = 'All';
    if (typeEl) typeEl.value = 'All';
    if (searchEl) searchEl.value = '';

    this.renderCustomInvoiceRows(this.customInvoiceDataset);
    this.renderCustomInvoiceTotals(this.customInvoiceDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Loaded all ${this.customInvoiceDataset.length} Custom Invoices`, 'success');
    }
  },

  toggleMoreCinvSearch() {
    const card = document.getElementById('sales-cinv-filter-card');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      card.classList.add('ring-2', 'ring-[#006C7A]');
      setTimeout(() => card.classList.remove('ring-2', 'ring-[#006C7A]'), 1200);
    }
  },

  sortCustomInvoices(key) {
    this.customInvoiceDataset.reverse();
    this.renderCustomInvoiceRows(this.customInvoiceDataset);
  },

  openNewCustomInvoice() {
    if (typeof Modal === 'undefined' || !Modal.open) {
      alert('Modal component not ready');
      return;
    }

    Modal.open({
      title: 'Generate Custom Invoice',
      size: 'lg',
      content: `
        <form id="form-new-cinv" onsubmit="event.preventDefault(); SalesView.submitNewCustomInvoice();" class="space-y-4 text-xs text-[#0F172A]">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                INVOICE NUMBER <span class="text-[#FF5150]">*</span>
              </label>
              <input type="text" id="cinv-input-no" value="DFL/JPT/2627/${Math.floor(314 + Math.random() * 50)}" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white font-semibold outline-none focus:border-[#006C7A]">
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                INVOICE DATE <span class="text-[#FF5150]">*</span>
              </label>
              <input type="date" id="cinv-input-date" value="2026-10-23" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white font-semibold outline-none focus:border-[#006C7A]">
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                PO NUMBER <span class="text-[#FF5150]">*</span>
              </label>
              <input type="text" id="cinv-input-po" value="PO-2026-${Math.floor(100 + Math.random() * 900)}" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white font-semibold outline-none focus:border-[#006C7A]">
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                BUYER ENTITY <span class="text-[#FF5150]">*</span>
              </label>
              <select id="cinv-input-buyer" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white font-semibold outline-none focus:border-[#006C7A]">
                <option value="DEVI FISHERIES INC." selected>DEVI FISHERIES INC.</option>
                <option value="STANLEY PEARLMAN ENTERPRISES, INC.">STANLEY PEARLMAN ENTERPRISES, INC.</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="CRUSTA C SAS">CRUSTA C SAS</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                P.INVOICE NO <span class="text-[#FF5150]">*</span>
              </label>
              <input type="text" id="cinv-input-pi" value="DFL/PI/${Math.floor(500 + Math.random() * 500)}/26-27" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white font-semibold outline-none focus:border-[#006C7A]">
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                STOCK STATUS <span class="text-[#FF5150]">*</span>
              </label>
              <select id="cinv-input-status" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white font-semibold outline-none focus:border-[#006C7A]">
                <option value="Pending" selected>Pending</option>
                <option value="23-10-2026">Cleared (23-10-2026)</option>
              </select>
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        {
          label: 'Cancel',
          type: 'secondary',
          onClick: (m) => m.close()
        },
        {
          label: 'Generate Invoice',
          type: 'primary',
          onClick: () => SalesView.submitNewCustomInvoice()
        }
      ]
    });
  },

  submitNewCustomInvoice() {
    const invoiceNo = document.getElementById('cinv-input-no')?.value.trim() || 'DFL/JPT/2627/315';
    const invoiceDate = document.getElementById('cinv-input-date')?.value || '23-10-2026';
    const poNo = document.getElementById('cinv-input-po')?.value.trim() || 'PO-NEW-2026';
    const buyer = document.getElementById('cinv-input-buyer')?.value || 'DEVI FISHERIES INC.';
    const piNumber = document.getElementById('cinv-input-pi')?.value.trim() || 'DFL/PI/999/26-27';
    const stockStatus = document.getElementById('cinv-input-status')?.value || 'Pending';

    const newId = String(Math.floor(7052 + Math.random() * 100));

    const newRecord = {
      sNo: 1,
      id: newId,
      invoiceNo,
      invoiceDate,
      poNo,
      buyer,
      piNumber,
      stockStatus,
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'USA',
      year: '2026-2027',
      billsType: stockStatus === 'Pending' ? 'Pending' : 'Completed',
      cartons: 1800,
      valueUsd: 192000
    };

    this.customInvoiceDataset.unshift(newRecord);
    this.customInvoiceDataset.forEach((r, idx) => { r.sNo = idx + 1; });

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    this.renderCustomInvoiceRows(this.customInvoiceDataset);
    this.renderCustomInvoiceTotals(this.customInvoiceDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Custom Invoice ${invoiceNo} generated successfully!`, 'success');
    }
  },

  downloadCustomInvoice(id) {
    const inv = this.customInvoiceDataset.find(x => x.id === id);
    const num = inv ? inv.invoiceNo : id;
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Downloading Commercial Custom Invoice: ${num}`, 'success');
    }
  },

  editCustomInvoice(id) {
    const inv = this.customInvoiceDataset.find(x => x.id === id);
    if (!inv) return;
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Editing Custom Invoice: ${inv.invoiceNo}`, 'info');
    }
  },

  copyCustomInvoice(id) {
    const inv = this.customInvoiceDataset.find(x => x.id === id);
    if (!inv) return;
    const copy = { ...inv, id: String(Math.floor(8000 + Math.random() * 1000)), invoiceNo: `${inv.invoiceNo}-COPY`, sNo: 1 };
    this.customInvoiceDataset.unshift(copy);
    this.customInvoiceDataset.forEach((r, idx) => { r.sNo = idx + 1; });
    this.renderCustomInvoiceRows(this.customInvoiceDataset);
    this.renderCustomInvoiceTotals(this.customInvoiceDataset);
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Duplicated Custom Invoice: ${copy.invoiceNo}`, 'success');
    }
  },

  viewCustomInvoice(id) {
    const inv = this.customInvoiceDataset.find(x => x.id === id);
    if (!inv) return;
    if (typeof Modal !== 'undefined' && Modal.open) {
      Modal.open({
        title: `Custom Invoice Details - ${inv.invoiceNo}`,
        size: 'md',
        content: `
          <div class="space-y-3 text-xs text-[#0F172A]">
            <div class="grid grid-cols-2 gap-2 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
              <div><span class="text-[#64748B]">Invoice No:</span> <span class="font-bold">${inv.invoiceNo}</span></div>
              <div><span class="text-[#64748B]">Date:</span> <span class="font-semibold">${inv.invoiceDate}</span></div>
              <div><span class="text-[#64748B]">PO Number:</span> <span class="font-semibold">${inv.poNo}</span></div>
              <div><span class="text-[#64748B]">PI Number:</span> <span class="font-semibold">${inv.piNumber}</span></div>
              <div><span class="text-[#64748B]">Buyer:</span> <span class="font-bold text-[#006C7A]">${inv.buyer}</span></div>
              <div><span class="text-[#64748B]">Stock Status:</span> <span class="font-bold">${inv.stockStatus}</span></div>
              <div><span class="text-[#64748B]">Total Cartons:</span> <span class="font-bold">${inv.cartons?.toLocaleString() || '1,800'} Ctns</span></div>
              <div><span class="text-[#64748B]">Commercial Value:</span> <span class="font-extrabold text-[#006644]">$${inv.valueUsd?.toLocaleString() || '190,000'}</span></div>
            </div>
          </div>
        `,
        footerButtons: [{ label: 'Close', type: 'secondary', onClick: (m) => m.close() }]
      });
    }
  },

  printCustomInvoice(id) {
    const inv = this.customInvoiceDataset.find(x => x.id === id);
    const num = inv ? inv.invoiceNo : id;
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Sending Custom Invoice ${num} to printer...`, 'info');
    }
  },

    // ==========================================
  // ISF 10+2 DETAILS REGISTER
  // ==========================================
  isfDataset: [
    {
      sNo: 1,
      id: 'ISF-901',
      containerNo: 'MSCU7397679',
      sealNo: 'MSC-SL-901844',
      carrier: 'MSC',
      shippingLineFull: 'Mediterranean Shipping Company (MSC)',
      blNo: 'MEDUAPX2609918',
      customInv: 'DFL/JPT/2627/314',
      poNo: 'DF/DF-5616',
      buyer: 'DEVI FISHERIES INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-20.0°C',
      isfTransactionNo: 'ISF-2026-USCBP-98214',
      status: 'Completed'
    },
    {
      sNo: 2,
      id: 'ISF-902',
      containerNo: 'MSKU4109823',
      sealNo: 'MSK-992144',
      carrier: 'Maersk Line',
      shippingLineFull: 'Maersk Line A/S',
      blNo: 'MAEU9821034',
      customInv: 'DFL/JPT/2627/313',
      poNo: 'PO1004191',
      buyer: 'STANLEY PEARLMAN ENTERPRISES, INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-19.5°C',
      isfTransactionNo: 'ISF-2026-USCBP-98215',
      status: 'Completed'
    },
    {
      sNo: 3,
      id: 'ISF-903',
      containerNo: 'HLCU8821945',
      sealNo: 'HL-882140',
      carrier: 'Hapag-Lloyd',
      shippingLineFull: 'Hapag-Lloyd AG',
      blNo: 'HLCU9920145',
      customInv: 'DFL/JPT/2627/312',
      poNo: '1102650547',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-21.0°C',
      isfTransactionNo: 'ISF-2026-USCBP-98216',
      status: 'Completed'
    },
    {
      sNo: 4,
      id: 'ISF-904',
      containerNo: 'CMAU9102482',
      sealNo: 'CMA-551029',
      carrier: 'CMA CGM',
      shippingLineFull: 'CMA CGM Group',
      blNo: 'CMAU7710294',
      customInv: 'DFL/JPT/2627/311',
      poNo: '1102650877',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-18.5°C',
      isfTransactionNo: 'ISF-2026-USCBP-98217',
      status: 'Completed'
    },
    {
      sNo: 5,
      id: 'ISF-905',
      containerNo: 'MSCU8810294',
      sealNo: 'MSC-SL-902100',
      carrier: 'MSC',
      shippingLineFull: 'Mediterranean Shipping Company (MSC)',
      blNo: 'MEDUAPX2609920',
      customInv: 'DFL/JPT/2627/310',
      poNo: '60150DEV010C',
      buyer: 'CRUSTA C SAS',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-20.5°C',
      isfTransactionNo: 'ISF-2026-USCBP-98218',
      status: 'Completed'
    },
    {
      sNo: 6,
      id: 'ISF-906',
      containerNo: 'ONEY4410928',
      sealNo: 'ONE-338192',
      carrier: 'ONE Line',
      shippingLineFull: 'Ocean Network Express (ONE)',
      blNo: 'ONEY9920144',
      customInv: 'DFL/JPT/2627/309',
      poNo: '1102650475',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-19.0°C',
      isfTransactionNo: 'ISF-2026-USCBP-98219',
      status: 'Completed'
    },
    {
      sNo: 7,
      id: 'ISF-907',
      containerNo: 'MSKU7720194',
      sealNo: 'MSK-881023',
      carrier: 'Maersk Line',
      shippingLineFull: 'Maersk Line A/S',
      blNo: 'MAEU9821040',
      customInv: 'DFL/JPT/2627/308',
      poNo: 'DF/DF-5611',
      buyer: 'DEVI FISHERIES INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-20.0°C',
      isfTransactionNo: 'Pending Filing',
      status: 'Pending'
    },
    {
      sNo: 8,
      id: 'ISF-908',
      containerNo: 'HLCU3319028',
      sealNo: 'HL-992014',
      carrier: 'Hapag-Lloyd',
      shippingLineFull: 'Hapag-Lloyd AG',
      blNo: 'HLCU9920150',
      customInv: 'DFL/JPT/2627/307',
      poNo: 'DF/DF-5612',
      buyer: 'DEVI FISHERIES INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-18.0°C',
      isfTransactionNo: 'Pending Filing',
      status: 'Pending'
    }
  ],

  renderIsfDetails(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#172B4D]">
        <!-- 2. Page Title Header (Clean - No extra buttons or clutter) -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">ISF 10+2 DETAILS</h1>
        </div>

        <!-- 3. Top Filter Card (Base Design System with AquaPulse Colors, NO empty circle on top right) -->
        <div id="sales-isf-filter-card" class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT YEAR</label>
              <select id="sales-isf-year-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT EXPORTER :</label>
              <select id="sales-isf-exporter-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT BUYER :</label>
              <select id="sales-isf-buyer-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="DEVI FISHERIES INC.">DEVI FISHERIES INC.</option>
                <option value="STANLEY PEARLMAN ENTERPRISES, INC.">STANLEY PEARLMAN ENTERPRISES, INC.</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="CRUSTA C SAS">CRUSTA C SAS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">CARRIER :</label>
              <select id="sales-isf-carrier-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="MSC">MSC</option>
                <option value="Maersk Line">Maersk Line</option>
                <option value="Hapag-Lloyd">Hapag-Lloyd</option>
                <option value="CMA CGM">CMA CGM</option>
                <option value="ONE Line">ONE Line</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">FILING STATUS :</label>
              <select id="sales-isf-status-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All">All</option>
                <option value="Completed" selected>Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div>
              <button id="btn-isf-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterIsfDetails()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 4. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-isf-search-input" 
                placeholder="Search container, seal, carrier, BL, invoice..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchIsfDetails(this.value)"
              />
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3.5 py-1.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.toggleMoreSearch()">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-[#02a8b5] hover:bg-[#02a8b5] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.loadAllIsfDetails()">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortIsfDetails('sNo')">
                    <span class="inline-flex items-center gap-1">SNO <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">CONTAINER NO</th>
                  <th class="py-3 px-3">SEAL NO</th>
                  <th class="py-3 px-3">CARRIER</th>
                  <th class="py-3 px-3">BL NO</th>
                  <th class="py-3 px-3">CUSTOM INV</th>
                  <th class="py-3 px-3">HOLDING TEMP</th>
                  <th class="py-3 px-3">ISF TRANSACTION NO</th>
                  <th class="py-3 px-3 text-center">STATUS</th>
                  <th class="py-3 px-3 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody id="sales-isf-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card (Base Design System) -->
          <div id="sales-isf-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderIsfRows(this.isfDataset);
    this.renderIsfTotals(this.isfDataset);
  },

  renderIsfRows(list) {
    const tbody = document.getElementById('sales-isf-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="10" class="py-8 text-center text-[#64748B] text-xs">
            No ISF 10+2 records found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => {
      const isPending = (r.status || '').toLowerCase() === 'pending';
      const badgeHtml = isPending
        ? `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#EF4444] shadow-xs">Pending</span>`
        : `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#16A34A] shadow-xs">Completed</span>`;

      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
          <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
          <td class="py-3 px-3 font-mono font-bold text-[#0F172A] hover:text-[#006C7A] cursor-pointer" onclick="SalesView.viewIsfDetails('${r.id}')">${r.containerNo}</td>
          <td class="py-3 px-3 font-mono text-[#475569]">${r.sealNo}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.carrier}</td>
          <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.viewIsfDetails('${r.id}')">${r.blNo}</td>
          <td class="py-3 px-3 text-[#0F172A] font-medium">${r.customInv}</td>
          <td class="py-3 px-3 font-mono font-bold text-[#0284C7]">${r.tempRecord}</td>
          <td class="py-3 px-3 font-mono text-[#475569]">${r.isfTransactionNo}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">${badgeHtml}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">
            <div class="inline-flex items-center gap-1.5 justify-center">
              <button class="p-1 rounded text-[#02a8b5] hover:bg-[#F0FAFC] cursor-pointer transition-colors" title="Download ISF Filing" onclick="SalesView.downloadIsfDetails('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              </button>
              <button class="p-1 rounded text-[#0284C7] hover:bg-[#F0F9FF] cursor-pointer transition-colors" title="View ISF Details" onclick="SalesView.viewIsfDetails('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
              <button class="p-1 rounded text-[#02a8b5] hover:bg-[#F0FAFC] cursor-pointer transition-colors" title="Print ISF Summary" onclick="SalesView.printIsfDetails('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderIsfTotals(list) {
    const el = document.getElementById('sales-isf-totals');
    if (!el) return;

    const count = list.length;
    const completed = list.filter(x => (x.status || '').toLowerCase() === 'completed').length;
    const pending = count - completed;

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Containers</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Containers</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Completed ISF</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${completed} <span class="text-xs font-semibold text-[#006644]">Filed</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Filing</div>
          <div class="text-lg font-black text-[#991B1B] mt-0.5">${pending} <span class="text-xs font-semibold text-[#991B1B]">Pending</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">CBP Compliance Rate</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">${count > 0 ? Math.round((completed / count) * 100) : 100}% <span class="text-[11px] font-semibold text-[#64748B]">(24h Manifest)</span></div>
        </div>
      </div>
    `;
  },

  filterIsfDetails() {
    const year = document.getElementById('sales-isf-year-select')?.value || 'All';
    const exporter = document.getElementById('sales-isf-exporter-select')?.value || 'All';
    const buyer = document.getElementById('sales-isf-buyer-select')?.value || 'All';
    const carrier = document.getElementById('sales-isf-carrier-select')?.value || 'All';
    const status = document.getElementById('sales-isf-status-select')?.value || 'All';

    const filtered = this.isfDataset.filter(r => {
      const matchYear = year === 'All' || r.year === year;
      const matchExporter = exporter === 'All' || r.exporter === exporter;
      const matchBuyer = buyer === 'All' || r.buyer === buyer;
      const matchCarrier = carrier === 'All' || r.carrier.toLowerCase().includes(carrier.toLowerCase());
      const matchStatus = status === 'All' || r.status === status;
      return matchYear && matchExporter && matchBuyer && matchCarrier && matchStatus;
    });

    this.renderIsfRows(filtered);
    this.renderIsfTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered: Found ${filtered.length} ISF records`, 'info');
    }
  },

  searchIsfDetails(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.renderIsfRows(this.isfDataset);
      this.renderIsfTotals(this.isfDataset);
      return;
    }

    const filtered = this.isfDataset.filter(r => {
      return (r.containerNo && r.containerNo.toLowerCase().includes(q)) ||
        (r.sealNo && r.sealNo.toLowerCase().includes(q)) ||
        (r.carrier && r.carrier.toLowerCase().includes(q)) ||
        (r.blNo && r.blNo.toLowerCase().includes(q)) ||
        (r.customInv && r.customInv.toLowerCase().includes(q)) ||
        (r.isfTransactionNo && r.isfTransactionNo.toLowerCase().includes(q)) ||
        (r.buyer && r.buyer.toLowerCase().includes(q));
    });

    this.renderIsfRows(filtered);
    this.renderIsfTotals(filtered);
  },

  loadAllIsfDetails() {
    const yearEl = document.getElementById('sales-isf-year-select');
    const exporterEl = document.getElementById('sales-isf-exporter-select');
    const buyerEl = document.getElementById('sales-isf-buyer-select');
    const carrierEl = document.getElementById('sales-isf-carrier-select');
    const statusEl = document.getElementById('sales-isf-status-select');
    const searchEl = document.getElementById('sales-isf-search-input');

    if (yearEl) yearEl.value = '2026-2027';
    if (exporterEl) exporterEl.value = 'DEVI FISHERIES LIMITED';
    if (buyerEl) buyerEl.value = 'All';
    if (carrierEl) carrierEl.value = 'All';
    if (statusEl) statusEl.value = 'All';
    if (searchEl) searchEl.value = '';

    this.renderIsfRows(this.isfDataset);
    this.renderIsfTotals(this.isfDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Loaded all ${this.isfDataset.length} ISF records`, 'success');
    }
  },

  toggleMoreIsfSearch() {
    const card = document.getElementById('sales-isf-filter-card');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      card.classList.add('ring-2', 'ring-[#006C7A]');
      setTimeout(() => card.classList.remove('ring-2', 'ring-[#006C7A]'), 1200);
    }
  },

  sortIsfDetails(key) {
    this.isfDataset.reverse();
    this.renderIsfRows(this.isfDataset);
  },

  viewIsfDetails(id) {
    const record = this.isfDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal !== 'undefined' && Modal.open) {
      Modal.open({
        title: `ISF 10+2 Details - ${record.containerNo}`,
        size: 'md',
        content: `
          <div class="space-y-4 text-xs text-[#0F172A]">
            <div class="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3">
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div><span class="text-[#64748B]">Container No:</span> <span class="font-mono font-bold text-[#0F172A]">${record.containerNo}</span></div>
                <div><span class="text-[#64748B]">Seal No:</span> <span class="font-mono font-bold text-[#0F172A]">${record.sealNo}</span></div>
                <div><span class="text-[#64748B]">Carrier:</span> <span class="font-semibold text-[#0F172A]">${record.shippingLineFull || record.carrier}</span></div>
                <div><span class="text-[#64748B]">BL Number:</span> <span class="font-bold text-[#006C7A]">${record.blNo}</span></div>
                <div><span class="text-[#64748B]">Custom Invoice:</span> <span class="font-semibold text-[#0F172A]">${record.customInv}</span></div>
                <div><span class="text-[#64748B]">PO Number:</span> <span class="font-semibold text-[#0F172A]">${record.poNo}</span></div>
                <div><span class="text-[#64748B]">Buyer:</span> <span class="font-bold text-[#0F172A]">${record.buyer}</span></div>
                <div><span class="text-[#64748B]">Exporter:</span> <span class="font-semibold text-[#0F172A]">${record.exporter}</span></div>
                <div><span class="text-[#64748B]">Reefer Temp:</span> <span class="font-mono font-bold text-[#0284C7]">${record.tempRecord}</span></div>
                <div><span class="text-[#64748B]">ISF Txn No:</span> <span class="font-mono font-bold text-[#0F172A]">${record.isfTransactionNo}</span></div>
                <div><span class="text-[#64748B]">Filing Status:</span> <span class="font-bold ${record.status === 'Completed' ? 'text-[#16A34A]' : 'text-[#DC2626]'}">${record.status}</span></div>
              </div>
            </div>
            <div class="p-2.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg text-[11px] text-[#166534]">
              US Customs and Border Protection (CBP) 10+2 Importer Security Filing verified and compliant with vessel stowage plans.
            </div>
          </div>
        `,
        footerButtons: [{ label: 'Close', type: 'secondary', onClick: (m) => m.close() }]
      });
    } else if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Viewing ISF for ${record.containerNo}`, 'info');
    }
  },

  downloadIsfDetails(id) {
    const record = this.isfDataset.find(x => x.id === id);
    const num = record ? record.containerNo : id;
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Downloading ISF Manifest for container ${num}...`, 'success');
    }
  },

  printIsfDetails(id) {
    const record = this.isfDataset.find(x => x.id === id);
    const num = record ? record.containerNo : id;
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Sending ISF filing ${num} to printer...`, 'info');
    }
  },

    // ==========================================
  // SHIPPING BILL REGISTER (IMAGE 2 & 3 REFERENCE)
  // ==========================================
  shippingBillDataset: [
    {
      sNo: 1,
      id: '6302',
      invoiceNo: 'DFL/JPT/2627/311',
      invoiceDate: '19/09/2026',
      poNo: '1102650877',
      consignee: 'C.P. FOOD PRODUCTS, INC.',
      shippingBillNo: '',
      status: 'Pending',
      plant: 'ALL',
      country: 'USA',
      portOfLoading: 'VISAKHAPATNAM',
      portOfDischarge: 'NEW YORK',
      countryOfDestination: 'U.S.A.',
      cartons: '1800',
      netWtKg: '8135.68',
      invoiceValueUsd: '191200',
      freight: '8200',
      otherDeductionsUsd: '20168.08',
      fobInr: '0.00',
      shippingDate: '',
      leoDate: '',
      exchangeRate: '83.85',
      sbFobUsd: '162831.92',
      sbFobInr: '13653456.49',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 2,
      id: '5743',
      invoiceNo: 'DFL/JPT/2627/310',
      invoiceDate: '18/09/2026',
      poNo: '60150DEV010C',
      consignee: 'CRUSTA C SAS',
      shippingBillNo: '',
      status: 'Pending',
      plant: 'ALL',
      country: 'FRANCE',
      portOfLoading: 'VISAKHAPATNAM',
      portOfDischarge: 'LE HAVRE',
      countryOfDestination: 'FRANCE',
      cartons: '1800',
      netWtKg: '8164.66',
      invoiceValueUsd: '188500',
      freight: '7800',
      otherDeductionsUsd: '18500.00',
      fobInr: '0.00',
      shippingDate: '',
      leoDate: '',
      exchangeRate: '83.85',
      sbFobUsd: '162200.00',
      sbFobInr: '13600470.00',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 3,
      id: '6131',
      invoiceNo: 'DFL/JPT/2627/309',
      invoiceDate: '18/09/2026',
      poNo: '1102650475',
      consignee: 'C.P. FOOD PRODUCTS, INC.',
      shippingBillNo: '',
      status: 'Pending',
      plant: 'ALL',
      country: 'USA',
      portOfLoading: 'VISAKHAPATNAM',
      portOfDischarge: 'LOS ANGELES',
      countryOfDestination: 'U.S.A.',
      cartons: '1800',
      netWtKg: '8140.00',
      invoiceValueUsd: '178000',
      freight: '8000',
      otherDeductionsUsd: '17000.00',
      fobInr: '0.00',
      shippingDate: '',
      leoDate: '',
      exchangeRate: '83.85',
      sbFobUsd: '153000.00',
      sbFobInr: '12829050.00',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 4,
      id: '7050',
      invoiceNo: 'DFL/JPT/2627/308',
      invoiceDate: '18/09/2026',
      poNo: 'DF/DF-5611',
      consignee: 'DEVI FISHERIES INC.',
      shippingBillNo: '',
      status: 'Pending',
      plant: 'ALL',
      country: 'USA',
      portOfLoading: 'VISAKHAPATNAM',
      portOfDischarge: 'BALTIMORE',
      countryOfDestination: 'U.S.A.',
      cartons: '1800',
      netWtKg: '8150.00',
      invoiceValueUsd: '193400',
      freight: '8500',
      otherDeductionsUsd: '19500.00',
      fobInr: '0.00',
      shippingDate: '',
      leoDate: '',
      exchangeRate: '83.85',
      sbFobUsd: '165400.00',
      sbFobInr: '13868790.00',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 5,
      id: '7051',
      invoiceNo: 'DFL/JPT/2627/307',
      invoiceDate: '18/09/2026',
      poNo: 'DF/DF-5612',
      consignee: 'DEVI FISHERIES INC.',
      shippingBillNo: '',
      status: 'Pending',
      plant: 'ALL',
      country: 'USA',
      portOfLoading: 'VISAKHAPATNAM',
      portOfDischarge: 'BALTIMORE',
      countryOfDestination: 'U.S.A.',
      cartons: '3600',
      netWtKg: '16300.00',
      invoiceValueUsd: '379000',
      freight: '17000',
      otherDeductionsUsd: '38000.00',
      fobInr: '0.00',
      shippingDate: '',
      leoDate: '',
      exchangeRate: '83.85',
      sbFobUsd: '324000.00',
      sbFobInr: '27167400.00',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 6,
      id: '7171',
      invoiceNo: 'DFL/KKD/2627/155',
      invoiceDate: '17/09/2026',
      poNo: 'QL150-2026Y37-313',
      consignee: 'Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.',
      shippingBillNo: '',
      status: 'Pending',
      plant: 'ALL',
      country: 'CHINA',
      portOfLoading: 'KRISHNAPATNAM',
      portOfDischarge: 'GUANGZHOU',
      countryOfDestination: 'CHINA',
      cartons: '1800',
      netWtKg: '8120.00',
      invoiceValueUsd: '184000',
      freight: '6500',
      otherDeductionsUsd: '15000.00',
      fobInr: '0.00',
      shippingDate: '',
      leoDate: '',
      exchangeRate: '83.85',
      sbFobUsd: '162500.00',
      sbFobInr: '13625625.00',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 7,
      id: '7169',
      invoiceNo: 'DFL/KKD/2627/154',
      invoiceDate: '17/09/2026',
      poNo: 'QL150-2026Y37-311',
      consignee: 'Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.',
      shippingBillNo: '',
      status: 'Pending',
      plant: 'ALL',
      country: 'CHINA',
      portOfLoading: 'KRISHNAPATNAM',
      portOfDischarge: 'GUANGZHOU',
      countryOfDestination: 'CHINA',
      cartons: '1800',
      netWtKg: '8125.00',
      invoiceValueUsd: '185500',
      freight: '6500',
      otherDeductionsUsd: '15200.00',
      fobInr: '0.00',
      shippingDate: '',
      leoDate: '',
      exchangeRate: '83.85',
      sbFobUsd: '163800.00',
      sbFobInr: '13734630.00',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 8,
      id: '7170',
      invoiceNo: 'DFL/KKD/2627/153',
      invoiceDate: '16/09/2026',
      poNo: 'QL150-2026Y37-312',
      consignee: 'Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.',
      shippingBillNo: '',
      status: 'Pending',
      plant: 'ALL',
      country: 'CHINA',
      portOfLoading: 'KRISHNAPATNAM',
      portOfDischarge: 'GUANGZHOU',
      countryOfDestination: 'CHINA',
      cartons: '1800',
      netWtKg: '8130.00',
      invoiceValueUsd: '186000',
      freight: '6500',
      otherDeductionsUsd: '15100.00',
      fobInr: '0.00',
      shippingDate: '',
      leoDate: '',
      exchangeRate: '83.85',
      sbFobUsd: '164400.00',
      sbFobInr: '13784940.00',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    }
  ],

  renderShippingBill(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#172B4D]">
        <!-- 1. Page Title Header (Image 2) -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">SHIPPING BILL</h1>
        </div>

        <!-- 2. Top Filter Card (Base Design System with AquaPulse Colors, Image 2) -->
        <div id="sales-sb-filter-card" class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT YEAR</label>
              <select id="sales-sb-year-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT EXPORTER :</label>
              <select id="sales-sb-exporter-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT CONSIGNEE :</label>
              <select id="sales-sb-consignee-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="ALL" selected>ALL</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="CRUSTA C SAS">CRUSTA C SAS</option>
                <option value="DEVI FISHERIES INC.">DEVI FISHERIES INC.</option>
                <option value="Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.">Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT PLANT :</label>
              <select id="sales-sb-plant-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="ALL" selected>ALL</option>
                <option value="VSP">VSP</option>
                <option value="JPT">JPT</option>
                <option value="KKD">KKD</option>
                <option value="SATYA">SATYA</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT COUNTRY:</label>
              <select id="sales-sb-country-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="USA">U.S.A.</option>
                <option value="FRANCE">FRANCE</option>
                <option value="CHINA">CHINA</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">INVOICE STATUS :</label>
              <select id="sales-sb-status-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="Pending" selected>Pending</option>
                <option value="Completed">Completed</option>
                <option value="All">All</option>
              </select>
            </div>

            <div>
              <button id="btn-sb-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterShippingBill()">
                <span>Search</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 3. Table Card (Image 2) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-sb-search-input" 
                placeholder="Search..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchShippingBill(this.value)"
              />
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3.5 py-1.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.toggleMoreSearch()">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-[#02a8b5] hover:bg-[#02a8b5] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.loadAllShippingBill()">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortShippingBill('sNo')">
                    <span class="inline-flex items-center gap-1">S.No <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">Inv No</th>
                  <th class="py-3 px-3">PoNo</th>
                  <th class="py-3 px-3">Consignee Name</th>
                  <th class="py-3 px-3">Shipping Bill No</th>
                  <th class="py-3 px-3 text-center">Invoice Status</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-sb-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Totals Card -->
          <div id="sales-sb-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderShippingBillRows(this.shippingBillDataset);
    this.renderShippingBillTotals(this.shippingBillDataset);
  },

  renderShippingBillRows(list) {
    const tbody = document.getElementById('sales-sb-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="py-8 text-center text-[#64748B] text-xs">
            No shipping bill records found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => {
      const isPending = (r.status || '').toLowerCase() === 'pending';
      const badgeHtml = isPending
        ? `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#EF4444] shadow-xs">Pending</span>`
        : `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#16A34A] shadow-xs">Completed</span>`;

      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
          <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.id}</td>
          <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openShippingBillModal('${r.id}')">${r.invoiceNo}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.poNo}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A]">${r.consignee}</td>
          <td class="py-3 px-3 font-mono text-[#0F172A]">${r.shippingBillNo || ''}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">${badgeHtml}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">
            <button 
              type="button" 
              class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
              title="Record Shipping Billing" 
              onclick="SalesView.openShippingBillModal('${r.id}')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderShippingBillTotals(list) {
    const el = document.getElementById('sales-sb-totals');
    if (!el) return;

    const count = list.length;
    const completed = list.filter(x => (x.status || '').toLowerCase() === 'completed').length;
    const pending = count - completed;
    const totalFobInr = list.reduce((sum, r) => sum + (parseFloat(r.sbFobInr) || 0), 0);

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Invoices</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Invoices</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Recorded SB</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${completed} <span class="text-xs font-semibold text-[#006644]">Recorded</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Shipping Bill</div>
          <div class="text-lg font-black text-[#991B1B] mt-0.5">${pending} <span class="text-xs font-semibold text-[#991B1B]">Pending</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total SB FOB Value</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">₹ ${(totalFobInr / 10000000).toFixed(2)} Cr <span class="text-[11px] font-semibold text-[#64748B]">(Customs EDI)</span></div>
        </div>
      </div>
    `;
  },

  filterShippingBill() {
    const year = document.getElementById('sales-sb-year-select')?.value || 'All';
    const exporter = document.getElementById('sales-sb-exporter-select')?.value || 'All';
    const consignee = document.getElementById('sales-sb-consignee-select')?.value || 'ALL';
    const plant = document.getElementById('sales-sb-plant-select')?.value || 'ALL';
    const country = document.getElementById('sales-sb-country-select')?.value || 'All';
    const status = document.getElementById('sales-sb-status-select')?.value || 'All';

    const filtered = this.shippingBillDataset.filter(r => {
      const matchYear = year === 'All' || r.year === year;
      const matchExporter = exporter === 'All' || r.exporter === exporter;
      const matchConsignee = consignee === 'ALL' || r.consignee === consignee;
      const matchPlant = plant === 'ALL' || r.plant === plant || plant === 'ALL';
      const matchCountry = country === 'All' || r.country === country;
      const matchStatus = status === 'All' || r.status === status;
      return matchYear && matchExporter && matchConsignee && matchPlant && matchCountry && matchStatus;
    });

    this.renderShippingBillRows(filtered);
    this.renderShippingBillTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered: Found ${filtered.length} shipping bill records`, 'info');
    }
  },

  searchShippingBill(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.renderShippingBillRows(this.shippingBillDataset);
      this.renderShippingBillTotals(this.shippingBillDataset);
      return;
    }

    const filtered = this.shippingBillDataset.filter(r => {
      return (r.id && r.id.toLowerCase().includes(q)) ||
        (r.invoiceNo && r.invoiceNo.toLowerCase().includes(q)) ||
        (r.poNo && r.poNo.toLowerCase().includes(q)) ||
        (r.consignee && r.consignee.toLowerCase().includes(q)) ||
        (r.shippingBillNo && r.shippingBillNo.toLowerCase().includes(q));
    });

    this.renderShippingBillRows(filtered);
    this.renderShippingBillTotals(filtered);
  },

  loadAllShippingBill() {
    const yearEl = document.getElementById('sales-sb-year-select');
    const exporterEl = document.getElementById('sales-sb-exporter-select');
    const consigneeEl = document.getElementById('sales-sb-consignee-select');
    const plantEl = document.getElementById('sales-sb-plant-select');
    const countryEl = document.getElementById('sales-sb-country-select');
    const statusEl = document.getElementById('sales-sb-status-select');
    const searchEl = document.getElementById('sales-sb-search-input');

    if (yearEl) yearEl.value = '2026-2027';
    if (exporterEl) exporterEl.value = 'DEVI FISHERIES LIMITED';
    if (consigneeEl) consigneeEl.value = 'ALL';
    if (plantEl) plantEl.value = 'ALL';
    if (countryEl) countryEl.value = 'All';
    if (statusEl) statusEl.value = 'Pending';
    if (searchEl) searchEl.value = '';

    this.renderShippingBillRows(this.shippingBillDataset);
    this.renderShippingBillTotals(this.shippingBillDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Loaded all ${this.shippingBillDataset.length} shipping bill records`, 'success');
    }
  },

  toggleMoreSbSearch() {
    const card = document.getElementById('sales-sb-filter-card');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      card.classList.add('ring-2', 'ring-[#006C7A]');
      setTimeout(() => card.classList.remove('ring-2', 'ring-[#006C7A]'), 1200);
    }
  },

  sortShippingBill(key) {
    this.shippingBillDataset.reverse();
    this.renderShippingBillRows(this.shippingBillDataset);
  },

  calculateSbFobInr() {
    const rateEl = document.getElementById('sb-input-rate');
    const fobUsEl = document.getElementById('sb-input-fobus');
    const outEl = document.getElementById('sb-input-fobinr-calc');
    if (!rateEl || !fobUsEl || !outEl) return;

    const rate = parseFloat(rateEl.value) || 0;
    const fobUs = parseFloat(fobUsEl.value) || 0;
    const fobInr = rate * fobUs;
    outEl.value = fobInr.toFixed(2);
  },

  openShippingBillModal(id) {
    const record = this.shippingBillDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert('Modal component is not loaded');
      return;
    }

    const calculatedInr = record.sbFobInr || (parseFloat(record.exchangeRate || 83.85) * parseFloat(record.sbFobUsd || 0)).toFixed(2);

    Modal.open({
      title: 'SHIPPING BILLING',
      size: '6xl',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <!-- Breadcrumb indicator -->
          <div class="text-[11px] font-medium text-[#64748B]">
            Orders &nbsp;&gt;&nbsp; Shipping Bill &nbsp;&gt;&nbsp; <span class="text-[#2563EB] font-semibold">Shipping Billing</span>
          </div>

          <!-- Card 1: Invoice Master Data (Image 3) -->
          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">INVOICE NO <span class="text-[#EF4444]">*</span></label>
                <input type="text" value="${record.invoiceNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">INVOICE DATE</label>
                <input type="text" value="${record.invoiceDate}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">CONSIGNEE</label>
                <input type="text" value="${record.consignee}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PORT OF LOADING</label>
                <input type="text" value="${record.portOfLoading || 'VISAKHAPATNAM'}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PORT OF DISCHARGE</label>
                <input type="text" value="${record.portOfDischarge || 'NEW YORK'}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">COUNTRY OF DESTINATION</label>
                <input type="text" value="${record.countryOfDestination || 'U.S.A.'}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">TOTAL NO.OF CARTONS</label>
                <input type="text" id="sb-input-cartons" value="${record.cartons || ''}" placeholder="Enter Total No.of Cartons" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">NET WT (KGS)</label>
                <input type="text" id="sb-input-netwt" value="${record.netWtKg || ''}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">INVOICE VALUE</label>
                <input type="text" id="sb-input-val" value="${record.invoiceValueUsd ? '$' + Number(record.invoiceValueUsd).toLocaleString() : ''}" placeholder="Enter Invoice Value" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">FREIGHT</label>
                <input type="text" id="sb-input-freight" value="${record.freight || '8200'}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">OTHER DEDUCTIONS $</label>
                <input type="text" id="sb-input-deductions" value="${record.otherDeductionsUsd || '20168.08'}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">FOB INR</label>
                <input type="text" id="sb-input-fobinr" value="${record.fobInr || '0.00'}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
            </div>
          </div>

          <!-- Card 2: Shipping Bill Particulars (Image 3) -->
          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">SHIPPING BILL NO <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="sb-input-sbno" value="${record.shippingBillNo || ''}" placeholder="Enter Shipping Bill No" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">SHIPPING DATE <span class="text-[#EF4444]">*</span></label>
                <input type="date" id="sb-input-shipdate" value="${record.shippingDate || '2026-10-23'}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">LEO DATE <span class="text-[#EF4444]">*</span></label>
                <input type="date" id="sb-input-leodate" value="${record.leoDate || '2026-10-23'}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">EXCHANGE RATE <span class="text-[#EF4444]">*</span></label>
                <input type="number" step="0.01" id="sb-input-rate" value="${record.exchangeRate || '83.85'}" oninput="SalesView.calculateSbFobInr()" placeholder="Enter Exchange Rate" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">SB FOB US $ <span class="text-[#EF4444]">*</span></label>
                <input type="number" step="0.01" id="sb-input-fobus" value="${record.sbFobUsd || '162831.92'}" oninput="SalesView.calculateSbFobInr()" placeholder="Enter SB FOB US$" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">SB FOB INR <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="sb-input-fobinr-calc" value="${calculatedInr}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#0F172A] outline-none">
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
          label: 'Save',
          type: 'primary',
          onClick: (m) => SalesView.saveShippingBill(record.id)
        }
      ]
    });
  },

  saveShippingBill(id) {
    const record = this.shippingBillDataset.find(x => x.id === id);
    if (!record) return;

    const sbNo = document.getElementById('sb-input-sbno')?.value.trim();
    const shipDate = document.getElementById('sb-input-shipdate')?.value;
    const leoDate = document.getElementById('sb-input-leodate')?.value;
    const rate = document.getElementById('sb-input-rate')?.value;
    const fobUs = document.getElementById('sb-input-fobus')?.value;
    const fobInr = document.getElementById('sb-input-fobinr-calc')?.value;

    if (!sbNo) {
      alert('Please enter Shipping Bill Number');
      return;
    }

    record.shippingBillNo = sbNo;
    record.shippingDate = shipDate || record.shippingDate;
    record.leoDate = leoDate || record.leoDate;
    record.exchangeRate = rate || record.exchangeRate;
    record.sbFobUsd = fobUs || record.sbFobUsd;
    record.sbFobInr = fobInr || record.sbFobInr;
    record.status = 'Completed';

    this.renderShippingBillRows(this.shippingBillDataset);
    this.renderShippingBillTotals(this.shippingBillDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Shipping Bill ${sbNo} saved successfully for Invoice ${record.invoiceNo}`, 'success');
    }
  },

    // ==========================================
  // COMMERCIAL INVOICE REGISTER (IMAGE 1 & 2)
  // ==========================================
  commercialInvoiceDataset: [
    {
      sNo: 1,
      id: '6131',
      piNumber: 'DFL/PI/062/26-27',
      invoiceNo: 'DFL/JPT/2627/309',
      invoiceDate: '18-09-2026',
      poNo: '1102650475',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      consignee: 'C.P. FOOD PRODUCTS, INC.',
      address: '10320 LITTLE PATUXENT PKWY SUITE 1188COLUMBIA, MD 21044 USA',
      paymentTerms: 'PAY IN 5 DAYS AFTER GOODS RECEIVING DATE - Non LC',
      shipmentTerms: 'DDP',
      shipmentTermsExt: '',
      discount: '0.00',
      freight: '8200',
      exRate: '95.10',
      bankDetails: 'SBI COMMERCIAL, RAM NAGAR - STATE BANK OF INDIA',
      showBank: 'Yes',
      showBlNo: 'Yes',
      showBlDate: 'Yes',
      dataLogger: 'SENSITECH-88214',
      placedAt: 'Door Left Top',
      issuedBy: 'DEVI FISHERIES LTD',
      showShippingDetails: 'Yes',
      specialNotesCommercial: 'Export of Frozen Farmed Vannamei White Shrimp to USA. Quality conforming to USFDA regulations.',
      specialNotesPacking: 'Packed in master corrugated cartons with poly-liner and dry-ice pack.',
      productDescription: 'FROZEN COOKED VANNAMEI WHITE PEELED AND DEVEINED TAIL OFF IQF (LITOPENAEUS VANNAMEI)',
      specs: 'NET WT WITHOUT GLAZE',
      packing: '14 X 24 OZ',
      grade: '100/150',
      cartons: 1680,
      codes: 'LOT-26/901',
      productionDate: '2026-09-18',
      bestBeforeDate: '2028-09-17',
      country: 'USA',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      totalValueUsd: 178000,
      status: 'Pending'
    },
    {
      sNo: 2,
      id: '7050',
      piNumber: 'DFL/PI/968/26-27',
      invoiceNo: 'DFL/JPT/2627/308',
      invoiceDate: '18-09-2026',
      poNo: 'DF/DF-5611',
      buyer: 'DEVI FISHERIES INC.',
      consignee: 'DEVI FISHERIES INC.',
      address: '1820 WATERFORD PARKWAY, EDISON, NJ 08817 USA',
      paymentTerms: 'CAD 60 DAYS FROM ONBOARD DATE',
      shipmentTerms: 'CIF',
      shipmentTermsExt: 'NEW YORK PORT',
      discount: '0.00',
      freight: '8500',
      exRate: '95.10',
      bankDetails: 'SBI COMMERCIAL, RAM NAGAR - STATE BANK OF INDIA',
      showBank: 'Yes',
      showBlNo: 'Yes',
      showBlDate: 'Yes',
      dataLogger: 'SENSITECH-88215',
      placedAt: 'Door Center',
      issuedBy: 'DEVI FISHERIES LTD',
      showShippingDetails: 'Yes',
      specialNotesCommercial: 'Freshly harvest shrimp processed at BRC-grade facility.',
      specialNotesPacking: 'Cartons marked DFL Brand standard labels.',
      productDescription: 'FROZEN RAW EASY PEEL VANNAMEI WHITE SHRIMP IQF',
      specs: 'CHEMICAL FREE RAW P&D',
      packing: '10 X 2 LB',
      grade: '16/20',
      cartons: 1800,
      codes: 'LOT-26/902',
      productionDate: '2026-09-18',
      bestBeforeDate: '2028-09-17',
      country: 'USA',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      totalValueUsd: 193400,
      status: 'Pending'
    },
    {
      sNo: 3,
      id: '7051',
      piNumber: 'DFL/PI/969/26-27',
      invoiceNo: 'DFL/JPT/2627/307',
      invoiceDate: '18-09-2026',
      poNo: 'DF/DF-5612',
      buyer: 'DEVI FISHERIES INC.',
      consignee: 'DEVI FISHERIES INC.',
      address: '1820 WATERFORD PARKWAY, EDISON, NJ 08817 USA',
      paymentTerms: 'CAD 60 DAYS FROM ONBOARD DATE',
      shipmentTerms: 'CIF',
      shipmentTermsExt: 'BALTIMORE PORT',
      discount: '0.00',
      freight: '17000',
      exRate: '95.10',
      bankDetails: 'SBI COMMERCIAL, RAM NAGAR - STATE BANK OF INDIA',
      showBank: 'Yes',
      showBlNo: 'Yes',
      showBlDate: 'Yes',
      dataLogger: 'SENSITECH-88216',
      placedAt: 'Door Right Top',
      issuedBy: 'DEVI FISHERIES LTD',
      showShippingDetails: 'Yes',
      specialNotesCommercial: 'Direct shipment with temperature logger recording -20C throughout transit.',
      specialNotesPacking: 'Export quality 5-ply cartons.',
      productDescription: 'FROZEN RAW HEADLESS SHELL ON (HLSO) VANNAMEI SHRIMP BLOCK',
      specs: 'REGULAR PACKING WITH 20% GLAZE',
      packing: '6 X 1.8 KG',
      grade: '21/25',
      cartons: 3600,
      codes: 'LOT-26/903',
      productionDate: '2026-09-18',
      bestBeforeDate: '2028-09-17',
      country: 'USA',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      totalValueUsd: 379000,
      status: 'Pending'
    },
    {
      sNo: 4,
      id: '7196',
      piNumber: 'DFL/PI/1109/26-27',
      invoiceNo: 'DFL/SNM/2627/145',
      invoiceDate: '18-09-2026',
      poNo: 'DF 1580',
      buyer: 'MARK FOODS LLC',
      consignee: 'MARK FOODS LLC',
      address: '1440 BROADWAY, 23RD FLOOR, NEW YORK, NY 10018 USA',
      paymentTerms: 'LC 90 DAYS SIGHT',
      shipmentTerms: 'CFR',
      shipmentTermsExt: 'NEW YORK',
      discount: '0.00',
      freight: '7500',
      exRate: '95.10',
      bankDetails: 'SBI COMMERCIAL, RAM NAGAR - STATE BANK OF INDIA',
      showBank: 'Yes',
      showBlNo: 'Yes',
      showBlDate: 'Yes',
      dataLogger: 'SENSITECH-88217',
      placedAt: 'Door Center',
      issuedBy: 'DEVI FISHERIES LTD',
      showShippingDetails: 'Yes',
      specialNotesCommercial: 'Premium restaurant quality peeled tail-on.',
      specialNotesPacking: 'Standard Mark Foods buyer specified cartons.',
      productDescription: 'FROZEN COOKED TAIL-ON VANNAMEI WHITE SHRIMP IQF',
      specs: '100% NET WEIGHT GLAZE PROTECTED',
      packing: '10 X 2 LB',
      grade: '26/30',
      cartons: 1750,
      codes: 'LOT-26/904',
      productionDate: '2026-09-18',
      bestBeforeDate: '2028-09-17',
      country: 'USA',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      totalValueUsd: 186500,
      status: 'Pending'
    },
    {
      sNo: 5,
      id: '7073',
      piNumber: 'DFL/PI/990/26-27',
      invoiceNo: 'DFL/SNM/2627/144',
      invoiceDate: '18-09-2026',
      poNo: 'DF1569',
      buyer: 'MARK FOODS LLC',
      consignee: 'MARK FOODS LLC',
      address: '1440 BROADWAY, 23RD FLOOR, NEW YORK, NY 10018 USA',
      paymentTerms: 'LC 90 DAYS SIGHT',
      shipmentTerms: 'CFR',
      shipmentTermsExt: 'NEW YORK',
      discount: '0.00',
      freight: '7500',
      exRate: '95.10',
      bankDetails: 'SBI COMMERCIAL, RAM NAGAR - STATE BANK OF INDIA',
      showBank: 'Yes',
      showBlNo: 'Yes',
      showBlDate: 'Yes',
      dataLogger: 'SENSITECH-88218',
      placedAt: 'Door Left Top',
      issuedBy: 'DEVI FISHERIES LTD',
      showShippingDetails: 'Yes',
      specialNotesCommercial: 'Export of Frozen Farmed Shrimp.',
      specialNotesPacking: 'Strapped and shrink-wrapped pallets.',
      productDescription: 'FROZEN RAW PEELED & UNDEVEINED (PUD) SHRIMP',
      specs: '100% NATURAL NO PHOSPHATE ADDED',
      packing: '5 X 2 KG',
      grade: '31/40',
      cartons: 1800,
      codes: 'LOT-26/905',
      productionDate: '2026-09-18',
      bestBeforeDate: '2028-09-17',
      country: 'USA',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      totalValueUsd: 179200,
      status: 'Pending'
    },
    {
      sNo: 6,
      id: '7183',
      piNumber: 'DFL/PI/1096/26-27',
      invoiceNo: 'DFL/SNM/2627/143',
      invoiceDate: '18-09-2026',
      poNo: 'C10894',
      buyer: 'SEA PORT PRODUCTS CORPORATION',
      consignee: 'SEA PORT PRODUCTS CORPORATION',
      address: '100 RUE DE LA PAIX, SUITE 400, PARIS, FRANCE',
      paymentTerms: 'DP AT SIGHT',
      shipmentTerms: 'CIF',
      shipmentTermsExt: 'LE HAVRE',
      discount: '0.00',
      freight: '8800',
      exRate: '95.10',
      bankDetails: 'SBI COMMERCIAL, RAM NAGAR - STATE BANK OF INDIA',
      showBank: 'Yes',
      showBlNo: 'Yes',
      showBlDate: 'Yes',
      dataLogger: 'SENSITECH-88219',
      placedAt: 'Door Center',
      issuedBy: 'DEVI FISHERIES LTD',
      showShippingDetails: 'Yes',
      specialNotesCommercial: 'Conforming to EU microbiological standards.',
      specialNotesPacking: 'Multilingual French/English carton print.',
      productDescription: 'FROZEN RAW HLSO VANNAMEI SHRIMP IQF',
      specs: 'ASC CERTIFIED RESPONSIBLE AQUACULTURE',
      packing: '10 X 1 KG',
      grade: '41/50',
      cartons: 1800,
      codes: 'LOT-26/906',
      productionDate: '2026-09-18',
      bestBeforeDate: '2028-09-17',
      country: 'FRANCE',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      totalValueUsd: 182400,
      status: 'Pending'
    },
    {
      sNo: 7,
      id: '7052',
      piNumber: 'DFL/PI/970/26-27',
      invoiceNo: 'DFL/SNM/2627/142',
      invoiceDate: '18-09-2026',
      poNo: 'DF/DF-5621',
      buyer: 'DEVI FISHERIES INC.',
      consignee: 'DEVI FISHERIES INC.',
      address: '1820 WATERFORD PARKWAY, EDISON, NJ 08817 USA',
      paymentTerms: 'CAD 60 DAYS FROM ONBOARD DATE',
      shipmentTerms: 'DDP',
      shipmentTermsExt: 'LOS ANGELES PORT',
      discount: '0.00',
      freight: '9200',
      exRate: '95.10',
      bankDetails: 'SBI COMMERCIAL, RAM NAGAR - STATE BANK OF INDIA',
      showBank: 'Yes',
      showBlNo: 'Yes',
      showBlDate: 'Yes',
      dataLogger: 'SENSITECH-88220',
      placedAt: 'Door Left Top',
      issuedBy: 'DEVI FISHERIES LTD',
      showShippingDetails: 'Yes',
      specialNotesCommercial: 'Export of Frozen Cooked Peeled Tail-On.',
      specialNotesPacking: 'Corrugated cartons, cold chain certified.',
      productDescription: 'FROZEN COOKED TAIL-ON VANNAMEI WHITE SHRIMP IQF',
      specs: 'SALT 1.2% MAX, READY TO EAT',
      packing: '10 X 2 LB',
      grade: '31/40',
      cartons: 1800,
      codes: 'LOT-26/907',
      productionDate: '2026-09-18',
      bestBeforeDate: '2028-09-17',
      country: 'USA',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      totalValueUsd: 191500,
      status: 'Pending'
    },
    {
      sNo: 8,
      id: '7053',
      piNumber: 'DFL/PI/971/26-27',
      invoiceNo: 'DFL/SNM/2627/141',
      invoiceDate: '17-09-2026',
      poNo: 'DF/DF-5622',
      buyer: 'DEVI FISHERIES INC.',
      consignee: 'DEVI FISHERIES INC.',
      address: '1820 WATERFORD PARKWAY, EDISON, NJ 08817 USA',
      paymentTerms: 'CAD 60 DAYS FROM ONBOARD DATE',
      shipmentTerms: 'DDP',
      shipmentTermsExt: 'LOS ANGELES PORT',
      discount: '0.00',
      freight: '9200',
      exRate: '95.10',
      bankDetails: 'SBI COMMERCIAL, RAM NAGAR - STATE BANK OF INDIA',
      showBank: 'Yes',
      showBlNo: 'Yes',
      showBlDate: 'Yes',
      dataLogger: 'SENSITECH-88221',
      placedAt: 'Door Center',
      issuedBy: 'DEVI FISHERIES LTD',
      showShippingDetails: 'Yes',
      specialNotesCommercial: 'Export of Frozen Farmed Raw HLSO Shrimp.',
      specialNotesPacking: 'Standard Devi Fisheries master cartons.',
      productDescription: 'FROZEN RAW HLSO VANNAMEI WHITE SHRIMP BLOCK',
      specs: 'UNIFORM COLOR, COUNT AND GLAZE',
      packing: '6 X 1.8 KG',
      grade: '16/20',
      cartons: 1800,
      codes: 'LOT-26/908',
      productionDate: '2026-09-17',
      bestBeforeDate: '2028-09-16',
      country: 'USA',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      totalValueUsd: 194000,
      status: 'Pending'
    }
  ],

  renderCommercialInvoice(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#172B4D]">
        <!-- 1. Page Title Header (Image 1) -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">COMMERCIAL INVOICE</h1>
        </div>

        <!-- 2. Top Filter Card (Base Design System with AquaPulse Colors, Image 1) -->
        <div id="sales-ci-filter-card" class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT YEAR</label>
              <select id="sales-ci-year-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT EXPORTER :</label>
              <select id="sales-ci-exporter-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT CONSIGNEE :</label>
              <select id="sales-ci-consignee-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="DEVI FISHERIES INC.">DEVI FISHERIES INC.</option>
                <option value="MARK FOODS LLC">MARK FOODS LLC</option>
                <option value="SEA PORT PRODUCTS CORPORATION">SEA PORT PRODUCTS CORPORATION</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT COUNTRY:</label>
              <select id="sales-ci-country-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="USA">U.S.A.</option>
                <option value="FRANCE">FRANCE</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">INVOICE STATUS :</label>
              <select id="sales-ci-status-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="Pending" selected>Pending</option>
                <option value="Completed">Completed</option>
                <option value="All">All</option>
              </select>
            </div>

            <div>
              <button id="btn-ci-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterCommercialInvoices()">
                <span>Search</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 3. Table Card (Image 1) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-ci-search-input" 
                placeholder="Search..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchCommercialInvoices(this.value)"
              />
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3.5 py-1.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.toggleMoreSearch()">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-[#02a8b5] hover:bg-[#02a8b5] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.loadAllCommercialInvoices()">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortCommercialInvoices('sNo')">
                    <span class="inline-flex items-center gap-1">SNO <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">P.Invoice NO</th>
                  <th class="py-3 px-3">Invoice NO</th>
                  <th class="py-3 px-3">Invoice Date</th>
                  <th class="py-3 px-3">Po NO</th>
                  <th class="py-3 px-3">Buyer</th>
                  <th class="py-3 px-3 text-center">Status</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-ci-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Totals Card -->
          <div id="sales-ci-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderCommercialInvoiceRows(this.commercialInvoiceDataset);
    this.renderCommercialInvoiceTotals(this.commercialInvoiceDataset);
  },

  renderCommercialInvoiceRows(list) {
    const tbody = document.getElementById('sales-ci-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="py-8 text-center text-[#64748B] text-xs">
            No commercial invoices found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => {
      const isPending = (r.status || '').toLowerCase() === 'pending';
      const badgeHtml = isPending
        ? `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#EF4444] shadow-xs">Pending</span>`
        : `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#16A34A] shadow-xs">Completed</span>`;

      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
          <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.id}</td>
          <td class="py-3 px-3 text-[#64748B]">${r.piNumber}</td>
          <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openCommercialInvoiceModal('${r.id}')">${r.invoiceNo}</td>
          <td class="py-3 px-3 text-[#0F172A] whitespace-nowrap">${r.invoiceDate}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.poNo}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A]">${r.buyer}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">${badgeHtml}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">
            <button 
              type="button" 
              class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
              title="Generate Commercial Invoice" 
              onclick="SalesView.openCommercialInvoiceModal('${r.id}')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderCommercialInvoiceTotals(list) {
    const el = document.getElementById('sales-ci-totals');
    if (!el) return;

    const count = list.length;
    const completed = list.filter(x => (x.status || '').toLowerCase() === 'completed').length;
    const pending = count - completed;
    const totalUsd = list.reduce((sum, r) => sum + (parseFloat(r.totalValueUsd) || 180000), 0);
    const totalCtns = list.reduce((sum, r) => sum + (parseInt(r.cartons) || 1800), 0);

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Invoices</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Invoices</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Finalized</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${completed} <span class="text-xs font-semibold text-[#006644]">Generated</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Settlement</div>
          <div class="text-lg font-black text-[#991B1B] mt-0.5">${pending} <span class="text-xs font-semibold text-[#991B1B]">Pending</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Commercial Value</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">$${totalUsd.toLocaleString()} <span class="text-[11px] font-semibold text-[#64748B]">(${totalCtns.toLocaleString()} Ctns)</span></div>
        </div>
      </div>
    `;
  },

  filterCommercialInvoices() {
    const year = document.getElementById('sales-ci-year-select')?.value || 'All';
    const exporter = document.getElementById('sales-ci-exporter-select')?.value || 'All';
    const consignee = document.getElementById('sales-ci-consignee-select')?.value || 'All';
    const country = document.getElementById('sales-ci-country-select')?.value || 'All';
    const status = document.getElementById('sales-ci-status-select')?.value || 'All';

    const filtered = this.commercialInvoiceDataset.filter(r => {
      const matchYear = year === 'All' || r.year === year;
      const matchExporter = exporter === 'All' || r.exporter === exporter;
      const matchConsignee = consignee === 'All' || r.buyer === consignee;
      const matchCountry = country === 'All' || r.country === country;
      const matchStatus = status === 'All' || r.status === status;
      return matchYear && matchExporter && matchConsignee && matchCountry && matchStatus;
    });

    this.renderCommercialInvoiceRows(filtered);
    this.renderCommercialInvoiceTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered: Found ${filtered.length} commercial invoice records`, 'info');
    }
  },

  searchCommercialInvoices(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.renderCommercialInvoiceRows(this.commercialInvoiceDataset);
      this.renderCommercialInvoiceTotals(this.commercialInvoiceDataset);
      return;
    }

    const filtered = this.commercialInvoiceDataset.filter(r => {
      return (r.id && r.id.toLowerCase().includes(q)) ||
        (r.piNumber && r.piNumber.toLowerCase().includes(q)) ||
        (r.invoiceNo && r.invoiceNo.toLowerCase().includes(q)) ||
        (r.poNo && r.poNo.toLowerCase().includes(q)) ||
        (r.buyer && r.buyer.toLowerCase().includes(q));
    });

    this.renderCommercialInvoiceRows(filtered);
    this.renderCommercialInvoiceTotals(filtered);
  },

  loadAllCommercialInvoices() {
    const yearEl = document.getElementById('sales-ci-year-select');
    const exporterEl = document.getElementById('sales-ci-exporter-select');
    const consigneeEl = document.getElementById('sales-ci-consignee-select');
    const countryEl = document.getElementById('sales-ci-country-select');
    const statusEl = document.getElementById('sales-ci-status-select');
    const searchEl = document.getElementById('sales-ci-search-input');

    if (yearEl) yearEl.value = '2026-2027';
    if (exporterEl) exporterEl.value = 'DEVI FISHERIES LIMITED';
    if (consigneeEl) consigneeEl.value = 'All';
    if (countryEl) countryEl.value = 'All';
    if (statusEl) statusEl.value = 'Pending';
    if (searchEl) searchEl.value = '';

    this.renderCommercialInvoiceRows(this.commercialInvoiceDataset);
    this.renderCommercialInvoiceTotals(this.commercialInvoiceDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Loaded all ${this.commercialInvoiceDataset.length} commercial invoice records`, 'success');
    }
  },

  toggleMoreCiSearch() {
    const card = document.getElementById('sales-ci-filter-card');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      card.classList.add('ring-2', 'ring-[#006C7A]');
      setTimeout(() => card.classList.remove('ring-2', 'ring-[#006C7A]'), 1200);
    }
  },

  sortCommercialInvoices(key) {
    this.commercialInvoiceDataset.reverse();
    this.renderCommercialInvoiceRows(this.commercialInvoiceDataset);
  },

  openCommercialInvoiceModal(id) {
    const record = this.commercialInvoiceDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert('Modal component is not loaded');
      return;
    }

    Modal.open({
      title: 'COMMERCIAL INVOICE',
      size: '6xl',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <!-- Breadcrumb indicator (Image 2) -->
          <div class="text-[11px] font-medium text-[#64748B]">
            Orders &nbsp;&gt;&nbsp; Commercial Invoice &nbsp;&gt;&nbsp; <span class="text-[#2563EB] font-semibold">Commercial Invoice</span>
          </div>

          <!-- Card 1: Header / Settlement Information (Image 2) -->
          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Custom Invoice</label>
                <input type="text" value="${record.invoiceNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PO No</label>
                <input type="text" value="${record.poNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Consignee</label>
                <input type="text" value="${record.consignee}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Address</label>
                <input type="text" value="${record.address}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none" title="${record.address}">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Payment Terms <span class="text-[#EF4444]">*</span></label>
                <select id="ci-input-payment-terms" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="PAY IN 5 DAYS AFTER GOODS RECEIVING DATE - Non LC" selected>PAY IN 5 DAYS AFTER GOODS RECEIVING DATE - Non LC</option>
                  <option value="CAD 60 DAYS FROM ONBOARD DATE">CAD 60 DAYS FROM ONBOARD DATE</option>
                  <option value="LC 90 DAYS SIGHT">LC 90 DAYS SIGHT</option>
                  <option value="DP AT SIGHT">DP AT SIGHT</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Shipment Terms <span class="text-[#EF4444]">*</span></label>
                <select id="ci-input-shipment-terms" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="DDP" ${record.shipmentTerms === 'DDP' ? 'selected' : ''}>DDP</option>
                  <option value="CIF" ${record.shipmentTerms === 'CIF' ? 'selected' : ''}>CIF</option>
                  <option value="FOB" ${record.shipmentTerms === 'FOB' ? 'selected' : ''}>FOB</option>
                  <option value="CFR" ${record.shipmentTerms === 'CFR' ? 'selected' : ''}>CFR</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Shipment Terms Ext</label>
                <input type="text" id="ci-input-shipment-ext" value="${record.shipmentTermsExt || ''}" placeholder="Enter ShippingTerm Ext" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Discount</label>
                <input type="text" id="ci-input-discount" value="${record.discount || '0.00'}" placeholder="Enter Discount" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Freight <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="ci-input-freight" value="${record.freight || '8200'}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">ExRate <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="ci-input-exrate" value="${record.exRate || '95.10'}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Bank Details</label>
                <select id="ci-input-bank-details" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="SBI COMMERCIAL, RAM NAGAR - STATE BANK OF INDIA" selected>SBI COMMERCIAL, RAM NAGAR - STATE BANK OF INDI...</option>
                  <option value="HDFC BANK - VISAKHAPATNAM SPECIAL BRANCH">HDFC BANK - VISAKHAPATNAM SPECIAL BRANCH</option>
                  <option value="ICICI BANK - SEAFOOD EXPORT HUB">ICICI BANK - SEAFOOD EXPORT HUB</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Show Bank <span class="text-[#EF4444]">*</span></label>
                <select id="ci-input-show-bank" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Yes" selected>Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Show BL No <span class="text-[#EF4444]">*</span></label>
                <select id="ci-input-show-blno" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Yes" selected>Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Show BL Date <span class="text-[#EF4444]">*</span></label>
                <select id="ci-input-show-bldate" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Yes" selected>Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Data Logger</label>
                <input type="text" id="ci-input-datalogger" value="${record.dataLogger || ''}" placeholder="Enter Data Logger Details" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Placed AT</label>
                <input type="text" id="ci-input-placedat" value="${record.placedAt || ''}" placeholder="Enter Data Logger Positions" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Issued By</label>
                <input type="text" id="ci-input-issuedby" value="${record.issuedBy || 'DEVI FISHERIES LTD'}" placeholder="Enter Issued By" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Show Shipping Details <span class="text-[#EF4444]">*</span></label>
                <select id="ci-input-show-shipping" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Yes" selected>Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Special Notes(Commercial Description)</label>
              <textarea id="ci-input-notes-comm" rows="2" placeholder="Enter Special Notes" class="w-full p-2 rounded-lg border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">${record.specialNotesCommercial || ''}</textarea>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Special Notes(Packing List Description)</label>
              <textarea id="ci-input-notes-pack" rows="2" placeholder="Enter Remarks" class="w-full p-2 rounded-lg border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">${record.specialNotesPacking || ''}</textarea>
            </div>
          </div>

          <!-- Card 2: Items Table / Commercial Specification (Image 2) -->
          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3 shadow-2xs">
            <div class="flex items-center justify-between pb-1">
              <span class="text-xs font-bold uppercase tracking-wider text-[#0F172A]">Commercial Invoice Line Items</span>
            </div>

            <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                    <th class="py-2.5 px-3">Product Description</th>
                    <th class="py-2.5 px-3">Specs</th>
                    <th class="py-2.5 px-3">Packing</th>
                    <th class="py-2.5 px-3">Grade</th>
                    <th class="py-2.5 px-3">Cartons</th>
                    <th class="py-2.5 px-3">Codes</th>
                    <th class="py-2.5 px-3">ProductionDate</th>
                    <th class="py-2.5 px-3">Best Before Date</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#F1F5F9]">
                  <tr class="hover:bg-[#F8FAFC] transition-colors">
                    <td class="py-2.5 px-3 min-w-[220px]">
                      <textarea id="ci-input-proddesc" rows="2" class="w-full p-1.5 rounded border border-[#CBD5E1] bg-[#F8FAFC] font-semibold text-[11px] text-[#0F172A] outline-none">${record.productDescription}</textarea>
                    </td>
                    <td class="py-2.5 px-3 min-w-[120px]">
                      <textarea id="ci-input-specs" rows="2" class="w-full p-1.5 rounded border border-[#CBD5E1] bg-white font-medium text-[11px] text-[#0F172A] outline-none focus:border-[#006C7A]">${record.specs}</textarea>
                    </td>
                    <td class="py-2.5 px-3 font-semibold text-[#0F172A] whitespace-nowrap">${record.packing}</td>
                    <td class="py-2.5 px-3 font-semibold text-[#0F172A] whitespace-nowrap">${record.grade}</td>
                    <td class="py-2.5 px-3 font-bold text-[#0F172A]">${record.cartons}</td>
                    <td class="py-2.5 px-3 min-w-[110px]">
                      <input type="text" id="ci-input-codes" value="${record.codes}" placeholder="Enter Codes" class="w-full h-8 px-2 rounded border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                    </td>
                    <td class="py-2.5 px-3 min-w-[130px]">
                      <input type="date" id="ci-input-proddate" value="${record.productionDate}" class="w-full h-8 px-2 rounded border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                    </td>
                    <td class="py-2.5 px-3 min-w-[130px]">
                      <input type="date" id="ci-input-bbdate" value="${record.bestBeforeDate}" class="w-full h-8 px-2 rounded border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                    </td>
                  </tr>
                </tbody>
              </table>
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
          label: 'Save',
          type: 'primary',
          onClick: (m) => SalesView.saveCommercialInvoice(record.id)
        }
      ]
    });
  },

  saveCommercialInvoice(id) {
    const record = this.commercialInvoiceDataset.find(x => x.id === id);
    if (!record) return;

    const paymentTerms = document.getElementById('ci-input-payment-terms')?.value;
    const shipmentTerms = document.getElementById('ci-input-shipment-terms')?.value;
    const freight = document.getElementById('ci-input-freight')?.value;
    const exRate = document.getElementById('ci-input-exrate')?.value;
    const bankDetails = document.getElementById('ci-input-bank-details')?.value;
    const codes = document.getElementById('ci-input-codes')?.value;

    record.paymentTerms = paymentTerms || record.paymentTerms;
    record.shipmentTerms = shipmentTerms || record.shipmentTerms;
    record.freight = freight || record.freight;
    record.exRate = exRate || record.exRate;
    record.bankDetails = bankDetails || record.bankDetails;
    record.codes = codes || record.codes;
    record.status = 'Completed';

    this.renderCommercialInvoiceRows(this.commercialInvoiceDataset);
    this.renderCommercialInvoiceTotals(this.commercialInvoiceDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Commercial Invoice finalized for ${record.invoiceNo}`, 'success');
    }
  },


};
