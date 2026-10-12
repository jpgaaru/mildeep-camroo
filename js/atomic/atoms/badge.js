// AquaPulse Status Badge Atom

export const Badge = {
  render({
    text = '',
    variant = 'neutral', // emerald | amber | ruby | teal | neutral
    hasDot = true,
    size = 'sm'
  }) {
    const variantMap = {
      emerald: 'bg-[#eafaf1] text-[#056a38] border-[#a8e7c3] dot-[#10b981]',
      success: 'bg-[#eafaf1] text-[#056a38] border-[#a8e7c3] dot-[#10b981]',
      amber: 'bg-[#fff9e6] text-[#824d00] border-[#f7da94] dot-[#f59e0b]',
      warning: 'bg-[#fff9e6] text-[#824d00] border-[#f7da94] dot-[#f59e0b]',
      ruby: 'bg-[#feeff1] text-[#b5152b] border-[#f9b0be] dot-[#ef4444]',
      danger: 'bg-[#feeff1] text-[#b5152b] border-[#f9b0be] dot-[#ef4444]',
      teal: 'bg-[#f0fafc] text-[#006c7a] border-[#b2ecf3] dot-[#00a4b7]',
      primary: 'bg-[#f0fafc] text-[#006c7a] border-[#b2ecf3] dot-[#00a4b7]',
      neutral: 'bg-[#f5f5f7] text-[#42526e] border-[#e8e8ed] dot-[#98989d]'
    };

    const style = variantMap[variant] || variantMap.neutral;
    const parts = style.split(' ');
    const bgClass = parts[0];
    const textClass = parts[1];
    const borderClass = parts[2];
    const dotColor = (parts[3] || 'dot-[#98989d]').replace('dot-[', '').replace(']', '');

    return `
      <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${bgClass} ${textClass} ${borderClass} whitespace-nowrap">
        ${hasDot ? `<span class="w-1.5 h-1.5 rounded-full shrink-0" style="background-color: ${dotColor}"></span>` : ''}
        <span>${text}</span>
      </span>
    `;
  }
};
