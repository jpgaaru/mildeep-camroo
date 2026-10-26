// Setup Module — Company Setup & Processing Plants
export const setupCompany = {
  // 1. COMPANY SETUP TAB (Fisheries & Plants)
  // =========================================================================
  renderCompanySetupTab(container) {
    const totalCompanies = this.state.companies.length;
    const totalPlants = this.state.companies.reduce((acc, c) => acc + c.plants.length, 0);

    container.innerHTML = `
      <div class="space-y-4">
        <!-- Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] shadow-none overflow-hidden">
          <div class="p-3 border-b border-[#EBECF0] flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-[#172B4D]">Companies & Processing Plants Registry</span>
              <span class="lozenge lozenge-inprogress text-[10px]">${this.state.companies.length} Records</span>
            </div>
            <div class="flex items-center gap-2">
              <button id="cmp-copy-btn" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] cursor-pointer">Copy</button>
              <button id="cmp-excel-btn" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] cursor-pointer">Excel</button>
              <button id="btn-add-company" class="btn-primary px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                <span>Add Company</span>
              </button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="erp-table text-xs w-full">
              <thead>
                <tr>
                  <th class="w-20">Code</th>
                  <th>Company Trade Name</th>
                  <th>Legal Entity & Licences</th>
                  <th>Jurisdiction</th>
                  <th>Assigned Processing Plants</th>
                  <th>Status</th>
                  <th class="text-center w-28">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#EBECF0]">
                ${this.state.companies.map(c => `
                  <tr class="hover:bg-[#FAFBFC]">
                    <td class="font-bold text-[#17191c] font-mono">${c.code}</td>
                    <td>
                      <div class="font-bold text-[#172B4D]">${c.name}</div>
                      <div class="text-[11px] text-[#5E6C84]">${c.contactEmail} • ${c.contactPhone}</div>
                    </td>
                    <td>
                      <div class="font-medium text-[#172B4D]">${c.legalName}</div>
                      <div class="text-[11px] font-mono text-[#5E6C84]">${c.eiaNumber} • ${c.fdaNumber}</div>
                    </td>
                    <td>
                      <span class="font-medium">${c.country}</span>
                      <span class="text-[#5E6C84] text-[11px]">(${c.currency})</span>
                    </td>
                    <td>
                      <div class="flex flex-wrap gap-1">
                        ${c.plants.map(p => `<span class="lozenge lozenge-default text-[9.5px]">${p}</span>`).join('')}
                      </div>
                    </td>
                    <td>
                      <span class="lozenge ${c.status === 'Active' ? 'lozenge-success' : 'lozenge-danger'} text-[10px]">${c.status}</span>
                    </td>
                    <td class="text-center">
                      <div class="flex items-center justify-center gap-1">
                        <button data-action="edit-company" data-id="${c.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#0369A1] cursor-pointer" title="Edit Company">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </button>
                        <button data-action="toggle-company-status" data-id="${c.id}" class="p-1 hover:bg-[#EBECF0] rounded ${c.status === 'Active' ? 'text-[#BF2600]' : 'text-[#006644]'} cursor-pointer" title="Toggle Status">
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

    document.querySelectorAll('[data-action="edit-company"]').forEach(btn => {
      btn.onclick = () => {
        const comp = this.state.companies.find(c => c.id === btn.dataset.id);
        if (comp) this.showEditCompanyModal(comp);
      };
    });

    document.querySelectorAll('[data-action="toggle-company-status"]').forEach(btn => {
      btn.onclick = () => {
        const comp = this.state.companies.find(c => c.id === btn.dataset.id);
        if (comp) {
          comp.status = comp.status === 'Active' ? 'Inactive' : 'Active';
          this.logAudit('Company Setup', `Toggled status for ${comp.name} to ${comp.status}`);
          this.saveState();
          Toast.show(`Company ${comp.name} is now ${comp.status}`, 'success', 'Status Updated');
          this.renderCompanySetupTab(container);
        }
      };
    });

    const addBtn = document.getElementById('btn-add-company');
    if (addBtn) addBtn.onclick = () => this.showAddCompanyModal();

    const copyBtn = document.getElementById('cmp-copy-btn');
    if (copyBtn) {
      copyBtn.onclick = () => Toast.show('Company Registry copied to clipboard', 'info', 'Clipboard Export');
    }

    const excelBtn = document.getElementById('cmp-excel-btn');
    if (excelBtn) {
      excelBtn.onclick = () => Toast.show('Generating Devi_Fisheries_Companies.xlsx...', 'success', 'Excel Export Ready');
    }
  },

  showAddCompanyModal() {
    this.showCompanyFormModal({
      id: `CMP-00${this.state.companies.length + 1}`,
      code: '',
      name: '',
      legalName: '',
      cin: '',
      taxId: '',
      eiaNumber: '',
      fdaNumber: '',
      bapNumber: '',
      country: 'India',
      currency: 'INR / USD',
      timezone: 'Asia/Kolkata (IST)',
      dateFormat: 'DD/MM/YYYY',
      contactEmail: '',
      contactPhone: '',
      address: '',
      status: 'Active',
      plants: ['Unit-1 VSP (Harbour)']
    }, false);
  },

  showEditCompanyModal(company) {
    this.showCompanyFormModal(company, true);
  },

  showCompanyFormModal(company, isEdit = false) {
    const modalContent = `
      <form id="company-form" class="space-y-3 text-xs">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Company Trade Name *</label>
            <input type="text" id="cmp-name" required value="${company.name}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0369A1]" placeholder="e.g. Devi Fisheries Limited" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Company Code *</label>
            <input type="text" id="cmp-code" required value="${company.code}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0369A1] font-mono" placeholder="e.g. DFL-IN" />
          </div>
        </div>

        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Legal Entity Name *</label>
          <input type="text" id="cmp-legal-name" required value="${company.legalName}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0369A1]" />
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">EIA Approval No.</label>
            <input type="text" id="cmp-eia" value="${company.eiaNumber || ''}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg font-mono" placeholder="EIA/AP/0458" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">US FDA Reg No.</label>
            <input type="text" id="cmp-fda" value="${company.fdaNumber || ''}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg font-mono" placeholder="FDA-REG-10928374" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">BAP 4-Star License</label>
            <input type="text" id="cmp-bap" value="${company.bapNumber || ''}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg font-mono" placeholder="BAP-P-4492" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Jurisdiction / Country</label>
            <input type="text" id="cmp-country" value="${company.country}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Currency</label>
            <input type="text" id="cmp-currency" value="${company.currency}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" />
          </div>
        </div>

        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Processing Plants (Comma-separated)</label>
          <input type="text" id="cmp-plants" value="${company.plants.join(', ')}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="Unit-1 VSP, Unit-2 Singarayakonda" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Contact Email</label>
            <input type="email" id="cmp-email" value="${company.contactEmail}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Phone</label>
            <input type="text" id="cmp-phone" value="${company.contactPhone}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" />
          </div>
        </div>

        <div class="flex items-center justify-end gap-2 pt-3 border-t border-[#EBECF0]">
          <button type="button" id="modal-cmp-cancel" class="px-3.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs font-semibold text-[#42526E] hover:bg-[#FAFBFC] cursor-pointer">Cancel</button>
          <button type="submit" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">${isEdit ? 'Save Changes' : 'Create Company'}</button>
        </div>
      </form>
    `;

    Modal.show(isEdit ? `Edit Company: ${company.name}` : 'Add Processing Entity', modalContent);

    document.getElementById('modal-cmp-cancel').onclick = () => Modal.close();

    document.getElementById('company-form').onsubmit = (e) => {
      e.preventDefault();
      company.name = document.getElementById('cmp-name').value.trim();
      company.code = document.getElementById('cmp-code').value.trim().toUpperCase();
      company.legalName = document.getElementById('cmp-legal-name').value.trim();
      company.eiaNumber = document.getElementById('cmp-eia').value.trim();
      company.fdaNumber = document.getElementById('cmp-fda').value.trim();
      company.bapNumber = document.getElementById('cmp-bap').value.trim();
      company.country = document.getElementById('cmp-country').value.trim();
      company.currency = document.getElementById('cmp-currency').value.trim();
      company.contactEmail = document.getElementById('cmp-email').value.trim();
      company.contactPhone = document.getElementById('cmp-phone').value.trim();
      const rawPlants = document.getElementById('cmp-plants').value;
      company.plants = rawPlants ? rawPlants.split(',').map(p => p.trim()).filter(Boolean) : ['Unit-1 VSP'];

      if (!isEdit) {
        this.state.companies.push(company);
        this.logAudit('Company Setup', `Added company: ${company.name} (${company.code})`);
      } else {
        this.logAudit('Company Setup', `Updated company: ${company.name}`);
      }

      this.saveState();
      Modal.close();
      Toast.show(isEdit ? `Company ${company.name} updated` : `Company ${company.name} created`, 'success', 'Saved');
      const c = document.getElementById('setup-subpage-content');
      if (c) this.renderClientMasterStudio(c, 'company-setup');
    };
  },

  // =========================================================================

};
