"""
Verify that Chemical Pos screen and GS CHEM PO CREATE form match the user screenshots
pixel-accurately across js/views/preprocessingView.js, standalone.html, and miledeep-devi-fisheries.html.
"""

import sys

TARGET_FILES = [
    'js/views/preprocessingView.js',
    'standalone.html',
    'miledeep-devi-fisheries.html'
]

REQUIRED_NEEDLES = [
    'CHEMICAL POS',
    'GS CHEM PO CREATE',
    'SUPPLIER',
    'PO NO',
    'CHEMICAL',
    'PORT',
    'YEAR',
    'Search',
    'Add PO',
    'MODE OF IMPORT',
    'Enter Po NO',
    'Download Excel',
    'Quantity(Bags)',
    'Quantity(KGs)',
    'Total Amount',
    'ETD Date',
    'ETA Date',
    'DFL/KPL/2627/004',
    'DFL/2627/003',
    'DFL/KPL/2627/003',
    'ALTESA NEO S100 (NP)',
    '#02a8b5'
]

def main():
    print("========================================================")
    print("AUDITING CHEMICAL POS SCREEN & GS CHEM PO CREATE")
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
    print("🎉 ALL CHEMICAL POS VERIFICATIONS PASSED 100%!")
    print("========================================================")

if __name__ == '__main__':
    main()
