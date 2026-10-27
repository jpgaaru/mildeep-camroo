// Quality Control — QC Audits Submodule
// Implements 5 Dedicated Audit Views:
// 1. Food Audit List
// 2. Social Audit List
// 3. Farm Audit List
// 4. Hatchery Audit List
// 5. Feed Mill Audit List

export const qcAudits = {
  // Shared Plants & Years
  auditPlants: ['DFL UNIT-1 (VSP)', 'DFL UNIT-3 (PSP)', 'DFL UNIT-5 (JPT)'],
  auditYears: ['2026-2027', '2025-2026', '2024-2025'],

  // =========================================================================
  // DATA STORES
  // =========================================================================
  foodAuditData: [
    {
      id: 'FA-01',
      sNo: 1,
      plant: 'DFL UNIT-5 (JPT)',
      auditName: 'Food Audit',
      grade: '',
      startDate: '06-10-2026',
      endDate: '08-10-2026',
      renewalDate: '',
      validityDate: '11-10-2026',
      paymentStatus: '-',
      status: 'Active',
      statusClass: 'bg-amber-100 text-amber-800 border border-amber-300'
    },
    {
      id: 'FA-02',
      sNo: 2,
      plant: 'DFL UNIT-1 (VSP)',
      auditName: 'Food Audit',
      grade: '125',
      startDate: '09-10-2026',
      endDate: '09-10-2026',
      renewalDate: '',
      validityDate: '09-10-2026',
      paymentStatus: '-',
      status: 'Active',
      statusClass: 'bg-amber-100 text-amber-800 border border-amber-300'
    },
    {
      id: 'FA-03',
      sNo: 3,
      plant: 'DFL UNIT-1 (VSP)',
      auditName: 'SOCIAL AUDIT',
      grade: '125',
      startDate: '02-10-2026',
      endDate: '02-10-2026',
      renewalDate: '08-10-2026',
      validityDate: '09-10-2026',
      paymentStatus: 'Pending',
      status: 'Active',
      statusClass: 'bg-red-500 text-white font-bold'
    }
  ],

  socialAuditData: [
    {
      id: 'SA-01',
      sNo: 1,
      plant: 'DFL UNIT-5 (JPT)',
      auditName: 'SMETA 4-Pillar Social Audit',
      grade: 'Grade A',
      startDate: '12-09-2026',
      endDate: '14-09-2026',
      renewalDate: '14-09-2027',
      validityDate: '15-09-2027',
      paymentStatus: 'Completed',
      status: 'Active',
      statusClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300'
    },
    {
      id: 'SA-02',
      sNo: 2,
      plant: 'DFL UNIT-3 (PSP)',
      auditName: 'SA8000 Social Accountability',
      grade: 'Certified',
      startDate: '01-08-2026',
      endDate: '03-08-2026',
      renewalDate: '01-08-2027',
      validityDate: '05-08-2027',
      paymentStatus: 'Completed',
      status: 'Active',
      statusClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300'
    }
  ],

  farmAuditData: [
    {
      id: 'FMA-01',
      sNo: 1,
      plant: 'DFL UNIT-5 (JPT)',
      farmName: 'Balaji Aqua Farm Cluster 1',
      farmerName: 'M. Satyanarayana',
      auditDate: '15-10-2026',
      renewalDate: '15-10-2027',
      validityDate: '20-10-2027',
      paymentStatus: 'Paid',
      status: 'Active',
      statusClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300'
    },
    {
      id: 'FMA-02',
      sNo: 2,
      plant: 'DFL UNIT-1 (VSP)',
      farmName: 'Sri Rama Aqua Zone Pond 4',
      farmerName: 'K. Balarama Raju',
      auditDate: '22-09-2026',
      renewalDate: '22-09-2027',
      validityDate: '28-09-2027',
      paymentStatus: 'Pending',
      status: 'Active',
      statusClass: 'bg-amber-100 text-amber-800 border border-amber-300'
    }
  ],

  hatcheryAuditData: [
    {
      id: 'HA-01',
      sNo: 1,
      plant: 'DFL UNIT-5 (JPT)',
      hatcheryName: 'Devi Fisheries Hatchery-1',
      hatcheryLocation: 'Kakinada Coast',
      auditDate: '18-08-2026',
      renewalDate: '18-08-2027',
      validityDate: '25-08-2027',
      remarks: 'SPF Broodstock Verified (CAA/MPEDA Compliant)',
      paymentStatus: 'Paid',
      status: 'Active',
      statusClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300'
    },
    {
      id: 'HA-02',
      sNo: 2,
      plant: 'DFL UNIT-3 (PSP)',
      hatcheryName: 'Devi Fisheries Hatchery-2',
      hatcheryLocation: 'Uppada Coastal Zone',
      auditDate: '04-09-2026',
      renewalDate: '04-09-2027',
      validityDate: '10-09-2027',
      remarks: 'Post-Larvae Screening Passed 100%',
      paymentStatus: 'Paid',
      status: 'Active',
      statusClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300'
    }
  ],

  feedMillAuditData: [
    {
      id: 'FMA-01',
      sNo: 1,
      plant: 'DFL UNIT-5 (JPT)',
      auditName: 'BAP 4-Star Certified Feed Quality Audit',
      farmerLocation: 'Bhimavaram Feed Processing Plant',
      auditDate: '02-10-2026',
      renewalDate: '02-10-2027',
      validityDate: '10-10-2027',
      paymentStatus: 'Paid',
      status: 'Active',
      statusClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300'
    },
    {
      id: 'FMA-02',
      sNo: 2,
      plant: 'DFL UNIT-1 (VSP)',
      auditName: 'Antibiotic-Free Raw Material Verification',
      farmerLocation: 'Anakapalli Feed Terminal',
      auditDate: '20-09-2026',
      renewalDate: '20-09-2027',
      validityDate: '30-09-2027',
      paymentStatus: 'Pending',
      status: 'Active',
      statusClass: 'bg-amber-100 text-amber-800 border border-amber-300'
    }
  ],

  // =========================================================================
  // VIEW RENDERERS (MATCHING USER SCREENSHOTS)
  // =========================================================================

  // 1. FOOD AUDIT LIST
  renderFoodAuditList(container, activeHash) {
    container.innerHTML = this.buildAuditViewTemplate({
      title: 'FOOD AUDIT LIST',
      type: 'food',
      addBtnLabel: '+ Add Food Audit',
      onAdd: 'QCView.openAddAuditModal(\'food\')',
      tableHeaders: ['S.No', 'Production Plant', 'Name of Audit', 'Grade/Score', 'Audit Start Date', 'Audit End Date', 'Renewal Date', 'Validity Date', 'Payment Status', 'Status', 'Actions'],
      dataLength: this.foodAuditData.length
    });
    this.renderFoodAuditRows();
  },

  renderFoodAuditRows(filteredData = null) {
    const list = filteredData || this.foodAuditData;
    const tbody = document.getElementById('audit-table-tbody');
    const counter = document.getElementById('audit-table-counter');
    if (!tbody) return;

    if (counter) {
      counter.textContent = list.length === 0 ? 'Showing 1 to 0 out of 0 entries' : `Showing 1 to ${list.length} out of ${list.length} entries`;
    }

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="11" class="text-center py-8 text-slate-400 font-medium">No data available in table</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map((r, i) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${i % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 text-[#334155] font-semibold">${r.plant}</td>
        <td class="py-3 px-4 text-[#1E293B] font-medium">${r.auditName}</td>
        <td class="py-3 px-4 text-center font-bold text-[#006C7A]">${r.grade || ''}</td>
        <td class="py-3 px-4 font-mono text-[#475569]">${r.startDate || ''}</td>
        <td class="py-3 px-4 font-mono text-[#475569]">${r.endDate || ''}</td>
        <td class="py-3 px-4 font-mono text-[#64748B]">${r.renewalDate || ''}</td>
        <td class="py-3 px-4 font-mono text-[#0F172A] font-semibold">${r.validityDate || ''}</td>
        <td class="py-3 px-4 text-center">
          ${r.paymentStatus === 'Pending' 
            ? '<span class="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-600 text-white">Pending</span>' 
            : r.paymentStatus === 'Completed' || r.paymentStatus === 'Paid'
            ? '<span class="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">Paid</span>'
            : '<span class="text-slate-400 font-bold">-</span>'}
        </td>
        <td class="py-3 px-4 text-center">
          <span class="inline-flex px-3 py-0.5 rounded-full text-[11px] font-bold ${r.statusClass || 'bg-amber-100 text-amber-800'}">${r.status}</span>
        </td>
        <td class="py-3 px-4 text-right whitespace-nowrap">
          <div class="inline-flex items-center gap-1.5">
            <button type="button" onclick="QCView.viewAuditDetail('food', '${r.id}')" class="p-1 text-slate-400 hover:text-[#006C7A] transition-colors" title="View Details">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <button type="button" onclick="QCView.editAuditItem('food', '${r.id}')" class="p-1 text-slate-400 hover:text-blue-600 transition-colors" title="Edit Record">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
            </button>
            <button type="button" onclick="QCView.deleteAuditItem('food', '${r.id}')" class="p-1 text-slate-400 hover:text-rose-600 transition-colors" title="Delete Record">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  // 2. SOCIAL AUDIT LIST
  renderSocialAuditList(container, activeHash) {
    container.innerHTML = this.buildAuditViewTemplate({
      title: 'SOCIAL AUDIT LIST',
      type: 'social',
      addBtnLabel: '+ Add Social Audit',
      onAdd: 'QCView.openAddAuditModal(\'social\')',
      tableHeaders: ['S.No', 'Production Plant', 'Audit Name', 'Grade/Score', 'Audit Start Date', 'Audit End Date', 'Renewal Date', 'Validity Date', 'Payment Status', 'Status', 'Actions'],
      dataLength: this.socialAuditData.length
    });
    this.renderSocialAuditRows();
  },

  renderSocialAuditRows(filteredData = null) {
    const list = filteredData || this.socialAuditData;
    const tbody = document.getElementById('audit-table-tbody');
    const counter = document.getElementById('audit-table-counter');
    if (!tbody) return;

    if (counter) {
      counter.textContent = list.length === 0 ? 'Showing 1 to 0 out of 0 entries' : `Showing 1 to ${list.length} out of ${list.length} entries`;
    }

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="11" class="text-center py-8 text-slate-400 font-medium">No data available in table</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map((r, i) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${i % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 text-[#334155] font-semibold">${r.plant}</td>
        <td class="py-3 px-4 text-[#1E293B] font-medium">${r.auditName}</td>
        <td class="py-3 px-4 text-center font-bold text-[#006C7A]">${r.grade || ''}</td>
        <td class="py-3 px-4 font-mono text-[#475569]">${r.startDate || ''}</td>
        <td class="py-3 px-4 font-mono text-[#475569]">${r.endDate || ''}</td>
        <td class="py-3 px-4 font-mono text-[#64748B]">${r.renewalDate || ''}</td>
        <td class="py-3 px-4 font-mono text-[#0F172A] font-semibold">${r.validityDate || ''}</td>
        <td class="py-3 px-4 text-center">
          <span class="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold ${r.paymentStatus === 'Paid' || r.paymentStatus === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-500 text-white'}">${r.paymentStatus}</span>
        </td>
        <td class="py-3 px-4 text-center">
          <span class="inline-flex px-3 py-0.5 rounded-full text-[11px] font-bold ${r.statusClass || 'bg-emerald-100 text-emerald-800'}">${r.status}</span>
        </td>
        <td class="py-3 px-4 text-right whitespace-nowrap">
          <div class="inline-flex items-center gap-1.5">
            <button type="button" onclick="QCView.editAuditItem('social', '${r.id}')" class="p-1 text-slate-400 hover:text-blue-600 transition-colors" title="Edit">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
            </button>
            <button type="button" onclick="QCView.deleteAuditItem('social', '${r.id}')" class="p-1 text-slate-400 hover:text-rose-600 transition-colors" title="Delete">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  // 3. FARM AUDIT LIST
  renderFarmAuditList(container, activeHash) {
    container.innerHTML = this.buildAuditViewTemplate({
      title: 'FARM AUDIT LIST',
      type: 'farm',
      addBtnLabel: '+ Add Farm Audit',
      onAdd: 'QCView.openAddAuditModal(\'farm\')',
      tableHeaders: ['S.No', 'Production Plant', 'Farm Name', 'Farmer Name', 'Audit Date', 'Renewal Date', 'Validity Date', 'Payment Status', 'Status', 'Actions'],
      dataLength: this.farmAuditData.length
    });
    this.renderFarmAuditRows();
  },

  renderFarmAuditRows(filteredData = null) {
    const list = filteredData || this.farmAuditData;
    const tbody = document.getElementById('audit-table-tbody');
    const counter = document.getElementById('audit-table-counter');
    if (!tbody) return;

    if (counter) {
      counter.textContent = list.length === 0 ? 'Showing 1 to 0 out of 0 entries' : `Showing 1 to ${list.length} out of ${list.length} entries`;
    }

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="10" class="text-center py-8 text-slate-400 font-medium">No data available in table</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map((r, i) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${i % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 text-[#334155] font-semibold">${r.plant}</td>
        <td class="py-3 px-4 text-[#1E293B] font-medium">${r.farmName}</td>
        <td class="py-3 px-4 text-[#1E293B] font-semibold">${r.farmerName}</td>
        <td class="py-3 px-4 font-mono text-[#475569]">${r.auditDate}</td>
        <td class="py-3 px-4 font-mono text-[#64748B]">${r.renewalDate}</td>
        <td class="py-3 px-4 font-mono text-[#0F172A] font-semibold">${r.validityDate}</td>
        <td class="py-3 px-4 text-center">
          <span class="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold ${r.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-500 text-white'}">${r.paymentStatus}</span>
        </td>
        <td class="py-3 px-4 text-center">
          <span class="inline-flex px-3 py-0.5 rounded-full text-[11px] font-bold ${r.statusClass || 'bg-emerald-100 text-emerald-800'}">${r.status}</span>
        </td>
        <td class="py-3 px-4 text-right whitespace-nowrap">
          <div class="inline-flex items-center gap-1.5">
            <button type="button" onclick="QCView.editAuditItem('farm', '${r.id}')" class="p-1 text-slate-400 hover:text-blue-600 transition-colors" title="Edit">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
            </button>
            <button type="button" onclick="QCView.deleteAuditItem('farm', '${r.id}')" class="p-1 text-slate-400 hover:text-rose-600 transition-colors" title="Delete">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  // 4. HATCHERY AUDIT LIST
  renderHatcheryAuditList(container, activeHash) {
    container.innerHTML = this.buildAuditViewTemplate({
      title: 'HATCHERY AUDIT LIST',
      type: 'hatchery',
      addBtnLabel: '+ Add Hatchery Audit',
      onAdd: 'QCView.openAddAuditModal(\'hatchery\')',
      tableHeaders: ['S.No', 'Production Plant', 'Hatchery Name', 'Hatchery Location', 'Audit Date', 'Renewal Date', 'Validity Date', 'Remarks', 'Payment Status', 'Status', 'Actions'],
      dataLength: this.hatcheryAuditData.length
    });
    this.renderHatcheryAuditRows();
  },

  renderHatcheryAuditRows(filteredData = null) {
    const list = filteredData || this.hatcheryAuditData;
    const tbody = document.getElementById('audit-table-tbody');
    const counter = document.getElementById('audit-table-counter');
    if (!tbody) return;

    if (counter) {
      counter.textContent = list.length === 0 ? 'Showing 1 to 0 out of 0 entries' : `Showing 1 to ${list.length} out of ${list.length} entries`;
    }

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="11" class="text-center py-8 text-slate-400 font-medium">No data available in table</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map((r, i) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${i % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 text-[#334155] font-semibold">${r.plant}</td>
        <td class="py-3 px-4 text-[#1E293B] font-medium">${r.hatcheryName}</td>
        <td class="py-3 px-4 text-[#64748B]">${r.hatcheryLocation}</td>
        <td class="py-3 px-4 font-mono text-[#475569]">${r.auditDate}</td>
        <td class="py-3 px-4 font-mono text-[#64748B]">${r.renewalDate}</td>
        <td class="py-3 px-4 font-mono text-[#0F172A] font-semibold">${r.validityDate}</td>
        <td class="py-3 px-4 text-xs text-[#475569] max-w-xs truncate" title="${r.remarks}">${r.remarks}</td>
        <td class="py-3 px-4 text-center">
          <span class="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold ${r.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-500 text-white'}">${r.paymentStatus}</span>
        </td>
        <td class="py-3 px-4 text-center">
          <span class="inline-flex px-3 py-0.5 rounded-full text-[11px] font-bold ${r.statusClass || 'bg-emerald-100 text-emerald-800'}">${r.status}</span>
        </td>
        <td class="py-3 px-4 text-right whitespace-nowrap">
          <div class="inline-flex items-center gap-1.5">
            <button type="button" onclick="QCView.editAuditItem('hatchery', '${r.id}')" class="p-1 text-slate-400 hover:text-blue-600 transition-colors" title="Edit">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
            </button>
            <button type="button" onclick="QCView.deleteAuditItem('hatchery', '${r.id}')" class="p-1 text-slate-400 hover:text-rose-600 transition-colors" title="Delete">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  // 5. FEED MILL AUDIT LIST
  renderFeedMillAuditList(container, activeHash) {
    container.innerHTML = this.buildAuditViewTemplate({
      title: 'FEED MILL AUDIT LIST',
      type: 'feedmill',
      addBtnLabel: '+ Add Feed Mill Audit',
      onAdd: 'QCView.openAddAuditModal(\'feedmill\')',
      tableHeaders: ['S.No', 'Production Plant', 'Audit Name', 'Farmer Location', 'Audit Date', 'Renewal Date', 'Validity Date', 'Payment Status', 'Status', 'Actions'],
      dataLength: this.feedMillAuditData.length
    });
    this.renderFeedMillAuditRows();
  },

  renderFeedMillAuditRows(filteredData = null) {
    const list = filteredData || this.feedMillAuditData;
    const tbody = document.getElementById('audit-table-tbody');
    const counter = document.getElementById('audit-table-counter');
    if (!tbody) return;

    if (counter) {
      counter.textContent = list.length === 0 ? 'Showing 1 to 0 out of 0 entries' : `Showing 1 to ${list.length} out of ${list.length} entries`;
    }

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="10" class="text-center py-8 text-slate-400 font-medium">No data available in table</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map((r, i) => `
      <tr class="hover:bg-[#F8FAFC] transition-colors ${i % 2 === 1 ? 'bg-slate-50/40' : ''}">
        <td class="py-3 px-4 font-bold text-[#1E293B]">${r.sNo}</td>
        <td class="py-3 px-4 text-[#334155] font-semibold">${r.plant}</td>
        <td class="py-3 px-4 text-[#1E293B] font-medium">${r.auditName}</td>
        <td class="py-3 px-4 text-[#64748B]">${r.farmerLocation}</td>
        <td class="py-3 px-4 font-mono text-[#475569]">${r.auditDate}</td>
        <td class="py-3 px-4 font-mono text-[#64748B]">${r.renewalDate}</td>
        <td class="py-3 px-4 font-mono text-[#0F172A] font-semibold">${r.validityDate}</td>
        <td class="py-3 px-4 text-center">
          <span class="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold ${r.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-500 text-white'}">${r.paymentStatus}</span>
        </td>
        <td class="py-3 px-4 text-center">
          <span class="inline-flex px-3 py-0.5 rounded-full text-[11px] font-bold ${r.statusClass || 'bg-emerald-100 text-emerald-800'}">${r.status}</span>
        </td>
        <td class="py-3 px-4 text-right whitespace-nowrap">
          <div class="inline-flex items-center gap-1.5">
            <button type="button" onclick="QCView.editAuditItem('feedmill', '${r.id}')" class="p-1 text-slate-400 hover:text-blue-600 transition-colors" title="Edit">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
            </button>
            <button type="button" onclick="QCView.deleteAuditItem('feedmill', '${r.id}')" class="p-1 text-slate-400 hover:text-rose-600 transition-colors" title="Delete">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  // =========================================================================
  // SHARED VIEW BUILDER
  // =========================================================================
  buildAuditViewTemplate({ title, type, addBtnLabel, onAdd, tableHeaders, dataLength }) {
    const plants = this.auditPlants;
    const years = this.auditYears;

    return `
      <div class="space-y-4 animate-fade-in text-[#1E293B] pb-12 font-sans">
        <!-- Breadcrumb / Header Title -->
        <div class="pb-1">
          <h2 class="text-sm md:text-base font-bold text-[#1E293B] tracking-wide uppercase">${title}</h2>
        </div>

        <!-- TOP CARD: FILTER BAR -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs p-5 md:p-6 transition-all">
          <form class="space-y-4" onsubmit="event.preventDefault(); QCView.handleAuditFilterSubmit('${type}');">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-2">PRODUCTION PLANT</label>
                <select id="audit-filter-plant" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  <option value="">Select</option>
                  ${plants.map(p => `<option value="${p}">${p}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-2">SELECT YEAR</label>
                <select id="audit-filter-year" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  ${years.map(y => `<option value="${y}" ${y === '2026-2027' ? 'selected' : ''}>${y}</option>`).join('')}
                </select>
              </div>
            </div>

            <!-- Filter Buttons: Search -> & + Add Audit -->
            <div class="flex items-center justify-center gap-3 pt-3">
              <button
                type="submit"
                class="px-6 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold text-xs rounded-full shadow-xs hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Search</span>
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
              </button>

              <button
                type="button"
                onclick="${onAdd}"
                class="px-6 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold text-xs rounded-full shadow-xs hover:shadow transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>${addBtnLabel}</span>
              </button>
            </div>
          </form>
        </div>

        <!-- BOTTOM CARD: DATA TABLE & ACTIONS -->
        <div class="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden">
          <!-- Table Toolbar -->
          <div class="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC]">
            <!-- Left: Search & Toggles -->
            <div class="flex flex-wrap items-center gap-2.5 flex-1 max-w-2xl">
              <div class="relative flex-1 min-w-[200px]">
                <input
                  type="text"
                  id="audit-live-search"
                  onkeyup="QCView.handleAuditLiveSearch('${type}', this.value)"
                  placeholder="Search..."
                  class="w-full pl-9 pr-4 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#02a8b5] transition-all"
                />
                <svg class="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>

              <!-- More Search Toggle Button -->
              <button
                type="button"
                onclick="QCView.toggleAuditMoreSearch()"
                class="px-3.5 py-1.5 rounded-lg border border-[#10B981] bg-white text-[#10B981] hover:bg-[#10B981]/5 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <span>More Search</span>
              </button>

              <!-- Load All Button -->
              <button
                type="button"
                onclick="QCView.handleAuditLoadAll('${type}')"
                class="px-3.5 py-1.5 rounded-lg border border-[#10B981] bg-white text-[#10B981] hover:bg-[#10B981]/5 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
                <span>Load All</span>
              </button>
            </div>

            <!-- Right: Download Excel Button -->
            <button
              type="button"
              onclick="QCView.exportAuditExcel('${type}')"
              class="px-4 py-1.5 rounded-lg border border-[#10B981] bg-white text-[#10B981] hover:bg-[#10B981]/5 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Download Excel</span>
            </button>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#475569] uppercase tracking-wider select-none whitespace-nowrap">
                  ${tableHeaders.map((th, idx) => `
                    <th class="py-3 px-4 ${th === 'Actions' ? 'text-right' : th === 'Payment Status' || th === 'Status' || th === 'Grade/Score' ? 'text-center' : ''}">
                      <div class="inline-flex items-center gap-1 cursor-pointer hover:text-[#006C7A]">
                        <span>${th}</span>
                        ${th !== 'Actions' ? '<svg class="w-2.5 h-2.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>' : ''}
                      </div>
                    </th>
                  `).join('')}
                </tr>
              </thead>
              <tbody id="audit-table-tbody" class="divide-y divide-[#F1F5F9] text-xs text-[#1E293B] whitespace-nowrap">
              </tbody>
            </table>
          </div>

          <!-- Table Footer -->
          <div class="p-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFC] text-xs text-[#64748B]">
            <span id="audit-table-counter" class="font-medium">Showing 1 to ${dataLength} out of ${dataLength} entries</span>
            <div class="flex items-center gap-1">
              <button type="button" class="w-7 h-7 rounded-full bg-[#3B82F6] text-white font-bold flex items-center justify-center text-xs shadow-xs">1</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // INTERACTIVE HANDLERS (SEARCH, FILTER, RESET, EXPORT)
  // =========================================================================

  handleAuditFilterSubmit(type) {
    const plant = document.getElementById('audit-filter-plant')?.value || '';
    const rawList = this.getAuditDataList(type);

    let filtered = rawList;
    if (plant) {
      filtered = filtered.filter(r => r.plant === plant);
    }

    this.refreshAuditTable(type, filtered);
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Filtered ${filtered.length} audit records`, 'info');
    }
  },

  handleAuditLiveSearch(type, query) {
    const q = (query || '').toLowerCase().trim();
    const rawList = this.getAuditDataList(type);

    if (!q) {
      this.refreshAuditTable(type, rawList);
      return;
    }

    const filtered = rawList.filter(r => {
      return Object.values(r).some(val => 
        String(val).toLowerCase().includes(q)
      );
    });

    this.refreshAuditTable(type, filtered);
  },

  handleAuditLoadAll(type) {
    const plantSelect = document.getElementById('audit-filter-plant');
    const searchInput = document.getElementById('audit-live-search');
    if (plantSelect) plantSelect.value = '';
    if (searchInput) searchInput.value = '';

    const rawList = this.getAuditDataList(type);
    this.refreshAuditTable(type, rawList);
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`All ${rawList.length} records loaded`, 'success');
    }
  },

  toggleAuditMoreSearch() {
    const plantSelect = document.getElementById('audit-filter-plant');
    if (plantSelect) {
      plantSelect.focus();
      plantSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Advanced filters active in top panel', 'info');
    }
  },

  exportAuditExcel(type) {
    const list = this.getAuditDataList(type);
    if (!list || list.length === 0) {
      if (typeof Toast !== 'undefined' && Toast.show) {
        Toast.show('No data available to export', 'warning');
      }
      return;
    }

    // Generate CSV
    const headers = Object.keys(list[0]).filter(k => k !== 'statusClass');
    const csvRows = [];
    csvRows.push(headers.join(','));

    list.forEach(row => {
      const values = headers.map(header => {
        const escaped = ('' + (row[header] || '')).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${type}_audit_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Excel CSV report downloaded successfully!', 'success');
    }
  },

  getAuditDataList(type) {
    switch (type) {
      case 'food': return this.foodAuditData;
      case 'social': return this.socialAuditData;
      case 'farm': return this.farmAuditData;
      case 'hatchery': return this.hatcheryAuditData;
      case 'feedmill': return this.feedMillAuditData;
      default: return [];
    }
  },

  refreshAuditTable(type, data) {
    switch (type) {
      case 'food': this.renderFoodAuditRows(data); break;
      case 'social': this.renderSocialAuditRows(data); break;
      case 'farm': this.renderFarmAuditRows(data); break;
      case 'hatchery': this.renderHatcheryAuditRows(data); break;
      case 'feedmill': this.renderFeedMillAuditRows(data); break;
    }
  },

  // =========================================================================
  // ADD & EDIT MODALS
  // =========================================================================

  openAddAuditModal(type) {
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    const todayStr = new Date().toISOString().slice(0, 10);
    const plants = this.auditPlants;

    let title = '';
    let formFields = '';

    if (type === 'food' || type === 'social') {
      const isFood = type === 'food';
      title = isFood ? 'ADD FOOD AUDIT' : 'ADD SOCIAL AUDIT';
      formFields = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-rose-500">*</span></label>
            <select id="modal-audit-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${plants.map(p => `<option value="${p}">${p}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">AUDIT NAME <span class="text-rose-500">*</span></label>
            <input type="text" id="modal-audit-name" placeholder="e.g. ${isFood ? 'Food Safety & Hygiene' : 'SMETA 4-Pillar'}" value="${isFood ? 'Food Audit' : 'SMETA Social Audit'}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">GRADE / SCORE</label>
            <input type="text" id="modal-audit-grade" placeholder="e.g. 125 or Grade A" value="125" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PAYMENT STATUS</label>
            <select id="modal-audit-payment" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="-" selected>-</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">AUDIT START DATE <span class="text-rose-500">*</span></label>
            <input type="date" id="modal-audit-start" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">AUDIT END DATE <span class="text-rose-500">*</span></label>
            <input type="date" id="modal-audit-end" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">RENEWAL DATE</label>
            <input type="date" id="modal-audit-renewal" value="" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">VALIDITY DATE <span class="text-rose-500">*</span></label>
            <input type="date" id="modal-audit-validity" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
        </div>
      `;
    } else if (type === 'farm') {
      title = 'ADD FARM AUDIT';
      formFields = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-rose-500">*</span></label>
            <select id="modal-audit-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${plants.map(p => `<option value="${p}">${p}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">FARM NAME <span class="text-rose-500">*</span></label>
            <input type="text" id="modal-farm-name" placeholder="e.g. Coastal Aqua Farm" value="Devi Coastal Farm A-1" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">FARMER NAME <span class="text-rose-500">*</span></label>
            <input type="text" id="modal-farmer-name" placeholder="e.g. P. Venkateswara Rao" value="P. Venkateswara Rao" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">AUDIT DATE <span class="text-rose-500">*</span></label>
            <input type="date" id="modal-audit-date" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">RENEWAL DATE</label>
            <input type="date" id="modal-audit-renewal" value="" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">VALIDITY DATE <span class="text-rose-500">*</span></label>
            <input type="date" id="modal-audit-validity" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
        </div>
      `;
    } else if (type === 'hatchery') {
      title = 'ADD HATCHERY AUDIT';
      formFields = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-rose-500">*</span></label>
            <select id="modal-audit-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${plants.map(p => `<option value="${p}">${p}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HATCHERY NAME <span class="text-rose-500">*</span></label>
            <input type="text" id="modal-hatchery-name" placeholder="e.g. Devi Fisheries Hatchery-3" value="Devi Fisheries Hatchery-3" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">HATCHERY LOCATION <span class="text-rose-500">*</span></label>
            <input type="text" id="modal-hatchery-loc" placeholder="e.g. Kakinada Coastal" value="Kakinada Coast" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">AUDIT DATE <span class="text-rose-500">*</span></label>
            <input type="date" id="modal-audit-date" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">VALIDITY DATE <span class="text-rose-500">*</span></label>
            <input type="date" id="modal-audit-validity" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">REMARKS</label>
            <input type="text" id="modal-hatchery-remarks" placeholder="Audit remarks..." value="SPF Broodstock Compliant" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
        </div>
      `;
    } else if (type === 'feedmill') {
      title = 'ADD FEED MILL AUDIT';
      formFields = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-rose-500">*</span></label>
            <select id="modal-audit-plant" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${plants.map(p => `<option value="${p}">${p}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">AUDIT NAME <span class="text-rose-500">*</span></label>
            <input type="text" id="modal-audit-name" placeholder="e.g. Certified Feed Mill Inspection" value="BAP Feed Mill Verification" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">FARMER / MILL LOCATION <span class="text-rose-500">*</span></label>
            <input type="text" id="modal-mill-loc" placeholder="e.g. Bhimavaram Mill Site" value="Bhimavaram Feed Zone" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">AUDIT DATE <span class="text-rose-500">*</span></label>
            <input type="date" id="modal-audit-date" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">VALIDITY DATE <span class="text-rose-500">*</span></label>
            <input type="date" id="modal-audit-validity" value="${todayStr}" required class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1.5">PAYMENT STATUS</label>
            <select id="modal-audit-payment" class="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="Paid" selected>Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      `;
    }

    m.open({
      title: title,
      size: '2xl',
      content: `
        <form id="modal-audit-form" class="space-y-4" onsubmit="event.preventDefault(); QCView.handleAuditFormSubmit('${type}');">
          ${formFields}
          <div class="flex items-center justify-end gap-3 pt-4">
            <button type="button" onclick="Modal.close()" class="px-5 py-2 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-bold text-xs rounded-full transition-colors cursor-pointer">
              Close
            </button>
            <button type="submit" class="px-6 py-2 bg-[#02a8b5] hover:bg-[#008f9a] text-white font-bold text-xs rounded-full shadow-xs hover:shadow transition-all inline-flex items-center gap-1.5 cursor-pointer">
              <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              <span>Save Audit</span>
            </button>
          </div>
        </form>
      `
    });

    setTimeout(() => {
      if (typeof window !== 'undefined' && window.CamarooControls && typeof window.CamarooControls.upgrade === 'function') {
        window.CamarooControls.upgrade(document.getElementById('erp-modal-root'));
      }
    }, 20);
  },

  handleAuditFormSubmit(type) {
    const plant = document.getElementById('modal-audit-plant')?.value || 'DFL UNIT-5 (JPT)';
    const list = this.getAuditDataList(type);

    if (type === 'food' || type === 'social') {
      const auditName = document.getElementById('modal-audit-name')?.value || 'Food Audit';
      const grade = document.getElementById('modal-audit-grade')?.value || '';
      const paymentStatus = document.getElementById('modal-audit-payment')?.value || '-';
      const startDate = document.getElementById('modal-audit-start')?.value || '';
      const endDate = document.getElementById('modal-audit-end')?.value || '';
      const renewalDate = document.getElementById('modal-audit-renewal')?.value || '';
      const validityDate = document.getElementById('modal-audit-validity')?.value || '';

      list.unshift({
        id: `${type.toUpperCase()}-${Date.now()}`,
        sNo: list.length + 1,
        plant,
        auditName,
        grade,
        startDate,
        endDate,
        renewalDate,
        validityDate,
        paymentStatus,
        status: 'Active',
        statusClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300'
      });
    } else if (type === 'farm') {
      const farmName = document.getElementById('modal-farm-name')?.value || 'Devi Aqua Farm';
      const farmerName = document.getElementById('modal-farmer-name')?.value || 'Farmer';
      const auditDate = document.getElementById('modal-audit-date')?.value || '';
      const renewalDate = document.getElementById('modal-audit-renewal')?.value || '';
      const validityDate = document.getElementById('modal-audit-validity')?.value || '';

      list.unshift({
        id: `FARM-${Date.now()}`,
        sNo: list.length + 1,
        plant,
        farmName,
        farmerName,
        auditDate,
        renewalDate,
        validityDate,
        paymentStatus: 'Paid',
        status: 'Active',
        statusClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300'
      });
    } else if (type === 'hatchery') {
      const hatcheryName = document.getElementById('modal-hatchery-name')?.value || 'Hatchery';
      const hatcheryLocation = document.getElementById('modal-hatchery-loc')?.value || 'Kakinada Coast';
      const auditDate = document.getElementById('modal-audit-date')?.value || '';
      const validityDate = document.getElementById('modal-audit-validity')?.value || '';
      const remarks = document.getElementById('modal-hatchery-remarks')?.value || 'Compliant';

      list.unshift({
        id: `HATCH-${Date.now()}`,
        sNo: list.length + 1,
        plant,
        hatcheryName,
        hatcheryLocation,
        auditDate,
        renewalDate: '',
        validityDate,
        remarks,
        paymentStatus: 'Paid',
        status: 'Active',
        statusClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300'
      });
    } else if (type === 'feedmill') {
      const auditName = document.getElementById('modal-audit-name')?.value || 'Feed Mill Inspection';
      const farmerLocation = document.getElementById('modal-mill-loc')?.value || 'Bhimavaram Feed Zone';
      const auditDate = document.getElementById('modal-audit-date')?.value || '';
      const validityDate = document.getElementById('modal-audit-validity')?.value || '';
      const paymentStatus = document.getElementById('modal-audit-payment')?.value || 'Paid';

      list.unshift({
        id: `MILL-${Date.now()}`,
        sNo: list.length + 1,
        plant,
        auditName,
        farmerLocation,
        auditDate,
        renewalDate: '',
        validityDate,
        paymentStatus,
        status: 'Active',
        statusClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300'
      });
    }

    if (typeof Modal !== 'undefined' && Modal.close) Modal.close();
    this.refreshAuditTable(type, list);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('New audit record created successfully!', 'success');
    }
  },

  deleteAuditItem(type, id) {
    if (!confirm('Are you sure you want to delete this audit record?')) return;
    const list = this.getAuditDataList(type);
    const idx = list.findIndex(r => r.id === id);
    if (idx !== -1) {
      list.splice(idx, 1);
      this.refreshAuditTable(type, list);
      if (typeof Toast !== 'undefined' && Toast.show) {
        Toast.show('Audit record deleted', 'info');
      }
    }
  },

  editAuditItem(type, id) {
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Edit dialogue opened for ${id}`, 'info');
    }
    this.openAddAuditModal(type);
  },

  viewAuditDetail(type, id) {
    const list = this.getAuditDataList(type);
    const item = list.find(r => r.id === id);
    if (!item) return;

    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : window.Modal;
    if (!m) return;

    m.open({
      title: `AUDIT RECORD DETAILS — ${item.plant || item.hatcheryName || item.auditName}`,
      size: 'xl',
      content: `
        <div class="space-y-4 text-xs text-[#1E293B]">
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
            ${Object.entries(item)
              .filter(([k]) => k !== 'statusClass' && k !== 'id')
              .map(([k, v]) => `
                <div>
                  <span class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">${k}</span>
                  <span class="font-semibold text-slate-800">${v || '-'}</span>
                </div>
              `).join('')}
          </div>
          <div class="flex justify-end pt-3">
            <button type="button" onclick="Modal.close()" class="px-5 py-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700">Close</button>
          </div>
        </div>
      `
    });
  }
};
