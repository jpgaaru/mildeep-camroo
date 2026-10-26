#!/usr/bin/env python3
"""
Implements:
1. Replaces inline table inputs in Grading Track ID (and Deheading Track ID) with clean text cells
2. Wires popup modals for editing across all Pre-Processing tables (Grading Track ID, Deheading Track ID, Deheading, Grading, Value Addition)
3. Adds year navigation buttons (<< and >>) to Calendar Dropdown to go back/forward year
4. Removes presets row (Today, Yesterday, 1st of Month, Clear) from Calendar Dropdown
Symmetrically updates js/views/preprocessingView.js, standalone.html, and miledeep-devi-fisheries.html
"""

import os
import re

# 1. Update Calendar in CamarooControls
OLD_CAL_RENDER = """      this.popover.innerHTML = `
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
      });"""

NEW_CAL_RENDER = """      this.popover.innerHTML = `
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
      });"""

NEW_MODAL_METHODS = """
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
"""

# New Grading Track ID Table Rows rendering clean text instead of input fields
NEW_GRADING_TRACK_ROWS = """      tbody.innerHTML = filtered.map((r, idx) => `
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
      });"""

# New Deheading Track ID Actions column with Edit button
OLD_DHT_ROW = """          <td class="py-2.5 px-3 text-center">
            <button type="button" data-del-id="${r.id}" class="dht-del p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer" title="Delete Entry">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </td>"""

NEW_DHT_ROW = """          <td class="py-2.5 px-3 text-center">
            <div class="flex items-center justify-center gap-1.5">
              <button type="button" data-edit-id="${r.id}" class="dht-edit p-1 text-[#02a8b5] hover:text-[#008f9a] hover:bg-[#F0FDFA] rounded cursor-pointer" title="Edit Entry">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>
              <button type="button" data-del-id="${r.id}" class="dht-del p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer" title="Delete Entry">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>"""

def process_file(fp):
    print(f"Processing {fp}...")
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Calendar in CamarooControls
    if OLD_CAL_RENDER in content:
        content = content.replace(OLD_CAL_RENDER, NEW_CAL_RENDER)
        print("  ✓ Updated Calendar popover: added year navigation (<< and >>), removed presets row")
    else:
        print("  ℹ Trying flexible calendar update")
        # In case indentation differs
        idx_cal = content.find("this.popover.innerHTML = `")
        if idx_cal != -1:
            idx_cal_end = content.find("this.popover.querySelectorAll('[data-calendar-day]')", idx_cal)
            if idx_cal_end != -1:
                # replace from idx_cal to idx_cal_end
                content = content[:idx_cal] + NEW_CAL_RENDER + "\n\n      " + content[idx_cal_end:]
                print("  ✓ Replaced calendar render block via offset")

    # 2. Add Modal Methods to PreprocessingView if not present
    if 'openGradingTrackLineModal' not in content:
        # Place before `export const PreprocessingView` or inside PreprocessingView
        target = "openChemPOModal(editItem = null) {"
        if target in content:
            content = content.replace(target, NEW_MODAL_METHODS + "\n  " + target, 1)
            print("  ✓ Added openGradingTrackLineModal, openDeheadingTrackidModal, openDeheadingModal, openGradingModal, openValueAdditionModal")
        else:
            print("  ⚠️ Could not find openChemPOModal target")

    # 3. Clean up Grading Track ID table rows (replace inline inputs with clean text and popup edit)
    start_gr_rows = 'tbody.innerHTML = filtered.map((r, idx) => `'
    end_gr_rows = "tbody.querySelectorAll('.gt-save-row')"
    idx_gr_start = content.find(start_gr_rows)
    # Note: there might be multiple tbody.innerHTML = filtered.map, find the one with gt-inline
    idx_gt_inline = content.find("gt-inline")
    if idx_gt_inline != -1:
        idx_map_before = content.rfind("tbody.innerHTML = filtered.map", 0, idx_gt_inline)
        idx_save_row = content.find("tbody.querySelectorAll('.gt-save-row')", idx_gt_inline)
        if idx_map_before != -1 and idx_save_row != -1:
            # find end of gt-del-row listener
            idx_del_end = content.find("renderGrid();", idx_save_row)
            if idx_del_end != -1:
                replacement = NEW_GRADING_TRACK_ROWS + "\n\n      tbody.querySelectorAll('.gt-del-row').forEach(btn => {\n        btn.addEventListener('click', () => {\n          const id = btn.getAttribute('data-del-id');\n          if (confirm('Delete this grading size line?')) {\n            this.gradingTrackLines = this.gradingTrackLines.filter(x => x.id !== id);\n            renderGrid(searchInput?.value || '');\n            if (window.Toast) window.Toast.show('Grading size line deleted', 'info');\n          }\n        });\n      });\n    };\n\n    "
                content = content[:idx_map_before] + replacement + content[idx_del_end:]
                print("  ✓ Converted Grading Track ID table from inline inputs to clean text with edit popup modal")

    # 4. Update + Add Line in Grading Track ID to open modal
    old_add_line = "addLineBtn?.addEventListener('click', () => {"
    idx_add_line = content.find(old_add_line)
    if idx_add_line != -1:
        idx_add_end = content.find("deleteBtn?.addEventListener", idx_add_line)
        if idx_add_end != -1:
            new_add_block = """addLineBtn?.addEventListener('click', () => {
      this.openGradingTrackLineModal(null);
    });

    """
            content = content[:idx_add_line] + new_add_block + content[idx_add_end:]
            print("  ✓ Connected + Add Line button to openGradingTrackLineModal")

    # 5. Update Deheading Track ID table rows with Edit button
    if OLD_DHT_ROW in content:
        content = content.replace(OLD_DHT_ROW, NEW_DHT_ROW)
        print("  ✓ Added Edit button to Deheading Track ID table")

        # add edit listener
        dht_del_listener = "tbody.querySelectorAll('.dht-del').forEach(btn => {"
        idx_dht_del = content.find(dht_del_listener)
        if idx_dht_del != -1:
            new_dht_listeners = """tbody.querySelectorAll('.dht-edit').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-edit-id');
          const rec = this.deheadingTrackidList.find(x => x.id === id);
          if (rec) this.openDeheadingTrackidModal(rec);
        });
      });

      """ + dht_del_listener
            content = content[:idx_dht_del] + new_dht_listeners + content[idx_dht_del + len(dht_del_listener):]
            print("  ✓ Attached dht-edit listener to openDeheadingTrackidModal")

    # 6. Update Deheading edit button to open modal instead of scrolling
    old_dh_edit_hook = "tbody.querySelectorAll('.dh-row-edit').forEach(btn => {"
    idx_dh_edit = content.find(old_dh_edit_hook)
    if idx_dh_edit != -1:
        idx_dh_del = content.find("tbody.querySelectorAll('.dh-row-del')", idx_dh_edit)
        if idx_dh_del != -1:
            new_dh_edit_block = """tbody.querySelectorAll('.dh-row-edit').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-edit-id');
          const rec = this.deheadingLogsList.find(x => x.id === id);
          if (rec) this.openDeheadingModal(rec);
        });
      });

      """
            content = content[:idx_dh_edit] + new_dh_edit_block + content[idx_dh_del:]
            print("  ✓ Updated Deheading table Edit button to openDeheadingModal popup")

    # 7. Update Grading edit button to open modal instead of scrolling
    old_gr_edit_hook = "tbody.querySelectorAll('.gr-row-edit').forEach(btn => {"
    idx_gr_edit = content.find(old_gr_edit_hook)
    if idx_gr_edit != -1:
        idx_gr_del = content.find("tbody.querySelectorAll('.gr-row-del')", idx_gr_edit)
        if idx_gr_del != -1:
            new_gr_edit_block = """tbody.querySelectorAll('.gr-row-edit').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-edit-id');
          const rec = this.gradingLogsList.find(x => x.id === id);
          if (rec) this.openGradingModal(rec);
        });
      });

      """
            content = content[:idx_gr_edit] + new_gr_edit_block + content[idx_gr_del:]
            print("  ✓ Updated Grading table Edit button to openGradingModal popup")

    # 8. Update Value Addition edit button to open modal
    old_va_edit = "tbody.querySelectorAll('.va-del').forEach"
    idx_va_del = content.find(old_va_edit)
    if idx_va_del != -1:
        va_edit_listener = """tbody.querySelectorAll('.va-edit').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-edit-id');
          const rec = this.valueAdditionList.find(x => x.id === id);
          if (rec) this.openValueAdditionModal(rec);
        });
      });

      """
        if "tbody.querySelectorAll('.va-edit')" not in content:
            content = content[:idx_va_del] + va_edit_listener + content[idx_va_del:]
            print("  ✓ Attached va-edit listener to openValueAdditionModal popup")

    with open(fp, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ Saved {fp}")

def main():
    files = [
        'js/views/preprocessingView.js',
        'standalone.html',
        'miledeep-devi-fisheries.html'
    ]
    for fp in files:
        if os.path.exists(fp):
            process_file(fp)

if __name__ == '__main__':
    main()
