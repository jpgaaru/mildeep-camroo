// Inventory Module Views (Configured with On-Screen Tabs & Standard Empty States)

import { Router } from '../framework/Router.js';
import { renderEmptyState } from '../components/emptyState.js';

export const InventoryView = {
  render(containerId, subPage = 'overview', activeHash = '#/inventory/dashboard/overview') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `<div id="inventory-subpage-content"></div>`;
    const subContainer = document.getElementById('inventory-subpage-content');

    const routeInfo = Router.resolve(activeHash);
    const tabLabel = routeInfo?.subObj?.tabs?.find(t => t.id === subPage)?.label || subPage.replace(/-/g, ' ');

    subContainer.innerHTML = renderEmptyState({
      title: `No Inventory Stock for ${tabLabel}`,
      description: `The Inventory & consumables registry (${routeInfo?.subObj?.title || 'Inventory'}) currently has no active indents or issues. Full interactive CRUD operations are active under the Purchase module.`,
      moduleName: "Inventory",
      tabName: tabLabel
    });
  }
};
