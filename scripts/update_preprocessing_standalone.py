#!/usr/bin/env python3
import re

def update_standalone():
    with open('standalone.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update NAV_HIERARCHY preprocessing section
    old_nav = """  {
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
        defaultTab: "receiving-sorting",
        tabs: [
          { id: "receiving-sorting", label: "Receiving & Sorting", hash: "#/preprocessing/floor-operations/receiving-sorting" },
          { id: "preprocessing-tasks", label: "Pre-Processing Tasks", hash: "#/preprocessing/floor-operations/preprocessing-tasks" }
        ]
      },
      {
        id: "chemical-inventory",
        title: "Chemical Inventory & Usage",
        defaultTab: "chemical-stock",
        tabs: [
          { id: "chemical-stock", label: "Chemical Stock", hash: "#/preprocessing/chemical-inventory/chemical-stock" },
          { id: "usage-logs", label: "Usage Logs", hash: "#/preprocessing/chemical-inventory/usage-logs" }
        ]
      },
      {
        id: "traceability",
        title: "Traceability",
        defaultTab: "batch-traceability",
        tabs: [
          { id: "batch-traceability", label: "Batch Traceability Logs", hash: "#/preprocessing/traceability/batch-traceability" }
        ]
      }
    ]
  },"""

    new_nav = """  {
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

    if old_nav in content:
        content = content.replace(old_nav, new_nav)
        print("Updated NAV_HIERARCHY in standalone.html")
    else:
        print("Warning: old_nav pattern not matched exactly in standalone.html")

    # 2. Update SECTION_METADATA_REGISTRY
    old_meta = """  preprocessing: {
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
  },"""

    new_meta = """  preprocessing: {
    dashboard: {
      title: 'Pre-Processing Floor',
      subtitle: 'De-heading, grading, peeling lines, and yield recovery telemetry'
    },
    'floor-operations': {
      title: 'Floor Operations',
      subtitle: 'Intake sizing, roller grader lines, deheading yields, and inter-plant transfers'
    },
    'chemical-inventory': {
      title: 'Chemical Inventory & Usage',
      subtitle: 'Customs inward, STPP/non-phosphate bath dosage logs, and supplier settlements'
    },
    traceability: {
      title: 'Traceability & Reconciliation',
      subtitle: 'Pond-to-pack genealogical audit, floor balance matrix, and packaging yield'
    }
  },"""

    if old_meta in content:
        content = content.replace(old_meta, new_meta)
        print("Updated SECTION_METADATA_REGISTRY in standalone.html")
    else:
        print("Warning: old_meta pattern not matched exactly in standalone.html")

    # 3. Read PREPROCESSING_DATA and PreprocessingView source code
    with open('js/data/preprocessingData.js', 'r', encoding='utf-8') as f:
        pre_data_src = f.read().replace('export const PREPROCESSING_DATA =', 'const PREPROCESSING_DATA =')

    with open('js/views/preprocessingView.js', 'r', encoding='utf-8') as f:
        pre_view_src = f.read()

    # Clean ES module imports and exports from PreprocessingView
    pre_view_clean = re.sub(r'import\s+.*?;\s*\n', '', pre_view_src)
    pre_view_clean = re.sub(r'export\s+const\s+PreprocessingView\s*=', 'const PreprocessingView =', pre_view_clean)

    inlined_code = f"""
// ============================================================================
// PRE-PROCESSING MODULE (AQUAOPS INTEGRATED FOR DEVI FISHERIES LIMITED)
// ============================================================================

{pre_data_src}

{pre_view_clean}
"""

    # Replace the old empty PreprocessingView definition
    old_view_pattern = re.compile(r'const\s+PreprocessingView\s*=\s*\{.*?renderEmptyState\(.*?\n\s*\}\s*;\s*\n', re.DOTALL)
    if old_view_pattern.search(content):
        content = old_view_pattern.sub(inlined_code, content, count=1)
        print("Replaced PreprocessingView in standalone.html with full implementation")
    else:
        print("Warning: could not find old PreprocessingView pattern in standalone.html")

    with open('standalone.html', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Successfully updated standalone.html!")

if __name__ == '__main__':
    update_standalone()
