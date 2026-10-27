// Setup Module — Roles & Permissions Matrix
export const setupRoles = {
  // 3. ROLES & PERMISSIONS MATRIX TAB
  // =========================================================================
  renderRolesPermissionsTab(container) {
    const selectedRole = this.state.roles.find(r => r.id === this.selectedRoleForMatrix) || this.state.roles[0];
    const isAdmin = selectedRole.id === 'ROLE-ADMIN';

    const erpModulesList = [
      { id: 'res-purchase', label: 'Raw Material Purchase (Arrivals, Weighment, Rates, Farmer Bills)' },
      { id: 'res-preprocessing', label: 'Pre-Processing (De-heading, Peeling, Soaking, Grading)' },
      { id: 'res-quality', label: 'Quality Control (Antibiotic Lab, Testing Protocols, Clearance)' },
      { id: 'res-production', label: 'Production Control (Floor Balance, Freezing, Conversion)' },
      { id: 'res-coldstore', label: 'Coldstore Operations (Intake, Chambers, Pallet Balance, Dispatch)' },
      { id: 'res-inventory', label: 'Inventory & Stores (Purchase Orders, GRN Receipt, Issues)' },
      { id: 'res-sales', label: 'Sales & Exports (Contracts, Shipping Documentation, Finance)' },
      { id: 'res-reports', label: 'Reports & Analytics (Yield Reports, Production BI, Valuation)' },
      { id: 'res-setup', label: 'Settings & Master Data (Plants, Species, Grades, Form Schemas)' }
    ];

    container.innerHTML = `
      <div class="space-y-4">
        <!-- Permissions Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] shadow-none overflow-hidden">
          <div class="p-3 border-b border-[#EBECF0] flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-[#172B4D]">Permissions Matrix for:</span>
              <select id="role-matrix-selector" class="px-2.5 py-1 border border-[#DFE1E6] rounded-lg text-xs font-bold text-[#172B4D] bg-white cursor-pointer hover:border-[#0369A1] focus:outline-none">
                ${this.state.roles.map(r => `
                  <option value="${r.id}" ${r.id === selectedRole.id ? 'selected' : ''}>${r.name} ${r.isProtected ? '(Protected)' : `(${r.usersCount} Users)`}</option>
                `).join('')}
              </select>
              ${isAdmin ? `<span class="lozenge lozenge-inprogress text-[10px]">Full Access Locked</span>` : ''}
            </div>

            <div class="flex items-center gap-2">
              ${!isAdmin ? `
                <button id="btn-perm-grant-all" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#006644] cursor-pointer">Grant All</button>
                <button id="btn-perm-readonly" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] cursor-pointer">Read Only</button>
              ` : ''}
              <button id="btn-save-permissions" class="btn-primary px-3 py-1 rounded text-xs font-bold cursor-pointer">Save Permissions</button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="erp-table text-xs w-full">
              <thead>
                <tr>
                  <th>ERP Module / Entity</th>
                  <th class="text-center w-16">View</th>
                  <th class="text-center w-16">Create</th>
                  <th class="text-center w-16">Edit</th>
                  <th class="text-center w-16">Delete</th>
                  <th class="text-center w-16">Approve</th>
                  <th class="text-center w-16">Reject</th>
                  <th class="text-center w-16">Export</th>
                  <th class="text-center w-16">Print</th>
                  <th class="text-center w-16">Manage</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#EBECF0]">
                ${erpModulesList.map(res => {
                  const checkedAttr = isAdmin ? 'checked disabled' : 'checked';
                  return `
                    <tr class="hover:bg-[#FAFBFC]">
                      <td class="font-bold text-[#172B4D]">${res.label}</td>
                      <td class="text-center"><input type="checkbox" class="perm-chk perm-view" ${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" ${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" ${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" ${isAdmin ? 'checked disabled' : ''} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" ${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" ${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" ${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" ${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" ${isAdmin ? 'checked disabled' : ''} /></td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const roleSelector = document.getElementById('role-matrix-selector');
    if (roleSelector) {
      roleSelector.onchange = (e) => {
        this.selectedRoleForMatrix = e.target.value;
        this.renderRolesPermissionsTab(container);
      };
    }

    const grantAllBtn = document.getElementById('btn-perm-grant-all');
    if (grantAllBtn) {
      grantAllBtn.onclick = () => {
        document.querySelectorAll('.perm-chk:not([disabled])').forEach(cb => cb.checked = true);
        Toast.show(`Granted full access for ${selectedRole.name}`, 'info', 'Preset Applied');
      };
    }

    const readOnlyBtn = document.getElementById('btn-perm-readonly');
    if (readOnlyBtn) {
      readOnlyBtn.onclick = () => {
        document.querySelectorAll('.perm-chk:not([disabled])').forEach(cb => cb.checked = false);
        document.querySelectorAll('.perm-view:not([disabled])').forEach(cb => cb.checked = true);
        Toast.show(`Set Read-Only access for ${selectedRole.name}`, 'info', 'Preset Applied');
      };
    }

    const saveBtn = document.getElementById('btn-save-permissions');
    if (saveBtn) {
      saveBtn.onclick = () => {
        this.logAudit('Roles & Permissions', `Updated permissions matrix for ${selectedRole.name}`);
        this.state.hasDraftChanges = true;
        this.state.draftChangesCount++;
        this.saveState();
        Toast.show(`Permissions saved for ${selectedRole.name}`, 'success', 'Saved');
      };
    }
  },

  // =========================================================================

};
