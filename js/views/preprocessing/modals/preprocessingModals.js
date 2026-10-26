// Pre-processing Module — Table Edit Modals (Standardized Sizes & Form Grids)
export const preprocessingModals = {
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
      size: '4xl',
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
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg><span>Save Line</span></button>
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
      size: '4xl',
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
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg><span>Save Record</span></button>
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
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg><span>Save Log</span></button>
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
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg><span>Save Run Log</span></button>
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
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg><span>Save Batch</span></button>
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
      size: '6xl',
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
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg><span>Save PO</span></button>
          </div>
        </form>
      `
    });
    setTimeout(() => {
      if (window.CamarooControls) window.CamarooControls.upgrade(document.getElementById('erp-modal-root'));
    }, 20);

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
      size: '4xl',
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
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg><span>Save Order</span></button>
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
      size: '4xl',
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
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg><span>Save Consumption</span></button>
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
      size: '4xl',
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
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" class="px-5 py-2 bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg><span>Save Payment</span></button>
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
