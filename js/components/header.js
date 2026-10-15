// Global Top Header Component

import { ERP_DATA } from '../data/mockData.js';
import { Toast } from './toast.js';
import { Modal } from './modal.js';
import { TourGuide } from './tourGuide.js';
import { Sidebar } from './sidebar.js';
import { Accessibility } from './accessibility.js';
import { NOTIFICATIONS_DATA } from '../views/notificationsView.js';

export const Header = {
  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const isCollapsed = localStorage.getItem('dfl_sidebar_collapsed') === 'true';
    const unreadCount = Array.isArray(NOTIFICATIONS_DATA)
      ? NOTIFICATIONS_DATA.filter(n => n.unread).length
      : 5;
    const isNotificationsActive = (window.location.hash || '').startsWith('#/notifications');

    container.innerHTML = `
      <header class="bg-white h-14 px-6 sm:px-8 flex items-center justify-between select-none relative z-40">
        <!-- Left: Search ERP records... -->
        <div class="flex items-center" id="header-search-container">
          <div class="relative w-64 sm:w-72 md:w-80">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input 
              type="text" 
              id="header-global-search-input" 
              placeholder="Search ERP records..." 
              class="w-full text-xs sm:text-[13px] pl-9 pr-8 py-2 bg-white border border-[#CBD5E1] rounded-xl focus:outline-none focus:border-[#006C7A] focus:ring-2 focus:ring-[#006C7A]/20 transition-all text-[#0F172A] placeholder-[#94A3B8]"
            />
            <button id="header-search-clear-btn" class="hidden absolute right-2.5 top-2.5 text-[#94A3B8] hover:text-[#0F172A] text-xs font-bold cursor-pointer" title="Clear search">✕</button>

            <!-- Live Search Results Dropdown -->
            <div id="header-search-dropdown" class="hidden absolute left-0 top-full mt-2 w-full sm:w-96 md:w-[480px] bg-white rounded-xl shadow-2xl border border-[#E2E8F0] p-3 z-[80] text-xs">
              <div id="header-search-results-content" class="max-h-96 overflow-y-auto space-y-3"></div>
            </div>
          </div>
        </div>

        <!-- Right: Actions & User Profile Block (Border-free minimal icons) -->
        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Help Button (?) - Clean without stroke boundary -->
          <button
            id="header-help-btn"
            class="w-9 h-9 rounded-full bg-transparent hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#006C7A] flex items-center justify-center transition-all cursor-pointer"
            title="Help & Shortcuts (?)"
          >
            <svg style="width:19px;height:19px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9.5" stroke-width="1.8"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m0 3.5h.01"/>
            </svg>
          </button>

          <!-- Notification Bell Button - Clean without stroke boundary -->
          <a
            href="#/notifications/center/all-notifications"
            id="header-notifications-page-btn"
            class="relative w-9 h-9 rounded-full bg-transparent hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#006C7A] flex items-center justify-center transition-all cursor-pointer"
            title="Notification Center (${unreadCount} Unread)"
          >
            <svg style="width:19px;height:19px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            ${unreadCount > 0 ? `
              <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444] border-2 border-white ring-1 ring-[#EF4444]/30"></span>
            ` : ''}
          </a>

          <!-- Vertical Divider -->
          <div class="h-8 w-px bg-[#E2E8F0] mx-0.5"></div>

          <!-- User Profile Trigger & Menu -->
          <div class="relative">
            <button
              id="user-menu-btn"
              class="flex items-center gap-2.5 py-1 px-1.5 rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer outline-none group"
              title="${ERP_DATA.currentUser.name} (${ERP_DATA.currentUser.role})"
            >
              <img
                src="${ERP_DATA.currentUser.avatar}"
                alt="${ERP_DATA.currentUser.name}"
                class="w-8 h-8 rounded-full object-cover"
                onerror="this.style.display='none';this.nextElementSibling.classList.remove('hidden');"
              />
              <div class="hidden w-8 h-8 rounded-full bg-[#006C7A] text-white text-xs font-bold flex items-center justify-center">
                YP
              </div>

              <div class="flex flex-col text-left">
                <span class="text-xs font-bold text-[#0F172A] leading-tight group-hover:text-[#006C7A] transition-colors">${ERP_DATA.currentUser.name}</span>
                <span class="text-[11px] font-medium text-[#64748B] leading-tight">${ERP_DATA.currentUser.role}</span>
              </div>

              <svg class="w-4 h-4 text-[#64748B] ml-0.5 group-hover:text-[#0F172A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- User Menu Popup (top-full mt-2 ensures it opens strictly below the button) -->
            <div id="user-dropdown-menu" class="hidden absolute right-0 top-full mt-2 w-64 bg-white rounded-xl border border-[#DFE1E6] shadow-2xl py-2 z-[90] text-xs">
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

                <!-- Design System Specs Link -->
                <a href="/designsystem" target="_blank" class="w-full text-left px-3 py-2 hover:bg-[#F0FAFC] text-[#334155] hover:text-[#006C7A] rounded font-semibold flex items-center justify-between transition-colors cursor-pointer" title="Camaroo Design System Component Specs">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                    <span>Design System Specs</span>
                  </div>
                  <span class="text-[10px] font-bold text-[#006C7A] bg-[#F0FAFC] border border-[#B2ECF3] px-1.5 py-0.5 rounded">v5 System</span>
                </a>

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

    if (typeof window !== 'undefined' && window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
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
        sessionStorage.removeItem('dfl_authenticated');
        const existing = document.getElementById('erp-app-shell');
        if (existing) existing.remove();
        Toast.show('You have been signed out safely.', 'info');
        window.location.hash = '#/login';
        if (window.App && typeof window.App.route === 'function') {
          window.App.route();
        }
      };
    }

    // Help Button: opens keyboard shortcuts modal or navigates to documentation
    const helpBtn = document.getElementById('header-help-btn');
    if (helpBtn) {
      helpBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.App && typeof window.App.openKeyboardShortcutsModal === 'function') {
          window.App.openKeyboardShortcutsModal();
        } else {
          window.location.hash = '#/help/documentation/compliance-manual';
        }
      });
    }
  }
};
