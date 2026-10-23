#!/usr/bin/env python3
"""
scripts/apply_button_standardization.py

Implements the user-approved 4-tier button standardization plan:
1. Tier 1 (Primary CTA):
   - Solid Teal #006C7A + White text (text-white font-bold rounded-lg shadow-xs)
2. Tier 2 (Secondary / Reset / Cancel / Back):
   - White bg + Slate text (#475569, hover #0F172A) + border #CBD5E1 rounded-lg
3. Tier 3 (Export / Excel / PDF / Copy):
   - White bg + Teal text (#006C7A) + border #CBD5E1 rounded-lg hover:bg-[#F0FAFC]
4. Tier 4 (Table Row Actions):
   - Replaces unstyled/inherited black icons in CustomInvoices, ISF, ShippingBill, ProformaList
     with semantic hover pill icons:
     - View: text-[#0284C7] hover:bg-[#F0F9FF]
     - Edit: text-[#006644] hover:bg-[#E3FCEF]
     - Download/Copy/Print: text-[#006C7A] hover:bg-[#F0FAFC]
     - Delete: text-[#FF5150] hover:bg-[#FEF2F2]
"""

import re
import os

def update_sales_view(content):
    # 1. Standardize ProformaList Excel export button to Tier 3
    content = content.replace(
        '<button class="px-4 py-2 border border-[#006C7A] bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#006C7A] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.exportProformaExcel()">',
        '<button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F0FAFC] text-[#006C7A] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.exportProformaExcel()">'
    )

    # 2. Standardize EtaStatus Excel export button to Tier 3
    content = content.replace(
        '<button class="px-3.5 py-1.5 border border-[#16A34A] text-[#16A34A] hover:bg-[#F0FDF4] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors" onclick="SalesView.exportEtaExcel()">',
        '<button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F0FAFC] text-[#006C7A] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.exportEtaExcel()">'
    )

    # 3. Standardize ProformaList row action buttons to Tier 4
    old_pi_row_btns = """            <div class="inline-flex items-center gap-1.5 justify-center">
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
            </div>"""

    new_pi_row_btns = """            <div class="inline-flex items-center gap-1.5 justify-center">
              <button class="p-1 rounded text-[#006644] hover:bg-[#E3FCEF] cursor-pointer transition-colors" title="Edit" onclick="SalesView.editPi('${r.id}')">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
              </button>
              <button class="p-1 rounded text-[#006C7A] hover:bg-[#F0FAFC] cursor-pointer transition-colors" title="Print" onclick="SalesView.printPi('${r.id}')">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              </button>
              <button class="p-1 rounded text-[#006C7A] hover:bg-[#F0FAFC] cursor-pointer transition-colors" title="Copy" onclick="SalesView.copyPi('${r.id}')">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              </button>
              <button class="p-1 rounded text-[#FF5150] hover:bg-[#FEF2F2] cursor-pointer transition-colors" title="Delete" onclick="SalesView.deletePi('${r.id}')">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>"""
    content = content.replace(old_pi_row_btns, new_pi_row_btns)

    # 4. Standardize CustomInvoice row action buttons to Tier 4
    old_cinv_btns = """            <div class="inline-flex items-center gap-2 justify-center text-[#2563EB]">
              <button class="p-1 hover:text-[#1D4ED8] cursor-pointer transition-colors" title="Download" onclick="SalesView.downloadCustomInvoice('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              </button>
              <button class="p-1 hover:text-[#1D4ED8] cursor-pointer transition-colors" title="Edit" onclick="SalesView.editCustomInvoice('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
              </button>
              <button class="p-1 hover:text-[#1D4ED8] cursor-pointer transition-colors" title="Copy" onclick="SalesView.copyCustomInvoice('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              </button>
              <button class="p-1 hover:text-[#1D4ED8] cursor-pointer transition-colors" title="View" onclick="SalesView.viewCustomInvoice('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
              <button class="p-1 hover:text-[#1D4ED8] cursor-pointer transition-colors" title="Print" onclick="SalesView.printCustomInvoice('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              </button>
            </div>"""

    new_cinv_btns = """            <div class="inline-flex items-center gap-1.5 justify-center">
              <button class="p-1 rounded text-[#006C7A] hover:bg-[#F0FAFC] cursor-pointer transition-colors" title="Download" onclick="SalesView.downloadCustomInvoice('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              </button>
              <button class="p-1 rounded text-[#006644] hover:bg-[#E3FCEF] cursor-pointer transition-colors" title="Edit" onclick="SalesView.editCustomInvoice('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
              </button>
              <button class="p-1 rounded text-[#006C7A] hover:bg-[#F0FAFC] cursor-pointer transition-colors" title="Copy" onclick="SalesView.copyCustomInvoice('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              </button>
              <button class="p-1 rounded text-[#0284C7] hover:bg-[#F0F9FF] cursor-pointer transition-colors" title="View" onclick="SalesView.viewCustomInvoice('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
              <button class="p-1 rounded text-[#006C7A] hover:bg-[#F0FAFC] cursor-pointer transition-colors" title="Print" onclick="SalesView.printCustomInvoice('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              </button>
            </div>"""
    content = content.replace(old_cinv_btns, new_cinv_btns)

    # 5. Standardize IsfDetails row action buttons to Tier 4
    old_isf_btns = """            <div class="inline-flex items-center gap-2 justify-center text-[#2563EB]">
              <button class="p-1 hover:text-[#1D4ED8] cursor-pointer transition-colors" title="Download ISF Filing" onclick="SalesView.downloadIsfDetails('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              </button>
              <button class="p-1 hover:text-[#1D4ED8] cursor-pointer transition-colors" title="View ISF Details" onclick="SalesView.viewIsfDetails('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
              <button class="p-1 hover:text-[#1D4ED8] cursor-pointer transition-colors" title="Print ISF Summary" onclick="SalesView.printIsfDetails('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              </button>
            </div>"""

    new_isf_btns = """            <div class="inline-flex items-center gap-1.5 justify-center">
              <button class="p-1 rounded text-[#006C7A] hover:bg-[#F0FAFC] cursor-pointer transition-colors" title="Download ISF Filing" onclick="SalesView.downloadIsfDetails('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              </button>
              <button class="p-1 rounded text-[#0284C7] hover:bg-[#F0F9FF] cursor-pointer transition-colors" title="View ISF Details" onclick="SalesView.viewIsfDetails('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
              <button class="p-1 rounded text-[#006C7A] hover:bg-[#F0FAFC] cursor-pointer transition-colors" title="Print ISF Summary" onclick="SalesView.printIsfDetails('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              </button>
            </div>"""
    content = content.replace(old_isf_btns, new_isf_btns)

    return content

def update_purchase_view(content):
    # 1. Standardize Commission Bills PDF to Tier 3
    content = content.replace(
        '<button onclick="window.Toast.show(\'Downloading Commission Bills PDF...\', \'success\')" class="px-3.5 py-1.5 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold shadow-xs hover:shadow cursor-pointer transition-all">',
        '<button onclick="window.Toast.show(\'Downloading Commission Bills PDF...\', \'success\')" class="px-3.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-white text-xs font-bold text-[#006C7A] hover:bg-[#F0FAFC] flex items-center gap-1.5 transition-colors cursor-pointer">'
    )

    # 2. In RMBill edit form: Cancel button to Tier 2
    content = content.replace(
        '<button type="button" id="btn-cancel-rm-bill" class="px-5 py-2 rounded-lg border border-[#CBD5E1] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC] cursor-pointer">',
        '<button type="button" id="btn-cancel-rm-bill" class="px-5 py-2 rounded-lg border border-[#CBD5E1] bg-white text-xs font-semibold text-[#475569] hover:bg-[#F1F5F9] cursor-pointer transition-colors">'
    )
    content = content.replace(
        '<button type="button" id="btn-close-create-booking" class="px-5 py-2 rounded-lg border border-[#CBD5E1] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC] cursor-pointer">',
        '<button type="button" id="btn-close-create-booking" class="px-5 py-2 rounded-lg border border-[#CBD5E1] bg-white text-xs font-semibold text-[#475569] hover:bg-[#F1F5F9] cursor-pointer transition-colors">'
    )
    content = content.replace(
        '<button type="reset" class="px-5 py-2 rounded-lg border border-[#CBD5E1] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC]">',
        '<button type="reset" class="px-5 py-2 rounded-lg border border-[#CBD5E1] bg-white text-xs font-semibold text-[#475569] hover:bg-[#F1F5F9] cursor-pointer transition-colors">'
    )

    return content

def main():
    print("=================================================================")
    print("APPLYING COMPREHENSIVE 4-TIER BUTTON & LAYOUT STANDARDIZATION")
    print("=================================================================")

    # 1. Update js/views/salesView.js
    sales_file = 'js/views/salesView.js'
    print(f"Updating {sales_file}...")
    with open(sales_file, 'r', encoding='utf-8') as f:
        s_content = f.read()
    s_updated = update_sales_view(s_content)
    with open(sales_file, 'w', encoding='utf-8') as f:
        f.write(s_updated)
    print(f"  ✓ Saved {sales_file}")

    # 2. Update scripts/sales_view_code.py
    sales_code_file = 'scripts/sales_view_code.py'
    if os.path.exists(sales_code_file):
        print(f"Updating {sales_code_file}...")
        with open(sales_code_file, 'r', encoding='utf-8') as f:
            sc_content = f.read()
        sc_updated = update_sales_view(sc_content)
        with open(sales_code_file, 'w', encoding='utf-8') as f:
            f.write(sc_updated)
        print(f"  ✓ Saved {sales_code_file}")

    # 3. Update js/views/purchaseView.js
    purch_file = 'js/views/purchaseView.js'
    print(f"Updating {purch_file}...")
    with open(purch_file, 'r', encoding='utf-8') as f:
        p_content = f.read()
    p_updated = update_purchase_view(p_content)
    with open(purch_file, 'w', encoding='utf-8') as f:
        f.write(p_updated)
    print(f"  ✓ Saved {purch_file}")

    # 4. Update standalone.html
    stand_file = 'standalone.html'
    print(f"Updating {stand_file}...")
    with open(stand_file, 'r', encoding='utf-8') as f:
        st_content = f.read()
    st_updated = update_sales_view(st_content)
    st_updated = update_purchase_view(st_updated)
    with open(stand_file, 'w', encoding='utf-8') as f:
        f.write(st_updated)
    print(f"  ✓ Saved {stand_file}")

    # 5. Update miledeep-devi-fisheries.html
    mile_file = 'miledeep-devi-fisheries.html'
    print(f"Updating {mile_file}...")
    with open(mile_file, 'r', encoding='utf-8') as f:
        m_content = f.read()
    m_updated = update_sales_view(m_content)
    m_updated = update_purchase_view(m_updated)
    with open(mile_file, 'w', encoding='utf-8') as f:
        f.write(m_updated)
    print(f"  ✓ Saved {mile_file}")

    print("\n✓ All files successfully updated and standardized to 4-Tier design!")

if __name__ == '__main__':
    main()
