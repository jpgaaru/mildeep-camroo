#!/usr/bin/env python3
"""
scripts/update_commercial_invoice.py

Standardizes Commercial Invoice to the Base Design System matching Image 1 & Image 2:
1. Commercial Invoice List View (Image 1):
   - Page Title: COMMERCIAL INVOICE
   - Top Filter Card: SELECT YEAR, SELECT EXPORTER :, SELECT CONSIGNEE :, SELECT COUNTRY:, INVOICE STATUS :, Search ->
   - Toolbar: Search input (36px padding), More Search, Load All
   - Table: SNO, ID, P.Invoice NO, Invoice NO, Invoice Date, Po NO, Buyer, Status (solid red pill Pending), Actions (blue +)
   - 8 realistic records matching Image 1
   - Reconciled Totals Card at bottom

2. Commercial Invoice Modal Popup (Image 2):
   - Triggered when clicking '+' under Actions
   - Breadcrumb: Orders > Commercial Invoice > Commercial Invoice
   - Title: COMMERCIAL INVOICE
   - Card 1: Custom Invoice, PO No, Consignee, Address, Payment Terms, Shipment Terms, Shipment Terms Ext, Discount,
             Freight, ExRate, Bank Details, Show Bank, Show BL No, Show BL Date, Data Logger, Placed AT,
             Issued By, Show Shipping Details, Special Notes (Commercial Description), Special Notes (Packing List Description)
   - Card 2: Product items table with Product Description, Specs, Packing, Grade, Cartons, Codes, ProductionDate, Best Before Date
   - Close & Save buttons with live updates and Toast notification
"""

import os

COMMERCIAL_INVOICE_IMPL = '''  // ==========================================
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
              <button id="btn-ci-search" class="px-6 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterCommercialInvoices()">
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
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.toggleMoreCiSearch()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.loadAllCommercialInvoices()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
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
      size: 'xl',
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
  },'''

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    idx_start = content.find('renderCommercialInvoice(container) {')
    idx_end = content.find('renderEtaStatus(container) {', idx_start)

    if idx_start == -1 or idx_end == -1:
        print(f"  ❌ Could not find boundaries for renderCommercialInvoice in {filepath}")
        return False

    new_content = content[:idx_start] + COMMERCIAL_INVOICE_IMPL + '\n\n  ' + content[idx_end:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"  ✓ Upgraded Commercial Invoice in {filepath}")
    return True

def main():
    targets = [
        'js/views/salesView.js',
        'scripts/sales_view_code.py',
        'miledeep-devi-fisheries.html',
        'standalone.html'
    ]
    for p in targets:
        if os.path.exists(p):
            print(f"Processing {p}...")
            update_file(p)
        else:
            print(f"Skipping missing {p}")

if __name__ == '__main__':
    main()
