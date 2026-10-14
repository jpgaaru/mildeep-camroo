/**
 * AquaOps Design System — InlineEditableTable Organism Component
 * Supports mixed readonly & interactive floor data entry rows, reactive calculations,
 * keyboard accessibility (Tab, Enter navigation), and tokenized shortfall delta styling.
 * Scoped with .aq-editable-* — Zero global style collision.
 */

export class InlineEditableTable {
  constructor(config = {}) {
    this.containerId = config.containerId;
    this.title = config.title || '';
    this.columns = config.columns || [];
    this.data = config.data || [];
    this.onCellChange = config.onCellChange || null;
    this.onRowSave = config.onRowSave || null;

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
    const tableId = `aq-editable-${Math.random().toString(36).substring(2, 9)}`;

    return `
      <div class="aq-editable-card" id="${tableId}-card" style="background:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.02);margin-bottom:24px;">
        ${this.title ? `
          <div style="padding:14px 20px;border-bottom:1px solid #E2E8F0;display:flex;align-items:center;justify-content:space-between;">
            <span style="font-size:14px;font-weight:700;color:#0F172A;font-family:'Inter',sans-serif;">${this.title}</span>
            <span style="font-size:11.5px;color:#64748B;">Keyboard Tab navigation enabled</span>
          </div>
        ` : ''}
        <div style="overflow-x:auto;width:100%;">
          <table class="aq-editable-table" id="${tableId}" style="width:100%;border-collapse:collapse;font-size:12.5px;font-family:'Inter',-apple-system,sans-serif;text-align:left;">
            <thead>
              <tr style="background:#F8FAFC;border-bottom:1.5px solid #E2E8F0;">
                ${this.columns.map(c => `
                  <th style="padding:10px 14px;color:#475569;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.35px;white-space:nowrap;">
                    ${c.label}
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${this.renderRows()}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderRows() {
    if (!this.data || this.data.length === 0) {
      return `<tr><td colspan="${this.columns.length}" style="text-align:center;padding:32px 14px;color:#64748B;font-style:italic;">No records present</td></tr>`;
    }

    return this.data.map((row, rIdx) => {
      return `
        <tr data-row-idx="${rIdx}" style="border-bottom:1px solid #F1F5F9;transition:background 0.1s ease;">
          ${this.columns.map(col => {
            const val = row[col.key];

            if (col.editable) {
              return `
                <td style="padding:8px 12px;vertical-align:middle;">
                  <input 
                    type="${col.type || 'text'}" 
                    class="aq-editable-input" 
                    data-row="${rIdx}" 
                    data-key="${col.key}"
                    value="${val !== undefined ? val : ''}"
                    step="${col.step || 'any'}"
                    style="width:${col.width || '85px'};padding:5px 8px;border:1px solid #CBD5E1;border-radius:6px;font-size:12.5px;color:#0F172A;background:#FFFFFF;outline:none;font-family:'Inter',sans-serif;transition:border-color 0.15s ease;"
                  />
                </td>
              `;
            }

            if (col.calculated) {
              const calcVal = col.calculated(row);
              const isNegative = typeof calcVal === 'number' && calcVal < 0;
              const colorClass = isNegative ? 'color:#16A34A;font-weight:700;' : 'color:#0F172A;';
              return `
                <td style="padding:10px 14px;vertical-align:middle;${colorClass}">
                  ${calcVal}
                </td>
              `;
            }

            if (col.render) {
              return `<td style="padding:10px 14px;vertical-align:middle;">${col.render(val, row, rIdx)}</td>`;
            }

            return `
              <td style="padding:10px 14px;vertical-align:middle;color:#334155;white-space:nowrap;">
                ${val !== undefined ? val : '-'}
              </td>
            `;
          }).join('')}
        </tr>
      `;
    }).join('');
  }

  bindEvents(container) {
    const inputs = container.querySelectorAll('.aq-editable-input');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.style.borderColor = '#006C7A';
        input.style.boxShadow = '0 0 0 3px rgba(0, 108, 122, 0.14)';
      });
      input.addEventListener('blur', () => {
        input.style.borderColor = '#CBD5E1';
        input.style.boxShadow = 'none';
      });

      input.addEventListener('input', (e) => {
        const rIdx = parseInt(e.target.getAttribute('data-row'), 10);
        const colKey = e.target.getAttribute('data-key');
        let val = e.target.value;
        if (e.target.type === 'number') {
          val = parseFloat(val) || 0;
        }

        this.data[rIdx][colKey] = val;

        // Re-evaluate calculated columns for this row
        const rowEl = container.querySelector(`tr[data-row-idx="${rIdx}"]`);
        if (rowEl) {
          this.columns.forEach((col, cIdx) => {
            if (col.calculated) {
              const calcVal = col.calculated(this.data[rIdx]);
              const cell = rowEl.children[cIdx];
              if (cell) {
                cell.textContent = calcVal;
                cell.style.color = (typeof calcVal === 'number' && calcVal < 0) ? '#16A34A' : '#0F172A';
                cell.style.fontWeight = (typeof calcVal === 'number' && calcVal < 0) ? '700' : '500';
              }
            }
          });
        }

        if (this.onCellChange) {
          this.onCellChange(rIdx, colKey, val, this.data[rIdx]);
        }
      });
    });
  }
}
