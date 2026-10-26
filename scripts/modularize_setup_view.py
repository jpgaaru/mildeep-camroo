import re
import os

with open('js/views/setupView.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total setup lines: {len(lines)}")

# 1. State: lines 1 to 4462
state_lines = lines[:4462]

# 2. Dispatcher: lines 4463 to 4592
dispatch_lines = lines[4462:4592]

# 3. Company: lines 4593 to 4836
company_lines = lines[4592:4836]

# 4. Users: lines 4837 to 5047
users_lines = lines[4836:5047]

# 5. Roles: lines 5048 to 5168
roles_lines = lines[5047:5168]

# 6. Studio: lines 5169 to 5536
studio_lines = lines[5168:5536]

# 7. Forms: lines 5537 to 5818
forms_lines = lines[5536:5818]

# 8. Logs: lines 5819 to end
logs_lines = lines[5818:]

# 1. Write State
with open('js/views/setup/state/setupState.js', 'w', encoding='utf-8') as f:
    f.write("// Setup Module — Canonical Master Data & Configuration Schema\n")
    for l in state_lines:
        fixed_l = l.replace("from '../data/", "from '../../../data/")\
                   .replace("from '../components/", "from '../../../components/")\
                   .replace("from '../framework/", "from '../../../framework/")\
                   .replace("function getInitialStudioState()", "export function getInitialStudioState()")
        f.write(fixed_l)

# 2. Write Company
with open('js/views/setup/company/setupCompany.js', 'w', encoding='utf-8') as f:
    f.write("// Setup Module — Company Setup & Processing Plants\n")
    f.write("export const setupCompany = {\n")
    for l in company_lines:
        f.write(l)
    f.write("\n};\n")

# 3. Write Users
with open('js/views/setup/users/setupUsers.js', 'w', encoding='utf-8') as f:
    f.write("// Setup Module — User Management & ERP Personas\n")
    f.write("export const setupUsers = {\n")
    for l in users_lines:
        f.write(l)
    f.write("\n};\n")

# 4. Write Roles
with open('js/views/setup/roles/setupRoles.js', 'w', encoding='utf-8') as f:
    f.write("// Setup Module — Roles & Permissions Matrix\n")
    f.write("export const setupRoles = {\n")
    for l in roles_lines:
        f.write(l)
    f.write("\n};\n")

# 5. Write Studio
with open('js/views/setup/studio/setupStudio.js', 'w', encoding='utf-8') as f:
    f.write("// Setup Module — Dynamic Module & Tab Studio\n")
    f.write("export const setupStudio = {\n")
    for l in studio_lines:
        f.write(l)
    f.write("\n};\n")

# 6. Write Forms
with open('js/views/setup/forms/setupForms.js', 'w', encoding='utf-8') as f:
    f.write("// Setup Module — Dynamic Field & Form Builder\n")
    f.write("export const setupForms = {\n")
    for l in forms_lines:
        f.write(l)
    f.write("\n};\n")

# 7. Write Logs
with open('js/views/setup/logs/setupLogs.js', 'w', encoding='utf-8') as f:
    f.write("// Setup Module — Audit & Configuration Logs\n")
    f.write("export const setupLogs = {\n")
    logs_text = "".join(logs_lines)
    f.write(logs_text.rstrip().rstrip(';').rstrip('}') + "\n};\n")

# 8. Write Index
with open('js/views/setup/index.js', 'w', encoding='utf-8') as f:
    f.write("""// Setup Module — Master Domain Controller & Orchestrator
import { getInitialStudioState } from './state/setupState.js';
import { setupCompany } from './company/setupCompany.js';
import { setupUsers } from './users/setupUsers.js';
import { setupRoles } from './roles/setupRoles.js';
import { setupStudio } from './studio/setupStudio.js';
import { setupForms } from './forms/setupForms.js';
import { setupLogs } from './logs/setupLogs.js';

export const SetupView = {
""")
    for l in dispatch_lines[1:]:
        f.write(l)
    f.write("""
};

// Compose all feature domain submodules into unified SetupView
Object.assign(
  SetupView,
  setupCompany,
  setupUsers,
  setupRoles,
  setupStudio,
  setupForms,
  setupLogs
);

if (typeof window !== 'undefined') {
  window.SetupView = SetupView;
}
""")

print("SetupView modularized and upgraded successfully!")
