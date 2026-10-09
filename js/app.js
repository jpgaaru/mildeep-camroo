// Master Application Controller & Router for Fisheries ERP

import { ERP_DATA } from './data/mockData.js';
import { Toast } from './components/toast.js';
import { Modal } from './components/modal.js';
import { Header } from './components/header.js';
import { Sidebar, NAV_HIERARCHY } from './components/sidebar.js';
import { Breadcrumbs } from './components/breadcrumbs.js';
import { TourGuide } from './components/tourGuide.js';
import { Accessibility } from './components/accessibility.js';

// Views
import { LoginView } from './views/loginView.js';
import { PurchaseView } from './views/purchaseView.js';
import { PreprocessingView } from './views/preprocessingView.js';
import { QCView } from './views/qcView.js';
import { ProductionView } from './views/productionView.js';
import { ColdstoreView } from './views/coldstoreView.js';
import { InventoryView } from './views/inventoryView.js';
import { SalesView } from './views/salesView.js';
import { ReportsView } from './views/reportsView.js';
import { SetupView } from './views/setupView.js';
import { HelpView } from './views/helpView.js';

export const App = {
  init() {
    Accessibility.init();
    if (localStorage.getItem('dfl_theme') === 'dark') {
      document.documentElement.classList.add('theme-dark');
    }
    Toast.init();
    this.bindHashChange();
    this.bindDatePickerHelper();
    this.bindGlobalShortcuts();
    this.route();
  },

  bindGlobalShortcuts() {
    document.addEventListener('keydown', (e) => {
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);

      // Search: Ctrl+K or Cmd+K or / (when not typing)
      if (((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') || (!isInput && e.key === '/')) {
        e.preventDefault();
        const headerInput = document.getElementById('header-global-search-input');
        if (headerInput) {
          headerInput.focus();
          headerInput.select();
        }
        return;
      }

      // Help / Cheatsheet: ? (Shift+/) when not typing
      if (!isInput && e.key === '?') {
        e.preventDefault();
        this.openKeyboardShortcutsModal();
        return;
      }

      // Toggle Sidebar: [ or Ctrl+B
      if ((!isInput && e.key === '[') || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b')) {
        e.preventDefault();
        Sidebar.toggleCollapse();
        return;
      }

      // Quick Create: Alt+N
      if (e.altKey && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        const createBtn = document.querySelector('button[id*="new"], button[id*="create"], button[id*="add"]');
        if (createBtn) createBtn.click();
        return;
      }

      // Section Navigation: Alt+1 through Alt+8
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        const keyMap = {
          '1': '#/purchase/dashboard/rm-dashboard',
          '2': '#/preprocessing/dashboard/floor-overview',
          '3': '#/quality/dashboard/qc-overview',
          '4': '#/production/dashboard/overview',
          '5': '#/coldstore/dashboard/overview',
          '6': '#/sales/dashboard/overview',
          '7': '#/reports/production-analytics/yield-reports',
          '8': '#/setup/client-master-setup/company-setup'
        };
        if (keyMap[e.key]) {
          e.preventDefault();
          window.location.hash = keyMap[e.key];
          return;
        }
      }
    });
  },

  bindDatePickerHelper() {
    document.addEventListener('click', (e) => {
      const wrapper = e.target.closest('.erp-date-wrapper');
      if (wrapper && e.target.tagName !== 'INPUT') {
        const input = wrapper.querySelector('input[type="date"]');
        if (input) {
          if (typeof input.showPicker === 'function') {
            try {
              input.showPicker();
            } catch (_) {
              input.focus();
            }
          } else {
            input.focus();
          }
        }
      }
    });
  },

  bindHashChange() {
    window.addEventListener('hashchange', () => this.route());
  },

  route() {
    const rawHash = window.location.hash || '';
    // If explicitly on login page
    if (rawHash === '#/login' || rawHash === '#/signin' || rawHash === '#login') {
      document.getElementById('app-root').innerHTML = `<div id="login-view-container"></div>`;
      LoginView.render('login-view-container');
      return;
    }

    // If empty hash, default to main dashboard
    if (rawHash === '' || rawHash === '#' || rawHash === '#/') {
      window.location.hash = '#/purchase/dashboard/rm-dashboard';
      return;
    }

    // Ensure main ERP shell is mounted
    this.ensureShellMounted();

    // Clean hash: remove leading # and /
    const clean = rawHash.replace(/^#\/?/, '').replace(/^\/+/, '');
    const parts = clean.split('/');
    const moduleName = parts[0] || 'purchase';
    let submenuName = parts[1] || '';
    let tabName = parts[2] || '';

    // Auto-resolve default module, submenu, and tab if missing or shorthand
    const modObj = NAV_HIERARCHY.find(m => m.id === moduleName) || NAV_HIERARCHY[0];
    let subObj = modObj.submenus.find(s => s.id === submenuName);
    if (!subObj) {
      // Check if parts[1] was actually a tab ID under one of the submenus
      for (const sm of modObj.submenus) {
        if (sm.tabs.some(t => t.id === submenuName)) {
          subObj = sm;
          tabName = submenuName;
          submenuName = sm.id;
          break;
        }
      }
      if (!subObj) {
        subObj = modObj.submenus[0];
        submenuName = subObj.id;
      }
    }
    if (!tabName) {
      tabName = subObj.defaultTab || subObj.tabs[0]?.id || '';
    }

    const resolvedHash = `#/${modObj.id}/${subObj.id}/${tabName}`;

    // Render Navigation & Breadcrumbs (Standard Option 1: Floating Sidebar)
    Sidebar.render('sidebar-container', resolvedHash);
    Breadcrumbs.render('breadcrumbs-container', resolvedHash);

    const mainContainer = 'main-content-container';

    switch (modObj.id) {
      case 'purchase':
        PurchaseView.render(mainContainer, tabName || 'rm-dashboard', resolvedHash);
        break;
      case 'preprocessing':
        PreprocessingView.render(mainContainer, tabName || 'floor-overview', resolvedHash);
        break;
      case 'quality':
        QCView.render(mainContainer, tabName || 'qc-overview', resolvedHash);
        break;
      case 'production':
        ProductionView.render(mainContainer, tabName || 'overview', resolvedHash);
        break;
      case 'coldstore':
        ColdstoreView.render(mainContainer, tabName || 'overview', resolvedHash);
        break;
      case 'inventory':
        InventoryView.render(mainContainer, tabName || 'overview', resolvedHash);
        break;
      case 'sales':
        SalesView.render(mainContainer, tabName || 'overview', resolvedHash);
        break;
      case 'reports':
        ReportsView.render(mainContainer, tabName || 'yield-reports', resolvedHash);
        break;
      case 'setup':
        SetupView.render(mainContainer, tabName || 'users', resolvedHash);
        break;
      case 'help':
        HelpView.render(mainContainer, tabName || 'compliance-manual', resolvedHash);
        break;
      default:
        PurchaseView.render(mainContainer, 'rm-dashboard', '#/purchase/dashboard/rm-dashboard');
        break;
    }

    // Scroll to top of main content
    const mainEl = document.getElementById(mainContainer);
    if (mainEl) mainEl.scrollTop = 0;

    // Check if Onboarding Tour should start (e.g. after login)
    if (sessionStorage.getItem('trigger_tour_on_login') === 'true') {
      sessionStorage.removeItem('trigger_tour_on_login');
      setTimeout(() => {
        TourGuide.start();
      }, 500);
    }
  },

  ensureShellMounted() {
    let existing = document.getElementById('erp-app-shell');
    if (!existing) {
      const isCollapsed = Sidebar.isCollapsed;
      const collapsedClass = isCollapsed ? 'is-collapsed' : '';

      document.getElementById('app-root').innerHTML = `
        <div id="erp-app-shell" data-layout="option1" class="min-h-screen bg-[#F8FAFC]">
          <!-- Left Floated Sidebar (Floating with rounded corners) -->
          <div id="sidebar-container" class="${collapsedClass}"></div>

          <!-- Main Layout Wrapper (offset by floating sidebar width + margins) -->
          <div id="main-layout-wrapper" class="${collapsedClass} flex flex-col min-h-screen">
            <!-- Fixed / Sticky Top Header & Breadcrumbs Wrapper (Option 1) -->
            <div class="sticky top-3 z-30 mr-3 mt-3 rounded-2xl border border-[#E2E8F0] bg-white">
              <div id="header-container" class="bg-white rounded-t-2xl"></div>
              <!-- Breadcrumbs Bar (Fixed in position right below Header) -->
              <div class="px-6 py-2 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between rounded-b-2xl">
                <div id="breadcrumbs-container"></div>
              </div>
            </div>

            <!-- Module Subview Injected Here (Full-Width Responsive UI) -->
            <main id="main-content-container" class="p-6 flex-1 w-full"></main>
          </div>
        </div>
      `;

      // Mount Header
      Header.render('header-container');
    }
  },

  // GLOBAL SEARCH MODAL
  openGlobalSearchModal() {
    Modal.open({
      title: 'Global Search across Fisheries ERP',
      size: 'lg',
      content: `
        <div class="space-y-4">
          <!-- Search Input -->
          <div class="relative">
            <input 
              type="text" 
              id="modal-global-search-input" 
              placeholder="Type Lot number, Arrival No, Booking PB, Supplier, Bill No..." 
              autofocus 
              class="w-full text-sm pl-10 pr-4 py-2.5 bg-[#FAFBFC] border-2 border-[#0284C7] rounded-lg focus:outline-none"
            />
            <svg class="w-5 h-5 text-[#0284C7] absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>

          <!-- Dynamic Search Results -->
          <div id="global-search-results" class="max-h-96 overflow-y-auto space-y-4 text-xs">
            ${this.renderInitialSearchResults()}
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Close (Esc)', type: 'secondary', onClick: (m) => m.close() }
      ]
    });

    setTimeout(() => {
      const input = document.getElementById('modal-global-search-input');
      const resultsContainer = document.getElementById('global-search-results');
      if (input && resultsContainer) {
        input.focus();
        input.addEventListener('input', (e) => {
          resultsContainer.innerHTML = this.performGlobalSearch(e.target.value);
          this.bindSearchResultClicks();
        });
      }
      this.bindSearchResultClicks();
    }, 50);
  },

  renderInitialSearchResults() {
    return `
      <div>
        <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          Quick Suggestions & Recent Searches
        </div>
        <div class="grid grid-cols-2 gap-2 mb-3">
          <button type="button" class="search-preset-btn p-2 bg-[#F8FAFC] hover:bg-[#F0F9FF] border border-[#E2E8F0] hover:border-[#0284C7] rounded-lg text-left transition-colors cursor-pointer" data-term="LOT-2026">
            <div class="font-bold text-[#0284C7] text-xs">LOT-2026-00125</div>
            <div class="text-[10px] text-[#64748B]">Vannamei Shrimp Traceability</div>
          </button>
          <button type="button" class="search-preset-btn p-2 bg-[#F8FAFC] hover:bg-[#F0F9FF] border border-[#E2E8F0] hover:border-[#0284C7] rounded-lg text-left transition-colors cursor-pointer" data-term="RMA-2026">
            <div class="font-bold text-[#15803D] text-xs">RMA-2026-00341</div>
            <div class="text-[10px] text-[#64748B]">Fresh Dock Arrival #1</div>
          </button>
          <button type="button" class="search-preset-btn p-2 bg-[#F8FAFC] hover:bg-[#F0F9FF] border border-[#E2E8F0] hover:border-[#0284C7] rounded-lg text-left transition-colors cursor-pointer" data-term="Godavari">
            <div class="font-bold text-[#6D28D9] text-xs">Godavari Coastal</div>
            <div class="text-[10px] text-[#64748B]">Top Supplier Records</div>
          </button>
          <button type="button" class="search-preset-btn p-2 bg-[#F8FAFC] hover:bg-[#F0F9FF] border border-[#E2E8F0] hover:border-[#0284C7] rounded-lg text-left transition-colors cursor-pointer" data-term="BILL-2026">
            <div class="font-bold text-[#B45309] text-xs">BILL-2026-118</div>
            <div class="text-[10px] text-[#64748B]">Pending Supplier Invoice</div>
          </button>
        </div>
        <div class="text-[10px] text-[#94A3B8] italic">Type any lot number, species, supplier, vehicle, or section name...</div>
      </div>
    `;
  },

  performGlobalSearch(term) {
    if (!term || term.trim() === '') {
      return this.renderInitialSearchResults();
    }

    const rawTerm = term.trim();
    const t = rawTerm.toLowerCase();

    // Helper: highlight matched keyword
    const highlight = (text) => {
      if (!text) return '';
      const escaped = rawTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escaped})`, 'gi');
      return String(text).replace(regex, '<span class="bg-[#BAE6FD] text-[#0369A1] font-bold rounded px-0.5">$1</span>');
    };

    // 1. DYNAMIC SUGGESTIONS LIST BASED ON INPUT WORD
    const suggestionChips = [];
    const seenChips = new Set();

    const addChip = (label, type, queryTerm) => {
      if (!label || seenChips.has(label.toLowerCase())) return;
      seenChips.add(label.toLowerCase());
      suggestionChips.push({ label, type, term: queryTerm || label });
    };

    // Extract suggestions matching input word
    // Matching species
    ERP_DATA.species.forEach(s => {
      if (s.name.toLowerCase().includes(t)) addChip(s.name, 'Species');
    });

    // Matching suppliers
    ERP_DATA.lots.forEach(l => {
      if (l.supplierName.toLowerCase().includes(t)) addChip(l.supplierName, 'Supplier');
    });

    // Matching lot numbers
    ERP_DATA.lots.forEach(l => {
      if (l.lotNumber.toLowerCase().includes(t)) addChip(l.lotNumber, 'Lot');
    });

    // Matching arrivals
    ERP_DATA.rmArrivals.forEach(a => {
      if (a.arrivalNumber.toLowerCase().includes(t)) addChip(a.arrivalNumber, 'Arrival');
    });

    // Matching navigation views / sections
    const navSuggestions = [];
    NAV_HIERARCHY.forEach(mod => {
      if (mod.title.toLowerCase().includes(t)) {
        navSuggestions.push({
          title: mod.title,
          subtitle: `Module • Main Dashboard`,
          hash: `#/${mod.id}/${mod.submenus[0]?.id || 'dashboard'}/${mod.submenus[0]?.tabs[0]?.id || 'overview'}`
        });
      }
      mod.submenus.forEach(sub => {
        if (sub.title.toLowerCase().includes(t)) {
          navSuggestions.push({
            title: sub.title,
            subtitle: `${mod.title} • Section`,
            hash: sub.tabs[0]?.hash || `#/${mod.id}/${sub.id}`
          });
        }
        sub.tabs.forEach(tab => {
          if (tab.label.toLowerCase().includes(t)) {
            navSuggestions.push({
              title: tab.label,
              subtitle: `${mod.title} • ${sub.title}`,
              hash: tab.hash
            });
          }
        });
      });
    });

    // 2. MATCHING RECORDS
    const matchingLots = ERP_DATA.lots.filter(l => 
      l.lotNumber.toLowerCase().includes(t) || 
      l.species.toLowerCase().includes(t) || 
      l.supplierName.toLowerCase().includes(t) ||
      (l.landingSource && l.landingSource.toLowerCase().includes(t))
    );

    const matchingArrivals = ERP_DATA.rmArrivals.filter(a => 
      a.arrivalNumber.toLowerCase().includes(t) || 
      a.supplierName.toLowerCase().includes(t) || 
      a.vehicleNumber.toLowerCase().includes(t) ||
      a.species.toLowerCase().includes(t)
    );

    const matchingBills = ERP_DATA.supplierBills.filter(b => 
      b.billNo.toLowerCase().includes(t) || 
      b.supplierName.toLowerCase().includes(t) ||
      b.lotNumber.toLowerCase().includes(t)
    );

    let html = '';

    // A. SUGGESTIONS LIST BASED ON INPUT WORD
    if (suggestionChips.length > 0) {
      const topChips = suggestionChips.slice(0, 6);
      html += `
        <div class="p-2 mb-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <svg class="w-3 h-3 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Suggestions for "<strong>${rawTerm}</strong>":
          </div>
          <div class="flex flex-wrap gap-1.5">
            ${topChips.map(c => `
              <button 
                type="button" 
                class="search-preset-btn inline-flex items-center gap-1 px-2 py-0.5 bg-white hover:bg-[#F0F9FF] text-[#0F172A] hover:text-[#0284C7] border border-[#CBD5E1] hover:border-[#0284C7] rounded-md text-xs font-medium transition-colors cursor-pointer"
                data-term="${c.term}"
                title="Filter by ${c.label}"
              >
                <span>${highlight(c.label)}</span>
                <span class="text-[9px] text-[#64748B] bg-[#F1F5F9] px-1 py-0.2 rounded font-normal">${c.type}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }

    // B. NAVIGATION SUGGESTIONS
    const topNavMatches = navSuggestions.slice(0, 3);
    if (topNavMatches.length > 0) {
      html += `
        <div class="mb-2.5">
          <div class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1 flex items-center gap-1">
            <svg class="w-3 h-3 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            Go Directly to Section
          </div>
          <div class="divide-y divide-[#F1F5F9] border border-[#E2E8F0] rounded-lg overflow-hidden bg-white">
            ${topNavMatches.map(n => `
              <div class="p-2 hover:bg-[#F0F9FF] flex items-center justify-between cursor-pointer search-result-item transition-colors" data-action="nav" data-hash="${n.hash}">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded bg-[#F0F9FF] text-[#0284C7] flex items-center justify-center shrink-0">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                  </div>
                  <div>
                    <div class="font-bold text-[#0F172A] text-xs">${highlight(n.title)}</div>
                    <div class="text-[10px] text-[#64748B]">${n.subtitle}</div>
                  </div>
                </div>
                <span class="text-[11px] text-[#0284C7] font-semibold">Open &rarr;</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // C. MATCHING LOTS
    if (matchingLots.length > 0) {
      html += `
        <div class="mb-2.5">
          <div class="text-[10px] font-bold text-[#0284C7] uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Purchase Lots (${matchingLots.length})</span>
            <span class="text-[9px] font-normal text-[#64748B]">Click to Trace Lot</span>
          </div>
          <div class="divide-y divide-[#F1F5F9] border border-[#E2E8F0] rounded-lg overflow-hidden bg-white">
            ${matchingLots.map(l => `
              <div class="p-2 hover:bg-[#F8FAFC] flex items-center justify-between cursor-pointer search-result-item" data-action="trace-lot" data-key="${l.lotNumber}">
                <div>
                  <div class="font-bold text-[#0284C7] text-xs">${highlight(l.lotNumber)} • ${highlight(l.species)}</div>
                  <div class="text-[11px] text-[#64748B]">${highlight(l.supplierName)} • Landing: ${highlight(l.landingSource)}</div>
                </div>
                <div class="text-right">
                  <div class="font-bold text-[#0F172A] text-xs">${l.receivedQtyKg.toLocaleString()} KG</div>
                  <span class="lozenge lozenge-success text-[10px]">${l.lotStatus}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // D. MATCHING ARRIVALS
    if (matchingArrivals.length > 0) {
      html += `
        <div class="mb-2.5">
          <div class="text-[10px] font-bold text-[#15803D] uppercase tracking-wider mb-1">Raw Material Arrivals (${matchingArrivals.length})</div>
          <div class="divide-y divide-[#F1F5F9] border border-[#E2E8F0] rounded-lg overflow-hidden bg-white">
            ${matchingArrivals.map(a => `
              <div class="p-2 hover:bg-[#F8FAFC] flex items-center justify-between cursor-pointer search-result-item" data-action="nav" data-hash="#/purchase/operations/rm-arrivals">
                <div>
                  <div class="font-bold text-[#15803D] text-xs">${highlight(a.arrivalNumber)} • ${highlight(a.species)}</div>
                  <div class="text-[11px] text-[#64748B]">${highlight(a.supplierName)} • Vehicle: ${highlight(a.vehicleNumber)}</div>
                </div>
                <div class="text-right">
                  <div class="font-bold text-[#0F172A] text-xs">${a.netWeightKg.toLocaleString()} KG</div>
                  <span class="lozenge lozenge-inprogress text-[10px]">${a.receivingStatus}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // E. MATCHING BILLS
    if (matchingBills.length > 0) {
      html += `
        <div class="mb-2.5">
          <div class="text-[10px] font-bold text-[#6D28D9] uppercase tracking-wider mb-1">Supplier Bills (${matchingBills.length})</div>
          <div class="divide-y divide-[#F1F5F9] border border-[#E2E8F0] rounded-lg overflow-hidden bg-white">
            ${matchingBills.map(b => `
              <div class="p-2 hover:bg-[#F8FAFC] flex items-center justify-between cursor-pointer search-result-item" data-action="nav" data-hash="#/purchase/transactions-bills/supplier-bills">
                <div>
                  <div class="font-bold text-[#6D28D9] text-xs">${highlight(b.billNo)} • ${highlight(b.supplierName)}</div>
                  <div class="text-[11px] text-[#64748B]">Lot: ${highlight(b.lotNumber)} • Due: ${b.dueDate}</div>
                </div>
                <div class="text-right">
                  <div class="font-bold text-[#047857] text-xs">₹ ${b.totalAmountInr.toLocaleString()}</div>
                  <span class="lozenge lozenge-warning text-[10px]">${b.status}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (html === '') {
      html = `
        <div class="text-center py-6 text-[#64748B]">
          <svg class="w-8 h-8 text-[#94A3B8] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div class="font-bold text-[#0F172A] text-xs">No records found for "${rawTerm}"</div>
          <div class="text-[11px] text-[#94A3B8] mt-0.5">Try searching for <code>Vannamei</code>, <code>LOT</code>, <code>Godavari</code>, or <code>RMA</code></div>
        </div>
      `;
    }

    return html;
  },

  bindSearchResultClicks(container = document) {
    container.querySelectorAll('.search-preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const term = btn.dataset.term;
        const input = document.getElementById('header-global-search-input') || document.getElementById('modal-global-search-input');
        if (input) {
          input.value = term;
          input.dispatchEvent(new Event('input'));
        }
      });
    });

    container.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const action = item.dataset.action;
        const dropdown = document.getElementById('header-search-dropdown');
        if (dropdown) dropdown.classList.add('hidden');
        Modal.close();

        if (action === 'trace-lot') {
          const lotKey = item.dataset.key;
          const lot = ERP_DATA.lots.find(l => l.lotNumber === lotKey);
          if (lot) {
            window.location.hash = '#/purchase/operations/lot-tracking';
            setTimeout(() => PurchaseView.showLotTraceabilityDrawer(lot), 200);
          }
        } else if (action === 'nav') {
          const hash = item.dataset.hash;
          if (hash) window.location.hash = hash;
        }
      });
    });
  },

  openKeyboardShortcutsModal() {
    Modal.open({
      title: 'Power-User Keyboard Shortcuts',
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs">
          <p class="text-[#64748B]">Boost your daily ERP workflow speed with integrated keyboard shortcuts for search, navigation, and item creation.</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Search & Actions -->
            <div class="border border-[#E2E8F0] rounded-xl p-3.5 bg-[#FAFBFC]">
              <div class="text-[11px] font-bold text-[#0F172A] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                Search & Workspace Controls
              </div>
              <div class="space-y-2">
                <div class="flex items-center justify-between py-1 border-b border-[#F1F5F9]">
                  <span class="text-[#334155] font-medium">Focus Live Search</span>
                  <div class="flex items-center gap-1"><kbd class="px-2 py-0.5 bg-white border border-[#CBD5E1] rounded text-[11px] font-semibold text-[#0F172A]">Ctrl</kbd><kbd class="px-2 py-0.5 bg-white border border-[#CBD5E1] rounded text-[11px] font-semibold text-[#0F172A]">K</kbd> <span class="text-[#94A3B8]">or</span> <kbd class="px-2 py-0.5 bg-white border border-[#CBD5E1] rounded text-[11px] font-semibold text-[#0F172A]">/</kbd></div>
                </div>
                <div class="flex items-center justify-between py-1 border-b border-[#F1F5F9]">
                  <span class="text-[#334155] font-medium">Toggle Sidebar</span>
                  <div class="flex items-center gap-1"><kbd class="px-2 py-0.5 bg-white border border-[#CBD5E1] rounded text-[11px] font-semibold text-[#0F172A]">[</kbd> <span class="text-[#94A3B8]">or</span> <kbd class="px-2 py-0.5 bg-white border border-[#CBD5E1] rounded text-[11px] font-semibold text-[#0F172A]">Ctrl</kbd><kbd class="px-2 py-0.5 bg-white border border-[#CBD5E1] rounded text-[11px] font-semibold text-[#0F172A]">B</kbd></div>
                </div>
                <div class="flex items-center justify-between py-1 border-b border-[#F1F5F9]">
                  <span class="text-[#334155] font-medium">Quick Create (New Entry)</span>
                  <div class="flex items-center gap-1"><kbd class="px-2 py-0.5 bg-white border border-[#CBD5E1] rounded text-[11px] font-semibold text-[#0F172A]">Alt</kbd><kbd class="px-2 py-0.5 bg-white border border-[#CBD5E1] rounded text-[11px] font-semibold text-[#0F172A]">N</kbd></div>
                </div>
                <div class="flex items-center justify-between py-1 border-b border-[#F1F5F9]">
                  <span class="text-[#334155] font-medium">Open Shortcuts Cheatsheet</span>
                  <kbd class="px-2 py-0.5 bg-white border border-[#CBD5E1] rounded text-[11px] font-semibold text-[#0F172A]">?</kbd>
                </div>
                <div class="flex items-center justify-between py-1">
                  <span class="text-[#334155] font-medium">Close Modal / Search Dropdown</span>
                  <kbd class="px-2 py-0.5 bg-white border border-[#CBD5E1] rounded text-[11px] font-semibold text-[#0F172A]">Esc</kbd>
                </div>
              </div>
            </div>

            <!-- Section Switching -->
            <div class="border border-[#E2E8F0] rounded-xl p-3.5 bg-[#FAFBFC]">
              <div class="text-[11px] font-bold text-[#0F172A] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                Switching Sections (Alt + 1-8)
              </div>
              <div class="space-y-1.5">
                <div class="flex items-center justify-between py-0.5">
                  <span class="text-[#334155]">1. Purchase / Raw Material</span>
                  <div class="flex gap-1"><kbd class="px-1.5 py-0.5 bg-white border border-[#CBD5E1] rounded text-[10px] font-semibold text-[#0F172A]">Alt</kbd><kbd class="px-1.5 py-0.5 bg-white border border-[#CBD5E1] rounded text-[10px] font-semibold text-[#0F172A]">1</kbd></div>
                </div>
                <div class="flex items-center justify-between py-0.5">
                  <span class="text-[#334155]">2. Pre-Processing Floor</span>
                  <div class="flex gap-1"><kbd class="px-1.5 py-0.5 bg-white border border-[#CBD5E1] rounded text-[10px] font-semibold text-[#0F172A]">Alt</kbd><kbd class="px-1.5 py-0.5 bg-white border border-[#CBD5E1] rounded text-[10px] font-semibold text-[#0F172A]">2</kbd></div>
                </div>
                <div class="flex items-center justify-between py-0.5">
                  <span class="text-[#334155]">3. Quality Control (QC)</span>
                  <div class="flex gap-1"><kbd class="px-1.5 py-0.5 bg-white border border-[#CBD5E1] rounded text-[10px] font-semibold text-[#0F172A]">Alt</kbd><kbd class="px-1.5 py-0.5 bg-white border border-[#CBD5E1] rounded text-[10px] font-semibold text-[#0F172A]">3</kbd></div>
                </div>
                <div class="flex items-center justify-between py-0.5">
                  <span class="text-[#334155]">4. Production Operations</span>
                  <div class="flex gap-1"><kbd class="px-1.5 py-0.5 bg-white border border-[#CBD5E1] rounded text-[10px] font-semibold text-[#0F172A]">Alt</kbd><kbd class="px-1.5 py-0.5 bg-white border border-[#CBD5E1] rounded text-[10px] font-semibold text-[#0F172A]">4</kbd></div>
                </div>
                <div class="flex items-center justify-between py-0.5">
                  <span class="text-[#334155]">5. Coldstore Storage & Intake</span>
                  <div class="flex gap-1"><kbd class="px-1.5 py-0.5 bg-white border border-[#CBD5E1] rounded text-[10px] font-semibold text-[#0F172A]">Alt</kbd><kbd class="px-1.5 py-0.5 bg-white border border-[#CBD5E1] rounded text-[10px] font-semibold text-[#0F172A]">5</kbd></div>
                </div>
                <div class="flex items-center justify-between py-0.5">
                  <span class="text-[#334155]">6. Sales & Export Logistics</span>
                  <div class="flex gap-1"><kbd class="px-1.5 py-0.5 bg-white border border-[#CBD5E1] rounded text-[10px] font-semibold text-[#0F172A]">Alt</kbd><kbd class="px-1.5 py-0.5 bg-white border border-[#CBD5E1] rounded text-[10px] font-semibold text-[#0F172A]">6</kbd></div>
                </div>
                <div class="flex items-center justify-between py-0.5">
                  <span class="text-[#334155]">7. Analytics & Reports</span>
                  <div class="flex gap-1"><kbd class="px-1.5 py-0.5 bg-white border border-[#CBD5E1] rounded text-[10px] font-semibold text-[#0F172A]">Alt</kbd><kbd class="px-1.5 py-0.5 bg-white border border-[#CBD5E1] rounded text-[10px] font-semibold text-[#0F172A]">7</kbd></div>
                </div>
                <div class="flex items-center justify-between py-0.5">
                  <span class="text-[#334155]">8. System Settings & Users</span>
                  <div class="flex gap-1"><kbd class="px-1.5 py-0.5 bg-white border border-[#CBD5E1] rounded text-[10px] font-semibold text-[#0F172A]">Alt</kbd><kbd class="px-1.5 py-0.5 bg-white border border-[#CBD5E1] rounded text-[10px] font-semibold text-[#0F172A]">8</kbd></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Got It', type: 'primary', onClick: (m) => m.close() }
      ]
    });
  }
};

// Expose App globally
window.App = App;
window.switchERPLayout = () => {
  localStorage.setItem('erp_layout_mode', 'option1');
  const shell = document.getElementById('erp-app-shell');
  if (shell) shell.remove();
  App.route();
};

// Auto boot on DOM load or immediately if already ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
