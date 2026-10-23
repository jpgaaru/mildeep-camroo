#!/usr/bin/env python3
"""
scripts/apply_custom_invoices_design_system.py
Upgrades the Custom Invoices screen (tab next to Proforma List in Orders)
to use the Base Design System with AquaPulse colors and exact content
from the user's uploaded reference image.
"""

import os, sys

NEW_CUSTOM_INVOICES_CODE = '''  // ==========================================
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
        <!-- 1. Orders Tab Bar Navigation -->
        ${this.renderOrdersTabBar('custom-invoices')}

        <!-- 2. Page Title Header -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">Custom Invoices</h1>
          <div class="flex items-center gap-2">
            <button class="px-4 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.openNewCustomInvoice()">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>+ Generate Custom Invoice</span>
            </button>
          </div>
        </div>

        <!-- 3. Top Filter Card (Base Design System with AquaPulse Colors) -->
        <div id="sales-cinv-filter-card" class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#F1F5F9]">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              <h3 class="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Search & Filters</h3>
            </div>
            <div class="inline-flex items-center gap-2">
              <button type="button" class="w-7 h-7 inline-flex items-center justify-center bg-white hover:bg-[#F0F9FF] border border-[#CBD5E1] hover:border-[#006C7A] text-[#475569] hover:text-[#006C7A] rounded transition-colors cursor-pointer" onclick="SalesView.loadAllCustomInvoices()" title="Reset all filters">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end mb-4">
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

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">BILLS TYPE:</label>
              <select id="sales-cinv-type-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All">All</option>
                <option value="Completed" selected>Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <!-- Buttons using Base Design System colors -->
          <div class="flex items-center justify-end gap-3 pt-2 border-t border-[#F1F5F9]">
            <button id="btn-cinv-search" class="px-6 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterCustomInvoices()">
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
                id="sales-cinv-search-input" 
                placeholder="Search by Invoice No, PO, Buyer, PI..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchCustomInvoices(this.value)"
              />
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.toggleMoreCinvSearch()">
                <svg class="w-3.5 h-3.5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.loadAllCustomInvoices()">
                <svg class="w-3.5 h-3.5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
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
        ? `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold text-[#991B1B] bg-[#FEF2F2] border border-[#FECACA]">Pending</span>`
        : `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0]">${r.stockStatus}</span>`;

      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
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
              <button class="p-1.5 rounded border border-[#E2E8F0] text-[#006C7A] hover:bg-[#F0F9FF] cursor-pointer transition-colors" title="Download" onclick="SalesView.downloadCustomInvoice('${r.id}')">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              </button>
              <button class="p-1.5 rounded border border-[#E2E8F0] text-[#64748B] hover:text-[#006C7A] hover:bg-[#F1F5F9] cursor-pointer transition-colors" title="Edit" onclick="SalesView.editCustomInvoice('${r.id}')">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
              </button>
              <button class="p-1.5 rounded border border-[#E2E8F0] text-[#64748B] hover:text-[#006C7A] hover:bg-[#F1F5F9] cursor-pointer transition-colors" title="Copy" onclick="SalesView.copyCustomInvoice('${r.id}')">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              </button>
              <button class="p-1.5 rounded border border-[#E2E8F0] text-[#64748B] hover:text-[#006C7A] hover:bg-[#F1F5F9] cursor-pointer transition-colors" title="View" onclick="SalesView.viewCustomInvoice('${r.id}')">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
              <button class="p-1.5 rounded border border-[#E2E8F0] text-[#64748B] hover:text-[#006C7A] hover:bg-[#F1F5F9] cursor-pointer transition-colors" title="Print" onclick="SalesView.printCustomInvoice('${r.id}')">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
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
  },'''

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find renderCustomInvoices definition
    target_start = content.find('renderCustomInvoices(container) {')
    if target_start == -1:
        print(f"  ⚠ renderCustomInvoices not found in {filepath}")
        return False

    # Find the end of renderCustomInvoices - which is right before renderIsfDetails
    target_end = content.find('renderIsfDetails(container) {', target_start)
    if target_end == -1:
        print(f"  ⚠ renderIsfDetails not found in {filepath}")
        return False

    # Find if there was a comment above renderCustomInvoices
    comment_start = content.rfind('// ==========================================', 0, target_start)
    if comment_start != -1 and comment_start > target_start - 200:
        actual_start = comment_start
    else:
        actual_start = target_start

    # Check if customInvoiceDataset already exists above actual_start
    idx_cid = content.rfind('customInvoiceDataset:', 0, actual_start)
    if idx_cid != -1:
        actual_start = content.rfind('// ==========================================', 0, idx_cid)

    # Find comment above renderIsfDetails
    comment_isf = content.rfind('// ==========================================', 0, target_end)
    if comment_isf != -1 and comment_isf > target_end - 200:
        actual_end = comment_isf
    else:
        actual_end = target_end

    new_content = content[:actual_start] + NEW_CUSTOM_INVOICES_CODE + '\n\n  ' + content[actual_end:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"  ✓ Updated {filepath}")
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
            print(f"Skipping {p}")

if __name__ == '__main__':
    main()
