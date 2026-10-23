#!/usr/bin/env python3
"""
scripts/clean_all_remaining_black_text.py

Performs comprehensive replacement of ALL remaining black/dark text buttons in Sales,
Purchase, Pre-processing, standalone.html, and miledeep-devi-fisheries.html:
1. All "More Search" buttons -> bg-[#006C7A] hover:bg-[#005662] text-white with text-white SVG icon
2. All "Load All" buttons -> bg-[#008DA6] hover:bg-[#006C7A] text-white with text-white SVG icon
3. "Back to Proforma List" -> bg-[#64748B] hover:bg-[#475569] text-white with text-white SVG icon
4. Form "Cancel" buttons -> bg-[#64748B] hover:bg-[#475569] text-white
5. Stepper buttons -> bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#006C7A] font-extrabold
"""

import re
import os

def clean_file(filepath):
    print(f"Cleaning {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. More Search buttons (any variant of onclick="SalesView.toggleMore...Search()")
    # Pattern: <button class="... text-[#475569] ..." onclick="SalesView.toggleMore...Search()"> ... <span>More Search</span> </button>
    content = re.sub(
        r'<button class="[^"]*text-\[#475569\][^"]*" onclick="SalesView\.toggleMore[a-zA-Z]*Search\(\)">\s*<svg[^>]*>\s*<path[^>]*/>\s*</svg>\s*<span>More Search</span>\s*</button>',
        r'<button class="px-3.5 py-1.5 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.toggleMoreSearch()">\n                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>\n                <span>More Search</span>\n              </button>',
        content
    )

    # 2. Load All buttons
    content = re.sub(
        r'<button class="[^"]*text-\[#475569\][^"]*" onclick="SalesView\.loadAll([a-zA-Z]+)\(\)">\s*<svg[^>]*>\s*<path[^>]*/>\s*</svg>\s*<span>Load All</span>\s*</button>',
        r'<button class="px-3.5 py-1.5 bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.loadAll\1()">\n                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>\n                <span>Load All</span>\n              </button>',
        content
    )

    # 3. Back to Proforma List
    content = re.sub(
        r'<button type="button" class="[^"]*text-\[#475569\][^"]*" onclick="window\.location\.hash=\'#/sales/orders/proforma-list\'">\s*<svg[^>]*>\s*<path[^>]*/>\s*</svg>\s*<span>Back to Proforma List</span>\s*</button>',
        r'<button type="button" class="px-4 py-2 rounded-lg bg-[#64748B] hover:bg-[#475569] text-xs font-bold text-white shadow-xs hover:shadow cursor-pointer transition-all flex items-center gap-1.5" onclick="window.location.hash=\'#/sales/orders/proforma-list\'">\n            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>\n            <span>Back to Proforma List</span>\n          </button>',
        content
    )

    # 4. Form Cancel button in New PI
    content = re.sub(
        r'<button type="button" class="[^"]*text-\[#475569\][^"]*" onclick="window\.location\.hash=\'#/sales/orders/proforma-list\'">\s*Cancel\s*</button>',
        r'<button type="button" class="px-5 py-2.5 rounded-lg bg-[#64748B] hover:bg-[#475569] text-xs font-bold text-white shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.location.hash=\'#/sales/orders/proforma-list\'">\n                  Cancel\n                </button>',
        content
    )

    # 5. Stepper buttons
    content = content.replace(
        'class="w-9 h-full flex items-center justify-center text-[#475569] hover:bg-[#F1F5F9] font-bold text-sm select-none transition-colors"',
        'class="w-9 h-full flex items-center justify-center bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#006C7A] font-extrabold text-sm select-none transition-colors"'
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  ✓ Saved {filepath}")

def main():
    target_files = [
        'js/views/salesView.js',
        'scripts/sales_view_code.py',
        'standalone.html',
        'miledeep-devi-fisheries.html'
    ]
    for tf in target_files:
        if os.path.exists(tf):
            clean_file(tf)

    print("\n✓ All remaining black text buttons eradicated!")

if __name__ == '__main__':
    main()
