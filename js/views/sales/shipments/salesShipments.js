// Sales Module — Shipments & Logistics (FDA, Clearing Agents, Delay Logs)
export const salesShipments = {
    // ==========================================
  // 1. ETA / ETD STATUS REGISTER (IMAGE 1)
  // ==========================================
  etaDataset: [
    {
      sNo: 1,
      id: '6131',
      invoiceNo: 'DFL/JPT/2627/309',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      poNo: '1102650475',
      product: 'COOKED VANNAMEI SHRIMP',
      brand: 'CP SELECT',
      mcs: '1680',
      blNo: 'MEDUAPX2609918',
      containerNo: 'MSCU7397679',
      finalDestination: 'LOS ANGELES, CA',
      onBoardDate: '18-09-2026',
      actualEta: '24-10-2026',
      etaFd: '26-10-2026',
      gateOutDate: '27-10-2026',
      entryNumber: 'CBP-8841029',
      liner: 'MSC',
      deliveryTerms: 'DDP',
      transitDays: '36',
      transitDaysPerLiner: '36',
      isFda: 'Yes',
      plant: 'JPT',
      exporter: 'DEVI FISHERIES LIMITED',
      consignee: 'C.P. FOOD PRODUCTS, INC.'
    },
    {
      sNo: 2,
      id: '7050',
      invoiceNo: 'DFL/JPT/2627/308',
      buyer: 'DEVI FISHERIES INC.',
      poNo: 'DF/DF-5611',
      product: 'RAW EASY PEEL SHRIMP',
      brand: 'DEVI FEAST',
      mcs: '1800',
      blNo: 'MAEU9821034',
      containerNo: 'MSKU4109823',
      finalDestination: 'BALTIMORE, MD',
      onBoardDate: '18-09-2026',
      actualEta: '26-10-2026',
      etaFd: '28-10-2026',
      gateOutDate: '29-10-2026',
      entryNumber: 'CBP-8841030',
      liner: 'Maersk Line',
      deliveryTerms: 'CIF',
      transitDays: '38',
      transitDaysPerLiner: '38',
      isFda: 'Yes',
      plant: 'JPT',
      exporter: 'DEVI FISHERIES LIMITED',
      consignee: 'DEVI FISHERIES INC.'
    },
    {
      sNo: 3,
      id: '7051',
      invoiceNo: 'DFL/JPT/2627/307',
      buyer: 'DEVI FISHERIES INC.',
      poNo: 'DF/DF-5612',
      product: 'RAW HLSO SHRIMP BLOCK',
      brand: 'DEVI GOLD',
      mcs: '3600',
      blNo: 'HLCU9920145',
      containerNo: 'HLCU8821945',
      finalDestination: 'BALTIMORE, MD',
      onBoardDate: '18-09-2026',
      actualEta: '28-10-2026',
      etaFd: '30-10-2026',
      gateOutDate: '31-10-2026',
      entryNumber: 'CBP-8841031',
      liner: 'Hapag-Lloyd',
      deliveryTerms: 'CIF',
      transitDays: '40',
      transitDaysPerLiner: '40',
      isFda: 'Yes',
      plant: 'JPT',
      exporter: 'DEVI FISHERIES LIMITED',
      consignee: 'DEVI FISHERIES INC.'
    },
    {
      sNo: 4,
      id: '7196',
      invoiceNo: 'DFL/SNM/2627/145',
      buyer: 'MARK FOODS LLC',
      poNo: 'DF 1580',
      product: 'COOKED TAIL-ON SHRIMP IQF',
      brand: 'MARK SELECT',
      mcs: '1750',
      blNo: 'CMAU7710294',
      containerNo: 'CMAU9102482',
      finalDestination: 'NEW YORK, NY',
      onBoardDate: '18-09-2026',
      actualEta: '25-10-2026',
      etaFd: '27-10-2026',
      gateOutDate: '28-10-2026',
      entryNumber: 'CBP-8841032',
      liner: 'CMA CGM',
      deliveryTerms: 'CFR',
      transitDays: '37',
      transitDaysPerLiner: '37',
      isFda: 'Yes',
      plant: 'SNM',
      exporter: 'DEVI FISHERIES LIMITED',
      consignee: 'MARK FOODS LLC'
    },
    {
      sNo: 5,
      id: '7073',
      invoiceNo: 'DFL/SNM/2627/144',
      buyer: 'MARK FOODS LLC',
      poNo: 'DF1569',
      product: 'RAW PUD SHRIMP',
      brand: 'MARK SELECT',
      mcs: '1800',
      blNo: 'MEDUAPX2609920',
      containerNo: 'MSCU8810294',
      finalDestination: 'NEW YORK, NY',
      onBoardDate: '18-09-2026',
      actualEta: '27-10-2026',
      etaFd: '29-10-2026',
      gateOutDate: '30-10-2026',
      entryNumber: 'CBP-8841033',
      liner: 'MSC',
      deliveryTerms: 'CFR',
      transitDays: '39',
      transitDaysPerLiner: '39',
      isFda: 'Yes',
      plant: 'SNM',
      exporter: 'DEVI FISHERIES LIMITED',
      consignee: 'MARK FOODS LLC'
    },
    {
      sNo: 6,
      id: '7183',
      invoiceNo: 'DFL/SNM/2627/143',
      buyer: 'SEA PORT PRODUCTS CORPORATION',
      poNo: 'C10894',
      product: 'RAW HLSO VANNAMEI SHRIMP',
      brand: 'SEA PORT BLUE',
      mcs: '1800',
      blNo: 'ONEY9920144',
      containerNo: 'ONEY4410928',
      finalDestination: 'LE HAVRE, FRANCE',
      onBoardDate: '18-09-2026',
      actualEta: '22-10-2026',
      etaFd: '24-10-2026',
      gateOutDate: '25-10-2026',
      entryNumber: 'FR-CBP-110294',
      liner: 'ONE Line',
      deliveryTerms: 'CIF',
      transitDays: '34',
      transitDaysPerLiner: '34',
      isFda: 'No (EU Compliant)',
      plant: 'SNM',
      exporter: 'DEVI FISHERIES LIMITED',
      consignee: 'SEA PORT PRODUCTS CORPORATION'
    }
  ],

  renderEtaStatus(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#172B4D]">
        <!-- 1. Page Title Header (Image 1) -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">ETA/ETD STATUS</h1>
        </div>

        <!-- 2. Top Filter Card (Base Design System, Image 1) -->
        <div id="sales-eta-filter-card" class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Exporter:</label>
              <select id="sales-eta-exporter-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Plant</label>
              <select id="sales-eta-plant-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="VSP">VSP</option>
                <option value="JPT">JPT</option>
                <option value="KKD">KKD</option>
                <option value="SNM">SNM</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Liner</label>
              <select id="sales-eta-liner-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="MSC">MSC</option>
                <option value="Maersk Line">Maersk Line</option>
                <option value="Hapag-Lloyd">Hapag-Lloyd</option>
                <option value="CMA CGM">CMA CGM</option>
                <option value="ONE Line">ONE Line</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Consignee</label>
              <select id="sales-eta-consignee-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="DEVI FISHERIES INC.">DEVI FISHERIES INC.</option>
                <option value="MARK FOODS LLC">MARK FOODS LLC</option>
                <option value="SEA PORT PRODUCTS CORPORATION">SEA PORT PRODUCTS CORPORATION</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">ETA From Date (Discharge)</label>
              <input type="date" id="sales-eta-from-date" value="2026-05-23" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">ETA To Date (Discharge)</label>
              <input type="date" id="sales-eta-to-date" value="2026-10-31" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
            </div>

            <div>
              <button id="btn-eta-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterEtaStatus()">
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
                id="sales-eta-search-input" 
                placeholder="Search..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchEtaStatus(this.value)"
              />
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3.5 py-1.5 border border-[#16A34A] text-[#16A34A] hover:bg-[#F0FDF4] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.downloadEtaExcel()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                <span>Download Excel</span>
              </button>
            </div>
          </div>

          <!-- Table Container (Horizontal Scrolling for Complete Manifest Details) -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-3">S.No</th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">Inv No</th>
                  <th class="py-3 px-3">Buyer</th>
                  <th class="py-3 px-3">PO.NO</th>
                  <th class="py-3 px-3">PRODUCT</th>
                  <th class="py-3 px-3">BRAND</th>
                  <th class="py-3 px-3">Mcs</th>
                  <th class="py-3 px-3">BL No</th>
                  <th class="py-3 px-3">Container No</th>
                  <th class="py-3 px-3">Final Destination</th>
                  <th class="py-3 px-3">On Board Date</th>
                  <th class="py-3 px-3">ActualETA</th>
                  <th class="py-3 px-3">ETA FD</th>
                  <th class="py-3 px-3">Gate Out Date</th>
                  <th class="py-3 px-3">Entry Number</th>
                  <th class="py-3 px-3">Liner</th>
                  <th class="py-3 px-3">Delivery Terms</th>
                  <th class="py-3 px-3 text-center">Transit Days</th>
                  <th class="py-3 px-3 text-center">Transit Days Per Liner</th>
                  <th class="py-3 px-3 text-center">Is FDA</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-eta-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Totals Card -->
          <div id="sales-eta-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderEtaRows(this.etaDataset);
    this.renderEtaTotals(this.etaDataset);
  },

  renderEtaRows(list) {
    const tbody = document.getElementById('sales-eta-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="22" class="py-8 text-center text-[#64748B] text-xs font-semibold">
            No data available in table
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.id}</td>
        <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.viewEtaDetails('${r.id}')">${r.invoiceNo}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A]">${r.buyer}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.poNo}</td>
        <td class="py-3 px-3 text-[#475569]">${r.product}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.brand}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A]">${r.mcs}</td>
        <td class="py-3 px-3 font-bold text-[#006C7A]">${r.blNo}</td>
        <td class="py-3 px-3 font-mono font-bold text-[#0F172A]">${r.containerNo}</td>
        <td class="py-3 px-3 text-[#0F172A]">${r.finalDestination}</td>
        <td class="py-3 px-3 text-[#475569]">${r.onBoardDate}</td>
        <td class="py-3 px-3 font-bold text-[#006644]">${r.actualEta}</td>
        <td class="py-3 px-3 font-bold text-[#0284C7]">${r.etaFd}</td>
        <td class="py-3 px-3 text-[#64748B]">${r.gateOutDate}</td>
        <td class="py-3 px-3 font-mono text-[#475569]">${r.entryNumber}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.liner}</td>
        <td class="py-3 px-3 font-medium text-[#475569]">${r.deliveryTerms}</td>
        <td class="py-3 px-3 text-center font-bold text-[#0F172A]">${r.transitDays}</td>
        <td class="py-3 px-3 text-center font-bold text-[#0F172A]">${r.transitDaysPerLiner}</td>
        <td class="py-3 px-3 text-center font-bold ${r.isFda === 'Yes' ? 'text-[#16A34A]' : 'text-[#64748B]'}">${r.isFda}</td>
        <td class="py-3 px-3 text-center">
          <button type="button" class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" title="View Tracking" onclick="SalesView.viewEtaDetails('${r.id}')">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderEtaTotals(list) {
    const el = document.getElementById('sales-eta-totals');
    if (!el) return;

    const count = list.length;
    const avgTransit = count > 0 ? Math.round(list.reduce((sum, r) => sum + (parseInt(r.transitDays) || 0), 0) / count) : 0;
    const totalCtns = list.reduce((sum, r) => sum + (parseInt(r.mcs) || 0), 0);

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Active Shipments</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Containers</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Cartons in Transit</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${totalCtns.toLocaleString()} <span class="text-xs font-semibold text-[#006644]">Ctns</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Average Transit Days</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">${avgTransit} <span class="text-xs font-semibold text-[#006C7A]">Days</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Transit Reliability</div>
          <div class="text-lg font-black text-[#16A34A] mt-0.5">98.5% <span class="text-[11px] font-semibold text-[#64748B]">(On-Time ETA)</span></div>
        </div>
      </div>
    `;
  },

  filterEtaStatus() {
    const exporter = document.getElementById('sales-eta-exporter-select')?.value || 'All';
    const plant = document.getElementById('sales-eta-plant-select')?.value || 'All';
    const liner = document.getElementById('sales-eta-liner-select')?.value || 'All';
    const consignee = document.getElementById('sales-eta-consignee-select')?.value || 'All';

    const filtered = this.etaDataset.filter(r => {
      const matchExp = exporter === 'All' || r.exporter === exporter;
      const matchPlant = plant === 'All' || r.plant === plant;
      const matchLiner = liner === 'All' || r.liner.toLowerCase().includes(liner.toLowerCase());
      const matchConsignee = consignee === 'All' || r.buyer === consignee || r.consignee === consignee;
      return matchExp && matchPlant && matchLiner && matchConsignee;
    });

    this.renderEtaRows(filtered);
    this.renderEtaTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered: Found ${filtered.length} active ETA trackings`, 'info');
    }
  },

  searchEtaStatus(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.renderEtaRows(this.etaDataset);
      this.renderEtaTotals(this.etaDataset);
      return;
    }

    const filtered = this.etaDataset.filter(r => {
      return (r.invoiceNo && r.invoiceNo.toLowerCase().includes(q)) ||
        (r.buyer && r.buyer.toLowerCase().includes(q)) ||
        (r.blNo && r.blNo.toLowerCase().includes(q)) ||
        (r.containerNo && r.containerNo.toLowerCase().includes(q)) ||
        (r.liner && r.liner.toLowerCase().includes(q)) ||
        (r.finalDestination && r.finalDestination.toLowerCase().includes(q));
    });

    this.renderEtaRows(filtered);
    this.renderEtaTotals(filtered);
  },

  downloadEtaExcel() {
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exporting ETA/ETD Manifest to Excel...', 'success');
    }
  },

  viewEtaDetails(id) {
    const r = this.etaDataset.find(x => x.id === id);
    if (!r) return;

    if (typeof Modal !== 'undefined' && Modal.open) {
      Modal.open({
        title: `ETA Transit Telemetry - ${r.containerNo}`,
        size: 'md',
        content: `
          <div class="space-y-4 text-xs text-[#0F172A]">
            <div class="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3 space-y-2">
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div><span class="text-[#64748B]">Invoice:</span> <span class="font-bold text-[#006C7A]">${r.invoiceNo}</span></div>
                <div><span class="text-[#64748B]">Buyer:</span> <span class="font-bold text-[#0F172A]">${r.buyer}</span></div>
                <div><span class="text-[#64748B]">Container No:</span> <span class="font-mono font-bold">${r.containerNo}</span></div>
                <div><span class="text-[#64748B]">BL Number:</span> <span class="font-bold text-[#006C7A]">${r.blNo}</span></div>
                <div><span class="text-[#64748B]">Liner:</span> <span class="font-semibold text-[#0F172A]">${r.liner}</span></div>
                <div><span class="text-[#64748B]">Final Destination:</span> <span class="font-semibold text-[#0F172A]">${r.finalDestination}</span></div>
                <div><span class="text-[#64748B]">Actual ETA:</span> <span class="font-bold text-[#006644]">${r.actualEta}</span></div>
                <div><span class="text-[#64748B]">ETA Final Delivery:</span> <span class="font-bold text-[#0284C7]">${r.etaFd}</span></div>
                <div><span class="text-[#64748B]">Transit Days:</span> <span class="font-bold">${r.transitDays} Days</span></div>
                <div><span class="text-[#64748B]">Entry Number:</span> <span class="font-mono font-bold">${r.entryNumber}</span></div>
              </div>
            </div>
            <div class="p-2.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg text-[11px] text-[#166534]">
              Ocean reefer container telemetry active. Live coordinates updated at port of discharge.
            </div>
          </div>
        `,
        footerButtons: [{ label: 'Close', type: 'secondary', onClick: (m) => m.close() }]
      });
    }
  },

  // ==========================================
  // 2. FDA STATUS REGISTER (IMAGE 2)
  // ==========================================
  fdaDataset: [
    {
      sNo: 1,
      id: '104',
      invNo: 'DFL/KKD/2627/157',
      poNo: 'DF/DF-2786',
      buyer: 'DEVI FISHERIES INC.',
      shippingBillNo: '',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'USA',
      priorNoticeNumber: 'PN-2026-99120',
      lineReleaseStatus: 'Pending Inspection',
      fdaClearanceDate: ''
    },
    {
      sNo: 2,
      id: '6513',
      invNo: 'DFL/JPT/2627/313',
      poNo: 'PO1004191',
      buyer: 'STANLEY PEARLMAN ENTERPRISES, INC.',
      shippingBillNo: 'rswr',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'USA',
      priorNoticeNumber: 'PN-2026-99121',
      lineReleaseStatus: 'Under Review',
      fdaClearanceDate: ''
    },
    {
      sNo: 3,
      id: '6203',
      invNo: 'DFL/JPT/2627/312',
      poNo: '1102650547',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      shippingBillNo: '4321',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'USA',
      priorNoticeNumber: 'PN-2026-99122',
      lineReleaseStatus: 'Documentation Submitted',
      fdaClearanceDate: ''
    },
    {
      sNo: 4,
      id: '6302',
      invNo: 'DFL/JPT/2627/311',
      poNo: '1102650877',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      shippingBillNo: '',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'USA',
      priorNoticeNumber: 'PN-2026-99123',
      lineReleaseStatus: 'Pending',
      fdaClearanceDate: ''
    },
    {
      sNo: 5,
      id: '5743',
      invNo: 'DFL/JPT/2627/310',
      poNo: '60150DEV010C',
      buyer: 'CRUSTA C SAS',
      shippingBillNo: '',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'FRANCE',
      priorNoticeNumber: 'EU-TRACES-8812',
      lineReleaseStatus: 'EU Vet Border Check',
      fdaClearanceDate: ''
    },
    {
      sNo: 6,
      id: '6131',
      invNo: 'DFL/JPT/2627/309',
      poNo: '1102650475',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      shippingBillNo: '',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'USA',
      priorNoticeNumber: 'PN-2026-99124',
      lineReleaseStatus: 'Pending Prior Notice',
      fdaClearanceDate: ''
    },
    {
      sNo: 7,
      id: '7050',
      invNo: 'DFL/JPT/2627/308',
      poNo: 'DF/DF-5611',
      buyer: 'DEVI FISHERIES INC.',
      shippingBillNo: '',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'USA',
      priorNoticeNumber: 'PN-2026-99125',
      lineReleaseStatus: 'Prior Notice Confirmed',
      fdaClearanceDate: ''
    },
    {
      sNo: 8,
      id: '7051',
      invNo: 'DFL/JPT/2627/307',
      poNo: 'DF/DF-5612',
      buyer: 'DEVI FISHERIES INC.',
      shippingBillNo: '',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'USA',
      priorNoticeNumber: 'PN-2026-99126',
      lineReleaseStatus: 'Prior Notice Confirmed',
      fdaClearanceDate: ''
    }
  ],

  renderFdaStatus(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#172B4D]">
        <!-- 1. Page Title Header (Image 2) -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">FDA STATUS</h1>
        </div>

        <!-- 2. Top Filter Card (Base Design System, Image 2) -->
        <div id="sales-fda-filter-card" class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT YEAR</label>
              <select id="sales-fda-year-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT EXPORTER :</label>
              <select id="sales-fda-exporter-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT CONSIGNEE :</label>
              <select id="sales-fda-consignee-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="ALL" selected>ALL</option>
                <option value="DEVI FISHERIES INC.">DEVI FISHERIES INC.</option>
                <option value="STANLEY PEARLMAN ENTERPRISES, INC.">STANLEY PEARLMAN ENTERPRISES, INC.</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="CRUSTA C SAS">CRUSTA C SAS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT COUNTRY:</label>
              <select id="sales-fda-country-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="USA">U.S.A.</option>
                <option value="FRANCE">FRANCE</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">STATUS :</label>
              <select id="sales-fda-status-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="Pending" selected>Pending</option>
                <option value="Completed">Completed</option>
                <option value="All">All</option>
              </select>
            </div>

            <div>
              <button id="btn-fda-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterFdaStatus()">
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
                id="sales-fda-search-input" 
                placeholder="Search..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchFdaStatus(this.value)"
              />
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3.5 py-1.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.toggleMoreSearch()">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-[#02a8b5] hover:bg-[#02a8b5] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.loadAllFdaStatus()">
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
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortFdaStatus('sNo')">
                    <span class="inline-flex items-center gap-1">SNO <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">InvNo</th>
                  <th class="py-3 px-3">PoNo</th>
                  <th class="py-3 px-3">Buyer</th>
                  <th class="py-3 px-3">ShippingBillNo</th>
                  <th class="py-3 px-3 text-center">Status</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-fda-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Totals Card -->
          <div id="sales-fda-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderFdaRows(this.fdaDataset);
    this.renderFdaTotals(this.fdaDataset);
  },

  renderFdaRows(list) {
    const tbody = document.getElementById('sales-fda-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="py-8 text-center text-[#64748B] text-xs">
            No FDA regulatory records found matching the selected filter criteria.
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
          <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openFdaModal('${r.id}')">${r.invNo}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.poNo}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A]">${r.buyer}</td>
          <td class="py-3 px-3 font-mono text-[#475569]">${r.shippingBillNo || ''}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">${badgeHtml}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">
            <button 
              type="button" 
              class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
              title="Update FDA Clearance" 
              onclick="SalesView.openFdaModal('${r.id}')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderFdaTotals(list) {
    const el = document.getElementById('sales-fda-totals');
    if (!el) return;

    const count = list.length;
    const completed = list.filter(x => (x.status || '').toLowerCase() === 'completed').length;
    const pending = count - completed;

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Filings</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Entries</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">FDA Cleared</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${completed} <span class="text-xs font-semibold text-[#006644]">Cleared</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Review</div>
          <div class="text-lg font-black text-[#991B1B] mt-0.5">${pending} <span class="text-xs font-semibold text-[#991B1B]">Pending</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Prior Notice Compliance</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">100% <span class="text-[11px] font-semibold text-[#64748B]">(USFDA OASIS)</span></div>
        </div>
      </div>
    `;
  },

  filterFdaStatus() {
    const year = document.getElementById('sales-fda-year-select')?.value || 'All';
    const exporter = document.getElementById('sales-fda-exporter-select')?.value || 'All';
    const consignee = document.getElementById('sales-fda-consignee-select')?.value || 'ALL';
    const country = document.getElementById('sales-fda-country-select')?.value || 'All';
    const status = document.getElementById('sales-fda-status-select')?.value || 'All';

    const filtered = this.fdaDataset.filter(r => {
      const matchYear = year === 'All' || r.year === year;
      const matchExporter = exporter === 'All' || r.exporter === exporter;
      const matchConsignee = consignee === 'ALL' || r.buyer === consignee;
      const matchCountry = country === 'All' || r.country === country;
      const matchStatus = status === 'All' || r.status === status;
      return matchYear && matchExporter && matchConsignee && matchCountry && matchStatus;
    });

    this.renderFdaRows(filtered);
    this.renderFdaTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered: Found ${filtered.length} FDA filings`, 'info');
    }
  },

  searchFdaStatus(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.renderFdaRows(this.fdaDataset);
      this.renderFdaTotals(this.fdaDataset);
      return;
    }

    const filtered = this.fdaDataset.filter(r => {
      return (r.invNo && r.invNo.toLowerCase().includes(q)) ||
        (r.poNo && r.poNo.toLowerCase().includes(q)) ||
        (r.buyer && r.buyer.toLowerCase().includes(q)) ||
        (r.shippingBillNo && r.shippingBillNo.toLowerCase().includes(q)) ||
        (r.id && r.id.toLowerCase().includes(q));
    });

    this.renderFdaRows(filtered);
    this.renderFdaTotals(filtered);
  },

  loadAllFdaStatus() {
    const yearEl = document.getElementById('sales-fda-year-select');
    const exporterEl = document.getElementById('sales-fda-exporter-select');
    const consigneeEl = document.getElementById('sales-fda-consignee-select');
    const countryEl = document.getElementById('sales-fda-country-select');
    const statusEl = document.getElementById('sales-fda-status-select');
    const searchEl = document.getElementById('sales-fda-search-input');

    if (yearEl) yearEl.value = '2026-2027';
    if (exporterEl) exporterEl.value = 'DEVI FISHERIES LIMITED';
    if (consigneeEl) consigneeEl.value = 'ALL';
    if (countryEl) countryEl.value = 'All';
    if (statusEl) statusEl.value = 'Pending';
    if (searchEl) searchEl.value = '';

    this.renderFdaRows(this.fdaDataset);
    this.renderFdaTotals(this.fdaDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Loaded all ${this.fdaDataset.length} FDA status records`, 'success');
    }
  },

  toggleMoreFdaSearch() {
    const card = document.getElementById('sales-fda-filter-card');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      card.classList.add('ring-2', 'ring-[#006C7A]');
      setTimeout(() => card.classList.remove('ring-2', 'ring-[#006C7A]'), 1200);
    }
  },

  sortFdaStatus(key) {
    this.fdaDataset.reverse();
    this.renderFdaRows(this.fdaDataset);
  },

  openFdaModal(id) {
    const record = this.fdaDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert('Modal component is not loaded');
      return;
    }

    Modal.open({
      title: 'FDA PRIOR NOTICE & REGULATORY CLEARANCE',
      size: '4xl',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Orders &nbsp;&gt;&nbsp; FDA Status &nbsp;&gt;&nbsp; <span class="text-[#2563EB] font-semibold">Regulatory Filing</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Invoice No</label>
                <input type="text" value="${record.invNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PO Number</label>
                <input type="text" value="${record.poNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Buyer</label>
                <input type="text" value="${record.buyer}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Prior Notice Confirmation (PNC#) <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="fda-input-pnc" value="${record.priorNoticeNumber || ''}" placeholder="Enter PNC Number" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Line Release Status <span class="text-[#EF4444]">*</span></label>
                <select id="fda-input-release" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="May Proceed" selected>May Proceed (Auto Cleared)</option>
                  <option value="FDA Hold / Sample Required">FDA Hold / Sample Required</option>
                  <option value="Documentation Examination">Documentation Examination</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Clearance Date <span class="text-[#EF4444]">*</span></label>
                <input type="date" id="fda-input-date" value="${record.fdaClearanceDate || '2026-10-23'}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">FDA Regulatory Officer Notes</label>
              <textarea id="fda-input-notes" rows="2" placeholder="Enter inspection comments or release number" class="w-full p-2 rounded-lg border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">FDA Prior Notice transmitted via OASIS. Automated May Proceed notification issued.</textarea>
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
          onClick: (m) => SalesView.saveFdaStatus(record.id)
        }
      ]
    });
  },

  saveFdaStatus(id) {
    const record = this.fdaDataset.find(x => x.id === id);
    if (!record) return;

    const pnc = document.getElementById('fda-input-pnc')?.value;
    const release = document.getElementById('fda-input-release')?.value;
    const clearDate = document.getElementById('fda-input-date')?.value;

    record.priorNoticeNumber = pnc || record.priorNoticeNumber;
    record.lineReleaseStatus = release || record.lineReleaseStatus;
    record.fdaClearanceDate = clearDate || record.fdaClearanceDate;
    record.status = 'Completed';

    this.renderFdaRows(this.fdaDataset);
    this.renderFdaTotals(this.fdaDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`FDA Clearance updated for ${record.invNo}`, 'success');
    }
  },

  // ==========================================
  // 3. CLEARING AGENT REGISTER (IMAGE 3)
  // ==========================================
  clearingAgentDataset: [
    {
      sNo: 1,
      id: 'CA-01',
      invNo: 'DFL/JPT/2627/313',
      buyer: 'STANLEY PEARLMAN ENTERPRISES, INC.',
      blNo: '22',
      portOfDischarge: 'BALTIMORE',
      notifyPartyName: 'WILLIAMS CLARKE CO., INC.',
      status: 'Pending',
      entryNo: 'CBP-8841029',
      doStatus: 'Issued',
      clearingBroker: 'WILLIAMS CLARKE CO., INC.'
    },
    {
      sNo: 2,
      id: 'CA-02',
      invNo: 'DFL/JPT/2627/312',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      blNo: 'g99',
      portOfDischarge: 'SAVANNAH',
      notifyPartyName: 'JOHN S JAMES CO',
      status: 'Pending',
      entryNo: 'CBP-8841030',
      doStatus: 'Pending Arrival',
      clearingBroker: 'JOHN S JAMES CO'
    },
    {
      sNo: 3,
      id: 'CA-03',
      invNo: 'DFL/JPT/2627/311',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      blNo: 'ee',
      portOfDischarge: 'NEW YORK',
      notifyPartyName: 'WILLIAMS CLARKE CO., INC.',
      status: 'Pending',
      entryNo: 'CBP-8841031',
      doStatus: 'Pending Arrival',
      clearingBroker: 'WILLIAMS CLARKE CO., INC.'
    },
    {
      sNo: 4,
      id: 'CA-04',
      invNo: 'DFL/JPT/2627/309',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      blNo: '090',
      portOfDischarge: 'NEW YORK',
      notifyPartyName: 'WILLIAMS CLARKE CO., INC.',
      status: 'Pending',
      entryNo: 'CBP-8841032',
      doStatus: 'Issued',
      clearingBroker: 'WILLIAMS CLARKE CO., INC.'
    },
    {
      sNo: 5,
      id: 'CA-05',
      invNo: 'DFL/JPT/2627/308',
      buyer: 'DEVI FISHERIES INC.',
      blNo: '22',
      portOfDischarge: 'LOS ANGELES',
      notifyPartyName: 'WILLIAMS CLARKE CO., INC.',
      status: 'Pending',
      entryNo: 'CBP-8841033',
      doStatus: 'Pending Arrival',
      clearingBroker: 'WILLIAMS CLARKE CO., INC.'
    },
    {
      sNo: 6,
      id: 'CA-06',
      invNo: 'DFL/JPT/2627/307',
      buyer: 'DEVI FISHERIES INC.',
      blNo: '24',
      portOfDischarge: 'BALTIMORE',
      notifyPartyName: 'WILLIAMS CLARKE CO., INC.',
      status: 'Pending',
      entryNo: 'CBP-8841034',
      doStatus: 'Issued',
      clearingBroker: 'WILLIAMS CLARKE CO., INC.'
    },
    {
      sNo: 7,
      id: 'CA-07',
      invNo: 'DFL/SNM/2627/145',
      buyer: 'MARK FOODS LLC',
      blNo: '31',
      portOfDischarge: 'NEW YORK',
      notifyPartyName: 'JOHN S JAMES CO',
      status: 'Pending',
      entryNo: 'CBP-8841035',
      doStatus: 'Pending Arrival',
      clearingBroker: 'JOHN S JAMES CO'
    },
    {
      sNo: 8,
      id: 'CA-08',
      invNo: 'DFL/SNM/2627/144',
      buyer: 'MARK FOODS LLC',
      blNo: '32',
      portOfDischarge: 'NEW YORK',
      notifyPartyName: 'JOHN S JAMES CO',
      status: 'Pending',
      entryNo: 'CBP-8841036',
      doStatus: 'Pending Arrival',
      clearingBroker: 'JOHN S JAMES CO'
    }
  ],

  renderClearingAgent(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#172B4D]">
        <!-- 1. Page Title Header (Image 3) -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">CLEARING AGENT</h1>
        </div>

        <!-- 2. Top Filter Card (Base Design System, Image 3) -->
        <div id="sales-cha-filter-card" class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">FROM DATE</label>
              <input type="date" id="sales-cha-from-date" value="2026-04-01" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">TO DATE</label>
              <input type="date" id="sales-cha-to-date" value="2026-10-23" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">STATUS :</label>
              <select id="sales-cha-status-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="Pending" selected>Pending</option>
                <option value="Completed">Completed</option>
                <option value="All">All</option>
              </select>
            </div>

            <div>
              <button id="btn-cha-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterClearingAgent()">
                <span>Search</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 3. Table Card (Image 3) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-cha-search-input" 
                placeholder="Search..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchClearingAgent(this.value)"
              />
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3.5 py-1.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.toggleMoreSearch()">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-[#02a8b5] hover:bg-[#02a8b5] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.loadAllClearingAgent()">
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
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortClearingAgent('sNo')">
                    <span class="inline-flex items-center gap-1">S.No <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">Inv No</th>
                  <th class="py-3 px-3">Buyer</th>
                  <th class="py-3 px-3">BL No</th>
                  <th class="py-3 px-3">Port Of Discharge</th>
                  <th class="py-3 px-3">Notify party Name</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-cha-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Totals Card -->
          <div id="sales-cha-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderClearingAgentRows(this.clearingAgentDataset);
    this.renderClearingAgentTotals(this.clearingAgentDataset);
  },

  renderClearingAgentRows(list) {
    const tbody = document.getElementById('sales-cha-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="py-8 text-center text-[#64748B] text-xs">
            No clearing agent entries found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
        <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openClearingAgentModal('${r.id}')">${r.invNo}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A]">${r.buyer}</td>
        <td class="py-3 px-3 font-bold text-[#475569]">${r.blNo}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.portOfDischarge}</td>
        <td class="py-3 px-3 font-semibold text-[#006C7A]">${r.notifyPartyName}</td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <button 
            type="button" 
            class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
            title="Assign / Update Clearing Broker" 
            onclick="SalesView.openClearingAgentModal('${r.id}')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderClearingAgentTotals(list) {
    const el = document.getElementById('sales-cha-totals');
    if (!el) return;

    const count = list.length;
    const completed = list.filter(x => (x.status || '').toLowerCase() === 'completed').length;
    const pending = count - completed;

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Consignments</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Shipments</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Broker Appointed</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${completed} <span class="text-xs font-semibold text-[#006644]">Assigned</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Broker Set</div>
          <div class="text-lg font-black text-[#991B1B] mt-0.5">${pending} <span class="text-xs font-semibold text-[#991B1B]">Pending</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Key Customs Broker</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">Williams Clarke <span class="text-[11px] font-semibold text-[#64748B]">(US East/West)</span></div>
        </div>
      </div>
    `;
  },

  filterClearingAgent() {
    const status = document.getElementById('sales-cha-status-select')?.value || 'All';

    const filtered = this.clearingAgentDataset.filter(r => {
      const matchStatus = status === 'All' || r.status === status;
      return matchStatus;
    });

    this.renderClearingAgentRows(filtered);
    this.renderClearingAgentTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered: Found ${filtered.length} clearing agent assignments`, 'info');
    }
  },

  searchClearingAgent(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.renderClearingAgentRows(this.clearingAgentDataset);
      this.renderClearingAgentTotals(this.clearingAgentDataset);
      return;
    }

    const filtered = this.clearingAgentDataset.filter(r => {
      return (r.invNo && r.invNo.toLowerCase().includes(q)) ||
        (r.buyer && r.buyer.toLowerCase().includes(q)) ||
        (r.blNo && r.blNo.toLowerCase().includes(q)) ||
        (r.portOfDischarge && r.portOfDischarge.toLowerCase().includes(q)) ||
        (r.notifyPartyName && r.notifyPartyName.toLowerCase().includes(q));
    });

    this.renderClearingAgentRows(filtered);
    this.renderClearingAgentTotals(filtered);
  },

  loadAllClearingAgent() {
    const fromEl = document.getElementById('sales-cha-from-date');
    const toEl = document.getElementById('sales-cha-to-date');
    const statusEl = document.getElementById('sales-cha-status-select');
    const searchEl = document.getElementById('sales-cha-search-input');

    if (fromEl) fromEl.value = '2026-04-01';
    if (toEl) toEl.value = '2026-10-23';
    if (statusEl) statusEl.value = 'Pending';
    if (searchEl) searchEl.value = '';

    this.renderClearingAgentRows(this.clearingAgentDataset);
    this.renderClearingAgentTotals(this.clearingAgentDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Loaded all ${this.clearingAgentDataset.length} clearing agent records`, 'success');
    }
  },

  toggleMoreChaSearch() {
    const card = document.getElementById('sales-cha-filter-card');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      card.classList.add('ring-2', 'ring-[#006C7A]');
      setTimeout(() => card.classList.remove('ring-2', 'ring-[#006C7A]'), 1200);
    }
  },

  sortClearingAgent(key) {
    this.clearingAgentDataset.reverse();
    this.renderClearingAgentRows(this.clearingAgentDataset);
  },

  openClearingAgentModal(id) {
    const record = this.clearingAgentDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert('Modal component is not loaded');
      return;
    }

    Modal.open({
      title: 'CUSTOMS BROKER & CLEARING AGENT ASSIGNMENT',
      size: '4xl',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Orders &nbsp;&gt;&nbsp; Clearing Agent &nbsp;&gt;&nbsp; <span class="text-[#2563EB] font-semibold">Customs Broker Entry</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Invoice No</label>
                <input type="text" value="${record.invNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Buyer</label>
                <input type="text" value="${record.buyer}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">BL Number</label>
                <input type="text" value="${record.blNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#006C7A] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Port of Discharge</label>
                <input type="text" value="${record.portOfDischarge}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Notify Party / Broker Name <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="cha-input-name" value="${record.notifyPartyName}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Delivery Order (DO) Status <span class="text-[#EF4444]">*</span></label>
                <select id="cha-input-do" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Issued" ${record.doStatus === 'Issued' ? 'selected' : ''}>Issued</option>
                  <option value="Pending Arrival" ${record.doStatus === 'Pending Arrival' ? 'selected' : ''}>Pending Arrival</option>
                  <option value="Cleared / Released">Cleared / Released</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Broker Instructions & Dispatch Notes</label>
              <textarea id="cha-input-notes" rows="2" placeholder="Enter special delivery order instructions" class="w-full p-2 rounded-lg border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">Original bills of lading surrendered to carrier. Broker authorized for immediate customs release and drayage dispatch.</textarea>
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
          onClick: (m) => SalesView.saveClearingAgent(record.id)
        }
      ]
    });
  },

  saveClearingAgent(id) {
    const record = this.clearingAgentDataset.find(x => x.id === id);
    if (!record) return;

    const name = document.getElementById('cha-input-name')?.value;
    const doStatus = document.getElementById('cha-input-do')?.value;

    record.notifyPartyName = name || record.notifyPartyName;
    record.doStatus = doStatus || record.doStatus;
    record.status = 'Completed';

    this.renderClearingAgentRows(this.clearingAgentDataset);
    this.renderClearingAgentTotals(this.clearingAgentDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Clearing Broker assigned for ${record.invNo}`, 'success');
    }
  },

  // ==========================================
  // 4. DELAYED SHIPMENTS REGISTER
  // ==========================================
  delayedShipmentsDataset: [
    {
      sNo: 1,
      id: '4376',
      poNo: 'MFSFRSHR.25.023RU',
      poDate: '08-04-2025',
      prodStartDate: '-',
      country: 'RUSSIA',
      buyer: 'METRO CASH & CARRY OOO',
      actualShipByDate: '26-03-2026',
      stockOutDate: '05-05-2026',
      status: 'Delivered',
      daysDelayed: -41,
      month: 'Apr',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 2,
      id: '4377',
      poNo: 'MFSFRSHR.25.024RU',
      poDate: '08-04-2025',
      prodStartDate: '-',
      country: 'RUSSIA',
      buyer: 'METRO CASH & CARRY OOO',
      actualShipByDate: '26-03-2026',
      stockOutDate: '25-06-2026',
      status: 'Shipped',
      daysDelayed: -92,
      month: 'Apr',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 3,
      id: '4378',
      poNo: 'MFSFRSHR.25.025RU',
      poDate: '08-04-2025',
      prodStartDate: '-',
      country: 'RUSSIA',
      buyer: 'METRO CASH & CARRY OOO',
      actualShipByDate: '26-04-2026',
      stockOutDate: '16-07-2026',
      status: 'Shipped',
      daysDelayed: -82,
      month: 'Apr',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 4,
      id: '4379',
      poNo: 'MFSFRSHR.25.026RU',
      poDate: '08-04-2025',
      prodStartDate: '-',
      country: 'RUSSIA',
      buyer: 'METRO CASH & CARRY OOO',
      actualShipByDate: '26-04-2026',
      stockOutDate: '05-08-2026',
      status: 'Shipped',
      daysDelayed: -102,
      month: 'Apr',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 5,
      id: '4565',
      poNo: '1102550490',
      poDate: '18-04-2025',
      prodStartDate: '-',
      country: 'U.S.A.',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      actualShipByDate: '20-08-2025',
      stockOutDate: '06-04-2026',
      status: 'Delivered',
      daysDelayed: -230,
      month: 'Apr',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 6,
      id: '4566',
      poNo: '1102550491',
      poDate: '18-04-2025',
      prodStartDate: '-',
      country: 'U.S.A.',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      actualShipByDate: '25-08-2025',
      stockOutDate: '20-04-2026',
      status: 'Delivered',
      daysDelayed: -239,
      month: 'Apr',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 7,
      id: '4798',
      poNo: 'VM-DF-ASC-25003',
      poDate: '01-07-2025',
      prodStartDate: '-',
      country: 'BELGIUM',
      buyer: 'SEAFOOD CONNECTION B.V.',
      actualShipByDate: '20-03-2026',
      stockOutDate: '07-04-2026',
      status: 'Delivered',
      daysDelayed: -19,
      month: 'Jul',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 8,
      id: '4799',
      poNo: 'PL/DF/ASC/25004 & PL/DF/ASC/25004-1',
      poDate: '01-07-2025',
      prodStartDate: '-',
      country: 'BELGIUM',
      buyer: 'UMIOS FOOD EUROPE B.V.',
      actualShipByDate: '15-06-2026',
      stockOutDate: '30-06-2026',
      status: 'Delivered',
      daysDelayed: -16,
      month: 'Jul',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 9,
      id: '4942',
      poNo: 'DEV_26/008',
      poDate: '18-07-2025',
      prodStartDate: '-',
      country: 'BELGIUM',
      buyer: 'NORDIC SEAFOOD A/S.',
      actualShipByDate: '10-03-2026',
      stockOutDate: '16-04-2026',
      status: 'Delivered',
      daysDelayed: -38,
      month: 'Jul',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 10,
      id: '4943',
      poNo: 'DEV_26/009',
      poDate: '11-07-2025',
      prodStartDate: '-',
      country: 'BELGIUM',
      buyer: 'NORDIC SEAFOOD A/S.',
      actualShipByDate: '30-03-2026',
      stockOutDate: '16-06-2026',
      status: 'Delivered',
      daysDelayed: -79,
      month: 'Jul',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 11,
      id: '4944',
      poNo: 'DEV_26/010',
      poDate: '18-07-2025',
      prodStartDate: '-',
      country: 'BELGIUM',
      buyer: 'NORDIC SEAFOOD A/S.',
      actualShipByDate: '10-07-2026',
      stockOutDate: '25-07-2026',
      status: 'Shipped',
      daysDelayed: -16,
      month: 'Jul',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 12,
      id: '4945',
      poNo: 'DEV_26/011',
      poDate: '18-07-2025',
      prodStartDate: '-',
      country: 'BELGIUM',
      buyer: 'NORDIC SEAFOOD A/S.',
      actualShipByDate: '10-07-2026',
      stockOutDate: '24-08-2026',
      status: 'Shipped',
      daysDelayed: -46,
      month: 'Jul',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    }
  ],

  renderDelayedShipments(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">DELAYED SHIPMENTS</h2>
        </div>

        <!-- 2. Clean Search & Filters Card (Exact Match to Design System, No Empty Circles) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-4">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">MONTH</label>
              <select id="sales-delay-month" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>Select</option>
                <option value="Jan">January</option>
                <option value="Feb">February</option>
                <option value="Mar">March</option>
                <option value="Apr">April</option>
                <option value="May">May</option>
                <option value="Jun">June</option>
                <option value="Jul">July</option>
                <option value="Aug">August</option>
                <option value="Sep">September</option>
                <option value="Oct">October</option>
                <option value="Nov">November</option>
                <option value="Dec">December</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT YEAR</label>
              <select id="sales-delay-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT EXPORTER :</label>
              <select id="sales-delay-exporter" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUATECH PVT LTD">DEVI AQUATECH PVT LTD</option>
                <option value="SATYA SEAFOODS">SATYA SEAFOODS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT CONSIGNEE :</label>
              <select id="sales-delay-consignee" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="METRO CASH & CARRY OOO">METRO CASH & CARRY OOO</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="SEAFOOD CONNECTION B.V.">SEAFOOD CONNECTION B.V.</option>
                <option value="UMIOS FOOD EUROPE B.V.">UMIOS FOOD EUROPE B.V.</option>
                <option value="NORDIC SEAFOOD A/S.">NORDIC SEAFOOD A/S.</option>
              </select>
            </div>
          </div>

          <div class="flex justify-center pt-1">
            <button id="btn-delay-search" class="px-7 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterDelayedShipments()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>

        <!-- 3. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="flex items-center gap-2 flex-1 max-w-xl">
              <div class="relative flex-1 max-w-md">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
                <input 
                  type="text" 
                  id="sales-delay-search-input" 
                  placeholder="Search delayed shipments..." 
                  class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                  style="padding-left: 36px !important;"
                  oninput="SalesView.searchDelayedShipments(this.value)"
                />
              </div>

              <button class="px-3.5 py-1.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.toggleMoreSearch()">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-[#02a8b5] hover:bg-[#02a8b5] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.loadAllDelayedShipments()">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#02a8b5] hover:text-[#008f9a] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadDelayedShipmentsExcel()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Download Excel</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortDelayedShipments('sNo')">
                    <span class="inline-flex items-center gap-1">SNO <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortDelayedShipments('id')">
                    <span class="inline-flex items-center gap-1">ID <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">Po No</th>
                  <th class="py-3 px-3">Po Date</th>
                  <th class="py-3 px-3">Production Start Date</th>
                  <th class="py-3 px-3">Country</th>
                  <th class="py-3 px-3">Buyer</th>
                  <th class="py-3 px-3">Actual Ship By Date</th>
                  <th class="py-3 px-3">Stock Out Date</th>
                  <th class="py-3 px-3 text-center">Status</th>
                  <th class="py-3 px-3 text-right">Days Rem/Delayed</th>
                </tr>
              </thead>
              <tbody id="sales-delay-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-delay-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderDelayedShipmentsRows(this.delayedShipmentsDataset);
    this.renderDelayedShipmentsTotals(this.delayedShipmentsDataset);
  },

  renderDelayedShipmentsRows(list) {
    const tbody = document.getElementById('sales-delay-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="11" class="py-8 text-center text-[#64748B] text-xs">
            No delayed shipment records found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => {
      const isDelivered = (r.status || '').toLowerCase() === 'delivered';
      const statusBadge = isDelivered
        ? `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">Delivered</span>`
        : `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]">Shipped</span>`;

      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
          <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
          <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openDelayedShipmentModal('${r.id}')">${r.id}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A] hover:text-[#006C7A] cursor-pointer" onclick="SalesView.openDelayedShipmentModal('${r.id}')">${r.poNo}</td>
          <td class="py-3 px-3 text-[#475569] font-medium whitespace-nowrap">${r.poDate}</td>
          <td class="py-3 px-3 text-[#64748B] text-center">${r.prodStartDate || '-'}</td>
          <td class="py-3 px-3 font-bold text-[#475569] uppercase">${r.country}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A]">${r.buyer}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A] whitespace-nowrap">${r.actualShipByDate}</td>
          <td class="py-3 px-3 font-semibold text-[#475569] whitespace-nowrap">${r.stockOutDate}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">${statusBadge}</td>
          <td class="py-3 px-3 text-right font-bold text-[#E11D48] font-mono">${r.daysDelayed}</td>
        </tr>
      `;
    }).join('');
  },

  renderDelayedShipmentsTotals(list) {
    const el = document.getElementById('sales-delay-totals');
    if (!el) return;

    const count = list.length;
    const delivered = list.filter(x => (x.status || '').toLowerCase() === 'delivered').length;
    const shipped = count - delivered;
    const avgDelay = count > 0 
      ? Math.round(list.reduce((acc, x) => acc + (x.daysDelayed || 0), 0) / count)
      : 0;

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Delayed POs</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Orders</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Average Delay</div>
          <div class="text-lg font-black text-[#E11D48] mt-0.5">${avgDelay} <span class="text-xs font-semibold text-[#E11D48]">Days</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Post-Delay Delivered</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${delivered} <span class="text-xs font-semibold text-[#006644]">Delivered</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Still In-Transit</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">${shipped} <span class="text-xs font-semibold text-[#006C7A]">Shipped</span></div>
        </div>
      </div>
    `;
  },

  filterDelayedShipments() {
    const month = document.getElementById('sales-delay-month')?.value || 'All';
    const consignee = document.getElementById('sales-delay-consignee')?.value || 'All';

    const filtered = this.delayedShipmentsDataset.filter(r => {
      const matchMonth = month === 'All' || r.month === month;
      const matchConsignee = consignee === 'All' || r.buyer === consignee;
      return matchMonth && matchConsignee;
    });

    this.renderDelayedShipmentsRows(filtered);
    this.renderDelayedShipmentsTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} delayed shipment records`, 'info');
    }
  },

  searchDelayedShipments(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderDelayedShipmentsRows(this.delayedShipmentsDataset);
      this.renderDelayedShipmentsTotals(this.delayedShipmentsDataset);
      return;
    }

    const filtered = this.delayedShipmentsDataset.filter(r => 
      (r.poNo || '').toLowerCase().includes(q) ||
      (r.id || '').toLowerCase().includes(q) ||
      (r.buyer || '').toLowerCase().includes(q) ||
      (r.country || '').toLowerCase().includes(q) ||
      (r.status || '').toLowerCase().includes(q)
    );

    this.renderDelayedShipmentsRows(filtered);
    this.renderDelayedShipmentsTotals(filtered);
  },

  toggleMoreDelaySearch() {
    const el = document.getElementById('sales-delay-month');
    if (el) {
      el.focus();
      if (typeof Toast !== 'undefined' && Toast.show) {
        Toast.show('Advanced parameter filters active in top card', 'info');
      }
    }
  },

  loadAllDelayedShipments() {
    const input = document.getElementById('sales-delay-search-input');
    if (input) input.value = '';
    const m = document.getElementById('sales-delay-month');
    if (m) m.value = 'All';
    const c = document.getElementById('sales-delay-consignee');
    if (c) c.value = 'All';

    this.renderDelayedShipmentsRows(this.delayedShipmentsDataset);
    this.renderDelayedShipmentsTotals(this.delayedShipmentsDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Loaded all 12 delayed shipment records', 'success');
    }
  },

  sortDelayedShipments(key) {
    this.delayedShipmentsDataset.reverse();
    this.renderDelayedShipmentsRows(this.delayedShipmentsDataset);
  },

  downloadDelayedShipmentsExcel() {
    const headers = ['SNO', 'ID', 'Po No', 'Po Date', 'Production Start Date', 'Country', 'Buyer', 'Actual Ship By Date', 'Stock Out Date', 'Status', 'Days Rem/Delayed'];
    const rows = this.delayedShipmentsDataset.map(r => [r.sNo, r.id, `"${r.poNo}"`, r.poDate, r.prodStartDate, r.country, `"${r.buyer}"`, r.actualShipByDate, r.stockOutDate, r.status, r.daysDelayed].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));


    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `delayed_shipments_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported delayed shipments register to Excel/CSV', 'success');
    }
  },

  openDelayedShipmentModal(id) {
    const record = this.delayedShipmentsDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Delayed PO: ${record.poNo} | Buyer: ${record.buyer} | Delay: ${record.daysDelayed} days`);
      return;
    }

    Modal.open({
      title: 'DELAYED SHIPMENT ROOT-CAUSE & REMEDIATION',
      size: '4xl',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Orders &nbsp;&gt;&nbsp; Delayed Shipments &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">PO #${record.poNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PO Number</label>
                <input type="text" value="${record.poNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#006C7A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Buyer / Consignee</label>
                <input type="text" value="${record.buyer}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Country</label>
                <input type="text" value="${record.country}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#475569] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Actual Ship By Date</label>
                <input type="text" value="${record.actualShipByDate}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Stock Out Date</label>
                <input type="text" value="${record.stockOutDate}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Days Delayed</label>
                <input type="text" value="${record.daysDelayed} Days" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#FECDD3] bg-[#FFF1F2] font-black text-xs text-[#E11D48] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Delay Root Cause <span class="text-[#EF4444]">*</span></label>
                <select id="delay-modal-cause" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Liner Blank Sailing / Vessel Rollover" selected>Liner Blank Sailing / Vessel Rollover</option>
                  <option value="Cold Storage Gate-in Dwell Time">Cold Storage Gate-in Dwell Time</option>
                  <option value="Raw Material Landing & Sizing Wait">Raw Material Landing & Sizing Wait</option>
                  <option value="Customer Label Revision & Re-packing">Customer Label Revision & Re-packing</option>
                  <option value="Port Congestion / Feeder Connecting Delay">Port Congestion / Feeder Connecting Delay</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Current Fulfillment Status</label>
                <select id="delay-modal-status" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Delivered" ${record.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                  <option value="Shipped" ${record.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Expedited Action & Mitigation Notes</label>
              <textarea id="delay-modal-notes" rows="2" class="w-full p-2 rounded-lg border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">Customer notified with updated carrier vessel telemetry. Priority customs clearance arranged with clearing broker upon port discharge.</textarea>
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
          label: 'Save Changes',
          type: 'primary',
          onClick: (m) => SalesView.saveDelayedShipment(record.id)
        }
      ]
    });
  },

  saveDelayedShipment(id) {
    const record = this.delayedShipmentsDataset.find(x => x.id === id);
    if (!record) return;

    const newStatus = document.getElementById('delay-modal-status')?.value;
    if (newStatus) {
      record.status = newStatus;
    }

    this.renderDelayedShipmentsRows(this.delayedShipmentsDataset);
    this.renderDelayedShipmentsTotals(this.delayedShipmentsDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Updated remediation notes for PO #${record.poNo}`, 'success');
    }
  },



};
