// Coldstore Module Views (Configured with On-Screen Tabs & Standard Empty States)

import { TabBar } from '../components/tabBar.js';
import { renderEmptyState } from '../components/emptyState.js';

export const ColdstoreView = {
  render(containerId, subPage = 'overview', activeHash = '#/coldstore/dashboard/overview') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const tabContext = TabBar.getContext(activeHash);
    const tabLabel = tabContext?.submenu?.tabs?.find(t => t.id === subPage)?.label || subPage.replace(/-/g, ' ');

    const isOverview = subPage === 'overview';

    container.innerHTML = `
      <div id="coldstore-subpage-content" class="space-y-5 animate-fade-in">
        ${isOverview ? `
          <!-- Cold Storage Operational Telemetry KPI Cards -->
          <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div class="rounded-2xl p-4 bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
              <div class="flex items-center justify-between">
                <span class="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">CHAMBER 1 CAPACITY</span>
                <span class="w-7 h-7 rounded-lg bg-teal-50 text-[#02a8b5] flex items-center justify-center text-xs">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                </span>
              </div>
              <div class="mt-2.5 mb-1">
                <span class="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">82%</span>
                <span class="text-xs font-semibold text-slate-400 ml-0.5">Utilized</span>
              </div>
              <span class="text-[10px] font-medium text-emerald-600 flex items-center gap-0.5">820 / 1,000 Pallets Stored</span>
            </div>

            <div class="rounded-2xl p-4 bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
              <div class="flex items-center justify-between">
                <span class="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">CHAMBER 2 CAPACITY</span>
                <span class="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center text-xs">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                </span>
              </div>
              <div class="mt-2.5 mb-1">
                <span class="text-2xl sm:text-3xl font-black text-sky-600 tracking-tight">64%</span>
                <span class="text-xs font-semibold text-slate-400 ml-0.5">Utilized</span>
              </div>
              <span class="text-[10px] font-medium text-slate-400">640 / 1,000 Pallets Stored</span>
            </div>

            <div class="rounded-2xl p-4 bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
              <div class="flex items-center justify-between">
                <span class="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">TODAY PALLET INWARD</span>
                <span class="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                </span>
              </div>
              <div class="mt-2.5 mb-1">
                <span class="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">142</span>
                <span class="text-xs font-semibold text-slate-400 ml-0.5">Pallets</span>
              </div>
              <span class="text-[10px] font-medium text-emerald-600">Dock intake verified</span>
            </div>

            <div class="rounded-2xl p-4 bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
              <div class="flex items-center justify-between">
                <span class="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">COLD CHAIN AUDIT</span>
                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v18m0-18l-3 3m3-3l3 3m-3 15l-3-3m3 3l3-3M3 12h18m-18 0l3-3m-3 3l3 3m15-3l-3-3m3 3l3 3"/></svg>
                </span>
              </div>
              <div class="mt-2.5 mb-1">
                <span class="text-2xl sm:text-3xl font-black text-indigo-600 tracking-tight">100%</span>
              </div>
              <span class="text-[10px] font-medium text-slate-400">Zero temperature breach logs</span>
            </div>
          </div>
        ` : ''}

        ${renderEmptyState({
          title: `No Coldstore Stock Records for ${tabLabel}`,
          description: `The Coldstore warehouse registry (${tabContext?.submenu?.title || 'Coldstore'}) currently has no active pallet records. Full interactive CRUD operations are active under the Purchase module.`,
          moduleName: "Coldstore",
          tabName: tabLabel
        })}
      </div>
    `;
  }
};
