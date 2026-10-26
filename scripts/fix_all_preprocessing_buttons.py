#!/usr/bin/env python3
"""
Fixes all Add, New, Create buttons in Pre-processing to ensure popups open seamlessly
in all environments (module, standalone.html, miledeep-devi-fisheries.html, and Vercel production):
1. Expose window.PreprocessingView and window.Modal globally across all files.
2. In PreprocessingView methods, use `this.openChem*Modal()` directly instead of relying on `window.PreprocessingView`.
3. Add inline `onclick="(window.PreprocessingView || PreprocessingView).openChem*Modal()"` handlers to all Add/Create buttons as an immediate fallback.
4. Enhance Modal retrieval with robust fallback and error reporting.
"""

import os
import re

def fix_preprocessing_file(filepath):
    print(f"Processing {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update button tags with direct onclick handlers
    content = content.replace(
        '<button type="button" id="cpo-btn-add-po" class="',
        '<button type="button" id="cpo-btn-add-po" onclick="(window.PreprocessingView || PreprocessingView).openChemPOModal()" class="'
    )
    content = content.replace(
        '<button type="button" id="rc-btn-add-order" class="',
        '<button type="button" id="rc-btn-add-order" onclick="(window.PreprocessingView || PreprocessingView).openChemOrderModal()" class="'
    )
    content = content.replace(
        '<button type="button" id="cc-btn-add-consumption" class="',
        '<button type="button" id="cc-btn-add-consumption" onclick="(window.PreprocessingView || PreprocessingView).openChemConsumptionModal()" class="'
    )
    content = content.replace(
        '<button type="button" id="cp-btn-add-payment" class="',
        '<button type="button" id="cp-btn-add-payment" onclick="(window.PreprocessingView || PreprocessingView).openChemPaymentModal()" class="'
    )
    # Dashboard create button
    content = content.replace(
        'onclick="window.PreprocessingView.openChemPOModal()"',
        'onclick="(window.PreprocessingView || PreprocessingView).openChemPOModal()"'
    )

    # 2. Update event listeners in JS to call `this.open*` directly
    # cpo Add
    old_cpo_add = """btnAddPo?.addEventListener('click', () => {
      if (window.PreprocessingView && window.PreprocessingView.openChemPOModal) {
        window.PreprocessingView.openChemPOModal();
      }
    });"""
    new_cpo_add = """btnAddPo?.addEventListener('click', () => {
      if (typeof this !== 'undefined' && this.openChemPOModal) {
        this.openChemPOModal();
      } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemPOModal) {
        PreprocessingView.openChemPOModal();
      } else if (window.PreprocessingView && window.PreprocessingView.openChemPOModal) {
        window.PreprocessingView.openChemPOModal();
      }
    });"""
    content = content.replace(old_cpo_add, new_cpo_add)

    # cpo Edit
    old_cpo_edit = """tbody.querySelectorAll('.cpo-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.chemicalPosList.find(x => x.id === id);
          if (!rec) return;
          if (window.PreprocessingView && window.PreprocessingView.openChemPOModal) {
            window.PreprocessingView.openChemPOModal(rec);
          }
        });
      });"""
    new_cpo_edit = """tbody.querySelectorAll('.cpo-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.chemicalPosList.find(x => x.id === id);
          if (!rec) return;
          if (typeof this !== 'undefined' && this.openChemPOModal) {
            this.openChemPOModal(rec);
          } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemPOModal) {
            PreprocessingView.openChemPOModal(rec);
          } else if (window.PreprocessingView && window.PreprocessingView.openChemPOModal) {
            window.PreprocessingView.openChemPOModal(rec);
          }
        });
      });"""
    content = content.replace(old_cpo_edit, new_cpo_edit)

    # rc Add
    old_rc_add = """btnAddOrder?.addEventListener('click', () => {
      if (window.PreprocessingView && window.PreprocessingView.openChemOrderModal) {
        window.PreprocessingView.openChemOrderModal();
      }
    });"""
    new_rc_add = """btnAddOrder?.addEventListener('click', () => {
      if (typeof this !== 'undefined' && this.openChemOrderModal) {
        this.openChemOrderModal();
      } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemOrderModal) {
        PreprocessingView.openChemOrderModal();
      } else if (window.PreprocessingView && window.PreprocessingView.openChemOrderModal) {
        window.PreprocessingView.openChemOrderModal();
      }
    });"""
    content = content.replace(old_rc_add, new_rc_add)

    # rc Edit
    old_rc_edit = """tbody.querySelectorAll('.rc-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.receivedChemicalsList.find(x => x.id === id);
          if (!rec) return;
          if (window.PreprocessingView && window.PreprocessingView.openChemOrderModal) {
            window.PreprocessingView.openChemOrderModal(rec);
          }
        });
      });"""
    new_rc_edit = """tbody.querySelectorAll('.rc-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.receivedChemicalsList.find(x => x.id === id);
          if (!rec) return;
          if (typeof this !== 'undefined' && this.openChemOrderModal) {
            this.openChemOrderModal(rec);
          } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemOrderModal) {
            PreprocessingView.openChemOrderModal(rec);
          } else if (window.PreprocessingView && window.PreprocessingView.openChemOrderModal) {
            window.PreprocessingView.openChemOrderModal(rec);
          }
        });
      });"""
    content = content.replace(old_rc_edit, new_rc_edit)

    # cc Add
    old_cc_add = """btnAddConsumption?.addEventListener('click', () => {
      if (window.PreprocessingView && window.PreprocessingView.openChemConsumptionModal) {
        window.PreprocessingView.openChemConsumptionModal();
      }
    });"""
    new_cc_add = """btnAddConsumption?.addEventListener('click', () => {
      if (typeof this !== 'undefined' && this.openChemConsumptionModal) {
        this.openChemConsumptionModal();
      } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemConsumptionModal) {
        PreprocessingView.openChemConsumptionModal();
      } else if (window.PreprocessingView && window.PreprocessingView.openChemConsumptionModal) {
        window.PreprocessingView.openChemConsumptionModal();
      }
    });"""
    content = content.replace(old_cc_add, new_cc_add)

    # cp Add
    old_cp_add = """btnAddPayment?.addEventListener('click', () => {
      if (window.PreprocessingView && window.PreprocessingView.openChemPaymentModal) {
        window.PreprocessingView.openChemPaymentModal();
      }
    });"""
    new_cp_add = """btnAddPayment?.addEventListener('click', () => {
      if (typeof this !== 'undefined' && this.openChemPaymentModal) {
        this.openChemPaymentModal();
      } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemPaymentModal) {
        PreprocessingView.openChemPaymentModal();
      } else if (window.PreprocessingView && window.PreprocessingView.openChemPaymentModal) {
        window.PreprocessingView.openChemPaymentModal();
      }
    });"""
    content = content.replace(old_cp_add, new_cp_add)

    # cp Edit
    old_cp_edit = """tbody.querySelectorAll('.cp-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.chemicalPaymentsList.find(x => x.id === id);
          if (!rec) return;
          if (window.PreprocessingView && window.PreprocessingView.openChemPaymentModal) {
            window.PreprocessingView.openChemPaymentModal(rec);
          }
        });
      });"""
    new_cp_edit = """tbody.querySelectorAll('.cp-action-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const rec = this.chemicalPaymentsList.find(x => x.id === id);
          if (!rec) return;
          if (typeof this !== 'undefined' && this.openChemPaymentModal) {
            this.openChemPaymentModal(rec);
          } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemPaymentModal) {
            PreprocessingView.openChemPaymentModal(rec);
          } else if (window.PreprocessingView && window.PreprocessingView.openChemPaymentModal) {
            window.PreprocessingView.openChemPaymentModal(rec);
          }
        });
      });"""
    content = content.replace(old_cp_edit, new_cp_edit)

    # 3. Robust modal retrieval in modal opening methods
    old_m_get = "const m = typeof Modal !== 'undefined' ? Modal : window.Modal;\n    if (!m) return;"
    new_m_get = """const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) {
      console.error('Modal system unavailable');
      if (typeof Toast !== 'undefined') Toast.show('Modal system unavailable', 'error');
      return;
    }"""
    content = content.replace(old_m_get, new_m_get)

    # In modal form submit: subContainer fallback
    content = content.replace(
        "const subContainer = document.getElementById('preprocessing-content');",
        "const subContainer = document.getElementById('preproc-subpage-content') || document.getElementById('preprocessing-content');"
    )

    # 4. Attach PreprocessingView globally at the end if not present
    if "if (typeof window !== 'undefined') window.PreprocessingView = PreprocessingView;" not in content:
        content += "\n\nif (typeof window !== 'undefined') {\n  window.PreprocessingView = PreprocessingView;\n}\n"

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ Saved {filepath}")

def fix_modal_file():
    filepath = 'js/components/modal.js'
    print(f"Processing {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if "window.Modal = Modal" not in content:
        content += "\n\nif (typeof window !== 'undefined') {\n  window.Modal = Modal;\n}\n"
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✓ Ensured window.Modal in {filepath}")

def fix_html_file(filepath):
    print(f"Processing {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Ensure window.Modal = Modal right after `const Modal = {` block
    m_idx = content.find('const Modal = {')
    if m_idx != -1:
        # Find end of Modal object: look for `};` before `// Reusable Enterprise Data Table`
        m_end = content.find('\n};\n\n  // Reusable Enterprise Data Table', m_idx)
        if m_end != -1 and 'window.Modal = Modal' not in content[m_idx:m_end+100]:
            content = content[:m_end+3] + "\nif (typeof window !== 'undefined') { window.Modal = Modal; }\n" + content[m_end+3:]
            print(f"  ✓ Attached window.Modal in {filepath}")

    # 2. Transform preprocessing code inside HTML
    p_idx = content.find('const PreprocessingView = {')
    p_end = content.find('\nconst QCView = {', p_idx)
    if p_idx != -1 and p_end != -1:
        view_code = content[p_idx:p_end]
        
        # Apply button onclicks
        view_code = view_code.replace(
            '<button type="button" id="cpo-btn-add-po" class="',
            '<button type="button" id="cpo-btn-add-po" onclick="(window.PreprocessingView || PreprocessingView).openChemPOModal()" class="'
        )
        view_code = view_code.replace(
            '<button type="button" id="rc-btn-add-order" class="',
            '<button type="button" id="rc-btn-add-order" onclick="(window.PreprocessingView || PreprocessingView).openChemOrderModal()" class="'
        )
        view_code = view_code.replace(
            '<button type="button" id="cc-btn-add-consumption" class="',
            '<button type="button" id="cc-btn-add-consumption" onclick="(window.PreprocessingView || PreprocessingView).openChemConsumptionModal()" class="'
        )
        view_code = view_code.replace(
            '<button type="button" id="cp-btn-add-payment" class="',
            '<button type="button" id="cp-btn-add-payment" onclick="(window.PreprocessingView || PreprocessingView).openChemPaymentModal()" class="'
        )
        view_code = view_code.replace(
            'onclick="window.PreprocessingView.openChemPOModal()"',
            'onclick="(window.PreprocessingView || PreprocessingView).openChemPOModal()"'
        )

        # Apply robust modal retrieval
        old_m_get = "const m = typeof Modal !== 'undefined' ? Modal : window.Modal;\n    if (!m) return;"
        new_m_get = """const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) {
      console.error('Modal system unavailable');
      if (typeof Toast !== 'undefined') Toast.show('Modal system unavailable', 'error');
      return;
    }"""
        view_code = view_code.replace(old_m_get, new_m_get)

        # Subcontainer fallback
        view_code = view_code.replace(
            "const subContainer = document.getElementById('preprocessing-content');",
            "const subContainer = document.getElementById('preproc-subpage-content') || document.getElementById('preprocessing-content');"
        )

        # Update event listeners
        old_cpo_add = """btnAddPo?.addEventListener('click', () => {
      if (window.PreprocessingView && window.PreprocessingView.openChemPOModal) {
        window.PreprocessingView.openChemPOModal();
      }
    });"""
        new_cpo_add = """btnAddPo?.addEventListener('click', () => {
      if (typeof this !== 'undefined' && this.openChemPOModal) {
        this.openChemPOModal();
      } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemPOModal) {
        PreprocessingView.openChemPOModal();
      } else if (window.PreprocessingView && window.PreprocessingView.openChemPOModal) {
        window.PreprocessingView.openChemPOModal();
      }
    });"""
        view_code = view_code.replace(old_cpo_add, new_cpo_add)

        old_rc_add = """btnAddOrder?.addEventListener('click', () => {
      if (window.PreprocessingView && window.PreprocessingView.openChemOrderModal) {
        window.PreprocessingView.openChemOrderModal();
      }
    });"""
        new_rc_add = """btnAddOrder?.addEventListener('click', () => {
      if (typeof this !== 'undefined' && this.openChemOrderModal) {
        this.openChemOrderModal();
      } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemOrderModal) {
        PreprocessingView.openChemOrderModal();
      } else if (window.PreprocessingView && window.PreprocessingView.openChemOrderModal) {
        window.PreprocessingView.openChemOrderModal();
      }
    });"""
        view_code = view_code.replace(old_rc_add, new_rc_add)

        old_cc_add = """btnAddConsumption?.addEventListener('click', () => {
      if (window.PreprocessingView && window.PreprocessingView.openChemConsumptionModal) {
        window.PreprocessingView.openChemConsumptionModal();
      }
    });"""
        new_cc_add = """btnAddConsumption?.addEventListener('click', () => {
      if (typeof this !== 'undefined' && this.openChemConsumptionModal) {
        this.openChemConsumptionModal();
      } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemConsumptionModal) {
        PreprocessingView.openChemConsumptionModal();
      } else if (window.PreprocessingView && window.PreprocessingView.openChemConsumptionModal) {
        window.PreprocessingView.openChemConsumptionModal();
      }
    });"""
        view_code = view_code.replace(old_cc_add, new_cc_add)

        old_cp_add = """btnAddPayment?.addEventListener('click', () => {
      if (window.PreprocessingView && window.PreprocessingView.openChemPaymentModal) {
        window.PreprocessingView.openChemPaymentModal();
      }
    });"""
        new_cp_add = """btnAddPayment?.addEventListener('click', () => {
      if (typeof this !== 'undefined' && this.openChemPaymentModal) {
        this.openChemPaymentModal();
      } else if (typeof PreprocessingView !== 'undefined' && PreprocessingView.openChemPaymentModal) {
        PreprocessingView.openChemPaymentModal();
      } else if (window.PreprocessingView && window.PreprocessingView.openChemPaymentModal) {
        window.PreprocessingView.openChemPaymentModal();
      }
    });"""
        view_code = view_code.replace(old_cp_add, new_cp_add)

        # Attach window.PreprocessingView at end of PreprocessingView
        if "window.PreprocessingView = PreprocessingView" not in view_code:
            view_code += "\n\nif (typeof window !== 'undefined') { window.PreprocessingView = PreprocessingView; }\n"

        content = content[:p_idx] + view_code + content[p_end:]
        print(f"  ✓ Updated PreprocessingView in {filepath}")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ Saved {filepath}")

if __name__ == '__main__':
    fix_preprocessing_file('js/views/preprocessingView.js')
    fix_modal_file()
    fix_html_file('standalone.html')
    fix_html_file('miledeep-devi-fisheries.html')
