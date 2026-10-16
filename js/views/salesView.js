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
        contentHtml = this.renderDashboard();
        break;

      // 2. Product Master
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

      // 4. Sales Overview
      case 'sales-overview':
      case 'sales-overview-tab':
      case 'sales':
        contentHtml = this.renderSalesOverview();
        break;

      // 5. Orders Execution
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

      // 6. Export Finance & Payments
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

      // 7. Cargo Insurance
      case 'pending-insurance':
        contentHtml = this.renderPendingInsurance();
        break;
      case 'insurance-templates':
        contentHtml = this.renderInsuranceTemplates();
        break;
      case 'insurance-payments':
        contentHtml = this.renderInsurancePayments();
        break;

      // 8. Reports
      case 'reports':
      case 'reports-overview':
        contentHtml = this.renderReportsOverview();
        break;
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

      // 9. Product Consumption
      case 'consumption':
      case 'consumption-ledger':
        contentHtml = this.renderConsumptionLedger();
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
  // 1. DASHBOARD OVERVIEW
  // ==========================================
  renderDashboard() {
    const data = SalesDataStore.getAll();
    const kpis = data.dashboardKpis || {};

    return `
      <div class="space-y-6">
        <!-- 6 KPI Metric Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <!-- KPI 1: Pending Contracts -->
          <div class="bg-white rounded-2xl p-4 border border-sky-100 shadow-2xs hover:shadow-xs transition-all">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Orders</span>
              <span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-sky-50 text-sky-700">${kpis.pendingContracts?.trend || '+12%'}</span>
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
              <span class="text-emerald-600 font-bold text-xs">YTD</span>
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
              <span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-indigo-50 text-indigo-700">MTD</span>
            </div>
            <div class="text-xl font-black text-indigo-700">$${(kpis.paymentsRealizedMonth?.amount || 842000).toLocaleString()}</div>
            <div class="text-xs text-slate-500 mt-1">₹${((kpis.paymentsRealizedMonth?.inrEquivalent || 70601700) / 100000).toFixed(1)} Lakhs</div>
          </div>
        </div>

        <!-- Visual Analytics Grid: 4 Interactive Visual Breakdown Cards -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <!-- Chart 1: Export Revenue vs Shipments -->
          <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-sm font-bold text-[#0F172A]">Monthly Export Revenue & Dispatch Volume</h3>
                <p class="text-xs text-slate-400">Total value in USD vs completed 40FT reefer containers</p>
              </div>
              <span class="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-600">FY 2026-27</span>
            </div>
            
            <div class="space-y-3 pt-2">
              ${[
                { month: 'Jul 2026', usd: '$1,420,000', containers: 16, pct: 75 },
                { month: 'Aug 2026', usd: '$1,680,000', containers: 19, pct: 88 },
                { month: 'Sep 2026', usd: '$1,890,000', containers: 22, pct: 95 },
                { month: 'Oct 2026 (MTD)', usd: '$1,350,000', containers: 15, pct: 70 }
              ].map(m => `
                <div>
                  <div class="flex justify-between text-xs font-semibold mb-1">
                    <span class="text-slate-600">${m.month}</span>
                    <span class="text-[#0F172A]">${m.usd} <span class="text-slate-400 font-normal">(${m.containers} Cont.)</span></span>
                  </div>
                  <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full rounded-full bg-gradient-to-r from-teal-500 to-[#00A8B5]" style="width: ${m.pct}%;"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Chart 2: Destination Country Share -->
          <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-sm font-bold text-[#0F172A]">Export Destination Market Share</h3>
                <p class="text-xs text-slate-400">Consignment volume breakdown by destination country</p>
              </div>
              <span class="px-2.5 py-1 rounded-md text-xs font-semibold bg-teal-50 text-teal-700">Global Sales</span>
            </div>

            <div class="space-y-3 pt-2">
              ${[
                { country: 'United States of America (USFDA)', share: '75.72%', tons: '327 MT', color: 'bg-sky-500', width: '75.7%' },
                { country: 'People\'s Republic of China (GACC)', share: '14.92%', tons: '64 MT', color: 'bg-rose-500', width: '14.9%' },
                { country: 'Japan (MHLW Approved)', share: '5.80%', tons: '25 MT', color: 'bg-amber-500', width: '5.8%' },
                { country: 'European Union & UK', share: '3.56%', tons: '16 MT', color: 'bg-emerald-500', width: '3.6%' }
              ].map(c => `
                <div>
                  <div class="flex justify-between text-xs font-semibold mb-1">
                    <span class="flex items-center gap-2 text-slate-700">
                      <span class="w-2 h-2 rounded-full ${c.color}"></span>
                      ${c.country}
                    </span>
                    <span class="text-[#0F172A] font-bold">${c.share} <span class="text-slate-400 font-normal">(${c.tons})</span></span>
                  </div>
                  <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full rounded-full ${c.color}" style="width: ${c.width};"></div>
                  </div>
                </div>
              `).join('')}
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
            this.render(document.getElementById('main-content-area'), 'variety-list', '#/sales/product/variety-list');
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
          this.render(document.getElementById('main-content-area'), 'packing-style-list', '#/sales/product/packing-style-list');
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
          this.render(document.getElementById('main-content-area'), 'buyer-list', '#/sales/buyers/buyer-list');
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
  }
};
