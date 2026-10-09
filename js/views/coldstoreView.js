// Coldstore Module Views (Configured with On-Screen Tabs & Standard Empty States)

import { TabBar } from '../components/tabBar.js';
import { renderEmptyState } from '../components/emptyState.js';

export const ColdstoreView = {
  render(containerId, subPage = 'overview', activeHash = '#/coldstore/dashboard/overview') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div id="coldstore-tab-bar-container"></div>
      <div id="coldstore-subpage-content"></div>
    `;

    const tabContext = TabBar.render('coldstore-tab-bar-container', activeHash);
    const subContainer = document.getElementById('coldstore-subpage-content');

    const tabLabel = tabContext?.submenu?.tabs?.find(t => t.id === subPage)?.label || subPage.replace(/-/g, ' ');

    subContainer.innerHTML = renderEmptyState({
      title: `No Coldstore Stock Records for ${tabLabel}`,
      description: `The Coldstore warehouse registry (${tabContext?.submenu?.title || 'Coldstore'}) currently has no active pallet records. Full interactive CRUD operations are active under the Purchase module.`,
      moduleName: "Coldstore",
      tabName: tabLabel
    });
  }
};
