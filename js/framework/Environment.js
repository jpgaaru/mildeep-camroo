// AquaPulse Framework — Environment Segregation & Isolation Controller
// Guarantees independent execution, state isolation, and decoupling between:
// 1. Sitemap 01: Dedicated Client Custom Clone (all customizations live here)
// 2. Sitemap 02: Pristine Original Client Superadmin
// 3. CDS: Decoupled Design System

export const ENV_SITEMAP_01 = 'sitemap01';
export const ENV_SITEMAP_02 = 'sitemap02';
export const ENV_CLIENT_2026 = 'client2026';

export const Environment = {
  ENV_SITEMAP_01,
  ENV_SITEMAP_02,
  ENV_CLIENT_2026,

  // Read active environment from sessionStorage or default to sitemap01
  getActiveEnv() {
    if (typeof window === 'undefined') return ENV_SITEMAP_01;
    try {
      const env = sessionStorage.getItem('dfl_active_env');
      if (env === ENV_SITEMAP_02) return ENV_SITEMAP_02;
      if (env === ENV_CLIENT_2026) return ENV_CLIENT_2026;
      return ENV_SITEMAP_01;
    } catch {
      return ENV_SITEMAP_01;
    }
  },

  setActiveEnv(env) {
    let valid = ENV_SITEMAP_01;
    if (env === ENV_SITEMAP_02) valid = ENV_SITEMAP_02;
    else if (env === ENV_CLIENT_2026) valid = ENV_CLIENT_2026;
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('dfl_active_env', valid);
      } catch (e) {
        console.warn('[Environment] Could not set sessionStorage:', e);
      }
    }
    return valid;
  },

  isSitemap01() {
    return this.getActiveEnv() === ENV_SITEMAP_01;
  },

  isSitemap02() {
    return this.getActiveEnv() === ENV_SITEMAP_02;
  },

  isClient2026() {
    return this.getActiveEnv() === ENV_CLIENT_2026;
  },

  getEnvMeta() {
    const env = this.getActiveEnv();
    if (env === ENV_CLIENT_2026) {
      return {
        id: ENV_CLIENT_2026,
        name: 'Client 2026',
        role: 'Client React App',
        badgeLabel: '⚡ Client 2026 · Operations',
        shortLabel: 'Client 2026',
        accentColor: '#10B981',
        bgPill: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30',
        dotColor: 'bg-[#10B981]',
        isClone: true
      };
    }
    if (env === ENV_SITEMAP_02) {
      return {
        id: ENV_SITEMAP_02,
        name: 'Sitemap 02',
        role: 'Client Superadmin',
        badgeLabel: '👑 Sitemap 02 · Superadmin',
        shortLabel: 'Sitemap 02',
        accentColor: '#3B5AF6',
        bgPill: 'bg-[#3B5AF6]/10 text-[#3B5AF6] border-[#3B5AF6]/30',
        dotColor: 'bg-[#3B5AF6]',
        isClone: false
      };
    }
    return {
      id: ENV_SITEMAP_01,
      name: 'Sitemap 01',
      role: 'Custom Client ERP',
      badgeLabel: '🏢 Sitemap 01 · Custom',
      shortLabel: 'Sitemap 01',
      accentColor: '#006C7A',
      bgPill: 'bg-[#006C7A]/10 text-[#006C7A] border-[#006C7A]/30',
      dotColor: 'bg-[#006C7A]',
      isClone: true
    };
  },

  // Storage key namespacer to isolate data stores between Sitemap 01 and Sitemap 02
  getStorageKey(key) {
    const env = this.getActiveEnv();
    return `dfl_${env}_${key}`;
  },

  // Retrieve an isolated data store.
  // If not yet present in this environment, it clones deeply from fallbackBaselineData
  // ensuring Sitemap 01 starts as an independent copy with zero mutation back to Sitemap 02.
  getStore(key, fallbackBaselineData = []) {
    const storeKey = this.getStorageKey(key);
    if (typeof window === 'undefined') {
      return JSON.parse(JSON.stringify(fallbackBaselineData));
    }
    try {
      const stored = localStorage.getItem(storeKey);
      if (stored) {
        return JSON.parse(stored);
      }
      // Initialize isolated store with deep copy of baseline
      const cloned = JSON.parse(JSON.stringify(fallbackBaselineData));
      localStorage.setItem(storeKey, JSON.stringify(cloned));
      return cloned;
    } catch (e) {
      console.warn(`[Environment] Failed to load store for ${storeKey}:`, e);
      return JSON.parse(JSON.stringify(fallbackBaselineData));
    }
  },

  // Save changes strictly to active environment's store
  setStore(key, data) {
    if (typeof window === 'undefined') return;
    const storeKey = this.getStorageKey(key);
    try {
      localStorage.setItem(storeKey, JSON.stringify(data));
    } catch (e) {
      console.error(`[Environment] Failed to save store for ${storeKey}:`, e);
    }
  },

  // Reset an environment store back to baseline
  resetStore(key, baselineData) {
    if (typeof window === 'undefined') return;
    const storeKey = this.getStorageKey(key);
    try {
      localStorage.setItem(storeKey, JSON.stringify(baselineData));
    } catch (e) {
      console.error(`[Environment] Failed to reset store for ${storeKey}:`, e);
    }
  },

  // Switch environment dynamically and trigger UI refresh
  switchEnvironment(env) {
    this.setActiveEnv(env);
    if (typeof window !== 'undefined') {
      const meta = this.getEnvMeta();
      if (window.Toast && typeof window.Toast.show === 'function') {
        window.Toast.show(`Switched to ${meta.name} (${meta.role})`, 'info', 'Environment Active');
      }
      // Re-route or refresh view
      if (window.App && typeof window.App.route === 'function') {
        const shell = document.getElementById('erp-app-shell');
        if (shell) shell.remove();
        window.App.route();
      } else {
        window.location.reload();
      }
    }
  }
};

if (typeof window !== 'undefined') {
  window.Environment = Environment;
}
