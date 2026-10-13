// AquaPulse Framework — Reactive Global & Scoped Store

export class Store {
  constructor(initialState = {}) {
    this.state = { ...initialState };
    this.listeners = new Set();
  }

  getState() {
    return this.state;
  }

  setState(updater) {
    const patch = typeof updater === 'function' ? updater(this.state) : updater;
    this.state = { ...this.state, ...patch };
    this.listeners.forEach((listener) => listener(this.state));
    return this.state;
  }

   getSlice(sliceKey) {
    return this.state[sliceKey];
  }

  setSlice(sliceKey, patch) {
    const currentSlice = this.state[sliceKey] || {};
    const nextSlice = typeof patch === 'function' ? patch(currentSlice) : { ...currentSlice, ...patch };
    return this.setState({ [sliceKey]: nextSlice });
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const ERPStore = new Store({
  sidebarCollapsed: localStorage.getItem('dfl_sidebar_collapsed') === 'true',
  theme: localStorage.getItem('dfl_theme') || 'light',
  activeRoute: {
    moduleId: 'purchase',
    submenuId: 'dashboard',
    tabId: 'rm-dashboard',
    hash: '#/purchase/dashboard/rm-dashboard'
  },
  purchaseFilters: {
    species: 'Vannamei (VM)',
    center: 'ALL',
    plant: 'ALL',
    fromDate: '',
    toDate: ''
  }
});
