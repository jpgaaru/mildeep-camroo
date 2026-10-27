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

  currentModalPayments: [],

  openAddAuditModal(type) {
    const m = (typeof Modal !== 'undefined' && Modal.open) ? Modal : (typeof window !== 'undefined' && window.Modal && window.Modal.open) ? window.Modal : null;
    if (!m) return;

    this.currentModalPayments = [];
    const todayStr = new Date().toISOString().slice(0, 10);
    const plants = this.auditPlants;

    let breadcrumbList = '';
    let breadcrumbCreate = '';
    let formTitle = '';
    let formFields = '';

    const certifyingBodies = ['Select', 'BAP (Global Seafood Alliance)', 'SGS India', 'Bureau Veritas', 'DNV GL', 'TUV India', 'MPEDA', 'CAA Certified'];
    const checkedByList = ['Select', 'Dr. P. Sundaram (QC Lead)', 'R. Venkat (Senior QA Officer)', 'K. Ramesh (Lab Incharge)', 'A. Srinivasa Rao (Auditor)'];
    const verifiedByList = ['Select', 'V. Mohan Rao (QA Head)', 'S. Ramakrishna (Plant Manager)', 'Director Technical', 'Executive VP Operations'];
    const auditStatusList = ['Select', 'Approved', 'Scheduled', 'Completed', 'In Progress', 'Under Review'];

    if (type === 'feedmill') {
      breadcrumbList = 'Feed Mill Audit List';
      breadcrumbCreate = 'Feed Mill Audit Create';
      formTitle = 'FEED MILL AUDIT CREATE';
      formFields = `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-plant" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="">Select</option>
              ${plants.map(p => `<option value="${p}">${p}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">NAME OF AUDIT <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-name" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="">Select</option>
              <option value="BAP Feed Mill Verification" selected>BAP Feed Mill Verification</option>
              <option value="Aquafeed Quality Inspection">Aquafeed Quality Inspection</option>
              <option value="HACCP Feed Mill Audit">HACCP Feed Mill Audit</option>
              <option value="ISO 22000 Feed Safety">ISO 22000 Feed Safety</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">FARMER NAME <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-farmer" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="">Select</option>
              <option value="Bhimavaram Feed Processing Plant" selected>Bhimavaram Feed Processing Plant</option>
              <option value="Avanti Feeds Unit 2">Avanti Feeds Unit 2</option>
              <option value="Nellore Feeds Cluster">Nellore Feeds Cluster</option>
              <option value="Godrej Agrovet Mill">Godrej Agrovet Mill</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">CERTIFYING BODY <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-certbody" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${certifyingBodies.map(c => `<option value="${c}" ${c === 'BAP (Global Seafood Alliance)' ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">GOVT REGISTRATION NO <span class="text-rose-500 font-bold">*</span></label>
            <input type="text" id="modal-audit-govtreg" placeholder="Enter Govt Register Number" value="GOV-FEED-AP-8841" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">CERTIFICATION NUMBER <span class="text-rose-500 font-bold">*</span></label>
            <input type="text" id="modal-audit-certno" placeholder="Enter Certification Number" value="CERT-BAP-2026-904" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">BAP NUMBER <span class="text-rose-500 font-bold">*</span></label>
            <input type="text" id="modal-audit-bapno" placeholder="Enter BAP Number" value="BAP-M-74921" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">AUDIT DATE <span class="text-rose-500 font-bold">*</span></label>
            <input type="date" id="modal-audit-date" value="${todayStr}" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">ISSUED ON <span class="text-rose-500 font-bold">*</span></label>
            <input type="date" id="modal-audit-issued" value="${todayStr}" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">VALIDITY UPTO <span class="text-rose-500 font-bold">*</span></label>
            <input type="date" id="modal-audit-validity" value="${todayStr}" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">RENEWAL DATE</label>
            <input type="date" id="modal-audit-renewal" value="" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">AUDIT STATUS <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-status-select" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${auditStatusList.map(s => `<option value="${s}" ${s === 'Approved' ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">CHECKED BY <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-checkedby" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${checkedByList.map(c => `<option value="${c}" ${c.includes('Lead') ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">VERIFIED BY <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-verifiedby" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${verifiedByList.map(v => `<option value="${v}" ${v.includes('QA Head') ? 'selected' : ''}>${v}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">REMARKS</label>
            <input type="text" id="modal-audit-remarks" placeholder="Enter Remarks" value="All feed ingredients verified free of banned substances" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">UPLOAD FILE</label>
            <input type="file" id="modal-audit-file" class="w-full h-[38px] px-2 py-1.5 bg-white border border-[#CBD5E1] rounded-lg text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">STATUS <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-active-status" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="Active" selected>Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      `;
    } else if (type === 'social') {
      breadcrumbList = 'Social Audit List';
      breadcrumbCreate = 'Social Audit Create';
      formTitle = 'SOCIAL AUDIT CREATE';
      formFields = `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-plant" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="">Select</option>
              ${plants.map(p => `<option value="${p}">${p}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">NAME OF THE AUDIT <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-name" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="">Select</option>
              <option value="SMETA 4-Pillar Social Audit" selected>SMETA 4-Pillar Social Audit</option>
              <option value="BSCI Code of Conduct Audit">BSCI Code of Conduct Audit</option>
              <option value="SA8000 Social Accountability">SA8000 Social Accountability</option>
              <option value="Sedex Ethical Trade Audit">Sedex Ethical Trade Audit</option>
              <option value="WRAP Compliance Audit">WRAP Compliance Audit</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">TYPE OF AUDIT <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-type-select" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="">Select</option>
              <option value="Initial Full Audit" selected>Initial Full Audit</option>
              <option value="Periodic Surveillance">Periodic Surveillance</option>
              <option value="Follow-up Audit">Follow-up Audit</option>
              <option value="Unannounced Desktop Audit">Unannounced Desktop Audit</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">CERTIFICATION BODY <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-certbody" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${certifyingBodies.map(c => `<option value="${c}" ${c === 'SGS India' ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">WINDOW PERIOD <span class="text-rose-500 font-bold">*</span></label>
            <input type="date" id="modal-audit-window" value="${todayStr}" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">GRADE/SCORE <span class="text-rose-500 font-bold">*</span></label>
            <input type="text" id="modal-audit-grade" placeholder="Enter Grade/Score" value="Grade A (98%)" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">SITE ID</label>
            <input type="text" id="modal-audit-siteid" placeholder="Enter Site ID" value="SEDEX-ZS-40912" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">AUDIT START DATE <span class="text-rose-500 font-bold">*</span></label>
            <input type="date" id="modal-audit-start" value="${todayStr}" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">AUDIT END DATE <span class="text-rose-500 font-bold">*</span></label>
            <input type="date" id="modal-audit-end" value="${todayStr}" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">ISSUED ON <span class="text-rose-500 font-bold">*</span></label>
            <input type="date" id="modal-audit-issued" value="${todayStr}" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">VALIDITY UPTO <span class="text-rose-500 font-bold">*</span></label>
            <input type="date" id="modal-audit-validity" value="${todayStr}" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">RENEWAL DATE</label>
            <input type="date" id="modal-audit-renewal" value="" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">AUDIT STATUS <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-status-select" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${auditStatusList.map(s => `<option value="${s}" ${s === 'Approved' ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">CHECKED BY <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-checkedby" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${checkedByList.map(c => `<option value="${c}" ${c.includes('Lead') ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">VERIFIED BY <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-verifiedby" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${verifiedByList.map(v => `<option value="${v}" ${v.includes('QA Head') ? 'selected' : ''}>${v}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">REMARKS</label>
            <input type="text" id="modal-audit-remarks" placeholder="Enter Remarks" value="Ethical standards and labor compliance audited" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">UPLOAD FILE</label>
            <input type="file" id="modal-audit-file" class="w-full h-[38px] px-2 py-1.5 bg-white border border-[#CBD5E1] rounded-lg text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">STATUS <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-active-status" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="Active" selected>Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      `;
    } else if (type === 'hatchery') {
      breadcrumbList = 'Hatchery Audit List';
      breadcrumbCreate = 'Hatchery Audit Create';
      formTitle = 'HATCHERY AUDIT CREATE';
      formFields = `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-plant" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="">Select</option>
              ${plants.map(p => `<option value="${p}">${p}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">NAME OF HATCHERY <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-hatchery" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="">Select</option>
              <option value="Devi Hatchery Unit-1 (Bapatla)" selected>Devi Hatchery Unit-1 (Bapatla)</option>
              <option value="Devi Coastal SPF Hatchery (Kakinada)">Devi Coastal SPF Hatchery (Kakinada)</option>
              <option value="Sagar Aqua Hatchery (Marakanam)">Sagar Aqua Hatchery (Marakanam)</option>
              <option value="Royal Blue Hatcheries (Nellore)">Royal Blue Hatcheries (Nellore)</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">HATCHERY LOCATION <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-hatcheryloc" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="">Select</option>
              <option value="Kakinada Coastal Zone" selected>Kakinada Coastal Zone</option>
              <option value="Bapatla Hatchery Belt">Bapatla Hatchery Belt</option>
              <option value="Marakanam Coastal Area">Marakanam Coastal Area</option>
              <option value="Nellore Seafront">Nellore Seafront</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">CERTIFICATION BODY <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-certbody" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${certifyingBodies.map(c => `<option value="${c}" ${c.includes('CAA') ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">REGISTRATION NO</label>
            <input type="text" id="modal-audit-regno" placeholder="Enter Registration Number" value="CAA-HATCH-2026-042" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">BAP NUMBER <span class="text-rose-500 font-bold">*</span></label>
            <input type="text" id="modal-audit-bapno" placeholder="Enter BAP Number" value="BAP-H-3910" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">PRODUCTION PER CYCLE <span class="text-rose-500 font-bold">*</span></label>
            <input type="text" id="modal-audit-production" placeholder="Enter Production Per Cycle" value="25 Million PL" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">AUDIT DATE <span class="text-rose-500 font-bold">*</span></label>
            <input type="date" id="modal-audit-date" value="${todayStr}" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">ISSUED ON <span class="text-rose-500 font-bold">*</span></label>
            <input type="date" id="modal-audit-issued" value="${todayStr}" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">VALIDITY UPTO <span class="text-rose-500 font-bold">*</span></label>
            <input type="date" id="modal-audit-validity" value="${todayStr}" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">RENEWAL DATE</label>
            <input type="date" id="modal-audit-renewal" value="" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">AUDIT STATUS <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-status-select" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${auditStatusList.map(s => `<option value="${s}" ${s === 'Approved' ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">CHECKED BY <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-checkedby" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${checkedByList.map(c => `<option value="${c}" ${c.includes('Lead') ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">VERIFIED BY <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-verifiedby" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${verifiedByList.map(v => `<option value="${v}" ${v.includes('QA Head') ? 'selected' : ''}>${v}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">REMARKS</label>
            <input type="text" id="modal-audit-remarks" placeholder="Enter Remarks" value="SPF Broodstock quarantine and PCR screening passed" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">UPLOAD FILE</label>
            <input type="file" id="modal-audit-file" class="w-full h-[38px] px-2 py-1.5 bg-white border border-[#CBD5E1] rounded-lg text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">STATUS <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-active-status" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="Active" selected>Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      `;
    } else if (type === 'farm') {
      breadcrumbList = 'Farm Audit List';
      breadcrumbCreate = 'Farm Audit Create';
      formTitle = 'FARM AUDIT CREATE';
      formFields = `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-plant" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="">Select</option>
              ${plants.map(p => `<option value="${p}">${p}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">FARM NAME <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-farmname" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="">Select</option>
              <option value="Balaji Aqua Farm Cluster 1" selected>Balaji Aqua Farm Cluster 1</option>
              <option value="Devi Coastal Farm A-1">Devi Coastal Farm A-1</option>
              <option value="Godavari Delta Farm Cluster 4">Godavari Delta Farm Cluster 4</option>
              <option value="Krishna Estuary Farm B-2">Krishna Estuary Farm B-2</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">FARMER NAME <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-farmer" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="">Select</option>
              <option value="M. Satyanarayana" selected>M. Satyanarayana</option>
              <option value="P. Venkateswara Rao">P. Venkateswara Rao</option>
              <option value="K. Srinivasa Rao">K. Srinivasa Rao</option>
              <option value="T. Appala Raju">T. Appala Raju</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">CERTIFYING BODY <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-certbody" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${certifyingBodies.map(c => `<option value="${c}" ${c.includes('BAP Farm') ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">GOVT REGISTRATION NO <span class="text-rose-500 font-bold">*</span></label>
            <input type="text" id="modal-audit-govtreg" placeholder="Enter Govt Register Number" value="CAA-AP-WEST-4019" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">CERTIFICATION NUMBER <span class="text-rose-500 font-bold">*</span></label>
            <input type="text" id="modal-audit-certno" placeholder="Enter Certification Number" value="BAP-FARM-9024" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">BAP NUMBER <span class="text-rose-500 font-bold">*</span></label>
            <input type="text" id="modal-audit-bapno" placeholder="Enter BAP Number" value="BAP-F-20188" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">AUDIT DATE <span class="text-rose-500 font-bold">*</span></label>
            <input type="date" id="modal-audit-date" value="${todayStr}" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">ISSUED ON <span class="text-rose-500 font-bold">*</span></label>
            <input type="date" id="modal-audit-issued" value="${todayStr}" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">VALIDITY UPTO <span class="text-rose-500 font-bold">*</span></label>
            <input type="date" id="modal-audit-validity" value="${todayStr}" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">RENEWAL DATE</label>
            <input type="date" id="modal-audit-renewal" value="" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">AUDIT STATUS <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-status-select" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${auditStatusList.map(s => `<option value="${s}" ${s === 'Approved' ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">CHECKED BY <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-checkedby" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${checkedByList.map(c => `<option value="${c}" ${c.includes('Lead') ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">VERIFIED BY <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-verifiedby" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${verifiedByList.map(v => `<option value="${v}" ${v.includes('QA Head') ? 'selected' : ''}>${v}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">REMARKS</label>
            <input type="text" id="modal-audit-remarks" placeholder="Enter Remarks" value="Water chemistry and harvest biosecurity protocols compliant" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">UPLOAD FILE</label>
            <input type="file" id="modal-audit-file" class="w-full h-[38px] px-2 py-1.5 bg-white border border-[#CBD5E1] rounded-lg text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">STATUS <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-active-status" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="Active" selected>Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      `;
    } else {
      // Food Audit
      breadcrumbList = 'Food Audit List';
      breadcrumbCreate = 'Food Audit Create';
      formTitle = 'FOOD AUDIT CREATE';
      formFields = `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">PRODUCTION PLANT <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-plant" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="">Select</option>
              ${plants.map(p => `<option value="${p}">${p}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">NAME OF AUDIT <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-name" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="">Select</option>
              <option value="Food Audit" selected>Food Audit</option>
              <option value="BRCGS Global Food Safety Standard">BRCGS Global Food Safety Standard</option>
              <option value="IFS Food Standard Audit">IFS Food Standard Audit</option>
              <option value="FSSC 22000 Food Safety System">FSSC 22000 Food Safety System</option>
              <option value="USFDA GMP & HACCP Verification">USFDA GMP & HACCP Verification</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">GRADE/SCORE <span class="text-rose-500 font-bold">*</span></label>
            <input type="text" id="modal-audit-grade" placeholder="Enter Grade/Score" value="125 (Grade AA)" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">CERTIFYING BODY <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-certbody" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${certifyingBodies.map(c => `<option value="${c}" ${c === 'DNV GL' ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">GOVT REGISTRATION NO <span class="text-rose-500 font-bold">*</span></label>
            <input type="text" id="modal-audit-govtreg" placeholder="Enter Govt Register Number" value="EIA-PLANT-5-883" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">CERTIFICATION NUMBER <span class="text-rose-500 font-bold">*</span></label>
            <input type="text" id="modal-audit-certno" placeholder="Enter Certification Number" value="BRCGS-IND-2026-441" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">BAP NUMBER <span class="text-rose-500 font-bold">*</span></label>
            <input type="text" id="modal-audit-bapno" placeholder="Enter BAP Number" value="BAP-P-44910" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">AUDIT START DATE <span class="text-rose-500 font-bold">*</span></label>
            <input type="date" id="modal-audit-start" value="${todayStr}" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">AUDIT END DATE <span class="text-rose-500 font-bold">*</span></label>
            <input type="date" id="modal-audit-end" value="${todayStr}" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">ISSUED ON <span class="text-rose-500 font-bold">*</span></label>
            <input type="date" id="modal-audit-issued" value="${todayStr}" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">VALIDITY UPTO <span class="text-rose-500 font-bold">*</span></label>
            <input type="date" id="modal-audit-validity" value="${todayStr}" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">RENEWAL DATE</label>
            <input type="date" id="modal-audit-renewal" value="" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">AUDIT STATUS <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-status-select" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${auditStatusList.map(s => `<option value="${s}" ${s === 'Approved' ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">CHECKED BY <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-checkedby" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${checkedByList.map(c => `<option value="${c}" ${c.includes('Lead') ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">VERIFIED BY <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-verifiedby" required class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              ${verifiedByList.map(v => `<option value="${v}" ${v.includes('QA Head') ? 'selected' : ''}>${v}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">REMARKS</label>
            <input type="text" id="modal-audit-remarks" placeholder="Enter Remarks" value="Hygiene, pest control, and cold chain documentation fully approved" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">UPLOAD FILE</label>
            <input type="file" id="modal-audit-file" class="w-full h-[38px] px-2 py-1.5 bg-white border border-[#CBD5E1] rounded-lg text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">STATUS <span class="text-rose-500 font-bold">*</span></label>
            <select id="modal-audit-active-status" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              <option value="Active" selected>Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      `;
    }

    const modalContent = `
      <div class="max-h-[82vh] overflow-y-auto px-1 pr-2 text-slate-800">
        <!-- Breadcrumb & Title Matching Reference Screenshots -->
        <div class="mb-5 pb-3 border-b border-slate-100">
          <div class="text-xs font-medium text-slate-500 flex items-center gap-1.5 mb-2">
            <span>QC Audit</span>
            <span>&gt;</span>
            <span class="hover:text-blue-600 cursor-pointer">${breadcrumbList}</span>
            <span>&gt;</span>
            <span class="text-blue-600 font-semibold">${breadcrumbCreate}</span>
          </div>
          <h3 class="text-sm font-extrabold text-[#1E293B] uppercase tracking-wide">${formTitle}</h3>
        </div>

        <form id="modal-audit-form" onsubmit="event.preventDefault(); QCView.handleAuditFormSubmit('${type}');">
          <!-- 4-Column Audit Specification Grid -->
          ${formFields}

          <!-- Centered Action Buttons for Main Audit Form -->
          <div class="flex items-center justify-center gap-3 pt-6 pb-6">
            <button type="button" onclick="Modal.close()" class="h-[38px] px-7 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-xs">
              Close
            </button>
            <button type="submit" class="h-[38px] px-7 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-xs">
              Submit
            </button>
          </div>

          <!-- Bottom Section: Payment Details (Underline Header) -->
          <div class="pt-5 border-t border-slate-200">
            <div class="mb-4">
              <span class="text-sm font-bold text-[#1E293B] border-b-2 border-slate-800 pb-1 inline-block">Payment Details</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">PURPOSE OF INVOICE <span class="text-rose-500 font-bold">*</span></label>
                <input type="text" id="modal-pay-purpose" placeholder="Enter Purpose of Invoice" value="Audit Certification & Inspection Fee" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">TYPE OF PAYMENT <span class="text-rose-500 font-bold">*</span></label>
                <select id="modal-pay-type" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
                  <option value="">Select</option>
                  <option value="Full Payment" selected>Full Payment</option>
                  <option value="Advance">Advance</option>
                  <option value="Milestone 1">Milestone 1</option>
                  <option value="Balance">Balance</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">INVOICE NO <span class="text-rose-500 font-bold">*</span></label>
                <input type="text" id="modal-pay-inv-no" placeholder="Enter Invoice No" value="INV-QC-${Date.now().toString().slice(-4)}" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">INVOICE DATE <span class="text-rose-500 font-bold">*</span></label>
                <input type="date" id="modal-pay-inv-date" value="${todayStr}" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">INVOICE VALUE <span class="text-rose-500 font-bold">*</span></label>
                <input type="number" id="modal-pay-inv-val" placeholder="Enter Invoice value" value="45000" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]" oninput="const t = document.getElementById('modal-pay-total'); if(t) t.value = this.value;">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">OTHERS</label>
                <input type="text" id="modal-pay-others" placeholder="Enter Payment Remarks" value="Auditor travel & laboratory charges included" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">INVOICE DUE DATE <span class="text-rose-500 font-bold">*</span></label>
                <input type="date" id="modal-pay-due-date" value="${todayStr}" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1.5">TOTAL AMOUNT <span class="text-rose-500 font-bold">*</span></label>
                <input type="number" id="modal-pay-total" placeholder="Enter Total Amount" value="45000" class="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#1E293B] focus:outline-none focus:border-[#02a8b5]">
              </div>
            </div>

            <!-- Add Payments Centered Button -->
            <div class="flex items-center justify-center pt-5 pb-3">
              <button type="button" onclick="QCView.handleAddAuditPayment('${type}')" class="h-[38px] px-7 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-xs">
                Add Payments
              </button>
            </div>

            <!-- Dynamic Added Payments Table Container -->
            <div id="modal-audit-payments-container" class="mt-2"></div>
          </div>
        </form>
      </div>
    `;

    m.open({
      title: '',
      size: '5xl',
      content: modalContent
    });

    setTimeout(() => {
      if (typeof window !== 'undefined' && window.CamarooControls && typeof window.CamarooControls.upgrade === 'function') {
        window.CamarooControls.upgrade(document.getElementById('erp-modal-root'));
      }
    }, 20);
  },

  handleAddAuditPayment(type) {
    const purpose = document.getElementById('modal-pay-purpose')?.value.trim();
    const payType = document.getElementById('modal-pay-type')?.value;
    const invNo = document.getElementById('modal-pay-inv-no')?.value.trim();
    const invDate = document.getElementById('modal-pay-inv-date')?.value;
    const invVal = document.getElementById('modal-pay-inv-val')?.value;
    const others = document.getElementById('modal-pay-others')?.value.trim() || '-';
    const dueDate = document.getElementById('modal-pay-due-date')?.value;
    const totalAmount = document.getElementById('modal-pay-total')?.value;

    if (!purpose || !invNo || !totalAmount) {
      if (typeof Toast !== 'undefined' && Toast.show) {
        Toast.show('Please fill in required payment details (Purpose, Invoice No, Total Amount)', 'warning');
      }
      return;
    }

    const paymentItem = {
      id: Date.now(),
      purpose,
      type: payType || 'Full Payment',
      invoiceNo: invNo,
      invoiceDate: invDate,
      invoiceValue: invVal,
      others,
      dueDate,
      totalAmount
    };

    if (!this.currentModalPayments) this.currentModalPayments = [];
    this.currentModalPayments.push(paymentItem);

    this.renderModalPaymentList();

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Payment voucher ${invNo} (₹${Number(totalAmount).toLocaleString('en-IN')}) added!`, 'success');
    }
  },

  renderModalPaymentList() {
    const container = document.getElementById('modal-audit-payments-container');
    if (!container) return;

    if (!this.currentModalPayments || this.currentModalPayments.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = `
      <div class="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-3">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-slate-700">Added Payment Vouchers (${this.currentModalPayments.length})</span>
          <span class="text-xs font-bold text-emerald-700">Total: ₹${this.currentModalPayments.reduce((acc, p) => acc + (Number(p.totalAmount) || 0), 0).toLocaleString('en-IN')}</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="text-[10px] uppercase font-bold text-slate-500 border-b border-slate-200 pb-1">
                <th class="py-1 px-2">Invoice No</th>
                <th class="py-1 px-2">Purpose</th>
                <th class="py-1 px-2">Type</th>
                <th class="py-1 px-2">Date</th>
                <th class="py-1 px-2 text-right">Amount (₹)</th>
                <th class="py-1 px-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${this.currentModalPayments.map(p => `
                <tr class="hover:bg-white transition-colors">
                  <td class="py-1.5 px-2 font-mono font-bold text-blue-600">${p.invoiceNo}</td>
                  <td class="py-1.5 px-2 text-slate-800">${p.purpose}</td>
                  <td class="py-1.5 px-2"><span class="inline-flex px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">${p.type}</span></td>
                  <td class="py-1.5 px-2 text-slate-500 font-mono">${p.invoiceDate || '-'}</td>
                  <td class="py-1.5 px-2 text-right font-mono font-bold text-slate-900">${Number(p.totalAmount || 0).toLocaleString('en-IN')}</td>
                  <td class="py-1.5 px-2 text-center">
                    <button type="button" onclick="QCView.removeModalPayment(${p.id})" class="text-rose-500 hover:text-rose-700 p-0.5 cursor-pointer" title="Remove Payment">
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  removeModalPayment(id) {
    if (!this.currentModalPayments) return;
    this.currentModalPayments = this.currentModalPayments.filter(p => p.id !== id);
    this.renderModalPaymentList();
    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('Payment voucher removed', 'info');
    }
  },

  handleAuditFormSubmit(type) {
    const plant = document.getElementById('modal-audit-plant')?.value || 'DFL UNIT-5 (JPT)';
    const list = this.getAuditDataList(type);
    const payments = this.currentModalPayments ? [...this.currentModalPayments] : [];
    const hasPaidPayments = payments.length > 0;
    const paymentStatusVal = hasPaidPayments ? 'Paid' : 'Pending';

    if (type === 'feedmill') {
      const auditName = document.getElementById('modal-audit-name')?.value || 'Feed Mill Inspection';
      const farmerLocation = document.getElementById('modal-audit-farmer')?.value || 'Bhimavaram Feed Processing Plant';
      const auditDate = document.getElementById('modal-audit-date')?.value || '';
      const validityDate = document.getElementById('modal-audit-validity')?.value || '';
      const renewalDate = document.getElementById('modal-audit-renewal')?.value || '';
      const remarks = document.getElementById('modal-audit-remarks')?.value || '';

      list.unshift({
        id: `MILL-${Date.now()}`,
        sNo: list.length + 1,
        plant,
        auditName,
        farmerLocation,
        auditDate: auditDate ? auditDate.split('-').reverse().join('-') : '27-10-2026',
        renewalDate: renewalDate ? renewalDate.split('-').reverse().join('-') : '',
        validityDate: validityDate ? validityDate.split('-').reverse().join('-') : '27-10-2027',
        paymentStatus: paymentStatusVal,
        status: document.getElementById('modal-audit-active-status')?.value || 'Active',
        statusClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
        remarks,
        payments
      });
    } else if (type === 'social') {
      const auditName = document.getElementById('modal-audit-name')?.value || 'SMETA 4-Pillar Social Audit';
      const grade = document.getElementById('modal-audit-grade')?.value || 'Grade A';
      const startDate = document.getElementById('modal-audit-start')?.value || '';
      const endDate = document.getElementById('modal-audit-end')?.value || '';
      const validityDate = document.getElementById('modal-audit-validity')?.value || '';
      const renewalDate = document.getElementById('modal-audit-renewal')?.value || '';
      const remarks = document.getElementById('modal-audit-remarks')?.value || '';

      list.unshift({
        id: `SA-${Date.now()}`,
        sNo: list.length + 1,
        plant,
        auditName,
        grade,
        startDate: startDate ? startDate.split('-').reverse().join('-') : '27-10-2026',
        endDate: endDate ? endDate.split('-').reverse().join('-') : '27-10-2026',
        renewalDate: renewalDate ? renewalDate.split('-').reverse().join('-') : '',
        validityDate: validityDate ? validityDate.split('-').reverse().join('-') : '27-10-2027',
        paymentStatus: paymentStatusVal,
        status: document.getElementById('modal-audit-active-status')?.value || 'Active',
        statusClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
        remarks,
        payments
      });
    } else if (type === 'hatchery') {
      const hatcheryName = document.getElementById('modal-audit-hatchery')?.value || 'Devi Hatchery Unit-1';
      const hatcheryLocation = document.getElementById('modal-audit-hatcheryloc')?.value || 'Kakinada Coastal Zone';
      const auditDate = document.getElementById('modal-audit-date')?.value || '';
      const validityDate = document.getElementById('modal-audit-validity')?.value || '';
      const renewalDate = document.getElementById('modal-audit-renewal')?.value || '';
      const remarks = document.getElementById('modal-audit-remarks')?.value || 'Compliant';

      list.unshift({
        id: `HA-${Date.now()}`,
        sNo: list.length + 1,
        plant,
        hatcheryName,
        hatcheryLocation,
        auditDate: auditDate ? auditDate.split('-').reverse().join('-') : '27-10-2026',
        renewalDate: renewalDate ? renewalDate.split('-').reverse().join('-') : '',
        validityDate: validityDate ? validityDate.split('-').reverse().join('-') : '27-10-2027',
        remarks,
        paymentStatus: paymentStatusVal,
        status: document.getElementById('modal-audit-active-status')?.value || 'Active',
        statusClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
        payments
      });
    } else if (type === 'farm') {
      const farmName = document.getElementById('modal-audit-farmname')?.value || 'Balaji Aqua Farm';
      const farmerName = document.getElementById('modal-audit-farmer')?.value || 'M. Satyanarayana';
      const auditDate = document.getElementById('modal-audit-date')?.value || '';
      const validityDate = document.getElementById('modal-audit-validity')?.value || '';
      const renewalDate = document.getElementById('modal-audit-renewal')?.value || '';
      const remarks = document.getElementById('modal-audit-remarks')?.value || '';

      list.unshift({
        id: `FMA-${Date.now()}`,
        sNo: list.length + 1,
        plant,
        farmName,
        farmerName,
        auditDate: auditDate ? auditDate.split('-').reverse().join('-') : '27-10-2026',
        renewalDate: renewalDate ? renewalDate.split('-').reverse().join('-') : '',
        validityDate: validityDate ? validityDate.split('-').reverse().join('-') : '27-10-2027',
        paymentStatus: paymentStatusVal,
        status: document.getElementById('modal-audit-active-status')?.value || 'Active',
        statusClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
        remarks,
        payments
      });
    } else {
      // Food Audit
      const auditName = document.getElementById('modal-audit-name')?.value || 'Food Audit';
      const grade = document.getElementById('modal-audit-grade')?.value || '125';
      const startDate = document.getElementById('modal-audit-start')?.value || '';
      const endDate = document.getElementById('modal-audit-end')?.value || '';
      const validityDate = document.getElementById('modal-audit-validity')?.value || '';
      const renewalDate = document.getElementById('modal-audit-renewal')?.value || '';
      const remarks = document.getElementById('modal-audit-remarks')?.value || '';

      list.unshift({
        id: `FA-${Date.now()}`,
        sNo: list.length + 1,
        plant,
        auditName,
        grade,
        startDate: startDate ? startDate.split('-').reverse().join('-') : '27-10-2026',
        endDate: endDate ? endDate.split('-').reverse().join('-') : '27-10-2026',
        renewalDate: renewalDate ? renewalDate.split('-').reverse().join('-') : '',
        validityDate: validityDate ? validityDate.split('-').reverse().join('-') : '27-10-2027',
        paymentStatus: paymentStatusVal,
        status: document.getElementById('modal-audit-active-status')?.value || 'Active',
        statusClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
        remarks,
        payments
      });
    }

    if (typeof Modal !== 'undefined' && Modal.close) Modal.close();
    this.refreshAuditTable(type, list);

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show('New audit record created successfully with payment register!', 'success');
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
