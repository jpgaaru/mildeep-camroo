/**
 * ATOMIC DESIGN SYSTEM COMPONENTS (Vanilla JS)
 * This file contains reusable UI components broken down into Atoms, Molecules, and Organisms.
 */

window.UI = {};

// ==========================================
// ATOMS (Basic building blocks)
// ==========================================

window.UI.Icon = (name, className = '', style = '') => 
  `<i data-lucide="${name}" class="${className}" style="${style}"></i>`;

window.UI.Badge = (text, variant = 'default') => {
  const bgColors = { default: '#F4F4F5', success: '#F0FDF4', warning: '#FFFBEB', error: '#FEF2F2' };
  const textColors = { default: '#09090B', success: '#166534', warning: '#92400E', error: '#991B1B' };
  const borderColors = { default: '#E4E4E7', success: '#BBF7D0', warning: '#FCD34D', error: '#FCA5A5' };
  return `<span style="background: ${bgColors[variant] || bgColors.default}; color: ${textColors[variant] || textColors.default}; border: 1px solid ${borderColors[variant] || borderColors.default}; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 100px;">${text}</span>`;
};

// ==========================================
// MOLECULES (Combinations of Atoms)
// ==========================================

window.UI.FilterSelect = (label, options, id = '') => `
  <div class="filter-group">
    <label class="filter-label">${label}</label>
    <select class="filter-select" ${id ? `id="${id}"` : ''}>
      ${options.map(opt => `<option value="${opt.value || opt}">${opt.label || opt}</option>`).join('')}
    </select>
  </div>
`;

// ==========================================
// ORGANISMS (Complex UI sections)
// ==========================================

window.UI.KPICard = ({ title, value, icon, iconVariant = 'primary', trendText = '', trendType = 'neutral' }) => {
  const trendIcons = { up: 'trending-up', down: 'trending-down', neutral: 'minus' };
  return `
    <div class="kpi-card">
      <div class="kpi-header">
        <span class="kpi-title">${title}</span>
        <div class="kpi-icon ${iconVariant}">${window.UI.Icon(icon)}</div>
      </div>
      <div class="kpi-value">${value}</div>
      ${trendText ? `
        <div class="kpi-trend trend-${trendType}">
          ${window.UI.Icon(trendIcons[trendType])} ${trendText}
        </div>
      ` : ''}
    </div>
  `;
};

window.UI.ChartCard = ({ id, title, subtitle, height = '300px', periodOptions = ['Monthly', 'Quarterly', 'Yearly'], extraHtml = '' }) => `
  <div class="chart-card">
    <div class="chart-header">
      <div>
        <div class="chart-title">${title}</div>
        ${subtitle ? `<div class="chart-subtitle">${subtitle}</div>` : ''}
      </div>
      <div class="chart-actions">
        <div class="chart-period-wrap">
          ${window.UI.Icon('calendar', 'period-icon')}
          <select class="chart-period-select" onchange="handlePeriodChange(this, '${id}')">
            ${periodOptions.map(opt => `<option value="${opt.toLowerCase()}">${opt}</option>`).join('')}
          </select>
        </div>
        <button class="chart-action-btn" title="Download Chart" onclick="exportChart('${id}', '${title.replace(/[\s/]+/g, '_')}')">
          ${window.UI.Icon('download')}
        </button>
      </div>
    </div>
    <div class="chart-body" style="height: ${height};"><canvas id="${id}"></canvas></div>
    ${extraHtml}
  </div>
`;
