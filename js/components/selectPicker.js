// AquaPulse Enterprise Custom Select Dropdown Popover (v5 Enterprise)
// Replaces native OS gray <select> menus with a custom AquaPulse popover matching CalendarPicker

import { CalendarPicker } from './calendarPicker.js';

export const SelectPicker = {
  activeSelect: null,
  popover: null,
  searchQuery: '',

  init() {
    this.createPopover();
    this.bindGlobalListeners();
  },

  createPopover() {
    let existing = document.getElementById('aquapulse-select-popover');
    if (existing) {
      this.popover = existing;
      return;
    }

    const popover = document.createElement('div');
    popover.id = 'aquapulse-select-popover';
    popover.className = 'fixed hidden bg-white rounded-2xl border border-[#CBD5E1] p-1.5 select-none text-xs font-sans animate-fade-in';
    popover.style.zIndex = '99999';
    popover.style.boxShadow = '0 10px 30px -5px rgba(0, 108, 122, 0.18), 0 8px 12px -6px rgba(0, 0, 0, 0.08)';
    document.body.appendChild(popover);
    this.popover = popover;
  },

  bindGlobalListeners() {
    const interceptSelect = (e) => {
      const selectEl = e.target.closest('select');
      if (selectEl && !selectEl.disabled && !selectEl.multiple && (selectEl.size || 0) <= 1) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'mousedown') {
          this.toggle(selectEl);
        }
        return false;
      }
    };

    // Intercept mousedown & pointerdown in capture phase to prevent native OS dropdown menu
    document.addEventListener('pointerdown', (e) => {
      const selectEl = e.target.closest('select');
      if (selectEl && !selectEl.disabled && !selectEl.multiple && (selectEl.size || 0) <= 1) {
        e.preventDefault();
      }
    }, true);

    document.addEventListener('mousedown', (e) => {
      const selectEl = e.target.closest('select');
      if (selectEl && !selectEl.disabled && !selectEl.multiple && (selectEl.size || 0) <= 1) {
        e.preventDefault();
        e.stopPropagation();
        this.toggle(selectEl);
        return;
      }

      // Close when clicking outside popover
      if (this.popover && !this.popover.contains(e.target)) {
        this.close();
      }
    }, true);

    document.addEventListener('click', (e) => {
      const selectEl = e.target.closest('select');
      if (selectEl && !selectEl.disabled && !selectEl.multiple && (selectEl.size || 0) <= 1) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    // Keyboard accessibility (Space, Enter, ArrowDown, ArrowUp, Escape)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
        return;
      }

      const selectEl = e.target.closest('select');
      if (selectEl && !selectEl.disabled && [' ', 'Enter', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        this.open(selectEl);
      }
    }, true);

    // Reposition on window resize / scroll
    window.addEventListener('resize', () => {
      if (this.activeSelect && this.popover && !this.popover.classList.contains('hidden')) {
        this.positionPopover();
      }
    });

    window.addEventListener('scroll', (e) => {
      // Do not reposition/close if scrolling inside the popover list itself
      if (this.popover && this.popover.contains(e.target)) return;
      if (this.activeSelect && this.popover && !this.popover.classList.contains('hidden')) {
        this.positionPopover();
      }
    }, true);
  },

  toggle(selectElement) {
    if (this.activeSelect === selectElement && this.popover && !this.popover.classList.contains('hidden')) {
      this.close();
    } else {
      this.open(selectElement);
    }
  },

  open(selectElement) {
    if (!this.popover) this.createPopover();

    // Close CalendarPicker if open
    if (CalendarPicker && typeof CalendarPicker.close === 'function') {
      CalendarPicker.close();
    }

    if (this.activeSelect && this.activeSelect !== selectElement) {
      this.activeSelect.classList.remove('aquapulse-select-open');
    }

    this.activeSelect = selectElement;
    this.searchQuery = '';
    selectElement.classList.add('aquapulse-select-open');
    selectElement.blur();

    this.render();
    this.popover.classList.remove('hidden');
    this.positionPopover();

    // Focus search input if present
    const searchInp = this.popover.querySelector('#aquapulse-select-search');
    if (searchInp) {
      setTimeout(() => searchInp.focus(), 10);
    }
  },

  close() {
    if (this.activeSelect) {
      this.activeSelect.classList.remove('aquapulse-select-open');
    }
    if (this.popover) {
      this.popover.classList.add('hidden');
    }
    this.activeSelect = null;
    this.searchQuery = '';
  },

  positionPopover() {
    if (!this.activeSelect || !this.popover) return;
    const rect = this.activeSelect.getBoundingClientRect();
    const popWidth = Math.max(rect.width, 190);
    this.popover.style.width = `${popWidth}px`;

    const popHeight = this.popover.offsetHeight || 240;
    let top = rect.bottom + 6;
    let left = rect.left;

    // Flip above if overflowing bottom viewport
    if (top + popHeight > window.innerHeight - 12) {
      top = Math.max(12, rect.top - popHeight - 6);
    }

    // Clamp right edge
    if (left + popWidth > window.innerWidth - 12) {
      left = Math.max(12, window.innerWidth - popWidth - 12);
    }

    this.popover.style.top = `${top}px`;
    this.popover.style.left = `${left}px`;
  },

  render() {
    if (!this.activeSelect || !this.popover) return;

    const options = Array.from(this.activeSelect.options || []);
    const selectedIdx = this.activeSelect.selectedIndex;
    const showSearch = options.length > 7;

    const searchHtml = showSearch ? `
      <div class="px-1.5 pt-1 pb-1.5 border-b border-[#F1F5F9] mb-1">
        <div class="relative flex items-center">
          <svg class="w-3.5 h-3.5 text-[#94A3B8] absolute left-2.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke-width="2"/><path d="m21 21-4.3-4.3" stroke-width="2" stroke-linecap="round"/></svg>
          <input
            type="text"
            id="aquapulse-select-search"
            value="${this.searchQuery}"
            placeholder="Filter options..."
            autocomplete="off"
            class="w-full h-8 pl-8 pr-3 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006C7A] text-[#0F172A]"
          />
        </div>
      </div>
    ` : '';

    this.popover.innerHTML = `
      ${searchHtml}
      <div id="aquapulse-select-options-list" class="max-h-60 overflow-y-auto space-y-0.5 pr-0.5">
        ${this.renderOptionsList(options, selectedIdx)}
      </div>
    `;

    this.bindPopoverEvents(options);
  },

  renderOptionsList(options, selectedIdx) {
    const q = (this.searchQuery || '').trim().toLowerCase();
    const filtered = options
      .map((opt, idx) => ({ opt, idx }))
      .filter(({ opt }) => !q || opt.text.toLowerCase().includes(q));

    if (filtered.length === 0) {
      return `<div class="px-3 py-3 text-center text-[#94A3B8] text-xs">No matching options</div>`;
    }

    return filtered.map(({ opt, idx }) => {
      const isSelected = idx === selectedIdx;
      const isDisabled = opt.disabled;

      if (isDisabled) {
        return `
          <div class="px-3 py-2 rounded-xl text-xs text-[#94A3B8] cursor-not-allowed select-none">
            ${opt.text}
          </div>
        `;
      }

      return `
        <button
          type="button"
          data-opt-idx="${idx}"
          class="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between gap-2 transition-all cursor-pointer ${
            isSelected
              ? 'bg-[#F0FAFC] text-[#006C7A] font-bold'
              : 'text-[#0F172A] font-medium hover:bg-[#F8FAFC] hover:text-[#006C7A]'
          }"
        >
          <span class="truncate">${opt.text}</span>
          ${
            isSelected
              ? `<svg class="w-4 h-4 text-[#006C7A] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>`
              : ''
          }
        </button>
      `;
    }).join('');
  },

  bindPopoverEvents(options) {
    const listEl = this.popover.querySelector('#aquapulse-select-options-list');
    const searchInp = this.popover.querySelector('#aquapulse-select-search');

    if (searchInp && listEl) {
      searchInp.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        listEl.innerHTML = this.renderOptionsList(options, this.activeSelect.selectedIndex);
        this.bindOptionClicks();
      });
    }

    this.bindOptionClicks();
  },

  bindOptionClicks() {
    if (!this.popover) return;
    this.popover.querySelectorAll('[data-opt-idx]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-opt-idx'), 10);
        if (this.activeSelect && !isNaN(idx)) {
          const targetSelect = this.activeSelect;
          targetSelect.selectedIndex = idx;
          if (targetSelect.options[idx]) {
            targetSelect.value = targetSelect.options[idx].value;
          }
          // Dispatch native input and change events so all listeners and inline onchange handlers run
          targetSelect.dispatchEvent(new Event('input', { bubbles: true }));
          targetSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
        this.close();
      });
    });
  }
};
