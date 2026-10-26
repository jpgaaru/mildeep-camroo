import re
import os

with open('js/views/preprocessingView.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total preprocessing lines: {len(lines)}")

# 1. Base design system helpers (lines 1 to 633)
base_lines = lines[:633]

# 2. PreprocessingView header and dispatcher (lines 634 to 988)
# Line 634 is 'export const PreprocessingView = {'
dispatch_lines = lines[633:988]

# 3. Overview (lines 989 to 1578)
overview_lines = lines[988:1578]

# 4. Chemicals (lines 1579 to 3604)
chemicals_lines = lines[1578:3604]

# 5. Operations (lines 3605 to 5838)
operations_lines = lines[3604:5838]

# 6. Traceability (lines 5839 to 5920)
traceability_lines = lines[5838:5920]

# 7. Modals (lines 5921 to end)
modals_lines = lines[5920:]

# Upgrade modal sizes in modals_lines
modals_text = "".join(modals_lines)

# Upgrade each modal's size
# openChemPOModal: 6xl
modals_text = re.sub(
    r"(openChemPOModal\s*\([^\)]*\)\s*\{[\s\S]*?title:\s*isEdit\s*\?\s*['\"]GS CHEM PO EDIT['\"]\s*:\s*['\"]GS CHEM PO CREATE['\"],\s*\n\s*)size:\s*['\"]lg['\"]",
    r"\1size: '6xl'",
    modals_text
)

# openChemOrderModal: 4xl
modals_text = re.sub(
    r"(openChemOrderModal\s*\([^\)]*\)\s*\{[\s\S]*?title:\s*isEdit\s*\?\s*['\"]GS CHEM ORDERS EDIT['\"]\s*:\s*['\"]GS CHEM ORDERS CREATE['\"],\s*\n\s*)size:\s*['\"]lg['\"]",
    r"\1size: '4xl'",
    modals_text
)

# openChemConsumptionModal: 4xl
modals_text = re.sub(
    r"(openChemConsumptionModal\s*\([^\)]*\)\s*\{[\s\S]*?title:\s*isEdit\s*\?\s*['\"]GS CHEM CONSUMPTION EDIT['\"]\s*:\s*['\"]GS CHEM CONSUMPTION CREATE['\"],\s*\n\s*)size:\s*['\"]lg['\"]",
    r"\1size: '4xl'",
    modals_text
)

# openChemPaymentModal: 4xl
modals_text = re.sub(
    r"(openChemPaymentModal\s*\([^\)]*\)\s*\{[\s\S]*?title:\s*isEdit\s*\?\s*['\"]GS CHEM PO PAYMENT EDIT['\"]\s*:\s*['\"]GS CHEM PO PAYMENT CREATE['\"],\s*\n\s*)size:\s*['\"]lg['\"]",
    r"\1size: '4xl'",
    modals_text
)

# openDeheadingModal: 4xl
modals_text = re.sub(
    r"(openDeheadingModal\s*\([^\)]*\)\s*\{[\s\S]*?title:\s*isEdit\s*\?\s*['\"]EDIT DE-HEADING RECORD['\"]\s*:\s*['\"]CREATE DE-HEADING RECORD['\"],\s*\n\s*)size:\s*['\"]lg['\"]",
    r"\1size: '4xl'",
    modals_text
)

# openGradingModal: 4xl
modals_text = re.sub(
    r"(openGradingModal\s*\([^\)]*\)\s*\{[\s\S]*?title:\s*isEdit\s*\?\s*['\"]EDIT GRADING RECORD['\"]\s*:\s*['\"]CREATE GRADING RECORD['\"],\s*\n\s*)size:\s*['\"]lg['\"]",
    r"\1size: '4xl'",
    modals_text
)

# openValueAdditionModal: 4xl
modals_text = re.sub(
    r"(openValueAdditionModal\s*\([^\)]*\)\s*\{[\s\S]*?title:\s*isEdit\s*\?\s*['\"]EDIT VALUE ADDITION RECORD['\"]\s*:\s*['\"]CREATE VALUE ADDITION RECORD['\"],\s*\n\s*)size:\s*['\"]lg['\"]",
    r"\1size: '4xl'",
    modals_text
)

# openGradingTrackLineModal: 4xl
modals_text = re.sub(
    r"(openGradingTrackLineModal\s*\([^\)]*\)\s*\{[\s\S]*?title:\s*isEdit\s*\?\s*['\"]EDIT GRADING SIZE LINE['\"]\s*:\s*['\"]ADD GRADING SIZE LINE['\"],\s*\n\s*)size:\s*['\"]lg['\"]",
    r"\1size: '4xl'",
    modals_text
)

# openDeheadingTrackidModal: 4xl
modals_text = re.sub(
    r"(openDeheadingTrackidModal\s*\([^\)]*\)\s*\{[\s\S]*?title:\s*isEdit\s*\?\s*['\"]EDIT DE-HEADING TRACK ID['\"]\s*:\s*['\"]ADD DE-HEADING TRACK ID['\"],\s*\n\s*)size:\s*['\"]lg['\"]",
    r"\1size: '4xl'",
    modals_text
)

# Write Base
os.makedirs('js/views/preprocessing/base', exist_ok=True)
with open('js/views/preprocessing/base/preprocessingBase.js', 'w', encoding='utf-8') as f:
    f.write("// Pre-processing Module — Design System Base & Utilities\n")
    for l in base_lines:
        fixed_l = l.replace("from '../data/", "from '../../../data/")\
                   .replace("from '../components/", "from '../../../components/")\
                   .replace("from '../framework/", "from '../../../framework/")
        f.write(fixed_l)

# Write Overview
with open('js/views/preprocessing/overview/preprocessingOverview.js', 'w', encoding='utf-8') as f:
    f.write("// Pre-processing Module — Floor Overview & Telemetry Dashboard\n")
    f.write("export const preprocessingOverview = {\n")
    for l in overview_lines:
        f.write(l)
    f.write("\n};\n")

# Write Chemicals
with open('js/views/preprocessing/chemicals/preprocessingChemicals.js', 'w', encoding='utf-8') as f:
    f.write("// Pre-processing Module — Chemical Inventory & Reports\n")
    f.write("export const preprocessingChemicals = {\n")
    for l in chemicals_lines:
        f.write(l)
    f.write("\n};\n")

# Write Operations
with open('js/views/preprocessing/operations/preprocessingOperations.js', 'w', encoding='utf-8') as f:
    f.write("// Pre-processing Module — Floor Operations & Line Logs\n")
    f.write("export const preprocessingOperations = {\n")
    for l in operations_lines:
        f.write(l)
    f.write("\n};\n")

# Write Traceability
with open('js/views/preprocessing/traceability/preprocessingTraceability.js', 'w', encoding='utf-8') as f:
    f.write("// Pre-processing Module — Traceability & Reconciliation\n")
    f.write("export const preprocessingTraceability = {\n")
    for l in traceability_lines:
        f.write(l)
    f.write("\n};\n")

# Write Modals
with open('js/views/preprocessing/modals/preprocessingModals.js', 'w', encoding='utf-8') as f:
    f.write("// Pre-processing Module — Table Edit Modals (Standardized Sizes & Form Grids)\n")
    f.write("export const preprocessingModals = {\n")
    f.write(modals_text.rstrip().rstrip(';').rstrip('}') + "\n};\n")

# Write Index
with open('js/views/preprocessing/index.js', 'w', encoding='utf-8') as f:
    f.write("""// Pre-processing Module — Master Domain Controller & Orchestrator
import './base/preprocessingBase.js';
import { preprocessingOverview } from './overview/preprocessingOverview.js';
import { preprocessingChemicals } from './chemicals/preprocessingChemicals.js';
import { preprocessingOperations } from './operations/preprocessingOperations.js';
import { preprocessingTraceability } from './traceability/preprocessingTraceability.js';
import { preprocessingModals } from './modals/preprocessingModals.js';

export const PreprocessingView = {
""")
    # skip 'export const PreprocessingView = {' in dispatch_lines
    for l in dispatch_lines[1:]:
        f.write(l)
    f.write("""
};

// Compose all feature domain submodules into unified PreprocessingView
Object.assign(
  PreprocessingView,
  preprocessingOverview,
  preprocessingChemicals,
  preprocessingOperations,
  preprocessingTraceability,
  preprocessingModals
);

if (typeof window !== 'undefined') {
  window.PreprocessingView = PreprocessingView;
}
""")

print("PreprocessingView modularized and upgraded successfully!")
