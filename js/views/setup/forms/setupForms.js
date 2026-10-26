// Setup Module — Dynamic Field & Form Builder
export const setupForms = {
  // 6. DYNAMIC FIELD & FORM BUILDER TAB
  // =========================================================================
  renderFieldFormBuilderTab(container) {
    const selectedFormKey = this.selectedFormForBuilder || 'rm-purchase-inward';
    const formConfig = this.state.formsConfig[selectedFormKey] || Object.values(this.state.formsConfig)[0];
    const persona = this.state.previewPersona || 'System Administrator';

    container.innerHTML = `
      <div class="space-y-4">
        <!-- Toolbar -->
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-[#172B4D]">Target Operational Form:</span>
            <select id="builder-form-select" class="px-2.5 py-1 border border-[#DFE1E6] rounded-lg text-xs font-bold text-[#172B4D] bg-white cursor-pointer">
              ${Object.keys(this.state.formsConfig).map(k => `
                <option value="${k}" ${k === selectedFormKey ? 'selected' : ''}>${this.state.formsConfig[k].name}</option>
              `).join('')}
            </select>
          </div>

          <div class="flex items-center gap-2">
            <button id="btn-export-schema-json" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] cursor-pointer">Export Schema JSON</button>
            <button id="btn-save-form-schema" class="btn-primary px-3 py-1 rounded text-xs font-bold cursor-pointer">Save Schema</button>
          </div>
        </div>

        <!-- Split Studio: Canvas & Live Preview -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <!-- Left Panel: Fields List -->
          <div class="lg:col-span-5 space-y-3">
            <div class="bg-white border border-[#DFE1E6] rounded-xl p-3 shadow-none">
              <div class="flex items-center justify-between border-b border-[#EBECF0] pb-2 mb-2.5">
                <span class="text-xs font-bold text-[#172B4D]">Configured Form Fields</span>
                <button id="btn-add-form-field" class="btn-primary px-2.5 py-0.5 rounded text-xs font-bold cursor-pointer">+ Add Field</button>
              </div>

              <div class="space-y-3 max-h-[580px] overflow-y-auto pr-1">
                ${formConfig.sections.map(sec => `
                  <div class="border border-[#EBECF0] rounded-lg p-2.5 bg-[#FAFBFC]">
                    <div class="font-bold text-xs text-[#172B4D] mb-1.5">${sec.title}</div>
                    <div class="space-y-1">
                      ${sec.fields.map((f, i) => `
                        <div class="bg-white border border-[#DFE1E6] rounded p-2 flex items-center justify-between text-xs">
                          <div>
                            <span class="font-bold text-[#172B4D]">${f.label} ${f.required ? '<span class="text-[#BF2600]">*</span>' : ''}</span>
                            <div class="text-[10px] text-[#5E6C84] font-mono">${f.key} • [${f.type}]</div>
                          </div>
                          <button data-action="del-field" data-sec-id="${sec.id}" data-field-id="${f.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#BF2600] cursor-pointer" title="Remove Field">✕</button>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Right Panel: Live Form Preview -->
          <div class="lg:col-span-7">
            <div class="bg-white border border-[#DFE1E6] rounded-xl p-4 shadow-none">
              <div class="flex items-center justify-between border-b border-[#EBECF0] pb-2.5 mb-3">
                <span class="text-xs font-bold text-[#172B4D]">Live Form Preview</span>
                <div class="flex items-center gap-1.5 text-xs">
                  <span class="text-[#5E6C84]">Role:</span>
                  <select id="preview-role-select" class="px-2 py-0.5 border border-[#DFE1E6] rounded text-xs font-bold bg-white">
                    ${['System Administrator', 'Procurement Officer', 'Quality Lab Inspector', 'Production Floor Manager'].map(r => `
                      <option value="${r}" ${r === persona ? 'selected' : ''}>${r}</option>
                    `).join('')}
                  </select>
                </div>
              </div>

              <form id="live-erp-form" class="space-y-4 max-h-[560px] overflow-y-auto pr-1">
                ${formConfig.sections.map(sec => `
                  <div class="space-y-2">
                    <div class="text-xs font-bold text-[#172B4D] border-b border-[#EBECF0] pb-1">${sec.title}</div>
                    <div class="grid grid-cols-2 gap-2.5">
                      ${sec.fields.map(f => `
                        <div class="${f.width}">
                          <label class="block font-bold text-[11px] text-[#172B4D] mb-1">
                            ${f.label} ${f.required ? '<span class="text-[#BF2600]">*</span>' : ''}
                          </label>

                          ${f.type === 'dropdown' ? `
                            <select class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs bg-white">
                              ${f.options?.map(opt => `<option value="${opt}" ${opt === f.defaultValue ? 'selected' : ''}>${opt}</option>`).join('')}
                            </select>
                          ` : f.type === 'radio' ? `
                            <div class="flex flex-wrap gap-2 pt-1 text-xs">
                              ${f.options?.map(opt => `
                                <label class="flex items-center gap-1 cursor-pointer">
                                  <input type="radio" name="${f.key}" value="${opt}" ${opt === f.defaultValue ? 'checked' : ''} class="text-[#0369A1]" />
                                  <span>${opt}</span>
                                </label>
                              `).join('')}
                            </div>
                          ` : f.type === 'file' ? `
                            <div class="border border-dashed border-[#DFE1E6] rounded-lg p-2 text-center text-xs text-[#0369A1] hover:bg-[#FAFBFC] cursor-pointer">
                              <span>Click to upload file</span>
                              <span class="text-[10px] text-[#5E6C84] block">${f.helpText || 'PDF / JPG'}</span>
                            </div>
                          ` : `
                            <input type="${f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}" placeholder="${f.placeholder || ''}" value="${f.defaultValue || ''}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs" />
                          `}
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `).join('')}

                <div class="pt-2 border-t border-[#EBECF0] flex justify-end">
                  <button type="submit" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">Validate & Submit Slip</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;

    const formSel = document.getElementById('builder-form-select');
    if (formSel) {
      formSel.onchange = (e) => {
        this.selectedFormForBuilder = e.target.value;
        this.renderFieldFormBuilderTab(container);
      };
    }

    const roleSel = document.getElementById('preview-role-select');
    if (roleSel) {
      roleSel.onchange = (e) => {
        this.state.previewPersona = e.target.value;
        this.renderFieldFormBuilderTab(container);
      };
    }

    document.querySelectorAll('[data-action="del-field"]').forEach(btn => {
      btn.onclick = () => {
        const sec = formConfig.sections.find(s => s.id === btn.dataset.secId);
        if (sec) {
          sec.fields = sec.fields.filter(f => f.id !== btn.dataset.fieldId);
          this.saveState();
          Toast.show('Field removed', 'info', 'Removed');
          this.renderFieldFormBuilderTab(container);
        }
      };
    });

    const addFieldBtn = document.getElementById('btn-add-form-field');
    if (addFieldBtn) addFieldBtn.onclick = () => this.showAddFieldModal(formConfig);

    const exportBtn = document.getElementById('btn-export-schema-json');
    if (exportBtn) {
      exportBtn.onclick = () => {
        const json = JSON.stringify(formConfig, null, 2);
        Modal.show('Form Schema JSON', `
          <div class="space-y-2">
            <textarea readonly rows="12" class="w-full p-2 font-mono text-[11px] bg-[#172B4D] text-[#79F2C0] rounded border border-[#DFE1E6]">${json}</textarea>
            <div class="flex justify-end">
              <button onclick="navigator.clipboard.writeText(\`${json.replace(/\`/g, '\\\\`')}\`); Toast.show('Schema copied to clipboard', 'success', 'Copied'); Modal.close();" class="btn-primary px-3 py-1 rounded text-xs font-bold cursor-pointer">Copy JSON</button>
            </div>
          </div>
        `);
      };
    }

    const saveBtn = document.getElementById('btn-save-form-schema');
    if (saveBtn) {
      saveBtn.onclick = () => {
        this.logAudit('Form Builder', `Saved schema for ${formConfig.name}`);
        this.state.hasDraftChanges = true;
        this.state.draftChangesCount++;
        this.saveState();
        Toast.show('Form schema saved', 'success', 'Saved');
      };
    }

    const liveForm = document.getElementById('live-erp-form');
    if (liveForm) {
      liveForm.onsubmit = (e) => {
        e.preventDefault();
        Toast.show('Live validation passed! ERP operational slip recorded.', 'success', 'Validated');
      };
    }
  },

  showAddFieldModal(formConfig) {
    const modalContent = `
      <form id="af-form" class="space-y-3 text-xs">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Target Section *</label>
            <select id="af-sec" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg">
              ${formConfig.sections.map(s => `<option value="${s.id}">${s.title}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Field Type *</label>
            <select id="af-type" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg">
              <option value="text">Text Input</option>
              <option value="number">Number Input</option>
              <option value="date">Date Picker</option>
              <option value="dropdown">Dropdown Select</option>
              <option value="radio">Radio Buttons</option>
              <option value="file">File Upload</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Field Label *</label>
            <input type="text" id="af-label" required class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="e.g. Salinity / PPT" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Field Key *</label>
            <input type="text" id="af-key" required class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg font-mono" placeholder="salinityPpt" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Placeholder Text</label>
            <input type="text" id="af-placeholder" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="e.g. 15 PPT" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Grid Width</label>
            <select id="af-width" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg">
              <option value="col-span-1">Half Width (50%)</option>
              <option value="col-span-2">Full Width (100%)</option>
            </select>
          </div>
        </div>

        <div class="flex items-center gap-2 pt-1">
          <input type="checkbox" id="af-req" class="rounded text-[#0369A1]" />
          <label for="af-req" class="font-bold text-[#172B4D] cursor-pointer">Mark as Mandatory (Required)</label>
        </div>

        <div class="flex items-center justify-end gap-2 pt-3 border-t border-[#EBECF0]">
          <button type="button" id="modal-af-cancel" class="px-3.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs font-semibold text-[#42526E] hover:bg-[#FAFBFC] cursor-pointer">Cancel</button>
          <button type="submit" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">Add Field</button>
        </div>
      </form>
    `;

    Modal.show('Add Field to Form', modalContent);
    document.getElementById('modal-af-cancel').onclick = () => Modal.close();

    document.getElementById('af-form').onsubmit = (e) => {
      e.preventDefault();
      const secId = document.getElementById('af-sec').value;
      const type = document.getElementById('af-type').value;
      const label = document.getElementById('af-label').value.trim();
      const key = document.getElementById('af-key').value.trim();
      const placeholder = document.getElementById('af-placeholder').value.trim();
      const width = document.getElementById('af-width').value;
      const required = document.getElementById('af-req').checked;

      const sec = formConfig.sections.find(s => s.id === secId);
      if (sec) {
        sec.fields.push({
          id: `f_${Date.now()}`,
          key,
          label,
          type,
          placeholder,
          width,
          required,
          defaultValue: ''
        });

        this.saveState();
        Modal.close();
        Toast.show(`Field "${label}" added`, 'success', 'Saved');
        const c = document.getElementById('setup-subpage-content');
        if (c) this.renderClientMasterStudio(c, 'field-form-builder');
      }
    };
  },

  // =========================================================================

};
