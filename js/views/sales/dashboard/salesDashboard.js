// Sales Module — Executive Dashboard & Pipeline
export const salesDashboard = {
  // ==========================================
  // 1. EXECUTIVE DASHBOARD & PIPELINE (EXACT REFERENCE OVERVIEW)
  // ==========================================
  refreshDashboard() {
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Sales Dashboard filters updated', 'info');
    }
    const container = document.getElementById('sales-subpage-content');
    if (container) {
      this.renderDashboard(container);
    }
  },

  renderDashboard(container) {
    const kpis = {
      pendingContracts: 561,
      onWater: 348,
      delivered: 624,
      orders: 1533,
      pendingPayments: 358,
      paymentsReceived: 614
    };

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#172B4D]">
        <!-- Top Filter Bar -->
        <div class="bg-white rounded-lg border border-[#DFE1E6] p-3.5 shadow-xs">
          <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
            <h2 class="text-sm font-bold text-[#172B4D] tracking-tight flex items-center gap-2">
              <svg class="w-4 h-4 text-[#008DA6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              <span>Dashboard Filters</span>
            </h2>
            <span class="text-[11px] text-[#5E6C84]">Real-time Export Order & Shipment Analytics</span>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 items-end">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] mb-1">Exporter</label>
              <select id="sales-filter-exporter" class="w-full text-xs px-2 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7] truncate font-medium">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] mb-1">Consignee</label>
              <select id="sales-filter-consignee" class="w-full text-xs px-2 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7] truncate font-medium">
                <option value="ALL" selected>All</option>
                <option value="APEX">Apex Seafoods USA</option>
                <option value="DIRECT_SOURCE">Direct Source Seafood LLC</option>
                <option value="RED_CHAMBER">Red Chamber Co.</option>
                <option value="AQUA_STAR">Aqua Star LLC</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] mb-1">Brand</label>
              <select id="sales-filter-brand" class="w-full text-xs px-2 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7] truncate font-medium">
                <option value="ALL" selected>All</option>
                <option value="DEVI_CROWN">Devi Crown</option>
                <option value="DEVI_GOLD">Devi Gold</option>
                <option value="VOLIDA">Volida</option>
                <option value="BAY_FRESH">Bay Fresh</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] mb-1">Country</label>
              <select id="sales-filter-country" class="w-full text-xs px-2 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7] truncate font-medium">
                <option value="ALL" selected>All</option>
                <option value="USA">U.S.A.</option>
                <option value="CHINA">CHINA</option>
                <option value="BELGIUM">BELGIUM</option>
                <option value="RUSSIA">RUSSIA</option>
                <option value="CANADA">CANADA</option>
                <option value="UK">UNITED KINGDOM</option>
                <option value="JAPAN">JAPAN</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] mb-1">Year</label>
              <select id="sales-filter-year" class="w-full text-xs px-2 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7] font-medium">
                <option value="2026-27" selected>2026-27</option>
                <option value="2025-26">2025-26</option>
                <option value="2024-25">2024-25</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] mb-1">From Date</label>
              <input type="text" id="sales-filter-from-date" value="01/04/2026" class="w-full text-xs px-2 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7] font-medium">
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] mb-1">To Date</label>
              <input type="text" id="sales-filter-to-date" value="31/03/2027" class="w-full text-xs px-2 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7] font-medium">
            </div>
            <div>
              <button id="btn-sales-filter-search" class="w-full h-[32px] px-3 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors" onclick="SalesView.refreshDashboard()">
                <span>Search</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Row 1: 6 Metric KPI Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <!-- Pending Contracts -->
          <div class="p-3.5 bg-white rounded-lg border border-[#DFE1E6] shadow-xs hover:border-[#B3BAC5] transition-all">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] truncate">Pending Contracts</span>
              <span class="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </span>
            </div>
            <div class="text-2xl font-extrabold text-[#172B4D] tracking-tight">${kpis.pendingContracts}</div>
          </div>

          <!-- On Water -->
          <div class="p-3.5 bg-white rounded-lg border border-[#DFE1E6] shadow-xs hover:border-[#B3BAC5] transition-all">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] truncate">On Water</span>
              <span class="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </span>
            </div>
            <div class="text-2xl font-extrabold text-[#172B4D] tracking-tight">${kpis.onWater}</div>
          </div>

          <!-- Delivered -->
          <div class="p-3.5 bg-white rounded-lg border border-[#DFE1E6] shadow-xs hover:border-[#B3BAC5] transition-all">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] truncate">Delivered</span>
              <span class="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </span>
            </div>
            <div class="text-2xl font-extrabold text-[#172B4D] tracking-tight">${kpis.delivered}</div>
          </div>

          <!-- Orders -->
          <div class="p-3.5 bg-white rounded-lg border border-[#DFE1E6] shadow-xs hover:border-[#B3BAC5] transition-all">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] truncate">Orders</span>
              <span class="w-7 h-7 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
              </span>
            </div>
            <div class="text-2xl font-extrabold text-[#172B4D] tracking-tight">${kpis.orders}</div>
          </div>

          <!-- Pending Payments -->
          <div class="p-3.5 bg-white rounded-lg border border-[#DFE1E6] shadow-xs hover:border-[#B3BAC5] transition-all">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] truncate">Pending Payments</span>
              <span class="w-7 h-7 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </span>
            </div>
            <div class="text-2xl font-extrabold text-[#172B4D] tracking-tight">${kpis.pendingPayments}</div>
          </div>

          <!-- Payments Received -->
          <div class="p-3.5 bg-white rounded-lg border border-[#DFE1E6] shadow-xs hover:border-[#B3BAC5] transition-all">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] truncate">Payments Received</span>
              <span class="w-7 h-7 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </span>
            </div>
            <div class="text-2xl font-extrabold text-[#172B4D] tracking-tight">${kpis.paymentsReceived}</div>
          </div>
        </div>

        <!-- Row 2: Dual Bar Charts -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Left: Invoice Vs Shipments -->
          <div class="bg-white rounded-lg border border-[#DFE1E6] p-4 shadow-xs">
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <h3 class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">Invoice Vs Shipments</h3>
              <span class="text-[11px] text-[#5E6C84]">Monthly Comparison (FY 2026-27)</span>
            </div>
            <div class="relative w-full h-64">
              <canvas id="sales-canvas-invoices-shipments" class="w-full h-full block"></canvas>
            </div>
            <div class="flex items-center justify-center gap-6 mt-3 pt-2 border-t border-[#EBECF0] text-xs font-semibold">
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-xs bg-[#10B981]"></span> Invoices</span>
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-xs bg-[#1E293B]"></span> Shipments</span>
            </div>
          </div>

          <!-- Right: Plant Wise Orders -->
          <div class="bg-white rounded-lg border border-[#DFE1E6] p-4 shadow-xs">
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <h3 class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">Plant Wise Orders</h3>
              <span class="text-[11px] text-[#5E6C84]">Unit Capacity & Fulfillment</span>
            </div>
            <div class="relative w-full h-64">
              <canvas id="sales-canvas-plant-orders" class="w-full h-full block"></canvas>
            </div>
            <div class="flex items-center justify-center gap-6 mt-3 pt-2 border-t border-[#EBECF0] text-xs font-semibold">
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-xs bg-[#008DA6]"></span> Total</span>
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-xs bg-[#F59E0B]"></span> Shipped</span>
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-xs bg-[#0284C7]"></span> Pending</span>
            </div>
          </div>
        </div>

        <!-- Row 3: Dual Donut / Distribution Charts -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Left: Country Wise Details -->
          <div class="bg-white rounded-lg border border-[#DFE1E6] p-4 shadow-xs">
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <h3 class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">Country Wise Details</h3>
              <span class="text-[11px] text-[#5E6C84]">Total: 972 Containers (100%)</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div class="relative w-full h-56 flex items-center justify-center">
                <canvas id="sales-canvas-country-donut" class="w-48 h-48 block"></canvas>
              </div>
              <div class="space-y-1.5 text-[11px] max-h-56 overflow-y-auto pr-2">
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#008DA6]"></span> U.S.A.</span>
                  <span class="font-bold text-[#172B4D]">736 <span class="text-[#5E6C84] font-normal">(75.72%)</span></span>
                </div>
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#0284C7]"></span> CHINA</span>
                  <span class="font-bold text-[#172B4D]">145 <span class="text-[#5E6C84] font-normal">(14.92%)</span></span>
                </div>
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span> BELGIUM</span>
                  <span class="font-bold text-[#172B4D]">39 <span class="text-[#5E6C84] font-normal">(4.01%)</span></span>
                </div>
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span> RUSSIA</span>
                  <span class="font-bold text-[#172B4D]">21 <span class="text-[#5E6C84] font-normal">(2.16%)</span></span>
                </div>
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#EC4899]"></span> CANADA</span>
                  <span class="font-bold text-[#172B4D]">7 <span class="text-[#5E6C84] font-normal">(0.72%)</span></span>
                </div>
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span> UNITED KINGDOM</span>
                  <span class="font-bold text-[#172B4D]">7 <span class="text-[#5E6C84] font-normal">(0.72%)</span></span>
                </div>
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#6366F1]"></span> FRANCE</span>
                  <span class="font-bold text-[#172B4D]">7 <span class="text-[#5E6C84] font-normal">(0.72%)</span></span>
                </div>
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#14B8A6]"></span> IRELAND</span>
                  <span class="font-bold text-[#172B4D]">3 <span class="text-[#5E6C84] font-normal">(0.31%)</span></span>
                </div>
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#EAB308]"></span> JAPAN</span>
                  <span class="font-bold text-[#172B4D]">3 <span class="text-[#5E6C84] font-normal">(0.31%)</span></span>
                </div>
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#64748B]"></span> NEW ZEALAND</span>
                  <span class="font-bold text-[#172B4D]">2 <span class="text-[#5E6C84] font-normal">(0.21%)</span></span>
                </div>
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#94A3B8]"></span> GERMANY</span>
                  <span class="font-bold text-[#172B4D]">1 <span class="text-[#5E6C84] font-normal">(0.10%)</span></span>
                </div>
                <div class="flex justify-between items-center py-0.5">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]"></span> BAHAMAS</span>
                  <span class="font-bold text-[#172B4D]">1 <span class="text-[#5E6C84] font-normal">(0.10%)</span></span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Shipped Containers (Port Wise) -->
          <div class="bg-white rounded-lg border border-[#DFE1E6] p-4 shadow-xs">
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <h3 class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">Shipped Containers (Port Wise)</h3>
              <span class="text-[11px] text-[#5E6C84]">Major Discharge Ports</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div class="relative w-full h-56 flex items-center justify-center">
                <canvas id="sales-canvas-port-donut" class="w-48 h-48 block"></canvas>
              </div>
              <div class="space-y-1.5 text-[11px] max-h-56 overflow-y-auto pr-2">
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#008DA6]"></span> SAVANNAH</span>
                  <span class="font-bold text-[#172B4D]">221</span>
                </div>
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#0284C7]"></span> LOS ANGELES</span>
                  <span class="font-bold text-[#172B4D]">197</span>
                </div>
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span> JIANQIANG</span>
                  <span class="font-bold text-[#172B4D]">151</span>
                </div>
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span> NEW YORK</span>
                  <span class="font-bold text-[#172B4D]">121</span>
                </div>
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span> BALTIMORE</span>
                  <span class="font-bold text-[#172B4D]">91</span>
                </div>
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#EC4899]"></span> ANTWERP</span>
                  <span class="font-bold text-[#172B4D]">39</span>
                </div>
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#6366F1]"></span> NEWARK</span>
                  <span class="font-bold text-[#172B4D]">34</span>
                </div>
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#14B8A6]"></span> SEATTLE</span>
                  <span class="font-bold text-[#172B4D]">24</span>
                </div>
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#64748B]"></span> ST PETERSBURG</span>
                  <span class="font-bold text-[#172B4D]">14</span>
                </div>
                <div class="flex justify-between items-center py-0.5 border-b border-[#EBECF0]">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#94A3B8]"></span> HOUSTON</span>
                  <span class="font-bold text-[#172B4D]">13</span>
                </div>
                <div class="flex justify-between items-center py-0.5">
                  <span class="flex items-center gap-1.5 font-medium"><span class="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]"></span> XIAMEN / OTHERS</span>
                  <span class="font-bold text-[#172B4D]">17</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 4: Size-Wise Stepped Comparison Chart -->
        <div class="bg-white rounded-lg border border-[#DFE1E6] p-4 shadow-xs">
          <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
            <div>
              <h3 class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">To be shipped Qty vs Shipped Qty</h3>
              <p class="text-[11px] text-[#5E6C84]">Shrimp Count / Grade Wise Tonnage Analysis</p>
            </div>
            <div class="flex items-center gap-4 text-xs font-semibold">
              <span class="flex items-center gap-1.5"><span class="w-3 h-0.5 bg-[#008DA6] rounded"></span> To be shipped Qty - Tons</span>
              <span class="flex items-center gap-1.5"><span class="w-3 h-0.5 bg-[#3B82F6] rounded"></span> Shipped Qty - Tons</span>
            </div>
          </div>
          <div class="relative w-full h-64">
            <canvas id="sales-canvas-qty-shipped" class="w-full h-full block"></canvas>
          </div>
        </div>

        <!-- Row 5: Freight Rates (Sample data) & Multi-Line Chart -->
        <div class="bg-white rounded-lg border border-[#DFE1E6] p-4 shadow-xs">
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div>
              <h3 class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">Freight Rates (Sample data)</h3>
              <p class="text-[11px] text-[#5E6C84]">Historical 40ft Reefer Container Freight Rates</p>
            </div>
            <!-- Active filter chips -->
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-[11px] font-bold text-[#5E6C84] uppercase">Liner:</span>
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F4F5F7] text-xs font-medium text-[#172B4D] border border-[#DFE1E6]">✕ MAERSK LINE</span>
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F4F5F7] text-xs font-medium text-[#172B4D] border border-[#DFE1E6]">✕ MSC LINE</span>
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F4F5F7] text-xs font-medium text-[#172B4D] border border-[#DFE1E6]">✕ CMA CGM</span>

              <span class="text-[11px] font-bold text-[#5E6C84] uppercase ml-2">Destination Port:</span>
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F4F5F7] text-xs font-medium text-[#172B4D] border border-[#DFE1E6]">✕ SAVANNAH</span>

              <span class="text-[11px] text-[#5E6C84] ml-2 font-medium">From: <strong class="text-[#172B4D]">21/08/2026</strong></span>
              <span class="text-[11px] text-[#5E6C84] font-medium">To: <strong class="text-[#172B4D]">21/10/2026</strong></span>

              <button class="px-2.5 py-1 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded flex items-center gap-1 shadow-xs ml-2 cursor-pointer transition-colors" onclick="SalesView.refreshDashboard()">
                <span>Search</span>
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
              <button class="px-2.5 py-1 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-semibold rounded flex items-center gap-1 shadow-xs cursor-pointer transition-colors" onclick="SalesView.downloadFreightData()">
                <span>Download</span>
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              </button>
            </div>
          </div>
          <div class="relative w-full h-64">
            <canvas id="sales-canvas-freight-rates" class="w-full h-full block"></canvas>
          </div>
        </div>
      </div>
    `;

    // Render Canvas Charts after DOM nodes mount
    setTimeout(() => {
      this.drawSalesDashboardCharts();
    }, 50);
  },

  downloadFreightData() {
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exporting Freight Rates Report (CSV)...', 'info');
    }
  },

  // Helper method to setup canvas for crisp High-DPI rendering
  initCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width || canvas.parentElement.clientWidth || 400;
    const height = rect.height || canvas.parentElement.clientHeight || 250;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { ctx, width, height };
  },

  drawSalesDashboardCharts() {
    this.drawInvoiceVsShipments('sales-canvas-invoices-shipments');
    this.drawPlantWiseOrders('sales-canvas-plant-orders');
    this.drawCountryWiseDonut('sales-canvas-country-donut');
    this.drawPortWiseDonut('sales-canvas-port-donut');
    this.drawQtyShippedComparison('sales-canvas-qty-shipped');
    this.drawFreightRatesTrend('sales-canvas-freight-rates');
  },

  // 1. Invoice vs Shipments Bar Chart
  drawInvoiceVsShipments(canvasId) {
    const setup = this.initCanvas(canvasId);
    if (!setup) return;
    const { ctx, width, height } = setup;

    const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    const invoices = [85, 95, 110, 134, 145, 160, 152, 130, 115, 125, 140, 145];
    const shipments = [72, 88, 95, 120, 138, 142, 148, 125, 110, 118, 132, 145];

    const padding = { top: 20, right: 20, bottom: 35, left: 40 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const maxVal = 180;

    // Draw horizontal grid lines & Y labels
    ctx.strokeStyle = '#F0F2F5';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#8993A4';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'right';

    for (let v = 0; v <= maxVal; v += 45) {
      const y = padding.top + chartH - (v / maxVal) * chartH;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
      ctx.fillText(v, padding.left - 6, y + 3);
    }

    // Draw monthly grouped bars
    const groupW = chartW / months.length;
    const barW = Math.max(3, Math.min(10, groupW * 0.32));

    months.forEach((m, i) => {
      const groupX = padding.left + i * groupW + groupW / 2;
      const invH = (invoices[i] / maxVal) * chartH;
      const shipH = (shipments[i] / maxVal) * chartH;

      // Invoices bar (Green #10B981)
      ctx.fillStyle = '#10B981';
      ctx.fillRect(groupX - barW - 1, padding.top + chartH - invH, barW, invH);

      // Shipments bar (Dark Slate #1E293B)
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(groupX + 1, padding.top + chartH - shipH, barW, shipH);

      // X-axis label
      ctx.fillStyle = '#5E6C84';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(m, groupX, height - 12);
    });
  },

  // 2. Plant Wise Orders Bar Chart
  drawPlantWiseOrders(canvasId) {
    const setup = this.initCanvas(canvasId);
    if (!setup) return;
    const { ctx, width, height } = setup;

    const plants = ['DFL Unit-1', 'DFL Unit-2', 'DFL Unit-3', 'DFL Unit-4'];
    const totals = [485, 420, 368, 260];
    const shipped = [340, 295, 262, 175];
    const pending = [145, 125, 106, 85];

    const padding = { top: 20, right: 20, bottom: 35, left: 45 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const maxVal = 550;

    // Grid lines & Y labels
    ctx.strokeStyle = '#F0F2F5';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#8993A4';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'right';

    for (let v = 0; v <= maxVal; v += 110) {
      const y = padding.top + chartH - (v / maxVal) * chartH;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
      ctx.fillText(v, padding.left - 6, y + 3);
    }

    // Draw 3 grouped bars per plant
    const groupW = chartW / plants.length;
    const barW = Math.max(8, Math.min(22, groupW * 0.22));

    plants.forEach((p, i) => {
      const groupX = padding.left + i * groupW + groupW / 2;
      const totH = (totals[i] / maxVal) * chartH;
      const shpH = (shipped[i] / maxVal) * chartH;
      const pndH = (pending[i] / maxVal) * chartH;

      // Total (Teal #008DA6)
      ctx.fillStyle = '#008DA6';
      ctx.fillRect(groupX - barW * 1.5 - 2, padding.top + chartH - totH, barW, totH);

      // Shipped (Amber #F59E0B)
      ctx.fillStyle = '#F59E0B';
      ctx.fillRect(groupX - barW * 0.5, padding.top + chartH - shpH, barW, shpH);

      // Pending (Sky Blue #0284C7)
      ctx.fillStyle = '#0284C7';
      ctx.fillRect(groupX + barW * 0.5 + 2, padding.top + chartH - pndH, barW, pndH);

      // X-axis label
      ctx.fillStyle = '#5E6C84';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p, groupX, height - 12);
    });
  },

  // 3. Country Wise Details Donut Chart
  drawCountryWiseDonut(canvasId) {
    const setup = this.initCanvas(canvasId);
    if (!setup) return;
    const { ctx, width, height } = setup;

    const data = [
      { label: 'U.S.A.', value: 736, color: '#008DA6' },
      { label: 'CHINA', value: 145, color: '#0284C7' },
      { label: 'BELGIUM', value: 39, color: '#F59E0B' },
      { label: 'RUSSIA', value: 21, color: '#8B5CF6' },
      { label: 'CANADA', value: 7, color: '#EC4899' },
      { label: 'UK', value: 7, color: '#10B981' },
      { label: 'FRANCE', value: 7, color: '#6366F1' },
      { label: 'OTHERS', value: 10, color: '#94A3B8' }
    ];

    const total = data.reduce((acc, d) => acc + d.value, 0);
    const centerX = width / 2;
    const centerY = height / 2;
    const outerRadius = Math.min(centerX, centerY) - 10;
    const innerRadius = outerRadius * 0.62;

    let startAngle = -Math.PI / 2;

    data.forEach(slice => {
      const sliceAngle = (slice.value / total) * (Math.PI * 2);
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, startAngle, startAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = slice.color;
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
      startAngle += sliceAngle;
    });

    // Center Summary
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#172B4D';
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillText('972', centerX, centerY - 6);
    ctx.fillStyle = '#5E6C84';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText('Total FCL', centerX, centerY + 12);
  },

  // 4. Shipped Containers (Port Wise) Donut Chart
  drawPortWiseDonut(canvasId) {
    const setup = this.initCanvas(canvasId);
    if (!setup) return;
    const { ctx, width, height } = setup;

    const data = [
      { label: 'SAVANNAH', value: 221, color: '#008DA6' },
      { label: 'LOS ANGELES', value: 197, color: '#0284C7' },
      { label: 'JIANQIANG', value: 151, color: '#F59E0B' },
      { label: 'NEW YORK', value: 121, color: '#10B981' },
      { label: 'BALTIMORE', value: 91, color: '#8B5CF6' },
      { label: 'ANTWERP', value: 39, color: '#EC4899' },
      { label: 'NEWARK', value: 34, color: '#6366F1' },
      { label: 'SEATTLE', value: 24, color: '#14B8A6' },
      { label: 'OTHERS', value: 35, color: '#94A3B8' }
    ];

    const total = data.reduce((acc, d) => acc + d.value, 0);
    const centerX = width / 2;
    const centerY = height / 2;
    const outerRadius = Math.min(centerX, centerY) - 10;
    const innerRadius = outerRadius * 0.62;

    let startAngle = -Math.PI / 2;

    data.forEach(slice => {
      const sliceAngle = (slice.value / total) * (Math.PI * 2);
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, startAngle, startAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = slice.color;
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
      startAngle += sliceAngle;
    });

    // Center Summary
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#172B4D';
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillText('893', centerX, centerY - 6);
    ctx.fillStyle = '#5E6C84';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText('Port FCL', centerX, centerY + 12);
  },

  // 5. To be shipped Qty vs Shipped Qty (Multi-grade Stepped Curve)
  drawQtyShippedComparison(canvasId) {
    const setup = this.initCanvas(canvasId);
    if (!setup) return;
    const { ctx, width, height } = setup;

    const grades = ['16/20', '21/25', '26/30', '31/40', '41/50', '51/60', '61/70', '71/90', '91/110', '110/130', '130/150', '150/200', '200/300'];
    const toBeShipped = [120, 240, 310, 380, 350, 290, 220, 180, 140, 90, 60, 40, 20];
    const shipped =     [90,  210, 280, 340, 320, 260, 195, 150, 110, 70, 45, 30, 15];

    const padding = { top: 20, right: 25, bottom: 35, left: 45 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const maxVal = 400;

    // Grid lines & Y labels
    ctx.strokeStyle = '#F0F2F5';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#8993A4';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'right';

    for (let v = 0; v <= maxVal; v += 100) {
      const y = padding.top + chartH - (v / maxVal) * chartH;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
      ctx.fillText(v + ' MT', padding.left - 6, y + 3);
    }

    const stepX = chartW / (grades.length - 1);

    // Helper to draw a line curve
    const drawCurve = (dataset, strokeColor, fillColor) => {
      ctx.beginPath();
      dataset.forEach((val, i) => {
        const x = padding.left + i * stepX;
        const y = padding.top + chartH - (val / maxVal) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Points
      dataset.forEach((val, i) => {
        const x = padding.left + i * stepX;
        const y = padding.top + chartH - (val / maxVal) * chartH;
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = strokeColor;
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    };

    // Draw both lines
    drawCurve(toBeShipped, '#008DA6');
    drawCurve(shipped, '#3B82F6');

    // X-axis Grade labels
    ctx.fillStyle = '#5E6C84';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';
    grades.forEach((g, i) => {
      const x = padding.left + i * stepX;
      ctx.fillText(g, x, height - 12);
    });
  },

  // 6. Freight Rates Multi-Line Trend Chart
  drawFreightRatesTrend(canvasId) {
    const setup = this.initCanvas(canvasId);
    if (!setup) return;
    const { ctx, width, height } = setup;

    const dates = ['21/08', '28/08', '04/09', '11/09', '18/09', '25/09', '02/10', '09/10', '16/10', '21/10'];
    const maersk = [9058, 9200, 9400, 9850, 10068, 9600, 9100, 8800, 8600, 8537];
    const msc =    [8400, 8650, 8900, 9100, 9300, 8950, 8400, 8100, 7850, 7737];
    const cma =    [7800, 8000, 8250, 8500, 8700, 8300, 7900, 7600, 7350, 7184];

    const padding = { top: 35, right: 30, bottom: 35, left: 55 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const minVal = 6000;
    const maxVal = 11000;

    // Grid lines & Y labels
    ctx.strokeStyle = '#F0F2F5';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#8993A4';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'right';

    for (let v = 6000; v <= maxVal; v += 1000) {
      const y = padding.top + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
      ctx.fillText('$' + v.toLocaleString(), padding.left - 6, y + 3);
    }

    const stepX = chartW / (dates.length - 1);

    const drawLine = (dataset, color) => {
      ctx.beginPath();
      dataset.forEach((val, i) => {
        const x = padding.left + i * stepX;
        const y = padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      dataset.forEach((val, i) => {
        const x = padding.left + i * stepX;
        const y = padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });
    };

    // Draw lines
    drawLine(maersk, '#008DA6'); // Maersk Line
    drawLine(msc, '#F59E0B');    // MSC Line
    drawLine(cma, '#3B82F6');    // CMA CGM

    // Helper for callout badges
    const drawBadge = (text, x, y, bgColor) => {
      ctx.font = 'bold 9px Inter, sans-serif';
      const textW = ctx.measureText(text).width;
      const bW = textW + 10;
      const bH = 16;
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      ctx.roundRect(x - bW / 2, y - bH - 6, bW, bH, 3);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, x, y - bH / 2 - 6);
    };

    // Callout tags matching PDF
    const m0X = padding.left + 0 * stepX;
    const m0Y = padding.top + chartH - ((maersk[0] - minVal) / (maxVal - minVal)) * chartH;
    drawBadge('$9,058', m0X, m0Y, '#008DA6');

    const m4X = padding.left + 4 * stepX;
    const m4Y = padding.top + chartH - ((maersk[4] - minVal) / (maxVal - minVal)) * chartH;
    drawBadge('$10,068', m4X, m4Y, '#008DA6');

    const m9X = padding.left + 9 * stepX;
    const m9Y = padding.top + chartH - ((maersk[9] - minVal) / (maxVal - minVal)) * chartH;
    drawBadge('$8,537', m9X, m9Y, '#008DA6');

    const msc9X = padding.left + 9 * stepX;
    const msc9Y = padding.top + chartH - ((msc[9] - minVal) / (maxVal - minVal)) * chartH;
    drawBadge('$7,737', msc9X, msc9Y, '#F59E0B');

    const cma9X = padding.left + 9 * stepX;
    const cma9Y = padding.top + chartH - ((cma[9] - minVal) / (maxVal - minVal)) * chartH;
    drawBadge('$7,184', cma9X, cma9Y, '#3B82F6');

    // X-axis Date labels
    ctx.fillStyle = '#5E6C84';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';
    dates.forEach((d, i) => {
      const x = padding.left + i * stepX;
      ctx.fillText(d, x, height - 12);
    });
  },


};
