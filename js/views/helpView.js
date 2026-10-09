// Help Module View (Configured with On-Screen Tabs & Standard Under Construction State)
import { TabBar } from '../components/tabBar.js';
import { renderEmptyState } from '../components/emptyState.js';

export const HelpView = {
  render(containerId, subPage = 'compliance-manual', activeHash = '#/help/documentation/compliance-manual') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div id="help-tab-bar-container"></div>
      <div id="help-subpage-content"></div>
    `;

    const tabContext = TabBar.render('help-tab-bar-container', activeHash);
    const subContainer = document.getElementById('help-subpage-content');

    const tabLabel = tabContext?.submenu?.tabs?.find(t => t.id === subPage)?.label || (subPage ? subPage.replace(/-/g, ' ') : 'Overview');

    subContainer.innerHTML = renderEmptyState({
      moduleName: "Help",
      tabName: tabLabel
    });
  }
};
