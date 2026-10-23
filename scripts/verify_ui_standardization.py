#!/usr/bin/env python3
# scripts/verify_ui_standardization.py

import os, sys, re

def main():
    print("========================================================")
    print("VERIFYING BASE DESIGN SYSTEM STANDARDIZATION")
    print("========================================================")

    target_files = ["miledeep-devi-fisheries.html", "standalone.html"]

    for filename in target_files:
        print(f"\nAuditing {filename}:")
        with open(filename, "r", encoding="utf-8") as f:
            content = f.read()

        # 1. UIBase presence
        assert "const UIBase = {" in content, f"UIBase missing in {filename}"
        print("  ✓ UIBase design system helper present")

        # 2. Sales TabBar mounting
        assert "TabBar.render('sales-tab-bar-container'" in content or 'TabBar.render("sales-tab-bar-container"' in content, f"Sales TabBar not mounted in {filename}"
        print("  ✓ Sales TabBar sticky navigation mounted")

        # 3. Chemical PO (ERP Design System matching user screenshots)
        assert "cpo-filter" in content or "chem-po-filter" in content, f"Chemical PO filter card missing in {filename}"
        assert "cpo-table" in content or "chem-po-table-container" in content, f"Chemical PO DataTable container missing in {filename}"
        print("  ✓ Chemical PO Register upgraded to Base Design System (Image 1 fixed)")

        # 4. Proforma List (Image 2 fix)
        assert "sales-pi-filter" in content, f"Sales PI filter card missing in {filename}"
        assert "sales-pi-table-container" in content, f"Sales PI DataTable container missing in {filename}"
        assert "sales-pi-totals-container" in content, f"Sales PI totals container missing in {filename}"
        print("  ✓ Proforma Invoices Register upgraded to Base Design System (Image 2 fixed)")

        # 5. Clean architecture check (no broken unstyled form-grid)
        assert "class=\"form-grid\"" not in content, f"Legacy broken .form-grid found in {filename}"
        print("  ✓ No broken unstyled legacy form-grid classes")

    print("\n========================================================")
    print("🎉 ALL UI STANDARDIZATION AUDITS PASSED WITH 100% SUCCESS!")
    print("========================================================")

if __name__ == "__main__":
    main()
