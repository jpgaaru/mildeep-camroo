#!/usr/bin/env python3
"""
Updates Pre-Processing Dashboard:
1. Replaces 'Pre-Processing Floor Intelligence & Executive Dashboard' with 'Overview'
2. Removes the subtitle subline completely
3. Adds clean, beautiful SVG icons to each of the 6 card metrics
4. Symmetrically syncs to js/views/preprocessingView.js, standalone.html, and miledeep-devi-fisheries.html
"""

import os

NEW_CARDS_HTML = """        kpiContainer.innerHTML = `
          <!-- 1. RM Intake -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-lg flex items-center justify-center bg-[#F0FAFC] border border-[#B2ECF3] text-[#02a8b5]">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                </span>
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">Today RM Intake</span>
              </div>
              <span class="text-[10px] text-[#02a8b5] font-bold bg-[#F0FAFC] px-1.5 py-0.5 rounded">3 Plants</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0F172A]">${baseIntake.toLocaleString('en-IN', { maximumFractionDigits: 1 })} <span class="text-xs font-semibold text-[#64748B]">KG</span></span>
              <span class="text-[11px] font-bold text-[#006644] flex items-center gap-0.5">↑ 12.4%</span>
            </div>
          </div>

          <!-- 2. Deheaded Recovery -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-lg flex items-center justify-center bg-[#E3FCEF] border border-[#A8E7C3] text-[#006644]">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>
                </span>
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">Deheaded Recovery</span>
              </div>
              <span class="text-[10px] text-[#006644] font-bold bg-[#E3FCEF] px-1.5 py-0.5 rounded">${yieldPct}% Yield</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#006644]">${baseDeheaded.toLocaleString('en-IN', { maximumFractionDigits: 1 })} <span class="text-xs font-semibold text-[#64748B]">KG</span></span>
              <span class="text-[11px] font-bold text-[#006644]">Benchmark ≥ 65%</span>
            </div>
          </div>

          <!-- 3. Graded HLSO -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-lg flex items-center justify-center bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7]">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
                </span>
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">Graded HLSO</span>
              </div>
              <span class="text-[10px] text-[#0284C7] font-bold bg-[#F0F9FF] px-1.5 py-0.5 rounded">16/20 Dominant</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0284C7]">${baseGraded.toLocaleString('en-IN', { maximumFractionDigits: 1 })} <span class="text-xs font-semibold text-[#64748B]">KG</span></span>
              <span class="text-[11px] font-bold text-[#0284C7]">99.7% Sized</span>
            </div>
          </div>

          <!-- 4. Value Addition Output -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-lg flex items-center justify-center bg-[#FFF9E6] border border-[#F7DA94] text-[#8F4D00]">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                </span>
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">Value Addition Output</span>
              </div>
              <span class="text-[10px] text-[#8F4D00] font-bold bg-[#FFF0B3] px-1.5 py-0.5 rounded">Nobashi / EZ</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0F172A]">${baseVa.toLocaleString('en-IN', { maximumFractionDigits: 1 })} <span class="text-xs font-semibold text-[#64748B]">KG</span></span>
              <span class="text-[11px] font-bold text-[#8F4D00]">67.2% Direct</span>
            </div>
          </div>

          <!-- 5. HON Qty Transfer -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-lg flex items-center justify-center bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5]">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                </span>
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">HON Transfer After VA</span>
              </div>
              <span class="text-[10px] text-[#02a8b5] font-bold bg-[#F0FAFC] px-1.5 py-0.5 rounded">To Freezers</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0F172A]">${baseHonTransfer.toLocaleString('en-IN', { maximumFractionDigits: 1 })} <span class="text-xs font-semibold text-[#64748B]">KG</span></span>
              <span class="text-[11px] font-bold text-[#02a8b5]">Dispatched</span>
            </div>
          </div>

          <!-- 6. Chemical Inventory -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-lg flex items-center justify-center bg-[#F0FAFC] border border-[#B2ECF3] text-[#02a8b5]">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                </span>
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">Chemical Inventory</span>
              </div>
              <span class="text-[10px] text-[#006644] font-bold bg-[#E3FCEF] px-1.5 py-0.5 rounded">Stock Stable</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0F172A]">₹ ${baseChemValue} <span class="text-xs font-semibold text-[#64748B]">Cr</span></span>
              <span class="text-[11px] font-bold text-[#006644]">342.5 KG Today</span>
            </div>
          </div>
        `;"""

OLD_TITLE_BLOCK = """          <div>
            <h1 class="text-xl font-extrabold text-[#172B4D] tracking-tight">Pre-Processing Floor Intelligence & Executive Dashboard</h1>
            <p class="text-xs text-[#5E6C84] mt-0.5 font-medium">Real-time floor summary, recovery telemetry, multi-plant sizing metrics & chemical balances</p>
          </div>"""

NEW_TITLE_BLOCK = """          <div>
            <h1 class="text-xl font-extrabold text-[#172B4D] tracking-tight">Overview</h1>
          </div>"""

def process_file(filepath):
    print(f"Updating {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Title and remove subline
    if OLD_TITLE_BLOCK in content:
        content = content.replace(OLD_TITLE_BLOCK, NEW_TITLE_BLOCK)
        print("  ✓ Replaced 'Pre-Processing Floor Intelligence & Executive Dashboard' with 'Overview' (no subline)")
    else:
        # Fallback in case spacing differs slightly
        content = content.replace('Pre-Processing Floor Intelligence & Executive Dashboard', 'Overview')
        content = content.replace(
            '<p class="text-xs text-[#5E6C84] mt-0.5 font-medium">Real-time floor summary, recovery telemetry, multi-plant sizing metrics & chemical balances</p>',
            ''
        )
        print("  ✓ Applied title replacement fallback")

    # 2. Update KPI Cards with Icons specifically for Pre-Processing
    anchor = "document.getElementById('preproc-kpi-grid')"
    idx_anchor = content.find(anchor)
    if idx_anchor != -1:
        start_marker = "kpiContainer.innerHTML = `"
        idx_start = content.find(start_marker, idx_anchor)
        end_marker = "`;\n      }\n    };"
        idx_end = content.find(end_marker, idx_start)
        if idx_start != -1 and idx_end != -1:
            idx_end += len(end_marker)
            line_start = content.rfind('\n', 0, idx_start) + 1
            content = content[:line_start] + NEW_CARDS_HTML + "\n      }\n    };" + content[idx_end:]
            print("  ✓ Updated preproc-kpi-grid cards with clean SVG icons")
        else:
            print("  ⚠️ Could not find kpiContainer markers after preproc-kpi-grid")
    else:
        print("  ⚠️ Could not find document.getElementById('preproc-kpi-grid')")

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
