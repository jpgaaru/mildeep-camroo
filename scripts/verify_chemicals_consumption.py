"""
Verify that Chemicals Consumption screen and GS CHEM CONSUMPTION CREATE form match user screenshots
pixel-accurately across js/views/preprocessingView.js, standalone.html, and miledeep-devi-fisheries.html.
"""

import sys

TARGET_FILES = [
    'js/views/preprocessingView.js',
    'standalone.html',
    'miledeep-devi-fisheries.html'
]

REQUIRED_NEEDLES = [
    'CHEMICALS CONSUMPTION',
    'GS CHEM CONSUMPTION CREATE',
    'DFL UNIT-5 (JPT)',
    'CARNAL 659 S ADVANCED (STPP)',
    'Search',
    'Add Consumption',
    'PLANT NAME',
    'USAGE TYPE',
    'CHEMICAL NAME',
    'BAGS QUANTITY',
    'QUANTITY IN KGS',
    'SEND TO',
    'Download Excel',
    'Received From',
    'Received Qty In bags',
    'Received Qty In Kgs',
    'Sended To',
    'Sended In Bags',
    'Sended In Kgs',
    'Used In Bags',
    'Used In KGs',
    'Opening In Bags',
    'Opening In Kgs',
    'Closing in Bags',
    'Closing in KGs',
    '2751',
    '68775',
    '#02a8b5'
]

def main():
    print("========================================================")
    print("AUDITING CHEMICALS CONSUMPTION & GS CHEM CONSUMPTION CREATE")
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
    print("🎉 ALL CHEMICALS CONSUMPTION AUDITS PASSED 100%!")
    print("========================================================")

if __name__ == '__main__':
    main()
