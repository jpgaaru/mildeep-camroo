// Atomic Design: Molecules (Composed Units of Atoms with Combined Responsibility)

import { Atoms } from '../atoms/atoms.js';

export const Molecules = {
  /**
   * Search Input with Leading Icon Molecule
   */
  searchField({
    id = 'global-search',
    placeholder = 'Search...',
    value = '',
    onInput = ''
  }) {
    return `
      <div class="relative w-full">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#94A3B8]">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </span>
        <input 
          type="text" 
          id="${id}"
          value="${value}"
          placeholder="${placeholder}"
          ${onInput ? `oninput="${onInput}"` : ''}
          class="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg pl-9 pr-4 py-2 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0284C7] focus:border-[#0284C7] transition-all"
        />
      </div>
    `;
  },

  /**
   * KPI Metric Card Molecule
   */
  kpiCard({
    title = '',
    value = '',
    unit = '',
    icon = '',
    variant = 'primary', // primary | success | danger | warning
    trend = null
  }) {
    const borders = {
      primary: 'border-[#BAE6FD]',
      success: 'border-[#A7F3D0]',
      danger: 'border-[#FECACA]',
      warning: 'border-[#FDE68A]'
    }[variant] || 'border-[#CBD5E1]';

    const iconBgs = {
      primary: 'bg-[#E0F2FE] text-[#0284C7]',
      success: 'bg-[#ECFDF5] text-[#059669]',
      danger: 'bg-[#FEF2F2] text-[#DC2626]',
      warning: 'bg-[#FFFBEB] text-[#D97706]'
    }[variant] || 'bg-[#F1F5F9] text-[#64748B]';

    return `
      <div class="bg-white rounded-xl border ${borders} p-4 flex items-center justify-between transition-all">
        <div>
          <div class="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">${title}</div>
          <div class="flex items-baseline gap-1.5">
            <span class="text-2xl font-black text-[#0F172A] tracking-tight">${value}</span>
            ${unit ? `<span class="text-xs font-semibold text-[#64748B]">${unit}</span>` : ''}
          </div>
          ${trend ? `
            <div class="mt-1 flex items-center gap-1 text-[11px] font-semibold ${trend.positive ? 'text-[#059669]' : 'text-[#DC2626]'}">
              <span>${trend.positive ? '↑' : '↓'} ${trend.value}</span>
              <span class="text-[#94A3B8] font-normal">${trend.label}</span>
            </div>
          ` : ''}
        </div>
        ${icon ? `
          <div class="w-11 h-11 rounded-lg ${iconBgs} flex items-center justify-center shrink-0">
            ${icon}
          </div>
        ` : ''}
      </div>
    `;
  },

  /**
   * Filter Control Field (Label + Form Input) Molecule
   */
  filterField({
    label = '',
    controlHtml = ''
  }) {
    return `
      <div class="flex flex-col gap-1.5">
        <label class="text-[11px] font-bold text-[#475569] uppercase tracking-wider">${label}</label>
        ${controlHtml}
      </div>
    `;
  }
};
