#!/usr/bin/env python3
# scripts/apply_proforma_design_system.py

import os, sys

NEW_HEADER_AND_FILTER = '''        <!-- 2. Page Title Header -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">Proforma Invoices</h1>
          <div class="flex items-center gap-2">
            <button class="px-4 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.openNewPi()">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>+ New PI</span>
            </button>
            <button class="px-4 py-2 border border-[#006C7A] bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#006C7A] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer transition-all" onclick="SalesView.bulkApprovePis()">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>Bulk Approval</span>
            </button>
          </div>
        </div>

        <!-- 3. Top Filter Card (Base Design System with AquaPulse Colors) -->
        <div id="sales-pi-filter-card" class="sales-pi-filter bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#F1F5F9]">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              <h3 class="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Search & Filters</h3>
            </div>
            <span class="text-[11px] text-[#64748B]">Filter proforma invoices by exporter, consignee, destination country, or status</span>
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
          <div class="flex items-center justify-center gap-3 pt-2 border-t border-[#F1F5F9]">
            <button id="btn-pi-search" class="px-6 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterProformaList()">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <span>Search</span>
            </button>
            <button id="btn-pi-new" class="px-5 py-2 bg-[#008DA6] hover:bg-[#007489] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.openNewPi()">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>+ New PI</span>
            </button>
            <button id="btn-pi-bulk-approval" class="px-5 py-2 border border-[#006C7A] bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#006C7A] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer transition-all" onclick="SalesView.bulkApprovePis()">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>Bulk Approval</span>
            </button>
          </div>
        </div>

        <!-- 4. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-pi-search-input" 
                placeholder="Search by PI, PO, Buyer, Plant..." 
                class="w-full text-xs pl-9 pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                oninput="SalesView.searchProformaList(this.value)"
              />
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.toggleMoreSearch()">
                <svg class="w-3.5 h-3.5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.loadAllProformaList()">
                <svg class="w-3.5 h-3.5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
          </div>'''

NEW_ROWS_RENDER = '''    tbody.innerHTML = list.map((r, idx) => {
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
              <button class="p-1.5 rounded border border-[#E2E8F0] text-[#64748B] hover:text-[#006C7A] hover:bg-[#F1F5F9] cursor-pointer transition-colors" title="Edit" onclick="SalesView.editPi('${r.id}')">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
              </button>
              <button class="p-1.5 rounded border border-[#E2E8F0] text-[#64748B] hover:text-[#006C7A] hover:bg-[#F1F5F9] cursor-pointer transition-colors" title="Print" onclick="SalesView.printPi('${r.id}')">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              </button>
              <button class="p-1.5 rounded border border-[#E2E8F0] text-[#64748B] hover:text-[#006C7A] hover:bg-[#F1F5F9] cursor-pointer transition-colors" title="Copy" onclick="SalesView.copyPi('${r.id}')">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              </button>
              <button class="p-1.5 rounded border border-[#E2E8F0] text-[#EF4444] hover:bg-[#FEF2F2] cursor-pointer transition-colors" title="Delete" onclick="SalesView.deletePi('${r.id}')">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join(\'\');'''

NEW_PI_SECTION = '''  // ==========================================
  // INTERNAL SCREEN: NEW PROFORMA INVOICE (IMAGE 2)
  // ==========================================
  openNewPi() {
    window.location.hash = \'#/sales/orders/new-pi\';
  },

  renderNewPi(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#0F172A]">
        <!-- Breadcrumbs Navigation -->
        <div class="flex items-center gap-2 text-xs text-[#64748B] mb-1 select-none">
          <span class="hover:text-[#0F172A]">Orders</span>
          <span class="text-[#94A3B8]">/</span>
          <a href="#/sales/orders/proforma-list" class="text-[#006C7A] hover:underline font-semibold">Proforma List</a>
          <span class="text-[#94A3B8]">/</span>
          <span class="text-[#0F172A] font-bold">New Proforma Invoice</span>
        </div>

        <!-- Section Title Header -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">New Proforma Invoice</h1>
          <button type="button" class="px-4 py-2 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#475569] hover:text-[#0F172A] cursor-pointer transition-colors flex items-center gap-1.5" onclick="window.location.hash=\'#/sales/orders/proforma-list\'">
            <svg class="w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            <span>Back to Proforma List</span>
          </button>
        </div>

        <!-- Form Card Container (Base Design System with AquaPulse Colors) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-6 shadow-xs">
          <form id="form-new-proforma" onsubmit="event.preventDefault(); SalesView.submitNewPi();">
            <div class="space-y-4">
              <!-- ROW 1 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SELECT EXPORTER <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-exporter" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Exporter</option>
                    <option value="DEVI FISHERIES LIMITED">DEVI FISHERIES LIMITED</option>
                    <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SELECT PROCESSOR <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-processor" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Processor</option>
                    <option value="857">857 - USHA Processing Unit</option>
                    <option value="853">853 - VSP Processing Unit</option>
                    <option value="1888">1888 - JPT Processing Unit</option>
                    <option value="24234236">24234236 - SATYA Processing Unit</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    NO OF CONTAINERS
                  </label>
                  <div class="flex items-center border border-[#E2E8F0] rounded-lg bg-white overflow-hidden h-9">
                    <button type="button" class="w-9 h-full flex items-center justify-center text-sm font-bold text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] cursor-pointer transition-colors" onclick="SalesView.adjustContainerCount(-1)">−</button>
                    <input type="number" id="new-pi-containers" value="1" min="1" max="99" class="w-full text-center text-xs font-bold bg-transparent border-0 outline-none focus:outline-none text-[#0F172A]">
                    <button type="button" class="w-9 h-full flex items-center justify-center text-sm font-bold text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] cursor-pointer transition-colors" onclick="SalesView.adjustContainerCount(1)">+</button>
                  </div>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    REFERENCE NUMBER
                  </label>
                  <input type="text" id="new-pi-ref-no" placeholder="Enter Reference Number" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>
              </div>

              <!-- ROW 2 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    PROFORMA INVOICE NO <span class="text-[#FF5150]">*</span>
                  </label>
                  <input type="text" id="new-pi-number" value="DFL/PI/1316/26-27" required placeholder="Enter Proforma Invoice No" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all font-semibold">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    PROFORMA INVOICE DATE <span class="text-[#FF5150]">*</span>
                  </label>
                  <input type="date" id="new-pi-date" value="2026-10-21" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    P.O NO
                  </label>
                  <input type="text" id="new-pi-po-no" placeholder="Enter P.O Number" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    P.O DATE
                  </label>
                  <input type="date" id="new-pi-po-date" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>
              </div>

              <!-- ROW 3 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    CONSIGNEE <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-consignee" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Consignee</option>
                    <option value="EASTERN FISH COMPANY LLC">EASTERN FISH COMPANY LLC</option>
                    <option value="PACIFIC SEAFOOD GROUP,">PACIFIC SEAFOOD GROUP,</option>
                    <option value="ARISTA INDUSTRIES INC">ARISTA INDUSTRIES INC</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    ULTIMATE CONSIGNEE
                  </label>
                  <select id="new-pi-ultimate-consignee" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" selected>Select Ultimate Consignee</option>
                    <option value="SAME AS CONSIGNEE">SAME AS CONSIGNEE</option>
                    <option value="EASTERN COLD STORAGE LOGISTICS">EASTERN COLD STORAGE LOGISTICS</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    BUYER NAME
                  </label>
                  <select id="new-pi-buyer" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" selected>Select Buyer</option>
                    <option value="EASTERN FISH COMPANY LLC">EASTERN FISH COMPANY LLC</option>
                    <option value="PACIFIC SEAFOOD GROUP,">PACIFIC SEAFOOD GROUP,</option>
                    <option value="ARISTA INDUSTRIES INC">ARISTA INDUSTRIES INC</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    NOTIFY PARTY
                  </label>
                  <select id="new-pi-notify" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" selected>Select Notify Party</option>
                    <option value="SAME AS CONSIGNEE">SAME AS CONSIGNEE</option>
                    <option value="EASTERN FISH COMPANY LLC">EASTERN FISH COMPANY LLC</option>
                    <option value="EXPEDITORS INTL OF WASHINGTON">EXPEDITORS INTL OF WASHINGTON</option>
                  </select>
                </div>
              </div>

              <!-- ROW 4 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    IMPORTER OF RECORD <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-importer" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Importer of Record</option>
                    <option value="EASTERN FISH COMPANY LLC">EASTERN FISH COMPANY LLC</option>
                    <option value="PACIFIC SEAFOOD GROUP">PACIFIC SEAFOOD GROUP</option>
                    <option value="ARISTA INDUSTRIES INC">ARISTA INDUSTRIES INC</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    AGENT
                  </label>
                  <select id="new-pi-agent" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" selected>Select Agent</option>
                    <option value="COASTAL MARINE AGENCIES">COASTAL MARINE AGENCIES</option>
                    <option value="SAGAR MARINE BROKERS">SAGAR MARINE BROKERS</option>
                    <option value="DELTA SEAFOOD ASSOCIATES">DELTA SEAFOOD ASSOCIATES</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    CERTIFICATION
                  </label>
                  <select id="new-pi-cert" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" selected>Select Certification</option>
                    <option value="BAP 4-Star">BAP 4-Star</option>
                    <option value="BRCGS">BRCGS Grade A</option>
                    <option value="ASC">ASC Certified</option>
                    <option value="HACCP">HACCP Compliance</option>
                    <option value="FSSC 22000">FSSC 22000</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    PORT OF LOADING <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-pol" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Port of Loading</option>
                    <option value="Visakhapatnam (INVTZ)" selected>Visakhapatnam (INVTZ)</option>
                    <option value="Chennai (INMAA)">Chennai (INMAA)</option>
                    <option value="Kolkata (INCCU)">Kolkata (INCCU)</option>
                    <option value="Krishnapatnam (INKRI)">Krishnapatnam (INKRI)</option>
                  </select>
                </div>
              </div>

              <!-- ROW 5 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    DESTINATION COUNTRY <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-dest-country" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Country</option>
                    <option value="USA" selected>USA</option>
                    <option value="CHINA">CHINA</option>
                    <option value="BELGIUM">BELGIUM</option>
                    <option value="RUSSIA">RUSSIA</option>
                    <option value="JAPAN">JAPAN</option>
                    <option value="CANADA">CANADA</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    PORT OF DISCHARGE <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-pod" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Port of Discharge</option>
                    <option value="Los Angeles, USA" selected>Los Angeles, USA</option>
                    <option value="New York, USA">New York, USA</option>
                    <option value="Seattle, USA">Seattle, USA</option>
                    <option value="Rotterdam, Netherlands">Rotterdam, Netherlands</option>
                    <option value="Shanghai, China">Shanghai, China</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    FINAL DESTINATION COUNTRY
                  </label>
                  <select id="new-pi-final-dest-country" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" selected>Select Final Destination Country</option>
                    <option value="USA" selected>USA</option>
                    <option value="CHINA">CHINA</option>
                    <option value="BELGIUM">BELGIUM</option>
                    <option value="RUSSIA">RUSSIA</option>
                    <option value="JAPAN">JAPAN</option>
                    <option value="CANADA">CANADA</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    FINAL DESTINATION <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-final-dest" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Final Destination</option>
                    <option value="Los Angeles, CA" selected>Los Angeles, CA</option>
                    <option value="Elizabeth, NJ">Elizabeth, NJ</option>
                    <option value="Seattle, WA">Seattle, WA</option>
                    <option value="Rotterdam Port">Rotterdam Port</option>
                  </select>
                </div>
              </div>

              <!-- ROW 6 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SHIPBY DATE
                  </label>
                  <input type="date" id="new-pi-shipby" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SHIPBY DATE 2 (TEXT)
                  </label>
                  <input type="text" id="new-pi-shipby-text" placeholder="Enter ShipBy Date Text (e.g. Prompt)" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    BANK DETAILS <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-bank" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Bank</option>
                    <option value="HDFC Bank - Current A/c 502000123456" selected>HDFC Bank - Current A/c 502000123456</option>
                    <option value="State Bank of India - A/c 3892019283">State Bank of India - A/c 3892019283</option>
                    <option value="ICICI Bank Ltd - A/c 0012938472">ICICI Bank Ltd - A/c 0012938472</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SHOW BANK <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-show-bank" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="No" selected>No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>

              <!-- ROW 7 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    PAYMENT TERMS <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-payment-terms" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Payment Terms</option>
                    <option value="100% DP AT SIGHT" selected>100% DP AT SIGHT</option>
                    <option value="CAD (CASH AGAINST DOCUMENTS)">CAD (CASH AGAINST DOCUMENTS)</option>
                    <option value="LC 90 DAYS">LC 90 DAYS</option>
                    <option value="30 DAYS NET">30 DAYS NET</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SHIPMENT TERMS <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-shipment-terms" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Shipment Terms</option>
                    <option value="CIF (COST INSURANCE FREIGHT)" selected>CIF (COST INSURANCE FREIGHT)</option>
                    <option value="FOB (FREE ON BOARD)">FOB (FREE ON BOARD)</option>
                    <option value="C&F (COST & FREIGHT)">C&F (COST & FREIGHT)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    DELIVERY TERMS <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-delivery-terms" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Delivery Terms</option>
                    <option value="PORT TO PORT" selected>PORT TO PORT</option>
                    <option value="DOOR TO DOOR">DOOR TO DOOR</option>
                    <option value="CY TO CY">CY TO CY</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    QUANTITY UNITS <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-qty-units" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Quantity Units</option>
                    <option value="LBS (POUNDS)" selected>LBS (POUNDS)</option>
                    <option value="KGS (KILOGRAMS)">KGS (KILOGRAMS)</option>
                    <option value="MTONS (METRIC TONS)">MTONS (METRIC TONS)</option>
                    <option value="CARTONS">CARTONS</option>
                  </select>
                </div>
              </div>

              <!-- ROW 8 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    CURRENCY <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-currency" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Currency</option>
                    <option value="USD" selected>USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    FREIGHT
                  </label>
                  <input type="text" id="new-pi-freight" placeholder="Enter Freight" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    CHARGE NAME
                  </label>
                  <input type="text" id="new-pi-charge-name" placeholder="Enter Charge Name" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    CHARGE AMOUNT
                  </label>
                  <input type="text" id="new-pi-charge-amount" placeholder="Enter Charge Amount" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>
              </div>

              <!-- ROW 9: PRODUCTION PLANT -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    PRODUCTION PLANT
                  </label>
                  <input type="text" id="new-pi-plant" placeholder="e.g. USHA, VSP, JPT, SATYA" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>
              </div>

              <!-- ROW 10: REMARKS -->
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  REMARKS
                </label>
                <textarea id="new-pi-remarks" rows="3" placeholder="Enter Remarks" class="w-full p-3 rounded-lg border border-[#E2E8F0] bg-white text-xs text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all"></textarea>
              </div>

              <!-- BOTTOM ACTION BAR -->
              <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
                <button type="button" class="px-5 py-2.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#475569] hover:text-[#0F172A] cursor-pointer transition-colors" onclick="window.location.hash=\'#/sales/orders/proforma-list\'">
                  Cancel
                </button>
                <button type="submit" class="px-6 py-2.5 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold shadow-xs hover:shadow cursor-pointer transition-all flex items-center gap-2">
                  <span>Create Proforma Invoice</span>
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;
  },'''

NEW_BULK_APPROVE = '''  // ==========================================
  // BULK APPROVAL MODAL (IMAGE 3)
  // ==========================================
  bulkApprovePis() {
    if (typeof Modal === 'undefined' || !Modal.open) {
      alert('Modal dialog component not ready.');
      return;
    }

    Modal.open({
      title: 'Order Status Details',
      size: 'sm',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <!-- Select PI -->
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select PI:</label>
              <select id="modal-bulk-pi-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="PENDING_ALL" selected>All Pending PIs (7393, 7388)</option>
                <option value="7393">7393 - DFL/PI/1315/26-27 (EASTERN FISH)</option>
                <option value="7388">7388 - DFL/PI/1310/26-27 (ARISTA INDUSTRIES)</option>
                <option value="ALL">Select All 8 PIs</option>
              </select>
            </div>

            <!-- Status -->
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Status:</label>
              <select id="modal-bulk-status-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="" disabled selected>Select Status</option>
                <option value="Approved">Approved</option>
                <option value="Po Received">Po Received</option>
                <option value="Pi-Pending">Pi-Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <!-- Action Buttons using Base Design System colors -->
          <div class="flex items-center justify-end gap-2.5 pt-4 mt-2 border-t border-[#F1F5F9]">
            <button type="button" class="px-5 py-2 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#475569] hover:text-[#0F172A] cursor-pointer transition-colors" onclick="Modal.close()">
              Close
            </button>
            <button type="button" class="px-6 py-2 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold shadow-xs hover:shadow cursor-pointer transition-all flex items-center gap-1.5" onclick="SalesView.submitBulkApproval()">
              Submit
            </button>
          </div>
        </div>
      `
    });
  },'''

def update_content(content):
    # 1. Update Header & Filter (from "<!-- 2. Page Title Header -->" up to "<!-- Table Container -->")
    idx_p2 = content.find('<!-- 2. Page Title Header -->')
    if idx_p2 != -1:
        idx_tc = content.find('<!-- Table Container -->', idx_p2)
        if idx_tc != -1:
            content = content[:idx_p2] + NEW_HEADER_AND_FILTER + '\n\n          ' + content[idx_tc:]

    # 2. Update renderProformaRows
    idx_tbody_start = content.find('tbody.innerHTML = list.map((r, idx) => {')
    idx_tbody_end = content.find('}).join(\'\');', idx_tbody_start)
    if idx_tbody_start != -1 and idx_tbody_end != -1:
        idx_tbody_end += len('}).join(\'\');')
        content = content[:idx_tbody_start] + NEW_ROWS_RENDER + content[idx_tbody_end:]

    # 3. Update renderNewPi
    idx_newpi = content.find('// INTERNAL SCREEN: NEW PROFORMA INVOICE')
    if idx_newpi != -1:
        comment_start = content.rfind('// ==========================================', 0, idx_newpi)
        idx_adjust = content.find('adjustContainerCount(delta) {', idx_newpi)
        if comment_start != -1 and idx_adjust != -1:
            content = content[:comment_start] + NEW_PI_SECTION + '\n\n  ' + content[idx_adjust:]

    # 4. Update bulkApprovePis
    idx_bulk = content.find('// BULK APPROVAL MODAL')
    if idx_bulk != -1:
        comment_bulk = content.rfind('// ==========================================', 0, idx_bulk)
        idx_submit_bulk = content.find('submitBulkApproval() {', idx_bulk)
        if comment_bulk != -1 and idx_submit_bulk != -1:
            content = content[:comment_bulk] + NEW_BULK_APPROVE + '\n\n  ' + content[idx_submit_bulk:]

    return content

def main():
    targets = [
        'js/views/salesView.js',
        'scripts/sales_view_code.py',
        'miledeep-devi-fisheries.html',
        'standalone.html'
    ]

    for p in targets:
        if not os.path.exists(p):
            print(f"Skipping {p}")
            continue
        print(f"Processing {p}...")
        with open(p, 'r', encoding='utf-8') as f:
            c = f.read()
        updated = update_content(c)
        with open(p, 'w', encoding='utf-8') as f:
            f.write(updated)
        print(f"  ✓ Updated {p}")

if __name__ == '__main__':
    main()
