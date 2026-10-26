// Setup Module — Dynamic Module & Tab Studio
export const setupStudio = {
  // 4. DYNAMIC MODULE STUDIO TAB (33 Modules)
  // =========================================================================
  renderModuleStudioTab(container) {
    const filter = (this.moduleFilterTerm || '').toLowerCase();
    const modules = this.state.modulesConfig.filter(m => !filter || m.label.toLowerCase().includes(filter) || m.key.toLowerCase().includes(filter));

    container.innerHTML = `
      <div class="space-y-4">
        <div class="bg-white rounded-xl border border-[#DFE1E6] shadow-none overflow-hidden">
          <div class="p-3 border-b border-[#EBECF0] flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-[#172B4D]">Dynamic ERP Navigation & Module Studio</span>
              <span class="lozenge lozenge-inprogress text-[10px]">${this.state.modulesConfig.length} Modules</span>
            </div>
            <div class="flex items-center gap-2">
              <input type="text" id="mod-search-input" value="${this.moduleFilterTerm || ''}" placeholder="Filter modules..." class="px-2.5 py-1 border border-[#DFE1E6] rounded text-xs w-48 focus:outline-none focus:border-[#0369A1]" />
              <button id="btn-save-modules-config" class="btn-primary px-3 py-1 rounded text-xs font-bold cursor-pointer">
                Save Module Order & Labels
              </button>
            </div>
          </div>

          <div class="overflow-x-auto max-h-[640px]">
            <table class="erp-table text-xs w-full">
              <thead class="sticky top-0 bg-[#FAFBFC] z-10">
                <tr>
                  <th class="w-16 text-center">Order</th>
                  <th>Module Display Label</th>
                  <th>Module Key</th>
                  <th>Submenus</th>
                  <th>Sidebar Visibility</th>
                  <th>Authorized Personas</th>
                  <th>Landing Route</th>
                  <th class="text-center w-20">Move</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#EBECF0]">
                ${modules.map((m, idx) => `
                  <tr class="hover:bg-[#FAFBFC]">
                    <td class="text-center font-bold text-[#5E6C84]">${m.order}</td>
                    <td>
                      <input type="text" data-module-id="${m.id}" class="module-label-input font-bold text-[#172B4D] border border-transparent hover:border-[#DFE1E6] focus:border-[#0369A1] focus:bg-white rounded px-2 py-1 w-56 text-xs" value="${m.label}" />
                    </td>
                    <td class="font-mono text-[11px] text-[#5E6C84]">${m.key}</td>
                    <td>
                      <span class="lozenge lozenge-default text-[9.5px] font-mono">${m.submenusCount || 0} Submenus</span>
                    </td>
                    <td>
                      <label class="inline-flex items-center gap-1.5 cursor-pointer text-xs">
                        <input type="checkbox" data-mod-toggle="${m.id}" ${m.visible ? 'checked' : ''} class="rounded text-[#0369A1]" />
                        <span>${m.visible ? 'Visible' : 'Hidden'}</span>
                      </label>
                    </td>
                    <td>
                      <div class="flex flex-wrap gap-1 max-w-xs">
                        ${m.roles.slice(0, 2).map(r => `<span class="lozenge lozenge-default text-[9px]">${r}</span>`).join('')}
                        ${m.roles.length > 2 ? `<span class="lozenge lozenge-default text-[9px]">+${m.roles.length - 2}</span>` : ''}
                      </div>
                    </td>
                    <td class="font-mono text-[11px] text-[#0369A1] truncate max-w-[140px]">${m.route}</td>
                    <td class="text-center">
                      <div class="flex items-center justify-center gap-1">
                        <button data-action="move-up" data-index="${idx}" class="p-1 hover:bg-[#EBECF0] rounded text-[#42526E] cursor-pointer" ${idx === 0 ? 'disabled opacity-30' : ''} title="Move Up">▲</button>
                        <button data-action="move-down" data-index="${idx}" class="p-1 hover:bg-[#EBECF0] rounded text-[#42526E] cursor-pointer" ${idx === modules.length - 1 ? 'disabled opacity-30' : ''} title="Move Down">▼</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const searchInp = document.getElementById('mod-search-input');
    if (searchInp) {
      searchInp.oninput = (e) => {
        this.moduleFilterTerm = e.target.value;
        this.renderModuleStudioTab(container);
      };
    }

    document.querySelectorAll('[data-action="move-up"]').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.index);
        if (idx > 0) {
          const temp = this.state.modulesConfig[idx];
          this.state.modulesConfig[idx] = this.state.modulesConfig[idx - 1];
          this.state.modulesConfig[idx - 1] = temp;
          this.state.modulesConfig.forEach((m, i) => m.order = i + 1);
          this.renderModuleStudioTab(container);
        }
      };
    });

    document.querySelectorAll('[data-action="move-down"]').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.index);
        if (idx < this.state.modulesConfig.length - 1) {
          const temp = this.state.modulesConfig[idx];
          this.state.modulesConfig[idx] = this.state.modulesConfig[idx + 1];
          this.state.modulesConfig[idx + 1] = temp;
          this.state.modulesConfig.forEach((m, i) => m.order = i + 1);
          this.renderModuleStudioTab(container);
        }
      };
    });

    document.querySelectorAll('[data-mod-toggle]').forEach(cb => {
      cb.onchange = (e) => {
        const m = this.state.modulesConfig.find(x => x.id === cb.dataset.modToggle);
        if (m) m.visible = e.target.checked;
      };
    });

    const saveBtn = document.getElementById('btn-save-modules-config');
    if (saveBtn) {
      saveBtn.onclick = () => {
        document.querySelectorAll('.module-label-input').forEach(inp => {
          const mod = this.state.modulesConfig.find(m => m.id === inp.dataset.moduleId);
          if (mod) mod.label = inp.value.trim();
        });
        this.logAudit('Module Studio', 'Updated ERP module labels and order');
        this.state.hasDraftChanges = true;
        this.state.draftChangesCount++;
        this.saveState();
        Toast.show('Module configuration saved', 'success', 'Saved');
      };
    }
  },

  // =========================================================================
  // 5. DYNAMIC SUBMENU & TAB STUDIO TAB (All 33 Modules & 261 Submenus)
  // =========================================================================
  renderSubmenuTabStudioTab(container) {
    const selectedModKey = this.selectedModuleForSubmenuStudio || 'purchase';
    const submenus = this.state.submenusConfig[selectedModKey] || [];
    const filter = (this.submenuFilterTerm || '').toLowerCase();
    const filteredSubmenus = submenus.filter(sm => !filter || sm.title.toLowerCase().includes(filter) || sm.tabs.some(t => t.label.toLowerCase().includes(filter)));

    container.innerHTML = `
      <div class="space-y-4">
        <!-- Module Dropdown and Actions -->
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-[#172B4D]">Parent ERP Module:</span>
            <select id="studio-mod-select" class="px-2.5 py-1 border border-[#DFE1E6] rounded-lg text-xs font-bold text-[#172B4D] bg-white cursor-pointer max-w-xs truncate">
              ${this.state.modulesConfig.map(m => `
                <option value="${m.id}" ${m.id === selectedModKey ? 'selected' : ''}>${m.label} (${(this.state.submenusConfig[m.id] || []).length} Submenus)</option>
              `).join('')}
            </select>
            <input type="text" id="sm-search-input" value="${this.submenuFilterTerm || ''}" placeholder="Filter submenus..." class="px-2.5 py-1 border border-[#DFE1E6] rounded text-xs w-44 focus:outline-none focus:border-[#0369A1]" />
          </div>
          <button id="btn-add-submenu" class="btn-primary px-3 py-1 rounded text-xs font-bold flex items-center gap-1 cursor-pointer">
            <span>Add Submenu</span>
          </button>
        </div>

        <!-- Submenus & Tabs List -->
        <div class="space-y-3 max-h-[640px] overflow-y-auto pr-1">
          ${filteredSubmenus.length === 0 ? `
            <div class="bg-white rounded-xl border border-[#DFE1E6] p-6 text-center text-xs text-[#5E6C84]">
              No submenus matched filter. Click "+ Add Submenu" to create one.
            </div>
          ` : filteredSubmenus.map(sm => `
            <div class="bg-white rounded-xl border border-[#DFE1E6] shadow-none p-3">
              <div class="flex items-center justify-between pb-2 mb-2 border-b border-[#EBECF0]">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-xs text-[#172B4D]">${sm.title}</span>
                  <span class="font-mono text-[10px] text-[#5E6C84]">(${sm.id})</span>
                  <span class="lozenge lozenge-default text-[9.5px]">${sm.tabs.length} Tabs</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <button data-action="add-tab" data-sm-id="${sm.id}" class="px-2 py-0.5 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-[11px] font-bold text-[#0369A1] cursor-pointer">
                    + Add Tab
                  </button>
                  <button data-action="del-sm" data-sm-id="${sm.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#BF2600] cursor-pointer" title="Delete Submenu">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </div>

              <div class="overflow-x-auto">
                <table class="erp-table text-xs w-full">
                  <thead>
                    <tr>
                      <th class="w-12">#</th>
                      <th>Tab Label</th>
                      <th>Route Hash</th>
                      <th>Mapping Type</th>
                      <th>Badge Tag</th>
                      <th class="text-center w-16">Action</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#EBECF0]">
                    ${sm.tabs.map((tab, idx) => `
                      <tr class="hover:bg-[#FAFBFC]">
                        <td class="font-bold text-[#5E6C84]">${idx + 1}</td>
                        <td class="font-bold text-[#172B4D]">${tab.label}</td>
                        <td class="font-mono text-[11px] text-[#0369A1]">${tab.route}</td>
                        <td>
                          <span class="lozenge ${tab.type === 'dynamic-form' ? 'lozenge-purple' : tab.type === 'custom-list' ? 'lozenge-warning' : 'lozenge-default'} text-[9.5px]">
                            ${tab.type}
                          </span>
                        </td>
                        <td>${tab.badge ? `<span class="lozenge lozenge-default text-[9.5px] font-mono">${tab.badge}</span>` : '—'}</td>
                        <td class="text-center">
                          <button data-action="del-tab" data-sm-id="${sm.id}" data-tab-id="${tab.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#BF2600] cursor-pointer" title="Delete Tab">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const modSel = document.getElementById('studio-mod-select');
    if (modSel) {
      modSel.onchange = (e) => {
        this.selectedModuleForSubmenuStudio = e.target.value;
        this.renderSubmenuTabStudioTab(container);
      };
    }

    const smSearch = document.getElementById('sm-search-input');
    if (smSearch) {
      smSearch.oninput = (e) => {
        this.submenuFilterTerm = e.target.value;
        this.renderSubmenuTabStudioTab(container);
      };
    }

    document.querySelectorAll('[data-action="add-tab"]').forEach(btn => {
      btn.onclick = () => this.showAddTabModal(selectedModKey, btn.dataset.smId);
    });

    document.querySelectorAll('[data-action="del-sm"]').forEach(btn => {
      btn.onclick = () => {
        if (confirm('Delete this submenu and all its tabs?')) {
          this.state.submenusConfig[selectedModKey] = this.state.submenusConfig[selectedModKey].filter(s => s.id !== btn.dataset.smId);
          const mod = this.state.modulesConfig.find(m => m.id === selectedModKey);
          if (mod) mod.submenusCount = this.state.submenusConfig[selectedModKey].length;
          this.saveState();
          Toast.show('Submenu deleted', 'info', 'Deleted');
          this.renderSubmenuTabStudioTab(container);
        }
      };
    });

    document.querySelectorAll('[data-action="del-tab"]').forEach(btn => {
      btn.onclick = () => {
        const sm = this.state.submenusConfig[selectedModKey]?.find(s => s.id === btn.dataset.smId);
        if (sm) {
          sm.tabs = sm.tabs.filter(t => t.id !== btn.dataset.tabId);
          this.saveState();
          Toast.show('Tab removed', 'info', 'Deleted');
          this.renderSubmenuTabStudioTab(container);
        }
      };
    });

    const addSmBtn = document.getElementById('btn-add-submenu');
    if (addSmBtn) addSmBtn.onclick = () => this.showAddSubmenuModal(selectedModKey);
  },

  showAddSubmenuModal(modKey) {
    const modalContent = `
      <form id="sm-form" class="space-y-3 text-xs">
        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Submenu Title *</label>
          <input type="text" id="sm-title" required class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="e.g. Inward Inspection" />
        </div>
        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Submenu Slug *</label>
          <input type="text" id="sm-slug" required class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg font-mono" placeholder="inward-qc" />
        </div>
        <div class="flex items-center justify-end gap-2 pt-3 border-t border-[#EBECF0]">
          <button type="button" id="modal-sm-cancel" class="px-3.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs font-semibold text-[#42526E] hover:bg-[#FAFBFC] cursor-pointer">Cancel</button>
          <button type="submit" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">Create Submenu</button>
        </div>
      </form>
    `;

    Modal.show('Add Submenu', modalContent);
    document.getElementById('modal-sm-cancel').onclick = () => Modal.close();

    document.getElementById('sm-form').onsubmit = (e) => {
      e.preventDefault();
      const title = document.getElementById('sm-title').value.trim();
      const id = document.getElementById('sm-slug').value.trim().toLowerCase();

      if (!this.state.submenusConfig[modKey]) this.state.submenusConfig[modKey] = [];
      this.state.submenusConfig[modKey].push({ id, title, tabs: [] });

      const mod = this.state.modulesConfig.find(m => m.id === modKey);
      if (mod) mod.submenusCount = this.state.submenusConfig[modKey].length;

      this.logAudit('Submenu Studio', `Created submenu "${title}" in ${modKey}`);
      this.saveState();
      Modal.close();
      Toast.show(`Submenu "${title}" created`, 'success', 'Saved');
      const c = document.getElementById('setup-subpage-content');
      if (c) this.renderClientMasterStudio(c, 'submenu-tab-studio');
    };
  },

  showAddTabModal(modKey, smId) {
    const modalContent = `
      <form id="tab-form" class="space-y-3 text-xs">
        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Tab Label *</label>
          <input type="text" id="tab-label" required class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="e.g. Lot Weighment Register" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Tab Slug *</label>
            <input type="text" id="tab-slug" required class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg font-mono" placeholder="lot-weighment" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Mapping Type</label>
            <select id="tab-type" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg">
              <option value="system">System Page</option>
              <option value="dynamic-form">Dynamic Form</option>
              <option value="custom-list">Custom List</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Badge Tag</label>
          <input type="text" id="tab-badge" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="e.g. 5 New" />
        </div>
        <div class="flex items-center justify-end gap-2 pt-3 border-t border-[#EBECF0]">
          <button type="button" id="modal-tab-cancel" class="px-3.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs font-semibold text-[#42526E] hover:bg-[#FAFBFC] cursor-pointer">Cancel</button>
          <button type="submit" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">Add Tab</button>
        </div>
      </form>
    `;

    Modal.show('Add Tab', modalContent);
    document.getElementById('modal-tab-cancel').onclick = () => Modal.close();

    document.getElementById('tab-form').onsubmit = (e) => {
      e.preventDefault();
      const label = document.getElementById('tab-label').value.trim();
      const id = document.getElementById('tab-slug').value.trim().toLowerCase();
      const type = document.getElementById('tab-type').value;
      const badge = document.getElementById('tab-badge').value.trim();

      const sm = this.state.submenusConfig[modKey]?.find(s => s.id === smId);
      if (sm) {
        sm.tabs.push({ id, label, route: `#/${modKey}/${smId}/${id}`, type, badge });
        this.saveState();
        Modal.close();
        Toast.show(`Tab "${label}" added`, 'success', 'Saved');
        const c = document.getElementById('setup-subpage-content');
        if (c) this.renderClientMasterStudio(c, 'submenu-tab-studio');
      }
    };
  },

  // =========================================================================

};
