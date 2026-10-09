import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const loginView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'loginView.js'), 'utf-8');
const purchaseView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'purchaseView.js'), 'utf-8');
const preprocessingView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'preprocessingView.js'), 'utf-8');
const qcView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'qcView.js'), 'utf-8');
const productionView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'productionView.js'), 'utf-8');
const coldstoreView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'coldstoreView.js'), 'utf-8');
const inventoryView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'inventoryView.js'), 'utf-8');
const salesView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'salesView.js'), 'utf-8');
const reportsView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'reportsView.js'), 'utf-8');
const setupView = fs.readFileSync(path.join(__dirname, 'js', 'views', 'setupView.js'), 'utf-8');
const app = fs.readFileSync(path.join(__dirname, 'js', 'app.js'), 'utf-8');

function cleanCode(code) {
  return code
    .replace(/import\s+[\s\S]*?from\s+['"].*?['"];?/g, '')
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

  // Views
  ${cleanCode(loginView)}
  ${cleanCode(purchaseView)}
  ${cleanCode(preprocessingView)}
  ${cleanCode(qcView)}
  ${cleanCode(productionView)}
  ${cleanCode(coldstoreView)}
  ${cleanCode(inventoryView)}
  ${cleanCode(salesView)}
  ${cleanCode(reportsView)}
  ${cleanCode(setupView)}

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
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    if (typeof tailwind !== 'undefined') {
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              brand: {
                50: '#F0F9FF',
                100: '#E0F2FE',
                200: '#BAE6FD',
                300: '#7DD3FC',
                400: '#38BDF8',
                500: '#0EA5E9',
                600: '#0284C7',
                700: '#0369A1',
                800: '#075985',
                900: '#0C4A6E'
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
  <style>
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
console.log('standalone.html rebuilt with Lottie animations successfully!');
