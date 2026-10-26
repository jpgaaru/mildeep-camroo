"""
Implement Popup Modals for Pre-Processing Add/Create/New buttons and
update the last 4 chemical tab menu titles to remove the word 'Chemical'.

Target Files:
- js/components/sidebar.js
- js/views/preprocessingView.js
- standalone.html
- miledeep-devi-fisheries.html
"""

import re
import sys

def update_sidebar_tabs():
    for fpath in ['js/components/sidebar.js', 'standalone.html', 'miledeep-devi-fisheries.html']:
        print(f"Updating tab labels in {fpath}...")
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Update sidebar label from "Chemical Received Report" to "Received Report"
        content = content.replace('label: "Chemical Received Report"', 'label: "Received Report"')
        content = content.replace('label: "Chemical Opening Balance Report"', 'label: "Opening Balance Report"')
        content = content.replace('label: "Chemical Balance Report"', 'label: "Balance Report"')
        content = content.replace('label: "Chemical Payments List"', 'label: "Payments List"')

        # Also in standalone / miledeep if single quotes or JSON
        content = content.replace('"title": "Chemical Received Report"', '"title": "Received Report"')
        content = content.replace('"title": "Chemical Opening Balance Report"', '"title": "Opening Balance Report"')
        content = content.replace('"title": "Chemical Balance Report"', '"title": "Balance Report"')
        content = content.replace('"title": "Chemical Payments List"', '"title": "Payments List"')

        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Tab menu labels updated in {fpath}")

def update_preprocessing_screens():
    target_files = [
        'js/views/preprocessingView.js',
        'standalone.html',
        'miledeep-devi-fisheries.html'
    ]

    for fpath in target_files:
        print(f"\nUpdating {fpath} for popup modals and tab titles...")
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()

        # 1. Update page titles in Tabs 4-7: remove word "CHEMICAL"
        content = content.replace('>CHEMICAL RECEIVED REPORT<', '>RECEIVED REPORT<')
        content = content.replace('>CHEMICAL OPENING BALANCE REPORT<', '>OPENING BALANCE REPORT<')
        content = content.replace('>CHEMICAL BALANCE REPORT<', '>BALANCE REPORT<')
        content = content.replace('>CHEMICAL PAYMENTS LIST<', '>PAYMENTS LIST<')

        # 2. TAB 1 (Chemical Pos): Remove inline bottom card #cpo-create-card and wire button to openChemPOModal
        # Find and remove #cpo-create-card
        cpo_card_pattern = r'<!-- Create/Edit Form Card: GS CHEM PO CREATE \(Matching Screenshot 2\) -->\s*<div id="cpo-create-card"[\s\S]*?</div>\s*</form>\s*</div>'
        content = re.sub(cpo_card_pattern, '', content)

        # Wire btnAddPo and edit button to call openChemPOModal
        # Replace inline card manipulation in renderChemicalPos
        old_cpo_handlers = r'''    const btnAddPo = document.getElementById\('cpo-btn-add-po'\);
    const btnCloseForm = document.getElementById\('cpo-form-close'\);
    const btnCloseX = document.getElementById\('cpo-card-close-x'\);
    const btnExportExcel = document.getElementById\('cpo-btn-export-excel'\);
    const createCard = document.getElementById\('cpo-create-card'\);'''

        new_cpo_handlers = '''    const btnAddPo = document.getElementById('cpo-btn-add-po');
    const btnExportExcel = document.getElementById('cpo-btn-export-excel');'''
        content = re.sub(old_cpo_handlers, new_cpo_handlers, content)

        # Replace btnAddPo click listener
        old_cpo_btn_add = r'''    btnAddPo\?\.addEventListener\('click', \(\) => \{
      document\.getElementById\('cpo-create-title'\)\.textContent = 'GS CHEM PO CREATE';
      document\.getElementById\('cpo-create-form'\)\.reset\(\);
      document\.getElementById\('cpo-edit-id'\)\.value = '';
      createCard\.classList\.remove\('hidden'\);
      createCard\.scrollIntoView\(\{ behavior: 'smooth', block: 'nearest' \}\);
    \}\);'''
        new_cpo_btn_add = '''    btnAddPo?.addEventListener('click', () => {
      this.openChemPOModal();
    });'''
        content = re.sub(old_cpo_btn_add, new_cpo_btn_add, content)

        # Replace cpo-action-edit listener
        old_cpo_edit = r'''        btn\.addEventListener\('click', \(e\) => \{
          const id = e\.currentTarget\.getAttribute\('data-id'\);
          const r = this\.chemicalPosList\.find\(x => x\.id === id\);
          if \(!r\) return;
          document\.getElementById\('cpo-create-title'\)\.textContent = 'GS CHEM PO EDIT';
          document\.getElementById\('cpo-edit-id'\)\.value = r\.id;
          document\.getElementById\('cpo-create-pono'\)\.value = r\.poNo || '';
          document\.getElementById\('cpo-create-supplier'\)\.value = r\.supplierName || '';
          document\.getElementById\('cpo-create-chemical'\)\.value = r\.chemicals || 'ALTESA NEO S100 \(NP\)';
          document\.getElementById\('cpo-create-port'\)\.value = r\.portName || 'INPRT - PARADIP GARH';
          document\.getElementById\('cpo-create-qty-bags'\)\.value = r\.qtyBags || '';
          document\.getElementById\('cpo-create-qty-kgs'\)\.value = r\.qtyKgs || '';
          document\.getElementById\('cpo-create-amount'\)\.value = r\.totalAmount || '';
          document\.getElementById\('cpo-create-remarks'\)\.value = r\.remarks || '';
          createCard\.classList\.remove\('hidden'\);
          createCard\.scrollIntoView\(\{ behavior: 'smooth', block: 'nearest' \}\);
        \}\);'''
        new_cpo_edit = '''        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const r = this.chemicalPosList.find(x => x.id === id);
          if (!r) return;
          this.openChemPOModal(r);
        });'''
        content = re.sub(old_cpo_edit, new_cpo_edit, content)

        # Remove old cpo-create-form submit & hideCreateCard logic if present
        old_cpo_submit_pattern = r'    const hideCreateCard = \(\) => \{[\s\S]*?renderTable\(tableSearch\?\.value \|\| \'\'\);\s*\}\);'
        new_cpo_submit = '''    // Handlers wired to Modal popup system'''
        content = re.sub(old_cpo_submit_pattern, new_cpo_submit, content)

        # 3. TAB 2 (Received Chemicals): Remove inline bottom card #rc-create-card and wire button to openChemOrderModal
        rc_card_pattern = r'<!-- Create/Edit Form Card: GS CHEM ORDERS CREATE \(Matching Screenshot 2\) -->\s*<div id="rc-create-card"[\s\S]*?</div>\s*</form>\s*</div>'
        content = re.sub(rc_card_pattern, '', content)

        old_rc_handlers = r'''    const btnAddOrder = document.getElementById\('rc-btn-add-order'\);
    const btnCloseForm = document.getElementById\('rc-form-close'\);
    const btnCloseX = document.getElementById\('rc-card-close-x'\);
    const btnExportExcel = document.getElementById\('rc-btn-export-excel'\);
    const createCard = document.getElementById\('rc-create-card'\);'''
        new_rc_handlers = '''    const btnAddOrder = document.getElementById('rc-btn-add-order');
    const btnExportExcel = document.getElementById('rc-btn-export-excel');'''
        content = re.sub(old_rc_handlers, new_rc_handlers, content)

        old_rc_btn_add = r'''    btnAddOrder\?\.addEventListener\('click', \(\) => \{
      document\.getElementById\('rc-create-title'\)\.textContent = 'GS CHEM ORDERS CREATE';
      document\.getElementById\('rc-create-form'\)\.reset\(\);
      document\.getElementById\('rc-edit-id'\)\.value = '';
      createCard\.classList\.remove\('hidden'\);
      createCard\.scrollIntoView\(\{ behavior: 'smooth', block: 'nearest' \}\);
    \}\);'''
        new_rc_btn_add = '''    btnAddOrder?.addEventListener('click', () => {
      this.openChemOrderModal();
    });'''
        content = re.sub(old_rc_btn_add, new_rc_btn_add, content)

        old_rc_edit = r'''        btn\.addEventListener\('click', \(e\) => \{
          const id = e\.currentTarget\.getAttribute\('data-id'\);
          const r = this\.receivedChemicalsList\.find\(x => x\.id === id\);
          if \(!r\) return;
          document\.getElementById\('rc-create-title'\)\.textContent = 'GS CHEM ORDERS EDIT';
          document\.getElementById\('rc-edit-id'\)\.value = r\.id;
          document\.getElementById\('rc-create-plant'\)\.value = r\.plant || 'VSP-DFL UNIT-1 \(VSP\)';
          document\.getElementById\('rc-create-pono'\)\.value = r\.poNo || '';
          document\.getElementById\('rc-create-blno'\)\.value = r\.blNo || '';
          document\.getElementById\('rc-create-container'\)\.value = r\.containerNo || '';
          document\.getElementById\('rc-create-recv-bags'\)\.value = r\.receivedBags || '';
          document\.getElementById\('rc-create-recv-qty'\)\.value = r\.receivedQty || '';
          document\.getElementById\('rc-create-boe-no'\)\.value = r\.boeNo || '';
          document\.getElementById\('rc-create-boe-date'\)\.value = r\.boeDate || '';
          document\.getElementById\('rc-create-cleared-date'\)\.value = r\.clearedDate || '';
          document\.getElementById\('rc-create-status'\)\.value = r\.status || 'PENDING';
          createCard\.classList\.remove\('hidden'\);
          createCard\.scrollIntoView\(\{ behavior: 'smooth', block: 'nearest' \}\);
        \}\);'''
        new_rc_edit = '''        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const r = this.receivedChemicalsList.find(x => x.id === id);
          if (!r) return;
          this.openChemOrderModal(r);
        });'''
        content = re.sub(old_rc_edit, new_rc_edit, content)

        old_rc_submit_pattern = r'    const hideCreateCard = \(\) => \{[\s\S]*?renderTable\(tableSearch\?\.value \|\| \'\'\);\s*\}\);'
        content = re.sub(old_rc_submit_pattern, new_cpo_submit, content)

        # 4. TAB 3 (Chemicals Consumption): Remove inline bottom card #cc-create-card and wire button to openChemConsumptionModal
        cc_card_pattern = r'<!-- Create/Edit Form Card: GS CHEM CONSUMPTION CREATE \(Matching Screenshot 2\) -->\s*<div id="cc-create-card"[\s\S]*?</div>\s*</form>\s*</div>'
        content = re.sub(cc_card_pattern, '', content)

        old_cc_handlers = r'''    const btnAddConsumption = document.getElementById\('cc-btn-add-consumption'\);
    const btnCloseForm = document.getElementById\('cc-form-close'\);
    const btnCloseX = document.getElementById\('cc-card-close-x'\);
    const btnExportExcel = document.getElementById\('cc-btn-export-excel'\);
    const createCard = document.getElementById\('cc-create-card'\);'''
        new_cc_handlers = '''    const btnAddConsumption = document.getElementById('cc-btn-add-consumption');
    const btnExportExcel = document.getElementById('cc-btn-export-excel');'''
        content = re.sub(old_cc_handlers, new_cc_handlers, content)

        old_cc_btn_add = r'''    btnAddConsumption\?\.addEventListener\('click', \(\) => \{
      document\.getElementById\('cc-create-title'\)\.textContent = 'GS CHEM CONSUMPTION CREATE';
      document\.getElementById\('cc-create-form'\)\.reset\(\);
      document\.getElementById\('cc-edit-id'\)\.value = '';
      createCard\.classList\.remove\('hidden'\);
      createCard\.scrollIntoView\(\{ behavior: 'smooth', block: 'nearest' \}\);
    \}\);'''
        new_cc_btn_add = '''    btnAddConsumption?.addEventListener('click', () => {
      this.openChemConsumptionModal();
    });'''
        content = re.sub(old_cc_btn_add, new_cc_btn_add, content)

        old_cc_submit_pattern = r'    const hideCreateCard = \(\) => \{[\s\S]*?renderTable\(tableSearch\?\.value \|\| \'\'\);\s*\}\);'
        content = re.sub(old_cc_submit_pattern, new_cpo_submit, content)

        # 5. TAB 7 (Chemical Payments List): Remove inline bottom card #cp-create-card and wire button to openChemPaymentModal
        cp_card_pattern = r'<!-- Create/Edit Form Card: GS CHEM PO PAYMENT CREATE \(Matching Screenshot 4\) -->\s*<div id="cp-create-card"[\s\S]*?</div>\s*</form>\s*</div>'
        content = re.sub(cp_card_pattern, '', content)

        old_cp_handlers = r'''    const btnAddPayment = document.getElementById\('cp-btn-add-payment'\);
    const btnCloseForm = document.getElementById\('cp-form-close'\);
    const btnCloseX = document.getElementById\('cp-card-close-x'\);
    const btnExportExcel = document.getElementById\('cp-btn-export-excel'\);
    const createCard = document.getElementById\('cp-create-card'\);'''
        new_cp_handlers = '''    const btnAddPayment = document.getElementById('cp-btn-add-payment');
    const btnExportExcel = document.getElementById('cp-btn-export-excel');'''
        content = re.sub(old_cp_handlers, new_cp_handlers, content)

        old_cp_btn_add = r'''    btnAddPayment\?\.addEventListener\('click', \(\) => \{
      document\.getElementById\('cp-create-title'\)\.textContent = 'GS CHEM PO PAYMENT CREATE';
      document\.getElementById\('cp-create-form'\)\.reset\(\);
      document\.getElementById\('cp-edit-id'\)\.value = '';
      createCard\.classList\.remove\('hidden'\);
      createCard\.scrollIntoView\(\{ behavior: 'smooth', block: 'nearest' \}\);
    \}\);'''
        new_cp_btn_add = '''    btnAddPayment?.addEventListener('click', () => {
      this.openChemPaymentModal();
    });'''
        content = re.sub(old_cp_btn_add, new_cp_btn_add, content)

        old_cp_edit = r'''        btn\.addEventListener\('click', \(e\) => \{
          const id = e\.currentTarget\.getAttribute\('data-id'\);
          const r = this\.chemicalPaymentsList\.find\(x => x\.id === id\);
          if \(!r\) return;
          document\.getElementById\('cp-create-title'\)\.textContent = 'GS CHEM PO PAYMENT EDIT';
          document\.getElementById\('cp-edit-id'\)\.value = r\.id;
          document\.getElementById\('cp-create-pono'\)\.value = r\.poNo || '';
          document\.getElementById\('cp-create-chem'\)\.value = r\.chemicalName || '';
          document\.getElementById\('cp-create-party'\)\.value = r\.partyName || '';
          document\.getElementById\('cp-create-recv-qty'\)\.value = r\.receivedQty || '';
          document\.getElementById\('cp-create-amt'\)\.value = r\.amount || '';
          document\.getElementById\('cp-create-paid-amt'\)\.value = r\.paidAmount || '';
          document\.getElementById\('cp-create-bankref'\)\.value = r\.bankRefNo || '';
          document\.getElementById\('cp-create-date'\)\.value = r\.paymentDate || '';
          document\.getElementById\('cp-create-remarks'\)\.value = r\.remarks || '';
          createCard\.classList\.remove\('hidden'\);
          createCard\.scrollIntoView\(\{ behavior: 'smooth', block: 'nearest' \}\);
        \}\);'''
        new_cp_edit = '''        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const r = this.chemicalPaymentsList.find(x => x.id === id);
          if (!r) return;
          this.openChemPaymentModal(r);
        });'''
        content = re.sub(old_cp_edit, new_cp_edit, content)

        old_cp_submit_pattern = r'    const hideCreateCard = \(\) => \{[\s\S]*?renderTable\(tableSearch\?\.value \|\| \'\'\);\s*\}\);'
        content = re.sub(old_cp_submit_pattern, new_cpo_submit, content)

        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Screen markup and handlers updated in {fpath}")

def implement_interactive_modals():
    target_files = [
        'js/views/preprocessingView.js',
        'standalone.html',
        'miledeep-devi-fisheries.html'
    ]

    modal_implementations = '''  // ============================================
  // INTERACTIVE POPUP MODALS FOR INPUT TAKING
  // ============================================
  openChemPOModal(editItem = null) {
    const isEdit = Boolean(editItem);
    const m = typeof Modal !== 'undefined' ? Modal : window.Modal;
    if (!m) return;

    m.open({
      title: isEdit ? 'GS CHEM PO EDIT' : 'GS CHEM PO CREATE',
      size: 'lg',
      content: `
        <div class="modal-breadcrumb text-xs text-slate-500 mb-3">Chemical Screens / Chemical Pos / ${isEdit ? 'Edit PO' : 'Create PO'}</div>
        <form id="modal-cpo-form" class="space-y-4">
          <input type="hidden" id="modal-cpo-id" value="${editItem?.id || ''}">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PROCESSING PLANT <span class="text-red-500 font-bold">*</span></label>
              <select id="modal-cpo-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="All">All</option>
                <option value="VSP-DFL UNIT-1 (VSP)" ${editItem?.plant === 'VSP-DFL UNIT-1 (VSP)' ? 'selected' : ''}>VSP-DFL UNIT-1 (VSP)</option>
                <option value="KKD-DFL UNIT-2 (KKD)" ${editItem?.plant === 'KKD-DFL UNIT-2 (KKD)' ? 'selected' : ''}>KKD-DFL UNIT-2 (KKD)</option>
                <option value="PSP-DFL UNIT-3 (PSP)" ${editItem?.plant === 'PSP-DFL UNIT-3 (PSP)' ? 'selected' : ''}>PSP-DFL UNIT-3 (PSP)</option>
                <option value="JPT-DFL UNIT-5 (JPT)" ${editItem?.plant === 'JPT-DFL UNIT-5 (JPT)' ? 'selected' : ''}>JPT-DFL UNIT-5 (JPT)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ENTER PO NO <span class="text-red-500 font-bold">*</span></label>
              <input type="text" id="modal-cpo-pono" value="${editItem?.poNo || 'DFL/KPL/2627/005'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PO DATE</label>
              <input type="date" id="modal-cpo-podate" value="${editItem?.poDate || '2026-10-26'}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SUPPLIER NAME <span class="text-red-500 font-bold">*</span></label>
              <input type="text" id="modal-cpo-supplier" value="${editItem?.supplierName || 'KPL INTERNATIONAL LTD'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CHEMICALS <span class="text-red-500 font-bold">*</span></label>
              <select id="modal-cpo-chem" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="ALTESA NEO S100 (NP)" ${editItem?.chemicals === 'ALTESA NEO S100 (NP)' ? 'selected' : ''}>ALTESA NEO S100 (NP)</option>
                <option value="CARNAL 659 S ADVANCED (STPP)" ${editItem?.chemicals === 'CARNAL 659 S ADVANCED (STPP)' ? 'selected' : ''}>CARNAL 659 S ADVANCED (STPP)</option>
                <option value="CARFOSEL B 940 (STPP)" ${editItem?.chemicals === 'CARFOSEL B 940 (STPP)' ? 'selected' : ''}>CARFOSEL B 940 (STPP)</option>
                <option value="BEKAPLUS FS (BLEND)" ${editItem?.chemicals === 'BEKAPLUS FS (BLEND)' ? 'selected' : ''}>BEKAPLUS FS (BLEND)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PORT OF IMPORT</label>
              <select id="modal-cpo-port" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="INPRT - PARADIP GARH" ${editItem?.portName === 'INPRT - PARADIP GARH' ? 'selected' : ''}>INPRT - PARADIP GARH</option>
                <option value="INKAK1 - KAKINADA" ${editItem?.portName === 'INKAK1 - KAKINADA' ? 'selected' : ''}>INKAK1 - KAKINADA</option>
                <option value="INVTZ1 - VISAKHAPATNAM" ${editItem?.portName === 'INVTZ1 - VISAKHAPATNAM' ? 'selected' : ''}>INVTZ1 - VISAKHAPATNAM</option>
                <option value="INMAA1 - CHENNAI" ${editItem?.portName === 'INMAA1 - CHENNAI' ? 'selected' : ''}>INMAA1 - CHENNAI</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">MODE OF IMPORT</label>
              <select id="modal-cpo-mode" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="HSS" ${editItem?.modeOfImport === 'HSS' ? 'selected' : ''}>HSS</option>
                <option value="HSS_BOND" ${editItem?.modeOfImport === 'HSS_BOND' ? 'selected' : ''}>HSS_BOND</option>
                <option value="DIRECT IMPORT" ${editItem?.modeOfImport === 'DIRECT IMPORT' ? 'selected' : ''}>DIRECT IMPORT</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">QUANTITY (BAGS) <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-cpo-bags" value="${editItem?.qtyBags || '300'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">QUANTITY (KGS) <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-cpo-kgs" value="${editItem?.qtyKgs || '7500'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">TOTAL AMOUNT (₹) <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-cpo-amount" value="${editItem?.totalAmount || '1250000'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ETD DATE</label>
              <input type="date" id="modal-cpo-etd" value="${editItem?.etdDate || '2026-10-30'}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">ETA DATE</label>
              <input type="date" id="modal-cpo-eta" value="${editItem?.etaDate || '2026-11-15'}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REMARKS</label>
            <input type="text" id="modal-cpo-remarks" value="${editItem?.remarks || ''}" placeholder="Enter remarks" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div class="flex justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
            <button type="button" class="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer">💾 Save PO</button>
          </div>
        </form>
      `
    });

    document.getElementById('modal-cpo-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const idVal = document.getElementById('modal-cpo-id')?.value;
      const pono = document.getElementById('modal-cpo-pono')?.value || 'DFL/2627/999';
      const supplier = document.getElementById('modal-cpo-supplier')?.value || '';
      const chem = document.getElementById('modal-cpo-chem')?.value || '';
      const port = document.getElementById('modal-cpo-port')?.value || '';
      const mode = document.getElementById('modal-cpo-mode')?.value || 'HSS';
      const bags = document.getElementById('modal-cpo-bags')?.value || '0';
      const kgs = document.getElementById('modal-cpo-kgs')?.value || '0';
      const amt = document.getElementById('modal-cpo-amount')?.value || '0';
      const etd = document.getElementById('modal-cpo-etd')?.value || '';
      const eta = document.getElementById('modal-cpo-eta')?.value || '';
      const remarks = document.getElementById('modal-cpo-remarks')?.value || '';

      if (idVal) {
        const idx = this.chemicalPosList.findIndex(x => x.id === idVal);
        if (idx !== -1) {
          this.chemicalPosList[idx] = { ...this.chemicalPosList[idx], poNo: pono, supplierName: supplier, chemicals: chem, portName: port, modeOfImport: mode, qtyBags: bags, qtyKgs: kgs, totalAmount: amt, etdDate: etd, etaDate: eta, remarks };
          if (window.Toast) window.Toast.show(`PO ${pono} updated successfully`, 'success');
        }
      } else {
        const newRecord = {
          id: 'CPO-' + String(Date.now()).slice(-6),
          sNo: this.chemicalPosList.length + 1,
          supplierName: supplier,
          poNo: pono,
          poDate: new Date().toISOString().slice(0, 10),
          chemicals: chem,
          portName: port,
          modeOfImport: mode,
          qtyBags: bags,
          qtyKgs: kgs,
          totalAmount: amt,
          etdDate: etd,
          etaDate: eta,
          remarks: remarks
        };
        this.chemicalPosList.unshift(newRecord);
        if (window.Toast) window.Toast.show(`PO ${pono} created successfully`, 'success');
      }

      Modal.close();
      const subContainer = document.getElementById('preprocessing-content');
      if (subContainer) this.renderChemicalPos(subContainer);
    });
  },

  openChemOrderModal(editItem = null) {
    const isEdit = Boolean(editItem);
    const m = typeof Modal !== 'undefined' ? Modal : window.Modal;
    if (!m) return;

    m.open({
      title: isEdit ? 'GS CHEM ORDERS EDIT' : 'GS CHEM ORDERS CREATE',
      size: 'lg',
      content: `
        <div class="modal-breadcrumb text-xs text-slate-500 mb-3">Chemical Screens / Received Chemicals / ${isEdit ? 'Edit Order' : 'Create Order'}</div>
        <form id="modal-rc-form" class="space-y-4">
          <input type="hidden" id="modal-rc-id" value="${editItem?.id || ''}">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PROCESSING PLANT <span class="text-red-500 font-bold">*</span></label>
              <select id="modal-rc-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="VSP-DFL UNIT-1 (VSP)" ${editItem?.plant === 'VSP-DFL UNIT-1 (VSP)' ? 'selected' : ''}>VSP-DFL UNIT-1 (VSP)</option>
                <option value="KKD-DFL UNIT-2 (KKD)" ${editItem?.plant === 'KKD-DFL UNIT-2 (KKD)' ? 'selected' : ''}>KKD-DFL UNIT-2 (KKD)</option>
                <option value="PSP-DFL UNIT-3 (PSP)" ${editItem?.plant === 'PSP-DFL UNIT-3 (PSP)' ? 'selected' : ''}>PSP-DFL UNIT-3 (PSP)</option>
                <option value="JPT-DFL UNIT-5 (JPT)" ${editItem?.plant === 'JPT-DFL UNIT-5 (JPT)' ? 'selected' : ''}>JPT-DFL UNIT-5 (JPT)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PONO <span class="text-red-500 font-bold">*</span></label>
              <input type="text" id="modal-rc-pono" value="${editItem?.poNo || 'DFL/CFB/2627/003'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BL NO</label>
              <input type="text" id="modal-rc-blno" value="${editItem?.blNo || ''}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CONTAINER NO</label>
              <input type="text" id="modal-rc-container" value="${editItem?.containerNo || ''}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">RECEIVED BAGS <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-rc-bags" value="${editItem?.receivedBags || '800'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">RECEIVED QTY IN KGS <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-rc-qty" value="${editItem?.receivedQty || '20000'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BILL OF ENTRY NO</label>
              <input type="text" id="modal-rc-boe-no" value="${editItem?.boeNo || ''}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BILL OF ENTRY DATE</label>
              <input type="date" id="modal-rc-boe-date" value="${editItem?.boeDate || '2026-08-23'}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CLEARED DATE</label>
              <input type="date" id="modal-rc-cleared-date" value="${editItem?.clearedDate || '2026-08-23'}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">STATUS</label>
              <select id="modal-rc-status" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="PENDING" ${editItem?.status === 'PENDING' ? 'selected' : ''}>PENDING</option>
                <option value="CLEARED" ${editItem?.status === 'CLEARED' ? 'selected' : ''}>CLEARED</option>
              </select>
            </div>
          </div>
          <div class="flex justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
            <button type="button" class="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer">💾 Save Order</button>
          </div>
        </form>
      `
    });

    document.getElementById('modal-rc-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const idVal = document.getElementById('modal-rc-id')?.value;
      const plant = document.getElementById('modal-rc-plant')?.value || 'VSP-DFL UNIT-1 (VSP)';
      const pono = document.getElementById('modal-rc-pono')?.value || '';
      const blno = document.getElementById('modal-rc-blno')?.value || '';
      const container = document.getElementById('modal-rc-container')?.value || '';
      const bags = parseInt(document.getElementById('modal-rc-bags')?.value) || 0;
      const qty = parseFloat(document.getElementById('modal-rc-qty')?.value) || 0;
      const boeNo = document.getElementById('modal-rc-boe-no')?.value || '';
      const boeDate = document.getElementById('modal-rc-boe-date')?.value || '';
      const clearedDate = document.getElementById('modal-rc-cleared-date')?.value || '';
      const status = document.getElementById('modal-rc-status')?.value || 'PENDING';

      if (idVal) {
        const idx = this.receivedChemicalsList.findIndex(x => x.id === idVal);
        if (idx !== -1) {
          this.receivedChemicalsList[idx] = { ...this.receivedChemicalsList[idx], plant, poNo: pono, blNo: blno, containerNo: container, receivedBags: bags, receivedQty: qty, boeNo, boeDate, clearedDate, status };
          if (window.Toast) window.Toast.show(`Dock order ${pono} updated`, 'success');
        }
      } else {
        const newRecord = {
          id: 'RC-' + String(Date.now()).slice(-6),
          sNo: this.receivedChemicalsList.length + 1,
          poNo: pono,
          chemical: 'CARNAL 659 S ADVANCED (STPP)',
          blNo: blno,
          containerNo: container,
          receivedBags: bags,
          receivedQty: qty,
          boeNo: boeNo,
          boeDate: boeDate,
          clearedDate: clearedDate,
          balanceBags: Math.max(0, 4000 - bags),
          balanceQty: Math.max(0, 100000 - qty),
          status: status,
          plant: plant,
          year: '2026-27'
        };
        this.receivedChemicalsList.unshift(newRecord);
        if (window.Toast) window.Toast.show(`Dock intake order ${pono} registered`, 'success');
      }

      Modal.close();
      const subContainer = document.getElementById('preprocessing-content');
      if (subContainer) this.renderReceivedChemicals(subContainer);
    });
  },

  openChemConsumptionModal(editItem = null) {
    const isEdit = Boolean(editItem);
    const m = typeof Modal !== 'undefined' ? Modal : window.Modal;
    if (!m) return;

    m.open({
      title: isEdit ? 'GS CHEM CONSUMPTION EDIT' : 'GS CHEM CONSUMPTION CREATE',
      size: 'lg',
      content: `
        <div class="modal-breadcrumb text-xs text-slate-500 mb-3">Chemical Screens / Chemicals Consumption / ${isEdit ? 'Edit Usage' : 'Log Daily Usage'}</div>
        <form id="modal-cc-form" class="space-y-4">
          <input type="hidden" id="modal-cc-id" value="${editItem?.id || ''}">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">DATE <span class="text-red-500 font-bold">*</span></label>
              <input type="date" id="modal-cc-date" value="${editItem?.date || new Date().toISOString().slice(0, 10)}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT NAME <span class="text-red-500 font-bold">*</span></label>
              <select id="modal-cc-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="DFL UNIT-5 (JPT)" selected>DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">USAGE TYPE</label>
              <select id="modal-cc-usage" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="Daily Floor Consumption" selected>Daily Floor Consumption</option>
                <option value="Tank Dosing">Tank Dosing</option>
                <option value="Interplant Sent">Interplant Sent</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CHEMICAL NAME <span class="text-red-500 font-bold">*</span></label>
              <select id="modal-cc-chem" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="CARNAL 659 S ADVANCED (STPP)" selected>CARNAL 659 S ADVANCED (STPP)</option>
                <option value="ALTESA NEO S100 (NP)">ALTESA NEO S100 (NP)</option>
                <option value="CARFOSEL B 940 (STPP)">CARFOSEL B 940 (STPP)</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BAGS QUANTITY <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-cc-bags" value="${editItem?.usedBags || '4'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">QUANTITY IN KGS <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-cc-kgs" value="${editItem?.usedKgs || '100'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">SEND TO</label>
              <input type="text" id="modal-cc-sendto" value="${editItem?.sendedTo || 'Chilled Bath Tank S-1'}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="flex justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
            <button type="button" class="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer">💾 Save Consumption</button>
          </div>
        </form>
      `
    });

    document.getElementById('modal-cc-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const dateVal = document.getElementById('modal-cc-date')?.value || new Date().toISOString().slice(0, 10);
      const chem = document.getElementById('modal-cc-chem')?.value || 'CARNAL 659 S ADVANCED (STPP)';
      const bags = parseInt(document.getElementById('modal-cc-bags')?.value) || 0;
      const kgs = parseFloat(document.getElementById('modal-cc-kgs')?.value) || 0;
      const sendto = document.getElementById('modal-cc-sendto')?.value || '';

      const newRecord = {
        id: 'CC-' + String(Date.now()).slice(-6),
        sNo: this.chemicalsConsumptionList.length + 1,
        date: dateVal,
        chemical: chem,
        receivedFrom: '',
        receivedBags: 0,
        receivedKgs: 0,
        sendedTo: sendto,
        sendedBags: 0,
        sendedKgs: 0,
        usedBags: bags,
        usedKgs: kgs,
        openingBags: 2751,
        openingKgs: 68775,
        closingBags: Math.max(0, 2751 - bags),
        closingKgs: Math.max(0, 68775 - kgs),
        plant: 'DFL UNIT-5 (JPT)'
      };
      this.chemicalsConsumptionList.unshift(newRecord);
      if (window.Toast) window.Toast.show('Chemical floor consumption recorded', 'success');

      Modal.close();
      const subContainer = document.getElementById('preprocessing-content');
      if (subContainer) this.renderChemicalsConsumption(subContainer);
    });
  },

  openChemPaymentModal(editItem = null) {
    const isEdit = Boolean(editItem);
    const m = typeof Modal !== 'undefined' ? Modal : window.Modal;
    if (!m) return;

    m.open({
      title: isEdit ? 'GS CHEM PO PAYMENT EDIT' : 'GS CHEM PO PAYMENT CREATE',
      size: 'lg',
      content: `
        <div class="modal-breadcrumb text-xs text-slate-500 mb-3">Chemical Screens / Payments List / ${isEdit ? 'Edit Payment' : 'Create Payment'}</div>
        <form id="modal-cp-form" class="space-y-4">
          <input type="hidden" id="modal-cp-id" value="${editItem?.id || ''}">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PONO <span class="text-red-500 font-bold">*</span></label>
              <input type="text" id="modal-cp-pono" value="${editItem?.poNo || 'DFL/KPL/2627/003'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">CHEMICAL NAME <span class="text-red-500 font-bold">*</span></label>
              <input type="text" id="modal-cp-chem" value="${editItem?.chemicalName || 'ALTESA NEO S100 (NP)'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PARTY NAME <span class="text-red-500 font-bold">*</span></label>
              <input type="text" id="modal-cp-party" value="${editItem?.partyName || 'KPL INTERNATIONAL LTD'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">RECIEVED QUANTITY (KGS) <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-cp-recv-qty" value="${editItem?.receivedQty || '4800'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">AMOUNT (RUPEES) <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-cp-amt" value="${editItem?.amount || '868800'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PAID AMOUNT (RUPEES) <span class="text-red-500 font-bold">*</span></label>
              <input type="number" id="modal-cp-paid-amt" value="${editItem?.paidAmount || '868800'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">BANK REFERENCE NO <span class="text-red-500 font-bold">*</span></label>
              <input type="text" id="modal-cp-bankref" value="${editItem?.bankRefNo || 'NEFT2627001'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PAYMENT DATE</label>
              <input type="date" id="modal-cp-date" value="${editItem?.paymentDate || '2026-10-26'}" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
            </div>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REMARKS</label>
            <input type="text" id="modal-cp-remarks" value="${editItem?.remarks || ''}" placeholder="Enter remarks" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div class="flex justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
            <button type="button" class="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer" onclick="Modal.close()">Close</button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer">💾 Save Payment</button>
          </div>
        </form>
      `
    });

    document.getElementById('modal-cp-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const idVal = document.getElementById('modal-cp-id')?.value;
      const pono = document.getElementById('modal-cp-pono')?.value || '';
      const chem = document.getElementById('modal-cp-chem')?.value || '';
      const party = document.getElementById('modal-cp-party')?.value || '';
      const qty = parseFloat(document.getElementById('modal-cp-recv-qty')?.value) || 0;
      const amt = parseFloat(document.getElementById('modal-cp-amt')?.value) || 0;
      const paidAmt = parseFloat(document.getElementById('modal-cp-paid-amt')?.value) || 0;
      const bankref = document.getElementById('modal-cp-bankref')?.value || '';
      const dateVal = document.getElementById('modal-cp-date')?.value || '';
      const remarks = document.getElementById('modal-cp-remarks')?.value || '';

      if (idVal) {
        const idx = this.chemicalPaymentsList.findIndex(x => x.id === idVal);
        if (idx !== -1) {
          this.chemicalPaymentsList[idx] = { ...this.chemicalPaymentsList[idx], poNo: pono, chemicalName: chem, partyName: party, receivedQty: qty, amount: amt, paidAmount: paidAmt, bankRefNo: bankref, paymentDate: dateVal, remarks };
          if (window.Toast) window.Toast.show(`Payment ${pono} updated successfully`, 'success');
        }
      } else {
        const newRecord = {
          id: 'CP-' + String(Date.now()).slice(-6),
          sNo: this.chemicalPaymentsList.length + 1,
          poNo: pono,
          chemicalName: chem,
          partyName: party,
          receivedQty: qty,
          amount: amt,
          paidAmount: paidAmt,
          bankRefNo: bankref,
          paymentDate: dateVal,
          remarks: remarks,
          status: 'Paid',
          supplier: party,
          year: '2026-27'
        };
        this.chemicalPaymentsList.unshift(newRecord);
        if (window.Toast) window.Toast.show(`Payment recorded for ${pono}`, 'success');
      }

      Modal.close();
      const subContainer = document.getElementById('preprocessing-content');
      if (subContainer) this.renderChemicalPaymentsList(subContainer);
    });
  }'''

    # Pattern to replace old stub methods at the bottom of PreprocessingView
    old_stubs_pattern = r'  openChemPOModal\(\)\s*\{[\s\S]*?openChemPaymentModal\(\)\s*\{[\s\S]*?\}\s*\n\};'
    new_bottom = modal_implementations + '\n};'

    for fpath in target_files:
        print(f"Injecting interactive modal popups into {fpath}...")
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()

        new_content, count = re.subn(old_stubs_pattern, new_bottom, content, count=1)
        if count == 0:
            print(f"  ❌ Could not replace modal stubs in {fpath}")
            sys.exit(1)
        else:
            print(f"  ✓ Successfully injected interactive popup modals into {fpath}")

        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)

def main():
    update_sidebar_tabs()
    update_preprocessing_screens()
    implement_interactive_modals()
    print("\nAll Pre-Processing popup modals implemented and tab names updated!")

if __name__ == '__main__':
    main()
