export const QCView = {
  activeTab: 'qc-overview',
  lotSearchQuery: '',
  poSearchQuery: '',
  labFilter: 'All',

  render(containerId, subPage = 'qc-overview', activeHash = '#/quality/dashboard/qc-overview') {
    const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!container) return;

    this.activeTab = subPage;

    // Standardized Camaroo Shell Container
    container.innerHTML = `
      <div id="qc-tab-bar-container"></div>
      <div id="qc-subpage-content" class="w-full"></div>
    `;

    if (typeof TabBar !== 'undefined' && typeof TabBar.render === 'function') {
      TabBar.render('qc-tab-bar-container', activeHash);
    }

    const subContainer = document.getElementById('qc-subpage-content');
    if (!subContainer) return;

    if (subPage === 'qc-overview' || subPage === 'overview' || !subPage) {
      this.renderQCOverview(subContainer);
    } else if (subPage === 'daily-qc-ops') {
      this.renderDailyQCOps(subContainer);
    } else if (subPage === 'lots-list' || subPage === 'incoming-lots' || subPage === 'lotslist') {
      this.renderLotsList(subContainer, activeHash);
    } else if (subPage === 'ab-report' || subPage === 'antibiotic-testing') {
      this.renderABReport(subContainer, activeHash);
    } else if (subPage === 'rm-report' || subPage === 'rm-testing') {
      this.renderRMReport(subContainer, activeHash);
    } else if (subPage === 'mb-report' || subPage === 'microbiology') {
      this.renderMBReport(subContainer, activeHash);
    } else if (subPage === 'lab-report' || subPage === 'in-house-lab') {
      this.renderLabReport(subContainer, activeHash);
    } else if (subPage === 'external-lab-report' || subPage === 'external-lab') {
      this.renderExternalLabReport(subContainer, activeHash);
        } else if (subPage === 'documentation' || subPage === 'qc-documentation' || subPage === 'qc-operations') {
      this.renderDocumentation(subContainer, activeHash);
    } else if (subPage === 'qc-orders' || subPage === 'orders') {
      this.renderQCOrders(subContainer, activeHash);
    } else if (subPage === 'food-social-audit' || subPage === 'chemical-screening' || subPage === 'screening-records') {
      this.renderFoodSocialAudit(subContainer, activeHash);
    } else if (subPage === 'farm-mill-hatchery-audit' || subPage === 'farm-mill-audit') {
      this.renderFarmMillHatcheryAudit(subContainer, activeHash);
    } else if (subPage === 'hatchery-list' || subPage === 'hatcheries') {
      this.renderHatcheryList(subContainer, activeHash);
    } else {
      if (typeof renderEmptyState === 'function') {
        const tabLabel = subPage.replace(/-/g, ' ');
        subContainer.innerHTML = renderEmptyState({
          title: `No Quality Control Records for ${tabLabel}`,
          description: `The Quality Control register for ${tabLabel} currently has no active records. Full interactive operations are live on the QC Overview Dashboard.`,
          moduleName: "Quality Control (QC)",
          tabName: tabLabel
        });
      }
    }
  },

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
              <span class="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center text-xs">📋</span>
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
              <span class="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">✓</span>
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
              <span class="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">⏳</span>
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
              <span class="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xs">%</span>
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
              <span class="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-xs">🧪</span>
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
              <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">🏢</span>
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
              <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-2">📄</div>
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
  // 1. LOTS LIST
  // ==========================================
  lotsStationFilter: 'All Purchase Station',
  lotsMonthFilter: 'October',
  lotsYearFilter: '2026',
  lotsSearchQuery: '',
  lotsSortField: 'id',
  lotsSortAsc: true,

  getLotsData() {
    return [
      { id: '153934', lot: 'BLS/2627/0143', rmDate: '01-10-2026', type: 'Site Weightment', grader: '—', agent: '—', count: 400.00, weight: 400.00, abStatus: 'Test Pending', station: 'Balsore (BLS)', testDetails: { method: 'Rapid ELISA Kit', collectedBy: 'R. K. Patnaik', lab: 'In-House Lab #1', testTime: '01-10-2026 11:30 AM', antibiotics: 'Nitrofurans (AOZ, AMOZ, AHD, SEM), Chloramphenicol', statusBadge: 'pending' } },
      { id: '153935', lot: 'NLR/2627/0256', rmDate: '01-10-2026', type: 'Site Weightment', grader: '—', agent: '—', count: 4000.00, weight: 40000.00, abStatus: 'POSITIVE', station: 'Nellore (NLR)', testDetails: { method: 'LC-MS/MS Quantitative Screening', collectedBy: 'Dr. Y. V. Rao', lab: 'Nellore Regional Lab', testTime: '01-10-2026 02:15 PM', antibiotics: 'Nitrofurazone SEM detected (0.45 ppb) - Non-Compliant with Export Standard', statusBadge: 'positive' } },
      { id: '153938', lot: 'AVN/2627/1234', rmDate: '04-10-2026', type: 'Site Weightment', grader: 'A.ANNAVARAM', agent: 'ADITYA AQUA FARMS', count: 10.00, weight: 50.00, abStatus: 'Test Pending', station: 'Annavaram (AVN)', testDetails: { method: 'Rapid Nitrofurans Screening Kit', collectedBy: 'S. Naidu', lab: 'In-House Lab #2', testTime: '04-10-2026 09:00 AM', antibiotics: 'Screening in process, incubation underway', statusBadge: 'pending' } },
      { id: '153939', lot: 'ADP/2627/0019', rmDate: '05-10-2026', type: 'Site Weightment', grader: '—', agent: '—', count: 12.00, weight: 500.00, abStatus: 'Test Pending', station: 'Amalapuram (ADP)', testDetails: { method: 'Rapid ELISA Kit', collectedBy: 'M. S. Prasad', lab: 'In-House Lab #1', testTime: '05-10-2026 10:15 AM', antibiotics: 'Screening in process', statusBadge: 'pending' } },
      { id: '153940', lot: 'ADP/2627/0020', rmDate: '05-10-2026', type: 'Site Weightment', grader: '—', agent: '—', count: 100.00, weight: 150.00, abStatus: 'Test Pending', station: 'Amalapuram (ADP)', testDetails: { method: 'Rapid ELISA Kit', collectedBy: 'M. S. Prasad', lab: 'In-House Lab #1', testTime: '05-10-2026 11:00 AM', antibiotics: 'Screening in process', statusBadge: 'pending' } },
      { id: '153941', lot: 'ADP/2627/0021', rmDate: '05-10-2026', type: 'Site Weightment', grader: '—', agent: '—', count: 350.00, weight: 350.00, abStatus: 'Test Pending', station: 'Amalapuram (ADP)', testDetails: { method: 'Rapid ELISA Kit', collectedBy: 'M. S. Prasad', lab: 'In-House Lab #1', testTime: '05-10-2026 12:45 PM', antibiotics: 'Screening in process', statusBadge: 'pending' } },
      { id: '153942', lot: 'AVN/2627/1235', rmDate: '05-10-2026', type: 'Site Weightment', grader: 'D.V.K.VARMA', agent: 'ADITYA AQUA FARMS', count: 1000.00, weight: 150.00, abStatus: 'Test Pending', station: 'Annavaram (AVN)', testDetails: { method: 'Rapid Nitrofurans Screening Kit', collectedBy: 'S. Naidu', lab: 'In-House Lab #2', testTime: '05-10-2026 03:20 PM', antibiotics: 'Screening in process', statusBadge: 'pending' } },
      { id: '153943', lot: 'BLS/2627/0145', rmDate: '06-10-2026', type: 'By Yield', grader: 'LAKSHMI', agent: 'ADITYA AQUA FARMS', count: 2000.00, weight: 15.00, abStatus: 'Test Pending', station: 'Balsore (BLS)', testDetails: { method: 'Rapid ELISA Kit', collectedBy: 'R. K. Patnaik', lab: 'In-House Lab #1', testTime: '06-10-2026 08:30 AM', antibiotics: 'Screening in process', statusBadge: 'pending' } },
      { id: '153944', lot: 'KKD/2627/0312', rmDate: '07-10-2026', type: 'Site Weightment', grader: 'S. RAMA RAO', agent: 'SRI KRISHNA FISHERIES', count: 650.00, weight: 850.00, abStatus: 'NEGATIVE', station: 'Kakinada (KKD)', testDetails: { method: 'LC-MS/MS & Rapid ELISA', collectedBy: 'K. Varma', lab: 'Kakinada Quality Center', testTime: '07-10-2026 09:10 AM', antibiotics: 'All Tested Antibiotics Below Detection Limit (<0.1 ppb)', statusBadge: 'negative' } }
    ];
  },

  renderLotsList(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">LOTS LIST REGISTER</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Lab Operations &bull; Raw Material Incoming Lots &amp; Testing Status</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="lots-btn-export" class="px-3.5 py-2 bg-white hover:bg-slate-50 text-[#1E293B] border border-[#CBD5E1] text-xs font-bold rounded-lg shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="lots-filter-form" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PURCHASE STATION</label>
                <select id="lots-station-select" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All Purchase Station" ${this.lotsStationFilter === 'All Purchase Station' ? 'selected' : ''}>All Purchase Station</option>
                  <option value="Bhimavaram (BVRM)" ${this.lotsStationFilter === 'Bhimavaram (BVRM)' ? 'selected' : ''}>Bhimavaram (BVRM)</option>
                  <option value="Kakinada (KKD)" ${this.lotsStationFilter === 'Kakinada (KKD)' ? 'selected' : ''}>Kakinada (KKD)</option>
                  <option value="Visakhapatnam (VSKP)" ${this.lotsStationFilter === 'Visakhapatnam (VSKP)' ? 'selected' : ''}>Visakhapatnam (VSKP)</option>
                  <option value="Amalapuram (ADP)" ${this.lotsStationFilter === 'Amalapuram (ADP)' ? 'selected' : ''}>Amalapuram (ADP)</option>
                  <option value="Nellore (NLR)" ${this.lotsStationFilter === 'Nellore (NLR)' ? 'selected' : ''}>Nellore (NLR)</option>
                  <option value="Balsore (BLS)" ${this.lotsStationFilter === 'Balsore (BLS)' ? 'selected' : ''}>Balsore (BLS)</option>
                  <option value="Annavaram (AVN)" ${this.lotsStationFilter === 'Annavaram (AVN)' ? 'selected' : ''}>Annavaram (AVN)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">MONTH</label>
                <select id="lots-month-select" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => `<option value="${m}" ${this.lotsMonthFilter === m ? 'selected' : ''}>${m}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="lots-year-select" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['2027', '2026', '2025', '2024', '2023', '2022'].map(y => `<option value="${y}" ${this.lotsYearFilter === y ? 'selected' : ''}>${y}</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="button" id="lots-btn-reset" class="px-4 py-2 bg-white hover:bg-slate-50 text-[#64748B] text-xs font-bold rounded-lg border border-[#CBD5E1] transition-all cursor-pointer">Reset</button>
              <button type="button" id="lots-btn-search" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input type="text" id="lots-search-input" placeholder="Search by Lot No, Grader, Agent, ID..." value="${this.lotsSearchQuery}" class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all"/>
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <div class="flex items-center gap-2">
              <span id="lots-row-count-badge" class="text-xs font-semibold text-[#64748B]"></span>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('id')"><div class="flex items-center gap-1.5"><span>ID</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('lot')"><div class="flex items-center gap-1.5"><span>LOT</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('rmDate')"><div class="flex items-center gap-1.5"><span>Rm Date</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('type')"><div class="flex items-center gap-1.5"><span>Type</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('grader')"><div class="flex items-center gap-1.5"><span>Grader</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('agent')"><div class="flex items-center gap-1.5"><span>Agent</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-right cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('count')"><div class="flex items-center justify-end gap-1.5"><span>Count</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-right cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('weight')"><div class="flex items-center justify-end gap-1.5"><span>Weight</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-center cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortLots('abStatus')"><div class="flex items-center justify-center gap-1.5"><span>AB Status</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="lots-table-tbody" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.bindLotsEvents();
    this.renderLotsTableRows();
  },

  bindLotsEvents() {
    document.getElementById('lots-station-select')?.addEventListener('change', (e) => { this.lotsStationFilter = e.target.value; });
    document.getElementById('lots-month-select')?.addEventListener('change', (e) => { this.lotsMonthFilter = e.target.value; });
    document.getElementById('lots-year-select')?.addEventListener('change', (e) => { this.lotsYearFilter = e.target.value; });
    document.getElementById('lots-btn-reset')?.addEventListener('click', () => {
      this.lotsStationFilter = 'All Purchase Station';
      this.lotsMonthFilter = 'October';
      this.lotsYearFilter = '2026';
      this.lotsSearchQuery = '';
      const st = document.getElementById('lots-station-select'); if (st) st.value = 'All Purchase Station';
      const m = document.getElementById('lots-month-select'); if (m) m.value = 'October';
      const y = document.getElementById('lots-year-select'); if (y) y.value = '2026';
      const s = document.getElementById('lots-search-input'); if (s) s.value = '';
      this.renderLotsTableRows();
    });
    document.getElementById('lots-btn-search')?.addEventListener('click', () => { this.renderLotsTableRows(); });
    document.getElementById('lots-search-input')?.addEventListener('input', (e) => {
      this.lotsSearchQuery = e.target.value.trim();
      this.renderLotsTableRows();
    });
    document.getElementById('lots-btn-export')?.addEventListener('click', () => {
      const data = this.getLotsData();
      const headers = ["ID", "LOT", "Rm Date", "Type", "Grader", "Agent", "Count", "Weight", "AB Status", "Station"];
      const rows = data.map(l => [l.id, l.lot, l.rmDate, l.type, l.grader, l.agent, l.count, l.weight, l.abStatus, l.station]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.map(v => `"${v}"`).join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `LotsList_${this.lotsMonthFilter}_${this.lotsYearFilter}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  },

  sortLots(field) {
    if (this.lotsSortField === field) { this.lotsSortAsc = !this.lotsSortAsc; }
    else { this.lotsSortField = field; this.lotsSortAsc = true; }
    this.renderLotsTableRows();
  },

  renderLotsTableRows() {
    const tbody = document.getElementById('lots-table-tbody');
    if (!tbody) return;
    let rows = this.getLotsData();
    if (this.lotsStationFilter && this.lotsStationFilter !== 'All Purchase Station') {
      rows = rows.filter(r => r.station === this.lotsStationFilter);
    }
    if (this.lotsSearchQuery) {
      const q = this.lotsSearchQuery.toLowerCase();
      rows = rows.filter(r => r.id.toLowerCase().includes(q) || r.lot.toLowerCase().includes(q) || r.rmDate.toLowerCase().includes(q) || r.type.toLowerCase().includes(q) || r.grader.toLowerCase().includes(q) || r.agent.toLowerCase().includes(q) || r.abStatus.toLowerCase().includes(q));
    }
    rows.sort((a, b) => {
      let va = a[this.lotsSortField]; let vb = b[this.lotsSortField];
      if (typeof va === 'number' && typeof vb === 'number') return this.lotsSortAsc ? va - vb : vb - va;
      va = (va || '').toString().toLowerCase(); vb = (vb || '').toString().toLowerCase();
      return this.lotsSortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
    });

    const badgeEl = document.getElementById('lots-row-count-badge');
    if (badgeEl) badgeEl.textContent = `Showing ${rows.length} lots`;

    if (rows.length === 0) {
      tbody.innerHTML = `<tr><td colspan="10" class="py-12 text-center text-[#94A3B8]">No matching Lots found for the selected station and criteria.</td></tr>`;
      return;
    }

    tbody.innerHTML = rows.map((lot, idx) => {
      let statusBadgeClass = 'bg-[#006C7A]/10 text-[#006C7A] border border-[#00A4B7]/30';
      if (lot.abStatus === 'POSITIVE') statusBadgeClass = 'bg-rose-50 text-rose-700 border border-rose-200';
      else if (lot.abStatus === 'NEGATIVE') statusBadgeClass = 'bg-emerald-50 text-emerald-700 border border-emerald-200';

      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors ${idx % 2 === 1 ? 'bg-slate-50/40' : ''}">
          <td class="py-3 px-4 font-bold text-[#1E293B]">${lot.id}</td>
          <td class="py-3 px-4 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="QCView.openLotDetailModal('${lot.id}')">${lot.lot}</td>
          <td class="py-3 px-4 text-[#64748B] whitespace-nowrap">${lot.rmDate}</td>
          <td class="py-3 px-4 text-[#334155]">${lot.type}</td>
          <td class="py-3 px-4 text-[#334155]">${lot.grader}</td>
          <td class="py-3 px-4 text-[#334155]">${lot.agent}</td>
          <td class="py-3 px-4 text-right font-medium text-[#1E293B]">${Number(lot.count).toFixed(2)}</td>
          <td class="py-3 px-4 text-right font-medium text-[#1E293B]">${Number(lot.weight).toFixed(2)}</td>
          <td class="py-3 px-4 text-center">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${statusBadgeClass}">
              ${lot.abStatus}
            </span>
          </td>
          <td class="py-3 px-4 text-center">
            <button type="button" onclick="QCView.openLotDetailModal('${lot.id}')" class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center" title="View Lot & Lab Details">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  openLotDetailModal(lotId) {
    const lot = this.getLotsData().find(l => l.id === lotId);
    if (!lot) return;
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;
    m.open({
      title: `LOT LAB & TESTING RECORD — ${lot.lot}`,
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs text-[#1E293B]">
          <div class="flex items-center justify-between p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl">
            <div>
              <div class="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Lot Identifier</div>
              <div class="text-base font-extrabold text-[#1E293B]">${lot.lot} <span class="text-xs font-semibold text-[#64748B]">(ID: ${lot.id})</span></div>
            </div>
            <div class="text-right">
              <div class="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Antibiotic Status</div>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${lot.abStatus === 'POSITIVE' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-[#006C7A]/10 text-[#006C7A] border border-[#00A4B7]/30'}">
                ${lot.abStatus}
              </span>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-4 bg-white border border-[#CBD5E1] rounded-xl space-y-2.5">
              <div class="text-[11px] font-bold uppercase tracking-wider text-[#006C7A] pb-1 border-b border-[#F1F5F9]">Purchase & Receiving Details</div>
              <div class="flex justify-between py-1 border-b border-slate-50"><span class="text-[#64748B]">RM Receiving Date:</span><span class="font-semibold text-[#1E293B]">${lot.rmDate}</span></div>
              <div class="flex justify-between py-1 border-b border-slate-50"><span class="text-[#64748B]">Weighment Station:</span><span class="font-semibold text-[#1E293B]">${lot.station}</span></div>
              <div class="flex justify-between py-1 border-b border-slate-50"><span class="text-[#64748B]">Purchase Type:</span><span class="font-semibold text-[#1E293B]">${lot.type}</span></div>
              <div class="flex justify-between py-1 border-b border-slate-50"><span class="text-[#64748B]">Grader Name:</span><span class="font-semibold text-[#1E293B]">${lot.grader}</span></div>
              <div class="flex justify-between py-1"><span class="text-[#64748B]">Agent / Farmer:</span><span class="font-semibold text-[#1E293B]">${lot.agent}</span></div>
            </div>
            <div class="p-4 bg-white border border-[#CBD5E1] rounded-xl space-y-2.5">
              <div class="text-[11px] font-bold uppercase tracking-wider text-[#006C7A] pb-1 border-b border-[#F1F5F9]">Quantity & Lab Testing Protocol</div>
              <div class="flex justify-between py-1 border-b border-slate-50"><span class="text-[#64748B]">Pcs / Count:</span><span class="font-bold text-[#1E293B]">${Number(lot.count).toFixed(2)}</span></div>
              <div class="flex justify-between py-1 border-b border-slate-50"><span class="text-[#64748B]">Total Weight:</span><span class="font-bold text-[#1E293B]">${Number(lot.weight).toFixed(2)} Kg</span></div>
              <div class="flex justify-between py-1 border-b border-slate-50"><span class="text-[#64748B]">Testing Method:</span><span class="font-semibold text-[#1E293B]">${lot.testDetails.method}</span></div>
              <div class="flex justify-between py-1 border-b border-slate-50"><span class="text-[#64748B]">Lab & Technician:</span><span class="font-semibold text-[#1E293B]">${lot.testDetails.lab} (${lot.testDetails.collectedBy})</span></div>
              <div class="flex justify-between py-1"><span class="text-[#64748B]">Sampling Timestamp:</span><span class="font-semibold text-[#1E293B]">${lot.testDetails.testTime}</span></div>
            </div>
          </div>
          <div class="p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl">
            <div class="text-[11px] font-bold uppercase tracking-wider text-[#006C7A] mb-1.5">Antibiotic Residue Screening Summary</div>
            <p class="text-xs text-[#334155] leading-relaxed">${lot.testDetails.antibiotics}. Testing conducted strictly according to MPEDA & EIC export standards.</p>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Close', type: 'secondary', onClick: (modal) => modal.close() },
        { label: 'Print Certificate', type: 'primary', onClick: () => window.print() }
      ]
    });
  },

  // ==========================================
  // 2. ANTIBIOTIC (AB) REPORT (WITH POPUP MODAL)
  // ==========================================
  abSelectedYear: '2026',
  abSelectedMonth: 'October',
  abSelectedPlant: 'DEVI FISHERIES LIMITED (UNIT-5)',
  abSearchQuery: '',
  abSortField: 'reportId',
  abSortAsc: false,

  abReportsData: [
    { reportId: 'AB-2026-10-01', analysisDate: '01/10/2026', reportDate: '02/10/2026', totalReports: 12, dayTotal: 8, nightTotal: 4, plant: 'DEVI FISHERIES LIMITED (UNIT-5)', status: 'Approved' },
    { reportId: 'AB-2026-10-02', analysisDate: '02/10/2026', reportDate: '03/10/2026', totalReports: 15, dayTotal: 10, nightTotal: 5, plant: 'DEVI FISHERIES LIMITED (UNIT-5)', status: 'Approved' },
    { reportId: 'AB-2026-10-04', analysisDate: '04/10/2026', reportDate: '05/10/2026', totalReports: 9, dayTotal: 6, nightTotal: 3, plant: 'DEVI FISHERIES LIMITED (UNIT-5)', status: 'Approved' },
    { reportId: 'AB-2026-10-05', analysisDate: '05/10/2026', reportDate: '06/10/2026', totalReports: 14, dayTotal: 9, nightTotal: 5, plant: 'DEVI FISHERIES LIMITED (UNIT-5)', status: 'Approved' },
    { reportId: 'AB-2026-10-06', analysisDate: '06/10/2026', reportDate: '07/10/2026', totalReports: 11, dayTotal: 7, nightTotal: 4, plant: 'DEVI FISHERIES LIMITED (UNIT-5)', status: 'Approved' },
    { reportId: 'AB-2026-10-07', analysisDate: '07/10/2026', reportDate: '08/10/2026', totalReports: 13, dayTotal: 8, nightTotal: 5, plant: 'DEVI FISHERIES LIMITED (UNIT-5)', status: 'Approved' },
    { reportId: 'AB-2026-10-08', analysisDate: '08/10/2026', reportDate: '09/10/2026', totalReports: 16, dayTotal: 11, nightTotal: 5, plant: 'DEVI FISHERIES LIMITED (UNIT-5)', status: 'Approved' }
  ],

  abTestLines: [
    { id: 'TL-101', reportId: 'AB-2026-10-01', lotNo: 'BLS/2627/0143', analysisDate: '01/10/2026', reportDate: '02/10/2026', sampleType: 'Harvest', sampleDetails: 'Vannamei Pond #12', count: 400.00, quantity: 400.00, parameter: 'Rapid ELISA', loadingStatus: 'Loaded', shift: 'DAY', testedBy: 'CH.SWATHI PADMA', verifiedBy: 'CH.SWATHI PADMA', plant: 'DEVI FISHERIES LIMITED (UNIT-5)', sulphite: '10.2 ppm', remarks: 'Clear and compliant', aoz: 'ND (<0.1)', sem: 'ND (<0.1)', cap: 'ND (<0.1)', ahd: 'ND (<0.1)', amoz: 'ND (<0.1)', result: 'Negative (Pass)' },
    { id: 'TL-102', reportId: 'AB-2026-10-01', lotNo: 'NLR/2627/0256', analysisDate: '01/10/2026', reportDate: '02/10/2026', sampleType: 'Pre-Harvest', sampleDetails: 'Vannamei Pond #04', count: 4000.00, quantity: 40000.00, parameter: 'LC-MS/MS', loadingStatus: 'Hold', shift: 'NIGHT', testedBy: 'Dr. Y. V. Rao', verifiedBy: 'CH.SWATHI PADMA', plant: 'DEVI FISHERIES LIMITED (UNIT-5)', sulphite: '14.0 ppm', remarks: 'SEM residue detected above EU MRL', aoz: 'ND (<0.1)', sem: '0.45 ppb', cap: 'ND (<0.1)', ahd: 'ND (<0.1)', amoz: 'ND (<0.1)', result: 'Positive (Fail)' }
  ],

  renderABReport(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">ANTIBIOTIC REPORTS LIST</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Lab Operations &bull; Daily Antibiotic (AB) Testing Register</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="ab-btn-create-report" onclick="QCView.openDailyABModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Report</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="ab-filter-form" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="ab-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['2026', '2025', '2024', '2023', '2022'].map(y => `<option value="${y}" ${this.abSelectedYear === y ? 'selected' : ''}>${y}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">MONTH</label>
                <select id="ab-filter-month" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => `<option value="${m}" ${this.abSelectedMonth === m ? 'selected' : ''}>${m}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT</label>
                <select id="ab-filter-plant" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="DEVI FISHERIES LIMITED (UNIT-5)" selected>DEVI FISHERIES LIMITED (UNIT-5)</option>
                  <option value="DEVI FISHERIES LIMITED (UNIT-1)">DEVI FISHERIES LIMITED (UNIT-1)</option>
                  <option value="DEVI FISHERIES LIMITED (UNIT-2)">DEVI FISHERIES LIMITED (UNIT-2)</option>
                  <option value="DEVI FISHERIES LIMITED (UNIT-3)">DEVI FISHERIES LIMITED (UNIT-3)</option>
                </select>
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="button" id="ab-btn-reset" class="px-4 py-2 bg-white hover:bg-slate-50 text-[#64748B] text-xs font-bold rounded-lg border border-[#CBD5E1] transition-all cursor-pointer">Reset</button>
              <button type="button" id="ab-btn-search" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input type="text" id="ab-search-input" placeholder="Search by Report ID, date, plant..." value="${this.abSearchQuery}" class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all"/>
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <div class="flex items-center gap-2">
              <span id="ab-row-count-badge" class="text-xs font-semibold text-[#64748B]"></span>
              <button type="button" id="ab-btn-export-csv" class="px-3.5 py-2 bg-white hover:bg-slate-50 text-[#1E293B] border border-[#CBD5E1] text-xs font-bold rounded-lg shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Export</span>
              </button>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortABReports('reportId')"><div class="flex items-center gap-1.5"><span>Report ID</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortABReports('analysisDate')"><div class="flex items-center gap-1.5"><span>Analysis Date</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortABReports('reportDate')"><div class="flex items-center gap-1.5"><span>Report Date</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-right cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortABReports('totalReports')"><div class="flex items-center justify-end gap-1.5"><span>Total Reports</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-right cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortABReports('dayTotal')"><div class="flex items-center justify-end gap-1.5"><span>Day Total</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-right cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortABReports('nightTotal')"><div class="flex items-center justify-end gap-1.5"><span>Night Total</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="ab-reports-tbody" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.bindABListEvents();
    this.renderABTableRows();
  },

  bindABListEvents() {
    document.getElementById('ab-filter-year')?.addEventListener('change', (e) => { this.abSelectedYear = e.target.value; });
    document.getElementById('ab-filter-month')?.addEventListener('change', (e) => { this.abSelectedMonth = e.target.value; });
    document.getElementById('ab-filter-plant')?.addEventListener('change', (e) => { this.abSelectedPlant = e.target.value; });
    document.getElementById('ab-btn-reset')?.addEventListener('click', () => {
      this.abSelectedYear = '2026'; this.abSelectedMonth = 'October'; this.abSelectedPlant = 'DEVI FISHERIES LIMITED (UNIT-5)'; this.abSearchQuery = '';
      const y = document.getElementById('ab-filter-year'); if (y) y.value = '2026';
      const m = document.getElementById('ab-filter-month'); if (m) m.value = 'October';
      const p = document.getElementById('ab-filter-plant'); if (p) p.value = 'DEVI FISHERIES LIMITED (UNIT-5)';
      const s = document.getElementById('ab-search-input'); if (s) s.value = '';
      this.renderABTableRows();
    });
    document.getElementById('ab-btn-search')?.addEventListener('click', () => { this.renderABTableRows(); });
    document.getElementById('ab-search-input')?.addEventListener('input', (e) => {
      this.abSearchQuery = e.target.value.trim();
      this.renderABTableRows();
    });
    document.getElementById('ab-btn-export-csv')?.addEventListener('click', () => {
      const headers = ["Report ID", "Analysis Date", "Report Date", "Total Reports", "Day Total", "Night Total", "Plant"];
      const rows = this.abReportsData.map(r => [r.reportId, r.analysisDate, r.reportDate, r.totalReports, r.dayTotal, r.nightTotal, r.plant]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.map(v => `"${v}"`).join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Antibiotic_Reports_${this.abSelectedMonth}_${this.abSelectedYear}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  },

  sortABReports(field) {
    if (this.abSortField === field) { this.abSortAsc = !this.abSortAsc; }
    else { this.abSortField = field; this.abSortAsc = true; }
    this.renderABTableRows();
  },

  renderABTableRows() {
    const tbody = document.getElementById('ab-reports-tbody');
    if (!tbody) return;
    let rows = [...this.abReportsData];
    if (this.abSearchQuery) {
      const q = this.abSearchQuery.toLowerCase();
      rows = rows.filter(r => r.reportId.toLowerCase().includes(q) || r.analysisDate.toLowerCase().includes(q) || r.reportDate.toLowerCase().includes(q) || r.plant.toLowerCase().includes(q));
    }
    rows.sort((a, b) => {
      let va = a[this.abSortField]; let vb = b[this.abSortField];
      if (typeof va === 'number' && typeof vb === 'number') return this.abSortAsc ? va - vb : vb - va;
      va = (va || '').toString().toLowerCase(); vb = (vb || '').toString().toLowerCase();
      return this.abSortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
    });

    const badgeEl = document.getElementById('ab-row-count-badge');
    if (badgeEl) badgeEl.textContent = `Showing ${rows.length} reports`;

    if (rows.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="py-12 text-center text-[#94A3B8]">No data available in table</td></tr>`;
      return;
    }

    tbody.innerHTML = rows.map((r, idx) => {
      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors ${idx % 2 === 1 ? 'bg-slate-50/40' : ''}">
          <td class="py-3 px-4 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="QCView.openABReportDetailModal('${r.reportId}')">${r.reportId}</td>
          <td class="py-3 px-4 text-[#64748B] whitespace-nowrap">${r.analysisDate}</td>
          <td class="py-3 px-4 text-[#64748B] whitespace-nowrap">${r.reportDate}</td>
          <td class="py-3 px-4 text-right font-bold text-[#1E293B]">${r.totalReports}</td>
          <td class="py-3 px-4 text-right font-medium text-[#334155]">${r.dayTotal}</td>
          <td class="py-3 px-4 text-right font-medium text-[#334155]">${r.nightTotal}</td>
          <td class="py-3 px-4 text-center">
            <button type="button" onclick="QCView.openABReportDetailModal('${r.reportId}')" class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center" title="View Daily Breakdown">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  // Open Daily AB Report Modal Popup
  openDailyABModal() {
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: 'DAILY LAB AB REPORT',
      size: '2xl',
      content: `
        <div class="space-y-4 text-xs text-[#1E293B]">
          <form id="modal-daily-ab-form" class="space-y-4" onsubmit="event.preventDefault(); QCView.handleModalDailyABSubmit();">
            <!-- Row 1: Lot No, Analysis Date, Report Date, Sample Type -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">LOT NO <span class="text-rose-500">*</span></label>
                <select id="modal-ab-lot" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
                  <option value="">Select Lot</option>
                  <option value="BLS/2627/0143">BLS/2627/0143 (Balsore - 400 Kg)</option>
                  <option value="NLR/2627/0256">NLR/2627/0256 (Nellore - 40000 Kg)</option>
                  <option value="AVN/2627/1234">AVN/2627/1234 (Annavaram - 50 Kg)</option>
                  <option value="ADP/2627/0019">ADP/2627/0019 (Amalapuram - 500 Kg)</option>
                  <option value="ADP/2627/0020">ADP/2627/0020 (Amalapuram - 150 Kg)</option>
                  <option value="ADP/2627/0021">ADP/2627/0021 (Amalapuram - 350 Kg)</option>
                  <option value="AVN/2627/1235">AVN/2627/1235 (Annavaram - 150 Kg)</option>
                  <option value="BLS/2627/0145">BLS/2627/0145 (Balsore - 15 Kg)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">ANALYSIS DATE <span class="text-rose-500">*</span></label>
                <input type="text" id="modal-ab-analysis-date" value="26/10/2026" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">REPORT DATE <span class="text-rose-500">*</span></label>
                <input type="text" id="modal-ab-report-date" value="27/10/2026" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">SAMPLE TYPE</label>
                <select id="modal-ab-sample-type" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
                  <option value="Harvest" selected>Harvest</option>
                  <option value="Pre-Harvest">Pre-Harvest</option>
                  <option value="Plant Receiving">Plant Receiving</option>
                  <option value="Finished Goods">Finished Goods</option>
                </select>
              </div>
            </div>

            <!-- Row 2: Sample Details, Count, Quantity, Parameter -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">SAMPLE DETAILS</label>
                <input type="text" id="modal-ab-sample-details" placeholder="Enter Sample Details" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">COUNT</label>
                <input type="number" step="0.01" id="modal-ab-count" placeholder="Enter Count" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">QUANTITY (KG)</label>
                <input type="number" step="0.01" id="modal-ab-quantity" placeholder="Enter Quantity" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">PARAMETER</label>
                <select id="modal-ab-parameter" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
                  <option value="NA" selected>NA</option>
                  <option value="Rapid ELISA">Rapid ELISA</option>
                  <option value="LC-MS/MS">LC-MS/MS</option>
                </select>
              </div>
            </div>

            <!-- Row 3: Loading Status, Shift, Tested By, Verified By -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">LOADING STATUS</label>
                <select id="modal-ab-loading-status" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
                  <option value="Loaded" selected>Loaded</option>
                  <option value="Pending">Pending</option>
                  <option value="Direct To Plant">Direct To Plant</option>
                  <option value="Hold">Hold</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">SHIFT</label>
                <select id="modal-ab-shift" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
                  <option value="DAY" selected>DAY</option>
                  <option value="NIGHT">NIGHT</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">TESTED BY</label>
                <select id="modal-ab-tested-by" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
                  <option value="CH.SWATHI PADMA" selected>CH.SWATHI PADMA</option>
                  <option value="Dr. Rajesh K. Varma">Dr. Rajesh K. Varma</option>
                  <option value="K. Srinivas">K. Srinivas</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">VERIFIED BY</label>
                <select id="modal-ab-verified-by" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
                  <option value="CH.SWATHI PADMA" selected>CH.SWATHI PADMA</option>
                  <option value="Dr. Rajesh K. Varma">Dr. Rajesh K. Varma</option>
                  <option value="Dr. Y.S. Prasad">Dr. Y.S. Prasad</option>
                </select>
              </div>
            </div>

            <!-- Row 4: Plant, Sulphite, Remarks -->
            <div class="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div class="sm:col-span-3">
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">PLANT</label>
                <select id="modal-ab-plant" class="w-full px-3 py-2 bg-slate-50 border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none">
                  <option value="DEVI FISHERIES LIMITED (UNIT-5)" selected>DEVI FISHERIES LIMITED (UNIT-5)</option>
                </select>
              </div>
              <div class="sm:col-span-3">
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">SULPHITE (PPM)</label>
                <input type="text" id="modal-ab-sulphite" placeholder="Enter Sulphite Quantity" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
              </div>
              <div class="sm:col-span-6">
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">REMARKS</label>
                <input type="text" id="modal-ab-remarks" placeholder="Enter Remarks" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
              </div>
            </div>

            <!-- Row 5: Antibiotic Parameters -->
            <div class="pt-2 border-t border-[#F1F5F9]">
              <div class="text-[11px] font-bold text-[#006C7A] uppercase tracking-wider mb-2">ANTIBIOTIC RESIDUE SCREENING (PPB / RESULT)</div>
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                <div><label class="block text-[10px] font-bold text-[#334155] uppercase mb-1">AOZ</label><input type="text" id="modal-ab-aoz" placeholder="ND (<0.1)" class="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded text-xs"></div>
                <div><label class="block text-[10px] font-bold text-[#334155] uppercase mb-1">SEM</label><input type="text" id="modal-ab-sem" placeholder="ND (<0.1)" class="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded text-xs"></div>
                <div><label class="block text-[10px] font-bold text-[#334155] uppercase mb-1">CAP</label><input type="text" id="modal-ab-cap" placeholder="ND (<0.1)" class="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded text-xs"></div>
                <div><label class="block text-[10px] font-bold text-[#334155] uppercase mb-1">AHD</label><input type="text" id="modal-ab-ahd" placeholder="ND (<0.1)" class="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded text-xs"></div>
                <div><label class="block text-[10px] font-bold text-[#334155] uppercase mb-1">AMOZ</label><input type="text" id="modal-ab-amoz" placeholder="ND (<0.1)" class="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded text-xs"></div>
                <div><label class="block text-[10px] font-bold text-[#334155] uppercase mb-1">RESULT</label><input type="text" id="modal-ab-result" placeholder="Negative" class="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded text-xs"></div>
              </div>
            </div>
          </form>
        </div>
      `,
      footerButtons: [
        { label: 'Close', type: 'secondary', onClick: (modal) => modal.close() },
        { label: 'Submit Daily Report', type: 'primary', onClick: () => QCView.handleModalDailyABSubmit() }
      ]
    });
  },

  handleModalDailyABSubmit() {
    const lotNo = document.getElementById('modal-ab-lot')?.value;
    if (!lotNo) {
      alert('Please select a Lot No.');
      return;
    }
    const analysisDate = document.getElementById('modal-ab-analysis-date')?.value || '26/10/2026';
    const reportDate = document.getElementById('modal-ab-report-date')?.value || '27/10/2026';
    const sampleType = document.getElementById('modal-ab-sample-type')?.value || 'Harvest';
    const sampleDetails = document.getElementById('modal-ab-sample-details')?.value || '';
    const count = parseFloat(document.getElementById('modal-ab-count')?.value || '0');
    const quantity = parseFloat(document.getElementById('modal-ab-quantity')?.value || '0');
    const shift = document.getElementById('modal-ab-shift')?.value || 'DAY';
    const plant = document.getElementById('modal-ab-plant')?.value || 'DEVI FISHERIES LIMITED (UNIT-5)';

    const dateParts = analysisDate.split('/');
    const dateKey = dateParts.length === 3 ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}` : '2026-10-26';
    const reportId = `AB-${dateKey}`;

    const existing = this.abReportsData.find(r => r.reportId === reportId);
    if (existing) {
      existing.totalReports += 1;
      if (shift === 'DAY') existing.dayTotal += 1; else existing.nightTotal += 1;
    } else {
      this.abReportsData.unshift({
        reportId, analysisDate, reportDate, totalReports: 1, dayTotal: shift === 'DAY' ? 1 : 0, nightTotal: shift === 'NIGHT' ? 1 : 0, plant, status: 'Submitted'
      });
    }

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal) ? window.Modal : null;
    if (m && m.close) m.close();

    this.renderABTableRows();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Daily Lab AB Report submitted for Lot ${lotNo}!`, 'success');
    }
  },

  openABReportDetailModal(reportId) {
    const report = this.abReportsData.find(r => r.reportId === reportId);
    if (!report) return;
    const lines = this.abTestLines.filter(l => l.reportId === reportId);
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;
    m.open({
      title: `DAILY ANTIBIOTIC TEST BREAKDOWN — ${report.reportId}`,
      size: 'xl',
      content: `
        <div class="space-y-4 text-xs text-[#1E293B]">
          <div class="flex items-center justify-between p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl">
            <div>
              <div class="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Daily Summary Batch</div>
              <div class="text-sm font-extrabold text-[#1E293B]">${report.reportId} • ${report.analysisDate}</div>
            </div>
            <div class="flex items-center gap-4 text-right">
              <div><span class="text-[#64748B] text-[10px] uppercase font-bold block">Day Shift</span><span class="font-bold text-[#1E293B] text-xs">${report.dayTotal} Tests</span></div>
              <div><span class="text-[#64748B] text-[10px] uppercase font-bold block">Night Shift</span><span class="font-bold text-[#1E293B] text-xs">${report.nightTotal} Tests</span></div>
              <div><span class="text-[#64748B] text-[10px] uppercase font-bold block">Total Tests</span><span class="font-bold text-[#006C7A] text-xs">${report.totalReports} Samples</span></div>
            </div>
          </div>
          <div class="overflow-x-auto rounded-xl border border-[#CBD5E1]">
            <table class="w-full text-left text-xs">
              <thead class="bg-[#F8FAFC] border-b border-[#CBD5E1] text-[11px] font-bold text-[#475569] uppercase">
                <tr>
                  <th class="py-2.5 px-3">Lot No</th><th class="py-2.5 px-3">Sample Type</th><th class="py-2.5 px-3">Shift</th><th class="py-2.5 px-3">Count</th><th class="py-2.5 px-3">Qty (Kg)</th><th class="py-2.5 px-3">AOZ</th><th class="py-2.5 px-3">SEM</th><th class="py-2.5 px-3">CAP</th><th class="py-2.5 px-3">Result</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9]">
                ${lines.length > 0 ? lines.map(l => `
                  <tr class="hover:bg-[#F8FAFC]">
                    <td class="py-2 px-3 font-bold text-[#1E293B]">${l.lotNo}</td>
                    <td class="py-2 px-3 text-[#334155]">${l.sampleType}</td>
                    <td class="py-2 px-3 font-semibold text-[#1E293B]">${l.shift}</td>
                    <td class="py-2 px-3 font-medium text-[#1E293B]">${Number(l.count).toFixed(2)}</td>
                    <td class="py-2 px-3 font-medium text-[#1E293B]">${Number(l.quantity).toFixed(2)}</td>
                    <td class="py-2 px-3 font-mono text-[11px] text-[#334155]">${l.aoz}</td>
                    <td class="py-2 px-3 font-mono text-[11px] text-[#334155]">${l.sem}</td>
                    <td class="py-2 px-3 font-mono text-[11px] text-[#334155]">${l.cap}</td>
                    <td class="py-2 px-3">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${l.result.includes('Positive') ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}">
                        ${l.result}
                      </span>
                    </td>
                  </tr>
                `).join('') : `<tr><td colspan="9" class="py-6 text-center text-[#94A3B8]">All samples in this batch passed rapid standard screen.</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Close', type: 'secondary', onClick: (modal) => modal.close() },
        { label: 'Print Batch Certificate', type: 'primary', onClick: () => window.print() }
      ]
    });
  },

  // ==========================================
  // 3. RM REPORT (RM ANALYSIS REPORTS)
  // ==========================================
  rmSelectedYear: '2026',
  rmSelectedMonth: 'October',
  rmSearchQuery: '',
  rmSortField: 'id',
  rmSortAsc: true,

  rmAnalysisData: [
    { id: '86111', lot: 'MKP/2425/1166', purchaseDate: '01-10-2026', rmDate: '02-10-2026 09:59:44', purchaseType: 'Site Weightment', count: 60.00, weight: 1027.00, abStatus: 'Test Pending', status: 'Report Pending', reason: '—' },
    { id: '86112', lot: 'MKP/2425/1166', purchaseDate: '01-10-2026', rmDate: '02-10-2026 10:00:03', purchaseType: 'Site Weightment', count: 70.00, weight: 4378.00, abStatus: 'Test Pending', status: 'Report Pending', reason: '—' },
    { id: '86113', lot: 'MKP/2425/1168', purchaseDate: '01-10-2026', rmDate: '02-10-2026 10:02:18', purchaseType: 'Site Weightment', count: 50.50, weight: 1176.00, abStatus: 'Test Pending', status: 'Report Pending', reason: '—' },
    { id: '86114', lot: 'MKP/2425/1168', purchaseDate: '01-10-2026', rmDate: '02-10-2026 10:02:37', purchaseType: 'Site Weightment', count: 62.00, weight: 775.00, abStatus: 'Test Pending', status: 'Report Pending', reason: '—' },
    { id: '86115', lot: 'MKP/2425/1168', purchaseDate: '01-10-2026', rmDate: '02-10-2026 10:03:31', purchaseType: 'Site Weightment', count: 65.50, weight: 776.00, abStatus: 'Test Pending', status: 'Report Pending', reason: '—' },
    { id: '86116', lot: 'BLS/2627/0143', purchaseDate: '01-10-2026', rmDate: '02-10-2026 11:15:00', purchaseType: 'Site Weightment', count: 400.00, weight: 400.00, abStatus: 'Negative', status: 'Approved', reason: 'Passed Organoleptic' },
    { id: '86117', lot: 'AVN/2627/1234', purchaseDate: '04-10-2026', rmDate: '04-10-2026 14:20:10', purchaseType: 'Site Weightment', count: 10.00, weight: 50.00, abStatus: 'Negative', status: 'Approved', reason: 'Passed Inspection' }
  ],

  renderRMReport(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">RM ANALYSIS REPORTS</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Lab Operations &bull; Raw Material Physical &amp; Defect Analysis</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="rm-btn-export" class="px-3.5 py-2 bg-white hover:bg-slate-50 text-[#1E293B] border border-[#CBD5E1] text-xs font-bold rounded-lg shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="rm-filter-form" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="rm-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['2026', '2025', '2024', '2023', '2022'].map(y => `<option value="${y}" ${this.rmSelectedYear === y ? 'selected' : ''}>${y}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">MONTH</label>
                <select id="rm-filter-month" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => `<option value="${m}" ${this.rmSelectedMonth === m ? 'selected' : ''}>${m}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">STATUS</label>
                <select id="rm-filter-status" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All" selected>All Statuses</option>
                  <option value="Report Pending">Report Pending</option>
                  <option value="Approved">Approved</option>
                </select>
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="button" id="rm-btn-reset" class="px-4 py-2 bg-white hover:bg-slate-50 text-[#64748B] text-xs font-bold rounded-lg border border-[#CBD5E1] transition-all cursor-pointer">Reset</button>
              <button type="button" id="rm-btn-search" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input type="text" id="rm-search-input" placeholder="Search by Lot Number, ID, Type..." value="${this.rmSearchQuery}" class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all"/>
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <div class="flex items-center gap-2">
              <span id="rm-row-count-badge" class="text-xs font-semibold text-[#64748B]"></span>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortRM('id')"><div class="flex items-center gap-1.5"><span>ID</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortRM('lot')"><div class="flex items-center gap-1.5"><span>Lot Number</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortRM('purchaseDate')"><div class="flex items-center gap-1.5"><span>Purchase Date</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortRM('rmDate')"><div class="flex items-center gap-1.5"><span>Rm Date</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortRM('purchaseType')"><div class="flex items-center gap-1.5"><span>Purchase Type</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-right cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortRM('count')"><div class="flex items-center justify-end gap-1.5"><span>Count</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-right cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortRM('weight')"><div class="flex items-center justify-end gap-1.5"><span>Weight(KGS)</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-center cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortRM('abStatus')"><div class="flex items-center justify-center gap-1.5"><span>AB Status</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4 text-center cursor-pointer hover:bg-slate-100/80" onclick="QCView.sortRM('status')"><div class="flex items-center justify-center gap-1.5"><span>Status</span><span class="text-slate-400">⇅</span></div></th>
                  <th class="py-3 px-4">Reason</th>
                  <th class="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="rm-table-tbody" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.bindRMEvents();
    this.renderRMTableRows();
  },

  bindRMEvents() {
    document.getElementById('rm-btn-reset')?.addEventListener('click', () => {
      this.rmSearchQuery = '';
      const s = document.getElementById('rm-search-input'); if (s) s.value = '';
      this.renderRMTableRows();
    });
    document.getElementById('rm-btn-search')?.addEventListener('click', () => { this.renderRMTableRows(); });
    document.getElementById('rm-search-input')?.addEventListener('input', (e) => {
      this.rmSearchQuery = e.target.value.trim();
      this.renderRMTableRows();
    });
    document.getElementById('rm-btn-export')?.addEventListener('click', () => {
      const headers = ["ID", "Lot Number", "Purchase Date", "RM Date", "Purchase Type", "Count", "Weight(KGS)", "AB Status", "Status", "Reason"];
      const rows = this.rmAnalysisData.map(r => [r.id, r.lot, r.purchaseDate, r.rmDate, r.purchaseType, r.count, r.weight, r.abStatus, r.status, r.reason]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.map(v => `"${v}"`).join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `RM_Analysis_Report_${this.rmSelectedMonth}_${this.rmSelectedYear}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  },

  sortRM(field) {
    if (this.rmSortField === field) { this.rmSortAsc = !this.rmSortAsc; }
    else { this.rmSortField = field; this.rmSortAsc = true; }
    this.renderRMTableRows();
  },

  renderRMTableRows() {
    const tbody = document.getElementById('rm-table-tbody');
    if (!tbody) return;
    let rows = [...this.rmAnalysisData];
    if (this.rmSearchQuery) {
      const q = this.rmSearchQuery.toLowerCase();
      rows = rows.filter(r => r.id.toLowerCase().includes(q) || r.lot.toLowerCase().includes(q) || r.purchaseType.toLowerCase().includes(q) || r.status.toLowerCase().includes(q));
    }
    rows.sort((a, b) => {
      let va = a[this.rmSortField]; let vb = b[this.rmSortField];
      if (typeof va === 'number' && typeof vb === 'number') return this.rmSortAsc ? va - vb : vb - va;
      va = (va || '').toString().toLowerCase(); vb = (vb || '').toString().toLowerCase();
      return this.rmSortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
    });

    const badgeEl = document.getElementById('rm-row-count-badge');
    if (badgeEl) badgeEl.textContent = `Showing ${rows.length} lots`;

    tbody.innerHTML = rows.map((r, idx) => {
      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors ${idx % 2 === 1 ? 'bg-slate-50/40' : ''}">
          <td class="py-3 px-4 font-bold text-[#1E293B]">${r.id}</td>
          <td class="py-3 px-4 font-bold text-[#006C7A]">${r.lot}</td>
          <td class="py-3 px-4 text-[#64748B] whitespace-nowrap">${r.purchaseDate}</td>
          <td class="py-3 px-4 text-[#64748B] whitespace-nowrap">${r.rmDate}</td>
          <td class="py-3 px-4 text-[#334155]">${r.purchaseType}</td>
          <td class="py-3 px-4 text-right font-medium text-[#1E293B]">${Number(r.count).toFixed(2)}</td>
          <td class="py-3 px-4 text-right font-medium text-[#1E293B]">${Number(r.weight).toFixed(2)}</td>
          <td class="py-3 px-4 text-center">
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">${r.abStatus}</span>
          </td>
          <td class="py-3 px-4 text-center">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${r.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}">${r.status}</span>
          </td>
          <td class="py-3 px-4 text-[#64748B]">${r.reason}</td>
          <td class="py-3 px-4 text-center">
            <button type="button" class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer" title="Record Analysis">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },


  // ==========================================
  // 4. MB REPORT (IN HOUSE MICROBIOLOGY)
  // ==========================================
  mbFromDate: '08/10/2026',
  mbToDate: '26/10/2026',
  mbSearchQuery: '',

  mbPOCatalog: [
    { poNo: 'PO-2026-US-8901', buyer: 'PACIFIC SEAFOODS CORP' },
    { poNo: 'PO-2026-EU-4412', buyer: 'EUROFISH N.V. (BELGIUM)' },
    { poNo: 'PO-2026-JP-1120', buyer: 'MARUHA NICHIRO CORP' },
    { poNo: 'PO-2026-US-8945', buyer: 'AQUASTAR USA' },
    { poNo: 'PO-2026-UK-3310', buyer: 'LYONS SEAFOODS UK' },
    { poNo: 'PO-2026-AE-7702', buyer: 'TRUEBELL MARKETING LLC' }
  ],

  mbParametersList: [
    'Total Plate Count (TPC)',
    'E. coli',
    'Coliforms',
    'Salmonella',
    'Vibrio cholerae',
    'Vibrio parahaemolyticus',
    'Staphylococcus aureus',
    'Listeria monocytogenes',
    'Yeast & Mould'
  ],

  mbDraftReport: {
    unitName: 'UNIT-1',
    analysedBy: 'CH.SWATHI PADMA',
    verifiedBy: 'CH.SWATHI PADMA',
    items: []
  },

  mbReportsData: [
    { 
      sNo: 1, 
      poNo: 'PO-2026-US-8901', 
      buyerName: 'PACIFIC SEAFOODS CORP', 
      unitName: 'UNIT-1',
      reportDate: '02/10/2026', 
      analyst: 'CH.SWATHI PADMA',
      verifiedBy: 'CH.SWATHI PADMA',
      tpc: '<100 CFU/g', 
      pathogen: 'Negative / Absent', 
      status: 'Compliant',
      items: [
        { sNo: 1, poNo: 'PO-2026-US-8901', buyerName: 'PACIFIC SEAFOODS CORP', parameter: 'Total Plate Count (TPC)', analysisDate: '02/10/2026', result: '<100 CFU/g' },
        { sNo: 2, poNo: 'PO-2026-US-8901', buyerName: 'PACIFIC SEAFOODS CORP', parameter: 'E. coli', analysisDate: '02/10/2026', result: 'Absent / 25g' },
        { sNo: 3, poNo: 'PO-2026-US-8901', buyerName: 'PACIFIC SEAFOODS CORP', parameter: 'Salmonella', analysisDate: '02/10/2026', result: 'Negative' }
      ]
    },
    { 
      sNo: 2, 
      poNo: 'PO-2026-EU-4412', 
      buyerName: 'EUROFISH N.V. (BELGIUM)', 
      unitName: 'UNIT-1',
      reportDate: '05/10/2026', 
      analyst: 'CH.SWATHI PADMA',
      verifiedBy: 'Dr. Rajesh K. Varma',
      tpc: '<50 CFU/g', 
      pathogen: 'Negative / Absent', 
      status: 'Compliant',
      items: [
        { sNo: 1, poNo: 'PO-2026-EU-4412', buyerName: 'EUROFISH N.V. (BELGIUM)', parameter: 'Total Plate Count (TPC)', analysisDate: '05/10/2026', result: '<50 CFU/g' },
        { sNo: 2, poNo: 'PO-2026-EU-4412', buyerName: 'EUROFISH N.V. (BELGIUM)', parameter: 'Vibrio cholerae', analysisDate: '05/10/2026', result: 'Absent / 25g' }
      ]
    },
    { 
      sNo: 3, 
      poNo: 'PO-2026-JP-1120', 
      buyerName: 'MARUHA NICHIRO CORP', 
      unitName: 'UNIT-2',
      reportDate: '08/10/2026', 
      analyst: 'K. Srinivas',
      verifiedBy: 'CH.SWATHI PADMA',
      tpc: '<200 CFU/g', 
      pathogen: 'Negative / Absent', 
      status: 'Compliant',
      items: [
        { sNo: 1, poNo: 'PO-2026-JP-1120', buyerName: 'MARUHA NICHIRO CORP', parameter: 'Total Plate Count (TPC)', analysisDate: '08/10/2026', result: '<200 CFU/g' },
        { sNo: 2, poNo: 'PO-2026-JP-1120', buyerName: 'MARUHA NICHIRO CORP', parameter: 'Coliforms', analysisDate: '08/10/2026', result: '< 3 MPN/g' }
      ]
    },
    { 
      sNo: 4, 
      poNo: 'PO-2026-US-8945', 
      buyerName: 'AQUASTAR USA', 
      unitName: 'UNIT-5',
      reportDate: '12/10/2026', 
      analyst: 'Dr. Rajesh K. Varma',
      verifiedBy: 'CH.SWATHI PADMA',
      tpc: '<150 CFU/g', 
      pathogen: 'Negative / Absent', 
      status: 'Compliant',
      items: [
        { sNo: 1, poNo: 'PO-2026-US-8945', buyerName: 'AQUASTAR USA', parameter: 'Total Plate Count (TPC)', analysisDate: '12/10/2026', result: '<150 CFU/g' },
        { sNo: 2, poNo: 'PO-2026-US-8945', buyerName: 'AQUASTAR USA', parameter: 'Listeria monocytogenes', analysisDate: '12/10/2026', result: 'Absent / 25g' }
      ]
    }
  ],

  renderMBReport(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">IN HOUSE MICROBIOLOGY LAB REPORTS</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Lab Operations &bull; Microbial Analysis (TPC, E. Coli, Salmonella, Vibrio)</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="mb-btn-create-report" onclick="QCView.openAddMBReportModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add MB Report</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT FROM DATE</label>
                <input type="text" id="mb-from-date" value="${this.mbFromDate}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT TO DATE</label>
                <input type="text" id="mb-to-date" value="${this.mbToDate}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="button" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input type="text" id="mb-search-input" onkeyup="QCView.handleMBSearch(this.value)" placeholder="Search PO, Buyer, Date..." class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all"/>
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <span id="mb-records-counter" class="text-xs font-semibold text-[#64748B]">Showing ${this.mbReportsData.length} records</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4">S.NO</th>
                  <th class="py-3 px-4">PO No</th>
                  <th class="py-3 px-4">Buyer Name</th>
                  <th class="py-3 px-4">Report Date</th>
                  <th class="py-3 px-4">TPC</th>
                  <th class="py-3 px-4">Pathogens</th>
                  <th class="py-3 px-4 text-center">Status</th>
                  <th class="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="mb-report-table-body" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.renderMBReportTableRows();
  },

  renderMBReportTableRows(data) {
    const list = data || this.mbReportsData;
    const tbody = document.getElementById('mb-report-table-body');
    if (!tbody) return;

    const counter = document.getElementById('mb-records-counter');
    if (counter) counter.innerText = `Showing ${list.length} records`;

    tbody.innerHTML = list.map((r, i) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${i % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="QCView.openMBReportDetailModal(${r.sNo})">${r.poNo}</td>
        <td class="py-3 px-4 text-[#334155] font-medium">${r.buyerName}</td>
        <td class="py-3 px-4 text-[#64748B] whitespace-nowrap">${r.reportDate}</td>
        <td class="py-3 px-4 font-semibold text-[#1E293B]">${r.tpc}</td>
        <td class="py-3 px-4 font-medium text-[#334155]">${r.pathogen}</td>
        <td class="py-3 px-4 text-center">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${r.status}</span>
        </td>
        <td class="py-3 px-4 text-center">
          <button type="button" onclick="QCView.openMBReportDetailModal(${r.sNo})" class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center" title="View Lab Certificate">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  handleMBSearch(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.renderMBReportTableRows(this.mbReportsData);
      return;
    }
    const filtered = this.mbReportsData.filter(r => 
      r.poNo.toLowerCase().includes(q) ||
      r.buyerName.toLowerCase().includes(q) ||
      r.reportDate.toLowerCase().includes(q) ||
      (r.tpc && r.tpc.toLowerCase().includes(q)) ||
      (r.pathogen && r.pathogen.toLowerCase().includes(q))
    );
    this.renderMBReportTableRows(filtered);
  },

  // -------------------------------------------------------------
  // STEP 1 MODAL: IN HOUSE MICROBIOLOGY TEST REPORT SETUP
  // -------------------------------------------------------------
  openAddMBReportModal() {
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    // Reset draft session
    this.mbDraftReport = {
      unitName: 'UNIT-1',
      analysedBy: 'CH.SWATHI PADMA',
      verifiedBy: 'CH.SWATHI PADMA',
      items: []
    };

    m.open({
      title: 'IN HOUSE MICROBIOLOGY TEST REPORT',
      size: 'xl',
      content: `
        <div class="space-y-5 text-xs text-[#1E293B]">
          <div class="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#02a8b5] text-white text-[10px] font-bold">1</span>
              <span class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">Step 1: Setup &amp; Personnel Assignment</span>
            </div>
            <span class="text-[11px] text-[#64748B] font-medium">Step 1 of 2</span>
          </div>

          <form id="modal-mb-step1-form" class="space-y-4" onsubmit="event.preventDefault(); QCView.proceedToMBStep2();">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">UNIT NAME <span class="text-rose-500">*</span></label>
                <select id="modal-mb-unit" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="UNIT-1" selected>UNIT-1</option>
                  <option value="UNIT-2">UNIT-2</option>
                  <option value="UNIT-5">UNIT-5 (Main Processing Plant)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ANALYSED BY <span class="text-rose-500">*</span></label>
                <select id="modal-mb-analyst" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="CH.SWATHI PADMA" selected>CH.SWATHI PADMA</option>
                  <option value="Dr. Rajesh K. Varma">Dr. Rajesh K. Varma</option>
                  <option value="P. Ramanjaneyulu">P. Ramanjaneyulu</option>
                  <option value="K. Srinivas">K. Srinivas</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">VERIFIED BY <span class="text-rose-500">*</span></label>
                <select id="modal-mb-verifier" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="CH.SWATHI PADMA" selected>CH.SWATHI PADMA</option>
                  <option value="Dr. Rajesh K. Varma">Dr. Rajesh K. Varma</option>
                </select>
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
              <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if (m && m.close) m.close();" class="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
                Cancel
              </button>
              <button type="submit" class="px-6 py-2.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <span>Submit</span>
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </form>
        </div>
      `
    });
  },

  // -------------------------------------------------------------
  // STEP 2 MODAL: PO SAMPLE TESTING & PARAMETER ENTRY
  // -------------------------------------------------------------
  proceedToMBStep2() {
    const unit = document.getElementById('modal-mb-unit')?.value || 'UNIT-1';
    const analyst = document.getElementById('modal-mb-analyst')?.value || 'CH.SWATHI PADMA';
    const verifier = document.getElementById('modal-mb-verifier')?.value || 'CH.SWATHI PADMA';

    this.mbDraftReport.unitName = unit;
    this.mbDraftReport.analysedBy = analyst;
    this.mbDraftReport.verifiedBy = verifier;

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    const todayStr = new Date().toISOString().split('T')[0];

    m.open({
      title: 'IN HOUSE MICROBIOLOGY TEST REPORT',
      size: '2xl',
      content: `
        <div class="space-y-4 text-xs text-[#1E293B]">
          <!-- Active Context Header Banner -->
          <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3 flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-4 flex-wrap">
              <div>
                <span class="text-[10px] text-[#64748B] font-bold uppercase tracking-wider block">UNIT</span>
                <span class="font-bold text-[#1E293B]">${this.mbDraftReport.unitName}</span>
              </div>
              <div class="h-6 w-px bg-[#CBD5E1] hidden sm:block"></div>
              <div>
                <span class="text-[10px] text-[#64748B] font-bold uppercase tracking-wider block">ANALYSED BY</span>
                <span class="font-bold text-[#006C7A]">${this.mbDraftReport.analysedBy}</span>
              </div>
              <div class="h-6 w-px bg-[#CBD5E1] hidden sm:block"></div>
              <div>
                <span class="text-[10px] text-[#64748B] font-bold uppercase tracking-wider block">VERIFIED BY</span>
                <span class="font-bold text-[#1E293B]">${this.mbDraftReport.verifiedBy}</span>
              </div>
            </div>
            <button type="button" onclick="QCView.openAddMBReportModal()" class="text-xs font-semibold text-[#02a8b5] hover:underline cursor-pointer">
              &larr; Change Setup
            </button>
          </div>

          <!-- Parameter Entry Form -->
          <div class="bg-white border border-[#CBD5E1] rounded-xl p-4 shadow-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PO NUMBER <span class="text-rose-500">*</span></label>
                <select id="modal-param-po" onchange="QCView.handleMBPOSelect(this.value)" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
                  <option value="">Select PO</option>
                  ${this.mbPOCatalog.map(p => `<option value="${p.poNo}">${p.poNo} (${p.buyer})</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PARAMETER <span class="text-rose-500">*</span></label>
                <select id="modal-param-name" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
                  <option value="">Select Parameter</option>
                  ${this.mbParametersList.map(p => `<option value="${p}">${p}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ANALYSIS DATE <span class="text-rose-500">*</span></label>
                <input type="date" id="modal-param-date" value="${todayStr}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">RESULT <span class="text-rose-500">*</span></label>
                <input type="text" id="modal-param-result" placeholder="Enter Result" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5]">
              </div>
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-[#F1F5F9]">
              <div id="modal-buyer-preview" class="text-xs text-[#64748B] font-medium">
                <span class="text-[#94A3B8]">Buyer:</span> <span class="font-bold text-[#1E293B]" id="modal-buyer-preview-text">Please select a PO</span>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" onclick="QCView.addMBParameterItem()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                  <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Dynamic Line Items Table -->
          <div class="border border-[#CBD5E1] rounded-xl overflow-hidden shadow-xs">
            <div class="overflow-x-auto max-h-56">
              <table class="w-full text-left border-collapse text-xs">
                <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase sticky top-0 z-10">
                  <tr>
                    <th class="py-2.5 px-3">S.No</th>
                    <th class="py-2.5 px-3">PO No</th>
                    <th class="py-2.5 px-3">Buyer Name</th>
                    <th class="py-2.5 px-3">Parameter</th>
                    <th class="py-2.5 px-3">Analysis Date</th>
                    <th class="py-2.5 px-3">Result</th>
                    <th class="py-2.5 px-3 text-center">Remove</th>
                  </tr>
                </thead>
                <tbody id="modal-mb-draft-tbody" class="divide-y divide-[#F1F5F9]">
                </tbody>
              </table>
            </div>
          </div>

          <!-- Final Actions Footer -->
          <div class="flex items-center justify-between pt-3 border-t border-[#F1F5F9]">
            <span id="modal-mb-items-counter" class="text-xs text-[#64748B] font-semibold">0 parameter(s) added</span>
            <div class="flex items-center gap-2">
              <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if (m && m.close) m.close();" class="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
                Cancel
              </button>
              <button type="button" onclick="QCView.submitFinalMBReport()" class="px-6 py-2.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>SUBMIT RESULT</span>
              </button>
            </div>
          </div>
        </div>
      `
    });

    this.renderMBDraftTableRows();
  },

  handleMBPOSelect(poNo) {
    const preview = document.getElementById('modal-buyer-preview-text');
    if (!preview) return;
    const found = this.mbPOCatalog.find(p => p.poNo === poNo);
    preview.innerText = found ? found.buyer : 'Please select a PO';
  },

  addMBParameterItem() {
    const poSelect = document.getElementById('modal-param-po');
    const paramSelect = document.getElementById('modal-param-name');
    const dateInput = document.getElementById('modal-param-date');
    const resultInput = document.getElementById('modal-param-result');

    const poNo = poSelect ? poSelect.value : '';
    const parameter = paramSelect ? paramSelect.value : '';
    const dateVal = dateInput ? dateInput.value : '';
    const result = resultInput ? resultInput.value.trim() : '';

    if (!poNo) {
      alert('Please select a PO Number');
      return;
    }
    if (!parameter) {
      alert('Please select a Parameter');
      return;
    }
    if (!result) {
      alert('Please enter Result');
      return;
    }

    const foundPO = this.mbPOCatalog.find(p => p.poNo === poNo);
    const buyerName = foundPO ? foundPO.buyer : '-';

    let formattedDate = dateVal;
    if (dateVal && dateVal.includes('-')) {
      const parts = dateVal.split('-');
      formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    this.mbDraftReport.items.push({
      sNo: this.mbDraftReport.items.length + 1,
      poNo: poNo,
      buyerName: buyerName,
      parameter: parameter,
      analysisDate: formattedDate || '26/10/2026',
      result: result
    });

    if (resultInput) resultInput.value = '';
    this.renderMBDraftTableRows();
  },

  removeMBParameterItem(idx) {
    this.mbDraftReport.items.splice(idx, 1);
    this.mbDraftReport.items.forEach((item, i) => item.sNo = i + 1);
    this.renderMBDraftTableRows();
  },

  renderMBDraftTableRows() {
    const tbody = document.getElementById('modal-mb-draft-tbody');
    const counter = document.getElementById('modal-mb-items-counter');
    if (counter) counter.innerText = `${this.mbDraftReport.items.length} parameter(s) added`;

    if (!tbody) return;

    if (this.mbDraftReport.items.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="py-6 text-center text-[#94A3B8]">
            No parameters added yet. Select PO, Parameter, and enter Result above, then tap Save.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = this.mbDraftReport.items.map((item, idx) => `
      <tr class="hover:bg-[#F8FAFC]">
        <td class="py-2.5 px-3 font-bold text-[#1E293B]">${item.sNo}</td>
        <td class="py-2.5 px-3 font-bold text-[#006C7A]">${item.poNo}</td>
        <td class="py-2.5 px-3 text-[#334155] font-medium">${item.buyerName}</td>
        <td class="py-2.5 px-3 text-[#1E293B]">${item.parameter}</td>
        <td class="py-2.5 px-3 text-[#64748B]">${item.analysisDate}</td>
        <td class="py-2.5 px-3 font-bold text-emerald-700">${item.result}</td>
        <td class="py-2.5 px-3 text-center">
          <button type="button" onclick="QCView.removeMBParameterItem(${idx})" class="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors cursor-pointer" title="Remove">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  submitFinalMBReport() {
    if (this.mbDraftReport.items.length === 0) {
      alert('Please add at least one parameter item before submitting.');
      return;
    }

    // Group items by PO Number or add as unique reports
    const uniquePOs = [...new Set(this.mbDraftReport.items.map(i => i.poNo))];
    uniquePOs.forEach(po => {
      const poItems = this.mbDraftReport.items.filter(i => i.poNo === po);
      const first = poItems[0];
      const tpcItem = poItems.find(i => i.parameter.toLowerCase().includes('tpc'));
      const pathogenItems = poItems.filter(i => !i.parameter.toLowerCase().includes('tpc'));

      this.mbReportsData.unshift({
        sNo: this.mbReportsData.length + 1,
        poNo: po,
        buyerName: first.buyerName,
        unitName: this.mbDraftReport.unitName,
        reportDate: first.analysisDate || '26/10/2026',
        analyst: this.mbDraftReport.analysedBy,
        verifiedBy: this.mbDraftReport.verifiedBy,
        tpc: tpcItem ? tpcItem.result : '< 100 CFU/g',
        pathogen: pathogenItems.length > 0 ? pathogenItems.map(p => `${p.parameter}: ${p.result}`).join(', ') : 'Negative / Absent',
        status: 'Compliant',
        items: poItems
      });
    });

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal) ? window.Modal : null;
    if (m && m.close) m.close();

    this.renderMBReportTableRows();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('In-House Microbiology Test Report submitted successfully!', 'success');
    }
  },

  openMBReportDetailModal(sNo) {
    const report = this.mbReportsData.find(r => r.sNo === sNo);
    if (!report) return;

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: `MICROBIOLOGY CERTIFICATE: ${report.poNo}`,
      size: 'xl',
      content: `
        <div class="space-y-4 text-xs text-[#1E293B]">
          <!-- Summary Cards -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">PO NUMBER</span>
              <span class="font-bold text-xs text-[#006C7A] block mt-0.5">${report.poNo}</span>
            </div>
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">BUYER NAME</span>
              <span class="font-bold text-xs text-[#1E293B] block mt-0.5">${report.buyerName}</span>
            </div>
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">ANALYSED BY</span>
              <span class="font-bold text-xs text-[#1E293B] block mt-0.5">${report.analyst}</span>
            </div>
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">VERIFIED BY</span>
              <span class="font-bold text-xs text-[#1E293B] block mt-0.5">${report.verifiedBy || report.analyst}</span>
            </div>
          </div>

          <!-- Parameters Breakdown -->
          <div class="border border-[#CBD5E1] rounded-lg overflow-hidden">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase">
                <tr>
                  <th class="py-2.5 px-3">S.No</th>
                  <th class="py-2.5 px-3">Microbiological Parameter</th>
                  <th class="py-2.5 px-3">Test Date</th>
                  <th class="py-2.5 px-3">Observed Result</th>
                  <th class="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9]">
                ${(report.items || [
                  { sNo: 1, parameter: 'Total Plate Count (TPC)', analysisDate: report.reportDate, result: report.tpc },
                  { sNo: 2, parameter: 'Pathogen Screen (E. coli, Salmonella, Vibrio)', analysisDate: report.reportDate, result: report.pathogen }
                ]).map((item, idx) => `
                  <tr class="${idx % 2 === 1 ? 'bg-slate-50/40' : ''}">
                    <td class="py-2.5 px-3 font-bold text-[#1E293B]">${idx + 1}</td>
                    <td class="py-2.5 px-3 font-semibold text-[#1E293B]">${item.parameter}</td>
                    <td class="py-2.5 px-3 text-[#64748B]">${item.analysisDate || report.reportDate}</td>
                    <td class="py-2.5 px-3 font-bold text-[#006C7A]">${item.result}</td>
                    <td class="py-2.5 px-3 text-center">
                      <span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Compliant</span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="flex items-center justify-end pt-2">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if (m && m.close) m.close();" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer">
              Close
            </button>
          </div>
        </div>
      `
    });
  },

  // ==========================================
  // 5. LAB REPORT (IN HOUSE LAB REPORTS)
  // ==========================================
  labFromDate: '22/01/2026',
  labToDate: '26/10/2026',
  labSelectedReport: 'BoreWater Analysis Report',

  labReportsList: [
    { sNo: 1, reportType: 'BoreWater Analysis Report', source: 'Borewell #03 (Processing Line)', sampleTime: '10:30 AM', analysisDate: '01/10/2026', reportDate: '02/10/2026', analyst: 'CH.SWATHI PADMA', verifiedBy: 'CH.SWATHI PADMA', ph: '7.20', temp: '26.5 °C', salinity: '0.45 ppt', hardness: '135 ppm', chlorine: 'Nil (<0.02 ppm)', tds: '420 ppm', status: 'Compliant' },
    { sNo: 2, reportType: 'Chlorine & Ice Water Test', source: 'Flake Ice Plant #02', sampleTime: '11:15 AM', analysisDate: '03/10/2026', reportDate: '04/10/2026', analyst: 'K. Srinivas', verifiedBy: 'CH.SWATHI PADMA', ph: '7.10', temp: '0.8 °C', salinity: '0.02 ppt', hardness: '80 ppm', chlorine: '1.8 ppm', tds: '190 ppm', status: 'Compliant' },
    { sNo: 3, reportType: 'Equipment Swab Hygiene Test', source: 'Grading Belt Conveyor Line #1', sampleTime: '02:00 PM', analysisDate: '06/10/2026', reportDate: '07/10/2026', analyst: 'M. S. Prasad', verifiedBy: 'Dr. Rajesh K. Varma', ph: '7.00', temp: '24.0 °C', salinity: '0.10 ppt', hardness: '110 ppm', chlorine: '0.5 ppm', tds: '280 ppm', status: 'Compliant' },
    { sNo: 4, reportType: 'Finished Product Chemical Screen', source: 'Unit-5 Master Freezing Carton', sampleTime: '04:30 PM', analysisDate: '08/10/2026', reportDate: '09/10/2026', analyst: 'Dr. Rajesh K. Varma', verifiedBy: 'CH.SWATHI PADMA', ph: '6.85', temp: '-18.2 °C', salinity: '0.80 ppt', hardness: '120 ppm', chlorine: 'Nil', tds: '350 ppm', status: 'Compliant' }
  ],

  renderLabReport(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">IN HOUSE (IH) LAB REPORTS</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Lab Operations &bull; BoreWater, Ice, Chlorine &amp; Hygiene Tests</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="lab-report-btn-create" onclick="QCView.openAddLabReportModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Report</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">FROM DATE</label>
                <input type="text" value="${this.labFromDate}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TO DATE</label>
                <input type="text" value="${this.labToDate}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REPORT TYPE</label>
                <select class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="BoreWater Analysis Report" selected>BoreWater Analysis Report</option>
                  <option value="Chlorine & Ice Water Test">Chlorine & Ice Water Test</option>
                  <option value="Equipment Swab Hygiene Test">Equipment Swab Hygiene Test</option>
                  <option value="Finished Product Chemical Screen">Finished Product Chemical Screen</option>
                </select>
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="button" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4">S.NO</th>
                  <th class="py-3 px-4">Report Type</th>
                  <th class="py-3 px-4">Sample Source</th>
                  <th class="py-3 px-4">Sample Time</th>
                  <th class="py-3 px-4">Sampling Date</th>
                  <th class="py-3 px-4">Tested By</th>
                  <th class="py-3 px-4">Verified By</th>
                  <th class="py-3 px-4 text-center">Status</th>
                  <th class="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="lab-report-table-body" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.renderLabReportTableRows();
  },

  renderLabReportTableRows() {
    const tbody = document.getElementById('lab-report-table-body');
    if (!tbody) return;

    tbody.innerHTML = this.labReportsList.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${idx % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="QCView.openLabReportDetailModal(${r.sNo})">${r.reportType}</td>
        <td class="py-3 px-4 text-[#334155]">${r.source}</td>
        <td class="py-3 px-4 text-[#64748B]">${r.sampleTime || '--:--'}</td>
        <td class="py-3 px-4 text-[#64748B]">${r.analysisDate}</td>
        <td class="py-3 px-4 text-[#334155]">${r.analyst}</td>
        <td class="py-3 px-4 text-[#64748B]">${r.verifiedBy || r.analyst}</td>
        <td class="py-3 px-4 text-center">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${r.status}</span>
        </td>
        <td class="py-3 px-4 text-center">
          <button type="button" onclick="QCView.openLabReportDetailModal(${r.sNo})" class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center" title="View Report">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  // Open Add Borewater Analysis Report Modal Popup
  openAddLabReportModal() {
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const currentTimeStr = new Date().toTimeString().slice(0, 5);

    m.open({
      title: 'ADD BOREWATER ANALYSIS REPORT',
      size: '2xl',
      content: `
        <div class="space-y-5 text-xs text-[#1E293B]">
          <form id="modal-borewater-form" class="space-y-5" onsubmit="event.preventDefault(); QCView.handleModalAddLabReportSubmit();">
            <!-- Sample & Verification Details -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SAMPLE COLLECTION TIME <span class="text-rose-500">*</span></label>
                <input type="time" id="borewater-sample-time" value="${currentTimeStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">DATE OF SAMPLING <span class="text-rose-500">*</span></label>
                <input type="date" id="borewater-sampling-date" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">VERIFIED BY <span class="text-rose-500">*</span></label>
                <select id="borewater-verified-by" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select Verified By</option>
                  <option value="CH.SWATHI PADMA" selected>CH.SWATHI PADMA (QC Manager)</option>
                  <option value="Dr. Rajesh K. Varma">Dr. Rajesh K. Varma (Lab Head)</option>
                  <option value="P. Ramanjaneyulu">P. Ramanjaneyulu (QC Lead)</option>
                  <option value="K. Srinivas">K. Srinivas (Sr. Chemist)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TESTED BY <span class="text-rose-500">*</span></label>
                <select id="borewater-tested-by" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select Tested By</option>
                  <option value="CH.SWATHI PADMA" selected>CH.SWATHI PADMA</option>
                  <option value="K. Srinivas">K. Srinivas</option>
                  <option value="M. S. Prasad">M. S. Prasad</option>
                  <option value="V. Lakshmi">V. Lakshmi</option>
                </select>
              </div>
            </div>

            <!-- Parameter Values Section -->
            <div class="pt-3 border-t border-[#F1F5F9]">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                <h3 class="text-xs font-bold text-[#006C7A] uppercase tracking-wider">Parameter Values</h3>
                <span class="text-[10px] text-[#64748B] font-medium ml-auto">Potable Water Quality Standards (IS 10500)</span>
              </div>

              <!-- Parameter Grid Row 1 -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PH VALUE <span class="text-rose-500">*</span></label>
                  <input type="number" step="0.01" min="0" max="14" id="borewater-ph" placeholder="Enter PH VALUE" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <span class="text-[10px] text-[#64748B] mt-1 block">Permissible: 6.50 - 8.50</span>
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TEMPERATURE <span class="text-rose-500">*</span></label>
                  <input type="number" step="0.1" id="borewater-temp" placeholder="Enter Temperature" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <span class="text-[10px] text-[#64748B] mt-1 block">Unit: &deg;C</span>
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SALINITY <span class="text-rose-500">*</span></label>
                  <input type="number" step="0.01" id="borewater-salinity" placeholder="Enter Salinity" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <span class="text-[10px] text-[#64748B] mt-1 block">Unit: ppt (&lt; 0.50 ppt)</span>
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HARDNESS <span class="text-rose-500">*</span></label>
                  <input type="number" step="1" id="borewater-hardness" placeholder="Enter HARDNESS" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <span class="text-[10px] text-[#64748B] mt-1 block">Unit: ppm CaCO3 (Max: 200)</span>
                </div>
              </div>

              <!-- Parameter Grid Row 2 -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CHLORINE <span class="text-rose-500">*</span></label>
                  <input type="text" id="borewater-chlorine" placeholder="Enter CHLORINE" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <span class="text-[10px] text-[#64748B] mt-1 block">Unit: ppm (e.g. Nil / 0.2 ppm)</span>
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TOTAL DISSOLVED SOLIDS <span class="text-rose-500">*</span></label>
                  <input type="number" step="1" id="borewater-tds" placeholder="Enter TDS" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <span class="text-[10px] text-[#64748B] mt-1 block">Unit: ppm (Max: 500 ppm)</span>
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SAMPLE SOURCE</label>
                  <select id="borewater-source" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                    <option value="Borewell #03 (Processing Line)" selected>Borewell #03 (Processing Line)</option>
                    <option value="Borewell #01 (Raw Intake)">Borewell #01 (Raw Intake)</option>
                    <option value="Borewell #02 (Flake Ice Plant)">Borewell #02 (Flake Ice Plant)</option>
                    <option value="Overhead Storage Tank #01">Overhead Storage Tank #01</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">COMPLIANCE REMARKS</label>
                  <input type="text" id="borewater-remarks" placeholder="Optional notes" value="Meets IS 10500 standards" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                </div>
              </div>
            </div>

            <!-- Modal Footer Buttons -->
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
              <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if (m && m.close) m.close();" class="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
                Close
              </button>
              <button type="submit" class="px-6 py-2.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>Submit</span>
              </button>
            </div>
          </form>
        </div>
      `
    });
  },

  handleModalAddLabReportSubmit() {
    const sampleTime = document.getElementById('borewater-sample-time')?.value || '--:--';
    const sampleDate = document.getElementById('borewater-sampling-date')?.value || '';
    const verifiedBy = document.getElementById('borewater-verified-by')?.value || 'CH.SWATHI PADMA';
    const testedBy = document.getElementById('borewater-tested-by')?.value || 'CH.SWATHI PADMA';
    const ph = document.getElementById('borewater-ph')?.value || '7.15';
    const temp = document.getElementById('borewater-temp')?.value || '25.0';
    const salinity = document.getElementById('borewater-salinity')?.value || '0.20';
    const hardness = document.getElementById('borewater-hardness')?.value || '120';
    const chlorine = document.getElementById('borewater-chlorine')?.value || 'Nil';
    const tds = document.getElementById('borewater-tds')?.value || '380';
    const source = document.getElementById('borewater-source')?.value || 'Borewell #03 (Processing Line)';
    const remarks = document.getElementById('borewater-remarks')?.value || 'Meets IS 10500 standards';

    let formattedDate = sampleDate;
    if (sampleDate && sampleDate.includes('-')) {
      const parts = sampleDate.split('-');
      formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    const newReport = {
      sNo: this.labReportsList.length + 1,
      reportType: 'BoreWater Analysis Report',
      source: source,
      sampleTime: sampleTime,
      analysisDate: formattedDate || '26/10/2026',
      reportDate: formattedDate || '26/10/2026',
      analyst: testedBy,
      verifiedBy: verifiedBy,
      ph: ph,
      temp: temp + ' °C',
      salinity: salinity + ' ppt',
      hardness: hardness + ' ppm',
      chlorine: chlorine,
      tds: tds + ' ppm',
      status: 'Compliant',
      remarks: remarks
    };

    this.labReportsList.unshift(newReport);

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal) ? window.Modal : null;
    if (m && m.close) m.close();

    this.renderLabReportTableRows();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('BoreWater Analysis Report created successfully!', 'success');
    }
  },

  openLabReportDetailModal(sNo) {
    const report = this.labReportsList.find(r => r.sNo === sNo);
    if (!report) return;

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: `${report.reportType.toUpperCase()} DETAILS`,
      size: 'xl',
      content: `
        <div class="space-y-4 text-xs text-[#1E293B]">
          <!-- Summary Cards -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">SOURCE</span>
              <span class="font-bold text-xs text-[#1E293B] block mt-0.5">${report.source}</span>
            </div>
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">SAMPLE TIME</span>
              <span class="font-bold text-xs text-[#1E293B] block mt-0.5">${report.sampleTime || '10:30 AM'}</span>
            </div>
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">TESTED BY</span>
              <span class="font-bold text-xs text-[#006C7A] block mt-0.5">${report.analyst}</span>
            </div>
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">VERIFIED BY</span>
              <span class="font-bold text-xs text-[#1E293B] block mt-0.5">${report.verifiedBy || report.analyst}</span>
            </div>
          </div>

          <!-- Parameter Values Table -->
          <div class="border border-[#CBD5E1] rounded-lg overflow-hidden">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase">
                <tr>
                  <th class="py-2.5 px-3">Parameter</th>
                  <th class="py-2.5 px-3">Observed Value</th>
                  <th class="py-2.5 px-3">Standard Limit</th>
                  <th class="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9]">
                <tr>
                  <td class="py-2.5 px-3 font-semibold text-[#1E293B]">pH Value</td>
                  <td class="py-2.5 px-3 font-bold text-[#006C7A]">${report.ph || '7.20'}</td>
                  <td class="py-2.5 px-3 text-[#64748B]">6.50 - 8.50</td>
                  <td class="py-2.5 px-3 text-center"><span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">Pass</span></td>
                </tr>
                <tr class="bg-slate-50/50">
                  <td class="py-2.5 px-3 font-semibold text-[#1E293B]">Temperature</td>
                  <td class="py-2.5 px-3 font-bold text-[#006C7A]">${report.temp || '26.5 °C'}</td>
                  <td class="py-2.5 px-3 text-[#64748B]">&lt; 28.0 °C</td>
                  <td class="py-2.5 px-3 text-center"><span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">Pass</span></td>
                </tr>
                <tr>
                  <td class="py-2.5 px-3 font-semibold text-[#1E293B]">Salinity</td>
                  <td class="py-2.5 px-3 font-bold text-[#006C7A]">${report.salinity || '0.45 ppt'}</td>
                  <td class="py-2.5 px-3 text-[#64748B]">&lt; 0.50 ppt</td>
                  <td class="py-2.5 px-3 text-center"><span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">Pass</span></td>
                </tr>
                <tr class="bg-slate-50/50">
                  <td class="py-2.5 px-3 font-semibold text-[#1E293B]">Hardness</td>
                  <td class="py-2.5 px-3 font-bold text-[#006C7A]">${report.hardness || '135 ppm'}</td>
                  <td class="py-2.5 px-3 text-[#64748B]">&le; 200 ppm CaCO3</td>
                  <td class="py-2.5 px-3 text-center"><span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">Pass</span></td>
                </tr>
                <tr>
                  <td class="py-2.5 px-3 font-semibold text-[#1E293B]">Chlorine (Free Residual)</td>
                  <td class="py-2.5 px-3 font-bold text-[#006C7A]">${report.chlorine || 'Nil'}</td>
                  <td class="py-2.5 px-3 text-[#64748B]">Nil to 0.20 ppm</td>
                  <td class="py-2.5 px-3 text-center"><span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">Pass</span></td>
                </tr>
                <tr class="bg-slate-50/50">
                  <td class="py-2.5 px-3 font-semibold text-[#1E293B]">Total Dissolved Solids (TDS)</td>
                  <td class="py-2.5 px-3 font-bold text-[#006C7A]">${report.tds || '420 ppm'}</td>
                  <td class="py-2.5 px-3 text-[#64748B]">&le; 500 ppm</td>
                  <td class="py-2.5 px-3 text-center"><span class="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">Pass</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex items-center justify-end pt-2">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if (m && m.close) m.close();" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer">
              Close
            </button>
          </div>
        </div>
      `
    });
  },

  // ==========================================
  // 6. EXTERNAL LAB REPORT
  // ==========================================
  extExporter: 'DEVI FISHERIES LIMITED - 853',
  extYear: '2026',
  extMonth: 'October',

  extLabReports: [
    { sNo: 1, certNo: 'MPEDA/BVR/2026/8912', labName: 'MPEDA QC Lab (Bhimavaram)', sample: 'Black Tiger / HLSO (Grade 16/20)', dispatchDate: '02/10/2026', resultDate: '06/10/2026', status: 'Cleared (EU Standard)' },
    { sNo: 2, certNo: 'EIC/VSKP/QC-4019', labName: 'Export Inspection Council (EIC) Central Lab', sample: 'Vannamei PDTO (Grade 31/40)', dispatchDate: '04/10/2026', resultDate: '08/10/2026', status: 'Cleared (US FDA)' },
    { sNo: 3, certNo: 'SGS/HYD/2026/1129', labName: 'SGS India Testing Center', sample: 'Pre-Harvest Aquaculture Water Screen', dispatchDate: '06/10/2026', resultDate: '10/10/2026', status: 'Certified Zero Residue' },
    { sNo: 4, certNo: 'EUR/BLR/2026/7781', labName: 'Eurofins Analytical Services', sample: 'Finished Shrimp Feed Mill Residue', dispatchDate: '08/10/2026', resultDate: '13/10/2026', status: 'Compliant' }
  ],

  renderExternalLabReport(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">EXTERNAL LAB ANALYSIS REPORTS</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Lab Operations &bull; MPEDA, EIC, SGS &amp; Eurofins External Clearances</span>
          </div>
          <!-- No add button as per user instruction -->
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">EXPORTER</label>
                <select class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="DEVI FISHERIES LIMITED - 853" selected>DEVI FISHERIES LIMITED - 853</option>
                  <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
                  <option value="DEVI SEAFOODS PVT LTD">DEVI SEAFOODS PVT LTD</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['2026', '2025', '2024', '2023'].map(y => `<option value="${y}" ${this.extYear === y ? 'selected' : ''}>${y}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">MONTH</label>
                <select class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => `<option value="${m}" ${this.extMonth === m ? 'selected' : ''}>${m}</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="button" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                <span>Print Register</span>
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4">S.NO</th>
                  <th class="py-3 px-4">Certificate / Reg No</th>
                  <th class="py-3 px-4">External Lab Name</th>
                  <th class="py-3 px-4">Sample Description</th>
                  <th class="py-3 px-4">Dispatch Date</th>
                  <th class="py-3 px-4">Result Date</th>
                  <th class="py-3 px-4 text-center">Status</th>
                  <th class="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]">
                ${this.extLabReports.map(r => `
                  <tr class="hover:bg-[#F8FAFC]">
                    <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
                    <td class="py-3 px-4 font-bold text-[#006C7A]">${r.certNo}</td>
                    <td class="py-3 px-4 text-[#334155]">${r.labName}</td>
                    <td class="py-3 px-4 text-[#334155]">${r.sample}</td>
                    <td class="py-3 px-4 text-[#64748B]">${r.dispatchDate}</td>
                    <td class="py-3 px-4 text-[#64748B]">${r.resultDate}</td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${r.status}</span>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <button type="button" class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer" title="View Certificate Details">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // ==========================================
  // 7. QC OPERATIONS: DOCUMENTATION
  // ==========================================
  docSelectedYear: '2026-2027',
  docSelectedExporter: 'DEVI FISHERIES LIMITED',
  docSelectedConsignee: 'All',
  docSelectedCountry: 'All',
  docBillsType: 'Completed',

  documentationList: [
    {
      sNo: 1,
      id: 104,
      invoiceNo: 'DFL/KKD/2627/157',
      invoiceDate: '21-10-2026',
      poNo: 'DF/DF-2786',
      buyer: 'DEVI FISHERIES INC.',
      country: 'U.S.A.',
      internalLotNo: 'LOT-2627-0891',
      status: 'Completed',
      certHealth: 'EIA/2026/10492',
      certCoa: 'COA-DFL-2627-157',
      certOrigin: 'COO-IN-2026-8812'
    },
    {
      sNo: 2,
      id: 6513,
      invoiceNo: 'DFL/PT/2627/313',
      invoiceDate: '19-09-2026',
      poNo: 'PO1004191',
      buyer: 'STANLEY PEARLMAN ENTERPRISES, INC.',
      country: 'U.S.A.',
      internalLotNo: 'LOT-2627-0842',
      status: 'Completed',
      certHealth: 'EIA/2026/09841',
      certCoa: 'COA-DFL-2627-313',
      certOrigin: 'COO-IN-2026-7731'
    },
    {
      sNo: 3,
      id: 6203,
      invoiceNo: 'DFL/PT/2627/312',
      invoiceDate: '19-09-2026',
      poNo: '1102650547',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      country: 'U.S.A.',
      internalLotNo: 'LOT-2627-0839',
      status: 'Completed',
      certHealth: 'EIA/2026/09840',
      certCoa: 'COA-DFL-2627-312',
      certOrigin: 'COO-IN-2026-7729'
    },
    {
      sNo: 4,
      id: 6302,
      invoiceNo: 'DFL/PT/2627/311',
      invoiceDate: '19-09-2026',
      poNo: '1102650877',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      country: 'U.S.A.',
      internalLotNo: 'LOT-2627-0835',
      status: 'Completed',
      certHealth: 'EIA/2026/09838',
      certCoa: 'COA-DFL-2627-311',
      certOrigin: 'COO-IN-2026-7725'
    },
    {
      sNo: 5,
      id: 5743,
      invoiceNo: 'DFL/PT/2627/310',
      invoiceDate: '18-09-2026',
      poNo: '60150DEV010C',
      buyer: 'CRUSTA C SAS',
      country: 'FRANCE',
      internalLotNo: 'LOT-2627-0812',
      status: 'Completed',
      certHealth: 'EIA/2026/09714 (EU Format)',
      certCoa: 'COA-DFL-2627-310',
      certOrigin: 'COO-IN-2026-7681'
    },
    {
      sNo: 6,
      id: 6131,
      invoiceNo: 'DFL/PT/2627/309',
      invoiceDate: '18-09-2026',
      poNo: '1102650475',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      country: 'U.S.A.',
      internalLotNo: 'LOT-2627-0808',
      status: 'Completed',
      certHealth: 'EIA/2026/09712',
      certCoa: 'COA-DFL-2627-309',
      certOrigin: 'COO-IN-2026-7678'
    },
    {
      sNo: 7,
      id: 7050,
      invoiceNo: 'DFL/PT/2627/308',
      invoiceDate: '18-09-2026',
      poNo: 'DF/DF-5611',
      buyer: 'DEVI FISHERIES INC.',
      country: 'U.S.A.',
      internalLotNo: 'LOT-2627-0795',
      status: 'Completed',
      certHealth: 'EIA/2026/09710',
      certCoa: 'COA-DFL-2627-308',
      certOrigin: 'COO-IN-2026-7675'
    }
  ],

  renderDocumentation(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">DOCUMENTATION</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">QC Operations &bull; Export Shipment Documentation, Health Certificates &amp; Consignee Register</span>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="doc-filter-form" class="space-y-4" onsubmit="event.preventDefault(); QCView.handleDocFilter();">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT YEAR</label>
                <select id="doc-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  ${['2026-2027', '2025-2026', '2024-2025'].map(y => `<option value="${y}" ${this.docSelectedYear === y ? 'selected' : ''}>${y}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT EXPORTER :</label>
                <select id="doc-filter-exporter" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                  <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT CONSIGNEE :</label>
                <select id="doc-filter-consignee" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  <option value="All" selected>All</option>
                  <option value="DEVI FISHERIES INC.">DEVI FISHERIES INC.</option>
                  <option value="STANLEY PEARLMAN ENTERPRISES, INC.">STANLEY PEARLMAN ENTERPRISES, INC.</option>
                  <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                  <option value="CRUSTA C SAS">CRUSTA C SAS</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT COUNTRY:</label>
                <select id="doc-filter-country" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  <option value="All" selected>All</option>
                  <option value="U.S.A.">U.S.A.</option>
                  <option value="FRANCE">FRANCE</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BILLS TYPE:</label>
                <select id="doc-filter-bills-type" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  <option value="Completed" selected>Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="All">All</option>
                </select>
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="submit" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <span>Search</span>
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input type="text" id="doc-search-input" onkeyup="QCView.handleDocSearch(this.value)" placeholder="Search by Invoice, PO, Buyer, Country..." class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] transition-all"/>
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" onclick="const s = document.getElementById('doc-search-input'); if(s) s.focus();" class="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#006C7A] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button type="button" onclick="QCView.renderDocTableRows(QCView.documentationList)" class="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#006C7A] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
              <span id="doc-counter" class="text-xs font-semibold text-[#64748B] ml-2">Showing ${this.documentationList.length} records</span>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4">SNO</th>
                  <th class="py-3 px-4">ID</th>
                  <th class="py-3 px-4">Invoice No</th>
                  <th class="py-3 px-4">Invoice Date</th>
                  <th class="py-3 px-4">Po No</th>
                  <th class="py-3 px-4">Buyer</th>
                  <th class="py-3 px-4">Country</th>
                  <th class="py-3 px-4">Internal Lot No</th>
                  <th class="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="doc-table-body" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.renderDocTableRows();
  },

  renderDocTableRows(data) {
    const list = data || this.documentationList;
    const tbody = document.getElementById('doc-table-body');
    if (!tbody) return;

    tbody.innerHTML = list.map((r, i) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${i % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 text-[#475569] font-medium">${r.id}</td>
        <td class="py-3 px-4 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="QCView.openDocumentationModal(${r.id})">${r.invoiceNo}</td>
        <td class="py-3 px-4 text-[#64748B] whitespace-nowrap">${r.invoiceDate}</td>
        <td class="py-3 px-4 font-semibold text-[#1E293B]">${r.poNo}</td>
        <td class="py-3 px-4 text-[#334155] font-medium">${r.buyer}</td>
        <td class="py-3 px-4"><span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-[#334155]">${r.country}</span></td>
        <td class="py-3 px-4 text-[#64748B] font-mono text-[11px]">${r.internalLotNo || '-'}</td>
        <td class="py-3 px-4 text-center">
          <button type="button" onclick="QCView.openDocumentationModal(${r.id})" class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center" title="Edit Documentation">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  handleDocSearch(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.renderDocTableRows(this.documentationList);
      return;
    }
    const filtered = this.documentationList.filter(r =>
      r.invoiceNo.toLowerCase().includes(q) ||
      r.poNo.toLowerCase().includes(q) ||
      r.buyer.toLowerCase().includes(q) ||
      r.country.toLowerCase().includes(q)
    );
    this.renderDocTableRows(filtered);
  },

  handleDocFilter() {
    const consignee = document.getElementById('doc-filter-consignee')?.value || 'All';
    let list = this.documentationList;
    if (consignee !== 'All') {
      list = list.filter(r => r.buyer.toLowerCase() === consignee.toLowerCase());
    }
    this.renderDocTableRows(list);
  },

  openDocumentationModal(id) {
    const doc = this.documentationList.find(d => d.id === id);
    if (!doc) return;

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: `QC SHIPMENT DOCUMENTATION: ${doc.invoiceNo}`,
      size: 'xl',
      content: `
        <div class="space-y-4 text-xs text-[#1E293B]">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">INVOICE NO</span>
              <span class="font-bold text-xs text-[#006C7A] block mt-0.5">${doc.invoiceNo}</span>
            </div>
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">INVOICE DATE</span>
              <span class="font-bold text-xs text-[#1E293B] block mt-0.5">${doc.invoiceDate}</span>
            </div>
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">PO NUMBER</span>
              <span class="font-bold text-xs text-[#1E293B] block mt-0.5">${doc.poNo}</span>
            </div>
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">DESTINATION</span>
              <span class="font-bold text-xs text-[#1E293B] block mt-0.5">${doc.country}</span>
            </div>
          </div>
          <div class="flex items-center justify-end pt-2">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if(m && m.close) m.close();" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer">
              Close
            </button>
          </div>
        </div>
      `
    });
  },

  renderQCOrders(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">QC ORDERS &amp; CLEARANCE REGISTER</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">QC Operations &bull; Production Order Clearances &amp; Pre-Shipment Inspection Status</span>
          </div>
        </div>
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-6 text-center text-xs text-[#64748B]">
          QC Orders Register loaded and active.
        </div>
      </div>
    `;
  },

  // ==========================================
  // 8. CHEMICAL SCREENING: TAB 1 - FOOD & SOCIAL AUDIT
  // ==========================================
  foodSocialAuditList: [
    {
      sNo: 1,
      auditType: 'Hatchery',
      farmName: 'DeviFishires Hatchry-2',
      farmerName: 'TADIPUDI VENKATA RAMA RAJU',
      hatcheryLocation: 'Uppada',
      certifiedBody: 'AOC',
      associatedFactory: 'DFL UNIT-5 (JPT)',
      govAuthority: 'MPEDA',
      govRegNumber: '3423',
      bapNumber: '6756',
      tonnagePerAnnum: '50',
      waterSpreadArea: '20',
      auditDate: '08-01-2024'
    },
    {
      sNo: 2,
      auditType: 'Farm',
      farmName: 'DeviFishires Hatchry-1',
      farmerName: 'KANTHETI BALARAMA RAJU',
      hatcheryLocation: 'Kakinada',
      certifiedBody: 'BAP',
      associatedFactory: 'DFL UNIT-5 (JPT)',
      govAuthority: 'MPEDA',
      govRegNumber: '1222555',
      bapNumber: '122555',
      tonnagePerAnnum: '12551',
      waterSpreadArea: '1325',
      auditDate: '01-10-2026'
    },
    {
      sNo: 3,
      auditType: 'Feed Mill',
      farmName: 'DeviFishires Hatchry-1',
      farmerName: 'TADIPUDI VENKATA RAMA RAJU',
      hatcheryLocation: 'Kakinada',
      certifiedBody: 'AOC',
      associatedFactory: 'DFL UNIT-3 (PSP)',
      govAuthority: 'MPEDA',
      govRegNumber: '1222555',
      bapNumber: '122555',
      tonnagePerAnnum: '12551',
      waterSpreadArea: '1325',
      auditDate: '09-10-2026'
    }
  ],

  renderFoodSocialAudit(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">FOOD &amp; SOCIAL AUDIT</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screening &bull; Farm, Hatchery &amp; Feed Mill Compliance Audit Register</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="QCView.openAddMillModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Mill</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form class="space-y-4" onsubmit="event.preventDefault(); QCView.handleFoodAuditFilter();">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">AUDIT TYPE</label>
                <select id="food-audit-filter-type" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  <option value="All" selected>All</option>
                  <option value="Hatchery">Hatchery</option>
                  <option value="Farm">Farm</option>
                  <option value="Feed Mill">Feed Mill</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="food-audit-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  <option value="2026-27" selected>2026-27</option>
                  <option value="2025-26">2025-26</option>
                </select>
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="submit" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <span>Search</span>
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input type="text" id="food-audit-search-input" onkeyup="QCView.handleFoodAuditSearch(this.value)" placeholder="Search audits, farms, farmers..." class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] transition-all"/>
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <span id="food-audit-counter" class="text-xs font-semibold text-[#64748B]">Showing 1 to 3 out of 3 entries</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none whitespace-nowrap">
                  <th class="py-3 px-4">S.NO</th>
                  <th class="py-3 px-4">Audit Type</th>
                  <th class="py-3 px-4">Farm Name</th>
                  <th class="py-3 px-4">Farmer Name</th>
                  <th class="py-3 px-4">Hatchry Location</th>
                  <th class="py-3 px-4">Certified Body</th>
                  <th class="py-3 px-4">Associated Factory</th>
                  <th class="py-3 px-4">Government Authority</th>
                  <th class="py-3 px-4">Gov Registration Number</th>
                  <th class="py-3 px-4">BAP Number</th>
                  <th class="py-3 px-4 text-right">Tonnage/Annum</th>
                  <th class="py-3 px-4 text-right">Water Spread Area</th>
                  <th class="py-3 px-4 text-center">Audit Date</th>
                </tr>
              </thead>
              <tbody id="food-audit-tbody" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B] whitespace-nowrap">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.renderFoodAuditTableRows();
  },

  renderFoodAuditTableRows(data) {
    const list = data || this.foodSocialAuditList;
    const tbody = document.getElementById('food-audit-tbody');
    if (!tbody) return;

    tbody.innerHTML = list.map((r, i) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${i % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 font-semibold text-[#006C7A]">${r.auditType}</td>
        <td class="py-3 px-4 text-[#334155] font-medium">${r.farmName}</td>
        <td class="py-3 px-4 text-[#1E293B] font-semibold">${r.farmerName}</td>
        <td class="py-3 px-4 text-[#64748B]">${r.hatcheryLocation}</td>
        <td class="py-3 px-4"><span class="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-[#334155]">${r.certifiedBody}</span></td>
        <td class="py-3 px-4 text-[#334155] font-medium">${r.associatedFactory}</td>
        <td class="py-3 px-4 text-[#64748B]">${r.govAuthority}</td>
        <td class="py-3 px-4 font-mono text-[#475569]">${r.govRegNumber}</td>
        <td class="py-3 px-4 font-mono text-[#006C7A] font-semibold">${r.bapNumber}</td>
        <td class="py-3 px-4 text-right font-bold text-[#1E293B]">${r.tonnagePerAnnum}</td>
        <td class="py-3 px-4 text-right font-medium text-[#475569]">${r.waterSpreadArea}</td>
        <td class="py-3 px-4 text-center text-[#64748B] font-mono">${r.auditDate}</td>
      </tr>
    `).join('');
  },

  handleFoodAuditSearch(q) {
    const query = (q || '').toLowerCase().trim();
    if (!query) {
      this.renderFoodAuditTableRows(this.foodSocialAuditList);
      return;
    }
    const filtered = this.foodSocialAuditList.filter(r =>
      r.auditType.toLowerCase().includes(query) ||
      r.farmName.toLowerCase().includes(query) ||
      r.farmerName.toLowerCase().includes(query) ||
      r.hatcheryLocation.toLowerCase().includes(query)
    );
    this.renderFoodAuditTableRows(filtered);
  },

  handleFoodAuditFilter() {
    const type = document.getElementById('food-audit-filter-type')?.value || 'All';
    let list = this.foodSocialAuditList;
    if (type !== 'All') {
      list = list.filter(r => r.auditType.toLowerCase() === type.toLowerCase());
    }
    this.renderFoodAuditTableRows(list);
  },

  // EXACT CHILD SCREEN 1: FS AUDIT MILL CREATE
  openAddMillModal() {
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    const todayStr = new Date().toISOString().split('T')[0];

    m.open({
      title: 'FS AUDIT MILL CREATE',
      size: '2xl',
      content: `
        <form class="space-y-4 text-xs text-[#1E293B]" onsubmit="event.preventDefault(); QCView.handleFSAuditMillSubmit();">
          <!-- Row 1: AUDIT TYPE, FARMER NAME, HATCHERY NAME, CERTIFIED BODY -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT TYPE <span class="text-rose-500">*</span></label>
              <select id="fs-audit-type" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="Hatchery">Hatchery</option>
                <option value="Farm">Farm</option>
                <option value="Feed Mill" selected>Feed Mill</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">FARMER NAME <span class="text-rose-500">*</span></label>
              <select id="fs-farmer-name" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="TADIPUDI VENKATA RAMA RAJU" selected>TADIPUDI VENKATA RAMA RAJU</option>
                <option value="KANTHETI BALARAMA RAJU">KANTHETI BALARAMA RAJU</option>
                <option value="D. V. SUBBA RAJU">D. V. SUBBA RAJU</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">HATCHERY NAME <span class="text-rose-500">*</span></label>
              <select id="fs-hatchery-name" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="DeviFishires Hatchry-1" selected>DeviFishires Hatchry-1</option>
                <option value="DeviFishires Hatchry-2">DeviFishires Hatchry-2</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">CERTIFIED BODY <span class="text-rose-500">*</span></label>
              <select id="fs-certified-body" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="AOC" selected>AOC</option>
                <option value="BAP">BAP</option>
                <option value="ASC">ASC</option>
              </select>
            </div>
          </div>

          <!-- Row 2: ASSOCIATED FACTORY, GOVERNMENT AUTHORITY, GOV REG NUMBER, BAP NUMBER -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">ASSOCIATED FACTORY <span class="text-rose-500">*</span></label>
              <select id="fs-associated-factory" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="DFL UNIT-5 (JPT)" selected>DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                <option value="DFL UNIT-1">DFL UNIT-1</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">GOVERNMENT AUTHORITY <span class="text-rose-500">*</span></label>
              <select id="fs-gov-authority" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="MPEDA" selected>MPEDA</option>
                <option value="CAA">CAA</option>
                <option value="EIA">EIA</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">GOV REGISTRATION NUMBER <span class="text-rose-500">*</span></label>
              <input type="text" id="fs-gov-reg-no" placeholder="Enter Registration Number" value="1222555" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">BAP NUMBER <span class="text-rose-500">*</span></label>
              <input type="text" id="fs-bap-number" placeholder="Enter BAP Number" value="122555" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>

          <!-- Row 3: TONNAGE/ANNUM, WATER SPREAD AREA, AUDIT DATE, ISSUED ON DATE -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">TONNAGE/ANNUM <span class="text-rose-500">*</span></label>
              <input type="text" id="fs-tonnage" placeholder="Enter Tonnage/Annum Number" value="12551" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">WATER SPREAD AREA <span class="text-rose-500">*</span></label>
              <input type="text" id="fs-water-area" placeholder="Enter Water Spread Area" value="1325" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT DATE <span class="text-rose-500">*</span></label>
              <input type="date" id="fs-audit-date" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">ISSUED ON DATE <span class="text-rose-500">*</span></label>
              <input type="date" id="fs-issued-date" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>

          <!-- Row 4: VALID UPTO, STATUS -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">VALID UPTO <span class="text-rose-500">*</span></label>
              <input type="date" id="fs-valid-upto" value="2027-10-26" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">STATUS <span class="text-rose-500">*</span></label>
              <select id="fs-status" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="Active" selected>Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if(m && m.close) m.close();" class="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
              Close
            </button>
            <button type="submit" class="px-6 py-2.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <span>Save</span>
            </button>
          </div>
        </form>
      `
    });
  },

  handleFSAuditMillSubmit() {
    const type = document.getElementById('fs-audit-type')?.value || 'Feed Mill';
    const farmer = document.getElementById('fs-farmer-name')?.value || 'Owner';
    const hatchery = document.getElementById('fs-hatchery-name')?.value || 'DeviFishires Hatchry-1';
    const body = document.getElementById('fs-certified-body')?.value || 'AOC';
    const factory = document.getElementById('fs-associated-factory')?.value || 'DFL UNIT-5 (JPT)';
    const auth = document.getElementById('fs-gov-authority')?.value || 'MPEDA';
    const reg = document.getElementById('fs-gov-reg-no')?.value || '12345';
    const bap = document.getElementById('fs-bap-number')?.value || '6789';
    const tonnage = document.getElementById('fs-tonnage')?.value || '1000';
    const area = document.getElementById('fs-water-area')?.value || '100';

    this.foodSocialAuditList.unshift({
      sNo: this.foodSocialAuditList.length + 1,
      auditType: type,
      farmName: hatchery,
      farmerName: farmer,
      hatcheryLocation: 'Kakinada',
      certifiedBody: body,
      associatedFactory: factory,
      govAuthority: auth,
      govRegNumber: reg,
      bapNumber: bap,
      tonnagePerAnnum: tonnage,
      waterSpreadArea: area,
      auditDate: new Date().toLocaleDateString('en-GB').replace(/\//g, '-')
    });

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : window.Modal;
    if (m && m.close) m.close();

    this.renderFoodAuditTableRows();
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('FS Audit Mill record saved successfully!', 'success');
    }
  },

  // ==========================================
  // 9. CHEMICAL SCREENING: TAB 2 - FARM/MILL/HATCHERY AUDIT
  // ==========================================
  farmMillAuditList: [
    {
      sNo: 1,
      plantName: 'DFL UNIT-5 (JPT)',
      auditName: 'APCB',
      auditType: 'SOCIAL',
      certAuthority: 'Authority1',
      regNumber: '89765',
      certNumber: '3456',
      startDate: '12-01-2024',
      endDate: '14-01-2024',
      program: 'Announced',
      issuedOn: '14-01-2023',
      validUpto: '15-01-2024',
      renewalDate: '16-01-2024',
      grade: 'GradeA'
    },
    {
      sNo: 2,
      plantName: 'DFL UNIT-3 (PSP)',
      auditName: 'APCB',
      auditType: 'FOOD',
      certAuthority: 'Authority1',
      regNumber: '12345',
      certNumber: '67890',
      startDate: '19-03-2024',
      endDate: '20-03-2024',
      program: 'Announced',
      issuedOn: '20-03-2024',
      validUpto: '22-03-2024',
      renewalDate: '23-03-2024',
      grade: 'GradeA'
    }
  ],

  renderFarmMillHatcheryAudit(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">FARM/MILL/HATCHERY AUDIT</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screening &bull; Plant Certifications, APCB &amp; External Verification Registry</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="QCView.openAddFarmAuditModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Audit</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form class="space-y-4" onsubmit="event.preventDefault(); QCView.handleFarmAuditFilter();">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT</label>
                <select id="farm-audit-filter-plant" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  <option value="Select" selected>Select Plant</option>
                  <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                  <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                  <option value="DFL UNIT-1">DFL UNIT-1</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="farm-audit-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  <option value="2026-27" selected>2026-27</option>
                  <option value="2025-26">2025-26</option>
                </select>
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="submit" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <span>Search</span>
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input type="text" id="farm-audit-search-input" onkeyup="QCView.handleFarmAuditSearch(this.value)" placeholder="Search audits, plant names..." class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] transition-all"/>
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <span id="farm-audit-counter" class="text-xs font-semibold text-[#64748B]">Showing ${this.farmMillAuditList.length} records</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none whitespace-nowrap">
                  <th class="py-3 px-4">S.NO</th>
                  <th class="py-3 px-4">Plant Name</th>
                  <th class="py-3 px-4">Audit Name</th>
                  <th class="py-3 px-4">Audit Type</th>
                  <th class="py-3 px-4">Certification Authority</th>
                  <th class="py-3 px-4">Registration Number</th>
                  <th class="py-3 px-4">Certification Number</th>
                  <th class="py-3 px-4">Audit Start Date</th>
                  <th class="py-3 px-4">Audit End Date</th>
                  <th class="py-3 px-4">Audit Program</th>
                  <th class="py-3 px-4">Issued On</th>
                  <th class="py-3 px-4">Valid Upto</th>
                  <th class="py-3 px-4">Renewal Date</th>
                  <th class="py-3 px-4 text-center">Audit Grade</th>
                </tr>
              </thead>
              <tbody id="farm-audit-tbody" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B] whitespace-nowrap">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.renderFarmAuditTableRows();
  },

  renderFarmAuditTableRows(data) {
    const list = data || this.farmMillAuditList;
    const tbody = document.getElementById('farm-audit-tbody');
    if (!tbody) return;

    tbody.innerHTML = list.map((r, i) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${i % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 font-bold text-[#006C7A]">${r.plantName}</td>
        <td class="py-3 px-4 text-[#334155] font-semibold">${r.auditName}</td>
        <td class="py-3 px-4"><span class="inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${r.auditType === 'FOOD' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}">${r.auditType}</span></td>
        <td class="py-3 px-4 text-[#475569] font-medium">${r.certAuthority}</td>
        <td class="py-3 px-4 font-mono text-[#334155]">${r.regNumber}</td>
        <td class="py-3 px-4 font-mono text-[#006C7A] font-semibold">${r.certNumber}</td>
        <td class="py-3 px-4 text-[#64748B] font-mono">${r.startDate}</td>
        <td class="py-3 px-4 text-[#64748B] font-mono">${r.endDate}</td>
        <td class="py-3 px-4 text-[#334155] font-medium">${r.program}</td>
        <td class="py-3 px-4 text-[#64748B] font-mono">${r.issuedOn}</td>
        <td class="py-3 px-4 text-[#64748B] font-mono">${r.validUpto}</td>
        <td class="py-3 px-4 text-[#64748B] font-mono">${r.renewalDate}</td>
        <td class="py-3 px-4 text-center">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${r.grade}</span>
        </td>
      </tr>
    `).join('');
  },

  handleFarmAuditSearch(q) {
    const query = (q || '').toLowerCase().trim();
    if (!query) {
      this.renderFarmAuditTableRows(this.farmMillAuditList);
      return;
    }
    const filtered = this.farmMillAuditList.filter(r =>
      r.plantName.toLowerCase().includes(query) ||
      r.auditName.toLowerCase().includes(query) ||
      r.certNumber.toLowerCase().includes(query)
    );
    this.renderFarmAuditTableRows(filtered);
  },

  handleFarmAuditFilter() {
    const plant = document.getElementById('farm-audit-filter-plant')?.value || 'Select';
    let list = this.farmMillAuditList;
    if (plant !== 'Select') {
      list = list.filter(r => r.plantName.toLowerCase().includes(plant.toLowerCase()));
    }
    this.renderFarmAuditTableRows(list);
  },

  // EXACT CHILD SCREEN 2: FS AUDIT CREATE
  openAddFarmAuditModal() {
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    const todayStr = new Date().toISOString().split('T')[0];

    m.open({
      title: 'FS AUDIT CREATE',
      size: '2xl',
      content: `
        <form class="space-y-4 text-xs text-[#1E293B]" onsubmit="event.preventDefault(); QCView.handleFSAuditCreateSubmit();">
          <!-- Row 1: PLANT NAME, AUDIT NAME, AUDIT TYPE, CERTIFICATE AUTHORITY -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">PLANT NAME <span class="text-rose-500">*</span></label>
              <select id="fs-plant-name" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="DFL UNIT-5 (JPT)" selected>DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                <option value="DFL UNIT-1">DFL UNIT-1</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT NAME <span class="text-rose-500">*</span></label>
              <select id="fs-audit-name" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="APCB" selected>APCB</option>
                <option value="BAP">BAP</option>
                <option value="BRCGS">BRCGS</option>
                <option value="HACCP">HACCP</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT TYPE <span class="text-rose-500">*</span></label>
              <select id="fs-create-audit-type" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="SOCIAL" selected>SOCIAL</option>
                <option value="FOOD">FOOD</option>
                <option value="ENVIRONMENTAL">ENVIRONMENTAL</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">CERTIFICATE AUTHORITY <span class="text-rose-500">*</span></label>
              <select id="fs-cert-authority" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="Authority1" selected>Authority1</option>
                <option value="MPEDA">MPEDA</option>
                <option value="APPCB">APPCB</option>
              </select>
            </div>
          </div>

          <!-- Row 2: REGISTRATION NUMBER, CERTIFICATE NUMBER, AUDIT START DATE, AUDIT END DATE -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">REGISTRATION NUMBER <span class="text-rose-500">*</span></label>
              <input type="text" id="fs-reg-number" placeholder="Enter Registration Number" value="89765" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">CERTIFICATE NUMBER <span class="text-rose-500">*</span></label>
              <input type="text" id="fs-cert-number" placeholder="Enter Certificate Number" value="3456" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT START DATE <span class="text-rose-500">*</span></label>
              <input type="date" id="fs-start-date" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT END DATE <span class="text-rose-500">*</span></label>
              <input type="date" id="fs-end-date" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>

          <!-- Row 3: AUDIT PROGRAM, ISSUED ON, VALID UPTO, RENEWAL DATE -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT PROGRAM <span class="text-rose-500">*</span></label>
              <select id="fs-audit-program" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="Announced" selected>Announced</option>
                <option value="Unannounced">Unannounced</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">ISSUED ON <span class="text-rose-500">*</span></label>
              <input type="date" id="fs-cert-issued-on" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">VALID UPTO <span class="text-rose-500">*</span></label>
              <input type="date" id="fs-cert-valid-upto" value="2027-10-26" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">RENEWAL DATE <span class="text-rose-500">*</span></label>
              <input type="date" id="fs-cert-renewal-date" value="2027-10-27" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>

          <!-- Row 4: AUDIT GRADE, STATUS -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT GRADE <span class="text-rose-500">*</span></label>
              <select id="fs-audit-grade" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="">Select</option>
                <option value="GradeA" selected>GradeA</option>
                <option value="GradeA+">GradeA+</option>
                <option value="GradeB">GradeB</option>
                <option value="Pass">Pass</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">STATUS <span class="text-rose-500">*</span></label>
              <select id="fs-create-status" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
                <option value="Active" selected>Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if(m && m.close) m.close();" class="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
              Close
            </button>
            <button type="submit" class="px-6 py-2.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <span>Save</span>
            </button>
          </div>
        </form>
      `
    });
  },

  handleFSAuditCreateSubmit() {
    const plant = document.getElementById('fs-plant-name')?.value || 'DFL UNIT-5 (JPT)';
    const name = document.getElementById('fs-audit-name')?.value || 'APCB';
    const type = document.getElementById('fs-create-audit-type')?.value || 'SOCIAL';
    const auth = document.getElementById('fs-cert-authority')?.value || 'Authority1';
    const reg = document.getElementById('fs-reg-number')?.value || '12345';
    const cert = document.getElementById('fs-cert-number')?.value || '67890';
    const grade = document.getElementById('fs-audit-grade')?.value || 'GradeA';

    this.farmMillAuditList.unshift({
      sNo: this.farmMillAuditList.length + 1,
      plantName: plant,
      auditName: name,
      auditType: type,
      certAuthority: auth,
      regNumber: reg,
      certNumber: cert,
      startDate: '26-10-2026',
      endDate: '28-10-2026',
      program: 'Announced',
      issuedOn: '26-10-2026',
      validUpto: '26-10-2027',
      renewalDate: '27-10-2027',
      grade: grade
    });

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : window.Modal;
    if (m && m.close) m.close();

    this.renderFarmAuditTableRows();
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('FS Audit record saved successfully!', 'success');
    }
  },

  // ==========================================
  // 10. CHEMICAL SCREENING: TAB 3 - HATCHERY LIST
  // ==========================================
  hatcheryListData: [
    { sNo: 1, name: 'DeviFishires Hatchry-1', location: 'Kakinada', capacity: '5 Tonnes' },
    { sNo: 2, name: 'DeviFishires Hatchry-2', location: 'Uppada', capacity: '3 Tonnes' }
  ],

  renderHatcheryList(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">HATCHERY LIST</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screening &bull; Registered Aquaculture Hatchery Sources &amp; Capacities</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="QCView.openAddHatcheryModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Hatchery</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input type="text" id="hatchery-search-input" onkeyup="QCView.handleHatcherySearch(this.value)" placeholder="Search hatchery by name, location..." class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] transition-all"/>
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" onclick="const s = document.getElementById('hatchery-search-input'); if(s) s.focus();" class="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#006C7A] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button type="button" onclick="QCView.renderHatcheryTableRows(QCView.hatcheryListData)" class="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#006C7A] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4">S.No</th>
                  <th class="py-3 px-4">Hatchery Name</th>
                  <th class="py-3 px-4">Hatchery Location</th>
                  <th class="py-3 px-4">Hatchery Capacity</th>
                  <th class="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="hatchery-table-body" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.renderHatcheryTableRows();
  },

  renderHatcheryTableRows(data) {
    const list = data || this.hatcheryListData;
    const tbody = document.getElementById('hatchery-table-body');
    if (!tbody) return;

    tbody.innerHTML = list.map((r, i) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${i % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="QCView.openEditHatcheryModal(${r.sNo})">${r.name}</td>
        <td class="py-3 px-4 text-[#334155] font-medium">${r.location}</td>
        <td class="py-3 px-4 text-[#475569] font-semibold">${r.capacity}</td>
        <td class="py-3 px-4 text-center">
          <button type="button" onclick="QCView.openEditHatcheryModal(${r.sNo})" class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center" title="Edit Hatchery">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  handleHatcherySearch(q) {
    const query = (q || '').toLowerCase().trim();
    if (!query) {
      this.renderHatcheryTableRows(this.hatcheryListData);
      return;
    }
    const filtered = this.hatcheryListData.filter(r =>
      r.name.toLowerCase().includes(query) ||
      r.location.toLowerCase().includes(query) ||
      r.capacity.toLowerCase().includes(query)
    );
    this.renderHatcheryTableRows(filtered);
  },

  // EXACT CHILD SCREEN 3: HATCHERY CREATE
  openAddHatcheryModal() {
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: 'HATCHERY CREATE',
      size: 'lg',
      content: `
        <form class="space-y-4 text-xs text-[#1E293B]" onsubmit="event.preventDefault(); QCView.handleAddHatcherySubmit();">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">HATCHERY NAME <span class="text-rose-500">*</span></label>
              <input type="text" id="create-hatchery-name" placeholder="Enter Hatchery Name" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">HATCHERY LOCATION <span class="text-rose-500">*</span></label>
              <input type="text" id="create-hatchery-location" placeholder="Enter Hatchery Location" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">HATCHERY CAPACITY <span class="text-rose-500">*</span></label>
              <input type="text" id="create-hatchery-capacity" placeholder="Enter Hatchery Capacity" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="flex items-center justify-end gap-3 pt-3 border-t border-[#F1F5F9]">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if(m && m.close) m.close();" class="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
              Close
            </button>
            <button type="submit" class="px-6 py-2.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <span>Save</span>
            </button>
          </div>
        </form>
      `
    });
  },

  handleAddHatcherySubmit() {
    const name = document.getElementById('create-hatchery-name')?.value || 'New Hatchery';
    const loc = document.getElementById('create-hatchery-location')?.value || 'Kakinada';
    const cap = document.getElementById('create-hatchery-capacity')?.value || '3 Tonnes';

    this.hatcheryListData.push({
      sNo: this.hatcheryListData.length + 1,
      name: name,
      location: loc,
      capacity: cap
    });

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : window.Modal;
    if (m && m.close) m.close();

    this.renderHatcheryTableRows();
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Hatchery created successfully!', 'success');
    }
  },

  openEditHatcheryModal(sNo) {
    const h = this.hatcheryListData.find(item => item.sNo === sNo);
    if (!h) return;

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: `EDIT HATCHERY: ${h.name}`,
      size: 'lg',
      content: `
        <form class="space-y-4 text-xs text-[#1E293B]" onsubmit="event.preventDefault(); QCView.handleEditHatcherySubmit(${h.sNo});">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">HATCHERY NAME</label>
              <input type="text" id="modal-edit-hatchery-name" value="${h.name}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">HATCHERY LOCATION</label>
              <input type="text" id="modal-edit-hatchery-location" value="${h.location}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">HATCHERY CAPACITY</label>
              <input type="text" id="modal-edit-hatchery-capacity" value="${h.capacity}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
          </div>
          <div class="flex items-center justify-end gap-3 pt-3 border-t border-[#F1F5F9]">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if(m && m.close) m.close();" class="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
              Close
            </button>
            <button type="submit" class="px-6 py-2.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <span>Save</span>
            </button>
          </div>
        </form>
      `
    });
  },

  handleEditHatcherySubmit(sNo) {
    const h = this.hatcheryListData.find(item => item.sNo === sNo);
    if (!h) return;
    h.name = document.getElementById('modal-edit-hatchery-name')?.value || h.name;
    h.location = document.getElementById('modal-edit-hatchery-location')?.value || h.location;
    h.capacity = document.getElementById('modal-edit-hatchery-capacity')?.value || h.capacity;

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : window.Modal;
    if (m && m.close) m.close();

    this.renderHatcheryTableRows();
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Hatchery details updated successfully!', 'success');
    }
  }


};
