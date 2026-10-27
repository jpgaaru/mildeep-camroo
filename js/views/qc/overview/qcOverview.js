// Quality Control — Overview Submodule
export const qcOverview = {
  renderQCOverview(container) {
    container.innerHTML = `
      <div class="space-y-6 w-full animate-fade-in pb-12">
        
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div>
            <h1 class="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight uppercase">
              QC MANAGEMENT PREVIEW
            </h1>
            <p class="text-xs text-slate-500 font-medium mt-0.5">
              Comprehensive Quality Assurance, Lab Testing Verification & Export Risk Monitoring
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button 
              type="button" 
              id="qc-btn-export-excel" 
              class="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#02a8b5] hover:bg-[#00929e] shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <span>Export Full QC Report</span>
            </button>
          </div>
        </div>

        <!-- 1. Search & Filters Card (Image 2) -->
        <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
          <div class="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <div class="flex items-center gap-2 text-xs font-bold text-[#006C7A] uppercase tracking-wider">
              <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              <span>SEARCH & FILTERS</span>
            </div>
            <button type="button" id="qc-filter-reset-btn" class="text-xs font-semibold text-slate-500 hover:text-[#006C7A] flex items-center gap-1 cursor-pointer">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              <span>Reset</span>
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
            <!-- Financial Year -->
            <div>
              <label class="block text-[11px] font-bold text-slate-600 mb-1">Financial Year</label>
              <select id="qc-f-year" class="w-full text-xs font-medium border border-slate-200 rounded-lg px-2.5 py-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#02a8b5]">
                <option value="2026-27" selected>2026-27</option>
                <option value="2025-26">2025-26</option>
                <option value="2024-25">2024-25</option>
              </select>
            </div>

            <!-- Production Plant -->
            <div>
              <label class="block text-[11px] font-bold text-slate-600 mb-1">Production Plant</label>
              <select id="qc-f-plant" class="w-full text-xs font-medium border border-slate-200 rounded-lg px-2.5 py-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select Plant</option>
                <option value="Unit 1">Unit 1 (Visakhapatnam)</option>
                <option value="Unit 2">Unit 2 (Bhimavaram)</option>
                <option value="Unit 3">Unit 3 (Kakinada)</option>
                <option value="Unit 4">Unit 4</option>
                <option value="Unit 5">Unit 5</option>
                <option value="Unit 6">Unit 6</option>
              </select>
            </div>

            <!-- PO -->
            <div>
              <label class="block text-[11px] font-bold text-slate-600 mb-1">PO</label>
              <select id="qc-f-po" class="w-full text-xs font-medium border border-slate-200 rounded-lg px-2.5 py-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select PO</option>
                <option value="PO-US-10021">PO-US-10021</option>
                <option value="PO-US-10044">PO-US-10044</option>
                <option value="PO-US-10072">PO-US-10072</option>
                <option value="PO-US-10088">PO-US-10088</option>
                <option value="PO-US-10104">PO-US-10104</option>
              </select>
            </div>

            <!-- Buyer -->
            <div>
              <label class="block text-[11px] font-bold text-slate-600 mb-1">Buyer</label>
              <select id="qc-f-buyer" class="w-full text-xs font-medium border border-slate-200 rounded-lg px-2.5 py-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select Buyer</option>
                <option value="WALMART">WALMART</option>
                <option value="AQUA STAR">AQUA STAR</option>
                <option value="KROGER">KROGER</option>
                <option value="RED CHAMBER">RED CHAMBER</option>
                <option value="MAZETTA">MAZETTA</option>
                <option value="SYSCO">SYSCO</option>
              </select>
            </div>

            <!-- Destination Country -->
            <div>
              <label class="block text-[11px] font-bold text-slate-600 mb-1">Destination Country</label>
              <select id="qc-f-country" class="w-full text-xs font-medium border border-slate-200 rounded-lg px-2.5 py-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select Country</option>
                <option value="U.S.A.">U.S.A.</option>
                <option value="RUSSIA">RUSSIA</option>
                <option value="VIETNAM">VIETNAM</option>
                <option value="CANADA">CANADA</option>
                <option value="JAPAN">JAPAN</option>
              </select>
            </div>

            <!-- Lab -->
            <div>
              <label class="block text-[11px] font-bold text-slate-600 mb-1">Lab</label>
              <select id="qc-f-lab" class="w-full text-xs font-medium border border-slate-200 rounded-lg px-2.5 py-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select Lab</option>
                <option value="SGS LAB">SGS LAB</option>
                <option value="SMS LAB">SMS LAB</option>
                <option value="In-House Lab">In-House QC Lab</option>
              </select>
            </div>

            <!-- Status + Search Button -->
            <div class="flex flex-col justify-between">
              <div>
                <label class="block text-[11px] font-bold text-slate-600 mb-1">Status</label>
                <select id="qc-f-status" class="w-full text-xs font-medium border border-slate-200 rounded-lg px-2.5 py-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#02a8b5]">
                  <option value="">Select Status</option>
                  <option value="Completed">QC Completed</option>
                  <option value="Pending">QC Pending</option>
                </select>
              </div>
              <button 
                type="button" 
                id="qc-filter-search-btn" 
                class="mt-2 w-full py-2 px-3 rounded-lg text-xs font-bold text-white bg-[#02a8b5] hover:bg-[#00929e] shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 2. 6 Executive KPI Metric Cards (Image 2) -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <!-- TOTAL PO -->
          <div class="rounded-2xl p-4 bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div class="flex items-center justify-between">
              <span class="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">TOTAL PO</span>
              <span class="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center text-xs"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg></span>
            </div>
            <div class="mt-2.5 mb-1">
              <span class="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">563</span>
            </div>
            <span class="text-[10px] font-medium text-slate-400">Calculated - pending POs</span>
          </div>

          <!-- QC COMPLETED -->
          <div class="rounded-2xl p-4 bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div class="flex items-center justify-between">
              <span class="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">QC COMPLETED</span>
              <span class="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg></span>
            </div>
            <div class="mt-2.5 mb-1">
              <span class="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">126</span>
            </div>
            <span class="text-[10px] font-medium text-slate-400">Total monthly QC Status</span>
          </div>

          <!-- QC PENDING -->
          <div class="rounded-2xl p-4 bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div class="flex items-center justify-between">
              <span class="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">QC PENDING</span>
              <span class="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></span>
            </div>
            <div class="mt-2.5 mb-1">
              <span class="text-2xl sm:text-3xl font-black text-amber-600 tracking-tight">437</span>
            </div>
            <span class="text-[10px] font-medium text-slate-400">Total monthly QC Status</span>
          </div>

          <!-- QC COMPLETED % -->
          <div class="rounded-2xl p-4 bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div class="flex items-center justify-between">
              <span class="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">QC COMPLETED %</span>
              <span class="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xs"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 5L5 19M6.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm11 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"/></svg></span>
            </div>
            <div class="mt-2.5 mb-1">
              <span class="text-2xl sm:text-3xl font-black text-purple-700 tracking-tight">22.4%</span>
            </div>
            <span class="text-[10px] font-medium text-slate-400">Total Completed / Total POs</span>
          </div>

          <!-- INTERNAL SAMPLES -->
          <div class="rounded-2xl p-4 bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div class="flex items-center justify-between">
              <span class="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">INTERNAL SAMPLES</span>
              <span class="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-xs"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg></span>
            </div>
            <div class="mt-2.5 mb-1">
              <span class="text-2xl sm:text-3xl font-black text-[#006C7A] tracking-tight">77</span>
            </div>
            <span class="text-[10px] font-medium text-slate-400">Utilized / Dispatched</span>
          </div>

          <!-- EXTERNAL SAMPLES -->
          <div class="rounded-2xl p-4 bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div class="flex items-center justify-between">
              <span class="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">EXTERNAL SAMPLES</span>
              <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg></span>
            </div>
            <div class="mt-2.5 mb-1">
              <span class="text-2xl sm:text-3xl font-black text-indigo-600 tracking-tight">6</span>
            </div>
            <span class="text-[10px] font-medium text-slate-400">Utilized / Dispatched</span>
          </div>
        </div>

        <!-- 3. Charts Section Row 1: Donut Charts & Production Readiness -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- QC Code Status (Donut) -->
          <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#02a8b5]"></span>
              <span>QC Code Status</span>
            </h3>
            <div class="flex flex-col items-center justify-center py-2">
              <div class="relative w-40 h-40">
                <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#F1F5F9" stroke-width="14"></circle>
                  <!-- Pending 77.6% (Orange/Amber) -->
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#F59E0B" stroke-width="14" stroke-dasharray="238.7" stroke-dashoffset="0"></circle>
                  <!-- Completed 22.4% (Teal) -->
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#00A4B7" stroke-width="14" stroke-dasharray="238.7" stroke-dashoffset="185.2"></circle>
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                  <span class="text-lg font-black text-[#0F172A]">563</span>
                  <span class="text-[10px] font-bold text-slate-400 uppercase">Total POs</span>
                </div>
              </div>
              <div class="flex items-center gap-5 mt-4 text-xs font-semibold">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#00A4B7]"></span>
                  <span class="text-slate-600">Completed (22.4%)</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                  <span class="text-slate-600">Pending (77.6%)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Lab Coverage (Donut) -->
          <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#0284C7]"></span>
              <span>Lab Coverage</span>
            </h3>
            <div class="flex flex-col items-center justify-center py-2">
              <div class="relative w-40 h-40">
                <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#F1F5F9" stroke-width="14"></circle>
                  <!-- No Lab Assigned 90.2% (Red) -->
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#EF4444" stroke-width="14" stroke-dasharray="238.7" stroke-dashoffset="0"></circle>
                  <!-- Internal 9.1% (Blue) -->
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#0284C7" stroke-width="14" stroke-dasharray="238.7" stroke-dashoffset="215.3"></circle>
                  <!-- External 0.7% (Indigo) -->
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#6366F1" stroke-width="14" stroke-dasharray="238.7" stroke-dashoffset="213.6"></circle>
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                  <span class="text-lg font-black text-[#0F172A]">83</span>
                  <span class="text-[10px] font-bold text-slate-400 uppercase">Tested</span>
                </div>
              </div>
              <div class="flex items-center justify-center flex-wrap gap-3.5 mt-4 text-[11px] font-semibold">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#0284C7]"></span>
                  <span class="text-slate-600">Internal</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#6366F1]"></span>
                  <span class="text-slate-600">External</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span>
                  <span class="text-slate-600">No Lab (90%)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Production Readiness -->
          <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Production Readiness</span>
            </h3>
            <div class="h-44 flex items-end justify-around gap-2 px-3 pt-6 pb-2 border-b border-slate-100">
              <div class="flex flex-col items-center gap-1 flex-1">
                <span class="text-[10px] font-bold text-emerald-700">284</span>
                <div class="w-full max-w-[42px] bg-[#008080] rounded-t-md transition-all hover:opacity-90" style="height: 125px;"></div>
                <span class="text-[9.5px] font-semibold text-slate-500 mt-1">Ready</span>
              </div>
              <div class="flex flex-col items-center gap-1 flex-1">
                <span class="text-[10px] font-bold text-slate-500">42</span>
                <div class="w-full max-w-[42px] bg-slate-300 rounded-t-md transition-all hover:opacity-90" style="height: 25px;"></div>
                <span class="text-[9.5px] font-semibold text-slate-500 mt-1">Hold</span>
              </div>
              <div class="flex flex-col items-center gap-1 flex-1">
                <span class="text-[10px] font-bold text-slate-500">18</span>
                <div class="w-full max-w-[42px] bg-amber-400 rounded-t-md transition-all hover:opacity-90" style="height: 12px;"></div>
                <span class="text-[9.5px] font-semibold text-slate-500 mt-1">Recheck</span>
              </div>
              <div class="flex flex-col items-center gap-1 flex-1">
                <span class="text-[10px] font-bold text-slate-500">9</span>
                <div class="w-full max-w-[42px] bg-rose-400 rounded-t-md transition-all hover:opacity-90" style="height: 8px;"></div>
                <span class="text-[9.5px] font-semibold text-slate-500 mt-1">Reject</span>
              </div>
            </div>
            <div class="flex items-center justify-between text-[11px] font-semibold text-slate-500 pt-3">
              <span>Verified Lots: <strong class="text-slate-800">353</strong></span>
              <span class="text-emerald-600 font-bold">80.4% Pass Rate</span>
            </div>
          </div>
        </div>

        <!-- 4. Charts Section Row 2: Buyer & Destination Pending Risk (Ranked Horizontal Bars) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Buyer Pending Risk -->
          <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>Buyer Pending Risk</span>
              </h3>
              <span class="text-[10.5px] font-semibold text-slate-400">POs Awaiting QC</span>
            </div>
            <div class="space-y-2.5">
              ${[
                { buyer: 'WALMART', count: 280, pct: 100 },
                { buyer: 'AQUA STAR', count: 160, pct: 57 },
                { buyer: 'KROGER', count: 135, pct: 48 },
                { buyer: 'RED CHAMBER', count: 65, pct: 23 },
                { buyer: 'MAZETTA', count: 50, pct: 18 },
                { buyer: 'SYSCO', count: 45, pct: 16 },
                { buyer: 'US FOODS', count: 35, pct: 12 },
                { buyer: 'SEAFOOD CO', count: 25, pct: 9 }
              ].map(b => `
                <div class="flex items-center gap-3 text-xs">
                  <span class="w-24 text-[11px] font-bold text-slate-600 truncate">${b.buyer}</span>
                  <div class="flex-1 bg-slate-100 h-4 rounded-md overflow-hidden">
                    <div class="bg-rose-500 h-full rounded-md transition-all duration-300" style="width: ${b.pct}%;"></div>
                  </div>
                  <span class="w-8 text-right font-extrabold text-slate-700 text-[11px]">${b.count}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Destination Pending Risk -->
          <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Destination Pending Risk</span>
              </h3>
              <span class="text-[10.5px] font-semibold text-slate-400">Risk by Target Country</span>
            </div>
            <div class="space-y-2.5">
              ${[
                { country: 'U.S.A.', count: 380, pct: 100 },
                { country: 'RUSSIA', count: 90, pct: 24 },
                { country: 'VIETNAM', count: 60, pct: 16 },
                { country: 'CANADA', count: 20, pct: 6 },
                { country: 'JAPAN', count: 18, pct: 5 },
                { country: 'NEW ZEALAND', count: 12, pct: 3.5 },
                { country: 'ALGERIA', count: 8, pct: 2.2 },
                { country: 'OTHER', count: 6, pct: 1.8 }
              ].map(c => `
                <div class="flex items-center gap-3 text-xs">
                  <span class="w-24 text-[11px] font-bold text-slate-600 truncate">${c.country}</span>
                  <div class="flex-1 bg-slate-100 h-4 rounded-md overflow-hidden">
                    <div class="bg-[#EA580C] h-full rounded-md transition-all duration-300" style="width: ${c.pct}%;"></div>
                  </div>
                  <span class="w-8 text-right font-extrabold text-slate-700 text-[11px]">${c.count}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- 5. Charts Section Row 3: QC Completed vs Pending & Center/Supplier Quantity -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- QC Completed Count and Pending Count -->
          <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              QC Completed vs Pending Count
            </h3>
            <div class="h-44 flex items-end justify-between gap-1.5 px-2 pt-6 pb-2 border-b border-slate-100">
              ${[
                { m: 'Mar 26', c: 110, p: 25 },
                { m: 'Apr 26', c: 95, p: 30 },
                { m: 'Jul 26', c: 120, p: 20 },
                { m: 'Aug 26', c: 145, p: 15 },
                { m: 'Sep 26', c: 105, p: 35 },
                { m: 'Oct 26', c: 80, p: 12 }
              ].map(d => `
                <div class="flex flex-col items-center gap-1 flex-1">
                  <div class="w-full flex items-end justify-center gap-1 h-32">
                    <div class="w-3 bg-emerald-600 rounded-t-sm" style="height: ${Math.round(d.c * 0.8)}px;" title="Completed: ${d.c}"></div>
                    <div class="w-3 bg-amber-500 rounded-t-sm" style="height: ${Math.round(d.p * 0.8)}px;" title="Pending: ${d.p}"></div>
                  </div>
                  <span class="text-[9px] font-semibold text-slate-500 mt-1">${d.m}</span>
                </div>
              `).join('')}
            </div>
            <div class="flex items-center justify-center gap-4 text-[10.5px] font-bold text-slate-500 pt-3">
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-600"></span> Completed</span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-amber-500"></span> Pending</span>
            </div>
          </div>

          <!-- Center Wise Quantity -->
          <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Center Wise Quantity
            </h3>
            <div class="h-44 flex items-end justify-around gap-2 px-2 pt-6 pb-2 border-b border-slate-100">
              ${[
                { c: 'Vizag', h: 105, v: '185 MT' },
                { c: 'Bhimavaram', h: 140, v: '260 MT' },
                { c: 'Kakinada', h: 55, v: '95 MT' },
                { c: 'Nellore', h: 65, v: '110 MT' },
                { c: 'Ongole', h: 120, v: '210 MT' }
              ].map(ct => `
                <div class="flex flex-col items-center gap-1 flex-1">
                  <span class="text-[9px] font-bold text-slate-600">${ct.v}</span>
                  <div class="w-5 bg-emerald-600 rounded-t-sm hover:opacity-90" style="height: ${ct.h}px;"></div>
                  <span class="text-[9px] font-semibold text-slate-500 mt-1 truncate max-w-[45px]">${ct.c}</span>
                </div>
              `).join('')}
            </div>
            <div class="text-center text-[10.5px] font-bold text-emerald-700 pt-3">
              Total Inflow: 860 Metric Tons
            </div>
          </div>

          <!-- Supplier Wise Quantity -->
          <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Supplier Wise Quality Score
            </h3>
            <div class="h-44 flex items-end justify-around gap-2 px-2 pt-6 pb-2 border-b border-slate-100">
              ${[
                { s: 'Sri Balaji', h: 135, r: 0 },
                { s: 'Siva Aqua', h: 105, r: 5 },
                { s: 'K Gowri', h: 80, r: 2 },
                { s: 'Kohli Ltd', h: 30, r: 20 },
                { s: 'Jagadesh', h: 65, r: 0 }
              ].map(sp => `
                <div class="flex flex-col items-center gap-1 flex-1">
                  <div class="w-full flex items-end justify-center gap-1 h-32">
                    <div class="w-4 bg-emerald-600 rounded-t-sm" style="height: ${sp.h}px;" title="Pass: ${sp.h}"></div>
                    ${sp.r > 0 ? `<div class="w-2.5 bg-rose-500 rounded-t-sm" style="height: ${sp.r * 2}px;" title="Rejections: ${sp.r}"></div>` : ''}
                  </div>
                  <span class="text-[9px] font-semibold text-slate-500 mt-1 truncate max-w-[42px]">${sp.s}</span>
                </div>
              `).join('')}
            </div>
            <div class="flex items-center justify-center gap-4 text-[10.5px] font-bold text-slate-500 pt-3">
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-600"></span> Positive/Pass</span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-rose-500"></span> Rejection</span>
            </div>
          </div>
        </div>

        <!-- 6. Table 1: Lot Quality & Lab Testing Log (Image 2) -->
        <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 class="text-sm font-bold text-[#0F172A] tracking-tight uppercase flex items-center gap-2">
                <span class="w-2 h-4 rounded-sm bg-[#00A4B7]"></span>
                <span>Lot Quality & Lab Testing Log</span>
              </h2>
              <span class="text-xs text-slate-400">Incoming lot antibiotic ELISA & raw material screen records</span>
            </div>
            <div class="flex items-center gap-2">
              <select id="qc-table-lab-filter" class="text-xs font-semibold border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 focus:bg-white focus:outline-none">
                <option value="All">All Labs</option>
                <option value="SGS LAB">SGS LAB</option>
                <option value="SMS LAB">SMS LAB</option>
                <option value="In-House">In-House Lab</option>
              </select>
              <input 
                type="text" 
                id="qc-lot-search-input" 
                placeholder="Search Lot, Supplier..." 
                class="text-xs border border-slate-200 rounded-lg px-3 py-1.5 w-44 focus:outline-none focus:border-[#02a8b5]"
              />
            </div>
          </div>

          <div class="overflow-x-auto rounded-xl border border-slate-200/70">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-slate-50/80 text-slate-600 border-b border-slate-200 font-bold uppercase text-[10px] tracking-wider select-none">
                  <th class="py-2.5 px-3">Lot No</th>
                  <th class="py-2.5 px-3">Supplier</th>
                  <th class="py-2.5 px-3">Center</th>
                  <th class="py-2.5 px-3">Arrival Date</th>
                  <th class="py-2.5 px-3 text-right">Total Weight</th>
                  <th class="py-2.5 px-3 text-center">Result</th>
                  <th class="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody id="qc-lot-table-body" class="divide-y divide-slate-100 font-medium text-slate-700">
                <!-- Injected via renderLotTable -->
              </tbody>
            </table>
          </div>

          <div class="flex items-center justify-between mt-3 text-xs text-slate-500 pt-2">
            <span>Showing <strong class="text-slate-700">1 to 10</strong> of 100 entries</span>
            <div class="flex items-center gap-1">
              <button class="px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium">Previous</button>
              <button class="px-2.5 py-1 rounded bg-[#02a8b5] text-white font-bold">1</button>
              <button class="px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium">2</button>
              <button class="px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium">3</button>
              <button class="px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium">Next</button>
            </div>
          </div>
        </div>

        <!-- 7. Table 2: PO Grade Lab Availability (Image 2) -->
        <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 class="text-sm font-bold text-[#0F172A] tracking-tight uppercase flex items-center gap-2">
                <span class="w-2 h-4 rounded-sm bg-[#0284C7]"></span>
                <span>PO Grade Lab Availability</span>
              </h2>
              <span class="text-xs text-slate-400">Export purchase orders quality certificate clearance register</span>
            </div>
            <div class="flex items-center gap-2">
              <input 
                type="text" 
                id="qc-po-search-input" 
                placeholder="Search PO, Client, Product..." 
                class="text-xs border border-slate-200 rounded-lg px-3 py-1.5 w-52 focus:outline-none focus:border-[#02a8b5]"
              />
              <button 
                type="button" 
                id="qc-btn-download-po-excel" 
                class="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Download Excel</span>
              </button>
            </div>
          </div>

          <div class="overflow-x-auto rounded-xl border border-slate-200/70">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-slate-50/80 text-slate-600 border-b border-slate-200 font-bold uppercase text-[10px] tracking-wider select-none">
                  <th class="py-2.5 px-3">S.No</th>
                  <th class="py-2.5 px-3">PO NO</th>
                  <th class="py-2.5 px-3">Client</th>
                  <th class="py-2.5 px-3">Brand</th>
                  <th class="py-2.5 px-3">Validity Date</th>
                  <th class="py-2.5 px-3">Country</th>
                  <th class="py-2.5 px-3">Product</th>
                  <th class="py-2.5 px-3">Packing Style</th>
                  <th class="py-2.5 px-3 text-center">Licenced Status</th>
                </tr>
              </thead>
              <tbody id="qc-po-table-body" class="divide-y divide-slate-100 font-medium text-slate-700">
                <!-- Injected via renderPOTable -->
              </tbody>
            </table>
          </div>

          <div class="flex items-center justify-between mt-3 text-xs text-slate-500 pt-2">
            <span>Showing <strong class="text-slate-700">1 to 9</strong> of 507 entries</span>
            <div class="flex items-center gap-1">
              <button class="px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium">Previous</button>
              <button class="px-2.5 py-1 rounded bg-[#02a8b5] text-white font-bold">1</button>
              <button class="px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium">2</button>
              <button class="px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium">3</button>
              <button class="px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium">Next</button>
            </div>
          </div>
        </div>

      </div>
    `;

    this.renderLotTable();
    this.renderPOTable();
    this.bindOverviewEvents();
  },

  renderDailyQCOps(container) {
    // Renders the 3 plant status charts from Image 1
    container.innerHTML = `
      <div class="space-y-6 w-full animate-fade-in pb-12">
        <div class="pt-1">
          <h1 class="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight uppercase">
            PLANT & LAB QUALITY STATUS
          </h1>
          <p class="text-xs text-slate-500 font-medium mt-0.5">
            Unit-wise Code Readiness, Pending Laboratory Test Dispatches & Document Tracking
          </p>
        </div>

        <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
          <div class="flex items-center gap-3">
            <label class="text-xs font-bold text-slate-700">Plant:</label>
            <select class="text-xs border border-slate-200 rounded-lg px-3 py-1.5 w-52 bg-slate-50">
              <option value="">Select Plant...</option>
              <option value="Unit 1">Unit 1</option>
              <option value="Unit 2">Unit 2</option>
              <option value="Unit 3">Unit 3</option>
              <option value="Unit 4">Unit 4</option>
              <option value="Unit 5">Unit 5</option>
              <option value="Unit 6">Unit 6</option>
            </select>
            <button class="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#02a8b5] hover:bg-[#00929e] shadow-xs">
              Search &rarr;
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Code Status By Plant -->
          <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">Code Status By Plant</h3>
            <div class="h-56 flex items-end justify-between gap-1.5 px-2 border-b border-slate-100">
              ${[
                { u: 'Unit 5', o: 315, p: 260 },
                { u: 'Unit 3', o: 90, p: 82 },
                { u: 'Unit 4', o: 70, p: 35 },
                { u: 'Unit 6', o: 60, p: 30 },
                { u: 'Unit 2', o: 25, p: 25 },
                { u: 'Unit 1', o: 10, p: 10 }
              ].map(d => `
                <div class="flex flex-col items-center gap-1 flex-1">
                  <div class="w-full flex items-end justify-center gap-1 h-44">
                    <div class="w-3.5 bg-[#0284C7] rounded-t-sm" style="height: ${Math.round(d.o * 0.5)}px;" title="Orders: ${d.o}"></div>
                    <div class="w-3.5 bg-emerald-500 rounded-t-sm" style="height: ${Math.round(d.p * 0.5)}px;" title="Code Pending: ${d.p}"></div>
                  </div>
                  <span class="text-[9.5px] font-semibold text-slate-500 mt-1">${d.u}</span>
                </div>
              `).join('')}
            </div>
            <div class="flex items-center justify-center gap-4 text-[10.5px] font-bold text-slate-500 pt-3">
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-[#0284C7]"></span> Orders</span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> Code Pending</span>
            </div>
          </div>

          <!-- Sample Status By Labs -->
          <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">Sample Status By Labs</h3>
            <div class="h-56 flex items-end justify-around gap-4 px-6 border-b border-slate-100">
              <div class="flex flex-col items-center gap-1 flex-1">
                <div class="w-full flex items-end justify-center gap-2 h-44">
                  <div class="w-6 bg-[#0284C7] rounded-t-sm" style="height: 10px;" title="Sent: 5"></div>
                  <div class="w-6 bg-emerald-500 rounded-t-sm" style="height: 10px;" title="Pending: 5"></div>
                </div>
                <span class="text-[10px] font-bold text-slate-600 mt-1">SGS LAB</span>
              </div>
              <div class="flex flex-col items-center gap-1 flex-1">
                <div class="w-full flex items-end justify-center gap-2 h-44">
                  <div class="w-6 bg-[#0284C7] rounded-t-sm" style="height: 130px;" title="Sent: 130"></div>
                  <div class="w-6 bg-emerald-500 rounded-t-sm" style="height: 110px;" title="Pending: 110"></div>
                </div>
                <span class="text-[10px] font-bold text-slate-600 mt-1">SMS LAB</span>
              </div>
            </div>
            <div class="flex items-center justify-center gap-4 text-[10.5px] font-bold text-slate-500 pt-3">
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-[#0284C7]"></span> Samples Sent</span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> Reports Pending</span>
            </div>
          </div>

          <!-- Simp Doc By Plant -->
          <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs flex flex-col justify-between">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">Simp Doc By Plant</h3>
            <div class="h-56 flex flex-col items-center justify-center text-center p-4">
              <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-2">
                <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <span class="text-xs font-bold text-slate-600">All Shipping Documents Cleared</span>
              <span class="text-[10.5px] text-slate-400 mt-1">Zero pending export certificates across operating plants.</span>
            </div>
            <div class="text-center text-[10.5px] font-bold text-emerald-600 pt-3 border-t border-slate-100">
              Compliance 100%
            </div>
          </div>
        </div>
      </div>
    `;
  },

  getLotData() {
    return [
      { lotNo: 'LOT-2026-0012', supplier: 'SRI BALAJI AQUA FARMS', center: 'BHIMAVARAM', date: '01-Oct-2026', weight: '500,000.000 Kgs', result: 'NEGATIVE', status: 'UNASSIGNED' },
      { lotNo: 'LOT-2026-0015', supplier: 'SIVA AQUA FARMS', center: 'NELLORE', date: '29-Sep-2026', weight: '280.000 Kgs', result: 'NEGATIVE', status: 'UNASSIGNED' },
      { lotNo: 'LOT-2026-0021', supplier: 'K GOWRI SANKAR', center: 'AMALAPURAM', date: '25-Sep-2026', weight: '70.000 Kgs', result: 'NEGATIVE', status: 'UNASSIGNED' },
      { lotNo: 'LOT-2026-0033', supplier: 'KOHLI SEAFOODS LTD', center: 'NELLORE', date: '03-Oct-2026', weight: '45.000 Kgs', result: 'POSITIVE', status: 'YES' },
      { lotNo: 'LOT-2026-0044', supplier: 'JAGADESH', center: 'GUDIVADA LOCAL', date: '28-Sep-2026', weight: '2.160 Kgs', result: 'NEGATIVE', status: 'UNASSIGNED' },
      { lotNo: 'LOT-2026-0078', supplier: 'AKSHITHA VISHALU PUSHPA FISH', center: 'RENAL P', date: '15-Sep-2026', weight: '0.947 Kgs', result: 'NEGATIVE', status: 'UNASSIGNED' },
      { lotNo: 'LOT-2026-0091', supplier: 'RAMA RAO NAIDU', center: 'RENAL P', date: '22-Sep-2026', weight: '0.124 Kgs', result: 'NEGATIVE', status: 'UNASSIGNED' },
      { lotNo: 'LOT-2026-0103', supplier: 'VENKATA KRISHNA', center: 'VISAKHAPATNAM', date: '04-Oct-2026', weight: '0.284 Kgs', result: 'NEGATIVE', status: 'UNASSIGNED' },
      { lotNo: 'LOT-2026-0125', supplier: 'CHINTA VENKATA SUBBA RAO', center: 'TANUKU P', date: '02-May-2026', weight: '0.082 Kgs', result: 'NEGATIVE', status: 'NO' },
      { lotNo: 'LOT-2026-0140', supplier: 'RAVI SHANKAR AQUA', center: 'BHIMAVARAM', date: '05-Oct-2026', weight: '12.450 Kgs', result: 'NEGATIVE', status: 'UNASSIGNED' }
    ];
  },

  getPOData() {
    return [
      { sno: 1, poNo: 'PO-US-10021', client: 'DFL EXPORTS', brand: 'PORTICO CLASSIC', validity: '01-Nov-2026', country: 'U.S.A.', product: 'VANNAMEI PD IQF', packing: '10 X 2 LB', status: 'LICENSED' },
      { sno: 2, poNo: 'PO-US-10044', client: 'C.P. FOOD', brand: 'GREAT VALUE', validity: '04-Dec-2026', country: 'U.S.A.', product: 'VANNAMEI EASY PEEL RAW', packing: '6 X 1.8 OZ', status: 'LICENSED' },
      { sno: 3, poNo: 'PO-US-10072', client: 'MAZETTA CO. LLC', brand: 'PORTICO CLASSIC', validity: '15-Oct-2026', country: 'U.S.A.', product: 'VANNAMEI HEADLESS SHELLON', packing: '4 X 2.5 KG', status: 'LICENSED' },
      { sno: 4, poNo: 'PO-US-10088', client: 'SYSCO CORP', brand: 'SYSCO VALUE', validity: '22-Nov-2026', country: 'U.S.A.', product: 'VANNAMEI PUD TAIL-ON', packing: '5 X 1 KG', status: 'LICENSED' },
      { sno: 5, poNo: 'PO-US-10104', client: 'C.P. FOOD', brand: 'GREAT VALUE', validity: '02-Oct-2026', country: 'U.S.A.', product: 'VANNAMEI PDTO IQF', packing: '5 X 2 LB', status: 'LICENSED' },
      { sno: 6, poNo: 'PO-US-10118', client: 'DFL ETC', brand: 'PORTICO IMPERIAL', validity: '18-Nov-2026', country: 'U.S.A.', product: 'VANNAMEI COOKED BLANCHED', packing: '4 X 4 LBS', status: 'LICENSED' },
      { sno: 7, poNo: 'PO-US-10129', client: 'DFL ETC', brand: 'PORTICO IMPERIAL', validity: '25-Nov-2026', country: 'U.S.A.', product: 'VANNAMEI COOKED BLANCHED', packing: '4 X 4 LBS', status: 'LICENSED' },
      { sno: 8, poNo: 'PO-US-10135', client: 'DFL ETC', brand: 'PORTICO CLASSIC', validity: '08-Dec-2026', country: 'U.S.A.', product: 'VANNAMEI RAW HEADLESS IQF', packing: '4 X 2.5 KG', status: 'LICENSED' },
      { sno: 9, poNo: 'PO-US-10142', client: 'WALMART STORES', brand: 'GREAT VALUE', validity: '12-Dec-2026', country: 'U.S.A.', product: 'VANNAMEI PD RAW', packing: '10 X 2 LB', status: 'LICENSED' }
    ];
  },

  renderLotTable() {
    const tbody = document.getElementById('qc-lot-table-body');
    if (!tbody) return;

    const data = this.getLotData().filter(r => {
      const q = (this.lotSearchQuery || '').toLowerCase();
      if (!q) return true;
      return r.lotNo.toLowerCase().includes(q) || r.supplier.toLowerCase().includes(q) || r.center.toLowerCase().includes(q);
    });

    tbody.innerHTML = data.map(r => `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="py-2.5 px-3 font-mono font-bold text-[#006C7A]">${r.lotNo}</td>
        <td class="py-2.5 px-3 font-semibold text-slate-800">${r.supplier}</td>
        <td class="py-2.5 px-3 text-slate-600">${r.center}</td>
        <td class="py-2.5 px-3 text-slate-500 font-mono">${r.date}</td>
        <td class="py-2.5 px-3 text-right font-bold text-slate-700">${r.weight}</td>
        <td class="py-2.5 px-3 text-center">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
            r.result === 'POSITIVE' 
              ? 'bg-rose-100 text-rose-700 border border-rose-200' 
              : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
          }">
            ${r.result}
          </span>
        </td>
        <td class="py-2.5 px-3 text-center">
          <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
            r.status === 'YES' 
              ? 'bg-sky-100 text-sky-800 border border-sky-200' 
              : 'bg-slate-100 text-slate-600 border border-slate-200'
          }">
            ${r.status}
          </span>
        </td>
      </tr>
    `).join('');
  },

  renderPOTable() {
    const tbody = document.getElementById('qc-po-table-body');
    if (!tbody) return;

    const data = this.getPOData().filter(r => {
      const q = (this.poSearchQuery || '').toLowerCase();
      if (!q) return true;
      return r.poNo.toLowerCase().includes(q) || r.client.toLowerCase().includes(q) || r.product.toLowerCase().includes(q);
    });

    tbody.innerHTML = data.map(r => `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="py-2.5 px-3 text-slate-400 font-mono">${r.sno}</td>
        <td class="py-2.5 px-3 font-mono font-bold text-[#0284C7]">${r.poNo}</td>
        <td class="py-2.5 px-3 font-semibold text-slate-800">${r.client}</td>
        <td class="py-2.5 px-3 text-slate-600">${r.brand}</td>
        <td class="py-2.5 px-3 text-slate-500 font-mono">${r.validity}</td>
        <td class="py-2.5 px-3 font-semibold text-slate-700">${r.country}</td>
        <td class="py-2.5 px-3 font-bold text-slate-800">${r.product}</td>
        <td class="py-2.5 px-3 text-slate-600">${r.packing}</td>
        <td class="py-2.5 px-3 text-center">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
            ${r.status}
          </span>
        </td>
      </tr>
    `).join('');
  },

  bindOverviewEvents() {
    // Lot search input
    document.getElementById('qc-lot-search-input')?.addEventListener('input', (e) => {
      this.lotSearchQuery = e.target.value.trim();
      this.renderLotTable();
    });

    // PO search input
    document.getElementById('qc-po-search-input')?.addEventListener('input', (e) => {
      this.poSearchQuery = e.target.value.trim();
      this.renderPOTable();
    });

    // Reset button
    document.getElementById('qc-filter-reset-btn')?.addEventListener('click', () => {
      const selects = ['qc-f-plant', 'qc-f-po', 'qc-f-buyer', 'qc-f-country', 'qc-f-lab', 'qc-f-status'];
      selects.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      this.lotSearchQuery = '';
      this.poSearchQuery = '';
      const inp1 = document.getElementById('qc-lot-search-input');
      if (inp1) inp1.value = '';
      const inp2 = document.getElementById('qc-po-search-input');
      if (inp2) inp2.value = '';
      this.renderLotTable();
      this.renderPOTable();
    });

    // Search button
    document.getElementById('qc-filter-search-btn')?.addEventListener('click', () => {
      this.renderLotTable();
      this.renderPOTable();
    });

    // Export Excel buttons
    const exportExcel = (filename, rows) => {
      if (!rows || rows.length === 0) return;
      const headers = Object.keys(rows[0]).join(',');
      const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows.map(e => Object.values(e).map(v => `"${v}"`).join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    document.getElementById('qc-btn-export-excel')?.addEventListener('click', () => {
      exportExcel('QC_Full_Inspection_Report_2026.csv', this.getLotData());
    });

    document.getElementById('qc-btn-download-po-excel')?.addEventListener('click', () => {
      exportExcel('PO_Grade_Lab_Availability_2026.csv', this.getPOData());
    });
  },
  // ==========================================

};
