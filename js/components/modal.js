// Atlassian Modal & Drawer System

export const Modal = {
  activeModal: null,

  open({ title, content, footerButtons = [], size = 'md' }) {
    this.close();

    const sizeClasses = {
      sm: 'max-w-md',
      md: 'max-w-xl',
      lg: 'max-w-3xl',
      xl: 'max-w-5xl',
      full: 'max-w-[95vw]'
    };

    const modalEl = document.createElement('div');
    modalEl.id = 'erp-modal-root';
    modalEl.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 drawer-backdrop';
    
    let buttonsHtml = '';
    footerButtons.forEach((btn, idx) => {
      const cls = btn.type === 'primary' 
        ? 'btn-primary px-4 py-2 rounded text-sm' 
        : btn.type === 'danger'
        ? 'btn-danger px-4 py-2 rounded text-sm font-medium'
        : 'btn-secondary px-4 py-2 rounded text-sm';
      buttonsHtml += `<button id="modal-btn-${idx}" class="${cls}">${btn.label}</button>`;
    });

    modalEl.innerHTML = `
      <div class="bg-white rounded-lg shadow-2xl border border-[#DFE1E6] w-full ${sizeClasses[size] || 'max-w-xl'} flex flex-col max-h-[90vh] animate-fade-in overflow-hidden">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-[#DFE1E6] flex items-center justify-between bg-[#FAFBFC]">
          <h3 class="text-base font-semibold text-[#172B4D] flex items-center gap-2">
            ${title}
          </h3>
          <button id="erp-modal-close-btn" class="text-[#6B778C] hover:text-[#172B4D] p-1.5 rounded hover:bg-[#EBECF0] transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 overflow-y-auto flex-1 text-sm text-[#172B4D]">
          ${content}
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-3.5 border-t border-[#DFE1E6] bg-[#FAFBFC] flex items-center justify-end gap-2.5">
          ${buttonsHtml}
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);
    this.activeModal = modalEl;

    // Attach Close Handler
    modalEl.querySelector('#erp-modal-close-btn').addEventListener('click', () => this.close());
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) this.close();
    });

    // Attach Footer Handlers
    footerButtons.forEach((btn, idx) => {
      const btnEl = modalEl.querySelector(`#modal-btn-${idx}`);
      if (btnEl && btn.onClick) {
        btnEl.addEventListener('click', () => btn.onClick(this));
      }
    });

    // Keydown escape
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        this.close();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  },

  close() {
    const existing = document.getElementById('erp-modal-root');
    if (existing) existing.remove();
    this.activeModal = null;
  },

  // Slide-in Drawer from Right (e.g. for Lot Traceability, Batch Audit, Shipment Details)
  openDrawer({ title, subtitle, content, width = 'w-full md:w-[680px]', footerContent = null }) {
    this.closeDrawer();

    const drawerEl = document.createElement('div');
    drawerEl.id = 'erp-drawer-root';
    drawerEl.className = 'fixed inset-0 z-50 flex justify-end drawer-backdrop';

    drawerEl.innerHTML = `
      <div class="bg-white h-full shadow-2xl border-l border-[#DFE1E6] ${width} flex flex-col drawer-panel transform transition-transform duration-300 translate-x-full">
        <!-- Drawer Header -->
        <div class="px-6 py-4 border-b border-[#DFE1E6] flex items-center justify-between bg-[#FAFBFC]">
          <div>
            <h3 class="text-base font-bold text-[#172B4D]">${title}</h3>
            ${subtitle ? `<p class="text-xs text-[#5E6C84] mt-0.5">${subtitle}</p>` : ''}
          </div>
          <button id="erp-drawer-close-btn" class="text-[#6B778C] hover:text-[#172B4D] p-1.5 rounded hover:bg-[#EBECF0] transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Drawer Content -->
        <div class="p-6 overflow-y-auto flex-1 text-sm text-[#172B4D]">
          ${content}
        </div>

        <!-- Optional Footer -->
        ${footerContent ? `<div class="px-6 py-3.5 border-t border-[#DFE1E6] bg-[#FAFBFC] flex items-center justify-end gap-2.5">${footerContent}</div>` : ''}
      </div>
    `;

    document.body.appendChild(drawerEl);
    setTimeout(() => {
      const panel = drawerEl.querySelector('.drawer-panel');
      if (panel) panel.classList.remove('translate-x-full');
    }, 10);

    drawerEl.querySelector('#erp-drawer-close-btn').addEventListener('click', () => this.closeDrawer());
    drawerEl.addEventListener('click', (e) => {
      if (e.target === drawerEl) this.closeDrawer();
    });
  },

  closeDrawer() {
    const existing = document.getElementById('erp-drawer-root');
    if (existing) {
      const panel = existing.querySelector('.drawer-panel');
      if (panel) panel.classList.add('translate-x-full');
      setTimeout(() => existing.remove(), 250);
    }
  },

  // Confirmation Dialog
  confirm({ title = 'Confirm Action', message, confirmText = 'Confirm', cancelText = 'Cancel', isDestructive = false, onConfirm }) {
    this.open({
      title,
      content: `<div class="py-2 text-[#42526E]">${message}</div>`,
      footerButtons: [
        {
          label: cancelText,
          type: 'secondary',
          onClick: (modal) => modal.close()
        },
        {
          label: confirmText,
          type: isDestructive ? 'danger' : 'primary',
          onClick: (modal) => {
            modal.close();
            if (onConfirm) onConfirm();
          }
        }
      ]
    });
  },

  // Action Success / Submitted / Saved / Edited Confirmation Popup
  success({ title = 'Action Completed Successfully', message = 'The record has been processed and saved.', details = null, buttonText = 'OK', onConfirm = null }) {
    this.close();

    const modalEl = document.createElement('div');
    modalEl.id = 'erp-modal-root';
    modalEl.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 drawer-backdrop';

    let detailsHtml = '';
    if (details && Array.isArray(details) && details.length > 0) {
      detailsHtml = `
        <div class="mt-3.5 p-3 bg-[#F4F5F7] rounded-lg border border-[#DFE1E6] text-xs space-y-1.5 text-left">
          ${details.map(d => `
            <div class="flex items-center justify-between">
              <span class="text-[#6B778C] font-medium">${d.label}:</span>
              <span class="font-bold text-[#172B4D]">${d.value}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    modalEl.innerHTML = `
      <div class="bg-white rounded-xl shadow-2xl border border-[#DFE1E6] w-full max-w-md flex flex-col animate-fade-in overflow-hidden text-center p-6">
        <div class="w-12 h-12 rounded-full bg-[#E3FCEF] text-[#006644] mx-auto flex items-center justify-center mb-3 shadow-xs">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
        </div>
        
        <h3 class="text-base font-extrabold text-[#172B4D] mb-1.5">${title}</h3>
        <p class="text-xs text-[#5E6C84] leading-relaxed">${message}</p>
        
        ${detailsHtml}

        <div class="mt-5 flex justify-center">
          <button id="modal-success-btn" class="btn-primary w-full py-2 rounded-lg text-xs font-bold shadow-xs hover:shadow cursor-pointer">
            ${buttonText}
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);
    this.activeModal = modalEl;

    const btn = modalEl.querySelector('#modal-success-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        this.close();
        if (onConfirm) onConfirm();
      });
    }

    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) this.close();
    });
  }
};
