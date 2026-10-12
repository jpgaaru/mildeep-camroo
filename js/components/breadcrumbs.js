// Dynamic Breadcrumb Navigation Component for Main Menu -> Sub Menu -> Tab

import { NAV_HIERARCHY } from './sidebar.js';

export const Breadcrumbs = {
  render(containerId, activeHash, customLeaf = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let crumbs = [];

    const clean = (activeHash || '').replace(/^#\/?/, '').replace(/^\/+/, '');
    const parts = clean.split('/');
    const modId = parts[0] || 'purchase';
    const subId = parts[1] || 'dashboard';
    const tabId = parts[2] || '';

    const module = NAV_HIERARCHY.find(m => m.id === modId);
    if (module) {
      const defaultModHash = module.submenus[0]?.tabs[0]?.hash || `/${modId}`;
      crumbs.push({ label: module.title, hash: defaultModHash });

      const submenu = module.submenus.find(s => s.id === subId);
      if (submenu) {
        if (modId !== 'setup') {
          const defaultSubHash = submenu.tabs[0]?.hash || `/${modId}/${subId}`;
          crumbs.push({ label: submenu.title, hash: defaultSubHash });
        }

        const tab = submenu.tabs.find(t => t.id === tabId);
        if (tab) {
          crumbs.push({ label: tab.label, hash: tab.hash, active: !customLeaf });
        }
      }
    }

    if (customLeaf) {
      crumbs.push({ label: customLeaf, hash: null, active: true });
    }

    const html = `
      <nav class="flex items-center gap-1 text-xs select-none flex-wrap" aria-label="Breadcrumb">
        <span class="inline-flex items-center text-[#64748B] mr-1 shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
        </span>
        ${crumbs.map((c, idx) => {
          const isLast = idx === crumbs.length - 1;
          const separator = !isLast ? `<span class="text-[#94A3B8] font-normal text-xs mx-1">›</span>` : '';
          
          if (c.active || isLast || !c.hash) {
            return `<span class="font-bold text-[#0F172A] truncate max-w-xs">${c.label}</span> ${separator}`;
          } else {
            return `<a href="${c.hash}" class="text-[#64748B] hover:text-[#006C7A] font-medium transition-colors truncate max-w-xs">${c.label}</a> ${separator}`;
          }
        }).join('')}
      </nav>
    `;

    container.innerHTML = html;
  }
};
