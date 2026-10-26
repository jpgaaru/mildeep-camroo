#!/usr/bin/env python3
"""
scripts/implement_sticky_navigation.py
Implements unified sticky top navigation (Header + Breadcrumbs + Tab Menu) in miledeep-devi-fisheries.html:
1. Updates App.ensureShellMounted() to wrap Header, Breadcrumbs, and Tab Bar in a unified sticky card at top-0 with background masking.
2. Updates TabBar.render() to automatically mount into the sticky container #sticky-tabs-container.
3. Automatically suppresses/hides tab container when on pages with 0 or 1 tabs (like Home).
"""

import sys

def update_miledeep():
    path = "miledeep-devi-fisheries.html"
    print(f"Updating {path}...")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update ensureShellMounted() HTML layout
    old_shell = """      document.getElementById('app-root').innerHTML = `
        <div id="erp-app-shell" data-layout="option1" class="min-h-screen bg-[#F8FAFC]">
          <!-- Left Floated Sidebar (Floating with rounded corners) -->
          <div id="sidebar-container" class="${collapsedClass}"></div>

          <!-- Main Layout Wrapper (offset by floating sidebar width + margins) -->
          <div id="main-layout-wrapper" class="${collapsedClass} flex flex-col min-h-screen">
            <!-- Fixed / Sticky Top Header & Breadcrumbs Wrapper (Option 1) -->
            <div class="sticky top-3 z-30 mt-3 rounded-2xl border border-[#E2E8F0] bg-white">
              <div id="header-container" class="bg-white rounded-t-2xl"></div>
              <!-- Breadcrumbs Bar (Fixed in position right below Header) -->
              <div class="px-6 py-2 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between rounded-b-2xl">
                <div id="breadcrumbs-container"></div>
              </div>
            </div>

            <!-- Module Subview Injected Here (Full-Width Responsive UI) -->
            <main id="main-content-container" class="py-4 flex-1 w-full"></main>
          </div>
        </div>
      `;"""

    new_shell = """      document.getElementById('app-root').innerHTML = `
        <div id="erp-app-shell" data-layout="option1" class="min-h-screen bg-[#F8FAFC]">
          <!-- Left Floated Sidebar (Floating with rounded corners) -->
          <div id="sidebar-container" class="${collapsedClass}"></div>

          <!-- Main Layout Wrapper (offset by floating sidebar width + margins) -->
          <div id="main-layout-wrapper" class="${collapsedClass} flex flex-col min-h-screen">
            <!-- Unified Sticky Top Navigation: Header + Breadcrumbs + Tab Menu (Locks cleanly at top-0 with background mask) -->
            <div id="sticky-top-nav-wrapper" class="sticky top-0 z-30 pt-3 pb-1 bg-[#F8FAFC]">
              <div class="rounded-2xl border border-[#E2E8F0] bg-white shadow-xs overflow-hidden">
                <div id="header-container" class="bg-white"></div>
                <!-- Breadcrumbs Bar -->
                <div id="sticky-breadcrumbs-bar" class="px-6 py-2 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between">
                  <div id="breadcrumbs-container"></div>
                </div>
                <!-- Underline Tab Menu Bar (Sticky directly below Breadcrumbs) -->
                <div id="sticky-tabs-container" class="px-6 bg-white border-t border-[#E2E8F0] hidden"></div>
              </div>
            </div>

            <!-- Module Subview Injected Here (Full-Width Responsive UI) -->
            <main id="main-content-container" class="py-3 flex-1 w-full"></main>
          </div>
        </div>
      `;"""

    if old_shell in content:
        content = content.replace(old_shell, new_shell, 1)
        print("  ✓ Updated ensureShellMounted() with unified sticky navigation wrapper")
    else:
        print("  ⚠ old_shell not found in miledeep-devi-fisheries.html")

    # 2. Update TabBar.render()
    old_tabbar_render = """const TabBar = {
  render(containerId, activeHash) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const clean = (activeHash || '').replace(/^#\/?/, '').replace(/^\/+/, '');
    const parts = clean.split('/');
    const modId = parts[0] || 'purchase';
    let subId = parts[1] || 'dashboard';
    let tabId = parts[2] || '';

    const module = NAV_HIERARCHY.find(m => m.id === modId);
    if (!module) return null;

    let submenu = module.submenus.find(s => s.id === subId);
    if (!submenu) {
      submenu = module.submenus[0];
      if (submenu && submenu.tabs.some(t => t.id === subId)) {
        tabId = subId;
      }
    }
    if (!submenu) return null;

    // Suppress tab bar if only 1 tab (e.g. Dashboard Overview) or if on new-pi form
    if (!submenu.tabs || submenu.tabs.length <= 1 || tabId === 'new-pi') {
      container.innerHTML = '';
      return null;
    }

    const currentTabId = tabId || submenu.defaultTab;

    container.innerHTML = `
      <nav aria-label="${submenu.title} tabs navigation" class="mb-4">
        <div 
          role="tablist" 
          aria-label="${submenu.title} views" 
          id="${containerId}-tablist"
          class="flex items-center gap-6 border-b border-[#E2E8F0] pt-1 pb-0 select-none overflow-x-auto"
        >
          ${submenu.tabs.map(tab => {
            const isActive = tab.id === currentTabId;
            return `
              <a 
                id="tab-${tab.id}"
                role="tab"
                href="${tab.hash}" 
                aria-selected="${isActive ? 'true' : 'false'}"
                tabindex="${isActive ? '0' : '-1'}"
                aria-controls="panel-${tab.id}"
                class="select-none px-1 py-2 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 border-b-2 -mb-[1px] outline-none ${
                  isActive 
                    ? 'tab-active border-[#00A4B7] text-[#00A4B7] font-bold bg-transparent' 
                    : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] bg-transparent'
                }"
              >
                <span class="select-none">${tab.label}</span>
              </a>
            `;
          }).join('')}
        </div>
      </nav>
    `;

    this.bindKeyboardNav(containerId);

    return { module, submenu, currentTabId };
  },"""

    new_tabbar_render = """const TabBar = {
  render(containerId, activeHash) {
    const stickyContainer = document.getElementById('sticky-tabs-container');
    const targetContainer = stickyContainer || document.getElementById(containerId);
    if (!targetContainer) return null;

    // Clear any inline tab container in page body to prevent duplicate rendering
    if (stickyContainer && containerId && containerId !== 'sticky-tabs-container') {
      const inlineEl = document.getElementById(containerId);
      if (inlineEl) inlineEl.innerHTML = '';
    }

    const clean = (activeHash || '').replace(/^#\/?/, '').replace(/^\/+/, '');
    const parts = clean.split('/');
    const modId = parts[0] || 'purchase';
    let subId = parts[1] || 'dashboard';
    let tabId = parts[2] || '';

    const module = NAV_HIERARCHY.find(m => m.id === modId);
    if (!module) {
      if (stickyContainer) {
        stickyContainer.innerHTML = '';
        stickyContainer.classList.add('hidden');
      }
      return null;
    }

    let submenu = module.submenus.find(s => s.id === subId);
    if (!submenu) {
      submenu = module.submenus[0];
      if (submenu && submenu.tabs.some(t => t.id === subId)) {
        tabId = subId;
      }
    }

    // Suppress tab bar if only 1 tab or if on new-pi form
    if (!submenu || !submenu.tabs || submenu.tabs.length <= 1 || tabId === 'new-pi') {
      if (stickyContainer) {
        stickyContainer.innerHTML = '';
        stickyContainer.classList.add('hidden');
      }
      return null;
    }

    // Reveal sticky tab bar container
    if (stickyContainer) {
      stickyContainer.classList.remove('hidden');
    }

    const currentTabId = tabId || submenu.defaultTab || submenu.tabs[0]?.id;

    targetContainer.innerHTML = `
      <nav aria-label="${submenu.title} tabs navigation" class="pt-0.5">
        <div 
          role="tablist" 
          aria-label="${submenu.title} views" 
          id="${targetContainer.id}-tablist"
          class="flex items-center gap-6 select-none overflow-x-auto"
        >
          ${submenu.tabs.map(tab => {
            const isActive = tab.id === currentTabId || (tab.id === 'overview' && (currentTabId === 'qc-overview' || currentTabId === 'overview'));
            return `
              <a 
                id="tab-${tab.id}"
                role="tab"
                href="${tab.hash}" 
                aria-selected="${isActive ? 'true' : 'false'}"
                tabindex="${isActive ? '0' : '-1'}"
                aria-controls="panel-${tab.id}"
                class="select-none py-2 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 border-b-2 -mb-[1px] outline-none ${
                  isActive 
                    ? 'tab-active border-[#00A4B7] text-[#00A4B7] font-bold bg-transparent' 
                    : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] bg-transparent'
                }"
              >
                <span class="select-none">${tab.label}</span>
              </a>
            `;
          }).join('')}
        </div>
      </nav>
    `;

    this.bindKeyboardNav(targetContainer.id);

    return { module, submenu, currentTabId };
  },"""

    if old_tabbar_render in content:
        content = content.replace(old_tabbar_render, new_tabbar_render, 1)
        print("  ✓ Updated TabBar.render() for sticky container integration")
    else:
        print("  ⚠ old_tabbar_render not found in miledeep-devi-fisheries.html")

    # 3. In App.handleRoute(), hide sticky tabs on home
    old_home_route = """    // Route to Home if empty hash or #/home
    if (!clean || clean === 'home' || parts[0] === 'home') {
      const resolvedHash = '#/home';
      Sidebar.render('sidebar-container', resolvedHash);
      Breadcrumbs.render('breadcrumbs-container', resolvedHash);
      HomeView.render('main-content-container');
      const mainEl = document.getElementById('main-content-container');
      if (mainEl) mainEl.scrollTop = 0;
      return;
    }"""

    new_home_route = """    // Route to Home if empty hash or #/home
    if (!clean || clean === 'home' || parts[0] === 'home') {
      const resolvedHash = '#/home';
      const stickyTabs = document.getElementById('sticky-tabs-container');
      if (stickyTabs) {
        stickyTabs.innerHTML = '';
        stickyTabs.classList.add('hidden');
      }
      Sidebar.render('sidebar-container', resolvedHash);
      Breadcrumbs.render('breadcrumbs-container', resolvedHash);
      HomeView.render('main-content-container');
      const mainEl = document.getElementById('main-content-container');
      if (mainEl) mainEl.scrollTop = 0;
      return;
    }"""

    if old_home_route in content:
        content = content.replace(old_home_route, new_home_route, 1)
        print("  ✓ Handled sticky tabs suppression on Home route")
    else:
        print("  ⚠ old_home_route not found in miledeep-devi-fisheries.html")

    # 4. In App.handleRoute(), call TabBar.render into sticky container centrally
    old_render_nav = """    // Render Navigation & Breadcrumbs (Standard Option 1: Floating Sidebar)
    Sidebar.render('sidebar-container', resolvedHash);
    Breadcrumbs.render('breadcrumbs-container', resolvedHash);"""

    new_render_nav = """    // Render Navigation, Breadcrumbs & Sticky Tab Menu
    Sidebar.render('sidebar-container', resolvedHash);
    Breadcrumbs.render('breadcrumbs-container', resolvedHash);
    TabBar.render('sticky-tabs-container', resolvedHash);"""

    if old_render_nav in content:
        content = content.replace(old_render_nav, new_render_nav, 1)
        print("  ✓ Centrally wired TabBar.render('sticky-tabs-container') in handleRoute()")
    else:
        print("  ⚠ old_render_nav not found in miledeep-devi-fisheries.html")

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Saved {path}.\n")

if __name__ == "__main__":
    update_miledeep()
