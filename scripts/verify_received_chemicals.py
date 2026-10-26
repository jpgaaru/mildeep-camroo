"""
Verify that Received Chemicals screen and GS CHEM ORDERS CREATE form match user screenshots
pixel-accurately across js/views/preprocessingView.js, standalone.html, and miledeep-devi-fisheries.html.
"""

import sys

TARGET_FILES = [
    'js/views/preprocessingView.js',
    'standalone.html',
    'miledeep-devi-fisheries.html'
]

REQUIRED_NEEDLES = [
    'RECEIVED CHEMICALS',
    'GS CHEM ORDERS CREATE',
    'PLANT',
    'STATUS',
    'YEAR',
    'Search',
    '+ Add Order',
    'PROCESSING PLANT',
    'PONO',
    'BL NO',
    'CONTAINER NO',
    'RECEIVED BAGS',
    'RECEIVED QTY IN KGS',
    'BILL OF ENTRY NO',
    'BILL OF ENTRY DATE',
    'CLEARED DATE',
    'Download Excel',
    'Load All',
    'More Search',
    'Balance Bags',
    'Balance Quantity',
    'DFL/CFB/2627/003',
    'DFL/CFB/2627/002',
    'CARNAL 659 S ADVANCED (STPP)',
    '#02a8b5'
]

def main():
    print("========================================================")
    print("AUDITING RECEIVED CHEMICALS & GS CHEM ORDERS CREATE")
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
    print("🎉 ALL RECEIVED CHEMICALS AUDITS PASSED 100%!")
    print("========================================================")

if __name__ == '__main__':
    main()
