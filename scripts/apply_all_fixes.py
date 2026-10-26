#!/usr/bin/env python3
"""
Comprehensive script to:
1. Fix Pre-processing Dashboard clutter (clean KPI cards, 3-col grid, no multi-line noise).
2. Wire Add / Create / New and Edit buttons to open popup modals (Modal.open) and completely remove bottom inline cards.
3. Fix all search input fields with style="padding-left: 36px !important;" and centered pointer-events-none icons.
4. Ensure tab menu titles have no 'Chemical' prefix in the last four tabs and clear any legacy submenu cache.
"""

import os
import re

def main():
    filepath = 'js/views/preprocessingView.js'
    print(f"Reading {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # ----------------------------------------------------
    # 1. PRE-PROCESSING DASHBOARD DECLUTTERING
    # ----------------------------------------------------
    # Grid layout: change to 3 columns on desktop for spacious elegance
    old_grid = '<div id="preproc-kpi-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3"></div>'
    new_grid = '<div id="preproc-kpi-grid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"></div>'
    if old_grid in content:
        content = content.replace(old_grid, new_grid)
        print("✓ Updated preproc-kpi-grid layout to 3-column spacious grid")
    else:
        print("⚠️ Could not find old_grid")

    # Remove cluttering subtext lines from KPI cards
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
            print(f"✓ Removed clutter line: {cl[:40]}...")

    # ----------------------------------------------------
    # 2. SEARCH INPUT PADDING AND ICON WRAPPER FIXES
    # ----------------------------------------------------
    # Fix standard search inputs across preprocessingView.js
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
        # Match pattern:
        # <div class="relative w-full max-w-sm">
        #   <input type="text" id="<sid>" placeholder="Search..." class="w-full pl-9 pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
        #   <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        # </div>
        pattern = re.compile(
            r'(<div class="relative[^"]*">\s*)'
            rf'(<input type="text" id="{sid}" placeholder="Search\.\.\."\s+class="[^"]*"\s*>)\s*'
            r'(<svg class="w-4 h-4 text-\[#94A3B8\] absolute left-3 top-2\.5"[^>]*>.*?</svg>)\s*'
            r'(</div>)',
            re.DOTALL
        )
        def repl(m):
            div_start = m.group(1)
            return (
                f'{div_start}'
                f'  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">\n'
                f'    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>\n'
                f'  </div>\n'
                f'  <input type="text" id="{sid}" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">\n'
                f'</div>'
            )
        new_content, count = pattern.subn(repl, content)
        if count > 0:
            content = new_content
            print(f"✓ Fixed search input for #{sid}")
        else:
            # Try alternate matching in case classes or attributes differ slightly
            old_snip = f'id="{sid}" placeholder="Search..." class="w-full pl-9 pr-3'
            new_snip = f'id="{sid}" placeholder="Search..." style="padding-left: 36px !important;" class="w-full pr-3'
            if old_snip in content:
                content = content.replace(old_snip, new_snip)
                print(f"✓ Applied padding fallback to #{sid}")
            else:
                print(f"⚠️ Could not match search input for #{sid}")

    # ----------------------------------------------------
    # 3. TAB 1: CHEMICAL POS POPUP MODAL & REMOVE INLINE CARD
    # ----------------------------------------------------
    # Remove #cpo-create-card
    start_cpo_card = '        <!-- Create/Edit Form Card: GS CHEM PO CREATE (Matching Screenshot 2) -->'
    end_cpo_card = '        <!-- Lower Card: Register Table with Search & Excel Export (Matching Screenshot 1) -->'
    if start_cpo_card in content and end_cpo_card in content:
        cpo_idx1 = content.index(start_cpo_card)
        cpo_idx2 = content.index(end_cpo_card)
        content = content[:cpo_idx1] + content[cpo_idx2:]
        print("✓ Completely removed #cpo-create-card DOM")
    else:
        print("⚠️ Could not find boundaries for #cpo-create-card")

    # Wire btnAddPo in Tab 1
    old_cpo_add_listener = """    // Toggle GS CHEM PO CREATE card
    btnAddPo?.addEventListener('click', () => {
      createTitle.textContent = 'GS CHEM PO CREATE';
      editIdInput.value = '';
      createForm.reset();
      document.getElementById('cpo-create-podate').value = new Date().toISOString().slice(0, 10);
      createCard.classList.remove('hidden');
      createCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });"""
    new_cpo_add_listener = """    // Open GS CHEM PO CREATE popup modal
    btnAddPo?.addEventListener('click', () => {
      if (window.PreprocessingView && window.PreprocessingView.openChemPOModal) {
        window.PreprocessingView.openChemPOModal();
      }
    });"""
    if old_cpo_add_listener in content:
        content = content.replace(old_cpo_add_listener, new_cpo_add_listener)
        print("✓ Wired btnAddPo to window.PreprocessingView.openChemPOModal()")
    else:
        print("⚠️ Could not find old_cpo_add_listener")

    # Wire row edit in Tab 1
    # Replace edit button event listener in cpo
    old_cpo_edit = """      tbody.querySelectorAll('.cpo-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.chemicalPosList.find(x => x.id === id);
          if (!rec) return;
          createTitle.textContent = `GS CHEM PO EDIT - ${rec.poNo}`;
          editIdInput.value = rec.id;
          document.getElementById('cpo-create-supplier').value = rec.supplierName || 'All';
          document.getElementById('cpo-create-port').value = rec.portName || '';
          document.getElementById('cpo-create-mode').value = rec.modeOfImport || 'HSS';
          document.getElementById('cpo-create-pono').value = rec.poNo || '';
          document.getElementById('cpo-create-remarks').value = rec.remarks || '';
          
          if (rec.poDate && rec.poDate.includes('-')) {
            const parts = rec.poDate.split('-');
            if (parts[0].length === 2) {
              document.getElementById('cpo-create-podate').value = `${parts[2]}-${parts[1]}-${parts[0]}`;
            } else {
              document.getElementById('cpo-create-podate').value = rec.poDate;
            }
          }
          if (rec.etaDate && rec.etaDate.includes('-')) {
            const parts = rec.etaDate.split('-');
            if (parts[0].length === 2) {
              document.getElementById('cpo-create-etadate').value = `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
          }
          if (rec.etdDate && rec.etdDate.includes('-')) {
            const parts = rec.etdDate.split('-');
            if (parts[0].length === 2) {
              document.getElementById('cpo-create-etddate').value = `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
          }

          createCard.classList.remove('hidden');
          createCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      });"""
    new_cpo_edit = """      tbody.querySelectorAll('.cpo-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.chemicalPosList.find(x => x.id === id);
          if (!rec) return;
          if (window.PreprocessingView && window.PreprocessingView.openChemPOModal) {
            window.PreprocessingView.openChemPOModal(rec);
          }
        });
      });"""
    if old_cpo_edit in content:
        content = content.replace(old_cpo_edit, new_cpo_edit)
        print("✓ Wired cpo row edit to window.PreprocessingView.openChemPOModal(rec)")
    else:
        print("⚠️ Could not find old_cpo_edit")

    # ----------------------------------------------------
    # 4. TAB 2: RECEIVED CHEMICALS POPUP MODAL & REMOVE INLINE CARD
    # ----------------------------------------------------
    # Remove #rc-create-card
    start_rc_card = '        <!-- Create/Edit Form Card: GS CHEM ORDERS CREATE (Matching Screenshot 2) -->'
    end_rc_card = '        <!-- Lower Card: Register Table with Toolbar (Matching Screenshot 1) -->'
    if start_rc_card in content and end_rc_card in content:
        rc_idx1 = content.index(start_rc_card)
        rc_idx2 = content.index(end_rc_card)
        content = content[:rc_idx1] + content[rc_idx2:]
        print("✓ Completely removed #rc-create-card DOM")
    else:
        print("⚠️ Could not find boundaries for #rc-create-card")

    # Wire btnAddOrder in Tab 2
    old_rc_add_listener = """    // Toggle GS CHEM ORDERS CREATE card
    btnAddOrder?.addEventListener('click', () => {
      createTitle.textContent = 'GS CHEM ORDERS CREATE';
      editIdInput.value = '';
      createForm.reset();
      document.getElementById('rc-create-boedate').value = '2026-09-04';
      document.getElementById('rc-create-cleardate').value = '2026-09-04';
      createCard.classList.remove('hidden');
      createCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });"""
    new_rc_add_listener = """    // Open GS CHEM ORDERS CREATE popup modal
    btnAddOrder?.addEventListener('click', () => {
      if (window.PreprocessingView && window.PreprocessingView.openChemOrderModal) {
        window.PreprocessingView.openChemOrderModal();
      }
    });"""
    if old_rc_add_listener in content:
        content = content.replace(old_rc_add_listener, new_rc_add_listener)
        print("✓ Wired btnAddOrder to window.PreprocessingView.openChemOrderModal()")
    else:
        print("⚠️ Could not find old_rc_add_listener")

    # Wire row edit in Tab 2
    old_rc_edit = """      tbody.querySelectorAll('.rc-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.receivedChemicalsList.find(x => x.id === id);
          if (!rec) return;
          createTitle.textContent = `GS CHEM ORDERS EDIT - ${rec.poNo}`;
          editIdInput.value = rec.id;
          document.getElementById('rc-create-plant').value = rec.plant || 'VSP-DFL UNIT-1 (VSP)';
          document.getElementById('rc-create-pono').value = rec.poNo || 'All';
          document.getElementById('rc-create-chem').value = rec.chemical || '';
          document.getElementById('rc-create-blno').value = rec.blNo || '';
          document.getElementById('rc-create-containerno').value = rec.containerNo || '';
          document.getElementById('rc-create-bags').value = rec.receivedBags || '';
          document.getElementById('rc-create-qty').value = rec.receivedQty || '';
          document.getElementById('rc-create-boeno').value = rec.boeNo || '';

          // Format date to yyyy-mm-dd for input[type=date]
          if (rec.boeDate && rec.boeDate.includes('-')) {
            const parts = rec.boeDate.split('-');
            if (parts[0].length === 2) {
              document.getElementById('rc-create-boedate').value = `${parts[2]}-${parts[1]}-${parts[0]}`;
            } else {
              document.getElementById('rc-create-boedate').value = rec.boeDate;
            }
          }
          if (rec.clearedDate && rec.clearedDate.includes('-')) {
            const parts = rec.clearedDate.split('-');
            if (parts[0].length === 2) {
              document.getElementById('rc-create-cleardate').value = `${parts[2]}-${parts[1]}-${parts[0]}`;
            } else {
              document.getElementById('rc-create-cleardate').value = rec.clearedDate;
            }
          }

          createCard.classList.remove('hidden');
          createCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      });"""
    new_rc_edit = """      tbody.querySelectorAll('.rc-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.receivedChemicalsList.find(x => x.id === id);
          if (!rec) return;
          if (window.PreprocessingView && window.PreprocessingView.openChemOrderModal) {
            window.PreprocessingView.openChemOrderModal(rec);
          }
        });
      });"""
    if old_rc_edit in content:
        content = content.replace(old_rc_edit, new_rc_edit)
        print("✓ Wired rc row edit to window.PreprocessingView.openChemOrderModal(rec)")
    else:
        print("⚠️ Could not find old_rc_edit")

    # ----------------------------------------------------
    # 5. TAB 3: CHEMICALS CONSUMPTION POPUP MODAL & REMOVE INLINE CARD
    # ----------------------------------------------------
    # Remove #cc-create-card
    start_cc_card = '        <!-- Create/Edit Form Card: GS CHEM CONSUMPTION CREATE (Matching Screenshot 2) -->'
    end_cc_card = '        <!-- Lower Card: Register Table with Search & Excel Export (Matching Screenshot 1) -->'
    if start_cc_card in content and end_cc_card in content:
        cc_idx1 = content.index(start_cc_card)
        cc_idx2 = content.index(end_cc_card)
        content = content[:cc_idx1] + content[cc_idx2:]
        print("✓ Completely removed #cc-create-card DOM")
    else:
        print("⚠️ Could not find boundaries for #cc-create-card")

    # Wire btnAddConsumption in Tab 3
    old_cc_add_listener = """    // Toggle Create Card
    btnAddConsumption?.addEventListener('click', () => {
      createForm.reset();
      document.getElementById('cc-create-date').value = new Date().toISOString().slice(0, 10);
      createCard.classList.remove('hidden');
      createCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });"""
    new_cc_add_listener = """    // Open GS CHEM CONSUMPTION CREATE popup modal
    btnAddConsumption?.addEventListener('click', () => {
      if (window.PreprocessingView && window.PreprocessingView.openChemConsumptionModal) {
        window.PreprocessingView.openChemConsumptionModal();
      }
    });"""
    if old_cc_add_listener in content:
        content = content.replace(old_cc_add_listener, new_cc_add_listener)
        print("✓ Wired btnAddConsumption to window.PreprocessingView.openChemConsumptionModal()")
    else:
        print("⚠️ Could not find old_cc_add_listener")

    # ----------------------------------------------------
    # 6. TAB 7: CHEMICAL PAYMENTS LIST POPUP MODAL & REMOVE INLINE CARD
    # ----------------------------------------------------
    # Remove #cp-create-card
    start_cp_card = '        <!-- Create/Edit Form Card: GS CHEM PO PAYMENT CREATE (Matching Screenshot 5) -->'
    end_cp_card = '        <!-- Lower Card: Table with Toolbar (Matching Screenshot 4) -->'
    if start_cp_card in content and end_cp_card in content:
        cp_idx1 = content.index(start_cp_card)
        cp_idx2 = content.index(end_cp_card)
        content = content[:cp_idx1] + content[cp_idx2:]
        print("✓ Completely removed #cp-create-card DOM")
    else:
        print("⚠️ Could not find boundaries for #cp-create-card")

    # Wire btnAddPayment in Tab 7
    old_cp_add_listener = """    btnAddPayment?.addEventListener('click', () => {
      createTitle.textContent = 'GS CHEM PO PAYMENT CREATE';
      editIdInput.value = '';
      createForm.reset();
      document.getElementById('cp-create-date').value = new Date().toISOString().slice(0, 10);
      createCard.classList.remove('hidden');
      createCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });"""
    new_cp_add_listener = """    // Open GS CHEM PO PAYMENT CREATE popup modal
    btnAddPayment?.addEventListener('click', () => {
      if (window.PreprocessingView && window.PreprocessingView.openChemPaymentModal) {
        window.PreprocessingView.openChemPaymentModal();
      }
    });"""
    if old_cp_add_listener in content:
        content = content.replace(old_cp_add_listener, new_cp_add_listener)
        print("✓ Wired btnAddPayment to window.PreprocessingView.openChemPaymentModal()")
    else:
        print("⚠️ Could not find old_cp_add_listener")

    # Wire row edit in Tab 7
    old_cp_edit = """      tbody.querySelectorAll('.cp-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.chemicalPaymentsList.find(x => x.id === id);
          if (!rec) return;
          createTitle.textContent = `GS CHEM PO PAYMENT EDIT - ${rec.poNo}`;
          editIdInput.value = rec.id;
          document.getElementById('cp-create-pono').value = rec.poNo || 'All';
          document.getElementById('cp-create-chem').value = rec.chemicalName || '';
          document.getElementById('cp-create-party').value = rec.partyName || '';
          document.getElementById('cp-create-qty').value = rec.receivedQty || '';
          document.getElementById('cp-create-amount').value = rec.amount || '';
          document.getElementById('cp-create-bankref').value = rec.bankRefNo || '';
          document.getElementById('cp-create-date').value = rec.paymentDate || '2025-10-24';
          document.getElementById('cp-create-remarks').value = rec.remarks || '';
          createCard.classList.remove('hidden');
          createCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      });"""
    new_cp_edit = """      tbody.querySelectorAll('.cp-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.chemicalPaymentsList.find(x => x.id === id);
          if (!rec) return;
          if (window.PreprocessingView && window.PreprocessingView.openChemPaymentModal) {
            window.PreprocessingView.openChemPaymentModal(rec);
          }
        });
      });"""
    if old_cp_edit in content:
        content = content.replace(old_cp_edit, new_cp_edit)
        print("✓ Wired cp row edit to window.PreprocessingView.openChemPaymentModal(rec)")
    else:
        print("⚠️ Could not find old_cp_edit")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ Saved updated {filepath}")

    # ----------------------------------------------------
    # 7. UPDATE setupView.js AND sidebar.js CACHE CLEARING
    # ----------------------------------------------------
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

    # Add cache clearing to sidebar init if any old cache exists
    sidebar_file = 'js/components/sidebar.js'
    if os.path.exists(sidebar_file):
        with open(sidebar_file, 'r', encoding='utf-8') as f:
            sb_text = f.read()
        # Ensure any old cached submenu keys in localStorage are purged on page init
        if 'localStorage.removeItem(\'dfl_cached_submenus\');' not in sb_text:
            sb_text = "try { localStorage.removeItem('dfl_cached_submenus'); } catch (e) {}\n" + sb_text
            with open(sidebar_file, 'w', encoding='utf-8') as f:
                f.write(sb_text)
            print("✓ Added cache busting guard to sidebar.js")

if __name__ == '__main__':
    main()
