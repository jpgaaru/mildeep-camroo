// Setup Module — Audit & Configuration Logs
export const setupLogs = {
  // 7. AUDIT & CONFIGURATION LOGS TAB
  // =========================================================================
  renderAuditLogsTab(container) {
    container.innerHTML = `
      <div class="space-y-4">
        <!-- Status Bar -->
        <div class="bg-white border border-[#DFE1E6] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-none">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-[#172B4D]">Configuration Governance:</span>
            <span class="lozenge lozenge-success text-[10px] font-mono">${this.state.publishedVersion} Live</span>
            ${this.state.hasDraftChanges ? `
              <span class="lozenge lozenge-warning text-[10px]">${this.state.draftChangesCount} Draft Changes Pending</span>
            ` : `
              <span class="lozenge lozenge-default text-[10px]">Zero Drafts</span>
            `}
          </div>

          <div class="flex items-center gap-2">
            ${this.state.hasDraftChanges ? `
              <button id="btn-discard-drafts" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#BF2600] cursor-pointer">Discard Drafts</button>
              <button id="btn-publish-live" class="btn-primary px-3 py-1 rounded text-xs font-bold cursor-pointer">Publish Changes Live</button>
            ` : ''}
          </div>
        </div>

        <!-- Version Snapshots -->
        <div class="bg-white border border-[#DFE1E6] rounded-xl p-3 shadow-none">
          <div class="text-xs font-bold text-[#172B4D] mb-2">Safe Rollback Snapshots</div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            ${this.state.versionHistory.map(v => `
              <div class="border ${v.isCurrent ? 'border-[#0369A1] bg-[#F0F9FF]' : 'border-[#DFE1E6] bg-white'} rounded-lg p-2.5 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-xs text-[#172B4D] font-mono">${v.version}</span>
                    ${v.isCurrent ? `<span class="lozenge lozenge-inprogress text-[9px]">Live</span>` : ''}
                  </div>
                  <div class="text-[10px] text-[#5E6C84] mt-0.5">${v.date}</div>
                  <div class="text-[11px] text-[#172B4D] mt-1 truncate">${v.note}</div>
                </div>
                <div class="mt-2 pt-1.5 border-t border-[#EBECF0] flex justify-end">
                  ${!v.isCurrent ? `
                    <button data-action="rollback" data-version="${v.version}" class="text-[11px] font-bold text-[#BF2600] hover:underline cursor-pointer">Rollback</button>
                  ` : `
                    <span class="text-[10px] font-bold text-[#006644]">Active</span>
                  `}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] shadow-none overflow-hidden">
          <div class="p-3 border-b border-[#EBECF0] flex items-center justify-between flex-wrap gap-2">
            <span class="text-xs font-bold text-[#172B4D]">Configuration Change Audit Trail</span>
            <button id="btn-export-audit" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] cursor-pointer">Export CSV</button>
          </div>

          <div class="overflow-x-auto">
            <table class="erp-table text-xs w-full">
              <thead>
                <tr>
                  <th class="w-24">Log ID</th>
                  <th>Timestamp</th>
                  <th>User & Role</th>
                  <th>Entity Affected</th>
                  <th>Action</th>
                  <th>Change Diff Details</th>
                  <th class="text-center w-20">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#EBECF0]">
                ${this.state.auditLogs.map(log => `
                  <tr class="hover:bg-[#FAFBFC]">
                    <td class="font-mono font-bold text-[#17191c]">${log.id}</td>
                    <td class="text-[#5E6C84] text-[11px]">${log.timestamp}</td>
                    <td>
                      <div class="font-bold text-[#172B4D]">${log.user}</div>
                      <div class="text-[10px] text-[#5E6C84]">${log.role}</div>
                    </td>
                    <td><span class="lozenge lozenge-default text-[9.5px]">${log.entity}</span></td>
                    <td class="font-semibold text-[#172B4D]">${log.action}</td>
                    <td class="text-[#172B4D]">${log.diff}</td>
                    <td class="text-center"><span class="lozenge lozenge-success text-[9.5px]">${log.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.querySelectorAll('[data-action="rollback"]').forEach(btn => {
      btn.onclick = () => {
        const ver = btn.dataset.version;
        if (confirm(`Rollback configuration to snapshot ${ver}?`)) {
          this.state.publishedVersion = ver;
          this.state.versionHistory.forEach(v => v.isCurrent = (v.version === ver));
          this.state.hasDraftChanges = false;
          this.state.draftChangesCount = 0;
          this.logAudit('Rollback Governance', `Restored snapshot ${ver}`);
          this.saveState();
          Toast.show(`Configuration restored to ${ver}`, 'success', 'Rollback Complete');
          this.renderAuditLogsTab(container);
        }
      };
    });

    const publishBtn = document.getElementById('btn-publish-live');
    if (publishBtn) publishBtn.onclick = () => this.handlePublishConfiguration();

    const discardBtn = document.getElementById('btn-discard-drafts');
    if (discardBtn) {
      discardBtn.onclick = () => {
        if (confirm('Discard pending draft changes?')) {
          this.state.hasDraftChanges = false;
          this.state.draftChangesCount = 0;
          this.saveState();
          Toast.show('Draft changes cleared', 'info', 'Cleared');
          this.renderAuditLogsTab(container);
        }
      };
    }

    const exportBtn = document.getElementById('btn-export-audit');
    if (exportBtn) {
      exportBtn.onclick = () => Toast.show('Generating Audit_Trail.csv...', 'success', 'Export Ready');
    }
  },

  handlePublishConfiguration() {
    const nextVer = `v2.4.${parseInt(this.state.publishedVersion.split('.').pop() || '1') + 1}`;
    Modal.show('Publish Configuration Live', `
      <div class="space-y-3 text-xs">
        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Release Summary Notes</label>
          <input type="text" id="pub-note" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="e.g. Updated CAA upload validation rule" />
        </div>
        <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#EBECF0]">
          <button id="modal-pub-cancel" class="px-3.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs font-semibold text-[#42526E] hover:bg-[#FAFBFC] cursor-pointer">Cancel</button>
          <button id="modal-pub-confirm" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">Publish Live (${nextVer})</button>
        </div>
      </div>
    `);

    document.getElementById('modal-pub-cancel').onclick = () => Modal.close();
    document.getElementById('modal-pub-confirm').onclick = () => {
      const note = document.getElementById('pub-note').value.trim() || 'Configuration changes published live.';
      this.state.publishedVersion = nextVer;
      this.state.hasDraftChanges = false;
      this.state.draftChangesCount = 0;
      this.state.versionHistory.forEach(v => v.isCurrent = false);
      this.state.versionHistory.unshift({
        version: nextVer,
        date: 'Just now',
        publishedBy: 'Dr. Y.S. Prasad',
        note,
        isCurrent: true
      });

      this.logAudit('Configuration Governance', `Published live release ${nextVer}: ${note}`);
      this.saveState();
      Modal.close();
      Toast.show(`Configuration release ${nextVer} is now LIVE`, 'success', 'Published Live');

      const c = document.getElementById('setup-subpage-content');
      if (c) this.renderClientMasterStudio(c, this.activeTab);
    };
  },

  logAudit(entity, diff) {
    const id = `AUD-${Math.floor(8900 + Math.random() * 900)}`;
    const comp = this.state.companies.find(c => c.id === this.state.activeCompanyId)?.name || 'Devi Fisheries Limited';
    this.state.auditLogs.unshift({
      id,
      timestamp: 'Just now',
      user: 'Dr. Y.S. Prasad',
      role: 'System Administrator',
      company: comp,
      entity,
      action: 'Update',
      diff,
      status: 'Published'
    });
  }

};
