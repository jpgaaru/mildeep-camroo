#!/usr/bin/env python3
"""
scripts/update_shipping_bill_and_fix_tabs.py

1. Fixes the duplicated tab menu in the last two screens:
   - Removes ${this.renderOrdersTabBar('custom-invoices')} from renderCustomInvoices
   - Removes ${this.renderOrdersTabBar('isf-details')} from renderIsfDetails
   This ensures TabBar.render('sales-tab-bar-container', this.activeHash) renders the single clean tab bar.

2. Implements Shipping Bill (Image 2 & 3):
   - Page title: SHIPPING BILL (clean, no extra buttons)
   - Top Filter Card: SELECT YEAR, SELECT EXPORTER :, SELECT CONSIGNEE :, SELECT PLANT :, SELECT COUNTRY:, INVOICE STATUS :, Search ->
   - Table Toolbar: Search input (36px padding), More Search, Load All
   - Table: S.No, ID, Inv No, PoNo, Consignee Name, Shipping Bill No, Invoice Status (solid red pill Pending), Actions (blue + icon)
   - Realistic 8 records matching user screenshot Image 2
   - On clicking '+' under Actions: opens Modal popup (Image 3) "SHIPPING BILLING"
     - Card 1: Invoice details (Invoice No, Date, Consignee, Port of Loading, Port of Discharge, Country of Destination, Total Cartons, Net Wt, Invoice Value, Freight, Other Deductions, FOB INR)
     - Card 2: Shipping Bill entries (Shipping Bill No, Shipping Date, LEO Date, Exchange Rate, SB FOB US $, SB FOB INR)
     - Close and Save buttons
     - Live calculation and saving into dataset with Toast notification
"""

import os, re

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Step 1: Remove duplicated tab bar from renderCustomInvoices
    target_cinv_tab = '''        <!-- 1. Orders Tab Bar Navigation -->
        ${this.renderOrdersTabBar('custom-invoices')}

'''
    if target_cinv_tab in content:
        content = content.replace(target_cinv_tab, '')
        print(f"  ✓ Removed duplicated tab bar from Custom Invoices in {filepath}")
    else:
        # Fallback regex
        content = re.sub(r'\s*<!-- 1\. Orders Tab Bar Navigation -->\s*\$\{this\.renderOrdersTabBar\(\'custom-invoices\'\)\}\s*', '\n', content)
        print(f"  ✓ (Regex) Removed duplicated tab bar from Custom Invoices in {filepath}")

    # Step 2: Remove duplicated tab bar from renderIsfDetails
    target_isf_tab = '''        <!-- 1. Orders Tab Bar Navigation -->
        ${this.renderOrdersTabBar('isf-details')}

'''
    if target_isf_tab in content:
        content = content.replace(target_isf_tab, '')
        print(f"  ✓ Removed duplicated tab bar from ISF Details in {filepath}")
    else:
        content = re.sub(r'\s*<!-- 1\. Orders Tab Bar Navigation -->\s*\$\{this\.renderOrdersTabBar\(\'isf-details\'\)\}\s*', '\n', content)
        print(f"  ✓ (Regex) Removed duplicated tab bar from ISF Details in {filepath}")

    # Step 3: Replace renderShippingBill with full implementation matching Image 2 & 3
    shipping_bill_impl = '''  // ==========================================
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
              <button id="btn-sb-search" class="px-6 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterShippingBill()">
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
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.toggleMoreSbSearch()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.loadAllShippingBill()">
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
      size: 'xl',
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
  },'''

    # Find boundaries for renderShippingBill
    idx_sb_start = content.find('renderShippingBill(container) {')
    idx_sb_end = content.find('renderCommercialInvoice(container) {', idx_sb_start)

    if idx_sb_start != -1 and idx_sb_end != -1:
        content = content[:idx_sb_start] + shipping_bill_impl + '\n\n  ' + content[idx_sb_end:]
        print(f"  ✓ Upgraded renderShippingBill in {filepath}")
    else:
        print(f"  ❌ Could not find boundaries for renderShippingBill in {filepath}")
        return False

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
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
