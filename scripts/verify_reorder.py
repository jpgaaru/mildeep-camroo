import re, os, subprocess

def main():
    print("=== 1. CHECKING JAVASCRIPT SYNTAX ===")
    js_files = ["js/components/sidebar.js", "js/framework/Router.js", "js/app.js"]
    for js in js_files:
        res = subprocess.run(["node", "-c", js], capture_output=True, text=True)
        assert res.returncode == 0, f"Syntax error in {js}: {res.stderr}"
        print(f"  ✓ {js} syntax OK")

    print("\n=== 2. VERIFYING MODULE ORDER IN SIDEBAR FILES ===")
    test_files = [
        ("miledeep-devi-fisheries.html", "ADMIN_NAV_HIERARCHY"),
        ("standalone.html", "NAV_HIERARCHY"),
        ("js/components/sidebar.js", "NAV_HIERARCHY")
    ]

    for filename, var_name in test_files:
        with open(filename, "r", encoding="utf-8") as f:
            content = f.read()

        # Extract module ids in order
        pattern = rf"(?:const|export const) {var_name} = \[(.*?)\];"
        match = re.search(pattern, content, re.DOTALL)
        assert match, f"Could not find {var_name} in {filename}"

        arr_body = match.group(1)
        # Find top-level module ids by matching id with 2 spaces indentation
        mod_ids = re.findall(r"\n  \{\s*\n    id:\s*[\"']([a-zA-Z0-9_\-]+)[\"']", arr_body)

        top_3 = mod_ids[:3]
        print(f"  ✓ {filename} module sequence: {mod_ids}")
        assert top_3 == ["sales", "purchase", "preprocessing"], f"Unexpected top 3 in {filename}: {top_3}"

    print("\n=== 3. VERIFYING SUBMENUS AND TABS ===")
    for filename, _ in test_files:
        with open(filename, "r", encoding="utf-8") as f:
            content = f.read()

        # Check Sales
        assert 'id: "sales"' in content
        assert 'id: "orders"' in content
        # Check Purchase
        assert 'id: "purchase"' in content
        assert 'id: "purchase-ops"' in content
        # Check Preprocessing
        assert 'id: "preprocessing"' in content
        print(f"  ✓ {filename} key module submenus verified")

    print("\n========================================================")
    print("ALL SIDEBAR REORDER VERIFICATIONS PASSED SUCCESSFULLY! ✓")
    print("========================================================")

if __name__ == "__main__":
    main()
