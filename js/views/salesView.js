// Sales & Exports Module Master Barrel Export
import { SalesView } from './sales/index.js';

export { SalesView };

if (typeof window !== 'undefined') {
  window.SalesView = SalesView;
}
