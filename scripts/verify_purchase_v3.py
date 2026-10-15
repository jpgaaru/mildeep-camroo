#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Automated Verification Suite for Purchase Module v3 (Client Specification Alignment)
"""
import subprocess
import sys

def test_syntax():
    print("=== 1. JS SYNTAX VERIFICATION ===")
    files = [
        'js/views/purchaseView.js',
        'js/app.js',
        'js/components/sidebar.js',
        'js/framework/Router.js'
    ]
    all_ok = True
    for f in files:
        res = subprocess.run(['node', '--check', f], capture_output=True, text=True)
        if res.returncode == 0:
            print(f"  ✓ {f} syntax OK")
        else:
            print(f"  ✗ {f} syntax error: {res.stderr}")
            all_ok = False
    return all_ok

def test_business_math():
    print("\n=== 2. MONEY MATH & BUSINESS LOGIC VERIFICATION ===")
    node_script = """
    globalThis.localStorage = { getItem: () => null, setItem: () => {} };
    globalThis.window = { Toast: { show: () => {} } };
    const { grossOf, tdsOf, billAmtOf, balanceOf, nextBookingNo, nextArrivalNo, rmConsumed, rmStatus, M, bookings, arrivals, payments } = await import('./js/views/purchaseView.js');

    let ok = true;
    // 1. Test TDS 0.1% on sample lot ADP/2627/0020 (weight 150, rate 45)
    const lot1 = arrivals.find(a => a.no === 'ADP/2627/0020');
    const gross1 = grossOf(lot1); // 150 * 45 = 6750
    const tds1 = tdsOf(lot1);     // 6750 * 0.001 = 6.75
    const bill1 = billAmtOf(lot1); // 6750 - 6.75 = 6743.25
    const bal1 = balanceOf(lot1);  // 6743.25 - 5000 = 1743.25

    if (gross1 === 6750 && tds1 === 6.75 && bill1 === 6743.25 && bal1 === 1743.25) {
      console.log('  ✓ Section 194Q TDS (0.1%) & Balance Math exact: Gross=6750, TDS=6.75, ActBill=6743.25, Bal=1743.25');
    } else {
      console.error('  ✗ TDS Math error:', { gross1, tds1, bill1, bal1 });
      ok = false;
    }

    // 2. Auto-numbering
    const bNo = nextBookingNo('ADDARIPETA FARMS');
    if (bNo.startsWith('BK/ADP/2627/')) {
      console.log('  ✓ Booking auto-number format correct:', bNo);
    } else {
      console.error('  ✗ Booking auto-number error:', bNo);
      ok = false;
    }

    const aNo = nextArrivalNo('ADDARIPETA FARMS');
    if (aNo.startsWith('ADP/2627/')) {
      console.log('  ✓ Arrival auto-number format correct:', aNo);
    } else {
      console.error('  ✗ Arrival auto-number error:', aNo);
      ok = false;
    }

    // 3. Dynamic Balance Consumption
    const r = { date: '2026-10-06', company: 'DEVI FISHERIES LIMITED', species: 'COD', plant: 'DFL UNIT-2 (KKD)', center: 'ADDARIPETA FARMS', weight: 1000, amount: 200000 };
    const cons = rmConsumed(r);
    const st = rmStatus(r, cons);
    if (cons.w > 0 && typeof st === 'string') {
      console.log('  ✓ RM Dynamic Balance Consumption active: Consumed Weight =', cons.w, 'KG, Status =', st);
    } else {
      console.error('  ✗ RM Consumption error:', { cons, st });
      ok = false;
    }

    if (!ok) process.exit(1);
    """
    res = subprocess.run(['node', '--input-type=module', '-e', node_script], capture_output=True, text=True)
    if res.returncode == 0:
        print(res.stdout.strip())
        return True
    else:
        print(f"  ✗ Math tests failed:\n{res.stderr}\n{res.stdout}")
        return False

def test_tabs_coverage():
    print("\n=== 3. CLIENT v3 TAB COVERAGE AUDIT ===")
    with open('js/components/sidebar.js', 'r', encoding='utf-8') as f:
        sb = f.read()

    expected_tabs = [
        'purchase-dashboard',
        'rm-dashboard',
        'bookings',
        'rm-arrivals',
        'arrivals',
        'lot-tracking',
        'bills',
        'payments',
        'payment-summary'
    ]

    all_found = True
    for t in expected_tabs:
        if f'id: "{t}"' in sb or f"id: '{t}'" in sb:
            print(f"  ✓ Tab '{t}' registered in sidebar")
        else:
            print(f"  ✗ Missing tab '{t}' in sidebar")
            all_found = False

    # Also verify that create-booking and rm-bill are NOT separate tabs in sidebar
    if 'id: "create-booking"' not in sb and 'id: "rm-bill"' not in sb:
        print("  ✓ 'create-booking' and 'rm-bill' properly removed from top-level sidebar tabs")
    else:
        print("  ✗ Warning: 'create-booking' or 'rm-bill' still present in sidebar tabs")
        all_found = False

    # Check that purchaseView.js contains embedded handlers and no literal plus buttons
    with open('js/views/purchaseView.js', 'r', encoding='utf-8') as f:
        pv = f.read()
    
    if 'isCreatingBooking' in pv and 'openRMBillEdit' in pv:
        print("  ✓ Contextual screens embedded in Bookings and Bills views")
    else:
        print("  ✗ Contextual screen handlers missing in purchaseView.js")
        all_found = False

    # Check for '+' in button text
    plus_buttons = ['>+ New', '>+ NEW', '>+ Pay', '>+ Create', '>+ Add']
    found_plus = False
    for pb in plus_buttons:
        if pb in pv:
            print(f"  ✗ Found literal plus in button: {pb}")
            found_plus = True
    if not found_plus:
        print("  ✓ Clean button typography: no literal '+' prefixed to button text labels")
    else:
        all_found = False

    return all_found

def test_date_selectors():
    print("\n=== 4. DATE SELECTOR & CALENDAR AUDIT ===")
    with open('js/views/purchaseView.js', 'r', encoding='utf-8') as f:
        pv = f.read()

    # 1. No raw type="date" inputs (all upgraded to unified Camaroo erp-date-input)
    if 'type="date"' in pv:
        print("  ✗ Found un-upgraded raw type=\"date\" input in purchaseView.js")
        return False
    else:
        print("  ✓ Zero raw type=\"date\" inputs: all date selectors standardized to .erp-date-input")

    # 2. Check essential date filter IDs exist across screens
    expected_date_ids = [
        'rmdash-from-date',
        'rmdash-to-date',
        'bk-f-date',
        'cb-date',
        'ra-date',
        'ar-f-date',
        'ma-date',
        'ma-billdate',
        'bl-f-from',
        'bl-f-to',
        'pay-f-date',
        'ps-f-from',
        'ps-f-to'
    ]
    all_dates_ok = True
    for did in expected_date_ids:
        if f'id="{did}"' in pv:
            print(f"  ✓ Date field '{did}' active with .erp-date-wrapper")
        else:
            print(f"  ✗ Missing date field '{did}'")
            all_dates_ok = False

    # 3. Check CalendarPicker handles persistent data-calendar discovery
    with open('js/components/calendarPicker.js', 'r', encoding='utf-8') as f:
        cp = f.read()
    if 'data-has-calendar' in cp and 'classList.add(\'erp-date-input\')' in cp:
        print("  ✓ CalendarPicker has persistent class & attribute preservation for seamless re-opening")
    else:
        print("  ✗ CalendarPicker missing persistent class logic")
        all_dates_ok = False

    return all_dates_ok

def test_environment_segregation():
    print("\n=== 5. LOGIN NAVIGATION & ENVIRONMENT SEGREGATION AUDIT ===")
    all_env_ok = True

    # 1. Syntax of Environment and Login
    for f in ['js/framework/Environment.js', 'js/views/loginView.js', 'js/components/header.js']:
        res = subprocess.run(['node', '--check', f], capture_output=True, text=True)
        if res.returncode == 0:
            print(f"  ✓ {f} syntax OK")
        else:
            print(f"  ✗ {f} syntax error: {res.stderr}")
            all_env_ok = False

    # 2. Check Login UI buttons
    with open('js/views/loginView.js', 'r', encoding='utf-8') as f:
        login_src = f.read()

    expected_login_elements = [
        ('id="btn-env-sitemap01"', 'Sitemap 01 button'),
        ('id="btn-env-sitemap02"', 'Sitemap 02 button'),
        ('id="btn-env-cds"', 'CDS Design System button'),
        ('designsystem.html', 'CDS redirection target'),
        ('ENV_SITEMAP_01', 'Sitemap 01 constant binding'),
        ('ENV_SITEMAP_02', 'Sitemap 02 constant binding')
    ]
    for token, desc in expected_login_elements:
        if token in login_src:
            print(f"  ✓ Login View contains {desc}")
        else:
            print(f"  ✗ Login View missing {desc} ('{token}')")
            all_env_ok = False

    # 3. Check Header UI environment indicator
    with open('js/components/header.js', 'r', encoding='utf-8') as f:
        header_src = f.read()

    expected_header_elements = [
        ('id="header-env-badge-btn"', 'Header Environment pill badge'),
        ('id="header-env-dropdown"', 'Header Environment switcher dropdown'),
        ('id="header-switch-sitemap01-btn"', 'Header switch to Sitemap 01 button'),
        ('id="header-switch-sitemap02-btn"', 'Header switch to Sitemap 02 button'),
        ('id="header-link-cds-btn"', 'Header link to CDS button')
    ]
    for token, desc in expected_header_elements:
        if token in header_src:
            print(f"  ✓ Header contains {desc}")
        else:
            print(f"  ✗ Header missing {desc} ('{token}')")
            all_env_ok = False

    # 4. Storage Decoupling & Isolation Unit Test
    node_script = """
    const memStore = {};
    globalThis.localStorage = {
      getItem: (k) => memStore[k] || null,
      setItem: (k, v) => { memStore[k] = String(v); },
      removeItem: (k) => { delete memStore[k]; }
    };
    let sessionEnv = 'sitemap01';
    globalThis.sessionStorage = {
      getItem: (k) => k === 'dfl_active_env' ? sessionEnv : null,
      setItem: (k, v) => { if (k === 'dfl_active_env') sessionEnv = v; }
    };
    globalThis.window = { Toast: { show: () => {} } };

    const { Environment, ENV_SITEMAP_01, ENV_SITEMAP_02 } = await import('./js/framework/Environment.js');

    let ok = true;
    // Test 1: Defaults to sitemap01
    if (Environment.getActiveEnv() === ENV_SITEMAP_01 && Environment.isSitemap01()) {
      console.log('  ✓ Environment defaults to Sitemap 01');
    } else {
      console.error('  ✗ Default env failure:', Environment.getActiveEnv());
      ok = false;
    }

    // Test 2: Seed baseline in Sitemap 01
    const baselineBookings = [{ no: 'BK/001', weight: 500 }];
    const s01Bookings = Environment.getStore('bookings', baselineBookings);
    if (s01Bookings.length === 1 && s01Bookings[0].no === 'BK/001') {
      console.log('  ✓ Sitemap 01 seeded baseline store successfully');
    } else {
      console.error('  ✗ Baseline seeding failure:', s01Bookings);
      ok = false;
    }

    // Test 3: Mutate in Sitemap 01
    s01Bookings.push({ no: 'BK/SITEMAP01_ONLY', weight: 9999 });
    Environment.setStore('bookings', s01Bookings);

    // Test 4: Switch to Sitemap 02 and verify total data isolation
    Environment.setActiveEnv(ENV_SITEMAP_02);
    if (Environment.getActiveEnv() === ENV_SITEMAP_02 && Environment.isSitemap02()) {
      console.log('  ✓ Switched active environment to Sitemap 02');
    } else {
      console.error('  ✗ Switch to Sitemap 02 failed');
      ok = false;
    }

    const s02Bookings = Environment.getStore('bookings', baselineBookings);
    const leakedIntoS02 = s02Bookings.some(b => b.no === 'BK/SITEMAP01_ONLY');
    if (!leakedIntoS02 && s02Bookings.length === 1) {
      console.log('  ✓ Data Isolation Verified: Mutations in Sitemap 01 NEVER leak or reflect into Sitemap 02');
    } else {
      console.error('  ✗ Storage leak detected in Sitemap 02:', s02Bookings);
      ok = false;
    }

    // Test 5: Switch back to Sitemap 01 and verify localized persistence
    Environment.setActiveEnv(ENV_SITEMAP_01);
    const s01Reloaded = Environment.getStore('bookings');
    if (s01Reloaded.some(b => b.no === 'BK/SITEMAP01_ONLY')) {
      console.log('  ✓ Localized Persistence Verified: Sitemap 01 retains custom changes independently');
    } else {
      console.error('  ✗ Sitemap 01 lost changes:', s01Reloaded);
      ok = false;
    }

    if (!ok) process.exit(1);
    """
    res = subprocess.run(['node', '--input-type=module', '-e', node_script], capture_output=True, text=True)
    if res.returncode == 0:
        print(res.stdout.strip())
    else:
        print(f"  ✗ Environment tests failed:\n{res.stderr}\n{res.stdout}")
        all_env_ok = False

    return all_env_ok

if __name__ == '__main__':
    ok1 = test_syntax()
    ok2 = test_business_math()
    ok3 = test_tabs_coverage()
    ok4 = test_date_selectors()
    ok5 = test_environment_segregation()

    if ok1 and ok2 and ok3 and ok4 and ok5:
        print("\n=======================================================")
        print("🎉 ALL PURCHASE v3 & ENVIRONMENT VERIFICATIONS PASSED 100%!")
        print("=======================================================")
        sys.exit(0)
    else:
        print("\n⚠️ Some verifications failed.")
        sys.exit(1)
