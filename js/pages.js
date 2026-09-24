/**
 * PAGE RENDERERS
 * Uses Atomic Components (window.UI) to render page layouts.
 */

window.Pages = {};

window.Pages.renderPurchaseDashboard = () => {
  const container = document.getElementById('page-purchase');
  if (!container) return;

  const kpis = [
    { title: 'Total Lots', value: '826', icon: 'layers', iconVariant: 'primary' },
    { title: 'AB+ Lots', value: '0', icon: 'store', iconVariant: 'success' },
    { title: 'Return Lots', value: '0', icon: 'archive', iconVariant: 'warning' },
    { title: 'Border Counts', value: '828', icon: 'layers', iconVariant: 'info' },
    { title: 'Grading Pendings', value: '599', icon: 'scale', iconVariant: 'primary' },
    { title: 'Bill Pendings', value: '41', icon: 'receipt', iconVariant: 'warning' }
  ];

  const charts = [
    { id: 'dailyPurchaseAnalyticsChart', title: 'Daily Purchase Analytics', subtitle: 'Daily procured raw material lot quantities (T)', height: '280px' },
    { id: 'headlessDetailsChart', title: 'Headless Details - 1741.48 T', subtitle: 'Yield distribution and decapitated shrimp metrics', height: '280px' },
    { id: 'suppliersSuppliedLotsChart', title: 'Suppliers Supplied Lots', subtitle: 'Procurement allocation across top shrimp suppliers', height: '300px' },
    { id: 'purchaseQuantityChart', title: 'Purchase Quantity - 2554.39 T', subtitle: 'Weightment distribution comparison', height: '300px' }
  ];

  // We keep the filter bar hardcoded or static for now, or render it here.
  // We'll replace just the body (KPIs + Charts) to show the power of components.

  const html = `
    <!-- Filter Bar (Manually rendered for now, but could be a Molecule) -->
    <div class="filter-panel-card" style="margin-top: 12px; margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid #FEF08A; padding-bottom: 8px;">
        <span style="font-weight: 700; font-size: 13px; color: #422006; text-transform: uppercase; letter-spacing: 0.04em; display: inline-flex; align-items: center; gap: 8px;">
          ${window.UI.Icon('sliders-horizontal', '', 'width:15px;height:15px;color:#CA8A04;')} Purchase Filter Parameters
        </span>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-end;">
        ${window.UI.FilterSelect('Purchase Station:', ['All Purchase Station', 'Center 1 - Kakinada', 'Center 2 - Visakhapatnam', 'Center 3 - Sompeta', 'Center 4 - Amalapuram', 'Center 5 - Bhimavaram'], 'purchaseStationFilter')}
        ${window.UI.FilterSelect('Year:', ['2026', '2025', '2024'], 'purchaseYearFilter')}
        ${window.UI.FilterSelect('Month:', ['September', 'August', 'July', 'June', 'May', 'April', 'March', 'February', 'January', 'December', 'November', 'October'], 'purchaseMonthFilter')}
        
        <button class="btn btn-primary" style="background: #FACC15; color: #422006; font-weight: 700; border: 1px solid #EAB308; padding: 10px 24px; border-radius: 8px; height: 38px; display: inline-flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s ease;" onclick="initPurchaseDashboardCharts();showToast('info','Purchase','Filters applied')">
          Search ${window.UI.Icon('arrow-right', '', 'width:16px;height:16px;')}
        </button>
      </div>
    </div>

    <!-- Main Purchase Layout Grid using UI Components -->
    <div class="kpi-grid" style="grid-template-columns: repeat(6, 1fr); gap: 12px; margin-bottom: 20px;">
      ${kpis.map(kpi => window.UI.KPICard(kpi)).join('')}
    </div>

    <div class="charts-grid charts-row-2" style="margin-top: 20px;">
      ${window.UI.ChartCard(charts[0])}
      ${window.UI.ChartCard(charts[1])}
    </div>

    <div class="charts-grid charts-row-2" style="margin-top: 20px;">
      ${window.UI.ChartCard(charts[2])}
      ${window.UI.ChartCard(charts[3])}
    </div>
  `;

  container.innerHTML = html;
  
  // Re-initialize lucide icons since new HTML was injected
  if (window.lucide) {
    window.lucide.createIcons();
  }
};
