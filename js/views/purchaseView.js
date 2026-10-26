// Purchase Module Master Barrel Export
import { PurchaseView } from './purchase/index.js';

export { PurchaseView };

if (typeof window !== 'undefined') {
  window.PurchaseView = PurchaseView;
}
