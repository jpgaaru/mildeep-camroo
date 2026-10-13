// Global Reports Module Views (Configured with On-Screen Tabs & Standard Empty States)

import { TabBar } from '../components/tabBar.js';
import { renderEmptyState } from '../components/emptyState.js';

export const ReportsView = {
  render(containerId, subPage = 'yield-reports', activeHash = '#/reports/production-analytics/yield-reports') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const tabContext = TabBar.getContext(activeHash);
    const tabLabel = tabContext?.submenu?.tabs?.find(t => t.id === subPage)?.label || subPage.replace(/-/g, ' ');

    container.innerHTML = `
      <div id="reports-subpage-content">
        ${renderEmptyState({
          title: `No Analytical Reports for ${tabLabel}`,
          description: `The Global Reports registry (${tabContext?.submenu?.title || 'Global Reports'}) currently has no active analytical extracts. Full interactive CRUD operations are active under the Purchase module.`,
          moduleName: "Global Reports",
          tabName: tabLabel
        })}
      </div>
    `;
  }
};
