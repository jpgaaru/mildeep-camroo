// AquaPulse Metric Stat Tile Organism

export const StatTile = {
  render({
    label = '',
    value = '',
    unit = '',
    icon = '',
    delta = '',
    deltaLabel = '',
    variant = 'teal', // teal | emerald | ruby | amber | neutral
    id = ''
  }) {
    const iconColors = {
      teal: 'bg-[#f0fafc] text-[#006c7a] border border-[#b2ecf3]',
      emerald: 'bg-[#eafaf1] text-[#056a38] border border-[#a8e7c3]',
      amber: 'bg-[#fff9e6] text-[#824d00] border border-[#f7da94]',
      ruby: 'bg-[#feeff1] text-[#b5152b] border border-[#f9b0be]',
      neutral: 'bg-[#f5f5f7] text-[#42526e] border border-[#e8e8ed]'
    }[variant] || 'bg-[#f0fafc] text-[#006c7a] border border-[#b2ecf3]';

    const deltaColors = {
      teal: 'text-[#006c7a]',
      emerald: 'text-[#056a38]',
      amber: 'text-[#824d00]',
      ruby: 'text-[#b5152b]',
      neutral: 'text-[#6e6e73]'
    }[variant] || 'text-[#006c7a]';

    const idAttr = id ? `id="${id}"` : '';

    return `
      <div ${idAttr} class="stat-tile">
        <div class="stat-tile-top">
          <span class="stat-tile-label">${label}</span>
          ${icon ? `
            <div class="stat-tile-icon ${iconColors}">
              ${icon}
            </div>
          ` : ''}
        </div>

        <div class="stat-tile-val-wrap">
          <span class="stat-tile-val">${value}</span>
          ${unit ? `<span class="stat-tile-unit">${unit}</span>` : ''}
        </div>

        ${delta ? `
          <div class="stat-tile-footer">
            <span class="${deltaColors}">${delta}</span>
            ${deltaLabel ? `<span class="text-[#98989d] font-normal">${deltaLabel}</span>` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }
};
