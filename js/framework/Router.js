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
    }
  },
  quality: {
    dashboard: {
      title: 'Quality Assurance & Lab',
      subtitle: 'Antibiotic screenings, microbiological testing, and HACCP compliance'
    }
  },
  production: {
    dashboard: {
      title: 'Production & Freezing',
      subtitle: 'IQF, blast freezing, glazing lines, and master carton packaging'
    }
  },
  coldstore: {
    dashboard: {
      title: 'Cold Storage Management',
      subtitle: 'Deep freeze chambers, pallet rack locations, and FIFO temperature telemetry'
    }
  },
  inventory: {
    dashboard: {
      title: 'Inventory & Stock Ledger',
      subtitle: 'Raw material stores, consumables, packaging stock, and real-time ledger'
    }
  },
  sales: {
    dashboard: {
      title: 'Sales & Export Shipments',
      subtitle: 'International buyers, sales contracts, port dock dispatch, and container manifests'
    }
  },
  reports: {
    reports: {
      title: 'Enterprise Analytics & Reports',
      subtitle: 'Comprehensive financial, operational, and regulatory reporting abstracts'
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
