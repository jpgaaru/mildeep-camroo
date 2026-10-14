// AquaPulse Framework — Stage 2: Composite UI Molecules
// Reusable multi-atom molecules: StatTile, FilterBar, SectionHeader

import { Atoms } from '../atoms/index.js';

export const Molecules = {
  /**
   * StatTile Molecule — High-Precision Telemetry KPI Card
   */
  StatTile({
    label = '',
    value = '',
    unit = '',
    badgeText = '',
    badgeTone = 'teal',
    icon = 'activity',
    footerLabel = '',
    footerValue = '',
    footerValueColor = 'text-[#0F172A]',
    valueColor = 'text-[#0F172A]'
  } = {}) {
    const toneStyles = {
      teal: {
        iconBox: 'bg-[#F0FAFC] border-[#B2ECF3] text-[#006C7A]',
        pill: 'text-[#056A38] bg-[#EAFAF1] border-[#A8E7C3]'
      },
      emerald: {
        iconBox: 'bg-[#EAFAF1] border-[#A8E7C3] text-[#056A38]',
        pill: 'text-[#056A38] bg-[#EAFAF1] border-[#A8E7C3]'
      },
      ruby: {
        iconBox: 'bg-[#FEEFF1] border-[#F9B0BE] text-[#B5152B]',
        pill: 'text-[#B5152B] bg-[#FEEFF1] border-[#F9B0BE]'
      },
      amber: {
        iconBox: 'bg-[#FFF9E6] border-[#F7DA94] text-[#824D00]',
        pill: 'text-[#824D00] bg-[#FFF9E6] border-[#F7DA94]'
      },
      sky: {
        iconBox: 'bg-[#E0F2FE] border-[#7DD3FC] text-[#0369A1]',
        pill: 'text-[#0369A1] bg-[#E0F2FE] border-[#7DD3FC]'
      }
    }[badgeTone] || {
      iconBox: 'bg-[#F0FAFC] border-[#B2ECF3] text-[#006C7A]',
      pill: 'text-[#006C7A] bg-[#F0FAFC] border-[#B2ECF3]'
    };

    const iconHtml = icon.trim().startsWith('<')
      ? icon
      : `<i data-lucide="${icon}" class="w-4 h-4"></i>`;

    return `
      <div class="mcard bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all">
        <div class="flex items-center justify-between gap-2.5">
          <span class="w-8 h-8 rounded-lg border flex items-center justify-center ${toneStyles.iconBox}">
            ${iconHtml}
          </span>
          ${badgeText ? `<span class="inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full text-[10.5px] border ${toneStyles.pill}">${badgeText}</span>` : ''}
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold ${valueColor} tracking-tight tabular-nums">
            ${value} ${unit ? `<span class="text-xs font-medium text-[#64748B]">${unit}</span>` : ''}
          </div>
          <div class="text-xs font-semibold text-[#64748B] uppercase tracking-wider mt-0.5">${label}</div>
        </div>
        ${(footerLabel || footerValue) ? `
          <div class="mt-3 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] text-[#64748B]">
            <span>${footerLabel}</span>
            <b class="${footerValueColor} font-semibold">${footerValue}</b>
          </div>
        ` : ''}
      </div>
    `;
  },

  /**
   * FilterBar Molecule — Standardized Collapsible 5-Column AquaPulse Search & Filter Bar
   * @param {Object} props - { id, title, fields: Array<{ type: 'select'|'date'|'text', ... }>, searchBtnId, resetBtnId, extraActionsHtml }
   */
  FilterBar({
    id = 'erp-filter-bar',
    title = 'Search & Filters',
    fields = [],
    searchBtnId = '',
    resetBtnId = '',
    showSearchButton = true,
    extraActionsHtml = ''
  } = {}) {
    const bodyId = `${id}-body`;
    const fieldsHtml = fields.map((field) => {
      if (field.type === 'select') {
        return Atoms.RichSelect(field);
      }
      if (field.type === 'date') {
        return Atoms.DateInput(field);
      }
      return Atoms.TextInput(field);
    }).join('');

    return `
      <div id="${id}" class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs mb-5 transition-all duration-200">
        <div class="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-[#0F172A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110-4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
            <h3 class="text-sm font-bold text-[#0F172A]">${title}</h3>
          </div>

          <!-- Filter Controls: Reset & Toggle Open/Close -->
          <div class="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
            <button
              type="button"
              ${resetBtnId ? `id="${resetBtnId}"` : ''}
              onclick="const s = document.querySelectorAll('#${bodyId} select'); s.forEach(sel => { sel.selectedIndex = 0; sel.dispatchEvent(new Event('change', { bubbles: true })); }); const d = document.querySelectorAll('#${bodyId} input'); d.forEach(i => i.value=''); if (window.Toast) Toast.show('Filters reset', 'info');"
              class="hover:text-[#006C7A] transition-colors cursor-pointer"
              title="Reset all filters"
            >Reset</button>
            <span class="text-[#CBD5E1]">|</span>
            <button
              type="button"
              onclick="const b = document.getElementById('${bodyId}'); const t = this.querySelector('.fw-toggle-text'); const ic = this.querySelector('svg'); b.classList.toggle('hidden'); if(b.classList.contains('hidden')){ t.innerText='Show Filter'; ic.classList.add('rotate-180'); } else { t.innerText='Hide Filter'; ic.classList.remove('rotate-180'); }"
              class="flex items-center gap-1 hover:text-[#006C7A] transition-colors cursor-pointer"
              title="Hide Filter"
            >
              <span class="fw-toggle-text">Hide Filter</span>
              <svg class="w-3.5 h-3.5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
            </button>
          </div>
        </div>

        <div id="${bodyId}" class="dt-top-filter-body mt-4 transition-all duration-200">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-xs">
            ${fieldsHtml}
          </div>
          ${showSearchButton ? `
            <div class="flex justify-end items-center gap-2 mt-4">
              ${extraActionsHtml}
              <button
                type="button"
                ${searchBtnId ? `id="${searchBtnId}"` : ''}
                onclick="if (window.Toast) Toast.show('Dashboard filters applied successfully', 'info');"
                class="btn-primary h-[38px] px-6 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-xs hover:shadow cursor-pointer"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  },

  /**
   * SectionHeader Molecule — Renders Page Title + Horizontal Inline Subtitle + Action Slot
   */
  SectionHeader({ title = '', subtitle = '' } = {}) {
    return `
      <div class="flex items-center justify-between gap-4 py-0.5">
        <!-- Left: Heading -->
        <div class="flex flex-wrap items-baseline gap-2.5 min-w-0">
          <h1 class="text-xl font-bold tracking-tight text-[#0F172A] whitespace-nowrap">${title}</h1>
        </div>

        <!-- Right: Primary Page-Level Action Button Slot -->
        <div id="section-action-btn-container" class="shrink-0 flex items-center gap-2"></div>
      </div>
    `;
  }
};
