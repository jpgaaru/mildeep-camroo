#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Update script to add unified Camaroo calendar pickers (.erp-date-wrapper / .erp-date-input)
across all Purchase screens, filters, and modals in scripts/generate_purchase_view.py.
"""
import re

def update():
    with open('scripts/generate_purchase_view.py', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update RMDashboard filter logic and markup
    old_rmdash = '''  renderRMDashboard(container) {
    let fSpecies = '';
    let fCenter = '';
    let fPlant = '';

    const getFilteredArrivals = () => {
      return arrivals.filter(a => {
        return (!fSpecies || a.species === fSpecies) &&
          (!fCenter || a.center === fCenter) &&
          (!fPlant || a.plant === fPlant);
      });
    };'''

    new_rmdash = '''  renderRMDashboard(container) {
    let fSpecies = '';
    let fCenter = '';
    let fPlant = '';
    let fFrom = '';
    let fTo = '';

    const getFilteredArrivals = () => {
      return arrivals.filter(a => {
        return (!fSpecies || a.species === fSpecies) &&
          (!fCenter || a.center === fCenter) &&
          (!fPlant || a.plant === fPlant) &&
          (!fFrom || a.date >= fFrom) &&
          (!fTo || a.date <= fTo);
      });
    };'''

    content = content.replace(old_rmdash, new_rmdash)

    old_rmdash_filter_html = '''        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Species</label>
              <select id="rmdash-species-sel" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#006C7A] outline-none">
                <option value="">All Species</option>
                ${M.species.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Center</label>
              <select id="rmdash-center-sel" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#006C7A] outline-none">
                <option value="">All Centers</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Plant</label>
              <select id="rmdash-plant-sel" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#006C7A] outline-none">
                <option value="">All Plants</option>
                ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div>
              <button id="rmdash-search-btn" class="w-full h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter Analytics</span>
              </button>
            </div>
          </div>
        </div>'''

    new_rmdash_filter_html = '''        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-6 gap-3.5 items-end text-xs">
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Species</label>
              <select id="rmdash-species-sel" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#006C7A] outline-none">
                <option value="">All Species</option>
                ${M.species.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Center</label>
              <select id="rmdash-center-sel" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#006C7A] outline-none">
                <option value="">All Centers</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Plant</label>
              <select id="rmdash-plant-sel" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#006C7A] outline-none">
                <option value="">All Plants</option>
                ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">From Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="rmdash-from-date" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">To Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="rmdash-to-date" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <button id="rmdash-search-btn" class="flex-1 h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter</span>
              </button>
              <button id="rmdash-reset-btn" class="px-2.5 h-9 rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] text-xs font-bold cursor-pointer" title="Reset Filters">
                ↺
              </button>
            </div>
          </div>
        </div>'''

    content = content.replace(old_rmdash_filter_html, new_rmdash_filter_html)

    old_rmdash_listeners = '''    document.getElementById('rmdash-search-btn')?.addEventListener('click', () => {
      fSpecies = document.getElementById('rmdash-species-sel')?.value || '';
      fCenter = document.getElementById('rmdash-center-sel')?.value || '';
      fPlant = document.getElementById('rmdash-plant-sel')?.value || '';
      updateView();
      Toast.show('RM Dashboard updated.', 'info');
    });'''

    new_rmdash_listeners = '''    document.getElementById('rmdash-search-btn')?.addEventListener('click', () => {
      fSpecies = document.getElementById('rmdash-species-sel')?.value || '';
      fCenter = document.getElementById('rmdash-center-sel')?.value || '';
      fPlant = document.getElementById('rmdash-plant-sel')?.value || '';
      fFrom = document.getElementById('rmdash-from-date')?.value || '';
      fTo = document.getElementById('rmdash-to-date')?.value || '';
      updateView();
      Toast.show('RM Dashboard updated.', 'info');
    });

    document.getElementById('rmdash-reset-btn')?.addEventListener('click', () => {
      if (document.getElementById('rmdash-species-sel')) document.getElementById('rmdash-species-sel').value = '';
      if (document.getElementById('rmdash-center-sel')) document.getElementById('rmdash-center-sel').value = '';
      if (document.getElementById('rmdash-plant-sel')) document.getElementById('rmdash-plant-sel').value = '';
      if (document.getElementById('rmdash-from-date')) document.getElementById('rmdash-from-date').value = '';
      if (document.getElementById('rmdash-to-date')) document.getElementById('rmdash-to-date').value = '';
      fSpecies = ''; fCenter = ''; fPlant = ''; fFrom = ''; fTo = '';
      updateView();
      Toast.show('Filters reset.', 'info');
    });'''

    content = content.replace(old_rmdash_listeners, new_rmdash_listeners)

    # 2. Update Bookings date input and reset button
    old_bk_date = '''            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Date</label>
              <input type="date" id="bk-f-date" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
            </div>
            <div>
              <button id="bk-search-btn" class="w-full h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search Records</span>
              </button>
            </div>'''

    new_bk_date = '''            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="bk-f-date" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <button id="bk-search-btn" class="flex-1 h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
              <button id="bk-reset-btn" class="px-2.5 h-9 rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] text-xs font-bold cursor-pointer" title="Reset Filters">
                ↺
              </button>
            </div>'''

    content = content.replace(old_bk_date, new_bk_date)

    old_bk_listeners = '''    document.getElementById('bk-search-btn')?.addEventListener('click', () => {
      fType = document.getElementById('bk-f-type')?.value || '';
      fPlant = document.getElementById('bk-f-plant')?.value || '';
      fDate = document.getElementById('bk-f-date')?.value || '';
      renderRows();
      Toast.show('Bookings filtered.', 'info');
    });'''

    new_bk_listeners = '''    document.getElementById('bk-search-btn')?.addEventListener('click', () => {
      fType = document.getElementById('bk-f-type')?.value || '';
      fPlant = document.getElementById('bk-f-plant')?.value || '';
      fDate = document.getElementById('bk-f-date')?.value || '';
      renderRows();
      Toast.show('Bookings filtered.', 'info');
    });

    document.getElementById('bk-f-date')?.addEventListener('change', () => {
      fDate = document.getElementById('bk-f-date')?.value || '';
      renderRows();
    });

    document.getElementById('bk-reset-btn')?.addEventListener('click', () => {
      if (document.getElementById('bk-f-type')) document.getElementById('bk-f-type').value = '';
      if (document.getElementById('bk-f-plant')) document.getElementById('bk-f-plant').value = '';
      if (document.getElementById('bk-f-date')) document.getElementById('bk-f-date').value = '';
      fType = ''; fPlant = ''; fDate = '';
      renderRows();
      Toast.show('Filters reset.', 'info');
    });'''

    content = content.replace(old_bk_listeners, new_bk_listeners)

    # 3. Update Create Booking date input
    old_cb_date = '''              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Booking Date <span class="text-[#FF5150]">*</span></label>
                <input id="cb-date" type="date" required value="${TODAY}" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
              </div>'''

    new_cb_date = '''              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Booking Date <span class="text-[#FF5150]">*</span></label>
                <div class="erp-date-wrapper">
                  <input id="cb-date" type="text" required value="${TODAY}" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
                </div>
              </div>'''

    content = content.replace(old_cb_date, new_cb_date)

    # 4. Update RM Arrival intake date input
    old_ra_date = '''            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Intake Date</label>
              <input type="date" id="ra-date" value="${TODAY}" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
            </div>'''

    new_ra_date = '''            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Intake Date</label>
              <div class="erp-date-wrapper">
                <input id="ra-date" type="text" value="${TODAY}" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
              </div>
            </div>'''

    content = content.replace(old_ra_date, new_ra_date)

    # 5. Update Arrivals filter header: add date input
    old_ar_filter = '''        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Center</label>
              <select id="ar-f-center" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">Select Center</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Supplier</label>
              <select id="ar-f-supplier" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">Select Supplier</option>
                ${M.suppliers.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Plant</label>
              <select id="ar-f-plant" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">Select Arrival Plant</option>
                ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div>
              <button id="ar-search-btn" class="w-full h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter Arrivals</span>
              </button>
            </div>
          </div>
        </div>'''

    new_ar_filter = '''        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-3.5 items-end text-xs">
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Center</label>
              <select id="ar-f-center" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">Select Center</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Supplier</label>
              <select id="ar-f-supplier" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">Select Supplier</option>
                ${M.suppliers.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Plant</label>
              <select id="ar-f-plant" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">Select Arrival Plant</option>
                ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="ar-f-date" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <button id="ar-search-btn" class="flex-1 h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter</span>
              </button>
              <button id="ar-reset-btn" class="px-2.5 h-9 rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] text-xs font-bold cursor-pointer" title="Reset Filters">
                ↺
              </button>
            </div>
          </div>
        </div>'''

    content = content.replace(old_ar_filter, new_ar_filter)

    old_ar_listeners = '''    document.getElementById('ar-search-btn')?.addEventListener('click', () => {
      fCenter = document.getElementById('ar-f-center')?.value || '';
      fSupplier = document.getElementById('ar-f-supplier')?.value || '';
      fPlant = document.getElementById('ar-f-plant')?.value || '';
      renderTable();
      Toast.show('Arrivals filtered.', 'info');
    });'''

    new_ar_listeners = '''    document.getElementById('ar-search-btn')?.addEventListener('click', () => {
      fCenter = document.getElementById('ar-f-center')?.value || '';
      fSupplier = document.getElementById('ar-f-supplier')?.value || '';
      fPlant = document.getElementById('ar-f-plant')?.value || '';
      fDate = document.getElementById('ar-f-date')?.value || '';
      renderTable();
      Toast.show('Arrivals filtered.', 'info');
    });

    document.getElementById('ar-f-date')?.addEventListener('change', () => {
      fDate = document.getElementById('ar-f-date')?.value || '';
      renderTable();
    });

    document.getElementById('ar-reset-btn')?.addEventListener('click', () => {
      if (document.getElementById('ar-f-center')) document.getElementById('ar-f-center').value = '';
      if (document.getElementById('ar-f-supplier')) document.getElementById('ar-f-supplier').value = '';
      if (document.getElementById('ar-f-plant')) document.getElementById('ar-f-plant').value = '';
      if (document.getElementById('ar-f-date')) document.getElementById('ar-f-date').value = '';
      fCenter = ''; fSupplier = ''; fPlant = ''; fDate = '';
      renderTable();
      Toast.show('Filters reset.', 'info');
    });'''

    content = content.replace(old_ar_listeners, new_ar_listeners)

    # 6. Update openCreateArrivalModal with Arrival Date & Bill Date
    old_modal_arr = '''            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Number <span class="text-[#FF5150]">*</span></label>
              <input id="ma-no" value="${arrivalNo}" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-bold text-[#006C7A]">
            </div>'''

    new_modal_arr = '''            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Number <span class="text-[#FF5150]">*</span></label>
              <input id="ma-no" value="${arrivalNo}" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-bold text-[#006C7A]">
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Date <span class="text-[#FF5150]">*</span></label>
              <div class="erp-date-wrapper">
                <input id="ma-date" type="text" value="${TODAY}" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none">
              </div>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Bill Date <span class="text-[#FF5150]">*</span></label>
              <div class="erp-date-wrapper">
                <input id="ma-billdate" type="text" value="${TODAY}" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none">
              </div>
            </div>'''

    content = content.replace(old_modal_arr, new_modal_arr)

    old_modal_save = '''      arrivals.unshift({
        id: Date.now(),
        no,
        date: TODAY,
        billDate: TODAY,'''

    new_modal_save = '''      const arrDate = document.getElementById('ma-date')?.value || TODAY;
      const billDate = document.getElementById('ma-billdate')?.value || TODAY;

      arrivals.unshift({
        id: Date.now(),
        no,
        date: arrDate,
        billDate: billDate,'''

    content = content.replace(old_modal_save, new_modal_save)

    # 7. Update Bills: add From Date, To Date
    old_bills_filter_vars = '''    let fType = '';
    let fPlant = '';
    let fSupplier = '';
    let fAgent = '';
    let fStatus = '';

    const getFiltered = () => {
      return arrivals.filter(a => {
        const s = billStatus(a);
        return (!fType || a.type === fType) &&
          (!fPlant || a.plant === fPlant) &&
          (!fSupplier || a.supplier === fSupplier) &&
          (!fAgent || a.agent === fAgent) &&
          (!fStatus || s === fStatus);
      });
    };'''

    new_bills_filter_vars = '''    let fType = '';
    let fPlant = '';
    let fSupplier = '';
    let fAgent = '';
    let fStatus = '';
    let fFrom = '';
    let fTo = '';

    const getFiltered = () => {
      return arrivals.filter(a => {
        const s = billStatus(a);
        return (!fType || a.type === fType) &&
          (!fPlant || a.plant === fPlant) &&
          (!fSupplier || a.supplier === fSupplier) &&
          (!fAgent || a.agent === fAgent) &&
          (!fStatus || s === fStatus) &&
          (!fFrom || a.date >= fFrom) &&
          (!fTo || a.date <= fTo);
      });
    };'''

    content = content.replace(old_bills_filter_vars, new_bills_filter_vars)

    old_bills_filter_html = '''        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-3.5 items-end text-xs">
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Purchase Type</label>
              <select id="bl-f-type" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.types.map(t => `<option value="${t}">${t}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Plant</label>
              <select id="bl-f-plant" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Supplier</label>
              <select id="bl-f-supplier" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.suppliers.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Bill Status</label>
              <select id="bl-f-status" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Partial">Partial</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <button id="bl-search-btn" class="w-full h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter Bills</span>
              </button>
            </div>
          </div>
        </div>'''

    new_bills_filter_html = '''        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-6 gap-3 items-end text-xs">
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Purchase Type</label>
              <select id="bl-f-type" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.types.map(t => `<option value="${t}">${t}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Plant</label>
              <select id="bl-f-plant" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Supplier</label>
              <select id="bl-f-supplier" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.suppliers.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">From Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="bl-f-from" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">To Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="bl-f-to" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <div class="flex-1">
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Status</label>
                <select id="bl-f-status" class="w-full h-9 px-2 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                  <option value="">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Partial">Partial</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <button id="bl-search-btn" class="h-9 px-3 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer" style="margin-top: 18px;" title="Filter Bills">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter</span>
              </button>
              <button id="bl-reset-btn" class="h-9 px-2.5 rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] text-xs font-bold cursor-pointer" style="margin-top: 18px;" title="Reset Filters">
                ↺
              </button>
            </div>
          </div>
        </div>'''

    content = content.replace(old_bills_filter_html, new_bills_filter_html)

    old_bills_listeners = '''    document.getElementById('bl-search-btn')?.addEventListener('click', () => {
      fType = document.getElementById('bl-f-type')?.value || '';
      fPlant = document.getElementById('bl-f-plant')?.value || '';
      fSupplier = document.getElementById('bl-f-supplier')?.value || '';
      fStatus = document.getElementById('bl-f-status')?.value || '';
      renderTable();
      Toast.show('Bills filtered.', 'info');
    });'''

    new_bills_listeners = '''    document.getElementById('bl-search-btn')?.addEventListener('click', () => {
      fType = document.getElementById('bl-f-type')?.value || '';
      fPlant = document.getElementById('bl-f-plant')?.value || '';
      fSupplier = document.getElementById('bl-f-supplier')?.value || '';
      fStatus = document.getElementById('bl-f-status')?.value || '';
      fFrom = document.getElementById('bl-f-from')?.value || '';
      fTo = document.getElementById('bl-f-to')?.value || '';
      renderTable();
      Toast.show('Bills filtered.', 'info');
    });

    document.getElementById('bl-reset-btn')?.addEventListener('click', () => {
      if (document.getElementById('bl-f-type')) document.getElementById('bl-f-type').value = '';
      if (document.getElementById('bl-f-plant')) document.getElementById('bl-f-plant').value = '';
      if (document.getElementById('bl-f-supplier')) document.getElementById('bl-f-supplier').value = '';
      if (document.getElementById('bl-f-status')) document.getElementById('bl-f-status').value = '';
      if (document.getElementById('bl-f-from')) document.getElementById('bl-f-from').value = '';
      if (document.getElementById('bl-f-to')) document.getElementById('bl-f-to').value = '';
      fType = ''; fPlant = ''; fSupplier = ''; fStatus = ''; fFrom = ''; fTo = '';
      renderTable();
      Toast.show('Filters reset.', 'info');
    });'''

    content = content.replace(old_bills_listeners, new_bills_listeners)

    # 8. Update Payments: add Date filter
    old_pay_filter_vars = '''    let fCenter = '';
    let fSupplier = '';
    let fAgent = '';
    let fType = '';

    const getFiltered = () => {
      return arrivals.filter(a => {
        return (!fCenter || a.center === fCenter) &&
          (!fSupplier || a.supplier === fSupplier) &&
          (!fAgent || a.agent === fAgent) &&
          (!fType || a.type === fType);
      });
    };'''

    new_pay_filter_vars = '''    let fCenter = '';
    let fSupplier = '';
    let fAgent = '';
    let fType = '';
    let fDate = '';

    const getFiltered = () => {
      return arrivals.filter(a => {
        return (!fCenter || a.center === fCenter) &&
          (!fSupplier || a.supplier === fSupplier) &&
          (!fAgent || a.agent === fAgent) &&
          (!fType || a.type === fType) &&
          (!fDate || a.date === fDate);
      });
    };'''

    content = content.replace(old_pay_filter_vars, new_pay_filter_vars)

    old_pay_filter_html = '''        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-3.5 items-end text-xs">
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Center</label>
              <select id="pay-f-center" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Supplier</label>
              <select id="pay-f-supplier" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.suppliers.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Agent</label>
              <select id="pay-f-agent" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.agents.map(a => `<option value="${a}">${a}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Payment Type</label>
              <select id="pay-f-type" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                <option value="Interim">Interim</option>
                <option value="Final">Final</option>
              </select>
            </div>
            <div>
              <button id="pay-search-btn" class="w-full h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search Records</span>
              </button>
            </div>
          </div>
        </div>'''

    new_pay_filter_html = '''        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-6 gap-3 items-end text-xs">
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Center</label>
              <select id="pay-f-center" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Supplier</label>
              <select id="pay-f-supplier" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.suppliers.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Agent</label>
              <select id="pay-f-agent" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.agents.map(a => `<option value="${a}">${a}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Payment Type</label>
              <select id="pay-f-type" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                <option value="Interim">Interim</option>
                <option value="Final">Final</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="pay-f-date" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <button id="pay-search-btn" class="flex-1 h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
              <button id="pay-reset-btn" class="px-2.5 h-9 rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] text-xs font-bold cursor-pointer" title="Reset Filters">
                ↺
              </button>
            </div>
          </div>
        </div>'''

    content = content.replace(old_pay_filter_html, new_pay_filter_html)

    old_pay_listeners = '''    document.getElementById('pay-search-btn')?.addEventListener('click', () => {
      fCenter = document.getElementById('pay-f-center')?.value || '';
      fSupplier = document.getElementById('pay-f-supplier')?.value || '';
      fAgent = document.getElementById('pay-f-agent')?.value || '';
      fType = document.getElementById('pay-f-type')?.value || '';
      renderRows();
      Toast.show('Payment records filtered.', 'info');
    });'''

    new_pay_listeners = '''    document.getElementById('pay-search-btn')?.addEventListener('click', () => {
      fCenter = document.getElementById('pay-f-center')?.value || '';
      fSupplier = document.getElementById('pay-f-supplier')?.value || '';
      fAgent = document.getElementById('pay-f-agent')?.value || '';
      fType = document.getElementById('pay-f-type')?.value || '';
      fDate = document.getElementById('pay-f-date')?.value || '';
      renderRows();
      Toast.show('Payment records filtered.', 'info');
    });

    document.getElementById('pay-f-date')?.addEventListener('change', () => {
      fDate = document.getElementById('pay-f-date')?.value || '';
      renderRows();
    });

    document.getElementById('pay-reset-btn')?.addEventListener('click', () => {
      if (document.getElementById('pay-f-center')) document.getElementById('pay-f-center').value = '';
      if (document.getElementById('pay-f-supplier')) document.getElementById('pay-f-supplier').value = '';
      if (document.getElementById('pay-f-agent')) document.getElementById('pay-f-agent').value = '';
      if (document.getElementById('pay-f-type')) document.getElementById('pay-f-type').value = '';
      if (document.getElementById('pay-f-date')) document.getElementById('pay-f-date').value = '';
      fCenter = ''; fSupplier = ''; fAgent = ''; fType = ''; fDate = '';
      renderRows();
      Toast.show('Filters reset.', 'info');
    });'''

    content = content.replace(old_pay_listeners, new_pay_listeners)

    # 9. Update Payment Summary: add From Date, To Date
    old_ps_filter_vars = '''    let fCenter = '';
    let fSupplier = '';
    let fAgent = '';
    let fMode = '';

    const getFiltered = () => {
      return payments.filter(p => {
        return (!fCenter || p.center === fCenter) &&
          (!fSupplier || p.supplier === fSupplier) &&
          (!fAgent || p.agent === fAgent) &&
          (!fMode || p.mode === fMode);
      });
    };'''

    new_ps_filter_vars = '''    let fCenter = '';
    let fSupplier = '';
    let fAgent = '';
    let fMode = '';
    let fFrom = '';
    let fTo = '';

    const getFiltered = () => {
      return payments.filter(p => {
        return (!fCenter || p.center === fCenter) &&
          (!fSupplier || p.supplier === fSupplier) &&
          (!fAgent || p.agent === fAgent) &&
          (!fMode || p.mode === fMode) &&
          (!fFrom || p.date >= fFrom) &&
          (!fTo || p.date <= fTo);
      });
    };'''

    content = content.replace(old_ps_filter_vars, new_ps_filter_vars)

    old_ps_filter_html = '''        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-3.5 items-end text-xs">
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Center</label>
              <select id="ps-f-center" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Supplier</label>
              <select id="ps-f-supplier" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.suppliers.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Agent</label>
              <select id="ps-f-agent" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.agents.map(a => `<option value="${a}">${a}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Payment Mode</label>
              <select id="ps-f-mode" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="NEFT">NEFT</option>
              </select>
            </div>
            <div>
              <button id="ps-search-btn" class="w-full h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter Summary</span>
              </button>
            </div>
          </div>
        </div>'''

    new_ps_filter_html = '''        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-6 gap-3 items-end text-xs">
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Center</label>
              <select id="ps-f-center" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Supplier</label>
              <select id="ps-f-supplier" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.suppliers.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Payment Mode</label>
              <select id="ps-f-mode" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="NEFT">NEFT</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">From Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="ps-f-from" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">To Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="ps-f-to" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <button id="ps-search-btn" class="flex-1 h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter</span>
              </button>
              <button id="ps-reset-btn" class="px-2.5 h-9 rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] text-xs font-bold cursor-pointer" title="Reset Filters">
                ↺
              </button>
            </div>
          </div>
        </div>'''

    content = content.replace(old_ps_filter_html, new_ps_filter_html)

    old_ps_listeners = '''    document.getElementById('ps-search-btn')?.addEventListener('click', () => {
      fCenter = document.getElementById('ps-f-center')?.value || '';
      fSupplier = document.getElementById('ps-f-supplier')?.value || '';
      fAgent = document.getElementById('ps-f-agent')?.value || '';
      fMode = document.getElementById('ps-f-mode')?.value || '';
      renderTable();
      Toast.show('Payment summary filtered.', 'info');
    });'''

    new_ps_listeners = '''    document.getElementById('ps-search-btn')?.addEventListener('click', () => {
      fCenter = document.getElementById('ps-f-center')?.value || '';
      fSupplier = document.getElementById('ps-f-supplier')?.value || '';
      fMode = document.getElementById('ps-f-mode')?.value || '';
      fFrom = document.getElementById('ps-f-from')?.value || '';
      fTo = document.getElementById('ps-f-to')?.value || '';
      renderTable();
      Toast.show('Payment summary filtered.', 'info');
    });

    document.getElementById('ps-reset-btn')?.addEventListener('click', () => {
      if (document.getElementById('ps-f-center')) document.getElementById('ps-f-center').value = '';
      if (document.getElementById('ps-f-supplier')) document.getElementById('ps-f-supplier').value = '';
      if (document.getElementById('ps-f-mode')) document.getElementById('ps-f-mode').value = '';
      if (document.getElementById('ps-f-from')) document.getElementById('ps-f-from').value = '';
      if (document.getElementById('ps-f-to')) document.getElementById('ps-f-to').value = '';
      fCenter = ''; fSupplier = ''; fMode = ''; fFrom = ''; fTo = '';
      renderTable();
      Toast.show('Filters reset.', 'info');
    });'''

    content = content.replace(old_ps_listeners, new_ps_listeners)

    with open('scripts/generate_purchase_view.py', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Successfully updated scripts/generate_purchase_view.py with unified date inputs.")

if __name__ == '__main__':
    update()
