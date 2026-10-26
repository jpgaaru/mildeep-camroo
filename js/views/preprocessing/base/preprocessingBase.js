// Pre-processing Module — Design System Base & Utilities
// Pre-processing Operations View (Standardized with Purchase Base Design System)
import { Toast } from '../../../components/toast.js';
import { Modal } from '../../../components/modal.js';

// =========================================================================
// AQUAPULSE / DEVI FISHERIES BASE DESIGN SYSTEM (STANDARDIZED FROM PURCHASE)
// =========================================================================
var UIBase = window.UIBase = window.UIBase || {
  renderHeader(title, actionBtnHtml = '') {
    return `
      <div class="flex flex-wrap items-center justify-between gap-3 mb-2 animate-fade-in">
        <div>
          <h1 class="text-xl font-extrabold text-[#172B4D]">${title}</h1>
        </div>
        ${actionBtnHtml ? `<div class="flex items-center gap-2">${actionBtnHtml}</div>` : ''}
      </div>
    `;
  },

  renderFilterCard(opts) {
    const { idPrefix, title = 'Search & Filters', fields = [], searchBtnText = 'Search' } = opts;
    return `
      <div class="dt-top-filter-card bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs mb-3 transition-all duration-200" style="margin-bottom: 12px !important;">
        <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#F1F5F9]">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#0F172A] uppercase tracking-wider">${title}</h3>
          </div>
        </div>

        <div id="${idPrefix}-filter-body" class="dt-top-filter-body grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-xs items-end">
          ${fields.map(f => `
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">${f.label}</label>
              ${f.html}
            </div>
          `).join('')}

          <div class="flex items-center gap-2 pt-2">
            <button type="button" id="${idPrefix}-search-btn" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <span>${searchBtnText}</span>
            </button>
            <button type="button" id="${idPrefix}-reset-btn" class="px-4 py-2 bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1 shadow-xs hover:shadow transition-all cursor-pointer" title="Reset all filters">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  bindFilter(idPrefix, onSearch, onReset) {
    const toggleBtn = document.getElementById(`${idPrefix}-toggle-btn`);
    const filterBody = document.getElementById(`${idPrefix}-filter-body`);
    const toggleIcon = document.getElementById(`${idPrefix}-toggle-icon`);
    const resetBtn = document.getElementById(`${idPrefix}-reset-btn`);
    const searchBtn = document.getElementById(`${idPrefix}-search-btn`);

    if (toggleBtn && filterBody) {
      let isCollapsed = false;
      toggleBtn.onclick = () => {
        isCollapsed = !isCollapsed;
        if (isCollapsed) {
          filterBody.classList.add('hidden');
          if (toggleIcon) toggleIcon.classList.add('-rotate-90');
          toggleBtn.title = 'Show Filter';
        } else {
          filterBody.classList.remove('hidden');
          if (toggleIcon) toggleIcon.classList.remove('-rotate-90');
          toggleBtn.title = 'Hide Filter';
        }
      };
    }

    if (resetBtn && onReset) {
      resetBtn.onclick = onReset;
    }

    if (searchBtn && onSearch) {
      searchBtn.onclick = onSearch;
    }
  },

  renderTotals(title, count, countUnit, metrics) {
    return `
      <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs mt-4 animate-fade-in">
        <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#EBECF0]">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-[#006644]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            <h3 class="text-xs font-bold text-[#172B4D]">${title}</h3>
          </div>
          <span class="text-xs text-[#5E6C84]">Showing totals for <strong class="text-[#172B4D]">${count}</strong> ${countUnit}</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
          ${metrics.map(m => `
            <div class="p-3 bg-[#FAFBFC] rounded-lg border border-[#EBECF0]">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">${m.label}</span>
              <div class="flex items-baseline justify-between">
                <span class="text-lg font-extrabold ${m.color || 'text-[#172B4D]'}">${m.value}</span>
                ${m.badge ? `<span class="text-[10px] ${m.badgeColor || 'text-[#0284C7] bg-[#F0F9FF]'} font-semibold px-1.5 py-0.5 rounded">${m.badge}</span>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderBadge(text, type = 'default') {
    const map = {
      default: 'bg-[#F4F5F7] text-[#172B4D] border-[#DFE1E6]',
      success: 'bg-[#E3FCEF] text-[#006644] border-[#ABF5D1]',
      warning: 'bg-[#FFF0B3] text-[#8F4D00] border-[#FFE380]',
      danger: 'bg-[#FFEBE6] text-[#BF2600] border-[#FFBDAD]',
      info: 'bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]'
    };
    const cls = map[type] || map.default;
    return `<span class="font-medium px-2 py-0.5 rounded text-[11px] border ${cls}">${text}</span>`;
  },

  renderActionButtons(opts = {}) {
    const { onView, onEdit, onDownload, onDelete } = opts;
    return `
      <div class="flex items-center gap-1">
        ${onView ? `<button onclick="${onView}" class="p-1 rounded text-[#0284C7] hover:bg-[#F0F9FF]" title="View Details"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg></button>` : ''}
        ${onEdit ? `<button onclick="${onEdit}" class="p-1 rounded text-[#006644] hover:bg-[#E3FCEF]" title="Edit"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>` : ''}
        ${onDownload ? `<button onclick="${onDownload}" class="p-1 rounded text-[#0284C7] hover:bg-[#F0F9FF]" title="Download Document"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg></button>` : ''}
        ${onDelete ? `<button onclick="${onDelete}" class="p-1 rounded text-[#FF5150] hover:bg-[#FEF2F2]" title="Delete"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>` : ''}
      </div>
    `;
  }
};

// =========================================================================
// PRE-PROCESSING MODULE (STANDARDIZED WITH PURCHASE BASE DESIGN SYSTEM)
// =========================================================================
// ==========================================================
// Camaroo Design System — Controller Engine for Pre-Processing
// 1. Interactive Calendar Popover (Image 1)
// 2. Custom Select Dropdown with Checkmark (Image 2)
// ==========================================================
export const CamarooControls = {
  calendar: {
    activeInput: null,
    popover: null,
    currentDate: new Date(),
    selectedDate: null,
    viewMode: 'DAYS',
    yearRangeStart: null,
    isInitialized: false,

    init() {
      if (this.isInitialized) return;
      this.isInitialized = true;
      this.createPopover();
      this.bindGlobalListeners();
    },

    createPopover() {
      let existing = document.getElementById('camaroo-calendar-popover');
      if (existing) {
        this.popover = existing;
        this.injectStyles();
        return;
      }
      const popover = document.createElement('div');
      popover.id = 'camaroo-calendar-popover';
      popover.className = 'calendar-popover';
      document.body.appendChild(popover);
      this.popover = popover;
      this.injectStyles();
    },

    injectStyles() {
      if (document.getElementById('camaroo-calendar-styles')) return;
      const st = document.createElement('style');
      st.id = 'camaroo-calendar-styles';
      st.textContent = `
        .calendar-title-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          border-radius: 8px;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .calendar-title-btn:hover {
          background: #F1F5F9;
        }
        .calendar-view-transition {
          animation: calFadeScale 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes calFadeScale {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .calendar-years-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          padding: 10px 0 6px 0;
        }
        .calendar-year-btn {
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          border: 1px solid transparent;
          background: transparent;
          color: #334155;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .calendar-year-btn:hover {
          background: #F1F5F9;
          color: #006C7A;
          transform: scale(1.03);
        }
        .calendar-year-btn.selected {
          background: #006C7A;
          color: #FFFFFF;
          box-shadow: 0 2px 6px rgba(0, 108, 122, 0.25);
          font-weight: 700;
        }
        .calendar-year-btn.today:not(.selected) {
          border-color: #006C7A;
          color: #006C7A;
        }
        /* Suppress native browser calendar picker indicator everywhere */
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="datetime-local"]::-webkit-calendar-picker-indicator,
        input[type="month"]::-webkit-calendar-picker-indicator,
        input::-webkit-calendar-picker-indicator {
          display: none !important;
          -webkit-appearance: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        input[type="date"],
        .erp-date-input {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23006C7A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='18' height='18' x='3' y='4' rx='2' ry='2'/%3E%3Cline x1='16' x2='16' y1='2' y2='6'/%3E%3Cline x1='8' x2='8' y1='2' y2='6'/%3E%3Cline x1='3' x2='21' y1='10' y2='10'/%3E%3Cpath d='M8 14h.01'/%3E%3Cpath d='M12 14h.01'/%3E%3Cpath d='M16 14h.01'/%3E%3Cpath d='M8 18h.01'/%3E%3Cpath d='M12 18h.01'/%3E%3Cpath d='M16 18h.01'/%3E%3C/svg%3E") !important;
          background-repeat: no-repeat !important;
          background-position: right 12px center !important;
          background-size: 16px 16px !important;
          cursor: pointer !important;
        }
      `;
      document.head.appendChild(st);
    },

    bindGlobalListeners() {
      document.addEventListener('mousedown', (e) => {
        const dateInput = e.target.closest('input[type="date"], .erp-date-input, [data-calendar]');
        if (dateInput) {
          e.preventDefault();
        }
      });

      document.addEventListener('click', (e) => {
        const dateInput = e.target.closest('input[type="date"], .erp-date-input, [data-calendar]');
        if (dateInput) {
          e.preventDefault();
          e.stopPropagation();
          this.open(dateInput);
          return;
        }

        if (this.popover && !this.popover.contains(e.target)) {
          this.close();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.close();
      });

      window.addEventListener('resize', () => {
        if (this.activeInput && this.popover && this.popover.classList.contains('show')) {
          this.positionPopover();
        }
      });

      window.addEventListener('scroll', () => {
        if (this.activeInput && this.popover && this.popover.classList.contains('show')) {
          this.positionPopover();
        }
      }, true);
    },

    open(inputElement) {
      if (!this.popover) this.createPopover();
      this.activeInput = inputElement;
      this.viewMode = 'DAYS';
      this.yearRangeStart = null;

      const val = (inputElement.value || '').trim();
      if (val) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
          const parts = val.split('-');
          this.selectedDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
          this.currentDate = new Date(this.selectedDate);
        } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(val)) {
          const [d, m, y] = val.split('/');
          this.selectedDate = new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
          this.currentDate = new Date(this.selectedDate);
        } else {
          this.selectedDate = new Date();
          this.currentDate = new Date();
        }
      } else {
        this.selectedDate = new Date();
        this.currentDate = new Date();
      }

      this.render();
      this.popover.classList.add('show');
      this.positionPopover();
    },

    close() {
      if (this.popover) {
        this.popover.classList.remove('show');
      }
      this.activeInput = null;
    },

    positionPopover() {
      if (!this.activeInput || !this.popover) return;
      const rect = this.activeInput.getBoundingClientRect();
      const popoverWidth = 288;
      const popoverHeight = 320;

      let left = rect.left + window.scrollX;
      let top = rect.bottom + window.scrollY + 6;

      if (left + popoverWidth > window.innerWidth - 16) {
        left = window.innerWidth - popoverWidth - 16;
      }
      if (left < 16) left = 16;

      if (rect.bottom + popoverHeight > window.innerHeight && rect.top > popoverHeight + 12) {
        top = rect.top + window.scrollY - popoverHeight - 6;
      }

      this.popover.style.left = `${left}px`;
      this.popover.style.top = `${top}px`;
    },

    render() {
      if (!this.popover) return;
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();

      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      const today = new Date();

      if (this.viewMode === 'YEARS') {
        if (this.yearRangeStart == null) {
          this.yearRangeStart = Math.floor(year / 12) * 12;
        }
        const startYear = this.yearRangeStart;
        const endYear = startYear + 11;

        let yearsHtml = '';
        for (let yr = startYear; yr <= endYear; yr++) {
          const isSelected = this.selectedDate && this.selectedDate.getFullYear() === yr;
          const isTodayYear = today.getFullYear() === yr;
          let classes = 'calendar-year-btn';
          if (isSelected) classes += ' selected';
          if (isTodayYear) classes += ' today';
          yearsHtml += `<button type="button" class="${classes}" data-calendar-year="${yr}">${yr}</button>`;
        }

        this.popover.innerHTML = `
          <div class="calendar-inner calendar-view-transition">
            <div class="calendar-header">
              <button type="button" id="cal-prev-btn" class="calendar-nav-btn" title="Previous 12 Years">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>

              <button type="button" id="cal-title-toggle-btn" class="calendar-title-btn select-none" title="Return to Days View">
                <span class="font-extrabold text-[#006C7A] text-[13px]">${startYear} – ${endYear}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#006C7A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
              </button>

              <button type="button" id="cal-next-btn" class="calendar-nav-btn" title="Next 12 Years">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>

            <div class="calendar-years-grid">
              ${yearsHtml}
            </div>
          </div>
        `;

        this.popover.querySelector('#cal-prev-btn')?.addEventListener('click', (e) => {
          e.stopPropagation();
          this.yearRangeStart -= 12;
          this.render();
        });

        this.popover.querySelector('#cal-next-btn')?.addEventListener('click', (e) => {
          e.stopPropagation();
          this.yearRangeStart += 12;
          this.render();
        });

        this.popover.querySelector('#cal-title-toggle-btn')?.addEventListener('click', (e) => {
          e.stopPropagation();
          this.viewMode = 'DAYS';
          this.render();
        });

        this.popover.querySelectorAll('[data-calendar-year]').forEach((btn) => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const selectedYr = parseInt(btn.getAttribute('data-calendar-year'), 10);
            this.currentDate.setFullYear(selectedYr);
            this.viewMode = 'DAYS';
            this.render();
          });
        });

      } else {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();
        const isTodayYearMonth = today.getFullYear() === year && today.getMonth() === month;

        let daysHtml = '';

        for (let i = firstDay - 1; i >= 0; i--) {
          const d = prevMonthDays - i;
          daysHtml += `<button type="button" class="calendar-day-btn other-month" tabindex="-1">${d}</button>`;
        }

        for (let day = 1; day <= daysInMonth; day++) {
          const isSelected = this.selectedDate &&
            this.selectedDate.getFullYear() === year &&
            this.selectedDate.getMonth() === month &&
            this.selectedDate.getDate() === day;

          const isCurrentDay = isTodayYearMonth && today.getDate() === day;

          let classes = 'calendar-day-btn';
          if (isSelected) classes += ' selected';
          if (isCurrentDay) classes += ' today';

          daysHtml += `<button type="button" class="${classes}" data-calendar-day="${day}">${day}</button>`;
        }

        this.popover.innerHTML = `
          <div class="calendar-inner calendar-view-transition">
            <div class="calendar-header">
              <button type="button" id="cal-prev-btn" class="calendar-nav-btn" title="Previous Month">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>

              <button type="button" id="cal-title-toggle-btn" class="calendar-title-btn select-none" title="Select Year">
                <span class="cal-month text-[#006C7A] font-extrabold text-[13px]">${monthNames[month]}</span>
                <span class="cal-year font-extrabold text-[#0F172A] text-[13px] ml-1">${year}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#006C7A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>

              <button type="button" id="cal-next-btn" class="calendar-nav-btn" title="Next Month">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>

            <div class="calendar-weekdays">
              <span>SU</span><span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span>
            </div>

            <div class="calendar-days-grid">
              ${daysHtml}
            </div>
          </div>
        `;

        this.popover.querySelector('#cal-prev-btn')?.addEventListener('click', (e) => {
          e.stopPropagation();
          this.currentDate.setMonth(this.currentDate.getMonth() - 1);
          this.render();
        });

        this.popover.querySelector('#cal-next-btn')?.addEventListener('click', (e) => {
          e.stopPropagation();
          this.currentDate.setMonth(this.currentDate.getMonth() + 1);
          this.render();
        });

        this.popover.querySelector('#cal-title-toggle-btn')?.addEventListener('click', (e) => {
          e.stopPropagation();
          this.viewMode = 'YEARS';
          this.yearRangeStart = Math.floor(this.currentDate.getFullYear() / 12) * 12;
          this.render();
        });

        this.popover.querySelectorAll('[data-calendar-day]').forEach((btn) => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const day = parseInt(btn.getAttribute('data-calendar-day'), 10);
            this.selectDate(year, month, day);
          });
        });
      }
    },

    selectDate(year, month, day) {
      if (!this.activeInput) return;
      const pad = (n) => String(n).padStart(2, '0');
      const isIso = this.activeInput.type === 'date' || this.activeInput.placeholder === 'yyyy-mm-dd';
      const dateStr = isIso ? `${year}-${pad(month + 1)}-${pad(day)}` : `${pad(day)}/${pad(month + 1)}/${year}`;

      this.activeInput.value = dateStr;
      this.activeInput.dispatchEvent(new Event('change', { bubbles: true }));
      this.activeInput.dispatchEvent(new Event('input', { bubbles: true }));
      this.close();
    }
  },

  select: {
    upgradeContainer(container) {
      if (!container) return;
      if (typeof window !== 'undefined' && window.SelectPicker && typeof window.SelectPicker.upgradeAllSelects === 'function') {
        window.SelectPicker.upgradeAllSelects(container);
        return;
      }
    }
  },

  upgrade(container) {
    if (typeof window !== 'undefined' && window.CalendarPicker && typeof window.CalendarPicker.init === 'function') {
      window.CalendarPicker.init();
    }
    this.select.upgradeContainer(container);
  }
};

if (typeof window !== 'undefined') {
  window.CamarooControls = CamarooControls;
  try {
    CamarooControls.calendar.init();
  } catch (err) {}
  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select.open').forEach(el => el.classList.remove('open'));
  });
}


