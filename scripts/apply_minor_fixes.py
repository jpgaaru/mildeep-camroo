#!/usr/bin/env python3
"""
Applies minor fixes:
1. Replaces red pink close buttons with grey/global standard secondary buttons in modal footers
2. Changes 'HEADON COUNT AFTER CHECKING' to 'HON COUNT AFTER CHECKING'
3. Converts RECEIVING COUNT in grading track id form to a select scroll-down dropdown input field
Symmetrically updates js/views/preprocessingView.js, standalone.html, and miledeep-devi-fisheries.html
"""

import os

OLD_CLOSE_BTN = '<button type="button" class="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer" onclick="Modal.close()">Close</button>'
NEW_CLOSE_BTN = '<button type="button" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer" onclick="Modal.close()">Close</button>'

OLD_HEADON_LABEL = '<label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HEADON COUNT AFTER CHECKING ( COUNT-2 ) <span class="text-red-500 font-bold">*</span></label>'
NEW_HEADON_LABEL = '<label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HON COUNT AFTER CHECKING ( COUNT-2 ) <span class="text-red-500 font-bold">*</span></label>'

OLD_RECEIVING_BLOCK = """              <div class="row-span-2">
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">RECEIVING COUNT <span class="text-red-500 font-bold">*</span></label>
                <div class="w-full h-[118px] overflow-y-auto px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-[11px] font-mono text-[#334155] space-y-1">
                  <div>AMP/2425/4044 (121.000 - 713.000)</div>
                  <div>AMP/2425/4044 (119.000 - 696.800)</div>
                  <div>AMP/2425/4044 (136.000 - 622.600)</div>
                  <div>AMP/2425/4044 (122.000 - 735.000)</div>
                  <div>AMP/2425/4044 (130.000 - 801.000)</div>
                  <div>AMP/2425/4044 (115.000 - 729.000)</div>
                  <div>AMP/2425/4044 (140.000 - 307.600)</div>
                  <div>AMP/2425/4044 (142.000 - 818.000)</div>
                </div>
              </div>

              <!-- Row 2 (Columns 1 to 3) -->
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">GRADING DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="gt-grading-date" value="2025-02-20" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">GRADING MACHINE <span class="text-red-500 font-bold">*</span></label>
                <select id="gt-machine" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="Unit -2 Roller Grading Machine" selected>Unit -2 Roller Grading Machine</option>
                  <option value="Unit -6 Laitram Machine">Unit -6 Laitram Machine</option>
                </select>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">START TIME</label>
                  <input type="text" id="gt-start-time" value="09:00 AM" class="w-full px-2 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">END TIME</label>
                  <input type="text" id="gt-end-time" value="11:40 AM" class="w-full px-2 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                </div>
              </div>"""

NEW_RECEIVING_BLOCK = """              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">RECEIVING COUNT <span class="text-red-500 font-bold">*</span></label>
                <select id="gt-receiving-count" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="AMP/2425/4044 (121.000 - 713.000)" selected>AMP/2425/4044 (121.000 - 713.000)</option>
                  <option value="AMP/2425/4044 (119.000 - 696.800)">AMP/2425/4044 (119.000 - 696.800)</option>
                  <option value="AMP/2425/4044 (136.000 - 622.600)">AMP/2425/4044 (136.000 - 622.600)</option>
                  <option value="AMP/2425/4044 (122.000 - 735.000)">AMP/2425/4044 (122.000 - 735.000)</option>
                  <option value="AMP/2425/4044 (130.000 - 801.000)">AMP/2425/4044 (130.000 - 801.000)</option>
                  <option value="AMP/2425/4044 (115.000 - 729.000)">AMP/2425/4044 (115.000 - 729.000)</option>
                  <option value="AMP/2425/4044 (140.000 - 307.600)">AMP/2425/4044 (140.000 - 307.600)</option>
                  <option value="AMP/2425/4044 (142.000 - 818.000)">AMP/2425/4044 (142.000 - 818.000)</option>
                </select>
              </div>

              <!-- Row 2 (Columns 1 to 4) -->
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">GRADING DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="gt-grading-date" value="2025-02-20" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">GRADING MACHINE <span class="text-red-500 font-bold">*</span></label>
                <select id="gt-machine" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="Unit -2 Roller Grading Machine" selected>Unit -2 Roller Grading Machine</option>
                  <option value="Unit -6 Laitram Machine">Unit -6 Laitram Machine</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">START TIME</label>
                <input type="text" id="gt-start-time" value="09:00 AM" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">END TIME</label>
                <input type="text" id="gt-end-time" value="11:40 AM" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>"""

def process_file(filepath):
    print(f"Processing {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Close buttons
    count_close = content.count(OLD_CLOSE_BTN)
    if count_close > 0:
        content = content.replace(OLD_CLOSE_BTN, NEW_CLOSE_BTN)
        print(f"  ✓ Replaced {count_close} red close buttons with global standard neutral outline buttons")
    else:
        print("  ℹ No red close buttons found")

    # 2. HEADON label
    count_headon = content.count(OLD_HEADON_LABEL)
    if count_headon > 0:
        content = content.replace(OLD_HEADON_LABEL, NEW_HEADON_LABEL)
        print(f"  ✓ Replaced {count_headon} HEADON COUNT label(s) with HON COUNT AFTER CHECKING")
    else:
        # Fallback if label text without spaces
        if 'HEADON COUNT AFTER CHECKING' in content:
            content = content.replace('HEADON COUNT AFTER CHECKING', 'HON COUNT AFTER CHECKING')
            print("  ✓ Applied fallback HEADON COUNT replacement")
        else:
            print("  ℹ No HEADON COUNT label found")

    # 3. RECEIVING COUNT in grading track id
    if OLD_RECEIVING_BLOCK in content:
        content = content.replace(OLD_RECEIVING_BLOCK, NEW_RECEIVING_BLOCK)
        print("  ✓ Replaced RECEIVING COUNT static block with select dropdown input field")
    else:
        print("  ⚠️ Could not find exact OLD_RECEIVING_BLOCK, trying flexible replacement...")
        marker = 'id="gt-track-id"'
        idx_m = content.find(marker)
        if idx_m != -1:
            idx_start = content.find('<div class="row-span-2">', idx_m)
            end_marker = 'id="gt-end-time"'
            idx_end_input = content.find(end_marker, idx_start)
            if idx_start != -1 and idx_end_input != -1:
                idx_close_div = content.find('</div>', idx_end_input) # closing of input
                idx_close_div = content.find('</div>', idx_close_div + 6) # closing of col
                idx_close_div = content.find('</div>', idx_close_div + 6) # closing of grid-cols-2
                # We can replace directly if exact block matched
                print(f"  ℹ Markers near gt-track-id located at {idx_start} - {idx_close_div}")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ Saved {filepath}")

def main():
    files = [
        'js/views/preprocessingView.js',
        'standalone.html',
        'miledeep-devi-fisheries.html'
    ]
    for fp in files:
        if os.path.exists(fp):
            process_file(fp)

if __name__ == '__main__':
    main()
