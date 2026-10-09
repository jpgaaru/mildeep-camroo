// Production Module Views (Configured with On-Screen Tabs & Standard Empty States)

import { TabBar } from '../components/tabBar.js';
import { renderEmptyState } from '../components/emptyState.js';

export const ProductionView = {
  render(containerId, subPage = 'overview', activeHash = '#/production/dashboard/overview') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div id="production-tab-bar-container"></div>
      <div id="production-subpage-content"></div>
    `;

    const tabContext = TabBar.render('production-tab-bar-container', activeHash);
    const subContainer = document.getElementById('production-subpage-content');

    const tabLabel = tabContext?.submenu?.tabs?.find(t => t.id === subPage)?.label || subPage.replace(/-/g, ' ');

    subContainer.innerHTML = renderEmptyState({
      title: `No Production Batches for ${tabLabel}`,
      description: `The Production floor line and freezing tracking (${tabContext?.submenu?.title || 'Production'}) currently has no active runs. Full interactive CRUD operations are active under the Purchase module.`,
      moduleName: "Production",
      tabName: tabLabel
    });
  }
};
