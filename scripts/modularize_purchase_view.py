import re
import os

with open('js/views/purchaseView.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 1. State & Masters
state_lines = lines[:154]

# 2. Dispatcher lines
dispatch_lines = lines[157:252]

# 3. Dashboard
dashboard_lines = lines[252:932]

# 4. Operations
operations_lines = lines[932:1821]

# 5. Transactions
transactions_lines = lines[1821:2143]

# 6. Payments
payments_lines = lines[2143:2460]

# 7. Modals
modals_lines = lines[2460:2772]

# Upgrade modals in modals_lines
modals_text = "".join(modals_lines)

# Upgrade openSupplierModal with size: 'lg'
if "title: 'Create New Supplier (Financier)'," in modals_text and "size:" not in modals_text.split("openSupplierModal")[1].split("content:")[0]:
    modals_text = modals_text.replace(
        "title: 'Create New Supplier (Financier)',\n      content:",
        "title: 'Create New Supplier (Financier)',\n      size: 'lg',\n      content:"
    )

# Upgrade openPayModal with size: '5xl'
if "Bill Payment Settlement Mode" in modals_text:
    modals_text = re.sub(
        r"(title:\s*`Bill Payment Settlement Mode[^\n]*`,\n\s*content:)",
        r"size: '5xl',\n      \1",
        modals_text
    )

# Upgrade openCreateArrivalModal with size: '4xl'
if "title: 'Create Inward Arrival Receipt'," in modals_text:
    modals_text = modals_text.replace(
        "title: 'Create Inward Arrival Receipt',\n      content:",
        "title: 'Create Inward Arrival Receipt',\n      size: '4xl',\n      content:"
    )

# Write State
os.makedirs('js/views/purchase/state', exist_ok=True)
with open('js/views/purchase/state/purchaseState.js', 'w', encoding='utf-8') as f:
    f.write("// Purchase Module — Canonical State & Masters\n")
    for l in state_lines:
        fixed_l = l.replace("from '../data/", "from '../../../data/")\
                   .replace("from '../components/", "from '../../../components/")\
                   .replace("from '../framework/", "from '../../../framework/")\
                   .replace("let isCreatingBooking = false;", "export let isCreatingBooking = false;")\
                   .replace("let activeBillForEdit = null;", "export let activeBillForEdit = null;")
        f.write(fixed_l)

# Write Dashboard
with open('js/views/purchase/dashboard/purchaseDashboard.js', 'w', encoding='utf-8') as f:
    f.write("// Purchase Module — Dashboard Submodule\n")
    f.write("export const purchaseDashboard = {\n")
    for l in dashboard_lines:
        f.write(l)
    f.write("\n};\n")

# Write Operations
with open('js/views/purchase/operations/purchaseOperations.js', 'w', encoding='utf-8') as f:
    f.write("// Purchase Module — Operations Submodule\n")
    f.write("export const purchaseOperations = {\n")
    for l in operations_lines:
        f.write(l)
    f.write("\n};\n")

# Write Transactions
with open('js/views/purchase/transactions/purchaseTransactions.js', 'w', encoding='utf-8') as f:
    f.write("// Purchase Module — Transactions & Bills Submodule\n")
    f.write("export const purchaseTransactions = {\n")
    for l in transactions_lines:
        f.write(l)
    f.write("\n};\n")

# Write Payments
with open('js/views/purchase/payments/purchasePayments.js', 'w', encoding='utf-8') as f:
    f.write("// Purchase Module — Payments Submodule\n")
    f.write("export const purchasePayments = {\n")
    for l in payments_lines:
        f.write(l)
    f.write("\n};\n")

# Write Modals
with open('js/views/purchase/modals/purchaseModals.js', 'w', encoding='utf-8') as f:
    f.write("// Purchase Module — Modals Submodule (Standardized Sizes & Form Grids)\n")
    f.write("export const purchaseModals = {\n")
    f.write(modals_text.rstrip().rstrip(';').rstrip('}') + "\n};\n")

# Write Index
with open('js/views/purchase/index.js', 'w', encoding='utf-8') as f:
    f.write("""// Purchase Module — Master Domain Controller & Orchestrator
import {
  M, bookings, rmArrivals, arrivals, payments,
  isCreatingBooking, activeBillForEdit,
  reloadPurchaseStore
} from './state/purchaseState.js';

import { purchaseDashboard } from './dashboard/purchaseDashboard.js';
import { purchaseOperations } from './operations/purchaseOperations.js';
import { purchaseTransactions } from './transactions/purchaseTransactions.js';
import { purchasePayments } from './payments/purchasePayments.js';
import { purchaseModals } from './modals/purchaseModals.js';

export const PurchaseView = {
  // Expose store references
  M,
  bookings,
  rmArrivals,
  arrivals,
  payments,

""")
    for l in dispatch_lines[8:]:  # skip 'export const PurchaseView = {' and store refs
        f.write(l)
    f.write("""
};

// Compose all feature domain submodules into unified PurchaseView
Object.assign(
  PurchaseView,
  purchaseDashboard,
  purchaseOperations,
  purchaseTransactions,
  purchasePayments,
  purchaseModals
);

if (typeof window !== 'undefined') {
  window.PurchaseView = PurchaseView;
}
""")

print("PurchaseView modularized and upgraded successfully!")
