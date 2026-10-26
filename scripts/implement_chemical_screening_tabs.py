import re

print("Implementing Chemical Screening tab menus (Food & Social Audit, Farm/Mill/Hatchery Audit, Hatchery List)...")

# 1. Update sidebar.js
with open('js/components/sidebar.js', 'r', encoding='utf-8') as f:
    sidebar_content = f.read()

old_chem = re.compile(r'\{\s*id:\s*"chemical-screening",\s*title:\s*"Chemical Screening",\s*defaultTab:\s*"screening-records",\s*tabs:\s*\[\s*\{\s*id:\s*"screening-records"[^\]]*\}\s*\]\s*\},', re.MULTILINE)

new_chem = '''{
        id: "chemical-screening",
        title: "Chemical Screening",
        defaultTab: "food-social-audit",
        tabs: [
          { id: "food-social-audit", label: "Food & Social Audit", hash: "#/quality/chemical-screening/food-social-audit" },
          { id: "farm-mill-hatchery-audit", label: "Farm/Mill/Hatchery Audit", hash: "#/quality/chemical-screening/farm-mill-hatchery-audit" },
          { id: "hatchery-list", label: "Hatchery List", hash: "#/quality/chemical-screening/hatchery-list" }
        ]
      },'''

if old_chem.search(sidebar_content):
    sidebar_content = old_chem.sub(new_chem, sidebar_content)
    with open('js/components/sidebar.js', 'w', encoding='utf-8') as f:
        f.write(sidebar_content)
    print("✓ Updated chemical-screening in js/components/sidebar.js")

# 2. Prepare methods for QCView
BRANCHING_UPDATE = '''    } else if (subPage === 'documentation' || subPage === 'qc-documentation' || subPage === 'qc-operations') {
      this.renderDocumentation(subContainer, activeHash);
    } else if (subPage === 'qc-orders' || subPage === 'orders') {
      this.renderQCOrders(subContainer, activeHash);
    } else if (subPage === 'food-social-audit' || subPage === 'chemical-screening' || subPage === 'screening-records') {
      this.renderFoodSocialAudit(subContainer, activeHash);
    } else if (subPage === 'farm-mill-hatchery-audit' || subPage === 'farm-mill-audit') {
      this.renderFarmMillHatcheryAudit(subContainer, activeHash);
    } else if (subPage === 'hatchery-list' || subPage === 'hatcheries') {
      this.renderHatcheryList(subContainer, activeHash);'''

CHEMICAL_SCREENING_METHODS = '''
  // ==========================================
  // 8. CHEMICAL SCREENING: TAB 1 - FOOD & SOCIAL AUDIT
  // ==========================================
  foodAuditSelectedType: 'All',
  foodAuditSelectedYear: '2026-27',

  foodSocialAuditList: [
    {
      sNo: 1,
      auditType: 'Hatchery',
      farmName: 'DeviFishires Hatchry-2',
      farmerName: 'TADIPUDI VENKATA RAMA RAJU',
      hatcheryLocation: 'Uppada',
      certifiedBody: 'AOC',
      associatedFactory: 'DFL UNIT-5 (JPT)',
      govAuthority: 'MPEDA',
      govRegNumber: '3423',
      bapNumber: '6756',
      tonnagePerAnnum: '50',
      waterSpreadArea: '20',
      auditDate: '08-01-2024'
    },
    {
      sNo: 2,
      auditType: 'Farm',
      farmName: 'DeviFishires Hatchry-1',
      farmerName: 'KANTHETI BALARAMA RAJU',
      hatcheryLocation: 'Kakinada',
      certifiedBody: 'BAP',
      associatedFactory: 'DFL UNIT-5 (JPT)',
      govAuthority: 'MPEDA',
      govRegNumber: '1222555',
      bapNumber: '122555',
      tonnagePerAnnum: '12551',
      waterSpreadArea: '1325',
      auditDate: '01-10-2026'
    },
    {
      sNo: 3,
      auditType: 'Feed Mill',
      farmName: 'DeviFishires Hatchry-1',
      farmerName: 'TADIPUDI VENKATA RAMA RAJU',
      hatcheryLocation: 'Kakinada',
      certifiedBody: 'AOC',
      associatedFactory: 'DFL UNIT-3 (PSP)',
      govAuthority: 'MPEDA',
      govRegNumber: '1222555',
      bapNumber: '122555',
      tonnagePerAnnum: '12551',
      waterSpreadArea: '1325',
      auditDate: '09-10-2026'
    }
  ],

  renderFoodSocialAudit(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">FOOD &amp; SOCIAL AUDIT</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screening &bull; Farm, Hatchery &amp; Feed Mill Compliance Audit Register</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="QCView.openAddMillModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Mill</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form class="space-y-4" onsubmit="event.preventDefault(); QCView.handleFoodAuditFilter();">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">AUDIT TYPE</label>
                <select id="food-audit-filter-type" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="All" selected>All</option>
                  <option value="Hatchery">Hatchery</option>
                  <option value="Farm">Farm</option>
                  <option value="Feed Mill">Feed Mill</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="food-audit-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="2026-27" selected>2026-27</option>
                  <option value="2025-26">2025-26</option>
                  <option value="2024-25">2024-25</option>
                </select>
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="submit" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <span>Search</span>
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input type="text" id="food-audit-search-input" onkeyup="QCView.handleFoodAuditSearch(this.value)" placeholder="Search audits, farms, farmers..." class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all"/>
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" onclick="const s = document.getElementById('food-audit-search-input'); if(s) s.focus();" class="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#006C7A] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button type="button" onclick="QCView.renderFoodAuditTableRows(QCView.foodSocialAuditList)" class="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#006C7A] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
              <span id="food-audit-counter" class="text-xs font-semibold text-[#64748B] ml-2">Showing 1 to 3 out of 3 entries</span>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none whitespace-nowrap">
                  <th class="py-3 px-4">S.NO</th>
                  <th class="py-3 px-4">Audit Type</th>
                  <th class="py-3 px-4">Farm Name</th>
                  <th class="py-3 px-4">Farmer Name</th>
                  <th class="py-3 px-4">Hatchry Location</th>
                  <th class="py-3 px-4">Certified Body</th>
                  <th class="py-3 px-4">Associated Factory</th>
                  <th class="py-3 px-4">Government Authority</th>
                  <th class="py-3 px-4">Gov Registration Number</th>
                  <th class="py-3 px-4">BAP Number</th>
                  <th class="py-3 px-4 text-right">Tonnage/Annum</th>
                  <th class="py-3 px-4 text-right">Water Spread Area</th>
                  <th class="py-3 px-4 text-center">Audit Date</th>
                </tr>
              </thead>
              <tbody id="food-audit-tbody" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B] whitespace-nowrap">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.renderFoodAuditTableRows();
  },

  renderFoodAuditTableRows(data) {
    const list = data || this.foodSocialAuditList;
    const tbody = document.getElementById('food-audit-tbody');
    if (!tbody) return;

    const counter = document.getElementById('food-audit-counter');
    if (counter) counter.innerText = `Showing 1 to ${list.length} out of ${this.foodSocialAuditList.length} entries`;

    tbody.innerHTML = list.map((r, i) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${i % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 font-semibold text-[#006C7A]">${r.auditType}</td>
        <td class="py-3 px-4 text-[#334155] font-medium">${r.farmName}</td>
        <td class="py-3 px-4 text-[#1E293B] font-semibold">${r.farmerName}</td>
        <td class="py-3 px-4 text-[#64748B]">${r.hatcheryLocation}</td>
        <td class="py-3 px-4"><span class="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-[#334155]">${r.certifiedBody}</span></td>
        <td class="py-3 px-4 text-[#334155] font-medium">${r.associatedFactory}</td>
        <td class="py-3 px-4 text-[#64748B]">${r.govAuthority}</td>
        <td class="py-3 px-4 font-mono text-[#475569]">${r.govRegNumber}</td>
        <td class="py-3 px-4 font-mono text-[#006C7A] font-semibold">${r.bapNumber}</td>
        <td class="py-3 px-4 text-right font-bold text-[#1E293B]">${r.tonnagePerAnnum}</td>
        <td class="py-3 px-4 text-right font-medium text-[#475569]">${r.waterSpreadArea}</td>
        <td class="py-3 px-4 text-center text-[#64748B] font-mono">${r.auditDate}</td>
      </tr>
    `).join('');
  },

  handleFoodAuditSearch(q) {
    const query = (q || '').toLowerCase().trim();
    if (!query) {
      this.renderFoodAuditTableRows(this.foodSocialAuditList);
      return;
    }
    const filtered = this.foodSocialAuditList.filter(r =>
      r.auditType.toLowerCase().includes(query) ||
      r.farmName.toLowerCase().includes(query) ||
      r.farmerName.toLowerCase().includes(query) ||
      r.hatcheryLocation.toLowerCase().includes(query) ||
      r.associatedFactory.toLowerCase().includes(query) ||
      r.bapNumber.toLowerCase().includes(query)
    );
    this.renderFoodAuditTableRows(filtered);
  },

  handleFoodAuditFilter() {
    const type = document.getElementById('food-audit-filter-type')?.value || 'All';
    let list = this.foodSocialAuditList;
    if (type !== 'All') {
      list = list.filter(r => r.auditType.toLowerCase() === type.toLowerCase());
    }
    this.renderFoodAuditTableRows(list);
  },

  openAddMillModal() {
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: 'ADD MILL / COMPLIANCE AUDIT',
      size: 'xl',
      content: `
        <form class="space-y-4 text-xs text-[#1E293B]" onsubmit="event.preventDefault(); QCView.handleAddMillSubmit();">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT TYPE <span class="text-rose-500">*</span></label>
              <select id="modal-mill-type" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
                <option value="Hatchery">Hatchery</option>
                <option value="Farm">Farm</option>
                <option value="Feed Mill" selected>Feed Mill</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">FARM / MILL NAME <span class="text-rose-500">*</span></label>
              <input type="text" id="modal-mill-name" placeholder="Enter Name" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">FARMER / OWNER NAME <span class="text-rose-500">*</span></label>
              <input type="text" id="modal-mill-farmer" placeholder="Enter Owner Name" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">LOCATION <span class="text-rose-500">*</span></label>
              <input type="text" id="modal-mill-location" placeholder="e.g. Kakinada, Uppada" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">CERTIFIED BODY</label>
              <select id="modal-mill-body" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
                <option value="AOC" selected>AOC</option>
                <option value="BAP">BAP</option>
                <option value="ASC">ASC</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">ASSOCIATED FACTORY</label>
              <select id="modal-mill-factory" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
                <option value="DFL UNIT-5 (JPT)" selected>DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                <option value="DFL UNIT-1">DFL UNIT-1</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">GOV AUTHORITY</label>
              <input type="text" id="modal-mill-authority" value="MPEDA" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">GOV REG NO</label>
              <input type="text" id="modal-mill-gov-reg" placeholder="e.g. 1222555" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">BAP NUMBER</label>
              <input type="text" id="modal-mill-bap" placeholder="e.g. 122555" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">TONNAGE/ANNUM</label>
              <input type="number" id="modal-mill-tonnage" placeholder="e.g. 1000" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-[#F1F5F9]">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if(m && m.close) m.close();" class="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
              Cancel
            </button>
            <button type="submit" class="px-6 py-2.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Save Mill</span>
            </button>
          </div>
        </form>
      `
    });
  },

  handleAddMillSubmit() {
    const type = document.getElementById('modal-mill-type')?.value || 'Feed Mill';
    const name = document.getElementById('modal-mill-name')?.value || 'Mill';
    const farmer = document.getElementById('modal-mill-farmer')?.value || 'Owner';
    const location = document.getElementById('modal-mill-location')?.value || 'Kakinada';
    const body = document.getElementById('modal-mill-body')?.value || 'AOC';
    const factory = document.getElementById('modal-mill-factory')?.value || 'DFL UNIT-5 (JPT)';
    const authority = document.getElementById('modal-mill-authority')?.value || 'MPEDA';
    const reg = document.getElementById('modal-mill-gov-reg')?.value || '1234';
    const bap = document.getElementById('modal-mill-bap')?.value || '5678';
    const tonnage = document.getElementById('modal-mill-tonnage')?.value || '100';

    this.foodSocialAuditList.unshift({
      sNo: this.foodSocialAuditList.length + 1,
      auditType: type,
      farmName: name,
      farmerName: farmer,
      hatcheryLocation: location,
      certifiedBody: body,
      associatedFactory: factory,
      govAuthority: authority,
      govRegNumber: reg,
      bapNumber: bap,
      tonnagePerAnnum: tonnage,
      waterSpreadArea: '100',
      auditDate: new Date().toLocaleDateString('en-GB').replace(/\\//g, '-')
    });

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : window.Modal;
    if (m && m.close) m.close();

    this.renderFoodAuditTableRows();
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Mill / Audit record added successfully!', 'success');
    }
  },

  // ==========================================
  // 9. CHEMICAL SCREENING: TAB 2 - FARM/MILL/HATCHERY AUDIT
  // ==========================================
  farmAuditSelectedPlant: 'Select',
  farmAuditSelectedYear: '2026-27',

  farmMillAuditList: [
    {
      sNo: 1,
      plantName: 'DFL UNIT-5 (JPT)',
      auditName: 'APCB',
      auditType: 'SOCIAL',
      certAuthority: 'Authority1',
      regNumber: '89765',
      certNumber: '3456',
      startDate: '12-01-2024',
      endDate: '14-01-2024',
      program: 'Announced',
      issuedOn: '14-01-2023',
      validUpto: '15-01-2024',
      renewalDate: '16-01-2024',
      grade: 'GradeA'
    },
    {
      sNo: 2,
      plantName: 'DFL UNIT-3 (PSP)',
      auditName: 'APCB',
      auditType: 'FOOD',
      certAuthority: 'Authority1',
      regNumber: '12345',
      certNumber: '67890',
      startDate: '19-03-2024',
      endDate: '20-03-2024',
      program: 'Announced',
      issuedOn: '20-03-2024',
      validUpto: '22-03-2024',
      renewalDate: '23-03-2024',
      grade: 'GradeA'
    }
  ],

  renderFarmMillHatcheryAudit(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">FARM/MILL/HATCHERY AUDIT</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screening &bull; Plant Certifications, APCB &amp; External Verification Registry</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="QCView.openAddFarmAuditModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Audit</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <div class="flex items-center gap-2 pb-2.5 mb-3.5 border-b border-[#F1F5F9]">
            <svg class="w-4 h-4 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#1E293B] uppercase tracking-wider">SEARCH &amp; FILTERS</h3>
          </div>
          <form class="space-y-4" onsubmit="event.preventDefault(); QCView.handleFarmAuditFilter();">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PLANT</label>
                <select id="farm-audit-filter-plant" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="Select" selected>Select Plant</option>
                  <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                  <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                  <option value="DFL UNIT-1">DFL UNIT-1</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">YEAR</label>
                <select id="farm-audit-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all">
                  <option value="2026-27" selected>2026-27</option>
                  <option value="2025-26">2025-26</option>
                  <option value="2024-25">2024-25</option>
                </select>
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
              <button type="submit" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <span>Search</span>
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input type="text" id="farm-audit-search-input" onkeyup="QCView.handleFarmAuditSearch(this.value)" placeholder="Search audits, plant names, authorities..." class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all"/>
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" onclick="const s = document.getElementById('farm-audit-search-input'); if(s) s.focus();" class="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#006C7A] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button type="button" onclick="QCView.renderFarmAuditTableRows(QCView.farmMillAuditList)" class="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#006C7A] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
              <span id="farm-audit-counter" class="text-xs font-semibold text-[#64748B] ml-2">Showing ${this.farmMillAuditList.length} records</span>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none whitespace-nowrap">
                  <th class="py-3 px-4">S.NO</th>
                  <th class="py-3 px-4">Plant Name</th>
                  <th class="py-3 px-4">Audit Name</th>
                  <th class="py-3 px-4">Audit Type</th>
                  <th class="py-3 px-4">Certification Authority</th>
                  <th class="py-3 px-4">Registration Number</th>
                  <th class="py-3 px-4">Certification Number</th>
                  <th class="py-3 px-4">Audit Start Date</th>
                  <th class="py-3 px-4">Audit End Date</th>
                  <th class="py-3 px-4">Audit Program</th>
                  <th class="py-3 px-4">Issued On</th>
                  <th class="py-3 px-4">Valid Upto</th>
                  <th class="py-3 px-4">Renewal Date</th>
                  <th class="py-3 px-4 text-center">Audit Grade</th>
                </tr>
              </thead>
              <tbody id="farm-audit-tbody" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B] whitespace-nowrap">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.renderFarmAuditTableRows();
  },

  renderFarmAuditTableRows(data) {
    const list = data || this.farmMillAuditList;
    const tbody = document.getElementById('farm-audit-tbody');
    if (!tbody) return;

    const counter = document.getElementById('farm-audit-counter');
    if (counter) counter.innerText = `Showing ${list.length} records`;

    tbody.innerHTML = list.map((r, i) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${i % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 font-bold text-[#006C7A]">${r.plantName}</td>
        <td class="py-3 px-4 text-[#334155] font-semibold">${r.auditName}</td>
        <td class="py-3 px-4"><span class="inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${r.auditType === 'FOOD' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}">${r.auditType}</span></td>
        <td class="py-3 px-4 text-[#475569] font-medium">${r.certAuthority}</td>
        <td class="py-3 px-4 font-mono text-[#334155]">${r.regNumber}</td>
        <td class="py-3 px-4 font-mono text-[#006C7A] font-semibold">${r.certNumber}</td>
        <td class="py-3 px-4 text-[#64748B] font-mono">${r.startDate}</td>
        <td class="py-3 px-4 text-[#64748B] font-mono">${r.endDate}</td>
        <td class="py-3 px-4 text-[#334155] font-medium">${r.program}</td>
        <td class="py-3 px-4 text-[#64748B] font-mono">${r.issuedOn}</td>
        <td class="py-3 px-4 text-[#64748B] font-mono">${r.validUpto}</td>
        <td class="py-3 px-4 text-[#64748B] font-mono">${r.renewalDate}</td>
        <td class="py-3 px-4 text-center">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${r.grade}</span>
        </td>
      </tr>
    `).join('');
  },

  handleFarmAuditSearch(q) {
    const query = (q || '').toLowerCase().trim();
    if (!query) {
      this.renderFarmAuditTableRows(this.farmMillAuditList);
      return;
    }
    const filtered = this.farmMillAuditList.filter(r =>
      r.plantName.toLowerCase().includes(query) ||
      r.auditName.toLowerCase().includes(query) ||
      r.certAuthority.toLowerCase().includes(query) ||
      r.certNumber.toLowerCase().includes(query)
    );
    this.renderFarmAuditTableRows(filtered);
  },

  handleFarmAuditFilter() {
    const plant = document.getElementById('farm-audit-filter-plant')?.value || 'Select';
    let list = this.farmMillAuditList;
    if (plant !== 'Select') {
      list = list.filter(r => r.plantName.toLowerCase().includes(plant.toLowerCase()));
    }
    this.renderFarmAuditTableRows(list);
  },

  openAddFarmAuditModal() {
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: 'ADD PLANT & AUDIT CERTIFICATION',
      size: 'xl',
      content: `
        <form class="space-y-4 text-xs text-[#1E293B]" onsubmit="event.preventDefault(); QCView.handleAddFarmAuditSubmit();">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">PLANT NAME <span class="text-rose-500">*</span></label>
              <select id="modal-audit-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
                <option value="DFL UNIT-5 (JPT)" selected>DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                <option value="DFL UNIT-1">DFL UNIT-1</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT NAME <span class="text-rose-500">*</span></label>
              <input type="text" id="modal-audit-name" value="APCB" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT TYPE</label>
              <select id="modal-audit-type" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
                <option value="SOCIAL" selected>SOCIAL</option>
                <option value="FOOD">FOOD</option>
                <option value="ENVIRONMENTAL">ENVIRONMENTAL</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">CERTIFICATION AUTHORITY</label>
              <input type="text" id="modal-audit-auth" value="MPEDA / PCB" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">REGISTRATION NUMBER</label>
              <input type="text" id="modal-audit-reg" placeholder="e.g. 89765" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">CERTIFICATION NUMBER</label>
              <input type="text" id="modal-audit-cert" placeholder="e.g. 3456" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT START DATE</label>
              <input type="date" id="modal-audit-start" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT END DATE</label>
              <input type="date" id="modal-audit-end" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">AUDIT GRADE</label>
              <select id="modal-audit-grade" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
                <option value="GradeA" selected>GradeA</option>
                <option value="GradeA+">GradeA+</option>
                <option value="GradeB">GradeB</option>
              </select>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-[#F1F5F9]">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if(m && m.close) m.close();" class="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
              Cancel
            </button>
            <button type="submit" class="px-6 py-2.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Save Audit</span>
            </button>
          </div>
        </form>
      `
    });
  },

  handleAddFarmAuditSubmit() {
    const plant = document.getElementById('modal-audit-plant')?.value || 'DFL UNIT-5 (JPT)';
    const name = document.getElementById('modal-audit-name')?.value || 'APCB';
    const type = document.getElementById('modal-audit-type')?.value || 'SOCIAL';
    const auth = document.getElementById('modal-audit-auth')?.value || 'Authority1';
    const reg = document.getElementById('modal-audit-reg')?.value || '12345';
    const cert = document.getElementById('modal-audit-cert')?.value || '67890';
    const grade = document.getElementById('modal-audit-grade')?.value || 'GradeA';

    this.farmMillAuditList.unshift({
      sNo: this.farmMillAuditList.length + 1,
      plantName: plant,
      auditName: name,
      auditType: type,
      certAuthority: auth,
      regNumber: reg,
      certNumber: cert,
      startDate: '26-10-2026',
      endDate: '28-10-2026',
      program: 'Announced',
      issuedOn: '26-10-2026',
      validUpto: '26-10-2027',
      renewalDate: '27-10-2027',
      grade: grade
    });

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : window.Modal;
    if (m && m.close) m.close();

    this.renderFarmAuditTableRows();
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Plant Audit record saved successfully!', 'success');
    }
  },

  // ==========================================
  // 10. CHEMICAL SCREENING: TAB 3 - HATCHERY LIST
  // ==========================================
  hatcheryListData: [
    { sNo: 1, name: 'DeviFishires Hatchry-1', location: 'Kakinada', capacity: '5 Tonnes' },
    { sNo: 2, name: 'DeviFishires Hatchry-2', location: 'Uppada', capacity: '3 Tonnes' }
  ],

  renderHatcheryList(container, activeHash) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">HATCHERY LIST</h2>
            <span class="text-xs text-[#64748B] font-medium hidden sm:inline">Chemical Screening &bull; Registered Aquaculture Hatchery Sources &amp; Capacities</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="QCView.openAddHatcheryModal()" class="px-5 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Hatchery</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <div class="relative w-full sm:w-72">
              <input type="text" id="hatchery-search-input" onkeyup="QCView.handleHatcherySearch(this.value)" placeholder="Search hatchery by name, location..." class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] focus:ring-1 focus:ring-[#02a8b5] transition-all"/>
              <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" onclick="const s = document.getElementById('hatchery-search-input'); if(s) s.focus();" class="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#006C7A] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                <span>More Search</span>
              </button>
              <button type="button" onclick="QCView.renderHatcheryTableRows(QCView.hatcheryListData)" class="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#006C7A] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#02a8b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Load All</span>
              </button>
              <button type="button" onclick="QCView.downloadHatcheryExcel()" class="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-emerald-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                <span>Download Excel</span>
              </button>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none">
                  <th class="py-3 px-4">S.No</th>
                  <th class="py-3 px-4">Hatchery Name</th>
                  <th class="py-3 px-4">Hatchery Location</th>
                  <th class="py-3 px-4">Hatchery Capacity</th>
                  <th class="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="hatchery-table-body" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B]">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.renderHatcheryTableRows();
  },

  renderHatcheryTableRows(data) {
    const list = data || this.hatcheryListData;
    const tbody = document.getElementById('hatchery-table-body');
    if (!tbody) return;

    tbody.innerHTML = list.map((r, i) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${i % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 font-bold text-[#006C7A] hover:underline cursor-pointer" onclick="QCView.openEditHatcheryModal(${r.sNo})">${r.name}</td>
        <td class="py-3 px-4 text-[#334155] font-medium">${r.location}</td>
        <td class="py-3 px-4 text-[#475569] font-semibold">${r.capacity}</td>
        <td class="py-3 px-4 text-center">
          <button type="button" onclick="QCView.openEditHatcheryModal(${r.sNo})" class="p-1.5 text-[#02a8b5] hover:text-[#006C7A] hover:bg-[#02a8b5]/10 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center" title="Edit Hatchery">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  handleHatcherySearch(q) {
    const query = (q || '').toLowerCase().trim();
    if (!query) {
      this.renderHatcheryTableRows(this.hatcheryListData);
      return;
    }
    const filtered = this.hatcheryListData.filter(r =>
      r.name.toLowerCase().includes(query) ||
      r.location.toLowerCase().includes(query) ||
      r.capacity.toLowerCase().includes(query)
    );
    this.renderHatcheryTableRows(filtered);
  },

  openAddHatcheryModal() {
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: 'ADD HATCHERY',
      size: 'md',
      content: `
        <form class="space-y-4 text-xs text-[#1E293B]" onsubmit="event.preventDefault(); QCView.handleAddHatcherySubmit();">
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">HATCHERY NAME <span class="text-rose-500">*</span></label>
            <input type="text" id="modal-hatchery-name" placeholder="e.g. DeviFishires Hatchry-3" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">HATCHERY LOCATION <span class="text-rose-500">*</span></label>
            <input type="text" id="modal-hatchery-location" placeholder="e.g. Bapatla, Andhra Pradesh" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">HATCHERY CAPACITY <span class="text-rose-500">*</span></label>
            <input type="text" id="modal-hatchery-capacity" placeholder="e.g. 4 Tonnes" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
          </div>
          <div class="flex items-center justify-end gap-3 pt-3 border-t border-[#F1F5F9]">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if(m && m.close) m.close();" class="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
              Cancel
            </button>
            <button type="submit" class="px-6 py-2.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Save Hatchery</span>
            </button>
          </div>
        </form>
      `
    });
  },

  handleAddHatcherySubmit() {
    const name = document.getElementById('modal-hatchery-name')?.value || 'New Hatchery';
    const loc = document.getElementById('modal-hatchery-location')?.value || 'Andhra Pradesh';
    const cap = document.getElementById('modal-hatchery-capacity')?.value || '1 Tonne';

    this.hatcheryListData.push({
      sNo: this.hatcheryListData.length + 1,
      name: name,
      location: loc,
      capacity: cap
    });

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : window.Modal;
    if (m && m.close) m.close();

    this.renderHatcheryTableRows();
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Hatchery added successfully!', 'success');
    }
  },

  openEditHatcheryModal(sNo) {
    const h = this.hatcheryListData.find(item => item.sNo === sNo);
    if (!h) return;

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    m.open({
      title: `EDIT HATCHERY: ${h.name}`,
      size: 'md',
      content: `
        <form class="space-y-4 text-xs text-[#1E293B]" onsubmit="event.preventDefault(); QCView.handleEditHatcherySubmit(${h.sNo});">
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">HATCHERY NAME</label>
            <input type="text" id="modal-edit-hatchery-name" value="${h.name}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">HATCHERY LOCATION</label>
            <input type="text" id="modal-edit-hatchery-location" value="${h.location}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">HATCHERY CAPACITY</label>
            <input type="text" id="modal-edit-hatchery-capacity" value="${h.capacity}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs">
          </div>
          <div class="flex items-center justify-end gap-3 pt-3 border-t border-[#F1F5F9]">
            <button type="button" onclick="const m = (typeof Modal !== 'undefined' && Modal.close) ? Modal : window.Modal; if(m && m.close) m.close();" class="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-lg transition-colors cursor-pointer">
              Close
            </button>
            <button type="submit" class="px-6 py-2.5 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <span>Update Details</span>
            </button>
          </div>
        </form>
      `
    });
  },

  handleEditHatcherySubmit(sNo) {
    const h = this.hatcheryListData.find(item => item.sNo === sNo);
    if (!h) return;
    const name = document.getElementById('modal-edit-hatchery-name')?.value || h.name;
    const loc = document.getElementById('modal-edit-hatchery-location')?.value || h.location;
    const cap = document.getElementById('modal-edit-hatchery-capacity')?.value || h.capacity;

    h.name = name;
    h.location = loc;
    h.capacity = cap;

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : window.Modal;
    if (m && m.close) m.close();

    this.renderHatcheryTableRows();
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Hatchery details updated successfully!', 'success');
    }
  },

  downloadHatcheryExcel() {
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Hatchery List exported to Excel (.xlsx)', 'success');
    }
  }
'''

for filepath in ['js/views/qcView.js', 'miledeep-devi-fisheries.html', 'standalone.html']:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update chemical-screening in HTML files if found
    if filepath != 'js/views/qcView.js':
        if old_chem.search(content):
            content = old_chem.sub(new_chem, content)
            print(f"✓ Updated chemical-screening nav hierarchy in {filepath}")

    # 2. Update QCView.render() branching
    old_branch = '''    } else if (subPage === 'documentation' || subPage === 'qc-documentation' || subPage === 'qc-operations') {
      this.renderDocumentation(subContainer, activeHash);
    } else if (subPage === 'qc-orders' || subPage === 'orders') {
      this.renderQCOrders(subContainer, activeHash);'''

    if old_branch in content and 'renderFoodSocialAudit' not in content:
        content = content.replace(old_branch, BRANCHING_UPDATE)
        print(f"✓ Updated QCView.render branching in {filepath}")

    # 3. Add methods before the end of QCView
    end_marker = '''        </div>
      </div>
    `;
  }

};'''
    if end_marker in content and 'renderFoodSocialAudit' not in content:
        replacement = '''        </div>
      </div>
    `;
  },
''' + CHEMICAL_SCREENING_METHODS + '''

};'''
        content = content.replace(end_marker, replacement, 1)
        print(f"✓ Added Chemical Screening methods in {filepath}")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Finished applying Chemical Screening tab menus!")
