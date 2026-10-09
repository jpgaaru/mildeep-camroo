// Option 2: Enterprise Top Navigation Bar Component (Horizontal Module, Submenu & Tab Navigation)

import { LOGO_COLOR } from '../data/logos.js';
import { ERP_DATA } from '../data/mockData.js';
import { NAV_HIERARCHY } from './sidebar.js';
import { TourGuide } from './tourGuide.js';
import { Toast } from './toast.js';

export const TopNav = {
  activeModuleId: 'purchase',
  activeSubmenuId: 'dashboard',
  activeTabId: 'rm-dashboard',

  render(containerId, activeHash = '#/purchase/dashboard/rm-dashboard') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const clean = activeHash.replace(/^#\/?/, '').replace(/^\/+/, '');
    const parts = clean.split('/');
    const modId = parts[0] || 'purchase';
    const subId = parts[1] || 'dashboard';
    const tabId = parts[2] || '';

    this.activeModuleId = modId;
    this.activeSubmenuId = subId;
    this.activeTabId = tabId;

    const currentMod = NAV_HIERARCHY.find(m => m.id === modId) || NAV_HIERARCHY[0];
    let currentSub = currentMod.submenus.find(s => s.id === subId);
    if (!currentSub) {
      currentSub = currentMod.submenus[0];
    }
    const currentTabs = currentSub.tabs || [];
    const currentTabId = tabId || currentSub.defaultTab || currentTabs[0]?.id || '';

    container.innerHTML = `
      <header id="erp-top-nav-bar" class="bg-white select-none">
        <!-- Top Row: Brand, Welcome & User Actions -->
        <div class="h-14 px-4 sm:px-6 flex items-center justify-between border-b border-[#EBECF0]">
          <!-- Left: Logo & Company -->
          <div class="flex items-center gap-4">
            <a href="#/purchase/dashboard/rm-dashboard" class="flex items-center gap-2.5 group">
              <img src="${LOGO_COLOR}" alt="Devi Fisheries" class="h-8 w-auto object-contain" />
              <div class="hidden sm:flex flex-col">
                <span class="font-bold text-sm text-[#172B4D] tracking-tight group-hover:text-[#0284C7] transition-colors leading-tight">Devi Fisheries Limited</span>
                <span class="text-[9px] font-semibold text-[#0284C7] tracking-wider uppercase leading-tight mt-0.5">Powered By Camaroo</span>
              </div>
            </a>
          </div>

          <!-- Center: Welcome Text -->
          <div class="flex items-center gap-1.5 text-sm sm:text-base text-[#5E6C84]">
            <span>Welcome,</span>
            <span class="font-bold text-[#172B4D] text-base sm:text-lg">${ERP_DATA.currentUser.name}</span>
          </div>

          <!-- Right Controls: Settings, Tour, Notifications, User Profile -->
          <div class="flex items-center gap-2 sm:gap-3">
            <!-- Settings Top Navigation Button -->
            <a href="#/setup/user-setup/users" id="top-nav-settings-btn" class="p-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold text-[#0F172A] hover:text-[#0284C7] hover:bg-[#F0F9FF] rounded-full transition-colors flex items-center gap-1.5 cursor-pointer border border-[#DFE1E6]" title="System Settings">
              <svg class="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span class="hidden md:inline">Settings</span>
            </a>

            <!-- Tour Guide Button -->
            <button id="top-nav-tour-btn" class="p-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold text-[#0284C7] bg-[#F0F9FF] hover:bg-[#E0F2FE] rounded-full transition-colors flex items-center gap-1.5 cursor-pointer border border-[#BAE6FD]" title="Start Interactive Onboarding Tour">
              <svg class="w-3.5 h-3.5 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              <span class="hidden md:inline">Tour</span>
            </button>

            <!-- Notifications -->
            <div class="relative">
              <button id="top-nav-notifications-btn" class="p-2 text-[#5E6C84] hover:text-[#172B4D] hover:bg-[#EBECF0] rounded-full relative transition-colors cursor-pointer" title="Notifications">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                <span class="absolute top-1 right-1 w-2 h-2 bg-[#FF5630] rounded-full ring-2 ring-white"></span>
              </button>
              <div id="top-nav-notifications-dropdown" class="hidden absolute right-0 mt-1 w-80 bg-white rounded-md border border-[#DFE1E6] py-2 z-50 text-xs">
                <div class="px-3 py-1.5 font-bold text-[#172B4D] border-b border-[#EBECF0] flex justify-between items-center">
                  <span>Notifications (3 New)</span>
                  <span class="text-[10px] text-[#0284C7] cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div class="divide-y divide-[#EBECF0] max-h-64 overflow-y-auto">
                  <div class="p-3 hover:bg-[#FAFBFC] cursor-pointer">
                    <div class="flex items-center gap-1.5 text-[#0284C7] font-semibold text-[11px]">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#0284C7]"></span> RM Arrival #RMA-2026-00341
                    </div>
                    <div class="text-[#42526E] mt-0.5">Godavari Coastal 2,980 KG Vannamei Shrimp staged at Dock #1 awaiting QC approval.</div>
                    <div class="text-[10px] text-[#8993A4] mt-1">20 minutes ago</div>
                  </div>
                  <div class="p-3 hover:bg-[#FAFBFC] cursor-pointer">
                    <div class="flex items-center gap-1.5 text-[#36B37E] font-semibold text-[11px]">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#36B37E]"></span> QC Antibiotic Clearance
                    </div>
                    <div class="text-[#42526E] mt-0.5">LOT-2026-00128 Seabass passed all rapid nitrofurans & organoleptic panels.</div>
                    <div class="text-[10px] text-[#8993A4] mt-1">1 hour ago</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- User Menu Dropdown -->
            <div class="relative pl-1 border-l border-[#DFE1E6]">
              <button id="top-nav-user-menu-btn" class="flex items-center gap-2 p-1 rounded hover:bg-[#EBECF0] transition-colors cursor-pointer">
                <img src="${ERP_DATA.currentUser.avatar}" alt="Avatar" class="w-7 h-7 rounded-full object-cover ring-1 ring-[#DFE1E6]" />
                <div class="hidden xl:flex flex-col text-left">
                  <span class="text-xs font-semibold text-[#172B4D] leading-tight">${ERP_DATA.currentUser.name}</span>
                  <span class="text-[10px] text-[#5E6C84] leading-tight">${ERP_DATA.currentUser.role}</span>
                </div>
                <svg class="w-3.5 h-3.5 text-[#6B778C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>

              <div id="top-nav-user-dropdown" class="hidden absolute right-0 mt-1 w-64 bg-white rounded-md border border-[#DFE1E6] py-2 z-50 text-xs">
                <div class="px-3 py-2 border-b border-[#EBECF0]">
                  <div class="font-bold text-[#172B4D]">${ERP_DATA.currentUser.name}</div>
                  <div class="text-[11px] text-[#5E6C84]">${ERP_DATA.currentUser.email}</div>
                  <div class="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#F0F9FF] text-[#0284C7] font-semibold text-[10px] rounded mt-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#0284C7]"></span>
                    ${ERP_DATA.currentUser.role}
                  </div>
                </div>
                <div class="p-1">
                  <button id="top-nav-logout-btn" class="w-full text-left px-3 py-2 hover:bg-[#FFEBE6] text-[#BF2600] rounded font-medium flex items-center gap-2 transition-colors cursor-pointer">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 2: Primary Module Navigation Bar (20% Black #17191C) -->
        <div class="bg-[#17191C] px-4 sm:px-6 overflow-x-auto no-scrollbar flex items-center justify-between border-b border-[#26282D]">
          <nav class="flex items-center gap-1 py-2">
            ${NAV_HIERARCHY.map(mod => {
              const isModActive = mod.id === currentMod.id;
              const defaultHash = mod.submenus[0]?.tabs[0]?.hash || `/#/${mod.id}/${mod.submenus[0]?.id}`;
              return `
                <a 
                  href="${defaultHash}" 
                  class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${isModActive ? 'bg-[#0284C7] text-white font-bold' : 'text-[#94A3B8] hover:bg-white/10 hover:text-white'}"
                >
                  <span class="w-4 h-4 flex items-center justify-center shrink-0 ${isModActive ? 'text-white' : 'text-[#38BDF8]'}">${mod.icon}</span>
                  <span>${mod.title}</span>
                </a>
              `;
            }).join('')}
          </nav>
        </div>

        <!-- Row 3: Horizontal Submenus Bar (30% Sky Blue #0284C7) -->
        <div class="bg-[#0284C7] px-4 sm:px-6 border-b border-[#0369A1] flex items-center justify-between flex-wrap gap-2 min-h-[48px]">
          <!-- Submenus Horizontal Navigation Pills -->
          <div class="flex items-center gap-1.5 py-2 overflow-x-auto no-scrollbar">
            <span class="text-[11px] font-bold text-[#E0F2FE] uppercase tracking-wider mr-1.5">Section:</span>
            ${currentMod.submenus.map(sub => {
              const isSubActive = sub.id === currentSub.id;
              const subDefaultHash = sub.tabs[0]?.hash || `/#/${currentMod.id}/${sub.id}`;
              return `
                <a 
                  href="${subDefaultHash}" 
                  class="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${isSubActive ? 'bg-white text-[#0F172A] font-bold' : 'bg-[#0369A1] hover:bg-[#075985] text-white border border-white/20'}"
                >
                  ${sub.title}
                </a>
              `;
            }).join('')}
          </div>
        </div>
      </header>
    `;

    this.bindEvents();
  },

  bindEvents() {
    // Tour button
    const tourBtn = document.getElementById('top-nav-tour-btn');
    if (tourBtn) {
      tourBtn.addEventListener('click', () => {
        TourGuide.start();
      });
    }

    // Notifications Dropdown
    const notifBtn = document.getElementById('top-nav-notifications-btn');
    const notifDropdown = document.getElementById('top-nav-notifications-dropdown');
    if (notifBtn && notifDropdown) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifDropdown.classList.toggle('hidden');
      });
    }

    // User Menu Dropdown
    const userBtn = document.getElementById('top-nav-user-menu-btn');
    const userDropdown = document.getElementById('top-nav-user-dropdown');
    if (userBtn && userDropdown) {
      userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('hidden');
      });
    }

    // Close popups on click outside
    document.addEventListener('click', () => {
      if (notifDropdown) notifDropdown.classList.add('hidden');
      if (userDropdown) userDropdown.classList.add('hidden');
    });

    // Logout
    const logoutBtn = document.getElementById('top-nav-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        Toast.show('Session secured. Redirecting to Enterprise Gateway...', 'info');
        setTimeout(() => {
          window.location.hash = '#/login';
        }, 300);
      });
    }
  }
};
