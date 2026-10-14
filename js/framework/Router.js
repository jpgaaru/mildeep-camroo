// AquaPulse Framework — Declarative Route Resolver & Section Metadata Registry

import { NAV_HIERARCHY } from '../components/sidebar.js';

export const SECTION_METADATA_REGISTRY = {
  purchase: {
    dashboard: {
      title: 'Purchase Dashboard',
      subtitle: 'Live procurement arrivals, telemetry metrics, and plant processing distribution.'
    },
    operations: {
      title: 'Purchase Operations',
      subtitle: 'Farmer procurement bookings, dock weighment arrivals, and lot intake tracking'
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
    'floor-operations': {
      title: 'Pre-Processing Floor Operations',
      subtitle: 'Receiving, grading, sorting tables, and live peeling task allocation'
    },
    'chemical-inventory': {
      title: 'Chemical Inventory & Usage',
      subtitle: 'Food-grade soaking additives, ice usage logs, and batch dosage tracking'
    },
    traceability: {
      title: 'Pre-Processing Traceability',
      subtitle: 'End-to-end pond-to-line batch traceability and yield reconciliation logs'
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
      title: 'Sales & Export Shipments',
      subtitle: 'International buyers, sales contracts, port dock dispatch, and container manifests'
    },
    'master-data': {
      title: 'Sales & Buyer Master Data',
      subtitle: 'Export product catalog, international buyers & consignees, and private label brands'
    },
    'contracts-pricing': {
      title: 'Contracts & Export Pricing',
      subtitle: 'International buyer price books, LC/TT sales contracts, and grade rate schedules'
    },
    'export-ops': {
      title: 'Export Operations & Logistics',
      subtitle: 'Bills of Lading, health certificates, customs clearing, container tracking, and marine insurance'
    },
    'export-finance': {
      title: 'Export Finance & Realization',
      subtitle: 'Bank document negotiations, export collections realization, and FX forward contracts'
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
    const moduleName = parts[0] || 'purchase';
    let submenuName = parts[1] || '';
    let tabName = parts[2] || '';

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
