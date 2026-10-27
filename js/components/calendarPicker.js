// AquaPulse Enterprise Calendar & Date Picker Component (v5 Enterprise)

export const CalendarPicker = {
  activeInput: null,
  popover: null,
  currentDate: new Date(),
  selectedDate: null,
  viewMode: 'days', // 'days' | 'months' | 'years'
  yearRangeStart: 2020,

  init() {
    this.createPopover();
    this.bindGlobalListeners();
  },

  createPopover() {
    let existing = document.getElementById('aquapulse-calendar-popover');
    if (existing) {
      this.popover = existing;
      return;
    }

    const popover = document.createElement('div');
    popover.id = 'aquapulse-calendar-popover';
    popover.className = 'fixed hidden bg-white rounded-2xl border border-[#CBD5E1] shadow-2xl p-4 w-72 select-none text-xs font-sans animate-fade-in';
    popover.style.zIndex = '99999';
    popover.style.boxShadow = '0 10px 30px -5px rgba(0, 108, 122, 0.18), 0 8px 12px -6px rgba(0, 0, 0, 0.08)';
    document.body.appendChild(popover);
    this.popover = popover;
  },

  bindGlobalListeners() {
    // Intercept clicks on any date input, date wrapper, or calendar button
    document.addEventListener('click', (e) => {
      const dateInput = e.target.closest('input[type="date"], .erp-date-input, [data-calendar], [data-has-calendar]');
      const dateWrapper = e.target.closest('.erp-date-wrapper');

      if (dateInput) {
        e.preventDefault();
        e.stopPropagation();
        this.open(dateInput);
        return;
      }

      if (dateWrapper) {
        const inp = dateWrapper.querySelector('input[type="date"], .erp-date-input, [data-calendar], [data-has-calendar], input');
        if (inp) {
          e.preventDefault();
          e.stopPropagation();
          this.open(inp);
          return;
        }
      }

      // Close when clicking outside
      if (this.popover && !this.popover.contains(e.target)) {
        this.close();
      }
    });

    // Intercept focus to prevent keyboard popping up on mobile/desktop
    document.addEventListener('focusin', (e) => {
      const dateInput = e.target.closest('input[type="date"], .erp-date-input, [data-calendar], [data-has-calendar]');
      if (dateInput && dateInput !== this.activeInput) {
        e.preventDefault();
        this.open(dateInput);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });

    // Reposition on window resize / scroll
    window.addEventListener('resize', () => {
      if (this.activeInput && !this.popover.classList.contains('hidden')) {
        this.positionPopover();
      }
    });
    window.addEventListener('scroll', () => {
      if (this.activeInput && !this.popover.classList.contains('hidden')) {
        this.positionPopover();
      }
    }, true);
  },

  open(inputElement) {
    if (!this.popover) this.createPopover();
    this.activeInput = inputElement;

    // Ensure persistent styling and discovery classes
    inputElement.classList.add('erp-date-input');
    inputElement.setAttribute('data-calendar', 'true');
    inputElement.setAttribute('data-has-calendar', 'true');

    // Safety guard: neutralize native browser date picker popup
    if (inputElement.type === 'date') {
      try {
        inputElement.type = 'text';
      } catch (err) {
        // Some older engines restrict type mutation
      }
    }
    inputElement.readOnly = true;
    inputElement.inputMode = 'none';

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
        this.selectedDate = null;
        this.currentDate = new Date();
      }
    } else {
      this.selectedDate = null;
      this.currentDate = new Date();
    }

    this.viewMode = 'days';
    this.render();
    this.popover.classList.remove('hidden');
    this.positionPopover();
  },

  close() {
    if (this.popover) {
      this.popover.classList.add('hidden');
    }
    this.activeInput = null;
    this.viewMode = 'days';
  },

  positionPopover() {
    if (!this.activeInput || !this.popover) return;
    const rect = this.activeInput.getBoundingClientRect();
    const popoverWidth = 288;
    const popoverHeight = 330;

    let left = rect.left;
    let top = rect.bottom + 6;

    // Boundary protection: right edge
    if (left + popoverWidth > window.innerWidth - 12) {
      left = window.innerWidth - popoverWidth - 12;
    }
    if (left < 12) left = 12;

    // Boundary protection: bottom edge (flip upward if needed)
    if (top + popoverHeight > window.innerHeight - 12 && rect.top > popoverHeight + 12) {
      top = rect.top - popoverHeight - 6;
    }

    this.popover.style.left = `${left}px`;
    this.popover.style.top = `${top}px`;
  },

  render() {
    if (!this.popover) return;

    if (this.viewMode === 'months') {
      this.renderMonthsView();
      return;
    }

    if (this.viewMode === 'years') {
      this.renderYearsView();
      return;
    }

    this.renderDaysView();
  },

  renderDaysView() {
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
      daysHtml += `<div class="w-8 h-8 flex items-center justify-center text-[#94A3B8] opacity-40 text-xs rounded-full cursor-not-allowed">${d}</div>`;
    }

    // Days in current month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = this.selectedDate &&
        this.selectedDate.getFullYear() === year &&
        this.selectedDate.getMonth() === month &&
        this.selectedDate.getDate() === day;

      const isCurrentDay = isTodayYearMonth && today.getDate() === day;

      let cellClass = 'w-8 h-8 flex items-center justify-center text-xs rounded-full font-medium transition-all cursor-pointer ';

      if (isSelected) {
        cellClass += 'bg-[#02a8b5] text-white font-bold shadow-xs hover:bg-[#008f9a]';
      } else if (isCurrentDay) {
        cellClass += 'bg-[#F0FAFC] text-[#02a8b5] font-bold border border-[#B2ECF3] hover:bg-[#E0F7FA]';
      } else {
        cellClass += 'text-[#0F172A] hover:bg-[#F1F5F9] hover:text-[#02a8b5]';
      }

      daysHtml += `<button type="button" class="${cellClass}" data-calendar-day="${day}">${day}</button>`;
    }

    this.popover.innerHTML = `
      <div class="space-y-3">
        <!-- Calendar Header: Month/Year interactive buttons -->
        <div class="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
          <button type="button" id="cal-prev-btn" class="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer" title="Previous Month">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          
          <div class="flex items-center gap-1 font-bold text-xs text-[#0F172A]">
            <button type="button" id="cal-month-jump-btn" class="px-2 py-0.5 rounded-md text-[#02a8b5] font-extrabold hover:bg-teal-50 hover:text-teal-800 transition-colors cursor-pointer flex items-center gap-0.5" title="Click to pick Month">
              <span>${monthNames[month]}</span>
              <svg class="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <button type="button" id="cal-year-jump-btn" class="px-2 py-0.5 rounded-md text-[#0F172A] font-extrabold hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-0.5" title="Click to pick Year">
              <span>${year}</span>
              <svg class="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
          </div>

          <button type="button" id="cal-next-btn" class="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer" title="Next Month">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>

        <!-- Quick Presets -->
        <div class="flex items-center justify-between gap-1 pb-1">
          <button type="button" data-preset="today" class="px-2 py-0.5 rounded text-[11px] font-semibold text-[#02a8b5] bg-[#F0FAFC] hover:bg-[#E0F7FA] transition-colors cursor-pointer">Today</button>
          <button type="button" data-preset="yesterday" class="px-2 py-0.5 rounded text-[11px] font-semibold text-[#64748B] hover:bg-[#F1F5F9] transition-colors cursor-pointer">Yesterday</button>
          <button type="button" data-preset="first-day" class="px-2 py-0.5 rounded text-[11px] font-semibold text-[#64748B] hover:bg-[#F1F5F9] transition-colors cursor-pointer">1st of Month</button>
          <button type="button" data-preset="clear" class="px-2 py-0.5 rounded text-[11px] font-semibold text-[#EF4444] hover:bg-[#FEE2E2] transition-colors cursor-pointer">Clear</button>
        </div>

        <!-- Weekday Labels -->
        <div class="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-[#94A3B8] uppercase tracking-wider">
          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
        </div>

        <!-- Days Grid -->
        <div class="grid grid-cols-7 gap-1 place-items-center" id="cal-days-grid">
          ${daysHtml}
        </div>
      </div>
    `;

    // Jump to Month View
    this.popover.querySelector('#cal-month-jump-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.viewMode = 'months';
      this.render();
    });

    // Jump to Year View
    this.popover.querySelector('#cal-year-jump-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.yearRangeStart = Math.floor(year / 12) * 12;
      this.viewMode = 'years';
      this.render();
    });

    // Prev / Next Month
    this.popover.querySelector('#cal-prev-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.render();
    });

    this.popover.querySelector('#cal-next-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.render();
    });

    // Presets
    this.popover.querySelectorAll('[data-preset]').forEach(btn => {
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

    // Day clicks
    this.popover.querySelectorAll('[data-calendar-day]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const day = parseInt(btn.getAttribute('data-calendar-day'), 10);
        this.selectDate(year, month, day);
      });
    });
  },

  renderMonthsView() {
    const year = this.currentDate.getFullYear();
    const currentMonth = this.currentDate.getMonth();
    const today = new Date();

    const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const fullMonths = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let monthsHtml = '';
    shortMonths.forEach((mName, mIdx) => {
      const isSelected = this.selectedDate &&
        this.selectedDate.getFullYear() === year &&
        this.selectedDate.getMonth() === mIdx;

      const isCurrent = (year === today.getFullYear()) && (mIdx === today.getMonth());
      const isActive = mIdx === currentMonth;

      let cellClass = 'py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex flex-col items-center justify-center ';
      if (isSelected || isActive) {
        cellClass += 'bg-[#02a8b5] text-white font-bold shadow-xs hover:bg-[#008f9a]';
      } else if (isCurrent) {
        cellClass += 'bg-teal-50 text-[#02a8b5] font-bold border border-teal-200 hover:bg-teal-100';
      } else {
        cellClass += 'text-slate-700 hover:bg-slate-100 hover:text-[#02a8b5]';
      }

      monthsHtml += `
        <button type="button" class="${cellClass}" data-calendar-month="${mIdx}" title="${fullMonths[mIdx]}">
          <span>${mName}</span>
        </button>
      `;
    });

    this.popover.innerHTML = `
      <div class="space-y-3">
        <!-- Month View Header -->
        <div class="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
          <button type="button" id="cal-month-back-btn" class="px-2 py-1 rounded-md text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center gap-1 transition-colors cursor-pointer" title="Back to Days">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            <span>Days</span>
          </button>

          <button type="button" id="cal-header-year-btn" class="px-2.5 py-1 rounded-md text-sm font-black text-[#0F172A] hover:bg-slate-100 flex items-center gap-1 cursor-pointer transition-colors" title="Click to choose Year">
            <span>${year}</span>
            <svg class="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>

          <div class="w-12"></div>
        </div>

        <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
          Select Month
        </div>

        <!-- 3x4 Month Grid -->
        <div class="grid grid-cols-3 gap-2">
          ${monthsHtml}
        </div>
      </div>
    `;

    // Back to Days
    this.popover.querySelector('#cal-month-back-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.viewMode = 'days';
      this.render();
    });

    // Jump to Year
    this.popover.querySelector('#cal-header-year-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.yearRangeStart = Math.floor(year / 12) * 12;
      this.viewMode = 'years';
      this.render();
    });

    // Month Selection Click
    this.popover.querySelectorAll('[data-calendar-month]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const mIdx = parseInt(btn.getAttribute('data-calendar-month'), 10);
        this.currentDate.setMonth(mIdx);
        this.viewMode = 'days';
        this.render();
      });
    });
  },

  renderYearsView() {
    const currentYear = this.currentDate.getFullYear();
    const today = new Date();
    const startYear = this.yearRangeStart || (Math.floor(currentYear / 12) * 12);
    const endYear = startYear + 11;

    let yearsHtml = '';
    for (let y = startYear; y <= endYear; y++) {
      const isSelected = this.selectedDate && this.selectedDate.getFullYear() === y;
      const isCurrent = y === today.getFullYear();
      const isActive = y === currentYear;

      let cellClass = 'py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex flex-col items-center justify-center ';
      if (isSelected || isActive) {
        cellClass += 'bg-[#02a8b5] text-white font-bold shadow-xs hover:bg-[#008f9a]';
      } else if (isCurrent) {
        cellClass += 'bg-teal-50 text-[#02a8b5] font-bold border border-teal-200 hover:bg-teal-100';
      } else {
        cellClass += 'text-slate-700 hover:bg-slate-100 hover:text-[#02a8b5]';
      }

      yearsHtml += `
        <button type="button" class="${cellClass}" data-calendar-year="${y}">
          <span>${y}</span>
        </button>
      `;
    }

    this.popover.innerHTML = `
      <div class="space-y-3">
        <!-- Year View Header with Pagination -->
        <div class="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
          <button type="button" id="cal-year-prev-btn" class="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer" title="Previous 12 Years">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>

          <span class="text-xs font-black text-[#0F172A] tracking-wider">
            ${startYear} – ${endYear}
          </span>

          <button type="button" id="cal-year-next-btn" class="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer" title="Next 12 Years">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>

        <div class="flex items-center justify-between px-1">
          <button type="button" id="cal-year-back-btn" class="text-[11px] font-semibold text-slate-500 hover:text-[#02a8b5] flex items-center gap-1 cursor-pointer transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            <span>Back to Days</span>
          </button>
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select Year</span>
        </div>

        <!-- 3x4 Year Grid -->
        <div class="grid grid-cols-3 gap-2">
          ${yearsHtml}
        </div>
      </div>
    `;

    // Year Pagination
    this.popover.querySelector('#cal-year-prev-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.yearRangeStart = startYear - 12;
      this.render();
    });

    this.popover.querySelector('#cal-year-next-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.yearRangeStart = startYear + 12;
      this.render();
    });

    // Back to Days
    this.popover.querySelector('#cal-year-back-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.viewMode = 'days';
      this.render();
    });

    // Year Selection Click
    this.popover.querySelectorAll('[data-calendar-year]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const y = parseInt(btn.getAttribute('data-calendar-year'), 10);
        this.currentDate.setFullYear(y);
        // After selecting year, switch to Month picker so user can confirm/pick month easily
        this.viewMode = 'months';
        this.render();
      });
    });
  },

  selectDate(year, month, day) {
    if (!this.activeInput) return;

    const pad = (n) => String(n).padStart(2, '0');
    const dateStr = `${year}-${pad(month + 1)}-${pad(day)}`;

    this.activeInput.value = dateStr;
    this.activeInput.dispatchEvent(new Event('change', { bubbles: true }));
    this.activeInput.dispatchEvent(new Event('input', { bubbles: true }));

    this.close();
  }
};
