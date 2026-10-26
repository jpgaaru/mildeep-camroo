// Purchase Module — Transactions & Bills Submodule
export const purchaseTransactions = {
  renderBills(container) {
    if (activeBillForEdit) {
      this.renderRMBill(container);
      return;
    }

    let fType = '';
    let fPlant = '';
    let fSupplier = '';
    let fAgent = '';
    let fStatus = '';
    let fFrom = '';
    let fTo = '';

    const getFiltered = () => {
      return arrivals.filter(a => {
        const s = billStatus(a);
        return (!fType || a.type === fType) &&
          (!fPlant || a.plant === fPlant) &&
          (!fSupplier || a.supplier === fSupplier) &&
          (!fAgent || a.agent === fAgent) &&
          (!fStatus || s === fStatus) &&
          (!fFrom || a.date >= fFrom) &&
          (!fTo || a.date <= fTo);
      });
    };

    const renderTable = () => {
      const rows = getFiltered();
      const showCompletedActions = (fStatus === 'Completed' && rows.length > 0);
      const pdfBtns = document.getElementById('bills-pdf-btns');
      if (pdfBtns) {
        pdfBtns.style.display = showCompletedActions ? 'flex' : 'none';
      }

      const tb = document.getElementById('tb-bills-body');
      const thChk = document.getElementById('th-bill-chk');
      if (thChk) {
        thChk.style.display = showCompletedActions ? '' : 'none';
      }

      if (!tb) return;

      tb.innerHTML = rows.length ? rows.map((a, i) => {
        const st = billStatus(a);
        const stBadge = st === 'Completed' ? 'bg-[#EAFAF1] text-[#056A38]' :
          st === 'Partial' ? 'bg-[#E0F2FE] text-[#0369A1]' : 'bg-[#FFF9E6] text-[#824D00]';

        return `
          <tr onclick="PurchaseView.openRMBillEdit('${a.no}')" class="hover:bg-[#F0FAFC] transition-colors border-b border-[#F1F5F9] cursor-pointer" title="Click to view RM Bill info">
            ${showCompletedActions ? `<td class="px-3.5 py-3" onclick="event.stopPropagation()"><input type="checkbox" class="bill-row-chk rounded text-[#02a8b5]"></td>` : ''}
            <td class="px-3.5 py-3 font-semibold text-[#64748B]">${i + 1}</td>
            <td class="px-3.5 py-3 font-bold text-[#02a8b5]">${a.no}</td>
            <td class="px-3.5 py-3 text-[#334155]">${a.date}</td>
            <td class="px-3.5 py-3 font-semibold text-[#0F172A]">${a.supplier}</td>
            <td class="px-3.5 py-3 text-[#475569]">${a.agent || '–'}</td>
            <td class="px-3.5 py-3 text-[#334155] font-semibold">${fmt(a.count)}</td>
            <td class="px-3.5 py-3 text-[#0F172A] font-bold">${fmt(a.weight, 2)} KG</td>
            <td class="px-3.5 py-3 text-[#056A38] font-bold">₹${fmt(grossOf(a))}</td>
            <td class="px-3.5 py-3">
              <span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold border border-current ${stBadge}">
                ${st}
              </span>
            </td>
            <td class="px-3.5 py-3" onclick="event.stopPropagation()">
              <div class="flex items-center gap-1.5">
                <button onclick="PurchaseView.openRMBillEdit('${a.no}')" class="p-1 rounded text-[#006644] hover:bg-[#E3FCEF]" title="View & Edit RM Bill">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </button>
                <button onclick="window.Toast.show('Printing bill ${a.no}...', 'info')" class="p-1 rounded text-[#0284C7] hover:bg-[#F0F9FF]" title="Print">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('') : `<tr><td colspan="11" class="text-center py-8 text-xs text-[#94A3B8]">No bills found matching filters</td></tr>`;
    };

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-6 gap-3 items-end text-xs">
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Purchase Type</label>
              <select id="bl-f-type" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.types.map(t => `<option value="${t}">${t}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Plant</label>
              <select id="bl-f-plant" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Supplier</label>
              <select id="bl-f-supplier" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.suppliers.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">From Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="bl-f-from" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">To Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="bl-f-to" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <div class="flex-1">
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Status</label>
                <select id="bl-f-status" class="w-full h-9 px-2 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                  <option value="">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Partial">Partial</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <button id="bl-search-btn" class="h-9 px-4 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold transition-all shadow-xs hover:shadow flex items-center justify-center gap-1 cursor-pointer" style="margin-top: 18px;" title="Filter Bills">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter</span>
              </button>
              <button id="bl-reset-btn" class="h-9 px-3.5 rounded-lg bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold shadow-xs hover:shadow cursor-pointer transition-all" style="margin-top: 18px;" title="Reset Filters">
                ↺
              </button>
            </div>
          </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-4 mb-3 border-b border-[#F1F5F9] flex-wrap gap-3">
            <div id="bills-pdf-btns" class="items-center gap-2" style="display:none;">
              <button onclick="window.Toast.show('Downloading Commission Bills PDF...', 'success')" class="px-3.5 py-1.5 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-xs font-bold text-white shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer transition-all">
                ⬇ Commission Bills PDF
              </button>
              <button onclick="window.Toast.show('Downloading Consolidated Bills PDF...', 'success')" class="px-3.5 py-1.5 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-xs font-bold text-white shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer transition-all">
                ⬇ Bills PDF
              </button>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-[#64748B]">Tip: Tap any transaction row to view respective RM Bill info. Checkboxes & bulk PDF exports appear when <b>Status = Completed</b>.</span>
            </div>
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th id="th-bill-chk" class="px-3.5 py-3" style="display:none;"><input type="checkbox"></th>
                  <th class="px-3.5 py-3">S.No</th>
                  <th class="px-3.5 py-3">Arrival Number</th>
                  <th class="px-3.5 py-3">Arrival Date</th>
                  <th class="px-3.5 py-3">Supplier</th>
                  <th class="px-3.5 py-3">Agent</th>
                  <th class="px-3.5 py-3">Arrival Count</th>
                  <th class="px-3.5 py-3">Arrival Weight</th>
                  <th class="px-3.5 py-3">Total Bill Amount</th>
                  <th class="px-3.5 py-3">Status</th>
                  <th class="px-3.5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody id="tb-bills-body"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('bl-search-btn')?.addEventListener('click', () => {
      fType = document.getElementById('bl-f-type')?.value || '';
      fPlant = document.getElementById('bl-f-plant')?.value || '';
      fSupplier = document.getElementById('bl-f-supplier')?.value || '';
      fStatus = document.getElementById('bl-f-status')?.value || '';
      renderTable();
      Toast.show('Bills register updated.', 'info');
    });

    renderTable();
  },

  // =========================================================================
  // RM BILL (Sub-Screen under Bills Tab)
  // Header frozen from Arrival · editable: Addition/Deduction per KG, Rate, Remarks
  // =========================================================================
  renderRMBill(container) {
    const a = activeBillForEdit || arrivals[0];
    if (!a) {
      container.innerHTML = '<div class="p-6 text-center text-xs text-[#94A3B8]">Select a bill from the Bills table to edit</div>';
      return;
    }

    const calcTotal = () => {
      const rt = parseFloat(document.getElementById('rb-rate')?.value || '0');
      const addDed = parseFloat(document.getElementById('rb-addded')?.value || '0');
      const totalVal = r2((a.weight || 0) * rt + (a.weight || 0) * addDed);
      const totalEl = document.getElementById('rb-total-val');
      if (totalEl) totalEl.textContent = '₹' + fmt(totalVal);
    };

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in max-w-5xl">
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
          <div class="flex items-center justify-between pb-4 border-b border-[#F1F5F9] mb-5">
            <div>
              <h3 class="text-base font-bold text-[#0F172A]">RM Bill Details — ${a.no}</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Header frozen from Arrival · editable: Addition/Deduction per KG, Rate, Remarks</p>
            </div>
            <button id="btn-back-to-bills" class="px-3.5 py-1.5 rounded-lg bg-[#64748B] hover:bg-[#475569] text-xs font-bold text-white shadow-xs hover:shadow cursor-pointer transition-all">
              ← Back to Bills Register
            </button>
          </div>

          <!-- Frozen Header Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-5 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Species</span><p class="font-bold text-[#0F172A] mt-0.5">${a.species}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Purchase Station</span><p class="font-bold text-[#0F172A] mt-0.5">${a.center}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Processing Plant</span><p class="font-bold text-[#0F172A] mt-0.5">${a.plant}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Purchase Type</span><p class="font-bold text-[#0F172A] mt-0.5">${a.type}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Bill / Arrival Number</span><p class="font-bold text-[#02a8b5] mt-0.5">${a.no}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Vehicle Number</span><p class="font-semibold text-[#334155] mt-0.5">${a.vehicle || 'AP39UF7171'}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Driver Name</span><p class="font-semibold text-[#334155] mt-0.5">${a.driver || 'SOMU N'}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Grader Name</span><p class="font-semibold text-[#334155] mt-0.5">${a.grader || 'M.RAO'}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Purchase Date</span><p class="font-semibold text-[#334155] mt-0.5">${a.billDate}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Agent Name</span><p class="font-semibold text-[#334155] mt-0.5">${a.agent || '–'}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Farm Location</span><p class="font-semibold text-[#334155] mt-0.5">${a.farm || a.center}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Supplier Name</span><p class="font-bold text-[#0F172A] mt-0.5">${a.supplier}</p></div>
          </div>

          <!-- Editable Fields -->
          <form id="form-rm-bill-edit" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Addition/Deduction Per KG (₹) <span class="text-[#FF5150]">*</span></label>
                <input id="rb-addded" type="number" step="any" value="${a.addDed || 0}" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
              </div>
              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Remarks</label>
                <input id="rb-remarks" type="text" placeholder="Adjustment notes..." value="${a.remarks || ''}" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
              </div>
            </div>

            <!-- Variety Line Items Grid -->
            <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl mt-4">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                    <th class="px-3.5 py-3">S.No</th>
                    <th class="px-3.5 py-3">Variety</th>
                    <th class="px-3.5 py-3">Count</th>
                    <th class="px-3.5 py-3">Weight (KG)</th>
                    <th class="px-3.5 py-3">Master Rate</th>
                    <th class="px-3.5 py-3">Harvest Com. Rate</th>
                    <th class="px-3.5 py-3">Billing Rate (₹)</th>
                    <th class="px-3.5 py-3">Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-[#F1F5F9]">
                    <td class="px-3.5 py-3 font-semibold text-[#64748B]">1</td>
                    <td class="px-3.5 py-3 font-bold text-[#0F172A]">${a.variety || 'HEAD ON'}</td>
                    <td class="px-3.5 py-3">${a.count}</td>
                    <td class="px-3.5 py-3 font-bold text-[#0F172A]">${fmt(a.weight, 2)}</td>
                    <td class="px-3.5 py-3 text-[#64748B]">₹${fmt(a.rate)}</td>
                    <td class="px-3.5 py-3 text-[#64748B]">₹${fmt(a.harvest || 0)}</td>
                    <td class="px-3.5 py-3">
                      <input id="rb-rate" type="number" step="any" value="${a.rate}" class="w-24 h-8 px-2 rounded border border-[#E2E8F0] font-bold text-[#02a8b5] outline-none focus:border-[#02a8b5]">
                    </td>
                    <td id="rb-total-val" class="px-3.5 py-3 font-bold text-[#056A38]">₹${fmt(grossOf(a))}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
              <button type="button" id="btn-cancel-rm-bill" class="px-5 py-2 rounded-lg bg-[#64748B] hover:bg-[#475569] text-xs font-bold text-white shadow-xs hover:shadow cursor-pointer transition-all">
                Cancel
              </button>
              <button type="submit" class="px-6 py-2 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold shadow-xs cursor-pointer">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    const closeBillHandler = () => {
      activeBillForEdit = null;
      this.renderBills(container);
    };

    document.getElementById('btn-back-to-bills')?.addEventListener('click', closeBillHandler);
    document.getElementById('btn-cancel-rm-bill')?.addEventListener('click', closeBillHandler);

    document.getElementById('rb-rate')?.addEventListener('input', calcTotal);
    document.getElementById('rb-addded')?.addEventListener('input', calcTotal);

    document.getElementById('form-rm-bill-edit')?.addEventListener('submit', e => {
      e.preventDefault();
      a.rate = parseFloat(document.getElementById('rb-rate')?.value || '0');
      a.addDed = parseFloat(document.getElementById('rb-addded')?.value || '0');
      a.remarks = document.getElementById('rb-remarks')?.value || '';

      Toast.show(`RM Bill ${a.no} revised! New Act Bill ₹${fmt(billAmtOf(a))}`, 'success');
      closeBillHandler();
    });
  },

  // =========================================================================
  // SUBMENU 4: PAYMENTS -> TAB 1: PAYMENTS (Client: payments)
  // Act Bill = Gross − TDS(0.1%) · Balance = Act Bill − Already Paid · tick rows to enable Pay
  // =========================================================================

};
