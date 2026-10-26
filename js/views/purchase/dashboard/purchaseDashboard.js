// Purchase Module — Dashboard Submodule
export const purchaseDashboard = {
  // =========================================================================
  // SUBMENU 1: DASHBOARD -> TAB 1: PURCHASE DASHBOARD (Client: pdashboard)
  // =========================================================================
  renderPurchaseDashboard(container) {
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

    const updateView = () => {
      const lots = getLots();
      const abLots = lots.filter(a => a.abStatus === 'POSITIVE').length;
      const retLots = lots.filter(a => a.returned).length;
      const borderLots = lots.filter(a => a.border).length;
      const gPendLots = lots.filter(a => !a.grading).length;
      const bPendLots = lots.filter(a => a.billPending).length;

      const clean = lots.filter(a => a.abStatus !== 'POSITIVE');
      const hon = clean.reduce((s, a) => s + (a.weight || 0), 0);
      const head = clean.reduce((s, a) => s + (a.dehead || 0), 0);
      const pack = clean.reduce((s, a) => s + (a.packed || 0), 0);
      const yieldPct = hon ? ((head / hon) * 100).toFixed(1) : '0';

      // KPI Grid
      const kpiContainer = document.getElementById('pdash-kpi-grid');
      if (kpiContainer) {
        kpiContainer.innerHTML = `
          ${Molecules.StatTile({
            label: 'Total Lots',
            value: lots.length,
            unit: 'Lots',
            badgeText: 'Active Intake',
            badgeTone: 'teal',
            icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`
          })}
          ${Molecules.StatTile({
            label: 'AB+ Lots',
            value: abLots,
            unit: 'Lots',
            badgeText: 'Lab Positive',
            badgeTone: 'ruby',
            icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`
          })}
          ${Molecules.StatTile({
            label: 'Return Lots',
            value: retLots,
            unit: 'Lots',
            badgeText: 'Rejected / Gate',
            badgeTone: 'amber',
            icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>`
          })}
          ${Molecules.StatTile({
            label: 'Border Counts',
            value: borderLots,
            unit: 'Lots',
            badgeText: 'Near Tolerance',
            badgeTone: 'sky',
            icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>`
          })}
          ${Molecules.StatTile({
            label: 'Grading Pendings',
            value: gPendLots,
            unit: 'Lots',
            badgeText: 'Floor Staged',
            badgeTone: 'teal',
            icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
          })}
          ${Molecules.StatTile({
            label: 'Bill Pendings',
            value: bPendLots,
            unit: 'Lots',
            badgeText: 'Unbilled',
            badgeTone: 'amber',
            icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`
          })}
        `;
      }

      // Metric Strip
      const metricStrip = document.getElementById('pdash-metric-strip');
      if (metricStrip) {
        metricStrip.innerHTML = `
          <div class="bg-white border border-[#E2E8F0] rounded-xl p-3.5 flex flex-col justify-center">
            <span class="text-xs text-[#64748B] font-semibold">Headless Details</span>
            <span class="text-lg font-bold text-[#0F172A] mt-0.5">${T(head)} <span class="text-xs font-medium text-[#64748B]">T</span></span>
          </div>
          <div class="bg-white border border-[#E2E8F0] rounded-xl p-3.5 flex flex-col justify-center">
            <span class="text-xs text-[#64748B] font-semibold">Hon Qty</span>
            <span class="text-lg font-bold text-[#0F172A] mt-0.5">${T(hon)} <span class="text-xs font-medium text-[#64748B]">T</span></span>
          </div>
          <div class="bg-white border border-[#E2E8F0] rounded-xl p-3.5 flex flex-col justify-center">
            <span class="text-xs text-[#64748B] font-semibold">Hon Packed</span>
            <span class="text-lg font-bold text-[#0F172A] mt-0.5">${T(pack)} <span class="text-xs font-medium text-[#64748B]">T</span></span>
          </div>
          <div class="bg-white border border-[#E2E8F0] rounded-xl p-3.5 flex flex-col justify-center">
            <span class="text-xs text-[#64748B] font-semibold">Avg Yield</span>
            <span class="text-lg font-bold text-[#056A38] mt-0.5">${yieldPct} <span class="text-xs font-medium text-[#64748B]">%</span></span>
          </div>
        `;
      }

      // Render Table: Production Details
      const tbProd = document.getElementById('pdash-tb-prod');
      if (tbProd) {
        tbProd.innerHTML = clean.length ? clean.map(a => `
          <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9]">
            <td class="px-4 py-2.5 font-bold text-[#0F172A]">${a.no}</td>
            <td class="px-4 py-2.5 text-[#334155]">${fmt(a.dehead, 3)}</td>
            <td class="px-4 py-2.5 text-[#334155]">${fmt(a.grading, 3)}</td>
            <td class="px-4 py-2.5 text-[#334155]">${fmt(a.va, 3)}</td>
            <td class="px-4 py-2.5 text-[#334155]">${fmt(a.soaking, 3)}</td>
            <td class="px-4 py-2.5 font-semibold text-[#056A38]">${fmt(a.packed, 3)}</td>
          </tr>
        `).join('') : `<tr><td colspan="6" class="text-center py-6 text-xs text-[#94A3B8]">No clean lots recorded for selected period</td></tr>`;
      }
    };

    container.innerHTML = `
      <div class="space-y-5 animate-fade-in">
        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Purchase Station</label>
              <select id="pdash-station-sel" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#02a8b5] outline-none">
                <option value="">All Purchase Station</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Year</label>
              <select id="pdash-year-sel" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#02a8b5] outline-none">
                <option value="2026" selected>2026</option>
                <option value="2025">2025</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Month</label>
              <select id="pdash-month-sel" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#02a8b5] outline-none">
                <option value="October" selected>October</option>
                <option value="September">September</option>
                <option value="November">November</option>
              </select>
            </div>
            <div>
              <button id="pdash-search-btn" class="w-full h-9 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search Records</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 6 KPI StatTiles -->
        <div id="pdash-kpi-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5"></div>

        <!-- Metric Strip -->
        <div id="pdash-metric-strip" class="grid grid-cols-2 md:grid-cols-4 gap-3.5"></div>

        <!-- Production Details Table Card -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#F1F5F9]">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <h3 class="text-sm font-bold text-[#0F172A]">Production Floor Details by Intake Lot</h3>
            </div>
            <span class="text-xs text-[#64748B]">Showing clean batches (AB- negative only)</span>
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th class="px-4 py-3">Lot Number</th>
                  <th class="px-4 py-3">Dehead (T)</th>
                  <th class="px-4 py-3">Grading (T)</th>
                  <th class="px-4 py-3">VA (T)</th>
                  <th class="px-4 py-3">Soaking (T)</th>
                  <th class="px-4 py-3">Packed (T)</th>
                </tr>
              </thead>
              <tbody id="pdash-tb-prod"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('pdash-search-btn')?.addEventListener('click', () => {
      selectedStation = document.getElementById('pdash-station-sel')?.value || '';
      selectedYear = parseInt(document.getElementById('pdash-year-sel')?.value || '2026', 10);
      selectedMonth = document.getElementById('pdash-month-sel')?.value || 'October';
      updateView();
      Toast.show('Purchase Dashboard filtered.', 'info');
    });

    updateView();
  },

  // =========================================================================
  // SUBMENU 1: DASHBOARD -> TAB 2: RM DASHBOARD (Client: RM DashBoard)
  // =========================================================================
  renderRMDashboard(container) {
    let fSpecies = '';
    let fCenter = '';
    let fPlant = '';
    let fFrom = '';
    let fTo = '';
    const isS01 = Environment.isSitemap01();

    const getFilteredArrivals = () => {
      return arrivals.filter(a => {
        return (!fSpecies || a.species === fSpecies) &&
          (!fCenter || a.center === fCenter) &&
          (!fPlant || a.plant === fPlant) &&
          (!fFrom || a.date >= fFrom) &&
          (!fTo || a.date <= fTo);
      });
    };

    const updateView = () => {
      const rows = getFilteredArrivals();
      const sumSpecies = {};
      const sumPlant = {};
      const sumCenter = {};
      let totalWeight = 0;

      rows.forEach(a => {
        const w = Number(a.weight || 0);
        totalWeight += w;
        sumSpecies[a.species] = (sumSpecies[a.species] || 0) + w;
        sumPlant[a.plant] = (sumPlant[a.plant] || 0) + w;
        sumCenter[a.center] = (sumCenter[a.center] || 0) + w;
      });

      const metricsContainer = document.getElementById('rmdash-metrics-grid');
      if (metricsContainer) {
        if (isS01) {
          // Sitemap 01: 4 Status-Tinted KPI Cards with Icon Badges
          const totVal = totalWeight > 0 ? totalWeight : 142500;
          const honVal = totVal;
          const dmgVal = 1250;
          const pndVal = 48200;

          metricsContainer.innerHTML = `
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5 select-none">
              <!-- Card 1: TOTAL QUANTITY -->
              <div class="bg-white border border-[#E0F7FA] rounded-2xl p-4 sm:p-5 shadow-xs flex items-center justify-between">
                <div>
                  <span class="text-[10.5px] font-bold text-[#475569] uppercase tracking-wider block mb-1">TOTAL QUANTITY</span>
                  <div class="flex items-baseline gap-1.5">
                    <span class="text-2xl font-extrabold text-[#0F172A] tracking-tight">${fmt(totVal, 0)}</span>
                    <span class="text-xs font-semibold text-[#64748B]">Kg</span>
                  </div>
                </div>
                <div class="w-10 h-10 rounded-xl bg-[#F0FAFC] text-[#02a8b5] flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>
                </div>
              </div>

              <!-- Card 2: HEAD ON QTY -->
              <div class="bg-white border border-[#E8F5E9] rounded-2xl p-4 sm:p-5 shadow-xs flex items-center justify-between">
                <div>
                  <span class="text-[10.5px] font-bold text-[#475569] uppercase tracking-wider block mb-1">HEAD ON QTY</span>
                  <div class="flex items-baseline gap-1.5">
                    <span class="text-2xl font-extrabold text-[#0F172A] tracking-tight">${fmt(honVal, 0)}</span>
                    <span class="text-xs font-semibold text-[#64748B]">Kg</span>
                  </div>
                </div>
                <div class="w-10 h-10 rounded-xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                </div>
              </div>

              <!-- Card 3: DAMAGE WEIGHT -->
              <div class="bg-white border border-[#FFCDD2] rounded-2xl p-4 sm:p-5 shadow-xs flex items-center justify-between">
                <div>
                  <span class="text-[10.5px] font-bold text-[#991B1B] uppercase tracking-wider block mb-1">DAMAGE WEIGHT</span>
                  <div class="flex items-baseline gap-1.5">
                    <span class="text-2xl font-extrabold text-[#DC2626] tracking-tight">${fmt(dmgVal, 0)}</span>
                    <span class="text-xs font-semibold text-[#64748B]">Kg</span>
                  </div>
                </div>
                <div class="w-10 h-10 rounded-xl bg-[#FFEBEE] text-[#D32F2F] flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                </div>
              </div>

              <!-- Card 4: PENDING PRODUCTION -->
              <div class="bg-white border border-[#FEF08A] rounded-2xl p-4 sm:p-5 shadow-xs flex items-center justify-between">
                <div>
                  <span class="text-[10.5px] font-bold text-[#92400E] uppercase tracking-wider block mb-1">PENDING PRODUCTION</span>
                  <div class="flex items-baseline gap-1.5">
                    <span class="text-2xl font-extrabold text-[#D97706] tracking-tight">${fmt(pndVal, 0)}</span>
                    <span class="text-xs font-semibold text-[#64748B]">Kg</span>
                  </div>
                </div>
                <div class="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
              </div>
            </div>
          `;

          // Render Dual Charts in Sitemap 01
          this.renderDualCharts(sumSpecies, sumPlant);
        } else {
          // Sitemap 02 (Superadmin) original breakdown cards
          metricsContainer.innerHTML = `
            <div class="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs">
              <span class="text-xs font-bold text-[#475569] uppercase tracking-wider">Top Species Handled</span>
              <div class="mt-2 space-y-1.5 text-xs">
                ${Object.entries(sumSpecies).map(([k, v]) => `
                  <div class="flex justify-between items-center py-1 border-b border-[#F1F5F9]">
                    <span class="font-medium text-[#334155]">${k}</span>
                    <span class="font-bold text-[#0F172A]">${T(v)} T</span>
                  </div>
                `).join('') || '<span class="text-[#94A3B8]">No arrivals</span>'}
              </div>
            </div>

            <div class="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs">
              <span class="text-xs font-bold text-[#475569] uppercase tracking-wider">Plant Intake Distribution</span>
              <div class="mt-2 space-y-1.5 text-xs">
                ${Object.entries(sumPlant).map(([k, v]) => `
                  <div class="flex justify-between items-center py-1 border-b border-[#F1F5F9]">
                    <span class="font-medium text-[#334155]">${k}</span>
                    <span class="font-bold text-[#02a8b5]">${T(v)} T</span>
                  </div>
                `).join('') || '<span class="text-[#94A3B8]">No arrivals</span>'}
              </div>
            </div>

            <div class="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs">
              <span class="text-xs font-bold text-[#475569] uppercase tracking-wider">Center Procurement Volume</span>
              <div class="mt-2 space-y-1.5 text-xs">
                ${Object.entries(sumCenter).slice(0, 4).map(([k, v]) => `
                  <div class="flex justify-between items-center py-1 border-b border-[#F1F5F9]">
                    <span class="font-medium text-[#334155]">${k}</span>
                    <span class="font-bold text-[#056A38]">${T(v)} T</span>
                  </div>
                `).join('') || '<span class="text-[#94A3B8]">No arrivals</span>'}
              </div>
            </div>
          `;
        }
      }

      // Pending Table (Sitemap 02)
      const tbPend = document.getElementById('rmdash-tb-pend');
      if (tbPend) {
        tbPend.innerHTML = rows.length ? rows.map(a => `
          <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9]">
            <td class="px-4 py-2.5 font-bold text-[#0F172A]">${a.no}</td>
            <td class="px-4 py-2.5 text-[#334155]">${fmt(a.weight, 3)} KG</td>
            <td class="px-4 py-2.5">
              <span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold ${a.abStatus === 'POSITIVE' ? 'bg-[#FEEFF1] text-[#B5152B] border border-[#F9B0BE]' : 'bg-[#EAFAF1] text-[#056A38] border border-[#A8E7C3]'}">
                ${a.abStatus}
              </span>
            </td>
            <td class="px-4 py-2.5 text-[#64748B]">${a.date}</td>
          </tr>
        `).join('') : `<tr><td colspan="4" class="text-center py-6 text-xs text-[#94A3B8]">No pending raw material lots found</td></tr>`;
      }
    };

    if (isS01) {
      // Sitemap 01 modern layout: 2-Row Collapsible Filter Card + 4 KPI Cards + 2 Charts
      container.innerHTML = `
        <div class="space-y-4 animate-fade-in">
          <!-- Filter Card with Accordion & Inline Search -->
          <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
            <div class="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#F1F5F9]">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <h3 class="text-sm font-bold text-[#0F172A]">Search & Filters</h3>
              </div>

            </div>

            <div id="rmdash-filter-fields" class="space-y-3.5">
              <!-- Row 1: 4 Columns -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <label class="block text-[10.5px] font-bold text-[#475569] uppercase tracking-wider mb-1">Species</label>
                  <select id="rmdash-species-sel" class="w-full h-10 px-3 rounded-xl border border-[#CBD5E1] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#00A8B5] outline-none">
                    <option value="">Vannamei (VM)</option>
                    ${M.species.map(s => `<option value="${s}">${s}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block text-[10.5px] font-bold text-[#475569] uppercase tracking-wider mb-1">Center</label>
                  <select id="rmdash-center-sel" class="w-full h-10 px-3 rounded-xl border border-[#CBD5E1] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#00A8B5] outline-none">
                    <option value="">All Centers (Select)</option>
                    ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block text-[10.5px] font-bold text-[#475569] uppercase tracking-wider mb-1">Plant</label>
                  <select id="rmdash-plant-sel" class="w-full h-10 px-3 rounded-xl border border-[#CBD5E1] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#00A8B5] outline-none">
                    <option value="">All Plants (Select)</option>
                    ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block text-[10.5px] font-bold text-[#475569] uppercase tracking-wider mb-1">From Date</label>
                  <div class="erp-date-wrapper">
                    <input type="text" id="rmdash-from-date" placeholder="05/10/2026" value="05/10/2026" class="erp-date-input w-full h-10 px-3 rounded-xl border border-[#CBD5E1] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                  </div>
                </div>
              </div>

              <!-- Row 2: To Date + Inline Search & Reset Buttons -->
              <div class="flex items-end gap-3 text-xs">
                <div class="w-full sm:w-1/4">
                  <label class="block text-[10.5px] font-bold text-[#475569] uppercase tracking-wider mb-1">To Date</label>
                  <div class="erp-date-wrapper">
                    <input type="text" id="rmdash-to-date" placeholder="06/10/2026" value="06/10/2026" class="erp-date-input w-full h-10 px-3 rounded-xl border border-[#CBD5E1] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                  </div>
                </div>
                <button id="rmdash-search-btn" class="px-5 py-2.5 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold transition-all shadow-xs hover:shadow flex items-center justify-center gap-1.5 cursor-pointer">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  <span>Search</span>
                </button>
                <button id="rmdash-reset-btn" class="px-4 py-2.5 rounded-lg bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold shadow-xs hover:shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer" title="Reset Filters">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          <!-- 4 KPI Cards Container -->
          <div id="rmdash-metrics-grid"></div>

          <!-- 2 Side-by-Side Analytics Charts -->
          <div id="rmdash-charts-grid" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
              <h3 class="text-sm font-bold text-[#0F172A] mb-2">Sum of QTY by SPECIES</h3>
              <div class="flex justify-center items-center gap-2 text-xs text-[#64748B] mb-3">
                <span class="w-3 h-3 rounded-xs bg-[#5B67CA] inline-block"></span>
                <span>Quantity (KG)</span>
              </div>
              <div style="height: 220px;" class="relative">
                <canvas id="rmdash-chart-species"></canvas>
              </div>
            </div>

            <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
              <h3 class="text-sm font-bold text-[#0F172A] mb-2">Sum of QTY by PLANT</h3>
              <div class="flex justify-center items-center gap-2 text-xs text-[#64748B] mb-3">
                <span class="w-3 h-3 rounded-xs bg-[#4DD0E1] inline-block"></span>
                <span>Intake Quantity (KG)</span>
              </div>
              <div style="height: 220px;" class="relative">
                <canvas id="rmdash-chart-plant"></canvas>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      // Sitemap 02 (Superadmin) original layout
      container.innerHTML = `
        <div class="space-y-5 animate-fade-in">
          <!-- Filter Header -->
          <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
            <div class="grid grid-cols-1 md:grid-cols-6 gap-3.5 items-end text-xs">
              <div>
                <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Species</label>
                <select id="rmdash-species-sel" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#02a8b5] outline-none">
                  <option value="">All Species</option>
                  ${M.species.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Center</label>
                <select id="rmdash-center-sel" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#02a8b5] outline-none">
                  <option value="">All Centers</option>
                  ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Plant</label>
                <select id="rmdash-plant-sel" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#02a8b5] outline-none">
                  <option value="">All Plants</option>
                  ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">From Date</label>
                <div class="erp-date-wrapper">
                  <input type="text" id="rmdash-from-date" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                </div>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">To Date</label>
                <div class="erp-date-wrapper">
                  <input type="text" id="rmdash-to-date" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                </div>
              </div>
              <div class="flex items-center gap-1.5">
                <button id="rmdash-search-btn" class="flex-1 h-9 rounded-lg bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  <span>Filter</span>
                </button>
                <button id="rmdash-reset-btn" class="px-4 py-2 rounded-lg bg-[#64748B] hover:bg-[#475569] text-white text-xs font-bold shadow-xs hover:shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer" title="Reset Filters">
                  ↺
                </button>
              </div>
            </div>
          </div>

          <!-- 3 Breakdown Cards -->
          <div id="rmdash-metrics-grid" class="grid grid-cols-1 md:grid-cols-3 gap-4"></div>

          <!-- Production Details Table Card -->
          <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
            <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#F1F5F9]">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <h3 class="text-sm font-bold text-[#0F172A]">Raw Material Pending Intake Register</h3>
              </div>
              <span class="text-xs text-[#64748B]">Real-time lot status & QC screening</span>
            </div>

            <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                    <th class="px-4 py-3">Lot Number</th>
                    <th class="px-4 py-3">Arrival Qty</th>
                    <th class="px-4 py-3">AB Status</th>
                    <th class="px-4 py-3">Pending Since</th>
                  </tr>
                </thead>
                <tbody id="rmdash-tb-pend"></tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    // Accordion toggle in Sitemap 01
    const accordBtn = document.getElementById('rmdash-accordion-btn');
    const filterFields = document.getElementById('rmdash-filter-fields');
    const accordIcon = document.getElementById('rmdash-accordion-icon');
    if (accordBtn && filterFields) {
      accordBtn.addEventListener('click', () => {
        const isHidden = filterFields.classList.toggle('hidden');
        if (accordIcon) accordIcon.classList.toggle('rotate-180', isHidden);
      });
    }

    document.getElementById('rmdash-search-btn')?.addEventListener('click', () => {
      fSpecies = document.getElementById('rmdash-species-sel')?.value || '';
      fCenter = document.getElementById('rmdash-center-sel')?.value || '';
      fPlant = document.getElementById('rmdash-plant-sel')?.value || '';
      fFrom = document.getElementById('rmdash-from-date')?.value || '';
      fTo = document.getElementById('rmdash-to-date')?.value || '';
      updateView();
      Toast.show('RM Dashboard updated.', 'info');
    });

    document.getElementById('rmdash-reset-btn')?.addEventListener('click', () => {
      if (document.getElementById('rmdash-species-sel')) document.getElementById('rmdash-species-sel').value = '';
      if (document.getElementById('rmdash-center-sel')) document.getElementById('rmdash-center-sel').value = '';
      if (document.getElementById('rmdash-plant-sel')) document.getElementById('rmdash-plant-sel').value = '';
      if (document.getElementById('rmdash-from-date')) document.getElementById('rmdash-from-date').value = '';
      if (document.getElementById('rmdash-to-date')) document.getElementById('rmdash-to-date').value = '';
      fSpecies = ''; fCenter = ''; fPlant = ''; fFrom = ''; fTo = '';
      updateView();
      Toast.show('Filters reset.', 'info');
    });

    updateView();
  },

  renderDualCharts(sumSpecies, sumPlant) {
    if (typeof window === 'undefined' || !window.Chart) return;

    // Destroy existing chart instances to avoid canvas reuse errors
    if (this._speciesChart) {
      this._speciesChart.destroy();
      this._speciesChart = null;
    }
    if (this._plantChart) {
      this._plantChart.destroy();
      this._plantChart = null;
    }

    // Species chart canvas
    const speciesCanvas = document.getElementById('rmdash-chart-species');
    if (speciesCanvas) {
      const spLabels = Object.keys(sumSpecies).length ? Object.keys(sumSpecies) : ['Vannamei (VM)'];
      const spData = Object.values(sumSpecies).length ? Object.values(sumSpecies) : [138000];

      this._speciesChart = new window.Chart(speciesCanvas, {
        type: 'bar',
        data: {
          labels: spLabels,
          datasets: [{
            label: 'Quantity (KG)',
            data: spData,
            backgroundColor: '#5B67CA',
            borderRadius: 8,
            barThickness: 50
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: '#F1F5F9' },
              ticks: { color: '#94A3B8', font: { size: 10.5 } }
            },
            x: {
              grid: { display: false },
              ticks: { color: '#64748B', font: { size: 10.5, weight: '600' } }
            }
          }
        }
      });
    }

    // Plant chart canvas
    const plantCanvas = document.getElementById('rmdash-chart-plant');
    if (plantCanvas) {
      const plLabels = Object.keys(sumPlant).length ? Object.keys(sumPlant) : ['DFL UNIT-1', 'DFL UNIT-2', 'DFL UNIT-3', 'DFL UNIT-4'];
      const plData = Object.values(sumPlant).length ? Object.values(sumPlant) : [40000, 26000, 22000, 10000];

      this._plantChart = new window.Chart(plantCanvas, {
        type: 'bar',
        data: {
          labels: plLabels,
          datasets: [{
            label: 'Intake Quantity (KG)',
            data: plData,
            backgroundColor: '#4DD0E1',
            borderRadius: 8,
            barThickness: 42
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: '#F1F5F9' },
              ticks: { color: '#94A3B8', font: { size: 10.5 } }
            },
            x: {
              grid: { display: false },
              ticks: { color: '#64748B', font: { size: 10.5, weight: '600' } }
            }
          }
        }
      });
    }
  },

  // =========================================================================
  // SUBMENU 2: OPERATIONS -> TAB 1: BOOKINGS LIST (Client: bookings)
  // Contextual behavior: Create Booking renders smoothly inside this tab on demand
  // =========================================================================

};
