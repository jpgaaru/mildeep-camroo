// Sales Module — Master Domain Controller & Orchestrator
// Sales & Export Operations View (Standardized with Purchase Base Design System)
import { SalesDataStore } from '../../data/salesData.js';
import { Toast } from '../../components/toast.js';
import { Modal } from '../../components/modal.js';

// =========================================================================
// AQUAPULSE / DEVI FISHERIES BASE DESIGN SYSTEM (STANDARDIZED FROM PURCHASE)
// =========================================================================
var UIBase = window.UIBase = window.UIBase || {
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
        <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#F1F5F9]">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#0F172A] uppercase tracking-wider">${title}</h3>
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

import { salesDashboard } from './dashboard/salesDashboard.js';
import { salesOrders } from './orders/salesOrders.js';
import { salesShipments } from './shipments/salesShipments.js';
import { salesFinancials } from './financials/salesFinancials.js';
import { salesReports } from './reports/salesReports.js';
import { salesModals } from './modals/salesModals.js';

export const SalesView = {
  activeTab: 'overview',
  activeHash: '#/sales/dashboard/overview',

  render(containerId, tabName = 'overview', activeHash = '#/sales/dashboard/overview') {
    const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!container) return;

    this.activeTab = tabName || 'overview';
    this.activeHash = activeHash;

    // Subpage container (TabBar is managed globally by AppShell)
    container.innerHTML = `
      <div id="sales-subpage-content" class="w-full"></div>
    `;

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


};

// Compose all feature domain submodules into unified SalesView
Object.assign(
  SalesView,
  salesDashboard,
  salesOrders,
  salesShipments,
  salesFinancials,
  salesReports,
  salesModals
);

if (typeof window !== 'undefined') {
  window.SalesView = SalesView;
}
