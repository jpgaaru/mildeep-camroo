// Purchase Module — Canonical State & Masters
// Real-World Production Fisheries ERP Purchase Module (Client v3 Final Specification)
// DFL Production Architecture: Canonical Masters, Live 0.1% TDS Math, Dynamic Balance Consumption, Auto-Numbering, and Contextual Sub-Screens

import { ERP_DATA } from '../../../data/mockData.js';
import { DataTable } from '../../../components/table.js';
import { Charts } from '../../../components/charts.js';
import { Modal } from '../../../components/modal.js';
import { Toast } from '../../../components/toast.js';
import { TabBar } from '../../../components/tabBar.js';
import { Skeleton } from '../../../components/skeleton.js';
import { renderEmptyState } from '../../../components/emptyState.js';
import { Molecules } from '../../../framework/index.js';
import { Environment } from '../../../framework/Environment.js';

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
// CANONICAL DATA STORE (Environment Segregation & State Isolation)
// ============================================================================
export const BASELINE_BOOKINGS = [
  { sNo: 1, no: 'BK/ADP/2627/0001', date: '2026-10-05', station: 'ADDARIPETA FARMS', species: 'COD', type: 'Site Weightment', supplier: 'K.GOPAL NAIDU', vehicle: 'AP05TM2628', driver: 'RAMU K', grader: 'K.PRASAD', agent: 'R.SURESH', farm: 'ADDARIPETA FARMS', count: 350, weight: 1000, rate: 200, plant: 'DFL UNIT-2 (KKD)', remarks: 'Dock verified' },
  { sNo: 2, no: 'BK/AVN/2627/0002', date: '2026-10-04', station: 'A.V.NAGARAM FARMS', species: 'LITOPENAEUS VANNAMEI', type: 'Site Weightment', supplier: 'K.GOPAL NAIDU', vehicle: 'AP39UF7171', driver: 'SOMU N', grader: 'M.RAO', agent: '', farm: 'NAGARAM', count: 50, weight: 500, rate: 200, plant: 'DFL UNIT-2 (KKD)', remarks: 'Grade A locked' }
];

export const BASELINE_RM_ARRIVALS = [
  { sNo: 1, date: '2026-10-06', company: 'DEVI FISHERIES LIMITED', species: 'COD', plant: 'DFL UNIT-2 (KKD)', center: 'ADDARIPETA FARMS', weight: 1000, amount: 200000 },
  { sNo: 2, date: '2026-10-06', company: 'DEVI FISHERIES LIMITED', species: 'LITOPENAEUS VANNAMEI', plant: 'DFL UNIT-2 (KKD)', center: 'A.V.NAGARAM FARMS', weight: 500, amount: 25000 }
];

export const BASELINE_ARRIVALS = [
  { id: 153934, no: 'BLS/2627/0143', billDate: '2026-10-01', date: '2026-10-01', center: 'BALASORE', plant: 'DFL UNIT-2 (KKD)', type: 'Site Weightment', supplier: 'K.GOPAL NAIDU', grader: '', agent: '', species: 'COD', variety: 'HO-COD', count: 160, weight: 400, rate: 180, harvest: 0, addDed: 0, abStatus: 'Test Pending', dehead: 0, grading: 0, va: 0, soaking: 0, packed: 0, billPending: true, border: false, returned: false, farm: 'BALASORE', supervisor: '', driver: '', vehicle: '' },
  { id: 153935, no: 'NLR/2627/0256', billDate: '2026-10-01', date: '2026-10-01', center: 'NELLORE', plant: 'DFL UNIT-1 (VSP)', type: 'Site Weightment', supplier: 'ADITYA AQUA FARMS', grader: '', agent: '', species: 'LITOPENAEUS VANNAMEI', variety: 'HEAD ON', count: 40, weight: 40000, rate: 450, harvest: 0, addDed: 0, abStatus: 'POSITIVE', dehead: 0, grading: 0, va: 0, soaking: 0, packed: 0, billPending: true, border: false, returned: false, farm: 'NELLORE', supervisor: '', driver: '', vehicle: '' },
  { id: 153938, no: 'AVN/2627/1234', billDate: '2026-10-04', date: '2026-10-06', center: 'A.V.NAGARAM FARMS', plant: 'DFL UNIT-2 (KKD)', type: 'Site Weightment', supplier: 'K.GOPAL NAIDU', grader: '', agent: '', species: 'LITOPENAEUS VANNAMEI', variety: 'HEAD ON', count: 50, weight: 50, rate: 200, harvest: 0, addDed: 0, abStatus: 'Test Pending', dehead: 4, grading: 0, va: 0, soaking: 0, packed: 0, billPending: false, border: true, returned: false, farm: 'NAGARAM', supervisor: '', driver: '', vehicle: '' },
  { id: 153939, no: 'ADP/2627/0019', billDate: '2026-10-05', date: '2026-10-06', center: 'ADDARIPETA FARMS', plant: 'DFL UNIT-2 (KKD)', type: 'Site Weightment', supplier: 'G.BALAKRISHNA (KP KODADA)-BMDPG7516B', grader: '', agent: '', species: 'COD', variety: 'HO-COD', count: 12, weight: 500, rate: 200, harvest: 0, addDed: 0, abStatus: 'Test Pending', dehead: 0.9, grading: 0, va: 0, soaking: 0, packed: 0, billPending: false, border: false, returned: false, farm: 'ADDARIPETA FARMS', supervisor: '', driver: '', vehicle: '' },
  { id: 153940, no: 'ADP/2627/0020', billDate: '2026-10-05', date: '2026-10-06', center: 'ADDARIPETA FARMS', plant: 'DFL UNIT-2 (KKD)', type: 'Site Weightment', supplier: 'K.GOPAL NAIDU', grader: '', agent: '', species: 'COD', variety: 'HO-COD', count: 100, weight: 150, rate: 45, harvest: 0, addDed: 0, abStatus: 'Test Pending', dehead: 0, grading: 0, va: 0, soaking: 0, packed: 0, billPending: false, border: false, returned: false, farm: 'ADDARIPETA FARMS', supervisor: '', driver: '', vehicle: '' },
  { id: 153941, no: 'ADP/2627/0018', billDate: '2026-10-05', date: '2026-10-06', center: 'ADDARIPETA FARMS', plant: 'DFL UNIT-2 (KKD)', type: 'Site Weightment', supplier: 'K.GOPAL NAIDU', grader: '', agent: '', species: 'COD', variety: 'HO-COD', count: 80, weight: 200, rate: 200, harvest: 0, addDed: 0, abStatus: 'Test Pending', dehead: 0, grading: 0, va: 0, soaking: 0, packed: 0, billPending: false, border: false, returned: false, farm: 'ADDARIPETA FARMS', supervisor: '', driver: '', vehicle: '' },
  { id: 153942, no: 'ADP/2627/0021', billDate: '2026-10-05', date: '2026-10-06', center: 'ADDARIPETA FARMS', plant: 'DFL UNIT-2 (KKD)', type: 'Site Weightment', supplier: 'L.G SEA FOODS(D HARIBABU)', grader: '', agent: '', species: 'COD', variety: 'HO-COD', count: 350, weight: 350, rate: 200, harvest: 0, addDed: 0, abStatus: 'Test Pending', dehead: 0, grading: 0, va: 0, soaking: 0, packed: 0, billPending: false, border: false, returned: false, farm: 'ADDARIPETA FARMS', supervisor: '', driver: '', vehicle: '' }
];

export const BASELINE_PAYMENTS = [
  { voucher: 'CADP01', mode: 'Cash', date: '2026-10-05', center: 'ADDARIPETA FARMS', agent: '', cheque: '', comments: 'advance', lines: [{ no: 'ADP/2627/0020', amount: 5000 }], total: 5000 }
];

export const reloadPurchaseStore = () => {
  bookings = Environment.getStore('bookings', BASELINE_BOOKINGS);
  rmArrivals = Environment.getStore('rmArrivals', BASELINE_RM_ARRIVALS);
  arrivals = Environment.getStore('arrivals', BASELINE_ARRIVALS);
  payments = Environment.getStore('payments', BASELINE_PAYMENTS);
  return { bookings, rmArrivals, arrivals, payments };
};

export let bookings = Environment.getStore('bookings', BASELINE_BOOKINGS);
export let rmArrivals = Environment.getStore('rmArrivals', BASELINE_RM_ARRIVALS);
export let arrivals = Environment.getStore('arrivals', BASELINE_ARRIVALS);
export let payments = Environment.getStore('payments', BASELINE_PAYMENTS);

// Active contextual state
export let isCreatingBooking = false;
export let activeBillForEdit = null;

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

