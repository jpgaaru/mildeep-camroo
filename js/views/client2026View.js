// Client 2026 — Authentic Purchase & Operations React Application Adapter
// Faithful implementation of the React/TypeScript suite located in Downloads/Client 2026
// Uses the compiled SCSS styling rules from client-2026.css

import { Toast } from '../components/toast.js';

// Initial Mock Datasets from Client 2026 source files
const INITIAL_BOOKINGS = [
  {
    id: 1,
    serialNumber: 1,
    species: "Vannamei Shrimp",
    bookingNumber: "PB-2026-089",
    bookingDate: "2026-10-04",
    purchaseType: "Direct Farmer Procurement",
    grader: "B. Venkatesh",
    agent: "Coastal Marine Agency",
    bookingCount: "40 Count",
    bookingWeight: 2000,
    bookingValue: 480000,
    bookingRate: 440,
    arrivalPlant: "Kakinada",
    bookingStation: "Kakinada",
    vehicleNumber: "AP 37 TE 4821",
    driverName: "G. Narayana",
    farmLocation: "Bhimavaram Cluster #4 / Pond",
    supplier: "Direct Farmer",
    remarks: "Morning harvest, iced properly"
  },
  {
    id: 2,
    serialNumber: 2,
    species: "Black Tiger Shrimp",
    bookingNumber: "PB-2026-092",
    bookingDate: "2026-10-03",
    purchaseType: "Hatchery Buyback Contract",
    grader: "K. Ramu",
    agent: "Sagar Marine Brokers",
    bookingCount: "20 Count",
    bookingWeight: 3500,
    bookingValue: 650000,
    bookingRate: 620,
    arrivalPlant: "Nellore",
    bookingStation: "Nellore",
    vehicleNumber: "AP 39 TX 1046",
    driverName: "R. Suresh",
    farmLocation: "Nellore Brackish Cluster",
    supplier: "Sagar Marine Hatcheries",
    remarks: "Premium grade black tiger"
  },
  {
    id: 3,
    serialNumber: 3,
    species: "Vannamei Shrimp",
    bookingNumber: "PB-2026-095",
    bookingDate: "2026-10-05",
    purchaseType: "Direct Farmer Procurement",
    grader: "M. Nagesh",
    agent: "Direct Farmer",
    bookingCount: "50 Count",
    bookingWeight: 4000,
    bookingValue: 390000,
    bookingRate: 380,
    arrivalPlant: "Bhimavaram",
    bookingStation: "Bhimavaram",
    vehicleNumber: "AP 05 TA 2268",
    driverName: "M. Ravi",
    farmLocation: "Krishna Delta Pond #2",
    supplier: "Direct Farmer",
    remarks: "Standard count intake"
  },
  {
    id: 4,
    serialNumber: 4,
    species: "Vannamei Shrimp",
    bookingNumber: "PB-2026-102",
    bookingDate: "2026-10-08",
    purchaseType: "Agent Procurement Order",
    grader: "B. Venkatesh",
    agent: "Delta Seafood Associates",
    bookingCount: "30 Count",
    bookingWeight: 3200,
    bookingValue: 420000,
    bookingRate: 460,
    arrivalPlant: "Kakinada",
    bookingStation: "Kakinada",
    vehicleNumber: "AP 37 TE 8812",
    driverName: "K. Appa Rao",
    farmLocation: "Amalapuram Sector A",
    supplier: "Delta Seafood Associates",
    remarks: "High freshness score"
  },
  {
    id: 5,
    serialNumber: 5,
    species: "Vannamei Shrimp",
    bookingNumber: "PB-2026-105",
    bookingDate: "2026-10-09",
    purchaseType: "Direct Farmer Procurement",
    grader: "G. Suribabu",
    agent: "Direct Farmer",
    bookingCount: "45 Count",
    bookingWeight: 2800,
    bookingValue: 410000,
    bookingRate: 410,
    arrivalPlant: "Nellore",
    bookingStation: "Nellore",
    vehicleNumber: "AP 26 TC 1984",
    driverName: "V. Srinivas",
    farmLocation: "Kavali Coastal Creek",
    supplier: "Direct Farmer",
    remarks: "Delivered to cold store dock"
  },
  {
    id: 6,
    serialNumber: 6,
    species: "Black Tiger Shrimp",
    bookingNumber: "PB-2026-108",
    bookingDate: "2026-10-10",
    purchaseType: "Corporate Feed-Linked Booking",
    grader: "K. Ramu",
    agent: "Nellore Aqua Syndicate",
    bookingCount: "25 Count",
    bookingWeight: 5000,
    bookingValue: 550000,
    bookingRate: 590,
    arrivalPlant: "Bhimavaram",
    bookingStation: "Bhimavaram",
    vehicleNumber: "AP 16 TH 9901",
    driverName: "T. Satyam",
    farmLocation: "Gudivada High-Yield Block",
    supplier: "Nellore Aqua Syndicate",
    remarks: "Heavy volume batch"
  },
  {
    id: 7,
    serialNumber: 7,
    species: "Asian Seabass (Barramundi)",
    bookingNumber: "PB-2026-110",
    bookingDate: "2026-10-11",
    purchaseType: "Spot Market Purchase",
    grader: "M. Nagesh",
    agent: "East Coast Brokers",
    bookingCount: "500-800 g/pc",
    bookingWeight: 1800,
    bookingValue: 350000,
    bookingRate: 320,
    arrivalPlant: "Kakinada",
    bookingStation: "Kakinada",
    vehicleNumber: "AP 05 TB 4310",
    driverName: "C. Krishna",
    farmLocation: "Coringa Brackish Basin",
    supplier: "East Coast Brokers",
    remarks: "Live transport crates"
  }
];

const INITIAL_RM_ARRIVALS = [
  {
    id: 1,
    sno: 1,
    date: "2026-10-06",
    company: "DEVI FISHERIES LIMITED",
    plant: "DFL UNIT-5 (JPT)",
    center: "Bhimavaram Center #1",
    species: "Vannamei (VM)",
    weight: 3850,
    balanceWeight: 1250,
    status: "QC CLEARED",
    averageRate: 425,
    amount: 1636250,
    balanceAmount: 531250
  },
  {
    id: 2,
    sno: 2,
    date: "2026-10-06",
    company: "DEVI FISHERIES LIMITED",
    plant: "DFL UNIT-3 (PSP)",
    center: "Kakinada Sea Intake #2",
    species: "Black Tiger (BT)",
    weight: 4200,
    balanceWeight: 800,
    status: "RECEIVED",
    averageRate: 610,
    amount: 2562000,
    balanceAmount: 488000
  },
  {
    id: 3,
    sno: 3,
    date: "2026-10-06",
    company: "DEVI FISHERIES LIMITED",
    plant: "DFL UNIT-4 (PND)",
    center: "Machilipatnam Delta #3",
    species: "Vannamei (VM)",
    weight: 2900,
    balanceWeight: 900,
    status: "IN PROCESS",
    averageRate: 390,
    amount: 1131000,
    balanceAmount: 351000
  },
  {
    id: 4,
    sno: 4,
    date: "2026-10-06",
    company: "DEVI FISHERIES LIMITED",
    plant: "DFL UNIT-6 (JPT-II)",
    center: "Amalapuram Harvesters #4",
    species: "Vannamei (VM)",
    weight: 3100,
    balanceWeight: 1100,
    status: "COMPLETED",
    averageRate: 415,
    amount: 1286500,
    balanceAmount: 456500
  },
  {
    id: 5,
    sno: 5,
    date: "2026-10-06",
    company: "DEVI FISHERIES LIMITED",
    plant: "DFL UNIT-2 (KKD)",
    center: "Ongole Coastal Hub #1",
    species: "Black Tiger (BT)",
    weight: 5000,
    balanceWeight: 2000,
    status: "QC CLEARED",
    averageRate: 590,
    amount: 2950000,
    balanceAmount: 1180000
  }
];

const INITIAL_LOTS = [
  {
    id: 155329,
    arrivalDate: "2026-10-03",
    lotNumber: "SKM/2627/0664",
    arrivalQty: 2955,
    abStatus: "Test Pending",
    deheadingQty: 17.39,
    gradingQty: 2086,
    vaQty: 1050,
    soakingQty: 1050,
    packedQty: 0,
    purchaseStation: "SKM",
    species: "Vannamei (VM)"
  },
  {
    id: 155330,
    arrivalDate: "2026-10-03",
    lotNumber: "SKM/2627/0664",
    arrivalQty: 15,
    abStatus: "Test Pending",
    deheadingQty: 0.68,
    gradingQty: 0,
    vaQty: 0,
    soakingQty: 0,
    packedQty: 0,
    purchaseStation: "SKM",
    species: "Vannamei (VM)"
  },
  {
    id: 155331,
    arrivalDate: "2026-10-03",
    lotNumber: "RPL/2627/0579",
    arrivalQty: 2401,
    abStatus: "Test Pending",
    deheadingQty: 9.73,
    gradingQty: 1639,
    vaQty: 0,
    soakingQty: 0,
    packedQty: 0,
    purchaseStation: "RPL",
    species: "Vannamei (VM)"
  },
  {
    id: 155332,
    arrivalDate: "2026-10-03",
    lotNumber: "RPL/2627/0579",
    arrivalQty: 27,
    abStatus: "Test Pending",
    deheadingQty: 3.18,
    gradingQty: 0,
    vaQty: 0,
    soakingQty: 0,
    packedQty: 0,
    purchaseStation: "RPL",
    species: "Vannamei (VM)"
  },
  {
    id: 155333,
    arrivalDate: "2026-10-03",
    lotNumber: "KKD/2627/1451",
    arrivalQty: 1663.5,
    abStatus: "Test Pending",
    deheadingQty: 6.9,
    gradingQty: 2347,
    vaQty: 0,
    soakingQty: 0,
    packedQty: 0,
    purchaseStation: "KKD",
    species: "Black Tiger (BT)"
  },
  {
    id: 155334,
    arrivalDate: "2026-10-03",
    lotNumber: "KKD/2627/1451",
    arrivalQty: 1589,
    abStatus: "Test Pending",
    deheadingQty: 6.88,
    gradingQty: 0,
    vaQty: 0,
    soakingQty: 0,
    packedQty: 0,
    purchaseStation: "KKD",
    species: "Black Tiger (BT)"
  },
  {
    id: 155335,
    arrivalDate: "2026-10-04",
    lotNumber: "VSP/2627/0892",
    arrivalQty: 3120,
    abStatus: "Passed",
    deheadingQty: 21.45,
    gradingQty: 2850,
    vaQty: 950,
    soakingQty: 950,
    packedQty: 750,
    purchaseStation: "VSP",
    species: "Vannamei (VM)"
  }
];

const INITIAL_PAYMENTS = [
  {
    id: 1,
    serialNumber: 1,
    voucherNumber: "PAY-2026-055",
    paymentDate: "2026-10-07",
    center: "Visakhapatnam Gate Dock",
    supplier: "Sri Sai Aqua Farms & Seedlings",
    agent: "East Coast Brokers",
    arrivalPlant: "DFL UNIT-1 (VSP)",
    settledBill: "BILL-2026-121",
    bankReference: "HDFC-RTGS-991204",
    paymentMode: "RTGS / Bank Wire",
    amountINR: 1450000,
    amountUSD: 17469,
    status: "COMPLETED",
    paymentType: "Bill Settlement"
  },
  {
    id: 2,
    serialNumber: 2,
    voucherNumber: "PAY-2026-054",
    paymentDate: "2026-10-06",
    center: "Machilipatnam Delta #3",
    supplier: "Krishna Delta Prawn Harvesters",
    agent: "Direct Farmer",
    arrivalPlant: "DFL UNIT-4 (PND)",
    settledBill: "BILL-2026-120",
    bankReference: "SBI-NEFT-881920",
    paymentMode: "NEFT",
    amountINR: 890000,
    amountUSD: 10722,
    status: "COMPLETED",
    paymentType: "Bill Settlement"
  },
  {
    id: 3,
    serialNumber: 3,
    voucherNumber: "PAY-2026-053",
    paymentDate: "2026-10-06",
    center: "Amalapuram Harvesters #4",
    supplier: "Konaseema Marine Harvesters",
    agent: "Coastal Marine Agency",
    arrivalPlant: "DFL UNIT-6 (JPT-II)",
    settledBill: "BILL-2026-119",
    bankReference: "ICICI-IMPS-774019",
    paymentMode: "Direct Bank Transfer",
    amountINR: 520000,
    amountUSD: 6265,
    status: "PROCESSING",
    paymentType: "Supplier Payment"
  },
  {
    id: 4,
    serialNumber: 4,
    voucherNumber: "PAY-2026-052",
    paymentDate: "2026-10-05",
    center: "Ongole Coastal Hub #1",
    supplier: "Nellore Brackish Aqua Cultivators",
    agent: "Nellore Aqua Syndicate",
    arrivalPlant: "DFL UNIT-2 (KKD)",
    settledBill: "BILL-2026-116",
    bankReference: "AXIS-RTGS-552910",
    paymentMode: "RTGS / Bank Wire",
    amountINR: 1200000,
    amountUSD: 14457,
    status: "COMPLETED",
    paymentType: "Bill Settlement"
  },
  {
    id: 5,
    serialNumber: 5,
    voucherNumber: "PAY-2026-051",
    paymentDate: "2026-10-04",
    center: "Bhimavaram Center #1",
    supplier: "Godavari Coastal Aqua Farms",
    agent: "Delta Seafood Associates",
    arrivalPlant: "DFL UNIT-5 (JPT)",
    settledBill: "BILL-2026-118",
    bankReference: "HDFC-RTGS-990184",
    paymentMode: "RTGS / Bank Wire",
    amountINR: 380000,
    amountUSD: 4578,
    status: "COMPLETED",
    paymentType: "Supplier Payment"
  },
  {
    id: 6,
    serialNumber: 6,
    voucherNumber: "PAY-2026-050",
    paymentDate: "2026-10-03",
    center: "Visakhapatnam Gate Dock",
    supplier: "East Coast Aqua Society",
    agent: "East Coast Brokers",
    arrivalPlant: "DFL UNIT-1 (VSP)",
    settledBill: "BILL-2026-114",
    bankReference: "SBI-RTGS-331092",
    paymentMode: "RTGS / Bank Wire",
    amountINR: 640000,
    amountUSD: 7710,
    status: "COMPLETED",
    paymentType: "Supplier Payment"
  }
];

export const Client2026View = {
  bookings: [...INITIAL_BOOKINGS],
  rmArrivals: [...INITIAL_RM_ARRIVALS],
  lots: [...INITIAL_LOTS],
  payments: [...INITIAL_PAYMENTS],
  activeDashboardSubTab: 'raw', // 'raw' | 'commercial'
  bookingFilters: { purchaseType: '', arrivalPlant: '', date: '' },
  rmFilters: { species: '', plant: '', center: '' },
  lotFilters: { station: '', species: '', month: '10', year: '2026' },
  paymentFilters: { paymentType: '', paymentMode: '', search: '' },

  render(containerId = 'main-content-container', tabName = 'dashboard', resolvedHash = '') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Normalize active tab
    let activeTab = 'dashboard';
    if (tabName.includes('booking')) activeTab = 'bookings';
    else if (tabName.includes('raw-material') || tabName.includes('rm-arrival')) activeTab = 'raw-material-arrivals';
    else if (tabName.includes('lot')) activeTab = 'lot-tracking';
    else if (tabName.includes('transaction') || tabName.includes('bill')) activeTab = 'transactions-bills';
    else if (tabName.includes('payment')) activeTab = 'payments';
    else if (tabName.includes('arrival')) activeTab = 'arrivals';
    else activeTab = 'dashboard';

    // Top Operations Tabs matching Client 2026 Operations.tsx
    const tabsHtml = `
      <section className="purchase-operations" class="purchase-operations">
        <!-- Client 2026 Operations Header Navigation Tabs -->
        <nav class="purchase-operations-tabs" aria-label="Purchase Operations">
          <a href="#/client2026/operations/dashboard" class="purchase-operations-tab ${activeTab === 'dashboard' ? 'active' : ''}">
            Dashboard
          </a>
          <a href="#/client2026/operations/bookings" class="purchase-operations-tab ${activeTab === 'bookings' ? 'active' : ''}">
            Booking
          </a>
          <a href="#/client2026/operations/raw-material-arrivals" class="purchase-operations-tab ${activeTab === 'raw-material-arrivals' ? 'active' : ''}">
            Raw Material Arrivals
          </a>
          <a href="#/client2026/operations/arrivals" class="purchase-operations-tab ${activeTab === 'arrivals' ? 'active' : ''}">
            Arrivals
          </a>
          <a href="#/client2026/operations/lot-tracking" class="purchase-operations-tab ${activeTab === 'lot-tracking' ? 'active' : ''}">
            Lot Tracking
          </a>
          <a href="#/client2026/operations/transactions-bills" class="purchase-operations-tab ${activeTab === 'transactions-bills' ? 'active' : ''}">
            Transactions & Bills
          </a>
          <a href="#/client2026/operations/payments" class="purchase-operations-tab ${activeTab === 'payments' ? 'active' : ''}">
            Payments
          </a>
        </nav>

        <div class="purchase-operation-content" id="client2026-tab-content">
          ${this.renderSubTab(activeTab)}
        </div>
      </section>
    `;

    container.innerHTML = tabsHtml;
    this.bindSubTabEvents(activeTab);
  },

  renderSubTab(activeTab) {
    switch (activeTab) {
      case 'dashboard':
        return this.renderDashboard();
      case 'bookings':
        return this.renderBookings();
      case 'raw-material-arrivals':
        return this.renderRawMaterialArrivals();
      case 'arrivals':
        return this.renderArrivals();
      case 'lot-tracking':
        return this.renderLotTracking();
      case 'transactions-bills':
        return this.renderTransactionsBills();
      case 'payments':
        return this.renderPayments();
      default:
        return this.renderDashboard();
    }
  },

  // ==========================================
  // TAB 1: DASHBOARD (Raw & Commercial)
  // ==========================================
  renderDashboard() {
    const isRaw = this.activeDashboardSubTab === 'raw';
    return `
      <div class="py-2">
        <!-- Sub-dashboard Switcher -->
        <nav class="purchase-operations-tabs" style="background:#F1F5F9; border-color:#CBD5E1; margin-bottom: 20px;">
          <button type="button" id="c26-dash-subtab-raw" class="purchase-operations-tab ${isRaw ? 'active' : ''}" style="cursor:pointer; border-radius: 8px;">
            Raw Material Dashboard
          </button>
          <button type="button" id="c26-dash-subtab-comm" class="purchase-operations-tab ${!isRaw ? 'active' : ''}" style="cursor:pointer; border-radius: 8px;">
            Commercial Dashboard
          </button>
        </nav>

        ${isRaw ? this.renderRawMaterialDashboard() : this.renderCommercialDashboard()}
      </div>
    `;
  },

  renderRawMaterialDashboard() {
    return `
      <div>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h1 class="h4 fw-bold mb-0 text-[#0F172A]">Raw Material Dashboard</h1>
          <span class="text-xs text-[#64748B]">Real-time dock weighments & intake telemetry</span>
        </div>

        <!-- Metric KPI Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <div class="bg-white p-4 rounded-xl border border-[#DBE3ED] shadow-sm flex items-center justify-between">
            <div>
              <div class="text-[11px] font-bold text-[#006C7A] uppercase tracking-wider">Total Quantity</div>
              <div class="text-2xl font-bold text-[#0F172A] mt-1">19,050 <span class="text-xs font-normal text-[#64748B]">KG</span></div>
            </div>
            <div class="w-10 h-10 rounded-lg bg-[#E0F7FA] text-[#006C7A] flex items-center justify-center font-bold">
              ⚖
            </div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-[#DBE3ED] shadow-sm flex items-center justify-between">
            <div>
              <div class="text-[11px] font-bold text-[#16A34A] uppercase tracking-wider">Head On Qty</div>
              <div class="text-2xl font-bold text-[#0F172A] mt-1">9,850 <span class="text-xs font-normal text-[#64748B]">KG</span></div>
            </div>
            <div class="w-10 h-10 rounded-lg bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center font-bold">
              🦐
            </div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-[#DBE3ED] shadow-sm flex items-center justify-between">
            <div>
              <div class="text-[11px] font-bold text-[#DC2626] uppercase tracking-wider">Damage Weight</div>
              <div class="text-2xl font-bold text-[#DC2626] mt-1">420 <span class="text-xs font-normal text-[#64748B]">KG</span></div>
            </div>
            <div class="w-10 h-10 rounded-lg bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center font-bold">
              ⚠
            </div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-[#DBE3ED] shadow-sm flex items-center justify-between">
            <div>
              <div class="text-[11px] font-bold text-[#D97706] uppercase tracking-wider">Pending Production</div>
              <div class="text-2xl font-bold text-[#0F172A] mt-1">6,050 <span class="text-xs font-normal text-[#64748B]">KG</span></div>
            </div>
            <div class="w-10 h-10 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center font-bold">
              ⏱
            </div>
          </div>
        </div>

        <!-- Charts Grid (Sum of QTY by SPECIES & by PLANT) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
          <div class="lg:col-span-4 bg-white p-4 rounded-xl border border-[#DBE3ED] shadow-sm">
            <h3 class="text-xs font-bold text-[#0F172A] uppercase mb-3">Sum of QTY by SPECIES</h3>
            <div class="h-56 relative flex items-center justify-center">
              <canvas id="c26-chart-species"></canvas>
            </div>
          </div>

          <div class="lg:col-span-8 bg-white p-4 rounded-xl border border-[#DBE3ED] shadow-sm">
            <h3 class="text-xs font-bold text-[#0F172A] uppercase mb-3">Sum of QTY by PLANT</h3>
            <div class="h-56 relative flex items-center justify-center">
              <canvas id="c26-chart-plant"></canvas>
            </div>
          </div>
        </div>

        <!-- Abstract Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-white p-4 rounded-xl border border-[#DBE3ED] shadow-sm">
            <h3 class="text-xs font-bold text-[#0F172A] uppercase mb-3">Purchase Abstract</h3>
            <div class="grid grid-cols-2 gap-3">
              <div class="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                <div class="text-[10px] uppercase font-bold text-[#64748B]">Vannamei (VM) Qty</div>
                <div class="text-base font-bold text-[#0F172A] mt-1">9,850 KG</div>
                <div class="text-[10px] uppercase font-bold text-[#64748B] mt-2">Value</div>
                <div class="text-sm font-bold text-[#16A34A]">₹ 4,053,750</div>
              </div>
              <div class="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                <div class="text-[10px] uppercase font-bold text-[#64748B]">Black Tiger (BT) Qty</div>
                <div class="text-base font-bold text-[#0F172A] mt-1">9,200 KG</div>
                <div class="text-[10px] uppercase font-bold text-[#64748B] mt-2">Value</div>
                <div class="text-sm font-bold text-[#16A34A]">₹ 5,512,000</div>
              </div>
            </div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-[#DBE3ED] shadow-sm">
            <h3 class="text-xs font-bold text-[#0F172A] uppercase mb-3">RM Arrival Summary</h3>
            <div class="grid grid-cols-2 gap-3 mb-3">
              <div class="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                <div class="text-[10px] uppercase font-bold text-[#64748B]">Total Qty (KG)</div>
                <div class="text-base font-bold text-[#0F172A] mt-1">19,050 KG</div>
              </div>
              <div class="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                <div class="text-[10px] uppercase font-bold text-[#64748B]">Total Value (INR / USD)</div>
                <div class="text-sm font-bold text-[#16A34A] mt-1">₹ 9,565,750 <span class="text-xs font-normal text-[#64748B]">($115,250)</span></div>
              </div>
            </div>
            <div class="p-2.5 bg-[#E0F7FA] text-[#006C7A] text-xs font-semibold rounded-lg flex justify-between">
              <span>Avg Rate: ₹ 502.14 / KG</span>
              <span>Active Centers: 5 Facilities</span>
            </div>
          </div>
        </div>

        <!-- Center Intake Table -->
        <div class="bg-white rounded-xl border border-[#DBE3ED] shadow-sm overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex justify-between items-center">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Quantity by Center</h3>
              <p class="text-xs text-[#64748B] mb-0">Purchase centers ranked by procurement intake</p>
            </div>
            <a href="#/client2026/operations/arrivals" class="text-xs font-bold text-[#006C7A] hover:underline">View All Arrivals →</a>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="p-3">Center Code</th>
                  <th class="p-3">Center Name</th>
                  <th class="p-3">Mapped Plant Facility</th>
                  <th class="p-3">Lots Supplied</th>
                  <th class="p-3 text-right">Total Qty (KG)</th>
                  <th class="p-3 text-right">Avg Rate (INR)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0] text-[#1E293B]">
                <tr class="hover:bg-[#F8FAFC]">
                  <td class="p-3 font-mono font-semibold">KKD-01</td>
                  <td class="p-3 font-semibold">Kakinada Sea Intake #2</td>
                  <td class="p-3">DFL UNIT-3 (PSP)</td>
                  <td class="p-3"><span class="px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-medium">12 Lots</span></td>
                  <td class="p-3 text-right font-bold">5,000 KG</td>
                  <td class="p-3 text-right font-semibold text-[#16A34A]">₹ 590.00 / KG</td>
                </tr>
                <tr class="hover:bg-[#F8FAFC]">
                  <td class="p-3 font-mono font-semibold">BHM-02</td>
                  <td class="p-3 font-semibold">Bhimavaram Center #1</td>
                  <td class="p-3">DFL UNIT-5 (JPT)</td>
                  <td class="p-3"><span class="px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-medium">10 Lots</span></td>
                  <td class="p-3 text-right font-bold">3,850 KG</td>
                  <td class="p-3 text-right font-semibold text-[#16A34A]">₹ 425.00 / KG</td>
                </tr>
                <tr class="hover:bg-[#F8FAFC]">
                  <td class="p-3 font-mono font-semibold">ONG-01</td>
                  <td class="p-3 font-semibold">Ongole Coastal Hub #1</td>
                  <td class="p-3">DFL UNIT-2 (KKD)</td>
                  <td class="p-3"><span class="px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-medium">8 Lots</span></td>
                  <td class="p-3 text-right font-bold">4,200 KG</td>
                  <td class="p-3 text-right font-semibold text-[#16A34A]">₹ 610.00 / KG</td>
                </tr>
                <tr class="hover:bg-[#F8FAFC]">
                  <td class="p-3 font-mono font-semibold">AMP-04</td>
                  <td class="p-3 font-semibold">Amalapuram Harvesters #4</td>
                  <td class="p-3">DFL UNIT-6 (JPT-II)</td>
                  <td class="p-3"><span class="px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-medium">7 Lots</span></td>
                  <td class="p-3 text-right font-bold">3,100 KG</td>
                  <td class="p-3 text-right font-semibold text-[#16A34A]">₹ 415.00 / KG</td>
                </tr>
                <tr class="hover:bg-[#F8FAFC]">
                  <td class="p-3 font-mono font-semibold">MCP-03</td>
                  <td class="p-3 font-semibold">Machilipatnam Delta #3</td>
                  <td class="p-3">DFL UNIT-4 (PND)</td>
                  <td class="p-3"><span class="px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-medium">5 Lots</span></td>
                  <td class="p-3 text-right font-bold">2,900 KG</td>
                  <td class="p-3 text-right font-semibold text-[#16A34A]">₹ 390.00 / KG</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  renderCommercialDashboard() {
    return `
      <div>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h1 class="h4 fw-bold mb-0 text-[#0F172A]">Commercial Dashboard</h1>
          <span class="text-xs text-[#64748B]">Procurement billing, batch reconciliation & status</span>
        </div>

        <!-- 6 Commercial Metric Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-4">
          <div class="bg-white p-3 rounded-xl border border-[#DBE3ED] shadow-sm">
            <div class="text-[10px] font-bold text-[#006C7A] uppercase">Total Lots</div>
            <div class="text-xl font-bold text-[#0F172A] mt-1">42</div>
          </div>
          <div class="bg-white p-3 rounded-xl border border-[#DBE3ED] shadow-sm">
            <div class="text-[10px] font-bold text-[#16A34A] uppercase">AB+ Lots</div>
            <div class="text-xl font-bold text-[#16A34A] mt-1">28</div>
          </div>
          <div class="bg-white p-3 rounded-xl border border-[#DBE3ED] shadow-sm">
            <div class="text-[10px] font-bold text-[#DC2626] uppercase">Return Lots</div>
            <div class="text-xl font-bold text-[#DC2626] mt-1">1</div>
          </div>
          <div class="bg-white p-3 rounded-xl border border-[#DBE3ED] shadow-sm">
            <div class="text-[10px] font-bold text-[#8B5CF6] uppercase">Border Counts</div>
            <div class="text-xl font-bold text-[#8B5CF6] mt-1">14</div>
          </div>
          <div class="bg-white p-3 rounded-xl border border-[#DBE3ED] shadow-sm">
            <div class="text-[10px] font-bold text-[#D97706] uppercase">Grading Pendings</div>
            <div class="text-xl font-bold text-[#D97706] mt-1">6</div>
          </div>
          <div class="bg-white p-3 rounded-xl border border-[#DBE3ED] shadow-sm">
            <div class="text-[10px] font-bold text-[#2563EB] uppercase">Bill Pendings</div>
            <div class="text-xl font-bold text-[#2563EB] mt-1">8</div>
          </div>
        </div>

        <!-- Commercial Analytics Charts -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div class="lg:col-span-8 bg-white p-4 rounded-xl border border-[#DBE3ED] shadow-sm">
            <h3 class="text-xs font-bold text-[#0F172A] uppercase mb-3">Daily Purchase Analytics (Tons)</h3>
            <div class="h-64 relative flex items-center justify-center">
              <canvas id="c26-chart-daily"></canvas>
            </div>
          </div>
          <div class="lg:col-span-4 bg-white p-4 rounded-xl border border-[#DBE3ED] shadow-sm">
            <h3 class="text-xs font-bold text-[#0F172A] uppercase mb-3">Intake Volume (19.05 Tons)</h3>
            <div class="h-64 relative flex items-center justify-center">
              <canvas id="c26-chart-doughnut"></canvas>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ==========================================
  // TAB 2: BOOKINGS (Bookings.tsx)
  // ==========================================
  renderBookings() {
    const filtered = this.bookings.filter(b => {
      const matchPurchase = !this.bookingFilters.purchaseType || b.purchaseType === this.bookingFilters.purchaseType;
      const matchPlant = !this.bookingFilters.arrivalPlant || b.arrivalPlant === this.bookingFilters.arrivalPlant;
      const matchDate = !this.bookingFilters.date || b.bookingDate === this.bookingFilters.date;
      return matchPurchase && matchPlant && matchDate;
    });

    const totalWeight = filtered.reduce((acc, b) => acc + Number(b.bookingWeight || 0), 0);
    const totalValue = filtered.reduce((acc, b) => acc + (Number(b.bookingWeight || 0) * Number(b.bookingRate || 0)), 0);
    const avgRate = totalWeight > 0 ? (totalValue / totalWeight) : 0;

    const purchaseTypes = [...new Set(this.bookings.map(b => b.purchaseType))];
    const plants = [...new Set(this.bookings.map(b => b.arrivalPlant))];

    return `
      <div class="purchase-bookings-page">
        <!-- Heading & Create Booking CTA -->
        <div class="d-flex justify-content-between align-items-center mb-3 purchase-page-heading">
          <h2>Bookings</h2>
          <button type="button" class="btn btn-info" id="c26-btn-create-booking">
            <svg class="w-4 h-4 me-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Create Booking
          </button>
        </div>

        <!-- Filter Card -->
        <section class="card border-0 shadow-sm mb-3 purchase-filter-card">
          <div class="card-body">
            <h3>⌕ Search & Filters</h3>
            <div class="row g-3 align-items-end">
              <div class="col-12 col-md-4">
                <label class="form-label">Select Purchase</label>
                <select class="form-select" id="c26-booking-filter-purchase">
                  <option value="">All Purchases (Select)</option>
                  ${purchaseTypes.map(t => `<option value="${t}" ${this.bookingFilters.purchaseType === t ? 'selected' : ''}>${t}</option>`).join('')}
                </select>
              </div>

              <div class="col-12 col-md-4">
                <label class="form-label">Select Arrival Plant</label>
                <select class="form-select" id="c26-booking-filter-plant">
                  <option value="">All Arrival Plants (Select)</option>
                  ${plants.map(p => `<option value="${p}" ${this.bookingFilters.arrivalPlant === p ? 'selected' : ''}>${p}</option>`).join('')}
                </select>
              </div>

              <div class="col-12 col-md-3">
                <label class="form-label">Date</label>
                <input type="date" class="form-control" id="c26-booking-filter-date" value="${this.bookingFilters.date}" />
              </div>

              <div class="col-12 col-md-1 d-flex gap-2">
                <button type="button" class="btn btn-info" id="c26-booking-search-btn" title="Search bookings">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </button>
                <button type="button" class="btn btn-outline-secondary" id="c26-booking-reset-btn" title="Reset filters">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Bookings Data Table -->
        <div class="data-table-container">
          <div class="data-table-toolbar flex justify-between items-center">
            <span class="data-table-title">Bookings List (${filtered.length} entries)</span>
            <div class="flex gap-2">
              <button class="btn btn-sm btn-outline-secondary text-xs" id="c26-download-all-bookings">
                Download JSON
              </button>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-[#F8FAFC] border-b border-[#DBE3ED] text-[#475569] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="p-3">S.No</th>
                  <th class="p-3">Species</th>
                  <th class="p-3">Booking Number</th>
                  <th class="p-3">Booking Date</th>
                  <th class="p-3">Purchase Type</th>
                  <th class="p-3">Grader</th>
                  <th class="p-3">Agent</th>
                  <th class="p-3">Count</th>
                  <th class="p-3 text-right">Booking Weight</th>
                  <th class="p-3 text-right">Booking Rate</th>
                  <th class="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0] text-[#1E293B]">
                ${filtered.length === 0 ? `
                  <tr>
                    <td colspan="11" class="p-8 text-center text-[#64748B]">No booking records match the selected filters.</td>
                  </tr>
                ` : filtered.map(b => `
                  <tr class="hover:bg-[#F8FAFC]">
                    <td class="p-3 font-mono">${b.serialNumber}</td>
                    <td class="p-3 font-semibold text-[#0F172A]">${b.species}</td>
                    <td class="p-3 font-mono font-bold text-[#006C7A]">${b.bookingNumber}</td>
                    <td class="p-3">${b.bookingDate}</td>
                    <td class="p-3"><span class="px-2 py-0.5 rounded text-[11px] font-medium bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]">${b.purchaseType}</span></td>
                    <td class="p-3">${b.grader}</td>
                    <td class="p-3">${b.agent}</td>
                    <td class="p-3 font-medium">${b.bookingCount}</td>
                    <td class="p-3 text-right font-bold">${Number(b.bookingWeight).toLocaleString('en-IN')} KG</td>
                    <td class="p-3 text-right font-bold text-[#16A34A]">₹ ${Number(b.bookingRate).toLocaleString('en-IN')} / KG</td>
                    <td class="p-3 text-center">
                      <div class="flex items-center justify-center gap-1.5">
                        <button type="button" class="p-1.5 hover:bg-[#E2E8F0] rounded text-[#475569]" title="Download Booking JSON" data-action="download-booking" data-id="${b.id}">
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                        </button>
                        <button type="button" class="p-1.5 hover:bg-[#FEE2E2] rounded text-[#DC2626]" title="Delete Booking" data-action="delete-booking" data-id="${b.id}">
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Bookings Total Summary Section -->
        <section class="bookings-summary">
          <div class="bookings-summary-header">
            <h3>▤ BOOKINGS TOTAL SUMMARY</h3>
            <span>Showing totals for <strong>${filtered.length}</strong> Bookings</span>
          </div>

          <div class="bookings-summary-grid">
            <div class="bookings-summary-card">
              <span class="bookings-summary-label">TOTAL BOOKINGS</span>
              <h2>${filtered.length} Bookings</h2>
              <span class="bookings-summary-badge">Active Entries</span>
            </div>

            <div class="bookings-summary-card">
              <span class="bookings-summary-label">TOTAL BOOKING WEIGHT</span>
              <h2>${totalWeight.toLocaleString('en-IN')} KG</h2>
              <span class="bookings-summary-badge">Volume Target</span>
            </div>

            <div class="bookings-summary-card">
              <span class="bookings-summary-label">TOTAL ESTIMATED VALUE</span>
              <h2>₹ ${totalValue.toLocaleString('en-IN')}</h2>
              <span class="bookings-summary-currency">INR</span>
            </div>

            <div class="bookings-summary-card">
              <span class="bookings-summary-label">AVERAGE BOOKING RATE</span>
              <h2>₹ ${avgRate.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / KG</h2>
              <span class="bookings-summary-badge">Weighted Avg</span>
            </div>
          </div>
        </section>

        <!-- Create Booking Modal (Rendered conditionally) -->
        <div id="c26-booking-modal-container"></div>
      </div>
    `;
  },

  // ==========================================
  // TAB 3: RAW MATERIAL ARRIVALS
  // ==========================================
  renderRawMaterialArrivals() {
    return `
      <div class="raw-material-arrivals-page">
        <div class="rma-page-heading">
          <h1>Raw Material Arrivals</h1>
          <button type="button" class="rma-primary-button" id="c26-btn-create-rm-arrival">
            <svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Create Arrival
          </button>
        </div>

        <section class="rma-filter-card">
          <div class="rma-filter-heading">
            <h2 class="text-xs font-bold text-[#0F172A] uppercase">⌕ Arrival Search Filters</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase mb-1">Company</label>
              <input type="text" class="w-full text-xs p-2 rounded-lg border border-[#CBD5E1]" value="DEVI FISHERIES LIMITED" readonly />
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase mb-1">Species</label>
              <select class="w-full text-xs p-2 rounded-lg border border-[#CBD5E1]" id="c26-rm-filter-species">
                <option value="">All Species</option>
                <option value="Vannamei (VM)">Vannamei (VM)</option>
                <option value="Black Tiger (BT)">Black Tiger (BT)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase mb-1">Plant Facility</label>
              <select class="w-full text-xs p-2 rounded-lg border border-[#CBD5E1]" id="c26-rm-filter-plant">
                <option value="">All Plants</option>
                <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                <option value="DFL UNIT-4 (PND)">DFL UNIT-4 (PND)</option>
                <option value="DFL UNIT-6 (JPT-II)">DFL UNIT-6 (JPT-II)</option>
                <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
              </select>
            </div>
            <div class="flex items-end gap-2">
              <button class="rma-primary-button w-full" id="c26-rm-search-btn">Search</button>
            </div>
          </div>
        </section>

        <!-- Table -->
        <div class="bg-white rounded-xl border border-[#DBE3ED] shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-[#F8FAFC] border-b border-[#DBE3ED] text-[#475569] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="p-3">S.No</th>
                  <th class="p-3">Date</th>
                  <th class="p-3">Plant</th>
                  <th class="p-3">Center</th>
                  <th class="p-3">Species</th>
                  <th class="p-3 text-right">Weight (KG)</th>
                  <th class="p-3 text-right">Balance (KG)</th>
                  <th class="p-3">Status</th>
                  <th class="p-3 text-right">Avg Rate</th>
                  <th class="p-3 text-right">Amount (INR)</th>
                  <th class="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0]">
                ${this.rmArrivals.map(a => `
                  <tr class="hover:bg-[#F8FAFC]">
                    <td class="p-3 font-mono">${a.sno}</td>
                    <td class="p-3">${a.date}</td>
                    <td class="p-3 font-semibold text-[#0F172A]">${a.plant}</td>
                    <td class="p-3">${a.center}</td>
                    <td class="p-3 font-medium">${a.species}</td>
                    <td class="p-3 text-right font-bold">${a.weight.toLocaleString('en-IN')} KG</td>
                    <td class="p-3 text-right text-[#D97706] font-semibold">${a.balanceWeight.toLocaleString('en-IN')} KG</td>
                    <td class="p-3">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        a.status === 'QC CLEARED' ? 'bg-[#DCFCE7] text-[#16A34A]' :
                        a.status === 'RECEIVED' ? 'bg-[#E0F2FE] text-[#0284C7]' :
                        a.status === 'IN PROCESS' ? 'bg-[#FEF3C7] text-[#D97706]' :
                        'bg-[#F3E8FF] text-[#7E22CE]'
                      }">${a.status}</span>
                    </td>
                    <td class="p-3 text-right font-semibold">₹ ${a.averageRate}</td>
                    <td class="p-3 text-right font-bold text-[#16A34A]">₹ ${a.amount.toLocaleString('en-IN')}</td>
                    <td class="p-3 text-center">
                      <button class="p-1 text-[#DC2626] hover:bg-[#FEE2E2] rounded" data-action="delete-rm-arrival" data-id="${a.id}" title="Delete">
                        ✕
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // ==========================================
  // TAB 4: ARRIVALS (Arrivals.tsx)
  // ==========================================
  renderArrivals() {
    return `
      <div class="py-2">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h1 class="h4 fw-bold mb-0 text-[#0F172A]">Arrivals Register</h1>
          <span class="text-xs text-[#64748B]">Complete dock weighment bills & crate records</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <div class="bg-white p-3.5 rounded-xl border border-[#DBE3ED] shadow-sm">
            <span class="text-[10px] font-bold uppercase text-[#64748B]">Total Weight</span>
            <div class="text-xl font-bold text-[#0F172A] mt-1">19,050 KG</div>
          </div>
          <div class="bg-white p-3.5 rounded-xl border border-[#DBE3ED] shadow-sm">
            <span class="text-[10px] font-bold uppercase text-[#64748B]">Total Crates</span>
            <div class="text-xl font-bold text-[#0F172A] mt-1">762 Crates</div>
          </div>
          <div class="bg-white p-3.5 rounded-xl border border-[#DBE3ED] shadow-sm">
            <span class="text-[10px] font-bold uppercase text-[#64748B]">Total Amount</span>
            <div class="text-xl font-bold text-[#16A34A] mt-1">₹ 9,565,750</div>
          </div>
          <div class="bg-white p-3.5 rounded-xl border border-[#DBE3ED] shadow-sm">
            <span class="text-[10px] font-bold uppercase text-[#64748B]">Average Rate</span>
            <div class="text-xl font-bold text-[#006C7A] mt-1">₹ 502.14 / KG</div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#DBE3ED] shadow-sm p-4">
          <div class="text-sm font-bold text-[#0F172A] mb-3">Recent Direct Dock Arrivals</div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-[#F8FAFC] border-b border-[#DBE3ED] text-[#475569] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="p-3">Arrival Number</th>
                  <th class="p-3">Date</th>
                  <th class="p-3">Plant</th>
                  <th class="p-3">Supplier</th>
                  <th class="p-3">Grader</th>
                  <th class="p-3">Count</th>
                  <th class="p-3 text-right">Weight (KG)</th>
                  <th class="p-3 text-right">Rate</th>
                  <th class="p-3 text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0]">
                <tr class="hover:bg-[#F8FAFC]">
                  <td class="p-3 font-mono font-bold text-[#006C7A]">ARR-2026-00341</td>
                  <td class="p-3">2026-10-06</td>
                  <td class="p-3">DFL UNIT-3 (PSP)</td>
                  <td class="p-3 font-semibold">Krishna Delta Prawn Harvesters</td>
                  <td class="p-3">K. Ramu</td>
                  <td class="p-3">30 Count</td>
                  <td class="p-3 text-right font-bold">4,200 KG</td>
                  <td class="p-3 text-right font-semibold">₹ 610.00</td>
                  <td class="p-3 text-right font-bold text-[#16A34A]">₹ 2,562,000</td>
                </tr>
                <tr class="hover:bg-[#F8FAFC]">
                  <td class="p-3 font-mono font-bold text-[#006C7A]">ARR-2026-00342</td>
                  <td class="p-3">2026-10-06</td>
                  <td class="p-3">DFL UNIT-5 (JPT)</td>
                  <td class="p-3 font-semibold">Konaseema Marine Harvesters Syndicate</td>
                  <td class="p-3">B. Venkatesh</td>
                  <td class="p-3">40 Count</td>
                  <td class="p-3 text-right font-bold">3,850 KG</td>
                  <td class="p-3 text-right font-semibold">₹ 425.00</td>
                  <td class="p-3 text-right font-bold text-[#16A34A]">₹ 1,636,250</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // ==========================================
  // TAB 5: LOT TRACKING (LotTracking.tsx)
  // ==========================================
  renderLotTracking() {
    return `
      <div class="lot-tracking-page">
        <div class="lot-tracking-page-heading">
          <h1>Lot Tracking</h1>
        </div>

        <section class="lot-tracking-filter-card">
          <div class="lot-tracking-filter-heading">
            <h2>
              <svg class="w-4 h-4 text-[#00A6B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              Lot Tracking Filters
            </h2>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase mb-1">Purchase Station</label>
              <select class="w-full text-xs p-2 rounded-lg border border-[#CBD5E1]">
                <option value="">All Stations</option>
                <option value="SKM">SKM</option>
                <option value="RPL">RPL</option>
                <option value="KKD">KKD</option>
                <option value="VSP">VSP</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase mb-1">Species</label>
              <select class="w-full text-xs p-2 rounded-lg border border-[#CBD5E1]">
                <option value="">All Species</option>
                <option value="Vannamei (VM)">Vannamei (VM)</option>
                <option value="Black Tiger (BT)">Black Tiger (BT)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase mb-1">Month</label>
              <select class="w-full text-xs p-2 rounded-lg border border-[#CBD5E1]">
                <option value="10">October</option>
                <option value="09">September</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase mb-1">Year</label>
              <input type="text" class="w-full text-xs p-2 rounded-lg border border-[#CBD5E1]" value="2026" readonly />
            </div>
          </div>
        </section>

        <!-- Lot Ledger Table -->
        <div class="bg-white rounded-xl border border-[#DBE3ED] shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-[#F8FAFC] border-b border-[#DBE3ED] text-[#475569] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="p-3">Arrival Date</th>
                  <th class="p-3">Lot Number</th>
                  <th class="p-3 text-right">Arrival Qty</th>
                  <th class="p-3 text-center">AB Status</th>
                  <th class="p-3 text-right">Deheading</th>
                  <th class="p-3 text-right">Grading</th>
                  <th class="p-3 text-right">VA Qty</th>
                  <th class="p-3 text-right">Soaking</th>
                  <th class="p-3 text-right">Packed</th>
                  <th class="p-3">Station</th>
                  <th class="p-3">Species</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0] text-[#1E293B]">
                ${this.lots.map(l => `
                  <tr class="hover:bg-[#F8FAFC]">
                    <td class="p-3">${l.arrivalDate}</td>
                    <td class="p-3 font-mono font-bold text-[#006C7A]">${l.lotNumber}</td>
                    <td class="p-3 text-right font-bold">${l.arrivalQty.toLocaleString('en-IN')} KG</td>
                    <td class="p-3 text-center">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${l.abStatus === 'Passed' ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEF3C7] text-[#D97706]'}">
                        ${l.abStatus}
                      </span>
                    </td>
                    <td class="p-3 text-right">${l.deheadingQty} KG</td>
                    <td class="p-3 text-right font-semibold">${l.gradingQty ? l.gradingQty.toLocaleString('en-IN') + ' KG' : '—'}</td>
                    <td class="p-3 text-right">${l.vaQty ? l.vaQty.toLocaleString('en-IN') + ' KG' : '—'}</td>
                    <td class="p-3 text-right">${l.soakingQty ? l.soakingQty.toLocaleString('en-IN') + ' KG' : '—'}</td>
                    <td class="p-3 text-right font-bold text-[#16A34A]">${l.packedQty ? l.packedQty.toLocaleString('en-IN') + ' KG' : '—'}</td>
                    <td class="p-3 font-semibold">${l.purchaseStation}</td>
                    <td class="p-3 font-medium">${l.species}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // ==========================================
  // TAB 6: TRANSACTIONS & BILLS
  // ==========================================
  renderTransactionsBills() {
    return `
      <div class="py-2">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h1 class="h4 fw-bold mb-0 text-[#0F172A]">Transactions & Bills</h1>
          <span class="text-xs text-[#64748B]">Accounts payable, supplier invoices & settlement journal</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <div class="bg-white p-3.5 rounded-xl border border-[#DBE3ED] shadow-sm">
            <span class="text-[10px] font-bold uppercase text-[#64748B]">Total Invoiced</span>
            <div class="text-xl font-bold text-[#0F172A] mt-1">₹ 9,565,750</div>
          </div>
          <div class="bg-white p-3.5 rounded-xl border border-[#DBE3ED] shadow-sm">
            <span class="text-[10px] font-bold uppercase text-[#64748B]">Settled Amount</span>
            <div class="text-xl font-bold text-[#16A34A] mt-1">₹ 5,080,000</div>
          </div>
          <div class="bg-white p-3.5 rounded-xl border border-[#DBE3ED] shadow-sm">
            <span class="text-[10px] font-bold uppercase text-[#64748B]">Balance Outstanding</span>
            <div class="text-xl font-bold text-[#D97706] mt-1">₹ 4,485,750</div>
          </div>
          <div class="bg-white p-3.5 rounded-xl border border-[#DBE3ED] shadow-sm">
            <span class="text-[10px] font-bold uppercase text-[#64748B]">Overdue Invoices</span>
            <div class="text-xl font-bold text-[#DC2626] mt-1">0 Bills</div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#DBE3ED] shadow-sm overflow-hidden">
          <div class="p-3 border-b border-[#E2E8F0] bg-[#F8FAFC]">
            <span class="text-xs font-bold text-[#0F172A] uppercase">Purchase Bills Register</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-[#F8FAFC] border-b border-[#DBE3ED] text-[#475569] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="p-3">Bill Number</th>
                  <th class="p-3">Bill Date</th>
                  <th class="p-3">Supplier Name</th>
                  <th class="p-3">Station</th>
                  <th class="p-3 text-right">Total Amount</th>
                  <th class="p-3 text-right">Paid</th>
                  <th class="p-3 text-right">Balance</th>
                  <th class="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0]">
                <tr class="hover:bg-[#F8FAFC]">
                  <td class="p-3 font-mono font-bold text-[#006C7A]">BILL-2026-121</td>
                  <td class="p-3">2026-10-06</td>
                  <td class="p-3 font-semibold">Sri Sai Aqua Farms & Seedlings</td>
                  <td class="p-3">Visakhapatnam Gate Dock</td>
                  <td class="p-3 text-right font-bold">₹ 1,450,000</td>
                  <td class="p-3 text-right font-semibold text-[#16A34A]">₹ 1,450,000</td>
                  <td class="p-3 text-right font-bold text-[#475569]">₹ 0</td>
                  <td class="p-3 text-center"><span class="px-2 py-0.5 bg-[#DCFCE7] text-[#16A34A] rounded text-[10px] font-bold">Paid</span></td>
                </tr>
                <tr class="hover:bg-[#F8FAFC]">
                  <td class="p-3 font-mono font-bold text-[#006C7A]">BILL-2026-120</td>
                  <td class="p-3">2026-10-06</td>
                  <td class="p-3 font-semibold">Krishna Delta Prawn Harvesters</td>
                  <td class="p-3">Machilipatnam Delta #3</td>
                  <td class="p-3 text-right font-bold">₹ 890,000</td>
                  <td class="p-3 text-right font-semibold text-[#16A34A]">₹ 890,000</td>
                  <td class="p-3 text-right font-bold text-[#475569]">₹ 0</td>
                  <td class="p-3 text-center"><span class="px-2 py-0.5 bg-[#DCFCE7] text-[#16A34A] rounded text-[10px] font-bold">Paid</span></td>
                </tr>
                <tr class="hover:bg-[#F8FAFC]">
                  <td class="p-3 font-mono font-bold text-[#006C7A]">BILL-2026-119</td>
                  <td class="p-3">2026-10-06</td>
                  <td class="p-3 font-semibold">Konaseema Marine Harvesters</td>
                  <td class="p-3">Amalapuram Harvesters #4</td>
                  <td class="p-3 text-right font-bold">₹ 1,286,500</td>
                  <td class="p-3 text-right font-semibold text-[#16A34A]">₹ 520,000</td>
                  <td class="p-3 text-right font-bold text-[#D97706]">₹ 766,500</td>
                  <td class="p-3 text-center"><span class="px-2 py-0.5 bg-[#FEF3C7] text-[#D97706] rounded text-[10px] font-bold">Partially Paid</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // ==========================================
  // TAB 7: PAYMENTS (Payments.tsx)
  // ==========================================
  renderPayments() {
    return `
      <div class="purchase-payments-page">
        <h1 class="purchase-payments-title">Supplier Payments Ledger</h1>

        <section class="payment-filters-card">
          <div class="payment-filters-header">
            <div class="payment-filters-heading">
              <svg class="w-4 h-4 text-[#00A6B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              Payment Search Filters
            </div>
          </div>
          <div class="p-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase mb-1">Payment Mode</label>
              <select class="w-full text-xs p-2 rounded-lg border border-[#CBD5E1]">
                <option value="">All Payment Modes</option>
                <option value="RTGS / Bank Wire">RTGS / Bank Wire</option>
                <option value="NEFT">NEFT</option>
                <option value="Direct Bank Transfer">Direct Bank Transfer</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#475569] uppercase mb-1">Status</label>
              <select class="w-full text-xs p-2 rounded-lg border border-[#CBD5E1]">
                <option value="">All Statuses</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="PROCESSING">PROCESSING</option>
              </select>
            </div>
            <div class="flex items-end">
              <button class="rma-primary-button w-full">Apply Filters</button>
            </div>
          </div>
        </section>

        <!-- Payments Table -->
        <div class="bg-white rounded-xl border border-[#DBE3ED] shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-[#F8FAFC] border-b border-[#DBE3ED] text-[#475569] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="p-3">S.No</th>
                  <th class="p-3">Voucher Number</th>
                  <th class="p-3">Payment Date</th>
                  <th class="p-3">Supplier Name</th>
                  <th class="p-3">Agent</th>
                  <th class="p-3">Settled Bill</th>
                  <th class="p-3">Bank Reference</th>
                  <th class="p-3">Payment Mode</th>
                  <th class="p-3 text-right">Amount (INR)</th>
                  <th class="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0] text-[#1E293B]">
                ${this.payments.map(p => `
                  <tr class="hover:bg-[#F8FAFC]">
                    <td class="p-3 font-mono">${p.serialNumber}</td>
                    <td class="p-3 font-mono font-bold text-[#006C7A]">${p.voucherNumber}</td>
                    <td class="p-3">${p.paymentDate}</td>
                    <td class="p-3 font-semibold text-[#0F172A]">${p.supplier}</td>
                    <td class="p-3">${p.agent}</td>
                    <td class="p-3 font-mono font-medium">${p.settledBill}</td>
                    <td class="p-3 font-mono text-[11px] text-[#475569]">${p.bankReference}</td>
                    <td class="p-3"><span class="px-2 py-0.5 rounded text-[11px] font-medium bg-[#F1F5F9] text-[#334155] border border-[#CBD5E1]">${p.paymentMode}</span></td>
                    <td class="p-3 text-right font-bold text-[#16A34A]">₹ ${p.amountINR.toLocaleString('en-IN')}</td>
                    <td class="p-3 text-center">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        p.status === 'COMPLETED' ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEF3C7] text-[#D97706]'
                      }">${p.status}</span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // ==========================================
  // EVENT BINDINGS
  // ==========================================
  bindSubTabEvents(activeTab) {
    if (activeTab === 'dashboard') {
      const btnRaw = document.getElementById('c26-dash-subtab-raw');
      const btnComm = document.getElementById('c26-dash-subtab-comm');
      if (btnRaw) {
        btnRaw.onclick = () => {
          this.activeDashboardSubTab = 'raw';
          this.render('main-content-container', 'dashboard');
        };
      }
      if (btnComm) {
        btnComm.onclick = () => {
          this.activeDashboardSubTab = 'commercial';
          this.render('main-content-container', 'dashboard');
        };
      }

      this.initDashboardCharts();
    } else if (activeTab === 'bookings') {
      this.bindBookingEvents();
    } else if (activeTab === 'raw-material-arrivals') {
      const btnCreate = document.getElementById('c26-btn-create-rm-arrival');
      if (btnCreate) {
        btnCreate.onclick = () => {
          Toast.show('Raw Material Intake Modal initialized', 'info', 'Client 2026');
        };
      }

      document.querySelectorAll('[data-action="delete-rm-arrival"]').forEach(btn => {
        btn.onclick = (e) => {
          const id = Number(btn.getAttribute('data-id'));
          if (confirm('Delete raw material arrival entry?')) {
            this.rmArrivals = this.rmArrivals.filter(a => a.id !== id);
            this.render('main-content-container', 'raw-material-arrivals');
            Toast.show('Arrival entry deleted', 'info');
          }
        };
      });
    }
  },

  initDashboardCharts() {
    if (typeof Chart === 'undefined') return;

    if (this.activeDashboardSubTab === 'raw') {
      const ctxSpecies = document.getElementById('c26-chart-species')?.getContext('2d');
      if (ctxSpecies) {
        new Chart(ctxSpecies, {
          type: 'bar',
          data: {
            labels: ['Vannamei (VM)', 'Black Tiger (BT)'],
            datasets: [{
              label: 'Quantity (KG)',
              data: [9850, 9200],
              backgroundColor: ['#5D6CC3', '#00A6B5'],
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
          }
        });
      }

      const ctxPlant = document.getElementById('c26-chart-plant')?.getContext('2d');
      if (ctxPlant) {
        new Chart(ctxPlant, {
          type: 'bar',
          data: {
            labels: ['DFL UNIT-3', 'DFL UNIT-5', 'DFL UNIT-2', 'DFL UNIT-6', 'DFL UNIT-4'],
            datasets: [{
              label: 'Intake Quantity (KG)',
              data: [5000, 3850, 4200, 3100, 2900],
              backgroundColor: '#7BD7E2',
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
          }
        });
      }
    } else {
      const ctxDaily = document.getElementById('c26-chart-daily')?.getContext('2d');
      if (ctxDaily) {
        new Chart(ctxDaily, {
          type: 'bar',
          data: {
            labels: ['01 Oct', '02 Oct', '03 Oct', '04 Oct', '05 Oct', '06 Oct'],
            datasets: [{
              label: 'Tons',
              data: [2.5, 3.2, 4.1, 2.9, 3.8, 2.55],
              backgroundColor: '#5D6CC3',
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
          }
        });
      }

      const ctxDoughnut = document.getElementById('c26-chart-doughnut')?.getContext('2d');
      if (ctxDoughnut) {
        new Chart(ctxDoughnut, {
          type: 'doughnut',
          data: {
            labels: ['Kakinada', 'Bhimavaram', 'Ongole', 'Amalapuram', 'Machilipatnam'],
            datasets: [{
              data: [5.0, 3.85, 4.2, 3.1, 2.9],
              backgroundColor: ['#ED1B5B', '#F15A00', '#2F9BE9', '#4CAF50', '#FF9800']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } }
          }
        });
      }
    }
  },

  bindBookingEvents() {
    const btnCreate = document.getElementById('c26-btn-create-booking');
    const modalContainer = document.getElementById('c26-booking-modal-container');
    const searchBtn = document.getElementById('c26-booking-search-btn');
    const resetBtn = document.getElementById('c26-booking-reset-btn');
    const filterPurchase = document.getElementById('c26-booking-filter-purchase');
    const filterPlant = document.getElementById('c26-booking-filter-plant');
    const filterDate = document.getElementById('c26-booking-filter-date');
    const downloadAll = document.getElementById('c26-download-all-bookings');

    if (downloadAll) {
      downloadAll.onclick = () => {
        const blob = new Blob([JSON.stringify(this.bookings, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Bookings-Export-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        Toast.show('Exported all bookings as JSON', 'success');
      };
    }

    if (searchBtn) {
      searchBtn.onclick = () => {
        this.bookingFilters = {
          purchaseType: filterPurchase?.value || '',
          arrivalPlant: filterPlant?.value || '',
          date: filterDate?.value || ''
        };
        this.render('main-content-container', 'bookings');
        Toast.show('Filtered bookings register', 'info');
      };
    }

    if (resetBtn) {
      resetBtn.onclick = () => {
        this.bookingFilters = { purchaseType: '', arrivalPlant: '', date: '' };
        this.render('main-content-container', 'bookings');
        Toast.show('Filters reset', 'info');
      };
    }

    // Individual action clicks (Download, Delete)
    document.querySelectorAll('[data-action="download-booking"]').forEach(btn => {
      btn.onclick = () => {
        const id = Number(btn.getAttribute('data-id'));
        const booking = this.bookings.find(b => b.id === id);
        if (booking) {
          const blob = new Blob([JSON.stringify(booking, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${booking.bookingNumber}.json`;
          a.click();
          URL.revokeObjectURL(url);
          Toast.show(`Downloaded ${booking.bookingNumber}.json`, 'success');
        }
      };
    });

    document.querySelectorAll('[data-action="delete-booking"]').forEach(btn => {
      btn.onclick = () => {
        const id = Number(btn.getAttribute('data-id'));
        const booking = this.bookings.find(b => b.id === id);
        if (booking && confirm(`Remove sample booking ${booking.bookingNumber}?`)) {
          this.bookings = this.bookings.filter(b => b.id !== id);
          this.render('main-content-container', 'bookings');
          Toast.show(`Booking ${booking.bookingNumber} deleted`, 'info');
        }
      };
    });

    // Create Booking Modal Opening
    if (btnCreate && modalContainer) {
      btnCreate.onclick = () => {
        const nextId = Math.max(0, ...this.bookings.map(b => b.id)) + 1;
        const nextNum = `PB-2026-${String(nextId * 15 + 100).padStart(3, '0')}`;
        const todayStr = new Date().toISOString().slice(0, 10);

        modalContainer.innerHTML = `
          <div class="fixed inset-0 bg-black/60 z-[120] flex items-center justify-center p-4 overflow-y-auto">
            <div class="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl relative my-8" style="max-height: 90vh; overflow-y: auto;">
              <div class="flex justify-between items-center pb-3 border-b border-[#E2E8F0] mb-4">
                <h2 class="text-base font-bold text-[#0F172A] uppercase">Create Booking</h2>
                <button type="button" class="text-gray-400 hover:text-gray-600 text-lg font-bold" id="c26-modal-close-btn">✕</button>
              </div>

              <form id="c26-form-create-booking" class="create-booking-form">
                <!-- General Information -->
                <section class="create-booking-section create-booking-section--general">
                  <h3>General Information</h3>
                  <div class="create-booking-grid create-booking-grid--four">
                    <div class="create-booking-field">
                      <label>Booking Station *</label>
                      <select id="f-station" required>
                        <option value="">-- Select Booking Station --</option>
                        <option value="Kakinada" selected>Kakinada</option>
                        <option value="Bhimavaram">Bhimavaram</option>
                        <option value="Nellore">Nellore</option>
                      </select>
                    </div>

                    <div class="create-booking-field">
                      <label>Species *</label>
                      <select id="f-species" required>
                        <option value="">-- Select Species --</option>
                        <option value="Vannamei Shrimp" selected>Vannamei Shrimp</option>
                        <option value="Black Tiger Shrimp">Black Tiger Shrimp</option>
                        <option value="Asian Seabass (Barramundi)">Asian Seabass (Barramundi)</option>
                      </select>
                    </div>

                    <div class="create-booking-field">
                      <label>Purchase Type *</label>
                      <select id="f-purchase-type" required>
                        <option value="">-- Select Purchase Type --</option>
                        <option value="Direct Farmer Procurement" selected>Direct Farmer Procurement</option>
                        <option value="Hatchery Buyback Contract">Hatchery Buyback Contract</option>
                        <option value="Agent Procurement Order">Agent Procurement Order</option>
                        <option value="Corporate Feed-Linked Booking">Corporate Feed-Linked Booking</option>
                        <option value="Spot Market Purchase">Spot Market Purchase</option>
                      </select>
                    </div>

                    <div class="create-booking-field">
                      <label>Booking Number</label>
                      <input id="f-booking-number" value="${nextNum}" readonly style="background:#F1F5F9; font-weight:bold;" />
                    </div>

                    <div class="create-booking-field">
                      <label>Vehicle Number</label>
                      <input id="f-vehicle" placeholder="e.g. AP 37 TE 4821" value="AP 37 TE 8890" />
                    </div>

                    <div class="create-booking-field">
                      <label>Driver Name</label>
                      <input id="f-driver" placeholder="e.g. G. Narayana" value="K. Subbarao" />
                    </div>

                    <div class="create-booking-field">
                      <label>Grader Name</label>
                      <input id="f-grader" placeholder="e.g. B. Venkatesh" value="B. Venkatesh" />
                    </div>

                    <div class="create-booking-field">
                      <label>Booking Date *</label>
                      <input type="date" id="f-date" value="${todayStr}" required />
                    </div>

                    <div class="create-booking-field">
                      <label>Farm Location</label>
                      <input id="f-farm" placeholder="e.g. Bhimavaram Cluster #4" value="Kakinada Coast Pond #1" />
                    </div>

                    <div class="create-booking-field create-booking-field--span-three">
                      <label>Suppliers *</label>
                      <select id="f-supplier" required>
                        <option value="">-- Select Supplier / Farmer --</option>
                        <option value="Direct Farmer" selected>Direct Farmer</option>
                        <option value="Coastal Marine Agency">Coastal Marine Agency</option>
                        <option value="Sagar Marine Brokers">Sagar Marine Brokers</option>
                        <option value="Delta Seafood Associates">Delta Seafood Associates</option>
                        <option value="Nellore Aqua Syndicate">Nellore Aqua Syndicate</option>
                      </select>
                    </div>
                  </div>

                  <div class="create-booking-grid create-booking-grid--two mt-3">
                    <div class="create-booking-field">
                      <label>Agent Name</label>
                      <input id="f-agent" placeholder="e.g. Coastal Marine Agency" value="Coastal Marine Agency" />
                    </div>
                    <div class="create-booking-field">
                      <label>Remarks</label>
                      <textarea id="f-remarks" rows="2" placeholder="e.g. Harvest scheduled for 4:00 AM...">Early harvest crates prepared with ice slurry</textarea>
                    </div>
                  </div>
                </section>

                <!-- Booking Details -->
                <section class="create-booking-section create-booking-section--general">
                  <h3>Booking Details</h3>
                  <div class="create-booking-grid create-booking-grid--three">
                    <div class="create-booking-field">
                      <label>Booking Count *</label>
                      <input id="f-count" placeholder="e.g. 40 Count" value="40 Count" required />
                    </div>

                    <div class="create-booking-field">
                      <label>Booking Weight (KGS) *</label>
                      <input type="number" id="f-weight" min="1" step="any" placeholder="e.g. 3500" value="3500" required />
                    </div>

                    <div class="create-booking-field">
                      <label>Booking Rate (₹ / KG) *</label>
                      <input type="number" id="f-rate" min="1" step="any" placeholder="e.g. 440" value="440" required />
                    </div>
                  </div>
                </section>

                <!-- Modal Footer -->
                <div class="create-booking-modal__footer pt-2">
                  <button type="button" class="create-booking-modal__cancel" id="c26-modal-cancel-btn">Cancel</button>
                  <button type="submit" class="create-booking-modal__save">Save Booking</button>
                </div>
              </form>
            </div>
          </div>
        `;

        const closeBtn = document.getElementById('c26-modal-close-btn');
        const cancelBtn = document.getElementById('c26-modal-cancel-btn');
        const form = document.getElementById('c26-form-create-booking');

        const closeModal = () => {
          modalContainer.innerHTML = '';
        };

        if (closeBtn) closeBtn.onclick = closeModal;
        if (cancelBtn) cancelBtn.onclick = closeModal;

        if (form) {
          form.onsubmit = (e) => {
            e.preventDefault();
            const station = document.getElementById('f-station')?.value || 'Kakinada';
            const species = document.getElementById('f-species')?.value || 'Vannamei Shrimp';
            const purchaseType = document.getElementById('f-purchase-type')?.value || 'Direct Farmer Procurement';
            const bookingNumber = document.getElementById('f-booking-number')?.value || nextNum;
            const vehicle = document.getElementById('f-vehicle')?.value || '';
            const driver = document.getElementById('f-driver')?.value || '';
            const grader = document.getElementById('f-grader')?.value || '';
            const bookingDate = document.getElementById('f-date')?.value || todayStr;
            const farm = document.getElementById('f-farm')?.value || '';
            const supplier = document.getElementById('f-supplier')?.value || 'Direct Farmer';
            const agent = document.getElementById('f-agent')?.value || 'Direct Farmer';
            const remarks = document.getElementById('f-remarks')?.value || '';
            const count = document.getElementById('f-count')?.value || '40 Count';
            const weight = Number(document.getElementById('f-weight')?.value) || 0;
            const rate = Number(document.getElementById('f-rate')?.value) || 0;

            const newBooking = {
              id: nextId,
              serialNumber: this.bookings.length + 1,
              species,
              bookingNumber,
              bookingDate,
              purchaseType,
              grader: grader || '—',
              agent: agent || '—',
              bookingCount: count,
              bookingWeight: weight,
              bookingValue: weight * rate,
              bookingRate: rate,
              arrivalPlant: station,
              bookingStation: station,
              vehicleNumber: vehicle,
              driverName: driver,
              farmLocation: farm,
              supplier,
              remarks
            };

            this.bookings.unshift(newBooking);
            closeModal();
            this.render('main-content-container', 'bookings');
            Toast.show(`Booking ${bookingNumber} created successfully!`, 'success', 'Client 2026');
          };
        }
      };
    }
  }
};
