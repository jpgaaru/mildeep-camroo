// Sales & Exports Module Views (Configured with On-Screen Tabs & Standard Empty States)

import { TabBar } from '../components/tabBar.js';
import { renderEmptyState } from '../components/emptyState.js';

export const SalesView = {
  render(containerId, subPage = 'overview', activeHash = '#/sales/dashboard/overview') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const tabContext = TabBar.getContext(activeHash);
    const tabLabel = tabContext?.submenu?.tabs?.find(t => t.id === subPage)?.label || subPage.replace(/-/g, ' ');

    container.innerHTML = `
      <div id="sales-subpage-content">
        ${renderEmptyState({
          title: `No Sales & Export Records for ${tabLabel}`,
          description: `The Sales & Exports commercial directory (${tabContext?.submenu?.title || 'Sales & Exports'}) currently has no active contracts or shipping logs. Full interactive CRUD operations are active under the Purchase module.`,
          moduleName: "Sales & Exports",
          tabName: tabLabel
        })}
      </div>
    `;
  }
};
