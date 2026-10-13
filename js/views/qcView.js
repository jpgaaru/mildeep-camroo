// Quality Control (QC) Module Views (Configured with On-Screen Tabs & Standard Empty States)

import { TabBar } from '../components/tabBar.js';
import { renderEmptyState } from '../components/emptyState.js';

export const QCView = {
  render(containerId, subPage = 'qc-overview', activeHash = '#/quality/dashboard/qc-overview') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const tabContext = TabBar.getContext(activeHash);
    const tabLabel = tabContext?.submenu?.tabs?.find(t => t.id === subPage)?.label || subPage.replace(/-/g, ' ');

    container.innerHTML = `
      <div id="qc-subpage-content">
        ${renderEmptyState({
          title: `No Quality Control Records for ${tabLabel}`,
          description: `The Quality Control lab and audits register (${tabContext?.submenu?.title || 'QC'}) currently has no active records. Full interactive CRUD operations are active under the Purchase module.`,
          moduleName: "Quality Control (QC)",
          tabName: tabLabel
        })}
      </div>
    `;
  }
};
