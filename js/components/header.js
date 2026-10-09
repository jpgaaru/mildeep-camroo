// Global Top Header Component

import { ERP_DATA } from '../data/mockData.js';
import { Toast } from './toast.js';
import { Modal } from './modal.js';
import { TourGuide } from './tourGuide.js';
import { Sidebar } from './sidebar.js';
import { Accessibility } from './accessibility.js';

export const Header = {
  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const isCollapsed = localStorage.getItem('dfl_sidebar_collapsed') === 'true';

    container.innerHTML = `
      <header class="bg-white border-b border-[#E2E8F0] h-14 px-5 flex items-center justify-between select-none rounded-t-2xl">
        <!-- Left: Welcome Text -->
        <div class="flex items-center gap-1.5 text-xs sm:text-sm text-[#64748B]">
          <span>Welcome,</span>
          <span class="font-semibold text-[#0F172A] text-sm sm:text-base">${ERP_DATA.currentUser.name}</span>
        </div>

        <!-- Center: Global Inline Search (Direct typing, no popup modal) -->
        <div class="relative mx-3" id="header-search-container">
          <div class="w-52 sm:w-64 relative flex items-center">
            <svg class="w-4 h-4 text-[#94A3B8] absolute left-2.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input 
              type="text" 
              id="header-global-search-input" 
              placeholder="Search ERP records..." 
              autocomplete="off"
              class="w-full pl-8 pr-7 py-1.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] focus:bg-white text-[#0F172A] placeholder-[#94A3B8] border border-[#E2E8F0] focus:border-[#0284C7] rounded-xl text-xs transition-colors focus:outline-none"
            />
            <button 
              type="button" 
              id="header-search-clear-btn" 
              class="hidden absolute right-2 text-[#94A3B8] hover:text-[#0F172A] cursor-pointer"
              title="Clear Search"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Live Inline Search Dropdown (Appears directly under the input, no popup modal) -->
          <div 
            id="header-search-dropdown" 
            class="hidden absolute left-0 top-full mt-1.5 w-80 sm:w-[480px] bg-white border border-[#E2E8F0] rounded-xl z-50 overflow-hidden shadow-xl"
            style="max-width: calc(100vw - 32px);"
          >
            <div id="header-search-results-content" class="max-h-96 overflow-y-auto p-2.5 text-xs"></div>
          </div>
        </div>

        <!-- Right: Actions, Notifications & Profile -->
        <div class="flex items-center gap-2">
          <!-- Help Icon Button -->
          <button id="header-help-btn" class="p-2 text-[#64748B] hover:text-[#0284C7] hover:bg-[#F8FAFC] rounded-full transition-colors flex items-center justify-center cursor-pointer border border-[#E2E8F0]" title="Help & Compliance Manual">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </button>

          <!-- Notifications -->
          <div class="relative">
            <button id="header-notifications-btn" class="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-full relative transition-colors cursor-pointer border border-[#E2E8F0]" title="Notifications">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              <span class="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full ring-2 ring-white"></span>
            </button>
            <div id="notifications-dropdown" class="hidden absolute right-0 mt-2 w-80 bg-white rounded-xl border border-[#E2E8F0] py-2 z-50 text-xs">
              <div class="px-3 py-1.5 font-bold text-[#0F172A] border-b border-[#F1F5F9] flex justify-between items-center">
                <span>Notifications (3 New)</span>
                <span class="text-[10px] text-[#0284C7] cursor-pointer hover:underline font-semibold">Mark all read</span>
              </div>
              <div class="divide-y divide-[#F1F5F9] max-h-64 overflow-y-auto">
                <div class="p-3 hover:bg-[#F8FAFC] cursor-pointer">
                  <div class="flex items-center gap-1.5 text-[#0284C7] font-semibold text-[11px]">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#0284C7]"></span> RM Arrival #RMA-2026-00341
                  </div>
                  <div class="text-[#475569] mt-0.5">Godavari Coastal 2,980 KG Vannamei Shrimp staged at Dock #1 awaiting QC approval.</div>
                  <div class="text-[10px] text-[#94A3B8] mt-1">20 minutes ago</div>
                </div>
                <div class="p-3 hover:bg-[#F8FAFC] cursor-pointer">
                  <div class="flex items-center gap-1.5 text-[#15803D] font-semibold text-[11px]">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#15803D]"></span> QC Antibiotic Clearance
                  </div>
                  <div class="text-[#475569] mt-0.5">LOT-2026-00128 Seabass passed all rapid nitrofurans & organoleptic panels.</div>
                  <div class="text-[10px] text-[#94A3B8] mt-1">1 hour ago</div>
                </div>
                <div class="p-3 hover:bg-[#F8FAFC] cursor-pointer">
                  <div class="flex items-center gap-1.5 text-[#6D28D9] font-semibold text-[11px]">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#6D28D9]"></span> Export Vessel Gate-In
                  </div>
                  <div class="text-[#475569] mt-0.5">Container ONEU-440912-8 (14 MT Black Tiger) cleared customs for Tokyo.</div>
                  <div class="text-[10px] text-[#94A3B8] mt-1">3 hours ago</div>
                </div>
              </div>
            </div>
          </div>


          <!-- User Profile Dropdown -->
          <div class="relative pl-1 border-l border-[#E2E8F0]">
            <button id="user-menu-btn" class="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-[#F8FAFC] transition-colors cursor-pointer">
              <img src="${ERP_DATA.currentUser.avatar}" alt="Avatar" class="w-7 h-7 rounded-full object-cover ring-1 ring-[#E2E8F0]" />
              <div class="hidden lg:flex flex-col text-left">
                <span class="text-xs font-semibold text-[#0F172A] leading-tight">${ERP_DATA.currentUser.name}</span>
                <span class="text-[10px] text-[#64748B] leading-tight" id="user-role-badge">${ERP_DATA.currentUser.role}</span>
              </div>
              <svg class="w-3.5 h-3.5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>

            <!-- User Menu Popup -->
            <div id="user-dropdown-menu" class="hidden absolute right-0 mt-2 w-64 bg-white rounded-xl border border-[#DFE1E6] py-2 z-[60] text-xs">
              <div class="px-3 py-2 border-b border-[#EBECF0]">
                <div class="font-bold text-[#172B4D]">${ERP_DATA.currentUser.name}</div>
                <div class="text-[11px] text-[#5E6C84]">${ERP_DATA.currentUser.email}</div>
                <div class="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#F0F9FF] text-[#0284C7] font-semibold text-[10px] rounded mt-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#0284C7]"></span>
                  ${ERP_DATA.currentUser.role}
                </div>
              </div>

              <div class="p-1 border-b border-[#EBECF0]">
                <!-- Day / Night Mode Toggle -->
                <button id="theme-toggle-menu-btn" class="w-full text-left px-3 py-2 hover:bg-[#F8FAFC] text-[#334155] hover:text-[#0284C7] rounded font-semibold flex items-center justify-between transition-colors cursor-pointer" title="Toggle Day / Night Mode">
                  <div class="flex items-center gap-2">
                    <span id="theme-icon-container">
                      <svg class="w-4 h-4 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
                    </span>
                    <span id="theme-label-text">Night Mode</span>
                  </div>
                  <span id="theme-badge-text" class="text-[10px] font-semibold text-[#64748B] bg-[#F1F5F9] border border-[#CBD5E1] px-1.5 py-0.5 rounded">Off</span>
                </button>

                <!-- Accessibility & Display Settings -->
                <button id="accessibility-menu-btn" class="w-full text-left px-3 py-2 hover:bg-[#F8FAFC] text-[#334155] hover:text-[#0284C7] rounded font-semibold flex items-center justify-between transition-colors cursor-pointer" title="Accessibility & Display Settings (WCAG 2.1)">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="4" r="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 9h16M12 9v11M8 20l4-5 4 5"/></svg>
                    <span>Accessibility & Display</span>
                  </div>
                  <span class="text-[10px] font-semibold text-[#0284C7] bg-[#F0F9FF] border border-[#BAE6FD] px-1.5 py-0.5 rounded">WCAG</span>
                </button>

                <!-- Keyboard Shortcuts -->
                <button id="keyboard-shortcuts-menu-btn" class="w-full text-left px-3 py-2 hover:bg-[#F8FAFC] text-[#334155] hover:text-[#0284C7] rounded font-semibold flex items-center justify-between transition-colors cursor-pointer" title="Keyboard Shortcuts for Power Users">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/></svg>
                    <span>Keyboard Shortcuts</span>
                  </div>
                  <kbd class="text-[10px] font-semibold text-[#64748B] bg-[#F1F5F9] border border-[#CBD5E1] px-1.5 py-0.5 rounded">?</kbd>
                </button>
              </div>

              <div class="p-1 border-b border-[#EBECF0]">
                <button id="start-tour-dropdown-btn" class="w-full text-left px-3 py-2 hover:bg-[#F0F9FF] text-[#0284C7] rounded font-semibold flex items-center gap-2 transition-colors cursor-pointer">
                  <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  <span>Play Tour Guide Again</span>
                </button>
              </div>

              <div class="p-1">
                <button id="logout-menu-btn" class="w-full text-left px-3 py-2 hover:bg-[#FFEBE6] text-[#BF2600] rounded-lg font-medium flex items-center gap-2 transition-colors cursor-pointer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    `;

    this.bindEvents();
  },

  bindEvents() {
    // Hamburger Sidebar Toggle (Collapse into Icon-Only mode instead of completely hiding)
    const toggleBtn = document.getElementById('sidebar-toggle-btn');
    if (toggleBtn) {
      toggleBtn.onclick = (e) => {
        e.stopPropagation();
        Sidebar.toggleCollapse();
      };
    }

    // Notifications Dropdown
    const notifBtn = document.getElementById('header-notifications-btn');
    const notifMenu = document.getElementById('notifications-dropdown');
    if (notifBtn && notifMenu) {
      notifBtn.onclick = (e) => {
        e.stopPropagation();
        notifMenu.classList.toggle('hidden');
      };
    }

    // User Dropdown
    const userBtn = document.getElementById('user-menu-btn');
    const userMenu = document.getElementById('user-dropdown-menu');
    if (userBtn && userMenu) {
      userBtn.onclick = (e) => {
        e.stopPropagation();
        userMenu.classList.toggle('hidden');
      };
    }

    // Close on click outside
    document.addEventListener('click', () => {
      if (notifMenu) notifMenu.classList.add('hidden');
      if (userMenu) userMenu.classList.add('hidden');
    });

    // Inline Live Search in Header (Direct input, no popup modal)
    const searchInput = document.getElementById('header-global-search-input');
    const searchDropdown = document.getElementById('header-search-dropdown');
    const searchContent = document.getElementById('header-search-results-content');
    const clearBtn = document.getElementById('header-search-clear-btn');

    if (searchInput && searchDropdown && searchContent) {
      const renderResults = () => {
        const query = searchInput.value.trim();
        if (window.App && typeof window.App.performGlobalSearch === 'function') {
          searchContent.innerHTML = window.App.performGlobalSearch(query);
          searchDropdown.classList.remove('hidden');
          if (window.App.bindSearchResultClicks) {
            window.App.bindSearchResultClicks(searchDropdown);
          }
        }
        if (clearBtn) {
          clearBtn.classList.toggle('hidden', !query);
        }
      };

      searchInput.addEventListener('focus', () => {
        renderResults();
      });

      searchInput.addEventListener('input', () => {
        renderResults();
      });

      if (clearBtn) {
        clearBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          searchInput.value = '';
          searchInput.focus();
          renderResults();
        });
      }

      // Close dropdown on click outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('#header-search-container')) {
          searchDropdown.classList.add('hidden');
        }
      });

      // Close dropdown on Escape
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          searchDropdown.classList.add('hidden');
          searchInput.blur();
        }
      });
    }

    // Day / Night Theme Toggle in User Profile dropdown
    const themeBtn = document.getElementById('theme-toggle-menu-btn');
    const updateThemeUI = () => {
      const isDark = document.documentElement.classList.contains('theme-dark');
      const iconContainer = document.getElementById('theme-icon-container');
      const labelText = document.getElementById('theme-label-text');
      const badgeText = document.getElementById('theme-badge-text');

      if (iconContainer && labelText && badgeText) {
        if (isDark) {
          iconContainer.innerHTML = `<svg class="w-4 h-4 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`;
          labelText.textContent = 'Day Mode';
          badgeText.textContent = 'Dark';
          badgeText.className = 'text-[10px] font-semibold text-[#15803D] bg-[#F0FDF4] border border-[#DCFCE7] px-1.5 py-0.5 rounded';
        } else {
          iconContainer.innerHTML = `<svg class="w-4 h-4 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;
          labelText.textContent = 'Night Mode';
          badgeText.textContent = 'Off';
          badgeText.className = 'text-[10px] font-semibold text-[#64748B] bg-[#F1F5F9] border border-[#CBD5E1] px-1.5 py-0.5 rounded';
        }
      }
    };

    updateThemeUI();

    if (themeBtn) {
      themeBtn.onclick = (e) => {
        e.stopPropagation();
        const isDark = document.documentElement.classList.toggle('theme-dark');
        localStorage.setItem('dfl_theme', isDark ? 'dark' : 'light');
        updateThemeUI();
        Toast.show(isDark ? 'Night Mode activated' : 'Day Mode activated', 'info');
      };
    }

    // Accessibility & Display Settings Modal
    const a11yBtn = document.getElementById('accessibility-menu-btn');
    if (a11yBtn) {
      a11yBtn.onclick = (e) => {
        e.stopPropagation();
        if (userMenu) userMenu.classList.add('hidden');
        Accessibility.openModal();
      };
    }

    // Start Tour from user dropdown
    const startTourBtn = document.getElementById('start-tour-dropdown-btn');
    if (startTourBtn) {
      startTourBtn.onclick = (e) => {
        e.stopPropagation();
        if (userMenu) userMenu.classList.add('hidden');
        TourGuide.start(true);
      };
    }

    // Keyboard Shortcuts from User Profile dropdown
    const shortcutsBtn = document.getElementById('keyboard-shortcuts-menu-btn');
    if (shortcutsBtn) {
      shortcutsBtn.onclick = (e) => {
        e.stopPropagation();
        if (userMenu) userMenu.classList.add('hidden');
        if (window.App && typeof window.App.openKeyboardShortcutsModal === 'function') {
          window.App.openKeyboardShortcutsModal();
        }
      };
    }

    // Logout
    const logoutBtn = document.getElementById('logout-menu-btn');
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        window.location.hash = '#/login';
      };
    }

    // Help Button: navigates to Help module screen (Under Construction as per other screens)
    const helpBtn = document.getElementById('header-help-btn');
    if (helpBtn) {
      helpBtn.addEventListener('click', () => {
        window.location.hash = '#/help/documentation/compliance-manual';
      });
    }
  }
};
