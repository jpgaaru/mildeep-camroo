// Atlassian Design System Toast Notifications

export const Toast = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'erp-toast-container';
      this.container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none';
      document.body.appendChild(this.container);
    }
  },

  show(message, type = 'info', title = null, duration = 4000) {
    this.init();

    const toastId = 'toast-' + Math.random().toString(36).substr(2, 9);
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = 'pointer-events-auto bg-white rounded shadow-lg border border-[#DFE1E6] p-3.5 flex items-start gap-3 transform transition-all duration-300 translate-y-4 opacity-0 text-sm animate-fade-in';

    let iconSvg = '';
    let accentBorder = 'border-l-4 border-[#0284C7]';

    if (type === 'success') {
      accentBorder = 'border-l-4 border-[#36B37E]';
      iconSvg = `<svg class="w-5 h-5 text-[#36B37E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
      if (!title) title = 'Success';
    } else if (type === 'danger' || type === 'error') {
      accentBorder = 'border-l-4 border-[#FF5630]';
      iconSvg = `<svg class="w-5 h-5 text-[#FF5630] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
      if (!title) title = 'Attention Required';
    } else if (type === 'warning') {
      accentBorder = 'border-l-4 border-[#FFAB00]';
      iconSvg = `<svg class="w-5 h-5 text-[#FFAB00] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`;
      if (!title) title = 'Warning';
    } else {
      iconSvg = `<svg class="w-5 h-5 text-[#0284C7] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
      if (!title) title = 'Information';
    }

    toast.className += ` ${accentBorder}`;
    toast.innerHTML = `
      ${iconSvg}
      <div class="flex-1 pr-2">
        <div class="font-semibold text-[#172B4D] text-xs uppercase tracking-wider">${title}</div>
        <div class="text-[#42526E] text-xs mt-0.5">${message}</div>
      </div>
      <button class="text-[#6B778C] hover:text-[#172B4D] p-1 rounded transition-colors" onclick="document.getElementById('${toastId}').remove()">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    }, 10);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
      }
    }, duration);
  }
};
