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
        'create-booking',
        'rm-arrivals',
        'arrivals',
        'lot-tracking',
        'bills',
        'rm-bill',
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
    return all_found

if __name__ == '__main__':
    ok1 = test_syntax()
    ok2 = test_business_math()
    ok3 = test_tabs_coverage()

    if ok1 and ok2 and ok3:
        print("\n==========================================")
        print("🎉 ALL PURCHASE v3 VERIFICATIONS PASSED 100%!")
        print("==========================================")
        sys.exit(0)
    else:
        print("\n⚠️ Some verifications failed.")
        sys.exit(1)
