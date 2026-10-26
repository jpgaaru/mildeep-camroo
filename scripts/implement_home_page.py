#!/usr/bin/env python3
"""
scripts/implement_home_page.py
Integrates the Home page, Sidebar Home navigation item, and routing into miledeep-devi-fisheries.html
matching Sitemap 02 specifications.
"""

import re
import sys

def implement_home_in_html(filepath):
    print(f"Processing {filepath}...")
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update logo link to #/home in expanded sidebar
    old_logo_expanded = """                <div class="flex items-center gap-2.5 min-w-0">
                  <img src="${LOGO_WHITE}" alt="Devi Fisheries" class="h-9 w-auto object-contain shrink-0" />
                  <div class="leading-tight flex flex-col justify-center min-w-0">
                    <span class="text-sm font-bold text-white tracking-wide truncate">Devi Fisheries</span>
                    <span class="text-[9.5px] font-bold text-[#00A3BF] tracking-wider uppercase font-mono truncate">POWERED BY CAMAROO</span>
                  </div>
                </div>"""

    new_logo_expanded = """                <a href="#/home" class="flex items-center gap-2.5 min-w-0 group cursor-pointer" title="Go to Home">
                  <img src="${LOGO_WHITE}" alt="Devi Fisheries" class="h-9 w-auto object-contain shrink-0 transition-transform group-hover:scale-105" />
                  <div class="leading-tight flex flex-col justify-center min-w-0">
                    <span class="text-sm font-bold text-white tracking-wide truncate group-hover:text-[#00B4D8] transition-colors">Devi Fisheries</span>
                    <span class="text-[9.5px] font-bold text-[#00A3BF] tracking-wider uppercase font-mono truncate">POWERED BY CAMAROO</span>
                  </div>
                </a>"""

    if old_logo_expanded in content:
        content = content.replace(old_logo_expanded, new_logo_expanded, 1)
        print("  ✓ Updated logo header to link to #/home")
    else:
        print("  ⚠ old_logo_expanded not found")

    # 2. Update renderNavHierarchy() to prepend Home item
    old_render_nav_start = """  renderNavHierarchy() {
    const isSuperAdmin = ERP_DATA.currentUser?.role === 'Super Admin';
    const modules = isSuperAdmin ? SUPER_ADMIN_NAV_HIERARCHY : ADMIN_NAV_HIERARCHY;

    return modules.map(mod => {"""

    new_render_nav_start = """  renderNavHierarchy() {
    const isSuperAdmin = ERP_DATA.currentUser?.role === 'Super Admin';
    const modules = isSuperAdmin ? SUPER_ADMIN_NAV_HIERARCHY : ADMIN_NAV_HIERARCHY;
    const isHomeActive = this.activeModuleId === 'home';

    const homeHtml = `
      <div class="nav-module-group mb-2">
        <a 
          href="#/home"
          data-module-id="home" 
          class="sidebar-mod-btn w-full px-3 py-2.5 rounded-lg text-xs font-bold flex items-center transition-colors cursor-pointer ${isHomeActive ? 'bg-[#02a8b5] text-[#002d34] shadow-xs' : 'text-[#CBD5E1] hover:bg-white/5 hover:text-white'}"
          title="Home Launchpad"
        >
          <div class="flex items-center gap-2.5 truncate">
            <span class="w-4 h-4 flex items-center justify-center shrink-0 ${isHomeActive ? 'text-[#002d34]' : 'text-[#64748B]'}">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            </span>
            <span class="text-xs tracking-tight truncate">Home</span>
          </div>
        </a>
      </div>
      <div class="px-3 pb-1 pt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 select-none">
        Modules
      </div>
    `;

    return homeHtml + modules.map(mod => {"""

    if old_render_nav_start in content:
        content = content.replace(old_render_nav_start, new_render_nav_start, 1)
        print("  ✓ Added Home link to renderNavHierarchy()")
    else:
        print("  ⚠ old_render_nav_start not found")

    # 3. Update renderCollapsedNavHierarchy() to prepend Collapsed Home item
    old_collapsed_start = """  renderCollapsedNavHierarchy() {
    const isSuperAdmin = ERP_DATA.currentUser?.role === 'Super Admin';
    const modules = isSuperAdmin ? SUPER_ADMIN_NAV_HIERARCHY : ADMIN_NAV_HIERARCHY;

    return modules.map(mod => {"""

    new_collapsed_start = """  renderCollapsedNavHierarchy() {
    const isSuperAdmin = ERP_DATA.currentUser?.role === 'Super Admin';
    const modules = isSuperAdmin ? SUPER_ADMIN_NAV_HIERARCHY : ADMIN_NAV_HIERARCHY;
    const isHomeActive = this.activeModuleId === 'home';

    const collapsedHomeHtml = `
      <div class="relative group flex justify-center nav-module-group mb-1.5">
        <a 
          href="#/home"
          data-module-id="home"
          class="sidebar-mod-btn w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${isHomeActive ? 'bg-[#02a8b5] text-[#002d34] ring-2 ring-[#00A4B7] font-bold' : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'}"
          title="Home"
        >
          <span class="w-4 h-4 flex items-center justify-center ${isHomeActive ? 'text-[#002d34]' : ''}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          </span>
        </a>
        <div class="absolute left-full top-0 ml-3 px-2 py-1 bg-[#0F172A] border border-[#1E293B] rounded-lg text-white font-bold text-xs whitespace-nowrap hidden group-hover:block z-50 pointer-events-none shadow-md">
          Home
        </div>
      </div>
      <div class="w-6 mx-auto my-1 border-b border-[#1E293B]"></div>
    `;

    return collapsedHomeHtml + modules.map(mod => {"""

    if old_collapsed_start in content:
        content = content.replace(old_collapsed_start, new_collapsed_start, 1)
        print("  ✓ Added Home icon to renderCollapsedNavHierarchy()")
    else:
        print("  ⚠ old_collapsed_start not found")

    # 4. Update Sidebar.bindEvents() to handle modId === 'home'
    old_bind_events_btn = """    modButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const modId = btn.dataset.moduleId;"""

    new_bind_events_btn = """    modButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const modId = btn.dataset.moduleId;
        if (modId === 'home') {
          this.activeModuleId = 'home';
          window.location.hash = '#/home';
          return;
        }"""

    if old_bind_events_btn in content:
        content = content.replace(old_bind_events_btn, new_bind_events_btn, 1)
        print("  ✓ Handled modId === 'home' in bindEvents()")
    else:
        print("  ⚠ old_bind_events_btn not found")

    # 5. Update Breadcrumbs.render() for modId === 'home'
    old_breadcrumbs = """    const clean = (activeHash || '').replace(/^#\/?/, '').replace(/^\/+/, '');
    const parts = clean.split('/');
    const modId = parts[0] || 'purchase';
    const subId = parts[1] || 'dashboard';
    const tabId = parts[2] || '';"""

    new_breadcrumbs = """    const clean = (activeHash || '').replace(/^#\/?/, '').replace(/^\/+/, '');
    const parts = clean.split('/');
    const modId = parts[0] || 'home';
    const subId = parts[1] || '';
    const tabId = parts[2] || '';

    if (modId === 'home') {
      container.innerHTML = `
        <nav class="flex items-center gap-1.5 text-xs py-1 select-none" aria-label="Breadcrumb">
          <span class="font-semibold text-[#006C7A]">Home</span>
          <span class="text-[#CBD5E1] font-bold text-[10px] mx-0.5">/</span>
          <span class="font-medium text-[#64748B]">Welcome Board</span>
        </nav>
      `;
      return;
    }"""

    if old_breadcrumbs in content:
        content = content.replace(old_breadcrumbs, new_breadcrumbs, 1)
        print("  ✓ Added Home breadcrumb handling")
    else:
        print("  ⚠ old_breadcrumbs not found")

    # 6. Add HomeView definition before App definition
    home_view_code = """
// ============================================================================
// AquaOps Home Welcome Board Controller
// Clean, uncluttered entrance launchpad:
// - Coastal sunrise hero banner with "Welcome Devi Fisheries"
// - Quick Workflow Shortcuts grid with responsive layout
// - My Permissible Roles compact section with Manage Settings shortcut
// ============================================================================
const HomeView = {
  render(containerId) {
    const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!container) return;

    // Header action button
    const actionContainer = document.getElementById('section-action-btn-container');
    if (actionContainer) {
      actionContainer.innerHTML = `
        <a href="#/setup/client-master-setup/roles-permissions" class="px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 bg-white border border-[#CBD5E1] shadow-xs hover:bg-slate-50 transition-all text-[#006C7A]">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <span>Roles & Permissions</span>
        </a>
      `;
    }

    const shortcuts = [
      {
        title: "Raw Material Bookings",
        module: "PURCHASE",
        iconColor: "#0284C7",
        bgColor: "#F0F9FF",
        borderColor: "#E0F2FE",
        iconSvg: `<svg class="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
        hash: "#/purchase/pre-processing/bookings"
      },
      {
        title: "Dock Inward Arrivals",
        module: "PURCHASE",
        iconColor: "#0284C7",
        bgColor: "#E0F2FE",
        borderColor: "#BAE6FD",
        iconSvg: `<svg class="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 17H5a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v9m-4 4h4m4-4h1a2 2 0 002-2v-3.5a1.5 1.5 0 00-1.5-1.5H18V6a2 2 0 00-2-2h-3m-3 13a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
        hash: "#/purchase/pre-processing/rm-arrivals"
      },
      {
        title: "RM Received Trackid",
        module: "PRE-PROCESSING",
        iconColor: "#6366F1",
        bgColor: "#EEF2FF",
        borderColor: "#E0E7FF",
        iconSvg: `<svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
        hash: "#/preprocessing/operations/rm-received"
      },
      {
        title: "Chemical Consumption",
        module: "PRE-PROCESSING",
        iconColor: "#8B5CF6",
        bgColor: "#F5F3FF",
        borderColor: "#EDE9FE",
        iconSvg: `<svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`,
        hash: "#/preprocessing/chemical-screens/chemicals-consumption"
      },
      {
        title: "Antibiotic ELISA Screening",
        module: "QUALITY CONTROL",
        iconColor: "#10B981",
        bgColor: "#ECFDF5",
        borderColor: "#D1FAE5",
        iconSvg: `<svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/></svg>`,
        hash: "#/quality/dashboard/qc-overview"
      },
      {
        title: "Cold Storage Pallet Intake",
        module: "COLD STORAGE",
        iconColor: "#06B6D4",
        bgColor: "#ECFEFF",
        borderColor: "#CFFAFE",
        iconSvg: `<svg class="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 3v18m0-18l-3 3m3-3l3 3m-3 15l-3-3m3 3l3-3M3 12h18m-18 0l3-3m-3 3l3 3m15-3l-3-3m3 3l3 3"/></svg>`,
        hash: "#/coldstore/dashboard/overview"
      },
      {
        title: "Export Sales Contracts",
        module: "SALES & EXPORT",
        iconColor: "#D97706",
        bgColor: "#FEF3C7",
        borderColor: "#FDE68A",
        iconSvg: `<svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg>`,
        hash: "#/sales/orders/proforma-list"
      },
      {
        title: "System Master Setup",
        module: "CONFIGURATION",
        iconColor: "#64748B",
        bgColor: "#F1F5F9",
        borderColor: "#E2E8F0",
        iconSvg: `<svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
        hash: "#/setup/client-master-setup/company-setup"
      }
    ];

    const roles = [
      { module: "Purchase", role: "Full Access", hash: "#/purchase/pre-processing/bookings" },
      { module: "Pre-Processing", role: "Full Access", hash: "#/preprocessing/dashboard/overview" },
      { module: "Quality Control", role: "Full Access", hash: "#/quality/dashboard/qc-overview" },
      { module: "Production", role: "Full Access", hash: "#/production/dashboard/overview" },
      { module: "Cold Storage", role: "Full Access", hash: "#/coldstore/dashboard/overview" },
      { module: "Inventory", role: "Full Access", hash: "#/inventory/dashboard/overview" },
      { module: "Sales & Export", role: "Full Access", hash: "#/sales/dashboard/overview" },
      { module: "Configuration", role: "Super Admin", hash: "#/setup/client-master-setup/roles-permissions" }
    ];

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in w-full pb-10">
        
        <!-- 1. Welcome Devi Fisheries Hero Banner with Facility Artwork -->
        <div 
          class="relative rounded-2xl md:rounded-3xl border border-[#BAE6FD]/80 py-10 sm:py-12 md:py-14 px-7 sm:px-9 md:px-12 overflow-hidden shadow-xs w-full flex items-center min-h-[165px] md:min-h-[185px]"
          style="background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 45%, #D8F4F8 100%);"
        >
          <!-- Illustration: mildeep-camaroo-illustration.png -->
          <div class="absolute right-0 bottom-0 top-0 w-3/5 sm:w-1/2 md:w-3/5 lg:w-3/5 h-full pointer-events-none select-none overflow-hidden flex items-center justify-end">
            <img 
              src="assets/mildeep-camaroo-illustration.png" 
              alt="Devi Fisheries Facility Illustration" 
              class="w-full h-full object-cover object-right opacity-85 sm:opacity-95 md:opacity-100"
              style="mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, black 45%); -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, black 45%);"
            />
          </div>

          <!-- Banner Foreground Content -->
          <div class="relative z-10 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-sky-200 text-[#006C7A] font-bold text-xs mb-3 shadow-2xs backdrop-blur-xs">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Devi Fisheries Unit · Plant 01 Operational</span>
            </div>
            <h1 class="text-3xl sm:text-4xl md:text-[38px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Welcome Devi Fisheries
            </h1>
            <p class="text-slate-600 text-sm md:text-[15px] font-medium mt-2 leading-relaxed">
              Enterprise Floor Intelligence, Production Analytics & Supply Chain Management Suite.
            </p>
          </div>
        </div>

        <!-- 2. Quick Workflow Shortcuts Section -->
        <div class="w-full">
          <div class="flex items-center justify-between gap-3 mb-4">
            <h2 class="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight flex items-center gap-2">
              <span class="w-2 h-5 rounded-sm bg-[#00A4B7]"></span>
              <span>Quick Workflow Shortcuts</span>
            </h2>
            <span class="text-xs font-semibold text-slate-400">Click to launch module subview</span>
          </div>

          <!-- Responsive 4-Column Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
            ${shortcuts.map(s => `
              <a 
                href="${s.hash}" 
                class="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#00A4B7] transition-all duration-200 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div 
                    class="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105"
                    style="background-color: ${s.bgColor}; border: 1px solid ${s.borderColor};"
                  >
                    ${s.iconSvg}
                  </div>
                  <span class="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    ${s.module}
                  </span>
                  <h3 class="text-sm sm:text-[14.5px] font-bold text-[#0F172A] group-hover:text-[#006C7A] transition-colors leading-snug">
                    ${s.title}
                  </h3>
                </div>
                <div class="pt-4 flex items-center gap-1.5 text-xs font-semibold text-[#006C7A] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Open</span>
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
              </a>
            `).join('')}
          </div>
        </div>

        <!-- 3. My Permissible Roles Section -->
        <div class="w-full pt-2">
          <div class="flex items-center justify-between gap-3 mb-3.5">
            <h2 class="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight flex items-center gap-2">
              <span class="w-2 h-5 rounded-sm bg-[#0284C7]"></span>
              <span>My Permissible Roles</span>
            </h2>
            <a 
              href="#/setup/client-master-setup/roles-permissions" 
              class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 text-[#006C7A] border border-[#CBD5E1] transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <span>Manage Settings</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </a>
          </div>

          <!-- 8 Compact Role Shortcuts Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
            ${roles.map(r => `
              <a 
                href="${r.hash}" 
                class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs flex items-center justify-between gap-3 hover:border-[#00A4B7] hover:shadow-xs transition-all group cursor-pointer"
              >
                <div class="flex items-center gap-2.5 min-w-0">
                  <span class="w-2 h-2 rounded-full ${r.role === 'Super Admin' ? 'bg-rose-500' : 'bg-teal-500'} shrink-0"></span>
                  <span class="text-xs font-bold text-[#0F172A] group-hover:text-[#006C7A] transition-colors truncate">${r.module}</span>
                </div>
                <span class="px-2 py-0.5 rounded text-[10.5px] font-bold shrink-0 ${r.role === 'Super Admin' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-teal-50 text-teal-700 border border-teal-200'}">
                  ${r.role}
                </span>
              </a>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }
};
"""

    old_app_def = "const App = {"
    if old_app_def in content:
        content = content.replace(old_app_def, home_view_code + "\n" + old_app_def, 1)
        print("  ✓ Injected HomeView definition before App")
    else:
        print("  ⚠ old_app_def not found")

    # 7. Wire App.handleRoute to handle modId === 'home' or root hash
    old_handle_route_top = """    // Ensure main ERP shell is mounted
    this.ensureShellMounted();

    // Clean hash: remove leading # and /
    const clean = rawHash.replace(/^#\/?/, '').replace(/^\/+/, '');
    const parts = clean.split('/');
    const isSuperAdmin = ERP_DATA.currentUser?.role === 'Super Admin';
    const defaultModule = isSuperAdmin ? 'dashboard' : 'sales';
    const moduleName = parts[0] || defaultModule;"""

    new_handle_route_top = """    // Ensure main ERP shell is mounted
    this.ensureShellMounted();

    // Clean hash: remove leading # and /
    const clean = rawHash.replace(/^#\/?/, '').replace(/^\/+/, '');
    const parts = clean.split('/');
    const isSuperAdmin = ERP_DATA.currentUser?.role === 'Super Admin';

    // Route to Home if empty hash or #/home
    if (!clean || clean === 'home' || parts[0] === 'home') {
      const resolvedHash = '#/home';
      Sidebar.render('sidebar-container', resolvedHash);
      Breadcrumbs.render('breadcrumbs-container', resolvedHash);
      HomeView.render('main-content-container');
      const mainEl = document.getElementById('main-content-container');
      if (mainEl) mainEl.scrollTop = 0;
      return;
    }

    const defaultModule = isSuperAdmin ? 'dashboard' : 'sales';
    const moduleName = parts[0] || defaultModule;"""

    if old_handle_route_top in content:
        content = content.replace(old_handle_route_top, new_handle_route_top, 1)
        print("  ✓ Wired App.handleRoute() for Home")
    else:
        print("  ⚠ old_handle_route_top not found")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Saved {filepath} successfully.\n")

if __name__ == "__main__":
    implement_home_in_html("miledeep-devi-fisheries.html")
