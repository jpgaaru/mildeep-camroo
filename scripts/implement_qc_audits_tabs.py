import re

print("Implementing QC Audits tab menus (Food Audit List, Social Audit List, Farm Audit List, Hatchery Audit List, Feed Mill Audit List)...")

SIDEBAR_OLD_AUDITS = re.compile(r'\{\s*id:\s*"qc-audits",\s*title:\s*"QC Audits",\s*defaultTab:\s*"food-audits",\s*tabs:\s*\[[\s\S]*?\]\s*\}', re.MULTILINE)

SIDEBAR_NEW_AUDITS = '''{
        id: "qc-audits",
        title: "QC Audits",
        defaultTab: "food-audit-list",
        tabs: [
          { id: "food-audit-list", label: "Food Audit List", hash: "#/quality/qc-audits/food-audit-list" },
          { id: "social-audit-list", label: "Social Audit List", hash: "#/quality/qc-audits/social-audit-list" },
          { id: "farm-audit-list", label: "Farm Audit List", hash: "#/quality/qc-audits/farm-audit-list" },
          { id: "hatchery-audit-list", label: "Hatchery Audit List", hash: "#/quality/qc-audits/hatchery-audit-list" },
          { id: "feed-mill-audit-list", label: "Feed Mill Audit List", hash: "#/quality/qc-audits/feed-mill-audit-list" }
        ]
      }'''

# 1. Update js/components/sidebar.js
with open('js/components/sidebar.js', 'r', encoding='utf-8') as f:
    s_content = f.read()

if SIDEBAR_OLD_AUDITS.search(s_content):
    s_content = SIDEBAR_OLD_AUDITS.sub(SIDEBAR_NEW_AUDITS, s_content)
    with open('js/components/sidebar.js', 'w', encoding='utf-8') as f:
        f.write(s_content)
    print("✓ Updated qc-audits tab menu list in js/components/sidebar.js")

BRANCHING_AUDITS = '''    } else if (subPage === 'hatchery-list' || subPage === 'hatcheries') {
      this.renderHatcheryList(subContainer, activeHash);
    } else if (subPage === 'food-audit-list' || subPage === 'food-audits' || subPage === 'qc-audits') {
      this.renderFoodAuditList(subContainer, activeHash);
    } else if (subPage === 'social-audit-list' || subPage === 'social-audits') {
      this.renderSocialAuditList(subContainer, activeHash);
    } else if (subPage === 'farm-audit-list' || subPage === 'farm-audits') {
      this.renderFarmAuditList(subContainer, activeHash);
    } else if (subPage === 'hatchery-audit-list' || subPage === 'hatchery-audits') {
      this.renderHatcheryAuditList(subContainer, activeHash);
    } else if (subPage === 'feed-mill-audit-list' || subPage === 'feed-mill-audits') {
      this.renderFeedMillAuditList(subContainer, activeHash);'''

AUDITS_METHODS = '''
  // ==========================================
  // 11. QC AUDITS: TAB 1 - FOOD AUDIT LIST
  // ==========================================
  foodAuditsData: [
    { sNo: 1, plant: 'DFL UNIT-5 (JPT)', standard: 'BRCGS Food Safety (Issue 9)', agency: 'SGS India', auditDate: '14-01-2026', validUpto: '15-01-2027', grade: 'Grade AA+', status: 'Compliant' },
    { sNo: 2, plant: 'DFL UNIT-3 (PSP)', standard: 'IFS Food Standard (v8)', agency: 'DNV GL', auditDate: '19-03-2026', validUpto: '20-03-2027', grade: 'Higher Level (98.2%)', status: 'Compliant' },
    { sNo: 3, plant: 'DFL UNIT-1 (KKD)', standard: 'FSSC 22000 (v6.0)', agency: 'TUV Nord', auditDate: '10-06-2026', validUpto: '11-06-2027', grade: 'Certified', status: 'Compliant' },
    { sNo: 4, plant: 'DFL UNIT-5 (JPT)', standard: 'US FDA Seafood HACCP', agency: 'EIA / MPEDA', auditDate: '02-09-2026', validUpto: '03-09-2027', grade: 'Zero Defect', status: 'Compliant' }
  ],

  renderFoodAuditList(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">FOOD AUDIT LIST</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">QC Audits &bull; BRCGS, IFS, HACCP &amp; Food Safety Certification Register</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="QCView.openAddFoodAuditModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Food Audit</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT / FACILITY</label>
              <select id="food-audit-filter-plant" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="All" selected>All Plants</option>
                <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                <option value="DFL UNIT-1 (KKD)">DFL UNIT-1 (KKD)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">STANDARD</label>
              <select id="food-audit-filter-std" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                <option value="All" selected>All Standards</option>
                <option value="BRCGS">BRCGS Food Safety</option>
                <option value="IFS">IFS Food</option>
                <option value="FSSC">FSSC 22000</option>
                <option value="HACCP">US FDA HACCP</option>
              </select>
            </div>
            <div class="flex items-end">
              <button type="button" onclick="QCView.handleFoodAuditSearch()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input type="text" id="food-audit-search-input" onkeyup="QCView.filterFoodAudits(this.value)" placeholder="Search audits, plant, agency..." class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] transition-all"/>
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <span class="text-xs font-semibold text-[#64748B]">Showing ${this.foodAuditsData.length} records</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4">S.NO</th>
                  <th class="py-3 px-4">Plant / Facility</th>
                  <th class="py-3 px-4">Audit Standard</th>
                  <th class="py-3 px-4">Auditor / Agency</th>
                  <th class="py-3 px-4">Audit Date</th>
                  <th class="py-3 px-4">Valid Upto</th>
                  <th class="py-3 px-4">Score / Grade</th>
                  <th class="py-3 px-4 text-center">Status</th>
                  <th class="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="food-audits-table-body" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]">
                ${this.foodAuditsData.map((r, i) => `
                  <tr class="hover:bg-[#F8FAFC]">
                    <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
                    <td class="py-3 px-4 font-bold text-[#006C7A]">${r.plant}</td>
                    <td class="py-3 px-4 text-[#1E293B] font-semibold">${r.standard}</td>
                    <td class="py-3 px-4 text-[#475569]">${r.agency}</td>
                    <td class="py-3 px-4 text-[#64748B]">${r.auditDate}</td>
                    <td class="py-3 px-4 text-[#64748B]">${r.validUpto}</td>
                    <td class="py-3 px-4 font-bold text-emerald-700">${r.grade}</td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${r.status}</span>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <button type="button" onclick="QCView.openAuditCertModal('${r.plant}', '${r.standard}', '${r.grade}')" class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
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

  openAddFoodAuditModal() {
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : window.Modal;
    if (!m) return;
    m.open({
      title: 'ADD FOOD SAFETY AUDIT',
      size: 'lg',
      content: `
        <form class="space-y-4 text-xs text-[#1E293B]" onsubmit="event.preventDefault(); QCView.handleAddFoodAuditSubmit();">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">PLANT NAME <span class="text-rose-500">*</span></label>
              <select id="modal-fa-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
                <option value="DFL UNIT-5 (JPT)" selected>DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                <option value="DFL UNIT-1 (KKD)">DFL UNIT-1 (KKD)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT STANDARD <span class="text-rose-500">*</span></label>
              <input type="text" id="modal-fa-std" placeholder="e.g. BRCGS Issue 9" value="BRCGS Food Safety" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AGENCY / AUDITOR</label>
              <input type="text" id="modal-fa-agency" value="SGS India" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT DATE</label>
              <input type="date" id="modal-fa-date" value="2026-10-26" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">GRADE / SCORE</label>
              <input type="text" id="modal-fa-grade" value="Grade AA" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
          </div>
          <div class="flex items-center justify-end gap-3 pt-3 border-t border-[#F1F5F9]">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if(m && m.close) m.close();" class="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
              Close
            </button>
            <button type="submit" class="px-6 py-2.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <span>Save Audit</span>
            </button>
          </div>
        </form>
      `
    });
  },

  handleAddFoodAuditSubmit() {
    const plant = document.getElementById('modal-fa-plant')?.value || 'DFL UNIT-5 (JPT)';
    const std = document.getElementById('modal-fa-std')?.value || 'BRCGS Food Safety';
    const agency = document.getElementById('modal-fa-agency')?.value || 'SGS India';
    const grade = document.getElementById('modal-fa-grade')?.value || 'Grade AA';

    this.foodAuditsData.unshift({
      sNo: this.foodAuditsData.length + 1,
      plant: plant,
      standard: std,
      agency: agency,
      auditDate: '26-10-2026',
      validUpto: '26-10-2027',
      grade: grade,
      status: 'Compliant'
    });

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : window.Modal;
    if (m && m.close) m.close();

    const container = document.getElementById('qc-subpage-content');
    if (container) this.renderFoodAuditList(container);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Food Safety Audit logged successfully!', 'success');
    }
  },

  openAuditCertModal(plant, standard, grade) {
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : window.Modal;
    if (!m) return;
    m.open({
      title: `AUDIT CERTIFICATE DETAILS: ${standard}`,
      size: 'md',
      content: `
        <div class="space-y-4 text-xs text-[#1E293B]">
          <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
            <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">PLANT / FACILITY</span>
            <span class="font-bold text-sm text-[#006C7A] block mt-0.5">${plant}</span>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">STANDARD</span>
              <span class="font-bold text-xs text-[#1E293B] block mt-0.5">${standard}</span>
            </div>
            <div class="bg-slate-50 border border-[#CBD5E1] rounded-lg p-3">
              <span class="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">AUDIT RESULT</span>
              <span class="font-bold text-xs text-emerald-700 block mt-0.5">${grade}</span>
            </div>
          </div>
          <div class="flex items-center justify-end pt-2">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if(m && m.close) m.close();" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer">
              Close
            </button>
          </div>
        </div>
      `
    });
  },

  // ==========================================
  // 12. QC AUDITS: TAB 2 - SOCIAL AUDIT LIST
  // ==========================================
  socialAuditsData: [
    { sNo: 1, facility: 'DFL UNIT-5 (JPT)', framework: 'Sedex SMETA (4-Pillar)', body: 'Intertek Testing Services', auditDate: '12-02-2026', validUpto: '13-02-2027', capStatus: 'Closed (100%)', rating: 'Compliant' },
    { sNo: 2, facility: 'DFL UNIT-3 (PSP)', framework: 'BSCI Social Audit', body: 'TUV Rheinland', auditDate: '18-04-2026', validUpto: '19-04-2027', capStatus: 'Closed (100%)', rating: 'Rating A' },
    { sNo: 3, facility: 'DFL UNIT-1 (KKD)', framework: 'SA 8000 Social Accountability', body: 'BSI Group', auditDate: '15-07-2026', validUpto: '16-07-2027', capStatus: 'Closed (100%)', rating: 'Certified' }
  ],

  renderSocialAuditList(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">SOCIAL AUDIT LIST</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">QC Audits &bull; Sedex SMETA, BSCI, SA 8000 &amp; Ethical Labor Compliance</span>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4">S.NO</th>
                  <th class="py-3 px-4">Facility Name</th>
                  <th class="py-3 px-4">Framework / Standard</th>
                  <th class="py-3 px-4">Audit Agency</th>
                  <th class="py-3 px-4">Audit Date</th>
                  <th class="py-3 px-4">Valid Upto</th>
                  <th class="py-3 px-4">CAP Status</th>
                  <th class="py-3 px-4 text-center">Rating</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]">
                ${this.socialAuditsData.map(r => `
                  <tr class="hover:bg-[#F8FAFC]">
                    <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
                    <td class="py-3 px-4 font-bold text-[#006C7A]">${r.facility}</td>
                    <td class="py-3 px-4 font-semibold text-[#1E293B]">${r.framework}</td>
                    <td class="py-3 px-4 text-[#475569]">${r.body}</td>
                    <td class="py-3 px-4 text-[#64748B]">${r.auditDate}</td>
                    <td class="py-3 px-4 text-[#64748B]">${r.validUpto}</td>
                    <td class="py-3 px-4 text-emerald-700 font-medium">${r.capStatus}</td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${r.rating}</span>
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

  // ==========================================
  // 13. QC AUDITS: TAB 3 - FARM AUDIT LIST
  // ==========================================
  farmAuditsData: [
    { sNo: 1, farmName: 'Devi Fisheries Coastal Farms #12', farmer: 'P. Venkatarama Raju', location: 'Amalapuram', area: '45.0 Ha', bapStatus: 'BAP 4-Star Certified', auditDate: '10-02-2026', grade: 'Category A' },
    { sNo: 2, farmName: 'Devi Aquaculture Cluster #05', farmer: 'K. Subba Rao', location: 'Bhimavaram', area: '62.5 Ha', bapStatus: 'BAP 4-Star Certified', auditDate: '14-04-2026', grade: 'Category A' },
    { sNo: 3, farmName: 'Krishna Delta Shrimp Farms #08', farmer: 'M. Sitarama Raju', location: 'Machilipatnam', area: '38.0 Ha', bapStatus: 'ASC Certified', auditDate: '22-07-2026', grade: 'Category A' }
  ],

  renderFarmAuditList(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">FARM AUDIT LIST</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">QC Audits &bull; Shrimp Aquaculture Farms, BAP 4-Star &amp; ASC Traceability</span>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4">S.NO</th>
                  <th class="py-3 px-4">Farm Name</th>
                  <th class="py-3 px-4">Farmer / Contact</th>
                  <th class="py-3 px-4">Location</th>
                  <th class="py-3 px-4 text-right">Water Spread Area</th>
                  <th class="py-3 px-4">BAP / ASC Status</th>
                  <th class="py-3 px-4">Inspection Date</th>
                  <th class="py-3 px-4 text-center">Grade</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]">
                ${this.farmAuditsData.map(r => `
                  <tr class="hover:bg-[#F8FAFC]">
                    <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
                    <td class="py-3 px-4 font-bold text-[#006C7A]">${r.farmName}</td>
                    <td class="py-3 px-4 text-[#1E293B] font-medium">${r.farmer}</td>
                    <td class="py-3 px-4 text-[#64748B]">${r.location}</td>
                    <td class="py-3 px-4 text-right font-semibold text-[#1E293B]">${r.area}</td>
                    <td class="py-3 px-4 font-semibold text-[#006C7A]">${r.bapStatus}</td>
                    <td class="py-3 px-4 text-[#64748B]">${r.auditDate}</td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${r.grade}</span>
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

  // ==========================================
  // 14. QC AUDITS: TAB 4 - HATCHERY AUDIT LIST
  // ==========================================
  hatcheryAuditsData: [
    { sNo: 1, hatcheryName: 'DeviFishires Hatchry-1', location: 'Kakinada', capacity: '5 Tonnes PL', caaReg: 'CAA/REG/2026/0491', biosecurity: 'SPF Vannamei Certified', auditDate: '15-03-2026', status: 'Compliant' },
    { sNo: 2, hatcheryName: 'DeviFishires Hatchry-2', location: 'Uppada', capacity: '3 Tonnes PL', caaReg: 'CAA/REG/2026/0882', biosecurity: 'PCR Negative Screened', auditDate: '20-05-2026', status: 'Compliant' }
  ],

  renderHatcheryAuditList(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">HATCHERY AUDIT LIST</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">QC Audits &bull; Broodstock, Nauplii &amp; Post-Larvae (PL) Biosecurity Audits</span>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4">S.NO</th>
                  <th class="py-3 px-4">Hatchery Name</th>
                  <th class="py-3 px-4">Location</th>
                  <th class="py-3 px-4">Capacity</th>
                  <th class="py-3 px-4">CAA License No</th>
                  <th class="py-3 px-4">Biosecurity Screening</th>
                  <th class="py-3 px-4">Audit Date</th>
                  <th class="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]">
                ${this.hatcheryAuditsData.map(r => `
                  <tr class="hover:bg-[#F8FAFC]">
                    <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
                    <td class="py-3 px-4 font-bold text-[#006C7A]">${r.hatcheryName}</td>
                    <td class="py-3 px-4 text-[#334155]">${r.location}</td>
                    <td class="py-3 px-4 font-medium text-[#475569]">${r.capacity}</td>
                    <td class="py-3 px-4 font-mono text-[#1E293B]">${r.caaReg}</td>
                    <td class="py-3 px-4 font-semibold text-emerald-700">${r.biosecurity}</td>
                    <td class="py-3 px-4 text-[#64748B]">${r.auditDate}</td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${r.status}</span>
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

  // ==========================================
  // 15. QC AUDITS: TAB 5 - FEED MILL AUDIT LIST
  // ==========================================
  feedMillAuditsData: [
    { sNo: 1, millName: 'Devi Aqua Feeds Unit #01', manufacturer: 'Devi Aqua Feeds Pvt Ltd', location: 'Gollalamulagamu', cert: 'BAP 4-Star Feed Mill', freq: 'Monthly Antibiotic Screen', lastAudit: '08-03-2026', status: 'Approved' },
    { sNo: 2, millName: 'Grobest Feeds India Plant #02', manufacturer: 'Grobest Corporation', location: 'Nellore', cert: 'BAP Certified', freq: 'Quarterly Screen', lastAudit: '12-05-2026', status: 'Approved' },
    { sNo: 3, millName: 'CP Aquaculture Feed Mill', manufacturer: 'CP Group India', location: 'Vijayawada', cert: 'AOC / BAP', freq: 'Bimonthly Screen', lastAudit: '19-07-2026', status: 'Approved' }
  ],

  renderFeedMillAuditList(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">FEED MILL AUDIT LIST</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">QC Audits &bull; Aquaculture Feed Mills, Ingredient Traceability &amp; Residue Audits</span>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4">S.NO</th>
                  <th class="py-3 px-4">Feed Mill Name</th>
                  <th class="py-3 px-4">Manufacturer</th>
                  <th class="py-3 px-4">Location</th>
                  <th class="py-3 px-4">Certifications</th>
                  <th class="py-3 px-4">Screening Frequency</th>
                  <th class="py-3 px-4">Last Audit Date</th>
                  <th class="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]">
                ${this.feedMillAuditsData.map(r => `
                  <tr class="hover:bg-[#F8FAFC]">
                    <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
                    <td class="py-3 px-4 font-bold text-[#006C7A]">${r.millName}</td>
                    <td class="py-3 px-4 text-[#1E293B] font-medium">${r.manufacturer}</td>
                    <td class="py-3 px-4 text-[#64748B]">${r.location}</td>
                    <td class="py-3 px-4 font-semibold text-[#006C7A]">${r.cert}</td>
                    <td class="py-3 px-4 text-[#475569]">${r.freq}</td>
                    <td class="py-3 px-4 text-[#64748B]">${r.lastAudit}</td>
                    <td class="py-3 px-4 text-center">
                      <span class="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${r.status}</span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
'''

for filepath in ['js/views/qcView.js', 'miledeep-devi-fisheries.html', 'standalone.html']:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update sidebar in HTML files
    if filepath != 'js/views/qcView.js':
        if SIDEBAR_OLD_AUDITS.search(content):
            content = SIDEBAR_OLD_AUDITS.sub(SIDEBAR_NEW_AUDITS, content)
            print(f"✓ Updated sidebar qc-audits in {filepath}")

    # 2. Update QCView.render() branching
    old_hatchery_branch = '''    } else if (subPage === 'hatchery-list' || subPage === 'hatcheries') {
      this.renderHatcheryList(subContainer, activeHash);'''
    if old_hatchery_branch in content and 'renderFoodAuditList' not in content:
        content = content.replace(old_hatchery_branch, BRANCHING_AUDITS)
        print(f"✓ Updated QCView.render branching for QC Audits in {filepath}")

    # 3. Add QC Audits methods
    end_marker = '''    this.renderHatcheryTableRows();
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Hatchery details updated successfully!', 'success');
    }
  }
};'''
    if end_marker in content and 'renderFoodAuditList' not in content:
        replacement = '''    this.renderHatcheryTableRows();
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Hatchery details updated successfully!', 'success');
    }
  },
''' + AUDITS_METHODS + '''

};'''
        content = content.replace(end_marker, replacement, 1)
        print(f"✓ Added QC Audits views in {filepath}")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Finished implementing QC Audits tab menus!")
