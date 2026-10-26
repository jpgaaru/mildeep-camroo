import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tokensCss = fs.readFileSync(path.join(__dirname, 'aquaops-ds', 'tokens', 'tokens.css'), 'utf-8');
const atomsCss = fs.readFileSync(path.join(__dirname, 'aquaops-ds', 'components', 'atoms', 'atoms.css'), 'utf-8');
const moleculesCss = fs.readFileSync(path.join(__dirname, 'aquaops-ds', 'components', 'molecules', 'molecules.css'), 'utf-8');
const organismsCss = fs.readFileSync(path.join(__dirname, 'aquaops-ds', 'components', 'organisms', 'organisms.css'), 'utf-8');
const css = fs.readFileSync(path.join(__dirname, 'css', 'app.css'), 'utf-8');
const logos = fs.readFileSync(path.join(__dirname, 'js', 'data', 'logos.js'), 'utf-8');
const mockData = fs.readFileSync(path.join(__dirname, 'js', 'data', 'mockData.js'), 'utf-8');
const toast = fs.readFileSync(path.join(__dirname, 'js', 'components', 'toast.js'), 'utf-8');
const modal = fs.readFileSync(path.join(__dirname, 'js', 'components', 'modal.js'), 'utf-8');
const table = fs.readFileSync(path.join(__dirname, 'js', 'components', 'table.js'), 'utf-8');
const emptyState = fs.readFileSync(path.join(__dirname, 'js', 'components', 'emptyState.js'), 'utf-8');
const sidebar = fs.readFileSync(path.join(__dirname, 'js', 'components', 'sidebar.js'), 'utf-8');
const topNav = fs.readFileSync(path.join(__dirname, 'js', 'components', 'topNav.js'), 'utf-8');
const tabBar = fs.readFileSync(path.join(__dirname, 'js', 'components', 'tabBar.js'), 'utf-8');
const breadcrumbs = fs.readFileSync(path.join(__dirname, 'js', 'components', 'breadcrumbs.js'), 'utf-8');
const header = fs.readFileSync(path.join(__dirname, 'js', 'components', 'header.js'), 'utf-8');
const charts = fs.readFileSync(path.join(__dirname, 'js', 'components', 'charts.js'), 'utf-8');
const skeleton = fs.readFileSync(path.join(__dirname, 'js', 'components', 'skeleton.js'), 'utf-8');
const tourGuide = fs.readFileSync(path.join(__dirname, 'js', 'components', 'tourGuide.js'), 'utf-8');
const accessibility = fs.readFileSync(path.join(__dirname, 'js', 'components', 'accessibility.js'), 'utf-8');
const calendarPicker = fs.readFileSync(path.join(__dirname, 'js', 'components', 'calendarPicker.js'), 'utf-8');
const selectPicker = fs.readFileSync(path.join(__dirname, 'js', 'components', 'selectPicker.js'), 'utf-8');

const fwComponent = fs.readFileSync(path.join(__dirname, 'js', 'framework', 'Component.js'), 'utf-8');
const fwStore = fs.readFileSync(path.join(__dirname, 'js', 'framework', 'Store.js'), 'utf-8');
const fwRouter = fs.readFileSync(path.join(__dirname, 'js', 'framework', 'Router.js'), 'utf-8');
const fwAtoms = fs.readFileSync(path.join(__dirname, 'js', 'framework', 'atoms', 'index.js'), 'utf-8');
const fwMolecules = fs.readFileSync(path.join(__dirname, 'js', 'framework', 'molecules', 'index.js'), 'utf-8');
const fwOrganisms = fs.readFileSync(path.join(__dirname, 'js', 'framework', 'organisms', 'index.js'), 'utf-8');
const fwIndex = fs.readFileSync(path.join(__dirname, 'js', 'framework', 'index.js'), 'utf-8');

const loginView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'loginView.js'), 'utf-8');
const purchaseState = fs.readFileSync(path.join(__dirname, 'js', 'views', 'purchase', 'state', 'purchaseState.js'), 'utf-8');
const purchaseDashboard = fs.readFileSync(path.join(__dirname, 'js', 'views', 'purchase', 'dashboard', 'purchaseDashboard.js'), 'utf-8');
const purchaseOperations = fs.readFileSync(path.join(__dirname, 'js', 'views', 'purchase', 'operations', 'purchaseOperations.js'), 'utf-8');
const purchaseTransactions = fs.readFileSync(path.join(__dirname, 'js', 'views', 'purchase', 'transactions', 'purchaseTransactions.js'), 'utf-8');
const purchasePayments = fs.readFileSync(path.join(__dirname, 'js', 'views', 'purchase', 'payments', 'purchasePayments.js'), 'utf-8');
const purchaseModals = fs.readFileSync(path.join(__dirname, 'js', 'views', 'purchase', 'modals', 'purchaseModals.js'), 'utf-8');
const purchaseView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'purchase', 'index.js'), 'utf-8');
const preprocessingBase = fs.readFileSync(path.join(__dirname, 'js', 'views', 'preprocessing', 'base', 'preprocessingBase.js'), 'utf-8');
const preprocessingOverview = fs.readFileSync(path.join(__dirname, 'js', 'views', 'preprocessing', 'overview', 'preprocessingOverview.js'), 'utf-8');
const preprocessingChemicals = fs.readFileSync(path.join(__dirname, 'js', 'views', 'preprocessing', 'chemicals', 'preprocessingChemicals.js'), 'utf-8');
const preprocessingOperations = fs.readFileSync(path.join(__dirname, 'js', 'views', 'preprocessing', 'operations', 'preprocessingOperations.js'), 'utf-8');
const preprocessingTraceability = fs.readFileSync(path.join(__dirname, 'js', 'views', 'preprocessing', 'traceability', 'preprocessingTraceability.js'), 'utf-8');
const preprocessingModals = fs.readFileSync(path.join(__dirname, 'js', 'views', 'preprocessing', 'modals', 'preprocessingModals.js'), 'utf-8');
const preprocessingView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'preprocessing', 'index.js'), 'utf-8');
const qcOverview = fs.readFileSync(path.join(__dirname, 'js', 'views', 'qc', 'overview', 'qcOverview.js'), 'utf-8');
const qcLab = fs.readFileSync(path.join(__dirname, 'js', 'views', 'qc', 'lab', 'qcLab.js'), 'utf-8');
const qcOperations = fs.readFileSync(path.join(__dirname, 'js', 'views', 'qc', 'operations', 'qcOperations.js'), 'utf-8');
const qcScreening = fs.readFileSync(path.join(__dirname, 'js', 'views', 'qc', 'screening', 'qcScreening.js'), 'utf-8');
const qcView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'qc', 'index.js'), 'utf-8');
const productionView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'productionView.js'), 'utf-8');
const coldstoreView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'coldstoreView.js'), 'utf-8');
const inventoryView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'inventoryView.js'), 'utf-8');
const salesDashboard = fs.readFileSync(path.join(__dirname, 'js', 'views', 'sales', 'dashboard', 'salesDashboard.js'), 'utf-8');
const salesOrders = fs.readFileSync(path.join(__dirname, 'js', 'views', 'sales', 'orders', 'salesOrders.js'), 'utf-8');
const salesShipments = fs.readFileSync(path.join(__dirname, 'js', 'views', 'sales', 'shipments', 'salesShipments.js'), 'utf-8');
const salesFinancials = fs.readFileSync(path.join(__dirname, 'js', 'views', 'sales', 'financials', 'salesFinancials.js'), 'utf-8');
const salesReports = fs.readFileSync(path.join(__dirname, 'js', 'views', 'sales', 'reports', 'salesReports.js'), 'utf-8');
const salesModals = fs.readFileSync(path.join(__dirname, 'js', 'views', 'sales', 'modals', 'salesModals.js'), 'utf-8');
const salesView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'sales', 'index.js'), 'utf-8');
const reportsView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'reportsView.js'), 'utf-8');
const setupState = fs.readFileSync(path.join(__dirname, 'js', 'views', 'setup', 'state', 'setupState.js'), 'utf-8');
const setupCompany = fs.readFileSync(path.join(__dirname, 'js', 'views', 'setup', 'company', 'setupCompany.js'), 'utf-8');
const setupUsers = fs.readFileSync(path.join(__dirname, 'js', 'views', 'setup', 'users', 'setupUsers.js'), 'utf-8');
const setupRoles = fs.readFileSync(path.join(__dirname, 'js', 'views', 'setup', 'roles', 'setupRoles.js'), 'utf-8');
const setupStudio = fs.readFileSync(path.join(__dirname, 'js', 'views', 'setup', 'studio', 'setupStudio.js'), 'utf-8');
const setupForms = fs.readFileSync(path.join(__dirname, 'js', 'views', 'setup', 'forms', 'setupForms.js'), 'utf-8');
const setupLogs = fs.readFileSync(path.join(__dirname, 'js', 'views', 'setup', 'logs', 'setupLogs.js'), 'utf-8');
const setupView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'setup', 'index.js'), 'utf-8');
const helpView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'helpView.js'), 'utf-8');
const notificationsView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'notificationsView.js'), 'utf-8');
const app = fs.readFileSync(path.join(__dirname, 'js', 'app.js'), 'utf-8');

function cleanCode(code) {
  return code
    .replace(/import\s+[\s\S]*?from\s+['"].*?['"];?/g, '')
    .replace(/export\s*\{[\s\S]*?\};?/g, '')
    .replace(/export\s+const\s+/g, 'const ')
    .replace(/export\s+class\s+/g, 'class ')
    .replace(/export\s+function\s+/g, 'function ')
    .replace(/export\s+default\s+/g, '');
}

const combinedJS = `
(function() {
  // Logos
  ${cleanCode(logos)}

  // Mock Data
  ${cleanCode(mockData)}

  // Components
  ${cleanCode(toast)}
  ${cleanCode(modal)}
  ${cleanCode(table)}
  ${cleanCode(emptyState)}
  ${cleanCode(sidebar)}
  ${cleanCode(topNav)}
  ${cleanCode(tabBar)}
  ${cleanCode(breadcrumbs)}
  ${cleanCode(header)}
  ${cleanCode(charts)}
  ${cleanCode(skeleton)}
  ${cleanCode(tourGuide)}
  ${cleanCode(accessibility)}
  ${cleanCode(calendarPicker)}
  ${cleanCode(selectPicker)}

  // AquaPulse Component Framework (BaseComponent, Store, Router, Atoms, Molecules, Organisms)
  ${cleanCode(fwComponent)}
  ${cleanCode(fwStore)}
  ${cleanCode(fwRouter)}
  ${cleanCode(fwAtoms)}
  ${cleanCode(fwMolecules)}
  ${cleanCode(fwOrganisms)}
  ${cleanCode(fwIndex)}

  // Views
  ${cleanCode(loginView)}
  // Purchase Domain Modules (Enterprise Structured)
  ${cleanCode(purchaseState)}
  ${cleanCode(purchaseDashboard)}
  ${cleanCode(purchaseOperations)}
  ${cleanCode(purchaseTransactions)}
  ${cleanCode(purchasePayments)}
  ${cleanCode(purchaseModals)}
  ${cleanCode(purchaseView)}
  // Pre-processing Domain Modules (Enterprise Structured)
  ${cleanCode(preprocessingBase)}
  ${cleanCode(preprocessingOverview)}
  ${cleanCode(preprocessingChemicals)}
  ${cleanCode(preprocessingOperations)}
  ${cleanCode(preprocessingTraceability)}
  ${cleanCode(preprocessingModals)}
  ${cleanCode(preprocessingView)}
  ${cleanCode(qcOverview)}
  ${cleanCode(qcLab)}
  ${cleanCode(qcOperations)}
  ${cleanCode(qcScreening)}
  ${cleanCode(qcView)}
  ${cleanCode(productionView)}
  ${cleanCode(coldstoreView)}
  ${cleanCode(inventoryView)}
  // Sales & Exports Domain Modules (Enterprise Structured)
  ${cleanCode(salesDashboard)}
  ${cleanCode(salesOrders)}
  ${cleanCode(salesShipments)}
  ${cleanCode(salesFinancials)}
  ${cleanCode(salesReports)}
  ${cleanCode(salesModals)}
  ${cleanCode(salesView)}
  ${cleanCode(reportsView)}
  // Setup & Master Data Domain Modules (Enterprise Structured)
  ${cleanCode(setupState)}
  ${cleanCode(setupCompany)}
  ${cleanCode(setupUsers)}
  ${cleanCode(setupRoles)}
  ${cleanCode(setupStudio)}
  ${cleanCode(setupForms)}
  ${cleanCode(setupLogs)}
  ${cleanCode(setupView)}
  ${cleanCode(helpView)}
  ${cleanCode(notificationsView)}

  // App Controller
  ${cleanCode(app)}
})();
`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Devi Fisheries ERP — Enterprise Seafood Processing & Export SaaS</title>
  <link rel="icon" type="image/png" href="DEVI-FISHERIES-LOGO.png" />
  <link rel="apple-touch-icon" href="DEVI-FISHERIES-LOGO.png" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    if (typeof tailwind !== 'undefined') {
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              brand: {
                50: '#F0FAFC',
                100: '#D8F4F8',
                200: '#B2ECF3',
                300: '#84DFEB',
                400: '#4FCFE0',
                500: '#1ABDD2',
                600: '#00A4B7',
                700: '#008292',
                800: '#006C7A',
                900: '#005662',
                950: '#00404A'
              },
              neutral: {
                50: '#FAFBFC',
                100: '#F4F5F7',
                200: '#EBECF0',
                300: '#DFE1E6',
                400: '#C1C7D0',
                500: '#A5ADBA',
                600: '#7A869A',
                700: '#5E6C84',
                800: '#42526E',
                900: '#172B4D',
                950: '#091E42'
              }
            }
          }
        }
      };
    }
  </script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    ${tokensCss}
    ${atomsCss}
    ${moleculesCss}
    ${organismsCss}
    ${css}
  </style>
</head>
<body class="bg-[#F2F5F9] text-[#0F172A] antialiased overflow-x-hidden min-h-screen">
  <div id="app-root"></div>
  <script>
    ${combinedJS}
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'standalone.html'), html, 'utf-8');
fs.writeFileSync(path.join(__dirname, 'miledeep-devi-fisheries.html'), html, 'utf-8');
console.log('standalone.html and miledeep-devi-fisheries.html rebuilt with Lottie animations successfully!');
