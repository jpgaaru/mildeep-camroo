/**
 * AquaOps Design System — Industrial Atoms & Badges
 * Specialized industrial presentation helpers for Seafood ERP workflows.
 * Strict token adherence: Camaroo palette, Inter typography, 100% additive.
 */

/**
 * Renders a specialized Yield % pill with semantic status coloring.
 * @param {number|string} yieldValue - e.g. 69.45 or "69.45%"
 * @param {Object} options - { thresholdGood: 68, thresholdWarning: 64, showIcon: true }
 * @returns {string} HTML string
 */
export function YieldBadge(yieldValue, options = {}) {
  const num = typeof yieldValue === 'number' ? yieldValue : parseFloat(String(yieldValue).replace('%', '')) || 0;
  const good = options.thresholdGood || 68;
  const warn = options.thresholdWarning || 64;

  let bg = '#ECFDF5';
  let text = '#047857';
  let border = '#A7F3D0';
  let icon = '▲';

  if (num < warn) {
    bg = '#FEF2F2';
    text = '#B91C1C';
    border = '#FECACA';
    icon = '▼';
  } else if (num < good) {
    bg = '#FFFBEB';
    text = '#B45309';
    border = '#FDE68A';
    icon = '◆';
  }

  const iconHtml = options.showIcon !== false ? `<span style="font-size:9px;margin-right:4px;">${icon}</span>` : '';

  return `
    <span style="display:inline-flex;align-items:center;padding:3px 8px;border-radius:9999px;font-size:11px;font-weight:700;font-family:'Inter',sans-serif;background:${bg};color:${text};border:1px solid ${border};white-space:nowrap;">
      ${iconHtml}${num.toFixed(2)}%
    </span>
  `;
}

/**
 * Renders an operational Difference / Shortfall Pill.
 * In seafood count grading, a negative count difference (-3) means larger shrimp per lb (advantageous/supplier bonus),
 * typically highlighted in Emerald Green.
 * @param {number} diff - Difference value
 * @param {Object} options - { invert: false, unit: '' }
 * @returns {string} HTML string
 */
export function DifferencePill(diff, options = {}) {
  const num = parseFloat(diff) || 0;
  const isZero = num === 0;
  const isPositive = num > 0;
  
  // Invert colors if specified (e.g. count vs weight)
  const isGreen = options.invert ? isPositive : num < 0;

  let bg = '#F1F5F9';
  let text = '#475569';
  let border = '#CBD5E1';

  if (!isZero) {
    if (isGreen) {
      bg = '#ECFDF5';
      text = '#047857';
      border = '#A7F3D0';
    } else {
      bg = '#FEF2F2';
      text = '#B91C1C';
      border = '#FECACA';
    }
  }

  const prefix = num > 0 ? '+' : '';
  const displayVal = isZero ? '0' : `${prefix}${num}${options.unit ? ` ${options.unit}` : ''}`;

  return `
    <span style="display:inline-flex;align-items:center;padding:2px 7px;border-radius:6px;font-size:11px;font-weight:700;font-family:'Inter',monospace;background:${bg};color:${text};border:1px solid ${border};">
      ${displayVal}
    </span>
  `;
}

/**
 * Renders an audited Track Code Chip with high-contrast copy / inspection affordance.
 * @param {string} code - e.g. "VM-VSP-SKM-054"
 * @param {string} targetScreen - default 'screen-trackcodereport'
 * @returns {string} HTML string
 */
export function TrackCodeChip(code, targetScreen = 'screen-trackcodereport') {
  if (!code) return '-';

  return `
    <span 
      class="aq-track-code-chip" 
      data-code="${code}"
      data-target="${targetScreen}"
      title="Audit Batch ${code}"
      style="display:inline-flex;align-items:center;gap:5px;padding:3px 8px;border-radius:6px;font-size:11.5px;font-weight:600;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;background:#F0FDFA;color:#0F766E;border:1px solid #CCFBF1;cursor:pointer;transition:all 0.15s ease;"
      onmouseover="this.style.background='#CCFBF1';this.style.borderColor='#99F6E4';"
      onmouseout="this.style.background='#F0FDFA';this.style.borderColor='#CCFBF1';"
    >
      <svg style="width:11px;height:11px;opacity:0.75;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/></svg>
      <span>${code}</span>
    </span>
  `;
}

/**
 * Renders Industrial Process Status Badges.
 * @param {string} status - e.g. "MELTING", "FRESH", "ISSUED", "VERIFIED", "PENDING"
 * @returns {string} HTML string
 */
export function ProcessStatusBadge(status) {
  const norm = String(status || '').toUpperCase().trim();

  const statusMap = {
    'MELTING': { bg: '#FEF3C7', text: '#B45309', border: '#FDE68A' },
    'FRESH': { bg: '#ECFDF5', text: '#047857', border: '#A7F3D0' },
    'ISSUED': { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
    'VERIFIED': { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
    'PENDING': { bg: '#FFF7ED', text: '#C2410C', border: '#FFEDD5' },
    'HOLD': { bg: '#FEF2F2', text: '#B91C1C', border: '#FECACA' }
  };

  const style = statusMap[norm] || { bg: '#F8FAFC', text: '#475569', border: '#E2E8F0' };

  return `
    <span style="display:inline-block;padding:2px 8px;border-radius:9999px;font-size:10.5px;font-weight:700;letter-spacing:0.3px;background:${style.bg};color:${style.text};border:1px solid ${style.border};text-transform:uppercase;">
      ${status}
    </span>
  `;
}
