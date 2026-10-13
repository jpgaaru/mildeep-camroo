// Quality Control (QC) Module Views (Configured with On-Screen Tabs & Standard Empty States)

import { Router } from '../framework/Router.js';
import { renderEmptyState } from '../components/emptyState.js';

export const QCView = {
  render(containerId, subPage = 'qc-overview', activeHash = '#/quality/dashboard/qc-overview') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `<div id="qc-subpage-content"></div>`;
    const subContainer = document.getElementById('qc-subpage-content');

    const routeInfo = Router.resolve(activeHash);
    const tabLabel = routeInfo?.subObj?.tabs?.find(t => t.id === subPage)?.label || subPage.replace(/-/g, ' ');

    subContainer.innerHTML = renderEmptyState({
      title: `No Quality Control Records for ${tabLabel}`,
      description: `The Quality Control lab and audits register (${routeInfo?.subObj?.title || 'QC'}) currently has no active records. Full interactive CRUD operations are active under the Purchase module.`,
      moduleName: "Quality Control (QC)",
      tabName: tabLabel
    });
  }
};
