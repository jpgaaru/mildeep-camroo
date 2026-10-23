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
      case 'new-pi':
      case 'create-pi':
        this.renderNewPi(subContainer);
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
  // ORDERS SUB-MENU ON-SCREEN TAB BAR
  // ==========================================
  renderOrdersTabBar(activeTab = 'proforma-list') {
    const tabs = [
      { id: 'proforma-list', label: 'Proforma List', hash: '#/sales/orders/proforma-list' },
      { id: 'custom-invoices', label: 'Custom Invoices', hash: '#/sales/orders/custom-invoices' },
      { id: 'isf-details', label: 'ISF Details', hash: '#/sales/orders/isf-details' },
      { id: 'shipping-bill', label: 'Shipping Bill', hash: '#/sales/orders/shipping-bill' },
      { id: 'commercial-invoice', label: 'Commercial Invoice', hash: '#/sales/orders/commercial-invoice' },
      { id: 'eta-status', label: 'ETA Status', hash: '#/sales/orders/eta-status' },
      { id: 'fda-status', label: 'FDA Status', hash: '#/sales/orders/fda-status' },
      { id: 'clearing-agent', label: 'Clearing Agent', hash: '#/sales/orders/clearing-agent' },
      { id: 'delayed-shipments', label: 'Delayed Shipments', hash: '#/sales/orders/delayed-shipments' }
    ];

    return `
      <div class="mb-4 select-none">
        <div class="flex items-center gap-6 border-b border-[#E2E8F0] pt-1 pb-0 select-none overflow-x-auto">
          ${tabs.map(t => {
            const isActive = t.id === activeTab;
            return `
              <a 
                href="${t.hash}"
                class="select-none px-1 py-2 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 border-b-2 -mb-[1px] outline-none ${
                  isActive 
                    ? 'tab-active border-[#00A4B7] text-[#00A4B7] font-bold bg-transparent' 
                    : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] bg-transparent'
                }"
              >
                ${t.label}
              </a>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  // ==========================================
  // 2. ORDERS EXECUTION: PROFORMA INVOICES LIST
  // ==========================================
  proformaDataset: [
    { sNo: 1, id: '7393', processor: '857', piNumber: 'DFL/PI/1315/26-27', piDate: '21-10-2026', poNo: '111', buyer: 'EASTERN FISH COMPANY LLC', productionPlant: 'USHA', shipByDate: '--', status: 'Pi-Pending', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', cartons: 1800, totalAmountUsd: 189000 },
    { sNo: 2, id: '7392', processor: '853', piNumber: 'DFL/PI/1314/26-27', piDate: '19-10-2026', poNo: 'test19', buyer: 'EASTERN FISH COMPANY LLC', productionPlant: 'VSP', shipByDate: '--', status: 'Po Received', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', cartons: 1800, totalAmountUsd: 194500 },
    { sNo: 3, id: '7391', processor: '853', piNumber: 'DFL/PI/1313/26-27', piDate: '14-10-2026', poNo: '111', buyer: 'EASTERN FISH COMPANY LLC', productionPlant: 'VSP', shipByDate: '--', status: 'Po Received', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', cartons: 1800, totalAmountUsd: 191200 },
    { sNo: 4, id: '7390', processor: '853', piNumber: 'DFL/PI/1312/26-27', piDate: '12-10-2026', poNo: '1234', buyer: 'PACIFIC SEAFOOD GROUP,', productionPlant: 'SATYA,VSP', shipByDate: '13-10-2026', status: 'Po Received', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', cartons: 3600, totalAmountUsd: 382000 },
    { sNo: 5, id: '7389', processor: '1888', piNumber: 'DFL/PI/1311/26-27', piDate: '09-10-2026', poNo: 'DF/DF-567test', buyer: 'EASTERN FISH COMPANY LLC', productionPlant: 'JPT', shipByDate: '--', status: 'Po Received', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', cartons: 1800, totalAmountUsd: 188500 },
    { sNo: 6, id: '7388', processor: '24234236', piNumber: 'DFL/PI/1310/26-27', piDate: '06-10-2026', poNo: '500', buyer: 'ARISTA INDUSTRIES INC', productionPlant: 'JPT', shipByDate: '--', status: 'Pi-Pending', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', cartons: 1800, totalAmountUsd: 178000 },
    { sNo: 7, id: '7387', processor: '853', piNumber: 'DFL/PI/1309/26-27', piDate: '05-10-2026', poNo: '568', buyer: 'EASTERN FISH COMPANY LLC', productionPlant: 'VSP', shipByDate: '--', status: 'Po Received', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', cartons: 1800, totalAmountUsd: 193400 },
    { sNo: 8, id: '7386', processor: '853', piNumber: 'DFL/PI/1308/26-27', piDate: '05-10-2026', poNo: '897', buyer: 'PACIFIC SEAFOOD GROUP,', productionPlant: 'VSP', shipByDate: '--', status: 'Po Received', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', cartons: 3600, totalAmountUsd: 379000 }
  ],

  renderProformaList(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#172B4D]">

                                <!-- 2. Page Title Header -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">Proforma Invoices</h1>
          <div class="flex items-center gap-2">
            <button class="px-4 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.openNewPi()">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>New PI</span>
            </button>
            <button class="px-4 py-2 border border-[#006C7A] bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#006C7A] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer transition-all" onclick="SalesView.bulkApprovePis()">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>Bulk Approval</span>
            </button>
          </div>
        </div>

                <!-- 3. Top Filter Card (Base Design System with AquaPulse Colors) -->
        <div id="sales-pi-filter-card" class="sales-pi-filter bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="flex items-center gap-2 pb-2 mb-3 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Search & Filters</h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-4">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT EXPORTER :</label>
              <select id="sales-pi-exporter-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT CONSIGNEE :</label>
              <select id="sales-pi-consignee-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="ALL" selected>All Consignees</option>
                <option value="EASTERN FISH COMPANY LLC">EASTERN FISH COMPANY LLC</option>
                <option value="PACIFIC SEAFOOD GROUP,">PACIFIC SEAFOOD GROUP,</option>
                <option value="ARISTA INDUSTRIES INC">ARISTA INDUSTRIES INC</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT COUNTRY:</label>
              <select id="sales-pi-country-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="ALL" selected>All Countries</option>
                <option value="USA">U.S.A.</option>
                <option value="CHINA">CHINA</option>
                <option value="BELGIUM">BELGIUM</option>
                <option value="RUSSIA">RUSSIA</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">STATUS:</label>
              <select id="sales-pi-status-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="ALL" selected>All Statuses</option>
                <option value="Pi-Pending">Pi-Pending</option>
                <option value="Po Received">Po Received</option>
                <option value="Approved">Approved</option>
              </select>
            </div>
          </div>

          <!-- Buttons using Base Design System colors -->
          <div class="flex items-center justify-end gap-3 pt-2 border-t border-[#F1F5F9]">
            <button id="btn-pi-search" class="px-6 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterProformaList()">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <span>Search</span>
            </button>
          </div>
        </div>

        <!-- 4. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-pi-search-input" 
                placeholder="Search by PI, PO, Buyer, Plant..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchProformaList(this.value)"
              />
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.toggleMoreSearch()">
                <svg class="w-3.5 h-3.5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.loadAllProformaList()">
                <svg class="w-3.5 h-3.5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div id="sales-pi-table-container" class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#DFE1E6] text-[#5E6C84]">
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider select-none">S.No ▲</th>
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider select-none">ID</th>
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider select-none">Processor</th>
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider select-none">PInv Number</th>
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider select-none">PInv Date</th>
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider select-none">Po No</th>
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider select-none">Buyer</th>
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider select-none">Production Plant</th>
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider select-none">ShipBy Date</th>
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider text-center select-none">Status</th>
                  <th class="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider text-center select-none">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-pi-table-body" class="divide-y divide-[#EBECF0]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Pagination & Totals Abstract -->
          <div id="sales-pi-totals-container" class="mt-4"></div>
        </div>
      </div>
    `;

    this.renderProformaRows(this.proformaDataset);
    this.renderProformaTotals(this.proformaDataset);
  },

  renderProformaRows(list) {
    const tbody = document.getElementById('sales-pi-table-body');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="11" class="py-8 text-center text-xs text-[#5E6C84]">
            No Proforma Invoices found matching your search filters.
          </td>
        </tr>
      `;
      return;
    }

                tbody.innerHTML = list.map((r, idx) => {
      const isPending = (r.status || '').toLowerCase().includes('pending');
      const isRejected = (r.status || '').toLowerCase().includes('reject');
      
      let badgeHtml = '';
      if (isPending) {
        badgeHtml = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold text-[#475569] bg-[#F1F5F9] border border-[#CBD5E1]">Pi-Pending</span>`;
      } else if (isRejected) {
        badgeHtml = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold text-[#991B1B] bg-[#FEF2F2] border border-[#FECACA]">Rejected</span>`;
      } else {
        badgeHtml = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0]">Po Received</span>`;
      }

      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
          <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.id}</td>
          <td class="py-3 px-3 text-[#0F172A]">${r.processor}</td>
          <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.viewPiDetails('${r.id}')">${r.piNumber}</td>
          <td class="py-3 px-3 text-[#0F172A] whitespace-nowrap">${r.piDate}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.poNo || r.poNumber}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A]">${r.buyer}</td>
          <td class="py-3 px-3 text-[#64748B] font-medium">${r.productionPlant}</td>
          <td class="py-3 px-3 text-[#64748B] whitespace-nowrap">${r.shipByDate || '--'}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">${badgeHtml}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">
            <div class="inline-flex items-center gap-1.5 justify-center">
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
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderProformaTotals(list) {
    const containerEl = document.getElementById('sales-pi-totals-container');
    if (!containerEl) return;

    const count = list.length;
    const totalAmount = list.reduce((sum, x) => sum + (parseFloat(x.totalAmountUsd) || 190000), 0);
    const totalCartons = list.reduce((sum, x) => sum + (parseInt(x.cartons) || 1800), 0);
    const avgValue = count > 0 ? totalAmount / count : 0;

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
  },

  searchProformaList(term) {
    const q = (term || '').toLowerCase().trim();
    if (!q) {
      this.renderProformaRows(this.proformaDataset);
      this.renderProformaTotals(this.proformaDataset);
      return;
    }

    const filtered = this.proformaDataset.filter(r => 
      (r.id || '').toLowerCase().includes(q) ||
      (r.piNumber || '').toLowerCase().includes(q) ||
      (r.poNo || '').toLowerCase().includes(q) ||
      (r.buyer || '').toLowerCase().includes(q) ||
      (r.productionPlant || '').toLowerCase().includes(q) ||
      (r.processor || '').toLowerCase().includes(q) ||
      (r.status || '').toLowerCase().includes(q)
    );

    this.renderProformaRows(filtered);
    this.renderProformaTotals(filtered);
  },

  filterProformaList() {
    const consignee = document.getElementById('sales-pi-consignee-select')?.value || 'ALL';
    const country = document.getElementById('sales-pi-country-select')?.value || 'ALL';
    const status = document.getElementById('sales-pi-status-select')?.value || 'ALL';

    const filtered = this.proformaDataset.filter(r => {
      const matchConsignee = consignee === 'ALL' || r.buyer === consignee;
      const matchCountry = country === 'ALL' || r.country === country;
      const matchStatus = status === 'ALL' || (r.status || '').toLowerCase() === status.toLowerCase();
      return matchConsignee && matchCountry && matchStatus;
    });

    this.renderProformaRows(filtered);
    this.renderProformaTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered Proforma List: ${filtered.length} records found`, 'info');
    }
  },

  loadAllProformaList() {
    const searchInput = document.getElementById('sales-pi-search-input');
    if (searchInput) searchInput.value = '';
    const consigneeSel = document.getElementById('sales-pi-consignee-select');
    if (consigneeSel) consigneeSel.value = 'ALL';
    const countrySel = document.getElementById('sales-pi-country-select');
    if (countrySel) countrySel.value = 'ALL';
    const statusSel = document.getElementById('sales-pi-status-select');
    if (statusSel) statusSel.value = 'ALL';

    this.renderProformaRows(this.proformaDataset);
    this.renderProformaTotals(this.proformaDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Loaded all 8 Proforma Invoices', 'info');
    }
  },

  toggleMoreSearch() {
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Advanced date & processor search filters active', 'info');
    }
  },

  bulkApprovePis() {
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Initiated Bulk Approval workflow for pending Proforma Invoices', 'info');
    }
  },

  viewPiDetails(id) {
    const item = this.proformaDataset.find(x => x.id === id) || { piNumber: id, buyer: 'EASTERN FISH COMPANY LLC' };
    if (typeof Modal !== 'undefined' && Modal.open) {
      Modal.open({
        title: `Proforma Invoice Details: ${item.piNumber}`,
        size: 'lg',
        content: `
          <div class="space-y-4 text-xs text-[#172B4D]">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] p-3 rounded-lg border border-[#DFE1E6]">
              <div><span class="text-[#5E6C84] block font-bold text-[10px] uppercase">PI Number</span><span class="font-extrabold text-[#006C7A] text-sm">${item.piNumber}</span></div>
              <div><span class="text-[#5E6C84] block font-bold text-[10px] uppercase">PO Number</span><span class="font-bold">${item.poNo || item.poNumber}</span></div>
              <div><span class="text-[#5E6C84] block font-bold text-[10px] uppercase">PI Date</span><span class="font-medium">${item.piDate}</span></div>
              <div><span class="text-[#5E6C84] block font-bold text-[10px] uppercase">Status</span><span class="font-bold text-[#006644]">${item.status}</span></div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="p-3 bg-white rounded border border-[#DFE1E6]">
                <span class="text-[#5E6C84] block font-bold text-[10px] uppercase mb-1">Buyer Details</span>
                <p class="font-bold text-[#172B4D]">${item.buyer}</p>
                <p class="text-[#5E6C84] mt-1">Country: ${item.country || 'USA'}</p>
                <p class="text-[#5E6C84]">Processor ID: ${item.processor}</p>
              </div>
              <div class="p-3 bg-white rounded border border-[#DFE1E6]">
                <span class="text-[#5E6C84] block font-bold text-[10px] uppercase mb-1">Manufacturing & Logistics</span>
                <p class="font-semibold text-[#172B4D]">Plant: ${item.productionPlant}</p>
                <p class="text-[#5E6C84] mt-1">ShipBy Date: ${item.shipByDate || '--'}</p>
                <p class="text-[#5E6C84]">Cartons: ${(item.cartons || 1800).toLocaleString()} Ctns</p>
              </div>
            </div>
          </div>
        `
      });
    }
  },

  editPi(id) {
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Opening Editor for PI ID #${id}...`, 'info');
    }
  },

  printPi(id) {
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Generating Printable Export Format for PI #${id}...`, 'info');
    }
  },

  copyPi(id) {
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Duplicated PI #${id} as new draft`, 'info');
    }
  },

  deletePi(id) {
    if (confirm(`Are you sure you want to delete Proforma Invoice #${id}?`)) {
      this.proformaDataset = this.proformaDataset.filter(x => x.id !== id);
      this.renderProformaRows(this.proformaDataset);
      this.renderProformaTotals(this.proformaDataset);
      if (typeof Toast !== 'undefined' && Toast.show) {
        Toast.show(`Proforma Invoice #${id} removed successfully`, 'info');
      }
    }
  },

    // ==========================================
  // CUSTOM INVOICES REGISTER (IMAGE REFERENCE)
  // ==========================================
  customInvoiceDataset: [
    { sNo: 1, id: '104', invoiceNo: 'DFL/KKD/2627/157', invoiceDate: '21-10-2026', poNo: 'DF/DF-2786', buyer: 'DEVI FISHERIES INC.', piNumber: 'DFL/PI/125/23-24', stockStatus: 'Pending', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', year: '2026-2027', billsType: 'Pending', cartons: 1800, valueUsd: 189000 },
    { sNo: 2, id: '6513', invoiceNo: 'DFL/JPT/2627/313', invoiceDate: '19-09-2026', poNo: 'PO1004191', buyer: 'STANLEY PEARLMAN ENTERPRISES, INC.', piNumber: 'DFL/PI/442/26-27', stockStatus: '09-10-2026', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', year: '2026-2027', billsType: 'Completed', cartons: 1800, valueUsd: 194500 },
    { sNo: 3, id: '6203', invoiceNo: 'DFL/JPT/2627/312', invoiceDate: '19-09-2026', poNo: '1102650547', buyer: 'C.P. FOOD PRODUCTS, INC.', piNumber: 'DFL/PI/134/26-27', stockStatus: '19-09-2026', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', year: '2026-2027', billsType: 'Completed', cartons: 1800, valueUsd: 191200 },
    { sNo: 4, id: '6302', invoiceNo: 'DFL/JPT/2627/311', invoiceDate: '19-09-2026', poNo: '1102650877', buyer: 'C.P. FOOD PRODUCTS, INC.', piNumber: 'DFL/PI/233/26-27', stockStatus: '19-09-2026', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', year: '2026-2027', billsType: 'Completed', cartons: 3600, valueUsd: 382000 },
    { sNo: 5, id: '5743', invoiceNo: 'DFL/JPT/2627/310', invoiceDate: '18-09-2026', poNo: '60150DEV010C', buyer: 'CRUSTA C SAS', piNumber: 'DFL/PI/1725/25-26', stockStatus: '18-09-2026', exporter: 'DEVI FISHERIES LIMITED', country: 'FRANCE', year: '2026-2027', billsType: 'Completed', cartons: 1800, valueUsd: 188500 },
    { sNo: 6, id: '6131', invoiceNo: 'DFL/JPT/2627/309', invoiceDate: '18-09-2026', poNo: '1102650475', buyer: 'C.P. FOOD PRODUCTS, INC.', piNumber: 'DFL/PI/062/26-27', stockStatus: '18-09-2026', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', year: '2026-2027', billsType: 'Completed', cartons: 1800, valueUsd: 178000 },
    { sNo: 7, id: '7050', invoiceNo: 'DFL/JPT/2627/308', invoiceDate: '18-09-2026', poNo: 'DF/DF-5611', buyer: 'DEVI FISHERIES INC.', piNumber: 'DFL/PI/968/26-27', stockStatus: '18-09-2026', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', year: '2026-2027', billsType: 'Completed', cartons: 1800, valueUsd: 193400 },
    { sNo: 8, id: '7051', invoiceNo: 'DFL/JPT/2627/307', invoiceDate: '18-09-2026', poNo: 'DF/DF-5612', buyer: 'DEVI FISHERIES INC.', piNumber: 'DFL/PI/969/26-27', stockStatus: '18-09-2026', exporter: 'DEVI FISHERIES LIMITED', country: 'USA', year: '2026-2027', billsType: 'Completed', cartons: 3600, valueUsd: 379000 }
  ],

    renderCustomInvoices(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#172B4D]">
        <!-- 2. Page Title Header -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">CUSTOM INVOICES</h1>
        </div>

        <!-- 3. Top Filter Card (Base Design System with AquaPulse Colors) -->
        <div id="sales-cinv-filter-card" class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT YEAR</label>
              <select id="sales-cinv-year-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT EXPORTER :</label>
              <select id="sales-cinv-exporter-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT CONSIGNEE :</label>
              <select id="sales-cinv-consignee-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="DEVI FISHERIES INC.">DEVI FISHERIES INC.</option>
                <option value="STANLEY PEARLMAN ENTERPRISES, INC.">STANLEY PEARLMAN ENTERPRISES, INC.</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="CRUSTA C SAS">CRUSTA C SAS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT COUNTRY:</label>
              <select id="sales-cinv-country-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="USA">U.S.A.</option>
                <option value="FRANCE">FRANCE</option>
                <option value="CHINA">CHINA</option>
                <option value="BELGIUM">BELGIUM</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">BILLS TYPE:</label>
              <select id="sales-cinv-type-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All">All</option>
                <option value="Completed" selected>Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div>
              <button id="btn-cinv-search" class="px-6 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterCustomInvoices()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 4. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-cinv-search-input" 
                placeholder="Search..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchCustomInvoices(this.value)"
              />
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.toggleMoreCinvSearch()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.loadAllCustomInvoices()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortCustomInvoices('sNo')">
                    <span class="inline-flex items-center gap-1">SNO <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">Invoice No</th>
                  <th class="py-3 px-3">Invoice Date</th>
                  <th class="py-3 px-3">Po No</th>
                  <th class="py-3 px-3">Buyer</th>
                  <th class="py-3 px-3">PInvoice No</th>
                  <th class="py-3 px-3 text-center">Stock Status</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-cinv-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card (Base Design System) -->
          <div id="sales-cinv-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderCustomInvoiceRows(this.customInvoiceDataset);
    this.renderCustomInvoiceTotals(this.customInvoiceDataset);
  },

  renderCustomInvoiceRows(list) {
    const tbody = document.getElementById('sales-cinv-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="py-8 text-center text-[#64748B] text-xs">
            No custom invoices found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => {
      const isPending = (r.stockStatus || '').toLowerCase() === 'pending';
      const badgeHtml = isPending
        ? `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#EF4444] shadow-xs">Pending</span>`
        : `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#16A34A] shadow-xs">${r.stockStatus}</span>`;

      const rowHighlight = r.id === '6302' ? 'bg-[#FEF9C3]' : 'hover:bg-[#F8FAFC]';

      return `
        <tr class="${rowHighlight} transition-colors border-b border-[#EBECF0]">
          <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.id}</td>
          <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.viewCustomInvoice('${r.id}')">${r.invoiceNo}</td>
          <td class="py-3 px-3 text-[#0F172A] whitespace-nowrap">${r.invoiceDate}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.poNo}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A]">${r.buyer}</td>
          <td class="py-3 px-3 text-[#64748B]">${r.piNumber}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">${badgeHtml}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">
            <div class="inline-flex items-center gap-2 justify-center text-[#2563EB]">
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
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderCustomInvoiceTotals(list) {
    const el = document.getElementById('sales-cinv-totals');
    if (!el) return;

    const count = list.length;
    const cleared = list.filter(x => (x.stockStatus || '').toLowerCase() !== 'pending').length;
    const pending = count - cleared;
    const totalCartons = list.reduce((sum, r) => sum + (r.cartons || 1800), 0);
    const totalVal = list.reduce((sum, r) => sum + (r.valueUsd || 190000), 0);

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Invoices</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Invoices</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Cleared Stock</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${cleared} <span class="text-xs font-semibold text-[#006644]">Cleared</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Stock</div>
          <div class="text-lg font-black text-[#991B1B] mt-0.5">${pending} <span class="text-xs font-semibold text-[#991B1B]">Pending</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Commercial Value</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">$${totalVal.toLocaleString()} <span class="text-[11px] font-semibold text-[#64748B]">(${totalCartons.toLocaleString()} Ctns)</span></div>
        </div>
      </div>
    `;
  },

  filterCustomInvoices() {
    const year = document.getElementById('sales-cinv-year-select')?.value || 'All';
    const exporter = document.getElementById('sales-cinv-exporter-select')?.value || 'All';
    const consignee = document.getElementById('sales-cinv-consignee-select')?.value || 'All';
    const country = document.getElementById('sales-cinv-country-select')?.value || 'All';
    const billsType = document.getElementById('sales-cinv-type-select')?.value || 'All';

    const filtered = this.customInvoiceDataset.filter(r => {
      const matchYear = year === 'All' || r.year === year;
      const matchExporter = exporter === 'All' || r.exporter === exporter;
      const matchConsignee = consignee === 'All' || r.buyer === consignee;
      const matchCountry = country === 'All' || r.country === country;
      const matchType = billsType === 'All' || r.billsType === billsType || (billsType === 'Pending' && (r.stockStatus || '').toLowerCase() === 'pending');
      return matchYear && matchExporter && matchConsignee && matchCountry && matchType;
    });

    this.renderCustomInvoiceRows(filtered);
    this.renderCustomInvoiceTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered: ${filtered.length} Custom Invoice(s) found`, 'info');
    }
  },

  searchCustomInvoices(term) {
    const q = (term || '').trim().toLowerCase();
    if (!q) {
      this.renderCustomInvoiceRows(this.customInvoiceDataset);
      this.renderCustomInvoiceTotals(this.customInvoiceDataset);
      return;
    }

    const filtered = this.customInvoiceDataset.filter(r => {
      return (r.invoiceNo || '').toLowerCase().includes(q) ||
             (r.poNo || '').toLowerCase().includes(q) ||
             (r.buyer || '').toLowerCase().includes(q) ||
             (r.piNumber || '').toLowerCase().includes(q) ||
             (r.id || '').toLowerCase().includes(q);
    });

    this.renderCustomInvoiceRows(filtered);
    this.renderCustomInvoiceTotals(filtered);
  },

  loadAllCustomInvoices() {
    const yearEl = document.getElementById('sales-cinv-year-select');
    const exporterEl = document.getElementById('sales-cinv-exporter-select');
    const consigneeEl = document.getElementById('sales-cinv-consignee-select');
    const countryEl = document.getElementById('sales-cinv-country-select');
    const typeEl = document.getElementById('sales-cinv-type-select');
    const searchEl = document.getElementById('sales-cinv-search-input');

    if (yearEl) yearEl.value = '2026-2027';
    if (exporterEl) exporterEl.value = 'DEVI FISHERIES LIMITED';
    if (consigneeEl) consigneeEl.value = 'All';
    if (countryEl) countryEl.value = 'All';
    if (typeEl) typeEl.value = 'All';
    if (searchEl) searchEl.value = '';

    this.renderCustomInvoiceRows(this.customInvoiceDataset);
    this.renderCustomInvoiceTotals(this.customInvoiceDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Loaded all ${this.customInvoiceDataset.length} Custom Invoices`, 'success');
    }
  },

  toggleMoreCinvSearch() {
    const card = document.getElementById('sales-cinv-filter-card');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      card.classList.add('ring-2', 'ring-[#006C7A]');
      setTimeout(() => card.classList.remove('ring-2', 'ring-[#006C7A]'), 1200);
    }
  },

  sortCustomInvoices(key) {
    this.customInvoiceDataset.reverse();
    this.renderCustomInvoiceRows(this.customInvoiceDataset);
  },

  openNewCustomInvoice() {
    if (typeof Modal === 'undefined' || !Modal.open) {
      alert('Modal component not ready');
      return;
    }

    Modal.open({
      title: 'Generate Custom Invoice',
      size: 'lg',
      content: `
        <form id="form-new-cinv" onsubmit="event.preventDefault(); SalesView.submitNewCustomInvoice();" class="space-y-4 text-xs text-[#0F172A]">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                INVOICE NUMBER <span class="text-[#FF5150]">*</span>
              </label>
              <input type="text" id="cinv-input-no" value="DFL/JPT/2627/${Math.floor(314 + Math.random() * 50)}" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white font-semibold outline-none focus:border-[#006C7A]">
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                INVOICE DATE <span class="text-[#FF5150]">*</span>
              </label>
              <input type="date" id="cinv-input-date" value="2026-10-23" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white font-semibold outline-none focus:border-[#006C7A]">
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                PO NUMBER <span class="text-[#FF5150]">*</span>
              </label>
              <input type="text" id="cinv-input-po" value="PO-2026-${Math.floor(100 + Math.random() * 900)}" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white font-semibold outline-none focus:border-[#006C7A]">
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                BUYER ENTITY <span class="text-[#FF5150]">*</span>
              </label>
              <select id="cinv-input-buyer" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white font-semibold outline-none focus:border-[#006C7A]">
                <option value="DEVI FISHERIES INC." selected>DEVI FISHERIES INC.</option>
                <option value="STANLEY PEARLMAN ENTERPRISES, INC.">STANLEY PEARLMAN ENTERPRISES, INC.</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="CRUSTA C SAS">CRUSTA C SAS</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                P.INVOICE NO <span class="text-[#FF5150]">*</span>
              </label>
              <input type="text" id="cinv-input-pi" value="DFL/PI/${Math.floor(500 + Math.random() * 500)}/26-27" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white font-semibold outline-none focus:border-[#006C7A]">
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                STOCK STATUS <span class="text-[#FF5150]">*</span>
              </label>
              <select id="cinv-input-status" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white font-semibold outline-none focus:border-[#006C7A]">
                <option value="Pending" selected>Pending</option>
                <option value="23-10-2026">Cleared (23-10-2026)</option>
              </select>
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        {
          label: 'Cancel',
          type: 'secondary',
          onClick: (m) => m.close()
        },
        {
          label: 'Generate Invoice',
          type: 'primary',
          onClick: () => SalesView.submitNewCustomInvoice()
        }
      ]
    });
  },

  submitNewCustomInvoice() {
    const invoiceNo = document.getElementById('cinv-input-no')?.value.trim() || 'DFL/JPT/2627/315';
    const invoiceDate = document.getElementById('cinv-input-date')?.value || '23-10-2026';
    const poNo = document.getElementById('cinv-input-po')?.value.trim() || 'PO-NEW-2026';
    const buyer = document.getElementById('cinv-input-buyer')?.value || 'DEVI FISHERIES INC.';
    const piNumber = document.getElementById('cinv-input-pi')?.value.trim() || 'DFL/PI/999/26-27';
    const stockStatus = document.getElementById('cinv-input-status')?.value || 'Pending';

    const newId = String(Math.floor(7052 + Math.random() * 100));

    const newRecord = {
      sNo: 1,
      id: newId,
      invoiceNo,
      invoiceDate,
      poNo,
      buyer,
      piNumber,
      stockStatus,
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'USA',
      year: '2026-2027',
      billsType: stockStatus === 'Pending' ? 'Pending' : 'Completed',
      cartons: 1800,
      valueUsd: 192000
    };

    this.customInvoiceDataset.unshift(newRecord);
    this.customInvoiceDataset.forEach((r, idx) => { r.sNo = idx + 1; });

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    this.renderCustomInvoiceRows(this.customInvoiceDataset);
    this.renderCustomInvoiceTotals(this.customInvoiceDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Custom Invoice ${invoiceNo} generated successfully!`, 'success');
    }
  },

  downloadCustomInvoice(id) {
    const inv = this.customInvoiceDataset.find(x => x.id === id);
    const num = inv ? inv.invoiceNo : id;
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Downloading Commercial Custom Invoice: ${num}`, 'success');
    }
  },

  editCustomInvoice(id) {
    const inv = this.customInvoiceDataset.find(x => x.id === id);
    if (!inv) return;
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Editing Custom Invoice: ${inv.invoiceNo}`, 'info');
    }
  },

  copyCustomInvoice(id) {
    const inv = this.customInvoiceDataset.find(x => x.id === id);
    if (!inv) return;
    const copy = { ...inv, id: String(Math.floor(8000 + Math.random() * 1000)), invoiceNo: `${inv.invoiceNo}-COPY`, sNo: 1 };
    this.customInvoiceDataset.unshift(copy);
    this.customInvoiceDataset.forEach((r, idx) => { r.sNo = idx + 1; });
    this.renderCustomInvoiceRows(this.customInvoiceDataset);
    this.renderCustomInvoiceTotals(this.customInvoiceDataset);
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Duplicated Custom Invoice: ${copy.invoiceNo}`, 'success');
    }
  },

  viewCustomInvoice(id) {
    const inv = this.customInvoiceDataset.find(x => x.id === id);
    if (!inv) return;
    if (typeof Modal !== 'undefined' && Modal.open) {
      Modal.open({
        title: `Custom Invoice Details - ${inv.invoiceNo}`,
        size: 'md',
        content: `
          <div class="space-y-3 text-xs text-[#0F172A]">
            <div class="grid grid-cols-2 gap-2 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
              <div><span class="text-[#64748B]">Invoice No:</span> <span class="font-bold">${inv.invoiceNo}</span></div>
              <div><span class="text-[#64748B]">Date:</span> <span class="font-semibold">${inv.invoiceDate}</span></div>
              <div><span class="text-[#64748B]">PO Number:</span> <span class="font-semibold">${inv.poNo}</span></div>
              <div><span class="text-[#64748B]">PI Number:</span> <span class="font-semibold">${inv.piNumber}</span></div>
              <div><span class="text-[#64748B]">Buyer:</span> <span class="font-bold text-[#006C7A]">${inv.buyer}</span></div>
              <div><span class="text-[#64748B]">Stock Status:</span> <span class="font-bold">${inv.stockStatus}</span></div>
              <div><span class="text-[#64748B]">Total Cartons:</span> <span class="font-bold">${inv.cartons?.toLocaleString() || '1,800'} Ctns</span></div>
              <div><span class="text-[#64748B]">Commercial Value:</span> <span class="font-extrabold text-[#006644]">$${inv.valueUsd?.toLocaleString() || '190,000'}</span></div>
            </div>
          </div>
        `,
        footerButtons: [{ label: 'Close', type: 'secondary', onClick: (m) => m.close() }]
      });
    }
  },

  printCustomInvoice(id) {
    const inv = this.customInvoiceDataset.find(x => x.id === id);
    const num = inv ? inv.invoiceNo : id;
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Sending Custom Invoice ${num} to printer...`, 'info');
    }
  },

    // ==========================================
  // ISF 10+2 DETAILS REGISTER
  // ==========================================
  isfDataset: [
    {
      sNo: 1,
      id: 'ISF-901',
      containerNo: 'MSCU7397679',
      sealNo: 'MSC-SL-901844',
      carrier: 'MSC',
      shippingLineFull: 'Mediterranean Shipping Company (MSC)',
      blNo: 'MEDUAPX2609918',
      customInv: 'DFL/JPT/2627/314',
      poNo: 'DF/DF-5616',
      buyer: 'DEVI FISHERIES INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-20.0°C',
      isfTransactionNo: 'ISF-2026-USCBP-98214',
      status: 'Completed'
    },
    {
      sNo: 2,
      id: 'ISF-902',
      containerNo: 'MSKU4109823',
      sealNo: 'MSK-992144',
      carrier: 'Maersk Line',
      shippingLineFull: 'Maersk Line A/S',
      blNo: 'MAEU9821034',
      customInv: 'DFL/JPT/2627/313',
      poNo: 'PO1004191',
      buyer: 'STANLEY PEARLMAN ENTERPRISES, INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-19.5°C',
      isfTransactionNo: 'ISF-2026-USCBP-98215',
      status: 'Completed'
    },
    {
      sNo: 3,
      id: 'ISF-903',
      containerNo: 'HLCU8821945',
      sealNo: 'HL-882140',
      carrier: 'Hapag-Lloyd',
      shippingLineFull: 'Hapag-Lloyd AG',
      blNo: 'HLCU9920145',
      customInv: 'DFL/JPT/2627/312',
      poNo: '1102650547',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-21.0°C',
      isfTransactionNo: 'ISF-2026-USCBP-98216',
      status: 'Completed'
    },
    {
      sNo: 4,
      id: 'ISF-904',
      containerNo: 'CMAU9102482',
      sealNo: 'CMA-551029',
      carrier: 'CMA CGM',
      shippingLineFull: 'CMA CGM Group',
      blNo: 'CMAU7710294',
      customInv: 'DFL/JPT/2627/311',
      poNo: '1102650877',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-18.5°C',
      isfTransactionNo: 'ISF-2026-USCBP-98217',
      status: 'Completed'
    },
    {
      sNo: 5,
      id: 'ISF-905',
      containerNo: 'MSCU8810294',
      sealNo: 'MSC-SL-902100',
      carrier: 'MSC',
      shippingLineFull: 'Mediterranean Shipping Company (MSC)',
      blNo: 'MEDUAPX2609920',
      customInv: 'DFL/JPT/2627/310',
      poNo: '60150DEV010C',
      buyer: 'CRUSTA C SAS',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-20.5°C',
      isfTransactionNo: 'ISF-2026-USCBP-98218',
      status: 'Completed'
    },
    {
      sNo: 6,
      id: 'ISF-906',
      containerNo: 'ONEY4410928',
      sealNo: 'ONE-338192',
      carrier: 'ONE Line',
      shippingLineFull: 'Ocean Network Express (ONE)',
      blNo: 'ONEY9920144',
      customInv: 'DFL/JPT/2627/309',
      poNo: '1102650475',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-19.0°C',
      isfTransactionNo: 'ISF-2026-USCBP-98219',
      status: 'Completed'
    },
    {
      sNo: 7,
      id: 'ISF-907',
      containerNo: 'MSKU7720194',
      sealNo: 'MSK-881023',
      carrier: 'Maersk Line',
      shippingLineFull: 'Maersk Line A/S',
      blNo: 'MAEU9821040',
      customInv: 'DFL/JPT/2627/308',
      poNo: 'DF/DF-5611',
      buyer: 'DEVI FISHERIES INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-20.0°C',
      isfTransactionNo: 'Pending Filing',
      status: 'Pending'
    },
    {
      sNo: 8,
      id: 'ISF-908',
      containerNo: 'HLCU3319028',
      sealNo: 'HL-992014',
      carrier: 'Hapag-Lloyd',
      shippingLineFull: 'Hapag-Lloyd AG',
      blNo: 'HLCU9920150',
      customInv: 'DFL/JPT/2627/307',
      poNo: 'DF/DF-5612',
      buyer: 'DEVI FISHERIES INC.',
      exporter: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      tempRecord: '-18.0°C',
      isfTransactionNo: 'Pending Filing',
      status: 'Pending'
    }
  ],

  renderIsfDetails(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#172B4D]">
        <!-- 2. Page Title Header (Clean - No extra buttons or clutter) -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">ISF 10+2 DETAILS</h1>
        </div>

        <!-- 3. Top Filter Card (Base Design System with AquaPulse Colors, NO empty circle on top right) -->
        <div id="sales-isf-filter-card" class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT YEAR</label>
              <select id="sales-isf-year-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT EXPORTER :</label>
              <select id="sales-isf-exporter-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT BUYER :</label>
              <select id="sales-isf-buyer-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="DEVI FISHERIES INC.">DEVI FISHERIES INC.</option>
                <option value="STANLEY PEARLMAN ENTERPRISES, INC.">STANLEY PEARLMAN ENTERPRISES, INC.</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="CRUSTA C SAS">CRUSTA C SAS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">CARRIER :</label>
              <select id="sales-isf-carrier-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="MSC">MSC</option>
                <option value="Maersk Line">Maersk Line</option>
                <option value="Hapag-Lloyd">Hapag-Lloyd</option>
                <option value="CMA CGM">CMA CGM</option>
                <option value="ONE Line">ONE Line</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">FILING STATUS :</label>
              <select id="sales-isf-status-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All">All</option>
                <option value="Completed" selected>Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div>
              <button id="btn-isf-search" class="px-6 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterIsfDetails()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 4. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-isf-search-input" 
                placeholder="Search container, seal, carrier, BL, invoice..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchIsfDetails(this.value)"
              />
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.toggleMoreIsfSearch()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.loadAllIsfDetails()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortIsfDetails('sNo')">
                    <span class="inline-flex items-center gap-1">SNO <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">CONTAINER NO</th>
                  <th class="py-3 px-3">SEAL NO</th>
                  <th class="py-3 px-3">CARRIER</th>
                  <th class="py-3 px-3">BL NO</th>
                  <th class="py-3 px-3">CUSTOM INV</th>
                  <th class="py-3 px-3">HOLDING TEMP</th>
                  <th class="py-3 px-3">ISF TRANSACTION NO</th>
                  <th class="py-3 px-3 text-center">STATUS</th>
                  <th class="py-3 px-3 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody id="sales-isf-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card (Base Design System) -->
          <div id="sales-isf-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderIsfRows(this.isfDataset);
    this.renderIsfTotals(this.isfDataset);
  },

  renderIsfRows(list) {
    const tbody = document.getElementById('sales-isf-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="10" class="py-8 text-center text-[#64748B] text-xs">
            No ISF 10+2 records found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => {
      const isPending = (r.status || '').toLowerCase() === 'pending';
      const badgeHtml = isPending
        ? `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#EF4444] shadow-xs">Pending</span>`
        : `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#16A34A] shadow-xs">Completed</span>`;

      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
          <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
          <td class="py-3 px-3 font-mono font-bold text-[#0F172A] hover:text-[#006C7A] cursor-pointer" onclick="SalesView.viewIsfDetails('${r.id}')">${r.containerNo}</td>
          <td class="py-3 px-3 font-mono text-[#475569]">${r.sealNo}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.carrier}</td>
          <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.viewIsfDetails('${r.id}')">${r.blNo}</td>
          <td class="py-3 px-3 text-[#0F172A] font-medium">${r.customInv}</td>
          <td class="py-3 px-3 font-mono font-bold text-[#0284C7]">${r.tempRecord}</td>
          <td class="py-3 px-3 font-mono text-[#475569]">${r.isfTransactionNo}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">${badgeHtml}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">
            <div class="inline-flex items-center gap-2 justify-center text-[#2563EB]">
              <button class="p-1 hover:text-[#1D4ED8] cursor-pointer transition-colors" title="Download ISF Filing" onclick="SalesView.downloadIsfDetails('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              </button>
              <button class="p-1 hover:text-[#1D4ED8] cursor-pointer transition-colors" title="View ISF Details" onclick="SalesView.viewIsfDetails('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
              <button class="p-1 hover:text-[#1D4ED8] cursor-pointer transition-colors" title="Print ISF Summary" onclick="SalesView.printIsfDetails('${r.id}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderIsfTotals(list) {
    const el = document.getElementById('sales-isf-totals');
    if (!el) return;

    const count = list.length;
    const completed = list.filter(x => (x.status || '').toLowerCase() === 'completed').length;
    const pending = count - completed;

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Containers</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Containers</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Completed ISF</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${completed} <span class="text-xs font-semibold text-[#006644]">Filed</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Filing</div>
          <div class="text-lg font-black text-[#991B1B] mt-0.5">${pending} <span class="text-xs font-semibold text-[#991B1B]">Pending</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">CBP Compliance Rate</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">${count > 0 ? Math.round((completed / count) * 100) : 100}% <span class="text-[11px] font-semibold text-[#64748B]">(24h Manifest)</span></div>
        </div>
      </div>
    `;
  },

  filterIsfDetails() {
    const year = document.getElementById('sales-isf-year-select')?.value || 'All';
    const exporter = document.getElementById('sales-isf-exporter-select')?.value || 'All';
    const buyer = document.getElementById('sales-isf-buyer-select')?.value || 'All';
    const carrier = document.getElementById('sales-isf-carrier-select')?.value || 'All';
    const status = document.getElementById('sales-isf-status-select')?.value || 'All';

    const filtered = this.isfDataset.filter(r => {
      const matchYear = year === 'All' || r.year === year;
      const matchExporter = exporter === 'All' || r.exporter === exporter;
      const matchBuyer = buyer === 'All' || r.buyer === buyer;
      const matchCarrier = carrier === 'All' || r.carrier.toLowerCase().includes(carrier.toLowerCase());
      const matchStatus = status === 'All' || r.status === status;
      return matchYear && matchExporter && matchBuyer && matchCarrier && matchStatus;
    });

    this.renderIsfRows(filtered);
    this.renderIsfTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered: Found ${filtered.length} ISF records`, 'info');
    }
  },

  searchIsfDetails(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.renderIsfRows(this.isfDataset);
      this.renderIsfTotals(this.isfDataset);
      return;
    }

    const filtered = this.isfDataset.filter(r => {
      return (r.containerNo && r.containerNo.toLowerCase().includes(q)) ||
        (r.sealNo && r.sealNo.toLowerCase().includes(q)) ||
        (r.carrier && r.carrier.toLowerCase().includes(q)) ||
        (r.blNo && r.blNo.toLowerCase().includes(q)) ||
        (r.customInv && r.customInv.toLowerCase().includes(q)) ||
        (r.isfTransactionNo && r.isfTransactionNo.toLowerCase().includes(q)) ||
        (r.buyer && r.buyer.toLowerCase().includes(q));
    });

    this.renderIsfRows(filtered);
    this.renderIsfTotals(filtered);
  },

  loadAllIsfDetails() {
    const yearEl = document.getElementById('sales-isf-year-select');
    const exporterEl = document.getElementById('sales-isf-exporter-select');
    const buyerEl = document.getElementById('sales-isf-buyer-select');
    const carrierEl = document.getElementById('sales-isf-carrier-select');
    const statusEl = document.getElementById('sales-isf-status-select');
    const searchEl = document.getElementById('sales-isf-search-input');

    if (yearEl) yearEl.value = '2026-2027';
    if (exporterEl) exporterEl.value = 'DEVI FISHERIES LIMITED';
    if (buyerEl) buyerEl.value = 'All';
    if (carrierEl) carrierEl.value = 'All';
    if (statusEl) statusEl.value = 'All';
    if (searchEl) searchEl.value = '';

    this.renderIsfRows(this.isfDataset);
    this.renderIsfTotals(this.isfDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Loaded all ${this.isfDataset.length} ISF records`, 'success');
    }
  },

  toggleMoreIsfSearch() {
    const card = document.getElementById('sales-isf-filter-card');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      card.classList.add('ring-2', 'ring-[#006C7A]');
      setTimeout(() => card.classList.remove('ring-2', 'ring-[#006C7A]'), 1200);
    }
  },

  sortIsfDetails(key) {
    this.isfDataset.reverse();
    this.renderIsfRows(this.isfDataset);
  },

  viewIsfDetails(id) {
    const record = this.isfDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal !== 'undefined' && Modal.open) {
      Modal.open({
        title: `ISF 10+2 Details - ${record.containerNo}`,
        size: 'md',
        content: `
          <div class="space-y-4 text-xs text-[#0F172A]">
            <div class="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3">
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div><span class="text-[#64748B]">Container No:</span> <span class="font-mono font-bold text-[#0F172A]">${record.containerNo}</span></div>
                <div><span class="text-[#64748B]">Seal No:</span> <span class="font-mono font-bold text-[#0F172A]">${record.sealNo}</span></div>
                <div><span class="text-[#64748B]">Carrier:</span> <span class="font-semibold text-[#0F172A]">${record.shippingLineFull || record.carrier}</span></div>
                <div><span class="text-[#64748B]">BL Number:</span> <span class="font-bold text-[#006C7A]">${record.blNo}</span></div>
                <div><span class="text-[#64748B]">Custom Invoice:</span> <span class="font-semibold text-[#0F172A]">${record.customInv}</span></div>
                <div><span class="text-[#64748B]">PO Number:</span> <span class="font-semibold text-[#0F172A]">${record.poNo}</span></div>
                <div><span class="text-[#64748B]">Buyer:</span> <span class="font-bold text-[#0F172A]">${record.buyer}</span></div>
                <div><span class="text-[#64748B]">Exporter:</span> <span class="font-semibold text-[#0F172A]">${record.exporter}</span></div>
                <div><span class="text-[#64748B]">Reefer Temp:</span> <span class="font-mono font-bold text-[#0284C7]">${record.tempRecord}</span></div>
                <div><span class="text-[#64748B]">ISF Txn No:</span> <span class="font-mono font-bold text-[#0F172A]">${record.isfTransactionNo}</span></div>
                <div><span class="text-[#64748B]">Filing Status:</span> <span class="font-bold ${record.status === 'Completed' ? 'text-[#16A34A]' : 'text-[#DC2626]'}">${record.status}</span></div>
              </div>
            </div>
            <div class="p-2.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg text-[11px] text-[#166534]">
              US Customs and Border Protection (CBP) 10+2 Importer Security Filing verified and compliant with vessel stowage plans.
            </div>
          </div>
        `,
        footerButtons: [{ label: 'Close', type: 'secondary', onClick: (m) => m.close() }]
      });
    } else if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Viewing ISF for ${record.containerNo}`, 'info');
    }
  },

  downloadIsfDetails(id) {
    const record = this.isfDataset.find(x => x.id === id);
    const num = record ? record.containerNo : id;
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Downloading ISF Manifest for container ${num}...`, 'success');
    }
  },

  printIsfDetails(id) {
    const record = this.isfDataset.find(x => x.id === id);
    const num = record ? record.containerNo : id;
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Sending ISF filing ${num} to printer...`, 'info');
    }
  },

    // ==========================================
  // SHIPPING BILL REGISTER (IMAGE 2 & 3 REFERENCE)
  // ==========================================
  shippingBillDataset: [
    {
      sNo: 1,
      id: '6302',
      invoiceNo: 'DFL/JPT/2627/311',
      invoiceDate: '19/09/2026',
      poNo: '1102650877',
      consignee: 'C.P. FOOD PRODUCTS, INC.',
      shippingBillNo: '',
      status: 'Pending',
      plant: 'ALL',
      country: 'USA',
      portOfLoading: 'VISAKHAPATNAM',
      portOfDischarge: 'NEW YORK',
      countryOfDestination: 'U.S.A.',
      cartons: '1800',
      netWtKg: '8135.68',
      invoiceValueUsd: '191200',
      freight: '8200',
      otherDeductionsUsd: '20168.08',
      fobInr: '0.00',
      shippingDate: '',
      leoDate: '',
      exchangeRate: '83.85',
      sbFobUsd: '162831.92',
      sbFobInr: '13653456.49',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 2,
      id: '5743',
      invoiceNo: 'DFL/JPT/2627/310',
      invoiceDate: '18/09/2026',
      poNo: '60150DEV010C',
      consignee: 'CRUSTA C SAS',
      shippingBillNo: '',
      status: 'Pending',
      plant: 'ALL',
      country: 'FRANCE',
      portOfLoading: 'VISAKHAPATNAM',
      portOfDischarge: 'LE HAVRE',
      countryOfDestination: 'FRANCE',
      cartons: '1800',
      netWtKg: '8164.66',
      invoiceValueUsd: '188500',
      freight: '7800',
      otherDeductionsUsd: '18500.00',
      fobInr: '0.00',
      shippingDate: '',
      leoDate: '',
      exchangeRate: '83.85',
      sbFobUsd: '162200.00',
      sbFobInr: '13600470.00',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 3,
      id: '6131',
      invoiceNo: 'DFL/JPT/2627/309',
      invoiceDate: '18/09/2026',
      poNo: '1102650475',
      consignee: 'C.P. FOOD PRODUCTS, INC.',
      shippingBillNo: '',
      status: 'Pending',
      plant: 'ALL',
      country: 'USA',
      portOfLoading: 'VISAKHAPATNAM',
      portOfDischarge: 'LOS ANGELES',
      countryOfDestination: 'U.S.A.',
      cartons: '1800',
      netWtKg: '8140.00',
      invoiceValueUsd: '178000',
      freight: '8000',
      otherDeductionsUsd: '17000.00',
      fobInr: '0.00',
      shippingDate: '',
      leoDate: '',
      exchangeRate: '83.85',
      sbFobUsd: '153000.00',
      sbFobInr: '12829050.00',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 4,
      id: '7050',
      invoiceNo: 'DFL/JPT/2627/308',
      invoiceDate: '18/09/2026',
      poNo: 'DF/DF-5611',
      consignee: 'DEVI FISHERIES INC.',
      shippingBillNo: '',
      status: 'Pending',
      plant: 'ALL',
      country: 'USA',
      portOfLoading: 'VISAKHAPATNAM',
      portOfDischarge: 'BALTIMORE',
      countryOfDestination: 'U.S.A.',
      cartons: '1800',
      netWtKg: '8150.00',
      invoiceValueUsd: '193400',
      freight: '8500',
      otherDeductionsUsd: '19500.00',
      fobInr: '0.00',
      shippingDate: '',
      leoDate: '',
      exchangeRate: '83.85',
      sbFobUsd: '165400.00',
      sbFobInr: '13868790.00',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 5,
      id: '7051',
      invoiceNo: 'DFL/JPT/2627/307',
      invoiceDate: '18/09/2026',
      poNo: 'DF/DF-5612',
      consignee: 'DEVI FISHERIES INC.',
      shippingBillNo: '',
      status: 'Pending',
      plant: 'ALL',
      country: 'USA',
      portOfLoading: 'VISAKHAPATNAM',
      portOfDischarge: 'BALTIMORE',
      countryOfDestination: 'U.S.A.',
      cartons: '3600',
      netWtKg: '16300.00',
      invoiceValueUsd: '379000',
      freight: '17000',
      otherDeductionsUsd: '38000.00',
      fobInr: '0.00',
      shippingDate: '',
      leoDate: '',
      exchangeRate: '83.85',
      sbFobUsd: '324000.00',
      sbFobInr: '27167400.00',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 6,
      id: '7171',
      invoiceNo: 'DFL/KKD/2627/155',
      invoiceDate: '17/09/2026',
      poNo: 'QL150-2026Y37-313',
      consignee: 'Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.',
      shippingBillNo: '',
      status: 'Pending',
      plant: 'ALL',
      country: 'CHINA',
      portOfLoading: 'KRISHNAPATNAM',
      portOfDischarge: 'GUANGZHOU',
      countryOfDestination: 'CHINA',
      cartons: '1800',
      netWtKg: '8120.00',
      invoiceValueUsd: '184000',
      freight: '6500',
      otherDeductionsUsd: '15000.00',
      fobInr: '0.00',
      shippingDate: '',
      leoDate: '',
      exchangeRate: '83.85',
      sbFobUsd: '162500.00',
      sbFobInr: '13625625.00',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 7,
      id: '7169',
      invoiceNo: 'DFL/KKD/2627/154',
      invoiceDate: '17/09/2026',
      poNo: 'QL150-2026Y37-311',
      consignee: 'Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.',
      shippingBillNo: '',
      status: 'Pending',
      plant: 'ALL',
      country: 'CHINA',
      portOfLoading: 'KRISHNAPATNAM',
      portOfDischarge: 'GUANGZHOU',
      countryOfDestination: 'CHINA',
      cartons: '1800',
      netWtKg: '8125.00',
      invoiceValueUsd: '185500',
      freight: '6500',
      otherDeductionsUsd: '15200.00',
      fobInr: '0.00',
      shippingDate: '',
      leoDate: '',
      exchangeRate: '83.85',
      sbFobUsd: '163800.00',
      sbFobInr: '13734630.00',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 8,
      id: '7170',
      invoiceNo: 'DFL/KKD/2627/153',
      invoiceDate: '16/09/2026',
      poNo: 'QL150-2026Y37-312',
      consignee: 'Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.',
      shippingBillNo: '',
      status: 'Pending',
      plant: 'ALL',
      country: 'CHINA',
      portOfLoading: 'KRISHNAPATNAM',
      portOfDischarge: 'GUANGZHOU',
      countryOfDestination: 'CHINA',
      cartons: '1800',
      netWtKg: '8130.00',
      invoiceValueUsd: '186000',
      freight: '6500',
      otherDeductionsUsd: '15100.00',
      fobInr: '0.00',
      shippingDate: '',
      leoDate: '',
      exchangeRate: '83.85',
      sbFobUsd: '164400.00',
      sbFobInr: '13784940.00',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    }
  ],

  renderShippingBill(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#172B4D]">
        <!-- 1. Page Title Header (Image 2) -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">SHIPPING BILL</h1>
        </div>

        <!-- 2. Top Filter Card (Base Design System with AquaPulse Colors, Image 2) -->
        <div id="sales-sb-filter-card" class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT YEAR</label>
              <select id="sales-sb-year-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT EXPORTER :</label>
              <select id="sales-sb-exporter-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT CONSIGNEE :</label>
              <select id="sales-sb-consignee-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="ALL" selected>ALL</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="CRUSTA C SAS">CRUSTA C SAS</option>
                <option value="DEVI FISHERIES INC.">DEVI FISHERIES INC.</option>
                <option value="Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.">Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT PLANT :</label>
              <select id="sales-sb-plant-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="ALL" selected>ALL</option>
                <option value="VSP">VSP</option>
                <option value="JPT">JPT</option>
                <option value="KKD">KKD</option>
                <option value="SATYA">SATYA</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT COUNTRY:</label>
              <select id="sales-sb-country-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="USA">U.S.A.</option>
                <option value="FRANCE">FRANCE</option>
                <option value="CHINA">CHINA</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">INVOICE STATUS :</label>
              <select id="sales-sb-status-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="Pending" selected>Pending</option>
                <option value="Completed">Completed</option>
                <option value="All">All</option>
              </select>
            </div>

            <div>
              <button id="btn-sb-search" class="px-6 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterShippingBill()">
                <span>Search</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 3. Table Card (Image 2) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-sb-search-input" 
                placeholder="Search..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchShippingBill(this.value)"
              />
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.toggleMoreSbSearch()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.loadAllShippingBill()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortShippingBill('sNo')">
                    <span class="inline-flex items-center gap-1">S.No <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">Inv No</th>
                  <th class="py-3 px-3">PoNo</th>
                  <th class="py-3 px-3">Consignee Name</th>
                  <th class="py-3 px-3">Shipping Bill No</th>
                  <th class="py-3 px-3 text-center">Invoice Status</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-sb-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Totals Card -->
          <div id="sales-sb-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderShippingBillRows(this.shippingBillDataset);
    this.renderShippingBillTotals(this.shippingBillDataset);
  },

  renderShippingBillRows(list) {
    const tbody = document.getElementById('sales-sb-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="py-8 text-center text-[#64748B] text-xs">
            No shipping bill records found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => {
      const isPending = (r.status || '').toLowerCase() === 'pending';
      const badgeHtml = isPending
        ? `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#EF4444] shadow-xs">Pending</span>`
        : `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#16A34A] shadow-xs">Completed</span>`;

      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
          <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.id}</td>
          <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openShippingBillModal('${r.id}')">${r.invoiceNo}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.poNo}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A]">${r.consignee}</td>
          <td class="py-3 px-3 font-mono text-[#0F172A]">${r.shippingBillNo || ''}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">${badgeHtml}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">
            <button 
              type="button" 
              class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
              title="Record Shipping Billing" 
              onclick="SalesView.openShippingBillModal('${r.id}')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderShippingBillTotals(list) {
    const el = document.getElementById('sales-sb-totals');
    if (!el) return;

    const count = list.length;
    const completed = list.filter(x => (x.status || '').toLowerCase() === 'completed').length;
    const pending = count - completed;
    const totalFobInr = list.reduce((sum, r) => sum + (parseFloat(r.sbFobInr) || 0), 0);

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Invoices</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Invoices</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Recorded SB</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${completed} <span class="text-xs font-semibold text-[#006644]">Recorded</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Shipping Bill</div>
          <div class="text-lg font-black text-[#991B1B] mt-0.5">${pending} <span class="text-xs font-semibold text-[#991B1B]">Pending</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total SB FOB Value</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">₹ ${(totalFobInr / 10000000).toFixed(2)} Cr <span class="text-[11px] font-semibold text-[#64748B]">(Customs EDI)</span></div>
        </div>
      </div>
    `;
  },

  filterShippingBill() {
    const year = document.getElementById('sales-sb-year-select')?.value || 'All';
    const exporter = document.getElementById('sales-sb-exporter-select')?.value || 'All';
    const consignee = document.getElementById('sales-sb-consignee-select')?.value || 'ALL';
    const plant = document.getElementById('sales-sb-plant-select')?.value || 'ALL';
    const country = document.getElementById('sales-sb-country-select')?.value || 'All';
    const status = document.getElementById('sales-sb-status-select')?.value || 'All';

    const filtered = this.shippingBillDataset.filter(r => {
      const matchYear = year === 'All' || r.year === year;
      const matchExporter = exporter === 'All' || r.exporter === exporter;
      const matchConsignee = consignee === 'ALL' || r.consignee === consignee;
      const matchPlant = plant === 'ALL' || r.plant === plant || plant === 'ALL';
      const matchCountry = country === 'All' || r.country === country;
      const matchStatus = status === 'All' || r.status === status;
      return matchYear && matchExporter && matchConsignee && matchPlant && matchCountry && matchStatus;
    });

    this.renderShippingBillRows(filtered);
    this.renderShippingBillTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered: Found ${filtered.length} shipping bill records`, 'info');
    }
  },

  searchShippingBill(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.renderShippingBillRows(this.shippingBillDataset);
      this.renderShippingBillTotals(this.shippingBillDataset);
      return;
    }

    const filtered = this.shippingBillDataset.filter(r => {
      return (r.id && r.id.toLowerCase().includes(q)) ||
        (r.invoiceNo && r.invoiceNo.toLowerCase().includes(q)) ||
        (r.poNo && r.poNo.toLowerCase().includes(q)) ||
        (r.consignee && r.consignee.toLowerCase().includes(q)) ||
        (r.shippingBillNo && r.shippingBillNo.toLowerCase().includes(q));
    });

    this.renderShippingBillRows(filtered);
    this.renderShippingBillTotals(filtered);
  },

  loadAllShippingBill() {
    const yearEl = document.getElementById('sales-sb-year-select');
    const exporterEl = document.getElementById('sales-sb-exporter-select');
    const consigneeEl = document.getElementById('sales-sb-consignee-select');
    const plantEl = document.getElementById('sales-sb-plant-select');
    const countryEl = document.getElementById('sales-sb-country-select');
    const statusEl = document.getElementById('sales-sb-status-select');
    const searchEl = document.getElementById('sales-sb-search-input');

    if (yearEl) yearEl.value = '2026-2027';
    if (exporterEl) exporterEl.value = 'DEVI FISHERIES LIMITED';
    if (consigneeEl) consigneeEl.value = 'ALL';
    if (plantEl) plantEl.value = 'ALL';
    if (countryEl) countryEl.value = 'All';
    if (statusEl) statusEl.value = 'Pending';
    if (searchEl) searchEl.value = '';

    this.renderShippingBillRows(this.shippingBillDataset);
    this.renderShippingBillTotals(this.shippingBillDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Loaded all ${this.shippingBillDataset.length} shipping bill records`, 'success');
    }
  },

  toggleMoreSbSearch() {
    const card = document.getElementById('sales-sb-filter-card');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      card.classList.add('ring-2', 'ring-[#006C7A]');
      setTimeout(() => card.classList.remove('ring-2', 'ring-[#006C7A]'), 1200);
    }
  },

  sortShippingBill(key) {
    this.shippingBillDataset.reverse();
    this.renderShippingBillRows(this.shippingBillDataset);
  },

  calculateSbFobInr() {
    const rateEl = document.getElementById('sb-input-rate');
    const fobUsEl = document.getElementById('sb-input-fobus');
    const outEl = document.getElementById('sb-input-fobinr-calc');
    if (!rateEl || !fobUsEl || !outEl) return;

    const rate = parseFloat(rateEl.value) || 0;
    const fobUs = parseFloat(fobUsEl.value) || 0;
    const fobInr = rate * fobUs;
    outEl.value = fobInr.toFixed(2);
  },

  openShippingBillModal(id) {
    const record = this.shippingBillDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert('Modal component is not loaded');
      return;
    }

    const calculatedInr = record.sbFobInr || (parseFloat(record.exchangeRate || 83.85) * parseFloat(record.sbFobUsd || 0)).toFixed(2);

    Modal.open({
      title: 'SHIPPING BILLING',
      size: 'xl',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <!-- Breadcrumb indicator -->
          <div class="text-[11px] font-medium text-[#64748B]">
            Orders &nbsp;&gt;&nbsp; Shipping Bill &nbsp;&gt;&nbsp; <span class="text-[#2563EB] font-semibold">Shipping Billing</span>
          </div>

          <!-- Card 1: Invoice Master Data (Image 3) -->
          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">INVOICE NO <span class="text-[#EF4444]">*</span></label>
                <input type="text" value="${record.invoiceNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">INVOICE DATE</label>
                <input type="text" value="${record.invoiceDate}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">CONSIGNEE</label>
                <input type="text" value="${record.consignee}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PORT OF LOADING</label>
                <input type="text" value="${record.portOfLoading || 'VISAKHAPATNAM'}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PORT OF DISCHARGE</label>
                <input type="text" value="${record.portOfDischarge || 'NEW YORK'}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">COUNTRY OF DESTINATION</label>
                <input type="text" value="${record.countryOfDestination || 'U.S.A.'}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">TOTAL NO.OF CARTONS</label>
                <input type="text" id="sb-input-cartons" value="${record.cartons || ''}" placeholder="Enter Total No.of Cartons" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">NET WT (KGS)</label>
                <input type="text" id="sb-input-netwt" value="${record.netWtKg || ''}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">INVOICE VALUE</label>
                <input type="text" id="sb-input-val" value="${record.invoiceValueUsd ? '$' + Number(record.invoiceValueUsd).toLocaleString() : ''}" placeholder="Enter Invoice Value" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">FREIGHT</label>
                <input type="text" id="sb-input-freight" value="${record.freight || '8200'}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">OTHER DEDUCTIONS $</label>
                <input type="text" id="sb-input-deductions" value="${record.otherDeductionsUsd || '20168.08'}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">FOB INR</label>
                <input type="text" id="sb-input-fobinr" value="${record.fobInr || '0.00'}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
            </div>
          </div>

          <!-- Card 2: Shipping Bill Particulars (Image 3) -->
          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">SHIPPING BILL NO <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="sb-input-sbno" value="${record.shippingBillNo || ''}" placeholder="Enter Shipping Bill No" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">SHIPPING DATE <span class="text-[#EF4444]">*</span></label>
                <input type="date" id="sb-input-shipdate" value="${record.shippingDate || '2026-10-23'}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">LEO DATE <span class="text-[#EF4444]">*</span></label>
                <input type="date" id="sb-input-leodate" value="${record.leoDate || '2026-10-23'}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">EXCHANGE RATE <span class="text-[#EF4444]">*</span></label>
                <input type="number" step="0.01" id="sb-input-rate" value="${record.exchangeRate || '83.85'}" oninput="SalesView.calculateSbFobInr()" placeholder="Enter Exchange Rate" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">SB FOB US $ <span class="text-[#EF4444]">*</span></label>
                <input type="number" step="0.01" id="sb-input-fobus" value="${record.sbFobUsd || '162831.92'}" oninput="SalesView.calculateSbFobInr()" placeholder="Enter SB FOB US$" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">SB FOB INR <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="sb-input-fobinr-calc" value="${calculatedInr}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#0F172A] outline-none">
              </div>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Close',
          type: 'danger',
          onClick: (m) => m.close()
        },
        {
          label: 'Save',
          type: 'primary',
          onClick: (m) => SalesView.saveShippingBill(record.id)
        }
      ]
    });
  },

  saveShippingBill(id) {
    const record = this.shippingBillDataset.find(x => x.id === id);
    if (!record) return;

    const sbNo = document.getElementById('sb-input-sbno')?.value.trim();
    const shipDate = document.getElementById('sb-input-shipdate')?.value;
    const leoDate = document.getElementById('sb-input-leodate')?.value;
    const rate = document.getElementById('sb-input-rate')?.value;
    const fobUs = document.getElementById('sb-input-fobus')?.value;
    const fobInr = document.getElementById('sb-input-fobinr-calc')?.value;

    if (!sbNo) {
      alert('Please enter Shipping Bill Number');
      return;
    }

    record.shippingBillNo = sbNo;
    record.shippingDate = shipDate || record.shippingDate;
    record.leoDate = leoDate || record.leoDate;
    record.exchangeRate = rate || record.exchangeRate;
    record.sbFobUsd = fobUs || record.sbFobUsd;
    record.sbFobInr = fobInr || record.sbFobInr;
    record.status = 'Completed';

    this.renderShippingBillRows(this.shippingBillDataset);
    this.renderShippingBillTotals(this.shippingBillDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Shipping Bill ${sbNo} saved successfully for Invoice ${record.invoiceNo}`, 'success');
    }
  },

    // ==========================================
  // COMMERCIAL INVOICE REGISTER (IMAGE 1 & 2)
  // ==========================================
  commercialInvoiceDataset: [
    {
      sNo: 1,
      id: '6131',
      piNumber: 'DFL/PI/062/26-27',
      invoiceNo: 'DFL/JPT/2627/309',
      invoiceDate: '18-09-2026',
      poNo: '1102650475',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      consignee: 'C.P. FOOD PRODUCTS, INC.',
      address: '10320 LITTLE PATUXENT PKWY SUITE 1188COLUMBIA, MD 21044 USA',
      paymentTerms: 'PAY IN 5 DAYS AFTER GOODS RECEIVING DATE - Non LC',
      shipmentTerms: 'DDP',
      shipmentTermsExt: '',
      discount: '0.00',
      freight: '8200',
      exRate: '95.10',
      bankDetails: 'SBI COMMERCIAL, RAM NAGAR - STATE BANK OF INDIA',
      showBank: 'Yes',
      showBlNo: 'Yes',
      showBlDate: 'Yes',
      dataLogger: 'SENSITECH-88214',
      placedAt: 'Door Left Top',
      issuedBy: 'DEVI FISHERIES LTD',
      showShippingDetails: 'Yes',
      specialNotesCommercial: 'Export of Frozen Farmed Vannamei White Shrimp to USA. Quality conforming to USFDA regulations.',
      specialNotesPacking: 'Packed in master corrugated cartons with poly-liner and dry-ice pack.',
      productDescription: 'FROZEN COOKED VANNAMEI WHITE PEELED AND DEVEINED TAIL OFF IQF (LITOPENAEUS VANNAMEI)',
      specs: 'NET WT WITHOUT GLAZE',
      packing: '14 X 24 OZ',
      grade: '100/150',
      cartons: 1680,
      codes: 'LOT-26/901',
      productionDate: '2026-09-18',
      bestBeforeDate: '2028-09-17',
      country: 'USA',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      totalValueUsd: 178000,
      status: 'Pending'
    },
    {
      sNo: 2,
      id: '7050',
      piNumber: 'DFL/PI/968/26-27',
      invoiceNo: 'DFL/JPT/2627/308',
      invoiceDate: '18-09-2026',
      poNo: 'DF/DF-5611',
      buyer: 'DEVI FISHERIES INC.',
      consignee: 'DEVI FISHERIES INC.',
      address: '1820 WATERFORD PARKWAY, EDISON, NJ 08817 USA',
      paymentTerms: 'CAD 60 DAYS FROM ONBOARD DATE',
      shipmentTerms: 'CIF',
      shipmentTermsExt: 'NEW YORK PORT',
      discount: '0.00',
      freight: '8500',
      exRate: '95.10',
      bankDetails: 'SBI COMMERCIAL, RAM NAGAR - STATE BANK OF INDIA',
      showBank: 'Yes',
      showBlNo: 'Yes',
      showBlDate: 'Yes',
      dataLogger: 'SENSITECH-88215',
      placedAt: 'Door Center',
      issuedBy: 'DEVI FISHERIES LTD',
      showShippingDetails: 'Yes',
      specialNotesCommercial: 'Freshly harvest shrimp processed at BRC-grade facility.',
      specialNotesPacking: 'Cartons marked DFL Brand standard labels.',
      productDescription: 'FROZEN RAW EASY PEEL VANNAMEI WHITE SHRIMP IQF',
      specs: 'CHEMICAL FREE RAW P&D',
      packing: '10 X 2 LB',
      grade: '16/20',
      cartons: 1800,
      codes: 'LOT-26/902',
      productionDate: '2026-09-18',
      bestBeforeDate: '2028-09-17',
      country: 'USA',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      totalValueUsd: 193400,
      status: 'Pending'
    },
    {
      sNo: 3,
      id: '7051',
      piNumber: 'DFL/PI/969/26-27',
      invoiceNo: 'DFL/JPT/2627/307',
      invoiceDate: '18-09-2026',
      poNo: 'DF/DF-5612',
      buyer: 'DEVI FISHERIES INC.',
      consignee: 'DEVI FISHERIES INC.',
      address: '1820 WATERFORD PARKWAY, EDISON, NJ 08817 USA',
      paymentTerms: 'CAD 60 DAYS FROM ONBOARD DATE',
      shipmentTerms: 'CIF',
      shipmentTermsExt: 'BALTIMORE PORT',
      discount: '0.00',
      freight: '17000',
      exRate: '95.10',
      bankDetails: 'SBI COMMERCIAL, RAM NAGAR - STATE BANK OF INDIA',
      showBank: 'Yes',
      showBlNo: 'Yes',
      showBlDate: 'Yes',
      dataLogger: 'SENSITECH-88216',
      placedAt: 'Door Right Top',
      issuedBy: 'DEVI FISHERIES LTD',
      showShippingDetails: 'Yes',
      specialNotesCommercial: 'Direct shipment with temperature logger recording -20C throughout transit.',
      specialNotesPacking: 'Export quality 5-ply cartons.',
      productDescription: 'FROZEN RAW HEADLESS SHELL ON (HLSO) VANNAMEI SHRIMP BLOCK',
      specs: 'REGULAR PACKING WITH 20% GLAZE',
      packing: '6 X 1.8 KG',
      grade: '21/25',
      cartons: 3600,
      codes: 'LOT-26/903',
      productionDate: '2026-09-18',
      bestBeforeDate: '2028-09-17',
      country: 'USA',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      totalValueUsd: 379000,
      status: 'Pending'
    },
    {
      sNo: 4,
      id: '7196',
      piNumber: 'DFL/PI/1109/26-27',
      invoiceNo: 'DFL/SNM/2627/145',
      invoiceDate: '18-09-2026',
      poNo: 'DF 1580',
      buyer: 'MARK FOODS LLC',
      consignee: 'MARK FOODS LLC',
      address: '1440 BROADWAY, 23RD FLOOR, NEW YORK, NY 10018 USA',
      paymentTerms: 'LC 90 DAYS SIGHT',
      shipmentTerms: 'CFR',
      shipmentTermsExt: 'NEW YORK',
      discount: '0.00',
      freight: '7500',
      exRate: '95.10',
      bankDetails: 'SBI COMMERCIAL, RAM NAGAR - STATE BANK OF INDIA',
      showBank: 'Yes',
      showBlNo: 'Yes',
      showBlDate: 'Yes',
      dataLogger: 'SENSITECH-88217',
      placedAt: 'Door Center',
      issuedBy: 'DEVI FISHERIES LTD',
      showShippingDetails: 'Yes',
      specialNotesCommercial: 'Premium restaurant quality peeled tail-on.',
      specialNotesPacking: 'Standard Mark Foods buyer specified cartons.',
      productDescription: 'FROZEN COOKED TAIL-ON VANNAMEI WHITE SHRIMP IQF',
      specs: '100% NET WEIGHT GLAZE PROTECTED',
      packing: '10 X 2 LB',
      grade: '26/30',
      cartons: 1750,
      codes: 'LOT-26/904',
      productionDate: '2026-09-18',
      bestBeforeDate: '2028-09-17',
      country: 'USA',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      totalValueUsd: 186500,
      status: 'Pending'
    },
    {
      sNo: 5,
      id: '7073',
      piNumber: 'DFL/PI/990/26-27',
      invoiceNo: 'DFL/SNM/2627/144',
      invoiceDate: '18-09-2026',
      poNo: 'DF1569',
      buyer: 'MARK FOODS LLC',
      consignee: 'MARK FOODS LLC',
      address: '1440 BROADWAY, 23RD FLOOR, NEW YORK, NY 10018 USA',
      paymentTerms: 'LC 90 DAYS SIGHT',
      shipmentTerms: 'CFR',
      shipmentTermsExt: 'NEW YORK',
      discount: '0.00',
      freight: '7500',
      exRate: '95.10',
      bankDetails: 'SBI COMMERCIAL, RAM NAGAR - STATE BANK OF INDIA',
      showBank: 'Yes',
      showBlNo: 'Yes',
      showBlDate: 'Yes',
      dataLogger: 'SENSITECH-88218',
      placedAt: 'Door Left Top',
      issuedBy: 'DEVI FISHERIES LTD',
      showShippingDetails: 'Yes',
      specialNotesCommercial: 'Export of Frozen Farmed Shrimp.',
      specialNotesPacking: 'Strapped and shrink-wrapped pallets.',
      productDescription: 'FROZEN RAW PEELED & UNDEVEINED (PUD) SHRIMP',
      specs: '100% NATURAL NO PHOSPHATE ADDED',
      packing: '5 X 2 KG',
      grade: '31/40',
      cartons: 1800,
      codes: 'LOT-26/905',
      productionDate: '2026-09-18',
      bestBeforeDate: '2028-09-17',
      country: 'USA',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      totalValueUsd: 179200,
      status: 'Pending'
    },
    {
      sNo: 6,
      id: '7183',
      piNumber: 'DFL/PI/1096/26-27',
      invoiceNo: 'DFL/SNM/2627/143',
      invoiceDate: '18-09-2026',
      poNo: 'C10894',
      buyer: 'SEA PORT PRODUCTS CORPORATION',
      consignee: 'SEA PORT PRODUCTS CORPORATION',
      address: '100 RUE DE LA PAIX, SUITE 400, PARIS, FRANCE',
      paymentTerms: 'DP AT SIGHT',
      shipmentTerms: 'CIF',
      shipmentTermsExt: 'LE HAVRE',
      discount: '0.00',
      freight: '8800',
      exRate: '95.10',
      bankDetails: 'SBI COMMERCIAL, RAM NAGAR - STATE BANK OF INDIA',
      showBank: 'Yes',
      showBlNo: 'Yes',
      showBlDate: 'Yes',
      dataLogger: 'SENSITECH-88219',
      placedAt: 'Door Center',
      issuedBy: 'DEVI FISHERIES LTD',
      showShippingDetails: 'Yes',
      specialNotesCommercial: 'Conforming to EU microbiological standards.',
      specialNotesPacking: 'Multilingual French/English carton print.',
      productDescription: 'FROZEN RAW HLSO VANNAMEI SHRIMP IQF',
      specs: 'ASC CERTIFIED RESPONSIBLE AQUACULTURE',
      packing: '10 X 1 KG',
      grade: '41/50',
      cartons: 1800,
      codes: 'LOT-26/906',
      productionDate: '2026-09-18',
      bestBeforeDate: '2028-09-17',
      country: 'FRANCE',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      totalValueUsd: 182400,
      status: 'Pending'
    },
    {
      sNo: 7,
      id: '7052',
      piNumber: 'DFL/PI/970/26-27',
      invoiceNo: 'DFL/SNM/2627/142',
      invoiceDate: '18-09-2026',
      poNo: 'DF/DF-5621',
      buyer: 'DEVI FISHERIES INC.',
      consignee: 'DEVI FISHERIES INC.',
      address: '1820 WATERFORD PARKWAY, EDISON, NJ 08817 USA',
      paymentTerms: 'CAD 60 DAYS FROM ONBOARD DATE',
      shipmentTerms: 'DDP',
      shipmentTermsExt: 'LOS ANGELES PORT',
      discount: '0.00',
      freight: '9200',
      exRate: '95.10',
      bankDetails: 'SBI COMMERCIAL, RAM NAGAR - STATE BANK OF INDIA',
      showBank: 'Yes',
      showBlNo: 'Yes',
      showBlDate: 'Yes',
      dataLogger: 'SENSITECH-88220',
      placedAt: 'Door Left Top',
      issuedBy: 'DEVI FISHERIES LTD',
      showShippingDetails: 'Yes',
      specialNotesCommercial: 'Export of Frozen Cooked Peeled Tail-On.',
      specialNotesPacking: 'Corrugated cartons, cold chain certified.',
      productDescription: 'FROZEN COOKED TAIL-ON VANNAMEI WHITE SHRIMP IQF',
      specs: 'SALT 1.2% MAX, READY TO EAT',
      packing: '10 X 2 LB',
      grade: '31/40',
      cartons: 1800,
      codes: 'LOT-26/907',
      productionDate: '2026-09-18',
      bestBeforeDate: '2028-09-17',
      country: 'USA',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      totalValueUsd: 191500,
      status: 'Pending'
    },
    {
      sNo: 8,
      id: '7053',
      piNumber: 'DFL/PI/971/26-27',
      invoiceNo: 'DFL/SNM/2627/141',
      invoiceDate: '17-09-2026',
      poNo: 'DF/DF-5622',
      buyer: 'DEVI FISHERIES INC.',
      consignee: 'DEVI FISHERIES INC.',
      address: '1820 WATERFORD PARKWAY, EDISON, NJ 08817 USA',
      paymentTerms: 'CAD 60 DAYS FROM ONBOARD DATE',
      shipmentTerms: 'DDP',
      shipmentTermsExt: 'LOS ANGELES PORT',
      discount: '0.00',
      freight: '9200',
      exRate: '95.10',
      bankDetails: 'SBI COMMERCIAL, RAM NAGAR - STATE BANK OF INDIA',
      showBank: 'Yes',
      showBlNo: 'Yes',
      showBlDate: 'Yes',
      dataLogger: 'SENSITECH-88221',
      placedAt: 'Door Center',
      issuedBy: 'DEVI FISHERIES LTD',
      showShippingDetails: 'Yes',
      specialNotesCommercial: 'Export of Frozen Farmed Raw HLSO Shrimp.',
      specialNotesPacking: 'Standard Devi Fisheries master cartons.',
      productDescription: 'FROZEN RAW HLSO VANNAMEI WHITE SHRIMP BLOCK',
      specs: 'UNIFORM COLOR, COUNT AND GLAZE',
      packing: '6 X 1.8 KG',
      grade: '16/20',
      cartons: 1800,
      codes: 'LOT-26/908',
      productionDate: '2026-09-17',
      bestBeforeDate: '2028-09-16',
      country: 'USA',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      totalValueUsd: 194000,
      status: 'Pending'
    }
  ],

  renderCommercialInvoice(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#172B4D]">
        <!-- 1. Page Title Header (Image 1) -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">COMMERCIAL INVOICE</h1>
        </div>

        <!-- 2. Top Filter Card (Base Design System with AquaPulse Colors, Image 1) -->
        <div id="sales-ci-filter-card" class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT YEAR</label>
              <select id="sales-ci-year-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT EXPORTER :</label>
              <select id="sales-ci-exporter-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT CONSIGNEE :</label>
              <select id="sales-ci-consignee-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="DEVI FISHERIES INC.">DEVI FISHERIES INC.</option>
                <option value="MARK FOODS LLC">MARK FOODS LLC</option>
                <option value="SEA PORT PRODUCTS CORPORATION">SEA PORT PRODUCTS CORPORATION</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT COUNTRY:</label>
              <select id="sales-ci-country-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="USA">U.S.A.</option>
                <option value="FRANCE">FRANCE</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">INVOICE STATUS :</label>
              <select id="sales-ci-status-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="Pending" selected>Pending</option>
                <option value="Completed">Completed</option>
                <option value="All">All</option>
              </select>
            </div>

            <div>
              <button id="btn-ci-search" class="px-6 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterCommercialInvoices()">
                <span>Search</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 3. Table Card (Image 1) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-ci-search-input" 
                placeholder="Search..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchCommercialInvoices(this.value)"
              />
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.toggleMoreCiSearch()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.loadAllCommercialInvoices()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortCommercialInvoices('sNo')">
                    <span class="inline-flex items-center gap-1">SNO <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">P.Invoice NO</th>
                  <th class="py-3 px-3">Invoice NO</th>
                  <th class="py-3 px-3">Invoice Date</th>
                  <th class="py-3 px-3">Po NO</th>
                  <th class="py-3 px-3">Buyer</th>
                  <th class="py-3 px-3 text-center">Status</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-ci-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Totals Card -->
          <div id="sales-ci-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderCommercialInvoiceRows(this.commercialInvoiceDataset);
    this.renderCommercialInvoiceTotals(this.commercialInvoiceDataset);
  },

  renderCommercialInvoiceRows(list) {
    const tbody = document.getElementById('sales-ci-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="py-8 text-center text-[#64748B] text-xs">
            No commercial invoices found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => {
      const isPending = (r.status || '').toLowerCase() === 'pending';
      const badgeHtml = isPending
        ? `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#EF4444] shadow-xs">Pending</span>`
        : `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#16A34A] shadow-xs">Completed</span>`;

      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
          <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.id}</td>
          <td class="py-3 px-3 text-[#64748B]">${r.piNumber}</td>
          <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openCommercialInvoiceModal('${r.id}')">${r.invoiceNo}</td>
          <td class="py-3 px-3 text-[#0F172A] whitespace-nowrap">${r.invoiceDate}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.poNo}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A]">${r.buyer}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">${badgeHtml}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">
            <button 
              type="button" 
              class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
              title="Generate Commercial Invoice" 
              onclick="SalesView.openCommercialInvoiceModal('${r.id}')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderCommercialInvoiceTotals(list) {
    const el = document.getElementById('sales-ci-totals');
    if (!el) return;

    const count = list.length;
    const completed = list.filter(x => (x.status || '').toLowerCase() === 'completed').length;
    const pending = count - completed;
    const totalUsd = list.reduce((sum, r) => sum + (parseFloat(r.totalValueUsd) || 180000), 0);
    const totalCtns = list.reduce((sum, r) => sum + (parseInt(r.cartons) || 1800), 0);

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Invoices</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Invoices</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Finalized</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${completed} <span class="text-xs font-semibold text-[#006644]">Generated</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Settlement</div>
          <div class="text-lg font-black text-[#991B1B] mt-0.5">${pending} <span class="text-xs font-semibold text-[#991B1B]">Pending</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Commercial Value</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">$${totalUsd.toLocaleString()} <span class="text-[11px] font-semibold text-[#64748B]">(${totalCtns.toLocaleString()} Ctns)</span></div>
        </div>
      </div>
    `;
  },

  filterCommercialInvoices() {
    const year = document.getElementById('sales-ci-year-select')?.value || 'All';
    const exporter = document.getElementById('sales-ci-exporter-select')?.value || 'All';
    const consignee = document.getElementById('sales-ci-consignee-select')?.value || 'All';
    const country = document.getElementById('sales-ci-country-select')?.value || 'All';
    const status = document.getElementById('sales-ci-status-select')?.value || 'All';

    const filtered = this.commercialInvoiceDataset.filter(r => {
      const matchYear = year === 'All' || r.year === year;
      const matchExporter = exporter === 'All' || r.exporter === exporter;
      const matchConsignee = consignee === 'All' || r.buyer === consignee;
      const matchCountry = country === 'All' || r.country === country;
      const matchStatus = status === 'All' || r.status === status;
      return matchYear && matchExporter && matchConsignee && matchCountry && matchStatus;
    });

    this.renderCommercialInvoiceRows(filtered);
    this.renderCommercialInvoiceTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered: Found ${filtered.length} commercial invoice records`, 'info');
    }
  },

  searchCommercialInvoices(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.renderCommercialInvoiceRows(this.commercialInvoiceDataset);
      this.renderCommercialInvoiceTotals(this.commercialInvoiceDataset);
      return;
    }

    const filtered = this.commercialInvoiceDataset.filter(r => {
      return (r.id && r.id.toLowerCase().includes(q)) ||
        (r.piNumber && r.piNumber.toLowerCase().includes(q)) ||
        (r.invoiceNo && r.invoiceNo.toLowerCase().includes(q)) ||
        (r.poNo && r.poNo.toLowerCase().includes(q)) ||
        (r.buyer && r.buyer.toLowerCase().includes(q));
    });

    this.renderCommercialInvoiceRows(filtered);
    this.renderCommercialInvoiceTotals(filtered);
  },

  loadAllCommercialInvoices() {
    const yearEl = document.getElementById('sales-ci-year-select');
    const exporterEl = document.getElementById('sales-ci-exporter-select');
    const consigneeEl = document.getElementById('sales-ci-consignee-select');
    const countryEl = document.getElementById('sales-ci-country-select');
    const statusEl = document.getElementById('sales-ci-status-select');
    const searchEl = document.getElementById('sales-ci-search-input');

    if (yearEl) yearEl.value = '2026-2027';
    if (exporterEl) exporterEl.value = 'DEVI FISHERIES LIMITED';
    if (consigneeEl) consigneeEl.value = 'All';
    if (countryEl) countryEl.value = 'All';
    if (statusEl) statusEl.value = 'Pending';
    if (searchEl) searchEl.value = '';

    this.renderCommercialInvoiceRows(this.commercialInvoiceDataset);
    this.renderCommercialInvoiceTotals(this.commercialInvoiceDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Loaded all ${this.commercialInvoiceDataset.length} commercial invoice records`, 'success');
    }
  },

  toggleMoreCiSearch() {
    const card = document.getElementById('sales-ci-filter-card');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      card.classList.add('ring-2', 'ring-[#006C7A]');
      setTimeout(() => card.classList.remove('ring-2', 'ring-[#006C7A]'), 1200);
    }
  },

  sortCommercialInvoices(key) {
    this.commercialInvoiceDataset.reverse();
    this.renderCommercialInvoiceRows(this.commercialInvoiceDataset);
  },

  openCommercialInvoiceModal(id) {
    const record = this.commercialInvoiceDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert('Modal component is not loaded');
      return;
    }

    Modal.open({
      title: 'COMMERCIAL INVOICE',
      size: 'xl',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <!-- Breadcrumb indicator (Image 2) -->
          <div class="text-[11px] font-medium text-[#64748B]">
            Orders &nbsp;&gt;&nbsp; Commercial Invoice &nbsp;&gt;&nbsp; <span class="text-[#2563EB] font-semibold">Commercial Invoice</span>
          </div>

          <!-- Card 1: Header / Settlement Information (Image 2) -->
          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Custom Invoice</label>
                <input type="text" value="${record.invoiceNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PO No</label>
                <input type="text" value="${record.poNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Consignee</label>
                <input type="text" value="${record.consignee}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Address</label>
                <input type="text" value="${record.address}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none" title="${record.address}">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Payment Terms <span class="text-[#EF4444]">*</span></label>
                <select id="ci-input-payment-terms" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="PAY IN 5 DAYS AFTER GOODS RECEIVING DATE - Non LC" selected>PAY IN 5 DAYS AFTER GOODS RECEIVING DATE - Non LC</option>
                  <option value="CAD 60 DAYS FROM ONBOARD DATE">CAD 60 DAYS FROM ONBOARD DATE</option>
                  <option value="LC 90 DAYS SIGHT">LC 90 DAYS SIGHT</option>
                  <option value="DP AT SIGHT">DP AT SIGHT</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Shipment Terms <span class="text-[#EF4444]">*</span></label>
                <select id="ci-input-shipment-terms" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="DDP" ${record.shipmentTerms === 'DDP' ? 'selected' : ''}>DDP</option>
                  <option value="CIF" ${record.shipmentTerms === 'CIF' ? 'selected' : ''}>CIF</option>
                  <option value="FOB" ${record.shipmentTerms === 'FOB' ? 'selected' : ''}>FOB</option>
                  <option value="CFR" ${record.shipmentTerms === 'CFR' ? 'selected' : ''}>CFR</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Shipment Terms Ext</label>
                <input type="text" id="ci-input-shipment-ext" value="${record.shipmentTermsExt || ''}" placeholder="Enter ShippingTerm Ext" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Discount</label>
                <input type="text" id="ci-input-discount" value="${record.discount || '0.00'}" placeholder="Enter Discount" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Freight <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="ci-input-freight" value="${record.freight || '8200'}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">ExRate <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="ci-input-exrate" value="${record.exRate || '95.10'}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Bank Details</label>
                <select id="ci-input-bank-details" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="SBI COMMERCIAL, RAM NAGAR - STATE BANK OF INDIA" selected>SBI COMMERCIAL, RAM NAGAR - STATE BANK OF INDI...</option>
                  <option value="HDFC BANK - VISAKHAPATNAM SPECIAL BRANCH">HDFC BANK - VISAKHAPATNAM SPECIAL BRANCH</option>
                  <option value="ICICI BANK - SEAFOOD EXPORT HUB">ICICI BANK - SEAFOOD EXPORT HUB</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Show Bank <span class="text-[#EF4444]">*</span></label>
                <select id="ci-input-show-bank" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Yes" selected>Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Show BL No <span class="text-[#EF4444]">*</span></label>
                <select id="ci-input-show-blno" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Yes" selected>Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Show BL Date <span class="text-[#EF4444]">*</span></label>
                <select id="ci-input-show-bldate" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Yes" selected>Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Data Logger</label>
                <input type="text" id="ci-input-datalogger" value="${record.dataLogger || ''}" placeholder="Enter Data Logger Details" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Placed AT</label>
                <input type="text" id="ci-input-placedat" value="${record.placedAt || ''}" placeholder="Enter Data Logger Positions" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Issued By</label>
                <input type="text" id="ci-input-issuedby" value="${record.issuedBy || 'DEVI FISHERIES LTD'}" placeholder="Enter Issued By" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Show Shipping Details <span class="text-[#EF4444]">*</span></label>
                <select id="ci-input-show-shipping" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Yes" selected>Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Special Notes(Commercial Description)</label>
              <textarea id="ci-input-notes-comm" rows="2" placeholder="Enter Special Notes" class="w-full p-2 rounded-lg border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">${record.specialNotesCommercial || ''}</textarea>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Special Notes(Packing List Description)</label>
              <textarea id="ci-input-notes-pack" rows="2" placeholder="Enter Remarks" class="w-full p-2 rounded-lg border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">${record.specialNotesPacking || ''}</textarea>
            </div>
          </div>

          <!-- Card 2: Items Table / Commercial Specification (Image 2) -->
          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3 shadow-2xs">
            <div class="flex items-center justify-between pb-1">
              <span class="text-xs font-bold uppercase tracking-wider text-[#0F172A]">Commercial Invoice Line Items</span>
            </div>

            <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                    <th class="py-2.5 px-3">Product Description</th>
                    <th class="py-2.5 px-3">Specs</th>
                    <th class="py-2.5 px-3">Packing</th>
                    <th class="py-2.5 px-3">Grade</th>
                    <th class="py-2.5 px-3">Cartons</th>
                    <th class="py-2.5 px-3">Codes</th>
                    <th class="py-2.5 px-3">ProductionDate</th>
                    <th class="py-2.5 px-3">Best Before Date</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#F1F5F9]">
                  <tr class="hover:bg-[#F8FAFC] transition-colors">
                    <td class="py-2.5 px-3 min-w-[220px]">
                      <textarea id="ci-input-proddesc" rows="2" class="w-full p-1.5 rounded border border-[#CBD5E1] bg-[#F8FAFC] font-semibold text-[11px] text-[#0F172A] outline-none">${record.productDescription}</textarea>
                    </td>
                    <td class="py-2.5 px-3 min-w-[120px]">
                      <textarea id="ci-input-specs" rows="2" class="w-full p-1.5 rounded border border-[#CBD5E1] bg-white font-medium text-[11px] text-[#0F172A] outline-none focus:border-[#006C7A]">${record.specs}</textarea>
                    </td>
                    <td class="py-2.5 px-3 font-semibold text-[#0F172A] whitespace-nowrap">${record.packing}</td>
                    <td class="py-2.5 px-3 font-semibold text-[#0F172A] whitespace-nowrap">${record.grade}</td>
                    <td class="py-2.5 px-3 font-bold text-[#0F172A]">${record.cartons}</td>
                    <td class="py-2.5 px-3 min-w-[110px]">
                      <input type="text" id="ci-input-codes" value="${record.codes}" placeholder="Enter Codes" class="w-full h-8 px-2 rounded border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                    </td>
                    <td class="py-2.5 px-3 min-w-[130px]">
                      <input type="date" id="ci-input-proddate" value="${record.productionDate}" class="w-full h-8 px-2 rounded border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                    </td>
                    <td class="py-2.5 px-3 min-w-[130px]">
                      <input type="date" id="ci-input-bbdate" value="${record.bestBeforeDate}" class="w-full h-8 px-2 rounded border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Close',
          type: 'danger',
          onClick: (m) => m.close()
        },
        {
          label: 'Save',
          type: 'primary',
          onClick: (m) => SalesView.saveCommercialInvoice(record.id)
        }
      ]
    });
  },

  saveCommercialInvoice(id) {
    const record = this.commercialInvoiceDataset.find(x => x.id === id);
    if (!record) return;

    const paymentTerms = document.getElementById('ci-input-payment-terms')?.value;
    const shipmentTerms = document.getElementById('ci-input-shipment-terms')?.value;
    const freight = document.getElementById('ci-input-freight')?.value;
    const exRate = document.getElementById('ci-input-exrate')?.value;
    const bankDetails = document.getElementById('ci-input-bank-details')?.value;
    const codes = document.getElementById('ci-input-codes')?.value;

    record.paymentTerms = paymentTerms || record.paymentTerms;
    record.shipmentTerms = shipmentTerms || record.shipmentTerms;
    record.freight = freight || record.freight;
    record.exRate = exRate || record.exRate;
    record.bankDetails = bankDetails || record.bankDetails;
    record.codes = codes || record.codes;
    record.status = 'Completed';

    this.renderCommercialInvoiceRows(this.commercialInvoiceDataset);
    this.renderCommercialInvoiceTotals(this.commercialInvoiceDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Commercial Invoice finalized for ${record.invoiceNo}`, 'success');
    }
  },

    // ==========================================
  // 1. ETA / ETD STATUS REGISTER (IMAGE 1)
  // ==========================================
  etaDataset: [
    {
      sNo: 1,
      id: '6131',
      invoiceNo: 'DFL/JPT/2627/309',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      poNo: '1102650475',
      product: 'COOKED VANNAMEI SHRIMP',
      brand: 'CP SELECT',
      mcs: '1680',
      blNo: 'MEDUAPX2609918',
      containerNo: 'MSCU7397679',
      finalDestination: 'LOS ANGELES, CA',
      onBoardDate: '18-09-2026',
      actualEta: '24-10-2026',
      etaFd: '26-10-2026',
      gateOutDate: '27-10-2026',
      entryNumber: 'CBP-8841029',
      liner: 'MSC',
      deliveryTerms: 'DDP',
      transitDays: '36',
      transitDaysPerLiner: '36',
      isFda: 'Yes',
      plant: 'JPT',
      exporter: 'DEVI FISHERIES LIMITED',
      consignee: 'C.P. FOOD PRODUCTS, INC.'
    },
    {
      sNo: 2,
      id: '7050',
      invoiceNo: 'DFL/JPT/2627/308',
      buyer: 'DEVI FISHERIES INC.',
      poNo: 'DF/DF-5611',
      product: 'RAW EASY PEEL SHRIMP',
      brand: 'DEVI FEAST',
      mcs: '1800',
      blNo: 'MAEU9821034',
      containerNo: 'MSKU4109823',
      finalDestination: 'BALTIMORE, MD',
      onBoardDate: '18-09-2026',
      actualEta: '26-10-2026',
      etaFd: '28-10-2026',
      gateOutDate: '29-10-2026',
      entryNumber: 'CBP-8841030',
      liner: 'Maersk Line',
      deliveryTerms: 'CIF',
      transitDays: '38',
      transitDaysPerLiner: '38',
      isFda: 'Yes',
      plant: 'JPT',
      exporter: 'DEVI FISHERIES LIMITED',
      consignee: 'DEVI FISHERIES INC.'
    },
    {
      sNo: 3,
      id: '7051',
      invoiceNo: 'DFL/JPT/2627/307',
      buyer: 'DEVI FISHERIES INC.',
      poNo: 'DF/DF-5612',
      product: 'RAW HLSO SHRIMP BLOCK',
      brand: 'DEVI GOLD',
      mcs: '3600',
      blNo: 'HLCU9920145',
      containerNo: 'HLCU8821945',
      finalDestination: 'BALTIMORE, MD',
      onBoardDate: '18-09-2026',
      actualEta: '28-10-2026',
      etaFd: '30-10-2026',
      gateOutDate: '31-10-2026',
      entryNumber: 'CBP-8841031',
      liner: 'Hapag-Lloyd',
      deliveryTerms: 'CIF',
      transitDays: '40',
      transitDaysPerLiner: '40',
      isFda: 'Yes',
      plant: 'JPT',
      exporter: 'DEVI FISHERIES LIMITED',
      consignee: 'DEVI FISHERIES INC.'
    },
    {
      sNo: 4,
      id: '7196',
      invoiceNo: 'DFL/SNM/2627/145',
      buyer: 'MARK FOODS LLC',
      poNo: 'DF 1580',
      product: 'COOKED TAIL-ON SHRIMP IQF',
      brand: 'MARK SELECT',
      mcs: '1750',
      blNo: 'CMAU7710294',
      containerNo: 'CMAU9102482',
      finalDestination: 'NEW YORK, NY',
      onBoardDate: '18-09-2026',
      actualEta: '25-10-2026',
      etaFd: '27-10-2026',
      gateOutDate: '28-10-2026',
      entryNumber: 'CBP-8841032',
      liner: 'CMA CGM',
      deliveryTerms: 'CFR',
      transitDays: '37',
      transitDaysPerLiner: '37',
      isFda: 'Yes',
      plant: 'SNM',
      exporter: 'DEVI FISHERIES LIMITED',
      consignee: 'MARK FOODS LLC'
    },
    {
      sNo: 5,
      id: '7073',
      invoiceNo: 'DFL/SNM/2627/144',
      buyer: 'MARK FOODS LLC',
      poNo: 'DF1569',
      product: 'RAW PUD SHRIMP',
      brand: 'MARK SELECT',
      mcs: '1800',
      blNo: 'MEDUAPX2609920',
      containerNo: 'MSCU8810294',
      finalDestination: 'NEW YORK, NY',
      onBoardDate: '18-09-2026',
      actualEta: '27-10-2026',
      etaFd: '29-10-2026',
      gateOutDate: '30-10-2026',
      entryNumber: 'CBP-8841033',
      liner: 'MSC',
      deliveryTerms: 'CFR',
      transitDays: '39',
      transitDaysPerLiner: '39',
      isFda: 'Yes',
      plant: 'SNM',
      exporter: 'DEVI FISHERIES LIMITED',
      consignee: 'MARK FOODS LLC'
    },
    {
      sNo: 6,
      id: '7183',
      invoiceNo: 'DFL/SNM/2627/143',
      buyer: 'SEA PORT PRODUCTS CORPORATION',
      poNo: 'C10894',
      product: 'RAW HLSO VANNAMEI SHRIMP',
      brand: 'SEA PORT BLUE',
      mcs: '1800',
      blNo: 'ONEY9920144',
      containerNo: 'ONEY4410928',
      finalDestination: 'LE HAVRE, FRANCE',
      onBoardDate: '18-09-2026',
      actualEta: '22-10-2026',
      etaFd: '24-10-2026',
      gateOutDate: '25-10-2026',
      entryNumber: 'FR-CBP-110294',
      liner: 'ONE Line',
      deliveryTerms: 'CIF',
      transitDays: '34',
      transitDaysPerLiner: '34',
      isFda: 'No (EU Compliant)',
      plant: 'SNM',
      exporter: 'DEVI FISHERIES LIMITED',
      consignee: 'SEA PORT PRODUCTS CORPORATION'
    }
  ],

  renderEtaStatus(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#172B4D]">
        <!-- 1. Page Title Header (Image 1) -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">ETA/ETD STATUS</h1>
        </div>

        <!-- 2. Top Filter Card (Base Design System, Image 1) -->
        <div id="sales-eta-filter-card" class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Exporter:</label>
              <select id="sales-eta-exporter-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Plant</label>
              <select id="sales-eta-plant-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="VSP">VSP</option>
                <option value="JPT">JPT</option>
                <option value="KKD">KKD</option>
                <option value="SNM">SNM</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Liner</label>
              <select id="sales-eta-liner-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="MSC">MSC</option>
                <option value="Maersk Line">Maersk Line</option>
                <option value="Hapag-Lloyd">Hapag-Lloyd</option>
                <option value="CMA CGM">CMA CGM</option>
                <option value="ONE Line">ONE Line</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Consignee</label>
              <select id="sales-eta-consignee-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="DEVI FISHERIES INC.">DEVI FISHERIES INC.</option>
                <option value="MARK FOODS LLC">MARK FOODS LLC</option>
                <option value="SEA PORT PRODUCTS CORPORATION">SEA PORT PRODUCTS CORPORATION</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">ETA From Date (Discharge)</label>
              <input type="date" id="sales-eta-from-date" value="2026-05-23" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">ETA To Date (Discharge)</label>
              <input type="date" id="sales-eta-to-date" value="2026-10-31" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
            </div>

            <div>
              <button id="btn-eta-search" class="px-6 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterEtaStatus()">
                <span>Search</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 3. Table Card (Image 1) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-eta-search-input" 
                placeholder="Search..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchEtaStatus(this.value)"
              />
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3.5 py-1.5 border border-[#16A34A] text-[#16A34A] hover:bg-[#F0FDF4] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.downloadEtaExcel()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                <span>Download Excel</span>
              </button>
            </div>
          </div>

          <!-- Table Container (Horizontal Scrolling for Complete Manifest Details) -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-3">S.No</th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">Inv No</th>
                  <th class="py-3 px-3">Buyer</th>
                  <th class="py-3 px-3">PO.NO</th>
                  <th class="py-3 px-3">PRODUCT</th>
                  <th class="py-3 px-3">BRAND</th>
                  <th class="py-3 px-3">Mcs</th>
                  <th class="py-3 px-3">BL No</th>
                  <th class="py-3 px-3">Container No</th>
                  <th class="py-3 px-3">Final Destination</th>
                  <th class="py-3 px-3">On Board Date</th>
                  <th class="py-3 px-3">ActualETA</th>
                  <th class="py-3 px-3">ETA FD</th>
                  <th class="py-3 px-3">Gate Out Date</th>
                  <th class="py-3 px-3">Entry Number</th>
                  <th class="py-3 px-3">Liner</th>
                  <th class="py-3 px-3">Delivery Terms</th>
                  <th class="py-3 px-3 text-center">Transit Days</th>
                  <th class="py-3 px-3 text-center">Transit Days Per Liner</th>
                  <th class="py-3 px-3 text-center">Is FDA</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-eta-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Totals Card -->
          <div id="sales-eta-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderEtaRows(this.etaDataset);
    this.renderEtaTotals(this.etaDataset);
  },

  renderEtaRows(list) {
    const tbody = document.getElementById('sales-eta-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="22" class="py-8 text-center text-[#64748B] text-xs font-semibold">
            No data available in table
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.id}</td>
        <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.viewEtaDetails('${r.id}')">${r.invoiceNo}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A]">${r.buyer}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.poNo}</td>
        <td class="py-3 px-3 text-[#475569]">${r.product}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.brand}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A]">${r.mcs}</td>
        <td class="py-3 px-3 font-bold text-[#006C7A]">${r.blNo}</td>
        <td class="py-3 px-3 font-mono font-bold text-[#0F172A]">${r.containerNo}</td>
        <td class="py-3 px-3 text-[#0F172A]">${r.finalDestination}</td>
        <td class="py-3 px-3 text-[#475569]">${r.onBoardDate}</td>
        <td class="py-3 px-3 font-bold text-[#006644]">${r.actualEta}</td>
        <td class="py-3 px-3 font-bold text-[#0284C7]">${r.etaFd}</td>
        <td class="py-3 px-3 text-[#64748B]">${r.gateOutDate}</td>
        <td class="py-3 px-3 font-mono text-[#475569]">${r.entryNumber}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.liner}</td>
        <td class="py-3 px-3 font-medium text-[#475569]">${r.deliveryTerms}</td>
        <td class="py-3 px-3 text-center font-bold text-[#0F172A]">${r.transitDays}</td>
        <td class="py-3 px-3 text-center font-bold text-[#0F172A]">${r.transitDaysPerLiner}</td>
        <td class="py-3 px-3 text-center font-bold ${r.isFda === 'Yes' ? 'text-[#16A34A]' : 'text-[#64748B]'}">${r.isFda}</td>
        <td class="py-3 px-3 text-center">
          <button type="button" class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" title="View Tracking" onclick="SalesView.viewEtaDetails('${r.id}')">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderEtaTotals(list) {
    const el = document.getElementById('sales-eta-totals');
    if (!el) return;

    const count = list.length;
    const avgTransit = count > 0 ? Math.round(list.reduce((sum, r) => sum + (parseInt(r.transitDays) || 0), 0) / count) : 0;
    const totalCtns = list.reduce((sum, r) => sum + (parseInt(r.mcs) || 0), 0);

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Active Shipments</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Containers</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Cartons in Transit</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${totalCtns.toLocaleString()} <span class="text-xs font-semibold text-[#006644]">Ctns</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Average Transit Days</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">${avgTransit} <span class="text-xs font-semibold text-[#006C7A]">Days</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Transit Reliability</div>
          <div class="text-lg font-black text-[#16A34A] mt-0.5">98.5% <span class="text-[11px] font-semibold text-[#64748B]">(On-Time ETA)</span></div>
        </div>
      </div>
    `;
  },

  filterEtaStatus() {
    const exporter = document.getElementById('sales-eta-exporter-select')?.value || 'All';
    const plant = document.getElementById('sales-eta-plant-select')?.value || 'All';
    const liner = document.getElementById('sales-eta-liner-select')?.value || 'All';
    const consignee = document.getElementById('sales-eta-consignee-select')?.value || 'All';

    const filtered = this.etaDataset.filter(r => {
      const matchExp = exporter === 'All' || r.exporter === exporter;
      const matchPlant = plant === 'All' || r.plant === plant;
      const matchLiner = liner === 'All' || r.liner.toLowerCase().includes(liner.toLowerCase());
      const matchConsignee = consignee === 'All' || r.buyer === consignee || r.consignee === consignee;
      return matchExp && matchPlant && matchLiner && matchConsignee;
    });

    this.renderEtaRows(filtered);
    this.renderEtaTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered: Found ${filtered.length} active ETA trackings`, 'info');
    }
  },

  searchEtaStatus(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.renderEtaRows(this.etaDataset);
      this.renderEtaTotals(this.etaDataset);
      return;
    }

    const filtered = this.etaDataset.filter(r => {
      return (r.invoiceNo && r.invoiceNo.toLowerCase().includes(q)) ||
        (r.buyer && r.buyer.toLowerCase().includes(q)) ||
        (r.blNo && r.blNo.toLowerCase().includes(q)) ||
        (r.containerNo && r.containerNo.toLowerCase().includes(q)) ||
        (r.liner && r.liner.toLowerCase().includes(q)) ||
        (r.finalDestination && r.finalDestination.toLowerCase().includes(q));
    });

    this.renderEtaRows(filtered);
    this.renderEtaTotals(filtered);
  },

  downloadEtaExcel() {
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exporting ETA/ETD Manifest to Excel...', 'success');
    }
  },

  viewEtaDetails(id) {
    const r = this.etaDataset.find(x => x.id === id);
    if (!r) return;

    if (typeof Modal !== 'undefined' && Modal.open) {
      Modal.open({
        title: `ETA Transit Telemetry - ${r.containerNo}`,
        size: 'md',
        content: `
          <div class="space-y-4 text-xs text-[#0F172A]">
            <div class="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3 space-y-2">
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div><span class="text-[#64748B]">Invoice:</span> <span class="font-bold text-[#006C7A]">${r.invoiceNo}</span></div>
                <div><span class="text-[#64748B]">Buyer:</span> <span class="font-bold text-[#0F172A]">${r.buyer}</span></div>
                <div><span class="text-[#64748B]">Container No:</span> <span class="font-mono font-bold">${r.containerNo}</span></div>
                <div><span class="text-[#64748B]">BL Number:</span> <span class="font-bold text-[#006C7A]">${r.blNo}</span></div>
                <div><span class="text-[#64748B]">Liner:</span> <span class="font-semibold text-[#0F172A]">${r.liner}</span></div>
                <div><span class="text-[#64748B]">Final Destination:</span> <span class="font-semibold text-[#0F172A]">${r.finalDestination}</span></div>
                <div><span class="text-[#64748B]">Actual ETA:</span> <span class="font-bold text-[#006644]">${r.actualEta}</span></div>
                <div><span class="text-[#64748B]">ETA Final Delivery:</span> <span class="font-bold text-[#0284C7]">${r.etaFd}</span></div>
                <div><span class="text-[#64748B]">Transit Days:</span> <span class="font-bold">${r.transitDays} Days</span></div>
                <div><span class="text-[#64748B]">Entry Number:</span> <span class="font-mono font-bold">${r.entryNumber}</span></div>
              </div>
            </div>
            <div class="p-2.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg text-[11px] text-[#166534]">
              Ocean reefer container telemetry active. Live coordinates updated at port of discharge.
            </div>
          </div>
        `,
        footerButtons: [{ label: 'Close', type: 'secondary', onClick: (m) => m.close() }]
      });
    }
  },

  // ==========================================
  // 2. FDA STATUS REGISTER (IMAGE 2)
  // ==========================================
  fdaDataset: [
    {
      sNo: 1,
      id: '104',
      invNo: 'DFL/KKD/2627/157',
      poNo: 'DF/DF-2786',
      buyer: 'DEVI FISHERIES INC.',
      shippingBillNo: '',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'USA',
      priorNoticeNumber: 'PN-2026-99120',
      lineReleaseStatus: 'Pending Inspection',
      fdaClearanceDate: ''
    },
    {
      sNo: 2,
      id: '6513',
      invNo: 'DFL/JPT/2627/313',
      poNo: 'PO1004191',
      buyer: 'STANLEY PEARLMAN ENTERPRISES, INC.',
      shippingBillNo: 'rswr',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'USA',
      priorNoticeNumber: 'PN-2026-99121',
      lineReleaseStatus: 'Under Review',
      fdaClearanceDate: ''
    },
    {
      sNo: 3,
      id: '6203',
      invNo: 'DFL/JPT/2627/312',
      poNo: '1102650547',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      shippingBillNo: '4321',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'USA',
      priorNoticeNumber: 'PN-2026-99122',
      lineReleaseStatus: 'Documentation Submitted',
      fdaClearanceDate: ''
    },
    {
      sNo: 4,
      id: '6302',
      invNo: 'DFL/JPT/2627/311',
      poNo: '1102650877',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      shippingBillNo: '',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'USA',
      priorNoticeNumber: 'PN-2026-99123',
      lineReleaseStatus: 'Pending',
      fdaClearanceDate: ''
    },
    {
      sNo: 5,
      id: '5743',
      invNo: 'DFL/JPT/2627/310',
      poNo: '60150DEV010C',
      buyer: 'CRUSTA C SAS',
      shippingBillNo: '',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'FRANCE',
      priorNoticeNumber: 'EU-TRACES-8812',
      lineReleaseStatus: 'EU Vet Border Check',
      fdaClearanceDate: ''
    },
    {
      sNo: 6,
      id: '6131',
      invNo: 'DFL/JPT/2627/309',
      poNo: '1102650475',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      shippingBillNo: '',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'USA',
      priorNoticeNumber: 'PN-2026-99124',
      lineReleaseStatus: 'Pending Prior Notice',
      fdaClearanceDate: ''
    },
    {
      sNo: 7,
      id: '7050',
      invNo: 'DFL/JPT/2627/308',
      poNo: 'DF/DF-5611',
      buyer: 'DEVI FISHERIES INC.',
      shippingBillNo: '',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'USA',
      priorNoticeNumber: 'PN-2026-99125',
      lineReleaseStatus: 'Prior Notice Confirmed',
      fdaClearanceDate: ''
    },
    {
      sNo: 8,
      id: '7051',
      invNo: 'DFL/JPT/2627/307',
      poNo: 'DF/DF-5612',
      buyer: 'DEVI FISHERIES INC.',
      shippingBillNo: '',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'USA',
      priorNoticeNumber: 'PN-2026-99126',
      lineReleaseStatus: 'Prior Notice Confirmed',
      fdaClearanceDate: ''
    }
  ],

  renderFdaStatus(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#172B4D]">
        <!-- 1. Page Title Header (Image 2) -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">FDA STATUS</h1>
        </div>

        <!-- 2. Top Filter Card (Base Design System, Image 2) -->
        <div id="sales-fda-filter-card" class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT YEAR</label>
              <select id="sales-fda-year-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT EXPORTER :</label>
              <select id="sales-fda-exporter-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT CONSIGNEE :</label>
              <select id="sales-fda-consignee-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="ALL" selected>ALL</option>
                <option value="DEVI FISHERIES INC.">DEVI FISHERIES INC.</option>
                <option value="STANLEY PEARLMAN ENTERPRISES, INC.">STANLEY PEARLMAN ENTERPRISES, INC.</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="CRUSTA C SAS">CRUSTA C SAS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT COUNTRY:</label>
              <select id="sales-fda-country-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="USA">U.S.A.</option>
                <option value="FRANCE">FRANCE</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">STATUS :</label>
              <select id="sales-fda-status-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="Pending" selected>Pending</option>
                <option value="Completed">Completed</option>
                <option value="All">All</option>
              </select>
            </div>

            <div>
              <button id="btn-fda-search" class="px-6 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterFdaStatus()">
                <span>Search</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 3. Table Card (Image 2) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-fda-search-input" 
                placeholder="Search..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchFdaStatus(this.value)"
              />
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.toggleMoreFdaSearch()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.loadAllFdaStatus()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortFdaStatus('sNo')">
                    <span class="inline-flex items-center gap-1">SNO <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">InvNo</th>
                  <th class="py-3 px-3">PoNo</th>
                  <th class="py-3 px-3">Buyer</th>
                  <th class="py-3 px-3">ShippingBillNo</th>
                  <th class="py-3 px-3 text-center">Status</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-fda-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Totals Card -->
          <div id="sales-fda-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderFdaRows(this.fdaDataset);
    this.renderFdaTotals(this.fdaDataset);
  },

  renderFdaRows(list) {
    const tbody = document.getElementById('sales-fda-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="py-8 text-center text-[#64748B] text-xs">
            No FDA regulatory records found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => {
      const isPending = (r.status || '').toLowerCase() === 'pending';
      const badgeHtml = isPending
        ? `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#EF4444] shadow-xs">Pending</span>`
        : `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#16A34A] shadow-xs">Completed</span>`;

      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
          <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.id}</td>
          <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openFdaModal('${r.id}')">${r.invNo}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.poNo}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A]">${r.buyer}</td>
          <td class="py-3 px-3 font-mono text-[#475569]">${r.shippingBillNo || ''}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">${badgeHtml}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">
            <button 
              type="button" 
              class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
              title="Update FDA Clearance" 
              onclick="SalesView.openFdaModal('${r.id}')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderFdaTotals(list) {
    const el = document.getElementById('sales-fda-totals');
    if (!el) return;

    const count = list.length;
    const completed = list.filter(x => (x.status || '').toLowerCase() === 'completed').length;
    const pending = count - completed;

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Filings</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Entries</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">FDA Cleared</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${completed} <span class="text-xs font-semibold text-[#006644]">Cleared</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Review</div>
          <div class="text-lg font-black text-[#991B1B] mt-0.5">${pending} <span class="text-xs font-semibold text-[#991B1B]">Pending</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Prior Notice Compliance</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">100% <span class="text-[11px] font-semibold text-[#64748B]">(USFDA OASIS)</span></div>
        </div>
      </div>
    `;
  },

  filterFdaStatus() {
    const year = document.getElementById('sales-fda-year-select')?.value || 'All';
    const exporter = document.getElementById('sales-fda-exporter-select')?.value || 'All';
    const consignee = document.getElementById('sales-fda-consignee-select')?.value || 'ALL';
    const country = document.getElementById('sales-fda-country-select')?.value || 'All';
    const status = document.getElementById('sales-fda-status-select')?.value || 'All';

    const filtered = this.fdaDataset.filter(r => {
      const matchYear = year === 'All' || r.year === year;
      const matchExporter = exporter === 'All' || r.exporter === exporter;
      const matchConsignee = consignee === 'ALL' || r.buyer === consignee;
      const matchCountry = country === 'All' || r.country === country;
      const matchStatus = status === 'All' || r.status === status;
      return matchYear && matchExporter && matchConsignee && matchCountry && matchStatus;
    });

    this.renderFdaRows(filtered);
    this.renderFdaTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered: Found ${filtered.length} FDA filings`, 'info');
    }
  },

  searchFdaStatus(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.renderFdaRows(this.fdaDataset);
      this.renderFdaTotals(this.fdaDataset);
      return;
    }

    const filtered = this.fdaDataset.filter(r => {
      return (r.invNo && r.invNo.toLowerCase().includes(q)) ||
        (r.poNo && r.poNo.toLowerCase().includes(q)) ||
        (r.buyer && r.buyer.toLowerCase().includes(q)) ||
        (r.shippingBillNo && r.shippingBillNo.toLowerCase().includes(q)) ||
        (r.id && r.id.toLowerCase().includes(q));
    });

    this.renderFdaRows(filtered);
    this.renderFdaTotals(filtered);
  },

  loadAllFdaStatus() {
    const yearEl = document.getElementById('sales-fda-year-select');
    const exporterEl = document.getElementById('sales-fda-exporter-select');
    const consigneeEl = document.getElementById('sales-fda-consignee-select');
    const countryEl = document.getElementById('sales-fda-country-select');
    const statusEl = document.getElementById('sales-fda-status-select');
    const searchEl = document.getElementById('sales-fda-search-input');

    if (yearEl) yearEl.value = '2026-2027';
    if (exporterEl) exporterEl.value = 'DEVI FISHERIES LIMITED';
    if (consigneeEl) consigneeEl.value = 'ALL';
    if (countryEl) countryEl.value = 'All';
    if (statusEl) statusEl.value = 'Pending';
    if (searchEl) searchEl.value = '';

    this.renderFdaRows(this.fdaDataset);
    this.renderFdaTotals(this.fdaDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Loaded all ${this.fdaDataset.length} FDA status records`, 'success');
    }
  },

  toggleMoreFdaSearch() {
    const card = document.getElementById('sales-fda-filter-card');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      card.classList.add('ring-2', 'ring-[#006C7A]');
      setTimeout(() => card.classList.remove('ring-2', 'ring-[#006C7A]'), 1200);
    }
  },

  sortFdaStatus(key) {
    this.fdaDataset.reverse();
    this.renderFdaRows(this.fdaDataset);
  },

  openFdaModal(id) {
    const record = this.fdaDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert('Modal component is not loaded');
      return;
    }

    Modal.open({
      title: 'FDA PRIOR NOTICE & REGULATORY CLEARANCE',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Orders &nbsp;&gt;&nbsp; FDA Status &nbsp;&gt;&nbsp; <span class="text-[#2563EB] font-semibold">Regulatory Filing</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Invoice No</label>
                <input type="text" value="${record.invNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PO Number</label>
                <input type="text" value="${record.poNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Buyer</label>
                <input type="text" value="${record.buyer}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Prior Notice Confirmation (PNC#) <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="fda-input-pnc" value="${record.priorNoticeNumber || ''}" placeholder="Enter PNC Number" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Line Release Status <span class="text-[#EF4444]">*</span></label>
                <select id="fda-input-release" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="May Proceed" selected>May Proceed (Auto Cleared)</option>
                  <option value="FDA Hold / Sample Required">FDA Hold / Sample Required</option>
                  <option value="Documentation Examination">Documentation Examination</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Clearance Date <span class="text-[#EF4444]">*</span></label>
                <input type="date" id="fda-input-date" value="${record.fdaClearanceDate || '2026-10-23'}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">FDA Regulatory Officer Notes</label>
              <textarea id="fda-input-notes" rows="2" placeholder="Enter inspection comments or release number" class="w-full p-2 rounded-lg border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">FDA Prior Notice transmitted via OASIS. Automated May Proceed notification issued.</textarea>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Close',
          type: 'danger',
          onClick: (m) => m.close()
        },
        {
          label: 'Save',
          type: 'primary',
          onClick: (m) => SalesView.saveFdaStatus(record.id)
        }
      ]
    });
  },

  saveFdaStatus(id) {
    const record = this.fdaDataset.find(x => x.id === id);
    if (!record) return;

    const pnc = document.getElementById('fda-input-pnc')?.value;
    const release = document.getElementById('fda-input-release')?.value;
    const clearDate = document.getElementById('fda-input-date')?.value;

    record.priorNoticeNumber = pnc || record.priorNoticeNumber;
    record.lineReleaseStatus = release || record.lineReleaseStatus;
    record.fdaClearanceDate = clearDate || record.fdaClearanceDate;
    record.status = 'Completed';

    this.renderFdaRows(this.fdaDataset);
    this.renderFdaTotals(this.fdaDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`FDA Clearance updated for ${record.invNo}`, 'success');
    }
  },

  // ==========================================
  // 3. CLEARING AGENT REGISTER (IMAGE 3)
  // ==========================================
  clearingAgentDataset: [
    {
      sNo: 1,
      id: 'CA-01',
      invNo: 'DFL/JPT/2627/313',
      buyer: 'STANLEY PEARLMAN ENTERPRISES, INC.',
      blNo: '22',
      portOfDischarge: 'BALTIMORE',
      notifyPartyName: 'WILLIAMS CLARKE CO., INC.',
      status: 'Pending',
      entryNo: 'CBP-8841029',
      doStatus: 'Issued',
      clearingBroker: 'WILLIAMS CLARKE CO., INC.'
    },
    {
      sNo: 2,
      id: 'CA-02',
      invNo: 'DFL/JPT/2627/312',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      blNo: 'g99',
      portOfDischarge: 'SAVANNAH',
      notifyPartyName: 'JOHN S JAMES CO',
      status: 'Pending',
      entryNo: 'CBP-8841030',
      doStatus: 'Pending Arrival',
      clearingBroker: 'JOHN S JAMES CO'
    },
    {
      sNo: 3,
      id: 'CA-03',
      invNo: 'DFL/JPT/2627/311',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      blNo: 'ee',
      portOfDischarge: 'NEW YORK',
      notifyPartyName: 'WILLIAMS CLARKE CO., INC.',
      status: 'Pending',
      entryNo: 'CBP-8841031',
      doStatus: 'Pending Arrival',
      clearingBroker: 'WILLIAMS CLARKE CO., INC.'
    },
    {
      sNo: 4,
      id: 'CA-04',
      invNo: 'DFL/JPT/2627/309',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      blNo: '090',
      portOfDischarge: 'NEW YORK',
      notifyPartyName: 'WILLIAMS CLARKE CO., INC.',
      status: 'Pending',
      entryNo: 'CBP-8841032',
      doStatus: 'Issued',
      clearingBroker: 'WILLIAMS CLARKE CO., INC.'
    },
    {
      sNo: 5,
      id: 'CA-05',
      invNo: 'DFL/JPT/2627/308',
      buyer: 'DEVI FISHERIES INC.',
      blNo: '22',
      portOfDischarge: 'LOS ANGELES',
      notifyPartyName: 'WILLIAMS CLARKE CO., INC.',
      status: 'Pending',
      entryNo: 'CBP-8841033',
      doStatus: 'Pending Arrival',
      clearingBroker: 'WILLIAMS CLARKE CO., INC.'
    },
    {
      sNo: 6,
      id: 'CA-06',
      invNo: 'DFL/JPT/2627/307',
      buyer: 'DEVI FISHERIES INC.',
      blNo: '24',
      portOfDischarge: 'BALTIMORE',
      notifyPartyName: 'WILLIAMS CLARKE CO., INC.',
      status: 'Pending',
      entryNo: 'CBP-8841034',
      doStatus: 'Issued',
      clearingBroker: 'WILLIAMS CLARKE CO., INC.'
    },
    {
      sNo: 7,
      id: 'CA-07',
      invNo: 'DFL/SNM/2627/145',
      buyer: 'MARK FOODS LLC',
      blNo: '31',
      portOfDischarge: 'NEW YORK',
      notifyPartyName: 'JOHN S JAMES CO',
      status: 'Pending',
      entryNo: 'CBP-8841035',
      doStatus: 'Pending Arrival',
      clearingBroker: 'JOHN S JAMES CO'
    },
    {
      sNo: 8,
      id: 'CA-08',
      invNo: 'DFL/SNM/2627/144',
      buyer: 'MARK FOODS LLC',
      blNo: '32',
      portOfDischarge: 'NEW YORK',
      notifyPartyName: 'JOHN S JAMES CO',
      status: 'Pending',
      entryNo: 'CBP-8841036',
      doStatus: 'Pending Arrival',
      clearingBroker: 'JOHN S JAMES CO'
    }
  ],

  renderClearingAgent(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#172B4D]">
        <!-- 1. Page Title Header (Image 3) -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">CLEARING AGENT</h1>
        </div>

        <!-- 2. Top Filter Card (Base Design System, Image 3) -->
        <div id="sales-cha-filter-card" class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">FROM DATE</label>
              <input type="date" id="sales-cha-from-date" value="2026-04-01" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">TO DATE</label>
              <input type="date" id="sales-cha-to-date" value="2026-10-23" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">STATUS :</label>
              <select id="sales-cha-status-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="Pending" selected>Pending</option>
                <option value="Completed">Completed</option>
                <option value="All">All</option>
              </select>
            </div>

            <div>
              <button id="btn-cha-search" class="px-6 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterClearingAgent()">
                <span>Search</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 3. Table Card (Image 3) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-cha-search-input" 
                placeholder="Search..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchClearingAgent(this.value)"
              />
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.toggleMoreChaSearch()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.loadAllClearingAgent()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortClearingAgent('sNo')">
                    <span class="inline-flex items-center gap-1">S.No <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">Inv No</th>
                  <th class="py-3 px-3">Buyer</th>
                  <th class="py-3 px-3">BL No</th>
                  <th class="py-3 px-3">Port Of Discharge</th>
                  <th class="py-3 px-3">Notify party Name</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-cha-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Totals Card -->
          <div id="sales-cha-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderClearingAgentRows(this.clearingAgentDataset);
    this.renderClearingAgentTotals(this.clearingAgentDataset);
  },

  renderClearingAgentRows(list) {
    const tbody = document.getElementById('sales-cha-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="py-8 text-center text-[#64748B] text-xs">
            No clearing agent entries found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
        <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openClearingAgentModal('${r.id}')">${r.invNo}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A]">${r.buyer}</td>
        <td class="py-3 px-3 font-bold text-[#475569]">${r.blNo}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.portOfDischarge}</td>
        <td class="py-3 px-3 font-semibold text-[#006C7A]">${r.notifyPartyName}</td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <button 
            type="button" 
            class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
            title="Assign / Update Clearing Broker" 
            onclick="SalesView.openClearingAgentModal('${r.id}')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderClearingAgentTotals(list) {
    const el = document.getElementById('sales-cha-totals');
    if (!el) return;

    const count = list.length;
    const completed = list.filter(x => (x.status || '').toLowerCase() === 'completed').length;
    const pending = count - completed;

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Consignments</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Shipments</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Broker Appointed</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${completed} <span class="text-xs font-semibold text-[#006644]">Assigned</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Broker Set</div>
          <div class="text-lg font-black text-[#991B1B] mt-0.5">${pending} <span class="text-xs font-semibold text-[#991B1B]">Pending</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Key Customs Broker</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">Williams Clarke <span class="text-[11px] font-semibold text-[#64748B]">(US East/West)</span></div>
        </div>
      </div>
    `;
  },

  filterClearingAgent() {
    const status = document.getElementById('sales-cha-status-select')?.value || 'All';

    const filtered = this.clearingAgentDataset.filter(r => {
      const matchStatus = status === 'All' || r.status === status;
      return matchStatus;
    });

    this.renderClearingAgentRows(filtered);
    this.renderClearingAgentTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered: Found ${filtered.length} clearing agent assignments`, 'info');
    }
  },

  searchClearingAgent(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.renderClearingAgentRows(this.clearingAgentDataset);
      this.renderClearingAgentTotals(this.clearingAgentDataset);
      return;
    }

    const filtered = this.clearingAgentDataset.filter(r => {
      return (r.invNo && r.invNo.toLowerCase().includes(q)) ||
        (r.buyer && r.buyer.toLowerCase().includes(q)) ||
        (r.blNo && r.blNo.toLowerCase().includes(q)) ||
        (r.portOfDischarge && r.portOfDischarge.toLowerCase().includes(q)) ||
        (r.notifyPartyName && r.notifyPartyName.toLowerCase().includes(q));
    });

    this.renderClearingAgentRows(filtered);
    this.renderClearingAgentTotals(filtered);
  },

  loadAllClearingAgent() {
    const fromEl = document.getElementById('sales-cha-from-date');
    const toEl = document.getElementById('sales-cha-to-date');
    const statusEl = document.getElementById('sales-cha-status-select');
    const searchEl = document.getElementById('sales-cha-search-input');

    if (fromEl) fromEl.value = '2026-04-01';
    if (toEl) toEl.value = '2026-10-23';
    if (statusEl) statusEl.value = 'Pending';
    if (searchEl) searchEl.value = '';

    this.renderClearingAgentRows(this.clearingAgentDataset);
    this.renderClearingAgentTotals(this.clearingAgentDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Loaded all ${this.clearingAgentDataset.length} clearing agent records`, 'success');
    }
  },

  toggleMoreChaSearch() {
    const card = document.getElementById('sales-cha-filter-card');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      card.classList.add('ring-2', 'ring-[#006C7A]');
      setTimeout(() => card.classList.remove('ring-2', 'ring-[#006C7A]'), 1200);
    }
  },

  sortClearingAgent(key) {
    this.clearingAgentDataset.reverse();
    this.renderClearingAgentRows(this.clearingAgentDataset);
  },

  openClearingAgentModal(id) {
    const record = this.clearingAgentDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert('Modal component is not loaded');
      return;
    }

    Modal.open({
      title: 'CUSTOMS BROKER & CLEARING AGENT ASSIGNMENT',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Orders &nbsp;&gt;&nbsp; Clearing Agent &nbsp;&gt;&nbsp; <span class="text-[#2563EB] font-semibold">Customs Broker Entry</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Invoice No</label>
                <input type="text" value="${record.invNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Buyer</label>
                <input type="text" value="${record.buyer}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">BL Number</label>
                <input type="text" value="${record.blNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#006C7A] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Port of Discharge</label>
                <input type="text" value="${record.portOfDischarge}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Notify Party / Broker Name <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="cha-input-name" value="${record.notifyPartyName}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Delivery Order (DO) Status <span class="text-[#EF4444]">*</span></label>
                <select id="cha-input-do" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Issued" ${record.doStatus === 'Issued' ? 'selected' : ''}>Issued</option>
                  <option value="Pending Arrival" ${record.doStatus === 'Pending Arrival' ? 'selected' : ''}>Pending Arrival</option>
                  <option value="Cleared / Released">Cleared / Released</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Broker Instructions & Dispatch Notes</label>
              <textarea id="cha-input-notes" rows="2" placeholder="Enter special delivery order instructions" class="w-full p-2 rounded-lg border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">Original bills of lading surrendered to carrier. Broker authorized for immediate customs release and drayage dispatch.</textarea>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Close',
          type: 'danger',
          onClick: (m) => m.close()
        },
        {
          label: 'Save',
          type: 'primary',
          onClick: (m) => SalesView.saveClearingAgent(record.id)
        }
      ]
    });
  },

  saveClearingAgent(id) {
    const record = this.clearingAgentDataset.find(x => x.id === id);
    if (!record) return;

    const name = document.getElementById('cha-input-name')?.value;
    const doStatus = document.getElementById('cha-input-do')?.value;

    record.notifyPartyName = name || record.notifyPartyName;
    record.doStatus = doStatus || record.doStatus;
    record.status = 'Completed';

    this.renderClearingAgentRows(this.clearingAgentDataset);
    this.renderClearingAgentTotals(this.clearingAgentDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Clearing Broker assigned for ${record.invNo}`, 'success');
    }
  },

  // ==========================================
  // 4. DELAYED SHIPMENTS REGISTER
  // ==========================================
  delayedShipmentsDataset: [
    {
      sNo: 1,
      id: '4376',
      poNo: 'MFSFRSHR.25.023RU',
      poDate: '08-04-2025',
      prodStartDate: '-',
      country: 'RUSSIA',
      buyer: 'METRO CASH & CARRY OOO',
      actualShipByDate: '26-03-2026',
      stockOutDate: '05-05-2026',
      status: 'Delivered',
      daysDelayed: -41,
      month: 'Apr',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 2,
      id: '4377',
      poNo: 'MFSFRSHR.25.024RU',
      poDate: '08-04-2025',
      prodStartDate: '-',
      country: 'RUSSIA',
      buyer: 'METRO CASH & CARRY OOO',
      actualShipByDate: '26-03-2026',
      stockOutDate: '25-06-2026',
      status: 'Shipped',
      daysDelayed: -92,
      month: 'Apr',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 3,
      id: '4378',
      poNo: 'MFSFRSHR.25.025RU',
      poDate: '08-04-2025',
      prodStartDate: '-',
      country: 'RUSSIA',
      buyer: 'METRO CASH & CARRY OOO',
      actualShipByDate: '26-04-2026',
      stockOutDate: '16-07-2026',
      status: 'Shipped',
      daysDelayed: -82,
      month: 'Apr',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 4,
      id: '4379',
      poNo: 'MFSFRSHR.25.026RU',
      poDate: '08-04-2025',
      prodStartDate: '-',
      country: 'RUSSIA',
      buyer: 'METRO CASH & CARRY OOO',
      actualShipByDate: '26-04-2026',
      stockOutDate: '05-08-2026',
      status: 'Shipped',
      daysDelayed: -102,
      month: 'Apr',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 5,
      id: '4565',
      poNo: '1102550490',
      poDate: '18-04-2025',
      prodStartDate: '-',
      country: 'U.S.A.',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      actualShipByDate: '20-08-2025',
      stockOutDate: '06-04-2026',
      status: 'Delivered',
      daysDelayed: -230,
      month: 'Apr',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 6,
      id: '4566',
      poNo: '1102550491',
      poDate: '18-04-2025',
      prodStartDate: '-',
      country: 'U.S.A.',
      buyer: 'C.P. FOOD PRODUCTS, INC.',
      actualShipByDate: '25-08-2025',
      stockOutDate: '20-04-2026',
      status: 'Delivered',
      daysDelayed: -239,
      month: 'Apr',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 7,
      id: '4798',
      poNo: 'VM-DF-ASC-25003',
      poDate: '01-07-2025',
      prodStartDate: '-',
      country: 'BELGIUM',
      buyer: 'SEAFOOD CONNECTION B.V.',
      actualShipByDate: '20-03-2026',
      stockOutDate: '07-04-2026',
      status: 'Delivered',
      daysDelayed: -19,
      month: 'Jul',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 8,
      id: '4799',
      poNo: 'PL/DF/ASC/25004 & PL/DF/ASC/25004-1',
      poDate: '01-07-2025',
      prodStartDate: '-',
      country: 'BELGIUM',
      buyer: 'UMIOS FOOD EUROPE B.V.',
      actualShipByDate: '15-06-2026',
      stockOutDate: '30-06-2026',
      status: 'Delivered',
      daysDelayed: -16,
      month: 'Jul',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 9,
      id: '4942',
      poNo: 'DEV_26/008',
      poDate: '18-07-2025',
      prodStartDate: '-',
      country: 'BELGIUM',
      buyer: 'NORDIC SEAFOOD A/S.',
      actualShipByDate: '10-03-2026',
      stockOutDate: '16-04-2026',
      status: 'Delivered',
      daysDelayed: -38,
      month: 'Jul',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 10,
      id: '4943',
      poNo: 'DEV_26/009',
      poDate: '11-07-2025',
      prodStartDate: '-',
      country: 'BELGIUM',
      buyer: 'NORDIC SEAFOOD A/S.',
      actualShipByDate: '30-03-2026',
      stockOutDate: '16-06-2026',
      status: 'Delivered',
      daysDelayed: -79,
      month: 'Jul',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 11,
      id: '4944',
      poNo: 'DEV_26/010',
      poDate: '18-07-2025',
      prodStartDate: '-',
      country: 'BELGIUM',
      buyer: 'NORDIC SEAFOOD A/S.',
      actualShipByDate: '10-07-2026',
      stockOutDate: '25-07-2026',
      status: 'Shipped',
      daysDelayed: -16,
      month: 'Jul',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    },
    {
      sNo: 12,
      id: '4945',
      poNo: 'DEV_26/011',
      poDate: '18-07-2025',
      prodStartDate: '-',
      country: 'BELGIUM',
      buyer: 'NORDIC SEAFOOD A/S.',
      actualShipByDate: '10-07-2026',
      stockOutDate: '24-08-2026',
      status: 'Shipped',
      daysDelayed: -46,
      month: 'Jul',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED'
    }
  ],

  renderDelayedShipments(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">DELAYED SHIPMENTS</h2>
        </div>

        <!-- 2. Clean Search & Filters Card (Exact Match to Design System, No Empty Circles) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-4">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">MONTH</label>
              <select id="sales-delay-month" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>Select</option>
                <option value="Jan">January</option>
                <option value="Feb">February</option>
                <option value="Mar">March</option>
                <option value="Apr">April</option>
                <option value="May">May</option>
                <option value="Jun">June</option>
                <option value="Jul">July</option>
                <option value="Aug">August</option>
                <option value="Sep">September</option>
                <option value="Oct">October</option>
                <option value="Nov">November</option>
                <option value="Dec">December</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT YEAR</label>
              <select id="sales-delay-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT EXPORTER :</label>
              <select id="sales-delay-exporter" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUATECH PVT LTD">DEVI AQUATECH PVT LTD</option>
                <option value="SATYA SEAFOODS">SATYA SEAFOODS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT CONSIGNEE :</label>
              <select id="sales-delay-consignee" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="METRO CASH & CARRY OOO">METRO CASH & CARRY OOO</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="SEAFOOD CONNECTION B.V.">SEAFOOD CONNECTION B.V.</option>
                <option value="UMIOS FOOD EUROPE B.V.">UMIOS FOOD EUROPE B.V.</option>
                <option value="NORDIC SEAFOOD A/S.">NORDIC SEAFOOD A/S.</option>
              </select>
            </div>
          </div>

          <div class="flex justify-center pt-1">
            <button id="btn-delay-search" class="px-7 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterDelayedShipments()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>

        <!-- 3. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="flex items-center gap-2 flex-1 max-w-xl">
              <div class="relative flex-1 max-w-md">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
                <input 
                  type="text" 
                  id="sales-delay-search-input" 
                  placeholder="Search delayed shipments..." 
                  class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                  style="padding-left: 36px !important;"
                  oninput="SalesView.searchDelayedShipments(this.value)"
                />
              </div>

              <button class="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.toggleMoreDelaySearch()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button class="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors" onclick="SalesView.loadAllDelayedShipments()">
                <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#006C7A] hover:text-[#005662] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadDelayedShipmentsExcel()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Download Excel</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortDelayedShipments('sNo')">
                    <span class="inline-flex items-center gap-1">SNO <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortDelayedShipments('id')">
                    <span class="inline-flex items-center gap-1">ID <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">Po No</th>
                  <th class="py-3 px-3">Po Date</th>
                  <th class="py-3 px-3">Production Start Date</th>
                  <th class="py-3 px-3">Country</th>
                  <th class="py-3 px-3">Buyer</th>
                  <th class="py-3 px-3">Actual Ship By Date</th>
                  <th class="py-3 px-3">Stock Out Date</th>
                  <th class="py-3 px-3 text-center">Status</th>
                  <th class="py-3 px-3 text-right">Days Rem/Delayed</th>
                </tr>
              </thead>
              <tbody id="sales-delay-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-delay-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderDelayedShipmentsRows(this.delayedShipmentsDataset);
    this.renderDelayedShipmentsTotals(this.delayedShipmentsDataset);
  },

  renderDelayedShipmentsRows(list) {
    const tbody = document.getElementById('sales-delay-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="11" class="py-8 text-center text-[#64748B] text-xs">
            No delayed shipment records found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => {
      const isDelivered = (r.status || '').toLowerCase() === 'delivered';
      const statusBadge = isDelivered
        ? `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">Delivered</span>`
        : `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]">Shipped</span>`;

      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
          <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
          <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openDelayedShipmentModal('${r.id}')">${r.id}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A] hover:text-[#006C7A] cursor-pointer" onclick="SalesView.openDelayedShipmentModal('${r.id}')">${r.poNo}</td>
          <td class="py-3 px-3 text-[#475569] font-medium whitespace-nowrap">${r.poDate}</td>
          <td class="py-3 px-3 text-[#64748B] text-center">${r.prodStartDate || '-'}</td>
          <td class="py-3 px-3 font-bold text-[#475569] uppercase">${r.country}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A]">${r.buyer}</td>
          <td class="py-3 px-3 font-semibold text-[#0F172A] whitespace-nowrap">${r.actualShipByDate}</td>
          <td class="py-3 px-3 font-semibold text-[#475569] whitespace-nowrap">${r.stockOutDate}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">${statusBadge}</td>
          <td class="py-3 px-3 text-right font-bold text-[#E11D48] font-mono">${r.daysDelayed}</td>
        </tr>
      `;
    }).join('');
  },

  renderDelayedShipmentsTotals(list) {
    const el = document.getElementById('sales-delay-totals');
    if (!el) return;

    const count = list.length;
    const delivered = list.filter(x => (x.status || '').toLowerCase() === 'delivered').length;
    const shipped = count - delivered;
    const avgDelay = count > 0 
      ? Math.round(list.reduce((acc, x) => acc + (x.daysDelayed || 0), 0) / count)
      : 0;

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Delayed POs</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Orders</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Average Delay</div>
          <div class="text-lg font-black text-[#E11D48] mt-0.5">${avgDelay} <span class="text-xs font-semibold text-[#E11D48]">Days</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Post-Delay Delivered</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${delivered} <span class="text-xs font-semibold text-[#006644]">Delivered</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Still In-Transit</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">${shipped} <span class="text-xs font-semibold text-[#006C7A]">Shipped</span></div>
        </div>
      </div>
    `;
  },

  filterDelayedShipments() {
    const month = document.getElementById('sales-delay-month')?.value || 'All';
    const consignee = document.getElementById('sales-delay-consignee')?.value || 'All';

    const filtered = this.delayedShipmentsDataset.filter(r => {
      const matchMonth = month === 'All' || r.month === month;
      const matchConsignee = consignee === 'All' || r.buyer === consignee;
      return matchMonth && matchConsignee;
    });

    this.renderDelayedShipmentsRows(filtered);
    this.renderDelayedShipmentsTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} delayed shipment records`, 'info');
    }
  },

  searchDelayedShipments(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderDelayedShipmentsRows(this.delayedShipmentsDataset);
      this.renderDelayedShipmentsTotals(this.delayedShipmentsDataset);
      return;
    }

    const filtered = this.delayedShipmentsDataset.filter(r => 
      (r.poNo || '').toLowerCase().includes(q) ||
      (r.id || '').toLowerCase().includes(q) ||
      (r.buyer || '').toLowerCase().includes(q) ||
      (r.country || '').toLowerCase().includes(q) ||
      (r.status || '').toLowerCase().includes(q)
    );

    this.renderDelayedShipmentsRows(filtered);
    this.renderDelayedShipmentsTotals(filtered);
  },

  toggleMoreDelaySearch() {
    const el = document.getElementById('sales-delay-month');
    if (el) {
      el.focus();
      if (typeof Toast !== 'undefined' && Toast.show) {
        Toast.show('Advanced parameter filters active in top card', 'info');
      }
    }
  },

  loadAllDelayedShipments() {
    const input = document.getElementById('sales-delay-search-input');
    if (input) input.value = '';
    const m = document.getElementById('sales-delay-month');
    if (m) m.value = 'All';
    const c = document.getElementById('sales-delay-consignee');
    if (c) c.value = 'All';

    this.renderDelayedShipmentsRows(this.delayedShipmentsDataset);
    this.renderDelayedShipmentsTotals(this.delayedShipmentsDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Loaded all 12 delayed shipment records', 'success');
    }
  },

  sortDelayedShipments(key) {
    this.delayedShipmentsDataset.reverse();
    this.renderDelayedShipmentsRows(this.delayedShipmentsDataset);
  },

  downloadDelayedShipmentsExcel() {
    const headers = ['SNO', 'ID', 'Po No', 'Po Date', 'Production Start Date', 'Country', 'Buyer', 'Actual Ship By Date', 'Stock Out Date', 'Status', 'Days Rem/Delayed'];
    const rows = this.delayedShipmentsDataset.map(r => [r.sNo, r.id, `"${r.poNo}"`, r.poDate, r.prodStartDate, r.country, `"${r.buyer}"`, r.actualShipByDate, r.stockOutDate, r.status, r.daysDelayed].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));


    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `delayed_shipments_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported delayed shipments register to Excel/CSV', 'success');
    }
  },

  openDelayedShipmentModal(id) {
    const record = this.delayedShipmentsDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Delayed PO: ${record.poNo} | Buyer: ${record.buyer} | Delay: ${record.daysDelayed} days`);
      return;
    }

    Modal.open({
      title: 'DELAYED SHIPMENT ROOT-CAUSE & REMEDIATION',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Orders &nbsp;&gt;&nbsp; Delayed Shipments &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">PO #${record.poNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PO Number</label>
                <input type="text" value="${record.poNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#006C7A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Buyer / Consignee</label>
                <input type="text" value="${record.buyer}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Country</label>
                <input type="text" value="${record.country}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#475569] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Actual Ship By Date</label>
                <input type="text" value="${record.actualShipByDate}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Stock Out Date</label>
                <input type="text" value="${record.stockOutDate}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Days Delayed</label>
                <input type="text" value="${record.daysDelayed} Days" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#FECDD3] bg-[#FFF1F2] font-black text-xs text-[#E11D48] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Delay Root Cause <span class="text-[#EF4444]">*</span></label>
                <select id="delay-modal-cause" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Liner Blank Sailing / Vessel Rollover" selected>Liner Blank Sailing / Vessel Rollover</option>
                  <option value="Cold Storage Gate-in Dwell Time">Cold Storage Gate-in Dwell Time</option>
                  <option value="Raw Material Landing & Sizing Wait">Raw Material Landing & Sizing Wait</option>
                  <option value="Customer Label Revision & Re-packing">Customer Label Revision & Re-packing</option>
                  <option value="Port Congestion / Feeder Connecting Delay">Port Congestion / Feeder Connecting Delay</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Current Fulfillment Status</label>
                <select id="delay-modal-status" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Delivered" ${record.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                  <option value="Shipped" ${record.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Expedited Action & Mitigation Notes</label>
              <textarea id="delay-modal-notes" rows="2" class="w-full p-2 rounded-lg border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">Customer notified with updated carrier vessel telemetry. Priority customs clearance arranged with clearing broker upon port discharge.</textarea>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Close',
          type: 'danger',
          onClick: (m) => m.close()
        },
        {
          label: 'Save Changes',
          type: 'primary',
          onClick: (m) => SalesView.saveDelayedShipment(record.id)
        }
      ]
    });
  },

  saveDelayedShipment(id) {
    const record = this.delayedShipmentsDataset.find(x => x.id === id);
    if (!record) return;

    const newStatus = document.getElementById('delay-modal-status')?.value;
    if (newStatus) {
      record.status = newStatus;
    }

    this.renderDelayedShipmentsRows(this.delayedShipmentsDataset);
    this.renderDelayedShipmentsTotals(this.delayedShipmentsDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Updated remediation notes for PO #${record.poNo}`, 'success');
    }
  },


  // ==========================================
  // 3. PAYMENTS & FINANCIALS
  // ==========================================
  // ==========================================
  // 5. PAYMENTS & FORWARD CONTRACTS
  // ==========================================
  forwardContractsDataset: [
    {
      sNo: 1,
      id: 'FC-340',
      bookedDate: '28-08-2026',
      spotRate: 95.5600,
      contractNumber: '1440726FP0B00340',
      currentDate: '23-10-2026',
      diff: 21,
      startDate: '15-10-2026',
      endDate: '13-11-2026',
      month: 'October',
      bookedRate: 95.8375,
      premiumRate: 0.2775,
      branchMargin: 0.0000,
      bookedValue: 1000000.00,
      utilisation: '-',
      balanceUsd: 1000000.00,
      company: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      type: 'Available'
    },
    {
      sNo: 2,
      id: 'FC-341',
      bookedDate: '28-08-2026',
      spotRate: 95.5600,
      contractNumber: '1440726FP0B00341',
      currentDate: '23-10-2026',
      diff: 53,
      startDate: '16-11-2026',
      endDate: '15-12-2026',
      month: 'November',
      bookedRate: 96.0800,
      premiumRate: 0.5200,
      branchMargin: 0.0000,
      bookedValue: 1000000.00,
      utilisation: '-',
      balanceUsd: 1000000.00,
      company: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      type: 'Available'
    },
    {
      sNo: 3,
      id: 'FC-339',
      bookedDate: '21-08-2026',
      spotRate: 95.7350,
      contractNumber: '1440726FP0B00339',
      currentDate: '23-10-2026',
      diff: 68,
      startDate: '01-12-2026',
      endDate: '30-12-2026',
      month: 'December',
      bookedRate: 96.4350,
      premiumRate: 0.7000,
      branchMargin: 0.0000,
      bookedValue: 1000000.00,
      utilisation: '-',
      balanceUsd: 1000000.00,
      company: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      type: 'Available'
    },
    {
      sNo: 4,
      id: 'FC-338',
      bookedDate: '21-08-2026',
      spotRate: 95.7350,
      contractNumber: '1440726FP0B00338',
      currentDate: '23-10-2026',
      diff: 53,
      startDate: '16-11-2026',
      endDate: '15-12-2026',
      month: 'November',
      bookedRate: 96.3225,
      premiumRate: 0.5875,
      branchMargin: 0.0000,
      bookedValue: 1000000.00,
      utilisation: '-',
      balanceUsd: 1000000.00,
      company: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      type: 'Available'
    },
    {
      sNo: 5,
      id: 'FC-337',
      bookedDate: '20-08-2026',
      spotRate: 95.6900,
      contractNumber: '1440726FP0B00337',
      currentDate: '23-10-2026',
      diff: 53,
      startDate: '16-11-2026',
      endDate: '15-12-2026',
      month: 'November',
      bookedRate: 96.2825,
      premiumRate: 0.5925,
      branchMargin: 0.0000,
      bookedValue: 1000000.00,
      utilisation: '-',
      balanceUsd: 1000000.00,
      company: 'DEVI FISHERIES LIMITED',
      year: '2026-2027',
      type: 'Available'
    }
  ],

  renderForwardContracts(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">FORWARD CONTRACT</h2>
        </div>

        <!-- 2. Clean Search & Filters Card (Exact Match to Design System, No Empty Circles) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end mb-4">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Year:</label>
              <select id="sales-fc-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Exporter:</label>
              <select id="sales-fc-exporter" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUATECH PVT LTD">DEVI AQUATECH PVT LTD</option>
                <option value="SATYA SEAFOODS">SATYA SEAFOODS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Type</label>
              <select id="sales-fc-type" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="Available" selected>Available</option>
                <option value="Utilized">Utilized</option>
                <option value="Expired">Expired</option>
                <option value="All">All</option>
              </select>
            </div>
          </div>

          <div class="flex items-center justify-center gap-3 pt-1">
            <button id="btn-fc-search" class="px-6 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterForwardContracts()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <button id="btn-new-fc" class="px-5 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.openForwardContractModal(null)">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>New Forward Contract</span>
            </button>
          </div>
        </div>

        <!-- 3. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-fc-search-input" 
                placeholder="Search forward contracts..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchForwardContracts(this.value)"
              />
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#006C7A] hover:text-[#005662] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadForwardContractsExcel()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Download Forward Contract</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider whitespace-nowrap">
                  <th class="py-3 px-3">S.No</th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortForwardContracts('bookedDate')">
                    <span class="inline-flex items-center gap-1">Booked Date <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortForwardContracts('spotRate')">
                    <span class="inline-flex items-center gap-1">Spot Rate <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortForwardContracts('contractNumber')">
                    <span class="inline-flex items-center gap-1">Forward Contract No <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">Current Date</th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortForwardContracts('diff')">
                    <span class="inline-flex items-center gap-1">Diff <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortForwardContracts('startDate')">
                    <span class="inline-flex items-center gap-1">Start Date <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortForwardContracts('endDate')">
                    <span class="inline-flex items-center gap-1">End Date <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortForwardContracts('month')">
                    <span class="inline-flex items-center gap-1">Month <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortForwardContracts('bookedRate')">
                    <span class="inline-flex items-center gap-1">Booked Rate <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 cursor-pointer text-right" onclick="SalesView.sortForwardContracts('bookedValue')">
                    <span class="inline-flex items-center gap-1 justify-end">Booked Value <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 text-center">Utilisation</th>
                  <th class="py-3 px-3 text-right">Balance US$</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-fc-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-fc-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderForwardContractsRows(this.forwardContractsDataset);
    this.renderForwardContractsTotals(this.forwardContractsDataset);
  },

  renderForwardContractsRows(list) {
    const tbody = document.getElementById('sales-fc-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="14" class="py-8 text-center text-[#64748B] text-xs">
            No forward contracts found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A] whitespace-nowrap">${r.bookedDate}</td>
        <td class="py-3 px-3 font-mono font-bold text-[#475569]">${(r.spotRate || 0).toFixed(4)}</td>
        <td class="py-3 px-3 font-mono font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openForwardContractModal('${r.id}')">${r.contractNumber}</td>
        <td class="py-3 px-3 text-[#64748B] whitespace-nowrap">${r.currentDate}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A] text-center">${r.diff}</td>
        <td class="py-3 px-3 font-semibold text-[#475569] whitespace-nowrap">${r.startDate}</td>
        <td class="py-3 px-3 font-semibold text-[#475569] whitespace-nowrap">${r.endDate}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A]">${r.month}</td>
        <td class="py-3 px-3 font-mono font-black text-[#006C7A]">${(r.bookedRate || 0).toFixed(4)}</td>
        <td class="py-3 px-3 font-extrabold text-[#006644] text-right">$${(r.bookedValue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td class="py-3 px-3 text-[#64748B] text-center font-medium">${r.utilisation || '-'}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A] text-right">$${(r.balanceUsd || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <button 
            type="button" 
            class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
            title="Edit Forward Contract" 
            onclick="SalesView.openForwardContractModal('${r.id}')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderForwardContractsTotals(list) {
    const el = document.getElementById('sales-fc-totals');
    if (!el) return;

    const count = list.length;
    const totalBooked = list.reduce((sum, r) => sum + (Number(r.bookedValue) || 0), 0);
    const totalBalance = list.reduce((sum, r) => sum + (Number(r.balanceUsd) || 0), 0);
    const avgHedgeRate = count > 0 
      ? (list.reduce((sum, r) => sum + (Number(r.bookedRate) || 0), 0) / count).toFixed(4)
      : '0.0000';

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Active Contracts</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Contracts</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Booked Value</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">$${totalBooked.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Available Balance (USD)</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">$${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Avg Hedge Rate</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">₹ ${avgHedgeRate} <span class="text-[11px] font-semibold text-[#64748B]">INR/USD</span></div>
        </div>
      </div>
    `;
  },

  filterForwardContracts() {
    const year = document.getElementById('sales-fc-year')?.value || '2026-2027';
    const type = document.getElementById('sales-fc-type')?.value || 'Available';

    const filtered = this.forwardContractsDataset.filter(r => {
      const matchYear = !year || r.year === year;
      const matchType = type === 'All' || r.type === type;
      return matchYear && matchType;
    });

    this.renderForwardContractsRows(filtered);
    this.renderForwardContractsTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} forward contract positions`, 'info');
    }
  },

  searchForwardContracts(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderForwardContractsRows(this.forwardContractsDataset);
      this.renderForwardContractsTotals(this.forwardContractsDataset);
      return;
    }

    const filtered = this.forwardContractsDataset.filter(r => 
      (r.contractNumber || '').toLowerCase().includes(q) ||
      (r.month || '').toLowerCase().includes(q) ||
      (r.bookedDate || '').toLowerCase().includes(q) ||
      (r.company || '').toLowerCase().includes(q)
    );

    this.renderForwardContractsRows(filtered);
    this.renderForwardContractsTotals(filtered);
  },

  sortForwardContracts(key) {
    this.forwardContractsDataset.reverse();
    this.renderForwardContractsRows(this.forwardContractsDataset);
  },

  downloadForwardContractsExcel() {
    const headers = ['S.No', 'Booked Date', 'Spot Rate', 'Forward Contract No', 'Current Date', 'Diff', 'Start Date', 'End Date', 'Month', 'Booked Rate', 'Booked Value', 'Utilisation', 'Balance US$'];
    const rows = this.forwardContractsDataset.map(r => [
      r.sNo,
      `"${r.bookedDate}"`,
      r.spotRate,
      `"${r.contractNumber}"`,
      `"${r.currentDate}"`,
      r.diff,
      `"${r.startDate}"`,
      `"${r.endDate}"`,
      `"${r.month}"`,
      r.bookedRate,
      r.bookedValue,
      `"${r.utilisation}"`,
      r.balanceUsd
    ].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `forward_contracts_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported forward contracts register to Excel/CSV', 'success');
    }
  },

  recalculateFcRates() {
    const spot = parseFloat(document.getElementById('fc-input-spot-rate')?.value) || 0;
    const premium = parseFloat(document.getElementById('fc-input-premium-rate')?.value) || 0;
    const margin = parseFloat(document.getElementById('fc-input-branch-margin')?.value) || 0;
    const total = spot + premium + margin;
    const totalEl = document.getElementById('fc-input-total-rate');
    if (totalEl) {
      totalEl.value = total.toFixed(4);
    }
  },

  recalculateFcValues() {
    const val = parseFloat(document.getElementById('fc-input-value')?.value) || 0;
    const balanceEl = document.getElementById('fc-input-balance-value');
    if (balanceEl) {
      balanceEl.value = val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
  },

  openForwardContractModal(id) {
    const isEdit = Boolean(id);
    const record = isEdit 
      ? (this.forwardContractsDataset.find(x => x.id === id) || this.forwardContractsDataset[0])
      : {
          id: 'FC-' + Math.floor(100 + Math.random() * 900),
          company: 'DEVI FISHERIES LIMITED',
          bookedDate: new Date().toISOString().slice(0, 10),
          contractNumber: '1440726FP0B00' + Math.floor(342 + Math.random() * 50),
          bookedValue: 1000000.00,
          period: '2026-2027',
          month: 'November',
          startDate: '2026-11-16',
          endDate: '2026-12-15',
          spotRate: 95.5600,
          premiumRate: 0.5200,
          branchMargin: 0.0000,
          bookedRate: 96.0800,
          balanceUsd: 1000000.00,
          utilisation: '-'
        };

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Forward Contract: ${record.contractNumber}`);
      return;
    }

    Modal.open({
      title: 'FORWARD CONTRACT DETAILS',
      size: '2xl',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <!-- Breadcrumb (Matching Image 2) -->
          <div class="text-[11px] font-medium text-[#64748B]">
            Payments &nbsp;&gt;&nbsp; Forward Contracts &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">${isEdit ? 'Edit Contract' : 'Forward Contract Details'}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <!-- Row 1: Select Company, Booking Date, Forward Contract Number, Value -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">SELECT COMPANY <span class="text-[#EF4444]">*</span></label>
                <select id="fc-input-company" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="DEVI FISHERIES LIMITED" ${record.company === 'DEVI FISHERIES LIMITED' ? 'selected' : ''}>DEVI FISHERIES LIMITED</option>
                  <option value="DEVI AQUATECH PVT LTD" ${record.company === 'DEVI AQUATECH PVT LTD' ? 'selected' : ''}>DEVI AQUATECH PVT LTD</option>
                  <option value="SATYA SEAFOODS" ${record.company === 'SATYA SEAFOODS' ? 'selected' : ''}>SATYA SEAFOODS</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">BOOKING DATE <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="fc-input-booking-date" value="${record.bookedDate}" placeholder="dd/mm/yyyy" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">FORWARD CONTRACT NUMBER <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="fc-input-number" value="${record.contractNumber}" placeholder="Enter Forward Contract Number" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-mono font-bold text-xs text-[#006C7A] outline-none focus:border-[#006C7A]">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">VALUE <span class="text-[#EF4444]">*</span></label>
                <input type="number" id="fc-input-value" value="${record.bookedValue}" placeholder="Enter Value" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-extrabold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]" oninput="SalesView.recalculateFcValues()">
              </div>
            </div>

            <!-- Row 2: Period, Month, Start Date, End Date -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PERIOD</label>
                <select id="fc-input-period" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="2026-2027" ${record.year === '2026-2027' ? 'selected' : ''}>2026-2027</option>
                  <option value="2025-2026" ${record.year === '2025-2026' ? 'selected' : ''}>2025-2026</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">MONTH</label>
                <select id="fc-input-month" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="March" ${record.month === 'March' ? 'selected' : ''}>March</option>
                  <option value="April" ${record.month === 'April' ? 'selected' : ''}>April</option>
                  <option value="May" ${record.month === 'May' ? 'selected' : ''}>May</option>
                  <option value="June" ${record.month === 'June' ? 'selected' : ''}>June</option>
                  <option value="July" ${record.month === 'July' ? 'selected' : ''}>July</option>
                  <option value="August" ${record.month === 'August' ? 'selected' : ''}>August</option>
                  <option value="September" ${record.month === 'September' ? 'selected' : ''}>September</option>
                  <option value="October" ${record.month === 'October' ? 'selected' : ''}>October</option>
                  <option value="November" ${record.month === 'November' ? 'selected' : ''}>November</option>
                  <option value="December" ${record.month === 'December' ? 'selected' : ''}>December</option>
                  <option value="January" ${record.month === 'January' ? 'selected' : ''}>January</option>
                  <option value="February" ${record.month === 'February' ? 'selected' : ''}>February</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">START DATE <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="fc-input-start-date" value="${record.startDate}" placeholder="dd/mm/yyyy" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">END DATE <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="fc-input-end-date" value="${record.endDate}" placeholder="dd/mm/yyyy" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
            </div>

            <!-- Row 3: Spot Rate, Premium Rate, Branch Margin, Total Rate -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">SPOT RATE <span class="text-[#EF4444]">*</span></label>
                <input type="number" step="0.0001" id="fc-input-spot-rate" value="${record.spotRate || 95.56}" placeholder="Rate" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-mono font-bold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]" oninput="SalesView.recalculateFcRates()">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PREMIUM RATE</label>
                <input type="number" step="0.0001" id="fc-input-premium-rate" value="${record.premiumRate || 0.2775}" placeholder="PremiumRate" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-mono font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]" oninput="SalesView.recalculateFcRates()">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">BRANCH MARGIN <span class="text-[#EF4444]">*</span></label>
                <input type="number" step="0.0001" id="fc-input-branch-margin" value="${record.branchMargin || 0.0000}" placeholder="Enter Branch Margin" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-mono font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]" oninput="SalesView.recalculateFcRates()">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">TOTAL RATE <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="fc-input-total-rate" value="${(record.bookedRate || 95.8375).toFixed(4)}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-mono font-black text-xs text-[#006C7A] outline-none">
              </div>
            </div>

            <!-- Row 4: Balance Value, Utilized Value -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">BALANCE VALUE</label>
                <input type="text" id="fc-input-balance-value" value="${(record.balanceUsd || 1000000).toLocaleString(undefined, { minimumFractionDigits: 2 })}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-extrabold text-xs text-[#0F172A] outline-none">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">UTILIZED VALUE</label>
                <input type="text" id="fc-input-utilized-value" value="${record.utilisation === '-' ? '0.00' : record.utilisation}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#64748B] outline-none">
              </div>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Close',
          type: 'danger',
          onClick: (m) => m.close()
        },
        {
          label: isEdit ? 'Save Changes' : 'Add',
          type: 'primary',
          onClick: (m) => SalesView.saveForwardContract(record.id, isEdit)
        }
      ]
    });
  },

  saveForwardContract(id, isEdit) {
    const company = document.getElementById('fc-input-company')?.value || 'DEVI FISHERIES LIMITED';
    const bookedDate = document.getElementById('fc-input-booking-date')?.value || '23-10-2026';
    const contractNumber = document.getElementById('fc-input-number')?.value || '1440726FP0B00342';
    const bookedValue = parseFloat(document.getElementById('fc-input-value')?.value) || 1000000;
    const period = document.getElementById('fc-input-period')?.value || '2026-2027';
    const month = document.getElementById('fc-input-month')?.value || 'November';
    const startDate = document.getElementById('fc-input-start-date')?.value || '16-11-2026';
    const endDate = document.getElementById('fc-input-end-date')?.value || '15-12-2026';
    const spotRate = parseFloat(document.getElementById('fc-input-spot-rate')?.value) || 95.56;
    const premiumRate = parseFloat(document.getElementById('fc-input-premium-rate')?.value) || 0.52;
    const branchMargin = parseFloat(document.getElementById('fc-input-branch-margin')?.value) || 0.0;
    const bookedRate = spotRate + premiumRate + branchMargin;

    if (isEdit) {
      const rec = this.forwardContractsDataset.find(x => x.id === id);
      if (rec) {
        rec.company = company;
        rec.bookedDate = bookedDate;
        rec.contractNumber = contractNumber;
        rec.bookedValue = bookedValue;
        rec.period = period;
        rec.month = month;
        rec.startDate = startDate;
        rec.endDate = endDate;
        rec.spotRate = spotRate;
        rec.premiumRate = premiumRate;
        rec.branchMargin = branchMargin;
        rec.bookedRate = bookedRate;
        rec.balanceUsd = bookedValue;
      }
    } else {
      const newRec = {
        sNo: this.forwardContractsDataset.length + 1,
        id: id || ('FC-' + (340 + this.forwardContractsDataset.length)),
        bookedDate: bookedDate,
        spotRate: spotRate,
        contractNumber: contractNumber,
        currentDate: '23-10-2026',
        diff: 30,
        startDate: startDate,
        endDate: endDate,
        month: month,
        bookedRate: bookedRate,
        premiumRate: premiumRate,
        branchMargin: branchMargin,
        bookedValue: bookedValue,
        utilisation: '-',
        balanceUsd: bookedValue,
        company: company,
        year: period,
        type: 'Available'
      };
      this.forwardContractsDataset.unshift(newRec);
      // re-index sNo
      this.forwardContractsDataset.forEach((r, idx) => r.sNo = idx + 1);
    }

    this.renderForwardContractsRows(this.forwardContractsDataset);
    this.renderForwardContractsTotals(this.forwardContractsDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(isEdit ? `Updated Forward Contract #${contractNumber}` : `Added New Forward Contract #${contractNumber}`, 'success');
    }
  },


  // ==========================================
  // 6. COLLECTIONS REGISTER (IMAGE 1)
  // ==========================================
  collectionsDataset: [
    {
      sNo: 357,
      id: '7196',
      invNo: 'DFL/SNM/2627/145',
      poNo: 'DF 1580',
      consigneeName: 'MARK FOODS LLC',
      bankRefNo: '-',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      invoiceAmount: 125000.00
    },
    {
      sNo: 353,
      id: '7183',
      invNo: 'DFL/SNM/2627/143',
      poNo: 'C10894',
      consigneeName: 'SEA PORT PRODUCTS CORPORATION',
      bankRefNo: '-',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      invoiceAmount: 110500.00
    },
    {
      sNo: 8,
      id: '7173',
      invNo: 'DFL/KKD/2627/151',
      poNo: 'QL150-2026Y37-315',
      consigneeName: 'Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.',
      bankRefNo: '-',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      invoiceAmount: 95256.00
    },
    {
      sNo: 7,
      id: '7172',
      invNo: 'DFL/KKD/2627/152',
      poNo: 'QL150-2026Y37-314',
      consigneeName: 'Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.',
      bankRefNo: '-',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      invoiceAmount: 98172.00
    },
    {
      sNo: 4,
      id: '7171',
      invNo: 'DFL/KKD/2627/155',
      poNo: 'QL150-2026Y37-313',
      consigneeName: 'Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.',
      bankRefNo: '-',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      invoiceAmount: 98172.00
    }
  ],

  renderCollections(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">COLLECTIONS LIST</h2>
        </div>

        <!-- 2. Clean Search & Filters Card (Exact to Image 1) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Year:</label>
              <select id="sales-col-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Exporter:</label>
              <select id="sales-col-exporter" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUATECH PVT LTD">DEVI AQUATECH PVT LTD</option>
                <option value="SATYA SEAFOODS">SATYA SEAFOODS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Buyer:</label>
              <select id="sales-col-buyer" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="MARK FOODS LLC">MARK FOODS LLC</option>
                <option value="SEA PORT PRODUCTS CORPORATION">SEA PORT PRODUCTS CORPORATION</option>
                <option value="Quanlian Aquatic Products Collection (Guangdong) Co., Ltd.">Quanlian Aquatic Products Collection</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Country:</label>
              <select id="sales-col-country" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="U.S.A.">U.S.A.</option>
                <option value="CHINA">CHINA</option>
                <option value="BELGIUM">BELGIUM</option>
                <option value="RUSSIA">RUSSIA</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Status</label>
              <select id="sales-col-status" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="Pending" selected>Pending</option>
                <option value="Lodged">Lodged</option>
                <option value="All">All</option>
              </select>
            </div>
          </div>

          <div class="flex justify-center pt-1">
            <button id="btn-col-search" class="px-7 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterCollections()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>

        <!-- 3. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-col-search-input" 
                placeholder="Search collections..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchCollections(this.value)"
              />
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#006C7A] hover:text-[#005662] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadCollectionsExcel()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Download Excel</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-3">S.No</th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">InvNo</th>
                  <th class="py-3 px-3">Po No.</th>
                  <th class="py-3 px-3">Consignee Name</th>
                  <th class="py-3 px-3">Bank Ref No</th>
                  <th class="py-3 px-3 text-center">Status</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-col-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-col-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderCollectionsRows(this.collectionsDataset);
    this.renderCollectionsTotals(this.collectionsDataset);
  },

  renderCollectionsRows(list) {
    const tbody = document.getElementById('sales-col-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="py-8 text-center text-[#64748B] text-xs">
            No collection records found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo}</td>
        <td class="py-3 px-3 font-mono font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openCollectionModal('${r.id}')">${r.id}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A] hover:text-[#006C7A] cursor-pointer" onclick="SalesView.openCollectionModal('${r.id}')">${r.invNo}</td>
        <td class="py-3 px-3 font-semibold text-[#475569]">${r.poNo}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A]">${r.consigneeName}</td>
        <td class="py-3 px-3 font-mono text-[#64748B]">${r.bankRefNo || '-'}</td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#FEE2E2] text-[#DC2626] border border-[#FECDD3]">${r.status}</span>
        </td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <button 
            type="button" 
            class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
            title="Record Bank Lodgement" 
            onclick="SalesView.openCollectionModal('${r.id}')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderCollectionsTotals(list) {
    const el = document.getElementById('sales-col-totals');
    if (!el) return;

    const count = list.length;
    const pending = list.filter(x => x.status === 'Pending').length;
    const totalVal = list.reduce((sum, r) => sum + (Number(r.invoiceAmount) || 0), 0);

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Bills in Collection</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Invoices</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Bank Lodgement</div>
          <div class="text-lg font-black text-[#DC2626] mt-0.5">${pending} <span class="text-xs font-semibold text-[#DC2626]">Pending</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Ledger Value</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">$${totalVal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Collecting Bank Entity</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">SBI Commercial <span class="text-[11px] font-semibold text-[#64748B]">(IFSC: SBIN0004130)</span></div>
        </div>
      </div>
    `;
  },

  filterCollections() {
    const buyer = document.getElementById('sales-col-buyer')?.value || 'All';
    const country = document.getElementById('sales-col-country')?.value || 'All';
    const status = document.getElementById('sales-col-status')?.value || 'All';

    const filtered = this.collectionsDataset.filter(r => {
      const matchBuyer = buyer === 'All' || r.consigneeName === buyer;
      const matchCountry = country === 'All' || r.country === country;
      const matchStatus = status === 'All' || r.status === status;
      return matchBuyer && matchCountry && matchStatus;
    });

    this.renderCollectionsRows(filtered);
    this.renderCollectionsTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} collection records`, 'info');
    }
  },

  searchCollections(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderCollectionsRows(this.collectionsDataset);
      this.renderCollectionsTotals(this.collectionsDataset);
      return;
    }

    const filtered = this.collectionsDataset.filter(r => 
      (r.invNo || '').toLowerCase().includes(q) ||
      (r.id || '').toLowerCase().includes(q) ||
      (r.poNo || '').toLowerCase().includes(q) ||
      (r.consigneeName || '').toLowerCase().includes(q)
    );

    this.renderCollectionsRows(filtered);
    this.renderCollectionsTotals(filtered);
  },

  downloadCollectionsExcel() {
    const headers = ['S.No', 'ID', 'InvNo', 'Po No.', 'Consignee Name', 'Bank Ref No', 'Status', 'Invoice Amount'];
    const rows = this.collectionsDataset.map(r => [
      r.sNo,
      r.id,
      `"${r.invNo}"`,
      `"${r.poNo}"`,
      `"${r.consigneeName}"`,
      `"${r.bankRefNo}"`,
      r.status,
      r.invoiceAmount
    ].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `collections_register_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported collections register to Excel/CSV', 'success');
    }
  },

  openCollectionModal(id) {
    const record = this.collectionsDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Collection Invoice: ${record.invNo}`);
      return;
    }

    Modal.open({
      title: 'BANK LODGEMENT & COLLECTION ENTRY',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Payments &nbsp;&gt;&nbsp; Collections &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">${record.invNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Invoice Number</label>
                <input type="text" value="${record.invNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#006C7A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PO Number</label>
                <input type="text" value="${record.poNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Consignee</label>
                <input type="text" value="${record.consigneeName}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#0F172A] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Lodgement Bank <span class="text-[#EF4444]">*</span></label>
                <select id="col-modal-bank" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="State Bank of India (Commercial Br)" selected>State Bank of India (Commercial Br)</option>
                  <option value="HDFC Bank Limited">HDFC Bank Limited</option>
                  <option value="Canara Bank Foreign Exchange">Canara Bank Foreign Exchange</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Bank Reference No <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="col-modal-bank-ref" value="${record.bankRefNo === '-' ? ('1440726TP0B00' + Math.floor(420 + Math.random() * 50)) : record.bankRefNo}" placeholder="Enter Bank Ref No" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-mono font-bold text-xs text-[#006C7A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Lodgement Status</label>
                <select id="col-modal-status" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Lodged" selected>Lodged With Bank</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Courier AWB / Tracking Reference</label>
              <input type="text" id="col-modal-courier" value="DHL Express #8491029314" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Close',
          type: 'danger',
          onClick: (m) => m.close()
        },
        {
          label: 'Save Lodgement',
          type: 'primary',
          onClick: (m) => SalesView.saveCollection(record.id)
        }
      ]
    });
  },

  saveCollection(id) {
    const record = this.collectionsDataset.find(x => x.id === id);
    if (!record) return;

    const bankRef = document.getElementById('col-modal-bank-ref')?.value;
    const status = document.getElementById('col-modal-status')?.value;

    if (bankRef) record.bankRefNo = bankRef;
    if (status) record.status = status;

    this.renderCollectionsRows(this.collectionsDataset);
    this.renderCollectionsTotals(this.collectionsDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Saved bank lodgement for ${record.invNo}`, 'success');
    }
  },

  // ==========================================
  // 7. NEGOTIATIONS REGISTER (IMAGE 2)
  // ==========================================
  negotiationsDataset: [
    {
      sNo: 1,
      id: '6228',
      invNo: 'DFL/JPT/2627/163',
      poNo: '1102650572',
      consigneeName: 'C.P. FOOD PRODUCTS, INC.',
      bankRefNo: '-',
      invoiceStatus: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      negotiatedValue: 142000.00
    },
    {
      sNo: 2,
      id: '6229',
      invNo: 'DFL/JPT/2627/164',
      poNo: '1102650573',
      consigneeName: 'C.P. FOOD PRODUCTS, INC.',
      bankRefNo: '1440726TP0B00421',
      invoiceStatus: 'Negotiated',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      negotiatedValue: 138500.00
    },
    {
      sNo: 3,
      id: '6230',
      invNo: 'DFL/KKD/2627/165',
      poNo: 'DF-1590',
      consigneeName: 'MARK FOODS LLC',
      bankRefNo: '-',
      invoiceStatus: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      negotiatedValue: 121000.00
    }
  ],

  renderNegotiations(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">NEGOTIATIONS LIST</h2>
        </div>

        <!-- 2. Clean Search & Filters Card (Exact to Image 2) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Year:</label>
              <select id="sales-neg-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Exporter:</label>
              <select id="sales-neg-exporter" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUATECH PVT LTD">DEVI AQUATECH PVT LTD</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Consignee:</label>
              <select id="sales-neg-consignee" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
                <option value="MARK FOODS LLC">MARK FOODS LLC</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Country:</label>
              <select id="sales-neg-country" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="U.S.A.">U.S.A.</option>
                <option value="CHINA">CHINA</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Invoice Status</label>
              <select id="sales-neg-status" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="Pending" selected>Pending</option>
                <option value="Negotiated">Negotiated</option>
                <option value="All">All</option>
              </select>
            </div>
          </div>

          <div class="flex justify-center pt-1">
            <button id="btn-neg-search" class="px-7 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterNegotiations()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>

        <!-- 3. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-neg-search-input" 
                placeholder="Search negotiations..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchNegotiations(this.value)"
              />
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#006C7A] hover:text-[#005662] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadNegotiationsExcel()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Download Excel</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-3">S.No</th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">InvNo</th>
                  <th class="py-3 px-3">Po No.</th>
                  <th class="py-3 px-3">Consignee Name</th>
                  <th class="py-3 px-3">Bank Ref No</th>
                  <th class="py-3 px-3 text-center">Invoice Status</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-neg-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-neg-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderNegotiationsRows(this.negotiationsDataset);
    this.renderNegotiationsTotals(this.negotiationsDataset);
  },

  renderNegotiationsRows(list) {
    const tbody = document.getElementById('sales-neg-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="py-8 text-center text-[#64748B] text-xs">
            No negotiation records found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => {
      const isNegotiated = r.invoiceStatus === 'Negotiated';
      const statusBadge = isNegotiated
        ? `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">Negotiated</span>`
        : `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#FEE2E2] text-[#DC2626] border border-[#FECDD3]">Pending</span>`;

      return `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
          <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo}</td>
          <td class="py-3 px-3 font-mono font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openNegotiationModal('${r.id}')">${r.id}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A] hover:text-[#006C7A] cursor-pointer" onclick="SalesView.openNegotiationModal('${r.id}')">${r.invNo}</td>
          <td class="py-3 px-3 font-semibold text-[#475569]">${r.poNo}</td>
          <td class="py-3 px-3 font-bold text-[#0F172A]">${r.consigneeName}</td>
          <td class="py-3 px-3 font-mono text-[#64748B]">${r.bankRefNo || '-'}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">${statusBadge}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">
            <div class="flex items-center justify-center gap-1.5">
              <button 
                type="button" 
                class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
                title="Record LC Negotiation / Discounting" 
                onclick="SalesView.openNegotiationModal('${r.id}')"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
              </button>
              <button 
                type="button" 
                class="w-6 h-6 inline-flex items-center justify-center text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded cursor-pointer transition-colors" 
                title="View Details" 
                onclick="SalesView.openNegotiationModal('${r.id}')"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderNegotiationsTotals(list) {
    const el = document.getElementById('sales-neg-totals');
    if (!el) return;

    const count = list.length;
    const completed = list.filter(x => x.invoiceStatus === 'Negotiated').length;
    const pending = count - completed;

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total LC Negotiations</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Bills</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Discounted / Negotiated</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${completed} <span class="text-xs font-semibold text-[#006644]">Done</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Discounting</div>
          <div class="text-lg font-black text-[#DC2626] mt-0.5">${pending} <span class="text-xs font-semibold text-[#DC2626]">Pending</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Negotiating Bank Entity</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">Standard Chartered <span class="text-[11px] font-semibold text-[#64748B]">(Foreign Dept)</span></div>
        </div>
      </div>
    `;
  },

  filterNegotiations() {
    const consignee = document.getElementById('sales-neg-consignee')?.value || 'All';
    const status = document.getElementById('sales-neg-status')?.value || 'All';

    const filtered = this.negotiationsDataset.filter(r => {
      const matchConsignee = consignee === 'All' || r.consigneeName === consignee;
      const matchStatus = status === 'All' || r.invoiceStatus === status;
      return matchConsignee && matchStatus;
    });

    this.renderNegotiationsRows(filtered);
    this.renderNegotiationsTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} negotiation records`, 'info');
    }
  },

  searchNegotiations(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderNegotiationsRows(this.negotiationsDataset);
      this.renderNegotiationsTotals(this.negotiationsDataset);
      return;
    }

    const filtered = this.negotiationsDataset.filter(r => 
      (r.invNo || '').toLowerCase().includes(q) ||
      (r.id || '').toLowerCase().includes(q) ||
      (r.poNo || '').toLowerCase().includes(q) ||
      (r.consigneeName || '').toLowerCase().includes(q)
    );

    this.renderNegotiationsRows(filtered);
    this.renderNegotiationsTotals(filtered);
  },

  downloadNegotiationsExcel() {
    const headers = ['S.No', 'ID', 'InvNo', 'Po No.', 'Consignee Name', 'Bank Ref No', 'Invoice Status'];
    const rows = this.negotiationsDataset.map(r => [
      r.sNo,
      r.id,
      `"${r.invNo}"`,
      `"${r.poNo}"`,
      `"${r.consigneeName}"`,
      `"${r.bankRefNo}"`,
      r.invoiceStatus
    ].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `negotiations_register_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported negotiations register to Excel/CSV', 'success');
    }
  },

  openNegotiationModal(id) {
    const record = this.negotiationsDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Negotiation Invoice: ${record.invNo}`);
      return;
    }

    Modal.open({
      title: 'DOCUMENT NEGOTIATION & LC DISCOUNTING',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Payments &nbsp;&gt;&nbsp; Negotiations &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">${record.invNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Invoice Number</label>
                <input type="text" value="${record.invNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#006C7A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Buyer / Consignee</label>
                <input type="text" value="${record.consigneeName}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">PO Reference</label>
                <input type="text" value="${record.poNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#475569] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Negotiating Bank Entity <span class="text-[#EF4444]">*</span></label>
                <select id="neg-modal-bank" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Standard Chartered Bank" selected>Standard Chartered Bank</option>
                  <option value="State Bank of India">State Bank of India</option>
                  <option value="Citibank N.A.">Citibank N.A.</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Bank Reference No <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="neg-modal-bank-ref" value="${record.bankRefNo === '-' ? ('1440726TP0B00' + Math.floor(430 + Math.random() * 50)) : record.bankRefNo}" placeholder="Enter Bank Ref No" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-mono font-bold text-xs text-[#006C7A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Negotiation Status</label>
                <select id="neg-modal-status" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Negotiated" selected>Negotiated / Discounted</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Interest & Discounting Terms</label>
              <textarea id="neg-modal-notes" rows="2" class="w-full p-2 rounded-lg border border-[#CBD5E1] bg-white font-medium text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">SOFR + 1.25% margin applied. Clean document set negotiated under irrevocable documentary letter of credit.</textarea>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Close',
          type: 'danger',
          onClick: (m) => m.close()
        },
        {
          label: 'Save Negotiation',
          type: 'primary',
          onClick: (m) => SalesView.saveNegotiation(record.id)
        }
      ]
    });
  },

  saveNegotiation(id) {
    const record = this.negotiationsDataset.find(x => x.id === id);
    if (!record) return;

    const bankRef = document.getElementById('neg-modal-bank-ref')?.value;
    const status = document.getElementById('neg-modal-status')?.value;

    if (bankRef) record.bankRefNo = bankRef;
    if (status) record.invoiceStatus = status;

    this.renderNegotiationsRows(this.negotiationsDataset);
    this.renderNegotiationsTotals(this.negotiationsDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Saved negotiation for ${record.invNo}`, 'success');
    }
  },

  // ==========================================
  // 8. REALIZATION REGISTER (IMAGE 3)
  // ==========================================
  realizationDataset: [
    {
      sNo: 1,
      invoiceNo: 'DFL/SNM/2627/145',
      invoiceDate: '12-08-2026',
      transactionType: 'Collections',
      consigneeName: 'MARK FOODS LLC',
      bankRef: '1440726TP0B00425',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      valueUsd: 125000.00
    },
    {
      sNo: 2,
      invoiceNo: 'DFL/SNM/2627/143',
      invoiceDate: '10-08-2026',
      transactionType: 'Collections',
      consigneeName: 'SEA PORT PRODUCTS CORPORATION',
      bankRef: '1440726TP0B00426',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      valueUsd: 110500.00
    },
    {
      sNo: 3,
      invoiceNo: 'DFL/JPT/2627/163',
      invoiceDate: '05-08-2026',
      transactionType: 'Negotiations',
      consigneeName: 'C.P. FOOD PRODUCTS, INC.',
      bankRef: '1440726TP0B00427',
      status: 'Pending',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'U.S.A.',
      valueUsd: 142000.00
    }
  ],

  renderRealization(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">REALIZATION</h2>
        </div>

        <!-- 2. Clean Search & Filters Card (Exact to Image 3) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Year:</label>
              <select id="sales-real-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Exporter:</label>
              <select id="sales-real-exporter" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUATECH PVT LTD">DEVI AQUATECH PVT LTD</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Consignee:</label>
              <select id="sales-real-consignee" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="MARK FOODS LLC">MARK FOODS LLC</option>
                <option value="SEA PORT PRODUCTS CORPORATION">SEA PORT PRODUCTS CORPORATION</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Country:</label>
              <select id="sales-real-country" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="U.S.A.">U.S.A.</option>
                <option value="CHINA">CHINA</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-3">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Invoice Status</label>
              <select id="sales-real-status" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="Pending" selected>Pending</option>
                <option value="Realized">Realized</option>
                <option value="All">All</option>
              </select>
            </div>
          </div>

          <div class="flex justify-center pt-1">
            <button id="btn-real-search" class="px-7 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterRealization()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>

        <!-- 3. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-real-search-input" 
                placeholder="Search realization..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchRealization(this.value)"
              />
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#006C7A] hover:text-[#005662] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadRealizationExcel()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Download Excel</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-3">S.No</th>
                  <th class="py-3 px-3">Invoice No.</th>
                  <th class="py-3 px-3">Invoice Date</th>
                  <th class="py-3 px-3">Transaction Type</th>
                  <th class="py-3 px-3">Consignee Name</th>
                  <th class="py-3 px-3">Bank Ref</th>
                  <th class="py-3 px-3 text-center">Status</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-real-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-real-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderRealizationRows(this.realizationDataset);
    this.renderRealizationTotals(this.realizationDataset);
  },

  renderRealizationRows(list) {
    const tbody = document.getElementById('sales-real-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="py-8 text-center text-[#64748B] text-xs font-semibold">
            No data available in table
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
        <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openRealizationModal('${r.invoiceNo}')">${r.invoiceNo}</td>
        <td class="py-3 px-3 text-[#475569] whitespace-nowrap">${r.invoiceDate}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.transactionType}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A]">${r.consigneeName}</td>
        <td class="py-3 px-3 font-mono font-semibold text-[#006C7A]">${r.bankRef}</td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#FEE2E2] text-[#DC2626] border border-[#FECDD3]">${r.status}</span>
        </td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <button 
            type="button" 
            class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
            title="Record e-BRC / Inward Remittance" 
            onclick="SalesView.openRealizationModal('${r.invoiceNo}')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderRealizationTotals(list) {
    const el = document.getElementById('sales-real-totals');
    if (!el) return;

    const count = list.length;
    const totalVal = list.reduce((sum, r) => sum + (Number(r.valueUsd) || 0), 0);

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Awaiting Inward Remittance</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Invoices</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Unrealized Export Value</div>
          <div class="text-lg font-black text-[#DC2626] mt-0.5">$${totalVal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">RBI EDPMS Limit Threshold</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">270 Days <span class="text-xs font-semibold text-[#006644]">Compliant</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">AD Code Entity</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">0290048 <span class="text-[11px] font-semibold text-[#64748B]">(SBI Overseas)</span></div>
        </div>
      </div>
    `;
  },

  filterRealization() {
    const consignee = document.getElementById('sales-real-consignee')?.value || 'All';
    const status = document.getElementById('sales-real-status')?.value || 'Pending';

    const filtered = this.realizationDataset.filter(r => {
      const matchConsignee = consignee === 'All' || r.consigneeName === consignee;
      const matchStatus = status === 'All' || r.status === status;
      return matchConsignee && matchStatus;
    });

    this.renderRealizationRows(filtered);
    this.renderRealizationTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} realization records`, 'info');
    }
  },

  searchRealization(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderRealizationRows(this.realizationDataset);
      this.renderRealizationTotals(this.realizationDataset);
      return;
    }

    const filtered = this.realizationDataset.filter(r => 
      (r.invoiceNo || '').toLowerCase().includes(q) ||
      (r.consigneeName || '').toLowerCase().includes(q) ||
      (r.bankRef || '').toLowerCase().includes(q)
    );

    this.renderRealizationRows(filtered);
    this.renderRealizationTotals(filtered);
  },

  downloadRealizationExcel() {
    const headers = ['S.No', 'Invoice No.', 'Invoice Date', 'Transaction Type', 'Consignee Name', 'Bank Ref', 'Status', 'Value USD'];
    const rows = this.realizationDataset.map(r => [
      r.sNo,
      `"${r.invoiceNo}"`,
      `"${r.invoiceDate}"`,
      `"${r.transactionType}"`,
      `"${r.consigneeName}"`,
      `"${r.bankRef}"`,
      r.status,
      r.valueUsd
    ].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `realization_register_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported realization register to Excel/CSV', 'success');
    }
  },

  openRealizationModal(invoiceNo) {
    const record = this.realizationDataset.find(x => x.invoiceNo === invoiceNo);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Realization for: ${record.invoiceNo}`);
      return;
    }

    Modal.open({
      title: 'RECORD STATUTORY REALIZATION & e-BRC',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Payments &nbsp;&gt;&nbsp; Realization &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">${record.invoiceNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Invoice Number</label>
                <input type="text" value="${record.invoiceNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#006C7A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Buyer / Consignee</label>
                <input type="text" value="${record.consigneeName}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Transaction Type</label>
                <input type="text" value="${record.transactionType}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#475569] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Bank Reference No</label>
                <input type="text" value="${record.bankRef}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-mono font-bold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Realized Amount (USD) <span class="text-[#EF4444]">*</span></label>
                <input type="number" id="real-modal-usd" value="${record.valueUsd}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-extrabold text-xs text-[#006644] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">e-BRC Certificate Number <span class="text-[#EF4444]">*</span></label>
                <input type="text" id="real-modal-brc" value="BRC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-mono font-bold text-xs text-[#006C7A] outline-none focus:border-[#006C7A]">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Date of Remittance Receipt <span class="text-[#EF4444]">*</span></label>
                <input type="date" id="real-modal-date" value="${new Date().toISOString().slice(0, 10)}" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">EDPMS Status</label>
                <select id="real-modal-status" class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-white font-semibold text-xs text-[#0F172A] outline-none focus:border-[#006C7A]">
                  <option value="Realized" selected>Realized & Closed in EDPMS</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Close',
          type: 'danger',
          onClick: (m) => m.close()
        },
        {
          label: 'Save Realization',
          type: 'primary',
          onClick: (m) => SalesView.saveRealization(record.invoiceNo)
        }
      ]
    });
  },

  saveRealization(invoiceNo) {
    const record = this.realizationDataset.find(x => x.invoiceNo === invoiceNo);
    if (!record) return;

    const brc = document.getElementById('real-modal-brc')?.value;
    const dateOfReceipt = document.getElementById('real-modal-date')?.value || '23-10-2026';
    const realizedVal = parseFloat(document.getElementById('real-modal-usd')?.value) || record.valueUsd;

    // Move to Realization Done
    const doneItem = {
      slNo: this.realizationDoneDataset.length + 1,
      invoiceNo: record.invoiceNo,
      consignee: record.consigneeName,
      salesInvoiceDate: record.invoiceDate,
      transactionType: record.transactionType,
      totalInvoiceValue: record.valueUsd,
      realisedValue: realizedVal,
      dateOfDiscounting: '-',
      bankRefNo: record.bankRef,
      dateOfReceipt: dateOfReceipt,
      year: record.year || '2026-2027',
      exporter: record.exporter || 'DEVI FISHERIES LIMITED',
      country: record.country || 'U.S.A.',
      billsType: record.transactionType
    };

    this.realizationDoneDataset.unshift(doneItem);
    this.realizationDoneDataset.forEach((r, idx) => r.slNo = idx + 1);

    // Remove from pending realization
    this.realizationDataset = this.realizationDataset.filter(x => x.invoiceNo !== invoiceNo);

    this.renderRealizationRows(this.realizationDataset);
    this.renderRealizationTotals(this.realizationDataset);

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Successfully recorded e-BRC ${brc} for ${record.invoiceNo}`, 'success');
    }
  },

  // ==========================================
  // 9. REALIZATION DONE REGISTER (IMAGE 4)
  // ==========================================
  realizationDoneDataset: [
    {
      slNo: 1,
      invoiceNo: 'DFL/VSP/2627/004',
      consignee: 'ZHEJIANG YIWU CHINA COMMODITY CITY IMPORT AND EXPORT CO.,LTD',
      salesInvoiceDate: '28-07-2026',
      transactionType: 'Collections',
      totalInvoiceValue: 101865.60,
      realisedValue: 101865.60,
      dateOfDiscounting: '-',
      bankRefNo: '1440726TP0B00419',
      dateOfReceipt: '29-07-2026',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      billsType: 'Collections'
    },
    {
      slNo: 2,
      invoiceNo: 'DFL/VSP/2627/003',
      consignee: 'ZHEJIANG YIWU CHINA COMMODITY CITY IMPORT AND EXPORT CO.,LTD',
      salesInvoiceDate: '28-07-2026',
      transactionType: 'Collections',
      totalInvoiceValue: 101865.60,
      realisedValue: 101865.60,
      dateOfDiscounting: '-',
      bankRefNo: '1440726TP0B00419',
      dateOfReceipt: '29-07-2026',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      billsType: 'Collections'
    },
    {
      slNo: 3,
      invoiceNo: 'DFL/KKD/2627/134',
      consignee: 'ZHANJIANG ZHANXIN AQUATIC PRODUCT CO., LTD',
      salesInvoiceDate: '17-08-2026',
      transactionType: 'Collections',
      totalInvoiceValue: 95256.00,
      realisedValue: 95256.00,
      dateOfDiscounting: '-',
      bankRefNo: '1440726DU0B03805',
      dateOfReceipt: '10-09-2026',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      billsType: 'Collections'
    },
    {
      slNo: 4,
      invoiceNo: 'DFL/KKD/2627/130',
      consignee: 'ZHANJIANG ZHANXIN AQUATIC PRODUCT CO., LTD',
      salesInvoiceDate: '07-08-2026',
      transactionType: 'Collections',
      totalInvoiceValue: 98172.00,
      realisedValue: 98172.00,
      dateOfDiscounting: '-',
      bankRefNo: '1440726DU0B03806',
      dateOfReceipt: '07-09-2026',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      billsType: 'Collections'
    },
    {
      slNo: 5,
      invoiceNo: 'DFL/KKD/2627/124',
      consignee: 'ZHANJIANG ZHANXIN AQUATIC PRODUCT CO., LTD',
      salesInvoiceDate: '24-07-2026',
      transactionType: 'Collections',
      totalInvoiceValue: 98172.00,
      realisedValue: 98172.00,
      dateOfDiscounting: '-',
      bankRefNo: '1440726DU0B03535',
      dateOfReceipt: '03-09-2026',
      year: '2026-2027',
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'CHINA',
      billsType: 'Collections'
    }
  ],

  renderRealizationDone(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">REALIZATION DONE</h2>
        </div>

        <!-- 2. Clean Search & Filters Card (Exact to Image 4) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-4">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT YEAR</label>
              <select id="sales-rd-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT EXPORTER :</label>
              <select id="sales-rd-exporter" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUATECH PVT LTD">DEVI AQUATECH PVT LTD</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">SELECT COUNTRY:</label>
              <select id="sales-rd-country" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="CHINA">CHINA</option>
                <option value="U.S.A.">U.S.A.</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">BILLS TYPE:</label>
              <select id="sales-rd-bills-type" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="Collections">Collections</option>
                <option value="Negotiations">Negotiations</option>
              </select>
            </div>
          </div>

          <div class="flex justify-start pt-1">
            <button id="btn-rd-search" class="px-7 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterRealizationDone()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>

        <!-- 3. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-rd-search-input" 
                placeholder="Search realized payments..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchRealizationDone(this.value)"
              />
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#006C7A] hover:text-[#005662] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadRealizationDoneExcel()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Download Excel</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider whitespace-nowrap">
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortRealizationDone('slNo')">
                    <span class="inline-flex items-center gap-1">Sl.No. <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3">Invoice NO</th>
                  <th class="py-3 px-3">Consignee</th>
                  <th class="py-3 px-3">Sales Invoice Date</th>
                  <th class="py-3 px-3">Transaction Type</th>
                  <th class="py-3 px-3 text-right">Total Invoice Value$</th>
                  <th class="py-3 px-3 text-right">Realised Value$</th>
                  <th class="py-3 px-3 text-center">Date Of Discounting With Bank</th>
                  <th class="py-3 px-3">Bank Ref No</th>
                  <th class="py-3 px-3">Date Of Receipt Of Payment-1</th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-rd-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-rd-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderRealizationDoneRows(this.realizationDoneDataset);
    this.renderRealizationDoneTotals(this.realizationDoneDataset);
  },

  renderRealizationDoneRows(list) {
    const tbody = document.getElementById('sales-rd-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="11" class="py-8 text-center text-[#64748B] text-xs">
            No realized payment records found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.slNo || (idx + 1)}</td>
        <td class="py-3 px-3 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openRealizationDoneModal('${r.invoiceNo}')">${r.invoiceNo}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A]">${r.consignee}</td>
        <td class="py-3 px-3 font-semibold text-[#475569] whitespace-nowrap">${r.salesInvoiceDate}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.transactionType}</td>
        <td class="py-3 px-3 font-extrabold text-[#006644] text-right">$${(r.totalInvoiceValue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td class="py-3 px-3 font-extrabold text-[#006644] text-right">$${(r.realisedValue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td class="py-3 px-3 text-[#64748B] text-center font-medium">${r.dateOfDiscounting || '-'}</td>
        <td class="py-3 px-3 font-mono font-semibold text-[#006C7A] whitespace-nowrap">${r.bankRefNo}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A] whitespace-nowrap">${r.dateOfReceipt}</td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <button 
            type="button" 
            class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
            title="View Realization Breakdown" 
            onclick="SalesView.openRealizationDoneModal('${r.invoiceNo}')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderRealizationDoneTotals(list) {
    const el = document.getElementById('sales-rd-totals');
    if (!el) return;

    const count = list.length;
    const totalVal = list.reduce((sum, r) => sum + (Number(r.totalInvoiceValue) || 0), 0);
    const totalRealised = list.reduce((sum, r) => sum + (Number(r.realisedValue) || 0), 0);

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Realized Invoices</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Paid In Full</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Realized USD</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">$${totalRealised.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Foreign Inward BRC Status</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">100% <span class="text-xs font-semibold text-[#006C7A]">Certified</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Key Clearing Bank Entity</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">SBI Commercial <span class="text-[11px] font-semibold text-[#64748B]">(FIRC Settled)</span></div>
        </div>
      </div>
    `;
  },

  filterRealizationDone() {
    const country = document.getElementById('sales-rd-country')?.value || 'All';
    const billsType = document.getElementById('sales-rd-bills-type')?.value || 'All';

    const filtered = this.realizationDoneDataset.filter(r => {
      const matchCountry = country === 'All' || r.country === country;
      const matchType = billsType === 'All' || r.billsType === billsType;
      return matchCountry && matchType;
    });

    this.renderRealizationDoneRows(filtered);
    this.renderRealizationDoneTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} completed realization records`, 'info');
    }
  },

  searchRealizationDone(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderRealizationDoneRows(this.realizationDoneDataset);
      this.renderRealizationDoneTotals(this.realizationDoneDataset);
      return;
    }

    const filtered = this.realizationDoneDataset.filter(r => 
      (r.invoiceNo || '').toLowerCase().includes(q) ||
      (r.consignee || '').toLowerCase().includes(q) ||
      (r.bankRefNo || '').toLowerCase().includes(q)
    );

    this.renderRealizationDoneRows(filtered);
    this.renderRealizationDoneTotals(filtered);
  },

  sortRealizationDone(key) {
    this.realizationDoneDataset.reverse();
    this.renderRealizationDoneRows(this.realizationDoneDataset);
  },

  downloadRealizationDoneExcel() {
    const headers = ['Sl.No.', 'Invoice NO', 'Consignee', 'Sales Invoice Date', 'Transaction Type', 'Total Invoice Value$', 'Realised Value$', 'Date Of Discounting With Bank', 'Bank Ref No', 'Date Of Receipt Of Payment-1'];
    const rows = this.realizationDoneDataset.map(r => [
      r.slNo,
      `"${r.invoiceNo}"`,
      `"${r.consignee}"`,
      `"${r.salesInvoiceDate}"`,
      `"${r.transactionType}"`,
      r.totalInvoiceValue,
      r.realisedValue,
      `"${r.dateOfDiscounting}"`,
      `"${r.bankRefNo}"`,
      `"${r.dateOfReceipt}"`
    ].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `realization_done_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported realized register to Excel/CSV', 'success');
    }
  },

  openRealizationDoneModal(invoiceNo) {
    const record = this.realizationDoneDataset.find(x => x.invoiceNo === invoiceNo);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Realized Invoice: ${record.invoiceNo}`);
      return;
    }

    Modal.open({
      title: 'FOREIGN INWARD REMITTANCE & e-BRC CERTIFICATE',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Payments &nbsp;&gt;&nbsp; Realization Done &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">${record.invoiceNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Invoice Number</label>
                <input type="text" value="${record.invoiceNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#006C7A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Consignee</label>
                <input type="text" value="${record.consignee}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Bank Reference No</label>
                <input type="text" value="${record.bankRefNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-mono font-bold text-xs text-[#006C7A] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Total Invoice Value (USD)</label>
                <input type="text" value="$${record.totalInvoiceValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Realised Value (USD)</label>
                <input type="text" value="$${record.realisedValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#DCFCE7] font-extrabold text-xs text-[#15803D] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Date of Receipt</label>
                <input type="text" value="${record.dateOfReceipt}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
            </div>

            <div class="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <div class="flex items-center gap-2 text-[#006644] font-bold text-xs mb-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>DGFT EDPMS Export Discharge Certificate Validated</span>
              </div>
              <p class="text-[11px] text-[#64748B]">All statutory bank realizations reported to Reserve Bank of India EDPMS portal under Authorized Dealer code 0290048. Shipping Bill matching reconciled.</p>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Close',
          type: 'danger',
          onClick: (m) => m.close()
        }
      ]
    });
  },


  // ==========================================
  // 10. MARINE CARGO INSURANCE REGISTERS
  // ==========================================
  pendingInsuranceDataset: [
    {
      sNo: 1,
      id: '3325',
      invNo: 'DFL/PSP/2425/333',
      vesselName: 'SNL ZHANGJIAGANG2410E',
      shippingOnboardDt: '30-12-2024',
      containerNo: 'TLLU1128564',
      portOfLoading: 'VISAKHAPATNAM',
      portOfDischarge: 'VLADIVOSTOK',
      destinationCountry: 'RUSSIA',
      totalInvoiceValue: 12481326.05,
      year: '2024-2025',
      exporter: 'DEVI FISHERIES LIMITED',
      consignee: 'METRO CASH & CARRY OOO',
      selected: false
    },
    {
      sNo: 2,
      id: '2332',
      invNo: 'DFL/PSP/2425/132',
      vesselName: 'MSC PATNAREE IIISV433R',
      shippingOnboardDt: '21-08-2024',
      containerNo: 'MEDU9897406',
      portOfLoading: 'VISAKHAPATNAM',
      portOfDischarge: 'ST PETERSBURG',
      destinationCountry: 'RUSSIA',
      totalInvoiceValue: 171600.00,
      year: '2024-2025',
      exporter: 'DEVI FISHERIES LIMITED',
      consignee: 'METRO CASH & CARRY OOO',
      selected: false
    },
    {
      sNo: 3,
      id: '2333',
      invNo: 'DFL/PSP/2425/133',
      vesselName: 'MAERSK MC-KINNEY MOLLER',
      shippingOnboardDt: '15-09-2024',
      containerNo: 'MSKU8291045',
      portOfLoading: 'VISAKHAPATNAM',
      portOfDischarge: 'ROTTERDAM',
      destinationCountry: 'NETHERLANDS',
      totalInvoiceValue: 189450.00,
      year: '2024-2025',
      exporter: 'DEVI FISHERIES LIMITED',
      consignee: 'SEAFOOD CONNECTION B.V.',
      selected: false
    },
    {
      sNo: 4,
      id: '2334',
      invNo: 'DFL/JPT/2425/150',
      vesselName: 'CMA CGM MARCO POLO',
      shippingOnboardDt: '22-09-2024',
      containerNo: 'CMAU4921087',
      portOfLoading: 'VISAKHAPATNAM',
      portOfDischarge: 'LOS ANGELES',
      destinationCountry: 'U.S.A.',
      totalInvoiceValue: 245800.00,
      year: '2024-2025',
      exporter: 'DEVI FISHERIES LIMITED',
      consignee: 'C.P. FOOD PRODUCTS, INC.',
      selected: false
    }
  ],

  insuranceTemplatesDataset: [
    { sNo: 1, templateNo: 'TRANSIT242', generatedOn: '21-10-2026 18:38:40', invoicesCount: 77, status: 'Active' },
    { sNo: 2, templateNo: 'REJECT168', generatedOn: '01-09-2026 15:55:40', invoicesCount: 3, status: 'Rejected' },
    { sNo: 3, templateNo: 'TRANSIT239', generatedOn: '01-09-2026 15:54:20', invoicesCount: 30, status: 'Active' },
    { sNo: 4, templateNo: 'TRANSIT238', generatedOn: '27-08-2026 15:02:12', invoicesCount: 27, status: 'Active' },
    { sNo: 5, templateNo: 'REJECT167', generatedOn: '24-08-2026 17:33:36', invoicesCount: 2, status: 'Rejected' },
    { sNo: 6, templateNo: 'TRANSIT237', generatedOn: '24-08-2026 17:32:26', invoicesCount: 24, status: 'Active' },
    { sNo: 7, templateNo: 'REJECT166', generatedOn: '13-08-2026 16:25:00', invoicesCount: 4, status: 'Rejected' },
    { sNo: 8, templateNo: 'TRANSIT236', generatedOn: '13-08-2026 16:06:38', invoicesCount: 22, status: 'Active' }
  ],

  insurancePaymentsDataset: [
    {
      sNo: 1,
      insNo: 'TRANSIT242',
      invoices: 'DFL/PSP/2627/031 , DFL/PSP/2627/067 , DFL/PSP/2627/088 , DFL/PSP/2627/107 , DFL/PSP/2627/132 , DFL/PSP/2627/022 , DFL/PSP/2627/087 , DFL/JPT/2627/310 , DFL/PND/2627/209 , DFL/PSP/2627/144 , DFL/PSP/2627/041 , DFL/PSP/2627/050 , DFL/PND/2627/208 , DFL/JPT/2627/309 , DFL/JPT/2627/299 , DFL/JPT/2627/306 , DFL/PND/2627/205 , DFL/JPT/2627/298 , DFL/JPT/2627/312 , DFL/PSP/2627/147 , DFL/SNM/2627/139 , DFL/JPT/2627/295 , DFL/JPT/2627/300 , DFL/JPT/2627/305 , DFL/JPT/2627/311 , DFL/SNM/2627/049 , DFL/SNM/2627/051 , DFL/SNM/2627/084 , DFL/SNM/2627/099 , DFL/SNM/2627/071 , DFL/JPT/2627/302 , DFL/PND/2627/203 , DFL/JPT/2627/301 , DFL/JPT/2627/296 , DFL/JPT/2627/297 , DFL/JPT/2627/313 , DFL/PSP/2627/141 , DFL/PSP/2627/142 , DFL/PSP/2627/145 , DFL/JPT/2627/304 , DFL/PSP/2627/111 , DFL/PSP/2627/096 , DFL/PSP/2627/116 , DFL/PSP/2627/095 , DFL/PSP/2627/146 , DFL/PND/2627/206 , DFL/PND/2627/210 , DFL/PSP/2627/133 , DFL/SNM/2627/137 , DFL/PND/2627/204 , DFL/PSP/2627/115 , DFL/PSP/2627/127 , DFL/PSP/2627/128 , DFL/JPT/2627/303 , DFL/SNM/2627/138 , DFL/SNM/2627/142 , DFL/PND/2627/211 , DFL/JPT/2627/289 , DFL/PND/2627/212 , DFL/JPT/2627/308 , DFL/JPT/2627/307 , DFL/SNM/2627/140 , DFL/PSP/2627/138 , DFL/PSP/2627/139 , DFL/SNM/2627/144 , DFL/SNM/2627/141 , DFL/PND/2627/207 , DFL/PSP/2627/143 , DFL/KKD/2627/150 , DFL/KKD/2627/148 , DFL/KKD/2627/154 , DFL/KKD/2627/153 , DFL/KKD/2627/155 , DFL/KKD/2627/152 , DFL/KKD/2627/151 , DFL/SNM/2627/143 , DFL/SNM/2627/145',
      year: '2026-2027',
      premiumUsd: 14250.00,
      selected: false
    },
    {
      sNo: 2,
      insNo: 'REJECT168',
      invoices: 'DFL/PSP/2627/123 , DFL/KKD/2627/135 , DFL/PSP/2627/120',
      year: '2026-2027',
      premiumUsd: 850.00,
      selected: false
    },
    {
      sNo: 3,
      insNo: 'TRANSIT239',
      invoices: 'DFL/PND/2627/174 , DFL/PND/2627/175 , DFL/JPT/2627/263 , DFL/PND/2627/172 , DFL/PND/2627/165 , DFL/JPT/2627/264 , DFL/SNM/2627/119 , DFL/SNM/2627/113 , DFL/JPT/2627/274 , DFL/PND/2627/173 , DFL/JPT/2627/256 , DFL/PND/2627/178 , DFL/PND/2627/171 , DFL/JPT/2627/259 , DFL/JPT/2627/275 , DFL/PND/2627/177 , DFL/JPT/2627/257 , DFL/JPT/2627/270 , DFL/JPT/2627/273 , DFL/JPT/2627/271 , DFL/JPT/2627/272 , DFL/PSP/2627/122 , DFL/PND/2627/179 , DFL/PND/2627/166 , DFL/PSP/2627/121 , DFL/PND/2627/176 , DFL/PSP/2627/113 , DFL/PSP/2627/110 , DFL/PSP/2627/119 , DFL/PSP/2627/118',
      year: '2026-2027',
      premiumUsd: 6200.00,
      selected: false
    },
    {
      sNo: 4,
      insNo: 'TRANSIT238',
      invoices: 'DFL/JPT/2627/247 , DFL/PSP/2627/114 , DFL/JPT/2627/245 , DFL/JPT/2627/251 , DFL/JPT/2627/250 , DFL/JPT/2627/258 , DFL/SNM/2627/118 , DFL/PND/2627/170 , DFL/PSP/2627/112 , DFL/PSP/2627/117 , DFL/JPT/2627/246 , DFL/JPT/2627/253 , DFL/JPT/2627/267 , DFL/JPT/2627/265 , DFL/JPT/2627/260 , DFL/JPT/2627/248 , DFL/PND/2627/164 , DFL/PND/2627/167 , DFL/PND/2627/168 , DFL/JPT/2627/268 , DFL/JPT/2627/261 , DFL/KKD/2627/134 , DFL/JPT/2627/266 , DFL/JPT/2627/262 , DFL/JPT/2627/249 , DFL/JPT/2627/269 , DFL/SNM/2627/115',
      year: '2026-2027',
      premiumUsd: 5800.00,
      selected: false
    },
    {
      sNo: 5,
      insNo: 'REJECT167',
      invoices: 'DFL/PSP/2627/105 , DFL/SNM/2627/100',
      year: '2026-2027',
      premiumUsd: 450.00,
      selected: false
    }
  ],

  // ------------------------------------------
  // 10.1 PENDING INSURANCE (IMAGE 1)
  // ------------------------------------------
  renderPendingInsurance(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">PENDING INSURANCE</h2>
        </div>

        <!-- 2. Clean Search & Filters Card (Exact to Image 1, No Empty Circles) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-4">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Year:</label>
              <select id="sales-pins-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2024-2025" selected>2024-2025</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2026-2027">2026-2027</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Exporter:</label>
              <select id="sales-pins-exporter" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUATECH PVT LTD">DEVI AQUATECH PVT LTD</option>
                <option value="SATYA SEAFOODS">SATYA SEAFOODS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Consignee:</label>
              <select id="sales-pins-consignee" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="METRO CASH & CARRY OOO">METRO CASH & CARRY OOO</option>
                <option value="SEAFOOD CONNECTION B.V.">SEAFOOD CONNECTION B.V.</option>
                <option value="C.P. FOOD PRODUCTS, INC.">C.P. FOOD PRODUCTS, INC.</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Country:</label>
              <select id="sales-pins-country" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="All" selected>All</option>
                <option value="RUSSIA">RUSSIA</option>
                <option value="NETHERLANDS">NETHERLANDS</option>
                <option value="U.S.A.">U.S.A.</option>
              </select>
            </div>
          </div>

          <div class="flex items-center justify-center gap-3 pt-1">
            <button id="btn-pins-search" class="px-6 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterPendingInsurance()">
              <span>Search</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <button id="btn-pins-save" class="px-5 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.generateInsuranceTemplateFromSelection()">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>+ Save</span>
            </button>
          </div>
        </div>

        <!-- 3. Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-pins-search-input" 
                placeholder="Search pending insurance..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchPendingInsurance(this.value)"
              />
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#006C7A] hover:text-[#005662] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadPendingInsuranceExcel()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Download Excel</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider whitespace-nowrap">
                  <th class="py-3 px-3 text-center w-8">
                    <input type="checkbox" id="pins-check-all" class="rounded border-[#CBD5E1] text-[#006C7A] focus:ring-[#006C7A] cursor-pointer" onchange="SalesView.toggleAllPendingInsurance(this.checked)">
                  </th>
                  <th class="py-3 px-3">S.No</th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">Inv No</th>
                  <th class="py-3 px-3">Vessel Name</th>
                  <th class="py-3 px-3">Shipping Onboard Dt</th>
                  <th class="py-3 px-3">Container No</th>
                  <th class="py-3 px-3">Port of Loading</th>
                  <th class="py-3 px-3">Port Of Discharge</th>
                  <th class="py-3 px-3">Destination Country</th>
                  <th class="py-3 px-3 text-right">Total Invoice Value</th>
                  <th class="py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody id="sales-pins-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-pins-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderPendingInsuranceRows(this.pendingInsuranceDataset);
    this.renderPendingInsuranceTotals(this.pendingInsuranceDataset);
  },

  renderPendingInsuranceRows(list) {
    const tbody = document.getElementById('sales-pins-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="12" class="py-8 text-center text-[#64748B] text-xs">
            No pending insurance consignments found matching the selected filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 text-center">
          <input type="checkbox" value="${r.id}" ${r.selected ? 'checked' : ''} class="pins-row-check rounded border-[#CBD5E1] text-[#006C7A] focus:ring-[#006C7A] cursor-pointer" onchange="SalesView.togglePendingInsuranceRow('${r.id}', this.checked)">
        </td>
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
        <td class="py-3 px-3 font-mono font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openPendingInsuranceModal('${r.id}')">${r.id}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A] hover:text-[#006C7A] cursor-pointer" onclick="SalesView.openPendingInsuranceModal('${r.id}')">${r.invNo}</td>
        <td class="py-3 px-3 font-semibold text-[#0F172A]">${r.vesselName}</td>
        <td class="py-3 px-3 text-[#475569] whitespace-nowrap">${r.shippingOnboardDt}</td>
        <td class="py-3 px-3 font-mono text-[#006C7A] font-semibold">${r.containerNo}</td>
        <td class="py-3 px-3 text-[#475569]">${r.portOfLoading}</td>
        <td class="py-3 px-3 font-bold text-[#0F172A]">${r.portOfDischarge}</td>
        <td class="py-3 px-3 font-bold text-[#475569] uppercase">${r.destinationCountry}</td>
        <td class="py-3 px-3 font-extrabold text-[#006644] text-right">$${(r.totalInvoiceValue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <button 
            type="button" 
            class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
            title="View Marine Insurance Endorsement" 
            onclick="SalesView.openPendingInsuranceModal('${r.id}')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderPendingInsuranceTotals(list) {
    const el = document.getElementById('sales-pins-totals');
    if (!el) return;

    const count = list.length;
    const totalVal = list.reduce((sum, r) => sum + (Number(r.totalInvoiceValue) || 0), 0);
    const selectedCount = list.filter(r => r.selected).length;

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending Declarations</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Shipments</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Selected for Batch</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">${selectedCount} <span class="text-xs font-semibold text-[#006C7A]">Invoices</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Declared Value</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">$${totalVal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Marine Cargo Cover</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">ICC (A) <span class="text-[11px] font-semibold text-[#64748B]">All Risks 110%</span></div>
        </div>
      </div>
    `;
  },

  toggleAllPendingInsurance(checked) {
    this.pendingInsuranceDataset.forEach(r => r.selected = checked);
    this.renderPendingInsuranceRows(this.pendingInsuranceDataset);
    this.renderPendingInsuranceTotals(this.pendingInsuranceDataset);
  },

  togglePendingInsuranceRow(id, checked) {
    const record = this.pendingInsuranceDataset.find(x => x.id === id);
    if (record) record.selected = checked;
    this.renderPendingInsuranceTotals(this.pendingInsuranceDataset);
  },

  filterPendingInsurance() {
    const consignee = document.getElementById('sales-pins-consignee')?.value || 'All';
    const country = document.getElementById('sales-pins-country')?.value || 'All';

    const filtered = this.pendingInsuranceDataset.filter(r => {
      const matchConsignee = consignee === 'All' || r.consignee === consignee;
      const matchCountry = country === 'All' || r.destinationCountry === country;
      return matchConsignee && matchCountry;
    });

    this.renderPendingInsuranceRows(filtered);
    this.renderPendingInsuranceTotals(filtered);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} pending insurance shipments`, 'info');
    }
  },

  searchPendingInsurance(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderPendingInsuranceRows(this.pendingInsuranceDataset);
      this.renderPendingInsuranceTotals(this.pendingInsuranceDataset);
      return;
    }

    const filtered = this.pendingInsuranceDataset.filter(r => 
      (r.invNo || '').toLowerCase().includes(q) ||
      (r.vesselName || '').toLowerCase().includes(q) ||
      (r.containerNo || '').toLowerCase().includes(q) ||
      (r.destinationCountry || '').toLowerCase().includes(q)
    );

    this.renderPendingInsuranceRows(filtered);
    this.renderPendingInsuranceTotals(filtered);
  },

  downloadPendingInsuranceExcel() {
    const headers = ['S.No', 'ID', 'Inv No', 'Vessel Name', 'Shipping Onboard Dt', 'Container No', 'Port of Loading', 'Port Of Discharge', 'Destination Country', 'Total Invoice Value'];
    const rows = this.pendingInsuranceDataset.map(r => [
      r.sNo,
      r.id,
      `"${r.invNo}"`,
      `"${r.vesselName}"`,
      `"${r.shippingOnboardDt}"`,
      `"${r.containerNo}"`,
      `"${r.portOfLoading}"`,
      `"${r.portOfDischarge}"`,
      `"${r.destinationCountry}"`,
      r.totalInvoiceValue
    ].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `pending_insurance_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported pending insurance to Excel/CSV', 'success');
    }
  },

  generateInsuranceTemplateFromSelection() {
    const selectedRows = this.pendingInsuranceDataset.filter(r => r.selected);
    const count = selectedRows.length > 0 ? selectedRows.length : this.pendingInsuranceDataset.length;
    const targets = selectedRows.length > 0 ? selectedRows : this.pendingInsuranceDataset;

    const newTemplateNo = 'TRANSIT' + (243 + this.insuranceTemplatesDataset.length);
    const invoiceListStr = targets.map(r => r.invNo).join(' , ');

    // Add to Templates dataset
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 8);
    this.insuranceTemplatesDataset.unshift({
      sNo: this.insuranceTemplatesDataset.length + 1,
      templateNo: newTemplateNo,
      generatedOn: dateStr,
      invoicesCount: count,
      status: 'Active'
    });
    this.insuranceTemplatesDataset.forEach((r, idx) => r.sNo = idx + 1);

    // Add to Payments dataset
    this.insurancePaymentsDataset.unshift({
      sNo: this.insurancePaymentsDataset.length + 1,
      insNo: newTemplateNo,
      invoices: invoiceListStr,
      year: '2026-2027',
      premiumUsd: count * 185.00,
      selected: false
    });
    this.insurancePaymentsDataset.forEach((r, idx) => r.sNo = idx + 1);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Generated Insurance Template #${newTemplateNo} with ${count} invoices`, 'success');
    }
  },

  openPendingInsuranceModal(id) {
    const record = this.pendingInsuranceDataset.find(x => x.id === id);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Insurance Endorsement: ${record.invNo}`);
      return;
    }

    Modal.open({
      title: 'MARINE CARGO INSURANCE POLICY ENDORSEMENT',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Insurance &nbsp;&gt;&nbsp; Pending Insurance &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">${record.invNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Invoice Number</label>
                <input type="text" value="${record.invNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#006C7A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Vessel / Voyage</label>
                <input type="text" value="${record.vesselName}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Container Number</label>
                <input type="text" value="${record.containerNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-mono font-bold text-xs text-[#0F172A] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Port of Loading</label>
                <input type="text" value="${record.portOfLoading}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#475569] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Port of Discharge</label>
                <input type="text" value="${record.portOfDischarge}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Destination Country</label>
                <input type="text" value="${record.destinationCountry}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-bold text-xs text-[#0F172A] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Total Insured Value (CIF 110%)</label>
                <input type="text" value="$${record.totalInvoiceValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#DCFCE7] font-extrabold text-xs text-[#15803D] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Open Marine Cover Policy Number</label>
                <input type="text" value="OG-27-1801-9630-00000042 (United India Insurance)" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-mono font-semibold text-xs text-[#006C7A] outline-none">
              </div>
            </div>

            <div class="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <div class="flex items-center gap-2 text-[#006644] font-bold text-xs mb-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                <span>Institute Frozen Food Clauses (A) - 24 Hours Breakdown Covered</span>
              </div>
              <p class="text-[11px] text-[#64748B]">All-risk transit marine insurance covering reefer temperature variations, voyage deviation, general average, and jettison. Certificates generated on batch closure.</p>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Close',
          type: 'danger',
          onClick: (m) => m.close()
        }
      ]
    });
  },

  // ------------------------------------------
  // 10.2 INSURANCE TEMPLATES (IMAGE 2)
  // ------------------------------------------
  renderInsuranceTemplates(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- 1. Header Title -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">INSURANCE TEMPLATE</h2>
        </div>

        <!-- 2. Table Card (Exact to Image 2) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-inst-search-input" 
                placeholder="Search templates..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchInsuranceTemplates(this.value)"
              />
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#006C7A] hover:text-[#005662] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadInsuranceTemplatesExcel()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Download Excel</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider whitespace-nowrap">
                  <th class="py-3 px-3">S.No</th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortInsuranceTemplates('templateNo')">
                    <span class="inline-flex items-center gap-1">Invoice Template No <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 cursor-pointer" onclick="SalesView.sortInsuranceTemplates('generatedOn')">
                    <span class="inline-flex items-center gap-1">Generated On <span class="text-[#006C7A]">▲</span></span>
                  </th>
                  <th class="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="sales-inst-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-inst-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderInsuranceTemplatesRows(this.insuranceTemplatesDataset);
    this.renderInsuranceTemplatesTotals(this.insuranceTemplatesDataset);
  },

  renderInsuranceTemplatesRows(list) {
    const tbody = document.getElementById('sales-inst-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" class="py-8 text-center text-[#64748B] text-xs">
            No insurance templates found.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
        <td class="py-3 px-3 font-mono font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="SalesView.openInsuranceTemplateModal('${r.templateNo}')">${r.templateNo}</td>
        <td class="py-3 px-3 text-[#0F172A] font-semibold whitespace-nowrap">${r.generatedOn}</td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <div class="flex items-center justify-center gap-2">
            <button 
              type="button" 
              class="w-6 h-6 inline-flex items-center justify-center text-[#059669] hover:text-[#047857] hover:bg-[#ECFDF5] rounded cursor-pointer transition-colors" 
              title="Download Declaration Template" 
              onclick="SalesView.downloadSingleInsuranceTemplate('${r.templateNo}')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            </button>
            <button 
              type="button" 
              class="w-6 h-6 inline-flex items-center justify-center text-[#2563EB] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded cursor-pointer transition-colors" 
              title="View Invoice Inclusions" 
              onclick="SalesView.openInsuranceTemplateModal('${r.templateNo}')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </button>
            <button 
              type="button" 
              class="w-6 h-6 inline-flex items-center justify-center text-[#E11D48] hover:text-[#BE123C] hover:bg-[#FFF1F2] rounded cursor-pointer transition-colors" 
              title="Delete Template" 
              onclick="SalesView.deleteInsuranceTemplate('${r.templateNo}')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  renderInsuranceTemplatesTotals(list) {
    const el = document.getElementById('sales-inst-totals');
    if (!el) return;

    const count = list.length;
    const active = list.filter(r => r.status === 'Active').length;

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Generated Batches</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Templates</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Active Underwriter Filings</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">${active} <span class="text-xs font-semibold text-[#006644]">Declared</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Latest Declaration Batch</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">${list[0]?.templateNo || 'TRANSIT242'}</div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Filing Status</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">Automated <span class="text-[11px] font-semibold text-[#64748B]">(API / EDI)</span></div>
        </div>
      </div>
    `;
  },

  searchInsuranceTemplates(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderInsuranceTemplatesRows(this.insuranceTemplatesDataset);
      this.renderInsuranceTemplatesTotals(this.insuranceTemplatesDataset);
      return;
    }

    const filtered = this.insuranceTemplatesDataset.filter(r => 
      (r.templateNo || '').toLowerCase().includes(q) ||
      (r.generatedOn || '').toLowerCase().includes(q)
    );

    this.renderInsuranceTemplatesRows(filtered);
    this.renderInsuranceTemplatesTotals(filtered);
  },

  sortInsuranceTemplates(key) {
    this.insuranceTemplatesDataset.reverse();
    this.renderInsuranceTemplatesRows(this.insuranceTemplatesDataset);
  },

  downloadInsuranceTemplatesExcel() {
    const headers = ['S.No', 'Invoice Template No', 'Generated On', 'Status'];
    const rows = this.insuranceTemplatesDataset.map(r => [
      r.sNo,
      `"${r.templateNo}"`,
      `"${r.generatedOn}"`,
      r.status
    ].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `insurance_templates_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported insurance templates register to Excel/CSV', 'success');
    }
  },

  downloadSingleInsuranceTemplate(templateNo) {
    const rec = this.insurancePaymentsDataset.find(x => x.insNo === templateNo);
    const invoices = rec ? rec.invoices.split(' , ') : ['DFL/PSP/2627/031', 'DFL/PSP/2627/067'];
    
    let csv = `Insurance Template,${templateNo}\nGenerated Date,${new Date().toISOString()}\nUnderwriter,United India Insurance Co. Ltd\n\nS.No,Invoice Number\n`;
    invoices.forEach((inv, i) => {
      csv += `${i + 1},"${inv}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `declaration_${templateNo}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Downloaded declaration manifest for #${templateNo}`, 'success');
    }
  },

  openInsuranceTemplateModal(templateNo) {
    const rec = this.insurancePaymentsDataset.find(x => x.insNo === templateNo);
    const invoices = rec ? rec.invoices.split(' , ') : ['DFL/PSP/2627/031', 'DFL/PSP/2627/067', 'DFL/PSP/2627/088'];

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Insurance Template: ${templateNo}`);
      return;
    }

    Modal.open({
      title: 'INSURANCE DECLARATION TEMPLATE BREAKDOWN',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Insurance &nbsp;&gt;&nbsp; Insurance Templates &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">${templateNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <div>
                <span class="text-[10px] font-bold text-[#64748B] uppercase">Template Identifier</span>
                <div class="text-base font-black text-[#006C7A]">${templateNo}</div>
              </div>
              <div class="text-right">
                <span class="text-[10px] font-bold text-[#64748B] uppercase">Invoices Attached</span>
                <div class="text-base font-black text-[#0F172A]">${invoices.length} Invoices</div>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-2">Declared Invoice Consignments</label>
              <div class="max-h-60 overflow-y-auto p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg flex flex-wrap gap-1.5">
                ${invoices.map(inv => `<span class="px-2 py-1 rounded text-[11px] font-mono font-semibold bg-white border border-[#CBD5E1] text-[#0F172A] shadow-2xs">${inv.trim()}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Close',
          type: 'danger',
          onClick: (m) => m.close()
        }
      ]
    });
  },

  deleteInsuranceTemplate(templateNo) {
    if (confirm(`Are you sure you want to delete insurance template #${templateNo}?`)) {
      this.insuranceTemplatesDataset = this.insuranceTemplatesDataset.filter(x => x.templateNo !== templateNo);
      this.insuranceTemplatesDataset.forEach((r, idx) => r.sNo = idx + 1);
      this.renderInsuranceTemplatesRows(this.insuranceTemplatesDataset);
      this.renderInsuranceTemplatesTotals(this.insuranceTemplatesDataset);
      if (typeof Toast !== 'undefined' && Toast.show) {
        Toast.show(`Deleted template #${templateNo}`, 'info');
      }
    }
  },

  // ------------------------------------------
  // 10.3 INSURANCE PAYMENTS (IMAGE 3)
  // ------------------------------------------
  renderInsurancePayments(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-xs">
        <!-- Top Section Header -->
        <div class="mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">INSURANCE TEMPLATE</h2>
        </div>

        <!-- Top Filter Card (Exact to Image 3) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 mb-4 shadow-xs">
          <div class="flex flex-wrap items-end gap-4 mb-2">
            <div class="w-64">
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select Year:</label>
              <select id="sales-inspay-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="2026-2027" selected>2026-2027</option>
                <option value="2025-2026">2025-2026</option>
              </select>
            </div>

            <div class="flex items-center gap-3">
              <button id="btn-inspay-search" class="px-6 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.filterInsurancePayments()">
                <span>Search</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
              <button id="btn-inspay-save" class="px-5 py-2 bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="SalesView.settleInsurancePaymentSelection()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                <span>+ Save</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Bottom Section Header -->
        <div class="mt-6 mb-2">
          <h2 class="text-base font-bold text-[#0F172A] tracking-wider uppercase">INSURANCE PAYMENTS</h2>
        </div>

        <!-- Bottom Table Card (Exact to Image 3) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <!-- Table Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#EBECF0]">
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]" style="width: 32px; display: flex; align-items: center; justify-content: center;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                id="sales-inspay-search-input" 
                placeholder="Search insurance declarations and invoices..." 
                class="w-full text-xs pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] text-[#0F172A] transition-colors"
                style="padding-left: 36px !important;"
                oninput="SalesView.searchInsurancePayments(this.value)"
              />
            </div>

            <div>
              <button class="px-3.5 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#006C7A] hover:text-[#005662] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors" onclick="SalesView.downloadInsurancePaymentsExcel()">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Download Excel</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] text-[#475569] border-b border-[#E2E8F0] font-bold select-none text-[11px] uppercase tracking-wider">
                  <th class="py-3 px-3 text-center w-8">
                    <input type="checkbox" id="inspay-check-all" class="rounded border-[#CBD5E1] text-[#006C7A] focus:ring-[#006C7A] cursor-pointer" onchange="SalesView.toggleAllInsurancePayments(this.checked)">
                  </th>
                  <th class="py-3 px-3">S.No.</th>
                  <th class="py-3 px-3">INS No</th>
                  <th class="py-3 px-3">Invoices</th>
                </tr>
              </thead>
              <tbody id="sales-inspay-tbody" class="divide-y divide-[#F1F5F9]">
                <!-- Rows injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Reconciled Totals Card -->
          <div id="sales-inspay-totals" class="mt-4">
            <!-- Totals injected dynamically -->
          </div>
        </div>
      </div>
    `;

    this.renderInsurancePaymentsRows(this.insurancePaymentsDataset);
    this.renderInsurancePaymentsTotals(this.insurancePaymentsDataset);
  },

  renderInsurancePaymentsRows(list) {
    const tbody = document.getElementById('sales-inspay-tbody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" class="py-8 text-center text-[#64748B] text-xs">
            No insurance payment declarations found.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((r, idx) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#EBECF0]">
        <td class="py-3 px-3 text-center">
          <input type="checkbox" value="${r.insNo}" ${r.selected ? 'checked' : ''} class="inspay-row-check rounded border-[#CBD5E1] text-[#006C7A] focus:ring-[#006C7A] cursor-pointer" onchange="SalesView.toggleInsurancePaymentRow('${r.insNo}', this.checked)">
        </td>
        <td class="py-3 px-3 font-bold text-[#64748B]">${r.sNo || (idx + 1)}</td>
        <td class="py-3 px-3 font-mono font-bold text-[#006C7A] hover:underline cursor-pointer whitespace-nowrap" onclick="SalesView.openInsurancePaymentModal('${r.insNo}')">${r.insNo}</td>
        <td class="py-3 px-3 font-medium text-[#334155] leading-relaxed break-words">${r.invoices}</td>
      </tr>
    `).join('');
  },

  renderInsurancePaymentsTotals(list) {
    const el = document.getElementById('sales-inspay-totals');
    if (!el) return;

    const count = list.length;
    const totalPremium = list.reduce((sum, r) => sum + (Number(r.premiumUsd) || 0), 0);

    el.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Declaration Batches</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">${count} <span class="text-xs font-semibold text-[#64748B]">Declarations</span></div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Settled Premium (USD)</div>
          <div class="text-lg font-black text-[#006644] mt-0.5">$${totalPremium.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div class="border-r border-[#E2E8F0] pr-3">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Underwriter Master Policy</div>
          <div class="text-lg font-black text-[#006C7A] mt-0.5">OG-27-1801 <span class="text-[11px] font-semibold text-[#64748B]">(United India)</span></div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Policy Premium Status</div>
          <div class="text-lg font-black text-[#0F172A] mt-0.5">Active Paid <span class="text-[11px] font-semibold text-[#006644]">(Valid Till 2027)</span></div>
        </div>
      </div>
    `;
  },

  toggleAllInsurancePayments(checked) {
    this.insurancePaymentsDataset.forEach(r => r.selected = checked);
    this.renderInsurancePaymentsRows(this.insurancePaymentsDataset);
    this.renderInsurancePaymentsTotals(this.insurancePaymentsDataset);
  },

  toggleInsurancePaymentRow(insNo, checked) {
    const record = this.insurancePaymentsDataset.find(x => x.insNo === insNo);
    if (record) record.selected = checked;
    this.renderInsurancePaymentsTotals(this.insurancePaymentsDataset);
  },

  filterInsurancePayments() {
    const year = document.getElementById('sales-inspay-year')?.value || '2026-2027';
    const filtered = this.insurancePaymentsDataset.filter(r => !year || r.year === year);
    this.renderInsurancePaymentsRows(filtered);
    this.renderInsurancePaymentsTotals(filtered);
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} insurance declarations`, 'info');
    }
  },

  searchInsurancePayments(val) {
    const q = (val || '').trim().toLowerCase();
    if (!q) {
      this.renderInsurancePaymentsRows(this.insurancePaymentsDataset);
      this.renderInsurancePaymentsTotals(this.insurancePaymentsDataset);
      return;
    }

    const filtered = this.insurancePaymentsDataset.filter(r => 
      (r.insNo || '').toLowerCase().includes(q) ||
      (r.invoices || '').toLowerCase().includes(q)
    );

    this.renderInsurancePaymentsRows(filtered);
    this.renderInsurancePaymentsTotals(filtered);
  },

  settleInsurancePaymentSelection() {
    const selected = this.insurancePaymentsDataset.filter(r => r.selected);
    const count = selected.length > 0 ? selected.length : 1;
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Settled insurance debit notes for ${count} declaration batch(es)`, 'success');
    }
  },

  downloadInsurancePaymentsExcel() {
    const headers = ['S.No.', 'INS No', 'Invoices', 'Year', 'Premium USD'];
    const rows = this.insurancePaymentsDataset.map(r => [
      r.sNo,
      `"${r.insNo}"`,
      `"${r.invoices.replace(/"/g, '""')}"`,
      r.year,
      r.premiumUsd
    ].join(','));
    const csv = [headers.join(','), ...rows].join(String.fromCharCode(10));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `insurance_payments_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Exported insurance payments register to Excel/CSV', 'success');
    }
  },

  openInsurancePaymentModal(insNo) {
    const record = this.insurancePaymentsDataset.find(x => x.insNo === insNo);
    if (!record) return;

    if (typeof Modal === 'undefined' || !Modal.open) {
      alert(`Declaration Payment: ${record.insNo}`);
      return;
    }

    Modal.open({
      title: 'INSURANCE PREMIUM SETTLEMENT & DEBIT NOTE DETAILS',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="text-[11px] font-medium text-[#64748B]">
            Insurance &nbsp;&gt;&nbsp; Insurance Payments &nbsp;&gt;&nbsp; <span class="text-[#006C7A] font-semibold">${record.insNo}</span>
          </div>

          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 shadow-2xs">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Declaration Identifier</label>
                <input type="text" value="${record.insNo}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-mono font-bold text-xs text-[#006C7A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Financial Period</label>
                <input type="text" value="${record.year}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Premium Amount (USD)</label>
                <input type="text" value="$${record.premiumUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#DCFCE7] font-extrabold text-xs text-[#15803D] outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Underwriter Entity</label>
                <input type="text" value="United India Insurance Co. Ltd (Divisional Office)" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-semibold text-xs text-[#0F172A] outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Debit Note / Endorsement Number</label>
                <input type="text" value="DN-2026-${record.insNo}-901" readonly class="w-full h-8 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] font-mono font-bold text-xs text-[#006C7A] outline-none">
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">Invoices Consolidated Under This Certificate</label>
              <textarea rows="3" readonly class="w-full p-2 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] font-medium text-xs text-[#334155] outline-none">${record.invoices}</textarea>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        {
          label: 'Close',
          type: 'danger',
          onClick: (m) => m.close()
        }
      ]
    });
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

          // ==========================================
  // INTERNAL SCREEN: NEW PROFORMA INVOICE (IMAGE 2)
  // ==========================================
  openNewPi() {
    this.openNewPiModal();
  },

  openNewPiModal() {
    if (typeof Modal === 'undefined' || !Modal.open) {
      alert('Modal dialog component not ready.');
      return;
    }

    Modal.open({
      title: 'New Proforma Invoice',
      size: 'xl',
      content: `
        <form id="form-new-proforma" onsubmit="event.preventDefault(); SalesView.submitNewPi();">
          <div class="space-y-4 text-xs text-[#0F172A]">
            <!-- ROW 1 (4 cols) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  SELECT EXPORTER <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-exporter" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Exporter</option>
                  <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                  <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  SELECT PROCESSOR <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-processor" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Processor</option>
                  <option value="857">857 - USHA Processing Unit</option>
                  <option value="853" selected>853 - VSP Processing Unit</option>
                  <option value="1888">1888 - JPT Processing Unit</option>
                  <option value="24234236">24234236 - SATYA Processing Unit</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  NO OF CONTAINERS
                </label>
                <div class="flex items-center h-9 border border-[#E2E8F0] rounded-lg overflow-hidden bg-white">
                  <button type="button" class="w-9 h-full flex items-center justify-center text-[#475569] hover:bg-[#F1F5F9] font-bold cursor-pointer transition-colors" onclick="SalesView.adjustContainerCount(-1)">-</button>
                  <input type="number" id="new-pi-containers" value="1" min="1" max="99" class="flex-1 text-center font-bold text-xs text-[#0F172A] outline-none border-x border-[#E2E8F0] h-full" />
                  <button type="button" class="w-9 h-full flex items-center justify-center text-[#475569] hover:bg-[#F1F5F9] font-bold cursor-pointer transition-colors" onclick="SalesView.adjustContainerCount(1)">+</button>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  REFERENCE NUMBER
                </label>
                <input type="text" id="new-pi-ref-no" placeholder="Enter Reference Number" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>
            </div>

            <!-- ROW 2 (4 cols) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  PROFORMA INVOICE NO <span class="text-[#FF5150]">*</span>
                </label>
                <input type="text" id="new-pi-number" value="DFL/PI/1316/26-27" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  PROFORMA INVOICE DATE <span class="text-[#FF5150]">*</span>
                </label>
                <input type="date" id="new-pi-date" value="2026-10-21" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  P.O NO
                </label>
                <input type="text" id="new-pi-po-no" placeholder="Enter P.O Number" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  P.O DATE
                </label>
                <input type="date" id="new-pi-po-date" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>
            </div>

            <!-- ROW 3 (4 cols) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  CONSIGNEE <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-consignee" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Consignee</option>
                  <option value="EASTERN FISH COMPANY LLC" selected>EASTERN FISH COMPANY LLC</option>
                  <option value="PACIFIC SEAFOOD GROUP,">PACIFIC SEAFOOD GROUP,</option>
                  <option value="ARISTA INDUSTRIES INC">ARISTA INDUSTRIES INC</option>
                  <option value="RED CHAMBER CO.">RED CHAMBER CO.</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  ULTIMATE CONSIGNEE
                </label>
                <select id="new-pi-ultimate-consignee" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" selected>Select Ultimate Consignee</option>
                  <option value="SAME AS CONSIGNEE">SAME AS CONSIGNEE</option>
                  <option value="EASTERN FISH COMPANY LLC">EASTERN FISH COMPANY LLC</option>
                  <option value="PACIFIC SEAFOOD GROUP,">PACIFIC SEAFOOD GROUP,</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  BUYER NAME
                </label>
                <select id="new-pi-buyer" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" selected>Select Buyer</option>
                  <option value="EASTERN FISH COMPANY LLC" selected>EASTERN FISH COMPANY LLC</option>
                  <option value="PACIFIC SEAFOOD GROUP,">PACIFIC SEAFOOD GROUP,</option>
                  <option value="ARISTA INDUSTRIES INC">ARISTA INDUSTRIES INC</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  NOTIFY PARTY
                </label>
                <select id="new-pi-notify" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" selected>Select Notify Party</option>
                  <option value="SAME AS CONSIGNEE">SAME AS CONSIGNEE</option>
                  <option value="EASTERN FISH COMPANY LLC">EASTERN FISH COMPANY LLC</option>
                  <option value="EXPEDITORS INTL OF WASHINGTON">EXPEDITORS INTL OF WASHINGTON</option>
                </select>
              </div>
            </div>

            <!-- ROW 4 (4 cols) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  IMPORTER OF RECORD <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-importer" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Importer of Record</option>
                  <option value="EASTERN FISH COMPANY LLC" selected>EASTERN FISH COMPANY LLC</option>
                  <option value="PACIFIC SEAFOOD GROUP">PACIFIC SEAFOOD GROUP</option>
                  <option value="ARISTA INDUSTRIES INC">ARISTA INDUSTRIES INC</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  AGENT
                </label>
                <select id="new-pi-agent" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" selected>Select Agent</option>
                  <option value="COASTAL MARINE AGENCIES">COASTAL MARINE AGENCIES</option>
                  <option value="SAGAR MARINE BROKERS">SAGAR MARINE BROKERS</option>
                  <option value="DELTA SEAFOOD ASSOCIATES">DELTA SEAFOOD ASSOCIATES</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  CERTIFICATION
                </label>
                <select id="new-pi-cert" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" selected>Select Certification</option>
                  <option value="BAP 4-Star">BAP 4-Star</option>
                  <option value="BRCGS">BRCGS Grade A</option>
                  <option value="ASC">ASC Certified</option>
                  <option value="HACCP">HACCP Compliance</option>
                  <option value="FSSC 22000">FSSC 22000</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  PORT OF LOADING <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-pol" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Port of Loading</option>
                  <option value="Visakhapatnam (INVTZ)" selected>Visakhapatnam (INVTZ)</option>
                  <option value="Chennai (INMAA)">Chennai (INMAA)</option>
                  <option value="Kolkata (INCCU)">Kolkata (INCCU)</option>
                  <option value="Krishnapatnam (INKRI)">Krishnapatnam (INKRI)</option>
                </select>
              </div>
            </div>

            <!-- ROW 5 (4 cols) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  DESTINATION COUNTRY <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-dest-country" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Country</option>
                  <option value="USA" selected>USA</option>
                  <option value="CHINA">CHINA</option>
                  <option value="BELGIUM">BELGIUM</option>
                  <option value="RUSSIA">RUSSIA</option>
                  <option value="JAPAN">JAPAN</option>
                  <option value="CANADA">CANADA</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  PORT OF DISCHARGE <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-pod" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Port of Discharge</option>
                  <option value="Los Angeles, USA" selected>Los Angeles, USA</option>
                  <option value="New York, USA">New York, USA</option>
                  <option value="Seattle, USA">Seattle, USA</option>
                  <option value="Rotterdam, Netherlands">Rotterdam, Netherlands</option>
                  <option value="Shanghai, China">Shanghai, China</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  FINAL DESTINATION COUNTRY
                </label>
                <select id="new-pi-final-dest-country" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" selected>Select Final Destination Country</option>
                  <option value="USA" selected>USA</option>
                  <option value="CHINA">CHINA</option>
                  <option value="BELGIUM">BELGIUM</option>
                  <option value="RUSSIA">RUSSIA</option>
                  <option value="JAPAN">JAPAN</option>
                  <option value="CANADA">CANADA</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  FINAL DESTINATION <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-final-dest" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Final Destination</option>
                  <option value="Los Angeles, CA" selected>Los Angeles, CA</option>
                  <option value="Elizabeth, NJ">Elizabeth, NJ</option>
                  <option value="Seattle, WA">Seattle, WA</option>
                  <option value="Rotterdam Port">Rotterdam Port</option>
                </select>
              </div>
            </div>

            <!-- ROW 6 (4 cols) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  SHIPBY DATE
                </label>
                <input type="date" id="new-pi-shipby" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  SHIPBY DATE 2 (TEXT)
                </label>
                <input type="text" id="new-pi-shipby-text" placeholder="Enter ShipBy Date Text (e.g. Prompt)" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  BANK DETAILS <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-bank" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Bank</option>
                  <option value="HDFC BANK - VSP" selected>HDFC BANK - VSP (A/C #992019283)</option>
                  <option value="STATE BANK OF INDIA - OVERSEAS">STATE BANK OF INDIA - OVERSEAS (A/C #001928392)</option>
                  <option value="ICICI BANK LIMITED - EXPORT">ICICI BANK LIMITED - EXPORT (A/C #448291039)</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  SHOW BANK <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-show-bank" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="Yes">Yes</option>
                  <option value="No" selected>No</option>
                </select>
              </div>
            </div>

            <!-- ROW 7 (4 cols) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  PAYMENT TERMS <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-payment-terms" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Payment</option>
                  <option value="CAD (Cash Against Documents)" selected>CAD (Cash Against Documents)</option>
                  <option value="100% LC at Sight">100% LC at Sight</option>
                  <option value="30% Advance + 70% TT">30% Advance + 70% TT</option>
                  <option value="DA 60 Days">DA 60 Days</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  SHIPMENT TERMS <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-shipment-terms" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Shipment Terms</option>
                  <option value="CIF" selected>CIF (Cost, Insurance & Freight)</option>
                  <option value="FOB">FOB (Free on Board)</option>
                  <option value="CFR">CFR (Cost & Freight)</option>
                  <option value="DDP">DDP (Delivered Duty Paid)</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  DELIVERY TERMS <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-delivery-terms" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select</option>
                  <option value="PORT_TO_PORT" selected>PORT TO PORT</option>
                  <option value="DOOR_TO_DOOR">DOOR TO DOOR</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  QUANTITY UNITS <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-qty-units" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Quantity Units</option>
                  <option value="LBS" selected>LBS (Pounds)</option>
                  <option value="KGS">KGS (Kilograms)</option>
                  <option value="CARTONS">CARTONS</option>
                </select>
              </div>
            </div>

            <!-- ROW 8 (4 cols) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  CURRENCY <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-currency" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Currency</option>
                  <option value="USD" selected>USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  FREIGHT
                </label>
                <input type="text" id="new-pi-freight" placeholder="Enter Freight" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  CHARGE NAME
                </label>
                <input type="text" id="new-pi-charge-name" placeholder="Enter Charge Name" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  CHARGE AMOUNT
                </label>
                <input type="text" id="new-pi-charge-amount" placeholder="Enter Charge Amount" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>
            </div>

            <!-- ROW 9: PRODUCTION PLANT -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  PRODUCTION PLANT
                </label>
                <input type="text" id="new-pi-plant" placeholder="e.g. USHA, VSP, JPT, SATYA" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>
            </div>

            <!-- ROW 10: REMARKS -->
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                REMARKS
              </label>
              <textarea id="new-pi-remarks" rows="2" placeholder="Enter Remarks" class="w-full p-2.5 rounded-lg border border-[#E2E8F0] bg-white text-xs text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all"></textarea>
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        {
          label: 'Cancel',
          type: 'secondary',
          onClick: (m) => m.close()
        },
        {
          label: 'Create Proforma Invoice',
          type: 'primary',
          onClick: () => SalesView.submitNewPi()
        }
      ]
    });
  },

  renderNewPi(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#0F172A]">
        <!-- Breadcrumbs Navigation -->
        <div class="flex items-center gap-2 text-xs text-[#64748B] mb-1 select-none">
          <span class="hover:text-[#0F172A]">Orders</span>
          <span class="text-[#94A3B8]">/</span>
          <a href="#/sales/orders/proforma-list" class="text-[#006C7A] hover:underline font-semibold">Proforma List</a>
          <span class="text-[#94A3B8]">/</span>
          <span class="text-[#0F172A] font-bold">New Proforma Invoice</span>
        </div>

        <!-- Section Title Header -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">New Proforma Invoice</h1>
          <button type="button" class="px-4 py-2 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#475569] hover:text-[#0F172A] cursor-pointer transition-colors flex items-center gap-1.5" onclick="window.location.hash='#/sales/orders/proforma-list'">
            <svg class="w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            <span>Back to Proforma List</span>
          </button>
        </div>

        <!-- Form Card Container (Base Design System with AquaPulse Colors) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-6 shadow-xs">
          <form id="form-new-proforma" onsubmit="event.preventDefault(); SalesView.submitNewPi();">
            <div class="space-y-4 text-xs text-[#0F172A]">
              <!-- ROW 1 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SELECT EXPORTER <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-exporter" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Exporter</option>
                    <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                    <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SELECT PROCESSOR <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-processor" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Processor</option>
                    <option value="857">857 - USHA Processing Unit</option>
                    <option value="853" selected>853 - VSP Processing Unit</option>
                    <option value="1888">1888 - JPT Processing Unit</option>
                    <option value="24234236">24234236 - SATYA Processing Unit</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    NO OF CONTAINERS
                  </label>
                  <div class="flex items-center h-9 border border-[#E2E8F0] rounded-lg overflow-hidden bg-white">
                    <button type="button" class="w-9 h-full flex items-center justify-center text-[#475569] hover:bg-[#F1F5F9] font-bold cursor-pointer transition-colors" onclick="SalesView.adjustContainerCount(-1)">-</button>
                    <input type="number" id="new-pi-containers" value="1" min="1" max="99" class="flex-1 text-center font-bold text-xs text-[#0F172A] outline-none border-x border-[#E2E8F0] h-full" />
                    <button type="button" class="w-9 h-full flex items-center justify-center text-[#475569] hover:bg-[#F1F5F9] font-bold cursor-pointer transition-colors" onclick="SalesView.adjustContainerCount(1)">+</button>
                  </div>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    REFERENCE NUMBER
                  </label>
                  <input type="text" id="new-pi-ref-no" placeholder="Enter Reference Number" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>
              </div>

              <!-- ROW 2 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    PROFORMA INVOICE NO <span class="text-[#FF5150]">*</span>
                  </label>
                  <input type="text" id="new-pi-number" value="DFL/PI/1316/26-27" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    PROFORMA INVOICE DATE <span class="text-[#FF5150]">*</span>
                  </label>
                  <input type="date" id="new-pi-date" value="2026-10-21" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    P.O NO
                  </label>
                  <input type="text" id="new-pi-po-no" placeholder="Enter P.O Number" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    P.O DATE
                  </label>
                  <input type="date" id="new-pi-po-date" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>
              </div>

              <!-- ROW 3 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    CONSIGNEE <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-consignee" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Consignee</option>
                    <option value="EASTERN FISH COMPANY LLC" selected>EASTERN FISH COMPANY LLC</option>
                    <option value="PACIFIC SEAFOOD GROUP,">PACIFIC SEAFOOD GROUP,</option>
                    <option value="ARISTA INDUSTRIES INC">ARISTA INDUSTRIES INC</option>
                    <option value="RED CHAMBER CO.">RED CHAMBER CO.</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    ULTIMATE CONSIGNEE
                  </label>
                  <select id="new-pi-ultimate-consignee" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" selected>Select Ultimate Consignee</option>
                    <option value="SAME AS CONSIGNEE">SAME AS CONSIGNEE</option>
                    <option value="EASTERN FISH COMPANY LLC">EASTERN FISH COMPANY LLC</option>
                    <option value="PACIFIC SEAFOOD GROUP,">PACIFIC SEAFOOD GROUP,</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    BUYER NAME
                  </label>
                  <select id="new-pi-buyer" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" selected>Select Buyer</option>
                    <option value="EASTERN FISH COMPANY LLC" selected>EASTERN FISH COMPANY LLC</option>
                    <option value="PACIFIC SEAFOOD GROUP,">PACIFIC SEAFOOD GROUP,</option>
                    <option value="ARISTA INDUSTRIES INC">ARISTA INDUSTRIES INC</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    NOTIFY PARTY
                  </label>
                  <select id="new-pi-notify" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" selected>Select Notify Party</option>
                    <option value="SAME AS CONSIGNEE">SAME AS CONSIGNEE</option>
                    <option value="EASTERN FISH COMPANY LLC">EASTERN FISH COMPANY LLC</option>
                    <option value="EXPEDITORS INTL OF WASHINGTON">EXPEDITORS INTL OF WASHINGTON</option>
                  </select>
                </div>
              </div>

              <!-- ROW 4 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    IMPORTER OF RECORD <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-importer" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Importer of Record</option>
                    <option value="EASTERN FISH COMPANY LLC" selected>EASTERN FISH COMPANY LLC</option>
                    <option value="PACIFIC SEAFOOD GROUP">PACIFIC SEAFOOD GROUP</option>
                    <option value="ARISTA INDUSTRIES INC">ARISTA INDUSTRIES INC</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    AGENT
                  </label>
                  <select id="new-pi-agent" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" selected>Select Agent</option>
                    <option value="COASTAL MARINE AGENCIES">COASTAL MARINE AGENCIES</option>
                    <option value="SAGAR MARINE BROKERS">SAGAR MARINE BROKERS</option>
                    <option value="DELTA SEAFOOD ASSOCIATES">DELTA SEAFOOD ASSOCIATES</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    CERTIFICATION
                  </label>
                  <select id="new-pi-cert" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" selected>Select Certification</option>
                    <option value="BAP 4-Star">BAP 4-Star</option>
                    <option value="BRCGS">BRCGS Grade A</option>
                    <option value="ASC">ASC Certified</option>
                    <option value="HACCP">HACCP Compliance</option>
                    <option value="FSSC 22000">FSSC 22000</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    PORT OF LOADING <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-pol" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Port of Loading</option>
                    <option value="Visakhapatnam (INVTZ)" selected>Visakhapatnam (INVTZ)</option>
                    <option value="Chennai (INMAA)">Chennai (INMAA)</option>
                    <option value="Kolkata (INCCU)">Kolkata (INCCU)</option>
                    <option value="Krishnapatnam (INKRI)">Krishnapatnam (INKRI)</option>
                  </select>
                </div>
              </div>

              <!-- ROW 5 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    DESTINATION COUNTRY <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-dest-country" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Country</option>
                    <option value="USA" selected>USA</option>
                    <option value="CHINA">CHINA</option>
                    <option value="BELGIUM">BELGIUM</option>
                    <option value="RUSSIA">RUSSIA</option>
                    <option value="JAPAN">JAPAN</option>
                    <option value="CANADA">CANADA</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    PORT OF DISCHARGE <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-pod" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Port of Discharge</option>
                    <option value="Los Angeles, USA" selected>Los Angeles, USA</option>
                    <option value="New York, USA">New York, USA</option>
                    <option value="Seattle, USA">Seattle, USA</option>
                    <option value="Rotterdam, Netherlands">Rotterdam, Netherlands</option>
                    <option value="Shanghai, China">Shanghai, China</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    FINAL DESTINATION COUNTRY
                  </label>
                  <select id="new-pi-final-dest-country" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" selected>Select Final Destination Country</option>
                    <option value="USA" selected>USA</option>
                    <option value="CHINA">CHINA</option>
                    <option value="BELGIUM">BELGIUM</option>
                    <option value="RUSSIA">RUSSIA</option>
                    <option value="JAPAN">JAPAN</option>
                    <option value="CANADA">CANADA</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    FINAL DESTINATION <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-final-dest" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Final Destination</option>
                    <option value="Los Angeles, CA" selected>Los Angeles, CA</option>
                    <option value="Elizabeth, NJ">Elizabeth, NJ</option>
                    <option value="Seattle, WA">Seattle, WA</option>
                    <option value="Rotterdam Port">Rotterdam Port</option>
                  </select>
                </div>
              </div>

              <!-- ROW 6 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SHIPBY DATE
                  </label>
                  <input type="date" id="new-pi-shipby" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SHIPBY DATE 2 (TEXT)
                  </label>
                  <input type="text" id="new-pi-shipby-text" placeholder="Enter ShipBy Date Text (e.g. Prompt)" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    BANK DETAILS <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-bank" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Bank</option>
                    <option value="HDFC BANK - VSP" selected>HDFC BANK - VSP (A/C #992019283)</option>
                    <option value="STATE BANK OF INDIA - OVERSEAS">STATE BANK OF INDIA - OVERSEAS (A/C #001928392)</option>
                    <option value="ICICI BANK LIMITED - EXPORT">ICICI BANK LIMITED - EXPORT (A/C #448291039)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SHOW BANK <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-show-bank" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="Yes">Yes</option>
                    <option value="No" selected>No</option>
                  </select>
                </div>
              </div>

              <!-- ROW 7 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    PAYMENT TERMS <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-payment-terms" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Payment</option>
                    <option value="CAD (Cash Against Documents)" selected>CAD (Cash Against Documents)</option>
                    <option value="100% LC at Sight">100% LC at Sight</option>
                    <option value="30% Advance + 70% TT">30% Advance + 70% TT</option>
                    <option value="DA 60 Days">DA 60 Days</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SHIPMENT TERMS <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-shipment-terms" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Shipment Terms</option>
                    <option value="CIF" selected>CIF (Cost, Insurance & Freight)</option>
                    <option value="FOB">FOB (Free on Board)</option>
                    <option value="CFR">CFR (Cost & Freight)</option>
                    <option value="DDP">DDP (Delivered Duty Paid)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    DELIVERY TERMS <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-delivery-terms" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select</option>
                    <option value="PORT_TO_PORT" selected>PORT TO PORT</option>
                    <option value="DOOR_TO_DOOR">DOOR TO DOOR</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    QUANTITY UNITS <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-qty-units" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Quantity Units</option>
                    <option value="LBS" selected>LBS (Pounds)</option>
                    <option value="KGS">KGS (Kilograms)</option>
                    <option value="CARTONS">CARTONS</option>
                  </select>
                </div>
              </div>

              <!-- ROW 8 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    CURRENCY <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-currency" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Currency</option>
                    <option value="USD" selected>USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    FREIGHT
                  </label>
                  <input type="text" id="new-pi-freight" placeholder="Enter Freight" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    CHARGE NAME
                  </label>
                  <input type="text" id="new-pi-charge-name" placeholder="Enter Charge Name" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    CHARGE AMOUNT
                  </label>
                  <input type="text" id="new-pi-charge-amount" placeholder="Enter Charge Amount" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>
              </div>

              <!-- ROW 9: PRODUCTION PLANT -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    PRODUCTION PLANT
                  </label>
                  <input type="text" id="new-pi-plant" placeholder="e.g. USHA, VSP, JPT, SATYA" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>
              </div>

              <!-- ROW 10: REMARKS -->
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  REMARKS
                </label>
                <textarea id="new-pi-remarks" rows="3" placeholder="Enter Remarks" class="w-full p-3 rounded-lg border border-[#E2E8F0] bg-white text-xs text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all"></textarea>
              </div>

              <!-- BOTTOM ACTION BAR -->
              <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
                <button type="button" class="px-5 py-2.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#475569] hover:text-[#0F172A] cursor-pointer transition-colors" onclick="window.location.hash='#/sales/orders/proforma-list'">
                  Cancel
                </button>
                <button type="submit" class="px-6 py-2.5 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold shadow-xs hover:shadow cursor-pointer transition-all flex items-center gap-2">
                  <span>Create Proforma Invoice</span>
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  adjustContainerCount(delta) {
    const el = document.getElementById('new-pi-containers');
    if (!el) return;
    let val = parseInt(el.value, 10) || 1;
    val = Math.max(1, Math.min(99, val + delta));
    el.value = val;
  },

  submitNewPi() {
    const piNumber = document.getElementById('new-pi-number')?.value.trim() || `DFL/PI/${Math.floor(1316 + Math.random() * 50)}/26-27`;
    const piDate = document.getElementById('new-pi-date')?.value || '21/10/2026';
    const poNo = document.getElementById('new-pi-po-no')?.value.trim() || 'PO-2026-NEW';
    const buyer = document.getElementById('new-pi-consignee')?.value || 'EASTERN FISH COMPANY LLC';
    const processor = document.getElementById('new-pi-processor')?.value || '853';
    const productionPlant = document.getElementById('new-pi-plant')?.value.trim() || 'VSP';
    const shipByDate = document.getElementById('new-pi-shipby')?.value || '--';
    const containers = parseInt(document.getElementById('new-pi-containers')?.value, 10) || 1;
    const country = document.getElementById('new-pi-dest-country')?.value || 'USA';
    const exporter = document.getElementById('new-pi-exporter')?.value || 'DEVI FISHERIES LIMITED';

    const newId = String(Math.floor(7394 + Math.random() * 100));

    const newRecord = {
      sNo: 1,
      id: newId,
      processor: processor,
      piNumber: piNumber,
      piDate: piDate,
      poNo: poNo,
      buyer: buyer,
      productionPlant: productionPlant,
      shipByDate: shipByDate,
      status: 'Pi-Pending',
      exporter: exporter,
      country: country,
      cartons: containers * 1800,
      totalAmountUsd: containers * 190000
    };

    // Re-index existing
    this.proformaDataset.unshift(newRecord);
    this.proformaDataset.forEach((r, idx) => {
      r.sNo = idx + 1;
    });

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    const tbody = document.getElementById('sales-pi-tbody');
    if (tbody) {
      this.renderProformaRows(this.proformaDataset);
      this.renderProformaTotals(this.proformaDataset);
    } else {
      window.location.hash = '#/sales/orders/proforma-list';
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Proforma Invoice ${piNumber} (ID #${newId}) created successfully!`, 'success');
    }
  },

        // ==========================================
  // BULK APPROVAL MODAL (IMAGE 3)
  // ==========================================
  bulkApprovePis() {
    if (typeof Modal === 'undefined' || !Modal.open) {
      alert('Modal dialog component not ready.');
      return;
    }

    Modal.open({
      title: 'Order Status Details',
      size: 'sm',
      content: `
        <div class="space-y-4 text-xs text-[#0F172A]">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <!-- Select PI -->
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Select PI:</label>
              <select id="modal-bulk-pi-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="PENDING_ALL" selected>All Pending PIs (7393, 7388)</option>
                <option value="7393">7393 - DFL/PI/1315/26-27 (EASTERN FISH)</option>
                <option value="7388">7388 - DFL/PI/1310/26-27 (ARISTA INDUSTRIES)</option>
                <option value="ALL">Select All 8 PIs</option>
              </select>
            </div>

            <!-- Status -->
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Status:</label>
              <select id="modal-bulk-status-select" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                <option value="" disabled selected>Select Status</option>
                <option value="Approved">Approved</option>
                <option value="Po Received">Po Received</option>
                <option value="Pi-Pending">Pi-Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <!-- Action Buttons using Base Design System colors -->
          <div class="flex items-center justify-end gap-2.5 pt-4 mt-2 border-t border-[#F1F5F9]">
            <button type="button" class="px-5 py-2 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#475569] hover:text-[#0F172A] cursor-pointer transition-colors" onclick="Modal.close()">
              Close
            </button>
            <button type="button" class="px-6 py-2 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold shadow-xs hover:shadow cursor-pointer transition-all flex items-center gap-1.5" onclick="SalesView.submitBulkApproval()">
              Submit
            </button>
          </div>
        </div>
      `
    });
  },

  submitBulkApproval() {
    const statusSelect = document.getElementById('modal-bulk-status-select');
    const piSelect = document.getElementById('modal-bulk-pi-select');

    const newStatus = statusSelect ? statusSelect.value : '';
    const selectedPi = piSelect ? piSelect.value : 'PENDING_ALL';

    if (!newStatus) {
      if (typeof Toast !== 'undefined' && Toast.show) {
        Toast.show('Please select a valid target Status', 'warning');
      } else {
        alert('Please select a valid target Status');
      }
      return;
    }

    let updatedCount = 0;
    this.proformaDataset.forEach(r => {
      let shouldUpdate = false;
      if (selectedPi === 'ALL') {
        shouldUpdate = true;
      } else if (selectedPi === 'PENDING_ALL') {
        shouldUpdate = (r.status || '').toLowerCase().includes('pending');
      } else if (r.id === selectedPi) {
        shouldUpdate = true;
      }

      if (shouldUpdate) {
        r.status = newStatus;
        updatedCount++;
      }
    });

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    this.renderProformaRows(this.proformaDataset);
    this.renderProformaTotals(this.proformaDataset);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Updated Order Status to '${newStatus}' for ${updatedCount} Proforma Invoice(s)`, 'success');
    }
  },

  bindEvents() {}
};

if (typeof window !== "undefined") {
  window.SalesView = SalesView;
}
'''
