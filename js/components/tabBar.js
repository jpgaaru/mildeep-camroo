// On-Screen Horizontal Tab Bar Component

import { NAV_HIERARCHY } from './sidebar.js';
import { Environment } from '../framework/Environment.js';

export const TabBar = {
  getContext(activeHash) {
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
    return { module, submenu, currentTabId };
  },

  render(containerId, activeHash, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    if (activeHash && (activeHash === '#/home' || activeHash.startsWith('#/home'))) {
      container.innerHTML = '';
      return null;
    }

    const ctx = this.getContext(activeHash);
    if (!ctx) {
      container.innerHTML = '';
      return null;
    }
    const { module, submenu, currentTabId } = ctx;

    if (!submenu.tabs || submenu.tabs.length <= 1 || currentTabId === 'new-pi') {
      container.innerHTML = '';
      return null;
    }

    const isPill = options && options.variant === 'pill';

    if (isPill) {
      // Pill segment for compact controls
      container.innerHTML = `
        <nav aria-label="${submenu.title} compact navigation" class="mb-5">
          <div 
            role="tablist" 
            aria-label="${submenu.title} views" 
            id="${containerId}-tablist"
            class="tabs"
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
                  class="${isActive ? 'active' : ''}"
                >
                  <span>${tab.label}</span>
                </a>
              `;
            }).join('')}
          </div>
        </nav>
      `;
    } else {
      // Clean full-width underline tabs for full page section switching across all submenus (matching Sales sub-menu standard)
      container.innerHTML = `
        <nav aria-label="${submenu.title} tabs navigation" class="mb-4">
          <div 
            role="tablist" 
            aria-label="${submenu.title} views" 
            id="${containerId}-tablist"
            class="flex items-center gap-6 border-b border-[#E2E8F0] pt-1 pb-0 select-none overflow-x-auto"
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
                  class="select-none px-1 py-2 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 border-b-2 -mb-[1px] outline-none ${
                    isActive 
                      ? 'tab-active border-[#00A4B7] text-[#00A4B7] font-bold bg-transparent' 
                      : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] bg-transparent'
                  }"
                >
                  <span class="select-none">${tab.label}</span>
                </a>
              `;
            }).join('')}
          </div>
        </nav>
      `;
    }

    this.bindKeyboardNav(containerId);

    return { module, submenu, currentTabId };
  },

  // Standalone helper to render compact pill segmented controls for filters or sub-views
  renderPills(containerId, items = [], activeId = '', onSelect = null) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    container.innerHTML = `
      <div class="tabs" role="tablist">
        ${items.map(item => {
          const isActive = item.id === activeId;
          return `
            <button 
              type="button"
              role="tab"
              data-id="${item.id}"
              aria-selected="${isActive ? 'true' : 'false'}"
              class="${isActive ? 'active' : ''}"
            >
              <span>${item.label}</span>
            </button>
          `;
        }).join('')}
      </div>
    `;

    if (typeof onSelect === 'function') {
      const buttons = container.querySelectorAll('button[role="tab"]');
      buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = btn.getAttribute('data-id');
          buttons.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');
          onSelect(targetId);
        });
      });
    }
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
