#!/usr/bin/env python3
"""
Integrates Camaroo Design System:
1. Scroll down / Custom Select dropdown (Image 2)
2. Interactive Calendar popover (Image 1)
Applies them cleanly to Pre-Processing views and popup modals, without touching other input field designs.
Symmetrically updates css/app.css, js/views/preprocessingView.js, standalone.html, and miledeep-devi-fisheries.html.
"""

import os
import re

CAMAROO_CSS = """
/* ==========================================================
   Camaroo Design System — Custom Select Dropdown (Image 2)
   ========================================================== */
.custom-select {
  position: relative;
  width: 100%;
  font-family: inherit;
}
.custom-select.compact {
  width: auto;
  display: inline-block;
}
.custom-select-trigger {
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
  font-size: 12.5px;
  font-weight: 600;
  color: #0F172A;
  transition: all 0.16s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  outline: none;
}
.custom-select-trigger:hover {
  border-color: #94A3B8;
}
.custom-select.open .custom-select-trigger,
.custom-select-trigger:focus-visible {
  border-color: #006C7A !important;
  box-shadow: 0 0 0 3px rgba(0, 108, 122, 0.16) !important;
  background: #FFFFFF !important;
}
.custom-select-current {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex: 1;
}
.custom-select-current span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.custom-select-chevron {
  width: 16px;
  height: 16px;
  color: #64748B;
  transition: transform 0.2s ease, color 0.16s ease;
  flex-shrink: 0;
}
.custom-select.open .custom-select-chevron {
  transform: rotate(180deg);
  color: #006C7A;
}
.custom-select-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  width: 100%;
  min-width: 180px;
  background: #FFFFFF;
  border: 1px solid #CBD5E1;
  border-radius: 12px;
  box-shadow: 0 12px 28px -5px rgba(15, 23, 42, 0.14), 0 4px 10px -4px rgba(15, 23, 42, 0.06);
  display: none;
  z-index: 1000;
  overflow: hidden;
  animation: csDropIn 0.16s ease;
}
@keyframes csDropIn {
  from { opacity: 0; transform: translateY(-4px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.custom-select.open .custom-select-menu {
  display: block;
}
.custom-select.drop-up .custom-select-menu {
  top: auto;
  bottom: calc(100% + 6px);
}
.custom-select-list {
  max-height: 240px;
  overflow-y: auto;
  padding: 5px;
}
.custom-select-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.12s ease, color 0.12s ease;
  user-select: none;
  font-size: 12.5px;
  font-weight: 600;
  color: #1E293B;
}
.custom-select-option:hover {
  background: #F1F5F9;
  color: #0F172A;
}
.custom-select-option.selected {
  background: #F0FAFC;
  color: #006C7A;
  font-weight: 700;
}
.custom-select-check {
  width: 15px;
  height: 15px;
  color: #006C7A;
  flex-shrink: 0;
  display: none;
}
.custom-select-option.selected .custom-select-check {
  display: block;
}

/* ==========================================================
   Camaroo Design System — Calendar Date Picker Popover (Image 1)
   ========================================================== */
.calendar-popover {
  position: absolute;
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #CBD5E1;
  box-shadow: 0 12px 32px -5px rgba(0, 108, 122, 0.2), 0 8px 14px -6px rgba(0, 0, 0, 0.08);
  padding: 16px;
  width: 288px;
  user-select: none;
  font-size: 12px;
  z-index: 99999;
  display: none;
  animation: csDropIn 0.18s ease;
}
.calendar-popover.show {
  display: block;
}
.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #F1F5F9;
}
.calendar-nav-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: transparent;
  border: none;
  color: #64748B;
  cursor: pointer;
  transition: all 0.14s ease;
}
.calendar-nav-btn:hover {
  background: #F1F5F9;
  color: #0F172A;
}
.calendar-title {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 700;
  color: #0F172A;
}
.calendar-title .cal-month {
  color: #006C7A;
  font-weight: 800;
}
.calendar-presets {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  padding: 10px 0 8px 0;
}
.calendar-preset-btn {
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: transparent;
  border: none;
  color: #64748B;
  cursor: pointer;
  transition: all 0.12s ease;
}
.calendar-preset-btn:hover {
  background: #F1F5F9;
  color: #0F172A;
}
.calendar-preset-btn.active {
  background: #F0FAFC;
  color: #006C7A;
  font-weight: 700;
}
.calendar-preset-btn.clear-btn {
  color: #EF4444;
  margin-left: auto;
}
.calendar-preset-btn.clear-btn:hover {
  background: #FEF2F2;
  color: #DC2626;
}
.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  text-align: center;
  font-weight: 700;
  font-size: 10px;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 0;
}
.calendar-days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  place-items: center;
  margin-top: 4px;
}
.calendar-day-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  border: none;
  background: transparent;
  color: #0F172A;
  cursor: pointer;
  transition: all 0.14s ease;
}
.calendar-day-btn:hover {
  background: #F1F5F9;
  color: #006C7A;
}
.calendar-day-btn.other-month {
  color: #94A3B8;
  opacity: 0.4;
  cursor: not-allowed;
}
.calendar-day-btn.selected {
  background: #006C7A !important;
  color: #FFFFFF !important;
  font-weight: 700;
}
.calendar-day-btn.today:not(.selected) {
  border: 1.5px solid #006C7A;
  color: #006C7A;
  font-weight: 700;
}
"""

CAMAROO_CONTROLLER_CODE = """// ==========================================================
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
        if (/^\\d{4}-\\d{2}-\\d{2}$/.test(val)) {
          const parts = val.split('-');
          this.selectedDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
          this.currentDate = new Date(this.selectedDate);
        } else if (/^\\d{2}\\/\\d{2}\\/\\d{4}$/.test(val)) {
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

          <div class="calendar-presets">
            <button type="button" class="calendar-preset-btn ${isTodayYearMonth && this.selectedDate?.getDate() === today.getDate() ? 'active' : ''}" data-preset="today">Today</button>
            <button type="button" class="calendar-preset-btn" data-preset="yesterday">Yesterday</button>
            <button type="button" class="calendar-preset-btn" data-preset="first-day">1st of Month</button>
            <button type="button" class="calendar-preset-btn clear-btn" data-preset="clear">Clear</button>
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
"""

def update_css():
    css_files = ['css/app.css']
    for cf in css_files:
        if os.path.exists(cf):
            with open(cf, 'r', encoding='utf-8') as f:
                c = f.read()
            if '.custom-select {' not in c:
                with open(cf, 'a', encoding='utf-8') as f:
                    f.write(CAMAROO_CSS)
                print(f"  ✓ Added Camaroo custom-select & calendar CSS to {cf}")
            else:
                print(f"  ℹ CSS already present in {cf}")

def update_html_styles(fp):
    if not os.path.exists(fp):
        return
    with open(fp, 'r', encoding='utf-8') as f:
        c = f.read()
    if '.custom-select {' not in c:
        # inject before </style> or </head>
        if '</style>' in c:
            c = c.replace('</style>', CAMAROO_CSS + '\n</style>', 1)
        elif '</head>' in c:
            c = c.replace('</head>', f'<style>{CAMAROO_CSS}</style>\n</head>', 1)
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(c)
        print(f"  ✓ Injected Camaroo CSS into {fp}")
    else:
        print(f"  ℹ Camaroo CSS already in {fp}")

def update_preprocessing_js(fp):
    print(f"Updating {fp}...")
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Prepend or append CamarooControls definition
    if 'CamarooControls' not in content:
        # Place before `export const PreprocessingView`
        target = "export const PreprocessingView = {"
        if target in content:
            content = content.replace(target, CAMAROO_CONTROLLER_CODE + "\n\n" + target)
            print("  ✓ Added CamarooControls definition before PreprocessingView")
        else:
            content = CAMAROO_CONTROLLER_CODE + "\n\n" + content
            print("  ✓ Prepended CamarooControls definition")
    else:
        print("  ℹ CamarooControls already defined in JS")

    # 2. Hook upgrade call into PreprocessingView.render()
    hook_call = "CamarooControls.upgrade(subContainer);"
    if hook_call not in content:
        # Find where lucide icons are rendered in render()
        anchor = "if (typeof window !== 'undefined' && window.lucide && typeof window.lucide.createIcons === 'function') {"
        if anchor in content:
            replacement = f"CamarooControls.upgrade(subContainer);\n    {anchor}"
            content = content.replace(anchor, replacement, 1)
            print("  ✓ Hooked CamarooControls.upgrade(subContainer) into PreprocessingView.render()")
        else:
            print("  ⚠️ Could not find lucide anchor in render()")
    else:
        print("  ℹ CamarooControls.upgrade already hooked in render()")

    # 3. Hook into modals: openChemPOModal, openChemOrderModal, openChemConsumptionModal, openChemPaymentModal, openHonTransferModal
    modals = [
        ('openChemPOModal', "m.open({"),
        ('openChemOrderModal', "m.open({"),
        ('openChemConsumptionModal', "m.open({"),
        ('openChemPaymentModal', "m.open({"),
        ('openHonTransferModal', "Modal.open({")
    ]
    for fn, marker in modals:
        idx_fn = content.find(fn)
        if idx_fn != -1:
            idx_open = content.find(marker, idx_fn)
            if idx_open != -1:
                # Find the closing of this modal open call or submit listener
                # A clean pattern: setTimeout(() => CamarooControls.upgrade(document.getElementById('erp-modal-root')), 50);
                upgrade_snippet = "\n    setTimeout(() => CamarooControls.upgrade(document.getElementById('erp-modal-root')), 20);"
                if upgrade_snippet not in content[idx_fn:idx_fn+3000]:
                    # inject after m.open({ ... });
                    idx_close_open = content.find('});', idx_open)
                    if idx_close_open != -1:
                        content = content[:idx_close_open+3] + upgrade_snippet + content[idx_close_open+3:]
                        print(f"  ✓ Hooked CamarooControls modal upgrade into {fn}")

    with open(fp, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ Saved {fp}")

def update_standalone_and_miledeep(fp):
    print(f"Syncing to {fp}...")
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Styles
    if '.custom-select {' not in content:
        if '</style>' in content:
            content = content.replace('</style>', CAMAROO_CSS + '\n</style>', 1)
            print(f"  ✓ Added CSS to {fp}")
        elif '</head>' in content:
            content = content.replace('</head>', f'<style>{CAMAROO_CSS}</style>\n</head>', 1)
            print(f"  ✓ Added style tag to {fp}")

    # 2. Controller code
    if 'CamarooControls' not in content:
        # In standalone.html or miledeep-devi-fisheries.html, PreprocessingView definition:
        target = "const PreprocessingView = {" if "const PreprocessingView = {" in content else "export const PreprocessingView = {" if "export const PreprocessingView = {" in content else "var PreprocessingView = {"
        if target in content:
            # We strip 'export ' for inline scripts if needed, but let's see how other components are defined
            script_controller = CAMAROO_CONTROLLER_CODE.replace('export const CamarooControls =', 'const CamarooControls =')
            content = content.replace(target, script_controller + "\n\n" + target, 1)
            print(f"  ✓ Injected CamarooControls into {fp}")

    # 3. Hook into render()
    hook_call = "CamarooControls.upgrade(subContainer);"
    if hook_call not in content:
        anchor = "if (typeof window !== 'undefined' && window.lucide && typeof window.lucide.createIcons === 'function') {"
        # Note: in HTML, PreprocessingView has this anchor
        # Find the occurrence inside PreprocessingView
        idx_pv = content.find('PreprocessingView = {')
        if idx_pv != -1:
            idx_anchor = content.find(anchor, idx_pv)
            if idx_anchor != -1:
                content = content[:idx_anchor] + f"CamarooControls.upgrade(subContainer);\n    " + content[idx_anchor:]
                print(f"  ✓ Hooked CamarooControls into PreprocessingView.render in {fp}")

    with open(fp, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ Saved {fp}")

def main():
    update_css()
    update_html_styles('miledeep-devi-fisheries.html')
    update_preprocessing_js('js/views/preprocessingView.js')
    update_standalone_and_miledeep('standalone.html')
    update_standalone_and_miledeep('miledeep-devi-fisheries.html')

if __name__ == '__main__':
    main()
