// Purchase Module — Payments Submodule
export const purchasePayments = {
  renderPayments(container) {
    let fCenter = '';
    let fSupplier = '';
    let fAgent = '';
    let fType = '';

    const getFiltered = () => {
      return arrivals.filter(a => {
        return (!fCenter || a.center === fCenter) &&
          (!fSupplier || a.supplier === fSupplier) &&
          (!fAgent || a.agent === fAgent) &&
          (!fType || (fType === 'Final' && !a.billPending) || (fType === 'Interim' && a.billPending));
      });
    };

    const renderTable = () => {
      const rows = getFiltered();
      const tb = document.getElementById('tb-payments-body');
      if (!tb) return;

      tb.innerHTML = rows.length ? rows.map((a, i) => {
        const actBill = billAmtOf(a);
        const paid = paidFor(a.no);
        const bal = balanceOf(a);

        return `
          <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9]">
            <td class="px-3.5 py-3">
              <input type="checkbox" data-bill-no="${a.no}" class="pay-bill-chk rounded text-[#02a8b5]">
            </td>
            <td class="px-3.5 py-3 font-semibold text-[#64748B]">${i + 1}</td>
            <td class="px-3.5 py-3 font-bold text-[#02a8b5]">${a.no}</td>
            <td class="px-3.5 py-3 text-[#334155]">${a.billDate}</td>
            <td class="px-3.5 py-3 text-[#475569]">${a.agent || '–'}</td>
            <td class="px-3.5 py-3 text-[#0F172A] font-bold">₹${fmt(actBill)}</td>
            <td class="px-3.5 py-3 text-[#056A38] font-bold">₹${fmt(paid)}</td>
            <td class="px-3.5 py-3 font-bold text-[#B5152B]">₹${fmt(bal)}</td>
          </tr>
        `;
      }).join('') : `<tr><td colspan="8" class="text-center py-8 text-xs text-[#94A3B8]">No pending bills eligible for payment</td></tr>`;

      updatePayBtnState();
    };

    const updatePayBtnState = () => {
      const checked = document.querySelectorAll('.pay-bill-chk:checked');
      const btn = document.getElementById('btn-action-pay');
      if (btn) {
        btn.disabled = checked.length === 0;
        btn.classList.toggle('opacity-50', checked.length === 0);
        btn.classList.toggle('cursor-not-allowed', checked.length === 0);
      }
    };

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-6 gap-3 items-end text-xs">
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Center</label>
              <select id="pay-f-center" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Supplier</label>
              <select id="pay-f-supplier" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.suppliers.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Agent</label>
              <select id="pay-f-agent" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.agents.map(a => `<option value="${a}">${a}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Payment Type</label>
              <select id="pay-f-type" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                <option value="Interim">Interim</option>
                <option value="Final">Final</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="pay-f-date" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <button id="pay-search-btn" class="flex-1 px-4 py-2 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold transition-all shadow-xs hover:shadow flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
              <button id="pay-reset-btn" class="px-3.5 py-2 rounded-lg bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold shadow-xs hover:shadow cursor-pointer transition-all" title="Reset Filters">
                ↺
              </button>
            </div>
          </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-4 mb-3 border-b border-[#F1F5F9] flex-wrap gap-3">
            <div class="flex items-center gap-2">
              <button id="btn-action-pay" disabled class="px-5 py-2 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 opacity-50 cursor-not-allowed">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                <span>Pay Selected Bills</span>
              </button>
            </div>
            <span class="text-xs text-[#64748B]">Act Bill = Gross − TDS (0.1%) · Select rows to activate payment disbursal</span>
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th class="px-3.5 py-3"><input type="checkbox" id="chk-pay-all"></th>
                  <th class="px-3.5 py-3">S No</th>
                  <th class="px-3.5 py-3">Bill No</th>
                  <th class="px-3.5 py-3">Bill Dates</th>
                  <th class="px-3.5 py-3">Agent</th>
                  <th class="px-3.5 py-3">Act Bill</th>
                  <th class="px-3.5 py-3">Already Paid</th>
                  <th class="px-3.5 py-3">Balance</th>
                </tr>
              </thead>
              <tbody id="tb-payments-body"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('pay-search-btn')?.addEventListener('click', () => {
      fCenter = document.getElementById('pay-f-center')?.value || '';
      fSupplier = document.getElementById('pay-f-supplier')?.value || '';
      fAgent = document.getElementById('pay-f-agent')?.value || '';
      fType = document.getElementById('pay-f-type')?.value || '';
      renderTable();
      Toast.show('Payment records filtered.', 'info');
    });

    document.getElementById('chk-pay-all')?.addEventListener('change', e => {
      document.querySelectorAll('.pay-bill-chk').forEach(c => c.checked = e.target.checked);
      updatePayBtnState();
    });

    document.getElementById('tb-payments-body')?.addEventListener('change', e => {
      if (e.target.classList.contains('pay-bill-chk')) {
        updatePayBtnState();
      }
    });

    document.getElementById('btn-action-pay')?.addEventListener('click', () => {
      const checkedBoxes = [...document.querySelectorAll('.pay-bill-chk:checked')];
      const selected = checkedBoxes.map(cb => arrivals.find(a => a.no === cb.dataset.billNo)).filter(Boolean);
      if (selected.length) {
        PurchaseView.openPayModal(selected);
      }
    });

    renderTable();
  },

  // =========================================================================
  // SUBMENU 4: PAYMENTS -> TAB 2: PAYMENTS SUMMARY (Client: psummary)
  // One row per voucher · Amount = cash-out paid through that voucher
  // =========================================================================
  renderPaymentSummary(container) {
    let fCenter = '';
    let fSupplier = '';
    let fAgent = '';
    let fMode = '';

    const getFiltered = () => {
      return payments.filter(py => {
        return (!fCenter || py.center === fCenter) &&
          (!fAgent || py.agent === fAgent) &&
          (!fMode || py.mode === fMode) &&
          (!fSupplier || py.lines.some(l => {
            const a = arrivals.find(x => x.no === l.no);
            return a && a.supplier === fSupplier;
          }));
      });
    };

    const renderTable = () => {
      const rows = getFiltered();
      const tb = document.getElementById('tb-psummary-body');
      if (!tb) return;

      tb.innerHTML = rows.length ? rows.map((py, i) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9]">
          <td class="px-3.5 py-3 text-[#64748B] font-semibold">${i + 1}</td>
          <td class="px-3.5 py-3 text-[#334155]">${py.date}</td>
          <td class="px-3.5 py-3 text-[#334155] font-semibold">${py.center}</td>
          <td class="px-3.5 py-3 text-[#475569]">${py.agent || '–'}</td>
          <td class="px-3.5 py-3 font-semibold text-[#0F172A]">${py.mode}</td>
          <td class="px-3.5 py-3 font-bold text-[#02a8b5]">${py.voucher}</td>
          <td class="px-3.5 py-3 text-[#475569]">${py.lines.map(l => l.no).join(', ')}</td>
          <td class="px-3.5 py-3 font-bold text-[#056A38]">₹${fmt(py.total)}</td>
          <td class="px-3.5 py-3">
            <div class="flex items-center gap-1.5">
              <button onclick="window.Toast.show('Voucher ${py.voucher} details loaded', 'info')" class="p-1 rounded text-[#0284C7] hover:bg-[#F0F9FF]" title="View">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
              <button onclick="if(confirm('Delete voucher ${py.voucher}? Balances will be restored!')){ payments = payments.filter(p => p.voucher !== '${py.voucher}'); if (window.Environment) window.Environment.setStore('payments', payments); PurchaseView.renderPaymentSummary(document.getElementById('purchase-subpage-content')); Toast.show('Voucher deleted and balances restored', 'error'); }" class="p-1 rounded text-[#FF5150] hover:bg-[#FEF2F2]" title="Delete">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('') : `<tr><td colspan="9" class="text-center py-8 text-xs text-[#94A3B8]">No payment vouchers recorded</td></tr>`;
    };

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-6 gap-3 items-end text-xs">
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Center</label>
              <select id="ps-f-center" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Supplier</label>
              <select id="ps-f-supplier" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.suppliers.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Payment Mode</label>
              <select id="ps-f-mode" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="NEFT">NEFT</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">From Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="ps-f-from" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">To Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="ps-f-to" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <button id="ps-search-btn" class="flex-1 px-4 py-2 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold transition-all shadow-xs hover:shadow flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter</span>
              </button>
              <button id="ps-reset-btn" class="px-3.5 py-2 rounded-lg bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold shadow-xs hover:shadow cursor-pointer transition-all" title="Reset Filters">
                ↺
              </button>
            </div>
          </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-4 mb-3 border-b border-[#F1F5F9] flex-wrap gap-3">
            <h3 class="text-sm font-bold text-[#0F172A]">Payment Vouchers Audit Register</h3>
            <button onclick="window.Toast.show('Exporting Payment Summary...', 'info')" class="px-3.5 py-1.5 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-xs font-bold text-white shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer transition-all">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              <span>Download Excel</span>
            </button>
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th class="px-3.5 py-3">S.No</th>
                  <th class="px-3.5 py-3">Pay Date</th>
                  <th class="px-3.5 py-3">Center</th>
                  <th class="px-3.5 py-3">Agent</th>
                  <th class="px-3.5 py-3">Mode</th>
                  <th class="px-3.5 py-3">Voucher</th>
                  <th class="px-3.5 py-3">Bills Covered</th>
                  <th class="px-3.5 py-3">Amount</th>
                  <th class="px-3.5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody id="tb-psummary-body"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('ps-search-btn')?.addEventListener('click', () => {
      fCenter = document.getElementById('ps-f-center')?.value || '';
      fSupplier = document.getElementById('ps-f-supplier')?.value || '';
      fAgent = document.getElementById('ps-f-agent')?.value || '';
      fMode = document.getElementById('ps-f-mode')?.value || '';
      renderTable();
      Toast.show('Payment Summary filtered.', 'info');
    });

    renderTable();
  },

  // =========================================================================

};
