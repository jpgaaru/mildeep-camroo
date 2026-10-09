// Setup Module Views - Client & Master Setup for Fisheries ERP
// Configurable Multi-Company & Master Data Studio for Seafood Processing, Quality, Production, and Coldstore ERP.

import { ERP_DATA } from '../data/mockData.js';
import { TabBar } from '../components/tabBar.js';
import { Toast } from '../components/toast.js';
import { Modal } from '../components/modal.js';
import { renderEmptyState } from '../components/emptyState.js';

const STUDIO_STORAGE_KEY = 'dfl_erp_master_studio_state_v3';

const DEFAULT_MODULES_CONFIG = [
  {
    "id": "dashboard",
    "key": "dashboard",
    "label": "DASHBOARD",
    "order": 1,
    "visible": true,
    "submenusCount": 7,
    "roles": [
      "System Administrator",
      "Procurement Officer",
      "Quality Lab Inspector",
      "Production Floor Manager",
      "Coldstore Keeper",
      "Sales & Exports Manager"
    ],
    "route": "#/dashboard/dashboard/dashboard"
  },
  {
    "id": "master",
    "key": "master",
    "label": "MASTER",
    "order": 2,
    "visible": true,
    "submenusCount": 46,
    "roles": [
      "System Administrator"
    ],
    "route": "#/master/exporter/add-exporter"
  },
  {
    "id": "buyers",
    "key": "buyers",
    "label": "BUYERS",
    "order": 3,
    "visible": true,
    "submenusCount": 5,
    "roles": [
      "System Administrator",
      "Sales & Exports Manager"
    ],
    "route": "#/buyers/buyer-list/add-buyer-details"
  },
  {
    "id": "orders",
    "key": "orders",
    "label": "ORDERS",
    "order": 4,
    "visible": true,
    "submenusCount": 11,
    "roles": [
      "System Administrator",
      "Sales & Exports Manager"
    ],
    "route": "#/orders/proforma-list/pi-generation"
  },
  {
    "id": "payments",
    "key": "payments",
    "label": "PAYMENTS",
    "order": 5,
    "visible": true,
    "submenusCount": 5,
    "roles": [
      "System Administrator",
      "Sales & Exports Manager"
    ],
    "route": "#/payments/forward-contracts/add-forward-contract"
  },
  {
    "id": "insurance",
    "key": "insurance",
    "label": "INSURANCE",
    "order": 6,
    "visible": true,
    "submenusCount": 3,
    "roles": [
      "System Administrator",
      "Sales & Exports Manager"
    ],
    "route": "#/insurance/pending-insurance/pending-insurance"
  },
  {
    "id": "reports",
    "key": "reports",
    "label": "REPORTS",
    "order": 7,
    "visible": true,
    "submenusCount": 35,
    "roles": [
      "System Administrator",
      "Procurement Officer",
      "Quality Lab Inspector",
      "Production Floor Manager",
      "Coldstore Keeper",
      "Sales & Exports Manager"
    ],
    "route": "#/reports/pending-contracts/pending-contracts"
  },
  {
    "id": "purchase",
    "key": "purchase",
    "label": "PURCHASE",
    "order": 8,
    "visible": true,
    "submenusCount": 6,
    "roles": [
      "System Administrator",
      "Procurement Officer"
    ],
    "route": "#/purchase/bookings/create-booking"
  },
  {
    "id": "tickets",
    "key": "tickets",
    "label": "TICKETS",
    "order": 9,
    "visible": true,
    "submenusCount": 1,
    "roles": [
      "System Administrator",
      "Procurement Officer",
      "Quality Lab Inspector",
      "Production Floor Manager",
      "Coldstore Keeper",
      "Sales & Exports Manager"
    ],
    "route": "#/tickets/tickets/tickets"
  },
  {
    "id": "help",
    "key": "help",
    "label": "HELP",
    "order": 10,
    "visible": true,
    "submenusCount": 1,
    "roles": [
      "System Administrator",
      "Procurement Officer",
      "Quality Lab Inspector",
      "Production Floor Manager",
      "Coldstore Keeper",
      "Sales & Exports Manager"
    ],
    "route": "#/help/help-line/help-line"
  },
  {
    "id": "stock",
    "key": "stock",
    "label": "STOCK",
    "order": 11,
    "visible": true,
    "submenusCount": 2,
    "roles": [
      "System Administrator",
      "Coldstore Keeper"
    ],
    "route": "#/stock/stock-in/stock-in"
  },
  {
    "id": "store",
    "key": "store",
    "label": "STORE",
    "order": 12,
    "visible": true,
    "submenusCount": 3,
    "roles": [
      "System Administrator",
      "Coldstore Keeper"
    ],
    "route": "#/store/view-store/view-store"
  },
  {
    "id": "shipments",
    "key": "shipments",
    "label": "SHIPMENTS",
    "order": 13,
    "visible": true,
    "submenusCount": 1,
    "roles": [
      "System Administrator",
      "Sales & Exports Manager"
    ],
    "route": "#/shipments/shipment-out/shipment-out"
  },
  {
    "id": "quality-control",
    "key": "quality-control",
    "label": "QUALITY CONTROL",
    "order": 14,
    "visible": true,
    "submenusCount": 2,
    "roles": [
      "System Administrator",
      "Quality Lab Inspector"
    ],
    "route": "#/quality-control/documentation/doc-add-reports"
  },
  {
    "id": "production",
    "key": "production",
    "label": "PRODUCTION",
    "order": 15,
    "visible": true,
    "submenusCount": 6,
    "roles": [
      "System Administrator",
      "Production Floor Manager"
    ],
    "route": "#/production/soaking-v2/soaking-v2"
  },
  {
    "id": "store-reports",
    "key": "store-reports",
    "label": "STORE REPORTS",
    "order": 16,
    "visible": true,
    "submenusCount": 21,
    "roles": [
      "System Administrator",
      "Coldstore Keeper"
    ],
    "route": "#/store-reports/rack-wise-stock-report/rack-wise-stock-report"
  },
  {
    "id": "sales",
    "key": "sales",
    "label": "SALES",
    "order": 17,
    "visible": true,
    "submenusCount": 1,
    "roles": [
      "System Administrator",
      "Sales & Exports Manager"
    ],
    "route": "#/sales/delayed-shipments/delayed-shipments"
  },
  {
    "id": "pre-processing",
    "key": "pre-processing",
    "label": "PRE PROCESSING",
    "order": 18,
    "visible": true,
    "submenusCount": 10,
    "roles": [
      "System Administrator",
      "Production Floor Manager"
    ],
    "route": "#/pre-processing/deheading/deheading"
  },
  {
    "id": "lab",
    "key": "lab",
    "label": "LAB",
    "order": 19,
    "visible": true,
    "submenusCount": 6,
    "roles": [
      "System Administrator",
      "Quality Lab Inspector"
    ],
    "route": "#/lab/lots-list/lots-list"
  },
  {
    "id": "qc-reports",
    "key": "qc-reports",
    "label": "QC REPORTS",
    "order": 20,
    "visible": true,
    "submenusCount": 11,
    "roles": [
      "System Administrator",
      "Quality Lab Inspector"
    ],
    "route": "#/qc-reports/food-audit-report/food-audit-report"
  },
  {
    "id": "product",
    "key": "product",
    "label": "PRODUCT",
    "order": 21,
    "visible": true,
    "submenusCount": 6,
    "roles": [
      "System Administrator",
      "Procurement Officer",
      "Quality Lab Inspector",
      "Production Floor Manager",
      "Coldstore Keeper",
      "Sales & Exports Manager"
    ],
    "route": "#/product/product-list/add-product"
  },
  {
    "id": "development",
    "key": "development",
    "label": "DEVELOPMENT",
    "order": 22,
    "visible": true,
    "submenusCount": 5,
    "roles": [
      "System Administrator",
      "Procurement Officer",
      "Quality Lab Inspector",
      "Production Floor Manager",
      "Coldstore Keeper",
      "Sales & Exports Manager"
    ],
    "route": "#/development/production-standard-yields/production-standard-yields"
  },
  {
    "id": "general-store",
    "key": "general-store",
    "label": "GENERAL STORE",
    "order": 23,
    "visible": true,
    "submenusCount": 7,
    "roles": [
      "System Administrator",
      "Coldstore Keeper"
    ],
    "route": "#/general-store/material-issue-gs/material-issue-gs"
  },
  {
    "id": "cs-master",
    "key": "cs-master",
    "label": "CS MASTER",
    "order": 24,
    "visible": true,
    "submenusCount": 8,
    "roles": [
      "System Administrator",
      "Procurement Officer",
      "Quality Lab Inspector",
      "Production Floor Manager",
      "Coldstore Keeper",
      "Sales & Exports Manager"
    ],
    "route": "#/cs-master/general-options-list/cs-general-options-list"
  },
  {
    "id": "qc-audit",
    "key": "qc-audit",
    "label": "QC AUDIT",
    "order": 25,
    "visible": true,
    "submenusCount": 5,
    "roles": [
      "System Administrator",
      "Quality Lab Inspector"
    ],
    "route": "#/qc-audit/feed-mill-audit-list/feed-mill-audit-list"
  },
  {
    "id": "ibt",
    "key": "ibt",
    "label": "IBT",
    "order": 26,
    "visible": true,
    "submenusCount": 1,
    "roles": [
      "System Administrator",
      "Procurement Officer",
      "Quality Lab Inspector",
      "Production Floor Manager",
      "Coldstore Keeper",
      "Sales & Exports Manager"
    ],
    "route": "#/ibt/cs-ibt-request-list/cs-ibt-breakup-data"
  },
  {
    "id": "stock-approvals",
    "key": "stock-approvals",
    "label": "STOCK APPROVALS",
    "order": 27,
    "visible": true,
    "submenusCount": 2,
    "roles": [
      "System Administrator",
      "Procurement Officer",
      "Quality Lab Inspector",
      "Production Floor Manager",
      "Coldstore Keeper",
      "Sales & Exports Manager"
    ],
    "route": "#/stock-approvals/admin-daily-production-list/admin-daily-production-list"
  },
  {
    "id": "chemical-screens",
    "key": "chemical-screens",
    "label": "CHEMICAL SCREENS",
    "order": 28,
    "visible": true,
    "submenusCount": 10,
    "roles": [
      "System Administrator",
      "Procurement Officer",
      "Quality Lab Inspector",
      "Production Floor Manager",
      "Coldstore Keeper",
      "Sales & Exports Manager"
    ],
    "route": "#/chemical-screens/chemical-payments-list/chemical-payments-list"
  },
  {
    "id": "production-reports",
    "key": "production-reports",
    "label": "PRODUCTION REPORTS",
    "order": 29,
    "visible": true,
    "submenusCount": 19,
    "roles": [
      "System Administrator",
      "Production Floor Manager"
    ],
    "route": "#/production-reports/reconciliation-report/reconciliation-report"
  },
  {
    "id": "qc-dashboard",
    "key": "qc-dashboard",
    "label": "QC DASHBOARD",
    "order": 30,
    "visible": true,
    "submenusCount": 1,
    "roles": [
      "System Administrator",
      "Quality Lab Inspector"
    ],
    "route": "#/qc-dashboard/qc-dashboard-new/qc-dashboard-new"
  },
  {
    "id": "anti-dumping",
    "key": "anti-dumping",
    "label": "ANTI DUMPING",
    "order": 31,
    "visible": true,
    "submenusCount": 6,
    "roles": [
      "System Administrator",
      "Procurement Officer",
      "Quality Lab Inspector",
      "Production Floor Manager",
      "Coldstore Keeper",
      "Sales & Exports Manager"
    ],
    "route": "#/anti-dumping/anti-dumping-entry-form/anti-dumping-entry-form"
  },
  {
    "id": "inventory",
    "key": "inventory",
    "label": "INVENTORY",
    "order": 32,
    "visible": true,
    "submenusCount": 2,
    "roles": [
      "System Administrator",
      "Coldstore Keeper"
    ],
    "route": "#/inventory/proforma-register-create-gs/proforma-register-create-gs"
  },
  {
    "id": "packing-material",
    "key": "packing-material",
    "label": "PACKING MATERIAL",
    "order": 33,
    "visible": true,
    "submenusCount": 6,
    "roles": [
      "System Administrator",
      "Procurement Officer",
      "Quality Lab Inspector",
      "Production Floor Manager",
      "Coldstore Keeper",
      "Sales & Exports Manager"
    ],
    "route": "#/packing-material/material-issue-pm/material-issue-pm"
  }
];
const DEFAULT_SUBMENUS_CONFIG = {
  "dashboard": [
    {
      "id": "dashboard",
      "title": "Dashboard",
      "tabs": [
        {
          "id": "dashboard",
          "label": "Dashboard",
          "route": "#/dashboard/dashboard/dashboard",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "purchase-dashboard",
      "title": "Purchase Dashboard",
      "tabs": [
        {
          "id": "purchase-dashboard",
          "label": "Purchase Dashboard",
          "route": "#/dashboard/purchase-dashboard/purchase-dashboard",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "rm-dashboard",
      "title": "RM Dashboard",
      "tabs": [
        {
          "id": "rm-dashboard",
          "label": "RM Dashboard",
          "route": "#/dashboard/rm-dashboard/rm-dashboard",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "production-dashboard",
      "title": "Production Dashboard",
      "tabs": [
        {
          "id": "production-dashboard",
          "label": "Production Dashboard",
          "route": "#/dashboard/production-dashboard/production-dashboard",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "coldstore-dashboard",
      "title": "Coldstore Dashboard",
      "tabs": [
        {
          "id": "coldstore-dashboard",
          "label": "Coldstore Dashboard",
          "route": "#/dashboard/coldstore-dashboard/coldstore-dashboard",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "quality-control-dashboard",
      "title": "Quality Control Dashboard",
      "tabs": [
        {
          "id": "quality-control-dashboard",
          "label": "Quality Control Dashboard",
          "route": "#/dashboard/quality-control-dashboard/quality-control-dashboard",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "cs-dashboard-new",
      "title": "CS Dashboard New",
      "tabs": [
        {
          "id": "cs-dashboard-new",
          "label": "CS Dashboard New",
          "route": "#/dashboard/cs-dashboard-new/cs-dashboard-new",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "master": [
    {
      "id": "exporter",
      "title": "Exporter",
      "tabs": [
        {
          "id": "add-exporter",
          "label": "Add Exporter",
          "route": "#/master/exporter/add-exporter",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "processor",
      "title": "Processor",
      "tabs": [
        {
          "id": "add-processor",
          "label": "Add Processor",
          "route": "#/master/processor/add-processor",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "payment-terms",
      "title": "Payment Terms",
      "tabs": [
        {
          "id": "add-payment-terms",
          "label": "Add Payment Terms",
          "route": "#/master/payment-terms/add-payment-terms",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "cha",
      "title": "CHA",
      "tabs": [
        {
          "id": "add-logistics",
          "label": "Add Logistics",
          "route": "#/master/cha/add-logistics",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "liners-list",
      "title": "Liners List",
      "tabs": [
        {
          "id": "add-liner",
          "label": "Add Liner",
          "route": "#/master/liners-list/add-liner",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "description-list",
      "title": "Description List",
      "tabs": [
        {
          "id": "add-description",
          "label": "Add Description",
          "route": "#/master/description-list/add-description",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "ports-list",
      "title": "Ports List",
      "tabs": [
        {
          "id": "add-port",
          "label": "Add Port",
          "route": "#/master/ports-list/add-port",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "exchange-rates",
      "title": "Exchange Rates",
      "tabs": [
        {
          "id": "add-exchange-rate",
          "label": "Add Exchange Rate",
          "route": "#/master/exchange-rates/add-exchange-rate",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "banks-list",
      "title": "Banks List",
      "tabs": [
        {
          "id": "add-bank",
          "label": "Add Bank",
          "route": "#/master/banks-list/add-bank",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "store-delivery-details-list",
      "title": "Store Delivery Details List",
      "tabs": [
        {
          "id": "add-store-delivery-details",
          "label": "Add Store Delivery Details",
          "route": "#/master/store-delivery-details-list/add-store-delivery-details",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "graders-list",
      "title": "Graders List",
      "tabs": [
        {
          "id": "create-details",
          "label": "Create Details",
          "route": "#/master/graders-list/create-details",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "agents-list",
      "title": "Agents List",
      "tabs": [
        {
          "id": "create-agent",
          "label": "Create Agent",
          "route": "#/master/agents-list/create-agent",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "financiers-list",
      "title": "Financiers List",
      "tabs": [
        {
          "id": "create-financier",
          "label": "Create Financier",
          "route": "#/master/financiers-list/create-financier",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "drivers-list",
      "title": "Drivers List",
      "tabs": [
        {
          "id": "create-details",
          "label": "Create Details",
          "route": "#/master/drivers-list/create-details",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "vehicle-list",
      "title": "Vehicle List",
      "tabs": [
        {
          "id": "add-vehicle",
          "label": "Add Vehicle",
          "route": "#/master/vehicle-list/add-vehicle",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "yields",
      "title": "Yields",
      "tabs": [
        {
          "id": "yields",
          "label": "Yields",
          "route": "#/master/yields/yields",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "supervisor",
      "title": "Supervisor",
      "tabs": [
        {
          "id": "create-details",
          "label": "Create Details",
          "route": "#/master/supervisor/create-details",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "traceability",
      "title": "Traceability",
      "tabs": [
        {
          "id": "traceability",
          "label": "Traceability",
          "route": "#/master/traceability/traceability",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "lab-users-list",
      "title": "Lab Users List",
      "tabs": [
        {
          "id": "doc-add-lab-user-names",
          "label": "Doc Add Lab User Names",
          "route": "#/master/lab-users-list/doc-add-lab-user-names",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "hl-va-variety-list",
      "title": "HL VA Variety List",
      "tabs": [
        {
          "id": "create-hlva-variety",
          "label": "Create HLVA Variety",
          "route": "#/master/hl-va-variety-list/create-hlva-variety",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "countrywise-address-list",
      "title": "Countrywise Address List",
      "tabs": [
        {
          "id": "create-countrywise-addresses",
          "label": "Create Countrywise Addresses",
          "route": "#/master/countrywise-address-list/create-countrywise-addresses",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "lab-analysis-list",
      "title": "Lab Analysis List",
      "tabs": [
        {
          "id": "analysis-required-create",
          "label": "Analysis Required Create",
          "route": "#/master/lab-analysis-list/analysis-required-create",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "external-lab-names",
      "title": "External Lab Names",
      "tabs": [
        {
          "id": "quality-control-lab-names-create",
          "label": "Quality Control Lab Names Create",
          "route": "#/master/external-lab-names/quality-control-lab-names-create",
          "type": "dynamic-form",
          "badge": ""
        },
        {
          "id": "lab-names-create",
          "label": "Lab Names Create",
          "route": "#/master/external-lab-names/lab-names-create",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "tax-charges",
      "title": "Tax Charges",
      "tabs": [
        {
          "id": "create-tax-charges",
          "label": "Create Tax Charges",
          "route": "#/master/tax-charges/create-tax-charges",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "currency",
      "title": "Currency",
      "tabs": [
        {
          "id": "currency",
          "label": "Currency",
          "route": "#/master/currency/currency",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "vm-rates-2",
      "title": "VM Rates 2",
      "tabs": [
        {
          "id": "add-purchase-rates-m1",
          "label": "Add Purchase Rates M1",
          "route": "#/master/vm-rates-2/add-purchase-rates-m1",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "master-counts",
      "title": "Master Counts",
      "tabs": [
        {
          "id": "master-add-counts",
          "label": "Master Add Counts",
          "route": "#/master/master-counts/master-add-counts",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "chemicals-buyers-list",
      "title": "Chemicals Buyers List",
      "tabs": [
        {
          "id": "chemicals-buyers-list",
          "label": "Chemicals Buyers List",
          "route": "#/master/chemicals-buyers-list/chemicals-buyers-list",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "chemicals-master",
      "title": "Chemicals Master",
      "tabs": [
        {
          "id": "chemicals-master",
          "label": "Chemicals Master",
          "route": "#/master/chemicals-master/chemicals-master",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "chemicals-suppliers-list",
      "title": "Chemicals Suppliers List",
      "tabs": [
        {
          "id": "chemicals-suppliers-list",
          "label": "Chemicals Suppliers List",
          "route": "#/master/chemicals-suppliers-list/chemicals-suppliers-list",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "audit-categories-options-list",
      "title": "Audit Categories Options List",
      "tabs": [
        {
          "id": "audit-categories-option-create",
          "label": "Audit Categories Option Create",
          "route": "#/master/audit-categories-options-list/audit-categories-option-create",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "audit-categories-list",
      "title": "Audit Categories List",
      "tabs": [
        {
          "id": "audit-categories-list",
          "label": "Audit Categories List",
          "route": "#/master/audit-categories-list/audit-categories-list",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "farms-list",
      "title": "Farms List",
      "tabs": [
        {
          "id": "farm-master-create",
          "label": "Farm Master Create",
          "route": "#/master/farms-list/farm-master-create",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "certification-body-list",
      "title": "Certification Body List",
      "tabs": [
        {
          "id": "certification-body-master-create",
          "label": "Certification Body Master Create",
          "route": "#/master/certification-body-list/certification-body-master-create",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "audit-dropdown-master",
      "title": "Audit Dropdown Master",
      "tabs": [
        {
          "id": "audit-dropdowns-master-create",
          "label": "Audit Dropdowns Master Create",
          "route": "#/master/audit-dropdown-master/audit-dropdowns-master-create",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "hatchery-list",
      "title": "Hatchery List",
      "tabs": [
        {
          "id": "hatchery-master-create",
          "label": "Hatchery Master Create",
          "route": "#/master/hatchery-list/hatchery-master-create",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "freight-rates",
      "title": "Freight Rates",
      "tabs": [
        {
          "id": "add-freight-rates-new",
          "label": "Add Freight Rates New",
          "route": "#/master/freight-rates/add-freight-rates-new",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "liners-contracts",
      "title": "Liners Contracts",
      "tabs": [
        {
          "id": "liners-contracts",
          "label": "Liners Contracts",
          "route": "#/master/liners-contracts/liners-contracts",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "reciprocal-tariffs",
      "title": "Reciprocal Tariffs",
      "tabs": [
        {
          "id": "reciprocal-tariffs",
          "label": "Reciprocal Tariffs",
          "route": "#/master/reciprocal-tariffs/reciprocal-tariffs",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "gst-master",
      "title": "GST Master",
      "tabs": [
        {
          "id": "gst-master",
          "label": "GST Master",
          "route": "#/master/gst-master/gst-master",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "prices-master",
      "title": "Prices Master",
      "tabs": [
        {
          "id": "prices-master",
          "label": "Prices Master",
          "route": "#/master/prices-master/prices-master",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "departments-master",
      "title": "Departments Master",
      "tabs": [
        {
          "id": "departments-master",
          "label": "Departments Master",
          "route": "#/master/departments-master/departments-master",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "brands-master",
      "title": "Brands Master",
      "tabs": [
        {
          "id": "brands-master",
          "label": "Brands Master",
          "route": "#/master/brands-master/brands-master",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "vendors-master",
      "title": "Vendors Master",
      "tabs": [
        {
          "id": "vendors-master",
          "label": "Vendors Master",
          "route": "#/master/vendors-master/vendors-master",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "general-items",
      "title": "General Items",
      "tabs": [
        {
          "id": "general-items",
          "label": "General Items",
          "route": "#/master/general-items/general-items",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "po-tax-rates",
      "title": "PO Tax Rates",
      "tabs": [
        {
          "id": "po-tax-rates",
          "label": "PO Tax Rates",
          "route": "#/master/po-tax-rates/po-tax-rates",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "buyers": [
    {
      "id": "buyer-list",
      "title": "Buyer List",
      "tabs": [
        {
          "id": "add-buyer-details",
          "label": "Add Buyer Details",
          "route": "#/buyers/buyer-list/add-buyer-details",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "consignee-list",
      "title": "Consignee List",
      "tabs": [
        {
          "id": "add-consignee-details",
          "label": "Add Consignee Details",
          "route": "#/buyers/consignee-list/add-consignee-details",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "notify-party-list",
      "title": "Notify Party List",
      "tabs": [
        {
          "id": "add-notify-party-details",
          "label": "Add Notify Party Details",
          "route": "#/buyers/notify-party-list/add-notify-party-details",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "applicant-list",
      "title": "Applicant List",
      "tabs": [
        {
          "id": "create-applicant",
          "label": "Create Applicant",
          "route": "#/buyers/applicant-list/create-applicant",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "brands-list",
      "title": "Brands List",
      "tabs": [
        {
          "id": "add-brand",
          "label": "Add Brand",
          "route": "#/buyers/brands-list/add-brand",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    }
  ],
  "orders": [
    {
      "id": "proforma-list",
      "title": "Proforma List",
      "tabs": [
        {
          "id": "pi-generation",
          "label": "PI Generation",
          "route": "#/orders/proforma-list/pi-generation",
          "type": "system",
          "badge": ""
        },
        {
          "id": "po-edit",
          "label": "PO Edit",
          "route": "#/orders/proforma-list/po-edit",
          "type": "system",
          "badge": ""
        },
        {
          "id": "proforma-inv",
          "label": "Proforma Inv",
          "route": "#/orders/proforma-list/proforma-inv",
          "type": "dynamic-form",
          "badge": ""
        },
        {
          "id": "doc-proforma-invoice-print",
          "label": "Doc Proforma Invoice Print",
          "route": "#/orders/proforma-list/doc-proforma-invoice-print",
          "type": "dynamic-form",
          "badge": ""
        },
        {
          "id": "po-breakup",
          "label": "PO Breakup",
          "route": "#/orders/proforma-list/po-breakup",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "custom-invoices",
      "title": "Custom Invoices",
      "tabs": [
        {
          "id": "add-custom-invoice",
          "label": "Add Custom Invoice",
          "route": "#/orders/custom-invoices/add-custom-invoice",
          "type": "dynamic-form",
          "badge": ""
        },
        {
          "id": "custom-invoice",
          "label": "Custom Invoice",
          "route": "#/orders/custom-invoices/custom-invoice",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "isf-details",
      "title": "ISF Details",
      "tabs": [
        {
          "id": "add-isf-form",
          "label": "Add ISF Form",
          "route": "#/orders/isf-details/add-isf-form",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "eta-status",
      "title": "ETA Status",
      "tabs": [
        {
          "id": "eta-status",
          "label": "ETA Status",
          "route": "#/orders/eta-status/eta-status",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "fda-status",
      "title": "FDA Status",
      "tabs": [
        {
          "id": "add-fda-details",
          "label": "Add FDA Details",
          "route": "#/orders/fda-status/add-fda-details",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "clearing-agent",
      "title": "Clearing Agent",
      "tabs": [
        {
          "id": "clearing-agent-form",
          "label": "Clearing Agent Form",
          "route": "#/orders/clearing-agent/clearing-agent-form",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "shipping-bill",
      "title": "Shipping Bill",
      "tabs": [
        {
          "id": "shipping-bill-form",
          "label": "Shipping Bill Form",
          "route": "#/orders/shipping-bill/shipping-bill-form",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "commercial-invoice",
      "title": "Commercial Invoice",
      "tabs": [
        {
          "id": "add-commercial-invoice",
          "label": "Add Commercial Invoice",
          "route": "#/orders/commercial-invoice/add-commercial-invoice",
          "type": "dynamic-form",
          "badge": ""
        },
        {
          "id": "doc-add-reports",
          "label": "Doc Add Reports",
          "route": "#/orders/commercial-invoice/doc-add-reports",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "running-orders",
      "title": "Running Orders",
      "tabs": [
        {
          "id": "create-shipment-status",
          "label": "Create Shipment Status",
          "route": "#/orders/running-orders/create-shipment-status",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "orders-status",
      "title": "Orders Status",
      "tabs": [
        {
          "id": "orders-status",
          "label": "Orders Status",
          "route": "#/orders/orders-status/orders-status",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "shipments-list",
      "title": "Shipments List",
      "tabs": [
        {
          "id": "shipments-list",
          "label": "Shipments List",
          "route": "#/orders/shipments-list/shipments-list",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "payments": [
    {
      "id": "forward-contracts",
      "title": "Forward Contracts",
      "tabs": [
        {
          "id": "add-forward-contract",
          "label": "Add Forward Contract",
          "route": "#/payments/forward-contracts/add-forward-contract",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "collections",
      "title": "Collections",
      "tabs": [
        {
          "id": "add-collection",
          "label": "Add Collection",
          "route": "#/payments/collections/add-collection",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "negotiations",
      "title": "Negotiations",
      "tabs": [
        {
          "id": "add-bill-of-exchange",
          "label": "Add Bill Of Exchange",
          "route": "#/payments/negotiations/add-bill-of-exchange",
          "type": "dynamic-form",
          "badge": ""
        },
        {
          "id": "add-collection",
          "label": "Add Collection",
          "route": "#/payments/negotiations/add-collection",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "realization",
      "title": "Realization",
      "tabs": [
        {
          "id": "realization-form",
          "label": "Realization Form",
          "route": "#/payments/realization/realization-form",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "realization-done",
      "title": "Realization Done",
      "tabs": [
        {
          "id": "realization-done",
          "label": "Realization Done",
          "route": "#/payments/realization-done/realization-done",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "insurance": [
    {
      "id": "pending-insurance",
      "title": "Pending Insurance",
      "tabs": [
        {
          "id": "pending-insurance",
          "label": "Pending Insurance",
          "route": "#/insurance/pending-insurance/pending-insurance",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "insurance-templates",
      "title": "Insurance Templates",
      "tabs": [
        {
          "id": "insurance-templates",
          "label": "Insurance Templates",
          "route": "#/insurance/insurance-templates/insurance-templates",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "insurance-payments",
      "title": "Insurance Payments",
      "tabs": [
        {
          "id": "insurance-payments",
          "label": "Insurance Payments",
          "route": "#/insurance/insurance-payments/insurance-payments",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "reports": [
    {
      "id": "pending-contracts",
      "title": "Pending Contracts",
      "tabs": [
        {
          "id": "pending-contracts",
          "label": "Pending Contracts",
          "route": "#/reports/pending-contracts/pending-contracts",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "approved-contracts",
      "title": "Approved Contracts",
      "tabs": [
        {
          "id": "approved-contracts",
          "label": "Approved Contracts",
          "route": "#/reports/approved-contracts/approved-contracts",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "out-of-etd-eta-report",
      "title": "Out Of ETD/ETA Report",
      "tabs": [
        {
          "id": "out-of-etd-eta-report",
          "label": "Out Of ETD/ETA Report",
          "route": "#/reports/out-of-etd-eta-report/out-of-etd-eta-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "fda-examination-report",
      "title": "FDA Examination Report",
      "tabs": [
        {
          "id": "fda-examination-report",
          "label": "FDA Examination Report",
          "route": "#/reports/fda-examination-report/fda-examination-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "mpeda-report",
      "title": "MPEDA Report",
      "tabs": [
        {
          "id": "mpeda-report",
          "label": "MPEDA Report",
          "route": "#/reports/mpeda-report/mpeda-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "shipment-report",
      "title": "Shipment Report",
      "tabs": [
        {
          "id": "shipment-report",
          "label": "Shipment Report",
          "route": "#/reports/shipment-report/shipment-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "lab-report",
      "title": "Lab Report",
      "tabs": [
        {
          "id": "lab-report",
          "label": "Lab Report",
          "route": "#/reports/lab-report/lab-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "q-certificate-report",
      "title": "Q Certificate Report",
      "tabs": [
        {
          "id": "q-certificate-report",
          "label": "Q Certificate Report",
          "route": "#/reports/q-certificate-report/q-certificate-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "pending-payments",
      "title": "Pending Payments",
      "tabs": [
        {
          "id": "pending-payments",
          "label": "Pending Payments",
          "route": "#/reports/pending-payments/pending-payments",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "pending-negotiation-report",
      "title": "Pending Negotiation Report",
      "tabs": [
        {
          "id": "pending-negotiation-report",
          "label": "Pending Negotiation Report",
          "route": "#/reports/pending-negotiation-report/pending-negotiation-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "bills-realization",
      "title": "Bills Realization",
      "tabs": [
        {
          "id": "bills-realization",
          "label": "Bills Realization",
          "route": "#/reports/bills-realization/bills-realization",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "fc-utilized-report",
      "title": "FC Utilized Report",
      "tabs": [
        {
          "id": "fc-utilized-report",
          "label": "FC Utilized Report",
          "route": "#/reports/fc-utilized-report/fc-utilized-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "gst-sales-report",
      "title": "GST Sales Report",
      "tabs": [
        {
          "id": "gst-sales-report",
          "label": "GST Sales Report",
          "route": "#/reports/gst-sales-report/gst-sales-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "clearing-agent-report",
      "title": "Clearing Agent Report",
      "tabs": [
        {
          "id": "clearing-agent-report",
          "label": "Clearing Agent Report",
          "route": "#/reports/clearing-agent-report/clearing-agent-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "m-transit-ins-payments",
      "title": "M Transit Ins & Payments",
      "tabs": [
        {
          "id": "m-transit-ins-payments",
          "label": "M Transit Ins & Payments",
          "route": "#/reports/m-transit-ins-payments/m-transit-ins-payments",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "packing-report",
      "title": "Packing Report",
      "tabs": [
        {
          "id": "packing-report",
          "label": "Packing Report",
          "route": "#/reports/packing-report/packing-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "shipment-line-item-wise-report",
      "title": "Shipment Line Item Wise Report",
      "tabs": [
        {
          "id": "shipment-line-item-wise-report",
          "label": "Shipment Line Item Wise Report",
          "route": "#/reports/shipment-line-item-wise-report/shipment-line-item-wise-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "purchase-report",
      "title": "Purchase Report",
      "tabs": [
        {
          "id": "purchase-report",
          "label": "Purchase Report",
          "route": "#/reports/purchase-report/purchase-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "purchase-count-wise",
      "title": "Purchase Count Wise",
      "tabs": [
        {
          "id": "purchase-count-wise",
          "label": "Purchase Count Wise",
          "route": "#/reports/purchase-count-wise/purchase-count-wise",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "center-wise-report",
      "title": "Center Wise Report",
      "tabs": [
        {
          "id": "center-wise-report",
          "label": "Center Wise Report",
          "route": "#/reports/center-wise-report/center-wise-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "supplier-bill-summary",
      "title": "Supplier Bill Summary",
      "tabs": [
        {
          "id": "supplier-bill-summary",
          "label": "Supplier Bill Summary",
          "route": "#/reports/supplier-bill-summary/supplier-bill-summary",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "center-wise-abstract-report",
      "title": "Center Wise Abstract Report",
      "tabs": [
        {
          "id": "center-wise-abstract-report",
          "label": "Center Wise Abstract Report",
          "route": "#/reports/center-wise-abstract-report/center-wise-abstract-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "date-wise-abstract-report",
      "title": "Date Wise Abstract Report",
      "tabs": [
        {
          "id": "date-wise-abstract-report",
          "label": "Date Wise Abstract Report",
          "route": "#/reports/date-wise-abstract-report/date-wise-abstract-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "supplier-wise-outstanding-report",
      "title": "Supplier Wise Outstanding Report",
      "tabs": [
        {
          "id": "supplier-wise-outstanding-report",
          "label": "Supplier Wise Outstanding Report",
          "route": "#/reports/supplier-wise-outstanding-report/supplier-wise-outstanding-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "monthly-abstract-report",
      "title": "Monthly Abstract Report",
      "tabs": [
        {
          "id": "monthly-abstract-report",
          "label": "Monthly Abstract Report",
          "route": "#/reports/monthly-abstract-report/monthly-abstract-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "bill-date-wise-payment-summary",
      "title": "Bill & Date Wise Payment Summary",
      "tabs": [
        {
          "id": "bill-date-wise-payment-summary",
          "label": "Bill & Date Wise Payment Summary",
          "route": "#/reports/bill-date-wise-payment-summary/bill-date-wise-payment-summary",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "supplier-wise-abstract-report",
      "title": "Supplier Wise Abstract Report",
      "tabs": [
        {
          "id": "supplier-wise-abstract-report",
          "label": "Supplier Wise Abstract Report",
          "route": "#/reports/supplier-wise-abstract-report/supplier-wise-abstract-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "supplier-bill-wise-outstanding-amount",
      "title": "Supplier & Bill Wise Outstanding Amount",
      "tabs": [
        {
          "id": "supplier-bill-wise-outstanding-amount",
          "label": "Supplier & Bill Wise Outstanding Amount",
          "route": "#/reports/supplier-bill-wise-outstanding-amount/supplier-bill-wise-outstanding-amount",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "supplier-wise-ledger",
      "title": "Supplier Wise Ledger",
      "tabs": [
        {
          "id": "supplier-wise-ledger-report",
          "label": "Supplier Wise Ledger Report",
          "route": "#/reports/supplier-wise-ledger/supplier-wise-ledger-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "company-wise-tds-report",
      "title": "Company Wise TDS Report",
      "tabs": [
        {
          "id": "company-wise-tds-report",
          "label": "Company Wise TDS Report",
          "route": "#/reports/company-wise-tds-report/company-wise-tds-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "arrival-report",
      "title": "Arrival Report",
      "tabs": [
        {
          "id": "doc-excel-rm-overall-arrival-report",
          "label": "Doc Excel RM Overall Arrival Report",
          "route": "#/reports/arrival-report/doc-excel-rm-overall-arrival-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "return-container-report",
      "title": "Return Container Report",
      "tabs": [
        {
          "id": "return-container-report",
          "label": "Return Container Report",
          "route": "#/reports/return-container-report/return-container-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "freight-rates-report",
      "title": "Freight Rates Report",
      "tabs": [
        {
          "id": "freight-rates-report",
          "label": "Freight Rates Report",
          "route": "#/reports/freight-rates-report/freight-rates-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "agent-commission-report",
      "title": "Agent Commission Report",
      "tabs": [
        {
          "id": "agent-commission-report",
          "label": "Agent Commission Report",
          "route": "#/reports/agent-commission-report/agent-commission-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "price-book",
      "title": "Price Book",
      "tabs": [
        {
          "id": "price-book",
          "label": "Price Book",
          "route": "#/reports/price-book/price-book",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "purchase": [
    {
      "id": "bookings",
      "title": "Bookings",
      "tabs": [
        {
          "id": "create-booking",
          "label": "Create Booking",
          "route": "#/purchase/bookings/create-booking",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "rm-arrival",
      "title": "RM Arrival",
      "tabs": [
        {
          "id": "rm-arrival",
          "label": "RM Arrival",
          "route": "#/purchase/rm-arrival/rm-arrival",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "arrivals",
      "title": "Arrivals",
      "tabs": [
        {
          "id": "create-arrival",
          "label": "Create Arrival",
          "route": "#/purchase/arrivals/create-arrival",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "bills",
      "title": "Bills",
      "tabs": [
        {
          "id": "rm-bill",
          "label": "RM Bill",
          "route": "#/purchase/bills/rm-bill",
          "type": "system",
          "badge": ""
        },
        {
          "id": "commission-bill-page-1",
          "label": "Commission Bill Page 1",
          "route": "#/purchase/bills/commission-bill-page-1",
          "type": "system",
          "badge": ""
        },
        {
          "id": "bulk-download-bills",
          "label": "Bulk Download Bills",
          "route": "#/purchase/bills/bulk-download-bills",
          "type": "system",
          "badge": ""
        },
        {
          "id": "commission-bill-page-2",
          "label": "Commission Bill Page 2",
          "route": "#/purchase/bills/commission-bill-page-2",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "payments",
      "title": "Payments",
      "tabs": [
        {
          "id": "payments",
          "label": "Payments",
          "route": "#/purchase/payments/payments",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "payments-summary",
      "title": "Payments Summary",
      "tabs": [
        {
          "id": "cash-payment-voucher",
          "label": "Cash Payment Voucher",
          "route": "#/purchase/payments-summary/cash-payment-voucher",
          "type": "system",
          "badge": ""
        },
        {
          "id": "bank-payment-voucher",
          "label": "Bank Payment Voucher",
          "route": "#/purchase/payments-summary/bank-payment-voucher",
          "type": "system",
          "badge": ""
        },
        {
          "id": "journal-payment-voucher",
          "label": "Journal Payment Voucher",
          "route": "#/purchase/payments-summary/journal-payment-voucher",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "tickets": [
    {
      "id": "tickets",
      "title": "Tickets",
      "tabs": [
        {
          "id": "tickets",
          "label": "Tickets",
          "route": "#/tickets/tickets/tickets",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "help": [
    {
      "id": "help-line",
      "title": "Help Line",
      "tabs": [
        {
          "id": "help-line",
          "label": "Help Line",
          "route": "#/help/help-line/help-line",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "stock": [
    {
      "id": "stock-in",
      "title": "Stock In",
      "tabs": [
        {
          "id": "stock-in",
          "label": "Stock In",
          "route": "#/stock/stock-in/stock-in",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "stock-out",
      "title": "Stock Out",
      "tabs": [
        {
          "id": "stock-out",
          "label": "Stock Out",
          "route": "#/stock/stock-out/stock-out",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "store": [
    {
      "id": "view-store",
      "title": "View Store",
      "tabs": [
        {
          "id": "view-store",
          "label": "View Store",
          "route": "#/store/view-store/view-store",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "rack-names",
      "title": "Rack Names",
      "tabs": [
        {
          "id": "create-store-layout",
          "label": "Create Store Layout",
          "route": "#/store/rack-names/create-store-layout",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "view-stock",
      "title": "View Stock",
      "tabs": [
        {
          "id": "view-stock",
          "label": "View Stock",
          "route": "#/store/view-stock/view-stock",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "shipments": [
    {
      "id": "shipment-out",
      "title": "Shipment Out",
      "tabs": [
        {
          "id": "shipment-out",
          "label": "Shipment Out",
          "route": "#/shipments/shipment-out/shipment-out",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "quality-control": [
    {
      "id": "documentation",
      "title": "Documentation",
      "tabs": [
        {
          "id": "doc-add-reports",
          "label": "Doc Add Reports",
          "route": "#/quality-control/documentation/doc-add-reports",
          "type": "custom-list",
          "badge": ""
        },
        {
          "id": "doc-cl-create",
          "label": "Doc CL Create",
          "route": "#/quality-control/documentation/doc-cl-create",
          "type": "dynamic-form",
          "badge": ""
        },
        {
          "id": "doc-decl-credit",
          "label": "Doc Decl Credit",
          "route": "#/quality-control/documentation/doc-decl-credit",
          "type": "system",
          "badge": ""
        },
        {
          "id": "doc-add-ds-report",
          "label": "Doc Add DS Report",
          "route": "#/quality-control/documentation/doc-add-ds-report",
          "type": "custom-list",
          "badge": ""
        },
        {
          "id": "add-payment",
          "label": "Add Payment",
          "route": "#/quality-control/documentation/add-payment",
          "type": "dynamic-form",
          "badge": ""
        },
        {
          "id": "doc-add-mpeda-purchase-reg",
          "label": "Doc Add MPEDA Purchase Reg",
          "route": "#/quality-control/documentation/doc-add-mpeda-purchase-reg",
          "type": "dynamic-form",
          "badge": ""
        },
        {
          "id": "doc-shipment-create",
          "label": "Doc Shipment Create",
          "route": "#/quality-control/documentation/doc-shipment-create",
          "type": "dynamic-form",
          "badge": ""
        },
        {
          "id": "qc-new-addon-fields-for-sysco",
          "label": "QC New Addon Fields For Sysco",
          "route": "#/quality-control/documentation/qc-new-addon-fields-for-sysco",
          "type": "dynamic-form",
          "badge": ""
        },
        {
          "id": "variety-add",
          "label": "Variety Add",
          "route": "#/quality-control/documentation/variety-add",
          "type": "dynamic-form",
          "badge": ""
        },
        {
          "id": "doc-sample-letter",
          "label": "Doc Sample Letter",
          "route": "#/quality-control/documentation/doc-sample-letter",
          "type": "system",
          "badge": ""
        },
        {
          "id": "add-hc-covering-letter",
          "label": "Add HC Covering Letter",
          "route": "#/quality-control/documentation/add-hc-covering-letter",
          "type": "dynamic-form",
          "badge": ""
        },
        {
          "id": "doc-add-php-report",
          "label": "Doc Add PHP Report",
          "route": "#/quality-control/documentation/doc-add-php-report",
          "type": "custom-list",
          "badge": ""
        },
        {
          "id": "doc-add-elsar-report",
          "label": "Doc Add ELSAR Report",
          "route": "#/quality-control/documentation/doc-add-elsar-report",
          "type": "custom-list",
          "badge": ""
        },
        {
          "id": "doc-add-combined-report",
          "label": "Doc Add Combined Report",
          "route": "#/quality-control/documentation/doc-add-combined-report",
          "type": "custom-list",
          "badge": ""
        },
        {
          "id": "doc-add-salmonella",
          "label": "Doc Add Salmonella",
          "route": "#/quality-control/documentation/doc-add-salmonella",
          "type": "dynamic-form",
          "badge": ""
        },
        {
          "id": "doc-cl-edit",
          "label": "Doc CL Edit",
          "route": "#/quality-control/documentation/doc-cl-edit",
          "type": "system",
          "badge": ""
        },
        {
          "id": "shrimp-two-excel-report",
          "label": "Shrimp Two Excel Report",
          "route": "#/quality-control/documentation/shrimp-two-excel-report",
          "type": "custom-list",
          "badge": ""
        },
        {
          "id": "doc-product-release-edit",
          "label": "Doc Product Release Edit",
          "route": "#/quality-control/documentation/doc-product-release-edit",
          "type": "system",
          "badge": ""
        },
        {
          "id": "edit-salmonella-report",
          "label": "Edit Salmonella Report",
          "route": "#/quality-control/documentation/edit-salmonella-report",
          "type": "custom-list",
          "badge": ""
        },
        {
          "id": "doc-edit-cmb-report",
          "label": "Doc Edit CMB Report",
          "route": "#/quality-control/documentation/doc-edit-cmb-report",
          "type": "custom-list",
          "badge": ""
        },
        {
          "id": "doc-edit-php-report",
          "label": "Doc Edit PHP Report",
          "route": "#/quality-control/documentation/doc-edit-php-report",
          "type": "custom-list",
          "badge": ""
        },
        {
          "id": "shrimp-two-report",
          "label": "Shrimp Two Report",
          "route": "#/quality-control/documentation/shrimp-two-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "qc-orders",
      "title": "QC Orders",
      "tabs": [
        {
          "id": "doc-add-reports",
          "label": "Doc Add Reports",
          "route": "#/quality-control/qc-orders/doc-add-reports",
          "type": "custom-list",
          "badge": ""
        }
      ]
    }
  ],
  "production": [
    {
      "id": "soaking-v2",
      "title": "Soaking (V2)",
      "tabs": [
        {
          "id": "soaking-v2",
          "label": "Soaking (V2)",
          "route": "#/production/soaking-v2/soaking-v2",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "daily-production",
      "title": "Daily Production",
      "tabs": [
        {
          "id": "daily-production",
          "label": "Daily Production",
          "route": "#/production/daily-production/daily-production",
          "type": "system",
          "badge": ""
        },
        {
          "id": "daily-production-data",
          "label": "Daily Production Data",
          "route": "#/production/daily-production/daily-production-data",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "freezing-store",
      "title": "Freezing Store",
      "tabs": [
        {
          "id": "freezing-store",
          "label": "Freezing Store",
          "route": "#/production/freezing-store/freezing-store",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "soaking",
      "title": "Soaking",
      "tabs": [
        {
          "id": "soaking",
          "label": "Soaking",
          "route": "#/production/soaking/soaking",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "freezing",
      "title": "Freezing",
      "tabs": [
        {
          "id": "freezing",
          "label": "Freezing",
          "route": "#/production/freezing/freezing",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "daily-stockout",
      "title": "Daily Stockout",
      "tabs": [
        {
          "id": "daily-production-data-stock-out-id",
          "label": "Daily Production Data Stock Out ID",
          "route": "#/production/daily-stockout/daily-production-data-stock-out-id",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "store-reports": [
    {
      "id": "rack-wise-stock-report",
      "title": "Rack Wise Stock Report",
      "tabs": [
        {
          "id": "rack-wise-stock-report",
          "label": "Rack Wise Stock Report",
          "route": "#/store-reports/rack-wise-stock-report/rack-wise-stock-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "inward-report",
      "title": "Inward Report",
      "tabs": [
        {
          "id": "inward-report",
          "label": "Inward Report",
          "route": "#/store-reports/inward-report/inward-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "outward-report",
      "title": "Outward Report",
      "tabs": [
        {
          "id": "outward-report",
          "label": "Outward Report",
          "route": "#/store-reports/outward-report/outward-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "rm-requirement",
      "title": "RM Requirement",
      "tabs": [
        {
          "id": "rm-requirement",
          "label": "RM Requirement",
          "route": "#/store-reports/rm-requirement/rm-requirement",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "excess-stock-report",
      "title": "Excess Stock Report",
      "tabs": [
        {
          "id": "excess-stock-report",
          "label": "Excess Stock Report",
          "route": "#/store-reports/excess-stock-report/excess-stock-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "stock-overall-report",
      "title": "Stock Overall Report",
      "tabs": [
        {
          "id": "stock-overall-report",
          "label": "Stock Overall Report",
          "route": "#/store-reports/stock-overall-report/stock-overall-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "stock-report",
      "title": "Stock Report",
      "tabs": [
        {
          "id": "stock-report",
          "label": "Stock Report",
          "route": "#/store-reports/stock-report/stock-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "stock-summary",
      "title": "Stock Summary",
      "tabs": [
        {
          "id": "stock-summary",
          "label": "Stock Summary",
          "route": "#/store-reports/stock-summary/stock-summary",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "excess-order-report",
      "title": "Excess Order Report",
      "tabs": [
        {
          "id": "excess-order-report",
          "label": "Excess Order Report",
          "route": "#/store-reports/excess-order-report/excess-order-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "daily-monthly-production",
      "title": "Daily & Monthly Production",
      "tabs": [
        {
          "id": "cs-monthly-production-report",
          "label": "CS Monthly Production Report",
          "route": "#/store-reports/daily-monthly-production/cs-monthly-production-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "opening-closing-report",
      "title": "Opening & Closing Report",
      "tabs": [
        {
          "id": "opening-closing-report",
          "label": "Opening & Closing Report",
          "route": "#/store-reports/opening-closing-report/opening-closing-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "shipment-report-daily-monthly",
      "title": "Shipment Report Daily & Monthly",
      "tabs": [
        {
          "id": "shipment-report-daily-monthly",
          "label": "Shipment Report Daily & Monthly",
          "route": "#/store-reports/shipment-report-daily-monthly/shipment-report-daily-monthly",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "ibt-ibt-report",
      "title": "IBT - IBT+ Report",
      "tabs": [
        {
          "id": "ibt-ibt-report",
          "label": "IBT - IBT+ Report",
          "route": "#/store-reports/ibt-ibt-report/ibt-ibt-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "thawing-report",
      "title": "Thawing Report",
      "tabs": [
        {
          "id": "cs-thawing-report",
          "label": "CS Thawing Report",
          "route": "#/store-reports/thawing-report/cs-thawing-report",
          "type": "custom-list",
          "badge": ""
        },
        {
          "id": "thawing-report",
          "label": "Thawing Report",
          "route": "#/store-reports/thawing-report/thawing-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "repacking-report-rep-and-rep",
      "title": "Repacking Report (Rep+ And Rep -)",
      "tabs": [
        {
          "id": "cs-repacking-report",
          "label": "CS Repacking Report",
          "route": "#/store-reports/repacking-report-rep-and-rep/cs-repacking-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "shipment-status-report",
      "title": "Shipment Status Report",
      "tabs": [
        {
          "id": "shipment-status-report",
          "label": "Shipment Status Report",
          "route": "#/store-reports/shipment-status-report/shipment-status-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "daily-stock-report-plant-wise",
      "title": "Daily Stock Report (Plant Wise)",
      "tabs": [
        {
          "id": "daily-stock-report-plant-wise",
          "label": "Daily Stock Report (Plant Wise)",
          "route": "#/store-reports/daily-stock-report-plant-wise/daily-stock-report-plant-wise",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "order-timeline-report",
      "title": "Order Timeline Report",
      "tabs": [
        {
          "id": "order-timeline-report",
          "label": "Order Timeline Report",
          "route": "#/store-reports/order-timeline-report/order-timeline-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "daily-production-report",
      "title": "Daily Production Report",
      "tabs": [
        {
          "id": "daily-production-report",
          "label": "Daily Production Report",
          "route": "#/store-reports/daily-production-report/daily-production-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "physical-report-phy-and-phy",
      "title": "Physical Report (Phy+ And Phy-)",
      "tabs": [
        {
          "id": "physical-report-phy-and-phy",
          "label": "Physical Report (Phy+ And Phy-)",
          "route": "#/store-reports/physical-report-phy-and-phy/physical-report-phy-and-phy",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "stock-production-report",
      "title": "Stock Production Report",
      "tabs": [
        {
          "id": "stock-production-report",
          "label": "Stock Production Report",
          "route": "#/store-reports/stock-production-report/stock-production-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    }
  ],
  "sales": [
    {
      "id": "delayed-shipments",
      "title": "Delayed Shipments",
      "tabs": [
        {
          "id": "delayed-shipments",
          "label": "Delayed Shipments",
          "route": "#/sales/delayed-shipments/delayed-shipments",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "pre-processing": [
    {
      "id": "deheading",
      "title": "Deheading",
      "tabs": [
        {
          "id": "deheading",
          "label": "Deheading",
          "route": "#/pre-processing/deheading/deheading",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "lot-track",
      "title": "Lot Track",
      "tabs": [
        {
          "id": "lot-track",
          "label": "Lot Track",
          "route": "#/pre-processing/lot-track/lot-track",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "grading",
      "title": "Grading",
      "tabs": [
        {
          "id": "grading-all-plants-report",
          "label": "Grading All Plants Report",
          "route": "#/pre-processing/grading/grading-all-plants-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "rm-received-track-id",
      "title": "RM Received Track ID",
      "tabs": [
        {
          "id": "rm-received-track-id",
          "label": "RM Received Track ID",
          "route": "#/pre-processing/rm-received-track-id/rm-received-track-id",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "de-heading-track-id",
      "title": "De-Heading Track ID",
      "tabs": [
        {
          "id": "de-heading-track-id",
          "label": "De-Heading Track ID",
          "route": "#/pre-processing/de-heading-track-id/de-heading-track-id",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "grading-track-id",
      "title": "Grading Track ID",
      "tabs": [
        {
          "id": "grading-track-id",
          "label": "Grading Track ID",
          "route": "#/pre-processing/grading-track-id/grading-track-id",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "value-addition-track-id",
      "title": "Value Addition Track ID",
      "tabs": [
        {
          "id": "value-addition-track-id",
          "label": "Value Addition Track ID",
          "route": "#/pre-processing/value-addition-track-id/value-addition-track-id",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "soaking-track-id",
      "title": "Soaking Track ID",
      "tabs": [
        {
          "id": "soaking-track-id",
          "label": "Soaking Track ID",
          "route": "#/pre-processing/soaking-track-id/soaking-track-id",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "freezing-track-id",
      "title": "Freezing Track ID",
      "tabs": [
        {
          "id": "freezing-track-id",
          "label": "Freezing Track ID",
          "route": "#/pre-processing/freezing-track-id/freezing-track-id",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "hon-qty-transfer-after-va",
      "title": "Hon Qty Transfer After VA",
      "tabs": [
        {
          "id": "hon-qty-transfer-after-va",
          "label": "Hon Qty Transfer After VA",
          "route": "#/pre-processing/hon-qty-transfer-after-va/hon-qty-transfer-after-va",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "lab": [
    {
      "id": "lots-list",
      "title": "Lots List",
      "tabs": [
        {
          "id": "lots-list",
          "label": "Lots List",
          "route": "#/lab/lots-list/lots-list",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "ab-report",
      "title": "AB Report",
      "tabs": [
        {
          "id": "rm-ab-report",
          "label": "RM AB Report",
          "route": "#/lab/ab-report/rm-ab-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "rm-report",
      "title": "RM Report",
      "tabs": [
        {
          "id": "rm-report-create",
          "label": "RM Report Create",
          "route": "#/lab/rm-report/rm-report-create",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "mb-report",
      "title": "MB Report",
      "tabs": [
        {
          "id": "ih-add-mb-report",
          "label": "IH Add MB Report",
          "route": "#/lab/mb-report/ih-add-mb-report",
          "type": "custom-list",
          "badge": ""
        },
        {
          "id": "ih-add-mb-result",
          "label": "IH Add MB Result",
          "route": "#/lab/mb-report/ih-add-mb-result",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "lab-report",
      "title": "Lab Report",
      "tabs": [
        {
          "id": "ih-add-bore-water-analysis",
          "label": "IH Add Bore Water Analysis",
          "route": "#/lab/lab-report/ih-add-bore-water-analysis",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "external-lab-report",
      "title": "External Lab Report",
      "tabs": [
        {
          "id": "external-lab-report",
          "label": "External Lab Report",
          "route": "#/lab/external-lab-report/external-lab-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    }
  ],
  "qc-reports": [
    {
      "id": "food-audit-report",
      "title": "Food Audit Report",
      "tabs": [
        {
          "id": "food-audit-report",
          "label": "Food Audit Report",
          "route": "#/qc-reports/food-audit-report/food-audit-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "social-audit-report",
      "title": "Social Audit Report",
      "tabs": [
        {
          "id": "social-audit-report",
          "label": "Social Audit Report",
          "route": "#/qc-reports/social-audit-report/social-audit-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "farm-audit-report",
      "title": "Farm Audit Report",
      "tabs": [
        {
          "id": "farm-audit-report",
          "label": "Farm Audit Report",
          "route": "#/qc-reports/farm-audit-report/farm-audit-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "hatchery-audit-report",
      "title": "Hatchery Audit Report",
      "tabs": [
        {
          "id": "hatchery-audit-report",
          "label": "Hatchery Audit Report",
          "route": "#/qc-reports/hatchery-audit-report/hatchery-audit-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "feed-mill-audit-report",
      "title": "Feed Mill Audit Report",
      "tabs": [
        {
          "id": "feed-mill-audit-report",
          "label": "Feed Mill Audit Report",
          "route": "#/qc-reports/feed-mill-audit-report/feed-mill-audit-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "bap-report",
      "title": "BAP Report",
      "tabs": [
        {
          "id": "bap-report",
          "label": "BAP Report",
          "route": "#/qc-reports/bap-report/bap-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "buyer-request-list",
      "title": "Buyer Request List",
      "tabs": [
        {
          "id": "buyer-request-list",
          "label": "Buyer Request List",
          "route": "#/qc-reports/buyer-request-list/buyer-request-list",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "sysco-status-list",
      "title": "Sysco Status List",
      "tabs": [
        {
          "id": "sysco-status-list",
          "label": "Sysco Status List",
          "route": "#/qc-reports/sysco-status-list/sysco-status-list",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "traceability-utilized-report",
      "title": "Traceability Utilized Report",
      "tabs": [
        {
          "id": "traceability-utilized-report",
          "label": "Traceability Utilized Report",
          "route": "#/qc-reports/traceability-utilized-report/traceability-utilized-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "payment-statement",
      "title": "Payment Statement",
      "tabs": [
        {
          "id": "doc-edit-sample-letter-external",
          "label": "Doc Edit Sample Letter External",
          "route": "#/qc-reports/payment-statement/doc-edit-sample-letter-external",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "traceability-report",
      "title": "Traceability Report",
      "tabs": [
        {
          "id": "traceability-report",
          "label": "Traceability Report",
          "route": "#/qc-reports/traceability-report/traceability-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    }
  ],
  "product": [
    {
      "id": "product-list",
      "title": "Product List",
      "tabs": [
        {
          "id": "add-product",
          "label": "Add Product",
          "route": "#/product/product-list/add-product",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "preparation-list",
      "title": "Preparation List",
      "tabs": [
        {
          "id": "add-preparation",
          "label": "Add Preparation",
          "route": "#/product/preparation-list/add-preparation",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "grades-list",
      "title": "Grades List",
      "tabs": [
        {
          "id": "add-options",
          "label": "Add Options",
          "route": "#/product/grades-list/add-options",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "packing-style-list",
      "title": "Packing Style List",
      "tabs": [
        {
          "id": "create-packing-styles",
          "label": "Create Packing Styles",
          "route": "#/product/packing-style-list/create-packing-styles",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "variety-list",
      "title": "Variety List",
      "tabs": [
        {
          "id": "add-variety",
          "label": "Add Variety",
          "route": "#/product/variety-list/add-variety",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "species",
      "title": "Species",
      "tabs": [
        {
          "id": "species-master-create",
          "label": "Species Master Create",
          "route": "#/product/species/species-master-create",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    }
  ],
  "development": [
    {
      "id": "production-standard-yields",
      "title": "Production Standard Yields",
      "tabs": [
        {
          "id": "production-standard-yields",
          "label": "Production Standard Yields",
          "route": "#/development/production-standard-yields/production-standard-yields",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "daily-stock-report-plant-wise-new",
      "title": "Daily Stock Report (Plant Wise) New",
      "tabs": [
        {
          "id": "daily-stock-report-plant-wise-new",
          "label": "Daily Stock Report (Plant Wise) New",
          "route": "#/development/daily-stock-report-plant-wise-new/daily-stock-report-plant-wise-new",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "stock-value-report",
      "title": "Stock Value Report",
      "tabs": [
        {
          "id": "stock-value-report",
          "label": "Stock Value Report",
          "route": "#/development/stock-value-report/stock-value-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "stock-value-report-landscape",
      "title": "Stock Value Report Landscape",
      "tabs": [
        {
          "id": "stock-value-report-landscape",
          "label": "Stock Value Report Landscape",
          "route": "#/development/stock-value-report-landscape/stock-value-report-landscape",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "consolidation-report",
      "title": "Consolidation Report",
      "tabs": [
        {
          "id": "consolidation-report",
          "label": "Consolidation Report",
          "route": "#/development/consolidation-report/consolidation-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    }
  ],
  "general-store": [
    {
      "id": "material-issue-gs",
      "title": "Material Issue (GS)",
      "tabs": [
        {
          "id": "material-issue-gs",
          "label": "Material Issue (GS)",
          "route": "#/general-store/material-issue-gs/material-issue-gs",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "goods-receipt-note-gs",
      "title": "Goods Receipt Note (GS)",
      "tabs": [
        {
          "id": "goods-receipt-note-gs",
          "label": "Goods Receipt Note (GS)",
          "route": "#/general-store/goods-receipt-note-gs/goods-receipt-note-gs",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "proforma-order-gs",
      "title": "Proforma Order (GS)",
      "tabs": [
        {
          "id": "proforma-order-gs",
          "label": "Proforma Order (GS)",
          "route": "#/general-store/proforma-order-gs/proforma-order-gs",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "indent-page-gs",
      "title": "Indent Page (GS)",
      "tabs": [
        {
          "id": "indent-page",
          "label": "Indent Page",
          "route": "#/general-store/indent-page-gs/indent-page",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "indent-list-gs",
      "title": "Indent List (GS)",
      "tabs": [
        {
          "id": "indent-list-gs",
          "label": "Indent List (GS)",
          "route": "#/general-store/indent-list-gs/indent-list-gs",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "proforma-list-gs",
      "title": "Proforma List (GS)",
      "tabs": [
        {
          "id": "proforma-list-gs",
          "label": "Proforma List (GS)",
          "route": "#/general-store/proforma-list-gs/proforma-list-gs",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "goods-receipt-note-list-gs",
      "title": "Goods Receipt Note List (GS)",
      "tabs": [
        {
          "id": "goods-receipt-note-list-gs",
          "label": "Goods Receipt Note List (GS)",
          "route": "#/general-store/goods-receipt-note-list-gs/goods-receipt-note-list-gs",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "cs-master": [
    {
      "id": "general-options-list",
      "title": "General Options List",
      "tabs": [
        {
          "id": "cs-general-options-list",
          "label": "CS General Options List",
          "route": "#/cs-master/general-options-list/cs-general-options-list",
          "type": "system",
          "badge": ""
        },
        {
          "id": "cs-create-general-options",
          "label": "CS Create General Options",
          "route": "#/cs-master/general-options-list/cs-create-general-options",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "tenants-list",
      "title": "Tenants List",
      "tabs": [
        {
          "id": "cs-create-tenants",
          "label": "CS Create Tenants",
          "route": "#/cs-master/tenants-list/cs-create-tenants",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "coldstores-list",
      "title": "Coldstores List",
      "tabs": [
        {
          "id": "daily-production-data",
          "label": "Daily Production Data",
          "route": "#/cs-master/coldstores-list/daily-production-data",
          "type": "system",
          "badge": ""
        },
        {
          "id": "cs-create-coldstores",
          "label": "CS Create Coldstores",
          "route": "#/cs-master/coldstores-list/cs-create-coldstores",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "general-categories-list",
      "title": "General Categories List",
      "tabs": [
        {
          "id": "cs-create-general-categories",
          "label": "CS Create General Categories",
          "route": "#/cs-master/general-categories-list/cs-create-general-categories",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "floor-list",
      "title": "Floor List",
      "tabs": [
        {
          "id": "cs-create-floor",
          "label": "CS Create Floor",
          "route": "#/cs-master/floor-list/cs-create-floor",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "block-list",
      "title": "Block List",
      "tabs": [
        {
          "id": "cs-create-block",
          "label": "CS Create Block",
          "route": "#/cs-master/block-list/cs-create-block",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "variety-list",
      "title": "Variety List",
      "tabs": [
        {
          "id": "variety-list",
          "label": "Variety List",
          "route": "#/cs-master/variety-list/variety-list",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "hon-packing-count-master",
      "title": "Hon Packing Count Master",
      "tabs": [
        {
          "id": "grade-master-hl-count",
          "label": "Grade Master HL Count",
          "route": "#/cs-master/hon-packing-count-master/grade-master-hl-count",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "qc-audit": [
    {
      "id": "feed-mill-audit-list",
      "title": "Feed Mill Audit List",
      "tabs": [
        {
          "id": "feed-mill-audit-list",
          "label": "Feed Mill Audit List",
          "route": "#/qc-audit/feed-mill-audit-list/feed-mill-audit-list",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "social-audit-list",
      "title": "Social Audit List",
      "tabs": [
        {
          "id": "social-audit-list",
          "label": "Social Audit List",
          "route": "#/qc-audit/social-audit-list/social-audit-list",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "food-audit-list",
      "title": "Food Audit List",
      "tabs": [
        {
          "id": "food-audit-list",
          "label": "Food Audit List",
          "route": "#/qc-audit/food-audit-list/food-audit-list",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "farm-audit-list",
      "title": "Farm Audit List",
      "tabs": [
        {
          "id": "farm-audit-list",
          "label": "Farm Audit List",
          "route": "#/qc-audit/farm-audit-list/farm-audit-list",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "hatchery-audit-list",
      "title": "Hatchery Audit List",
      "tabs": [
        {
          "id": "hatchery-audit-list",
          "label": "Hatchery Audit List",
          "route": "#/qc-audit/hatchery-audit-list/hatchery-audit-list",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "ibt": [
    {
      "id": "cs-ibt-request-list",
      "title": "CS IBT Request List",
      "tabs": [
        {
          "id": "cs-ibt-breakup-data",
          "label": "CS IBT Breakup Data",
          "route": "#/ibt/cs-ibt-request-list/cs-ibt-breakup-data",
          "type": "system",
          "badge": ""
        },
        {
          "id": "cs-ibt-breakup-preview",
          "label": "CS IBT Breakup Preview",
          "route": "#/ibt/cs-ibt-request-list/cs-ibt-breakup-preview",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "stock-approvals": [
    {
      "id": "admin-daily-production-list",
      "title": "Admin Daily Production List",
      "tabs": [
        {
          "id": "admin-daily-production-list",
          "label": "Admin Daily Production List",
          "route": "#/stock-approvals/admin-daily-production-list/admin-daily-production-list",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "admin-inward-approval",
      "title": "Admin Inward Approval",
      "tabs": [
        {
          "id": "admin-inward-approval",
          "label": "Admin Inward Approval",
          "route": "#/stock-approvals/admin-inward-approval/admin-inward-approval",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "chemical-screens": [
    {
      "id": "chemical-payments-list",
      "title": "Chemical Payments List",
      "tabs": [
        {
          "id": "chemical-payments-list",
          "label": "Chemical Payments List",
          "route": "#/chemical-screens/chemical-payments-list/chemical-payments-list",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "food-social-audit",
      "title": "Food & Social Audit",
      "tabs": [
        {
          "id": "food-social-audit",
          "label": "Food & Social Audit",
          "route": "#/chemical-screens/food-social-audit/food-social-audit",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "farm-mill-hatchery-audit",
      "title": "Farm/Mill/Hatchery Audit",
      "tabs": [
        {
          "id": "farm-mill-hatchery-audit",
          "label": "Farm/Mill/Hatchery Audit",
          "route": "#/chemical-screens/farm-mill-hatchery-audit/farm-mill-hatchery-audit",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "received-chemicals",
      "title": "Received Chemicals",
      "tabs": [
        {
          "id": "gs-chem-orders-list",
          "label": "GS Chem Orders List",
          "route": "#/chemical-screens/received-chemicals/gs-chem-orders-list",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "chemical-pos",
      "title": "Chemical POs",
      "tabs": [
        {
          "id": "gs-chem-po-create",
          "label": "GS Chem PO Create",
          "route": "#/chemical-screens/chemical-pos/gs-chem-po-create",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "chemicals-consumption",
      "title": "Chemicals Consumption",
      "tabs": [
        {
          "id": "gs-chem-consumption-create",
          "label": "GS Chem Consumption Create",
          "route": "#/chemical-screens/chemicals-consumption/gs-chem-consumption-create",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "hatchery-list",
      "title": "Hatchery List",
      "tabs": [
        {
          "id": "hatchery-list",
          "label": "Hatchery List",
          "route": "#/chemical-screens/hatchery-list/hatchery-list",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "chemical-opening-balance-report",
      "title": "Chemical Opening Balance Report",
      "tabs": [
        {
          "id": "chemical-opening-balance-report",
          "label": "Chemical Opening Balance Report",
          "route": "#/chemical-screens/chemical-opening-balance-report/chemical-opening-balance-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "chemical-balance-report",
      "title": "Chemical Balance Report",
      "tabs": [
        {
          "id": "chemical-balance-report",
          "label": "Chemical Balance Report",
          "route": "#/chemical-screens/chemical-balance-report/chemical-balance-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "chemical-received-report",
      "title": "Chemical Received Report",
      "tabs": [
        {
          "id": "gs-chem-orders-create",
          "label": "GS Chem Orders Create",
          "route": "#/chemical-screens/chemical-received-report/gs-chem-orders-create",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    }
  ],
  "production-reports": [
    {
      "id": "reconciliation-report",
      "title": "Reconciliation Report",
      "tabs": [
        {
          "id": "reconciliation-report",
          "label": "Reconciliation Report",
          "route": "#/production-reports/reconciliation-report/reconciliation-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "consolidation-report-daily-monthly",
      "title": "Consolidation Report Daily & Monthly",
      "tabs": [
        {
          "id": "consolidation-report-daily-and-monthly",
          "label": "Consolidation Report Daily And Monthly",
          "route": "#/production-reports/consolidation-report-daily-monthly/consolidation-report-daily-and-monthly",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "deheading-day-wise-report",
      "title": "Deheading Day Wise Report",
      "tabs": [
        {
          "id": "deheading-day-wise-report",
          "label": "Deheading Day Wise Report",
          "route": "#/production-reports/deheading-day-wise-report/deheading-day-wise-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "rm-received-day-wise-report",
      "title": "RM Received Day Wise Report",
      "tabs": [
        {
          "id": "rm-received-day-wise-report",
          "label": "RM Received Day Wise Report",
          "route": "#/production-reports/rm-received-day-wise-report/rm-received-day-wise-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "va-floor-balance-report",
      "title": "VA Floor Balance Report",
      "tabs": [
        {
          "id": "va-floor-balance-report",
          "label": "VA Floor Balance Report",
          "route": "#/production-reports/va-floor-balance-report/va-floor-balance-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "assumed-reports-by-rm-arrival",
      "title": "Assumed Reports By RM & Arrival",
      "tabs": [
        {
          "id": "assumed-reports-by-rm-arrival",
          "label": "Assumed Reports By RM & Arrival",
          "route": "#/production-reports/assumed-reports-by-rm-arrival/assumed-reports-by-rm-arrival",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "grading-day-machine-wise-report",
      "title": "Grading Day & Machine Wise Report",
      "tabs": [
        {
          "id": "grading-day-machine-wise-report",
          "label": "Grading Day & Machine Wise Report",
          "route": "#/production-reports/grading-day-machine-wise-report/grading-day-machine-wise-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "soaking-report",
      "title": "Soaking Report",
      "tabs": [
        {
          "id": "soaking-report",
          "label": "Soaking Report",
          "route": "#/production-reports/soaking-report/soaking-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "freezing-report",
      "title": "Freezing Report",
      "tabs": [
        {
          "id": "freezing-production-report",
          "label": "Freezing Production Report",
          "route": "#/production-reports/freezing-report/freezing-production-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "va-transfer-report",
      "title": "VA Transfer Report",
      "tabs": [
        {
          "id": "va-transfer-report",
          "label": "VA Transfer Report",
          "route": "#/production-reports/va-transfer-report/va-transfer-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "track-code-report",
      "title": "Track Code Report",
      "tabs": [
        {
          "id": "track-code-report",
          "label": "Track Code Report",
          "route": "#/production-reports/track-code-report/track-code-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "soaking-floor-balance-report",
      "title": "Soaking Floor Balance Report",
      "tabs": [
        {
          "id": "soaking-floor-balance-report",
          "label": "Soaking Floor Balance Report",
          "route": "#/production-reports/soaking-floor-balance-report/soaking-floor-balance-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "file-upload",
      "title": "File Upload",
      "tabs": [
        {
          "id": "file-upload",
          "label": "File Upload",
          "route": "#/production-reports/file-upload/file-upload",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "value-addition-report",
      "title": "Value Addition Report",
      "tabs": [
        {
          "id": "value-addition-report",
          "label": "Value Addition Report",
          "route": "#/production-reports/value-addition-report/value-addition-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "head-on-to-finished-report",
      "title": "Head On To Finished Report",
      "tabs": [
        {
          "id": "head-on-to-finished-report-pdf-d1",
          "label": "Head On To Finished Report PDF D1",
          "route": "#/production-reports/head-on-to-finished-report/head-on-to-finished-report-pdf-d1",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "untreated-report",
      "title": "Untreated Report",
      "tabs": [
        {
          "id": "untreated-report",
          "label": "Untreated Report",
          "route": "#/production-reports/untreated-report/untreated-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "freezing-production-report",
      "title": "Freezing Production Report",
      "tabs": [
        {
          "id": "freezing-production-report",
          "label": "Freezing Production Report",
          "route": "#/production-reports/freezing-production-report/freezing-production-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "soaking-floor-balance-variety-report-new",
      "title": "Soaking Floor Balance Variety Report New",
      "tabs": [
        {
          "id": "soaking-floor-balance-variety-report-new",
          "label": "Soaking Floor Balance Variety Report New",
          "route": "#/production-reports/soaking-floor-balance-variety-report-new/soaking-floor-balance-variety-report-new",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "value-addition-report-new",
      "title": "Value Addition Report New",
      "tabs": [
        {
          "id": "value-addition-report-new",
          "label": "Value Addition Report New",
          "route": "#/production-reports/value-addition-report-new/value-addition-report-new",
          "type": "custom-list",
          "badge": ""
        }
      ]
    }
  ],
  "qc-dashboard": [
    {
      "id": "qc-dashboard-new",
      "title": "QC Dashboard New",
      "tabs": [
        {
          "id": "qc-dashboard-new",
          "label": "QC Dashboard New",
          "route": "#/qc-dashboard/qc-dashboard-new/qc-dashboard-new",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ],
  "anti-dumping": [
    {
      "id": "anti-dumping-entry-form",
      "title": "Anti Dumping Entry Form",
      "tabs": [
        {
          "id": "anti-dumping-entry-form",
          "label": "Anti Dumping Entry Form",
          "route": "#/anti-dumping/anti-dumping-entry-form/anti-dumping-entry-form",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "anti-dumping-report",
      "title": "Anti Dumping Report",
      "tabs": [
        {
          "id": "anti-dumping-report",
          "label": "Anti Dumping Report",
          "route": "#/anti-dumping/anti-dumping-report/anti-dumping-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "anti-dumping-negative-report",
      "title": "Anti Dumping Negative Report",
      "tabs": [
        {
          "id": "anti-dumping-negative-report",
          "label": "Anti Dumping Negative Report",
          "route": "#/anti-dumping/anti-dumping-negative-report/anti-dumping-negative-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "anti-dumping-shipment-report",
      "title": "Anti Dumping Shipment Report",
      "tabs": [
        {
          "id": "anti-dumping-shipment-report",
          "label": "Anti Dumping Shipment Report",
          "route": "#/anti-dumping/anti-dumping-shipment-report/anti-dumping-shipment-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "anti-dumping-opening-closing-report",
      "title": "Anti Dumping Opening & Closing Report",
      "tabs": [
        {
          "id": "anti-dumping-opening-closing-report",
          "label": "Anti Dumping Opening & Closing Report",
          "route": "#/anti-dumping/anti-dumping-opening-closing-report/anti-dumping-opening-closing-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    },
    {
      "id": "anti-dumping-closing-report",
      "title": "Anti Dumping Closing Report",
      "tabs": [
        {
          "id": "anti-dumping-closing-report",
          "label": "Anti Dumping Closing Report",
          "route": "#/anti-dumping/anti-dumping-closing-report/anti-dumping-closing-report",
          "type": "custom-list",
          "badge": ""
        }
      ]
    }
  ],
  "inventory": [
    {
      "id": "proforma-register-create-gs",
      "title": "Proforma Register Create (GS)",
      "tabs": [
        {
          "id": "proforma-register-create-gs",
          "label": "Proforma Register Create (GS)",
          "route": "#/inventory/proforma-register-create-gs/proforma-register-create-gs",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "proforma-register-gs",
      "title": "Proforma Register (GS)",
      "tabs": [
        {
          "id": "proforma-register-gs",
          "label": "Proforma Register (GS)",
          "route": "#/inventory/proforma-register-gs/proforma-register-gs",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    }
  ],
  "packing-material": [
    {
      "id": "material-issue-pm",
      "title": "Material Issue (PM)",
      "tabs": [
        {
          "id": "material-issue-pm",
          "label": "Material Issue (PM)",
          "route": "#/packing-material/material-issue-pm/material-issue-pm",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "goods-receipt-note-pm",
      "title": "Goods Receipt Note (PM)",
      "tabs": [
        {
          "id": "goods-receipt-note-pm",
          "label": "Goods Receipt Note (PM)",
          "route": "#/packing-material/goods-receipt-note-pm/goods-receipt-note-pm",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "purchase-order-pm",
      "title": "Purchase Order (PM)",
      "tabs": [
        {
          "id": "purchase-order-pm",
          "label": "Purchase Order (PM)",
          "route": "#/packing-material/purchase-order-pm/purchase-order-pm",
          "type": "system",
          "badge": ""
        }
      ]
    },
    {
      "id": "proforma-invoice-pm",
      "title": "Proforma Invoice (PM)",
      "tabs": [
        {
          "id": "proforma-invoice-pm",
          "label": "Proforma Invoice (PM)",
          "route": "#/packing-material/proforma-invoice-pm/proforma-invoice-pm",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "proforma-list-pm",
      "title": "Proforma List (PM)",
      "tabs": [
        {
          "id": "proforma-list-pm",
          "label": "Proforma List (PM)",
          "route": "#/packing-material/proforma-list-pm/proforma-list-pm",
          "type": "dynamic-form",
          "badge": ""
        }
      ]
    },
    {
      "id": "purchase-order-list-pm",
      "title": "Purchase Order List (PM)",
      "tabs": [
        {
          "id": "purchase-order-list-pm",
          "label": "Purchase Order List (PM)",
          "route": "#/packing-material/purchase-order-list-pm/purchase-order-list-pm",
          "type": "system",
          "badge": ""
        }
      ]
    }
  ]
};

function getInitialStudioState() {
  const saved = localStorage.getItem(STUDIO_STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.modulesConfig && parsed.modulesConfig.length >= 30) {
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse studio state', e);
    }
  }

  return {
    activeCompanyId: 'CMP-001',
    publishedVersion: 'v2.4.1',
    hasDraftChanges: true,
    draftChangesCount: 3,
    previewPersona: 'System Administrator',

    // 1. Companies & Processing Plants
    companies: [
      {
        id: 'CMP-001',
        code: 'DFL-IN',
        name: 'Devi Fisheries Limited',
        legalName: 'Devi Fisheries & Marine Products Ltd.',
        cin: 'L05005AP1997PLC027123',
        taxId: '37AABCD1234E1Z5',
        eiaNumber: 'EIA/AP/0458',
        fdaNumber: 'FDA-REG-10928374',
        bapNumber: 'BAP-P-4492-4STAR',
        country: 'India',
        currency: 'INR / USD',
        timezone: 'Asia/Kolkata (IST)',
        dateFormat: 'DD/MM/YYYY',
        contactEmail: 'purchase@devifisheries.com',
        contactPhone: '+91 891 256 7890',
        address: 'Harbour Road, Fishing Harbour, Visakhapatnam, AP 530001',
        status: 'Active',
        plants: ['Unit-1 VSP (Harbour)', 'Unit-2 Singarayakonda', 'Unit-3 Kakinada Port', 'Unit-4 PND', 'Unit-5 JPT', 'Unit-6 JPT-II']
      },
      {
        id: 'CMP-002',
        code: 'DSF-US',
        name: 'Devi Sea Foods Americas',
        legalName: 'Devi Sea Foods Americas Inc.',
        cin: 'DE-CORP-4892019',
        taxId: 'US-EIN-54-1892031',
        eiaNumber: 'N/A (Importing Entity)',
        fdaNumber: 'FDA-REG-US-99120',
        bapNumber: 'BAP-IMP-8821',
        country: 'United States',
        currency: 'USD ($)',
        timezone: 'America/New_York (EST)',
        dateFormat: 'MM/DD/YYYY',
        contactEmail: 'sales.us@deviseafoods.com',
        contactPhone: '+1 (732) 555-0199',
        address: 'Suite 400, 100 Wood Avenue South, Iselin, NJ 08830',
        status: 'Active',
        plants: ['Americas Hub NJ Coldstore', 'West Coast Staging Hub']
      },
      {
        id: 'CMP-003',
        code: 'CME-SG',
        name: 'Coastal Marine Exports',
        legalName: 'Coastal Marine Exports Pte. Ltd.',
        cin: 'UEN-201829104K',
        taxId: 'SG-GST-M90382910',
        eiaNumber: 'SFA-SG-2024-099',
        fdaNumber: 'FDA-AP-88402',
        bapNumber: 'BAP-P-5510',
        country: 'Singapore',
        currency: 'SGD / USD',
        timezone: 'Asia/Singapore (SGT)',
        dateFormat: 'YYYY-MM-DD',
        contactEmail: 'apac.trade@coastalmarine.sg',
        contactPhone: '+65 6789 0123',
        address: 'Marina Bay Financial Centre Tower 1, Singapore 018981',
        status: 'Active',
        plants: ['Singapore Trade Hub', 'Jurong Cold Chain Depot']
      }
    ],

    // 2. ERP Users
    users: [
      { id: 'ADM-001', name: 'Dr. Y.S. Prasad', email: 'ys.prasad@devifisheries.com', phone: '+91 98480 12345', companyId: 'CMP-001', companyName: 'Devi Fisheries Limited', role: 'System Administrator', plantAccess: ['All Plants'], status: 'Active', mfa: 'Enabled', lastLogin: 'Today, 09:45 AM' },
      { id: 'PRC-002', name: 'P. Rama Krishna', email: 'ramakrishna.p@devifisheries.com', phone: '+91 98481 67890', companyId: 'CMP-001', companyName: 'Devi Fisheries Limited', role: 'Procurement Officer', plantAccess: ['Unit-1 VSP (Harbour)', 'Unit-2 Singarayakonda'], status: 'Active', mfa: 'Enabled', lastLogin: 'Today, 08:30 AM' },
      { id: 'QCO-003', name: 'K. Venkateswara Rao', email: 'venkatesh.qc@devifisheries.com', phone: '+91 98482 11223', companyId: 'CMP-001', companyName: 'Devi Fisheries Limited', role: 'Quality Lab Inspector', plantAccess: ['Unit-1 VSP (Harbour)', 'Unit-3 Kakinada Port'], status: 'Active', mfa: 'Enabled', lastLogin: 'Yesterday, 05:15 PM' },
      { id: 'PRD-004', name: 'Ch. Srinivasa Raju', email: 'srinivas.prod@devifisheries.com', phone: '+91 98483 33445', companyId: 'CMP-001', companyName: 'Devi Fisheries Limited', role: 'Production Floor Manager', plantAccess: ['Unit-1 VSP (Harbour)'], status: 'Active', mfa: 'Enabled', lastLogin: 'Yesterday, 04:10 PM' },
      { id: 'CST-005', name: 'D. Rambabu', email: 'rambabu.cs@devifisheries.com', phone: '+91 98484 55667', companyId: 'CMP-001', companyName: 'Devi Fisheries Limited', role: 'Coldstore Keeper', plantAccess: ['Unit-1 VSP (Harbour)'], status: 'Active', mfa: 'Disabled', lastLogin: '07 Oct 2026' },
      { id: 'SLS-006', name: 'M. Sitarama Raju', email: 'sitaram.sales@devifisheries.com', phone: '+91 98485 77889', companyId: 'CMP-001', companyName: 'Devi Fisheries Limited', role: 'Sales & Exports Manager', plantAccess: ['All Plants'], status: 'Active', mfa: 'Enabled', lastLogin: 'Today, 10:15 AM' },
      { id: 'US-007', name: 'Michael Vance', email: 'm.vance@deviseafoods.com', phone: '+1 732 555 4410', companyId: 'CMP-002', companyName: 'Devi Sea Foods Americas', role: 'Sales & Exports Manager', plantAccess: ['Americas Hub NJ Coldstore'], status: 'Active', mfa: 'Enabled', lastLogin: 'Today, 07:15 PM' },
      { id: 'SG-008', name: 'Kelvin Tan', email: 'kelvin.tan@coastalmarine.sg', phone: '+65 9123 4567', companyId: 'CMP-003', companyName: 'Coastal Marine Exports', role: 'Coldstore Keeper', plantAccess: ['Singapore Trade Hub'], status: 'Active', mfa: 'Enabled', lastLogin: '06 Oct 2026' }
    ],

    // 3. Roles
    roles: [
      { id: 'ROLE-ADMIN', name: 'System Administrator', description: 'Complete system control, plant provisioning, ERP schema governance, and audit management.', isProtected: true, usersCount: 1 },
      { id: 'ROLE-PROCUREMENT', name: 'Procurement Officer', description: 'Raw material arrival entry, gate weighment, border count checks, and farmer billing.', isProtected: false, usersCount: 2 },
      { id: 'ROLE-QC', name: 'Quality Lab Inspector', description: 'Antibiotic residue testing (ELISA/LC-MS), organoleptic grading, and lot clearance.', isProtected: false, usersCount: 2 },
      { id: 'ROLE-PRODUCTION', name: 'Production Floor Manager', description: 'De-heading, peeling, soaking, batch freezing, floor balance, and yields.', isProtected: false, usersCount: 2 },
      { id: 'ROLE-COLDSTORE', name: 'Coldstore Keeper', description: 'Pallet inward intake, chamber storage allocation, physical count adjustments, and container dispatch.', isProtected: false, usersCount: 2 },
      { id: 'ROLE-SALES', name: 'Sales & Exports Manager', description: 'Overseas buyer contracts, shipping docs, anti-dumping audit compliance, and bank negotiations.', isProtected: false, usersCount: 2 }
    ],

    // 4. Authentic ERP Modules
    modulesConfig: DEFAULT_MODULES_CONFIG,

    // 5. Authentic ERP Submenus & Tabs
    submenusConfig: DEFAULT_SUBMENUS_CONFIG,

    // 6. Dynamic ERP Forms
    formsConfig: {
      'rm-purchase-inward': {
        name: 'Raw Material Purchase Inward Form',
        entity: 'Raw Material Lot',
        sections: [
          {
            id: 'sec-lot-info',
            title: 'Harvest & Supplier Details',
            fields: [
              { id: 'f_lot_no', key: 'lotNumber', label: 'Lot Number', type: 'text', placeholder: 'e.g. LOT-2026-00142', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'f_arrival_date', key: 'arrivalDate', label: 'Arrival Date', type: 'date', required: true, width: 'col-span-1', defaultValue: '2026-10-09' },
              { id: 'f_supplier', key: 'supplierId', label: 'Aquaculture Supplier / Farmer', type: 'dropdown', options: ['Godavari Coastal Aqua Farms (BVM)', 'Krishna Delta Prawn Harvesters (MCN)', 'Sagar Marine Hatcheries (KKD)', 'East Coast Aqua Society (VSP)'], required: true, width: 'col-span-1', defaultValue: 'Godavari Coastal Aqua Farms (BVM)' },
              { id: 'f_pond_location', key: 'pondLocation', label: 'Harvest Pond / Center', type: 'text', placeholder: 'e.g. Pond #4, Bhimavaram', required: true, width: 'col-span-1', defaultValue: '' }
            ]
          },
          {
            id: 'sec-species-weighment',
            title: 'Species, Grade & Weightment',
            fields: [
              { id: 'f_species', key: 'species', label: 'Species', type: 'dropdown', options: ['Vannamei Shrimp (Litopenaeus vannamei)', 'Black Tiger Shrimp (Penaeus monodon)', 'Asian Seabass (Barramundi)', 'Tilapia'], required: true, width: 'col-span-1', defaultValue: 'Vannamei Shrimp (Litopenaeus vannamei)' },
              { id: 'f_variety', key: 'variety', label: 'Initial Variety Condition', type: 'dropdown', options: ['Head-On Shell-On (HOSO)', 'Head-Less Shell-On (HLSO)', 'Whole Round Live'], required: true, width: 'col-span-1', defaultValue: 'Head-On Shell-On (HOSO)' },
              { id: 'f_gross_weight', key: 'grossWeightKg', label: 'Site Gross Weight (Kg)', type: 'number', placeholder: 'e.g. 5200', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'f_crate_tare', key: 'tareWeightKg', label: 'Total Crate Tare Weight (Kg)', type: 'number', placeholder: 'e.g. 350', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'f_border_count', key: 'sampleCountPcs', label: 'Border Count (Pcs/Kg)', type: 'number', placeholder: 'e.g. 42', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'f_temperature', key: 'intakeTempC', label: 'Arrival Temperature (°C)', type: 'number', placeholder: 'e.g. 2.5', required: true, width: 'col-span-1', defaultValue: '' }
            ]
          },
          {
            id: 'sec-logistics-cert',
            title: 'Vehicle & Statutory Traceability',
            fields: [
              { id: 'f_vehicle', key: 'vehicleNumber', label: 'Insulated Truck Vehicle No.', type: 'text', placeholder: 'e.g. AP 31 TT 4452', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'f_driver_name', key: 'driverName', label: 'Driver Name & Contact', type: 'text', placeholder: 'e.g. M. Appa Rao (+91 94401 22334)', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'f_caa_slip', key: 'caaCertificateUpload', label: 'CAA License / Passbook Upload', type: 'file', required: true, width: 'col-span-2', helpText: 'Max file size 5MB. Formats: PDF, JPG, PNG', defaultValue: '' }
            ]
          }
        ]
      },
      'proforma-order': {
        name: 'Proforma Invoice / Order Entry',
        entity: 'Proforma Order',
        sections: [
          {
            id: 'sec-pi-head',
            title: 'Order Header & Buyer',
            fields: [
              { id: 'pi_no', key: 'piNumber', label: 'Proforma Invoice No.', type: 'text', placeholder: 'e.g. PI-2026-EXP-1102', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'pi_date', key: 'piDate', label: 'Order Date', type: 'date', required: true, width: 'col-span-1', defaultValue: '2026-10-09' },
              { id: 'pi_buyer', key: 'buyerName', label: 'Overseas Buyer', type: 'dropdown', options: ['Sysco Corporation (USA)', 'Red Chamber Co. (USA)', 'Nippon Suisan Kaisha (Japan)', 'Carrefour Global Sourcing (EU)'], required: true, width: 'col-span-1', defaultValue: 'Sysco Corporation (USA)' },
              { id: 'pi_dest_port', key: 'destinationPort', label: 'Destination Port of Discharge', type: 'text', placeholder: 'e.g. Los Angeles (USLAX)', required: true, width: 'col-span-1', defaultValue: 'Los Angeles (USLAX)' }
            ]
          },
          {
            id: 'sec-pi-pricing',
            title: 'Packing Style & Price Book',
            fields: [
              { id: 'pi_variety', key: 'packedVariety', label: 'Finished Variety', type: 'dropdown', options: ['Head-Less Shell-On (HLSO) Block Frozen', 'Easy Peel (EZP) IQF', 'Peeled & Deveined Tail-On (PDTO) IQF', 'Butterfly Cut (BF) IQF'], required: true, width: 'col-span-1', defaultValue: 'Head-Less Shell-On (HLSO) Block Frozen' },
              { id: 'pi_grade', key: 'gradeCount', label: 'Contract Grade Count', type: 'dropdown', options: ['16/20 pcs/lb', '21/25 pcs/lb', '26/30 pcs/lb', '31/40 pcs/lb', '41/50 pcs/lb'], required: true, width: 'col-span-1', defaultValue: '26/30 pcs/lb' },
              { id: 'pi_qty_cartons', key: 'totalCartons', label: 'Quantity (Master Cartons)', type: 'number', placeholder: 'e.g. 1500', required: true, width: 'col-span-1', defaultValue: '1500' },
              { id: 'pi_price_usd', key: 'unitPriceUsd', label: 'Contract Price (USD / Kg)', type: 'number', placeholder: 'e.g. 8.45', required: true, width: 'col-span-1', defaultValue: '8.45' }
            ]
          }
        ]
      },
      'qc-lab-test': {
        name: 'QC Antibiotic & Lab Test Slip',
        entity: 'Quality Test Slip',
        sections: [
          {
            id: 'sec-qc-params',
            title: 'Antibiotic Residue Screening',
            fields: [
              { id: 'q_lot', key: 'targetLot', label: 'Target Raw Material Lot', type: 'text', placeholder: 'e.g. LOT-2026-00142', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'q_sample_code', key: 'sampleCode', label: 'Blind Sample Lab Code', type: 'text', placeholder: 'e.g. LAB-2026-SMP-882', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'q_chloramphenicol', key: 'chloramphenicolResult', label: 'Chloramphenicol (CAP)', type: 'radio', options: ['Negative (< 0.1 ppb)', 'Positive (Reject)'], required: true, width: 'col-span-1', defaultValue: 'Negative (< 0.1 ppb)' },
              { id: 'q_nitrofurans', key: 'nitrofuranResult', label: 'Nitrofuran Metabolites (AOZ/AMOZ)', type: 'radio', options: ['Negative (< 0.5 ppb)', 'Positive (Reject)'], required: true, width: 'col-span-1', defaultValue: 'Negative (< 0.5 ppb)' },
              { id: 'q_status', key: 'clearanceStatus', label: 'Lab Clearance Verdict', type: 'dropdown', options: ['CLEARED FOR EXPORT PROCESSING', 'REJECTED - ANTIBIOTIC CONTAMINATION', 'HOLD FOR RETEST'], required: true, width: 'col-span-2', defaultValue: 'CLEARED FOR EXPORT PROCESSING' }
            ]
          }
        ]
      },
      'production-batch': {
        name: 'Production Batch & Freezing Log',
        entity: 'Production Batch',
        sections: [
          {
            id: 'sec-prod-info',
            title: 'Batch & Freezer Parameters',
            fields: [
              { id: 'pr_batch_no', key: 'batchNo', label: 'Batch Run Number', type: 'text', placeholder: 'e.g. PRD-2026-B-089', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'pr_line', key: 'processingLine', label: 'Processing Line / Unit', type: 'dropdown', options: ['Line #1 IQF Freezing (Harbour)', 'Line #2 Plate Freezer (Harbour)', 'Line #3 Contact Freezing (Singarayakonda)', 'Line #4 Tunnel Freezer (Kakinada)'], required: true, width: 'col-span-1', defaultValue: 'Line #1 IQF Freezing (Harbour)' },
              { id: 'pr_in_weight', key: 'inputHeadonKg', label: 'Input Head-on Weight (Kg)', type: 'number', placeholder: 'e.g. 4500', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'pr_out_weight', key: 'finishedFrozenKg', label: 'Finished Frozen Weight (Kg)', type: 'number', placeholder: 'e.g. 3180', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'pr_glaze', key: 'glazePercent', label: 'Glaze Percentage (%)', type: 'number', placeholder: 'e.g. 10.0', required: true, width: 'col-span-1', defaultValue: '10' }
            ]
          }
        ]
      }
    },

    // 7. Audit & Logs
    auditLogs: [
      { id: 'AUD-8910', timestamp: 'Today, 09:12 AM', user: 'Dr. Y.S. Prasad', role: 'System Administrator', company: 'Devi Fisheries Limited', entity: 'Form Builder', action: 'Modified Schema', diff: 'Added mandatory CAA license document upload rule to RM Inward form.', status: 'Published' },
      { id: 'AUD-8909', timestamp: 'Today, 08:45 AM', user: 'Dr. Y.S. Prasad', role: 'System Administrator', company: 'Devi Fisheries Limited', entity: 'User Directory', action: 'Created User Account', diff: 'Registered Michael Vance (US-007) as Sales Manager for Devi Sea Foods Americas.', status: 'Published' },
      { id: 'AUD-8908', timestamp: 'Yesterday, 04:30 PM', user: 'Dr. Y.S. Prasad', role: 'System Administrator', company: 'Devi Fisheries Limited', entity: 'Module Studio', action: 'Updated Sidebar Order', diff: 'Arranged Raw Material Purchase as #1 and Quality Control as #3.', status: 'Published' },
      { id: 'AUD-8907', timestamp: '07 Oct 2026, 11:20 AM', user: 'Dr. Y.S. Prasad', role: 'System Administrator', company: 'Coastal Marine Exports', entity: 'Company Setup', action: 'Provisioned Entity', diff: 'Configured Singapore cold chain hub and SGD trade currency.', status: 'Published' },
      { id: 'AUD-8906', timestamp: '06 Oct 2026, 02:15 PM', user: 'Dr. Y.S. Prasad', role: 'System Administrator', company: 'Devi Fisheries Limited', entity: 'Roles & Permissions', action: 'Updated Matrix', diff: 'Granted Approval rights for Quality Lab Inspector on antibiotic clearance slips.', status: 'Published' }
    ],

    versionHistory: [
      { version: 'v2.4.1', date: '09 Oct 2026, 09:12 AM', publishedBy: 'Dr. Y.S. Prasad', note: 'Configured mandatory CAA farmer upload and updated line freezing parameters.', isCurrent: true },
      { version: 'v2.4.0', date: '07 Oct 2026, 05:00 PM', publishedBy: 'Dr. Y.S. Prasad', note: 'Provisioned Singapore trade hub and linked Coldstore inventory.', isCurrent: false },
      { version: 'v2.3.9', date: '04 Oct 2026, 10:30 AM', publishedBy: 'Dr. Y.S. Prasad', note: 'Optimized Antibiotic LC-MS screening workflow schema.', isCurrent: false },
      { version: 'v2.3.0', date: '01 Oct 2026, 09:00 AM', publishedBy: 'Dr. Y.S. Prasad', note: 'Seafood Processing & Coldstore ERP master configuration baseline.', isCurrent: false }
    ]
  };
}

export const SetupView = {
  state: getInitialStudioState(),
  activeTab: 'company-setup',
  selectedRoleForMatrix: 'ROLE-PROCUREMENT',
  selectedModuleForSubmenuStudio: 'purchase',
  selectedFormForBuilder: 'rm-purchase-inward',
  moduleFilterTerm: '',
  submenuFilterTerm: '',

  saveState() {
    try {
      localStorage.setItem(STUDIO_STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save studio state', e);
    }
  },

  render(containerId, subPage = 'company-setup', activeHash = '#/setup/client-master-setup/company-setup') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div id="setup-tab-bar-container"></div>
      <div id="setup-subpage-content" class="mt-4"></div>
    `;

    const tabContext = TabBar.render('setup-tab-bar-container', activeHash);
    const subContainer = document.getElementById('setup-subpage-content');

    const clean = (activeHash || '').replace(/^#\/?/, '').replace(/^\/+/, '');
    const parts = clean.split('/');
    let tabId = 'company-setup';
    if (parts[1] === 'client-master-setup') {
      tabId = parts[2] || subPage || 'company-setup';
    } else if (parts[1]) {
      tabId = parts[2] || parts[1] || subPage || 'company-setup';
    } else {
      tabId = subPage || 'company-setup';
    }
    this.activeTab = tabId;

    this.renderClientMasterStudio(subContainer, tabId);
  },

  renderClientMasterStudio(container, tabId) {
    const activeCompany = this.state.companies.find(c => c.id === this.state.activeCompanyId) || this.state.companies[0];

    container.innerHTML = `
      <div class="space-y-4">
        <!-- Top Multi-Tenant Context Toolbar -->
        <div class="bg-white border border-[#DFE1E6] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-none">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center font-bold text-xs">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs font-semibold text-[#5E6C84]">Scope:</span>
              <span class="text-xs font-bold text-[#172B4D]">${activeCompany.name}</span>
              <span class="lozenge lozenge-success text-[10px]">${activeCompany.status}</span>
              <span class="lozenge lozenge-default text-[10px] font-mono">${activeCompany.code}</span>
              <span class="text-xs text-[#5E6C84]">(${activeCompany.plants.length} Processing Plants)</span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <select id="company-scope-switcher" class="px-2.5 py-1 border border-[#DFE1E6] rounded-lg text-xs font-bold text-[#172B4D] bg-white cursor-pointer hover:border-[#0369A1] focus:outline-none">
              ${this.state.companies.map(c => `
                <option value="${c.id}" ${c.id === this.state.activeCompanyId ? 'selected' : ''}>${c.name}</option>
              `).join('')}
            </select>

            ${this.state.hasDraftChanges ? `
              <span class="lozenge lozenge-warning text-[10px] font-semibold">${this.state.draftChangesCount} Drafts</span>
              <button id="btn-quick-publish" class="px-2.5 py-1 bg-[#0369A1] hover:bg-[#075985] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer">
                Publish Live
              </button>
            ` : `
              <span class="lozenge lozenge-success text-[10px] font-semibold">${this.state.publishedVersion} Live</span>
            `}
          </div>
        </div>

        <!-- Studio Tab Content Container -->
        <div id="studio-active-tab-container"></div>
      </div>
    `;

    const switcher = document.getElementById('company-scope-switcher');
    if (switcher) {
      switcher.onchange = (e) => {
        this.state.activeCompanyId = e.target.value;
        this.saveState();
        Toast.show(`Switched scope to: ${this.state.companies.find(c => c.id === e.target.value)?.name}`, 'info', 'Scope Switched');
        this.renderClientMasterStudio(container, tabId);
      };
    }

    const quickPublishBtn = document.getElementById('btn-quick-publish');
    if (quickPublishBtn) {
      quickPublishBtn.onclick = () => this.handlePublishConfiguration();
    }

    const tabContainer = document.getElementById('studio-active-tab-container');
    switch (tabId) {
      case 'company-setup':
        this.renderCompanySetupTab(tabContainer);
        break;
      case 'user-management':
        this.renderUserManagementTab(tabContainer);
        break;
      case 'roles-permissions':
        this.renderRolesPermissionsTab(tabContainer);
        break;
      case 'module-studio':
        this.renderModuleStudioTab(tabContainer);
        break;
      case 'submenu-tab-studio':
        this.renderSubmenuTabStudioTab(tabContainer);
        break;
      case 'field-form-builder':
        this.renderFieldFormBuilderTab(tabContainer);
        break;
      case 'audit-logs':
        this.renderAuditLogsTab(tabContainer);
        break;
      default:
        this.renderCompanySetupTab(tabContainer);
        break;
    }
  },

  // =========================================================================
  // 1. COMPANY SETUP TAB (Fisheries & Plants)
  // =========================================================================
  renderCompanySetupTab(container) {
    const totalCompanies = this.state.companies.length;
    const totalPlants = this.state.companies.reduce((acc, c) => acc + c.plants.length, 0);

    container.innerHTML = `
      <div class="space-y-4">
        <!-- Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] shadow-none overflow-hidden">
          <div class="p-3 border-b border-[#EBECF0] flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-[#172B4D]">Companies & Processing Plants Registry</span>
              <span class="lozenge lozenge-inprogress text-[10px]">${this.state.companies.length} Records</span>
            </div>
            <div class="flex items-center gap-2">
              <button id="cmp-copy-btn" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] cursor-pointer">Copy</button>
              <button id="cmp-excel-btn" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] cursor-pointer">Excel</button>
              <button id="btn-add-company" class="btn-primary px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                <span>+ Add Company</span>
              </button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="erp-table text-xs w-full">
              <thead>
                <tr>
                  <th class="w-20">Code</th>
                  <th>Company Trade Name</th>
                  <th>Legal Entity & Licences</th>
                  <th>Jurisdiction</th>
                  <th>Assigned Processing Plants</th>
                  <th>Status</th>
                  <th class="text-center w-28">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#EBECF0]">
                ${this.state.companies.map(c => `
                  <tr class="hover:bg-[#FAFBFC]">
                    <td class="font-bold text-[#17191c] font-mono">${c.code}</td>
                    <td>
                      <div class="font-bold text-[#172B4D]">${c.name}</div>
                      <div class="text-[11px] text-[#5E6C84]">${c.contactEmail} • ${c.contactPhone}</div>
                    </td>
                    <td>
                      <div class="font-medium text-[#172B4D]">${c.legalName}</div>
                      <div class="text-[11px] font-mono text-[#5E6C84]">${c.eiaNumber} • ${c.fdaNumber}</div>
                    </td>
                    <td>
                      <span class="font-medium">${c.country}</span>
                      <span class="text-[#5E6C84] text-[11px]">(${c.currency})</span>
                    </td>
                    <td>
                      <div class="flex flex-wrap gap-1">
                        ${c.plants.map(p => `<span class="lozenge lozenge-default text-[9.5px]">${p}</span>`).join('')}
                      </div>
                    </td>
                    <td>
                      <span class="lozenge ${c.status === 'Active' ? 'lozenge-success' : 'lozenge-danger'} text-[10px]">${c.status}</span>
                    </td>
                    <td class="text-center">
                      <div class="flex items-center justify-center gap-1">
                        <button data-action="edit-company" data-id="${c.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#0369A1] cursor-pointer" title="Edit Company">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </button>
                        <button data-action="toggle-company-status" data-id="${c.id}" class="p-1 hover:bg-[#EBECF0] rounded ${c.status === 'Active' ? 'text-[#BF2600]' : 'text-[#006644]'} cursor-pointer" title="Toggle Status">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.querySelectorAll('[data-action="edit-company"]').forEach(btn => {
      btn.onclick = () => {
        const comp = this.state.companies.find(c => c.id === btn.dataset.id);
        if (comp) this.showEditCompanyModal(comp);
      };
    });

    document.querySelectorAll('[data-action="toggle-company-status"]').forEach(btn => {
      btn.onclick = () => {
        const comp = this.state.companies.find(c => c.id === btn.dataset.id);
        if (comp) {
          comp.status = comp.status === 'Active' ? 'Inactive' : 'Active';
          this.logAudit('Company Setup', `Toggled status for ${comp.name} to ${comp.status}`);
          this.saveState();
          Toast.show(`Company ${comp.name} is now ${comp.status}`, 'success', 'Status Updated');
          this.renderCompanySetupTab(container);
        }
      };
    });

    const addBtn = document.getElementById('btn-add-company');
    if (addBtn) addBtn.onclick = () => this.showAddCompanyModal();

    const copyBtn = document.getElementById('cmp-copy-btn');
    if (copyBtn) {
      copyBtn.onclick = () => Toast.show('Company Registry copied to clipboard', 'info', 'Clipboard Export');
    }

    const excelBtn = document.getElementById('cmp-excel-btn');
    if (excelBtn) {
      excelBtn.onclick = () => Toast.show('Generating Devi_Fisheries_Companies.xlsx...', 'success', 'Excel Export Ready');
    }
  },

  showAddCompanyModal() {
    this.showCompanyFormModal({
      id: `CMP-00${this.state.companies.length + 1}`,
      code: '',
      name: '',
      legalName: '',
      cin: '',
      taxId: '',
      eiaNumber: '',
      fdaNumber: '',
      bapNumber: '',
      country: 'India',
      currency: 'INR / USD',
      timezone: 'Asia/Kolkata (IST)',
      dateFormat: 'DD/MM/YYYY',
      contactEmail: '',
      contactPhone: '',
      address: '',
      status: 'Active',
      plants: ['Unit-1 VSP (Harbour)']
    }, false);
  },

  showEditCompanyModal(company) {
    this.showCompanyFormModal(company, true);
  },

  showCompanyFormModal(company, isEdit = false) {
    const modalContent = `
      <form id="company-form" class="space-y-3 text-xs">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Company Trade Name *</label>
            <input type="text" id="cmp-name" required value="${company.name}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0369A1]" placeholder="e.g. Devi Fisheries Limited" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Company Code *</label>
            <input type="text" id="cmp-code" required value="${company.code}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0369A1] font-mono" placeholder="e.g. DFL-IN" />
          </div>
        </div>

        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Legal Entity Name *</label>
          <input type="text" id="cmp-legal-name" required value="${company.legalName}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0369A1]" />
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">EIA Approval No.</label>
            <input type="text" id="cmp-eia" value="${company.eiaNumber || ''}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg font-mono" placeholder="EIA/AP/0458" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">US FDA Reg No.</label>
            <input type="text" id="cmp-fda" value="${company.fdaNumber || ''}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg font-mono" placeholder="FDA-REG-10928374" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">BAP 4-Star License</label>
            <input type="text" id="cmp-bap" value="${company.bapNumber || ''}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg font-mono" placeholder="BAP-P-4492" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Jurisdiction / Country</label>
            <input type="text" id="cmp-country" value="${company.country}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Currency</label>
            <input type="text" id="cmp-currency" value="${company.currency}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" />
          </div>
        </div>

        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Processing Plants (Comma-separated)</label>
          <input type="text" id="cmp-plants" value="${company.plants.join(', ')}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="Unit-1 VSP, Unit-2 Singarayakonda" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Contact Email</label>
            <input type="email" id="cmp-email" value="${company.contactEmail}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Phone</label>
            <input type="text" id="cmp-phone" value="${company.contactPhone}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" />
          </div>
        </div>

        <div class="flex items-center justify-end gap-2 pt-3 border-t border-[#EBECF0]">
          <button type="button" id="modal-cmp-cancel" class="px-3.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs font-semibold text-[#42526E] hover:bg-[#FAFBFC] cursor-pointer">Cancel</button>
          <button type="submit" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">${isEdit ? 'Save Changes' : 'Create Company'}</button>
        </div>
      </form>
    `;

    Modal.show(isEdit ? `Edit Company: ${company.name}` : 'Add Processing Entity', modalContent);

    document.getElementById('modal-cmp-cancel').onclick = () => Modal.close();

    document.getElementById('company-form').onsubmit = (e) => {
      e.preventDefault();
      company.name = document.getElementById('cmp-name').value.trim();
      company.code = document.getElementById('cmp-code').value.trim().toUpperCase();
      company.legalName = document.getElementById('cmp-legal-name').value.trim();
      company.eiaNumber = document.getElementById('cmp-eia').value.trim();
      company.fdaNumber = document.getElementById('cmp-fda').value.trim();
      company.bapNumber = document.getElementById('cmp-bap').value.trim();
      company.country = document.getElementById('cmp-country').value.trim();
      company.currency = document.getElementById('cmp-currency').value.trim();
      company.contactEmail = document.getElementById('cmp-email').value.trim();
      company.contactPhone = document.getElementById('cmp-phone').value.trim();
      const rawPlants = document.getElementById('cmp-plants').value;
      company.plants = rawPlants ? rawPlants.split(',').map(p => p.trim()).filter(Boolean) : ['Unit-1 VSP'];

      if (!isEdit) {
        this.state.companies.push(company);
        this.logAudit('Company Setup', `Added company: ${company.name} (${company.code})`);
      } else {
        this.logAudit('Company Setup', `Updated company: ${company.name}`);
      }

      this.saveState();
      Modal.close();
      Toast.show(isEdit ? `Company ${company.name} updated` : `Company ${company.name} created`, 'success', 'Saved');
      const c = document.getElementById('setup-subpage-content');
      if (c) this.renderClientMasterStudio(c, 'company-setup');
    };
  },

  // =========================================================================
  // 2. USER MANAGEMENT TAB (ERP Users & Personas)
  // =========================================================================
  renderUserManagementTab(container) {
    const activeCompId = this.state.activeCompanyId;
    const scopedUsers = this.state.users.filter(u => u.companyId === activeCompId);

    container.innerHTML = `
      <div class="space-y-4">
        <!-- Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] shadow-none overflow-hidden">
          <div class="p-3 border-b border-[#EBECF0] flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-[#172B4D]">ERP User Directory</span>
              <span class="lozenge lozenge-inprogress text-[10px]">${scopedUsers.length} Records</span>
            </div>
            <div class="flex items-center gap-2">
              <button id="usr-copy-btn" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] cursor-pointer">Copy</button>
              <button id="usr-excel-btn" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] cursor-pointer">Excel</button>
              <button id="btn-add-user" class="btn-primary px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                <span>+ Register ERP User</span>
              </button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="erp-table text-xs w-full">
              <thead>
                <tr>
                  <th class="w-20">User ID</th>
                  <th>Full Name & Contact</th>
                  <th>ERP Persona / Role</th>
                  <th>Plant & Facility Access</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th class="text-center w-28">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#EBECF0]">
                ${scopedUsers.map(u => `
                  <tr class="hover:bg-[#FAFBFC]">
                    <td class="font-bold text-[#17191c] font-mono">${u.id}</td>
                    <td>
                      <div class="font-bold text-[#172B4D]">${u.name}</div>
                      <div class="text-[11px] text-[#5E6C84]">${u.email} • ${u.phone}</div>
                    </td>
                    <td>
                      <span class="lozenge ${u.role === 'System Administrator' ? 'lozenge-inprogress' : u.role === 'Quality Lab Inspector' ? 'lozenge-success' : u.role === 'Production Floor Manager' ? 'lozenge-purple' : 'lozenge-default'} text-[10px]">
                        ${u.role}
                      </span>
                    </td>
                    <td>
                      <div class="flex flex-wrap gap-1">
                        ${u.plantAccess.map(p => `<span class="lozenge lozenge-default text-[9.5px]">${p}</span>`).join('')}
                      </div>
                    </td>
                    <td>
                      <span class="lozenge ${u.status === 'Active' ? 'lozenge-success' : 'lozenge-danger'} text-[10px]">${u.status}</span>
                    </td>
                    <td class="text-[#5E6C84] text-[11px]">${u.lastLogin}</td>
                    <td class="text-center">
                      <div class="flex items-center justify-center gap-1">
                        <button data-action="edit-user" data-id="${u.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#0369A1] cursor-pointer" title="Edit User">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </button>
                        <button data-action="reset-pwd" data-id="${u.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#42526E] cursor-pointer" title="Reset Password">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
                        </button>
                        <button data-action="toggle-user-status" data-id="${u.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#BF2600] cursor-pointer" title="Toggle Status">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.querySelectorAll('[data-action="edit-user"]').forEach(btn => {
      btn.onclick = () => {
        const u = this.state.users.find(x => x.id === btn.dataset.id);
        if (u) this.showEditUserModal(u);
      };
    });

    document.querySelectorAll('[data-action="reset-pwd"]').forEach(btn => {
      btn.onclick = () => {
        const u = this.state.users.find(x => x.id === btn.dataset.id);
        if (u) {
          Toast.show(`Password reset link dispatched to ${u.email}`, 'info', 'Password Reset Dispatched');
          this.logAudit('User Setup', `Generated password reset link for ${u.name}`);
        }
      };
    });

    document.querySelectorAll('[data-action="toggle-user-status"]').forEach(btn => {
      btn.onclick = () => {
        const u = this.state.users.find(x => x.id === btn.dataset.id);
        if (u) {
          u.status = u.status === 'Active' ? 'Suspended' : 'Active';
          this.logAudit('User Setup', `Changed user status of ${u.name} to ${u.status}`);
          this.saveState();
          Toast.show(`User ${u.name} is now ${u.status}`, 'success', 'Status Updated');
          this.renderUserManagementTab(container);
        }
      };
    });

    const addBtn = document.getElementById('btn-add-user');
    if (addBtn) addBtn.onclick = () => this.showAddUserModal();

    const copyBtn = document.getElementById('usr-copy-btn');
    if (copyBtn) copyBtn.onclick = () => Toast.show('User Directory copied to clipboard', 'info', 'Clipboard Export');

    const excelBtn = document.getElementById('usr-excel-btn');
    if (excelBtn) excelBtn.onclick = () => Toast.show('Generating Devi_Fisheries_Users.xlsx...', 'success', 'Excel Export Ready');
  },

  showAddUserModal() {
    this.showUserFormModal({
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      email: '',
      phone: '',
      companyId: this.state.activeCompanyId,
      companyName: this.state.companies.find(c => c.id === this.state.activeCompanyId)?.name || 'Devi Fisheries Limited',
      role: 'Procurement Officer',
      status: 'Active',
      mfa: 'Enabled',
      plantAccess: ['Unit-1 VSP (Harbour)'],
      lastLogin: 'Never'
    }, false);
  },

  showEditUserModal(user) {
    this.showUserFormModal(user, true);
  },

  showUserFormModal(user, isEdit = false) {
    const modalContent = `
      <form id="user-form" class="space-y-3 text-xs">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Full Name *</label>
            <input type="text" id="usr-name" required value="${user.name}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0369A1]" placeholder="e.g. Ramesh Varma" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Corporate Email *</label>
            <input type="email" id="usr-email" required value="${user.email}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0369A1]" placeholder="ramesh@devifisheries.com" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Mobile Phone</label>
            <input type="text" id="usr-phone" value="${user.phone}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="+91 98480 00000" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">ERP Persona / Role *</label>
            <select id="usr-role" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg">
              ${this.state.roles.map(r => `
                <option value="${r.name}" ${r.name === user.role ? 'selected' : ''}>${r.name}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Plant Access (Comma-separated)</label>
          <input type="text" id="usr-plants" value="${user.plantAccess.join(', ')}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="Unit-1 VSP (Harbour), Unit-2 Singarayakonda" />
        </div>

        <div class="flex items-center justify-end gap-2 pt-3 border-t border-[#EBECF0]">
          <button type="button" id="modal-usr-cancel" class="px-3.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs font-semibold text-[#42526E] hover:bg-[#FAFBFC] cursor-pointer">Cancel</button>
          <button type="submit" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">${isEdit ? 'Save User' : 'Register User'}</button>
        </div>
      </form>
    `;

    Modal.show(isEdit ? `Edit User: ${user.name}` : 'Register New ERP User', modalContent);

    document.getElementById('modal-usr-cancel').onclick = () => Modal.close();

    document.getElementById('user-form').onsubmit = (e) => {
      e.preventDefault();
      user.name = document.getElementById('usr-name').value.trim();
      user.email = document.getElementById('usr-email').value.trim();
      user.phone = document.getElementById('usr-phone').value.trim();
      user.role = document.getElementById('usr-role').value;
      const rawPlants = document.getElementById('usr-plants').value;
      user.plantAccess = rawPlants ? rawPlants.split(',').map(p => p.trim()).filter(Boolean) : ['Unit-1 VSP (Harbour)'];

      if (!isEdit) {
        this.state.users.push(user);
        this.logAudit('User Setup', `Registered user: ${user.name} (${user.email})`);
      } else {
        this.logAudit('User Setup', `Updated user: ${user.name}`);
      }

      this.saveState();
      Modal.close();
      Toast.show(isEdit ? `User ${user.name} updated` : `User ${user.name} registered`, 'success', 'Saved');
      const c = document.getElementById('setup-subpage-content');
      if (c) this.renderClientMasterStudio(c, 'user-management');
    };
  },

  // =========================================================================
  // 3. ROLES & PERMISSIONS MATRIX TAB
  // =========================================================================
  renderRolesPermissionsTab(container) {
    const selectedRole = this.state.roles.find(r => r.id === this.selectedRoleForMatrix) || this.state.roles[0];
    const isAdmin = selectedRole.id === 'ROLE-ADMIN';

    const erpModulesList = [
      { id: 'res-purchase', label: 'Raw Material Purchase (Arrivals, Weighment, Rates, Farmer Bills)' },
      { id: 'res-preprocessing', label: 'Pre-Processing (De-heading, Peeling, Soaking, Grading)' },
      { id: 'res-quality', label: 'Quality Control (Antibiotic Lab, Testing Protocols, Clearance)' },
      { id: 'res-production', label: 'Production Control (Floor Balance, Freezing, Conversion)' },
      { id: 'res-coldstore', label: 'Coldstore Operations (Intake, Chambers, Pallet Balance, Dispatch)' },
      { id: 'res-inventory', label: 'Inventory & Stores (Purchase Orders, GRN Receipt, Issues)' },
      { id: 'res-sales', label: 'Sales & Exports (Contracts, Shipping Documentation, Finance)' },
      { id: 'res-reports', label: 'Reports & Analytics (Yield Reports, Production BI, Valuation)' },
      { id: 'res-setup', label: 'Settings & Master Data (Plants, Species, Grades, Form Schemas)' }
    ];

    container.innerHTML = `
      <div class="space-y-4">
        <!-- Permissions Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] shadow-none overflow-hidden">
          <div class="p-3 border-b border-[#EBECF0] flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-[#172B4D]">Permissions Matrix for:</span>
              <select id="role-matrix-selector" class="px-2.5 py-1 border border-[#DFE1E6] rounded-lg text-xs font-bold text-[#172B4D] bg-white cursor-pointer hover:border-[#0369A1] focus:outline-none">
                ${this.state.roles.map(r => `
                  <option value="${r.id}" ${r.id === selectedRole.id ? 'selected' : ''}>${r.name} ${r.isProtected ? '(🔒 Protected)' : `(${r.usersCount} Users)`}</option>
                `).join('')}
              </select>
              ${isAdmin ? `<span class="lozenge lozenge-inprogress text-[10px]">Full Access Locked</span>` : ''}
            </div>

            <div class="flex items-center gap-2">
              ${!isAdmin ? `
                <button id="btn-perm-grant-all" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#006644] cursor-pointer">Grant All</button>
                <button id="btn-perm-readonly" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] cursor-pointer">Read Only</button>
              ` : ''}
              <button id="btn-save-permissions" class="btn-primary px-3 py-1 rounded text-xs font-bold cursor-pointer">Save Permissions</button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="erp-table text-xs w-full">
              <thead>
                <tr>
                  <th>ERP Module / Entity</th>
                  <th class="text-center w-16">View</th>
                  <th class="text-center w-16">Create</th>
                  <th class="text-center w-16">Edit</th>
                  <th class="text-center w-16">Delete</th>
                  <th class="text-center w-16">Approve</th>
                  <th class="text-center w-16">Reject</th>
                  <th class="text-center w-16">Export</th>
                  <th class="text-center w-16">Print</th>
                  <th class="text-center w-16">Manage</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#EBECF0]">
                ${erpModulesList.map(res => {
                  const checkedAttr = isAdmin ? 'checked disabled' : 'checked';
                  return `
                    <tr class="hover:bg-[#FAFBFC]">
                      <td class="font-bold text-[#172B4D]">${res.label}</td>
                      <td class="text-center"><input type="checkbox" class="perm-chk perm-view" ${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" ${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" ${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" ${isAdmin ? 'checked disabled' : ''} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" ${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" ${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" ${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" ${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" ${isAdmin ? 'checked disabled' : ''} /></td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const roleSelector = document.getElementById('role-matrix-selector');
    if (roleSelector) {
      roleSelector.onchange = (e) => {
        this.selectedRoleForMatrix = e.target.value;
        this.renderRolesPermissionsTab(container);
      };
    }

    const grantAllBtn = document.getElementById('btn-perm-grant-all');
    if (grantAllBtn) {
      grantAllBtn.onclick = () => {
        document.querySelectorAll('.perm-chk:not([disabled])').forEach(cb => cb.checked = true);
        Toast.show(`Granted full access for ${selectedRole.name}`, 'info', 'Preset Applied');
      };
    }

    const readOnlyBtn = document.getElementById('btn-perm-readonly');
    if (readOnlyBtn) {
      readOnlyBtn.onclick = () => {
        document.querySelectorAll('.perm-chk:not([disabled])').forEach(cb => cb.checked = false);
        document.querySelectorAll('.perm-view:not([disabled])').forEach(cb => cb.checked = true);
        Toast.show(`Set Read-Only access for ${selectedRole.name}`, 'info', 'Preset Applied');
      };
    }

    const saveBtn = document.getElementById('btn-save-permissions');
    if (saveBtn) {
      saveBtn.onclick = () => {
        this.logAudit('Roles & Permissions', `Updated permissions matrix for ${selectedRole.name}`);
        this.state.hasDraftChanges = true;
        this.state.draftChangesCount++;
        this.saveState();
        Toast.show(`Permissions saved for ${selectedRole.name}`, 'success', 'Saved');
      };
    }
  },

  // =========================================================================
  // 4. DYNAMIC MODULE STUDIO TAB (33 Modules)
  // =========================================================================
  renderModuleStudioTab(container) {
    const filter = (this.moduleFilterTerm || '').toLowerCase();
    const modules = this.state.modulesConfig.filter(m => !filter || m.label.toLowerCase().includes(filter) || m.key.toLowerCase().includes(filter));

    container.innerHTML = `
      <div class="space-y-4">
        <div class="bg-white rounded-xl border border-[#DFE1E6] shadow-none overflow-hidden">
          <div class="p-3 border-b border-[#EBECF0] flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-[#172B4D]">Dynamic ERP Navigation & Module Studio</span>
              <span class="lozenge lozenge-inprogress text-[10px]">${this.state.modulesConfig.length} Modules</span>
            </div>
            <div class="flex items-center gap-2">
              <input type="text" id="mod-search-input" value="${this.moduleFilterTerm || ''}" placeholder="Filter modules..." class="px-2.5 py-1 border border-[#DFE1E6] rounded text-xs w-48 focus:outline-none focus:border-[#0369A1]" />
              <button id="btn-save-modules-config" class="btn-primary px-3 py-1 rounded text-xs font-bold cursor-pointer">
                Save Module Order & Labels
              </button>
            </div>
          </div>

          <div class="overflow-x-auto max-h-[640px]">
            <table class="erp-table text-xs w-full">
              <thead class="sticky top-0 bg-[#FAFBFC] z-10">
                <tr>
                  <th class="w-16 text-center">Order</th>
                  <th>Module Display Label</th>
                  <th>Module Key</th>
                  <th>Submenus</th>
                  <th>Sidebar Visibility</th>
                  <th>Authorized Personas</th>
                  <th>Landing Route</th>
                  <th class="text-center w-20">Move</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#EBECF0]">
                ${modules.map((m, idx) => `
                  <tr class="hover:bg-[#FAFBFC]">
                    <td class="text-center font-bold text-[#5E6C84]">${m.order}</td>
                    <td>
                      <input type="text" data-module-id="${m.id}" class="module-label-input font-bold text-[#172B4D] border border-transparent hover:border-[#DFE1E6] focus:border-[#0369A1] focus:bg-white rounded px-2 py-1 w-56 text-xs" value="${m.label}" />
                    </td>
                    <td class="font-mono text-[11px] text-[#5E6C84]">${m.key}</td>
                    <td>
                      <span class="lozenge lozenge-default text-[9.5px] font-mono">${m.submenusCount || 0} Submenus</span>
                    </td>
                    <td>
                      <label class="inline-flex items-center gap-1.5 cursor-pointer text-xs">
                        <input type="checkbox" data-mod-toggle="${m.id}" ${m.visible ? 'checked' : ''} class="rounded text-[#0369A1]" />
                        <span>${m.visible ? 'Visible' : 'Hidden'}</span>
                      </label>
                    </td>
                    <td>
                      <div class="flex flex-wrap gap-1 max-w-xs">
                        ${m.roles.slice(0, 2).map(r => `<span class="lozenge lozenge-default text-[9px]">${r}</span>`).join('')}
                        ${m.roles.length > 2 ? `<span class="lozenge lozenge-default text-[9px]">+${m.roles.length - 2}</span>` : ''}
                      </div>
                    </td>
                    <td class="font-mono text-[11px] text-[#0369A1] truncate max-w-[140px]">${m.route}</td>
                    <td class="text-center">
                      <div class="flex items-center justify-center gap-1">
                        <button data-action="move-up" data-index="${idx}" class="p-1 hover:bg-[#EBECF0] rounded text-[#42526E] cursor-pointer" ${idx === 0 ? 'disabled opacity-30' : ''} title="Move Up">▲</button>
                        <button data-action="move-down" data-index="${idx}" class="p-1 hover:bg-[#EBECF0] rounded text-[#42526E] cursor-pointer" ${idx === modules.length - 1 ? 'disabled opacity-30' : ''} title="Move Down">▼</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const searchInp = document.getElementById('mod-search-input');
    if (searchInp) {
      searchInp.oninput = (e) => {
        this.moduleFilterTerm = e.target.value;
        this.renderModuleStudioTab(container);
      };
    }

    document.querySelectorAll('[data-action="move-up"]').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.index);
        if (idx > 0) {
          const temp = this.state.modulesConfig[idx];
          this.state.modulesConfig[idx] = this.state.modulesConfig[idx - 1];
          this.state.modulesConfig[idx - 1] = temp;
          this.state.modulesConfig.forEach((m, i) => m.order = i + 1);
          this.renderModuleStudioTab(container);
        }
      };
    });

    document.querySelectorAll('[data-action="move-down"]').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.index);
        if (idx < this.state.modulesConfig.length - 1) {
          const temp = this.state.modulesConfig[idx];
          this.state.modulesConfig[idx] = this.state.modulesConfig[idx + 1];
          this.state.modulesConfig[idx + 1] = temp;
          this.state.modulesConfig.forEach((m, i) => m.order = i + 1);
          this.renderModuleStudioTab(container);
        }
      };
    });

    document.querySelectorAll('[data-mod-toggle]').forEach(cb => {
      cb.onchange = (e) => {
        const m = this.state.modulesConfig.find(x => x.id === cb.dataset.modToggle);
        if (m) m.visible = e.target.checked;
      };
    });

    const saveBtn = document.getElementById('btn-save-modules-config');
    if (saveBtn) {
      saveBtn.onclick = () => {
        document.querySelectorAll('.module-label-input').forEach(inp => {
          const mod = this.state.modulesConfig.find(m => m.id === inp.dataset.moduleId);
          if (mod) mod.label = inp.value.trim();
        });
        this.logAudit('Module Studio', 'Updated ERP module labels and order');
        this.state.hasDraftChanges = true;
        this.state.draftChangesCount++;
        this.saveState();
        Toast.show('Module configuration saved', 'success', 'Saved');
      };
    }
  },

  // =========================================================================
  // 5. DYNAMIC SUBMENU & TAB STUDIO TAB (All 33 Modules & 261 Submenus)
  // =========================================================================
  renderSubmenuTabStudioTab(container) {
    const selectedModKey = this.selectedModuleForSubmenuStudio || 'purchase';
    const submenus = this.state.submenusConfig[selectedModKey] || [];
    const filter = (this.submenuFilterTerm || '').toLowerCase();
    const filteredSubmenus = submenus.filter(sm => !filter || sm.title.toLowerCase().includes(filter) || sm.tabs.some(t => t.label.toLowerCase().includes(filter)));

    container.innerHTML = `
      <div class="space-y-4">
        <!-- Module Dropdown and Actions -->
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-[#172B4D]">Parent ERP Module:</span>
            <select id="studio-mod-select" class="px-2.5 py-1 border border-[#DFE1E6] rounded-lg text-xs font-bold text-[#172B4D] bg-white cursor-pointer max-w-xs truncate">
              ${this.state.modulesConfig.map(m => `
                <option value="${m.id}" ${m.id === selectedModKey ? 'selected' : ''}>${m.label} (${(this.state.submenusConfig[m.id] || []).length} Submenus)</option>
              `).join('')}
            </select>
            <input type="text" id="sm-search-input" value="${this.submenuFilterTerm || ''}" placeholder="Filter submenus..." class="px-2.5 py-1 border border-[#DFE1E6] rounded text-xs w-44 focus:outline-none focus:border-[#0369A1]" />
          </div>
          <button id="btn-add-submenu" class="btn-primary px-3 py-1 rounded text-xs font-bold flex items-center gap-1 cursor-pointer">
            <span>+ Add Submenu</span>
          </button>
        </div>

        <!-- Submenus & Tabs List -->
        <div class="space-y-3 max-h-[640px] overflow-y-auto pr-1">
          ${filteredSubmenus.length === 0 ? `
            <div class="bg-white rounded-xl border border-[#DFE1E6] p-6 text-center text-xs text-[#5E6C84]">
              No submenus matched filter. Click "+ Add Submenu" to create one.
            </div>
          ` : filteredSubmenus.map(sm => `
            <div class="bg-white rounded-xl border border-[#DFE1E6] shadow-none p-3">
              <div class="flex items-center justify-between pb-2 mb-2 border-b border-[#EBECF0]">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-xs text-[#172B4D]">${sm.title}</span>
                  <span class="font-mono text-[10px] text-[#5E6C84]">(${sm.id})</span>
                  <span class="lozenge lozenge-default text-[9.5px]">${sm.tabs.length} Tabs</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <button data-action="add-tab" data-sm-id="${sm.id}" class="px-2 py-0.5 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-[11px] font-bold text-[#0369A1] cursor-pointer">
                    + Add Tab
                  </button>
                  <button data-action="del-sm" data-sm-id="${sm.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#BF2600] cursor-pointer" title="Delete Submenu">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </div>

              <div class="overflow-x-auto">
                <table class="erp-table text-xs w-full">
                  <thead>
                    <tr>
                      <th class="w-12">#</th>
                      <th>Tab Label</th>
                      <th>Route Hash</th>
                      <th>Mapping Type</th>
                      <th>Badge Tag</th>
                      <th class="text-center w-16">Action</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#EBECF0]">
                    ${sm.tabs.map((tab, idx) => `
                      <tr class="hover:bg-[#FAFBFC]">
                        <td class="font-bold text-[#5E6C84]">${idx + 1}</td>
                        <td class="font-bold text-[#172B4D]">${tab.label}</td>
                        <td class="font-mono text-[11px] text-[#0369A1]">${tab.route}</td>
                        <td>
                          <span class="lozenge ${tab.type === 'dynamic-form' ? 'lozenge-purple' : tab.type === 'custom-list' ? 'lozenge-warning' : 'lozenge-default'} text-[9.5px]">
                            ${tab.type}
                          </span>
                        </td>
                        <td>${tab.badge ? `<span class="lozenge lozenge-default text-[9.5px] font-mono">${tab.badge}</span>` : '—'}</td>
                        <td class="text-center">
                          <button data-action="del-tab" data-sm-id="${sm.id}" data-tab-id="${tab.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#BF2600] cursor-pointer" title="Delete Tab">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const modSel = document.getElementById('studio-mod-select');
    if (modSel) {
      modSel.onchange = (e) => {
        this.selectedModuleForSubmenuStudio = e.target.value;
        this.renderSubmenuTabStudioTab(container);
      };
    }

    const smSearch = document.getElementById('sm-search-input');
    if (smSearch) {
      smSearch.oninput = (e) => {
        this.submenuFilterTerm = e.target.value;
        this.renderSubmenuTabStudioTab(container);
      };
    }

    document.querySelectorAll('[data-action="add-tab"]').forEach(btn => {
      btn.onclick = () => this.showAddTabModal(selectedModKey, btn.dataset.smId);
    });

    document.querySelectorAll('[data-action="del-sm"]').forEach(btn => {
      btn.onclick = () => {
        if (confirm('Delete this submenu and all its tabs?')) {
          this.state.submenusConfig[selectedModKey] = this.state.submenusConfig[selectedModKey].filter(s => s.id !== btn.dataset.smId);
          const mod = this.state.modulesConfig.find(m => m.id === selectedModKey);
          if (mod) mod.submenusCount = this.state.submenusConfig[selectedModKey].length;
          this.saveState();
          Toast.show('Submenu deleted', 'info', 'Deleted');
          this.renderSubmenuTabStudioTab(container);
        }
      };
    });

    document.querySelectorAll('[data-action="del-tab"]').forEach(btn => {
      btn.onclick = () => {
        const sm = this.state.submenusConfig[selectedModKey]?.find(s => s.id === btn.dataset.smId);
        if (sm) {
          sm.tabs = sm.tabs.filter(t => t.id !== btn.dataset.tabId);
          this.saveState();
          Toast.show('Tab removed', 'info', 'Deleted');
          this.renderSubmenuTabStudioTab(container);
        }
      };
    });

    const addSmBtn = document.getElementById('btn-add-submenu');
    if (addSmBtn) addSmBtn.onclick = () => this.showAddSubmenuModal(selectedModKey);
  },

  showAddSubmenuModal(modKey) {
    const modalContent = `
      <form id="sm-form" class="space-y-3 text-xs">
        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Submenu Title *</label>
          <input type="text" id="sm-title" required class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="e.g. Inward Inspection" />
        </div>
        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Submenu Slug *</label>
          <input type="text" id="sm-slug" required class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg font-mono" placeholder="inward-qc" />
        </div>
        <div class="flex items-center justify-end gap-2 pt-3 border-t border-[#EBECF0]">
          <button type="button" id="modal-sm-cancel" class="px-3.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs font-semibold text-[#42526E] hover:bg-[#FAFBFC] cursor-pointer">Cancel</button>
          <button type="submit" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">Create Submenu</button>
        </div>
      </form>
    `;

    Modal.show('Add Submenu', modalContent);
    document.getElementById('modal-sm-cancel').onclick = () => Modal.close();

    document.getElementById('sm-form').onsubmit = (e) => {
      e.preventDefault();
      const title = document.getElementById('sm-title').value.trim();
      const id = document.getElementById('sm-slug').value.trim().toLowerCase();

      if (!this.state.submenusConfig[modKey]) this.state.submenusConfig[modKey] = [];
      this.state.submenusConfig[modKey].push({ id, title, tabs: [] });

      const mod = this.state.modulesConfig.find(m => m.id === modKey);
      if (mod) mod.submenusCount = this.state.submenusConfig[modKey].length;

      this.logAudit('Submenu Studio', `Created submenu "${title}" in ${modKey}`);
      this.saveState();
      Modal.close();
      Toast.show(`Submenu "${title}" created`, 'success', 'Saved');
      const c = document.getElementById('setup-subpage-content');
      if (c) this.renderClientMasterStudio(c, 'submenu-tab-studio');
    };
  },

  showAddTabModal(modKey, smId) {
    const modalContent = `
      <form id="tab-form" class="space-y-3 text-xs">
        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Tab Label *</label>
          <input type="text" id="tab-label" required class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="e.g. Lot Weighment Register" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Tab Slug *</label>
            <input type="text" id="tab-slug" required class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg font-mono" placeholder="lot-weighment" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Mapping Type</label>
            <select id="tab-type" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg">
              <option value="system">System Page</option>
              <option value="dynamic-form">Dynamic Form</option>
              <option value="custom-list">Custom List</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Badge Tag</label>
          <input type="text" id="tab-badge" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="e.g. 5 New" />
        </div>
        <div class="flex items-center justify-end gap-2 pt-3 border-t border-[#EBECF0]">
          <button type="button" id="modal-tab-cancel" class="px-3.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs font-semibold text-[#42526E] hover:bg-[#FAFBFC] cursor-pointer">Cancel</button>
          <button type="submit" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">Add Tab</button>
        </div>
      </form>
    `;

    Modal.show('Add Tab', modalContent);
    document.getElementById('modal-tab-cancel').onclick = () => Modal.close();

    document.getElementById('tab-form').onsubmit = (e) => {
      e.preventDefault();
      const label = document.getElementById('tab-label').value.trim();
      const id = document.getElementById('tab-slug').value.trim().toLowerCase();
      const type = document.getElementById('tab-type').value;
      const badge = document.getElementById('tab-badge').value.trim();

      const sm = this.state.submenusConfig[modKey]?.find(s => s.id === smId);
      if (sm) {
        sm.tabs.push({ id, label, route: `#/${modKey}/${smId}/${id}`, type, badge });
        this.saveState();
        Modal.close();
        Toast.show(`Tab "${label}" added`, 'success', 'Saved');
        const c = document.getElementById('setup-subpage-content');
        if (c) this.renderClientMasterStudio(c, 'submenu-tab-studio');
      }
    };
  },

  // =========================================================================
  // 6. DYNAMIC FIELD & FORM BUILDER TAB
  // =========================================================================
  renderFieldFormBuilderTab(container) {
    const selectedFormKey = this.selectedFormForBuilder || 'rm-purchase-inward';
    const formConfig = this.state.formsConfig[selectedFormKey] || Object.values(this.state.formsConfig)[0];
    const persona = this.state.previewPersona || 'System Administrator';

    container.innerHTML = `
      <div class="space-y-4">
        <!-- Toolbar -->
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-[#172B4D]">Target Operational Form:</span>
            <select id="builder-form-select" class="px-2.5 py-1 border border-[#DFE1E6] rounded-lg text-xs font-bold text-[#172B4D] bg-white cursor-pointer">
              ${Object.keys(this.state.formsConfig).map(k => `
                <option value="${k}" ${k === selectedFormKey ? 'selected' : ''}>${this.state.formsConfig[k].name}</option>
              `).join('')}
            </select>
          </div>

          <div class="flex items-center gap-2">
            <button id="btn-export-schema-json" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] cursor-pointer">Export Schema JSON</button>
            <button id="btn-save-form-schema" class="btn-primary px-3 py-1 rounded text-xs font-bold cursor-pointer">Save Schema</button>
          </div>
        </div>

        <!-- Split Studio: Canvas & Live Preview -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <!-- Left Panel: Fields List -->
          <div class="lg:col-span-5 space-y-3">
            <div class="bg-white border border-[#DFE1E6] rounded-xl p-3 shadow-none">
              <div class="flex items-center justify-between border-b border-[#EBECF0] pb-2 mb-2.5">
                <span class="text-xs font-bold text-[#172B4D]">Configured Form Fields</span>
                <button id="btn-add-form-field" class="btn-primary px-2.5 py-0.5 rounded text-xs font-bold cursor-pointer">+ Add Field</button>
              </div>

              <div class="space-y-3 max-h-[580px] overflow-y-auto pr-1">
                ${formConfig.sections.map(sec => `
                  <div class="border border-[#EBECF0] rounded-lg p-2.5 bg-[#FAFBFC]">
                    <div class="font-bold text-xs text-[#172B4D] mb-1.5">${sec.title}</div>
                    <div class="space-y-1">
                      ${sec.fields.map((f, i) => `
                        <div class="bg-white border border-[#DFE1E6] rounded p-2 flex items-center justify-between text-xs">
                          <div>
                            <span class="font-bold text-[#172B4D]">${f.label} ${f.required ? '<span class="text-[#BF2600]">*</span>' : ''}</span>
                            <div class="text-[10px] text-[#5E6C84] font-mono">${f.key} • [${f.type}]</div>
                          </div>
                          <button data-action="del-field" data-sec-id="${sec.id}" data-field-id="${f.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#BF2600] cursor-pointer" title="Remove Field">✕</button>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Right Panel: Live Form Preview -->
          <div class="lg:col-span-7">
            <div class="bg-white border border-[#DFE1E6] rounded-xl p-4 shadow-none">
              <div class="flex items-center justify-between border-b border-[#EBECF0] pb-2.5 mb-3">
                <span class="text-xs font-bold text-[#172B4D]">Live Form Preview</span>
                <div class="flex items-center gap-1.5 text-xs">
                  <span class="text-[#5E6C84]">Role:</span>
                  <select id="preview-role-select" class="px-2 py-0.5 border border-[#DFE1E6] rounded text-xs font-bold bg-white">
                    ${['System Administrator', 'Procurement Officer', 'Quality Lab Inspector', 'Production Floor Manager'].map(r => `
                      <option value="${r}" ${r === persona ? 'selected' : ''}>${r}</option>
                    `).join('')}
                  </select>
                </div>
              </div>

              <form id="live-erp-form" class="space-y-4 max-h-[560px] overflow-y-auto pr-1">
                ${formConfig.sections.map(sec => `
                  <div class="space-y-2">
                    <div class="text-xs font-bold text-[#172B4D] border-b border-[#EBECF0] pb-1">${sec.title}</div>
                    <div class="grid grid-cols-2 gap-2.5">
                      ${sec.fields.map(f => `
                        <div class="${f.width}">
                          <label class="block font-bold text-[11px] text-[#172B4D] mb-1">
                            ${f.label} ${f.required ? '<span class="text-[#BF2600]">*</span>' : ''}
                          </label>

                          ${f.type === 'dropdown' ? `
                            <select class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs bg-white">
                              ${f.options?.map(opt => `<option value="${opt}" ${opt === f.defaultValue ? 'selected' : ''}>${opt}</option>`).join('')}
                            </select>
                          ` : f.type === 'radio' ? `
                            <div class="flex flex-wrap gap-2 pt-1 text-xs">
                              ${f.options?.map(opt => `
                                <label class="flex items-center gap-1 cursor-pointer">
                                  <input type="radio" name="${f.key}" value="${opt}" ${opt === f.defaultValue ? 'checked' : ''} class="text-[#0369A1]" />
                                  <span>${opt}</span>
                                </label>
                              `).join('')}
                            </div>
                          ` : f.type === 'file' ? `
                            <div class="border border-dashed border-[#DFE1E6] rounded-lg p-2 text-center text-xs text-[#0369A1] hover:bg-[#FAFBFC] cursor-pointer">
                              <span>Click to upload file</span>
                              <span class="text-[10px] text-[#5E6C84] block">${f.helpText || 'PDF / JPG'}</span>
                            </div>
                          ` : `
                            <input type="${f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}" placeholder="${f.placeholder || ''}" value="${f.defaultValue || ''}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs" />
                          `}
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `).join('')}

                <div class="pt-2 border-t border-[#EBECF0] flex justify-end">
                  <button type="submit" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">Validate & Submit Slip</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;

    const formSel = document.getElementById('builder-form-select');
    if (formSel) {
      formSel.onchange = (e) => {
        this.selectedFormForBuilder = e.target.value;
        this.renderFieldFormBuilderTab(container);
      };
    }

    const roleSel = document.getElementById('preview-role-select');
    if (roleSel) {
      roleSel.onchange = (e) => {
        this.state.previewPersona = e.target.value;
        this.renderFieldFormBuilderTab(container);
      };
    }

    document.querySelectorAll('[data-action="del-field"]').forEach(btn => {
      btn.onclick = () => {
        const sec = formConfig.sections.find(s => s.id === btn.dataset.secId);
        if (sec) {
          sec.fields = sec.fields.filter(f => f.id !== btn.dataset.fieldId);
          this.saveState();
          Toast.show('Field removed', 'info', 'Removed');
          this.renderFieldFormBuilderTab(container);
        }
      };
    });

    const addFieldBtn = document.getElementById('btn-add-form-field');
    if (addFieldBtn) addFieldBtn.onclick = () => this.showAddFieldModal(formConfig);

    const exportBtn = document.getElementById('btn-export-schema-json');
    if (exportBtn) {
      exportBtn.onclick = () => {
        const json = JSON.stringify(formConfig, null, 2);
        Modal.show('Form Schema JSON', `
          <div class="space-y-2">
            <textarea readonly rows="12" class="w-full p-2 font-mono text-[11px] bg-[#172B4D] text-[#79F2C0] rounded border border-[#DFE1E6]">${json}</textarea>
            <div class="flex justify-end">
              <button onclick="navigator.clipboard.writeText(\`${json.replace(/\`/g, '\\\\`')}\`); Toast.show('Schema copied to clipboard', 'success', 'Copied'); Modal.close();" class="btn-primary px-3 py-1 rounded text-xs font-bold cursor-pointer">Copy JSON</button>
            </div>
          </div>
        `);
      };
    }

    const saveBtn = document.getElementById('btn-save-form-schema');
    if (saveBtn) {
      saveBtn.onclick = () => {
        this.logAudit('Form Builder', `Saved schema for ${formConfig.name}`);
        this.state.hasDraftChanges = true;
        this.state.draftChangesCount++;
        this.saveState();
        Toast.show('Form schema saved', 'success', 'Saved');
      };
    }

    const liveForm = document.getElementById('live-erp-form');
    if (liveForm) {
      liveForm.onsubmit = (e) => {
        e.preventDefault();
        Toast.show('Live validation passed! ERP operational slip recorded.', 'success', 'Validated');
      };
    }
  },

  showAddFieldModal(formConfig) {
    const modalContent = `
      <form id="af-form" class="space-y-3 text-xs">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Target Section *</label>
            <select id="af-sec" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg">
              ${formConfig.sections.map(s => `<option value="${s.id}">${s.title}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Field Type *</label>
            <select id="af-type" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg">
              <option value="text">Text Input</option>
              <option value="number">Number Input</option>
              <option value="date">Date Picker</option>
              <option value="dropdown">Dropdown Select</option>
              <option value="radio">Radio Buttons</option>
              <option value="file">File Upload</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Field Label *</label>
            <input type="text" id="af-label" required class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="e.g. Salinity / PPT" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Field Key *</label>
            <input type="text" id="af-key" required class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg font-mono" placeholder="salinityPpt" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Placeholder Text</label>
            <input type="text" id="af-placeholder" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="e.g. 15 PPT" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Grid Width</label>
            <select id="af-width" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg">
              <option value="col-span-1">Half Width (50%)</option>
              <option value="col-span-2">Full Width (100%)</option>
            </select>
          </div>
        </div>

        <div class="flex items-center gap-2 pt-1">
          <input type="checkbox" id="af-req" class="rounded text-[#0369A1]" />
          <label for="af-req" class="font-bold text-[#172B4D] cursor-pointer">Mark as Mandatory (Required)</label>
        </div>

        <div class="flex items-center justify-end gap-2 pt-3 border-t border-[#EBECF0]">
          <button type="button" id="modal-af-cancel" class="px-3.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs font-semibold text-[#42526E] hover:bg-[#FAFBFC] cursor-pointer">Cancel</button>
          <button type="submit" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">Add Field</button>
        </div>
      </form>
    `;

    Modal.show('Add Field to Form', modalContent);
    document.getElementById('modal-af-cancel').onclick = () => Modal.close();

    document.getElementById('af-form').onsubmit = (e) => {
      e.preventDefault();
      const secId = document.getElementById('af-sec').value;
      const type = document.getElementById('af-type').value;
      const label = document.getElementById('af-label').value.trim();
      const key = document.getElementById('af-key').value.trim();
      const placeholder = document.getElementById('af-placeholder').value.trim();
      const width = document.getElementById('af-width').value;
      const required = document.getElementById('af-req').checked;

      const sec = formConfig.sections.find(s => s.id === secId);
      if (sec) {
        sec.fields.push({
          id: `f_${Date.now()}`,
          key,
          label,
          type,
          placeholder,
          width,
          required,
          defaultValue: ''
        });

        this.saveState();
        Modal.close();
        Toast.show(`Field "${label}" added`, 'success', 'Saved');
        const c = document.getElementById('setup-subpage-content');
        if (c) this.renderClientMasterStudio(c, 'field-form-builder');
      }
    };
  },

  // =========================================================================
  // 7. AUDIT & CONFIGURATION LOGS TAB
  // =========================================================================
  renderAuditLogsTab(container) {
    container.innerHTML = `
      <div class="space-y-4">
        <!-- Status Bar -->
        <div class="bg-white border border-[#DFE1E6] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-none">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-[#172B4D]">Configuration Governance:</span>
            <span class="lozenge lozenge-success text-[10px] font-mono">${this.state.publishedVersion} Live</span>
            ${this.state.hasDraftChanges ? `
              <span class="lozenge lozenge-warning text-[10px]">${this.state.draftChangesCount} Draft Changes Pending</span>
            ` : `
              <span class="lozenge lozenge-default text-[10px]">Zero Drafts</span>
            `}
          </div>

          <div class="flex items-center gap-2">
            ${this.state.hasDraftChanges ? `
              <button id="btn-discard-drafts" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#BF2600] cursor-pointer">Discard Drafts</button>
              <button id="btn-publish-live" class="btn-primary px-3 py-1 rounded text-xs font-bold cursor-pointer">Publish Changes Live</button>
            ` : ''}
          </div>
        </div>

        <!-- Version Snapshots -->
        <div class="bg-white border border-[#DFE1E6] rounded-xl p-3 shadow-none">
          <div class="text-xs font-bold text-[#172B4D] mb-2">Safe Rollback Snapshots</div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            ${this.state.versionHistory.map(v => `
              <div class="border ${v.isCurrent ? 'border-[#0369A1] bg-[#F0F9FF]' : 'border-[#DFE1E6] bg-white'} rounded-lg p-2.5 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-xs text-[#172B4D] font-mono">${v.version}</span>
                    ${v.isCurrent ? `<span class="lozenge lozenge-inprogress text-[9px]">Live</span>` : ''}
                  </div>
                  <div class="text-[10px] text-[#5E6C84] mt-0.5">${v.date}</div>
                  <div class="text-[11px] text-[#172B4D] mt-1 truncate">${v.note}</div>
                </div>
                <div class="mt-2 pt-1.5 border-t border-[#EBECF0] flex justify-end">
                  ${!v.isCurrent ? `
                    <button data-action="rollback" data-version="${v.version}" class="text-[11px] font-bold text-[#BF2600] hover:underline cursor-pointer">Rollback</button>
                  ` : `
                    <span class="text-[10px] font-bold text-[#006644]">Active</span>
                  `}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] shadow-none overflow-hidden">
          <div class="p-3 border-b border-[#EBECF0] flex items-center justify-between flex-wrap gap-2">
            <span class="text-xs font-bold text-[#172B4D]">Configuration Change Audit Trail</span>
            <button id="btn-export-audit" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] cursor-pointer">Export CSV</button>
          </div>

          <div class="overflow-x-auto">
            <table class="erp-table text-xs w-full">
              <thead>
                <tr>
                  <th class="w-24">Log ID</th>
                  <th>Timestamp</th>
                  <th>User & Role</th>
                  <th>Entity Affected</th>
                  <th>Action</th>
                  <th>Change Diff Details</th>
                  <th class="text-center w-20">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#EBECF0]">
                ${this.state.auditLogs.map(log => `
                  <tr class="hover:bg-[#FAFBFC]">
                    <td class="font-mono font-bold text-[#17191c]">${log.id}</td>
                    <td class="text-[#5E6C84] text-[11px]">${log.timestamp}</td>
                    <td>
                      <div class="font-bold text-[#172B4D]">${log.user}</div>
                      <div class="text-[10px] text-[#5E6C84]">${log.role}</div>
                    </td>
                    <td><span class="lozenge lozenge-default text-[9.5px]">${log.entity}</span></td>
                    <td class="font-semibold text-[#172B4D]">${log.action}</td>
                    <td class="text-[#172B4D]">${log.diff}</td>
                    <td class="text-center"><span class="lozenge lozenge-success text-[9.5px]">${log.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.querySelectorAll('[data-action="rollback"]').forEach(btn => {
      btn.onclick = () => {
        const ver = btn.dataset.version;
        if (confirm(`Rollback configuration to snapshot ${ver}?`)) {
          this.state.publishedVersion = ver;
          this.state.versionHistory.forEach(v => v.isCurrent = (v.version === ver));
          this.state.hasDraftChanges = false;
          this.state.draftChangesCount = 0;
          this.logAudit('Rollback Governance', `Restored snapshot ${ver}`);
          this.saveState();
          Toast.show(`Configuration restored to ${ver}`, 'success', 'Rollback Complete');
          this.renderAuditLogsTab(container);
        }
      };
    });

    const publishBtn = document.getElementById('btn-publish-live');
    if (publishBtn) publishBtn.onclick = () => this.handlePublishConfiguration();

    const discardBtn = document.getElementById('btn-discard-drafts');
    if (discardBtn) {
      discardBtn.onclick = () => {
        if (confirm('Discard pending draft changes?')) {
          this.state.hasDraftChanges = false;
          this.state.draftChangesCount = 0;
          this.saveState();
          Toast.show('Draft changes cleared', 'info', 'Cleared');
          this.renderAuditLogsTab(container);
        }
      };
    }

    const exportBtn = document.getElementById('btn-export-audit');
    if (exportBtn) {
      exportBtn.onclick = () => Toast.show('Generating Audit_Trail.csv...', 'success', 'Export Ready');
    }
  },

  handlePublishConfiguration() {
    const nextVer = `v2.4.${parseInt(this.state.publishedVersion.split('.').pop() || '1') + 1}`;
    Modal.show('Publish Configuration Live', `
      <div class="space-y-3 text-xs">
        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Release Summary Notes</label>
          <input type="text" id="pub-note" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="e.g. Updated CAA upload validation rule" />
        </div>
        <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#EBECF0]">
          <button id="modal-pub-cancel" class="px-3.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs font-semibold text-[#42526E] hover:bg-[#FAFBFC] cursor-pointer">Cancel</button>
          <button id="modal-pub-confirm" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">Publish Live (${nextVer})</button>
        </div>
      </div>
    `);

    document.getElementById('modal-pub-cancel').onclick = () => Modal.close();
    document.getElementById('modal-pub-confirm').onclick = () => {
      const note = document.getElementById('pub-note').value.trim() || 'Configuration changes published live.';
      this.state.publishedVersion = nextVer;
      this.state.hasDraftChanges = false;
      this.state.draftChangesCount = 0;
      this.state.versionHistory.forEach(v => v.isCurrent = false);
      this.state.versionHistory.unshift({
        version: nextVer,
        date: 'Just now',
        publishedBy: 'Dr. Y.S. Prasad',
        note,
        isCurrent: true
      });

      this.logAudit('Configuration Governance', `Published live release ${nextVer}: ${note}`);
      this.saveState();
      Modal.close();
      Toast.show(`Configuration release ${nextVer} is now LIVE`, 'success', 'Published Live');

      const c = document.getElementById('setup-subpage-content');
      if (c) this.renderClientMasterStudio(c, this.activeTab);
    };
  },

  logAudit(entity, diff) {
    const id = `AUD-${Math.floor(8900 + Math.random() * 900)}`;
    const comp = this.state.companies.find(c => c.id === this.state.activeCompanyId)?.name || 'Devi Fisheries Limited';
    this.state.auditLogs.unshift({
      id,
      timestamp: 'Just now',
      user: 'Dr. Y.S. Prasad',
      role: 'System Administrator',
      company: comp,
      entity,
      action: 'Update',
      diff,
      status: 'Published'
    });
  }
};
