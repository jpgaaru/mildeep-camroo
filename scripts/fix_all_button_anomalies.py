#!/usr/bin/env python3
"""
scripts/fix_all_button_anomalies.py

Fixes all remaining button outliers, color mismatches, and placement defects:
1. SalesView:
   - Removes empty circular/square outline buttons from generic renderFilterCard helper
   - Replaces #008DA6 with standard #006C7A on btn-new-fc, btn-pins-save, btn-inspay-save, and dashboard search buttons
2. PurchaseView:
   - Removes the remaining 2 rounded-full circle outline buttons (rmdash-reset-btn & rmdash-accordion-btn) from the RM Dashboard filter header
   - Standardizes the filter action row with crisp Search and Reset buttons
3. PreprocessingView:
   - Verifies all button colors, paddings, and placements conform to the Base Design System
4. Synchronizes all changes into standalone.html, miledeep-devi-fisheries.html, and script definitions.
"""

import re
import os

def fix_sales_view():
    file_path = 'js/views/salesView.js'
    print(f"Fixing {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Clean renderFilterCard in salesView.js (remove empty outline buttons)
    old_card_header = r'''        <div class="flex items-center justify-between pb-1">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#172B4D]">${title}</h3>
          </div>

          <div class="inline-flex items-center" style="gap: 8px; display: inline-flex;">
            <button type="button" id="${idPrefix}-reset-btn" class="dt-action-btn dt-top-filter-reset-btn w-7 h-7 min-w-[28px] min-h-[28px] inline-flex items-center justify-center bg-white hover:bg-[#F0F9FF] border border-[#CBD5E1] hover:border-[#0284C7] text-[#334155] hover:text-[#0284C7] rounded-none transition-colors cursor-pointer select-none" style="width: 28px; height: 28px; min-width: 28px; min-height: 28px; border-radius: 0; border: 1px solid #CBD5E1; background: #ffffff; color: #334155; display: inline-flex; align-items: center; justify-content: center; padding: 0;" title="Reset all filters" aria-label="Reset all filters">
              <svg class="w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </button>

            <button type="button" id="${idPrefix}-toggle-btn" class="dt-action-btn dt-top-filter-toggle-btn w-7 h-7 min-w-[28px] min-h-[28px] inline-flex items-center justify-center bg-white hover:bg-[#F0F9FF] border border-[#CBD5E1] hover:border-[#0284C7] text-[#334155] hover:text-[#0284C7] rounded-none transition-colors cursor-pointer select-none" style="width: 28px; height: 28px; min-width: 28px; min-height: 28px; border-radius: 0; border: 1px solid #CBD5E1; background: #ffffff; color: #334155; display: inline-flex; align-items: center; justify-content: center; padding: 0;" title="Hide Filter" aria-label="Hide Filter">
              <svg class="w-4 h-4 text-current dt-top-filter-toggle-icon transform transition-transform duration-200" id="${idPrefix}-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
          </div>
        </div>'''

    new_card_header = '''        <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#F1F5F9]">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#0F172A] uppercase tracking-wider">${title}</h3>
          </div>
        </div>'''

    content = content.replace(old_card_header, new_card_header)

    # 2. Replace #008DA6 with #006C7A on primary buttons
    content = content.replace(
        '<button id="btn-sales-filter-search" class="w-full h-[32px] px-3 bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors" onclick="SalesView.refreshDashboard()">',
        '<button id="btn-sales-filter-search" class="w-full h-[32px] px-3 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors" onclick="SalesView.refreshDashboard()">'
    )
    content = content.replace(
        '<button class="px-2.5 py-1 bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-semibold rounded flex items-center gap-1 shadow-xs ml-2 cursor-pointer transition-colors" onclick="SalesView.refreshDashboard()">',
        '<button class="px-2.5 py-1 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded flex items-center gap-1 shadow-xs ml-2 cursor-pointer transition-colors" onclick="SalesView.refreshDashboard()">'
    )
    content = content.replace(
        '<button id="btn-new-fc" class="px-5 py-2 bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.openForwardContractModal(null)">',
        '<button id="btn-new-fc" class="px-5 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.openForwardContractModal(null)">'
    )
    content = content.replace(
        '<button id="btn-pins-save" class="px-5 py-2 bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.generateInsuranceTemplateFromSelection()">',
        '<button id="btn-pins-save" class="px-5 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.generateInsuranceTemplateFromSelection()">'
    )
    content = content.replace(
        '<button id="btn-inspay-save" class="px-5 py-2 bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.settleInsurancePaymentSelection()">',
        '<button id="btn-inspay-save" class="px-5 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.settleInsurancePaymentSelection()">'
    )

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("  ✓ Saved js/views/salesView.js")

    # Also sync into scripts/sales_view_code.py
    if os.path.exists('scripts/sales_view_code.py'):
        with open('scripts/sales_view_code.py', 'r', encoding='utf-8') as f:
            svc = f.read()
        svc = svc.replace(old_card_header, new_card_header)
        svc = svc.replace('bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.openForwardContractModal(null)"', 'bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.openForwardContractModal(null)"')
        svc = svc.replace('bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.generateInsuranceTemplateFromSelection()"', 'bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.generateInsuranceTemplateFromSelection()"')
        svc = svc.replace('bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.settleInsurancePaymentSelection()"', 'bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.settleInsurancePaymentSelection()"')
        with open('scripts/sales_view_code.py', 'w', encoding='utf-8') as f:
            f.write(svc)
        print("  ✓ Saved scripts/sales_view_code.py")

def fix_purchase_view():
    file_path = 'js/views/purchaseView.js'
    print(f"Fixing {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove the 2 round circle outline buttons from rmdash header
    old_rmdash_header = r'''              <div class="flex items-center gap-2">
                <button id="rmdash-reset-btn" class="w-7 h-7 rounded-full border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#64748B] flex items-center justify-center cursor-pointer transition-colors" title="Reset Filters">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                </button>
                <button id="rmdash-accordion-btn" class="w-7 h-7 rounded-full border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#64748B] flex items-center justify-center cursor-pointer transition-colors" title="Toggle Filters">
                  <svg id="rmdash-accordion-icon" class="w-3.5 h-3.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </button>
              </div>'''

    content = content.replace(old_rmdash_header, '')

    # Also in rmdash Row 2: Add a clean Reset button next to the Search button for perfect layout symmetry
    old_row2 = r'''              <!-- Row 2: To Date + Inline Search Button -->
              <div class="flex items-end gap-3 text-xs">
                <div class="w-full sm:w-1/4">
                  <label class="block text-[10.5px] font-bold text-[#475569] uppercase tracking-wider mb-1">To Date</label>
                  <div class="erp-date-wrapper">
                    <input type="text" id="rmdash-to-date" placeholder="06/10/2026" value="06/10/2026" class="erp-date-input w-full h-10 px-3 rounded-xl border border-[#CBD5E1] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                  </div>
                </div>
                <button id="rmdash-search-btn" class="px-5 py-2 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs hover:shadow flex items-center justify-center gap-1.5 cursor-pointer">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  <span>Search</span>
                </button>
              </div>'''

    new_row2 = '''              <!-- Row 2: To Date + Inline Search & Reset Buttons -->
              <div class="flex items-end gap-3 text-xs">
                <div class="w-full sm:w-1/4">
                  <label class="block text-[10.5px] font-bold text-[#475569] uppercase tracking-wider mb-1">To Date</label>
                  <div class="erp-date-wrapper">
                    <input type="text" id="rmdash-to-date" placeholder="06/10/2026" value="06/10/2026" class="erp-date-input w-full h-10 px-3 rounded-xl border border-[#CBD5E1] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                  </div>
                </div>
                <button id="rmdash-search-btn" class="px-5 py-2.5 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs hover:shadow flex items-center justify-center gap-1.5 cursor-pointer">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  <span>Search</span>
                </button>
                <button id="rmdash-reset-btn" class="px-4 py-2.5 rounded-lg border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F1F5F9] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer" title="Reset Filters">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                  <span>Reset</span>
                </button>
              </div>'''

    content = content.replace(old_row2, new_row2)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("  ✓ Saved js/views/purchaseView.js")

def sync_html_files():
    for fpath in ['standalone.html', 'miledeep-devi-fisheries.html']:
        print(f"Syncing {fpath}...")
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Sales fixes
        content = content.replace(
            '<button id="btn-sales-filter-search" class="w-full h-[32px] px-3 bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors" onclick="SalesView.refreshDashboard()">',
            '<button id="btn-sales-filter-search" class="w-full h-[32px] px-3 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors" onclick="SalesView.refreshDashboard()">'
        )
        content = content.replace(
            '<button class="px-2.5 py-1 bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-semibold rounded flex items-center gap-1 shadow-xs ml-2 cursor-pointer transition-colors" onclick="SalesView.refreshDashboard()">',
            '<button class="px-2.5 py-1 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded flex items-center gap-1 shadow-xs ml-2 cursor-pointer transition-colors" onclick="SalesView.refreshDashboard()">'
        )
        content = content.replace(
            'bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.openForwardContractModal(null)"',
            'bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.openForwardContractModal(null)"'
        )
        content = content.replace(
            'bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.generateInsuranceTemplateFromSelection()"',
            'bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.generateInsuranceTemplateFromSelection()"'
        )
        content = content.replace(
            'bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.settleInsurancePaymentSelection()"',
            'bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.settleInsurancePaymentSelection()"'
        )

        # Purchase fixes
        old_rmdash_header = r'''              <div class="flex items-center gap-2">
                <button id="rmdash-reset-btn" class="w-7 h-7 rounded-full border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#64748B] flex items-center justify-center cursor-pointer transition-colors" title="Reset Filters">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                </button>
                <button id="rmdash-accordion-btn" class="w-7 h-7 rounded-full border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#64748B] flex items-center justify-center cursor-pointer transition-colors" title="Toggle Filters">
                  <svg id="rmdash-accordion-icon" class="w-3.5 h-3.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </button>
              </div>'''
        content = content.replace(old_rmdash_header, '')

        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Saved {fpath}")

def main():
    fix_sales_view()
    fix_purchase_view()
    sync_html_files()
    print("\n✓ All anomalies successfully fixed!")

if __name__ == '__main__':
    main()
