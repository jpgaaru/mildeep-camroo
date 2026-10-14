// AquaOps Pre-Processing Module Controller
// Comprehensive Real-World Fisheries Operations for Devi Fisheries Limited

import { PREPROCESSING_DATA } from '../data/preprocessingData.js';
import { TabBar } from '../components/tabBar.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';

export const PreprocessingView = {
  activeSearchQuery: '',
  activeStatusFilter: 'ALL',

  render(containerId, subPage = 'floor-overview', activeHash = '#/preprocessing/dashboard/floor-overview') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 1. Elevate & Sync the Top-Right Primary Action Button inline with Page Title
    this.updateHeaderAction(subPage);

    // 2. Dispatch to specific subpage view
    switch (subPage) {
      case 'floor-overview':
        this.renderFloorOverview(container);
        break;

      // Floor Operations
      case 'receiving-sizing':
        this.renderReceivingSizing(container);
        break;
      case 'deheading-peeling':
        this.renderDeheadingPeeling(container);
        break;
      case 'interplant-transfers':
        this.renderInterplantTransfers(container);
        break;

      // Chemical Inventory & Usage
      case 'stock-receipts':
        this.renderStockReceipts(container);
        break;
      case 'daily-usage':
        this.renderDailyUsage(container);
        break;
      case 'supplier-settlements':
        this.renderSupplierSettlements(container);
        break;

      // Traceability & Compliance
      case 'batch-traceability':
        this.renderBatchTraceability(container);
        break;
      case 'va-floor-balance':
        this.renderVAFloorBalance(container);
        break;
      case 'yield-reconciliation':
        this.renderYieldReconciliation(container);
        break;

      default:
        this.renderFloorOverview(container);
        break;
    }
  },

  // =========================================================================
  // TOP-RIGHT PRIMARY ACTION BUTTON SYNC (AquaOps Standard)
  // =========================================================================
  updateHeaderAction(tabName) {
    const actionContainer = document.getElementById('section-action-btn-container');
    if (!actionContainer) return;

    switch (tabName) {
      case 'floor-overview':
        actionContainer.innerHTML = `
          <button id="btn-preproc-refresh" class="btn-secondary px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer hover:bg-slate-100 transition-all">
            <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            <span>Live Telemetry</span>
          </button>
        `;
        document.getElementById('btn-preproc-refresh')?.addEventListener('click', () => {
          Toast.show('Refreshed live line sensors and floor scale telemetry.', 'info');
        });
        break;

      case 'receiving-sizing':
        actionContainer.innerHTML = `
          <button id="btn-preproc-record-intake" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Record Dock Intake</span>
          </button>
        `;
        document.getElementById('btn-preproc-record-intake')?.addEventListener('click', () => this.openDockIntakeModal());
        break;

      case 'deheading-peeling':
        actionContainer.innerHTML = `
          <button id="btn-preproc-new-batch" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Start Deheading Batch</span>
          </button>
        `;
        document.getElementById('btn-preproc-new-batch')?.addEventListener('click', () => this.openDeheadingBatchModal());
        break;

      case 'interplant-transfers':
        actionContainer.innerHTML = `
          <button id="btn-preproc-new-transfer" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>New Stock Transfer</span>
          </button>
        `;
        document.getElementById('btn-preproc-new-transfer')?.addEventListener('click', () => this.openTransferModal());
        break;

      case 'stock-receipts':
        actionContainer.innerHTML = `
          <button id="btn-preproc-new-chem-po" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Create Chemical PO</span>
          </button>
        `;
        document.getElementById('btn-preproc-new-chem-po')?.addEventListener('click', () => this.openChemicalPOModal());
        break;

      case 'daily-usage':
        actionContainer.innerHTML = `
          <button id="btn-preproc-log-usage" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Log Additive Usage</span>
          </button>
        `;
        document.getElementById('btn-preproc-log-usage')?.addEventListener('click', () => this.openUsageModal());
        break;

      case 'supplier-settlements':
        actionContainer.innerHTML = `
          <button id="btn-preproc-new-payment" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Record Supplier Payment</span>
          </button>
        `;
        document.getElementById('btn-preproc-new-payment')?.addEventListener('click', () => this.openPaymentModal());
        break;

      case 'batch-traceability':
        actionContainer.innerHTML = `
          <button id="btn-preproc-export-trace" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span>Export Trace Certificate</span>
          </button>
        `;
        document.getElementById('btn-preproc-export-trace')?.addEventListener('click', () => {
          Toast.show('Pond-to-Pack USFDA/EU Traceability Manifest downloaded (PDF/CSV).', 'success');
        });
        break;

      case 'va-floor-balance':
        actionContainer.innerHTML = `
          <button id="btn-preproc-audit-floor" class="btn-secondary px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer hover:bg-slate-100 transition-all">
            <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            <span>Audit Floor Crates</span>
          </button>
        `;
        document.getElementById('btn-preproc-audit-floor')?.addEventListener('click', () => {
          Toast.show('Live RFID crate scan synchronized. Total 124 crates verified on floor.', 'success');
        });
        break;

      case 'yield-reconciliation':
        actionContainer.innerHTML = `
          <button id="btn-preproc-audit-yield" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            <span>Run Financial Yield Audit</span>
          </button>
        `;
        document.getElementById('btn-preproc-audit-yield')?.addEventListener('click', () => {
          Toast.show('Financial purchase-to-finished conversion audit recalculated.', 'info');
        });
        break;

      default:
        actionContainer.innerHTML = '';
        break;
    }
  },

  // =========================================================================
  // VIEW 1: FLOOR OVERVIEW (DASHBOARD & TELEMETRY)
  // =========================================================================
  renderFloorOverview(container) {
    const k = PREPROCESSING_DATA.kpis;
    const batches = PREPROCESSING_DATA.activeBatches;
    const alerts = PREPROCESSING_DATA.alerts;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <!-- 1. Industrial Telemetry 8-Card Grid (AquaOps Standard) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Card 1: Today's Arrivals -->
          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4.5 shadow-xs relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-[#006C7A]"></div>
            <div class="flex items-center justify-between text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
              <span>Today's RM Arrivals</span>
              <span class="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                ${k.arrivalsTrendPct}
              </span>
            </div>
            <div class="text-2xl font-bold text-[#0F172A] tracking-tight">${k.todayArrivalsKg.toLocaleString()} <span class="text-xs font-medium text-[#64748B]">kg</span></div>
            <p class="text-xs text-[#64748B] mt-1.5">Fresh harvest docked across 5 vehicles</p>
          </div>

          <!-- Card 2: Deheading Yield % -->
          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4.5 shadow-xs relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <div class="flex items-center justify-between text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
              <span>Avg Deheading Yield</span>
              <span class="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                +${(k.avgDeheadingYieldPct - k.yieldBenchmarkPct).toFixed(2)}%
              </span>
            </div>
            <div class="text-2xl font-bold text-[#0F172A] tracking-tight">${k.avgDeheadingYieldPct}%</div>
            <p class="text-xs text-[#64748B] mt-1.5">Benchmark target: ${k.yieldBenchmarkPct}% (HON to HL)</p>
          </div>

          <!-- Card 3: STPP Chemical Buffer -->
          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4.5 shadow-xs relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
            <div class="flex items-center justify-between text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
              <span>STPP Chemical Stock</span>
              <span class="inline-flex items-center text-xs font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                LOW BUFFER
              </span>
            </div>
            <div class="text-2xl font-bold text-[#0F172A] tracking-tight">${k.chemicalStppBags} <span class="text-xs font-medium text-[#64748B]">Bags (${k.chemicalStppBags * 25} kg)</span></div>
            <p class="text-xs text-[#64748B] mt-1.5">Buffer threshold: ${k.chemicalBufferThreshold} Bags (Reorder pending)</p>
          </div>

          <!-- Card 4: WIP On Factory Floor -->
          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4.5 shadow-xs relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-[#0284C7]"></div>
            <div class="flex items-center justify-between text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
              <span>Floor WIP In-Process</span>
              <span class="inline-flex items-center text-xs font-bold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded">
                ACTIVE
              </span>
            </div>
            <div class="text-2xl font-bold text-[#0F172A] tracking-tight">${k.floorWipKg.toLocaleString()} <span class="text-xs font-medium text-[#64748B]">kg</span></div>
            <p class="text-xs text-[#64748B] mt-1.5">On sorting tables & peeling lines</p>
          </div>
        </div>

        <!-- 2. Charts & Floor Alerts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left: Hourly Line Throughput & Yield Distribution Chart (2 cols) -->
          <div class="lg:col-span-2 bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
            <div class="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <div>
                <h3 class="text-sm font-bold text-[#0F172A]">Pre-Processing Line Telemetry & Hourly Throughput</h3>
                <p class="text-xs text-[#64748B] mt-0.5">Live sensor data from Deheading Tables & Roller Graders</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1.5 text-xs text-[#64748B]">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#006C7A]"></span> Input HON
                </span>
                <span class="inline-flex items-center gap-1.5 text-xs text-[#64748B]">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Recovered HL
                </span>
              </div>
            </div>

            <!-- Canvas Line Chart -->
            <div class="relative w-full h-64 mt-4">
              <canvas id="preproc-throughput-chart" class="w-full h-full"></canvas>
            </div>
          </div>

          <!-- Right: Live Critical Alerts Feed (1 col) -->
          <div class="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs flex flex-col">
            <div class="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 class="text-sm font-bold text-[#0F172A]">Floor Alerts & Exceptions</h3>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-700">
                3 Pending
              </span>
            </div>

            <div class="space-y-3 mt-4 flex-1 overflow-y-auto">
              ${alerts.map(a => `
                <div class="p-3 rounded-lg border ${a.severity === 'danger' ? 'bg-rose-50/50 border-rose-200 text-rose-900' : a.severity === 'warning' ? 'bg-amber-50/50 border-amber-200 text-amber-900' : 'bg-sky-50/50 border-sky-200 text-sky-900'}">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-bold">${a.title}</span>
                    <span class="text-[10px] text-slate-500">${a.timestamp}</span>
                  </div>
                  <p class="text-xs mt-1 text-slate-600 leading-relaxed">${a.desc}</p>
                </div>
              `).join('')}
            </div>

            <div class="pt-3 border-t border-[#E2E8F0] mt-3">
              <button id="btn-preproc-ack-alerts" class="w-full py-1.5 text-xs font-semibold text-[#006C7A] hover:bg-teal-50 rounded-lg transition-colors text-center">
                Acknowledge All Shift Alerts →
              </button>
            </div>
          </div>
        </div>

        <!-- 3. Active Floor Batches Live Register -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div class="px-5 py-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Active Floor Batches & Stage Tracking</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Live work-in-progress on Deheading, Roller Grading, Peeling & Soaking lines</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                ● 7 Lines Active
              </span>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-[#0F172A]">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                <tr>
                  <th class="py-3 px-4">Batch ID / Track Code</th>
                  <th class="py-3 px-4">Stage & Line Table</th>
                  <th class="py-3 px-4">Supervisor</th>
                  <th class="py-3 px-4 text-right">Input (kg)</th>
                  <th class="py-3 px-4 text-right">Output (kg)</th>
                  <th class="py-3 px-4 text-right">Yield %</th>
                  <th class="py-3 px-4">Progress</th>
                  <th class="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0]">
                ${batches.map(b => `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="py-3 px-4">
                      <div class="font-bold text-[#0F172A]">${b.batchId}</div>
                      <div class="text-[11px] font-mono text-[#006C7A]">${b.trackCode}</div>
                    </td>
                    <td class="py-3 px-4">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${b.stage === 'DEHEADING' ? 'bg-indigo-50 text-indigo-700' : b.stage === 'GRADING' ? 'bg-sky-50 text-sky-700' : b.stage === 'SOAKING' ? 'bg-teal-50 text-teal-700' : 'bg-purple-50 text-purple-700'}">
                        ${b.stage}
                      </span>
                      <div class="text-[11px] text-[#64748B] mt-0.5">${b.lineTable}</div>
                    </td>
                    <td class="py-3 px-4 font-medium text-[#334155]">${b.supervisor}</td>
                    <td class="py-3 px-4 text-right font-mono font-semibold">${b.inputKg.toLocaleString()}</td>
                    <td class="py-3 px-4 text-right font-mono font-semibold">${b.outputKg.toLocaleString()}</td>
                    <td class="py-3 px-4 text-right">
                      <span class="font-bold font-mono ${b.yieldPct >= b.targetYieldPct ? 'text-emerald-600' : 'text-amber-600'}">
                        ${b.yieldPct.toFixed(2)}%
                      </span>
                      <div class="text-[10px] text-slate-400">Target: ${b.targetYieldPct}%</div>
                    </td>
                    <td class="py-3 px-4 w-36">
                      <div class="flex items-center gap-2">
                        <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div class="bg-[#006C7A] h-1.5 rounded-full" style="width: ${b.progressPct}%"></div>
                        </div>
                        <span class="text-[10px] font-semibold text-slate-500">${b.progressPct}%</span>
                      </div>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${b.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-sky-50 text-sky-700 border border-sky-200'}">
                        ${b.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // Render native Canvas 2D telemetry chart
    this.renderThroughputChart();

    document.getElementById('btn-preproc-ack-alerts')?.addEventListener('click', () => {
      Toast.show('All shift alerts marked as acknowledged.', 'info');
    });
  },

  // Native Canvas 2D Telemetry Chart Render (zero external dependencies)
  renderThroughputChart() {
    const canvas = document.getElementById('preproc-throughput-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padX = 40;
    const padY = 30;

    const hours = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
    const honInput = [3200, 4800, 6200, 5400, 5900, 4100, 2800];
    const hlOutput = [2220, 3330, 4310, 3750, 4100, 2850, 1950];

    const maxVal = 7000;

    // Draw background grid
    ctx.strokeStyle = '#F1F5F9';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padY + (height - padY * 2) * (i / 4);
      ctx.beginPath();
      ctx.moveTo(padX, y);
      ctx.lineTo(width - padX, y);
      ctx.stroke();

      // Grid Label
      ctx.fillStyle = '#94A3B8';
      ctx.font = '10px -apple-system, system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${Math.round(maxVal - (maxVal * (i / 4)))} kg`, padX - 8, y + 3);
    }

    // Draw X labels
    ctx.textAlign = 'center';
    hours.forEach((h, idx) => {
      const x = padX + (width - padX * 2) * (idx / (hours.length - 1));
      ctx.fillText(h, x, height - 10);
    });

    // Helper for plotting line
    const plotLine = (data, strokeColor, fillColor) => {
      const points = data.map((val, idx) => ({
        x: padX + (width - padX * 2) * (idx / (data.length - 1)),
        y: padY + (height - padY * 2) * (1 - val / maxVal)
      }));

      // Area fill
      ctx.beginPath();
      ctx.moveTo(points[0].x, height - padY);
      points.forEach(pt => ctx.lineTo(pt.x, pt.y));
      ctx.lineTo(points[points.length - 1].x, height - padY);
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();

      // Stroke Line
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      points.forEach(pt => ctx.lineTo(pt.x, pt.y));
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Data dots
      points.forEach(pt => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };

    plotLine(honInput, '#006C7A', 'rgba(0, 108, 122, 0.08)');
    plotLine(hlOutput, '#10B981', 'rgba(16, 185, 129, 0.08)');
  },

  // =========================================================================
  // VIEW 2: RM RECEIVING & SIZING
  // =========================================================================
  renderReceivingSizing(container) {
    const dockList = PREPROCESSING_DATA.dockIntakes;
    const graders = PREPROCESSING_DATA.rollerGraderRuns;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <!-- 1. Search & Filter Bar -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3 flex-1 min-w-[280px]">
            <div class="relative flex-1">
              <svg class="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input 
                type="text" 
                id="preproc-search-dock" 
                placeholder="Search by Track ID, Vehicle No, Seal No, or Pond..."
                class="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#006C7A] focus:bg-white transition-all"
              />
            </div>
            <select id="preproc-filter-variety" class="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700">
              <option value="ALL">All Varieties</option>
              <option value="VM-HEAD ON">Vannamei (VM)</option>
              <option value="BT-HEAD ON">Black Tiger (BT)</option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-500 font-medium">Verified Dock Intakes: <strong>${dockList.length} Lots</strong></span>
          </div>
        </div>

        <!-- 2. Dock RM Intake & Count Verification Table -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div class="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Raw Material Dock Intake & Count Discrepancy Register</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Weighbridge verification, seal inspection, and Bill Count vs Dock Count audit</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-[#0F172A]">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                <tr>
                  <th class="py-3 px-4">Track Code</th>
                  <th class="py-3 px-4">Vehicle & Seal</th>
                  <th class="py-3 px-4">Pond Harvest Source</th>
                  <th class="py-3 px-4 text-right">Bill Count</th>
                  <th class="py-3 px-4 text-right">Dock Count</th>
                  <th class="py-3 px-4 text-right">Count Diff</th>
                  <th class="py-3 px-4 text-right">Dock Wt (kg)</th>
                  <th class="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0]">
                ${dockList.map(d => `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="py-3 px-4 font-bold font-mono text-[#006C7A]">${d.trackCode}</td>
                    <td class="py-3 px-4">
                      <div class="font-medium text-[#0F172A]">${d.vehicleNo}</div>
                      <div class="text-[11px] text-slate-500 font-mono">Seal: ${d.sealNo}</div>
                    </td>
                    <td class="py-3 px-4">
                      <div class="font-medium text-slate-800">${d.supplier}</div>
                      <div class="text-[11px] text-slate-500">${d.pondSource}</div>
                    </td>
                    <td class="py-3 px-4 text-right font-mono">${d.billCount.toFixed(1)}</td>
                    <td class="py-3 px-4 text-right font-mono font-bold">${d.dockCount.toFixed(1)}</td>
                    <td class="py-3 px-4 text-right font-mono font-bold ${d.countDiff < 0 ? 'text-rose-600' : 'text-emerald-600'}">
                      ${d.countDiff > 0 ? '+' : ''}${d.countDiff.toFixed(1)}
                    </td>
                    <td class="py-3 px-4 text-right font-mono font-bold">${d.dockWeightKg.toLocaleString()}</td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${d.status === 'VERIFIED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-sky-50 text-sky-700 border border-sky-200'}">
                        ${d.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 3. Roller Grader Line Sizing Table -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div class="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Mechanical Roller Grader Sizing Runs</h3>
              <p class="text-xs text-[#64748B] mt-0.5">High-speed roller grading machines sorting by count per pound</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-[#0F172A]">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                <tr>
                  <th class="py-3 px-4">Grader Machine</th>
                  <th class="py-3 px-4">Variety</th>
                  <th class="py-3 px-4">Target Grade</th>
                  <th class="py-3 px-4 text-right">Actual Count/LB</th>
                  <th class="py-3 px-4 text-right">Crates</th>
                  <th class="py-3 px-4 text-right">Net Wt (kg)</th>
                  <th class="py-3 px-4">Run Hours / Downtime</th>
                  <th class="py-3 px-4 text-center">Line Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0]">
                ${graders.map(g => `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="py-3 px-4 font-bold text-[#0F172A]">${g.graderNo}</td>
                    <td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px]">${g.variety}</span></td>
                    <td class="py-3 px-4 font-bold text-teal-700">${g.targetGrade}</td>
                    <td class="py-3 px-4 text-right font-mono font-bold">${g.actualCountLb}</td>
                    <td class="py-3 px-4 text-right font-mono">${g.crateCount}</td>
                    <td class="py-3 px-4 text-right font-mono font-bold">${g.netWeightKg.toLocaleString()}</td>
                    <td class="py-3 px-4 text-slate-500">
                      ${g.startTime} - ${g.endTime} (${g.breakMinutes}m break)
                    </td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${g.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-sky-50 text-sky-700 border border-sky-200'}">
                        ${g.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // VIEW 3: DEHEADING & PEELING
  // =========================================================================
  renderDeheadingPeeling(container) {
    const deheading = PREPROCESSING_DATA.deheadingShifts;
    const vaRuns = PREPROCESSING_DATA.valueAdditionRuns;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <!-- 1. Shift Deheading Operations Table -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div class="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Shift-Wise Head Removal (HON to HL) & Yield Performance</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Capturing conversion recovery %, ice consumption, and supervisor approvals</p>
            </div>
            <div class="text-xs text-slate-500">Target Standard Benchmark: <strong>68.50%</strong></div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-[#0F172A]">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                <tr>
                  <th class="py-3 px-4">Shift & Date</th>
                  <th class="py-3 px-4">Supervisor / Crew</th>
                  <th class="py-3 px-4 text-right">Gross HON (kg)</th>
                  <th class="py-3 px-4 text-right">Recovered HL (kg)</th>
                  <th class="py-3 px-4 text-right">Yield %</th>
                  <th class="py-3 px-4 text-right">Count/LB</th>
                  <th class="py-3 px-4 text-right">Ice (kg)</th>
                  <th class="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0]">
                ${deheading.map(d => `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="py-3 px-4">
                      <div class="font-bold text-[#0F172A]">${d.shift}</div>
                      <div class="text-[11px] text-slate-500">${d.date}</div>
                    </td>
                    <td class="py-3 px-4">
                      <div class="font-medium text-slate-800">${d.supervisor}</div>
                      <div class="text-[11px] text-slate-500">${d.operatorsCount} Peelers Active</div>
                    </td>
                    <td class="py-3 px-4 text-right font-mono font-bold">${d.grossHonKg.toLocaleString()}</td>
                    <td class="py-3 px-4 text-right font-mono font-bold">${d.recoveredHlKg.toLocaleString()}</td>
                    <td class="py-3 px-4 text-right">
                      <span class="font-bold font-mono text-sm ${d.yieldPct >= d.targetYieldPct ? 'text-emerald-600' : 'text-amber-600'}">
                        ${d.yieldPct.toFixed(2)}%
                      </span>
                    </td>
                    <td class="py-3 px-4 text-right font-mono">${d.countPerLb}</td>
                    <td class="py-3 px-4 text-right font-mono text-slate-600">${d.iceConsumptionKg.toLocaleString()}</td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${d.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-sky-50 text-sky-700 border border-sky-200'}">
                        ${d.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 2. Value Addition Peeling Lines (RPD, PVPD, RPDTO) -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div class="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Value Addition Peeling Lines (RPD, PVPD, Tail-On)</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Headless (RHLSO) conversion to peeled and deveined export specifications</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-[#0F172A]">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                <tr>
                  <th class="py-3 px-4">VA Batch ID</th>
                  <th class="py-3 px-4">Track Code</th>
                  <th class="py-3 px-4">Product Style</th>
                  <th class="py-3 px-4 text-right">Input HL (kg)</th>
                  <th class="py-3 px-4 text-right">Output VA (kg)</th>
                  <th class="py-3 px-4 text-right">Rejection (kg)</th>
                  <th class="py-3 px-4 text-right">Recovery %</th>
                  <th class="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0]">
                ${vaRuns.map(v => `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="py-3 px-4 font-bold text-[#0F172A]">${v.id}</td>
                    <td class="py-3 px-4 font-mono text-[#006C7A]">${v.trackCode}</td>
                    <td class="py-3 px-4 font-medium text-slate-800">${v.productStyle}</td>
                    <td class="py-3 px-4 text-right font-mono font-semibold">${v.inputHlKg.toLocaleString()}</td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-teal-700">${v.outputVaKg.toLocaleString()}</td>
                    <td class="py-3 px-4 text-right font-mono text-rose-600">${v.rejectionKg}</td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-emerald-600">${v.recoveryYieldPct.toFixed(1)}%</td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${v.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-sky-50 text-sky-700 border border-sky-200'}">
                        ${v.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // VIEW 4: INTER-PLANT TRANSFERS
  // =========================================================================
  renderInterplantTransfers(container) {
    const transfers = PREPROCESSING_DATA.interplantTransfers;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div class="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Chilled Inter-Plant Stock Transfer Manifests</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Transfer of post-VA headless totes between DFL Unit-1 VSP, Unit-2 KKD & Unit-3 PSP</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-[#0F172A]">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                <tr>
                  <th class="py-3 px-4">Manifest ID / Date</th>
                  <th class="py-3 px-4">From Plant → To Plant</th>
                  <th class="py-3 px-4">Item & Grade</th>
                  <th class="py-3 px-4 text-right">Dispatch Wt (kg)</th>
                  <th class="py-3 px-4 text-right">Received Wt (kg)</th>
                  <th class="py-3 px-4">Vehicle & Driver</th>
                  <th class="py-3 px-4 text-right">Core Temp</th>
                  <th class="py-3 px-4 text-center">Transit Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0]">
                ${transfers.map(t => `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="py-3 px-4">
                      <div class="font-bold text-[#0F172A]">${t.manifestNo}</div>
                      <div class="text-[11px] text-slate-500">${t.date}</div>
                    </td>
                    <td class="py-3 px-4">
                      <div class="font-semibold text-[#006C7A]">${t.fromPlant}</div>
                      <div class="text-[11px] text-slate-500">→ ${t.toPlant}</div>
                    </td>
                    <td class="py-3 px-4">
                      <div class="font-medium text-slate-800">${t.varietyStyle}</div>
                      <div class="text-[11px] text-slate-500">${t.gradeBand} (${t.iceCrates} crates)</div>
                    </td>
                    <td class="py-3 px-4 text-right font-mono font-bold">${t.dispatchKg.toLocaleString()}</td>
                    <td class="py-3 px-4 text-right font-mono font-bold">${t.receivedKg.toLocaleString()}</td>
                    <td class="py-3 px-4">
                      <div class="font-mono text-slate-700">${t.vehicleNo}</div>
                      <div class="text-[11px] text-slate-500">${t.driverName}</div>
                    </td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-sky-700">${t.dockTempCelsius}°C</td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${t.transitStatus === 'RECEIVED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}">
                        ${t.transitStatus}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // VIEW 5: CHEMICAL STOCK & RECEIPTS
  // =========================================================================
  renderStockReceipts(container) {
    const chems = PREPROCESSING_DATA.chemicalInventory;
    const pos = PREPROCESSING_DATA.chemicalPOs;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <!-- 1. Chemical Stock Ledger Matrix -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div class="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Food-Grade Processing Chemical Stock Matrix</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Approved moisture retention additives, non-phosphates, and PVD vacuum salt</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-[#0F172A]">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                <tr>
                  <th class="py-3 px-4">Chemical Code & Name</th>
                  <th class="py-3 px-4">Supplier / Category</th>
                  <th class="py-3 px-4 text-right">Opening (Bags)</th>
                  <th class="py-3 px-4 text-right">Received</th>
                  <th class="py-3 px-4 text-right">Issued</th>
                  <th class="py-3 px-4 text-right">Balance (Bags)</th>
                  <th class="py-3 px-4 text-right">Net Weight (kg)</th>
                  <th class="py-3 px-4 text-center">Buffer Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0]">
                ${chems.map(c => `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="py-3 px-4">
                      <div class="font-bold text-[#0F172A]">${c.name}</div>
                      <div class="text-[11px] font-mono text-[#006C7A]">${c.code}</div>
                    </td>
                    <td class="py-3 px-4">
                      <div class="font-medium text-slate-800">${c.supplier}</div>
                      <div class="text-[11px] text-slate-500">${c.category}</div>
                    </td>
                    <td class="py-3 px-4 text-right font-mono">${c.openingBags}</td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-emerald-600">+${c.receivedBags}</td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-rose-600">-${c.issuedBags}</td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-sm text-[#0F172A]">${c.closingBags}</td>
                    <td class="py-3 px-4 text-right font-mono font-bold">${c.closingKg.toLocaleString()}</td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${c.status === 'LOW_STOCK' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}">
                        ${c.status === 'LOW_STOCK' ? 'LOW BUFFER' : 'ADEQUATE'}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 2. Import POs & Customs Clearance Register -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div class="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Chemical Purchase Orders & Customs Inward Register</h3>
              <p class="text-xs text-[#64748B] mt-0.5">High Seas Sale (HSS), In-Bond customs clearance, Bill of Entry (BoE) & BL tracking</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-[#0F172A]">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                <tr>
                  <th class="py-3 px-4">PO Number & Date</th>
                  <th class="py-3 px-4">Supplier & Product</th>
                  <th class="py-3 px-4">Import Terms & Port</th>
                  <th class="py-3 px-4">BoE / BL Numbers</th>
                  <th class="py-3 px-4 text-right">Ordered Bags</th>
                  <th class="py-3 px-4 text-right">Received Bags</th>
                  <th class="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0]">
                ${pos.map(p => `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="py-3 px-4">
                      <div class="font-bold text-[#0F172A]">${p.poNo}</div>
                      <div class="text-[11px] text-slate-500">${p.date}</div>
                    </td>
                    <td class="py-3 px-4">
                      <div class="font-medium text-slate-800">${p.item}</div>
                      <div class="text-[11px] text-slate-500">${p.supplier}</div>
                    </td>
                    <td class="py-3 px-4">
                      <span class="inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">${p.importType}</span>
                      <div class="text-[11px] text-slate-500 mt-0.5">${p.portOfEntry}</div>
                    </td>
                    <td class="py-3 px-4 font-mono text-[11px]">
                      <div>${p.boeNo}</div>
                      <div class="text-slate-500">${p.blNo}</div>
                    </td>
                    <td class="py-3 px-4 text-right font-mono">${p.orderedBags}</td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-teal-700">${p.receivedBags}</td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${p.status === 'CLEARED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}">
                        ${p.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // VIEW 6: DAILY USAGE & SOAKING
  // =========================================================================
  renderDailyUsage(container) {
    const usage = PREPROCESSING_DATA.dailyUsageLogs;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div class="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Chilled Soaking Tanks Chemical Dosage & Usage Log</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Formula: Opening + Received - Sent - Consumed = Closing Balance</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-[#0F172A]">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                <tr>
                  <th class="py-3 px-4">Log ID / Shift</th>
                  <th class="py-3 px-4">Chemical & Tank ID</th>
                  <th class="py-3 px-4">Target Variety & Grade</th>
                  <th class="py-3 px-4 text-right">Bags Used</th>
                  <th class="py-3 px-4 text-right">Net Additive (kg)</th>
                  <th class="py-3 px-4 text-right">Bath Conc %</th>
                  <th class="py-3 px-4 text-right">Dip Duration</th>
                  <th class="py-3 px-4 text-center">Verification</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0]">
                ${usage.map(u => `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="py-3 px-4">
                      <div class="font-bold text-[#0F172A]">${u.id}</div>
                      <div class="text-[11px] text-slate-500">${u.date} • ${u.shift}</div>
                    </td>
                    <td class="py-3 px-4">
                      <div class="font-medium text-slate-800">${u.chemicalName}</div>
                      <div class="text-[11px] font-mono text-[#006C7A]">${u.tankId}</div>
                    </td>
                    <td class="py-3 px-4 font-medium text-slate-700">${u.targetVariety}</td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-rose-600">${u.bagsUsed} Bags</td>
                    <td class="py-3 px-4 text-right font-mono font-bold">${u.kgUsed} kg</td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-teal-700">${u.bathConcentrationPct}%</td>
                    <td class="py-3 px-4 text-right font-mono text-slate-600">${u.dipDurationMins} mins (${u.waterTempCelsius}°C)</td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ${u.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // VIEW 7: SUPPLIER SETTLEMENTS
  // =========================================================================
  renderSupplierSettlements(container) {
    const settlements = PREPROCESSING_DATA.supplierSettlements;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div class="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Chemical Supplier Accounts Payable & Bank Settlements</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Audit matching vendor invoices against Bank UTR numbers and BoE receipts</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-[#0F172A]">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                <tr>
                  <th class="py-3 px-4">Voucher No</th>
                  <th class="py-3 px-4">Vendor & Invoice</th>
                  <th class="py-3 px-4 text-right">Amount (INR)</th>
                  <th class="py-3 px-4">Payment Date</th>
                  <th class="py-3 px-4">Bank UTR Reference</th>
                  <th class="py-3 px-4">Payment Mode</th>
                  <th class="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0]">
                ${settlements.map(s => `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="py-3 px-4 font-bold font-mono text-[#0F172A]">${s.voucherNo}</td>
                    <td class="py-3 px-4">
                      <div class="font-medium text-slate-800">${s.vendor}</div>
                      <div class="text-[11px] text-slate-500 font-mono">${s.invoiceNo}</div>
                    </td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-sm">₹${s.invoiceAmountInr.toLocaleString()}</td>
                    <td class="py-3 px-4 text-slate-600">${s.paymentDate}</td>
                    <td class="py-3 px-4 font-mono text-[11px] text-[#006C7A]">${s.bankUtr}</td>
                    <td class="py-3 px-4 text-slate-600">${s.paymentMode}</td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${s.status === 'SETTLED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}">
                        ${s.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // VIEW 8: BATCH TRACEABILITY (Pond-to-Pack Master)
  // =========================================================================
  renderBatchTraceability(container) {
    const trace = PREPROCESSING_DATA.batchTraceability;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div class="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Pond-to-Pack Master Traceability Audit (USFDA / EU / BAP)</h3>
              <p class="text-xs text-[#64748B] mt-0.5">End-to-end genealogical chain: Harvest Pond → Bill → Deheading → Grading → Freezing</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-[#0F172A]">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                <tr>
                  <th class="py-3 px-4">Track Code</th>
                  <th class="py-3 px-4">Pond Source</th>
                  <th class="py-3 px-4 text-right">Recv Wt</th>
                  <th class="py-3 px-4 text-right">Dehead Wt</th>
                  <th class="py-3 px-4 text-right">Graded Wt</th>
                  <th class="py-3 px-4 text-right">Yield %</th>
                  <th class="py-3 px-4">Freezer Tunnel / Lot</th>
                  <th class="py-3 px-4 text-center">Export Clearance</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0]">
                ${trace.map(t => `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="py-3 px-4 font-bold font-mono text-[#006C7A]">${t.trackCode}</td>
                    <td class="py-3 px-4">
                      <div class="font-medium text-slate-800">${t.pondSource}</div>
                      <div class="text-[11px] text-slate-500">Bill Count: ${t.billCount} pcs/kg</div>
                    </td>
                    <td class="py-3 px-4 text-right font-mono">${t.recvWeightKg.toLocaleString()}</td>
                    <td class="py-3 px-4 text-right font-mono font-semibold">${t.deheadingWeightKg.toLocaleString()}</td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-teal-700">${t.gradingWeightKg.toLocaleString()}</td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-emerald-600">${t.gradingYieldPct.toFixed(2)}%</td>
                    <td class="py-3 px-4">
                      <div class="font-medium text-slate-800">${t.freezerTunnelId}</div>
                      <div class="text-[11px] text-slate-500 font-mono">Lot: ${t.exportCartonLot}</div>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ${t.complianceCert}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // VIEW 9: VA FLOOR BALANCE
  // =========================================================================
  renderVAFloorBalance(container) {
    const matrix = PREPROCESSING_DATA.vaFloorBalance;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div class="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Live Factory Floor WIP Matrix</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Cross-referencing Variety × Size Grade × Treatment (STPP vs Untreated UNT)</p>
            </div>
            <span class="text-xs font-semibold text-slate-500">Total Active Floor WIP: <strong>3,103 kg</strong></span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-[#0F172A]">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                <tr>
                  <th class="py-3 px-4">Line / Station Location</th>
                  <th class="py-3 px-4">Variety & Grade</th>
                  <th class="py-3 px-4">Chemical Treatment</th>
                  <th class="py-3 px-4 text-right">Crates Tally</th>
                  <th class="py-3 px-4 text-right">Net Weight (kg)</th>
                  <th class="py-3 px-4 text-right">Core Temp</th>
                  <th class="py-3 px-4 text-center">Floor Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0]">
                ${matrix.map(m => `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="py-3 px-4 font-bold text-[#0F172A]">${m.lineStation}</td>
                    <td class="py-3 px-4">
                      <div class="font-medium text-slate-800">${m.variety}</div>
                      <div class="text-[11px] text-slate-500">${m.grade}</div>
                    </td>
                    <td class="py-3 px-4">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${m.treatment.includes('STPP') ? 'bg-amber-50 text-amber-700' : 'bg-teal-50 text-teal-700'}">
                        ${m.treatment}
                      </span>
                    </td>
                    <td class="py-3 px-4 text-right font-mono font-bold">${m.crates} Crates</td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-sm text-[#006C7A]">${m.netWeightKg.toLocaleString()}</td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-sky-700">${m.coreTempCelsius}°C</td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${m.status === 'ACTIVE_WIP' ? 'bg-sky-50 text-sky-700 border border-sky-200' : 'bg-slate-100 text-slate-700'}">
                        ${m.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // VIEW 10: YIELD & PACK RECONCILIATION
  // =========================================================================
  renderYieldReconciliation(container) {
    const recons = PREPROCESSING_DATA.yieldReconciliations;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div class="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Financial Yield & Finished Packaging Realization Audit</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Linking farm gate purchase cost per count with finished graded realization to audit gross margins</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-[#0F172A]">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                <tr>
                  <th class="py-3 px-4">Lot No / Track Code</th>
                  <th class="py-3 px-4 text-right">Procurement Rate (₹/kg)</th>
                  <th class="py-3 px-4 text-right">Graded Output (kg)</th>
                  <th class="py-3 px-4 text-right">Realized Value (₹)</th>
                  <th class="py-3 px-4 text-right">Gross Margin %</th>
                  <th class="py-3 px-4 text-right">Glaze Variance</th>
                  <th class="py-3 px-4 text-right">Packing Loss %</th>
                  <th class="py-3 px-4 text-center">Audit Result</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0]">
                ${recons.map(r => `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="py-3 px-4">
                      <div class="font-bold text-[#0F172A]">${r.lotNo}</div>
                      <div class="text-[11px] font-mono text-[#006C7A]">${r.trackCode}</div>
                    </td>
                    <td class="py-3 px-4 text-right font-mono font-semibold">₹${r.purchaseCostPerKg}</td>
                    <td class="py-3 px-4 text-right font-mono font-bold">${r.gradedRealizedKg.toLocaleString()}</td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-teal-700">₹${r.realizedValueInr.toLocaleString()}</td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-emerald-600">+${r.costMarginPct}%</td>
                    <td class="py-3 px-4 text-right font-mono text-slate-600">${r.glazeVariancePct > 0 ? '+' : ''}${r.glazeVariancePct}%</td>
                    <td class="py-3 px-4 text-right font-mono text-slate-600">${r.packagingLossPct}%</td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ${r.auditResult}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // MODALS (AquaOps Interactive Data Entry)
  // =========================================================================
  openDockIntakeModal() {
    Modal.open({
      title: "Record RM Dock Intake & Count Verification",
      size: "lg",
      content: `
        <form id="form-dock-intake" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Track Code Format</label>
              <input type="text" id="intake-track-code" value="VM-VSP-AVN-035" class="w-full text-xs p-2 border border-slate-200 rounded-lg font-mono bg-slate-50" readonly />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Vehicle Number</label>
              <input type="text" id="intake-vehicle" placeholder="e.g. AP 37 TE 9940" class="w-full text-xs p-2 border border-slate-200 rounded-lg" required />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Container Seal Number</label>
              <input type="text" id="intake-seal" placeholder="e.g. SL-99512" class="w-full text-xs p-2 border border-slate-200 rounded-lg" required />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Pond / Supplier</label>
              <input type="text" id="intake-supplier" placeholder="e.g. Godavari Aqua Cluster Pond #8" class="w-full text-xs p-2 border border-slate-200 rounded-lg" required />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Pond Bill Count (pcs/kg)</label>
              <input type="number" step="0.1" id="intake-bill-count" value="45.0" class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white font-mono" required />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Dock Sample Count (pcs/kg)</label>
              <input type="number" step="0.1" id="intake-dock-count" value="44.2" class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white font-mono" required />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Dock Weight (kg)</label>
              <input type="number" id="intake-dock-wt" value="3950" class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white font-mono font-bold" required />
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: "Cancel", type: "secondary" },
        { label: "Verify & Save Intake", type: "primary" }
      ]
    });

    document.getElementById('modal-btn-1')?.addEventListener('click', () => {
      const vehicle = document.getElementById('intake-vehicle')?.value;
      if (!vehicle) {
        Toast.show('Please enter vehicle number.', 'warning');
        return;
      }
      Modal.close();
      Toast.show('Dock Intake and Count verification recorded successfully.', 'success');
    });

    document.getElementById('modal-btn-0')?.addEventListener('click', () => Modal.close());
  },

  openDeheadingBatchModal() {
    Modal.open({
      title: "Start Deheading Shift Batch",
      size: "lg",
      content: `
        <form id="form-deheading" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Shift</label>
              <select class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white">
                <option>Shift A (Morning 06:00 - 14:00)</option>
                <option>Shift B (Afternoon 14:00 - 22:00)</option>
                <option>Shift C (Night 22:00 - 06:00)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Supervisor</label>
              <input type="text" value="Laxmi Narayana" class="w-full text-xs p-2 border border-slate-200 rounded-lg" />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Gross HON Input (kg)</label>
              <input type="number" id="dh-hon" value="4500" class="w-full text-xs p-2 border border-slate-200 rounded-lg font-mono font-bold" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Target Yield %</label>
              <input type="text" value="68.50%" class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-slate-50 font-mono" readonly />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Ice Allocated (kg)</label>
              <input type="number" value="1500" class="w-full text-xs p-2 border border-slate-200 rounded-lg font-mono" />
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: "Cancel", type: "secondary" },
        { label: "Start Batch", type: "primary" }
      ]
    });

    document.getElementById('modal-btn-1')?.addEventListener('click', () => {
      Modal.close();
      Toast.show('Deheading batch initiated on Table #1 & #2.', 'success');
    });

    document.getElementById('modal-btn-0')?.addEventListener('click', () => Modal.close());
  },

  openTransferModal() {
    Modal.open({
      title: "New Inter-Plant Stock Transfer Manifest",
      size: "md",
      content: `
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Source Plant</label>
              <input type="text" value="DFL Unit-2 (Kakinada)" class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-slate-50" readonly />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Destination Facility</label>
              <select class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white">
                <option>DFL Unit-1 (Visakhapatnam)</option>
                <option>DFL Unit-3 (Pydibhimavaram)</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Net Weight (kg)</label>
            <input type="number" value="3800" class="w-full text-xs p-2 border border-slate-200 rounded-lg font-mono font-bold" />
          </div>
        </div>
      `,
      footerButtons: [
        { label: "Cancel", type: "secondary" },
        { label: "Issue Gate Pass & Dispatch", type: "primary" }
      ]
    });

    document.getElementById('modal-btn-1')?.addEventListener('click', () => {
      Modal.close();
      Toast.show('Stock Transfer Manifest TRF-DFL-2026-042 generated.', 'success');
    });

    document.getElementById('modal-btn-0')?.addEventListener('click', () => Modal.close());
  },

  openChemicalPOModal() {
    Modal.open({
      title: "Create Food-Grade Chemical Purchase Order",
      size: "lg",
      content: `
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Chemical Item</label>
              <select class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white">
                <option>STPP Carnal 659S (25kg bags)</option>
                <option>Altesa Neo S100 Non-Phosphate (25kg bags)</option>
                <option>Pure Vacuum Dried Salt (PVD - 50kg bags)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Import Type</label>
              <select class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white">
                <option>High Seas Sale (HSS)</option>
                <option>In-Bond (HSS_BOND)</option>
                <option>Domestic Clearance</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Order Quantity (Bags)</label>
              <input type="number" value="400" class="w-full text-xs p-2 border border-slate-200 rounded-lg font-mono font-bold" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Port of Discharge</label>
              <select class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white">
                <option>Kakinada Deep Water Port</option>
                <option>Paradip Port</option>
                <option>Visakhapatnam Port</option>
              </select>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        { label: "Cancel", type: "secondary" },
        { label: "Transmit PO to Supplier", type: "primary" }
      ]
    });

    document.getElementById('modal-btn-1')?.addEventListener('click', () => {
      Modal.close();
      Toast.show('Chemical PO transmitted to importer with customs clearance tracking.', 'success');
    });

    document.getElementById('modal-btn-0')?.addEventListener('click', () => Modal.close());
  },

  openUsageModal() {
    Modal.open({
      title: "Log Floor Additive Consumption",
      size: "md",
      content: `
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Chemical Additive</label>
            <select class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white">
              <option>STPP Carnal 659S (25kg bag)</option>
              <option>Altesa Neo S100 Non-Phosphate</option>
              <option>Food Grade PVD Salt</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Bags Issued</label>
              <input type="number" value="4" class="w-full text-xs p-2 border border-slate-200 rounded-lg font-mono font-bold" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Soaking Tank ID</label>
              <input type="text" value="Chilled Bath Tank S-1" class="w-full text-xs p-2 border border-slate-200 rounded-lg" />
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        { label: "Cancel", type: "secondary" },
        { label: "Save Usage Log", type: "primary" }
      ]
    });

    document.getElementById('modal-btn-1')?.addEventListener('click', () => {
      Modal.close();
      Toast.show('Floor chemical usage logged into daily ledger.', 'success');
    });

    document.getElementById('modal-btn-0')?.addEventListener('click', () => Modal.close());
  },

  openPaymentModal() {
    Modal.open({
      title: "Record Chemical Supplier Payment",
      size: "md",
      content: `
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Vendor Invoice</label>
            <select class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white">
              <option>New Tech Bio-Solutions — INV-NTB-2026-441 (₹9,60,000)</option>
              <option>Prayon S.A. — INV-GC-8812 (₹15,45,600)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Bank UTR Transaction Reference</label>
            <input type="text" placeholder="e.g. HDFCR520261014902144" class="w-full text-xs p-2 border border-slate-200 rounded-lg font-mono" />
          </div>
        </div>
      `,
      footerButtons: [
        { label: "Cancel", type: "secondary" },
        { label: "Confirm Settlement", type: "primary" }
      ]
    });

    document.getElementById('modal-btn-1')?.addEventListener('click', () => {
      Modal.close();
      Toast.show('Payment voucher settled and posted to Accounts Payable.', 'success');
    });

    document.getElementById('modal-btn-0')?.addEventListener('click', () => Modal.close());
  }
};
