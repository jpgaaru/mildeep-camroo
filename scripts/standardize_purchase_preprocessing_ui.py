#!/usr/bin/env python3
"""
scripts/standardize_purchase_preprocessing_ui.py

Standardizes button typography, layout, and colors across Purchase and Pre-processing
to match the Base Design System and the Sales sub-menu standard:
1. Sub-menu Tab Bar:
   - #00A4B7 active highlight, #64748B inactive text, #CBD5E1 hover border
   - Matches js/components/tabBar.js with standalone.html and miledeep-devi-fisheries.html
2. Search & Filter Cards:
   - Removes empty circular/square outline buttons from top-right corner
   - Primary Search button: #006C7A hover #005662 text-white font-bold rounded-lg shadow-xs
   - Reset button: white bg, #CBD5E1 border, #475569 text, #F1F5F9 hover, rounded-lg
3. Action & Modal & Form Buttons:
   - Primary actions: #006C7A hover #005662 text-white font-bold rounded-lg shadow-xs
   - Export/Download actions: white bg, #CBD5E1 border, #006C7A text, #F0FAFC hover, font-bold rounded-lg
   - Form Cancel/Back actions: white bg, #CBD5E1 border, #475569 text, #F1F5F9 hover, font-semibold rounded-lg
4. Table Row Action Buttons:
   - View: text-[#0284C7] hover:bg-[#F0F9FF]
   - Edit: text-[#006644] hover:bg-[#E3FCEF]
   - Download: text-[#0284C7] hover:bg-[#F0F9FF]
   - Delete: text-[#FF5150] hover:bg-[#FEF2F2]
"""

import re
import os

def update_tab_bar_js():
    file_path = 'js/components/tabBar.js'
    print(f"Updating {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace the else branch of TabBar.render in tabBar.js
    old_block_pattern = r'(\s*const isS01 = Environment\.isSitemap01\(\);\s*const activeTabObj = submenu\.tabs\.find\(t => t\.id === currentTabId\);[\s\S]*?this\.bindKeyboardNav\(containerId\);)'
    
    new_tab_render = """
      // Clean full-width underline tabs for full page section switching across all submenus (matching Sales sub-menu standard)
      container.innerHTML = `
        <nav aria-label="${submenu.title} tabs navigation" class="mb-4">
          <div 
            role="tablist" 
            aria-label="${submenu.title} views" 
            id="${containerId}-tablist"
            class="flex items-center gap-6 border-b border-[#E2E8F0] pt-1 pb-0 select-none overflow-x-auto"
          >
            ${submenu.tabs.map(tab => {
              const isActive = tab.id === currentTabId;
              return `
                <a 
                  id="tab-${tab.id}"
                  role="tab"
                  href="${tab.hash}" 
                  aria-selected="${isActive ? 'true' : 'false'}"
                  tabindex="${isActive ? '0' : '-1'}"
                  aria-controls="panel-${tab.id}"
                  class="select-none px-1 py-2 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 border-b-2 -mb-[1px] outline-none ${
                    isActive 
                      ? 'tab-active border-[#00A4B7] text-[#00A4B7] font-bold bg-transparent' 
                      : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] bg-transparent'
                  }"
                >
                  <span class="select-none">${tab.label}</span>
                </a>
              `;
            }).join('')}
          </div>
        </nav>
      `;
    }

    this.bindKeyboardNav(containerId);"""

    # Check if old block matches
    if 'const isS01 = Environment.isSitemap01();' in content:
        content = re.sub(
            r'const isS01 = Environment\.isSitemap01\(\);[\s\S]*?this\.bindKeyboardNav\(containerId\);',
            new_tab_render.strip(),
            content,
            count=1
        )
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("  ✓ Updated js/components/tabBar.js")
    else:
        print("  - TabBar already standardized")

def update_purchase_view_content(content):
    # 1. In renderRMDashboard: Remove empty circle buttons from header
    content = re.sub(
        r'<div class="flex items-center gap-1\.5">\s*<button id="rmdash-reset-btn"[\s\S]*?<\/button>\s*<button id="rmdash-accordion-btn"[\s\S]*?<\/button>\s*<\/div>',
        '',
        content
    )
    # And standardize search and reset button inside rmdash filter
    content = content.replace(
        '<button id="rmdash-search-btn" class="h-10 px-6 rounded-xl bg-[#00A8B5] hover:bg-[#008f9a] active:scale-[0.99] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mb-0.5">',
        '<button id="rmdash-search-btn" class="px-5 py-2 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs hover:shadow flex items-center justify-center gap-1.5 cursor-pointer">'
    )
    content = content.replace(
        '<button id="rmdash-reset-btn" class="px-2.5 h-9 rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] text-xs font-bold cursor-pointer" title="Reset Filters">',
        '<button id="rmdash-reset-btn" class="px-4 py-2 rounded-lg border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F1F5F9] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer" title="Reset Filters">'
    )

    # 2. In renderBookings: Filter search, reset, open create booking
    content = content.replace(
        '<button id="bk-search-btn" class="flex-1 h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">',
        '<button id="bk-search-btn" class="flex-1 px-4 py-2 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs hover:shadow flex items-center justify-center gap-1.5 cursor-pointer">'
    )
    content = content.replace(
        '<button id="bk-reset-btn" class="px-2.5 h-9 rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] text-xs font-bold cursor-pointer" title="Reset Filters">',
        '<button id="bk-reset-btn" class="px-3.5 py-2 rounded-lg border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F1F5F9] text-xs font-semibold cursor-pointer transition-colors" title="Reset Filters">'
    )
    content = content.replace(
        '<button id="btn-open-create-booking" class="px-4 py-2 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">',
        '<button id="btn-open-create-booking" class="px-4 py-2 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer">'
    )

    # 3. In renderCreateBooking: New Supplier button (replace indigo with #006C7A)
    content = content.replace(
        '<button type="button" id="btn-new-supplier" class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#6366F1] text-white cursor-pointer">New Supplier</button>',
        '<button type="button" id="btn-new-supplier" class="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#006C7A] hover:bg-[#005662] text-white shadow-xs cursor-pointer transition-all">New Supplier</button>'
    )
    content = content.replace(
        '<button id="btn-back-to-bookings" class="px-3.5 py-1.5 rounded-lg border border-[#CBD5E1] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC] cursor-pointer">',
        '<button id="btn-back-to-bookings" class="px-3.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-white text-xs font-semibold text-[#475569] hover:bg-[#F1F5F9] cursor-pointer transition-colors">'
    )

    # 4. In renderArrivals: Filter search, reset, open create arrival, download excel
    content = content.replace(
        '<button id="ar-search-btn" class="flex-1 h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">',
        '<button id="ar-search-btn" class="flex-1 px-4 py-2 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs hover:shadow flex items-center justify-center gap-1.5 cursor-pointer">'
    )
    content = content.replace(
        '<button id="ar-reset-btn" class="px-2.5 h-9 rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] text-xs font-bold cursor-pointer" title="Reset Filters">',
        '<button id="ar-reset-btn" class="px-3.5 py-2 rounded-lg border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F1F5F9] text-xs font-semibold cursor-pointer transition-colors" title="Reset Filters">'
    )
    content = content.replace(
        '<button id="btn-create-arrival-open" class="px-4 py-2 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">',
        '<button id="btn-create-arrival-open" class="px-4 py-2 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer">'
    )
    content = content.replace(
        '<button onclick="window.Toast.show(\'Exporting Arrivals to Excel...\', \'info\')" class="px-3.5 py-2 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC]">',
        '<button onclick="window.Toast.show(\'Exporting Arrivals to Excel...\', \'info\')" class="px-3.5 py-2 rounded-lg border border-[#CBD5E1] bg-white text-xs font-bold text-[#006C7A] hover:bg-[#F0FAFC] flex items-center gap-1.5 transition-colors cursor-pointer">'
    )

    # 5. In renderLotTable: Excel & PDF buttons
    content = content.replace(
        '<button onclick="window.Toast.show(\'Downloading Excel...\', \'info\')" class="px-3.5 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC]">',
        '<button onclick="window.Toast.show(\'Downloading Excel...\', \'info\')" class="px-3.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-white text-xs font-bold text-[#006C7A] hover:bg-[#F0FAFC] flex items-center gap-1 transition-colors cursor-pointer">'
    )
    content = content.replace(
        '<button onclick="window.Toast.show(\'Downloading PDF...\', \'info\')" class="px-3.5 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC]">',
        '<button onclick="window.Toast.show(\'Downloading PDF...\', \'info\')" class="px-3.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-white text-xs font-bold text-[#006C7A] hover:bg-[#F0FAFC] flex items-center gap-1 transition-colors cursor-pointer">'
    )
    content = content.replace(
        '<button id="btn-lt-copy" class="px-3.5 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-bold text-[#006C7A] hover:bg-[#F0FAFC] flex items-center gap-1 cursor-pointer">',
        '<button id="btn-lt-copy" class="px-3.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-white text-xs font-bold text-[#006C7A] hover:bg-[#F0FAFC] flex items-center gap-1 cursor-pointer transition-colors">'
    )

    # 6. In renderBills: Filter search & reset & PDF buttons
    content = content.replace(
        '<button id="bl-search-btn" class="h-9 px-3 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer" style="margin-top: 18px;" title="Filter Bills">',
        '<button id="bl-search-btn" class="h-9 px-4 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs hover:shadow flex items-center justify-center gap-1 cursor-pointer" style="margin-top: 18px;" title="Filter Bills">'
    )
    content = content.replace(
        '<button id="bl-reset-btn" class="h-9 px-2.5 rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] text-xs font-bold cursor-pointer" style="margin-top: 18px;" title="Reset Filters">',
        '<button id="bl-reset-btn" class="h-9 px-3.5 rounded-lg border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F1F5F9] text-xs font-semibold cursor-pointer transition-colors" style="margin-top: 18px;" title="Reset Filters">'
    )
    content = content.replace(
        '<button onclick="window.Toast.show(\'Downloading Commission Bills PDF...\', \'success\')" class="px-3 py-1.5 rounded-lg bg-[#006C7A] text-white text-xs font-bold shadow-xs">',
        '<button onclick="window.Toast.show(\'Downloading Commission Bills PDF...\', \'success\')" class="px-3.5 py-1.5 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold shadow-xs hover:shadow cursor-pointer transition-all">'
    )
    content = content.replace(
        '<button onclick="window.Toast.show(\'Downloading Consolidated Bills PDF...\', \'success\')" class="px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC]">',
        '<button onclick="window.Toast.show(\'Downloading Consolidated Bills PDF...\', \'success\')" class="px-3.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-white text-xs font-bold text-[#006C7A] hover:bg-[#F0FAFC] flex items-center gap-1.5 transition-colors cursor-pointer">'
    )
    content = content.replace(
        '<button id="btn-back-to-bills" class="px-3.5 py-1.5 rounded-lg border border-[#CBD5E1] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC] cursor-pointer">',
        '<button id="btn-back-to-bills" class="px-3.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-white text-xs font-semibold text-[#475569] hover:bg-[#F1F5F9] cursor-pointer transition-colors">'
    )

    # 7. In renderPayments & PaymentSummary
    content = content.replace(
        '<button id="pay-search-btn" class="flex-1 h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">',
        '<button id="pay-search-btn" class="flex-1 px-4 py-2 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs hover:shadow flex items-center justify-center gap-1.5 cursor-pointer">'
    )
    content = content.replace(
        '<button id="pay-reset-btn" class="px-2.5 h-9 rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] text-xs font-bold cursor-pointer" title="Reset Filters">',
        '<button id="pay-reset-btn" class="px-3.5 py-2 rounded-lg border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F1F5F9] text-xs font-semibold cursor-pointer transition-colors" title="Reset Filters">'
    )
    content = content.replace(
        '<button id="ps-search-btn" class="flex-1 h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">',
        '<button id="ps-search-btn" class="flex-1 px-4 py-2 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs hover:shadow flex items-center justify-center gap-1.5 cursor-pointer">'
    )
    content = content.replace(
        '<button id="ps-reset-btn" class="px-2.5 h-9 rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] text-xs font-bold cursor-pointer" title="Reset Filters">',
        '<button id="ps-reset-btn" class="px-3.5 py-2 rounded-lg border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F1F5F9] text-xs font-semibold cursor-pointer transition-colors" title="Reset Filters">'
    )
    content = content.replace(
        '<button onclick="window.Toast.show(\'Exporting Payment Summary...\', \'info\')" class="px-3.5 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC]">',
        '<button onclick="window.Toast.show(\'Exporting Payment Summary...\', \'info\')" class="px-3.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-white text-xs font-bold text-[#006C7A] hover:bg-[#F0FAFC] flex items-center gap-1.5 transition-colors cursor-pointer">'
    )

    # 8. Standardize table action buttons (eye, edit, delete)
    content = content.replace(
        'class="p-1 rounded text-[#006C7A] hover:bg-[#F0FAFC]" title="View"',
        'class="p-1 rounded text-[#0284C7] hover:bg-[#F0F9FF]" title="View"'
    )
    content = content.replace(
        'class="p-1 rounded text-[#006C7A] hover:bg-[#F0FAFC]" title="Edit RM Bill"',
        'class="p-1 rounded text-[#006644] hover:bg-[#E3FCEF]" title="Edit RM Bill"'
    )
    content = content.replace(
        'class="p-1 rounded text-[#006C7A] hover:bg-[#E0F2FE]" title="View & Edit RM Bill"',
        'class="p-1 rounded text-[#006644] hover:bg-[#E3FCEF]" title="View & Edit RM Bill"'
    )

    return content

def update_preprocessing_view_content(content):
    # 1. Standardize renderFilterCard: remove outline buttons in top-right, clean search and reset buttons
    old_filter_card_pattern = r'  renderFilterCard\(opts\) \{[\s\S]*?  bindFilter\(idPrefix'
    new_filter_card = """  renderFilterCard(opts) {
    const { idPrefix, title = 'Search & Filters', fields = [], searchBtnText = 'Search' } = opts;
    return `
      <div class="dt-top-filter-card bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs mb-3 transition-all duration-200" style="margin-bottom: 12px !important;">
        <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#F1F5F9]">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#0F172A] uppercase tracking-wider">${title}</h3>
          </div>
        </div>

        <div id="${idPrefix}-filter-body" class="dt-top-filter-body grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-xs items-end">
          ${fields.map(f => `
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">${f.label}</label>
              ${f.html}
            </div>
          `).join('')}

          <div class="flex items-center gap-2 pt-2">
            <button type="button" id="${idPrefix}-search-btn" class="px-5 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <span>${searchBtnText}</span>
            </button>
            <button type="button" id="${idPrefix}-reset-btn" class="px-4 py-2 bg-white border border-[#CBD5E1] text-[#475569] hover:bg-[#F1F5F9] text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer" title="Reset all filters">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  bindFilter(idPrefix"""

    content = re.sub(old_filter_card_pattern, new_filter_card, content, count=1)

    # 2. Standardize all primary buttons across Preprocessing screens:
    # Modal trigger buttons:
    content = content.replace(
        '`<button class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer" onclick="window.PreprocessingView.openChemPOModal()">',
        '`<button class="px-4 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.openChemPOModal()">'
    )
    content = content.replace(
        '`<button id="btn-add-chem-po" class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer" onclick="window.PreprocessingView.openChemPOModal()">',
        '`<button id="btn-add-chem-po" class="px-4 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.openChemPOModal()">'
    )
    content = content.replace(
        '`<button class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer" onclick="window.PreprocessingView.openChemOrderModal()">',
        '`<button class="px-4 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.openChemOrderModal()">'
    )
    content = content.replace(
        '`<button class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer" onclick="window.PreprocessingView.openChemConsumptionModal()">',
        '`<button class="px-4 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.openChemConsumptionModal()">'
    )
    content = content.replace(
        '`<button class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer" onclick="window.PreprocessingView.openChemPaymentModal()">',
        '`<button class="px-4 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.openChemPaymentModal()">'
    )
    content = content.replace(
        '`<button class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer" onclick="window.PreprocessingView.toastInfo(\'Create Inward batch modal\')">',
        '`<button class="px-4 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.toastInfo(\'Create Inward batch modal\')">'
    )
    content = content.replace(
        '`<button class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer" onclick="window.PreprocessingView.toastInfo(\'Log Value Addition Run\')">',
        '`<button class="px-4 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.toastInfo(\'Log Value Addition Run\')">'
    )
    content = content.replace(
        '`<button class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer" onclick="window.PreprocessingView.toastInfo(\'Create Transfer Manifest\')">',
        '`<button class="px-4 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.toastInfo(\'Create Transfer Manifest\')">'
    )

    # Form submit buttons:
    content = content.replace(
        '<button type="submit" class="btn-primary w-full py-1.5 rounded text-xs font-semibold shadow-xs hover:shadow cursor-pointer h-[31px]">',
        '<button type="submit" class="w-full py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow cursor-pointer transition-all">'
    )

    # File upload and template download buttons:
    content = content.replace(
        '<button class="btn-primary px-4 py-2 rounded text-xs font-semibold shadow-xs cursor-pointer" onclick="window.PreprocessingView.toastSuccess(\'Upload triggered\')">Browse Files</button>',
        '<button class="px-4 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.toastSuccess(\'Upload triggered\')">Browse Files</button>'
    )
    content = content.replace(
        '<button class="btn-secondary px-4 py-2 rounded text-xs font-semibold border border-[#DFE1E6] bg-white text-[#172B4D] hover:bg-[#FAFBFC] cursor-pointer" onclick="window.PreprocessingView.toastInfo(\'Downloading CSV template\')">Download Template</button>',
        '<button class="px-4 py-2 bg-white border border-[#CBD5E1] text-[#006C7A] hover:bg-[#F0FAFC] text-xs font-bold rounded-lg shadow-xs cursor-pointer transition-colors" onclick="window.PreprocessingView.toastInfo(\'Downloading CSV template\')">Download Template</button>'
    )

    return content

def main():
    print("=========================================================")
    print("STANDARDIZING PURCHASE & PREPROCESSING BUTTONS & TABS")
    print("=========================================================")

    # 1. Update tabBar.js
    update_tab_bar_js()

    # 2. Update js/views/purchaseView.js
    p_file = 'js/views/purchaseView.js'
    print(f"Updating {p_file}...")
    with open(p_file, 'r', encoding='utf-8') as f:
        p_content = f.read()
    p_updated = update_purchase_view_content(p_content)
    with open(p_file, 'w', encoding='utf-8') as f:
        f.write(p_updated)
    print(f"  ✓ Saved {p_file}")

    # 3. Update js/views/preprocessingView.js
    pp_file = 'js/views/preprocessingView.js'
    print(f"Updating {pp_file}...")
    with open(pp_file, 'r', encoding='utf-8') as f:
        pp_content = f.read()
    pp_updated = update_preprocessing_view_content(pp_content)
    with open(pp_file, 'w', encoding='utf-8') as f:
        f.write(pp_updated)
    print(f"  ✓ Saved {pp_file}")

    # 4. Update scripts/preprocessing_view_code.py
    pp_code_file = 'scripts/preprocessing_view_code.py'
    if os.path.exists(pp_code_file):
        print(f"Updating {pp_code_file}...")
        with open(pp_code_file, 'r', encoding='utf-8') as f:
            ppc_content = f.read()
        ppc_updated = update_preprocessing_view_content(ppc_content)
        with open(pp_code_file, 'w', encoding='utf-8') as f:
            f.write(ppc_updated)
        print(f"  ✓ Saved {pp_code_file}")

    # 5. Update standalone.html
    s_file = 'standalone.html'
    print(f"Updating {s_file}...")
    with open(s_file, 'r', encoding='utf-8') as f:
        s_content = f.read()
    s_updated = update_purchase_view_content(s_content)
    s_updated = update_preprocessing_view_content(s_updated)
    with open(s_file, 'w', encoding='utf-8') as f:
        f.write(s_updated)
    print(f"  ✓ Saved {s_file}")

    # 6. Update miledeep-devi-fisheries.html
    m_file = 'miledeep-devi-fisheries.html'
    print(f"Updating {m_file}...")
    with open(m_file, 'r', encoding='utf-8') as f:
        m_content = f.read()
    m_updated = update_purchase_view_content(m_content)
    m_updated = update_preprocessing_view_content(m_updated)
    with open(m_file, 'w', encoding='utf-8') as f:
        f.write(m_updated)
    print(f"  ✓ Saved {m_file}")

    print("\n✓ All files successfully updated and standardized!")

if __name__ == '__main__':
    main()
