// Navigation Hierarchy: Main Menu -> Sub Menu -> On-Screen Tabs
import { LOGO_COLOR, LOGO_WHITE } from '../data/logos.js';
import { Environment } from '../framework/Environment.js';

export const NAV_HIERARCHY = [
  {
    id: "purchase",
    title: "Purchase",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
    submenus: [
      {
        id: "dashboard",
        title: "DashBoard",
        defaultTab: "overview",
        tabs: [
          { id: "overview", label: "Overview", hash: "#/purchase/dashboard/overview" }
        ]
      },
      {
        id: "purchase-ops",
        title: "Purchase",
        defaultTab: "purchase-dashboard",
        tabs: [
          { id: "purchase-dashboard", label: "Purchase Dashboard", hash: "#/purchase/purchase-ops/purchase-dashboard" },
          { id: "rm-dashboard", label: "RM DashBoard", hash: "#/purchase/purchase-ops/rm-dashboard" }
        ]
      },
      {
        id: "pre-processing",
        title: "Pre Processing",
        defaultTab: "bookings",
        tabs: [
          { id: "bookings", label: "Bookings", hash: "#/purchase/pre-processing/bookings" },
          { id: "rm-arrivals", label: "Rm Arrival", hash: "#/purchase/pre-processing/rm-arrivals" },
          { id: "arrivals", label: "Arrivals", hash: "#/purchase/pre-processing/arrivals" },
          { id: "bills", label: "Bills", hash: "#/purchase/pre-processing/bills" },
          { id: "payments", label: "Payments", hash: "#/purchase/pre-processing/payments" },
          { id: "payment-summary", label: "Payments Summary", hash: "#/purchase/pre-processing/payment-summary" }
        ]
      }
    ]
  },
  {
    id: "preprocessing",
    title: "Pre Processing",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
    submenus: [
      {
        id: "dashboard",
        title: "Dashboard",
        defaultTab: "overview",
        tabs: [
          { id: "overview", label: "Overview", hash: "#/preprocessing/dashboard/overview" }
        ]
      },
      {
        id: "pre-processing",
        title: "Pre Processing",
        defaultTab: "deheading",
        tabs: [
          { id: "deheading", label: "Deheading", hash: "#/preprocessing/pre-processing/deheading" },
          { id: "grading", label: "Grading", hash: "#/preprocessing/pre-processing/grading" },
          { id: "rm-received", label: "Rm Received trackid", hash: "#/preprocessing/pre-processing/rm-received" },
          { id: "deheading-trackid", label: "De-Heading trackid", hash: "#/preprocessing/pre-processing/deheading-trackid" },
          { id: "grading-trackid", label: "Grading trackid", hash: "#/preprocessing/pre-processing/grading-trackid" },
          { id: "value-addition", label: "Value Addition trackid", hash: "#/preprocessing/pre-processing/value-addition" },
          { id: "hon-qty-transfer", label: "Hon Qty Transfer After VA", hash: "#/preprocessing/pre-processing/hon-qty-transfer" }
        ]
      },
      {
        id: "production-reports",
        title: "Production Reports",
        defaultTab: "track-code-report",
        tabs: [
          { id: "track-code-report", label: "Track Code Report", hash: "#/preprocessing/production-reports/track-code-report" },
          { id: "va-floor-balance", label: "VA Floor Balance", hash: "#/preprocessing/production-reports/va-floor-balance" },
          { id: "va-transfer", label: "VA Transfer Report", hash: "#/preprocessing/production-reports/va-transfer" },
          { id: "assumed-reports", label: "Assumed Reports", hash: "#/preprocessing/production-reports/assumed-reports" },
          { id: "consolidation-daily", label: "Consolidation Report", hash: "#/preprocessing/production-reports/consolidation-daily" },
          { id: "file-upload", label: "File Upload", hash: "#/preprocessing/production-reports/file-upload" }
        ]
      },
      {
        id: "chemical-screens",
        title: "Chemical Screens",
        defaultTab: "chemical-pos",
        tabs: [
          { id: "chemical-pos", label: "Chemical Pos", hash: "#/preprocessing/chemical-screens/chemical-pos" },
          { id: "received-chemicals", label: "Received Chemicals", hash: "#/preprocessing/chemical-screens/received-chemicals" },
          { id: "chemicals-consumption", label: "Chemicals Consumption", hash: "#/preprocessing/chemical-screens/chemicals-consumption" },
          { id: "chemical-received-report", label: "Chemical Received Report", hash: "#/preprocessing/chemical-screens/chemical-received-report" },
          { id: "chemical-opening-balance", label: "Chemical Opening Balance Report", hash: "#/preprocessing/chemical-screens/chemical-opening-balance" },
          { id: "chemical-balance-report", label: "Chemical Balance Report", hash: "#/preprocessing/chemical-screens/chemical-balance-report" },
          { id: "chemical-payments-list", label: "Chemical Payments List", hash: "#/preprocessing/chemical-screens/chemical-payments-list" }
        ]
      }
    ]
  },
  {
    id: "quality",
    title: "Quality Control (QC)",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
    submenus: [
      {
        id: "dashboard",
        title: "Dashboard",
        defaultTab: "qc-overview",
        tabs: [
          { id: "qc-overview", label: "QC Overview", hash: "#/quality/dashboard/qc-overview" },
          { id: "daily-qc-ops", label: "Daily QC Operations", hash: "#/quality/dashboard/daily-qc-ops" }
        ]
      },
      {
        id: "lab",
        title: "Lab",
        defaultTab: "incoming-lots",
        tabs: [
          { id: "incoming-lots", label: "Incoming Lots", hash: "#/quality/lab/incoming-lots" },
          { id: "antibiotic-testing", label: "Antibiotic Testing", hash: "#/quality/lab/antibiotic-testing" },
          { id: "rm-testing", label: "Raw Material Testing", hash: "#/quality/lab/rm-testing" },
          { id: "microbiology", label: "Microbiology Testing", hash: "#/quality/lab/microbiology" },
          { id: "in-house-lab", label: "In-House Lab", hash: "#/quality/lab/in-house-lab" },
          { id: "external-lab", label: "External Lab", hash: "#/quality/lab/external-lab" }
        ]
      },
      {
        id: "qc-operations",
        title: "QC Operations",
        defaultTab: "qc-orders",
        tabs: [
          { id: "qc-orders", label: "QC Orders", hash: "#/quality/qc-operations/qc-orders" },
          { id: "documentation", label: "Documentation", hash: "#/quality/qc-operations/documentation" }
        ]
      },
      {
        id: "chemical-screening",
        title: "Chemical Screening",
        defaultTab: "screening-records",
        tabs: [
          { id: "screening-records", label: "Screening Records", hash: "#/quality/chemical-screening/screening-records" }
        ]
      },
      {
        id: "qc-audits",
        title: "QC Audits",
        defaultTab: "food-audits",
        tabs: [
          { id: "food-audits", label: "Food Audits", hash: "#/quality/qc-audits/food-audits" },
          { id: "social-audits", label: "Social Audits", hash: "#/quality/qc-audits/social-audits" },
          { id: "farm-audits", label: "Farm Audits", hash: "#/quality/qc-audits/farm-audits" },
          { id: "hatchery-audits", label: "Hatchery Audits", hash: "#/quality/qc-audits/hatchery-audits" },
          { id: "feed-mill-audits", label: "Feed Mill Audits", hash: "#/quality/qc-audits/feed-mill-audits" }
        ]
      }
    ]
  },
  {
    id: "production",
    title: "Production",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`,
    submenus: [
      {
        id: "dashboard",
        title: "Dashboard",
        defaultTab: "overview",
        tabs: [
          { id: "overview", label: "Overview", hash: "#/production/dashboard/overview" }
        ]
      },
      {
        id: "setup-master",
        title: "Setup & Master Data",
        defaultTab: "standard-yields",
        tabs: [
          { id: "standard-yields", label: "Standard Yields", hash: "#/production/setup-master/standard-yields" }
        ]
      },
      {
        id: "batch-tracking",
        title: "Batch Tracking",
        defaultTab: "soaking-tracking",
        tabs: [
          { id: "soaking-tracking", label: "Soaking Tracking", hash: "#/production/batch-tracking/soaking-tracking" },
          { id: "freezing-tracking", label: "Freezing Tracking", hash: "#/production/batch-tracking/freezing-tracking" }
        ]
      },
      {
        id: "production-operations",
        title: "Production Operations",
        defaultTab: "soaking",
        tabs: [
          { id: "soaking", label: "Soaking", hash: "#/production/production-operations/soaking" },
          { id: "freezing-storage", label: "Freezing & Storage", hash: "#/production/production-operations/freezing-storage" }
        ]
      },
      {
        id: "production-control",
        title: "Production Control",
        defaultTab: "floor-balance",
        tabs: [
          { id: "floor-balance", label: "Floor Balance", hash: "#/production/production-control/floor-balance" },
          { id: "untreated-control", label: "Untreated Control", hash: "#/production/production-control/untreated-control" },
          { id: "floor-balance-variety", label: "Floor Balance by Variety", hash: "#/production/production-control/floor-balance-variety" },
          { id: "soaking-control", label: "Soaking Control", hash: "#/production/production-control/soaking-control" },
          { id: "freezing-control", label: "Freezing Control", hash: "#/production/production-control/freezing-control" },
          { id: "freezing-prod-control", label: "Freezing Production Control", hash: "#/production/production-control/freezing-prod-control" },
          { id: "reconciliation", label: "Reconciliation", hash: "#/production/production-control/reconciliation" },
          { id: "conversion-headon", label: "Head-on to Finished Conversion", hash: "#/production/production-control/conversion-headon" }
        ]
      },
      {
        id: "anti-dumping",
        title: "Anti-Dumping Compliance",
        defaultTab: "entry",
        tabs: [
          { id: "entry", label: "Entry", hash: "#/production/anti-dumping/entry" },
          { id: "audit-logs", label: "Audit Logs", hash: "#/production/anti-dumping/audit-logs" },
          { id: "negative-audit", label: "Negative Audit", hash: "#/production/anti-dumping/negative-audit" },
          { id: "shipment-audit", label: "Shipment Audit", hash: "#/production/anti-dumping/shipment-audit" },
          { id: "ledger", label: "Opening & Closing Ledger", hash: "#/production/anti-dumping/ledger" },
          { id: "closing-bal", label: "Closing Balance", hash: "#/production/anti-dumping/closing-bal" }
        ]
      }
    ]
  },
  {
    id: "coldstore",
    title: "Coldstore",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`,
    submenus: [
      {
        id: "dashboard",
        title: "Dashboard",
        defaultTab: "overview",
        tabs: [
          { id: "overview", label: "Overview", hash: "#/coldstore/dashboard/overview" }
        ]
      },
      {
        id: "inward-intake",
        title: "Inward & Intake",
        defaultTab: "production-intake",
        tabs: [
          { id: "production-intake", label: "Production Intake", hash: "#/coldstore/inward-intake/production-intake" },
          { id: "general-stock-in", label: "General Stock In", hash: "#/coldstore/inward-intake/general-stock-in" },
          { id: "inward-approvals", label: "Inward Approvals", hash: "#/coldstore/inward-intake/inward-approvals" }
        ]
      },
      {
        id: "store-operations",
        title: "Store Operations",
        defaultTab: "master-inventory",
        tabs: [
          { id: "master-inventory", label: "Master Inventory", hash: "#/coldstore/store-operations/master-inventory" },
          { id: "thawing-repacking", label: "Thawing & Repacking", hash: "#/coldstore/store-operations/thawing-repacking" },
          { id: "physical-adjustments", label: "Physical Adjustments", hash: "#/coldstore/store-operations/physical-adjustments" }
        ]
      },
      {
        id: "dispatch-outward",
        title: "Dispatch & Outward",
        defaultTab: "orders-allocations",
        tabs: [
          { id: "orders-allocations", label: "Orders & Allocations", hash: "#/coldstore/dispatch-outward/orders-allocations" },
          { id: "shipments", label: "Shipments", hash: "#/coldstore/dispatch-outward/shipments" },
          { id: "stock-out", label: "Stock Out", hash: "#/coldstore/dispatch-outward/stock-out" },
          { id: "ibt-management", label: "IBT Management", hash: "#/coldstore/dispatch-outward/ibt-management" }
        ]
      },
      {
        id: "setup-imports",
        title: "Setup & Imports",
        defaultTab: "racks-locations",
        tabs: [
          { id: "racks-locations", label: "Racks & Locations", hash: "#/coldstore/setup-imports/racks-locations" },
          { id: "batch-uploads", label: "Batch Data Uploads", hash: "#/coldstore/setup-imports/batch-uploads" }
        ]
      }
    ]
  },
  {
    id: "inventory",
    title: "Inventory",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>`,
    submenus: [
      {
        id: "dashboard",
        title: "Dashboard",
        defaultTab: "overview",
        tabs: [
          { id: "overview", label: "Overview", hash: "#/inventory/dashboard/overview" }
        ]
      },
      {
        id: "requisitions",
        title: "Requisitions",
        defaultTab: "indents",
        tabs: [
          { id: "indents", label: "Indents", hash: "#/inventory/requisitions/indents" }
        ]
      },
      {
        id: "procurement",
        title: "Procurement",
        defaultTab: "proforma-invoices",
        tabs: [
          { id: "proforma-invoices", label: "Proforma Invoices", hash: "#/inventory/procurement/proforma-invoices" },
          { id: "purchase-orders", label: "Purchase Orders", hash: "#/inventory/procurement/purchase-orders" },
          { id: "proforma-register", label: "Proforma Register", hash: "#/inventory/procurement/proforma-register" }
        ]
      },
      {
        id: "store-operations",
        title: "Store Operations",
        defaultTab: "grn",
        tabs: [
          { id: "grn", label: "Goods Receipt (GRN)", hash: "#/inventory/store-operations/grn" },
          { id: "material-issues", label: "Material Issues", hash: "#/inventory/store-operations/material-issues" }
        ]
      }
    ]
  },
  {
    id: "sales",
    title: "Sales",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    submenus: [
      {
        id: "dashboard",
        title: "DashBoard",
        defaultTab: "overview",
        tabs: [
          { id: "overview", label: "Overview", hash: "#/sales/dashboard/overview" }
        ]
      },
      {
        id: "orders",
        title: "Orders",
        defaultTab: "proforma-list",
        tabs: [
          { id: "proforma-list", label: "Proforma List", hash: "#/sales/orders/proforma-list" },
          { id: "custom-invoices", label: "Custom Invoices", hash: "#/sales/orders/custom-invoices" },
          { id: "isf-details", label: "ISF Details", hash: "#/sales/orders/isf-details" },
          { id: "shipping-bill", label: "Shipping Bill", hash: "#/sales/orders/shipping-bill" },
          { id: "commercial-invoice", label: "Commercial Invoice", hash: "#/sales/orders/commercial-invoice" },
          { id: "eta-status", label: "ETA Status", hash: "#/sales/orders/eta-status" },
          { id: "fda-status", label: "FDA Status", hash: "#/sales/orders/fda-status" },
          { id: "clearing-agent", label: "Clearing Agent", hash: "#/sales/orders/clearing-agent" },
          { id: "delayed-shipments", label: "Delayed shipments", hash: "#/sales/orders/delayed-shipments" }
        ]
      },
      {
        id: "payments",
        title: "Payments",
        defaultTab: "forward-contracts",
        tabs: [
          { id: "forward-contracts", label: "Forward Contracts", hash: "#/sales/payments/forward-contracts" },
          { id: "collections", label: "Collections", hash: "#/sales/payments/collections" },
          { id: "negotiations", label: "Negotiations", hash: "#/sales/payments/negotiations" },
          { id: "realization", label: "Realization", hash: "#/sales/payments/realization" },
          { id: "realization-done", label: "Realization Done", hash: "#/sales/payments/realization-done" }
        ]
      },
      {
        id: "insurance",
        title: "Insurance",
        defaultTab: "pending-insurance",
        tabs: [
          { id: "pending-insurance", label: "Pending Insurance", hash: "#/sales/insurance/pending-insurance" },
          { id: "insurance-templates", label: "Insurance Templates", hash: "#/sales/insurance/insurance-templates" },
          { id: "insurance-payments", label: "Insurance Payments", hash: "#/sales/insurance/insurance-payments" }
        ]
      },
      {
        id: "report",
        title: "Report",
        defaultTab: "sales-summary",
        tabs: [
          { id: "sales-summary", label: "Sales Summary", hash: "#/sales/report/sales-summary" },
          { id: "payment-status", label: "Payment Status", hash: "#/sales/report/payment-status" },
          { id: "inventory-report", label: "Inventory Report", hash: "#/sales/report/inventory-report" }
        ]
      }
    ]
  },
  {
    id: "reports",
    title: "Reports",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`,
    submenus: [
      {
        id: "production-analytics",
        title: "Production Analytics",
        defaultTab: "yield-reports",
        tabs: [
          { id: "yield-reports", label: "Yield Reports", hash: "#/reports/production-analytics/yield-reports" },
          { id: "floor-summaries", label: "Floor Summaries", hash: "#/reports/production-analytics/floor-summaries" },
          { id: "ad-export-logs", label: "Anti-Dumping Export Logs", hash: "#/reports/production-analytics/ad-export-logs" }
        ]
      },
      {
        id: "coldstore-analytics",
        title: "Coldstore Analytics",
        defaultTab: "inventory-valuation",
        tabs: [
          { id: "inventory-valuation", label: "Inventory Valuation", hash: "#/reports/coldstore-analytics/inventory-valuation" },
          { id: "stock-summaries", label: "Stock Summaries", hash: "#/reports/coldstore-analytics/stock-summaries" },
          { id: "movement-logs", label: "Movement Logs", hash: "#/reports/coldstore-analytics/movement-logs" },
          { id: "operational-exceptions", label: "Operational Exceptions", hash: "#/reports/coldstore-analytics/operational-exceptions" }
        ]
      },
      {
        id: "sales-export-analytics",
        title: "Sales & Export Analytics",
        defaultTab: "compliance-regulatory",
        tabs: [
          { id: "compliance-regulatory", label: "Compliance & Regulatory", hash: "#/reports/sales-export-analytics/compliance-regulatory" },
          { id: "logistics-freight", label: "Logistics & Freight", hash: "#/reports/sales-export-analytics/logistics-freight" },
          { id: "financials", label: "Financials", hash: "#/reports/sales-export-analytics/financials" }
        ]
      }
    ]
  },
  {
    id: "setup",
    title: "Settings",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
    submenus: [
      {
        id: "client-master-setup",
        title: "Settings",
        defaultTab: "company-setup",
        tabs: [
          { id: "company-setup", label: "Company Setup", hash: "#/setup/client-master-setup/company-setup" },
          { id: "user-management", label: "User Management", hash: "#/setup/client-master-setup/user-management" },
          { id: "roles-permissions", label: "Roles & Permissions", hash: "#/setup/client-master-setup/roles-permissions" },
          { id: "module-studio", label: "Dynamic Module Studio", hash: "#/setup/client-master-setup/module-studio" },
          { id: "submenu-tab-studio", label: "Submenu & Tab Studio", hash: "#/setup/client-master-setup/submenu-tab-studio" },
          { id: "field-form-builder", label: "Dynamic Field & Form Builder", hash: "#/setup/client-master-setup/field-form-builder" },
          { id: "audit-logs", label: "Audit & Configuration Logs", hash: "#/setup/client-master-setup/audit-logs" }
        ]
      }
    ]
  },
  {
    id: "help",
    title: "Help",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    submenus: [
      {
        id: "documentation",
        title: "Documentation & SOPs",
        defaultTab: "compliance-manual",
        tabs: [
          { id: "compliance-manual", label: "Compliance & SOP Manual", hash: "#/help/documentation/compliance-manual" },
          { id: "user-guides", label: "Module User Guides", hash: "#/help/documentation/user-guides" },
          { id: "antibiotic-protocols", label: "Antibiotic & Testing Protocols", hash: "#/help/documentation/antibiotic-protocols" }
        ]
      },
      {
        id: "support-tickets",
        title: "Support & Helpdesk",
        defaultTab: "it-support",
        tabs: [
          { id: "it-support", label: "IT Helpdesk & Tickets", hash: "#/help/support-tickets/it-support" },
          { id: "system-status", label: "System Health & Status", hash: "#/help/support-tickets/system-status" },
          { id: "release-notes", label: "Release Notes & Changelog", hash: "#/help/support-tickets/release-notes" }
        ]
      }
    ]
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>`,
    submenus: [
      {
        id: "center",
        title: "Notification Center",
        defaultTab: "all-notifications",
        tabs: [
          { id: "all-notifications", label: "All Notifications", hash: "#/notifications/center/all-notifications" },
          { id: "unread-alerts", label: "Unread Alerts", hash: "#/notifications/center/unread-alerts" },
          { id: "procurement-alerts", label: "Procurement & Arrivals", hash: "#/notifications/center/procurement-alerts" },
          { id: "quality-alerts", label: "Quality & Cold Chain", hash: "#/notifications/center/quality-alerts" }
        ]
      }
    ]
  }
];

export const MODULE_LUCIDE_ICONS = {
  purchase: 'shopping-cart',
  preprocessing: 'layers',
  quality: 'microscope',
  production: 'factory',
  coldstore: 'snowflake',
  inventory: 'boxes',
  sales: 'trending-up',
  reports: 'bar-chart-3',
  setup: 'settings',
  help: 'life-buoy',
  notifications: 'bell'
};

export const Sidebar = {
  isCollapsed: localStorage.getItem('dfl_sidebar_collapsed') === 'true',
  activeModuleId: 'purchase',
  activeSubmenuId: 'dashboard',
  activeTabId: 'rm-dashboard',

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem('dfl_sidebar_collapsed', this.isCollapsed ? 'true' : 'false');

    const sidebarContainer = document.getElementById('sidebar-container');
    const layoutWrapper = document.getElementById('main-layout-wrapper');

    if (sidebarContainer && layoutWrapper) {
      if (this.isCollapsed) {
        sidebarContainer.classList.add('is-collapsed');
        layoutWrapper.classList.add('is-collapsed');
      } else {
        sidebarContainer.classList.remove('is-collapsed');
        layoutWrapper.classList.remove('is-collapsed');
      }
    }

    const headerCollapseIcon = document.getElementById('header-collapse-icon');
    const headerToggleBtn = document.getElementById('sidebar-toggle-btn');
    if (headerCollapseIcon) {
      if (this.isCollapsed) {
        headerCollapseIcon.classList.add('rotate-180');
        if (headerToggleBtn) headerToggleBtn.title = 'Expand Sidebar';
      } else {
        headerCollapseIcon.classList.remove('rotate-180');
        if (headerToggleBtn) headerToggleBtn.title = 'Collapse Sidebar';
      }
    }

    this.render('sidebar-container', window.location.hash);

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 150);
  },

  render(containerId, activeHash = '#/purchase/dashboard/rm-dashboard') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Parse active hash: #/module/submenu/tab
    const clean = (activeHash || '').replace(/^#\/?/, '').replace(/^\/+/, '');
    const parts = clean.split('/');
    const modId = parts[0] || 'purchase';
    const subId = parts[1] || 'dashboard';
    const tabId = parts[2] || '';

    this.activeModuleId = modId;
    this.activeSubmenuId = subId;
    this.activeTabId = tabId;

    const collapsedClass = this.isCollapsed ? 'collapsed' : '';
    const isS01 = Environment.isSitemap01();

    container.innerHTML = `
      <aside class="f-sidebar ${collapsedClass} ${isS01 ? 'sitemap01-sidebar' : ''}" id="erp-sidebar" style="${isS01 ? 'border-radius: 0 16px 16px 0; border-right: 1px solid #1E293B;' : ''}">
        <!-- Floating Sidebar Header with Devi Fisheries Brand Logo & Edge Toggle -->
        <div class="f-sb-header" style="position:relative;">
          <a href="#/purchase/dashboard/rm-dashboard" class="f-sb-brand" title="Devi Fisheries — Enterprise ERP">
            <img src="DEVI-FISHERIES-LOGO.png" alt="Devi Fisheries" style="width:38px;height:38px;border-radius:10px;object-fit:cover;flex-shrink:0;box-shadow:0 2px 8px rgba(0, 0, 0, 0.35);border:1.5px solid rgba(255, 255, 255, 0.16);" />
            <div class="f-sb-brand-info">
              <div class="f-sb-title" style="font-weight:700;color:#fff;">Devi Fisheries</div>
              <div class="f-sb-subtitle" style="${isS01 ? 'color:#00B4D8;font-size:9.5px;font-weight:800;letter-spacing:1px;text-transform:uppercase;' : ''}">${isS01 ? 'POWERED BY CAMAROO' : 'Enterprise ERP'}</div>
            </div>
          </a>
          <button class="f-sb-toggle ${isS01 ? 'sitemap01-seam-toggle' : ''}" id="sidebar-edge-toggle-btn" title="${this.isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}" style="${isS01 ? 'position:absolute;right:-14px;top:20px;width:28px;height:28px;border-radius:9999px;background:#ffffff;border:1px solid #CBD5E1;box-shadow:0 2px 6px rgba(0,0,0,0.18);display:flex;align-items:center;justify-content:center;color:#475569;cursor:pointer;z-index:60;' : ''}">
            <svg class="w-3.5 h-3.5 transition-transform ${this.isCollapsed ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
          </button>
        </div>

        <!-- Scrollable Navigation Hierarchy -->
        <div class="f-sb-nav" id="sidebar-nav-groups">
          <a class="f-sb-link ${this.activeModuleId === 'home' ? 'active' : ''} ${isS01 && this.activeModuleId === 'home' ? 's01-active-pill' : ''}" href="#/home" title="Home" style="${isS01 && this.activeModuleId === 'home' ? 'background: #00A8B5 !important; color: #0F172A !important; font-weight: 700 !important; border-radius: 12px; margin: 3px 8px; box-shadow: 0 4px 12px rgba(0, 168, 181, 0.25);' : ''}">
            <i data-lucide="home" style="${isS01 && this.activeModuleId === 'home' ? 'stroke: #0F172A !important; stroke-width: 2.2;' : ''}"></i>
            <span style="${isS01 && this.activeModuleId === 'home' ? 'color: #0F172A !important;' : ''}">Home</span>
          </a>

          <span class="f-sb-sec">Core Modules</span>
          ${this.renderNavGroups(isS01)}

          <span class="f-sb-sec">Configuration</span>
          <a class="f-sb-link ${this.activeModuleId === 'setup' ? 'active' : ''}" href="#/setup/client-master-setup/company-setup" title="System Settings">
            <i data-lucide="settings"></i>
            <span>System Settings</span>
          </a>
        </div>

        <!-- Floating Sidebar Footer: Help & Support Desk -->
        <a href="#/help/support-tickets/it-support" class="f-sb-footer ${this.activeModuleId === 'help' ? 'active' : ''}" style="text-decoration:none;cursor:pointer;" title="Help & Support — 24/7 IT & Plant Desk">
          <div style="width:36px;height:36px;border-radius:10px;background:#003B44;border:1px solid rgba(79, 207, 224, 0.25);display:grid;place-items:center;flex-shrink:0;color:#4FCFE0;">
            <i data-lucide="life-buoy" style="width:18px;height:18px;stroke:#4FCFE0;"></i>
          </div>
          <div class="f-sb-user-text">
            <span class="f-sb-user-name" style="display:flex;align-items:center;gap:6px;">
              Help & Support
              <span style="width:7px;height:7px;border-radius:9999px;background:#10B981;box-shadow:0 0 6px rgba(16, 185, 129, 0.7);display:inline-block;" title="Support Desk Online"></span>
            </span>
            <span class="f-sb-user-role">24/7 IT & Plant Desk</span>
          </div>
        </a>
      </aside>
    `;

    // Render Lucide vector icons
    if (typeof window !== 'undefined' && window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    this.bindEvents();
  },

  renderNavGroups(isS01 = false) {
    // Setup is in Configuration section; Help is in Footer; Notifications is in Top Header
    const sidebarModules = NAV_HIERARCHY.filter(m => m.id !== 'setup' && m.id !== 'help' && m.id !== 'notifications');
    return sidebarModules.map(mod => {
      const isExpanded = mod.id === this.activeModuleId;
      const iconName = MODULE_LUCIDE_ICONS[mod.id] || 'box';

      if (isS01) {
        // Sitemap 01 modern pill capsule & indented bullet tree layout
        return `
          <div class="f-sb-grp ${isExpanded ? 'open' : ''}" data-mod-id="${mod.id}">
            <button 
              class="f-sb-grp-btn sidebar-mod-btn ${isExpanded ? 's01-active-pill' : ''}" 
              data-module-id="${mod.id}" 
              title="${mod.title}"
              style="${isExpanded ? 'background: #00A8B5 !important; color: #0F172A !important; font-weight: 700 !important; border-radius: 12px; margin: 3px 8px; box-shadow: 0 4px 12px rgba(0, 168, 181, 0.25);' : ''}"
            >
              <i data-lucide="${iconName}" style="${isExpanded ? 'stroke: #0F172A !important; stroke-width: 2.2;' : ''}"></i>
              <span style="${isExpanded ? 'color: #0F172A !important;' : ''}">${mod.title}</span>
              <i data-lucide="${isExpanded ? 'chevron-down' : 'chevron-right'}" class="f-sb-chev" style="${isExpanded ? 'stroke: #0F172A !important;' : ''}"></i>
            </button>
            <div class="f-sb-sub" style="${isExpanded ? 'display: block; padding-left: 14px;' : ''}">
              <div class="f-sb-flyout-title">${mod.title}</div>
              ${mod.submenus.map(sub => {
                const isSubActive = isExpanded && (sub.id === this.activeSubmenuId);
                const defaultHash = sub.tabs[0]?.hash || `/#/${mod.id}/${sub.id}`;
                return `
                  <a 
                    href="${defaultHash}" 
                    class="f-sb-sub-link ${isSubActive ? 'active' : ''}"
                    title="${sub.title}"
                    data-module-id="${mod.id}"
                    data-submenu-id="${sub.id}"
                    style="${isSubActive ? 'background: #00B4D8 !important; color: #0F172A !important; font-weight: 700; border-radius: 8px; margin: 2px 4px; padding: 7px 12px;' : 'color: #94A3B8; padding: 6px 12px; margin: 1px 4px;'}"
                  >
                    <span style="font-size: 11px; margin-right: 6px; opacity: ${isSubActive ? '1' : '0.6'};">•</span>
                    <span>${sub.title}</span>
                  </a>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }

      // Sitemap 02 (Pristine Superadmin) canonical rendering
      return `
        <div class="f-sb-grp ${isExpanded ? 'open' : ''}" data-mod-id="${mod.id}">
          <button class="f-sb-grp-btn sidebar-mod-btn" data-module-id="${mod.id}" title="${mod.title}">
            <i data-lucide="${iconName}"></i>
            <span>${mod.title}</span>
            <i data-lucide="chevron-down" class="f-sb-chev"></i>
          </button>
          <div class="f-sb-sub">
            <div class="f-sb-flyout-title">${mod.title}</div>
            ${mod.submenus.map(sub => {
              const isSubActive = isExpanded && (sub.id === this.activeSubmenuId);
              const defaultHash = sub.tabs[0]?.hash || `/#/${mod.id}/${sub.id}`;
              return `
                <a 
                  href="${defaultHash}" 
                  class="f-sb-sub-link ${isSubActive ? 'active' : ''}"
                  title="${sub.title}"
                  data-module-id="${mod.id}"
                  data-submenu-id="${sub.id}"
                >
                  <span>${sub.title}</span>
                </a>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  },

  bindEvents() {
    const modButtons = document.querySelectorAll('.sidebar-mod-btn');
    modButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const modId = btn.dataset.moduleId;
        const grp = btn.closest('.f-sb-grp');

        if (this.isCollapsed) {
          // If collapsed, expand first on button click
          this.toggleCollapse();
        }

        if (this.activeModuleId === modId && grp) {
          grp.classList.toggle('open');
          return;
        }

        this.activeModuleId = modId;
        const targetMod = NAV_HIERARCHY.find(m => m.id === modId);
        if (targetMod && targetMod.submenus.length > 0) {
          const firstSub = targetMod.submenus[0];
          const firstTab = firstSub.tabs[0];
          window.location.hash = firstTab.hash;
        }
      });
    });

    const edgeToggleBtn = document.getElementById('sidebar-edge-toggle-btn');
    if (edgeToggleBtn) {
      edgeToggleBtn.onclick = (e) => {
        e.stopPropagation();
        this.toggleCollapse();
      };
    }
  }
};
