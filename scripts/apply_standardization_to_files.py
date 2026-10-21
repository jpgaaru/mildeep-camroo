#!/usr/bin/env python3
# scripts/apply_standardization_to_files.py
"""
Applies the Purchase Base Design System to:
- miledeep-devi-fisheries.html
- standalone.html
- js/views/salesView.js
- js/views/preprocessingView.js
"""

import os, sys, re, subprocess
from uibase_code import get_uibase_code
from preprocessing_view_code import get_preprocessing_view_code
from sales_view_code import get_sales_view_code

def replace_object(content, obj_name, new_code):
    pattern = rf"((?:const|export const)\s+{obj_name}\s*=\s*\{{)"
    m = re.search(pattern, content)
    if not m:
        raise ValueError(f"Could not find const {obj_name} = {{")
    
    start_idx = m.start()
    open_brace_idx = m.end() - 1
    
    depth = 0
    end_idx = -1
    for i in range(open_brace_idx, len(content)):
        ch = content[i]
        if ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0:
                # Find trailing semicolon if present
                j = i + 1
                while j < len(content) and content[j] in (' ', '\t', '\r', '\n', ';'):
                    if content[j] == ';':
                        j += 1
                        break
                    j += 1
                end_idx = j
                break
                
    if end_idx == -1:
        raise ValueError(f"Could not find matching closing brace for {obj_name}")
        
    print(f"  ✓ Found {obj_name} from index {start_idx} to {end_idx} (len {end_idx - start_idx})")
    return content[:start_idx] + new_code + "\n" + content[end_idx:]

def apply_to_html_file(filename):
    print(f"\nProcessing {filename}...")
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Insert UIBase before PurchaseView if not already there
    uibase = get_uibase_code().strip()
    if "const UIBase = {" not in content:
        pv_idx = content.find("const PurchaseView = {")
        assert pv_idx != -1, f"Could not find const PurchaseView in {filename}"
        content = content[:pv_idx] + uibase + "\n\n" + content[pv_idx:]
        print("  ✓ Inserted UIBase before PurchaseView")
    else:
        print("  ✓ UIBase already exists")

    # 2. Replace PreprocessingView
    new_preproc = get_preprocessing_view_code().strip()
    content = replace_object(content, "PreprocessingView", new_preproc)
    print("  ✓ Replaced PreprocessingView with standardized version")

    # 3. Replace SalesView
    new_sales = get_sales_view_code().strip()
    content = replace_object(content, "SalesView", new_sales)
    print("  ✓ Replaced SalesView with standardized version")

    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  ✓ Saved {filename} successfully ({len(content)} bytes)")

def apply_to_modular_files():
    print("\nProcessing modular JS files...")
    uibase = get_uibase_code().strip()
    
    # 1. js/views/preprocessingView.js
    preproc_file = "js/views/preprocessingView.js"
    preproc_body = get_preprocessing_view_code().strip()
    # Convert 'const PreprocessingView =' to 'export const PreprocessingView ='
    preproc_body = preproc_body.replace("const PreprocessingView =", "export const PreprocessingView =")
    
    preproc_full = f"""// Pre-processing Operations View (Standardized with Purchase Base Design System)
import {{ Toast }} from '../components/toast.js';
import {{ Modal }} from '../components/modal.js';

{uibase}

{preproc_body}
"""
    with open(preproc_file, "w", encoding="utf-8") as f:
        f.write(preproc_full)
    print(f"  ✓ Updated {preproc_file}")

    # 2. js/views/salesView.js
    sales_file = "js/views/salesView.js"
    sales_body = get_sales_view_code().strip()
    # Convert 'const SalesView =' to 'export const SalesView ='
    sales_body = sales_body.replace("const SalesView =", "export const SalesView =")
    
    sales_full = f"""// Sales & Export Operations View (Standardized with Purchase Base Design System)
import {{ SalesDataStore }} from '../data/salesData.js';
import {{ Toast }} from '../components/toast.js';
import {{ Modal }} from '../components/modal.js';

{uibase}

{sales_body}
"""
    with open(sales_file, "w", encoding="utf-8") as f:
        f.write(sales_full)
    print(f"  ✓ Updated {sales_file}")

def main():
    apply_to_html_file("miledeep-devi-fisheries.html")
    apply_to_html_file("standalone.html")
    apply_to_modular_files()

    print("\n=== VALIDATING JAVASCRIPT SYNTAX IN UPDATED MODULAR FILES ===")
    for js in ["js/views/preprocessingView.js", "js/views/salesView.js"]:
        res = subprocess.run(["node", "-c", js], capture_output=True, text=True)
        assert res.returncode == 0, f"Syntax error in {js}: {res.stderr}"
        print(f"  ✓ {js} syntax OK!")

    print("\n========================================================")
    print("STANDARDIZATION APPLIED SUCCESSFULLY TO ALL 4 FILES! ✓")
    print("========================================================")

if __name__ == "__main__":
    main()
