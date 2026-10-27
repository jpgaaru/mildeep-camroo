// Quality Control — Master Domain Controller & Orchestrator
import { qcOverview } from './overview/qcOverview.js';
import { qcLab } from './lab/qcLab.js';
import { qcOperations } from './operations/qcOperations.js';
import { qcScreening } from './screening/qcScreening.js';
import { qcAudits } from './audits/qcAudits.js';

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
      <div id="qc-subpage-content" class="w-full"></div>
    `;

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
    } else if (subPage === 'food-audit-list' || subPage === 'food-audits' || subPage === 'qc-audits') {
      this.renderFoodAuditList(subContainer, activeHash);
    } else if (subPage === 'social-audit-list' || subPage === 'social-audits') {
      this.renderSocialAuditList(subContainer, activeHash);
    } else if (subPage === 'farm-audit-list' || subPage === 'farm-audits') {
      this.renderFarmAuditList(subContainer, activeHash);
    } else if (subPage === 'hatchery-audit-list' || subPage === 'hatchery-audits') {
      this.renderHatcheryAuditList(subContainer, activeHash);
    } else if (subPage === 'feed-mill-audit-list' || subPage === 'feed-mill-audits') {
      this.renderFeedMillAuditList(subContainer, activeHash);
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

    setTimeout(() => {
      if (typeof window !== 'undefined' && window.CamarooControls && typeof window.CamarooControls.upgrade === 'function') {
        window.CamarooControls.upgrade(subContainer);
      }
    }, 30);
  },

};

// Compose all feature domain submodules into unified QCView
Object.assign(
  QCView,
  qcOverview,
  qcLab,
  qcOperations,
  qcScreening,
  qcAudits
);

if (typeof window !== 'undefined') {
  window.QCView = QCView;
}
