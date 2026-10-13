// Global Reports Module Views (Configured with On-Screen Tabs & Standard Empty States)

import { Router } from '../framework/Router.js';
import { renderEmptyState } from '../components/emptyState.js';

export const ReportsView = {
  render(containerId, subPage = 'yield-reports', activeHash = '#/reports/production-analytics/yield-reports') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `<div id="reports-subpage-content"></div>`;
    const subContainer = document.getElementById('reports-subpage-content');

    const routeInfo = Router.resolve(activeHash);
    const tabLabel = routeInfo?.subObj?.tabs?.find(t => t.id === subPage)?.label || subPage.replace(/-/g, ' ');

    subContainer.innerHTML = renderEmptyState({
      title: `No Analytical Reports for ${tabLabel}`,
      description: `The Global Reports registry (${routeInfo?.subObj?.title || 'Global Reports'}) currently has no active analytical extracts. Full interactive CRUD operations are active under the Purchase module.`,
      moduleName: "Global Reports",
      tabName: tabLabel
    });
  }
};
