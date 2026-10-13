// Production Module Views (Configured with On-Screen Tabs & Standard Empty States)

import { Router } from '../framework/Router.js';
import { renderEmptyState } from '../components/emptyState.js';

export const ProductionView = {
  render(containerId, subPage = 'overview', activeHash = '#/production/dashboard/overview') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `<div id="production-subpage-content"></div>`;
    const subContainer = document.getElementById('production-subpage-content');

    const routeInfo = Router.resolve(activeHash);
    const tabLabel = routeInfo?.subObj?.tabs?.find(t => t.id === subPage)?.label || subPage.replace(/-/g, ' ');

    subContainer.innerHTML = renderEmptyState({
      title: `No Production Batches for ${tabLabel}`,
      description: `The Production floor line and freezing tracking (${routeInfo?.subObj?.title || 'Production'}) currently has no active runs. Full interactive CRUD operations are active under the Purchase module.`,
      moduleName: "Production",
      tabName: tabLabel
    });
  }
};
