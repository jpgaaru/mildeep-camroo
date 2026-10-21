// AquaPulse Framework — Declarative Route Resolver & Section Metadata Registry

import { NAV_HIERARCHY } from '../components/sidebar.js';

export const SECTION_METADATA_REGISTRY = {
  home: {
    welcome: {
      title: 'Welcome to Camaroo ERP',
      subtitle: ''
    }
  },
  purchase: {
    dashboard: {
      title: 'Purchase Dashboard',
      subtitle: 'Live procurement arrivals, telemetry metrics, and plant processing distribution.'
    },
    'purchase-ops': {
      title: 'Purchase',
      subtitle: 'Procurement dashboard and raw material intake analytics.'
    },
    'pre-processing': {
      title: 'Pre Processing',
      subtitle: 'Manage bookings, arrivals, bills, and vendor payment vouchers.'
    },
    operations: {
      title: 'Operations',
      subtitle: 'Manage bookings, dock arrivals, crate weighments, and lot tracking.'
    },
    'transactions-bills': {
      title: 'Transactions & Bills',
      subtitle: 'Commercial accounts payable, broker settlements, and supplier bills'
    },
    payments: {
      title: 'Payments',
      subtitle: 'Manage vendor payments, settled vouchers, and banking logs.'
    }
  },
  preprocessing: {
    dashboard: {
      title: 'Pre-Processing Floor',
      subtitle: 'De-heading, grading, peeling lines, and yield recovery telemetry'
    },
    'pre-processing': {
      title: 'Pre Processing',
      subtitle: 'Intake sizing, roller grader lines, deheading yields, and inter-plant transfers'
    },
    'floor-operations': {
      title: 'Pre Processing',
      subtitle: 'Intake sizing, roller grader lines, deheading yields, and inter-plant transfers'
    },
    'production-reports': {
      title: 'Production Reports',
      subtitle: 'Pond-to-pack genealogical audit, floor balance matrix, and packaging yield'
    },
    traceability: {
      title: 'Production Reports',
      subtitle: 'Pond-to-pack genealogical audit, floor balance matrix, and packaging yield'
    },
    'chemical-screens': {
      title: 'Chemical Screens',
      subtitle: 'Customs inward, STPP/non-phosphate bath dosage logs, and supplier settlements'
    },
    'chemical-inventory': {
      title: 'Chemical Screens',
      subtitle: 'Customs inward, STPP/non-phosphate bath dosage logs, and supplier settlements'
    }
  },
  quality: {
    dashboard: {
      title: 'Quality Assurance & Lab',
      subtitle: 'Antibiotic screenings, microbiological testing, and HACCP compliance'
    },
    lab: {
      title: 'Quality Control Laboratory',
      subtitle: 'ELISA antibiotic screening, microbiological testing, and external lab certificates'
    },
    'qc-operations': {
      title: 'Quality Control Operations',
      subtitle: 'Line inspection orders, core temperature checks, and compliance documentation'
    },
    'chemical-screening': {
      title: 'Chemical Screening Registry',
      subtitle: 'Residue screening logs, sulfite checks, and pre-shipment chemical clearance'
    },
    'qc-audits': {
      title: 'Quality & Compliance Audits',
      subtitle: 'BRCGS food safety, social compliance, farm, hatchery, and feed mill audit logs'
    }
  },
  production: {
    dashboard: {
      title: 'Production & Freezing',
      subtitle: 'IQF, blast freezing, glazing lines, and master carton packaging'
    },
    'setup-master': {
      title: 'Production Setup & Standard Yields',
      subtitle: 'Species-wise standard yield benchmarks, glaze specs, and line configurations'
    },
    'batch-tracking': {
      title: 'Production Batch Tracking',
      subtitle: 'Real-time soaking tank progression and IQF / block freezing tunnel tracking'
    },
    'production-operations': {
      title: 'Production Floor Operations',
      subtitle: 'Active soaking schedules, freezing line runs, and carton packing transfer'
    },
    'production-control': {
      title: 'Production Control & Reconciliation',
      subtitle: 'Floor balance by variety, soaking/freezing control, and head-on to finished conversion'
    },
    'anti-dumping': {
      title: 'Anti-Dumping Compliance Ledger',
      subtitle: 'Statutory export audit logs, shipment reconciliation, and opening/closing balances'
    }
  },
  coldstore: {
    dashboard: {
      title: 'Cold Storage Management',
      subtitle: 'Deep freeze chambers, pallet rack locations, and FIFO temperature telemetry'
    },
    'inward-intake': {
      title: 'Coldstore Inward & Intake',
      subtitle: 'Production carton intake, general stock-in, and chamber supervisor approvals'
    },
    'store-operations': {
      title: 'Coldstore Operations & Inventory',
      subtitle: 'Master pallet inventory, thawing & repacking logs, and physical stock adjustments'
    },
    'dispatch-outward': {
      title: 'Dispatch & Outward Logistics',
      subtitle: 'Order allocations, container loading shipments, stock-out, and inter-branch transfers'
    },
    'setup-imports': {
      title: 'Coldstore Racks & Batch Imports',
      subtitle: 'Chamber rack location mapping and bulk pallet inventory data uploads'
    }
  },
  inventory: {
    dashboard: {
      title: 'Inventory & Stock Ledger',
      subtitle: 'Raw material stores, consumables, packaging stock, and real-time ledger'
    },
    requisitions: {
      title: 'Store Requisitions & Indents',
      subtitle: 'Departmental packaging, chemical, and engineering store indent requests'
    },
    procurement: {
      title: 'Store Procurement & Orders',
      subtitle: 'Proforma invoices, store purchase orders, and vendor procurement register'
    },
    'store-operations': {
      title: 'Goods Receipt & Material Issues',
      subtitle: 'Inward Goods Receipt Notes (GRN) and floor material issue vouchers'
    }
  },
  sales: {
    dashboard: {
      title: 'Executive Sales Dashboard',
      subtitle: 'Global buyers, active dispatches, revenue metrics, and container telemetry'
    },
    'product-management': {
      title: 'Product Management (Master Data)',
      subtitle: 'Product categories, preparations, species master, grades, packing styles, and SUPC SKU creation'
    },
    product: {
      title: 'Product Management (Master Data)',
      subtitle: 'Product categories, preparations, species master, grades, packing styles, and SUPC SKU creation'
    },
    'master-data': {
      title: 'Product Management (Master Data)',
      subtitle: 'Product categories, preparations, species master, grades, packing styles, and SUPC SKU creation'
    },
    'buyer-management': {
      title: 'Buyer Management',
      subtitle: 'International buyers, consignees, destination notify parties, applicants, and private-label export brands'
    },
    buyers: {
      title: 'Buyer Management',
      subtitle: 'International buyers, consignees, destination notify parties, applicants, and private-label export brands'
    },
    orders: {
      title: 'Orders (Sales Execution)',
      subtitle: 'Proforma invoices, custom invoices, US 10+2 ISF filing, shipping bills, commercial invoices, and FDA clearance'
    },
    'payments-financials': {
      title: 'Payments & Financials',
      subtitle: 'FX forward contracts, bank negotiations, invoice collections, and payment realization tracking'
    },
    payments: {
      title: 'Payments & Financials',
      subtitle: 'FX forward contracts, bank negotiations, invoice collections, and payment realization tracking'
    },
    finance: {
      title: 'Payments & Financials',
      subtitle: 'FX forward contracts, bank negotiations, invoice collections, and payment realization tracking'
    },
    insurance: {
      title: 'Marine Cargo Insurance',
      subtitle: 'Pending ocean dispatches, marine declaration policies, and premium payment settlement'
    },
    reports: {
      title: 'Sales & Export Reports',
      subtitle: 'Delayed shipments, sales performance summaries, payment realization status, and finished goods inventory'
    },
    'dashboard-reports': {
      title: 'Sales & Export Reports',
      subtitle: 'Delayed shipments, sales performance summaries, payment realization status, and finished goods inventory'
    }
  },
  reports: {
    'production-analytics': {
      title: 'Production & Yield Analytics',
      subtitle: 'Plant yield recovery abstracts, floor summaries, and anti-dumping export logs'
    },
    'coldstore-analytics': {
      title: 'Coldstore & Inventory Analytics',
      subtitle: 'Cold chain stock valuation, aging summaries, movement logs, and exception reports'
    },
    'sales-export-analytics': {
      title: 'Sales, Logistics & Financial Analytics',
      subtitle: 'Regulatory compliance abstracts, container freight analysis, and export realization reports'
    }
  },
  setup: {
    'master-data': {
      title: 'Master Settings & Profiles',
      subtitle: 'Plant configuration, supplier master registry, species pricing, and system parameters'
    },
    'client-master-setup': {
      title: 'System Settings & Configuration',
      subtitle: 'Company profile, user access control, role permissions, and dynamic studio builders'
    }
  },
  help: {
    'support-tickets': {
      title: 'Help & Support Center',
      subtitle: '24/7 IT Helpdesk, weighbridge & barcode support tickets, and plant compliance guides'
    },
    documentation: {
      title: 'Compliance & SOP Documentation',
      subtitle: 'Standard operating procedures, MPEDA/USFDA manuals, and module user guides'
    }
  },
  notifications: {
    center: {
      title: 'Notification Center',
      subtitle: 'Real-time operational alerts, dock arrivals, cold chain telemetry, and pending approvals'
    }
  }
};

export const Router = {
  resolve(rawHash = '') {
    const clean = rawHash.replace(/^#\/?/, '').replace(/^\/+/, '');
    const parts = clean.split('/');
    const moduleName = parts[0] || 'home';
    let submenuName = parts[1] || '';
    let tabName = parts[2] || '';

    if (moduleName === 'sales') {
      const SALES_ALIASES = {
        'product': 'product-management',
        'master-data': 'product-management',
        'buyers': 'buyer-management',
        'payments': 'payments-financials',
        'finance': 'payments-financials',
        'sales-overview': 'dashboard',
        'dashboard-reports': 'reports'
      };
      if (SALES_ALIASES[submenuName]) {
        submenuName = SALES_ALIASES[submenuName];
      }
      if (tabName === 'species') {
        tabName = 'species-master';
      }
    }

    if (moduleName === 'home') {
      return {
        modObj: { id: 'home', title: 'Home', submenus: [] },
        subObj: { id: 'welcome', title: 'Home', tabs: [] },
        tabId: 'welcome',
        moduleId: 'home',
        submenuId: 'welcome',
        resolvedHash: '#/home',
        metadata: SECTION_METADATA_REGISTRY.home.welcome
      };
    }

    const modObj = NAV_HIERARCHY.find(m => m.id === moduleName) || NAV_HIERARCHY[0];
    let subObj = modObj.submenus.find(s => s.id === submenuName);

    if (!subObj) {
      for (const sm of modObj.submenus) {
        if (sm.tabs.some(t => t.id === submenuName)) {
          subObj = sm;
          tabName = submenuName;
          submenuName = sm.id;
          break;
        }
      }
      if (!subObj) {
        subObj = modObj.submenus[0];
        submenuName = subObj.id;
      }
    }

    if (!tabName) {
      tabName = subObj.defaultTab || subObj.tabs[0]?.id || '';
    }

    const resolvedHash = `#/${modObj.id}/${subObj.id}/${tabName}`;
    const metadata = SECTION_METADATA_REGISTRY[modObj.id]?.[subObj.id] || {
      title: `${modObj.title} ${subObj.title}`,
      subtitle: 'Aquaculture operations, live metrics, and records'
    };

    return {
      modObj,
      subObj,
      moduleId: modObj.id,
      submenuId: subObj.id,
      tabId: tabName,
      resolvedHash,
      metadata
    };
  }
};
