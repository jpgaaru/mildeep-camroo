// Pre-Processing Module Views (Configured with On-Screen Tabs & Standard Empty States)

import { TabBar } from '../components/tabBar.js';
import { renderEmptyState } from '../components/emptyState.js';

export const PreprocessingView = {
  render(containerId, subPage = 'floor-overview', activeHash = '#/preprocessing/dashboard/floor-overview') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const tabContext = TabBar.getContext(activeHash);
    const tabLabel = tabContext?.submenu?.tabs?.find(t => t.id === subPage)?.label || subPage.replace(/-/g, ' ');

    container.innerHTML = `
      <div id="preprocessing-subpage-content">
        ${renderEmptyState({
          title: `No Active Records for ${tabLabel}`,
          description: `The Pre-Processing module (${tabContext?.submenu?.title || 'Pre-Processing'}) currently has no live active records. Full interactive CRUD operations are active under the Purchase module.`,
          moduleName: "Pre-Processing",
          tabName: tabLabel
        })}
      </div>
    `;
  }
};
