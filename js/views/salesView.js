// Sales & Export Operations View (Standardized with Purchase Base Design System)
import { SalesDataStore } from '../data/salesData.js';
import { Toast } from '../components/toast.js';
import { Modal } from '../components/modal.js';

// =========================================================================
// AQUAPULSE / DEVI FISHERIES BASE DESIGN SYSTEM (STANDARDIZED FROM PURCHASE)
// =========================================================================
const UIBase = {
  renderHeader(title, actionBtnHtml = '') {
    return `
      <div class="flex flex-wrap items-center justify-between gap-3 mb-2 animate-fade-in">
        <div>
          <h1 class="text-xl font-extrabold text-[#172B4D]">${title}</h1>
        </div>
        ${actionBtnHtml ? `<div class="flex items-center gap-2">${actionBtnHtml}</div>` : ''}
      </div>
    `;
  },

  renderFilterCard(opts) {
    const { idPrefix, title = 'Search & Filters', fields = [], searchBtnText = 'Search' } = opts;
    return `
      <div class="dt-top-filter-card bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs mb-3 transition-all duration-200" style="margin-bottom: 12px !important;">
        <div class="flex items-center justify-between pb-1">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#172B4D]">${title}</h3>
          </div>

          <div class="inline-flex items-center" style="gap: 8px; display: inline-flex;">
            <button type="button" id="${idPrefix}-reset-btn" class="dt-action-btn dt-top-filter-reset-btn w-7 h-7 min-w-[28px] min-h-[28px] inline-flex items-center justify-center bg-white hover:bg-[#F0F9FF] border border-[#CBD5E1] hover:border-[#0284C7] text-[#334155] hover:text-[#0284C7] rounded-none transition-colors cursor-pointer select-none" style="width: 28px; height: 28px; min-width: 28px; min-height: 28px; border-radius: 0; border: 1px solid #CBD5E1; background: #ffffff; color: #334155; display: inline-flex; align-items: center; justify-content: center; padding: 0;" title="Reset all filters" aria-label="Reset all filters">
              <svg class="w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </button>

            <button type="button" id="${idPrefix}-toggle-btn" class="dt-action-btn dt-top-filter-toggle-btn w-7 h-7 min-w-[28px] min-h-[28px] inline-flex items-center justify-center bg-white hover:bg-[#F0F9FF] border border-[#CBD5E1] hover:border-[#0284C7] text-[#334155] hover:text-[#0284C7] rounded-none transition-colors cursor-pointer select-none" style="width: 28px; height: 28px; min-width: 28px; min-height: 28px; border-radius: 0; border: 1px solid #CBD5E1; background: #ffffff; color: #334155; display: inline-flex; align-items: center; justify-content: center; padding: 0;" title="Hide Filter" aria-label="Hide Filter">
              <svg class="w-4 h-4 text-current dt-top-filter-toggle-icon transform transition-transform duration-200" id="${idPrefix}-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
          </div>
        </div>

        <div id="${idPrefix}-filter-body" class="dt-top-filter-body mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs transition-all duration-200">
          ${fields.map(f => `
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">${f.label}</label>
              ${f.html}
            </div>
          `).join('')}

          <div class="flex items-end">
            <button type="button" id="${idPrefix}-search-btn" class="dt-top-filter-search-btn btn-primary px-5 py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer h-[31px]">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <span>${searchBtnText}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  bindFilter(idPrefix, onSearch, onReset) {
    const toggleBtn = document.getElementById(`${idPrefix}-toggle-btn`);
    const filterBody = document.getElementById(`${idPrefix}-filter-body`);
    const toggleIcon = document.getElementById(`${idPrefix}-toggle-icon`);
    const resetBtn = document.getElementById(`${idPrefix}-reset-btn`);
    const searchBtn = document.getElementById(`${idPrefix}-search-btn`);

    if (toggleBtn && filterBody) {
      let isCollapsed = false;
      toggleBtn.onclick = () => {
        isCollapsed = !isCollapsed;
        if (isCollapsed) {
          filterBody.classList.add('hidden');
          if (toggleIcon) toggleIcon.classList.add('-rotate-90');
          toggleBtn.title = 'Show Filter';
        } else {
          filterBody.classList.remove('hidden');
          if (toggleIcon) toggleIcon.classList.remove('-rotate-90');
          toggleBtn.title = 'Hide Filter';
        }
      };
    }

    if (resetBtn && onReset) {
      resetBtn.onclick = onReset;
    }

    if (searchBtn && onSearch) {
      searchBtn.onclick = onSearch;
    }
  },

  renderTotals(title, count, countUnit, metrics) {
    return `
      <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs mt-4 animate-fade-in">
        <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#EBECF0]">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-[#006644]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            <h3 class="text-xs font-bold text-[#172B4D]">${title}</h3>
          </div>
          <span class="text-xs text-[#5E6C84]">Showing totals for <strong class="text-[#172B4D]">${count}</strong> ${countUnit}</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
          ${metrics.map(m => `
            <div class="p-3 bg-[#FAFBFC] rounded-lg border border-[#EBECF0]">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">${m.label}</span>
              <div class="flex items-baseline justify-between">
                <span class="text-lg font-extrabold ${m.color || 'text-[#172B4D]'}">${m.value}</span>
                ${m.badge ? `<span class="text-[10px] ${m.badgeColor || 'text-[#0284C7] bg-[#F0F9FF]'} font-semibold px-1.5 py-0.5 rounded">${m.badge}</span>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderBadge(text, type = 'default') {
    const map = {
      default: 'bg-[#F4F5F7] text-[#172B4D] border-[#DFE1E6]',
      success: 'bg-[#E3FCEF] text-[#006644] border-[#ABF5D1]',
      warning: 'bg-[#FFF0B3] text-[#8F4D00] border-[#FFE380]',
      danger: 'bg-[#FFEBE6] text-[#BF2600] border-[#FFBDAD]',
      info: 'bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]'
    };
    const cls = map[type] || map.default;
    return `<span class="font-medium px-2 py-0.5 rounded text-[11px] border ${cls}">${text}</span>`;
  },

  renderActionButtons(opts = {}) {
    const { onView, onEdit, onDownload, onDelete } = opts;
    return `
      <div class="flex items-center gap-1">
        ${onView ? `<button onclick="${onView}" class="p-1 rounded text-[#0284C7] hover:bg-[#F0F9FF]" title="View Details"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg></button>` : ''}
        ${onEdit ? `<button onclick="${onEdit}" class="p-1 rounded text-[#006644] hover:bg-[#E3FCEF]" title="Edit"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>` : ''}
        ${onDownload ? `<button onclick="${onDownload}" class="p-1 rounded text-[#0284C7] hover:bg-[#F0F9FF]" title="Download Document"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg></button>` : ''}
        ${onDelete ? `<button onclick="${onDelete}" class="p-1 rounded text-[#FF5150] hover:bg-[#FEF2F2]" title="Delete"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>` : ''}
      </div>
    `;
  }
};

// =========================================================================
// SALES & EXPORTS MODULE (STANDARDIZED WITH PURCHASE BASE DESIGN SYSTEM)
// =========================================================================
export const SalesView = {
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
      { id: 'clearing-agent', label: 'Clearing Agent', hash: '#/sales/orders/clearing-agent' }
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
          <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#F1F5F9]">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              <h3 class="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Search & Filters</h3>
            </div>
            <div class="inline-flex items-center gap-2">
              <button type="button" class="w-7 h-7 inline-flex items-center justify-center bg-white hover:bg-[#F0F9FF] border border-[#CBD5E1] hover:border-[#006C7A] text-[#475569] hover:text-[#006C7A] rounded transition-colors cursor-pointer" onclick="SalesView.loadAllProformaList()" title="Reset all filters">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              </button>
            </div>
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

        // ==========================================
  // INTERNAL SCREEN: NEW PROFORMA INVOICE (IMAGE 2)
  // ==========================================
  openNewPi() {
    window.location.hash = '#/sales/orders/new-pi';
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
            <div class="space-y-4">
              <!-- ROW 1 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SELECT EXPORTER <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-exporter" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Exporter</option>
                    <option value="DEVI FISHERIES LIMITED">DEVI FISHERIES LIMITED</option>
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
                    <option value="853">853 - VSP Processing Unit</option>
                    <option value="1888">1888 - JPT Processing Unit</option>
                    <option value="24234236">24234236 - SATYA Processing Unit</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    NO OF CONTAINERS
                  </label>
                  <div class="flex items-center border border-[#E2E8F0] rounded-lg bg-white overflow-hidden h-9">
                    <button type="button" class="w-9 h-full flex items-center justify-center text-sm font-bold text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] cursor-pointer transition-colors" onclick="SalesView.adjustContainerCount(-1)">−</button>
                    <input type="number" id="new-pi-containers" value="1" min="1" max="99" class="w-full text-center text-xs font-bold bg-transparent border-0 outline-none focus:outline-none text-[#0F172A]">
                    <button type="button" class="w-9 h-full flex items-center justify-center text-sm font-bold text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] cursor-pointer transition-colors" onclick="SalesView.adjustContainerCount(1)">+</button>
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
                  <input type="text" id="new-pi-number" value="DFL/PI/1316/26-27" required placeholder="Enter Proforma Invoice No" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all font-semibold">
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
                    <option value="EASTERN FISH COMPANY LLC">EASTERN FISH COMPANY LLC</option>
                    <option value="PACIFIC SEAFOOD GROUP,">PACIFIC SEAFOOD GROUP,</option>
                    <option value="ARISTA INDUSTRIES INC">ARISTA INDUSTRIES INC</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    ULTIMATE CONSIGNEE
                  </label>
                  <select id="new-pi-ultimate-consignee" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" selected>Select Ultimate Consignee</option>
                    <option value="SAME AS CONSIGNEE">SAME AS CONSIGNEE</option>
                    <option value="EASTERN COLD STORAGE LOGISTICS">EASTERN COLD STORAGE LOGISTICS</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    BUYER NAME
                  </label>
                  <select id="new-pi-buyer" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" selected>Select Buyer</option>
                    <option value="EASTERN FISH COMPANY LLC">EASTERN FISH COMPANY LLC</option>
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
                    <option value="EASTERN FISH COMPANY LLC">EASTERN FISH COMPANY LLC</option>
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
                    <option value="HDFC Bank - Current A/c 502000123456" selected>HDFC Bank - Current A/c 502000123456</option>
                    <option value="State Bank of India - A/c 3892019283">State Bank of India - A/c 3892019283</option>
                    <option value="ICICI Bank Ltd - A/c 0012938472">ICICI Bank Ltd - A/c 0012938472</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SHOW BANK <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-show-bank" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="No" selected>No</option>
                    <option value="Yes">Yes</option>
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
                    <option value="" disabled selected>Select Payment Terms</option>
                    <option value="100% DP AT SIGHT" selected>100% DP AT SIGHT</option>
                    <option value="CAD (CASH AGAINST DOCUMENTS)">CAD (CASH AGAINST DOCUMENTS)</option>
                    <option value="LC 90 DAYS">LC 90 DAYS</option>
                    <option value="30 DAYS NET">30 DAYS NET</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SHIPMENT TERMS <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-shipment-terms" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Shipment Terms</option>
                    <option value="CIF (COST INSURANCE FREIGHT)" selected>CIF (COST INSURANCE FREIGHT)</option>
                    <option value="FOB (FREE ON BOARD)">FOB (FREE ON BOARD)</option>
                    <option value="C&F (COST & FREIGHT)">C&F (COST & FREIGHT)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    DELIVERY TERMS <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-delivery-terms" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Delivery Terms</option>
                    <option value="PORT TO PORT" selected>PORT TO PORT</option>
                    <option value="DOOR TO DOOR">DOOR TO DOOR</option>
                    <option value="CY TO CY">CY TO CY</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    QUANTITY UNITS <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-qty-units" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Quantity Units</option>
                    <option value="LBS (POUNDS)" selected>LBS (POUNDS)</option>
                    <option value="KGS (KILOGRAMS)">KGS (KILOGRAMS)</option>
                    <option value="MTONS (METRIC TONS)">MTONS (METRIC TONS)</option>
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
    const piNumber = document.getElementById('new-pi-number')?.value || `DFL/PI/${Math.floor(1316 + Math.random() * 50)}/26-27`;
    const piDate = document.getElementById('new-pi-date')?.value || '21/10/2026';
    const poNo = document.getElementById('new-pi-po-no')?.value || 'PO-2026-NEW';
    const buyer = document.getElementById('new-pi-consignee')?.value || 'EASTERN FISH COMPANY LLC';
    const processor = document.getElementById('new-pi-processor')?.value || '853';
    const productionPlant = document.getElementById('new-pi-plant')?.value || 'VSP';
    const shipByDate = document.getElementById('new-pi-shipby')?.value || '--';
    const containers = parseInt(document.getElementById('new-pi-containers')?.value, 10) || 1;

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
      exporter: 'DEVI FISHERIES LIMITED',
      country: 'USA',
      cartons: containers * 1800,
      totalAmountUsd: containers * 190000
    };

    // Re-index existing
    this.proformaDataset.unshift(newRecord);
    this.proformaDataset.forEach((r, idx) => {
      r.sNo = idx + 1;
    });

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Proforma Invoice ${piNumber} (ID #${newId}) created successfully!`, 'success');
    }

    // Navigate back to Proforma List
    window.location.hash = '#/sales/orders/proforma-list';
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
