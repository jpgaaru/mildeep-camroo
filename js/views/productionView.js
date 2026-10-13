// Production Module Views (Configured with On-Screen Tabs & Standard Empty States)

import { TabBar } from '../components/tabBar.js';
import { renderEmptyState } from '../components/emptyState.js';

export const ProductionView = {
  render(containerId, subPage = 'overview', activeHash = '#/production/dashboard/overview') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const tabContext = TabBar.getContext(activeHash);
    const tabLabel = tabContext?.submenu?.tabs?.find(t => t.id === subPage)?.label || subPage.replace(/-/g, ' ');

    container.innerHTML = `
      <div id="production-subpage-content">
        ${renderEmptyState({
          title: `No Production Batches for ${tabLabel}`,
          description: `The Production floor line and freezing tracking (${tabContext?.submenu?.title || 'Production'}) currently has no active runs. Full interactive CRUD operations are active under the Purchase module.`,
          moduleName: "Production",
          tabName: tabLabel
        })}
      </div>
    `;
  }
};
