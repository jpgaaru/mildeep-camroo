/* ================================================================
   UI CONTROLLERS, RENDERERS & ANIMATIONS
   ================================================================ */

/* ================= KPI ACTIONS ================= */
function exportKpiCard(title) {
  showToast('info', 'Exporting Data', `Exporting dataset for ${title}...`);
  setTimeout(() => showToast('success', 'Export Complete', `${title} data exported to CSV`), 1200);
}

function filterKpiCard(title) {
  showToast('info', 'Filter KPI', `Filter options opened for ${title}`);
}

/* ================= NAVIGATION ================= */
function navigateModule(m) { 
  navigate(m, MODULES[m].subs[0].id); 
}

function navigate(moduleId, subId) {
  showPageLoader();
  state.module = moduleId; 
  state.sub = subId;
  const mod = MODULES[moduleId];

  document.querySelectorAll('#primaryNav .nav-item').forEach(n => n.classList.toggle('active', n.dataset.module === moduleId));
  
  const nav = document.getElementById('secondaryNav');
  nav.innerHTML = mod.subs.map(s => `<div class="sub-nav-item ${s.id === subId ? 'active' : ''}" tabindex="0" role="tab" onclick="navigate('${moduleId}','${s.id}')">${s.label}${s.badge ? `<span class="sub-nav-badge pulse">${s.badge}</span>` : ''}</div>`).join('');
  
  // Render 3rd Layer Navigation Bar (Tab Menu UI — matching Sub-Menu aesthetic)
  const currentSub = mod.subs.find(s => s.id === subId);
  const tertiaryNav = document.getElementById('tertiaryNav');
  if (tertiaryNav) {
    if (currentSub && currentSub.tertiary && currentSub.tertiary.length >= 1) {
      tertiaryNav.style.display = 'flex';
      const validIds = currentSub.tertiary.map(t => t.id);
      if (!state.tertiary || !validIds.includes(state.tertiary)) {
        state.tertiary = currentSub.tertiary[0].id;
      }
      const activeTertId = state.tertiary;
      tertiaryNav.innerHTML = currentSub.tertiary.map(t => `
        <div class="tertiary-nav-item ${t.id === activeTertId ? 'active' : ''}" tabindex="0" role="tab" data-id="${t.id}" onclick="switchTertiarySubTab('${subId}', '${t.id}', this)">
          ${t.label}
        </div>
      `).join('');
    } else {
      tertiaryNav.style.display = 'none';
      tertiaryNav.innerHTML = '';
      state.tertiary = null;
    }
  }
  
  const crumbMod = document.getElementById('crumbModule');
  const crumbSub = document.getElementById('crumbSub');
  crumbMod.textContent = mod.label;
  crumbSub.textContent = (mod.subs.find(s => s.id === subId) || {}).label || subId;
  crumbSub.classList.remove('swap');
  void crumbSub.offsetWidth;
  crumbSub.classList.add('swap');

  document.querySelectorAll('.module-page').forEach(p => p.classList.remove('active'));
  
  const BUILT_PAGES = {
    sales: ['dashboard'],
    purchase: ['purchasedashboard'],
    preprocessing: ['preprocessdevelopment'],
    qc: ['qcdashboard'],
    production: ['proddevelopment'],
    coldstore: ['coldstoredevelopment'],
    inventory: ['invgeneralstore']
  };

  const isBuilt = BUILT_PAGES[moduleId] && BUILT_PAGES[moduleId].includes(subId);
  let activePage = null;

  if (isBuilt) {
    let targetPageId = 'page-' + subId;
    if (moduleId === 'purchase' && subId === 'purchasedashboard') targetPageId = 'page-purchase';
    if (moduleId === 'preprocessing' && subId === 'preprocessdevelopment') targetPageId = 'page-preprocessing';
    if (moduleId === 'qc' && subId === 'qcdashboard') targetPageId = 'page-qc';
    if (moduleId === 'production' && subId === 'proddevelopment') targetPageId = 'page-production';
    if (moduleId === 'coldstore' && subId === 'coldstoredevelopment') targetPageId = 'page-coldstore';
    if (moduleId === 'inventory' && subId === 'invgeneralstore') targetPageId = 'page-inventory';

    const pageEl = document.getElementById(targetPageId);
    if (pageEl) {
      pageEl.classList.add('active');
      activePage = pageEl;
    } else {
      const g = document.getElementById('page-generic');
      if (g) { g.classList.add('active'); renderUnderConstructionPage(subId, state.tertiary); activePage = g; }
    }
  } else {
    const g = document.getElementById('page-generic');
    if (g) { g.classList.add('active'); renderUnderConstructionPage(subId, state.tertiary); activePage = g; }
  }

  document.getElementById('contentArea').scrollTop = 0;
  
  if (isBuilt && PAGE_INIT[subId]) PAGE_INIT[subId]();
  if (activePage) hookPageEnter(activePage);
  
  if (window.lucide) lucide.createIcons();
}

const PAGE_INIT = {
  dashboard: initSalesDashboardCharts,
  purchasedashboard: () => {
    if (window.Pages && window.Pages.renderPurchaseDashboard) {
      window.Pages.renderPurchaseDashboard();
    }
    initPurchaseDashboardCharts();
  },
  preprocessdevelopment: () => showToast('info', 'Preprocessing', 'Viewing Consolidation Report'),
  qcdashboard: () => { initQCDashboardCharts(); renderQCLotsTable(1); renderPOGradeTable(1); },
  proddevelopment: renderProductionStandardYieldsTable,
  coldstoredevelopment: () => showToast('info', 'Coldstore', 'Viewing Daily Stock Report'),
  invgeneralstore: renderInventoryIndentTable,
  products: renderProducts,
  buyers: renderBuyers,
  sales: initSalesCharts,
  orders: () => renderOrdersKanban(),
  payments: initPaymentCharts,
  insurance: renderInsurance,
  reports: renderReports
};

/* ================= BRAND & MULTI-TENANCY MANAGEMENT ================= */
const BRANDS = {
  mildeep: {
    name: 'Mildeep',
    subtitle: 'Powered by Camaroo',
    logo: 'mildeep-logo.svg',
    email: 'Mildeep@admin.com',
    passcode: 'Qwerty123',
    portalTitle: 'Mildeep Fisheries Portal',
    themeClass: 'theme-mildeep',
    authLogoSvg: `<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1298.6 251.6" class="h-10 md:h-12 w-auto fill-white drop-shadow-md">
      <path d="M997.8,208h-14c0-.3-.4-.8-1.1-.9-19.8-2.6-37-11.9-50.3-26.5-13.5-14.9-20-33.1-19.7-53.1.4-23.7,10.9-44,29-58.7,31.2-25.3,75.2-23.9,104.7,3.3s22.2,29.2,24.3,48.2c5,45.2-28.3,83.6-73,87.5ZM992.4,157.1c9.9-.4,19.5-5.6,24.2-13.8,5.1-8.7,4.9-20.7-.2-29.3-5.1-8.6-15.6-12.8-24.9-12.7s-18.9,4.7-23.9,13.1c-5.6,9.3-4.8,20.9,0,30.3,5.9,7.4,14.3,12.8,24.9,12.4Z"/>
      <path d="M519.9,108.8c-4.2,4.1-5.1,10.8-5.1,16.1l-.5,62.1c0,6.2-2.8,13-8.8,15.2-10.3,3.8-22.3,3.8-32.6,0s-8.8-9.1-8.8-15.2l-.5-63c0-5.8-2-11.9-6.3-15.7-6.2-5.5-16.9-5.4-22.6.5s-5.8,11.2-5.8,17.5l-.4,60.7c0,5.1-1.9,12-6.9,14.3-10.8,5-24.2,5-35.3.6s-8-8.6-8-14v-117c0-8,5.8-14.4,13.2-15.7,9.1-1.7,18.5-1.8,27.1,1.4,6.8,2.5,9.1,10.3,9,17.2,5.7-6.8,11.2-14.5,20.1-17.5,21.6-7.5,45.1,2.4,56.2,22.3,9.3-12.5,21.2-20.8,35.6-24.3,24.6-3.4,46.6,11.3,54.8,34.4,3.6,10.9,5.6,21.9,5.6,33.8v65.1c-.1,6.2-3.4,12.8-9.1,14.9-9.2,3.4-18.8,3-28.3,1.2-7.1-1.4-12.4-7.1-12.4-14.8l-.7-64.4c0-6-1.8-12-6.3-16s-17-5.8-23.2.3Z"/>
      <path d="M770.4,192.1c-1.2,13.5-21.8,13.7-36.4,11.1s-11.3-6-12.3-13.5c-15.8,19.3-47.3,18.8-67.6,4.4s-20.5-17.6-26.9-29.9c-19.7-37.3-4.6-81.6,32.6-102.5s46-10.1,61.6,8c1.3-7.2,5.4-12.5,12.5-14.1,9.4-2.1,20.1-2.3,29.3,1.4,5.7,2.3,8.2,9.7,8.2,16l.3,106.7-1.1,12.4ZM715.6,116.5c-5.7-9.5-14.9-13.6-25.8-11.9-8.9,1.3-16.8,8.3-19.8,18.1-3.4,11,1.9,22.3,11.3,28s21.9,4.8,29.8-3c8.8-8.6,10.8-20.5,4.4-31.2Z"/>
      <path d="M305.3,189.6c-13.4,17.7-42.8,18.5-61.5,8-35.9-20.2-51.9-62.6-34.4-100,7-15.1,18.6-26.7,32.5-35.3,20.9-12,48.3-11.2,63.2,7.7,1-7.1,5.1-12.7,12.1-14.4,9.5-2.3,20.7-2.6,30,1.5s7.8,10.1,7.8,15.9v114.5c0,8.9-5.6,15.1-13.9,16.2-7.5,1-14.8.8-22.2-.3s-12.4-5.8-13.6-13.8ZM292.2,149.9c13.3-9.8,14.4-26.3,3.6-38.2-8.8-9.8-24.7-10.1-34.5-1.1-9.6,8.9-11.6,23.3-3.4,33.7,8,10.2,23.1,13.8,34.3,5.6Z"/>
      <path d="M1172.6,207h-16.4c-21.7-1.8-40.7-13.3-54.3-29.9-12.1-14.8-17.2-32.5-16.5-51.5s10.3-40.4,26.3-54.6c30.2-26.7,74.9-27,105.3-.5s27.6,37.3,26.7,62.2c-1.4,38.8-32.3,71.3-71.1,74.3ZM1165,157.1c10.4-.3,18.4-5.9,24.1-13.2,4.5-9.3,5.3-20.6-.1-29.8-5.1-8.5-15.3-13-24.8-12.9s-19,4.5-24,12.9c-5.6,9.3-5.5,22.1.6,31.1,5.1,7.6,14.6,12.1,24.2,11.8Z"/>
      <path d="M144.8,151.6c8.1-4.5,14.4-10.3,23.1-4.6,12.9,8.4,27,26.1,16.3,38-14.2,15.8-34.6,22.1-55.7,21.2-14.3-.6-26.6-5.1-38.8-12.5-19.9-12-33.2-31.9-35.3-55.4-1.2-6.4-1.2-12.5,0-18.9,2.2-23.1,15.6-42.5,35.1-54.6,30.1-18.8,66.1-16,93.3,6.7,12.4,10.3.5,30.2-12,40.2s-19.4-1.3-27.1-5.3c-11.7-6.1-26.6-1.9-34.1,9.2-5.2,7.6-5.4,18.6-.9,26.7,7.3,12.9,23.6,16.3,36.2,9.4Z"/>
      <path d="M844.8,186.6c0,6.3-2.4,13-7.9,15.3-9.8,4.2-20.9,3.9-31.1,1.3-6.2-1.6-11.3-7-11.3-13.9v-117.2c0-5.3,2.2-12.3,7.2-14.5,10.8-5,24.2-4.6,35.1-.6s6.6,7.8,7.9,12.2c16.9-16.7,32.6-20.3,54.5-12.6,15.9,5.6,12.7,30.5,1.7,44s-12.6,6.7-19.1,4.1-16.1-5-24.2-1.4c-5.8,2.6-12.2,7.6-12.2,14.4l-.5,68.9Z"/>
    </svg>`
  },
  devifisheries: {
    name: 'Devi Fisheries',
    subtitle: 'Enterprise Seafood Management',
    logo: 'devi-fisheries-logo.svg',
    email: 'devifisheries@admin.com',
    passcode: 'Qwerty123',
    portalTitle: 'Devi Fisheries Enterprise Portal',
    themeClass: 'theme-devifisheries',
    authLogoSvg: `<img src="devi-fisheries-logo.svg" alt="Devi Fisheries Logo" class="h-16 md:h-20 w-auto drop-shadow-lg bg-white/95 p-3 rounded-2xl" />`
  }
};

function switchLoginBrand(brandKey) {
  const brand = BRANDS[brandKey] || BRANDS.mildeep;
  state.brand = brandKey;
  
  const emailInput = document.getElementById('authEmail');
  const pwdInput = document.getElementById('authPasscode');
  if (emailInput) emailInput.value = brand.email;
  if (pwdInput) pwdInput.value = brand.passcode;
  
  const logoContainer = document.getElementById('authLogoContainer');
  if (logoContainer) logoContainer.innerHTML = brand.authLogoSvg;
  
  const portalFooter = document.getElementById('authPortalFooter');
  if (portalFooter) portalFooter.textContent = `— ${brand.portalTitle}`;
  
  const tabMildeep = document.getElementById('brandTabMildeep');
  const tabDevi = document.getElementById('brandTabDevi');
  const submitBtn = document.getElementById('submitBtn');
  
  if (brandKey === 'devifisheries') {
    if (tabMildeep) tabMildeep.className = 'flex-1 py-2.5 px-4 text-xs font-bold rounded-lg transition-all text-slate-500 hover:text-slate-900 flex items-center justify-center space-x-2 cursor-pointer';
    if (tabDevi) tabDevi.className = 'flex-1 py-2.5 px-4 text-xs font-bold rounded-lg transition-all shadow-sm bg-white text-slate-900 border border-slate-200/80 flex items-center justify-center space-x-2 cursor-pointer';
    if (submitBtn) submitBtn.className = 'w-full py-4 px-6 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold rounded-xl shadow-lg shadow-sky-600/25 transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-sky-600/40 transform hover:-translate-y-0.5';
  } else {
    if (tabMildeep) tabMildeep.className = 'flex-1 py-2.5 px-4 text-xs font-bold rounded-lg transition-all shadow-sm bg-white text-slate-900 border border-slate-200/80 flex items-center justify-center space-x-2 cursor-pointer';
    if (tabDevi) tabDevi.className = 'flex-1 py-2.5 px-4 text-xs font-bold rounded-lg transition-all text-slate-500 hover:text-slate-900 flex items-center justify-center space-x-2 cursor-pointer';
    if (submitBtn) submitBtn.className = 'w-full py-4 px-6 bg-brand-400 hover:bg-brand-500 active:bg-brand-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-brand-400/25 transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-brand-400/40 transform hover:-translate-y-0.5';
  }
}

function applyBrand(brandKey) {
  const brand = BRANDS[brandKey] || BRANDS.mildeep;
  state.brand = brandKey;
  localStorage.setItem('mildeep_active_brand', brandKey);
  
  document.body.classList.remove('theme-mildeep', 'theme-devifisheries');
  document.body.classList.add(brand.themeClass);
  
  const headerLogo = document.getElementById('headerBrandLogo');
  const headerTitle = document.getElementById('headerBrandTitle');
  const headerSub = document.getElementById('headerBrandSubtitle');
  
  if (headerLogo) headerLogo.src = brand.logo;
  if (headerTitle) headerTitle.textContent = brand.name;
  if (headerSub) headerSub.textContent = brand.subtitle;
  
  document.title = `${brand.name} - Enterprise Seafood Portal`;
}

function initBrand() {
  const savedBrand = localStorage.getItem('mildeep_active_brand') || 'mildeep';
  applyBrand(savedBrand);
  switchLoginBrand(savedBrand);
}

/* ================= AUTHENTICATION & SESSION MANAGEMENT ================= */
function handleAuthLogin(e) {
  if (e) e.preventDefault();
  const email = document.getElementById('authEmail')?.value || 'Mildeep@admin.com';
  
  let selectedBrand = 'mildeep';
  if (email.toLowerCase().includes('devi')) {
    selectedBrand = 'devifisheries';
  } else if (state.brand) {
    selectedBrand = state.brand;
  }
  
  applyBrand(selectedBrand);
  
  showPageLoader();
  setTimeout(() => {
    state.isAuthenticated = true;
    const authScreen = document.getElementById('authScreen');
    if (authScreen) authScreen.classList.add('hidden');
    showToast('success', 'Welcome Back', `Logged in to ${BRANDS[selectedBrand].name} Portal as Super Admin (${email})`);
    navigate('sales', 'dashboard');
  }, 350);
}

function handleAuthLogout() {
  showPageLoader();
  setTimeout(() => {
    state.isAuthenticated = false;
    const authScreen = document.getElementById('authScreen');
    if (authScreen) authScreen.classList.remove('hidden');
    showToast('info', 'Signed Out', 'You have been signed out of your enterprise session');
  }, 300);
}

function toggleAuthPasscode() {
  const pwd = document.getElementById('authPasscode');
  const btn = document.getElementById('authTogglePwd');
  if (!pwd || !btn) return;
  if (pwd.type === 'password') {
    pwd.type = 'text';
    btn.textContent = 'Show';
  } else {
    pwd.type = 'password';
    btn.textContent = 'Hide';
  }
}

function quickLoginSSO(provider) {
  showToast('info', `${provider} SSO`, `Initiating Single Sign-On via ${provider}...`);
  setTimeout(() => {
    handleAuthLogin(null);
  }, 400);
}

/* ================= GENERIC PAGES & UNDER CONSTRUCTION ================= */
function renderUnderConstructionPage(subId, tertId) {
  const g = document.getElementById('page-generic');
  if (!g) return;

  const modLabel = (state.module && MODULES[state.module] && MODULES[state.module].label) || state.module;
  const currentSubObj = state.module && MODULES[state.module] && MODULES[state.module].subs.find(s => s.id === subId);
  const subLabel = currentSubObj ? currentSubObj.label : subId;
  
  let tertLabel = '';
  if (currentSubObj && currentSubObj.tertiary && tertId) {
    const tertObj = currentSubObj.tertiary.find(t => t.id === tertId);
    if (tertObj) tertLabel = tertObj.label;
  }

  const titleText = `${modLabel} ${subLabel ? ' › ' + subLabel : ''} ${tertLabel ? ' › ' + tertLabel : ''}`;

  g.innerHTML = `
    <div style="min-height: 65vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 20px; text-align: center; background: #FFFFFF; border-radius: 16px; border: 1px solid #F1F5F9; box-shadow: 0 4px 20px rgba(0,0,0,0.03); margin-top: 12px;">
      
      <!-- Vector Illustration SVG (Yellow Design Palette) -->
      <div style="margin-bottom: 24px; position: relative;">
        <svg width="220" height="150" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="110" cy="138" rx="85" ry="10" fill="#FEF08A" opacity="0.6"/>
          <rect x="35" y="45" width="150" height="85" rx="8" fill="#FEFCE8" stroke="#EAB308" stroke-width="2"/>
          <rect x="35" y="45" width="150" height="24" rx="8" fill="#FACC15"/>
          <circle cx="48" cy="57" r="4" fill="#422006"/>
          <circle cx="60" cy="57" r="4" fill="#422006"/>
          <circle cx="72" cy="57" r="4" fill="#422006"/>
          <!-- Construction Gear & Crane -->
          <circle cx="110" cy="92" r="18" fill="#FFFFFF" stroke="#CA8A04" stroke-width="2.5" stroke-dasharray="4 3"/>
          <path d="M110 80 L110 104 M98 92 L122 92" stroke="#CA8A04" stroke-width="2.5"/>
          <path d="M165 30 L165 110" stroke="#0F172A" stroke-width="2.5" stroke-dasharray="5 3"/>
          <polygon points="165,25 185,45 165,45" fill="#FACC15"/>
          <!-- Safety Cone Vector -->
          <polygon points="180,128 195,95 205,95 220,128" fill="#F59E0B"/>
          <rect x="175" y="128" width="50" height="6" rx="2" fill="#78350F"/>
          <rect x="187" y="108" width="20" height="5" fill="#FFFFFF"/>
        </svg>
      </div>

      <span class="badge" style="padding: 6px 16px; font-size: 11px; font-weight: 800; margin-bottom: 12px; border-radius: 20px; text-transform: uppercase; background: #FEF3C7; color: #78350F; border: 1px solid #FDE047; letter-spacing: 0.05em;">
        Under Construction
      </span>

      <h2 style="font-size: 26px; font-weight: 800; color: #0F172A; margin-bottom: 8px; letter-spacing: -0.02em;">Oops, We're Under Construction!</h2>
      
      <p style="font-size: 14px; color: #64748B; max-width: 540px; line-height: 1.6; margin-bottom: 24px;">
        The enterprise module <span style="background:#F4F4F5;color:#09090B;padding:2px 10px;border-radius:6px;border:1px solid #E4E4E7;font-weight:700;">${titleText}</span> is currently being engineered according to standard workflow specifications.
      </p>

      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-primary" style="background: #FACC15; color: #422006; font-weight: 700; border: 1px solid #EAB308; padding: 10px 24px; border-radius: 8px; box-shadow: 0 2px 8px rgba(250,204,21,0.3);" onclick="navigate('sales', 'dashboard')">
          <i data-lucide="layout-dashboard" style="width:16px;height:16px;"></i> Return to Sales Dashboard
        </button>
        <button class="btn btn-default" style="padding: 10px 24px; border-radius: 8px; font-weight: 600;" onclick="showToast('info', 'Feature Access Logged', 'Priority access requested for ${subLabel}')">
          <i data-lucide="bell" style="width:16px;height:16px;"></i> Notify When Live
        </button>
      </div>

    </div>
  `;
  if (window.lucide) lucide.createIcons();
}

function renderGenericPage(id) {
  const cfg = GENERIC_PAGES[id];
  document.getElementById('genericTitle').textContent = cfg.title;
  document.getElementById('genericSubtitle').innerHTML = cfg.subtitle;
  document.getElementById('genericActions').innerHTML = `<button class="btn btn-default" onclick="exportDashboard()"><i data-lucide="download"></i> Export</button><button class="btn btn-primary" onclick="showToast('info','New','Opening create form')"><i data-lucide="plus"></i> New</button>`;
  
  document.getElementById('genericKpis').innerHTML = cfg.kpis.map(k => `
    <div class="kpi-card">
      <div class="kpi-header">
        <span class="kpi-title">${k.l}</span>
        <div class="kpi-actions">
          <button class="kpi-action-btn" title="Filter" onclick="event.stopPropagation();filterKpiCard('${k.l}')"><i data-lucide="filter"></i></button>
          <button class="kpi-action-btn" title="Export" onclick="event.stopPropagation();exportKpiCard('${k.l}')"><i data-lucide="download"></i></button>
          <div class="kpi-icon ${k.c}"><i data-lucide="${k.i}"></i></div>
        </div>
      </div>
      <div class="kpi-value">${k.v}</div>
      <div class="kpi-trend ${k.d === 'up' ? 'trend-up' : k.d === 'down' ? 'trend-down' : 'trend-neutral'}">${k.d ? `<i data-lucide="trending-${k.d}"></i>` : ''} ${k.t}</div>
    </div>`).join('');
  
  const chartWrap = document.getElementById('genericChartWrap');
  if (cfg.chart) {
    chartWrap.style.display = 'grid';
    document.getElementById('genericChartTitle').textContent = cfg.chart.title;
    if (state.charts.generic) state.charts.generic.destroy();
    state.charts.generic = new Chart(document.getElementById('genericChart'), {
      type: cfg.chart.type,
      data: { labels: cfg.chart.labels, datasets: cfg.chart.datasets.map(d => ({ label: d.label, data: d.data, backgroundColor: d.color, borderRadius: 6, barPercentage: 0.65 })) },
      options: { responsive: true, maintainAspectRatio: false, scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { color: '#F3F4F6' } } } }
    });
  } else {
    chartWrap.style.display = 'none';
  }

  const t = cfg.table;
  document.getElementById('genericTableWrap').innerHTML = `
    <div class="data-card">
      <div class="data-card-header"><div><div class="data-card-title">${t.title}</div><div class="data-card-subtitle">${t.rows.length} records</div></div></div>
      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>${t.columns.map(c => `<th>${c}</th>`).join('')}<th style="text-align:right;">Actions</th></tr>
          </thead>
          <tbody>
            ${t.rows.map(r => `<tr onclick="showToast('info','Record','Opening details')">${r.map(c => `<td>${c}</td>`).join('')}<td><div class="row-actions"><button class="btn btn-sm btn-icon btn-ghost" onclick="event.stopPropagation();showToast('info','View','Opening record')"><i data-lucide="eye"></i></button><button class="btn btn-sm btn-icon btn-ghost" onclick="event.stopPropagation();showToast('info','Edit','Opening editor')"><i data-lucide="edit"></i></button></div></td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
  
  if (window.lucide) lucide.createIcons();
}

/* ================= MODULE RENDERERS ================= */
function renderProducts() {
  document.getElementById('productsGrid').innerHTML = PRODUCTS.map(p => {
    const sb = p.stock < 10 ? 'badge-error' : p.stock < 50 ? 'badge-warning' : 'badge-success';
    const sl = p.stock < 10 ? 'Low Stock' : p.stock < 50 ? 'Limited' : 'Available';
    return `<div class="product-card" onclick="showToast('info','Product','Opening ${p.name}')">
      <div class="product-image"><img src="${p.img}" alt="${p.name}" class="product-img-real" loading="lazy" /></div>
      <div class="product-name">${p.name}</div><div class="product-sku">${p.sku}</div>
      <div class="product-price">$${p.price.toLocaleString('en-IN')}</div><div class="product-unit">per ton · FOB Kochi</div>
      <div class="product-stats"><div class="product-stat"><div class="product-stat-value">${p.stock}</div><div class="product-stat-label">Stock (T)</div></div><div class="product-stat"><div class="product-stat-value">${p.sold.toLocaleString('en-IN')}</div><div class="product-stat-label">Sold</div></div><div class="product-stat"><div class="product-stat-value">★ ${p.rating}</div><div class="product-stat-label">Rating</div></div></div>
      <div style="margin-top:8px;">${badge(sb.slice(6), sl)}</div></div>`;
  }).join('');
}

function renderBuyers() {
  document.getElementById('buyersTableBody').innerHTML = BUYERS.map(b => `<tr onclick="showToast('info','Buyer','Opening ${b.name}')">
    <td><div style="display:flex;align-items:center;gap:9px;"><div class="avatar" style="width:28px;height:28px;font-size:10px;">${b.name.slice(0,2).toUpperCase()}</div><strong>${b.name}</strong></div></td>
    <td>${b.flag} ${b.country}</td><td>${b.contact}</td><td><strong>${b.orders}</strong></td><td><strong>$${(b.revenue/1e6).toFixed(2)}M</strong></td><td>$${b.credit.toLocaleString('en-IN')}</td>
    <td>${badge(b.status === 'active' ? 'success' : 'gray', b.status)}</td>
    <td><div class="row-actions"><button class="btn btn-sm btn-icon btn-ghost" onclick="event.stopPropagation();showToast('info','Email','Composing...')"><i data-lucide="mail"></i></button><button class="btn btn-sm btn-icon btn-ghost" onclick="event.stopPropagation();showToast('info','Call','Dialing...')"><i data-lucide="phone"></i></button></div></td></tr>`).join('');
}

function renderInsurance() {
  document.getElementById('insuranceTableBody').innerHTML = `
    <tr><td><span class="row-id">POL-2026-001</span></td><td>Marine Cargo</td><td>Lloyd's of London</td><td>$5M</td><td>$45,000</td><td>Dec 31, 2026</td><td>${badge('success','Active')}</td><td style="text-align:right;"><button class="btn btn-sm btn-icon btn-ghost"><i data-lucide="eye"></i></button></td></tr>
    <tr><td><span class="row-id">POL-2026-002</span></td><td>Product Liability</td><td>Allianz</td><td>$2M</td><td>$18,500</td><td>Mar 15, 2027</td><td>${badge('success','Active')}</td><td style="text-align:right;"><button class="btn btn-sm btn-icon btn-ghost"><i data-lucide="eye"></i></button></td></tr>
    <tr><td><span class="row-id">POL-2026-003</span></td><td>Cold Chain</td><td>Zurich</td><td>$3M</td><td>$28,000</td><td>Jun 30, 2027</td><td>${badge('success','Active')}</td><td style="text-align:right;"><button class="btn btn-sm btn-icon btn-ghost"><i data-lucide="eye"></i></button></td></tr>
    <tr><td><span class="row-id">POL-2025-014</span></td><td>Workers Comp</td><td>State Farm</td><td>$1M</td><td>$12,000</td><td>Aug 15, 2026</td><td>${badge('warning','Expiring')}</td><td style="text-align:right;"><button class="btn btn-sm btn-icon btn-ghost"><i data-lucide="eye"></i></button></td></tr>`;
}

function renderReports() {
  const reportsList = [
    { title: 'Pending Contracts', code: 'PendingContracts', icon: 'file-clock', desc: 'Contract negotiations and pending signatures' },
    { title: 'Price Book Report', code: 'shipment-line-item-wise-price-report', icon: 'book-open', desc: 'Shipment line item-wise historical pricing' },
    { title: 'Approved Contracts', code: 'ApprovedContracts', icon: 'check-circle-2', desc: 'Fully executed contracts register' },
    { title: 'OUT of ETD/ETA Report', code: 'EtaStatus', icon: 'ship', desc: 'Vessel departure & arrival delays' },
    { title: 'FDA Examination Report', code: 'FDAExaminationReport', icon: 'file-search', desc: 'US FDA audit & clearance log' },
    { title: 'MPEDA Report', code: 'MpedaReport', icon: 'file-text', desc: 'Marine Products Export Development Authority log' },
    { title: 'Shipment Report', code: 'ShipmentReportsList', icon: 'container', desc: 'Export shipment status & container tracking' },
    { title: 'Lab Report', code: 'LabReportsList', icon: 'microscope', desc: 'Microbiological & chemical test certificates' },
    { title: 'Q Certificate Report', code: 'q-certificate-report', icon: 'shield-check', desc: 'Quality audit certificates register' },
    { title: 'Pending Payments', code: 'PendingPaymentsReport', icon: 'credit-card', desc: 'Overdue receivables & outstanding invoices' },
    { title: 'Pending Negotiation Report', code: 'PendingNegoReport', icon: 'briefcase', desc: 'Bank LC & document negotiations status' },
    { title: 'Bills Realization', code: 'PendingBillRealiztnReport', icon: 'dollar-sign', desc: 'Foreign exchange bill realization status' },
    { title: 'FC Utilized Report', code: 'FUUtilizedNPendingRprt', icon: 'wallet', desc: 'Forward contract utilization & outstanding balance' },
    { title: 'GST Sales report', code: 'gst-sales-report', icon: 'calculator', desc: 'GST filing & export GST refund claims' },
    { title: 'Clearing Agent Report', code: 'ClearingAgentReport', icon: 'user-check', desc: 'Customs house agent clearance log' },
    { title: 'M Transit Ins & Payments', code: 'm-transit-ins-and-payments', icon: 'umbrella', desc: 'Marine transit insurance claims & premium' },
    { title: 'Packing Report', code: 'PackingData', icon: 'box', desc: 'Master carton packing & gross weight register' },
    { title: 'Shipment LineItemwise Report', code: 'shipment-sales-line-itemwise-report', icon: 'list-ordered', desc: 'Granular SKU sales line item export' },
    { title: 'Return Container Report', code: 'return-container-report', icon: 'rotate-ccw', desc: 'Returned container audit & reason log' },
    { title: 'Freight Rates Report', code: 'FreightRatesReport', icon: 'trending-up', desc: 'Shipping line freight rates comparison' }
  ];

  const grid = document.getElementById('reportsGrid');
  if (grid) {
    grid.innerHTML = reportsList.map(r => `
      <div class="product-card" style="padding:20px;display:flex;flex-direction:column;justify-content:space-between;" onclick="showToast('info','Report','Generating ${r.title}...')">
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <div style="width:42px;height:42px;border-radius:10px;background:#FEFCE8;color:#CA8A04;display:flex;align-items:center;justify-content:center;">
              <i data-lucide="${r.icon}"></i>
            </div>
            <span class="badge badge-info" style="font-size:10px;">${r.code.split('-')[0]}</span>
          </div>
          <div class="product-name" style="font-size:14px;font-weight:700;margin-bottom:4px;">${r.title}</div>
          <div class="product-sku" style="font-size:12px;color:var(--colorTextSecondary);">${r.desc}</div>
        </div>
        <div style="margin-top:16px;display:flex;gap:8px;">
          <button class="btn btn-sm btn-primary" style="flex:1;" onclick="event.stopPropagation();downloadExcel('${r.code}')"><i data-lucide="download"></i> Excel</button>
          <button class="btn btn-sm btn-default" style="flex:1;" onclick="event.stopPropagation();showToast('info','PDF','Generating PDF...')"><i data-lucide="file-text"></i> PDF</button>
        </div>
      </div>
    `).join('');
  }
  if (window.lucide) lucide.createIcons();
}

function renderPurchaseTable() {
  const sup = ['Kerala Fishermen Co-op','Ocean Harvest Ltd','Blue Wave Traders','South India Catch','Coastal Aquafarms'];
  const prd = ['Raw Shrimp','Salmon Loins','Tuna','Mixed Seafood','Farmed Shrimp'];
  const st = [['info','In Transit'],['warning','Approval'],['success','Received'],['gray','Draft']];
  document.getElementById('purchaseTableBody').innerHTML = Array.from({length: 8}, (_, i) => {
    const s = st[i % st.length];
    return `<tr><td><span class="row-id">PO-2026-01${String(i).padStart(2,'0')}</span></td><td>${sup[i%5]}</td><td>${prd[i%5]}</td><td>${(Math.floor(Math.random()*14)+2)*1000} Kg</td><td>$${(Math.floor(Math.random()*50)+8)*1000}</td><td>${badge(s[0], s[1])}</td><td>Sep ${18+i}, 2026</td><td style="text-align:right;"><button class="btn btn-sm btn-icon btn-ghost"><i data-lucide="eye"></i></button></td></tr>`;
  }).join('');
}

function renderPreprocessBoard() {
  const stages = ['Received','Grading','Sorting','Cleaning','Packaging'];
  const colors = ['#2563EB','#D97706','#7C3AED','#0891B2','#059669'];
  document.getElementById('preprocessBoard').innerHTML = stages.map((s, i) => {
    const n = 2 + (i * 3) % 4;
    return `<div class="kanban-column"><div class="kanban-header"><div class="kanban-title"><span class="kanban-dot" style="background:${colors[i]}"></span>${s}</div><span class="kanban-count">${n}</span></div>
      <div class="kanban-cards">${Array.from({length: n}, (_, j) => `<div class="kanban-card" onclick="showToast('info','Lot','Opening LOT-08${40+i}${j}')">
      <div class="kanban-card-id">LOT-08${40+i}${j}</div><div class="kanban-card-title">${['White Shrimp','Tiger Shrimp','Tuna Loins','Squid'][ (i+j)%4 ]}</div>
      <div class="kanban-card-meta"><span><i data-lucide="weight"></i>${(Math.floor(Math.random()*9)+2)*1000} kg</span><span><i data-lucide="user"></i>${['RK','PS','MK'][(i+j)%3]}</span></div></div>`).join('')}</div></div>`;
  }).join('');
}

function renderProduction() {
  const names = ['Shrimp','Salmon','Tuna','Squid','Lobster','Crab'];
  document.getElementById('productionLines').innerHTML = names.map((n, i) => {
    const u = 55 + ((i * 13) % 45), running = i !== 3 && i !== 5;
    return `<div class="kpi-card">
      <div class="kpi-header">
        <span class="kpi-title">Line ${i+1} · ${n}</span>
        <div class="kpi-actions">
          <button class="kpi-action-btn" title="Filter" onclick="event.stopPropagation();filterKpiCard('Line ${i+1}')"><i data-lucide="filter"></i></button>
          <button class="kpi-action-btn" title="Export" onclick="event.stopPropagation();exportKpiCard('Line ${i+1}')"><i data-lucide="download"></i></button>
          <div class="kpi-icon ${running ? 'success' : 'warning'}"><i data-lucide="${running ? 'activity' : 'pause'}"></i></div>
        </div>
      </div>
      <div class="kpi-value">${running ? u + '%' : '—'}</div>
      <div class="kpi-trend ${running ? 'trend-up' : 'trend-neutral'}">${running ? 'Running' : i === 5 ? 'Maintenance' : 'Idle'}</div>
      <div style="margin-top:10px;"><div class="progress-label"><span>Output today</span><span>${running ? (u/10).toFixed(1) : 0} T</span></div><div class="progress-bar"><div class="progress-bar-fill" style="width:${running ? u : 0}%;"></div></div></div></div>`;
  }).join('');
}

function renderInventory() {
  document.getElementById('inventoryTableBody').innerHTML = PRODUCTS.map(p => {
    const sb = p.stock < 10 ? ['error','Critical'] : p.stock < 50 ? ['warning','Low'] : ['success','OK'];
    return `<tr><td><span class="row-id">${p.sku}</span></td><td><strong>${p.name}</strong></td><td><strong>${p.stock}</strong></td><td>20</td><td>CR-0${(p.stock%6)+1}</td><td>Mar 15, 2027</td><td>${badge(sb[0], sb[1])}</td>
      <td><div class="row-actions"><button class="btn btn-sm btn-icon btn-ghost"><i data-lucide="edit"></i></button><button class="btn btn-sm btn-icon btn-ghost"><i data-lucide="history"></i></button></div></td></tr>`;
  }).join('');
}

function renderColdRooms() {
  document.getElementById('coldroomGrid').innerHTML = COLD_ROOMS.map(r => `
    <div class="coldroom-card ${r.status === 'critical' ? 'critical' : ''}">
      <div class="coldroom-header"><div><div class="coldroom-name">${r.name}</div><div class="coldroom-code">${r.id} · ${r.product}</div></div>
      ${badge(r.status === 'critical' ? 'error' : r.status === 'warning' ? 'warning' : 'success', r.status === 'critical' ? 'Critical' : r.status === 'warning' ? 'Warning' : 'OK')}</div>
      <div class="coldroom-temp"><div class="coldroom-temp-value">${r.temp.toFixed(1)}</div><div class="coldroom-temp-unit">°C</div></div>
      <div class="coldroom-target">Target ${r.target}°C · Humidity ${r.humidity}%</div>
      <div style="margin-bottom:10px;"><div class="progress-label"><span>Capacity</span><span>${r.capacity}%</span></div><div class="progress-bar"><div class="progress-bar-fill" style="width:${r.capacity}%;"></div></div></div>
      <div class="coldroom-meta"><div><div class="coldroom-meta-label">Compressor</div><div class="coldroom-meta-value"><span class="status-dot online"></span>Running</div></div><div><div class="coldroom-meta-label">Door</div><div class="coldroom-meta-value">${r.status === 'critical' ? 'Open' : 'Closed'}</div></div><div><div class="coldroom-meta-label">Last Check</div><div class="coldroom-meta-value">2m ago</div></div><div><div class="coldroom-meta-label">Alerts</div><div class="coldroom-meta-value">${r.status === 'critical' ? '1 active' : 'None'}</div></div></div>
    </div>`).join('');
}

let tempInterval = null;
function startTempMonitoring() {
  if (tempInterval) clearInterval(tempInterval);
  tempInterval = setInterval(() => {
    if (state.sub !== 'coldstore') { clearInterval(tempInterval); tempInterval = null; return; }
    COLD_ROOMS.forEach(r => { r.temp = Math.max(-25, Math.min(-12, r.temp + (Math.random() - 0.5) * 0.4)); });
    renderColdRooms();
  }, 3000);
}

function renderQCChecklist() {
  document.getElementById('qcChecklist').innerHTML = QC_CHECKLIST.map((c, i) => `
    <div class="checklist-item ${c.checked ? 'checked' : ''}" onclick="QC_CHECKLIST[${i}].checked=!QC_CHECKLIST[${i}].checked;renderQCChecklist();">
      <div class="checklist-check"><i data-lucide="check"></i></div><div class="checklist-label">${c.label}</div><div class="checklist-value">${c.value}</div></div>`).join('');
}

/* ================= ORDERS MANAGEMENT ================= */
function renderOrdersKanban() {
  const board = document.getElementById('kanbanBoard');
  board.innerHTML = '';
  Object.keys(ORDER_STATUS_LABELS).forEach(status => {
    const orders = state.orders.filter(o => o.status === status);
    const col = document.createElement('div');
    col.className = 'kanban-column';
    col.addEventListener('dragover', e => { e.preventDefault(); col.classList.add('drag-over'); });
    col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
    col.addEventListener('drop', e => {
      e.preventDefault(); col.classList.remove('drag-over');
      const o = state.orders.find(x => x.id === e.dataTransfer.getData('orderId'));
      if (o) { o.status = status; renderOrdersKanban(); renderOrdersTable(); showToast('success', 'Order Updated', `${o.id} → ${ORDER_STATUS_LABELS[status]}`); }
    });
    col.innerHTML = `<div class="kanban-header"><div class="kanban-title"><span class="kanban-dot" style="background:${ORDER_STATUS_COLORS[status]}"></span>${ORDER_STATUS_LABELS[status]}</div><span class="kanban-count">${orders.length}</span></div><div class="kanban-cards"></div>`;
    const wrap = col.querySelector('.kanban-cards');
    orders.forEach(o => {
      const card = document.createElement('div');
      card.className = 'kanban-card'; card.draggable = true;
      card.addEventListener('dragstart', e => { e.dataTransfer.setData('orderId', o.id); card.classList.add('dragging'); });
      card.addEventListener('dragend', () => card.classList.remove('dragging'));
      card.onclick = () => openOrderDrawer(o.id);
      card.innerHTML = `<div class="kanban-card-id">${o.id}</div><div class="kanban-card-title">${o.customer}</div>
        <div class="kanban-card-meta"><span><i data-lucide="package"></i>${o.product.split(' ')[0]}</span><span><i data-lucide="weight"></i>${o.quantity}T</span><span><i data-lucide="dollar-sign"></i>$${(o.value/1000).toFixed(1)}K</span></div>
        <div class="kanban-card-footer"><div class="kanban-avatar">${o.assignee}</div>${badge('primary', o.destination)}</div>`;
      wrap.appendChild(card);
    });
    board.appendChild(col);
  });
  if (window.lucide) lucide.createIcons();
}

function renderOrdersTable() {
  const map = { new: ['info','New'], processing: ['warning','Processing'], quality: ['purple','In QC'], shipped: ['primary','Shipped'], delivered: ['success','Delivered'] };
  document.getElementById('ordersCount').textContent = state.orders.length;
  document.getElementById('ordersTableBody').innerHTML = state.orders.slice(0, 15).map(o => `<tr onclick="openOrderDrawer('${o.id}')">
    <td><span class="row-id">${o.id}</span></td><td>${o.customer}</td><td>${o.product}</td><td>${o.quantity}</td><td>$${o.value.toLocaleString('en-IN')}</td>
    <td>${badge(map[o.status][0], map[o.status][1])}</td><td>${o.shipDate.toLocaleDateString()}</td>
    <td><div class="row-actions"><button class="btn btn-sm btn-icon btn-ghost" onclick="event.stopPropagation();openOrderDrawer('${o.id}')"><i data-lucide="eye"></i></button><button class="btn btn-sm btn-icon btn-ghost" onclick="event.stopPropagation();showToast('info','Edit','Opening editor')"><i data-lucide="edit"></i></button></div></td></tr>`).join('');
}

function switchOrdersView(v, el) {
  document.querySelectorAll('#page-orders .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('#page-orders .tab-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('orders' + v[0].toUpperCase() + v.slice(1) + 'View').classList.add('active');
  if (v === 'kanban') renderOrdersKanban();
  if (v === 'table') renderOrdersTable();
  if (v === 'calendar') renderCalendar();
  if (window.lucide) lucide.createIcons();
}

function renderCalendar() {
  const today = new Date();
  const mn = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dim = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const fd = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  let h = `<h3 style="font-size:16px;font-weight:700;margin-bottom:12px;">${mn[today.getMonth()]} ${today.getFullYear()}</h3><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;">`;
  ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d => h += `<div style="padding:8px;text-align:center;font-size:11px;font-weight:700;color:var(--colorTextTertiary);">${d}</div>`);
  for (let i = 0; i < fd; i++) h += '<div></div>';
  for (let d = 1; d <= dim; d++) {
    const isT = d === today.getDate();
    const os = state.orders.filter(o => o.shipDate.getDate() === d && o.shipDate.getMonth() === today.getMonth());
    h += `<div style="padding:8px;min-height:78px;background:${isT ? 'var(--colorPrimaryBg)' : 'var(--colorBgLayout)'};border-radius:var(--borderRadius);border:${isT ? '2px solid var(--colorPrimary)' : '1px solid var(--colorBorderSecondary)'};">
      <div style="font-weight:${isT ? 700 : 500};color:${isT ? 'var(--colorPrimaryActive)' : 'var(--colorText)'};margin-bottom:4px;">${d}</div>
      ${os.slice(0, 2).map(o => `<div style="font-size:10px;padding:2px 4px;background:var(--colorPrimaryBg);color:var(--colorPrimaryActive);border-radius:3px;margin-bottom:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${o.id.slice(-4)}</div>`).join('')}
      ${os.length > 2 ? `<div style="font-size:10px;color:var(--colorTextTertiary);">+${os.length - 2} more</div>` : ''}</div>`;
  }
  document.getElementById('calendarView').innerHTML = h + '</div>';
}

function filterOrders() {
  const q = document.getElementById('orderSearch').value.toLowerCase();
  state.orders = q ? generateOrders().filter(o => (o.id + o.customer + o.product).toLowerCase().includes(q)) : generateOrders();
  renderOrdersKanban(); renderOrdersTable();
}

function filterOrdersByStatus(s) {
  state.orders = s === 'all' ? generateOrders() : generateOrders().filter(o => o.status === s);
  renderOrdersKanban(); renderOrdersTable();
}

function openOrderDrawer(id) {
  const o = state.orders.find(x => x.id === id); if (!o) return;
  document.getElementById('drawerSubtitle').textContent = o.id;
  document.getElementById('drawerBody').innerHTML = `
    <div class="drawer-section"><div class="drawer-section-title"><i data-lucide="info"></i> Order Information</div>
    <div class="drawer-info-grid">
    <div class="drawer-info-item"><div class="drawer-info-label">Customer</div><div class="drawer-info-value">${o.customer}</div></div>
    <div class="drawer-info-item"><div class="drawer-info-label">Product</div><div class="drawer-info-value">${o.product}</div></div>
    <div class="drawer-info-item"><div class="drawer-info-label">Quantity</div><div class="drawer-info-value">${o.quantity} Tons</div></div>
    <div class="drawer-info-item"><div class="drawer-info-label">Value</div><div class="drawer-info-value">$${o.value.toLocaleString('en-IN')}</div></div>
    <div class="drawer-info-item"><div class="drawer-info-label">Destination</div><div class="drawer-info-value">${o.destination}</div></div>
    <div class="drawer-info-item"><div class="drawer-info-label">Ship Date</div><div class="drawer-info-value">${o.shipDate.toLocaleDateString()}</div></div>
    </div></div>
    <div class="drawer-section"><div class="drawer-section-title"><i data-lucide="activity"></i> Order Timeline</div>
    <div class="timeline">
    <div class="timeline-item"><div class="timeline-dot success"></div><div class="timeline-content"><div class="timeline-title">Order Created</div><div class="timeline-desc">By Super Admin via web portal</div><div class="timeline-time">Sep 10, 2026 · 10:23 AM</div></div></div>
    <div class="timeline-item"><div class="timeline-dot success"></div><div class="timeline-content"><div class="timeline-title">Customer Confirmed</div><div class="timeline-desc">${o.customer} accepted terms</div><div class="timeline-time">Sep 10, 2026 · 2:45 PM</div></div></div>
    <div class="timeline-item"><div class="timeline-dot ${o.status !== 'new' ? 'success' : 'gray'}"></div><div class="timeline-content"><div class="timeline-title">Processing Started</div><div class="timeline-desc">Assigned to Plant Unit-3</div><div class="timeline-time">Sep 11, 2026 · 9:00 AM</div></div></div>
    <div class="timeline-item"><div class="timeline-dot ${['quality','shipped','delivered'].includes(o.status) ? 'success' : 'gray'}"></div><div class="timeline-content"><div class="timeline-title">Quality Check Passed</div><div class="timeline-desc">Inspector: Rajesh Kumar · Grade A</div><div class="timeline-time">Sep 13, 2026 · 4:15 PM</div></div></div>
    <div class="timeline-item"><div class="timeline-dot ${['shipped','delivered'].includes(o.status) ? 'success' : 'gray'}"></div><div class="timeline-content"><div class="timeline-title">Shipment Dispatched</div><div class="timeline-desc">Container MAEU-4521897</div><div class="timeline-time">Sep 15, 2026 · 6:30 AM</div></div></div>
    <div class="timeline-item"><div class="timeline-dot ${o.status === 'delivered' ? 'success' : 'gray'}"></div><div class="timeline-content"><div class="timeline-title">Delivered</div><div class="timeline-desc">Received at destination port</div><div class="timeline-time">Pending</div></div></div>
    </div></div>
    <div class="drawer-section"><div class="drawer-section-title"><i data-lucide="file-text"></i> Documents</div>
    ${[['file-text','Commercial Invoice','INV-' + o.id.slice(-4) + '.pdf · 142 KB'],['file-text','Bill of Lading','BOL-' + o.id.slice(-4) + '.pdf · 210 KB'],['shield-check','Certificate of Origin','COO-' + o.id.slice(-4) + '.pdf · 89 KB']].map(d => `
    <div style="display:flex;align-items:center;gap:10px;padding:10px;background:var(--colorBgLayout);border-radius:var(--borderRadius);cursor:pointer;margin-bottom:6px;" onclick="showToast('info','Download','${d[1]} downloading')">
    <i data-lucide="${d[0]}" style="width:16px;height:16px;color:var(--colorPrimary);"></i>
    <div style="flex:1;font-size:12px;"><div style="font-weight:600;">${d[1]}</div><div style="color:var(--colorTextTertiary);font-size:11px;">${d[2]}</div></div>
    <i data-lucide="download" style="width:14px;height:14px;color:var(--colorTextTertiary);"></i></div>`).join('')}</div>`;
  document.getElementById('orderDrawerOverlay').classList.add('open');
  document.getElementById('orderDrawer').classList.add('open');
  if (window.lucide) lucide.createIcons();
}

function closeDrawer() { 
  document.getElementById('orderDrawerOverlay').classList.remove('open'); 
  document.getElementById('orderDrawer').classList.remove('open'); 
}

/* ================= SETTINGS & ACTIVITY ================= */
function renderSettingsNav(active) {
  document.getElementById('settingsNav').innerHTML = MODULES.settings.subs.map(s => `<div class="settings-nav-item ${s.id === active ? 'active' : ''}" onclick="navigate('settings','${s.id}')"><i data-lucide="${{profile:'user',notifications:'bell',security:'shield',billing:'credit-card',integrations:'link',team:'users'}[s.id]}"></i> ${s.label}</div>`).join('');
}

function renderSettings(tab) {
  const S = {
    profile: `<div class="settings-section"><div class="settings-section-title">Profile Information</div><div class="settings-section-desc">Your personal and contact details</div>
      <div class="form-row"><div class="form-group"><label>Full Name</label><input type="text" class="ant-input" value="Super Admin" /></div><div class="form-group"><label>Email</label><input type="email" class="ant-input" value="admin@devifisheries.com" /></div></div>
      <div class="form-row"><div class="form-group"><label>Phone</label><input type="text" class="ant-input" value="+91 98765 43210" /></div><div class="form-group"><label>Role</label><input type="text" class="ant-input" value="Administrator" disabled /></div></div></div>
      <div class="settings-section"><div class="settings-section-title">Company</div>
      <div class="form-group"><label>Company Name</label><input type="text" class="ant-input" value="Devi Fisheries Limited" /></div>
      <div class="form-row"><div class="form-group"><label>GST Number</label><input type="text" class="ant-input" value="32AABCD1234E1Z5" /></div><div class="form-group"><label>IEC Code</label><input type="text" class="ant-input" value="0715001234" /></div></div></div>
      <button class="btn btn-primary" onclick="showToast('success','Saved','Profile updated')"><i data-lucide="save"></i> Save Changes</button>`,
    notifications: `<div class="settings-section"><div class="settings-section-title">Email Notifications</div>
      ${[['Order Updates','When order status changes',1],['Payment Receipts','Payment confirmations',1],['QC Alerts','Quality failures',1],['Marketing','Product updates',0]].map(r => `<div class="settings-row"><div><div class="settings-row-label">${r[0]}</div><div class="settings-row-desc">${r[1]}</div></div><div class="toggle ${r[2] ? 'on' : ''}" onclick="this.classList.toggle('on')"></div></div>`).join('')}</div>
      <div class="settings-section"><div class="settings-section-title">Push Notifications</div>
      ${[['Temperature Alerts','Critical cold storage alerts',1],['Shipment Tracking','Live status updates',1]].map(r => `<div class="settings-row"><div><div class="settings-row-label">${r[0]}</div><div class="settings-row-desc">${r[1]}</div></div><div class="toggle ${r[2] ? 'on' : ''}" onclick="this.classList.toggle('on')"></div></div>`).join('')}</div>`,
    security: `<div class="settings-section"><div class="settings-section-title">Password</div>
      <div class="form-group"><label>Current Password</label><input type="password" class="ant-input" /></div>
      <div class="form-row"><div class="form-group"><label>New Password</label><input type="password" class="ant-input" /></div><div class="form-group"><label>Confirm Password</label><input type="password" class="ant-input" /></div></div>
      <button class="btn btn-primary" onclick="showToast('success','Updated','Password changed')"><i data-lucide="key"></i> Update Password</button></div>
      <div class="settings-section"><div class="settings-section-title">Sessions</div>
      <div class="settings-row"><div><div class="settings-row-label">Chrome · Windows</div><div class="settings-row-desc">Current session · Kochi, India</div></div>${badge('success','Active')}</div>
      <div class="settings-row"><div><div class="settings-row-label">Safari · iPhone</div><div class="settings-row-desc">Last active 2 hours ago</div></div><button class="btn btn-sm btn-ghost" onclick="showToast('warning','Revoked','Session terminated')">Revoke</button></div></div>`,
    billing: `<div class="settings-section"><div class="settings-section-title">Current Plan</div>
      <div style="background:linear-gradient(135deg,var(--colorPrimaryBg),#FFF4CC);padding:20px;border-radius:var(--borderRadiusLG);border:1px solid var(--colorPrimaryBorder);">
      <div style="font-size:14px;font-weight:700;">Enterprise Plan</div>
      <div style="font-size:26px;font-weight:800;color:var(--colorPrimary);">$499<span style="font-size:12px;color:var(--colorTextTertiary);">/month</span></div>
      <div style="font-size:12px;color:var(--colorTextSecondary);margin-top:4px;">Renews on October 15, 2026</div></div></div>
      <div class="settings-section"><div class="settings-section-title">Payment Method</div>
      <div class="settings-row"><div><div class="settings-row-label">Visa ending in 4242</div><div class="settings-row-desc">Expires 12/2028</div></div><button class="btn btn-sm btn-default">Update</button></div></div>`,
    integrations: `<div class="settings-section"><div class="settings-section-title">Connected Services</div>
      ${[['📦','SAP ERP','Sync orders & inventory','Connected'],['🚢','Maersk API','Live shipment tracking','Connected'],['💳','Stripe','Payment processing','Connected'],['📊','Salesforce CRM','Customer management',null],['📬','Mailchimp','Email marketing',null]].map(r => `<div class="settings-row"><div><div class="settings-row-label">${r[0]} ${r[1]}</div><div class="settings-row-desc">${r[2]}</div></div>${r[3] ? badge('success', r[3]) : `<button class="btn btn-sm btn-primary" onclick="showToast('success','Connected','${r[1]} linked')">Connect</button>`}</div>`).join('')}</div>`,
    team: `<div class="settings-section"><div class="settings-section-title">Team Members</div>
      ${[['SA','Super Admin','admin@devifisheries.com · Owner','primary','Admin'],['RK','Rajesh Kumar','rajesh@devifisheries.com · QC Manager','info','Editor'],['PS','Priya Sharma','priya@devifisheries.com · Operations','info','Editor'],['MK','Mohan Kumar','mohan@devifisheries.com · Finance','gray','Viewer']].map(m => `<div class="settings-row"><div style="display:flex;align-items:center;gap:10px;"><div class="avatar" style="width:32px;height:32px;font-size:11px;">${m[0]}</div><div><div class="settings-row-label">${m[1]}</div><div class="settings-row-desc">${m[2]}</div></div></div>${badge(m[3], m[4])}</div>`).join('')}</div>
      <button class="btn btn-primary" onclick="showToast('info','Invite','Invite dialog opened')"><i data-lucide="user-plus"></i> Invite Team Member</button>`
  };
  document.getElementById('settingsContent').innerHTML = S[tab] || S.profile;
  if (window.lucide) lucide.createIcons();
}

function renderActivity(filter) {
  const acts = [
    ['SA','Super Admin','created order','ORD-2026-0465','2 minutes ago','orders'],
    ['RK','Rajesh Kumar','approved QC inspection for','LOT-2026-0847','15 minutes ago','orders'],
    ['MK','Mohan Kumar','received payment from','USA Imports LLC ($45,000)','2 hours ago','payments'],
    ['PS','Priya Sharma','updated shipment tracking for','SHP-2026-003','1 hour ago','orders'],
    ['RK','Rajesh Kumar','flagged cold room CR-04 for','temperature anomaly','5 hours ago','system'],
    ['SA','Super Admin','added new buyer','Nordic Seafoods A/S','3 hours ago','orders'],
    ['MK','Mohan Kumar','reconciled invoice','INV-2026-0418','8 hours ago','payments'],
    ['PS','Priya Sharma','generated report','Monthly Sales Summary','1 day ago','system']
  ];
  const list = filter === 'all' ? acts : acts.filter(a => a[5] === filter);
  document.getElementById('activityList').innerHTML = list.map(a => `<div class="activity-item">
    <div class="activity-avatar">${a[0]}</div>
    <div style="flex:1;"><div class="activity-text"><strong>${a[1]}</strong> ${a[2]} <a href="#" onclick="return false;">${a[3]}</a></div><div class="activity-time">${a[4]}</div></div></div>`).join('') || '<div style="padding:20px;color:var(--colorTextTertiary);font-size:13px;">No activity in this category.</div>';
}

/* ================= MODALS & OVERLAYS ================= */
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
function closeModalOnOverlay(e, id) { if (e.target === e.currentTarget) closeModal(id); }

function createOrder() {
  const q = document.getElementById('orderQuantity').value || 25, p = document.getElementById('orderProduct').value;
  closeModal('newOrderModal');
  showToast('success', 'Order Created', `New order: ${q} tons of ${p}`);
  const k = document.getElementById('kpiOrders'); if (k) k.textContent = (parseInt(k.textContent.replace(/,/g, '')) + 1).toLocaleString();
}

function showToast(type, title, msg, dur = 4000) {
  const icons = { success: 'check-circle', error: 'alert-circle', warning: 'alert-triangle', info: 'info' };
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.style.setProperty('--dur', dur + 'ms');
  t.innerHTML = `<div class="toast-icon"><i data-lucide="${icons[type]}"></i></div><div><div class="toast-title">${title}</div><div class="toast-message">${msg}</div></div>`;
  t.onclick = () => { t.classList.add('hiding'); setTimeout(() => t.remove(), 300); };
  document.getElementById('toastContainer').appendChild(t);
  if (window.lucide) lucide.createIcons();
  setTimeout(() => { t.classList.add('hiding'); setTimeout(() => t.remove(), 300); }, dur);
}

function openNotifications() {
  document.getElementById('notifOverlay').classList.add('open');
  document.getElementById('notifDrawer').classList.add('open');
  const n = [ 
    ['warning','thermometer','Critical Temperature Alert','Cold Room CR-04 exceeded -15°C threshold. Current: -15.6°C','2 min ago',1],
    ['success','check-circle','Order Delivered','ORD-2026-0425 delivered at Shanghai port','15 min ago',1],
    ['info','ship','Shipment Update','SHP-2026-001 reached 65% of journey to New York','1 hour ago',1],
    ['success','dollar-sign','Payment Received','$45,000 from USA Imports LLC','2 hours ago',0],
    ['error','alert-triangle','QC Inspection Failed','LOT-2026-0832 rejected — microbial contamination','3 hours ago',0] 
  ];
  document.getElementById('notifList').innerHTML = n.map(x => `<div class="notification-item ${x[5] ? 'unread' : ''}" onclick="showToast('info','Notification','${x[2]}')">
    <div class="notification-icon ${x[0]}"><i data-lucide="${x[1]}"></i></div>
    <div style="flex:1;"><div class="notification-title">${x[2]}</div><div class="notification-message">${x[3]}</div><div class="notification-time">${x[4]}</div></div></div>`).join('');
  if (window.lucide) lucide.createIcons();
}

function closeNotifications() { 
  document.getElementById('notifOverlay').classList.remove('open'); 
  document.getElementById('notifDrawer').classList.remove('open'); 
}

function markAllRead() { 
  document.getElementById('notifCount').style.display = 'none'; 
  showToast('success', 'Done', 'All notifications marked as read'); 
}

/* ================= COMMAND PALETTE ================= */
function openCommandPalette() { 
  document.getElementById('cmdPalette').classList.add('open'); 
  document.getElementById('cmdSearch').value = ''; 
  state.cmdIndex = 0; 
  renderCmdPalette(''); 
  setTimeout(() => document.getElementById('cmdSearch').focus(), 60); 
}

function closeCommandPalette(e) { 
  if (!e || e.target === e.currentTarget) document.getElementById('cmdPalette').classList.remove('open'); 
}

function cmdFiltered(q) { 
  return q ? CMD_ITEMS.filter(i => (i.t + i.d).toLowerCase().includes(q.toLowerCase())) : CMD_ITEMS; 
}

function renderCmdPalette(q) {
  const items = cmdFiltered(q), groups = {};
  items.forEach(i => (groups[i.g] = groups[i.g] || []).push(i));
  let idx = 0, html = '';
  Object.entries(groups).forEach(([g, list]) => {
    html += `<div class="cmd-group-title">${g}</div>`;
    list.forEach(i => { html += `<div class="cmd-item ${idx === state.cmdIndex ? 'active' : ''}" onclick="executeCmd(${idx})"><div class="cmd-item-icon"><i data-lucide="${i.i}"></i></div><div style="flex:1;"><div class="cmd-item-title">${i.t}</div><div class="cmd-item-desc">${i.d}</div></div></div>`; idx++; });
  });
  document.getElementById('cmdBody').innerHTML = html || '<div style="padding:20px;text-align:center;color:var(--colorTextTertiary);font-size:13px;">No results found</div>';
  if (window.lucide) lucide.createIcons();
}

function executeCmd(i) { 
  const f = cmdFiltered(document.getElementById('cmdSearch').value); 
  if (f[i]) { f[i].a(); closeCommandPalette(); } 
}

/* ================= ACTIONS ================= */
function refreshData() { 
  const i = document.getElementById('refreshIcon'); 
  i.classList.add('animate-spin'); 
  setTimeout(() => { i.classList.remove('animate-spin'); showToast('success', 'Refreshed', 'All data updated'); }, 1100); 
}

function exportDashboard() { 
  showToast('info', 'Export', 'Preparing PDF...'); 
  setTimeout(() => showToast('success', 'Done', 'Dashboard exported'), 1400); 
}

function toggleFullscreen() { 
  if (!document.fullscreenElement) document.documentElement.requestFullscreen(); 
  else document.exitFullscreen(); 
}

function scrollToTop() { 
  document.getElementById('contentArea').scrollTo({ top: 0, behavior: 'smooth' }); 
}

/* ================= MICRO-INTERACTIONS ENGINE ================= */
function showPageLoader() {
  const l = document.getElementById('pageLoader');
  l.classList.add('on');
  clearTimeout(l._t);
  l._t = setTimeout(() => l.classList.remove('on'), 450);
}

function applyStagger(page) {
  const els = page.querySelectorAll('.kpi-card, .chart-card, .product-card, .coldroom-card, .data-card');
  els.forEach((el, i) => {
    el.style.animationDelay = (i * 45) + 'ms';
    el.classList.remove('stagger-in');
    void el.offsetWidth;
    el.classList.add('stagger-in');
  });
}

function animateValue(el) {
  const raw = el.dataset.raw || el.textContent.trim();
  el.dataset.raw = raw;
  const m = raw.match(/^([^0-9\-]*)(-?[0-9][0-9,\.]*)(.*)$/);
  if (!m) return;
  const prefix = m[1], numStr = m[2], suffix = m[3];
  const target = parseFloat(numStr.replace(/,/g, ''));
  if (isNaN(target)) return;
  const decimals = (numStr.split('.')[1] || '').length;
  const hadComma = numStr.includes(',');
  const from = target * 0.5;
  const dur = 650;
  const t0 = performance.now();
  const fmt = v => {
    const n = Number(v.toFixed(decimals));
    return hadComma ? n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : n.toFixed(decimals);
  };
  function frame(t) {
    const p = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + fmt(from + (target - from) * e) + suffix;
    if (p < 1) requestAnimationFrame(frame);
    else el.textContent = prefix + fmt(target) + suffix;
  }
  requestAnimationFrame(frame);
}

function countUp(page) {
  page.querySelectorAll('.kpi-value').forEach(animateValue);
}

function bindTilt(page) {
  page.querySelectorAll('.kpi-card, .product-card').forEach(c => {
    if (c.dataset.tilt) return;
    c.dataset.tilt = '1';
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      c.style.setProperty('--ry', (px * 5) + 'deg');
      c.style.setProperty('--rx', (-py * 5) + 'deg');
    });
    c.addEventListener('mouseleave', () => {
      c.style.setProperty('--ry', '0deg');
      c.style.setProperty('--rx', '0deg');
    });
  });
}

function bindMagnetic(page) {
  page.querySelectorAll('.btn-primary').forEach(b => {
    if (b.dataset.mag) return;
    b.dataset.mag = '1';
    b.addEventListener('mousemove', e => {
      const r = b.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      b.style.setProperty('--mx', (px * 4) + 'px');
      b.style.setProperty('--my', (py * 3) + 'px');
    });
    b.addEventListener('mouseleave', () => {
      b.style.setProperty('--mx', '0px');
      b.style.setProperty('--my', '0px');
    });
  });
}

function hookPageEnter(page) {
  applyStagger(page);
  countUp(page);
  bindTilt(page);
  bindMagnetic(page);

  // Auto initialize product sub-tab if navigating to products page
  if (page.id === 'page-products') {
    switchProductSubTab('productlist');
  }
}

/* ================= TERTIARY SUB-TABS SWITCHER (MATCHING SUB-MENU BEHAVIOR) ================= */
function switchTertiarySubTab(subId, tertId, el) {
  state.tertiary = tertId;
  const tertiaryNav = document.getElementById('tertiaryNav');
  if (tertiaryNav) {
    tertiaryNav.querySelectorAll('.tertiary-nav-item').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-id') === tertId);
    });
  }

  // Handle Sales Dashboard sub-tabs
  if (subId === 'dashboard') {
    initSalesDashboardCharts();
    return;
  }

  // Handle Purchase Dashboard sub-tabs
  if (subId === 'purchasedashboard') {
    document.querySelectorAll('.module-page').forEach(p => p.classList.remove('active'));
    if (tertId === 'rm-dashboard') {
      const g = document.getElementById('page-generic');
      if (g) {
        g.classList.add('active');
        renderUnderConstructionPage(subId, tertId);
      }
    } else {
      const p = document.getElementById('page-purchase');
      if (p) p.classList.add('active');
      initPurchaseDashboardCharts();
    }
    return;
  }

  // Handle unbuilt pages and tabs
  const BUILT_SUBIDS = ['dashboard', 'purchasedashboard', 'preprocessdevelopment', 'qcdashboard', 'proddevelopment', 'coldstoredevelopment', 'invgeneralstore'];
  if (!BUILT_SUBIDS.includes(subId)) {
    document.querySelectorAll('.module-page').forEach(p => p.classList.remove('active'));
    const g = document.getElementById('page-generic');
    if (g) {
      g.classList.add('active');
      renderUnderConstructionPage(subId, tertId);
    }
    return;
  }

  showToast('info', 'Tab Selected', `Viewing ${tertId.toUpperCase()}`);
  if (window.lucide) lucide.createIcons();
}

/* ================= PRODUCT SUB-TABS RENDERER & SWITCHER ================= */
function switchProductSubTab(tabId, el) {
  state.tertiary = tabId;
  const tertiaryNav = document.getElementById('tertiaryNav');
  if (tertiaryNav) {
    tertiaryNav.querySelectorAll('.tertiary-nav-item').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-id') === tabId);
    });
  }

  document.querySelectorAll('.product-subpage').forEach(sec => sec.style.display = 'none');
  const target = document.getElementById('subtab-' + tabId);
  if (target) target.style.display = 'block';

  // Render target subtable
  if (tabId === 'productlist') renderProductListTable(1);
  if (tabId === 'preparationlist') renderPreparationListTable(1);
  if (tabId === 'species') renderSpeciesTable();
  if (tabId === 'gradeslist') renderGradesListTable(1);
  if (tabId === 'packingstylelist') renderPackingStyleListTable(1);
  if (tabId === 'varietylist') renderVarietyListTable(1);

  if (window.lucide) lucide.createIcons();
}

function renderProductListTable(page = 1) {
  const perPage = parseInt(document.getElementById('productListPerPage')?.value || 10);
  const query = (document.getElementById('productListSearch')?.value || '').toLowerCase();
  
  const filtered = (typeof PRODUCT_LIST_MASTER !== 'undefined' ? PRODUCT_LIST_MASTER : []).filter(p => p.shortName.toLowerCase().includes(query) || p.fullName.toLowerCase().includes(query));
  const start = (page - 1) * perPage;
  const items = filtered.slice(start, start + perPage);

  const tbody = document.getElementById('productListTableBody');
  if (tbody) {
    tbody.innerHTML = items.map(p => `
      <tr onclick="showToast('info','Product','${p.fullName}')">
        <td><strong>${p.sno}</strong></td>
        <td><span class="row-id">${p.shortName}</span></td>
        <td>${p.fullName}</td>
      </tr>
    `).join('');
  }

  const total = filtered.length;
  const end = Math.min(start + perPage, total);
  const info = document.getElementById('productListEntriesInfo');
  if (info) info.textContent = `Showing ${total ? start + 1 : 0} to ${end} of ${total} entries`;

  renderPagination('productListPagination', Math.ceil(total / perPage), page, (p) => renderProductListTable(p));
  if (window.lucide) lucide.createIcons();
}

function renderPreparationListTable(page = 1) {
  const perPage = parseInt(document.getElementById('prepListPerPage')?.value || 10);
  const query = (document.getElementById('prepListSearch')?.value || '').toLowerCase();

  const filtered = (typeof PREPARATION_LIST_MASTER !== 'undefined' ? PREPARATION_LIST_MASTER : []).filter(p => p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query) || p.shortCode.toLowerCase().includes(query));
  const start = (page - 1) * perPage;
  const items = filtered.slice(start, start + perPage);

  const tbody = document.getElementById('prepListTableBody');
  if (tbody) {
    tbody.innerHTML = items.map(p => `
      <tr onclick="showToast('info','Preparation','${p.name}')">
        <td><strong>${p.id}</strong></td>
        <td><strong>${p.name}</strong></td>
        <td>${p.desc}</td>
        <td><span class="row-id">${p.shortCode}</span></td>
        <td>${p.hsCode}</td>
        <td>${p.qcCode || '-'}</td>
        <td>
          <button class="btn btn-sm btn-icon btn-ghost" title="Edit" onclick="event.stopPropagation();showToast('info','Edit','Editing ${p.name}')">
            <i data-lucide="edit-2"></i>
          </button>
        </td>
      </tr>
    `).join('');
  }

  const total = filtered.length;
  const end = Math.min(start + perPage, total);
  const info = document.getElementById('prepListEntriesInfo');
  if (info) info.textContent = `Showing ${total ? start + 1 : 0} to ${end} of ${total} entries`;

  renderPagination('prepListPagination', Math.ceil(total / perPage), page, (p) => renderPreparationListTable(p));
  if (window.lucide) lucide.createIcons();
}

function renderSpeciesTable() {
  const query = (document.getElementById('speciesSearch')?.value || '').toLowerCase();
  const filtered = (typeof SPECIES_MASTER !== 'undefined' ? SPECIES_MASTER : []).filter(s => s.name.toLowerCase().includes(query) || s.desc.toLowerCase().includes(query) || s.shortCode.toLowerCase().includes(query));

  const tbody = document.getElementById('speciesTableBody');
  if (tbody) {
    tbody.innerHTML = filtered.map(s => `
      <tr onclick="showToast('info','Species','${s.name}')">
        <td><strong>${s.sno}</strong></td>
        <td><strong>${s.name}</strong></td>
        <td><span class="row-id">${s.shortCode}</span></td>
        <td>${s.qcCode}</td>
        <td>${s.desc}</td>
        <td>
          <button class="btn btn-sm btn-icon btn-ghost" title="Edit" onclick="event.stopPropagation();showToast('info','Edit','Editing ${s.name}')">
            <i data-lucide="edit-2"></i>
          </button>
        </td>
      </tr>
    `).join('');
  }

  const info = document.getElementById('speciesEntriesInfo');
  if (info) info.textContent = `Showing 1 to ${filtered.length} out of ${filtered.length} entries`;
  if (window.lucide) lucide.createIcons();
}

function renderGradesListTable(page = 1) {
  const perPage = parseInt(document.getElementById('gradesListPerPage')?.value || 10);
  const query = (document.getElementById('gradesListSearch')?.value || '').toLowerCase();

  const filtered = (typeof GRADES_MASTER !== 'undefined' ? GRADES_MASTER : []).filter(g => g.type.toLowerCase().includes(query) || g.name.toLowerCase().includes(query) || g.group.toLowerCase().includes(query));
  const start = (page - 1) * perPage;
  const items = filtered.slice(start, start + perPage);

  const tbody = document.getElementById('gradesListTableBody');
  if (tbody) {
    tbody.innerHTML = items.map(g => `
      <tr onclick="showToast('info','Grade','${g.name}')">
        <td><strong>${g.id}</strong></td>
        <td>${g.type}</td>
        <td><strong>${g.name}</strong></td>
        <td>${g.group}</td>
      </tr>
    `).join('');
  }

  const total = 103;
  const end = Math.min(start + perPage, filtered.length);
  const info = document.getElementById('gradesListEntriesInfo');
  if (info) info.textContent = `Showing ${start + 1} to ${end} of ${total} entries`;

  renderPagination('gradesListPagination', 11, page, (p) => renderGradesListTable(p));
  if (window.lucide) lucide.createIcons();
}

function renderPackingStyleListTable(page = 1) {
  const perPage = parseInt(document.getElementById('packingListPerPage')?.value || 10);
  const query = (document.getElementById('packingListSearch')?.value || '').toLowerCase();

  const filtered = (typeof PACKING_STYLES_MASTER !== 'undefined' ? PACKING_STYLES_MASTER : []).filter(p => p.style.toLowerCase().includes(query) || p.uom.toLowerCase().includes(query));
  const start = (page - 1) * perPage;
  const items = filtered.slice(start, start + perPage);

  const tbody = document.getElementById('packingListTableBody');
  if (tbody) {
    tbody.innerHTML = items.map(p => `
      <tr onclick="showToast('info','Packing Style','${p.style}')">
        <td><strong>${p.id}</strong></td>
        <td><strong>${p.style}</strong></td>
        <td>${p.grossWeight}</td>
        <td>${p.netWeight}</td>
        <td><span class="badge badge-info">${p.uom}</span></td>
        <td>
          <button class="btn btn-sm btn-icon btn-ghost" title="Edit" onclick="event.stopPropagation();showToast('info','Edit','Editing ${p.style}')">
            <i data-lucide="edit-2"></i>
          </button>
        </td>
      </tr>
    `).join('');
  }

  const total = 115;
  const end = Math.min(start + perPage, filtered.length);
  const info = document.getElementById('packingListEntriesInfo');
  if (info) info.textContent = `Showing ${start + 1} to ${end} of ${total} entries`;

  renderPagination('packingListPagination', 12, page, (p) => renderPackingStyleListTable(p));
  if (window.lucide) lucide.createIcons();
}

function renderVarietyListTable(page = 1) {
  const query = (document.getElementById('varietySearch')?.value || '').toLowerCase();
  const brand = document.getElementById('varietyBrandFilter')?.value || 'all';
  const species = document.getElementById('varietySpeciesFilter')?.value || 'all';
  const type = document.getElementById('varietyTypeFilter')?.value || 'all';
  const name = document.getElementById('varietyNameFilter')?.value || 'all';

  let filtered = (typeof VARIETY_LIST_MASTER !== 'undefined' ? VARIETY_LIST_MASTER : []).filter(v => {
    if (brand !== 'all' && v.brand !== brand) return false;
    if (species !== 'all' && !v.desc.toLowerCase().includes(species.toLowerCase())) return false;
    if (type !== 'all' && v.type !== type) return false;
    if (name !== 'all' && v.shortName !== name) return false;
    if (query && !JSON.stringify(v).toLowerCase().includes(query)) return false;
    return true;
  });

  const perPage = 10;
  const start = (page - 1) * perPage;
  const items = filtered.slice(start, start + perPage);

  const tbody = document.getElementById('varietyTableBody');
  if (tbody) {
    tbody.innerHTML = items.map(v => `
      <tr onclick="showToast('info','Variety','${v.fullName}')">
        <td><strong>${v.sno}</strong></td>
        <td><span class="row-id">${v.shortName}</span></td>
        <td><strong>${v.fullName}</strong></td>
        <td>${v.grade}</td>
        <td><span class="badge badge-info">${v.freezingType}</span></td>
        <td>${v.treatment}</td>
        <td>${v.prep}</td>
        <td>${v.brand}</td>
        <td>${v.packingStyle}</td>
        <td>${v.desc}</td>
        <td>${badge(v.type === 'RAW' ? 'success' : 'warning', v.type)}</td>
        <td>${v.buyerSupc || '-'}</td>
        <td><strong>${v.ourSupc}</strong></td>
      </tr>
    `).join('');
  }

  const total = 1512;
  const end = Math.min(start + perPage, filtered.length);
  const info = document.getElementById('varietyEntriesInfo');
  if (info) info.textContent = `Showing 1 to ${end} out of ${total} entries`;

  renderPagination('varietyPagination', 16, page, (p) => renderVarietyListTable(p));
  if (window.lucide) lucide.createIcons();
}

function renderPagination(elemId, totalPages, currentPage, onPageClick) {
  const container = document.getElementById(elemId);
  if (!container) return;

  let pages = [];
  pages.push(`<button class="btn btn-sm btn-default" style="padding:2px 8px;" ${currentPage === 1 ? 'disabled' : ''} onclick="event.stopPropagation();">&lt;</button>`);

  for (let i = 1; i <= Math.min(5, totalPages); i++) {
    pages.push(`<button class="btn btn-sm ${i === currentPage ? 'btn-primary' : 'btn-default'}" style="padding:2px 10px;min-width:28px;" onclick="event.stopPropagation();">${i}</button>`);
  }
  if (totalPages > 5) {
    pages.push(`<span style="padding:2px 4px;color:#9CA3AF;">...</span>`);
    pages.push(`<button class="btn btn-sm ${totalPages === currentPage ? 'btn-primary' : 'btn-default'}" style="padding:2px 10px;" onclick="event.stopPropagation();">${totalPages}</button>`);
  }

  pages.push(`<button class="btn btn-sm btn-default" style="padding:2px 8px;" ${currentPage === totalPages ? 'disabled' : ''} onclick="event.stopPropagation();">&gt;</button>`);

  container.innerHTML = pages.join('');
}

function downloadExcel(type) {
  showToast('success', 'Download', `Exporting ${type} dataset to Excel (.xlsx)...`);
  const blob = new Blob([`${type.toUpperCase()} MASTER DATASET\nExported from Devi Fisheries Dashboard`], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${type}_master_export.csv`;
  a.click();
}

/* ================= QA SCREENSHOT TABLE RENDERERS ================= */
let qcLotsCurrentPage = 1;
let qcLotsCurrentPerPage = 10;

function renderQCLotsTable(page = 1, customPerPage = null) {
  if (customPerPage) qcLotsCurrentPerPage = customPerPage;
  qcLotsCurrentPage = page;
  const perPage = qcLotsCurrentPerPage;
  const query = (document.getElementById('qcLotsSearch')?.value || '').toLowerCase();
  const data = typeof QC_LOTS_MASTER !== 'undefined' ? QC_LOTS_MASTER : [];
  const filtered = data.filter(r => r.lotNo.toLowerCase().includes(query) || r.supplier.toLowerCase().includes(query) || r.center.toLowerCase().includes(query));
  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage) || 1;
  const validPage = Math.max(1, Math.min(page, totalPages));
  const start = (validPage - 1) * perPage;
  const items = filtered.slice(start, start + perPage);

  const tbody = document.getElementById('qcLotsTableBody');
  if (tbody) {
    tbody.innerHTML = items.map(r => `
      <tr onclick="showToast('info','QC Lot','Viewing ${r.lotNo}')">
        <td><span class="row-id" style="color:#09090B;font-weight:700;">${r.lotNo}</span></td>
        <td><strong>${r.supplier}</strong></td>
        <td>${r.center}</td>
        <td>${r.arrivalDate}</td>
        <td><strong>${r.totalWeight}</strong></td>
        <td>
          ${r.result === 'PASS' 
            ? `<span class="badge" style="background:#F4F4F5;color:#09090B;border:1px solid #E4E4E7;font-weight:700;">PASS</span>`
            : r.result === 'Negative' 
            ? `<span class="badge" style="background:#0F172A;color:#FFFFFF;border:1px solid #1E293B;font-weight:600;">Negative</span>`
            : `<span style="color:#94A3B8;font-weight:500;">--</span>`}
        </td>
        <td>
          ${r.positive === 'NO' 
            ? `<span class="badge" style="background:#FAFAFA;color:#52525B;border:1px solid #E4E4E7;font-weight:600;">NO</span>`
            : `<span class="badge" style="background:#F1F5F9;color:#64748B;border:1px solid #E2E8F0;font-weight:500;">${r.positive}</span>`}
        </td>
      </tr>
    `).join('');
  }

  const info = document.getElementById('qcLotsEntriesInfo');
  if (info) info.textContent = `Showing ${total === 0 ? 0 : start + 1} to ${Math.min(start + perPage, total)} of ${total} entries`;

  const pag = document.getElementById('qcLotsPagination');
  if (pag) {
    let btns = `<button class="btn btn-sm btn-default" ${validPage === 1 ? 'disabled' : ''} onclick="renderQCLotsTable(${validPage - 1})">Prev</button>`;
    const maxButtons = 5;
    let startPage = Math.max(1, validPage - 2);
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    if (endPage - startPage < maxButtons - 1) startPage = Math.max(1, endPage - maxButtons + 1);

    for (let p = startPage; p <= endPage; p++) {
      btns += `<button class="btn btn-sm ${p === validPage ? 'btn-primary' : 'btn-default'}" style="${p === validPage ? 'background:#FACC15;color:#422006;font-weight:700;border-color:#EAB308;' : ''}" onclick="renderQCLotsTable(${p})">${p}</button>`;
    }
    btns += `<button class="btn btn-sm btn-default" ${validPage === totalPages ? 'disabled' : ''} onclick="renderQCLotsTable(${validPage + 1})">Next</button>`;
    pag.innerHTML = btns;
  }
}

let poGradeCurrentPage = 1;
let poGradeCurrentPerPage = 25;

function renderPOGradeTable(page = 1, customPerPage = null) {
  if (customPerPage) poGradeCurrentPerPage = customPerPage;
  poGradeCurrentPage = page;
  const perPage = poGradeCurrentPerPage;
  const query = (document.getElementById('poGradeSearch')?.value || '').toLowerCase();
  const data = typeof QC_POGRADE_MASTER !== 'undefined' ? QC_POGRADE_MASTER : [];
  const filtered = data.filter(r => r.po.toLowerCase().includes(query) || r.buyer.toLowerCase().includes(query) || r.product.toLowerCase().includes(query));
  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage) || 1;
  const validPage = Math.max(1, Math.min(page, totalPages));
  const start = (validPage - 1) * perPage;
  const items = filtered.slice(start, start + perPage);

  const tbody = document.getElementById('poGradeTableBody');
  if (tbody) {
    tbody.innerHTML = items.map(r => {
      const isAllocated = r.assigned !== '--' && parseInt(r.assigned) > 0;
      return `
        <tr style="${isAllocated ? 'background:#F8FAFC;font-weight:500;' : ''}" onclick="showToast('info','PO Grade','${r.po}')">
          <td><strong>${r.sno}</strong></td>
          <td><span class="row-id" style="color:#09090B;font-weight:700;">${r.po}</span></td>
          <td><strong>${r.buyer}</strong></td>
          <td>${r.brand}</td>
          <td>${r.shipBy}</td>
          <td><span class="badge" style="background:#F1F5F9;color:#0F172A;border:1px solid #E2E8F0;">${r.country}</span></td>
          <td style="font-size:12px;font-family:inherit;color:#1E293B;">${r.product}</td>
          <td>${r.packing}</td>
          <td><strong>${r.mcs}</strong></td>
          <td>
            ${isAllocated 
              ? `<span class="badge" style="background:#FACC15;color:#422006;border:1px solid #EAB308;font-weight:700;">${r.assigned} Allocated</span>`
              : `<span style="color:#94A3B8;">${r.assigned}</span>`}
          </td>
        </tr>
      `;
    }).join('');
  }

  const info = document.getElementById('poGradeEntriesInfo');
  if (info) info.textContent = `Showing ${total === 0 ? 0 : start + 1} to ${Math.min(start + perPage, total)} of ${total} entries`;

  const pag = document.getElementById('poGradePagination');
  if (pag) {
    let btns = `<button class="btn btn-sm btn-default" ${validPage === 1 ? 'disabled' : ''} onclick="renderPOGradeTable(${validPage - 1})">Prev</button>`;
    const maxButtons = 5;
    let startPage = Math.max(1, validPage - 2);
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    if (endPage - startPage < maxButtons - 1) startPage = Math.max(1, endPage - maxButtons + 1);

    for (let p = startPage; p <= endPage; p++) {
      btns += `<button class="btn btn-sm ${p === validPage ? 'btn-primary' : 'btn-default'}" style="${p === validPage ? 'background:#FACC15;color:#422006;font-weight:700;border-color:#EAB308;' : ''}" onclick="renderPOGradeTable(${p})">${p}</button>`;
    }
    btns += `<button class="btn btn-sm btn-default" ${validPage === totalPages ? 'disabled' : ''} onclick="renderPOGradeTable(${validPage + 1})">Next</button>`;
    pag.innerHTML = btns;
  }
}

function renderProductionStandardYieldsTable() {
  const tbody = document.getElementById('standardYieldsTableBody');
  const data = typeof PRODUCTION_STANDARD_YIELDS_MASTER !== 'undefined' ? PRODUCTION_STANDARD_YIELDS_MASTER : [];
  if (tbody) {
    tbody.innerHTML = data.map(r => `
      <tr>
        <td><strong>${r.sno}</strong></td>
        <td><strong>${r.species}</strong></td>
        <td><span class="badge ${r.typeProduct === 'RAW' ? 'badge-success' : 'badge-warning'}">${r.typeProduct}</span></td>
        <td>${r.variety}</td>
        <td>${r.grade}</td>
        <td>${r.count}</td>
        <td><span class="badge badge-info">${r.freezingType}</span></td>
        <td>${r.treatment}</td>
        <td>${r.typeMaterial}</td>
        <td><strong>${r.yield}%</strong></td>
        <td><span class="badge badge-success">${r.status}</span></td>
        <td style="text-align:right;">
          <button class="btn btn-sm btn-icon btn-ghost" onclick="showToast('info','Edit','Editing yield rule ${r.sno}')"><i data-lucide="edit"></i></button>
        </td>
      </tr>
    `).join('');
  }
}

function renderInventoryIndentTable() {
  const tbody = document.getElementById('existingIndentsTableBody');
  const data = typeof INVENTORY_INDENTS_MASTER !== 'undefined' ? INVENTORY_INDENTS_MASTER : [];
  if (tbody) {
    tbody.innerHTML = data.map(r => `
      <tr>
        <td><strong>${r.sno}</strong></td>
        <td><span class="row-id">${r.docNo}</span></td>
        <td>${r.date}</td>
        <td>
          <div class="row-actions">
            <button class="btn btn-sm btn-icon btn-ghost" style="color:#CA8A04;" onclick="showToast('info','Edit','Editing Indent ${r.docNo}')"><i data-lucide="pencil"></i></button>
            <button class="btn btn-sm btn-icon btn-ghost" style="color:#DC2626;" onclick="showToast('warning','Delete','Deleting Indent ${r.docNo}')"><i data-lucide="trash-2"></i></button>
            <button class="btn btn-sm btn-icon btn-ghost" style="color:#CA8A04;" onclick="showToast('info','View','Viewing Indent ${r.docNo}')"><i data-lucide="eye"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  }
}

/* ================= COMPONENT FILTER & EXPORT HANDLERS ================= */
let currentFilterTarget = '';

function openComponentFilterModal(compName) {
  currentFilterTarget = compName;
  const titleEl = document.getElementById('compFilterModalTitle');
  const targetEl = document.getElementById('compFilterTargetName');
  if (titleEl) titleEl.innerHTML = `<i data-lucide="filter" style="width:18px;height:18px;margin-right:6px;color:var(--colorPrimary);"></i> Filter: ${compName}`;
  if (targetEl) targetEl.textContent = compName;
  openModal('compFilterModal');
  if (window.lucide) lucide.createIcons();
}

function applyComponentFilter() {
  closeModal('compFilterModal');
  showToast('success', 'Filter Applied', `Filter updated for ${currentFilterTarget}`);
}

function resetComponentFilter() {
  const fDate = document.getElementById('compFilterFromDate');
  const tDate = document.getElementById('compFilterToDate');
  const plant = document.getElementById('compFilterPlant');
  const port = document.getElementById('compFilterPort');
  const grade = document.getElementById('compFilterGrade');
  if (fDate) fDate.value = '2026-04-01';
  if (tDate) tDate.value = '2027-03-31';
  if (plant) plant.value = 'all';
  if (port) port.value = 'all';
  if (grade) grade.value = 'all';
  showToast('info', 'Filter Reset', `Reset filters for ${currentFilterTarget}`);
}

function exportComponentData(compName) {
  showToast('success', 'Exporting Data', `Downloading ${compName} data export...`);
  const csvContent = "data:text/csv;charset=utf-8,Component,Metric,Value,Date\n" 
    + `${compName},Total Count,1527,2026-09-24\n`
    + `${compName},Shipped,1120,2026-09-24\n`
    + `${compName},Pending,407,2026-09-24\n`;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${compName}_export.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportChart(chartId, chartName) {
  const chartCanvas = document.getElementById(chartId);
  if (chartCanvas) {
    try {
      const url = chartCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${chartName}_chart.png`;
      link.href = url;
      link.click();
      showToast('success', 'Chart Exported', `Saved ${chartName} as PNG image`);
    } catch(e) {
      exportComponentData(chartName);
    }
  } else {
    exportComponentData(chartName);
  }
}
