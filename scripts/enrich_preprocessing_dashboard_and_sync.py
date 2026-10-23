#!/usr/bin/env python3
"""
scripts/enrich_preprocessing_dashboard_and_sync.py

1. Enriches the Preprocessing Dashboard (renderFloorOverview) with full summary data visualization,
   6 KPI StatTiles, throughput line charts, yield bar charts, stage flow telemetry, and plant breakdown table.
2. Updates NAV_HIERARCHY in standalone.html and miledeep-devi-fisheries.html to the new 3-option structure:
   - Dashboard (Overview)
   - Operations (7 tabs: Deheading, Grading, Rm Received trackid, De-Heading trackid, Grading trackid, Value Addition trackid, Hon Qty Transfer After VA)
   - Chemical Screens (7 tabs: Chemical Pos, Received Chemicals, Chemicals Consumption, Chemical Received Report, Chemical Opening Balance Report, Chemical Balance Report, Chemical Payments List)
3. Embeds updated PreprocessingView into standalone.html and miledeep-devi-fisheries.html.
4. Updates scripts/verify_preprocessing_flow.py to test the new 3-option structure.
"""

import os
import re

NEW_DASHBOARD_HTML_AND_METHODS = '''  // ============================================
  // 1. FLOOR OVERVIEW & COMPREHENSIVE TELEMETRY DASHBOARD
  // ============================================
  renderFloorOverview(container) {
    let fPlant = '';
    let fPeriod = 'Today';
    let fSpecies = '';

    const updateDashboard = () => {
      // Calculate dynamic telemetry
      const multiplier = fPeriod === 'This Week' ? 6.2 : fPeriod === 'Month to Date' ? 24.5 : 1.0;
      const baseIntake = 13030.0 * multiplier;
      const baseDeheaded = 8722.5 * multiplier;
      const baseGraded = 8695.0 * multiplier;
      const baseVa = 5840.0 * multiplier;
      const baseHonTransfer = 4200.0 * multiplier;
      const baseChemValue = (1.42 * (fPeriod === 'Today' ? 1.0 : 1.15)).toFixed(2);
      const yieldPct = ((baseDeheaded / baseIntake) * 100).toFixed(1);

      const kpiContainer = document.getElementById('preproc-kpi-grid');
      if (kpiContainer) {
        kpiContainer.innerHTML = `
          <!-- 1. RM Intake -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">Today RM Intake</span>
              <span class="text-[10px] text-[#02a8b5] font-bold bg-[#F0FAFC] px-1.5 py-0.5 rounded">3 Plants</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0F172A]">${baseIntake.toLocaleString('en-IN', { maximumFractionDigits: 1 })} <span class="text-xs font-semibold text-[#64748B]">KG</span></span>
              <span class="text-[11px] font-bold text-[#006644] flex items-center gap-0.5">↑ 12.4%</span>
            </div>
            <span class="text-[11px] text-[#64748B] mt-1 block">Live intake across VSP, KKD & PSP docks</span>
          </div>

          <!-- 2. Deheaded Weight -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">Deheaded Recovery</span>
              <span class="text-[10px] text-[#006644] font-bold bg-[#E3FCEF] px-1.5 py-0.5 rounded">${yieldPct}% Yield</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#006644]">${baseDeheaded.toLocaleString('en-IN', { maximumFractionDigits: 1 })} <span class="text-xs font-semibold text-[#64748B]">KG</span></span>
              <span class="text-[11px] font-bold text-[#006644]">Benchmark ≥ 65%</span>
            </div>
            <span class="text-[11px] text-[#64748B] mt-1 block">33.1% head waste recovered for byproduct meal</span>
          </div>

          <!-- 3. Graded Output -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">Graded HLSO</span>
              <span class="text-[10px] text-[#0284C7] font-bold bg-[#F0F9FF] px-1.5 py-0.5 rounded">16/20 Dominant</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0284C7]">${baseGraded.toLocaleString('en-IN', { maximumFractionDigits: 1 })} <span class="text-xs font-semibold text-[#64748B]">KG</span></span>
              <span class="text-[11px] font-bold text-[#0284C7]">99.7% Sized</span>
            </div>
            <span class="text-[11px] text-[#64748B] mt-1 block">Roller grader lines active in Unit-1 and Unit-2</span>
          </div>

          <!-- 4. Value Addition -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">Value Addition Output</span>
              <span class="text-[10px] text-[#8F4D00] font-bold bg-[#FFF0B3] px-1.5 py-0.5 rounded">Nobashi / EZ</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0F172A]">${baseVa.toLocaleString('en-IN', { maximumFractionDigits: 1 })} <span class="text-xs font-semibold text-[#64748B]">KG</span></span>
              <span class="text-[11px] font-bold text-[#8F4D00]">67.2% Direct</span>
            </div>
            <span class="text-[11px] text-[#64748B] mt-1 block">Skewer, Nobashi, and EZ-peel specialty lines</span>
          </div>

          <!-- 5. HON Qty Transfer -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">HON Transfer After VA</span>
              <span class="text-[10px] text-[#02a8b5] font-bold bg-[#F0FAFC] px-1.5 py-0.5 rounded">To Freezers</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0F172A]">${baseHonTransfer.toLocaleString('en-IN', { maximumFractionDigits: 1 })} <span class="text-xs font-semibold text-[#64748B]">KG</span></span>
              <span class="text-[11px] font-bold text-[#02a8b5]">Dispatched</span>
            </div>
            <span class="text-[11px] text-[#64748B] mt-1 block">Transferred to Contact plate & IQF tunnels</span>
          </div>

          <!-- 6. Chemical Inventory -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">Chemical Inventory</span>
              <span class="text-[10px] text-[#006644] font-bold bg-[#E3FCEF] px-1.5 py-0.5 rounded">Stock Stable</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0F172A]">₹ ${baseChemValue} <span class="text-xs font-semibold text-[#64748B]">Cr</span></span>
              <span class="text-[11px] font-bold text-[#006644]">342.5 KG Today</span>
            </div>
            <span class="text-[11px] text-[#64748B] mt-1 block">30,500 KG bonded & floor chemical balance</span>
          </div>
        `;
      }
    };

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- 1. Header with Title & Action Controls -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-1">
          <div>
            <h1 class="text-xl font-extrabold text-[#172B4D] tracking-tight">Pre-Processing Floor Intelligence & Executive Dashboard</h1>
            <p class="text-xs text-[#5E6C84] mt-0.5 font-medium">Real-time floor summary, recovery telemetry, multi-plant sizing metrics & chemical balances</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.openChemPOModal()">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Create Chemical PO</span>
            </button>
            <button class="px-3.5 py-2 bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.Toast.show('Exporting Pre-Processing Summary Report to Excel...', 'info')">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              <span>Export Report</span>
            </button>
          </div>
        </div>

        <!-- 2. Quick Filter Bar -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-3.5 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-end">
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Plant Location</label>
              <select id="preproc-dash-plant" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded-lg font-semibold text-[#0F172A] focus:outline-none focus:border-[#02a8b5]">
                <option value="">All Processing Units</option>
                <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Date Period</label>
              <select id="preproc-dash-period" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded-lg font-semibold text-[#0F172A] focus:outline-none focus:border-[#02a8b5]">
                <option value="Today" selected>Today (Shift A/B)</option>
                <option value="This Week">This Week (Mon-Sun)</option>
                <option value="Month to Date">Month to Date (October 2026)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Species Filter</label>
              <select id="preproc-dash-species" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded-lg font-semibold text-[#0F172A] focus:outline-none focus:border-[#02a8b5]">
                <option value="">All Raw Materials</option>
                <option value="LITOPENAEUS VANNAMEI">LITOPENAEUS VANNAMEI</option>
                <option value="PENAEUS MONODON">PENAEUS MONODON</option>
                <option value="COD">COD</option>
              </select>
            </div>
            <div class="flex items-center gap-2">
              <button id="preproc-dash-apply-btn" class="flex-1 py-1.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter</span>
              </button>
              <button id="preproc-dash-reset-btn" class="px-3.5 py-1.5 bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer">
                ↺
              </button>
            </div>
          </div>
        </div>

        <!-- 3. 6 KPI Metric Cards Grid -->
        <div id="preproc-kpi-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3"></div>

        <!-- 4. Data Visualizations Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Chart 1: Volume & Throughput Trend -->
          <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#02a8b5]"></span>
                <h3 class="text-xs font-bold text-[#172B4D]">Weekly Pre-Processing Throughput Trend (KG)</h3>
              </div>
              <span class="text-[11px] font-bold text-[#006644] bg-[#E3FCEF] px-2 py-0.5 rounded">Target: 12,000 KG / Day</span>
            </div>
            <div class="h-60 relative">
              <canvas id="productionChart" class="w-full h-full"></canvas>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-[#F1F5F9] text-[11px] text-[#64748B]">
              <span>Highest Peak: <strong>14,200 KG (Fri)</strong></span>
              <span>Average Daily Run: <strong>12,575 KG</strong></span>
            </div>
          </div>

          <!-- Chart 2: Yield Recovery by Size Grade -->
          <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#0284C7]"></span>
                <h3 class="text-xs font-bold text-[#172B4D]">Recovery Yield Breakdown by Grade (%)</h3>
              </div>
              <span class="text-[11px] font-bold text-[#006644] bg-[#E3FCEF] px-2 py-0.5 rounded">Benchmark ≥ 65%</span>
            </div>
            <div class="h-60 relative">
              <canvas id="yieldChart" class="w-full h-full"></canvas>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-[#F1F5F9] text-[11px] text-[#64748B]">
              <span>Optimal Yield: <strong>16/20 @ 68.5%</strong></span>
              <span>Weighted Floor Avg: <strong>66.9%</strong></span>
            </div>
          </div>
        </div>

        <!-- 5. Secondary Data Cards: Stage Flow Telemetry & Chemical Inventory Matrix -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Flow Telemetry Card -->
          <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <h3 class="text-xs font-bold text-[#172B4D]">Floor Flow & Process Stage Conversion</h3>
              <span class="text-[11px] text-[#5E6C84]">Shift A Telemetry</span>
            </div>
            <div class="space-y-3">
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-[#0F172A]">1. Raw Intake Received</span>
                  <span class="text-[#02a8b5]">13,030 KG (100%)</span>
                </div>
                <div class="w-full bg-[#F1F5F9] rounded-full h-2">
                  <div class="bg-[#02a8b5] h-2 rounded-full" style="width: 100%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-[#0F172A]">2. Deheaded Meat Output</span>
                  <span class="text-[#006644]">8,722.5 KG (66.9% Recovery)</span>
                </div>
                <div class="w-full bg-[#F1F5F9] rounded-full h-2">
                  <div class="bg-[#006644] h-2 rounded-full" style="width: 66.9%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-[#0F172A]">3. Roller Graded & Sized</span>
                  <span class="text-[#0284C7]">8,695 KG (99.7% Sizing Accuracy)</span>
                </div>
                <div class="w-full bg-[#F1F5F9] rounded-full h-2">
                  <div class="bg-[#0284C7] h-2 rounded-full" style="width: 66.7%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-[#0F172A]">4. Value Addition Allocated</span>
                  <span class="text-[#8F4D00]">5,840 KG (67.2% Direct VA)</span>
                </div>
                <div class="w-full bg-[#F1F5F9] rounded-full h-2">
                  <div class="bg-[#8F4D00] h-2 rounded-full" style="width: 44.8%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-[#0F172A]">5. HON Freezer Transfer Dispatched</span>
                  <span class="text-[#02a8b5]">4,200 KG (Packed & Dispatched)</span>
                </div>
                <div class="w-full bg-[#F1F5F9] rounded-full h-2">
                  <div class="bg-[#02a8b5] h-2 rounded-full" style="width: 32.2%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Chemical Bath Matrix Card -->
          <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <h3 class="text-xs font-bold text-[#172B4D]">Active Chemical Bath Dosage & Stock Balance</h3>
              <a href="#/preprocessing/chemical-screens/chemical-pos" class="text-[11px] font-bold text-[#02a8b5] hover:underline">View Chemical Pos →</a>
            </div>
            <div class="space-y-3">
              <div class="p-2.5 bg-[#FAFBFC] rounded-lg border border-[#EBECF0] flex items-center justify-between">
                <div>
                  <span class="text-xs font-bold text-[#0F172A]">ALTESA NEO S100 (NP)</span>
                  <span class="text-[11px] text-[#64748B] block">Non-phosphate treatment bath · Unit-1 (VSP)</span>
                </div>
                <div class="text-right">
                  <span class="text-xs font-extrabold text-[#0F172A]">1,250 KG Stock</span>
                  <span class="text-[11px] text-[#006644] font-semibold block">Dosed: 85 KG</span>
                </div>
              </div>
              <div class="p-2.5 bg-[#FAFBFC] rounded-lg border border-[#EBECF0] flex items-center justify-between">
                <div>
                  <span class="text-xs font-bold text-[#0F172A]">CARNAL 659 S ADVANCED (STPP)</span>
                  <span class="text-[11px] text-[#64748B] block">Standard moisture retention · Unit-5 (JPT)</span>
                </div>
                <div class="text-right">
                  <span class="text-xs font-extrabold text-[#0F172A]">920 KG Stock</span>
                  <span class="text-[11px] text-[#006644] font-semibold block">Dosed: 120 KG</span>
                </div>
              </div>
              <div class="p-2.5 bg-[#FAFBFC] rounded-lg border border-[#EBECF0] flex items-center justify-between">
                <div>
                  <span class="text-xs font-bold text-[#0F172A]">CARFOSEL B 940 (STPP)</span>
                  <span class="text-[11px] text-[#64748B] block">Export grade soaking line · Unit-2 (KKD)</span>
                </div>
                <div class="text-right">
                  <span class="text-xs font-extrabold text-[#0F172A]">1,580 KG Stock</span>
                  <span class="text-[11px] text-[#006644] font-semibold block">Dosed: 95 KG</span>
                </div>
              </div>
              <div class="p-2.5 bg-[#FAFBFC] rounded-lg border border-[#EBECF0] flex items-center justify-between">
                <div>
                  <span class="text-xs font-bold text-[#0F172A]">BEKAPLUS FS (BLEND)</span>
                  <span class="text-[11px] text-[#64748B] block">Specialty glaze preservation · Temp Controlled</span>
                </div>
                <div class="text-right">
                  <span class="text-xs font-extrabold text-[#0F172A]">640 KG Stock</span>
                  <span class="text-[11px] text-[#006644] font-semibold block">Dosed: 42.5 KG</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 6. Active Plant-Wise Pre-Processing Floor Telemetry Table -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#EBECF0]">
            <div>
              <h3 class="text-xs font-bold text-[#172B4D]">Plant-Wise Floor Operations & Intake Batch Telemetry</h3>
              <p class="text-[11px] text-[#5E6C84]">Active lines across Visakhapatnam, Kakinada, and Pasarlapudi facilities</p>
            </div>
            <span class="text-xs font-bold text-[#02a8b5] bg-[#F0FAFC] px-2.5 py-1 rounded-lg border border-[#02a8b5]/20">3 Plants Active</span>
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th class="px-4 py-3">Plant Facility</th>
                  <th class="px-4 py-3">Raw Intake (KG)</th>
                  <th class="px-4 py-3">Deheaded Output (KG)</th>
                  <th class="px-4 py-3">Recovery Yield (%)</th>
                  <th class="px-4 py-3">Graded Output (KG)</th>
                  <th class="px-4 py-3">Value Addition (KG)</th>
                  <th class="px-4 py-3">Chemical Bath</th>
                  <th class="px-4 py-3">Line Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9]">
                <tr class="hover:bg-[#F8FAFC] transition-colors">
                  <td class="px-4 py-3 font-bold text-[#0F172A]">DFL UNIT-1 (VSP)</td>
                  <td class="px-4 py-3 font-semibold text-[#0F172A]">4,800.0</td>
                  <td class="px-4 py-3 font-semibold text-[#006644]">3,216.0</td>
                  <td class="px-4 py-3 font-bold text-[#006644]">67.0%</td>
                  <td class="px-4 py-3 text-[#0F172A]">3,205.0</td>
                  <td class="px-4 py-3 text-[#0F172A]">2,150.0</td>
                  <td class="px-4 py-3 text-[#64748B]">ALTESA NEO S100</td>
                  <td class="px-4 py-3"><span class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#E3FCEF] text-[#006644]">Running</span></td>
                </tr>
                <tr class="hover:bg-[#F8FAFC] transition-colors">
                  <td class="px-4 py-3 font-bold text-[#0F172A]">DFL UNIT-2 (KKD)</td>
                  <td class="px-4 py-3 font-semibold text-[#0F172A]">5,230.0</td>
                  <td class="px-4 py-3 font-semibold text-[#006644]">3,498.9</td>
                  <td class="px-4 py-3 font-bold text-[#006644]">66.9%</td>
                  <td class="px-4 py-3 text-[#0F172A]">3,490.0</td>
                  <td class="px-4 py-3 text-[#0F172A]">2,340.0</td>
                  <td class="px-4 py-3 text-[#64748B]">CARFOSEL B 940</td>
                  <td class="px-4 py-3"><span class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#E3FCEF] text-[#006644]">Running</span></td>
                </tr>
                <tr class="hover:bg-[#F8FAFC] transition-colors">
                  <td class="px-4 py-3 font-bold text-[#0F172A]">DFL UNIT-3 (PSP)</td>
                  <td class="px-4 py-3 font-semibold text-[#0F172A]">3,000.0</td>
                  <td class="px-4 py-3 font-semibold text-[#006644]">2,007.6</td>
                  <td class="px-4 py-3 font-bold text-[#006644]">66.9%</td>
                  <td class="px-4 py-3 text-[#0F172A]">2,000.0</td>
                  <td class="px-4 py-3 text-[#0F172A]">1,350.0</td>
                  <td class="px-4 py-3 text-[#64748B]">CARNAL 659 S</td>
                  <td class="px-4 py-3"><span class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#F0F9FF] text-[#0284C7]">Completed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('preproc-dash-apply-btn')?.addEventListener('click', () => {
      fPlant = document.getElementById('preproc-dash-plant')?.value || '';
      fPeriod = document.getElementById('preproc-dash-period')?.value || 'Today';
      fSpecies = document.getElementById('preproc-dash-species')?.value || '';
      updateDashboard();
      this.drawDashboardCharts();
      if (window.Toast) window.Toast.show(`Telemetry filtered for ${fPeriod} (${fPlant || 'All Plants'})`, 'info');
    });

    document.getElementById('preproc-dash-reset-btn')?.addEventListener('click', () => {
      const p = document.getElementById('preproc-dash-plant');
      const pr = document.getElementById('preproc-dash-period');
      const s = document.getElementById('preproc-dash-species');
      if (p) p.value = '';
      if (pr) pr.value = 'Today';
      if (s) s.value = '';
      fPlant = ''; fPeriod = 'Today'; fSpecies = '';
      updateDashboard();
      this.drawDashboardCharts();
      if (window.Toast) window.Toast.show('Dashboard filters reset.', 'info');
    });

    updateDashboard();

    setTimeout(() => {
      this.drawDashboardCharts();
    }, 60);
  },

  drawDashboardCharts() {
    const c1 = document.getElementById('productionChart');
    if (c1 && c1.parentElement) {
      const dpr = window.devicePixelRatio || 1;
      const rect = c1.parentElement.getBoundingClientRect();
      c1.width = (rect.width || 400) * dpr;
      c1.height = (rect.height || 240) * dpr;
      const ctx = c1.getContext('2d');
      ctx.scale(dpr, dpr);
      const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const data = [11200, 12400, 10800, 13030, 14200, 12800, 13600];
      const maxVal = 16000;
      const padLeft = 45, padRight = 20, padTop = 20, padBottom = 25;
      const chartW = rect.width - padLeft - padRight;
      const chartH = rect.height - padTop - padBottom;
      
      // Grid lines
      ctx.strokeStyle = '#F1F5F9';
      ctx.lineWidth = 1;
      ctx.fillStyle = '#64748B';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'right';
      for (let i = 0; i <= 4; i++) {
        const yVal = Math.round((maxVal / 4) * i);
        const y = padTop + chartH - (i / 4) * chartH;
        ctx.beginPath();
        ctx.moveTo(padLeft, y);
        ctx.lineTo(rect.width - padRight, y);
        ctx.stroke();
        ctx.fillText(yVal.toLocaleString(), padLeft - 6, y + 3);
      }

      // Benchmark Target line (12,000)
      const targetY = padTop + chartH - (12000 / maxVal) * chartH;
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 1.2;
      ctx.moveTo(padLeft, targetY);
      ctx.lineTo(rect.width - padRight, targetY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Fill area under curve
      const grad = ctx.createLinearGradient(0, padTop, 0, padTop + chartH);
      grad.addColorStop(0, 'rgba(2, 168, 181, 0.25)');
      grad.addColorStop(1, 'rgba(2, 168, 181, 0.00)');
      
      ctx.beginPath();
      data.forEach((val, idx) => {
        const x = padLeft + (idx / (data.length - 1)) * chartW;
        const y = padTop + chartH - (val / maxVal) * chartH;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.lineTo(padLeft + chartW, padTop + chartH);
      ctx.lineTo(padLeft, padTop + chartH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Line stroke
      ctx.beginPath();
      ctx.strokeStyle = '#02a8b5';
      ctx.lineWidth = 2.5;
      data.forEach((val, idx) => {
        const x = padLeft + (idx / (data.length - 1)) * chartW;
        const y = padTop + chartH - (val / maxVal) * chartH;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Data dots
      data.forEach((val, idx) => {
        const x = padLeft + (idx / (data.length - 1)) * chartW;
        const y = padTop + chartH - (val / maxVal) * chartH;
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#02a8b5';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Labels
      ctx.fillStyle = '#475569';
      ctx.textAlign = 'center';
      labels.forEach((lbl, idx) => {
        const x = padLeft + (idx / (labels.length - 1)) * chartW;
        ctx.fillText(lbl, x, rect.height - 8);
      });
    }

    const c2 = document.getElementById('yieldChart');
    if (c2 && c2.parentElement) {
      const dpr = window.devicePixelRatio || 1;
      const rect = c2.parentElement.getBoundingClientRect();
      c2.width = (rect.width || 400) * dpr;
      c2.height = (rect.height || 240) * dpr;
      const ctx = c2.getContext('2d');
      ctx.scale(dpr, dpr);
      const grades = ['16/20', '21/25', '26/30', '31/40', '41/50'];
      const yields = [68.5, 67.2, 66.0, 64.8, 63.5];
      const padLeft = 45, padRight = 20, padTop = 20, padBottom = 25;
      const chartW = rect.width - padLeft - padRight;
      const chartH = rect.height - padTop - padBottom;
      const barW = chartW / (grades.length * 2);

      // Y-axis
      ctx.fillStyle = '#64748B';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'right';
      for (let i = 0; i <= 4; i++) {
        const yVal = 50 + i * 5;
        const y = padTop + chartH - (i / 4) * chartH;
        ctx.beginPath();
        ctx.strokeStyle = '#F1F5F9';
        ctx.lineWidth = 1;
        ctx.moveTo(padLeft, y);
        ctx.lineTo(rect.width - padRight, y);
        ctx.stroke();
        ctx.fillText(yVal + '%', padLeft - 6, y + 3);
      }

      // Benchmark 65% line
      const benchY = padTop + chartH - ((65 - 50) / 20) * chartH;
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#056A38';
      ctx.lineWidth = 1.2;
      ctx.moveTo(padLeft, benchY);
      ctx.lineTo(rect.width - padRight, benchY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw bars
      grades.forEach((g, idx) => {
        const x = padLeft + idx * (barW * 2) + barW / 2;
        const h = ((yields[idx] - 50) / 20) * chartH;
        const y = padTop + chartH - h;
        
        ctx.fillStyle = idx === 0 ? '#02a8b5' : idx === 1 ? '#008f9a' : '#38bdf8';
        ctx.beginPath();
        ctx.roundRect(x, y, barW, h, [4, 4, 0, 0]);
        ctx.fill();

        // Value text
        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 9.5px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(yields[idx] + '%', x + barW / 2, y - 4);

        // Grade label
        ctx.fillStyle = '#475569';
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText(g, x + barW / 2, rect.height - 8);
      });
    }
  },'''

def update_preprocessing_view_js():
    with open("js/views/preprocessingView.js", "r", encoding="utf-8") as f:
        src = f.read()

    # Replace renderFloorOverview and drawDashboardCharts
    pattern = r'  // ============================================\n  // 1\. FLOOR OVERVIEW & TELEMETRY\n  // ============================================[\s\S]*?  // ============================================\n  // 2\. CHEMICAL INVENTORY & USAGE'
    replacement = NEW_DASHBOARD_HTML_AND_METHODS + "\n\n  // ============================================\n  // 2. CHEMICAL INVENTORY & USAGE"
    src = re.sub(pattern, replacement, src)

    # Fix button 18 hover
    src = src.replace('hover:bg-[#02a8b5]', 'hover:bg-[#008f9a]')

    with open("js/views/preprocessingView.js", "w", encoding="utf-8") as f:
        f.write(src)
    print("  ✓ Updated renderFloorOverview in js/views/preprocessingView.js")

def update_standalone_and_miledeep():
    with open("js/views/preprocessingView.js", "r", encoding="utf-8") as f:
        pv_js = f.read()

    # Convert to standalone format
    standalone_pv = pv_js.replace("export const PreprocessingView = {", "const PreprocessingView = {")
    # Remove imports
    standalone_pv = re.sub(r'import\s+[\s\S]*?from\s+[\'"][^\'"]+[\'"];\s*', '', standalone_pv)

    # Update standalone.html
    with open("standalone.html", "r", encoding="utf-8") as f:
        st = f.read()

    # 1. Update NAV_HIERARCHY in standalone.html
    pattern_nav = r'\{\s*id:\s*["\']preprocessing["\'][\s\S]*?submenus:\s*\[[\s\S]*?\}\s*\]\s*\}'
    from update_preprocessing_three_submenus import PREPROCESSING_NAV_OBJECT
    st = re.sub(pattern_nav, PREPROCESSING_NAV_OBJECT, st)

    # 2. Update PreprocessingView in standalone.html
    st_pv_start = st.find("const PreprocessingView = {")
    st_pv_end = st.find("const ChemicalScreensView = {", st_pv_start)
    if st_pv_end == -1:
        st_pv_end = st.find("const QCView = {", st_pv_start)
    if st_pv_end == -1:
        st_pv_end = st.find("window.PreprocessingView = PreprocessingView;", st_pv_start)

    if st_pv_start != -1 and st_pv_end != -1:
        st = st[:st_pv_start] + standalone_pv.strip() + "\n\n" + st[st_pv_end:]
        print("  ✓ Updated PreprocessingView in standalone.html")
    else:
        print("  ✗ Could not locate PreprocessingView boundaries in standalone.html")

    with open("standalone.html", "w", encoding="utf-8") as f:
        f.write(st)

    # Update miledeep-devi-fisheries.html
    with open("miledeep-devi-fisheries.html", "r", encoding="utf-8") as f:
        md = f.read()

    # 1. Update ADMIN_NAV_HIERARCHY in miledeep-devi-fisheries.html
    md = re.sub(pattern_nav, PREPROCESSING_NAV_OBJECT, md)

    # 2. Update PreprocessingView in miledeep-devi-fisheries.html
    md_pv_start = md.find("const PreprocessingView = {")
    md_pv_end = md.find("const ChemicalScreensView = {", md_pv_start)
    if md_pv_end == -1:
        md_pv_end = md.find("const QCView = {", md_pv_start)
    if md_pv_end == -1:
        md_pv_end = md.find("window.PreprocessingView = PreprocessingView;", md_pv_start)

    if md_pv_start != -1 and md_pv_end != -1:
        md = md[:md_pv_start] + standalone_pv.strip() + "\n\n" + md[md_pv_end:]
        print("  ✓ Updated PreprocessingView in miledeep-devi-fisheries.html")
    else:
        print("  ✗ Could not locate PreprocessingView boundaries in miledeep-devi-fisheries.html")

    with open("miledeep-devi-fisheries.html", "w", encoding="utf-8") as f:
        f.write(md)

def update_test_suite():
    test_file = "scripts/verify_preprocessing_flow.py"
    with open(test_file, "r", encoding="utf-8") as f:
        code = f.read()

    # Update expected submenus
    code = code.replace(
        """    expected_submenus = [
        ('dashboard', 'Dashboard'),
        ('pre-processing', 'Pre Processing'),
        ('production-reports', 'Production Reports'),
        ('chemical-screens', 'Chemical Screens')
    ]""",
        """    expected_submenus = [
        ('dashboard', 'Dashboard'),
        ('operations', 'Operations'),
        ('chemical-screens', 'Chemical Screens')
    ]"""
    )

    # Update expected tabs
    code = re.sub(
        r'expected_tabs = \[[\s\S]*?# Submenu 4: Chemical Screens[\s\S]*?\]',
        """expected_tabs = [
        # Submenu 1: Dashboard
        'overview',
        # Submenu 2: Operations
        'deheading', 'grading', 'rm-received', 'deheading-trackid', 'grading-trackid', 'value-addition', 'hon-qty-transfer',
        # Submenu 3: Chemical Screens
        'chemical-pos', 'received-chemicals', 'chemicals-consumption', 'chemical-received-report', 'chemical-opening-balance', 'chemical-balance-report', 'chemical-payments-list'
    ]""",
        code
    )

    # Update HTML audit in test suite
    code = code.replace(
        """        # Check all 4 Submenus
        submenus = [
            ('dashboard', 'Dashboard'),
            ('pre-processing', 'Pre Processing'),
            ('production-reports', 'Production Reports'),
            ('chemical-screens', 'Chemical Screens')
        ]""",
        """        # Check all 3 Submenus
        submenus = [
            ('dashboard', 'Dashboard'),
            ('operations', 'Operations'),
            ('chemical-screens', 'Chemical Screens')
        ]"""
    )

    with open(test_file, "w", encoding="utf-8") as f:
        f.write(code)
    print(f"  ✓ Updated {test_file} for 3-option, 15-tab structure")

if __name__ == "__main__":
    print("=================================================================")
    print("ENRICHING PREPROCESSING DASHBOARD & SYNCHRONIZING ACROSS FILES")
    print("=================================================================")
    update_preprocessing_view_js()
    update_standalone_and_miledeep()
    update_test_suite()
