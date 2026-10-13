// AquaPulse Framework — Stage 1: Atomic UI Primitives (Atoms)
// Standardized, props-driven building blocks following AquaOps Design System tokens

export const Atoms = {
  /**
   * Button Atom
   * @param {Object} props - { id, label, icon, variant: 'primary'|'secondary'|'danger'|'ghost', size: 'sm'|'md', type, className, attrs }
   */
  Button({
    id = '',
    label = '',
    icon = '',
    variant = 'primary',
    size = 'md',
    type = 'button',
    className = '',
    attrs = ''
  } = {}) {
    const heightCls = size === 'sm' ? 'h-8 px-3 text-[11px]' : 'h-[38px] px-4 text-xs';
    const variantCls = {
      primary: 'btn-primary font-bold text-white rounded-lg shadow-xs hover:shadow',
      secondary: 'bg-white hover:bg-[#F8FAFC] text-[#334155] border border-[#CBD5E1] font-semibold rounded-lg',
      danger: 'bg-[#FFE4E6] hover:bg-[#FECDD3] text-[#881337] border border-[#FDA4AF] font-semibold rounded-lg',
      ghost: 'bg-transparent hover:bg-[#F0FAFC] text-[#006C7A] font-semibold rounded-lg'
    }[variant] || 'btn-primary font-bold text-white rounded-lg';

    const iconHtml = icon
      ? (icon.trim().startsWith('<') ? icon : `<i data-lucide="${icon}" class="w-4 h-4"></i>`)
      : '';

    return `
      <button
        type="${type}"
        ${id ? `id="${id}"` : ''}
        class="${heightCls} ${variantCls} inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer ${className}"
        ${attrs}
      >
        ${iconHtml}
        ${label ? `<span>${label}</span>` : ''}
      </button>
    `;
  },

  /**
   * Badge / Lozenge Atom (WCAG AAA Certified)
   * @param {Object} props - { label, variant: 'default'|'success'|'inprogress'|'warning'|'danger'|'purple' }
   */
  Badge({ label = '', variant = 'default', className = '' } = {}) {
    const lozengeClass = {
      default: 'lozenge-default',
      success: 'lozenge-success',
      inprogress: 'lozenge-inprogress',
      warning: 'lozenge-warning',
      danger: 'lozenge-danger',
      purple: 'lozenge-purple'
    }[variant] || 'lozenge-default';

    return `<span class="lozenge ${lozengeClass} ${className}">${label}</span>`;
  },

  /**
   * Text / Search Input Atom
   */
  TextInput({
    id = '',
    label = '',
    value = '',
    placeholder = '',
    type = 'text',
    leadingIcon = '',
    className = ''
  } = {}) {
    const iconHtml = leadingIcon
      ? (leadingIcon.trim().startsWith('<')
          ? leadingIcon
          : `<i data-lucide="${leadingIcon}" class="w-4 h-4 text-[#64748B] absolute left-3 top-2.5 pointer-events-none"></i>`)
      : '';

    return `
      <div>
        ${label ? `<label ${id ? `for="${id}"` : ''} class="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5">${label}</label>` : ''}
        <div class="relative">
          <input
            type="${type}"
            ${id ? `id="${id}"` : ''}
            value="${value}"
            placeholder="${placeholder}"
            class="w-full h-[38px] ${leadingIcon ? 'pl-9' : 'px-3'} pr-3 text-xs bg-white border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#006C7A] text-[#0F172A] ${className}"
          />
          ${iconHtml}
        </div>
      </div>
    `;
  },

  /**
   * AquaPulse Custom Calendar Date Input Atom
   */
  DateInput({
    id = '',
    label = '',
    value = '',
    placeholder = 'dd/mm/yyyy',
    className = ''
  } = {}) {
    return `
      <div>
        ${label ? `<label ${id ? `for="${id}"` : ''} class="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5">${label}</label>` : ''}
        <div class="erp-date-wrapper">
          <input
            type="text"
            ${id ? `id="${id}"` : ''}
            readonly
            inputmode="none"
            value="${value}"
            placeholder="${placeholder}"
            class="erp-date-input w-full h-[38px] text-xs px-3 bg-white border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#006C7A] text-[#0F172A] cursor-pointer ${className}"
          />
        </div>
      </div>
    `;
  },

  /**
   * AquaOps Design System Rich Select Atom/Molecule
   * Renders a semantic <select> that SelectPicker automatically upgrades into an AquaOps .rich-select combobox
   * @param {Object} props - { id, label, options: [{ value, label, sub, badge }], value, className }
   */
  RichSelect({
    id = '',
    label = '',
    options = [],
    value = '',
    className = ''
  } = {}) {
    const normalizedOptions = options.map((opt) =>
      typeof opt === 'string' ? { value: opt, label: opt } : opt
    );

    return `
      <div>
        ${label ? `<label ${id ? `for="${id}"` : ''} class="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5">${label}</label>` : ''}
        <select
          ${id ? `id="${id}"` : ''}
          class="w-full h-[38px] text-xs px-3 bg-white border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#006C7A] text-[#0F172A] ${className}"
        >
          ${normalizedOptions.map((opt) => {
            const isSelected = String(opt.value) === String(value) || Boolean(opt.selected);
            const subAttr = opt.sub ? `data-sub="${opt.sub.replace(/"/g, '&quot;')}"` : '';
            const badgeAttr = opt.badge ? `data-badge="${opt.badge.replace(/"/g, '&quot;')}"` : '';
            return `<option value="${String(opt.value).replace(/"/g, '&quot;')}" ${subAttr} ${badgeAttr} ${isSelected ? 'selected' : ''}>${opt.label}</option>`;
          }).join('')}
        </select>
      </div>
    `;
  }
};
