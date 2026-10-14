#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Phase 3: Automated synchronization of standalone.html with the verified
21-screen Pre-Processing module, clean Home Welcome Board, and Breadcrumb fixes.
"""

import re

def sync_standalone():
    with open('standalone.html', 'r', encoding='utf-8') as f:
        content = f.read()

    print(f"Original standalone.html size: {len(content)} bytes")

    # 1. Update NAV_HIERARCHY preprocessing submenus & tabs
    old_preproc_nav = """  {
    id: "preprocessing",
    title: "Pre-Processing",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
    submenus: [
      {
        id: "dashboard",
        title: "Dashboard",
        defaultTab: "floor-overview",
        tabs: [
          { id: "floor-overview", label: "Floor Overview", hash: "#/preprocessing/dashboard/floor-overview" }
        ]
      },
      {
        id: "floor-operations",
        title: "Floor Operations",
        defaultTab: "receiving-sizing",
        tabs: [
          { id: "receiving-sizing", label: "RM Receiving & Sizing", hash: "#/preprocessing/floor-operations/receiving-sizing" },
          { id: "deheading-peeling", label: "Deheading & Peeling", hash: "#/preprocessing/floor-operations/deheading-peeling" },
          { id: "interplant-transfers", label: "Inter-Plant Transfers", hash: "#/preprocessing/floor-operations/interplant-transfers" }
        ]
      },
      {
        id: "chemical-inventory",
        title: "Chemical Inventory & Usage",
        defaultTab: "stock-receipts",
        tabs: [
          { id: "stock-receipts", label: "Stock & Receipts", hash: "#/preprocessing/chemical-inventory/stock-receipts" },
          { id: "daily-usage", label: "Daily Usage & Soaking", hash: "#/preprocessing/chemical-inventory/daily-usage" },
          { id: "supplier-settlements", label: "Supplier Settlements", hash: "#/preprocessing/chemical-inventory/supplier-settlements" }
        ]
      },
      {
        id: "traceability",
        title: "Traceability",
        defaultTab: "batch-traceability",
        tabs: [
          { id: "batch-traceability", label: "Batch Traceability", hash: "#/preprocessing/traceability/batch-traceability" },
          { id: "va-floor-balance", label: "VA Floor Balance", hash: "#/preprocessing/traceability/va-floor-balance" },
          { id: "yield-reconciliation", label: "Yield Reconciliation", hash: "#/preprocessing/traceability/yield-reconciliation" }
        ]
      }
    ]
  },"""

    new_preproc_nav = """  {
    id: "preprocessing",
    title: "Pre-Processing",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
    submenus: [
      {
        id: "dashboard",
        title: "Dashboard",
        defaultTab: "floor-overview",
        tabs: [
          { id: "floor-overview", label: "Floor Overview", hash: "#/preprocessing/dashboard/floor-overview" }
        ]
      },
      {
        id: "floor-operations",
        title: "Floor Operations",
        defaultTab: "rm-received",
        tabs: [
          { id: "rm-received", label: "RM Received Trackid", hash: "#/preprocessing/floor-operations/rm-received" },
          { id: "deheading", label: "Deheading", hash: "#/preprocessing/floor-operations/deheading" },
          { id: "grading", label: "Grading", hash: "#/preprocessing/floor-operations/grading" },
          { id: "deheading-trackid", label: "De-Heading Trackid", hash: "#/preprocessing/floor-operations/deheading-trackid" },
          { id: "grading-trackid", label: "Grading Trackid", hash: "#/preprocessing/floor-operations/grading-trackid" },
          { id: "value-addition", label: "Value Addition Trackid", hash: "#/preprocessing/floor-operations/value-addition" },
          { id: "hon-qty-transfer", label: "Hon Qty Transfer", hash: "#/preprocessing/floor-operations/hon-qty-transfer" }
        ]
      },
      {
        id: "chemical-inventory",
        title: "Chemical Inventory & Usage",
        defaultTab: "chemical-pos",
        tabs: [
          { id: "chemical-pos", label: "Chemical Pos", hash: "#/preprocessing/chemical-inventory/chemical-pos" },
          { id: "received-chemicals", label: "Received Chemicals", hash: "#/preprocessing/chemical-inventory/received-chemicals" },
          { id: "chemicals-consumption", label: "Consumption", hash: "#/preprocessing/chemical-inventory/chemicals-consumption" },
          { id: "chemical-received-report", label: "Received Report", hash: "#/preprocessing/chemical-inventory/chemical-received-report" },
          { id: "chemical-opening-balance", label: "Opening Balance", hash: "#/preprocessing/chemical-inventory/chemical-opening-balance" },
          { id: "chemical-balance-report", label: "Balance Report", hash: "#/preprocessing/chemical-inventory/chemical-balance-report" },
          { id: "chemical-payments-list", label: "Payments List", hash: "#/preprocessing/chemical-inventory/chemical-payments-list" }
        ]
      },
      {
        id: "traceability",
        title: "Traceability",
        defaultTab: "track-code-report",
        tabs: [
          { id: "track-code-report", label: "Track Code Report", hash: "#/preprocessing/traceability/track-code-report" },
          { id: "va-floor-balance", label: "VA Floor Balance", hash: "#/preprocessing/traceability/va-floor-balance" },
          { id: "va-transfer", label: "VA Transfer Report", hash: "#/preprocessing/traceability/va-transfer" },
          { id: "assumed-reports", label: "Assumed Reports", hash: "#/preprocessing/traceability/assumed-reports" },
          { id: "consolidation-daily", label: "Consolidation Report", hash: "#/preprocessing/traceability/consolidation-daily" },
          { id: "file-upload", label: "File Upload", hash: "#/preprocessing/traceability/file-upload" }
        ]
      }
    ]
  },"""

    if old_preproc_nav in content:
        content = content.replace(old_preproc_nav, new_preproc_nav)
        print("Updated NAV_HIERARCHY preprocessing in standalone.html")
    else:
        print("Warning: old_preproc_nav block not found in standalone.html, skipping")

    # 2. Update Breadcrumbs.render in standalone.html to suppress on #/home
    old_crumb_marker = """    if (customLeaf) {
      crumbs.push({ label: customLeaf, hash: null, active: true });
    }

    const html = `
      <nav class="flex items-center gap-1 text-xs select-none flex-wrap" aria-label="Breadcrumb">"""

    new_crumb_marker = """    if (!activeHash || activeHash === '#/home' || activeHash.startsWith('#/home')) {
      container.innerHTML = '';
      return;
    }

    if (customLeaf) {
      crumbs.push({ label: customLeaf, hash: null, active: true });
    }

    if (crumbs.length === 0) {
      container.innerHTML = '';
      return;
    }

    const html = `
      <nav class="flex items-center gap-1 text-xs select-none flex-wrap" aria-label="Breadcrumb">"""

    if old_crumb_marker in content:
        content = content.replace(old_crumb_marker, new_crumb_marker)
        print("Updated Breadcrumbs.render in standalone.html")

    # 3. Read updated js/views/homeView.js and adapt for standalone (no imports/exports)
    with open('js/views/homeView.js', 'r', encoding='utf-8') as f:
        home_js = f.read()
    home_js_clean = re.sub(r'import\s+.*?;\s*', '', home_js)
    home_js_clean = home_js_clean.replace('export const HomeView =', 'const HomeView =')

    home_pattern = re.compile(r'const HomeView = \{.*?^\};', re.MULTILINE | re.DOTALL)
    if home_pattern.search(content):
        content = home_pattern.sub(home_js_clean.strip(), content, count=1)
        print("Replaced HomeView in standalone.html")
    else:
        print("Warning: HomeView pattern not found in standalone.html")

    # 4. Read updated js/views/preprocessingView.js and adapt for standalone
    with open('js/views/preprocessingView.js', 'r', encoding='utf-8') as f:
        prep_js = f.read()
    prep_js_clean = re.sub(r'import\s+.*?;\s*', '', prep_js)
    prep_js_clean = prep_js_clean.replace('export const PreprocessingView =', 'const PreprocessingView =')
    # Remove window hook at bottom if duplicate
    prep_js_clean = re.sub(r'if \(typeof window !== \'undefined\'\) \{\s*window\.PreprocessingView = PreprocessingView;\s*\}', '', prep_js_clean)

    prep_pattern = re.compile(r'const PreprocessingView = \{.*?^const QCView =', re.MULTILINE | re.DOTALL)
    if prep_pattern.search(content):
        replacement = prep_js_clean.strip() + "\n\nconst QCView ="
        content = prep_pattern.sub(replacement, content, count=1)
        print("Replaced PreprocessingView in standalone.html")
    else:
        print("Warning: PreprocessingView pattern not found in standalone.html")

    with open('standalone.html', 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Sync complete. New standalone.html size: {len(content)} bytes")

if __name__ == '__main__':
    sync_standalone()
