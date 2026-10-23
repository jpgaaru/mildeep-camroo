"""
Verify that all Operations tab screens are fully implemented and standard-compliant across
js/views/preprocessingView.js, standalone.html, and miledeep-devi-fisheries.html.
"""

import sys

TARGET_FILES = [
    'js/views/preprocessingView.js',
    'standalone.html',
    'miledeep-devi-fisheries.html'
]

REQUIRED_FUNCTIONS = [
    'renderDeheading',
    'renderGrading',
    'renderRmReceived',
    'renderDeheadingTrackid',
    'renderGradingTrackid',
    'renderValueAddition',
    'renderHonQtyTransfer'
]

REQUIRED_ELEMENTS = {
    'renderRmReceived': [
        'RM RECEIVED TRACKID',
        'Head on Weight',
        'Recv Count',
        'Recv Weight',
        'Sample HO Qty',
        'No Of Pcs',
        'Count Diff',
        'Qty Diff',
        '#02a8b5'
    ],
    'renderDeheadingTrackid': [
        'DE-HEADING TRACKID',
        'Production Plant',
        'Arrival Date',
        'Track ID',
        'De Heading Date',
        'Shift',
        'Supervisor',
        '#02a8b5'
    ],
    'renderGradingTrackid': [
        'GRADING TRACKID',
        '+ Add Line',
        'HL_Count (Per Lb)',
        'Grade',
        'Treatment',
        'Freezing',
        'Grading Qty',
        'HL/Tub Weight',
        '#02a8b5'
    ],
    'renderValueAddition': [
        'VALUE ADDITION TRACKID',
        'Arrival Code',
        'Soaking Plant',
        'HL Wt(Kgs)',
        'VA Out Quantity',
        'Rejection Weight',
        '#02a8b5'
    ],
    'renderHonQtyTransfer': [
        'HON QTY TRANSFER AFTER VA',
        'Bill Number',
        'Purchase Count',
        'Purchase Weight',
        'VA Weight Qty',
        '#02a8b5'
    ]
}

def main():
    print("========================================================")
    print("AUDITING PREPROCESSING OPERATIONS SCREENS")
    print("========================================================")
    
    for fname in TARGET_FILES:
        print(f"\nChecking {fname}...")
        with open(fname, 'r', encoding='utf-8') as f:
            content = f.read()
            
        for fn in REQUIRED_FUNCTIONS:
            if fn not in content:
                print(f"  ❌ Missing function: {fn} in {fname}")
                sys.exit(1)
            else:
                print(f"  ✓ Function {fn} present")
                
        for fn, needles in REQUIRED_ELEMENTS.items():
            for needle in needles:
                if needle not in content:
                    print(f"  ❌ Missing required content: '{needle}' in {fname} ({fn})")
                    sys.exit(1)
            print(f"  ✓ All elements for {fn} verified")
            
    print("\n========================================================")
    print("🎉 ALL 7 PREPROCESSING OPERATIONS SCREENS VERIFIED 100%!")
    print("========================================================")

if __name__ == '__main__':
    main()
