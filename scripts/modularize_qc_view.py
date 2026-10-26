import re

with open('js/views/qcView.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Lines 1 to 80: Header & Dispatcher
# Lines 81 to 934: Overview
# Lines 935 to 2979: Lab
# Lines 2980 to 3311: Operations
# Lines 3312 to 4241: Screening

dispatch_lines = lines[7:79]  # inside render() up to end of render
overview_lines = lines[80:934]
lab_lines = lines[934:2979]
operations_lines = lines[2979:3311]
screening_lines = lines[3311:4241]

# 1. Write qcOverview.js
with open('js/views/qc/overview/qcOverview.js', 'w', encoding='utf-8') as f:
    f.write("// Quality Control — Overview Submodule\n")
    f.write("export const qcOverview = {\n")
    for l in overview_lines:
        f.write(l)
    f.write("\n};\n")

# 2. Write qcLab.js
with open('js/views/qc/lab/qcLab.js', 'w', encoding='utf-8') as f:
    f.write("// Quality Control — QC Lab Submodule\n")
    f.write("export const qcLab = {\n")
    for l in lab_lines:
        f.write(l)
    f.write("\n};\n")

# 3. Write qcOperations.js
with open('js/views/qc/operations/qcOperations.js', 'w', encoding='utf-8') as f:
    f.write("// Quality Control — QC Operations Submodule\n")
    f.write("export const qcOperations = {\n")
    for l in operations_lines:
        f.write(l)
    f.write("\n};\n")

# 4. Write qcScreening.js
with open('js/views/qc/screening/qcScreening.js', 'w', encoding='utf-8') as f:
    f.write("// Quality Control — Chemical Screening Submodule\n")
    f.write("export const qcScreening = {\n")
    for l in screening_lines:
        f.write(l)
    f.write("\n};\n")

# 5. Write index.js
with open('js/views/qc/index.js', 'w', encoding='utf-8') as f:
    f.write("""// Quality Control — Master Domain Controller & Orchestrator
import { qcOverview } from './overview/qcOverview.js';
import { qcLab } from './lab/qcLab.js';
import { qcOperations } from './operations/qcOperations.js';
import { qcScreening } from './screening/qcScreening.js';

export const QCView = {
  activeTab: 'qc-overview',
  lotSearchQuery: '',
  poSearchQuery: '',
  labFilter: 'All',

  render(containerId, subPage = 'qc-overview', activeHash = '#/quality/dashboard/qc-overview') {
""")
    for l in dispatch_lines:
        f.write(l)
    f.write("""
};

// Compose all feature domain submodules into unified QCView
Object.assign(
  QCView,
  qcOverview,
  qcLab,
  qcOperations,
  qcScreening
);

if (typeof window !== 'undefined') {
  window.QCView = QCView;
}
""")

print("QCView modularized successfully!")
