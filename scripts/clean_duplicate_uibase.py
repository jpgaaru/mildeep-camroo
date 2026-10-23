#!/usr/bin/env python3
"""
Removes duplicate UIBase declarations from miledeep-devi-fisheries.html and standalone.html.
"""

target_start = "showLotTraceabilityDrawer"
target_end = "const PreprocessingView = {"

replacement = """showLotTraceabilityDrawer(lot) {
    Toast.show(`Lot traceability drawer opened for ${lot.lotNumber || lot.no || 'Lot'}`, 'info');
  }
};

// =========================================================================
// PRE-PROCESSING MODULE (STANDARDIZED WITH PURCHASE BASE DESIGN SYSTEM)
// =========================================================================
const PreprocessingView = {"""

for fn in ['miledeep-devi-fisheries.html', 'standalone.html']:
    with open(fn, 'r', encoding='utf-8') as f:
        content = f.read()

    idx1 = content.find(target_start)
    assert idx1 != -1, f"target_start not found in {fn}"
    idx2 = content.find(target_end, idx1)
    assert idx2 != -1, f"target_end not found in {fn}"

    new_content = content[:idx1] + replacement + content[idx2 + len(target_end):]

    with open(fn, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Successfully cleaned duplicate UIBase in {fn}")
