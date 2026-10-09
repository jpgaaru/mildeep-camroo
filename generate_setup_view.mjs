import fs from 'fs';

const parsedMenu = JSON.parse(fs.readFileSync('parsed_erp_menu.json', 'utf8'));

// Format modulesConfig
const modulesConfig = parsedMenu.map((m, idx) => ({
  id: m.id,
  key: m.key,
  label: m.label,
  order: idx + 1,
  visible: true,
  submenusCount: m.submenus.length,
  roles: m.id.includes('admin') || m.id === 'master' || m.id === 'setup'
    ? ['System Administrator']
    : (m.id.includes('purchase')
      ? ['System Administrator', 'Procurement Officer']
      : (m.id.includes('quality') || m.id === 'lab' || m.id.includes('qc')
        ? ['System Administrator', 'Quality Lab Inspector']
        : (m.id.includes('production') || m.id.includes('pre-processing')
          ? ['System Administrator', 'Production Floor Manager']
          : (m.id.includes('coldstore') || m.id.includes('store') || m.id === 'stock' || m.id === 'inventory'
            ? ['System Administrator', 'Coldstore Keeper']
            : (m.id.includes('sales') || m.id === 'buyers' || m.id === 'orders' || m.id === 'payments' || m.id === 'shipments' || m.id === 'insurance'
              ? ['System Administrator', 'Sales & Exports Manager']
              : ['System Administrator', 'Procurement Officer', 'Quality Lab Inspector', 'Production Floor Manager', 'Coldstore Keeper', 'Sales & Exports Manager']))))),
  route: m.submenus[0]?.tabs[0]?.route || `#/${m.id}`
}));

// Format submenusConfig
const submenusConfig = {};
for (const m of parsedMenu) {
  submenusConfig[m.id] = m.submenus.map(sm => ({
    id: sm.id,
    title: sm.title,
    tabs: sm.tabs.map(t => ({
      id: t.id,
      label: t.label,
      route: t.route,
      type: t.label.toLowerCase().includes('report') ? 'custom-list' : (t.label.toLowerCase().includes('add') || t.label.toLowerCase().includes('create') || t.label.toLowerCase().includes('form') ? 'dynamic-form' : 'system'),
      badge: ''
    }))
  }));
}

const template = `// Setup Module Views - Client & Master Setup for Fisheries ERP
// Configurable Multi-Company & Master Data Studio for Seafood Processing, Quality, Production, and Coldstore ERP.

import { ERP_DATA } from '../data/mockData.js';
import { TabBar } from '../components/tabBar.js';
import { Toast } from '../components/toast.js';
import { Modal } from '../components/modal.js';
import { renderEmptyState } from '../components/emptyState.js';

const STUDIO_STORAGE_KEY = 'dfl_erp_master_studio_state_v3';

const DEFAULT_MODULES_CONFIG = ${JSON.stringify(modulesConfig, null, 2)};
const DEFAULT_SUBMENUS_CONFIG = ${JSON.stringify(submenusConfig, null, 2)};

function getInitialStudioState() {
  const saved = localStorage.getItem(STUDIO_STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.modulesConfig && parsed.modulesConfig.length >= 30) {
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse studio state', e);
    }
  }

  return {
    activeCompanyId: 'CMP-001',
    publishedVersion: 'v2.4.1',
    hasDraftChanges: true,
    draftChangesCount: 3,
    previewPersona: 'System Administrator',

    // 1. Companies & Processing Plants
    companies: [
      {
        id: 'CMP-001',
        code: 'DFL-IN',
        name: 'Devi Fisheries Limited',
        legalName: 'Devi Fisheries & Marine Products Ltd.',
        cin: 'L05005AP1997PLC027123',
        taxId: '37AABCD1234E1Z5',
        eiaNumber: 'EIA/AP/0458',
        fdaNumber: 'FDA-REG-10928374',
        bapNumber: 'BAP-P-4492-4STAR',
        country: 'India',
        currency: 'INR / USD',
        timezone: 'Asia/Kolkata (IST)',
        dateFormat: 'DD/MM/YYYY',
        contactEmail: 'purchase@devifisheries.com',
        contactPhone: '+91 891 256 7890',
        address: 'Harbour Road, Fishing Harbour, Visakhapatnam, AP 530001',
        status: 'Active',
        plants: ['Unit-1 VSP (Harbour)', 'Unit-2 Singarayakonda', 'Unit-3 Kakinada Port', 'Unit-4 PND', 'Unit-5 JPT', 'Unit-6 JPT-II']
      },
      {
        id: 'CMP-002',
        code: 'DSF-US',
        name: 'Devi Sea Foods Americas',
        legalName: 'Devi Sea Foods Americas Inc.',
        cin: 'DE-CORP-4892019',
        taxId: 'US-EIN-54-1892031',
        eiaNumber: 'N/A (Importing Entity)',
        fdaNumber: 'FDA-REG-US-99120',
        bapNumber: 'BAP-IMP-8821',
        country: 'United States',
        currency: 'USD ($)',
        timezone: 'America/New_York (EST)',
        dateFormat: 'MM/DD/YYYY',
        contactEmail: 'sales.us@deviseafoods.com',
        contactPhone: '+1 (732) 555-0199',
        address: 'Suite 400, 100 Wood Avenue South, Iselin, NJ 08830',
        status: 'Active',
        plants: ['Americas Hub NJ Coldstore', 'West Coast Staging Hub']
      },
      {
        id: 'CMP-003',
        code: 'CME-SG',
        name: 'Coastal Marine Exports',
        legalName: 'Coastal Marine Exports Pte. Ltd.',
        cin: 'UEN-201829104K',
        taxId: 'SG-GST-M90382910',
        eiaNumber: 'SFA-SG-2024-099',
        fdaNumber: 'FDA-AP-88402',
        bapNumber: 'BAP-P-5510',
        country: 'Singapore',
        currency: 'SGD / USD',
        timezone: 'Asia/Singapore (SGT)',
        dateFormat: 'YYYY-MM-DD',
        contactEmail: 'apac.trade@coastalmarine.sg',
        contactPhone: '+65 6789 0123',
        address: 'Marina Bay Financial Centre Tower 1, Singapore 018981',
        status: 'Active',
        plants: ['Singapore Trade Hub', 'Jurong Cold Chain Depot']
      }
    ],

    // 2. ERP Users
    users: [
      { id: 'ADM-001', name: 'Dr. Y.S. Prasad', email: 'ys.prasad@devifisheries.com', phone: '+91 98480 12345', companyId: 'CMP-001', companyName: 'Devi Fisheries Limited', role: 'System Administrator', plantAccess: ['All Plants'], status: 'Active', mfa: 'Enabled', lastLogin: 'Today, 09:45 AM' },
      { id: 'PRC-002', name: 'P. Rama Krishna', email: 'ramakrishna.p@devifisheries.com', phone: '+91 98481 67890', companyId: 'CMP-001', companyName: 'Devi Fisheries Limited', role: 'Procurement Officer', plantAccess: ['Unit-1 VSP (Harbour)', 'Unit-2 Singarayakonda'], status: 'Active', mfa: 'Enabled', lastLogin: 'Today, 08:30 AM' },
      { id: 'QCO-003', name: 'K. Venkateswara Rao', email: 'venkatesh.qc@devifisheries.com', phone: '+91 98482 11223', companyId: 'CMP-001', companyName: 'Devi Fisheries Limited', role: 'Quality Lab Inspector', plantAccess: ['Unit-1 VSP (Harbour)', 'Unit-3 Kakinada Port'], status: 'Active', mfa: 'Enabled', lastLogin: 'Yesterday, 05:15 PM' },
      { id: 'PRD-004', name: 'Ch. Srinivasa Raju', email: 'srinivas.prod@devifisheries.com', phone: '+91 98483 33445', companyId: 'CMP-001', companyName: 'Devi Fisheries Limited', role: 'Production Floor Manager', plantAccess: ['Unit-1 VSP (Harbour)'], status: 'Active', mfa: 'Enabled', lastLogin: 'Yesterday, 04:10 PM' },
      { id: 'CST-005', name: 'D. Rambabu', email: 'rambabu.cs@devifisheries.com', phone: '+91 98484 55667', companyId: 'CMP-001', companyName: 'Devi Fisheries Limited', role: 'Coldstore Keeper', plantAccess: ['Unit-1 VSP (Harbour)'], status: 'Active', mfa: 'Disabled', lastLogin: '07 Oct 2026' },
      { id: 'SLS-006', name: 'M. Sitarama Raju', email: 'sitaram.sales@devifisheries.com', phone: '+91 98485 77889', companyId: 'CMP-001', companyName: 'Devi Fisheries Limited', role: 'Sales & Exports Manager', plantAccess: ['All Plants'], status: 'Active', mfa: 'Enabled', lastLogin: 'Today, 10:15 AM' },
      { id: 'US-007', name: 'Michael Vance', email: 'm.vance@deviseafoods.com', phone: '+1 732 555 4410', companyId: 'CMP-002', companyName: 'Devi Sea Foods Americas', role: 'Sales & Exports Manager', plantAccess: ['Americas Hub NJ Coldstore'], status: 'Active', mfa: 'Enabled', lastLogin: 'Today, 07:15 PM' },
      { id: 'SG-008', name: 'Kelvin Tan', email: 'kelvin.tan@coastalmarine.sg', phone: '+65 9123 4567', companyId: 'CMP-003', companyName: 'Coastal Marine Exports', role: 'Coldstore Keeper', plantAccess: ['Singapore Trade Hub'], status: 'Active', mfa: 'Enabled', lastLogin: '06 Oct 2026' }
    ],

    // 3. Roles
    roles: [
      { id: 'ROLE-ADMIN', name: 'System Administrator', description: 'Complete system control, plant provisioning, ERP schema governance, and audit management.', isProtected: true, usersCount: 1 },
      { id: 'ROLE-PROCUREMENT', name: 'Procurement Officer', description: 'Raw material arrival entry, gate weighment, border count checks, and farmer billing.', isProtected: false, usersCount: 2 },
      { id: 'ROLE-QC', name: 'Quality Lab Inspector', description: 'Antibiotic residue testing (ELISA/LC-MS), organoleptic grading, and lot clearance.', isProtected: false, usersCount: 2 },
      { id: 'ROLE-PRODUCTION', name: 'Production Floor Manager', description: 'De-heading, peeling, soaking, batch freezing, floor balance, and yields.', isProtected: false, usersCount: 2 },
      { id: 'ROLE-COLDSTORE', name: 'Coldstore Keeper', description: 'Pallet inward intake, chamber storage allocation, physical count adjustments, and container dispatch.', isProtected: false, usersCount: 2 },
      { id: 'ROLE-SALES', name: 'Sales & Exports Manager', description: 'Overseas buyer contracts, shipping docs, anti-dumping audit compliance, and bank negotiations.', isProtected: false, usersCount: 2 }
    ],

    // 4. Authentic ERP Modules
    modulesConfig: DEFAULT_MODULES_CONFIG,

    // 5. Authentic ERP Submenus & Tabs
    submenusConfig: DEFAULT_SUBMENUS_CONFIG,

    // 6. Dynamic ERP Forms
    formsConfig: {
      'rm-purchase-inward': {
        name: 'Raw Material Purchase Inward Form',
        entity: 'Raw Material Lot',
        sections: [
          {
            id: 'sec-lot-info',
            title: 'Harvest & Supplier Details',
            fields: [
              { id: 'f_lot_no', key: 'lotNumber', label: 'Lot Number', type: 'text', placeholder: 'e.g. LOT-2026-00142', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'f_arrival_date', key: 'arrivalDate', label: 'Arrival Date', type: 'date', required: true, width: 'col-span-1', defaultValue: '2026-10-09' },
              { id: 'f_supplier', key: 'supplierId', label: 'Aquaculture Supplier / Farmer', type: 'dropdown', options: ['Godavari Coastal Aqua Farms (BVM)', 'Krishna Delta Prawn Harvesters (MCN)', 'Sagar Marine Hatcheries (KKD)', 'East Coast Aqua Society (VSP)'], required: true, width: 'col-span-1', defaultValue: 'Godavari Coastal Aqua Farms (BVM)' },
              { id: 'f_pond_location', key: 'pondLocation', label: 'Harvest Pond / Center', type: 'text', placeholder: 'e.g. Pond #4, Bhimavaram', required: true, width: 'col-span-1', defaultValue: '' }
            ]
          },
          {
            id: 'sec-species-weighment',
            title: 'Species, Grade & Weightment',
            fields: [
              { id: 'f_species', key: 'species', label: 'Species', type: 'dropdown', options: ['Vannamei Shrimp (Litopenaeus vannamei)', 'Black Tiger Shrimp (Penaeus monodon)', 'Asian Seabass (Barramundi)', 'Tilapia'], required: true, width: 'col-span-1', defaultValue: 'Vannamei Shrimp (Litopenaeus vannamei)' },
              { id: 'f_variety', key: 'variety', label: 'Initial Variety Condition', type: 'dropdown', options: ['Head-On Shell-On (HOSO)', 'Head-Less Shell-On (HLSO)', 'Whole Round Live'], required: true, width: 'col-span-1', defaultValue: 'Head-On Shell-On (HOSO)' },
              { id: 'f_gross_weight', key: 'grossWeightKg', label: 'Site Gross Weight (Kg)', type: 'number', placeholder: 'e.g. 5200', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'f_crate_tare', key: 'tareWeightKg', label: 'Total Crate Tare Weight (Kg)', type: 'number', placeholder: 'e.g. 350', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'f_border_count', key: 'sampleCountPcs', label: 'Border Count (Pcs/Kg)', type: 'number', placeholder: 'e.g. 42', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'f_temperature', key: 'intakeTempC', label: 'Arrival Temperature (°C)', type: 'number', placeholder: 'e.g. 2.5', required: true, width: 'col-span-1', defaultValue: '' }
            ]
          },
          {
            id: 'sec-logistics-cert',
            title: 'Vehicle & Statutory Traceability',
            fields: [
              { id: 'f_vehicle', key: 'vehicleNumber', label: 'Insulated Truck Vehicle No.', type: 'text', placeholder: 'e.g. AP 31 TT 4452', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'f_driver_name', key: 'driverName', label: 'Driver Name & Contact', type: 'text', placeholder: 'e.g. M. Appa Rao (+91 94401 22334)', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'f_caa_slip', key: 'caaCertificateUpload', label: 'CAA License / Passbook Upload', type: 'file', required: true, width: 'col-span-2', helpText: 'Max file size 5MB. Formats: PDF, JPG, PNG', defaultValue: '' }
            ]
          }
        ]
      },
      'proforma-order': {
        name: 'Proforma Invoice / Order Entry',
        entity: 'Proforma Order',
        sections: [
          {
            id: 'sec-pi-head',
            title: 'Order Header & Buyer',
            fields: [
              { id: 'pi_no', key: 'piNumber', label: 'Proforma Invoice No.', type: 'text', placeholder: 'e.g. PI-2026-EXP-1102', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'pi_date', key: 'piDate', label: 'Order Date', type: 'date', required: true, width: 'col-span-1', defaultValue: '2026-10-09' },
              { id: 'pi_buyer', key: 'buyerName', label: 'Overseas Buyer', type: 'dropdown', options: ['Sysco Corporation (USA)', 'Red Chamber Co. (USA)', 'Nippon Suisan Kaisha (Japan)', 'Carrefour Global Sourcing (EU)'], required: true, width: 'col-span-1', defaultValue: 'Sysco Corporation (USA)' },
              { id: 'pi_dest_port', key: 'destinationPort', label: 'Destination Port of Discharge', type: 'text', placeholder: 'e.g. Los Angeles (USLAX)', required: true, width: 'col-span-1', defaultValue: 'Los Angeles (USLAX)' }
            ]
          },
          {
            id: 'sec-pi-pricing',
            title: 'Packing Style & Price Book',
            fields: [
              { id: 'pi_variety', key: 'packedVariety', label: 'Finished Variety', type: 'dropdown', options: ['Head-Less Shell-On (HLSO) Block Frozen', 'Easy Peel (EZP) IQF', 'Peeled & Deveined Tail-On (PDTO) IQF', 'Butterfly Cut (BF) IQF'], required: true, width: 'col-span-1', defaultValue: 'Head-Less Shell-On (HLSO) Block Frozen' },
              { id: 'pi_grade', key: 'gradeCount', label: 'Contract Grade Count', type: 'dropdown', options: ['16/20 pcs/lb', '21/25 pcs/lb', '26/30 pcs/lb', '31/40 pcs/lb', '41/50 pcs/lb'], required: true, width: 'col-span-1', defaultValue: '26/30 pcs/lb' },
              { id: 'pi_qty_cartons', key: 'totalCartons', label: 'Quantity (Master Cartons)', type: 'number', placeholder: 'e.g. 1500', required: true, width: 'col-span-1', defaultValue: '1500' },
              { id: 'pi_price_usd', key: 'unitPriceUsd', label: 'Contract Price (USD / Kg)', type: 'number', placeholder: 'e.g. 8.45', required: true, width: 'col-span-1', defaultValue: '8.45' }
            ]
          }
        ]
      },
      'qc-lab-test': {
        name: 'QC Antibiotic & Lab Test Slip',
        entity: 'Quality Test Slip',
        sections: [
          {
            id: 'sec-qc-params',
            title: 'Antibiotic Residue Screening',
            fields: [
              { id: 'q_lot', key: 'targetLot', label: 'Target Raw Material Lot', type: 'text', placeholder: 'e.g. LOT-2026-00142', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'q_sample_code', key: 'sampleCode', label: 'Blind Sample Lab Code', type: 'text', placeholder: 'e.g. LAB-2026-SMP-882', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'q_chloramphenicol', key: 'chloramphenicolResult', label: 'Chloramphenicol (CAP)', type: 'radio', options: ['Negative (< 0.1 ppb)', 'Positive (Reject)'], required: true, width: 'col-span-1', defaultValue: 'Negative (< 0.1 ppb)' },
              { id: 'q_nitrofurans', key: 'nitrofuranResult', label: 'Nitrofuran Metabolites (AOZ/AMOZ)', type: 'radio', options: ['Negative (< 0.5 ppb)', 'Positive (Reject)'], required: true, width: 'col-span-1', defaultValue: 'Negative (< 0.5 ppb)' },
              { id: 'q_status', key: 'clearanceStatus', label: 'Lab Clearance Verdict', type: 'dropdown', options: ['CLEARED FOR EXPORT PROCESSING', 'REJECTED - ANTIBIOTIC CONTAMINATION', 'HOLD FOR RETEST'], required: true, width: 'col-span-2', defaultValue: 'CLEARED FOR EXPORT PROCESSING' }
            ]
          }
        ]
      },
      'production-batch': {
        name: 'Production Batch & Freezing Log',
        entity: 'Production Batch',
        sections: [
          {
            id: 'sec-prod-info',
            title: 'Batch & Freezer Parameters',
            fields: [
              { id: 'pr_batch_no', key: 'batchNo', label: 'Batch Run Number', type: 'text', placeholder: 'e.g. PRD-2026-B-089', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'pr_line', key: 'processingLine', label: 'Processing Line / Unit', type: 'dropdown', options: ['Line #1 IQF Freezing (Harbour)', 'Line #2 Plate Freezer (Harbour)', 'Line #3 Contact Freezing (Singarayakonda)', 'Line #4 Tunnel Freezer (Kakinada)'], required: true, width: 'col-span-1', defaultValue: 'Line #1 IQF Freezing (Harbour)' },
              { id: 'pr_in_weight', key: 'inputHeadonKg', label: 'Input Head-on Weight (Kg)', type: 'number', placeholder: 'e.g. 4500', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'pr_out_weight', key: 'finishedFrozenKg', label: 'Finished Frozen Weight (Kg)', type: 'number', placeholder: 'e.g. 3180', required: true, width: 'col-span-1', defaultValue: '' },
              { id: 'pr_glaze', key: 'glazePercent', label: 'Glaze Percentage (%)', type: 'number', placeholder: 'e.g. 10.0', required: true, width: 'col-span-1', defaultValue: '10' }
            ]
          }
        ]
      }
    },

    // 7. Audit & Logs
    auditLogs: [
      { id: 'AUD-8910', timestamp: 'Today, 09:12 AM', user: 'Dr. Y.S. Prasad', role: 'System Administrator', company: 'Devi Fisheries Limited', entity: 'Form Builder', action: 'Modified Schema', diff: 'Added mandatory CAA license document upload rule to RM Inward form.', status: 'Published' },
      { id: 'AUD-8909', timestamp: 'Today, 08:45 AM', user: 'Dr. Y.S. Prasad', role: 'System Administrator', company: 'Devi Fisheries Limited', entity: 'User Directory', action: 'Created User Account', diff: 'Registered Michael Vance (US-007) as Sales Manager for Devi Sea Foods Americas.', status: 'Published' },
      { id: 'AUD-8908', timestamp: 'Yesterday, 04:30 PM', user: 'Dr. Y.S. Prasad', role: 'System Administrator', company: 'Devi Fisheries Limited', entity: 'Module Studio', action: 'Updated Sidebar Order', diff: 'Arranged Raw Material Purchase as #1 and Quality Control as #3.', status: 'Published' },
      { id: 'AUD-8907', timestamp: '07 Oct 2026, 11:20 AM', user: 'Dr. Y.S. Prasad', role: 'System Administrator', company: 'Coastal Marine Exports', entity: 'Company Setup', action: 'Provisioned Entity', diff: 'Configured Singapore cold chain hub and SGD trade currency.', status: 'Published' },
      { id: 'AUD-8906', timestamp: '06 Oct 2026, 02:15 PM', user: 'Dr. Y.S. Prasad', role: 'System Administrator', company: 'Devi Fisheries Limited', entity: 'Roles & Permissions', action: 'Updated Matrix', diff: 'Granted Approval rights for Quality Lab Inspector on antibiotic clearance slips.', status: 'Published' }
    ],

    versionHistory: [
      { version: 'v2.4.1', date: '09 Oct 2026, 09:12 AM', publishedBy: 'Dr. Y.S. Prasad', note: 'Configured mandatory CAA farmer upload and updated line freezing parameters.', isCurrent: true },
      { version: 'v2.4.0', date: '07 Oct 2026, 05:00 PM', publishedBy: 'Dr. Y.S. Prasad', note: 'Provisioned Singapore trade hub and linked Coldstore inventory.', isCurrent: false },
      { version: 'v2.3.9', date: '04 Oct 2026, 10:30 AM', publishedBy: 'Dr. Y.S. Prasad', note: 'Optimized Antibiotic LC-MS screening workflow schema.', isCurrent: false },
      { version: 'v2.3.0', date: '01 Oct 2026, 09:00 AM', publishedBy: 'Dr. Y.S. Prasad', note: 'Seafood Processing & Coldstore ERP master configuration baseline.', isCurrent: false }
    ]
  };
}

export const SetupView = {
  state: getInitialStudioState(),
  activeTab: 'company-setup',
  selectedRoleForMatrix: 'ROLE-PROCUREMENT',
  selectedModuleForSubmenuStudio: 'purchase',
  selectedFormForBuilder: 'rm-purchase-inward',
  moduleFilterTerm: '',
  submenuFilterTerm: '',

  saveState() {
    try {
      localStorage.setItem(STUDIO_STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save studio state', e);
    }
  },

  render(containerId, subPage = 'company-setup', activeHash = '#/setup/client-master-setup/company-setup') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = \`
      <div id="setup-tab-bar-container"></div>
      <div id="setup-subpage-content" class="mt-4"></div>
    \`;

    const tabContext = TabBar.render('setup-tab-bar-container', activeHash);
    const subContainer = document.getElementById('setup-subpage-content');

    const clean = (activeHash || '').replace(/^#\\/?/, '').replace(/^\\/+/, '');
    const parts = clean.split('/');
    const submenuId = parts[1] || 'client-master-setup';
    const tabId = parts[2] || subPage || 'company-setup';
    this.activeTab = tabId;

    if (submenuId === 'client-master-setup') {
      this.renderClientMasterStudio(subContainer, tabId);
    } else {
      const tabLabel = tabContext?.submenu?.tabs?.find(t => t.id === tabId)?.label || (tabId ? tabId.replace(/-/g, ' ') : 'Settings');
      subContainer.innerHTML = renderEmptyState({
        moduleName: "Settings",
        tabName: tabLabel
      });
    }
  },

  renderClientMasterStudio(container, tabId) {
    const activeCompany = this.state.companies.find(c => c.id === this.state.activeCompanyId) || this.state.companies[0];

    container.innerHTML = \`
      <div class="space-y-4">
        <!-- Top Multi-Tenant Context Toolbar -->
        <div class="bg-white border border-[#DFE1E6] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-none">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center font-bold text-xs">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs font-semibold text-[#5E6C84]">Scope:</span>
              <span class="text-xs font-bold text-[#172B4D]">\${activeCompany.name}</span>
              <span class="lozenge lozenge-success text-[10px]">\${activeCompany.status}</span>
              <span class="lozenge lozenge-default text-[10px] font-mono">\${activeCompany.code}</span>
              <span class="text-xs text-[#5E6C84]">(\${activeCompany.plants.length} Processing Plants)</span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <select id="company-scope-switcher" class="px-2.5 py-1 border border-[#DFE1E6] rounded-lg text-xs font-bold text-[#172B4D] bg-white cursor-pointer hover:border-[#0369A1] focus:outline-none">
              \${this.state.companies.map(c => \`
                <option value="\${c.id}" \${c.id === this.state.activeCompanyId ? 'selected' : ''}>\${c.name}</option>
              \`).join('')}
            </select>

            \${this.state.hasDraftChanges ? \`
              <span class="lozenge lozenge-warning text-[10px] font-semibold">\${this.state.draftChangesCount} Drafts</span>
              <button id="btn-quick-publish" class="px-2.5 py-1 bg-[#0369A1] hover:bg-[#075985] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer">
                Publish Live
              </button>
            \` : \`
              <span class="lozenge lozenge-success text-[10px] font-semibold">\${this.state.publishedVersion} Live</span>
            \`}
          </div>
        </div>

        <!-- Studio Tab Content Container -->
        <div id="studio-active-tab-container"></div>
      </div>
    \`;

    const switcher = document.getElementById('company-scope-switcher');
    if (switcher) {
      switcher.onchange = (e) => {
        this.state.activeCompanyId = e.target.value;
        this.saveState();
        Toast.show(\`Switched scope to: \${this.state.companies.find(c => c.id === e.target.value)?.name}\`, 'info', 'Scope Switched');
        this.renderClientMasterStudio(container, tabId);
      };
    }

    const quickPublishBtn = document.getElementById('btn-quick-publish');
    if (quickPublishBtn) {
      quickPublishBtn.onclick = () => this.handlePublishConfiguration();
    }

    const tabContainer = document.getElementById('studio-active-tab-container');
    switch (tabId) {
      case 'company-setup':
        this.renderCompanySetupTab(tabContainer);
        break;
      case 'user-management':
        this.renderUserManagementTab(tabContainer);
        break;
      case 'roles-permissions':
        this.renderRolesPermissionsTab(tabContainer);
        break;
      case 'module-studio':
        this.renderModuleStudioTab(tabContainer);
        break;
      case 'submenu-tab-studio':
        this.renderSubmenuTabStudioTab(tabContainer);
        break;
      case 'field-form-builder':
        this.renderFieldFormBuilderTab(tabContainer);
        break;
      case 'audit-logs':
        this.renderAuditLogsTab(tabContainer);
        break;
      default:
        this.renderCompanySetupTab(tabContainer);
        break;
    }
  },

  // =========================================================================
  // 1. COMPANY SETUP TAB (Fisheries & Plants)
  // =========================================================================
  renderCompanySetupTab(container) {
    const totalCompanies = this.state.companies.length;
    const totalPlants = this.state.companies.reduce((acc, c) => acc + c.plants.length, 0);

    container.innerHTML = \`
      <div class="space-y-4">
        <!-- KPI Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="bg-white border border-[#DFE1E6] rounded-xl p-3.5 shadow-none">
            <span class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider">Operating Companies</span>
            <div class="text-xl font-extrabold text-[#172B4D] mt-1">\${totalCompanies} Entities</div>
          </div>
          <div class="bg-white border border-[#DFE1E6] rounded-xl p-3.5 shadow-none">
            <span class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider">Processing Plants</span>
            <div class="text-xl font-extrabold text-[#0369A1] mt-1">\${totalPlants} Plants Active</div>
          </div>
          <div class="bg-white border border-[#DFE1E6] rounded-xl p-3.5 shadow-none">
            <span class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider">Coldstore Capacity</span>
            <div class="text-xl font-extrabold text-[#6554C0] mt-1">12,500 MT</div>
          </div>
          <div class="bg-white border border-[#DFE1E6] rounded-xl p-3.5 shadow-none">
            <span class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider">Export Certifications</span>
            <div class="text-xl font-extrabold text-[#006644] mt-1">EIA / FDA / BAP</div>
          </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] shadow-none overflow-hidden">
          <div class="p-3 border-b border-[#EBECF0] flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-[#172B4D]">Companies & Processing Plants Registry</span>
              <span class="lozenge lozenge-inprogress text-[10px]">\${this.state.companies.length} Records</span>
            </div>
            <div class="flex items-center gap-2">
              <button id="cmp-copy-btn" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] cursor-pointer">Copy</button>
              <button id="cmp-excel-btn" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] cursor-pointer">Excel</button>
              <button id="btn-add-company" class="btn-primary px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                <span>+ Add Company</span>
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
                \${this.state.companies.map(c => \`
                  <tr class="hover:bg-[#FAFBFC]">
                    <td class="font-bold text-[#17191c] font-mono">\${c.code}</td>
                    <td>
                      <div class="font-bold text-[#172B4D]">\${c.name}</div>
                      <div class="text-[11px] text-[#5E6C84]">\${c.contactEmail} • \${c.contactPhone}</div>
                    </td>
                    <td>
                      <div class="font-medium text-[#172B4D]">\${c.legalName}</div>
                      <div class="text-[11px] font-mono text-[#5E6C84]">\${c.eiaNumber} • \${c.fdaNumber}</div>
                    </td>
                    <td>
                      <span class="font-medium">\${c.country}</span>
                      <span class="text-[#5E6C84] text-[11px]">(\${c.currency})</span>
                    </td>
                    <td>
                      <div class="flex flex-wrap gap-1">
                        \${c.plants.map(p => \`<span class="lozenge lozenge-default text-[9.5px]">\${p}</span>\`).join('')}
                      </div>
                    </td>
                    <td>
                      <span class="lozenge \${c.status === 'Active' ? 'lozenge-success' : 'lozenge-danger'} text-[10px]">\${c.status}</span>
                    </td>
                    <td class="text-center">
                      <div class="flex items-center justify-center gap-1">
                        <button data-action="edit-company" data-id="\${c.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#0369A1] cursor-pointer" title="Edit Company">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </button>
                        <button data-action="toggle-company-status" data-id="\${c.id}" class="p-1 hover:bg-[#EBECF0] rounded \${c.status === 'Active' ? 'text-[#BF2600]' : 'text-[#006644]'} cursor-pointer" title="Toggle Status">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                \`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    \`;

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
          this.logAudit('Company Setup', \`Toggled status for \${comp.name} to \${comp.status}\`);
          this.saveState();
          Toast.show(\`Company \${comp.name} is now \${comp.status}\`, 'success', 'Status Updated');
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
      id: \`CMP-00\${this.state.companies.length + 1}\`,
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
    const modalContent = \`
      <form id="company-form" class="space-y-3 text-xs">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Company Trade Name *</label>
            <input type="text" id="cmp-name" required value="\${company.name}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0369A1]" placeholder="e.g. Devi Fisheries Limited" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Company Code *</label>
            <input type="text" id="cmp-code" required value="\${company.code}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0369A1] font-mono" placeholder="e.g. DFL-IN" />
          </div>
        </div>

        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Legal Entity Name *</label>
          <input type="text" id="cmp-legal-name" required value="\${company.legalName}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0369A1]" />
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">EIA Approval No.</label>
            <input type="text" id="cmp-eia" value="\${company.eiaNumber || ''}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg font-mono" placeholder="EIA/AP/0458" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">US FDA Reg No.</label>
            <input type="text" id="cmp-fda" value="\${company.fdaNumber || ''}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg font-mono" placeholder="FDA-REG-10928374" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">BAP 4-Star License</label>
            <input type="text" id="cmp-bap" value="\${company.bapNumber || ''}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg font-mono" placeholder="BAP-P-4492" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Jurisdiction / Country</label>
            <input type="text" id="cmp-country" value="\${company.country}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Currency</label>
            <input type="text" id="cmp-currency" value="\${company.currency}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" />
          </div>
        </div>

        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Processing Plants (Comma-separated)</label>
          <input type="text" id="cmp-plants" value="\${company.plants.join(', ')}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="Unit-1 VSP, Unit-2 Singarayakonda" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Contact Email</label>
            <input type="email" id="cmp-email" value="\${company.contactEmail}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Phone</label>
            <input type="text" id="cmp-phone" value="\${company.contactPhone}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" />
          </div>
        </div>

        <div class="flex items-center justify-end gap-2 pt-3 border-t border-[#EBECF0]">
          <button type="button" id="modal-cmp-cancel" class="px-3.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs font-semibold text-[#42526E] hover:bg-[#FAFBFC] cursor-pointer">Cancel</button>
          <button type="submit" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">\${isEdit ? 'Save Changes' : 'Create Company'}</button>
        </div>
      </form>
    \`;

    Modal.show(isEdit ? \`Edit Company: \${company.name}\` : 'Add Processing Entity', modalContent);

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
        this.logAudit('Company Setup', \`Added company: \${company.name} (\${company.code})\`);
      } else {
        this.logAudit('Company Setup', \`Updated company: \${company.name}\`);
      }

      this.saveState();
      Modal.close();
      Toast.show(isEdit ? \`Company \${company.name} updated\` : \`Company \${company.name} created\`, 'success', 'Saved');
      const c = document.getElementById('setup-subpage-content');
      if (c) this.renderClientMasterStudio(c, 'company-setup');
    };
  },

  // =========================================================================
  // 2. USER MANAGEMENT TAB (ERP Users & Personas)
  // =========================================================================
  renderUserManagementTab(container) {
    const activeCompId = this.state.activeCompanyId;
    const scopedUsers = this.state.users.filter(u => u.companyId === activeCompId);

    container.innerHTML = \`
      <div class="space-y-4">
        <!-- KPI Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="bg-white border border-[#DFE1E6] rounded-xl p-3.5 shadow-none">
            <span class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider">ERP Active Users</span>
            <div class="text-xl font-extrabold text-[#172B4D] mt-1">\${scopedUsers.length} Users</div>
          </div>
          <div class="bg-white border border-[#DFE1E6] rounded-xl p-3.5 shadow-none">
            <span class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider">Plant Supervisors</span>
            <div class="text-xl font-extrabold text-[#0369A1] mt-1">\${scopedUsers.filter(u => u.role.includes('Production') || u.role.includes('Procurement')).length} Active</div>
          </div>
          <div class="bg-white border border-[#DFE1E6] rounded-xl p-3.5 shadow-none">
            <span class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider">Quality Inspectors</span>
            <div class="text-xl font-extrabold text-[#006644] mt-1">\${scopedUsers.filter(u => u.role.includes('Quality')).length} Certified</div>
          </div>
          <div class="bg-white border border-[#DFE1E6] rounded-xl p-3.5 shadow-none">
            <span class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider">MFA Compliance</span>
            <div class="text-xl font-extrabold text-[#6554C0] mt-1">100% SSO</div>
          </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] shadow-none overflow-hidden">
          <div class="p-3 border-b border-[#EBECF0] flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-[#172B4D]">ERP User Directory</span>
              <span class="lozenge lozenge-inprogress text-[10px]">\${scopedUsers.length} Records</span>
            </div>
            <div class="flex items-center gap-2">
              <button id="usr-copy-btn" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] cursor-pointer">Copy</button>
              <button id="usr-excel-btn" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] cursor-pointer">Excel</button>
              <button id="btn-add-user" class="btn-primary px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                <span>+ Register ERP User</span>
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
                \${scopedUsers.map(u => \`
                  <tr class="hover:bg-[#FAFBFC]">
                    <td class="font-bold text-[#17191c] font-mono">\${u.id}</td>
                    <td>
                      <div class="font-bold text-[#172B4D]">\${u.name}</div>
                      <div class="text-[11px] text-[#5E6C84]">\${u.email} • \${u.phone}</div>
                    </td>
                    <td>
                      <span class="lozenge \${u.role === 'System Administrator' ? 'lozenge-inprogress' : u.role === 'Quality Lab Inspector' ? 'lozenge-success' : u.role === 'Production Floor Manager' ? 'lozenge-purple' : 'lozenge-default'} text-[10px]">
                        \${u.role}
                      </span>
                    </td>
                    <td>
                      <div class="flex flex-wrap gap-1">
                        \${u.plantAccess.map(p => \`<span class="lozenge lozenge-default text-[9.5px]">\${p}</span>\`).join('')}
                      </div>
                    </td>
                    <td>
                      <span class="lozenge \${u.status === 'Active' ? 'lozenge-success' : 'lozenge-danger'} text-[10px]">\${u.status}</span>
                    </td>
                    <td class="text-[#5E6C84] text-[11px]">\${u.lastLogin}</td>
                    <td class="text-center">
                      <div class="flex items-center justify-center gap-1">
                        <button data-action="edit-user" data-id="\${u.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#0369A1] cursor-pointer" title="Edit User">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </button>
                        <button data-action="reset-pwd" data-id="\${u.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#42526E] cursor-pointer" title="Reset Password">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
                        </button>
                        <button data-action="toggle-user-status" data-id="\${u.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#BF2600] cursor-pointer" title="Toggle Status">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                \`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    \`;

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
          Toast.show(\`Password reset link dispatched to \${u.email}\`, 'info', 'Password Reset Dispatched');
          this.logAudit('User Setup', \`Generated password reset link for \${u.name}\`);
        }
      };
    });

    document.querySelectorAll('[data-action="toggle-user-status"]').forEach(btn => {
      btn.onclick = () => {
        const u = this.state.users.find(x => x.id === btn.dataset.id);
        if (u) {
          u.status = u.status === 'Active' ? 'Suspended' : 'Active';
          this.logAudit('User Setup', \`Changed user status of \${u.name} to \${u.status}\`);
          this.saveState();
          Toast.show(\`User \${u.name} is now \${u.status}\`, 'success', 'Status Updated');
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
      id: \`USR-\${Math.floor(100 + Math.random() * 900)}\`,
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
    const modalContent = \`
      <form id="user-form" class="space-y-3 text-xs">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Full Name *</label>
            <input type="text" id="usr-name" required value="\${user.name}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0369A1]" placeholder="e.g. Ramesh Varma" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Corporate Email *</label>
            <input type="email" id="usr-email" required value="\${user.email}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0369A1]" placeholder="ramesh@devifisheries.com" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Mobile Phone</label>
            <input type="text" id="usr-phone" value="\${user.phone}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="+91 98480 00000" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">ERP Persona / Role *</label>
            <select id="usr-role" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg">
              \${this.state.roles.map(r => \`
                <option value="\${r.name}" \${r.name === user.role ? 'selected' : ''}>\${r.name}</option>
              \`).join('')}
            </select>
          </div>
        </div>

        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Plant Access (Comma-separated)</label>
          <input type="text" id="usr-plants" value="\${user.plantAccess.join(', ')}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="Unit-1 VSP (Harbour), Unit-2 Singarayakonda" />
        </div>

        <div class="flex items-center justify-end gap-2 pt-3 border-t border-[#EBECF0]">
          <button type="button" id="modal-usr-cancel" class="px-3.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs font-semibold text-[#42526E] hover:bg-[#FAFBFC] cursor-pointer">Cancel</button>
          <button type="submit" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">\${isEdit ? 'Save User' : 'Register User'}</button>
        </div>
      </form>
    \`;

    Modal.show(isEdit ? \`Edit User: \${user.name}\` : 'Register New ERP User', modalContent);

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
        this.logAudit('User Setup', \`Registered user: \${user.name} (\${user.email})\`);
      } else {
        this.logAudit('User Setup', \`Updated user: \${user.name}\`);
      }

      this.saveState();
      Modal.close();
      Toast.show(isEdit ? \`User \${user.name} updated\` : \`User \${user.name} registered\`, 'success', 'Saved');
      const c = document.getElementById('setup-subpage-content');
      if (c) this.renderClientMasterStudio(c, 'user-management');
    };
  },

  // =========================================================================
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

    container.innerHTML = \`
      <div class="space-y-4">
        <!-- Role Selection Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
          \${this.state.roles.map(r => \`
            <div data-role-id="\${r.id}" class="role-selector-card cursor-pointer p-2.5 rounded-xl border \${r.id === selectedRole.id ? 'border-[#0369A1] bg-[#F0F9FF]' : 'border-[#DFE1E6] bg-white'} hover:border-[#0369A1] transition-all">
              <div class="font-bold text-xs text-[#172B4D] truncate">\${r.name}</div>
              <div class="text-[10px] text-[#5E6C84] mt-0.5">\${r.isProtected ? '🔒 Protected' : \`\${r.usersCount} Users\`}</div>
            </div>
          \`).join('')}
        </div>

        <!-- Permissions Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] shadow-none overflow-hidden">
          <div class="p-3 border-b border-[#EBECF0] flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-[#172B4D]">Permissions Matrix: \${selectedRole.name}</span>
              \${isAdmin ? \`<span class="lozenge lozenge-inprogress text-[10px]">Full Access Locked</span>\` : ''}
            </div>

            <div class="flex items-center gap-2">
              \${!isAdmin ? \`
                <button id="btn-perm-grant-all" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#006644] cursor-pointer">Grant All</button>
                <button id="btn-perm-readonly" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] cursor-pointer">Read Only</button>
              \` : ''}
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
                \${erpModulesList.map(res => {
                  const checkedAttr = isAdmin ? 'checked disabled' : 'checked';
                  return \`
                    <tr class="hover:bg-[#FAFBFC]">
                      <td class="font-bold text-[#172B4D]">\${res.label}</td>
                      <td class="text-center"><input type="checkbox" class="perm-chk perm-view" \${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" \${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" \${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" \${isAdmin ? 'checked disabled' : ''} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" \${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" \${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" \${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" \${checkedAttr} /></td>
                      <td class="text-center"><input type="checkbox" class="perm-chk" \${isAdmin ? 'checked disabled' : ''} /></td>
                    </tr>
                  \`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    \`;

    document.querySelectorAll('.role-selector-card').forEach(card => {
      card.onclick = () => {
        this.selectedRoleForMatrix = card.dataset.roleId;
        this.renderRolesPermissionsTab(container);
      };
    });

    const grantAllBtn = document.getElementById('btn-perm-grant-all');
    if (grantAllBtn) {
      grantAllBtn.onclick = () => {
        document.querySelectorAll('.perm-chk:not([disabled])').forEach(cb => cb.checked = true);
        Toast.show(\`Granted full access for \${selectedRole.name}\`, 'info', 'Preset Applied');
      };
    }

    const readOnlyBtn = document.getElementById('btn-perm-readonly');
    if (readOnlyBtn) {
      readOnlyBtn.onclick = () => {
        document.querySelectorAll('.perm-chk:not([disabled])').forEach(cb => cb.checked = false);
        document.querySelectorAll('.perm-view:not([disabled])').forEach(cb => cb.checked = true);
        Toast.show(\`Set Read-Only access for \${selectedRole.name}\`, 'info', 'Preset Applied');
      };
    }

    const saveBtn = document.getElementById('btn-save-permissions');
    if (saveBtn) {
      saveBtn.onclick = () => {
        this.logAudit('Roles & Permissions', \`Updated permissions matrix for \${selectedRole.name}\`);
        this.state.hasDraftChanges = true;
        this.state.draftChangesCount++;
        this.saveState();
        Toast.show(\`Permissions saved for \${selectedRole.name}\`, 'success', 'Saved');
      };
    }
  },

  // =========================================================================
  // 4. DYNAMIC MODULE STUDIO TAB (33 Modules)
  // =========================================================================
  renderModuleStudioTab(container) {
    const filter = (this.moduleFilterTerm || '').toLowerCase();
    const modules = this.state.modulesConfig.filter(m => !filter || m.label.toLowerCase().includes(filter) || m.key.toLowerCase().includes(filter));

    container.innerHTML = \`
      <div class="space-y-4">
        <div class="bg-white rounded-xl border border-[#DFE1E6] shadow-none overflow-hidden">
          <div class="p-3 border-b border-[#EBECF0] flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-[#172B4D]">Dynamic ERP Navigation & Module Studio</span>
              <span class="lozenge lozenge-inprogress text-[10px]">\${this.state.modulesConfig.length} Modules</span>
            </div>
            <div class="flex items-center gap-2">
              <input type="text" id="mod-search-input" value="\${this.moduleFilterTerm || ''}" placeholder="Filter modules..." class="px-2.5 py-1 border border-[#DFE1E6] rounded text-xs w-48 focus:outline-none focus:border-[#0369A1]" />
              <button id="btn-save-modules-config" class="btn-primary px-3 py-1 rounded text-xs font-bold cursor-pointer">
                Save Module Order & Labels
              </button>
            </div>
          </div>

          <div class="overflow-x-auto max-h-[640px]">
            <table class="erp-table text-xs w-full">
              <thead class="sticky top-0 bg-[#FAFBFC] z-10">
                <tr>
                  <th class="w-16 text-center">Order</th>
                  <th>Module Display Label</th>
                  <th>Module Key</th>
                  <th>Submenus</th>
                  <th>Sidebar Visibility</th>
                  <th>Authorized Personas</th>
                  <th>Landing Route</th>
                  <th class="text-center w-20">Move</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#EBECF0]">
                \${modules.map((m, idx) => \`
                  <tr class="hover:bg-[#FAFBFC]">
                    <td class="text-center font-bold text-[#5E6C84]">\${m.order}</td>
                    <td>
                      <input type="text" data-module-id="\${m.id}" class="module-label-input font-bold text-[#172B4D] border border-transparent hover:border-[#DFE1E6] focus:border-[#0369A1] focus:bg-white rounded px-2 py-1 w-56 text-xs" value="\${m.label}" />
                    </td>
                    <td class="font-mono text-[11px] text-[#5E6C84]">\${m.key}</td>
                    <td>
                      <span class="lozenge lozenge-default text-[9.5px] font-mono">\${m.submenusCount || 0} Submenus</span>
                    </td>
                    <td>
                      <label class="inline-flex items-center gap-1.5 cursor-pointer text-xs">
                        <input type="checkbox" data-mod-toggle="\${m.id}" \${m.visible ? 'checked' : ''} class="rounded text-[#0369A1]" />
                        <span>\${m.visible ? 'Visible' : 'Hidden'}</span>
                      </label>
                    </td>
                    <td>
                      <div class="flex flex-wrap gap-1 max-w-xs">
                        \${m.roles.slice(0, 2).map(r => \`<span class="lozenge lozenge-default text-[9px]">\${r}</span>\`).join('')}
                        \${m.roles.length > 2 ? \`<span class="lozenge lozenge-default text-[9px]">+\${m.roles.length - 2}</span>\` : ''}
                      </div>
                    </td>
                    <td class="font-mono text-[11px] text-[#0369A1] truncate max-w-[140px]">\${m.route}</td>
                    <td class="text-center">
                      <div class="flex items-center justify-center gap-1">
                        <button data-action="move-up" data-index="\${idx}" class="p-1 hover:bg-[#EBECF0] rounded text-[#42526E] cursor-pointer" \${idx === 0 ? 'disabled opacity-30' : ''} title="Move Up">▲</button>
                        <button data-action="move-down" data-index="\${idx}" class="p-1 hover:bg-[#EBECF0] rounded text-[#42526E] cursor-pointer" \${idx === modules.length - 1 ? 'disabled opacity-30' : ''} title="Move Down">▼</button>
                      </div>
                    </td>
                  </tr>
                \`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    \`;

    const searchInp = document.getElementById('mod-search-input');
    if (searchInp) {
      searchInp.oninput = (e) => {
        this.moduleFilterTerm = e.target.value;
        this.renderModuleStudioTab(container);
      };
    }

    document.querySelectorAll('[data-action="move-up"]').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.index);
        if (idx > 0) {
          const temp = this.state.modulesConfig[idx];
          this.state.modulesConfig[idx] = this.state.modulesConfig[idx - 1];
          this.state.modulesConfig[idx - 1] = temp;
          this.state.modulesConfig.forEach((m, i) => m.order = i + 1);
          this.renderModuleStudioTab(container);
        }
      };
    });

    document.querySelectorAll('[data-action="move-down"]').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.index);
        if (idx < this.state.modulesConfig.length - 1) {
          const temp = this.state.modulesConfig[idx];
          this.state.modulesConfig[idx] = this.state.modulesConfig[idx + 1];
          this.state.modulesConfig[idx + 1] = temp;
          this.state.modulesConfig.forEach((m, i) => m.order = i + 1);
          this.renderModuleStudioTab(container);
        }
      };
    });

    document.querySelectorAll('[data-mod-toggle]').forEach(cb => {
      cb.onchange = (e) => {
        const m = this.state.modulesConfig.find(x => x.id === cb.dataset.modToggle);
        if (m) m.visible = e.target.checked;
      };
    });

    const saveBtn = document.getElementById('btn-save-modules-config');
    if (saveBtn) {
      saveBtn.onclick = () => {
        document.querySelectorAll('.module-label-input').forEach(inp => {
          const mod = this.state.modulesConfig.find(m => m.id === inp.dataset.moduleId);
          if (mod) mod.label = inp.value.trim();
        });
        this.logAudit('Module Studio', 'Updated ERP module labels and order');
        this.state.hasDraftChanges = true;
        this.state.draftChangesCount++;
        this.saveState();
        Toast.show('Module configuration saved', 'success', 'Saved');
      };
    }
  },

  // =========================================================================
  // 5. DYNAMIC SUBMENU & TAB STUDIO TAB (All 33 Modules & 261 Submenus)
  // =========================================================================
  renderSubmenuTabStudioTab(container) {
    const selectedModKey = this.selectedModuleForSubmenuStudio || 'purchase';
    const submenus = this.state.submenusConfig[selectedModKey] || [];
    const filter = (this.submenuFilterTerm || '').toLowerCase();
    const filteredSubmenus = submenus.filter(sm => !filter || sm.title.toLowerCase().includes(filter) || sm.tabs.some(t => t.label.toLowerCase().includes(filter)));

    container.innerHTML = \`
      <div class="space-y-4">
        <!-- Module Dropdown and Actions -->
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-[#172B4D]">Parent ERP Module:</span>
            <select id="studio-mod-select" class="px-2.5 py-1 border border-[#DFE1E6] rounded-lg text-xs font-bold text-[#172B4D] bg-white cursor-pointer max-w-xs truncate">
              \${this.state.modulesConfig.map(m => \`
                <option value="\${m.id}" \${m.id === selectedModKey ? 'selected' : ''}>\${m.label} (\${(this.state.submenusConfig[m.id] || []).length} Submenus)</option>
              \`).join('')}
            </select>
            <input type="text" id="sm-search-input" value="\${this.submenuFilterTerm || ''}" placeholder="Filter submenus..." class="px-2.5 py-1 border border-[#DFE1E6] rounded text-xs w-44 focus:outline-none focus:border-[#0369A1]" />
          </div>
          <button id="btn-add-submenu" class="btn-primary px-3 py-1 rounded text-xs font-bold flex items-center gap-1 cursor-pointer">
            <span>+ Add Submenu</span>
          </button>
        </div>

        <!-- Submenus & Tabs List -->
        <div class="space-y-3 max-h-[640px] overflow-y-auto pr-1">
          \${filteredSubmenus.length === 0 ? \`
            <div class="bg-white rounded-xl border border-[#DFE1E6] p-6 text-center text-xs text-[#5E6C84]">
              No submenus matched filter. Click "+ Add Submenu" to create one.
            </div>
          \` : filteredSubmenus.map(sm => \`
            <div class="bg-white rounded-xl border border-[#DFE1E6] shadow-none p-3">
              <div class="flex items-center justify-between pb-2 mb-2 border-b border-[#EBECF0]">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-xs text-[#172B4D]">\${sm.title}</span>
                  <span class="font-mono text-[10px] text-[#5E6C84]">(\${sm.id})</span>
                  <span class="lozenge lozenge-default text-[9.5px]">\${sm.tabs.length} Tabs</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <button data-action="add-tab" data-sm-id="\${sm.id}" class="px-2 py-0.5 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-[11px] font-bold text-[#0369A1] cursor-pointer">
                    + Add Tab
                  </button>
                  <button data-action="del-sm" data-sm-id="\${sm.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#BF2600] cursor-pointer" title="Delete Submenu">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </div>

              <div class="overflow-x-auto">
                <table class="erp-table text-xs w-full">
                  <thead>
                    <tr>
                      <th class="w-12">#</th>
                      <th>Tab Label</th>
                      <th>Route Hash</th>
                      <th>Mapping Type</th>
                      <th>Badge Tag</th>
                      <th class="text-center w-16">Action</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#EBECF0]">
                    \${sm.tabs.map((tab, idx) => \`
                      <tr class="hover:bg-[#FAFBFC]">
                        <td class="font-bold text-[#5E6C84]">\${idx + 1}</td>
                        <td class="font-bold text-[#172B4D]">\${tab.label}</td>
                        <td class="font-mono text-[11px] text-[#0369A1]">\${tab.route}</td>
                        <td>
                          <span class="lozenge \${tab.type === 'dynamic-form' ? 'lozenge-purple' : tab.type === 'custom-list' ? 'lozenge-warning' : 'lozenge-default'} text-[9.5px]">
                            \${tab.type}
                          </span>
                        </td>
                        <td>\${tab.badge ? \`<span class="lozenge lozenge-default text-[9.5px] font-mono">\${tab.badge}</span>\` : '—'}</td>
                        <td class="text-center">
                          <button data-action="del-tab" data-sm-id="\${sm.id}" data-tab-id="\${tab.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#BF2600] cursor-pointer" title="Delete Tab">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </td>
                      </tr>
                    \`).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          \`).join('')}
        </div>
      </div>
    \`;

    const modSel = document.getElementById('studio-mod-select');
    if (modSel) {
      modSel.onchange = (e) => {
        this.selectedModuleForSubmenuStudio = e.target.value;
        this.renderSubmenuTabStudioTab(container);
      };
    }

    const smSearch = document.getElementById('sm-search-input');
    if (smSearch) {
      smSearch.oninput = (e) => {
        this.submenuFilterTerm = e.target.value;
        this.renderSubmenuTabStudioTab(container);
      };
    }

    document.querySelectorAll('[data-action="add-tab"]').forEach(btn => {
      btn.onclick = () => this.showAddTabModal(selectedModKey, btn.dataset.smId);
    });

    document.querySelectorAll('[data-action="del-sm"]').forEach(btn => {
      btn.onclick = () => {
        if (confirm('Delete this submenu and all its tabs?')) {
          this.state.submenusConfig[selectedModKey] = this.state.submenusConfig[selectedModKey].filter(s => s.id !== btn.dataset.smId);
          const mod = this.state.modulesConfig.find(m => m.id === selectedModKey);
          if (mod) mod.submenusCount = this.state.submenusConfig[selectedModKey].length;
          this.saveState();
          Toast.show('Submenu deleted', 'info', 'Deleted');
          this.renderSubmenuTabStudioTab(container);
        }
      };
    });

    document.querySelectorAll('[data-action="del-tab"]').forEach(btn => {
      btn.onclick = () => {
        const sm = this.state.submenusConfig[selectedModKey]?.find(s => s.id === btn.dataset.smId);
        if (sm) {
          sm.tabs = sm.tabs.filter(t => t.id !== btn.dataset.tabId);
          this.saveState();
          Toast.show('Tab removed', 'info', 'Deleted');
          this.renderSubmenuTabStudioTab(container);
        }
      };
    });

    const addSmBtn = document.getElementById('btn-add-submenu');
    if (addSmBtn) addSmBtn.onclick = () => this.showAddSubmenuModal(selectedModKey);
  },

  showAddSubmenuModal(modKey) {
    const modalContent = \`
      <form id="sm-form" class="space-y-3 text-xs">
        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Submenu Title *</label>
          <input type="text" id="sm-title" required class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="e.g. Inward Inspection" />
        </div>
        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Submenu Slug *</label>
          <input type="text" id="sm-slug" required class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg font-mono" placeholder="inward-qc" />
        </div>
        <div class="flex items-center justify-end gap-2 pt-3 border-t border-[#EBECF0]">
          <button type="button" id="modal-sm-cancel" class="px-3.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs font-semibold text-[#42526E] hover:bg-[#FAFBFC] cursor-pointer">Cancel</button>
          <button type="submit" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">Create Submenu</button>
        </div>
      </form>
    \`;

    Modal.show('Add Submenu', modalContent);
    document.getElementById('modal-sm-cancel').onclick = () => Modal.close();

    document.getElementById('sm-form').onsubmit = (e) => {
      e.preventDefault();
      const title = document.getElementById('sm-title').value.trim();
      const id = document.getElementById('sm-slug').value.trim().toLowerCase();

      if (!this.state.submenusConfig[modKey]) this.state.submenusConfig[modKey] = [];
      this.state.submenusConfig[modKey].push({ id, title, tabs: [] });

      const mod = this.state.modulesConfig.find(m => m.id === modKey);
      if (mod) mod.submenusCount = this.state.submenusConfig[modKey].length;

      this.logAudit('Submenu Studio', \`Created submenu "\${title}" in \${modKey}\`);
      this.saveState();
      Modal.close();
      Toast.show(\`Submenu "\${title}" created\`, 'success', 'Saved');
      const c = document.getElementById('setup-subpage-content');
      if (c) this.renderClientMasterStudio(c, 'submenu-tab-studio');
    };
  },

  showAddTabModal(modKey, smId) {
    const modalContent = \`
      <form id="tab-form" class="space-y-3 text-xs">
        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Tab Label *</label>
          <input type="text" id="tab-label" required class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="e.g. Lot Weighment Register" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Tab Slug *</label>
            <input type="text" id="tab-slug" required class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg font-mono" placeholder="lot-weighment" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Mapping Type</label>
            <select id="tab-type" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg">
              <option value="system">System Page</option>
              <option value="dynamic-form">Dynamic Form</option>
              <option value="custom-list">Custom List</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Badge Tag</label>
          <input type="text" id="tab-badge" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="e.g. 5 New" />
        </div>
        <div class="flex items-center justify-end gap-2 pt-3 border-t border-[#EBECF0]">
          <button type="button" id="modal-tab-cancel" class="px-3.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs font-semibold text-[#42526E] hover:bg-[#FAFBFC] cursor-pointer">Cancel</button>
          <button type="submit" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">Add Tab</button>
        </div>
      </form>
    \`;

    Modal.show('Add Tab', modalContent);
    document.getElementById('modal-tab-cancel').onclick = () => Modal.close();

    document.getElementById('tab-form').onsubmit = (e) => {
      e.preventDefault();
      const label = document.getElementById('tab-label').value.trim();
      const id = document.getElementById('tab-slug').value.trim().toLowerCase();
      const type = document.getElementById('tab-type').value;
      const badge = document.getElementById('tab-badge').value.trim();

      const sm = this.state.submenusConfig[modKey]?.find(s => s.id === smId);
      if (sm) {
        sm.tabs.push({ id, label, route: \`#/\${modKey}/\${smId}/\${id}\`, type, badge });
        this.saveState();
        Modal.close();
        Toast.show(\`Tab "\${label}" added\`, 'success', 'Saved');
        const c = document.getElementById('setup-subpage-content');
        if (c) this.renderClientMasterStudio(c, 'submenu-tab-studio');
      }
    };
  },

  // =========================================================================
  // 6. DYNAMIC FIELD & FORM BUILDER TAB
  // =========================================================================
  renderFieldFormBuilderTab(container) {
    const selectedFormKey = this.selectedFormForBuilder || 'rm-purchase-inward';
    const formConfig = this.state.formsConfig[selectedFormKey] || Object.values(this.state.formsConfig)[0];
    const persona = this.state.previewPersona || 'System Administrator';

    container.innerHTML = \`
      <div class="space-y-4">
        <!-- Toolbar -->
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-[#172B4D]">Target Operational Form:</span>
            <select id="builder-form-select" class="px-2.5 py-1 border border-[#DFE1E6] rounded-lg text-xs font-bold text-[#172B4D] bg-white cursor-pointer">
              \${Object.keys(this.state.formsConfig).map(k => \`
                <option value="\${k}" \${k === selectedFormKey ? 'selected' : ''}>\${this.state.formsConfig[k].name}</option>
              \`).join('')}
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
                \${formConfig.sections.map(sec => \`
                  <div class="border border-[#EBECF0] rounded-lg p-2.5 bg-[#FAFBFC]">
                    <div class="font-bold text-xs text-[#172B4D] mb-1.5">\${sec.title}</div>
                    <div class="space-y-1">
                      \${sec.fields.map((f, i) => \`
                        <div class="bg-white border border-[#DFE1E6] rounded p-2 flex items-center justify-between text-xs">
                          <div>
                            <span class="font-bold text-[#172B4D]">\${f.label} \${f.required ? '<span class="text-[#BF2600]">*</span>' : ''}</span>
                            <div class="text-[10px] text-[#5E6C84] font-mono">\${f.key} • [\${f.type}]</div>
                          </div>
                          <button data-action="del-field" data-sec-id="\${sec.id}" data-field-id="\${f.id}" class="p-1 hover:bg-[#EBECF0] rounded text-[#BF2600] cursor-pointer" title="Remove Field">✕</button>
                        </div>
                      \`).join('')}
                    </div>
                  </div>
                \`).join('')}
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
                    \${['System Administrator', 'Procurement Officer', 'Quality Lab Inspector', 'Production Floor Manager'].map(r => \`
                      <option value="\${r}" \${r === persona ? 'selected' : ''}>\${r}</option>
                    \`).join('')}
                  </select>
                </div>
              </div>

              <form id="live-erp-form" class="space-y-4 max-h-[560px] overflow-y-auto pr-1">
                \${formConfig.sections.map(sec => \`
                  <div class="space-y-2">
                    <div class="text-xs font-bold text-[#172B4D] border-b border-[#EBECF0] pb-1">\${sec.title}</div>
                    <div class="grid grid-cols-2 gap-2.5">
                      \${sec.fields.map(f => \`
                        <div class="\${f.width}">
                          <label class="block font-bold text-[11px] text-[#172B4D] mb-1">
                            \${f.label} \${f.required ? '<span class="text-[#BF2600]">*</span>' : ''}
                          </label>

                          \${f.type === 'dropdown' ? \`
                            <select class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs bg-white">
                              \${f.options?.map(opt => \`<option value="\${opt}" \${opt === f.defaultValue ? 'selected' : ''}>\${opt}</option>\`).join('')}
                            </select>
                          \` : f.type === 'radio' ? \`
                            <div class="flex flex-wrap gap-2 pt-1 text-xs">
                              \${f.options?.map(opt => \`
                                <label class="flex items-center gap-1 cursor-pointer">
                                  <input type="radio" name="\${f.key}" value="\${opt}" \${opt === f.defaultValue ? 'checked' : ''} class="text-[#0369A1]" />
                                  <span>\${opt}</span>
                                </label>
                              \`).join('')}
                            </div>
                          \` : f.type === 'file' ? \`
                            <div class="border border-dashed border-[#DFE1E6] rounded-lg p-2 text-center text-xs text-[#0369A1] hover:bg-[#FAFBFC] cursor-pointer">
                              <span>Click to upload file</span>
                              <span class="text-[10px] text-[#5E6C84] block">\${f.helpText || 'PDF / JPG'}</span>
                            </div>
                          \` : \`
                            <input type="\${f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}" placeholder="\${f.placeholder || ''}" value="\${f.defaultValue || ''}" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs" />
                          \`}
                        </div>
                      \`).join('')}
                    </div>
                  </div>
                \`).join('')}

                <div class="pt-2 border-t border-[#EBECF0] flex justify-end">
                  <button type="submit" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">Validate & Submit Slip</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    \`;

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
        Modal.show('Form Schema JSON', \`
          <div class="space-y-2">
            <textarea readonly rows="12" class="w-full p-2 font-mono text-[11px] bg-[#172B4D] text-[#79F2C0] rounded border border-[#DFE1E6]">\${json}</textarea>
            <div class="flex justify-end">
              <button onclick="navigator.clipboard.writeText(\\\`\${json.replace(/\\\`/g, '\\\\\\\\\`')}\\\`); Toast.show('Schema copied to clipboard', 'success', 'Copied'); Modal.close();" class="btn-primary px-3 py-1 rounded text-xs font-bold cursor-pointer">Copy JSON</button>
            </div>
          </div>
        \`);
      };
    }

    const saveBtn = document.getElementById('btn-save-form-schema');
    if (saveBtn) {
      saveBtn.onclick = () => {
        this.logAudit('Form Builder', \`Saved schema for \${formConfig.name}\`);
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
    const modalContent = \`
      <form id="af-form" class="space-y-3 text-xs">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Target Section *</label>
            <select id="af-sec" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg">
              \${formConfig.sections.map(s => \`<option value="\${s.id}">\${s.title}</option>\`).join('')}
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
    \`;

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
          id: \`f_\${Date.now()}\`,
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
        Toast.show(\`Field "\${label}" added\`, 'success', 'Saved');
        const c = document.getElementById('setup-subpage-content');
        if (c) this.renderClientMasterStudio(c, 'field-form-builder');
      }
    };
  },

  // =========================================================================
  // 7. AUDIT & CONFIGURATION LOGS TAB
  // =========================================================================
  renderAuditLogsTab(container) {
    container.innerHTML = \`
      <div class="space-y-4">
        <!-- Status Bar -->
        <div class="bg-white border border-[#DFE1E6] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-none">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-[#172B4D]">Configuration Governance:</span>
            <span class="lozenge lozenge-success text-[10px] font-mono">\${this.state.publishedVersion} Live</span>
            \${this.state.hasDraftChanges ? \`
              <span class="lozenge lozenge-warning text-[10px]">\${this.state.draftChangesCount} Draft Changes Pending</span>
            \` : \`
              <span class="lozenge lozenge-default text-[10px]">Zero Drafts</span>
            \`}
          </div>

          <div class="flex items-center gap-2">
            \${this.state.hasDraftChanges ? \`
              <button id="btn-discard-drafts" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#BF2600] cursor-pointer">Discard Drafts</button>
              <button id="btn-publish-live" class="btn-primary px-3 py-1 rounded text-xs font-bold cursor-pointer">Publish Changes Live</button>
            \` : ''}
          </div>
        </div>

        <!-- Version Snapshots -->
        <div class="bg-white border border-[#DFE1E6] rounded-xl p-3 shadow-none">
          <div class="text-xs font-bold text-[#172B4D] mb-2">Safe Rollback Snapshots</div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            \${this.state.versionHistory.map(v => \`
              <div class="border \${v.isCurrent ? 'border-[#0369A1] bg-[#F0F9FF]' : 'border-[#DFE1E6] bg-white'} rounded-lg p-2.5 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-xs text-[#172B4D] font-mono">\${v.version}</span>
                    \${v.isCurrent ? \`<span class="lozenge lozenge-inprogress text-[9px]">Live</span>\` : ''}
                  </div>
                  <div class="text-[10px] text-[#5E6C84] mt-0.5">\${v.date}</div>
                  <div class="text-[11px] text-[#172B4D] mt-1 truncate">\${v.note}</div>
                </div>
                <div class="mt-2 pt-1.5 border-t border-[#EBECF0] flex justify-end">
                  \${!v.isCurrent ? \`
                    <button data-action="rollback" data-version="\${v.version}" class="text-[11px] font-bold text-[#BF2600] hover:underline cursor-pointer">Rollback</button>
                  \` : \`
                    <span class="text-[10px] font-bold text-[#006644]">Active</span>
                  \`}
                </div>
              </div>
            \`).join('')}
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
                \${this.state.auditLogs.map(log => \`
                  <tr class="hover:bg-[#FAFBFC]">
                    <td class="font-mono font-bold text-[#17191c]">\${log.id}</td>
                    <td class="text-[#5E6C84] text-[11px]">\${log.timestamp}</td>
                    <td>
                      <div class="font-bold text-[#172B4D]">\${log.user}</div>
                      <div class="text-[10px] text-[#5E6C84]">\${log.role}</div>
                    </td>
                    <td><span class="lozenge lozenge-default text-[9.5px]">\${log.entity}</span></td>
                    <td class="font-semibold text-[#172B4D]">\${log.action}</td>
                    <td class="text-[#172B4D]">\${log.diff}</td>
                    <td class="text-center"><span class="lozenge lozenge-success text-[9.5px]">\${log.status}</span></td>
                  </tr>
                \`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    \`;

    document.querySelectorAll('[data-action="rollback"]').forEach(btn => {
      btn.onclick = () => {
        const ver = btn.dataset.version;
        if (confirm(\`Rollback configuration to snapshot \${ver}?\`)) {
          this.state.publishedVersion = ver;
          this.state.versionHistory.forEach(v => v.isCurrent = (v.version === ver));
          this.state.hasDraftChanges = false;
          this.state.draftChangesCount = 0;
          this.logAudit('Rollback Governance', \`Restored snapshot \${ver}\`);
          this.saveState();
          Toast.show(\`Configuration restored to \${ver}\`, 'success', 'Rollback Complete');
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
    const nextVer = \`v2.4.\${parseInt(this.state.publishedVersion.split('.').pop() || '1') + 1}\`;
    Modal.show('Publish Configuration Live', \`
      <div class="space-y-3 text-xs">
        <div>
          <label class="block font-bold text-[#172B4D] mb-1">Release Summary Notes</label>
          <input type="text" id="pub-note" class="w-full px-2.5 py-1.5 border border-[#DFE1E6] rounded-lg" placeholder="e.g. Updated CAA upload validation rule" />
        </div>
        <div class="flex items-center justify-end gap-2 pt-2 border-t border-[#EBECF0]">
          <button id="modal-pub-cancel" class="px-3.5 py-1.5 border border-[#DFE1E6] rounded-lg text-xs font-semibold text-[#42526E] hover:bg-[#FAFBFC] cursor-pointer">Cancel</button>
          <button id="modal-pub-confirm" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">Publish Live (\${nextVer})</button>
        </div>
      </div>
    \`);

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

      this.logAudit('Configuration Governance', \`Published live release \${nextVer}: \${note}\`);
      this.saveState();
      Modal.close();
      Toast.show(\`Configuration release \${nextVer} is now LIVE\`, 'success', 'Published Live');

      const c = document.getElementById('setup-subpage-content');
      if (c) this.renderClientMasterStudio(c, this.activeTab);
    };
  },

  logAudit(entity, diff) {
    const id = \`AUD-\${Math.floor(8900 + Math.random() * 900)}\`;
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
`;

fs.writeFileSync('js/views/setupView.js', template);
console.log('Successfully generated setupView.js with authentic 33 modules and 261 submenus!');
