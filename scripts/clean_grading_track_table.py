#!/usr/bin/env python3
"""
Replaces the inline-input table in renderGradingTrackid with clean text cells and Edit popup modal.
Updates js/views/preprocessingView.js, standalone.html, and miledeep-devi-fisheries.html.
"""

import os

OLD_BLOCK = """      tbody.innerHTML = filtered.map((r, idx) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors" data-id="${r.id}">
          <td class="py-2 px-3 font-bold text-[#64748B]">${idx + 1}</td>
          <td class="py-2 px-3">
            <select data-field="variety" data-id="${r.id}" class="gt-inline px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] outline-none">
              ${varieties.map(v => `<option value="${v}" ${r.variety === v ? 'selected' : ''}>${v}</option>`).join('')}
            </select>
          </td>
          <td class="py-2 px-3">
            <input type="number" step="0.01" value="${r.hlCount || ''}" data-field="hlCount" data-id="${r.id}" class="gt-inline w-24 px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] outline-none font-semibold">
          </td>
          <td class="py-2 px-3">
            <select data-field="grade" data-id="${r.id}" class="gt-inline px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] outline-none font-mono">
              ${grades.map(g => `<option value="${g}" ${r.grade === g ? 'selected' : ''}>${g}</option>`).join('')}
            </select>
          </td>
          <td class="py-2 px-3">
            <select data-field="treatment" data-id="${r.id}" class="gt-inline px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] outline-none">
              ${treatments.map(t => `<option value="${t}" ${r.treatment === t ? 'selected' : ''}>${t}</option>`).join('')}
            </select>
          </td>
          <td class="py-2 px-3">
            <select data-field="freezing" data-id="${r.id}" class="gt-inline px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] outline-none">
              ${freezings.map(f => `<option value="${f}" ${r.freezing === f ? 'selected' : ''}>${f}</option>`).join('')}
            </select>
          </td>
          <td class="py-2 px-3 text-right">
            <input type="number" value="${r.crates || ''}" data-field="crates" data-id="${r.id}" class="gt-inline w-20 text-right px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] outline-none">
          </td>
          <td class="py-2 px-3 text-right">
            <input type="number" step="0.01" value="${r.gradingQty || ''}" data-field="gradingQty" data-id="${r.id}" class="gt-inline w-24 text-right px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs font-bold text-[#006644] focus:border-[#02a8b5] outline-none">
          </td>
          <td class="py-2 px-3">
            <input type="text" placeholder="Enter Crate Qty" value="${r.tubWeight || ''}" data-field="tubWeight" data-id="${r.id}" class="gt-inline w-28 px-2 py-1 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:border-[#02a8b5] outline-none">
          </td>
          <td class="py-2 px-3 text-center">
            <div class="flex items-center justify-center gap-1.5">
              <button type="button" data-save-id="${r.id}" class="gt-save-row p-1 text-[#0284C7] hover:bg-[#F0F9FF] rounded cursor-pointer" title="Lock / Save Line">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>
              </button>
              <button type="button" data-del-id="${r.id}" class="gt-del-row p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer" title="Delete Line">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.gt-inline').forEach(el => {
        el.addEventListener('change', (e) => {
          const id = e.target.getAttribute('data-id');
          const field = e.target.getAttribute('data-field');
          const rec = this.gradingTrackLines.find(x => x.id === id);
          if (rec) {
            rec[field] = e.target.value;
          }
        });
      });

      tbody.querySelectorAll('.gt-save-row').forEach(btn => {
        btn.addEventListener('click', () => {
          if (window.Toast) window.Toast.show('Grading line locked & saved', 'success');
        });
      });

      tbody.querySelectorAll('.gt-del-row').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-del-id');
          if (confirm('Delete this grading size line?')) {
            this.gradingTrackLines = this.gradingTrackLines.filter(x => x.id !== id);
            renderGrid(searchInput?.value || '');
            if (window.Toast) window.Toast.show('Grading size line deleted', 'info');
          }
        });
      });"""

NEW_BLOCK = """      tbody.innerHTML = filtered.map((r, idx) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors" data-id="${r.id}">
          <td class="py-2.5 px-3 font-bold text-[#64748B]">${idx + 1}</td>
          <td class="py-2.5 px-3 font-semibold text-[#0F172A]">${r.variety || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155] font-mono">${r.hlCount || '-'}</td>
          <td class="py-2.5 px-3 font-bold text-[#0284C7] font-mono">${r.grade || '-'}</td>
          <td class="py-2.5 px-3 text-[#334155]">${r.treatment || '-'}</td>
          <td class="py-2.5 px-3 font-medium text-[#1E293B]">${r.freezing || '-'}</td>
          <td class="py-2.5 px-3 text-right text-[#334155] font-mono">${r.crates || 0}</td>
          <td class="py-2.5 px-3 text-right font-bold text-[#006644] font-mono">${r.gradingQty || '0.00'}</td>
          <td class="py-2.5 px-3 text-[#64748B]">${r.tubWeight || '-'}</td>
          <td class="py-2.5 px-3 text-center">
            <div class="flex items-center justify-center gap-1.5">
              <button type="button" data-edit-id="${r.id}" class="gt-edit-row p-1 text-[#02a8b5] hover:text-[#008f9a] hover:bg-[#F0FDFA] rounded cursor-pointer" title="Edit Line">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>
              <button type="button" data-del-id="${r.id}" class="gt-del-row p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer" title="Delete Line">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.gt-edit-row').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-edit-id');
          const rec = this.gradingTrackLines.find(x => x.id === id);
          if (rec) this.openGradingTrackLineModal(rec);
        });
      });

      tbody.querySelectorAll('.gt-del-row').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-del-id');
          if (confirm('Delete this grading size line?')) {
            this.gradingTrackLines = this.gradingTrackLines.filter(x => x.id !== id);
            renderGrid(searchInput?.value || '');
            if (window.Toast) window.Toast.show('Grading size line deleted', 'info');
          }
        });
      });"""

def process_file(fp):
    print(f"Updating {fp}...")
    with open(fp, 'r', encoding='utf-8') as f:
        c = f.read()

    if OLD_BLOCK in c:
        c = c.replace(OLD_BLOCK, NEW_BLOCK)
        print("  ✓ Replaced inline input table with clean text table and edit popup modal")
    else:
        print("  ⚠️ Could not find exact OLD_BLOCK")

    with open(fp, 'w', encoding='utf-8') as f:
        f.write(c)

def main():
    for fp in ['js/views/preprocessingView.js', 'standalone.html', 'miledeep-devi-fisheries.html']:
        process_file(fp)

if __name__ == '__main__':
    main()
