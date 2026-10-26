"""
Standardize Tab Menus, Action Buttons, and Search & Filters Layout across
js/views/preprocessingView.js, standalone.html, and miledeep-devi-fisheries.html.

Key requirements:
1. Remove literal '+' letter from buttons that already have a '+' symbol/icon (e.g. <span>Add PO</span>).
2. Move Add/Create/New action buttons to the top-right of the tab menu title header.
3. Standardize filter cards with a 'SEARCH & FILTERS' header bar and funnel icon.
4. Align the Search button to the bottom-right with a magnifying glass icon.
"""

import re
import sys

TARGET_FILES = [
    'js/views/preprocessingView.js',
    'standalone.html',
    'miledeep-devi-fisheries.html'
]

def update_chemical_pos(content):
    # Pattern for renderChemicalPos title & filter form
    old_pattern = r'(renderChemicalPos\(container\)\s*\{[\s\S]*?container\.innerHTML\s*=\s*`\s*<div class="space-y-4 animate-fade-in text-\[#1E293B\]">\s*)<!-- Page Title -->\s*<div class="flex items-center justify-between pb-1">\s*<h2 class="text-sm md:text-base font-bold text-\[#1E293B\] tracking-wide uppercase">CHEMICAL POS</h2>\s*<span class="text-xs text-\[#64748B\] font-medium hidden sm:inline">[^<]*</span>\s*</div>\s*<!-- Upper Card: Filters Card \(Matching Screenshot 1\) -->\s*<div class="bg-white rounded-xl border border-\[#CBD5E1\] shadow-xs p-5 md:p-6 transition-all">\s*<form id="cpo-filter-form" class="space-y-4">([\s\S]*?)<!-- Centered Action Buttons \(Matching Screenshot 1\) -->\s*<div class="flex items-center justify-center gap-3 pt-2">[\s\S]*?</div>\s*</form>\s*</div>'
    
    new_header_and_filter = r'''\1<!-- Page Title Header with Right-Aligned Action Button -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">CHEMICAL POS</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Purchase Order Tracking</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="cpo-btn-add-po" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add PO</span>
            </button>
          </div>
        </div>

        <!-- Upper Card: Filters Card with SEARCH & FILTERS Header -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="cpo-filter-form" class="space-y-4">\2<!-- Bottom-Right Search Button -->
            <div class="flex justify-end pt-1">
              <button type="button" id="cpo-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>'''
    
    new_content, count = re.subn(old_pattern, new_header_and_filter, content, count=1)
    return new_content, count

def update_received_chemicals(content):
    old_pattern = r'(renderReceivedChemicals\(container\)\s*\{[\s\S]*?container\.innerHTML\s*=\s*`\s*<div class="space-y-4 animate-fade-in text-\[#1E293B\]">\s*)<!-- Page Title -->\s*<div class="flex items-center justify-between pb-1">\s*<h2 class="text-sm md:text-base font-bold text-\[#1E293B\] tracking-wide uppercase">RECEIVED CHEMICALS</h2>\s*<span class="text-xs text-\[#64748B\] font-medium hidden sm:inline">[^<]*</span>\s*</div>\s*<!-- Upper Card: Filters Card \(Matching Screenshot 1\) -->\s*<div class="bg-white rounded-xl border border-\[#CBD5E1\] shadow-xs p-5 md:p-6 transition-all">\s*<form id="rc-filter-form" class="space-y-4">([\s\S]*?)<!-- Centered Action Buttons \(Matching Screenshot 1\) -->\s*<div class="flex items-center justify-center gap-3 pt-2">[\s\S]*?</div>\s*</form>\s*</div>'
    
    new_header_and_filter = r'''\1<!-- Page Title Header with Right-Aligned Action Button -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">RECEIVED CHEMICALS</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Inward Orders & Dock Clearance</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="rc-btn-add-order" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Order</span>
            </button>
          </div>
        </div>

        <!-- Upper Card: Filters Card with SEARCH & FILTERS Header -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="rc-filter-form" class="space-y-4">\2<!-- Bottom-Right Action Buttons -->
            <div class="flex justify-end items-center gap-2 pt-1">
              <button type="button" id="rc-btn-more-search" class="px-4 py-2 border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#475569] text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer">More Search</button>
              <button type="button" id="rc-btn-load-all" class="px-4 py-2 border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#475569] text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer">Load All</button>
              <button type="button" id="rc-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>'''
    
    new_content, count = re.subn(old_pattern, new_header_and_filter, content, count=1)
    return new_content, count

def update_chemicals_consumption(content):
    old_pattern = r'(renderChemicalsConsumption\(container\)\s*\{[\s\S]*?container\.innerHTML\s*=\s*`\s*<div class="space-y-4 animate-fade-in text-\[#1E293B\]">\s*)<!-- Page Title -->\s*<div class="flex items-center justify-between pb-1">\s*<h2 class="text-sm md:text-base font-bold text-\[#1E293B\] tracking-wide uppercase">CHEMICALS CONSUMPTION</h2>\s*<span class="text-xs text-\[#64748B\] font-medium hidden sm:inline">[^<]*</span>\s*</div>\s*<!-- Upper Card: Filters Card \(Matching Screenshot 1\) -->\s*<div class="bg-white rounded-xl border border-\[#CBD5E1\] shadow-xs p-5 md:p-6 transition-all">\s*<form id="cc-filter-form" class="space-y-4">([\s\S]*?)<!-- Centered Action Buttons \(Matching Screenshot 1\) -->\s*<div class="flex items-center justify-center gap-3 pt-2">[\s\S]*?</div>\s*</form>\s*</div>'
    
    new_header_and_filter = r'''\1<!-- Page Title Header with Right-Aligned Action Button -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">CHEMICALS CONSUMPTION</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Floor Usage & Transfer Register</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="cc-btn-add-consumption" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Consumption</span>
            </button>
          </div>
        </div>

        <!-- Upper Card: Filters Card with SEARCH & FILTERS Header -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="cc-filter-form" class="space-y-4">\2<!-- Bottom-Right Search Button -->
            <div class="flex justify-end pt-1">
              <button type="button" id="cc-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>'''
    
    new_content, count = re.subn(old_pattern, new_header_and_filter, content, count=1)
    return new_content, count

def update_chemical_received_report(content):
    old_pattern = r'(renderChemicalReceivedReport\(container\)\s*\{[\s\S]*?<!-- Upper Card: Filters Card \(Matching Screenshot 1\) -->\s*<div class="bg-white rounded-xl border border-\[#CBD5E1\] shadow-xs p-5 md:p-6 transition-all">\s*<form id="crr-filter-form" class="space-y-4">[\s\S]*?)<!-- Centered Action Button[s]? -->\s*<div class="flex items-center justify-center pt-2">[\s\S]*?</div>(\s*</form>\s*</div>)'
    
    def repl(m):
        full = m.group(0)
        header = '''<div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>\n          '''
        res = full.replace('<form id="crr-filter-form" class="space-y-4">', header + '<form id="crr-filter-form" class="space-y-4">')
        btn_block = '''<div class="flex justify-end pt-1">
              <button type="button" id="crr-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>'''
        old_btn_pattern = r'<!-- Centered Action Button[s]? -->\s*<div class="flex items-center justify-center pt-2">[\s\S]*?</div>'
        res = re.sub(old_btn_pattern, btn_block, res)
        return res

    new_content, count = re.subn(old_pattern, repl, content, count=1)
    return new_content, count

def update_chemical_opening_balance(content):
    old_pattern = r'(renderChemicalOpeningBalance\(container\)\s*\{[\s\S]*?<!-- Upper Card: Filters Card \(Matching Screenshot 2\) -->\s*<div class="bg-white rounded-xl border border-\[#CBD5E1\] shadow-xs p-5 md:p-6 transition-all">\s*<form id="cob-filter-form" class="space-y-4">[\s\S]*?)<!-- Centered Action Button[s]? -->\s*<div class="flex items-center justify-center pt-2">[\s\S]*?</div>(\s*</form>\s*</div>)'
    
    def repl(m):
        full = m.group(0)
        header = '''<div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>\n          '''
        res = full.replace('<form id="cob-filter-form" class="space-y-4">', header + '<form id="cob-filter-form" class="space-y-4">')
        btn_block = '''<div class="flex justify-end pt-1">
              <button type="button" id="cob-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>'''
        old_btn_pattern = r'<!-- Centered Action Button[s]? -->\s*<div class="flex items-center justify-center pt-2">[\s\S]*?</div>'
        res = re.sub(old_btn_pattern, btn_block, res)
        return res

    new_content, count = re.subn(old_pattern, repl, content, count=1)
    return new_content, count

def update_chemical_balance_report(content):
    old_pattern = r'(renderChemicalBalanceReport\(container\)\s*\{[\s\S]*?<!-- Upper Card: Filters Card \(Matching Screenshot 3\) -->\s*<div class="bg-white rounded-xl border border-\[#CBD5E1\] shadow-xs p-5 md:p-6 transition-all">\s*<form id="cbr-filter-form" class="space-y-4">[\s\S]*?)<!-- Centered Action Button[s]? -->\s*<div class="flex items-center justify-center pt-2">[\s\S]*?</div>(\s*</form>\s*</div>)'
    
    def repl(m):
        full = m.group(0)
        header = '''<div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>\n          '''
        res = full.replace('<form id="cbr-filter-form" class="space-y-4">', header + '<form id="cbr-filter-form" class="space-y-4">')
        btn_block = '''<div class="flex justify-end pt-1">
              <button type="button" id="cbr-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>'''
        old_btn_pattern = r'<!-- Centered Action Button[s]? -->\s*<div class="flex items-center justify-center pt-2">[\s\S]*?</div>'
        res = re.sub(old_btn_pattern, btn_block, res)
        return res

    new_content, count = re.subn(old_pattern, repl, content, count=1)
    return new_content, count

def update_chemical_payments_list(content):
    old_pattern = r'(renderChemicalPaymentsList\(container\)\s*\{[\s\S]*?container\.innerHTML\s*=\s*`\s*<div class="space-y-4 animate-fade-in text-\[#1E293B\]">\s*)<!-- Page Title -->\s*<div class="flex items-center justify-between pb-1">\s*<h2 class="text-sm md:text-base font-bold text-\[#1E293B\] tracking-wide uppercase">CHEMICAL PAYMENTS LIST</h2>\s*<span class="text-xs text-\[#64748B\] font-medium hidden sm:inline">[^<]*</span>\s*</div>\s*<!-- Upper Card: Filters Card \(Matching Screenshot 4\) -->\s*<div class="bg-white rounded-xl border border-\[#CBD5E1\] shadow-xs p-5 md:p-6 transition-all">\s*<form id="cp-filter-form" class="space-y-4">([\s\S]*?)<!-- Centered Action Buttons \(Matching Screenshot 4\) -->\s*<div class="flex items-center justify-center gap-3 pt-2">[\s\S]*?</div>\s*</form>\s*</div>'
    
    new_header_and_filter = r'''\1<!-- Page Title Header with Right-Aligned Action Button -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">CHEMICAL PAYMENTS LIST</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Vendor Disbursals & Clearance Register</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="cp-btn-add-payment" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Payment</span>
            </button>
          </div>
        </div>

        <!-- Upper Card: Filters Card with SEARCH & FILTERS Header -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="cp-filter-form" class="space-y-4">\2<!-- Bottom-Right Action Buttons -->
            <div class="flex justify-end items-center gap-2 pt-1">
              <button type="button" id="cp-btn-more-search" class="px-4 py-2 border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#475569] text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer">More Search</button>
              <button type="button" id="cp-btn-load-all" class="px-4 py-2 border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#475569] text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer">Load All</button>
              <button type="button" id="cp-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>'''
    
    new_content, count = re.subn(old_pattern, new_header_and_filter, content, count=1)
    return new_content, count

def clean_redundant_plus_spans(content):
    # Replace <span>+ Add ...</span> with <span>Add ...</span>
    content = re.sub(r'<span>\+\s*Add\s+([^<]+)</span>', r'<span>Add \1</span>', content)
    # Replace <span>+ Save</span> with <span>Save</span>
    content = re.sub(r'<span>\+\s*Save</span>', r'<span>Save</span>', content)
    # Replace <span>+ New</span> with <span>New</span>
    content = re.sub(r'<span>\+\s*New\s+([^<]+)</span>', r'<span>New \1</span>', content)
    # Replace <span>+ Register</span> with <span>Register</span>
    content = re.sub(r'<span>\+\s*Register\s+([^<]+)</span>', r'<span>Register \1</span>', content)
    return content

def process_file(filepath):
    print(f"\nProcessing {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    content, c1 = update_chemical_pos(content)
    print(f"  Tab 1 (Chemical Pos): {'✓ Updated' if c1 else '⚠️ Pattern not matched'}")

    content, c2 = update_received_chemicals(content)
    print(f"  Tab 2 (Received Chemicals): {'✓ Updated' if c2 else '⚠️ Pattern not matched'}")

    content, c3 = update_chemicals_consumption(content)
    print(f"  Tab 3 (Chemicals Consumption): {'✓ Updated' if c3 else '⚠️ Pattern not matched'}")

    content, c4 = update_chemical_received_report(content)
    print(f"  Tab 4 (Chemical Received Report): {'✓ Updated' if c4 else '⚠️ Pattern not matched'}")

    content, c5 = update_chemical_opening_balance(content)
    print(f"  Tab 5 (Chemical Opening Balance): {'✓ Updated' if c5 else '⚠️ Pattern not matched'}")

    content, c6 = update_chemical_balance_report(content)
    print(f"  Tab 6 (Chemical Balance Report): {'✓ Updated' if c6 else '⚠️ Pattern not matched'}")

    content, c7 = update_chemical_payments_list(content)
    print(f"  Tab 7 (Chemical Payments List): {'✓ Updated' if c7 else '⚠️ Pattern not matched'}")

    content = clean_redundant_plus_spans(content)
    print("  Cleaned redundant '+' text spans across file")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    for f in TARGET_FILES:
        process_file(f)
    
    # Also clean redundant plus in setupView.js and salesView.js
    for extra in ['js/views/setupView.js', 'js/views/salesView.js']:
        try:
            with open(extra, 'r', encoding='utf-8') as ef:
                ec = ef.read()
            ec = clean_redundant_plus_spans(ec)
            with open(extra, 'w', encoding='utf-8') as ef:
                ef.write(ec)
            print(f"Cleaned redundant plus in {extra}")
        except Exception as e:
            print(f"Skipping {extra}: {e}")

    print("\nAll files standardized with pixel-accurate headers, action buttons, and SEARCH & FILTERS!")

if __name__ == '__main__':
    main()
