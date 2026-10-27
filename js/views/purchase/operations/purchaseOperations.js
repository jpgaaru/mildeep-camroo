// Purchase Module — Operations Submodule
export const purchaseOperations = {
  renderBookings(container) {
    if (isCreatingBooking) {
      this.renderCreateBooking(container);
      return;
    }

    let fType = '';
    let fPlant = '';
    let fDate = '';

    const getFiltered = () => {
      return bookings.filter(b => {
        return (!fType || b.type === fType) &&
          (!fPlant || b.plant === fPlant) &&
          (!fDate || b.date === fDate);
      });
    };

    const renderRows = () => {
      const rows = getFiltered();
      const tb = document.getElementById('tb-bookings-body');
      if (!tb) return;

      tb.innerHTML = rows.length ? rows.map((b, i) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9]">
          <td class="px-3.5 py-3 text-[#64748B] font-semibold">${i + 1}</td>
          <td class="px-3.5 py-3 font-semibold text-[#0F172A]">${b.species}</td>
          <td class="px-3.5 py-3 font-bold text-[#02a8b5]">${b.no}</td>
          <td class="px-3.5 py-3 text-[#334155]">${b.date}</td>
          <td class="px-3.5 py-3 text-[#475569]">${b.type}</td>
          <td class="px-3.5 py-3 text-[#475569]">${b.grader || '–'}</td>
          <td class="px-3.5 py-3 text-[#475569]">${b.agent || '–'}</td>
          <td class="px-3.5 py-3 text-[#334155] font-semibold">${b.count}</td>
          <td class="px-3.5 py-3 text-[#0F172A] font-bold">${fmt(b.weight, 2)} KG</td>
          <td class="px-3.5 py-3 text-[#056A38] font-bold">₹${fmt(b.rate)}</td>
          <td class="px-3.5 py-3">
            <div class="flex items-center gap-1.5">
              <button onclick="window.Toast.show('Booking details: ${b.no} at ${b.station}', 'info')" class="p-1 rounded text-[#0284C7] hover:bg-[#F0F9FF]" title="View">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
              <button onclick="if(confirm('Delete booking ${b.no}?')){ bookings = bookings.filter(x => x.no !== '${b.no}'); if (window.Environment) window.Environment.setStore('bookings', bookings); PurchaseView.renderBookings(document.getElementById('purchase-subpage-content')); Toast.show('Booking deleted', 'error'); }" class="p-1 rounded text-[#FF5150] hover:bg-[#FEF2F2]" title="Delete">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('') : `<tr><td colspan="11" class="text-center py-8 text-xs text-[#94A3B8]">No bookings recorded</td></tr>`;
    };

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Select Purchase Type</label>
              <select id="bk-f-type" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.types.map(t => `<option value="${t}">${t}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Select Arrival Plant</label>
              <select id="bk-f-plant" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="bk-f-date" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <button id="bk-search-btn" class="flex-1 px-4 py-2 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold transition-all shadow-xs hover:shadow flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
              <button id="bk-reset-btn" class="px-3.5 py-2 rounded-lg bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold shadow-xs hover:shadow cursor-pointer transition-all" title="Reset Filters">
                ↺
              </button>
            </div>
          </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-4 mb-3 border-b border-[#F1F5F9] flex-wrap gap-3">
            <div class="flex items-center gap-2.5">
              <button id="btn-open-create-booking" class="px-4 py-2 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold transition-all shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                <span>New Booking</span>
              </button>
            </div>
            <input id="bk-search-input" type="text" placeholder="Search Bookings..." class="w-64 h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs outline-none focus:border-[#02a8b5]">
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th class="px-3.5 py-3">S.No</th>
                  <th class="px-3.5 py-3">Species</th>
                  <th class="px-3.5 py-3">Booking Number</th>
                  <th class="px-3.5 py-3">Booking Date</th>
                  <th class="px-3.5 py-3">PurchaseType</th>
                  <th class="px-3.5 py-3">Grader</th>
                  <th class="px-3.5 py-3">Agent</th>
                  <th class="px-3.5 py-3">Booking Count</th>
                  <th class="px-3.5 py-3">Booking Weight</th>
                  <th class="px-3.5 py-3">Booking Rate</th>
                  <th class="px-3.5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody id="tb-bookings-body"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-open-create-booking')?.addEventListener('click', () => {
      isCreatingBooking = true;
      this.renderBookings(container);
    });

    document.getElementById('bk-search-btn')?.addEventListener('click', () => {
      fType = document.getElementById('bk-f-type')?.value || '';
      fPlant = document.getElementById('bk-f-plant')?.value || '';
      fDate = document.getElementById('bk-f-date')?.value || '';
      renderRows();
      Toast.show('Bookings filtered.', 'info');
    });

    document.getElementById('bk-f-date')?.addEventListener('change', () => {
      fDate = document.getElementById('bk-f-date')?.value || '';
      renderRows();
    });

    document.getElementById('bk-reset-btn')?.addEventListener('click', () => {
      if (document.getElementById('bk-f-type')) document.getElementById('bk-f-type').value = '';
      if (document.getElementById('bk-f-plant')) document.getElementById('bk-f-plant').value = '';
      if (document.getElementById('bk-f-date')) document.getElementById('bk-f-date').value = '';
      fType = ''; fPlant = ''; fDate = '';
      renderRows();
      Toast.show('Filters reset.', 'info');
    });

    document.getElementById('bk-search-input')?.addEventListener('input', e => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('#tb-bookings-body tr').forEach(tr => {
        tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });

    renderRows();
  },

  // =========================================================================
  // CREATE BOOKING (Sub-Screen under Bookings Tab)
  // =========================================================================
  renderCreateBooking(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in max-w-5xl">
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
          <div class="flex items-center justify-between pb-4 border-b border-[#F1F5F9] mb-5">
            <div>
              <h3 class="text-base font-bold text-[#0F172A]">Create Procurement Booking</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Booking Number manual (⟳ Auto available) with uniqueness check · Vehicle/Driver/Grader = free text with master suggestions</p>
            </div>
            <button id="btn-back-to-bookings" class="px-3.5 py-1.5 rounded-lg bg-[#64748B] hover:bg-[#475569] text-xs font-bold text-white shadow-xs hover:shadow cursor-pointer transition-all">
              ← Back to Bookings List
            </button>
          </div>

          <form id="form-create-booking" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Booking Station <span class="text-[#FF5150]">*</span></label>
                <select id="cb-station" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none focus:border-[#02a8b5]">
                  <option value="">Select Center</option>
                  ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                </select>
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Species <span class="text-[#FF5150]">*</span></label>
                <select id="cb-species" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none focus:border-[#02a8b5]">
                  <option value="">Select Species</option>
                  ${M.species.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Purchase Type <span class="text-[#FF5150]">*</span></label>
                <select id="cb-type" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none focus:border-[#02a8b5]">
                  <option value="">Select Type</option>
                  ${M.types.map(t => `<option value="${t}">${t}</option>`).join('')}
                </select>
              </div>

              <div>
                <div class="flex justify-between items-center mb-1">
                  <label class="font-bold text-[#475569] uppercase tracking-wider">Booking Number <span class="text-[#FF5150]">*</span></label>
                  <button type="button" id="btn-auto-booking-no" class="px-2 py-0.5 rounded bg-[#02a8b5] hover:bg-[#008f9a] text-white text-[11px] font-bold shadow-xs transition-all cursor-pointer">⟳ Auto</button>
                </div>
                <input id="cb-no" type="text" required placeholder="BK/XXX/2627/0001" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] outline-none focus:border-[#02a8b5]">
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Vehicle Number <span class="text-[#FF5150]">*</span></label>
                <input id="cb-vehicle" list="dl-vehicles" required placeholder="e.g. AP05TM2628" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
                <datalist id="dl-vehicles">${M.vehicles.map(v => `<option value="${v}">`).join('')}</datalist>
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Driver Name <span class="text-[#FF5150]">*</span></label>
                <input id="cb-driver" list="dl-drivers" required placeholder="e.g. RAMU K" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
                <datalist id="dl-drivers">${M.drivers.map(d => `<option value="${d}">`).join('')}</datalist>
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Grader Name <span class="text-[#FF5150]">*</span></label>
                <input id="cb-grader" list="dl-graders" required placeholder="e.g. K.PRASAD" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
                <datalist id="dl-graders">${M.graders.map(g => `<option value="${g}">`).join('')}</datalist>
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Booking Date <span class="text-[#FF5150]">*</span></label>
                <div class="erp-date-wrapper">
                  <input id="cb-date" type="text" required value="${TODAY}" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
                </div>
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Agent Name</label>
                <select id="cb-agent" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
                  <option value="">Select Agent</option>
                  ${M.agents.map(a => `<option value="${a}">${a}</option>`).join('')}
                </select>
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Farm Location <span class="text-[#FF5150]">*</span></label>
                <input id="cb-farm" type="text" required placeholder="Pond / Village details" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
              </div>

              <div class="col-span-2">
                <div class="flex justify-between items-center mb-1">
                  <label class="font-bold text-[#475569] uppercase tracking-wider">Suppliers <span class="text-[#FF5150]">*</span></label>
                  <button type="button" id="btn-new-supplier" class="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#02a8b5] hover:bg-[#008f9a] text-white shadow-xs cursor-pointer transition-all">New Supplier</button>
                </div>
                <select id="cb-supplier" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
                  <option value="">Select Supplier</option>
                  ${M.suppliers.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
              </div>

              <div class="col-span-4">
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Remarks</label>
                <textarea id="cb-remarks" rows="2" placeholder="Quality benchmark, count notes, harvest timing..." class="w-full p-2.5 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]"></textarea>
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Booking Count</label>
                <input id="cb-count" type="number" step="any" placeholder="350" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Booking Weight (KGS)</label>
                <input id="cb-weight" type="number" step="any" placeholder="1000" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Booking Rate (₹)</label>
                <input id="cb-rate" type="number" step="any" placeholder="200" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Plant <span class="text-[#FF5150]">*</span></label>
                <select id="cb-plant" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
                  <option value="">Select Plant</option>
                  ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
              <button type="button" id="btn-close-create-booking" class="px-5 py-2 rounded-lg bg-[#64748B] hover:bg-[#475569] text-xs font-bold text-white shadow-xs hover:shadow cursor-pointer transition-all">
                Close
              </button>
              <button type="reset" class="px-5 py-2 rounded-lg bg-[#64748B] hover:bg-[#475569] text-xs font-bold text-white shadow-xs hover:shadow cursor-pointer transition-all">
                Clear Form
              </button>
              <button type="submit" class="px-6 py-2 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold shadow-xs cursor-pointer">
                Save Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    const closeHandler = () => {
      isCreatingBooking = false;
      this.renderBookings(container);
    };

    document.getElementById('btn-back-to-bookings')?.addEventListener('click', closeHandler);
    document.getElementById('btn-close-create-booking')?.addEventListener('click', closeHandler);

    document.getElementById('btn-auto-booking-no')?.addEventListener('click', () => {
      const st = document.getElementById('cb-station')?.value || 'ADDARIPETA FARMS';
      const no = nextBookingNo(st);
      const input = document.getElementById('cb-no');
      if (input) input.value = no;
      Toast.show(`Auto generated booking no: ${no}`, 'info');
    });

    document.getElementById('btn-new-supplier')?.addEventListener('click', () => {
      PurchaseView.openSupplierModal();
    });

    document.getElementById('form-create-booking')?.addEventListener('submit', e => {
      e.preventDefault();
      const no = document.getElementById('cb-no')?.value.trim();
      if (!no) {
        Toast.show('Booking number is required', 'error');
        return;
      }
      if (bookings.some(b => b.no === no)) {
        Toast.show(`Booking number ${no} already exists! Use unique number.`, 'error');
        return;
      }

      const newBooking = {
        sNo: bookings.length + 1,
        no,
        date: document.getElementById('cb-date')?.value || TODAY,
        station: document.getElementById('cb-station')?.value || '',
        species: document.getElementById('cb-species')?.value || '',
        type: document.getElementById('cb-type')?.value || '',
        supplier: document.getElementById('cb-supplier')?.value || '',
        vehicle: document.getElementById('cb-vehicle')?.value || '',
        driver: document.getElementById('cb-driver')?.value || '',
        grader: document.getElementById('cb-grader')?.value || '',
        agent: document.getElementById('cb-agent')?.value || '',
        farm: document.getElementById('cb-farm')?.value || '',
        count: parseFloat(document.getElementById('cb-count')?.value || '0'),
        weight: parseFloat(document.getElementById('cb-weight')?.value || '0'),
        rate: parseFloat(document.getElementById('cb-rate')?.value || '0'),
        plant: document.getElementById('cb-plant')?.value || '',
        remarks: document.getElementById('cb-remarks')?.value || ''
      };

      bookings.unshift(newBooking);
      Environment.setStore('bookings', bookings);
      Toast.show(`Booking ${no} created successfully!`, 'success');
      closeHandler();
    });
  },

  // =========================================================================
  // SUBMENU 2: OPERATIONS -> TAB 2: RM ARRIVAL (Client: rmarrival)
  // =========================================================================
  renderRMArrivals(container) {
    const renderTable = () => {
      const tb = document.getElementById('tb-rmarrival-body');
      if (!tb) return;

      tb.innerHTML = rmArrivals.length ? rmArrivals.map((r, i) => {
        const c = rmConsumed(r);
        const balW = r2(r.weight - c.w);
        const balAmt = r2(r.amount - c.v);
        const st = rmStatus(r, c);
        const avgRt = r.weight ? (r.amount / r.weight).toFixed(2) : '0.00';
        const stBadge = st === 'Completed' ? 'bg-[#EAFAF1] text-[#056A38]' :
          st === 'Exceed' ? 'bg-[#FEEFF1] text-[#B5152B]' :
          st === 'Partial' ? 'bg-[#E0F2FE] text-[#0369A1]' : 'bg-[#FFF9E6] text-[#824D00]';

        return `
          <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9]">
            <td class="px-3.5 py-3 font-semibold text-[#64748B]">${i + 1}</td>
            <td class="px-3.5 py-3 text-[#334155]">${r.date}</td>
            <td class="px-3.5 py-3 text-[#334155]">${r.plant}</td>
            <td class="px-3.5 py-3 text-[#334155] font-semibold">${r.center}</td>
            <td class="px-3.5 py-3 text-[#0F172A] font-semibold">${r.species}</td>
            <td class="px-3.5 py-3 font-bold text-[#0F172A]">${fmt(r.weight)} KG</td>
            <td class="px-3.5 py-3 font-bold ${balW < 0 ? 'text-[#FF5150]' : 'text-[#02a8b5]'}">${fmt(balW)} KG</td>
            <td class="px-3.5 py-3">
              <span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold border border-current ${stBadge}">
                ${st}
              </span>
            </td>
            <td class="px-3.5 py-3 text-[#334155]">₹${avgRt}</td>
            <td class="px-3.5 py-3 font-semibold text-[#0F172A]">₹${fmt(r.amount)}</td>
            <td class="px-3.5 py-3 font-bold text-[#056A38]">₹${fmt(balAmt)}</td>
            <td class="px-3.5 py-3">
              <button onclick="window.Toast.show('RM Arrival Report Downloaded', 'success')" class="px-2.5 py-1 rounded bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold shadow-xs hover:shadow cursor-pointer transition-all inline-flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                <span>Report</span>
              </button>
            </td>
          </tr>
        `;
      }).join('') : `<tr><td colspan="12" class="text-center py-8 text-xs text-[#94A3B8]">No RM Arrivals recorded</td></tr>`;
    };

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Input Form Card -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-3 border-b border-[#F1F5F9] mb-4">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Expected Inbound Lots Intake</h3>
              <p class="text-xs text-[#64748B]">Average Rate = Amount ÷ Weight · balances consumed automatically by physical Arrivals</p>
            </div>
          </div>

          <form id="form-rm-arrival" class="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs items-end">
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Intake Date</label>
              <div class="erp-date-wrapper">
                <input id="ra-date" type="text" value="${TODAY}" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
              </div>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Company</label>
              <select id="ra-company" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
                ${M.companies.map(c => `<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Species</label>
              <select id="ra-species" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
                <option value="">Select Species</option>
                ${M.species.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Processing Plant</label>
              <select id="ra-plant" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
                <option value="">Select Plant</option>
                ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Procurement Center</label>
              <select id="ra-center" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
                <option value="">Select Center</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Expected Weight (KG)</label>
              <input id="ra-weight" type="number" step="any" placeholder="1000" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Expected Amount (₹)</label>
              <input id="ra-amount" type="number" step="any" placeholder="200000" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <button type="submit" class="w-full h-9 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold transition-all shadow-xs cursor-pointer">
                Submit RM Arrival
              </button>
            </div>
          </form>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#F1F5F9]">
            <h3 class="text-sm font-bold text-[#0F172A]">Raw Material Expected vs Consumed Balances</h3>
            <div class="flex items-center gap-2">
              <button onclick="window.Toast.show('Downloading RM Table...', 'info')" class="px-3.5 py-1.5 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-xs font-bold text-white shadow-xs hover:shadow cursor-pointer transition-all inline-flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                <span>Download Table</span>
              </button>
            </div>
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th class="px-3.5 py-3">SNO</th>
                  <th class="px-3.5 py-3">Date</th>
                  <th class="px-3.5 py-3">Plant</th>
                  <th class="px-3.5 py-3">Center</th>
                  <th class="px-3.5 py-3">Species</th>
                  <th class="px-3.5 py-3">Weight</th>
                  <th class="px-3.5 py-3">Balance Weight</th>
                  <th class="px-3.5 py-3">Status</th>
                  <th class="px-3.5 py-3">Avg Rate</th>
                  <th class="px-3.5 py-3">Amount</th>
                  <th class="px-3.5 py-3">Balance Amount</th>
                  <th class="px-3.5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody id="tb-rmarrival-body"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('form-rm-arrival')?.addEventListener('submit', e => {
      e.preventDefault();
      const weight = parseFloat(document.getElementById('ra-weight')?.value || '0');
      const amount = parseFloat(document.getElementById('ra-amount')?.value || '0');
      const center = document.getElementById('ra-center')?.value;
      const species = document.getElementById('ra-species')?.value;
      const plant = document.getElementById('ra-plant')?.value;

      if (!weight || !amount || !center || !species || !plant) {
        Toast.show('Please fill required RM fields', 'error');
        return;
      }

      rmArrivals.unshift({
        sNo: rmArrivals.length + 1,
        date: document.getElementById('ra-date')?.value || TODAY,
        company: document.getElementById('ra-company')?.value || 'DEVI FISHERIES LIMITED',
        species,
        plant,
        center,
        weight,
        amount
      });

      Toast.show('RM Arrival recorded successfully', 'success');
      renderTable();
    });

    renderTable();
  },

  // =========================================================================
  // SUBMENU 2: OPERATIONS -> TAB 3: ARRIVALS REGISTER (Client: arrivals)
  // =========================================================================
  renderArrivals(container) {
    let fCenter = '';
    let fSupplier = '';
    let fPlant = '';
    let fDate = '';

    const getFiltered = () => {
      return arrivals.filter(a => {
        return (!fCenter || a.center === fCenter) &&
          (!fSupplier || a.supplier === fSupplier) &&
          (!fPlant || a.plant === fPlant) &&
          (!fDate || a.date === fDate);
      });
    };

    const renderTable = () => {
      const rows = getFiltered();
      const tb = document.getElementById('tb-arrivals-body');
      const tFoot = document.getElementById('tb-arrivals-foot');
      if (!tb) return;

      const totWeight = rows.reduce((s, a) => s + (a.weight || 0), 0);
      const totAmt = rows.reduce((s, a) => s + ((a.weight || 0) * (a.rate || 0)), 0);

      tb.innerHTML = rows.length ? rows.map((a, i) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9]">
          <td class="px-3.5 py-3 text-[#64748B] font-semibold">${i + 1}</td>
          <td class="px-3.5 py-3 font-bold text-[#02a8b5]">${a.no}</td>
          <td class="px-3.5 py-3 text-[#334155]">${a.date}</td>
          <td class="px-3.5 py-3 text-[#334155]">${a.plant}</td>
          <td class="px-3.5 py-3 text-[#475569]">${a.type}</td>
          <td class="px-3.5 py-3 text-[#0F172A] font-semibold">${a.supplier}</td>
          <td class="px-3.5 py-3 text-[#475569]">${a.grader || '–'}</td>
          <td class="px-3.5 py-3 text-[#475569]">${a.agent || '–'}</td>
          <td class="px-3.5 py-3 text-[#334155] font-semibold">${a.count}</td>
          <td class="px-3.5 py-3 text-[#0F172A] font-bold">${fmt(a.weight, 2)} KG</td>
          <td class="px-3.5 py-3 text-[#056A38] font-bold">₹${fmt(a.rate)}</td>
          <td class="px-3.5 py-3 font-bold text-[#0F172A]">₹${fmt((a.weight || 0) * (a.rate || 0))}</td>
          <td class="px-3.5 py-3">
            <div class="flex items-center gap-1.5">
              <button onclick="PurchaseView.openRMBillEdit('${a.no}')" class="p-1 rounded text-[#006644] hover:bg-[#E3FCEF]" title="Edit RM Bill">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>
              <button onclick="if(confirm('Delete arrival ${a.no}?')){ arrivals = arrivals.filter(x => x.no !== '${a.no}'); if (window.Environment) window.Environment.setStore('arrivals', arrivals); PurchaseView.renderArrivals(document.getElementById('purchase-subpage-content')); Toast.show('Arrival deleted', 'error'); }" class="p-1 rounded text-[#FF5150] hover:bg-[#FEF2F2]" title="Delete">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('') : `<tr><td colspan="13" class="text-center py-8 text-xs text-[#94A3B8]">No physical arrivals found</td></tr>`;

      if (tFoot) {
        tFoot.innerHTML = `
          <tr class="bg-[#F8FAFC] font-bold text-[#0F172A] border-t-2 border-[#CBD5E1]">
            <td colspan="9" class="px-3.5 py-3 text-right uppercase text-[11px] tracking-wider text-[#475569]">Total Receipts:</td>
            <td class="px-3.5 py-3 text-[#0F172A]">${fmt(totWeight, 2)} KG</td>
            <td class="px-3.5 py-3"></td>
            <td class="px-3.5 py-3 text-[#056A38]">₹${fmt(totAmt)}</td>
            <td class="px-3.5 py-3"></td>
          </tr>
        `;
      }
    };

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-3.5 items-end text-xs">
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Center</label>
              <select id="ar-f-center" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">Select Center</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Supplier</label>
              <select id="ar-f-supplier" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">Select Supplier</option>
                ${M.suppliers.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Plant</label>
              <select id="ar-f-plant" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">Select Arrival Plant</option>
                ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="ar-f-date" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <button id="ar-search-btn" class="flex-1 px-4 py-2 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold transition-all shadow-xs hover:shadow flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter</span>
              </button>
              <button id="ar-reset-btn" class="px-3.5 py-2 rounded-lg bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold shadow-xs hover:shadow cursor-pointer transition-all" title="Reset Filters">
                ↺
              </button>
            </div>
          </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-4 mb-3 border-b border-[#F1F5F9] flex-wrap gap-3">
            <div class="flex items-center gap-2">
              <button id="btn-create-arrival-open" class="px-4 py-2 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold transition-all shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                <span>New Arrival</span>
              </button>
              <button onclick="window.Toast.show('Exporting Arrivals to Excel...', 'info')" class="px-3.5 py-2 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-xs font-bold text-white shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer transition-all">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                <span>Download Excel</span>
              </button>
            </div>
            <input id="ar-search-input" type="text" placeholder="Search receipts..." class="w-64 h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs outline-none focus:border-[#02a8b5]">
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th class="px-3.5 py-3">S.No</th>
                  <th class="px-3.5 py-3">Arrival Number</th>
                  <th class="px-3.5 py-3">Arrival Date</th>
                  <th class="px-3.5 py-3">Arrival Plant</th>
                  <th class="px-3.5 py-3">Purchase Type</th>
                  <th class="px-3.5 py-3">Supplier</th>
                  <th class="px-3.5 py-3">Grader</th>
                  <th class="px-3.5 py-3">Agent</th>
                  <th class="px-3.5 py-3">Arrival Count</th>
                  <th class="px-3.5 py-3">Arrival Weight</th>
                  <th class="px-3.5 py-3">Arrival Rate</th>
                  <th class="px-3.5 py-3">Total Amt</th>
                  <th class="px-3.5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody id="tb-arrivals-body"></tbody>
              <tfoot id="tb-arrivals-foot"></tfoot>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('ar-search-btn')?.addEventListener('click', () => {
      fCenter = document.getElementById('ar-f-center')?.value || '';
      fSupplier = document.getElementById('ar-f-supplier')?.value || '';
      fPlant = document.getElementById('ar-f-plant')?.value || '';
      fDate = document.getElementById('ar-f-date')?.value || '';
      renderTable();
      Toast.show('Arrivals filtered.', 'info');
    });

    document.getElementById('ar-f-date')?.addEventListener('change', () => {
      fDate = document.getElementById('ar-f-date')?.value || '';
      renderTable();
    });

    document.getElementById('ar-reset-btn')?.addEventListener('click', () => {
      if (document.getElementById('ar-f-center')) document.getElementById('ar-f-center').value = '';
      if (document.getElementById('ar-f-supplier')) document.getElementById('ar-f-supplier').value = '';
      if (document.getElementById('ar-f-plant')) document.getElementById('ar-f-plant').value = '';
      if (document.getElementById('ar-f-date')) document.getElementById('ar-f-date').value = '';
      fCenter = ''; fSupplier = ''; fPlant = ''; fDate = '';
      renderTable();
      Toast.show('Filters reset.', 'info');
    });

    document.getElementById('ar-search-input')?.addEventListener('input', e => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('#tb-arrivals-body tr').forEach(tr => {
        tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });

    document.getElementById('btn-create-arrival-open')?.addEventListener('click', () => {
      PurchaseView.openCreateArrivalModal();
    });

    renderTable();
  },

  // =========================================================================
  // SUBMENU 2: OPERATIONS -> TAB 4: LOTTRACK (Client: lottrack)
  // =========================================================================
  renderLotTracking(container) {
    let selectedStation = '';
    let selectedYear = 2026;
    let selectedMonth = 'October';

    const getLots = () => {
      const mo = monthIdx[selectedMonth];
      return arrivals.filter(a => {
        const d = new Date(a.billDate);
        return (!selectedStation || a.center === selectedStation) &&
          d.getFullYear() === selectedYear &&
          d.getMonth() === mo;
      });
    };

    const renderTable = () => {
      const rows = getLots();
      const tb = document.getElementById('tb-lot-body');
      if (!tb) return;

      tb.innerHTML = rows.length ? rows.map(a => {
        const bdCls = a.abStatus === 'POSITIVE' ? 'bg-[#FEEFF1] text-[#B5152B] border-[#F9B0BE]' :
          a.abStatus === 'NEGATIVE' ? 'bg-[#EAFAF1] text-[#056A38] border-[#A8E7C3]' : 'bg-[#FFF9E6] text-[#824D00] border-[#F7DA94]';
        return `
          <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9]">
            <td class="px-3.5 py-3 font-semibold text-[#64748B]">${a.id}</td>
            <td class="px-3.5 py-3 text-[#334155]">${a.billDate}</td>
            <td class="px-3.5 py-3 font-bold text-[#02a8b5]">${a.no}</td>
            <td class="px-3.5 py-3 text-[#0F172A] font-bold">${fmt(a.weight, 2)} KG</td>
            <td class="px-3.5 py-3">
              <span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold border ${bdCls}">
                ${a.abStatus}
              </span>
            </td>
            <td class="px-3.5 py-3 text-[#334155]">${fmt(a.dehead, 3)}</td>
            <td class="px-3.5 py-3 text-[#334155]">${fmt(a.grading, 3)}</td>
            <td class="px-3.5 py-3 text-[#334155]">${fmt(a.va, 3)}</td>
            <td class="px-3.5 py-3 text-[#334155]">${fmt(a.soaking, 3)}</td>
            <td class="px-3.5 py-3 font-semibold text-[#056A38]">${fmt(a.packed, 3)}</td>
          </tr>
        `;
      }).join('') : `<tr><td colspan="10" class="text-center py-8 text-xs text-[#94A3B8]">No lots in pipeline</td></tr>`;
    };

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Purchase Station</label>
              <select id="lt-station" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All Purchase Station</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Month</label>
              <select id="lt-month" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="October" selected>October</option>
                <option value="September">September</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Year</label>
              <select id="lt-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="2026" selected>2026</option>
                <option value="2025">2025</option>
              </select>
            </div>
            <div>
              <button id="lt-search-btn" class="w-full h-9 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter Pipeline</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-4 mb-3 border-b border-[#F1F5F9] flex-wrap gap-3">
            <div class="flex items-center gap-2">
              <button id="btn-lt-copy" class="px-3.5 py-1.5 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-xs font-bold text-white shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer transition-all">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                <span>Copy TSV</span>
              </button>
              <button onclick="window.Toast.show('Downloading Excel...', 'info')" class="px-3.5 py-1.5 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-xs font-bold text-white shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer transition-all">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                <span>Excel</span>
              </button>
              <button onclick="window.Toast.show('Downloading PDF...', 'info')" class="px-3.5 py-1.5 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-xs font-bold text-white shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer transition-all">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                <span>PDF</span>
              </button>
            </div>
            <input id="lt-search-input" type="text" placeholder="Search pipeline..." class="w-64 h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs outline-none focus:border-[#02a8b5]">
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table id="tbl-lot-table" class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th class="px-3.5 py-3">ID</th>
                  <th class="px-3.5 py-3">Arrival Date</th>
                  <th class="px-3.5 py-3">Lot Number</th>
                  <th class="px-3.5 py-3">Arrival Qty</th>
                  <th class="px-3.5 py-3">Ab Status</th>
                  <th class="px-3.5 py-3">Deheading Qty</th>
                  <th class="px-3.5 py-3">Grading Qty</th>
                  <th class="px-3.5 py-3">VA Qty</th>
                  <th class="px-3.5 py-3">Soaking Qty</th>
                  <th class="px-3.5 py-3">Packed Qty</th>
                </tr>
              </thead>
              <tbody id="tb-lot-body"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('lt-search-btn')?.addEventListener('click', () => {
      selectedStation = document.getElementById('lt-station')?.value || '';
      selectedYear = parseInt(document.getElementById('lt-year')?.value || '2026', 10);
      selectedMonth = document.getElementById('lt-month')?.value || 'October';
      renderTable();
      Toast.show('LotTrack pipeline updated.', 'info');
    });

    document.getElementById('btn-lt-copy')?.addEventListener('click', () => {
      const table = document.getElementById('tbl-lot-table');
      if (!table) return;
      const rows = [...table.querySelectorAll('tr')];
      const tsv = rows.map(r => [...r.cells].map(c => c.textContent.trim()).join('\t')).join('\n');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(tsv).then(() => {
          Toast.show('Table copied to clipboard (TSV format)!', 'success');
        });
      }
    });

    renderTable();
  },

  // =========================================================================
  // SUBMENU 3: TRANSACTIONS & BILLS -> TAB 1: BILLS (Client: bills)
  // Contextual behavior: Tapping any transaction row opens RM Bill right here
  // =========================================================================
  openRMBillEdit(billNo) {
    const a = arrivals.find(x => x.no === billNo);
    if (!a) {
      Toast.show('Arrival record not found', 'error');
      return;
    }
    activeBillForEdit = a;
    const subContainer = document.getElementById('purchase-subpage-content');
    if (subContainer) {
      this.renderBills(subContainer);
    }
  },


};
