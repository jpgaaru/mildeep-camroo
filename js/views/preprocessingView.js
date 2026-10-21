// AquaOps Pre-Processing Module Controller — Camaroo ERP v3.0.0
// Comprehensive implementation of all 21 screens across 4 submenus:
// 1. Dashboard (Floor Overview with 8 KPIs & 3 native Canvas charts)
// 2. Floor Operations (7 screens: RM Received, Deheading, Grading, De-heading Trackid, Grading Trackid, Value Addition, Hon Qty Transfer)
// 3. Chemical Inventory & Usage (7 screens: Chemical POs, Received, Consumption, Received Report, Opening Balance, Balance Report, Payments)
// 4. Traceability & Reconciliation (6 screens: Track Code Report, VA Floor Balance, VA Transfer, Assumed Reports, Consolidation Daily, File Upload)

import { Toast } from '../components/toast.js';
import { Modal } from '../components/modal.js';
import { Molecules, Organisms, Atoms } from '../framework/index.js';
import { YieldBadge, DifferencePill, TrackCodeChip, ProcessStatusBadge } from '../components/industrialAtoms.js';

export const PreprocessingView = {
  render(containerId, subPage = 'floor-overview', activeHash = '#/preprocessing/dashboard/floor-overview') {
    const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!container) return;

    this.updateHeaderAction(subPage);

    container.innerHTML = `
      <div id="preprocessing-tab-bar-container"></div>
      <div id="preproc-subpage-content" class="w-full"></div>
    `;
    if (typeof TabBar !== 'undefined' && typeof TabBar.render === 'function') {
      TabBar.render('preprocessing-tab-bar-container', activeHash);
    }
    const subContainer = document.getElementById('preproc-subpage-content');

    switch (subPage) {
      // 1. Dashboard
      case 'overview':
      case 'floor-overview':
        this.renderFloorOverview(subContainer);
        break;

      // 2. Floor Operations
      case 'rm-received':
        this.renderRmReceived(subContainer);
        break;
      case 'deheading':
        this.renderDeheading(subContainer);
        break;
      case 'grading':
        this.renderGrading(subContainer);
        break;
      case 'deheading-trackid':
        this.renderDeheadingTrackid(subContainer);
        break;
      case 'grading-trackid':
        this.renderGradingTrackid(subContainer);
        break;
      case 'value-addition':
        this.renderValueAddition(subContainer);
        break;
      case 'hon-qty-transfer':
        this.renderHonQtyTransfer(subContainer);
        break;

      // 3. Chemical Inventory & Usage
      case 'chemical-pos':
        this.renderChemicalPos(subContainer);
        break;
      case 'received-chemicals':
        this.renderReceivedChemicals(subContainer);
        break;
      case 'chemicals-consumption':
        this.renderChemicalsConsumption(subContainer);
        break;
      case 'chemical-received-report':
        this.renderChemicalReceivedReport(subContainer);
        break;
      case 'chemical-opening-balance':
        this.renderChemicalOpeningBalance(subContainer);
        break;
      case 'chemical-balance-report':
        this.renderChemicalBalanceReport(subContainer);
        break;
      case 'chemical-payments-list':
        this.renderChemicalPaymentsList(subContainer);
        break;

      // 4. Traceability & Reconciliation
      case 'track-code-report':
        this.renderTrackCodeReport(subContainer);
        break;
      case 'va-floor-balance':
        this.renderVaFloorBalance(subContainer);
        break;
      case 'va-transfer':
        this.renderVaTransfer(subContainer);
        break;
      case 'assumed-reports':
        this.renderAssumedReports(subContainer);
        break;
      case 'consolidation-daily':
        this.renderConsolidationDaily(subContainer);
        break;
      case 'file-upload':
        this.renderFileUpload(subContainer);
        break;

      default:
        this.renderFloorOverview(subContainer);
        break;
    }

    this.bindTableSearch(subContainer);
    if (typeof window !== 'undefined' && window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  },

  updateHeaderAction(subPage) {
    const actionContainer = document.getElementById('section-action-btn-container');
    if (!actionContainer) return;

    if (subPage === 'chemical-pos') {
      actionContainer.innerHTML = `<button class="btn btn-primary px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5" onclick="window.PreprocessingView.openChemPOModal()"><i data-lucide="plus" class="w-4 h-4"></i> Add Chemical PO</button>`;
    } else if (subPage === 'received-chemicals') {
      actionContainer.innerHTML = `<button class="btn btn-primary px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5" onclick="window.PreprocessingView.openChemOrderModal()"><i data-lucide="plus" class="w-4 h-4"></i> Add Order</button>`;
    } else if (subPage === 'chemicals-consumption') {
      actionContainer.innerHTML = `<button class="btn btn-primary px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5" onclick="window.PreprocessingView.openChemConsumptionModal()"><i data-lucide="plus" class="w-4 h-4"></i> Add Consumption</button>`;
    } else if (subPage === 'chemical-payments-list') {
      actionContainer.innerHTML = `<button class="btn btn-primary px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5" onclick="window.PreprocessingView.openChemPaymentModal()"><i data-lucide="plus" class="w-4 h-4"></i> Add Payment</button>`;
    } else {
      actionContainer.innerHTML = '';
    }
  },

  bindTableSearch(container) {
    const searchInputs = container.querySelectorAll('.table-search');
    searchInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const tableCard = e.target.closest('.table-card');
        if (!tableCard) return;
        const rows = tableCard.querySelectorAll('tbody tr');
        rows.forEach(row => {
          if (row.querySelector('.empty-cell')) return;
          const text = row.innerText.toLowerCase();
          row.style.display = text.includes(term) ? '' : 'none';
        });
      });
    });
  },

  // ============================================
  // 1. FLOOR OVERVIEW (DASHBOARD)
  // ============================================
  renderFloorOverview(container) {
    const kpiRow1 = [
      Molecules.StatTile({
        label: "Today's Arrivals",
        value: "3",
        unit: "",
        badgeText: "↑ 12%",
        badgeTone: "teal",
        icon: `<i data-lucide="truck" class="w-4 h-4"></i>`,
        footerLabel: "vs yesterday",
        footerValue: "16,009.30 Kgs"
      }),
      Molecules.StatTile({
        label: "Average Yield",
        value: "69.45%",
        unit: "",
        badgeText: "↓ 0.8%",
        badgeTone: "ruby",
        valueColor: "text-[#006C7A]",
        icon: `<i data-lucide="percent" class="w-4 h-4"></i>`,
        footerLabel: "Active batches",
        footerValue: "3 Batches"
      }),
      Molecules.StatTile({
        label: "Low Chemical Stock",
        value: "2",
        unit: "items",
        badgeText: "Warning",
        badgeTone: "amber",
        valueColor: "text-[#B45309]",
        icon: `<i data-lucide="flask-conical" class="w-4 h-4"></i>`,
        footerLabel: "Below threshold",
        footerValue: "STPP & Phosphate"
      }),
      Molecules.StatTile({
        label: "WIP on Floor",
        value: "3,103",
        unit: "Kg",
        badgeText: "119 Crates",
        badgeTone: "sky",
        icon: `<i data-lucide="package" class="w-4 h-4"></i>`,
        footerLabel: "Across grades",
        footerValue: "6 Grades"
      })
    ].join('');

    const kpiRow2 = [
      Molecules.StatTile({
        label: "Pending Transfers",
        value: "4",
        unit: "Batches",
        badgeText: "Pending",
        badgeTone: "amber",
        icon: `<i data-lucide="arrow-right-left" class="w-4 h-4"></i>`,
        footerLabel: "Awaiting movement",
        footerValue: "2,955.60 Kgs"
      }),
      Molecules.StatTile({
        label: "Count Discrepancies",
        value: "-19.6",
        unit: "Count",
        badgeText: "Shortfall",
        badgeTone: "ruby",
        valueColor: "text-[#B91C1C]",
        icon: `<i data-lucide="alert-triangle" class="w-4 h-4"></i>`,
        footerLabel: "Arrival status",
        footerValue: "Variance Detected"
      }),
      Molecules.StatTile({
        label: "Pending Payments",
        value: "₹0",
        unit: "",
        badgeText: "Cleared",
        badgeTone: "emerald",
        icon: `<i data-lucide="credit-card" class="w-4 h-4"></i>`,
        footerLabel: "Invoices",
        footerValue: "All Cleared"
      }),
      Molecules.StatTile({
        label: "Active Batches",
        value: "7",
        unit: "Batches",
        badgeText: "Active",
        badgeTone: "teal",
        icon: `<i data-lucide="layers" class="w-4 h-4"></i>`,
        footerLabel: "Floor split",
        footerValue: "3 Grading · 4 VA"
      })
    ].join('');

    container.innerHTML = `
      <div class="space-y-5 animate-fade-in w-full pb-8">
        <!-- KPI Row 1 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${kpiRow1}
        </div>

        <!-- KPI Row 2 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${kpiRow2}
        </div>

        <!-- Row 2: Production Trend Chart + Alerts & Actions Panel -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <!-- Production Trend (2 cols) -->
          <div class="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h4 class="text-sm font-bold text-[#0F172A]">Production Trend (Last 7 Days)</h4>
                <p class="text-xs text-[#64748B] mt-0.5">Floor processing volume across active shifts</p>
              </div>
              <select class="text-xs px-2.5 py-1.5 border border-[#CBD5E1] rounded-lg bg-white text-[#0F172A] outline-none font-medium">
                <option>DFL UNIT-1 (VSP)</option>
                <option>DFL UNIT-2 (KKD)</option>
                <option>DFL UNIT-5 (JPT)</option>
              </select>
            </div>
            <div class="h-64 relative">
              <canvas id="productionChart" class="w-full h-full"></canvas>
            </div>
          </div>

          <!-- Alerts Panel (1 col) -->
          <div class="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col">
            <div class="flex items-center justify-between pb-3 border-b border-[#F1F5F9] mb-3">
              <h4 class="text-sm font-bold text-[#0F172A]">Floor Alerts & Actions</h4>
              <span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-50 text-amber-700 border border-amber-200">4 Active</span>
            </div>
            <div class="space-y-3 flex-1">
              <!-- Alert 1 -->
              <div class="p-3 rounded-xl border border-rose-200 bg-rose-50/50 flex items-start gap-3">
                <div class="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                  <i data-lucide="flask-conical" class="w-3.5 h-3.5"></i>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-xs font-bold text-[#0F172A]">CARNAL 659 S ADVANCED (STPP)</div>
                  <div class="text-[11px] text-[#64748B] mt-0.5">Stock at 1,671 bags · Reorder soon</div>
                </div>
              </div>
              <!-- Alert 2 -->
              <div class="p-3 rounded-xl border border-amber-200 bg-amber-50/50 flex items-start gap-3">
                <div class="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <i data-lucide="truck" class="w-3.5 h-3.5"></i>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-xs font-bold text-[#0F172A]">Count shortfall on AP39TT4177</div>
                  <div class="text-[11px] text-[#64748B] mt-0.5">-9.0 count difference on VM-VSP-AMP-056</div>
                </div>
              </div>
              <!-- Alert 3 -->
              <div class="p-3 rounded-xl border border-sky-200 bg-sky-50/50 flex items-start gap-3">
                <div class="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <i data-lucide="package" class="w-3.5 h-3.5"></i>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-xs font-bold text-[#0F172A]">Batch VM-KKD-MKP-043 pending transfer</div>
                  <div class="text-[11px] text-[#64748B] mt-0.5">1,186 Kgs ready for DFL UNIT-3 (PSP)</div>
                </div>
              </div>
              <!-- Alert 4 -->
              <div class="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-start gap-3">
                <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-xs font-bold text-[#0F172A]">ALTESA NEO S100 received</div>
                  <div class="text-[11px] text-[#64748B] mt-0.5">240 bags cleared at Kakinada port</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 3: Yield by Grade + Chemical Usage Charts -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div class="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h4 class="text-sm font-bold text-[#0F172A]">Yield by Grade</h4>
                <p class="text-xs text-[#64748B] mt-0.5">Target: ≥ 70% floor recovery benchmark</p>
              </div>
              <span class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-teal-50 text-teal-700 border border-teal-200">Yield Audit</span>
            </div>
            <div class="h-60 relative">
              <canvas id="yieldChart" class="w-full h-full"></canvas>
            </div>
          </div>

          <div class="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h4 class="text-sm font-bold text-[#0F172A]">Chemical Consumption (STPP)</h4>
                <p class="text-xs text-[#64748B] mt-0.5">Daily dosage logs in KGs</p>
              </div>
              <span class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-amber-50 text-amber-700 border border-amber-200">STPP Dosing</span>
            </div>
            <div class="h-60 relative">
              <canvas id="chemicalChart" class="w-full h-full"></canvas>
            </div>
          </div>
        </div>

        <!-- Quick Workflow Actions -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-3">Quick Operational Actions</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a 
              href="#/preprocessing/floor-operations/rm-received" 
              class="p-4 rounded-xl border border-slate-200/80 bg-white hover:border-[#006C7A] hover:shadow-xs transition-all flex items-center gap-3.5 group cursor-pointer"
            >
              <div class="w-10 h-10 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <i data-lucide="truck" class="w-5 h-5"></i>
              </div>
              <div>
                <h5 class="text-xs font-bold text-[#0F172A] group-hover:text-[#006C7A] transition-colors">New RM Received</h5>
                <p class="text-[11px] text-[#64748B] mt-0.5">Log incoming raw material trucks</p>
              </div>
            </a>

            <a 
              href="#/preprocessing/floor-operations/deheading" 
              class="p-4 rounded-xl border border-slate-200/80 bg-white hover:border-[#006C7A] hover:shadow-xs transition-all flex items-center gap-3.5 group cursor-pointer"
            >
              <div class="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <i data-lucide="scissors" class="w-5 h-5"></i>
              </div>
              <div>
                <h5 class="text-xs font-bold text-[#0F172A] group-hover:text-[#006C7A] transition-colors">Log Deheading</h5>
                <p class="text-[11px] text-[#64748B] mt-0.5">HON to HL conversion tracking</p>
              </div>
            </a>

            <a 
              href="#/preprocessing/floor-operations/grading" 
              class="p-4 rounded-xl border border-slate-200/80 bg-white hover:border-[#006C7A] hover:shadow-xs transition-all flex items-center gap-3.5 group cursor-pointer"
            >
              <div class="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <i data-lucide="ruler" class="w-5 h-5"></i>
              </div>
              <div>
                <h5 class="text-xs font-bold text-[#0F172A] group-hover:text-[#006C7A] transition-colors">Log Grading</h5>
                <p class="text-[11px] text-[#64748B] mt-0.5">Size classification by grade</p>
              </div>
            </a>

            <a 
              href="#/preprocessing/traceability/track-code-report" 
              class="p-4 rounded-xl border border-slate-200/80 bg-white hover:border-[#006C7A] hover:shadow-xs transition-all flex items-center gap-3.5 group cursor-pointer"
            >
              <div class="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <i data-lucide="search" class="w-5 h-5"></i>
              </div>
              <div>
                <h5 class="text-xs font-bold text-[#0F172A] group-hover:text-[#006C7A] transition-colors">Track a Batch</h5>
                <p class="text-[11px] text-[#64748B] mt-0.5">Full batch genealogy audit</p>
              </div>
            </a>
          </div>
        </div>

      </div>
    `;

    setTimeout(() => {
      this.drawDashboardCharts();
    }, 60);
  },

  drawDashboardCharts() {
    // 1. Production Trend
    const c1 = document.getElementById('productionChart');
    if (c1 && c1.parentElement) {
      const dpr = window.devicePixelRatio || 1;
      const rect = c1.parentElement.getBoundingClientRect();
      c1.width = rect.width * dpr;
      c1.height = rect.height * dpr;
      const ctx = c1.getContext('2d');
      ctx.scale(dpr, dpr);

      const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const data = [3200, 4100, 3800, 4500, 5200, 4800, 5600];
      const maxVal = 6500;
      const padLeft = 45, padRight = 20, padTop = 20, padBottom = 30;
      const chartW = rect.width - padLeft - padRight;
      const chartH = rect.height - padTop - padBottom;

      ctx.strokeStyle = '#f1f5f9';
      ctx.lineWidth = 1;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10.5px Inter, sans-serif';
      ctx.textAlign = 'right';

      for (let i = 0; i <= 4; i++) {
        const yVal = Math.round((maxVal / 4) * i);
        const y = padTop + chartH - (i / 4) * chartH;
        ctx.beginPath();
        ctx.moveTo(padLeft, y);
        ctx.lineTo(rect.width - padRight, y);
        ctx.stroke();
        ctx.fillText(yVal.toLocaleString(), padLeft - 8, y + 3);
      }

      const points = data.map((val, idx) => {
        const x = padLeft + (idx / (data.length - 1)) * chartW;
        const y = padTop + chartH - (val / maxVal) * chartH;
        return { x, y };
      });

      const grad = ctx.createLinearGradient(0, padTop, 0, rect.height - padBottom);
      grad.addColorStop(0, 'rgba(20, 184, 166, 0.35)');
      grad.addColorStop(1, 'rgba(20, 184, 166, 0.00)');

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      points.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(points[points.length - 1].x, padTop + chartH);
      ctx.lineTo(points[0].x, padTop + chartH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      points.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = '#14b8a6';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.textAlign = 'center';
      points.forEach((p, idx) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#14b8a6';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.fillStyle = '#64748b';
        ctx.fillText(labels[idx], p.x, rect.height - 8);
      });
    }

    // 2. Yield By Grade
    const c2 = document.getElementById('yieldChart');
    if (c2 && c2.parentElement) {
      const dpr = window.devicePixelRatio || 1;
      const rect = c2.parentElement.getBoundingClientRect();
      c2.width = rect.width * dpr;
      c2.height = rect.height * dpr;
      const ctx = c2.getContext('2d');
      ctx.scale(dpr, dpr);

      const data = [
        { grade: '16/20', yield: 72 },
        { grade: '21/25', yield: 70 },
        { grade: '26/30', yield: 68 },
        { grade: '31/40', yield: 65 },
        { grade: '41/50', yield: 62 },
        { grade: '51/60', yield: 60 }
      ];
      const maxYield = 80;
      const padLeft = 35, padRight = 15, padTop = 25, padBottom = 30;
      const chartW = rect.width - padLeft - padRight;
      const chartH = rect.height - padTop - padBottom;
      const barWidth = Math.min(36, (chartW / data.length) * 0.55);

      ctx.strokeStyle = '#f1f5f9';
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'right';

      [0, 20, 40, 60, 80].forEach(val => {
        const y = padTop + chartH - (val / maxYield) * chartH;
        ctx.beginPath();
        ctx.moveTo(padLeft, y);
        ctx.lineTo(rect.width - padRight, y);
        ctx.stroke();
        ctx.fillText(val + '%', padLeft - 6, y + 3);
      });

      ctx.textAlign = 'center';
      data.forEach((item, idx) => {
        const xCenter = padLeft + (idx + 0.5) * (chartW / data.length);
        const barH = (item.yield / maxYield) * chartH;
        const y = padTop + chartH - barH;

        const barGrad = ctx.createLinearGradient(0, y, 0, y + barH);
        barGrad.addColorStop(0, '#14b8a6');
        barGrad.addColorStop(1, '#0f766e');

        ctx.fillStyle = barGrad;
        ctx.fillRect(xCenter - barWidth/2, y, barWidth, barH);

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 10px Inter, sans-serif';
        ctx.fillText(item.yield + '%', xCenter, y - 6);

        ctx.fillStyle = '#64748b';
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText(item.grade, xCenter, rect.height - 8);
      });
    }

    // 3. Chemical Usage
    const c3 = document.getElementById('chemicalChart');
    if (c3 && c3.parentElement) {
      const dpr = window.devicePixelRatio || 1;
      const rect = c3.parentElement.getBoundingClientRect();
      c3.width = rect.width * dpr;
      c3.height = rect.height * dpr;
      const ctx = c3.getContext('2d');
      ctx.scale(dpr, dpr);

      const dates = ['05-Feb', '06-Feb', '07-Feb', '08-Feb', '09-Feb', '10-Feb', '11-Feb'];
      const values = [750, 500, 500, 600, 450, 700, 550];
      const maxVal = 900;
      const padLeft = 40, padRight = 15, padTop = 25, padBottom = 30;
      const chartW = rect.width - padLeft - padRight;
      const chartH = rect.height - padTop - padBottom;
      const barWidth = Math.min(30, (chartW / dates.length) * 0.55);

      ctx.strokeStyle = '#f1f5f9';
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'right';

      [0, 300, 600, 900].forEach(val => {
        const y = padTop + chartH - (val / maxVal) * chartH;
        ctx.beginPath();
        ctx.moveTo(padLeft, y);
        ctx.lineTo(rect.width - padRight, y);
        ctx.stroke();
        ctx.fillText(val + ' kg', padLeft - 6, y + 3);
      });

      ctx.textAlign = 'center';
      values.forEach((val, idx) => {
        const xCenter = padLeft + (idx + 0.5) * (chartW / dates.length);
        const barH = (val / maxVal) * chartH;
        const y = padTop + chartH - barH;

        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(xCenter - barWidth/2, y, barWidth, barH);

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 9.5px Inter, sans-serif';
        ctx.fillText(val.toString(), xCenter, y - 6);

        ctx.fillStyle = '#64748b';
        ctx.font = '9.5px Inter, sans-serif';
        ctx.fillText(dates[idx], xCenter, rect.height - 8);
      });
    }
  },

  // ============================================
  // 2. FLOOR OPERATIONS (7 SCREENS)
  // ============================================

  // 2.1 RM Received Trackid
  renderRmReceived(container) {
    container.innerHTML = `
      <div class="form-card">
        <form onsubmit="event.preventDefault(); window.PreprocessingView.toastSuccess('Track ID saved successfully');">
          <div class="form-grid">
            <div class="form-group">
              <label>Production Plant <span class="req">*</span></label>
              <select required>
                <option>VSP - DFL UNIT-1 (VSP)</option>
                <option>KKD - DFL UNIT-2 (KKD)</option>
                <option>JPT - DFL UNIT-5 (JPT)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Arrival Date</label>
              <input type="date" value="2025-10-13">
            </div>
            <div class="form-group">
              <label>Vehicle Number <span class="req">*</span></label>
              <select required onchange="document.getElementById('rm-track-input').value = this.value">
                <option value="VM-VSP-AVN-034">AP05TM2628 - VM-VSP-AVN-034</option>
                <option value="VM-VSP-SKM-054">AP39UF7171 - VM-VSP-SKM-054</option>
                <option value="VM-VSP-SKM-055">AP39TT4299 - VM-VSP-SKM-055</option>
              </select>
            </div>
            <div class="form-group">
              <label>Track Code Format <span class="req">*</span></label>
              <input type="text" id="rm-track-input" value="VM-VSP-AVN-034" readonly>
            </div>
            <div class="form-group">
              <label>Seal Number <span class="req">*</span></label>
              <input type="text" value="55260" required>
            </div>
            <div class="form-group">
              <label>Supervisor <span class="req">*</span></label>
              <select required>
                <option>J.PRASAD</option>
                <option>K VENKATA VINAY</option>
                <option>T.VENKATESH</option>
              </select>
            </div>
            <div class="form-group col-span-2">
              <label>Remarks</label>
              <textarea placeholder="Enter Remarks"></textarea>
            </div>
          </div>
          <div class="form-actions-row centered">
            <button type="submit" class="btn btn-primary" style="padding:10px 32px;"><i data-lucide="save" class="w-4 h-4"></i> Save</button>
          </div>
        </form>
      </div>

      <div class="table-card">
        <div class="table-header">
          <div class="table-search-box">
            <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"></i>
            <input type="text" class="table-search" placeholder="Search bill or variety...">
          </div>
          <div class="table-actions-right">
            <button class="btn btn-outline" onclick="window.PreprocessingView.toastInfo('Downloading Excel report...')"><i data-lucide="download" class="w-3.5 h-3.5"></i> Download Excel</button>
          </div>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Bill No</th>
                <th>Variety</th>
                <th>Count</th>
                <th>Head on Weight</th>
                <th>Recv Count</th>
                <th>Recv Weight</th>
                <th>Sample HO Qty</th>
                <th>No Of Pcs</th>
                <th>Count Diff</th>
                <th>Qty Diff</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>AVN/2526/0001</td>
                <td>VM-HEAD ON</td>
                <td><input type="text" class="tbl-input" value="63.000" readonly></td>
                <td><input type="text" class="tbl-input" value="309.000" readonly></td>
                <td><input type="number" class="tbl-input" value="60.000" oninput="window.PreprocessingView.calcDiff(this, 63, 'diff-1')"></td>
                <td><input type="number" class="tbl-input" value="309"></td>
                <td><input type="number" class="tbl-input" value="5.000"></td>
                <td><input type="number" class="tbl-input" value="300"></td>
                <td><span id="diff-1" class="diff-negative">-3</span></td>
                <td>0</td>
                <td><button class="btn btn-sm btn-secondary" onclick="window.PreprocessingView.toastInfo('Row updated')"><i data-lucide="pencil" class="w-3.5 h-3.5"></i></button></td>
              </tr>
              <tr>
                <td>2</td>
                <td>AVN/2526/0001</td>
                <td>VM-HEAD ON</td>
                <td><input type="text" class="tbl-input" value="68.000" readonly></td>
                <td><input type="text" class="tbl-input" value="402.000" readonly></td>
                <td><input type="number" class="tbl-input" value="67.800" oninput="window.PreprocessingView.calcDiff(this, 68, 'diff-2')"></td>
                <td><input type="number" class="tbl-input" value="402"></td>
                <td><input type="number" class="tbl-input" value="5.000"></td>
                <td><input type="number" class="tbl-input" value="339"></td>
                <td><span id="diff-2" class="diff-negative">-0.2</span></td>
                <td>0</td>
                <td><button class="btn btn-sm btn-secondary" onclick="window.PreprocessingView.toastInfo('Row updated')"><i data-lucide="pencil" class="w-3.5 h-3.5"></i></button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 2.2 Deheading
  renderDeheading(container) {
    container.innerHTML = `
      <div class="form-card">
        <form onsubmit="event.preventDefault(); window.PreprocessingView.toastSuccess('Deheading record saved');">
          <div class="form-grid">
            <div class="form-group">
              <label>Arrival Date</label>
              <input type="date" value="2026-10-14">
            </div>
            <div class="form-group">
              <label>Arrival/Lot Code <span class="req">*</span></label>
              <select required>
                <option>Melting</option>
                <option>Fresh</option>
              </select>
            </div>
            <div class="form-group">
              <label>Production Plant <span class="req">*</span></label>
              <select required>
                <option>VSP-DFL UNIT-1 (VSP)</option>
                <option>KKD-DFL UNIT-2 (KKD)</option>
              </select>
            </div>
            <div class="form-group">
              <label>De Heading Station <span class="req">*</span></label>
              <select required>
                <option>Own Center</option>
                <option>Outside Center</option>
              </select>
            </div>
            <div class="form-group">
              <label>De Heading Date <span class="req">*</span></label>
              <input type="date" value="2026-10-14" required>
            </div>
            <div class="form-group">
              <label>Select Shift <span class="req">*</span></label>
              <select required>
                <option>A SHIFT</option>
                <option>B SHIFT</option>
                <option>C SHIFT</option>
              </select>
            </div>
            <div class="form-group">
              <label>Supervisor <span class="req">*</span></label>
              <select required>
                <option>K VENKATA VINAY</option>
                <option>T.VENKATESH</option>
                <option>D.SURYA NARAYANA</option>
              </select>
            </div>
            <div class="form-group">
              <label>Headon Count After Checking (Count-2) <span class="req">*</span></label>
              <input type="number" placeholder="Enter Count" required>
            </div>
            <div class="form-group">
              <label>Sample Yield (%)</label>
              <input type="number" step="0.1" id="dh-yield" placeholder="e.g. 70">
            </div>
            <div class="form-group">
              <label>Ice Consumption (Kgs)</label>
              <input type="number" placeholder="Ice Kgs">
            </div>
            <div class="form-group col-span-2">
              <label>Remarks</label>
              <textarea placeholder="Enter Remarks(Optional)"></textarea>
            </div>
            <div class="form-group">
              <label>HON Quantity(Kgs) <span class="req">*</span></label>
              <input type="number" step="0.1" id="dh-hon-qty" placeholder="HON Kgs" required oninput="window.PreprocessingView.calcDeheadYield()">
            </div>
            <div class="form-group">
              <label>HL Count (Per Kg) <span class="req">*</span></label>
              <input type="number" step="0.01" placeholder="HL Count" required>
            </div>
            <div class="form-group">
              <label>HL Quantity(Kgs) <span class="req">*</span></label>
              <input type="number" step="0.1" id="dh-hl-qty" placeholder="HL Kgs" required oninput="window.PreprocessingView.calcDeheadYield()">
            </div>
            <div class="form-group">
              <label>HON Count (Per Kg)</label>
              <input type="number" step="0.01" placeholder="HON Count">
            </div>
          </div>
          <div class="form-actions-row">
            <button type="button" class="btn btn-secondary" onclick="this.form.reset(); window.PreprocessingView.toastInfo('New record created');"><i data-lucide="plus" class="w-3.5 h-3.5"></i> New</button>
            <button type="submit" class="btn btn-primary"><i data-lucide="save" class="w-4 h-4"></i> Save</button>
          </div>
        </form>
      </div>

      <div class="table-card">
        <div class="table-header">
          <div class="table-search-box">
            <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"></i>
            <input type="text" class="table-search" placeholder="Search deheading logs...">
          </div>
          <div class="table-actions-right">
            <button class="btn btn-outline" onclick="window.PreprocessingView.toastInfo('Downloading Excel...')"><i data-lucide="download" class="w-3.5 h-3.5"></i> Download Excel</button>
          </div>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th class="sortable">S.No ▲</th>
                <th>Arrival Code</th>
                <th>Production Plant</th>
                <th>Center</th>
                <th>De Heading Date</th>
                <th>Shift</th>
                <th>SuperVisor</th>
                <th>Checking Count-2</th>
                <th>HL Count</th>
                <th>HON Count</th>
                <th>HON Quantity(Kgs)</th>
                <th>HL Quantity(Kgs)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="12" class="empty-cell">No data available in table</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 2.3 Grading
  renderGrading(container) {
    container.innerHTML = `
      <div class="form-card">
        <form onsubmit="event.preventDefault(); window.PreprocessingView.toastSuccess('Grading record saved');">
          <div class="form-grid">
            <div class="form-group">
              <label>Arrival Date <span class="req">*</span></label>
              <input type="date" value="2026-10-14" required>
            </div>
            <div class="form-group">
              <label>Arrival/Lot Code <span class="req">*</span></label>
              <input type="text" placeholder="Enter Arrival/Lot Code" required>
            </div>
            <div class="form-group">
              <label>Production Plant <span class="req">*</span></label>
              <select required>
                <option>Select</option>
                <option selected>VSP-DFL UNIT-1 (VSP)</option>
                <option>KKD-DFL UNIT-2 (KKD)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Grading Station <span class="req">*</span></label>
              <select required>
                <option>Select</option>
                <option>Station 1</option>
                <option>Station 2</option>
              </select>
            </div>
            <div class="form-group">
              <label>Grading Date <span class="req">*</span></label>
              <input type="date" value="2026-10-14" required>
            </div>
            <div class="form-group">
              <label>Select</label>
              <select><option>Select</option></select>
            </div>
            <div class="form-group">
              <label>Start Time <span class="req">*</span></label>
              <input type="time" value="08:00" required>
            </div>
            <div class="form-group">
              <label>End Time <span class="req">*</span></label>
              <input type="time" value="16:00" required>
            </div>
            <div class="form-group">
              <label>Break Time(Minutes) <span class="req">*</span></label>
              <input type="number" value="30" required>
            </div>
            <div class="form-group col-span-3">
              <label>Remarks</label>
              <textarea placeholder="Enter Remarks"></textarea>
            </div>
            <div class="form-group">
              <label>Select Variety <span class="req">*</span></label>
              <select required>
                <option>Select</option>
                <option selected>VM-HEAD ON</option>
                <option>VM-HLSO</option>
              </select>
            </div>
            <div class="form-group">
              <label>HL Count(Per LB)</label>
              <input type="number" placeholder="Enter HL Count">
            </div>
            <div class="form-group">
              <label>HL Weight(Kgs)</label>
              <input type="number" step="0.1" placeholder="Enter HL Weight(Kgs)">
            </div>
            <div class="form-group">
              <label>No Of Crates</label>
              <input type="number" placeholder="Enter No Of Crates">
            </div>
          </div>
          <div class="form-actions-row">
            <button type="button" class="btn btn-secondary" onclick="this.form.reset(); window.PreprocessingView.toastInfo('New record created');"><i data-lucide="plus" class="w-3.5 h-3.5"></i> New</button>
            <button type="button" class="btn btn-danger" onclick="window.PreprocessingView.toastError('Record deleted');"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Delete</button>
            <button type="submit" class="btn btn-primary"><i data-lucide="save" class="w-4 h-4"></i> Save</button>
          </div>
        </form>
      </div>
    `;
  },

  // 2.4 De-Heading Trackid
  renderDeheadingTrackid(container) {
    container.innerHTML = `
      <div class="form-card">
        <form onsubmit="event.preventDefault(); window.PreprocessingView.toastSuccess('De-heading track saved');">
          <div class="form-grid">
            <div class="form-group">
              <label>Production Plant <span class="req">*</span></label>
              <select required>
                <option>VSP-DFL UNIT-1 (VSP)</option>
                <option>KKD-DFL UNIT-2 (KKD)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Arrival Date <span class="req">*</span></label>
              <input type="date" value="2025-10-14" required>
            </div>
            <div class="form-group">
              <label>Track ID <span class="req">*</span></label>
              <select required>
                <option>VM-VSP-KKD-036</option>
                <option>VM-VSP-SKM-054</option>
                <option>VM-VSP-AMP-056</option>
              </select>
            </div>
            <div class="form-group">
              <label>De Heading Date <span class="req">*</span></label>
              <input type="date" value="2025-10-15" required>
            </div>
            <div class="form-group">
              <label>Shift <span class="req">*</span></label>
              <select required>
                <option>A SHIFT</option>
                <option>B SHIFT</option>
                <option>C SHIFT</option>
              </select>
            </div>
            <div class="form-group">
              <label>Supervisor <span class="req">*</span></label>
              <select required>
                <option>T.VENKATESH</option>
                <option>K VENKATA VINAY</option>
              </select>
            </div>
            <div class="form-group col-span-2">
              <label>Remarks</label>
              <textarea placeholder="Enter Remarks"></textarea>
            </div>
          </div>

          <div style="margin: 14px 0 6px; text-align: center; color: var(--danger); font-weight: 600; font-size: 13px;">
            Grading Plant → VSP - DFL UNIT-1 (VSP)
          </div>

          <div class="form-actions-row centered">
            <button type="submit" class="btn btn-primary" style="padding:10px 32px;"><i data-lucide="save" class="w-4 h-4"></i> Save</button>
          </div>
        </form>
      </div>

      <div class="table-card">
        <div class="table-header">
          <div class="table-search-box">
            <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"></i>
            <input type="text" class="table-search" placeholder="Search bill or variety...">
          </div>
          <div class="table-actions-right">
            <button class="btn btn-outline" onclick="window.PreprocessingView.toastInfo('Downloading Excel...')"><i data-lucide="download" class="w-3.5 h-3.5"></i> Download Excel</button>
          </div>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Bill No</th>
                <th>Variety</th>
                <th>Count</th>
                <th>Weight</th>
                <th>Sample HO Qty</th>
                <th>Count / No of Pcs</th>
                <th>Sample HL Qty / Body Yield</th>
                <th>Yield (%)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>KKD/2526/1254</td>
                <td>HEAD ON</td>
                <td><input type="text" class="tbl-input" value="60.000" readonly></td>
                <td><input type="text" class="tbl-input" value="1748.0" readonly></td>
                <td><input type="number" class="tbl-input" value="5.00"></td>
                <td><input type="number" class="tbl-input" value="303.00"></td>
                <td><input type="number" class="tbl-input" value="3.50"></td>
                <td><span class="badge badge-teal">70%</span></td>
                <td><button class="btn btn-sm btn-secondary" onclick="window.PreprocessingView.toastInfo('Row updated')"><i data-lucide="pencil" class="w-3.5 h-3.5"></i></button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 2.5 Grading Trackid
  renderGradingTrackid(container) {
    container.innerHTML = `
      <div class="form-card">
        <form onsubmit="event.preventDefault(); window.PreprocessingView.toastSuccess('Grading saved');">
          <div class="form-grid">
            <div class="form-group">
              <label>Production Plant <span class="req">*</span></label>
              <select required>
                <option>VSP-DFL UNIT-1 (VSP)</option>
                <option>KKD-DFL UNIT-2 (KKD)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Arrival Date <span class="req">*</span></label>
              <input type="date" value="2025-10-14" required>
            </div>
            <div class="form-group">
              <label>Track ID <span class="req">*</span></label>
              <select class="error" required title="Selection mandatory">
                <option value="VM-VSP-KKD-036">VM-VSP-KKD-036</option>
                <option value="VM-VSP-SKM-054">VM-VSP-SKM-054</option>
              </select>
            </div>
            <div class="form-group">
              <label>Receiving Count <span class="req">*</span></label>
              <input type="number" value="372" required>
            </div>
            <div class="form-group">
              <label>Grading Date <span class="req">*</span></label>
              <input type="date" value="2026-10-14" required>
            </div>
            <div class="form-group">
              <label>Grading Machine <span class="req">*</span></label>
              <select class="error" required title="Machine assignment required">
                <option>Unit -1 Roller Grading Machine</option>
                <option>Unit -2 Grading Machine</option>
              </select>
            </div>
            <div class="form-group">
              <label>Start Time</label>
              <input type="time" value="08:00">
            </div>
            <div class="form-group">
              <label>End Time</label>
              <input type="time" value="16:00">
            </div>
            <div class="form-group">
              <label>Break Time(Minutes)</label>
              <input type="number" value="30">
            </div>
            <div class="form-group">
              <label>Supervisor <span class="req">*</span></label>
              <select required>
                <option>Select</option>
                <option selected>K VENKATA VINAY</option>
                <option>T.VENKATESH</option>
              </select>
            </div>
            <div class="form-group col-span-2">
              <label>Remarks</label>
              <textarea placeholder="Enter Remarks"></textarea>
            </div>
          </div>
          <div class="form-actions-row">
            <button type="button" class="btn btn-info" onclick="window.PreprocessingView.toastInfo('Line added');">+ Add Line</button>
            <button type="button" class="btn btn-danger" onclick="window.PreprocessingView.toastError('Line deleted');"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Delete</button>
            <button type="submit" class="btn btn-primary">Save Grading</button>
          </div>
        </form>
      </div>
    `;
  },

  // 2.6 Value Addition Trackid
  renderValueAddition(container) {
    container.innerHTML = `
      <div class="form-card">
        <form onsubmit="event.preventDefault(); window.PreprocessingView.toastSuccess('Value Addition saved');">
          <div class="form-grid">
            <div class="form-group">
              <label>Production Plant <span class="req">*</span></label>
              <select required>
                <option>VSP-DFL UNIT-1 (VSP)</option>
                <option>KKD-DFL UNIT-2 (KKD)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Arrival Date <span class="req">*</span></label>
              <input type="date" value="2025-02-14" required>
            </div>
            <div class="form-group">
              <label>Track ID <span class="req">*</span></label>
              <select required>
                <option>VM-VSP-SKM-030</option>
                <option>VM-VSP-KKD-036</option>
              </select>
            </div>
            <div class="form-group">
              <label>Value Addition Date <span class="req">*</span></label>
              <input type="date" value="2025-02-15" required>
            </div>
            <div class="form-group">
              <label>Shift <span class="req">*</span></label>
              <select required>
                <option>A SHIFT</option>
                <option>B SHIFT</option>
              </select>
            </div>
            <div class="form-group">
              <label>Supervisor <span class="req">*</span></label>
              <select required>
                <option>S.BALA KRISHNA</option>
                <option>D.SURYA NARAYANA</option>
              </select>
            </div>
            <div class="form-group">
              <label>HL Count <span class="req">*</span></label>
              <select required>
                <option>Select</option>
                <option selected>14.00</option>
                <option>20.00</option>
              </select>
            </div>
            <div class="form-group">
              <label>Totals () <span class="req">*</span></label>
              <input type="text" value="Balance" readonly>
            </div>
            <div class="form-group">
              <label>Variety <span class="req">*</span></label>
              <select required>
                <option>VM RHLSO</option>
                <option>VM PVPD</option>
                <option selected>VM RPD</option>
              </select>
            </div>
            <div class="form-group">
              <label>HL WT (KGS) <span class="req">*</span></label>
              <input type="number" step="0.1" value="27" required>
            </div>
            <div class="form-group">
              <label>Crates <span class="req">*</span></label>
              <input type="number" value="4" required>
            </div>
            <div class="form-group">
              <label>VA Out Quantity</label>
              <input type="number" step="0.1" placeholder="Enter VAOutQuantity">
            </div>
          </div>
          <div class="form-actions-row">
            <button type="button" class="btn btn-danger" onclick="window.PreprocessingView.toastError('Cancelled');">Cancel</button>
            <button type="button" class="btn btn-info" onclick="window.PreprocessingView.toastInfo('Transfer initiated');">Transfer to Another Plant</button>
            <button type="submit" class="btn btn-primary"><i data-lucide="save" class="w-4 h-4"></i> Save</button>
          </div>
        </form>
      </div>

      <div class="table-card">
        <div class="table-header">
          <div class="table-search-box">
            <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"></i>
            <input type="text" class="table-search" placeholder="Search batch or plant...">
          </div>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th><input type="checkbox"></th>
                <th>S.No</th>
                <th>Arrival Code</th>
                <th>Production Plant</th>
                <th>Soaking Plant</th>
                <th>Transaction Date</th>
                <th>Shift</th>
                <th>Variety</th>
                <th>HL Wt(Kgs)</th>
                <th>HL Count</th>
                <th>No of Crates</th>
                <th>VA Out Quantity</th>
                <th>Rejection Weight</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox"></td>
                <td>1</td>
                <td>SKM/2425/1478</td>
                <td>DFL UNIT-1 (VSP)</td>
                <td style="color:var(--danger);font-weight:600;">DFL UNIT-1 (VSP)</td>
                <td>15-02-2025</td>
                <td>A SHIFT</td>
                <td>VM RPD</td>
                <td>5.700</td>
                <td>14.00</td>
                <td>1</td>
                <td>5.000</td>
                <td>0.000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 2.7 Hon Qty Transfer After VA
  renderHonQtyTransfer(container) {
    container.innerHTML = `
      <div class="form-card">
        <form onsubmit="event.preventDefault(); window.PreprocessingView.toastSuccess('Transfer submitted');">
          <div class="form-grid">
            <div class="form-group">
              <label>Production Plant <span class="req">*</span></label>
              <select required>
                <option>USHA-DFL UNIT-2 (KKD)</option>
                <option>VSP-DFL UNIT-1 (VSP)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Arrival Date <span class="req">*</span></label>
              <input type="date" value="2025-10-14" required>
            </div>
            <div class="form-group">
              <label>Track ID <span class="req">*</span></label>
              <select required>
                <option>VM-KKD-MKP-043</option>
                <option>VM-VSP-SKM-054</option>
              </select>
            </div>
            <div class="form-group">
              <label>Arrival Code <span class="req">*</span></label>
              <select required>
                <option>MKP/2526/1397 Mix (56.00, 60.00, 62.00)</option>
              </select>
            </div>
            <div class="form-group">
              <label>HON Count <span class="req">*</span></label>
              <select required>
                <option>Select</option>
                <option selected>56.00</option>
                <option>60.00</option>
              </select>
            </div>
            <div class="form-group">
              <label>HON Weight <span class="req">*</span></label>
              <input type="number" step="0.1" value="1783.4" required>
            </div>
            <div class="form-group">
              <label>Weight <span class="req">*</span></label>
              <input type="number" step="0.1" value="1783.4" required>
            </div>
            <div class="form-group">
              <label>Transfer Plant <span class="req">*</span></label>
              <select required>
                <option>Select</option>
                <option>DFL UNIT-1 (VSP)</option>
                <option selected>DFL UNIT-3 (PSP)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Transfer Date <span class="req">*</span></label>
              <input type="date" value="2026-10-14" required>
            </div>
          </div>
          <div class="form-actions-row">
            <button type="button" class="btn btn-danger" onclick="window.PreprocessingView.toastError('Closed');">Close</button>
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>

      <div class="table-card">
        <div class="table-header">
          <div class="table-search-box">
            <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"></i>
            <input type="text" class="table-search" placeholder="Search bill or plant...">
          </div>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th class="sortable">S.No ▲</th>
                <th>Arrival Date</th>
                <th>Bill Date</th>
                <th>Bill Number</th>
                <th>Production Plant</th>
                <th>Purchase Count</th>
                <th>Purchase Weight</th>
                <th>Rm Production plant</th>
                <th>Transfer Date</th>
                <th>VA Weight Qty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>14-10-2025</td>
                <td>13-10-2025</td>
                <td>MKP/2526/1397</td>
                <td>DFL UNIT-2 (KKD)</td>
                <td>56.000</td>
                <td>1783.400</td>
                <td>DFL UNIT-3 (PSP)</td>
                <td>15-10-2025</td>
                <td>1186.000</td>
                <td><button class="btn btn-sm btn-danger" onclick="window.PreprocessingView.toastError('Record deleted');"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // ============================================
  // 3. CHEMICAL INVENTORY & USAGE (7 SCREENS)
  // ============================================

  // 3.1 Chemical Pos
  renderChemicalPos(container) {
    container.innerHTML = `
      <div class="form-card">
        <form onsubmit="event.preventDefault(); window.PreprocessingView.toastInfo('Search executed');">
          <div class="form-grid">
            <div class="form-group">
              <label>Supplier</label>
              <select>
                <option>All</option>
                <option>KPL INTERNATIONAL LTD</option>
                <option>ADWIK IMPEX</option>
              </select>
            </div>
            <div class="form-group">
              <label>PO No</label>
              <select>
                <option>All</option>
                <option>DFL/KPL/2627/004</option>
              </select>
            </div>
            <div class="form-group">
              <label>Chemical</label>
              <select>
                <option>All</option>
                <option>ALTESA NEO S100 (NP)</option>
                <option>CARNAL 659 S ADVANCED (STPP)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Port</label>
              <select>
                <option>All</option>
                <option>INPRT - PARADIP GARH</option>
                <option>INKAK1 - KAKINADA</option>
              </select>
            </div>
            <div class="form-group">
              <label>Year</label>
              <select>
                <option>2026-27</option>
                <option>2025-26</option>
              </select>
            </div>
          </div>
          <div class="form-actions-row">
            <button type="button" class="btn btn-primary" onclick="window.PreprocessingView.openChemPOModal()">+ Add PO</button>
            <button type="submit" class="btn btn-search">Search →</button>
          </div>
        </form>
      </div>

      <div class="table-card">
        <div class="table-header">
          <div class="table-search-box">
            <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"></i>
            <input type="text" class="table-search" placeholder="Search supplier, PO or chemical...">
          </div>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Supplier Name</th>
                <th>PoNo</th>
                <th>PO Date</th>
                <th>Chemicals</th>
                <th>Port Name</th>
                <th>Mode of Import</th>
                <th>Quantity(Bags)</th>
                <th>Quantity(KGs)</th>
                <th>Total Amount</th>
                <th>ETD Date</th>
                <th>ETA Date</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>KPL INTERNATIONAL LTD</td>
                <td>DFL/KPL/2627/004</td>
                <td>06-10-2026</td>
                <td>-</td>
                <td>INPRT - PARADIP GARH</td>
                <td>HSS</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td><i data-lucide="pencil" class="w-3.5 h-3.5"></i> <button class="p-1 hover:bg-slate-100 rounded text-teal-600 hover:text-teal-800" title="Add"><i data-lucide="plus" class="w-3.5 h-3.5"></i></button><button class="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-800" title="Print"><i data-lucide="printer" class="w-3.5 h-3.5"></i></button></td>
              </tr>
              <tr>
                <td>2</td>
                <td>ADWIK IMPEX</td>
                <td>DFL//2627/003</td>
                <td>25-09-2026</td>
                <td>-</td>
                <td>INKAK1 - KAKINADA</td>
                <td>HSS</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>30-09-2026</td>
                <td>29-10-2026</td>
                <td>no</td>
                <td><i data-lucide="pencil" class="w-3.5 h-3.5"></i> <button class="p-1 hover:bg-slate-100 rounded text-teal-600 hover:text-teal-800" title="Add"><i data-lucide="plus" class="w-3.5 h-3.5"></i></button><button class="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-800" title="Print"><i data-lucide="printer" class="w-3.5 h-3.5"></i></button></td>
              </tr>
              <tr>
                <td>3</td>
                <td>KPL INTERNATIONAL LTD</td>
                <td>DFL/KPL/2627/003</td>
                <td>07-09-2026</td>
                <td>ALTESA NEO S100 (NP)</td>
                <td>-</td>
                <td>HSS_BOND</td>
                <td>240</td>
                <td>4800</td>
                <td>₹8,68,800</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td><i data-lucide="pencil" class="w-3.5 h-3.5"></i> <button class="p-1 hover:bg-slate-100 rounded text-teal-600 hover:text-teal-800" title="Add"><i data-lucide="plus" class="w-3.5 h-3.5"></i></button><button class="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-800" title="Print"><i data-lucide="printer" class="w-3.5 h-3.5"></i></button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 3.2 Received Chemicals
  renderReceivedChemicals(container) {
    container.innerHTML = `
      <div class="form-card">
        <form onsubmit="event.preventDefault(); window.PreprocessingView.toastInfo('Search executed');">
          <div class="form-grid grid-3col">
            <div class="form-group">
              <label>Plant</label>
              <select>
                <option>DFL UNIT-5 (JPT)</option>
                <option>DFL UNIT-1 (VSP)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Status</label>
              <select>
                <option>Pending</option>
                <option>Received</option>
                <option>All</option>
              </select>
            </div>
            <div class="form-group">
              <label>Year</label>
              <select>
                <option>2025-26</option>
                <option>2026-27</option>
              </select>
            </div>
          </div>
          <div class="form-actions-row">
            <button type="button" class="btn btn-primary" onclick="window.PreprocessingView.openChemOrderModal()">+ Add Order</button>
            <button type="submit" class="btn btn-search">Search →</button>
          </div>
        </form>
      </div>

      <div class="table-card">
        <div class="table-header">
          <div class="table-search-box">
            <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"></i>
            <input type="text" class="table-search" placeholder="Search chemical, PO or BL...">
          </div>
          <div class="table-actions-right">
            <button class="btn btn-sm btn-secondary" onclick="window.PreprocessingView.toastInfo('Loading full registry...')">Load All</button>
            <button class="btn btn-outline" onclick="window.PreprocessingView.toastInfo('Exporting to Excel...')"><i data-lucide="download" class="w-3.5 h-3.5"></i> Download Excel</button>
          </div>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th class="sortable">S.NO ▲</th>
                <th>PoNo</th>
                <th>Chemical</th>
                <th>BL No</th>
                <th>Container No</th>
                <th>Received Bags</th>
                <th>Received Quantity</th>
                <th>Bill of Entry No</th>
                <th>Bill of Entry Date</th>
                <th>Cleared Date</th>
                <th>Balance Bags</th>
                <th>Balance Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>DFL/BC/2526/008</td>
                <td>CARFOSEL B 940 (STPP)</td>
                <td>DFL/BC/2526/02</td>
                <td>DFL/BC/2526/02</td>
                <td>787</td>
                <td>19675</td>
                <td>DFL/BC/2526/02</td>
                <td>02-08-2025</td>
                <td>02-08-2025</td>
                <td>13</td>
                <td>325</td>
                <td><span class="badge badge-pending">PENDING</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>DFL/KPL/2526/003</td>
                <td>ALTESA BT2 (NP)</td>
                <td>2195420</td>
                <td>2195420</td>
                <td>1080</td>
                <td>21600</td>
                <td>2195420</td>
                <td>21-05-2025</td>
                <td>23-05-2025</td>
                <td>800</td>
                <td>20000</td>
                <td><span class="badge badge-pending">PENDING</span></td>
              </tr>
              <tr>
                <td>3</td>
                <td>DFL/CFB/2425/003</td>
                <td>CARNAL 659 S ADVANCED (STPP)</td>
                <td>250506660011</td>
                <td>CARNAL1-9, TGCU2314437</td>
                <td>3200</td>
                <td>80000</td>
                <td>2141353</td>
                <td>19-05-2025</td>
                <td>27-05-2025</td>
                <td>1600</td>
                <td>40000</td>
                <td><span class="badge badge-pending">PENDING</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 3.3 Chemicals Consumption
  renderChemicalsConsumption(container) {
    container.innerHTML = `
      <div class="form-card">
        <form onsubmit="event.preventDefault(); window.PreprocessingView.toastInfo('Search executed');">
          <div class="form-grid">
            <div class="form-group">
              <label>Plant</label>
              <select>
                <option>DFL UNIT-5 (JPT)</option>
                <option>DFL UNIT-1 (VSP)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Chemical</label>
              <select>
                <option>CARNAL 659 S ADVANCED (STPP)</option>
                <option>CARFOSEL B 940 (STPP)</option>
                <option>ALTESA BT2 (NP)</option>
              </select>
            </div>
            <div class="form-group">
              <label>From Date</label>
              <input type="date" value="2025-02-05">
            </div>
            <div class="form-group">
              <label>To Date</label>
              <input type="date" value="2025-02-28">
            </div>
          </div>
          <div class="form-actions-row">
            <button type="button" class="btn btn-primary" onclick="window.PreprocessingView.openChemConsumptionModal()">+ Add Consumption</button>
            <button type="submit" class="btn btn-search">Search →</button>
          </div>
        </form>
      </div>

      <div class="table-card">
        <div class="table-header">
          <div class="table-search-box">
            <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"></i>
            <input type="text" class="table-search" placeholder="Search consumption ledger...">
          </div>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Date</th>
                <th>Chemical</th>
                <th>Received From</th>
                <th>Received Qty (Bags)</th>
                <th>Received Qty (Kgs)</th>
                <th>Sended To</th>
                <th>Sended (Bags)</th>
                <th>Sended (Kgs)</th>
                <th>Used In Bags</th>
                <th>Used In KGs</th>
                <th>Opening In Bags</th>
                <th>Opening In Kgs</th>
                <th>Closing in Bags</th>
                <th>Closing in KGs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>05-02-2025</td>
                <td>CARNAL 659 S ADVANCED (STPP)</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>30</td>
                <td>750</td>
                <td>1741</td>
                <td>43525</td>
                <td>1711</td>
                <td>42775</td>
              </tr>
              <tr>
                <td>2</td>
                <td>06-02-2025</td>
                <td>CARNAL 659 S ADVANCED (STPP)</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>20</td>
                <td>500</td>
                <td>1711</td>
                <td>42775</td>
                <td>1691</td>
                <td>42275</td>
              </tr>
              <tr>
                <td>3</td>
                <td>07-02-2025</td>
                <td>CARNAL 659 S ADVANCED (STPP)</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>20</td>
                <td>500</td>
                <td>1691</td>
                <td>42275</td>
                <td>1671</td>
                <td>41775</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 3.4 Chemical Received Report
  renderChemicalReceivedReport(container) {
    container.innerHTML = `
      <div class="form-card">
        <form onsubmit="event.preventDefault(); window.PreprocessingView.toastSuccess('Report generated');">
          <div class="form-grid grid-2col">
            <div class="form-group">
              <label>Plant</label>
              <select>
                <option>Select</option>
                <option selected>DFL UNIT-1 (VSP)</option>
                <option>DFL UNIT-5 (JPT)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Year</label>
              <select>
                <option>2026-27</option>
                <option>2025-26</option>
              </select>
            </div>
          </div>
          <div class="form-actions-row">
            <button type="submit" class="btn btn-search">Search →</button>
          </div>
        </form>
      </div>

      <div class="table-card">
        <div class="table-header">
          <div class="table-search-box">
            <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"></i>
            <input type="text" class="table-search" placeholder="Search PO or chemical...">
          </div>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th class="sortable">S.NO ▲</th>
                <th>PoNo</th>
                <th>Chemical</th>
                <th>Received Bags</th>
                <th>Received Quantity</th>
                <th>Balance Bags</th>
                <th>Balance Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>DFL/KPL/2627/002</td>
                <td>ALTESA NEO S100 (NP)</td>
                <td>300</td>
                <td>6000</td>
                <td>0</td>
                <td>0</td>
                <td><span class="badge badge-received">ORDER RECEIVED</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>DFL/KPL/2627/003</td>
                <td>ALTESA NEO S100 (NP)</td>
                <td>240</td>
                <td>4800</td>
                <td>0</td>
                <td>0</td>
                <td><span class="badge badge-received">ORDER RECEIVED</span></td>
              </tr>
              <tr>
                <td>3</td>
                <td>DFL/PT/2627/014</td>
                <td>SALT</td>
                <td>640</td>
                <td>32000</td>
                <td>0</td>
                <td>0</td>
                <td><span class="badge badge-received">ORDER RECEIVED</span></td>
              </tr>
              <tr>
                <td>4</td>
                <td>DFL//2627/002</td>
                <td>Compound Phosphate (Xingfa)</td>
                <td>1600</td>
                <td>40000</td>
                <td>0</td>
                <td>0</td>
                <td><span class="badge badge-received">ORDER RECEIVED</span></td>
              </tr>
              <tr>
                <td>5</td>
                <td>DFL/CFB/2627/003</td>
                <td>CARNAL 659 S ADVANCED (STPP)</td>
                <td>800</td>
                <td>20000</td>
                <td>4000</td>
                <td>100000</td>
                <td><span class="badge badge-pending">PENDING</span></td>
              </tr>
              <tr>
                <td>6</td>
                <td>DFL/PT/2627/013</td>
                <td>SALT</td>
                <td>620</td>
                <td>31000</td>
                <td>0</td>
                <td>0</td>
                <td><span class="badge badge-received">ORDER RECEIVED</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 3.5 Opening Balance Report
  renderChemicalOpeningBalance(container) {
    container.innerHTML = `
      <div class="form-card">
        <form onsubmit="event.preventDefault(); window.PreprocessingView.toastSuccess('Report generated');">
          <div class="form-grid grid-3col">
            <div class="form-group">
              <label>Plant</label>
              <select>
                <option>DFL UNIT-5 (JPT)</option>
                <option>DFL UNIT-1 (VSP)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Chemical</label>
              <select>
                <option>All</option>
                <option>CARNAL 659 S ADVANCED (STPP)</option>
                <option>CARFOSEL B 940 (STPP)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Bill Date</label>
              <input type="date" value="2025-10-14">
            </div>
          </div>
          <div class="form-actions-row">
            <button type="submit" class="btn btn-search">Search →</button>
          </div>
        </form>
      </div>

      <div class="table-card">
        <div class="table-header">
          <div class="table-search-box">
            <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"></i>
            <input type="text" class="table-search" placeholder="Search opening stock...">
          </div>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Chemical</th>
                <th>KGs per Bag</th>
                <th>Total Bags</th>
                <th>Total KGs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>CARNAL 659 S ADVANCED (STPP)</td>
                <td>25</td>
                <td>1909</td>
                <td>47725</td>
              </tr>
              <tr class="highlight-teal">
                <td>2</td>
                <td>CARFOSEL B 940 (STPP)</td>
                <td>25</td>
                <td>1176</td>
                <td>29400</td>
              </tr>
              <tr>
                <td>3</td>
                <td>ALTESA BT2 (NP)</td>
                <td>20</td>
                <td>216</td>
                <td>4320</td>
              </tr>
              <tr>
                <td>4</td>
                <td>ALTESA NEO S700 (NC)</td>
                <td>20</td>
                <td>34</td>
                <td>680</td>
              </tr>
              <tr>
                <td>5</td>
                <td>HYDROLOC CF SC</td>
                <td>30</td>
                <td>31</td>
                <td>930</td>
              </tr>
              <tr>
                <td>6</td>
                <td>SALT</td>
                <td>50</td>
                <td>478</td>
                <td>23900</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 3.6 Chemical Balance Report
  renderChemicalBalanceReport(container) {
    container.innerHTML = `
      <div class="form-card">
        <form onsubmit="event.preventDefault(); window.PreprocessingView.toastSuccess('Report generated');">
          <div class="form-grid">
            <div class="form-group">
              <label>Plant</label>
              <select>
                <option>DFL UNIT-5 (JPT)</option>
                <option>DFL UNIT-1 (VSP)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Chemical</label>
              <select>
                <option>All</option>
                <option>CARNAL 659 S ADVANCED</option>
              </select>
            </div>
            <div class="form-group">
              <label>From Date</label>
              <input type="date" value="2025-04-01">
            </div>
            <div class="form-group">
              <label>To Date</label>
              <input type="date" value="2026-03-31">
            </div>
            <div class="form-group">
              <label>Year</label>
              <select>
                <option>2025-26</option>
                <option>2026-27</option>
              </select>
            </div>
            <div class="form-group">
              <label>Select Month</label>
              <select>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
            </div>
          </div>
          <div class="form-actions-row">
            <button type="submit" class="btn btn-search">Search →</button>
          </div>
        </form>
      </div>

      <div class="table-card">
        <div class="table-header">
          <span style="font-weight:700;font-size:14px;color:var(--text-main);">October-2025 Reconciliation (Opening + Purchase − Consumption − Transfer = Closing)</span>
          <div class="table-actions-right">
            <button class="btn btn-primary" onclick="window.PreprocessingView.toastInfo('Downloading monthly balance...')"><i data-lucide="download" class="w-3.5 h-3.5"></i> Download Excel</button>
          </div>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Chemical</th>
                <th>Opening KGs</th>
                <th>Total Purchase KGs</th>
                <th>Total Consumption KGs</th>
                <th>KGs Sent to Other Plant</th>
                <th>Closing KGs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>CARNAL 659 S ADVANCED (STPP)</td>
                <td>47725</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td><strong>47725</strong></td>
              </tr>
              <tr>
                <td>2</td>
                <td>CARFOSEL B 940 (STPP)</td>
                <td>33025</td>
                <td>0</td>
                <td>12750</td>
                <td>1250</td>
                <td><strong>19025</strong></td>
              </tr>
              <tr>
                <td>3</td>
                <td>ALTESA BT2 (NP)</td>
                <td>5320</td>
                <td>0</td>
                <td>2100</td>
                <td>0</td>
                <td><strong>3220</strong></td>
              </tr>
              <tr>
                <td>4</td>
                <td>ALTESA NEO S700 (NC)</td>
                <td>680</td>
                <td>2000</td>
                <td>600</td>
                <td>0</td>
                <td><strong>2080</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 3.7 Chemical Payments List
  renderChemicalPaymentsList(container) {
    container.innerHTML = `
      <div class="form-card">
        <form onsubmit="event.preventDefault(); window.PreprocessingView.toastInfo('Search executed');">
          <div class="form-grid grid-2col">
            <div class="form-group">
              <label>Supplier</label>
              <select>
                <option>KPL INTERNATIONAL LTD</option>
                <option>ADWIK IMPEX</option>
              </select>
            </div>
            <div class="form-group">
              <label>Year</label>
              <select>
                <option>2025-26</option>
                <option>2026-27</option>
              </select>
            </div>
          </div>
          <div class="form-actions-row">
            <button type="button" class="btn btn-primary" onclick="window.PreprocessingView.openChemPaymentModal()">+ Add Payment</button>
            <button type="submit" class="btn btn-search">Search →</button>
          </div>
        </form>
      </div>

      <div class="table-card">
        <div class="table-header">
          <div class="table-search-box">
            <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"></i>
            <input type="text" class="table-search" placeholder="Search payment entries...">
          </div>
          <div class="table-actions-right">
            <button class="btn btn-sm btn-secondary" onclick="window.PreprocessingView.toastInfo('Loading full payments...')">Load All</button>
            <button class="btn btn-outline" onclick="window.PreprocessingView.toastInfo('Exporting to Excel...')"><i data-lucide="download" class="w-3.5 h-3.5"></i> Download Excel</button>
          </div>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th class="sortable">S.NO ▲</th>
                <th>PoNo</th>
                <th>Chemical Name</th>
                <th>Party Name</th>
                <th>Recieved Quantity (Kgs)</th>
                <th>Amount (Rupees)</th>
                <th>Paid Amount (Rupees)</th>
                <th>Bank Reference No</th>
                <th>Payment Date</th>
                <th>Remarks</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="12" class="empty-cell">No data available in table</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // ============================================
  // 4. TRACEABILITY & RECONCILIATION (6 SCREENS)
  // ============================================

  // 4.1 Track Code Report
  renderTrackCodeReport(container) {
    container.innerHTML = `
      <div class="form-card">
        <form onsubmit="event.preventDefault(); window.PreprocessingView.toastSuccess('Report generated');">
          <div class="form-grid grid-3col">
            <div class="form-group">
              <label>Receiving Plant</label>
              <select>
                <option>DFL UNIT-1 (VSP)</option>
                <option>DFL UNIT-2 (KKD)</option>
              </select>
            </div>
            <div class="form-group">
              <label>From Date <span class="req">*</span></label>
              <input type="date" value="2025-02-22" required>
            </div>
            <div class="form-group">
              <label>To Date <span class="req">*</span></label>
              <input type="date" value="2025-03-18" required>
            </div>
          </div>
          <div class="form-actions-row">
            <button type="submit" class="btn btn-search">Search →</button>
          </div>
        </form>
      </div>

      <div class="table-card">
        <div class="table-header">
          <div class="table-search-box">
            <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"></i>
            <input type="text" class="table-search" placeholder="Search track code or bill...">
          </div>
          <div class="table-actions-right">
            <button class="btn btn-sm btn-secondary" onclick="window.PreprocessingView.toastInfo('Loading batch tree...')">Load All</button>
            <button class="btn btn-outline" onclick="window.PreprocessingView.toastInfo('Exporting to Excel...')"><i data-lucide="download" class="w-3.5 h-3.5"></i> Download Excel</button>
          </div>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Track Code</th>
                <th>Arrival Date</th>
                <th>Bill No</th>
                <th>Count</th>
                <th>Arrival Weight</th>
                <th>Received Weight</th>
                <th>Deheading Weight</th>
                <th>Grading</th>
                <th>Grading Yield</th>
                <th>Freezing Qty F1</th>
                <th>Soaking Qty S1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><a class="text-teal-link" onclick="window.PreprocessingView.toastInfo('Auditing batch VM-VSP-SKM-054')">VM-VSP-SKM-054</a></td>
                <td>22-02-2025</td>
                <td>SKM/2425/1530<br>SKM/2425/1531</td>
                <td>67.00<br>74.00</td>
                <td>6206.000</td>
                <td>6206.000</td>
                <td>7.000</td>
                <td>4370.200</td>
                <td><span class="badge badge-teal">70.42 %</span></td>
                <td>3758.100</td>
                <td>0.000</td>
              </tr>
              <tr>
                <td>2</td>
                <td><a class="text-teal-link" onclick="window.PreprocessingView.toastInfo('Auditing batch VM-VSP-SKM-055')">VM-VSP-SKM-055</a></td>
                <td>22-02-2025</td>
                <td>SKM/2425/1529</td>
                <td>59.00<br>74.00</td>
                <td>5027.000</td>
                <td>5027.000</td>
                <td>7.000</td>
                <td>3521.000</td>
                <td><span class="badge badge-teal">70.04 %</span></td>
                <td>2924.700</td>
                <td>0.000</td>
              </tr>
              <tr>
                <td>3</td>
                <td><a class="text-teal-link" onclick="window.PreprocessingView.toastInfo('Auditing batch VM-VSP-AMP-056')">VM-VSP-AMP-056</a></td>
                <td>23-02-2025</td>
                <td>AMP/2425/4078<br>AMP/2425/4079</td>
                <td>100.00<br>94.00<br>104.00</td>
                <td>4776.300</td>
                <td>4776.300</td>
                <td>7.000</td>
                <td>3242.300</td>
                <td><span class="badge badge-warning">67.88 %</span></td>
                <td>3182.400</td>
                <td>0.000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 4.2 VA Floor Balance Report
  renderVaFloorBalance(container) {
    container.innerHTML = `
      <div class="form-card">
        <form onsubmit="event.preventDefault(); window.PreprocessingView.toastSuccess('Report generated');">
          <div class="form-grid">
            <div class="form-group">
              <label>Receiving Plant</label>
              <select>
                <option>DFL UNIT-2 (KKD)</option>
                <option>DFL UNIT-1 (VSP)</option>
              </select>
            </div>
            <div class="form-group">
              <label>To Date <span class="req">*</span></label>
              <input type="date" value="2026-10-14" required>
            </div>
            <div class="form-group">
              <label>Treatment</label>
              <select>
                <option>All</option>
                <option>STPP</option>
                <option>UNT</option>
              </select>
            </div>
            <div class="form-group">
              <label>Type of Material</label>
              <select>
                <option>Regular</option>
                <option>Store</option>
              </select>
            </div>
          </div>
          <div class="form-actions-row">
            <button type="submit" class="btn btn-search">Search →</button>
          </div>
        </form>
      </div>

      <div class="table-card">
        <div class="table-header">
          <div class="table-search-box">
            <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"></i>
            <input type="text" class="table-search" placeholder="Search variety or grade...">
          </div>
        </div>
        <div class="table-wrapper">
          <table class="data-table matrix-table">
            <thead>
              <tr>
                <th rowspan="2">SNO</th>
                <th rowspan="2">Variety</th>
                <th rowspan="2">Grade</th>
                <th rowspan="2">Count</th>
                <th rowspan="2">Treatment</th>
                <th>VM-KKD-RPL-058<br><span style="font-weight:400;font-size:10px;">20-09-2026</span></th>
                <th>VM-KKD-RPL-059<br><span style="font-weight:400;font-size:10px;">20-09-2026</span></th>
                <th>VM-KKD-KKD-060<br><span style="font-weight:400;font-size:10px;">20-09-2026</span></th>
                <th>VM-KKD-MKP-061<br><span style="font-weight:400;font-size:10px;">20-09-2026</span></th>
                <th rowspan="2">Total KGs</th>
                <th rowspan="2">Total Crates</th>
              </tr>
              <tr>
                <th>Batch 1</th>
                <th>Batch 2</th>
                <th>Batch 3</th>
                <th>Batch 4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>PVPD-VM</td>
                <td>31/35</td>
                <td>34.00</td>
                <td>UNT</td>
                <td>-</td>
                <td>-</td>
                <td>663</td>
                <td>-</td>
                <td><strong>663</strong></td>
                <td>25</td>
              </tr>
              <tr>
                <td>2</td>
                <td>PVPD-VM</td>
                <td>41/50</td>
                <td>45.00</td>
                <td>UNT</td>
                <td>203</td>
                <td>332</td>
                <td>154</td>
                <td>-</td>
                <td><strong>689</strong></td>
                <td>26</td>
              </tr>
              <tr>
                <td>3</td>
                <td>PVPD-VM</td>
                <td>51/60</td>
                <td>55.00</td>
                <td>UNT</td>
                <td>-</td>
                <td>606</td>
                <td>11</td>
                <td>385</td>
                <td><strong>1002</strong></td>
                <td>38</td>
              </tr>
              <tr>
                <td>4</td>
                <td>PVPD-VM</td>
                <td>51/60</td>
                <td>56.00</td>
                <td>UNT</td>
                <td>68</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td><strong>68</strong></td>
                <td>3</td>
              </tr>
              <tr>
                <td>5</td>
                <td>RPD-VM</td>
                <td>61/70</td>
                <td>65.00</td>
                <td>STPP</td>
                <td>-</td>
                <td>-</td>
                <td>3</td>
                <td>156</td>
                <td><strong>159</strong></td>
                <td>7</td>
              </tr>
              <tr>
                <td>6</td>
                <td>RPD-VM</td>
                <td>61/70</td>
                <td>66.00</td>
                <td>STPP</td>
                <td>63</td>
                <td>459</td>
                <td>-</td>
                <td>-</td>
                <td><strong>522</strong></td>
                <td>20</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 4.3 VA Transfer Report
  renderVaTransfer(container) {
    container.innerHTML = `
      <div class="form-card">
        <form onsubmit="event.preventDefault(); window.PreprocessingView.toastSuccess('Report generated');">
          <div class="form-grid">
            <div class="form-group">
              <label>Production Plant</label>
              <select>
                <option>DFL UNIT-1 (VSP)</option>
                <option>DFL UNIT-2 (KKD)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Date Filter <span class="req">*</span></label>
              <select required>
                <option>Bill Date</option>
                <option>Arrival Date</option>
                <option>Transfer Date</option>
              </select>
            </div>
            <div class="form-group">
              <label>From Date <span class="req">*</span></label>
              <input type="date" value="2025-02-22" required>
            </div>
            <div class="form-group">
              <label>To Date <span class="req">*</span></label>
              <input type="date" value="2025-03-18" required>
            </div>
          </div>
          <div class="form-actions-row">
            <button type="submit" class="btn btn-search">Search →</button>
          </div>
        </form>
      </div>

      <div class="table-card">
        <div class="table-header">
          <div class="table-search-box">
            <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"></i>
            <input type="text" class="table-search" placeholder="Search supplier or vehicle...">
          </div>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Arrival Date</th>
                <th>Bill Date</th>
                <th>Production Plant</th>
                <th>Vehicle Number</th>
                <th>Bill Number</th>
                <th>Supplier</th>
                <th>Center Name</th>
                <th>Destination</th>
                <th>Variety</th>
                <th>Count</th>
                <th>Rm Production plant</th>
                <th>Transfer Date</th>
                <th>Final Qty</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>23-02-2025</td>
                <td>22-02-2025</td>
                <td>DFL UNIT-1 (VSP)</td>
                <td>AP39UJ3747</td>
                <td>AMP/2425/4084</td>
                <td>A.SRINIVASA RAJU(AM)</td>
                <td>AMALAPURAM</td>
                <td>DFL UNIT-1 (VSP)</td>
                <td>HEAD ON-VM</td>
                <td>100.00</td>
                <td>DFL UNIT-1 (VSP)</td>
                <td>-</td>
                <td>979.80</td>
              </tr>
              <tr>
                <td>2</td>
                <td>23-02-2025</td>
                <td>22-02-2025</td>
                <td>DFL UNIT-1 (VSP)</td>
                <td>AP39UJ3747</td>
                <td>AMP/2425/4084</td>
                <td>A.SRINIVASA RAJU(AM)</td>
                <td>AMALAPURAM</td>
                <td>DFL UNIT-1 (VSP)</td>
                <td>HEAD ON-VM</td>
                <td>105.00</td>
                <td>DFL UNIT-1 (VSP)</td>
                <td>-</td>
                <td>650.70</td>
              </tr>
              <tr>
                <td>3</td>
                <td>23-02-2025</td>
                <td>22-02-2025</td>
                <td>DFL UNIT-1 (VSP)</td>
                <td>AP39UJ3747</td>
                <td>AMP/2425/4084</td>
                <td>A.SRINIVASA RAJU(AM)</td>
                <td>AMALAPURAM</td>
                <td>DFL UNIT-1 (VSP)</td>
                <td>HEAD ON-VM</td>
                <td>90.00</td>
                <td>DFL UNIT-1 (VSP)</td>
                <td>-</td>
                <td>325.10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 4.4 Assumed Reports by RM & Arrival
  renderAssumedReports(container) {
    container.innerHTML = `
      <div class="form-card">
        <form onsubmit="event.preventDefault(); window.PreprocessingView.toastSuccess('Report generated');">
          <div class="form-grid">
            <div class="form-group">
              <label>Receiving Plant</label>
              <select>
                <option>DFL UNIT-1 (VSP)</option>
                <option>DFL UNIT-2 (KKD)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Arrival Date <span class="req">*</span></label>
              <input type="date" value="2025-01-22" required>
            </div>
            <div class="form-group">
              <label>Track ID <span class="req">*</span></label>
              <select required>
                <option>VM-VSP-SKM-051</option>
                <option>VM-VSP-SKM-054</option>
              </select>
            </div>
            <div class="form-group">
              <label>Species</label>
              <select>
                <option>VM</option>
                <option>AMP</option>
                <option>BL</option>
              </select>
            </div>
          </div>
          <div class="form-actions-row">
            <button type="submit" class="btn btn-search">Search →</button>
          </div>
        </form>
      </div>

      <div class="table-card">
        <div class="table-header">
          <span style="font-weight:700;font-size:13.5px;color:var(--text-main);">Inward Purchase Valuation vs Outward Grade Realization</span>
          <div class="table-actions-right">
            <button class="btn btn-outline" onclick="window.PreprocessingView.toastInfo('Exporting valuation matrix...')"><i data-lucide="download" class="w-3.5 h-3.5"></i> Download Excel</button>
          </div>
        </div>
        <div class="table-wrapper">
          <table class="data-table" style="font-size:12px;">
            <thead>
              <tr style="background:#f1f5f9;">
                <th colspan="7" style="text-align:center;border-right:2px solid #cbd5e1;background:#f8fafc;">PURCHASE INWARD COST</th>
                <th colspan="8" style="text-align:center;background:#f0fdf4;">OUTPUT RECOVERY VALUATION</th>
              </tr>
              <tr>
                <th>SNo</th>
                <th>Count</th>
                <th>Weight</th>
                <th>Purchase count</th>
                <th>Purchase Weight</th>
                <th>Purchase Rate</th>
                <th style="border-right:2px solid #cbd5e1;">Total Value (₹)</th>
                <th>SNo</th>
                <th>HLCount</th>
                <th>Packing Grade</th>
                <th>Variety Name</th>
                <th>Treatment</th>
                <th>Weight</th>
                <th>Rate</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>-</td>
                <td>-</td>
                <td>52.000</td>
                <td>375.000</td>
                <td>350.00</td>
                <td style="border-right:2px solid #cbd5e1;font-weight:600;">1,31,250.00</td>
                <td>1</td>
                <td>19.00</td>
                <td>16/20</td>
                <td>RPDTO-VM</td>
                <td>STPP</td>
                <td>0.20</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>2</td>
                <td>-</td>
                <td>-</td>
                <td>53.500</td>
                <td>903.000</td>
                <td>340.00</td>
                <td style="border-right:2px solid #cbd5e1;font-weight:600;">3,07,020.00</td>
                <td>2</td>
                <td>29.00</td>
                <td>26/30</td>
                <td>RPD-VM</td>
                <td>STPP</td>
                <td>206.80</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>3</td>
                <td>-</td>
                <td>-</td>
                <td>54.000</td>
                <td>233.000</td>
                <td>340.00</td>
                <td style="border-right:2px solid #cbd5e1;font-weight:600;">79,220.00</td>
                <td>3</td>
                <td>38.00</td>
                <td>31/40</td>
                <td>RPD-VM</td>
                <td>STPP</td>
                <td>71.00</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>4</td>
                <td>-</td>
                <td>-</td>
                <td>55.000</td>
                <td>241.000</td>
                <td>340.00</td>
                <td style="border-right:2px solid #cbd5e1;font-weight:600;">81,940.00</td>
                <td>4</td>
                <td>98.00</td>
                <td>91/110</td>
                <td>RPD-VM</td>
                <td>STPP</td>
                <td>11.00</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>5</td>
                <td>-</td>
                <td>-</td>
                <td>83.000</td>
                <td>1342.000</td>
                <td>265.00</td>
                <td style="border-right:2px solid #cbd5e1;font-weight:600;">3,55,630.00</td>
                <td>5</td>
                <td>150.00</td>
                <td>151/200</td>
                <td>RPUD-VM</td>
                <td>UNT</td>
                <td>1.30</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>1</td>
                <td>50</td>
                <td>1,147.250</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td style="border-right:2px solid #cbd5e1;">-</td>
                <td>6</td>
                <td>38.00</td>
                <td>31/40</td>
                <td>HLSO-CHINA-VM</td>
                <td>UNT</td>
                <td>908.80</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>2</td>
                <td>60</td>
                <td>604.750</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td style="border-right:2px solid #cbd5e1;">-</td>
                <td>7</td>
                <td>45.00</td>
                <td>41/50</td>
                <td>HLSO-CHINA-VM</td>
                <td>UNT</td>
                <td>149.20</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 4.5 Consolidation Report Daily & Monthly
  renderConsolidationDaily(container) {
    container.innerHTML = `
      <div class="form-card">
        <form onsubmit="event.preventDefault(); window.PreprocessingView.toastSuccess('Report generated');">
          <div class="form-grid grid-3col">
            <div class="form-group">
              <label>Receiving Plant</label>
              <select>
                <option>DFL UNIT-1 (VSP)</option>
                <option>DFL UNIT-2 (KKD)</option>
              </select>
            </div>
            <div class="form-group">
              <label>From Date <span class="req">*</span></label>
              <input type="date" value="2025-02-22" required>
            </div>
            <div class="form-group">
              <label>To Date <span class="req">*</span></label>
              <input type="date" value="2025-03-18" required>
            </div>
          </div>
          <div class="form-actions-row">
            <button type="submit" class="btn btn-search">Search →</button>
          </div>
        </form>
      </div>

      <div class="table-card">
        <div class="table-header">
          <div class="table-search-box">
            <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"></i>
            <input type="text" class="table-search" placeholder="Search count or grade...">
          </div>
          <div class="table-actions-right">
            <button class="btn btn-outline" onclick="window.PreprocessingView.toastInfo('Exporting loss matrix...')"><i data-lucide="download" class="w-3.5 h-3.5"></i> Download Excel</button>
          </div>
        </div>
        <div class="table-wrapper">
          <table class="data-table matrix-table" style="font-size:11px;">
            <thead>
              <tr>
                <th rowspan="2">SNO</th>
                <th rowspan="2">Count</th>
                <th rowspan="2">Weight</th>
                <th rowspan="2">Grade</th>
                <th rowspan="2">Weight</th>
                <th colspan="3">- ( - )</th>
                <th colspan="3">VM-PD( RAW - IQF ) STPP 4 X 2.5 LBS</th>
                <th colspan="3">VM-PD( RAW - IQF ) NPT 4 X 2.5 LBS</th>
                <th colspan="3">VM-PD( RAW - IQF ) STPP 5 X 2 LBS</th>
              </tr>
              <tr>
                <th>HL Graded Wt</th>
                <th>Finished Prod</th>
                <th>Difference</th>
                <th>HL Graded Wt</th>
                <th>Finished Prod</th>
                <th>Difference</th>
                <th>HL Graded Wt</th>
                <th>Finished Prod</th>
                <th>Difference</th>
                <th>HL Graded Wt</th>
                <th>Finished Prod</th>
                <th>Difference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>20</td>
                <td>825.100</td>
                <td>DC</td>
                <td>1598.400</td>
                <td>1598.400</td>
                <td>0</td>
                <td style="color:var(--danger);">1598.400</td>
                <td>0.000</td>
                <td>0</td>
                <td>0.000</td>
                <td>0.000</td>
                <td>0</td>
                <td>0.000</td>
                <td>0.000</td>
                <td>0</td>
                <td>0.000</td>
              </tr>
              <tr>
                <td>2</td>
                <td>30</td>
                <td>26,714.250</td>
                <td>13/15</td>
                <td>30.400</td>
                <td>30.400</td>
                <td>0</td>
                <td style="color:var(--danger);">30.400</td>
                <td>0.000</td>
                <td>0</td>
                <td>0.000</td>
                <td>0.000</td>
                <td>0</td>
                <td>0.000</td>
                <td>0.000</td>
                <td>0</td>
                <td>0.000</td>
              </tr>
              <tr>
                <td>3</td>
                <td>40</td>
                <td>1,196.290</td>
                <td>16/20</td>
                <td>232.400</td>
                <td>11.200</td>
                <td>0</td>
                <td style="color:var(--danger);">11.200</td>
                <td>221.200</td>
                <td>208.84</td>
                <td style="color:var(--warning);font-weight:600;">12.360</td>
                <td>0.000</td>
                <td>0</td>
                <td>0.000</td>
                <td>0.000</td>
                <td>0</td>
                <td>0.000</td>
              </tr>
              <tr>
                <td>4</td>
                <td>50</td>
                <td>14,905.100</td>
                <td>21/25</td>
                <td>391.400</td>
                <td>53.200</td>
                <td>0</td>
                <td style="color:var(--danger);">53.200</td>
                <td>338.200</td>
                <td>320.07</td>
                <td style="color:var(--warning);font-weight:600;">18.130</td>
                <td>0.000</td>
                <td>0</td>
                <td>0.000</td>
                <td>0.000</td>
                <td>0</td>
                <td>0.000</td>
              </tr>
              <tr>
                <td>5</td>
                <td>60</td>
                <td>59,990.375</td>
                <td>26/30</td>
                <td>5681.000</td>
                <td>292.100</td>
                <td>0</td>
                <td style="color:var(--danger);">292.100</td>
                <td>93.348</td>
                <td>55.615</td>
                <td style="color:var(--warning);font-weight:600;">37.733</td>
                <td>4,933.250</td>
                <td>4496.87</td>
                <td style="color:var(--warning);font-weight:600;">436.380</td>
                <td>348.502</td>
                <td>327.0</td>
                <td style="color:var(--warning);font-weight:600;">21.502</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 4.6 File Upload
  renderFileUpload(container) {
    container.innerHTML = `
      <div class="form-card">
        <form onsubmit="event.preventDefault(); window.PreprocessingView.toastInfo('Search executed');">
          <div class="form-grid grid-2col">
            <div class="form-group">
              <label>Plant <span class="req">*</span></label>
              <select required>
                <option>JPT - DFL UNIT-5 (JPT)</option>
                <option>VSP - DFL UNIT-1 (VSP)</option>
                <option>KKD - DFL UNIT-2 (KKD)</option>
              </select>
            </div>
            <div class="form-group" style="justify-content:flex-end;">
              <label>&nbsp;</label>
              <button type="button" class="btn btn-primary" onclick="window.PreprocessingView.toastInfo('Upload dialog opened')"><i data-lucide="upload" class="w-4 h-4"></i> Upload New Document</button>
            </div>
          </div>
          <div class="form-actions-row">
            <button type="submit" class="btn btn-search">Search →</button>
          </div>
        </form>
      </div>

      <div class="table-card">
        <div class="table-header">
          <div class="table-search-box">
            <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"></i>
            <input type="text" class="table-search" placeholder="Search files...">
          </div>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th class="sortable">Date ▲</th>
                <th>Expires On</th>
                <th>Plant</th>
                <th>File Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="5" class="empty-cell">No data available in table</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // Helper calculation callbacks
  calcDiff(inputEl, base, targetId) {
    const val = parseFloat(inputEl.value) || 0;
    const diff = val - base;
    const target = document.getElementById(targetId);
    if (target) {
      target.textContent = diff.toFixed(1);
      target.className = diff < 0 ? 'diff-negative' : 'diff-positive';
    }
  },

  calcDeheadYield() {
    const hon = parseFloat(document.getElementById('dh-hon-qty')?.value) || 0;
    const hl = parseFloat(document.getElementById('dh-hl-qty')?.value) || 0;
    const out = document.getElementById('dh-yield');
    if (out && hon > 0) {
      out.value = ((hl / hon) * 100).toFixed(1);
    }
  },

  // Toast proxies
  toastSuccess(msg) {
    if (Toast && typeof Toast.success === 'function') Toast.success(msg);
    else alert(msg);
  },
  toastInfo(msg) {
    if (Toast && typeof Toast.info === 'function') Toast.info(msg);
    else alert(msg);
  },
  toastError(msg) {
    if (Toast && typeof Toast.error === 'function') Toast.error(msg);
    else alert(msg);
  },

  // Modals integration
  openChemPOModal() {
    Modal.open({
      title: 'GS CHEM PO CREATE',
      content: `
        <div class="modal-breadcrumb text-xs text-slate-500 mb-2">Chemical Inventory & Usage / Chemical Pos / Gs Chem Po Create</div>
        <form id="form-chem-po" onsubmit="event.preventDefault(); Modal.close(); window.PreprocessingView.toastSuccess('PO created successfully');">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">Supplier *</label>
              <select class="w-full border rounded p-2 text-sm" required>
                <option>All</option>
                <option>KPL INTERNATIONAL LTD</option>
                <option>ADWIK IMPEX</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">Port Name</label>
              <select class="w-full border rounded p-2 text-sm">
                <option>Select</option>
                <option>INPRT - PARADIP GARH</option>
                <option>INKAK1 - KAKINADA</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">Mode of Import *</label>
              <select class="w-full border rounded p-2 text-sm" required>
                <option>Select</option>
                <option>HSS</option>
                <option>HSS_BOND</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">PO No *</label>
              <input type="text" class="w-full border rounded p-2 text-sm" placeholder="Enter Po NO" required>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">PO Date *</label>
              <input type="date" value="2026-10-14" class="w-full border rounded p-2 text-sm" required>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">ETA Date</label>
              <input type="date" class="w-full border rounded p-2 text-sm">
            </div>
          </div>
          <div class="flex justify-end gap-3 mt-5 pt-3 border-t">
            <button type="button" class="btn btn-secondary px-4 py-2 text-xs font-semibold" onclick="Modal.close()">Cancel</button>
            <button type="submit" class="btn btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-1.5"><i data-lucide="save" class="w-4 h-4"></i> Save</button>
          </div>
        </form>
      `
    });
  },

  openChemOrderModal() {
    Modal.open({
      title: 'GS CHEM ORDERS CREATE',
      content: `
        <div class="modal-breadcrumb text-xs text-slate-500 mb-2">Chemical Inventory & Usage / Received Chemicals / Gs Chem Orders Create</div>
        <form onsubmit="event.preventDefault(); Modal.close(); window.PreprocessingView.toastSuccess('Chemical order saved');">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">Processing Plant *</label>
              <select class="w-full border rounded p-2 text-sm" required>
                <option>DFL UNIT-1 (VSP)</option>
                <option>DFL UNIT-5 (JPT)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">PONO *</label>
              <select class="w-full border rounded p-2 text-sm" required>
                <option>DFL/KPL/2627/003</option>
                <option>DFL/BC/2526/008</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">Chemical *</label>
              <select class="w-full border rounded p-2 text-sm" required>
                <option>CARNAL 659 S ADVANCED (STPP)</option>
                <option>CARFOSEL B 940 (STPP)</option>
                <option>ALTESA BT2 (NP)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">Received Bags *</label>
              <input type="number" class="w-full border rounded p-2 text-sm" placeholder="Bags" required>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">Received Qty in Kgs *</label>
              <input type="number" class="w-full border rounded p-2 text-sm" placeholder="Kgs" required>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">Bill of Entry No</label>
              <input type="text" class="w-full border rounded p-2 text-sm" placeholder="Doc No">
            </div>
          </div>
          <div class="flex justify-end gap-3 mt-5 pt-3 border-t">
            <button type="button" class="btn btn-secondary px-4 py-2 text-xs font-semibold" onclick="Modal.close()">Cancel</button>
            <button type="submit" class="btn btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-1.5"><i data-lucide="save" class="w-4 h-4"></i> Save</button>
          </div>
        </form>
      `
    });
  },

  openChemConsumptionModal() {
    Modal.open({
      title: 'GS CHEM CONSUMPTION CREATE',
      content: `
        <div class="modal-breadcrumb text-xs text-slate-500 mb-2">Chemical Inventory & Usage / Chemicals Consumption / Gs Chem Consumption Create</div>
        <form onsubmit="event.preventDefault(); Modal.close(); window.PreprocessingView.toastSuccess('Consumption recorded');">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">Plant Name *</label>
              <select class="w-full border rounded p-2 text-sm" required>
                <option>DFL UNIT-1 (VSP)</option>
                <option>DFL UNIT-5 (JPT)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">Usage Type *</label>
              <select class="w-full border rounded p-2 text-sm" required>
                <option>Consumption</option>
                <option>Transfer</option>
                <option>Return</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">Chemical Name *</label>
              <select class="w-full border rounded p-2 text-sm" required>
                <option>CARNAL 659 S ADVANCED (STPP)</option>
                <option>CARFOSEL B 940 (STPP)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">Bags Quantity *</label>
              <input type="number" class="w-full border rounded p-2 text-sm" placeholder="Bags" required>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">Quantity in Kgs *</label>
              <input type="number" class="w-full border rounded p-2 text-sm" placeholder="Kgs" required>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">Date *</label>
              <input type="date" value="2026-10-14" class="w-full border rounded p-2 text-sm" required>
            </div>
          </div>
          <div class="flex justify-end gap-3 mt-5 pt-3 border-t">
            <button type="button" class="btn btn-secondary px-4 py-2 text-xs font-semibold" onclick="Modal.close()">Cancel</button>
            <button type="submit" class="btn btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-1.5"><i data-lucide="save" class="w-4 h-4"></i> Save</button>
          </div>
        </form>
      `
    });
  },

  openChemPaymentModal() {
    Modal.open({
      title: 'GS CHEM PO PAYMENT CREATE',
      content: `
        <div class="modal-breadcrumb text-xs text-slate-500 mb-2">Chemical Inventory & Usage / Chemical Payments List / Gs Chem Po Payment Create</div>
        <form onsubmit="event.preventDefault(); Modal.close(); window.PreprocessingView.toastSuccess('Payment recorded');">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">PONO *</label>
              <select class="w-full border rounded p-2 text-sm" required>
                <option>DFL/KPL/2627/003</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">Chemical Name *</label>
              <input type="text" class="w-full border rounded p-2 text-sm" value="ALTESA NEO S100 (NP)" required>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">Party Name *</label>
              <input type="text" class="w-full border rounded p-2 text-sm" value="KPL INTERNATIONAL LTD" required>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">Recieved Quantity *</label>
              <input type="number" class="w-full border rounded p-2 text-sm" value="4800" required>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">Amount (₹) *</label>
              <input type="number" class="w-full border rounded p-2 text-sm" value="868800" required>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1">Bank Reference No *</label>
              <input type="text" class="w-full border rounded p-2 text-sm" value="NEFT2627001" required>
            </div>
          </div>
          <div class="flex justify-end gap-3 mt-5 pt-3 border-t">
            <button type="button" class="btn btn-secondary px-4 py-2 text-xs font-semibold" onclick="Modal.close()">Cancel</button>
            <button type="submit" class="btn btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-1.5"><i data-lucide="save" class="w-4 h-4"></i> Save</button>
          </div>
        </form>
      `
    });
  }
};

// Global hook for inline handlers
if (typeof window !== 'undefined') {
  window.PreprocessingView = PreprocessingView;
}
