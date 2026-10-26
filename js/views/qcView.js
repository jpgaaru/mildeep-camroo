// Quality Control Master Barrel Module
import { QCView } from './qc/index.js';

export { QCView };

if (typeof window !== 'undefined') {
  window.QCView = QCView;
}
