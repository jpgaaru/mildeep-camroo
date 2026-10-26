import re
import os

with open('js/views/salesView.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total sales lines: {len(lines)}")

# 1. Base / Dispatcher: lines 1 to 286
dispatch_lines = lines[:286]

# 2. Dashboard: lines 287 to 1106
dashboard_lines = lines[286:1106]

# 3. Orders: lines 1107 to 4086
orders_lines = lines[1106:4086]

# 4. Shipments: lines 4087 to 6132
shipments_lines = lines[4086:6132]

# 5. Financials: lines 6133 to 9543
financials_lines = lines[6132:9543]

# 6. Reports: lines 9544 to 9661
reports_lines = lines[9543:9661]

# 7. Modals / New PI: lines 9662 to end
modals_lines = lines[9661:]

# Upgrade Orders Modals (Shipping Bill & Commercial Invoice -> 6xl)
orders_text = "".join(orders_lines)
orders_text = re.sub(
    r"(openShippingBillModal\s*\([^\)]*\)\s*\{[\s\S]*?title:\s*['\"][^'\"]+['\"],\s*\n\s*)size:\s*['\"]xl['\"]",
    r"\1size: '6xl'",
    orders_text
)
orders_text = re.sub(
    r"(openCommercialInvoiceModal\s*\([^\)]*\)\s*\{[\s\S]*?title:\s*['\"][^'\"]+['\"],\s*\n\s*)size:\s*['\"]xl['\"]",
    r"\1size: '6xl'",
    orders_text
)

# Upgrade Shipments Modals (FDA, Clearing Agent, Delayed Shipment -> 4xl)
shipments_text = "".join(shipments_lines)
shipments_text = re.sub(
    r"(openFdaModal\s*\([^\)]*\)\s*\{[\s\S]*?title:\s*['\"][^'\"]+['\"],\s*\n\s*)size:\s*['\"]lg['\"]",
    r"\1size: '4xl'",
    shipments_text
)
shipments_text = re.sub(
    r"(openClearingAgentModal\s*\([^\)]*\)\s*\{[\s\S]*?title:\s*['\"][^'\"]+['\"],\s*\n\s*)size:\s*['\"]lg['\"]",
    r"\1size: '4xl'",
    shipments_text
)
shipments_text = re.sub(
    r"(openDelayedShipmentModal\s*\([^\)]*\)\s*\{[\s\S]*?title:\s*['\"][^'\"]+['\"],\s*\n\s*)size:\s*['\"]lg['\"]",
    r"\1size: '4xl'",
    shipments_text
)

# Upgrade Financials Modals (Forward Contract -> 4xl, Collections, Negotiations, Realizations, Insurance -> 4xl)
financials_text = "".join(financials_lines)
financials_text = re.sub(
    r"(openForwardContractModal\s*\([^\)]*\)\s*\{[\s\S]*?title:\s*['\"][^'\"]+['\"],\s*\n\s*)size:\s*['\"]2xl['\"]",
    r"\1size: '4xl'",
    financials_text
)
for m_name in ['openCollectionModal', 'openNegotiationModal', 'openRealizationModal', 'openRealizationDoneModal', 'openPendingInsuranceModal', 'openInsuranceTemplateModal', 'openInsurancePaymentModal']:
    financials_text = re.sub(
        rf"({m_name}\s*\([^\)]*\)\s*\{{[\s\S]*?title:\s*['\"][^'\"]+['\"],\s*\n\s*)size:\s*['\"]lg['\"]",
        r"\1size: '4xl'",
        financials_text
    )

# Upgrade New PI Modal -> 6xl
modals_text = "".join(modals_lines)
modals_text = re.sub(
    r"(openNewPiModal\s*\([^\)]*\)\s*\{[\s\S]*?title:\s*['\"][^'\"]+['\"],\s*\n\s*)size:\s*['\"]xl['\"]",
    r"\1size: '6xl'",
    modals_text
)

# 1. Write Dashboard
with open('js/views/sales/dashboard/salesDashboard.js', 'w', encoding='utf-8') as f:
    f.write("// Sales Module — Executive Dashboard & Pipeline\n")
    f.write("export const salesDashboard = {\n")
    for l in dashboard_lines:
        f.write(l)
    f.write("\n};\n")

# 2. Write Orders
with open('js/views/sales/orders/salesOrders.js', 'w', encoding='utf-8') as f:
    f.write("// Sales Module — Orders Execution & Registers (Shipping Bills & Commercial Invoices)\n")
    f.write("export const salesOrders = {\n")
    f.write(orders_text)
    f.write("\n};\n")

# 3. Write Shipments
with open('js/views/sales/shipments/salesShipments.js', 'w', encoding='utf-8') as f:
    f.write("// Sales Module — Shipments & Logistics (FDA, Clearing Agents, Delay Logs)\n")
    f.write("export const salesShipments = {\n")
    f.write(shipments_text)
    f.write("\n};\n")

# 4. Write Financials
with open('js/views/sales/financials/salesFinancials.js', 'w', encoding='utf-8') as f:
    f.write("// Sales Module — Payments, Realizations & Marine Insurance\n")
    f.write("export const salesFinancials = {\n")
    f.write(financials_text)
    f.write("\n};\n")

# 5. Write Reports
with open('js/views/sales/reports/salesReports.js', 'w', encoding='utf-8') as f:
    f.write("// Sales Module — Master Data & Reports\n")
    f.write("export const salesReports = {\n")
    for l in reports_lines:
        f.write(l)
    f.write("\n};\n")

# 6. Write Modals
with open('js/views/sales/modals/salesModals.js', 'w', encoding='utf-8') as f:
    f.write("// Sales Module — New PI & Bulk Approval Modals\n")
    f.write("export const salesModals = {\n")
    f.write(modals_text.rstrip().rstrip(';').rstrip('}') + "\n};\n")

# 7. Write Index
with open('js/views/sales/index.js', 'w', encoding='utf-8') as f:
    f.write("// Sales Module — Master Domain Controller & Orchestrator\n")
    # Base header imports from dispatch_lines
    for l in dispatch_lines[:136]:
        fixed_l = l.replace("from '../data/", "from '../../data/")\
                   .replace("from '../components/", "from '../../components/")\
                   .replace("from '../framework/", "from '../../framework/")
        f.write(fixed_l)

    f.write("""
import { salesDashboard } from './dashboard/salesDashboard.js';
import { salesOrders } from './orders/salesOrders.js';
import { salesShipments } from './shipments/salesShipments.js';
import { salesFinancials } from './financials/salesFinancials.js';
import { salesReports } from './reports/salesReports.js';
import { salesModals } from './modals/salesModals.js';

export const SalesView = {
""")
    for l in dispatch_lines[137:]:
        f.write(l)
    f.write("""
};

// Compose all feature domain submodules into unified SalesView
Object.assign(
  SalesView,
  salesDashboard,
  salesOrders,
  salesShipments,
  salesFinancials,
  salesReports,
  salesModals
);

if (typeof window !== 'undefined') {
  window.SalesView = SalesView;
}
""")

print("SalesView modularized and upgraded successfully!")
