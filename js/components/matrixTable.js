/**
 * AquaOps Design System — MatrixTable Organism Component
 * Supports multi-tier grouped headers, cross-tab matrices, sticky columns,
 * live client-side search, and export capabilities.
 * Zero external dependencies.
 */

export class MatrixTable {
  constructor(config = {}) {
    this.containerId = config.containerId;
    this.title = config.title || '';
    this.subtitle = config.subtitle || '';
    this.headerGroups = config.headerGroups || []; // Array of { label, colspan, rowspan, class }
    this.columns = config.columns || []; // Array of { key, label, align, isTotal, render }
    this.data = config.data || [];
    this.filteredData = [...this.data];
    this.searchable = config.searchable !== false;
    this.exportable = config.exportable !== false;
    this.onRowClick = config.onRowClick || null;

    if (this.containerId) {
      this.mount();
    }
  }

  mount() {
    const container = typeof this.containerId === 'string'
      ? document.getElementById(this.containerId)
      : this.containerId;
    if (!container) return;

    container.innerHTML = this.renderHTML();
    this.bindEvents(container);
  }

  renderHTML() {
    const tableId = `aq-matrix-${Math.random().toString(36).substring(2, 9)}`;

    return `
      <div class="aq-matrix-card" id="${tableId}-card">
        ${this.renderHeader(tableId)}
        <div class="aq-matrix-wrapper">
          <table class="aq-matrix-table" id="${tableId}">
            <thead>
              ${this.renderThead()}
            </thead>
            <tbody id="${tableId}-tbody">
              ${this.renderRows(this.filteredData)}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderHeader(tableId) {
    if (!this.title && !this.searchable && !this.exportable) return '';

    return `
      <div class="aq-matrix-header">
        <div class="aq-matrix-title-group">
          ${this.title ? `<span class="aq-matrix-title">${this.title}</span>` : ''}
          ${this.subtitle ? `<span class="aq-matrix-subtitle">${this.subtitle}</span>` : ''}
        </div>
        <div class="aq-matrix-controls">
          ${this.searchable ? `
            <div class="aq-matrix-search-box">
              <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input type="text" class="aq-matrix-search-input" placeholder="Search matrix..." aria-label="Search matrix" />
            </div>
          ` : ''}
          ${this.exportable ? `
            <button type="button" class="aq-matrix-export-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 text-[#006C7A] border border-[#CBD5E1] transition-all flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <span>Export</span>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }

  renderThead() {
    if (this.headerGroups.length > 0) {
      // 2-tier multi-level grouped header
      const row1 = this.headerGroups.map(g => `
        <th 
          ${g.colspan ? `colspan="${g.colspan}"` : ''} 
          ${g.rowspan ? `rowspan="${g.rowspan}"` : ''} 
          class="${g.colspan > 1 ? 'aq-matrix-th-parent' : ''} ${g.stickyLeft ? 'aq-matrix-th-sticky-left' : ''}"
        >
          ${g.label}
        </th>
      `).join('');

      const childCols = this.columns.filter(c => c.isChild);
      const row2 = childCols.length > 0 ? `
        <tr>
          ${childCols.map(c => `<th class="aq-matrix-th-child">${c.label}</th>`).join('')}
        </tr>
      ` : '';

      return `<tr>${row1}</tr>${row2}`;
    }

    // Single-tier standard matrix header
    return `
      <tr>
        ${this.columns.map(c => `
          <th class="${c.align === 'center' ? 'text-center' : c.align === 'right' ? 'text-right' : ''}">
            ${c.label}
          </th>
        `).join('')}
      </tr>
    `;
  }

  renderRows(dataset) {
    if (!dataset || dataset.length === 0) {
      return `<tr><td colspan="${Math.max(this.columns.length, 1)}" class="aq-matrix-empty">No matching records found</td></tr>`;
    }

    return dataset.map((row, idx) => {
      return `
        <tr data-row-idx="${idx}">
          ${this.columns.map(col => {
            const rawVal = row[col.key] !== undefined ? row[col.key] : '-';
            const displayVal = col.render ? col.render(rawVal, row, idx) : rawVal;
            const alignClass = col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : '';
            const totalClass = col.isTotal ? 'aq-matrix-total-cell' : '';
            const stickyClass = col.stickyLeft ? 'aq-matrix-td-sticky-left' : '';

            return `
              <td class="${alignClass} ${totalClass} ${stickyClass}">
                ${displayVal}
              </td>
            `;
          }).join('')}
        </tr>
      `;
    }).join('');
  }

  bindEvents(container) {
    const searchInput = container.querySelector('.aq-matrix-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (!query) {
          this.filteredData = [...this.data];
        } else {
          this.filteredData = this.data.filter(row => {
            return Object.values(row).some(val => 
              String(val).toLowerCase().includes(query)
            );
          });
        }
        const tbody = container.querySelector('tbody');
        if (tbody) {
          tbody.innerHTML = this.renderRows(this.filteredData);
        }
      });
    }

    const exportBtn = container.querySelector('.aq-matrix-export-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        this.exportToCSV();
      });
    }
  }

  exportToCSV() {
    if (!this.data || this.data.length === 0) return;
    const headers = this.columns.map(c => `"${c.label.replace(/"/g, '""')}"`).join(',');
    const rows = this.filteredData.map(row => {
      return this.columns.map(col => {
        const val = row[col.key] !== undefined ? String(row[col.key]) : '';
        return `"${val.replace(/"/g, '""')}"`;
      }).join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${(this.title || 'matrix_export').toLowerCase().replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
