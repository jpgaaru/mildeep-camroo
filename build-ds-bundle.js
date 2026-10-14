import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Bundle CSS
const tokensCss = fs.readFileSync(path.join(__dirname, 'aquaops-ds', 'tokens', 'tokens.css'), 'utf-8');
const atomsCss = fs.readFileSync(path.join(__dirname, 'aquaops-ds', 'components', 'atoms', 'atoms.css'), 'utf-8');
const moleculesCss = fs.readFileSync(path.join(__dirname, 'aquaops-ds', 'components', 'molecules', 'molecules.css'), 'utf-8');
const organismsCss = fs.readFileSync(path.join(__dirname, 'aquaops-ds', 'components', 'organisms', 'organisms.css'), 'utf-8');
let appCss = fs.readFileSync(path.join(__dirname, 'aquaops-ds', 'app.css'), 'utf-8');

// Strip @import lines from app.css
appCss = appCss.replace(/@import\s+url\([^)]+\);?/g, '');

const bundleCss = [
  '/* AquaOps Consolidated Design System Stylesheet */',
  tokensCss,
  atomsCss,
  moleculesCss,
  organismsCss,
  appCss
].join('\n\n');

fs.writeFileSync(path.join(__dirname, 'aquaops-ds', 'bundle.css'), bundleCss);
console.log('aquaops-ds/bundle.css generated successfully!');

// 2. Bundle JS
function cleanJs(code) {
  return code
    .replace(/import\s+[\s\S]*?from\s+['"].*?['"];?/g, '')
    .replace(/export\s*\{[\s\S]*?\};?/g, '')
    .replace(/export\s+const\s+/g, 'const ')
    .replace(/export\s+class\s+/g, 'class ')
    .replace(/export\s+function\s+/g, 'function ')
    .replace(/export\s+default\s+/g, '');
}

const toastJs = cleanJs(fs.readFileSync(path.join(__dirname, 'aquaops-ds', 'js', 'aqua-toast.js'), 'utf-8'));
const motionJs = cleanJs(fs.readFileSync(path.join(__dirname, 'aquaops-ds', 'js', 'aqua-motion.js'), 'utf-8'));
const selectJs = cleanJs(fs.readFileSync(path.join(__dirname, 'aquaops-ds', 'js', 'aqua-select.js'), 'utf-8'));
const calendarJs = cleanJs(fs.readFileSync(path.join(__dirname, 'aquaops-ds', 'js', 'aqua-calendar.js'), 'utf-8'));
const sidebarJs = cleanJs(fs.readFileSync(path.join(__dirname, 'aquaops-ds', 'js', 'aqua-sidebar.js'), 'utf-8'));
const tableJs = cleanJs(fs.readFileSync(path.join(__dirname, 'aquaops-ds', 'js', 'aqua-table.js'), 'utf-8'));
const chartsJs = cleanJs(fs.readFileSync(path.join(__dirname, 'aquaops-ds', 'js', 'aqua-charts.js'), 'utf-8'));
const drawerJs = cleanJs(fs.readFileSync(path.join(__dirname, 'aquaops-ds', 'js', 'aqua-drawer.js'), 'utf-8'));
const tooltipJs = cleanJs(fs.readFileSync(path.join(__dirname, 'aquaops-ds', 'js', 'aqua-tooltip.js'), 'utf-8'));
const mainJs = cleanJs(fs.readFileSync(path.join(__dirname, 'aquaops-ds', 'js', 'main.js'), 'utf-8'));

const bundleJs = `
/**
 * AquaOps Design System — Self-Contained Bundle
 * Works seamlessly across file://, localhost, and production servers with zero CORS dependencies
 */
(function() {
  ${toastJs}
  ${motionJs}
  ${selectJs}
  ${calendarJs}
  ${sidebarJs}
  ${tableJs}
  ${chartsJs}
  ${drawerJs}
  ${tooltipJs}
  ${mainJs}

  // Global window exports
  window.AquaToast = AquaToast;
  window.AquaTooltip = AquaTooltip;
  window.AquaMotion = AquaMotion;
  window.AquaCalendar = AquaCalendar;
  window.AquaSelect = AquaSelect;
})();
`;

fs.writeFileSync(path.join(__dirname, 'aquaops-ds', 'js', 'bundle.js'), bundleJs);
console.log('aquaops-ds/js/bundle.js generated successfully!');
