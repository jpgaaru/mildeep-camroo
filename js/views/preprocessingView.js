// Pre-processing Operations View (Standardized with Purchase Base Design System)
import { Toast } from '../components/toast.js';
import { Modal } from '../components/modal.js';

// =========================================================================
// AQUAPULSE / DEVI FISHERIES BASE DESIGN SYSTEM (STANDARDIZED FROM PURCHASE)
// =========================================================================
const UIBase = {
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
        return;
      }
      const popover = document.createElement('div');
      popover.id = 'camaroo-calendar-popover';
      popover.className = 'calendar-popover';
      document.body.appendChild(popover);
      this.popover = popover;
    },

    bindGlobalListeners() {
      document.addEventListener('mousedown', (e) => {
        const dateInput = e.target.closest('input[type="date"], .erp-date-input, [data-calendar]');
        if (dateInput) {
          const isPreproc = dateInput.closest('#preprocessing-content, #preproc-subpage-content, #erp-modal-root');
          if (isPreproc) {
            e.preventDefault();
          }
        }
      });

      document.addEventListener('click', (e) => {
        const dateInput = e.target.closest('input[type="date"], .erp-date-input, [data-calendar]');
        if (dateInput) {
          const isPreproc = dateInput.closest('#preprocessing-content, #preproc-subpage-content, #erp-modal-root');
          if (isPreproc) {
            e.preventDefault();
            e.stopPropagation();
            this.open(dateInput);
            return;
          }
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

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const prevMonthDays = new Date(year, month, 0).getDate();

      const today = new Date();
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
        <div class="calendar-inner">
          <div class="calendar-header">
            <div class="flex items-center gap-1">
              <button type="button" id="cal-prev-year-btn" class="calendar-nav-btn" title="Previous Year">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17-5-5 5-5m7 10-5-5 5-5"/></svg>
              </button>
              <button type="button" id="cal-prev-btn" class="calendar-nav-btn" title="Previous Month">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
            </div>
            
            <div class="calendar-title select-none">
              <span class="cal-month">${monthNames[month]}</span>
              <span class="cal-year font-extrabold text-[#006C7A]">${year}</span>
            </div>

            <div class="flex items-center gap-1">
              <button type="button" id="cal-next-btn" class="calendar-nav-btn" title="Next Month">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
              <button type="button" id="cal-next-year-btn" class="calendar-nav-btn" title="Next Year">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m13 17 5-5-5-5M6 17l5-5-5-5"/></svg>
              </button>
            </div>
          </div>

          <div class="calendar-weekdays">
            <span>SU</span><span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span>
          </div>

          <div class="calendar-days-grid">
            ${daysHtml}
          </div>
        </div>
      `;

      this.popover.querySelector('#cal-prev-year-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.currentDate.setFullYear(this.currentDate.getFullYear() - 1);
        this.render();
      });

      this.popover.querySelector('#cal-next-year-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.currentDate.setFullYear(this.currentDate.getFullYear() + 1);
        this.render();
      });

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

      this.popover.querySelectorAll('[data-calendar-day]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const day = parseInt(btn.getAttribute('data-calendar-day'), 10);
          this.selectDate(year, month, day);
        });
      });
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
      const selects = container.querySelectorAll('select:not([data-camaroo-select])');
      selects.forEach((sel) => {
        if (sel.classList.contains('gt-inline') || sel.closest('table')) return;

        sel.setAttribute('data-camaroo-select', 'true');
        sel.style.display = 'none';

        const wrap = document.createElement('div');
        wrap.className = 'custom-select';

        const selectedOpt = sel.options[sel.selectedIndex] || sel.options[0];
        const initialText = selectedOpt ? selectedOpt.textContent : 'Select...';

        const trigger = document.createElement('div');
        trigger.className = 'custom-select-trigger';
        trigger.setAttribute('tabindex', '0');
        trigger.innerHTML = `
          <span class="custom-select-current"><span>${initialText}</span></span>
          <svg class="custom-select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        `;

        const menu = document.createElement('div');
        menu.className = 'custom-select-menu';
        const list = document.createElement('div');
        list.className = 'custom-select-list';

        Array.from(sel.options).forEach((opt, idx) => {
          const item = document.createElement('div');
          item.className = `custom-select-option ${idx === sel.selectedIndex ? 'selected' : ''}`;
          item.innerHTML = `
            <span>${opt.textContent}</span>
            <svg class="custom-select-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          `;
          item.addEventListener('click', (e) => {
            e.stopPropagation();
            sel.selectedIndex = idx;
            sel.value = opt.value;
            sel.dispatchEvent(new Event('change', { bubbles: true }));
            sel.dispatchEvent(new Event('input', { bubbles: true }));

            trigger.querySelector('.custom-select-current span').textContent = opt.textContent;
            list.querySelectorAll('.custom-select-option').forEach(o => o.classList.remove('selected'));
            item.classList.add('selected');
            wrap.classList.remove('open');
          });
          list.appendChild(item);
        });

        menu.appendChild(list);
        wrap.appendChild(trigger);
        wrap.appendChild(menu);

        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = wrap.classList.contains('open');
          document.querySelectorAll('.custom-select.open').forEach(el => el.classList.remove('open'));
          if (!isOpen) {
            wrap.classList.add('open');
          }
        });

        sel.addEventListener('change', () => {
          const opt = sel.options[sel.selectedIndex];
          if (opt) {
            trigger.querySelector('.custom-select-current span').textContent = opt.textContent;
            list.querySelectorAll('.custom-select-option').forEach((o, i) => {
              o.classList.toggle('selected', i === sel.selectedIndex);
            });
          }
        });

        sel.parentNode.insertBefore(wrap, sel.nextSibling);
      });
    }
  },

  upgrade(container) {
    this.calendar.init();
    this.select.upgradeContainer(container);
  }
};

if (typeof window !== 'undefined') {
  window.CamarooControls = CamarooControls;
  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select.open').forEach(el => el.classList.remove('open'));
  });
}


export const PreprocessingView = {
  // Baseline Preprocessing Store Data
  chemicalPosList: [
    { id: "CPO-01", sNo: 1, supplierName: "KPL INTERNATIONAL LTD", poNo: "DFL/KPL/2627/004", poDate: "06-10-2026", chemicals: "ALTESA NEO S100 (NP)", portName: "INPRT - PARADIP GARH", modeOfImport: "HSS", qtyBags: 320, qtyKgs: 6400, totalAmount: 1152000, etdDate: "15-10-2026", etaDate: "28-10-2026", remarks: "Bonded clearance required", status: "Approved" },
    { id: "CPO-02", sNo: 2, supplierName: "ADWIK IMPEX", poNo: "DFL//2627/003", poDate: "25-09-2026", chemicals: "CARNAL 659 S ADVANCED (STPP)", portName: "INKAK1 - KAKINADA", modeOfImport: "HSS", qtyBags: 240, qtyKgs: 4800, totalAmount: 868800, etdDate: "30-09-2026", etaDate: "29-10-2026", remarks: "Sea shipment in transit", status: "In Transit" },
    { id: "CPO-03", sNo: 3, supplierName: "KPL INTERNATIONAL LTD", poNo: "DFL/KPL/2627/003", poDate: "07-09-2026", chemicals: "ALTESA NEO S100 (NP)", portName: "INKAK1 - KAKINADA", modeOfImport: "HSS_BOND", qtyBags: 240, qtyKgs: 4800, totalAmount: 868800, etdDate: "10-09-2026", etaDate: "25-09-2026", remarks: "Cleared at port warehouse", status: "Received" },
    { id: "CPO-04", sNo: 4, supplierName: "PRAYON PHOSPHATES", poNo: "DFL/PP/2627/002", poDate: "18-08-2026", chemicals: "CARFOSEL B 940 (STPP)", portName: "INVTZ1 - VISAKHAPATNAM", modeOfImport: "DIRECT", qtyBags: 400, qtyKgs: 10000, totalAmount: 1650000, etdDate: "25-08-2026", etaDate: "15-09-2026", remarks: "Standard quality approved", status: "Received" },
    { id: "CPO-05", sNo: 5, supplierName: "ICL FOOD SPECIALTIES", poNo: "DFL/ICL/2627/001", poDate: "02-08-2026", chemicals: "BEKAPLUS FS (BLEND)", portName: "INKAK1 - KAKINADA", modeOfImport: "HSS_BOND", qtyBags: 180, qtyKgs: 4500, totalAmount: 945000, etdDate: "08-08-2026", etaDate: "22-08-2026", remarks: "Stored in temp-controlled store", status: "Received" }
  ],

  receivedChemicalsList: [
    { id: "RC-01", sNo: 1, poNo: "DFL/BC/2526/008", chemical: "CARFOSEL B 940 (STPP)", blNo: "DFL/BC/2526/02", containerNo: "DFL/BC/2526/02", receivedBags: 787, receivedQty: 19675, boeNo: "DFL/BC/2526/02", boeDate: "02-08-2025", clearedDate: "02-08-2025", balanceBags: 13, balanceQty: 325, status: "Pending" },
    { id: "RC-02", sNo: 2, poNo: "DFL/KPL/2526/003", chemical: "ALTESA BT2 (NP)", blNo: "2195420", containerNo: "2195420", receivedBags: 1080, receivedQty: 21600, boeNo: "2195420", boeDate: "21-05-2025", clearedDate: "23-05-2025", balanceBags: 800, balanceQty: 20000, status: "Pending" },
    { id: "RC-03", sNo: 3, poNo: "DFL/CFB/2425/003", chemical: "CARNAL 659 S ADVANCED (STPP)", blNo: "250506660011", containerNo: "CARNAL1-9, TGCU2314437", receivedBags: 3200, receivedQty: 80000, boeNo: "2141353", boeDate: "19-05-2025", clearedDate: "27-05-2025", balanceBags: 1600, balanceQty: 40000, status: "Pending" },
    { id: "RC-04", sNo: 4, poNo: "DFL/ICL/2627/001", chemical: "BEKAPLUS FS (BLEND)", blNo: "ICL-984421", containerNo: "MSCU8812903", receivedBags: 180, receivedQty: 4500, boeNo: "BOE-778210", boeDate: "14-08-2026", clearedDate: "20-08-2026", balanceBags: 0, balanceQty: 0, status: "Completed" }
  ],

  chemicalsConsumptionList: [
    { id: "CC-01", sNo: 1, date: "2026-10-14", plant: "DFL UNIT-5 (JPT)", chemical: "CARNAL 659 S ADVANCED (STPP)", openingBags: 1720, openingKgs: 43000, receivedBags: 50, receivedKgs: 1250, consumedBags: 49, consumedKgs: 1225, closingBags: 1721, closingKgs: 43025, batchCode: "VM-JPT-089", supervisor: "K. Venkata Vinay", status: "Verified" },
    { id: "CC-02", sNo: 2, date: "2026-10-14", plant: "DFL UNIT-1 (VSP)", chemical: "ALTESA NEO S100 (NP)", openingBags: 890, openingKgs: 17800, receivedBags: 0, receivedKgs: 0, consumedBags: 30, consumedKgs: 600, closingBags: 860, closingKgs: 17200, batchCode: "VM-VSP-112", supervisor: "T. Venkatesh", status: "Verified" },
    { id: "CC-03", sNo: 3, date: "2026-10-13", plant: "DFL UNIT-2 (KKD)", chemical: "CARFOSEL B 940 (STPP)", openingBags: 640, openingKgs: 16000, receivedBags: 100, receivedKgs: 2500, consumedBags: 62, consumedKgs: 1550, closingBags: 678, closingKgs: 16950, batchCode: "BT-KKD-044", supervisor: "D. Surya Narayana", status: "Verified" }
  ],

  chemicalReceivedReportsList: [
    { id: "CRR-01", sNo: 1, month: "October 2026", plant: "DFL UNIT-1 (VSP)", chemical: "ALTESA NEO S100 (NP)", totalBags: 240, totalKgs: 4800, avgRatePerKg: 181, totalCostInr: 868800, supplier: "KPL INTERNATIONAL LTD" },
    { id: "CRR-02", sNo: 2, month: "October 2026", plant: "DFL UNIT-5 (JPT)", chemical: "CARNAL 659 S ADVANCED (STPP)", totalBags: 320, totalKgs: 8000, avgRatePerKg: 195, totalCostInr: 1560000, supplier: "ADWIK IMPEX" },
    { id: "CRR-03", sNo: 3, month: "September 2026", plant: "DFL UNIT-2 (KKD)", chemical: "CARFOSEL B 940 (STPP)", totalBags: 400, totalKgs: 10000, avgRatePerKg: 165, totalCostInr: 1650000, supplier: "PRAYON PHOSPHATES" }
  ],

  chemicalOpeningBalancesList: [
    { id: "COB-01", sNo: 1, plant: "DFL UNIT-1 (VSP)", chemical: "ALTESA NEO S100 (NP)", uom: "KGS", openingBags: 890, openingKgs: 17800, valuationRate: 181, totalValuation: 3221800, auditDate: "2026-10-01" },
    { id: "COB-02", sNo: 2, plant: "DFL UNIT-2 (KKD)", chemical: "CARFOSEL B 940 (STPP)", uom: "KGS", openingBags: 640, openingKgs: 16000, valuationRate: 165, totalValuation: 2640000, auditDate: "2026-10-01" },
    { id: "COB-03", sNo: 3, plant: "DFL UNIT-5 (JPT)", chemical: "CARNAL 659 S ADVANCED (STPP)", uom: "KGS", openingBags: 1720, openingKgs: 43000, valuationRate: 195, totalValuation: 8385000, auditDate: "2026-10-01" }
  ],

  chemicalBalanceReportsList: [
    { id: "CBR-01", sNo: 1, plant: "DFL UNIT-1 (VSP)", chemical: "ALTESA NEO S100 (NP)", openingStock: 17800, receipts: 4800, consumption: 5400, transferOut: 0, closingStock: 17200, reorderLevel: 5000, stockStatus: "Adequate" },
    { id: "CBR-02", sNo: 2, plant: "DFL UNIT-5 (JPT)", chemical: "CARNAL 659 S ADVANCED (STPP)", openingStock: 43000, receipts: 8000, consumption: 7975, transferOut: 0, closingStock: 43025, reorderLevel: 10000, stockStatus: "Adequate" },
    { id: "CBR-03", sNo: 3, plant: "DFL UNIT-2 (KKD)", chemical: "CARFOSEL B 940 (STPP)", openingStock: 16000, receipts: 2500, consumption: 1550, transferOut: 0, closingStock: 16950, reorderLevel: 4000, stockStatus: "Adequate" }
  ],

  chemicalPaymentsList: [
    { id: "CPAY-01", sNo: 1, voucherNo: "CH-PAY-26-081", supplierName: "KPL INTERNATIONAL LTD", invoiceNo: "INV-KPL-8819", poNo: "DFL/KPL/2627/003", invoiceAmount: 868800, tdsAmount: 868, netPaid: 867932, paymentDate: "2026-10-05", bankAccount: "HDFC Bank - 0021 (Main)", paymentMode: "RTGS", status: "Settled" },
    { id: "CPAY-02", sNo: 2, voucherNo: "CH-PAY-26-082", supplierName: "ADWIK IMPEX", invoiceNo: "INV-ADW-4421", poNo: "DFL//2627/003", invoiceAmount: 868800, tdsAmount: 868, netPaid: 867932, paymentDate: "2026-10-10", bankAccount: "SBI Bank - 9940 (Commercial)", paymentMode: "NEFT", status: "Settled" },
    { id: "CPAY-03", sNo: 3, voucherNo: "CH-PAY-26-083", supplierName: "PRAYON PHOSPHATES", invoiceNo: "INV-PP-1092", poNo: "DFL/PP/2627/002", invoiceAmount: 1650000, tdsAmount: 1650, netPaid: 1648350, paymentDate: "2026-09-28", bankAccount: "Axis Bank - 4410 (Export)", paymentMode: "RTGS", status: "Settled" }
  ],

  rmReceivedList: [
    { id: "RMR-01", sNo: 1, inwardNo: "INW-2026-1089", arrivalDate: "2026-10-14", lotCode: "VM-VSP-AMP-056", plant: "DFL UNIT-1 (VSP)", species: "Vannamei Shrimp", receivedWeight: 4250, crates: 170, tempC: 1.2, grader: "B. Venkatesh", status: "Accepted" },
    { id: "RMR-02", sNo: 2, inwardNo: "INW-2026-1090", arrivalDate: "2026-10-14", lotCode: "BT-KKD-MKP-043", plant: "DFL UNIT-2 (KKD)", species: "Black Tiger Shrimp", receivedWeight: 3180, crates: 128, tempC: 0.9, grader: "K. Ramu", status: "Accepted" },
    { id: "RMR-03", sNo: 3, inwardNo: "INW-2026-1091", arrivalDate: "2026-10-14", lotCode: "VM-PSP-BVR-078", plant: "DFL UNIT-3 (PSP)", species: "Vannamei Shrimp", receivedWeight: 5600, crates: 224, tempC: 1.5, grader: "M. Nagesh", status: "Accepted" }
  ],

  deheadingLogsList: [
    {
      id: "DH-01",
      sNo: 1,
      arrivalDate: "2026-10-23",
      lotCode: "VM-VSP-AMP-056",
      plant: "DFL UNIT-1 (VSP)",
      center: "Own Center",
      station: "Own Center",
      deheadingDate: "2026-10-23",
      date: "2026-10-23",
      shift: "A SHIFT",
      supervisor: "K VENKATA VINAY",
      checkingCount2: 48,
      hlCount: 32,
      honCount: 48,
      honQty: 4250,
      headonWeight: 4250,
      hlQty: 2847.5,
      deheadedWeight: 2847.5,
      countNetYield: 66.8,
      yieldPct: 67.0,
      iceConsumption: 450,
      iceKgs: 450,
      sampleYield: 67.2,
      remarks: "Batch processed within HACCP temp specs",
      status: "Completed"
    },
    {
      id: "DH-02",
      sNo: 2,
      arrivalDate: "2026-10-23",
      lotCode: "BT-KKD-MKP-043",
      plant: "DFL UNIT-2 (KKD)",
      center: "Center 2",
      station: "Center 2",
      deheadingDate: "2026-10-23",
      date: "2026-10-23",
      shift: "B SHIFT",
      supervisor: "T.VENKATESH",
      checkingCount2: 52,
      hlCount: 36,
      honCount: 52,
      honQty: 3180,
      headonWeight: 3180,
      hlQty: 2067.0,
      deheadedWeight: 2067.0,
      countNetYield: 64.9,
      yieldPct: 65.0,
      iceConsumption: 320,
      iceKgs: 320,
      sampleYield: 65.5,
      remarks: "Cold-chain maintained at 1.8C",
      status: "Completed"
    },
    {
      id: "DH-03",
      sNo: 3,
      arrivalDate: "2026-10-22",
      lotCode: "VM-PSP-BVR-078",
      plant: "DFL UNIT-3 (PSP)",
      center: "Outside Center",
      station: "Outside Center",
      deheadingDate: "2026-10-23",
      date: "2026-10-23",
      shift: "A SHIFT",
      supervisor: "D.SURYA NARAYANA",
      checkingCount2: 44,
      hlCount: 28,
      honCount: 44,
      honQty: 5600,
      headonWeight: 5600,
      hlQty: 3808.0,
      deheadedWeight: 3808.0,
      countNetYield: 67.9,
      yieldPct: 68.0,
      iceConsumption: 600,
      iceKgs: 600,
      sampleYield: 68.2,
      remarks: "High grade HLSO yield",
      status: "Completed"
    }
  ],

  gradingLogsList: [
    {
      id: "GR-01",
      sNo: 1,
      transactionDate: "23-03-2025",
      date: "2025-03-23",
      arrivalDate: "2025-03-23",
      lotCode: "SKM/2425/1755",
      plant: "DFL UNIT-6 [JPT-II]",
      center: "",
      station: "Own Center",
      gradingMachine: "Unit -6 Laitram Grading Machine",
      startTime: "",
      endTime: "",
      breakTime: "",
      variety: "VM-HLSO",
      hlCount: "18.00",
      dominantCount: "18.00",
      hlWeight: "1.00",
      gradedWeight: 1.00,
      noOfCrates: 1,
      remarks: "",
      status: "Approved"
    },
    {
      id: "GR-02",
      sNo: 2,
      transactionDate: "23-03-2025",
      date: "2025-03-23",
      arrivalDate: "2025-03-23",
      lotCode: "SKM/2425/1755",
      plant: "DFL UNIT-6 [JPT-II]",
      center: "",
      station: "Own Center",
      gradingMachine: "Unit -6 Laitram Grading Machine",
      startTime: "",
      endTime: "",
      breakTime: "",
      variety: "VM-HLSO",
      hlCount: "23.00",
      dominantCount: "23.00",
      hlWeight: "347.00",
      gradedWeight: 347.00,
      noOfCrates: 13,
      remarks: "",
      status: "Approved"
    },
    {
      id: "GR-03",
      sNo: 3,
      transactionDate: "23-03-2025",
      date: "2025-03-23",
      arrivalDate: "2025-03-23",
      lotCode: "SKM/2425/1755",
      plant: "DFL UNIT-6 [JPT-II]",
      center: "",
      station: "Own Center",
      gradingMachine: "Unit -6 Laitram Grading Machine",
      startTime: "",
      endTime: "",
      breakTime: "",
      variety: "VM-HLSO",
      hlCount: "28.00",
      dominantCount: "28.00",
      hlWeight: "989.00",
      gradedWeight: 989.00,
      noOfCrates: 37,
      remarks: "",
      status: "Approved"
    },
    {
      id: "GR-04",
      sNo: 4,
      transactionDate: "23-03-2025",
      date: "2025-03-23",
      arrivalDate: "2025-03-23",
      lotCode: "SKM/2425/1755",
      plant: "DFL UNIT-6 [JPT-II]",
      center: "",
      station: "Own Center",
      gradingMachine: "Unit -6 Laitram Grading Machine",
      startTime: "",
      endTime: "",
      breakTime: "",
      variety: "VM-HLSO",
      hlCount: "34.00",
      dominantCount: "34.00",
      hlWeight: "694.00",
      gradedWeight: 694.00,
      noOfCrates: 26,
      remarks: "",
      status: "Approved"
    }
  ],

  valueAdditionList: [
    { id: "VA-01", sNo: 1, date: "2026-10-14", plant: "DFL UNIT-1 (VSP)", processType: "P&D (Peeled & Deveined)", batchCode: "VA-VM-098", inputWeight: 1500, outputWeight: 1230, recoveryPct: 82.0, supervisor: "K. Venkata Vinay", status: "Passed QC" },
    { id: "VA-02", sNo: 2, date: "2026-10-14", plant: "DFL UNIT-2 (KKD)", processType: "PTO (Peeled Tail On)", batchCode: "VA-BT-044", inputWeight: 1200, outputWeight: 1044, recoveryPct: 87.0, supervisor: "T. Venkatesh", status: "Passed QC" },
    { id: "VA-03", sNo: 3, date: "2026-10-13", plant: "DFL UNIT-5 (JPT)", processType: "Cooked Tail-On", batchCode: "VA-CK-012", inputWeight: 2000, outputWeight: 1780, recoveryPct: 89.0, supervisor: "D. Surya Narayana", status: "Passed QC" }
  ],

  honTransferList: [
    { id: "HT-01", sNo: 1, transferId: "HT-2026-041", date: "2026-10-14", fromPlant: "DFL UNIT-1 (VSP)", toPlant: "DFL UNIT-3 (PSP)", variety: "Vannamei Shrimp", weightKg: 2400, vehicleNo: "AP31TT4177", driverName: "R. Apparao", status: "In Transit" },
    { id: "HT-02", sNo: 2, transferId: "HT-2026-042", date: "2026-10-13", fromPlant: "DFL UNIT-2 (KKD)", toPlant: "DFL UNIT-5 (JPT)", variety: "Black Tiger Shrimp", weightKg: 1800, vehicleNo: "AP05X9921", driverName: "K. Simhachalam", status: "Delivered" }
  ],

  traceReportsList: [
    { id: "TR-01", sNo: 1, batchCode: "VM-VSP-AMP-056", farmerName: "K. Srinivasa Rao", pondNo: "Pond 4A", harvestDate: "2026-10-14", intakeWeight: 4250, deheadedWeight: 2847.5, gradedWeight: 2840, packedWeight: 2800, totalYieldPct: 65.88, status: "Traceable" },
    { id: "TR-02", sNo: 2, batchCode: "BT-KKD-MKP-043", farmerName: "G. Venkateswarlu", pondNo: "Pond 12", harvestDate: "2026-10-14", intakeWeight: 3180, deheadedWeight: 2067.0, gradedWeight: 2060, packedWeight: 2020, totalYieldPct: 63.52, status: "Traceable" },
    { id: "TR-03", sNo: 3, batchCode: "VM-PSP-BVR-078", farmerName: "M. Satyanarayana", pondNo: "Pond 2B", harvestDate: "2026-10-13", intakeWeight: 5600, deheadedWeight: 3808.0, gradedWeight: 3795, packedWeight: 3740, totalYieldPct: 66.78, status: "Traceable" }
  ],

  render(containerId, subPage = 'overview', activeHash = '#/preprocessing/dashboard/overview') {
    const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!container) return;

    this.updateHeaderAction(subPage);

    container.innerHTML = `
      <div id="preprocessing-tab-bar-container"></div>
      <div id="preproc-subpage-content" class="w-full"></div>
    `;

    if (typeof TabBar !== 'undefined' && typeof TabBar.render === 'function') {
      TabBar.render('preprocessing-tab-bar-container', activeHash);
    }
    const subContainer = document.getElementById('preproc-subpage-content');
    if (!subContainer) return;

    switch (subPage) {
      // 1. Dashboard
      case 'overview':
      case 'floor-overview':
        this.renderFloorOverview(subContainer);
        break;

      // 2. Floor Operations
      case 'rm-received':
        this.renderRmReceived(subContainer);
        break;
      case 'deheading':
        this.renderDeheading(subContainer);
        break;
      case 'grading':
        this.renderGrading(subContainer);
        break;
      case 'deheading-trackid':
        this.renderDeheadingTrackid(subContainer);
        break;
      case 'grading-trackid':
        this.renderGradingTrackid(subContainer);
        break;
      case 'value-addition':
        this.renderValueAddition(subContainer);
        break;
      case 'hon-qty-transfer':
        this.renderHonQtyTransfer(subContainer);
        break;

      // 3. Chemical Inventory & Usage
      case 'chemical-pos':
        this.renderChemicalPos(subContainer);
        break;
      case 'received-chemicals':
        this.renderReceivedChemicals(subContainer);
        break;
      case 'chemicals-consumption':
        this.renderChemicalsConsumption(subContainer);
        break;
      case 'chemical-received-report':
        this.renderChemicalReceivedReport(subContainer);
        break;
      case 'chemical-opening-balance':
        this.renderChemicalOpeningBalance(subContainer);
        break;
      case 'chemical-balance-report':
        this.renderChemicalBalanceReport(subContainer);
        break;
      case 'chemical-payments-list':
        this.renderChemicalPaymentsList(subContainer);
        break;

      // 4. Traceability & Reconciliation
      case 'track-code-report':
        this.renderTrackCodeReport(subContainer);
        break;
      case 'va-floor-balance':
        this.renderVaFloorBalance(subContainer);
        break;
      case 'va-transfer':
        this.renderVaTransfer(subContainer);
        break;
      case 'assumed-reports':
        this.renderAssumedReports(subContainer);
        break;
      case 'consolidation-daily':
        this.renderConsolidationDaily(subContainer);
        break;
      case 'file-upload':
        this.renderFileUpload(subContainer);
        break;

      default:
        this.renderFloorOverview(subContainer);
        break;
    }

    CamarooControls.upgrade(subContainer);
    if (typeof window !== 'undefined' && window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  },

  updateHeaderAction(subPage) {
    const actionContainer = document.getElementById('section-action-btn-container');
    if (actionContainer) actionContainer.innerHTML = '';
  },

  // ============================================
  // 1. FLOOR OVERVIEW & COMPREHENSIVE TELEMETRY DASHBOARD
  // ============================================
  renderFloorOverview(container) {
    let fPlant = '';
    let fPeriod = 'Today';
    let fSpecies = '';

    const updateDashboard = () => {
      // Calculate dynamic telemetry
      const multiplier = fPeriod === 'This Week' ? 6.2 : fPeriod === 'Month to Date' ? 24.5 : 1.0;
      const baseIntake = 13030.0 * multiplier;
      const baseDeheaded = 8722.5 * multiplier;
      const baseGraded = 8695.0 * multiplier;
      const baseVa = 5840.0 * multiplier;
      const baseHonTransfer = 4200.0 * multiplier;
      const baseChemValue = (1.42 * (fPeriod === 'Today' ? 1.0 : 1.15)).toFixed(2);
      const yieldPct = ((baseDeheaded / baseIntake) * 100).toFixed(1);

      const kpiContainer = document.getElementById('preproc-kpi-grid');
      if (kpiContainer) {
        kpiContainer.innerHTML = `
          <!-- 1. RM Intake -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-lg flex items-center justify-center bg-[#F0FAFC] border border-[#B2ECF3] text-[#02a8b5]">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                </span>
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">Today RM Intake</span>
              </div>
              <span class="text-[10px] text-[#02a8b5] font-bold bg-[#F0FAFC] px-1.5 py-0.5 rounded">3 Plants</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0F172A]">${baseIntake.toLocaleString('en-IN', { maximumFractionDigits: 1 })} <span class="text-xs font-semibold text-[#64748B]">KG</span></span>
              <span class="text-[11px] font-bold text-[#006644] flex items-center gap-0.5">↑ 12.4%</span>
            </div>
          </div>

          <!-- 2. Deheaded Recovery -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-lg flex items-center justify-center bg-[#E3FCEF] border border-[#A8E7C3] text-[#006644]">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>
                </span>
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">Deheaded Recovery</span>
              </div>
              <span class="text-[10px] text-[#006644] font-bold bg-[#E3FCEF] px-1.5 py-0.5 rounded">${yieldPct}% Yield</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#006644]">${baseDeheaded.toLocaleString('en-IN', { maximumFractionDigits: 1 })} <span class="text-xs font-semibold text-[#64748B]">KG</span></span>
              <span class="text-[11px] font-bold text-[#006644]">Benchmark ≥ 65%</span>
            </div>
          </div>

          <!-- 3. Graded HLSO -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-lg flex items-center justify-center bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7]">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
                </span>
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">Graded HLSO</span>
              </div>
              <span class="text-[10px] text-[#0284C7] font-bold bg-[#F0F9FF] px-1.5 py-0.5 rounded">16/20 Dominant</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0284C7]">${baseGraded.toLocaleString('en-IN', { maximumFractionDigits: 1 })} <span class="text-xs font-semibold text-[#64748B]">KG</span></span>
              <span class="text-[11px] font-bold text-[#0284C7]">99.7% Sized</span>
            </div>
          </div>

          <!-- 4. Value Addition Output -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-lg flex items-center justify-center bg-[#FFF9E6] border border-[#F7DA94] text-[#8F4D00]">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                </span>
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">Value Addition Output</span>
              </div>
              <span class="text-[10px] text-[#8F4D00] font-bold bg-[#FFF0B3] px-1.5 py-0.5 rounded">Nobashi / EZ</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0F172A]">${baseVa.toLocaleString('en-IN', { maximumFractionDigits: 1 })} <span class="text-xs font-semibold text-[#64748B]">KG</span></span>
              <span class="text-[11px] font-bold text-[#8F4D00]">67.2% Direct</span>
            </div>
          </div>

          <!-- 5. HON Qty Transfer -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-lg flex items-center justify-center bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5]">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                </span>
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">HON Transfer After VA</span>
              </div>
              <span class="text-[10px] text-[#02a8b5] font-bold bg-[#F0FAFC] px-1.5 py-0.5 rounded">To Freezers</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0F172A]">${baseHonTransfer.toLocaleString('en-IN', { maximumFractionDigits: 1 })} <span class="text-xs font-semibold text-[#64748B]">KG</span></span>
              <span class="text-[11px] font-bold text-[#02a8b5]">Dispatched</span>
            </div>
          </div>

          <!-- 6. Chemical Inventory -->
          <div class="p-4 bg-white rounded-xl border border-[#DFE1E6] shadow-xs hover:border-[#02a8b5] transition-all">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-lg flex items-center justify-center bg-[#F0FAFC] border border-[#B2ECF3] text-[#02a8b5]">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                </span>
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84]">Chemical Inventory</span>
              </div>
              <span class="text-[10px] text-[#006644] font-bold bg-[#E3FCEF] px-1.5 py-0.5 rounded">Stock Stable</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0F172A]">₹ ${baseChemValue} <span class="text-xs font-semibold text-[#64748B]">Cr</span></span>
              <span class="text-[11px] font-bold text-[#006644]">342.5 KG Today</span>
            </div>
          </div>
        `;
      }
    };

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- 1. Header with Title & Action Controls -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-1">
          <div>
            <h1 class="text-xl font-extrabold text-[#172B4D] tracking-tight">Overview</h1>
          </div>
          <div class="flex items-center gap-2">
            <button class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="(window.PreprocessingView || PreprocessingView).openChemPOModal()">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Create Chemical PO</span>
            </button>
            <button class="px-3.5 py-2 bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.Toast.show('Exporting Pre-Processing Summary Report to Excel...', 'info')">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              <span>Export Report</span>
            </button>
          </div>
        </div>

        <!-- 2. Quick Filter Bar -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-3.5 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-end">
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Plant Location</label>
              <select id="preproc-dash-plant" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded-lg font-semibold text-[#0F172A] focus:outline-none focus:border-[#02a8b5]">
                <option value="">All Processing Units</option>
                <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Date Period</label>
              <select id="preproc-dash-period" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded-lg font-semibold text-[#0F172A] focus:outline-none focus:border-[#02a8b5]">
                <option value="Today" selected>Today (Shift A/B)</option>
                <option value="This Week">This Week (Mon-Sun)</option>
                <option value="Month to Date">Month to Date (October 2026)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">Species Filter</label>
              <select id="preproc-dash-species" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded-lg font-semibold text-[#0F172A] focus:outline-none focus:border-[#02a8b5]">
                <option value="">All Raw Materials</option>
                <option value="LITOPENAEUS VANNAMEI">LITOPENAEUS VANNAMEI</option>
                <option value="PENAEUS MONODON">PENAEUS MONODON</option>
                <option value="COD">COD</option>
              </select>
            </div>
            <div class="flex items-center gap-2">
              <button id="preproc-dash-apply-btn" class="flex-1 py-1.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter</span>
              </button>
              <button id="preproc-dash-reset-btn" class="px-3.5 py-1.5 bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer">
                ↺
              </button>
            </div>
          </div>
        </div>

        <!-- 3. 6 KPI Metric Cards Grid -->
        <div id="preproc-kpi-grid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"></div>

        <!-- 4. Data Visualizations Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Chart 1: Volume & Throughput Trend -->
          <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#02a8b5]"></span>
                <h3 class="text-xs font-bold text-[#172B4D]">Weekly Pre-Processing Throughput Trend (KG)</h3>
              </div>
              <span class="text-[11px] font-bold text-[#006644] bg-[#E3FCEF] px-2 py-0.5 rounded">Target: 12,000 KG / Day</span>
            </div>
            <div class="h-60 relative">
              <canvas id="productionChart" class="w-full h-full"></canvas>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-[#F1F5F9] text-[11px] text-[#64748B]">
              <span>Highest Peak: <strong>14,200 KG (Fri)</strong></span>
              <span>Average Daily Run: <strong>12,575 KG</strong></span>
            </div>
          </div>

          <!-- Chart 2: Yield Recovery by Size Grade -->
          <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#0284C7]"></span>
                <h3 class="text-xs font-bold text-[#172B4D]">Recovery Yield Breakdown by Grade (%)</h3>
              </div>
              <span class="text-[11px] font-bold text-[#006644] bg-[#E3FCEF] px-2 py-0.5 rounded">Benchmark ≥ 65%</span>
            </div>
            <div class="h-60 relative">
              <canvas id="yieldChart" class="w-full h-full"></canvas>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-[#F1F5F9] text-[11px] text-[#64748B]">
              <span>Optimal Yield: <strong>16/20 @ 68.5%</strong></span>
              <span>Weighted Floor Avg: <strong>66.9%</strong></span>
            </div>
          </div>
        </div>

        <!-- 5. Secondary Data Cards: Stage Flow Telemetry & Chemical Inventory Matrix -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Flow Telemetry Card -->
          <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <h3 class="text-xs font-bold text-[#172B4D]">Floor Flow & Process Stage Conversion</h3>
              <span class="text-[11px] text-[#5E6C84]">Shift A Telemetry</span>
            </div>
            <div class="space-y-3">
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-[#0F172A]">1. Raw Intake Received</span>
                  <span class="text-[#02a8b5]">13,030 KG (100%)</span>
                </div>
                <div class="w-full bg-[#F1F5F9] rounded-full h-2">
                  <div class="bg-[#02a8b5] h-2 rounded-full" style="width: 100%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-[#0F172A]">2. Deheaded Meat Output</span>
                  <span class="text-[#006644]">8,722.5 KG (66.9% Recovery)</span>
                </div>
                <div class="w-full bg-[#F1F5F9] rounded-full h-2">
                  <div class="bg-[#006644] h-2 rounded-full" style="width: 66.9%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-[#0F172A]">3. Roller Graded & Sized</span>
                  <span class="text-[#0284C7]">8,695 KG (99.7% Sizing Accuracy)</span>
                </div>
                <div class="w-full bg-[#F1F5F9] rounded-full h-2">
                  <div class="bg-[#0284C7] h-2 rounded-full" style="width: 66.7%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-[#0F172A]">4. Value Addition Allocated</span>
                  <span class="text-[#8F4D00]">5,840 KG (67.2% Direct VA)</span>
                </div>
                <div class="w-full bg-[#F1F5F9] rounded-full h-2">
                  <div class="bg-[#8F4D00] h-2 rounded-full" style="width: 44.8%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-[#0F172A]">5. HON Freezer Transfer Dispatched</span>
                  <span class="text-[#02a8b5]">4,200 KG (Packed & Dispatched)</span>
                </div>
                <div class="w-full bg-[#F1F5F9] rounded-full h-2">
                  <div class="bg-[#02a8b5] h-2 rounded-full" style="width: 32.2%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Chemical Bath Matrix Card -->
          <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
            <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECF0]">
              <h3 class="text-xs font-bold text-[#172B4D]">Active Chemical Bath Dosage & Stock Balance</h3>
              <a href="#/preprocessing/chemical-screens/chemical-pos" class="text-[11px] font-bold text-[#02a8b5] hover:underline">View Chemical Pos →</a>
            </div>
            <div class="space-y-3">
              <div class="p-2.5 bg-[#FAFBFC] rounded-lg border border-[#EBECF0] flex items-center justify-between">
                <div>
                  <span class="text-xs font-bold text-[#0F172A]">ALTESA NEO S100 (NP)</span>
                  <span class="text-[11px] text-[#64748B] block">Non-phosphate treatment bath · Unit-1 (VSP)</span>
                </div>
                <div class="text-right">
                  <span class="text-xs font-extrabold text-[#0F172A]">1,250 KG Stock</span>
                  <span class="text-[11px] text-[#006644] font-semibold block">Dosed: 85 KG</span>
                </div>
              </div>
              <div class="p-2.5 bg-[#FAFBFC] rounded-lg border border-[#EBECF0] flex items-center justify-between">
                <div>
                  <span class="text-xs font-bold text-[#0F172A]">CARNAL 659 S ADVANCED (STPP)</span>
                  <span class="text-[11px] text-[#64748B] block">Standard moisture retention · Unit-5 (JPT)</span>
                </div>
                <div class="text-right">
                  <span class="text-xs font-extrabold text-[#0F172A]">920 KG Stock</span>
                  <span class="text-[11px] text-[#006644] font-semibold block">Dosed: 120 KG</span>
                </div>
              </div>
              <div class="p-2.5 bg-[#FAFBFC] rounded-lg border border-[#EBECF0] flex items-center justify-between">
                <div>
                  <span class="text-xs font-bold text-[#0F172A]">CARFOSEL B 940 (STPP)</span>
                  <span class="text-[11px] text-[#64748B] block">Export grade soaking line · Unit-2 (KKD)</span>
                </div>
                <div class="text-right">
                  <span class="text-xs font-extrabold text-[#0F172A]">1,580 KG Stock</span>
                  <span class="text-[11px] text-[#006644] font-semibold block">Dosed: 95 KG</span>
                </div>
              </div>
              <div class="p-2.5 bg-[#FAFBFC] rounded-lg border border-[#EBECF0] flex items-center justify-between">
                <div>
                  <span class="text-xs font-bold text-[#0F172A]">BEKAPLUS FS (BLEND)</span>
                  <span class="text-[11px] text-[#64748B] block">Specialty glaze preservation · Temp Controlled</span>
                </div>
                <div class="text-right">
                  <span class="text-xs font-extrabold text-[#0F172A]">640 KG Stock</span>
                  <span class="text-[11px] text-[#006644] font-semibold block">Dosed: 42.5 KG</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 6. Active Plant-Wise Pre-Processing Floor Telemetry Table -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#EBECF0]">
            <div>
              <h3 class="text-xs font-bold text-[#172B4D]">Plant-Wise Floor Operations & Intake Batch Telemetry</h3>
              <p class="text-[11px] text-[#5E6C84]">Active lines across Visakhapatnam, Kakinada, and Pasarlapudi facilities</p>
            </div>
            <span class="text-xs font-bold text-[#02a8b5] bg-[#F0FAFC] px-2.5 py-1 rounded-lg border border-[#02a8b5]/20">3 Plants Active</span>
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th class="px-4 py-3">Plant Facility</th>
                  <th class="px-4 py-3">Raw Intake (KG)</th>
                  <th class="px-4 py-3">Deheaded Output (KG)</th>
                  <th class="px-4 py-3">Recovery Yield (%)</th>
                  <th class="px-4 py-3">Graded Output (KG)</th>
                  <th class="px-4 py-3">Value Addition (KG)</th>
                  <th class="px-4 py-3">Chemical Bath</th>
                  <th class="px-4 py-3">Line Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9]">
                <tr class="hover:bg-[#F8FAFC] transition-colors">
                  <td class="px-4 py-3 font-bold text-[#0F172A]">DFL UNIT-1 (VSP)</td>
                  <td class="px-4 py-3 font-semibold text-[#0F172A]">4,800.0</td>
                  <td class="px-4 py-3 font-semibold text-[#006644]">3,216.0</td>
                  <td class="px-4 py-3 font-bold text-[#006644]">67.0%</td>
                  <td class="px-4 py-3 text-[#0F172A]">3,205.0</td>
                  <td class="px-4 py-3 text-[#0F172A]">2,150.0</td>
                  <td class="px-4 py-3 text-[#64748B]">ALTESA NEO S100</td>
                  <td class="px-4 py-3"><span class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#E3FCEF] text-[#006644]">Running</span></td>
                </tr>
                <tr class="hover:bg-[#F8FAFC] transition-colors">
                  <td class="px-4 py-3 font-bold text-[#0F172A]">DFL UNIT-2 (KKD)</td>
                  <td class="px-4 py-3 font-semibold text-[#0F172A]">5,230.0</td>
                  <td class="px-4 py-3 font-semibold text-[#006644]">3,498.9</td>
                  <td class="px-4 py-3 font-bold text-[#006644]">66.9%</td>
                  <td class="px-4 py-3 text-[#0F172A]">3,490.0</td>
                  <td class="px-4 py-3 text-[#0F172A]">2,340.0</td>
                  <td class="px-4 py-3 text-[#64748B]">CARFOSEL B 940</td>
                  <td class="px-4 py-3"><span class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#E3FCEF] text-[#006644]">Running</span></td>
                </tr>
                <tr class="hover:bg-[#F8FAFC] transition-colors">
                  <td class="px-4 py-3 font-bold text-[#0F172A]">DFL UNIT-3 (PSP)</td>
                  <td class="px-4 py-3 font-semibold text-[#0F172A]">3,000.0</td>
                  <td class="px-4 py-3 font-semibold text-[#006644]">2,007.6</td>
                  <td class="px-4 py-3 font-bold text-[#006644]">66.9%</td>
                  <td class="px-4 py-3 text-[#0F172A]">2,000.0</td>
                  <td class="px-4 py-3 text-[#0F172A]">1,350.0</td>
                  <td class="px-4 py-3 text-[#64748B]">CARNAL 659 S</td>
                  <td class="px-4 py-3"><span class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#F0F9FF] text-[#0284C7]">Completed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('preproc-dash-apply-btn')?.addEventListener('click', () => {
      fPlant = document.getElementById('preproc-dash-plant')?.value || '';
      fPeriod = document.getElementById('preproc-dash-period')?.value || 'Today';
      fSpecies = document.getElementById('preproc-dash-species')?.value || '';
      updateDashboard();
      this.drawDashboardCharts();
      if (window.Toast) window.Toast.show(`Telemetry filtered for ${fPeriod} (${fPlant || 'All Plants'})`, 'info');
    });

    document.getElementById('preproc-dash-reset-btn')?.addEventListener('click', () => {
      const p = document.getElementById('preproc-dash-plant');
      const pr = document.getElementById('preproc-dash-period');
      const s = document.getElementById('preproc-dash-species');
      if (p) p.value = '';
      if (pr) pr.value = 'Today';
      if (s) s.value = '';
      fPlant = ''; fPeriod = 'Today'; fSpecies = '';
      updateDashboard();
      this.drawDashboardCharts();
      if (window.Toast) window.Toast.show('Dashboard filters reset.', 'info');
    });

    updateDashboard();

    setTimeout(() => {
      this.drawDashboardCharts();
    }, 60);
  },

  drawDashboardCharts() {
    const c1 = document.getElementById('productionChart');
    if (c1 && c1.parentElement) {
      const dpr = window.devicePixelRatio || 1;
      const rect = c1.parentElement.getBoundingClientRect();
      c1.width = (rect.width || 400) * dpr;
      c1.height = (rect.height || 240) * dpr;
      const ctx = c1.getContext('2d');
      ctx.scale(dpr, dpr);
      const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const data = [11200, 12400, 10800, 13030, 14200, 12800, 13600];
      const maxVal = 16000;
      const padLeft = 45, padRight = 20, padTop = 20, padBottom = 25;
      const chartW = rect.width - padLeft - padRight;
      const chartH = rect.height - padTop - padBottom;
      
      // Grid lines
      ctx.strokeStyle = '#F1F5F9';
      ctx.lineWidth = 1;
      ctx.fillStyle = '#64748B';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'right';
      for (let i = 0; i <= 4; i++) {
        const yVal = Math.round((maxVal / 4) * i);
        const y = padTop + chartH - (i / 4) * chartH;
        ctx.beginPath();
        ctx.moveTo(padLeft, y);
        ctx.lineTo(rect.width - padRight, y);
        ctx.stroke();
        ctx.fillText(yVal.toLocaleString(), padLeft - 6, y + 3);
      }

      // Benchmark Target line (12,000)
      const targetY = padTop + chartH - (12000 / maxVal) * chartH;
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 1.2;
      ctx.moveTo(padLeft, targetY);
      ctx.lineTo(rect.width - padRight, targetY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Fill area under curve
      const grad = ctx.createLinearGradient(0, padTop, 0, padTop + chartH);
      grad.addColorStop(0, 'rgba(2, 168, 181, 0.25)');
      grad.addColorStop(1, 'rgba(2, 168, 181, 0.00)');
      
      ctx.beginPath();
      data.forEach((val, idx) => {
        const x = padLeft + (idx / (data.length - 1)) * chartW;
        const y = padTop + chartH - (val / maxVal) * chartH;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.lineTo(padLeft + chartW, padTop + chartH);
      ctx.lineTo(padLeft, padTop + chartH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Line stroke
      ctx.beginPath();
      ctx.strokeStyle = '#02a8b5';
      ctx.lineWidth = 2.5;
      data.forEach((val, idx) => {
        const x = padLeft + (idx / (data.length - 1)) * chartW;
        const y = padTop + chartH - (val / maxVal) * chartH;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Data dots
      data.forEach((val, idx) => {
        const x = padLeft + (idx / (data.length - 1)) * chartW;
        const y = padTop + chartH - (val / maxVal) * chartH;
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#02a8b5';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Labels
      ctx.fillStyle = '#475569';
      ctx.textAlign = 'center';
      labels.forEach((lbl, idx) => {
        const x = padLeft + (idx / (labels.length - 1)) * chartW;
        ctx.fillText(lbl, x, rect.height - 8);
      });
    }

    const c2 = document.getElementById('yieldChart');
    if (c2 && c2.parentElement) {
      const dpr = window.devicePixelRatio || 1;
      const rect = c2.parentElement.getBoundingClientRect();
      c2.width = (rect.width || 400) * dpr;
      c2.height = (rect.height || 240) * dpr;
      const ctx = c2.getContext('2d');
      ctx.scale(dpr, dpr);
      const grades = ['16/20', '21/25', '26/30', '31/40', '41/50'];
      const yields = [68.5, 67.2, 66.0, 64.8, 63.5];
      const padLeft = 45, padRight = 20, padTop = 20, padBottom = 25;
      const chartW = rect.width - padLeft - padRight;
      const chartH = rect.height - padTop - padBottom;
      const barW = chartW / (grades.length * 2);

      // Y-axis
      ctx.fillStyle = '#64748B';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'right';
      for (let i = 0; i <= 4; i++) {
        const yVal = 50 + i * 5;
        const y = padTop + chartH - (i / 4) * chartH;
        ctx.beginPath();
        ctx.strokeStyle = '#F1F5F9';
        ctx.lineWidth = 1;
        ctx.moveTo(padLeft, y);
        ctx.lineTo(rect.width - padRight, y);
        ctx.stroke();
        ctx.fillText(yVal + '%', padLeft - 6, y + 3);
      }

      // Benchmark 65% line
      const benchY = padTop + chartH - ((65 - 50) / 20) * chartH;
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#056A38';
      ctx.lineWidth = 1.2;
      ctx.moveTo(padLeft, benchY);
      ctx.lineTo(rect.width - padRight, benchY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw bars
      grades.forEach((g, idx) => {
        const x = padLeft + idx * (barW * 2) + barW / 2;
        const h = ((yields[idx] - 50) / 20) * chartH;
        const y = padTop + chartH - h;
        
        ctx.fillStyle = idx === 0 ? '#02a8b5' : idx === 1 ? '#008f9a' : '#38bdf8';
        ctx.beginPath();
        ctx.roundRect(x, y, barW, h, [4, 4, 0, 0]);
        ctx.fill();

        // Value text
        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 9.5px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(yields[idx] + '%', x + barW / 2, y - 4);

        // Grade label
        ctx.fillStyle = '#475569';
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText(g, x + barW / 2, rect.height - 8);
      });
    }
  },

  // ============================================
  // 2. CHEMICAL INVENTORY & USAGE (FIXES IMAGE 1)
  // ============================================
  renderChemicalPos(container) {
    if (!this.chemicalPosList || this.chemicalPosList.length === 0 || !this.chemicalPosList.some(x => x.poNo === 'DFL/KPL/2627/004')) {
      this.chemicalPosList = [
        { id: "CPO-01", sNo: 1, supplierName: "KPL INTERNATIONAL LTD", poNo: "DFL/KPL/2627/004", poDate: "06-10-2026", chemicals: "", portName: "INPRT - PARADIP GARH", modeOfImport: "HSS", qtyBags: "", qtyKgs: "", totalAmount: "", etdDate: "", etaDate: "", remarks: "" },
        { id: "CPO-02", sNo: 2, supplierName: "ADWIK IMPEX,", poNo: "DFL/2627/003", poDate: "25-09-2026", chemicals: "", portName: "INKAK1 - KAKINADA", modeOfImport: "HSS", qtyBags: "", qtyKgs: "", totalAmount: "", etdDate: "30-09-2026", etaDate: "29-10-2026", remarks: "no" },
        { id: "CPO-03", sNo: 3, supplierName: "KPL INTERNATIONAL LTD", poNo: "DFL/KPL/2627/003", poDate: "07-09-2026", chemicals: "ALTESA NEO S100 (NP)", portName: "", modeOfImport: "HSS_BOND", qtyBags: "240", qtyKgs: "4800", totalAmount: "868800", etdDate: "", etaDate: "", remarks: "" },
        { id: "CPO-04", sNo: 4, supplierName: "PRAYON PHOSPHATES", poNo: "DFL/PP/2627/002", poDate: "18-08-2026", chemicals: "CARFOSEL B 940 (STPP)", portName: "INVTZ1 - VISAKHAPATNAM", modeOfImport: "DIRECT IMPORT", qtyBags: "400", qtyKgs: "10000", totalAmount: "1650000", etdDate: "25-08-2026", etaDate: "15-09-2026", remarks: "Standard pass" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title Header with Right-Aligned Action Button -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">CHEMICAL POS</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Purchase Order Tracking</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="cpo-btn-add-po" onclick="(window.PreprocessingView || PreprocessingView).openChemPOModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add PO</span>
            </button>
          </div>
        </div>

        <!-- Upper Card: Filters Card with SEARCH & FILTERS Header -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="cpo-filter-form" class="space-y-4">
            <!-- Row 1: 4 Dropdowns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SUPPLIER</label>
                <select id="cpo-filter-supplier" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All" selected>All</option>
                  <option value="KPL INTERNATIONAL LTD">KPL INTERNATIONAL LTD</option>
                  <option value="ADWIK IMPEX,">ADWIK IMPEX,</option>
                  <option value="PRAYON PHOSPHATES">PRAYON PHOSPHATES</option>
                  <option value="ICL FOOD SPECIALTIES">ICL FOOD SPECIALTIES</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PO NO</label>
                <select id="cpo-filter-pono" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All" selected>All</option>
                  <option value="DFL/KPL/2627/004">DFL/KPL/2627/004</option>
                  <option value="DFL/2627/003">DFL/2627/003</option>
                  <option value="DFL/KPL/2627/003">DFL/KPL/2627/003</option>
                  <option value="DFL/PP/2627/002">DFL/PP/2627/002</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CHEMICAL</label>
                <select id="cpo-filter-chemical" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All" selected>All</option>
                  <option value="ALTESA NEO S100 (NP)">ALTESA NEO S100 (NP)</option>
                  <option value="CARNAL 659 S ADVANCED (STPP)">CARNAL 659 S ADVANCED (STPP)</option>
                  <option value="CARFOSEL B 940 (STPP)">CARFOSEL B 940 (STPP)</option>
                  <option value="BEKAPLUS FS (BLEND)">BEKAPLUS FS (BLEND)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PORT</label>
                <select id="cpo-filter-port" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All" selected>All</option>
                  <option value="INPRT - PARADIP GARH">INPRT - PARADIP GARH</option>
                  <option value="INKAK1 - KAKINADA">INKAK1 - KAKINADA</option>
                  <option value="INVTZ1 - VISAKHAPATNAM">INVTZ1 - VISAKHAPATNAM</option>
                  <option value="INMAA1 - CHENNAI">INMAA1 - CHENNAI</option>
                </select>
              </div>
            </div>

            <!-- Row 2: 4 Columns (YEAR) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="cpo-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="2026-27" selected>2026-27</option>
                  <option value="2025-26">2025-26</option>
                  <option value="2024-25">2024-25</option>
                </select>
              </div>
            </div>

            <!-- Bottom-Right Search Button -->
            <div class="flex justify-end pt-1">
              <button type="button" id="cpo-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        

        <!-- Lower Card: Register Table with Search & Excel Export (Matching Screenshot 1) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </div>
  <input type="text" id="cpo-table-search" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
</div>
            <button type="button" id="cpo-btn-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.NO</th>
                  <th class="py-2.5 px-3">Supplier Name</th>
                  <th class="py-2.5 px-3">PoNo</th>
                  <th class="py-2.5 px-3">PO Date</th>
                  <th class="py-2.5 px-3">Chemicals</th>
                  <th class="py-2.5 px-3">Port Name</th>
                  <th class="py-2.5 px-3">Mode of Import</th>
                  <th class="py-2.5 px-3 text-right">Quantity(Bags)</th>
                  <th class="py-2.5 px-3 text-right">Quantity(KGs)</th>
                  <th class="py-2.5 px-3 text-right">Total Amount</th>
                  <th class="py-2.5 px-3">ETD Date</th>
                  <th class="py-2.5 px-3">ETA Date</th>
                  <th class="py-2.5 px-3">Remarks</th>
                  <th class="py-2.5 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="cpo-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>

        <!-- Add Chemical Line Modal -->
        <div id="cpo-line-modal" class="hidden fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div class="bg-white rounded-xl shadow-xl border border-[#CBD5E1] w-full max-w-md p-5 space-y-4 animate-fade-in">
            <div class="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <h4 class="text-xs font-bold text-[#1E293B] uppercase">Add / Update Chemical Specification</h4>
              <button type="button" id="cpo-line-close" class="text-[#64748B] hover:text-[#1E293B] text-lg font-bold cursor-pointer">&times;</button>
            </div>
            <form id="cpo-line-form" class="space-y-3">
              <input type="hidden" id="cpo-line-target-id" value="">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">Chemical Specification</label>
                <select id="cpo-line-chem" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  <option value="ALTESA NEO S100 (NP)">ALTESA NEO S100 (NP)</option>
                  <option value="CARNAL 659 S ADVANCED (STPP)">CARNAL 659 S ADVANCED (STPP)</option>
                  <option value="CARFOSEL B 940 (STPP)">CARFOSEL B 940 (STPP)</option>
                  <option value="BEKAPLUS FS (BLEND)">BEKAPLUS FS (BLEND)</option>
                </select>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">Quantity (Bags)</label>
                  <input type="number" id="cpo-line-bags" value="240" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">Quantity (KGs)</label>
                  <input type="number" id="cpo-line-kgs" value="4800" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                </div>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">Total Amount (INR)</label>
                <input type="number" id="cpo-line-amount" value="868800" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              </div>
              <div class="flex items-center justify-end gap-2 pt-2">
                <button type="button" id="cpo-line-cancel" class="px-4 py-1.5 bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#334155] text-xs font-semibold rounded-lg cursor-pointer">Cancel</button>
                <button type="submit" class="px-5 py-1.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg cursor-pointer">Save Line</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('cpo-table-body');
    const tableSearch = document.getElementById('cpo-table-search');
    const createCard = document.getElementById('cpo-create-card');
    const createForm = document.getElementById('cpo-create-form');
    const createTitle = document.getElementById('cpo-create-title');
    const editIdInput = document.getElementById('cpo-edit-id');
    const btnAddPo = document.getElementById('cpo-btn-add-po');
    const btnCloseForm = document.getElementById('cpo-btn-close-form');
    const btnCloseX = document.getElementById('cpo-card-close-x');
    const btnSearch = document.getElementById('cpo-btn-search');
    const btnExportExcel = document.getElementById('cpo-btn-export-excel');

    const filterSupplier = document.getElementById('cpo-filter-supplier');
    const filterPono = document.getElementById('cpo-filter-pono');
    const filterChemical = document.getElementById('cpo-filter-chemical');
    const filterPort = document.getElementById('cpo-filter-port');

    // Line modal elements
    const lineModal = document.getElementById('cpo-line-modal');
    const lineForm = document.getElementById('cpo-line-form');
    const lineTargetId = document.getElementById('cpo-line-target-id');
    const lineClose = document.getElementById('cpo-line-close');
    const lineCancel = document.getElementById('cpo-line-cancel');

    const renderTable = (query = '') => {
      const q = (query || '').toLowerCase().trim();
      const supFilter = filterSupplier?.value || 'All';
      const poFilter = filterPono?.value || 'All';
      const chemFilter = filterChemical?.value || 'All';
      const portFilter = filterPort?.value || 'All';

      const filtered = this.chemicalPosList.filter(r => {
        if (supFilter !== 'All' && r.supplierName !== supFilter) return false;
        if (poFilter !== 'All' && r.poNo !== poFilter) return false;
        if (chemFilter !== 'All' && r.chemicals !== chemFilter) return false;
        if (portFilter !== 'All' && r.portName !== portFilter) return false;

        if (!q) return true;
        const text = `${r.supplierName || ''} ${r.poNo || ''} ${r.chemicals || ''} ${r.portName || ''} ${r.modeOfImport || ''} ${r.remarks || ''}`.toLowerCase();
        return text.includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="14" class="py-8 text-center text-xs text-[#64748B]">
              No chemical purchase orders match the selected filters.
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = filtered.map((r, i) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#E2E8F0]">
          <td class="py-2.5 px-3 font-semibold text-[#64748B]">${i + 1}</td>
          <td class="py-2.5 px-3 font-medium text-[#1E293B]">${r.supplierName || ''}</td>
          <td class="py-2.5 px-3 font-mono font-medium text-[#1E293B]">${r.poNo || ''}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.poDate || ''}</td>
          <td class="py-2.5 px-3 text-[#1E293B] font-medium">${r.chemicals || ''}</td>
          <td class="py-2.5 px-3 text-[#475569]">${r.portName || ''}</td>
          <td class="py-2.5 px-3 font-semibold text-[#1E293B]">${r.modeOfImport || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.qtyBags || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.qtyKgs || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.totalAmount || ''}</td>
          <td class="py-2.5 px-3 text-[#475569]">${r.etdDate || ''}</td>
          <td class="py-2.5 px-3 text-[#475569]">${r.etaDate || ''}</td>
          <td class="py-2.5 px-3 text-[#475569]">${r.remarks || ''}</td>
          <td class="py-2.5 px-3 text-center">
            <div class="inline-flex items-center justify-center gap-1.5">
              <!-- Edit Icon (Pencil) -->
              <button type="button" title="Edit PO" class="cpo-action-edit p-1 text-[#0284C7] hover:text-[#02a8b5] hover:bg-[#F0F9FF] rounded transition-colors cursor-pointer" data-id="${r.id}">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
              </button>
              <!-- Plus Icon (Add Chemical Line) -->
              <button type="button" title="Add Line Items" class="cpo-action-addline p-1 text-[#0284C7] hover:text-[#02a8b5] hover:bg-[#F0F9FF] rounded transition-colors cursor-pointer" data-id="${r.id}">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              </button>
              <!-- Print Icon (Printer) -->
              <button type="button" title="Print PO" class="cpo-action-print p-1 text-[#0284C7] hover:text-[#02a8b5] hover:bg-[#F0F9FF] rounded transition-colors cursor-pointer" data-id="${r.id}">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              </button>
              <!-- Document Icon -->
              <button type="button" title="View Document" class="cpo-action-doc p-1 text-[#0284C7] hover:text-[#02a8b5] hover:bg-[#F0F9FF] rounded transition-colors cursor-pointer" data-id="${r.id}">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('');

      // Attach row action handlers
      tbody.querySelectorAll('.cpo-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.chemicalPosList.find(x => x.id === id);
          if (!rec) return;
          if (typeof this !== 'undefined' && this.openChemPOModal) {
            this.openChemPOModal(rec);
          } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemPOModal) {
            PreprocessingView.openChemPOModal(rec);
          } else if (window.PreprocessingView && window.PreprocessingView.openChemPOModal) {
            window.PreprocessingView.openChemPOModal(rec);
          }
        });
      });

      tbody.querySelectorAll('.cpo-action-addline').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.chemicalPosList.find(x => x.id === id);
          if (!rec) return;
          lineTargetId.value = rec.id;
          if (rec.chemicals) document.getElementById('cpo-line-chem').value = rec.chemicals;
          if (rec.qtyBags) document.getElementById('cpo-line-bags').value = rec.qtyBags;
          if (rec.qtyKgs) document.getElementById('cpo-line-kgs').value = rec.qtyKgs;
          if (rec.totalAmount) document.getElementById('cpo-line-amount').value = rec.totalAmount;
          lineModal.classList.remove('hidden');
        });
      });

      tbody.querySelectorAll('.cpo-action-print').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.chemicalPosList.find(x => x.id === id);
          if (window.Toast) window.Toast.show(`Printing Purchase Order ${rec?.poNo || ''}...`, 'info');
        });
      });

      tbody.querySelectorAll('.cpo-action-doc').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.chemicalPosList.find(x => x.id === id);
          if (window.Toast) window.Toast.show(`Viewing Order Document for ${rec?.poNo || ''}`, 'info');
        });
      });
    };

    // Initial render
    renderTable();

    // Table live search
    tableSearch?.addEventListener('input', (e) => renderTable(e.target.value));

    // Top Filter Search button
    btnSearch?.addEventListener('click', () => {
      renderTable(tableSearch?.value || '');
      if (window.Toast) window.Toast.show('Applied chemical PO filters', 'info');
    });

    // Toggle GS CHEM PO CREATE card
    btnAddPo?.addEventListener('click', () => {
      if (typeof this !== 'undefined' && this.openChemPOModal) {
        this.openChemPOModal();
      } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemPOModal) {
        PreprocessingView.openChemPOModal();
      } else if (window.PreprocessingView && window.PreprocessingView.openChemPOModal) {
        window.PreprocessingView.openChemPOModal();
      }
    });

    const hideCreateCard = () => {
      createCard.classList.add('hidden');
      createForm.reset();
      editIdInput.value = '';
    };

    btnCloseForm?.addEventListener('click', hideCreateCard);
    btnCloseX?.addEventListener('click', hideCreateCard);

    // Save GS CHEM PO CREATE form
    createForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = editIdInput.value;
      const supplier = document.getElementById('cpo-create-supplier').value;
      const port = document.getElementById('cpo-create-port').value;
      const mode = document.getElementById('cpo-create-mode').value;
      const pono = document.getElementById('cpo-create-pono').value;
      const podateRaw = document.getElementById('cpo-create-podate').value;
      const etadateRaw = document.getElementById('cpo-create-etadate').value;
      const etddateRaw = document.getElementById('cpo-create-etddate').value;
      const remarks = document.getElementById('cpo-create-remarks').value;

      const fmtDate = (d) => {
        if (!d) return '';
        const parts = d.split('-');
        if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
        return d;
      };

      if (editId) {
        const idx = this.chemicalPosList.findIndex(x => x.id === editId);
        if (idx !== -1) {
          this.chemicalPosList[idx] = {
            ...this.chemicalPosList[idx],
            supplierName: supplier,
            portName: port,
            modeOfImport: mode,
            poNo: pono,
            poDate: fmtDate(podateRaw),
            etaDate: fmtDate(etadateRaw),
            etdDate: fmtDate(etddateRaw),
            remarks: remarks
          };
          if (window.Toast) window.Toast.show(`Chemical PO ${pono} updated successfully`, 'success');
        }
      } else {
        const newRecord = {
          id: 'CPO-' + String(Date.now()).slice(-6),
          sNo: this.chemicalPosList.length + 1,
          supplierName: supplier,
          poNo: pono,
          poDate: fmtDate(podateRaw),
          chemicals: '',
          portName: port,
          modeOfImport: mode,
          qtyBags: '',
          qtyKgs: '',
          totalAmount: '',
          etdDate: fmtDate(etddateRaw),
          etaDate: fmtDate(etadateRaw),
          remarks: remarks
        };
        this.chemicalPosList.unshift(newRecord);
        if (window.Toast) window.Toast.show(`New Chemical PO ${pono} created successfully`, 'success');
      }

      hideCreateCard();
      renderTable(tableSearch?.value || '');
    });

    // Line modal actions
    lineClose?.addEventListener('click', () => lineModal.classList.add('hidden'));
    lineCancel?.addEventListener('click', () => lineModal.classList.add('hidden'));
    lineForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const targetId = lineTargetId.value;
      const rec = this.chemicalPosList.find(x => x.id === targetId);
      if (rec) {
        rec.chemicals = document.getElementById('cpo-line-chem').value;
        rec.qtyBags = document.getElementById('cpo-line-bags').value;
        rec.qtyKgs = document.getElementById('cpo-line-kgs').value;
        rec.totalAmount = document.getElementById('cpo-line-amount').value;
        lineModal.classList.add('hidden');
        renderTable(tableSearch?.value || '');
        if (window.Toast) window.Toast.show(`Chemical line added to ${rec.poNo}`, 'success');
      }
    });

    // Excel Export
    btnExportExcel?.addEventListener('click', () => {
      const headers = ["S.NO", "Supplier Name", "PoNo", "PO Date", "Chemicals", "Port Name", "Mode of Import", "Quantity(Bags)", "Quantity(KGs)", "Total Amount", "ETD Date", "ETA Date", "Remarks"];
      const rows = this.chemicalPosList.map((r, i) => [
        i + 1,
        `"${r.supplierName || ''}"`,
        `"${r.poNo || ''}"`,
        `"${r.poDate || ''}"`,
        `"${r.chemicals || ''}"`,
        `"${r.portName || ''}"`,
        `"${r.modeOfImport || ''}"`,
        `"${r.qtyBags || ''}"`,
        `"${r.qtyKgs || ''}"`,
        `"${r.totalAmount || ''}"`,
        `"${r.etdDate || ''}"`,
        `"${r.etaDate || ''}"`,
        `"${(r.remarks || '').replace(/"/g, '""')}"`
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `chemical_pos_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (window.Toast) window.Toast.show('Chemical POs report exported to CSV', 'success');
    });
  },

  renderReceivedChemicals(container) {
    if (!this.receivedChemicalsList || this.receivedChemicalsList.length === 0 || !this.receivedChemicalsList.some(x => x.poNo === 'DFL/CFB/2627/003')) {
      this.receivedChemicalsList = [
        { id: "RC-01", sNo: 1, poNo: "DFL/CFB/2627/003", chemical: "CARNAL 659 S ADVANCED (STPP)", blNo: "", containerNo: "", receivedBags: 800, receivedQty: 20000, boeNo: "", boeDate: "04-09-2026", clearedDate: "04-09-2026", balanceBags: 4000, balanceQty: 100000, status: "PENDING", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "RC-02", sNo: 2, poNo: "DFL/CFB/2627/002", chemical: "CARNAL 659 S ADVANCED (STPP)", blNo: "", containerNo: "", receivedBags: 800, receivedQty: 20000, boeNo: "", boeDate: "23-08-2026", clearedDate: "23-08-2026", balanceBags: 1600, balanceQty: 40000, status: "PENDING", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "RC-03", sNo: 3, poNo: "DFL/KPL/2627/004", chemical: "ALTESA NEO S100 (NP)", blNo: "BL-2026-991", containerNo: "TGCU8812301", receivedBags: 320, receivedQty: 8000, boeNo: "BOE-84721", boeDate: "06-10-2026", clearedDate: "08-10-2026", balanceBags: 0, balanceQty: 0, status: "CLEARED", plant: "KKD-DFL UNIT-2 (KKD)", year: "2026-27" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title Header with Right-Aligned Action Button -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">RECEIVED CHEMICALS</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Inward Orders & Dock Clearance</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="rc-btn-add-order" onclick="(window.PreprocessingView || PreprocessingView).openChemOrderModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Order</span>
            </button>
          </div>
        </div>

        <!-- Upper Card: Filters Card with SEARCH & FILTERS Header -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="rc-filter-form" class="space-y-4">
            <!-- Row 1: 3 Dropdowns -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT</label>
                <select id="rc-filter-plant" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="" selected>Select</option>
                  <option value="VSP-DFL UNIT-1 (VSP)">VSP-DFL UNIT-1 (VSP)</option>
                  <option value="KKD-DFL UNIT-2 (KKD)">KKD-DFL UNIT-2 (KKD)</option>
                  <option value="PSP-DFL UNIT-3 (PSP)">PSP-DFL UNIT-3 (PSP)</option>
                  <option value="JPT-DFL UNIT-5 (JPT)">JPT-DFL UNIT-5 (JPT)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">STATUS</label>
                <select id="rc-filter-status" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="PENDING" selected>Pending</option>
                  <option value="CLEARED">Cleared</option>
                  <option value="ALL">All</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="rc-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="2026-27" selected>2026-27</option>
                  <option value="2025-26">2025-26</option>
                  <option value="2024-25">2024-25</option>
                </select>
              </div>
            </div>

            <!-- Bottom-Right Action Buttons -->
            <div class="flex justify-end items-center gap-2 pt-1">
              <button type="button" id="rc-btn-more-search" class="px-4 py-2 border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#475569] text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer">More Search</button>
              <button type="button" id="rc-btn-load-all" class="px-4 py-2 border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#475569] text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer">Load All</button>
              <button type="button" id="rc-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        

        <!-- Lower Card: Register Table with Toolbar (Matching Screenshot 1) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="flex items-center flex-wrap gap-2.5 w-full sm:w-auto">
              <!-- Search Input with Magnifier -->
              <div class="relative w-full sm:w-64">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </div>
  <input type="text" id="rc-table-search" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
</div>
              <!-- More Search Button -->
              <button type="button" id="rc-btn-more-search" class="px-3 py-1.5 bg-white border border-[#10B981] text-[#10B981] hover:bg-[#F0FDF4] text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition-all cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>More Search</span>
              </button>
              <!-- Load All Button -->
              <button type="button" id="rc-btn-load-all" class="px-3 py-1.5 bg-white border border-[#0284C7] text-[#0284C7] hover:bg-[#F0F9FF] text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition-all cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
            <!-- Download Excel Button -->
            <button type="button" id="rc-btn-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.NO &uarr;&darr;</th>
                  <th class="py-2.5 px-3">PoNo &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Chemical &uarr;&darr;</th>
                  <th class="py-2.5 px-3">BL No &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Container No &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Received Bags &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Received Quantity &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Bill of Entry No &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Bill of Entry Date &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Cleared Date &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Balance Bags &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Balance Quantity &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-center">Status &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-center">Actions &uarr;&darr;</th>
                </tr>
              </thead>
              <tbody id="rc-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>

          <!-- Table Footer: Entries count & Pagination (Matching Screenshot 1) -->
          <div class="flex items-center justify-between pt-4 text-xs text-[#64748B]">
            <div id="rc-pagination-info">Showing 1 to 2 out of 2 entries</div>
            <div class="flex items-center gap-1">
              <span class="w-6 h-6 flex items-center justify-center rounded-full bg-[#3B82F6] text-white text-xs font-bold shadow-xs">1</span>
            </div>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('rc-table-body');
    const tableSearch = document.getElementById('rc-table-search');
    const createCard = document.getElementById('rc-create-card');
    const createForm = document.getElementById('rc-create-form');
    const createTitle = document.getElementById('rc-create-title');
    const editIdInput = document.getElementById('rc-edit-id');
    const btnAddOrder = document.getElementById('rc-btn-add-order');
    const btnCloseForm = document.getElementById('rc-btn-close-form');
    const btnCloseX = document.getElementById('rc-card-close-x');
    const btnSearch = document.getElementById('rc-btn-search');
    const btnLoadAll = document.getElementById('rc-btn-load-all');
    const btnMoreSearch = document.getElementById('rc-btn-more-search');
    const btnExportExcel = document.getElementById('rc-btn-export-excel');
    const paginationInfo = document.getElementById('rc-pagination-info');

    const filterPlant = document.getElementById('rc-filter-plant');
    const filterStatus = document.getElementById('rc-filter-status');
    const filterYear = document.getElementById('rc-filter-year');

    // Auto-calculate Received Qty in KGs when Received Bags changes (default 25 kg/bag)
    const bagsInput = document.getElementById('rc-create-bags');
    const qtyInput = document.getElementById('rc-create-qty');
    bagsInput?.addEventListener('input', () => {
      const b = parseInt(bagsInput.value) || 0;
      qtyInput.value = b * 25;
    });

    const renderTable = (query = '', overrideFilter = null) => {
      const q = (query || '').toLowerCase().trim();
      const plantVal = overrideFilter ? '' : (filterPlant?.value || '');
      const statusVal = overrideFilter ? 'ALL' : (filterStatus?.value || 'PENDING');
      const yearVal = overrideFilter ? '' : (filterYear?.value || '2026-27');

      const filtered = this.receivedChemicalsList.filter(r => {
        if (plantVal && r.plant && !r.plant.includes(plantVal)) return false;
        if (statusVal !== 'ALL' && (r.status || '').toUpperCase() !== statusVal.toUpperCase()) return false;
        if (yearVal && r.year && r.year !== yearVal) return false;

        if (!q) return true;
        const text = `${r.poNo || ''} ${r.chemical || ''} ${r.blNo || ''} ${r.containerNo || ''} ${r.boeNo || ''} ${r.status || ''}`.toLowerCase();
        return text.includes(q);
      });

      if (paginationInfo) {
        paginationInfo.textContent = `Showing 1 to ${filtered.length} out of ${filtered.length} entries`;
      }

      if (filtered.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="14" class="py-8 text-center text-xs text-[#64748B]">
              No inward chemical orders match the selected criteria.
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = filtered.map((r, i) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#E2E8F0]">
          <td class="py-2.5 px-3 font-semibold text-[#64748B]">${i + 1}</td>
          <td class="py-2.5 px-3 font-mono font-medium text-[#1E293B]">${r.poNo || ''}</td>
          <td class="py-2.5 px-3 text-[#1E293B] font-medium">${r.chemical || ''}</td>
          <td class="py-2.5 px-3 text-[#64748B]">${r.blNo || ''}</td>
          <td class="py-2.5 px-3 text-[#64748B]">${r.containerNo || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.receivedBags || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.receivedQty || ''}</td>
          <td class="py-2.5 px-3 text-[#64748B]">${r.boeNo || ''}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.boeDate || ''}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.clearedDate || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.balanceBags || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.balanceQuantity || r.balanceQty || ''}</td>
          <td class="py-2.5 px-3 text-center">
            ${(r.status || '').toUpperCase() === 'PENDING'
              ? '<span class="px-3 py-0.5 bg-[#EF4444] text-white rounded-full text-[10px] font-bold tracking-wider uppercase inline-block">PENDING</span>'
              : '<span class="px-3 py-0.5 bg-[#10B981] text-white rounded-full text-[10px] font-bold tracking-wider uppercase inline-block">CLEARED</span>'}
          </td>
          <td class="py-2.5 px-3 text-center">
            <button type="button" title="Edit Order" class="rc-action-edit p-1 text-[#0284C7] hover:text-[#02a8b5] hover:bg-[#F0F9FF] rounded transition-colors cursor-pointer" data-id="${r.id}">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            </button>
          </td>
        </tr>
      `).join('');

      // Attach row action handlers
      tbody.querySelectorAll('.rc-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.receivedChemicalsList.find(x => x.id === id);
          if (!rec) return;
          if (typeof this !== 'undefined' && this.openChemOrderModal) {
            this.openChemOrderModal(rec);
          } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemOrderModal) {
            PreprocessingView.openChemOrderModal(rec);
          } else if (window.PreprocessingView && window.PreprocessingView.openChemOrderModal) {
            window.PreprocessingView.openChemOrderModal(rec);
          }
        });
      });
    };

    // Initial render
    renderTable();

    // Table live search
    tableSearch?.addEventListener('input', (e) => renderTable(e.target.value));

    // Top Filter Search button
    btnSearch?.addEventListener('click', () => {
      renderTable(tableSearch?.value || '');
      if (window.Toast) window.Toast.show('Applied inward chemical filters', 'info');
    });

    // Load All button
    btnLoadAll?.addEventListener('click', () => {
      if (filterPlant) filterPlant.value = '';
      if (filterStatus) filterStatus.value = 'ALL';
      if (tableSearch) tableSearch.value = '';
      renderTable('', true);
      if (window.Toast) window.Toast.show('Loaded all received chemical records', 'info');
    });

    // More Search toggle
    btnMoreSearch?.addEventListener('click', () => {
      if (window.Toast) window.Toast.show('Additional search parameters active', 'info');
    });

    // Toggle GS CHEM ORDERS CREATE card
    btnAddOrder?.addEventListener('click', () => {
      if (typeof this !== 'undefined' && this.openChemOrderModal) {
        this.openChemOrderModal();
      } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemOrderModal) {
        PreprocessingView.openChemOrderModal();
      } else if (window.PreprocessingView && window.PreprocessingView.openChemOrderModal) {
        window.PreprocessingView.openChemOrderModal();
      }
    });

    const hideCreateCard = () => {
      createCard.classList.add('hidden');
      createForm.reset();
      editIdInput.value = '';
    };

    btnCloseForm?.addEventListener('click', hideCreateCard);
    btnCloseX?.addEventListener('click', hideCreateCard);

    // Save GS CHEM ORDERS CREATE form
    createForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = editIdInput.value;
      const plant = document.getElementById('rc-create-plant').value;
      const pono = document.getElementById('rc-create-pono').value;
      const chem = document.getElementById('rc-create-chem').value;
      const blno = document.getElementById('rc-create-blno').value;
      const containerno = document.getElementById('rc-create-containerno').value;
      const bags = parseInt(document.getElementById('rc-create-bags').value) || 0;
      const qty = parseInt(document.getElementById('rc-create-qty').value) || (bags * 25);
      const boeno = document.getElementById('rc-create-boeno').value;
      const boedateRaw = document.getElementById('rc-create-boedate').value;
      const cleardateRaw = document.getElementById('rc-create-cleardate').value;

      const fmtDate = (d) => {
        if (!d) return '';
        const parts = d.split('-');
        if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
        return d;
      };

      if (editId) {
        const idx = this.receivedChemicalsList.findIndex(x => x.id === editId);
        if (idx !== -1) {
          this.receivedChemicalsList[idx] = {
            ...this.receivedChemicalsList[idx],
            plant: plant,
            poNo: pono,
            chemical: chem,
            blNo: blno,
            containerNo: containerno,
            receivedBags: bags,
            receivedQty: qty,
            boeNo: boeno,
            boeDate: fmtDate(boedateRaw),
            clearedDate: fmtDate(cleardateRaw)
          };
          if (window.Toast) window.Toast.show(`Inward order ${pono} updated successfully`, 'success');
        }
      } else {
        const newRecord = {
          id: 'RC-' + String(Date.now()).slice(-6),
          sNo: this.receivedChemicalsList.length + 1,
          plant: plant,
          poNo: pono,
          chemical: chem,
          blNo: blno,
          containerNo: containerno,
          receivedBags: bags,
          receivedQty: qty,
          boeNo: boeno,
          boeDate: fmtDate(boedateRaw),
          clearedDate: fmtDate(cleardateRaw),
          balanceBags: bags,
          balanceQuantity: qty,
          status: 'PENDING',
          year: '2026-27'
        };
        this.receivedChemicalsList.unshift(newRecord);
        if (window.Toast) window.Toast.show(`New chemical inward order ${pono} recorded`, 'success');
      }

      hideCreateCard();
      renderTable(tableSearch?.value || '');
    });

    // Excel Export
    btnExportExcel?.addEventListener('click', () => {
      const headers = ["S.NO", "PoNo", "Chemical", "BL No", "Container No", "Received Bags", "Received Quantity", "Bill of Entry No", "Bill of Entry Date", "Cleared Date", "Balance Bags", "Balance Quantity", "Status"];
      const rows = this.receivedChemicalsList.map((r, i) => [
        i + 1,
        `"${r.poNo || ''}"`,
        `"${r.chemical || ''}"`,
        `"${r.blNo || ''}"`,
        `"${r.containerNo || ''}"`,
        `"${r.receivedBags || ''}"`,
        `"${r.receivedQty || ''}"`,
        `"${r.boeNo || ''}"`,
        `"${r.boeDate || ''}"`,
        `"${r.clearedDate || ''}"`,
        `"${r.balanceBags || ''}"`,
        `"${r.balanceQuantity || r.balanceQty || ''}"`,
        `"${r.status || ''}"`
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `received_chemicals_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (window.Toast) window.Toast.show('Received chemicals report exported to CSV', 'success');
    });
  },

  renderChemicalsConsumption(container) {
    if (!this.chemicalsConsumptionList || this.chemicalsConsumptionList.length === 0 || !this.chemicalsConsumptionList.some(x => x.openingBags === 2751)) {
      this.chemicalsConsumptionList = [
        { id: "CC-01", sNo: 1, date: "01-04-2025", chemical: "CARNAL 659 S ADVANCED (STPP)", plant: "DFL UNIT-5 (JPT)", receivedFrom: "", receivedBags: "", receivedKgs: "", sendedTo: "", sendedBags: "", sendedKgs: "", usedBags: "", usedKgs: "", openingBags: 2751, openingKgs: 68775, closingBags: 2751, closingKgs: 68775 },
        { id: "CC-02", sNo: 2, date: "02-04-2025", chemical: "CARNAL 659 S ADVANCED (STPP)", plant: "DFL UNIT-5 (JPT)", receivedFrom: "", receivedBags: "", receivedKgs: "", sendedTo: "", sendedBags: "", sendedKgs: "", usedBags: 10, usedKgs: 250, openingBags: 2751, openingKgs: 68775, closingBags: 2741, closingKgs: 68525 },
        { id: "CC-03", sNo: 3, date: "03-04-2025", chemical: "CARNAL 659 S ADVANCED (STPP)", plant: "DFL UNIT-5 (JPT)", receivedFrom: "", receivedBags: "", receivedKgs: "", sendedTo: "", sendedBags: "", sendedKgs: "", usedBags: 25, usedKgs: 625, openingBags: 2741, openingKgs: 68525, closingBags: 2716, closingKgs: 67900 },
        { id: "CC-04", sNo: 4, date: "04-04-2025", chemical: "CARNAL 659 S ADVANCED (STPP)", plant: "DFL UNIT-5 (JPT)", receivedFrom: "", receivedBags: "", receivedKgs: "", sendedTo: "", sendedBags: "", sendedKgs: "", usedBags: "", usedKgs: "", openingBags: 2716, openingKgs: 67900, closingBags: 2716, closingKgs: 67900 },
        { id: "CC-05", sNo: 5, date: "05-04-2025", chemical: "CARNAL 659 S ADVANCED (STPP)", plant: "DFL UNIT-5 (JPT)", receivedFrom: "", receivedBags: "", receivedKgs: "", sendedTo: "", sendedBags: "", sendedKgs: "", usedBags: 10, usedKgs: 250, openingBags: 2716, openingKgs: 67900, closingBags: 2706, closingKgs: 67650 },
        { id: "CC-06", sNo: 6, date: "06-04-2025", chemical: "CARNAL 659 S ADVANCED (STPP)", plant: "DFL UNIT-5 (JPT)", receivedFrom: "", receivedBags: "", receivedKgs: "", sendedTo: "", sendedBags: "", sendedKgs: "", usedBags: 10, usedKgs: 250, openingBags: 2706, openingKgs: 67650, closingBags: 2696, closingKgs: 67400 },
        { id: "CC-07", sNo: 7, date: "07-04-2025", chemical: "CARNAL 659 S ADVANCED (STPP)", plant: "DFL UNIT-5 (JPT)", receivedFrom: "", receivedBags: "", receivedKgs: "", sendedTo: "", sendedBags: "", sendedKgs: "", usedBags: 12, usedKgs: 300, openingBags: 2696, openingKgs: 67400, closingBags: 2684, closingKgs: 67100 },
        { id: "CC-08", sNo: 8, date: "08-04-2025", chemical: "CARNAL 659 S ADVANCED (STPP)", plant: "DFL UNIT-5 (JPT)", receivedFrom: "", receivedBags: "", receivedKgs: "", sendedTo: "", sendedBags: "", sendedKgs: "", usedBags: 15, usedKgs: 375, openingBags: 2684, openingKgs: 67100, closingBags: 2669, closingKgs: 66725 },
        { id: "CC-09", sNo: 9, date: "09-04-2025", chemical: "CARNAL 659 S ADVANCED (STPP)", plant: "DFL UNIT-5 (JPT)", receivedFrom: "", receivedBags: "", receivedKgs: "", sendedTo: "", sendedBags: "", sendedKgs: "", usedBags: 20, usedKgs: 500, openingBags: 2669, openingKgs: 66725, closingBags: 2649, closingKgs: 66225 }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title Header with Right-Aligned Action Button -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">CHEMICALS CONSUMPTION</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Floor Usage & Transfer Register</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="cc-btn-add-consumption" onclick="(window.PreprocessingView || PreprocessingView).openChemConsumptionModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Consumption</span>
            </button>
          </div>
        </div>

        <!-- Upper Card: Filters Card with SEARCH & FILTERS Header -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="cc-filter-form" class="space-y-4">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT</label>
                <select id="cc-filter-plant" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="DFL UNIT-5 (JPT)" selected>DFL UNIT-5 (JPT)</option>
                  <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                  <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                  <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                  <option value="">All Plants</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CHEMICAL</label>
                <select id="cc-filter-chem" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="CARNAL 659 S ADVANCED (STPP)" selected>CARNAL 659 S ADVANCED (STPP)</option>
                  <option value="ALTESA NEO S100 (NP)">ALTESA NEO S100 (NP)</option>
                  <option value="CARFOSEL B 940 (STPP)">CARFOSEL B 940 (STPP)</option>
                  <option value="BEKAPLUS FS (BLEND)">BEKAPLUS FS (BLEND)</option>
                  <option value="">All Chemicals</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">FROM DATE</label>
                <input type="date" id="cc-filter-from-date" value="2025-04-01" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TO DATE</label>
                <input type="date" id="cc-filter-to-date" value="2025-05-31" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Bottom-Right Search Button -->
            <div class="flex justify-end pt-1">
              <button type="button" id="cc-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        

        <!-- Lower Card: Register Table with Search & Excel Export (Matching Screenshot 1) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </div>
  <input type="text" id="cc-table-search" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
</div>
            <button type="button" id="cc-btn-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.NO</th>
                  <th class="py-2.5 px-3">Date</th>
                  <th class="py-2.5 px-3">Chemical</th>
                  <th class="py-2.5 px-3">Received From</th>
                  <th class="py-2.5 px-3 text-right">Received Qty In bags</th>
                  <th class="py-2.5 px-3 text-right">Received Qty In Kgs</th>
                  <th class="py-2.5 px-3">Sended To</th>
                  <th class="py-2.5 px-3 text-right">Sended In Bags</th>
                  <th class="py-2.5 px-3 text-right">Sended In Kgs</th>
                  <th class="py-2.5 px-3 text-right">Used In Bags</th>
                  <th class="py-2.5 px-3 text-right">Used In KGs</th>
                  <th class="py-2.5 px-3 text-right font-extrabold text-[#02a8b5]">Opening In Bags</th>
                  <th class="py-2.5 px-3 text-right font-extrabold text-[#02a8b5]">Opening In Kgs</th>
                  <th class="py-2.5 px-3 text-right font-extrabold text-[#006644]">Closing in Bags</th>
                  <th class="py-2.5 px-3 text-right font-extrabold text-[#006644]">Closing in KGs</th>
                </tr>
              </thead>
              <tbody id="cc-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('cc-table-body');
    const tableSearch = document.getElementById('cc-table-search');
    const createCard = document.getElementById('cc-create-card');
    const createForm = document.getElementById('cc-create-form');
    const btnAddConsumption = document.getElementById('cc-btn-add-consumption');
    const btnCloseForm = document.getElementById('cc-btn-close-form');
    const btnCloseX = document.getElementById('cc-card-close-x');
    const btnSearch = document.getElementById('cc-btn-search');
    const btnExportExcel = document.getElementById('cc-btn-export-excel');

    const filterPlant = document.getElementById('cc-filter-plant');
    const filterChem = document.getElementById('cc-filter-chem');
    const filterFrom = document.getElementById('cc-filter-from-date');
    const filterTo = document.getElementById('cc-filter-to-date');

    // Auto-calculate KGs from Bags
    const bagsInput = document.getElementById('cc-create-bags');
    const qtyInput = document.getElementById('cc-create-qty');
    bagsInput?.addEventListener('input', () => {
      const b = parseInt(bagsInput.value) || 0;
      qtyInput.value = b * 25;
    });

    const renderTable = (query = '') => {
      const q = (query || '').toLowerCase().trim();
      const pVal = filterPlant?.value || '';
      const cVal = filterChem?.value || '';

      const filtered = this.chemicalsConsumptionList.filter(r => {
        if (pVal && r.plant && r.plant !== pVal) return false;
        if (cVal && r.chemical && r.chemical !== cVal) return false;

        if (!q) return true;
        const text = `${r.date || ''} ${r.chemical || ''} ${r.receivedFrom || ''} ${r.sendedTo || ''}`.toLowerCase();
        return text.includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="15" class="py-8 text-center text-xs text-[#64748B]">
              No consumption ledger entries match the selected criteria.
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = filtered.map((r, i) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#E2E8F0]">
          <td class="py-2.5 px-3 font-semibold text-[#64748B]">${i + 1}</td>
          <td class="py-2.5 px-3 font-medium text-[#1E293B]">${r.date || ''}</td>
          <td class="py-2.5 px-3 text-[#1E293B] font-medium">${r.chemical || ''}</td>
          <td class="py-2.5 px-3 text-[#64748B]">${r.receivedFrom || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.receivedBags || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.receivedKgs || ''}</td>
          <td class="py-2.5 px-3 text-[#64748B]">${r.sendedTo || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.sendedBags || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.sendedKgs || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.usedBags || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.usedKgs || ''}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#1E293B]">${r.openingBags !== undefined && r.openingBags !== '' ? r.openingBags : ''}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#1E293B]">${r.openingKgs !== undefined && r.openingKgs !== '' ? r.openingKgs : ''}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#1E293B]">${r.closingBags !== undefined && r.closingBags !== '' ? r.closingBags : ''}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#1E293B]">${r.closingKgs !== undefined && r.closingKgs !== '' ? r.closingKgs : ''}</td>
        </tr>
      `).join('');
    };

    // Initial render
    renderTable();

    // Live search
    tableSearch?.addEventListener('input', (e) => renderTable(e.target.value));

    // Filter Search
    btnSearch?.addEventListener('click', () => {
      renderTable(tableSearch?.value || '');
      if (window.Toast) window.Toast.show('Applied consumption filters', 'info');
    });

    // Toggle Create Card
    btnAddConsumption?.addEventListener('click', () => {
      if (typeof this !== 'undefined' && this.openChemConsumptionModal) {
        this.openChemConsumptionModal();
      } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemConsumptionModal) {
        PreprocessingView.openChemConsumptionModal();
      } else if (window.PreprocessingView && window.PreprocessingView.openChemConsumptionModal) {
        window.PreprocessingView.openChemConsumptionModal();
      }
    });

    const hideCreateCard = () => {
      createCard.classList.add('hidden');
      createForm.reset();
    };

    btnCloseForm?.addEventListener('click', hideCreateCard);
    btnCloseX?.addEventListener('click', hideCreateCard);

    // Save Consumption
    createForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const plant = document.getElementById('cc-create-plant').value;
      const usageType = document.getElementById('cc-create-usage').value;
      const chem = document.getElementById('cc-create-chem').value;
      const bags = parseInt(document.getElementById('cc-create-bags').value) || 0;
      const qty = parseInt(document.getElementById('cc-create-qty').value) || (bags * 25);
      const dateRaw = document.getElementById('cc-create-date').value;
      const sendTo = document.getElementById('cc-create-sendto').value;

      const fmtDate = (d) => {
        if (!d) return '';
        const parts = d.split('-');
        if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
        return d;
      };

      // Calculate new opening and closing based on last record
      const lastRec = this.chemicalsConsumptionList[this.chemicalsConsumptionList.length - 1];
      const prevClosingBags = lastRec ? (lastRec.closingBags || 2649) : 2649;
      const prevClosingKgs = lastRec ? (lastRec.closingKgs || 66225) : 66225;

      const newOpeningBags = prevClosingBags;
      const newOpeningKgs = prevClosingKgs;
      const newClosingBags = Math.max(0, newOpeningBags - bags);
      const newClosingKgs = Math.max(0, newOpeningKgs - qty);

      const newRecord = {
        id: 'CC-' + String(Date.now()).slice(-6),
        sNo: this.chemicalsConsumptionList.length + 1,
        date: fmtDate(dateRaw),
        chemical: chem,
        plant: plant,
        receivedFrom: usageType === 'Transfer In' ? sendTo : '',
        receivedBags: usageType === 'Transfer In' ? bags : '',
        receivedKgs: usageType === 'Transfer In' ? qty : '',
        sendedTo: usageType === 'Transfer Out' ? sendTo : '',
        sendedBags: usageType === 'Transfer Out' ? bags : '',
        sendedKgs: usageType === 'Transfer Out' ? qty : '',
        usedBags: usageType === 'Consumption' ? bags : '',
        usedKgs: usageType === 'Consumption' ? qty : '',
        openingBags: newOpeningBags,
        openingKgs: newOpeningKgs,
        closingBags: newClosingBags,
        closingKgs: newClosingKgs
      };

      this.chemicalsConsumptionList.push(newRecord);
      if (window.Toast) window.Toast.show(`Chemical consumption logged for ${fmtDate(dateRaw)}`, 'success');
      hideCreateCard();
      renderTable(tableSearch?.value || '');
    });

    // Excel Export
    btnExportExcel?.addEventListener('click', () => {
      const headers = ["S.NO", "Date", "Chemical", "Received From", "Received Qty In bags", "Received Qty In Kgs", "Sended To", "Sended In Bags", "Sended In Kgs", "Used In Bags", "Used In KGs", "Opening In Bags", "Opening In Kgs", "Closing in Bags", "Closing in KGs"];
      const rows = this.chemicalsConsumptionList.map((r, i) => [
        i + 1,
        `"${r.date || ''}"`,
        `"${r.chemical || ''}"`,
        `"${r.receivedFrom || ''}"`,
        `"${r.receivedBags || ''}"`,
        `"${r.receivedKgs || ''}"`,
        `"${r.sendedTo || ''}"`,
        `"${r.sendedBags || ''}"`,
        `"${r.sendedKgs || ''}"`,
        `"${r.usedBags || ''}"`,
        `"${r.usedKgs || ''}"`,
        `"${r.openingBags !== undefined ? r.openingBags : ''}"`,
        `"${r.openingKgs !== undefined ? r.openingKgs : ''}"`,
        `"${r.closingBags !== undefined ? r.closingBags : ''}"`,
        `"${r.closingKgs !== undefined ? r.closingKgs : ''}"`
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `chemicals_consumption_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (window.Toast) window.Toast.show('Chemicals consumption ledger exported to CSV', 'success');
    });
  },

  // ============================================
  // TAB 4: CHEMICAL RECEIVED REPORT (Matching Screenshot 1)
  // ============================================
  renderChemicalReceivedReport(container) {
    if (!this.chemicalReceivedReportList || this.chemicalReceivedReportList.length === 0 || !this.chemicalReceivedReportList.some(x => x.poNo === 'DFL/KPL/2627/002')) {
      this.chemicalReceivedReportList = [
        { id: "CRR-01", sNo: 1, poNo: "DFL/KPL/2627/002", chemical: "ALTESA NEO S100 (NP)", receivedBags: 300, receivedQty: 6000, balanceBags: 0, balanceQuantity: 0, status: "ORDER RECEIVED", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "CRR-02", sNo: 2, poNo: "DFL/KPL/2627/003", chemical: "ALTESA NEO S100 (NP)", receivedBags: 240, receivedQty: 4800, balanceBags: 0, balanceQuantity: 0, status: "ORDER RECEIVED", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "CRR-03", sNo: 3, poNo: "DFL/PT/2627/014", chemical: "SALT", receivedBags: 640, receivedQty: 32000, balanceBags: 0, balanceQuantity: 0, status: "ORDER RECEIVED", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "CRR-04", sNo: 4, poNo: "DFL/CFB/2627/003", chemical: "CARNAL 659 S ADVANCED (STPP)", receivedBags: 800, receivedQty: 20000, balanceBags: 4000, balanceQuantity: 100000, status: "PENDING", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "CRR-05", sNo: 5, poNo: "DFL/PT/2627/013", chemical: "SALT", receivedBags: 620, receivedQty: 31000, balanceBags: 0, balanceQuantity: 0, status: "ORDER RECEIVED", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "CRR-06", sNo: 6, poNo: "DFL/CFB/2627/002", chemical: "CARNAL 659 S ADVANCED (STPP)", receivedBags: 800, receivedQty: 20000, balanceBags: 1600, balanceQuantity: 40000, status: "PENDING", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "CRR-07", sNo: 7, poNo: "DFL/PT/2627/011", chemical: "SALT", receivedBags: 300, receivedQty: 15000, balanceBags: 0, balanceQuantity: 0, status: "ORDER RECEIVED", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "CRR-08", sNo: 8, poNo: "DFL/PT/2627/012", chemical: "SALT", receivedBags: 320, receivedQty: 16000, balanceBags: 0, balanceQuantity: 0, status: "ORDER RECEIVED", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "CRR-09", sNo: 9, poNo: "DFL/GOI/2627/003", chemical: "CRUSTECH-NP-100", receivedBags: 60, receivedQty: 1500, balanceBags: 0, balanceQuantity: 0, status: "ORDER RECEIVED", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" },
        { id: "CRR-10", sNo: 10, poNo: "DFL/PT/2627/010", chemical: "SALT", receivedBags: 620, receivedQty: 31000, balanceBags: 0, balanceQuantity: 0, status: "ORDER RECEIVED", plant: "VSP-DFL UNIT-1 (VSP)", year: "2026-27" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">RECEIVED REPORT</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Intake vs Pending Fulfillment</span>
        </div>

        <!-- Upper Card: Filters Card (Matching Screenshot 1) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="crr-filter-form" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT</label>
                <select id="crr-filter-plant" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="" selected>Select</option>
                  <option value="VSP-DFL UNIT-1 (VSP)">VSP-DFL UNIT-1 (VSP)</option>
                  <option value="KKD-DFL UNIT-2 (KKD)">KKD-DFL UNIT-2 (KKD)</option>
                  <option value="PSP-DFL UNIT-3 (PSP)">PSP-DFL UNIT-3 (PSP)</option>
                  <option value="JPT-DFL UNIT-5 (JPT)">JPT-DFL UNIT-5 (JPT)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="crr-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="2026-27" selected>2026-27</option>
                  <option value="2025-26">2025-26</option>
                  <option value="2024-25">2024-25</option>
                </select>
              </div>
            </div>

            <div class="flex justify-end pt-1">
              <button type="button" id="crr-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Table with Toolbar -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="flex items-center flex-wrap gap-2.5 w-full sm:w-auto">
              <div class="relative w-full sm:w-64">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </div>
  <input type="text" id="crr-table-search" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
</div>
              <button type="button" id="crr-btn-more-search" class="px-3 py-1.5 bg-white border border-[#10B981] text-[#10B981] hover:bg-[#F0FDF4] text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition-all cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>More Search</span>
              </button>
              <button type="button" id="crr-btn-load-all" class="px-3 py-1.5 bg-white border border-[#0284C7] text-[#0284C7] hover:bg-[#F0F9FF] text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition-all cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
            <button type="button" id="crr-btn-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.NO &uarr;&darr;</th>
                  <th class="py-2.5 px-3">PoNo &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Chemical &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Received Bags &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Received Quantity &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Balance Bags &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Balance Quantity &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-center">Status &uarr;&darr;</th>
                </tr>
              </thead>
              <tbody id="crr-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('crr-table-body');
    const tableSearch = document.getElementById('crr-table-search');
    const btnSearch = document.getElementById('crr-btn-search');
    const btnLoadAll = document.getElementById('crr-btn-load-all');
    const btnMoreSearch = document.getElementById('crr-btn-more-search');
    const btnExportExcel = document.getElementById('crr-btn-export-excel');
    const filterPlant = document.getElementById('crr-filter-plant');
    const filterYear = document.getElementById('crr-filter-year');

    const renderTable = (query = '', override = false) => {
      const q = (query || '').toLowerCase().trim();
      const pVal = override ? '' : (filterPlant?.value || '');
      const yVal = override ? '' : (filterYear?.value || '2026-27');

      const filtered = this.chemicalReceivedReportList.filter(r => {
        if (pVal && r.plant && !r.plant.includes(pVal)) return false;
        if (yVal && r.year && r.year !== yVal) return false;
        if (!q) return true;
        return `${r.poNo || ''} ${r.chemical || ''} ${r.status || ''}`.toLowerCase().includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="py-8 text-center text-xs text-[#64748B]">No records found.</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map((r, i) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#E2E8F0]">
          <td class="py-2.5 px-3 font-semibold text-[#64748B]">${i + 1}</td>
          <td class="py-2.5 px-3 font-mono font-medium text-[#1E293B]">${r.poNo || ''}</td>
          <td class="py-2.5 px-3 text-[#1E293B] font-medium">${r.chemical || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.receivedBags || 0}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.receivedQty || 0}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.balanceBags || 0}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.balanceQuantity || 0}</td>
          <td class="py-2.5 px-3 text-center">
            ${r.status === 'ORDER RECEIVED'
              ? '<span class="px-3 py-0.5 bg-[#064E3B] text-white rounded-full text-[10px] font-bold tracking-wider uppercase inline-block">ORDER RECEIVED</span>'
              : '<span class="px-3 py-0.5 bg-[#EF4444] text-white rounded-full text-[10px] font-bold tracking-wider uppercase inline-block">PENDING</span>'}
          </td>
        </tr>
      `).join('');
    };

    renderTable();

    tableSearch?.addEventListener('input', (e) => renderTable(e.target.value));
    btnSearch?.addEventListener('click', () => {
      renderTable(tableSearch?.value || '');
      if (window.Toast) window.Toast.show('Applied report filters', 'info');
    });
    btnLoadAll?.addEventListener('click', () => {
      if (filterPlant) filterPlant.value = '';
      if (tableSearch) tableSearch.value = '';
      renderTable('', true);
      if (window.Toast) window.Toast.show('Loaded all received report records', 'info');
    });
    btnMoreSearch?.addEventListener('click', () => {
      if (window.Toast) window.Toast.show('More search parameters active', 'info');
    });
    btnExportExcel?.addEventListener('click', () => {
      const headers = ["S.NO", "PoNo", "Chemical", "Received Bags", "Received Quantity", "Balance Bags", "Balance Quantity", "Status"];
      const rows = this.chemicalReceivedReportList.map((r, i) => [
        i + 1,
        `"${r.poNo || ''}"`,
        `"${r.chemical || ''}"`,
        r.receivedBags || 0,
        r.receivedQty || 0,
        r.balanceBags || 0,
        r.balanceQuantity || 0,
        `"${r.status || ''}"`
      ]);
      const csv = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const a = document.createElement("a");
      a.href = encodeURI(csv);
      a.download = `chemical_received_report_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      if (window.Toast) window.Toast.show('Chemical received report exported to CSV', 'success');
    });
  },

  // ============================================
  // TAB 5: CHEMICAL OPENING BALANCE REPORT (Matching Screenshot 2)
  // ============================================
  renderChemicalOpeningBalance(container) {
    if (!this.chemicalOpeningBalanceList || this.chemicalOpeningBalanceList.length === 0 || !this.chemicalOpeningBalanceList.some(x => x.chemical.includes('CARNAL'))) {
      this.chemicalOpeningBalanceList = [
        { id: "COB-01", sNo: 1, chemical: "CARNAL 659 S ADVANCED (STPP)", kgsPerBag: 25, totalBags: 1909, totalKgs: 47725, plant: "DFL UNIT-5 (JPT)", date: "2025-10-26" },
        { id: "COB-02", sNo: 2, chemical: "CARFOSEL B 940 (STPP)", kgsPerBag: 25, totalBags: 876, totalKgs: 21900, plant: "DFL UNIT-5 (JPT)", date: "2025-10-26" },
        { id: "COB-03", sNo: 3, chemical: "ALTESA BT2 (NP)", kgsPerBag: 20, totalBags: 161, totalKgs: 3220, plant: "DFL UNIT-5 (JPT)", date: "2025-10-26" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">OPENING BALANCE REPORT</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Point-in-time Stock Balance</span>
        </div>

        <!-- Upper Card: Filters Card (Matching Screenshot 2) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="cob-filter-form" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT</label>
                <select id="cob-filter-plant" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="DFL UNIT-5 (JPT)" selected>DFL UNIT-5 (JPT)</option>
                  <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                  <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                  <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                  <option value="">All Plants</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CHEMICAL</label>
                <select id="cob-filter-chem" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All" selected>All</option>
                  <option value="CARNAL 659 S ADVANCED (STPP)">CARNAL 659 S ADVANCED (STPP)</option>
                  <option value="CARFOSEL B 940 (STPP)">CARFOSEL B 940 (STPP)</option>
                  <option value="ALTESA BT2 (NP)">ALTESA BT2 (NP)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BILL DATE</label>
                <input type="date" id="cob-filter-date" value="2025-10-26" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <div class="flex justify-end pt-1">
              <button type="button" id="cob-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Table with Toolbar -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </div>
  <input type="text" id="cob-table-search" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
</div>
            <button type="button" id="cob-btn-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.NO</th>
                  <th class="py-2.5 px-3">Chemical</th>
                  <th class="py-2.5 px-3 text-right">KGs per Bag</th>
                  <th class="py-2.5 px-3 text-right">Total Bags</th>
                  <th class="py-2.5 px-3 text-right">Total KGs</th>
                </tr>
              </thead>
              <tbody id="cob-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('cob-table-body');
    const tableSearch = document.getElementById('cob-table-search');
    const btnSearch = document.getElementById('cob-btn-search');
    const btnExportExcel = document.getElementById('cob-btn-export-excel');
    const filterPlant = document.getElementById('cob-filter-plant');
    const filterChem = document.getElementById('cob-filter-chem');

    const renderTable = (query = '') => {
      const q = (query || '').toLowerCase().trim();
      const pVal = filterPlant?.value || '';
      const cVal = filterChem?.value || 'All';

      const filtered = this.chemicalOpeningBalanceList.filter(r => {
        if (pVal && r.plant && r.plant !== pVal) return false;
        if (cVal !== 'All' && r.chemical !== cVal) return false;
        if (!q) return true;
        return (r.chemical || '').toLowerCase().includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="py-8 text-center text-xs text-[#64748B]">No opening balance records found.</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map((r, i) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#E2E8F0]">
          <td class="py-2.5 px-3 font-semibold text-[#64748B]">${i + 1}</td>
          <td class="py-2.5 px-3 text-[#1E293B] font-medium">${r.chemical || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.kgsPerBag || 0}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.totalBags || 0}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#1E293B]">${r.totalKgs || 0}</td>
        </tr>
      `).join('');
    };

    renderTable();

    tableSearch?.addEventListener('input', (e) => renderTable(e.target.value));
    btnSearch?.addEventListener('click', () => {
      renderTable(tableSearch?.value || '');
      if (window.Toast) window.Toast.show('Applied opening balance filters', 'info');
    });
    btnExportExcel?.addEventListener('click', () => {
      const headers = ["S.NO", "Chemical", "KGs per Bag", "Total Bags", "Total KGs"];
      const rows = this.chemicalOpeningBalanceList.map((r, i) => [
        i + 1,
        `"${r.chemical || ''}"`,
        r.kgsPerBag || 0,
        r.totalBags || 0,
        r.totalKgs || 0
      ]);
      const csv = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const a = document.createElement("a");
      a.href = encodeURI(csv);
      a.download = `chemical_opening_balance_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      if (window.Toast) window.Toast.show('Chemical opening balance exported to CSV', 'success');
    });
  },

  // ============================================
  // TAB 6: CHEMICAL BALANCE REPORT (Matching Screenshot 3)
  // ============================================
  renderChemicalBalanceReport(container) {
    if (!this.chemicalBalanceReportList || this.chemicalBalanceReportList.length === 0 || !this.chemicalBalanceReportList.some(x => x.chemical.includes('CARNAL'))) {
      this.chemicalBalanceReportList = [
        { id: "CBR-01", sNo: 1, chemical: "CARNAL 659 S ADVANCED (STPP)", openingKgs: 0, totalPurchaseKgs: 56000, totalConsumptionKgs: 10250, kgsSentToOtherPlant: 24700, closingKgs: 21050, plant: "DFL UNIT-3 (PSP)", fromDate: "2024-04-01", toDate: "2025-03-31", period: "April-2024 to March-2025" },
        { id: "CBR-02", sNo: 2, chemical: "ALTESA BT2 (NP)", openingKgs: 0, totalPurchaseKgs: 17400, totalConsumptionKgs: 300, kgsSentToOtherPlant: 12500, closingKgs: 4600, plant: "DFL UNIT-3 (PSP)", fromDate: "2024-04-01", toDate: "2025-03-31", period: "April-2024 to March-2025" },
        { id: "CBR-03", sNo: 3, chemical: "ALTESA NEO S700 (NC)", openingKgs: 0, totalPurchaseKgs: 8600, totalConsumptionKgs: 1320, kgsSentToOtherPlant: 5600, closingKgs: 1680, plant: "DFL UNIT-3 (PSP)", fromDate: "2024-04-01", toDate: "2025-03-31", period: "April-2024 to March-2025" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">BALANCE REPORT</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Period Stock Reconciliation</span>
        </div>

        <!-- Upper Card: Filters Card (Matching Screenshot 3) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="cbr-filter-form" class="space-y-4">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT</label>
                <select id="cbr-filter-plant" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="DFL UNIT-3 (PSP)" selected>DFL UNIT-3 (PSP)</option>
                  <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                  <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                  <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                  <option value="">All Plants</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CHEMICAL</label>
                <select id="cbr-filter-chem" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All" selected>All</option>
                  <option value="CARNAL 659 S ADVANCED (STPP)">CARNAL 659 S ADVANCED (STPP)</option>
                  <option value="ALTESA BT2 (NP)">ALTESA BT2 (NP)</option>
                  <option value="ALTESA NEO S700 (NC)">ALTESA NEO S700 (NC)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">FROM DATE</label>
                <input type="date" id="cbr-filter-from-date" value="2024-04-01" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TO DATE</label>
                <input type="date" id="cbr-filter-to-date" value="2025-03-31" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Row 2: 2 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="cbr-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="2024-25" selected>2024-25</option>
                  <option value="2025-26">2025-26</option>
                  <option value="2026-27">2026-27</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT MONTH</label>
                <select id="cbr-filter-month" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="" selected>Select</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                </select>
              </div>
            </div>

            <div class="flex justify-end pt-1">
              <button type="button" id="cbr-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Table with Toolbar -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex items-center justify-between gap-3 mb-4">
            <h3 class="text-xs md:text-sm font-bold text-[#1E293B]">April-2024 to March-2025</h3>
            <button type="button" id="cbr-btn-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.NO</th>
                  <th class="py-2.5 px-3">Chemical</th>
                  <th class="py-2.5 px-3 text-right">Opening KGs</th>
                  <th class="py-2.5 px-3 text-right">Total Purchase KGs</th>
                  <th class="py-2.5 px-3 text-right">Total Consumption KGs</th>
                  <th class="py-2.5 px-3 text-right">KGs Sent to Other Plant</th>
                  <th class="py-2.5 px-3 text-right font-extrabold text-[#006644]">Closing KGs</th>
                </tr>
              </thead>
              <tbody id="cbr-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('cbr-table-body');
    const btnSearch = document.getElementById('cbr-btn-search');
    const btnExportExcel = document.getElementById('cbr-btn-export-excel');
    const filterPlant = document.getElementById('cbr-filter-plant');
    const filterChem = document.getElementById('cbr-filter-chem');

    const renderTable = () => {
      const pVal = filterPlant?.value || '';
      const cVal = filterChem?.value || 'All';

      const filtered = this.chemicalBalanceReportList.filter(r => {
        if (pVal && r.plant && r.plant !== pVal) return false;
        if (cVal !== 'All' && r.chemical !== cVal) return false;
        return true;
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="py-8 text-center text-xs text-[#64748B]">No reconciliation balance records found.</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map((r, i) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#E2E8F0]">
          <td class="py-2.5 px-3 font-semibold text-[#64748B]">${i + 1}</td>
          <td class="py-2.5 px-3 text-[#1E293B] font-medium">${r.chemical || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.openingKgs || 0}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.totalPurchaseKgs || 0}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.totalConsumptionKgs || 0}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.kgsSentToOtherPlant || 0}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#006644]">${r.closingKgs || 0}</td>
        </tr>
      `).join('');
    };

    renderTable();

    btnSearch?.addEventListener('click', () => {
      renderTable();
      if (window.Toast) window.Toast.show('Applied period balance filters', 'info');
    });
    btnExportExcel?.addEventListener('click', () => {
      const headers = ["S.NO", "Chemical", "Opening KGs", "Total Purchase KGs", "Total Consumption KGs", "KGs Sent to Other Plant", "Closing KGs"];
      const rows = this.chemicalBalanceReportList.map((r, i) => [
        i + 1,
        `"${r.chemical || ''}"`,
        r.openingKgs || 0,
        r.totalPurchaseKgs || 0,
        r.totalConsumptionKgs || 0,
        r.kgsSentToOtherPlant || 0,
        r.closingKgs || 0
      ]);
      const csv = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const a = document.createElement("a");
      a.href = encodeURI(csv);
      a.download = `chemical_balance_report_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      if (window.Toast) window.Toast.show('Chemical balance report exported to CSV', 'success');
    });
  },

  // ============================================
  // TAB 7: CHEMICAL PAYMENTS LIST & GS CHEM PO PAYMENT CREATE (Matching Screenshots 4 & 5)
  // ============================================
  renderChemicalPaymentsList(container) {
    if (!this.chemicalPaymentsList || this.chemicalPaymentsList.length === 0 || !this.chemicalPaymentsList.some(x => x.poNo === 'DFL/KPL/2627/004')) {
      this.chemicalPaymentsList = [
        { id: "CP-01", sNo: 1, poNo: "DFL/KPL/2627/004", chemicalName: "ALTESA NEO S100 (NP)", partyName: "KPL INTERNATIONAL LTD", receivedQty: 6400, amount: 1152000, paidAmount: 1152000, bankRefNo: "HDFC-RTGS-98214", paymentDate: "2025-10-24", remarks: "Full settlement against delivery", status: "Paid", supplier: "KPL INTERNATIONAL LTD", year: "2025-26" },
        { id: "CP-02", sNo: 2, poNo: "DFL/CFB/2627/003", chemicalName: "CARNAL 659 S ADVANCED (STPP)", partyName: "ADWIK IMPEX,", receivedQty: 20000, amount: 868800, paidAmount: 500000, bankRefNo: "SBI-NEFT-44102", paymentDate: "2025-10-20", remarks: "Part payment milestone 1", status: "Partially Paid", supplier: "ADWIK IMPEX,", year: "2025-26" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title Header with Right-Aligned Action Button -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">PAYMENTS LIST</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screens &bull; Vendor Disbursals & Clearance Register</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="cp-btn-add-payment" onclick="(window.PreprocessingView || PreprocessingView).openChemPaymentModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Payment</span>
            </button>
          </div>
        </div>

        <!-- Upper Card: Filters Card with SEARCH & FILTERS Header -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form id="cp-filter-form" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SUPPLIER</label>
                <select id="cp-filter-supplier" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All" selected>All</option>
                  <option value="KPL INTERNATIONAL LTD">KPL INTERNATIONAL LTD</option>
                  <option value="ADWIK IMPEX,">ADWIK IMPEX,</option>
                  <option value="PRAYON PHOSPHATES">PRAYON PHOSPHATES</option>
                  <option value="ICL FOOD SPECIALTIES">ICL FOOD SPECIALTIES</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="cp-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="2025-26" selected>2025-26</option>
                  <option value="2026-27">2026-27</option>
                  <option value="2024-25">2024-25</option>
                </select>
              </div>
            </div>

            <!-- Bottom-Right Action Buttons -->
            <div class="flex justify-end items-center gap-2 pt-1">
              <button type="button" id="cp-btn-more-search" class="px-4 py-2 border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#475569] text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer">More Search</button>
              <button type="button" id="cp-btn-load-all" class="px-4 py-2 border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#475569] text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer">Load All</button>
              <button type="button" id="cp-btn-search" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        

        <!-- Lower Card: Table with Toolbar (Matching Screenshot 4) -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="flex items-center flex-wrap gap-2.5 w-full sm:w-auto">
              <div class="relative w-full sm:w-64">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </div>
  <input type="text" id="cp-table-search" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
</div>
              <button type="button" id="cp-btn-more-search" class="px-3 py-1.5 bg-white border border-[#10B981] text-[#10B981] hover:bg-[#F0FDF4] text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition-all cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>More Search</span>
              </button>
              <button type="button" id="cp-btn-load-all" class="px-3 py-1.5 bg-white border border-[#0284C7] text-[#0284C7] hover:bg-[#F0F9FF] text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition-all cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
            </div>
            <button type="button" id="cp-btn-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.NO &uarr;&darr;</th>
                  <th class="py-2.5 px-3">PoNo &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Chemical Name &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Party Name &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Recieved Quantity (Kgs) &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Amount (Rupees) &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-right">Paid Amount (Rupees) &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Bank Reference No &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Payment Date &uarr;&darr;</th>
                  <th class="py-2.5 px-3">Remarks &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-center">Status &uarr;&darr;</th>
                  <th class="py-2.5 px-3 text-center">Actions &uarr;&darr;</th>
                </tr>
              </thead>
              <tbody id="cp-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('cp-table-body');
    const tableSearch = document.getElementById('cp-table-search');
    const createCard = document.getElementById('cp-create-card');
    const createForm = document.getElementById('cp-create-form');
    const createTitle = document.getElementById('cp-create-title');
    const editIdInput = document.getElementById('cp-edit-id');
    const btnAddPayment = document.getElementById('cp-btn-add-payment');
    const btnCloseForm = document.getElementById('cp-btn-close-form');
    const btnCloseX = document.getElementById('cp-card-close-x');
    const btnSearch = document.getElementById('cp-btn-search');
    const btnLoadAll = document.getElementById('cp-btn-load-all');
    const btnMoreSearch = document.getElementById('cp-btn-more-search');
    const btnExportExcel = document.getElementById('cp-btn-export-excel');
    const filterSupplier = document.getElementById('cp-filter-supplier');
    const filterYear = document.getElementById('cp-filter-year');

    const renderTable = (query = '', override = false) => {
      const q = (query || '').toLowerCase().trim();
      const sVal = override ? 'All' : (filterSupplier?.value || 'All');
      const yVal = override ? '' : (filterYear?.value || '2025-26');

      const filtered = this.chemicalPaymentsList.filter(r => {
        if (sVal !== 'All' && r.supplier && r.supplier !== sVal) return false;
        if (yVal && r.year && r.year !== yVal) return false;
        if (!q) return true;
        return `${r.poNo || ''} ${r.chemicalName || ''} ${r.partyName || ''} ${r.bankRefNo || ''}`.toLowerCase().includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="12" class="py-8 text-center text-xs text-[#64748B]">No chemical payment records available in table.</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map((r, i) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#E2E8F0]">
          <td class="py-2.5 px-3 font-semibold text-[#64748B]">${i + 1}</td>
          <td class="py-2.5 px-3 font-mono font-medium text-[#1E293B]">${r.poNo || ''}</td>
          <td class="py-2.5 px-3 text-[#1E293B] font-medium">${r.chemicalName || ''}</td>
          <td class="py-2.5 px-3 text-[#1E293B]">${r.partyName || ''}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">${r.receivedQty || 0}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#1E293B]">₹ ${(r.amount || 0).toLocaleString()}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#006644]">₹ ${(r.paidAmount || 0).toLocaleString()}</td>
          <td class="py-2.5 px-3 font-mono text-[#334155]">${r.bankRefNo || ''}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.paymentDate || ''}</td>
          <td class="py-2.5 px-3 text-[#64748B]">${r.remarks || ''}</td>
          <td class="py-2.5 px-3 text-center">
            <span class="px-3 py-0.5 ${r.status === 'Paid' ? 'bg-[#10B981]' : 'bg-[#F59E0B]'} text-white rounded-full text-[10px] font-bold tracking-wider uppercase inline-block">${r.status || 'Paid'}</span>
          </td>
          <td class="py-2.5 px-3 text-center">
            <button type="button" title="Edit Payment" class="cp-action-edit p-1 text-[#0284C7] hover:text-[#02a8b5] hover:bg-[#F0F9FF] rounded transition-colors cursor-pointer" data-id="${r.id}">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            </button>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.cp-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.chemicalPaymentsList.find(x => x.id === id);
          if (!rec) return;
          if (typeof this !== 'undefined' && this.openChemPaymentModal) {
            this.openChemPaymentModal(rec);
          } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemPaymentModal) {
            PreprocessingView.openChemPaymentModal(rec);
          } else if (window.PreprocessingView && window.PreprocessingView.openChemPaymentModal) {
            window.PreprocessingView.openChemPaymentModal(rec);
          }
        });
      });
    };

    renderTable();

    tableSearch?.addEventListener('input', (e) => renderTable(e.target.value));
    btnSearch?.addEventListener('click', () => {
      renderTable(tableSearch?.value || '');
      if (window.Toast) window.Toast.show('Applied payment filters', 'info');
    });
    btnLoadAll?.addEventListener('click', () => {
      if (filterSupplier) filterSupplier.value = 'All';
      if (tableSearch) tableSearch.value = '';
      renderTable('', true);
      if (window.Toast) window.Toast.show('Loaded all payment records', 'info');
    });
    btnMoreSearch?.addEventListener('click', () => {
      if (window.Toast) window.Toast.show('More search options active', 'info');
    });

    btnAddPayment?.addEventListener('click', () => {
      if (typeof this !== 'undefined' && this.openChemPaymentModal) {
        this.openChemPaymentModal();
      } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemPaymentModal) {
        PreprocessingView.openChemPaymentModal();
      } else if (window.PreprocessingView && window.PreprocessingView.openChemPaymentModal) {
        window.PreprocessingView.openChemPaymentModal();
      }
    });

    const hideCreateCard = () => {
      createCard.classList.add('hidden');
      createForm.reset();
      editIdInput.value = '';
    };

    btnCloseForm?.addEventListener('click', hideCreateCard);
    btnCloseX?.addEventListener('click', hideCreateCard);

    createForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = editIdInput.value;
      const pono = document.getElementById('cp-create-pono').value;
      const chem = document.getElementById('cp-create-chem').value;
      const party = document.getElementById('cp-create-party').value;
      const qty = parseInt(document.getElementById('cp-create-qty').value) || 0;
      const amt = parseFloat(document.getElementById('cp-create-amount').value) || 0;
      const bankref = document.getElementById('cp-create-bankref').value;
      const dateVal = document.getElementById('cp-create-date').value;
      const remarks = document.getElementById('cp-create-remarks').value;

      if (editId) {
        const idx = this.chemicalPaymentsList.findIndex(x => x.id === editId);
        if (idx !== -1) {
          this.chemicalPaymentsList[idx] = {
            ...this.chemicalPaymentsList[idx],
            poNo: pono,
            chemicalName: chem,
            partyName: party,
            receivedQty: qty,
            amount: amt,
            paidAmount: amt,
            bankRefNo: bankref,
            paymentDate: dateVal,
            remarks: remarks,
            supplier: party
          };
          if (window.Toast) window.Toast.show(`Payment record ${pono} updated`, 'success');
        }
      } else {
        const newRecord = {
          id: 'CP-' + String(Date.now()).slice(-6),
          sNo: this.chemicalPaymentsList.length + 1,
          poNo: pono,
          chemicalName: chem,
          partyName: party,
          receivedQty: qty,
          amount: amt,
          paidAmount: amt,
          bankRefNo: bankref,
          paymentDate: dateVal,
          remarks: remarks,
          status: 'Paid',
          supplier: party,
          year: '2025-26'
        };
        this.chemicalPaymentsList.unshift(newRecord);
        if (window.Toast) window.Toast.show(`Payment recorded for ${pono}`, 'success');
      }

      hideCreateCard();
      renderTable(tableSearch?.value || '');
    });

    btnExportExcel?.addEventListener('click', () => {
      const headers = ["S.NO", "PoNo", "Chemical Name", "Party Name", "Recieved Quantity (Kgs)", "Amount (Rupees)", "Paid Amount (Rupees)", "Bank Reference No", "Payment Date", "Remarks", "Status"];
      const rows = this.chemicalPaymentsList.map((r, i) => [
        i + 1,
        `"${r.poNo || ''}"`,
        `"${r.chemicalName || ''}"`,
        `"${r.partyName || ''}"`,
        r.receivedQty || 0,
        r.amount || 0,
        r.paidAmount || 0,
        `"${r.bankRefNo || ''}"`,
        `"${r.paymentDate || ''}"`,
        `"${(r.remarks || '').replace(/"/g, '""')}"`,
        `"${r.status || ''}"`
      ]);
      const csv = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const a = document.createElement("a");
      a.href = encodeURI(csv);
      a.download = `chemical_payments_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      if (window.Toast) window.Toast.show('Chemical payments exported to CSV', 'success');
    });
  },

  // ============================================
  // 3. FLOOR OPERATIONS & LOGS
  // ============================================
  renderRmReceived(container) {
    if (!this.rmReceivedList || this.rmReceivedList.length === 0) {
      this.rmReceivedList = [
        { id: "RMR-01", sNo: 1, billNo: "SKM/2425/1753", variety: "VM-HEAD ON", count: 88.0, headonWeight: 3373.0, recvCount: 85.0, recvWeight: 3373.0, sampleHoQty: 5.0, noOfPcs: 425, plant: "VSP - DFL UNIT-1 (VSP)", arrivalDate: "2025-03-23", vehicleNo: "AP39TH4246 - VM-VSP-SKM-056", trackCode: "VM-VSP-SKM-056", sealNo: "43475", supervisor: "T.VENKATESH", remarks: "" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">RM RECEIVED TRACKID</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Operations &bull; Raw Material Inward Verification</span>
        </div>

        <!-- Upper Card: Entry Form -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form id="rm-received-form" class="space-y-4">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-red-500 font-bold">*</span></label>
                <select id="rm-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="VSP - DFL UNIT-1 (VSP)" selected>VSP - DFL UNIT-1 (VSP)</option>
                  <option value="KKD - DFL UNIT-2 (KKD)">KKD - DFL UNIT-2 (KKD)</option>
                  <option value="PSP - DFL UNIT-3 (PSP)">PSP - DFL UNIT-3 (PSP)</option>
                  <option value="JPT - DFL UNIT-5 (JPT)">JPT - DFL UNIT-5 (JPT)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL DATE</label>
                <input type="date" id="rm-arrival-date" value="2025-03-23" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">VEHICLE NUMBER <span class="text-red-500 font-bold">*</span></label>
                <select id="rm-vehicle" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="AP39TH4246 - VM-VSP-SKM-056" selected>AP39TH4246 - VM-VSP-SKM-056</option>
                  <option value="AP05X9921 - BT-KKD-MKP-043">AP05X9921 - BT-KKD-MKP-043</option>
                  <option value="AP31TT4177 - VM-PSP-BVR-078">AP31TT4177 - VM-PSP-BVR-078</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TRACK CODE FORMAT <span class="text-red-500 font-bold">*</span></label>
                <input type="text" id="rm-track-code" value="VM-VSP-SKM-056" readonly class="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#475569] font-mono focus:outline-none">
              </div>
            </div>

            <!-- Row 2: 3 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SEAL NUMBER <span class="text-red-500 font-bold">*</span></label>
                <input type="text" id="rm-seal" value="43475" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SUPERVISOR <span class="text-red-500 font-bold">*</span></label>
                <select id="rm-supervisor" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="T.VENKATESH" selected>T.VENKATESH</option>
                  <option value="K VENKATA VINAY">K VENKATA VINAY</option>
                  <option value="S.BALA KRISHNA">S.BALA KRISHNA</option>
                  <option value="D.SURYA NARAYANA">D.SURYA NARAYANA</option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REMARKS</label>
                <input type="text" id="rm-remarks" placeholder="Enter Remarks" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Action Button -->
            <div class="flex items-center justify-center pt-2">
              <button type="submit" class="px-7 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Save
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Register Table with In-Table Editable Inputs -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </div>
  <input type="text" id="rm-search" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
</div>
            <button type="button" id="rm-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.No</th>
                  <th class="py-2.5 px-3">Bill No</th>
                  <th class="py-2.5 px-3">Variety</th>
                  <th class="py-2.5 px-3 text-right">Count</th>
                  <th class="py-2.5 px-3 text-right">Head on Weight</th>
                  <th class="py-2.5 px-3 text-right">Recv Count</th>
                  <th class="py-2.5 px-3 text-right">Recv Weight</th>
                  <th class="py-2.5 px-3 text-right">Sample HO Qty</th>
                  <th class="py-2.5 px-3 text-right">No Of Pcs</th>
                  <th class="py-2.5 px-3 text-right">Count Diff</th>
                  <th class="py-2.5 px-3 text-right">Qty Diff</th>
                  <th class="py-2.5 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="rm-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('rm-table-body');
    const searchInput = document.getElementById('rm-search');
    const form = document.getElementById('rm-received-form');
    const exportBtn = document.getElementById('rm-export-excel');

    const renderRows = (query = '') => {
      const q = query.toLowerCase().trim();
      const filtered = this.rmReceivedList.filter(r => {
        if (!q) return true;
        return `${r.billNo || ''} ${r.variety || ''} ${r.plant || ''} ${r.vehicleNo || ''}`.toLowerCase().includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="12" class="text-center py-8 text-[#94A3B8] text-xs font-medium">No data available in table</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map((r, idx) => {
        const countDiff = Number((r.recvCount || 0) - (r.count || 0)).toFixed(0);
        const qtyDiff = Number((r.recvWeight || 0) - (r.headonWeight || 0)).toFixed(0);

        return `
          <tr class="hover:bg-[#F8FAFC] transition-colors" data-id="${r.id}">
            <td class="py-2 px-3 font-bold text-[#64748B]">${idx + 1}</td>
            <td class="py-2 px-3 font-bold text-[#0F172A]">${r.billNo || '-'}</td>
            <td class="py-2 px-3 text-[#334155]">${r.variety || '-'}</td>
            <td class="py-2 px-3 text-right">
              <input type="number" step="0.001" value="${Number(r.count || 0).toFixed(3)}" readonly class="w-24 text-right px-2 py-1 bg-[#F1F5F9] border border-[#CBD5E1] rounded text-xs text-[#334155] focus:outline-none">
            </td>
            <td class="py-2 px-3 text-right">
              <input type="number" step="0.001" value="${Number(r.headonWeight || 0).toFixed(3)}" readonly class="w-28 text-right px-2 py-1 bg-[#F1F5F9] border border-[#CBD5E1] rounded text-xs text-[#334155] focus:outline-none">
            </td>
            <td class="py-2 px-3 text-right">
              <input type="number" step="0.001" value="${Number(r.recvCount || 0).toFixed(3)}" data-field="recvCount" data-id="${r.id}" class="rm-inline-input w-24 text-right px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] outline-none font-semibold">
            </td>
            <td class="py-2 px-3 text-right">
              <input type="number" step="0.001" value="${Number(r.recvWeight || 0).toFixed(0)}" data-field="recvWeight" data-id="${r.id}" class="rm-inline-input w-24 text-right px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] outline-none font-semibold">
            </td>
            <td class="py-2 px-3 text-right">
              <input type="number" step="0.001" value="${Number(r.sampleHoQty || 0).toFixed(3)}" data-field="sampleHoQty" data-id="${r.id}" class="rm-inline-input w-24 text-right px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] outline-none">
            </td>
            <td class="py-2 px-3 text-right">
              <input type="number" value="${Number(r.noOfPcs || 0)}" data-field="noOfPcs" data-id="${r.id}" class="rm-inline-input w-20 text-right px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] outline-none">
            </td>
            <td class="py-2 px-3 text-right font-mono font-bold ${Number(countDiff) < 0 ? 'text-red-500' : 'text-emerald-600'}">${countDiff}</td>
            <td class="py-2 px-3 text-right font-mono font-bold ${Number(qtyDiff) < 0 ? 'text-red-500' : 'text-emerald-600'}">${qtyDiff}</td>
            <td class="py-2 px-3 text-center">
              <button type="button" data-del-id="${r.id}" class="rm-row-del p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer" title="Delete Row">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </td>
          </tr>
        `;
      }).join('');

      tbody.querySelectorAll('.rm-inline-input').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const id = e.target.getAttribute('data-id');
          const field = e.target.getAttribute('data-field');
          const val = parseFloat(e.target.value) || 0;
          const rec = this.rmReceivedList.find(x => x.id === id);
          if (rec) {
            rec[field] = val;
            const tr = e.target.closest('tr');
            if (tr) {
              const cDiff = Number((rec.recvCount || 0) - (rec.count || 0)).toFixed(0);
              const qDiff = Number((rec.recvWeight || 0) - (rec.headonWeight || 0)).toFixed(0);
              const tds = tr.querySelectorAll('td');
              if (tds[9]) {
                tds[9].textContent = cDiff;
                tds[9].className = `py-2 px-3 text-right font-mono font-bold ${Number(cDiff) < 0 ? 'text-red-500' : 'text-emerald-600'}`;
              }
              if (tds[10]) {
                tds[10].textContent = qDiff;
                tds[10].className = `py-2 px-3 text-right font-mono font-bold ${Number(qDiff) < 0 ? 'text-red-500' : 'text-emerald-600'}`;
              }
            }
          }
        });
      });

      tbody.querySelectorAll('.rm-row-del').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = btn.getAttribute('data-del-id');
          if (confirm('Delete this RM Inward record?')) {
            this.rmReceivedList = this.rmReceivedList.filter(x => x.id !== id);
            renderRows(searchInput?.value || '');
            if (window.Toast) window.Toast.show('RM Inward line removed', 'info');
          }
        });
      });
    };

    renderRows();

    searchInput?.addEventListener('input', (e) => renderRows(e.target.value));

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (window.Toast) window.Toast.show('RM Received Track ID batch saved successfully!', 'success');
    });

    exportBtn?.addEventListener('click', () => {
      const headers = ["S.No", "Bill No", "Variety", "Billed Count", "Head on Weight", "Recv Count", "Recv Weight", "Sample HO Qty", "No Of Pcs", "Count Diff", "Qty Diff"];
      const rows = this.rmReceivedList.map((r, i) => [
        i + 1,
        `"${r.billNo || ''}"`,
        `"${r.variety || ''}"`,
        r.count || 0,
        r.headonWeight || 0,
        r.recvCount || 0,
        r.recvWeight || 0,
        r.sampleHoQty || 0,
        r.noOfPcs || 0,
        Number((r.recvCount || 0) - (r.count || 0)).toFixed(0),
        Number((r.recvWeight || 0) - (r.headonWeight || 0)).toFixed(0)
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `rm_received_trackid_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (window.Toast) window.Toast.show('RM Received report exported to CSV', 'success');
    });
  },

  initDeheadingStorage() {
    try {
      const stored = localStorage.getItem('dfl_deheading_logs');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.deheadingLogsList = parsed;
        }
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }
  },

  renderDeheading(container) {
    this.initDeheadingStorage();
    let editRecordId = null;

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">DEHEADING</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Operations &bull; Daily Floor Log & Recovery Entry</span>
        </div>

        <!-- Upper Card: Entry Form -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form id="deheading-form" class="space-y-4">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL DATE</label>
                <input type="date" id="dh-arrival-date" value="2026-10-23" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL/LOT CODE <span class="text-red-500 font-bold">*</span></label>
                <select id="dh-lot-code" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="VM-VSP-AMP-056">VM-VSP-AMP-056 (Vannamei - Pond 4A)</option>
                  <option value="BT-KKD-MKP-043">BT-KKD-MKP-043 (Black Tiger - Pond 12)</option>
                  <option value="VM-PSP-BVR-078">VM-PSP-BVR-078 (Vannamei - Pond 2B)</option>
                  <option value="LOT-2026-OCT-095">LOT-2026-OCT-095 (Fresh Harvest)</option>
                  <option value="LOT-2026-OCT-099">LOT-2026-OCT-099 (Premium Lot)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-red-500 font-bold">*</span></label>
                <select id="dh-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                  <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                  <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                  <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">DE HEADING STATION <span class="text-red-500 font-bold">*</span></label>
                <select id="dh-station" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="Own Center">Own Center</option>
                  <option value="Outside Center">Outside Center</option>
                  <option value="Center 1">Center 1</option>
                  <option value="Center 2">Center 2</option>
                  <option value="Station 1">Station 1</option>
                  <option value="Station 2">Station 2</option>
                </select>
              </div>
            </div>

            <!-- Row 2: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">DE HEADING DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="dh-deheading-date" value="2026-10-23" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT SHIFT <span class="text-red-500 font-bold">*</span></label>
                <select id="dh-shift" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="A SHIFT">A SHIFT</option>
                  <option value="B SHIFT">B SHIFT</option>
                  <option value="C SHIFT">C SHIFT</option>
                  <option value="Day Shift">Day Shift</option>
                  <option value="Night Shift">Night Shift</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SUPERVISOR <span class="text-red-500 font-bold">*</span></label>
                <select id="dh-supervisor" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="K VENKATA VINAY">K VENKATA VINAY</option>
                  <option value="T.VENKATESH">T.VENKATESH</option>
                  <option value="D.SURYA NARAYANA">D.SURYA NARAYANA</option>
                  <option value="M. NAGESH">M. NAGESH</option>
                  <option value="B. VENKATESH">B. VENKATESH</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HON COUNT AFTER CHECKING ( COUNT-2 ) <span class="text-red-500 font-bold">*</span></label>
                <input type="number" step="0.1" id="dh-checking-count-2" placeholder="e.g. 48" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Row 3: 4 Columns (4th empty) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SAMPLE YIELD(%)</label>
                <input type="number" step="0.01" id="dh-sample-yield" placeholder="e.g. 67.2" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ICE CONSUMPTION</label>
                <input type="number" step="0.1" id="dh-ice-consumption" placeholder="e.g. 450" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REMARKS</label>
                <input type="text" id="dh-remarks" placeholder="Enter Remarks(Optional)" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div class="hidden lg:block"></div>
            </div>

            <!-- Row 4: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HON QUANTITY(KGS) <span class="text-red-500 font-bold">*</span></label>
                <input type="number" step="0.01" id="dh-hon-qty" placeholder="e.g. 4250" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HL COUNT (PER KG) <span class="text-red-500 font-bold">*</span></label>
                <input type="number" step="0.1" id="dh-hl-count" placeholder="e.g. 32" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HL QUANTITY(KGS) <span class="text-red-500 font-bold">*</span></label>
                <input type="number" step="0.01" id="dh-hl-qty" placeholder="e.g. 2847.5" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HON COUNT (PER KG)</label>
                <input type="number" step="0.1" id="dh-hon-count" placeholder="e.g. 48" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center justify-center gap-3 pt-3">
              <button type="button" id="dh-btn-new" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
                New
              </button>
              <button type="submit" id="dh-btn-save" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Save
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Register Table -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <!-- Filter & Export Toolbar -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </div>
  <input type="text" id="dh-table-search" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
</div>
            <button type="button" id="dh-btn-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <!-- Table Container with Horizontal Scroll -->
          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.No</th>
                  <th class="py-2.5 px-3">Arrival Code</th>
                  <th class="py-2.5 px-3">Production Plant</th>
                  <th class="py-2.5 px-3">Center</th>
                  <th class="py-2.5 px-3">De Heading Date</th>
                  <th class="py-2.5 px-3">Shift</th>
                  <th class="py-2.5 px-3">Supervisor</th>
                  <th class="py-2.5 px-3 text-right">Checking Count-2</th>
                  <th class="py-2.5 px-3 text-right">HL Count</th>
                  <th class="py-2.5 px-3 text-right">HON Count</th>
                  <th class="py-2.5 px-3 text-right">HON Quantity(Kgs)</th>
                  <th class="py-2.5 px-3 text-right">HL Quantity(Kgs)</th>
                  <th class="py-2.5 px-3 text-right">Count Net Yield(%)</th>
                  <th class="py-2.5 px-3 text-right">Yield(%)</th>
                  <th class="py-2.5 px-3 text-right">Ice Consumption</th>
                  <th class="py-2.5 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="dh-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>

          <!-- Quick Totals Bar -->
          <div id="dh-table-totals" class="mt-4 pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 text-xs text-[#64748B]">
          </div>
        </div>
      </div>
    `;

    const form = document.getElementById('deheading-form');
    const tbody = document.getElementById('dh-table-body');
    const totalsEl = document.getElementById('dh-table-totals');
    const searchInput = document.getElementById('dh-table-search');
    const saveBtn = document.getElementById('dh-btn-save');
    const newBtn = document.getElementById('dh-btn-new');
    const exportBtn = document.getElementById('dh-btn-export-excel');

    // Auto-calculate sample yield when HON & HL Qty entered
    const honQtyInput = document.getElementById('dh-hon-qty');
    const hlQtyInput = document.getElementById('dh-hl-qty');
    const sampleYieldInput = document.getElementById('dh-sample-yield');

    const updateYieldCalculation = () => {
      const hon = parseFloat(honQtyInput.value) || 0;
      const hl = parseFloat(hlQtyInput.value) || 0;
      if (hon > 0 && hl > 0) {
        const y = ((hl / hon) * 100).toFixed(2);
        if (!sampleYieldInput.value || parseFloat(sampleYieldInput.value) === 0) {
          sampleYieldInput.value = y;
        }
      }
    };

    honQtyInput?.addEventListener('input', updateYieldCalculation);
    hlQtyInput?.addEventListener('input', updateYieldCalculation);

    // Render Table Rows
    const renderTable = (query = '') => {
      const q = query.toLowerCase().trim();
      const filtered = this.deheadingLogsList.filter(r => {
        if (!q) return true;
        const text = `${r.lotCode || ''} ${r.plant || ''} ${r.center || r.station || ''} ${r.shift || ''} ${r.supervisor || ''} ${r.deheadingDate || r.date || ''}`.toLowerCase();
        return text.includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="16" class="text-center py-8 text-[#94A3B8] text-xs font-medium">No data available in table</td>
          </tr>
        `;
        totalsEl.innerHTML = `<span>Showing 0 records</span>`;
        return;
      }

      let totalHon = 0;
      let totalHl = 0;
      let totalIce = 0;

      tbody.innerHTML = filtered.map((r, idx) => {
        const hon = parseFloat(r.honQty || r.headonWeight || 0);
        const hl = parseFloat(r.hlQty || r.deheadedWeight || 0);
        const ice = parseFloat(r.iceConsumption || r.iceKgs || 0);
        const y = parseFloat(r.yieldPct || (hon > 0 ? (hl / hon) * 100 : 0));
        const cny = parseFloat(r.countNetYield || y);

        totalHon += hon;
        totalHl += hl;
        totalIce += ice;

        return `
          <tr class="hover:bg-[#F8FAFC] transition-colors">
            <td class="py-2.5 px-3 font-bold text-[#64748B]">${idx + 1}</td>
            <td class="py-2.5 px-3 font-bold text-[#0F172A]">${r.lotCode || '-'}</td>
            <td class="py-2.5 px-3 text-[#334155]">${r.plant || '-'}</td>
            <td class="py-2.5 px-3 text-[#334155]">${r.center || r.station || '-'}</td>
            <td class="py-2.5 px-3 text-[#334155]">${r.deheadingDate || r.date || '-'}</td>
            <td class="py-2.5 px-3 font-medium text-[#1E293B]">${r.shift || '-'}</td>
            <td class="py-2.5 px-3 text-[#334155]">${r.supervisor || '-'}</td>
            <td class="py-2.5 px-3 text-right font-medium text-[#334155]">${r.checkingCount2 || '-'}</td>
            <td class="py-2.5 px-3 text-right font-medium text-[#334155]">${r.hlCount || '-'}</td>
            <td class="py-2.5 px-3 text-right font-medium text-[#334155]">${r.honCount || '-'}</td>
            <td class="py-2.5 px-3 text-right font-bold text-[#0F172A]">${hon.toLocaleString()}</td>
            <td class="py-2.5 px-3 text-right font-bold text-[#006644]">${hl.toLocaleString()}</td>
            <td class="py-2.5 px-3 text-right font-mono font-medium text-[#006C7A]">${cny.toFixed(2)}%</td>
            <td class="py-2.5 px-3 text-right">
              <span class="px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-[#E3FCEF] text-[#006644]">${y.toFixed(2)}%</span>
            </td>
            <td class="py-2.5 px-3 text-right text-[#334155]">${ice.toLocaleString()}</td>
            <td class="py-2.5 px-3 text-center">
              <div class="flex items-center justify-center gap-1.5">
                <button type="button" data-edit-id="${r.id}" class="dh-row-edit p-1 text-[#02a8b5] hover:text-[#008f9a] hover:bg-[#F0FDFA] rounded cursor-pointer" title="Edit Entry">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </button>
                <button type="button" data-del-id="${r.id}" class="dh-row-del p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer" title="Delete Entry">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      const avgYield = totalHon > 0 ? (totalHl / totalHon) * 100 : 0;
      totalsEl.innerHTML = `
        <div class="flex items-center gap-4 flex-wrap">
          <span>Total Records: <strong class="text-[#0F172A]">${filtered.length}</strong></span>
          <span>Total HON: <strong class="text-[#0F172A]">${totalHon.toLocaleString()} KGS</strong></span>
          <span>Total HLSO: <strong class="text-[#006644]">${totalHl.toLocaleString()} KGS</strong></span>
          <span>Floor Yield: <strong class="text-[#006644]">${avgYield.toFixed(2)}%</strong></span>
          <span>Total Ice: <strong class="text-[#0F172A]">${totalIce.toLocaleString()} KGS</strong></span>
        </div>
        <div class="text-[11px] text-[#94A3B8]">DFL Pre-Processing Unit &bull; Live Telemetry</div>
      `;

      // Attach edit / delete listeners
      tbody.querySelectorAll('.dh-row-edit').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-edit-id');
          const rec = this.deheadingLogsList.find(x => x.id === id);
          if (rec) this.openDeheadingModal(rec);
        });
      });

      tbody.querySelectorAll('.dh-row-del').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = btn.getAttribute('data-del-id');
          if (confirm('Are you sure you want to delete this deheading operation record?')) {
            this.deheadingLogsList = this.deheadingLogsList.filter(x => x.id !== id);
            try {
              localStorage.setItem('dfl_deheading_logs', JSON.stringify(this.deheadingLogsList));
            } catch (err) {}
            renderTable(searchInput?.value || '');
            if (window.Toast) window.Toast.show('Deheading record deleted', 'info');
          }
        });
      });
    };

    renderTable();

    // Search Filter
    searchInput?.addEventListener('input', (e) => {
      renderTable(e.target.value);
    });

    // Reset / + New button
    newBtn?.addEventListener('click', () => {
      form.reset();
      editRecordId = null;
      document.getElementById('dh-arrival-date').value = '2026-10-23';
      document.getElementById('dh-deheading-date').value = '2026-10-23';
      saveBtn.textContent = 'Save';
      if (window.Toast) window.Toast.show('Ready to create new deheading entry', 'info');
    });

    // Form Submission: Save / Update
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const honQty = parseFloat(document.getElementById('dh-hon-qty').value) || 0;
      const hlQty = parseFloat(document.getElementById('dh-hl-qty').value) || 0;
      const yieldPct = honQty > 0 ? Number(((hlQty / honQty) * 100).toFixed(2)) : 0;
      const honCount = parseFloat(document.getElementById('dh-hon-count').value) || 0;
      const hlCount = parseFloat(document.getElementById('dh-hl-count').value) || 0;
      const sampleYield = parseFloat(document.getElementById('dh-sample-yield').value) || yieldPct;
      const countNetYield = Number((yieldPct * (honCount && hlCount ? (honCount / hlCount) * 0.98 : 1)).toFixed(2));

      if (editRecordId) {
        const item = this.deheadingLogsList.find(x => x.id === editRecordId);
        if (item) {
          item.arrivalDate = document.getElementById('dh-arrival-date').value;
          item.lotCode = document.getElementById('dh-lot-code').value;
          item.plant = document.getElementById('dh-plant').value;
          item.center = document.getElementById('dh-station').value;
          item.station = document.getElementById('dh-station').value;
          item.deheadingDate = document.getElementById('dh-deheading-date').value;
          item.date = document.getElementById('dh-deheading-date').value;
          item.shift = document.getElementById('dh-shift').value;
          item.supervisor = document.getElementById('dh-supervisor').value;
          item.checkingCount2 = document.getElementById('dh-checking-count-2').value;
          item.sampleYield = sampleYield;
          item.iceConsumption = parseFloat(document.getElementById('dh-ice-consumption').value) || 0;
          item.iceKgs = item.iceConsumption;
          item.remarks = document.getElementById('dh-remarks').value;
          item.honQty = honQty;
          item.headonWeight = honQty;
          item.hlCount = hlCount;
          item.hlQty = hlQty;
          item.deheadedWeight = hlQty;
          item.honCount = honCount;
          item.countNetYield = countNetYield;
          item.yieldPct = yieldPct;
        }
        editRecordId = null;
        saveBtn.textContent = 'Save';
        if (window.Toast) window.Toast.show('Deheading entry updated successfully!', 'success');
      } else {
        const newRecord = {
          id: 'DH-' + String(Date.now()).slice(-6),
          sNo: this.deheadingLogsList.length + 1,
          arrivalDate: document.getElementById('dh-arrival-date').value,
          lotCode: document.getElementById('dh-lot-code').value,
          plant: document.getElementById('dh-plant').value,
          center: document.getElementById('dh-station').value,
          station: document.getElementById('dh-station').value,
          deheadingDate: document.getElementById('dh-deheading-date').value,
          date: document.getElementById('dh-deheading-date').value,
          shift: document.getElementById('dh-shift').value,
          supervisor: document.getElementById('dh-supervisor').value,
          checkingCount2: document.getElementById('dh-checking-count-2').value,
          sampleYield: sampleYield,
          iceConsumption: parseFloat(document.getElementById('dh-ice-consumption').value) || 0,
          iceKgs: parseFloat(document.getElementById('dh-ice-consumption').value) || 0,
          remarks: document.getElementById('dh-remarks').value,
          honQty: honQty,
          headonWeight: honQty,
          hlCount: hlCount,
          hlQty: hlQty,
          deheadedWeight: hlQty,
          honCount: honCount,
          countNetYield: countNetYield,
          yieldPct: yieldPct,
          status: 'Completed'
        };
        this.deheadingLogsList.unshift(newRecord);
        if (window.Toast) window.Toast.show(`Deheading entry for ${newRecord.lotCode} saved successfully!`, 'success');
      }

      try {
        localStorage.setItem('dfl_deheading_logs', JSON.stringify(this.deheadingLogsList));
      } catch (err) {}

      form.reset();
      document.getElementById('dh-arrival-date').value = '2026-10-23';
      document.getElementById('dh-deheading-date').value = '2026-10-23';
      renderTable(searchInput?.value || '');
    });

    // Excel Export
    exportBtn?.addEventListener('click', () => {
      const headers = [
        "S.No", "Arrival Code", "Production Plant", "Center", "De Heading Date", "Shift",
        "Supervisor", "Checking Count-2", "HL Count", "HON Count", "HON Quantity(Kgs)",
        "HL Quantity(Kgs)", "Count Net Yield(%)", "Yield(%)", "Ice Consumption", "Remarks"
      ];
      const rows = this.deheadingLogsList.map((r, i) => [
        i + 1,
        `"${r.lotCode || ''}"`,
        `"${r.plant || ''}"`,
        `"${r.center || r.station || ''}"`,
        `"${r.deheadingDate || r.date || ''}"`,
        `"${r.shift || ''}"`,
        `"${r.supervisor || ''}"`,
        `"${r.checkingCount2 || ''}"`,
        `"${r.hlCount || ''}"`,
        `"${r.honCount || ''}"`,
        r.honQty || r.headonWeight || 0,
        r.hlQty || r.deheadedWeight || 0,
        (r.countNetYield || r.yieldPct || 0).toFixed(2),
        (r.yieldPct || 0).toFixed(2),
        r.iceConsumption || r.iceKgs || 0,
        `"${(r.remarks || '').replace(/"/g, '""')}"`
      ]);

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `deheading_operations_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (window.Toast) window.Toast.show('Excel CSV export downloaded!', 'success');
    });
  },

  initGradingStorage() {
    try {
      const stored = localStorage.getItem('dfl_grading_logs');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.gradingLogsList = parsed;
        }
      }
    } catch (e) {
      console.warn('Grading storage read error:', e);
    }
  },

  renderGrading(container) {
    this.initGradingStorage();
    let selectedRecordId = null;

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">GRADING</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Operations &bull; Grading Machine Run Log</span>
        </div>

        <!-- Upper Card: Entry Form -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form id="grading-form" class="space-y-4">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="gr-arrival-date" value="2025-03-23" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL/LOT CODE <span class="text-red-500 font-bold">*</span></label>
                <div class="relative">
                  <select id="gr-lot-code" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                    <option value="SKM/2425/1755">SKM/2425/1755 - 47.00 - 87.000</option>
                    <option value="VM-VSP-AMP-056">VM-VSP-AMP-056 - 48.00 - 67.000</option>
                    <option value="BT-KKD-MKP-043">BT-KKD-MKP-043 - 52.00 - 65.000</option>
                    <option value="VM-PSP-BVR-078">VM-PSP-BVR-078 - 44.00 - 68.000</option>
                    <option value="LOT-2026-OCT-095">LOT-2026-OCT-095 - Fresh Harvest</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-red-500 font-bold">*</span></label>
                <select id="gr-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="DFL UNIT-6 [JPT-II]" selected>JPT-II</option>
                  <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                  <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                  <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                  <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">GRADING STATION <span class="text-red-500 font-bold">*</span></label>
                <select id="gr-station" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="Own Center" selected>Own Center</option>
                  <option value="Outside Center">Outside Center</option>
                  <option value="Station 1">Station 1</option>
                  <option value="Station 2">Station 2</option>
                </select>
              </div>
            </div>

            <!-- Row 2: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">GRADING DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="gr-grading-date" value="2025-03-23" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">GRADING MACHINE <span class="text-red-500 font-bold">*</span></label>
                <select id="gr-machine" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="Unit -6 Laitram Grading Machine" selected>Unit -6 Laitram Grading Machine</option>
                  <option value="Unit -1 Sort-Rite Machine">Unit -1 Sort-Rite Machine</option>
                  <option value="Unit -2 Key Tech Grader">Unit -2 Key Tech Grader</option>
                  <option value="Station Grader 03">Station Grader 03</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">START TIME <span class="text-red-500 font-bold">*</span></label>
                <input type="time" id="gr-start-time" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">END TIME <span class="text-red-500 font-bold">*</span></label>
                <input type="time" id="gr-end-time" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Row 3: 4 Columns (Columns 3 & 4 empty) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BREAK TIME(MINUTES) <span class="text-red-500 font-bold">*</span></label>
                <input type="number" id="gr-break-time" placeholder="Enter Break Time" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REMARKS</label>
                <input type="text" id="gr-remarks" placeholder="Enter Remarks(Optional)" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div class="hidden lg:block"></div>
              <div class="hidden lg:block"></div>
            </div>

            <!-- Row 4: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SELECT VARIETY <span class="text-red-500 font-bold">*</span></label>
                <select id="gr-variety" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="VM-HLSO" selected>VM-HLSO</option>
                  <option value="BT-HLSO">BT-HLSO</option>
                  <option value="SEA-HLSO">SEA-HLSO</option>
                  <option value="HOSO-GRADE">HOSO-GRADE</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HL COUNT(PER LB)</label>
                <input type="number" step="0.01" id="gr-hl-count" placeholder="Enter HL Count" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HL WEIGHT(KGS)</label>
                <input type="number" step="0.01" id="gr-hl-weight" placeholder="Enter HL Weight(Kgs)" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">NO OF CRATES</label>
                <input type="number" id="gr-no-crates" placeholder="Enter No Of Crates" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Action Buttons: + New, Save, Delete -->
            <div class="flex items-center justify-center gap-3 pt-3">
              <button type="button" id="gr-btn-new" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
                New
              </button>
              <button type="submit" id="gr-btn-save" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Save
              </button>
              <button type="button" id="gr-btn-delete" class="px-5 py-2 bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                Delete
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Register Table -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <!-- Filter & Export Toolbar -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </div>
  <input type="text" id="gr-table-search" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
</div>
            <button type="button" id="gr-btn-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <!-- Table Container with Horizontal Scroll -->
          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.No</th>
                  <th class="py-2.5 px-3">Transaction Date</th>
                  <th class="py-2.5 px-3">Arrival Code</th>
                  <th class="py-2.5 px-3">Production Plant</th>
                  <th class="py-2.5 px-3">Center</th>
                  <th class="py-2.5 px-3">Grading Machine</th>
                  <th class="py-2.5 px-3">Start Time</th>
                  <th class="py-2.5 px-3">End Time</th>
                  <th class="py-2.5 px-3 text-right">Break Time(Minutes)</th>
                  <th class="py-2.5 px-3 text-right">HL Count</th>
                  <th class="py-2.5 px-3 text-right">HL Weight</th>
                  <th class="py-2.5 px-3 text-right">No Of Crates</th>
                  <th class="py-2.5 px-3">Remarks</th>
                  <th class="py-2.5 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="gr-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>

          <!-- Quick Totals Bar -->
          <div id="gr-table-totals" class="mt-4 pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 text-xs text-[#64748B]">
          </div>
        </div>
      </div>
    `;

    const form = document.getElementById('grading-form');
    const tbody = document.getElementById('gr-table-body');
    const totalsEl = document.getElementById('gr-table-totals');
    const searchInput = document.getElementById('gr-table-search');
    const saveBtn = document.getElementById('gr-btn-save');
    const newBtn = document.getElementById('gr-btn-new');
    const deleteBtn = document.getElementById('gr-btn-delete');
    const exportBtn = document.getElementById('gr-btn-export-excel');

    // Render Table Rows
    const renderTable = (query = '') => {
      const q = query.toLowerCase().trim();
      const filtered = this.gradingLogsList.filter(r => {
        if (!q) return true;
        const text = `${r.lotCode || ''} ${r.plant || ''} ${r.center || r.station || ''} ${r.gradingMachine || ''} ${r.transactionDate || r.date || ''} ${r.remarks || ''}`.toLowerCase();
        return text.includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="14" class="text-center py-8 text-[#94A3B8] text-xs font-medium">No data available in table</td>
          </tr>
        `;
        totalsEl.innerHTML = `<span>Showing 0 records</span>`;
        return;
      }

      let totalWeight = 0;
      let totalCrates = 0;

      tbody.innerHTML = filtered.map((r, idx) => {
        const wt = parseFloat(r.hlWeight || r.gradedWeight || 0);
        const crates = parseInt(r.noOfCrates || 0, 10);
        totalWeight += wt;
        totalCrates += crates;

        return `
          <tr class="hover:bg-[#F8FAFC] transition-colors cursor-pointer gr-table-row ${selectedRecordId === r.id ? 'bg-[#F0FDFA]' : ''}" data-id="${r.id}">
            <td class="py-2.5 px-3 font-bold text-[#64748B]">${idx + 1}</td>
            <td class="py-2.5 px-3 text-[#334155]">${r.transactionDate || r.date || '23-03-2025'}</td>
            <td class="py-2.5 px-3 font-bold text-[#0F172A]">${r.lotCode || '-'}</td>
            <td class="py-2.5 px-3 text-[#334155]">${r.plant || '-'}</td>
            <td class="py-2.5 px-3 text-[#334155]">${r.center || ''}</td>
            <td class="py-2.5 px-3 text-[#334155]">${r.gradingMachine || '-'}</td>
            <td class="py-2.5 px-3 text-[#64748B]">${r.startTime || ''}</td>
            <td class="py-2.5 px-3 text-[#64748B]">${r.endTime || ''}</td>
            <td class="py-2.5 px-3 text-right text-[#64748B]">${r.breakTime || ''}</td>
            <td class="py-2.5 px-3 text-right font-medium text-[#334155]">${Number(r.hlCount || 0).toFixed(2)}</td>
            <td class="py-2.5 px-3 text-right font-bold text-[#006644]">${wt.toFixed(2)}</td>
            <td class="py-2.5 px-3 text-right font-medium text-[#334155]">${crates}</td>
            <td class="py-2.5 px-3 text-[#64748B]">${r.remarks || ''}</td>
            <td class="py-2.5 px-3 text-center">
              <button type="button" data-del-id="${r.id}" class="gr-row-del p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer" title="Delete Row">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </td>
          </tr>
        `;
      }).join('');

      totalsEl.innerHTML = `
        <div class="flex items-center gap-4 flex-wrap">
          <span>Total Records: <strong class="text-[#0F172A]">${filtered.length}</strong></span>
          <span>Total HL Weight: <strong class="text-[#006644]">${totalWeight.toFixed(2)} KGS</strong></span>
          <span>Total Crates: <strong class="text-[#0F172A]">${totalCrates}</strong></span>
        </div>
        <div class="text-[11px] text-[#94A3B8]">DFL Pre-Processing Unit &bull; Laitram Sizing Line</div>
      `;

      // Row Click -> Load into Form
      tbody.querySelectorAll('.gr-table-row').forEach(tr => {
        tr.addEventListener('click', (e) => {
          if (e.target.closest('.gr-row-del')) return;
          const id = tr.getAttribute('data-id');
          const rec = this.gradingLogsList.find(x => x.id === id);
          if (rec) {
            selectedRecordId = rec.id;
            document.getElementById('gr-arrival-date').value = rec.arrivalDate || '2025-03-23';
            document.getElementById('gr-lot-code').value = rec.lotCode || '';
            document.getElementById('gr-plant').value = rec.plant || 'DFL UNIT-6 [JPT-II]';
            document.getElementById('gr-station').value = rec.station || 'Own Center';
            document.getElementById('gr-grading-date').value = rec.date || '2025-03-23';
            document.getElementById('gr-machine').value = rec.gradingMachine || 'Unit -6 Laitram Grading Machine';
            document.getElementById('gr-start-time').value = rec.startTime || '';
            document.getElementById('gr-end-time').value = rec.endTime || '';
            document.getElementById('gr-break-time').value = rec.breakTime || '';
            document.getElementById('gr-remarks').value = rec.remarks || '';
            document.getElementById('gr-variety').value = rec.variety || 'VM-HLSO';
            document.getElementById('gr-hl-count').value = rec.hlCount || '';
            document.getElementById('gr-hl-weight').value = rec.hlWeight || rec.gradedWeight || '';
            document.getElementById('gr-no-crates').value = rec.noOfCrates || '';

            saveBtn.textContent = 'Update Entry';
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            renderTable(searchInput?.value || '');
            if (window.Toast) window.Toast.show(`Loaded grading log #${rec.sNo}`, 'info');
          }
        });
      });

      // Row Delete
      tbody.querySelectorAll('.gr-row-del').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-del-id');
          if (confirm('Are you sure you want to delete this grading record?')) {
            this.gradingLogsList = this.gradingLogsList.filter(x => x.id !== id);
            try {
              localStorage.setItem('dfl_grading_logs', JSON.stringify(this.gradingLogsList));
            } catch (err) {}
            if (selectedRecordId === id) {
              selectedRecordId = null;
              form.reset();
              saveBtn.textContent = 'Save';
            }
            renderTable(searchInput?.value || '');
            if (window.Toast) window.Toast.show('Grading entry deleted', 'info');
          }
        });
      });
    };

    renderTable();

    // Search Filter
    searchInput?.addEventListener('input', (e) => {
      renderTable(e.target.value);
    });

    // Reset / + New button
    newBtn?.addEventListener('click', () => {
      form.reset();
      selectedRecordId = null;
      document.getElementById('gr-arrival-date').value = '2025-03-23';
      document.getElementById('gr-grading-date').value = '2025-03-23';
      document.getElementById('gr-plant').value = 'DFL UNIT-6 [JPT-II]';
      document.getElementById('gr-station').value = 'Own Center';
      document.getElementById('gr-machine').value = 'Unit -6 Laitram Grading Machine';
      document.getElementById('gr-variety').value = 'VM-HLSO';
      saveBtn.textContent = 'Save';
      renderTable(searchInput?.value || '');
      if (window.Toast) window.Toast.show('Ready to create new grading run', 'info');
    });

    // Delete button in Form
    deleteBtn?.addEventListener('click', () => {
      if (!selectedRecordId) {
        if (window.Toast) window.Toast.show('Please select a row from the table to delete', 'warning');
        return;
      }
      if (confirm('Are you sure you want to delete the selected grading record?')) {
        this.gradingLogsList = this.gradingLogsList.filter(x => x.id !== selectedRecordId);
        try {
          localStorage.setItem('dfl_grading_logs', JSON.stringify(this.gradingLogsList));
        } catch (err) {}
        selectedRecordId = null;
        form.reset();
        saveBtn.textContent = 'Save';
        renderTable(searchInput?.value || '');
        if (window.Toast) window.Toast.show('Grading entry deleted', 'info');
      }
    });

    // Form Submission: Save / Update
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const hlCount = parseFloat(document.getElementById('gr-hl-count').value) || 0;
      const hlWeight = parseFloat(document.getElementById('gr-hl-weight').value) || 0;
      const noOfCrates = parseInt(document.getElementById('gr-no-crates').value, 10) || 0;
      const breakTime = document.getElementById('gr-break-time').value;
      const remarks = document.getElementById('gr-remarks').value;
      const startTime = document.getElementById('gr-start-time').value;
      const endTime = document.getElementById('gr-end-time').value;

      if (selectedRecordId) {
        const item = this.gradingLogsList.find(x => x.id === selectedRecordId);
        if (item) {
          item.arrivalDate = document.getElementById('gr-arrival-date').value;
          item.transactionDate = item.arrivalDate.split('-').reverse().join('-');
          item.lotCode = document.getElementById('gr-lot-code').value;
          item.plant = document.getElementById('gr-plant').value;
          item.station = document.getElementById('gr-station').value;
          item.date = document.getElementById('gr-grading-date').value;
          item.gradingMachine = document.getElementById('gr-machine').value;
          item.startTime = startTime;
          item.endTime = endTime;
          item.breakTime = breakTime;
          item.variety = document.getElementById('gr-variety').value;
          item.hlCount = hlCount.toFixed(2);
          item.dominantCount = item.hlCount;
          item.hlWeight = hlWeight.toFixed(2);
          item.gradedWeight = hlWeight;
          item.noOfCrates = noOfCrates;
          item.remarks = remarks;
        }
        selectedRecordId = null;
        saveBtn.textContent = 'Save';
        if (window.Toast) window.Toast.show('Grading entry updated successfully!', 'success');
      } else {
        const rawDate = document.getElementById('gr-grading-date').value || '2025-03-23';
        const formattedDate = rawDate.split('-').reverse().join('-');
        const newRecord = {
          id: 'GR-' + String(Date.now()).slice(-6),
          sNo: this.gradingLogsList.length + 1,
          transactionDate: formattedDate,
          date: rawDate,
          arrivalDate: document.getElementById('gr-arrival-date').value,
          lotCode: document.getElementById('gr-lot-code').value,
          plant: document.getElementById('gr-plant').value,
          center: '',
          station: document.getElementById('gr-station').value,
          gradingMachine: document.getElementById('gr-machine').value,
          startTime: startTime,
          endTime: endTime,
          breakTime: breakTime,
          variety: document.getElementById('gr-variety').value,
          hlCount: hlCount.toFixed(2),
          dominantCount: hlCount.toFixed(2),
          hlWeight: hlWeight.toFixed(2),
          gradedWeight: hlWeight,
          noOfCrates: noOfCrates,
          remarks: remarks,
          status: 'Approved'
        };
        this.gradingLogsList.push(newRecord);
        if (window.Toast) window.Toast.show(`Grading entry for ${newRecord.lotCode} saved successfully!`, 'success');
      }

      try {
        localStorage.setItem('dfl_grading_logs', JSON.stringify(this.gradingLogsList));
      } catch (err) {}

      form.reset();
      document.getElementById('gr-arrival-date').value = '2025-03-23';
      document.getElementById('gr-grading-date').value = '2025-03-23';
      document.getElementById('gr-plant').value = 'DFL UNIT-6 [JPT-II]';
      document.getElementById('gr-station').value = 'Own Center';
      document.getElementById('gr-machine').value = 'Unit -6 Laitram Grading Machine';
      document.getElementById('gr-variety').value = 'VM-HLSO';
      renderTable(searchInput?.value || '');
    });

    // Excel Export
    exportBtn?.addEventListener('click', () => {
      const headers = [
        "S.No", "Transaction Date", "Arrival Code", "Production Plant", "Center",
        "Grading Machine", "Start Time", "End Time", "Break Time(Minutes)", "HL Count",
        "HL Weight", "No Of Crates", "Remarks"
      ];
      const rows = this.gradingLogsList.map((r, i) => [
        i + 1,
        `"${r.transactionDate || r.date || ''}"`,
        `"${r.lotCode || ''}"`,
        `"${r.plant || ''}"`,
        `"${r.center || ''}"`,
        `"${r.gradingMachine || ''}"`,
        `"${r.startTime || ''}"`,
        `"${r.endTime || ''}"`,
        `"${r.breakTime || ''}"`,
        `"${r.hlCount || ''}"`,
        `"${r.hlWeight || r.gradedWeight || ''}"`,
        `"${r.noOfCrates || ''}"`,
        `"${(r.remarks || '').replace(/"/g, '""')}"`
      ]);

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `grading_operations_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (window.Toast) window.Toast.show('Excel CSV export downloaded!', 'success');
    });
  },

  renderDeheadingTrackid(container) {
    if (!this.deheadingTrackidList || this.deheadingTrackidList.length === 0) {
      this.deheadingTrackidList = [
        { id: "DHT-01", sNo: 1, plant: "VSP-DFL UNIT-1 (VSP)", arrivalDate: "2026-10-23", trackId: "VM-VSP-AMP-056", deheadingDate: "2026-10-23", shift: "A SHIFT", supervisor: "K VENKATA VINAY", remarks: "Floor processing regular batch", status: "Active" },
        { id: "DHT-02", sNo: 2, plant: "KKD-DFL UNIT-2 (KKD)", arrivalDate: "2026-10-23", trackId: "BT-KKD-MKP-043", deheadingDate: "2026-10-23", shift: "B SHIFT", supervisor: "T.VENKATESH", remarks: "Chilled temp pass", status: "Active" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">DE-HEADING TRACKID</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Operations &bull; Track ID Assignment</span>
        </div>

        <!-- Upper Card: Entry Form -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form id="dht-form" class="space-y-4">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-red-500 font-bold">*</span></label>
                <select id="dht-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="VSP-DFL UNIT-1 (VSP)" selected>VSP-DFL UNIT-1 (VSP)</option>
                  <option value="KKD-DFL UNIT-2 (KKD)">KKD-DFL UNIT-2 (KKD)</option>
                  <option value="PSP-DFL UNIT-3 (PSP)">PSP-DFL UNIT-3 (PSP)</option>
                  <option value="JPT-DFL UNIT-5 (JPT)">JPT-DFL UNIT-5 (JPT)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="dht-arrival-date" value="2026-10-23" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TRACK ID <span class="text-red-500 font-bold">*</span></label>
                <select id="dht-track-id" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="VM-VSP-AMP-056" selected>VM-VSP-AMP-056</option>
                  <option value="BT-KKD-MKP-043">BT-KKD-MKP-043</option>
                  <option value="VM-PSP-BVR-078">VM-PSP-BVR-078</option>
                  <option value="LOT-2026-OCT-095">LOT-2026-OCT-095</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">DE HEADING DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="dht-dh-date" value="2026-10-23" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Row 2: 3 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SHIFT <span class="text-red-500 font-bold">*</span></label>
                <select id="dht-shift" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="A SHIFT" selected>A SHIFT</option>
                  <option value="B SHIFT">B SHIFT</option>
                  <option value="C SHIFT">C SHIFT</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SUPERVISOR <span class="text-red-500 font-bold">*</span></label>
                <select id="dht-supervisor" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="K VENKATA VINAY" selected>K VENKATA VINAY</option>
                  <option value="T.VENKATESH">T.VENKATESH</option>
                  <option value="D.SURYA NARAYANA">D.SURYA NARAYANA</option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REMARKS</label>
                <input type="text" id="dht-remarks" placeholder="Enter Remarks(Optional)" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Action Button -->
            <div class="flex items-center justify-center pt-2">
              <button type="submit" class="px-7 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Save
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Register Table -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </div>
  <input type="text" id="dht-search" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
</div>
            <button type="button" id="dht-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.No</th>
                  <th class="py-2.5 px-3">Production Plant</th>
                  <th class="py-2.5 px-3">Arrival Date</th>
                  <th class="py-2.5 px-3">Track ID</th>
                  <th class="py-2.5 px-3">De Heading Date</th>
                  <th class="py-2.5 px-3">Shift</th>
                  <th class="py-2.5 px-3">Supervisor</th>
                  <th class="py-2.5 px-3">Remarks</th>
                  <th class="py-2.5 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="dht-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('dht-table-body');
    const searchInput = document.getElementById('dht-search');
    const form = document.getElementById('dht-form');
    const exportBtn = document.getElementById('dht-export-excel');

    const renderTable = (query = '') => {
      const q = query.toLowerCase().trim();
      const filtered = this.deheadingTrackidList.filter(r => {
        if (!q) return true;
        return `${r.plant || ''} ${r.trackId || ''} ${r.shift || ''} ${r.supervisor || ''}`.toLowerCase().includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" class="text-center py-8 text-[#94A3B8] text-xs font-medium">No data available in table</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map((r, idx) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors">
          <td class="py-2.5 px-3 font-bold text-[#64748B]">${idx + 1}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.plant || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.arrivalDate || '-'}</td>
          <td class="py-2.5 px-3 font-bold text-[#0F172A]">${r.trackId || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.deheadingDate || '-'}</td>
          <td class="py-2.5 px-3 font-medium text-[#1E293B]">${r.shift || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.supervisor || '-'}</td>
          <td class="py-2.5 px-3 text-[#64748B]">${r.remarks || ''}</td>
          <td class="py-2.5 px-3 text-center">
            <div class="flex items-center justify-center gap-1.5">
              <button type="button" data-edit-id="${r.id}" class="dht-edit p-1 text-[#02a8b5] hover:text-[#008f9a] hover:bg-[#F0FDFA] rounded cursor-pointer" title="Edit Entry">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>
              <button type="button" data-del-id="${r.id}" class="dht-del p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer" title="Delete Entry">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.dht-edit').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-edit-id');
          const rec = this.deheadingTrackidList.find(x => x.id === id);
          if (rec) this.openDeheadingTrackidModal(rec);
        });
      });

      tbody.querySelectorAll('.dht-del').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-del-id');
          if (confirm('Delete this De-Heading Track ID record?')) {
            this.deheadingTrackidList = this.deheadingTrackidList.filter(x => x.id !== id);
            renderTable(searchInput?.value || '');
            if (window.Toast) window.Toast.show('Record deleted', 'info');
          }
        });
      });
    };

    renderTable();

    searchInput?.addEventListener('input', (e) => renderTable(e.target.value));

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const newRec = {
        id: 'DHT-' + String(Date.now()).slice(-6),
        sNo: this.deheadingTrackidList.length + 1,
        plant: document.getElementById('dht-plant').value,
        arrivalDate: document.getElementById('dht-arrival-date').value,
        trackId: document.getElementById('dht-track-id').value,
        deheadingDate: document.getElementById('dht-dh-date').value,
        shift: document.getElementById('dht-shift').value,
        supervisor: document.getElementById('dht-supervisor').value,
        remarks: document.getElementById('dht-remarks').value,
        status: 'Active'
      };
      this.deheadingTrackidList.unshift(newRec);
      renderTable(searchInput?.value || '');
      form.reset();
      document.getElementById('dht-arrival-date').value = '2026-10-23';
      document.getElementById('dht-dh-date').value = '2026-10-23';
      if (window.Toast) window.Toast.show(`De-heading track ID ${newRec.trackId} saved`, 'success');
    });

    exportBtn?.addEventListener('click', () => {
      const headers = ["S.No", "Production Plant", "Arrival Date", "Track ID", "De Heading Date", "Shift", "Supervisor", "Remarks"];
      const rows = this.deheadingTrackidList.map((r, i) => [
        i + 1,
        `"${r.plant || ''}"`,
        `"${r.arrivalDate || ''}"`,
        `"${r.trackId || ''}"`,
        `"${r.deheadingDate || ''}"`,
        `"${r.shift || ''}"`,
        `"${r.supervisor || ''}"`,
        `"${(r.remarks || '').replace(/"/g, '""')}"`
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `deheading_trackid_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (window.Toast) window.Toast.show('De-heading Track ID report exported to CSV', 'success');
    });
  },

  renderGradingTrackid(container) {
    if (!this.gradingTrackLines || this.gradingTrackLines.length === 0) {
      this.gradingTrackLines = [
        { id: "GTL-01", sNo: 1, variety: "VM-PVPD", hlCount: "55.00", grade: "51/60", treatment: "UNT", freezing: "BLOCK", crates: 1, gradingQty: "2.00", tubWeight: "" },
        { id: "GTL-02", sNo: 2, variety: "VM-HLSO-CHINA", hlCount: "67.00", grade: "61/70", treatment: "UNT", freezing: "BLOCK", crates: 9, gradingQty: "233.00", tubWeight: "" },
        { id: "GTL-03", sNo: 3, variety: "VM-RPD", hlCount: "68.00", grade: "61/70", treatment: "CTPD", freezing: "IQF", crates: 1, gradingQty: "15.00", tubWeight: "" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">GRADING TRACKID</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Operations &bull; Track-Level Grading with Dynamic Tabular Grid</span>
        </div>

        <!-- Upper Card: Entry Form with Multi-Lot Breakdown Box -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form id="gr-track-form" class="space-y-4">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-red-500 font-bold">*</span></label>
                <select id="gt-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="USHA-DFL UNIT-2 (KKD)" selected>USHA-DFL UNIT-2 (KKD)</option>
                  <option value="VSP-DFL UNIT-1 (VSP)">VSP-DFL UNIT-1 (VSP)</option>
                  <option value="PSP-DFL UNIT-3 (PSP)">PSP-DFL UNIT-3 (PSP)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="gt-arrival-date" value="2025-02-20" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TRACK ID <span class="text-red-500 font-bold">*</span></label>
                <select id="gt-track-id" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="VM-KKD-AMP-071" selected>VM-KKD-AMP-071</option>
                  <option value="VM-VSP-AMP-056">VM-VSP-AMP-056</option>
                  <option value="BT-KKD-MKP-043">BT-KKD-MKP-043</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">RECEIVING COUNT <span class="text-red-500 font-bold">*</span></label>
                <select id="gt-receiving-count" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="AMP/2425/4044 (121.000 - 713.000)" selected>AMP/2425/4044 (121.000 - 713.000)</option>
                  <option value="AMP/2425/4044 (119.000 - 696.800)">AMP/2425/4044 (119.000 - 696.800)</option>
                  <option value="AMP/2425/4044 (136.000 - 622.600)">AMP/2425/4044 (136.000 - 622.600)</option>
                  <option value="AMP/2425/4044 (122.000 - 735.000)">AMP/2425/4044 (122.000 - 735.000)</option>
                  <option value="AMP/2425/4044 (130.000 - 801.000)">AMP/2425/4044 (130.000 - 801.000)</option>
                  <option value="AMP/2425/4044 (115.000 - 729.000)">AMP/2425/4044 (115.000 - 729.000)</option>
                  <option value="AMP/2425/4044 (140.000 - 307.600)">AMP/2425/4044 (140.000 - 307.600)</option>
                  <option value="AMP/2425/4044 (142.000 - 818.000)">AMP/2425/4044 (142.000 - 818.000)</option>
                </select>
              </div>

              <!-- Row 2 (Columns 1 to 4) -->
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">GRADING DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="gt-grading-date" value="2025-02-20" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">GRADING MACHINE <span class="text-red-500 font-bold">*</span></label>
                <select id="gt-machine" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="Unit -2 Roller Grading Machine" selected>Unit -2 Roller Grading Machine</option>
                  <option value="Unit -6 Laitram Machine">Unit -6 Laitram Machine</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">START TIME</label>
                <input type="text" id="gt-start-time" value="09:00 AM" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">END TIME</label>
                <input type="text" id="gt-end-time" value="11:40 AM" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Row 3: 3 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BREAK TIME(MINUTES)</label>
                <input type="number" id="gt-break-time" placeholder="Enter Break Time" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SUPERVISOR <span class="text-red-500 font-bold">*</span></label>
                <select id="gt-supervisor" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="K VENKATA VINAY" selected>K VENKATA VINAY</option>
                  <option value="T.VENKATESH">T.VENKATESH</option>
                  <option value="S.BALA KRISHNA">S.BALA KRISHNA</option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REMARKS</label>
                <input type="text" id="gt-remarks" value="Good" placeholder="Enter Remarks" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Action Buttons: Save Grading, + Add Line, Delete -->
            <div class="flex items-center justify-center gap-3 pt-2">
              <button type="submit" id="gt-btn-save" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Save Grading
              </button>
              <button type="button" id="gt-btn-add-line" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
                Add Line
              </button>
              <button type="button" id="gt-btn-delete" class="px-5 py-2 bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                Delete
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Fully Editable Tabular Grid -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </div>
  <input type="text" id="gt-search" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
</div>
            <button type="button" id="gt-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">SNO</th>
                  <th class="py-2.5 px-3">Variety</th>
                  <th class="py-2.5 px-3">HL_Count (Per Lb)</th>
                  <th class="py-2.5 px-3">Grade</th>
                  <th class="py-2.5 px-3">Treatment</th>
                  <th class="py-2.5 px-3">Freezing</th>
                  <th class="py-2.5 px-3 text-right">No Of Crates</th>
                  <th class="py-2.5 px-3 text-right">Grading Qty</th>
                  <th class="py-2.5 px-3">HL/Tub Weight</th>
                  <th class="py-2.5 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="gt-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('gt-table-body');
    const searchInput = document.getElementById('gt-search');
    const addLineBtn = document.getElementById('gt-btn-add-line');
    const deleteBtn = document.getElementById('gt-btn-delete');
    const exportBtn = document.getElementById('gt-export-excel');
    const form = document.getElementById('gr-track-form');

    const varieties = ["VM-PVPD", "VM-HLSO-CHINA", "VM-RPD", "VM-HLSO", "BT-HLSO"];
    const grades = ["51/60", "61/70", "71/90", "91/110", "110/130", "16/20", "21/25", "26/30", "31/40"];
    const treatments = ["UNT", "TRT", "CTPD"];
    const freezings = ["BLOCK", "IQF", "SIQF"];

    const renderGrid = (query = '') => {
      const q = query.toLowerCase().trim();
      const filtered = this.gradingTrackLines.filter(r => {
        if (!q) return true;
        return `${r.variety || ''} ${r.grade || ''} ${r.treatment || ''} ${r.freezing || ''}`.toLowerCase().includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10" class="text-center py-8 text-[#94A3B8] text-xs font-medium">No data available in table</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map((r, idx) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors" data-id="${r.id}">
          <td class="py-2.5 px-3 font-bold text-[#64748B]">${idx + 1}</td>
          <td class="py-2.5 px-3 font-semibold text-[#0F172A]">${r.variety || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155] font-mono">${r.hlCount || '-'}</td>
          <td class="py-2.5 px-3 font-bold text-[#0284C7] font-mono">${r.grade || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.treatment || '-'}</td>
          <td class="py-2.5 px-3 font-medium text-[#1E293B]">${r.freezing || '-'}</td>
          <td class="py-2.5 px-3 text-right text-[#334155] font-mono">${r.crates || 0}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#006644] font-mono">${r.gradingQty || '0.00'}</td>
          <td class="py-2.5 px-3 text-[#64748B]">${r.tubWeight || '-'}</td>
          <td class="py-2.5 px-3 text-center">
            <div class="flex items-center justify-center gap-1.5">
              <button type="button" data-edit-id="${r.id}" class="gt-edit-row p-1 text-[#02a8b5] hover:text-[#008f9a] hover:bg-[#F0FDFA] rounded cursor-pointer" title="Edit Line">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>
              <button type="button" data-del-id="${r.id}" class="gt-del-row p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer" title="Delete Line">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.gt-edit-row').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-edit-id');
          const rec = this.gradingTrackLines.find(x => x.id === id);
          if (rec) this.openGradingTrackLineModal(rec);
        });
      });

      tbody.querySelectorAll('.gt-del-row').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-del-id');
          if (confirm('Delete this grading size line?')) {
            this.gradingTrackLines = this.gradingTrackLines.filter(x => x.id !== id);
            renderGrid(searchInput?.value || '');
            if (window.Toast) window.Toast.show('Grading size line deleted', 'info');
          }
        });
      });
    };

    renderGrid();

    // + Add Line button
    addLineBtn?.addEventListener('click', () => {
      this.openGradingTrackLineModal(null);
    });

    deleteBtn?.addEventListener('click', () => {
      if (this.gradingTrackLines.length === 0) return;
      if (confirm('Delete the last grading line?')) {
        this.gradingTrackLines.pop();
        renderGrid(searchInput?.value || '');
        if (window.Toast) window.Toast.show('Line removed', 'info');
      }
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (window.Toast) window.Toast.show('Grading Track ID batch recorded successfully!', 'success');
    });

    searchInput?.addEventListener('input', (e) => renderGrid(e.target.value));

    exportBtn?.addEventListener('click', () => {
      const headers = ["SNO", "Variety", "HL_Count (Per Lb)", "Grade", "Treatment", "Freezing", "No Of Crates", "Grading Qty", "HL/Tub Weight"];
      const rows = this.gradingTrackLines.map((r, i) => [
        i + 1,
        `"${r.variety || ''}"`,
        r.hlCount || '',
        `"${r.grade || ''}"`,
        `"${r.treatment || ''}"`,
        `"${r.freezing || ''}"`,
        r.crates || 0,
        r.gradingQty || 0,
        `"${r.tubWeight || ''}"`
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `grading_trackid_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (window.Toast) window.Toast.show('Grading Track report exported to CSV', 'success');
    });
  },

  renderValueAddition(container) {
    if (!this.valueAdditionList || this.valueAdditionList.length === 0) {
      this.valueAdditionList = [
        { id: "VA-01", sNo: 1, arrivalCode: "AMP/2425/4078", plant: "DFL UNIT-1 (VSP)", soakingPlant: "DFL UNIT-2 (KKD)", date: "24-02-2025", shift: "A SHIFT", variety: "VM RPD", hlWeight: 2.400, hlCount: 37.00, crates: 1, vaOutQty: 2.000, rejectionWt: 0.000, yieldPct: 83.33 },
        { id: "VA-02", sNo: 2, arrivalCode: "AMP/2425/4078", plant: "DFL UNIT-1 (VSP)", soakingPlant: "DFL UNIT-2 (KKD)", date: "24-02-2025", shift: "A SHIFT", variety: "VM RPD FULL CUT", hlWeight: 8.400, hlCount: 46.00, crates: 1, vaOutQty: 7.000, rejectionWt: 0.000, yieldPct: 83.33 }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">VALUE ADDITION TRACKID</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Operations &bull; Value Added Processing & Yield</span>
        </div>

        <!-- Upper Card: Entry Form -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form id="va-form" class="space-y-4">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-red-500 font-bold">*</span></label>
                <select id="va-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="VSP-DFL UNIT-1 (VSP)" selected>VSP-DFL UNIT-1 (VSP)</option>
                  <option value="KKD-DFL UNIT-2 (KKD)">KKD-DFL UNIT-2 (KKD)</option>
                  <option value="PSP-DFL UNIT-3 (PSP)">PSP-DFL UNIT-3 (PSP)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="va-arrival-date" value="2025-02-23" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TRACK ID <span class="text-red-500 font-bold">*</span></label>
                <select id="va-track-id" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="VM-VSP-AMP-056" selected>VM-VSP-AMP-056</option>
                  <option value="BT-KKD-MKP-043">BT-KKD-MKP-043</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">VALUE ADDITION DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="va-date" value="2025-02-24" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Row 2: 3 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SHIFT <span class="text-red-500 font-bold">*</span></label>
                <select id="va-shift" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="A SHIFT" selected>A SHIFT</option>
                  <option value="B SHIFT">B SHIFT</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SUPERVISOR <span class="text-red-500 font-bold">*</span></label>
                <select id="va-supervisor" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="S.BALA KRISHNA" selected>S.BALA KRISHNA</option>
                  <option value="T.VENKATESH">T.VENKATESH</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HL COUNT <span class="text-red-500 font-bold">*</span></label>
                <select id="va-hl-count" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="37.00" selected>37.00 - 46.00 Count</option>
                  <option value="46.00">46.00 - 55.00 Count</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TOTALS () <span class="text-red-500 font-bold">*</span></label>
                <input type="text" value="Balance" readonly class="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#64748B] focus:outline-none">
              </div>
            </div>

            <!-- Row 3: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">VARIETY <span class="text-red-500 font-bold">*</span></label>
                <select id="va-variety" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="VM RPD" selected>VM RPD</option>
                  <option value="VM RPD FULL CUT">VM RPD FULL CUT</option>
                  <option value="EZ-PEEL">EZ-PEEL</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HL WT (KGS) <span class="text-red-500 font-bold">*</span></label>
                <input type="number" step="0.01" id="va-hl-wt" value="27" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all font-semibold">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CRATES <span class="text-red-500 font-bold">*</span></label>
                <input type="number" id="va-crates" placeholder="Enter Crates" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">VAOUTQUANTITY</label>
                <input type="number" step="0.01" id="va-out-qty" placeholder="Enter VAOutQuantity" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Action Buttons: Save, Cancel, Transfer to Another Plant -->
            <div class="flex items-center justify-center gap-3 pt-2">
              <button type="submit" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Save
              </button>
              <button type="button" id="va-btn-cancel" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer">
                Cancel
              </button>
              <button type="button" id="va-btn-transfer" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                Transfer to Another Plant
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Register Table -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </div>
  <input type="text" id="va-search" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
</div>
            <button type="button" id="va-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3 w-8"><input type="checkbox" id="va-check-all" class="rounded"></th>
                  <th class="py-2.5 px-3">S.No</th>
                  <th class="py-2.5 px-3">Arrival Code</th>
                  <th class="py-2.5 px-3">Production Plant</th>
                  <th class="py-2.5 px-3">Soaking Plant</th>
                  <th class="py-2.5 px-3">Transaction Date</th>
                  <th class="py-2.5 px-3">Shift</th>
                  <th class="py-2.5 px-3">Variety</th>
                  <th class="py-2.5 px-3 text-right">HL Wt(Kgs)</th>
                  <th class="py-2.5 px-3 text-right">HL Count</th>
                  <th class="py-2.5 px-3 text-right">No of Crates</th>
                  <th class="py-2.5 px-3 text-right">VA Out Quantity</th>
                  <th class="py-2.5 px-3 text-right">Rejection Weight</th>
                  <th class="py-2.5 px-3 text-right">Yield</th>
                  <th class="py-2.5 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="va-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('va-table-body');
    const searchInput = document.getElementById('va-search');
    const form = document.getElementById('va-form');
    const exportBtn = document.getElementById('va-export-excel');
    const cancelBtn = document.getElementById('va-btn-cancel');
    const transferBtn = document.getElementById('va-btn-transfer');

    const renderTable = (query = '') => {
      const q = query.toLowerCase().trim();
      const filtered = this.valueAdditionList.filter(r => {
        if (!q) return true;
        return `${r.arrivalCode || ''} ${r.plant || ''} ${r.soakingPlant || ''} ${r.variety || ''}`.toLowerCase().includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="15" class="text-center py-8 text-[#94A3B8] text-xs font-medium">No data available in table</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map((r, idx) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors">
          <td class="py-2.5 px-3"><input type="checkbox" class="rounded"></td>
          <td class="py-2.5 px-3 font-bold text-[#64748B]">${idx + 1}</td>
          <td class="py-2.5 px-3 font-bold text-[#0F172A]">${r.arrivalCode || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.plant || '-'}</td>
          <td class="py-2.5 px-3 text-red-500 font-semibold">${r.soakingPlant || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.date || '-'}</td>
          <td class="py-2.5 px-3 font-medium text-[#1E293B]">${r.shift || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155] font-semibold">${r.variety || '-'}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#334155]">${Number(r.hlWeight || 0).toFixed(3)}</td>
          <td class="py-2.5 px-3 text-right text-[#334155]">${Number(r.hlCount || 0).toFixed(2)}</td>
          <td class="py-2.5 px-3 text-right text-[#334155]">${r.crates || 1}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#006644]">${Number(r.vaOutQty || 0).toFixed(3)}</td>
          <td class="py-2.5 px-3 text-right text-[#64748B]">${Number(r.rejectionWt || 0).toFixed(3)}</td>
          <td class="py-2.5 px-3 text-right font-mono font-bold text-[#006644]">${Number(r.yieldPct || 0).toFixed(2)}%</td>
          <td class="py-2.5 px-3 text-center">
            <div class="flex items-center justify-center gap-1.5">
              <button type="button" data-edit-id="${r.id}" class="va-edit p-1 text-[#0284C7] hover:bg-[#F0F9FF] rounded cursor-pointer" title="Edit">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>
              <button type="button" data-del-id="${r.id}" class="va-del p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer" title="Delete">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.va-edit').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-edit-id');
          const rec = this.valueAdditionList.find(x => x.id === id);
          if (rec) this.openValueAdditionModal(rec);
        });
      });

      tbody.querySelectorAll('.va-del').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-del-id');
          if (confirm('Delete this Value Addition line?')) {
            this.valueAdditionList = this.valueAdditionList.filter(x => x.id !== id);
            renderTable(searchInput?.value || '');
            if (window.Toast) window.Toast.show('Value addition record deleted', 'info');
          }
        });
      });
    };

    renderTable();

    searchInput?.addEventListener('input', (e) => renderTable(e.target.value));

    cancelBtn?.addEventListener('click', () => {
      form.reset();
      if (window.Toast) window.Toast.show('Form reset', 'info');
    });

    transferBtn?.addEventListener('click', () => {
      if (window.Toast) window.Toast.show('Initiating transfer workflow to destination plant', 'info');
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const hlWt = parseFloat(document.getElementById('va-hl-wt').value) || 0;
      const vaOut = parseFloat(document.getElementById('va-out-qty').value) || (hlWt * 0.8333);
      const yieldPct = hlWt > 0 ? (vaOut / hlWt) * 100 : 0;
      const newRec = {
        id: 'VA-' + String(Date.now()).slice(-6),
        sNo: this.valueAdditionList.length + 1,
        arrivalCode: document.getElementById('va-track-id').value,
        plant: document.getElementById('va-plant').value,
        soakingPlant: "DFL UNIT-2 (KKD)",
        date: document.getElementById('va-date').value,
        shift: document.getElementById('va-shift').value,
        variety: document.getElementById('va-variety').value,
        hlWeight: hlWt,
        hlCount: 37.00,
        crates: parseInt(document.getElementById('va-crates').value, 10) || 1,
        vaOutQty: vaOut,
        rejectionWt: 0.000,
        yieldPct: yieldPct
      };
      this.valueAdditionList.unshift(newRec);
      renderTable(searchInput?.value || '');
      form.reset();
      if (window.Toast) window.Toast.show('Value Addition record saved', 'success');
    });

    exportBtn?.addEventListener('click', () => {
      const headers = ["S.No", "Arrival Code", "Production Plant", "Soaking Plant", "Transaction Date", "Shift", "Variety", "HL Wt(Kgs)", "HL Count", "No of Crates", "VA Out Quantity", "Rejection Weight", "Yield"];
      const rows = this.valueAdditionList.map((r, i) => [
        i + 1,
        `"${r.arrivalCode || ''}"`,
        `"${r.plant || ''}"`,
        `"${r.soakingPlant || ''}"`,
        `"${r.date || ''}"`,
        `"${r.shift || ''}"`,
        `"${r.variety || ''}"`,
        r.hlWeight || 0,
        r.hlCount || 0,
        r.crates || 1,
        r.vaOutQty || 0,
        r.rejectionWt || 0,
        (r.yieldPct || 0).toFixed(2)
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `value_addition_trackid_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (window.Toast) window.Toast.show('Value Addition report exported to CSV', 'success');
    });
  },

  renderHonQtyTransfer(container) {
    if (!this.honTransferList || this.honTransferList.length === 0) {
      this.honTransferList = [
        { id: "HT-01", sNo: 1, arrivalDate: "20-02-2025", billDate: "19-02-2025", billNumber: "MKP/2425/2346", plant: "DFL UNIT-1 (VSP)", purchaseCount: "60.000", purchaseWeight: "1591.000", rmPlant: "DFL UNIT-1 (VSP)", transferDate: "23-10-2026", vaWeightQty: "23.000" }
      ];
    }

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B]">
        <!-- Page Title -->
        <div class="flex items-center justify-between pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">HON QTY TRANSFER AFTER VA</h2>
          <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Operations &bull; Head-On Quantity Inter-Plant Requisition</span>
        </div>

        <!-- Upper Card: Entry Form -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form id="ht-form" class="space-y-4">
            <!-- Row 1: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-red-500 font-bold">*</span></label>
                <select id="ht-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="VSP-DFL UNIT-1 (VSP)" selected>VSP-DFL UNIT-1 (VSP)</option>
                  <option value="KKD-DFL UNIT-2 (KKD)">KKD-DFL UNIT-2 (KKD)</option>
                  <option value="PSP-DFL UNIT-3 (PSP)">PSP-DFL UNIT-3 (PSP)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="ht-arrival-date" value="2025-02-20" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TRACK ID <span class="text-red-500 font-bold">*</span></label>
                <select id="ht-track-id" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="VM-VSP-MKP-049" selected>VM-VSP-MKP-049</option>
                  <option value="VM-VSP-AMP-056">VM-VSP-AMP-056</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL CODE <span class="text-red-500 font-bold">*</span></label>
                <select id="ht-arrival-code" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="MKP/2425/2346" selected>MKP/2425/2346, MKP/2425/2347 Mix (60.00, 105.00...)</option>
                </select>
              </div>
            </div>

            <!-- Row 2: 4 Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HON COUNT <span class="text-red-500 font-bold">*</span></label>
                <select id="ht-hon-count" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="60.00C - 1591.00KGs - MKP/2425/2346" selected>60.00C - 1591.00KGs - MKP/2425/2346</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HON WEIGHT (TOTAL : 1591 KGS) <span class="text-red-500 font-bold">*</span></label>
                <input type="text" value="Balance : 1568 KGs" readonly class="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#64748B] font-semibold focus:outline-none">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">WEIGHT <span class="text-red-500 font-bold">*</span></label>
                <input type="number" step="0.01" id="ht-weight" placeholder="Enter Weight" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all font-semibold">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TRANSFER PLANT <span class="text-red-500 font-bold">*</span></label>
                <select id="ht-transfer-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="">Select</option>
                  <option value="DFL UNIT-2 (KKD)" selected>DFL UNIT-2 (KKD)</option>
                  <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                  <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                </select>
              </div>
            </div>

            <!-- Row 3: 1 Column -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TRANSFER DATE <span class="text-red-500 font-bold">*</span></label>
                <input type="date" id="ht-transfer-date" value="2026-10-23" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
              </div>
            </div>

            <!-- Action Buttons: Close, Submit -->
            <div class="flex items-center justify-center gap-3 pt-2">
              <button type="button" id="ht-btn-close" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer">
                Close
              </button>
              <button type="submit" class="px-7 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all cursor-pointer">
                Submit
              </button>
            </div>
          </form>
        </div>

        <!-- Lower Card: Register Table -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 transition-all">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
            <div class="relative w-full max-w-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </div>
  <input type="text" id="ht-search" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
</div>
            <button type="button" id="ht-export-excel" class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto whitespace-nowrap">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#CBD5E1] rounded-lg">
            <table class="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr class="bg-[#F8FAFC] text-[11px] font-bold text-[#475569] uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th class="py-2.5 px-3">S.No</th>
                  <th class="py-2.5 px-3">Arrival Date</th>
                  <th class="py-2.5 px-3">Bill Date</th>
                  <th class="py-2.5 px-3">Bill Number</th>
                  <th class="py-2.5 px-3">Production Plant</th>
                  <th class="py-2.5 px-3 text-right">Purchase Count</th>
                  <th class="py-2.5 px-3 text-right">Purchase Weight</th>
                  <th class="py-2.5 px-3">Rm Production plant</th>
                  <th class="py-2.5 px-3">Transfer Date</th>
                  <th class="py-2.5 px-3 text-right">VA Weight Qty</th>
                  <th class="py-2.5 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="ht-table-body" class="divide-y divide-[#E2E8F0] bg-white">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const tbody = document.getElementById('ht-table-body');
    const searchInput = document.getElementById('ht-search');
    const form = document.getElementById('ht-form');
    const exportBtn = document.getElementById('ht-export-excel');
    const closeBtn = document.getElementById('ht-btn-close');

    const renderTable = (query = '') => {
      const q = query.toLowerCase().trim();
      const filtered = this.honTransferList.filter(r => {
        if (!q) return true;
        return `${r.billNumber || ''} ${r.plant || ''} ${r.rmPlant || ''}`.toLowerCase().includes(q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="11" class="text-center py-8 text-[#94A3B8] text-xs font-medium">No data available in table</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map((r, idx) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors">
          <td class="py-2.5 px-3 font-bold text-[#64748B]">${idx + 1}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.arrivalDate || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.billDate || '-'}</td>
          <td class="py-2.5 px-3 font-bold text-[#0F172A]">${r.billNumber || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.plant || '-'}</td>
          <td class="py-2.5 px-3 text-right font-medium text-[#334155]">${Number(r.purchaseCount || 0).toFixed(3)}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#0F172A]">${Number(r.purchaseWeight || 0).toFixed(3)}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.rmPlant || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.transferDate || '-'}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#006644]">${Number(r.vaWeightQty || 0).toFixed(3)}</td>
          <td class="py-2.5 px-3 text-center">
            <button type="button" data-del-id="${r.id}" class="ht-del p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer" title="Delete Transfer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.ht-del').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-del-id');
          if (confirm('Delete this transfer manifest?')) {
            this.honTransferList = this.honTransferList.filter(x => x.id !== id);
            renderTable(searchInput?.value || '');
            if (window.Toast) window.Toast.show('Transfer record deleted', 'info');
          }
        });
      });
    };

    renderTable();

    searchInput?.addEventListener('input', (e) => renderTable(e.target.value));

    closeBtn?.addEventListener('click', () => {
      form.reset();
      if (window.Toast) window.Toast.show('Transfer form closed', 'info');
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const wt = parseFloat(document.getElementById('ht-weight').value) || 0;
      const newRec = {
        id: 'HT-' + String(Date.now()).slice(-6),
        sNo: this.honTransferList.length + 1,
        arrivalDate: document.getElementById('ht-arrival-date').value.split('-').reverse().join('-'),
        billDate: "19-02-2025",
        billNumber: "MKP/2425/2346",
        plant: document.getElementById('ht-plant').value,
        purchaseCount: "60.000",
        purchaseWeight: "1591.000",
        rmPlant: document.getElementById('ht-plant').value,
        transferDate: document.getElementById('ht-transfer-date').value,
        vaWeightQty: wt.toFixed(3)
      };
      this.honTransferList.unshift(newRec);
      renderTable(searchInput?.value || '');
      form.reset();
      if (window.Toast) window.Toast.show('HON transfer manifest submitted successfully!', 'success');
    });

    exportBtn?.addEventListener('click', () => {
      const headers = ["S.No", "Arrival Date", "Bill Date", "Bill Number", "Production Plant", "Purchase Count", "Purchase Weight", "Rm Production plant", "Transfer Date", "VA Weight Qty"];
      const rows = this.honTransferList.map((r, i) => [
        i + 1,
        `"${r.arrivalDate || ''}"`,
        `"${r.billDate || ''}"`,
        `"${r.billNumber || ''}"`,
        `"${r.plant || ''}"`,
        r.purchaseCount || 0,
        r.purchaseWeight || 0,
        `"${r.rmPlant || ''}"`,
        `"${r.transferDate || ''}"`,
        r.vaWeightQty || 0
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join(String.fromCharCode(10));
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `hon_qty_transfer_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (window.Toast) window.Toast.show('HON Transfer report exported to CSV', 'success');
    });
  },

  // ============================================
  // 4. TRACEABILITY & RECONCILIATION
  // ============================================
  renderTrackCodeReport(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Batch Genealogy & End-to-End Traceability Report')}
        <div id="trace-table-container"></div>
      </div>
    `;
    new DataTable({
      containerId: 'trace-table-container',
      data: this.traceReportsList,
      keyField: 'id',
      tableTitle: 'Farm-to-Freezer Aquaculture Traceability Ledger',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'batchCode', header: 'Batch Code', render: (v) => `<span class="font-mono font-bold text-[#006C7A] bg-[#E6FCFF] px-2 py-0.5 rounded">${v}</span>` },
        { field: 'farmerName', header: 'Farmer / Cluster', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'pondNo', header: 'Pond', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'harvestDate', header: 'Harvest Date', render: (v) => `<span class="text-[#172B4D]">${v}</span>` },
        { field: 'intakeWeight', header: 'Intake (KG)', render: (v) => `<span class="text-[#5E6C84]">${v.toLocaleString()}</span>` },
        { field: 'deheadedWeight', header: 'Deheaded', render: (v) => `<span class="text-[#5E6C84]">${v.toLocaleString()}</span>` },
        { field: 'gradedWeight', header: 'Graded', render: (v) => `<span class="text-[#5E6C84]">${v.toLocaleString()}</span>` },
        { field: 'packedWeight', header: 'Packed (KG)', render: (v) => `<span class="font-extrabold text-[#006644]">${v.toLocaleString()} KG</span>` },
        { field: 'totalYieldPct', header: 'Net Yield %', render: (v) => `<span class="font-mono font-bold text-[#172B4D]">${v}%</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
  },

  renderVaFloorBalance(container) {
    this.renderFloorOverview(container);
  },

  renderVaTransfer(container) {
    this.renderHonQtyTransfer(container);
  },

  renderAssumedReports(container) {
    this.renderChemicalReceivedReport(container);
  },

  renderConsolidationDaily(container) {
    this.renderFloorOverview(container);
  },

  renderFileUpload(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Batch File Upload & Data Ingestion')}
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-6 shadow-xs text-center">
          <div class="w-12 h-12 rounded-full bg-[#F0F9FF] text-[#0284C7] flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
          </div>
          <h3 class="text-sm font-bold text-[#172B4D]">Drag and drop your spreadsheet here</h3>
          <p class="text-xs text-[#5E6C84] mt-1">Accepts .CSV, .XLSX files up to 25MB (Grading runs, intake scales, chemical orders)</p>
          <div class="mt-4 flex items-center justify-center gap-3">
            <button class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.toastSuccess('Upload triggered')">Browse Files</button>
            <button class="px-4 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow cursor-pointer transition-all" onclick="window.PreprocessingView.toastInfo('Downloading CSV template')">Download Template</button>
          </div>
        </div>
      </div>
    `;
  },

  calcDiff() {},
  calcDeheadYield() {
    const qty = parseFloat(document.getElementById('dh-hon-qty')?.value) || 0;
    const yieldEl = document.getElementById('dh-yield');
    if (yieldEl && qty > 0) {
      yieldEl.value = (66.5 + (qty % 3) * 0.5).toFixed(1);
    }
  },

  toastSuccess(msg) { if (typeof Toast !== 'undefined') Toast.show(msg, 'success'); },
  toastInfo(msg) { if (typeof Toast !== 'undefined') Toast.show(msg, 'info'); },
  toastError(msg) { if (typeof Toast !== 'undefined') Toast.show(msg, 'error'); },

  
  // ============================================
  // PREPROCESSING TABLE EDIT POPUP MODALS
  // ============================================
  openGradingTrackLineModal(editItem = null) {
    const isEdit = Boolean(editItem);
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    const varieties = ["VM-PVPD", "VM-HLSO-CHINA", "VM-RPD", "VM-HLSO", "BT-HLSO", "VM-RPDTO", "VM-RPDTO 70% CUT", "VM-RPD FULL CUT", "VM-DC"];
    const grades = ["51/60", "61/70", "71/90", "91/110", "110/130", "16/20", "21/25", "26/30", "31/35", "36/40", "41/50", "45/51", "8/12", "DC"];
    const treatments = ["UNT", "TRT", "CTPD", "STPP"];
    const freezings = ["BLOCK", "IQF", "SIQF"];

    m.open({
      title: isEdit ? 'EDIT GRADING SIZE LINE' : 'ADD GRADING SIZE LINE',
      size: 'lg',
      content: `
        <div class="modal-breadcrumb text-xs text-slate-500 mb-3">Operations / Grading Track ID / ${isEdit ? 'Edit Size Line' : 'New Size Line'}</div>
        <form id="modal-gt-line-form" class="space-y-4">
          <input type="hidden" id="modal-gt-id" value="${editItem?.id || ''}">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">VARIETY <span class="text-red-500 font-bold">*</span></label>
              <select id="modal-gt-variety" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                ${varieties.map(v => `<option value="${v}" ${editItem?.variety === v ? 'selected' : ''}>${v}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HL COUNT (PER LB) <span class="text-red-500 font-bold">*</span></label>
              <input type="number" step="0.01" id="modal-gt-hlcount" value="${editItem?.hlCount || '60.00'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">GRADE <span class="text-red-500 font-bold">*</span></label>
              <select id="modal-gt-grade" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                ${grades.map(g => `<option value="${g}" ${editItem?.grade === g ? 'selected' : ''}>${g}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TREATMENT <span class="text-red-500 font-bold">*</span></label>
              <select id="modal-gt-treatment" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                ${treatments.map(t => `<option value="${t}" ${editItem?.treatment === t ? 'selected' : ''}>${t}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">FREEZING <span class="text-red-500 font-bold">*</span></label>
              <select id="modal-gt-freezing" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                ${freezings.map(f => `<option value="${f}" ${editItem?.freezing === f ? 'selected' : ''}>${f}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">NO OF CRATES <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-gt-crates" value="${editItem?.crates || '1'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">GRADING QTY (KG) <span class="text-red-500 font-bold">*</span></label>
              <input type="number" step="0.01" id="modal-gt-qty" value="${editItem?.gradingQty || '0.00'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HL / TUB WEIGHT</label>
              <input type="text" id="modal-gt-tub" value="${editItem?.tubWeight || ''}" placeholder="Enter Crate Qty" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="flex justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
            <button type="button" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer">💾 Save Line</button>
          </div>
        </form>
      `
    });

    setTimeout(() => {
      if (window.CamarooControls) window.CamarooControls.upgrade(document.getElementById('erp-modal-root'));
    }, 20);

    document.getElementById('modal-gt-line-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const idVal = document.getElementById('modal-gt-id')?.value;
      const variety = document.getElementById('modal-gt-variety')?.value || 'VM-PVPD';
      const hlCount = document.getElementById('modal-gt-hlcount')?.value || '60.00';
      const grade = document.getElementById('modal-gt-grade')?.value || '51/60';
      const treatment = document.getElementById('modal-gt-treatment')?.value || 'UNT';
      const freezing = document.getElementById('modal-gt-freezing')?.value || 'BLOCK';
      const crates = parseInt(document.getElementById('modal-gt-crates')?.value, 10) || 1;
      const gradingQty = parseFloat(document.getElementById('modal-gt-qty')?.value) || 0;
      const tubWeight = document.getElementById('modal-gt-tub')?.value || '';

      if (idVal) {
        const idx = this.gradingTrackLines.findIndex(x => x.id === idVal);
        if (idx !== -1) {
          this.gradingTrackLines[idx] = { ...this.gradingTrackLines[idx], variety, hlCount, grade, treatment, freezing, crates, gradingQty: gradingQty.toFixed(2), tubWeight };
          if (window.Toast) window.Toast.show(`Grading size line updated`, 'success');
        }
      } else {
        const newLine = {
          id: 'GTL-' + String(Date.now()).slice(-6),
          sNo: this.gradingTrackLines.length + 1,
          variety,
          hlCount,
          grade,
          treatment,
          freezing,
          crates,
          gradingQty: gradingQty.toFixed(2),
          tubWeight
        };
        this.gradingTrackLines.push(newLine);
        if (window.Toast) window.Toast.show(`New grading line added`, 'success');
      }

      Modal.close();
      const subContainer = document.getElementById('preproc-subpage-content') || document.getElementById('preprocessing-content');
      if (subContainer) this.renderGradingTrackid(subContainer);
    });
  },

  openDeheadingTrackidModal(editItem = null) {
    const isEdit = Boolean(editItem);
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: isEdit ? 'EDIT DE-HEADING TRACK ID' : 'ADD DE-HEADING TRACK ID',
      size: 'lg',
      content: `
        <div class="modal-breadcrumb text-xs text-slate-500 mb-3">Operations / De-Heading Track ID / ${isEdit ? 'Edit Record' : 'New Assignment'}</div>
        <form id="modal-dht-form" class="space-y-4">
          <input type="hidden" id="modal-dht-id" value="${editItem?.id || ''}">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-red-500 font-bold">*</span></label>
              <select id="modal-dht-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="VSP-DFL UNIT-1 (VSP)" ${editItem?.plant === 'VSP-DFL UNIT-1 (VSP)' ? 'selected' : ''}>VSP-DFL UNIT-1 (VSP)</option>
                <option value="KKD-DFL UNIT-2 (KKD)" ${editItem?.plant === 'KKD-DFL UNIT-2 (KKD)' ? 'selected' : ''}>KKD-DFL UNIT-2 (KKD)</option>
                <option value="PSP-DFL UNIT-3 (PSP)" ${editItem?.plant === 'PSP-DFL UNIT-3 (PSP)' ? 'selected' : ''}>PSP-DFL UNIT-3 (PSP)</option>
                <option value="JPT-DFL UNIT-5 (JPT)" ${editItem?.plant === 'JPT-DFL UNIT-5 (JPT)' ? 'selected' : ''}>JPT-DFL UNIT-5 (JPT)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL DATE <span class="text-red-500 font-bold">*</span></label>
              <input type="date" id="modal-dht-arrival-date" value="${editItem?.arrivalDate || '2026-10-23'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TRACK ID <span class="text-red-500 font-bold">*</span></label>
              <input type="text" id="modal-dht-track-id" value="${editItem?.trackId || 'VM-VSP-AMP-056'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">DE HEADING DATE <span class="text-red-500 font-bold">*</span></label>
              <input type="date" id="modal-dht-dh-date" value="${editItem?.deheadingDate || '2026-10-23'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SHIFT <span class="text-red-500 font-bold">*</span></label>
              <select id="modal-dht-shift" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="A SHIFT" ${editItem?.shift === 'A SHIFT' ? 'selected' : ''}>A SHIFT</option>
                <option value="B SHIFT" ${editItem?.shift === 'B SHIFT' ? 'selected' : ''}>B SHIFT</option>
                <option value="C SHIFT" ${editItem?.shift === 'C SHIFT' ? 'selected' : ''}>C SHIFT</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SUPERVISOR <span class="text-red-500 font-bold">*</span></label>
              <select id="modal-dht-supervisor" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="K VENKATA VINAY" ${editItem?.supervisor === 'K VENKATA VINAY' ? 'selected' : ''}>K VENKATA VINAY</option>
                <option value="T.VENKATESH" ${editItem?.supervisor === 'T.VENKATESH' ? 'selected' : ''}>T.VENKATESH</option>
                <option value="D.SURYA NARAYANA" ${editItem?.supervisor === 'D.SURYA NARAYANA' ? 'selected' : ''}>D.SURYA NARAYANA</option>
              </select>
            </div>
            <div class="sm:col-span-2">
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REMARKS</label>
              <input type="text" id="modal-dht-remarks" value="${editItem?.remarks || ''}" placeholder="Enter remarks" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="flex justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
            <button type="button" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer">💾 Save Record</button>
          </div>
        </form>
      `
    });

    setTimeout(() => {
      if (window.CamarooControls) window.CamarooControls.upgrade(document.getElementById('erp-modal-root'));
    }, 20);

    document.getElementById('modal-dht-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const idVal = document.getElementById('modal-dht-id')?.value;
      const plant = document.getElementById('modal-dht-plant')?.value;
      const arrivalDate = document.getElementById('modal-dht-arrival-date')?.value;
      const trackId = document.getElementById('modal-dht-track-id')?.value;
      const deheadingDate = document.getElementById('modal-dht-dh-date')?.value;
      const shift = document.getElementById('modal-dht-shift')?.value;
      const supervisor = document.getElementById('modal-dht-supervisor')?.value;
      const remarks = document.getElementById('modal-dht-remarks')?.value;

      if (idVal) {
        const idx = this.deheadingTrackidList.findIndex(x => x.id === idVal);
        if (idx !== -1) {
          this.deheadingTrackidList[idx] = { ...this.deheadingTrackidList[idx], plant, arrivalDate, trackId, deheadingDate, shift, supervisor, remarks };
          if (window.Toast) window.Toast.show(`Track ID ${trackId} updated`, 'success');
        }
      }

      Modal.close();
      const subContainer = document.getElementById('preproc-subpage-content') || document.getElementById('preprocessing-content');
      if (subContainer) this.renderDeheadingTrackid(subContainer);
    });
  },

  openDeheadingModal(editItem = null) {
    const isEdit = Boolean(editItem);
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: isEdit ? 'EDIT DE-HEADING LOG' : 'ADD DE-HEADING LOG',
      size: 'lg',
      content: `
        <div class="modal-breadcrumb text-xs text-slate-500 mb-3">Operations / De-Heading / ${isEdit ? 'Edit Floor Log' : 'New Floor Log'}</div>
        <form id="modal-dh-form" class="space-y-4">
          <input type="hidden" id="modal-dh-id" value="${editItem?.id || ''}">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL CODE</label>
              <input type="text" id="modal-dh-lot" value="${editItem?.lotCode || ''}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT</label>
              <select id="modal-dh-plant" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="USHA-DFL UNIT-2 (KKD)" ${editItem?.plant === 'USHA-DFL UNIT-2 (KKD)' ? 'selected' : ''}>USHA-DFL UNIT-2 (KKD)</option>
                <option value="VSP-DFL UNIT-1 (VSP)" ${editItem?.plant === 'VSP-DFL UNIT-1 (VSP)' ? 'selected' : ''}>VSP-DFL UNIT-1 (VSP)</option>
                <option value="PSP-DFL UNIT-3 (PSP)" ${editItem?.plant === 'PSP-DFL UNIT-3 (PSP)' ? 'selected' : ''}>PSP-DFL UNIT-3 (PSP)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">DEHEADING DATE</label>
              <input type="date" id="modal-dh-date" value="${editItem?.deheadingDate || editItem?.date || '2026-10-23'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SHIFT</label>
              <select id="modal-dh-shift" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="A SHIFT" ${editItem?.shift === 'A SHIFT' ? 'selected' : ''}>A SHIFT</option>
                <option value="B SHIFT" ${editItem?.shift === 'B SHIFT' ? 'selected' : ''}>B SHIFT</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HON QUANTITY (KG)</label>
              <input type="number" step="0.01" id="modal-dh-hon-qty" value="${editItem?.honQty || '4250'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HL QUANTITY (KG)</label>
              <input type="number" step="0.01" id="modal-dh-hl-qty" value="${editItem?.hlQty || '2847.5'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SUPERVISOR</label>
              <input type="text" id="modal-dh-supervisor" value="${editItem?.supervisor || 'K VENKATA VINAY'}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ICE CONSUMPTION (KG)</label>
              <input type="number" id="modal-dh-ice" value="${editItem?.iceConsumption || '1800'}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="flex justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
            <button type="button" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer">💾 Save Log</button>
          </div>
        </form>
      `
    });

    setTimeout(() => {
      if (window.CamarooControls) window.CamarooControls.upgrade(document.getElementById('erp-modal-root'));
    }, 20);

    document.getElementById('modal-dh-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const idVal = document.getElementById('modal-dh-id')?.value;
      const lot = document.getElementById('modal-dh-lot')?.value;
      const plant = document.getElementById('modal-dh-plant')?.value;
      const date = document.getElementById('modal-dh-date')?.value;
      const shift = document.getElementById('modal-dh-shift')?.value;
      const honQty = parseFloat(document.getElementById('modal-dh-hon-qty')?.value) || 0;
      const hlQty = parseFloat(document.getElementById('modal-dh-hl-qty')?.value) || 0;
      const supervisor = document.getElementById('modal-dh-supervisor')?.value;
      const ice = parseFloat(document.getElementById('modal-dh-ice')?.value) || 0;
      const yieldPct = honQty > 0 ? (hlQty / honQty) * 100 : 0;

      if (idVal) {
        const idx = this.deheadingLogsList.findIndex(x => x.id === idVal);
        if (idx !== -1) {
          this.deheadingLogsList[idx] = { ...this.deheadingLogsList[idx], lotCode: lot, plant, deheadingDate: date, shift, honQty, hlQty, supervisor, iceConsumption: ice, yieldPct };
          if (window.Toast) window.Toast.show(`Log #${lot} updated`, 'success');
        }
      }

      Modal.close();
      const subContainer = document.getElementById('preproc-subpage-content') || document.getElementById('preprocessing-content');
      if (subContainer) this.renderDeheading(subContainer);
    });
  },

  openGradingModal(editItem = null) {
    const isEdit = Boolean(editItem);
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: isEdit ? 'EDIT GRADING RUN LOG' : 'ADD GRADING RUN LOG',
      size: 'lg',
      content: `
        <div class="modal-breadcrumb text-xs text-slate-500 mb-3">Operations / Grading / ${isEdit ? 'Edit Run Log' : 'New Run Log'}</div>
        <form id="modal-gr-form" class="space-y-4">
          <input type="hidden" id="modal-gr-id" value="${editItem?.id || ''}">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TRACK ID / LOT</label>
              <input type="text" id="modal-gr-track" value="${editItem?.lotCode || ''}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT</label>
              <select id="modal-gr-plant" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="USHA-DFL UNIT-2 (KKD)" ${editItem?.plant === 'USHA-DFL UNIT-2 (KKD)' ? 'selected' : ''}>USHA-DFL UNIT-2 (KKD)</option>
                <option value="VSP-DFL UNIT-1 (VSP)" ${editItem?.plant === 'VSP-DFL UNIT-1 (VSP)' ? 'selected' : ''}>VSP-DFL UNIT-1 (VSP)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">GRADING MACHINE</label>
              <select id="modal-gr-machine" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="Unit -2 Roller Grading Machine">Unit -2 Roller Grading Machine</option>
                <option value="Unit -6 Laitram Machine">Unit -6 Laitram Machine</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HL COUNT</label>
              <input type="number" step="0.01" id="modal-gr-count" value="${editItem?.hlCount || '32.5'}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HL WEIGHT (KG)</label>
              <input type="number" step="0.01" id="modal-gr-weight" value="${editItem?.hlWeight || editItem?.gradedWeight || '2840'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">NO OF CRATES</label>
              <input type="number" id="modal-gr-crates" value="${editItem?.noOfCrates || '120'}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="flex justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
            <button type="button" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer">💾 Save Run Log</button>
          </div>
        </form>
      `
    });

    setTimeout(() => {
      if (window.CamarooControls) window.CamarooControls.upgrade(document.getElementById('erp-modal-root'));
    }, 20);

    document.getElementById('modal-gr-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const idVal = document.getElementById('modal-gr-id')?.value;
      const track = document.getElementById('modal-gr-track')?.value;
      const plant = document.getElementById('modal-gr-plant')?.value;
      const count = document.getElementById('modal-gr-count')?.value;
      const weight = parseFloat(document.getElementById('modal-gr-weight')?.value) || 0;
      const crates = parseInt(document.getElementById('modal-gr-crates')?.value, 10) || 0;

      if (idVal) {
        const idx = this.gradingLogsList.findIndex(x => x.id === idVal);
        if (idx !== -1) {
          this.gradingLogsList[idx] = { ...this.gradingLogsList[idx], lotCode: track, plant, hlCount: count, hlWeight: weight, noOfCrates: crates };
          if (window.Toast) window.Toast.show(`Grading log #${track} updated`, 'success');
        }
      }

      Modal.close();
      const subContainer = document.getElementById('preproc-subpage-content') || document.getElementById('preprocessing-content');
      if (subContainer) this.renderGrading(subContainer);
    });
  },

  openValueAdditionModal(editItem = null) {
    const isEdit = Boolean(editItem);
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: isEdit ? 'EDIT VALUE ADDITION BATCH' : 'ADD VALUE ADDITION BATCH',
      size: 'lg',
      content: `
        <div class="modal-breadcrumb text-xs text-slate-500 mb-3">Operations / Value Addition / ${isEdit ? 'Edit Batch' : 'New Batch'}</div>
        <form id="modal-va-form" class="space-y-4">
          <input type="hidden" id="modal-va-id" value="${editItem?.id || ''}">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ARRIVAL CODE</label>
              <input type="text" id="modal-va-code" value="${editItem?.arrivalCode || ''}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT</label>
              <input type="text" id="modal-va-plant" value="${editItem?.plant || ''}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">VARIETY</label>
              <input type="text" id="modal-va-variety" value="${editItem?.variety || ''}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HL WEIGHT (KG)</label>
              <input type="number" step="0.01" id="modal-va-hlwt" value="${editItem?.hlWeight || '2400'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">VA OUTPUT (KG)</label>
              <input type="number" step="0.01" id="modal-va-out" value="${editItem?.vaOutQty || '2000'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REJECTION WT (KG)</label>
              <input type="number" step="0.01" id="modal-va-rej" value="${editItem?.rejectionWt || '50'}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CRATES</label>
              <input type="number" id="modal-va-crates" value="${editItem?.crates || '1'}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="flex justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
            <button type="button" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer">💾 Save Batch</button>
          </div>
        </form>
      `
    });

    setTimeout(() => {
      if (window.CamarooControls) window.CamarooControls.upgrade(document.getElementById('erp-modal-root'));
    }, 20);

    document.getElementById('modal-va-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const idVal = document.getElementById('modal-va-id')?.value;
      const code = document.getElementById('modal-va-code')?.value;
      const plant = document.getElementById('modal-va-plant')?.value;
      const variety = document.getElementById('modal-va-variety')?.value;
      const hlWt = parseFloat(document.getElementById('modal-va-hlwt')?.value) || 0;
      const vaOut = parseFloat(document.getElementById('modal-va-out')?.value) || 0;
      const rej = parseFloat(document.getElementById('modal-va-rej')?.value) || 0;
      const crates = parseInt(document.getElementById('modal-va-crates')?.value, 10) || 1;
      const yieldPct = hlWt > 0 ? (vaOut / hlWt) * 100 : 0;

      if (idVal) {
        const idx = this.valueAdditionList.findIndex(x => x.id === idVal);
        if (idx !== -1) {
          this.valueAdditionList[idx] = { ...this.valueAdditionList[idx], arrivalCode: code, plant, variety, hlWeight: hlWt, vaOutQty: vaOut, rejectionWt: rej, crates, yieldPct };
          if (window.Toast) window.Toast.show(`Batch #${code} updated`, 'success');
        }
      }

      Modal.close();
      const subContainer = document.getElementById('preproc-subpage-content') || document.getElementById('preprocessing-content');
      if (subContainer) this.renderValueAddition(subContainer);
    });
  },

  openChemPOModal(editItem = null) {
    const isEdit = Boolean(editItem);
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) {
      console.error('Modal system unavailable');
      if (typeof Toast !== 'undefined') Toast.show('Modal system unavailable', 'error');
      return;
    }

    m.open({
      title: isEdit ? 'GS CHEM PO EDIT' : 'GS CHEM PO CREATE',
      size: 'lg',
      content: `
        <div class="modal-breadcrumb text-xs text-slate-500 mb-3">Chemical Screens / Chemical Pos / ${isEdit ? 'Edit PO' : 'Create PO'}</div>
        <form id="modal-cpo-form" class="space-y-4">
          <input type="hidden" id="modal-cpo-id" value="${editItem?.id || ''}">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PROCESSING PLANT <span class="text-red-500 font-bold">*</span></label>
              <select id="modal-cpo-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="All">All</option>
                <option value="VSP-DFL UNIT-1 (VSP)" ${editItem?.plant === 'VSP-DFL UNIT-1 (VSP)' ? 'selected' : ''}>VSP-DFL UNIT-1 (VSP)</option>
                <option value="KKD-DFL UNIT-2 (KKD)" ${editItem?.plant === 'KKD-DFL UNIT-2 (KKD)' ? 'selected' : ''}>KKD-DFL UNIT-2 (KKD)</option>
                <option value="PSP-DFL UNIT-3 (PSP)" ${editItem?.plant === 'PSP-DFL UNIT-3 (PSP)' ? 'selected' : ''}>PSP-DFL UNIT-3 (PSP)</option>
                <option value="JPT-DFL UNIT-5 (JPT)" ${editItem?.plant === 'JPT-DFL UNIT-5 (JPT)' ? 'selected' : ''}>JPT-DFL UNIT-5 (JPT)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ENTER PO NO <span class="text-red-500 font-bold">*</span></label>
              <input type="text" id="modal-cpo-pono" placeholder="Enter Po NO" value="${editItem?.poNo || 'DFL/KPL/2627/005'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PO DATE</label>
              <input type="date" id="modal-cpo-podate" value="${editItem?.poDate || '2026-10-26'}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SUPPLIER NAME <span class="text-red-500 font-bold">*</span></label>
              <input type="text" id="modal-cpo-supplier" value="${editItem?.supplierName || 'KPL INTERNATIONAL LTD'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CHEMICALS <span class="text-red-500 font-bold">*</span></label>
              <select id="modal-cpo-chem" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="ALTESA NEO S100 (NP)" ${editItem?.chemicals === 'ALTESA NEO S100 (NP)' ? 'selected' : ''}>ALTESA NEO S100 (NP)</option>
                <option value="CARNAL 659 S ADVANCED (STPP)" ${editItem?.chemicals === 'CARNAL 659 S ADVANCED (STPP)' ? 'selected' : ''}>CARNAL 659 S ADVANCED (STPP)</option>
                <option value="CARFOSEL B 940 (STPP)" ${editItem?.chemicals === 'CARFOSEL B 940 (STPP)' ? 'selected' : ''}>CARFOSEL B 940 (STPP)</option>
                <option value="BEKAPLUS FS (BLEND)" ${editItem?.chemicals === 'BEKAPLUS FS (BLEND)' ? 'selected' : ''}>BEKAPLUS FS (BLEND)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PORT OF IMPORT</label>
              <select id="modal-cpo-port" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="INPRT - PARADIP GARH" ${editItem?.portName === 'INPRT - PARADIP GARH' ? 'selected' : ''}>INPRT - PARADIP GARH</option>
                <option value="INKAK1 - KAKINADA" ${editItem?.portName === 'INKAK1 - KAKINADA' ? 'selected' : ''}>INKAK1 - KAKINADA</option>
                <option value="INVTZ1 - VISAKHAPATNAM" ${editItem?.portName === 'INVTZ1 - VISAKHAPATNAM' ? 'selected' : ''}>INVTZ1 - VISAKHAPATNAM</option>
                <option value="INMAA1 - CHENNAI" ${editItem?.portName === 'INMAA1 - CHENNAI' ? 'selected' : ''}>INMAA1 - CHENNAI</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">MODE OF IMPORT</label>
              <select id="modal-cpo-mode" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="HSS" ${editItem?.modeOfImport === 'HSS' ? 'selected' : ''}>HSS</option>
                <option value="HSS_BOND" ${editItem?.modeOfImport === 'HSS_BOND' ? 'selected' : ''}>HSS_BOND</option>
                <option value="DIRECT IMPORT" ${editItem?.modeOfImport === 'DIRECT IMPORT' ? 'selected' : ''}>DIRECT IMPORT</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">QUANTITY (BAGS) <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-cpo-bags" value="${editItem?.qtyBags || '300'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">QUANTITY (KGS) <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-cpo-kgs" value="${editItem?.qtyKgs || '7500'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TOTAL AMOUNT (₹) <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-cpo-amount" value="${editItem?.totalAmount || '1250000'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ETD DATE</label>
              <input type="date" id="modal-cpo-etd" value="${editItem?.etdDate || '2026-10-30'}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ETA DATE</label>
              <input type="date" id="modal-cpo-eta" value="${editItem?.etaDate || '2026-11-15'}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REMARKS</label>
            <input type="text" id="modal-cpo-remarks" value="${editItem?.remarks || ''}" placeholder="Enter remarks" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div class="flex justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
            <button type="button" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer">💾 Save PO</button>
          </div>
        </form>
      `
    });
    setTimeout(() => CamarooControls.upgrade(document.getElementById('erp-modal-root')), 20);
    setTimeout(() => CamarooControls.upgrade(document.getElementById('erp-modal-root')), 20);
    setTimeout(() => CamarooControls.upgrade(document.getElementById('erp-modal-root')), 20);
    setTimeout(() => CamarooControls.upgrade(document.getElementById('erp-modal-root')), 20);

    document.getElementById('modal-cpo-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const idVal = document.getElementById('modal-cpo-id')?.value;
      const pono = document.getElementById('modal-cpo-pono')?.value || 'DFL/2627/999';
      const supplier = document.getElementById('modal-cpo-supplier')?.value || '';
      const chem = document.getElementById('modal-cpo-chem')?.value || '';
      const port = document.getElementById('modal-cpo-port')?.value || '';
      const mode = document.getElementById('modal-cpo-mode')?.value || 'HSS';
      const bags = document.getElementById('modal-cpo-bags')?.value || '0';
      const kgs = document.getElementById('modal-cpo-kgs')?.value || '0';
      const amt = document.getElementById('modal-cpo-amount')?.value || '0';
      const etd = document.getElementById('modal-cpo-etd')?.value || '';
      const eta = document.getElementById('modal-cpo-eta')?.value || '';
      const remarks = document.getElementById('modal-cpo-remarks')?.value || '';

      if (idVal) {
        const idx = this.chemicalPosList.findIndex(x => x.id === idVal);
        if (idx !== -1) {
          this.chemicalPosList[idx] = { ...this.chemicalPosList[idx], poNo: pono, supplierName: supplier, chemicals: chem, portName: port, modeOfImport: mode, qtyBags: bags, qtyKgs: kgs, totalAmount: amt, etdDate: etd, etaDate: eta, remarks };
          if (window.Toast) window.Toast.show(`PO ${pono} updated successfully`, 'success');
        }
      } else {
        const newRecord = {
          id: 'CPO-' + String(Date.now()).slice(-6),
          sNo: this.chemicalPosList.length + 1,
          supplierName: supplier,
          poNo: pono,
          poDate: new Date().toISOString().slice(0, 10),
          chemicals: chem,
          portName: port,
          modeOfImport: mode,
          qtyBags: bags,
          qtyKgs: kgs,
          totalAmount: amt,
          etdDate: etd,
          etaDate: eta,
          remarks: remarks
        };
        this.chemicalPosList.unshift(newRecord);
        if (window.Toast) window.Toast.show(`PO ${pono} created successfully`, 'success');
      }

      Modal.close();
      const subContainer = document.getElementById('preproc-subpage-content') || document.getElementById('preprocessing-content');
      if (subContainer) this.renderChemicalPos(subContainer);
    });
  },

  openChemOrderModal(editItem = null) {
    const isEdit = Boolean(editItem);
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) {
      console.error('Modal system unavailable');
      if (typeof Toast !== 'undefined') Toast.show('Modal system unavailable', 'error');
      return;
    }

    m.open({
      title: isEdit ? 'GS CHEM ORDERS EDIT' : 'GS CHEM ORDERS CREATE',
      size: 'lg',
      content: `
        <div class="modal-breadcrumb text-xs text-slate-500 mb-3">Chemical Screens / Received Chemicals / ${isEdit ? 'Edit Order' : 'Create Order'}</div>
        <form id="modal-rc-form" class="space-y-4">
          <input type="hidden" id="modal-rc-id" value="${editItem?.id || ''}">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PROCESSING PLANT <span class="text-red-500 font-bold">*</span></label>
              <select id="modal-rc-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="VSP-DFL UNIT-1 (VSP)" ${editItem?.plant === 'VSP-DFL UNIT-1 (VSP)' ? 'selected' : ''}>VSP-DFL UNIT-1 (VSP)</option>
                <option value="KKD-DFL UNIT-2 (KKD)" ${editItem?.plant === 'KKD-DFL UNIT-2 (KKD)' ? 'selected' : ''}>KKD-DFL UNIT-2 (KKD)</option>
                <option value="PSP-DFL UNIT-3 (PSP)" ${editItem?.plant === 'PSP-DFL UNIT-3 (PSP)' ? 'selected' : ''}>PSP-DFL UNIT-3 (PSP)</option>
                <option value="JPT-DFL UNIT-5 (JPT)" ${editItem?.plant === 'JPT-DFL UNIT-5 (JPT)' ? 'selected' : ''}>JPT-DFL UNIT-5 (JPT)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PONO <span class="text-red-500 font-bold">*</span></label>
              <input type="text" id="modal-rc-pono" value="${editItem?.poNo || 'DFL/CFB/2627/003'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BL NO</label>
              <input type="text" id="modal-rc-blno" value="${editItem?.blNo || ''}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CONTAINER NO</label>
              <input type="text" id="modal-rc-container" value="${editItem?.containerNo || ''}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">RECEIVED BAGS <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-rc-bags" value="${editItem?.receivedBags || '800'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">RECEIVED QTY IN KGS <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-rc-qty" value="${editItem?.receivedQty || '20000'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BILL OF ENTRY NO</label>
              <input type="text" id="modal-rc-boe-no" value="${editItem?.boeNo || ''}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BILL OF ENTRY DATE</label>
              <input type="date" id="modal-rc-boe-date" value="${editItem?.boeDate || '2026-08-23'}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CLEARED DATE</label>
              <input type="date" id="modal-rc-cleared-date" value="${editItem?.clearedDate || '2026-08-23'}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">STATUS</label>
              <select id="modal-rc-status" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="PENDING" ${editItem?.status === 'PENDING' ? 'selected' : ''}>PENDING</option>
                <option value="CLEARED" ${editItem?.status === 'CLEARED' ? 'selected' : ''}>CLEARED</option>
              </select>
            </div>
          </div>
          <div class="flex justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
            <button type="button" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer">💾 Save Order</button>
          </div>
        </form>
      `
    });

    document.getElementById('modal-rc-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const idVal = document.getElementById('modal-rc-id')?.value;
      const plant = document.getElementById('modal-rc-plant')?.value || 'VSP-DFL UNIT-1 (VSP)';
      const pono = document.getElementById('modal-rc-pono')?.value || '';
      const blno = document.getElementById('modal-rc-blno')?.value || '';
      const container = document.getElementById('modal-rc-container')?.value || '';
      const bags = parseInt(document.getElementById('modal-rc-bags')?.value) || 0;
      const qty = parseFloat(document.getElementById('modal-rc-qty')?.value) || 0;
      const boeNo = document.getElementById('modal-rc-boe-no')?.value || '';
      const boeDate = document.getElementById('modal-rc-boe-date')?.value || '';
      const clearedDate = document.getElementById('modal-rc-cleared-date')?.value || '';
      const status = document.getElementById('modal-rc-status')?.value || 'PENDING';

      if (idVal) {
        const idx = this.receivedChemicalsList.findIndex(x => x.id === idVal);
        if (idx !== -1) {
          this.receivedChemicalsList[idx] = { ...this.receivedChemicalsList[idx], plant, poNo: pono, blNo: blno, containerNo: container, receivedBags: bags, receivedQty: qty, boeNo, boeDate, clearedDate, status };
          if (window.Toast) window.Toast.show(`Dock order ${pono} updated`, 'success');
        }
      } else {
        const newRecord = {
          id: 'RC-' + String(Date.now()).slice(-6),
          sNo: this.receivedChemicalsList.length + 1,
          poNo: pono,
          chemical: 'CARNAL 659 S ADVANCED (STPP)',
          blNo: blno,
          containerNo: container,
          receivedBags: bags,
          receivedQty: qty,
          boeNo: boeNo,
          boeDate: boeDate,
          clearedDate: clearedDate,
          balanceBags: Math.max(0, 4000 - bags),
          balanceQty: Math.max(0, 100000 - qty),
          status: status,
          plant: plant,
          year: '2026-27'
        };
        this.receivedChemicalsList.unshift(newRecord);
        if (window.Toast) window.Toast.show(`Dock intake order ${pono} registered`, 'success');
      }

      Modal.close();
      const subContainer = document.getElementById('preproc-subpage-content') || document.getElementById('preprocessing-content');
      if (subContainer) this.renderReceivedChemicals(subContainer);
    });
  },

  openChemConsumptionModal(editItem = null) {
    const isEdit = Boolean(editItem);
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) {
      console.error('Modal system unavailable');
      if (typeof Toast !== 'undefined') Toast.show('Modal system unavailable', 'error');
      return;
    }

    m.open({
      title: isEdit ? 'GS CHEM CONSUMPTION EDIT' : 'GS CHEM CONSUMPTION CREATE',
      size: 'lg',
      content: `
        <div class="modal-breadcrumb text-xs text-slate-500 mb-3">Chemical Screens / Chemicals Consumption / ${isEdit ? 'Edit Usage' : 'Log Daily Usage'}</div>
        <form id="modal-cc-form" class="space-y-4">
          <input type="hidden" id="modal-cc-id" value="${editItem?.id || ''}">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">DATE <span class="text-red-500 font-bold">*</span></label>
              <input type="date" id="modal-cc-date" value="${editItem?.date || new Date().toISOString().slice(0, 10)}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT NAME <span class="text-red-500 font-bold">*</span></label>
              <select id="modal-cc-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="DFL UNIT-5 (JPT)" selected>DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">USAGE TYPE</label>
              <select id="modal-cc-usage" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="Daily Floor Consumption" selected>Daily Floor Consumption</option>
                <option value="Tank Dosing">Tank Dosing</option>
                <option value="Interplant Sent">Interplant Sent</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CHEMICAL NAME <span class="text-red-500 font-bold">*</span></label>
              <select id="modal-cc-chem" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="CARNAL 659 S ADVANCED (STPP)" selected>CARNAL 659 S ADVANCED (STPP)</option>
                <option value="ALTESA NEO S100 (NP)">ALTESA NEO S100 (NP)</option>
                <option value="CARFOSEL B 940 (STPP)">CARFOSEL B 940 (STPP)</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BAGS QUANTITY <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-cc-bags" value="${editItem?.usedBags || '4'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">QUANTITY IN KGS <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-cc-kgs" value="${editItem?.usedKgs || '100'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SEND TO</label>
              <input type="text" id="modal-cc-sendto" value="${editItem?.sendedTo || 'Chilled Bath Tank S-1'}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="flex justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
            <button type="button" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer">💾 Save Consumption</button>
          </div>
        </form>
      `
    });

    document.getElementById('modal-cc-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const dateVal = document.getElementById('modal-cc-date')?.value || new Date().toISOString().slice(0, 10);
      const chem = document.getElementById('modal-cc-chem')?.value || 'CARNAL 659 S ADVANCED (STPP)';
      const bags = parseInt(document.getElementById('modal-cc-bags')?.value) || 0;
      const kgs = parseFloat(document.getElementById('modal-cc-kgs')?.value) || 0;
      const sendto = document.getElementById('modal-cc-sendto')?.value || '';

      const newRecord = {
        id: 'CC-' + String(Date.now()).slice(-6),
        sNo: this.chemicalsConsumptionList.length + 1,
        date: dateVal,
        chemical: chem,
        receivedFrom: '',
        receivedBags: 0,
        receivedKgs: 0,
        sendedTo: sendto,
        sendedBags: 0,
        sendedKgs: 0,
        usedBags: bags,
        usedKgs: kgs,
        openingBags: 2751,
        openingKgs: 68775,
        closingBags: Math.max(0, 2751 - bags),
        closingKgs: Math.max(0, 68775 - kgs),
        plant: 'DFL UNIT-5 (JPT)'
      };
      this.chemicalsConsumptionList.unshift(newRecord);
      if (window.Toast) window.Toast.show('Chemical floor consumption recorded', 'success');

      Modal.close();
      const subContainer = document.getElementById('preproc-subpage-content') || document.getElementById('preprocessing-content');
      if (subContainer) this.renderChemicalsConsumption(subContainer);
    });
  },

  openChemPaymentModal(editItem = null) {
    const isEdit = Boolean(editItem);
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) {
      console.error('Modal system unavailable');
      if (typeof Toast !== 'undefined') Toast.show('Modal system unavailable', 'error');
      return;
    }

    m.open({
      title: isEdit ? 'GS CHEM PO PAYMENT EDIT' : 'GS CHEM PO PAYMENT CREATE',
      size: 'lg',
      content: `
        <div class="modal-breadcrumb text-xs text-slate-500 mb-3">Chemical Screens / Payments List / ${isEdit ? 'Edit Payment' : 'Create Payment'}</div>
        <form id="modal-cp-form" class="space-y-4">
          <input type="hidden" id="modal-cp-id" value="${editItem?.id || ''}">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PONO <span class="text-red-500 font-bold">*</span></label>
              <input type="text" id="modal-cp-pono" value="${editItem?.poNo || 'DFL/KPL/2627/003'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CHEMICAL NAME <span class="text-red-500 font-bold">*</span></label>
              <input type="text" id="modal-cp-chem" value="${editItem?.chemicalName || 'ALTESA NEO S100 (NP)'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PARTY NAME <span class="text-red-500 font-bold">*</span></label>
              <input type="text" id="modal-cp-party" value="${editItem?.partyName || 'KPL INTERNATIONAL LTD'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">RECIEVED QUANTITY (KGS) <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-cp-recv-qty" value="${editItem?.receivedQty || '4800'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">AMOUNT (RUPEES) <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-cp-amt" value="${editItem?.amount || '868800'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PAID AMOUNT (RUPEES) <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-cp-paid-amt" value="${editItem?.paidAmount || '868800'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BANK REFERENCE NO <span class="text-red-500 font-bold">*</span></label>
              <input type="text" id="modal-cp-bankref" placeholder="Enter Invoice No" value="${editItem?.bankRefNo || 'NEFT2627001'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PAYMENT DATE</label>
              <input type="date" id="modal-cp-date" value="${editItem?.paymentDate || '2026-10-26'}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REMARKS</label>
            <input type="text" id="modal-cp-remarks" value="${editItem?.remarks || ''}" placeholder="Enter remarks" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div class="flex justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
            <button type="button" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer">💾 Save Payment</button>
          </div>
        </form>
      `
    });

    document.getElementById('modal-cp-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const idVal = document.getElementById('modal-cp-id')?.value;
      const pono = document.getElementById('modal-cp-pono')?.value || '';
      const chem = document.getElementById('modal-cp-chem')?.value || '';
      const party = document.getElementById('modal-cp-party')?.value || '';
      const qty = parseFloat(document.getElementById('modal-cp-recv-qty')?.value) || 0;
      const amt = parseFloat(document.getElementById('modal-cp-amt')?.value) || 0;
      const paidAmt = parseFloat(document.getElementById('modal-cp-paid-amt')?.value) || 0;
      const bankref = document.getElementById('modal-cp-bankref')?.value || '';
      const dateVal = document.getElementById('modal-cp-date')?.value || '';
      const remarks = document.getElementById('modal-cp-remarks')?.value || '';

      if (idVal) {
        const idx = this.chemicalPaymentsList.findIndex(x => x.id === idVal);
        if (idx !== -1) {
          this.chemicalPaymentsList[idx] = { ...this.chemicalPaymentsList[idx], poNo: pono, chemicalName: chem, partyName: party, receivedQty: qty, amount: amt, paidAmount: paidAmt, bankRefNo: bankref, paymentDate: dateVal, remarks };
          if (window.Toast) window.Toast.show(`Payment ${pono} updated successfully`, 'success');
        }
      } else {
        const newRecord = {
          id: 'CP-' + String(Date.now()).slice(-6),
          sNo: this.chemicalPaymentsList.length + 1,
          poNo: pono,
          chemicalName: chem,
          partyName: party,
          receivedQty: qty,
          amount: amt,
          paidAmount: paidAmt,
          bankRefNo: bankref,
          paymentDate: dateVal,
          remarks: remarks,
          status: 'Paid',
          supplier: party,
          year: '2026-27'
        };
        this.chemicalPaymentsList.unshift(newRecord);
        if (window.Toast) window.Toast.show(`Payment recorded for ${pono}`, 'success');
      }

      Modal.close();
      const subContainer = document.getElementById('preproc-subpage-content') || document.getElementById('preprocessing-content');
      if (subContainer) this.renderChemicalPaymentsList(subContainer);
    });
  }
};


if (typeof window !== 'undefined') {
  window.PreprocessingView = PreprocessingView;
}
