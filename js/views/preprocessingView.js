// Pre-Processing Module Views (Configured with On-Screen Tabs & Standard Empty States)

import { Router } from '../framework/Router.js';
import { renderEmptyState } from '../components/emptyState.js';

export const PreprocessingView = {
  render(containerId, subPage = 'floor-overview', activeHash = '#/preprocessing/dashboard/floor-overview') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `<div id="preprocessing-subpage-content"></div>`;
    const subContainer = document.getElementById('preprocessing-subpage-content');

    const routeInfo = Router.resolve(activeHash);
    const tabLabel = routeInfo?.subObj?.tabs?.find(t => t.id === subPage)?.label || subPage.replace(/-/g, ' ');

    subContainer.innerHTML = renderEmptyState({
      title: `No Active Records for ${tabLabel}`,
      description: `The Pre-Processing module (${routeInfo?.subObj?.title || 'Pre-Processing'}) currently has no live active records. Full interactive CRUD operations are active under the Purchase module.`,
      moduleName: "Pre-Processing",
      tabName: tabLabel
    });
  }
};
