#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys

def main():
    with open('js/views/purchaseView.js', 'w', encoding='utf-8') as f:
        f.write('''// Real-World Production Fisheries ERP Purchase Module (Client v3 Final Specification)
// DFL Production Architecture: Canonical Masters, Live 0.1% TDS Math, Dynamic Balance Consumption, Auto-Numbering, and Contextual Sub-Screens

import { ERP_DATA } from '../data/mockData.js';
import { DataTable } from '../components/table.js';
import { Charts } from '../components/charts.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';
import { TabBar } from '../components/tabBar.js';
import { Skeleton } from '../components/skeleton.js';
import { renderEmptyState } from '../components/emptyState.js';
import { Molecules } from '../framework/index.js';

// ============================================================================
// CONFIG & MASTERS
// ============================================================================
export const FY = '2627';
export const TDS_RATE = 0.001; // Section 194Q Statutory 0.1% TDS
export const TODAY = new Date().toISOString().slice(0, 10);

export const M = {
  centers: [
    { code: 'AVN', name: 'A.V.NAGARAM FARMS' },
    { code: 'ADP', name: 'ADDARIPETA FARMS' },
    { code: 'AMP', name: 'AMALAPURAM' },
    { code: 'BLS', name: 'BALASORE' },
    { code: 'BMV', name: 'BHIMAVARAM' },
    { code: 'GDR', name: 'GUDUR' },
    { code: 'KKN', name: 'KAKINADA LOCAL' },
    { code: 'MKP', name: 'MALIKIPURAM' },
    { code: 'NRP', name: 'NARASAPURAM' },
    { code: 'NLR', name: 'NELLORE' },
    { code: 'OGL', name: 'ONGOLE' },
    { code: 'OGF', name: 'ONGOLE FARMS' },
    { code: 'ORS', name: 'ORISSA' },
    { code: 'PRD', name: 'PARADEEP' },
    { code: 'RPL', name: 'REPALLE' },
    { code: 'RPF', name: 'REPALLE FARMS' },
    { code: 'SKM', name: 'SRIKAKULAM' },
    { code: 'TLR', name: 'TALLAREVU' },
    { code: 'VSP', name: 'VSP LOCAL' },
    { code: 'WBL', name: 'WEST BENGAL' },
    { code: 'KDF', name: 'KODADA FARMS' },
    { code: 'MVF', name: 'MALLAVARAM FARMS' },
    { code: 'KLR', name: 'KAIKALUR' },
    { code: 'GJT', name: 'GUJARAT' }
  ],
  plants: ['DFL UNIT-1 (VSP)', 'DFL UNIT-2 (KKD)', 'DFL UNIT-3 (PSP)', 'DFL UNIT-4 (PND)', 'DFL UNIT-5 (JPT)', 'DFL UNIT-6 (JPT-II)', 'TALLAREVU'],
  species: ['COD', 'Red meat Species', 'PENAEUS MONODON', 'LITOPENAEUS VANNAMEI', 'Sea Tiger'],
  types: ['Site Weightment', 'Farm Weightment', 'Pond Weightment'],
  suppliers: ['L.G SEA FOODS(D HARIBABU)', 'K.GOPAL NAIDU', 'G.BALAKRISHNA (KP KODADA)-BMDPG7516B', 'ADITYA AQUA FARMS'],
  agents: ['R.SURESH', 'M.RAMESH'],
  vehicles: ['AP05TM2628', 'AP39UF7171', 'AP39TT4299'],
  drivers: ['RAMU K', 'SOMU N'],
  graders: ['K.PRASAD', 'M.RAO'],
  supervisors: ['T.VENKATESH', 'K VENKATA VINAY'],
  companies: ['DEVI FISHERIES LIMITED'],
  varieties: ['HEAD ON', 'HO-COD', 'HEADLESS']
};

export const cCode = n => { const c = M.centers.find(c => c.name === n); return c ? c.code : 'XXX'; };
export const r2 = n => Math.round(n * 100) / 100;
export const fmt = (n, d = 2) => Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
export const T = n => (Number(n || 0) / 1000).toFixed(2);
export const monthIdx = { September: 8, October: 9, November: 10 };

// ============================================================================
// CANONICAL DATA STORE
// ============================================================================
export let bookings = [
  { sNo: 1, no: 'BK/ADP/2627/0001', date: '2026-10-05', station: 'ADDARIPETA FARMS', species: 'COD', type: 'Site Weightment', supplier: 'K.GOPAL NAIDU', vehicle: 'AP05TM2628', driver: 'RAMU K', grader: 'K.PRASAD', agent: 'R.SURESH', farm: 'ADDARIPETA FARMS', count: 350, weight: 1000, rate: 200, plant: 'DFL UNIT-2 (KKD)', remarks: 'Dock verified' },
  { sNo: 2, no: 'BK/AVN/2627/0002', date: '2026-10-04', station: 'A.V.NAGARAM FARMS', species: 'LITOPENAEUS VANNAMEI', type: 'Site Weightment', supplier: 'K.GOPAL NAIDU', vehicle: 'AP39UF7171', driver: 'SOMU N', grader: 'M.RAO', agent: '', farm: 'NAGARAM', count: 50, weight: 500, rate: 200, plant: 'DFL UNIT-2 (KKD)', remarks: 'Grade A locked' }
];

export let rmArrivals = [
  { sNo: 1, date: '2026-10-06', company: 'DEVI FISHERIES LIMITED', species: 'COD', plant: 'DFL UNIT-2 (KKD)', center: 'ADDARIPETA FARMS', weight: 1000, amount: 200000 },
  { sNo: 2, date: '2026-10-06', company: 'DEVI FISHERIES LIMITED', species: 'LITOPENAEUS VANNAMEI', plant: 'DFL UNIT-2 (KKD)', center: 'A.V.NAGARAM FARMS', weight: 500, amount: 25000 }
];

export let arrivals = [
  { id: 153934, no: 'BLS/2627/0143', billDate: '2026-10-01', date: '2026-10-01', center: 'BALASORE', plant: 'DFL UNIT-2 (KKD)', type: 'Site Weightment', supplier: 'K.GOPAL NAIDU', grader: '', agent: '', species: 'COD', variety: 'HO-COD', count: 160, weight: 400, rate: 180, harvest: 0, addDed: 0, abStatus: 'Test Pending', dehead: 0, grading: 0, va: 0, soaking: 0, packed: 0, billPending: true, border: false, returned: false, farm: 'BALASORE', supervisor: '', driver: '', vehicle: '' },
  { id: 153935, no: 'NLR/2627/0256', billDate: '2026-10-01', date: '2026-10-01', center: 'NELLORE', plant: 'DFL UNIT-1 (VSP)', type: 'Site Weightment', supplier: 'ADITYA AQUA FARMS', grader: '', agent: '', species: 'LITOPENAEUS VANNAMEI', variety: 'HEAD ON', count: 40, weight: 40000, rate: 450, harvest: 0, addDed: 0, abStatus: 'POSITIVE', dehead: 0, grading: 0, va: 0, soaking: 0, packed: 0, billPending: true, border: false, returned: false, farm: 'NELLORE', supervisor: '', driver: '', vehicle: '' },
  { id: 153938, no: 'AVN/2627/1234', billDate: '2026-10-04', date: '2026-10-06', center: 'A.V.NAGARAM FARMS', plant: 'DFL UNIT-2 (KKD)', type: 'Site Weightment', supplier: 'K.GOPAL NAIDU', grader: '', agent: '', species: 'LITOPENAEUS VANNAMEI', variety: 'HEAD ON', count: 50, weight: 50, rate: 200, harvest: 0, addDed: 0, abStatus: 'Test Pending', dehead: 4, grading: 0, va: 0, soaking: 0, packed: 0, billPending: false, border: true, returned: false, farm: 'NAGARAM', supervisor: '', driver: '', vehicle: '' },
  { id: 153939, no: 'ADP/2627/0019', billDate: '2026-10-05', date: '2026-10-06', center: 'ADDARIPETA FARMS', plant: 'DFL UNIT-2 (KKD)', type: 'Site Weightment', supplier: 'G.BALAKRISHNA (KP KODADA)-BMDPG7516B', grader: '', agent: '', species: 'COD', variety: 'HO-COD', count: 12, weight: 500, rate: 200, harvest: 0, addDed: 0, abStatus: 'Test Pending', dehead: 0.9, grading: 0, va: 0, soaking: 0, packed: 0, billPending: false, border: false, returned: false, farm: 'ADDARIPETA FARMS', supervisor: '', driver: '', vehicle: '' },
  { id: 153940, no: 'ADP/2627/0020', billDate: '2026-10-05', date: '2026-10-06', center: 'ADDARIPETA FARMS', plant: 'DFL UNIT-2 (KKD)', type: 'Site Weightment', supplier: 'K.GOPAL NAIDU', grader: '', agent: '', species: 'COD', variety: 'HO-COD', count: 100, weight: 150, rate: 45, harvest: 0, addDed: 0, abStatus: 'Test Pending', dehead: 0, grading: 0, va: 0, soaking: 0, packed: 0, billPending: false, border: false, returned: false, farm: 'ADDARIPETA FARMS', supervisor: '', driver: '', vehicle: '' },
  { id: 153941, no: 'ADP/2627/0018', billDate: '2026-10-05', date: '2026-10-06', center: 'ADDARIPETA FARMS', plant: 'DFL UNIT-2 (KKD)', type: 'Site Weightment', supplier: 'K.GOPAL NAIDU', grader: '', agent: '', species: 'COD', variety: 'HO-COD', count: 80, weight: 200, rate: 200, harvest: 0, addDed: 0, abStatus: 'Test Pending', dehead: 0, grading: 0, va: 0, soaking: 0, packed: 0, billPending: false, border: false, returned: false, farm: 'ADDARIPETA FARMS', supervisor: '', driver: '', vehicle: '' },
  { id: 153942, no: 'ADP/2627/0021', billDate: '2026-10-05', date: '2026-10-06', center: 'ADDARIPETA FARMS', plant: 'DFL UNIT-2 (KKD)', type: 'Site Weightment', supplier: 'L.G SEA FOODS(D HARIBABU)', grader: '', agent: '', species: 'COD', variety: 'HO-COD', count: 350, weight: 350, rate: 200, harvest: 0, addDed: 0, abStatus: 'Test Pending', dehead: 0, grading: 0, va: 0, soaking: 0, packed: 0, billPending: false, border: false, returned: false, farm: 'ADDARIPETA FARMS', supervisor: '', driver: '', vehicle: '' }
];

export let payments = [
  { voucher: 'CADP01', mode: 'Cash', date: '2026-10-05', center: 'ADDARIPETA FARMS', agent: '', cheque: '', comments: 'advance', lines: [{ no: 'ADP/2627/0020', amount: 5000 }], total: 5000 }
];

// Active contextual state
let isCreatingBooking = false;
let activeBillForEdit = null;

// ============================================================================
// MONEY MATH HELPERS (Section 194Q TDS 0.1% Statutory Formula)
// ============================================================================
export const grossOf = a => r2((a.weight || 0) * (a.rate || 0) + (a.weight || 0) * (a.addDed || 0));
export const tdsOf = a => r2(grossOf(a) * TDS_RATE);
export const billAmtOf = a => r2(grossOf(a) - tdsOf(a));
export const paidFor = no => r2(payments.reduce((s, p) => s + ((p.lines.find(l => l.no === no) || {}).amount || 0), 0));
export const balanceOf = a => r2(billAmtOf(a) - paidFor(a.no));
export const rmConsumed = r => {
  const ls = arrivals.filter(a => a.center === r.center && a.species === r.species);
  return {
    w: ls.reduce((s, a) => s + (a.weight || 0), 0),
    v: ls.reduce((s, a) => s + (a.weight || 0) * (a.rate || 0), 0)
  };
};
export const rmStatus = (r, c) => c.w === 0 ? 'Pending' : c.w > r.weight ? 'Exceed' : c.w === r.weight ? 'Completed' : 'Partial';
export const billStatus = a => balanceOf(a) <= 0 ? 'Completed' : paidFor(a.no) > 0 ? 'Partial' : 'Pending';

// Auto-number generators with duplicate check
export const nextBookingNo = st => {
  const code = cCode(st);
  const pre = 'BK/' + code + '/' + FY + '/';
  const existing = bookings.filter(b => b.no && b.no.startsWith(pre));
  const maxSeq = existing.reduce((m, b) => {
    const parts = b.no.split('/');
    const seq = parseInt(parts[parts.length - 1], 10) || 0;
    return Math.max(m, seq);
  }, 0);
  return pre + String(maxSeq + 1).padStart(4, '0');
};

export const nextArrivalNo = c => {
  const code = cCode(c);
  const pre = code + '/' + FY + '/';
  const existing = arrivals.filter(a => a.no && a.no.startsWith(pre));
  const maxSeq = existing.reduce((m, a) => {
    const parts = a.no.split('/');
    const seq = parseInt(parts[parts.length - 1], 10) || 0;
    return Math.max(m, seq);
  }, 0);
  return pre + String(maxSeq + 1).padStart(4, '0');
};

// ============================================================================
// MAIN EXPORT OBJECT
// ============================================================================
export const PurchaseView = {
  // Expose store references
  M,
  bookings,
  rmArrivals,
  arrivals,
  payments,

  render(containerId, subPage = 'purchase-dashboard', activeHash = '#/purchase/dashboard/purchase-dashboard') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '<div id="purchase-subpage-content"></div>';
    const subContainer = document.getElementById('purchase-subpage-content');

    // Normalize route aliases
    const target = (subPage || '').toLowerCase();
    
    // Smooth transition
    if (target === 'purchase-dashboard' || target === 'rm-dashboard' || target === 'commercial-dashboard') {
      subContainer.innerHTML = Skeleton.renderDashboard();
    } else {
      subContainer.innerHTML = Skeleton.renderTable(6, 6);
    }

    setTimeout(() => {
      switch (target) {
        // Submenu: Dashboard
        case 'purchase-dashboard':
          this.renderPurchaseDashboard(subContainer);
          break;
        case 'rm-dashboard':
        case 'commercial-dashboard':
          this.renderRMDashboard(subContainer);
          break;

        // Submenu: Operations
        case 'bookings':
          isCreatingBooking = false;
          this.renderBookings(subContainer);
          break;
        case 'create-booking':
          // Contextual route handling - show form inside bookings
          isCreatingBooking = true;
          this.renderBookings(subContainer);
          break;
        case 'rm-arrivals':
        case 'rm-arrival':
          this.renderRMArrivals(subContainer);
          break;
        case 'arrivals':
          this.renderArrivals(subContainer);
          break;
        case 'lot-tracking':
        case 'lot-track':
          this.renderLotTracking(subContainer);
          break;

        // Submenu: Transactions & Bills
        case 'bills':
        case 'supplier-bills':
          activeBillForEdit = null;
          this.renderBills(subContainer);
          break;
        case 'rm-bill':
        case 'commercial-txns':
          // Contextual route handling - show respective bill inside bills
          if (!activeBillForEdit) activeBillForEdit = arrivals[0];
          this.renderBills(subContainer);
          break;

        // Submenu: Payments
        case 'payments':
        case 'bill-date-payment':
          this.renderPayments(subContainer);
          break;
        case 'payment-summary':
          this.renderPaymentSummary(subContainer);
          break;

        default:
          this.renderPurchaseDashboard(subContainer);
          break;
      }
    }, 100);
  },

  // =========================================================================
  // SUBMENU 1: DASHBOARD -> TAB 1: PURCHASE DASHBOARD (Client: pdashboard)
  // =========================================================================
  renderPurchaseDashboard(container) {
    let selectedStation = '';
    let selectedYear = 2026;
    let selectedMonth = 'October';

    const getLots = () => {
      const mo = monthIdx[selectedMonth];
      return arrivals.filter(a => {
        const d = new Date(a.billDate);
        return (!selectedStation || a.center === selectedStation) &&
          d.getFullYear() === selectedYear &&
          d.getMonth() === mo;
      });
    };

    const updateView = () => {
      const lots = getLots();
      const abLots = lots.filter(a => a.abStatus === 'POSITIVE').length;
      const retLots = lots.filter(a => a.returned).length;
      const borderLots = lots.filter(a => a.border).length;
      const gPendLots = lots.filter(a => !a.grading).length;
      const bPendLots = lots.filter(a => a.billPending).length;

      const clean = lots.filter(a => a.abStatus !== 'POSITIVE');
      const hon = clean.reduce((s, a) => s + (a.weight || 0), 0);
      const head = clean.reduce((s, a) => s + (a.dehead || 0), 0);
      const pack = clean.reduce((s, a) => s + (a.packed || 0), 0);
      const yieldPct = hon ? ((head / hon) * 100).toFixed(1) : '0';

      // KPI Grid
      const kpiContainer = document.getElementById('pdash-kpi-grid');
      if (kpiContainer) {
        kpiContainer.innerHTML = `
          ${Molecules.StatTile({
            label: 'Total Lots',
            value: lots.length,
            unit: 'Lots',
            badgeText: 'Active Intake',
            badgeTone: 'teal',
            icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`
          })}
          ${Molecules.StatTile({
            label: 'AB+ Lots',
            value: abLots,
            unit: 'Lots',
            badgeText: 'Lab Positive',
            badgeTone: 'ruby',
            icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`
          })}
          ${Molecules.StatTile({
            label: 'Return Lots',
            value: retLots,
            unit: 'Lots',
            badgeText: 'Rejected / Gate',
            badgeTone: 'amber',
            icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>`
          })}
          ${Molecules.StatTile({
            label: 'Border Counts',
            value: borderLots,
            unit: 'Lots',
            badgeText: 'Near Tolerance',
            badgeTone: 'sky',
            icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>`
          })}
          ${Molecules.StatTile({
            label: 'Grading Pendings',
            value: gPendLots,
            unit: 'Lots',
            badgeText: 'Floor Staged',
            badgeTone: 'teal',
            icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
          })}
          ${Molecules.StatTile({
            label: 'Bill Pendings',
            value: bPendLots,
            unit: 'Lots',
            badgeText: 'Unbilled',
            badgeTone: 'amber',
            icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`
          })}
        `;
      }

      // Metric Strip
      const metricStrip = document.getElementById('pdash-metric-strip');
      if (metricStrip) {
        metricStrip.innerHTML = `
          <div class="bg-white border border-[#E2E8F0] rounded-xl p-3.5 flex flex-col justify-center">
            <span class="text-xs text-[#64748B] font-semibold">Headless Details</span>
            <span class="text-lg font-bold text-[#0F172A] mt-0.5">${T(head)} <span class="text-xs font-medium text-[#64748B]">T</span></span>
          </div>
          <div class="bg-white border border-[#E2E8F0] rounded-xl p-3.5 flex flex-col justify-center">
            <span class="text-xs text-[#64748B] font-semibold">Hon Qty</span>
            <span class="text-lg font-bold text-[#0F172A] mt-0.5">${T(hon)} <span class="text-xs font-medium text-[#64748B]">T</span></span>
          </div>
          <div class="bg-white border border-[#E2E8F0] rounded-xl p-3.5 flex flex-col justify-center">
            <span class="text-xs text-[#64748B] font-semibold">Hon Packed</span>
            <span class="text-lg font-bold text-[#0F172A] mt-0.5">${T(pack)} <span class="text-xs font-medium text-[#64748B]">T</span></span>
          </div>
          <div class="bg-white border border-[#E2E8F0] rounded-xl p-3.5 flex flex-col justify-center">
            <span class="text-xs text-[#64748B] font-semibold">Avg Yield</span>
            <span class="text-lg font-bold text-[#056A38] mt-0.5">${yieldPct} <span class="text-xs font-medium text-[#64748B]">%</span></span>
          </div>
        `;
      }

      // Render Table: Production Details
      const tbProd = document.getElementById('pdash-tb-prod');
      if (tbProd) {
        tbProd.innerHTML = clean.length ? clean.map(a => `
          <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9]">
            <td class="px-4 py-2.5 font-bold text-[#0F172A]">${a.no}</td>
            <td class="px-4 py-2.5 text-[#334155]">${fmt(a.dehead, 3)}</td>
            <td class="px-4 py-2.5 text-[#334155]">${fmt(a.grading, 3)}</td>
            <td class="px-4 py-2.5 text-[#334155]">${fmt(a.va, 3)}</td>
            <td class="px-4 py-2.5 text-[#334155]">${fmt(a.soaking, 3)}</td>
            <td class="px-4 py-2.5 font-semibold text-[#056A38]">${fmt(a.packed, 3)}</td>
          </tr>
        `).join('') : `<tr><td colspan="6" class="text-center py-6 text-xs text-[#94A3B8]">No clean lots recorded for selected period</td></tr>`;
      }
    };

    container.innerHTML = `
      <div class="space-y-5 animate-fade-in">
        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Purchase Station</label>
              <select id="pdash-station-sel" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#006C7A] outline-none">
                <option value="">All Purchase Station</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Year</label>
              <select id="pdash-year-sel" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#006C7A] outline-none">
                <option value="2026" selected>2026</option>
                <option value="2025">2025</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Month</label>
              <select id="pdash-month-sel" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#006C7A] outline-none">
                <option value="October" selected>October</option>
                <option value="September">September</option>
                <option value="November">November</option>
              </select>
            </div>
            <div>
              <button id="pdash-search-btn" class="w-full h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search Records</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 6 KPI StatTiles -->
        <div id="pdash-kpi-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5"></div>

        <!-- Metric Strip -->
        <div id="pdash-metric-strip" class="grid grid-cols-2 md:grid-cols-4 gap-3.5"></div>

        <!-- Production Details Table Card -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#F1F5F9]">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <h3 class="text-sm font-bold text-[#0F172A]">Production Floor Details by Intake Lot</h3>
            </div>
            <span class="text-xs text-[#64748B]">Showing clean batches (AB- negative only)</span>
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th class="px-4 py-3">Lot Number</th>
                  <th class="px-4 py-3">Dehead (T)</th>
                  <th class="px-4 py-3">Grading (T)</th>
                  <th class="px-4 py-3">VA (T)</th>
                  <th class="px-4 py-3">Soaking (T)</th>
                  <th class="px-4 py-3">Packed (T)</th>
                </tr>
              </thead>
              <tbody id="pdash-tb-prod"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('pdash-search-btn')?.addEventListener('click', () => {
      selectedStation = document.getElementById('pdash-station-sel')?.value || '';
      selectedYear = parseInt(document.getElementById('pdash-year-sel')?.value || '2026', 10);
      selectedMonth = document.getElementById('pdash-month-sel')?.value || 'October';
      updateView();
      Toast.show('Purchase Dashboard filtered.', 'info');
    });

    updateView();
  },

  // =========================================================================
  // SUBMENU 1: DASHBOARD -> TAB 2: RM DASHBOARD (Client: RM DashBoard)
  // =========================================================================
  renderRMDashboard(container) {
    let fSpecies = '';
    let fCenter = '';
    let fPlant = '';
    let fFrom = '';
    let fTo = '';

    const getFilteredArrivals = () => {
      return arrivals.filter(a => {
        return (!fSpecies || a.species === fSpecies) &&
          (!fCenter || a.center === fCenter) &&
          (!fPlant || a.plant === fPlant) &&
          (!fFrom || a.date >= fFrom) &&
          (!fTo || a.date <= fTo);
      });
    };

    const updateView = () => {
      const rows = getFilteredArrivals();
      const sumSpecies = {};
      const sumPlant = {};
      const sumCenter = {};

      rows.forEach(a => {
        sumSpecies[a.species] = (sumSpecies[a.species] || 0) + (a.weight || 0);
        sumPlant[a.plant] = (sumPlant[a.plant] || 0) + (a.weight || 0);
        sumCenter[a.center] = (sumCenter[a.center] || 0) + (a.weight || 0);
      });

      const metricsContainer = document.getElementById('rmdash-metrics-grid');
      if (metricsContainer) {
        metricsContainer.innerHTML = `
          <div class="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs">
            <span class="text-xs font-bold text-[#475569] uppercase tracking-wider">Top Species Handled</span>
            <div class="mt-2 space-y-1.5 text-xs">
              ${Object.entries(sumSpecies).map(([k, v]) => `
                <div class="flex justify-between items-center py-1 border-b border-[#F1F5F9]">
                  <span class="font-medium text-[#334155]">${k}</span>
                  <span class="font-bold text-[#0F172A]">${T(v)} T</span>
                </div>
              `).join('') || '<span class="text-[#94A3B8]">No arrivals</span>'}
            </div>
          </div>

          <div class="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs">
            <span class="text-xs font-bold text-[#475569] uppercase tracking-wider">Plant Intake Distribution</span>
            <div class="mt-2 space-y-1.5 text-xs">
              ${Object.entries(sumPlant).map(([k, v]) => `
                <div class="flex justify-between items-center py-1 border-b border-[#F1F5F9]">
                  <span class="font-medium text-[#334155]">${k}</span>
                  <span class="font-bold text-[#006C7A]">${T(v)} T</span>
                </div>
              `).join('') || '<span class="text-[#94A3B8]">No arrivals</span>'}
            </div>
          </div>

          <div class="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs">
            <span class="text-xs font-bold text-[#475569] uppercase tracking-wider">Center Procurement Volume</span>
            <div class="mt-2 space-y-1.5 text-xs">
              ${Object.entries(sumCenter).slice(0, 4).map(([k, v]) => `
                <div class="flex justify-between items-center py-1 border-b border-[#F1F5F9]">
                  <span class="font-medium text-[#334155]">${k}</span>
                  <span class="font-bold text-[#056A38]">${T(v)} T</span>
                </div>
              `).join('') || '<span class="text-[#94A3B8]">No arrivals</span>'}
            </div>
          </div>
        `;
      }

      // Pending Table
      const tbPend = document.getElementById('rmdash-tb-pend');
      if (tbPend) {
        tbPend.innerHTML = rows.length ? rows.map(a => `
          <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9]">
            <td class="px-4 py-2.5 font-bold text-[#0F172A]">${a.no}</td>
            <td class="px-4 py-2.5 text-[#334155]">${fmt(a.weight, 3)} KG</td>
            <td class="px-4 py-2.5">
              <span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold ${a.abStatus === 'POSITIVE' ? 'bg-[#FEEFF1] text-[#B5152B] border border-[#F9B0BE]' : 'bg-[#EAFAF1] text-[#056A38] border border-[#A8E7C3]'}">
                ${a.abStatus}
              </span>
            </td>
            <td class="px-4 py-2.5 text-[#64748B]">${a.date}</td>
          </tr>
        `).join('') : `<tr><td colspan="4" class="text-center py-6 text-xs text-[#94A3B8]">No pending raw material lots found</td></tr>`;
      }
    };

    container.innerHTML = `
      <div class="space-y-5 animate-fade-in">
        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-6 gap-3.5 items-end text-xs">
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Species</label>
              <select id="rmdash-species-sel" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#006C7A] outline-none">
                <option value="">All Species</option>
                ${M.species.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Center</label>
              <select id="rmdash-center-sel" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#006C7A] outline-none">
                <option value="">All Centers</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Plant</label>
              <select id="rmdash-plant-sel" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white focus:border-[#006C7A] outline-none">
                <option value="">All Plants</option>
                ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">From Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="rmdash-from-date" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">To Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="rmdash-to-date" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <button id="rmdash-search-btn" class="flex-1 h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter</span>
              </button>
              <button id="rmdash-reset-btn" class="px-2.5 h-9 rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] text-xs font-bold cursor-pointer" title="Reset Filters">
                ↺
              </button>
            </div>
          </div>
        </div>

        <!-- 3 Breakdown Cards -->
        <div id="rmdash-metrics-grid" class="grid grid-cols-1 md:grid-cols-3 gap-4"></div>

        <!-- Production Details Table Card -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#F1F5F9]">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <h3 class="text-sm font-bold text-[#0F172A]">Raw Material Pending Intake Register</h3>
            </div>
            <span class="text-xs text-[#64748B]">Real-time lot status & QC screening</span>
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th class="px-4 py-3">Lot Number</th>
                  <th class="px-4 py-3">Arrival Qty</th>
                  <th class="px-4 py-3">AB Status</th>
                  <th class="px-4 py-3">Pending Since</th>
                </tr>
              </thead>
              <tbody id="rmdash-tb-pend"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('rmdash-search-btn')?.addEventListener('click', () => {
      fSpecies = document.getElementById('rmdash-species-sel')?.value || '';
      fCenter = document.getElementById('rmdash-center-sel')?.value || '';
      fPlant = document.getElementById('rmdash-plant-sel')?.value || '';
      fFrom = document.getElementById('rmdash-from-date')?.value || '';
      fTo = document.getElementById('rmdash-to-date')?.value || '';
      updateView();
      Toast.show('RM Dashboard updated.', 'info');
    });

    document.getElementById('rmdash-reset-btn')?.addEventListener('click', () => {
      if (document.getElementById('rmdash-species-sel')) document.getElementById('rmdash-species-sel').value = '';
      if (document.getElementById('rmdash-center-sel')) document.getElementById('rmdash-center-sel').value = '';
      if (document.getElementById('rmdash-plant-sel')) document.getElementById('rmdash-plant-sel').value = '';
      if (document.getElementById('rmdash-from-date')) document.getElementById('rmdash-from-date').value = '';
      if (document.getElementById('rmdash-to-date')) document.getElementById('rmdash-to-date').value = '';
      fSpecies = ''; fCenter = ''; fPlant = ''; fFrom = ''; fTo = '';
      updateView();
      Toast.show('Filters reset.', 'info');
    });

    updateView();
  },

  // =========================================================================
  // SUBMENU 2: OPERATIONS -> TAB 1: BOOKINGS LIST (Client: bookings)
  // Contextual behavior: Create Booking renders smoothly inside this tab on demand
  // =========================================================================
  renderBookings(container) {
    if (isCreatingBooking) {
      this.renderCreateBooking(container);
      return;
    }

    let fType = '';
    let fPlant = '';
    let fDate = '';

    const getFiltered = () => {
      return bookings.filter(b => {
        return (!fType || b.type === fType) &&
          (!fPlant || b.plant === fPlant) &&
          (!fDate || b.date === fDate);
      });
    };

    const renderRows = () => {
      const rows = getFiltered();
      const tb = document.getElementById('tb-bookings-body');
      if (!tb) return;

      tb.innerHTML = rows.length ? rows.map((b, i) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9]">
          <td class="px-3.5 py-3 text-[#64748B] font-semibold">${i + 1}</td>
          <td class="px-3.5 py-3 font-semibold text-[#0F172A]">${b.species}</td>
          <td class="px-3.5 py-3 font-bold text-[#006C7A]">${b.no}</td>
          <td class="px-3.5 py-3 text-[#334155]">${b.date}</td>
          <td class="px-3.5 py-3 text-[#475569]">${b.type}</td>
          <td class="px-3.5 py-3 text-[#475569]">${b.grader || '–'}</td>
          <td class="px-3.5 py-3 text-[#475569]">${b.agent || '–'}</td>
          <td class="px-3.5 py-3 text-[#334155] font-semibold">${b.count}</td>
          <td class="px-3.5 py-3 text-[#0F172A] font-bold">${fmt(b.weight, 2)} KG</td>
          <td class="px-3.5 py-3 text-[#056A38] font-bold">₹${fmt(b.rate)}</td>
          <td class="px-3.5 py-3">
            <div class="flex items-center gap-1.5">
              <button onclick="window.Toast.show('Booking details: ${b.no} at ${b.station}', 'info')" class="p-1 rounded text-[#006C7A] hover:bg-[#F0FAFC]" title="View">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
              <button onclick="if(confirm('Delete booking ${b.no}?')){ bookings = bookings.filter(x => x.no !== '${b.no}'); PurchaseView.renderBookings(document.getElementById('purchase-subpage-content')); Toast.show('Booking deleted', 'error'); }" class="p-1 rounded text-[#FF5150] hover:bg-[#FEF2F2]" title="Delete">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('') : `<tr><td colspan="11" class="text-center py-8 text-xs text-[#94A3B8]">No bookings recorded</td></tr>`;
    };

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Select Purchase Type</label>
              <select id="bk-f-type" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.types.map(t => `<option value="${t}">${t}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Select Arrival Plant</label>
              <select id="bk-f-plant" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="bk-f-date" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <button id="bk-search-btn" class="flex-1 h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
              <button id="bk-reset-btn" class="px-2.5 h-9 rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] text-xs font-bold cursor-pointer" title="Reset Filters">
                ↺
              </button>
            </div>
          </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-4 mb-3 border-b border-[#F1F5F9] flex-wrap gap-3">
            <div class="flex items-center gap-2.5">
              <button id="btn-open-create-booking" class="px-4 py-2 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                <span>New Booking</span>
              </button>
            </div>
            <input id="bk-search-input" type="text" placeholder="🔍 Search Bookings..." class="w-64 h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs outline-none focus:border-[#006C7A]">
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th class="px-3.5 py-3">S.No</th>
                  <th class="px-3.5 py-3">Species</th>
                  <th class="px-3.5 py-3">Booking Number</th>
                  <th class="px-3.5 py-3">Booking Date</th>
                  <th class="px-3.5 py-3">PurchaseType</th>
                  <th class="px-3.5 py-3">Grader</th>
                  <th class="px-3.5 py-3">Agent</th>
                  <th class="px-3.5 py-3">Booking Count</th>
                  <th class="px-3.5 py-3">Booking Weight</th>
                  <th class="px-3.5 py-3">Booking Rate</th>
                  <th class="px-3.5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody id="tb-bookings-body"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-open-create-booking')?.addEventListener('click', () => {
      isCreatingBooking = true;
      this.renderBookings(container);
    });

    document.getElementById('bk-search-btn')?.addEventListener('click', () => {
      fType = document.getElementById('bk-f-type')?.value || '';
      fPlant = document.getElementById('bk-f-plant')?.value || '';
      fDate = document.getElementById('bk-f-date')?.value || '';
      renderRows();
      Toast.show('Bookings filtered.', 'info');
    });

    document.getElementById('bk-f-date')?.addEventListener('change', () => {
      fDate = document.getElementById('bk-f-date')?.value || '';
      renderRows();
    });

    document.getElementById('bk-reset-btn')?.addEventListener('click', () => {
      if (document.getElementById('bk-f-type')) document.getElementById('bk-f-type').value = '';
      if (document.getElementById('bk-f-plant')) document.getElementById('bk-f-plant').value = '';
      if (document.getElementById('bk-f-date')) document.getElementById('bk-f-date').value = '';
      fType = ''; fPlant = ''; fDate = '';
      renderRows();
      Toast.show('Filters reset.', 'info');
    });

    document.getElementById('bk-search-input')?.addEventListener('input', e => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('#tb-bookings-body tr').forEach(tr => {
        tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });

    renderRows();
  },

  // =========================================================================
  // CREATE BOOKING (Sub-Screen under Bookings Tab)
  // =========================================================================
  renderCreateBooking(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in max-w-5xl">
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
          <div class="flex items-center justify-between pb-4 border-b border-[#F1F5F9] mb-5">
            <div>
              <h3 class="text-base font-bold text-[#0F172A]">Create Procurement Booking</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Booking Number manual (⟳ Auto available) with uniqueness check · Vehicle/Driver/Grader = free text with master suggestions</p>
            </div>
            <button id="btn-back-to-bookings" class="px-3.5 py-1.5 rounded-lg border border-[#CBD5E1] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC] cursor-pointer">
              ← Back to Bookings List
            </button>
          </div>

          <form id="form-create-booking" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Booking Station <span class="text-[#FF5150]">*</span></label>
                <select id="cb-station" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none focus:border-[#006C7A]">
                  <option value="">Select Center</option>
                  ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                </select>
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Species <span class="text-[#FF5150]">*</span></label>
                <select id="cb-species" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none focus:border-[#006C7A]">
                  <option value="">Select Species</option>
                  ${M.species.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Purchase Type <span class="text-[#FF5150]">*</span></label>
                <select id="cb-type" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none focus:border-[#006C7A]">
                  <option value="">Select Type</option>
                  ${M.types.map(t => `<option value="${t}">${t}</option>`).join('')}
                </select>
              </div>

              <div>
                <div class="flex justify-between items-center mb-1">
                  <label class="font-bold text-[#475569] uppercase tracking-wider">Booking Number <span class="text-[#FF5150]">*</span></label>
                  <button type="button" id="btn-auto-booking-no" class="text-[11px] font-bold text-[#006C7A] hover:underline cursor-pointer">⟳ Auto</button>
                </div>
                <input id="cb-no" type="text" required placeholder="BK/XXX/2627/0001" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] outline-none focus:border-[#006C7A]">
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Vehicle Number <span class="text-[#FF5150]">*</span></label>
                <input id="cb-vehicle" list="dl-vehicles" required placeholder="e.g. AP05TM2628" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
                <datalist id="dl-vehicles">${M.vehicles.map(v => `<option value="${v}">`).join('')}</datalist>
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Driver Name <span class="text-[#FF5150]">*</span></label>
                <input id="cb-driver" list="dl-drivers" required placeholder="e.g. RAMU K" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
                <datalist id="dl-drivers">${M.drivers.map(d => `<option value="${d}">`).join('')}</datalist>
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Grader Name <span class="text-[#FF5150]">*</span></label>
                <input id="cb-grader" list="dl-graders" required placeholder="e.g. K.PRASAD" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
                <datalist id="dl-graders">${M.graders.map(g => `<option value="${g}">`).join('')}</datalist>
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Booking Date <span class="text-[#FF5150]">*</span></label>
                <div class="erp-date-wrapper">
                  <input id="cb-date" type="text" required value="${TODAY}" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
                </div>
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Agent Name</label>
                <select id="cb-agent" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
                  <option value="">Select Agent</option>
                  ${M.agents.map(a => `<option value="${a}">${a}</option>`).join('')}
                </select>
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Farm Location <span class="text-[#FF5150]">*</span></label>
                <input id="cb-farm" type="text" required placeholder="Pond / Village details" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
              </div>

              <div class="col-span-2">
                <div class="flex justify-between items-center mb-1">
                  <label class="font-bold text-[#475569] uppercase tracking-wider">Suppliers <span class="text-[#FF5150]">*</span></label>
                  <button type="button" id="btn-new-supplier" class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#6366F1] text-white cursor-pointer">New Supplier</button>
                </div>
                <select id="cb-supplier" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
                  <option value="">Select Supplier</option>
                  ${M.suppliers.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
              </div>

              <div class="col-span-4">
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Remarks</label>
                <textarea id="cb-remarks" rows="2" placeholder="Quality benchmark, count notes, harvest timing..." class="w-full p-2.5 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]"></textarea>
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Booking Count</label>
                <input id="cb-count" type="number" step="any" placeholder="350" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Booking Weight (KGS)</label>
                <input id="cb-weight" type="number" step="any" placeholder="1000" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Booking Rate (₹)</label>
                <input id="cb-rate" type="number" step="any" placeholder="200" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
              </div>

              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Plant <span class="text-[#FF5150]">*</span></label>
                <select id="cb-plant" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
                  <option value="">Select Plant</option>
                  ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
              <button type="button" id="btn-close-create-booking" class="px-5 py-2 rounded-lg border border-[#CBD5E1] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC] cursor-pointer">
                Close
              </button>
              <button type="reset" class="px-5 py-2 rounded-lg border border-[#CBD5E1] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC]">
                Clear Form
              </button>
              <button type="submit" class="px-6 py-2 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold shadow-xs cursor-pointer">
                Save Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    const closeHandler = () => {
      isCreatingBooking = false;
      this.renderBookings(container);
    };

    document.getElementById('btn-back-to-bookings')?.addEventListener('click', closeHandler);
    document.getElementById('btn-close-create-booking')?.addEventListener('click', closeHandler);

    document.getElementById('btn-auto-booking-no')?.addEventListener('click', () => {
      const st = document.getElementById('cb-station')?.value || 'ADDARIPETA FARMS';
      const no = nextBookingNo(st);
      const input = document.getElementById('cb-no');
      if (input) input.value = no;
      Toast.show(`Auto generated booking no: ${no}`, 'info');
    });

    document.getElementById('btn-new-supplier')?.addEventListener('click', () => {
      PurchaseView.openSupplierModal();
    });

    document.getElementById('form-create-booking')?.addEventListener('submit', e => {
      e.preventDefault();
      const no = document.getElementById('cb-no')?.value.trim();
      if (!no) {
        Toast.show('Booking number is required', 'error');
        return;
      }
      if (bookings.some(b => b.no === no)) {
        Toast.show(`Booking number ${no} already exists! Use unique number.`, 'error');
        return;
      }

      const newBooking = {
        sNo: bookings.length + 1,
        no,
        date: document.getElementById('cb-date')?.value || TODAY,
        station: document.getElementById('cb-station')?.value || '',
        species: document.getElementById('cb-species')?.value || '',
        type: document.getElementById('cb-type')?.value || '',
        supplier: document.getElementById('cb-supplier')?.value || '',
        vehicle: document.getElementById('cb-vehicle')?.value || '',
        driver: document.getElementById('cb-driver')?.value || '',
        grader: document.getElementById('cb-grader')?.value || '',
        agent: document.getElementById('cb-agent')?.value || '',
        farm: document.getElementById('cb-farm')?.value || '',
        count: parseFloat(document.getElementById('cb-count')?.value || '0'),
        weight: parseFloat(document.getElementById('cb-weight')?.value || '0'),
        rate: parseFloat(document.getElementById('cb-rate')?.value || '0'),
        plant: document.getElementById('cb-plant')?.value || '',
        remarks: document.getElementById('cb-remarks')?.value || ''
      };

      bookings.unshift(newBooking);
      Toast.show(`Booking ${no} created successfully!`, 'success');
      closeHandler();
    });
  },

  // =========================================================================
  // SUBMENU 2: OPERATIONS -> TAB 2: RM ARRIVAL (Client: rmarrival)
  // =========================================================================
  renderRMArrivals(container) {
    const renderTable = () => {
      const tb = document.getElementById('tb-rmarrival-body');
      if (!tb) return;

      tb.innerHTML = rmArrivals.length ? rmArrivals.map((r, i) => {
        const c = rmConsumed(r);
        const balW = r2(r.weight - c.w);
        const balAmt = r2(r.amount - c.v);
        const st = rmStatus(r, c);
        const avgRt = r.weight ? (r.amount / r.weight).toFixed(2) : '0.00';
        const stBadge = st === 'Completed' ? 'bg-[#EAFAF1] text-[#056A38]' :
          st === 'Exceed' ? 'bg-[#FEEFF1] text-[#B5152B]' :
          st === 'Partial' ? 'bg-[#E0F2FE] text-[#0369A1]' : 'bg-[#FFF9E6] text-[#824D00]';

        return `
          <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9]">
            <td class="px-3.5 py-3 font-semibold text-[#64748B]">${i + 1}</td>
            <td class="px-3.5 py-3 text-[#334155]">${r.date}</td>
            <td class="px-3.5 py-3 text-[#334155]">${r.plant}</td>
            <td class="px-3.5 py-3 text-[#334155] font-semibold">${r.center}</td>
            <td class="px-3.5 py-3 text-[#0F172A] font-semibold">${r.species}</td>
            <td class="px-3.5 py-3 font-bold text-[#0F172A]">${fmt(r.weight)} KG</td>
            <td class="px-3.5 py-3 font-bold ${balW < 0 ? 'text-[#FF5150]' : 'text-[#006C7A]'}">${fmt(balW)} KG</td>
            <td class="px-3.5 py-3">
              <span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold border border-current ${stBadge}">
                ${st}
              </span>
            </td>
            <td class="px-3.5 py-3 text-[#334155]">₹${avgRt}</td>
            <td class="px-3.5 py-3 font-semibold text-[#0F172A]">₹${fmt(r.amount)}</td>
            <td class="px-3.5 py-3 font-bold text-[#056A38]">₹${fmt(balAmt)}</td>
            <td class="px-3.5 py-3">
              <button onclick="window.Toast.show('RM Arrival Report Downloaded', 'success')" class="text-[#006C7A] hover:underline font-bold text-xs">
                ⬇ Report
              </button>
            </td>
          </tr>
        `;
      }).join('') : `<tr><td colspan="12" class="text-center py-8 text-xs text-[#94A3B8]">No RM Arrivals recorded</td></tr>`;
    };

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Input Form Card -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-3 border-b border-[#F1F5F9] mb-4">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Expected Inbound Lots Intake</h3>
              <p class="text-xs text-[#64748B]">Average Rate = Amount ÷ Weight · balances consumed automatically by physical Arrivals</p>
            </div>
          </div>

          <form id="form-rm-arrival" class="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs items-end">
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Intake Date</label>
              <div class="erp-date-wrapper">
                <input id="ra-date" type="text" value="${TODAY}" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
              </div>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Company</label>
              <select id="ra-company" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
                ${M.companies.map(c => `<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Species</label>
              <select id="ra-species" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
                <option value="">Select Species</option>
                ${M.species.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Processing Plant</label>
              <select id="ra-plant" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
                <option value="">Select Plant</option>
                ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Procurement Center</label>
              <select id="ra-center" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
                <option value="">Select Center</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Expected Weight (KG)</label>
              <input id="ra-weight" type="number" step="any" placeholder="1000" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Expected Amount (₹)</label>
              <input id="ra-amount" type="number" step="any" placeholder="200000" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
            </div>
            <div>
              <button type="submit" class="w-full h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs cursor-pointer">
                Submit RM Arrival
              </button>
            </div>
          </form>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#F1F5F9]">
            <h3 class="text-sm font-bold text-[#0F172A]">Raw Material Expected vs Consumed Balances</h3>
            <div class="flex items-center gap-2">
              <button onclick="window.Toast.show('Downloading RM Table...', 'info')" class="px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC]">
                ⬇ Download Table
              </button>
            </div>
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th class="px-3.5 py-3">SNO</th>
                  <th class="px-3.5 py-3">Date</th>
                  <th class="px-3.5 py-3">Plant</th>
                  <th class="px-3.5 py-3">Center</th>
                  <th class="px-3.5 py-3">Species</th>
                  <th class="px-3.5 py-3">Weight</th>
                  <th class="px-3.5 py-3">Balance Weight</th>
                  <th class="px-3.5 py-3">Status</th>
                  <th class="px-3.5 py-3">Avg Rate</th>
                  <th class="px-3.5 py-3">Amount</th>
                  <th class="px-3.5 py-3">Balance Amount</th>
                  <th class="px-3.5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody id="tb-rmarrival-body"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('form-rm-arrival')?.addEventListener('submit', e => {
      e.preventDefault();
      const weight = parseFloat(document.getElementById('ra-weight')?.value || '0');
      const amount = parseFloat(document.getElementById('ra-amount')?.value || '0');
      const center = document.getElementById('ra-center')?.value;
      const species = document.getElementById('ra-species')?.value;
      const plant = document.getElementById('ra-plant')?.value;

      if (!weight || !amount || !center || !species || !plant) {
        Toast.show('Please fill required RM fields', 'error');
        return;
      }

      rmArrivals.unshift({
        sNo: rmArrivals.length + 1,
        date: document.getElementById('ra-date')?.value || TODAY,
        company: document.getElementById('ra-company')?.value || 'DEVI FISHERIES LIMITED',
        species,
        plant,
        center,
        weight,
        amount
      });

      Toast.show('RM Arrival recorded successfully', 'success');
      renderTable();
    });

    renderTable();
  },

  // =========================================================================
  // SUBMENU 2: OPERATIONS -> TAB 3: ARRIVALS REGISTER (Client: arrivals)
  // =========================================================================
  renderArrivals(container) {
    let fCenter = '';
    let fSupplier = '';
    let fPlant = '';
    let fDate = '';

    const getFiltered = () => {
      return arrivals.filter(a => {
        return (!fCenter || a.center === fCenter) &&
          (!fSupplier || a.supplier === fSupplier) &&
          (!fPlant || a.plant === fPlant) &&
          (!fDate || a.date === fDate);
      });
    };

    const renderTable = () => {
      const rows = getFiltered();
      const tb = document.getElementById('tb-arrivals-body');
      const tFoot = document.getElementById('tb-arrivals-foot');
      if (!tb) return;

      const totWeight = rows.reduce((s, a) => s + (a.weight || 0), 0);
      const totAmt = rows.reduce((s, a) => s + ((a.weight || 0) * (a.rate || 0)), 0);

      tb.innerHTML = rows.length ? rows.map((a, i) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9]">
          <td class="px-3.5 py-3 text-[#64748B] font-semibold">${i + 1}</td>
          <td class="px-3.5 py-3 font-bold text-[#006C7A]">${a.no}</td>
          <td class="px-3.5 py-3 text-[#334155]">${a.date}</td>
          <td class="px-3.5 py-3 text-[#334155]">${a.plant}</td>
          <td class="px-3.5 py-3 text-[#475569]">${a.type}</td>
          <td class="px-3.5 py-3 text-[#0F172A] font-semibold">${a.supplier}</td>
          <td class="px-3.5 py-3 text-[#475569]">${a.grader || '–'}</td>
          <td class="px-3.5 py-3 text-[#475569]">${a.agent || '–'}</td>
          <td class="px-3.5 py-3 text-[#334155] font-semibold">${a.count}</td>
          <td class="px-3.5 py-3 text-[#0F172A] font-bold">${fmt(a.weight, 2)} KG</td>
          <td class="px-3.5 py-3 text-[#056A38] font-bold">₹${fmt(a.rate)}</td>
          <td class="px-3.5 py-3 font-bold text-[#0F172A]">₹${fmt((a.weight || 0) * (a.rate || 0))}</td>
          <td class="px-3.5 py-3">
            <div class="flex items-center gap-1.5">
              <button onclick="PurchaseView.openRMBillEdit('${a.no}')" class="p-1 rounded text-[#006C7A] hover:bg-[#F0FAFC]" title="Edit RM Bill">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>
              <button onclick="if(confirm('Delete arrival ${a.no}?')){ arrivals = arrivals.filter(x => x.no !== '${a.no}'); PurchaseView.renderArrivals(document.getElementById('purchase-subpage-content')); Toast.show('Arrival deleted', 'error'); }" class="p-1 rounded text-[#FF5150] hover:bg-[#FEF2F2]" title="Delete">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('') : `<tr><td colspan="13" class="text-center py-8 text-xs text-[#94A3B8]">No physical arrivals found</td></tr>`;

      if (tFoot) {
        tFoot.innerHTML = `
          <tr class="bg-[#F8FAFC] font-bold text-[#0F172A] border-t-2 border-[#CBD5E1]">
            <td colspan="9" class="px-3.5 py-3 text-right uppercase text-[11px] tracking-wider text-[#475569]">Total Receipts:</td>
            <td class="px-3.5 py-3 text-[#0F172A]">${fmt(totWeight, 2)} KG</td>
            <td class="px-3.5 py-3"></td>
            <td class="px-3.5 py-3 text-[#056A38]">₹${fmt(totAmt)}</td>
            <td class="px-3.5 py-3"></td>
          </tr>
        `;
      }
    };

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-3.5 items-end text-xs">
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Center</label>
              <select id="ar-f-center" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">Select Center</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Supplier</label>
              <select id="ar-f-supplier" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">Select Supplier</option>
                ${M.suppliers.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Plant</label>
              <select id="ar-f-plant" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">Select Arrival Plant</option>
                ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="ar-f-date" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <button id="ar-search-btn" class="flex-1 h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter</span>
              </button>
              <button id="ar-reset-btn" class="px-2.5 h-9 rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] text-xs font-bold cursor-pointer" title="Reset Filters">
                ↺
              </button>
            </div>
          </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-4 mb-3 border-b border-[#F1F5F9] flex-wrap gap-3">
            <div class="flex items-center gap-2">
              <button id="btn-create-arrival-open" class="px-4 py-2 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                <span>New Arrival</span>
              </button>
              <button onclick="window.Toast.show('Exporting Arrivals to Excel...', 'info')" class="px-3.5 py-2 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC]">
                ⬇ Download Excel
              </button>
            </div>
            <input id="ar-search-input" type="text" placeholder="🔍 Search receipts..." class="w-64 h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs outline-none focus:border-[#006C7A]">
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th class="px-3.5 py-3">S.No</th>
                  <th class="px-3.5 py-3">Arrival Number</th>
                  <th class="px-3.5 py-3">Arrival Date</th>
                  <th class="px-3.5 py-3">Arrival Plant</th>
                  <th class="px-3.5 py-3">Purchase Type</th>
                  <th class="px-3.5 py-3">Supplier</th>
                  <th class="px-3.5 py-3">Grader</th>
                  <th class="px-3.5 py-3">Agent</th>
                  <th class="px-3.5 py-3">Arrival Count</th>
                  <th class="px-3.5 py-3">Arrival Weight</th>
                  <th class="px-3.5 py-3">Arrival Rate</th>
                  <th class="px-3.5 py-3">Total Amt</th>
                  <th class="px-3.5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody id="tb-arrivals-body"></tbody>
              <tfoot id="tb-arrivals-foot"></tfoot>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('ar-search-btn')?.addEventListener('click', () => {
      fCenter = document.getElementById('ar-f-center')?.value || '';
      fSupplier = document.getElementById('ar-f-supplier')?.value || '';
      fPlant = document.getElementById('ar-f-plant')?.value || '';
      fDate = document.getElementById('ar-f-date')?.value || '';
      renderTable();
      Toast.show('Arrivals filtered.', 'info');
    });

    document.getElementById('ar-f-date')?.addEventListener('change', () => {
      fDate = document.getElementById('ar-f-date')?.value || '';
      renderTable();
    });

    document.getElementById('ar-reset-btn')?.addEventListener('click', () => {
      if (document.getElementById('ar-f-center')) document.getElementById('ar-f-center').value = '';
      if (document.getElementById('ar-f-supplier')) document.getElementById('ar-f-supplier').value = '';
      if (document.getElementById('ar-f-plant')) document.getElementById('ar-f-plant').value = '';
      if (document.getElementById('ar-f-date')) document.getElementById('ar-f-date').value = '';
      fCenter = ''; fSupplier = ''; fPlant = ''; fDate = '';
      renderTable();
      Toast.show('Filters reset.', 'info');
    });

    document.getElementById('ar-search-input')?.addEventListener('input', e => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('#tb-arrivals-body tr').forEach(tr => {
        tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });

    document.getElementById('btn-create-arrival-open')?.addEventListener('click', () => {
      PurchaseView.openCreateArrivalModal();
    });

    renderTable();
  },

  // =========================================================================
  // SUBMENU 2: OPERATIONS -> TAB 4: LOTTRACK (Client: lottrack)
  // =========================================================================
  renderLotTracking(container) {
    let selectedStation = '';
    let selectedYear = 2026;
    let selectedMonth = 'October';

    const getLots = () => {
      const mo = monthIdx[selectedMonth];
      return arrivals.filter(a => {
        const d = new Date(a.billDate);
        return (!selectedStation || a.center === selectedStation) &&
          d.getFullYear() === selectedYear &&
          d.getMonth() === mo;
      });
    };

    const renderTable = () => {
      const rows = getLots();
      const tb = document.getElementById('tb-lot-body');
      if (!tb) return;

      tb.innerHTML = rows.length ? rows.map(a => {
        const bdCls = a.abStatus === 'POSITIVE' ? 'bg-[#FEEFF1] text-[#B5152B] border-[#F9B0BE]' :
          a.abStatus === 'NEGATIVE' ? 'bg-[#EAFAF1] text-[#056A38] border-[#A8E7C3]' : 'bg-[#FFF9E6] text-[#824D00] border-[#F7DA94]';
        return `
          <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9]">
            <td class="px-3.5 py-3 font-semibold text-[#64748B]">${a.id}</td>
            <td class="px-3.5 py-3 text-[#334155]">${a.billDate}</td>
            <td class="px-3.5 py-3 font-bold text-[#006C7A]">${a.no}</td>
            <td class="px-3.5 py-3 text-[#0F172A] font-bold">${fmt(a.weight, 2)} KG</td>
            <td class="px-3.5 py-3">
              <span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold border ${bdCls}">
                ${a.abStatus}
              </span>
            </td>
            <td class="px-3.5 py-3 text-[#334155]">${fmt(a.dehead, 3)}</td>
            <td class="px-3.5 py-3 text-[#334155]">${fmt(a.grading, 3)}</td>
            <td class="px-3.5 py-3 text-[#334155]">${fmt(a.va, 3)}</td>
            <td class="px-3.5 py-3 text-[#334155]">${fmt(a.soaking, 3)}</td>
            <td class="px-3.5 py-3 font-semibold text-[#056A38]">${fmt(a.packed, 3)}</td>
          </tr>
        `;
      }).join('') : `<tr><td colspan="10" class="text-center py-8 text-xs text-[#94A3B8]">No lots in pipeline</td></tr>`;
    };

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Purchase Station</label>
              <select id="lt-station" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All Purchase Station</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Month</label>
              <select id="lt-month" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="October" selected>October</option>
                <option value="September">September</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">Year</label>
              <select id="lt-year" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] bg-white outline-none">
                <option value="2026" selected>2026</option>
                <option value="2025">2025</option>
              </select>
            </div>
            <div>
              <button id="lt-search-btn" class="w-full h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter Pipeline</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-4 mb-3 border-b border-[#F1F5F9] flex-wrap gap-3">
            <div class="flex items-center gap-2">
              <button id="btn-lt-copy" class="px-3.5 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-bold text-[#006C7A] hover:bg-[#F0FAFC] flex items-center gap-1 cursor-pointer">
                ⧉ Copy TSV
              </button>
              <button onclick="window.Toast.show('Downloading Excel...', 'info')" class="px-3.5 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC]">
                ⬇ Excel
              </button>
              <button onclick="window.Toast.show('Downloading PDF...', 'info')" class="px-3.5 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC]">
                ⬇ PDF
              </button>
            </div>
            <input id="lt-search-input" type="text" placeholder="🔍 Search pipeline..." class="w-64 h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs outline-none focus:border-[#006C7A]">
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table id="tbl-lot-table" class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th class="px-3.5 py-3">ID</th>
                  <th class="px-3.5 py-3">Arrival Date</th>
                  <th class="px-3.5 py-3">Lot Number</th>
                  <th class="px-3.5 py-3">Arrival Qty</th>
                  <th class="px-3.5 py-3">Ab Status</th>
                  <th class="px-3.5 py-3">Deheading Qty</th>
                  <th class="px-3.5 py-3">Grading Qty</th>
                  <th class="px-3.5 py-3">VA Qty</th>
                  <th class="px-3.5 py-3">Soaking Qty</th>
                  <th class="px-3.5 py-3">Packed Qty</th>
                </tr>
              </thead>
              <tbody id="tb-lot-body"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('lt-search-btn')?.addEventListener('click', () => {
      selectedStation = document.getElementById('lt-station')?.value || '';
      selectedYear = parseInt(document.getElementById('lt-year')?.value || '2026', 10);
      selectedMonth = document.getElementById('lt-month')?.value || 'October';
      renderTable();
      Toast.show('LotTrack pipeline updated.', 'info');
    });

    document.getElementById('btn-lt-copy')?.addEventListener('click', () => {
      const table = document.getElementById('tbl-lot-table');
      if (!table) return;
      const rows = [...table.querySelectorAll('tr')];
      const tsv = rows.map(r => [...r.cells].map(c => c.textContent.trim()).join('\\t')).join('\\n');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(tsv).then(() => {
          Toast.show('Table copied to clipboard (TSV format)!', 'success');
        });
      }
    });

    renderTable();
  },

  // =========================================================================
  // SUBMENU 3: TRANSACTIONS & BILLS -> TAB 1: BILLS (Client: bills)
  // Contextual behavior: Tapping any transaction row or clicking ✏️ opens RM Bill right here
  // =========================================================================
  openRMBillEdit(billNo) {
    const a = arrivals.find(x => x.no === billNo);
    if (!a) {
      Toast.show('Arrival record not found', 'error');
      return;
    }
    activeBillForEdit = a;
    const subContainer = document.getElementById('purchase-subpage-content');
    if (subContainer) {
      this.renderBills(subContainer);
    }
  },

  renderBills(container) {
    if (activeBillForEdit) {
      this.renderRMBill(container);
      return;
    }

    let fType = '';
    let fPlant = '';
    let fSupplier = '';
    let fAgent = '';
    let fStatus = '';
    let fFrom = '';
    let fTo = '';

    const getFiltered = () => {
      return arrivals.filter(a => {
        const s = billStatus(a);
        return (!fType || a.type === fType) &&
          (!fPlant || a.plant === fPlant) &&
          (!fSupplier || a.supplier === fSupplier) &&
          (!fAgent || a.agent === fAgent) &&
          (!fStatus || s === fStatus) &&
          (!fFrom || a.date >= fFrom) &&
          (!fTo || a.date <= fTo);
      });
    };

    const renderTable = () => {
      const rows = getFiltered();
      const showCompletedActions = (fStatus === 'Completed' && rows.length > 0);
      const pdfBtns = document.getElementById('bills-pdf-btns');
      if (pdfBtns) {
        pdfBtns.style.display = showCompletedActions ? 'flex' : 'none';
      }

      const tb = document.getElementById('tb-bills-body');
      const thChk = document.getElementById('th-bill-chk');
      if (thChk) {
        thChk.style.display = showCompletedActions ? '' : 'none';
      }

      if (!tb) return;

      tb.innerHTML = rows.length ? rows.map((a, i) => {
        const st = billStatus(a);
        const stBadge = st === 'Completed' ? 'bg-[#EAFAF1] text-[#056A38]' :
          st === 'Partial' ? 'bg-[#E0F2FE] text-[#0369A1]' : 'bg-[#FFF9E6] text-[#824D00]';

        return `
          <tr onclick="PurchaseView.openRMBillEdit('${a.no}')" class="hover:bg-[#F0FAFC] transition-colors border-b border-[#F1F5F9] cursor-pointer" title="Click to view RM Bill info">
            ${showCompletedActions ? `<td class="px-3.5 py-3" onclick="event.stopPropagation()"><input type="checkbox" class="bill-row-chk rounded text-[#006C7A]"></td>` : ''}
            <td class="px-3.5 py-3 font-semibold text-[#64748B]">${i + 1}</td>
            <td class="px-3.5 py-3 font-bold text-[#006C7A]">${a.no}</td>
            <td class="px-3.5 py-3 text-[#334155]">${a.date}</td>
            <td class="px-3.5 py-3 font-semibold text-[#0F172A]">${a.supplier}</td>
            <td class="px-3.5 py-3 text-[#475569]">${a.agent || '–'}</td>
            <td class="px-3.5 py-3 text-[#334155] font-semibold">${fmt(a.count)}</td>
            <td class="px-3.5 py-3 text-[#0F172A] font-bold">${fmt(a.weight, 2)} KG</td>
            <td class="px-3.5 py-3 text-[#056A38] font-bold">₹${fmt(grossOf(a))}</td>
            <td class="px-3.5 py-3">
              <span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold border border-current ${stBadge}">
                ${st}
              </span>
            </td>
            <td class="px-3.5 py-3" onclick="event.stopPropagation()">
              <div class="flex items-center gap-1.5">
                <button onclick="PurchaseView.openRMBillEdit('${a.no}')" class="p-1 rounded text-[#006C7A] hover:bg-[#E0F2FE]" title="View & Edit RM Bill">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </button>
                <button onclick="window.Toast.show('Printing bill ${a.no}...', 'info')" class="p-1 rounded text-[#475569] hover:bg-[#F8FAFC]" title="Print">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('') : `<tr><td colspan="11" class="text-center py-8 text-xs text-[#94A3B8]">No bills found matching filters</td></tr>`;
    };

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-6 gap-3 items-end text-xs">
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Purchase Type</label>
              <select id="bl-f-type" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.types.map(t => `<option value="${t}">${t}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Plant</label>
              <select id="bl-f-plant" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Supplier</label>
              <select id="bl-f-supplier" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.suppliers.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">From Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="bl-f-from" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">To Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="bl-f-to" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <div class="flex-1">
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Status</label>
                <select id="bl-f-status" class="w-full h-9 px-2 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                  <option value="">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Partial">Partial</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <button id="bl-search-btn" class="h-9 px-3 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer" style="margin-top: 18px;" title="Filter Bills">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter</span>
              </button>
              <button id="bl-reset-btn" class="h-9 px-2.5 rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] text-xs font-bold cursor-pointer" style="margin-top: 18px;" title="Reset Filters">
                ↺
              </button>
            </div>
          </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-4 mb-3 border-b border-[#F1F5F9] flex-wrap gap-3">
            <div id="bills-pdf-btns" class="items-center gap-2" style="display:none;">
              <button onclick="window.Toast.show('Downloading Commission Bills PDF...', 'success')" class="px-3 py-1.5 rounded-lg bg-[#006C7A] text-white text-xs font-bold shadow-xs">
                ⬇ Commission Bills PDF
              </button>
              <button onclick="window.Toast.show('Downloading Consolidated Bills PDF...', 'success')" class="px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC]">
                ⬇ Bills PDF
              </button>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-[#64748B]">Tip: Tap any transaction row to view respective RM Bill info. Checkboxes & bulk PDF exports appear when <b>Status = Completed</b>.</span>
            </div>
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th id="th-bill-chk" class="px-3.5 py-3" style="display:none;"><input type="checkbox"></th>
                  <th class="px-3.5 py-3">S.No</th>
                  <th class="px-3.5 py-3">Arrival Number</th>
                  <th class="px-3.5 py-3">Arrival Date</th>
                  <th class="px-3.5 py-3">Supplier</th>
                  <th class="px-3.5 py-3">Agent</th>
                  <th class="px-3.5 py-3">Arrival Count</th>
                  <th class="px-3.5 py-3">Arrival Weight</th>
                  <th class="px-3.5 py-3">Total Bill Amount</th>
                  <th class="px-3.5 py-3">Status</th>
                  <th class="px-3.5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody id="tb-bills-body"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('bl-search-btn')?.addEventListener('click', () => {
      fType = document.getElementById('bl-f-type')?.value || '';
      fPlant = document.getElementById('bl-f-plant')?.value || '';
      fSupplier = document.getElementById('bl-f-supplier')?.value || '';
      fStatus = document.getElementById('bl-f-status')?.value || '';
      renderTable();
      Toast.show('Bills register updated.', 'info');
    });

    renderTable();
  },

  // =========================================================================
  // RM BILL (Sub-Screen under Bills Tab)
  // Header frozen from Arrival · editable: Addition/Deduction per KG, Rate, Remarks
  // =========================================================================
  renderRMBill(container) {
    const a = activeBillForEdit || arrivals[0];
    if (!a) {
      container.innerHTML = '<div class="p-6 text-center text-xs text-[#94A3B8]">Select a bill from the Bills table to edit</div>';
      return;
    }

    const calcTotal = () => {
      const rt = parseFloat(document.getElementById('rb-rate')?.value || '0');
      const addDed = parseFloat(document.getElementById('rb-addded')?.value || '0');
      const totalVal = r2((a.weight || 0) * rt + (a.weight || 0) * addDed);
      const totalEl = document.getElementById('rb-total-val');
      if (totalEl) totalEl.textContent = '₹' + fmt(totalVal);
    };

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in max-w-5xl">
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
          <div class="flex items-center justify-between pb-4 border-b border-[#F1F5F9] mb-5">
            <div>
              <h3 class="text-base font-bold text-[#0F172A]">RM Bill Details — ${a.no}</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Header frozen from Arrival · editable: Addition/Deduction per KG, Rate, Remarks</p>
            </div>
            <button id="btn-back-to-bills" class="px-3.5 py-1.5 rounded-lg border border-[#CBD5E1] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC] cursor-pointer">
              ← Back to Bills Register
            </button>
          </div>

          <!-- Frozen Header Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-5 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Species</span><p class="font-bold text-[#0F172A] mt-0.5">${a.species}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Purchase Station</span><p class="font-bold text-[#0F172A] mt-0.5">${a.center}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Processing Plant</span><p class="font-bold text-[#0F172A] mt-0.5">${a.plant}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Purchase Type</span><p class="font-bold text-[#0F172A] mt-0.5">${a.type}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Bill / Arrival Number</span><p class="font-bold text-[#006C7A] mt-0.5">${a.no}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Vehicle Number</span><p class="font-semibold text-[#334155] mt-0.5">${a.vehicle || 'AP39UF7171'}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Driver Name</span><p class="font-semibold text-[#334155] mt-0.5">${a.driver || 'SOMU N'}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Grader Name</span><p class="font-semibold text-[#334155] mt-0.5">${a.grader || 'M.RAO'}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Purchase Date</span><p class="font-semibold text-[#334155] mt-0.5">${a.billDate}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Agent Name</span><p class="font-semibold text-[#334155] mt-0.5">${a.agent || '–'}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Farm Location</span><p class="font-semibold text-[#334155] mt-0.5">${a.farm || a.center}</p></div>
            <div><span class="text-[#64748B] font-bold uppercase text-[10.5px]">Supplier Name</span><p class="font-bold text-[#0F172A] mt-0.5">${a.supplier}</p></div>
          </div>

          <!-- Editable Fields -->
          <form id="form-rm-bill-edit" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Addition/Deduction Per KG (₹) <span class="text-[#FF5150]">*</span></label>
                <input id="rb-addded" type="number" step="any" value="${a.addDed || 0}" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
              </div>
              <div>
                <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Remarks</label>
                <input id="rb-remarks" type="text" placeholder="Adjustment notes..." value="${a.remarks || ''}" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
              </div>
            </div>

            <!-- Variety Line Items Grid -->
            <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl mt-4">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                    <th class="px-3.5 py-3">S.No</th>
                    <th class="px-3.5 py-3">Variety</th>
                    <th class="px-3.5 py-3">Count</th>
                    <th class="px-3.5 py-3">Weight (KG)</th>
                    <th class="px-3.5 py-3">Master Rate</th>
                    <th class="px-3.5 py-3">Harvest Com. Rate</th>
                    <th class="px-3.5 py-3">Billing Rate (₹)</th>
                    <th class="px-3.5 py-3">Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-[#F1F5F9]">
                    <td class="px-3.5 py-3 font-semibold text-[#64748B]">1</td>
                    <td class="px-3.5 py-3 font-bold text-[#0F172A]">${a.variety || 'HEAD ON'}</td>
                    <td class="px-3.5 py-3">${a.count}</td>
                    <td class="px-3.5 py-3 font-bold text-[#0F172A]">${fmt(a.weight, 2)}</td>
                    <td class="px-3.5 py-3 text-[#64748B]">₹${fmt(a.rate)}</td>
                    <td class="px-3.5 py-3 text-[#64748B]">₹${fmt(a.harvest || 0)}</td>
                    <td class="px-3.5 py-3">
                      <input id="rb-rate" type="number" step="any" value="${a.rate}" class="w-24 h-8 px-2 rounded border border-[#E2E8F0] font-bold text-[#006C7A] outline-none focus:border-[#006C7A]">
                    </td>
                    <td id="rb-total-val" class="px-3.5 py-3 font-bold text-[#056A38]">₹${fmt(grossOf(a))}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
              <button type="button" id="btn-cancel-rm-bill" class="px-5 py-2 rounded-lg border border-[#CBD5E1] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC] cursor-pointer">
                Cancel
              </button>
              <button type="submit" class="px-6 py-2 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold shadow-xs cursor-pointer">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    const closeBillHandler = () => {
      activeBillForEdit = null;
      this.renderBills(container);
    };

    document.getElementById('btn-back-to-bills')?.addEventListener('click', closeBillHandler);
    document.getElementById('btn-cancel-rm-bill')?.addEventListener('click', closeBillHandler);

    document.getElementById('rb-rate')?.addEventListener('input', calcTotal);
    document.getElementById('rb-addded')?.addEventListener('input', calcTotal);

    document.getElementById('form-rm-bill-edit')?.addEventListener('submit', e => {
      e.preventDefault();
      a.rate = parseFloat(document.getElementById('rb-rate')?.value || '0');
      a.addDed = parseFloat(document.getElementById('rb-addded')?.value || '0');
      a.remarks = document.getElementById('rb-remarks')?.value || '';

      Toast.show(`RM Bill ${a.no} revised! New Act Bill ₹${fmt(billAmtOf(a))}`, 'success');
      closeBillHandler();
    });
  },

  // =========================================================================
  // SUBMENU 4: PAYMENTS -> TAB 1: PAYMENTS (Client: payments)
  // Act Bill = Gross − TDS(0.1%) · Balance = Act Bill − Already Paid · tick rows to enable Pay
  // =========================================================================
  renderPayments(container) {
    let fCenter = '';
    let fSupplier = '';
    let fAgent = '';
    let fType = '';

    const getFiltered = () => {
      return arrivals.filter(a => {
        return (!fCenter || a.center === fCenter) &&
          (!fSupplier || a.supplier === fSupplier) &&
          (!fAgent || a.agent === fAgent) &&
          (!fType || (fType === 'Final' && !a.billPending) || (fType === 'Interim' && a.billPending));
      });
    };

    const renderTable = () => {
      const rows = getFiltered();
      const tb = document.getElementById('tb-payments-body');
      if (!tb) return;

      tb.innerHTML = rows.length ? rows.map((a, i) => {
        const actBill = billAmtOf(a);
        const paid = paidFor(a.no);
        const bal = balanceOf(a);

        return `
          <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9]">
            <td class="px-3.5 py-3">
              <input type="checkbox" data-bill-no="${a.no}" class="pay-bill-chk rounded text-[#006C7A]">
            </td>
            <td class="px-3.5 py-3 font-semibold text-[#64748B]">${i + 1}</td>
            <td class="px-3.5 py-3 font-bold text-[#006C7A]">${a.no}</td>
            <td class="px-3.5 py-3 text-[#334155]">${a.billDate}</td>
            <td class="px-3.5 py-3 text-[#475569]">${a.agent || '–'}</td>
            <td class="px-3.5 py-3 text-[#0F172A] font-bold">₹${fmt(actBill)}</td>
            <td class="px-3.5 py-3 text-[#056A38] font-bold">₹${fmt(paid)}</td>
            <td class="px-3.5 py-3 font-bold text-[#B5152B]">₹${fmt(bal)}</td>
          </tr>
        `;
      }).join('') : `<tr><td colspan="8" class="text-center py-8 text-xs text-[#94A3B8]">No pending bills eligible for payment</td></tr>`;

      updatePayBtnState();
    };

    const updatePayBtnState = () => {
      const checked = document.querySelectorAll('.pay-bill-chk:checked');
      const btn = document.getElementById('btn-action-pay');
      if (btn) {
        btn.disabled = checked.length === 0;
        btn.classList.toggle('opacity-50', checked.length === 0);
        btn.classList.toggle('cursor-not-allowed', checked.length === 0);
      }
    };

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-6 gap-3 items-end text-xs">
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Center</label>
              <select id="pay-f-center" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Supplier</label>
              <select id="pay-f-supplier" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.suppliers.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Agent</label>
              <select id="pay-f-agent" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.agents.map(a => `<option value="${a}">${a}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Payment Type</label>
              <select id="pay-f-type" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                <option value="Interim">Interim</option>
                <option value="Final">Final</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="pay-f-date" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <button id="pay-search-btn" class="flex-1 h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
              <button id="pay-reset-btn" class="px-2.5 h-9 rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] text-xs font-bold cursor-pointer" title="Reset Filters">
                ↺
              </button>
            </div>
          </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-4 mb-3 border-b border-[#F1F5F9] flex-wrap gap-3">
            <div class="flex items-center gap-2">
              <button id="btn-action-pay" disabled class="px-5 py-2 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 opacity-50 cursor-not-allowed">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                <span>Pay Selected Bills</span>
              </button>
            </div>
            <span class="text-xs text-[#64748B]">Act Bill = Gross − TDS (0.1%) · Select rows to activate payment disbursal</span>
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th class="px-3.5 py-3"><input type="checkbox" id="chk-pay-all"></th>
                  <th class="px-3.5 py-3">S No</th>
                  <th class="px-3.5 py-3">Bill No</th>
                  <th class="px-3.5 py-3">Bill Dates</th>
                  <th class="px-3.5 py-3">Agent</th>
                  <th class="px-3.5 py-3">Act Bill</th>
                  <th class="px-3.5 py-3">Already Paid</th>
                  <th class="px-3.5 py-3">Balance</th>
                </tr>
              </thead>
              <tbody id="tb-payments-body"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('pay-search-btn')?.addEventListener('click', () => {
      fCenter = document.getElementById('pay-f-center')?.value || '';
      fSupplier = document.getElementById('pay-f-supplier')?.value || '';
      fAgent = document.getElementById('pay-f-agent')?.value || '';
      fType = document.getElementById('pay-f-type')?.value || '';
      renderTable();
      Toast.show('Payment records filtered.', 'info');
    });

    document.getElementById('chk-pay-all')?.addEventListener('change', e => {
      document.querySelectorAll('.pay-bill-chk').forEach(c => c.checked = e.target.checked);
      updatePayBtnState();
    });

    document.getElementById('tb-payments-body')?.addEventListener('change', e => {
      if (e.target.classList.contains('pay-bill-chk')) {
        updatePayBtnState();
      }
    });

    document.getElementById('btn-action-pay')?.addEventListener('click', () => {
      const checkedBoxes = [...document.querySelectorAll('.pay-bill-chk:checked')];
      const selected = checkedBoxes.map(cb => arrivals.find(a => a.no === cb.dataset.billNo)).filter(Boolean);
      if (selected.length) {
        PurchaseView.openPayModal(selected);
      }
    });

    renderTable();
  },

  // =========================================================================
  // SUBMENU 4: PAYMENTS -> TAB 2: PAYMENTS SUMMARY (Client: psummary)
  // One row per voucher · Amount = cash-out paid through that voucher
  // =========================================================================
  renderPaymentSummary(container) {
    let fCenter = '';
    let fSupplier = '';
    let fAgent = '';
    let fMode = '';

    const getFiltered = () => {
      return payments.filter(py => {
        return (!fCenter || py.center === fCenter) &&
          (!fAgent || py.agent === fAgent) &&
          (!fMode || py.mode === fMode) &&
          (!fSupplier || py.lines.some(l => {
            const a = arrivals.find(x => x.no === l.no);
            return a && a.supplier === fSupplier;
          }));
      });
    };

    const renderTable = () => {
      const rows = getFiltered();
      const tb = document.getElementById('tb-psummary-body');
      if (!tb) return;

      tb.innerHTML = rows.length ? rows.map((py, i) => `
        <tr class="hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9]">
          <td class="px-3.5 py-3 text-[#64748B] font-semibold">${i + 1}</td>
          <td class="px-3.5 py-3 text-[#334155]">${py.date}</td>
          <td class="px-3.5 py-3 text-[#334155] font-semibold">${py.center}</td>
          <td class="px-3.5 py-3 text-[#475569]">${py.agent || '–'}</td>
          <td class="px-3.5 py-3 font-semibold text-[#0F172A]">${py.mode}</td>
          <td class="px-3.5 py-3 font-bold text-[#006C7A]">${py.voucher}</td>
          <td class="px-3.5 py-3 text-[#475569]">${py.lines.map(l => l.no).join(', ')}</td>
          <td class="px-3.5 py-3 font-bold text-[#056A38]">₹${fmt(py.total)}</td>
          <td class="px-3.5 py-3">
            <div class="flex items-center gap-1.5">
              <button onclick="window.Toast.show('Voucher ${py.voucher} details loaded', 'info')" class="p-1 rounded text-[#006C7A] hover:bg-[#F0FAFC]" title="View">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
              <button onclick="if(confirm('Delete voucher ${py.voucher}? Balances will be restored!')){ payments = payments.filter(p => p.voucher !== '${py.voucher}'); PurchaseView.renderPaymentSummary(document.getElementById('purchase-subpage-content')); Toast.show('Voucher deleted and balances restored', 'error'); }" class="p-1 rounded text-[#FF5150] hover:bg-[#FEF2F2]" title="Delete">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('') : `<tr><td colspan="9" class="text-center py-8 text-xs text-[#94A3B8]">No payment vouchers recorded</td></tr>`;
    };

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Filter Header -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          <div class="grid grid-cols-1 md:grid-cols-6 gap-3 items-end text-xs">
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Center</label>
              <select id="ps-f-center" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Supplier</label>
              <select id="ps-f-supplier" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                ${M.suppliers.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Payment Mode</label>
              <select id="ps-f-mode" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
                <option value="">All</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="NEFT">NEFT</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">From Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="ps-f-from" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">To Date</label>
              <div class="erp-date-wrapper">
                <input type="text" id="ps-f-to" placeholder="YYYY-MM-DD" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-semibold text-[#0F172A] bg-white outline-none">
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <button id="ps-search-btn" class="flex-1 h-9 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Filter</span>
              </button>
              <button id="ps-reset-btn" class="px-2.5 h-9 rounded-lg border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] text-xs font-bold cursor-pointer" title="Reset Filters">
                ↺
              </button>
            </div>
          </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-4 mb-3 border-b border-[#F1F5F9] flex-wrap gap-3">
            <h3 class="text-sm font-bold text-[#0F172A]">Payment Vouchers Audit Register</h3>
            <button onclick="window.Toast.show('Exporting Payment Summary...', 'info')" class="px-3.5 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC]">
              ⬇ Download Excel
            </button>
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th class="px-3.5 py-3">S.No</th>
                  <th class="px-3.5 py-3">Pay Date</th>
                  <th class="px-3.5 py-3">Center</th>
                  <th class="px-3.5 py-3">Agent</th>
                  <th class="px-3.5 py-3">Mode</th>
                  <th class="px-3.5 py-3">Voucher</th>
                  <th class="px-3.5 py-3">Bills Covered</th>
                  <th class="px-3.5 py-3">Amount</th>
                  <th class="px-3.5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody id="tb-psummary-body"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('ps-search-btn')?.addEventListener('click', () => {
      fCenter = document.getElementById('ps-f-center')?.value || '';
      fSupplier = document.getElementById('ps-f-supplier')?.value || '';
      fAgent = document.getElementById('ps-f-agent')?.value || '';
      fMode = document.getElementById('ps-f-mode')?.value || '';
      renderTable();
      Toast.show('Payment Summary filtered.', 'info');
    });

    renderTable();
  },

  // =========================================================================
  // MODALS & HELPERS
  // =========================================================================
  openSupplierModal() {
    Modal.open({
      title: 'Create New Supplier (Financier)',
      content: `
        <div class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Supplier Name <span class="text-[#FF5150]">*</span></label>
            <input id="modal-sp-name" type="text" placeholder="e.g. BALAJI AQUA FARMS" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
          </div>
          <div>
            <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Vendor Code / GSTIN</label>
            <input id="modal-sp-code" type="text" placeholder="e.g. 37AABCB1234F1Z1" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
          </div>
          <div>
            <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Phone</label>
            <input id="modal-sp-phone" type="text" placeholder="+91 98480 12345" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]">
          </div>
          <div>
            <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Address</label>
            <textarea id="modal-sp-addr" rows="2" placeholder="Center locality..." class="w-full p-2.5 rounded-lg border border-[#E2E8F0] outline-none focus:border-[#006C7A]"></textarea>
          </div>
        </div>
      `,
      confirmText: 'Save Supplier',
      onConfirm: () => {
        const name = document.getElementById('modal-sp-name')?.value.trim();
        const code = document.getElementById('modal-sp-code')?.value.trim();
        if (!name) {
          Toast.show('Supplier name is required', 'error');
          return false;
        }
        const full = code ? `${name}-${code}` : name;
        M.suppliers.push(full);
        Toast.show(`Supplier "${name}" added to masters!`, 'success');
        return true;
      }
    });
  },

  openPayModal(selectedBills) {
    if (!selectedBills || !selectedBills.length) return;
    const center = selectedBills[0]?.center || 'ADDARIPETA FARMS';
    const initialMode = 'Cash';
    const prefix = 'C' + cCode(center);
    const voucherNo = prefix + String(payments.filter(p => p.voucher.startsWith(prefix)).length + 1).padStart(2, '0');

    let rowsHtml = selectedBills.map(a => {
      const g = grossOf(a);
      const t = tdsOf(a);
      const ba = billAmtOf(a);
      const pd = paidFor(a.no);
      const bal = r2(ba - pd);

      return `
        <tr data-bill-no="${a.no}" class="border-b border-[#F1F5F9]">
          <td class="px-3 py-2 font-bold text-[#006C7A]">${a.no}</td>
          <td class="px-3 py-2 text-[#475569]">${a.billDate}</td>
          <td class="px-3 py-2 text-[#0F172A] font-semibold">${a.supplier}</td>
          <td class="px-3 py-2 text-[#334155]">₹${fmt(g)}</td>
          <td class="px-3 py-2 text-[#FF5150]">₹${fmt(t)}</td>
          <td class="px-3 py-2 font-bold text-[#0F172A]">₹${fmt(ba)}</td>
          <td class="px-3 py-2 text-[#056A38]">₹${fmt(pd)}</td>
          <td class="px-3 py-2 font-bold text-[#B5152B]">₹${fmt(bal)}</td>
          <td class="px-3 py-2">
            <input type="number" step="any" data-max-bal="${bal}" value="${bal}" class="modal-pay-input w-24 h-8 px-2 rounded border border-[#E2E8F0] font-bold text-[#006C7A] outline-none">
          </td>
          <td class="modal-pay-rem px-3 py-2 font-semibold text-[#64748B]">₹0.00</td>
        </tr>
      `;
    }).join('');

    Modal.open({
      title: `Bill Payment Settlement Mode — ${TODAY}`,
      content: `
        <div class="space-y-4 text-xs">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Payment Mode</label>
              <select id="modal-pay-mode" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-bold text-[#0F172A] outline-none">
                <option value="Cash" selected>Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="NEFT">NEFT</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Voucher Number</label>
              <input id="modal-pay-voucher" readonly value="${voucherNo}" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] font-bold text-[#006C7A]">
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Cheque / NEFT Ref No</label>
              <input id="modal-pay-ref" placeholder="UTR or Cheque No" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none">
            </div>
          </div>

          <div class="overflow-x-auto border border-[#E2E8F0] rounded-xl max-h-60">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th class="px-3 py-2.5">Bill No</th>
                  <th class="px-3 py-2.5">Bill Date</th>
                  <th class="px-3 py-2.5">Supplier</th>
                  <th class="px-3 py-2.5">Gross</th>
                  <th class="px-3 py-2.5">TDS (0.1%)</th>
                  <th class="px-3 py-2.5">Bill Amt</th>
                  <th class="px-3 py-2.5">Paid</th>
                  <th class="px-3 py-2.5">Balance</th>
                  <th class="px-3 py-2.5">Amount (₹)</th>
                  <th class="px-3 py-2.5">Remainings</th>
                </tr>
              </thead>
              <tbody>${rowsHtml}</tbody>
            </table>
          </div>

          <div>
            <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Payment Comments</label>
            <input id="modal-pay-comments" placeholder="Settlement notes..." class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none">
          </div>
        </div>
      `,
      confirmText: 'Save Payment Voucher',
      onConfirm: () => {
        const mode = document.getElementById('modal-pay-mode')?.value || 'Cash';
        const ref = document.getElementById('modal-pay-ref')?.value.trim() || '';
        const voucher = document.getElementById('modal-pay-voucher')?.value || voucherNo;
        const comments = document.getElementById('modal-pay-comments')?.value.trim() || '';

        if (mode !== 'Cash' && ref.length < 5) {
          Toast.show('Please enter a valid Cheque / NEFT reference number (min 5 chars)', 'error');
          return false;
        }

        const lines = [];
        document.querySelectorAll('.modal-pay-input').forEach(inp => {
          const amt = parseFloat(inp.value || '0');
          const tr = inp.closest('tr');
          const no = tr.dataset.billNo;
          if (amt > 0) {
            lines.push({ no, amount: amt });
          }
        });

        if (!lines.length) {
          Toast.show('Payment amount cannot be zero', 'error');
          return false;
        }

        const totalPaid = r2(lines.reduce((s, l) => s + l.amount, 0));
        payments.push({
          voucher,
          mode,
          date: TODAY,
          center,
          agent: selectedBills[0]?.agent || '',
          cheque: ref,
          comments,
          lines,
          total: totalPaid
        });

        Toast.show(`Payment saved! Voucher ${voucher} created for ₹${fmt(totalPaid)}`, 'success');
        PurchaseView.renderPayments(document.getElementById('purchase-subpage-content'));
        return true;
      }
    });

    // Handle dynamic live remainings calculation
    document.querySelectorAll('.modal-pay-input').forEach(inp => {
      inp.addEventListener('input', () => {
        const tr = inp.closest('tr');
        const maxBal = parseFloat(inp.dataset.maxBal || '0');
        let amt = parseFloat(inp.value || '0');
        if (amt > maxBal) {
          amt = maxBal;
          inp.value = maxBal;
        }
        const rem = r2(maxBal - amt);
        const remEl = tr.querySelector('.modal-pay-rem');
        if (remEl) remEl.textContent = '₹' + fmt(rem);
      });
    });
  },

  openCreateArrivalModal() {
    const center = 'ADDARIPETA FARMS';
    const arrivalNo = nextArrivalNo(center);

    Modal.open({
      title: 'Create Inward Arrival Receipt',
      content: `
        <div class="space-y-4 text-xs">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Center Name <span class="text-[#FF5150]">*</span></label>
              <select id="ma-center" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none">
                ${M.centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Plant <span class="text-[#FF5150]">*</span></label>
              <select id="ma-plant" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none">
                ${M.plants.map(p => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Number <span class="text-[#FF5150]">*</span></label>
              <input id="ma-no" value="${arrivalNo}" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-bold text-[#006C7A]">
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Date <span class="text-[#FF5150]">*</span></label>
              <div class="erp-date-wrapper">
                <input id="ma-date" type="text" value="${TODAY}" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none">
              </div>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Bill Date <span class="text-[#FF5150]">*</span></label>
              <div class="erp-date-wrapper">
                <input id="ma-billdate" type="text" value="${TODAY}" class="erp-date-input w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none">
              </div>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Species <span class="text-[#FF5150]">*</span></label>
              <select id="ma-species" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none">
                ${M.species.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Supplier <span class="text-[#FF5150]">*</span></label>
              <select id="ma-supplier" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none">
                ${M.suppliers.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Weight (KG) <span class="text-[#FF5150]">*</span></label>
              <input id="ma-weight" type="number" step="any" placeholder="1000" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none">
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Arrival Rate (₹) <span class="text-[#FF5150]">*</span></label>
              <input id="ma-rate" type="number" step="any" placeholder="200" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none">
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Count</label>
              <input id="ma-count" type="number" step="any" placeholder="50" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] outline-none">
            </div>
            <div>
              <label class="block font-bold text-[#475569] uppercase tracking-wider mb-1">Purchase Type</label>
              <select id="ma-type" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-medium outline-none">
                ${M.types.map(t => `<option value="${t}">${t}</option>`).join('')}
              </select>
            </div>
          </div>
        </div>
      `,
      confirmText: 'Save Arrival Record',
      onConfirm: () => {
        const no = document.getElementById('ma-no')?.value.trim();
        const weight = parseFloat(document.getElementById('ma-weight')?.value || '0');
        const rate = parseFloat(document.getElementById('ma-rate')?.value || '0');
        if (!no || !weight || !rate) {
          Toast.show('Please fill required arrival fields', 'error');
          return false;
        }

        const newArr = {
          id: Date.now(),
          no,
          billDate: TODAY,
          date: TODAY,
          center: document.getElementById('ma-center')?.value || center,
          plant: document.getElementById('ma-plant')?.value || 'DFL UNIT-2 (KKD)',
          type: document.getElementById('ma-type')?.value || 'Site Weightment',
          supplier: document.getElementById('ma-supplier')?.value || M.suppliers[0],
          grader: '',
          agent: '',
          species: document.getElementById('ma-species')?.value || 'COD',
          variety: 'HEAD ON',
          count: parseFloat(document.getElementById('ma-count')?.value || '50'),
          weight,
          rate,
          harvest: 0,
          addDed: 0,
          abStatus: 'Test Pending',
          dehead: 0,
          grading: 0,
          va: 0,
          soaking: 0,
          packed: 0,
          billPending: true,
          border: false,
          returned: false,
          farm: document.getElementById('ma-center')?.value || center,
          supervisor: '',
          driver: '',
          vehicle: ''
        };

        arrivals.unshift(newArr);
        Toast.show(`Arrival receipt ${no} registered!`, 'success');
        PurchaseView.renderArrivals(document.getElementById('purchase-subpage-content'));
        return true;
      }
    });
  },

  showLotTraceabilityDrawer(lot) {
    Toast.show(`Lot traceability drawer opened for ${lot.lotNumber || lot.no || 'Lot'}`, 'info');
  }
};
''')

if __name__ == '__main__':
    main()
