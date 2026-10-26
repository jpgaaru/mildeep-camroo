// Sales Module — Master Data & Reports
export const salesReports = {
  // ==========================================
  // 5. MASTER DATA SCREENS (PRODUCTS & BUYERS)
  // ==========================================
  renderProductList(container) {
    const prods = SalesDataStore.getCollection('products');
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Finished Goods Product Master Data')}
        <div id="sales-prod-table-container"></div>
      </div>
    `;
    new DataTable({
      containerId: 'sales-prod-table-container',
      data: prods,
      keyField: 'id',
      tableTitle: 'Approved Finished Goods Specification Master',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'productCode', header: 'Product Code', render: (v) => `<span class="font-mono font-bold text-[#006C7A]">${v}</span>` },
        { field: 'name', header: 'Description', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'species', header: 'Species', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'preparation', header: 'Form', render: (v) => `<span class="font-semibold text-[#172B4D]">${v}</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
  },

  renderPreparationList(container) { this.renderProductList(container); },
  renderSpeciesMaster(container) { this.renderProductList(container); },
  renderGradesList(container) { this.renderProductList(container); },
  renderPackingStyleList(container) { this.renderProductList(container); },
  renderVarietyList(container) { this.renderProductList(container); },

  renderBuyerList(container) {
    const buyers = SalesDataStore.getCollection('buyers');
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        ${UIBase.renderHeader('Overseas Buyer Master Directory')}
        <div id="sales-buyer-table-container"></div>
      </div>
    `;
    new DataTable({
      containerId: 'sales-buyer-table-container',
      data: buyers,
      keyField: 'id',
      tableTitle: 'Commercial Overseas Buyer Client Directory',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { field: 'sNo', header: 'S.No', render: (v, r, idx) => `<span class="font-bold text-[#5E6C84]">${idx + 1}</span>` },
        { field: 'buyerName', header: 'Buyer Entity', render: (v) => `<span class="font-bold text-[#172B4D]">${v}</span>` },
        { field: 'country', header: 'Country', render: (v) => `<span class="text-[#172B4D]">${v}</span>` },
        { field: 'contactPerson', header: 'Contact Person', render: (v) => `<span class="text-[#5E6C84]">${v}</span>` },
        { field: 'creditLimitUsd', header: 'Credit Limit', render: (v) => `<span class="font-extrabold text-[#006644]">$${(v || 0).toLocaleString()}</span>` },
        { field: 'status', header: 'Status', render: (v) => UIBase.renderBadge(v, 'success') }
      ]
    });
  },

  renderConsigneeList(container) { this.renderBuyerList(container); },
  renderNotifyPartyList(container) { this.renderBuyerList(container); },
  renderApplicantList(container) { this.renderBuyerList(container); },
  renderBrandsList(container) { this.renderBuyerList(container); },

  // ==========================================
  // 6. REPORTS
  // ==========================================
  renderSalesSummaryReport(container) {
    this.renderCustomInvoices(container);
  },

  renderPaymentStatusReport(container) {
    this.renderCollections(container);
  },

  renderInventoryReport(container) {
    this.renderProductList(container);
  },

  // ==========================================
  // HELPER METHODS & EVENT BINDINGS
  // ==========================================
  viewPiDetails(id) {
    const pis = SalesDataStore.getCollection('proformaInvoices');
    const pi = pis.find(x => x.id === id);
    if (!pi) return;
    Modal.alert({
      title: `Proforma Invoice ${pi.piNumber}`,
      message: `
        <div class="space-y-2 text-xs">
          <div class="flex justify-between py-1 border-b border-slate-100"><strong>Buyer:</strong> <span>${pi.buyer}</span></div>
          <div class="flex justify-between py-1 border-b border-slate-100"><strong>PO Number:</strong> <span>${pi.poNumber}</span></div>
          <div class="flex justify-between py-1 border-b border-slate-100"><strong>Processor Plant:</strong> <span>${pi.productionPlant}</span></div>
          <div class="flex justify-between py-1 border-b border-slate-100"><strong>Port of Discharge:</strong> <span>${pi.portOfDischarge}</span></div>
          <div class="flex justify-between py-1 border-b border-slate-100"><strong>ShipBy Window:</strong> <span>${pi.shipByWindow}</span></div>
          <div class="flex justify-between py-1 border-b border-slate-100"><strong>Total USD:</strong> <strong class="text-emerald-700">$${(pi.totalAmountUsd || 0).toLocaleString()}</strong></div>
          <div class="flex justify-between py-1 border-b border-slate-100"><strong>Status:</strong> <span>${pi.status}</span></div>
        </div>
      `
    });
  },

  printPi(id) {
    Toast.show(`Generating high-resolution printable PDF for ${id}`, 'info');
  },

  deletePi(id) {
    if (confirm(`Are you sure you want to delete Proforma Invoice ${id}?`)) {
      let pis = SalesDataStore.getCollection('proformaInvoices');
      pis = pis.filter(x => x.id !== id);
      SalesDataStore.saveAll({ ...SalesDataStore.getAll(), proformaInvoices: pis });
      this.renderProformaList(document.getElementById('sales-subpage-content'));
      Toast.show('Proforma Invoice deleted', 'error');
    }
  },


};
