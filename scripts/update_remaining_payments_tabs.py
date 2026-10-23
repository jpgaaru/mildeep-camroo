#!/usr/bin/env python3
"""
scripts/update_remaining_payments_tabs.py

Standardizes the remaining 4 Payments tab menus to the Base Design System:
1. COLLECTIONS LIST (media_1792749726114_c196d393.png)
   - Title: COLLECTIONS LIST
   - Search Card: Select Year, Select Exporter, Select Buyer, Select Country, Status (Pending, Realized, All), Search ->
   - Table: S.No, ID, InvNo, Po No., Consignee Name, Bank Ref No, Status (badge), Actions (+)
   - Action '+': opens Bank Lodgement & Collection Reference Entry Modal
   - Reconciled Totals Card at bottom

2. NEGOTIATIONS LIST (media_1792749741238_96671e08.png)
   - Title: NEGOTIATIONS LIST
   - Search Card: Select Year, Select Exporter, Select Consignee, Select Country, Invoice Status, Search ->
   - Table: S.No, ID, InvNo, Po No., Consignee Name, Bank Ref No, Invoice Status (badge), Actions (+, eye)
   - Action '+': opens LC Document Negotiation & Discounting Modal
   - Reconciled Totals Card at bottom

3. REALIZATION (media_1792749756705_73915458.png)
   - Title: REALIZATION
   - Search Card: Select Year, Select Exporter, Select Consignee, Select Country, Invoice Status, Search ->
   - Table: S.No, Invoice No., Invoice Date, Transaction Type, Consignee Name, Bank Ref, Status, Actions (+)
   - Action '+': opens Statutory Realization & e-BRC Recording Modal
   - Reconciled Totals Card at bottom

4. REALIZATION DONE (media_1792749773360_be7ed396.png)
   - Title: REALIZATION DONE
   - Search Card: SELECT YEAR, SELECT EXPORTER :, SELECT COUNTRY:, BILLS TYPE:, Search ->
   - Toolbar: Search input, Download Excel
   - Table: Sl.No., Invoice NO, Consignee, Sales Invoice Date, Transaction Type, Total Invoice Value$, Realised Value$, Date Of Discounting With Bank, Bank Ref No, Date Of Receipt Of Payment-1, Actions (eye)
   - Action eye: opens e-BRC Certificate & Remittance Breakdown Modal
   - Reconciled Totals Card at bottom
"""

import os

PAYMENTS_REMAINING_JS = r'''  // ==========================================
  // 6. COLLECTIONS REGISTER (IMAGE 1)
  // ==========================================
  collectionsDataset: [
    {
      sNo: 357,
      id: '7196',
      invNo: 'DFL/SNM/2627/145',
      poNo: 'DF 1580',
      consigneeName: 'MARK FOODS LLC',
      bankRefNo: '-',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      invoiceAmount: 125000.00
    },
    {
      sNo: 353,
      id: '7183',
      invNo: 'DFL/SNM/2627/143',
      poNo: 'C10894',
      consigneeName: 'SEA PORT PRODUCTS CORPORATION',
      bankRefNo: '-',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      invoiceAmount: 110500.00
    },
    {
      sNo: 8,
      id: '7173',
      invNo: 'DFL/KKD/2627/151',
      poNo: 'QL150-2026Y37-315',
      consigneeName: 'Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.',
      bankRefNo: '-',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      invoiceAmount: 95256.00
    },
    {
      sNo: 7,
      id: '7172',
      invNo: 'DFL/KKD/2627/152',
      poNo: 'QL150-2026Y37-314',
      consigneeName: 'Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.',
      bankRefNo: '-',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      invoiceAmount: 98172.00
    },
    {
      sNo: 4,
      id: '7171',
      invNo: 'DFL/KKD/2627/155',
      poNo: 'QL150-2026Y37-313',
      consigneeName: 'Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.',
      bankRefNo: '-',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      invoiceAmount: 98172.00
    }
  ],

  renderCollections(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">COLLECTIONS LIST</h2>
        </div>

        <!-- 2. Clean Search & Filters Card (Exact to Image 1) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Year:</label>
              <select id="sales-col-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Exporter:</label>
              <select id="sales-col-exporter" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUATECH PVT LTD">DEVI AQUATECH PVT LTD</option>
                <option value="SATYA SEAFOODS">SATYA SEAFOODS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Buyer:</label>
              <select id="sales-col-buyer" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="MARK FOODS LLC">MARK FOODS LLC</option>
                <option value="SEA PORT PRODUCTS CORPORATION">SEA PORT PRODUCTS CORPORATION</option>
                <option value="Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.">Quanlian Aquatic Products Collection</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Country:</label>
              <select id="sales-col-country" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="U.S.A.">U.S.A.</option>
                <option value="CHINA">CHINA</option>
                <option value="BELGIUM">BELGIUM</option>
                <option value="RUSSIA">RUSSIA</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Status</label>
              <select id="sales-col-status" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="Pending" selected>Pending</option>
                <option value="Lodged">Lodged</option>
                <option value="All">All</option>
              </select>
            </div>
          </div>

          <div class="flex justify-center pt-1">
            <button id="btn-col-search" class="px-7 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterCollections()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>

        <!-- 3. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-col-search-input" 
                placeholder="Search collections..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchCollections(this.value)"
              />
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#006C7A] hover:text-[#005662] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadCollectionsExcel()">
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
                  <th class="py-3 px-3">S.No</th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">InvNo</th>
                  <th class="py-3 px-3">Po No.</th>
                  <th class="py-3 px-3">Consignee Name</th>
                  <th class="py-3 px-3">Bank Ref No</th>
                  <th class="py-3 px-3 text-center">Status</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-col-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-col-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderCollectionsRows(this.collectionsDataset);
    this.renderCollectionsTotals(this.collectionsDataset);
  },

  renderCollectionsRows(list) {
    const tbody = document.getElementById('sales-col-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="py-8 text-center text-[#64748B] text-xs">
            No collection records found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo}</td>
        <td class="py-3 px-3 font-mono font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openCollectionModal('${r.id}')">${r.id}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A] hover:text-[#006C7A] cursor-pointer" onclick="SalesView.openCollectionModal('${r.id}')">${r.invNo}</td>
        <td class="py-3 px-3 font-semibold text-[#475569]">${r.poNo}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A]">${r.consigneeName}</td>
        <td class="py-3 px-3 font-mono text-[#64748B]">${r.bankRefNo || '-'}</td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#FEE2E2] text-[#DC2626] border border-[#FECDD3]">${r.status}</span>
        </td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <button 
            type="button" 
            class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
            title="Record Bank Lodgement" 
            onclick="SalesView.openCollectionModal('${r.id}')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderCollectionsTotals(list) {
    const el = document.getElementById('sales-col-totals');
    if (!el) return;

    const count = list.length;
    const pending = list.filter(x => x.status === 'Pending').length;
    const totalVal = list.reduce((sum, r) => sum + (Number(r.invoiceAmount) || 0), 0);

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Bills in Collection</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Invoices</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Bank Lodgement</div>
          <div class="text-lg font-black text-[#DC2626] mt-0.5">${pending} <span class="text-xs font-semibold text-[#DC2626]">Pending</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Ledger Value</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">$${totalVal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Collecting Bank Entity</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">SBI Commercial <span class="text-[11px] font-semibold text-[#64748B]">(IFSC: SBIN0004130)</span></div>
        </div>
      </div>
    `;
  },

  filterCollections() {
    const buyer = document.getElementById('sales-col-buyer')?.value || 'All';
    const country = document.getElementById('sales-col-country')?.value || 'All';
    const status = document.getElementById('sales-col-status')?.value || 'All';

    const filtered = this.collectionsDataset.filter(r => {
      const matchBuyer = buyer === 'All' || r.consigneeName === buyer;
      const matchCountry = country === 'All' || r.country === country;
      const matchStatus = status === 'All' || r.status === status;
      return matchBuyer && matchCountry && matchStatus;
    });

    this.renderCollectionsRows(filtered);
    this.renderCollectionsTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} collection records`, 'info');
    }
  },

  searchCollections(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderCollectionsRows(this.collectionsDataset);
      this.renderCollectionsTotals(this.collectionsDataset);
      return;
    }

    const filtered = this.collectionsDataset.filter(r => 
      (r.invNo || '').toLowerCase().includes(q) ||
      (r.id || '').toLowerCase().includes(q) ||
      (r.poNo || '').toLowerCase().includes(q) ||
      (r.consigneeName || '').toLowerCase().includes(q)
    );

    this.renderCollectionsRows(filtered);
    this.renderCollectionsTotals(filtered);
  },

  downloadCollectionsExcel() {
    const headers = ['S.No', 'ID', 'InvNo', 'Po No.', 'Consignee Name', 'Bank Ref No', 'Status', 'Invoice Amount'];
    const rows = this.collectionsDataset.map(r => [
      r.sNo,
      r.id,
      `"${r.invNo}"`,
      `"${r.poNo}"`,
      `"${r.consigneeName}"`,
      `"${r.bankRefNo}"`,
      r.status,
      r.invoiceAmount
    ].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `collections_register_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported collections register to Excel/CSV', 'success');
    }
  },

  openCollectionModal(id) {
    const record = this.collectionsDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Collection Invoice: ${record.invNo}`);
      return;
    }

    Modal.open({
      title: 'BANK LODGEMENT & COLLECTION ENTRY',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Payments &nbsp;&gt;&nbsp; Collections &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">${record.invNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Invoice Number</label>
                <input type="text" value="${record.invNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#006C7A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PO Number</label>
                <input type="text" value="${record.poNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Consignee</label>
                <input type="text" value="${record.consigneeName}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#0F172A] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Lodgement Bank <span class="text-[#EF4444]">*</span></label>
                <select id="col-modal-bank" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="State Bank of India (Commercial Br)" selected>State Bank of India (Commercial Br)</option>
                  <option value="HDFC Bank Limited">HDFC Bank Limited</option>
                  <option value="Canara Bank Foreign Exchange">Canara Bank Foreign Exchange</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Bank Reference No <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="col-modal-bank-ref" value="${record.bankRefNo === '-' ? ('1440726TP0B00' + Math.floor(420 + Math.random() * 50)) : record.bankRefNo}" placeholder="Enter Bank Ref No" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-mono font-bold text-xs text-[#006C7A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Lodgement Status</label>
                <select id="col-modal-status" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Lodged" selected>Lodged With Bank</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Courier AWB / Tracking Reference</label>
              <input type="text" id="col-modal-courier" value="DHL Express #8491029314" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
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
          label: 'Save Lodgement',
          type: 'primary',
          onClick: (m) => SalesView.saveCollection(record.id)
        }
      ]
    });
  },

  saveCollection(id) {
    const record = this.collectionsDataset.find(x => x.id === id);
    if (!record) return;

    const bankRef = document.getElementById('col-modal-bank-ref')?.value;
    const status = document.getElementById('col-modal-status')?.value;

    if (bankRef) record.bankRefNo = bankRef;
    if (status) record.status = status;

    this.renderCollectionsRows(this.collectionsDataset);
    this.renderCollectionsTotals(this.collectionsDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Saved bank lodgement for ${record.invNo}`, 'success');
    }
  },

  // ==========================================
  // 7. NEGOTIATIONS REGISTER (IMAGE 2)
  // ==========================================
  negotiationsDataset: [
    {
      sNo: 1,
      id: '6228',
      invNo: 'DFL/JPT/2627/163',
      poNo: '1102650572',
      consigneeName: 'C.P. FOOD PRODUCTS, INC.',
      bankRefNo: '-',
      invoiceStatus: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      negotiatedValue: 142000.00
    },
    {
      sNo: 2,
      id: '6229',
      invNo: 'DFL/JPT/2627/164',
      poNo: '1102650573',
      consigneeName: 'C.P. FOOD PRODUCTS, INC.',
      bankRefNo: '1440726TP0B00421',
      invoiceStatus: 'Negotiated',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      negotiatedValue: 138500.00
    },
    {
      sNo: 3,
      id: '6230',
      invNo: 'DFL/KKD/2627/165',
      poNo: 'DF-1590',
      consigneeName: 'MARK FOODS LLC',
      bankRefNo: '-',
      invoiceStatus: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      negotiatedValue: 121000.00
    }
  ],

  renderNegotiations(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">NEGOTIATIONS LIST</h2>
        </div>

        <!-- 2. Clean Search & Filters Card (Exact to Image 2) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Year:</label>
              <select id="sales-neg-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Exporter:</label>
              <select id="sales-neg-exporter" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUATECH PVT LTD">DEVI AQUATECH PVT LTD</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Consignee:</label>
              <select id="sales-neg-consignee" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="MARK FOODS LLC">MARK FOODS LLC</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Country:</label>
              <select id="sales-neg-country" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="U.S.A.">U.S.A.</option>
                <option value="CHINA">CHINA</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Invoice Status</label>
              <select id="sales-neg-status" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="Pending" selected>Pending</option>
                <option value="Negotiated">Negotiated</option>
                <option value="All">All</option>
              </select>
            </div>
          </div>

          <div class="flex justify-center pt-1">
            <button id="btn-neg-search" class="px-7 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterNegotiations()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>

        <!-- 3. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-neg-search-input" 
                placeholder="Search negotiations..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchNegotiations(this.value)"
              />
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#006C7A] hover:text-[#005662] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadNegotiationsExcel()">
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
                  <th class="py-3 px-3">S.No</th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">InvNo</th>
                  <th class="py-3 px-3">Po No.</th>
                  <th class="py-3 px-3">Consignee Name</th>
                  <th class="py-3 px-3">Bank Ref No</th>
                  <th class="py-3 px-3 text-center">Invoice Status</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-neg-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-neg-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderNegotiationsRows(this.negotiationsDataset);
    this.renderNegotiationsTotals(this.negotiationsDataset);
  },

  renderNegotiationsRows(list) {
    const tbody = document.getElementById('sales-neg-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="py-8 text-center text-[#64748B] text-xs">
            No negotiation records found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => {
      const isNegotiated = r.invoiceStatus === 'Negotiated';
      const statusBadge = isNegotiated
        ? `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">Negotiated</span>`
        : `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#FEE2E2] text-[#DC2626] border border-[#FECDD3]">Pending</span>`;

      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
          <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo}</td>
          <td class="py-3 px-3 font-mono font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openNegotiationModal('${r.id}')">${r.id}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A] hover:text-[#006C7A] cursor-pointer" onclick="SalesView.openNegotiationModal('${r.id}')">${r.invNo}</td>
          <td class="py-3 px-3 font-semibold text-[#475569]">${r.poNo}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A]">${r.consigneeName}</td>
          <td class="py-3 px-3 font-mono text-[#64748B]">${r.bankRefNo || '-'}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">${statusBadge}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">
            <div class="flex items-center justify-center gap-1.5">
              <button 
                type="button" 
                class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
                title="Record LC Negotiation / Discounting" 
                onclick="SalesView.openNegotiationModal('${r.id}')"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
              </button>
              <button 
                type="button" 
                class="w-6 h-6 inline-flex items-center justify-center text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded cursor-pointer transition-colors" 
                title="View Details" 
                onclick="SalesView.openNegotiationModal('${r.id}')"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderNegotiationsTotals(list) {
    const el = document.getElementById('sales-neg-totals');
    if (!el) return;

    const count = list.length;
    const completed = list.filter(x => x.invoiceStatus === 'Negotiated').length;
    const pending = count - completed;

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total LC Negotiations</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Bills</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Discounted / Negotiated</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${completed} <span class="text-xs font-semibold text-[#006644]">Done</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Discounting</div>
          <div class="text-lg font-black text-[#DC2626] mt-0.5">${pending} <span class="text-xs font-semibold text-[#DC2626]">Pending</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Negotiating Bank Entity</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">Standard Chartered <span class="text-[11px] font-semibold text-[#64748B]">(Foreign Dept)</span></div>
        </div>
      </div>
    `;
  },

  filterNegotiations() {
    const consignee = document.getElementById('sales-neg-consignee')?.value || 'All';
    const status = document.getElementById('sales-neg-status')?.value || 'All';

    const filtered = this.negotiationsDataset.filter(r => {
      const matchConsignee = consignee === 'All' || r.consigneeName === consignee;
      const matchStatus = status === 'All' || r.invoiceStatus === status;
      return matchConsignee && matchStatus;
    });

    this.renderNegotiationsRows(filtered);
    this.renderNegotiationsTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} negotiation records`, 'info');
    }
  },

  searchNegotiations(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderNegotiationsRows(this.negotiationsDataset);
      this.renderNegotiationsTotals(this.negotiationsDataset);
      return;
    }

    const filtered = this.negotiationsDataset.filter(r => 
      (r.invNo || '').toLowerCase().includes(q) ||
      (r.id || '').toLowerCase().includes(q) ||
      (r.poNo || '').toLowerCase().includes(q) ||
      (r.consigneeName || '').toLowerCase().includes(q)
    );

    this.renderNegotiationsRows(filtered);
    this.renderNegotiationsTotals(filtered);
  },

  downloadNegotiationsExcel() {
    const headers = ['S.No', 'ID', 'InvNo', 'Po No.', 'Consignee Name', 'Bank Ref No', 'Invoice Status'];
    const rows = this.negotiationsDataset.map(r => [
      r.sNo,
      r.id,
      `"${r.invNo}"`,
      `"${r.poNo}"`,
      `"${r.consigneeName}"`,
      `"${r.bankRefNo}"`,
      r.invoiceStatus
    ].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `negotiations_register_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported negotiations register to Excel/CSV', 'success');
    }
  },

  openNegotiationModal(id) {
    const record = this.negotiationsDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Negotiation Invoice: ${record.invNo}`);
      return;
    }

    Modal.open({
      title: 'DOCUMENT NEGOTIATION & LC DISCOUNTING',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Payments &nbsp;&gt;&nbsp; Negotiations &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">${record.invNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Invoice Number</label>
                <input type="text" value="${record.invNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#006C7A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Buyer / Consignee</label>
                <input type="text" value="${record.consigneeName}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PO Reference</label>
                <input type="text" value="${record.poNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#475569] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Negotiating Bank Entity <span class="text-[#EF4444]">*</span></label>
                <select id="neg-modal-bank" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Standard Chartered Bank" selected>Standard Chartered Bank</option>
                  <option value="State Bank of India">State Bank of India</option>
                  <option value="Citibank N.A.">Citibank N.A.</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Bank Reference No <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="neg-modal-bank-ref" value="${record.bankRefNo === '-' ? ('1440726TP0B00' + Math.floor(430 + Math.random() * 50)) : record.bankRefNo}" placeholder="Enter Bank Ref No" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-mono font-bold text-xs text-[#006C7A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Negotiation Status</label>
                <select id="neg-modal-status" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Negotiated" selected>Negotiated / Discounted</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Interest & Discounting Terms</label>
              <textarea id="neg-modal-notes" rows="2" class="w-full p-2 rounded-lg border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">SOFR + 1.25% margin applied. Clean document set negotiated under irrevocable documentary letter of credit.</textarea>
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
          label: 'Save Negotiation',
          type: 'primary',
          onClick: (m) => SalesView.saveNegotiation(record.id)
        }
      ]
    });
  },

  saveNegotiation(id) {
    const record = this.negotiationsDataset.find(x => x.id === id);
    if (!record) return;

    const bankRef = document.getElementById('neg-modal-bank-ref')?.value;
    const status = document.getElementById('neg-modal-status')?.value;

    if (bankRef) record.bankRefNo = bankRef;
    if (status) record.invoiceStatus = status;

    this.renderNegotiationsRows(this.negotiationsDataset);
    this.renderNegotiationsTotals(this.negotiationsDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Saved negotiation for ${record.invNo}`, 'success');
    }
  },

  // ==========================================
  // 8. REALIZATION REGISTER (IMAGE 3)
  // ==========================================
  realizationDataset: [
    {
      sNo: 1,
      invoiceNo: 'DFL/SNM/2627/145',
      invoiceDate: '12-08-2026',
      transactionType: 'Collections',
      consigneeName: 'MARK FOODS LLC',
      bankRef: '1440726TP0B00425',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      valueUsd: 125000.00
    },
    {
      sNo: 2,
      invoiceNo: 'DFL/SNM/2627/143',
      invoiceDate: '10-08-2026',
      transactionType: 'Collections',
      consigneeName: 'SEA PORT PRODUCTS CORPORATION',
      bankRef: '1440726TP0B00426',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      valueUsd: 110500.00
    },
    {
      sNo: 3,
      invoiceNo: 'DFL/JPT/2627/163',
      invoiceDate: '05-08-2026',
      transactionType: 'Negotiations',
      consigneeName: 'C.P. FOOD PRODUCTS, INC.',
      bankRef: '1440726TP0B00427',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      valueUsd: 142000.00
    }
  ],

  renderRealization(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">REALIZATION</h2>
        </div>

        <!-- 2. Clean Search & Filters Card (Exact to Image 3) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Year:</label>
              <select id="sales-real-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Exporter:</label>
              <select id="sales-real-exporter" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUATECH PVT LTD">DEVI AQUATECH PVT LTD</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Consignee:</label>
              <select id="sales-real-consignee" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="MARK FOODS LLC">MARK FOODS LLC</option>
                <option value="SEA PORT PRODUCTS CORPORATION">SEA PORT PRODUCTS CORPORATION</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Country:</label>
              <select id="sales-real-country" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="U.S.A.">U.S.A.</option>
                <option value="CHINA">CHINA</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Invoice Status</label>
              <select id="sales-real-status" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="Pending" selected>Pending</option>
                <option value="Realized">Realized</option>
                <option value="All">All</option>
              </select>
            </div>
          </div>

          <div class="flex justify-center pt-1">
            <button id="btn-real-search" class="px-7 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterRealization()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>

        <!-- 3. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-real-search-input" 
                placeholder="Search realization..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchRealization(this.value)"
              />
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#006C7A] hover:text-[#005662] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadRealizationExcel()">
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
                  <th class="py-3 px-3">S.No</th>
                  <th class="py-3 px-3">Invoice No.</th>
                  <th class="py-3 px-3">Invoice Date</th>
                  <th class="py-3 px-3">Transaction Type</th>
                  <th class="py-3 px-3">Consignee Name</th>
                  <th class="py-3 px-3">Bank Ref</th>
                  <th class="py-3 px-3 text-center">Status</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-real-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-real-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderRealizationRows(this.realizationDataset);
    this.renderRealizationTotals(this.realizationDataset);
  },

  renderRealizationRows(list) {
    const tbody = document.getElementById('sales-real-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="py-8 text-center text-[#64748B] text-xs font-semibold">
            No data available in table
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
        <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openRealizationModal('${r.invoiceNo}')">${r.invoiceNo}</td>
        <td class="py-3 px-3 text-[#475569] whitespace-nowrap">${r.invoiceDate}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.transactionType}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A]">${r.consigneeName}</td>
        <td class="py-3 px-3 font-mono font-semibold text-[#006C7A]">${r.bankRef}</td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#FEE2E2] text-[#DC2626] border border-[#FECDD3]">${r.status}</span>
        </td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <button 
            type="button" 
            class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
            title="Record e-BRC / Inward Remittance" 
            onclick="SalesView.openRealizationModal('${r.invoiceNo}')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderRealizationTotals(list) {
    const el = document.getElementById('sales-real-totals');
    if (!el) return;

    const count = list.length;
    const totalVal = list.reduce((sum, r) => sum + (Number(r.valueUsd) || 0), 0);

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Awaiting Inward Remittance</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Invoices</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Unrealized Export Value</div>
          <div class="text-lg font-black text-[#DC2626] mt-0.5">$${totalVal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">RBI EDPMS Limit Threshold</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">270 Days <span class="text-xs font-semibold text-[#006644]">Compliant</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">AD Code Entity</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">0290048 <span class="text-[11px] font-semibold text-[#64748B]">(SBI Overseas)</span></div>
        </div>
      </div>
    `;
  },

  filterRealization() {
    const consignee = document.getElementById('sales-real-consignee')?.value || 'All';
    const status = document.getElementById('sales-real-status')?.value || 'Pending';

    const filtered = this.realizationDataset.filter(r => {
      const matchConsignee = consignee === 'All' || r.consigneeName === consignee;
      const matchStatus = status === 'All' || r.status === status;
      return matchConsignee && matchStatus;
    });

    this.renderRealizationRows(filtered);
    this.renderRealizationTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} realization records`, 'info');
    }
  },

  searchRealization(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderRealizationRows(this.realizationDataset);
      this.renderRealizationTotals(this.realizationDataset);
      return;
    }

    const filtered = this.realizationDataset.filter(r => 
      (r.invoiceNo || '').toLowerCase().includes(q) ||
      (r.consigneeName || '').toLowerCase().includes(q) ||
      (r.bankRef || '').toLowerCase().includes(q)
    );

    this.renderRealizationRows(filtered);
    this.renderRealizationTotals(filtered);
  },

  downloadRealizationExcel() {
    const headers = ['S.No', 'Invoice No.', 'Invoice Date', 'Transaction Type', 'Consignee Name', 'Bank Ref', 'Status', 'Value USD'];
    const rows = this.realizationDataset.map(r => [
      r.sNo,
      `"${r.invoiceNo}"`,
      `"${r.invoiceDate}"`,
      `"${r.transactionType}"`,
      `"${r.consigneeName}"`,
      `"${r.bankRef}"`,
      r.status,
      r.valueUsd
    ].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `realization_register_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported realization register to Excel/CSV', 'success');
    }
  },

  openRealizationModal(invoiceNo) {
    const record = this.realizationDataset.find(x => x.invoiceNo === invoiceNo);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Realization for: ${record.invoiceNo}`);
      return;
    }

    Modal.open({
      title: 'RECORD STATUTORY REALIZATION & e-BRC',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Payments &nbsp;&gt;&nbsp; Realization &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">${record.invoiceNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Invoice Number</label>
                <input type="text" value="${record.invoiceNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#006C7A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Buyer / Consignee</label>
                <input type="text" value="${record.consigneeName}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Transaction Type</label>
                <input type="text" value="${record.transactionType}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#475569] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Bank Reference No</label>
                <input type="text" value="${record.bankRef}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-mono font-bold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Realized Amount (USD) <span class="text-[#EF4444]">*</span></label>
                <input type="number" id="real-modal-usd" value="${record.valueUsd}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-extrabold text-xs text-[#006644] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">e-BRC Certificate Number <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="real-modal-brc" value="BRC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-mono font-bold text-xs text-[#006C7A] outline-none focus:border-[#006C7A]">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Date of Remittance Receipt <span class="text-[#EF4444]">*</span></label>
                <input type="date" id="real-modal-date" value="${new Date().toISOString().slice(0, 10)}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">EDPMS Status</label>
                <select id="real-modal-status" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Realized" selected>Realized & Closed in EDPMS</option>
                  <option value="Pending">Pending</option>
                </select>
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
          label: 'Save Realization',
          type: 'primary',
          onClick: (m) => SalesView.saveRealization(record.invoiceNo)
        }
      ]
    });
  },

  saveRealization(invoiceNo) {
    const record = this.realizationDataset.find(x => x.invoiceNo === invoiceNo);
    if (!record) return;

    const brc = document.getElementById('real-modal-brc')?.value;
    const dateOfReceipt = document.getElementById('real-modal-date')?.value || '23-10-2026';
    const realizedVal = parseFloat(document.getElementById('real-modal-usd')?.value) || record.valueUsd;

    // Move to Realization Done
    const doneItem = {
      slNo: this.realizationDoneDataset.length + 1,
      invoiceNo: record.invoiceNo,
      consignee: record.consigneeName,
      salesInvoiceDate: record.invoiceDate,
      transactionType: record.transactionType,
      totalInvoiceValue: record.valueUsd,
      realisedValue: realizedVal,
      dateOfDiscounting: '-',
      bankRefNo: record.bankRef,
      dateOfReceipt: dateOfReceipt,
      year: record.year || '2026-2027',
      exporter: record.exporter || 'DEVI FISHERIES LIMITED',
      country: record.country || 'U.S.A.',
      billsType: record.transactionType
    };

    this.realizationDoneDataset.unshift(doneItem);
    this.realizationDoneDataset.forEach((r, idx) => r.slNo = idx + 1);

    // Remove from pending realization
    this.realizationDataset = this.realizationDataset.filter(x => x.invoiceNo !== invoiceNo);

    this.renderRealizationRows(this.realizationDataset);
    this.renderRealizationTotals(this.realizationDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Successfully recorded e-BRC ${brc} for ${record.invoiceNo}`, 'success');
    }
  },

  // ==========================================
  // 9. REALIZATION DONE REGISTER (IMAGE 4)
  // ==========================================
  realizationDoneDataset: [
    {
      slNo: 1,
      invoiceNo: 'DFL/VSP/2627/004',
      consignee: 'ZHEJIANG YIWU CHINA COMMODITY CITY IMPORT AND EXPORT CO.,LTD',
      salesInvoiceDate: '28-07-2026',
      transactionType: 'Collections',
      totalInvoiceValue: 101865.60,
      realisedValue: 101865.60,
      dateOfDiscounting: '-',
      bankRefNo: '1440726TP0B00419',
      dateOfReceipt: '29-07-2026',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      billsType: 'Collections'
    },
    {
      slNo: 2,
      invoiceNo: 'DFL/VSP/2627/003',
      consignee: 'ZHEJIANG YIWU CHINA COMMODITY CITY IMPORT AND EXPORT CO.,LTD',
      salesInvoiceDate: '28-07-2026',
      transactionType: 'Collections',
      totalInvoiceValue: 101865.60,
      realisedValue: 101865.60,
      dateOfDiscounting: '-',
      bankRefNo: '1440726TP0B00419',
      dateOfReceipt: '29-07-2026',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      billsType: 'Collections'
    },
    {
      slNo: 3,
      invoiceNo: 'DFL/KKD/2627/134',
      consignee: 'ZHANJIANG ZHANXIN AQUATIC PRODUCT CO., LTD',
      salesInvoiceDate: '17-08-2026',
      transactionType: 'Collections',
      totalInvoiceValue: 95256.00,
      realisedValue: 95256.00,
      dateOfDiscounting: '-',
      bankRefNo: '1440726DU0B03805',
      dateOfReceipt: '10-09-2026',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      billsType: 'Collections'
    },
    {
      slNo: 4,
      invoiceNo: 'DFL/KKD/2627/130',
      consignee: 'ZHANJIANG ZHANXIN AQUATIC PRODUCT CO., LTD',
      salesInvoiceDate: '07-08-2026',
      transactionType: 'Collections',
      totalInvoiceValue: 98172.00,
      realisedValue: 98172.00,
      dateOfDiscounting: '-',
      bankRefNo: '1440726DU0B03806',
      dateOfReceipt: '07-09-2026',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      billsType: 'Collections'
    },
    {
      slNo: 5,
      invoiceNo: 'DFL/KKD/2627/124',
      consignee: 'ZHANJIANG ZHANXIN AQUATIC PRODUCT CO., LTD',
      salesInvoiceDate: '24-07-2026',
      transactionType: 'Collections',
      totalInvoiceValue: 98172.00,
      realisedValue: 98172.00,
      dateOfDiscounting: '-',
      bankRefNo: '1440726DU0B03535',
      dateOfReceipt: '03-09-2026',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      billsType: 'Collections'
    }
  ],

  renderRealizationDone(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">REALIZATION DONE</h2>
        </div>

        <!-- 2. Clean Search & Filters Card (Exact to Image 4) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-4">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT YEAR</label>
              <select id="sales-rd-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT EXPORTER :</label>
              <select id="sales-rd-exporter" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUATECH PVT LTD">DEVI AQUATECH PVT LTD</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT COUNTRY:</label>
              <select id="sales-rd-country" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="CHINA">CHINA</option>
                <option value="U.S.A.">U.S.A.</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">BILLS TYPE:</label>
              <select id="sales-rd-bills-type" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="Collections">Collections</option>
                <option value="Negotiations">Negotiations</option>
              </select>
            </div>
          </div>

          <div class="flex justify-start pt-1">
            <button id="btn-rd-search" class="px-7 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterRealizationDone()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>

        <!-- 3. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-rd-search-input" 
                placeholder="Search realized payments..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchRealizationDone(this.value)"
              />
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#006C7A] hover:text-[#005662] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadRealizationDoneExcel()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Download Excel</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider whitespace-nowrap">
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortRealizationDone('slNo')">
                    <span class="inline-flex items-center gap-1">Sl.No. <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">Invoice NO</th>
                  <th class="py-3 px-3">Consignee</th>
                  <th class="py-3 px-3">Sales Invoice Date</th>
                  <th class="py-3 px-3">Transaction Type</th>
                  <th class="py-3 px-3 text-right">Total Invoice Value$</th>
                  <th class="py-3 px-3 text-right">Realised Value$</th>
                  <th class="py-3 px-3 text-center">Date Of Discounting With Bank</th>
                  <th class="py-3 px-3">Bank Ref No</th>
                  <th class="py-3 px-3">Date Of Receipt Of Payment-1</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-rd-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-rd-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderRealizationDoneRows(this.realizationDoneDataset);
    this.renderRealizationDoneTotals(this.realizationDoneDataset);
  },

  renderRealizationDoneRows(list) {
    const tbody = document.getElementById('sales-rd-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="11" class="py-8 text-center text-[#64748B] text-xs">
            No realized payment records found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.slNo || (idx + 1)}</td>
        <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openRealizationDoneModal('${r.invoiceNo}')">${r.invoiceNo}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A]">${r.consignee}</td>
        <td class="py-3 px-3 font-semibold text-[#475569] whitespace-nowrap">${r.salesInvoiceDate}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.transactionType}</td>
        <td class="py-3 px-3 font-extrabold text-[#006644] text-right">$${(r.totalInvoiceValue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td class="py-3 px-3 font-extrabold text-[#006644] text-right">$${(r.realisedValue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td class="py-3 px-3 text-[#64748B] text-center font-medium">${r.dateOfDiscounting || '-'}</td>
        <td class="py-3 px-3 font-mono font-semibold text-[#006C7A] whitespace-nowrap">${r.bankRefNo}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A] whitespace-nowrap">${r.dateOfReceipt}</td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <button 
            type="button" 
            class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
            title="View Realization Breakdown" 
            onclick="SalesView.openRealizationDoneModal('${r.invoiceNo}')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderRealizationDoneTotals(list) {
    const el = document.getElementById('sales-rd-totals');
    if (!el) return;

    const count = list.length;
    const totalVal = list.reduce((sum, r) => sum + (Number(r.totalInvoiceValue) || 0), 0);
    const totalRealised = list.reduce((sum, r) => sum + (Number(r.realisedValue) || 0), 0);

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Realized Invoices</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Paid In Full</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Realized USD</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">$${totalRealised.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Foreign Inward BRC Status</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">100% <span class="text-xs font-semibold text-[#006C7A]">Certified</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Key Clearing Bank Entity</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">SBI Commercial <span class="text-[11px] font-semibold text-[#64748B]">(FIRC Settled)</span></div>
        </div>
      </div>
    `;
  },

  filterRealizationDone() {
    const country = document.getElementById('sales-rd-country')?.value || 'All';
    const billsType = document.getElementById('sales-rd-bills-type')?.value || 'All';

    const filtered = this.realizationDoneDataset.filter(r => {
      const matchCountry = country === 'All' || r.country === country;
      const matchType = billsType === 'All' || r.billsType === billsType;
      return matchCountry && matchType;
    });

    this.renderRealizationDoneRows(filtered);
    this.renderRealizationDoneTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} completed realization records`, 'info');
    }
  },

  searchRealizationDone(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderRealizationDoneRows(this.realizationDoneDataset);
      this.renderRealizationDoneTotals(this.realizationDoneDataset);
      return;
    }

    const filtered = this.realizationDoneDataset.filter(r => 
      (r.invoiceNo || '').toLowerCase().includes(q) ||
      (r.consignee || '').toLowerCase().includes(q) ||
      (r.bankRefNo || '').toLowerCase().includes(q)
    );

    this.renderRealizationDoneRows(filtered);
    this.renderRealizationDoneTotals(filtered);
  },

  sortRealizationDone(key) {
    this.realizationDoneDataset.reverse();
    this.renderRealizationDoneRows(this.realizationDoneDataset);
  },

  downloadRealizationDoneExcel() {
    const headers = ['Sl.No.', 'Invoice NO', 'Consignee', 'Sales Invoice Date', 'Transaction Type', 'Total Invoice Value$', 'Realised Value$', 'Date Of Discounting With Bank', 'Bank Ref No', 'Date Of Receipt Of Payment-1'];
    const rows = this.realizationDoneDataset.map(r => [
      r.slNo,
      `"${r.invoiceNo}"`,
      `"${r.consignee}"`,
      `"${r.salesInvoiceDate}"`,
      `"${r.transactionType}"`,
      r.totalInvoiceValue,
      r.realisedValue,
      `"${r.dateOfDiscounting}"`,
      `"${r.bankRefNo}"`,
      `"${r.dateOfReceipt}"`
    ].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `realization_done_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported realized register to Excel/CSV', 'success');
    }
  },

  openRealizationDoneModal(invoiceNo) {
    const record = this.realizationDoneDataset.find(x => x.invoiceNo === invoiceNo);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Realized Invoice: ${record.invoiceNo}`);
      return;
    }

    Modal.open({
      title: 'FOREIGN INWARD REMITTANCE & e-BRC CERTIFICATE',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Payments &nbsp;&gt;&nbsp; Realization Done &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">${record.invoiceNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Invoice Number</label>
                <input type="text" value="${record.invoiceNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#006C7A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Consignee</label>
                <input type="text" value="${record.consignee}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Bank Reference No</label>
                <input type="text" value="${record.bankRefNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-mono font-bold text-xs text-[#006C7A] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Total Invoice Value (USD)</label>
                <input type="text" value="$${record.totalInvoiceValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Realised Value (USD)</label>
                <input type="text" value="$${record.realisedValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#DCFCE7] font-extrabold text-xs text-[#15803D] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Date of Receipt</label>
                <input type="text" value="${record.dateOfReceipt}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
            </div>

            <div class="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <div class="flex items-center gap-2 text-[#006644] font-bold text-xs mb-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>DGFT EDPMS Export Discharge Certificate Validated</span>
              </div>
              <p class="text-[11px] text-[#64748B]">All statutory bank realizations reported to Reserve Bank of India EDPMS portal under Authorized Dealer code 0290048. Shipping Bill matching reconciled.</p>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Close',
          type: 'danger',
          onClick: (m) => m.close()
        }
      ]
    });
  },
'''

TARGET_BLOCK = '''  renderCollections(container) {
    const colls = SalesDataStore.getCollection('collections');

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Export Receivables & Outstanding Collections')}
        <div id="sales-col-table-container"></div>
      </div>
    `;

    new DataTable({
      containerId: 'sales-col-table-container',
      data: colls,
      keyField: 'id',
      tableTitle: 'Export Trade Receivables Ledger',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'invoiceNo', header: 'Invoice No', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'buyer', header: 'Buyer', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'invoiceAmountUsd', header: 'Invoice USD', render: (v) => `<span class="font-extrabold text-[#006644]">$${(v || 0).toLocaleString()}</span>` },
        { field: 'outstandingUsd', header: 'Outstanding', render: (v) => `<span class="font-bold text-[#BF2600]">$${(v || 0).toLocaleString()}</span>` },
        { field: 'paymentTerms', header: 'Terms', render: (v) => `<span class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#F4F5F7] border border-[#DFE1E6]">${v}</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'info') }
      ]
    });
  },

  renderNegotiations(container) {
    this.renderCollections(container);
  },

  renderRealization(container) {
    const reals = SalesDataStore.getCollection('realizations');

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('e-BRC & Bank Realization Certificates (DGFT / EDPMS)')}
        <div id="sales-real-table-container"></div>
      </div>
    `;

    new DataTable({
      containerId: 'sales-real-table-container',
      data: reals,
      keyField: 'id',
      tableTitle: 'EDPMS Statutory Realization Status',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'invoiceNo', header: 'Invoice No', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'shippingBillNo', header: 'Shipping Bill', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'brcNumber', header: 'e-BRC No', render: (v) => `<span class="font-mono font-bold text-[#006C7A]">${v}</span>` },
        { field: 'realizedAmountUsd', header: 'Realized USD', render: (v) => `<span class="font-extrabold text-[#006644]">$${(v || 0).toLocaleString()}</span>` },
        { field: 'realizedInr', header: 'Realized INR', render: (v) => `<span class="font-bold text-[#172B4D]">₹ ${((v || 0) / 100000).toFixed(2)} L</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
  },

  renderRealizationDone(container) {
    this.renderRealization(container);
  },'''

def update_file(path):
    print(f"Updating {path}...")
    if not os.path.exists(path):
        print(f"  [ERROR] File not found: {path}")
        return False

    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    if TARGET_BLOCK in content:
        content = content.replace(TARGET_BLOCK, PAYMENTS_REMAINING_JS)
        print("  ✓ Replaced legacy payment methods with full implementations")
    elif 'collectionsDataset:' in content:
        print("  ✓ collectionsDataset already present")
    else:
        print("  [WARN] TARGET_BLOCK not found in exact form")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  ✓ Saved {path}")
    return True

def main():
    target_files = [
        'js/views/salesView.js',
        'scripts/sales_view_code.py',
        'miledeep-devi-fisheries.html',
        'standalone.html'
    ]

    for f in target_files:
        update_file(f)

    print("\nVerifying files...")
    for f in target_files:
        with open(f, 'r', encoding='utf-8') as handle:
            c = handle.read()
            assert 'collectionsDataset:' in c, f"collectionsDataset missing in {f}"
            assert 'negotiationsDataset:' in c, f"negotiationsDataset missing in {f}"
            assert 'realizationDataset:' in c, f"realizationDataset missing in {f}"
            assert 'realizationDoneDataset:' in c, f"realizationDoneDataset missing in {f}"
            assert 'sales-col-tbody' in c, f"sales-col-tbody missing in {f}"
            assert 'sales-neg-tbody' in c, f"sales-neg-tbody missing in {f}"
            assert 'sales-real-tbody' in c, f"sales-real-tbody missing in {f}"
            assert 'sales-rd-tbody' in c, f"sales-rd-tbody missing in {f}"
        print(f"  ✓ {f} fully verified!")

if __name__ == '__main__':
    main()
