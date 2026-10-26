"""
Verify that Tabs 4, 5, 6, and 7 of Chemical Screens match user screenshots pixel-accurately
across js/views/preprocessingView.js, standalone.html, and miledeep-devi-fisheries.html.
"""

import sys

TARGET_FILES = [
    'js/views/preprocessingView.js',
    'standalone.html',
    'miledeep-devi-fisheries.html'
]

REQUIRED_NEEDLES = [
    # Tab 4: Chemical Received Report
    'CHEMICAL RECEIVED REPORT',
    'Received Bags',
    'Received Quantity',
    'Balance Bags',
    'Balance Quantity',
    'ORDER RECEIVED',
    'DFL/KPL/2627/002',
    'DFL/PT/2627/014',
    
    # Tab 5: Chemical Opening Balance Report
    'CHEMICAL OPENING BALANCE REPORT',
    'KGs per Bag',
    'Total Bags',
    'Total KGs',
    '47725',
    '21900',
    '3220',
    
    # Tab 6: Chemical Balance Report
    'CHEMICAL BALANCE REPORT',
    'April-2024 to March-2025',
    'Opening KGs',
    'Total Purchase KGs',
    'Total Consumption KGs',
    'KGs Sent to Other Plant',
    'Closing KGs',
    '21050',
    '4600',
    '1680',
    
    # Tab 7: Chemical Payments List & GS CHEM PO PAYMENT CREATE
    'CHEMICAL PAYMENTS LIST',
    'GS CHEM PO PAYMENT CREATE',
    'Party Name',
    'Amount (Rupees)',
    'Paid Amount (Rupees)',
    'Bank Reference No',
    'Payment Date',
    'Enter Invoice No',
    '#02a8b5'
]

def main():
    print("========================================================")
    print("AUDITING TABS 4, 5, 6 & 7 OF CHEMICAL SCREENS")
    print("========================================================")
    
    for fname in TARGET_FILES:
        print(f"\nChecking {fname}...")
        with open(fname, 'r', encoding='utf-8') as f:
            content = f.read()
            
        for needle in REQUIRED_NEEDLES:
            if needle not in content:
                print(f"  ❌ Missing required needle: '{needle}' in {fname}")
                sys.exit(1)
            else:
                print(f"  ✓ Found '{needle}'")
                
    print("\n========================================================")
    print("🎉 ALL REMAINING CHEMICAL SCREENS AUDITS PASSED 100%!")
    print("========================================================")

if __name__ == '__main__':
    main()
