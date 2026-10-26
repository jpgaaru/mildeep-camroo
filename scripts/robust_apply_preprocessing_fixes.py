#!/usr/bin/env python3
"""
Robust, direct string transformation script to fix Preprocessing:
1. Declutter Pre-processing Dashboard (3-col spacious grid, clean KPI cards without multi-line descriptions).
2. Wire Add / Create / New and Edit buttons to open popup modals (Modal.open) and completely remove bottom inline cards.
3. Fix all search input fields with style="padding-left: 36px !important;" and centered pointer-events-none icon.
4. Ensure tab menu titles have no 'Chemical' prefix in the last four tabs and clear any legacy submenu cache.
5. Symmetrically sync to standalone.html and miledeep-devi-fisheries.html.
"""

import os
import re

def transform_preprocessing_code(content):
    # 1. Pre-Processing Dashboard Decluttering
    old_grid = '<div id="preproc-kpi-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3"></div>'
    new_grid = '<div id="preproc-kpi-grid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"></div>'
    if old_grid in content:
        content = content.replace(old_grid, new_grid)
        print("  ✓ Updated preproc-kpi-grid layout to 3-column spacious grid")

    clutter_lines = [
        '<span class="text-[11px] text-[#64748B] mt-1 block">Live intake across VSP, KKD & PSP docks</span>',
        '<span class="text-[11px] text-[#64748B] mt-1 block">33.1% head waste recovered for byproduct meal</span>',
        '<span class="text-[11px] text-[#64748B] mt-1 block">Roller grader lines active in Unit-1 and Unit-2</span>',
        '<span class="text-[11px] text-[#64748B] mt-1 block">Skewer, Nobashi, and EZ-peel specialty lines</span>',
        '<span class="text-[11px] text-[#64748B] mt-1 block">Transferred to Contact plate & IQF tunnels</span>',
        '<span class="text-[11px] text-[#64748B] mt-1 block">Closing balance across 4 plant storage bunkers</span>',
    ]
    for cl in clutter_lines:
        if cl in content:
            content = content.replace(cl, '')
            print(f"  ✓ Removed clutter line: {cl[:40]}...")

    # 2. Remove bottom inline create cards (in reverse order to preserve indices)
    for cid in ['cp-create-card', 'cc-create-card', 'rc-create-card', 'cpo-create-card']:
        idx = content.find(f'id="{cid}"')
        if idx != -1:
            start = content.rfind('<!-- Create/Edit Form Card:', 0, idx)
            end = content.find('</form>\n        </div>', idx)
            if start != -1 and end != -1:
                end += len('</form>\n        </div>')
                content = content[:start] + content[end:]
                print(f"  ✓ Removed inline card DOM for #{cid}")

    # 3. Wire Add / Create buttons
    # CPO Add
    cpo_add_target = content.find("btnAddPo?.addEventListener('click'")
    if cpo_add_target != -1:
        cpo_add_end = content.find("});", cpo_add_target) + 3
        cpo_new_listener = """btnAddPo?.addEventListener('click', () => {
      if (window.PreprocessingView && window.PreprocessingView.openChemPOModal) {
        window.PreprocessingView.openChemPOModal();
      }
    });"""
        content = content[:cpo_add_target] + cpo_new_listener + content[cpo_add_end:]
        print("  ✓ Wired btnAddPo to openChemPOModal()")

    # CPO Edit
    cpo_edit_target = content.find("tbody.querySelectorAll('.cpo-action-edit')")
    if cpo_edit_target != -1:
        cpo_edit_end = content.find("tbody.querySelectorAll('.cpo-action-addline')", cpo_edit_target)
        cpo_new_edit = """tbody.querySelectorAll('.cpo-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.chemicalPosList.find(x => x.id === id);
          if (!rec) return;
          if (window.PreprocessingView && window.PreprocessingView.openChemPOModal) {
            window.PreprocessingView.openChemPOModal(rec);
          }
        });
      });

      """
        content = content[:cpo_edit_target] + cpo_new_edit + content[cpo_edit_end:]
        print("  ✓ Wired cpo row edit to openChemPOModal(rec)")

    # RC Add
    rc_add_target = content.find("btnAddOrder?.addEventListener('click'")
    if rc_add_target != -1:
        rc_add_end = content.find("});", rc_add_target) + 3
        rc_new_listener = """btnAddOrder?.addEventListener('click', () => {
      if (window.PreprocessingView && window.PreprocessingView.openChemOrderModal) {
        window.PreprocessingView.openChemOrderModal();
      }
    });"""
        content = content[:rc_add_target] + rc_new_listener + content[rc_add_end:]
        print("  ✓ Wired btnAddOrder to openChemOrderModal()")

    # RC Edit
    rc_edit_target = content.find("tbody.querySelectorAll('.rc-action-edit')")
    if rc_edit_target != -1:
        rc_edit_end = content.find("};\n\n    // Initial render", rc_edit_target)
        if rc_edit_end == -1:
            rc_edit_end = content.find("};\n    renderTable", rc_edit_target)
        if rc_edit_end != -1:
            rc_new_edit = """tbody.querySelectorAll('.rc-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.receivedChemicalsList.find(x => x.id === id);
          if (!rec) return;
          if (window.PreprocessingView && window.PreprocessingView.openChemOrderModal) {
            window.PreprocessingView.openChemOrderModal(rec);
          }
        });
      });\n    """
            content = content[:rc_edit_target] + rc_new_edit + content[rc_edit_end:]
            print("  ✓ Wired rc row edit to openChemOrderModal(rec)")

    # CC Add
    cc_add_target = content.find("btnAddConsumption?.addEventListener('click'")
    if cc_add_target != -1:
        cc_add_end = content.find("});", cc_add_target) + 3
        cc_new_listener = """btnAddConsumption?.addEventListener('click', () => {
      if (window.PreprocessingView && window.PreprocessingView.openChemConsumptionModal) {
        window.PreprocessingView.openChemConsumptionModal();
      }
    });"""
        content = content[:cc_add_target] + cc_new_listener + content[cc_add_end:]
        print("  ✓ Wired btnAddConsumption to openChemConsumptionModal()")

    # CP Add
    cp_add_target = content.find("btnAddPayment?.addEventListener('click'")
    if cp_add_target != -1:
        cp_add_end = content.find("});", cp_add_target) + 3
        cp_new_listener = """btnAddPayment?.addEventListener('click', () => {
      if (window.PreprocessingView && window.PreprocessingView.openChemPaymentModal) {
        window.PreprocessingView.openChemPaymentModal();
      }
    });"""
        content = content[:cp_add_target] + cp_new_listener + content[cp_add_end:]
        print("  ✓ Wired btnAddPayment to openChemPaymentModal()")

    # CP Edit
    cp_edit_target = content.find("tbody.querySelectorAll('.cp-action-edit')")
    if cp_edit_target != -1:
        cp_edit_end = content.find("};\n\n    renderTable", cp_edit_target)
        if cp_edit_end == -1:
            cp_edit_end = content.find("};\n    const renderTable", cp_edit_target)
        if cp_edit_end != -1:
            cp_new_edit = """tbody.querySelectorAll('.cp-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.chemicalPaymentsList.find(x => x.id === id);
          if (!rec) return;
          if (window.PreprocessingView && window.PreprocessingView.openChemPaymentModal) {
            window.PreprocessingView.openChemPaymentModal(rec);
          }
        });
      });\n    """
            content = content[:cp_edit_target] + cp_new_edit + content[cp_edit_end:]
            print("  ✓ Wired cp row edit to openChemPaymentModal(rec)")

    # 4. Search inputs with padding and centered pointer-events-none icon
    search_ids = [
        'cpo-table-search',
        'rc-table-search',
        'cc-table-search',
        'crr-table-search',
        'cob-table-search',
        'cp-table-search',
        'rm-search',
        'dh-table-search',
        'gr-table-search',
        'dht-search',
        'gt-search',
        'va-search',
        'ht-search'
    ]

    for sid in search_ids:
        # Pattern 1: input followed by svg
        p1 = re.compile(
            rf'(<div class="relative[^"]*">\s*)'
            rf'(<input type="text" id="{sid}" placeholder="Search\.\.\."\s+class="[^"]*"\s*>)\s*'
            r'(<svg class="w-4 h-4 text-\[#94A3B8\] absolute left-3 top-2\.5"[^>]*>.*?</svg>)\s*'
            r'(</div>)',
            re.DOTALL
        )
        def repl1(m):
            div_start = m.group(1)
            return (
                f'{div_start}'
                f'  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">\n'
                f'    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>\n'
                f'  </div>\n'
                f'  <input type="text" id="{sid}" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">\n'
                f'</div>'
            )
        content, c1 = p1.subn(repl1, content)
        if c1 > 0:
            print(f"  ✓ Fixed search input wrapper for #{sid}")
        else:
            # Fallback simple replacement
            old_simple = f'id="{sid}" placeholder="Search..." class="w-full pl-9 pr-3'
            new_simple = f'id="{sid}" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3'
            if old_simple in content:
                content = content.replace(old_simple, new_simple)
                print(f"  ✓ Applied padding fallback to #{sid}")

    return content

def main():
    # 1. Update preprocessingView.js
    f_path = 'js/views/preprocessingView.js'
    print(f"Processing {f_path}...")
    with open(f_path, 'r', encoding='utf-8') as f:
        pre_code = f.read()
    
    updated_pre = transform_preprocessing_code(pre_code)
    with open(f_path, 'w', encoding='utf-8') as f:
        f.write(updated_pre)
    print(f"✓ Saved {f_path}")

    # 2. Update standalone.html
    s_path = 'standalone.html'
    if os.path.exists(s_path):
        print(f"Processing {s_path}...")
        with open(s_path, 'r', encoding='utf-8') as f:
            s_content = f.read()
        
        # Replace PreprocessingView inside standalone.html
        s_start = s_content.find('const PreprocessingView = {')
        s_end = s_content.find('\nconst QCView = {', s_start)
        if s_start != -1 and s_end != -1:
            # Extract standalone's PreprocessingView and transform it
            orig_view = s_content[s_start:s_end]
            transformed_view = transform_preprocessing_code(orig_view)
            s_content = s_content[:s_start] + transformed_view + s_content[s_end:]
            print(f"  ✓ Transformed PreprocessingView in {s_path}")
        
        # Ensure tab names have no 'Chemical' in sidebar
        s_content = s_content.replace('label: "Chemical Received Report"', 'label: "Received Report"')
        s_content = s_content.replace('label: "Chemical Opening Balance Report"', 'label: "Opening Balance Report"')
        s_content = s_content.replace('label: "Chemical Balance Report"', 'label: "Balance Report"')
        s_content = s_content.replace('label: "Chemical Payments List"', 'label: "Payments List"')
        s_content = s_content.replace('"title": "Chemical Received Report"', '"title": "Received Report"')
        s_content = s_content.replace('"title": "Chemical Opening Balance Report"', '"title": "Opening Balance Report"')
        s_content = s_content.replace('"title": "Chemical Balance Report"', '"title": "Balance Report"')
        s_content = s_content.replace('"title": "Chemical Payments List"', '"title": "Payments List"')

        with open(s_path, 'w', encoding='utf-8') as f:
            f.write(s_content)
        print(f"✓ Saved {s_path}")

    # 3. Update miledeep-devi-fisheries.html
    m_path = 'miledeep-devi-fisheries.html'
    if os.path.exists(m_path):
        print(f"Processing {m_path}...")
        with open(m_path, 'r', encoding='utf-8') as f:
            m_content = f.read()
        
        m_start = m_content.find('const PreprocessingView = {')
        m_end = m_content.find('\nconst QCView = {', m_start)
        if m_start != -1 and m_end != -1:
            orig_view = m_content[m_start:m_end]
            transformed_view = transform_preprocessing_code(orig_view)
            m_content = m_content[:m_start] + transformed_view + m_content[m_end:]
            print(f"  ✓ Transformed PreprocessingView in {m_path}")
        
        # Ensure tab names have no 'Chemical' in sidebar
        m_content = m_content.replace('label: "Chemical Received Report"', 'label: "Received Report"')
        m_content = m_content.replace('label: "Chemical Opening Balance Report"', 'label: "Opening Balance Report"')
        m_content = m_content.replace('label: "Chemical Balance Report"', 'label: "Balance Report"')
        m_content = m_content.replace('label: "Chemical Payments List"', 'label: "Payments List"')
        m_content = m_content.replace('"title": "Chemical Received Report"', '"title": "Received Report"')
        m_content = m_content.replace('"title": "Chemical Opening Balance Report"', '"title": "Opening Balance Report"')
        m_content = m_content.replace('"title": "Chemical Balance Report"', '"title": "Balance Report"')
        m_content = m_content.replace('"title": "Chemical Payments List"', '"title": "Payments List"')

        with open(m_path, 'w', encoding='utf-8') as f:
            f.write(m_content)
        print(f"✓ Saved {m_path}")

    # 4. Update setupView.js
    setup_file = 'js/views/setupView.js'
    if os.path.exists(setup_file):
        with open(setup_file, 'r', encoding='utf-8') as f:
            setup_text = f.read()
        setup_text = setup_text.replace('"title": "Chemical Received Report"', '"title": "Received Report"')
        setup_text = setup_text.replace('"title": "Chemical Opening Balance Report"', '"title": "Opening Balance Report"')
        setup_text = setup_text.replace('"title": "Chemical Balance Report"', '"title": "Balance Report"')
        setup_text = setup_text.replace('"title": "Chemical Payments List"', '"title": "Payments List"')
        with open(setup_file, 'w', encoding='utf-8') as f:
            f.write(setup_text)
        print(f"✓ Verified titles in {setup_file}")

    # 5. Sidebar cache-busting guard
    sidebar_file = 'js/components/sidebar.js'
    if os.path.exists(sidebar_file):
        with open(sidebar_file, 'r', encoding='utf-8') as f:
            sb_text = f.read()
        if 'localStorage.removeItem(\'dfl_cached_submenus\');' not in sb_text:
            sb_text = "try { localStorage.removeItem('dfl_cached_submenus'); } catch (e) {}\n" + sb_text
            with open(sidebar_file, 'w', encoding='utf-8') as f:
                f.write(sb_text)
            print("✓ Added cache busting guard to sidebar.js")

if __name__ == '__main__':
    main()
