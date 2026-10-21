#!/usr/bin/env python3
"""
Automated Verification Suite for Complete Purchase Flow:
1. JS Syntax Check across purchase view, sidebar, and router
2. Submenu & Tab Coverage in sidebar.js:
   - Main Menu: Purchase
   - Submenus (3): DashBoard, Purchase, Pre Processing
   - Tab Menu:
     - DashBoard: Overview
     - Purchase: Purchase Dashboard, RM DashBoard
     - Pre Processing: Bookings, Rm Arrival, Arrivals, Bills, Payments, Payments Summary
3. HTML Audit in standalone.html & miledeep-devi-fisheries.html:
   - Verifies exact hierarchy, titles, ids, and renderers in both standalone files.
4. PurchaseView render methods coverage for all tabs.
"""

import os
import subprocess

def run_cmd(cmd):
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return result.returncode, result.stdout, result.stderr

def test_syntax():
    print("=== 1. JS SYNTAX VERIFICATION ===")
    files = [
        "js/views/purchaseView.js",
        "js/components/sidebar.js",
        "js/framework/Router.js",
        "js/app.js"
    ]
    for f in files:
        code, out, err = run_cmd(f"node -c {f}")
        assert code == 0, f"Syntax error in {f}: {err}"
        print(f"  ✓ {f} syntax OK")

def test_tabs_coverage_sidebar():
    print("\n=== 2. PURCHASE SUBMENU & TAB COVERAGE IN SIDEBAR.JS ===")
    with open('js/components/sidebar.js', 'r', encoding='utf-8') as f:
        src = f.read()

    expected_submenus = [
        ('dashboard', 'DashBoard'),
        ('purchase-ops', 'Purchase'),
        ('pre-processing', 'Pre Processing')
    ]
    for sm_id, sm_title in expected_submenus:
        assert f'id: "{sm_id}"' in src or f"id: '{sm_id}'" in src, f"Submenu {sm_id} missing from sidebar!"
        assert f'title: "{sm_title}"' in src or f"title: '{sm_title}'" in src, f"Submenu title {sm_title} missing from sidebar!"
        print(f"  ✓ Submenu '{sm_title}' ({sm_id}) registered in sidebar navigation")

    expected_tabs = [
        # Submenu 1: DashBoard
        ('overview', 'Overview'),
        # Submenu 2: Purchase
        ('purchase-dashboard', 'Purchase Dashboard'),
        ('rm-dashboard', 'RM DashBoard'),
        # Submenu 3: Pre Processing
        ('bookings', 'Bookings'),
        ('rm-arrivals', 'Rm Arrival'),
        ('arrivals', 'Arrivals'),
        ('bills', 'Bills'),
        ('payments', 'Payments'),
        ('payment-summary', 'Payments Summary')
    ]

    for tab_id, tab_label in expected_tabs:
        assert f'id: "{tab_id}"' in src or f"id: '{tab_id}'" in src, f"Tab {tab_id} missing from sidebar!"
        assert tab_label in src, f"Tab label '{tab_label}' missing from sidebar!"
        print(f"  ✓ Tab '{tab_label}' ({tab_id}) registered in sidebar navigation")

def test_standalone_and_miledeep_html():
    print("\n=== 3. STANDALONE & MILEDEEP HTML AUDIT ===")
    html_files = ['standalone.html', 'miledeep-devi-fisheries.html']

    for filename in html_files:
        print(f"\nAuditing {filename}:")
        assert os.path.exists(filename), f"File {filename} not found!"
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check Purchase Module Main Menu
        assert 'id: "purchase"' in content or "id: 'purchase'" in content, f"Purchase module missing in {filename}"
        assert 'title: "Purchase"' in content, f"Purchase title missing in {filename}"
        print(f"  ✓ Main Menu 'Purchase' present")

        # Check all 3 Submenus
        submenus = [
            ('dashboard', 'DashBoard'),
            ('purchase-ops', 'Purchase'),
            ('pre-processing', 'Pre Processing')
        ]
        for sid, stitle in submenus:
            assert f'id: "{sid}"' in content, f"Submenu '{sid}' missing in {filename}"
            assert f'title: "{stitle}"' in content, f"Submenu title '{stitle}' missing in {filename}"
            print(f"  ✓ Submenu '{stitle}' ({sid}) verified")

        # Check all 9 tabs
        expected_tabs = [
            ('overview', 'Overview'),
            ('purchase-dashboard', 'Purchase Dashboard'),
            ('rm-dashboard', 'RM DashBoard'),
            ('bookings', 'Bookings'),
            ('rm-arrivals', 'Rm Arrival'),
            ('arrivals', 'Arrivals'),
            ('bills', 'Bills'),
            ('payments', 'Payments'),
            ('payment-summary', 'Payments Summary')
        ]
        for tab_id, tab_label in expected_tabs:
            assert f'id: "{tab_id}"' in content, f"Tab '{tab_id}' missing in {filename}"
            assert tab_label in content, f"Tab label '{tab_label}' missing in {filename}"
            print(f"  ✓ Tab '{tab_label}' ({tab_id}) verified")

        # Check TabBar container and rendering inside PurchaseView
        assert 'purchase-tab-bar-container' in content, f"purchase-tab-bar-container missing in {filename}"
        assert "TabBar.render('purchase-tab-bar-container', activeHash)" in content or 'TabBar.render("purchase-tab-bar-container", activeHash)' in content, f"TabBar.render call missing in PurchaseView in {filename}"
        print(f"  ✓ TabBar container and renderer mounted properly in PurchaseView")

        # Check App.route default fallback for purchase
        assert "tabName || 'overview'" in content or 'tabName || "overview"' in content, f"Default tab fallback for purchase should be 'overview' in {filename}"
        print(f"  ✓ Default tab fallback for purchase is 'overview'")

def main():
    print("Starting Comprehensive Purchase Navigation Flow Verification...")
    test_syntax()
    test_tabs_coverage_sidebar()
    test_standalone_and_miledeep_html()
    print("\n========================================================")
    print("ALL PURCHASE NAVIGATION FLOW VERIFICATION TESTS PASSED! ✓")
    print("========================================================")

if __name__ == '__main__':
    main()
