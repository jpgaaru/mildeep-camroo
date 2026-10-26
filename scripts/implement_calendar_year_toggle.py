#!/usr/bin/env python3
"""
scripts/implement_calendar_year_toggle.py
Implements the Calendar Year-View Toggle and Body-Swapping Grid across:
- js/views/preprocessingView.js
- standalone.html
- miledeep-devi-fisheries.html
"""

import sys

OLD_CAL_BLOCK = """    activeInput: null,
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
    },"""

NEW_CAL_BLOCK = """    activeInput: null,
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
      `;
      document.head.appendChild(st);
    },"""

# Next, open(inputElement) needs viewMode reset:
OLD_OPEN_BLOCK = """    open(inputElement) {
      if (!this.popover) this.createPopover();
      this.activeInput = inputElement;

      const val = (inputElement.value || '').trim();"""

NEW_OPEN_BLOCK = """    open(inputElement) {
      if (!this.popover) this.createPopover();
      this.activeInput = inputElement;
      this.viewMode = 'DAYS';
      this.yearRangeStart = null;

      const val = (inputElement.value || '').trim();"""

# Next, render() function replacement:
OLD_RENDER_START = "    render() {\n      if (!this.popover) return;\n      const year = this.currentDate.getFullYear();\n      const month = this.currentDate.getMonth();"
OLD_RENDER_END = "      this.popover.querySelectorAll('[data-calendar-day]').forEach((btn) => {\n        btn.addEventListener('click', (e) => {\n          e.stopPropagation();\n          const day = parseInt(btn.getAttribute('data-calendar-day'), 10);\n          this.selectDate(year, month, day);\n        });\n      });\n    },"

NEW_RENDER_BLOCK = """    render() {
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
    },"""

def update_file(path):
    print(f"Updating {path}...")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update CAL_BLOCK
    if OLD_CAL_BLOCK in content:
        content = content.replace(OLD_CAL_BLOCK, NEW_CAL_BLOCK)
        print("  ✓ Replaced CAL_BLOCK successfully")
    else:
        print("  ⚠ OLD_CAL_BLOCK not found")

    # 2. Update OPEN_BLOCK
    if OLD_OPEN_BLOCK in content:
        content = content.replace(OLD_OPEN_BLOCK, NEW_OPEN_BLOCK)
        print("  ✓ Replaced OPEN_BLOCK successfully")
    else:
        print("  ⚠ OLD_OPEN_BLOCK not found")

    # 3. Update RENDER_BLOCK
    # Find start and end of render()
    start_idx = content.find(OLD_RENDER_START)
    if start_idx != -1:
        end_idx = content.find(OLD_RENDER_END, start_idx)
        if end_idx != -1:
            full_end = end_idx + len(OLD_RENDER_END)
            content = content[:start_idx] + NEW_RENDER_BLOCK + content[full_end:]
            print("  ✓ Replaced RENDER_BLOCK successfully")
        else:
            print("  ⚠ OLD_RENDER_END not found")
    else:
        print("  ⚠ OLD_RENDER_START not found")

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Saved {path}.\n")

if __name__ == "__main__":
    files = [
        "js/views/preprocessingView.js",
        "standalone.html",
        "miledeep-devi-fisheries.html"
    ]
    for file_path in files:
        update_file(file_path)
