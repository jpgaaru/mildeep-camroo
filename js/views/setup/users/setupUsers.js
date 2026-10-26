// Setup Module — User Management & ERP Personas
export const setupUsers = {
  // 2. USER MANAGEMENT TAB (ERP Users & Personas)
  // =========================================================================
  renderUserManagementTab(container) {
    const activeCompId = this.state.activeCompanyId;
    const scopedUsers = this.state.users.filter(u => u.companyId === activeCompId);

    container.innerHTML = `
      <div class="space-y-4">
        <!-- Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] shadow-none overflow-hidden">
          <div class="p-3 border-b border-[#EBECF0] flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-[#172B4D]">ERP User Directory</span>
              <span class="lozenge lozenge-inprogress text-[10px]">${scopedUsers.length} Records</span>
            </div>
            <div class="flex items-center gap-2">
              <button id="usr-copy-btn" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] cursor-pointer">Copy</button>
              <button id="usr-excel-btn" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] cursor-pointer">Excel</button>
              <button id="btn-add-user" class="btn-primary px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                <span>Register ERP User</span>
              </button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="erp-table text-xs w-full">
              <thead>
                <tr>
                  <th class="w-20">User ID</th>
                  <th>Full Name & Contact</th>
                  <th>ERP Persona / Role</th>
                  <th>Plant & Facility Access</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th class="text-center w-28">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#EBECF0]">
                ${scopedUsers.map(u => `
                  <tr class="hover:bg-[#FAFBFC]">
                    <td class="font-bold text-[#17191c] font-mono">${u.id}</td>
                    <td>
                      <div class="font-bold text-[#172B4D]">${u.name}</div>
                      <div class="text-[11px] text-[#5E6C84]">${u.email} • ${u.phone}</div>
                    </td>
                    <td>
                      <span class="lozenge ${u.role === 'System Administrator' ? 'lozenge-inprogress' : u.role === 'Quality Lab Inspector' ? 'lozenge-success' : u.role === 'Production Floor Manager' ? 'lozenge-purple' : 'lozenge-default'} text-[10px]">
                        ${u.role}
                      </span>
                    </td>
                    <td>
                      <div class="flex flex-wrap gap-1">
                        ${u.plantAccess.map(p => `<span class="lozenge lozenge-default text-[9.5px]">${p}</span>`).join('')}
                      </div>
                    </td>
                    <td>
                      <span class="lozenge ${u.status === 'Active' ? 'lozenge-success' : 'lozenge-danger'} text-[10px]">${u.status}</span>
                    </td>
                    <td class="text-[#5E6C84] text-[11px]">${u.lastLogin}</td>
                    <td class="text-center">
                      <div class="flex items-center justify-center gap-1">
                        <button data-action="edit-user" data-id="${u.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#0369A1] cursor-pointer" title="Edit User">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </button>
                        <button data-action="reset-pwd" data-id="${u.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#42526E] cursor-pointer" title="Reset Password">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
                        </button>
                        <button data-action="toggle-user-status" data-id="${u.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#BF2600] cursor-pointer" title="Toggle Status">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
                        </button>
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

    document.querySelectorAll('[data-action="edit-user"]').forEach(btn => {
      btn.onclick = () => {
        const u = this.state.users.find(x => x.id === btn.dataset.id);
        if (u) this.showEditUserModal(u);
      };
    });

    document.querySelectorAll('[data-action="reset-pwd"]').forEach(btn => {
      btn.onclick = () => {
        const u = this.state.users.find(x => x.id === btn.dataset.id);
        if (u) {
          Toast.show(`Password reset link dispatched to ${u.email}`, 'info', 'Password Reset Dispatched');
          this.logAudit('User Setup', `Generated password reset link for ${u.name}`);
        }
      };
    });

    document.querySelectorAll('[data-action="toggle-user-status"]').forEach(btn => {
      btn.onclick = () => {
        const u = this.state.users.find(x => x.id === btn.dataset.id);
        if (u) {
          u.status = u.status === 'Active' ? 'Suspended' : 'Active';
          this.logAudit('User Setup', `Changed user status of ${u.name} to ${u.status}`);
          this.saveState();
          Toast.show(`User ${u.name} is now ${u.status}`, 'success', 'Status Updated');
          this.renderUserManagementTab(container);
        }
      };
    });

    const addBtn = document.getElementById('btn-add-user');
    if (addBtn) addBtn.onclick = () => this.showAddUserModal();

    const copyBtn = document.getElementById('usr-copy-btn');
    if (copyBtn) copyBtn.onclick = () => Toast.show('User Directory copied to clipboard', 'info', 'Clipboard Export');

    const excelBtn = document.getElementById('usr-excel-btn');
    if (excelBtn) excelBtn.onclick = () => Toast.show('Generating Devi_Fisheries_Users.xlsx...', 'success', 'Excel Export Ready');
  },

  showAddUserModal() {
    this.showUserFormModal({
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      email: '',
      phone: '',
      companyId: this.state.activeCompanyId,
      companyName: this.state.companies.find(c => c.id === this.state.activeCompanyId)?.name || 'Devi Fisheries Limited',
      role: 'Procurement Officer',
      status: 'Active',
      mfa: 'Enabled',
      plantAccess: ['Unit-1 VSP (Harbour)'],
      lastLogin: 'Never'
    }, false);
  },

  showEditUserModal(user) {
    this.showUserFormModal(user, true);
  },

  showUserFormModal(user, isEdit = false) {
    const modalContent = `
      <form id="user-form" class="space-y-3 text-xs">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Full Name *</label>
            <input type="text" id="usr-name" required value="${user.name}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0369A1]" placeholder="e.g. Ramesh Varma" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Corporate Email *</label>
            <input type="email" id="usr-email" required value="${user.email}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0369A1]" placeholder="ramesh@devifisheries.com" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Mobile Phone</label>
            <input type="text" id="usr-phone" value="${user.phone}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="+91 98480 00000" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">ERP Persona / Role *</label>
            <select id="usr-role" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg">
              ${this.state.roles.map(r => `
                <option value="${r.name}" ${r.name === user.role ? 'selected' : ''}>${r.name}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Plant Access (Comma-separated)</label>
          <input type="text" id="usr-plants" value="${user.plantAccess.join(', ')}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="Unit-1 VSP (Harbour), Unit-2 Singarayakonda" />
        </div>

        <div class="flex items-center justify-end gap-2 pt-3 border-t border-[#EBECF0]">
          <button type="button" id="modal-usr-cancel" class="px-3.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs font-semibold text-[#42526E] hover:bg-[#FAFBFC] cursor-pointer">Cancel</button>
          <button type="submit" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">${isEdit ? 'Save User' : 'Register User'}</button>
        </div>
      </form>
    `;

    Modal.show(isEdit ? `Edit User: ${user.name}` : 'Register New ERP User', modalContent);

    document.getElementById('modal-usr-cancel').onclick = () => Modal.close();

    document.getElementById('user-form').onsubmit = (e) => {
      e.preventDefault();
      user.name = document.getElementById('usr-name').value.trim();
      user.email = document.getElementById('usr-email').value.trim();
      user.phone = document.getElementById('usr-phone').value.trim();
      user.role = document.getElementById('usr-role').value;
      const rawPlants = document.getElementById('usr-plants').value;
      user.plantAccess = rawPlants ? rawPlants.split(',').map(p => p.trim()).filter(Boolean) : ['Unit-1 VSP (Harbour)'];

      if (!isEdit) {
        this.state.users.push(user);
        this.logAudit('User Setup', `Registered user: ${user.name} (${user.email})`);
      } else {
        this.logAudit('User Setup', `Updated user: ${user.name}`);
      }

      this.saveState();
      Modal.close();
      Toast.show(isEdit ? `User ${user.name} updated` : `User ${user.name} registered`, 'success', 'Saved');
      const c = document.getElementById('setup-subpage-content');
      if (c) this.renderClientMasterStudio(c, 'user-management');
    };
  },

  // =========================================================================

};
