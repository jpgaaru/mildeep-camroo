#!/usr/bin/env python3
"""
scripts/update_preprocessing_three_submenus.py

Implements user request:
"in preprocessign main menu - it has only three options - dashboard, operations, chemical screens
- dashboard will have all the summary of the data in form od data visalaisttion and metrics
- the operations has tab menu:
  Deheading
  Grading
  Rm Received trackid 
  De-Heading trackid 
  Grading trackid 
  Value Addition trackid 
  Hon Qty Transfer After VA
- the chemical screen has tab menu:
  Chemical Pos
  Received Chemicals
  Chemicals Consumption
  Chemical Received Report
  Chemical Opening Balance Report
  Chemical Balance Report
  Chemical Payments List"
"""

import os
import re

PREPROCESSING_NAV_OBJECT = """  {
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
        id: "operations",
        title: "Operations",
        defaultTab: "deheading",
        tabs: [
          { id: "deheading", label: "Deheading", hash: "#/preprocessing/operations/deheading" },
          { id: "grading", label: "Grading", hash: "#/preprocessing/operations/grading" },
          { id: "rm-received", label: "Rm Received trackid", hash: "#/preprocessing/operations/rm-received" },
          { id: "deheading-trackid", label: "De-Heading trackid", hash: "#/preprocessing/operations/deheading-trackid" },
          { id: "grading-trackid", label: "Grading trackid", hash: "#/preprocessing/operations/grading-trackid" },
          { id: "value-addition", label: "Value Addition trackid", hash: "#/preprocessing/operations/value-addition" },
          { id: "hon-qty-transfer", label: "Hon Qty Transfer After VA", hash: "#/preprocessing/operations/hon-qty-transfer" }
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
  }"""

def update_sidebar():
    with open("js/components/sidebar.js", "r", encoding="utf-8") as f:
        src = f.read()

    # Locate preprocessing block in NAV_HIERARCHY
    pattern = r'\{\s*id:\s*["\']preprocessing["\'][\s\S]*?submenus:\s*\[[\s\S]*?\}\s*\]\s*\}'
    src = re.sub(pattern, PREPROCESSING_NAV_OBJECT, src)

    with open("js/components/sidebar.js", "w", encoding="utf-8") as f:
        f.write(src)
    print("  ✓ Updated js/components/sidebar.js")

def update_router():
    with open("js/framework/Router.js", "r", encoding="utf-8") as f:
        src = f.read()

    new_preproc_router = """  preprocessing: {
    dashboard: {
      title: 'Pre-Processing Dashboard',
      subtitle: 'Summary telemetry, throughput metrics, recovery yields, and floor analytics'
    },
    operations: {
      title: 'Operations',
      subtitle: 'Intake sizing, roller grader lines, deheading yields, and inter-plant transfers'
    },
    'pre-processing': {
      title: 'Operations',
      subtitle: 'Intake sizing, roller grader lines, deheading yields, and inter-plant transfers'
    },
    'chemical-screens': {
      title: 'Chemical Screens',
      subtitle: 'Customs inward, STPP/non-phosphate bath dosage logs, and supplier settlements'
    }
  },"""

    pattern = r'preprocessing:\s*\{[\s\S]*?\n  \},'
    src = re.sub(pattern, new_preproc_router, src)

    with open("js/framework/Router.js", "w", encoding="utf-8") as f:
        f.write(src)
    print("  ✓ Updated js/framework/Router.js")

def update_tabbar():
    with open("js/components/tabBar.js", "r", encoding="utf-8") as f:
        src = f.read()

    # Add operations alias fallback if subId is 'pre-processing'
    old_code = "if (!submenu) return null;"
    new_code = """if (!submenu && modId === 'preprocessing' && (subId === 'pre-processing' || subId === 'floor-operations')) {
      submenu = module.submenus.find(s => s.id === 'operations');
    }
    if (!submenu) return null;"""

    if "subId === 'pre-processing'" not in src:
        src = src.replace(old_code, new_code, 1)

    with open("js/components/tabBar.js", "w", encoding="utf-8") as f:
        f.write(src)
    print("  ✓ Updated js/components/tabBar.js with operations alias")

if __name__ == "__main__":
    print("=================================================================")
    print("CONFIGURING PREPROCESSING 3-OPTION MAIN MENU HIERARCHY")
    print("=================================================================")
    update_sidebar()
    update_router()
    update_tabbar()
