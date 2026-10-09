// Sales & Exports Module Views (Configured with On-Screen Tabs & Standard Empty States)

import { TabBar } from '../components/tabBar.js';
import { renderEmptyState } from '../components/emptyState.js';

export const SalesView = {
  render(containerId, subPage = 'overview', activeHash = '#/sales/dashboard/overview') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div id="sales-tab-bar-container"></div>
      <div id="sales-subpage-content"></div>
    `;

    const tabContext = TabBar.render('sales-tab-bar-container', activeHash);
    const subContainer = document.getElementById('sales-subpage-content');

    const tabLabel = tabContext?.submenu?.tabs?.find(t => t.id === subPage)?.label || subPage.replace(/-/g, ' ');

    subContainer.innerHTML = renderEmptyState({
      title: `No Sales & Export Records for ${tabLabel}`,
      description: `The Sales & Exports commercial directory (${tabContext?.submenu?.title || 'Sales & Exports'}) currently has no active contracts or shipping logs. Full interactive CRUD operations are active under the Purchase module.`,
      moduleName: "Sales & Exports",
      tabName: tabLabel
    });
  }
};
