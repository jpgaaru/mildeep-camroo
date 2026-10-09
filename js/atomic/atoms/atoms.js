// Atomic Design: Atoms (Pure, Primitive, Single-Responsibility UI Elements)

export const Atoms = {
  /**
   * Button Atom
   */
  button({
    text = '',
    icon = '',
    variant = 'primary', // primary | secondary | outline | ghost | danger
    size = 'md',        // sm | md | lg
    id = '',
    extraClasses = '',
    onClick = ''
  }) {
    const sizeClasses = {
      sm: 'px-2.5 py-1 text-xs',
      md: 'px-3.5 py-2 text-xs font-semibold',
      lg: 'px-4 py-2.5 text-sm font-semibold'
    }[size] || 'px-3.5 py-2 text-xs font-semibold';

    const variantClasses = {
      primary: 'bg-[#0369A1] hover:bg-[#075985] text-white border border-[#02598B] rounded-lg shadow-none',
      secondary: 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] border border-[#CBD5E1] rounded-lg',
      outline: 'bg-white hover:bg-[#F8FAFC] text-[#334155] border border-[#CBD5E1] rounded-lg',
      ghost: 'bg-transparent hover:bg-black/5 text-[#64748B] hover:text-[#0F172A] rounded-lg',
      danger: 'bg-[#EF4444] hover:bg-[#DC2626] text-white border border-[#DC2626] rounded-lg'
    }[variant] || 'bg-[#0369A1] text-white';

    const idAttr = id ? `id="${id}"` : '';
    const clickAttr = onClick ? `onclick="${onClick}"` : '';

    return `
      <button 
        type="button"
        ${idAttr}
        ${clickAttr}
        class="inline-flex items-center justify-center gap-2 cursor-pointer transition-colors duration-150 select-none ${sizeClasses} ${variantClasses} ${extraClasses}"
      >
        ${icon ? `<span class="shrink-0 flex items-center justify-center">${icon}</span>` : ''}
        ${text ? `<span>${text}</span>` : ''}
      </button>
    `;
  },

  /**
   * Badge / Status Pill Atom
   */
  badge({
    text = '',
    variant = 'neutral', // primary | success | warning | danger | neutral
    hasDot = false,
    size = 'md'
  }) {
    const variants = {
      primary: 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]',
      success: 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]',
      warning: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
      danger: 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]',
      neutral: 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]'
    }[variant] || 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]';

    const dotColors = {
      primary: 'bg-[#0284C7]',
      success: 'bg-[#10B981]',
      warning: 'bg-[#F59E0B]',
      danger: 'bg-[#EF4444]',
      neutral: 'bg-[#94A3B8]'
    }[variant] || 'bg-[#94A3B8]';

    return `
      <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${variants}">
        ${hasDot ? `<span class="w-1.5 h-1.5 rounded-full ${dotColors}"></span>` : ''}
        <span>${text}</span>
      </span>
    `;
  },

  /**
   * TextInput Atom
   */
  input({
    type = 'text',
    id = '',
    placeholder = '',
    value = '',
    extraClasses = ''
  }) {
    return `
      <input 
        type="${type}"
        id="${id}"
        placeholder="${placeholder}"
        value="${value}"
        class="w-full bg-white border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#0284C7] focus:border-[#0284C7] transition-all ${extraClasses}"
      />
    `;
  },

  /**
   * Select Atom
   */
  select({
    id = '',
    options = [],
    selected = '',
    extraClasses = ''
  }) {
    return `
      <select 
        id="${id}"
        class="w-full bg-white border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#0284C7] focus:border-[#0284C7] transition-all cursor-pointer ${extraClasses}"
      >
        ${options.map(opt => `
          <option value="${opt.value}" ${opt.value === selected ? 'selected' : ''}>
            ${opt.label}
          </option>
        `).join('')}
      </select>
    `;
  }
};
