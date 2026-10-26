// Setup Module — Master Domain Controller & Orchestrator
import { getInitialStudioState, STUDIO_STORAGE_KEY } from './state/setupState.js';
import { setupCompany } from './company/setupCompany.js';
import { setupUsers } from './users/setupUsers.js';
import { setupRoles } from './roles/setupRoles.js';
import { setupStudio } from './studio/setupStudio.js';
import { setupForms } from './forms/setupForms.js';
import { setupLogs } from './logs/setupLogs.js';

export const SetupView = {
  state: getInitialStudioState(),
  activeTab: 'company-setup',
  selectedRoleForMatrix: 'ROLE-PROCUREMENT',
  selectedModuleForSubmenuStudio: 'purchase',
  selectedFormForBuilder: 'rm-purchase-inward',
  moduleFilterTerm: '',
  submenuFilterTerm: '',

  saveState() {
    try {
      localStorage.setItem(STUDIO_STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save studio state', e);
    }
  },

  render(containerId, subPage = 'company-setup', activeHash = '#/setup/client-master-setup/company-setup') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div id="setup-subpage-content"></div>
    `;

    const subContainer = document.getElementById('setup-subpage-content');

    const clean = (activeHash || '').replace(/^#\/?/, '').replace(/^\/+/, '');
    const parts = clean.split('/');
    let tabId = 'company-setup';
    if (parts[1] === 'client-master-setup') {
      tabId = parts[2] || subPage || 'company-setup';
    } else if (parts[1]) {
      tabId = parts[2] || parts[1] || subPage || 'company-setup';
    } else {
      tabId = subPage || 'company-setup';
    }
    this.activeTab = tabId;

    this.renderClientMasterStudio(subContainer, tabId);
  },

  renderClientMasterStudio(container, tabId) {
    const activeCompany = this.state.companies.find(c => c.id === this.state.activeCompanyId) || this.state.companies[0];

    container.innerHTML = `
      <div class="space-y-4">
        <!-- Top Multi-Tenant Context Toolbar -->
        <div class="bg-white border border-[#DFE1E6] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-none">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center font-bold text-xs">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs font-semibold text-[#5E6C84]">Scope:</span>
              <span class="text-xs font-bold text-[#172B4D]">${activeCompany.name}</span>
              <span class="lozenge lozenge-success text-[10px]">${activeCompany.status}</span>
              <span class="lozenge lozenge-default text-[10px] font-mono">${activeCompany.code}</span>
              <span class="text-xs text-[#5E6C84]">(${activeCompany.plants.length} Processing Plants)</span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <select id="company-scope-switcher" class="px-2.5 py-1 border border-[#DFE1E6] rounded-lg text-xs font-bold text-[#172B4D] bg-white cursor-pointer hover:border-[#0369A1] focus:outline-none">
              ${this.state.companies.map(c => `
                <option value="${c.id}" ${c.id === this.state.activeCompanyId ? 'selected' : ''}>${c.name}</option>
              `).join('')}
            </select>

            ${this.state.hasDraftChanges ? `
              <span class="lozenge lozenge-warning text-[10px] font-semibold">${this.state.draftChangesCount} Drafts</span>
              <button id="btn-quick-publish" class="px-2.5 py-1 bg-[#0369A1] hover:bg-[#075985] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer">
                Publish Live
              </button>
            ` : `
              <span class="lozenge lozenge-success text-[10px] font-semibold">${this.state.publishedVersion} Live</span>
            `}
          </div>
        </div>

        <!-- Studio Tab Content Container -->
        <div id="studio-active-tab-container"></div>
      </div>
    `;

    const switcher = document.getElementById('company-scope-switcher');
    if (switcher) {
      switcher.onchange = (e) => {
        this.state.activeCompanyId = e.target.value;
        this.saveState();
        Toast.show(`Switched scope to: ${this.state.companies.find(c => c.id === e.target.value)?.name}`, 'info', 'Scope Switched');
        this.renderClientMasterStudio(container, tabId);
      };
    }

    const quickPublishBtn = document.getElementById('btn-quick-publish');
    if (quickPublishBtn) {
      quickPublishBtn.onclick = () => this.handlePublishConfiguration();
    }

    const tabContainer = document.getElementById('studio-active-tab-container');
    switch (tabId) {
      case 'company-setup':
        this.renderCompanySetupTab(tabContainer);
        break;
      case 'user-management':
        this.renderUserManagementTab(tabContainer);
        break;
      case 'roles-permissions':
        this.renderRolesPermissionsTab(tabContainer);
        break;
      case 'module-studio':
        this.renderModuleStudioTab(tabContainer);
        break;
      case 'submenu-tab-studio':
        this.renderSubmenuTabStudioTab(tabContainer);
        break;
      case 'field-form-builder':
        this.renderFieldFormBuilderTab(tabContainer);
        break;
      case 'audit-logs':
        this.renderAuditLogsTab(tabContainer);
        break;
      default:
        this.renderCompanySetupTab(tabContainer);
        break;
    }
  },

  // =========================================================================

};

// Compose all feature domain submodules into unified SetupView
Object.assign(
  SetupView,
  setupCompany,
  setupUsers,
  setupRoles,
  setupStudio,
  setupForms,
  setupLogs
);

if (typeof window !== 'undefined') {
  window.SetupView = SetupView;
}
