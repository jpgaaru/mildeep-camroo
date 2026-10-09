// Pre-Processing Module Views (Configured with On-Screen Tabs & Standard Empty States)

import { TabBar } from '../components/tabBar.js';
import { renderEmptyState } from '../components/emptyState.js';

export const PreprocessingView = {
  render(containerId, subPage = 'floor-overview', activeHash = '#/preprocessing/dashboard/floor-overview') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div id="preprocessing-tab-bar-container"></div>
      <div id="preprocessing-subpage-content"></div>
    `;

    const tabContext = TabBar.render('preprocessing-tab-bar-container', activeHash);
    const subContainer = document.getElementById('preprocessing-subpage-content');

    const tabLabel = tabContext?.submenu?.tabs?.find(t => t.id === subPage)?.label || subPage.replace(/-/g, ' ');

    subContainer.innerHTML = renderEmptyState({
      title: `No Active Records for ${tabLabel}`,
      description: `The Pre-Processing module (${tabContext?.submenu?.title || 'Pre-Processing'}) currently has no live active records. Full interactive CRUD operations are active under the Purchase module.`,
      moduleName: "Pre-Processing",
      tabName: tabLabel
    });
  }
};
