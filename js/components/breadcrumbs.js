// Dynamic Breadcrumb Navigation Component for Main Menu -> Sub Menu -> Tab

import { NAV_HIERARCHY } from './sidebar.js';
import { Environment } from '../framework/Environment.js';

export const Breadcrumbs = {
  render(containerId, activeHash, customLeaf = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let crumbs = [];
    const isS01 = Environment.isSitemap01();

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

        if (isS01 && tabId) {
          const activeTab = submenu.tabs.find(t => t.id === tabId);
          if (activeTab) {
            crumbs.push({ label: activeTab.label, hash: null, active: true });
          }
        }
      }
    }

    if (!activeHash || activeHash === '#/home' || activeHash.startsWith('#/home')) {
      container.innerHTML = '';
      return;
    }

    if (customLeaf) {
      crumbs.push({ label: customLeaf, hash: null, active: true });
    }

    if (crumbs.length === 0) {
      container.innerHTML = '';
      return;
    }

    const html = `
      <nav class="flex items-center text-xs select-none flex-wrap ${isS01 ? 'py-1' : 'gap-1'}" aria-label="Breadcrumb">
        ${!isS01 ? `
          <span class="inline-flex items-center text-[#64748B] mr-1 shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
          </span>
        ` : ''}
        ${crumbs.map((c, idx) => {
          const isLast = idx === crumbs.length - 1;
          const separator = !isLast 
            ? (isS01 ? `<span class="text-[#CBD5E1] font-normal text-xs mx-2.5">/</span>` : `<span class="text-[#94A3B8] font-normal text-xs mx-1">›</span>`) 
            : '';
          
          if (c.active || isLast || !c.hash) {
            return `<span class="font-bold text-[#0F172A] truncate max-w-xs">${c.label}</span> ${separator}`;
          } else {
            return `<a href="${c.hash}" class="${isS01 ? 'text-[#64748B] hover:text-[#00A8B5]' : 'text-[#64748B] hover:text-[#006C7A]'} font-normal transition-colors truncate max-w-xs">${c.label}</a> ${separator}`;
          }
        }).join('')}
      </nav>
    `;

    container.innerHTML = html;
  }
};
