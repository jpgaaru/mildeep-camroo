// Purchase Module — Modals Submodule (Standardized Sizes & Form Grids)
export const purchaseModals = {
  // MODALS & HELPERS
  // =========================================================================
  openSupplierModal() {
    Modal.open({
      title: 'Create New Supplier (Financier)',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Supplier Name <span class="text-[#FF5150]">*</span></label>
            <input id="modal-sp-name" type="text" placeholder="e.g. BALAJI AQUA FARMS" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Vendor Code / GSTIN</label>
            <input id="modal-sp-code" type="text" placeholder="e.g. 37AABCB1234F1Z1" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Phone</label>
            <input id="modal-sp-phone" type="text" placeholder="+91 98480 12345" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Address</label>
            <textarea id="modal-sp-addr" rows="2" placeholder="Center locality..." class="w-full p-2.5 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]"></textarea>
          </div>
        </div>
      `,
      confirmText: 'Save Supplier',
      onConfirm: () => {
        const name = document.getElementById('modal-sp-name')?.value.trim();
        const code = document.getElementById('modal-sp-code')?.value.trim();
        if (!name) {
          Toast.show('Supplier name is required', 'error');
          return false;
        }
        const full = code ? `${name}-${code}` : name;
        M.suppliers.push(full);
        Toast.show(`Supplier "${name}" added to masters!`, 'success');
        return true;
      }
    });
  },

  openPayModal(selectedBills) {
    if (!selectedBills || !selectedBills.length) return;
    const center = selectedBills[0]?.center || 'ADDARIPETA FARMS';
    const initialMode = 'Cash';
    const prefix = 'C' + cCode(center);
    const voucherNo = prefix + String(payments.filter(p => p.voucher.startsWith(prefix)).length + 1).padStart(2, '0');

    let rowsHtml = selectedBills.map(a => {
      const g = grossOf(a);
      const t = tdsOf(a);
      const ba = billAmtOf(a);
      const pd = paidFor(a.no);
      const bal = r2(ba - pd);

      return `
        <tr data-bill-no="${a.no}" class="border-b border-[#F1F5F9]">
          <td class="px-3 py-2 font-bold text-[#02a8b5]">${a.no}</td>
          <td class="px-3 py-2 text-[#475569]">${a.billDate}</td>
          <td class="px-3 py-2 text-[#0F172A] font-semibold">${a.supplier}</td>
          <td class="px-3 py-2 text-[#334155]">₹${fmt(g)}</td>
          <td class="px-3 py-2 text-[#FF5150]">₹${fmt(t)}</td>
          <td class="px-3 py-2 font-bold text-[#0F172A]">₹${fmt(ba)}</td>
          <td class="px-3 py-2 text-[#056A38]">₹${fmt(pd)}</td>
          <td class="px-3 py-2 font-bold text-[#B5152B]">₹${fmt(bal)}</td>
          <td class="px-3 py-2">
            <input type="number" step="any" data-max-bal="${bal}" value="${bal}" class="modal-pay-input w-24 h-8 px-2 rounded border border-[#E2E8F0] font-bold text-[#02a8b5] outline-none">
          </td>
          <td class="modal-pay-rem px-3 py-2 font-semibold text-[#64748B]">₹0.00</td>
        </tr>
      `;
    }).join('');

    Modal.open({
      size: '5xl',
      title: `Bill Payment Settlement Mode — ${TODAY}`,
      content: `
        <div class="space-y-4 text-xs">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Payment Mode</label>
              <select id="modal-pay-mode" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-bold text-[#0F172A] outline-none">
                <option value="Cash" selected>Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="NEFT">NEFT</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Voucher Number</label>
              <input id="modal-pay-voucher" readonly value="${voucherNo}" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] font-bold text-[#02a8b5]">
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Cheque / NEFT Ref No</label>
              <input id="modal-pay-ref" placeholder="UTR or Cheque No" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none">
            </div>
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl max-h-60">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th class="px-3 py-2.5">Bill No</th>
                  <th class="px-3 py-2.5">Bill Date</th>
                  <th class="px-3 py-2.5">Supplier</th>
                  <th class="px-3 py-2.5">Gross</th>
                  <th class="px-3 py-2.5">TDS (0.1%)</th>
                  <th class="px-3 py-2.5">Bill Amt</th>
                  <th class="px-3 py-2.5">Paid</th>
                  <th class="px-3 py-2.5">Balance</th>
                  <th class="px-3 py-2.5">Amount (₹)</th>
                  <th class="px-3 py-2.5">Remainings</th>
                </tr>
              </thead>
              <tbody>${rowsHtml}</tbody>
            </table>
          </div>

          <div>
            <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Payment Comments</label>
            <input id="modal-pay-comments" placeholder="Settlement notes..." class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none">
          </div>
        </div>
      `,
      confirmText: 'Save Payment Voucher',
      onConfirm: () => {
        const mode = document.getElementById('modal-pay-mode')?.value || 'Cash';
        const ref = document.getElementById('modal-pay-ref')?.value.trim() || '';
        const voucher = document.getElementById('modal-pay-voucher')?.value || voucherNo;
        const comments = document.getElementById('modal-pay-comments')?.value.trim() || '';

        if (mode !== 'Cash' && ref.length < 5) {
          Toast.show('Please enter a valid Cheque / NEFT reference number (min 5 chars)', 'error');
          return false;
        }

        const lines = [];
        document.querySelectorAll('.modal-pay-input').forEach(inp => {
          const amt = parseFloat(inp.value || '0');
          const tr = inp.closest('tr');
          const no = tr.dataset.billNo;
          if (amt > 0) {
            lines.push({ no, amount: amt });
          }
        });

        if (!lines.length) {
          Toast.show('Payment amount cannot be zero', 'error');
          return false;
        }

        const totalPaid = r2(lines.reduce((s, l) => s + l.amount, 0));
        payments.push({
          voucher,
          mode,
          date: TODAY,
          center,
          agent: selectedBills[0]?.agent || '',
          cheque: ref,
          comments,
          lines,
          total: totalPaid
        });
        Environment.setStore('payments', payments);

        Toast.show(`Payment saved! Voucher ${voucher} created for ₹${fmt(totalPaid)}`, 'success');
        PurchaseView.renderPayments(document.getElementById('purchase-subpage-content'));
        return true;
      }
    });

    // Handle dynamic live remainings calculation
    document.querySelectorAll('.modal-pay-input').forEach(inp => {
      inp.addEventListener('input', () => {
        const tr = inp.closest('tr');
        const maxBal = parseFloat(inp.dataset.maxBal || '0');
        let amt = parseFloat(inp.value || '0');
        if (amt > maxBal) {
          amt = maxBal;
          inp.value = maxBal;
        }
        const rem = r2(maxBal - amt);
        const remEl = tr.querySelector('.modal-pay-rem');
        if (remEl) remEl.textContent = '₹' + fmt(rem);
      });
    });
  },

  openCreateArrivalModal() {
    const center = 'ADDARIPETA FARMS';
    const arrivalNo = nextArrivalNo(center);

    Modal.open({
      title: 'Create Inward Arrival Receipt',
      size: '4xl',
      content: `
        <div class="space-y-4 text-xs">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Center Name <span class="text-[#FF5150]">*</span></label>
              <select id="ma-center" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none">
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Plant <span class="text-[#FF5150]">*</span></label>
              <select id="ma-plant" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none">
                ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Number <span class="text-[#FF5150]">*</span></label>
              <input id="ma-no" value="${arrivalNo}" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-bold text-[#02a8b5]">
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Date <span class="text-[#FF5150]">*</span></label>
              <div class="erp-date-wrapper">
                <input id="ma-date" type="text" value="${TODAY}" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none">
              </div>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Bill Date <span class="text-[#FF5150]">*</span></label>
              <div class="erp-date-wrapper">
                <input id="ma-billdate" type="text" value="${TODAY}" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none">
              </div>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Species <span class="text-[#FF5150]">*</span></label>
              <select id="ma-species" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none">
                ${M.species.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Supplier <span class="text-[#FF5150]">*</span></label>
              <select id="ma-supplier" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none">
                ${M.suppliers.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Weight (KG) <span class="text-[#FF5150]">*</span></label>
              <input id="ma-weight" type="number" step="any" placeholder="1000" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none">
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Rate (₹) <span class="text-[#FF5150]">*</span></label>
              <input id="ma-rate" type="number" step="any" placeholder="200" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none">
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Count</label>
              <input id="ma-count" type="number" step="any" placeholder="50" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none">
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Purchase Type</label>
              <select id="ma-type" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none">
                ${M.types.map(t => `<option value="${t}">${t}</option>`).join('')}
              </select>
            </div>
          </div>
        </div>
      `,
      confirmText: 'Save Arrival Record',
      onConfirm: () => {
        const no = document.getElementById('ma-no')?.value.trim();
        const weight = parseFloat(document.getElementById('ma-weight')?.value || '0');
        const rate = parseFloat(document.getElementById('ma-rate')?.value || '0');
        if (!no || !weight || !rate) {
          Toast.show('Please fill required arrival fields', 'error');
          return false;
        }

        const newArr = {
          id: Date.now(),
          no,
          billDate: TODAY,
          date: TODAY,
          center: document.getElementById('ma-center')?.value || center,
          plant: document.getElementById('ma-plant')?.value || 'DFL UNIT-2 (KKD)',
          type: document.getElementById('ma-type')?.value || 'Site Weightment',
          supplier: document.getElementById('ma-supplier')?.value || M.suppliers[0],
          grader: '',
          agent: '',
          species: document.getElementById('ma-species')?.value || 'COD',
          variety: 'HEAD ON',
          count: parseFloat(document.getElementById('ma-count')?.value || '50'),
          weight,
          rate,
          harvest: 0,
          addDed: 0,
          abStatus: 'Test Pending',
          dehead: 0,
          grading: 0,
          va: 0,
          soaking: 0,
          packed: 0,
          billPending: true,
          border: false,
          returned: false,
          farm: document.getElementById('ma-center')?.value || center,
          supervisor: '',
          driver: '',
          vehicle: ''
        };

        arrivals.unshift(newArr);
        Environment.setStore('arrivals', arrivals);
        Toast.show(`Arrival receipt ${no} registered!`, 'success');
        PurchaseView.renderArrivals(document.getElementById('purchase-subpage-content'));
        return true;
      }
    });
  },

  showLotTraceabilityDrawer(lot) {
    Toast.show(`Lot traceability drawer opened for ${lot.lotNumber || lot.no || 'Lot'}`, 'info');
  }

};
