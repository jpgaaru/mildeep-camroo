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
      title: 'Payments & Disbursements',
      subtitle: 'Bank wire vouchers, vendor payment status, and statutory disbursements'
    }
  },
  preprocessing: {
    dashboard: {
      title: 'Pre-Processing Floor',
      subtitle: 'De-heading, grading, peeling lines, and yield recovery telemetry'
    },
    'floor-operations': {
      title: 'Pre-Processing Floor Operations',
      subtitle: 'Live receiving, sorting tables, de-heading & peeling line task allocation'
    },
    'chemical-inventory': {
      title: 'Chemical Inventory & Usage',
      subtitle: 'Food-grade soaking additives, chlorine dosing logs, and batch chemical consumption'
    },
    traceability: {
      title: 'Pre-Processing Traceability',
      subtitle: 'Farm-to-line batch genealogy, pond source linkage, and lot yield reconciliation'
    }
  },
  quality: {
    dashboard: {
      title: 'Quality Assurance & Lab',
      subtitle: 'Antibiotic screenings, microbiological testing, and HACCP compliance'
    },
    lab: {
      title: 'Quality Control Laboratory',
      subtitle: 'ELISA antibiotic residue screening, microbiological cultures, and external lab certificates'
    },
    'qc-operations': {
      title: 'Quality Control Operations',
      subtitle: 'Line inspection orders, core temperature checks, and export QC documentation'
    },
    'chemical-screening': {
      title: 'Chemical & Residue Screening',
      subtitle: 'Pre-harvest and dock arrival chemical residue screening registers'
    },
    'qc-audits': {
      title: 'Compliance & Quality Audits',
      subtitle: 'USFDA, EU, BAP, BRCGS food safety, farm, hatchery, and social audit registries'
    }
  },
  production: {
    dashboard: {
      title: 'Production & Freezing',
      subtitle: 'IQF, blast freezing, glazing lines, and master carton packaging'
    },
    'setup-master': {
      title: 'Production Setup & Yields',
      subtitle: 'Standard species conversion yield norms, count-grade tolerances, and line norms'
    },
    'batch-tracking': {
      title: 'Production Batch Tracking',
      subtitle: 'Real-time soaking tank dwell timers and IQF/blast freezer batch tracking'
    },
    'production-operations': {
      title: 'Production Line Operations',
      subtitle: 'Active soaking batches, glaze pick-up verification, and freezing transfer logs'
    },
    'production-control': {
      title: 'Production Control & Mass Balance',
      subtitle: 'Floor balance by variety, head-on to finished conversion, and line reconciliation'
    },
    'anti-dumping': {
      title: 'Anti-Dumping Compliance Ledger',
      subtitle: 'Statutory US/EU export traceability, negative audit verification, and closing balances'
    }
  },
  coldstore: {
    dashboard: {
      title: 'Cold Storage Management',
      subtitle: 'Deep freeze chambers, pallet rack locations, and FIFO temperature telemetry'
    },
    'inward-intake': {
      title: 'Coldstore Inward & Intake',
      subtitle: 'Finished master carton intake from packing lines, general stock-in, and approvals'
    },
    'store-operations': {
      title: 'Coldstore Chamber Operations',
      subtitle: 'Master pallet inventory, thawing & repacking orders, and physical cycle adjustments'
    },
    'dispatch-outward': {
      title: 'Dispatch & Container Outward',
      subtitle: 'Buyer order allocations, reefer container loading manifests, and IBT transfers'
    },
    'setup-imports': {
      title: 'Coldstore Racks & Data Setup',
      subtitle: 'Chamber rack bin topology, pallet capacity mapping, and bulk stock imports'
    }
  },
  inventory: {
    dashboard: {
      title: 'Inventory & Stock Ledger',
      subtitle: 'Raw material stores, consumables, packaging stock, and real-time ledger'
    },
    requisitions: {
      title: 'Material Requisitions & Indents',
      subtitle: 'Departmental packaging, chemical, and engineering store indents'
    },
    procurement: {
      title: 'Store Procurement & Orders',
      subtitle: 'Packaging & consumable purchase orders, proforma invoices, and vendor registers'
    },
    'store-operations': {
      title: 'Store Receipt & Material Issues',
      subtitle: 'Goods Receipt Notes (GRN), quality inspection clearance, and floor material issues'
    }
  },
  sales: {
    dashboard: {
      title: 'Sales & Export Shipments',
      subtitle: 'International buyers, sales contracts, port dock dispatch, and container manifests'
    },
    'master-data': {
      title: 'Commercial & Buyer Master Data',
      subtitle: 'Export product specifications, international consignees, and private label brands'
    },
    'contracts-pricing': {
      title: 'Export Contracts & Price Books',
      subtitle: 'International species grade price books and buyer sales contract commitments'
    },
    'export-ops': {
      title: 'Export Operations & Logistics',
      subtitle: 'Bills of Lading, health certificates, customs clearing, and vessel tracking'
    },
    'export-finance': {
      title: 'Export Finance & Realization',
      subtitle: 'Letter of Credit (LC) bank negotiations, forex forward contracts, and realization'
    }
  },
  reports: {
    'production-analytics': {
      title: 'Production & Yield Analytics',
      subtitle: 'Species recovery yields, daily floor summaries, and anti-dumping export extracts'
    },
    'coldstore-analytics': {
      title: 'Coldstore & Valuation Analytics',
      subtitle: 'Chamber stock valuation, aging summaries, movement logs, and temperature exceptions'
    },
    'sales-export-analytics': {
      title: 'Sales, Freight & Export Analytics',
      subtitle: 'Regulatory compliance abstracts, container freight economics, and export realizations'
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
