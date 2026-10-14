/**
 * AquaOps Design System — Enterprise Calendar Date Picker Controller
 * Matches Apple / Linear high-density calendar specs (Image 3)
 */

export const AquaCalendar = {
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
