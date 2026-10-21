# scripts/sales_view_code.py

def get_sales_view_code():
    return '''
// =========================================================================
// SALES & EXPORTS MODULE (STANDARDIZED WITH PURCHASE BASE DESIGN SYSTEM)
// =========================================================================
const SalesView = {
  activeTab: 'overview',
  activeHash: '#/sales/dashboard/overview',

  render(containerId, tabName = 'overview', activeHash = '#/sales/dashboard/overview') {
    const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!container) return;

    this.activeTab = tabName || 'overview';
    this.activeHash = activeHash;

    // Standard Option 1 Floating / Sticky TabBar Mounting
    container.innerHTML = `
      <div id="sales-tab-bar-container"></div>
      <div id="sales-subpage-content" class="w-full"></div>
    `;

    if (typeof TabBar !== 'undefined' && typeof TabBar.render === 'function') {
      TabBar.render('sales-tab-bar-container', this.activeHash);
    }

    const subContainer = document.getElementById('sales-subpage-content');
    if (!subContainer) return;

    // Route to appropriate view renderer based on active tab
    switch (this.activeTab) {
      // 1. Dashboard
      case 'overview':
      case 'dashboard':
        this.renderDashboard(subContainer);
        break;

      // 2. Product Management (Master Data)
      case 'product-list':
        this.renderProductList(subContainer);
        break;
      case 'preparation-list':
        this.renderPreparationList(subContainer);
        break;
      case 'species':
      case 'species-master':
        this.renderSpeciesMaster(subContainer);
        break;
      case 'grades-list':
        this.renderGradesList(subContainer);
        break;
      case 'packing-style-list':
        this.renderPackingStyleList(subContainer);
        break;
      case 'variety-list':
        this.renderVarietyList(subContainer);
        break;

      // 3. Buyer Management
      case 'buyer-list':
        this.renderBuyerList(subContainer);
        break;
      case 'consignee-list':
        this.renderConsigneeList(subContainer);
        break;
      case 'notify-party-list':
        this.renderNotifyPartyList(subContainer);
        break;
      case 'applicant-list':
        this.renderApplicantList(subContainer);
        break;
      case 'brands-list':
        this.renderBrandsList(subContainer);
        break;

      // 4. Orders Execution
      case 'proforma-list':
        this.renderProformaList(subContainer);
        break;
      case 'custom-invoices':
        this.renderCustomInvoices(subContainer);
        break;
      case 'isf-details':
        this.renderIsfDetails(subContainer);
        break;
      case 'shipping-bill':
        this.renderShippingBill(subContainer);
        break;
      case 'commercial-invoice':
        this.renderCommercialInvoice(subContainer);
        break;
      case 'eta-status':
        this.renderEtaStatus(subContainer);
        break;
      case 'fda-status':
        this.renderFdaStatus(subContainer);
        break;
      case 'clearing-agent':
        this.renderClearingAgent(subContainer);
        break;
      case 'delayed-shipments':
        this.renderDelayedShipments(subContainer);
        break;

      // 5. Payments & Financials
      case 'forward-contracts':
        this.renderForwardContracts(subContainer);
        break;
      case 'collections':
        this.renderCollections(subContainer);
        break;
      case 'negotiations':
        this.renderNegotiations(subContainer);
        break;
      case 'realization':
        this.renderRealization(subContainer);
        break;
      case 'realization-done':
        this.renderRealizationDone(subContainer);
        break;

      // 6. Insurance
      case 'pending-insurance':
        this.renderPendingInsurance(subContainer);
        break;
      case 'insurance-templates':
        this.renderInsuranceTemplates(subContainer);
        break;
      case 'insurance-payments':
        this.renderInsurancePayments(subContainer);
        break;

      // 7. Reports
      case 'sales-summary':
        this.renderSalesSummaryReport(subContainer);
        break;
      case 'payment-status':
        this.renderPaymentStatusReport(subContainer);
        break;
      case 'inventory-report':
        this.renderInventoryReport(subContainer);
        break;

      default:
        this.renderDashboard(subContainer);
        break;
    }

    this.bindEvents();
  },

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
              <button id="btn-sales-filter-search" class="w-full h-[32px] px-3 bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors" onclick="SalesView.refreshDashboard()">
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

              <button class="px-2.5 py-1 bg-[#008DA6] hover:bg-[#006C7A] text-white text-xs font-semibold rounded flex items-center gap-1 shadow-xs ml-2 cursor-pointer transition-colors" onclick="SalesView.refreshDashboard()">
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

  // ==========================================
  // 2. ORDERS EXECUTION (FIXES IMAGE 2)
  // ==========================================
  renderProformaList(container) {
    const pis = SalesDataStore.getCollection('proformaInvoices');

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader(
          'Proforma Invoices (PI Register)',
          `<button id="btn-create-pi" class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer" onclick="SalesView.openNewPiModal()">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Create Proforma Invoice</span>
          </button>`
        )}

        ${UIBase.renderFilterCard({
          idPrefix: 'sales-pi-filter',
          title: 'Search & Filters',
          fields: [
            {
              label: 'SELECT BUYER',
              html: `
                <select id="sales-pi-buyer-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="ALL">All Buyers (Select)</option>
                  <option value="Apex Seafoods USA Inc.">Apex Seafoods USA Inc.</option>
                  <option value="Maritime Gourmet Corp">Maritime Gourmet Corp</option>
                  <option value="Shanghai Ocean Wealth Trade Ltd">Shanghai Ocean Wealth Trade Ltd</option>
                  <option value="Tokyo Central Marine Co">Tokyo Central Marine Co</option>
                </select>
              `
            },
            {
              label: 'SELECT PROCESSOR PLANT',
              html: `
                <select id="sales-pi-plant-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="ALL">All Processor Plants (Select)</option>
                  <option value="DFL Unit-1 Visakhapatnam">DFL Unit-1 Visakhapatnam</option>
                  <option value="DFL Unit-2 Kakinada">DFL Unit-2 Kakinada</option>
                  <option value="DFL Unit-3 Pydibhimavaram">DFL Unit-3 Pydibhimavaram</option>
                </select>
              `
            },
            {
              label: 'STATUS',
              html: `
                <select id="sales-pi-status-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]">
                  <option value="ALL">All Statuses (Select)</option>
                  <option value="Approved">Approved</option>
                  <option value="Po Received">Po Received</option>
                  <option value="Draft">Draft</option>
                </select>
              `
            },
            {
              label: 'DATE RANGE',
              html: `
                <div class="erp-date-wrapper">
                  <input type="date" id="sales-pi-date-input" value="2026-10-02" class="erp-date-input w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0284C7]" onclick="this.showPicker ? this.showPicker() : this.focus()">
                </div>
              `
            }
          ]
        })}

        <div id="sales-pi-table-container"></div>
        <div id="sales-pi-totals-container" class="mt-4"></div>
      </div>
    `;

    const renderTotals = (list) => {
      const count = list.length;
      const totalAmount = list.reduce((sum, x) => sum + (parseFloat(x.totalAmountUsd) || 0), 0);
      const totalCartons = list.reduce((sum, x) => sum + (parseInt(x.cartons || x.totalCartons) || 1800), 0);
      const avgValue = count > 0 ? totalAmount / count : 0;

      const containerEl = document.getElementById('sales-pi-totals-container');
      if (containerEl) {
        containerEl.innerHTML = UIBase.renderTotals(
          'Proforma Invoices Volume & Commercial Abstract',
          count,
          count === 1 ? 'PI Record' : 'PI Records',
          [
            { label: 'TOTAL INVOICES', value: `${count} Orders`, badge: 'Active PIs', badgeColor: 'text-[#0284C7] bg-[#F0F9FF]' },
            { label: 'TOTAL EXPORT VALUE', value: `$${Math.round(totalAmount).toLocaleString()}`, badge: 'USD Target', badgeColor: 'text-[#006644] bg-[#E3FCEF]', color: 'text-[#006644]' },
            { label: 'TOTAL CARTONS ALLOCATED', value: `${totalCartons.toLocaleString()} Ctns`, badge: 'Master Pack', badgeColor: 'text-[#0284C7] bg-[#F0F9FF]' },
            { label: 'AVERAGE PI SIZE', value: `$${Math.round(avgValue).toLocaleString()}`, badge: 'Mean Order', badgeColor: 'text-[#006644] bg-[#E3FCEF]' }
          ]
        );
      }
    };

    const tableInstance = new DataTable({
      containerId: 'sales-pi-table-container',
      data: pis,
      keyField: 'id',
      tableTitle: 'Proforma Invoices Register',
      searchable: false,
      hideTopFilterBar: true,
      showCopy: false,
      onDataChange: (data) => renderTotals(data),
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, row, index) => `<span class="font-bold text-[#5E6C84]">${index !== undefined ? index + 1 : 1}</span>` },
        { field: 'piNumber', header: 'P.Inv Number', render: (v, r) => `<span class="font-bold text-[#17191c] hover:underline cursor-pointer" onclick="SalesView.viewPiDetails('${r.id}')">${v}</span>` },
        { field: 'piDate', header: 'Date', render: (v) => `<span class="text-[#172B4D] font-medium">${v}</span>` },
        { field: 'poNumber', header: 'PO Number', render: (v) => `<span class="font-bold text-[#006C7A] bg-[#E6FCFF] px-2 py-0.5 rounded text-[11px]">${v}</span>` },
        { field: 'buyer', header: 'Buyer', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'productionPlant', header: 'Processor Plant', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'portOfDischarge', header: 'Port of Discharge', render: (v) => `<span class="text-[#172B4D]">${v}</span>` },
        { field: 'shipByWindow', header: 'ShipBy Window', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'totalAmountUsd', header: 'Total (USD)', render: (v) => `<span class="font-extrabold text-[#006644]">$${(v || 0).toLocaleString()}</span>` },
        {
          field: 'status',
          header: 'Status',
          render: (v) => {
            const type = v === 'Approved' ? 'success' : v === 'Po Received' ? 'info' : 'default';
            return UIBase.renderBadge(v, type);
          }
        },
        {
          field: 'actions',
          header: 'Actions',
          render: (v, r) => UIBase.renderActionButtons({
            onView: `SalesView.viewPiDetails('${r.id}')`,
            onDownload: `SalesView.printPi('${r.id}')`,
            onDelete: `SalesView.deletePi('${r.id}')`
          })
        }
      ]
    });

    renderTotals(pis);

    UIBase.bindFilter('sales-pi-filter', () => {
      const bVal = document.getElementById('sales-pi-buyer-select')?.value || 'ALL';
      const pVal = document.getElementById('sales-pi-plant-select')?.value || 'ALL';
      const sVal = document.getElementById('sales-pi-status-select')?.value || 'ALL';
      let filtered = pis;
      if (bVal !== 'ALL') filtered = filtered.filter(x => x.buyer === bVal);
      if (pVal !== 'ALL') filtered = filtered.filter(x => x.productionPlant === pVal);
      if (sVal !== 'ALL') filtered = filtered.filter(x => x.status === sVal);
      tableInstance.setData(filtered);
      renderTotals(filtered);
      Toast.show(`Filtered ${filtered.length} Proforma Invoices`, 'info');
    }, () => {
      if (document.getElementById('sales-pi-buyer-select')) document.getElementById('sales-pi-buyer-select').value = 'ALL';
      if (document.getElementById('sales-pi-plant-select')) document.getElementById('sales-pi-plant-select').value = 'ALL';
      if (document.getElementById('sales-pi-status-select')) document.getElementById('sales-pi-status-select').value = 'ALL';
      tableInstance.setData(pis);
      renderTotals(pis);
      Toast.show('Filters reset', 'info');
    });
  },

  renderCustomInvoices(container) {
    const customInvoices = SalesDataStore.getCollection('customInvoices');

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader(
          'Custom Invoices (Commercial Dispatch Ledger)',
          `<button class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer" onclick="Toast.show('Generating custom invoice manifest', 'info')">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Generate Custom Invoice</span>
          </button>`
        )}
        <div id="sales-cinv-table-container"></div>
        <div id="sales-cinv-totals-container" class="mt-4"></div>
      </div>
    `;

    const renderTotals = (list) => {
      const count = list.length;
      const totalVal = list.reduce((s, x) => s + (parseFloat(x.invoiceValueUsd) || 0), 0);
      const totalCtns = list.reduce((s, x) => s + (parseInt(x.totalCartons) || 0), 0);
      const el = document.getElementById('sales-cinv-totals-container');
      if (el) {
        el.innerHTML = UIBase.renderTotals(
          'Custom Invoices Reconciled Abstract',
          count, 'Invoices',
          [
            { label: 'TOTAL INVOICES', value: `${count} Invoices`, badge: 'Dispatched', badgeColor: 'text-[#0284C7] bg-[#F0F9FF]' },
            { label: 'COMMERCIAL VALUE', value: `$${Math.round(totalVal).toLocaleString()}`, badge: 'FOB Ledger', badgeColor: 'text-[#006644] bg-[#E3FCEF]', color: 'text-[#006644]' },
            { label: 'TOTAL CARTONS', value: `${totalCtns.toLocaleString()} Ctns`, badge: 'Loaded Out', badgeColor: 'text-[#0284C7] bg-[#F0F9FF]' },
            { label: 'CLEARED STATUS', value: '100% Cleared', badge: 'Customs Pass', badgeColor: 'text-[#006644] bg-[#E3FCEF]' }
          ]
        );
      }
    };

    new DataTable({
      containerId: 'sales-cinv-table-container',
      data: customInvoices,
      keyField: 'id',
      tableTitle: 'Commercial Custom Invoices Register',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'invoiceNo', header: 'Invoice No', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'invoiceDate', header: 'Date', render: (v) => `<span class="text-[#172B4D]">${v}</span>` },
        { field: 'poNumber', header: 'PO Number', render: (v) => `<span class="font-bold text-[#006C7A] bg-[#E6FCFF] px-2 py-0.5 rounded text-[11px]">${v}</span>` },
        { field: 'buyer', header: 'Buyer', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'piNumber', header: 'P.Invoice No', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'stockOutDate', header: 'Stock Out Date', render: (v) => v ? `<span class="font-bold text-[#006644]">${v}</span>` : `<span class="text-[#BF2600] font-bold">Pending</span>` },
        { field: 'totalCartons', header: 'Cartons', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'invoiceValueUsd', header: 'Value (USD)', render: (v) => `<span class="font-extrabold text-[#006644]">$${(v || 0).toLocaleString()}</span>` },
        {
          field: 'actions',
          header: 'Actions',
          render: (v, r) => UIBase.renderActionButtons({
            onView: `Toast.show('Viewing custom invoice ${r.invoiceNo}', 'info')`,
            onDownload: `Toast.show('Downloading custom invoice ${r.invoiceNo}', 'success')`
          })
        }
      ]
    });

    renderTotals(customInvoices);
  },

  renderIsfDetails(container) {
    const isfList = SalesDataStore.getCollection('isfDetails');

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader(
          'ISF 10+2 Details (Importer Security Filing)',
          `<button class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer" onclick="Toast.show('Opening ISF filing form', 'info')">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Add ISF Filing</span>
          </button>`
        )}
        <div id="sales-isf-table-container"></div>
      </div>
    `;

    new DataTable({
      containerId: 'sales-isf-table-container',
      data: isfList,
      keyField: 'id',
      tableTitle: 'US Customs 24-Hour Pre-Loading ISF Manifest',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'containerNumber', header: 'Container No', render: (v) => `<span class="font-mono font-bold text-[#172B4D]">${v}</span>` },
        { field: 'linerSealNumber', header: 'Seal No', render: (v) => `<span class="font-mono text-[#5E6C84]">${v}</span>` },
        { field: 'shippingLine', header: 'Carrier', render: (v) => `<span class="font-semibold text-[#172B4D]">${v}</span>` },
        { field: 'blNumber', header: 'BL No', render: (v) => `<span class="font-bold text-[#006C7A]">${v}</span>` },
        { field: 'customInvoiceNo', header: 'Custom Inv', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'tempRecord', header: 'Holding Temp', render: (v) => `<span class="font-mono font-bold text-[#0284C7]">${v}</span>` },
        { field: 'status', header: 'Filing Status', render: (v) => UIBase.renderBadge(v, v === 'Completed' ? 'success' : 'warning') }
      ]
    });
  },

  renderShippingBill(container) {
    const sbs = SalesDataStore.getCollection('shippingBills');

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader(
          'Shipping Bill Register (Indian Customs EDI)',
          `<button class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer" onclick="Toast.show('File new Shipping Bill', 'info')">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Record Shipping Bill</span>
          </button>`
        )}
        <div id="sales-sb-table-container"></div>
      </div>
    `;

    new DataTable({
      containerId: 'sales-sb-table-container',
      data: sbs,
      keyField: 'id',
      tableTitle: 'Customs Let Export Order (LEO) Ledger',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'shippingBillNo', header: 'Shipping Bill No', render: (v) => `<span class="font-mono font-bold text-[#172B4D]">${v}</span>` },
        { field: 'invoiceNo', header: 'Invoice No', render: (v) => `<span class="font-bold text-[#006C7A]">${v}</span>` },
        { field: 'shippingDate', header: 'Date', render: (v) => `<span class="text-[#172B4D]">${v}</span>` },
        { field: 'leoDate', header: 'LEO Date', render: (v) => `<span class="font-bold text-[#006644]">${v}</span>` },
        { field: 'exchangeRate', header: 'Ex Rate', render: (v) => `<span class="font-mono">₹ ${v}</span>` },
        { field: 'sbFobUsd', header: 'FOB (USD)', render: (v) => `<span class="font-extrabold text-[#006644]">$${(v || 0).toLocaleString()}</span>` },
        { field: 'sbFobInr', header: 'FOB (INR)', render: (v) => `<span class="font-bold text-[#172B4D]">₹ ${((v || 0) / 100000).toFixed(2)} Lakhs</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
  },

  renderCommercialInvoice(container) {
    const cinvs = SalesDataStore.getCollection('commercialInvoices');

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader(
          'Final Commercial Invoices (Bank Negotiation Set)',
          `<button class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer" onclick="Toast.show('Opening Commercial Invoice Generator', 'info')">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Create Commercial Invoice</span>
          </button>`
        )}
        <div id="sales-ci-table-container"></div>
      </div>
    `;

    new DataTable({
      containerId: 'sales-ci-table-container',
      data: cinvs,
      keyField: 'id',
      tableTitle: 'Export Settlement Commercial Invoices',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'invoiceNo', header: 'Invoice No', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'invoiceDate', header: 'Date', render: (v) => `<span class="text-[#172B4D]">${v}</span>` },
        { field: 'poNumber', header: 'PO Number', render: (v) => `<span class="font-bold text-[#006C7A]">${v}</span>` },
        { field: 'buyer', header: 'Buyer Entity', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'blNumber', header: 'BL No', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'containerNo', header: 'Container No', render: (v) => `<span class="font-mono text-[#172B4D]">${v}</span>` },
        { field: 'totalInvoiceValueUsd', header: 'Value (USD)', render: (v) => `<span class="font-extrabold text-[#006644]">$${(v || 0).toLocaleString()}</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
  },

  renderEtaStatus(container) {
    const etas = SalesDataStore.getCollection('etaTracking');

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Vessel Tracking & Live Ocean Transit Telemetry')}
        <div id="sales-eta-table-container"></div>
      </div>
    `;

    new DataTable({
      containerId: 'sales-eta-table-container',
      data: etas,
      keyField: 'id',
      tableTitle: 'Active Reefer Vessel Positional Tracking',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'containerNumber', header: 'Container No', render: (v) => `<span class="font-mono font-bold text-[#172B4D]">${v}</span>` },
        { field: 'vesselName', header: 'Vessel / Voyage', render: (v) => `<span class="font-bold text-[#006C7A]">${v}</span>` },
        { field: 'portOfDischarge', header: 'Port of Discharge', render: (v) => `<span class="text-[#172B4D]">${v}</span>` },
        { field: 'onBoardDate', header: 'OnBoard Date', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'actualEta', header: 'Expected ETA', render: (v) => `<span class="font-bold text-[#006644]">${v}</span>` },
        { field: 'transitDays', header: 'Transit Days', render: (v) => `<span class="font-mono">${v} Days</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'info') }
      ]
    });
  },

  renderFdaStatus(container) {
    const fdaList = SalesDataStore.getCollection('fdaStatus');

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('US FDA Prior Notice & Port Regulatory Clearance')}
        <div id="sales-fda-table-container"></div>
      </div>
    `;

    new DataTable({
      containerId: 'sales-fda-table-container',
      data: fdaList,
      keyField: 'id',
      tableTitle: 'FDA Prior Notice Regulatory Register',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'fdaEntryNumber', header: 'FDA Entry No', render: (v) => `<span class="font-mono font-bold text-[#006C7A]">${v}</span>` },
        { field: 'poNumber', header: 'PO Number', render: (v) => `<span class="text-[#172B4D]">${v}</span>` },
        { field: 'buyer', header: 'Buyer', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'shippingBillNo', header: 'Shipping Bill', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'fdaExam', header: 'Exam Status', render: (v) => `<span class="font-semibold text-[#172B4D]">${v}</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
  },

  renderClearingAgent(container) {
    const chaList = SalesDataStore.getCollection('clearingAgents');

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Clearing & Forwarding (CHA) Agent Directory')}
        <div id="sales-cha-table-container"></div>
      </div>
    `;

    new DataTable({
      containerId: 'sales-cha-table-container',
      data: chaList,
      keyField: 'id',
      tableTitle: 'Designated Customs Brokerage Directory',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'agentName', header: 'Agency Name', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'portOfDischarge', header: 'Port', render: (v) => `<span class="text-[#172B4D]">${v}</span>` },
        { field: 'buyer', header: 'Buyer Client', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'contactPhone', header: 'Contact', render: (v) => `<span class="font-mono text-[#006C7A]">${v}</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
  },

  renderDelayedShipments(container) {
    this.renderEtaStatus(container);
  },

  // ==========================================
  // 3. PAYMENTS & FINANCIALS
  // ==========================================
  renderForwardContracts(container) {
    const fcs = SalesDataStore.getCollection('forwardContracts');

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader(
          'FX Forward Contracts & Currency Hedging Register',
          `<button class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer" onclick="Toast.show('Book forward contract modal', 'info')">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Book Forward Contract</span>
          </button>`
        )}
        <div id="sales-fc-table-container"></div>
      </div>
    `;

    new DataTable({
      containerId: 'sales-fc-table-container',
      data: fcs,
      keyField: 'id',
      tableTitle: 'Active Currency Hedging Positions (USD/INR)',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'contractNumber', header: 'Contract No', render: (v) => `<span class="font-mono font-bold text-[#006C7A]">${v}</span>` },
        { field: 'bankName', header: 'Bank Entity', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'bookedValueUsd', header: 'Value (USD)', render: (v) => `<span class="font-extrabold text-[#006644]">$${(v || 0).toLocaleString()}</span>` },
        { field: 'bookedRate', header: 'Hedge Rate', render: (v) => `<span class="font-mono font-bold">₹ ${v}</span>` },
        { field: 'utilizedAmountUsd', header: 'Utilized (USD)', render: (v) => `<span class="text-[#5E6C84]">$${(v || 0).toLocaleString()}</span>` },
        { field: 'balanceAmountUsd', header: 'Balance (USD)', render: (v) => `<span class="font-bold text-[#172B4D]">$${(v || 0).toLocaleString()}</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
  },

  renderCollections(container) {
    const colls = SalesDataStore.getCollection('collections');

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Export Receivables & Outstanding Collections')}
        <div id="sales-col-table-container"></div>
      </div>
    `;

    new DataTable({
      containerId: 'sales-col-table-container',
      data: colls,
      keyField: 'id',
      tableTitle: 'Export Trade Receivables Ledger',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'invoiceNo', header: 'Invoice No', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'buyer', header: 'Buyer', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'invoiceAmountUsd', header: 'Invoice USD', render: (v) => `<span class="font-extrabold text-[#006644]">$${(v || 0).toLocaleString()}</span>` },
        { field: 'outstandingUsd', header: 'Outstanding', render: (v) => `<span class="font-bold text-[#BF2600]">$${(v || 0).toLocaleString()}</span>` },
        { field: 'paymentTerms', header: 'Terms', render: (v) => `<span class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#F4F5F7] border border-[#DFE1E6]">${v}</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'info') }
      ]
    });
  },

  renderNegotiations(container) {
    this.renderCollections(container);
  },

  renderRealization(container) {
    const reals = SalesDataStore.getCollection('realizations');

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('e-BRC & Bank Realization Certificates (DGFT / EDPMS)')}
        <div id="sales-real-table-container"></div>
      </div>
    `;

    new DataTable({
      containerId: 'sales-real-table-container',
      data: reals,
      keyField: 'id',
      tableTitle: 'EDPMS Statutory Realization Status',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'invoiceNo', header: 'Invoice No', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'shippingBillNo', header: 'Shipping Bill', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'brcNumber', header: 'e-BRC No', render: (v) => `<span class="font-mono font-bold text-[#006C7A]">${v}</span>` },
        { field: 'realizedAmountUsd', header: 'Realized USD', render: (v) => `<span class="font-extrabold text-[#006644]">$${(v || 0).toLocaleString()}</span>` },
        { field: 'realizedInr', header: 'Realized INR', render: (v) => `<span class="font-bold text-[#172B4D]">₹ ${((v || 0) / 100000).toFixed(2)} L</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
  },

  renderRealizationDone(container) {
    this.renderRealization(container);
  },

  // ==========================================
  // 4. MARINE CARGO INSURANCE
  // ==========================================
  renderPendingInsurance(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Marine Cargo Insurance Pending Declarations')}
        <div class="p-8 bg-white rounded-xl border border-[#DFE1E6] text-center">
          <p class="text-xs text-[#5E6C84]">All marine insurance policy endorsements for FY 2026-27 are currently active with United India Insurance.</p>
        </div>
      </div>
    `;
  },

  renderInsuranceTemplates(container) {
    this.renderPendingInsurance(container);
  },

  renderInsurancePayments(container) {
    this.renderPendingInsurance(container);
  },

  // ==========================================
  // 5. MASTER DATA SCREENS (PRODUCTS & BUYERS)
  // ==========================================
  renderProductList(container) {
    const prods = SalesDataStore.getCollection('products');
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Finished Goods Product Master Data')}
        <div id="sales-prod-table-container"></div>
      </div>
    `;
    new DataTable({
      containerId: 'sales-prod-table-container',
      data: prods,
      keyField: 'id',
      tableTitle: 'Approved Finished Goods Specification Master',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'productCode', header: 'Product Code', render: (v) => `<span class="font-mono font-bold text-[#006C7A]">${v}</span>` },
        { field: 'name', header: 'Description', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'species', header: 'Species', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'preparation', header: 'Form', render: (v) => `<span class="font-semibold text-[#172B4D]">${v}</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
  },

  renderPreparationList(container) { this.renderProductList(container); },
  renderSpeciesMaster(container) { this.renderProductList(container); },
  renderGradesList(container) { this.renderProductList(container); },
  renderPackingStyleList(container) { this.renderProductList(container); },
  renderVarietyList(container) { this.renderProductList(container); },

  renderBuyerList(container) {
    const buyers = SalesDataStore.getCollection('buyers');
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Overseas Buyer Master Directory')}
        <div id="sales-buyer-table-container"></div>
      </div>
    `;
    new DataTable({
      containerId: 'sales-buyer-table-container',
      data: buyers,
      keyField: 'id',
      tableTitle: 'Commercial Overseas Buyer Client Directory',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'buyerName', header: 'Buyer Entity', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'country', header: 'Country', render: (v) => `<span class="text-[#172B4D]">${v}</span>` },
        { field: 'contactPerson', header: 'Contact Person', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'creditLimitUsd', header: 'Credit Limit', render: (v) => `<span class="font-extrabold text-[#006644]">$${(v || 0).toLocaleString()}</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
  },

  renderConsigneeList(container) { this.renderBuyerList(container); },
  renderNotifyPartyList(container) { this.renderBuyerList(container); },
  renderApplicantList(container) { this.renderBuyerList(container); },
  renderBrandsList(container) { this.renderBuyerList(container); },

  // ==========================================
  // 6. REPORTS
  // ==========================================
  renderSalesSummaryReport(container) {
    this.renderCustomInvoices(container);
  },

  renderPaymentStatusReport(container) {
    this.renderCollections(container);
  },

  renderInventoryReport(container) {
    this.renderProductList(container);
  },

  // ==========================================
  // HELPER METHODS & EVENT BINDINGS
  // ==========================================
  viewPiDetails(id) {
    const pis = SalesDataStore.getCollection('proformaInvoices');
    const pi = pis.find(x => x.id === id);
    if (!pi) return;
    Modal.alert({
      title: `Proforma Invoice ${pi.piNumber}`,
      message: `
        <div class="space-y-2 text-xs">
          <div class="flex justify-between py-1 border-b border-slate-100"><strong>Buyer:</strong> <span>${pi.buyer}</span></div>
          <div class="flex justify-between py-1 border-b border-slate-100"><strong>PO Number:</strong> <span>${pi.poNumber}</span></div>
          <div class="flex justify-between py-1 border-b border-slate-100"><strong>Processor Plant:</strong> <span>${pi.productionPlant}</span></div>
          <div class="flex justify-between py-1 border-b border-slate-100"><strong>Port of Discharge:</strong> <span>${pi.portOfDischarge}</span></div>
          <div class="flex justify-between py-1 border-b border-slate-100"><strong>ShipBy Window:</strong> <span>${pi.shipByWindow}</span></div>
          <div class="flex justify-between py-1 border-b border-slate-100"><strong>Total USD:</strong> <strong class="text-emerald-700">$${(pi.totalAmountUsd || 0).toLocaleString()}</strong></div>
          <div class="flex justify-between py-1 border-b border-slate-100"><strong>Status:</strong> <span>${pi.status}</span></div>
        </div>
      `
    });
  },

  printPi(id) {
    Toast.show(`Generating high-resolution printable PDF for ${id}`, 'info');
  },

  deletePi(id) {
    if (confirm(`Are you sure you want to delete Proforma Invoice ${id}?`)) {
      let pis = SalesDataStore.getCollection('proformaInvoices');
      pis = pis.filter(x => x.id !== id);
      SalesDataStore.saveAll({ ...SalesDataStore.getAll(), proformaInvoices: pis });
      this.renderProformaList(document.getElementById('sales-subpage-content'));
      Toast.show('Proforma Invoice deleted', 'error');
    }
  },

  openNewPiModal() {
    Modal.alert({
      title: 'Create Proforma Invoice',
      message: `
        <form id="new-pi-form" onsubmit="event.preventDefault(); Toast.show('Proforma Invoice draft created successfully', 'success'); Modal.closeAll();" class="space-y-3 text-xs">
          <div><label class="block font-bold mb-1">BUYER ENTITY</label><input type="text" value="Apex Seafoods USA Inc." required class="w-full p-2 border rounded"></div>
          <div><label class="block font-bold mb-1">PO NUMBER</label><input type="text" value="PO-APX-2026-990" required class="w-full p-2 border rounded"></div>
          <div><label class="block font-bold mb-1">TOTAL USD</label><input type="number" value="480000" required class="w-full p-2 border rounded"></div>
          <button type="submit" class="btn-primary w-full py-2 rounded text-xs font-bold mt-2">Submit Proforma Invoice</button>
        </form>
      `
    });
  },

  bindEvents() {}
};
'''
