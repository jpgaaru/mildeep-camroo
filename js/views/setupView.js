// Setup & Master Data Module Master Barrel Export
import { SetupView } from './setup/index.js';

export { SetupView };

if (typeof window !== 'undefined') {
  window.SetupView = SetupView;
}
