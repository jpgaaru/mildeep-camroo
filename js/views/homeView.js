// AquaOps Home Welcome Board Controller
// Clean, uncluttered entrance launchpad:
// - Serene coastal sunrise hero banner with "Welcome to Camaroo ERP"
// - Quick Workflow Shortcuts grid with perfectly aligned responsive layout
// - My Permissible Roles compact section with Manage Settings shortcut

import { Environment } from '../framework/Environment.js';

export const HomeView = {
  render(containerId) {
    const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!container) return;

    const isS01 = Environment.isSitemap01();

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
        hash: "#/purchase/operations/bookings"
      },
      {
        title: "Dock Inward Arrivals",
        module: "PURCHASE",
        iconColor: "#0284C7",
        bgColor: "#E0F2FE",
        borderColor: "#BAE6FD",
        iconSvg: `<svg class="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 17H5a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v9m-4 4h4m4-4h1a2 2 0 002-2v-3.5a1.5 1.5 0 00-1.5-1.5H18V6a2 2 0 00-2-2h-3m-3 13a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
        hash: "#/purchase/operations/rm-arrivals"
      },
      {
        title: "RM Received Trackid",
        module: "PRE-PROCESSING",
        iconColor: "#6366F1",
        bgColor: "#EEF2FF",
        borderColor: "#E0E7FF",
        iconSvg: `<svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
        hash: "#/preprocessing/floor-operations/rm-received"
      },
      {
        title: "Chemical Consumption",
        module: "PRE-PROCESSING",
        iconColor: "#8B5CF6",
        bgColor: "#F5F3FF",
        borderColor: "#EDE9FE",
        iconSvg: `<svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`,
        hash: "#/preprocessing/chemical-inventory/chemicals-consumption"
      },
      {
        title: "Antibiotic ELISA Screening",
        module: "QUALITY CONTROL",
        iconColor: "#10B981",
        bgColor: "#ECFDF5",
        borderColor: "#D1FAE5",
        iconSvg: `<svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/></svg>`,
        hash: "#/quality/lab/antibiotic-testing"
      },
      {
        title: "Cold Storage Pallet Intake",
        module: "COLD STORAGE",
        iconColor: "#06B6D4",
        bgColor: "#ECFEFF",
        borderColor: "#CFFAFE",
        iconSvg: `<svg class="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 3v18m0-18l-3 3m3-3l3 3m-3 15l-3-3m3 3l3-3M3 12h18m-18 0l3-3m-3 3l3 3m15-3l-3-3m3 3l3 3"/></svg>`,
        hash: "#/coldstore/inward-intake/production-intake"
      },
      {
        title: "Export Sales Contracts",
        module: "SALES & EXPORT",
        iconColor: "#D97706",
        bgColor: "#FEF3C7",
        borderColor: "#FDE68A",
        iconSvg: `<svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg>`,
        hash: "#/sales/contracts-pricing"
      },
      {
        title: "System Master Setup",
        module: "CONFIGURATION",
        iconColor: "#64748B",
        bgColor: "#F1F5F9",
        borderColor: "#E2E8F0",
        iconSvg: `<svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
        hash: "#/setup/client-master-setup/company-setup"
      }
    ];

    const roles = [
      { module: "Purchase", role: "Full Access", hash: "#/purchase/dashboard/rm-dashboard" },
      { module: "Pre-Processing", role: "Full Access", hash: "#/preprocessing/dashboard/floor-overview" },
      { module: "Quality Control", role: "Full Access", hash: "#/quality/dashboard/qc-overview" },
      { module: "Production", role: "Full Access", hash: "#/production/dashboard/overview" },
      { module: "Cold Storage", role: "Full Access", hash: "#/coldstore/dashboard/overview" },
      { module: "Inventory", role: "Full Access", hash: "#/inventory/dashboard/overview" },
      { module: "Sales & Export", role: "Full Access", hash: "#/sales/dashboard/overview" },
      { module: "Configuration", role: "Super Admin", hash: "#/setup/client-master-setup/roles-permissions" }
    ];

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in w-full pb-10">
        
        <!-- 1. Serene Coastal Sunrise Hero Banner -->
        ${isS01 ? `
          <!-- Sitemap 01: Welcome Devi Fisheries Banner with 20% Increased Height & mildeep-camaroo-illustration.png -->
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
              <!-- Main Title -->
              <h1 class="text-3xl sm:text-4xl md:text-[38px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
                Welcome Devi Fisheries
              </h1>
            </div>
          </div>
        ` : `
          <!-- Sitemap 02 (Canonical Superadmin): Original Banner -->
          <div 
            class="relative rounded-2xl md:rounded-3xl border border-[#BAE6FD]/80 p-7 sm:p-9 md:p-12 overflow-hidden shadow-xs w-full"
            style="background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 45%, #D8F4F8 100%);"
          >
            <!-- Artistic Coastal Vector Graphic Background -->
            <div class="absolute right-0 bottom-0 top-0 w-2/3 md:w-1/2 pointer-events-none select-none overflow-hidden">
              <svg viewBox="0 0 420 200" fill="none" preserveAspectRatio="xMaxYMax meet" class="w-full h-full opacity-90">
                <defs>
                  <linearGradient id="sunGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#FEF08A" stop-opacity="0.95" />
                    <stop offset="100%" stop-color="#FDE047" stop-opacity="0.75" />
                  </linearGradient>
                  <linearGradient id="backHills" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#BAE6FD" stop-opacity="0.65" />
                    <stop offset="100%" stop-color="#93C5FD" stop-opacity="0.3" />
                  </linearGradient>
                  <linearGradient id="frontHills" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#E0F2FE" stop-opacity="0.9" />
                    <stop offset="100%" stop-color="#BAE6FD" stop-opacity="0.6" />
                  </linearGradient>
                </defs>

                <!-- Warm Pastel Sun -->
                <circle cx="370" cy="75" r="48" fill="url(#sunGlow)" />

                <!-- Flying Birds Silhouettes -->
                <path d="M310 88 Q315 82 320 88 Q325 82 330 88" fill="none" stroke="#64748B" stroke-width="1.6" stroke-linecap="round" opacity="0.4" />
                <path d="M328 104 Q332 99 336 104 Q340 99 344 104" fill="none" stroke="#64748B" stroke-width="1.6" stroke-linecap="round" opacity="0.4" />

                <!-- Layered Soft Rolling Waves / Coastal Dunes -->
                <path d="M120 200 Q240 100 370 145 L420 200 Z" fill="url(#backHills)" />
                <path d="M40 200 Q190 120 340 165 Q380 180 420 200 Z" fill="url(#frontHills)" />
                <path d="M0 200 Q140 160 270 185 Q350 200 420 200 Z" fill="#F0F9FF" opacity="0.95" />
              </svg>
            </div>

            <!-- Banner Foreground Content -->
            <div class="relative z-10 max-w-2xl">
              <!-- Main Title -->
              <h1 class="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                Welcome to Camaroo ERP
              </h1>
            </div>
          </div>
        `}

        <!-- 2. Quick Workflow Shortcuts Section -->
        <div class="w-full">
          <h2 class="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight mb-4">
            Quick Workflow Shortcuts
          </h2>

          <!-- Clean Uncluttered Responsive Grid (4 columns desktop, 2 tablet, 1 mobile) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
            ${shortcuts.map(s => `
              <a 
                href="${s.hash}" 
                class="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <!-- Squircle Icon Box -->
                  <div 
                    class="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105"
                    style="background-color: ${s.bgColor}; border: 1px solid ${s.borderColor};"
                  >
                    ${s.iconSvg}
                  </div>

                  <!-- Category Tag -->
                  <span class="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    ${s.module}
                  </span>

                  <!-- Shortcut Title -->
                  <h3 class="text-sm sm:text-[14.5px] font-bold text-[#0F172A] group-hover:text-[#006C7A] transition-colors leading-snug">
                    ${s.title}
                  </h3>
                </div>
              </a>
            `).join('')}
          </div>
        </div>

        <!-- 3. My Permissible Roles Section -->
        <div class="w-full pt-2">
          <div class="flex items-center justify-between gap-3 mb-3.5">
            <h2 class="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight">
              My Permissible Roles
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
                class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs flex items-center justify-between gap-3 hover:border-slate-300 hover:shadow-xs transition-all group cursor-pointer"
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
