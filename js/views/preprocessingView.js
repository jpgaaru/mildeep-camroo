// AquaOps Pre-Processing Module Controller
// Built strictly adhering to AquaOps Framework: Molecules.StatTile, Molecules.FilterBar & DataTable

import { PREPROCESSING_DATA } from '../data/preprocessingData.js';
import { Molecules } from '../framework/index.js';
import { DataTable } from '../components/table.js';
import { Skeleton } from '../components/skeleton.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';

export const PreprocessingView = {
  tableInstances: {},

  render(containerId, subPage = 'floor-overview', activeHash = '#/preprocessing/dashboard/floor-overview') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 1. Sync Primary Header Action Button on top-right inline with title
    this.updateHeaderAction(subPage);

    // 2. Render standard Skeleton Shimmer loading state
    container.innerHTML = `<div id="preproc-subpage-content">${Skeleton.renderTable(6, 6)}</div>`;
    const subContainer = document.getElementById('preproc-subpage-content');

    // 3. Smooth transition into populated data view
    setTimeout(() => {
      switch (subPage) {
        // 1. Sub Menu: Dashboard
        case 'floor-overview':
          this.renderFloorOverview(subContainer);
          break;

        // 2. Sub Menu: Floor Operations
        case 'receiving-sorting':
          this.renderReceivingSorting(subContainer);
          break;
        case 'preprocessing-tasks':
          this.renderPreprocessingTasks(subContainer);
          break;

        // 3. Sub Menu: Chemical Inventory & Usage
        case 'chemical-stock':
          this.renderChemicalStock(subContainer);
          break;
        case 'usage-logs':
          this.renderUsageLogs(subContainer);
          break;

        // 4. Sub Menu: Traceability
        case 'batch-traceability':
          this.renderBatchTraceability(subContainer);
          break;

        default:
          this.renderFloorOverview(subContainer);
          break;
      }
    }, 120);
  },

  // =========================================================================
  // TOP-RIGHT PRIMARY ACTION BUTTON (AquaOps Standard)
  // =========================================================================
  updateHeaderAction(tabName) {
    const actionContainer = document.getElementById('section-action-btn-container');
    if (!actionContainer) return;

    switch (tabName) {
      case 'floor-overview':
        actionContainer.innerHTML = `
          <button id="btn-preproc-refresh" class="btn-secondary px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer hover:bg-slate-100 transition-all text-[#006C7A]">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            <span>Live Telemetry</span>
          </button>
        `;
        document.getElementById('btn-preproc-refresh')?.addEventListener('click', () => {
          Toast.show('Live processing line sensors and floor scale telemetry synchronized.', 'info');
        });
        break;

      case 'receiving-sorting':
        actionContainer.innerHTML = `
          <button id="btn-preproc-record-intake" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Record Dock Intake</span>
          </button>
        `;
        document.getElementById('btn-preproc-record-intake')?.addEventListener('click', () => this.openDockIntakeModal());
        break;

      case 'preprocessing-tasks':
        actionContainer.innerHTML = `
          <button id="btn-preproc-new-task" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Start Shift Batch</span>
          </button>
        `;
        document.getElementById('btn-preproc-new-task')?.addEventListener('click', () => this.openShiftBatchModal());
        break;

      case 'chemical-stock':
        actionContainer.innerHTML = `
          <button id="btn-preproc-new-chem-po" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Create Chemical Inward</span>
          </button>
        `;
        document.getElementById('btn-preproc-new-chem-po')?.addEventListener('click', () => this.openChemicalInwardModal());
        break;

      case 'usage-logs':
        actionContainer.innerHTML = `
          <button id="btn-preproc-log-usage" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Log Additive Usage</span>
          </button>
        `;
        document.getElementById('btn-preproc-log-usage')?.addEventListener('click', () => this.openUsageModal());
        break;

      case 'batch-traceability':
        actionContainer.innerHTML = `
          <button id="btn-preproc-export-trace" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span>Export Trace Certificate</span>
          </button>
        `;
        document.getElementById('btn-preproc-export-trace')?.addEventListener('click', () => {
          Toast.show('USFDA/EU Traceability Manifest certificate exported successfully.', 'success');
        });
        break;

      default:
        actionContainer.innerHTML = '';
        break;
    }
  },

  // =========================================================================
  // 1. SUB MENU: DASHBOARD -> TAB: FLOOR OVERVIEW
  // =========================================================================
  renderFloorOverview(container) {
    const k = PREPROCESSING_DATA.kpis;
    const batches = PREPROCESSING_DATA.activeBatches;

    const statTilesHtml = [
      Molecules.StatTile({
        label: 'TODAY RM INTAKE',
        value: k.todayArrivalsKg.toLocaleString(),
        unit: 'Kg',
        badgeText: '↑ 12.4%',
        badgeTone: 'teal',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>`,
        footerLabel: 'Harvest Intake',
        footerValue: '5 Trucks Docked'
      }),
      Molecules.StatTile({
        label: 'DEHEADING YIELD',
        value: `${k.avgDeheadingYieldPct}%`,
        unit: '',
        badgeText: `+${(k.avgDeheadingYieldPct - k.yieldBenchmarkPct).toFixed(2)}%`,
        badgeTone: 'emerald',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
        footerLabel: 'Benchmark Target',
        footerValue: `${k.yieldBenchmarkPct}% (HON to HL)`
      }),
      Molecules.StatTile({
        label: 'FLOOR WIP IN-PROCESS',
        value: k.floorWipKg.toLocaleString(),
        unit: 'Kg',
        badgeText: 'Active',
        badgeTone: 'sky',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
        footerLabel: 'Processing Tables',
        footerValue: '7 Lines Active'
      }),
      Molecules.StatTile({
        label: 'CHEMICAL BUFFER (STPP)',
        value: `${k.chemicalStppBags}`,
        unit: 'Bags',
        badgeText: 'Low Buffer',
        badgeTone: 'amber',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`,
        footerLabel: 'Reorder Buffer Threshold',
        footerValue: `${k.chemicalBufferThreshold} Bags (450 kg on floor)`
      })
    ].join('');

    const filterBarHtml = Molecules.FilterBar({
      id: 'preproc-overview-filter',
      title: 'Search & Filters',
      fields: [
        {
          type: 'select',
          id: 'filter-overview-variety',
          label: 'VARIETY / SPECIES',
          value: 'ALL',
          options: [
            { value: 'ALL', label: 'All Varieties (Select)' },
            { value: 'VM', label: 'Vannamei (VM)' },
            { value: 'BT', label: 'Black Tiger (BT)' }
          ]
        },
        {
          type: 'select',
          id: 'filter-overview-stage',
          label: 'PROCESSING STAGE',
          value: 'ALL',
          options: [
            { value: 'ALL', label: 'All Stages (Select)' },
            { value: 'DEHEADING', label: 'Deheading Lines' },
            { value: 'GRADING', label: 'Roller Graders' },
            { value: 'PEELING', label: 'Peeling (VA)' },
            { value: 'SOAKING', label: 'Chilled Soaking Tanks' }
          ]
        },
        {
          type: 'select',
          id: 'filter-overview-plant',
          label: 'PLANT',
          value: 'ALL',
          options: [
            { value: 'ALL', label: 'All Plants (Select)' },
            { value: 'DFL UNIT-1 (VSP)', label: 'DFL UNIT-1 (VSP)' },
            { value: 'DFL UNIT-2 (KKD)', label: 'DFL UNIT-2 (KKD)' },
            { value: 'DFL UNIT-3 (PSP)', label: 'DFL UNIT-3 (PSP)' }
          ]
        },
        {
          type: 'date',
          id: 'filter-overview-from-date',
          label: 'FROM DATE',
          placeholder: 'dd/mm/yyyy'
        },
        {
          type: 'date',
          id: 'filter-overview-to-date',
          label: 'TO DATE',
          placeholder: 'dd/mm/yyyy'
        }
      ]
    });

    container.innerHTML = `
      <div class="space-y-5 animate-fade-in">
        <!-- 1. Row of 4 Standard Molecules.StatTile Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${statTilesHtml}
        </div>

        <!-- 2. Standard Molecules.FilterBar -->
        ${filterBarHtml}

        <!-- 3. Standard DataTable Container -->
        <div id="preproc-active-lines-table-container"></div>
      </div>
    `;

    // Initialize unified AquaOps DataTable
    this.tableInstances['floor-overview'] = new DataTable({
      containerId: 'preproc-active-lines-table-container',
      tableTitle: 'Active Pre-Processing Floor Batches & Stage Tracking',
      data: batches,
      keyField: 'batchId',
      pageSize: 10,
      searchable: true,
      columns: [
        {
          field: 'batchId',
          header: 'Batch ID & Track Code',
          sortable: true,
          render: (v, row) => `
            <div>
              <span class="font-bold text-[#0F172A] block">${v}</span>
              <span class="font-mono text-[11px] text-[#006C7A]">${row.trackCode}</span>
            </div>
          `
        },
        {
          field: 'species',
          header: 'Species',
          sortable: true,
          render: (v) => `<span class="inline-flex px-2 py-0.5 rounded text-[11px] font-bold ${v.includes('BT') ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]' : 'bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]'}">${v}</span>`
        },
        {
          field: 'stage',
          header: 'Line Stage',
          sortable: true,
          render: (v, row) => `
            <div>
              <span class="inline-flex px-2 py-0.5 rounded text-[10.5px] font-bold ${v === 'DEHEADING' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : v === 'GRADING' ? 'bg-sky-50 text-sky-700 border border-sky-200' : 'bg-teal-50 text-teal-700 border border-teal-200'}">${v}</span>
              <span class="text-[11px] text-[#64748B] block mt-0.5">${row.lineTable}</span>
            </div>
          `
        },
        {
          field: 'supervisor',
          header: 'Supervisor',
          sortable: true,
          render: (v) => `<span class="font-medium text-[#1E293B]">${v}</span>`
        },
        {
          field: 'inputKg',
          header: 'Input HON (kg)',
          sortable: true,
          render: (v) => `<span class="font-mono font-semibold text-[#0F172A]">${v.toLocaleString()} kg</span>`
        },
        {
          field: 'outputKg',
          header: 'Output HL (kg)',
          sortable: true,
          render: (v) => `<span class="font-mono font-bold text-[#006C7A]">${v.toLocaleString()} kg</span>`
        },
        {
          field: 'yieldPct',
          header: 'Yield Recovery',
          sortable: true,
          render: (v, row) => `
            <div class="flex items-center gap-1.5">
              <span class="font-mono font-bold text-xs ${v >= row.targetYieldPct ? 'text-emerald-600' : 'text-amber-600'}">${v.toFixed(2)}%</span>
              <span class="inline-block w-1.5 h-1.5 rounded-full ${v >= row.targetYieldPct ? 'bg-emerald-500' : 'bg-amber-500'}"></span>
            </div>
          `
        },
        {
          field: 'status',
          header: 'Status',
          sortable: true,
          render: (v) => `
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${v === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-sky-50 text-sky-700 border border-sky-200'}">
              ${v}
            </span>
          `
        }
      ],
      actions: [
        {
          label: 'View Batch Lineage',
          icon: `<svg class="w-4 h-4 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>`,
          onClick: (row) => Toast.show(`Batch ${row.batchId} lineage verified.`, 'info')
        }
      ]
    });
  },

  // =========================================================================
  // 2. SUB MENU: FLOOR OPERATIONS -> TAB: RECEIVING & SORTING
  // =========================================================================
  renderReceivingSorting(container) {
    const dockList = PREPROCESSING_DATA.dockIntakes;

    const statTilesHtml = [
      Molecules.StatTile({
        label: 'TOTAL DOCK INTAKE',
        value: '42,650',
        unit: 'Kg',
        badgeText: '↑ 8.2%',
        badgeTone: 'teal',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg>`,
        footerLabel: 'Vehicles Verified',
        footerValue: '5 Trucks Gate Docked'
      }),
      Molecules.StatTile({
        label: 'COUNT DISCREPANCY INDEX',
        value: '-19.6',
        unit: 'pcs/kg',
        badgeText: 'Audit Flag',
        badgeTone: 'amber',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
        footerLabel: 'Flagged Harvest Lot',
        footerValue: 'Pond #4B & 5A, Akividu'
      }),
      Molecules.StatTile({
        label: 'ROLLER GRADER RUNS',
        value: '8,900',
        unit: 'Kg',
        badgeText: 'Active',
        badgeTone: 'sky',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>`,
        footerLabel: 'Mechanical Graders',
        footerValue: '3 Lines Operating'
      }),
      Molecules.StatTile({
        label: 'CONTAINER SEALS PASS',
        value: '100.0%',
        unit: '',
        badgeText: 'Tamper-Free',
        badgeTone: 'emerald',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
        footerLabel: 'Weighbridge Intake',
        footerValue: 'All Seals Verified'
      })
    ].join('');

    const filterBarHtml = Molecules.FilterBar({
      id: 'preproc-receiving-filter',
      title: 'Search & Filters',
      fields: [
        {
          type: 'select',
          id: 'filter-receiving-variety',
          label: 'VARIETY',
          value: 'ALL',
          options: [
            { value: 'ALL', label: 'All Varieties (Select)' },
            { value: 'VM-HEAD ON', label: 'Vannamei Head-On (VM)' },
            { value: 'BT-HEAD ON', label: 'Black Tiger Head-On (BT)' }
          ]
        },
        {
          type: 'select',
          id: 'filter-receiving-plant',
          label: 'MAPPED PLANT',
          value: 'ALL',
          options: [
            { value: 'ALL', label: 'All Facilities (Select)' },
            { value: 'DFL UNIT-1 (VSP)', label: 'DFL UNIT-1 (VSP)' },
            { value: 'DFL UNIT-2 (KKD)', label: 'DFL UNIT-2 (KKD)' },
            { value: 'DFL UNIT-3 (PSP)', label: 'DFL UNIT-3 (PSP)' }
          ]
        },
        {
          type: 'text',
          id: 'filter-receiving-seal',
          label: 'SEAL / VEHICLE NUMBER',
          placeholder: 'e.g. AP 37 TE 4821'
        },
        {
          type: 'date',
          id: 'filter-receiving-from-date',
          label: 'FROM DATE',
          placeholder: 'dd/mm/yyyy'
        },
        {
          type: 'date',
          id: 'filter-receiving-to-date',
          label: 'TO DATE',
          placeholder: 'dd/mm/yyyy'
        }
      ]
    });

    container.innerHTML = `
      <div class="space-y-5 animate-fade-in">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${statTilesHtml}
        </div>
        ${filterBarHtml}
        <div id="preproc-dock-intake-table-container"></div>
      </div>
    `;

    this.tableInstances['receiving-sorting'] = new DataTable({
      containerId: 'preproc-dock-intake-table-container',
      tableTitle: 'Raw Material Dock Intake & Count Discrepancy Register',
      data: dockList,
      keyField: 'id',
      pageSize: 10,
      searchable: true,
      columns: [
        {
          field: 'trackCode',
          header: 'Track Code & Variety',
          sortable: true,
          render: (v, row) => `
            <div>
              <span class="font-mono font-bold text-[#006C7A] block">${v}</span>
              <span class="text-[11px] text-[#64748B]">${row.variety}</span>
            </div>
          `
        },
        {
          field: 'vehicleNo',
          header: 'Vehicle & Seal No',
          sortable: true,
          render: (v, row) => `
            <div>
              <span class="font-semibold text-[#0F172A] block">${v}</span>
              <span class="font-mono text-[11px] text-[#64748B]">Seal: ${row.sealNo}</span>
            </div>
          `
        },
        {
          field: 'supplier',
          header: 'Pond Harvest Source',
          sortable: true,
          render: (v, row) => `
            <div>
              <span class="font-semibold text-[#1E293B] block">${v}</span>
              <span class="text-[11px] text-[#64748B]">${row.pondSource}</span>
            </div>
          `
        },
        {
          field: 'billCount',
          header: 'Bill Count',
          sortable: true,
          render: (v) => `<span class="font-mono">${v.toFixed(1)} pcs/kg</span>`
        },
        {
          field: 'dockCount',
          header: 'Dock Count',
          sortable: true,
          render: (v) => `<span class="font-mono font-bold text-[#0F172A]">${v.toFixed(1)} pcs/kg</span>`
        },
        {
          field: 'countDiff',
          header: 'Count Diff',
          sortable: true,
          render: (v) => `<span class="font-mono font-bold ${v < 0 ? 'text-rose-600' : 'text-emerald-600'}">${v > 0 ? '+' : ''}${v.toFixed(1)}</span>`
        },
        {
          field: 'dockWeightKg',
          header: 'Dock Net Weight',
          sortable: true,
          render: (v) => `<span class="font-mono font-bold text-[#006C7A]">${v.toLocaleString()} kg</span>`
        },
        {
          field: 'status',
          header: 'Status',
          sortable: true,
          render: (v) => `
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${v === 'VERIFIED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-sky-50 text-sky-700 border border-sky-200'}">
              ${v}
            </span>
          `
        }
      ],
      actions: [
        {
          label: 'Print Weighment Slip',
          icon: `<svg class="w-4 h-4 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>`,
          onClick: (row) => Toast.show(`Printing intake slip for ${row.trackCode}`, 'info')
        }
      ]
    });
  },

  // =========================================================================
  // 3. SUB MENU: FLOOR OPERATIONS -> TAB: PRE-PROCESSING TASKS
  // =========================================================================
  renderPreprocessingTasks(container) {
    const tasks = PREPROCESSING_DATA.deheadingShifts;

    const statTilesHtml = [
      Molecules.StatTile({
        label: 'DEHEADING TOTAL (HON)',
        value: '33,450',
        unit: 'Kg',
        badgeText: 'Shift A & B',
        badgeTone: 'teal',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
        footerLabel: 'Active Tables',
        footerValue: '4 Deheading Lines'
      }),
      Molecules.StatTile({
        label: 'RECOVERED HL WEIGHT',
        value: '23,224',
        unit: 'Kg',
        badgeText: '↑ 69.48%',
        badgeTone: 'emerald',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
        footerLabel: 'Benchmark Target',
        footerValue: '68.50% (Passed)'
      }),
      Molecules.StatTile({
        label: 'VALUE ADDITION OUTPUT',
        value: '6,917',
        unit: 'Kg',
        badgeText: 'RPD / PVPD',
        badgeTone: 'sky',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
        footerLabel: 'Peeling Recovery',
        footerValue: '85.3% Realization'
      }),
      Molecules.StatTile({
        label: 'ICE ALLOCATION CONSUMED',
        value: '10,200',
        unit: 'Kg',
        badgeText: 'Optimal',
        badgeTone: 'amber',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/></svg>`,
        footerLabel: 'Core Temperature',
        footerValue: '-0.8°C Maintained'
      })
    ].join('');

    const filterBarHtml = Molecules.FilterBar({
      id: 'preproc-tasks-filter',
      title: 'Search & Filters',
      fields: [
        {
          type: 'select',
          id: 'filter-tasks-shift',
          label: 'SHIFT',
          value: 'ALL',
          options: [
            { value: 'ALL', label: 'All Shifts (Select)' },
            { value: 'Shift A', label: 'Shift A (Morning)' },
            { value: 'Shift B', label: 'Shift B (Afternoon)' },
            { value: 'Shift C', label: 'Shift C (Night)' }
          ]
        },
        {
          type: 'select',
          id: 'filter-tasks-supervisor',
          label: 'LINE SUPERVISOR',
          value: 'ALL',
          options: [
            { value: 'ALL', label: 'All Supervisors (Select)' },
            { value: 'Laxmi Narayana', label: 'Laxmi Narayana' },
            { value: 'Mallesh', label: 'Mallesh' },
            { value: 'G. Suribabu', label: 'G. Suribabu' }
          ]
        },
        {
          type: 'date',
          id: 'filter-tasks-from-date',
          label: 'FROM DATE',
          placeholder: 'dd/mm/yyyy'
        },
        {
          type: 'date',
          id: 'filter-tasks-to-date',
          label: 'TO DATE',
          placeholder: 'dd/mm/yyyy'
        }
      ]
    });

    container.innerHTML = `
      <div class="space-y-5 animate-fade-in">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${statTilesHtml}
        </div>
        ${filterBarHtml}
        <div id="preproc-tasks-table-container"></div>
      </div>
    `;

    this.tableInstances['preprocessing-tasks'] = new DataTable({
      containerId: 'preproc-tasks-table-container',
      tableTitle: 'Shift Deheading Runs & Pre-Processing Tasks',
      data: tasks,
      keyField: 'id',
      pageSize: 10,
      searchable: true,
      columns: [
        {
          field: 'shift',
          header: 'Shift & Date',
          sortable: true,
          render: (v, row) => `
            <div>
              <span class="font-bold text-[#0F172A] block">${v}</span>
              <span class="text-[11px] text-[#64748B]">${row.date}</span>
            </div>
          `
        },
        {
          field: 'supervisor',
          header: 'Supervisor & Crew',
          sortable: true,
          render: (v, row) => `
            <div>
              <span class="font-semibold text-[#1E293B] block">${v}</span>
              <span class="text-[11px] text-[#64748B]">${row.operatorsCount} Peelers Active</span>
            </div>
          `
        },
        {
          field: 'grossHonKg',
          header: 'Gross HON Input',
          sortable: true,
          render: (v) => `<span class="font-mono font-semibold text-[#0F172A]">${v.toLocaleString()} kg</span>`
        },
        {
          field: 'recoveredHlKg',
          header: 'Recovered HL Output',
          sortable: true,
          render: (v) => `<span class="font-mono font-bold text-[#006C7A]">${v.toLocaleString()} kg</span>`
        },
        {
          field: 'yieldPct',
          header: 'Yield Recovery %',
          sortable: true,
          render: (v, row) => `
            <div class="flex items-center gap-1.5">
              <span class="font-mono font-bold text-sm ${v >= row.targetYieldPct ? 'text-emerald-600' : 'text-amber-600'}">${v.toFixed(2)}%</span>
              <span class="text-[10px] text-slate-400">Target: ${row.targetYieldPct}%</span>
            </div>
          `
        },
        {
          field: 'iceConsumptionKg',
          header: 'Ice Used',
          sortable: true,
          render: (v) => `<span class="font-mono text-[#64748B]">${v.toLocaleString()} kg</span>`
        },
        {
          field: 'status',
          header: 'Shift Status',
          sortable: true,
          render: (v) => `
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${v === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-sky-50 text-sky-700 border border-sky-200'}">
              ${v}
            </span>
          `
        }
      ],
      actions: [
        {
          label: 'Approve Yield Sheet',
          icon: `<svg class="w-4 h-4 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`,
          onClick: (row) => Toast.show(`Yield sheet approved for ${row.shift}.`, 'success')
        }
      ]
    });
  },

  // =========================================================================
  // 4. SUB MENU: CHEMICAL INVENTORY -> TAB: CHEMICAL STOCK
  // =========================================================================
  renderChemicalStock(container) {
    const chems = PREPROCESSING_DATA.chemicalInventory;

    const statTilesHtml = [
      Molecules.StatTile({
        label: 'TOTAL FOOD-GRADE STOCK',
        value: '7,625',
        unit: 'Kg',
        badgeText: '214 Bags',
        badgeTone: 'teal',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`,
        footerLabel: 'Total Approved Additives',
        footerValue: 'STPP, Non-Phos & Salt'
      }),
      Molecules.StatTile({
        label: 'STPP CARNAL 659S',
        value: '18',
        unit: 'Bags',
        badgeText: 'Low Buffer',
        badgeTone: 'amber',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
        footerLabel: 'Buffer Threshold',
        footerValue: '25 Bags (Reorder Required)'
      }),
      Molecules.StatTile({
        label: 'NON-PHOSPHATE BLEND',
        value: '57',
        unit: 'Bags',
        badgeText: 'Adequate',
        badgeTone: 'emerald',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
        footerLabel: 'Floor Balance',
        footerValue: '1,425 kg (Altesa Neo S100)'
      }),
      Molecules.StatTile({
        label: 'PURE VACUUM SALT (PVD)',
        value: '115',
        unit: 'Bags',
        badgeText: 'Normal Stock',
        badgeTone: 'sky',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>`,
        footerLabel: 'Total Weight',
        footerValue: '5,750 kg (Tata Chemicals)'
      })
    ].join('');

    const filterBarHtml = Molecules.FilterBar({
      id: 'preproc-chem-filter',
      title: 'Search & Filters',
      fields: [
        {
          type: 'select',
          id: 'filter-chem-category',
          label: 'CATEGORY',
          value: 'ALL',
          options: [
            { value: 'ALL', label: 'All Categories (Select)' },
            { value: 'STPP', label: 'Phosphate (STPP)' },
            { value: 'NON_PHOS', label: 'Non-Phosphate Blends' },
            { value: 'SALT', label: 'Vacuum Salt' }
          ]
        },
        {
          type: 'select',
          id: 'filter-chem-buffer',
          label: 'BUFFER LEVEL',
          value: 'ALL',
          options: [
            { value: 'ALL', label: 'All Levels (Select)' },
            { value: 'LOW_STOCK', label: 'Low Stock Alert (< 25 bags)' },
            { value: 'ADEQUATE', label: 'Adequate Stock' }
          ]
        },
        {
          type: 'date',
          id: 'filter-chem-from-date',
          label: 'FROM DATE',
          placeholder: 'dd/mm/yyyy'
        },
        {
          type: 'date',
          id: 'filter-chem-to-date',
          label: 'TO DATE',
          placeholder: 'dd/mm/yyyy'
        }
      ]
    });

    container.innerHTML = `
      <div class="space-y-5 animate-fade-in">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${statTilesHtml}
        </div>
        ${filterBarHtml}
        <div id="preproc-chemical-stock-table-container"></div>
      </div>
    `;

    this.tableInstances['chemical-stock'] = new DataTable({
      containerId: 'preproc-chemical-stock-table-container',
      tableTitle: 'Food-Grade Processing Chemical Stock Matrix',
      data: chems,
      keyField: 'code',
      pageSize: 10,
      searchable: true,
      columns: [
        {
          field: 'name',
          header: 'Chemical Name & Code',
          sortable: true,
          render: (v, row) => `
            <div>
              <span class="font-bold text-[#0F172A] block">${v}</span>
              <span class="font-mono text-[11px] text-[#006C7A]">${row.code}</span>
            </div>
          `
        },
        {
          field: 'supplier',
          header: 'Supplier & Grade',
          sortable: true,
          render: (v, row) => `
            <div>
              <span class="font-semibold text-[#1E293B] block">${v}</span>
              <span class="text-[11px] text-[#64748B]">${row.category}</span>
            </div>
          `
        },
        {
          field: 'openingBags',
          header: 'Opening (Bags)',
          sortable: true,
          render: (v) => `<span class="font-mono text-[#64748B]">${v}</span>`
        },
        {
          field: 'receivedBags',
          header: 'Inward',
          sortable: true,
          render: (v) => `<span class="font-mono font-bold text-emerald-600">+${v}</span>`
        },
        {
          field: 'issuedBags',
          header: 'Floor Issued',
          sortable: true,
          render: (v) => `<span class="font-mono font-bold text-rose-600">-${v}</span>`
        },
        {
          field: 'closingBags',
          header: 'Closing Balance',
          sortable: true,
          render: (v) => `<span class="font-mono font-bold text-sm text-[#0F172A]">${v} Bags</span>`
        },
        {
          field: 'closingKg',
          header: 'Net Weight (kg)',
          sortable: true,
          render: (v) => `<span class="font-mono font-bold text-[#006C7A]">${v.toLocaleString()} kg</span>`
        },
        {
          field: 'status',
          header: 'Buffer Status',
          sortable: true,
          render: (v) => `
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${v === 'LOW_STOCK' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}">
              ${v === 'LOW_STOCK' ? 'LOW BUFFER' : 'ADEQUATE'}
            </span>
          `
        }
      ],
      actions: [
        {
          label: 'Log Stock Receipt',
          icon: `<svg class="w-4 h-4 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>`,
          onClick: (row) => PreprocessingView.openChemicalInwardModal(row)
        }
      ]
    });
  },

  // =========================================================================
  // 5. SUB MENU: CHEMICAL INVENTORY -> TAB: USAGE LOGS
  // =========================================================================
  renderUsageLogs(container) {
    const usage = PREPROCESSING_DATA.dailyUsageLogs;

    const statTilesHtml = [
      Molecules.StatTile({
        label: 'DAILY ADDITIVE USAGE',
        value: '12',
        unit: 'Bags',
        badgeText: '300 Kg',
        badgeTone: 'teal',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`,
        footerLabel: 'Active Soaking Tanks',
        footerValue: 'Tank S-1, S-2 & S-3'
      }),
      Molecules.StatTile({
        label: 'STPP 659S CONSUMPTION',
        value: '4',
        unit: 'Bags',
        badgeText: '100 Kg',
        badgeTone: 'amber',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
        footerLabel: 'Bath Concentration',
        footerValue: '2.5% Target Dosaged'
      }),
      Molecules.StatTile({
        label: 'NON-PHOSPHATE USAGE',
        value: '8',
        unit: 'Bags',
        badgeText: '200 Kg',
        badgeTone: 'emerald',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
        footerLabel: 'Altesa Neo S100',
        footerValue: '3.0% Bath Conc'
      }),
      Molecules.StatTile({
        label: 'WATER RESIDUAL CHLORINE',
        value: '2.0',
        unit: 'PPM',
        badgeText: 'HACCP Safe',
        badgeTone: 'sky',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
        footerLabel: 'Permissible Standard',
        footerValue: '1.5 to 2.5 PPM'
      })
    ].join('');

    const filterBarHtml = Molecules.FilterBar({
      id: 'preproc-usage-filter',
      title: 'Search & Filters',
      fields: [
        {
          type: 'select',
          id: 'filter-usage-chemical',
          label: 'CHEMICAL NAME',
          value: 'ALL',
          options: [
            { value: 'ALL', label: 'All Additives (Select)' },
            { value: 'STPP', label: 'STPP Carnal 659S' },
            { value: 'ALTESA', label: 'Altesa Neo S100' }
          ]
        },
        {
          type: 'select',
          id: 'filter-usage-tank',
          label: 'SOAKING TANK',
          value: 'ALL',
          options: [
            { value: 'ALL', label: 'All Tanks (Select)' },
            { value: 'Tank 1', label: 'Soaking Tank #1' },
            { value: 'Tank 2', label: 'Soaking Tank #2' },
            { value: 'Tank 3', label: 'Soaking Tank #3' }
          ]
        },
        {
          type: 'date',
          id: 'filter-usage-from-date',
          label: 'FROM DATE',
          placeholder: 'dd/mm/yyyy'
        },
        {
          type: 'date',
          id: 'filter-usage-to-date',
          label: 'TO DATE',
          placeholder: 'dd/mm/yyyy'
        }
      ]
    });

    container.innerHTML = `
      <div class="space-y-5 animate-fade-in">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${statTilesHtml}
        </div>
        ${filterBarHtml}
        <div id="preproc-usage-logs-table-container"></div>
      </div>
    `;

    this.tableInstances['usage-logs'] = new DataTable({
      containerId: 'preproc-usage-logs-table-container',
      tableTitle: 'Chilled Soaking Tanks Chemical Dosage & Usage Log',
      data: usage,
      keyField: 'id',
      pageSize: 10,
      searchable: true,
      columns: [
        {
          field: 'id',
          header: 'Log ID & Date',
          sortable: true,
          render: (v, row) => `
            <div>
              <span class="font-bold text-[#0F172A] block">${v}</span>
              <span class="text-[11px] text-[#64748B]">${row.date} • ${row.shift}</span>
            </div>
          `
        },
        {
          field: 'chemicalName',
          header: 'Additive & Tank ID',
          sortable: true,
          render: (v, row) => `
            <div>
              <span class="font-semibold text-[#1E293B] block">${v}</span>
              <span class="font-mono text-[11px] text-[#006C7A]">${row.tankId}</span>
            </div>
          `
        },
        {
          field: 'targetVariety',
          header: 'Target Variety & Grade',
          sortable: true,
          render: (v) => `<span class="font-medium text-[#1E293B]">${v}</span>`
        },
        {
          field: 'bagsUsed',
          header: 'Bags Used',
          sortable: true,
          render: (v) => `<span class="font-mono font-bold text-rose-600">${v} Bags</span>`
        },
        {
          field: 'kgUsed',
          header: 'Net Additive (kg)',
          sortable: true,
          render: (v) => `<span class="font-mono font-bold text-[#0F172A]">${v} kg</span>`
        },
        {
          field: 'bathConcentrationPct',
          header: 'Bath Conc %',
          sortable: true,
          render: (v) => `<span class="font-mono font-bold text-teal-700">${v}%</span>`
        },
        {
          field: 'dipDurationMins',
          header: 'Dip Duration',
          sortable: true,
          render: (v, row) => `<span class="font-mono text-slate-700">${v} mins (${row.waterTempCelsius}°C)</span>`
        },
        {
          field: 'status',
          header: 'Verification',
          sortable: true,
          render: (v) => `
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              ${v}
            </span>
          `
        }
      ],
      actions: [
        {
          label: 'Print Dosage Card',
          icon: `<svg class="w-4 h-4 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>`,
          onClick: (row) => Toast.show(`Printing dosage recipe card for ${row.id}`, 'info')
        }
      ]
    });
  },

  // =========================================================================
  // 6. SUB MENU: TRACEABILITY -> TAB: BATCH TRACEABILITY
  // =========================================================================
  renderBatchTraceability(container) {
    const trace = PREPROCESSING_DATA.batchTraceability;

    const statTilesHtml = [
      Molecules.StatTile({
        label: 'TRACED BATCHES',
        value: '14',
        unit: 'Batches',
        badgeText: '100% Traced',
        badgeTone: 'teal',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
        footerLabel: 'USFDA & EU Compliance',
        footerValue: 'Pond-to-Pack Verified'
      }),
      Molecules.StatTile({
        label: 'ANTIBIOTIC CLEARANCE',
        value: '100.0%',
        unit: '',
        badgeText: 'Zero Holds',
        badgeTone: 'emerald',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
        footerLabel: 'ELISA Screenings',
        footerValue: 'All 14 Lots Passed'
      }),
      Molecules.StatTile({
        label: 'AVG GRADED RECOVERY',
        value: '69.32%',
        unit: '',
        badgeText: 'Stable',
        badgeTone: 'sky',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,
        footerLabel: 'Target Benchmark',
        footerValue: '68.50% (Exceeded)'
      }),
      Molecules.StatTile({
        label: 'FINISHED MASTER CARTONS',
        value: '2,890',
        unit: 'Cartons',
        badgeText: 'Glaze Verified',
        badgeTone: 'amber',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`,
        footerLabel: 'Packaging Loss',
        footerValue: '0.8% (Within Standard)'
      })
    ].join('');

    const filterBarHtml = Molecules.FilterBar({
      id: 'preproc-trace-filter',
      title: 'Search & Filters',
      fields: [
        {
          type: 'text',
          id: 'filter-trace-code',
          label: 'TRACK CODE',
          placeholder: 'e.g. VM-VSP-AVN-034'
        },
        {
          type: 'select',
          id: 'filter-trace-compliance',
          label: 'COMPLIANCE CERTIFICATE',
          value: 'ALL',
          options: [
            { value: 'ALL', label: 'All Certifications (Select)' },
            { value: 'USFDA', label: 'USFDA / EIA Certified' },
            { value: 'BRCGS', label: 'BRCGS Food v9' },
            { value: 'BAP', label: 'BAP 4-Star Certified' }
          ]
        },
        {
          type: 'date',
          id: 'filter-trace-from-date',
          label: 'FROM DATE',
          placeholder: 'dd/mm/yyyy'
        },
        {
          type: 'date',
          id: 'filter-trace-to-date',
          label: 'TO DATE',
          placeholder: 'dd/mm/yyyy'
        }
      ]
    });

    container.innerHTML = `
      <div class="space-y-5 animate-fade-in">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${statTilesHtml}
        </div>
        ${filterBarHtml}
        <div id="preproc-batch-traceability-table-container"></div>
      </div>
    `;

    this.tableInstances['batch-traceability'] = new DataTable({
      containerId: 'preproc-batch-traceability-table-container',
      tableTitle: 'Pond-to-Pack Master Genealogical Traceability Table',
      data: trace,
      keyField: 'trackCode',
      pageSize: 10,
      searchable: true,
      columns: [
        {
          field: 'trackCode',
          header: 'Track Code & Arrival',
          sortable: true,
          render: (v, row) => `
            <div>
              <span class="font-mono font-bold text-[#006C7A] block">${v}</span>
              <span class="text-[11px] text-[#64748B]">${row.arrivalDate}</span>
            </div>
          `
        },
        {
          field: 'pondSource',
          header: 'Pond Harvest Source',
          sortable: true,
          render: (v, row) => `
            <div>
              <span class="font-semibold text-[#1E293B] block">${v}</span>
              <span class="text-[11px] text-[#64748B]">Count: ${row.billCount} pcs/kg</span>
            </div>
          `
        },
        {
          field: 'recvWeightKg',
          header: 'Recv Weight',
          sortable: true,
          render: (v) => `<span class="font-mono text-[#0F172A]">${v.toLocaleString()} kg</span>`
        },
        {
          field: 'deheadingWeightKg',
          header: 'Deheading Wt',
          sortable: true,
          render: (v) => `<span class="font-mono font-semibold text-[#0F172A]">${v.toLocaleString()} kg</span>`
        },
        {
          field: 'gradingWeightKg',
          header: 'Graded Output',
          sortable: true,
          render: (v) => `<span class="font-mono font-bold text-[#006C7A]">${v.toLocaleString()} kg</span>`
        },
        {
          field: 'gradingYieldPct',
          header: 'Graded Yield %',
          sortable: true,
          render: (v) => `<span class="font-mono font-bold text-emerald-600">${v.toFixed(2)}%</span>`
        },
        {
          field: 'freezerTunnelId',
          header: 'Freezer Tunnel & Lot',
          sortable: true,
          render: (v, row) => `
            <div>
              <span class="font-medium text-[#1E293B] block">${v}</span>
              <span class="font-mono text-[11px] text-[#64748B]">Lot: ${row.exportCartonLot}</span>
            </div>
          `
        },
        {
          field: 'complianceCert',
          header: 'Export Clearance',
          sortable: true,
          render: (v) => `
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              ${v}
            </span>
          `
        }
      ],
      actions: [
        {
          label: 'Export Trace PDF',
          icon: `<svg class="w-4 h-4 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
          onClick: (row) => Toast.show(`Exporting USFDA trace certificate for ${row.trackCode}`, 'info')
        }
      ]
    });
  },

  // =========================================================================
  // AQUAOPS MODAL FORMS
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
              <input type="text" id="intake-track-code" value="VM-VSP-AVN-035" class="w-full text-xs p-2.5 border border-slate-200 rounded-lg font-mono bg-slate-50" readonly />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Vehicle Number</label>
              <input type="text" id="intake-vehicle" placeholder="e.g. AP 37 TE 9940" class="w-full text-xs p-2.5 border border-slate-200 rounded-lg" required />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Container Seal Number</label>
              <input type="text" id="intake-seal" placeholder="e.g. SL-99512" class="w-full text-xs p-2.5 border border-slate-200 rounded-lg" required />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Pond / Supplier</label>
              <input type="text" id="intake-supplier" placeholder="e.g. Godavari Aqua Cluster Pond #8" class="w-full text-xs p-2.5 border border-slate-200 rounded-lg" required />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Pond Bill Count</label>
              <input type="number" step="0.1" id="intake-bill-count" value="45.0" class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white font-mono" required />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Dock Sample Count</label>
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
      Modal.close();
      Toast.show('Dock Intake & Count verification saved.', 'success');
    });
    document.getElementById('modal-btn-0')?.addEventListener('click', () => Modal.close());
  },

  openShiftBatchModal() {
    Modal.open({
      title: "Start Shift Pre-Processing Batch",
      size: "lg",
      content: `
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Shift</label>
              <select class="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-white">
                <option>Shift A (Morning 06:00 - 14:00)</option>
                <option>Shift B (Afternoon 14:00 - 22:00)</option>
                <option>Shift C (Night 22:00 - 06:00)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Supervisor</label>
              <input type="text" value="Laxmi Narayana" class="w-full text-xs p-2.5 border border-slate-200 rounded-lg" />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Gross HON Input (kg)</label>
              <input type="number" value="4500" class="w-full text-xs p-2.5 border border-slate-200 rounded-lg font-mono font-bold" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Target Yield %</label>
              <input type="text" value="68.50%" class="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50 font-mono" readonly />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Ice Allocated (kg)</label>
              <input type="number" value="1500" class="w-full text-xs p-2.5 border border-slate-200 rounded-lg font-mono" />
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        { label: "Cancel", type: "secondary" },
        { label: "Start Batch", type: "primary" }
      ]
    });

    document.getElementById('modal-btn-1')?.addEventListener('click', () => {
      Modal.close();
      Toast.show('Pre-Processing shift batch initiated on Table #1 & #2.', 'success');
    });
    document.getElementById('modal-btn-0')?.addEventListener('click', () => Modal.close());
  },

  openChemicalInwardModal() {
    Modal.open({
      title: "Log Food-Grade Chemical Inward",
      size: "md",
      content: `
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Chemical Item</label>
            <select class="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-white">
              <option>STPP Carnal 659S (25kg bags)</option>
              <option>Altesa Neo S100 Non-Phosphate (25kg bags)</option>
              <option>Pure Vacuum Dried Salt (PVD - 50kg bags)</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Received Bags</label>
              <input type="number" value="100" class="w-full text-xs p-2.5 border border-slate-200 rounded-lg font-mono font-bold" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Bill of Entry (BoE) No</label>
              <input type="text" value="BOE-994200" class="w-full text-xs p-2.5 border border-slate-200 rounded-lg font-mono" />
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        { label: "Cancel", type: "secondary" },
        { label: "Save Inward Stock", type: "primary" }
      ]
    });

    document.getElementById('modal-btn-1')?.addEventListener('click', () => {
      Modal.close();
      Toast.show('Chemical inward receipt posted to inventory ledger.', 'success');
    });
    document.getElementById('modal-btn-0')?.addEventListener('click', () => Modal.close());
  },

  openUsageModal() {
    Modal.open({
      title: "Log Additive Tank Usage",
      size: "md",
      content: `
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Chemical Additive</label>
            <select class="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-white">
              <option>STPP Carnal 659S (25kg bag)</option>
              <option>Altesa Neo S100 Non-Phosphate</option>
              <option>Pure Vacuum Dried Salt</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Bags Used</label>
              <input type="number" value="4" class="w-full text-xs p-2.5 border border-slate-200 rounded-lg font-mono font-bold" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Soaking Tank ID</label>
              <input type="text" value="Chilled Bath Tank S-1" class="w-full text-xs p-2.5 border border-slate-200 rounded-lg" />
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
      Toast.show('Tank additive dosage recorded in shift usage ledger.', 'success');
    });
    document.getElementById('modal-btn-0')?.addEventListener('click', () => Modal.close());
  }
};
