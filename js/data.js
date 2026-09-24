/* ================================================================
   DATA CONFIG & STATE
   ================================================================ */
const state = {
  module: 'sales',
  sub: 'dashboard',
  charts: {},
  cmdIndex: 0,
  orders: [],
  isAuthenticated: false
};

const badge = (t, x) => `<span class="badge badge-${t} badge-dot">${x}</span>`;

const MODULES = {
  sales: {
    label: 'Sales',
    subs: [
      { 
        id: 'dashboard', 
        label: 'DashBoard',
        tertiary: [
          { id: 'sales-dashboard', label: 'Dashboard' }
        ]
      },
      { 
        id: 'products', 
        label: 'Product',
        tertiary: [
          { id: 'productlist', label: 'ProductList' },
          { id: 'preparationlist', label: 'PreparationList' },
          { id: 'species', label: 'Species' },
          { id: 'gradeslist', label: 'GradesList' },
          { id: 'packingstylelist', label: 'PackingStyleList' },
          { id: 'varietylist', label: 'Variety List' }
        ]
      },
      { 
        id: 'buyers', 
        label: 'Buyers',
        tertiary: [
          { id: 'buyerlist', label: 'Buyer List' },
          { id: 'consigneelist', label: 'Consignee List' },
          { id: 'notifyparty', label: 'Notify Party List' },
          { id: 'applicantlist', label: 'Applicant List' },
          { id: 'brandslist', label: 'Brands List' }
        ]
      },
      { 
        id: 'sales', 
        label: 'Sales',
        tertiary: [
          { id: 'delayedshipments', label: 'Delayed Shipments' }
        ]
      },
      { 
        id: 'orders', 
        label: 'Orders', 
        badge: '12',
        tertiary: [
          { id: 'proformalist', label: 'Proforma List' },
          { id: 'custominvoices', label: 'Custom Invoices' },
          { id: 'isfdetails', label: 'ISF Details' },
          { id: 'shippingbill', label: 'Shipping Bill' },
          { id: 'commercialinvoice', label: 'Commercial Invoice' },
          { id: 'etastatus', label: 'ETA Status' },
          { id: 'fdastatus', label: 'FDA Status' },
          { id: 'clearingagent', label: 'Clearing Agent' }
        ]
      },
      { 
        id: 'payments', 
        label: 'Payments',
        tertiary: [
          { id: 'forwardcontracts', label: 'Forward Contracts' },
          { id: 'collections', label: 'Collections' },
          { id: 'negotiations', label: 'Negotiations' },
          { id: 'realization', label: 'Realization' },
          { id: 'realizationdone', label: 'Realization Done' }
        ]
      },
      { 
        id: 'insurance', 
        label: 'Insurance',
        tertiary: [
          { id: 'pendinginsurance', label: 'Pending Insurance' },
          { id: 'insurancetemplates', label: 'Insurance Templates' },
          { id: 'insurancepayments', label: 'Insurance Payments' }
        ]
      },
      { 
        id: 'reports', 
        label: 'Reports',
        tertiary: [
          { id: 'pendingcontracts', label: 'Pending Contracts' },
          { id: 'pricebook', label: 'Price Book' },
          { id: 'approvedcontracts', label: 'Approved Contracts' },
          { id: 'etastatusreport', label: 'OUT of ETD/ETA Report' },
          { id: 'fdareport', label: 'FDA Examination Report' },
          { id: 'mpedareport', label: 'MPEDA Report' },
          { id: 'shipmentreport', label: 'Shipment Report' },
          { id: 'labreport', label: 'Lab Report' },
          { id: 'qcertreport', label: 'Q Certificate Report' },
          { id: 'pendingpaymentsreport', label: 'Pending Payments' },
          { id: 'pendingnegoreport', label: 'Pending Negotiation Report' },
          { id: 'billsrealization', label: 'Bills Realization' },
          { id: 'fcutilizedreport', label: 'FC Utilized Report' },
          { id: 'gstsalesreport', label: 'GST Sales report' },
          { id: 'clearingagentreport', label: 'Clearing Agent Report' },
          { id: 'mtransitins', label: 'M Transit Ins & Payments' },
          { id: 'packingreport', label: 'Packing Report' },
          { id: 'lineitemwisereport', label: 'Shipment LineItemwise Report' },
          { id: 'returncontainer', label: 'Return Container Report' },
          { id: 'freightrates', label: 'Freight Rates Report' }
        ]
      }
    ]
  },
  purchase: {
    label: 'Purchase',
    subs: [
      { 
        id: 'purchasedashboard', 
        label: 'DashBoard',
        tertiary: [
          { id: 'purchase-dashboard', label: 'Purchase Dashboard' },
          { id: 'rm-dashboard', label: 'RM DashBoard' }
        ]
      },
      { 
        id: 'purchaseorders', 
        label: 'Purchase',
        tertiary: [
          { id: 'po-orders', label: 'Purchase Orders' },
          { id: 'vendor-reg', label: 'Vendor List' },
          { id: 'pr-reg', label: 'PR Register' }
        ]
      },
      { 
        id: 'purchasepreprocessing', 
        label: 'Pre Processing',
        tertiary: [
          { id: 'pur-lots', label: 'Lots' },
          { id: 'recv-log', label: 'Receiving Log' }
        ]
      },
      { 
        id: 'purchasereports', 
        label: 'Reports',
        tertiary: [
          { id: 'pur-summary', label: 'Purchase Summary' },
          { id: 'rm-audit', label: 'RM Audit' }
        ]
      },
      { 
        id: 'purchasetickets', 
        label: 'Tickets',
        tertiary: [
          { id: 'open-tickets', label: 'Open Tickets' },
          { id: 'resolved-tickets', label: 'Resolved Tickets' }
        ]
      },
      { 
        id: 'purchasehelp', 
        label: 'Help',
        tertiary: [
          { id: 'kb', label: 'Knowledge Base' }
        ]
      }
    ]
  },
  preprocessing: {
    label: 'Preprocessing',
    subs: [
      { 
        id: 'preprocessdevelopment', 
        label: 'Development',
        tertiary: [
          { id: 'consolidation-report', label: 'Consolidation Report' }
        ]
      },
      { 
        id: 'preprocessingsec', 
        label: 'Pre Processing',
        tertiary: [
          { id: 'preprocess-board', label: 'Preprocess Board' },
          { id: 'grading-reg', label: 'Grading Register' }
        ]
      },
      { 
        id: 'preprocessreports', 
        label: 'Production Reports',
        tertiary: [
          { id: 'daily-output', label: 'Daily Output Report' }
        ]
      },
      { 
        id: 'preprocesschemical', 
        label: 'Chemical Screens',
        tertiary: [
          { id: 'chemical-logs', label: 'Chemical Logs' }
        ]
      }
    ]
  },
  qc: {
    label: 'Quality Control',
    subs: [
      { 
        id: 'qcdashboard', 
        label: 'QC DashBoard',
        tertiary: [
          { id: 'qcdashboardnew', label: 'QC DashBoard New' }
        ]
      },
      { 
        id: 'qclots', 
        label: 'Lots',
        tertiary: [
          { id: 'lots-status', label: 'Lots Status' }
        ]
      },
      { 
        id: 'qcpreprocessing', 
        label: 'Pre-Processing',
        tertiary: [
          { id: 'preprocess-qc', label: 'Pre-Processing QC' }
        ]
      },
      { 
        id: 'qccontrol', 
        label: 'Quality Control',
        tertiary: [
          { id: 'organoleptic', label: 'Organoleptic Audit' }
        ]
      },
      { 
        id: 'qcchemicallab', 
        label: 'Chemical Lab Test',
        tertiary: [
          { id: 'chemical-screening', label: 'Chemical Screening' }
        ]
      },
      { 
        id: 'qclab', 
        label: 'QC Lab',
        tertiary: [
          { id: 'lab-register', label: 'Lab Register' }
        ]
      },
      { 
        id: 'qcreports', 
        label: 'QC REPORTS',
        tertiary: [
          { id: 'qc-summary', label: 'QC Summary Report' }
        ]
      }
    ]
  },
  production: {
    label: 'Production',
    subs: [
      { 
        id: 'proddevelopment', 
        label: 'Development',
        tertiary: [
          { id: 'productionstandardyields', label: 'ProductionStandaradYields' }
        ]
      },
      { 
        id: 'proddashboard', 
        label: 'DashBoard',
        tertiary: [
          { id: 'prod-overview', label: 'Production Overview' }
        ]
      },
      { 
        id: 'prodpreprocessing', 
        label: 'Pre Processing',
        tertiary: [
          { id: 'yield-analysis', label: 'Yield Analysis' }
        ]
      },
      { 
        id: 'prodproduction', 
        label: 'Production',
        tertiary: [
          { id: 'batch-reg', label: 'Batch Register' }
        ]
      },
      { 
        id: 'prodreports', 
        label: 'Production Reports',
        tertiary: [
          { id: 'shift-report', label: 'Shift Report' }
        ]
      },
      { 
        id: 'prodantidumping', 
        label: 'Anti Dumping',
        tertiary: [
          { id: 'duty-audit', label: 'Duty Audit' }
        ]
      }
    ]
  },
  coldstore: {
    label: 'Coldstore',
    subs: [
      { 
        id: 'coldstoredevelopment', 
        label: 'Development',
        tertiary: [
          { id: 'dailystockreport', label: 'Daily Stock Report (Plant wise) New' },
          { id: 'stockvaluereport', label: 'Stock Value Report' },
          { id: 'stockvaluelandscape', label: 'Stock Value Report Landscape' }
        ]
      },
      { 
        id: 'coldstoredashboard', 
        label: 'DashBoard',
        tertiary: [
          { id: 'cold-overview', label: 'Coldstore Overview' }
        ]
      },
      { 
        id: 'coldstoreproduction', 
        label: 'Production',
        tertiary: [
          { id: 'freezing-log', label: 'Freezing Log' }
        ]
      },
      { 
        id: 'coldstorestock', 
        label: 'Stock',
        tertiary: [
          { id: 'chamber-stock', label: 'Chamber Stock' }
        ]
      },
      { 
        id: 'coldstoreorders', 
        label: 'Orders',
        tertiary: [
          { id: 'dispatch-orders', label: 'Dispatch Orders' }
        ]
      },
      { 
        id: 'coldstorestore', 
        label: 'Store',
        tertiary: [
          { id: 'rack-storage', label: 'Rack Storage' }
        ]
      },
      { 
        id: 'coldstorestockapprovals', 
        label: 'Stock Approvals',
        tertiary: [
          { id: 'transfer-appr', label: 'Transfer Approval' }
        ]
      },
      { 
        id: 'coldstoreibt', 
        label: 'IBT',
        tertiary: [
          { id: 'ibt-transfer', label: 'Inter-Branch Transfer' }
        ]
      },
      { 
        id: 'coldstoreshipments', 
        label: 'Shipments',
        tertiary: [
          { id: 'container-load', label: 'Container Loading' }
        ]
      },
      { 
        id: 'coldstorestorereports', 
        label: 'Store Reports',
        tertiary: [
          { id: 'temp-logs', label: 'Temperature Logs' }
        ]
      }
    ]
  },
  inventory: {
    label: 'Inventory',
    subs: [
      { 
        id: 'invgeneralstore', 
        label: 'General Store',
        tertiary: [
          { id: 'indentpagegs', label: 'Indent Page (GS)' },
          { id: 'indentlistgs', label: 'Indent List(GS)' },
          { id: 'proformaordergs', label: 'Proforma Order (GS)' },
          { id: 'proformalistgs', label: 'Proforma List (GS)' },
          { id: 'grngs', label: 'Goods Receipt Note (GS)' },
          { id: 'grnlistgs', label: 'Goods Receipt Note List (GS)' },
          { id: 'materialissuegs', label: 'Material Issue (GS)' }
        ]
      },
      { 
        id: 'invpackingmaterial', 
        label: 'Packing Material',
        tertiary: [
          { id: 'carton-stock', label: 'Carton Stock' },
          { id: 'pouch-stock', label: 'Pouch Stock' }
        ]
      },
      { 
        id: 'invstock', 
        label: 'Inventory',
        tertiary: [
          { id: 'stock-val', label: 'Stock Valuation' }
        ]
      }
    ]
  },
  settings: {
    label: 'Settings',
    standalone: true,
    subs: [
      { id: 'profile', label: 'Profile' },
      { id: 'notifications', label: 'Notifications' },
      { id: 'security', label: 'Security' },
      { id: 'billing', label: 'Billing' },
      { id: 'integrations', label: 'Integrations' },
      { id: 'team', label: 'Team' }
    ]
  },
  activity: {
    label: 'Activity Log',
    standalone: true,
    subs: [
      { id: 'all', label: 'All Activity' },
      { id: 'orders', label: 'Orders' },
      { id: 'payments', label: 'Payments' },
      { id: 'system', label: 'System' }
    ]
  }
};

const ORDER_STATUS_LABELS = {
  new: 'New Orders',
  processing: 'Processing',
  quality: 'In QC',
  shipped: 'Shipped',
  delivered: 'Delivered'
};

const ORDER_STATUS_COLORS = {
  new: '#2563EB',
  processing: '#D97706',
  quality: '#7C3AED',
  shipped: '#0891B2',
  delivered: '#059669'
};

function generateOrders() {
  const customers = ['USA Imports LLC','EU Trading BV','Asia Pacific Seafoods','Ocean Fresh GmbH','Nordic Seafoods A/S','Tokyo Fishery Co','Mediterranean Foods','Atlantic Traders'];
  const products = ['Frozen Shrimp 26/30','Fresh Salmon Fillet','Canned Tuna','Frozen Squid','Lobster Tails','Crab Meat','Mussels','Cuttlefish'];
  const ports = ['New York','Los Angeles','Rotterdam','Shanghai','Hamburg','Singapore','Dubai','Sydney'];
  const statuses = ['new','processing','quality','shipped','delivered'];
  const out = [];
  for (let i = 0; i < 42; i++) {
    out.push({
      id: `ORD-2026-${String(i + 400).padStart(4, '0')}`,
      customer: customers[i % customers.length],
      product: products[i % products.length],
      quantity: 5 + Math.floor(Math.random() * 50),
      value: 10000 + Math.floor(Math.random() * 200000),
      status: statuses[i % statuses.length],
      shipDate: new Date(Date.now() + Math.random() * 90 * 86400000),
      destination: ports[i % ports.length],
      assignee: ['SA','RK','PS','MK'][i % 4]
    });
  }
  return out;
}

state.orders = generateOrders();

const PRODUCTS = [
  { name: 'Frozen Shrimp 26/30', sku: 'SHR-26-30', price: 4500, stock: 245, img: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&auto=format&fit=crop&q=80', sold: 1247, rating: 4.8 },
  { name: 'Fresh Salmon Fillet', sku: 'SAL-FIL-01', price: 8200, stock: 128, img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80', sold: 892, rating: 4.9 },
  { name: 'Canned Tuna', sku: 'TUN-CAN-01', price: 2100, stock: 542, img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80', sold: 3421, rating: 4.5 },
  { name: 'Frozen Squid', sku: 'SQD-FRZ-01', price: 3800, stock: 87, img: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600&auto=format&fit=crop&q=80', sold: 567, rating: 4.7 },
  { name: 'Lobster Tails', sku: 'LOB-TAL-01', price: 18500, stock: 42, img: 'https://images.unsplash.com/photo-1559742811-822863c46f43?w=600&auto=format&fit=crop&q=80', sold: 234, rating: 4.9 },
  { name: 'Crab Meat', sku: 'CRB-MT-01', price: 12500, stock: 65, img: 'https://images.unsplash.com/photo-1553659971-f01207815844?w=600&auto=format&fit=crop&q=80', sold: 412, rating: 4.6 },
  { name: 'Fresh Mussels', sku: 'MUS-FR-01', price: 2800, stock: 3, img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80', sold: 891, rating: 4.4 },
  { name: 'Cuttlefish', sku: 'CUT-FRZ-01', price: 4200, stock: 156, img: 'https://images.unsplash.com/photo-1501595091296-3aa970afb3ff?w=600&auto=format&fit=crop&q=80', sold: 623, rating: 4.5 }
];

const BUYERS = [
  { name: 'USA Imports LLC', flag: '🇺🇸', country: 'United States', contact: 'john@usaimports.com', orders: 87, revenue: 2400000, credit: 500000, status: 'active' },
  { name: 'EU Trading BV', flag: '🇳🇱', country: 'Netherlands', contact: 'peter@eutrading.nl', orders: 52, revenue: 1800000, credit: 300000, status: 'active' },
  { name: 'Asia Pacific Seafoods', flag: '🇸🇬', country: 'Singapore', contact: 'wei@apseafoods.sg', orders: 41, revenue: 1200000, credit: 250000, status: 'active' },
  { name: 'Ocean Fresh GmbH', flag: '🇩🇪', country: 'Germany', contact: 'hans@oceanfresh.de', orders: 38, revenue: 980000, credit: 200000, status: 'active' },
  { name: 'Nordic Seafoods A/S', flag: '🇩🇰', country: 'Denmark', contact: 'lars@nordic.dk', orders: 29, revenue: 720000, credit: 180000, status: 'active' },
  { name: 'Tokyo Fishery Co', flag: '🇯🇵', country: 'Japan', contact: 'yuki@tokyofish.jp', orders: 45, revenue: 1100000, credit: 220000, status: 'active' },
  { name: 'Atlantic Traders', flag: '🇬🇧', country: 'UK', contact: 'james@atlantic.uk', orders: 12, revenue: 280000, credit: 100000, status: 'inactive' }
];

const COLD_ROOMS = [
  { id: 'CR-01', name: 'Room Alpha', temp: -22.4, target: -22, humidity: 85, capacity: 82, product: 'Shrimp', status: 'ok' },
  { id: 'CR-02', name: 'Room Beta', temp: -21.8, target: -22, humidity: 83, capacity: 75, product: 'Salmon', status: 'ok' },
  { id: 'CR-03', name: 'Room Gamma', temp: -18.2, target: -20, humidity: 88, capacity: 91, product: 'Tuna', status: 'warning' },
  { id: 'CR-04', name: 'Room Delta', temp: -15.6, target: -22, humidity: 90, capacity: 68, product: 'Squid', status: 'critical' },
  { id: 'CR-05', name: 'Room Epsilon', temp: -23.1, target: -22, humidity: 82, capacity: 54, product: 'Lobster', status: 'ok' },
  { id: 'CR-06', name: 'Room Zeta', temp: -22.7, target: -22, humidity: 86, capacity: 79, product: 'Crab', status: 'ok' }
];

const QC_CHECKLIST = [
  { label: 'Visual inspection of packaging', value: 'Pass', checked: true },
  { label: 'Temperature check at arrival', value: '-22°C', checked: true },
  { label: 'Weight verification', value: '25.2 Tons', checked: true },
  { label: 'Microbial sampling', value: 'Pending', checked: false },
  { label: 'Label compliance check', value: 'Pass', checked: true },
  { label: 'Certificate of Origin verified', value: 'Pass', checked: false },
  { label: 'HACCP documentation review', value: 'Pending', checked: false }
];

const GENERIC_PAGES = {
  suppliers: {
    title: 'Supplier Management',
    subtitle: 'Vendor master, ratings and outstanding balances',
    kpis: [
      { l: 'Total Suppliers', v: '34', i: 'store', c: 'primary', t: '+4 this quarter', d: 'up' },
      { l: 'Active', v: '28', i: 'check-circle', c: 'success', t: '82% active' },
      { l: 'On Contract', v: '21', i: 'file-signature', c: 'info', t: '4 expiring soon' },
      { l: 'Pending Approval', v: '3', i: 'user-check', c: 'warning', t: 'Needs review', d: 'down' }
    ],
    table: {
      title: 'Supplier Directory',
      columns: ['Supplier ID','Name','Category','Region','Rating','Supply (T)','Outstanding','Status'],
      rows: [
        ['<span class="row-id">SUP-001</span>','Kerala Fishermen Co-op','Raw Shrimp','Kochi','★ 4.8','1,240','$42,000', badge('success','Active')],
        ['<span class="row-id">SUP-002</span>','Ocean Harvest Ltd','Salmon','Mangalore','★ 4.6','860','$18,500', badge('success','Active')],
        ['<span class="row-id">SUP-003</span>','Blue Wave Traders','Tuna','Thoothukudi','★ 4.4','620','$0', badge('success','Active')],
        ['<span class="row-id">SUP-004</span>','South India Catch','Mixed Seafood','Chennai','★ 4.2','410','$9,800', badge('warning','On Hold')],
        ['<span class="row-id">SUP-005</span>','Coastal Aquafarms','Farmed Shrimp','Kakinada','★ 4.7','980','$26,400', badge('success','Active')],
        ['<span class="row-id">SUP-006</span>','Deep Sea Exports','Squid & Cuttlefish','Visakhapatnam','★ 4.0','220','$0', badge('gray','Inactive')]
      ]
    }
  },
  'purchase-orders': {
    title: 'Purchase Orders',
    subtitle: 'All POs raised to suppliers',
    kpis: [
      { l: 'Open POs', v: '18', i: 'file-text', c: 'primary', t: '+4 this week', d: 'up' },
      { l: 'Awaiting Approval', v: '5', i: 'hourglass', c: 'warning', t: '2 urgent' },
      { l: 'In Transit', v: '6', i: 'truck', c: 'info', t: '3 arriving today' },
      { l: 'Spend This Month', v: '$420K', i: 'dollar-sign', c: 'success', t: '-6% vs last', d: 'down' }
    ],
    table: {
      title: 'PO Register',
      columns: ['PO Number','Supplier','Product','Qty (Kg)','Value','Status','ETA'],
      rows: [
        ['<span class="row-id">PO-2026-0104</span>','Kerala Fishermen Co-op','Raw Shrimp','12,000','$54,000', badge('info','In Transit'),'Sep 18, 2026'],
        ['<span class="row-id">PO-2026-0105</span>','Ocean Harvest Ltd','Salmon Loins','6,500','$48,750', badge('warning','Approval'),'Sep 20, 2026'],
        ['<span class="row-id">PO-2026-0106</span>','Blue Wave Traders','Tuna','9,000','$31,500', badge('success','Received'),'Sep 14, 2026'],
        ['<span class="row-id">PO-2026-0107</span>','Coastal Aquafarms','Farmed Shrimp','15,000','$63,000', badge('info','In Transit'),'Sep 22, 2026'],
        ['<span class="row-id">PO-2026-0108</span>','South India Catch','Mixed Seafood','4,200','$14,700', badge('gray','Draft'),'—']
      ]
    }
  },
  landings: {
    title: 'Vessel Landings',
    subtitle: 'Catch landed at harbour, priced and QC-cleared',
    kpis: [
      { l: 'Landings This Week', v: '12', i: 'anchor', c: 'primary', t: '+3 vs last week', d: 'up' },
      { l: 'Total Catch', v: '84 T', i: 'fish', c: 'info', t: 'Across 9 vessels' },
      { l: 'Avg Price', v: '$3.85', i: 'tag', c: 'success', t: 'per Kg' },
      { l: 'QC Rejected', v: '2', i: 'x-circle', c: 'error', t: '1.9% of catch', d: 'down' }
    ],
    table: {
      title: 'Landing Register',
      columns: ['Landing ID','Vessel','Species','Qty (Kg)','Price/Kg','Date','QC Status'],
      rows: [
        ['<span class="row-id">LND-0871</span>','MV Ocean Pearl','White Shrimp','8,400','$4.10','Sep 16, 2026', badge('success','Passed')],
        ['<span class="row-id">LND-0872</span>','MV Sea Hawk','Yellowfin Tuna','5,200','$3.60','Sep 16, 2026', badge('success','Passed')],
        ['<span class="row-id">LND-0873</span>','MV Coral Star','Squid','3,100','$2.90','Sep 15, 2026', badge('warning','Sampling')],
        ['<span class="row-id">LND-0874</span>','MV Blue Fin','Tiger Shrimp','6,800','$4.60','Sep 15, 2026', badge('error','Rejected')],
        ['<span class="row-id">LND-0875</span>','MV Ocean Pearl','Cuttlefish','2,400','$3.20','Sep 14, 2026', badge('success','Passed')]
      ]
    }
  },
  contracts: {
    title: 'Purchase Contracts',
    subtitle: 'Supplier agreements and validity tracking',
    kpis: [
      { l: 'Active Contracts', v: '21', i: 'file-signature', c: 'primary', t: '3 new this month', d: 'up' },
      { l: 'Expiring ≤30d', v: '4', i: 'alarm-clock', c: 'warning', t: 'Renewal needed' },
      { l: 'Total Value', v: '$2.1M', i: 'dollar-sign', c: 'success', t: 'FY 2026-27' },
      { l: 'Breaches', v: '1', i: 'alert-octagon', c: 'error', t: 'Under legal review', d: 'down' }
    ],
    table: {
      title: 'Contract Register',
      columns: ['Contract #','Supplier','Product','Volume (T)','Valid Till','Status'],
      rows: [
        ['<span class="row-id">CON-2026-11</span>','Kerala Fishermen Co-op','Raw Shrimp','2,400','Mar 31, 2027', badge('success','Active')],
        ['<span class="row-id">CON-2026-12</span>','Ocean Harvest Ltd','Salmon','900','Dec 15, 2026', badge('success','Active')],
        ['<span class="row-id">CON-2026-13</span>','Blue Wave Traders','Tuna','1,200','Oct 10, 2026', badge('warning','Expiring')],
        ['<span class="row-id">CON-2026-14</span>','Coastal Aquafarms','Farmed Shrimp','3,000','Jun 30, 2027', badge('success','Active')],
        ['<span class="row-id">CON-2025-42</span>','South India Catch','Mixed','500','Aug 01, 2026', badge('error','Expired')]
      ]
    }
  },
  lots: {
    title: 'Lot Management',
    subtitle: 'Every lot from receiving to dispatch readiness',
    kpis: [
      { l: 'Active Lots', v: '46', i: 'layers', c: 'primary', t: '+6 today', d: 'up' },
      { l: 'In Grading', v: '12', i: 'scale', c: 'info', t: '3 lines busy' },
      { l: 'In Sorting', v: '8', i: 'split', c: 'purple', t: '2 queued' },
      { l: 'Ready to Process', v: '26', i: 'check-circle', c: 'success', t: 'Cleared by QC' }
    ],
    table: {
      title: 'Lot Register',
      columns: ['Lot #','Source PO','Species','Qty (Kg)','Received','Stage','Yield %'],
      rows: [
        ['<span class="row-id">LOT-0847</span>','PO-2026-0104','White Shrimp','12,000','Sep 16','Grading','—'],
        ['<span class="row-id">LOT-0848</span>','PO-2026-0104','White Shrimp','8,400','Sep 16','Sorting','94.2'],
        ['<span class="row-id">LOT-0849</span>','PO-2026-0107','Farmed Shrimp','15,000','Sep 15','Received','—'],
        ['<span class="row-id">LOT-0850</span>','PO-2026-0106','Tuna','9,000','Sep 14','Cleaning','91.8'],
        ['<span class="row-id">LOT-0851</span>','PO-2026-0106','Tuna','6,000','Sep 14','Packing','96.1']
      ]
    }
  },
  grading: {
    title: 'Grading Operations',
    subtitle: 'Grade split (A/B/C) per lot with operator traceability',
    kpis: [
      { l: 'Lots Graded Today', v: '9', i: 'scale', c: 'primary', t: '+2 vs avg', d: 'up' },
      { l: 'Grade A Share', v: '72%', i: 'award', c: 'success', t: 'Target 70%' },
      { l: 'Grade B Share', v: '21%', i: 'medal', c: 'info', t: 'Within range' },
      { l: 'Grade C Share', v: '7%', i: 'archive', c: 'warning', t: '-1.2% vs avg', d: 'up' }
    ],
    table: {
      title: 'Grading Sheet',
      columns: ['Lot #','Product','Grade A (Kg)','Grade B (Kg)','Grade C (Kg)','Total','Graded By','Date'],
      rows: [
        ['<span class="row-id">LOT-0848</span>','White Shrimp','6,100','1,800','500','8,400','R. Kumar','Sep 16'],
        ['<span class="row-id">LOT-0845</span>','Tiger Shrimp','4,900','1,400','300','6,600','P. Sharma','Sep 16'],
        ['<span class="row-id">LOT-0844</span>','Tuna Loins','7,200','1,500','300','9,000','R. Kumar','Sep 15'],
        ['<span class="row-id">LOT-0843</span>','Squid','2,100','700','300','3,100','M. Khan','Sep 15']
      ]
    }
  },
  sorting: {
    title: 'Sorting Lines',
    subtitle: 'Size-class sorting throughput and queue',
    kpis: [
      { l: 'Sorting Lines', v: '6', i: 'split', c: 'primary', t: '4 running' },
      { l: 'Throughput', v: '1,240', i: 'gauge', c: 'info', t: 'Kg per hour' },
      { l: 'Queue', v: '7 lots', i: 'list-ordered', c: 'warning', t: 'Est. 3.5 hrs' },
      { l: 'Avg Efficiency', v: '88%', i: 'trending-up', c: 'success', t: '+4% vs last week', d: 'up' }
    ],
    table: {
      title: 'Line Status',
      columns: ['Line','Lot #','Size Class','Target (Kg)','Done (Kg)','Efficiency','Status'],
      rows: [
        ['Line 1','<span class="row-id">LOT-0848</span>','26/30','4,000','3,620','91%', badge('success','Running')],
        ['Line 2','<span class="row-id">LOT-0848</span>','31/40','2,500','2,180','87%', badge('success','Running')],
        ['Line 3','<span class="row-id">LOT-0845</span>','16/20','3,000','1,240','41%', badge('success','Running')],
        ['Line 4','—','—','—','—','—', badge('gray','Idle')],
        ['Line 5','<span class="row-id">LOT-0850</span>','Loins','5,000','4,410','88%', badge('success','Running')],
        ['Line 6','—','—','—','—','—', badge('warning','Maintenance')]
      ]
    }
  },
  inspections: {
    title: 'QC Inspections',
    subtitle: 'Scheduled, in-progress and completed inspections',
    kpis: [
      { l: 'Scheduled Today', v: '24', i: 'calendar-check', c: 'primary', t: '+3 vs avg', d: 'up' },
      { l: 'Completed', v: '17', i: 'check-circle', c: 'success', t: '71% done' },
      { l: 'Passed', v: '16', i: 'badge-check', c: 'success', t: '94% pass rate' },
      { l: 'Failed', v: '1', i: 'x-circle', c: 'error', t: 'NCR raised', d: 'down' }
    ],
    table: {
      title: 'Inspection Register',
      columns: ['Inspection ID','Lot #','Product','Type','Inspector','Result','Date'],
      rows: [
        ['<span class="row-id">QC-2201</span>','LOT-0847','White Shrimp','Incoming','R. Kumar', badge('warning','In Progress'),'Sep 17'],
        ['<span class="row-id">QC-2200</span>','LOT-0848','White Shrimp','In-process','P. Sharma', badge('success','Passed'),'Sep 16'],
        ['<span class="row-id">QC-2199</span>','LOT-0845','Tiger Shrimp','Incoming','R. Kumar', badge('success','Passed'),'Sep 16'],
        ['<span class="row-id">QC-2198</span>','LOT-0844','Tuna Loins','Final','M. Khan', badge('success','Passed'),'Sep 15'],
        ['<span class="row-id">QC-2197</span>','LOT-0842','Squid','Incoming','P. Sharma', badge('error','Failed'),'Sep 15']
      ]
    }
  },
  'lab-tests': {
    title: 'Laboratory Tests',
    subtitle: 'Microbial, chemical and physical test results',
    kpis: [
      { l: 'Samples In Lab', v: '14', i: 'flask-conical', c: 'primary', t: '5 awaiting results' },
      { l: 'Avg Turnaround', v: '26h', i: 'timer', c: 'info', t: 'Target 24h' },
      { l: 'Flags Raised', v: '1', i: 'flag', c: 'error', t: 'Histamine borderline', d: 'down' },
      { l: 'Compliance', v: '99.2%', i: 'shield-check', c: 'success', t: 'EU standards' }
    ],
    table: {
      title: 'Test Results',
      columns: ['Test ID','Sample','Parameter','Method','Result','Limit','Status'],
      rows: [
        ['<span class="row-id">LAB-5501</span>','LOT-0847','Salmonella','ISO 6579','Not detected','Absent', badge('success','Pass')],
        ['<span class="row-id">LAB-5502</span>','LOT-0847','E. coli','ISO 16649','<10 CFU/g','<100', badge('success','Pass')],
        ['<span class="row-id">LAB-5503</span>','LOT-0844','Histamine','HPLC','38 ppm','<50 ppm', badge('warning','Watch')],
        ['<span class="row-id">LAB-5504</span>','LOT-0842','TVC','ISO 4833','6.2×10⁵','<5×10⁵', badge('error','Fail')],
        ['<span class="row-id">LAB-5505</span>','LOT-0848','Sulphites','Titration','62 mg/kg','<150', badge('success','Pass')]
      ]
    }
  },
  certificates: {
    title: 'Certificates & Compliance',
    subtitle: 'Statutory and customer-mandated certifications',
    kpis: [
      { l: 'Valid Certificates', v: '18', i: 'award', c: 'success', t: 'All majors covered' },
      { l: 'Expiring ≤60d', v: '3', i: 'alarm-clock', c: 'warning', t: 'Renewal initiated' },
      { l: 'Expired', v: '1', i: 'x-octagon', c: 'error', t: 'Block shipments?', d: 'down' },
      { l: 'Audits Scheduled', v: '2', i: 'clipboard-list', c: 'info', t: 'Oct 2026' }
    ],
    table: {
      title: 'Certificate Register',
      columns: ['Certificate','Type','Authority','Issued','Expiry','Status'],
      rows: [
        ['HACCP Plan v6','Food Safety','Export Inspection Council','Jan 2026','Dec 2027', badge('success','Valid')],
        ['EU Health Cert','Export','EIC / EU TRACES','Mar 2026','Mar 2027', badge('success','Valid')],
        ['ISO 22000:2018','Management','TÜV SÜD','Nov 2024','Nov 2026', badge('warning','Expiring')],
        ['BRCGS Food v9','Customer','SGS','Oct 2025','Oct 2026', badge('warning','Expiring')],
        ['US FDA Registration','Statutory','US FDA','Dec 2023','Dec 2025', badge('error','Expired')]
      ]
    }
  },
  shifts: {
    title: 'Shift Management',
    subtitle: 'Rosters, attendance and supervision per line',
    kpis: [
      { l: 'Shifts Today', v: '3', i: 'clock', c: 'primary', t: 'A / B / C' },
      { l: 'Workers On Roll', v: '148', i: 'users', c: 'info', t: 'Across 6 lines' },
      { l: 'Attendance', v: '92%', i: 'user-check', c: 'success', t: '+3% vs last week', d: 'up' },
      { l: 'Overtime Hours', v: '36', i: 'hourglass', c: 'warning', t: 'Within policy' }
    ],
    table: {
      title: 'Today’s Roster',
      columns: ['Shift','Time','Lines','Supervisor','Workers','Status'],
      rows: [
        ['Shift A','06:00 – 14:00','1, 2, 5','S. Menon','52', badge('success','On Duty')],
        ['Shift B','14:00 – 22:00','1, 3, 5, 6','A. Fernandes','58', badge('info','Upcoming')],
        ['Shift C','22:00 – 06:00','4','K. Iyer','38', badge('gray','Scheduled')]
      ]
    }
  },
  output: {
    title: 'Production Output',
    subtitle: 'Daily finished-goods output vs target',
    kpis: [
      { l: 'Output Today', v: '42 T', i: 'factory', c: 'primary', t: 'Target 50 T' },
      { l: 'Efficiency', v: '84%', i: 'gauge', c: 'success', t: '+2% vs yesterday', d: 'up' },
      { l: 'Rejection', v: '1.8%', i: 'trash-2', c: 'error', t: 'Within 2% limit' },
      { l: 'Downtime', v: '46 min', i: 'pause-circle', c: 'warning', t: 'Line 6 maintenance' }
    ],
    chart: {
      title: 'Output by Line (Tons, today)',
      type: 'bar',
      labels: ['Line 1','Line 2','Line 3','Line 4','Line 5','Line 6'],
      datasets: [
        { label: 'Output', data: [9.5, 8.2, 7.4, 0, 10.6, 6.3], color: '#E6A817' },
        { label: 'Target', data: [10, 9, 8, 8, 10, 8], color: '#111827' }
      ]
    },
    table: {
      title: 'Line Output Detail',
      columns: ['Line','Product','Output (T)','Target (T)','Efficiency','Reject %','Status'],
      rows: [
        ['Line 1','Shrimp 26/30','9.5','10','95%','1.2%', badge('success','Running')],
        ['Line 2','Shrimp 31/40','8.2','9','91%','1.6%', badge('success','Running')],
        ['Line 3','Tiger 16/20','7.4','8','93%','2.0%', badge('success','Running')],
        ['Line 4','—','0','8','—','—', badge('gray','Idle')],
        ['Line 5','Tuna Loins','10.6','10','106%','0.9%', badge('success','Running')],
        ['Line 6','Squid Rings','6.3','8','79%','2.4%', badge('warning','Maintenance')]
      ]
    }
  },
  rooms: {
    title: 'Cold Rooms',
    subtitle: 'Room-wise occupancy, product mapping and door status',
    kpis: [
      { l: 'Rooms', v: '12', i: 'box', c: 'primary', t: 'All powered' },
      { l: 'Occupancy', v: '78%', i: 'bar-chart-2', c: 'info', t: '2,400 of 3,080 T' },
      { l: 'Avg Temp', v: '-22.4°C', i: 'thermometer', c: 'cyan', t: 'Set point -22°C' },
      { l: 'Door Events 24h', v: '143', i: 'door-open', c: 'warning', t: '2 held open >5m' }
    ],
    table: {
      title: 'Room Status',
      columns: ['Room','Product','Capacity','Temp','Humidity','Door','Status'],
      rows: [
        ['CR-01 Alpha','Shrimp','82%','-22.4°C','85%','Closed', badge('success','OK')],
        ['CR-02 Beta','Salmon','75%','-21.8°C','83%','Closed', badge('success','OK')],
        ['CR-03 Gamma','Tuna','91%','-18.2°C','88%','Closed', badge('warning','Warm')],
        ['CR-04 Delta','Squid','68%','-15.6°C','90%','Open', badge('error','Critical')],
        ['CR-05 Epsilon','Lobster','54%','-23.1°C','82%','Closed', badge('success','OK')],
        ['CR-06 Zeta','Crab','79%','-22.7°C','86%','Closed', badge('success','OK')]
      ]
    }
  },
  temperature: {
    title: 'Temperature Log',
    subtitle: 'Sensor-level readings with deviation alerts',
    kpis: [
      { l: 'Sensors Online', v: '48', i: 'radio-tower', c: 'success', t: '2 offline' },
      { l: 'Avg Deviation', v: '±0.4°C', i: 'activity', c: 'info', t: 'Within ±1°C' },
      { l: 'Alerts (24h)', v: '3', i: 'bell-ring', c: 'warning', t: '1 critical' },
      { l: 'Logging Interval', v: '5 min', i: 'timer', c: 'primary', t: '4,320 reads/day' }
    ],
    table: {
      title: 'Recent Readings',
      columns: ['Time','Room','Sensor','Temp','Set Point','Deviation','Status'],
      rows: [
        ['14:35','CR-04 Delta','S-402','-15.6°C','-22°C','+6.4', badge('error','Critical')],
        ['14:35','CR-03 Gamma','S-301','-18.2°C','-20°C','+1.8', badge('warning','Warn')],
        ['14:35','CR-01 Alpha','S-101','-22.4°C','-22°C','-0.4', badge('success','OK')],
        ['14:30','CR-02 Beta','S-201','-21.8°C','-22°C','+0.2', badge('success','OK')],
        ['14:30','CR-05 Epsilon','S-501','-23.1°C','-22°C','-1.1', badge('success','OK')],
        ['14:30','CR-06 Zeta','S-601','-22.7°C','-22°C','-0.7', badge('success','OK')]
      ]
    }
  },
  'stock-aging': {
    title: 'Stock Aging',
    subtitle: 'FIFO risk view — stock buckets by age',
    kpis: [
      { l: 'Total Stock', v: '2,400 T', i: 'boxes', c: 'primary', t: 'All rooms' },
      { l: '0–30 Days', v: '62%', i: 'calendar', c: 'success', t: 'Fresh stock' },
      { l: '31–60 Days', v: '24%', i: 'calendar-clock', c: 'warning', t: 'Plan dispatch' },
      { l: '>60 Days', v: '14%', i: 'alert-triangle', c: 'error', t: 'FIFO action needed', d: 'down' }
    ],
    chart: {
      title: 'Aging Buckets by Product (Tons)',
      type: 'bar',
      labels: ['Shrimp','Salmon','Tuna','Squid','Crab'],
      datasets: [
        { label: '0-30d', data: [620, 180, 240, 150, 90], color: '#059669' },
        { label: '31-60d', data: [310, 90, 110, 60, 40], color: '#FAAD14' },
        { label: '60d+', data: [180, 40, 70, 30, 20], color: '#DC2626' }
      ]
    },
    table: {
      title: 'Aging Detail',
      columns: ['Product','0–30 (T)','31–60 (T)','61–90 (T)','90+ (T)','Oldest Lot','Action'],
      rows: [
        ['Shrimp','620','310','140','40','LOT-0612', badge('warning','Dispatch first')],
        ['Salmon','180','90','30','10','LOT-0701', badge('success','OK')],
        ['Tuna','240','110','50','20','LOT-0588', badge('warning','Review')],
        ['Squid','150','60','20','10','LOT-0655', badge('success','OK')],
        ['Crab','90','40','15','5','LOT-0720', badge('success','OK')]
      ]
    }
  },
  movements: {
    title: 'Stock Movements',
    subtitle: 'Every stock-in, stock-out and adjustment event',
    kpis: [
      { l: 'Movements Today', v: '58', i: 'arrow-left-right', c: 'primary', t: '+12 vs avg', d: 'up' },
      { l: 'Stock In', v: '32', i: 'download', c: 'success', t: '18.4 T received' },
      { l: 'Stock Out', v: '21', i: 'upload', c: 'info', t: '12.1 T dispatched' },
      { l: 'Adjustments', v: '5', i: 'sliders-horizontal', c: 'warning', t: '2 need approval' }
    ],
    table: {
      title: 'Movement Register',
      columns: ['Movement ID','Type','SKU','Qty (Kg)','From','To','By','Time'],
      rows: [
        ['<span class="row-id">MOV-8801</span>', badge('success','IN'),'SHR-26-30','8,400','Harbour','CR-01','R. Kumar','14:12'],
        ['<span class="row-id">MOV-8802</span>', badge('info','OUT'),'SAL-FIL-01','2,200','CR-02','Dispatch Bay','P. Sharma','13:40'],
        ['<span class="row-id">MOV-8803</span>', badge('purple','TRANSFER'),'TUN-CAN-01','1,500','CR-03','CR-06','M. Khan','12:55'],
        ['<span class="row-id">MOV-8804</span>', badge('warning','ADJUST'),'SQD-FRZ-01','-40','CR-04','—','S. Menon','11:20'],
        ['<span class="row-id">MOV-8805</span>', badge('success','IN'),'CRB-MT-01','3,100','Harbour','CR-06','R. Kumar','09:48']
      ]
    }
  },
  transfers: {
    title: 'Stock Transfers',
    subtitle: 'Inter-room and inter-plant transfer requests',
    kpis: [
      { l: 'Pending Approval', v: '5', i: 'hourglass', c: 'warning', t: '2 high priority' },
      { l: 'In Transit', v: '3', i: 'truck', c: 'info', t: 'Within plant' },
      { l: 'Completed Today', v: '4', i: 'check-circle', c: 'success', t: '6.2 T moved' },
      { l: 'Rejected', v: '1', i: 'x-circle', c: 'error', t: 'Temp risk', d: 'down' }
    ],
    table: {
      title: 'Transfer Requests',
      columns: ['Transfer #','From','To','SKU','Qty (Kg)','Requested By','Status'],
      rows: [
        ['<span class="row-id">TRF-3301</span>','CR-01','CR-04','SHR-26-30','2,000','P. Sharma', badge('warning','Pending')],
        ['<span class="row-id">TRF-3302</span>','CR-03','CR-06','TUN-CAN-01','1,500','M. Khan', badge('info','In Transit')],
        ['<span class="row-id">TRF-3303</span>','CR-02','Dispatch','SAL-FIL-01','2,200','P. Sharma', badge('success','Completed')],
        ['<span class="row-id">TRF-3304</span>','CR-04','CR-01','SQD-FRZ-01','1,800','S. Menon', badge('error','Rejected')],
        ['<span class="row-id">TRF-3305</span>','CR-05','CR-02','LOB-TAL-01','600','R. Kumar', badge('warning','Pending')]
      ]
    }
  }
};

const CMD_ITEMS = [
  { g: 'Navigate', i: 'layout-dashboard', t: 'Sales Dashboard', d: 'KPIs and charts', a: () => navigate('sales','dashboard') },
  { g: 'Navigate', i: 'shopping-bag', t: 'Orders', d: 'Kanban, table, calendar', a: () => navigate('sales','orders') },
  { g: 'Navigate', i: 'package', t: 'Products', d: 'Product catalog', a: () => navigate('sales','products') },
  { g: 'Navigate', i: 'users', t: 'Buyers', d: 'Customer master', a: () => navigate('sales','buyers') },
  { g: 'Navigate', i: 'store', t: 'Purchase Orders', d: 'Procurement register', a: () => navigate('purchase','purchase-orders') },
  { g: 'Navigate', i: 'shield-check', t: 'QC Inspections', d: 'Inspection register', a: () => navigate('qc','inspections') },
  { g: 'Navigate', i: 'snowflake', t: 'Cold Rooms', d: 'Room status', a: () => navigate('coldstore','rooms') },
  { g: 'Navigate', i: 'thermometer', t: 'Temperature Log', d: 'Sensor readings', a: () => navigate('coldstore','temperature') },
  { g: 'Navigate', i: 'boxes', t: 'Stock Movements', d: 'In / out / transfers', a: () => navigate('inventory','movements') },
  { g: 'Navigate', i: 'settings', t: 'Settings', d: 'Preferences', a: () => navigate('settings','profile') },
  { g: 'Actions', i: 'plus', t: 'Create New Order', d: 'Open order form', a: () => openModal('newOrderModal') },
  { g: 'Actions', i: 'plus', t: 'Add Product', d: 'New SKU', a: () => openModal('newProductModal') },
  { g: 'Actions', i: 'bell', t: 'View Notifications', d: 'Open notification center', a: () => openNotifications() },
  { g: 'Actions', i: 'download', t: 'Export Dashboard', d: 'Download PDF', a: () => exportDashboard() },
  { g: 'Actions', i: 'refresh-cw', t: 'Refresh Data', d: 'Reload all widgets', a: () => refreshData() }
];

/* ================================================================
   PRODUCT SUB-PAGES MASTER DATASETS
   ================================================================ */
const PRODUCT_LIST_MASTER = [
  { sno: 1, shortName: 'PVPDTO-RINGS', fullName: 'PVPDTO-RINGS' },
  { sno: 2, shortName: 'PDTO-RINGS', fullName: 'PDTO-RINGS' },
  { sno: 3, shortName: 'PDTO-ANTIBIOTICS', fullName: 'PDTO-ANTIBIOTICS' },
  { sno: 4, shortName: 'HLSO-ANTIBIOTICS', fullName: 'HLSO-ANTIBIOTICS' },
  { sno: 5, shortName: 'PD-ANTIBIOTICS', fullName: 'PD-ANTIBIOTICS' },
  { sno: 6, shortName: 'PD-RED', fullName: 'PD-RED' },
  { sno: 7, shortName: 'DC', fullName: 'DC' },
  { sno: 8, shortName: 'PV HL', fullName: 'PV HL' },
  { sno: 9, shortName: 'PD-BROKEN', fullName: 'PD-BROKEN' },
  { sno: 10, shortName: 'BROKEN', fullName: 'BROKEN' },
  { sno: 11, shortName: 'HOSO-VANNAMEI', fullName: 'HEAD ON SHELL ON VANNAMEI' },
  { sno: 12, shortName: 'HLSO-BLACK-TIGER', fullName: 'HEADLESS SHELL ON BLACK TIGER' },
  { sno: 13, shortName: 'PND-TAIL-ON', fullName: 'PEELED & DEVEINED TAIL ON' },
  { sno: 14, shortName: 'PND-TAIL-OFF', fullName: 'PEELED & DEVEINED TAIL OFF' },
  { sno: 15, shortName: 'COOKED-PUD', fullName: 'COOKED PEELED UNDEVEINED' },
  { sno: 16, shortName: 'RAW-PUD', fullName: 'RAW PEELED UNDEVEINED' },
  { sno: 17, shortName: 'EZ-PEEL-VANNAMEI', fullName: 'EASY PEEL VANNAMEI SHRIMP' },
  { sno: 18, shortName: 'BUTTERFLY-SHRIMP', fullName: 'FROZEN RAW BUTTERFLY SHRIMP' },
  { sno: 19, shortName: 'SHRIMP-SKEWERS', fullName: 'FROZEN RAW IQF SHRIMP SKEWERS' },
  { sno: 20, shortName: 'BLOCK-FROZEN-HL', fullName: 'BLOCK FROZEN HEADLESS SHRIMP' },
  { sno: 21, shortName: 'BRINE-SHRIMP', fullName: 'BRINE FROZEN WHOLE SHRIMP' },
  { sno: 22, shortName: 'BLANCHED-PND', fullName: 'BLANCHED PEELED & DEVEINED' },
  { sno: 23, shortName: 'RED-SHRIMP-PND', fullName: 'WILD RED SHRIMP PND' },
  { sno: 24, shortName: 'SEA-TIGER-HOSO', fullName: 'SEA TIGER HEAD ON SHELL ON' }
];

const PREPARATION_LIST_MASTER = [
  { id: 1, name: 'FROZEN COOKED SHELL ON VA', desc: 'FROZEN COOKED SHELL ON VANNAMEI', shortCode: 'CI V EZPL', hsCode: '0306.17', qcCode: 'C' },
  { id: 2, name: 'FROZEN RAW IQF BUTTER FLY', desc: 'FROZEN RAW IQF BUTTER FLY CUT', shortCode: 'RI-BFY', hsCode: '0', qcCode: 'BFY' },
  { id: 3, name: 'FROZEN RAW IQF SKEWERS', desc: 'FROZEN RAW IQF SKEWERS', shortCode: 'RI-SKW', hsCode: '030617', qcCode: '' },
  { id: 4, name: 'FROZEN RAW BLOCK', desc: 'FROZEN RAW', shortCode: 'RB', hsCode: '0306.17.20', qcCode: '' },
  { id: 5, name: 'FROZEN COOKED IN SHELL', desc: 'FROZEN COOKED IN SHELL', shortCode: 'CIS', hsCode: '1605.21', qcCode: 'CIS' },
  { id: 6, name: 'BLANCHED', desc: 'BLANCHED', shortCode: 'BI', hsCode: '0306.17.20', qcCode: '' },
  { id: 7, name: 'BRINE FROZEN', desc: 'BRINE FROZEN', shortCode: 'BF', hsCode: '0306.17.20', qcCode: '' },
  { id: 8, name: 'FROZEN COOKED', desc: 'FROZEN COOKED', shortCode: 'CI', hsCode: '1605.21', qcCode: 'C' },
  { id: 9, name: 'FROZEN RAW IQF', desc: 'FROZEN RAW', shortCode: 'RI', hsCode: '0306.17.20', qcCode: '' }
];

const SPECIES_MASTER = [
  { sno: 1, name: 'PENAEUS MONODON', shortCode: 'BT', qcCode: 'BT', desc: 'BLACK TIGER' },
  { sno: 2, name: 'LITOPENAEUS VANNAMEI', shortCode: 'VM', qcCode: 'V', desc: 'VANNAMEI WHITE' },
  { sno: 3, name: 'Sea Tiger', shortCode: 'ST', qcCode: 'ST', desc: 'Sea Tiger' }
];

const GRADES_MASTER = [
  { id: 1, type: 'U/5', name: 'U/5', group: '6/8' },
  { id: 2, type: '6/8', name: '6/8', group: '6/8' },
  { id: 3, type: '8/12', name: '8/12', group: '8/12' },
  { id: 4, type: '13/15', name: '13/15', group: '11/20' },
  { id: 5, type: '16/20', name: '16/20', group: '16/20' },
  { id: 6, type: '21/25', name: '21/25', group: '21/25' },
  { id: 7, type: '26/30', name: '26/30', group: '26/30' },
  { id: 8, type: '31/35', name: '31/35', group: '31/35' },
  { id: 9, type: '36/40', name: '36/40', group: '31/40' },
  { id: 10, type: '31/40', name: '31/40', group: '31/40' },
  { id: 11, type: '41/50', name: '41/50', group: '41/50' },
  { id: 12, type: '51/60', name: '51/60', group: '51/60' },
  { id: 13, type: '61/70', name: '61/70', group: '61/70' },
  { id: 14, type: '71/90', name: '71/90', group: '71/90' },
  { id: 15, type: '91/110', name: '91/110', group: '91/110' },
  { id: 16, type: '100/150', name: '100/150', group: '100/150' },
  { id: 17, type: '150/200', name: '150/200', group: '150/200' },
  { id: 18, type: '200/300', name: '200/300', group: '200/300' },
  { id: 19, type: '300/500', name: '300/500', group: '300/500' }
];

const PACKING_STYLES_MASTER = [
  { id: 115, style: '1 X 10 KGS', grossWeight: '11', netWeight: '10', uom: 'KGS' },
  { id: 114, style: '10 X 2 LBS', grossWeight: '25', netWeight: '20', uom: 'LBS' },
  { id: 113, style: '10 X 1 KGS', grossWeight: '12', netWeight: '10', uom: 'KGS' },
  { id: 112, style: '1 X 12 KGS', grossWeight: '12', netWeight: '12', uom: 'KGS' },
  { id: 111, style: '6 X 1.8 KGS', grossWeight: '15', netWeight: '10.8', uom: 'KGS' },
  { id: 110, style: '20 X 1 LBS', grossWeight: '25.80', netWeight: '20', uom: 'LBS' },
  { id: 109, style: '4 X 2.5 LBS', grossWeight: '10', netWeight: '10', uom: 'LBS' },
  { id: 108, style: '10 X 1 LBS', grossWeight: '12.9', netWeight: '10', uom: 'LBS' },
  { id: 107, style: '5 X 2 LBS', grossWeight: '12.9', netWeight: '10', uom: 'LBS' },
  { id: 106, style: '10 X 0.2 KGS', grossWeight: '12', netWeight: '2', uom: 'KGS' },
  { id: 105, style: '2 X 5 KGS', grossWeight: '11.2', netWeight: '10', uom: 'KGS' },
  { id: 104, style: '12 X 1 LB', grossWeight: '14.5', netWeight: '12', uom: 'LBS' }
];

const VARIETY_LIST_MASTER = [
  { sno: 1, shortName: 'PD', fullName: 'PEELED AND DEVEINED TAIL OFF', grade: '150/200', freezingType: 'IQF', treatment: 'UNTREATED', prep: 'RI', brand: 'DUMMY', packingStyle: '1 X 10 KGS', desc: 'VM-PD-RI-NWNC-UNT', type: 'RAW', buyerSupc: '', ourSupc: '2836' },
  { sno: 2, shortName: 'PD', fullName: 'PEELED AND DEVEINED TAIL OFF', grade: '100/150', freezingType: 'IQF', treatment: 'UNTREATED', prep: 'RI', brand: 'DUMMY', packingStyle: '1 X 10 KGS', desc: 'VM-PD-RI-NWNC-UNT', type: 'RAW', buyerSupc: '', ourSupc: '2837' },
  { sno: 3, shortName: 'PD', fullName: 'PEELED AND DEVEINED TAIL OFF', grade: '91/110', freezingType: 'IQF', treatment: 'UNTREATED', prep: 'RI', brand: 'DUMMY', packingStyle: '1 X 10 KGS', desc: 'VM-PD-RI-NWNC-UNT', type: 'RAW', buyerSupc: '', ourSupc: '2838' },
  { sno: 4, shortName: 'PD', fullName: 'PEELED AND DEVEINED TAIL OFF', grade: '71/90', freezingType: 'IQF', treatment: 'UNTREATED', prep: 'RI', brand: 'DUMMY', packingStyle: '1 X 10 KGS', desc: 'VM-PD-RI-NWNC-UNT', type: 'RAW', buyerSupc: '', ourSupc: '2839' },
  { sno: 5, shortName: 'PD', fullName: 'PEELED AND DEVEINED TAIL OFF', grade: '41/50', freezingType: 'IQF', treatment: 'UNTREATED', prep: 'RI', brand: 'DUMMY', packingStyle: '1 X 10 KGS', desc: 'VM-PD-RI-NWNC-UNT', type: 'RAW', buyerSupc: '', ourSupc: '2840' },
  { sno: 6, shortName: 'PD', fullName: 'PEELED AND DEVEINED TAIL OFF', grade: '31/40', freezingType: 'IQF', treatment: 'UNTREATED', prep: 'RI', brand: 'DUMMY', packingStyle: '1 X 10 KGS', desc: 'VM-PD-RI-NWNC-UNT', type: 'RAW', buyerSupc: '', ourSupc: '2841' },
  { sno: 7, shortName: 'PD', fullName: 'PEELED AND DEVEINED TAIL OFF', grade: '21/25', freezingType: 'IQF', treatment: 'Sodium Tripolyphosphate', prep: 'CI', brand: 'DUMMY', packingStyle: '1 X 10 KGS', desc: 'VM-PD-CI-NWNC-STPP', type: 'COOKED', buyerSupc: '', ourSupc: '3498' },
  { sno: 8, shortName: 'EZPL', fullName: 'EZ PEEL', grade: '41/50', freezingType: 'IQF', treatment: 'UNTREATED', prep: 'RI', brand: 'DUMMY', packingStyle: '1 X 10 KGS', desc: 'VM-EZPL-RI-NWNC-UNT', type: 'RAW', buyerSupc: '', ourSupc: '2835' },
  { sno: 9, shortName: 'HOSO', fullName: 'HEAD ON SHELL ON VANNAMEI', grade: '26/30', freezingType: 'BLOCK', treatment: 'UNTREATED', prep: 'RI', brand: 'DEVI FRESH', packingStyle: '6 X 1.8 KGS', desc: 'VM-HOSO-BLK-UNT', type: 'RAW', buyerSupc: 'US-8821', ourSupc: '1042' },
  { sno: 10, shortName: 'BT-HLSO', fullName: 'BLACK TIGER HEADLESS', grade: '16/20', freezingType: 'IQF', treatment: 'UNTREATED', prep: 'RI', brand: 'OCEAN FRESH', packingStyle: '10 X 2 LBS', desc: 'BT-HLSO-IQF-UNT', type: 'RAW', buyerSupc: 'EU-9012', ourSupc: '1098' }
];

const QC_LOTS_MASTER = Array.from({ length: 300 }, (_, i) => {
  const lotNums = ['KKD/2627/0204', 'RPL/2627/0129', 'KKD/2627/0078', 'KKD/2627/0133', 'RPL/2627/0300', 'KKL/2627/0037', 'ODS/2627/0382', 'KKL/2627/0068', 'RPL/2627/0355', 'AMP/2627/0831'];
  const suppliers = ['K.RAGHU', 'PENMETSA VENKATAPATHI RAJU HUF', 'KORA NAVYA SRI', 'B.V.V.S.RAMA PRASAD', 'A.KOWSIK KUMAR', 'MANTHENA JAYANTH VARMA', 'MAASAREI TRADERS', 'MANTHENA JAYANTH VARMA', 'ARIUN AQUA', 'ISHITHA AQUA NEEDS'];
  const centers = ['KAKINADA LOCAL', 'REPALLE', 'KAKINADA LOCAL', 'KAKINADA LOCAL', 'REPALLE', 'KAIKALURU', 'ORISSA', 'KAIKALURU', 'REPALLE', 'AMALAPURAM'];
  const dates = ['24-Apr-2026', '15-May-2026', '10-Apr-2026', '15-Apr-2026', '09-Jul-2026', '02-May-2026', '14-Aug-2026', '26-May-2026', '25-Jul-2026', '12-May-2026'];
  const weights = ['7,168', '6,947', '6,937', '6,931.7', '6,864', '6,861', '6,845', '6,818', '6,802', '6,748.5'];
  const results = ['--', '--', '--', '--', '--', 'PASS', 'Negative', '--', '--', 'Negative'];
  const positives = ['UNKNOWN', 'UNKNOWN', 'UNKNOWN', 'UNKNOWN', 'UNKNOWN', 'NO', 'NO', 'UNKNOWN', 'UNKNOWN', 'NO'];

  const idx = i % 10;
  return {
    lotNo: lotNums[idx] + (i > 9 ? `-${i}` : ''),
    supplier: suppliers[idx],
    center: centers[idx],
    arrivalDate: dates[idx],
    totalWeight: weights[idx],
    result: results[idx],
    positive: positives[idx]
  };
});

const QC_POGRADE_MASTER = Array.from({ length: 25 }, (_, i) => {
  const pos = [
    { po: '1102650883', buyer: 'C.P. FOOD', brand: 'GREAT VALUE', shipBy: '11-Sep-2026', country: 'U.S.A.', product: '51/60-VM-PVDTO-RINGS-CIS-NWNC-STPP', packing: '8 X 16 OZ', mcs: '2240', assigned: '--' },
    { po: 'DF 1587', buyer: 'MARK FOODS LLC', brand: 'ADMIRAL OF THE FLEET', shipBy: '15-Oct-2026', country: 'U.S.A.', product: '21/25-VM-PDTO-CI-NWNC-STPP', packing: '5 X 2 LBS', mcs: '600', assigned: '--' },
    { po: 'DF 1587', buyer: 'MARK FOODS LLC', brand: 'ADMIRAL OF THE FLEET', shipBy: '15-Oct-2026', country: 'U.S.A.', product: '26/30-VM-PDTO-CI-NWNC-STPP', packing: '5 X 2 LBS', mcs: '700', assigned: '--' },
    { po: 'DF 1587', buyer: 'MARK FOODS LLC', brand: 'ADMIRAL OF THE FLEET', shipBy: '15-Oct-2026', country: 'U.S.A.', product: '71/90-VM-PD-CI-NWNC-STPP', packing: '5 X 2 LBS', mcs: '1500', assigned: '--' },
    { po: 'DF 1587', buyer: 'MARK FOODS LLC', brand: 'ADMIRAL OF THE FLEET', shipBy: '15-Oct-2026', country: 'U.S.A.', product: '31/40-VM-PDTO-CI-NWNC-STPP', packing: '5 X 2 LBS', mcs: '400', assigned: '--' },
    { po: 'DF/DF-5627', buyer: 'DEVI INC', brand: 'PORTICO CLASSIC', shipBy: '--', country: 'U.S.A.', product: '16/20-VM-EZPL-RI-NWNC-STPP', packing: '4 X 2.5 LBS', mcs: '3500', assigned: '166' },
    { po: '1102650548', buyer: 'C.P. FOOD', brand: 'GREAT VALUE', shipBy: '26-Sep-2026', country: 'U.S.A.', product: '31/40-VM-PD-RI-NWNC-STPP', packing: '5 X 32 OZ', mcs: '3528', assigned: '--' },
    { po: 'PO1571337', buyer: 'EXPORT PACKERS', brand: 'GREAT VALUE', shipBy: '01-Nov-2026', country: 'CANADA', product: '31/40-VM-EZPL-RI-NWNC-STPP', packing: '12 X 480 GRAMS', mcs: '2500', assigned: '--' },
    { po: 'PO1004195', buyer: 'STANLEY', brand: 'MEMBERS MARK', shipBy: '28-Aug-2026', country: 'U.S.A.', product: '50/70-VM-PD-CIS-NWNC-SALT', packing: '16 X 2 LBS', mcs: '1100', assigned: '--' },
    { po: 'DF 1586', buyer: 'MARK FOODS LLC', brand: 'OCEAN ROYAL', shipBy: '15-Oct-2026', country: 'U.S.A.', product: '31/40-VM-PDTO-CI-NWNC-STPP', packing: '10 X 2 LBS', mcs: '250', assigned: '--' }
  ];
  const item = pos[i % pos.length];
  return { sno: i + 1, ...item };
});

const PRODUCTION_STANDARD_YIELDS_MASTER = [
  { sno: 1, species: 'LITOPENAEUS VANNAMEI', typeProduct: 'RAW', variety: 'EZPL', grade: '16/20', count: '20', freezingType: 'IQF', treatment: 'Sodium Tripolyphosphate', typeMaterial: 'HEAD ON', yield: '50', status: 'Active' },
  { sno: 2, species: 'LITOPENAEUS VANNAMEI', typeProduct: 'COOKED', variety: 'PD', grade: '--', count: '--', freezingType: 'IQF', treatment: 'Blended Phosphate', typeMaterial: 'HL', yield: '64', status: 'Active' },
  { sno: 3, species: 'LITOPENAEUS VANNAMEI', typeProduct: 'COOKED', variety: 'EZPL', grade: '--', count: '--', freezingType: 'IQF', treatment: 'Blended Phosphate', typeMaterial: 'HL', yield: '60', status: 'Active' }
];

const INVENTORY_INDENTS_MASTER = [
  { sno: 1, docNo: 'Test', date: '10-06-2026', status: 'Approved' }
];

