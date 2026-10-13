// Sales & Exports Module Views (Configured with On-Screen Tabs & Standard Empty States)

import { Router } from '../framework/Router.js';
import { renderEmptyState } from '../components/emptyState.js';

export const SalesView = {
  render(containerId, subPage = 'overview', activeHash = '#/sales/dashboard/overview') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `<div id="sales-subpage-content"></div>`;
    const subContainer = document.getElementById('sales-subpage-content');

    const routeInfo = Router.resolve(activeHash);
    const tabLabel = routeInfo?.subObj?.tabs?.find(t => t.id === subPage)?.label || subPage.replace(/-/g, ' ');

    subContainer.innerHTML = renderEmptyState({
      title: `No Sales & Export Records for ${tabLabel}`,
      description: `The Sales & Exports commercial directory (${routeInfo?.subObj?.title || 'Sales & Exports'}) currently has no active contracts or shipping logs. Full interactive CRUD operations are active under the Purchase module.`,
      moduleName: "Sales & Exports",
      tabName: tabLabel
    });
  }
};
