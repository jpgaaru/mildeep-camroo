// AquaOps Home Welcome Board Controller
// Clean, uncluttered entrance launchpad with high-contrast user context,
// direct workflow shortcuts, and permissible role access directory (Zero stats/telemetry)

import { ERP_DATA } from '../data/mockData.js';

export const HomeView = {
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
        desc: "Farmer contracts & count rates",
        module: "Purchase",
        icon: "📋",
        color: "bg-teal-50 text-teal-700 border-teal-200",
        hash: "#/purchase/operations/bookings"
      },
      {
        title: "Dock Inward Arrivals",
        desc: "Weighbridge & truck intake",
        module: "Purchase",
        icon: "🚚",
        color: "bg-sky-50 text-sky-700 border-sky-200",
        hash: "#/purchase/operations/rm-arrivals"
      },
      {
        title: "RM Received Trackid",
        desc: "Floor batch & vehicle intake",
        module: "Pre-Processing",
        icon: "⚡",
        color: "bg-indigo-50 text-indigo-700 border-indigo-200",
        hash: "#/preprocessing/floor-operations/rm-received"
      },
      {
        title: "Chemical Consumption",
        desc: "Daily STPP dosing & ledger",
        module: "Pre-Processing",
        icon: "🧪",
        color: "bg-purple-50 text-purple-700 border-purple-200",
        hash: "#/preprocessing/chemical-inventory/chemicals-consumption"
      },
      {
        title: "Antibiotic ELISA Screening",
        desc: "Lab pre-harvest lot testing",
        module: "Quality Control",
        icon: "🔬",
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        hash: "#/quality/lab/antibiotic-testing"
      },
      {
        title: "Cold Storage Pallet Intake",
        desc: "Carton intake & chamber allocation",
        module: "Cold Storage",
        icon: "❄️",
        color: "bg-cyan-50 text-cyan-700 border-cyan-200",
        hash: "#/coldstore/inward-intake/production-intake"
      },
      {
        title: "Export Sales Contracts",
        desc: "International buyers & pricing",
        module: "Sales & Export",
        icon: "🚢",
        color: "bg-amber-50 text-amber-700 border-amber-200",
        hash: "#/sales/contracts-pricing"
      },
      {
        title: "System Master Setup",
        desc: "Plants, roles, & company profiles",
        module: "Configuration",
        icon: "⚙️",
        color: "bg-slate-100 text-slate-700 border-slate-300",
        hash: "#/setup/client-master-setup/company-setup"
      }
    ];

    const permissibleModules = [
      { name: "Purchase", role: "Full Access", desc: "Bookings, Arrivals, Supplier Bills & Payments" },
      { name: "Pre-Processing", role: "Full Access", desc: "Receiving, Tasks, Chemical Stock & Traceability" },
      { name: "Quality Control", role: "Full Access", desc: "Lab Testing, Antibiotic Screening & QC Audits" },
      { name: "Production", role: "Full Access", desc: "Soaking, Freezing Tunnels & Anti-Dumping" },
      { name: "Cold Storage", role: "Full Access", desc: "Inward Intake, Store Ops & Container Dispatch" },
      { name: "Inventory", role: "Full Access", desc: "Requisitions, Procurement & Material Issues" },
      { name: "Sales & Export", role: "Full Access", desc: "Buyer Master, Contracts & Freight Realization" },
      { name: "Configuration", role: "Super Admin", desc: "Organization Profiles, RBAC Roles & Audit Logs" }
    ];

    container.innerHTML = `
      <div class="space-y-5 animate-fade-in max-w-7xl mx-auto pb-8">
        <!-- 1. Crisp User Context & Active Shift Banner (High Contrast, Clean Solid Card) -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-xl bg-[#004D57] text-[#4FCFE0] font-bold text-sm flex items-center justify-center shrink-0 border border-[#006C7A]/30 shadow-xs">
              YP
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h2 class="text-base font-bold text-[#0F172A]">${ERP_DATA.currentUser.name}</h2>
                <span class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                  ${ERP_DATA.currentUser.role}
                </span>
                <span class="px-2 py-0.5 rounded text-[10.5px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  DFL Unit-1 Visakhapatnam (HQ)
                </span>
              </div>
              <p class="text-xs text-[#64748B] mt-1 flex items-center gap-2 flex-wrap">
                <span class="inline-flex items-center gap-1.5 font-medium text-[#334155]">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  <span>Active Shift: Shift A (06:00 - 14:00 IST)</span>
                </span>
                <span class="text-slate-300 hidden sm:inline">•</span>
                <span class="text-[#64748B]">Devi Fisheries Limited — Enterprise Seafood Processing & Export</span>
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <a href="#/setup/client-master-setup/roles-permissions" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#006C7A] border border-[#CBD5E1] transition-all flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              <span>Security & Roles</span>
            </a>
          </div>
        </div>

        <!-- 2. Quick Workflow Shortcuts (Clean Uncluttered Launchpad) -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-3 border-b border-[#F1F5F9] mb-4">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Quick Workflow Shortcuts</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Direct 1-click links to the most frequent operational workflows across departments</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            ${shortcuts.map(s => `
              <a 
                href="${s.hash}" 
                class="p-3.5 rounded-xl border border-[#E2E8F0] hover:border-[#006C7A] hover:shadow-xs transition-all bg-white hover:bg-slate-50/70 flex items-start gap-3 group cursor-pointer"
              >
                <div class="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform ${s.color} border">
                  ${s.icon}
                </div>
                <div class="min-w-0 flex-1">
                  <span class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">${s.module}</span>
                  <h4 class="text-xs font-bold text-[#0F172A] group-hover:text-[#006C7A] mt-0.5 truncate">${s.title}</h4>
                  <p class="text-[11px] text-[#64748B] mt-0.5 leading-snug line-clamp-1">${s.desc}</p>
                </div>
              </a>
            `).join('')}
          </div>
        </div>

        <!-- 3. My Permissible Roles & Module Access Directory -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#F1F5F9] mb-4">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">My Permissible Roles & Access Authorization</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Overview of active department privileges granted to your account</p>
            </div>
            <a href="#/setup/client-master-setup/roles-permissions" class="text-xs font-semibold text-[#006C7A] hover:underline flex items-center gap-1">
              <span>Manage Roles & Privileges in Settings</span>
              <span>→</span>
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            ${permissibleModules.map(m => `
              <div class="p-3 rounded-lg border border-[#E2E8F0] bg-slate-50/50">
                <div class="flex items-center justify-between gap-2 mb-1">
                  <span class="text-xs font-bold text-[#0F172A]">${m.name}</span>
                  <span class="inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold ${m.role === 'Super Admin' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-teal-50 text-teal-700 border border-teal-200'}">
                    ${m.role}
                  </span>
                </div>
                <p class="text-[11px] text-[#64748B] leading-tight">${m.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
};
