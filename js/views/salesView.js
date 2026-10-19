// Sales & Export Operations Full Interactive View
// Devi Fisheries Limited Enterprise Seafood Processing & Export ERP
// Covers Product Management, Buyer Management, Orders Execution, Export Finance, Marine Insurance, and Executive Dashboard

import { SalesDataStore } from '../data/salesData.js';
import { Toast } from '../components/toast.js';
import { Modal } from '../components/modal.js';
import { Environment } from '../framework/Environment.js';

export const SalesView = {
  activeTab: 'overview',
  activeHash: '#/sales/dashboard/overview',

  render(containerId, tabName = 'overview', activeHash = '#/sales/dashboard/overview') {
    const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!container) return;

    this.activeTab = tabName || 'overview';
    this.activeHash = activeHash;

    const isS01 = Environment.isSitemap01();

    // Route to appropriate view renderer based on active tab
    let contentHtml = '';
    switch (this.activeTab) {
      // 1. Dashboard
      case 'overview':
      case 'dashboard':
        contentHtml = this.renderDashboard();
        break;

      // 2. Product Management (Master Data)
      case 'product-list':
        contentHtml = this.renderProductList();
        break;
      case 'preparation-list':
        contentHtml = this.renderPreparationList();
        break;
      case 'species':
      case 'species-master':
        contentHtml = this.renderSpeciesMaster();
        break;
      case 'grades-list':
        contentHtml = this.renderGradesList();
        break;
      case 'packing-style-list':
        contentHtml = this.renderPackingStyleList();
        break;
      case 'variety-list':
        contentHtml = this.renderVarietyList();
        break;

      // 3. Buyer Management
      case 'buyer-list':
        contentHtml = this.renderBuyerList();
        break;
      case 'consignee-list':
        contentHtml = this.renderConsigneeList();
        break;
      case 'notify-party-list':
        contentHtml = this.renderNotifyPartyList();
        break;
      case 'applicant-list':
        contentHtml = this.renderApplicantList();
        break;
      case 'brands-list':
        contentHtml = this.renderBrandsList();
        break;

      // 4. Orders Execution
      case 'proforma-list':
        contentHtml = this.renderProformaList();
        break;
      case 'custom-invoices':
        contentHtml = this.renderCustomInvoices();
        break;
      case 'isf-details':
        contentHtml = this.renderIsfDetails();
        break;
      case 'shipping-bill':
        contentHtml = this.renderShippingBill();
        break;
      case 'commercial-invoice':
        contentHtml = this.renderCommercialInvoice();
        break;
      case 'eta-status':
        contentHtml = this.renderEtaStatus();
        break;
      case 'fda-status':
        contentHtml = this.renderFdaStatus();
        break;
      case 'clearing-agent':
        contentHtml = this.renderClearingAgent();
        break;

      // 5. Payments & Financials
      case 'forward-contracts':
        contentHtml = this.renderForwardContracts();
        break;
      case 'collections':
        contentHtml = this.renderCollections();
        break;
      case 'negotiations':
        contentHtml = this.renderNegotiations();
        break;
      case 'realization':
        contentHtml = this.renderRealization();
        break;
      case 'realization-done':
        contentHtml = this.renderRealizationDone();
        break;

      // 6. Cargo Insurance
      case 'pending-insurance':
        contentHtml = this.renderPendingInsurance();
        break;
      case 'insurance-templates':
        contentHtml = this.renderInsuranceTemplates();
        break;
      case 'insurance-payments':
        contentHtml = this.renderInsurancePayments();
        break;

      // 7. Reports
      case 'reports':
      case 'reports-overview':
      case 'delayed-shipments':
        contentHtml = this.renderDelayedShipmentsReport();
        break;
      case 'sales-summary':
        contentHtml = this.renderSalesSummaryReport();
        break;
      case 'payment-status':
        contentHtml = this.renderPaymentStatusReport();
        break;
      case 'inventory-report':
        contentHtml = this.renderInventoryReport();
        break;

      default:
        contentHtml = this.renderDashboard();
    }

    container.innerHTML = `
      <div class="sales-module-wrapper space-y-6 animate-fade-in w-full pb-14">
        ${contentHtml}
      </div>
    `;

    this.bindEvents();
  },

  // ==========================================
  // MODULE 6.1: DASHBOARD & ANALYTICS
  // ==========================================
  renderDashboard() {
    const data = SalesDataStore.getAll();
    const kpis = data.dashboardKpis || {};

    return `
      <div class="space-y-6">
        <!-- Global Search & Filter Bar -->
        <div class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              <span class="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Sales Analytics & Global Filter Control</span>
            </div>
            <span class="text-[11px] text-slate-400">Live Production Telemetry &bull; FY 2026-27</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 text-xs">
            <div>
              <label class="block font-semibold text-slate-500 mb-1 text-[11px]">Exporter</label>
              <select id="filter-dash-exporter" class="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 font-medium text-slate-700 focus:outline-none focus:border-teal-500">
                <option value="All">All Entities</option>
                <option value="DFL-Unit-1" selected>Devi Fisheries Unit-1</option>
                <option value="DFL-Unit-2">Devi Fisheries Unit-2</option>
                <option value="DFL-Tuticorin">DFL Tuticorin Plant</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-slate-500 mb-1 text-[11px]">Consignee</label>
              <select id="filter-dash-consignee" class="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 font-medium text-slate-700 focus:outline-none focus:border-teal-500">
                <option value="All">All Consignees</option>
                <option value="Americold">Americold Baltimore</option>
                <option value="Lineage">Lineage Long Beach</option>
                <option value="Yangshan">Yangshan Shanghai</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-slate-500 mb-1 text-[11px]">Brand</label>
              <select id="filter-dash-brand" class="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 font-medium text-slate-700 focus:outline-none focus:border-teal-500">
                <option value="All">All Brands</option>
                <option value="Devi Gold">Devi Gold</option>
                <option value="Black Pearl">Black Pearl</option>
                <option value="Bay Fresh">Bay Fresh</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-slate-500 mb-1 text-[11px]">Country</label>
              <select id="filter-dash-country" class="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 font-medium text-slate-700 focus:outline-none focus:border-teal-500">
                <option value="All">All Countries</option>
                <option value="USA">United States</option>
                <option value="China">China</option>
                <option value="Japan">Japan</option>
                <option value="EU">European Union</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-slate-500 mb-1 text-[11px]">Fiscal Year</label>
              <select id="filter-dash-year" class="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 font-medium text-slate-700 focus:outline-none focus:border-teal-500">
                <option value="2026-27" selected>2026 - 2027</option>
                <option value="2025-26">2025 - 2026</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-slate-500 mb-1 text-[11px]">From Date</label>
              <div class="erp-date-wrapper relative">
                <input type="text" id="filter-dash-from" value="01-10-2026" class="erp-date-input w-full p-2 rounded-lg border border-slate-200 bg-slate-50 font-mono text-slate-700 cursor-pointer text-xs" readonly />
              </div>
            </div>
            <div>
              <label class="block font-semibold text-slate-500 mb-1 text-[11px]">To Date</label>
              <div class="erp-date-wrapper relative">
                <input type="text" id="filter-dash-to" value="31-10-2026" class="erp-date-input w-full p-2 rounded-lg border border-slate-200 bg-slate-50 font-mono text-slate-700 cursor-pointer text-xs" readonly />
              </div>
            </div>
          </div>
        </div>

        <!-- 6 KPI Metric Cards with Trend Indicators -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <!-- KPI 1: Pending Contracts -->
          <div class="bg-white rounded-2xl p-4 border border-sky-100 shadow-2xs hover:shadow-xs transition-all">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Orders</span>
              <span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-sky-50 text-sky-700">${kpis.pendingContracts?.trend || '+12.5%'}</span>
            </div>
            <div class="text-2xl font-black text-[#0F172A]">${kpis.pendingContracts?.count || 8}</div>
            <div class="text-xs text-slate-500 mt-1">${kpis.pendingContracts?.label || 'Active Contracts'}</div>
          </div>

          <!-- KPI 2: On Water Shipments -->
          <div class="bg-white rounded-2xl p-4 border border-teal-100 shadow-2xs hover:shadow-xs transition-all">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">On Water</span>
              <span class="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
            </div>
            <div class="text-2xl font-black text-teal-700">${kpis.onWaterShipments?.count || 5} <span class="text-xs font-semibold text-slate-400">Shipments</span></div>
            <div class="text-xs text-slate-500 mt-1">${kpis.onWaterShipments?.containers || 11} Containers En Route</div>
          </div>

          <!-- KPI 3: Delivered -->
          <div class="bg-white rounded-2xl p-4 border border-emerald-100 shadow-2xs hover:shadow-xs transition-all">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Delivered</span>
              <span class="text-emerald-600 font-bold text-xs">+18.4% YTD</span>
            </div>
            <div class="text-2xl font-black text-[#0F172A]">${kpis.deliveredShipments?.count || 24}</div>
            <div class="text-xs text-slate-500 mt-1">${kpis.deliveredShipments?.tons || 432} Metric Tons</div>
          </div>

          <!-- KPI 4: Orders Queue -->
          <div class="bg-white rounded-2xl p-4 border border-amber-100 shadow-2xs hover:shadow-xs transition-all">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">In Staging</span>
              <span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-50 text-amber-700">WIP</span>
            </div>
            <div class="text-2xl font-black text-amber-700">${kpis.ordersQueue?.count || 14}</div>
            <div class="text-xs text-slate-500 mt-1">${kpis.ordersQueue?.tons || 252} MT Coldstore Queue</div>
          </div>

          <!-- KPI 5: Pending Payments -->
          <div class="bg-white rounded-2xl p-4 border border-rose-100 shadow-2xs hover:shadow-xs transition-all">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Receivables</span>
              <span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-rose-50 text-rose-700">USD</span>
            </div>
            <div class="text-xl font-black text-rose-700">$${(kpis.pendingPaymentsUsd?.amount || 527200).toLocaleString()}</div>
            <div class="text-xs text-slate-500 mt-1">₹${((kpis.pendingPaymentsUsd?.inrEquivalent || 44205720) / 100000).toFixed(1)} Lakhs</div>
          </div>

          <!-- KPI 6: Realized This Month -->
          <div class="bg-white rounded-2xl p-4 border border-indigo-100 shadow-2xs hover:shadow-xs transition-all">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Realized</span>
              <span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-indigo-50 text-indigo-700">+9.2% MTD</span>
            </div>
            <div class="text-xl font-black text-indigo-700">$${(kpis.paymentsRealizedMonth?.amount || 842000).toLocaleString()}</div>
            <div class="text-xs text-slate-500 mt-1">₹${((kpis.paymentsRealizedMonth?.inrEquivalent || 70601700) / 100000).toFixed(1)} Lakhs</div>
          </div>
        </div>

        <!-- 6 Visual Analytics Charts Grid (Module 6.1) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <!-- Chart 1: Invoice Vs Shipments (Monthly Bar Chart) -->
          <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-xs font-bold text-[#0F172A]">1. Invoice Vs Shipments</h3>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">Monthly</span>
              </div>
              <p class="text-[11px] text-slate-400 mb-3">Invoiced value in USD vs completed container dispatches</p>
              
              <div class="space-y-2.5">
                ${[
                  { month: 'Jul 2026', usd: '$1,420K', ctns: 16, pct: 75 },
                  { month: 'Aug 2026', usd: '$1,680K', ctns: 19, pct: 88 },
                  { month: 'Sep 2026', usd: '$1,890K', ctns: 22, pct: 95 },
                  { month: 'Oct 2026', usd: '$1,350K', ctns: 15, pct: 70 }
                ].map(m => `
                  <div>
                    <div class="flex justify-between text-[11px] font-semibold mb-1">
                      <span class="text-slate-600">${m.month}</span>
                      <span class="text-[#0F172A] font-bold">${m.usd} <span class="text-slate-400 font-normal">(${m.ctns} FCL)</span></span>
                    </div>
                    <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div class="h-full rounded-full bg-gradient-to-r from-teal-500 to-[#00A8B5]" style="width: ${m.pct}%;"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Total Oct Shipments: 15 FCL</span>
              <span class="font-bold text-teal-700">Target Pace: 96%</span>
            </div>
          </div>

          <!-- Chart 2: Plant Wise Orders (Grouped Bar Chart) -->
          <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-xs font-bold text-[#0F172A]">2. Plant Wise Orders</h3>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-700">Unit Comparison</span>
              </div>
              <p class="text-[11px] text-slate-400 mb-3">Total, Shipped, and Pending order allocation by facility</p>

              <div class="space-y-3">
                ${[
                  { plant: 'Unit-1 Visakhapatnam', total: 24, shipped: 18, pending: 6, pctShipped: 75 },
                  { plant: 'Unit-2 Singarayakonda', total: 16, shipped: 11, pending: 5, pctShipped: 68.7 },
                  { plant: 'Unit-3 Tuticorin', total: 8, shipped: 6, pending: 2, pctShipped: 75 }
                ].map(p => `
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div class="flex justify-between text-[11px] font-bold text-[#0F172A] mb-1.5">
                      <span>${p.plant}</span>
                      <span class="text-teal-700">${p.shipped}/${p.total} Shipped</span>
                    </div>
                    <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden flex">
                      <div class="h-full bg-teal-600" style="width: ${p.pctShipped}%;" title="Shipped"></div>
                      <div class="h-full bg-amber-400" style="width: ${100 - p.pctShipped}%;" title="Pending"></div>
                    </div>
                    <div class="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>Shipped: <strong class="text-teal-700">${p.shipped}</strong></span>
                      <span>Pending: <strong class="text-amber-600">${p.pending}</strong></span>
                      <span>Total: <strong>${p.total}</strong></span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="pt-3 mt-3 border-t border-slate-100 flex items-center gap-3 text-[10px]">
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-teal-600"></span> Shipped</span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-amber-400"></span> Pending Processing</span>
            </div>
          </div>

          <!-- Chart 3: Country Wise Details (Donut / Market Share) -->
          <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-xs font-bold text-[#0F172A]">3. Country Wise Details</h3>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">Market Share</span>
              </div>
              <p class="text-[11px] text-slate-400 mb-3">Export consignment volume by destination country</p>

              <div class="space-y-2.5">
                ${[
                  { country: 'United States (USFDA)', share: '75.72%', tons: '327 MT', color: 'bg-sky-500', width: '75.7%' },
                  { country: 'China (GACC Registration)', share: '14.92%', tons: '64 MT', color: 'bg-rose-500', width: '14.9%' },
                  { country: 'Japan (MHLW Tested)', share: '5.80%', tons: '25 MT', color: 'bg-amber-500', width: '5.8%' },
                  { country: 'European Union & UK', share: '3.56%', tons: '16 MT', color: 'bg-emerald-500', width: '3.6%' }
                ].map(c => `
                  <div>
                    <div class="flex justify-between text-[11px] font-semibold mb-1">
                      <span class="flex items-center gap-1.5 text-slate-700">
                        <span class="w-2 h-2 rounded-full ${c.color}"></span>
                        ${c.country}
                      </span>
                      <span class="text-[#0F172A] font-bold">${c.share} <span class="text-slate-400 font-normal">(${c.tons})</span></span>
                    </div>
                    <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div class="h-full rounded-full ${c.color}" style="width: ${c.width};"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Primary Gateway: US East/West Coast</span>
              <span class="font-bold text-sky-700">75.72% USA</span>
            </div>
          </div>

          <!-- Chart 4: Shipped Containers (Port Wise) -->
          <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-xs font-bold text-[#0F172A]">4. Shipped Containers (Port Wise)</h3>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">Discharge Ports</span>
              </div>
              <p class="text-[11px] text-slate-400 mb-3">Volume allocation by destination ocean terminal</p>

              <div class="space-y-2.5">
                ${[
                  { port: 'Baltimore Port, MD', share: '42.0%', fcl: '22 FCL', color: 'bg-indigo-600', width: '42%' },
                  { port: 'Long Beach Port, CA', share: '28.0%', fcl: '15 FCL', color: 'bg-teal-500', width: '28%' },
                  { port: 'Yokohama Port, Japan', share: '15.0%', fcl: '8 FCL', color: 'bg-amber-500', width: '15%' },
                  { port: 'Rotterdam Port, Netherlands', share: '10.0%', fcl: '5 FCL', color: 'bg-rose-500', width: '10%' },
                  { port: 'Others (Shanghai, Kobe)', share: '5.0%', fcl: '2 FCL', color: 'bg-slate-400', width: '5%' }
                ].map(p => `
                  <div>
                    <div class="flex justify-between text-[11px] font-semibold mb-1">
                      <span class="flex items-center gap-1.5 text-slate-700">
                        <span class="w-2 h-2 rounded-full ${p.color}"></span>
                        ${p.port}
                      </span>
                      <span class="text-[#0F172A] font-bold">${p.share} <span class="text-slate-400 font-normal">(${p.fcl})</span></span>
                    </div>
                    <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div class="h-full rounded-full ${p.color}" style="width: ${p.width};"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Total Dispatched: 52 Containers</span>
              <span class="font-bold text-indigo-700">Top: Baltimore</span>
            </div>
          </div>

          <!-- Chart 5: To be shipped Qty vs Shipped Qty (Scaled Bar) -->
          <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-xs font-bold text-[#0F172A]">5. To be Shipped vs Shipped</h3>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700">Volume MT</span>
              </div>
              <p class="text-[11px] text-slate-400 mb-3">Shipped volume against pending stage balance (scaled)</p>

              <div class="space-y-4 pt-2">
                <div>
                  <div class="flex justify-between text-[11px] font-bold mb-1.5">
                    <span class="text-teal-700 flex items-center gap-1.5">
                      <span class="w-2.5 h-2.5 rounded-full bg-teal-600"></span> Shipped Quantity
                    </span>
                    <span class="text-teal-700 font-mono">432 MT (63.2%)</span>
                  </div>
                  <div class="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full rounded-full bg-teal-600" style="width: 63.2%;"></div>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between text-[11px] font-bold mb-1.5">
                    <span class="text-amber-600 flex items-center gap-1.5">
                      <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span> To Be Shipped
                    </span>
                    <span class="text-amber-600 font-mono">252 MT (36.8%)</span>
                  </div>
                  <div class="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full rounded-full bg-amber-500" style="width: 36.8%;"></div>
                  </div>
                </div>

                <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 flex justify-between items-center">
                  <span>Total Order Commitments:</span>
                  <span class="font-bold text-[#0F172A]">684 MT (38 FCL)</span>
                </div>
              </div>
            </div>
            <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Fulfillment Velocity: Normal</span>
              <span class="font-bold text-teal-700">63.2% Completed</span>
            </div>
          </div>

          <!-- Chart 6: Freight Rates (Line / Route Trend) -->
          <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-xs font-bold text-[#0F172A]">6. Freight Rates</h3>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700">Ocean Liners</span>
              </div>
              <p class="text-[11px] text-slate-400 mb-3">Carrier spot rate benchmark per 40ft reefer container</p>

              <div class="space-y-2.5">
                ${[
                  { liner: 'Maersk Line', route: 'Visakhapatnam &rarr; Baltimore', rate: '$4,200', trend: '-2.3%', status: 'Best Transit' },
                  { liner: 'MSC (Mediterranean Shipping)', route: 'Visakhapatnam &rarr; Long Beach', rate: '$3,950', trend: '-4.1%', status: 'Lowest Cost' },
                  { liner: 'Ocean Network Express (ONE)', route: 'Visakhapatnam &rarr; Yokohama', rate: '$2,850', trend: '+1.0%', status: 'Direct Weekly' },
                  { liner: 'Hapag-Lloyd', route: 'Visakhapatnam &rarr; Rotterdam', rate: '$3,400', trend: 'Stable', status: 'Reefer Plus' }
                ].map(f => `
                  <div class="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <div class="text-[11px] font-bold text-[#0F172A]">${f.liner}</div>
                      <div class="text-[10px] text-slate-500">${f.route}</div>
                    </div>
                    <div class="text-right">
                      <div class="text-xs font-black font-mono text-[#0F172A]">${f.rate}</div>
                      <div class="text-[9.5px] font-semibold text-teal-700">${f.status}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Avg Spot Rate: $3,600 / FEU</span>
              <span class="font-bold text-teal-700">Hedged Contracts Active</span>
            </div>
          </div>
        </div>

        <!-- Recent Active Orders Table in Dashboard -->
        <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Active Export Dispatch Operations</h3>
              <p class="text-xs text-slate-400">Real-time status of proforma invoices, custom bills, and ocean voyages</p>
            </div>
            <a href="#/sales/orders/proforma-list" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#006C7A] hover:bg-slate-50 border border-slate-200 transition-all flex items-center gap-1.5">
              <span>View All Orders</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </a>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th class="py-3 px-4">Proforma Invoice</th>
                  <th class="py-3 px-4">PO Number</th>
                  <th class="py-3 px-4">Buyer Entity</th>
                  <th class="py-3 px-4">Destination</th>
                  <th class="py-3 px-4">Containers</th>
                  <th class="py-3 px-4">Amount (USD)</th>
                  <th class="py-3 px-4">Status</th>
                  <th class="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700">
                ${data.proformaInvoices.map(pi => `
                  <tr class="hover:bg-slate-50/70 transition-colors">
                    <td class="py-3.5 px-4 font-bold text-[#0F172A]">${pi.piNumber}</td>
                    <td class="py-3.5 px-4 font-mono text-slate-600">${pi.poNumber}</td>
                    <td class="py-3.5 px-4 font-medium">${pi.buyer}</td>
                    <td class="py-3.5 px-4">${pi.portOfDischarge} (${pi.destinationCountry})</td>
                    <td class="py-3.5 px-4 font-bold text-slate-800">${pi.containersCount} × 40' Reefer</td>
                    <td class="py-3.5 px-4 font-bold text-teal-700">$${(pi.totalAmountUsd || 0).toLocaleString()}</td>
                    <td class="py-3.5 px-4">
                      <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                        pi.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        pi.status === 'Po Received' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                        'bg-slate-100 text-slate-700 border border-slate-200'
                      }">
                        ${pi.status}
                      </span>
                    </td>
                    <td class="py-3.5 px-4 text-right">
                      <a href="#/sales/orders/proforma-list" class="px-2.5 py-1 rounded text-xs font-semibold text-[#006C7A] hover:bg-slate-100 transition-colors">View Details</a>
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
  // MODULE 1: PRODUCT MANAGEMENT
  // ==========================================

  // 1.1 Product List
  renderProductList() {
    const products = SalesDataStore.getCollection('products');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Product List (Master Categories)</h2>
            <p class="text-xs text-slate-400">High-level commercial seafood species and product categories</p>
          </div>
          <button id="btn-add-product" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>New Product</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Code</th>
                <th class="py-3 px-4">Product Name</th>
                <th class="py-3 px-4">Description</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${products.map(p => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-mono font-bold text-teal-700">${p.code}</td>
                  <td class="py-3.5 px-4 font-bold text-[#0F172A]">${p.name}</td>
                  <td class="py-3.5 px-4 text-slate-500">${p.description}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${p.active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'}">
                      ${p.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 text-right space-x-2">
                    <button class="btn-edit-product text-[#006C7A] hover:underline font-semibold" data-id="${p.id}">Edit</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 1.2 Preparation List
  renderPreparationList() {
    const preps = SalesDataStore.getCollection('preparations');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Preparation List</h2>
            <p class="text-xs text-slate-400">Product preparation forms (HLSO, PDTO, PD, EZ Peel) and export HS codes</p>
          </div>
          <button id="btn-add-prep" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>New Preparation</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Short Code</th>
                <th class="py-3 px-4">Preparation Name</th>
                <th class="py-3 px-4">Description</th>
                <th class="py-3 px-4">HS Code</th>
                <th class="py-3 px-4">QC Code</th>
                <th class="py-3 px-4">GST %</th>
                <th class="py-3 px-4">Effective From</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${preps.map(pr => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-mono font-bold text-teal-700">${pr.shortCode}</td>
                  <td class="py-3.5 px-4 font-bold text-[#0F172A]">${pr.name}</td>
                  <td class="py-3.5 px-4 text-slate-500">${pr.description}</td>
                  <td class="py-3.5 px-4 font-mono">${pr.hsCode}</td>
                  <td class="py-3.5 px-4 font-mono text-slate-600">${pr.qcCode}</td>
                  <td class="py-3.5 px-4 font-semibold">${pr.gstRate}%</td>
                  <td class="py-3.5 px-4 text-slate-500">${pr.fromDate}</td>
                  <td class="py-3.5 px-4 text-right">
                    <button class="btn-edit-prep text-[#006C7A] hover:underline font-semibold" data-id="${pr.id}">Edit</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 1.3 Species Master
  renderSpeciesMaster() {
    const species = SalesDataStore.getCollection('speciesMaster');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Species Master</h2>
            <p class="text-xs text-slate-400">Master raw material species and lab QC code bindings</p>
          </div>
          <button id="btn-add-species" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>New Species</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Short Code</th>
                <th class="py-3 px-4">Species Name</th>
                <th class="py-3 px-4">QC Species Code</th>
                <th class="py-3 px-4">Description</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${species.map(sp => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-mono font-bold text-teal-700">${sp.shortCode}</td>
                  <td class="py-3.5 px-4 font-bold text-[#0F172A]">${sp.name}</td>
                  <td class="py-3.5 px-4 font-mono text-slate-600">${sp.qcSpeciesCode}</td>
                  <td class="py-3.5 px-4 text-slate-500">${sp.description}</td>
                  <td class="py-3.5 px-4 text-right">
                    <button class="btn-edit-species text-[#006C7A] hover:underline font-semibold" data-id="${sp.id}">Edit</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 1.4 Grades List
  renderGradesList() {
    const grades = SalesDataStore.getCollection('grades');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Grades List</h2>
            <p class="text-xs text-slate-400">Product piece count and sizing classification (Count per LB/KG)</p>
          </div>
          <button id="btn-add-grade" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>New Grade</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Short Code</th>
                <th class="py-3 px-4">Grade Group</th>
                <th class="py-3 px-4">Value / Title</th>
                <th class="py-3 px-4">Type</th>
                <th class="py-3 px-4">Description</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${grades.map(g => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-mono font-bold text-teal-700">${g.shortCode}</td>
                  <td class="py-3.5 px-4 font-bold text-[#0F172A]">${g.group}</td>
                  <td class="py-3.5 px-4 font-semibold text-slate-800">${g.value}</td>
                  <td class="py-3.5 px-4">${g.type}</td>
                  <td class="py-3.5 px-4 text-slate-500">${g.description}</td>
                  <td class="py-3.5 px-4 text-right">
                    <button class="btn-edit-grade text-[#006C7A] hover:underline font-semibold" data-id="${g.id}">Edit</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 1.5 Packing Style List
  renderPackingStyleList() {
    const packingStyles = SalesDataStore.getCollection('packingStyles');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Packing Style List</h2>
            <p class="text-xs text-slate-400">Master cartons, slab counts, UOM, and automatic Gross Weight formulas</p>
          </div>
          <button id="btn-add-packing" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>New Packing Style</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Packing Style Name</th>
                <th class="py-3 px-4">Total Slabs</th>
                <th class="py-3 px-4">Slab Weight</th>
                <th class="py-3 px-4">UOM</th>
                <th class="py-3 px-4">Tare Weight</th>
                <th class="py-3 px-4">Gross Weight (Auto)</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${packingStyles.map(pk => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-bold text-[#0F172A]">${pk.name}</td>
                  <td class="py-3.5 px-4">${pk.totalSlabs}</td>
                  <td class="py-3.5 px-4">${pk.slabWeight}</td>
                  <td class="py-3.5 px-4 font-semibold text-teal-700">${pk.uom}</td>
                  <td class="py-3.5 px-4">${pk.tareWeight} ${pk.uom}</td>
                  <td class="py-3.5 px-4 font-bold text-slate-900">${pk.grossWeight} ${pk.uom}</td>
                  <td class="py-3.5 px-4 text-right">
                    <button class="btn-edit-packing text-[#006C7A] hover:underline font-semibold" data-id="${pk.id}">Edit</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 1.6 Variety List (SKU)
  renderVarietyList() {
    const varieties = SalesDataStore.getCollection('varieties');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Variety List (Final SKU Creation)</h2>
            <p class="text-xs text-slate-400">Combine Species, Form, Freezing, Brand, and Grade with automated SUPC generation</p>
          </div>
          <button id="btn-add-variety" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>New Variety (SKU)</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Our SUPC</th>
                <th class="py-3 px-4">Buyer SUPC</th>
                <th class="py-3 px-4">Species & Form</th>
                <th class="py-3 px-4">Freezing</th>
                <th class="py-3 px-4">Brand</th>
                <th class="py-3 px-4">Grade</th>
                <th class="py-3 px-4">Packing Style</th>
                <th class="py-3 px-4">Product Description</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${varieties.map(v => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-mono font-bold text-teal-700 bg-teal-50/30">${v.supc}</td>
                  <td class="py-3.5 px-4 font-mono text-slate-600">${v.buyerSupc}</td>
                  <td class="py-3.5 px-4 font-semibold text-[#0F172A]">${v.species} ${v.productForm}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${
                      v.freezingType.includes('IQF') ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                      v.freezingType.includes('Cooked') ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      v.freezingType.includes('Blanched') ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                      'bg-slate-100 text-slate-700 border border-slate-200'
                    }">
                      ${v.freezingType}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 font-medium">${v.brand}</td>
                  <td class="py-3.5 px-4 font-bold text-slate-800">${v.grade}</td>
                  <td class="py-3.5 px-4">${v.packingStyle}</td>
                  <td class="py-3.5 px-4 text-slate-500 max-w-xs truncate" title="${v.description}">${v.description}</td>
                  <td class="py-3.5 px-4 text-right">
                    <button class="btn-edit-variety text-[#006C7A] hover:underline font-semibold" data-id="${v.id}">Edit</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // ==========================================
  // MODULE 2: BUYER MANAGEMENT
  // ==========================================

  // 2.1 Buyer List
  renderBuyerList() {
    const buyers = SalesDataStore.getCollection('buyers');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Buyer Directory</h2>
            <p class="text-xs text-slate-400">International purchasing entities, tax compliance codes, and credit terms</p>
          </div>
          <button id="btn-add-buyer" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>New Buyer</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Code</th>
                <th class="py-3 px-4">Buyer Name</th>
                <th class="py-3 px-4">Country</th>
                <th class="py-3 px-4">Compliance Codes</th>
                <th class="py-3 px-4">Contact Person</th>
                <th class="py-3 px-4">Credit Terms</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${buyers.map(b => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-mono font-bold text-teal-700">${b.code}</td>
                  <td class="py-3.5 px-4 font-bold text-[#0F172A]">
                    <div>${b.name}</div>
                    <div class="text-[11px] font-normal text-slate-400 truncate max-w-xs">${b.address}</div>
                  </td>
                  <td class="py-3.5 px-4 font-semibold">${b.country}</td>
                  <td class="py-3.5 px-4 font-mono text-[11px]">
                    ${b.irsNumber ? `<span class="bg-sky-50 text-sky-700 px-1.5 py-0.5 rounded border border-sky-200">IRS: ${b.irsNumber}</span>` : ''}
                    ${b.usciCode ? `<span class="bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded border border-rose-200">USCI: ${b.usciCode}</span>` : ''}
                    ${b.iftpCode ? `<div class="text-slate-500 mt-0.5">${b.iftpCode}</div>` : ''}
                  </td>
                  <td class="py-3.5 px-4">
                    <div>${b.contactPerson}</div>
                    <div class="text-[11px] text-slate-400">${b.email}</div>
                  </td>
                  <td class="py-3.5 px-4 font-bold text-slate-700">${b.creditLimitDays} Days</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">${b.status}</span>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <button class="btn-edit-buyer text-[#006C7A] hover:underline font-semibold" data-id="${b.id}">Edit</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 2.2 Consignee List
  renderConsigneeList() {
    const consignees = SalesDataStore.getCollection('consignees');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Consignee List</h2>
            <p class="text-xs text-slate-400">Physical destination terminals, cold storages, and receiving port depots</p>
          </div>
          <button id="btn-add-consignee" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>New Consignee</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Code</th>
                <th class="py-3 px-4">Consignee Name</th>
                <th class="py-3 px-4">Country</th>
                <th class="py-3 px-4">Address</th>
                <th class="py-3 px-4">Contact</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${consignees.map(c => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-mono font-bold text-teal-700">${c.code}</td>
                  <td class="py-3.5 px-4 font-bold text-[#0F172A]">${c.name}</td>
                  <td class="py-3.5 px-4 font-semibold">${c.country}</td>
                  <td class="py-3.5 px-4 text-slate-500 max-w-xs">${c.address}</td>
                  <td class="py-3.5 px-4">
                    <div>${c.contactPerson}</div>
                    <div class="text-[11px] text-slate-400">${c.phone}</div>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <button class="btn-edit-consignee text-[#006C7A] hover:underline font-semibold" data-id="${c.id}">Edit</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 2.3 Notify Party List
  renderNotifyPartyList() {
    const notifyParties = SalesDataStore.getCollection('notifyParties');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Notify Party List</h2>
            <p class="text-xs text-slate-400">Destination freight forwarders, customs brokers, and SCAC code references</p>
          </div>
          <button id="btn-add-notify" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>New Notify Party</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">SCAC</th>
                <th class="py-3 px-4">Notify Party Name</th>
                <th class="py-3 px-4">Country</th>
                <th class="py-3 px-4">Address</th>
                <th class="py-3 px-4">Contact</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${notifyParties.map(np => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-mono font-bold text-teal-700">${np.scacCode || 'N/A'}</td>
                  <td class="py-3.5 px-4 font-bold text-[#0F172A]">${np.name}</td>
                  <td class="py-3.5 px-4 font-semibold">${np.country}</td>
                  <td class="py-3.5 px-4 text-slate-500 max-w-xs">${np.address}</td>
                  <td class="py-3.5 px-4">
                    <div>${np.contactPerson}</div>
                    <div class="text-[11px] text-slate-400">${np.email}</div>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <button class="btn-edit-notify text-[#006C7A] hover:underline font-semibold" data-id="${np.id}">Edit</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 2.4 Applicant List
  renderApplicantList() {
    const applicants = SalesDataStore.getCollection('applicants');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Applicant List</h2>
            <p class="text-xs text-slate-400">Entities applying for Letters of Credit (LC) and export licenses</p>
          </div>
          <button id="btn-add-applicant" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>New Applicant</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Applicant Name</th>
                <th class="py-3 px-4">Bound Buyer</th>
                <th class="py-3 px-4">Country</th>
                <th class="py-3 px-4">Address</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${applicants.map(app => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-bold text-[#0F172A]">${app.applicantName}</td>
                  <td class="py-3.5 px-4 font-medium text-teal-800">${app.buyerName}</td>
                  <td class="py-3.5 px-4 font-semibold">${app.country}</td>
                  <td class="py-3.5 px-4 text-slate-500">${app.address}</td>
                  <td class="py-3.5 px-4 text-right">
                    <button class="btn-edit-applicant text-[#006C7A] hover:underline font-semibold" data-id="${app.id}">Edit</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 2.5 Brands List
  renderBrandsList() {
    const brands = SalesDataStore.getCollection('brands');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Brands List</h2>
            <p class="text-xs text-slate-400">House brands vs Private Label export brands and packaging print approval</p>
          </div>
          <button id="btn-add-brand" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>New Brand</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Brand Name</th>
                <th class="py-3 px-4">Associated Buyer</th>
                <th class="py-3 px-4">Brand Type</th>
                <th class="py-3 px-4">Print Approval Status</th>
                <th class="py-3 px-4">Remarks</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${brands.map(b => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-bold text-[#0F172A]">${b.brandName}</td>
                  <td class="py-3.5 px-4 font-medium text-slate-700">${b.buyer}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded text-[11px] font-semibold ${
                      b.brandType === 'Store' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                      b.brandType === 'Sale' ? 'bg-teal-50 text-teal-700 border border-teal-200' :
                      'bg-slate-100 text-slate-700 border border-slate-200'
                    }">
                      ${b.brandType === 'Store' ? 'House Brand' : b.brandType === 'Sale' ? 'Private Label' : 'Both'}
                    </span>
                  </td>
                  <td class="py-3.5 px-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                      b.printStatus === 'Approved for Print' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      b.printStatus === 'Pending Approval' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-rose-50 text-rose-700 border border-rose-200'
                    }">
                      ${b.printStatus}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 text-slate-500">${b.remarks}</td>
                  <td class="py-3.5 px-4 text-right">
                    <button class="btn-edit-brand text-[#006C7A] hover:underline font-semibold" data-id="${b.id}">Edit</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // ==========================================
  // MODULE 3: ORDERS (SALES EXECUTION)
  // ==========================================

  // 3.1 Proforma List
  renderProformaList() {
    const pis = SalesDataStore.getCollection('proformaInvoices');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Proforma Invoices (PI Register)</h2>
            <p class="text-xs text-slate-400">Preliminary export commercial quotes, PO matching, and container allocation</p>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-new-pi" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
              <span>New Proforma Invoice</span>
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">P.Inv Number</th>
                <th class="py-3 px-4">Date</th>
                <th class="py-3 px-4">PO Number</th>
                <th class="py-3 px-4">Buyer</th>
                <th class="py-3 px-4">Processor Plant</th>
                <th class="py-3 px-4">Port of Discharge</th>
                <th class="py-3 px-4">ShipBy Window</th>
                <th class="py-3 px-4">Total USD</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${pis.map(pi => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-bold text-[#0F172A]">${pi.piNumber}</td>
                  <td class="py-3.5 px-4 text-slate-500">${pi.piDate}</td>
                  <td class="py-3.5 px-4 font-mono font-bold text-teal-800">${pi.poNumber}</td>
                  <td class="py-3.5 px-4 font-semibold">${pi.buyer}</td>
                  <td class="py-3.5 px-4 text-slate-600">${pi.productionPlant}</td>
                  <td class="py-3.5 px-4">${pi.portOfDischarge}</td>
                  <td class="py-3.5 px-4 text-slate-500">${pi.shipByWindow}</td>
                  <td class="py-3.5 px-4 font-bold text-slate-900">$${(pi.totalAmountUsd || 0).toLocaleString()}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                      pi.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      pi.status === 'Po Received' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                      'bg-slate-100 text-slate-700 border border-slate-200'
                    }">
                      ${pi.status}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                    <button class="btn-view-pi text-[#006C7A] hover:underline font-semibold" data-id="${pi.id}">View</button>
                    <button class="btn-print-pi text-slate-500 hover:text-slate-800 font-semibold" data-id="${pi.id}">Print</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 3.3 Custom Invoices
  renderCustomInvoices() {
    const customInvoices = SalesDataStore.getCollection('customInvoices');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Custom Invoices (Commercial Dispatch Ledger)</h2>
            <p class="text-xs text-slate-400">Stock out release status and carton quantity reconciliations</p>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Invoice No</th>
                <th class="py-3 px-4">Date</th>
                <th class="py-3 px-4">PO No</th>
                <th class="py-3 px-4">Buyer</th>
                <th class="py-3 px-4">P.Invoice No</th>
                <th class="py-3 px-4">Stock Out Date</th>
                <th class="py-3 px-4">Total Cartons</th>
                <th class="py-3 px-4">Value (USD)</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${customInvoices.map(ci => `
                <tr class="hover:bg-slate-50/70 transition-colors ${ci.requiresAttention ? 'bg-amber-50/40' : ''}">
                  <td class="py-3.5 px-4 font-bold text-[#0F172A]">${ci.invoiceNo}</td>
                  <td class="py-3.5 px-4 text-slate-500">${ci.invoiceDate}</td>
                  <td class="py-3.5 px-4 font-mono font-bold text-teal-800">${ci.poNumber}</td>
                  <td class="py-3.5 px-4 font-semibold">${ci.buyer}</td>
                  <td class="py-3.5 px-4 font-mono text-slate-600">${ci.piNumber}</td>
                  <td class="py-3.5 px-4">
                    ${ci.stockOutDate 
                      ? `<span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${ci.stockOutDate}</span>` 
                      : `<span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Pending</span>`
                    }
                  </td>
                  <td class="py-3.5 px-4 font-bold">${ci.totalCartons} Cartons</td>
                  <td class="py-3.5 px-4 font-bold text-teal-700">$${(ci.invoiceValueUsd || 0).toLocaleString()}</td>
                  <td class="py-3.5 px-4 text-right space-x-2">
                    <button class="btn-download-cinv text-[#006C7A] hover:underline font-semibold" data-id="${ci.id}">Download</button>
                    <button class="btn-view-cinv text-slate-500 hover:underline font-semibold" data-id="${ci.id}">View</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 3.4 ISF Details (10+2 US Customs Filing)
  renderIsfDetails() {
    const isfList = SalesDataStore.getCollection('isfDetails');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">ISF 10+2 Details (Importer Security Filing)</h2>
            <p class="text-xs text-slate-400">US Customs 24-Hour pre-loading manifest: container numbers, liner seals, and reefer telemetry</p>
          </div>
          <button id="btn-add-isf" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>Add ISF Details</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Container No (4L+7D)</th>
                <th class="py-3 px-4">Liner Seal No</th>
                <th class="py-3 px-4">Shipping Line</th>
                <th class="py-3 px-4">BL Number</th>
                <th class="py-3 px-4">Invoice No</th>
                <th class="py-3 px-4">Stuffing Location</th>
                <th class="py-3 px-4">Temperature</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${isfList.map(isf => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-mono font-bold text-[#0F172A]">${isf.containerNumber}</td>
                  <td class="py-3.5 px-4 font-mono text-slate-600">${isf.linerSealNumber}</td>
                  <td class="py-3.5 px-4 font-semibold text-slate-800">${isf.shippingLine}</td>
                  <td class="py-3.5 px-4 font-mono text-teal-800">${isf.blNumber}</td>
                  <td class="py-3.5 px-4 font-bold text-slate-700">${isf.customInvoiceNo}</td>
                  <td class="py-3.5 px-4 text-slate-600">${isf.stuffingLocation}</td>
                  <td class="py-3.5 px-4 font-semibold text-sky-700">${isf.tempRecord}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                      isf.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }">
                      ${isf.status}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <button class="btn-edit-isf text-[#006C7A] hover:underline font-semibold" data-id="${isf.id}">Edit</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 3.5 Shipping Bill
  renderShippingBill() {
    const sbs = SalesDataStore.getCollection('shippingBills');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Shipping Bill Register (Indian Customs EDI)</h2>
            <p class="text-xs text-slate-400">Let Export Order (LEO) dates, statutory exchange rates, and automated FOB INR calculation</p>
          </div>
          <button id="btn-add-sb" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>Record Shipping Bill</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Shipping Bill No</th>
                <th class="py-3 px-4">Invoice No</th>
                <th class="py-3 px-4">Shipping Date</th>
                <th class="py-3 px-4">LEO Date</th>
                <th class="py-3 px-4">Ex Rate</th>
                <th class="py-3 px-4">SB FOB US$</th>
                <th class="py-3 px-4">SB FOB INR (Auto)</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${sbs.map(sb => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-mono font-bold text-[#0F172A]">${sb.shippingBillNo}</td>
                  <td class="py-3.5 px-4 font-bold text-teal-800">${sb.invoiceNo}</td>
                  <td class="py-3.5 px-4 text-slate-500">${sb.shippingDate}</td>
                  <td class="py-3.5 px-4 font-semibold text-emerald-700">${sb.leoDate}</td>
                  <td class="py-3.5 px-4 font-mono">₹${sb.exchangeRate}</td>
                  <td class="py-3.5 px-4 font-bold text-slate-900">$${(sb.sbFobUsd || 0).toLocaleString()}</td>
                  <td class="py-3.5 px-4 font-bold text-teal-700">₹${((sb.sbFobInr || 0) / 100000).toFixed(2)} Lakhs</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${sb.status}</span>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <button class="btn-edit-sb text-[#006C7A] hover:underline font-semibold" data-id="${sb.id}">Edit</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 3.6 Commercial Invoice
  renderCommercialInvoice() {
    const cinvs = SalesDataStore.getCollection('commercialInvoices');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Final Commercial Invoices</h2>
            <p class="text-xs text-slate-400">Legal financial export instruments, bank negotiation sets, and temperature logger bindings</p>
          </div>
          <button id="btn-add-comminv" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>Generate Invoice</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Invoice No</th>
                <th class="py-3 px-4">Date</th>
                <th class="py-3 px-4">PO Number</th>
                <th class="py-3 px-4">Buyer Entity</th>
                <th class="py-3 px-4">BL Number</th>
                <th class="py-3 px-4">Container No</th>
                <th class="py-3 px-4">Temp Logger</th>
                <th class="py-3 px-4">Total Value</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${cinvs.map(ci => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-bold text-[#0F172A]">${ci.invoiceNo}</td>
                  <td class="py-3.5 px-4 text-slate-500">${ci.invoiceDate}</td>
                  <td class="py-3.5 px-4 font-mono font-bold text-teal-800">${ci.poNumber}</td>
                  <td class="py-3.5 px-4 font-semibold">${ci.buyer}</td>
                  <td class="py-3.5 px-4 font-mono text-slate-600">${ci.blNumber}</td>
                  <td class="py-3.5 px-4 font-mono font-bold">${ci.containerNumber}</td>
                  <td class="py-3.5 px-4 font-mono text-[11px] text-sky-700">${ci.tempLoggerId}</td>
                  <td class="py-3.5 px-4 font-bold text-teal-700">$${(ci.invoiceValue || 0).toLocaleString()}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${ci.status}</span>
                  </td>
                  <td class="py-3.5 px-4 text-right space-x-2">
                    <button class="btn-print-comminv text-[#006C7A] hover:underline font-semibold" data-id="${ci.id}">Print</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 3.7 ETA Status
  renderEtaStatus() {
    const etas = SalesDataStore.getCollection('etaStatus');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Ocean Transit & ETA Tracking</h2>
            <p class="text-xs text-slate-400">Vessel departure on-board dates, liner transit days, and destination discharge telemetry</p>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Invoice No</th>
                <th class="py-3 px-4">Buyer</th>
                <th class="py-3 px-4">Container No</th>
                <th class="py-3 px-4">Liner</th>
                <th class="py-3 px-4">Final Destination</th>
                <th class="py-3 px-4">On Board Date</th>
                <th class="py-3 px-4">Discharge ETA</th>
                <th class="py-3 px-4">Transit Days</th>
                <th class="py-3 px-4">USFDA Prior Notice</th>
                <th class="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${etas.map(e => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-bold text-[#0F172A]">${e.invoiceNo}</td>
                  <td class="py-3.5 px-4 font-medium">${e.buyer}</td>
                  <td class="py-3.5 px-4 font-mono font-bold text-teal-800">${e.containerNumber}</td>
                  <td class="py-3.5 px-4 font-semibold text-slate-800">${e.liner}</td>
                  <td class="py-3.5 px-4 font-medium">${e.finalDestination}</td>
                  <td class="py-3.5 px-4 text-slate-500">${e.onBoardDate}</td>
                  <td class="py-3.5 px-4 font-bold text-emerald-700">${e.actualEta}</td>
                  <td class="py-3.5 px-4 font-mono font-bold">${e.transitDays} Days</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-sky-50 text-sky-700 border border-sky-200">${e.isFda}</span>
                  </td>
                  <td class="py-3.5 px-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-teal-50 text-teal-700 border border-teal-200 flex items-center gap-1 w-max">
                      <span class="w-1.5 h-1.5 rounded-full bg-teal-600 animate-ping"></span>
                      ${e.status}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 3.8 FDA Status
  renderFdaStatus() {
    const fdaList = SalesDataStore.getCollection('fdaStatus');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">USFDA / EU / CFIA Health Inspection & Release</h2>
            <p class="text-xs text-slate-400">Prior Notice filings, document examinations, sampling clearances, and release notices</p>
          </div>
          <button id="btn-add-fda" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>Add FDA Details</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">FDA Entry Number</th>
                <th class="py-3 px-4">Invoice No</th>
                <th class="py-3 px-4">Buyer</th>
                <th class="py-3 px-4">Container No</th>
                <th class="py-3 px-4">Entry Date</th>
                <th class="py-3 px-4">Examination Status</th>
                <th class="py-3 px-4">Notice Date 1</th>
                <th class="py-3 px-4">Release Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${fdaList.map(fda => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-mono font-bold text-[#0F172A]">${fda.fdaEntryNumber}</td>
                  <td class="py-3.5 px-4 font-bold text-teal-800">${fda.invoiceNo}</td>
                  <td class="py-3.5 px-4 font-medium">${fda.buyer}</td>
                  <td class="py-3.5 px-4 font-mono font-bold">${fda.containerNumber}</td>
                  <td class="py-3.5 px-4 text-slate-500">${fda.fdaEntryDate}</td>
                  <td class="py-3.5 px-4 font-semibold text-amber-700">${fda.fdaExam}</td>
                  <td class="py-3.5 px-4 text-slate-500">${fda.noticeDate1 || 'N/A'}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                      fda.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      'bg-amber-50 text-amber-700 border border-amber-200'
                    }">
                      ${fda.status}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <button class="btn-edit-fda text-[#006C7A] hover:underline font-semibold" data-id="${fda.id}">Update</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 3.9 Clearing Agent
  renderClearingAgent() {
    const agents = SalesDataStore.getCollection('clearingAgents');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Destination Clearing Agents</h2>
            <p class="text-xs text-slate-400">Customs clearance agents assigned at destination ports of discharge</p>
          </div>
          <button id="btn-add-agent" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>Assign Agent</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Invoice No</th>
                <th class="py-3 px-4">Buyer</th>
                <th class="py-3 px-4">BL No</th>
                <th class="py-3 px-4">Port of Discharge</th>
                <th class="py-3 px-4">Notify Party</th>
                <th class="py-3 px-4">Assigned Agent & Contact</th>
                <th class="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${agents.map(ag => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-bold text-[#0F172A]">${ag.invoiceNo}</td>
                  <td class="py-3.5 px-4 font-semibold">${ag.buyer}</td>
                  <td class="py-3.5 px-4 font-mono text-teal-800">${ag.blNumber}</td>
                  <td class="py-3.5 px-4 font-medium">${ag.portOfDischarge}</td>
                  <td class="py-3.5 px-4 text-slate-600">${ag.notifyPartyName}</td>
                  <td class="py-3.5 px-4">
                    <div class="font-bold text-slate-900">${ag.agentName}</div>
                    <div class="text-[11px] text-slate-400">${ag.contactPhone}</div>
                  </td>
                  <td class="py-3.5 px-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${ag.status}</span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // ==========================================
  // MODULE 4: PAYMENTS & FINANCIALS
  // ==========================================

  // 4.1 Forward Contracts
  renderForwardContracts() {
    const fcs = SalesDataStore.getCollection('forwardContracts');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">FX Forward Contracts (Currency Hedging)</h2>
            <p class="text-xs text-slate-400">Lock in forward USD/INR exchange rates, branch margins, and monitor utilization balances</p>
          </div>
          <button id="btn-add-fc" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>New Forward Contract</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Contract Number</th>
                <th class="py-3 px-4">Booked Date</th>
                <th class="py-3 px-4">Booked Value (USD)</th>
                <th class="py-3 px-4">Spot Rate</th>
                <th class="py-3 px-4">Premium</th>
                <th class="py-3 px-4">Margin</th>
                <th class="py-3 px-4">Total Rate (Auto)</th>
                <th class="py-3 px-4">Utilisation Progress</th>
                <th class="py-3 px-4">Balance USD</th>
                <th class="py-3 px-4">Validity</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${fcs.map(fc => {
                const pct = Math.round((fc.utilizedValueUsd / fc.bookedValueUsd) * 100);
                const daysOverdue = SalesDataStore.calculateDaysOverdue(fc.endDate);
                return `
                  <tr class="hover:bg-slate-50/70 transition-colors">
                    <td class="py-3.5 px-4 font-mono font-bold text-[#0F172A]">${fc.contractNumber}</td>
                    <td class="py-3.5 px-4 text-slate-500">${fc.bookedDate}</td>
                    <td class="py-3.5 px-4 font-bold text-slate-900">$${(fc.bookedValueUsd || 0).toLocaleString()}</td>
                    <td class="py-3.5 px-4 font-mono">₹${fc.spotRate}</td>
                    <td class="py-3.5 px-4 font-mono text-emerald-700">+₹${fc.premiumRate}</td>
                    <td class="py-3.5 px-4 font-mono text-rose-700">-₹${fc.branchMargin}</td>
                    <td class="py-3.5 px-4 font-mono font-bold text-teal-700 bg-teal-50/50">₹${fc.totalRate}</td>
                    <td class="py-3.5 px-4 min-w-[140px]">
                      <div class="flex justify-between text-[11px] mb-1">
                        <span class="font-bold text-slate-700">${pct}%</span>
                        <span class="text-slate-400">$${(fc.utilizedValueUsd || 0).toLocaleString()}</span>
                      </div>
                      <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div class="h-full rounded-full bg-teal-500" style="width: ${pct}%;"></div>
                      </div>
                    </td>
                    <td class="py-3.5 px-4 font-bold text-slate-800">$${(fc.balanceValueUsd || 0).toLocaleString()}</td>
                    <td class="py-3.5 px-4">
                      ${daysOverdue < 0 
                        ? `<span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-rose-50 text-rose-700 border border-rose-200">${Math.abs(daysOverdue)} days overdue</span>`
                        : `<span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${daysOverdue} days remaining</span>`
                      }
                    </td>
                    <td class="py-3.5 px-4 text-right">
                      <button class="btn-edit-fc text-[#006C7A] hover:underline font-semibold" data-id="${fc.id}">Edit</button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 4.2 Collections
  renderCollections() {
    const collections = SalesDataStore.getCollection('collections');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Export Invoice Collections</h2>
            <p class="text-xs text-slate-400">Track incoming buyer remittances, bank service charges, deductions, and realized INR values</p>
          </div>
          <button id="btn-add-collection" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>Record Collection</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Invoice No</th>
                <th class="py-3 px-4">PO No</th>
                <th class="py-3 px-4">Buyer</th>
                <th class="py-3 px-4">Invoice USD</th>
                <th class="py-3 px-4">Utilized USD</th>
                <th class="py-3 px-4">Balance USD</th>
                <th class="py-3 px-4">Bank Ref No</th>
                <th class="py-3 px-4">Value INR (Auto)</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${collections.map(col => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-bold text-[#0F172A]">${col.invoiceNo}</td>
                  <td class="py-3.5 px-4 font-mono font-bold text-slate-700">${col.poNumber}</td>
                  <td class="py-3.5 px-4 font-medium">${col.buyer}</td>
                  <td class="py-3.5 px-4 font-bold text-slate-900">$${(col.invoiceValueUsd || 0).toLocaleString()}</td>
                  <td class="py-3.5 px-4 font-bold text-emerald-700">$${(col.utilizedValueUsd || 0).toLocaleString()}</td>
                  <td class="py-3.5 px-4 font-bold ${col.balanceUsd > 0 ? 'text-rose-700' : 'text-slate-500'}">$${(col.balanceUsd || 0).toLocaleString()}</td>
                  <td class="py-3.5 px-4 font-mono text-[11px] text-slate-600">${col.bankRefNo}</td>
                  <td class="py-3.5 px-4 font-bold text-teal-700">₹${((col.valueInr || 0) / 100000).toFixed(2)} Lakhs</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                      col.status === 'Fully Collected' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      'bg-amber-50 text-amber-700 border border-amber-200'
                    }">
                      ${col.status}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <button class="btn-edit-collection text-[#006C7A] hover:underline font-semibold" data-id="${col.id}">Edit</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 4.3 Negotiations
  renderNegotiations() {
    const negotiations = SalesDataStore.getCollection('negotiations');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Bank Document Negotiations</h2>
            <p class="text-xs text-slate-400">Submission of original export document sets (BL, Health Cert, CO) for bank negotiation</p>
          </div>
          <button id="btn-add-neg" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>Submit for Negotiation</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Invoice No</th>
                <th class="py-3 px-4">PO Number</th>
                <th class="py-3 px-4">Consignee</th>
                <th class="py-3 px-4">Bank Ref No</th>
                <th class="py-3 px-4">Submission Date</th>
                <th class="py-3 px-4">Document Package</th>
                <th class="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${negotiations.map(neg => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-bold text-[#0F172A]">${neg.invoiceNo}</td>
                  <td class="py-3.5 px-4 font-mono text-slate-700">${neg.poNumber}</td>
                  <td class="py-3.5 px-4 font-medium">${neg.consigneeName}</td>
                  <td class="py-3.5 px-4 font-mono font-bold text-teal-800">${neg.bankRefNo}</td>
                  <td class="py-3.5 px-4 text-slate-500">${neg.submissionDate}</td>
                  <td class="py-3.5 px-4 text-slate-600 max-w-xs truncate">${neg.docType}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-sky-50 text-sky-700 border border-sky-200">${neg.status}</span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 4.4 & 4.5 Realizations & Realization Done
  renderRealization() {
    const realizations = SalesDataStore.getCollection('realizations');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Payment Realization Queue</h2>
            <p class="text-xs text-slate-400">Track invoices submitted for bank discounting awaiting clearance</p>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Invoice No</th>
                <th class="py-3 px-4">Sales Date</th>
                <th class="py-3 px-4">Consignee</th>
                <th class="py-3 px-4">Transaction Type</th>
                <th class="py-3 px-4">Total USD</th>
                <th class="py-3 px-4">Bank Ref</th>
                <th class="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${realizations.map(r => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-bold text-[#0F172A]">${r.invoiceNo}</td>
                  <td class="py-3.5 px-4 text-slate-500">${r.salesInvoiceDate}</td>
                  <td class="py-3.5 px-4 font-medium">${r.consignee}</td>
                  <td class="py-3.5 px-4 text-slate-600">${r.transactionType}</td>
                  <td class="py-3.5 px-4 font-bold text-slate-900">$${(r.totalInvoiceValueUsd || 0).toLocaleString()}</td>
                  <td class="py-3.5 px-4 font-mono text-teal-800">${r.bankRefNo}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${r.status}</span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderRealizationDone() {
    return this.renderRealization();
  },

  // ==========================================
  // MODULE 5: CARGO INSURANCE
  // ==========================================

  // 5.1 Pending Insurance
  renderPendingInsurance() {
    const pendingIns = SalesDataStore.getCollection('marineInsurancePending');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Pending Marine Cargo Insurance Queue</h2>
            <p class="text-xs text-slate-400">Select pending ocean shipments to generate unified marine declaration policies</p>
          </div>
          <button id="btn-generate-insurance" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>Generate Insurance Policy</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4 w-10 text-center">
                  <input type="checkbox" id="chk-ins-select-all" class="rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer" />
                </th>
                <th class="py-3 px-4">Invoice No</th>
                <th class="py-3 px-4">Vessel & Voyage</th>
                <th class="py-3 px-4">On Board Date</th>
                <th class="py-3 px-4">Container No</th>
                <th class="py-3 px-4">Port of Loading</th>
                <th class="py-3 px-4">Port of Discharge</th>
                <th class="py-3 px-4">Invoice Value</th>
                <th class="py-3 px-4">Sum Insured (110% CIF)</th>
                <th class="py-3 px-4">Underwriter</th>
                <th class="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${pendingIns.map(ins => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 text-center">
                    <input type="checkbox" class="chk-ins-item rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer" data-id="${ins.id}" />
                  </td>
                  <td class="py-3.5 px-4 font-bold text-[#0F172A]">${ins.invoiceNo}</td>
                  <td class="py-3.5 px-4 font-medium">${ins.vesselName}</td>
                  <td class="py-3.5 px-4 text-slate-500">${ins.shippingOnboardDate}</td>
                  <td class="py-3.5 px-4 font-mono font-bold text-teal-800">${ins.containerNo}</td>
                  <td class="py-3.5 px-4">${ins.portOfLoading}</td>
                  <td class="py-3.5 px-4 font-medium">${ins.portOfDischarge} (${ins.destinationCountry})</td>
                  <td class="py-3.5 px-4 font-bold text-slate-900">$${(ins.totalInvoiceValueUsd || 0).toLocaleString()}</td>
                  <td class="py-3.5 px-4 font-bold text-emerald-700">$${(ins.cargoSumInsuredUsd || 0).toLocaleString()}</td>
                  <td class="py-3.5 px-4 text-slate-600">${ins.underwriter}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-50 text-amber-700 border border-amber-200">${ins.status}</span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 5.2 Insurance Templates (Policies)
  renderInsuranceTemplates() {
    const policies = SalesDataStore.getCollection('insurancePolicies');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Generated Marine Insurance Policies</h2>
            <p class="text-xs text-slate-400">Open marine export policy certificates and underwriter declarations</p>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Policy Number</th>
                <th class="py-3 px-4">Generated Date</th>
                <th class="py-3 px-4">Invoices Covered</th>
                <th class="py-3 px-4">Total Sum Insured</th>
                <th class="py-3 px-4">Premium Paid</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${policies.map(pol => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-mono font-bold text-[#0F172A]">${pol.policyNumber}</td>
                  <td class="py-3.5 px-4 text-slate-500">${pol.generatedOn}</td>
                  <td class="py-3.5 px-4 font-bold text-teal-800">${pol.invoicesCount} Invoices</td>
                  <td class="py-3.5 px-4 font-bold text-slate-900">$${(pol.totalSumInsuredUsd || 0).toLocaleString()}</td>
                  <td class="py-3.5 px-4 font-bold text-teal-700">₹${((pol.premiumPaidInr || 0) / 1000).toFixed(1)}k</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${pol.status}</span>
                  </td>
                  <td class="py-3.5 px-4 text-right space-x-2">
                    <button class="btn-download-policy text-[#006C7A] hover:underline font-semibold" data-id="${pol.id}">Download Certificate</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 5.3 Insurance Payments (Fixing the wall-of-text issue)
  renderInsurancePayments() {
    const payments = SalesDataStore.getCollection('insurancePayments');

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-base font-bold text-[#0F172A]">Marine Insurance Premium Payments</h2>
            <p class="text-xs text-slate-400">Consolidated premium settlements with interactive modal invoice breakdowns</p>
          </div>
          <button id="btn-add-inspay" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A8B5] hover:bg-[#008f9a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>Record Premium Payment</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Payment Ref No</th>
                <th class="py-3 px-4">Date</th>
                <th class="py-3 px-4">Underwriter</th>
                <th class="py-3 px-4">Cheque / UTR Ref</th>
                <th class="py-3 px-4">Invoices Settled (Compact)</th>
                <th class="py-3 px-4">Total Premium Paid</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${payments.map(pay => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-mono font-bold text-[#0F172A]">${pay.insNo}</td>
                  <td class="py-3.5 px-4 text-slate-500">${pay.paymentDate}</td>
                  <td class="py-3.5 px-4 font-semibold">${pay.underwriter}</td>
                  <td class="py-3.5 px-4 font-mono text-slate-600">${pay.chequeRef}</td>
                  <td class="py-3.5 px-4">
                    <button class="btn-view-covered-invoices px-3 py-1 rounded-full text-[11px] font-bold bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 transition-colors cursor-pointer" data-id="${pay.id}">
                      ${pay.invoicesCount || (pay.invoicesList || []).length} Invoices (View List)
                    </button>
                  </td>
                  <td class="py-3.5 px-4 font-bold text-emerald-700">₹${((pay.totalPremiumInr || 0) / 100000).toFixed(2)} Lakhs</td>
                  <td class="py-3.5 px-4 text-right">
                    <button class="btn-view-inspay text-[#006C7A] hover:underline font-semibold" data-id="${pay.id}">Receipt</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // ==========================================
  // 4. SALES OVERVIEW (Matching reference HTML page-sales)
  // ==========================================
  renderSalesOverview() {
    const data = SalesDataStore.getAll();
    const kpis = data.dashboardKpis || {};
    return `
      <div class="space-y-6">
        <!-- Sales Overview Welcome Hero Card -->
        <div class="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0369A1] rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div class="relative z-10 max-w-3xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-sky-200 text-xs font-semibold mb-3 border border-white/20">
              <span class="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
              Devi Fisheries Limited ERP &bull; Sales & Export Module
            </div>
            <h2 class="text-2xl sm:text-3xl font-black tracking-tight mb-2">Sales Overview</h2>
            <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
              Welcome to the Sales module. Use the sub-tabs above to navigate through Orders, Payments, and Insurance workflows. Seamlessly manage international buyers, customs documentation, USFDA compliance, forward contract hedging, and container tracking.
            </p>
          </div>
          <div class="absolute right-6 -bottom-8 opacity-10 pointer-events-none hidden md:block">
            <svg class="w-64 h-64 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
        </div>

        <!-- Quick Access Workflow Hub -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="#/sales/orders/proforma-list" class="bg-white rounded-2xl p-6 border border-slate-200 hover:border-sky-500 hover:shadow-md transition-all group block">
            <div class="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-105 transition-transform">
              📋
            </div>
            <h3 class="text-base font-black text-[#0F172A] group-hover:text-sky-600 transition-colors">Orders & Execution</h3>
            <p class="text-xs text-slate-500 mt-2 leading-relaxed">
              Proforma Invoices, Customs Invoices, US 10+2 ISF details, Shipping Bills, Commercial Invoices, and port clearances.
            </p>
            <div class="mt-4 text-xs font-bold text-sky-600 flex items-center gap-1">
              <span>View Orders</span> &rarr;
            </div>
          </a>

          <a href="#/sales/payments/forward-contracts" class="bg-white rounded-2xl p-6 border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all group block">
            <div class="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-105 transition-transform">
              💳
            </div>
            <h3 class="text-base font-black text-[#0F172A] group-hover:text-teal-600 transition-colors">Payments & Finance</h3>
            <p class="text-xs text-slate-500 mt-2 leading-relaxed">
              FX Forward Contracts, bank collections, foreign exchange realization, margin deductions, and outstanding receivables.
            </p>
            <div class="mt-4 text-xs font-bold text-teal-600 flex items-center gap-1">
              <span>View Payments</span> &rarr;
            </div>
          </a>

          <a href="#/sales/insurance/pending-insurance" class="bg-white rounded-2xl p-6 border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all group block">
            <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-105 transition-transform">
              🛡️
            </div>
            <h3 class="text-base font-black text-[#0F172A] group-hover:text-indigo-600 transition-colors">Cargo Insurance</h3>
            <p class="text-xs text-slate-500 mt-2 leading-relaxed">
              Voyage insurance certificates, cargo declaration policies, open covers, and underwriter settlement tracking.
            </p>
            <div class="mt-4 text-xs font-bold text-indigo-600 flex items-center gap-1">
              <span>View Insurance</span> &rarr;
            </div>
          </a>
        </div>

        <!-- Master Data & Operational Modules -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="#/sales/product/product-list" class="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-400 transition-all block">
            <div class="flex items-center gap-3">
              <span class="text-2xl">🦐</span>
              <div>
                <h4 class="text-sm font-bold text-[#0F172A]">Product Master & Varieties</h4>
                <p class="text-xs text-slate-500 mt-0.5">Species, preparations, grades, and SUPC SKUs</p>
              </div>
            </div>
          </a>
          <a href="#/sales/buyers/buyer-list" class="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-400 transition-all block">
            <div class="flex items-center gap-3">
              <span class="text-2xl">🌍</span>
              <div>
                <h4 class="text-sm font-bold text-[#0F172A]">Buyers & Consignees</h4>
                <p class="text-xs text-slate-500 mt-0.5">International buyers, notify parties, and private labels</p>
              </div>
            </div>
          </a>
          <a href="#/sales/reports/reports-overview" class="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-400 transition-all block">
            <div class="flex items-center gap-3">
              <span class="text-2xl">📊</span>
              <div>
                <h4 class="text-sm font-bold text-[#0F172A]">Reports & Analytics</h4>
                <p class="text-xs text-slate-500 mt-0.5">Delayed shipments, sales summaries, and finished inventory</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    `;
  },

  // ==========================================
  // 8. REPORTS (Matching reference HTML page-reports)
  // ==========================================
  renderReportsOverview() {
    return `
      <div class="space-y-6">
        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
          <h2 class="text-xl font-bold text-[#0F172A] mb-1">Reports</h2>
          <p class="text-xs text-slate-500 mb-6">Select from the available enterprise sales, logistics, and inventory reports below.</p>
          
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Available Reports</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Delayed Shipments -->
            <a href="#/sales/reports/delayed-shipments" class="bg-slate-50 hover:bg-white rounded-xl p-5 border border-slate-200 hover:border-rose-400 hover:shadow-md transition-all group block">
              <div class="text-2xl mb-2">📋</div>
              <h3 class="font-bold text-sm text-[#0F172A] group-hover:text-rose-600 transition-colors">Delayed Shipments</h3>
              <p class="text-slate-500 text-xs mt-2 leading-relaxed">View shipments that are past their ship-by date and ocean liner schedule adjustments</p>
              <div class="mt-4 text-xs font-bold text-rose-600">Open Report &rarr;</div>
            </a>

            <!-- Sales Summary -->
            <a href="#/sales/reports/sales-summary" class="bg-slate-50 hover:bg-white rounded-xl p-5 border border-slate-200 hover:border-sky-400 hover:shadow-md transition-all group block">
              <div class="text-2xl mb-2">📊</div>
              <h3 class="font-bold text-sm text-[#0F172A] group-hover:text-sky-600 transition-colors">Sales Summary</h3>
              <p class="text-slate-500 text-xs mt-2 leading-relaxed">Monthly and yearly sales performance, export destinations, and FOB value</p>
              <div class="mt-4 text-xs font-bold text-sky-600">Open Report &rarr;</div>
            </a>

            <!-- Payment Status -->
            <a href="#/sales/reports/payment-status" class="bg-slate-50 hover:bg-white rounded-xl p-5 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all group block">
              <div class="text-2xl mb-2">💳</div>
              <h3 class="font-bold text-sm text-[#0F172A] group-hover:text-emerald-600 transition-colors">Payment Status</h3>
              <p class="text-slate-500 text-xs mt-2 leading-relaxed">Track outstanding receivables, forward hedge rates, and realized payments</p>
              <div class="mt-4 text-xs font-bold text-emerald-600">Open Report &rarr;</div>
            </a>

            <!-- Finished Goods Inventory -->
            <a href="#/sales/reports/inventory-report" class="bg-slate-50 hover:bg-white rounded-xl p-5 border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all group block">
              <div class="text-2xl mb-2">📦</div>
              <h3 class="font-bold text-sm text-[#0F172A] group-hover:text-amber-600 transition-colors">Finished Goods Inventory</h3>
              <p class="text-slate-500 text-xs mt-2 leading-relaxed">Stock available for export dispatch across Block and IQF coldstore racks</p>
              <div class="mt-4 text-xs font-bold text-amber-600">Open Report &rarr;</div>
            </a>
          </div>
        </div>
      </div>
    `;
  },

  renderDelayedShipmentsReport() {
    const shipments = SalesDataStore.getCollection('delayedShipments') || [];
    return `
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-lg font-bold text-[#0F172A]">Delayed Shipments Report</h2>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">${shipments.length} Active Exceptions</span>
            </div>
            <p class="text-xs text-slate-500 mt-1">Shipments past their agreed ship-by date or experiencing feeder connection delays</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="window.print()" class="px-3.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">Export PDF</button>
            <a href="#/sales/reports/reports-overview" class="px-3.5 py-1.5 rounded-lg bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors">All Reports</a>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">PO & Invoice No</th>
                <th class="py-3 px-4">Buyer</th>
                <th class="py-3 px-4">Destination Port</th>
                <th class="py-3 px-4">Scheduled Ship Date</th>
                <th class="py-3 px-4">Current ETA</th>
                <th class="py-3 px-4">Days Delayed</th>
                <th class="py-3 px-4">Ocean Liner</th>
                <th class="py-3 px-4">Delay Reason</th>
                <th class="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${shipments.map(s => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-mono font-bold text-[#0F172A]">${s.orderNo}<br><span class="text-slate-400 font-normal">${s.invoiceNo}</span></td>
                  <td class="py-3.5 px-4 font-semibold">${s.buyer}</td>
                  <td class="py-3.5 px-4 text-slate-600">${s.destinationPort}</td>
                  <td class="py-3.5 px-4 text-slate-500">${s.scheduledShipDate}</td>
                  <td class="py-3.5 px-4 font-semibold text-rose-700">${s.currentEta}</td>
                  <td class="py-3.5 px-4 font-bold text-rose-600">+${s.daysDelayed} Days</td>
                  <td class="py-3.5 px-4 font-semibold text-slate-700">${s.liner}</td>
                  <td class="py-3.5 px-4 text-slate-600 max-w-xs truncate" title="${s.delayReason}">${s.delayReason}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">${s.status}</span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderSalesSummaryReport() {
    const summaries = SalesDataStore.getCollection('salesSummaries') || [];
    return `
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 class="text-lg font-bold text-[#0F172A]">Sales & Export Performance Summary</h2>
            <p class="text-xs text-slate-500 mt-1">Regional shipment volumes, container dispatches, FOB USD value, and bank realizations</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="window.print()" class="px-3.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">Export CSV</button>
            <a href="#/sales/reports/reports-overview" class="px-3.5 py-1.5 rounded-lg bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors">All Reports</a>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Region / Market</th>
                <th class="py-3 px-4">Destination Ports</th>
                <th class="py-3 px-4">Orders</th>
                <th class="py-3 px-4">Containers (40ft)</th>
                <th class="py-3 px-4">Volume (MT)</th>
                <th class="py-3 px-4">FOB Value (USD)</th>
                <th class="py-3 px-4">Realized Value (INR)</th>
                <th class="py-3 px-4">Realization %</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${summaries.map(s => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-bold text-[#0F172A]">${s.region}</td>
                  <td class="py-3.5 px-4 text-slate-600">${s.destinationPorts}</td>
                  <td class="py-3.5 px-4 font-semibold">${s.ordersCount}</td>
                  <td class="py-3.5 px-4 font-semibold text-sky-700">${s.containersCount} FCL</td>
                  <td class="py-3.5 px-4 font-bold">${s.volumeMt.toLocaleString()} MT</td>
                  <td class="py-3.5 px-4 font-bold font-mono text-[#0F172A]">$${(s.fobUsd / 1000000).toFixed(2)}M</td>
                  <td class="py-3.5 px-4 font-bold font-mono text-emerald-700">₹${(s.realizedInr / 10000000).toFixed(2)} Cr</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${s.realizationPct}%</span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderPaymentStatusReport() {
    const collections = SalesDataStore.getCollection('collections') || [];
    return `
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 class="text-lg font-bold text-[#0F172A]">Payment Status & Realization Report</h2>
            <p class="text-xs text-slate-500 mt-1">Export invoice receivables, banking fees, and net foreign exchange realizations</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="window.print()" class="px-3.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">Export PDF</button>
            <a href="#/sales/reports/reports-overview" class="px-3.5 py-1.5 rounded-lg bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors">All Reports</a>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Invoice No</th>
                <th class="py-3 px-4">Buyer</th>
                <th class="py-3 px-4">Invoice Value (USD)</th>
                <th class="py-3 px-4">Utilized FX Rate</th>
                <th class="py-3 px-4">Bank Deductions</th>
                <th class="py-3 px-4">Realized INR</th>
                <th class="py-3 px-4">Balance USD</th>
                <th class="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${collections.map(c => `
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3.5 px-4 font-mono font-bold text-[#0F172A]">${c.invoiceNo}</td>
                  <td class="py-3.5 px-4 font-semibold">${c.buyer}</td>
                  <td class="py-3.5 px-4 font-mono font-bold text-slate-700">$${(c.invoiceValueUsd || 0).toLocaleString()}</td>
                  <td class="py-3.5 px-4 font-mono text-slate-600">₹${c.collectionRate || 83.95}</td>
                  <td class="py-3.5 px-4 font-mono text-rose-600">-$${(c.bankChargesUsd || 0) + (c.deductionsUsd || 0)}</td>
                  <td class="py-3.5 px-4 font-bold font-mono text-emerald-700">₹${((c.totalValueInr || 23820812) / 100000).toFixed(2)} Lakhs</td>
                  <td class="py-3.5 px-4 font-mono font-semibold ${c.balanceUsd > 0 ? 'text-amber-600' : 'text-slate-400'}">$${(c.balanceUsd || 0).toLocaleString()}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${c.status === 'Fully Realized' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}">${c.status}</span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderInventoryReport() {
    const varieties = SalesDataStore.getCollection('varieties') || [];
    return `
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 class="text-lg font-bold text-[#0F172A]">Finished Goods Inventory (Export Dispatch)</h2>
            <p class="text-xs text-slate-500 mt-1">Coldstore inventory staged and allocated for international export container stuffing</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="window.print()" class="px-3.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">Export CSV</button>
            <a href="#/sales/reports/reports-overview" class="px-3.5 py-1.5 rounded-lg bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors">All Reports</a>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Our SUPC</th>
                <th class="py-3 px-4">Product Form & Description</th>
                <th class="py-3 px-4">Species</th>
                <th class="py-3 px-4">Grade</th>
                <th class="py-3 px-4">Brand</th>
                <th class="py-3 px-4">Packing Style</th>
                <th class="py-3 px-4">Available Stock</th>
                <th class="py-3 px-4">Total Net Wt</th>
                <th class="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${varieties.map((v, i) => {
                const cartons = (1200 + (i * 350));
                const netKg = cartons * 10;
                return `
                  <tr class="hover:bg-slate-50/70 transition-colors">
                    <td class="py-3.5 px-4 font-mono font-bold text-[#0F172A]">${v.supc}</td>
                    <td class="py-3.5 px-4 font-semibold">${v.description || `${v.species} ${v.productForm}`}</td>
                    <td class="py-3.5 px-4">${v.species}</td>
                    <td class="py-3.5 px-4 font-bold text-slate-800">${v.grade}</td>
                    <td class="py-3.5 px-4">${v.brand}</td>
                    <td class="py-3.5 px-4 font-mono">${v.packingStyle}</td>
                    <td class="py-3.5 px-4 font-bold text-sky-700">${cartons.toLocaleString()} Cartons</td>
                    <td class="py-3.5 px-4 font-bold font-mono text-emerald-700">${netKg.toLocaleString()} KG</td>
                    <td class="py-3.5 px-4">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Export Ready</span>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // ==========================================
  // 9. PRODUCT CONSUMPTION (Matching reference HTML page-consumption)
  // ==========================================
  renderConsumptionLedger() {
    const ledger = SalesDataStore.getCollection('consumptionLedger') || [];
    return `
      <div class="space-y-6">
        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 class="text-xl font-bold text-[#0F172A]">Product Consumption</h2>
              <p class="text-xs text-slate-500 mt-1">Track raw material consumption, processing loss, and finished goods pack-out yield reconciliation.</p>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="window.print()" class="px-3.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">Export Ledger</button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-200/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th class="py-3 px-4">Batch Number</th>
                  <th class="py-3 px-4">Date</th>
                  <th class="py-3 px-4">Species & Grade</th>
                  <th class="py-3 px-4">RM Intake (KG)</th>
                  <th class="py-3 px-4">Peeling/Cut Loss</th>
                  <th class="py-3 px-4">Finished Form</th>
                  <th class="py-3 px-4">Cartons</th>
                  <th class="py-3 px-4">Finished Output (KG)</th>
                  <th class="py-3 px-4">Actual Yield</th>
                  <th class="py-3 px-4">Std Yield</th>
                  <th class="py-3 px-4">Variance</th>
                  <th class="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700">
                ${ledger.map(item => `
                  <tr class="hover:bg-slate-50/70 transition-colors">
                    <td class="py-3.5 px-4 font-mono font-bold text-[#0F172A]">${item.batchNo}</td>
                    <td class="py-3.5 px-4 text-slate-500">${item.date}</td>
                    <td class="py-3.5 px-4 font-semibold">${item.species}<br><span class="text-[11px] text-slate-400">${item.gradeIntake}</span></td>
                    <td class="py-3.5 px-4 font-bold font-mono text-[#0F172A]">${(item.rawMaterialIntakeKg || 0).toLocaleString()} KG</td>
                    <td class="py-3.5 px-4 font-mono text-rose-600">-${(item.peeledLossKg || 0).toLocaleString()} KG</td>
                    <td class="py-3.5 px-4 font-semibold text-slate-700">${item.finishedProductForm}</td>
                    <td class="py-3.5 px-4 font-bold text-sky-700">${item.packOutCartons} Ctns</td>
                    <td class="py-3.5 px-4 font-bold font-mono text-emerald-700">${(item.finishedOutputKg || 0).toLocaleString()} KG</td>
                    <td class="py-3.5 px-4 font-bold text-[#0F172A]">${item.actualYieldPct}%</td>
                    <td class="py-3.5 px-4 text-slate-500">${item.standardYieldPct}%</td>
                    <td class="py-3.5 px-4 font-bold ${item.variancePct.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}">${item.variancePct}</td>
                    <td class="py-3.5 px-4">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${item.status === 'Verified' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-sky-50 text-sky-700 border border-sky-200'}">${item.status}</span>
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
  // EVENT BINDINGS & INTERACTION MODALS
  // ==========================================
  bindEvents() {
    // 1. Add Variety (SKU) Modal with SUPC Auto-Generation
    const btnAddVariety = document.getElementById('btn-add-variety');
    if (btnAddVariety) {
      btnAddVariety.addEventListener('click', () => {
        const packingStyles = SalesDataStore.getCollection('packingStyles');
        const species = SalesDataStore.getCollection('speciesMaster');
        const preps = SalesDataStore.getCollection('preparations');
        const grades = SalesDataStore.getCollection('grades');
        const brands = SalesDataStore.getCollection('brands');
        const varieties = SalesDataStore.getCollection('varieties');

        const initialSupc = SalesDataStore.generateSupc('Block', varieties);

        Modal.open({
          title: "Create New Variety SKU",
          size: "lg",
          content: `
            <form id="form-new-variety" class="space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Freezing Type *</label>
                  <select id="var-freezing" class="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-teal-500 font-semibold">
                    <option value="Block">Block (1001-1999)</option>
                    <option value="IQF/SIQF">IQF / SIQF (2001-2999)</option>
                    <option value="Cooked">Cooked (3001-3999)</option>
                    <option value="Blanched">Blanched (4001-4999)</option>
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Our SUPC (Auto-Generated) *</label>
                  <input type="text" id="var-supc" value="${initialSupc}" readonly class="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-100 font-mono font-bold text-teal-800" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Species *</label>
                  <select id="var-species" class="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-teal-500">
                    ${species.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Preparation *</label>
                  <select id="var-prep" class="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-teal-500">
                    ${preps.map(p => `<option value="${p.name}">${p.name} - ${p.description}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Grade *</label>
                  <select id="var-grade" class="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-teal-500">
                    ${grades.map(g => `<option value="${g.group}">${g.group} (${g.value})</option>`).join('')}
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Brand *</label>
                  <select id="var-brand" class="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-teal-500">
                    ${brands.map(b => `<option value="${b.brandName}">${b.brandName}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Packing Style *</label>
                  <select id="var-packing" class="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-teal-500">
                    ${packingStyles.map(pk => `<option value="${pk.name}">${pk.name}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Buyer SUPC Code</label>
                  <input type="text" id="var-buyer-supc" placeholder="e.g. CUST-SKU-992" class="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-teal-500 font-mono" />
                </div>
              </div>

              <div>
                <label class="block font-bold text-slate-700 mb-1">Product Description (Auto/Custom) *</label>
                <input type="text" id="var-desc" placeholder="e.g. Vannamei HLSO 16/20 Block 10% Glaze" class="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-teal-500" />
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Save Variety SKU", type: "primary" }
          ]
        });

        // Dynamic SUPC update on freezing type change
        const freezingSelect = document.getElementById('var-freezing');
        const supcInput = document.getElementById('var-supc');
        if (freezingSelect && supcInput) {
          freezingSelect.addEventListener('change', (e) => {
            supcInput.value = SalesDataStore.generateSupc(e.target.value, varieties);
          });
        }

        // Save handler
        const btnSave = document.getElementById('modal-btn-1');
        if (btnSave) {
          btnSave.addEventListener('click', () => {
            const supc = document.getElementById('var-supc')?.value;
            const speciesVal = document.getElementById('var-species')?.value;
            const prepVal = document.getElementById('var-prep')?.value;
            const freezingVal = document.getElementById('var-freezing')?.value;
            const gradeVal = document.getElementById('var-grade')?.value;
            const brandVal = document.getElementById('var-brand')?.value;
            const packingVal = document.getElementById('var-packing')?.value;
            const buyerSupc = document.getElementById('var-buyer-supc')?.value || `SKU-${supc}`;
            const desc = document.getElementById('var-desc')?.value || `${speciesVal} ${prepVal} ${gradeVal} ${freezingVal}`;

            SalesDataStore.addItem('varieties', {
              id: 'VAR-' + Date.now(),
              supc,
              buyerSupc,
              species: speciesVal,
              productForm: prepVal,
              freezingType: freezingVal,
              productType: freezingVal === 'Cooked' ? 'Cooked' : 'Raw',
              preparation: prepVal,
              glazeStatus: 'Yes',
              glazePct: 10,
              brand: brandVal,
              grade: gradeVal,
              packingStyle: packingVal,
              description: desc,
              buyerDescription: desc,
              active: true
            });

            Modal.close();
            Toast.show(`Variety SKU #${supc} registered successfully!`, 'success');
            this.render(document.getElementById('main-content-area'), 'variety-list', '#/sales/product-management/variety-list');
          });
        }
      });
    }

    // 2. Add Packing Style Modal with Gross Weight Auto-Calculation
    const btnAddPacking = document.getElementById('btn-add-packing');
    if (btnAddPacking) {
      btnAddPacking.addEventListener('click', () => {
        Modal.open({
          title: "New Packing Style",
          size: "md",
          content: `
            <form id="form-new-packing" class="space-y-4 text-xs">
              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Total Slabs *</label>
                  <input type="number" id="pk-slabs" value="10" min="1" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Slab Weight *</label>
                  <input type="number" id="pk-weight" value="1" step="0.1" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">UOM *</label>
                  <select id="pk-uom" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                    <option value="KGS">KGS</option>
                    <option value="LBS">LBS</option>
                    <option value="GRAMS">GRAMS</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Tare (Box) Weight *</label>
                  <input type="number" id="pk-tare" value="1.0" step="0.1" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Gross Weight (Auto) *</label>
                  <input type="text" id="pk-gross" value="11.0" readonly class="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-100 font-bold text-teal-800" />
                </div>
              </div>

              <div>
                <label class="block font-bold text-slate-700 mb-1">Packing Style Name (Auto) *</label>
                <input type="text" id="pk-name" value="10 X 1 KGS" readonly class="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-100 font-bold text-[#0F172A]" />
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Save Packing Style", type: "primary" }
          ]
        });

        const updateFormulas = () => {
          const slabs = document.getElementById('pk-slabs')?.value;
          const weight = document.getElementById('pk-weight')?.value;
          const uom = document.getElementById('pk-uom')?.value;
          const tare = document.getElementById('pk-tare')?.value;

          const gross = SalesDataStore.calculateGrossWeight(slabs, weight, tare);
          const name = SalesDataStore.generatePackingStyleName(slabs, weight, uom);

          const grossEl = document.getElementById('pk-gross');
          const nameEl = document.getElementById('pk-name');
          if (grossEl) grossEl.value = gross;
          if (nameEl) nameEl.value = name;
        };

        ['pk-slabs', 'pk-weight', 'pk-uom', 'pk-tare'].forEach(id => {
          document.getElementById(id)?.addEventListener('input', updateFormulas);
          document.getElementById(id)?.addEventListener('change', updateFormulas);
        });

        document.getElementById('modal-btn-1')?.addEventListener('click', () => {
          const slabs = parseFloat(document.getElementById('pk-slabs')?.value) || 10;
          const weight = parseFloat(document.getElementById('pk-weight')?.value) || 1;
          const uom = document.getElementById('pk-uom')?.value || 'KGS';
          const tare = parseFloat(document.getElementById('pk-tare')?.value) || 1.0;
          const gross = SalesDataStore.calculateGrossWeight(slabs, weight, tare);
          const name = SalesDataStore.generatePackingStyleName(slabs, weight, uom);

          SalesDataStore.addItem('packingStyles', {
            id: 'PK-' + Date.now(),
            totalSlabs: slabs,
            slabWeight: weight,
            uom,
            tareWeight: tare,
            grossWeight: gross,
            name
          });

          Modal.close();
          Toast.show(`Packing Style "${name}" added!`, 'success');
          this.render(document.getElementById('main-content-area'), 'packing-style-list', '#/sales/product-management/packing-style-list');
        });
      });
    }

    // 3. Add Buyer Modal with USA/China Conditional Fields
    const btnAddBuyer = document.getElementById('btn-add-buyer');
    if (btnAddBuyer) {
      btnAddBuyer.addEventListener('click', () => {
        Modal.open({
          title: "Register International Buyer",
          size: "lg",
          content: `
            <form id="form-new-buyer" class="space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Buyer Legal Name *</label>
                  <input type="text" id="byr-name" placeholder="e.g. Pacific Harvest Foods LLC" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Buyer Country *</label>
                  <select id="byr-country" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                    <option value="USA">United States of America (USA)</option>
                    <option value="China">People's Republic of China</option>
                    <option value="Japan">Japan</option>
                    <option value="EU">European Union</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>
              </div>

              <!-- Country-Conditional Section -->
              <div id="byr-conditional-wrapper" class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div id="byr-usa-fields" class="grid grid-cols-3 gap-3">
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">IRS Number (USA) *</label>
                    <input type="text" id="byr-irs" placeholder="e.g. 52-1984729" class="w-full p-2 rounded-lg border border-slate-300 font-mono" />
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">State *</label>
                    <input type="text" id="byr-state" placeholder="e.g. Maryland" class="w-full p-2 rounded-lg border border-slate-300" />
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Zipcode *</label>
                    <input type="text" id="byr-zip" placeholder="e.g. 21202" class="w-full p-2 rounded-lg border border-slate-300 font-mono" />
                  </div>
                </div>

                <div id="byr-china-fields" class="hidden">
                  <label class="block font-bold text-slate-700 mb-1">Unified Social Credit Identifier (USCI Code) *</label>
                  <input type="text" id="byr-usci" placeholder="e.g. 91310000MA1FL4P29X" class="w-full p-2 rounded-lg border border-slate-300 font-mono" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Contact Person & Email *</label>
                  <input type="text" id="byr-contact" placeholder="Contact Name" class="w-full p-2.5 rounded-lg border border-slate-300 mb-2" />
                  <input type="email" id="byr-email" placeholder="official@buyer.com" class="w-full p-2.5 rounded-lg border border-slate-300" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Corporate Address *</label>
                  <textarea id="byr-addr" rows="3" placeholder="Full legal registered corporate address" class="w-full p-2.5 rounded-lg border border-slate-300"></textarea>
                </div>
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Save Buyer Profile", type: "primary" }
          ]
        });

        // Toggle country-conditional fields
        const countrySelect = document.getElementById('byr-country');
        const usaFields = document.getElementById('byr-usa-fields');
        const chinaFields = document.getElementById('byr-china-fields');
        if (countrySelect && usaFields && chinaFields) {
          countrySelect.addEventListener('change', (e) => {
            const country = e.target.value;
            if (country === 'USA') {
              usaFields.classList.remove('hidden');
              chinaFields.classList.add('hidden');
            } else if (country === 'China') {
              usaFields.classList.add('hidden');
              chinaFields.classList.remove('hidden');
            } else {
              usaFields.classList.add('hidden');
              chinaFields.classList.add('hidden');
            }
          });
        }

        document.getElementById('modal-btn-1')?.addEventListener('click', () => {
          const name = document.getElementById('byr-name')?.value;
          const country = document.getElementById('byr-country')?.value;
          const addr = document.getElementById('byr-addr')?.value;
          const contact = document.getElementById('byr-contact')?.value;
          const email = document.getElementById('byr-email')?.value;
          const irs = document.getElementById('byr-irs')?.value;
          const usci = document.getElementById('byr-usci')?.value;
          const code = (name || 'BYR').substring(0, 3).toUpperCase() + '-' + country;

          if (!name) {
            Toast.show('Please provide the Buyer Legal Name.', 'error');
            return;
          }

          SalesDataStore.addItem('buyers', {
            id: 'BYR-' + Date.now(),
            name,
            code,
            country,
            address: addr || 'Commercial Port Address',
            email: email || 'procurement@buyer.com',
            contactPerson: contact || 'Commercial Director',
            irsNumber: irs || null,
            usciCode: usci || null,
            creditLimitDays: 30,
            status: 'Active'
          });

          Modal.close();
          Toast.show(`Buyer "${name}" registered successfully!`, 'success');
          this.render(document.getElementById('main-content-area'), 'buyer-list', '#/sales/buyer-management/buyer-list');
        });
      });
    }

    // 4. View Invoices Modal for Insurance Payments (Solving wall-of-text issue)
    document.querySelectorAll('.btn-view-covered-invoices').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const payId = e.currentTarget.getAttribute('data-id');
        const payments = SalesDataStore.getCollection('insurancePayments');
        const payment = payments.find(p => p.id === payId);
        if (!payment) return;

        Modal.open({
          title: `Covered Invoices — ${payment.insNo}`,
          size: "md",
          content: `
            <div class="space-y-4 text-xs">
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <span class="text-slate-500 font-bold">Underwriter:</span>
                  <span class="font-bold text-[#0F172A] ml-1.5">${payment.underwriter}</span>
                </div>
                <div>
                  <span class="text-slate-500 font-bold">Total Settled:</span>
                  <span class="font-bold text-teal-700 ml-1.5">₹${((payment.totalPremiumInr || 0) / 100000).toFixed(2)} Lakhs</span>
                </div>
              </div>

              <div class="space-y-2">
                <h4 class="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Consignment Invoices Bound to Policy (${(payment.invoicesList || []).length}):</h4>
                <div class="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-1">
                  ${(payment.invoicesList || []).map(inv => `
                    <div class="p-2.5 rounded-lg border border-slate-200 bg-white font-mono font-bold text-slate-800 flex items-center justify-between shadow-2xs">
                      <span>${inv}</span>
                      <span class="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">Insured</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          `,
          footerButtons: [
            { label: "Close", type: "primary" }
          ]
        });

        document.getElementById('modal-btn-0')?.addEventListener('click', () => Modal.close());
      });
    });

    // 5. Select All Checkbox in Pending Insurance
    const chkSelectAll = document.getElementById('chk-ins-select-all');
    if (chkSelectAll) {
      chkSelectAll.addEventListener('change', (e) => {
        document.querySelectorAll('.chk-ins-item').forEach(chk => {
          chk.checked = e.target.checked;
        });
      });
    }

    // 6. Generate Insurance Policy Button
    const btnGenIns = document.getElementById('btn-generate-insurance');
    if (btnGenIns) {
      btnGenIns.addEventListener('click', () => {
        const checked = Array.from(document.querySelectorAll('.chk-ins-item:checked')).map(c => c.getAttribute('data-id'));
        if (checked.length === 0) {
          Toast.show('Please select at least one ocean consignment to generate an insurance policy.', 'warning');
          return;
        }

        const polNumber = `POL-NIA-MAR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        SalesDataStore.addItem('insurancePolicies', {
          id: 'POL-' + Date.now(),
          policyNumber: polNumber,
          generatedOn: new Date().toISOString().split('T')[0],
          invoicesCount: checked.length,
          totalSumInsuredUsd: checked.length * 280000,
          premiumPaidInr: checked.length * 71250,
          status: 'Active Policy'
        });

        Toast.show(`Marine Policy ${polNumber} successfully generated for ${checked.length} consignments!`, 'success');
        this.render(document.getElementById('main-content-area'), 'insurance-templates', '#/sales/insurance/insurance-templates');
      });
    }

    // 7. New Proforma Invoice Button
    const btnNewPi = document.getElementById('btn-new-pi');
    if (btnNewPi) {
      btnNewPi.addEventListener('click', () => {
        const buyers = SalesDataStore.getCollection('buyers');
        const consignees = SalesDataStore.getCollection('consignees');
        const nextPiNumber = `DFL/PI/${Math.floor(1316 + Math.random() * 20)}/26-27`;

        Modal.open({
          title: "Create New Proforma Invoice",
          size: "xl",
          content: `
            <form id="form-new-pi" class="space-y-4 text-xs">
              <div class="p-3 rounded-xl bg-teal-50/50 border border-teal-200 flex justify-between items-center">
                <div>
                  <span class="text-xs font-bold text-teal-900">Proforma Invoice Number:</span>
                  <span class="text-xs font-mono font-black text-teal-800 ml-2">${nextPiNumber}</span>
                </div>
                <div>
                  <span class="text-xs text-slate-500 font-semibold">Exporter:</span>
                  <span class="text-xs font-bold text-slate-800 ml-1">Devi Fisheries Limited Unit-1</span>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Buyer *</label>
                  <select id="pi-buyer" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                    ${buyers.map(b => `<option value="${b.name}">${b.name}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Consignee *</label>
                  <select id="pi-consignee" class="w-full p-2.5 rounded-lg border border-slate-300">
                    ${consignees.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">PO Number *</label>
                  <input type="text" id="pi-pono" placeholder="e.g. PO-CUST-2026-99" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Port of Loading *</label>
                  <input type="text" id="pi-pol" value="Visakhapatnam (INVTZ1)" class="w-full p-2.5 rounded-lg border border-slate-300" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Port of Discharge *</label>
                  <input type="text" id="pi-pod" placeholder="e.g. Baltimore Port" class="w-full p-2.5 rounded-lg border border-slate-300" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Destination Country *</label>
                  <input type="text" id="pi-country" value="USA" class="w-full p-2.5 rounded-lg border border-slate-300" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Incoterms *</label>
                  <select id="pi-terms" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                    <option value="CIF Baltimore">CIF (Cost, Insurance & Freight)</option>
                    <option value="FOB Visakhapatnam">FOB (Free on Board)</option>
                    <option value="CFR Shanghai">CFR (Cost & Freight)</option>
                    <option value="DDP Long Beach">DDP (Delivered Duty Paid)</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Containers Count *</label>
                  <input type="number" id="pi-containers" value="1" min="1" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Total Cartons *</label>
                  <input type="number" id="pi-cartons" value="1800" min="1" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Total Amount (USD) *</label>
                  <input type="number" id="pi-amount" value="171000" min="1000" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold text-teal-800" />
                </div>
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Create Proforma Invoice", type: "primary" }
          ]
        });

        document.getElementById('modal-btn-1')?.addEventListener('click', () => {
          const buyer = document.getElementById('pi-buyer')?.value;
          const consignee = document.getElementById('pi-consignee')?.value;
          const poNumber = document.getElementById('pi-pono')?.value || `PO-${Date.now().toString().slice(-4)}`;
          const pol = document.getElementById('pi-pol')?.value || 'Visakhapatnam';
          const pod = document.getElementById('pi-pod')?.value || 'Baltimore';
          const country = document.getElementById('pi-country')?.value || 'USA';
          const terms = document.getElementById('pi-terms')?.value || 'CIF';
          const containers = parseInt(document.getElementById('pi-containers')?.value, 10) || 1;
          const cartons = parseInt(document.getElementById('pi-cartons')?.value, 10) || 1800;
          const amount = parseFloat(document.getElementById('pi-amount')?.value) || 171000;

          SalesDataStore.addItem('proformaInvoices', {
            id: 'PI-' + Date.now(),
            piNumber: nextPiNumber,
            piDate: new Date().toISOString().split('T')[0],
            poNumber,
            poDate: new Date().toISOString().split('T')[0],
            exporter: "Devi Fisheries Limited Unit-1",
            processor: "DFL Unit-1 Visakhapatnam",
            buyer,
            consignee,
            importerOfRecord: `${buyer}`,
            portOfLoading: pol,
            destinationCountry: country,
            portOfDischarge: pod,
            finalDestination: pod,
            shipByDate: "2026-11-30",
            shipByWindow: "25th Nov to 30th Nov 2026",
            paymentTerms: "LC at Sight 60 Days",
            shipmentTerms: terms,
            currency: "USD",
            containersCount: containers,
            totalCartons: cartons,
            netWeightKg: cartons * 10,
            totalAmountUsd: amount,
            freightUsd: 7000,
            insuranceUsd: 950,
            productionPlant: "DFL Unit-1 Visakhapatnam",
            status: "Po Received",
            customInvoiceGenerated: false
          });

          Modal.close();
          Toast.show(`Proforma Invoice ${nextPiNumber} created!`, 'success');
          this.render(document.getElementById('main-content-area'), 'proforma-list', '#/sales/orders/proforma-list');
        });
      });
    }

    // 8. New Product Category Modal
    const btnAddProduct = document.getElementById('btn-add-product');
    if (btnAddProduct) {
      btnAddProduct.addEventListener('click', () => {
        Modal.open({
          title: "Add Product Category",
          size: "md",
          content: `
            <form id="form-new-product" class="space-y-4 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Short Name / Code *</label>
                <input type="text" id="prod-code" placeholder="e.g. VM, TP, FW" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold uppercase" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Full Product Name *</label>
                <input type="text" id="prod-name" placeholder="e.g. Vannamei Shrimp, Black Tiger Prawns" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Description / Scientific Specs</label>
                <textarea id="prod-desc" rows="2" placeholder="e.g. Pacific White Shrimp (Litopenaeus vannamei)" class="w-full p-2.5 rounded-lg border border-slate-300"></textarea>
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Save Product", type: "primary" }
          ]
        });

        document.getElementById('modal-btn-1')?.addEventListener('click', () => {
          const code = document.getElementById('prod-code')?.value.trim().toUpperCase();
          const name = document.getElementById('prod-name')?.value.trim();
          const desc = document.getElementById('prod-desc')?.value.trim();

          if (!code || !name) {
            Toast.show('Please fill in both Code and Product Name.', 'error');
            return;
          }

          SalesDataStore.addItem('products', {
            id: 'PROD-' + Date.now(),
            code,
            name,
            description: desc || name,
            active: true
          });

          Modal.close();
          Toast.show(`Product "${name}" added successfully!`, 'success');
          this.render(document.getElementById('main-content-area'), 'product-list', '#/sales/product-management/product-list');
        });
      });
    }

    // 9. New Preparation Modal
    const btnAddPrep = document.getElementById('btn-add-prep');
    if (btnAddPrep) {
      btnAddPrep.addEventListener('click', () => {
        Modal.open({
          title: "Add Preparation Type",
          size: "md",
          content: `
            <form id="form-new-prep" class="space-y-4 text-xs">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Preparation Name *</label>
                  <input type="text" id="prep-name" placeholder="e.g. HLSO, PDTO, EZ PEEL" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold uppercase" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Short Code *</label>
                  <input type="text" id="prep-code" placeholder="e.g. HLSO, N2974" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold uppercase" />
                </div>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Description *</label>
                <input type="text" id="prep-desc" placeholder="e.g. Headless Shell-On" class="w-full p-2.5 rounded-lg border border-slate-300" />
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">HS Code *</label>
                  <input type="text" id="prep-hscode" value="0306.17" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">QC Code</label>
                  <input type="text" id="prep-qccode" placeholder="e.g. QC-255" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">GST Rate %</label>
                  <input type="number" id="prep-gst" value="5" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
                </div>
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Save Preparation", type: "primary" }
          ]
        });

        document.getElementById('modal-btn-1')?.addEventListener('click', () => {
          const name = document.getElementById('prep-name')?.value.trim().toUpperCase();
          const code = document.getElementById('prep-code')?.value.trim().toUpperCase();
          const desc = document.getElementById('prep-desc')?.value.trim();
          const hs = document.getElementById('prep-hscode')?.value.trim() || '0306.17';
          const qc = document.getElementById('prep-qccode')?.value.trim() || `QC-${Math.floor(250 + Math.random() * 50)}`;
          const gst = parseFloat(document.getElementById('prep-gst')?.value) || 5;

          if (!name || !code) {
            Toast.show('Please provide Preparation Name and Short Code.', 'error');
            return;
          }

          SalesDataStore.addItem('preparations', {
            id: 'PREP-' + Date.now(),
            name,
            description: desc || name,
            shortCode: code,
            hsCode: hs,
            qcCode: qc,
            gstRate: gst,
            fromDate: new Date().toISOString().split('T')[0]
          });

          Modal.close();
          Toast.show(`Preparation "${name}" registered!`, 'success');
          this.render(document.getElementById('main-content-area'), 'preparation-list', '#/sales/product-management/preparation-list');
        });
      });
    }

    // 10. New Species Modal
    const btnAddSpecies = document.getElementById('btn-add-species');
    if (btnAddSpecies) {
      btnAddSpecies.addEventListener('click', () => {
        Modal.open({
          title: "Add Raw Material Species",
          size: "md",
          content: `
            <form id="form-new-species" class="space-y-4 text-xs">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Species Name *</label>
                  <input type="text" id="sp-name" placeholder="e.g. Vannamei, Black Tiger" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Short Code *</label>
                  <input type="text" id="sp-code" placeholder="e.g. VM, BT" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold uppercase" />
                </div>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">QC Species Code</label>
                <input type="text" id="sp-qccode" placeholder="e.g. QC-VM-01" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Description / Biological Spec *</label>
                <textarea id="sp-desc" rows="2" placeholder="e.g. Litopenaeus vannamei, brackish water farmed" class="w-full p-2.5 rounded-lg border border-slate-300"></textarea>
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Save Species", type: "primary" }
          ]
        });

        document.getElementById('modal-btn-1')?.addEventListener('click', () => {
          const name = document.getElementById('sp-name')?.value.trim();
          const code = document.getElementById('sp-code')?.value.trim().toUpperCase();
          const qc = document.getElementById('sp-qccode')?.value.trim() || `QC-${code}-01`;
          const desc = document.getElementById('sp-desc')?.value.trim();

          if (!name || !code) {
            Toast.show('Please provide Species Name and Short Code.', 'error');
            return;
          }

          SalesDataStore.addItem('speciesMaster', {
            id: 'SP-' + Date.now(),
            name,
            shortCode: code,
            qcSpeciesCode: qc,
            description: desc || name
          });

          Modal.close();
          Toast.show(`Species "${name}" registered!`, 'success');
          this.render(document.getElementById('main-content-area'), 'species-master', '#/sales/product-management/species-master');
        });
      });
    }

    // 11. New Grade Modal
    const btnAddGrade = document.getElementById('btn-add-grade');
    if (btnAddGrade) {
      btnAddGrade.addEventListener('click', () => {
        Modal.open({
          title: "Add Product Grade",
          size: "md",
          content: `
            <form id="form-new-grade" class="space-y-4 text-xs">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Grade Type *</label>
                  <select id="grd-type" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                    <option value="Count">Count per lb / kg</option>
                    <option value="Weight">Weight / Grams</option>
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Grade Group / Range *</label>
                  <input type="text" id="grd-group" placeholder="e.g. 16/20, 21/25, U/10" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Commercial Value / Name</label>
                  <input type="text" id="grd-val" placeholder="e.g. Jumbo, Colossal, Large" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Short Code</label>
                  <input type="text" id="grd-code" placeholder="e.g. 1620, 2125" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono" />
                </div>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Description</label>
                <input type="text" id="grd-desc" placeholder="e.g. 16 to 20 pieces per lb" class="w-full p-2.5 rounded-lg border border-slate-300" />
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Save Grade", type: "primary" }
          ]
        });

        document.getElementById('modal-btn-1')?.addEventListener('click', () => {
          const type = document.getElementById('grd-type')?.value || 'Count';
          const group = document.getElementById('grd-group')?.value.trim();
          const val = document.getElementById('grd-val')?.value.trim() || group;
          const code = document.getElementById('grd-code')?.value.trim() || group.replace(/[^a-zA-Z0-9]/g, '');
          const desc = document.getElementById('grd-desc')?.value.trim() || `${group} pieces per lb`;

          if (!group) {
            Toast.show('Please provide Grade Group / Range.', 'error');
            return;
          }

          SalesDataStore.addItem('grades', {
            id: 'GRD-' + Date.now(),
            type,
            group,
            value: val,
            shortCode: code,
            description: desc
          });

          Modal.close();
          Toast.show(`Grade "${group}" added!`, 'success');
          this.render(document.getElementById('main-content-area'), 'grades-list', '#/sales/product-management/grades-list');
        });
      });
    }

    // 12. New Consignee Modal
    const btnAddConsignee = document.getElementById('btn-add-consignee');
    if (btnAddConsignee) {
      btnAddConsignee.addEventListener('click', () => {
        const buyers = SalesDataStore.getCollection('buyers');
        Modal.open({
          title: "Register Consignee",
          size: "lg",
          content: `
            <form id="form-new-consignee" class="space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Associated Buyer *</label>
                  <select id="csg-buyer" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                    ${buyers.map(b => `<option value="${b.name}">${b.name} (${b.country})</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Country *</label>
                  <select id="csg-country" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                    <option value="USA">USA</option>
                    <option value="China">China</option>
                    <option value="Japan">Japan</option>
                    <option value="EU">European Union</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Consignee Legal Name *</label>
                  <input type="text" id="csg-name" placeholder="e.g. Americold Cold Storage - Baltimore Dock" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Short Code *</label>
                  <input type="text" id="csg-code" placeholder="e.g. AMC-BAL" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold uppercase" />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Contact Person</label>
                  <input type="text" id="csg-contact" placeholder="Marcus Vance" class="w-full p-2.5 rounded-lg border border-slate-300" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Contact Phone</label>
                  <input type="text" id="csg-phone" placeholder="+1 (410) 555-7382" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">IRS / Tax ID</label>
                  <input type="text" id="csg-irs" placeholder="52-9981241" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono" />
                </div>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Delivery Dock Address *</label>
                <textarea id="csg-address" rows="2" placeholder="Dock 14, 2100 Broening Hwy, Baltimore, MD 21224" class="w-full p-2.5 rounded-lg border border-slate-300"></textarea>
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Save Consignee", type: "primary" }
          ]
        });

        document.getElementById('modal-btn-1')?.addEventListener('click', () => {
          const name = document.getElementById('csg-name')?.value.trim();
          const code = document.getElementById('csg-code')?.value.trim().toUpperCase() || 'CSG-' + Date.now().toString().slice(-4);
          const country = document.getElementById('csg-country')?.value || 'USA';
          const address = document.getElementById('csg-address')?.value.trim() || 'Cold Storage Logistics Terminal';
          const contactPerson = document.getElementById('csg-contact')?.value.trim() || 'Operations Manager';
          const phone = document.getElementById('csg-phone')?.value.trim() || '+1-000-000-0000';
          const irsNumber = document.getElementById('csg-irs')?.value.trim() || 'N/A';

          if (!name) {
            Toast.show('Please enter Consignee Legal Name.', 'error');
            return;
          }

          SalesDataStore.addItem('consignees', {
            id: 'CSG-' + Date.now(),
            name,
            code,
            country,
            address,
            email: 'dock@' + (code.toLowerCase() || 'consignee') + '.com',
            contactPerson,
            phone,
            irsNumber
          });

          Modal.close();
          Toast.show(`Consignee "${name}" registered!`, 'success');
          this.render(document.getElementById('main-content-area'), 'consignee-list', '#/sales/buyer-management/consignee-list');
        });
      });
    }

    // 13. New Notify Party Modal
    const btnAddNotify = document.getElementById('btn-add-notify');
    if (btnAddNotify) {
      btnAddNotify.addEventListener('click', () => {
        Modal.open({
          title: "Add Customs Notify Party",
          size: "md",
          content: `
            <form id="form-new-notify" class="space-y-4 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Notify Party Legal Name *</label>
                <input type="text" id="not-name" placeholder="e.g. Expeditors International Customs Brokerage" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Country *</label>
                  <select id="not-country" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                    <option value="USA">USA</option>
                    <option value="China">China</option>
                    <option value="Japan">Japan</option>
                    <option value="EU">European Union</option>
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">SCAC / Broker Code *</label>
                  <input type="text" id="not-scac" placeholder="e.g. EXPD, KHNN" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold uppercase" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Contact Person</label>
                  <input type="text" id="not-contact" placeholder="Emily Watson" class="w-full p-2.5 rounded-lg border border-slate-300" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Email</label>
                  <input type="email" id="not-email" placeholder="brokerage@expeditors.com" class="w-full p-2.5 rounded-lg border border-slate-300" />
                </div>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Address *</label>
                <textarea id="not-address" rows="2" placeholder="400 Continental Blvd, El Segundo, CA 90245" class="w-full p-2.5 rounded-lg border border-slate-300"></textarea>
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Save Notify Party", type: "primary" }
          ]
        });

        document.getElementById('modal-btn-1')?.addEventListener('click', () => {
          const name = document.getElementById('not-name')?.value.trim();
          const country = document.getElementById('not-country')?.value || 'USA';
          const scacCode = document.getElementById('not-scac')?.value.trim().toUpperCase() || 'SCAC';
          const contactPerson = document.getElementById('not-contact')?.value.trim() || 'Broker Agent';
          const email = document.getElementById('not-email')?.value.trim() || 'brokerage@customs.com';
          const address = document.getElementById('not-address')?.value.trim() || 'Customs Port Terminal';

          if (!name) {
            Toast.show('Please provide Notify Party Name.', 'error');
            return;
          }

          SalesDataStore.addItem('notifyParties', {
            id: 'NOT-' + Date.now(),
            name,
            country,
            address,
            email,
            contactPerson,
            phone: "+1 (555) 019-2831",
            scacCode
          });

          Modal.close();
          Toast.show(`Notify Party "${name}" registered!`, 'success');
          this.render(document.getElementById('main-content-area'), 'notify-party-list', '#/sales/buyer-management/notify-party-list');
        });
      });
    }

    // 14. New Applicant Modal
    const btnAddApplicant = document.getElementById('btn-add-applicant');
    if (btnAddApplicant) {
      btnAddApplicant.addEventListener('click', () => {
        const buyers = SalesDataStore.getCollection('buyers');
        Modal.open({
          title: "Add LC Applicant",
          size: "md",
          content: `
            <form id="form-new-applicant" class="space-y-4 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Associated Buyer *</label>
                <select id="app-buyer" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                  ${buyers.map(b => `<option value="${b.name}">${b.name} (${b.country})</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Applicant Legal Entity Name *</label>
                <input type="text" id="app-name" placeholder="e.g. Apex Global Holdings LLC" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Country *</label>
                <input type="text" id="app-country" value="USA" class="w-full p-2.5 rounded-lg border border-slate-300" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Registered Address *</label>
                <textarea id="app-address" rows="2" placeholder="1028 Harborview Blvd, Baltimore, MD" class="w-full p-2.5 rounded-lg border border-slate-300"></textarea>
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Save Applicant", type: "primary" }
          ]
        });

        document.getElementById('modal-btn-1')?.addEventListener('click', () => {
          const buyerName = document.getElementById('app-buyer')?.value;
          const applicantName = document.getElementById('app-name')?.value.trim();
          const country = document.getElementById('app-country')?.value.trim() || 'USA';
          const address = document.getElementById('app-address')?.value.trim() || 'Corporate Office';

          if (!applicantName) {
            Toast.show('Please provide Applicant Name.', 'error');
            return;
          }

          SalesDataStore.addItem('applicants', {
            id: 'APP-' + Date.now(),
            buyerName,
            applicantName,
            country,
            address
          });

          Modal.close();
          Toast.show(`Applicant "${applicantName}" added!`, 'success');
          this.render(document.getElementById('main-content-area'), 'applicant-list', '#/sales/buyer-management/applicant-list');
        });
      });
    }

    // 15. New Brand Modal
    const btnAddBrand = document.getElementById('btn-add-brand');
    if (btnAddBrand) {
      btnAddBrand.addEventListener('click', () => {
        const buyers = SalesDataStore.getCollection('buyers');
        Modal.open({
          title: "Register Packaging Brand",
          size: "md",
          content: `
            <form id="form-new-brand" class="space-y-4 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Brand Name *</label>
                <input type="text" id="brd-name" placeholder="e.g. Devi Gold, Bay Gourmet, Black Pearl" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Brand Owner / Customer *</label>
                <select id="brd-buyer" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                  <option value="Devi Fisheries Corporate">Devi Fisheries Corporate (Own Brand)</option>
                  ${buyers.map(b => `<option value="${b.name}">${b.name} (Private Label)</option>`).join('')}
                </select>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Brand Type *</label>
                  <select id="brd-type" class="w-full p-2.5 rounded-lg border border-slate-300">
                    <option value="Both">Both (Sales & Store)</option>
                    <option value="Sale">Sale (Export Only)</option>
                    <option value="Store">Store (Internal Stock)</option>
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Print Status *</label>
                  <select id="brd-status" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                    <option value="Approved for Print">Approved for Print</option>
                    <option value="Pending Approval">Pending Approval</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Remarks / Artwork Specifications</label>
                <input type="text" id="brd-remarks" placeholder="USFDA compliant master carton packaging" class="w-full p-2.5 rounded-lg border border-slate-300" />
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Save Brand", type: "primary" }
          ]
        });

        document.getElementById('modal-btn-1')?.addEventListener('click', () => {
          const brandName = document.getElementById('brd-name')?.value.trim();
          const buyer = document.getElementById('brd-buyer')?.value;
          const brandType = document.getElementById('brd-type')?.value || 'Both';
          const printStatus = document.getElementById('brd-status')?.value || 'Approved for Print';
          const remarks = document.getElementById('brd-remarks')?.value.trim() || 'Seafood export master carton';

          if (!brandName) {
            Toast.show('Please provide Brand Name.', 'error');
            return;
          }

          SalesDataStore.addItem('brands', {
            id: 'BRD-' + Date.now(),
            buyer,
            brandName,
            brandType,
            printStatus,
            remarks
          });

          Modal.close();
          Toast.show(`Brand "${brandName}" registered!`, 'success');
          this.render(document.getElementById('main-content-area'), 'brands-list', '#/sales/buyer-management/brands-list');
        });
      });
    }

    // 16. New ISF Filing Modal
    const btnAddIsf = document.getElementById('btn-add-isf');
    if (btnAddIsf) {
      btnAddIsf.addEventListener('click', () => {
        const buyers = SalesDataStore.getCollection('buyers');
        const pis = SalesDataStore.getCollection('proformaInvoices');
        Modal.open({
          title: "New ISF 10+2 Customs Filing",
          size: "lg",
          content: `
            <form id="form-new-isf" class="space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Customs Invoice No *</label>
                  <input type="text" id="isf-inv" value="DFL/EXP/2026-27/${Math.floor(86 + Math.random() * 20)}" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Proforma Ref *</label>
                  <select id="isf-pi" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                    ${pis.map(p => `<option value="${p.piNumber}">${p.piNumber}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Buyer *</label>
                  <select id="isf-buyer" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                    ${buyers.map(b => `<option value="${b.name}">${b.name}</option>`).join('')}
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Shipping Line *</label>
                  <select id="isf-liner" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                    <option value="Mediterranean Shipping Company (MSC)">MSC</option>
                    <option value="Maersk Line">Maersk Line</option>
                    <option value="Ocean Network Express (ONE)">ONE</option>
                    <option value="Hapag-Lloyd">Hapag-Lloyd</option>
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Container Number *</label>
                  <input type="text" id="isf-cnt" placeholder="e.g. MSCU7397679" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold uppercase" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Liner Seal Number *</label>
                  <input type="text" id="isf-seal" placeholder="e.g. MSC-SL-901844" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono uppercase" />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Ocean B/L Number *</label>
                  <input type="text" id="isf-bl" placeholder="e.g. MEDUAPX2609918" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold uppercase" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Stuffing Location *</label>
                  <select id="isf-stuff" class="w-full p-2.5 rounded-lg border border-slate-300">
                    <option value="DFL Unit-1 VSP(853)">DFL Unit-1 VSP(853)</option>
                    <option value="DFL Unit-2 KKD(412)">DFL Unit-2 KKD(412)</option>
                    <option value="DFL Tuticorin Plant">DFL Tuticorin Plant</option>
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">ISF Transaction Ref</label>
                  <input type="text" id="isf-txn" value="ISF-2026-USCBP-${Math.floor(10000 + Math.random() * 90000)}" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono" />
                </div>
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Save ISF Filing", type: "primary" }
          ]
        });

        document.getElementById('modal-btn-1')?.addEventListener('click', () => {
          const inv = document.getElementById('isf-inv')?.value.trim();
          const pi = document.getElementById('isf-pi')?.value;
          const buyer = document.getElementById('isf-buyer')?.value;
          const liner = document.getElementById('isf-liner')?.value;
          const cnt = document.getElementById('isf-cnt')?.value.trim().toUpperCase() || 'MSCU' + Math.floor(1000000 + Math.random() * 9000000);
          const seal = document.getElementById('isf-seal')?.value.trim().toUpperCase() || 'SL-' + Math.floor(100000 + Math.random() * 900000);
          const bl = document.getElementById('isf-bl')?.value.trim().toUpperCase() || 'MEDU' + Math.floor(10000000 + Math.random() * 90000000);
          const stuff = document.getElementById('isf-stuff')?.value;
          const txn = document.getElementById('isf-txn')?.value.trim();

          SalesDataStore.addItem('isfDetails', {
            id: 'ISF-' + Date.now(),
            customInvoiceNo: inv,
            piNumber: pi,
            poNumber: 'PO-' + buyer.slice(0, 3).toUpperCase() + '-2026',
            buyer,
            shippingLine: liner,
            containerNumber: cnt,
            linerSealNumber: seal,
            blNumber: bl,
            blDate: new Date().toISOString().split('T')[0],
            shippingOnboardDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
            stuffingLocation: stuff,
            sizeType: "40 FT HC REEFER",
            tempRecord: "-20 DEGREES CELSIUS",
            isfTransactionNo: txn,
            status: "Completed"
          });

          Modal.close();
          Toast.show(`ISF Filing for Container ${cnt} recorded!`, 'success');
          this.render(document.getElementById('main-content-area'), 'isf-details', '#/sales/orders/isf-details');
        });
      });
    }

    // 17. New Shipping Bill Modal
    const btnAddSb = document.getElementById('btn-add-sb');
    if (btnAddSb) {
      btnAddSb.addEventListener('click', () => {
        const consignees = SalesDataStore.getCollection('consignees');
        Modal.open({
          title: "Record Customs Shipping Bill",
          size: "lg",
          content: `
            <form id="form-new-sb" class="space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Shipping Bill No *</label>
                  <input type="text" id="sb-no" value="SB-${Math.floor(9840000 + Math.random() * 10000)}" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Invoice Number *</label>
                  <input type="text" id="sb-inv" value="DFL/EXP/2026-27/085" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">LEO Date *</label>
                  <input type="date" id="sb-leo" value="${new Date().toISOString().split('T')[0]}" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono" />
                </div>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Consignee *</label>
                <select id="sb-consignee" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                  ${consignees.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                </select>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Invoice USD *</label>
                  <input type="number" id="sb-invusd" value="342000" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Ocean Freight USD *</label>
                  <input type="number" id="sb-freight" value="14000" class="w-full p-2.5 rounded-lg border border-slate-300" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Deductions USD</label>
                  <input type="number" id="sb-ded" value="1200" class="w-full p-2.5 rounded-lg border border-slate-300" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Customs Rate (INR) *</label>
                  <input type="number" id="sb-rate" value="83.85" step="0.01" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
                </div>
              </div>
              <div class="p-3 bg-teal-50 rounded-xl border border-teal-200 flex justify-between items-center">
                <div>
                  <span class="text-slate-600 font-bold">Auto Net FOB USD:</span>
                  <span id="sb-autousd" class="font-mono font-black text-teal-800 ml-1.5">$326,800.00</span>
                </div>
                <div>
                  <span class="text-slate-600 font-bold">Auto Net FOB INR:</span>
                  <span id="sb-autoinr" class="font-mono font-black text-teal-800 ml-1.5">₹27,402,180.00</span>
                </div>
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Save Shipping Bill", type: "primary" }
          ]
        });

        const updateSbCalc = () => {
          const inv = parseFloat(document.getElementById('sb-invusd')?.value) || 0;
          const frt = parseFloat(document.getElementById('sb-freight')?.value) || 0;
          const ded = parseFloat(document.getElementById('sb-ded')?.value) || 0;
          const rate = parseFloat(document.getElementById('sb-rate')?.value) || 83.85;
          const fobUsd = inv - frt - ded;
          const fobInr = fobUsd * rate;
          const elUsd = document.getElementById('sb-autousd');
          const elInr = document.getElementById('sb-autoinr');
          if (elUsd) elUsd.textContent = `$${fobUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
          if (elInr) elInr.textContent = `₹${fobInr.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
        };

        ['sb-invusd', 'sb-freight', 'sb-ded', 'sb-rate'].forEach(id => {
          document.getElementById(id)?.addEventListener('input', updateSbCalc);
        });

        document.getElementById('modal-btn-1')?.addEventListener('click', () => {
          const sbNo = document.getElementById('sb-no')?.value.trim();
          const inv = document.getElementById('sb-inv')?.value.trim();
          const leo = document.getElementById('sb-leo')?.value;
          const csg = document.getElementById('sb-consignee')?.value;
          const invUsd = parseFloat(document.getElementById('sb-invusd')?.value) || 342000;
          const frt = parseFloat(document.getElementById('sb-freight')?.value) || 14000;
          const ded = parseFloat(document.getElementById('sb-ded')?.value) || 1200;
          const rate = parseFloat(document.getElementById('sb-rate')?.value) || 83.85;
          const fobInr = (invUsd - frt - ded) * rate;

          SalesDataStore.addItem('shippingBills', {
            id: 'SB-' + Date.now(),
            invoiceNo: inv,
            shippingBillNo: sbNo,
            shippingDate: leo,
            leoDate: leo,
            poNumber: "PO-DFL-2026",
            consignee: csg,
            invoiceValueUsd: invUsd,
            freightUsd: frt,
            otherDeductionsUsd: ded,
            exchangeRate: rate,
            fobInr,
            sbFobUsd: invUsd - frt - ded,
            sbFobInr: fobInr,
            status: "Completed"
          });

          Modal.close();
          Toast.show(`Shipping Bill ${sbNo} saved!`, 'success');
          this.render(document.getElementById('main-content-area'), 'shipping-bill', '#/sales/orders/shipping-bill');
        });
      });
    }

    // 18. New Commercial Invoice Modal
    const btnAddCommInv = document.getElementById('btn-add-comminv');
    if (btnAddCommInv) {
      btnAddCommInv.addEventListener('click', () => {
        const buyers = SalesDataStore.getCollection('buyers');
        const consignees = SalesDataStore.getCollection('consignees');
        const pis = SalesDataStore.getCollection('proformaInvoices');
        const autoInvNo = `DFL/EXP/2026-27/${Math.floor(86 + Math.random() * 20)}`;

        Modal.open({
          title: "Generate Commercial Invoice",
          size: "lg",
          content: `
            <form id="form-new-comminv" class="space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Invoice Number *</label>
                  <input type="text" id="ci-no" value="${autoInvNo}" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Invoice Date *</label>
                  <input type="date" id="ci-date" value="${new Date().toISOString().split('T')[0]}" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">PI Reference *</label>
                  <select id="ci-pi" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                    ${pis.map(p => `<option value="${p.piNumber}">${p.piNumber}</option>`).join('')}
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Buyer *</label>
                  <select id="ci-buyer" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                    ${buyers.map(b => `<option value="${b.name}">${b.name}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Consignee *</label>
                  <select id="ci-consignee" class="w-full p-2.5 rounded-lg border border-slate-300">
                    ${consignees.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Container Number *</label>
                  <input type="text" id="ci-container" placeholder="MSCU7397679" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono uppercase" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Ocean B/L Number *</label>
                  <input type="text" id="ci-bl" placeholder="MEDUAPX2609918" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono uppercase" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Temp Logger ID</label>
                  <input type="text" id="ci-logger" value="LOG-SENSITECH-${Math.floor(1000 + Math.random() * 9000)}" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono" />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Shipment Terms *</label>
                  <select id="ci-terms" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                    <option value="CIF Baltimore">CIF Baltimore</option>
                    <option value="FOB Visakhapatnam">FOB Visakhapatnam</option>
                    <option value="CIF Long Beach">CIF Long Beach</option>
                    <option value="CFR Shanghai">CFR Shanghai</option>
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Invoice Value (USD) *</label>
                  <input type="number" id="ci-val" value="342000" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold text-teal-800" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Exchange Rate (INR) *</label>
                  <input type="number" id="ci-rate" value="83.85" step="0.01" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
                </div>
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Generate Commercial Invoice", type: "primary" }
          ]
        });

        document.getElementById('modal-btn-1')?.addEventListener('click', () => {
          const invNo = document.getElementById('ci-no')?.value.trim();
          const invDate = document.getElementById('ci-date')?.value;
          const pi = document.getElementById('ci-pi')?.value;
          const buyer = document.getElementById('ci-buyer')?.value;
          const csg = document.getElementById('ci-consignee')?.value;
          const cnt = document.getElementById('ci-container')?.value.trim().toUpperCase() || 'MSCU7397679';
          const bl = document.getElementById('ci-bl')?.value.trim().toUpperCase() || 'MEDUAPX2609918';
          const logger = document.getElementById('ci-logger')?.value.trim();
          const terms = document.getElementById('ci-terms')?.value;
          const val = parseFloat(document.getElementById('ci-val')?.value) || 342000;
          const rate = parseFloat(document.getElementById('ci-rate')?.value) || 83.85;

          SalesDataStore.addItem('commercialInvoices', {
            id: 'COMM-' + Date.now(),
            invoiceNo: invNo,
            invoiceDate: invDate,
            piNumber: pi,
            poNumber: "PO-" + buyer.slice(0, 3).toUpperCase() + "-881",
            buyer,
            consignee: csg,
            paymentTerms: "LC at Sight 60 Days",
            shipmentTerms: terms,
            currency: "USD",
            invoiceValue: val,
            exchangeRate: rate,
            blNumber: bl,
            blDate: invDate,
            containerNumber: cnt,
            tempLoggerId: logger,
            status: "Generated"
          });

          Modal.close();
          Toast.show(`Commercial Invoice ${invNo} generated!`, 'success');
          this.render(document.getElementById('main-content-area'), 'commercial-invoice', '#/sales/orders/commercial-invoice');
        });
      });
    }

    // 19. New FDA Prior Notice Modal
    const btnAddFda = document.getElementById('btn-add-fda');
    if (btnAddFda) {
      btnAddFda.addEventListener('click', () => {
        const buyers = SalesDataStore.getCollection('buyers');
        Modal.open({
          title: "File USFDA Prior Notice",
          size: "md",
          content: `
            <form id="form-new-fda" class="space-y-4 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Invoice Number *</label>
                <input type="text" id="fda-inv" value="DFL/EXP/2026-27/085" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Buyer *</label>
                  <select id="fda-buyer" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                    ${buyers.map(b => `<option value="${b.name}">${b.name}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Container Number *</label>
                  <input type="text" id="fda-cnt" placeholder="MSCU7397679" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono uppercase" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Total Cartons *</label>
                  <input type="number" id="fda-cartons" value="3600" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Net Weight (KG) *</label>
                  <input type="number" id="fda-wt" value="36000" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
                </div>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">FDA Entry Confirmation Number *</label>
                <input type="text" id="fda-no" value="FDA-2026-${Math.floor(10000 + Math.random() * 90000)}-BAL" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold text-teal-800" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">USFDA Review Status *</label>
                <select id="fda-exam" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                  <option value="Under Document Review">Under Document Review</option>
                  <option value="Prior Notice Acknowledged">Prior Notice Acknowledged</option>
                  <option value="Released for Delivery">Released for Delivery</option>
                </select>
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Submit Prior Notice", type: "primary" }
          ]
        });

        document.getElementById('modal-btn-1')?.addEventListener('click', () => {
          const inv = document.getElementById('fda-inv')?.value.trim();
          const buyer = document.getElementById('fda-buyer')?.value;
          const cnt = document.getElementById('fda-cnt')?.value.trim().toUpperCase() || 'MSCU7397679';
          const cartons = parseInt(document.getElementById('fda-cartons')?.value, 10) || 3600;
          const wt = parseFloat(document.getElementById('fda-wt')?.value) || 36000;
          const fdaNo = document.getElementById('fda-no')?.value.trim();
          const exam = document.getElementById('fda-exam')?.value;

          SalesDataStore.addItem('fdaStatus', {
            id: 'FDA-' + Date.now(),
            invoiceNo: inv,
            poNumber: "PO-" + buyer.slice(0, 3).toUpperCase() + "-2026",
            buyer,
            shippingBillNo: "SB-9844210",
            containerNumber: cnt,
            blNumber: "MEDUAPX2609918",
            cartons,
            netWeightKg: wt,
            fdaEntryNumber: fdaNo,
            fdaEntryDate: new Date().toISOString().split('T')[0],
            fdaExam: exam,
            noticeDate1: new Date().toISOString().split('T')[0],
            status: "Pending",
            remarks: "Prior Notice filed and acknowledged by USFDA Port Director"
          });

          Modal.close();
          Toast.show(`FDA Prior Notice ${fdaNo} filed!`, 'success');
          this.render(document.getElementById('main-content-area'), 'fda-status', '#/sales/orders/fda-status');
        });
      });
    }

    // 20. New Clearing Agent Modal
    const btnAddAgent = document.getElementById('btn-add-agent');
    if (btnAddAgent) {
      btnAddAgent.addEventListener('click', () => {
        const buyers = SalesDataStore.getCollection('buyers');
        const notifys = SalesDataStore.getCollection('notifyParties');
        Modal.open({
          title: "Assign Customs Clearing Agent (CHA)",
          size: "md",
          content: `
            <form id="form-new-agent" class="space-y-4 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Export Consignment Invoice *</label>
                <input type="text" id="cha-inv" value="DFL/EXP/2026-27/085" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Buyer *</label>
                <select id="cha-buyer" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                  ${buyers.map(b => `<option value="${b.name}">${b.name}</option>`).join('')}
                </select>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Port of Discharge *</label>
                  <input type="text" id="cha-port" value="Baltimore Port" class="w-full p-2.5 rounded-lg border border-slate-300" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Notify Party Broker *</label>
                  <select id="cha-notify" class="w-full p-2.5 rounded-lg border border-slate-300">
                    ${notifys.map(n => `<option value="${n.name}">${n.name}</option>`).join('')}
                  </select>
                </div>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Assigned Clearing Agent (Name & License) *</label>
                <input type="text" id="cha-agent" placeholder="e.g. Expeditors USA (Agent: John Gallagher)" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Agent Contact Phone / Email *</label>
                <input type="text" id="cha-phone" placeholder="+1 (410) 555-1200" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono" />
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Assign Agent", type: "primary" }
          ]
        });

        document.getElementById('modal-btn-1')?.addEventListener('click', () => {
          const inv = document.getElementById('cha-inv')?.value.trim();
          const buyer = document.getElementById('cha-buyer')?.value;
          const port = document.getElementById('cha-port')?.value.trim() || 'Baltimore Port';
          const notify = document.getElementById('cha-notify')?.value;
          const agent = document.getElementById('cha-agent')?.value.trim() || 'Customs Broker Agent';
          const phone = document.getElementById('cha-phone')?.value.trim() || '+1-555-0192';

          SalesDataStore.addItem('clearingAgents', {
            id: 'CLR-' + Date.now(),
            invoiceNo: inv,
            buyer,
            blNumber: "MEDUAPX2609918",
            portOfDischarge: port,
            notifyPartyName: notify,
            agentName: agent,
            contactPhone: phone,
            status: "Assigned"
          });

          Modal.close();
          Toast.show(`Clearing Agent assigned for ${inv}!`, 'success');
          this.render(document.getElementById('main-content-area'), 'clearing-agent', '#/sales/orders/clearing-agent');
        });
      });
    }

    // 21. New Forward Contract Modal
    const btnAddFc = document.getElementById('btn-add-fc');
    if (btnAddFc) {
      btnAddFc.addEventListener('click', () => {
        const nextFcNo = `FC-2026-${Math.floor(1092 + Math.random() * 20)}`;
        Modal.open({
          title: "Book Export Forward Exchange Contract",
          size: "lg",
          content: `
            <form id="form-new-fc" class="space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Contract Number *</label>
                  <input type="text" id="fc-no" value="${nextFcNo}" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold text-teal-800" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Authorized Dealer Bank *</label>
                  <select id="fc-bank" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                    <option value="State Bank of India - IFB Visakhapatnam">State Bank of India - IFB Visakhapatnam</option>
                    <option value="HDFC Bank Treasury Branch">HDFC Bank Treasury Branch</option>
                    <option value="ICICI Bank Global Trade Services">ICICI Bank Global Trade Services</option>
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Contract Amount (USD) *</label>
                  <input type="number" id="fc-amount" value="500000" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Spot Rate (INR) *</label>
                  <input type="number" id="fc-spot" value="83.80" step="0.01" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Premium Rate *</label>
                  <input type="number" id="fc-prem" value="0.55" step="0.01" class="w-full p-2.5 rounded-lg border border-slate-300" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Branch Margin *</label>
                  <input type="number" id="fc-margin" value="0.15" step="0.01" class="w-full p-2.5 rounded-lg border border-slate-300" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Net Forward Rate *</label>
                  <input type="text" id="fc-total" value="84.20" readonly class="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-100 font-mono font-black text-teal-800" />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Start Date *</label>
                  <input type="date" id="fc-start" value="2026-11-01" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Maturity Date *</label>
                  <input type="date" id="fc-end" value="2027-01-31" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Delivery Month *</label>
                  <input type="text" id="fc-month" value="January 2027" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold" />
                </div>
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Book Forward Contract", type: "primary" }
          ]
        });

        const updateFcRate = () => {
          const spot = parseFloat(document.getElementById('fc-spot')?.value) || 0;
          const prem = parseFloat(document.getElementById('fc-prem')?.value) || 0;
          const margin = parseFloat(document.getElementById('fc-margin')?.value) || 0;
          const tot = SalesDataStore.calculateForwardContractRate(spot, prem, margin);
          const el = document.getElementById('fc-total');
          if (el) el.value = tot.toFixed(2);
        };

        ['fc-spot', 'fc-prem', 'fc-margin'].forEach(id => {
          document.getElementById(id)?.addEventListener('input', updateFcRate);
        });

        document.getElementById('modal-btn-1')?.addEventListener('click', () => {
          const fcNo = document.getElementById('fc-no')?.value.trim();
          const amount = parseFloat(document.getElementById('fc-amount')?.value) || 500000;
          const spot = parseFloat(document.getElementById('fc-spot')?.value) || 83.80;
          const prem = parseFloat(document.getElementById('fc-prem')?.value) || 0.55;
          const margin = parseFloat(document.getElementById('fc-margin')?.value) || 0.15;
          const tot = SalesDataStore.calculateForwardContractRate(spot, prem, margin);
          const start = document.getElementById('fc-start')?.value || '2026-11-01';
          const end = document.getElementById('fc-end')?.value || '2027-01-31';
          const month = document.getElementById('fc-month')?.value.trim() || 'January 2027';

          SalesDataStore.addItem('forwardContracts', {
            id: 'FC-' + Date.now(),
            contractNumber: fcNo,
            bookedDate: new Date().toISOString().split('T')[0],
            company: "Devi Fisheries Limited Unit-1",
            bookedValueUsd: amount,
            utilizedValueUsd: 0,
            balanceValueUsd: amount,
            spotRate: spot,
            premiumRate: prem,
            branchMargin: margin,
            totalRate: tot,
            startDate: start,
            endDate: end,
            month,
            status: "Active"
          });

          Modal.close();
          Toast.show(`Forward Contract ${fcNo} booked successfully!`, 'success');
          this.render(document.getElementById('main-content-area'), 'forward-contracts', '#/sales/payments-financials/forward-contracts');
        });
      });
    }

    // 22. New Collection Modal
    const btnAddCollection = document.getElementById('btn-add-collection');
    if (btnAddCollection) {
      btnAddCollection.addEventListener('click', () => {
        const buyers = SalesDataStore.getCollection('buyers');
        const fcs = SalesDataStore.getCollection('forwardContracts');
        Modal.open({
          title: "Record Export Collection Entry",
          size: "lg",
          content: `
            <form id="form-new-collection" class="space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Invoice Number *</label>
                  <input type="text" id="col-inv" value="DFL/EXP/2026-27/085" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Buyer *</label>
                  <select id="col-buyer" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                    ${buyers.map(b => `<option value="${b.name}">${b.name}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Bank Reference / Lodgement *</label>
                  <input type="text" id="col-bankref" placeholder="e.g. HDFC/TT/EX/99214" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold" />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Invoice Value (USD) *</label>
                  <input type="number" id="col-invusd" value="185200" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Utilized Value (USD) *</label>
                  <input type="number" id="col-utilusd" value="185200" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Exchange Rate (INR) *</label>
                  <input type="number" id="col-rate" value="84.20" step="0.01" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold" />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Bank Charges (USD)</label>
                  <input type="number" id="col-chg" value="350" class="w-full p-2.5 rounded-lg border border-slate-300" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Other Deductions (USD)</label>
                  <input type="number" id="col-ded" value="0" class="w-full p-2.5 rounded-lg border border-slate-300" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Linked Forward Contract</label>
                  <select id="col-fc" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono">
                    ${fcs.map(f => `<option value="${f.contractNumber}">${f.contractNumber} (${f.month})</option>`).join('')}
                  </select>
                </div>
              </div>
              <div class="p-3 bg-teal-50 rounded-xl border border-teal-200 flex justify-between items-center">
                <span class="text-slate-600 font-bold">Estimated Realized Value INR:</span>
                <span id="col-autoinr" class="font-mono font-black text-teal-800 text-sm">₹15,564,370.00</span>
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Save Collection Record", type: "primary" }
          ]
        });

        const updateColCalc = () => {
          const invUsd = parseFloat(document.getElementById('col-invusd')?.value) || 0;
          const chg = parseFloat(document.getElementById('col-chg')?.value) || 0;
          const ded = parseFloat(document.getElementById('col-ded')?.value) || 0;
          const rate = parseFloat(document.getElementById('col-rate')?.value) || 84.20;
          const netInr = SalesDataStore.calculateCollectionValueInr(invUsd, chg, ded, 0, rate);
          const el = document.getElementById('col-autoinr');
          if (el) el.textContent = `₹${netInr.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
        };

        ['col-invusd', 'col-chg', 'col-ded', 'col-rate'].forEach(id => {
          document.getElementById(id)?.addEventListener('input', updateColCalc);
        });

        document.getElementById('modal-btn-1')?.addEventListener('click', () => {
          const inv = document.getElementById('col-inv')?.value.trim();
          const buyer = document.getElementById('col-buyer')?.value;
          const bankRef = document.getElementById('col-bankref')?.value.trim() || 'HDFC/TT/EX/' + Math.floor(10000 + Math.random() * 90000);
          const invUsd = parseFloat(document.getElementById('col-invusd')?.value) || 185200;
          const utilUsd = parseFloat(document.getElementById('col-utilusd')?.value) || 185200;
          const rate = parseFloat(document.getElementById('col-rate')?.value) || 84.20;
          const chg = parseFloat(document.getElementById('col-chg')?.value) || 350;
          const ded = parseFloat(document.getElementById('col-ded')?.value) || 0;
          const fc = document.getElementById('col-fc')?.value;
          const netInr = SalesDataStore.calculateCollectionValueInr(invUsd, chg, ded, 0, rate);

          SalesDataStore.addItem('collections', {
            id: 'COL-' + Date.now(),
            invoiceNo: inv,
            poNumber: "PO-" + buyer.slice(0, 3).toUpperCase() + "-2026",
            buyer,
            consigneeName: "Cold Storage Logistics Depot",
            invoiceValueUsd: invUsd,
            utilizedValueUsd: utilUsd,
            balanceUsd: invUsd - utilUsd,
            collectionRate: rate,
            bankChargesUsd: chg,
            deductionsUsd: ded,
            extraAmountUsd: 0,
            valueInr: netInr,
            bankRefNo: bankRef,
            collectionDate: new Date().toISOString().split('T')[0],
            paymentMode: "TT Remittance",
            forwardContractNo: fc,
            status: "Fully Collected"
          });

          Modal.close();
          Toast.show(`Collection record for ${inv} recorded!`, 'success');
          this.render(document.getElementById('main-content-area'), 'collections', '#/sales/payments-financials/collections');
        });
      });
    }

    // 23. New Negotiation Modal
    const btnAddNeg = document.getElementById('btn-add-neg');
    if (btnAddNeg) {
      btnAddNeg.addEventListener('click', () => {
        Modal.open({
          title: "Submit Export LC Negotiation",
          size: "md",
          content: `
            <form id="form-new-neg" class="space-y-4 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Invoice Number *</label>
                <input type="text" id="neg-inv" value="DFL/EXP/2026-27/085" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Financing Bank *</label>
                <select id="neg-bank" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                  <option value="State Bank of India - IFB Visakhapatnam">State Bank of India - IFB Visakhapatnam</option>
                  <option value="HDFC Bank Overseas Branch">HDFC Bank Overseas Branch</option>
                  <option value="ICICI International Banking Branch">ICICI International Banking Branch</option>
                </select>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Bank Reference / Bill No *</label>
                  <input type="text" id="neg-ref" value="SBI-IFB-LC-${Math.floor(1000 + Math.random() * 9000)}" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Submission Date *</label>
                  <input type="date" id="neg-date" value="${new Date().toISOString().split('T')[0]}" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono" />
                </div>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Document Set Description</label>
                <textarea id="neg-docs" rows="2" class="w-full p-2.5 rounded-lg border border-slate-300">LC Document Set (Full Clean Onboard BL, CO, Lab Certificate, Health Certificate, Packing List)</textarea>
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Submit Negotiation", type: "primary" }
          ]
        });

        document.getElementById('modal-btn-1')?.addEventListener('click', () => {
          const inv = document.getElementById('neg-inv')?.value.trim();
          const ref = document.getElementById('neg-ref')?.value.trim();
          const date = document.getElementById('neg-date')?.value;
          const docs = document.getElementById('neg-docs')?.value.trim();

          SalesDataStore.addItem('negotiations', {
            id: 'NEG-' + Date.now(),
            invoiceNo: inv,
            poNumber: "PO-DFL-2026",
            consigneeName: "Americold Cold Storage - Baltimore",
            bankRefNo: ref,
            submissionDate: date,
            docType: docs,
            status: "Negotiated"
          });

          Modal.close();
          Toast.show(`Negotiation bill ${ref} recorded!`, 'success');
          this.render(document.getElementById('main-content-area'), 'negotiations', '#/sales/payments-financials/negotiations');
        });
      });
    }

    // 24. New Insurance Payment Modal
    const btnAddInsPay = document.getElementById('btn-add-inspay');
    if (btnAddInsPay) {
      btnAddInsPay.addEventListener('click', () => {
        const nextPayNo = `INS-PAY-2026-0${Math.floor(2 + Math.random() * 8)}`;
        Modal.open({
          title: "Record Marine Insurance Premium Payment",
          size: "md",
          content: `
            <form id="form-new-inspay" class="space-y-4 text-xs">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Voucher Number *</label>
                  <input type="text" id="insp-no" value="${nextPayNo}" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold text-teal-800" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Payment Date *</label>
                  <input type="date" id="insp-date" value="${new Date().toISOString().split('T')[0]}" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono" />
                </div>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Insurance Underwriter *</label>
                <select id="insp-underwriter" class="w-full p-2.5 rounded-lg border border-slate-300 font-semibold">
                  <option value="The New India Assurance Co. Ltd">The New India Assurance Co. Ltd</option>
                  <option value="National Insurance Company">National Insurance Company</option>
                  <option value="United India Insurance Co.">United India Insurance Co.</option>
                </select>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Covered Invoices (Comma-separated) *</label>
                <input type="text" id="insp-invs" value="DFL/EXP/2026-27/083, DFL/EXP/2026-27/084, DFL/EXP/2026-27/085" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-semibold" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Total Premium Paid (INR) *</label>
                  <input type="number" id="insp-prem" value="213750" class="w-full p-2.5 rounded-lg border border-slate-300 font-bold text-teal-800" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Cheque / UTR Ref *</label>
                  <input type="text" id="insp-ref" value="CHQ-HDFC-${Math.floor(100000 + Math.random() * 900000)}" class="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold" />
                </div>
              </div>
            </form>
          `,
          footerButtons: [
            { label: "Cancel", type: "secondary" },
            { label: "Record Payment", type: "primary" }
          ]
        });

        document.getElementById('modal-btn-1')?.addEventListener('click', () => {
          const payNo = document.getElementById('insp-no')?.value.trim();
          const date = document.getElementById('insp-date')?.value;
          const underwriter = document.getElementById('insp-underwriter')?.value;
          const invsRaw = document.getElementById('insp-invs')?.value.trim();
          const invs = invsRaw ? invsRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
          const prem = parseFloat(document.getElementById('insp-prem')?.value) || 213750;
          const ref = document.getElementById('insp-ref')?.value.trim();

          SalesDataStore.addItem('insurancePayments', {
            id: 'INSP-' + Date.now(),
            insNo: payNo,
            paymentDate: date,
            invoicesList: invs,
            invoicesCount: invs.length,
            totalPremiumInr: prem,
            underwriter,
            chequeRef: ref
          });

          Modal.close();
          Toast.show(`Insurance payment voucher ${payNo} recorded!`, 'success');
          this.render(document.getElementById('main-content-area'), 'insurance-payments', '#/sales/insurance/insurance-payments');
        });
      });
    }

    // 25. Table Action Quick Handlers (Edit, View, Print, Download)
    document.querySelectorAll('[class*="btn-edit-"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id') || 'Item';
        Toast.show(`Opening record editor for ${id}...`, 'info');
      });
    });

    document.querySelectorAll('[class*="btn-view-"], [class*="btn-print-"], [class*="btn-download-"]').forEach(btn => {
      if (!btn.classList.contains('btn-view-covered-invoices')) {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id') || 'Record';
          Toast.show(`Opening document preview for ${id}...`, 'info');
        });
      }
    });
  }
};

