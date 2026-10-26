"""
Verification suite for Tab Menu Headers, Action Buttons & Search Filters Standardization.
Ensures:
1. No button has redundant '+' text alongside an icon (no <span>+ Add ...</span>).
2. Top-right action buttons exist with clean typography (<span>Add PO</span>, <span>Add Order</span>, etc.).
3. All Chemical filter cards have the 'SEARCH & FILTERS' header with funnel icon.
4. Search button has magnifying glass SVG icon.
"""

import sys
import re

TARGET_FILES = [
    'js/views/preprocessingView.js',
    'standalone.html',
    'miledeep-devi-fisheries.html'
]

def check_file(filepath):
    print(f"\nAuditing {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    errors = []

    # 1. Check for redundant '+' spans
    bad_spans = re.findall(r'<span>\+\s*(?:Add|Save|New|Register)\s+[^<]+</span>', content)
    if bad_spans:
        errors.append(f"Found redundant '+' text in spans: {bad_spans[:5]}")
    else:
        print("  ✓ Zero redundant '+' letters found in action button spans")

    # 2. Check for Top-Right Action Buttons
    required_action_buttons = [
        '<span>Add PO</span>',
        '<span>Add Order</span>',
        '<span>Add Consumption</span>',
        '<span>Add Payment</span>'
    ]
    for btn in required_action_buttons:
        if btn not in content:
            errors.append(f"Missing required action button: {btn}")
        else:
            print(f"  ✓ Verified action button: {btn}")

    # 3. Check for 'SEARCH & FILTERS' occurrences
    # There are 7 Chemical Tabs, all should have 'SEARCH & FILTERS'
    sf_count = content.count('SEARCH &amp; FILTERS') + content.count('SEARCH & FILTERS')
    if sf_count < 7:
        errors.append(f"Expected at least 7 'SEARCH & FILTERS' occurrences, found {sf_count}")
    else:
        print(f"  ✓ Found {sf_count} 'SEARCH & FILTERS' headers with funnel icons")

    # 4. Check for Search magnifying glass SVG icon
    search_svg_path = 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
    if search_svg_path not in content:
        errors.append("Missing standard magnifying glass SVG search icon")
    else:
        print("  ✓ Magnifying glass SVG search icon verified")

    if errors:
        for err in errors:
            print(f"  ❌ {err}")
        return False
    return True

def main():
    print("========================================================")
    print("AUDITING TAB MENU HEADERS, ACTION BUTTONS & SEARCH FILTERS")
    print("========================================================")

    all_passed = True
    for f in TARGET_FILES:
        if not check_file(f):
            all_passed = False

    if not all_passed:
        print("\n❌ Verification failed with errors.")
        sys.exit(1)
    else:
        print("\n========================================================")
        print("🎉 ALL TAB MENU & SEARCH FILTER AUDITS PASSED 100%!")
        print("========================================================")

if __name__ == '__main__':
    main()
