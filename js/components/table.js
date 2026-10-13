// Reusable Enterprise Data Table Component with Collapsible User-Friendly Top Filter Bar

import { Toast } from './toast.js';

export class DataTable {
  constructor({
    containerId,
    columns,
    data,
    keyField = 'id',
    pageSize = 10,
    searchable = true,
    filterable = true,
    selectable = false,
    actions = [],
    bulkActions = [],
    exportable = true,
    showCopy = true,
    showDensity = false,
    tableTitle = '',
    topFilterTitle = '',
    hideTopFilterBar = true,
    onRowClick = null,
    onDataChange = null
  }) {
    this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    this.columns = columns;
    this.originalData = [...data];
    this.filteredData = [...data];
    this.keyField = keyField;
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.searchable = searchable;
    this.filterable = filterable;
    this.selectable = false;
    this.actions = actions;
    this.bulkActions = bulkActions;
    this.exportable = exportable;
    this.showCopy = showCopy;
    this.showDensity = showDensity;
    this.tableTitle = tableTitle;
    this.topFilterTitle = topFilterTitle || tableTitle || 'DATA EXPLORER & RECORDS';
    this.hideTopFilterBar = hideTopFilterBar;
    this.isFilterCollapsed = false;
    this.onRowClick = onRowClick;
    
    this.searchTerm = '';
    this.activeFilters = {};
    this.topFilters = {
      center: 'ALL',
      supplier: 'ALL',
      plant: 'ALL',
      date: ''
    };
    this.onDataChange = onDataChange;
    this.sortColumn = null;
    this.sortDirection = 'asc';
    this.selectedKeys = new Set();
    this.hiddenColumns = new Set();
    this.density = 'standard';

    this.render();
  }

  getVisibleColumns() {
    return this.columns.filter(c => !this.hiddenColumns.has(c.field));
  }

  setData(newData) {
    this.originalData = [...newData];
    this.applyFilters();
  }

  applyFilters() {
    let result = [...this.originalData];

    // Global Search
    if (this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(item => {
        return Object.values(item).some(val => {
          if (val === null || val === undefined) return false;
          return String(val).toLowerCase().includes(term);
        });
      });
    }

    // Top Filter Bar Center / Supplier / Plant / Date
    if (this.topFilters) {
      if (this.topFilters.center && this.topFilters.center !== 'ALL') {
        const ct = this.topFilters.center.toLowerCase();
        result = result.filter(item => {
          const itemCenter = String(item.center || item.centerName || item.station || item.bookingStation || item.pond || '').toLowerCase();
          return itemCenter.includes(ct);
        });
      }
      if (this.topFilters.supplier && this.topFilters.supplier !== 'ALL') {
        const sup = this.topFilters.supplier.toLowerCase();
        result = result.filter(item => {
          const itemSup = String(item.supplier || item.supplierName || item.farmerName || '').toLowerCase();
          return itemSup.includes(sup);
        });
      }
      if (this.topFilters.plant && this.topFilters.plant !== 'ALL') {
        const pl = this.topFilters.plant.toLowerCase();
        result = result.filter(item => {
          const itemPlant = String(item.plant || item.arrivalPlant || item.currentLocation || '').toLowerCase();
          return itemPlant.includes(pl);
        });
      }
      if (this.topFilters.date && this.topFilters.date.trim() !== '') {
        const dt = this.topFilters.date.trim().toLowerCase();
        let dtAlt = '';
        if (/^\d{4}-\d{2}-\d{2}$/.test(dt)) {
          const [y, m, d] = dt.split('-');
          dtAlt = `${d}/${m}/${y}`;
        } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(dt)) {
          const [d, m, y] = dt.split('/');
          dtAlt = `${y}-${m}-${d}`;
        }
        result = result.filter(item => {
          const itemDate = String(item.date || item.arrivalDate || item.bookingDate || '').toLowerCase();
          return itemDate.includes(dt) || (dtAlt && itemDate.includes(dtAlt));
        });
      }
    }

    // Column / Custom Filters
    Object.keys(this.activeFilters).forEach(key => {
      const filterVal = this.activeFilters[key];
      if (filterVal && filterVal !== 'ALL') {
        result = result.filter(item => String(item[key]) === String(filterVal));
      }
    });

    // Sorting
    if (this.sortColumn) {
      const col = this.sortColumn;
      const dir = this.sortDirection === 'asc' ? 1 : -1;
      result.sort((a, b) => {
        let valA = a[col];
        let valB = b[col];
        if (typeof valA === 'number' && typeof valB === 'number') {
          return (valA - valB) * dir;
        }
        return String(valA || '').localeCompare(String(valB || '')) * dir;
      });
    }

    this.filteredData = result;
    this.currentPage = 1;
    this.renderTableBody();
    this.renderPagination();
    if (typeof this.onDataChange === 'function') {
      this.onDataChange(this.filteredData);
    }
  }

  render() {
    if (!this.container) return;

    const dateStr = new Date().toLocaleDateString('en-GB');

    let topFilterHTML = '';
    if (!this.hideTopFilterBar) {
      topFilterHTML = `
        <!-- Collapsible Top Filter Header Card (AquaPulse Architecture) -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs mb-5 transition-all duration-200">
          <div class="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
            <div class="flex items-center gap-2.5">
              <div class="w-7 h-7 rounded-lg bg-[#F0FAFC] border border-[#B2ECF3] flex items-center justify-center text-[#006C7A]">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              </div>
              <h3 class="text-sm font-bold text-[#0F172A]">${this.topFilterTitle || 'Search & Filters'}</h3>
            </div>

            <!-- Filter Controls: Reset & Toggle Open/Close -->
            <div class="flex items-center gap-2">
              <button type="button" class="dt-top-filter-reset-btn text-xs font-semibold text-[#64748B] hover:text-[#0F172A] bg-white hover:bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-[#CBD5E1] flex items-center gap-1.5 transition-colors cursor-pointer" title="Reset all filters">
                <svg class="w-3.5 h-3.5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Reset</span>
              </button>

              <button type="button" class="dt-top-filter-toggle-btn text-xs font-semibold text-[#006C7A] bg-[#F0FAFC] hover:bg-[#E0F7FA] px-3 py-1.5 rounded-lg border border-[#B2ECF3] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer" title="Hide Filter">
                <svg class="w-3.5 h-3.5 dt-top-filter-toggle-icon transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                <span class="dt-top-filter-toggle-text">Hide Filter</span>
              </button>
            </div>
          </div>

          <!-- Collapsible Filter Inputs Grid -->
          <div class="dt-top-filter-body mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-xs transition-all duration-200">
            <div>
              <label class="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5">SELECT CENTER</label>
              <select class="dt-top-center-select w-full h-[38px] text-xs px-3 bg-white border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-2 focus:ring-[#006C7A]/20 transition-all text-[#0F172A]">
                <option value="ALL">All Centers (Select)</option>
                <option value="Bhimavaram Center #1">Bhimavaram Center #1</option>
                <option value="Kakinada Sea Intake #2">Kakinada Sea Intake #2</option>
                <option value="Machilipatnam Delta #3">Machilipatnam Delta #3</option>
                <option value="Amalapuram Harvesters #4">Amalapuram Harvesters #4</option>
                <option value="Ongole Coastal Hub #1">Ongole Coastal Hub #1</option>
                <option value="Visakhapatnam Gate Dock">Visakhapatnam Gate Dock</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5">SELECT SUPPLIER</label>
              <select class="dt-top-supplier-select w-full h-[38px] text-xs px-3 bg-white border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-2 focus:ring-[#006C7A]/20 transition-all text-[#0F172A]">
                <option value="ALL">All Suppliers (Select)</option>
                <option value="Godavari Coastal Aqua Farms">Godavari Coastal Aqua Farms</option>
                <option value="Sagar Marine Hatcheries">Sagar Marine Hatcheries</option>
                <option value="Krishna Delta Prawn Harvesters">Krishna Delta Prawn Harvesters</option>
                <option value="Konaseema Marine Harvesters Syndicate">Konaseema Marine Harvesters</option>
                <option value="Nellore Brackish Aqua Cultivators">Nellore Brackish Aqua Cultivators</option>
                <option value="Sri Sai Aqua Farms">Sri Sai Aqua Farms</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5">SELECT ARRIVAL PLANT</label>
              <select class="dt-top-plant-select w-full h-[38px] text-xs px-3 bg-white border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-2 focus:ring-[#006C7A]/20 transition-all text-[#0F172A]">
                <option value="ALL">All Arrival Plants (Select)</option>
                <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                <option value="DFL UNIT-4 (PND)">DFL UNIT-4 (PND)</option>
                <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-6 (JPT-II)">DFL UNIT-6 (JPT-II)</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5">DATE</label>
              <div class="erp-date-wrapper">
                <input type="text" readonly inputmode="none" value="2026-10-06" class="dt-top-date-input erp-date-input w-full h-[38px] text-xs px-3 bg-white border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#006C7A] focus:ring-2 focus:ring-[#006C7A]/20 transition-all text-[#0F172A] cursor-pointer" placeholder="Select date..." />
              </div>
            </div>

            <div class="flex items-end">
              <button type="button" class="dt-top-filter-search-btn btn-primary h-[38px] px-6 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-xs hover:shadow cursor-pointer w-full sm:w-auto">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    this.container.innerHTML = `
      <div class="flex flex-col">
        ${topFilterHTML}

        <!-- Table Card Container (AquaPulse Table Panel) -->
        <div class="table-panel bg-white rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col overflow-hidden">
          <!-- Table Control Toolbar (Density Switcher, Excel, PDF, Column visibility, Search) -->
          <div class="px-5 py-3 border-b border-[#E2E8F0] bg-[#FFFFFF] flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3 flex-wrap">
              ${this.tableTitle ? `<h3 class="font-bold text-[#0F172A] text-sm">${this.tableTitle}</h3>` : ''}
              
              <!-- Quick Search Input (AquaPulse Architecture) -->
              ${this.searchable !== false ? `
              <div class="relative flex items-center">
                <svg class="w-3.5 h-3.5 text-[#94A3B8] absolute left-2.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <input type="text" id="dt-search-input" value="${this.searchTerm || ''}" placeholder="Search table records..." class="h-[32px] w-44 sm:w-56 pl-8 pr-2.5 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#006C7A] focus:bg-white focus:ring-2 focus:ring-[#006C7A]/20 transition-all text-[#0F172A]" />
              </div>
              ` : ''}

              <div id="dt-filter-container" class="flex items-center gap-2"></div>
            </div>

            <div class="flex items-center gap-2.5 flex-wrap">
              <!-- Row Density Segmented Switcher (Disabled by default, removed as requested) -->
              ${this.showDensity ? `
              <div class="segmented-control inline-flex items-center p-0.5 bg-[#F1F5F9] rounded-lg text-xs font-semibold text-[#64748B]">
                <button type="button" class="dt-density-btn px-2.5 py-1 rounded-md transition-all ${this.density === 'compact' ? 'bg-white text-[#006C7A] shadow-xs font-bold' : 'hover:text-[#0F172A]'}" data-density="compact">Compact</button>
                <button type="button" class="dt-density-btn px-2.5 py-1 rounded-md transition-all ${(!this.density || this.density === 'standard') ? 'bg-white text-[#006C7A] shadow-xs font-bold' : 'hover:text-[#0F172A]'}" data-density="standard">Standard</button>
                <button type="button" class="dt-density-btn px-2.5 py-1 rounded-md transition-all ${this.density === 'spacious' ? 'bg-white text-[#006C7A] shadow-xs font-bold' : 'hover:text-[#0F172A]'}" data-density="spacious">Spacious</button>
              </div>
              ` : ''}

              <!-- Combined Export Dropdown: Excel (.xlsx), XLS, CSV, PDF, Copy -->
              ${this.exportable !== false ? `
              <div class="relative">
                <button type="button" id="dt-export-dropdown-btn" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-[#334155] border border-[#CBD5E1] hover:bg-[#F8FAFC] hover:border-[#94A3B8] transition-colors cursor-pointer shadow-2xs" title="Export Table Data in Various Formats">
                  <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  <span>Export</span>
                  <svg class="w-3 h-3 text-[#64748B] ml-0.5 dt-export-caret transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </button>

                <div id="dt-export-dropdown" class="hidden absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#E2E8F0] py-1.5 z-50 text-xs select-none">
                  <div class="px-3 py-1.5 text-[10px] font-bold text-[#64748B] uppercase tracking-wider border-b border-[#F1F5F9]">
                    Export Table Format
                  </div>
                  <button type="button" class="dt-export-option w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-[#F0FAFC] hover:text-[#006C7A] text-[#1E293B] font-medium transition-colors cursor-pointer" data-format="xlsx">
                    <svg class="w-4 h-4 text-[#056A38]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    <span>Excel (.xlsx)</span>
                  </button>
                  <button type="button" class="dt-export-option w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-[#F0FAFC] hover:text-[#006C7A] text-[#1E293B] font-medium transition-colors cursor-pointer" data-format="xls">
                    <svg class="w-4 h-4 text-[#056A38]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    <span>Excel 97-2003 (.xls)</span>
                  </button>
                  <button type="button" class="dt-export-option w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-[#F0FAFC] hover:text-[#006C7A] text-[#1E293B] font-medium transition-colors cursor-pointer" data-format="csv">
                    <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                    <span>CSV (.csv)</span>
                  </button>
                  <button type="button" class="dt-export-option w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-[#FEEFF1] hover:text-[#B5152B] text-[#1E293B] font-medium transition-colors cursor-pointer" data-format="pdf">
                    <svg class="w-4 h-4 text-[#B5152B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    <span>PDF Document (.pdf)</span>
                  </button>
                  ${this.showCopy ? `
                  <div class="my-1 border-t border-[#F1F5F9]"></div>
                  <button type="button" class="dt-export-option w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-[#F8FAFC] text-[#1E293B] font-medium transition-colors cursor-pointer" data-format="copy">
                    <svg class="w-4 h-4 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    <span>Copy to Clipboard</span>
                  </button>
                  ` : ''}
                </div>
              </div>
              ` : ''}

              <!-- Column Section / Visibility Dropdown -->
              <div class="relative">
                <button type="button" id="dt-columns-btn" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-[#334155] border border-[#CBD5E1] hover:bg-[#F8FAFC] hover:border-[#94A3B8] transition-colors cursor-pointer shadow-2xs" title="Customize Visible Columns">
                  <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  <span>Column visibility</span>
                </button>

                <div id="dt-columns-dropdown" class="hidden absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#E2E8F0] py-2 z-50 text-xs select-none">
                  <div class="px-3.5 py-2 font-bold text-[#0F172A] border-b border-[#F1F5F9] flex justify-between items-center">
                    <span>Select Visible Columns</span>
                    <button type="button" id="dt-cols-reset-btn" class="text-[11px] text-[#006C7A] hover:underline font-bold cursor-pointer">Show All</button>
                  </div>
                  <div class="px-2 py-1.5 max-h-64 overflow-y-auto space-y-1">
                    ${this.columns.map(col => `
                      <label class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-[#F8FAFC] cursor-pointer text-[#1E293B] transition-colors">
                        <input 
                          type="checkbox" 
                          class="dt-col-toggle-checkbox rounded border-[#CBD5E1] text-[#006C7A] focus:ring-0 cursor-pointer" 
                          data-field="${col.field}" 
                          ${!this.hiddenColumns.has(col.field) ? 'checked' : ''} 
                        />
                        <span class="truncate font-medium">${col.header}</span>
                      </label>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Selected Rows Bulk Bar -->
          <div id="dt-bulk-bar" class="hidden px-5 py-2.5 bg-[#F0FAFC] border-b border-[#B2ECF3] items-center justify-between text-xs text-[#005662]">
            <span id="dt-selected-count" class="font-bold">0 items selected</span>
            <div id="dt-bulk-actions" class="flex items-center gap-2"></div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto min-h-[220px]">
            <table class="erp-table ${'tbl-' + (this.density || 'standard')}">
              <thead>
                <tr id="dt-thead-row"></tr>
              </thead>
              <tbody id="dt-tbody"></tbody>
            </table>
          </div>

          <!-- Pagination Toolbar -->
          <div class="px-5 py-3 border-t border-[#E2E8F0] bg-[#FFFFFF] flex items-center justify-between text-xs text-[#64748B]" id="dt-pagination-container">
          </div>
        </div>
      </div>
    `;

    this.renderHeader();
    this.renderTableBody();
    this.renderPagination();
    this.bindEvents();
  }

  renderHeader() {
    const theadRow = this.container.querySelector('#dt-thead-row');
    if (!theadRow) return;

    const visibleCols = this.getVisibleColumns();
    let html = '';
    if (this.selectable) {
      html += `
        <th class="w-10 text-center">
          <input type="checkbox" id="dt-select-all-checkbox" class="rounded border-[#DFE1E6] text-[#0284C7] focus:ring-0 cursor-pointer" />
        </th>
      `;
    }

    visibleCols.forEach(col => {
      const isSorted = this.sortColumn === col.field;
      const sortIcon = isSorted 
        ? (this.sortDirection === 'asc' ? '↑' : '↓')
        : '';
      
      const sortClass = col.sortable !== false ? 'cursor-pointer hover:bg-[#EBECF0] transition-colors select-none' : '';
      html += `
        <th data-field="${col.field}" class="${sortClass}">
          <div class="flex items-center gap-1.5">
            <span>${col.header}</span>
            <span class="text-xs text-[#0284C7] font-bold">${sortIcon}</span>
          </div>
        </th>
      `;
    });

    if (this.actions.length > 0) {
      html += `<th class="text-right w-24 sticky-action-col">Actions</th>`;
    }

    theadRow.innerHTML = html;
  }

  renderTableBody() {
    const tbody = this.container.querySelector('#dt-tbody');
    if (!tbody) return;

    const visibleCols = this.getVisibleColumns();

    if (this.filteredData.length === 0) {
      const colSpan = visibleCols.length + (this.selectable ? 1 : 0) + (this.actions.length > 0 ? 1 : 0);
      tbody.innerHTML = `
        <tr>
          <td colspan="${colSpan}" class="text-center py-12 text-[#6B778C]">
            <div class="flex flex-col items-center justify-center gap-2">
              <svg class="w-8 h-8 text-[#A5ADBA]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
              <span class="font-medium">No matching records found</span>
              <span class="text-xs text-[#8993A4]">Try adjusting your search or active filters</span>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    const startIdx = (this.currentPage - 1) * this.pageSize;
    const endIdx = startIdx + this.pageSize;
    const pageItems = this.filteredData.slice(startIdx, endIdx);

    let rowsHtml = '';
    pageItems.forEach((row, idx) => {
      const keyVal = row[this.keyField] || `row-${idx}`;
      const isSelected = this.selectedKeys.has(keyVal);

      rowsHtml += `<tr data-key="${keyVal}" class="${isSelected ? 'bg-[#F4F5F7]' : ''} ${this.onRowClick ? 'cursor-pointer hover:bg-[#FAFBFC]' : ''}">`;

      if (this.selectable) {
        rowsHtml += `
          <td class="text-center">
            <input type="checkbox" data-key="${keyVal}" class="dt-row-checkbox rounded border-[#DFE1E6] text-[#0284C7] focus:ring-0 cursor-pointer" ${isSelected ? 'checked' : ''} />
          </td>
        `;
      }

      visibleCols.forEach(col => {
        let cellVal = row[col.field];
        let content = cellVal !== undefined && cellVal !== null ? cellVal : '-';

        if (col.render) {
          content = col.render(cellVal, row, startIdx + idx);
        } else if (col.type === 'status' || col.field.toLowerCase().includes('status')) {
          content = this.renderStatusLozenge(cellVal);
        }

        rowsHtml += `<td>${content}</td>`;
      });

      if (this.actions.length > 0) {
        rowsHtml += `<td class="text-right whitespace-nowrap sticky-action-col">`;
        this.actions.forEach((act, actIdx) => {
          rowsHtml += `
            <button data-action-idx="${actIdx}" data-key="${keyVal}" class="dt-action-btn p-1 text-[#5E6C84] hover:text-[#0284C7] hover:bg-[#EBECF0] rounded text-xs font-medium mr-1 transition-colors" title="${act.label}">
              ${act.icon || act.label}
            </button>
          `;
        });
        rowsHtml += `</td>`;
      }

      rowsHtml += `</tr>`;
    });

    tbody.innerHTML = rowsHtml;
    this.bindRowEvents();
  }

  renderStatusLozenge(status) {
    if (!status) return '-';
    const s = String(status).toUpperCase();
    let cls = 'lozenge-default';

    if (s.includes('PASS') || s.includes('ACTIVE') || s.includes('CLEARED') || s.includes('COMPLETED') || s.includes('OPTIMAL') || s.includes('ISSUED') || s.includes('PAID') || s.includes('FULFILLED') || s.includes('CONFIRMED')) {
      cls = 'lozenge-success';
    } else if (s.includes('PEND') || s.includes('TEST') || s.includes('IN_PROGRESS') || s.includes('STAGE') || s.includes('PARTIAL') || s.includes('PROCESSING') || s.includes('POSTED')) {
      cls = 'lozenge-inprogress';
    } else if (s.includes('HOLD') || s.includes('WARN') || s.includes('PROVISION')) {
      cls = 'lozenge-warning';
    } else if (s.includes('REJECT') || s.includes('FAIL') || s.includes('CANCEL') || s.includes('BLOCK')) {
      cls = 'lozenge-danger';
    }

    return `<span class="lozenge ${cls}">${status.replace(/_/g, ' ')}</span>`;
  }

  renderPagination() {
    const pagContainer = this.container.querySelector('#dt-pagination-container');
    if (!pagContainer) return;

    const totalPages = Math.ceil(this.filteredData.length / this.pageSize) || 1;
    const startRecord = this.filteredData.length > 0 ? (this.currentPage - 1) * this.pageSize + 1 : 0;
    const endRecord = Math.min(this.currentPage * this.pageSize, this.filteredData.length);

    pagContainer.innerHTML = `
      <div>
        Showing <span class="font-semibold text-[#172B4D]">${startRecord}</span> to <span class="font-semibold text-[#172B4D]">${endRecord}</span> of <span class="font-semibold text-[#172B4D]">${this.filteredData.length}</span> entries
      </div>
      <div class="flex items-center gap-2">
        <button id="dt-page-prev" class="btn-secondary px-2.5 py-1 rounded text-xs ${this.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}">Previous</button>
        <span class="font-medium text-[#172B4D]">Page ${this.currentPage} of ${totalPages}</span>
        <button id="dt-page-next" class="btn-secondary px-2.5 py-1 rounded text-xs ${this.currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}">Next</button>
      </div>
    `;

    pagContainer.querySelector('#dt-page-prev').addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.renderTableBody();
        this.renderPagination();
      }
    });

    pagContainer.querySelector('#dt-page-next').addEventListener('click', () => {
      if (this.currentPage < totalPages) {
        this.currentPage++;
        this.renderTableBody();
        this.renderPagination();
      }
    });
  }

  bindEvents() {
    // Top Filter Bar Toggle Open / Close
    const toggleBtn = this.container.querySelector('.dt-top-filter-toggle-btn');
    const filterBody = this.container.querySelector('.dt-top-filter-body');
    const toggleIcon = this.container.querySelector('.dt-top-filter-toggle-icon');
    const toggleText = this.container.querySelector('.dt-top-filter-toggle-text');

    if (toggleBtn && filterBody) {
      toggleBtn.addEventListener('click', () => {
        this.isFilterCollapsed = !this.isFilterCollapsed;
        if (this.isFilterCollapsed) {
          filterBody.classList.add('hidden');
          if (toggleText) toggleText.innerText = 'Show Filter';
          toggleBtn.title = 'Show Filter';
          if (toggleIcon) toggleIcon.classList.add('-rotate-90');
          toggleBtn.classList.remove('bg-[#F0FAFC]', 'text-[#006C7A]', 'border-[#B2ECF3]');
          toggleBtn.classList.add('bg-white', 'text-[#64748B]', 'border-[#CBD5E1]');
        } else {
          filterBody.classList.remove('hidden');
          if (toggleText) toggleText.innerText = 'Hide Filter';
          toggleBtn.title = 'Hide Filter';
          if (toggleIcon) toggleIcon.classList.remove('-rotate-90');
          toggleBtn.classList.add('bg-[#F0FAFC]', 'text-[#006C7A]', 'border-[#B2ECF3]');
          toggleBtn.classList.remove('bg-white', 'text-[#64748B]', 'border-[#CBD5E1]');
        }
      });
    }

    // Top Filter Bar Reset Button
    const resetBtn = this.container.querySelector('.dt-top-filter-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const centerSel = this.container.querySelector('.dt-top-center-select');
        const supplierSel = this.container.querySelector('.dt-top-supplier-select');
        const plantSel = this.container.querySelector('.dt-top-plant-select');
        const dateInput = this.container.querySelector('.dt-top-date-input');
        if (centerSel) centerSel.value = 'ALL';
        if (supplierSel) supplierSel.value = 'ALL';
        if (plantSel) plantSel.value = 'ALL';
        if (dateInput) dateInput.value = '';

        this.topFilters.center = 'ALL';
        this.topFilters.supplier = 'ALL';
        this.topFilters.plant = 'ALL';
        this.topFilters.date = '';

        this.applyFilters();
        Toast.show('Filters have been reset.', 'info');
      });
    }

    // Top Filter Bar Search Button
    const topSearchBtn = this.container.querySelector('.dt-top-filter-search-btn');
    if (topSearchBtn) {
      topSearchBtn.addEventListener('click', () => {
        const centerSel = this.container.querySelector('.dt-top-center-select');
        const supplierSel = this.container.querySelector('.dt-top-supplier-select');
        const plantSel = this.container.querySelector('.dt-top-plant-select');
        const dateInput = this.container.querySelector('.dt-top-date-input');

        this.topFilters.center = centerSel ? centerSel.value : 'ALL';
        this.topFilters.supplier = supplierSel ? supplierSel.value : 'ALL';
        this.topFilters.plant = plantSel ? plantSel.value : 'ALL';
        this.topFilters.date = (dateInput && dateInput.value) ? dateInput.value : '';

        this.applyFilters();
        Toast.show(`Filtered records: ${this.filteredData.length} entries matching search criteria.`, 'info');
      });
    }

    // In-Table Live Search
    const searchInput = this.container.querySelector('#dt-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value;
        this.applyFilters();
      });
    }

    // Select All Rows Checkbox
    const selectAllBox = this.container.querySelector('#dt-select-all-checkbox');
    if (selectAllBox) {
      selectAllBox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        this.selectedKeys.clear();
        if (isChecked) {
          this.filteredData.forEach((row, idx) => {
            const key = row[this.keyField] || `row-${idx}`;
            this.selectedKeys.add(key);
          });
        }
        this.renderTableBody();
        this.updateBulkBar();
      });
    }

    // Columns Dropdown Toggle
    const colsBtn = this.container.querySelector('#dt-columns-btn');
    const colsDropdown = this.container.querySelector('#dt-columns-dropdown');
    if (colsBtn && colsDropdown) {
      colsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        colsDropdown.classList.toggle('hidden');
      });

      document.addEventListener('click', (e) => {
        if (!colsDropdown.contains(e.target) && e.target !== colsBtn && !colsBtn.contains(e.target)) {
          colsDropdown.classList.add('hidden');
        }
      });
    }

    // Column Checkboxes Toggle
    const colBoxes = this.container.querySelectorAll('.dt-col-toggle-checkbox');
    colBoxes.forEach(cb => {
      cb.addEventListener('change', (e) => {
        const field = cb.dataset.field;
        if (e.target.checked) {
          this.hiddenColumns.delete(field);
        } else {
          // Keep at least 1 column visible
          if (this.getVisibleColumns().length <= 1) {
            e.target.checked = true;
            return;
          }
          this.hiddenColumns.add(field);
        }
        this.renderHeader();
        this.renderTableBody();
      });
    });

    // Reset / Show All Columns Button
    const resetColsBtn = this.container.querySelector('#dt-cols-reset-btn');
    if (resetColsBtn) {
      resetColsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hiddenColumns.clear();
        this.container.querySelectorAll('.dt-col-toggle-checkbox').forEach(cb => {
          cb.checked = true;
        });
        this.renderHeader();
        this.renderTableBody();
      });
    }

    // Export Dropdown Toggle & Options
    const exportDropBtn = this.container.querySelector('#dt-export-dropdown-btn');
    const exportDropdown = this.container.querySelector('#dt-export-dropdown');
    const exportCaret = this.container.querySelector('.dt-export-caret');
    if (exportDropBtn && exportDropdown) {
      exportDropBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = exportDropdown.classList.contains('hidden');
        exportDropdown.classList.toggle('hidden');
        if (exportCaret) {
          if (isHidden) {
            exportCaret.classList.add('rotate-180');
          } else {
            exportCaret.classList.remove('rotate-180');
          }
        }
      });

      document.addEventListener('click', (e) => {
        if (!exportDropdown.contains(e.target) && e.target !== exportDropBtn && !exportDropBtn.contains(e.target)) {
          exportDropdown.classList.add('hidden');
          if (exportCaret) exportCaret.classList.remove('rotate-180');
        }
      });
    }

    const exportOptions = this.container.querySelectorAll('.dt-export-option');
    exportOptions.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        if (exportDropdown) {
          exportDropdown.classList.add('hidden');
          if (exportCaret) exportCaret.classList.remove('rotate-180');
        }
        const fmt = opt.dataset.format;
        if (fmt === 'xlsx' || fmt === 'xls') {
          this.exportToExcel(fmt);
        } else if (fmt === 'csv') {
          this.exportToCSV();
        } else if (fmt === 'pdf') {
          this.exportToPDF();
        } else if (fmt === 'copy') {
          this.copyToClipboard();
        }
      });
    });

    // Row Density Segmented Switcher
    const densityBtns = this.container.querySelectorAll('.dt-density-btn');
    const tableEl = this.container.querySelector('table');
    densityBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const d = btn.getAttribute('data-density');
        this.density = d;
        if (tableEl) {
          tableEl.classList.remove('tbl-compact', 'tbl-standard', 'tbl-spacious');
          tableEl.classList.add(`tbl-${d}`);
        }
        densityBtns.forEach(b => {
          b.classList.remove('bg-white', 'text-[#006C7A]', 'shadow-xs', 'font-bold');
          b.classList.add('hover:text-[#0F172A]');
        });
        btn.classList.add('bg-white', 'text-[#006C7A]', 'shadow-xs', 'font-bold');
        btn.classList.remove('hover:text-[#0F172A]');
      });
    });

    // Delegated Sort Click Header
    const theadRow = this.container.querySelector('#dt-thead-row');
    if (theadRow) {
      theadRow.addEventListener('click', (e) => {
        const th = e.target.closest('th[data-field]');
        if (!th) return;
        const field = th.dataset.field;
        if (this.sortColumn === field) {
          this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortColumn = field;
          this.sortDirection = 'asc';
        }
        this.renderHeader();
        this.applyFilters();
      });
    }
  }

  bindRowEvents() {
    const rowBoxes = this.container.querySelectorAll('.dt-row-checkbox');
    rowBoxes.forEach(box => {
      box.addEventListener('change', (e) => {
        const key = box.dataset.key;
        if (e.target.checked) {
          this.selectedKeys.add(key);
        } else {
          this.selectedKeys.delete(key);
        }
        this.updateBulkBar();
      });
    });

    const actionBtns = this.container.querySelectorAll('.dt-action-btn');
    actionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const actIdx = parseInt(btn.dataset.actionIdx, 10);
        const key = btn.dataset.key;
        const row = this.originalData.find((r, i) => (r[this.keyField] || `row-${i}`) === key);
        if (this.actions[actIdx] && this.actions[actIdx].onClick) {
          this.actions[actIdx].onClick(row, this);
        }
      });
    });

    if (this.onRowClick) {
      const rows = this.container.querySelectorAll('#dt-tbody tr[data-key]');
      rows.forEach(tr => {
        tr.addEventListener('click', (e) => {
          if (e.target.tagName === 'INPUT' || e.target.closest('button')) return;
          const key = tr.dataset.key;
          const row = this.originalData.find((r, i) => (r[this.keyField] || `row-${i}`) === key);
          this.onRowClick(row, this);
        });
      });
    }
  }

  updateBulkBar() {
    const bulkBar = this.container.querySelector('#dt-bulk-bar');
    const selectedCount = this.container.querySelector('#dt-selected-count');
    if (!bulkBar) return;

    if (this.selectedKeys.size > 0) {
      bulkBar.classList.remove('hidden');
      bulkBar.classList.add('flex');
      selectedCount.innerText = `${this.selectedKeys.size} items selected`;
    } else {
      bulkBar.classList.add('hidden');
      bulkBar.classList.remove('flex');
    }
  }

  copyToClipboard() {
    if (!this.filteredData || this.filteredData.length === 0) {
      Toast.show('No data available to copy.', 'warning');
      return;
    }

    const visibleCols = this.columns.filter(c => !this.hiddenColumns.has(c.field));
    const headers = visibleCols.map(c => c.header).join('\t');
    const rows = this.filteredData.map(row => {
      return visibleCols.map(c => {
        let val = row[c.field];
        if (val === undefined || val === null) val = '';
        const cleanVal = String(val).replace(/<[^>]*>/g, '').replace(/[\t\n\r]/g, ' ').trim();
        return cleanVal;
      }).join('\t');
    });

    const tsvContent = [headers, ...rows].join('\n');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(tsvContent).then(() => {
        Toast.show(`Copied ${this.filteredData.length} records to clipboard.`, 'success', 'Table Data Copied');
      }).catch(() => {
        this.fallbackCopyTextToClipboard(tsvContent);
      });
    } else {
      this.fallbackCopyTextToClipboard(tsvContent);
    }
  }

  fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      Toast.show(`Copied ${this.filteredData.length} records to clipboard.`, 'success', 'Table Data Copied');
    } catch (err) {
      Toast.show('Failed to copy table data.', 'error');
    }
    document.body.removeChild(textArea);
  }

  exportToExcel(format = 'xlsx') {
    if (!this.filteredData || this.filteredData.length === 0) {
      Toast.show('No data available to export.', 'warning');
      return;
    }
    const visibleCols = this.columns.filter(c => !this.hiddenColumns.has(c.field));
    const title = (this.tableTitle || 'Table_Export').replace(/\s+/g, '_');
    const filename = `${title}_${Date.now()}.${format}`;

    let tableHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">`;
    tableHtml += `<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${title.slice(0, 31)}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body>`;
    tableHtml += `<table border="1"><thead><tr style="background:#006C7A;color:#FFFFFF;font-weight:bold;">`;
    visibleCols.forEach(col => {
      tableHtml += `<th style="padding:8px 12px;background:#006C7A;color:#FFFFFF;">${col.header}</th>`;
    });
    tableHtml += `</tr></thead><tbody>`;
    this.filteredData.forEach(row => {
      tableHtml += `<tr>`;
      visibleCols.forEach(col => {
        let val = row[col.field];
        if (val === undefined || val === null) val = '';
        const cleanVal = String(val).replace(/<[^>]*>/g, '').trim();
        tableHtml += `<td style="padding:6px 10px;">${cleanVal}</td>`;
      });
      tableHtml += `</tr>`;
    });
    tableHtml += `</tbody></table></body></html>`;

    const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    Toast.show(`Exported ${this.filteredData.length} records as ${format.toUpperCase()}.`, 'success', 'Export Completed');
  }

  exportToCSV() {
    if (!this.filteredData || this.filteredData.length === 0) {
      Toast.show('No data available to export.', 'warning');
      return;
    }

    const visibleCols = this.columns.filter(c => !this.hiddenColumns.has(c.field));
    const headers = visibleCols.map(c => `"${c.header.replace(/"/g, '""')}"`).join(',');
    const rows = this.filteredData.map(row => {
      return visibleCols.map(c => {
        let val = row[c.field];
        if (val === undefined || val === null) val = '';
        const cleanVal = String(val).replace(/<[^>]*>/g, '').trim();
        return `"${cleanVal.replace(/"/g, '""')}"`;
      }).join(',');
    });

    const csvContent = '\uFEFF' + [headers, ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const title = (this.tableTitle || 'Table_Export').replace(/\s+/g, '_');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title}_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    Toast.show(`Exported ${this.filteredData.length} records as CSV.`, 'success', 'Export Completed');
  }

  exportToPDF() {
    Toast.show('Preparing printable document format...', 'info', 'PDF Export');
    window.print();
  }
}
