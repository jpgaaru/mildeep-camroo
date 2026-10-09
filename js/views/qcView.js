// Quality Control (QC) Module Views (Configured with On-Screen Tabs & Standard Empty States)

import { TabBar } from '../components/tabBar.js';
import { renderEmptyState } from '../components/emptyState.js';

export const QCView = {
  render(containerId, subPage = 'qc-overview', activeHash = '#/quality/dashboard/qc-overview') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div id="qc-tab-bar-container"></div>
      <div id="qc-subpage-content"></div>
    `;

    const tabContext = TabBar.render('qc-tab-bar-container', activeHash);
    const subContainer = document.getElementById('qc-subpage-content');

    const tabLabel = tabContext?.submenu?.tabs?.find(t => t.id === subPage)?.label || subPage.replace(/-/g, ' ');

    subContainer.innerHTML = renderEmptyState({
      title: `No Quality Control Records for ${tabLabel}`,
      description: `The Quality Control lab and audits register (${tabContext?.submenu?.title || 'QC'}) currently has no active records. Full interactive CRUD operations are active under the Purchase module.`,
      moduleName: "Quality Control (QC)",
      tabName: tabLabel
    });
  }
};
