// Purchase Module — Master Domain Controller & Orchestrator
import { Skeleton } from '../../components/skeleton.js';
import {
  M, bookings, rmArrivals, arrivals, payments,
  isCreatingBooking, activeBillForEdit,
  reloadPurchaseStore
} from './state/purchaseState.js';

import { purchaseDashboard } from './dashboard/purchaseDashboard.js';
import { purchaseOperations } from './operations/purchaseOperations.js';
import { purchaseTransactions } from './transactions/purchaseTransactions.js';
import { purchasePayments } from './payments/purchasePayments.js';
import { purchaseModals } from './modals/purchaseModals.js';

export const PurchaseView = {
  // Expose store references
  M,
  bookings,
  rmArrivals,
  arrivals,
  payments,

  render(containerId, subPage = 'overview', activeHash = '#/purchase/dashboard/overview') {
    reloadPurchaseStore();
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div id="purchase-tab-bar-container"></div>
      <div id="purchase-subpage-content"></div>
    `;
    if (typeof TabBar !== 'undefined' && typeof TabBar.render === 'function') {
      TabBar.render('purchase-tab-bar-container', activeHash);
    }
    const subContainer = document.getElementById('purchase-subpage-content');

    // Normalize route aliases
    const target = (subPage || '').toLowerCase();
    
    // Smooth transition
    if (typeof Skeleton !== 'undefined' && Skeleton.renderDashboard) {
      if (target === 'overview' || target === 'purchase-dashboard' || target === 'rm-dashboard' || target === 'commercial-dashboard') {
        subContainer.innerHTML = Skeleton.renderDashboard();
      } else {
        subContainer.innerHTML = Skeleton.renderTable(6, 6);
      }
    }

    setTimeout(() => {
      switch (target) {
        // Submenu: Dashboard
        case 'overview':
        case 'purchase-dashboard':
          this.renderPurchaseDashboard(subContainer);
          break;
        case 'rm-dashboard':
        case 'commercial-dashboard':
          this.renderRMDashboard(subContainer);
          break;

        // Submenu: Operations
        case 'bookings':
          isCreatingBooking = false;
          this.renderBookings(subContainer);
          break;
        case 'create-booking':
          // Contextual route handling - show form inside bookings
          isCreatingBooking = true;
          this.renderBookings(subContainer);
          break;
        case 'rm-arrivals':
        case 'rm-arrival':
          this.renderRMArrivals(subContainer);
          break;
        case 'arrivals':
          this.renderArrivals(subContainer);
          break;
        case 'lot-tracking':
        case 'lot-track':
          this.renderLotTracking(subContainer);
          break;

        // Submenu: Transactions & Bills
        case 'bills':
        case 'supplier-bills':
          activeBillForEdit = null;
          this.renderBills(subContainer);
          break;
        case 'rm-bill':
        case 'commercial-txns':
          // Contextual route handling - show respective bill inside bills
          if (!activeBillForEdit) activeBillForEdit = arrivals[0];
          this.renderBills(subContainer);
          break;

        // Submenu: Payments
        case 'payments':
        case 'bill-date-payment':
          this.renderPayments(subContainer);
          break;
        case 'payment-summary':
          this.renderPaymentSummary(subContainer);
          break;

        default:
          this.renderPurchaseDashboard(subContainer);
          break;
      }
    }, 100);
  },


};

// Compose all feature domain submodules into unified PurchaseView
Object.assign(
  PurchaseView,
  purchaseDashboard,
  purchaseOperations,
  purchaseTransactions,
  purchasePayments,
  purchaseModals
);

if (typeof window !== 'undefined') {
  window.PurchaseView = PurchaseView;
}
