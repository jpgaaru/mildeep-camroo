// AquaOps Design System — Clean Minimal Custom Select Controller
// Replaces native OS <select> menus with a simple, clean dropdown anchored directly beneath the input field.

import { CalendarPicker } from './calendarPicker.js';

export const SelectPicker = {
  instances: new Map(),
  openInstance: null,
  observer: null,

  init() {
    this.injectDesignSystemOverrides();
    this.upgradeAllSelects();
    this.bindGlobalEvents();
    this.startObserver();
  },

  injectDesignSystemOverrides() {
    if (document.getElementById('aquaops-rich-select-styles')) return;
    const style = document.createElement('style');
    style.id = 'aquaops-rich-select-styles';
    style.textContent = `
      select.aquapulse-native-select-hidden {
        display: none !important;
      }
      .rich-select {
        position: relative !important;
        width: 100%;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      }
      .rich-select.compact {
        width: auto;
        display: inline-block;
      }
      .rich-select .rs-trigger {
        height: 38px;
        width: 100%;
        padding: 0 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        border: 1px solid #CBD5E1;
        border-radius: 8px;
        background: #FFFFFF;
        cursor: pointer;
        user-select: none;
        font-size: 13px;
        font-weight: 500;
        color: #0F172A;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
        outline: none;
      }
      .rich-select.compact .rs-trigger {
        height: 32px;
        padding: 0 10px;
        font-size: 12px;
        min-width: 72px;
      }
      .rich-select .rs-trigger:hover {
        border-color: #94A3B8;
      }
      .rich-select.open .rs-trigger,
      .rich-select .rs-trigger:focus-visible {
        border-color: #006C7A !important;
        box-shadow: 0 0 0 3px rgba(0, 108, 122, 0.15) !important;
        background: #FFFFFF !important;
      }
      .rich-select .rs-current {
        display: flex;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 0;
        flex: 1;
      }
      .rich-select .rs-current span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .rich-select .rs-chev {
        width: 15px;
        height: 15px;
        color: #64748B;
        transition: transform 0.18s ease, color 0.15s ease;
        flex-shrink: 0;
      }
      .rich-select.open .rs-chev {
        transform: rotate(180deg);
        color: #006C7A;
      }
      .rich-select .rs-menu {
        position: absolute !important;
        top: calc(100% + 5px) !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        min-width: 150px;
        background: #FFFFFF !important;
        border: 1px solid #CBD5E1 !important;
        border-radius: 10px !important;
        box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.12), 0 4px 10px -4px rgba(15, 23, 42, 0.06) !important;
        display: none;
        z-index: 9999 !important;
        overflow: hidden;
      }
      .rich-select.auto-drop-up .rs-menu {
        top: auto !important;
        bottom: calc(100% + 5px) !important;
      }
      .rich-select.open .rs-menu {
        display: block !important;
      }
      .rich-select .rs-list {
        max-height: 220px;
        overflow-y: auto;
        padding: 4px;
      }
      .rich-select .rs-option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 8px 10px;
        border-radius: 7px;
        cursor: pointer;
        transition: background 0.12s ease, color 0.12s ease;
        user-select: none;
        font-size: 13px;
        font-weight: 500;
        color: #1E293B;
      }
      .rich-select.compact .rs-option {
        padding: 6px 9px;
        font-size: 12px;
      }
      .rich-select .rs-option:hover {
        background: #F1F5F9;
        color: #0F172A;
      }
      .rich-select .rs-option.selected {
        background: #F0FAFC;
        color: #006C7A;
        font-weight: 700;
      }
      .rich-select .rs-opt-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
      }
      .rich-select .rs-check-icon {
        width: 14px;
        height: 14px;
        color: #006C7A;
        display: none;
        flex-shrink: 0;
      }
      .rich-select .rs-option.selected .rs-check-icon {
        display: block;
      }
    `;
    document.head.appendChild(style);
  },

  startObserver() {
    if (this.observer) return;
    this.observer = new MutationObserver((mutations) => {
      const hasRelevantMutation = mutations.some(m => {
        return Array.from(m.addedNodes).some(node => {
          if (node.nodeType !== 1) return false;
          if (node.classList && (node.classList.contains('rich-select') || node.classList.contains('custom-select') || node.classList.contains('calendar-popover') || node.classList.contains('rs-menu'))) {
            return false;
          }
          return node.tagName === 'SELECT' || (typeof node.querySelector === 'function' && node.querySelector('select'));
        });
      });
      if (hasRelevantMutation) {
        this.upgradeAllSelects();
      }
    });
    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  },

  upgradeAllSelects(root = document) {
    const selects = (root || document).querySelectorAll('select:not([multiple])');
    selects.forEach(selectEl => {
      if ((selectEl.size || 0) > 1) return;
      if (selectEl.dataset.aquaUpgraded === 'true') {
        const next = selectEl.nextElementSibling;
        if (next && next.classList.contains('rich-select')) {
          return;
        }
      }
      this.upgradeSelect(selectEl);
    });
  },

  upgradeSelect(selectEl) {
    selectEl.dataset.aquaUpgraded = 'true';
    selectEl.classList.add('aquapulse-native-select-hidden');
    selectEl.setAttribute('aria-hidden', 'true');
    selectEl.tabIndex = -1;

    // Clean up any existing duplicate custom-select or rich-select adjacent to this select
    let sibling = selectEl.nextElementSibling;
    while (sibling && (sibling.classList.contains('rich-select') || sibling.classList.contains('custom-select'))) {
      const toRemove = sibling;
      sibling = sibling.nextElementSibling;
      toRemove.remove();
    }

    const isCompact =
      selectEl.className.includes('py-1 ') ||
      selectEl.className.includes('h-7') ||
      selectEl.className.includes('h-8') ||
      Boolean(selectEl.closest('.pagination-controls, [id*="pagination"]'));

    const wrapper = document.createElement('div');
    wrapper.className = `rich-select${isCompact ? ' compact' : ''}`;

    const options = Array.from(selectEl.options || []);
    const selectedOpt = options[selectEl.selectedIndex] || options[0];
    const currentLabel = selectedOpt ? selectedOpt.text.trim() : 'Select...';

    const optionsHtml = options.map((opt, idx) => {
      const isSelected = idx === selectEl.selectedIndex;
      const label = opt.text.trim();
      const val = opt.value;

      return `
        <div class="rs-option ${isSelected ? 'selected' : ''}" role="option" data-opt-idx="${idx}" data-value="${val.replace(/"/g, '&quot;')}">
          <span class="rs-opt-title">${label}</span>
          <svg class="rs-check-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
      `;
    }).join('');

    wrapper.innerHTML = `
      <div class="rs-trigger" tabindex="0" role="combobox" aria-expanded="false" aria-haspopup="listbox">
        <span class="rs-current">
          <span class="rs-current-label">${currentLabel}</span>
        </span>
        <svg class="rs-chev" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
      <div class="rs-menu">
        <div class="rs-list">
          ${optionsHtml}
        </div>
      </div>
    `;

    selectEl.insertAdjacentElement('afterend', wrapper);

    const instance = {
      selectEl,
      wrapper,
      isCompact,
      syncFromSelect: () => {
        const opts = Array.from(selectEl.options || []);
        const selOpt = opts[selectEl.selectedIndex] || opts[0];
        const labelEl = wrapper.querySelector('.rs-current-label');
        if (labelEl && selOpt) {
          labelEl.textContent = selOpt.text.trim();
        }
        wrapper.querySelectorAll('.rs-option').forEach((optEl) => {
          const idx = parseInt(optEl.getAttribute('data-opt-idx'), 10);
          optEl.classList.toggle('selected', idx === selectEl.selectedIndex);
        });
      },
      checkPlacement: () => {
        const trigger = wrapper.querySelector('.rs-trigger');
        if (!trigger) return;
        const rect = trigger.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        if (spaceBelow < 220 && rect.top > spaceBelow) {
          wrapper.classList.add('auto-drop-up');
        } else {
          wrapper.classList.remove('auto-drop-up');
        }
      },
      open: () => {
        if (CalendarPicker && typeof CalendarPicker.close === 'function') {
          CalendarPicker.close();
        }
        if (this.openInstance && this.openInstance !== instance) {
          this.openInstance.close();
        }
        instance.syncFromSelect();
        instance.checkPlacement();
        wrapper.classList.add('open');
        const trigger = wrapper.querySelector('.rs-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'true');
        this.openInstance = instance;
      },
      close: () => {
        wrapper.classList.remove('open');
        const trigger = wrapper.querySelector('.rs-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
        if (this.openInstance === instance) {
          this.openInstance = null;
        }
      }
    };

    this.bindInstanceEvents(instance);
    this.instances.set(selectEl, instance);
  },

  bindInstanceEvents(instance) {
    const { wrapper, selectEl } = instance;
    const trigger = wrapper.querySelector('.rs-trigger');

    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (wrapper.classList.contains('open')) {
          instance.close();
        } else {
          instance.open();
        }
      });

      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault();
          e.stopPropagation();
          if (!wrapper.classList.contains('open')) {
            instance.open();
          }
        } else if (e.key === 'Escape') {
          instance.close();
        }
      });
    }

    wrapper.querySelectorAll('.rs-option').forEach((optEl) => {
      optEl.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const idx = parseInt(optEl.getAttribute('data-opt-idx'), 10);
        if (!isNaN(idx) && selectEl.options[idx]) {
          selectEl.selectedIndex = idx;
          selectEl.value = selectEl.options[idx].value;
          instance.syncFromSelect();
          instance.close();

          selectEl.dispatchEvent(new Event('input', { bubbles: true }));
          selectEl.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    });
  },

  bindGlobalEvents() {
    document.addEventListener('click', (e) => {
      if (this.openInstance && !this.openInstance.wrapper.contains(e.target)) {
        this.openInstance.close();
      }
      setTimeout(() => {
        this.instances.forEach((inst, sel) => {
          if (document.body.contains(sel)) {
            inst.syncFromSelect();
          } else {
            this.instances.delete(sel);
          }
        });
      }, 10);
    });
  },

  close() {
    if (this.openInstance) {
      this.openInstance.close();
    }
  }
};
