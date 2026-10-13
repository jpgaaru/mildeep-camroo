// AquaOps Design System — Enterprise Rich Select & Combobox Controller (AquaSelect)
// Automatically upgrades all <select> elements into AquaOps .rich-select molecules
// Zero native OS gray dropdowns; full search, subtitles, status badges, checkmarks & keyboard navigation.

import { CalendarPicker } from './calendarPicker.js';

// Domain metadata enrichment for fisheries ERP options (matching designsystem.html)
const OPTION_METADATA = {
  'All Species (Select)': { sub: 'All cultivated & wild-caught species', badge: 'All' },
  'All Species': { sub: 'All cultivated & wild-caught species', badge: 'All' },
  'Vannamei (VM)': { sub: 'L. Vannamei · Whiteleg Shrimp · High Density', badge: 'Optimal' },
  'L. Vannamei': { sub: 'Whiteleg Shrimp · Prime Export Grade', badge: 'Optimal' },
  'Black Tiger (BT)': { sub: 'P. Monodon · Jumbo Tiger Grade', badge: 'Premium' },
  'P. Monodon': { sub: 'Black Tiger · Jumbo Export Grade', badge: 'Premium' },
  'Asian Seabass': { sub: 'Lates Calcarifer · Cage Harvest', badge: 'Active' },
  'Scampi': { sub: 'M. Rosenbergii · Freshwater Scampi', badge: 'Normal' },

  'All Centers (Select)': { sub: 'All coastal & delta procurement hubs', badge: 'All Hubs' },
  'All Centers': { sub: 'All coastal & delta procurement hubs', badge: 'All Hubs' },
  'Bhimavaram Center #1': { sub: 'West Godavari Cluster · Code BVM-C1', badge: 'Hub #1' },
  'Kakinada Sea Intake #2': { sub: 'East Godavari Coast · Code KKD-C2', badge: 'Hub #2' },
  'Amalapuram Harvesters #4': { sub: 'Konaseema Delta · Code AML-C4', badge: 'Hub #4' },
  'Machilipatnam Delta #3': { sub: 'Krishna Delta · Code MCN-C3', badge: 'Hub #3' },
  'Ongole Coastal Hub #1': { sub: 'Prakasam Coast · Code ONG-C1', badge: 'Hub #5' },
  'Visakhapatnam Gate Dock': { sub: 'Port Landing Dock · Code VSP-D1', badge: 'Dock #1' },

  'All Plants (Select)': { sub: 'All Devi Fisheries processing units', badge: 'All Units' },
  'All Plants': { sub: 'All Devi Fisheries processing units', badge: 'All Units' },
  'DFL UNIT-1 (VSP)': { sub: 'Visakhapatnam Export Processing Terminal', badge: 'Unit 1' },
  'DFL UNIT-2 (KKD)': { sub: 'Kakinada Deep Freeze & IQF Facility', badge: 'Unit 2' },
  'DFL UNIT-3 (PSP)': { sub: 'Peddapuram EU/USFDA Certified Plant', badge: 'Unit 3' },
  'DFL UNIT-4 (PND)': { sub: 'Penumantra Coldstore & Grading Unit', badge: 'Unit 4' },
  'DFL UNIT-5 (JPT)': { sub: 'Jaggampeta Main Processing Plant', badge: 'Unit 5' },
  'DFL UNIT-6 (JPT-II)': { sub: 'Jaggampeta Phase-II Value-Added Unit', badge: 'Unit 6' }
};

function getLeadingIconSvg(selectEl) {
  const labelText = (
    selectEl.previousElementSibling?.textContent ||
    selectEl.closest('div')?.querySelector('label')?.textContent ||
    selectEl.id ||
    ''
  ).toLowerCase();

  if (labelText.includes('species')) {
    return `<svg class="rs-lead-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>`;
  }
  if (labelText.includes('center') || labelText.includes('location') || labelText.includes('hub')) {
    return `<svg class="rs-lead-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
  }
  if (labelText.includes('plant') || labelText.includes('unit') || labelText.includes('company')) {
    return `<svg class="rs-lead-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>`;
  }
  if (labelText.includes('supplier') || labelText.includes('agent') || labelText.includes('farmer') || labelText.includes('vendor')) {
    return `<svg class="rs-lead-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
  }
  if (labelText.includes('status') || labelText.includes('priority')) {
    return `<svg class="rs-lead-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`;
  }
  return `<svg class="rs-lead-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>`;
}

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
        position: relative;
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
        transition: border-color 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
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
        background: #FAFBFC;
      }
      .rich-select.open .rs-trigger,
      .rich-select .rs-trigger:focus-visible {
        border-color: #006C7A !important;
        box-shadow: 0 0 0 3px rgba(0, 108, 122, 0.16) !important;
        background: #FFFFFF !important;
      }
      .rich-select .rs-current {
        display: flex;
        align-items: center;
        gap: 8px;
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
      .rich-select .rs-lead-icon {
        width: 15px;
        height: 15px;
        color: #006C7A;
        flex-shrink: 0;
      }
      .rich-select .rs-chev {
        width: 15px;
        height: 15px;
        color: #64748B;
        transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), color 0.18s ease;
        flex-shrink: 0;
      }
      .rich-select.open .rs-chev {
        transform: rotate(180deg);
        color: #006C7A;
      }
      .rich-select .rs-menu {
        position: fixed !important;
        background: #FFFFFF !important;
        border: 1px solid #CBD5E1 !important;
        border-radius: 14px !important;
        box-shadow: 0 16px 36px -6px rgba(10, 27, 57, 0.16), 0 6px 14px -4px rgba(0, 108, 122, 0.1) !important;
        display: none;
        z-index: 99999 !important;
        overflow: hidden;
        animation: rsSpring 0.18s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .rich-select.open .rs-menu {
        display: block !important;
      }
      .rich-select .rs-search-wrap {
        padding: 9px 12px !important;
        border-bottom: 1px solid #E2E8F0 !important;
        background: #F8FAFC !important;
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
      }
      .rich-select .rs-search-wrap svg {
        width: 14px !important;
        height: 14px !important;
        color: #64748B !important;
        flex-shrink: 0 !important;
      }
      .rich-select input.rs-search-input {
        width: 100% !important;
        border: none !important;
        background: transparent !important;
        box-shadow: none !important;
        padding: 0 !important;
        height: 22px !important;
        font-size: 12.5px !important;
        color: #0F172A !important;
        outline: none !important;
        border-radius: 0 !important;
      }
      .rich-select input.rs-search-input:focus {
        border: none !important;
        box-shadow: none !important;
      }
      .rich-select .rs-list {
        max-height: 250px;
        overflow-y: auto;
        padding: 6px;
      }
      .rich-select .rs-option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 8px 11px;
        border-radius: 9px;
        cursor: pointer;
        transition: background 0.14s ease, transform 0.14s ease;
        user-select: none;
      }
      .rich-select .rs-option:hover,
      .rich-select .rs-option.focused {
        background: #F1F5F9;
      }
      .rich-select .rs-option.selected {
        background: #F0FAFC;
        color: #005662;
      }
      .rich-select .rs-opt-main {
        display: flex;
        flex-direction: column;
        gap: 1px;
        min-width: 0;
        flex: 1;
      }
      .rich-select .rs-opt-title {
        font-size: 12.5px;
        font-weight: 600;
        color: #0F172A;
        line-height: 1.3;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .rich-select .rs-option.selected .rs-opt-title {
        color: #006C7A;
        font-weight: 700;
      }
      .rich-select .rs-opt-sub {
        font-size: 11px;
        color: #64748B;
        line-height: 1.3;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .rich-select .rs-opt-right {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }
      .rich-select .rs-opt-badge {
        font-size: 10px;
        font-weight: 700;
        padding: 2px 7px;
        border-radius: 9999px;
        background: #F1F5F9;
        color: #475569;
        border: 1px solid #E2E8F0;
      }
      .rich-select .rs-option.selected .rs-opt-badge {
        background: #D8F4F8;
        color: #005662;
        border-color: #84DFEB;
      }
      .rich-select .rs-check-icon {
        width: 15px;
        height: 15px;
        color: #006C7A;
        display: none;
        flex-shrink: 0;
      }
      .rich-select .rs-option.selected .rs-check-icon {
        display: block;
      }
      .rich-select .rs-empty-msg {
        padding: 14px 12px;
        text-align: center;
        font-size: 12px;
        color: #64748B;
        display: none;
      }
    `;
    document.head.appendChild(style);
  },

  startObserver() {
    if (this.observer) return;
    this.observer = new MutationObserver(() => {
      this.upgradeAllSelects();
    });
    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  },

  upgradeAllSelects(root = document) {
    const selects = root.querySelectorAll('select:not([multiple])');
    selects.forEach(selectEl => {
      if ((selectEl.size || 0) > 1) return;
      if (selectEl.dataset.aquaUpgraded === 'true') {
        // Check if sibling .rich-select still exists
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

    // Remove any stale adjacent rich-select
    if (selectEl.nextElementSibling && selectEl.nextElementSibling.classList.contains('rich-select')) {
      selectEl.nextElementSibling.remove();
    }

    const isCompact =
      selectEl.className.includes('py-1 ') ||
      selectEl.className.includes('h-7') ||
      selectEl.className.includes('h-8') ||
      Boolean(selectEl.closest('.pagination-controls, [id*="pagination"]'));

    const wrapper = document.createElement('div');
    wrapper.className = `rich-select${isCompact ? ' compact' : ''}`;

    const leadIcon = isCompact ? '' : getLeadingIconSvg(selectEl);

    const buildMarkup = () => {
      const options = Array.from(selectEl.options || []);
      const selectedOpt = options[selectEl.selectedIndex] || options[0];
      const currentLabel = selectedOpt ? selectedOpt.text.trim() : 'Select...';
      const showSearch = !isCompact && options.length >= 3;

      const optionsHtml = options.map((opt, idx) => {
        const isSelected = idx === selectEl.selectedIndex;
        const label = opt.text.trim();
        const val = opt.value;
        const meta = OPTION_METADATA[label] || null;
        const subText = opt.dataset.sub || (meta ? meta.sub : '');
        const badgeText = opt.dataset.badge || (meta ? meta.badge : '');

        return `
          <div class="rs-option ${isSelected ? 'selected' : ''}" role="option" data-opt-idx="${idx}" data-value="${val.replace(/"/g, '&quot;')}">
            <div class="rs-opt-main">
              <div class="rs-opt-title">${label}</div>
              ${subText ? `<div class="rs-opt-sub">${subText}</div>` : ''}
            </div>
            <div class="rs-opt-right">
              ${badgeText ? `<span class="rs-opt-badge">${badgeText}</span>` : ''}
              <svg class="rs-check-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
          </div>
        `;
      }).join('');

      wrapper.innerHTML = `
        <div class="rs-trigger" tabindex="0" role="combobox" aria-expanded="false" aria-haspopup="listbox">
          <span class="rs-current">
            ${leadIcon}
            <span class="rs-current-label">${currentLabel}</span>
          </span>
          <svg class="rs-chev" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
        <div class="rs-menu">
          ${showSearch ? `
            <div class="rs-search-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input type="text" class="rs-search-input" placeholder="Filter options..." autocomplete="off" />
            </div>
          ` : ''}
          <div class="rs-list">
            <div class="rs-empty-msg">No matching options found</div>
            ${optionsHtml}
          </div>
        </div>
      `;
    };

    buildMarkup();
    selectEl.insertAdjacentElement('afterend', wrapper);

    const instance = {
      selectEl,
      wrapper,
      isCompact,
      syncFromSelect: () => {
        const options = Array.from(selectEl.options || []);
        const selectedOpt = options[selectEl.selectedIndex] || options[0];
        const labelEl = wrapper.querySelector('.rs-current-label');
        if (labelEl && selectedOpt) {
          labelEl.textContent = selectedOpt.text.trim();
        }
        wrapper.querySelectorAll('.rs-option').forEach((optEl) => {
          const idx = parseInt(optEl.getAttribute('data-opt-idx'), 10);
          optEl.classList.toggle('selected', idx === selectEl.selectedIndex);
        });
      },
      positionMenu: () => {
        const trigger = wrapper.querySelector('.rs-trigger');
        const menu = wrapper.querySelector('.rs-menu');
        if (!trigger || !menu) return;

        const rect = trigger.getBoundingClientRect();
        const hasRichMeta = Boolean(wrapper.querySelector('.rs-opt-sub'));
        const minWidth = isCompact ? Math.max(rect.width, 130) : (hasRichMeta ? Math.max(rect.width, 290) : Math.max(rect.width, 200));
        menu.style.width = `${minWidth}px`;

        const menuHeight = menu.offsetHeight || 240;
        let top = rect.bottom + 6;
        let left = rect.left;

        if (top + menuHeight > window.innerHeight - 12 && rect.top > menuHeight + 12) {
          top = rect.top - menuHeight - 6;
        }
        if (left + minWidth > window.innerWidth - 12) {
          left = Math.max(12, window.innerWidth - minWidth - 12);
        }

        menu.style.top = `${top}px`;
        menu.style.left = `${left}px`;
      },
      open: () => {
        if (CalendarPicker && typeof CalendarPicker.close === 'function') {
          CalendarPicker.close();
        }
        if (this.openInstance && this.openInstance !== instance) {
          this.openInstance.close();
        }
        instance.syncFromSelect();
        wrapper.classList.add('open');
        const trigger = wrapper.querySelector('.rs-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'true');

        const searchInput = wrapper.querySelector('.rs-search-input');
        if (searchInput) {
          searchInput.value = '';
          instance.filterOptions('');
        }

        instance.positionMenu();
        this.openInstance = instance;

        if (searchInput) {
          setTimeout(() => searchInput.focus(), 20);
        }
      },
      close: () => {
        wrapper.classList.remove('open');
        const trigger = wrapper.querySelector('.rs-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
        if (this.openInstance === instance) {
          this.openInstance = null;
        }
      },
      filterOptions: (query) => {
        const term = (query || '').toLowerCase().trim();
        let visibleCount = 0;
        wrapper.querySelectorAll('.rs-option').forEach((optEl) => {
          const text = optEl.textContent.toLowerCase();
          const show = !term || text.includes(term);
          optEl.style.display = show ? 'flex' : 'none';
          if (show) visibleCount++;
        });
        const emptyMsg = wrapper.querySelector('.rs-empty-msg');
        if (emptyMsg) {
          emptyMsg.style.display = visibleCount === 0 ? 'block' : 'none';
        }
      }
    };

    this.bindInstanceEvents(instance);
    this.instances.set(selectEl, instance);
  },

  bindInstanceEvents(instance) {
    const { wrapper, selectEl } = instance;
    const trigger = wrapper.querySelector('.rs-trigger');
    const searchInput = wrapper.querySelector('.rs-search-input');

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

    if (searchInput) {
      searchInput.addEventListener('click', (e) => e.stopPropagation());
      searchInput.addEventListener('input', (e) => {
        instance.filterOptions(e.target.value);
        instance.positionMenu();
      });
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          instance.close();
          trigger?.focus();
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

          // Dispatch native events so all existing ERP view listeners work
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
      // Sync all rich-selects after any button click (e.g. Reset Filters button)
      setTimeout(() => {
        this.instances.forEach((inst, sel) => {
          if ( document.body.contains(sel) ) {
            inst.syncFromSelect();
          } else {
            this.instances.delete(sel);
          }
        });
      }, 10);
    });

    window.addEventListener('resize', () => {
      if (this.openInstance) {
        this.openInstance.positionMenu();
      }
    });

    window.addEventListener('scroll', (e) => {
      if (this.openInstance) {
        const menu = this.openInstance.wrapper.querySelector('.rs-menu');
        if (menu && menu.contains(e.target)) return;
        this.openInstance.positionMenu();
      }
    }, true);
  },

  close() {
    if (this.openInstance) {
      this.openInstance.close();
    }
  }
};
