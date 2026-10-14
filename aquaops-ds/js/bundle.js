
/**
 * AquaOps Design System — Self-Contained Bundle
 * Works seamlessly across file://, localhost, and production servers with zero CORS dependencies
 */
(function() {
  /**
 * AquaOps Design System — Toast Notification Engine
 * High-performance notification toasts with scoped Lucide icon rendering
 */

class AquaToast {
  static show(message, variant = '') {
    const container = document.getElementById('toasts') || AquaToast.createContainer();
    const toastEl = document.createElement('div');
    toastEl.className = `toast ${variant}`;
    toastEl.innerHTML = `<i data-lucide="check"></i><span>${message}</span>`;
    container.appendChild(toastEl);

    if (window.lucide) {
      window.lucide.createIcons({ root: toastEl });
    }

    setTimeout(() => {
      toastEl.style.opacity = '0';
      toastEl.style.transform = 'translateY(10px)';
      toastEl.style.transition = 'all 0.25s var(--ease)';
      setTimeout(() => toastEl.remove(), 260);
    }, 2800);
  }

  static createContainer() {
    const c = document.createElement('div');
    c.id = 'toasts';
    document.body.appendChild(c);
    return c;
  }
}

  /**
 * AquaOps Design System — Kinetic Motion Controller (v5 Enterprise)
 * Drives physics-based segment gliders, tag dismissal animations,
 * drag-and-drop dropzone micro-interactions, and copy button morphing
 */

class AquaMotion {
  static init() {
    this.initSegmentGliders();
    this.initTagDismissals();
    this.initDropzones();
    this.initCopyMorph();
  }

  /**
   * 1. Physical Segment Glider (Sliding Pill Physics)
   */
  static initSegmentGliders() {
    document.querySelectorAll('.segmented-control').forEach((sc) => {
      // Ensure a physical glider element exists
      let glider = sc.querySelector('.segment-glider');
      if (!glider) {
        glider = document.createElement('div');
        glider.className = 'segment-glider';
        sc.prepend(glider);
      }

      const updateGlider = (activeBtn) => {
        if (!activeBtn) return;
        const scRect = sc.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        const left = btnRect.left - scRect.left;
        const width = btnRect.width;

        glider.style.transform = `translateX(${left - 3}px)`;
        glider.style.width = `${width}px`;
      };

      // Set initial glider position
      const initialActive = sc.querySelector('.segment-btn.active') || sc.querySelector('.segment-btn');
      if (initialActive) {
        initialActive.classList.add('active');
        // Let layout settle
        setTimeout(() => updateGlider(initialActive), 40);
      }

      sc.addEventListener('click', (e) => {
        const btn = e.target.closest('.segment-btn');
        if (!btn) return;
        sc.querySelectorAll('.segment-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        updateGlider(btn);
      });

      // Recalculate on window resize
      window.addEventListener('resize', () => {
        const currentActive = sc.querySelector('.segment-btn.active');
        if (currentActive) updateGlider(currentActive);
      });
    });
  }

  /**
   * 2. Physical Tag Dismissal (Shrink & Evaporate)
   */
  static initTagDismissals() {
    document.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('.tag-remove');
      if (!removeBtn) return;
      const tag = removeBtn.closest('.tag');
      if (!tag) return;

      tag.classList.add('tag-dismissing');
      setTimeout(() => tag.remove(), 200);
    });
  }

  /**
   * 3. Drag & Drop Micro-Physics for Dropzones
   */
  static initDropzones() {
    document.querySelectorAll('.dropzone').forEach((dz) => {
      ['dragenter', 'dragover'].forEach((evt) => {
        dz.addEventListener(evt, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dz.classList.add('dragover');
        });
      });

      ['dragleave', 'drop'].forEach((evt) => {
        dz.addEventListener(evt, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dz.classList.remove('dragover');
        });
      });

      dz.addEventListener('drop', (e) => {
        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
          const fileName = files[0].name;
          window.AquaToast?.show(`Uploaded: ${fileName} (Ready for analysis)`, 'teal');
        }
      });
    });
  }

  /**
   * 4. Morphing Copy Button Interaction
   */
  static initCopyMorph() {
    document.querySelectorAll('.prop-copy').forEach((btn) => {
      btn.addEventListener('click', () => {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00a4b7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
        btn.style.transform = 'scale(1.15)';
        btn.style.borderColor = 'var(--teal-400)';

        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.transform = '';
          btn.style.borderColor = '';
        }, 1200);
      });
    });
  }
}

  /**
 * AquaOps Design System — Enterprise Rich Select & Combobox Controller
 * Implements accessible, searchable, single-select and multi-select dropdowns.
 * Conforms to ASD-STE100 guidelines and Apple/Airbnb design patterns.
 */

class AquaSelect {
  constructor(element) {
    this.el = element;
    this.trigger = this.el.querySelector('.rs-trigger');
    this.currentSpan = this.el.querySelector('.rs-current span');
    this.currentIcon = this.el.querySelector('.rs-current > i, .rs-current > svg');
    this.searchInput = this.el.querySelector('.rs-search-input');
    this.options = Array.from(this.el.querySelectorAll('.rs-option'));
    this.menu = this.el.querySelector('.rs-menu');
    this.emptyMsg = this.el.querySelector('.rs-empty-msg');
    this.hiddenInput = this.el.querySelector('input[type="hidden"]');
    
    // Check mode
    this.isMulti = this.el.classList.contains('multi-select');
    this.isCompact = this.el.classList.contains('compact');
    this.isDropUp = this.el.classList.contains('drop-up');
    
    this.focusedIndex = -1;
    this.selectedValues = new Set();

    this.init();
  }

  init() {
    if (!this.trigger) return;

    // Initialize initial values
    this.options.forEach((opt, idx) => {
      if (opt.classList.contains('selected')) {
        const val = opt.dataset.value || opt.textContent.trim();
        this.selectedValues.add(val);
      }
      opt.dataset.index = idx;
    });

    // Make trigger keyboard accessible
    if (!this.trigger.hasAttribute('tabindex')) {
      this.trigger.setAttribute('tabindex', '0');
    }
    this.trigger.setAttribute('role', 'combobox');
    this.trigger.setAttribute('aria-expanded', 'false');
    this.trigger.setAttribute('aria-haspopup', 'listbox');

    // Toggle dropdown on trigger click
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // Keyboard navigation on trigger
    this.trigger.addEventListener('keydown', (e) => {
      this.handleTriggerKey(e);
    });

    // Live search filter
    if (this.searchInput) {
      this.searchInput.addEventListener('click', (e) => e.stopPropagation());
      this.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.focusNextVisibleOption(1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.focusNextVisibleOption(-1);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          this.selectFocusedOption();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          this.close();
          this.trigger.focus();
        }
      });

      this.searchInput.addEventListener('input', (e) => {
        this.filterOptions(e.target.value);
      });
    }

    // Option interactions
    this.options.forEach((opt) => {
      opt.setAttribute('role', 'option');
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleOptionClick(opt);
      });

      opt.addEventListener('mouseenter', () => {
        this.setFocusedOption(opt);
      });
    });

    // Tag removal clicks (for multi-select)
    this.el.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('.rs-tag-remove');
      if (removeBtn) {
        e.stopPropagation();
        const val = removeBtn.dataset.value;
        if (val) {
          this.removeValue(val);
        }
      }
    });

    // Clear all button if present
    const clearBtn = this.el.querySelector('.rs-clear-all');
    if (clearBtn) {
      clearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.clearAll();
      });
    }

    // Outside click dismiss
    document.addEventListener('click', (e) => {
      if (!this.el.contains(e.target)) {
        this.close();
      }
    });
  }

  handleTriggerKey(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.toggle();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!this.isOpen()) {
        this.open();
      }
      this.focusNextVisibleOption(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!this.isOpen()) {
        this.open();
      }
      this.focusNextVisibleOption(-1);
    } else if (e.key === 'Escape') {
      if (this.isOpen()) {
        e.preventDefault();
        this.close();
      }
    }
  }

  isOpen() {
    return this.el.classList.contains('open');
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    // Close other open selects
    document.querySelectorAll('.rich-select.open').forEach((other) => {
      if (other !== this.el) {
        other.classList.remove('open');
        const trig = other.querySelector('.rs-trigger');
        if (trig) trig.setAttribute('aria-expanded', 'false');
      }
    });

    // Detect if we should flip upward automatically (smart placement)
    this.checkPlacement();

    this.el.classList.add('open');
    this.trigger.setAttribute('aria-expanded', 'true');

    // Reset filter
    if (this.searchInput) {
      this.searchInput.value = '';
      this.filterOptions('');
      setTimeout(() => this.searchInput.focus(), 60);
    }

    // Set focus to selected option
    const firstSelected = this.options.find((o) => o.classList.contains('selected'));
    if (firstSelected) {
      this.setFocusedOption(firstSelected);
      this.scrollOptionIntoView(firstSelected);
    } else {
      this.focusNextVisibleOption(1);
    }
  }

  close() {
    this.el.classList.remove('open');
    this.trigger.setAttribute('aria-expanded', 'false');
    this.clearFocusedState();
  }

  checkPlacement() {
    if (this.isDropUp) {
      this.el.classList.add('drop-up');
      return;
    }

    const rect = this.trigger.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    // If space below is under 260px and space above is larger, flip up
    if (spaceBelow < 260 && spaceAbove > spaceBelow) {
      this.el.classList.add('auto-drop-up');
    } else {
      this.el.classList.remove('auto-drop-up');
    }
  }

  filterOptions(query) {
    const term = query.toLowerCase().trim();
    let visibleCount = 0;

    this.options.forEach((opt) => {
      const text = opt.textContent.toLowerCase();
      const isVisible = text.includes(term);
      opt.style.display = isVisible ? 'flex' : 'none';
      if (isVisible) visibleCount++;
    });

    // Show/hide empty state
    if (this.emptyMsg) {
      this.emptyMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    this.clearFocusedState();
    if (visibleCount > 0) {
      this.focusNextVisibleOption(1);
    }
  }

  getVisibleOptions() {
    return this.options.filter((opt) => opt.style.display !== 'none');
  }

  focusNextVisibleOption(direction) {
    const visible = this.getVisibleOptions();
    if (visible.length === 0) return;

    let currentVisibleIndex = visible.findIndex((o) => o.classList.contains('focused'));
    if (currentVisibleIndex === -1) {
      currentVisibleIndex = direction > 0 ? -1 : 0;
    }

    let nextIndex = currentVisibleIndex + direction;
    if (nextIndex >= visible.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = visible.length - 1;

    const targetOpt = visible[nextIndex];
    if (targetOpt) {
      this.setFocusedOption(targetOpt);
      this.scrollOptionIntoView(targetOpt);
    }
  }

  setFocusedOption(opt) {
    this.clearFocusedState();
    opt.classList.add('focused');
  }

  clearFocusedState() {
    this.options.forEach((o) => o.classList.remove('focused'));
  }

  selectFocusedOption() {
    const focused = this.options.find((o) => o.classList.contains('focused'));
    if (focused) {
      this.handleOptionClick(focused);
    }
  }

  scrollOptionIntoView(opt) {
    const list = this.el.querySelector('.rs-list');
    if (!list || !opt) return;

    const listRect = list.getBoundingClientRect();
    const optRect = opt.getBoundingClientRect();

    if (optRect.bottom > listRect.bottom) {
      list.scrollTop += optRect.bottom - listRect.bottom;
    } else if (optRect.top < listRect.top) {
      list.scrollTop -= listRect.top - optRect.top;
    }
  }

  handleOptionClick(opt) {
    const val = opt.dataset.value || opt.textContent.trim();

    if (this.isMulti) {
      // Toggle value in set
      if (this.selectedValues.has(val)) {
        this.selectedValues.delete(val);
        opt.classList.remove('selected');
      } else {
        this.selectedValues.add(val);
        opt.classList.add('selected');
      }
      this.updateMultiDisplay();
      this.dispatchChangeEvent();
    } else {
      // Single select
      this.options.forEach((o) => o.classList.remove('selected'));
      opt.classList.add('selected');
      this.selectedValues.clear();
      this.selectedValues.add(val);

      this.updateSingleDisplay(opt);
      this.close();
      this.trigger.focus();
      this.dispatchChangeEvent();
    }
  }

  updateSingleDisplay(opt) {
    const titleEl = opt.querySelector('.rs-opt-title');
    const label = titleEl ? titleEl.textContent.trim() : (opt.dataset.value || opt.textContent.trim());

    if (this.currentSpan) {
      this.currentSpan.textContent = label;
    }

    // Sync icon if present
    const optIcon = opt.querySelector('i[data-lucide], svg');
    if (optIcon && this.currentIcon) {
      const iconName = optIcon.getAttribute('data-lucide');
      if (iconName) {
        this.currentIcon.setAttribute('data-lucide', iconName);
        if (window.lucide) window.lucide.createIcons();
      }
    }

    if (this.hiddenInput) {
      this.hiddenInput.value = opt.dataset.value || label;
    }
  }

  updateMultiDisplay() {
    const tagsWrap = this.el.querySelector('.rs-tags-container');
    const countSpan = this.el.querySelector('.rs-count-badge');

    if (tagsWrap) {
      tagsWrap.innerHTML = '';
      if (this.selectedValues.size === 0) {
        const placeholder = this.el.dataset.placeholder || 'Select options...';
        tagsWrap.innerHTML = `<span class="rs-placeholder">${placeholder}</span>`;
      } else {
        this.selectedValues.forEach((val) => {
          const tag = document.createElement('span');
          tag.className = 'rs-pill-tag';
          tag.innerHTML = `<span>${val}</span><button type="button" class="rs-tag-remove" data-value="${val}" aria-label="Remove ${val}">×</button>`;
          tagsWrap.appendChild(tag);
        });
      }
    }

    if (countSpan) {
      countSpan.textContent = `${this.selectedValues.size} selected`;
      countSpan.style.display = this.selectedValues.size > 0 ? 'inline-flex' : 'none';
    }

    if (this.hiddenInput) {
      this.hiddenInput.value = Array.from(this.selectedValues).join(',');
    }
  }

  removeValue(val) {
    this.selectedValues.delete(val);
    this.options.forEach((opt) => {
      if ((opt.dataset.value || opt.textContent.trim()) === val) {
        opt.classList.remove('selected');
      }
    });
    this.updateMultiDisplay();
    this.dispatchChangeEvent();
  }

  clearAll() {
    this.selectedValues.clear();
    this.options.forEach((opt) => opt.classList.remove('selected'));
    if (this.isMulti) {
      this.updateMultiDisplay();
    } else {
      if (this.currentSpan) {
        this.currentSpan.textContent = this.el.dataset.placeholder || 'Select option...';
      }
    }
    this.dispatchChangeEvent();
  }

  dispatchChangeEvent() {
    const valuesArray = Array.from(this.selectedValues);
    const detail = {
      value: valuesArray.length > 0 ? valuesArray[0] : '',
      values: valuesArray,
    };

    this.el.dispatchEvent(new CustomEvent('aqua-change', { detail, bubbles: true }));

    // Also trigger native change event on hidden input if present
    if (this.hiddenInput) {
      this.hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
}

  /**
 * AquaOps Design System — Enterprise Calendar Date Picker Controller
 * Matches Apple / Linear high-density calendar specs (Image 3)
 */

const AquaCalendar = {
  activeInput: null,
  popover: null,
  currentDate: new Date(),
  selectedDate: null,

  init() {
    this.createPopover();
    this.bindGlobalListeners();
  },

  createPopover() {
    let existing = document.getElementById('aquaops-calendar-popover');
    if (existing) {
      this.popover = existing;
      return;
    }

    const popover = document.createElement('div');
    popover.id = 'aquaops-calendar-popover';
    popover.className = 'calendar-popover';
    document.body.appendChild(popover);
    this.popover = popover;
  },

  bindGlobalListeners() {
    // Intercept clicks on any date input or date wrapper
    document.addEventListener('click', (e) => {
      const dateWrap = e.target.closest('.date-input-wrap');
      const dateInput = e.target.closest('input[type="date"], .date-input, [data-calendar]');

      if (dateWrap) {
        const inp = dateWrap.querySelector('input');
        if (inp) {
          e.preventDefault();
          e.stopPropagation();
          this.open(inp);
          return;
        }
      }

      if (dateInput) {
        e.preventDefault();
        e.stopPropagation();
        this.open(dateInput);
        return;
      }

      // Close when clicking outside
      if (this.popover && !this.popover.contains(e.target)) {
        this.close();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });

    // Reposition on window resize / scroll
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

    // Parse current value
    const val = (inputElement.value || '').trim();
    if (val) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
        this.selectedDate = new Date(val + 'T00:00:00');
        this.currentDate = new Date(val + 'T00:00:00');
      } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(val)) {
        const [d, m, y] = val.split('/');
        this.selectedDate = new Date(`${y}-${m}-${d}T00:00:00`);
        this.currentDate = new Date(`${y}-${m}-${d}T00:00:00`);
      } else if (!isNaN(Date.parse(val))) {
        this.selectedDate = new Date(val);
        this.currentDate = new Date(val);
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
    const popoverHeight = 330;

    let left = rect.left + window.scrollX;
    let top = rect.bottom + window.scrollY + 6;

    // Boundary protection: right edge
    if (left + popoverWidth > window.innerWidth - 16) {
      left = window.innerWidth - popoverWidth - 16;
    }
    if (left < 16) left = 16;

    // Flip upward if near bottom of viewport
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

    // Leading days from previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      daysHtml += `<button type="button" class="calendar-day-btn other-month" tabindex="-1">${d}</button>`;
    }

    // Days in current month
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
        <!-- Calendar Header: Month/Year navigation -->
        <div class="calendar-header">
          <button type="button" id="cal-prev-btn" class="calendar-nav-btn" title="Previous Month">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <div class="calendar-title">
            <span class="cal-month">${monthNames[month]}</span>
            <span class="cal-year">${year}</span>
          </div>

          <button type="button" id="cal-next-btn" class="calendar-nav-btn" title="Next Month">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        <!-- Quick Presets -->
        <div class="calendar-presets">
          <button type="button" data-preset="today" class="calendar-preset-btn active">Today</button>
          <button type="button" data-preset="yesterday" class="calendar-preset-btn">Yesterday</button>
          <button type="button" data-preset="first-day" class="calendar-preset-btn">1st of Month</button>
          <button type="button" data-preset="clear" class="calendar-preset-btn clear-btn">Clear</button>
        </div>

        <!-- Weekday Labels -->
        <div class="calendar-weekdays">
          <span>SU</span><span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span>
        </div>

        <!-- Days Grid -->
        <div class="calendar-days-grid">
          ${daysHtml}
        </div>
      </div>
    `;

    // Bind navigation buttons
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

    // Bind Presets
    this.popover.querySelectorAll('[data-preset]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const p = btn.getAttribute('data-preset');
        const now = new Date();
        if (p === 'today') {
          this.selectDate(now.getFullYear(), now.getMonth(), now.getDate());
        } else if (p === 'yesterday') {
          const y = new Date();
          y.setDate(y.getDate() - 1);
          this.selectDate(y.getFullYear(), y.getMonth(), y.getDate());
        } else if (p === 'first-day') {
          this.selectDate(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        } else if (p === 'clear') {
          if (this.activeInput) {
            this.activeInput.value = '';
            this.activeInput.dispatchEvent(new Event('change', { bubbles: true }));
            this.activeInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
          this.close();
        }
      });
    });

    // Bind Day clicks
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
    // Default format DD/MM/YYYY or YYYY-MM-DD depending on placeholder or type
    const isIso = this.activeInput.placeholder === 'yyyy-mm-dd' || this.activeInput.type === 'date';
    const dateStr = isIso ? `${year}-${pad(month + 1)}-${pad(day)}` : `${pad(day)}/${pad(month + 1)}/${year}`;

    this.activeInput.value = dateStr;
    this.activeInput.dispatchEvent(new Event('change', { bubbles: true }));
    this.activeInput.dispatchEvent(new Event('input', { bubbles: true }));

    if (window.AquaToast) {
      window.AquaToast.show(`Date selected: ${dateStr}`, 'teal');
    }

    this.close();
  }
};

  /**
 * AquaOps Design System — Floating Sidebar Component
 * Features: Expand/Collapse toggle (270px -> 76px), accordion submenus, clean text highlighting
 */

class AquaSidebar {
  constructor(element) {
    this.el = element;
    this.toggleBtn = document.getElementById('demoSidebarToggle');
    this.groupButtons = this.el.querySelectorAll('.f-sb-grp-btn');
    this.subLinks = this.el.querySelectorAll('.f-sb-sub-link');

    this.init();
  }

  init() {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggleCollapse());
    }

    // Submenu Accordion toggles
    this.groupButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (this.el.classList.contains('collapsed')) {
          this.el.classList.remove('collapsed');
        }
        const grp = btn.closest('.f-sb-grp');
        grp.classList.toggle('open');
      });
    });

    // Submenu links active text highlight
    this.subLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.subLinks.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');

        this.el.dispatchEvent(
          new CustomEvent('aqua-navigate', {
            detail: { label: link.textContent.trim() },
            bubbles: true,
          })
        );
      });
    });
  }

  toggleCollapse() {
    const isCollapsed = this.el.classList.toggle('collapsed');
    this.el.dispatchEvent(
      new CustomEvent('aqua-sidebar-toggle', {
        detail: { collapsed: isCollapsed },
        bubbles: true,
      })
    );
  }
}

  /**
 * AquaOps Design System — Data Table & Pagination Module
 * Selectable rows, floating bulk actions bar, column sorting, master-detail rows, density controls
 */

class AquaTable {
  constructor(tableElement, bulkElement) {
    this.table = tableElement;
    this.bulk = bulkElement;
    this.checkAll = this.table ? this.table.querySelector('.ck-all') || document.getElementById('ckAll') : null;
    this.rowChecks = Array.from(this.table ? this.table.querySelectorAll('.ck') : []);
    this.bulkCount = document.getElementById('bulkN') || (this.bulk ? this.bulk.querySelector('.bulk-count') : null);

    this.init();
    this.initSorting();
    this.initDetailRows();
  }

  init() {
    if (!this.table) return;

    this.rowChecks.forEach((chk) => {
      chk.addEventListener('change', () => this.sync());
    });

    if (this.checkAll) {
      this.checkAll.addEventListener('change', (e) => {
        this.rowChecks.forEach((chk) => {
          chk.checked = e.target.checked;
        });
        this.sync();
      });
    }
  }

  sync() {
    let count = 0;
    this.rowChecks.forEach((chk) => {
      chk.closest('tr').classList.toggle('sel', chk.checked);
      if (chk.checked) count++;
    });

    if (this.bulk) {
      this.bulk.classList.toggle('show', count > 0);
    }
    if (this.bulkCount) {
      this.bulkCount.textContent = `${count} selected`;
    }
  }

  initSorting() {
    if (!this.table) return;
    const headers = this.table.querySelectorAll('th.sortable');
    headers.forEach((th, colIdx) => {
      th.addEventListener('click', () => {
        const isAsc = th.dataset.order === 'asc';
        headers.forEach((h) => {
          h.classList.remove('sorted');
          delete h.dataset.order;
        });

        th.classList.add('sorted');
        th.dataset.order = isAsc ? 'desc' : 'asc';

        const tbody = this.table.querySelector('tbody');
        if (!tbody) return;

        // Sort primary data rows (ignore detail subrows)
        const rows = Array.from(tbody.querySelectorAll('tr:not(.detail-row)'));
        rows.sort((a, b) => {
          const aVal = a.children[colIdx]?.textContent?.trim() || '';
          const bVal = b.children[colIdx]?.textContent?.trim() || '';
          const aNum = parseFloat(aVal.replace(/[^0-9.-]+/g, ''));
          const bNum = parseFloat(bVal.replace(/[^0-9.-]+/g, ''));

          if (!isNaN(aNum) && !isNaN(bNum)) {
            return isAsc ? bNum - aNum : aNum - bNum;
          }
          return isAsc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
        });

        rows.forEach((r) => {
          tbody.appendChild(r);
          const detailRowId = r.dataset.detailId;
          if (detailRowId) {
            const detailRow = document.getElementById(detailRowId);
            if (detailRow) tbody.appendChild(detailRow);
          }
        });

        window.AquaToast?.show(`Sorted by ${th.textContent.trim()} (${isAsc ? 'Descending' : 'Ascending'})`, 'teal');
      });
    });
  }

  initDetailRows() {
    if (!this.table) return;
    this.table.querySelectorAll('.detail-toggle').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const tr = btn.closest('tr');
        const detailId = tr.dataset.detailId;
        const detailRow = detailId ? document.getElementById(detailId) : tr.nextElementSibling;
        if (detailRow && detailRow.classList.contains('detail-row')) {
          tr.classList.toggle('expanded');
          detailRow.classList.toggle('open');
        }
      });
    });
  }
}

class AquaPager {
  constructor(pagerElement) {
    this.el = pagerElement;
    this.init();
  }

  init() {
    if (!this.el) return;

    this.el.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;

      const pages = Array.from(this.el.querySelectorAll('button:not(.p-prev):not(.p-next)'));
      let curIdx = pages.findIndex((p) => p.classList.contains('active'));

      if (btn.classList.contains('p-prev')) {
        if (curIdx > 0) {
          pages[curIdx].classList.remove('active');
          pages[curIdx - 1].classList.add('active');
        }
      } else if (btn.classList.contains('p-next')) {
        if (curIdx < pages.length - 1) {
          pages[curIdx].classList.remove('active');
          pages[curIdx + 1].classList.add('active');
        }
      } else {
        pages.forEach((p) => p.classList.remove('active'));
        btn.classList.add('active');
      }
    });
  }
}

  /**
 * AquaOps Design System — Data Visualizations & Telemetry Engine
 * Complete interactive charts with cursor tooltips, touch scrubbing, spring bloom, and telemetry inspection
 */

class AquaCharts {
  /**
   * Vertical Bars with dynamic spring hover tooltip and touch inspection
   */
  static renderBars(containerId, data, threshold = 85) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '';

    const hudSub = document.getElementById('barsHudSub');

    data.forEach((d, i) => {
      const c = document.createElement('div');
      c.className = 'c';
      c.dataset.day = d.l;
      c.dataset.val = d.v;

      const b = document.createElement('div');
      b.className = 'b' + (d.v >= threshold ? ' hi' : '');
      b.style.height = '0%';
      b.style.position = 'relative';
      
      // Floating Tooltip Bubble attached directly to bar top
      const bubble = document.createElement('div');
      bubble.className = 'chart-tooltip-bubble';
      bubble.textContent = `${d.l}: ${d.v} kg`;

      const x = document.createElement('div');
      x.className = 'x';
      x.textContent = d.l;

      b.appendChild(bubble);
      c.append(b, x);
      
      const activate = () => {
        el.querySelectorAll('.c').forEach(item => item.classList.remove('touch-active'));
        c.classList.add('touch-active');
        if (hudSub) {
          hudSub.innerHTML = `Daily Feed: <b>${d.l} · ${d.v} kg</b> ${d.v >= threshold ? '<span style="color:var(--teal-700)">(Optimal Target Met)</span>' : '<span style="color:var(--muted)">(Under Benchmark)</span>'}`;
        }
      };

      const deactivate = () => {
        c.classList.remove('touch-active');
        if (hudSub) {
          hudSub.textContent = 'Daily feed consumption (kg) · Hover bars for telemetry';
        }
      };

      c.addEventListener('mouseenter', activate);
      c.addEventListener('mouseleave', deactivate);

      // Mobile Touch Handling
      c.addEventListener('touchstart', (e) => {
        activate();
      }, { passive: true });

      c.addEventListener('click', () => {
        window.AquaToast?.show(`${d.l} Biomass Harvest: ${d.v} kg logged`, 'teal');
      });

      el.appendChild(c);
      setTimeout(() => (b.style.height = `${d.v}%`), 60 * i);
    });
  }

  /**
   * SVG Line & Area Chart with touch scrubbing, crosshairs, full-column hitzones, and telemetry tooltips
   */
  static renderLine(pathId, areaId, dotsId, values, W = 400, H = 190, P = 20) {
    const cPath = document.getElementById(pathId);
    const cArea = document.getElementById(areaId);
    const cDots = document.getElementById(dotsId);
    if (!cPath || !cArea || !cDots) return;

    const svg = cPath.closest('svg');
    const hudSub = document.getElementById('lineHudSub');
    const scrubber = document.getElementById('cLineScrubber');
    const hitZones = document.getElementById('cHitZones');

    const mx = Math.max(...values);
    const mn = Math.min(...values);
    const pts = values.map((v, i) => ({
      x: P + (i / (values.length - 1)) * (W - P * 2),
      y: H - P - ((v - mn) / (mx - mn)) * (H - P * 2),
      val: (v / 10).toFixed(1),
      rawVal: v,
      time: `${String(i * 3).padStart(2, '0')}:00`
    }));

    cPath.setAttribute('points', pts.map((p) => `${p.x},${p.y}`).join(' '));
    cArea.setAttribute('points', `${P},${H} ${pts.map((p) => `${p.x},${p.y}`).join(' ')} ${W - P},${H}`);

    // Tooltip overlay container (contained within canvas wrapper)
    const canvasWrap = svg.parentElement;
    let tipBubble = canvasWrap.querySelector('.chart-point-tooltip');
    if (!tipBubble) {
      tipBubble = document.createElement('div');
      tipBubble.className = 'chart-point-tooltip';
      canvasWrap.appendChild(tipBubble);
    }

    cDots.innerHTML = '';
    if (hitZones) hitZones.innerHTML = '';

    const colWidth = (W - P * 2) / (pts.length - 1);

    pts.forEach((p, idx) => {
      // Data Point Circle
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('class', 'p');
      c.setAttribute('cx', p.x);
      c.setAttribute('cy', p.y);
      c.setAttribute('r', 4);
      c.setAttribute('data-idx', idx);
      cDots.appendChild(c);

      // Full-Height Column Hit Zone
      if (hitZones) {
        const hit = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        hit.setAttribute('x', Math.max(0, p.x - colWidth / 2));
        hit.setAttribute('y', 0);
        hit.setAttribute('width', colWidth);
        hit.setAttribute('height', H);
        hit.setAttribute('fill', 'transparent');
        hit.setAttribute('style', 'cursor: pointer;');
        hit.setAttribute('data-idx', idx);

        hit.addEventListener('mouseenter', () => activateIndex(idx));
        hit.addEventListener('mouseleave', deactivate);
        c.addEventListener('mouseenter', () => activateIndex(idx));
        c.addEventListener('mouseleave', deactivate);

        hit.addEventListener('click', () => {
          window.AquaToast?.show(`Telemetry ${p.time}: ${p.val} mg/L Dissolved Oxygen`, 'teal');
        });
        c.addEventListener('click', () => {
          window.AquaToast?.show(`Telemetry ${p.time}: ${p.val} mg/L Dissolved Oxygen`, 'teal');
        });

        hitZones.appendChild(hit);
      }
    });

    const activateIndex = (idx) => {
      const p = pts[idx];
      if (!p) return;

      tipBubble.innerHTML = `<b>${p.time}</b> · <span style="color:var(--teal-300)">${p.val} mg/L DO</span>`;
      tipBubble.style.opacity = '1';
      tipBubble.style.left = `${(p.x / W) * 100}%`;
      tipBubble.style.top = `${(p.y / H) * 100}%`;

      cDots.querySelectorAll('.p').forEach((dot, i) => {
        if (i == idx) {
          dot.setAttribute('r', 6.5);
          dot.setAttribute('stroke-width', 3.5);
        } else {
          dot.setAttribute('r', 4);
          dot.setAttribute('stroke-width', 2.5);
        }
      });

      if (scrubber) {
        scrubber.setAttribute('x1', p.x);
        scrubber.setAttribute('x2', p.x);
        scrubber.style.opacity = '1';
      }

      if (hudSub) {
        hudSub.innerHTML = `24h Dissolved Oxygen · Shift <b>${p.time}</b>: <span style="color:var(--teal-700);font-weight:700">${p.val} mg/L</span> (${p.val >= 6.5 ? 'Optimal Saturation' : 'Safe Benchmark'})`;
      }
    };

    const deactivate = () => {
      tipBubble.style.opacity = '0';
      cDots.querySelectorAll('.p').forEach((dot) => {
        dot.setAttribute('r', 4);
        dot.setAttribute('stroke-width', 2.5);
      });
      if (scrubber) scrubber.style.opacity = '0';
      if (hudSub) hudSub.textContent = '24h Dissolved Oxygen curve · Hover data points';
    };

    // Mobile Touch Scrubbing Event
    const handleTouch = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = svg.getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      const relX = (touchX / rect.width) * W;

      let closestIdx = 0;
      let minDist = Infinity;
      pts.forEach((p, idx) => {
        const dist = Math.abs(p.x - relX);
        if (dist < minDist) {
          minDist = dist;
          closestIdx = idx;
        }
      });
      activateIndex(closestIdx);
    };

    svg.addEventListener('touchstart', handleTouch, { passive: true });
    svg.addEventListener('touchmove', handleTouch, { passive: true });
    svg.addEventListener('touchend', () => {
      setTimeout(deactivate, 800);
    }, { passive: true });
  }

  /**
   * Horizontal Breakdown with world-class row cards, stats, and gradient tracks
   */
  static renderHorizontal(containerId, data) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '';

    const list = document.createElement('div');
    list.className = 'hbar-list';

    data.forEach((d, i) => {
      const kgVal = d.kg || Math.round(d.v * 365);
      const row = document.createElement('div');
      row.className = 'hbar-row';
      row.title = `${d.l}: ${d.v}% capacity (${kgVal.toLocaleString()} kg)`;
      row.innerHTML = `
        <div class="hbar-top">
          <span class="hbar-name">${d.l}</span>
          <div class="hbar-stats">
            <span>${kgVal.toLocaleString()} kg</span>
            <b>${d.v}%</b>
          </div>
        </div>
        <div class="hbar-track">
          <div class="hbar-fill" style="width:0%"></div>
        </div>
      `;

      row.addEventListener('click', () => {
        window.AquaToast?.show(`${d.l} Biomass: ${kgVal.toLocaleString()} kg (${d.v}% target)`, 'teal');
      });

      list.appendChild(row);
      setTimeout(() => {
        const fill = row.querySelector('.hbar-fill');
        if (fill) fill.style.width = `${d.v}%`;
      }, 60 * i);
    });

    el.appendChild(list);
  }

  /**
   * Interactive Coldstore Donut Chart with HUD Center and Legend Synchrony
   */
  static renderDonut(svgId, centerValueId = 'cDonutVal', centerLabelId = 'cDonutSub') {
    const svgEl = document.getElementById(svgId);
    if (!svgEl) return;

    const bgCircle = svgEl.querySelector('circle:not([data-v])');
    const R = bgCircle ? parseFloat(bgCircle.getAttribute('r')) : 46;
    const C = 2 * Math.PI * R;
    let o = 0;

    // Center display resolution (supports both HTML hud and SVG text)
    const centerVal = document.getElementById(centerValueId) || svgEl.querySelector('text:first-of-type');
    const centerSub = document.getElementById(centerLabelId) || svgEl.querySelector('text:last-of-type');
    const defaultVal = centerVal ? centerVal.textContent : '3,420';
    const defaultSub = centerSub ? centerSub.textContent : 'TOTAL PALLETS';

    const segments = svgEl.querySelectorAll('circle[data-v]');
    const container = svgEl.closest('.viz-card, .donut-card-inner, .donutrow, .panel') || document;
    const legendItems = container.querySelectorAll('.donut-legend-item, .lg');

    segments.forEach((c, idx) => {
      const v = +c.dataset.v;
      const label = c.dataset.label || 'Occupied';
      const l = (v / 100) * C;
      c.setAttribute('r', R);
      c.setAttribute('stroke-dasharray', `${l} ${C - l}`);
      c.setAttribute('stroke-dashoffset', -o);
      o += l;

      const highlight = () => {
        if (centerVal) centerVal.textContent = `${v}%`;
        if (centerSub) centerSub.textContent = label.toUpperCase();
        legendItems.forEach((item, i) => {
          item.classList.toggle('active', i === idx);
        });
      };

      const reset = () => {
        if (centerVal) centerVal.textContent = defaultVal;
        if (centerSub) centerSub.textContent = defaultSub;
        legendItems.forEach((item) => {
          item.classList.remove('active');
        });
      };

      c.addEventListener('mouseenter', highlight);
      c.addEventListener('mouseleave', reset);
      c.addEventListener('touchstart', highlight, { passive: true });

      c.addEventListener('click', () => {
        window.AquaToast?.show(`${label}: ${v}% Coldstore allocation (${Math.round(3420 * (v / 100))} pallets)`, 'teal');
      });
    });

    legendItems.forEach((lg, i) => {
      lg.addEventListener('mouseenter', () => {
        if (segments[i]) {
          segments[i].dispatchEvent(new Event('mouseenter'));
          segments[i].style.strokeWidth = '18';
        }
      });
      lg.addEventListener('mouseleave', () => {
        if (segments[i]) {
          segments[i].dispatchEvent(new Event('mouseleave'));
          segments[i].style.strokeWidth = '';
        }
      });
      lg.addEventListener('click', () => {
        if (segments[i]) segments[i].dispatchEvent(new Event('click'));
      });
    });
  }

  /**
   * Multi-Parameter Radial Water Quality Gauge (Seamless Geometry & Thresholds)
   */
  static renderGauge(containerId, score = 94.2) {
    const el = document.getElementById(containerId);
    if (!el) return;
    
    // Half-circle arc geometry: center (110, 108), radius 76
    // Arc path from (34, 108) to (186, 108)
    const R = 76;
    const arcLength = Math.PI * R; // ~238.76
    const fillLength = (score / 100) * arcLength;

    // Knob tip coordinates: angle for score
    const theta = Math.PI * (1 - score / 100);
    const knobX = (110 + R * Math.cos(theta)).toFixed(1);
    const knobY = (108 - R * Math.sin(theta)).toFixed(1);

    el.innerHTML = `
      <div class="gauge-card-inner">
        <!-- Dedicated Dial Container (Insulates Center Score from Footer Elements) -->
        <div class="gauge-dial-wrap">
          <svg class="gauge-svg-frame" viewBox="0 0 220 132">
            <defs>
              <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#4fcfe0" />
                <stop offset="50%" stop-color="#00a4b7" />
                <stop offset="100%" stop-color="#006c7a" />
              </linearGradient>
            </defs>
            
            <!-- Soft Tinted Background Track -->
            <path d="M 34 108 A 76 76 0 0 1 186 108" fill="none" stroke="rgba(0, 164, 183, 0.12)" stroke-width="10" stroke-linecap="round" />
            
            <!-- Animated Gradient Fill Track -->
            <path id="gaugePath" d="M 34 108 A 76 76 0 0 1 186 108" fill="none" stroke="url(#gaugeGrad)" stroke-width="12" stroke-linecap="round"
                  stroke-dasharray="${arcLength}" stroke-dashoffset="${arcLength}" />
            
            <!-- Precision Dial Indicator Knob -->
            <circle id="gaugeKnob" cx="${knobX}" cy="${knobY}" r="5.5" fill="#ffffff" stroke="#006c7a" stroke-width="2.5" style="opacity:0;transition:opacity 0.4s" />
            
            <!-- Benchmark Ticks with Generous Margin -->
            <text x="34" y="124" text-anchor="middle" font-size="9" font-weight="700" fill="#8e8e93" font-family="'Noto Sans', sans-serif">0</text>
            <text x="110" y="18" text-anchor="middle" font-size="9" font-weight="700" fill="#006c7a" font-family="'Noto Sans', sans-serif">OPTIMAL ZONE (&gt;85)</text>
            <text x="186" y="124" text-anchor="middle" font-size="9" font-weight="700" fill="#8e8e93" font-family="'Noto Sans', sans-serif">100</text>
          </svg>

          <div class="gauge-center-badge">
            <span class="gauge-score">${score}</span>
            <span class="gauge-title-label">WATER HEALTH INDEX</span>
          </div>
        </div>

        <!-- Flow Badge Row (Clean Vertical Flow, Zero Overlap) -->
        <div class="gauge-badge-row">
          <span class="badge badge-teal" style="font-size:11px;padding:3px 10px">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:5px"><path d="M20 6 9 17l-5-5"/></svg>Optimal Grade · Top 5% Biosecurity
          </span>
        </div>

        <!-- Flow Footer Meta Row (Clean Top Border, No Masking) -->
        <div class="gauge-footer-meta">
          <span>DO: <b>6.84 mg/L</b></span>
          <span>ORP: <b>+225 mV</b></span>
          <span>pH: <b>7.82 Opt</b></span>
        </div>
      </div>
    `;

    const gaugePath = el.querySelector('#gaugePath');
    const gaugeKnob = el.querySelector('#gaugeKnob');
    const wrapper = el.querySelector('.gauge-card-inner');

    wrapper.addEventListener('click', () => {
      window.AquaToast?.show(`Water Quality Score: ${score}/100 · All 8 sensors within safe biological parameters`, 'teal');
    });

    setTimeout(() => {
      if (gaugePath) {
        gaugePath.style.transition = 'stroke-dashoffset 1.3s cubic-bezier(0.16, 1, 0.3, 1)';
        gaugePath.style.strokeDashoffset = `${arcLength - fillLength}`;
      }
      if (gaugeKnob) {
        gaugeKnob.style.opacity = '1';
      }
    }, 120);
  }

  /**
   * 24-Hour Thermal & DO Heatmap Matrix with Responsive Inertia Scroll
   */
  static renderHeatmap(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const ponds = ['Pond 101', 'Pond 102', 'Pond 103', 'Pond 104', 'Pond 105', 'Pond 106'];
    const times = ['04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];
    
    // Sample readings: [temp °C, DO mg/L]
    const matrix = [
      [[27.8, 6.8], [28.2, 6.6], [29.5, 6.2], [30.1, 5.9], [28.9, 6.4], [28.1, 6.7]],
      [[27.5, 7.1], [28.0, 6.8], [29.2, 6.5], [29.8, 6.3], [28.7, 6.7], [27.9, 7.0]],
      [[28.1, 4.2], [28.5, 4.4], [30.4, 3.8], [31.2, 3.5], [29.8, 4.1], [28.6, 4.3]], // Pond 103 warning
      [[27.9, 6.7], [28.3, 6.5], [29.4, 6.1], [30.0, 5.8], [28.8, 6.3], [28.0, 6.6]],
      [[27.6, 6.9], [28.1, 6.7], [29.1, 6.4], [29.7, 6.2], [28.6, 6.5], [27.8, 6.8]],
      [[27.4, 7.0], [27.9, 6.9], [28.9, 6.6], [29.5, 6.4], [28.4, 6.7], [27.7, 6.9]],
    ];

    let html = `
      <div class="heatmap-table-wrap">
        <div class="heatmap-table">
          <div class="heatmap-row header-row">
            <div class="heatmap-label">POND</div>
            ${times.map(t => `<div class="heatmap-header">${t}</div>`).join('')}
          </div>
    `;

    ponds.forEach((pName, rIdx) => {
      html += `<div class="heatmap-row"><div class="heatmap-label">${pName}</div>`;
      times.forEach((tName, cIdx) => {
        const [temp, doVal] = matrix[rIdx][cIdx];
        let colorClass = 'cell-opt';
        let status = 'Optimal';
        if (doVal < 4.0) {
          colorClass = 'cell-crit';
          status = 'Critical Low DO';
        } else if (temp > 30.0) {
          colorClass = 'cell-warn';
          status = 'Thermal Stress';
        }
        
        html += `
          <div class="heatmap-cell ${colorClass}" data-pond="${pName}" data-time="${tName}" data-temp="${temp}" data-do="${doVal}" data-status="${status}">
            <span>${temp}°</span>
            <div class="chart-tooltip-bubble cell-tip">${pName} · ${tName}<br/>Temp: ${temp}°C · DO: ${doVal} mg/L (${status})</div>
          </div>
        `;
      });
      html += `</div>`;
    });

    html += `</div></div>`;
    el.innerHTML = html;

    // Attach click & touch events
    el.querySelectorAll('.heatmap-cell').forEach(cell => {
      const showCellToast = () => {
        const { pond, time, temp, do: doVal, status } = cell.dataset;
        window.AquaToast?.show(`${pond} at ${time}: ${temp}°C, DO ${doVal} mg/L — ${status}`, status === 'Optimal' ? 'teal' : 'dark');
      };
      cell.addEventListener('click', showCellToast);
      cell.addEventListener('touchstart', showCellToast, { passive: true });
    });
  }

  /**
   * Dual-Series Real-Time Aerator Telemetry with Touch Scrubbing & Live Card HUD
   */
  static renderDualLine(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const data = [
      { time: '00:00', rpm: 1200, kw: 6.2 },
      { time: '04:00', rpm: 1450, kw: 8.1 },
      { time: '08:00', rpm: 1300, kw: 7.0 },
      { time: '12:00', rpm: 1100, kw: 5.5 },
      { time: '16:00', rpm: 1550, kw: 8.9 },
      { time: '20:00', rpm: 1480, kw: 8.4 },
      { time: '24:00', rpm: 1350, kw: 7.4 },
    ];

    const W = 420;
    const H = 160;
    const P = 24;

    const maxRpm = 1800;
    const minRpm = 1000;
    const maxKw = 10.0;
    const minKw = 4.0;

    const colWidth = (W - P * 2) / (data.length - 1);

    const rpmPts = data.map((d, i) => ({
      x: P + (i / (data.length - 1)) * (W - P * 2),
      y: H - P - ((d.rpm - minRpm) / (maxRpm - minRpm)) * (H - P * 2),
      ...d
    }));

    const kwPts = data.map((d, i) => ({
      x: P + (i / (data.length - 1)) * (W - P * 2),
      y: H - P - ((d.kw - minKw) / (maxKw - minKw)) * (H - P * 2),
      ...d
    }));

    el.innerHTML = `
      <div class="dual-card-hud" id="dualHud">
        <span class="hud-time">Hover or drag to scrub</span>
        <span class="hud-rpm">Aerator: 1,550 RPM</span>
        <span class="hud-kw">Power: 8.9 kW</span>
      </div>

      <div class="dual-svg-wrapper">
        <div class="dual-chart-canvas" style="position:relative;width:100%;height:${H}px">
          <svg class="dual-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
            <!-- Subtle Horizontal Grid Lines & Y Markers -->
            <line class="g" x1="${P}" y1="${P}" x2="${W - P}" y2="${P}" stroke="#f0f0f4" stroke-dasharray="3 4"/>
            <text x="${P + 2}" y="${P - 6}" font-size="8.5" font-weight="600" fill="#a1a1a6" font-family="'Noto Sans'">1,800 RPM · 10.0 kW</text>

            <line class="g" x1="${P}" y1="${H / 2}" x2="${W - P}" y2="${H / 2}" stroke="#f0f0f4" stroke-dasharray="3 4"/>
            <text x="${P + 2}" y="${H / 2 - 6}" font-size="8.5" font-weight="600" fill="#a1a1a6" font-family="'Noto Sans'">1,400 RPM · 7.0 kW</text>

            <line class="g" x1="${P}" y1="${H - P}" x2="${W - P}" y2="${H - P}" stroke="#f0f0f4" stroke-dasharray="3 4"/>
            <text x="${P + 2}" y="${H - P - 6}" font-size="8.5" font-weight="600" fill="#a1a1a6" font-family="'Noto Sans'">1,000 RPM · 4.0 kW</text>

            <!-- RPM Curve (Teal 600) -->
            <polyline class="l" points="${rpmPts.map(p => `${p.x},${p.y}`).join(' ')}" style="fill:none;stroke:var(--teal-600);stroke-width:2.5;stroke-linecap:round" />
            
            <!-- KW Curve (Dark Ink Dashed) -->
            <polyline class="l" points="${kwPts.map(p => `${p.x},${p.y}`).join(' ')}" style="fill:none;stroke:var(--black);stroke-width:2;stroke-dasharray:4 4;stroke-linecap:round" />

            <!-- Interactive Data Points -->
            ${rpmPts.map((p, i) => `
              <circle class="p rpm-pt" cx="${p.x}" cy="${p.y}" r="3.5" data-idx="${i}" />
              <circle class="p kw-pt" cx="${kwPts[i].x}" cy="${kwPts[i].y}" r="3.5" data-idx="${i}" />
            `).join('')}

            <!-- Crosshair Vertical Scrubber Line -->
            <line id="dualScrubberLine" x1="0" y1="${P}" x2="0" y2="${H - P}" stroke="var(--teal-600)" stroke-width="1.5" stroke-dasharray="3 3" style="opacity:0;transition:opacity 0.15s" />

            <!-- Full-Height Column Hit Zones -->
            ${rpmPts.map((p, i) => `
              <rect class="dual-hitzone" x="${Math.max(0, p.x - colWidth / 2)}" y="0" width="${colWidth}" height="${H}" fill="transparent" style="cursor:pointer" data-idx="${i}" />
            `).join('')}
          </svg>

          <!-- Floating Non-Colliding Tooltip Toast -->
          <div id="dualToast" class="chart-floating-toast"></div>
        </div>

        <!-- Clean X-Axis Time Row -->
        <div class="dual-x-labels">
          ${data.map(d => `<span>${d.time}</span>`).join('')}
        </div>
      </div>

      <div class="dual-chart-legend" style="display:flex;gap:18px;justify-content:flex-end;margin-top:12px;font-size:11px;font-weight:600;flex-wrap:wrap">
        <span style="display:flex;align-items:center;gap:6px"><i style="width:12px;height:3px;background:var(--teal-600);border-radius:2px;display:inline-block"></i>Paddlewheel Speed (RPM)</span>
        <span style="display:flex;align-items:center;gap:6px"><i style="width:12px;height:2px;background:var(--black);border-top:1px dashed #000;display:inline-block"></i>Motor Power (kW)</span>
      </div>
    `;

    const hud = el.querySelector('#dualHud');
    const toast = el.querySelector('#dualToast');
    const scrubber = el.querySelector('#dualScrubberLine');
    const svg = el.querySelector('.dual-svg');

    const activateIndex = (idx) => {
      const pt = rpmPts[idx];
      const kwPt = kwPts[idx];
      if (!pt || !kwPt) return;

      // 1. Live HUD update in card header
      if (hud) {
        hud.querySelector('.hud-time').textContent = `Shift: ${pt.time}`;
        hud.querySelector('.hud-rpm').textContent = `${pt.rpm.toLocaleString()} RPM`;
        hud.querySelector('.hud-kw').textContent = `${kwPt.kw} kW`;
      }

      // 2. Vertical crosshair positioning
      if (scrubber) {
        scrubber.setAttribute('x1', pt.x);
        scrubber.setAttribute('x2', pt.x);
        scrubber.style.opacity = '1';
      }

      // 3. Floating tooltip pill positioned cleanly above
      if (toast) {
        toast.innerHTML = `<b>${pt.time}</b> · <span style="color:var(--teal-300)">${pt.rpm} RPM</span> · ${kwPt.kw} kW`;
        toast.style.opacity = '1';
        toast.style.left = `${(pt.x / W) * 100}%`;
        toast.style.top = `${(Math.min(pt.y, kwPt.y) / H) * 100 - 10}%`;
      }
    };

    const deactivate = () => {
      if (toast) toast.style.opacity = '0';
      if (scrubber) scrubber.style.opacity = '0';
      if (hud) {
        hud.querySelector('.hud-time').textContent = 'Hover or drag to scrub';
        hud.querySelector('.hud-rpm').textContent = 'Aerator: 1,550 RPM';
        hud.querySelector('.hud-kw').textContent = 'Power: 8.9 kW';
      }
    };

    svg.querySelectorAll('.dual-hitzone, .p').forEach(target => {
      target.addEventListener('mouseenter', () => {
        activateIndex(target.dataset.idx);
      });
      target.addEventListener('mouseleave', deactivate);
      target.addEventListener('click', () => {
        const idx = target.dataset.idx;
        window.AquaToast?.show(`Telemetry ${rpmPts[idx].time}: ${rpmPts[idx].rpm} RPM · Energy Draw ${kwPts[idx].kw} kW`, 'teal');
      });
    });

    // Mobile Touch Scrubbing Event
    const handleDualTouch = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = svg.getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      const relX = (touchX / rect.width) * W;

      let closestIdx = 0;
      let minDist = Infinity;
      data.forEach((d, i) => {
        const xPos = P + (i / (data.length - 1)) * (W - P * 2);
        const dist = Math.abs(xPos - relX);
        if (dist < minDist) {
          minDist = dist;
          closestIdx = i;
        }
      });
      activateIndex(closestIdx);
    };

    svg.addEventListener('touchstart', handleDualTouch, { passive: true });
    svg.addEventListener('touchmove', handleDualTouch, { passive: true });
    svg.addEventListener('touchend', () => {
      setTimeout(deactivate, 800);
    }, { passive: true });
  }
}

  /**
 * AquaOps Design System — Slide-Over Inspector Drawer Component
 * Handles opening, closing, keyboard escape dismissal, and outside click
 */

class AquaDrawer {
  constructor(backdropId = 'inspectorDrawer') {
    this.backdrop = document.getElementById(backdropId);
    this.closeBtn = this.backdrop?.querySelector('.drawer-close');
    this.init();
  }

  init() {
    if (!this.backdrop) return;

    this.closeBtn?.addEventListener('click', () => this.close());
    
    // Outside backdrop click
    this.backdrop.addEventListener('click', (e) => {
      if (e.target === this.backdrop) {
        this.close();
      }
    });

    // Keyboard ESC key dismissal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.backdrop.classList.contains('open')) {
        this.close();
      }
    });
  }

  open() {
    if (!this.backdrop) return;
    this.backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.backdrop) return;
    this.backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

  /**
 * AquaOps Design System — AquaTooltip Engine
 * Supports standard cardinal anchored tooltips and dynamic cursor-following tooltips (MUI followCursor)
 * with rounded corners and directional indicator arrows.
 */

class AquaTooltip {
  static el = null;
  static arrowEl = null;
  static contentEl = null;
  static currentTarget = null;
  static isFollowing = false;

  static init() {
    if (this.el) return;

    // Create the global floating tooltip node
    const tip = document.createElement('div');
    tip.className = 'aqua-floating-tooltip';
    tip.id = 'aquaGlobalTooltip';
    tip.setAttribute('role', 'tooltip');
    tip.setAttribute('aria-hidden', 'true');

    tip.innerHTML = `
      <div class="tooltip-arrow"></div>
      <div class="tooltip-content"></div>
    `;

    document.body.appendChild(tip);
    this.el = tip;
    this.arrowEl = tip.querySelector('.tooltip-arrow');
    this.contentEl = tip.querySelector('.tooltip-content');

    // Global Event Delegation
    document.addEventListener('mouseover', (e) => this.handleMouseOver(e));
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e), { passive: true });
    document.addEventListener('mouseout', (e) => this.handleMouseOut(e));

    // Keyboard Accessibility (Focusin / Focusout)
    document.addEventListener('focusin', (e) => this.handleFocusIn(e));
    document.addEventListener('focusout', () => this.hide());
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.hide();
    });
  }

  static handleMouseOver(e) {
    const target = e.target.closest('[data-tooltip]');
    if (!target) return;

    const text = target.getAttribute('data-tooltip');
    if (!text) return;

    this.currentTarget = target;
    this.isFollowing = target.getAttribute('data-tooltip-follow') === 'true';

    this.contentEl.innerHTML = text;
    this.el.setAttribute('aria-hidden', 'false');

    const placement = target.getAttribute('data-tooltip-placement') || 'top';
    this.el.setAttribute('data-placement', placement);

    if (this.isFollowing) {
      this.el.classList.add('follow-cursor');
      this.updateCursorPosition(e);
    } else {
      this.el.classList.remove('follow-cursor');
      this.positionToAnchor(target, placement);
    }

    // Trigger smooth fade-in
    requestAnimationFrame(() => {
      this.el.classList.add('visible');
    });
  }

  static handleMouseMove(e) {
    if (!this.currentTarget || !this.isFollowing) return;
    this.updateCursorPosition(e);
  }

  static handleMouseOut(e) {
    if (!this.currentTarget) return;
    const related = e.relatedTarget;
    if (related && this.currentTarget.contains(related)) return;
    this.hide();
  }

  static handleFocusIn(e) {
    const target = e.target.closest('[data-tooltip]');
    if (!target) return;

    const text = target.getAttribute('data-tooltip');
    if (!text) return;

    this.currentTarget = target;
    this.isFollowing = false;

    this.contentEl.innerHTML = text;
    this.el.setAttribute('aria-hidden', 'false');
    this.el.classList.remove('follow-cursor');

    const placement = target.getAttribute('data-tooltip-placement') || 'top';
    this.el.setAttribute('data-placement', placement);

    this.positionToAnchor(target, placement);
    requestAnimationFrame(() => {
      this.el.classList.add('visible');
    });
  }

  static updateCursorPosition(e) {
    const tipWidth = this.el.offsetWidth || 120;
    const tipHeight = this.el.offsetHeight || 32;

    // Follow cursor: float 14px above mouse cursor, with arrow pointing at cursor
    let left = e.clientX - 18;
    let top = e.clientY - tipHeight - 12;

    // Flip to bottom if cursor is near top of viewport
    if (top < 10) {
      top = e.clientY + 22;
      this.el.setAttribute('data-placement', 'bottom');
    } else {
      this.el.setAttribute('data-placement', 'top');
    }

    // Keep within horizontal screen bounds
    if (left + tipWidth > window.innerWidth - 12) {
      left = window.innerWidth - tipWidth - 12;
    }
    if (left < 12) {
      left = 12;
    }

    this.el.style.left = `${left}px`;
    this.el.style.top = `${top}px`;
  }

  static positionToAnchor(target, placement) {
    const rect = target.getBoundingClientRect();
    const tipWidth = this.el.offsetWidth || 120;
    const tipHeight = this.el.offsetHeight || 32;

    let left = 0;
    let top = 0;

    switch (placement) {
      case 'top':
        left = rect.left + rect.width / 2 - tipWidth / 2;
        top = rect.top - tipHeight - 8;
        break;
      case 'bottom':
        left = rect.left + rect.width / 2 - tipWidth / 2;
        top = rect.bottom + 8;
        break;
      case 'left':
        left = rect.left - tipWidth - 8;
        top = rect.top + rect.height / 2 - tipHeight / 2;
        break;
      case 'right':
        left = rect.right + 8;
        top = rect.top + rect.height / 2 - tipHeight / 2;
        break;
      default:
        left = rect.left + rect.width / 2 - tipWidth / 2;
        top = rect.top - tipHeight - 8;
    }

    // Horizontal boundary clamp
    if (left < 12) left = 12;
    if (left + tipWidth > window.innerWidth - 12) {
      left = window.innerWidth - tipWidth - 12;
    }

    this.el.style.left = `${left}px`;
    this.el.style.top = `${top}px`;
  }

  static hide() {
    if (!this.el) return;
    this.el.classList.remove('visible');
    this.el.setAttribute('aria-hidden', 'true');
    this.currentTarget = null;
    this.isFollowing = false;
  }
}

  /**
 * AquaOps Design System — Main Controller & Component Registry
 * Initializes and coordinates all Atomic components across the application
 */











document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1b. Initialize Kinetic Motion & Micro-Physics
  AquaMotion.init();

  // 1c. Initialize Calendar Date Picker (Image 3)
  AquaCalendar.init();

  // 1d. Initialize AquaTooltip Engine (MUI followCursor & Anchored)
  AquaTooltip.init();

  // 2. Component: Rich Select Dropdowns
  document.querySelectorAll('.rich-select').forEach((el) => {
    new AquaSelect(el);
  });

  // 2b. Global Custom Select Dropdown Enhancer (Image 2)
  function upgradeNativeSelects() {
    document.querySelectorAll('select.input:not([data-enhanced])').forEach((sel) => {
      sel.setAttribute('data-enhanced', 'true');
      sel.style.display = 'none';

      const isSm = sel.classList.contains('input-sm');
      const isLg = sel.classList.contains('input-lg');
      const isDisabled = sel.disabled;

      const wrap = document.createElement('div');
      wrap.className = `custom-select ${isSm ? 'input-sm' : ''} ${isLg ? 'input-lg' : ''}`;

      const selectedOpt = sel.options[sel.selectedIndex] || sel.options[0];
      const initialText = selectedOpt ? selectedOpt.textContent : 'Select...';

      const trigger = document.createElement('div');
      trigger.className = 'custom-select-trigger';
      if (isDisabled) {
        trigger.style.opacity = '0.6';
        trigger.style.cursor = 'not-allowed';
      }
      trigger.innerHTML = `
        <span class="custom-select-current"><span>${initialText}</span></span>
        <svg class="custom-select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      `;

      const menu = document.createElement('div');
      menu.className = 'custom-select-menu';
      const list = document.createElement('div');
      list.className = 'custom-select-list';

      Array.from(sel.options).forEach((opt, idx) => {
        if (opt.disabled && idx === 0 && !opt.value) return; // placeholder
        const item = document.createElement('div');
        item.className = `custom-select-option ${idx === sel.selectedIndex ? 'selected' : ''}`;
        item.innerHTML = `
          <span>${opt.textContent}</span>
          <svg class="custom-select-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        `;
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          sel.selectedIndex = idx;
          sel.dispatchEvent(new Event('change', { bubbles: true }));
          trigger.querySelector('.custom-select-current span').textContent = opt.textContent;
          list.querySelectorAll('.custom-select-option').forEach(o => o.classList.remove('selected'));
          item.classList.add('selected');
          wrap.classList.remove('open');
          AquaToast.show(`Selected: ${opt.textContent}`, 'teal');
        });
        list.appendChild(item);
      });

      menu.appendChild(list);
      wrap.appendChild(trigger);
      wrap.appendChild(menu);

      if (!isDisabled) {
        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = wrap.classList.contains('open');
          document.querySelectorAll('.custom-select.open, .rich-select.open').forEach(el => el.classList.remove('open'));
          if (!isOpen) wrap.classList.add('open');
        });
      }

      sel.parentNode.insertBefore(wrap, sel.nextSibling);
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.custom-select.open').forEach(el => el.classList.remove('open'));
    });
    initStaticCustomSelects();
  }

  function initStaticCustomSelects() {
    document.querySelectorAll('.custom-select').forEach((cs) => {
      const trigger = cs.querySelector('.custom-select-trigger');
      const menu = cs.querySelector('.custom-select-menu');
      if (!trigger || !menu || cs.hasAttribute('data-bound')) return;
      cs.setAttribute('data-bound', 'true');

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = cs.classList.contains('open');
        document.querySelectorAll('.custom-select.open, .rich-select.open').forEach(el => el.classList.remove('open'));
        if (!isOpen) cs.classList.add('open');
      });

      cs.querySelectorAll('.custom-select-option').forEach((opt) => {
        opt.addEventListener('click', (e) => {
          e.stopPropagation();
          const text = opt.querySelector('span')?.textContent || opt.textContent.trim();
          const currSpan = cs.querySelector('.custom-select-current span');
          if (currSpan) currSpan.textContent = text;
          cs.querySelectorAll('.custom-select-option').forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
          cs.classList.remove('open');
          AquaToast.show(`Selected: ${text}`, 'teal');
        });
      });
    });
  }

  upgradeNativeSelects();
  initStaticCustomSelects();

  // Rich Select Change Handlers & Toasts
  document.getElementById('richSpeciesSelect')?.addEventListener('aqua-change', (e) => {
    AquaToast.show(`Active species updated: ${e.detail.value}`, 'teal');
  });

  document.getElementById('richTargetSelect')?.addEventListener('aqua-change', (e) => {
    AquaToast.show(`Harvest target set: ${e.detail.value}`, 'teal');
  });

  document.getElementById('richMultiPondSelect')?.addEventListener('aqua-change', (e) => {
    const count = e.detail.values?.length || 0;
    AquaToast.show(`Monitored ponds updated (${count} selected)`, 'teal');
  });

  document.getElementById('richMetricSelect')?.addEventListener('aqua-change', (e) => {
    AquaToast.show(`Telemetry focus: ${e.detail.value}`, 'teal');
  });

  document.getElementById('entRowsSelect')?.addEventListener('aqua-change', (e) => {
    AquaToast.show(`Page size set to ${e.detail.value}`, 'teal');
  });

  document.getElementById('tblClusterSelect')?.addEventListener('aqua-change', (e) => {
    const val = e.detail.value;
    AquaToast.show(`Filtered table to ${val}`, 'teal');
    const targetTable = document.getElementById('enterpriseTable');
    if (!targetTable) return;
    targetTable.querySelectorAll('tbody tr:not(.detail-row)').forEach((row) => {
      const text = row.textContent;
      if (val === 'All Clusters' || 
         (val === 'Cluster Alpha' && (text.includes('POND-101') || text.includes('POND-102') || text.includes('POND-103') || text.includes('POND-104'))) || 
         (val === 'Cluster Delta' && (text.includes('POND-105') || text.includes('POND-106')))) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });

  // 3. Component: Floating Sidebar
  const sidebarEl = document.getElementById('demoSidebar');
  if (sidebarEl) {
    new AquaSidebar(sidebarEl);
  }

  // 4. Component: Data Tables & Pagination
  document.querySelectorAll('table.tbl').forEach((table) => {
    const bulk = table.closest('.table-wrap')?.querySelector('.bulk') || document.getElementById('bulk');
    new AquaTable(table, bulk);
  });

  const specPagerEl = document.getElementById('specPager');
  if (specPagerEl) {
    new AquaPager(specPagerEl);
  }
  const entPagerEl = document.getElementById('entPager');
  if (entPagerEl) {
    new AquaPager(entPagerEl);
  }

  // Table Density Switcher
  document.querySelectorAll('[data-density]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const density = btn.dataset.density;
      const targetTable = document.getElementById('enterpriseTable');
      if (!targetTable) return;
      targetTable.classList.remove('tbl-compact', 'tbl-standard', 'tbl-spacious');
      targetTable.classList.add(`tbl-${density}`);
      btn.parentElement.querySelectorAll('[data-density]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Table Filter Tabs
  document.querySelectorAll('[data-tbl-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.tblFilter;
      const targetTable = document.getElementById('enterpriseTable');
      if (!targetTable) return;
      btn.parentElement.querySelectorAll('[data-tbl-filter]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      targetTable.querySelectorAll('tbody tr:not(.detail-row)').forEach((row) => {
        const status = row.dataset.status || '';
        if (filter === 'all' || status === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
          const detailId = row.dataset.detailId;
          if (detailId) {
            const detailRow = document.getElementById(detailId);
            if (detailRow) detailRow.style.display = 'none';
          }
        }
      });
    });
  });

  // 5. Component: Charts & Telemetry (Interactive World-Class Visualizations)
  AquaCharts.renderBars('cBars', [
    { l: 'Mon', v: 52 }, { l: 'Tue', v: 68 }, { l: 'Wed', v: 61 },
    { l: 'Thu', v: 84 }, { l: 'Fri', v: 72 }, { l: 'Sat', v: 92 }, { l: 'Sun', v: 66 },
  ], 85);

  AquaCharts.renderBars('pBars', [
    { l: 'Mon', v: 44 }, { l: 'Tue', v: 62 }, { l: 'Wed', v: 58 },
    { l: 'Thu', v: 80 }, { l: 'Fri', v: 66 }, { l: 'Sat', v: 90 }, { l: 'Sun', v: 60 },
  ], 85);

  AquaCharts.renderHorizontal('cH', [
    { l: 'Vannamei', v: 78, kg: 28450 }, { l: 'Monodon', v: 52, kg: 14800 },
    { l: 'Tilapia', v: 34, kg: 9200 }, { l: 'Scampi', v: 61, kg: 17200 }, { l: 'Nursery', v: 22, kg: 5400 },
  ]);

  AquaCharts.renderLine('cPath', 'cArea', 'cDots', [30, 45, 38, 62, 55, 78, 70, 85, 72, 90]);
  AquaCharts.renderDonut('cDonut');
  AquaCharts.renderDonut('pDonut', 'pDonutVal', 'pDonutSub');

  // New Data Visualizations
  AquaCharts.renderGauge('cGauge', 94.2);
  AquaCharts.renderHeatmap('cHeatmap');
  AquaCharts.renderDualLine('cDualLine');

  // 6. Tabs Molecule
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    group.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      group.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 7. Searchbar Clear Molecule
  const clearBtn = document.getElementById('sClear');
  const sInput = document.getElementById('sInput');
  if (clearBtn && sInput) {
    clearBtn.addEventListener('click', () => {
      sInput.value = '';
      sInput.focus();
    });
  }

  // 8. Action Dropdown Menu Molecule
  const dd = document.getElementById('dd');
  const ddBtn = document.getElementById('ddBtn');
  if (dd && ddBtn) {
    ddBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dd.classList.toggle('open');
    });
    dd.querySelectorAll('.menu button').forEach((btn) => {
      btn.addEventListener('click', () => {
        dd.classList.remove('open');
        AquaToast.show(`Action executed: ${btn.textContent.trim()}`, 'teal');
      });
    });
    document.addEventListener('click', () => dd.classList.remove('open'));
  }

  // 9. Toast Triggers
  document.getElementById('toastTealBtn')?.addEventListener('click', () => {
    AquaToast.show('Settings saved successfully', 'teal');
  });
  document.getElementById('toastDarkBtn')?.addEventListener('click', () => {
    AquaToast.show('Scheduled task completed', '');
  });

  // 10. Accordion Organism
  document.querySelectorAll('#acc .acc-h').forEach((h) => {
    h.addEventListener('click', () => {
      h.closest('.acc-item').classList.toggle('open');
    });
  });

  // 11. Modal Dialog Organism
  const ov = document.getElementById('ov');
  document.getElementById('openModal')?.addEventListener('click', () => ov?.classList.add('show'));
  document.getElementById('mCancel')?.addEventListener('click', () => ov?.classList.remove('show'));
  document.getElementById('mOk')?.addEventListener('click', () => {
    ov?.classList.remove('show');
    AquaToast.show('Intake confirmed & biosecurity ledger updated', 'teal');
  });
  ov?.addEventListener('click', (e) => {
    if (e.target === ov) ov.classList.remove('show');
  });

  // 12. Stepper Molecule
  const steps = ['Details', 'Inventory', 'Review', 'Confirm'];
  let curStep = 1;
  const stepperEl = document.getElementById('stepper');
  function drawSteps() {
    if (!stepperEl) return;
    stepperEl.innerHTML = '';
    steps.forEach((s, i) => {
      const d = document.createElement('div');
      d.className = `step ${i < curStep ? 'done' : i === curStep ? 'now' : ''}`;
      d.innerHTML = `<i>${
        i < curStep
          ? '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
          : i + 1
      }</i><span>${s}</span>`;
      stepperEl.appendChild(d);
      if (i < steps.length - 1) {
        const l = document.createElement('div');
        l.className = 'step-line';
        stepperEl.appendChild(l);
      }
    });
  }
  document.getElementById('stNext')?.addEventListener('click', () => {
    if (curStep < steps.length - 1) {
      curStep++;
      drawSteps();
    }
  });
  document.getElementById('stBack')?.addEventListener('click', () => {
    if (curStep > 0) {
      curStep--;
      drawSteps();
    }
  });
  drawSteps();

  // 13. Enterprise Organism: Inspector Drawer
  const inspectorDrawer = new AquaDrawer('inspectorDrawer');
  document.querySelectorAll('[data-open-drawer]').forEach((btn) => {
    btn.addEventListener('click', () => inspectorDrawer.open());
  });

  // 14. Enterprise Atom: Segmented Controls
  document.querySelectorAll('.segmented-control').forEach((sc) => {
    sc.addEventListener('click', (e) => {
      const btn = e.target.closest('.segment-btn');
      if (!btn) return;
      sc.querySelectorAll('.segment-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 15. Enterprise Molecule: Filter Clear All & Chip Removal
  document.querySelectorAll('.filter-clear-all').forEach((btn) => {
    btn.addEventListener('click', () => {
      const bar = btn.closest('.filter-bar');
      if (bar) {
        bar.querySelectorAll('.tag, .filter-chip').forEach((t) => {
          t.style.opacity = '0';
          t.style.transform = 'scale(0.9)';
          setTimeout(() => t.remove(), 180);
        });
        const badge = bar.querySelector('.filter-bar-badge');
        if (badge) badge.textContent = '0';
        AquaToast.show('All query filters reset', 'teal');
      }
    });
  });

  document.querySelectorAll('.filter-chip-remove').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const chip = btn.closest('.filter-chip');
      if (chip) {
        chip.style.opacity = '0';
        chip.style.transform = 'scale(0.9)';
        chip.style.transition = 'all 0.15s ease';
        setTimeout(() => {
          const bar = chip.closest('.filter-bar');
          chip.remove();
          if (bar) {
            const count = bar.querySelectorAll('.filter-chip').length;
            const badge = bar.querySelector('.filter-bar-badge');
            if (badge) badge.textContent = count;
          }
        }, 150);
      }
    });
  });

  document.querySelectorAll('.filter-preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.parentElement.querySelectorAll('.filter-preset-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      AquaToast.show(`Preset activated: ${btn.textContent.trim()}`, 'teal');
    });
  });

  document.querySelectorAll('.filter-add-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      AquaToast.show('Choose a filter parameter to add', 'teal');
    });
  });

  // 15b. Action Icon Toolbar & View Mode Switcher
  document.querySelectorAll('#demoViewSwitcher .view-mode-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.parentElement.querySelectorAll('.view-mode-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const title = btn.getAttribute('title') || 'View mode';
      AquaToast.show(`Layout changed: ${title}`, 'teal');
    });
  });

  document.querySelectorAll('.action-icon-bar .icon-action-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const label = btn.getAttribute('aria-label') || 'Action';
      AquaToast.show(`${label} executed`, 'teal');
    });
  });

  // 15b. Enterprise Molecule: Command Palette (⌘K)
  const triggerCmdK = () => {
    AquaToast.show('Quick jump active: Type to find any page or item', 'teal');
  };
  document.getElementById('demoCmdK')?.addEventListener('click', triggerCmdK);
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      triggerCmdK();
    }
  });

  // 15c. Enterprise Molecule: Lab QC Dropzone Click
  document.getElementById('demoDropzone')?.addEventListener('click', () => {
    AquaToast.show('Upload ready: Drag or choose files to upload', 'teal');
  });

  // 16. Enterprise Molecule: Property Copy Buttons
  document.querySelectorAll('.prop-copy').forEach((btn) => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.copy || btn.closest('.prop-row')?.querySelector('.prop-val')?.textContent?.trim();
      if (val) {
        navigator.clipboard?.writeText(val);
        AquaToast.show(`Copied to clipboard: ${val}`, 'teal');
      }
    });
  });

  // 17. Complete Icon Library Controller (Category Filter & Copy)
  const iconCatBtns = document.querySelectorAll('.icon-cat-btn');
  const masterGrid = document.getElementById('masterIconGrid');
  const iconCountBadge = document.getElementById('iconVisibleCount');

  let activeCat = 'all';

  const filterIcons = () => {
    if (!masterGrid) return;
    const units = masterGrid.querySelectorAll('.ic-unit');
    let count = 0;
    units.forEach((u) => {
      const cat = u.dataset.cat || '';
      const matchesCat = activeCat === 'all' || cat === activeCat;

      if (matchesCat) {
        u.style.display = 'flex';
        count++;
      } else {
        u.style.display = 'none';
      }
    });
    if (iconCountBadge) iconCountBadge.textContent = count;
  };

  iconCatBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      iconCatBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat;
      filterIcons();
    });
  });

  masterGrid?.addEventListener('click', (e) => {
    const unit = e.target.closest('.ic-unit');
    if (!unit) return;
    const iconName = unit.dataset.iconName;
    if (iconName) {
      const markup = `<i data-lucide="${iconName}"></i>`;
      navigator.clipboard?.writeText(markup);
      AquaToast.show(`Copied: ${markup}`, 'teal');
    }
  });

  // 17b. Interactive Atoms: Color Swatches Click-to-Copy
  document.querySelectorAll('.sw-card').forEach((card) => {
    card.addEventListener('click', () => {
      const hex = card.dataset.hex;
      if (hex) {
        navigator.clipboard?.writeText(hex);
        AquaToast.show(`Copied ${hex} to clipboard`, 'teal');
      }
    });
  });

  // 17c. Interactive Atoms: Buttons Showcase
  const stage1 = document.getElementById('stage1');
  if (stage1) {
    stage1.querySelectorAll('.btn').forEach((btn) => {
      if (btn.disabled || btn.getAttribute('data-bound')) return;
      btn.setAttribute('data-bound', 'true');
      btn.addEventListener('click', (e) => {
        const text = btn.textContent.trim();
        if (text.includes('Save changes')) {
          AquaToast.show('Changes saved successfully', 'teal');
        } else if (text.includes('New item')) {
          AquaToast.show('New item created', 'teal');
        } else if (text.includes('Delete')) {
          AquaToast.show('Item deleted', 'ruby');
        } else if (text.includes('Pill')) {
          AquaToast.show('Pill mode activated', 'teal');
        }
      });
    });

    // Bell notification toggle
    stage1.querySelectorAll('.iconbtn').forEach((btn) => {
      if (btn.title?.includes('Notifications') || btn.title?.includes('Alerts')) {
        btn.addEventListener('click', () => {
          const dot = btn.querySelector('.ndot');
          if (dot) {
            const isHidden = dot.style.display === 'none';
            dot.style.display = isHidden ? 'block' : 'none';
            AquaToast.show(isHidden ? '1 unread notification' : 'Notifications marked as read', 'teal');
          }
        });
      }
    });

    // Tag removal (.tag-remove)
    stage1.querySelectorAll('.tag-remove').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const tag = btn.closest('.tag');
        if (tag) {
          tag.style.opacity = '0';
          tag.style.transform = 'scale(0.85)';
          tag.style.transition = 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)';
          setTimeout(() => {
            const label = tag.textContent.trim();
            tag.remove();
            AquaToast.show(`Filter removed: ${label}`, 'teal');
          }, 180);
        }
      });
    });

    // Switch toggles
    stage1.querySelectorAll('.switch input').forEach((sw) => {
      sw.addEventListener('change', () => {
        const label = sw.closest('.line-row')?.querySelector('span')?.textContent?.trim() || 'Setting';
        AquaToast.show(`${label}: ${sw.checked ? 'Enabled' : 'Disabled'}`, 'teal');
      });
    });

    // Inline Calendar Specimen Interaction
    const inlineCal = stage1.querySelector('.calendar-popover');
    if (inlineCal) {
      inlineCal.querySelectorAll('.calendar-preset-btn').forEach((pbtn) => {
        pbtn.addEventListener('click', () => {
          inlineCal.querySelectorAll('.calendar-preset-btn').forEach(b => b.classList.remove('active'));
          pbtn.classList.add('active');
          const pText = pbtn.textContent.trim();
          const days = inlineCal.querySelectorAll('.calendar-day-btn');
          days.forEach(d => d.classList.remove('selected'));
          if (pText === 'Today') {
            days.forEach(d => { if (d.textContent.trim() === '14' && !d.classList.contains('other-month')) d.classList.add('selected'); });
            AquaToast.show('Calendar set to Today (Oct 14)', 'teal');
          } else if (pText === 'Yesterday') {
            days.forEach(d => { if (d.textContent.trim() === '13' && !d.classList.contains('other-month')) d.classList.add('selected'); });
            AquaToast.show('Calendar set to Yesterday (Oct 13)', 'teal');
          } else if (pText === '1st of Month') {
            days.forEach(d => { if (d.textContent.trim() === '1' && !d.classList.contains('other-month')) d.classList.add('selected'); });
            AquaToast.show('Calendar set to Oct 1', 'teal');
          } else if (pText === 'Clear') {
            AquaToast.show('Calendar selection cleared', '');
          }
        });
      });

      inlineCal.querySelectorAll('.calendar-day-btn:not(.other-month)').forEach((dbtn) => {
        dbtn.addEventListener('click', () => {
          inlineCal.querySelectorAll('.calendar-day-btn').forEach(d => d.classList.remove('selected'));
          inlineCal.querySelectorAll('.calendar-preset-btn').forEach(b => b.classList.remove('active'));
          dbtn.classList.add('selected');
          const day = dbtn.textContent.trim();
          AquaToast.show(`Selected date: October ${day}, 2026`, 'teal');
        });
      });
    }
  }

  // 17d. Live Interactive Field Validation Demo
  const errDoField = document.getElementById('errDoField');
  const liveValMsg = document.getElementById('liveValMsg');
  if (errDoField && liveValMsg) {
    errDoField.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val >= 4.0) {
        errDoField.className = 'input succ';
        liveValMsg.className = 'msg ok';
        liveValMsg.innerHTML = '<i data-lucide="check-circle-2"></i><span>Looks good! Value is within safety limits.</span>';
      } else {
        errDoField.className = 'input err';
        liveValMsg.className = 'msg err';
        liveValMsg.innerHTML = '<i data-lucide="alert-triangle"></i><span>Value must be at least 4.0 mg/L. (Try typing 4.0 or more)</span>';
      }
      if (window.lucide) window.lucide.createIcons();
    });
  }

  // 17e. System Alerts & Offline Card Reconnect
  document.getElementById('btnReconnectSensor')?.addEventListener('click', (e) => {
    const btn = e.currentTarget;
    btn.innerHTML = '<span class="spinner"></span>Connecting...';
    btn.disabled = true;
    setTimeout(() => {
      const alert = document.getElementById('demoCriticalAlert');
      if (alert) {
        alert.className = 'callout callout-success';
        alert.innerHTML = `
          <i data-lucide="check-circle-2"></i>
          <div class="callout-content">
            <div class="callout-title">Sensor 104 Reconnected</div>
            <div>Live telemetry stream restored and transmitting normally.</div>
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();
      }
      AquaToast.show('Sensor 104 reconnected successfully', 'teal');
    }, 900);
  });

  document.getElementById('btnRetryOffline')?.addEventListener('click', (e) => {
    const btn = e.currentTarget;
    btn.innerHTML = '<span class="spinner"></span>Connecting...';
    btn.disabled = true;
    setTimeout(() => {
      const card = document.getElementById('demoOfflineCard');
      const iconWrap = document.getElementById('offlineIconWrap');
      const title = document.getElementById('offlineTitle');
      const desc = document.getElementById('offlineDesc');
      if (card && iconWrap && title && desc) {
        card.style.background = '#f0fafc';
        card.style.border = '1px solid #b2ecf3';
        iconWrap.style.background = '#d8f4f8';
        iconWrap.style.color = '#004d57';
        iconWrap.innerHTML = '<i data-lucide="wifi"></i>';
        title.textContent = 'Device Online';
        desc.textContent = 'Station Delta is connected and synchronizing local telemetry records.';
        btn.innerHTML = '<i data-lucide="check"></i>Connected';
        btn.className = 'btn btn-primary btn-sm';
        btn.disabled = true;
        if (window.lucide) window.lucide.createIcons();
      }
      AquaToast.show('Station Delta connection restored', 'teal');
    }, 1000);
  });

  // 18. Robust Live Viewport ScrollSpy & Stage Progress Tracker
  const stageNav = document.querySelector('.stage-nav');
  const stageNavBtns = Array.from(document.querySelectorAll('.stage-nav-btn'));
  const navInner = document.querySelector('.stage-nav-inner');

  // Insert progress bar indicator along bottom edge of sticky stage-nav
  let navProgressBar = document.querySelector('.stage-nav-progress');
  if (!navProgressBar && stageNav) {
    navProgressBar = document.createElement('div');
    navProgressBar.className = 'stage-nav-progress';
    stageNav.appendChild(navProgressBar);
  }

  // Map each button to its target element and anchor ID
  const navTargets = stageNavBtns.map((btn) => {
    const href = btn.getAttribute('href');
    if (href && href.startsWith('#')) {
      const el = document.getElementById(href.slice(1));
      return el ? { btn, el, id: href.slice(1) } : null;
    }
    return null;
  }).filter(Boolean);

  const updateScrollSpy = () => {
    // 1. Live scroll progress percentage
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    if (navProgressBar) {
      navProgressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }

    // 2. Active Section Detection using live viewport coordinates
    const headerHeight = 120; // sticky header offset
    let activeTarget = null;

    // Check if at the very bottom
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 50) {
      activeTarget = navTargets[navTargets.length - 1];
    } else if (window.scrollY < 200) {
      // At the top of the page
      activeTarget = navTargets[0];
    } else {
      // Find the target whose top is <= headerHeight and bottom > headerHeight
      for (const target of navTargets) {
        const rect = target.el.getBoundingClientRect();
        if (rect.top <= headerHeight && rect.bottom > headerHeight) {
          activeTarget = target;
          break;
        }
      }

      // Fallback: target closest to top of viewport
      if (!activeTarget) {
        let minDiff = Infinity;
        for (const target of navTargets) {
          const rect = target.el.getBoundingClientRect();
          const diff = Math.abs(rect.top - headerHeight);
          if (diff < minDiff) {
            minDiff = diff;
            activeTarget = target;
          }
        }
      }
    }

    if (activeTarget) {
      stageNavBtns.forEach((b) => b.classList.remove('active'));
      activeTarget.btn.classList.add('active');

      if (navInner) {
        const btnRect = activeTarget.btn.getBoundingClientRect();
        const innerRect = navInner.getBoundingClientRect();
        if (btnRect.left < innerRect.left || btnRect.right > innerRect.right) {
          activeTarget.btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    }
  };

  window.addEventListener('scroll', updateScrollSpy, { passive: true });
  window.addEventListener('resize', updateScrollSpy, { passive: true });
  updateScrollSpy();

  // Smooth scroll with sticky header offset on button click
  stageNavBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.getElementById(href.slice(1));
        if (target) {
          e.preventDefault();
          const targetTop = target.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
          stageNavBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          if (navInner) {
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        }
      }
    });
  });

  // 19. Re-initialize Lucide Icons for dynamic additions
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// Export globally for inline triggers if needed
window.AquaToast = AquaToast;
window.AquaTooltip = AquaTooltip;



  // Global window exports
  window.AquaToast = AquaToast;
  window.AquaTooltip = AquaTooltip;
  window.AquaMotion = AquaMotion;
  window.AquaCalendar = AquaCalendar;
  window.AquaSelect = AquaSelect;
})();
