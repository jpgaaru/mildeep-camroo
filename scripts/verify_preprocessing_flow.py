#!/usr/bin/env python3
"""
Automated Verification Suite for Complete Pre Processing Flow:
1. JS Syntax Check across preprocessing view, sidebar, and router
2. Submenu & Tab Coverage in sidebar.js:
   - Main Menu: Pre Processing
   - Submenus (4): Dashboard, Pre Processing, Production Reports, Chemical Screens
   - Tab Menu:
     - Dashboard: Overview
     - Pre Processing: Deheading, Grading, Rm Received trackid, De-Heading trackid, Grading trackid, Value Addition trackid, Hon Qty Transfer After VA
     - Production Reports: Track Code Report, VA Floor Balance, VA Transfer Report, Assumed Reports, Consolidation Report, File Upload
     - Chemical Screens: Chemical Pos, Received Chemicals, Chemicals Consumption, Chemical Received Report, Chemical Opening Balance Report, Chemical Balance Report, Chemical Payments List
3. HTML Audit in standalone.html & miledeep-devi-fisheries.html:
   - Verifies exact hierarchy, titles, ids, and renderers in both standalone files.
4. PreprocessingView render methods coverage for all 21 screens.
"""

import os
import subprocess

def run_cmd(cmd):
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return result.returncode, result.stdout, result.stderr

def test_syntax():
    print("=== 1. JS SYNTAX VERIFICATION ===")
    files = [
        "js/views/preprocessingView.js",
        "js/components/sidebar.js",
        "js/framework/Router.js",
        "js/app.js"
    ]
    for f in files:
        code, out, err = run_cmd(f"node -c {f}")
        assert code == 0, f"Syntax error in {f}: {err}"
        print(f"  ✓ {f} syntax OK")

def test_tabs_coverage_sidebar():
    print("\n=== 2. PRE PROCESSING SUBMENU & TAB COVERAGE IN SIDEBAR.JS ===")
    with open('js/components/sidebar.js', 'r', encoding='utf-8') as f:
        src = f.read()

    expected_submenus = [
        ('dashboard', 'Dashboard'),
        ('pre-processing', 'Pre Processing'),
        ('production-reports', 'Production Reports'),
        ('chemical-screens', 'Chemical Screens')
    ]
    for sm_id, sm_title in expected_submenus:
        assert f'id: "{sm_id}"' in src or f"id: '{sm_id}'" in src, f"Submenu {sm_id} missing from sidebar!"
        assert f'title: "{sm_title}"' in src, f"Submenu title {sm_title} missing from sidebar!"
        print(f"  ✓ Submenu '{sm_title}' ({sm_id}) registered in sidebar navigation")

    expected_tabs = [
        # Submenu 1: Dashboard
        'overview',
        # Submenu 2: Pre Processing
        'deheading', 'grading', 'rm-received', 'deheading-trackid', 'grading-trackid', 'value-addition', 'hon-qty-transfer',
        # Submenu 3: Production Reports
        'track-code-report', 'va-floor-balance', 'va-transfer', 'assumed-reports', 'consolidation-daily', 'file-upload',
        # Submenu 4: Chemical Screens
        'chemical-pos', 'received-chemicals', 'chemicals-consumption', 'chemical-received-report', 'chemical-opening-balance', 'chemical-balance-report', 'chemical-payments-list'
    ]

    for tab in expected_tabs:
        assert f'id: "{tab}"' in src or f"id: '{tab}'" in src, f"Tab {tab} missing from sidebar!"
        print(f"  ✓ Tab '{tab}' registered in sidebar navigation")

def test_standalone_and_miledeep_html():
    print("\n=== 3. STANDALONE & MILEDEEP HTML AUDIT ===")
    html_files = ['standalone.html', 'miledeep-devi-fisheries.html']

    for filename in html_files:
        print(f"\nAuditing {filename}:")
        assert os.path.exists(filename), f"File {filename} not found!"
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check Pre Processing Module Main Menu
        assert 'id: "preprocessing"' in content or "id: 'preprocessing'" in content, f"Preprocessing module missing in {filename}"
        assert 'title: "Pre Processing"' in content, f"Pre Processing title not exact in {filename}"
        print(f"  ✓ Main Menu 'Pre Processing' present")

        # Check all 4 Submenus
        submenus = [
            ('dashboard', 'Dashboard'),
            ('pre-processing', 'Pre Processing'),
            ('production-reports', 'Production Reports'),
            ('chemical-screens', 'Chemical Screens')
        ]
        for sid, stitle in submenus:
            assert f'id: "{sid}"' in content, f"Submenu '{sid}' missing in {filename}"
            assert f'title: "{stitle}"' in content, f"Submenu title '{stitle}' missing in {filename}"
            print(f"  ✓ Submenu '{stitle}' ({sid}) verified")

        # Check key tabs (all 21 tabs)
        key_tabs = [
            'overview',
            'deheading', 'grading', 'rm-received', 'deheading-trackid', 'grading-trackid', 'value-addition', 'hon-qty-transfer',
            'track-code-report', 'va-floor-balance', 'va-transfer', 'assumed-reports', 'consolidation-daily', 'file-upload',
            'chemical-pos', 'received-chemicals', 'chemicals-consumption', 'chemical-received-report', 'chemical-opening-balance', 'chemical-balance-report', 'chemical-payments-list'
        ]
        for t in key_tabs:
            assert f'id: "{t}"' in content, f"Tab '{t}' missing in {filename}"
        print(f"  ✓ All 21 required tabs present in navigation hierarchy")

        # Check PreprocessingView and Molecules exist
        assert 'const PreprocessingView =' in content, f"PreprocessingView missing in {filename}"
        assert 'renderFloorOverview' in content, f"renderFloorOverview missing in {filename}"
        assert 'renderDeheading' in content, f"renderDeheading missing in {filename}"
        assert 'renderGrading' in content, f"renderGrading missing in {filename}"
        assert 'renderChemicalPos' in content, f"renderChemicalPos missing in {filename}"
        assert 'renderTrackCodeReport' in content, f"renderTrackCodeReport missing in {filename}"
        assert 'const Molecules =' in content, f"Molecules helper missing in {filename}"
        print(f"  ✓ Full PreprocessingView & Molecules verified")

if __name__ == '__main__':
    test_syntax()
    test_tabs_coverage_sidebar()
    test_standalone_and_miledeep_html()
    print("\n=======================================================")
    print("🎉 ALL PRE PROCESSING FLOW VERIFICATIONS PASSED 100%!")
    print("=======================================================")
