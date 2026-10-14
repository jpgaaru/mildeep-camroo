// AquaOps Home & Enterprise Command Center Controller
// Personalized Welcome, RBAC Permissible Access, Role Cockpits & Admin Studio

import { HOME_DATA } from '../data/homeData.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';

export const HomeView = {
  render(containerId, subPage = 'command-center', activeHash = '#/home/welcome/command-center') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 1. Elevate & Sync the Top-Right Primary Action Button inline with Page Title
    this.updateHeaderAction(subPage);

    // 2. Dispatch to specific subpage view
    switch (subPage) {
      // Welcome & Cockpit
      case 'command-center':
        this.renderCommandCenter(container);
        break;
      case 'quick-actions':
        this.renderQuickActions(container);
        break;

      // Access & Permissible Roles
      case 'my-permissions':
        this.renderMyPermissions(container);
        break;
      case 'role-matrix':
        this.renderRoleMatrix(container);
        break;

      // Role-Based Dashboards
      case 'executive':
        this.renderRoleCockpit(container, 'executive');
        break;
      case 'plant-manager':
        this.renderRoleCockpit(container, 'plantManager');
        break;
      case 'procurement-head':
        this.renderRoleCockpit(container, 'procurementHead');
        break;
      case 'qc-director':
        this.renderRoleCockpit(container, 'qcDirector');
        break;

      // Admin & Role Controls
      case 'user-allocation':
        this.renderUserAllocation(container);
        break;
      case 'delegation':
        this.renderShiftDelegation(container);
        break;

      default:
        this.renderCommandCenter(container);
        break;
    }
  },

  // =========================================================================
  // TOP-RIGHT PRIMARY ACTION BUTTON SYNC (AquaOps Standard)
  // =========================================================================
  updateHeaderAction(tabName) {
    const actionContainer = document.getElementById('section-action-btn-container');
    if (!actionContainer) return;

    switch (tabName) {
      case 'command-center':
        actionContainer.innerHTML = `
          <button id="btn-home-refresh-pulse" class="btn-secondary px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer hover:bg-slate-100 transition-all">
            <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            <span>Sync Enterprise Pulse</span>
          </button>
        `;
        document.getElementById('btn-home-refresh-pulse')?.addEventListener('click', () => {
          Toast.show('Enterprise multi-plant telemetry synchronized across 3 facilities.', 'info');
        });
        break;

      case 'quick-actions':
        actionContainer.innerHTML = `
          <button id="btn-home-customize-shortcuts" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Add Custom Shortcut</span>
          </button>
        `;
        document.getElementById('btn-home-customize-shortcuts')?.addEventListener('click', () => this.openAddShortcutModal());
        break;

      case 'my-permissions':
        actionContainer.innerHTML = `
          <button id="btn-home-download-creds" class="btn-secondary px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer hover:bg-slate-100 transition-all">
            <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span>Export Security Token</span>
          </button>
        `;
        document.getElementById('btn-home-download-creds')?.addEventListener('click', () => {
          Toast.show('User authorization audit token exported (SHA-256 signed).', 'success');
        });
        break;

      case 'role-matrix':
        actionContainer.innerHTML = `
          <button id="btn-home-edit-matrix" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Define New Role</span>
          </button>
        `;
        document.getElementById('btn-home-edit-matrix')?.addEventListener('click', () => this.openCreateRoleModal());
        break;

      case 'user-allocation':
        actionContainer.innerHTML = `
          <button id="btn-home-allocate-user" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
            <span>Allocate User Role</span>
          </button>
        `;
        document.getElementById('btn-home-allocate-user')?.addEventListener('click', () => this.openAllocateUserModal());
        break;

      case 'delegation':
        actionContainer.innerHTML = `
          <button id="btn-home-new-delegation" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>New Shift Delegation</span>
          </button>
        `;
        document.getElementById('btn-home-new-delegation')?.addEventListener('click', () => this.openShiftDelegationModal());
        break;

      case 'executive':
      case 'plant-manager':
      case 'procurement-head':
      case 'qc-director':
        actionContainer.innerHTML = `
          <button id="btn-home-export-report" class="btn-secondary px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer hover:bg-slate-100 transition-all">
            <svg class="w-3.5 h-3.5 text-[#006C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span>Export Persona Summary</span>
          </button>
        `;
        document.getElementById('btn-home-export-report')?.addEventListener('click', () => {
          Toast.show('Exported executive role digest (PDF).', 'success');
        });
        break;

      default:
        actionContainer.innerHTML = '';
        break;
    }
  },

  // =========================================================================
  // VIEW 1: WELCOME COMMAND CENTER
  // =========================================================================
  renderCommandCenter(container) {
    const user = HOME_DATA.currentUser;
    const pulse = HOME_DATA.enterprisePulse;
    const shortcuts = HOME_DATA.quickShortcuts;
    const plants = HOME_DATA.plants;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <!-- 1. Executive Personalized Identity & Shift Context Banner -->
        <div class="bg-gradient-to-r from-[#006C7A] to-[#0A2540] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div class="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <svg class="w-64 h-64 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 12h3v8h14v-8h3L12 2z"/>
            </svg>
          </div>

          <div class="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold text-teal-100 mb-2.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>${user.activeShift}</span>
                <span>•</span>
                <span>Dock: ${user.dockTemp}</span>
              </div>
              <h2 class="text-2xl font-bold tracking-tight">Good day, ${user.name}</h2>
              <p class="text-sm text-teal-100/90 mt-1">
                ${user.title} • <strong>${user.facility}</strong>
              </p>
            </div>

            <!-- Quick Plant Switcher Pill -->
            <div class="flex items-center gap-2 bg-black/20 backdrop-blur-md p-1.5 rounded-xl border border-white/10 text-xs">
              ${plants.map(p => `
                <button 
                  class="px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${p.active ? 'bg-white text-[#006C7A] shadow-xs' : 'text-white/80 hover:text-white hover:bg-white/10'}"
                  data-plant-id="${p.id}"
                >
                  ${p.name.split(' ')[1]} (${p.code})
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- 2. Enterprise Cross-Department Health Pulse (4 Cards) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Pulse 1: Today's RM Intake -->
          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4.5 shadow-xs relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-[#006C7A]"></div>
            <div class="flex items-center justify-between text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
              <span>Today's RM Intake</span>
              <span class="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                ${pulse.arrivalsTrend}
              </span>
            </div>
            <div class="text-2xl font-bold text-[#0F172A] tracking-tight">${pulse.todayArrivalsKg.toLocaleString()} <span class="text-xs font-medium text-[#64748B]">kg</span></div>
            <p class="text-xs text-[#64748B] mt-1.5">Docked across 5 procurement vehicles</p>
          </div>

          <!-- Pulse 2: Active Floor WIP -->
          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4.5 shadow-xs relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
            <div class="flex items-center justify-between text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
              <span>Active Floor WIP</span>
              <span class="inline-flex items-center text-xs font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                ${pulse.wipTrend}
              </span>
            </div>
            <div class="text-2xl font-bold text-[#0F172A] tracking-tight">${pulse.activeFloorWipKg.toLocaleString()} <span class="text-xs font-medium text-[#64748B]">kg</span></div>
            <p class="text-xs text-[#64748B] mt-1.5">In deheading, grading, and peeling lines</p>
          </div>

          <!-- Pulse 3: Cold Storage Chamber Capacity -->
          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4.5 shadow-xs relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
            <div class="flex items-center justify-between text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
              <span>Cold Storage Chamber</span>
              <span class="inline-flex items-center text-xs font-bold text-cyan-700 bg-cyan-50 px-1.5 py-0.5 rounded">
                ${pulse.coldstoreFreeTons} Tons Free
              </span>
            </div>
            <div class="text-2xl font-bold text-[#0F172A] tracking-tight">${pulse.coldstoreCapacityPct}% <span class="text-xs font-medium text-[#64748B]">utilized</span></div>
            <p class="text-xs text-[#64748B] mt-1.5">FIFO monitored at -20.5°C</p>
          </div>

          <!-- Pulse 4: Pending Approvals -->
          <div class="bg-white rounded-xl border border-[#E2E8F0] p-4.5 shadow-xs relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
            <div class="flex items-center justify-between text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
              <span>Pending Approvals</span>
              <span class="inline-flex items-center text-xs font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                Action Req
              </span>
            </div>
            <div class="text-2xl font-bold text-[#0F172A] tracking-tight">${pulse.pendingApprovalsCount} <span class="text-xs font-medium text-[#64748B]">items</span></div>
            <p class="text-xs text-[#64748B] mt-1.5">Supplier bills, POs & lot release</p>
          </div>
        </div>

        <!-- 3. Quick Action Launchpad (Cross-Module Shortcuts Grid) -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-4">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Enterprise Quick Action Launchpad</h3>
              <p class="text-xs text-[#64748B] mt-0.5">High-frequency actions across Purchase, Pre-Processing, QC, and Coldstore</p>
            </div>
            <a href="#/home/welcome/quick-actions" class="text-xs font-semibold text-[#006C7A] hover:underline">
              View All Shortcuts →
            </a>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            ${shortcuts.map(s => `
              <a 
                href="${s.hash}" 
                class="flex flex-col items-center text-center p-3 rounded-xl border border-[#E2E8F0] hover:border-[#006C7A] hover:shadow-xs transition-all bg-[#F8FAFC]/50 hover:bg-white group cursor-pointer"
              >
                <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-2 transition-transform group-hover:scale-110 ${s.color}">
                  ${s.icon}
                </div>
                <div class="text-xs font-bold text-[#0F172A] line-clamp-1 group-hover:text-[#006C7A]">${s.title}</div>
                <div class="text-[10px] text-[#64748B] mt-0.5 line-clamp-1">${s.module}</div>
              </a>
            `).join('')}
          </div>
        </div>

        <!-- 4. Pending Executive Decisions & Multi-Plant Telemetry Row -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Pending Approvals Stream (2 cols) -->
          <div class="lg:col-span-2 bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
            <div class="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-4">
              <div>
                <h3 class="text-sm font-bold text-[#0F172A]">Pending Executive Decisions & Approvals</h3>
                <p class="text-xs text-[#64748B] mt-0.5">Vouchers and export clearance lots awaiting your signature</p>
              </div>
              <span class="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                ${pulse.pendingApprovalsList.length} Immediate
              </span>
            </div>

            <div class="space-y-3">
              ${pulse.pendingApprovalsList.map(a => `
                <div class="p-3.5 rounded-lg border border-[#E2E8F0] hover:border-slate-300 flex items-center justify-between gap-4 bg-slate-50/50">
                  <div class="flex items-center gap-3">
                    <span class="px-2 py-1 rounded text-[10px] font-bold ${a.type === 'PURCHASE' ? 'bg-sky-50 text-sky-700' : a.type === 'CHEMICAL' ? 'bg-purple-50 text-purple-700' : 'bg-emerald-50 text-emerald-700'}">
                      ${a.type}
                    </span>
                    <div>
                      <div class="text-xs font-bold text-[#0F172A]">${a.label}</div>
                      <div class="text-[11px] text-[#64748B]">Amount / Spec: <strong>${a.amount}</strong></div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <button class="btn-primary px-3 py-1 text-xs rounded-lg font-bold" onclick="alert('Item ${a.id} approved successfully.')">
                      Approve
                    </button>
                    <button class="btn-secondary px-2.5 py-1 text-xs rounded-lg" onclick="alert('Item ${a.id} sent for supervisor review.')">
                      Review
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Multi-Plant Status Card (1 col) -->
          <div class="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-4">
                <h3 class="text-sm font-bold text-[#0F172A]">Multi-Plant Node Status</h3>
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>

              <div class="space-y-3.5">
                ${plants.map(p => `
                  <div class="p-3 rounded-lg border ${p.active ? 'border-[#006C7A]/30 bg-teal-50/30' : 'border-slate-200 bg-slate-50/50'}">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold text-[#0F172A]">${p.name}</span>
                      <span class="text-[10px] font-bold ${p.active ? 'text-teal-700 bg-teal-100/60' : 'text-slate-600 bg-slate-200'} px-1.5 py-0.5 rounded">
                        ${p.code}
                      </span>
                    </div>
                    <div class="text-xs text-[#64748B] mt-1 flex items-center gap-1.5">
                      <span class="w-1.5 h-1.5 rounded-full ${p.active ? 'bg-emerald-500' : 'bg-slate-400'}"></span>
                      ${p.dockStatus}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="pt-4 border-t border-[#E2E8F0] mt-4">
              <a href="#/home/access-roles/my-permissions" class="block w-full py-2 text-xs font-semibold text-center text-[#006C7A] hover:bg-teal-50 rounded-lg transition-colors">
                View My Role & Access Permissions →
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // VIEW 2: QUICK ACTIONS HUB
  // =========================================================================
  renderQuickActions(container) {
    const shortcuts = HOME_DATA.quickShortcuts;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <div class="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Enterprise Quick Action Launchpad</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Click any shortcut to trigger high-frequency operational workflows across all 11 ERP modules</p>
            </div>
            <div class="relative w-64">
              <input 
                type="text" 
                id="search-shortcuts" 
                placeholder="Filter shortcuts..." 
                class="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#006C7A]"
              />
              <svg class="w-4 h-4 text-slate-400 absolute left-2.5 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            ${shortcuts.map(s => `
              <a 
                href="${s.hash}" 
                class="p-4 rounded-xl border border-[#E2E8F0] hover:border-[#006C7A] hover:shadow-xs transition-all bg-white hover:bg-slate-50/50 flex items-start gap-3.5 group cursor-pointer"
              >
                <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform ${s.color}">
                  ${s.icon}
                </div>
                <div>
                  <span class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">${s.module}</span>
                  <h4 class="text-xs font-bold text-[#0F172A] group-hover:text-[#006C7A] mt-0.5">${s.title}</h4>
                  <p class="text-xs text-[#64748B] mt-1 leading-relaxed">${s.desc}</p>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // VIEW 3: MY PERMISSIBLE ACCESS (RBAC OVERVIEW)
  // =========================================================================
  renderMyPermissions(container) {
    const user = HOME_DATA.currentUser;
    const permissions = HOME_DATA.modulePermissions;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <!-- Active User Identity & Security Clearance Card -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-[#006C7A] text-white flex items-center justify-center font-bold text-xl shadow-xs">
                YP
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-base font-bold text-[#0F172A]">${user.name}</h3>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                    ${user.role}
                  </span>
                </div>
                <p class="text-xs text-[#64748B] mt-0.5">${user.title} • ${user.facility}</p>
                <div class="flex items-center gap-3 text-[11px] text-[#64748B] mt-1">
                  <span>Security Clearance: <strong class="text-emerald-700">${user.securityClearance}</strong></span>
                  <span>•</span>
                  <span>Session: ${user.sessionExpiry}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <a href="#/home/admin-controls/user-allocation" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
                Manage Role Allocations →
              </a>
            </div>
          </div>
        </div>

        <!-- 11 Modules Permissible Access Matrix -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div class="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">My Departmental Access & Authorization Matrix</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Role-Based Access Control (RBAC) privileges granted to your corporate account</p>
            </div>
            <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              ● 8 of 8 Assigned Modules Active
            </span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-[#0F172A]">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                <tr>
                  <th class="py-3 px-4">ERP Module</th>
                  <th class="py-3 px-4">Clearance Level</th>
                  <th class="py-3 px-4">Permitted Operations & Actions</th>
                  <th class="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0]">
                ${permissions.map(p => `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="py-3 px-4 font-bold text-[#0F172A]">${p.moduleName}</td>
                    <td class="py-3 px-4">
                      <span class="inline-flex px-2 py-0.5 rounded text-[11px] font-bold ${p.level === 'SUPER_ADMIN' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-teal-50 text-teal-700 border border-teal-200'}">
                        ${p.level}
                      </span>
                    </td>
                    <td class="py-3 px-4">
                      <div class="flex flex-wrap gap-1.5">
                        ${p.permissions.map(perm => `
                          <span class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                            ${perm}
                          </span>
                        `).join('')}
                      </div>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ${p.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // VIEW 4: RBAC ROLE MATRIX
  // =========================================================================
  renderRoleMatrix(container) {
    const matrix = HOME_DATA.rbacMatrix;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div class="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Enterprise Role-Based Access Control (RBAC) Matrix</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Statutory division of responsibilities across multi-plant units for USFDA/BRCGS compliance</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-[#0F172A]">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                <tr>
                  <th class="py-3 px-4">Role Title</th>
                  <th class="py-3 px-4">Assigned Users</th>
                  <th class="py-3 px-4">Purchase</th>
                  <th class="py-3 px-4">Pre-Processing</th>
                  <th class="py-3 px-4">Quality Lab</th>
                  <th class="py-3 px-4">Production</th>
                  <th class="py-3 px-4">Coldstore</th>
                  <th class="py-3 px-4 text-center">Admin Controls</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0]">
                ${matrix.map(m => `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="py-3 px-4">
                      <div class="font-bold text-[#0F172A]">${m.roleName}</div>
                      <div class="text-[11px] text-[#64748B] max-w-xs mt-0.5">${m.description}</div>
                    </td>
                    <td class="py-3 px-4 font-mono font-bold text-slate-700">${m.usersCount} Users</td>
                    <td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${m.purchaseAccess.includes('Full') ? 'bg-teal-50 text-teal-700' : 'bg-slate-100 text-slate-600'}">${m.purchaseAccess}</span></td>
                    <td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${m.preprocAccess.includes('Full') ? 'bg-teal-50 text-teal-700' : 'bg-slate-100 text-slate-600'}">${m.preprocAccess}</span></td>
                    <td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${m.qcAccess.includes('Full') ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}">${m.qcAccess}</span></td>
                    <td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${m.productionAccess.includes('Full') ? 'bg-teal-50 text-teal-700' : 'bg-slate-100 text-slate-600'}">${m.productionAccess}</span></td>
                    <td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${m.coldstoreAccess.includes('Full') ? 'bg-teal-50 text-teal-700' : 'bg-slate-100 text-slate-600'}">${m.coldstoreAccess}</span></td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${m.adminControls === 'Yes' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-500'}">
                        ${m.adminControls}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // VIEW 5: ROLE-BASED COCKPITS (EXECUTIVE, PLANT HEAD, PROCUREMENT, QC)
  // =========================================================================
  renderRoleCockpit(container, cockpitKey) {
    const cockpit = HOME_DATA.roleCockpits[cockpitKey];
    if (!cockpit) return;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <!-- Persona Header Card -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs flex items-center justify-between">
          <div>
            <h3 class="text-base font-bold text-[#0F172A]">${cockpit.title}</h3>
            <p class="text-xs text-[#64748B] mt-0.5">${cockpit.subtitle}</p>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
            Tailored Persona Lens
          </span>
        </div>

        <!-- Role KPIs Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${cockpit.kpis.map(k => `
            <div class="bg-white rounded-xl border border-[#E2E8F0] p-4.5 shadow-xs relative overflow-hidden">
              <div class="absolute top-0 left-0 w-1 h-full bg-[#006C7A]"></div>
              <div class="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">${k.label}</div>
              <div class="text-2xl font-bold text-[#0F172A] tracking-tight">${k.val}</div>
              <p class="text-xs text-[#64748B] mt-1.5 ${k.dir === 'up' ? 'text-emerald-600 font-semibold' : k.dir === 'down' ? 'text-rose-600 font-semibold' : ''}">${k.sub}</p>
            </div>
          `).join('')}
        </div>

        <!-- Persona Operational Highlights -->
        <div class="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
          <h4 class="text-sm font-bold text-[#0F172A] pb-3 border-b border-[#E2E8F0] mb-3">Key Operational Bulletins</h4>
          <ul class="space-y-2.5">
            ${cockpit.highlights.map(h => `
              <li class="flex items-start gap-2.5 text-xs text-slate-700">
                <span class="w-1.5 h-1.5 rounded-full bg-[#006C7A] mt-1.5 flex-shrink-0"></span>
                <span class="leading-relaxed">${h}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // VIEW 6: ADMIN CONTROLS & USER ALLOCATION
  // =========================================================================
  renderUserAllocation(container) {
    const users = HOME_DATA.userAllocations;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div class="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">User Role & Permissible Delegation Allocation</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Grant module permissions and designate permissible plant responsibilities</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-[#0F172A]">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                <tr>
                  <th class="py-3 px-4">User Officer</th>
                  <th class="py-3 px-4">Department</th>
                  <th class="py-3 px-4">Allocated Role</th>
                  <th class="py-3 px-4">Assigned Facility</th>
                  <th class="py-3 px-4">Access Scope</th>
                  <th class="py-3 px-4 text-center">Status</th>
                  <th class="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0]">
                ${users.map(u => `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="py-3 px-4">
                      <div class="font-bold text-[#0F172A]">${u.name}</div>
                      <div class="text-[11px] text-slate-500 font-mono">${u.email}</div>
                    </td>
                    <td class="py-3 px-4 font-medium text-slate-700">${u.department}</td>
                    <td class="py-3 px-4">
                      <span class="inline-flex px-2 py-0.5 rounded text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                        ${u.role}
                      </span>
                    </td>
                    <td class="py-3 px-4 text-slate-600">${u.assignedPlant}</td>
                    <td class="py-3 px-4 font-mono text-[11px] text-indigo-700">${u.accessLevel}</td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ${u.status}
                      </span>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <button class="text-xs font-semibold text-[#006C7A] hover:underline cursor-pointer" onclick="alert('Editing permissions for ${u.name}')">
                        Modify
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // VIEW 7: SHIFT DELEGATION
  // =========================================================================
  renderShiftDelegation(container) {
    const delegations = HOME_DATA.shiftDelegations;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div class="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-[#0F172A]">Temporary Shift Authority Delegations</h3>
              <p class="text-xs text-[#64748B] mt-0.5">Authorizing provisional sign-off powers during night shifts or travel periods</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-[#0F172A]">
              <thead class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                <tr>
                  <th class="py-3 px-4">Delegation ID</th>
                  <th class="py-3 px-4">Principal → Designee</th>
                  <th class="py-3 px-4">Delegated Scope</th>
                  <th class="py-3 px-4">Shift & Window</th>
                  <th class="py-3 px-4">Approval Reason</th>
                  <th class="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E2E8F0]">
                ${delegations.map(d => `
                  <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="py-3 px-4 font-mono font-bold text-[#0F172A]">${d.id}</td>
                    <td class="py-3 px-4">
                      <div class="font-bold text-[#0F172A]">${d.delegatedFrom}</div>
                      <div class="text-[11px] text-teal-700 font-medium">→ ${d.delegatedTo}</div>
                    </td>
                    <td class="py-3 px-4 font-medium text-slate-800">${d.scope}</td>
                    <td class="py-3 px-4">
                      <div class="font-medium text-slate-800">${d.shift}</div>
                      <div class="text-[11px] text-slate-500">${d.effectiveDate} to ${d.expiryDate}</div>
                    </td>
                    <td class="py-3 px-4 text-slate-600">${d.approvalReason}</td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${d.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'}">
                        ${d.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // MODALS
  // =========================================================================
  openAllocateUserModal() {
    Modal.open({
      title: "Allocate Permissible Roles & Plant Assignment",
      size: "lg",
      content: `
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Select Employee Officer</label>
              <select class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white">
                <option>M. Manikanta (Factory Operations)</option>
                <option>B. Venkatesh (RM Procurement)</option>
                <option>Dr. K. Srimannarayana (Quality Assurance)</option>
                <option>Laxmi Narayana (Floor Supervisor)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Assign Primary Role</label>
              <select class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white">
                <option>Plant Operations Head</option>
                <option>Procurement Lead</option>
                <option>QC & Lab Director</option>
                <option>Floor Supervisor</option>
                <option>Accounts & Finance Controller</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Assigned Processing Plant</label>
              <select class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white">
                <option>DFL Unit-1 (Visakhapatnam HQ)</option>
                <option>DFL Unit-2 (Kakinada)</option>
                <option>DFL Unit-3 (Pydibhimavaram)</option>
                <option>All Multi-Plant Units (Corporate)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Delegation Clearance Scope</label>
              <select class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white">
                <option>Full Departmental Authority</option>
                <option>Shift-Level Operational Approval</option>
                <option>Read-Only Telemetry View</option>
              </select>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        { label: "Cancel", type: "secondary" },
        { label: "Save Role Allocation", type: "primary" }
      ]
    });

    document.getElementById('modal-btn-1')?.addEventListener('click', () => {
      Modal.close();
      Toast.show('Permissible role allocated and synchronized with active session tokens.', 'success');
    });

    document.getElementById('modal-btn-0')?.addEventListener('click', () => Modal.close());
  },

  openShiftDelegationModal() {
    Modal.open({
      title: "Create Temporary Shift Authority Delegation",
      size: "lg",
      content: `
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Principal Approver</label>
              <input type="text" value="Dr. Y.S. Prasad (Super Admin)" class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-slate-50" readonly />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Designee Officer</label>
              <select class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white">
                <option>M. Manikanta (Plant Operations Head)</option>
                <option>Laxmi Narayana (Floor Supervisor)</option>
                <option>M. Nagesh (Senior QC Chemist)</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Delegation Scope</label>
              <input type="text" value="Pre-Processing Shift Deheading Sign-Off & Transfer Gate Pass" class="w-full text-xs p-2 border border-slate-200 rounded-lg" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Valid For Shift</label>
              <select class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white">
                <option>Night Shift (22:00 - 06:00 IST)</option>
                <option>Afternoon Shift (14:00 - 22:00 IST)</option>
                <option>48-Hour Travel Window</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Statutory Reason</label>
            <textarea class="w-full text-xs p-2 border border-slate-200 rounded-lg" rows="2" placeholder="e.g. Covering night shift emergency inter-unit tote transfer to Unit-3"></textarea>
          </div>
        </div>
      `,
      footerButtons: [
        { label: "Cancel", type: "secondary" },
        { label: "Authorize Delegation", type: "primary" }
      ]
    });

    document.getElementById('modal-btn-1')?.addEventListener('click', () => {
      Modal.close();
      Toast.show('Shift delegation authorized with electronic audit signature.', 'success');
    });

    document.getElementById('modal-btn-0')?.addEventListener('click', () => Modal.close());
  },

  openAddShortcutModal() {
    Modal.open({
      title: "Pin Custom Workflow to Quick Launchpad",
      size: "md",
      content: `
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Shortcut Title</label>
            <input type="text" placeholder="e.g. Issue Store Indent" class="w-full text-xs p-2 border border-slate-200 rounded-lg" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Target Module Link</label>
            <select class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white">
              <option>Inventory Store Indents (#/inventory/requisitions)</option>
              <option>Coldstore Dispatch Container (#/coldstore/dispatch-outward)</option>
              <option>Sales Contract Register (#/sales/contracts-pricing)</option>
              <option>Antibiotic ELISA Screening (#/quality/lab/antibiotic-testing)</option>
            </select>
          </div>
        </div>
      `,
      footerButtons: [
        { label: "Cancel", type: "secondary" },
        { label: "Pin Shortcut", type: "primary" }
      ]
    });

    document.getElementById('modal-btn-1')?.addEventListener('click', () => {
      Modal.close();
      Toast.show('Custom workflow pinned to your personal Command Center.', 'success');
    });

    document.getElementById('modal-btn-0')?.addEventListener('click', () => Modal.close());
  },

  openCreateRoleModal() {
    Modal.open({
      title: "Define New RBAC Operational Role",
      size: "md",
      content: `
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Role Title</label>
            <input type="text" placeholder="e.g. Export Logistics Auditor" class="w-full text-xs p-2 border border-slate-200 rounded-lg" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Inherit Privileges From</label>
            <select class="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white">
              <option>Plant Operations Head (Modified)</option>
              <option>Procurement Lead (Modified)</option>
              <option>QC Inspector (Custom)</option>
            </select>
          </div>
        </div>
      `,
      footerButtons: [
        { label: "Cancel", type: "secondary" },
        { label: "Save Role Definition", type: "primary" }
      ]
    });

    document.getElementById('modal-btn-1')?.addEventListener('click', () => {
      Modal.close();
      Toast.show('New RBAC role created in organization catalog.', 'success');
    });

    document.getElementById('modal-btn-0')?.addEventListener('click', () => Modal.close());
  }
};
