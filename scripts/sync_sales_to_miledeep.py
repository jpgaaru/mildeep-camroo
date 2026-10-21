#!/usr/bin/env python3
"""
Synchronizes the updated Sales module from standalone.html into miledeep-devi-fisheries.html:
1. Sales navigation hierarchy in ADMIN_NAV_HIERARCHY:
   - Main Menu: Sales
   - Sales Sub Menu: DashBoard, Orders, Payments, Insurance, Report
   - Tabs:
     - DashBoard: Overview
     - Orders: Proforma List, Custom Invoices, ISF Details, Shipping Bill, Commercial Invoice, ETA Status, FDA Status, Clearing Agent, Delayed shipments
     - Payments: Forward Contracts, Collections, Negotiations, Realization, Realization Done
     - Insurance: Pending Insurance, Insurance Templates, Insurance Payments
     - Report: Sales Summary, Payment Status, Inventory Report
2. INITIAL_SALES_DATA + SalesDataStore:
   - Master data collections and storage helpers with safe Environment fallback.
3. Full SalesView component:
   - Interactive UI with tabs, statistics, tables, action buttons, drawers, and modals.
"""

def main():
    with open('standalone.html', 'r', encoding='utf-8') as f:
        standalone = f.read()

    with open('miledeep-devi-fisheries.html', 'r', encoding='utf-8') as f:
        miledeep = f.read()

    # 1. Extract Store Block from standalone.html
    start_store = standalone.find('// Sales & Export Operations Data Store')
    idx_store_end = standalone.find('const SalesDataStore = {')
    end_store = standalone.find('};\n\n', idx_store_end) + 2
    store_block = standalone[start_store:end_store]

    # Ensure store_block has safe guard for Environment
    safe_store_block = store_block.replace(
        'return Environment.isSitemap01() ? SALES_STORAGE_KEY_S01 : SALES_STORAGE_KEY_S02;',
        'if (typeof Environment !== \'undefined\' && typeof Environment.isSitemap01 === \'function\') {\n      return Environment.isSitemap01() ? SALES_STORAGE_KEY_S01 : SALES_STORAGE_KEY_S02;\n    }\n    return SALES_STORAGE_KEY_S01;'
    )

    # 2. Extract View Block from standalone.html
    start_view = standalone.find('const SalesView = {')
    end_view = standalone.find('const ReportsView = {', start_view)
    view_block = standalone[start_view:end_view]

    # Ensure view_block has safe guard for Environment
    safe_view_block = view_block.replace(
        'const isS01 = Environment.isSitemap01();',
        'const isS01 = typeof Environment !== \'undefined\' && typeof Environment.isSitemap01 === \'function\' ? Environment.isSitemap01() : false;'
    )

    # Also update standalone.html with safe guards if needed
    if 'typeof Environment !== \'undefined\'' not in standalone:
        updated_standalone = standalone.replace(
            'return Environment.isSitemap01() ? SALES_STORAGE_KEY_S01 : SALES_STORAGE_KEY_S02;',
            'if (typeof Environment !== \'undefined\' && typeof Environment.isSitemap01 === \'function\') {\n      return Environment.isSitemap01() ? SALES_STORAGE_KEY_S01 : SALES_STORAGE_KEY_S02;\n    }\n    return SALES_STORAGE_KEY_S01;'
        ).replace(
            'const isS01 = Environment.isSitemap01();',
            'const isS01 = typeof Environment !== \'undefined\' && typeof Environment.isSitemap01 === \'function\' ? Environment.isSitemap01() : false;'
        )
        with open('standalone.html', 'w', encoding='utf-8') as f:
            f.write(updated_standalone)
        print("Updated standalone.html with safe Environment guards.")

    # 3. Target Sales Nav Block
    sales_nav_code = """  {
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
  },\n"""

    # Replace nav in miledeep
    m_nav_sales_start = miledeep.find('  {\n    id: "sales",\n    title: "Sales & Exports",')
    m_nav_reports_start = miledeep.find('  {\n    id: "reports",', m_nav_sales_start)
    assert m_nav_sales_start != -1 and m_nav_reports_start != -1, "Nav sales block not found in miledeep-devi-fisheries.html"

    miledeep = miledeep[:m_nav_sales_start] + sales_nav_code + miledeep[m_nav_reports_start:]
    print("Nav sales block replaced successfully in miledeep-devi-fisheries.html")

    # Replace placeholder SalesView in miledeep
    m_view_start = miledeep.find('const SalesView = {')
    m_reports_view_start = miledeep.find('const ReportsView = {', m_view_start)
    assert m_view_start != -1 and m_reports_view_start != -1, "SalesView placeholder not found in miledeep-devi-fisheries.html"

    miledeep = miledeep[:m_view_start] + safe_view_block + miledeep[m_reports_view_start:]
    print("SalesView replaced successfully in miledeep-devi-fisheries.html")

    # Insert Data Store block before `  // Components`
    m_store_insert = miledeep.find('  // Components\n  // Atlassian Design System Toast Notifications')
    assert m_store_insert != -1, "Component insertion point not found in miledeep-devi-fisheries.html"

    store_insertion_text = "\n" + safe_store_block + "\n\n"
    miledeep = miledeep[:m_store_insert] + store_insertion_text + miledeep[m_store_insert:]
    print("Store block inserted successfully into miledeep-devi-fisheries.html")

    with open('miledeep-devi-fisheries.html', 'w', encoding='utf-8') as f:
        f.write(miledeep)

    print("miledeep-devi-fisheries.html written successfully!")

if __name__ == '__main__':
    main()
