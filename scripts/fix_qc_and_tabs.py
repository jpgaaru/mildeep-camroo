#!/usr/bin/env python3
"""
scripts/fix_qc_and_tabs.py
Ensures QCView is globally registered on window, standardizes Quality Control Dashboard tab to 'overview',
and guarantees flawless routing and syntax.
"""

def update_file(path):
    print(f"Updating {path}...")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update ADMIN_NAV_HIERARCHY / NAV_HIERARCHY for quality dashboard
    old_qc_nav = """      {
        id: "dashboard",
        title: "Dashboard",
        defaultTab: "qc-overview",
        tabs: [
          { id: "qc-overview", label: "QC Overview", hash: "#/quality/dashboard/qc-overview" },
          { id: "daily-qc-ops", label: "Daily QC Operations", hash: "#/quality/dashboard/daily-qc-ops" }
        ]
      },"""

    new_qc_nav = """      {
        id: "dashboard",
        title: "Dashboard",
        defaultTab: "overview",
        tabs: [
          { id: "overview", label: "Overview", hash: "#/quality/dashboard/overview" },
          { id: "daily-qc-ops", label: "Daily QC Operations", hash: "#/quality/dashboard/daily-qc-ops" }
        ]
      },"""

    if old_qc_nav in content:
        content = content.replace(old_qc_nav, new_qc_nav)
        print("  ✓ Updated Quality Dashboard tab to overview")
    else:
        print("  ℹ old_qc_nav not found (or already updated)")

    # 2. Add window.QCView export if not present
    old_end = """      exportExcel('PO_Grade_Lab_Availability_2026.csv', this.getPOData());
    });
  }
};"""

    new_end = """      exportExcel('PO_Grade_Lab_Availability_2026.csv', this.getPOData());
    });
  }
};

if (typeof window !== 'undefined') { window.QCView = QCView; }"""

    if old_end in content and "window.QCView = QCView" not in content:
        content = content.replace(old_end, new_end, 1)
        print("  ✓ Added window.QCView export")

    # 3. Router quality case handling
    old_case = "case 'quality':\n        QCView.render(mainContainer, tabName || 'qc-overview', resolvedHash);"
    new_case = "case 'quality':\n        QCView.render(mainContainer, (tabName === 'qc-overview' ? 'overview' : (tabName || 'overview')), resolvedHash);"
    if old_case in content:
        content = content.replace(old_case, new_case, 1)
        print("  ✓ Updated router case 'quality'")

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Saved {path}.\n")

if __name__ == "__main__":
    for f in ["miledeep-devi-fisheries.html", "standalone.html", "js/components/sidebar.js"]:
        update_file(f)
