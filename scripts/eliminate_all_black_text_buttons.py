#!/usr/bin/env python3
"""
scripts/eliminate_all_black_text_buttons.py

Eliminates all instances of black/dark text on buttons across:
1. Sales (js/views/salesView.js & scripts/sales_view_code.py)
2. Purchase (js/views/purchaseView.js)
3. Pre-processing (js/views/preprocessingView.js & scripts/preprocessing_view_code.py)
4. standalone.html & miledeep-devi-fisheries.html
5. css/app.css

Every button with text is upgraded to high-contrast white text (text-white):
- Primary CTA (Search, Save, New, Create, Submit): bg-[#006C7A] hover:bg-[#005662] text-white
- Secondary Actions / Toolbar (More Search, Load All, Export, Template): bg-[#008DA6] hover:bg-[#006C7A] text-white or bg-[#006C7A] text-white
- Utility / Reset (Reset, ↺, Clear Form): bg-[#64748B] hover:bg-[#475569] text-white
- Dismiss / Cancel / Back (Close, Cancel, Back): bg-[#64748B] hover:bg-[#475569] text-white
"""

import re
import os

def update_sales_content(content):
    # 1. More Search and Load All toolbar buttons (replaces white bg + black text with solid teal + white text)
    old_toolbar_pattern = r'<button class="px-3\.5 py-1\.5 bg-white border border-\[#CBD5E1\] hover:bg-\[#F8FAFC\] text-\[#475569\] hover:text-\[#0F172A\] text-xs font-semibold rounded-lg flex items-center gap-1\.5 cursor-pointer transition-colors" onclick="SalesView\.toggleMoreSearch\(\)">\s*<svg class="w-3\.5 h-3\.5 text-\[#64748B\]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2\.586a1 1 0 01-\.293\.707l-6\.414 6\.414a1 1 0 00-\.293\.707V17l-4 4v-6\.586a1 1 0 00-\.293-\.707L3\.293 7\.293A1 1 0 013 6\.586V4z"/></svg>\s*<span>More Search</span>\s*</button>\s*<button class="px-3\.5 py-1\.5 bg-white border border-\[#CBD5E1\] hover:bg-\[#F8FAFC\] text-\[#475569\] hover:text-\[#0F172A\] text-xs font-semibold rounded-lg flex items-center gap-1\.5 cursor-pointer transition-colors" onclick="SalesView\.loadAll([a-zA-Z]+)\(\)">\s*<svg class="w-3\.5 h-3\.5 text-\[#64748B\]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h\.582m15\.356 2A8\.001 8\.001 0 004\.582 9m0 0H9m11 11v-5h-\.581m0 0a8\.003 8\.003 0 01-15\.357-2m15\.357 2H15"/></svg>\s*<span>Load All</span>\s*</button>'

    def replace_toolbar(match):
        method_name = match.group(1)
        return f"""<button class="px-3.5 py-1.5 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.toggleMoreSearch()">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.loadAll{method_name}()">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>"""

    content = re.sub(old_toolbar_pattern, replace_toolbar, content)

    # 2. Also check for Delayed Shipments toolbar variant with px-3 py-1.5
    old_delayed_tb = r'<button class="px-3 py-1\.5 bg-white border border-\[#CBD5E1\] hover:bg-\[#F8FAFC\] text-\[#475569\] hover:text-\[#0F172A\] text-xs font-semibold rounded-lg flex items-center gap-1\.5 cursor-pointer transition-colors" onclick="SalesView\.toggleMoreSearch\(\)">\s*<svg class="w-3\.5 h-3\.5 text-\[#64748B\]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2\.586a1 1 0 01-\.293\.707l-6\.414 6\.414a1 1 0 00-\.293\.707V17l-4 4v-6\.586a1 1 0 00-\.293-\.707L3\.293 7\.293A1 1 0 013 6\.586V4z"/></svg>\s*<span>More Search</span>\s*</button>\s*<button class="px-3 py-1\.5 bg-white border border-\[#CBD5E1\] hover:bg-\[#F8FAFC\] text-\[#475569\] hover:text-\[#0F172A\] text-xs font-semibold rounded-lg flex items-center gap-1\.5 cursor-pointer transition-colors" onclick="SalesView\.loadAllDelayedShipments\(\)">\s*<svg class="w-3\.5 h-3\.5 text-\[#64748B\]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h\.582m15\.356 2A8\.001 8\.001 0 004\.582 9m0 0H9m11 11v-5h-\.581m0 0a8\.003 8\.003 0 01-15\.357-2m15\.357 2H15"/></svg>\s*<span>Load All</span>\s*</button>'
    new_delayed_tb = """<button class="px-3.5 py-1.5 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.toggleMoreSearch()">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.loadAllDelayedShipments()">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>"""
    content = re.sub(old_delayed_tb, new_delayed_tb, content)

    # 3. Export buttons in Sales (Proforma and ETA) -> Solid teal with white text
    content = content.replace(
        '<button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F0FAFC] text-[#006C7A] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.exportProformaExcel()">',
        '<button class="px-3.5 py-1.5 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.exportProformaExcel()">'
    )
    content = content.replace(
        '<button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F0FAFC] text-[#006C7A] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.exportEtaExcel()">',
        '<button class="px-3.5 py-1.5 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.exportEtaExcel()">'
    )

    # 4. Back to Proforma List
    content = content.replace(
        '<button type="button" class="px-4 py-2 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#475569] hover:text-[#0F172A] cursor-pointer transition-colors" onclick="SalesView.closeNewPi()">',
        '<button type="button" class="px-4 py-2 rounded-lg bg-[#64748B] hover:bg-[#475569] text-xs font-bold text-white shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.closeNewPi()">'
    )

    # 5. Cancel and Close in Modals
    content = content.replace(
        '<button type="button" class="px-5 py-2.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#475569] hover:text-[#0F172A] cursor-pointer transition-colors" onclick="Modal.close()">',
        '<button type="button" class="px-5 py-2.5 rounded-lg bg-[#64748B] hover:bg-[#475569] text-xs font-bold text-white shadow-xs hover:shadow cursor-pointer transition-all" onclick="Modal.close()">'
    )
    content = content.replace(
        '<button type="button" class="px-5 py-2 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#475569] hover:text-[#0F172A] cursor-pointer transition-colors" onclick="Modal.close()">',
        '<button type="button" class="px-5 py-2 rounded-lg bg-[#64748B] hover:bg-[#475569] text-xs font-bold text-white shadow-xs hover:shadow cursor-pointer transition-all" onclick="Modal.close()">'
    )

    # 6. Stepper buttons
    content = content.replace(
        'class="w-9 h-full flex items-center justify-center text-[#475569] hover:bg-[#F1F5F9] font-bold text-sm select-none transition-colors"',
        'class="w-9 h-full flex items-center justify-center bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#006C7A] font-extrabold text-sm select-none transition-colors"'
    )

    return content

def update_purchase_content(content):
    # 1. Reset buttons across Purchase (change from bg-white text-[#475569] to bg-[#64748B] hover:bg-[#475569] text-white)
    content = content.replace(
        '<button id="rmdash-reset-btn" class="px-4 py-2.5 rounded-lg border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F1F5F9] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer" title="Reset Filters">',
        '<button id="rmdash-reset-btn" class="px-4 py-2.5 rounded-lg bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold shadow-xs hover:shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer" title="Reset Filters">'
    )
    content = content.replace(
        '<button id="rmdash-reset-btn" class="px-4 py-2 rounded-lg border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F1F5F9] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer" title="Reset Filters">',
        '<button id="rmdash-reset-btn" class="px-4 py-2 rounded-lg bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold shadow-xs hover:shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer" title="Reset Filters">'
    )
    content = content.replace(
        '<button id="bk-reset-btn" class="px-3.5 py-2 rounded-lg border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F1F5F9] text-xs font-semibold cursor-pointer transition-colors" title="Reset Filters">',
        '<button id="bk-reset-btn" class="px-3.5 py-2 rounded-lg bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold shadow-xs hover:shadow cursor-pointer transition-all" title="Reset Filters">'
    )
    content = content.replace(
        '<button id="ar-reset-btn" class="px-3.5 py-2 rounded-lg border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F1F5F9] text-xs font-semibold cursor-pointer transition-colors" title="Reset Filters">',
        '<button id="ar-reset-btn" class="px-3.5 py-2 rounded-lg bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold shadow-xs hover:shadow cursor-pointer transition-all" title="Reset Filters">'
    )
    content = content.replace(
        '<button id="bl-reset-btn" class="h-9 px-3.5 rounded-lg border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F1F5F9] text-xs font-semibold cursor-pointer transition-colors" style="margin-top: 18px;" title="Reset Filters">',
        '<button id="bl-reset-btn" class="h-9 px-3.5 rounded-lg bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold shadow-xs hover:shadow cursor-pointer transition-all" style="margin-top: 18px;" title="Reset Filters">'
    )
    content = content.replace(
        '<button id="pay-reset-btn" class="px-3.5 py-2 rounded-lg border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F1F5F9] text-xs font-semibold cursor-pointer transition-colors" title="Reset Filters">',
        '<button id="pay-reset-btn" class="px-3.5 py-2 rounded-lg bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold shadow-xs hover:shadow cursor-pointer transition-all" title="Reset Filters">'
    )
    content = content.replace(
        '<button id="ps-reset-btn" class="px-3.5 py-2 rounded-lg border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F1F5F9] text-xs font-semibold cursor-pointer transition-colors" title="Reset Filters">',
        '<button id="ps-reset-btn" class="px-3.5 py-2 rounded-lg bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold shadow-xs hover:shadow cursor-pointer transition-all" title="Reset Filters">'
    )

    # 2. Back buttons
    content = content.replace(
        '<button id="btn-back-to-bookings" class="px-3.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-white text-xs font-semibold text-[#475569] hover:bg-[#F1F5F9] cursor-pointer transition-colors">',
        '<button id="btn-back-to-bookings" class="px-3.5 py-1.5 rounded-lg bg-[#64748B] hover:bg-[#475569] text-xs font-bold text-white shadow-xs hover:shadow cursor-pointer transition-all">'
    )
    content = content.replace(
        '<button id="btn-back-to-bills" class="px-3.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-white text-xs font-semibold text-[#475569] hover:bg-[#F1F5F9] cursor-pointer transition-colors">',
        '<button id="btn-back-to-bills" class="px-3.5 py-1.5 rounded-lg bg-[#64748B] hover:bg-[#475569] text-xs font-bold text-white shadow-xs hover:shadow cursor-pointer transition-all">'
    )

    # 3. Form Cancel & Close & Reset
    content = content.replace(
        '<button type="button" id="btn-close-create-booking" class="px-5 py-2 rounded-lg border border-[#CBD5E1] bg-white text-xs font-semibold text-[#475569] hover:bg-[#F1F5F9] cursor-pointer transition-colors">',
        '<button type="button" id="btn-close-create-booking" class="px-5 py-2 rounded-lg bg-[#64748B] hover:bg-[#475569] text-xs font-bold text-white shadow-xs hover:shadow cursor-pointer transition-all">'
    )
    content = content.replace(
        '<button type="reset" class="px-5 py-2 rounded-lg border border-[#CBD5E1] bg-white text-xs font-semibold text-[#475569] hover:bg-[#F1F5F9] cursor-pointer transition-colors">',
        '<button type="reset" class="px-5 py-2 rounded-lg bg-[#64748B] hover:bg-[#475569] text-xs font-bold text-white shadow-xs hover:shadow cursor-pointer transition-all">'
    )
    content = content.replace(
        '<button type="button" id="btn-cancel-rm-bill" class="px-5 py-2 rounded-lg border border-[#CBD5E1] bg-white text-xs font-semibold text-[#475569] hover:bg-[#F1F5F9] cursor-pointer transition-colors">',
        '<button type="button" id="btn-cancel-rm-bill" class="px-5 py-2 rounded-lg bg-[#64748B] hover:bg-[#475569] text-xs font-bold text-white shadow-xs hover:shadow cursor-pointer transition-all">'
    )

    # 4. Export & Download buttons in Purchase -> Solid teal with white text
    content = content.replace(
        '<button onclick="window.Toast.show(\'Downloading RM Table...\', \'info\')" class="px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC]">',
        '<button onclick="window.Toast.show(\'Downloading RM Table...\', \'info\')" class="px-3.5 py-1.5 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-xs font-bold text-white shadow-xs hover:shadow cursor-pointer transition-all">'
    )
    content = content.replace(
        '<button onclick="window.Toast.show(\'Exporting Arrivals to Excel...\', \'info\')" class="px-3.5 py-2 rounded-lg border border-[#CBD5E1] bg-white text-xs font-bold text-[#006C7A] hover:bg-[#F0FAFC] flex items-center gap-1.5 transition-colors cursor-pointer">',
        '<button onclick="window.Toast.show(\'Exporting Arrivals to Excel...\', \'info\')" class="px-3.5 py-2 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-xs font-bold text-white shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer transition-all">'
    )
    content = content.replace(
        '<button id="btn-lt-copy" class="px-3.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-white text-xs font-bold text-[#006C7A] hover:bg-[#F0FAFC] flex items-center gap-1 cursor-pointer transition-colors">',
        '<button id="btn-lt-copy" class="px-3.5 py-1.5 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-xs font-bold text-white shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer transition-all">'
    )
    content = content.replace(
        '<button onclick="window.Toast.show(\'Downloading Excel...\', \'info\')" class="px-3.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-white text-xs font-bold text-[#006C7A] hover:bg-[#F0FAFC] flex items-center gap-1 transition-colors cursor-pointer">',
        '<button onclick="window.Toast.show(\'Downloading Excel...\', \'info\')" class="px-3.5 py-1.5 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-xs font-bold text-white shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer transition-all">'
    )
    content = content.replace(
        '<button onclick="window.Toast.show(\'Downloading PDF...\', \'info\')" class="px-3.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-white text-xs font-bold text-[#006C7A] hover:bg-[#F0FAFC] flex items-center gap-1 transition-colors cursor-pointer">',
        '<button onclick="window.Toast.show(\'Downloading PDF...\', \'info\')" class="px-3.5 py-1.5 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-xs font-bold text-white shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer transition-all">'
    )
    content = content.replace(
        '<button onclick="window.Toast.show(\'Downloading Commission Bills PDF...\', \'success\')" class="px-3.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-white text-xs font-bold text-[#006C7A] hover:bg-[#F0FAFC] flex items-center gap-1.5 transition-colors cursor-pointer">',
        '<button onclick="window.Toast.show(\'Downloading Commission Bills PDF...\', \'success\')" class="px-3.5 py-1.5 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-xs font-bold text-white shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer transition-all">'
    )
    content = content.replace(
        '<button onclick="window.Toast.show(\'Downloading Consolidated Bills PDF...\', \'success\')" class="px-3.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-white text-xs font-bold text-[#006C7A] hover:bg-[#F0FAFC] flex items-center gap-1.5 transition-colors cursor-pointer">',
        '<button onclick="window.Toast.show(\'Downloading Consolidated Bills PDF...\', \'success\')" class="px-3.5 py-1.5 rounded-lg bg-[#008DA6] hover:bg-[#006C7A] text-xs font-bold text-white shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer transition-all">'
    )
    content = content.replace(
        '<button onclick="window.Toast.show(\'Exporting Payment Summary...\', \'info\')" class="px-3.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-white text-xs font-bold text-[#006C7A] hover:bg-[#F0FAFC] flex items-center gap-1.5 transition-colors cursor-pointer">',
        '<button onclick="window.Toast.show(\'Exporting Payment Summary...\', \'info\')" class="px-3.5 py-1.5 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-xs font-bold text-white shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer transition-all">'
    )

    # 5. Print row button in Bills -> Clean teal icon
    content = content.replace(
        '<button onclick="window.Toast.show(\'Printing bill ${a.no}...\', \'info\')" class="p-1 rounded text-[#475569] hover:bg-[#F8FAFC]" title="Print">',
        '<button onclick="window.Toast.show(\'Printing bill ${a.no}...\', \'info\')" class="p-1 rounded text-[#006C7A] hover:bg-[#F0FAFC]" title="Print">'
    )

    return content

def update_preprocessing_content(content):
    # 1. Reset button in renderFilterCard
    content = content.replace(
        '<button type="button" id="${idPrefix}-reset-btn" class="px-4 py-2 bg-white border border-[#CBD5E1] text-[#475569] hover:bg-[#F1F5F9] text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer" title="Reset all filters">\n              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>\n              <span>Reset</span>\n            </button>',
        '<button type="button" id="${idPrefix}-reset-btn" class="px-4 py-2 bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1 shadow-xs hover:shadow transition-all cursor-pointer" title="Reset all filters">\n              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>\n              <span>Reset</span>\n            </button>'
    )

    # 2. Download template button
    content = content.replace(
        '<button class="px-4 py-2 bg-white border border-[#CBD5E1] text-[#006C7A] hover:bg-[#F0FAFC] text-xs font-bold rounded-lg shadow-xs cursor-pointer transition-colors" onclick="window.PreprocessingView.toastInfo(\'Downloading CSV template\')">Download Template</button>',
        '<button class="px-4 py-2 bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.toastInfo(\'Downloading CSV template\')">Download Template</button>'
    )

    return content

def update_css():
    file_path = 'css/app.css'
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update .btn-secondary to solid slate with white text
    content = content.replace(
        """.btn-secondary {
  background-color: #FFFFFF;
  color: #1E293B;
  font-weight: 600;
  border: 1px solid #CBD5E1;
  transition: all 0.15s ease;
}
.btn-secondary:hover {
  background-color: #F8FAFD;
  color: #0F172A;
  border-color: #94A3B8;
}""",
        """.btn-secondary {
  background-color: #64748B !important;
  color: #FFFFFF !important;
  font-weight: 600 !important;
  border: 1px solid #475569 !important;
  border-radius: 8px !important;
  transition: all 0.15s ease !important;
}
.btn-secondary:hover {
  background-color: #475569 !important;
  border-color: #334155 !important;
  color: #FFFFFF !important;
}"""
    )
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("  ✓ Updated css/app.css")

def main():
    print("=================================================================")
    print("ELIMINATING ALL BLACK TEXT BUTTONS ACROSS THE ENTIRE APPLICATION")
    print("=================================================================")

    # 1. Update css/app.css
    update_css()

    # 2. Update js/views/salesView.js
    sales_file = 'js/views/salesView.js'
    print(f"Updating {sales_file}...")
    with open(sales_file, 'r', encoding='utf-8') as f:
        s_content = f.read()
    s_updated = update_sales_content(s_content)
    with open(sales_file, 'w', encoding='utf-8') as f:
        f.write(s_updated)
    print(f"  ✓ Saved {sales_file}")

    # 3. Update scripts/sales_view_code.py
    sales_code_file = 'scripts/sales_view_code.py'
    if os.path.exists(sales_code_file):
        print(f"Updating {sales_code_file}...")
        with open(sales_code_file, 'r', encoding='utf-8') as f:
            sc_content = f.read()
        sc_updated = update_sales_content(sc_content)
        with open(sales_code_file, 'w', encoding='utf-8') as f:
            f.write(sc_updated)
        print(f"  ✓ Saved {sales_code_file}")

    # 4. Update js/views/purchaseView.js
    purch_file = 'js/views/purchaseView.js'
    print(f"Updating {purch_file}...")
    with open(purch_file, 'r', encoding='utf-8') as f:
        p_content = f.read()
    p_updated = update_purchase_content(p_content)
    with open(purch_file, 'w', encoding='utf-8') as f:
        f.write(p_updated)
    print(f"  ✓ Saved {purch_file}")

    # 5. Update js/views/preprocessingView.js
    prep_file = 'js/views/preprocessingView.js'
    print(f"Updating {prep_file}...")
    with open(prep_file, 'r', encoding='utf-8') as f:
        pp_content = f.read()
    pp_updated = update_preprocessing_content(pp_content)
    with open(prep_file, 'w', encoding='utf-8') as f:
        f.write(pp_updated)
    print(f"  ✓ Saved {prep_file}")

    # 6. Update scripts/preprocessing_view_code.py
    prep_code_file = 'scripts/preprocessing_view_code.py'
    if os.path.exists(prep_code_file):
        print(f"Updating {prep_code_file}...")
        with open(prep_code_file, 'r', encoding='utf-8') as f:
            ppc_content = f.read()
        ppc_updated = update_preprocessing_content(ppc_content)
        with open(prep_code_file, 'w', encoding='utf-8') as f:
            f.write(ppc_updated)
        print(f"  ✓ Saved {prep_code_file}")

    # 7. Update standalone.html
    stand_file = 'standalone.html'
    print(f"Updating {stand_file}...")
    with open(stand_file, 'r', encoding='utf-8') as f:
        st_content = f.read()
    st_updated = update_sales_content(st_content)
    st_updated = update_purchase_content(st_updated)
    st_updated = update_preprocessing_content(st_updated)
    with open(stand_file, 'w', encoding='utf-8') as f:
        f.write(st_updated)
    print(f"  ✓ Saved {stand_file}")

    # 8. Update miledeep-devi-fisheries.html
    mile_file = 'miledeep-devi-fisheries.html'
    print(f"Updating {mile_file}...")
    with open(mile_file, 'r', encoding='utf-8') as f:
        m_content = f.read()
    m_updated = update_sales_content(m_content)
    m_updated = update_purchase_content(m_updated)
    m_updated = update_preprocessing_content(m_updated)
    with open(mile_file, 'w', encoding='utf-8') as f:
        f.write(m_updated)
    print(f"  ✓ Saved {mile_file}")

    print("\n✓ All files successfully updated! All buttons with text now feature white text on solid backgrounds.")

if __name__ == '__main__':
    main()
