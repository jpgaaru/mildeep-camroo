// On-Screen Horizontal Tab Bar Component

import { NAV_HIERARCHY } from './sidebar.js';

export const TabBar = {
  render(containerId, activeHash) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const clean = (activeHash || '').replace(/^#\/?/, '').replace(/^\/+/, '');
    const parts = clean.split('/');
    const modId = parts[0] || 'purchase';
    let subId = parts[1] || 'dashboard';
    let tabId = parts[2] || '';

    const module = NAV_HIERARCHY.find(m => m.id === modId);
    if (!module) return null;

    let submenu = module.submenus.find(s => s.id === subId);
    if (!submenu) {
      submenu = module.submenus[0];
      if (submenu && submenu.tabs.some(t => t.id === subId)) {
        tabId = subId;
      }
    }
    if (!submenu) return null;

    const currentTabId = tabId || submenu.defaultTab;

    container.innerHTML = `
      <nav aria-label="${submenu.title} tabs navigation" class="tabs-card mb-5">
        <div 
          role="tablist" 
          aria-label="${submenu.title} views" 
          id="${containerId}-tablist"
          class="tabs-line w-full"
        >
          ${submenu.tabs.map(tab => {
            const isActive = tab.id === currentTabId;
            return `
              <a 
                id="tab-${tab.id}"
                role="tab"
                href="${tab.hash}" 
                aria-selected="${isActive ? 'true' : 'false'}"
                tabindex="${isActive ? '0' : '-1'}"
                aria-controls="panel-${tab.id}"
                class="${isActive ? 'active tab-active' : ''}"
              >
                <span>${tab.label}</span>
              </a>
            `;
          }).join('')}
        </div>
      </nav>
    `;

    this.bindKeyboardNav(containerId);

    return { module, submenu, currentTabId };
  },

  bindKeyboardNav(containerId) {
    const tablistEl = document.getElementById(`${containerId}-tablist`);
    if (!tablistEl) return;

    const tabElements = Array.from(tablistEl.querySelectorAll('[role="tab"]'));
    if (!tabElements.length) return;

    tabElements.forEach((tabEl, index) => {
      tabEl.addEventListener('keydown', (e) => {
        let targetIndex = -1;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          targetIndex = (index + 1) % tabElements.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          targetIndex = (index - 1 + tabElements.length) % tabElements.length;
        } else if (e.key === 'Home') {
          e.preventDefault();
          targetIndex = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          targetIndex = tabElements.length - 1;
        } else if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          tabEl.click();
          return;
        }

        if (targetIndex !== -1) {
          const targetTab = tabElements[targetIndex];
          targetTab.focus();
          targetTab.click();
        }
      });
    });
  }
};
